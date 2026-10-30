"use strict";
// ===== บัตรจำคำศัพท์: หมวด → ทวนทีละใบ (จำได้ / ยังไม่ได้) =====
const VC_GAP = [0, 1, 3, 7, 14, 30]; // วันก่อนทวนรอบถัดไป ตามระดับความจำ 0–5
const VC_MAX = 20;                   // คำต่อรอบ
let VC = { run: null };
const deckOf = c => c.deck || c.cat || 'ทั่วไป';
const vcDecks = () => [...new Set([...(S.decks || []), ...S.cards.map(deckOf)])];
const vcStyle = d => VOCAB[d] ? [VOCAB[d][0], VOCAB[d][1]] : ['book-open', tone(d)[1]];
const vcPct = L => L.length ? Math.round(L.reduce((a, c) => a + Math.min(c.box || 0, 5), 0) / (L.length * 5) * 100) : 0;
const vcText = s => String(s || '').replace(/<[^>]+>/g, ' ').trim();
// คำที่เคยทวนแล้วและถึงรอบ (ไม่นับคำใหม่)
const vcDueCount = d => S.cards.filter(c => c.seen && (c.due || 0) <= Date.now() && (!d || deckOf(c) === d)).length;

// ครั้งแรก: ล้างบัตรทดสอบเดิม แล้วใส่ชุดคำศัพท์เริ่มต้น (ครั้งต่อไปห้ามล้าง ให้เพิ่มอย่างเดียว)
function ensureVocab(){
  if(S.settings.vocabV) return;
  S.cards = []; S.decks = Object.keys(VOCAB);
  Object.entries(VOCAB).forEach(([deck, [, , ws]]) => ws.forEach(w => {
    const [f, b, ex] = w.split('|'); S.cards.push({ id: uid(), f, b, ex: ex || '', deck, box: 0, due: 0 });
  }));
  S.settings.vocabV = VOCAB_V; save();
}

// คิวทวน: คำที่ถึงรอบก่อน แล้วเติมคำใหม่ ถ้าไม่มีเลยให้ทวนคำที่ยังจำได้น้อยสุด
function vcQueue(d){
  const L = S.cards.filter(c => !d || deckOf(c) === d), now = Date.now();
  let q = L.filter(c => c.seen && (c.due || 0) <= now).sort((a, b) => (a.due || 0) - (b.due || 0));
  q = q.concat(L.filter(c => !c.seen)).slice(0, VC_MAX);
  if(!q.length) q = L.slice().sort((a, b) => (a.box || 0) - (b.box || 0)).slice(0, VC_MAX);
  return q.map(c => c.id);
}
function vcStart(d){
  const q = vcQueue(d);
  if(!q.length) return toast('ยังไม่มีคำในหมวดนี้', 'err');
  VC.run = { d, q, i: 0, flip: false, ok: 0, again: 0, redo: new Set() };
  PAGE === 'cards' ? renderCards() : go('cards');
}

function renderCards(){
  ensureVocab();
  if(VC.run) return renderVcRun();
  const ds = vcDecks(), all = vcQueue(null).length, due = vcDueCount();
  $('#view').innerHTML = `
  <div class="vc-hero">
    <div><small>ทวนวันนี้</small><b>${all}</b><span>คำ${due ? ` · ถึงรอบ ${due}` : ''}</span></div>
    <button class="vc-go" id="vcAll"><i data-lucide="play"></i>เริ่ม</button>
  </div>
  <div class="sec"><i data-lucide="layers"></i>หมวดคำศัพท์<span class="more" style="text-decoration:none;color:var(--muted)">${S.cards.length} คำ</span></div>
  <div class="vc-grid">${ds.map(d => {
    const L = S.cards.filter(c => deckOf(c) === d), pct = vcPct(L), n = vcDueCount(d), [ic, col] = vcStyle(d);
    return `<button class="vc-deck" data-deck="${esc(d)}" style="--c:${col}">
      <span class="vc-ic"><i data-lucide="${ic}"></i></span>${n ? `<em class="vc-due">${n}</em>` : ''}
      <b>${esc(d)}</b><small>${L.length} คำ · จำได้ ${pct}%</small>
      <span class="vc-bar"><i style="width:${pct}%"></i></span></button>`;
  }).join('') || '<div class="empty">ยังไม่มีคำศัพท์</div>'}</div>`;
  $('#vcAll').onclick = () => vcStart(null);
  $$('[data-deck]').forEach(b => b.onclick = () => vcStart(b.dataset.deck));
  icons();
}

