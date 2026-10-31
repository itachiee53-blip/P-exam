"use strict";
// ===== หน้า "ภาษาอังกฤษ" (เรียนตามเลเวล อยู่ใน english.js) =====
// S.cards = คำที่เรียนแล้ว ใช้ทวนตามรอบวัน (บททวนอัตโนมัติ)
const VC_GAP = [0, 1, 3, 7, 14, 30]; // วันก่อนทวนรอบถัดไป ตามระดับความจำ 0–5
const vcText = s => String(s || '').replace(/<[^>]+>/g, ' ').trim();
const vcDueCount = () => S.cards.filter(c => c.seen && (c.due || 0) <= Date.now()).length;
// เปลี่ยนเป็นเรียนตามเลเวล: ลบคำชุดเริ่มต้นที่ยังไม่เคยเรียน (ครั้งเดียว)
function ensureVocab(){
  if((S.settings.vocabV || 0) >= 2) return;
  S.cards = S.cards.filter(c => c.seen); S.decks = []; S.settings.vocabV = 2; save();
}
function renderCards(){
  ensureVocab();
  const fab = $('#fab'); if(fab) fab.hidden = true;
  if(LS) return renderLesson();
  if(ENG_TAB === 'stats') return renderEngStats();
  ENG_LV === null ? renderEngLevels() : renderEngPath(ENG_LV);
}

let CFG={cats:[],count:20,minutes:30,mode:'exam',onlyStar:false,diff:''};
const poolOf=(cats,onlyStar,diff)=>S.questions.filter(q=>(!cats.length||cats.includes(q.cat))&&(!onlyStar||q.star)&&(!diff||q.d===diff));

// เลือกสายสอบ (ค่าเดียวทั้งแอป)
function pickTrack(after){
  const opts = Object.keys(S.tracks).map(k => { const t = getTrack(k); return { val: k, label: t.label.replace(/ปราบปราม\s*นสต\.?\s*/, 'ปป.').replace(/\b25(\d\d)\b/, '$1') }; });
  opts.push({ val: '__edit', label: 'แก้เกณฑ์' });
  openPicker({ title: 'เลือกสายสอบ', options: opts, value: curTrackKey(), onSelect: v => {
    if(v === '__edit') return setTimeout(() => openTrackEditor(curTrackKey()), 80);
    S.settings.track = v; save(); syncChrome(); after && after();
    toast(`เลือกสาย${getTrack(v).label}แล้ว`, 'ok');
  }});
}

