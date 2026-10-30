"use strict";
// ===== เรียนภาษาอังกฤษ: วัดระดับ → แผนที่บทเรียน → บทเรียน (แบบฝึกสร้างอัตโนมัติจาก js/lessons.js) =====
let ENG_TAB = 'learn', LS = null, PT = null, ONB = null;
const ENG_PRAISE = ['ถูกต้อง!', 'เยี่ยม!', 'เก่งมาก!', 'ใช่เลย!', 'สุดยอด!'];
function engState(){ return S.eng || (S.eng = { course: 'police', lv: 0, done: {}, xp: 0, days: {}, goal: 30, known: {} }); }
const engFlat = c => COURSES[c].units.flatMap((u, ui) => u.ls.map((ws, li) => ({ c, ui, li, u, ws, key: `${c}:${ui}:${li}` })));
const engPool = c => COURSES[c].units.flatMap(u => u.ls.flat());
const engLvWords = () => Object.values(COURSES).flatMap(C => C.units.flatMap(u => u.ls.flat().map(w => ({ ...w, lv: u.lv }))));
const shuf = a => { a = a.slice(); for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const engOpts = (w, pool, f) => shuf([w[f], ...shuf([...new Set(pool.map(x => x[f]).filter(v => v !== w[f]))]).slice(0, 3)]);
const engSay = t => speakWord(String(t).split('↔')[0]);
// บทที่เปิดได้: บทแรก / บทก่อนหน้าผ่านแล้ว / ต่ำกว่าระดับที่วัดได้ / บทแรกของระดับที่วัดได้
function engOpen(F, i){
  const E = engState();
  return i === 0 || !!E.done[F[i - 1].key] || F[i].u.lv < E.lv || i === F.findIndex(x => x.u.lv >= E.lv);
}
// ระหว่างเรียน/วัดระดับ/ทวน ซ่อนปุ่มเพิ่มคำ
const engBusy = () => !!(LS || PT || VC.run || !engState().lv);
const engToday = () => engState().days[dkey()] || 0;
function engStreak(){
  const d = engState().days, t = new Date(); let n = 0;
  if(!d[dkey(t)]) t.setDate(t.getDate() - 1);
  while(d[dkey(t)]){ n++; t.setDate(t.getDate() - 1); }
  return n;
}
const engTabs = () => `<div class="eng-tabs">
  <button class="${ENG_TAB === 'learn' ? 'on' : ''}" data-etab="learn"><i data-lucide="graduation-cap"></i>บทเรียน</button>
  <button class="${ENG_TAB === 'review' ? 'on' : ''}" data-etab="review"><i data-lucide="layers"></i>ทบทวน</button></div>`;
const engBindTabs = () => $$('[data-etab]').forEach(b => b.onclick = () => { ENG_TAB = b.dataset.etab; renderCards(); });

// ---------- แผนที่บทเรียน ----------
function renderEngPath(){
  const E = engState(), C = COURSES[E.course], F = engFlat(E.course);
  // บทถัดไป: เริ่มที่ระดับที่วัดได้ก่อน ถ้าผ่านหมดแล้วค่อยย้อนไปบทที่ยังไม่ทำ
  const next = f => F.findIndex((x, i) => f(x) && engOpen(F, i) && !E.done[x.key]);
  let cur = next(x => x.u.lv >= E.lv); if(cur < 0) cur = next(() => true);
  const today = engToday(), pct = Math.min(100, Math.round(today / E.goal * 100));
  let i = 0, html = engTabs() + `
  <div class="eng-head" style="--c:${C.color}">
    <button class="eng-course" id="engCourse"><span class="vc-ic"><i data-lucide="${C.ic}"></i></span>
      <span><small>คอร์ส</small><b>${C.name}</b></span><i data-lucide="chevron-down"></i></button>
    <button class="eng-stat" id="engGoal"><span><i data-lucide="flame"></i>${engStreak()}</span><span><i data-lucide="zap"></i>${today}/${E.goal}</span></button>
    <div class="eng-goal"><i style="width:${pct}%"></i></div>
  </div>`;
  C.units.forEach(u => {
    html += `<div class="eng-unit" style="--c:${C.color}"><small>ระดับ ${u.lv} · ${ENG_LEVELS[u.lv]}</small><b>${esc(u.t)}</b></div><div class="eng-nodes">`;
    u.ls.forEach(() => {
      const x = F[i], st = E.done[x.key] || 0, open = engOpen(F, i), now = i === cur;
      html += `<div class="eng-nw" style="--o:${[0, 56, 0, -56][i % 4]}px">${now ? '<span class="eng-bub">เริ่ม</span>' : ''}
        <button class="eng-node ${st ? 'done' : ''} ${now ? 'now' : ''} ${open ? '' : 'lock'}" data-les="${i}" style="--c:${C.color}">
          <i data-lucide="${st ? 'check' : !open ? 'lock' : now ? 'play' : 'book-open'}"></i></button>
        ${st ? `<span class="eng-stars">${'★'.repeat(st)}<em>${'★'.repeat(3 - st)}</em></span>` : ''}</div>`;
      i++;
    });
    html += '</div>';
  });
  html += `<button class="btn ghost block" id="engRe" style="margin-top:22px"><i data-lucide="target"></i>วัดระดับใหม่</button>`;
  $('#view').innerHTML = html;
  engBindTabs();
  $('#engCourse').onclick = () => openPicker({ title: 'เลือกคอร์ส', value: E.course,
    options: Object.entries(COURSES).map(([k, c]) => ({ val: k, label: c.name })), onSelect: v => { E.course = v; save(); renderCards(); } });
  $('#engGoal').onclick = () => openPicker({ title: 'เป้า XP ต่อวัน', value: E.goal,
    options: [10, 20, 30, 50, 80].map(n => ({ val: n, label: `${n} XP` })), onSelect: v => { E.goal = +v; save(); renderCards(); } });
  $$('[data-les]').forEach(b => b.onclick = () => { const k = +b.dataset.les; engOpen(F, k) ? lessonStart(E.course, k) : toast('ผ่านบทก่อนหน้าก่อน', 'err'); });
  $('#engRe').onclick = () => { ONB = { step: 1 }; renderCards(); };
  icons();
  const n = $('.eng-node.now'); if(n) requestAnimationFrame(() => n.scrollIntoView({ block: 'center' }));
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
function lessonStart(c, i){
  const E = engState(), x = engFlat(c)[i], pool = engPool(c), ws = x.ws, items = [];
  const types = ['word', 'blank', 'order', ...('speechSynthesis' in window ? ['listen'] : [])];
  for(let k = 0; k < ws.length; k += 2){
    const pair = ws.slice(k, k + 2);
    pair.forEach(w => { if(!E.known[w.en]) items.push({ t: 'intro', w }); });
    pair.forEach(w => items.push(engEx('mean', w, pool)));
  }
  shuf(ws).forEach(w => items.push(engEx(types[Math.floor(Math.random() * types.length)], w, pool)));
  items.push({ t: 'match', ws: shuf(ws).slice(0, 4), done: [], err: 0 });
  LS = { c, i, key: x.key, items, k: 0, ok: 0, bad: 0, t0: Date.now(), redo: new Set(), miss: new Set(), st: null };
  renderCards();
}
const ENG_KIND = { intro: 'คำใหม่', mean: 'คำนี้แปลว่าอะไร', word: 'ภาษาอังกฤษคือคำไหน', listen: 'ฟังแล้วเลือกคำที่ได้ยิน',
  blank: 'เติมคำในช่องว่าง', order: 'เรียงเป็นประโยค', match: 'จับคู่คำกับคำแปล' };
function renderLesson(){
  const L = LS;
  if(L.k >= L.items.length) return lessonEnd();
  const it = L.items[L.k], w = it.w, col = COURSES[L.c].color;
  const say = `<button class="ls-say" data-say><i data-lucide="volume-2"></i></button>`;
  const opts = (it.opts || []).map((o, k) => `<button class="ls-opt" data-o="${k}">${esc(o)}</button>`).join('');
  let body = '';
  if(it.t === 'intro') body = `<div class="ls-intro" style="--c:${col}"><span class="ls-new">คำใหม่</span><h2>${esc(w.en)}</h2>${say}
      <p class="th">${esc(w.th)}</p>${w.ex ? `<p class="ex">${esc(w.ex)}</p>` : ''}</div>`;
  if(it.t === 'mean') body = `<h2 class="ls-word">${esc(w.en)} ${say}</h2><div class="ls-opts">${opts}</div>`;
  if(it.t === 'word') body = `<h2 class="ls-word th">${esc(w.th)}</h2><div class="ls-opts">${opts}</div>`;
  if(it.t === 'listen') body = `<button class="ls-big-say" data-say><i data-lucide="volume-2"></i></button><div class="ls-opts">${opts}</div>`;
  if(it.t === 'blank') body = `<p class="ls-sent">${esc(it.s)}</p><small class="ls-hint">${esc(w.th)}</small><div class="ls-opts">${opts}</div>`;
  if(it.t === 'order') body = `<small class="ls-hint">ใช้คำว่า <b>${esc(w.en)}</b> = ${esc(w.th)}</small>
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
    <div class="ls-body"><small class="ls-kind">${ENG_KIND[it.t]}</small>${body}</div>
    <div id="lsFb">${it.t === 'intro' ? '<button class="btn lg block" id="lsNext">ต่อไป</button>' : ''}</div></div>`;
  $$('[data-say]').forEach(b => b.onclick = () => engSay(w.en));
  if(it.t === 'listen' || it.t === 'intro') setTimeout(() => engSay(w.en), 250);
  const ans = it.t === 'mean' ? w && w.th : w && w.en;
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
  if(ok) L.ok++;
  else{
    L.bad++;
    if(it.w){ L.miss.add(it.w.en); if(!noRedo && !L.redo.has(L.k)){ L.redo.add(L.items.length); L.items.push(engEx(it.t, it.w, engPool(L.c))); } }
  }
  playTone(ok ? 'ok' : 'wrong');
  $('#lsFb').innerHTML = `<div class="ls-fb ${ok ? 'ok' : 'bad'}"><div><b>${ok ? ENG_PRAISE[Math.floor(Math.random() * ENG_PRAISE.length)] : 'คำตอบที่ถูก'}</b>
    ${!ok && ans ? `<span>${esc(ans)}</span>` : ''}</div><button class="btn lg" id="lsNext">ต่อไป</button></div>`;
  $('#lsNext').onclick = () => { L.k++; L.st = null; renderLesson(); };
}
function lessonEnd(){
  const L = LS, E = engState();
  if(!L.res){
    const tot = L.ok + L.bad, acc = tot ? Math.round(L.ok / tot * 100) : 100;
    const stars = acc >= 90 ? 3 : acc >= 70 ? 2 : 1, xp = 10 + Math.round(acc / 10);
    E.done[L.key] = Math.max(E.done[L.key] || 0, stars); E.xp = (E.xp || 0) + xp; E.days[dkey()] = (E.days[dkey()] || 0) + xp;
    // คำในบทเข้าคลัง "ทบทวน" (ระบบทวนตามรอบวัน)
    const deck = COURSES[L.c].name;
    engFlat(L.c)[L.i].ws.forEach(w => {
      E.known[w.en] = 1;
      let c = S.cards.find(x => vcText(x.f).toLowerCase() === w.en.toLowerCase());
      if(!c){ c = { id: uid(), f: w.en, b: w.th, ex: w.ex, deck, box: 0, due: 0 }; S.cards.push(c); }
      const miss = L.miss.has(w.en); c.seen = 1; c.box = miss ? 0 : Math.max(c.box || 0, 1); c.due = Date.now() + VC_GAP[c.box] * 864e5;
    });
    L.res = { stars, xp, acc, sec: (Date.now() - L.t0) / 1000 };
    save(); syncChrome(); playTone('submit');
  }
  const r = L.res;
  $('#view').innerHTML = `<div class="vc-done"><span class="vc-done-ic"><i data-lucide="trophy"></i></span><b>จบบทเรียน</b>
    <div class="ls-stars">${'★'.repeat(r.stars)}<em>${'★'.repeat(3 - r.stars)}</em></div>
    <div class="ls-res"><div><b>+${r.xp}</b><small>XP</small></div><div><b>${r.acc}%</b><small>แม่นยำ</small></div><div><b>${mmss(r.sec)}</b><small>เวลา</small></div></div>
    <button class="btn lg block" id="lsDone">ต่อไป</button></div>`;
  $('#lsDone').onclick = () => { LS = null; renderCards(); };
  icons();
}
