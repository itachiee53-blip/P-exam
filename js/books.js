"use strict";
// ==========================================
// แอนิเมชันเปิดหนังสือ: ปกลอยขึ้นมากลางจอ แล้วเปิดออกเห็นหน้ากระดาษ ก่อนเข้าหน้าเลือกชุด
// ==========================================
let bookAnimBusy = false;
async function openBookAnim(btn, done){
  const face = btn.querySelector('.hb-face');
  if(bookAnimBusy) return;
  if(!face || matchMedia('(prefers-reduced-motion: reduce)').matches || !Element.prototype.animate){ playTone('tap'); return done(); }
  bookAnimBusy = true;
  playTone('tap');
  const bk = btn.dataset.book && bookOrLoose(btn.dataset.book), r = face.getBoundingClientRect();
  const name = bk ? bk.name : btn.dataset.play;
  const pool = bk ? bookQs(bk.id) : S.questions.filter(q => q.cat === name && !q.src);
  const total = pool.length, done0 = pool.filter(q => (S.qstat[q.id]?.seen || 0) > 0).length;
  const W = Math.min(240, innerWidth * .43, innerHeight * .5), H = W * 4 / 3;
  const ov = document.createElement('div');
  ov.className = 'bk-ov';
  ov.style.setProperty('--bk', getComputedStyle(btn).getPropertyValue('--bk'));
  ov.innerHTML = `<div class="bk-3d" style="left:${(innerWidth - W) / 2}px;top:${(innerHeight - H) / 2}px;width:${W}px;height:${H}px">
      <div class="bk-back"></div>
      <div class="bk-page"><small>P-EXAM</small><b>${esc(name)}</b><span>${total.toLocaleString()} ข้อ · ทำแล้ว ${total ? Math.round(done0 / total * 100) : 0}%</span><i></i></div>
      <div class="bk-cover"><div class="bk-front">${face.outerHTML}</div><div class="bk-inside"><div class="bk-lp">
        <span class="bk-emb"><i data-lucide="${bk ? 'library' : cicon(name)}"></i></span>
        ${bk ? `<small>หนังสือสถาบัน</small><b>${new Set(pool.map(q => q.cat)).size} วิชา</b><span>เลือกวิชาที่จะทำ</span>` : `<small>คลังข้อสอบ</small><b>${total ? Math.ceil(total / 50) : 0} ชุด</b><span>ชุดละ 50 ข้อ</span>`}</div></div></div>
    </div>`;
  document.body.appendChild(ov);
  icons(ov);
  const book = ov.querySelector('.bk-3d'), cover = ov.querySelector('.bk-cover'), page = ov.querySelector('.bk-page');
  const dx = r.left + r.width / 2 - innerWidth / 2, dy = r.top + r.height / 2 - innerHeight / 2, sc = r.width / W;
  const ease = 'cubic-bezier(.22,1,.36,1)';
  try{
    ov.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 260, fill: 'both' });
    await book.animate([{ transform: `translate(${dx}px,${dy}px) scale(${sc})` }, { transform: 'translate(0,0) scale(1)' }],
      { duration: 460, easing: ease, fill: 'both' }).finished;
    page.animate([{ opacity: .6 }, { opacity: 1 }], { duration: 500, fill: 'both' });
    await Promise.all([
      cover.animate([{ transform: 'rotateY(0deg)' }, { transform: 'rotateY(-178deg)' }], { duration: 720, easing: 'cubic-bezier(.45,.05,.25,1)', fill: 'both' }).finished,
      book.animate([{ transform: 'translateX(0)' }, { transform: `translateX(${W * .5}px)` }], { duration: 720, easing: 'cubic-bezier(.45,.05,.25,1)', fill: 'both' }).finished
    ]);
    await new Promise(r => setTimeout(r, 160)); // ค้างหน้ากระดาษให้เห็นชื่อวิชาครู่หนึ่ง
    done();
    await ov.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 240, easing: 'ease-out', fill: 'both' }).finished;
  }catch(e){ done(); }
  ov.remove(); bookAnimBusy = false;
}


