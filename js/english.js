"use strict";
// ===== เรียนภาษาอังกฤษ: วัดระดับ → แผนที่บทเรียน → บทเรียน (แบบฝึกสร้างอัตโนมัติจาก js/lessons.js) =====
let ENG_TAB = 'learn', ENG_LV = null, LS = null, ENG_TIMER = null;
const ENG_PRAISE = ['ถูกต้อง!', 'เยี่ยม!', 'เก่งมาก!', 'ใช่เลย!', 'สุดยอด!'];
function engState(){
  const E = S.eng || (S.eng = { done: {}, xp: 0, days: {}, goal: 30, known: {}, v: 2 });
  // ย้ายคีย์แบบเก่า (คอร์ส:ลำดับหน่วย:บท) เป็น (คอร์ส:ชื่อหน่วย:บท)
  if(!E.v){ const d = {}; Object.entries(E.done || {}).forEach(([k, v]) => { const [c, ui, li] = k.split(':'); const t = COURSES[c] && COURSES[c].def[+ui]; if(t) d[`${c}:${t}:${li}`] = v; }); E.done = d; E.v = 2; }
  E.lvPass = E.lvPass || {};
  return E;
}
const engFlat = c => COURSES[c].units.flatMap((u, ui) => u.ls.map((ws, li) => ({ c, ui, li, u, ws, key: `${c}:${u.t}:${li}` })));
const engPool = c => COURSES[c].units.flatMap(u => u.ls.flat());
const shuf = a => { a = a.slice(); for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
// ตัวเลือกหลอก: ไม่เอาคำเดียวกันที่มีอีกความหมาย (เช่น fine = ค่าปรับ / สบายดี)
const engOpts = (w, pool, f) => shuf([w[f], ...shuf([...new Set(pool.filter(x => x.en.toLowerCase() !== w.en.toLowerCase() && x.th !== w.th).map(x => x[f]))]).slice(0, 3)]);
const engSay = (t, slow) => speakWord(String(t).split('↔')[0], slow);
const engToday = () => engState().days[dkey()] || 0;
function engStreak(){
  const d = engState().days, t = new Date(); let n = 0;
  if(!d[dkey(t)]) t.setDate(t.getDate() - 1);
  while(d[dkey(t)]){ n++; t.setDate(t.getDate() - 1); }
  return n;
}
const engTabs = () => `<div class="eng-tabs two" data-on="${ENG_TAB}">
  <button class="${ENG_TAB === 'learn' ? 'on' : ''}" data-etab="learn"><i data-lucide="graduation-cap"></i>เรียน</button>
  <button class="${ENG_TAB === 'stats' ? 'on' : ''}" data-etab="stats"><i data-lucide="chart-no-axes-column"></i>สถิติ</button></div>`;
const engBindTabs = () => $$('[data-etab]').forEach(b => b.onclick = () => { ENG_TAB = b.dataset.etab; renderCards(); });

// ---------- เลเวล: รวมทุกหมวดเป็นเส้นทางเดียว เรียงแบบติวเตอร์ ----------
// แต่ละรอบหยิบหน่วยละหมวด: ศัพท์พื้นฐาน → ศัพท์ชีวิตประจำวัน → ไวยากรณ์ → ศัพท์งานตำรวจ → สนทนา → บทสนทนา → อ่าน
const ENG_ORDER = ['basic', 'daily', 'grammar', 'police', 'talk', 'dialog', 'read'];
const ENG_CAT = { basic: 'คำศัพท์', daily: 'คำศัพท์', police: 'ศัพท์งานตำรวจ', talk: 'ภาษาพูด', grammar: 'ไวยากรณ์', dialog: 'บทสนทนา', read: 'อ่าน' };
const ENG_LV_N = ENG_LEVELS.length;
const ENG_LV_C = ['#22c55e', '#4f8df7', '#a07cf8', '#ff8a4c', '#ec6ba8', '#38bdf8', '#f5a524'];
const engLvCache = {};
function engLevel(L){
  if(engLvCache[L]) return engLvCache[L];
  const lists = ENG_ORDER.filter(c => COURSES[c]).map(c => COURSES[c].units.map((u, ui) => ({ c, ui, u })).filter(x => x.u.lv === L));
  const units = []; for(let r = 0; lists.some(l => l[r]); r++) lists.forEach(l => l[r] && units.push(l[r]));
  const F = units.flatMap(x => { const CF = engFlat(x.c); return x.u.ls.map((ws, li) => { const key = `${x.c}:${x.u.t}:${li}`; return { ...x, li, ws, key, ci: CF.findIndex(y => y.key === key) }; }); });
  return (engLvCache[L] = { units, F });
}
const engLvOpen = L => L === 0 || !!engState().lvPass[L - 1];
// บทในเลเวล: บทแรก / บทก่อนหน้าผ่านแล้ว / อยู่ก่อนบทที่เคยผ่าน
function engOpen(F, i){ const E = engState(); return i === 0 || !!E.done[F[i - 1].key] || F.slice(i).some(x => E.done[x.key]); }
// สิ่งที่ควรทำต่อ: บทถัดไปในเลเวลล่าสุดที่เปิด หรือสอบวัดผลถ้าเรียนครบ
function engNext(){
  const E = engState();
  for(let L = 0; L < ENG_LV_N && engLvOpen(L); L++){
    if(E.lvPass[L]) continue;
    const { F } = engLevel(L), i = F.findIndex((x, k) => engOpen(F, k) && !E.done[x.key]);
    return i >= 0 ? { L, i, x: F[i] } : { L, exam: true };
  }
  return null;
}
// คำที่ถึงรอบทวน (เรียนแล้ว ใกล้ลืม)
const engDue = () => { const K = engState().known; return S.cards.filter(c => c.seen && (c.due || 0) <= Date.now() && K[vcText(c.f)]).map(c => ({ en: vcText(c.f), th: vcText(c.b), ex: c.ex || '', tr: '' })).filter(w => w.en && w.th); };
const engReview = () => lessonStart('daily', -1, shuf(engDue()).slice(0, 6));
function engGo(n){ if(!n) return; n.exam ? levelExam(n.L) : lessonStart(n.x.c, n.x.ci); }

// ---------- หน้าแรก: การ์ดเลเวล ----------
function renderEngLevels(){
  const E = engState(), n = engNext(), today = engToday(), pct = Math.min(100, Math.round(today / E.goal * 100)), RC = 2 * Math.PI * 21, due = engDue().length;
  const lc = n ? ENG_LV_C[n.L] : '#22c55e';
  let html = engTabs() + `<div class="eng-lay"><div class="eng-side">
  <section class="eng-hero" style="--c:${lc}">
    <span class="eng-bubbles"><i></i><i></i><i></i></span>
    <div class="eng-hero-top">
      <span class="eng-course"><span class="eng-cic"><i data-lucide="graduation-cap"></i></span><b>${n ? `Lv.${n.L} ${ENG_LEVELS[n.L]}` : 'ผ่านครบทุกเลเวล'}</b></span>
      <button class="eng-streak" id="engGoal" title="ไฟต่อเนื่อง / เป้าวันนี้"><i data-lucide="flame"></i>${engStreak()}
        <span class="eng-ring"><svg class="rg" viewBox="0 0 50 50"><circle cx="25" cy="25" r="21"/><circle class="fg" cx="25" cy="25" r="21" stroke-dasharray="${RC}" stroke-dashoffset="${RC * (1 - pct / 100)}"/></svg><i data-lucide="zap"></i></span></button>
    </div>
    ${n ? (n.exam ? `<small>พร้อมแล้ว</small><h2>สอบวัดผล Lv.${n.L}</h2><p>ผ่าน 80% เพื่อปลดล็อก Lv.${n.L + 1}</p>`
      : `<small>บทต่อไป · ${ENG_CAT[n.x.c]}</small><h2>${esc(n.x.u.t)}</h2><p>บทที่ ${n.x.li + 1}</p>`)
      + `<button class="eng-cta" id="engGo"><i data-lucide="play"></i>${n.exam ? 'เริ่มสอบ' : 'เรียนต่อ'}</button>`
      : `<small>สุดยอด</small><h2>เรียนครบแล้ว</h2><p>ทวนคำศัพท์ต่อได้เลย</p>`}
    <div class="eng-hero-bar"><span>${Object.keys(E.lvPass).length}/${ENG_LV_N} เลเวล</span><span>วันนี้ ${today}/${E.goal} XP</span></div>
  </section>
  ${due >= 4 ? `<button class="eng-review" id="engRev"><i data-lucide="refresh-cw"></i><span><b>ทวนคำที่ใกล้ลืม</b><small>${due} คำ</small></span><i data-lucide="chevron-right"></i></button>` : ''}
  </div><div class="eng-map"><div class="eng-lvs">`;
  for(let L = 0; L < ENG_LV_N; L++){
    const { F } = engLevel(L), d = F.filter(x => E.done[x.key]).length, open = engLvOpen(L), pass = E.lvPass[L];
    html += `<div class="eng-lv ${open ? '' : 'lock'} ${pass ? 'pass' : ''}" style="--c:${ENG_LV_C[L]};--d:${L * 60}ms">
      <button class="eng-lv-main" data-lv="${L}"><span class="eng-lv-n"><small>Lv.</small>${L}</span>
        <span class="eng-lv-t"><b>${ENG_LEVELS[L]}</b><small>${F.length} บท · ${F.reduce((a, x) => a + x.ws.length, 0)} คำ/ข้อ</small>
        <span class="vc-bar"><i style="width:${F.length ? d / F.length * 100 : 0}%"></i></span></span>
        <i data-lucide="${pass ? 'award' : open ? 'chevron-right' : 'lock'}"></i></button>
      ${!open ? `<button class="eng-lv-skip" data-skip="${L}"><i data-lucide="fast-forward"></i>สอบข้าม: สอบวัดผล Lv.${L - 1}</button>` : ''}</div>`;
  }
  html += `</div></div></div>`;
  $('#view').innerHTML = html;
  engBindTabs();
  if($('#engGo')) $('#engGo').onclick = () => engGo(n);
  if($('#engRev')) $('#engRev').onclick = engReview;
  $('#engGoal').onclick = () => openPicker({ title: 'เป้า XP ต่อวัน', value: E.goal,
    options: [10, 20, 30, 50, 80].map(v => ({ val: v, label: `${v} XP` })), onSelect: v => { E.goal = +v; save(); renderCards(); } });
  $$('[data-lv]').forEach(b => b.onclick = () => { const L = +b.dataset.lv; if(!engLvOpen(L)) return toast(`ผ่าน Lv.${L - 1} ก่อน`, 'err'); ENG_LV = L; renderCards(); $('.main').scrollTo(0, 0); });
  // สอบข้าม: สอบวัดผลของเลเวลก่อนหน้า ผ่านแล้วเลเวลนี้เปิด
  $$('[data-skip]').forEach(b => b.onclick = () => levelExam(+b.dataset.skip - 1));
  icons();
}

// ---------- หน้าเลเวล: บทเรียนเรียงตามลำดับ + สอบวัดผลท้ายเลเวล ----------
// แผนที่บทเรียน (renderEngPath) อยู่ใน js/engmap.js

// ---------- สอบวัดผลท้ายเลเวล: ปนทุกหมวด จับเวลา ผ่าน 80% ----------
function levelExam(L){
  const { units } = engLevel(L), items = [], by = k => units.filter(x => (COURSES[x.c].kind || (COURSES[x.c].gram ? 'gram' : 'vocab')) === k);
  const vocab = shuf(by('vocab').flatMap(x => x.u.ls.flat().map(w => ({ w, c: x.c }))));
  const gram = shuf(by('gram').flatMap(x => x.u.ls.flat())), dlg = shuf(by('dialog').flatMap(x => x.u.ls.flat()));
  const read = shuf(by('read').flatMap(x => x.u.ls));
  const ch = g => ({ w: g, opts: shuf([g.a, ...g.w]) });
  gram.slice(0, 8).forEach(g => items.push({ t: 'gram', ...ch(g) }));
  dlg.slice(0, 5).forEach(g => items.push({ t: 'dlg', ...ch(g) }));
  const need = 30 - items.length - (read.length ? 5 : 0);
  vocab.slice(0, need).forEach((x, k) => items.push(engEx(['mean', 'word', 'blank'][k % 3], x.w, engPool(x.c))));
  const mixed = shuf(items);
  if(read.length){ mixed.push({ t: 'passage', w: read[0][0] }); read[0].forEach(g => mixed.push({ t: 'read', ...ch(g) })); }
  const q = mixed.filter(x => x.t !== 'passage').length;
  LS = { c: 'daily', col: ENG_LV_C[L], i: -1, key: null, ws: [], gram: true, exam: { L }, deadline: Date.now() + Math.ceil(q * 0.75) * 60000,
    items: mixed, k: 0, ok: 0, bad: 0, combo: 0, maxC: 0, t0: Date.now(), redo: new Set(), miss: new Set(), st: null };
  renderCards();
}
// นาฬิกาสอบ: หมดเวลา = ข้อที่เหลือนับว่าผิด
function engClock(){
  clearInterval(ENG_TIMER);
  if(!LS || !LS.deadline) return;
  const tick = () => {
    if(!LS || !LS.deadline || LS.res){ clearInterval(ENG_TIMER); return; }
    const left = Math.max(0, Math.round((LS.deadline - Date.now()) / 1000)), t = $('#lsTime');
    if(t){ t.textContent = mmss(left); t.classList.toggle('warn', left <= 60); }
    if(!left){ clearInterval(ENG_TIMER); const L = LS; L.bad += L.items.slice(L.k).filter(x => x.t !== 'passage').length; L.k = L.items.length; toast('หมดเวลา', 'err'); renderLesson(); }
  };
  tick(); ENG_TIMER = setInterval(tick, 1000);
}

// ---------- บทเรียน ----------
// ตัวคำของประโยค (ตัดจุด/ตัวพิมพ์ใหญ่คำแรก ไม่ให้เดาลำดับจากรูปคำ)
const engToks = ex => ex.replace(/[.!?,…]/g, '').split(/\s+/).filter(Boolean).map((s, k) => k || s === 'I' ? s : s[0].toLowerCase() + s.slice(1));
// โครงสร้างประโยคสำหรับคำใบ้ข้อเรียงประโยค (เดาจากชนิดคำ ถ้าไม่มั่นใจคืน null)
const ENG_W = (o => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, new Set(v.split(' '))])))({
  wh: 'what where when who whom whose why how which', be: 'am is are was were', aux: 'do does did can could will would shall should may might must',
  sub: 'i you he she we they it there people everyone everybody someone somebody nobody nothing everything something police children', obj: 'me him us them', det: 'the a an my your his her its our their this that these those some any every each no all many much one two three four five six seven eight nine ten both several few',
  prep: 'in on at to from with for of about by under over near after before into behind between during without around across through up down off out',
  conj: 'and but because so if when or while although though unless until', freq: 'always usually often sometimes never rarely seldom just already also still',
  link: 'look looks looked feel feels felt seem seems seemed become became sound sounds smell smells taste tastes',
  time: 'today tomorrow yesterday tonight now soon later here there everyday', toV: 'going want wants wanted need needs needed like likes love hate try tries tried plan plans hope hopes decide decided going learn agree refuse forget remember would'
});
function engStruct(ex){
  ex = ex.trim();
  if(/[;:]|[.!?]\s+\S/.test(ex)) return null;
  let m = ex.match(/^(.*\S),\s*please([.!?]?)$/i);
  if(m){ const r = engStruct(m[1] + m[2]); return r && r.concat('please'); }
  m = ex.match(/^([^,]+),\s*(.+)$/);
  if(m && m[1].split(/\s+/).length <= 2 && !/,/.test(m[2])){ const r = engStruct(m[2]); return r && ['คำขึ้นต้น', ...r]; }
  const raw = ex.replace(/[.!?,]/g, '').split(/\s+/).filter(Boolean), T = raw.map(s => s.toLowerCase()), n = T.length, is = (k, t) => t !== undefined && ENG_W[k].has(t);
  const neg = t => /n't$/.test(t), beC = t => /^(i'm|you're|we're|they're|he's|she's|it's|that's|there's|what's|where's|who's|how's)$/.test(t);
  const verbish = t => /(ed|s)$/.test(t) && !/(ss|us|is)$/.test(t);
  const out = []; let i = 0, bad = false;
  const np = q => { // ประธานเป็นกลุ่มคำนาม: ตัวกำหนด + คำ… ถึงคำที่ดูเป็นกริยา
    if(is('sub', T[i])){ i++; return true; }
    if(/^[A-Z]/.test(raw[i]) && i){ i++; while(i < n && /^[A-Z]/.test(raw[i]) && !is('sub', T[i])) i++; return true; }
    if(!is('det', T[i])) return false;
    const b = T.findIndex((t, k) => k > i && (is('be', t) || is('aux', t) || neg(t))), c = T.findIndex((t, k) => k > i && is('conj', t));
    if(b > 0 && (c < 0 || c > b)){ i = b; return true; }
    let j = i + 1;
    while(j < n){
      if(T[j] === 'of'){ j += is('det', T[j + 1]) ? 2 : 1; continue; }
      if(is('prep', T[j]) || is('det', T[j]) || is('obj', T[j]) || is('conj', T[j]) || j > i + 1 && !q && (verbish(T[j]) || is('prep', T[j + 1]) || is('det', T[j + 1]) || is('obj', T[j + 1]))) break;
      j++;
    }
    i = j;
    return true;
  };
  const rest = afterBe => { // ส่วนท้าย: กรรม/ส่วนเติม/บุพบทวลี/เวลา
    let first = true;
    while(i < n){
      const t = T[i];
      if(is('conj', t) && !(t === 'so' && !is('sub', T[i + 1]))){ out.push('คำเชื่อม + อีกประโยค'); return; }
      if(t === 'not'){ out.push('not'); i++; continue; }
      if(t === 'to' && is('toV', T[i - 1])){ out.push('to + กริยา'); i += 2; afterBe = false; continue; }
      if(is('prep', t) && (i === n - 1 || is('prep', T[i + 1]))){ i++; continue; }
      if(is('prep', t)){ out.push('บุพบท + คำนาม'); i++; while(i < n && !is('prep', T[i]) && !is('conj', T[i]) && !is('time', T[i])) i++; first = false; continue; }
      if(is('time', t) || /^(every|last|next)$/.test(t) && i + 1 < n){ out.push('เวลา'); i += is('time', t) ? 1 : 2; first = false; continue; }
      if(/ly$/.test(t) && !is('det', T[i - 1])){ out.push('คำขยาย'); i++; first = false; continue; }
      const lab = /^\d/.test(t) && !afterBe ? 'ตัวเลข' : afterBe ? (/ing$/.test(t) ? 'กริยา + ing' : is('det', t) || is('obj', t) || /^[A-Z0-9]/.test(raw[i]) ? 'คำนาม' : 'คุณศัพท์') : 'กรรม';
      out.push(lab); i++;
      while(i < n && !is('prep', T[i]) && !is('conj', T[i]) && !is('time', T[i]) && !(/ly$/.test(T[i]) && i === n - 1 && !is('det', T[i - 1]))) i++;
      first = false; afterBe = false;
    }
  };
  const pred = () => { // หลังประธาน
    if(is('freq', T[i])){ out.push('คำบอกความถี่'); i++; }
    if(is('be', T[i]) || neg(T[i]) && /^(is|are|was|were)/.test(T[i])){ out.push('Verb to be'); if(neg(T[i])) out.push('not'); i++; if(T[i] === 'not'){ out.push('not'); i++; } return rest(true); }
    if(is('aux', T[i]) || neg(T[i])){ out.push('กริยาช่วย'); if(neg(T[i])) out.push('not'); i++; if(T[i] === 'not'){ out.push('not'); i++; } if(is('freq', T[i])) i++; if(T[i] === 'be'){ out.push('be'); i++; return rest(true); } }
    if(i >= n) return;
    if(is('conj', T[i]) || is('prep', T[i]) || is('det', T[i])) return bad = true;
    out.push('กริยา'); i++; rest(is('link', T[i - 1]));
  };
  if(is('wh', T[0]) || /^(what|where|who|how)'s$/.test(T[0])){
    if(!raw[n - 1] || !/\?\s*$/.test(ex)) return null;
    out.push('คำถาม'); i = 1;
    if(beC(T[0])){ out.push('Verb to be'); if(i < n){ np() || i++; out.push('ประธาน'); } rest(true); return out; }
    if(/^(much|many|old|long|far|often|time|kind|day|color|colour)$/.test(T[1])) i = 2;
    if(is('be', T[i]) || is('aux', T[i]) || neg(T[i])){
      const be = is('be', T[i]); out.push(be ? 'Verb to be' : 'กริยาช่วย'); i++;
      if(i < n){ const s = i; if(!np(be)) i = s + 1; out.push('ประธาน'); }
      if(be) rest(true); else if(i < n){ out.push('กริยา'); i++; rest(false); }
      return out;
    }
    out.push('กริยา'); i++; rest(false); return out;
  }
  if(is('be', T[0]) || is('aux', T[0])){
    if(!/\?\s*$/.test(ex)) return null;
    const be = is('be', T[0]); out.push(be ? 'Verb to be' : 'กริยาช่วย'); i = 1;
    if(!np(be)) i++; else if(i >= n && n > 2) i = n - 1; out.push('ประธาน');
    if(be) rest(true); else if(i < n){ out.push('กริยา'); i++; rest(false); }
    return out;
  }
  if(beC(T[0])){ out.push('ประธาน', 'Verb to be'); i = 1; if(T[1] === 'not'){ out.push('not'); i = 2; } rest(true); return out; }
  const ctr = T[0].match(/^(i|you|he|she|we|they|it|that|there)'(ll|d|ve)$/);
  if(ctr){ out.push('ประธาน', 'กริยาช่วย'); i = 1; if(T[1] === 'not'){ out.push('not'); i = 2; } if(T[i] === 'be'){ out.push('be'); i++; return rest(true), out; } if(i < n){ out.push('กริยา'); i++; rest(is('link', T[i - 1])); } return out; }
  if(T[0] === 'please' || T[0] === "don't" || T[0] === "let's"){ out.push(T[0] === 'please' ? 'Please' : raw[0]); i = 1; }
  else if(/,/.test(ex)) return null;
  else if(np()){ out.push('ประธาน'); pred(); return out.length > 1 && !bad ? out : null; }
  else { // ไม่มีตัวกำหนด: ประธานเป็นคำนาม (เจอ be/กริยาช่วยภายใน 3 คำ หรือคำนามพหูพจน์ตามด้วยกริยา) ไม่งั้นเป็นประโยคคำสั่ง
    const b = T.findIndex(t => is('be', t) || is('aux', t) || neg(t));
    if(b > 0 && b <= 3 && !T.slice(0, b).some(t => /ly$/.test(t))){ i = b; out.push('ประธาน'); pred(); return bad ? null : out; }
    if(/[^s]s$/.test(T[0]) && !is('det', T[1]) && !is('prep', T[1]) || verbish(T[1]) && (!/s$/.test(T[1]) || /ing$/.test(T[0]))){ i = 1; out.push('ประธาน'); pred(); return bad ? null : out; }
  }
  if(i >= n) return null;
  if(T[i] === 'be'){ out.push('be'); i++; rest(true); return out; }
  out.push(out.length ? 'กริยา' : 'กริยา (คำสั่ง)'); i++; rest(is('link', T[i - 1]));
  return out.length > 1 ? out : null;
}
function engEx(t, w, pool){
  if(t === 'blank'){
    const re = new RegExp('\\b' + w.en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\w*', 'i');
    if(w.ex && re.test(w.ex)) return { t, w, s: w.ex.replace(re, '_____'), opts: engOpts(w, pool, 'en') };
    t = 'word';
  }
  if(t === 'order'){
    // ตัดจุด/ตัวพิมพ์ใหญ่คำแรก ไม่ให้เดาลำดับจากรูปคำ
    const toks = engToks(w.ex);
    if(toks.length >= 3 && toks.length <= 9){ let s = shuf(toks); if(s.join(' ') === toks.join(' ')) s = s.reverse(); return { t, w, toks: s, pick: [] }; }
    t = 'word';
  }
  if(t === 'type') return { t, w };
  return { t, w, opts: engOpts(w, pool, t === 'mean' ? 'th' : 'en') };
}
// แบบฝึกของคอร์สแบบข้อเลือก: ไวยากรณ์ (กฎ → เติมคำ → เรียงประโยค) / บทสนทนา / อ่านจับใจความ (เรื่อง → คำถาม)
function engGramItems(c, ws, items, u, test){
  const kind = COURSES[c].kind, ch = g => ({ w: g, opts: shuf([g.a, ...g.w]) });
  if(kind === 'read'){ items.push({ t: 'passage', w: ws[0] }); ws.forEach(g => items.push({ t: 'read', ...ch(g) })); return; }
  if(kind === 'dialog'){ shuf(ws).forEach(g => items.push({ t: 'dlg', ...ch(g) })); return; }
  if(!test) items.push({ t: 'rule', u });
  shuf(ws).forEach(g => items.push({ t: 'gram', ...ch(g) }));
  if(!test) shuf(ws).slice(0, 2).forEach(g => items.push(engEx('order', { en: g.a, th: '', ex: g.q.replace('___', g.a), tr: g.tr }, [])));
}
function lessonStart(c, i, custom){
  const E = engState(), x = custom ? { key: null, ws: custom } : engFlat(c)[i], ws = x.ws, pool = engPool(c).concat(custom || []), items = [];
  if(COURSES[c].gram){
    engGramItems(c, ws, items, x.u);
    LS = { c, i, key: x.key, ws, gram: true, items, k: 0, ok: 0, bad: 0, combo: 0, maxC: 0, t0: Date.now(), redo: new Set(), miss: new Set(), st: null };
    return renderCards();
  }
  const types = ['word', 'blank', 'order', 'type', ...('speechSynthesis' in window ? ['listen'] : [])];
  for(let k = 0; k < ws.length; k += 2){
    const pair = ws.slice(k, k + 2);
    pair.forEach(w => { if(!E.known[w.en]) items.push({ t: 'intro', w }); });
    pair.forEach(w => items.push(engEx('mean', w, pool)));
  }
  shuf(ws).forEach(w => items.push(engEx(types[Math.floor(Math.random() * types.length)], w, pool)));
  items.push({ t: 'match', ws: shuf(ws).slice(0, 4), done: [], err: 0 });
  LS = { c, i, key: x.key, ws, items, k: 0, ok: 0, bad: 0, combo: 0, maxC: 0, t0: Date.now(), redo: new Set(), miss: new Set(), st: null };
  renderCards();
}
const ENG_KIND = { intro: ['คำใหม่', '#0f9d76', 'sparkles'], mean: ['คำนี้แปลว่าอะไร', '#2f6fb5', 'languages'], word: ['ภาษาอังกฤษคือคำไหน', '#8b5cf6', 'type'],
  listen: ['ฟังแล้วเลือกคำที่ได้ยิน', '#e8590c', 'headphones'], blank: ['เติมคำในช่องว่าง', '#1098ad', 'text-cursor-input'], order: ['เรียงเป็นประโยค', '#d6336c', 'list-ordered'],
  match: ['จับคู่คำกับคำแปล', '#ca8a04', 'puzzle'], rule: ['กฎไวยากรณ์', '#4f46e5', 'book-open'], gram: ['เลือกคำที่ถูกต้อง', '#e8590c', 'spell-check'],
  dlg: ['เลือกประโยคตอบให้เหมาะสม', '#0ea5e9', 'message-circle'], passage: ['อ่านเรื่อง', '#16a34a', 'book-open-text'], read: ['ตอบคำถามจากเรื่อง', '#16a34a', 'circle-help'],
  type: ['พิมพ์เป็นภาษาอังกฤษ', '#db2777', 'keyboard'] };
const ENG_OC = ['#2f6fb5', '#0f9d76', '#e8590c', '#8b5cf6'];
function renderLesson(){
  const L = LS; $$('.tw-tip').forEach(x => x.remove());
  const fresh = L._k !== L.k; L._k = L.k; // อนิเมชันเข้าเฉพาะตอนเปลี่ยนข้อ (แตะคำเรียงประโยคไม่เล่นซ้ำ)
  if(L.k >= L.items.length) return lessonEnd();
  const it = L.items[L.k], w = it.w, col = L.col || COURSES[L.c].color;
  const say = `<button class="ls-say" data-say><i data-lucide="volume-2"></i></button><button class="ls-say slow" data-slow title="ฟังช้า"><i data-lucide="snail"></i></button>`;
  const opts = (it.opts || []).map((o, k) => `<button class="ls-opt" data-o="${k}" style="--b:${ENG_OC[k % 4]}"><em>${'ABCD'[k]}</em>${esc(o)}</button>`).join('');
  let body = '';
  if(it.t === 'intro') body = `<div class="ls-intro" style="--c:${col}"><span class="ls-new">คำใหม่</span><h2>${esc(w.en)}</h2><div class="ls-says">${say}</div>
      <p class="th">${esc(w.th)}</p>${w.ex ? `<p class="ex">${engTw(w.ex)}</p>` : ''}${w.tr ? `<small class="tr">${esc(w.tr)}</small>` : ''}</div>`;
  if(it.t === 'rule') body = `<div class="ls-rule"><b>${engTw(it.u.t)}</b>${it.u.rule.split('·').map(r => `<span>${engTw(r.trim())}</span>`).join('')}</div>`;
  if(it.t === 'dlg') body = `<div class="ls-chat">${w.lines.map(l => { const m = l.match(/^([AB]):\s*(.*)$/) || [0, 'A', l], me = m[1] === 'B';
      return `<div class="ls-bub ${me ? 'me' : ''}"><em>${m[1]}</em><span>${m[2] === '___' ? '<i class="ls-dots"><b></b><b></b><b></b></i>' : engTw(m[2])}</span></div>`; }).join('')}</div><div class="ls-opts">${opts}</div>`;
  if(it.t === 'passage' || it.t === 'read') body = `<div class="ls-pass ${it.t === 'read' ? 'mini' : ''}"><b>${esc(w.title)}</b>
      <button class="ls-say" data-readp><i data-lucide="volume-2"></i></button><p>${engTw(w.text)}</p>
      ${it.t === 'passage' ? `<button class="ls-trbtn" id="lsTr"><i data-lucide="languages"></i>ดูคำแปล</button><p class="ls-ptr" hidden>${esc(w.ptr)}</p>` : ''}</div>
      ${it.t === 'read' ? `<p class="ls-q">${esc(w.q)}</p><div class="ls-opts">${opts}</div>` : ''}`;
  if(it.t === 'gram') body = `<p class="ls-sent">${engTw(w.q).replace('___', '<u>_____</u>')}</p><div class="ls-opts">${opts}</div>`;
  if(it.t === 'mean') body = `<h2 class="ls-word">${esc(w.en)} ${say}</h2><div class="ls-opts">${opts}</div>`;
  if(it.t === 'word') body = `<h2 class="ls-word th">${esc(w.th)}</h2><div class="ls-opts">${opts}</div>`;
  if(it.t === 'listen') body = `<div class="ls-listen"><button class="ls-big-say" data-say><i data-lucide="volume-2"></i></button><button class="ls-big-say slow" data-slow title="ฟังช้า"><i data-lucide="snail"></i></button></div><div class="ls-opts">${opts}</div>`;
  if(it.t === 'type') body = `<h2 class="ls-word th">${esc(w.th)}</h2><input class="inp ls-type" id="lsIn" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="พิมพ์เป็นภาษาอังกฤษ">
      ${L.st === null ? '<button class="btn lg block" id="lsCheckT">ตรวจ</button>' : ''}`;
  if(it.t === 'blank') body = `<p class="ls-sent">${engTw(it.s)}</p><small class="ls-hint">${esc(w.th)}</small><div class="ls-opts">${opts}</div>`;
  if(it.t === 'order') body = `<small class="ls-hint">${w.tr ? esc(w.tr) : `ใช้คำว่า <b>${esc(w.en)}</b> = ${esc(w.th)}`}</small>
      ${it.st ? `<div class="ls-struct"><i data-lucide="lightbulb"></i>${it.st.map(x => `<span>${esc(x)}</span>`).join('<em>+</em>')}</div>` : ''}
      <div class="ls-ans">${it.pick.map((k, j) => `<button class="ls-tile ${it.pop && j === it.pick.length - 1 ? 'pop' : ''}" data-back="${k}">${esc(it.toks[k])}</button>`).join('')}</div>
      <div class="ls-tiles">${it.toks.map((s, k) => `<button class="ls-tile ${it.pick.includes(k) ? 'used' : ''}" data-tok="${k}">${esc(s)}</button>`).join('')}</div>
      ${L.st === null ? `<div class="ls-help"><button class="ls-help-btn" id="lsHint"><i data-lucide="lightbulb"></i>คำใบ้</button><button class="ls-help-btn" id="lsShow"><i data-lucide="eye"></i>ดูเฉลย</button></div>
        <button class="btn lg block" id="lsCheck" ${it.pick.length ? '' : 'disabled'}>ตรวจ</button>` : ''}`;
  if(it.t === 'match'){
    it.en = it.en || shuf(it.ws.map(x => x.en)); it.th = it.th || shuf(it.ws.map(x => x.th));
    body = `<div class="ls-match"><div>${it.en.map(e => `<button class="ls-tile ${it.done.includes(e) ? 'ok' : ''} ${it.sel === e ? 'sel' : ''}" data-me="${esc(e)}">${esc(e)}</button>`).join('')}</div>
      <div>${it.th.map(t => { const e = it.ws.find(x => x.th === t).en; return `<button class="ls-tile ${it.done.includes(e) ? 'ok' : ''}" data-mt="${esc(e)}">${esc(t)}</button>`; }).join('')}</div></div>`;
  }
  $('#view').innerHTML = `<div class="ls-wrap" style="--c:${col}">
    <div class="ls-top"><button class="ib" id="lsX"><i data-lucide="x"></i></button>
      <div class="vc-prog"><i style="width:${L.k / L.items.length * 100}%"></i></div>${L.deadline ? '<span class="ls-time" id="lsTime"></span>' : ''}</div>
    <div class="ls-body ${fresh ? 'in' : ''}"><span class="ls-kind" style="--k:${ENG_KIND[it.t][1]}"><i data-lucide="${ENG_KIND[it.t][2]}"></i>${ENG_KIND[it.t][0]}</span>${body}</div>
    <div id="lsFb">${it.t === 'intro' || it.t === 'rule' || it.t === 'passage' ? '<button class="btn lg block" id="lsNext">ต่อไป</button>' : ''}</div></div>`;
  if(it.opts && $('.ls-opts') && it.opts.every(x => String(x).length <= 24)) $('.ls-opts').classList.add('short'); // ตัวเลือกสั้น → แนวนอนแบ่ง 2 คอลัมน์
  $$('[data-say]').forEach(b => b.onclick = () => engSay(w.en));
  $$('[data-slow]').forEach(b => b.onclick = () => engSay(w.en, true));
  if(it.t === 'listen' || it.t === 'intro') setTimeout(() => engSay(w.en), 250);
  const ans = it.t === 'mean' ? w && w.th : ['gram', 'dlg', 'read'].includes(it.t) ? w.a : w && w.en;
  if($('[data-readp]')) $('[data-readp]').onclick = () => speakWord(w.text);
  if($('#lsTr')) $('#lsTr').onclick = () => { const t = $('.ls-ptr'); t.hidden = !t.hidden; $('#lsTr').lastChild.textContent = t.hidden ? 'ดูคำแปล' : 'ซ่อนคำแปล'; };
  $$('[data-o]').forEach(b => b.onclick = () => {
    if(L.st !== null) return;
    const ok = it.opts[+b.dataset.o] === ans;
    $$('.ls-opt').forEach(x => { x.disabled = true; if(it.opts[+x.dataset.o] === ans) x.classList.add('ok'); });
    if(!ok) b.classList.add('bad');
    lessonFb(ok, ans);
  });
  $$('[data-tok]').forEach(b => b.onclick = () => { const k = +b.dataset.tok; if(L.st !== null || it.pick.includes(k)) return; it.pick.push(k); it.pop = true; renderLesson(); });
  $$('[data-back]').forEach(b => b.onclick = () => { if(L.st !== null) return; it.pick = it.pick.filter(k => k !== +b.dataset.back); it.pop = false; renderLesson(); });
  // คำใบ้: วางคำถัดไปที่ถูกให้ (ตัดคำที่วางผิดออกก่อน) · ดูเฉลย: วางให้ครบ แล้วนับว่าผิด (ข้อจะวนกลับมาให้ทำเอง)
  const engFix = n => { const T = engToks(w.ex), used = []; it.pick = it.pick.filter((k, p) => p < T.length && it.toks[k] === T[p] && (used.push(k), true) && it.pick.slice(0, p).every((q, j) => it.toks[q] === T[j]));
    for(let p = it.pick.length, e = Math.min(T.length, p + n); p < e; p++){ const k = it.toks.findIndex((x, i) => x === T[p] && !it.pick.includes(i)); if(k < 0) break; it.pick.push(k); } };
  // ครั้งแรกบอกโครงสร้างประโยค ครั้งต่อไปวางคำให้ทีละคำ
  if($('#lsHint')) $('#lsHint').onclick = () => { if(!it.st && (it.st = engStruct(w.ex))); else engFix(1); it.hinted = true; it.pop = false; renderLesson(); };
  if($('#lsShow')) $('#lsShow').onclick = () => { engFix(99); renderLesson(); $('#lsCheck') && $('#lsCheck').remove(); $('.ls-help') && $('.ls-help').remove(); lessonFb(false, w.ex); };
  if($('#lsCheck')) $('#lsCheck').onclick = () => {
    const norm = s => s.toLowerCase().replace(/[^a-z0-9' ]/g, '').replace(/\s+/g, ' ').trim();
    const ok = norm(it.pick.map(k => it.toks[k]).join(' ')) === norm(w.ex);
    if(ok) $$('.ls-ans .ls-tile').forEach((t, j) => { t.style.setProperty('--i', j); t.classList.add('win'); });
    $('#lsCheck').remove(); lessonFb(ok, w.ex);
  };
  if($('#lsCheckT')){
    const go = () => {
      const v = $('#lsIn').value; if(!v.trim()) return $('#lsIn').focus();
      const norm = x => x.toLowerCase().replace(/[^a-z' ]/g, '').replace(/\s+/g, ' ').trim(), a = norm(v), t = norm(w.en);
      const near = a !== t && t.length >= 5 && engLev(a, t) <= 1, ok = a === t || near;
      $('#lsIn').disabled = true; $('#lsIn').classList.add(ok ? 'ok' : 'bad'); $('#lsCheckT').remove();
      lessonFb(ok, w.en);
      if(near) $('.ls-fb > div').insertAdjacentHTML('beforeend', `<span>สะกดที่ถูก: ${esc(w.en)}</span>`);
    };
    $('#lsCheckT').onclick = go;
    $('#lsIn').onkeydown = e => { if(e.key === 'Enter') go(); };
    setTimeout(() => $('#lsIn') && $('#lsIn').focus(), 300);
  }
  $$('[data-me]').forEach(b => b.onclick = () => { if(it.done.includes(b.dataset.me)) return; it.sel = b.dataset.me; engSay(it.sel); renderLesson(); });
  $$('[data-mt]').forEach(b => b.onclick = () => {
    const e = b.dataset.mt; if(!it.sel || it.done.includes(e)) return;
    if(e === it.sel){ it.done.push(e); it.sel = null; playTone('pick'); renderLesson(); if(it.done.length === it.ws.length) lessonFb(it.err === 0, '', true); }
    else{ it.err++; b.classList.add('bad'); playTone('wrong'); setTimeout(() => b.classList.remove('bad'), 400); }
  });
  if($('#lsNext')) $('#lsNext').onclick = () => { L.k++; renderLesson(); };
  $('#lsX').onclick = async () => { if(L.k && !await ask(L.exam ? 'ออกจากการสอบ?' : 'ออกจากบทเรียน?', 'ยังไม่บันทึก', 'ออก')) return; LS = null; renderCards(); };
  if(L.deadline) engClock();
  icons();
}
function lessonFb(ok, ans, noRedo){
  const L = LS, it = L.items[L.k];
  L.st = ok;
  { const A = engState().acc || (engState().acc = {}), a = A[it.t] || (A[it.t] = [0, 0]); a[1]++; if(ok) a[0]++; } // ความแม่นยำตามแบบฝึก
  if(ok){ L.ok++; L.combo++; L.maxC = Math.max(L.maxC, L.combo); }
  else{
    L.bad++; L.combo = 0;
    if(it.w){ L.miss.add(it.w.en); if(!noRedo && !L.exam && !L.redo.has(L.k)){ L.redo.add(L.items.length); L.items.push(['gram', 'dlg', 'read'].includes(it.t) ? { ...it, opts: shuf(it.opts) } : it.t === 'order' ? engEx('order', it.w, []) : engEx(it.t, it.w, engPool(L.c).concat(L.ws))); } }
  }
  playTone(ok ? 'ok' : 'wrong');
  if(ok && S.settings.sound && navigator.vibrate) try { navigator.vibrate(12); } catch(e){} // ตอบผิดไม่สั่นเครื่อง
  $('#lsFb').innerHTML = `<div class="ls-fb ${ok ? 'ok' : 'bad'}"><div><b>${ok ? ENG_PRAISE[Math.floor(Math.random() * ENG_PRAISE.length)] : it.t === 'order' ? 'ประโยคที่ถูกอยู่ด้านล่าง' : 'คำตอบที่ถูก'}</b>
    ${!ok && ans && it.t !== 'order' ? `<span>${esc(ans)}</span>` : ''}</div>${ok && L.combo >= 3 ? `<span class="ls-combo ${[3, 5, 10, 15, 20, 30].includes(L.combo) ? 'big' : ''}" data-t="${L.combo >= 10 ? 3 : L.combo >= 5 ? 2 : 1}"><i data-lucide="flame"></i>${L.combo} ติด</span>` : ''}<button class="btn lg" id="lsNext">ต่อไป</button></div>`;
  // ประโยคเต็ม + คำแปล + อ่านให้ฟัง (เติมคำ / เรียงประโยค / ไวยากรณ์)
  const full = it.t === 'gram' ? it.w.q.replace('___', it.w.a) : it.t === 'dlg' ? it.w.a : (it.t === 'blank' || it.t === 'order') ? it.w.ex : '';
  if(full){
    $('#lsFb').insertAdjacentHTML('beforeend', `<div class="ls-full">${it.t === 'gram' && it.w.why ? `<small class="ls-why"><i data-lucide="lightbulb"></i>${esc(it.w.why)}</small>` : ''}
      <button class="ls-say" data-sayfull><i data-lucide="volume-2"></i></button><button class="ls-say slow" data-sayslow title="ฟังช้า"><i data-lucide="snail"></i></button><div><b>${engTw(full)}</b>${it.w.tr ? `<small>${esc(it.w.tr)}</small>` : ''}</div></div>`);
    $('[data-sayfull]').onclick = () => speakWord(full);
    $('[data-sayslow]').onclick = () => speakWord(full, true);
  }
  // ตอบถูกเท่านั้นถึงอ่านออกเสียง (ประโยคเต็ม หรือคำศัพท์)
  if(ok) setTimeout(() => full ? speakWord(full) : it.w && it.w.en && engSay(it.w.en), 350);
  icons($('#lsFb'));
  requestAnimationFrame(() => $('#lsNext') && $('#lsNext').scrollIntoView({ block: 'nearest', behavior: 'smooth' }));
  if(ok){ const r = $('#lsFb').getBoundingClientRect(); engConfetti(L.combo >= 3 ? 22 : 12, r.left + 40, r.top + 20); }
  $('#lsNext').onclick = () => { L.k++; L.st = null; renderLesson(); };
}
function lessonEnd(){
  const L = LS, E = engState();
  if(!L.res){
    const tot = L.ok + L.bad, acc = tot ? Math.round(L.ok / tot * 100) : 100;
    const stars = acc >= 90 ? 3 : acc >= 70 ? 2 : 1, bonus = L.maxC >= 5 ? 5 : 0, xp = 10 + Math.round(acc / 10) + bonus;
    const before = engToday();
    if(L.key) E.done[L.key] = Math.max(E.done[L.key] || 0, stars);
    if(L.exam){ clearInterval(ENG_TIMER); L.pass = acc >= 80; if(L.pass && !E.lvPass[L.exam.L]) E.lvPass[L.exam.L] = dkey(); }
    E.xp = (E.xp || 0) + xp; E.days[dkey()] = before + xp; E.maxC = Math.max(E.maxC || 0, L.maxC);
    L.goal = before < E.goal && before + xp >= E.goal;
    // คำในบทเข้าคลัง "ทบทวน" (ระบบทวนตามรอบวัน)
    const deck = COURSES[L.c].name;
    if(!L.gram) L.ws.forEach(w => {
      E.known[w.en] = 1;
      let c = S.cards.find(x => vcText(x.f).toLowerCase() === w.en.toLowerCase());
      if(!c){ c = { id: uid(), f: w.en, b: w.th, ex: w.ex, deck, box: 0, due: 0 }; S.cards.push(c); }
      const miss = L.miss.has(w.en); c.seen = 1; c.box = miss ? 0 : Math.max(c.box || 0, 1); c.due = Date.now() + VC_GAP[c.box] * 864e5;
    });
    L.res = { stars, xp, acc, bonus, sec: (Date.now() - L.t0) / 1000 };
    E.badges = E.badges || {};
    L.newB = ENG_BADGES.filter(b => !E.badges[b[0]] && b[3](E));
    L.newB.forEach(b => E.badges[b[0]] = dkey());
    save(); syncChrome(); playTone('submit');
  }
  const r = L.res;
  const T = L.exam;
  $('#view').innerHTML = `<div class="vc-done"><span class="vc-done-ic ${T && !L.pass ? 'fail' : ''}"><i data-lucide="${T ? (L.pass ? 'award' : 'rotate-ccw') : 'trophy'}"></i></span>
    <b>${T ? (L.pass ? `ผ่าน Lv.${T.L}!` : 'ยังไม่ผ่าน') : 'จบบทเรียน'}</b>${T && !L.pass ? '<p>ต้องได้ 80% ขึ้นไป ทวนบทที่ยังอ่อนแล้วลองใหม่นะ</p>' : ''}
    ${T && L.pass ? `<div class="eng-cert" style="--c:${L.col}"><small>ใบประกาศ</small><b>Lv.${T.L} ${ENG_LEVELS[T.L]}</b><span>${r.acc}% · ${dkey()}</span>${T.L + 1 < ENG_LV_N ? `<em>ปลดล็อก Lv.${T.L + 1} แล้ว</em>` : ''}</div>` : ''}
    <div class="ls-stars">${[0, 1, 2].map(k => `<span class="${k < r.stars ? 'on' : ''}" style="animation-delay:${.1 + k * .12}s">★</span>`).join('')}</div>
    ${r.bonus ? `<span class="ls-combo"><i data-lucide="flame"></i>คอมโบ ${LS.maxC} ติด +${r.bonus} XP</span>` : ''}
    ${(L.newB || []).length ? `<div class="ls-newb"><small>ได้ถ้วยรางวัลใหม่!</small>${L.newB.map(b => `<span class="eng-badge on"><i data-lucide="${b[2]}"></i>${b[1]}</span>`).join('')}</div>` : ''}
    <div class="ls-res"><div><b id="lsXp">+0</b><small>XP</small></div><div><b>${r.acc}%</b><small>แม่นยำ</small></div><div><b>${mmss(r.sec)}</b><small>เวลา</small></div></div>
    ${T && !L.pass ? '<button class="btn ghost lg block" id="lsRetry" style="margin-bottom:8px"><i data-lucide="rotate-ccw"></i>ลองใหม่</button>' : ''}
    <button class="btn lg block" id="lsDone">ต่อไป</button></div>`;
  $('#lsDone').onclick = () => { LS = null; if(T && L.pass) ENG_LV = null; renderCards(); $('.main').scrollTo(0, 0); };
  if($('#lsRetry')) $('#lsRetry').onclick = () => levelExam(T.L);
  icons();
  // XP วิ่งขึ้น + พลุ (ได้ 3 ดาว หรือถึงเป้าวันนี้)
  const t0 = performance.now(), tick = t => { const p = Math.min(1, (t - t0) / 700); const e = $('#lsXp'); if(!e) return; e.textContent = '+' + Math.round(r.xp * (1 - Math.pow(1 - p, 3))); if(p < 1) requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
  if(r.stars === 3 || L.goal || L.pass || (L.newB || []).length) setTimeout(() => engConfetti(40, innerWidth / 2, innerHeight / 3), 350);
  if(L.goal){ L.goal = false; setTimeout(() => toast('ถึงเป้าวันนี้แล้ว!', 'ok'), 700); }
}
// พลุกระดาษเล็กๆ
function engConfetti(n, x, y){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cols = ['#facc15', '#22c55e', '#3b82f6', '#ef4444', '#a855f7', '#f97316'];
  for(let k = 0; k < n; k++){
    const e = document.createElement('i'), a = Math.random() * Math.PI * 2, d = 50 + Math.random() * 110;
    e.className = 'eng-conf';
    e.style.cssText = `left:${x}px;top:${y}px;background:${cols[k % cols.length]};--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d - 50}px;--r:${Math.random() * 720 - 360}deg`;
    document.body.appendChild(e); setTimeout(() => e.remove(), 1000);
  }
}

// ---------- แตะคำในประโยคเพื่อดูความหมาย ----------
let ENG_DICT = null, ENG_PHR = null;
const engTw = t => String(t || '').split(/(\s+)/).map(x => /[A-Za-z]/.test(x) ? `<span class="tw">${esc(x)}</span>` : esc(x)).join('');
const engStem = w => [w, w.replace(/ies$/, 'y'), w.replace(/ied$/, 'y'), w.replace(/es$/, ''), w.replace(/s$/, ''), w.replace(/ed$/, ''), w.replace(/d$/, ''), w.replace(/ing$/, ''), w.replace(/ing$/, 'e'), w.replace(/(.)\1ed$/, '$1'), w.replace(/(.)\1ing$/, '$1')];
// คำเดี่ยว: คำศัพท์ในบทเรียน > คำพื้นฐาน · วลี (get up, Chiang Mai) แยกไว้ ใช้เมื่อแตะคำที่อยู่ติดกันในประโยค
function engLookup(w){
  if(!ENG_DICT){
    ENG_DICT = new Map(); ENG_PHR = new Map();
    const add = (k, v) => { k = k.toLowerCase().trim(); if(!k || !v) return; const m = /\s/.test(k) ? ENG_PHR : ENG_DICT; if(!m.has(k)) m.set(k, v); };
    Object.values(COURSES).filter(C => !C.gram).forEach(C => C.units.forEach(u => u.ls.flat().forEach(x => add(x.en, x.th))));
    S.cards.forEach(c => add(vcText(c.f), vcText(c.b)));
    // พจนานุกรมแยกไฟล์: js/dict-words.js, js/dict-phrases.js, js/dict-idioms.js (บรรทัดละ คำ | แปล)
    [DICT_WORDS, DICT_PHRASES, DICT_IDIOMS].join('\n').split('\n').forEach(l => { const [k, v] = l.split('|').map(x => x && x.trim()); add(k, v); });
  }
  if(w === "let's") return 'มา…กันเถอะ (let us)';
  const c = w.match(/^([a-z]+)('s|'re|'m|'ll|'ve|'d|n't)$/);
  if(c && c[2] === "'s" && !/^(it|he|she|that|what|where|who|how|there|here)$/.test(c[1])){ const a = engLookup(c[1]); return a ? `${a} (ของ…)` : ''; }
  if(c && c[2] === "n't"){ const base = c[1] === 'wo' ? 'will' : c[1] === 'ca' ? 'can' : c[1], a = engLookup(base); return a ? `${base} not · ไม่${/^do/.test(base) && base !== 'done' ? '' : ' + ' + a.split('/')[0]}` : ''; }
  if(c){ const base = c[1] === 'wo' ? 'will' : c[1] === 'ca' ? 'can' : c[1], full = { "'s": 'is', "'re": 'are', "'m": 'am', "'ll": 'will', "'ve": 'have', "'d": 'would', "n't": 'not' }[c[2]];
    const a = engLookup(base), b = engLookup(full); return a ? `${base} ${full} · ${a} + ${b}` : ''; }
  for(const k of engStem(w)) if(ENG_DICT.has(k)) return ENG_DICT.get(k);
  if(/ly$/.test(w)){ const a = engLookup(w.replace(/ily$/, 'y').replace(/ly$/, '')) || engLookup(w.replace(/ly$/, 'le')); if(a) return 'อย่าง' + a.split(/[,/]/)[0]; }
  if(/-/.test(w)){ const ps = w.split('-').filter(Boolean).map(engLookup); if(ps.every(Boolean)) return ps.map(x => x.split(/[,/]/)[0]).join(' + '); }
  return '';
}
function engPhrase(ws){ // ws: คำที่แตะ + คำถัดไป/ก่อนหน้า (ตัวพิมพ์เล็ก) → [วลี, แปล]
  engLookup('a');
  for(const n of [5, 4, 3, 2]) for(let s = 0; s + n <= ws.length; s++){ if(!ws.slice(s, s + n).includes(ws.i)) continue;
    const p = ws.slice(s, s + n); for(const f of engStem(p[0])){ const k = [f, ...p.slice(1)].join(' '); if(ENG_PHR.has(k)) return [p.join(' '), ENG_PHR.get(k)]; } }
  return null;
}
document.addEventListener('click', e => {
  const t = e.target.closest && e.target.closest('.tw'); if(!t) return;
  e.stopPropagation();
  const raw = t.textContent, w = raw.toLowerCase().replace(/[’]/g, "'").replace(/[^a-z'-]/g, '').replace(/^'+|'+$/g, ''), r = t.getBoundingClientRect();
  // คำข้างเคียงในประโยคเดียวกัน (ไม่ข้ามเครื่องหมายวรรคตอน)
  const sib = (el, d) => { const out = []; let x = el, prev = el; for(let k = 0; k < 4; k++){ x = d > 0 ? x.nextElementSibling : x.previousElementSibling;
    if(!x || !x.classList.contains('tw') || /[.,!?;:]$/.test((d > 0 ? prev : x).textContent)) break; out.push(x.textContent.toLowerCase().replace(/[’]/g, "'").replace(/[^a-z'-]/g, '')); prev = x; } return out; };
  const L = sib(t, -1).reverse(), ws = [...L, w, ...sib(t, 1)]; ws.i = w;
  const ph = engPhrase(ws), th = ph ? ph[1] : engLookup(w);
  const pv = t.previousElementSibling, name = !th && /^[A-Z]/.test(raw) && pv && pv.classList.contains('tw') && !/[.!?]$/.test(pv.textContent);
  $$('.tw-tip').forEach(x => x.remove()); $$('.tw.on').forEach(x => x.classList.remove('on')); t.classList.add('on');
  const tip = document.createElement('div'); tip.className = 'tw-tip';
  tip.innerHTML = `<b>${esc(ph ? ph[0] : w)}</b><span>${th ? esc(th) : name ? 'ชื่อเฉพาะ (ชื่อคน/สถานที่)' : 'ยังไม่มีในคลังคำ'}</span>`;
  document.body.appendChild(tip);
  tip.style.left = Math.max(8, Math.min(innerWidth - tip.offsetWidth - 8, r.left + r.width / 2 - tip.offsetWidth / 2)) + 'px';
  tip.style.top = (r.top - tip.offsetHeight - 8 < 8 ? r.bottom + 8 : r.top - tip.offsetHeight - 8) + 'px';
  speakWord(ph ? ph[0] : w);
  setTimeout(() => { tip.remove(); t.classList.remove('on'); }, 2600);
}, true);
// ระยะแก้คำ (สะกดผิด 1 ตัวยังนับว่าถูก)
function engLev(a, b){
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for(let j = 1; j <= b.length; j++) d[0][j] = j;
  for(let i = 1; i <= a.length; i++) for(let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}

// ---------- ถ้วยรางวัล + สถิติ ----------
const engDoneN = E => Object.keys(E.done).length;
const ENG_BADGES = [
  ['first', 'บทแรก', 'sparkles', E => engDoneN(E) >= 1],
  ['l10', 'ผ่าน 10 บท', 'book-open', E => engDoneN(E) >= 10],
  ['l50', 'ผ่าน 50 บท', 'library', E => engDoneN(E) >= 50],
  ['s3', 'ต่อเนื่อง 3 วัน', 'flame', () => engStreak() >= 3],
  ['s7', 'ต่อเนื่อง 7 วัน', 'flame', () => engStreak() >= 7],
  ['s30', 'ต่อเนื่อง 30 วัน', 'flame', () => engStreak() >= 30],
  ['w50', 'รู้ 50 คำ', 'languages', E => Object.keys(E.known).length >= 50],
  ['w200', 'รู้ 200 คำ', 'languages', E => Object.keys(E.known).length >= 200],
  ['star10', '3 ดาว 10 บท', 'star', E => Object.values(E.done).filter(v => v === 3).length >= 10],
  ['c10', 'คอมโบ 10', 'zap', E => (E.maxC || 0) >= 10],
  ['xp1k', '1,000 XP', 'trophy', E => (E.xp || 0) >= 1000],
  ['lv0', 'ผ่าน Lv.0', 'sprout', E => !!E.lvPass[0]],
  ['lv1', 'ผ่าน Lv.1', 'award', E => !!E.lvPass[1]],
  ['lv2', 'ผ่าน Lv.2', 'award', E => !!E.lvPass[2]],
  ['lv4', 'ผ่านทุกเลเวล', 'crown', E => !!E.lvPass[ENG_LV_N - 1]]
];
function renderEngStats(){
  const E = engState(), B = E.badges || {}, nb = ENG_BADGES.filter(b => B[b[0]]).length;
  const days = [...Array(7)].map((_, k) => { const d = new Date(); d.setDate(d.getDate() - 6 + k); return [d, E.days[dkey(d)] || 0]; });
  const mx = Math.max(E.goal, ...days.map(x => x[1])), TD = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];
  const acc = Object.entries(E.acc || {}).filter(([k, a]) => ENG_KIND[k] && a[1] >= 3).sort((a, b) => a[1][0] / a[1][1] - b[1][0] / b[1][1]);
  $('#view').innerHTML = engTabs() + `<div class="eng-stats">
    <div class="eng-tiles">${[['zap', '#eab308', (E.xp || 0).toLocaleString(), 'XP รวม'], ['flame', '#f97316', engStreak(), 'วันต่อเนื่อง'],
      ['languages', '#2f6fb5', Object.keys(E.known).length, 'คำที่เรียนแล้ว'], ['book-check', '#16a34a', engDoneN(E), 'บทที่ผ่าน']]
      .map(([ic, c, v, t], k) => `<div style="--q:${c};animation-delay:${k * .06}s"><i data-lucide="${ic}"></i><b>${v}</b><small>${t}</small></div>`).join('')}</div>
    <div class="card eng-card"><h3>XP 7 วันล่าสุด</h3><div class="eng-bars">${days.map(([d, v], k) => `<div class="${k === 6 ? 'today' : ''}"><em>${v || ''}</em>
      <i style="height:${Math.max(4, v / mx * 100)}%;animation-delay:${k * .05}s"></i><small>${TD[d.getDay()]}</small></div>`).join('')}</div></div>
    <div class="card eng-card"><h3>ความแม่นยำตามแบบฝึก</h3>${acc.length ? acc.map(([k, a]) => { const p = Math.round(a[0] / a[1] * 100);
      return `<div class="eng-row"><span style="--q:${ENG_KIND[k][1]}"><i data-lucide="${ENG_KIND[k][2]}"></i>${ENG_KIND[k][0]}</span><span class="vc-bar"><i style="width:${p}%;background:${p >= 80 ? 'var(--green)' : p >= 60 ? '#eab308' : 'var(--red)'}"></i></span><b>${p}%</b></div>`; }).join('')
      : '<p class="eng-muted">เรียนอีกสักหน่อยแล้วจะขึ้นตรงนี้</p>'}</div>
    <div class="card eng-card"><h3>เลเวล</h3>${ENG_LEVELS.map((t, L) => { const { F } = engLevel(L), n = F.filter(x => E.done[x.key]).length;
      return `<div class="eng-row"><span style="--q:${ENG_LV_C[L]}"><i data-lucide="${E.lvPass[L] ? 'award' : 'graduation-cap'}"></i>Lv.${L} ${t}</span><span class="vc-bar"><i style="width:${n / F.length * 100}%;background:${ENG_LV_C[L]}"></i></span><b>${n}/${F.length}</b></div>`; }).join('')}</div>
    <div class="card eng-card"><h3>ถ้วยรางวัล <small>${nb}/${ENG_BADGES.length}</small></h3><div class="eng-badges">${ENG_BADGES.map(b =>
      `<span class="eng-badge ${B[b[0]] ? 'on' : ''}"><i data-lucide="${B[b[0]] ? b[2] : 'lock'}"></i>${b[1]}</span>`).join('')}</div></div>
  </div>`;
  engBindTabs(); icons();
}

