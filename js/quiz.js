"use strict";
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightMatch(text, term) {
  if (!term || !text) return esc(text);
  try {
    const escaped = escapeRegExp(term);
    const regex = new RegExp(`(${escaped})`, 'gi');
    return esc(text).replace(regex, '<span class="search-highlight">$1</span>');
  } catch(e) {
    return esc(text);
  }
}

function qFiltered(){
  let L = S.questions.slice(); // สำเนา: การเรียงจะไม่ไปสลับลำดับข้อมูลจริง
  if(QF.cat !== 'ทั้งหมด') L = L.filter(q => q.cat === QF.cat);
  if(QF.book) L = L.filter(q => QF.book === '__loose' ? !q.src : q.src === QF.book);
  if(QF.star) L = L.filter(q => q.star);
  if (QF.sort === 'unseen') {
    L = L.filter(q => !(S.qstat[q.id]?.seen > 0));
  } else if (QF.sort === 'wrong') {
    L = L.filter(q => (S.qstat[q.id]?.bad || 0) > 0);
  }
  if(QF.term) {
    const terms = QF.term.split(/\s+/).filter(Boolean);
    L = L.filter(q => {
      const targetStr = (q.q + ' ' + q.c.join(' ') + ' ' + (q.e || '')).toLowerCase();
      return terms.every(term => targetStr.includes(term));
    });
  }

  if (QF.sort === 'new') {
    L.reverse();
  } else if (QF.sort === 'smart') {
    const diffScore = { 'ยาก': 3, 'ปานกลาง': 2, 'ง่าย': 1 };
    L.sort((a, b) => {
      const sa = S.qstat[a.id] || { bad: 0, seen: 0 };
      const sb = S.qstat[b.id] || { bad: 0, seen: 0 };
      const scoreA = ((sa.bad || 0) * 3) + (sa.seen === 0 ? 5 : 0) + (diffScore[a.d] || 0);
      const scoreB = ((sb.bad || 0) * 3) + (sb.seen === 0 ? 5 : 0) + (diffScore[b.d] || 0);
      return scoreB - scoreA;
    });
  } else if (QF.sort === 'order') {
    L.sort((a, b) => (a.idx ?? 0) - (b.idx ?? 0));
  } else if (QF.sort === 'unseen') {
    L.sort((a, b) => ((S.qstat[a.id]?.seen || 0) - (S.qstat[b.id]?.seen || 0)));
  } else if (QF.sort === 'wrong') {
    L.sort((a, b) => ((S.qstat[b.id]?.bad || 0) - (S.qstat[a.id]?.bad || 0)));
  } else if (QF.sort === 'hard') {
    const diffScore = { 'ยาก': 3, 'ปานกลาง': 2, 'ง่าย': 1 };
    L.sort((a, b) => (diffScore[b.d] || 0) - (diffScore[a.d] || 0));
  } else if (QF.sort === 'cat') {
    L.sort((a, b) => (a.cat || '').localeCompare(b.cat || '', 'th'));
  }
  return L;
}