// กดค้างที่หนังสือ (0.45 วิ) แล้วลากเพื่อจัดลำดับวิชาใหม่
function initShelfDrag(){
  const shelf = $('.shelf'); if(!shelf) return;
  let timer = null, drag = null, sx = 0, sy = 0, justDragged = false;
  const cancel = () => { clearTimeout(timer); timer = null; };
  shelf.addEventListener('contextmenu', e => e.preventDefault());
  shelf.addEventListener('pointerdown', e => {
    const book = e.target.closest('.book[data-key]');
    if(!book || e.target.closest('.hb-act')) return;
    sx = e.clientX; sy = e.clientY;
    timer = setTimeout(() => {
      const r = book.getBoundingClientRect();
      const ghost = book.cloneNode(true);
      ghost.className = 'book drag-ghost';
      Object.assign(ghost.style, { left: r.left + 'px', top: r.top + 'px', width: r.width + 'px' });
      document.body.appendChild(ghost);
      book.classList.add('dragging');
      drag = { book, ghost, ox: sx - r.left, oy: sy - r.top };
      navigator.vibrate && navigator.vibrate(15);
      playTone('pick');
    }, 450);
  });
  shelf.addEventListener('pointermove', e => {
    if(!drag){ if(timer && Math.hypot(e.clientX - sx, e.clientY - sy) > 10) cancel(); return; }
    drag.ghost.style.left = e.clientX - drag.ox + 'px';
    drag.ghost.style.top = e.clientY - drag.oy + 'px';
    const over = document.elementFromPoint(e.clientX, e.clientY)?.closest('.shelf .book[data-key]:not(.dragging)');
    if(over){
      const r = over.getBoundingClientRect();
      shelf.insertBefore(drag.book, e.clientX > r.left + r.width / 2 ? over.nextSibling : over);
    }
  });
  const end = () => {
    cancel();
    if(!drag) return;
    drag.ghost.remove(); drag.book.classList.remove('dragging');
    const order = $$('.shelf .book[data-key]').map(b => b.dataset.key);
    if(order.join() !== (S.shelf || []).join()){ S.shelf = order; save(); toast('จัดลำดับแล้ว', 'ok'); }
    drag = null; justDragged = true; setTimeout(() => justDragged = false, 300);
  };
  shelf.addEventListener('pointerup', end);
  shelf.addEventListener('pointercancel', end);
  // ระหว่างลาก ไม่ให้หน้าเลื่อน และไม่นับเป็นการแตะเปิดหนังสือ
  shelf.addEventListener('touchmove', e => { if(drag) e.preventDefault(); }, { passive: false });
  shelf.addEventListener('click', e => { if(justDragged){ e.stopPropagation(); e.preventDefault(); } }, true);
}