function renderVcRun(){
  const R = VC.run, len = R.q.length;
  if(R.i >= len){
    $('#view').innerHTML = `<div class="vc-done">
      <span class="vc-done-ic"><i data-lucide="party-popper"></i></span><b>จบรอบแล้ว</b>
      <p>จำได้ ${R.ok} · ทวนซ้ำ ${R.again}</p>
      <div class="vc-done-acts"><button class="btn ghost lg" id="vcHome">กลับ</button><button class="btn lg" id="vcMore"><i data-lucide="play"></i>ทวนต่อ</button></div></div>`;
    $('#vcHome').onclick = () => { VC.run = null; renderCards(); };
    $('#vcMore').onclick = () => vcStart(R.d);
    playTone('submit'); return icons();
  }
  const c = S.cards.find(x => x.id === R.q[R.i]);
  if(!c){ R.i++; return renderVcRun(); }
  const [, col] = vcStyle(deckOf(c));
  $('#view').innerHTML = `
  <div class="vc-top">
    <button class="ib" id="vcX" title="ออก"><i data-lucide="x"></i></button>
    <div class="vc-prog"><i style="width:${R.i / len * 100}%"></i></div><span>${R.i + 1}/${len}</span>
    <button class="ib" id="vcList" title="รายการคำ"><i data-lucide="list"></i></button>
  </div>
  <div class="vc-card" id="vcCard" style="--c:${col}"><div class="vc-inner">
    <div class="vc-face vc-front"><small>${esc(deckOf(c))}</small><h2>${c.f}</h2>
      <button class="vc-say" id="vcSay" title="ฟังเสียง"><i data-lucide="volume-2"></i></button><p>แตะเพื่อดูคำแปล</p></div>
    <div class="vc-face vc-back"><small>${c.f}</small><h2>${c.b}</h2>${c.ex ? `<p class="vc-ex">${esc(c.ex)}</p>` : ''}</div>
  </div></div>
  <div class="vc-acts" id="vcActs">
    <button class="vc-no" id="vcNo"><i data-lucide="rotate-ccw"></i>ยังไม่ได้</button>
    <button class="vc-yes" id="vcYes"><i data-lucide="check"></i>จำได้</button>
  </div>`;
  const card = $('#vcCard'), flip = () => { R.flip = !R.flip; card.classList.toggle('flip', R.flip); $('#vcActs').classList.toggle('on', R.flip); };
  let sx = null;
  card.onclick = flip;
  card.ontouchstart = e => { sx = e.touches[0].clientX; };
  card.ontouchend = e => { if(sx == null || !R.flip) return; const dx = e.changedTouches[0].clientX - sx; sx = null; if(Math.abs(dx) > 70){ e.preventDefault(); vcGrade(c, dx > 0); } };
  $('#vcSay').onclick = e => { e.stopPropagation(); speakWord(vcText(c.f).split('↔')[0]); };
  $('#vcNo').onclick = () => vcGrade(c, false);
  $('#vcYes').onclick = () => vcGrade(c, true);
  $('#vcX').onclick = () => { VC.run = null; renderCards(); };
  $('#vcList').onclick = () => vcList(R.d);
  icons();
}
function vcGrade(c, ok){
  const R = VC.run; if(!R || !R.flip) return;
  c.seen = 1;
  if(ok){ c.box = Math.min((c.box || 0) + 1, 5); c.due = Date.now() + VC_GAP[c.box] * 864e5; R.ok++; }
  else{ c.box = 0; c.due = Date.now(); R.again++; if(!R.redo.has(c.id)){ R.redo.add(c.id); R.q.push(c.id); } }
  save(); playTone(ok ? 'ok' : 'wrong');
  const card = $('#vcCard'); card.classList.add(ok ? 'out-r' : 'out-l');
  setTimeout(() => { R.i++; R.flip = false; renderVcRun(); }, 220);
}

// รายการคำในหมวด: แตะเพื่อแก้ ปุ่มถังขยะเพื่อลบ
function vcList(d){
  const L = S.cards.filter(c => !d || deckOf(c) === d);
  openModal(d || 'คำศัพท์ทั้งหมด', `<div class="vc-list">${L.map(c => `
    <div class="vc-row" data-ved="${c.id}"><div><b>${c.f}</b><small>${c.b}</small></div>
      <span class="vc-lv">${'●'.repeat(Math.min(c.box || 0, 5))}${'○'.repeat(5 - Math.min(c.box || 0, 5))}</span>
      <button class="ib sm" data-vdel="${c.id}"><i data-lucide="trash-2"></i></button></div>`).join('') || '<div class="empty">ไม่มีคำ</div>'}</div>`,
    `${d ? `<button class="btn ghost" id="vcDelDeck"><i data-lucide="trash-2"></i>ลบหมวด</button>` : ''}<button class="btn" data-close>ปิด</button>`);
  $$('[data-ved]').forEach(r => r.onclick = e => { if(e.target.closest('[data-vdel]')) return; const c = S.cards.find(x => x.id === r.dataset.ved); closeModal(); setTimeout(() => vcForm(c), 120); });
  $$('[data-vdel]').forEach(b => b.onclick = () => { removeCards(x => x.id === b.dataset.vdel, 'ลบคำ 1 คำ'); b.closest('.vc-row').remove(); syncChrome(); });
  if($('#vcDelDeck')) $('#vcDelDeck').onclick = async () => {
    if(!await ask(`ลบหมวด "${d}"?`, `คำ ${L.length} คำจะถูกลบ`, 'ลบ')) return;
    removeCards(x => deckOf(x) === d, `ลบหมวด ${d}`); S.decks = (S.decks || []).filter(x => x !== d);
    VC.run = null; save(); syncChrome(); renderCards(); undoToast(`ลบหมวด "${d}" แล้ว`);
  };
}