function setQuizFab(){
  const fab = $('#fab'); if(!fab || PAGE !== 'quiz') return; fab.hidden = false;
  fab.innerHTML = QF.book ? '<i data-lucide="plus"></i>เพิ่มข้อ' : '<i data-lucide="book-plus"></i>สร้างหนังสือ'; icons(fab);
  fab.onclick = () => { playTone('tap'); QF.book ? qForm() : createBook(); };
}
function renderQuiz(){
  setQuizFab();
  if(!QF.book || !bookOrLoose(QF.book)){ QF.book = null; return renderShelfTop(); }
  const BK = bookOrLoose(QF.book);
  let L = qFiltered();
  if (QF.cat && QF.batchIdx !== undefined) {
    const BATCH_SIZE = 50;
    const start = QF.batchIdx * BATCH_SIZE;
    L = L.slice(start, start + BATCH_SIZE);
  }
  const off = QF.off || 0, show = L.slice(off, off + QF.limit);    
  const showCategorySection = !QF.term;

  $('#view').innerHTML=`
  <div class="inst-head">
    <button class="ib" id="instBack" title="กลับไปชั้นหนังสือ"><i data-lucide="arrow-left"></i></button>
    <div class="hm-grow"><small>หนังสือ</small><b>${esc(BK.name)}</b></div>
    ${QF.book !== '__loose' ? `<button class="btn ghost sm" id="instManage"><i data-lucide="folder-input"></i>เพิ่มวิชา / ย้ายข้อสอบเข้าเล่ม</button>` : ''}
  </div>
  <div class="search"><i data-lucide="search"></i>
    <input id="qs" placeholder="ค้นหา" value="${esc(QF.term)}">
    ${QF.term?'<button class="ib sm" id="qsClear"><i data-lucide="x"></i></button>':''}
  </div>

  <div class="row" style="margin:14px 0 0;gap:8px;flex-wrap:wrap">
    <div class="chips sc" style="flex:1;min-width:0">
      ${['ทั้งหมด',...bookSubjects(QF.book)].map(c=>`<button class="chip ${QF.cat===c?'on':''}" data-c="${esc(c)}">${esc(c)}</button>`).join('')}
    </div>
    <button class="ib star ${QF.star?'on':''}" id="fStar" title="ติดดาว"><i data-lucide="star"></i></button>
    <button class="c-select" id="btnSort">
      <span>${SORT_LABELS[QF.sort]}</span>
      <i data-lucide="chevron-down"></i>
    </button>
  </div>

      ${showCategorySection ? `
    <div class="sec"><i data-lucide="library"></i>ชั้นหนังสือ<span class="more" style="text-decoration:none;color:var(--muted)">แตะเพื่อเริ่ม · กดค้างเพื่อย้าย</span></div>
    <div class="shelf">
      ${bookSubjects(QF.book).map(c => ({ key: 'c:' + c, c })).map(it => {
        const qs = bookQs(QF.book, it.c);
        const total = qs.length, done = qs.filter(q => (S.qstat[q.id]?.seen || 0) > 0).length;
        const pct = total ? Math.round(done / total * 100) : 0;
        const name = it.b ? it.b.name : it.c;
        const cover = it.b ? (S.bookCovers || {})[it.b.id] : (S.catCovers || {})[it.c];
        const fg = it.b ? 'var(--cf-deep)' : tone(it.c)[1];
        const sub = it.b ? `${new Set(qs.map(q => q.cat)).size} วิชา · ${total.toLocaleString()} ข้อ` : (total ? `${total.toLocaleString()} ข้อ · ${Math.ceil(total / 50)} ชุด` : 'ยังไม่มีข้อสอบ');
        return `<div class="book" data-key="${it.key}" ${it.c ? `data-cat="${esc(it.c)}"` : ''}>
          <button class="hb" ${it.b ? `data-book="${it.b.id}"` : `data-play="${esc(it.c)}"`} style="--bk:${fg}" aria-label="เปิด ${esc(name)}">
            ${bookFace(name, cover, fg, it.b ? 'library' : undefined)}
            <span class="hb-pages"></span><span class="hb-ribbon"></span>
          </button>
          <div class="hb-info">
            <b>${esc(name)}</b>${it.b ? '<span class="hb-tag">สถาบัน</span>' : ''}
            <small>${sub}</small>
            <div class="hb-row"><span class="hb-bar"><i style="width:${pct}%"></i></span><em>${pct}%</em>
              ${it.b ? `<button class="hb-act" data-editbook="${it.b.id}" title="ชื่อ ปก ลบ"><i data-lucide="settings-2"></i></button>`
                : `<button class="hb-act" data-seticon="${esc(it.c)}" title="เปลี่ยนปก สี ไอคอน"><i data-lucide="image"></i></button>
              <button class="hb-act" data-dropcat="${esc(it.c)}" title="ลบ"><i data-lucide="trash-2"></i></button>`}</div>
          </div>
        </div>`;
      }).join('')}
    </div>
  ` : ''}


  <div class="sec"><i data-lucide="list-checks"></i>คลังข้อ<span class="more">${L.length.toLocaleString()} ข้อ</span></div>
  <div class="row" style="gap:8px;margin-bottom:12px;flex-wrap:wrap">
    <button class="btn ghost sm" id="btnBulk"><i data-lucide="clipboard-list"></i>นำเข้าชุด</button>
    <button class="btn ${QF.sel ? '' : 'ghost'} sm" id="btnSelMode"><i data-lucide="list-checks"></i>${QF.sel ? 'เลิกเลือก' : 'เลือกหลายข้อ'}</button>
    <button class="btn ghost sm" id="btnRandom" ${L.length?'':'disabled'}><i data-lucide="shuffle"></i>สุ่มทำ</button>
    ${(QF.cat && QF.cat !== 'ทั้งหมด') ? `
      <button class="btn ghost sm" id="btnFilterBatch" style="border-radius:12px;padding:6px 12px;font-size:12px;font-weight:600;display:flex;align-items:center;gap:6px">
        <i data-lucide="layers" style="width:14px;height:14px;color:var(--blue)"></i>
        <span>${QF.batchIdx !== undefined ? 'ชุด ' + (QF.batchIdx + 1) : 'ชุดทั้งหมด'}</span>
        <i data-lucide="chevron-down" style="width:13px;height:13px;color:var(--muted)"></i>
      </button>
    ` : ''}
  </div>
  <div id="qlist" style="width:100%">
    ${show.length ? show.map((q,i)=>{
      const st=S.qstat[q.id];
      const qImgsJson = JSON.stringify(q.qImgs || []).replace(/"/g, '&quot;');
      const eImgsJson = JSON.stringify(q.eImgs || []).replace(/"/g, '&quot;');
      const cImg = q.cImgs && q.cImgs[q.a];
      const isBoxed = (q.cType === 'box') || (q.c[q.a] && q.c[q.a].includes('\n'));
      const qw = q.qImgW ? `${q.qImgW}px` : '260px';
      const cw = q.cImgW ? `${q.cImgW}px` : '110px';
      const ew = q.eImgW ? `${q.eImgW}px` : '240px';

      const highlightedQ = highlightMatch(q.q, QF.term);
      const highlightedAns = highlightMatch(q.c[q.a], QF.term);

      return `<div class="qrow">
        <div class="qrow-top">
          ${QF.sel ? `<label class="qsel"><input type="checkbox" data-qsel="${q.id}" ${SEL.has(q.id) ? 'checked' : ''}><small>${off+i+1}</small></label>` : `<div class="no">${off+i+1}</div>`}
          <div class="body">
            <div class="qt">${highlightedQ}</div>${(q.qImgs && q.qImgs.length) ? `
              <div class="q-media-box">
                ${q.qImgs.map((img, idx) => `<img src="${img}" class="q-media-img" style="--img-w:${qw}" onclick="openLightboxGallery(${qImgsJson},${idx})">`).join('')}
              </div>` : ''}
            <div class="qans"><div class="ansline">
              ตอบ: ${LB[q.a]}.
              <div style="margin-top:4px">
                ${isBoxed ? `<div class="opt-boxed-text">${highlightedAns}</div>` : `<span class="opt-text">${highlightedAns}</span>`}
              </div>
            </div>
            ${cImg ? `
              <div class="img-grid" style="margin-top:6px">
                <img src="${cImg}" class="img-thumb" style="width:${cw};height:auto;max-height:160px" onclick="openLightboxGallery(['${cImg}'], 0)">
              </div>` : ''}
            ${q.e ? `<div class="qexp"><i data-lucide="lightbulb" class="ico"></i> ${highlightMatch(q.e, QF.term)}</div>` : ''}
            ${(q.eImgs && q.eImgs.length) ? `<div class="q-media-box" style="margin-top:8px">${q.eImgs.map((img, idx) => `<img src="${img}" class="q-media-img" style="--img-w:${ew}" onclick="openLightboxGallery(${eImgsJson},${idx})">`).join('')}</div>` : ''}
            </div>
          </div>
          <div class="side">
            <button class="ib sm star ${q.star?'on':''}" data-star="${q.id}"><i data-lucide="star"></i></button>
            <button class="ib sm" data-edit="${q.id}"><i data-lucide="pencil"></i></button>
            <button class="ib sm" data-drop="${q.id}"><i data-lucide="trash-2"></i></button>
          </div>
        </div>

        <div class="meta" style="margin-top:4px">
          <span class="tag b">${esc(q.cat)}</span><button class="tag qpeek" data-peek>ดูเฉลย</button>
          <span class="tag ${q.d==='ยาก'?'r':q.d==='ปานกลาง'?'o':'g'}">${esc(q.d||'ง่าย')}</span>
          ${st?`<span class="tag">ถูก ${st.ok} · ผิด ${st.bad}</span>`:''}
        </div>
      </div>`;
    }).join('') : `
    <div class="card empty" style="grid-column:1/-1;width:100%;box-sizing:border-box;padding:48px 20px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;margin:0;">                     
        <i data-lucide="search-x" style="width:40px;height:40px;margin-bottom:10px;color:var(--muted)"></i>
        <b style="font-size:16px;display:block;margin-bottom:4px">ไม่พบข้อมูลในการค้นหา</b>
        <small style="color:var(--muted)">ลองเปลี่ยนคำค้นหา หรือตรวจสอบตัวสะกดใหม่อีกครั้ง</small>
      </div>
    `}
  </div>
  ${off ? `<button class="btn ghost block" id="fromTop" style="margin-top:10px"><i data-lucide="chevrons-up"></i>แสดงตั้งแต่ข้อ 1</button>` : ''}
  ${L.length > off + QF.limit && showCategorySection ? `<button class="btn ghost block" id="more" style="margin-top:10px"><i data-lucide="chevron-down"></i>ดูเพิ่ม 25 ข้อ</button>` : ''}`;

  const qs = $('#qs');
  qs.oninput = e => {
    clearTimeout(searchDebounce);
    const val = e.target.value;
    searchDebounce = setTimeout(() => {
      QF.term = val.trim().toLowerCase();
      QF.limit = 25; QF.off = 0;
      renderQuiz();
      const n = $('#qs'); if(n){ n.focus(); n.setSelectionRange(n.value.length, n.value.length); }
    }, 250);
  };

  if($('#qsClear')) $('#qsClear').onclick=()=>{ playTone('tap'); QF.term=''; QF.limit=25; QF.off=0; renderQuiz(); };
  $$('[data-c]').forEach(b=>b.onclick=()=>{ playTone('tap'); QF.cat=b.dataset.c; QF.batchIdx=undefined; QF.limit=25; QF.off=0; renderQuiz(); });
  $('#fStar').onclick=()=>{ playTone('tap'); QF.star=!QF.star; renderQuiz(); };

  $('#btnSort').onclick=()=>{ openPicker({
    title: 'จัดเรียง',
    options: [
      { val: 'new',    label: 'เพิ่มล่าสุด' },
      { val: 'smart',  label: 'แนะนำ' },
      { val: 'order',  label: 'ตามลำดับข้อ' },
      { val: 'unseen', label: 'ยังไม่เคยทำ' },
      { val: 'wrong',  label: 'จุดอ่อน/ผิดบ่อย' },
      { val: 'hard',   label: 'ยากก่อน' }
    ],
    value: QF.sort,
    onSelect: v => { QF.sort = v; renderQuiz(); }
  }); };

  initShelfDrag();
  $('#instBack').onclick = () => { QF.book = null; QF.cat = 'ทั้งหมด'; QF.sel = false; SEL.clear(); renderQuiz(); };
  if($('#instManage')) $('#instManage').onclick = () => openInstitute(QF.book);
  $$('[data-editbook]').forEach(b => b.onclick = () => editBook(b.dataset.editbook));
  $$('[data-play]').forEach(b => {
    b.onclick = () => openBookAnim(b, () => openSetPicker(b.dataset.play, bookQs(QF.book, b.dataset.play), QF.book === '__loose' ? b.dataset.play : `${BK.name} · ${b.dataset.play}`));
  });

  $$('[data-dropcat]').forEach(b => b.onclick = async () => {
    const c = b.dataset.dropcat;
    if(QF.book === '__loose') return deleteCategory(c);
    const n = bookQs(QF.book, c).length;
    if(!(await ask(`นำ "${c}" ออกจากเล่ม?`, `ลบข้อสอบวิชานี้ในเล่ม ${n} ข้อ (ย้อนกลับได้)`, 'ลบ'))) return;
    removeQuestions(q => q.src === QF.book && q.cat === c, `ลบ ${c} ใน ${BK.name}`);
    const bk = bookOf(QF.book); if(bk) bk.cats = bk.cats.filter(x => x !== c);
    save(); syncChrome(); renderQuiz(); undoToast(`ลบ ${c} ออกจากเล่มแล้ว`);
  });

  $$('[data-seticon]').forEach(b => {
    b.onclick = () => {
      playTone('tap');
      openIconPicker(b.dataset.seticon);
    };
  });

  $$('[data-drop]').forEach(b=>b.onclick=async()=>{
    if(await ask('ลบข้อนี้?','ข้อสอบจะถูกลบถาวร','ลบ')){
      removeQuestions(x=>x.id===b.dataset.drop, 'ลบข้อสอบ 1 ข้อ');
      renderQuiz();
      syncChrome();
      undoToast('ลบข้อสอบแล้ว');
    }
  });

  $$('[data-star]').forEach(b=>b.onclick=()=>{
    playTone('tap');
    const q=S.questions.find(x=>x.id===b.dataset.star); q.star=!q.star; save();
    b.classList.toggle('on',q.star); toast(q.star?'ติดดาวแล้ว':'ปลดดาวแล้ว');
  });

  $$('[data-edit]').forEach(b=>b.onclick=()=>qForm(S.questions.find(x=>x.id===b.dataset.edit)));

  if($('#fromTop')) $('#fromTop').onclick = () => { QF.off = 0; QF.limit = 25; renderQuiz(); };
  if($('#more'))$('#more').onclick=()=>{ playTone('tap'); QF.limit+=25; renderQuiz(); };
  $('#btnBulk').onclick=()=>{ playTone('tap'); bulkForm(); };
  $('#btnSelMode').onclick = () => { QF.sel = !QF.sel; QF.off = 0; QF.limit = 25; SEL.clear(); renderQuiz(); };
  $$('[data-peek]').forEach(b => b.onclick = () => { const r = b.closest('.qrow'); r.classList.toggle('open'); b.textContent = r.classList.contains('open') ? 'ซ่อนเฉลย' : 'ดูเฉลย'; });
  $$('[data-qsel]').forEach(c => c.onchange = () => { c.checked ? SEL.add(c.dataset.qsel) : SEL.delete(c.dataset.qsel); paintSelBar(); });
  paintSelBar();
  function paintSelBar(){
    let bar = $('#selBar');
    if(!QF.sel){ if(bar) bar.remove(); return; }
    if(!bar){ bar = document.createElement('div'); bar.id = 'selBar'; bar.className = 'sel-bar'; document.body.appendChild(bar); }
    bar.innerHTML = `<b>เลือก ${SEL.size} ข้อ</b><button class="btn ghost sm" id="selRange"><i data-lucide="hash"></i>เลือกช่วงข้อ</button><button class="btn ghost sm" id="selAll">ทั้งหมด ${L.length}</button><button class="btn sm" id="selMove"><i data-lucide="folder-input"></i>ย้ายไปเล่ม</button>`;
    icons(bar);
    $('#selAll').onclick = () => { L.forEach(q => SEL.add(q.id)); $$('[data-qsel]').forEach(c => c.checked = true); paintSelBar(); };
    $('#selMove').onclick = moveSelected;
    $('#selRange').onclick = () => {
      openModal('เลือกช่วงข้อ', `<div style="font-size:13px;color:var(--muted);margin-bottom:10px">เลขข้อตามรายการ${QF.cat && QF.cat !== 'ทั้งหมด' ? ' วิชา ' + esc(QF.cat) : ''} (1–${L.length}) · เลือกวิชาจากแถบด้านบนก่อน เลขจะได้ตรงกับหนังสือ</div>
        <div class="row" style="gap:8px;align-items:center"><input class="inp" id="rg_a" type="number" inputmode="numeric" min="1" max="${L.length}" placeholder="จากข้อ"><span>ถึง</span><input class="inp" id="rg_b" type="number" inputmode="numeric" min="1" max="${L.length}" placeholder="ถึงข้อ"></div>`,
        `<button class="btn ghost" data-close>ยกเลิก</button><button class="btn" id="rg_ok"><i data-lucide="check"></i>เลือก</button>`, { focus: '#rg_a' });
      $('#rg_ok').onclick = () => {
        let a = parseInt($('#rg_a').value), b = parseInt($('#rg_b').value || $('#rg_a').value);
        if(!a || !b) return toast('ใส่เลขข้อ', 'err');
        if(a > b) [a, b] = [b, a];
        a = clamp(a, 1, L.length); b = clamp(b, 1, L.length);
        SEL.clear(); L.slice(a - 1, b).forEach(q => SEL.add(q.id)); closeModal();
        QF.off = a - 1; QF.limit = Math.max(25, b - a + 1); renderQuiz();
        requestAnimationFrame(() => { const r = $('#qlist .qrow'); r && r.scrollIntoView({ block: 'start' }); });
        toast(`เลือกข้อ ${a}–${b} (${b - a + 1} ข้อ)`, 'ok');
      };
    };
  }
  if($('#btnRandom'))$('#btnRandom').onclick=()=>{
    playTone('tap');
    randomPick(L.map(q => q.id), QF.cat === 'ทั้งหมด' ? (bookOf(QF.book)?.name || 'ทุกหมวด') : QF.cat);
  };

  const btnFB = $('#btnFilterBatch');
  if (btnFB) {
    btnFB.onclick = () => {
      const catQs = S.questions.filter(q => q.cat === QF.cat);
      const BATCH_SIZE = 50;
      const totalBatches = Math.ceil(catQs.length / BATCH_SIZE);

      const itemsHtml = `
        <div style="display:flex;flex-direction:column;gap:8px;max-height:360px;overflow-y:auto;padding:2px">
          <button class="picker-item" data-bidx="all" style="justify-content:space-between;padding:12px 14px;border-radius:14px;margin:0;background:${QF.batchIdx === undefined ? 'rgba(37,99,235,0.08)' : 'var(--surface)'};border:1px solid ${QF.batchIdx === undefined ? 'var(--blue)' : 'var(--line)'}">
            <b style="font-size:13.5px;color:var(--text)">แสดงทุกชุด (${catQs.length} ข้อ)</b>
            ${QF.batchIdx === undefined ? '<i data-lucide="check" style="width:16px;height:16px;color:var(--blue)"></i>' : ''}
          </button>
          ${Array.from({ length: totalBatches }).map((_, idx) => {
            const startNo = idx * BATCH_SIZE + 1;
            const endNo = Math.min((idx + 1) * BATCH_SIZE, catQs.length);
            const active = QF.batchIdx === idx;
            return `
              <button class="picker-item" data-bidx="${idx}" style="justify-content:space-between;padding:12px 14px;border-radius:14px;margin:0;background:${active ? 'rgba(37,99,235,0.08)' : 'var(--surface)'};border:1px solid ${active ? 'var(--blue)' : 'var(--line)'}">
                <div style="display:flex;flex-direction:column;align-items:flex-start;gap:2px">
                  <b style="font-size:13.5px;color:var(--text)">ชุดที่ ${idx + 1}</b>
                  <small style="color:var(--muted);font-size:11px">ข้อ ${startNo}–${endNo} (${endNo - startNo + 1} ข้อ)</small>
                </div>
                ${active ? '<i data-lucide="check" style="width:16px;height:16px;color:var(--blue)"></i>' : ''}
              </button>
            `;
          }).join('')}
        </div>
      `;

      openModal(`เลือกชุด: ${esc(QF.cat)}`, itemsHtml, `<button class="btn ghost block" data-close style="border-radius:14px">ปิด</button>`);

      $$('[data-bidx]').forEach(b => {
        b.onclick = () => {
          const val = b.dataset.bidx;
          QF.batchIdx = val === 'all' ? undefined : +val;
          closeModal();
          renderQuiz();
        };
      });
    };
  }

  icons();
}