// หน้าเลือกชุด (ชุดละ 50 ข้อ) ใช้ทั้งหนังสือวิชาเดิมและวิชาในหนังสือสถาบัน
// สุ่มทำ: เลือกจำนวนข้อ (ใช้ทั้งในหน้าชุดข้อสอบและคลังข้อ)
function randomPick(ids, name, noTime){
  const N = ids.length; if(!N) return;
  const opts = [10, 20, 30, 50, 100].filter(n => n < N).map(n => ({ val: n, label: `${n} ข้อ` })).concat({ val: N, label: `ทั้งหมด ${N} ข้อ` });
  openPicker({ title: 'สุ่มทำกี่ข้อ', options: opts, value: '', onSelect: n => { n = +n; setTimeout(() =>
    startExam({ ids, count: n, minutes: noTime ? 0 : n, mode: 'practice', label: `สุ่ม ${name} ${n} ข้อ` }), 150); } });
}
function openSetPicker(catName, allQs, title){
      if (!allQs.length) return toast('ไม่มีข้อสอบในหมวดนี้', 'err');

      const BATCH_SIZE = 50;
      const totalBatches = Math.ceil(allQs.length / BATCH_SIZE);

      const body = `
        <div style="display:flex;flex-direction:column;gap:14px;padding:2px">
          <div style="background:var(--surface2);border:1px solid var(--line);border-radius:18px;padding:14px 16px;display:flex;flex-direction:column;gap:12px">
            <div style="display:flex;justify-content:space-between;align-items:center">
              <div>
                <div style="font-size:15px;font-weight:700;color:var(--text)">${esc(catName)}</div>
                <div style="font-size:12px;color:var(--muted);margin-top:2px">ทั้งหมด ${allQs.length} ข้อ · แบ่ง ${totalBatches} ชุด</div>
              </div>
              <button class="btn sm" id="btnQuickRandom20" style="border-radius:12px;padding:6px 12px;font-size:12px;font-weight:600;display:flex;align-items:center;gap:6px;background:var(--surface);border:1px solid var(--line);color:var(--text)">
                <i data-lucide="shuffle" style="width:14px;height:14px"></i>สุ่มทำ<i data-lucide="chevron-down" style="width:13px;height:13px"></i>
              </button>
            </div>

            <label style="display:flex;justify-content:space-between;align-items:center;cursor:pointer;user-select:none;padding-top:10px;border-top:1px solid rgba(0,0,0,0.05)">
              <span style="font-size:12.5px;font-weight:600;color:var(--text);display:flex;align-items:center;gap:6px">
                <i data-lucide="timer-off" style="width:15px;height:15px;color:var(--muted)"></i>ไม่จำกัดเวลา
              </span>
              <div style="position:relative;width:40px;height:22px">
                <input type="checkbox" id="chkNoTimeLimit" style="opacity:0;width:0;height:0">
                <div id="toggleTrack" style="position:absolute;inset:0;background:var(--line);border-radius:99px;transition:0.25s"></div>
                <div id="toggleThumb" style="position:absolute;top:2px;left:2px;width:18px;height:18px;background:#fff;border-radius:50%;transition:0.25s"></div>
              </div>
            </label>
          </div>

          <div style="display:grid;grid-template-columns:repeat(2, 1fr);gap:10px;max-height:340px;overflow-y:auto;padding:2px">
            ${Array.from({ length: totalBatches }).map((_, idx) => {
              const startNo = idx * BATCH_SIZE + 1;
              const endNo = Math.min((idx + 1) * BATCH_SIZE, allQs.length);
              const batchQs = allQs.slice(startNo - 1, endNo);
              const doneCount = batchQs.filter(q => (S.qstat[q.id]?.seen || 0) > 0).length;
              const totalInBatch = batchQs.length;
              const pct = Math.round((doneCount / totalInBatch) * 100);
              const isAllDone = doneCount === totalInBatch;

              return `
                <div class="picker-item" data-batchidx="${idx}" style="cursor:pointer;flex-direction:column;align-items:stretch;gap:8px;padding:12px;margin:0;border-radius:16px;background:var(--surface);border:1px solid ${isAllDone ? 'rgba(16,185,129,0.25)' : 'var(--line)'}">
                  <div style="display:flex;justify-content:space-between;align-items:center">
                    <span style="font-size:13.5px;font-weight:700;color:var(--text)">ชุดที่ ${idx + 1}</span>
                    <span style="font-size:11px;font-weight:700;padding:2px 7px;border-radius:99px;background:${isAllDone ? 'rgba(16,185,129,0.1)' : 'rgba(37,99,235,0.08)'};color:${isAllDone ? '#10b981' : 'var(--blue)'}">
                      ${doneCount}/${totalInBatch}
                    </span>
                  </div>
                  <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;color:var(--muted)">
                    <span>ข้อ ${startNo}–${endNo}</span>
                    <span style="font-weight:600">${pct}%</span>
                  </div>
                  <div style="width:100%;height:6px;background:var(--surface2);border-radius:99px;overflow:hidden;border:1px solid var(--line)">
                    <div style="width:${pct}%;height:100%;background:${isAllDone ? '#10b981' : 'var(--blue)'};border-radius:99px;"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;

      openModal(esc(title || catName), body, `<button class="btn ghost block" data-close style="border-radius:14px">ปิด</button>`);

      const chk = $('#chkNoTimeLimit');
      const track = $('#toggleTrack');
      const thumb = $('#toggleThumb');
      chk.onchange = () => {
        if (chk.checked) {
          track.style.background = 'var(--blue)';
          thumb.style.transform = 'translateX(18px)';
        } else {
          track.style.background = 'var(--line)';
          thumb.style.transform = 'translateX(0)';
        }
      };

      $('#btnQuickRandom20').onclick = () => {
        randomPick(allQs.map(q => q.id), title || catName, chk?.checked);
      };

      $$('[data-batchidx]').forEach(btn => {
        btn.onclick = () => {
          const noTime = chk?.checked;
          const idx = +btn.dataset.batchidx;
          const batchQs = allQs.slice(idx * BATCH_SIZE, (idx + 1) * BATCH_SIZE);
          
          let unseenQs = batchQs.filter(q => (S.qstat[q.id]?.seen || 0) === 0);
          
          if (!unseenQs.length) unseenQs = batchQs; // ทำครบแล้ว = ทำซ้ำทั้งชุด (ไม่ลบสถิติ)

          closeModal();
          startExam({
            ids: unseenQs.map(q => q.id),
            count: unseenQs.length,
            minutes: noTime ? 0 : Math.round(unseenQs.length * 1.2),
            mode: 'practice',
            label: `${title || catName} (ชุด ${idx + 1})`
          });
        };
      });
}

