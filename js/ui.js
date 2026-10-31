"use strict";
// ==========================================
// ระบบเล่นไฟล์เสียง Audio MP3 ลื่นไหล ไม่หน่วง Thread
// ==========================================
// เสียงปุ่ม: โหลดไฟล์ใน sounds/ เข้า Web Audio (เล่นทันที ไม่หน่วง) ถ้าไม่ได้ใช้ <audio> แทน
const SFX_FILES = {tap:'sounds/tap.mp3', pick:'sounds/pick.mp3', ok:'sounds/correct.mp3', wrong:'sounds/wrong.mp3', submit:'sounds/done.mp3'};
const sfxEl = {}, sfxBuf = {};
// มือถือ = จอด้านสั้นไม่ถึง 600px; เสียงปุ่มเบาลง (มือถือเบากว่าเพื่อให้เสียงพูดเด่น)
const IS_PHONE = Math.min(screen.width, screen.height) < 600;
const SFX_VOLUME = IS_PHONE ? 0.3 : 0.4;
let audioCtx = null, lastTapAt = 0;
Object.entries(SFX_FILES).forEach(([k, src]) => { const a = new Audio(src); a.preload = 'auto'; a.onerror = () => logErr(`โหลดเสียงไม่สำเร็จ: ${src}`, 'audio'); sfxEl[k] = a; });
try{
  const C = window.AudioContext || window.webkitAudioContext;
  if(C){
    audioCtx = new C();
    Object.entries(SFX_FILES).forEach(([k, src]) => {
      fetch(src).then(r => r.arrayBuffer())
        .then(ab => audioCtx.decodeAudioData(ab, b => { sfxBuf[k] = b; }, () => {}))
        .catch(() => {});
    });
  }
}catch(e){ audioCtx = null; }

function playTone(type='tap'){
  if(!S.settings.sound) return;
  if(type === 'tap'){
    // กันเสียงซ้อนเมื่อปุ่มเรียกเองซ้ำกับตัวดักกดปุ่มรวม
    const now = performance.now(); if(now - lastTapAt < 120) return; lastTapAt = now;
  }
  try{
    if(audioCtx && sfxBuf[type]){
      if(audioCtx.state === 'suspended') audioCtx.resume();
      const src = audioCtx.createBufferSource();
      src.buffer = sfxBuf[type];
      // เฟดเข้าสั้นๆ กันลำโพงมือถือดังคลิกตอนเริ่มเสียง
      const g = audioCtx.createGain(), t = audioCtx.currentTime;
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(SFX_VOLUME, t + 0.0015);
      src.connect(g).connect(audioCtx.destination);
      src.start(t);
    } else if(sfxEl[type]){
      const a = sfxEl[type]; a.volume = SFX_VOLUME; a.currentTime = 0; a.play().catch(()=>{});
    }
  }catch(e){}
}
// เสียงกดปุ่มทุกปุ่ม (รวมปุ่มที่ไม่ได้เรียก playTone เอง) + ปลดล็อกเสียงบน iPhone ด้วยการแตะครั้งแรก
// แตะลง: แค่ปลดล็อกเสียง · เสียง pop เล่นตอน "กดจริง" (click) เท่านั้น ไม่ดังตอนนิ้วแตะเพื่อเลื่อนจอ
document.addEventListener('pointerdown', () => { if(audioCtx && audioCtx.state === 'suspended') audioCtx.resume(); }, {passive:true});
document.addEventListener('click', e => {
  const b = e.target.closest && e.target.closest('button,.chip,.picker-item,.streak-day-item,.neo-cd,.neo-cm,[data-go],.sw');
  if(b && !b.disabled && !b.classList.contains('opt')) playTone('tap');
}, true);

// เสียงอ่าน: เลือกเสียงภาษาอังกฤษของเครื่อง (ไม่ให้ใช้เสียงไทยอ่านคำอังกฤษ), slow = อ่านช้า
let enVoice = null;
const pickVoice = () => { const v = speechSynthesis.getVoices();
  enVoice = v.find(x => /en[-_]US/i.test(x.lang) && /google|natural|samantha/i.test(x.name)) || v.find(x => /en[-_](US|GB)/i.test(x.lang)) || v.find(x => /^en/i.test(x.lang)) || null; };