// ตัวแก้เกณฑ์สาย: ชื่อ ปี เกณฑ์ผ่าน เวลา จำนวนข้อแต่ละวิชา และวิชาในแต่ละภาค
function openTrackEditor(key){
  const t = clone(S.tracks[key] || DEFAULT_TRACKS.admin);
  t.parts = (t.parts && t.parts.length) ? t.parts : [{ name: 'ภาค 1', cats: [] }, { name: 'ภาค 2', cats: [] }];
  // แสดงเฉพาะวิชาในเกณฑ์ (ลำดับแถว = ลำดับวิชาในข้อสอบจริง) · วิชาอื่นเพิ่มจากช่องด้านล่าง
  const qk = Object.keys(t.quota || {});
  const subjects = qk.length ? qk : S.cats.slice();
  const partOf = c => t.parts.findIndex(pt => pt.cats.includes(c));
  const body = `
    <div class="tre">
      <div class="grid g2" style="gap:10px">
        <div class="field"><label>ชื่อสาย</label><input class="inp" id="tr_name" value="${esc(t.name)}"></div>
        <div class="field"><label>ปี / รุ่น</label><input class="inp" id="tr_year" value="${esc(t.year || '')}" placeholder="เช่น 2570"></div>
      </div>
      <div class="field"><label>เกณฑ์ผ่าน</label>
        <div class="chips" id="tr_rule">
          <button type="button" class="chip ${t.rule==='parts'?'on':''}" data-rule="parts">ต้องผ่านทุกภาค</button>
          <button type="button" class="chip ${t.rule!=='parts'?'on':''}" data-rule="total">ดูคะแนนรวม</button>
        </div>
      </div>
      <div class="grid g2" style="gap:10px">
        <div class="field"><label>คะแนนผ่าน (%)</label><input class="inp" id="tr_pass" type="number" min="1" max="100" value="${t.passPct}"></div>
        <div class="field"><label>เวลาสอบ (นาที)</label><input class="inp" id="tr_min" type="number" min="0" value="${t.minutes || 0}"></div>
      </div>
      <div class="tr-parts" ${t.rule==='parts'?'':'hidden'}>
        <div class="grid g2" style="gap:10px">
          ${t.parts.map((pt, i) => `<div class="field"><label>ชื่อภาค ${i+1}</label><input class="inp" data-pname="${i}" value="${esc(pt.name)}"></div>`).join('')}
        </div>
      </div>
      <label class="tr-lbl">จำนวนข้อแต่ละวิชา <span id="tr_total"></span></label>
      <div class="tr-rows">
        ${subjects.map(c => `<div class="tr-row" data-sub="${esc(c)}">
          <div class="hm-grow"><b>${esc(c)}</b>${S.cats.includes(c) ? '' : '<small class="tag o">ยังไม่มีหมวดนี้</small>'}</div>
          <select class="inp tr-part" ${t.rule==='parts'?'':'hidden'}>
            <option value="-1">ไม่นับภาค</option>
            ${t.parts.map((pt, i) => `<option value="${i}" ${partOf(c)===i?'selected':''}>ภาค ${i+1}</option>`).join('')}
          </select>
          <input class="inp tr-n" type="number" min="0" value="${(t.quota || {})[c] || 0}">
          <button type="button" class="tr-ic" data-trup title="เลื่อนขึ้น"><i data-lucide="chevron-up"></i></button>
          <button type="button" class="tr-ic" data-trdel title="ลบวิชา"><i data-lucide="x"></i></button>
        </div>`).join('')}
      </div>
      <div class="row" style="gap:8px;margin-top:10px">
        <input class="inp" id="tr_newsub" list="tr_cats" placeholder="เพิ่มวิชา เช่น สังคม" style="flex:1">
        <datalist id="tr_cats">${S.cats.filter(c => !subjects.includes(c)).map(c => `<option value="${esc(c)}">`).join('')}</datalist>
        <button class="btn ghost sm" id="tr_addsub"><i data-lucide="plus"></i>เพิ่ม</button>
      </div>
      <div class="row" style="gap:8px;margin-top:16px;flex-wrap:wrap">
        <button class="btn ghost sm" id="tr_copy"><i data-lucide="copy"></i>ทำสำเนาเป็นปีใหม่</button>
        ${DEFAULT_TRACKS[key] ? `<button class="btn ghost sm" id="tr_reset"><i data-lucide="rotate-ccw"></i>คืนค่าเริ่มต้น</button>` : ''}
        ${Object.keys(S.tracks).length > 1 ? `<button class="btn ghost sm" id="tr_del" style="color:var(--red)"><i data-lucide="trash-2"></i>ลบสายนี้</button>` : ''}
      </div>
    </div>`;
  openModal(`แก้เกณฑ์: ${esc(getTrack(key).label)}`, body, `<button class="btn ghost" data-close>ยกเลิก</button><button class="btn" id="tr_save"><i data-lucide="save"></i>บันทึก</button>`);
  const m = $('#modal');
  const total = () => { $('#tr_total').textContent = `· รวม ${$$('.tr-n', m).reduce((a, i) => a + (+i.value || 0), 0)} ข้อ`; };
  total(); m.addEventListener('input', e => { if(e.target.classList.contains('tr-n')) total(); });
  $$('[data-rule]', m).forEach(b => b.onclick = () => {
    t.rule = b.dataset.rule;
    $$('[data-rule]', m).forEach(x => x.classList.toggle('on', x === b));
    $('.tr-parts', m).hidden = t.rule !== 'parts';
    $$('.tr-part', m).forEach(x => x.hidden = t.rule !== 'parts');
  });
  m.addEventListener('click', e => {
    const r = e.target.closest('.tr-row'); if(!r) return;
    if(e.target.closest('[data-trdel]')){ if($$('.tr-row', m).length < 2) return toast('ต้องมีอย่างน้อย 1 วิชา', 'err'); r.remove(); total(); }
    else if(e.target.closest('[data-trup]') && r.previousElementSibling) r.parentNode.insertBefore(r, r.previousElementSibling);
  });
  $('#tr_addsub').onclick = () => {
    const v = $('#tr_newsub').value.trim();
    if(!v || $$('.tr-row', m).some(r => r.dataset.sub === v)) return toast(v ? 'มีวิชานี้แล้ว' : 'พิมพ์ชื่อวิชาก่อน', 'err');
    const row = $$('.tr-row', m)[0].cloneNode(true);
    row.dataset.sub = v;
    row.querySelector('b').textContent = v;
    const sm = row.querySelector('small'); if(sm) sm.remove();
    row.querySelector('.hm-grow').insertAdjacentHTML('beforeend', S.cats.includes(v) ? '' : '<small class="tag o">ยังไม่มีหมวดนี้</small>');
    row.querySelector('.tr-n').value = 0; row.querySelector('.tr-part').value = '-1';
    $('.tr-rows', m).appendChild(row); $('#tr_newsub').value = ''; total();
  };
  const collect = () => {
    const out = { ...t, name: $('#tr_name').value.trim() || t.name, year: $('#tr_year').value.trim(),
      passPct: clamp(+$('#tr_pass').value || 60, 1, 100), minutes: Math.max(0, +$('#tr_min').value || 0), quota: {} };
    out.parts = t.parts.map((pt, i) => ({ name: ($(`[data-pname="${i}"]`, m).value || '').trim() || `ภาค ${i+1}`, cats: [] }));
    $$('.tr-row', m).forEach(r => {
      const n = +r.querySelector('.tr-n').value || 0, c = r.dataset.sub, pi = +r.querySelector('.tr-part').value;
      if(n > 0) out.quota[c] = n;
      if(pi >= 0) out.parts[pi].cats.push(c);
    });
    if(out.rule !== 'parts') out.parts = [];
    return out;
  };
  $('#tr_save').onclick = () => { S.tracks[key] = collect(); save(); closeModal(); syncChrome(); refreshPage(); toast('บันทึกเกณฑ์แล้ว', 'ok'); };
  $('#tr_copy').onclick = () => {
    const nk = 't' + uid(), c = collect();
    c.year = c.year && /^\d+$/.test(c.year) ? String(+c.year + 1) : (c.year ? c.year + ' (ใหม่)' : 'ใหม่');
    S.tracks[nk] = c; S.settings.track = nk; save(); closeModal(); syncChrome(); refreshPage();
    toast(`สร้างสาย${getTrack(nk).label}แล้ว แก้จำนวนข้อได้เลย`, 'ok');
    setTimeout(() => openTrackEditor(nk), 300);
  };
  if($('#tr_reset')) $('#tr_reset').onclick = () => { S.tracks[key] = clone(DEFAULT_TRACKS[key]); save(); closeModal(); refreshPage(); toast('คืนค่าเริ่มต้นแล้ว', 'ok'); };
  if($('#tr_del')) $('#tr_del').onclick = async () => {
    const lb = getTrack(key).label;
    if(!(await ask('ลบสายนี้?', `ลบสาย ${lb} (ผลสอบเก่ายังอยู่)`, 'ลบ'))) return;
    delete S.tracks[key]; if(S.settings.track === key) S.settings.track = Object.keys(S.tracks)[0];
    save(); syncChrome(); refreshPage(); toast('ลบสายแล้ว', 'ok');
  };
}
function refreshPage(){ if(RENDER[PAGE] && PAGE !== 'run') RENDER[PAGE](); }
