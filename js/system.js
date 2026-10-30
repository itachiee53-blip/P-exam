"use strict";
// ==========================================
// กันโค้ดแฝง: ข้อความรูปแบบ (จัดฟอนต์) อนุญาตเฉพาะแท็กจัดรูปแบบ
// ==========================================
const SAFE_TAGS = new Set(['B','STRONG','I','EM','U','S','STRIKE','SUP','SUB','BR','SPAN','FONT','DIV','P','SMALL','BIG','MARK']);
const SAFE_STYLE = /^(color|background-color|font-size|font-weight|font-style|text-decoration|text-align)$/i;
function sanitizeHTML(html){
  if(typeof html !== 'string' || !/[<&]/.test(html)) return html ?? '';
  const tpl = document.createElement('template');
  tpl.innerHTML = html;
  const walk = node => {
    [...node.childNodes].forEach(n => {
      if(n.nodeType === 1){
        if(!SAFE_TAGS.has(n.tagName)){
          if(/^(SCRIPT|STYLE|IFRAME|OBJECT|EMBED|SVG|MATH|LINK|META|TEMPLATE)$/.test(n.tagName)) return n.remove();
          walk(n); n.replaceWith(...n.childNodes); return; // แท็กอื่น: เก็บแค่ข้อความ
        }
        [...n.attributes].forEach(a => {
          const k = a.name.toLowerCase();
          if(k === 'style'){
            const keep = a.value.split(';').map(x => x.trim()).filter(x => { const [pr, v=''] = x.split(':'); return SAFE_STYLE.test((pr||'').trim()) && !/url\(|expression|javascript:/i.test(v); });
            keep.length ? n.setAttribute('style', keep.join(';')) : n.removeAttribute('style');
          } else if(k === 'class'){ if(a.value !== 'math-frac') n.removeAttribute('class'); }
          else if(!(n.tagName === 'FONT' && (k === 'color' || k === 'size'))) n.removeAttribute(a.name);
        });
        walk(n);
      } else if(n.nodeType !== 3) n.remove();
    });
  };
  walk(tpl.content);
  return tpl.innerHTML;
}
const safeImg = u => (typeof u === 'string' && /^data:image\/[a-z+]+;base64,[A-Za-z0-9+/=]+$/.test(u)) ? u : '';
function sanitizeQuestion(q){
  q.q = sanitizeHTML(q.q); q.e = sanitizeHTML(q.e);
  q.c = (Array.isArray(q.c) ? q.c : ['','','','']).map(sanitizeHTML);
  q.cExps = (Array.isArray(q.cExps) ? q.cExps : []).map(sanitizeHTML);
  q.qImgs = (q.qImgs || []).map(safeImg).filter(Boolean);
  q.eImgs = (q.eImgs || []).map(safeImg).filter(Boolean);
  q.cImgs = (q.cImgs || ['','','','']).map(safeImg);
  q.a = clamp(+q.a || 0, 0, 3);
  if(!DIFFS.includes(q.d)) q.d = 'ง่าย';
  if(q.id != null) q.id = String(q.id).replace(/[^\w-]/g, '') || uid();
  return q;
}
function sanitizeCard(c){
  c.f = sanitizeHTML(c.f); c.b = sanitizeHTML(c.b);
  c.fImg = safeImg(c.fImg); c.bImg = safeImg(c.bImg);
  if(c.id != null) c.id = String(c.id).replace(/[^\w-]/g, '') || uid();
  return c;
}
function sanitizeState(st){
  (st.questions || []).forEach(sanitizeQuestion);
  (st.cards || []).forEach(sanitizeCard);
  st.cats = (st.cats || []).map(c => String(c).replace(/[<>"'`]/g, ''));
  st.settings = st.settings || {};
  st.settings.avatar = safeImg(st.settings.avatar); st.settings.heroBg = safeImg(st.settings.heroBg);
  st.books = (st.books || []).map(b => ({ id: String(b.id).replace(/[^\w-]/g, ''), name: String(b.name || '').replace(/[<>"'`]/g, ''), cats: (b.cats || []).map(String) }));
  if(st.bookCovers) Object.keys(st.bookCovers).forEach(k => { st.bookCovers[k] = safeImg(st.bookCovers[k]); if(!st.bookCovers[k]) delete st.bookCovers[k]; });
  (st.questions || []).forEach(q => { if(q.src) q.src = String(q.src).replace(/[^\w-]/g, ''); });
  if(st.catCovers) Object.keys(st.catCovers).forEach(k => { st.catCovers[k] = safeImg(st.catCovers[k]); if(!st.catCovers[k]) delete st.catCovers[k]; });
  return st;
}

// ==========================================
// ระบบย้อนกลับ (Undo): จำการเพิ่ม/ลบ/ย้ายล่าสุด 15 รายการ (เก็บในเครื่อง)
// ==========================================
let UNDO = [];
let undoSaveT = null;
const saveUndo = () => { clearTimeout(undoSaveT); undoSaveT = setTimeout(() => (window.requestIdleCallback || setTimeout)(() => dbSet('undo', UNDO)), 600); };
function pushUndo(label, rec){
  UNDO.unshift({ label, t: Date.now(), ...rec });
  let full = 0;
  UNDO = UNDO.filter(u => !u.full || ++full <= 1).slice(0, 15); // สำเนาทั้งระบบเก็บแค่ 2 อันล่าสุด (ไฟล์ใหญ่)
  saveUndo();
}
const withIdx = (arr, pred) => arr.map((obj, i) => ({ i, obj })).filter(x => pred(x.obj));
function removeQuestions(pred, label){
  const del = withIdx(S.questions, pred);
  if(!del.length) return 0;
  S.questions = S.questions.filter(q => !pred(q));
  pushUndo(label, { delQ: del }); save(); return del.length;
}
function removeCards(pred, label){
  const del = withIdx(S.cards, pred);
  if(!del.length) return 0;
  S.cards = S.cards.filter(c => !pred(c));
  pushUndo(label, { delC: del }); save(); return del.length;
}
function snapshotUndo(label){ pushUndo(label, { full: clone(S) }); }
function applyUndo(idx = 0){
  const r = UNDO[idx]; if(!r) return;
  if(r.full){ S = r.full; }
  else {
    const restore = (arr, list) => { const ids = new Set(arr.map(x => x.id)); [...list].sort((a,b) => a.i - b.i).forEach(({ i, obj }) => { if(!ids.has(obj.id)) arr.splice(Math.min(i, arr.length), 0, obj); }); };
    if(r.addQ){ const s2 = new Set(r.addQ); S.questions = S.questions.filter(q => !s2.has(q.id)); }
    if(r.addC){ const s2 = new Set(r.addC); S.cards = S.cards.filter(c => !s2.has(c.id)); }
    if(r.delQ) restore(S.questions, r.delQ);
    if(r.delC) restore(S.cards, r.delC);
    (r.moveQ || []).forEach(m => { const q = S.questions.find(x => x.id === m.id); if(q) q.cat = m.cat; });
    (r.moveC || []).forEach(m => { const c = S.cards.find(x => x.id === m.id); if(c) c.cat = m.cat; });
    (r.moveSrc || []).forEach(m => { const q = S.questions.find(x => x.id === m.id); if(q) q.src = m.src || undefined; });
    if(r.delBook && !bookOf(r.delBook.book.id)){ (S.books = S.books || []).splice(r.delBook.i, 0, r.delBook.book); if(r.delBook.cover) (S.bookCovers = S.bookCovers || {})[r.delBook.book.id] = r.delBook.cover; }
    (r.delCats || []).forEach(dc => {
      if(!S.cats.includes(dc.name)) S.cats.splice(Math.min(dc.i, S.cats.length), 0, dc.name);
      if(dc.icon) (S.catIcons = S.catIcons || {})[dc.name] = dc.icon;
      if(dc.tone) (S.catTones = S.catTones || {})[dc.name] = dc.tone;
      if(dc.cover) (S.catCovers = S.catCovers || {})[dc.name] = dc.cover;
    });
    (r.addCats || []).forEach(c => { if(!S.questions.some(q => q.cat === c) && !S.cards.some(x => x.cat === c)) S.cats = S.cats.filter(x => x !== c); });
  }
  UNDO.splice(idx, 1); saveUndo();
  day(); save(); theme(); syncChrome(); refreshPage();
  toast(`ย้อนกลับแล้ว: ${r.label}`, 'ok');
}
function undoToast(msg){
  const el = document.createElement('div');
  el.className = 'toast ok toast-undo';
  el.innerHTML = `<i data-lucide="check-circle-2"></i><span>${esc(msg)}</span><button>ย้อนกลับ</button>`;
  el.querySelector('button').onclick = () => { el.remove(); applyUndo(0); };
  $('#toasts').appendChild(el); icons(el);
  setTimeout(() => { el.style.opacity = '0'; setTimeout(() => el.remove(), 280); }, 6000);
}
function openUndoList(){
  const fmt = t => new Date(t).toLocaleString('th-TH', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  openModal('ย้อนกลับการเปลี่ยนแปลง', UNDO.length ? UNDO.map((u, i) => `
    <div class="hrow" style="cursor:default"><div style="flex:1;min-width:0">
      <div style="font-size:14px;font-weight:600">${esc(u.label)}</div>
      <div style="font-size:11.5px;color:var(--muted)">${fmt(u.t)}${u.full ? ' · คืนข้อมูลทั้งระบบ' : ''}</div></div>
      <button class="btn sm ghost" data-undo="${i}"><i data-lucide="undo-2"></i>ย้อนกลับ</button></div>`).join('')
    : '<div class="empty" style="padding:24px"><div>ยังไม่มีรายการที่ย้อนกลับได้</div></div>',
    `<button class="btn ghost block" data-close>ปิด</button>`);
  $$('[data-undo]').forEach(b => b.onclick = async () => {
    const u = UNDO[+b.dataset.undo];
    if(u.full && !(await ask('คืนข้อมูลทั้งระบบ?', `ข้อมูลทั้งหมดจะกลับไปเป็นก่อน "${u.label}" สิ่งที่ทำหลังจากนั้นจะหายไป`, 'คืนข้อมูล'))) return;
    closeModal(); applyUndo(UNDO.indexOf(u));
  });
}

// ลบหมวด: ที่เดียวทั้งแอป ให้เลือกว่าจะย้ายข้อมูลหรือลบทิ้ง
function deleteCategory(c){
  const qn = S.questions.filter(q => q.cat === c && !q.src).length, cn = S.cards.filter(x => x.cat === c).length;
  const others = S.cats.filter(x => x !== c);
  const meta = { name: c, i: S.cats.indexOf(c), icon: S.catIcons?.[c], tone: S.catTones?.[c], cover: S.catCovers?.[c] };
  const finish = rec => {
    S.cats = S.cats.filter(x => x !== c);
    if(S.catIcons) delete S.catIcons[c]; if(S.catTones) delete S.catTones[c]; if(S.catCovers) delete S.catCovers[c];
    pushUndo(`ลบหมวด ${c}`, { ...rec, delCats: [meta] });
    save(); closeModal(); syncChrome(); refreshPage(); undoToast(`ลบหมวด ${c} แล้ว`);
  };
  openModal(`ลบ "${esc(c)}"`, `
    <p style="color:var(--text2);line-height:1.6;margin-bottom:14px">มีข้อสอบ <b>${qn}</b> ข้อ · บัตรจำ <b>${cn}</b> ใบ</p>
    <button class="btn ghost block" id="dc_q" ${qn ? '' : 'disabled'}><i data-lucide="eraser"></i>ลบเฉพาะข้อสอบ (หนังสือยังอยู่)</button>
    <button class="btn red block" id="dc_all" style="margin-top:8px"><i data-lucide="trash-2"></i>ลบทั้งหมด (หนังสือ ข้อสอบ บัตรจำ)</button>
    <p style="font-size:12px;color:var(--muted);margin-top:10px">กดย้อนกลับได้ถ้าลบผิด</p>`,
    `<button class="btn ghost block" data-close>ยกเลิก</button>`);
  $('#dc_q').onclick = () => {
    removeQuestions(q => q.cat === c && !q.src, `ลบข้อสอบวิชา ${c}`);
    closeModal(); syncChrome(); refreshPage(); undoToast(`ลบข้อสอบวิชา ${c} แล้ว`);
  };
  $('#dc_all').onclick = () => {
    if(S.cats.length <= 1) return toast('ต้องมีอย่างน้อย 1 วิชา', 'err');
    const delQ = withIdx(S.questions, q => q.cat === c), delC = withIdx(S.cards, x => x.cat === c);
    S.questions = S.questions.filter(q => q.cat !== c); S.cards = S.cards.filter(x => x.cat !== c);
    finish({ delQ, delC });
  };
}


// ธีมสี: แต่ละธีมเป็นชุดหลายสี
// bg = พื้นหน้าแอป, main = ปุ่ม/สีหลัก, ink = สีเข้มสุด, today = ไล่สีการ์ดวันนี้ [บน, ล่าง],
// todayLight = การ์ดวันนี้สีอ่อน (ตัวอักษรเข้ม), ring = วงแหวน/ไฮไลต์, tints = 3 สีรองสำหรับรายการ/สถิติ
const THEMES = [
  { id:'skygarden', name:'Sky Garden',    bg:'#fff1f2', main:'#313857', ink:'#232843', today:['#598099','#313857'], ring:'#edbabc', tints:['#598099','#bb7b85','#e2b45a'], sw:['#edbabc','#faedcd','#313857','#bb7b85','#598099'] },
  { id:'winter',    name:'Winter Hearth', bg:'#fefdf0', main:'#3f7680', ink:'#23414a', today:['#bfdfe2','#d7edef'], todayLight:true, ring:'#f0b93a', tints:['#5aa3ad','#e0a92b','#7aa7c7'], sw:['#d7edef','#bfdfe2','#fefac2','#ffd87b','#3f7680'] },
  { id:'ocean',     name:'Ocean',         bg:'#f4f8fc', main:'#2f6fae', ink:'#14243a', today:['#3b82c4','#14243a'], ring:'#8cc0ec', tints:['#3b82c4','#f08a6c','#e3b04b'], sw:['#14243a','#2f6fae','#8cc0ec','#f4e3c1','#f08a6c'] },
  { id:'royal',     name:'Royal Police',  bg:'#f7f5ef', main:'#1f3a6d', ink:'#0d1a33', today:['#2c4f8f','#0d1a33'], ring:'#f2c14e', tints:['#2c4f8f','#a23b47','#c99a2e'], sw:['#0d1a33','#1f3a6d','#f2c14e','#a23b47','#f7f5ef'] },
  { id:'matcha',    name:'Matcha',        bg:'#f5f7ee', main:'#4a6b35', ink:'#22321a', today:['#7a9a5a','#22321a'], ring:'#d6e8a8', tints:['#5f8a3e','#d9895b','#c2a24a'], sw:['#22321a','#4a6b35','#a7c47a','#d6e8a8','#f1e3c8'] },
  { id:'peach',     name:'Peach Sunset',  bg:'#fff6ef', main:'#c2553f', ink:'#4a1f26', today:['#f08a68','#7a2e3a'], ring:'#ffd6a5', tints:['#e0714f','#5e9a8c','#e6a93b'], sw:['#7a2e3a','#c2553f','#f6bd60','#ffd6a5','#84a59d'] },
  { id:'lavender',  name:'Lavender',      bg:'#f7f4fd', main:'#6a4bb8', ink:'#2a1d48', today:['#8f75e3','#2a1d48'], ring:'#e2d4ff', tints:['#7d5fd6','#e07aa0','#5aa3d6'], sw:['#2a1d48','#6a4bb8','#b8a4f0','#ffd1dc','#b9e0ff'] },
  { id:'lagoon',    name:'Mint Lagoon',   bg:'#f0faf8', main:'#127b74', ink:'#0b3536', today:['#2ab3a5','#0b3536'], ring:'#b8f2e6', tints:['#16958c','#f08b84','#e0b552'], sw:['#0b3536','#127b74','#5ed1c3','#b8f2e6','#ffa69e'] },
  { id:'graphite',  name:'Graphite',      bg:'#f4f5f7', main:'#3d4550', ink:'#14171c', today:['#4b5563','#14171c'], ring:'#d3d9e0', tints:['#55606e','#c26a5a','#8a96a6'], sw:['#14171c','#3d4550','#8a96a6','#d3d9e0','#c26a5a'] },
  { id:'neo',       name:'NEO ขาวดำ',     bg:'#fbfbf8', main:'#111111', ink:'#000000', today:['#2a2a2a','#000000'], ring:'#e1e5ac', tints:['#6aa6da','#ef3e4a','#ea7a00'], sw:['#000000','#e1e5ac','#fbfbf8','#6aa6da','#dbe3e9'], onp:'#e1e5ac' }
];
function applyPalette(){
  const t = THEMES.find(x => x.id === S.settings.palette) || THEMES[0];
  const dark = !!S.settings.dark, r = document.documentElement.style, set = (k, v) => r.setProperty(k, v);
  const lightCard = t.todayLight && !dark;
  const accent = dark ? t.ring : t.main;
  set('--cf', t.ring); set('--cf-deep', t.main); set('--hm-ink', t.ink);
  set('--blue', accent); set('--blue-2', `color-mix(in srgb, ${accent} 15%, var(--surface))`);
  set('--primary', dark ? t.ring : t.main); set('--onp', dark ? t.ink : (t.onp || '#ffffff'));
  set('--acc', t.ring); set('--acc-glow', `color-mix(in srgb, ${t.main} 30%, transparent)`);
  set('--grid-line', `color-mix(in srgb, ${t.main} ${dark ? 6 : 9}%, transparent)`);
  t.tints.forEach((c, i) => set(`--t${i+1}`, c));
  // พื้นหน้าแอปมีโทนของธีม (เฉพาะโหมดสว่าง)
  if(dark){ ['--bg','--surface2','--surface3','--line'].forEach(k => r.removeProperty(k)); }
  else {
    set('--bg', t.bg); set('--surface2', `color-mix(in srgb, ${t.main} 5%, #ffffff)`);
    set('--surface3', `color-mix(in srgb, ${t.main} 12%, #ffffff)`); set('--line', `color-mix(in srgb, ${t.main} 12%, #ffffff)`);
  }
  // การ์ดวันนี้
  const [ta, tb] = lightCard || !dark ? t.today : [t.main, t.ink];
  set('--today-a', ta); set('--today-b', tb);
  set('--today-fg', lightCard ? t.ink : '#ffffff');
  set('--today-soft', lightCard ? 'rgba(255,255,255,.55)' : 'rgba(255,255,255,.08)');
  set('--today-line', lightCard ? `color-mix(in srgb, ${t.ink} 14%, transparent)` : 'rgba(255,255,255,.14)');
  set('--today-btn', lightCard ? t.ring : '#ffffff'); set('--today-btnfg', t.ink);
  set('--today-ring', lightCard ? t.main : t.ring); set('--today-track', lightCard ? 'rgba(255,255,255,.7)' : 'rgba(255,255,255,.14)');
  const meta = document.querySelector('meta[name="theme-color"]'); if(meta) meta.content = dark ? '#000000' : t.bg;
}
function openPalettePicker(){
  const cur = (THEMES.find(x => x.id === S.settings.palette) || THEMES[0]).id;
  openModal('ธีมสี', `<div class="pal-grid">${THEMES.map(t => `
    <button class="pal-card ${t.id === cur ? 'on' : ''}" data-pal="${t.id}" style="background:${t.bg}">
      <span class="pal-sw">${t.sw.map(c => `<i style="background:${c}"></i>`).join('')}</span>
      <b style="color:${t.ink}">${t.name}</b></button>`).join('')}</div>`, `<button class="btn ghost block" data-close>เสร็จ</button>`);
  $$('[data-pal]').forEach(b => b.onclick = () => {
    S.settings.palette = b.dataset.pal; save(); theme();
    $$('[data-pal]').forEach(x => x.classList.toggle('on', x === b));
    const lb = $('#btnPalette span'); if(lb) lb.textContent = THEMES.find(x => x.id === b.dataset.pal).name;
  });
}

function theme(){
  document.documentElement.dataset.theme=S.settings.dark?'dark':'light';
  applyPalette();
  $('#btnTheme').innerHTML=`<i data-lucide="${S.settings.dark?'sun':'moon'}"></i>`;
  icons();
}
$('#btnTheme').onclick=()=>{playTone('tap');S.settings.dark=!S.settings.dark;save();theme();if(PAGE==='setting')renderSetting();};

$('#btnSearch').onclick=()=>{
  playTone('tap');
  openModal('ค้นหา',`<div class="search" style="box-shadow:none"><i data-lucide="search"></i>
      <input id="gs" placeholder="พิมพ์คำค้น"></div>
    <div id="gres" style="margin-top:14px"></div>`,'',{focus:'#gs'});
  const run=()=>{
    const t=$('#gs').value.trim().toLowerCase();
    if(!t){$('#gres').innerHTML=`<div class="empty" style="padding:24px"><i data-lucide="search"></i><div>พิมพ์อย่างน้อย 1 ตัวอักษร</div></div>`;icons();return;}
    const qs=S.questions.filter(q=>q.q.toLowerCase().includes(t)).slice(0,8);
    const cs=S.cards.filter(c=>c.f.toLowerCase().includes(t)||c.b.toLowerCase().includes(t)).slice(0,6);
    $('#gres').innerHTML=(qs.length||cs.length)?`
      ${qs.length?`<div style="font-size:12.5px;color:var(--muted);margin-bottom:8px">ข้อสอบ ${qs.length}</div>${qs.map(q=>`<div class="qrow" style="margin-bottom:7px"><div class="body">
          <div class="qt">${q.q}</div><div class="meta"><span class="tag b">${esc(q.cat)}</span>
          <span class="tag g">✓ ${q.c[q.a]}</span></div></div>
          <button class="ib sm" data-gq="${q.id}"><i data-lucide="pencil"></i></button></div>`).join('')}`:''}
      ${cs.length?`<div style="font-size:12.5px;color:var(--muted);margin:14px 0 8px">บัตรจำ ${cs.length}</div>${cs.map(c=>`<div class="qrow" style="margin-bottom:7px"><div class="body">
          <div class="qt">${esc(c.f)}</div><div style="font-size:12.5px;color:var(--muted);margin-top:3px;white-space:pre-wrap">${esc(c.b)}</div></div></div>`).join('')}`:''}`
      :`<div class="empty" style="padding:24px"><i data-lucide="search-x"></i><div>ไม่พบ</div></div>`;
    $$('[data-gq]').forEach(b=>b.onclick=()=>{playTone('tap');const q=S.questions.find(x=>x.id===b.dataset.gq);closeModal();setTimeout(()=>qForm(q),120);});
    icons();
  };
  let modalSearchDebounce = null;
  $('#gs').oninput = () => {
    clearTimeout(modalSearchDebounce);
    modalSearchDebounce = setTimeout(run, 250);
  };
  run();
};

let lastActiveAt = Date.now();
['pointerdown','keydown','wheel','touchmove'].forEach(ev => document.addEventListener(ev, () => { lastActiveAt = Date.now(); }, {passive:true, capture:true}));
setInterval(()=>{
  if(document.hidden)return;
  const active = (EX.live && !EX.paused) || Date.now() - lastActiveAt < 120000;
  if(!active) return;
  S.stats.minutes++; day().minutes++; save();

},60000);

function onAppHide(){
  if(EX.live){
    persist();
    try { localStorage.setItem('pp_active_exam', JSON.stringify(S.session)); } catch(e){}
    dbSet('state', S);
  }
}
window.addEventListener('pagehide', onAppHide);
window.addEventListener('beforeunload', onAppHide);
document.addEventListener('visibilitychange', ()=>{ if(document.hidden) onAppHide(); });


// ==========================================
// ปุ่มย้อนกลับ (Android / ปัดย้อน): ปิดสิ่งที่เปิดอยู่ก่อน → กลับหน้าแรก → ออก
// ==========================================
let backExitArmed = false;
function handleBack(){
  const on = sel => { const el = $(sel); return el && el.classList.contains('on'); };
  if($('#chunkUploadOverlay')) return true;            // กำลังอัปโหลด ห้ามปิด
  if(on('#lightbox')){ closeLightbox(); return true; }
  if(on('#imgEditorMask')){ closeImageEditor(); return true; }
  if(on('#rteMask')){ closeRichTextEditor(); return true; }
  if(on('#mask')){ closeModal(); return true; }
  if(on('#neoCal')){ $('#neoCal [data-cal="close"]').click(); return true; }
  const fs = $('#fsReviewWrap'); if(fs){ fs.remove(); return true; }
  if(PAGE === 'quiz' && QF.book){ QF.book = null; renderQuiz(); return true; }
  if(PAGE !== 'home'){ go('home'); return true; }
  return false;
}
if(history.state?.pexam !== 'trap'){
  history.replaceState({ pexam: 'base' }, '');
  history.pushState({ pexam: 'trap' }, '');
}
window.addEventListener('popstate', () => {
  if(handleBack()){ backExitArmed = false; history.pushState({ pexam: 'trap' }, ''); return; }
  if(!backExitArmed){ backExitArmed = true; toast('กดย้อนกลับอีกครั้งเพื่อออก'); history.pushState({ pexam: 'trap' }, ''); setTimeout(() => backExitArmed = false, 2000); return; }
  history.back();
});
if('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(e => logErr('ลงทะเบียนโหมดออฟไลน์ไม่สำเร็จ: ' + e.message, 'sw'));