function qForm(q, onSavedCallback = null){
  const d = q || {
    q:'', c:['','','',''], cImgs:['','','',''], cExps:['','','',''], a:0,
    cat: QF.cat!=='ทั้งหมด'?QF.cat:S.cats[0], d:'ง่าย', e:'',
    qImgs:[], eImgs:[], cType:'vertical',
    qImgW: 260, cImgW: 110, eImgW: 240
  };

  let selectedCat = d.cat;
  let ans = d.a;
  let cType = (d.cType === 'box') ? 'box' : (d.cType === 'horizontal') ? 'horizontal' : 'vertical';
  let curQImgs = Array.isArray(d.qImgs) ? [...d.qImgs] : [];
  let curEImgs = Array.isArray(d.eImgs) ? [...d.eImgs] : [];
  let curCImgs = Array.isArray(d.cImgs) ? [...d.cImgs] : ['', '', '', ''];
  let curCExps = Array.isArray(d.cExps) ? [...d.cExps] : ['', '', '', ''];
  let curQW = d.qImgW || 260;
  let curCW = d.cImgW || 110;
  let curEW = d.eImgW || 240;

  function paintUploadPreviews(){
    const qPrev = $('#q_img_preview');
    const ePrev = $('#e_img_preview');
    if(qPrev){
      qPrev.innerHTML = curQImgs.map((src, i) => `
        <div class="img-preview-box">
          <img src="${src}" class="img-thumb" data-view-qi="${i}">
          <button type="button" class="del-btn" data-delqi="${i}">×</button>
        </div>`).join('');
      $$('[data-view-qi]', qPrev).forEach(img => {
        img.onclick = () => openLightboxGallery(curQImgs, +img.dataset.viewQi);
      });
      $$('[data-delqi]', qPrev).forEach(b => {
        b.onclick = () => { curQImgs.splice(+b.dataset.delqi, 1); paintUploadPreviews(); };
      });
    }

    if(ePrev){
      ePrev.innerHTML = curEImgs.map((src, i) => `
        <div class="img-preview-box">
          <img src="${src}" class="img-thumb" data-view-ei="${i}">
          <button type="button" class="del-btn" data-delei="${i}">×</button>
        </div>`).join('');
      $$('[data-view-ei]', ePrev).forEach(img => {
        img.onclick = () => openLightboxGallery(curEImgs, +img.dataset.viewEi);
      });
      $$('[data-delei]', ePrev).forEach(b => {
        b.onclick = () => { curEImgs.splice(+b.dataset.delei, 1); paintUploadPreviews(); };
      });
    }

    [0,1,2,3].forEach(i => {
      const cBox = $('#c_img_box_'+i);
      if(!cBox) return;
      if(curCImgs[i]){
        cBox.innerHTML = `
          <div class="img-preview-box">
            <img src="${curCImgs[i]}" class="img-thumb" style="width:70px;height:70px" data-view-ci="${i}">
            <button type="button" class="del-btn" data-delci="${i}">×</button>
          </div>
        `;
        const cImgEl = cBox.querySelector('[data-view-ci]');
        if(cImgEl) cImgEl.onclick = () => openLightboxGallery([curCImgs[i]], 0);
        cBox.querySelector('[data-delci]').onclick = () => { curCImgs[i] = ''; paintUploadPreviews(); };
      } else {
        cBox.innerHTML = '';
      }
    });
  }

  openModal(q ? 'แก้ไขข้อสอบ' : 'เพิ่มข้อสอบ', `
    <div class="field">
      <label>คำถาม *</label>
      <textarea class="inp" id="f_q" placeholder="พิมพ์คำถาม">${esc(d.q)}</textarea>
      <div class="row" style="margin-top:8px;justify-content:space-between;flex-wrap:wrap;gap:8px">
        <div class="row" style="gap:6px">
          <button type="button" class="btn sm ghost" id="btnAddQImg"><i data-lucide="image-plus"></i>แนบรูปโจทย์</button>
          <button type="button" class="btn sm ghost" onclick="openRichTextEditor('f_q')"><i data-lucide="type"></i>จัดฟอนต์</button>
        </div>
        <div class="row" style="gap:6px">
          <small style="color:var(--muted)">ขนาดรูปโจทย์:</small>
          <input type="range" id="f_qw" min="100" max="600" step="10" value="${curQW}" style="width:100px">
          <small id="txt_qw" style="min-width:36px;font-weight:600">${curQW}px</small>
        </div>
        <input type="file" id="inp_qimg" accept="image/*" hidden>
      </div>
      <div class="img-grid" id="q_img_preview"></div>
    </div>

    <div class="field">
      <label>การจัดวางตัวเลือก</label>
      <div class="chips" id="f_ctype">
        <button type="button" class="chip ${cType==='vertical'?'on':''}" data-ct="vertical">แนวตั้ง</button>
        <button type="button" class="chip ${cType==='horizontal'?'on':''}" data-ct="horizontal">แนวนอน</button>
        <button type="button" class="chip ${cType==='box'?'on':''}" data-ct="box">กล่องข้อความ</button>
      </div>
    </div>

    <div class="field" style="display:flex;align-items:center;justify-content:space-between;background:var(--surface2);padding:10px 12px;border-radius:12px">
      <div>
        <label style="margin:0;font-weight:600">ขนาดรูปชอยส์</label>
        <small style="color:var(--muted)">ปรับพร้อมกัน ก-ง</small>
      </div>
      <div class="row" style="gap:6px">
        <input type="range" id="f_cw" min="60" max="350" step="10" value="${curCW}" style="width:110px">
        <small id="txt_cw" style="min-width:36px;font-weight:600">${curCW}px</small>
      </div>
    </div>

    ${[0,1,2,3].map(i=>`
      <div class="field" style="background:var(--surface2);padding:14px;border-radius:16px;margin-bottom:14px">
        <div class="row" style="justify-content:space-between;margin-bottom:8px">
          <label style="margin:0;font-weight:700">ตัวเลือก ${LB[i]} *</label>
          <div class="row" style="gap:6px">
            <button type="button" class="btn sm ghost" onclick="openRichTextEditor('f_c${i}')" style="padding:4px 9px;font-size:12px">
              <i data-lucide="type"></i>จัดฟอนต์
            </button>
            <button type="button" class="btn sm ghost" data-addcimg="${i}" style="padding:4px 9px;font-size:12px">
              <i data-lucide="image-plus"></i>แนบรูป
            </button>
          </div>
          <input type="file" id="inp_cimg_${i}" accept="image/*" hidden>
        </div>
        <textarea class="inp" id="f_c${i}" placeholder="ข้อความ ${LB[i]}" style="background:var(--surface);min-height:75px">${esc(d.c[i])}</textarea>
        <div id="c_img_box_${i}" style="margin-top:6px"></div>
        <div style="margin-top:10px">
          <div class="row" style="justify-content:space-between;margin-bottom:5px">
            <label style="margin:0;font-size:12.5px;color:var(--muted)">เหตุผลข้อ ${LB[i]} (ทำไมถูก/ผิด)</label>
            <button type="button" class="btn sm ghost" onclick="openRichTextEditor('f_cexp${i}')" style="padding:2px 8px;font-size:11.5px">
              <i data-lucide="type"></i>จัดฟอนต์
            </button>
          </div>
          <textarea class="inp" id="f_cexp${i}" placeholder="พิมพ์เหตุผลหลายบรรทัดได้..." style="background:var(--surface);min-height:70px">${esc(curCExps[i])}</textarea>
        </div>
      </div>`).join('')}

    <div class="field"><label>คำตอบที่ถูก *</label>
      <div class="chips" id="f_a">${[0,1,2,3].map(i=>`<button type="button" class="chip ${d.a===i?'on':''}" data-a="${i}" style="min-width:52px;justify-content:center">${LB[i]}</button>`).join('')}</div>
    </div>
    
    <div class="field">
      <label>หมวดหมู่ *</label>
      <div class="chips" id="f_cats">
        ${S.cats.map(c=>`<button type="button" class="chip ${selectedCat===c?'on':''}" data-cat="${esc(c)}">${esc(c)}</button>`).join('')}
      </div>
    </div>

    <div class="field">
      <label>เฉลยรวม / อธิบายภาพรวม</label>
      <textarea class="inp" id="f_e" placeholder="คำอธิบายเพิ่มเติม...">${esc(d.e)}</textarea>
      <div class="row" style="margin-top:8px;justify-content:space-between;flex-wrap:wrap;gap:8px">
        <div class="row" style="gap:6px">
          <button type="button" class="btn sm ghost" id="btnAddEImg"><i data-lucide="image-plus"></i>แนบรูปเฉลย</button>
          <button type="button" class="btn sm ghost" onclick="openRichTextEditor('f_e')"><i data-lucide="type"></i>จัดฟอนต์</button>
        </div>
        <div class="row" style="gap:6px">
          <small style="color:var(--muted)">ขนาดรูปเฉลย:</small>
          <input type="range" id="f_ew" min="100" max="600" step="10" value="${curEW}" style="width:110px">
          <small id="txt_ew" style="min-width:36px;font-weight:600">${curEW}px</small>
        </div>
        <input type="file" id="inp_eimg" accept="image/*" hidden>
      </div>
      <div class="img-grid" id="e_img_preview"></div>
    </div>`,
    `<button class="btn ghost" data-close>ยกเลิก</button><button class="btn" id="f_save"><i data-lucide="save"></i>บันทึก</button>`,
    {focus:'#f_q'});

  paintUploadPreviews();
  icons($('#modal'));

  $('#f_qw').oninput = e => { curQW = +e.target.value; $('#txt_qw').textContent = curQW + 'px'; };
  $('#f_cw').oninput = e => { curCW = +e.target.value; $('#txt_cw').textContent = curCW + 'px'; };
  $('#f_ew').oninput = e => { curEW = +e.target.value; $('#txt_ew').textContent = curEW + 'px'; };

   $$('#f_ctype .chip').forEach(b => {
    b.onclick = () => {
      playTone('tap');
      cType = b.dataset.ct;
      $$('#f_ctype .chip').forEach(x => x.classList.toggle('on', x === b));
    };
  });

  $('#btnAddQImg').onclick = () => $('#inp_qimg').click();
  $('#inp_qimg').onchange = async e => {
    const file = e.target.files[0];
    if(!file) return;
    const optImg = await optimizeImage(file, 1024, 0.80);
    openImageEditor(optImg, (finalImg) => {
      curQImgs.push(finalImg);
      paintUploadPreviews();
    });
    e.target.value = '';
  };

  $('#btnAddEImg').onclick = () => $('#inp_eimg').click();
  $('#inp_eimg').onchange = async e => {
    const file = e.target.files[0];
    if(!file) return;
    const optImg = await optimizeImage(file, 1024, 0.80);
    openImageEditor(optImg, (finalImg) => {
      curEImgs.push(finalImg);
      paintUploadPreviews();
    });
    e.target.value = '';
  };

  [0,1,2,3].forEach(i => {
    $(`[data-addcimg="${i}"]`).onclick = () => $(`#inp_cimg_${i}`).click();
    $(`#inp_cimg_${i}`).onchange = async e => {
      const file = e.target.files[0];
      if(!file) return;
      const optImg = await optimizeImage(file, 800, 0.80);
      openImageEditor(optImg, (finalImg) => {
        curCImgs[i] = finalImg;
        paintUploadPreviews();
      });
      e.target.value = '';
    };
  });

  $$('#f_a .chip').forEach(b=>b.onclick=()=>{     playTone('tap'); ans=+b.dataset.a;     $$
('#f_a .chip').forEach(x=>x.classList.toggle('on',x===b));
  });

  $$('#f_cats .chip').forEach(b=>b.onclick=()=>{     playTone('tap'); selectedCat=b.dataset.cat;     $$
('#f_cats .chip').forEach(x=>x.classList.toggle('on',x===b));
  });

  $('#f_save').onclick=()=>{
    const qText = $('#f_q').value.trim();
    const cOpts = [0,1,2,3].map(i=>$('#f_c'+i).value.trim());
    const cExps = [0,1,2,3].map(i=>$('#f_cexp'+i).value.trim());
    const exp = $('#f_e').value.trim();

    if(!qText) return toast('ใส่คำถามก่อน','err');
    if(cOpts.some((x, i) => !x && !curCImgs[i])) return toast('ใส่ชอยส์หรือรูปให้ครบ 4 ข้อ','err');

    playTone('tap');
    closeModal();

    setTimeout(()=>{
      const o = { 
        q: qText, 
        c: cOpts, 
        cImgs: curCImgs,
        cExps: cExps,
        a: ans, 
        cat: selectedCat, 
        d: q ? (q.d || 'ง่าย') : 'ง่าย',
        e: exp, 
        qImgs: curQImgs, 
        eImgs: curEImgs,
        cType,
        qImgW: curQW,
        cImgW: curCW,
        eImgW: curEW
      };
      sanitizeQuestion(o);
      if(q) Object.assign(q, o); 
      else S.questions.push(tagNewForBook({id: uid(), star: false, ...o}));
      
      save();
      if(onSavedCallback) onSavedCallback();
      if(PAGE==='quiz') renderQuiz();
      syncChrome();
      toast(q ? 'แก้ไขแล้ว' : 'เพิ่มแล้ว', 'ok');
    }, 40);
  };
}