// ==========================================
// หนังสือสถาบัน: S.books = [{id, name, cats}] · ข้อสอบที่อยู่ในเล่มมี q.src = id เล่ม
// จำลองสอบ/เกณฑ์/สถิติ ยังนับตามวิชาเหมือนเดิม (รวมทุกเล่ม)
// ==========================================
const bookOf = id => (S.books || []).find(b => b.id === id);
const bookQs = (id, cat) => S.questions.filter(q => (id === '__loose' ? !q.src : q.src === id) && (!cat || q.cat === cat));
const curBookId = () => (PAGE === 'quiz' && QF.book && QF.book !== '__loose') ? QF.book : undefined;
function tagNewForBook(q){ const id = curBookId(); if(!id) return q; q.src = id; const bk = bookOf(id); if(bk && !bk.cats.includes(q.cat)) bk.cats.push(q.cat); return q; }
const bookOrLoose = id => id === '__loose' ? { id: '__loose', name: 'ยังไม่จัดเล่ม', cats: [] } : bookOf(id);
// วิชาในเล่ม (เรียงตามลำดับบนชั้น)
function bookSubjects(id){
  const bk = bookOf(id);
  const list = id === '__loose'
    ? S.cats.filter(c => S.questions.some(q => q.cat === c && !q.src) || !S.questions.some(q => q.cat === c))
    : [...new Set([...(bk ? bk.cats : []), ...bookQs(id).map(q => q.cat)])].filter(c => S.cats.includes(c));
  const ord = S.shelf || [];
  return list.sort((a, b) => { const x = ord.indexOf('c:' + a), y = ord.indexOf('c:' + b); return (x < 0 ? 999 : x) - (y < 0 ? 999 : y) || S.cats.indexOf(a) - S.cats.indexOf(b); });
}
// หน้าแรกของคลัง: ชั้นหนังสือสถาบันอย่างเดียว
function renderShelfTop(){
  const items = (S.books || []).map(b => ({ key: 'b:' + b.id, b }));
  if(S.questions.some(q => !q.src) || !items.length) items.push({ key: 'b:__loose', b: { id: '__loose', name: 'ยังไม่จัดเล่ม', cats: [] } });
  const ord = S.shelf || [];
  items.sort((x, y) => { const a = ord.indexOf(x.key), b = ord.indexOf(y.key); return (a < 0 ? 999 : a) - (b < 0 ? 999 : b); });
  $('#view').innerHTML = `
    <div class="row" style="gap:8px;flex-wrap:wrap">
      <button class="btn ghost sm" id="btnBulk"><i data-lucide="clipboard-list"></i>นำเข้าชุด</button>
    </div>
    <div class="sec"><i data-lucide="library"></i>ชั้นหนังสือ<span class="more" style="text-decoration:none;color:var(--muted)">แตะเพื่อเปิด · กดค้างเพื่อย้าย</span></div>
    <div class="shelf">${items.map(it => {
      const qs = bookQs(it.b.id), done = qs.filter(q => (S.qstat[q.id]?.seen || 0) > 0).length, pct = qs.length ? Math.round(done / qs.length * 100) : 0;
      const loose = it.b.id === '__loose';
      return `<div class="book" data-key="${it.key}">
        <button class="hb" data-book="${it.b.id}" style="--bk:${loose ? '#7a8594' : 'var(--cf-deep)'}" aria-label="เปิด ${esc(it.b.name)}">
          ${bookFace(it.b.name, (S.bookCovers || {})[it.b.id], loose ? '#7a8594' : 'var(--cf-deep)', loose ? 'inbox' : 'library')}
          <span class="hb-pages"></span><span class="hb-ribbon"></span></button>
        <div class="hb-info"><b>${esc(it.b.name)}</b>
          <small>${new Set(qs.map(q => q.cat)).size} วิชา · ${qs.length.toLocaleString()} ข้อ</small>
          <div class="hb-row"><span class="hb-bar"><i style="width:${pct}%"></i></span><em>${pct}%</em>
            ${loose ? '' : `<button class="hb-act" data-editbook="${it.b.id}" title="ชื่อ ปก ลบ"><i data-lucide="settings-2"></i></button>`}</div></div>
      </div>`;
    }).join('')}
    </div>`;
  $('#btnBulk').onclick = () => bulkForm();
  $$('[data-book]').forEach(b => b.onclick = () => openBookAnim(b, () => { QF.book = b.dataset.book; QF.cat = 'ทั้งหมด'; QF.term = ''; QF.limit = 25; QF.off = 0; renderQuiz(); $('.main').scrollTo(0, 0); }));
  $$('[data-editbook]').forEach(b => b.onclick = () => editBook(b.dataset.editbook));
  initShelfDrag();
  icons();
}
function moveToBook(ids, bookId, label){
  const set = new Set(ids), moveSrc = [];
  const bk = bookOf(bookId);
  S.questions.forEach(q => { if(set.has(q.id) && q.src !== bookId){ moveSrc.push({ id: q.id, src: q.src || '' }); q.src = bookId || undefined; if(bk && !bk.cats.includes(q.cat)) bk.cats.push(q.cat); } });
  if(!moveSrc.length) return 0;
  pushUndo(label, { moveSrc }); save(); return moveSrc.length;
}
function bookNameModal(title, val, onOk){
  openModal(title, `<div class="field"><label>ชื่อหนังสือ เช่น ชื่อสถาบัน</label><input class="inp" id="bk_name" value="${esc(val || '')}" placeholder="เช่น บอนทูบี"></div>`,
    `<button class="btn ghost" data-close>ยกเลิก</button><button class="btn" id="bk_ok"><i data-lucide="check"></i>บันทึก</button>`, { focus: '#bk_name' });
  $('#bk_ok').onclick = () => { const v = $('#bk_name').value.trim().replace(/[<>"'`]/g, ''); if(!v) return toast('ใส่ชื่อก่อน', 'err'); closeModal(); onOk(v); };
}
function createBook(after){
  bookNameModal('สร้างหนังสือสถาบัน', '', name => {
    S.books = S.books || []; const id = 'b' + uid();
    S.books.push({ id, name, cats: [] }); save(); refreshPage(); toast(`สร้าง "${name}" แล้ว`, 'ok');
    after && after(id);
  });
}
function openInstitute(id){
  const bk = bookOf(id); if(!bk) return;
  const cats = [...new Set([...bk.cats, ...bookQs(id).map(q => q.cat)])].filter(c => S.cats.includes(c));
  const loose = S.cats.map(c => [c, S.questions.filter(q => q.cat === c && !q.src).length]).filter(x => x[1]);
  openModal(esc(bk.name), `
    <div class="inst-grid">${cats.map(c => {
      const qs = bookQs(id, c), done = qs.filter(q => (S.qstat[q.id]?.seen || 0) > 0).length, pct = qs.length ? Math.round(done / qs.length * 100) : 0;
      const [bg, fg] = tone(c);
      return `<button class="inst-sub" data-isub="${esc(c)}" style="--fg:${fg}">
        <span class="hm-ic" style="background:${bg};color:${fg}"><i data-lucide="${cicon(c)}"></i></span>
        <b>${esc(c)}</b><small>${qs.length} ข้อ · ${pct}%</small><span class="hb-bar"><i style="width:${pct}%;background:${fg}"></i></span></button>`;
    }).join('') || '<div class="empty" style="grid-column:1/-1;padding:20px">ยังไม่มีวิชาในเล่มนี้</div>'}</div>
    <div class="inst-acts">
      <button class="btn ghost sm" id="in_add"><i data-lucide="plus"></i>เพิ่มวิชาในเล่ม</button>
      ${loose.length ? `<button class="btn ghost sm" id="in_move"><i data-lucide="folder-input"></i>ย้ายข้อสอบเข้าเล่ม</button>` : ''}
    </div>`, `<button class="btn ghost block" data-close>ปิด</button>`);
  $$('[data-isub]').forEach(b => b.onclick = () => {
    const c = b.dataset.isub, qs = bookQs(id, c);
    if(!qs.length) return toast('วิชานี้ยังไม่มีข้อสอบในเล่ม ใช้ "ย้ายข้อสอบเข้าเล่ม" หรือเลือกข้อในคลังข้อ', 'err');
    closeModal(); setTimeout(() => openSetPicker(c, qs, `${bk.name} · ${c}`), 120);
  });
  $('#in_add').onclick = () => {
    const opts = [{ val: '__new', label: '+ สร้างวิชาใหม่' }, ...S.cats.filter(c => !cats.includes(c)).map(c => ({ val: c, label: c }))];
    const add = c => { if(!S.cats.includes(c)) S.cats.push(c); if(!bk.cats.includes(c)) bk.cats.push(c); save(); syncChrome(); refreshPage(); setTimeout(() => openInstitute(id), 120); };
    openPicker({ title: 'เพิ่มวิชาในเล่ม', options: opts, value: '', onSelect: c => c !== '__new' ? add(c) : setTimeout(() => {
      openModal('สร้างวิชาใหม่', `<div class="field"><label>ชื่อวิชา</label><input class="inp" id="nc_name" placeholder="เช่น สังคม"></div>`,
        `<button class="btn ghost" data-close>ยกเลิก</button><button class="btn" id="nc_ok"><i data-lucide="check"></i>เพิ่ม</button>`, { focus: '#nc_name' });
      $('#nc_ok').onclick = () => { const v = $('#nc_name').value.trim().replace(/[<>"'`]/g, ''); if(!v) return toast('ใส่ชื่อวิชา', 'err'); closeModal(); add(v); };
    }, 120) });
  };
  if($('#in_move')) $('#in_move').onclick = () => openPicker({ title: 'ย้ายข้อสอบวิชาไหนเข้าเล่มนี้', value: '',
    options: loose.map(([c, n]) => ({ val: c, label: `${c} (${n} ข้อที่ยังไม่อยู่ในเล่มไหน)` })),
    onSelect: c => { const n = moveToBook(S.questions.filter(q => q.cat === c && !q.src).map(q => q.id), id, `ย้าย ${c} เข้า ${bk.name}`); syncChrome(); refreshPage(); undoToast(`ย้าย ${n} ข้อเข้า "${bk.name}" แล้ว`); setTimeout(() => openInstitute(id), 150); } });
}
function editBook(id){
  const bk = bookOf(id); if(!bk) return;
  let cover = (S.bookCovers || {})[id] || '';
  const prev = () => `<div class="hb" style="--bk:var(--cf-deep);width:118px;flex:none">${bookFace(bk.name, cover, 'var(--cf-deep)', 'library')}<span class="hb-pages"></span><span class="hb-ribbon"></span></div>`;
  const n = bookQs(id).length;
  openModal(`หนังสือ: ${esc(bk.name)}`, `
    <div class="row" style="gap:14px;align-items:flex-end">
      <div id="bkPrev">${prev()}</div>
      <div style="display:flex;flex-direction:column;gap:8px;flex:1">
        <button class="btn sm ghost" id="bk_rn"><i data-lucide="pencil"></i>เปลี่ยนชื่อ</button>
        <button class="btn sm ghost" id="bk_cv"><i data-lucide="image-plus"></i>เลือกรูปปก</button>
        <button class="btn sm ghost" id="bk_cvdel" ${cover ? '' : 'hidden'}><i data-lucide="trash-2"></i>ใช้ปกสีแทน</button>
        <input type="file" id="bk_file" accept="image/*" hidden>
      </div>
    </div>
    <div style="margin-top:16px;display:flex;flex-direction:column;gap:8px">
      <button class="btn ghost block" id="bk_out" ${n ? '' : 'disabled'}><i data-lucide="log-out"></i>นำข้อสอบออกจากเล่ม (${n} ข้อ กลับไปหนังสือวิชา)</button>
      <button class="btn red block" id="bk_del"><i data-lucide="trash-2"></i>ลบเล่มนี้พร้อมข้อสอบในเล่ม</button>
    </div>`, `<button class="btn ghost" data-close>ปิด</button><button class="btn" id="bk_save"><i data-lucide="save"></i>บันทึกปก</button>`);
  const paint = () => { $('#bkPrev').innerHTML = prev(); $('#bk_cvdel').hidden = !cover; icons($('#bkPrev')); };
  $('#bk_cv').onclick = () => $('#bk_file').click();
  $('#bk_file').onchange = async e => { const f = e.target.files[0]; if(!f) return; const img = await optimizeImage(f, 720, .82); if(img) openImageEditor(img, r => { cover = r; paint(); }); e.target.value = ''; };
  $('#bk_cvdel').onclick = () => { cover = ''; paint(); };
  $('#bk_save').onclick = () => { S.bookCovers = S.bookCovers || {}; cover ? S.bookCovers[id] = cover : delete S.bookCovers[id]; save(); closeModal(); refreshPage(); toast('บันทึกแล้ว', 'ok'); };
  $('#bk_rn').onclick = () => bookNameModal('เปลี่ยนชื่อหนังสือ', bk.name, v => { bk.name = v; save(); refreshPage(); });
  $('#bk_out').onclick = () => { const k = moveToBook(bookQs(id).map(q => q.id), '', `นำข้อสอบออกจาก ${bk.name}`); closeModal(); syncChrome(); refreshPage(); undoToast(`นำ ${k} ข้อออกจากเล่มแล้ว`); };
  $('#bk_del').onclick = async () => {
    if(!(await ask(`ลบ "${bk.name}"?`, `ลบหนังสือและข้อสอบในเล่ม ${n} ข้อ (ย้อนกลับได้)`, 'ลบ'))) return;
    const delQ = withIdx(S.questions, q => q.src === id);
    S.questions = S.questions.filter(q => q.src !== id);
    const bi = S.books.indexOf(bk); S.books.splice(bi, 1);
    pushUndo(`ลบหนังสือ ${bk.name}`, { delQ, delBook: { i: bi, book: bk, cover: S.bookCovers?.[id] } });
    if(S.bookCovers) delete S.bookCovers[id];
    save(); syncChrome(); refreshPage(); undoToast(`ลบ "${bk.name}" แล้ว`);
  };
}
// เลือกหลายข้อในคลังข้อ แล้วย้ายเข้าเล่ม
const SEL = new Set();
function moveSelected(){
  if(!SEL.size) return toast('ยังไม่ได้เลือกข้อ', 'err');
  const opts = [...(S.books || []).map(b => ({ val: b.id, label: b.name })), { val: '__new', label: '+ สร้างหนังสือใหม่' }, { val: '__none', label: 'นำออกจากเล่ม (กลับไปหนังสือวิชา)' }];
  openPicker({ title: `ย้าย ${SEL.size} ข้อไปที่`, options: opts, value: '', onSelect: v => {
    const go2 = id => { const n = moveToBook([...SEL], id, `ย้าย ${SEL.size} ข้อ`); SEL.clear(); QF.sel = false; syncChrome(); refreshPage(); undoToast(`ย้าย ${n} ข้อแล้ว`); };
    if(v === '__new') return setTimeout(() => createBook(go2), 120);
    go2(v === '__none' ? '' : v);
  }});
}