if('speechSynthesis' in window){ pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
function speakWord(text, slow){
  if(!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  if(!enVoice) pickVoice();
  const say = (t, rate) => { const u = new SpeechSynthesisUtterance(t); u.lang = 'en-US'; if(enVoice) u.voice = enVoice; u.rate = rate; u.volume = IS_PHONE ? 1 : 0.7; speechSynthesis.speak(u); };
  // ช้า: บางเครื่องแทบไม่เปลี่ยนความเร็ว จึงอ่านทีละคำ (มีช่วงหยุดระหว่างคำ) และลดความเร็วลงมาก
  if(slow){ const ws = String(text).split(/\s+/).filter(Boolean); ws.length > 1 ? ws.forEach(w => say(w, 0.6)) : say(text, 0.4); }
  else say(text, 0.9);
}

function toast(msg,type='info'){
  const el=document.createElement('div');
  el.className='toast '+type;
  const ic=type==='err'?'alert-circle':type==='ok'?'check-circle-2':'info';
  el.innerHTML=`<i data-lucide="${ic}"></i>${esc(msg)}`;
  $('#toasts').appendChild(el); icons(el);
  setTimeout(()=>{el.style.opacity='0';setTimeout(()=>el.remove(),280);},1600);
}

function openModal(title,body,footer,opt={}){
  playTone('tap');
  const m = $('#modal');
  m.innerHTML=
    `<div class="mh"><b>${title}</b><button class="ib sm sp" data-close><i data-lucide="x"></i></button></div>
     <div class="mb">${body}</div>${footer?`<div class="mf">${footer}</div>`:''}`;
  $('#mask').classList.add('on');
  window._lastScrollY = window.scrollY;
  document.body.classList.add('modal-locked');
  icons(m);
  $$('[data-close]').forEach(b=>b.onclick=closeModal);
  if(opt.focus) setTimeout(()=>{const f=$(opt.focus);f&&f.focus();},60);
}

function closeModal(){
  playTone('tap');
  $('#mask').classList.remove('on');
  if(!$('#rteMask').classList.contains('on')){
    document.body.classList.remove('modal-locked');
    window.scrollTo(0, window._lastScrollY || 0);
  }
}

document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){
    if($('#lightbox').classList.contains('on')) closeLightbox();
    else if($('#rteMask').classList.contains('on')) closeRichTextEditor();
    else if($('#imgEditorMask').classList.contains('on')) closeImageEditor();
    else closeModal();
  }
  if($('#lightbox').classList.contains('on')){
    if(e.key==='ArrowLeft') stepGallery(-1);
    if(e.key==='ArrowRight') stepGallery(1);
  }
});

function openPicker({title, options, value, onSelect}){
  const body = `
    <div style="display:flex;flex-direction:column;gap:4px">
      ${options.map(opt=>{
        const isObj = typeof opt === 'object';
        const v = isObj ? opt.val : opt;
        const lb = isObj ? opt.label : opt;
        const sel = String(v) === String(value);
        return `
          <button class="picker-item ${sel?'on':''}" data-val="${esc(v)}">
            <span>${esc(lb)}</span>
            <span class="chk"><i data-lucide="check" style="width:14px;height:14px"></i></span>
          </button>`;
      }).join('')}
    </div>
  `;
  openModal(title, body, `<button class="btn ghost block" data-close>ปิด</button>`);
  $$('.picker-item').forEach(btn => {
    btn.onclick = () => {
      playTone('tap');
      onSelect(btn.dataset.val);
      closeModal();
    };
  });
}

function openThaiDatePicker(currentVal, onSave){
  const now = new Date();
  let [curY, curM, curD] = currentVal ? currentVal.split('-').map(Number) : [now.getFullYear(), now.getMonth()+1, now.getDate()];
  if(!curY || isNaN(curY)) { curY = now.getFullYear(); curM = now.getMonth()+1; curD = now.getDate(); }

  const days = Array.from({length:31}, (_,i)=>i+1);
  const years = [curY-1, curY, curY+1, curY+2];

  const body = `
    <div style="display:grid;grid-template-columns:1fr 1.3fr 1fr;gap:8px;padding:8px 0">
      <div>
        <label style="font-size:12px;color:var(--muted);display:block;margin-bottom:6px">วัน</label>
        <select class="inp" id="p_day" style="font-size:15px;padding:10px">
          ${days.map(d=>`<option value="${d}" ${d===curD?'selected':''}>${d}</option>`).join('')}
        </select>
      </div>
      <div>
        <label style="font-size:12px;color:var(--muted);display:block;margin-bottom:6px">เดือน</label>
        <select class="inp" id="p_month" style="font-size:15px;padding:10px">
          ${THAI_MONTHS.map((m,i)=>`<option value="${i+1}" ${(i+1)===curM?'selected':''}>${m}</option>`).join('')}
        </select>
      </div>
      <div>
        <label style="font-size:12px;color:var(--muted);display:block;margin-bottom:6px">ปี พ.ศ.</label>
        <select class="inp" id="p_year" style="font-size:15px;padding:10px">
          ${years.map(y=>`<option value="${y}" ${y===curY?'selected':''}>${y+543}</option>`).join('')}
        </select>
      </div>
    </div>
  `;

  openModal('วันสอบจริง', body, `
    <button class="btn ghost" id="btnDateClear">ล้าง</button>
    <button class="btn" id="btnDateSave"><i data-lucide="check"></i>บันทึก</button>
  `);

  $('#btnDateClear').onclick = () => { playTone('tap'); onSave(''); closeModal(); };
  $('#btnDateSave').onclick = () => {
    playTone('tap');
    const d = String($('#p_day').value).padStart(2,'0');
    const m = String($('#p_month').value).padStart(2,'0');
    const y = $('#p_year').value;
    onSave(`${y}-${m}-${d}`);
    closeModal();
  };
}

// หน้าปกหนังสือ: ใช้รูปที่ตั้งไว้ หรือสร้างปกจากสีและไอคอนของวิชา
function bookFace(name, cover, fg, icon){
  return `<span class="hb-face ${cover ? 'has-img' : ''}" style="--bk:${fg}">${cover ? `<img src="${cover}" alt="">` :
    `<span class="hb-kicker">P-EXAM</span><span class="hb-emblem"><i data-lucide="${icon || cicon(name)}"></i></span><span class="hb-name">${esc(name)}</span>`}</span>`;
}