function bulkForm(){
  openModal('นำเข้าหลายข้อ',`
    <div class="field"><label>คำถาม | ก | ข | ค | ง | เฉลย(1-4) | หมวด | อธิบาย</label>
      <textarea class="inp" id="bk" style="min-height:220px;font-size:13px"
        placeholder="ข้อใดเป็นโทษทางอาญา | ปรับ | กักขัง | ริบทรัพย์สิน | ถูกทุกข้อ | 4 | กฎหมาย | อ้างอิงมาตรา 18"></textarea></div>`,
    `<button class="btn ghost" data-close>ยกเลิก</button><button class="btn" id="bkGo"><i data-lucide="download"></i>นำเข้า</button>`,{focus:'#bk'});

  $('#bkGo').onclick=()=>{
    playTone('tap');
    const lines=$('#bk').value.split('\n').map(x=>x.trim()).filter(Boolean);
    let n=0,skip=0; const added=[], newCats=[];
    lines.forEach(ln=>{
      const p=ln.split('|').map(x=>x.trim());
      if(p.length<6){skip++;return;}
      const a=parseInt(p[5],10);
      if(!(a>=1&&a<=4)||!p[0]||p.slice(1,5).some(x=>!x)){skip++;return;}

      const formattedQ = p[0].replace(/\\n/g, '\n').replace(/<br\s*\/?>/gi, '\n');
      const formattedChoices = p.slice(1,5).map(c => c.replace(/\\n/g, '\n').replace(/<br\s*\/?>/gi, '\n'));
      const formattedExp = (p[7]||'').replace(/\\n/g, '\n').replace(/<br\s*\/?>/gi, '\n');

      let cat=(p[6]||S.cats[0]).replace(/[<>"'`]/g,'');
      if(!S.cats.includes(cat)){S.cats.push(cat);newCats.push(cat);}
      const nid=uid(); added.push(nid);
      S.questions.push(tagNewForBook(sanitizeQuestion({
        id: nid,
        star: false,
        q: formattedQ,
        c: formattedChoices,
        cImgs: ['','','',''],
        cExps: ['','','',''],
        a: a-1,
        cat,
        d: 'ง่าย',
        e: formattedExp,
        qImgs: [],
        eImgs: [],
        cType: 'vertical'
      })));
      n++;
    });
    if(n) pushUndo(`นำเข้า ${n} ข้อ`, { addQ: added, addCats: newCats });
    save();closeModal();renderQuiz();syncChrome();
    n?undoToast(`นำเข้า ${n} ข้อแล้ว${skip?` (ข้าม ${skip} บรรทัดที่รูปแบบผิด)`:''}`):toast('รูปแบบไม่ถูกต้อง','err');
  };
}

let CFF={cat:'ทั้งหมด',mode:'due',i:0,flip:false,list:'card'};
function cPool(){
  let L=S.cards.filter(c=>CFF.cat==='ทั้งหมด'||c.cat===CFF.cat);
  if(CFF.mode==='due')  L=L.filter(c=>(c.due||0)<=Date.now());
  if(CFF.mode==='hard') L=L.filter(c=>(c.box||0)<=1);
  return L;
}

function bulkCardForm(){
  openModal('นำเข้าบัตร', `
    <div class="field">
      <label>ด้านหน้า | ด้านหลัง | หมวด</label>
      <textarea class="inp" id="bkc" style="min-height:190px;font-size:13px"
        placeholder="พ.ร.บ.ตำรวจแห่งชาติ | พ.ศ. 2565 | กฎหมาย"></textarea>
    </div>`,
    `<button class="btn ghost" data-close>ยกเลิก</button><button class="btn" id="bkcGo"><i data-lucide="download"></i>นำเข้า</button>`,
    {focus:'#bkc'});

  $('#bkcGo').onclick = () => {
    playTone('tap');
    const lines = $('#bkc').value.split('\n').map(x => x.trim()).filter(Boolean);
    let n = 0, skip = 0; const added = [], newCats = [];
    lines.forEach(ln => {
      const p = ln.split('|').map(x => x.trim());
      if(p.length < 2 || !p[0] || !p[1]){ skip++; return; }
      let cat = (p[2] || S.cats[0]).replace(/[<>"'`]/g,'');
      if(!S.cats.includes(cat)){ S.cats.push(cat); newCats.push(cat); }
      const nid = uid(); added.push(nid);
      S.cards.unshift(sanitizeCard({ id: nid, f: p[0], b: p[1], fImg: '', bImg: '', fPos: 'bottom', bPos: 'bottom', cat, box: 0, due: 0 }));
      n++;
    });
    if(n) pushUndo(`นำเข้าบัตร ${n} ใบ`, { addC: added, addCats: newCats });
    save(); closeModal(); renderCards(); syncChrome();
    n ? undoToast(`นำเข้า ${n} ใบแล้ว${skip?` (ข้าม ${skip} บรรทัด)`:''}`) : toast('รูปแบบไม่ถูกต้อง', 'err');
  };
}
