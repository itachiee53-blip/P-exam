"use strict";
// ===== เรียนภาษาอังกฤษ: วัดระดับ → แผนที่บทเรียน → บทเรียน (แบบฝึกสร้างอัตโนมัติจาก js/lessons.js) =====
let ENG_TAB = 'learn', LS = null, PT = null, ONB = null;
const ENG_PRAISE = ['ถูกต้อง!', 'เยี่ยม!', 'เก่งมาก!', 'ใช่เลย!', 'สุดยอด!'];
function engState(){
  const E = S.eng || (S.eng = { course: 'police', lv: 0, done: {}, xp: 0, days: {}, goal: 30, known: {}, v: 2 });
  // ย้ายคีย์แบบเก่า (คอร์ส:ลำดับหน่วย:บท) เป็น (คอร์ส:ชื่อหน่วย:บท)
  if(!E.v){ const d = {}; Object.entries(E.done || {}).forEach(([k, v]) => { const [c, ui, li] = k.split(':'); const t = COURSES[c] && COURSES[c].def[+ui]; if(t) d[`${c}:${t}:${li}`] = v; }); E.done = d; E.v = 2; }
  return E;
}
const engFlat = c => COURSES[c].units.flatMap((u, ui) => u.ls.map((ws, li) => ({ c, ui, li, u, ws, key: `${c}:${u.t}:${li}` })));
const engPool = c => COURSES[c].units.flatMap(u => u.ls.flat());
const engLvWords = () => Object.values(COURSES).filter(C => !C.gram).flatMap(C => C.units.flatMap(u => u.ls.flat().map(w => ({ ...w, lv: u.lv }))));
const shuf = a => { a = a.slice(); for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
// ตัวเลือกหลอก: ไม่เอาคำเดียวกันที่มีอีกความหมาย (เช่น fine = ค่าปรับ / สบายดี)
const engOpts = (w, pool, f) => shuf([w[f], ...shuf([...new Set(pool.filter(x => x.en.toLowerCase() !== w.en.toLowerCase() && x.th !== w.th).map(x => x[f]))]).slice(0, 3)]);
const engSay = (t, slow) => speakWord(String(t).split('↔')[0], slow);
// บทที่เปิดได้: บทแรก / บทก่อนหน้าผ่านแล้ว / ต่ำกว่าระดับที่วัดได้ / บทแรกของระดับที่วัดได้
function engOpen(F, i){
  const E = engState();
  // + บทที่อยู่ก่อนบทที่เคยผ่านแล้ว (เช่น หน่วยใหม่ที่เพิ่มแทรกเข้ามา)
  return i === 0 || !!E.done[F[i - 1].key] || F[i].u.lv < E.lv || i === F.findIndex(x => x.u.lv >= E.lv) || F.slice(i).some(x => E.done[x.key]);
}
// ปุ่มเพิ่มคำ: ขึ้นเฉพาะหน้าแท็บทบทวน
const engBusy = () => !!(LS || PT || VC.run || !engState().lv || ENG_TAB === 'learn');
const engToday = () => engState().days[dkey()] || 0;
function engStreak(){
  const d = engState().days, t = new Date(); let n = 0;
  if(!d[dkey(t)]) t.setDate(t.getDate() - 1);
  while(d[dkey(t)]){ n++; t.setDate(t.getDate() - 1); }
  return n;
}
const engTabs = () => `<div class="eng-tabs" data-on="${ENG_TAB}">
  <button class="${ENG_TAB === 'learn' ? 'on' : ''}" data-etab="learn"><i data-lucide="graduation-cap"></i>บทเรียน</button>
  <button class="${ENG_TAB === 'review' ? 'on' : ''}" data-etab="review"><i data-lucide="layers"></i>ทบทวน</button></div>`;
const engBindTabs = () => $$('[data-etab]').forEach(b => b.onclick = () => { ENG_TAB = b.dataset.etab; renderCards(); });

// ---------- แผนที่บทเรียน ----------
function renderEngPath(){
  const E = engState(), C = COURSES[E.course], F = engFlat(E.course);
  // บทถัดไป: เริ่มที่ระดับที่วัดได้ก่อน ถ้าผ่านหมดแล้วค่อยย้อนไปบทที่ยังไม่ทำ
  const next = f => F.findIndex((x, i) => f(x) && engOpen(F, i) && !E.done[x.key]);
  let cur = next(x => x.u.lv >= E.lv); if(cur < 0) cur = next(() => true);
  const today = engToday(), pct = Math.min(100, Math.round(today / E.goal * 100)), RC = 2 * Math.PI * 21;
  const nx = F[cur], miss = C.gram ? 0 : engMiss().length, due = vcDueCount();
  const doneN = F.filter(x => E.done[x.key]).length;
  let i = 0, html = `<div class="eng-lay"><div class="eng-side">` + engTabs() + `
  <section class="eng-hero" style="--c:${C.color}">
    <span class="eng-bubbles"><i></i><i></i><i></i></span>
    <div class="eng-hero-top">
      <button class="eng-course" id="engCourse"><span class="eng-cic"><i data-lucide="${C.ic}"></i></span><b>${C.name}</b><i data-lucide="chevron-down"></i></button>
      <button class="eng-streak" id="engGoal" title="ไฟต่อเนื่อง / เป้าวันนี้"><i data-lucide="flame"></i>${engStreak()}
        <span class="eng-ring"><svg class="rg" viewBox="0 0 50 50"><circle cx="25" cy="25" r="21"/><circle class="fg" cx="25" cy="25" r="21" stroke-dasharray="${RC}" stroke-dashoffset="${RC * (1 - pct / 100)}"/></svg><i data-lucide="zap"></i></span></button>
    </div>
    ${nx ? `<small>บทต่อไป</small><h2>${esc(nx.u.t)}</h2><p>บทที่ ${nx.li + 1} · ระดับ ${nx.u.lv} ${ENG_LEVELS[nx.u.lv]}</p>
      <button class="eng-cta" id="engGo"><i data-lucide="play"></i>เริ่มเรียน</button>`
      : `<small>เยี่ยมมาก</small><h2>ผ่านครบทุกบทแล้ว</h2><p>ลองคอร์สอื่นหรือทบทวนต่อ</p>`}
    <div class="eng-hero-bar"><span>${doneN}/${F.length} บท</span><span>วันนี้ ${today}/${E.goal} XP</span></div>
  </section>
  <div class="eng-quick">
    <button data-q="miss" style="--q:#ef4444" ${miss ? '' : 'disabled'}><i data-lucide="dumbbell"></i><b>ฝึกคำที่ผิด</b><small>${miss} คำ</small></button>
    <button data-q="rev" style="--q:#8b5cf6"><i data-lucide="layers"></i><b>ทบทวน</b><small>${due ? `ถึงรอบ ${due}` : 'ทวนคำ'}</small></button>
    <button data-q="lv" style="--q:#0ea5e9"><i data-lucide="target"></i><b>วัดระดับ</b><small>${ENG_LEVELS[E.lv]}</small></button>
  </div></div><div class="eng-map">`;
  const UC = [C.color, '#0f9d76', '#8b5cf6', '#e8590c', '#d6336c', '#1098ad', '#ca8a04', '#2f6fb5'];
  C.units.forEach((u, ui) => {
    const uc = UC[ui % UC.length];
    const nd = u.ls.filter((_, li) => E.done[`${E.course}:${u.t}:${li}`]).length;
    html += `<div class="eng-unit ${nd === u.ls.length ? 'full' : ''}" style="--c:${uc}"><i data-lucide="${C.gram ? 'spell-check' : C.ic}" class="eng-uic"></i>
      <div><small>ระดับ ${u.lv} · ${ENG_LEVELS[u.lv]}</small><b>${esc(u.t)}</b></div>
      <span class="eng-uprog">${nd === u.ls.length ? '<i data-lucide="trophy"></i>' : `${nd}/${u.ls.length}`}</span>
      ${(E.ut || {})[`${E.course}:${u.t}`] ? '<span class="eng-utest done"><i data-lucide="medal"></i>ผ่านแล้ว</span>'
        : nd === u.ls.length ? `<button class="eng-utest" data-ut="${ui}"><i data-lucide="medal"></i>ทดสอบท้ายหน่วย</button>`
        : !engOpen(F, i) ? `<button class="eng-utest" data-ut="${ui}" data-skip="1"><i data-lucide="fast-forward"></i>ทดสอบข้ามหน่วย</button>` : ''}</div><div class="eng-nodes">`;
    u.ls.forEach(() => {
      const x = F[i], st = E.done[x.key] || 0, open = engOpen(F, i), now = i === cur;
      html += `<div class="eng-nw" style="--o:${[0, 56, 0, -56][i % 4]}px;--d:${Math.min(i, 14) * 35}ms">${now ? '<span class="eng-bub">เริ่ม</span>' : ''}
        <button class="eng-node ${st ? 'done' : ''} ${now ? 'now' : ''} ${open ? '' : 'lock'}" data-les="${i}" style="--c:${uc}">
          <i data-lucide="${st ? 'check' : !open ? 'lock' : now ? 'play' : 'book-open'}"></i></button>
        ${st ? `<span class="eng-stars">${'★'.repeat(st)}<em>${'★'.repeat(3 - st)}</em></span>` : ''}</div>`;
      i++;
    });
    html += '</div>';
  });
  html += `</div></div><button class="eng-jump" id="engJump" hidden><i data-lucide="locate-fixed"></i>บทปัจจุบัน</button>`;
  $('#view').innerHTML = html;
  engBindTabs();
  $('#engCourse').onclick = () => openPicker({ title: 'เลือกคอร์ส', value: E.course,
    options: Object.entries(COURSES).map(([k, c]) => ({ val: k, label: c.name })), onSelect: v => { E.course = v; save(); renderCards(); } });
  $('#engGoal').onclick = () => openPicker({ title: 'เป้า XP ต่อวัน', value: E.goal,
    options: [10, 20, 30, 50, 80].map(n => ({ val: n, label: `${n} XP` })), onSelect: v => { E.goal = +v; save(); renderCards(); } });
  $$('[data-les]').forEach(b => b.onclick = () => { const k = +b.dataset.les; engOpen(F, k) ? lessonStart(E.course, k) : toast('ผ่านบทก่อนหน้าก่อน', 'err'); });
  if($('#engGo')) $('#engGo').onclick = () => lessonStart(E.course, cur);
  $$('[data-ut]').forEach(b => b.onclick = () => testStart(E.course, +b.dataset.ut, !!b.dataset.skip));
  $$('[data-q]').forEach(b => b.onclick = () => {
    const q = b.dataset.q;
    if(q === 'miss') return lessonStart(E.course, -1, shuf(engMiss()).slice(0, 6));
    if(q === 'rev'){ ENG_TAB = 'review'; return renderCards(); }
    ONB = { step: 1 }; renderCards();
  });
  icons();
  // ปุ่มลอย "บทปัจจุบัน": ขึ้นเมื่อปุ่มบทปัจจุบันไม่อยู่ในจอ
  const n = $('.eng-node.now'), j = $('#engJump');
  if(n && j && 'IntersectionObserver' in window){
    new IntersectionObserver(([e]) => { if(j.isConnected) j.hidden = e.isIntersecting; }).observe(n);
    j.onclick = () => n.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }
}

// ---------- ครั้งแรก: เลือกคอร์ส → บอกระดับ → วัดระดับ ----------
function renderOnboard(){
  const o = ONB || (ONB = { step: 0 });
  if(o.step === 0){
    $('#view').innerHTML = `<div class="eng-onb"><h2>อยากเรียนแบบไหน</h2><p>เปลี่ยนทีหลังได้</p>
      ${Object.entries(COURSES).map(([k, c]) => `<button class="eng-pick" data-oc="${k}" style="--c:${c.color}">
        <span class="vc-ic"><i data-lucide="${c.ic}"></i></span><b>${c.name}</b><i data-lucide="chevron-right"></i></button>`).join('')}</div>`;
    $$('[data-oc]').forEach(b => b.onclick = () => { engState().course = b.dataset.oc; o.step = 1; renderOnboard(); });
  }else{
    const L = [['เริ่มจากศูนย์', 'ยังรู้คำศัพท์ไม่มาก'], ['พื้นฐาน', 'รู้คำง่ายๆ'], ['ปานกลาง', 'อ่านประโยคสั้นๆ ได้'], ['ดี', 'อ่านเข้าใจได้ดี']];
    $('#view').innerHTML = `<div class="eng-onb"><h2>ภาษาอังกฤษของคุณระดับไหน</h2><p>แล้วเราจะทดสอบสั้นๆ 12 ข้อ</p>
      ${L.map(([t, s], k) => `<button class="eng-pick" data-ol="${k}" style="--c:var(--cf)"><span class="eng-lvdot">${'●'.repeat(k + 1)}</span>
        <span><b>${t}</b><small>${s}</small></span><i data-lucide="chevron-right"></i></button>`).join('')}</div>`;
    $$('[data-ol]').forEach(b => b.onclick = () => { const k = +b.dataset.ol; k ? placeStart(k) : placeFinish(1); });
  }
  icons();
}
function placeStart(self){ PT = { lv: self + 1, n: 0, hist: [], used: new Set(), q: null }; placeNext(); }
function placeNext(){
  if(PT.n >= 12){ const h = PT.hist.slice(-6); PT.res = clamp(Math.round(h.reduce((a, b) => a + b, 0) / h.length), 1, 4); PT.q = null; return renderCards(); }
  const all = engLvWords(), cand = all.filter(w => w.lv === PT.lv && !PT.used.has(w.en));
  const w = (cand.length ? cand : all)[Math.floor(Math.random() * (cand.length || all.length))];
  PT.used.add(w.en); PT.q = { w, opts: engOpts(w, all, 'th') };
  renderCards();
}
function renderPlace(){
  if(PT.res){
    $('#view').innerHTML = `<div class="vc-done"><span class="vc-done-ic"><i data-lucide="target"></i></span>
      <small style="color:var(--muted)">ระดับของคุณ</small><b class="eng-res">${ENG_LEVELS[PT.res]}</b>
      <p>เริ่มบทเรียนระดับ ${PT.res} ได้เลย บทที่ง่ายกว่าเปิดไว้ให้ทวนได้</p>
      <button class="btn lg block" id="ptGo"><i data-lucide="play"></i>เริ่มเรียน</button></div>`;
    $('#ptGo').onclick = () => placeFinish(PT.res);
    return icons();
  }
  const q = PT.q;
  $('#view').innerHTML = `<div class="ls-top"><button class="ib" id="lsX"><i data-lucide="x"></i></button>
    <div class="vc-prog"><i style="width:${PT.n / 12 * 100}%"></i></div><span>${PT.n + 1}/12</span></div>
    <div class="ls-body"><small class="ls-kind">วัดระดับ · คำนี้แปลว่าอะไร</small><h2 class="ls-word">${esc(q.w.en)}</h2>
    <div class="ls-opts">${q.opts.map((o, k) => `<button class="ls-opt" data-po="${k}">${esc(o)}</button>`).join('')}</div>
    <button class="ls-skip" id="ptSkip">ไม่รู้</button></div>`;
  const pick = ok => {
    $$('.ls-opt').forEach(b => { b.disabled = true; if(q.opts[+b.dataset.po] === q.w.th) b.classList.add('ok'); });
    PT.lv = ok ? Math.min(4, PT.lv + 1) : Math.max(1, PT.lv - 1); PT.hist.push(PT.lv); PT.n++;
    playTone(ok ? 'ok' : 'wrong'); setTimeout(placeNext, 650);
  };
  $$('[data-po]').forEach(b => b.onclick = () => { const ok = q.opts[+b.dataset.po] === q.w.th; if(!ok) b.classList.add('bad'); pick(ok); });
  $('#ptSkip').onclick = () => pick(false);
  $('#lsX').onclick = () => { PT = null; renderCards(); };
  icons();
}
function placeFinish(lv){ engState().lv = lv; PT = null; ONB = null; ENG_TAB = 'learn'; save(); renderCards(); }

// ---------- บทเรียน ----------
function engEx(t, w, pool){
  if(t === 'blank'){
    const re = new RegExp('\\b' + w.en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\w*', 'i');
    if(w.ex && re.test(w.ex)) return { t, w, s: w.ex.replace(re, '_____'), opts: engOpts(w, pool, 'en') };
    t = 'word';
  }
  if(t === 'order'){
    // ตัดจุด/ตัวพิมพ์ใหญ่คำแรก ไม่ให้เดาลำดับจากรูปคำ
    const toks = w.ex.replace(/[.!?,]/g, '').split(/\s+/).filter(Boolean).map((s, k) => k || s === 'I' ? s : s[0].toLowerCase() + s.slice(1));
    if(toks.length >= 3 && toks.length <= 9){ let s = shuf(toks); if(s.join(' ') === toks.join(' ')) s = s.reverse(); return { t, w, toks: s, pick: [] }; }
    t = 'word';
  }
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
// ทดสอบท้ายหน่วย / ทดสอบข้ามหน่วย: ไม่มีข้อซ้ำ ผ่าน 80%
function testStart(c, ui, skip){
  const C = COURSES[c], u = C.units[ui], items = [];
  if(C.gram){
    const ws = C.kind === 'read' ? u.ls[Math.floor(Math.random() * u.ls.length)] : shuf(u.ls.flat()).slice(0, 8);
    engGramItems(c, ws, items, u, true);
  }else{
    const pool = engPool(c);
    shuf(u.ls.flat()).slice(0, 10).forEach((w, k) => items.push(engEx(k % 2 ? 'word' : 'mean', w, pool)));
  }
  LS = { c, i: -1, key: null, ws: [], gram: true, test: { ui, skip }, items, k: 0, ok: 0, bad: 0, combo: 0, maxC: 0, t0: Date.now(), redo: new Set(), miss: new Set(), st: null };
  renderCards();
}
// คำที่ตอบผิดล่าสุด (ระดับความจำ 0) จากคลังทบทวน
const engMiss = () => S.cards.filter(c => c.seen && !(c.box > 0)).map(c => ({ en: vcText(c.f), th: vcText(c.b), ex: c.ex || '' })).filter(w => w.en && w.th);
function lessonStart(c, i, custom){
  const E = engState(), x = custom ? { key: null, ws: custom } : engFlat(c)[i], ws = x.ws, pool = engPool(c).concat(custom || []), items = [];
  if(COURSES[c].gram){
    engGramItems(c, ws, items, x.u);
    LS = { c, i, key: x.key, ws, gram: true, items, k: 0, ok: 0, bad: 0, combo: 0, maxC: 0, t0: Date.now(), redo: new Set(), miss: new Set(), st: null };
    return renderCards();
  }
  const types = ['word', 'blank', 'order', ...('speechSynthesis' in window ? ['listen'] : [])];
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
  dlg: ['เลือกประโยคตอบให้เหมาะสม', '#0ea5e9', 'message-circle'], passage: ['อ่านเรื่อง', '#16a34a', 'book-open-text'], read: ['ตอบคำถามจากเรื่อง', '#16a34a', 'circle-help'] };
const ENG_OC = ['#2f6fb5', '#0f9d76', '#e8590c', '#8b5cf6'];
function renderLesson(){
  const L = LS;
  if(L.k >= L.items.length) return lessonEnd();
  const it = L.items[L.k], w = it.w, col = COURSES[L.c].color;
  const say = `<button class="ls-say" data-say><i data-lucide="volume-2"></i></button><button class="ls-say slow" data-slow title="ฟังช้า"><i data-lucide="snail"></i></button>`;
  const opts = (it.opts || []).map((o, k) => `<button class="ls-opt" data-o="${k}" style="--b:${ENG_OC[k % 4]}"><em>${'ABCD'[k]}</em>${esc(o)}</button>`).join('');
  let body = '';
  if(it.t === 'intro') body = `<div class="ls-intro" style="--c:${col}"><span class="ls-new">คำใหม่</span><h2>${esc(w.en)}</h2>${say}
      <p class="th">${esc(w.th)}</p>${w.ex ? `<p class="ex">${esc(w.ex)}</p>` : ''}${w.tr ? `<small class="tr">${esc(w.tr)}</small>` : ''}</div>`;
  if(it.t === 'rule') body = `<div class="ls-rule"><b>${esc(it.u.t)}</b>${it.u.rule.split('·').map(r => `<span>${esc(r.trim())}</span>`).join('')}</div>`;
  if(it.t === 'dlg') body = `<div class="ls-chat">${w.lines.map(l => { const m = l.match(/^([AB]):\s*(.*)$/) || [0, 'A', l], me = m[1] === 'B';
      return `<div class="ls-bub ${me ? 'me' : ''}"><em>${m[1]}</em><span>${m[2] === '___' ? '<i class="ls-dots"><b></b><b></b><b></b></i>' : esc(m[2])}</span></div>`; }).join('')}</div><div class="ls-opts">${opts}</div>`;
  if(it.t === 'passage' || it.t === 'read') body = `<div class="ls-pass ${it.t === 'read' ? 'mini' : ''}"><b>${esc(w.title)}</b>
      <button class="ls-say" data-readp><i data-lucide="volume-2"></i></button><p>${esc(w.text)}</p>
      ${it.t === 'passage' ? `<button class="ls-trbtn" id="lsTr"><i data-lucide="languages"></i>ดูคำแปล</button><p class="ls-ptr" hidden>${esc(w.ptr)}</p>` : ''}</div>
      ${it.t === 'read' ? `<p class="ls-q">${esc(w.q)}</p><div class="ls-opts">${opts}</div>` : ''}`;
  if(it.t === 'gram') body = `<p class="ls-sent">${esc(w.q).replace('___', '<u>_____</u>')}</p><div class="ls-opts">${opts}</div>`;
  if(it.t === 'mean') body = `<h2 class="ls-word">${esc(w.en)} ${say}</h2><div class="ls-opts">${opts}</div>`;
  if(it.t === 'word') body = `<h2 class="ls-word th">${esc(w.th)}</h2><div class="ls-opts">${opts}</div>`;
  if(it.t === 'listen') body = `<div class="ls-listen"><button class="ls-big-say" data-say><i data-lucide="volume-2"></i></button><button class="ls-big-say slow" data-slow title="ฟังช้า"><i data-lucide="snail"></i></button></div><div class="ls-opts">${opts}</div>`;
  if(it.t === 'blank') body = `<p class="ls-sent">${esc(it.s)}</p><small class="ls-hint">${esc(w.th)}</small><div class="ls-opts">${opts}</div>`;
  if(it.t === 'order') body = `<small class="ls-hint">${w.tr ? esc(w.tr) : `ใช้คำว่า <b>${esc(w.en)}</b> = ${esc(w.th)}`}</small>
      <div class="ls-ans">${it.pick.map(k => `<button class="ls-tile" data-back="${k}">${esc(it.toks[k])}</button>`).join('')}</div>
      <div class="ls-tiles">${it.toks.map((s, k) => `<button class="ls-tile ${it.pick.includes(k) ? 'used' : ''}" data-tok="${k}">${esc(s)}</button>`).join('')}</div>
      ${L.st === null ? `<button class="btn lg block" id="lsCheck" ${it.pick.length ? '' : 'disabled'}>ตรวจ</button>` : ''}`;
  if(it.t === 'match'){
    it.en = it.en || shuf(it.ws.map(x => x.en)); it.th = it.th || shuf(it.ws.map(x => x.th));
    body = `<div class="ls-match"><div>${it.en.map(e => `<button class="ls-tile ${it.done.includes(e) ? 'ok' : ''} ${it.sel === e ? 'sel' : ''}" data-me="${esc(e)}">${esc(e)}</button>`).join('')}</div>
      <div>${it.th.map(t => { const e = it.ws.find(x => x.th === t).en; return `<button class="ls-tile ${it.done.includes(e) ? 'ok' : ''}" data-mt="${esc(e)}">${esc(t)}</button>`; }).join('')}</div></div>`;
  }
  $('#view').innerHTML = `<div class="ls-wrap" style="--c:${col}">
    <div class="ls-top"><button class="ib" id="lsX"><i data-lucide="x"></i></button>
      <div class="vc-prog"><i style="width:${L.k / L.items.length * 100}%"></i></div></div>
    <div class="ls-body"><span class="ls-kind" style="--k:${ENG_KIND[it.t][1]}"><i data-lucide="${ENG_KIND[it.t][2]}"></i>${ENG_KIND[it.t][0]}</span>${body}</div>
    <div id="lsFb">${it.t === 'intro' || it.t === 'rule' || it.t === 'passage' ? '<button class="btn lg block" id="lsNext">ต่อไป</button>' : ''}</div></div>`;
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
  $$('[data-tok]').forEach(b => b.onclick = () => { const k = +b.dataset.tok; if(L.st !== null || it.pick.includes(k)) return; it.pick.push(k); renderLesson(); });
  $$('[data-back]').forEach(b => b.onclick = () => { if(L.st !== null) return; it.pick = it.pick.filter(k => k !== +b.dataset.back); renderLesson(); });
  if($('#lsCheck')) $('#lsCheck').onclick = () => {
    const norm = s => s.toLowerCase().replace(/[^a-z0-9' ]/g, '').replace(/\s+/g, ' ').trim();
    const ok = norm(it.pick.map(k => it.toks[k]).join(' ')) === norm(w.ex);
    $('#lsCheck').remove(); lessonFb(ok, w.ex);
  };
  $$('[data-me]').forEach(b => b.onclick = () => { if(it.done.includes(b.dataset.me)) return; it.sel = b.dataset.me; engSay(it.sel); renderLesson(); });
  $$('[data-mt]').forEach(b => b.onclick = () => {
    const e = b.dataset.mt; if(!it.sel || it.done.includes(e)) return;
    if(e === it.sel){ it.done.push(e); it.sel = null; playTone('pick'); renderLesson(); if(it.done.length === it.ws.length) lessonFb(it.err === 0, '', true); }
    else{ it.err++; b.classList.add('bad'); playTone('wrong'); setTimeout(() => b.classList.remove('bad'), 400); }
  });
  if($('#lsNext')) $('#lsNext').onclick = () => { L.k++; renderLesson(); };
  $('#lsX').onclick = async () => { if(L.k && !await ask('ออกจากบทเรียน?', 'บทนี้ยังไม่บันทึก', 'ออก')) return; LS = null; renderCards(); };
  icons();
}
function lessonFb(ok, ans, noRedo){
  const L = LS, it = L.items[L.k];
  L.st = ok;
  if(ok){ L.ok++; L.combo++; L.maxC = Math.max(L.maxC, L.combo); }
  else{
    L.bad++; L.combo = 0;
    if(it.w){ L.miss.add(it.w.en); if(!noRedo && !L.test && !L.redo.has(L.k)){ L.redo.add(L.items.length); L.items.push(['gram', 'dlg', 'read'].includes(it.t) ? { ...it, opts: shuf(it.opts) } : it.t === 'order' ? engEx('order', it.w, []) : engEx(it.t, it.w, engPool(L.c).concat(L.ws))); } }
  }
  playTone(ok ? 'ok' : 'wrong');
  $('#lsFb').innerHTML = `<div class="ls-fb ${ok ? 'ok' : 'bad'}"><div><b>${ok ? ENG_PRAISE[Math.floor(Math.random() * ENG_PRAISE.length)] : 'คำตอบที่ถูก'}</b>
    ${!ok && ans && it.t !== 'order' ? `<span>${esc(ans)}</span>` : ''}</div>${ok && L.combo >= 3 ? `<span class="ls-combo"><i data-lucide="flame"></i>${L.combo} ติด</span>` : ''}<button class="btn lg" id="lsNext">ต่อไป</button></div>`;
  // ประโยคเต็ม + คำแปล + อ่านให้ฟัง (เติมคำ / เรียงประโยค / ไวยากรณ์)
  const full = it.t === 'gram' ? it.w.q.replace('___', it.w.a) : it.t === 'dlg' ? it.w.a : (it.t === 'blank' || it.t === 'order') ? it.w.ex : '';
  if(full){
    $('#lsFb').insertAdjacentHTML('beforeend', `<div class="ls-full">${it.t === 'gram' && it.w.why ? `<small class="ls-why"><i data-lucide="lightbulb"></i>${esc(it.w.why)}</small>` : ''}
      <button class="ls-say" data-sayfull><i data-lucide="volume-2"></i></button><button class="ls-say slow" data-sayslow title="ฟังช้า"><i data-lucide="snail"></i></button><div><b>${esc(full)}</b>${it.w.tr ? `<small>${esc(it.w.tr)}</small>` : ''}</div></div>`);
    $('[data-sayfull]').onclick = () => speakWord(full);
    $('[data-sayslow]').onclick = () => speakWord(full, true);
    setTimeout(() => speakWord(full), 350);
  }
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
    if(L.test){
      const u = COURSES[L.c].units[L.test.ui]; L.pass = acc >= 80;
      if(L.pass){ E.ut = E.ut || {}; E.ut[`${L.c}:${u.t}`] = 1; if(L.test.skip) u.ls.forEach((_, li) => { const k = `${L.c}:${u.t}:${li}`; E.done[k] = Math.max(E.done[k] || 0, 1); }); }
    }
    E.xp = (E.xp || 0) + xp; E.days[dkey()] = before + xp;
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
    save(); syncChrome(); playTone('submit');
  }
  const r = L.res;
  const T = L.test;
  $('#view').innerHTML = `<div class="vc-done"><span class="vc-done-ic ${T && !L.pass ? 'fail' : ''}"><i data-lucide="${T ? (L.pass ? 'medal' : 'rotate-ccw') : 'trophy'}"></i></span>
    <b>${T ? (L.pass ? (T.skip ? 'ผ่าน! ข้ามหน่วยนี้ได้' : 'ผ่านการทดสอบ!') : 'ยังไม่ผ่าน') : 'จบบทเรียน'}</b>${T && !L.pass ? '<p>ต้องได้ 80% ขึ้นไป ลองอีกครั้งนะ</p>' : ''}
    <div class="ls-stars">${[0, 1, 2].map(k => `<span class="${k < r.stars ? 'on' : ''}" style="animation-delay:${.15 + k * .18}s">★</span>`).join('')}</div>
    ${r.bonus ? `<span class="ls-combo"><i data-lucide="flame"></i>คอมโบ ${LS.maxC} ติด +${r.bonus} XP</span>` : ''}
    <div class="ls-res"><div><b id="lsXp">+0</b><small>XP</small></div><div><b>${r.acc}%</b><small>แม่นยำ</small></div><div><b>${mmss(r.sec)}</b><small>เวลา</small></div></div>
    ${T && !L.pass ? '<button class="btn ghost lg block" id="lsRetry" style="margin-bottom:8px"><i data-lucide="rotate-ccw"></i>ลองใหม่</button>' : ''}
    <button class="btn lg block" id="lsDone">ต่อไป</button></div>`;
  $('#lsDone').onclick = () => { LS = null; renderCards(); };
  if($('#lsRetry')) $('#lsRetry').onclick = () => testStart(L.c, T.ui, T.skip);
  icons();
  // XP วิ่งขึ้น + พลุ (ได้ 3 ดาว หรือถึงเป้าวันนี้)
  const t0 = performance.now(), tick = t => { const p = Math.min(1, (t - t0) / 700); const e = $('#lsXp'); if(!e) return; e.textContent = '+' + Math.round(r.xp * (1 - Math.pow(1 - p, 3))); if(p < 1) requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
  if(r.stars === 3 || L.goal || L.pass) setTimeout(() => engConfetti(40, innerWidth / 2, innerHeight / 3), 350);
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