// เพิ่ม/แก้คำ (พิมพ์ชื่อหมวดใหม่ได้เลย)
function vcForm(card){
  const c = card || { f: '', b: '', ex: '', deck: (VC.run && VC.run.d) || vcDecks()[0] || 'ทั่วไป' };
  openModal(card ? 'แก้คำ' : 'เพิ่มคำ', `
    <div class="field"><label>คำศัพท์</label><input class="inp" id="vf_f" value="${esc(vcText(c.f))}" placeholder="เช่น arrest"></div>
    <div class="field"><label>คำแปล</label><input class="inp" id="vf_b" value="${esc(vcText(c.b))}" placeholder="เช่น จับกุม"></div>
    <div class="field"><label>ตัวอย่าง (ไม่ใส่ก็ได้)</label><input class="inp" id="vf_e" value="${esc(c.ex || '')}"></div>
    <div class="field"><label>หมวด</label><input class="inp" id="vf_d" list="vfDecks" value="${esc(deckOf(c))}">
      <datalist id="vfDecks">${vcDecks().map(d => `<option value="${esc(d)}">`).join('')}</datalist></div>`,
    `<button class="btn ghost" data-close>ยกเลิก</button><button class="btn" id="vf_ok"><i data-lucide="check"></i>บันทึก</button>`, { focus: '#vf_f' });
  $('#vf_ok').onclick = () => {
    const f = $('#vf_f').value.trim(), b = $('#vf_b').value.trim(), ex = $('#vf_e').value.trim();
    const deck = ($('#vf_d').value.trim() || 'ทั่วไป').replace(/[<>"'`]/g, '');
    if(!f || !b) return toast('ใส่คำศัพท์และคำแปล', 'err');
    if(!(S.decks || []).includes(deck)) S.decks = [...(S.decks || []), deck];
    if(card) Object.assign(card, sanitizeCard({ ...card, f, b, ex, deck }));
    else{ const id = uid(); S.cards.unshift(sanitizeCard({ id, f, b, ex, deck, box: 0, due: 0 })); pushUndo('เพิ่มคำ 1 คำ', { addC: [id] }); }
    save(); closeModal(); syncChrome(); renderCards(); toast('บันทึกแล้ว', 'ok');
  };
}
// นำเข้าหลายคำ: คำ | คำแปล | หมวด
function vcBulk(){
  openModal('นำเข้าหลายคำ', `<div class="field"><label>บรรทัดละคำ: คำ | คำแปล | หมวด</label>
    <textarea class="inp" id="vb" style="min-height:190px;font-size:13px" placeholder="arrest | จับกุม | งานตำรวจ"></textarea></div>`,
    `<button class="btn ghost" data-close>ยกเลิก</button><button class="btn" id="vbGo"><i data-lucide="download"></i>นำเข้า</button>`, { focus: '#vb' });
  $('#vbGo').onclick = () => {
    const added = [];
    $('#vb').value.split('\n').forEach(ln => {
      const [f, b, d] = ln.split('|').map(x => (x || '').trim()); if(!f || !b) return;
      const deck = (d || 'ทั่วไป').replace(/[<>"'`]/g, ''), id = uid();
      if(!(S.decks || []).includes(deck)) S.decks = [...(S.decks || []), deck];
      S.cards.unshift(sanitizeCard({ id, f, b, ex: '', deck, box: 0, due: 0 })); added.push(id);
    });
    if(!added.length) return toast('รูปแบบไม่ถูกต้อง', 'err');
    pushUndo(`นำเข้า ${added.length} คำ`, { addC: added });
    save(); closeModal(); syncChrome(); renderCards(); undoToast(`นำเข้า ${added.length} คำแล้ว`);
  };
}
function vcAdd(){ openPicker({ title: 'เพิ่มคำศัพท์', value: '', options: [{ val: 'one', label: 'เพิ่มทีละคำ' }, { val: 'bulk', label: 'นำเข้าหลายคำ' }],
  onSelect: v => setTimeout(() => v === 'one' ? vcForm() : vcBulk(), 120) }); }

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
  const subjects = [...new Set([...S.cats, ...Object.keys(t.quota || {})])];
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
        </div>`).join('')}
      </div>
      <div class="row" style="gap:8px;margin-top:10px">
        <input class="inp" id="tr_newsub" placeholder="เพิ่มวิชาที่ยังไม่มี เช่น สังคม" style="flex:1">
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
