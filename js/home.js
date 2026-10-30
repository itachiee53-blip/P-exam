"use strict";
function openIconPicker(catName){
  const curIcon = cicon(catName);
  const curTone = tone(catName);
  let selectedIcon = curIcon;
  let selectedBg = curTone[0];
  let selectedFg = curTone[1];
  let selectedCover = (S.catCovers || {})[catName] || '';
  const coverHtml = () => `<div class="hb" style="--bk:${selectedFg};width:118px;flex:none">${bookFace(catName, selectedCover, selectedFg, selectedIcon)}<span class="hb-pages"></span><span class="hb-ribbon"></span></div>`;

  const body = `
    <div style="display:flex;flex-direction:column;gap:16px">
      <div class="row" style="gap:14px;align-items:flex-end">
        <div id="coverPrev">${coverHtml()}</div>
        <div style="display:flex;flex-direction:column;gap:8px;flex:1">
          <label style="font-size:12.5px;color:var(--muted);font-weight:600">รูปปกหนังสือ</label>
          <button type="button" class="btn sm ghost" id="btnCover"><i data-lucide="image-plus"></i>เลือกรูปปก</button>
          <button type="button" class="btn sm ghost" id="btnCoverDel" ${selectedCover ? '' : 'hidden'}><i data-lucide="trash-2"></i>ใช้ปกสีแทน</button>
          <small style="color:var(--muted);font-size:11.5px">รูปแนวตั้ง 3:4 สวยที่สุด</small>
          <input type="file" id="coverFile" accept="image/*" hidden>
        </div>
      </div>
      <div>
        <label style="font-size:12.5px;color:var(--muted);font-weight:600;display:block;margin-bottom:8px">เลือกไอคอน (36 แบบ)</label>
        <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:8px;max-height:220px;overflow-y:auto;padding:3px" id="iconPoolGrid">
          ${ICON_POOL.map(ic=>`
            <button class="ib ${ic===selectedIcon?'on':''}" data-setic="${ic}" style="width:100%;height:44px;border-radius:12px">
              <i data-lucide="${ic}"></i>
            </button>
          `).join('')}
        </div>
      </div>
      <div>
        <label style="font-size:12.5px;color:var(--muted);font-weight:600;display:block;margin-bottom:8px">เลือกสี (12 สี)</label>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px" id="colorPoolGrid">
          ${COLOR_POOL.map(col=>{
            const isMatch = col.bg === selectedBg;
            return `
              <button class="chip ${isMatch?'on':''}" data-setcolbg="${col.bg}" data-setcolfg="${col.fg}" style="background:${col.bg};color:${col.fg};border:2px solid ${isMatch ? col.fg : 'transparent'};font-weight:600;justify-content:center;padding:7px 4px;font-size:12px">
                ● ${col.name}
              </button>`;
          }).join('')}
        </div>
      </div>
    </div>
  `;

  openModal(`ปรับแต่ง: ${esc(catName)}`, body, `<button class="btn ghost" data-close>ยกเลิก</button><button class="btn" id="saveCatStyle"><i data-lucide="save"></i>บันทึก</button>`);

  const modalEl = $('#modal');

  modalEl.querySelectorAll('[data-setic]').forEach(btn=>{
    btn.onclick=()=>{
      playTone('tap');
      selectedIcon = btn.dataset.setic;
      modalEl.querySelectorAll('[data-setic]').forEach(b=>b.classList.remove('on'));
      btn.classList.add('on');
    };
  });

  modalEl.querySelectorAll('[data-setcolbg]').forEach(btn=>{
    btn.onclick=()=>{
      playTone('tap');
      selectedBg = btn.dataset.setcolbg;
      selectedFg = btn.dataset.setcolfg;
      modalEl.querySelectorAll('[data-setcolbg]').forEach(b=>{
        b.classList.remove('on');
        b.style.borderColor = 'transparent';
      });
      btn.classList.add('on');
      btn.style.borderColor = selectedFg;
    };
  });

  const paintCover = () => { $('#coverPrev').innerHTML = coverHtml(); $('#btnCoverDel').hidden = !selectedCover; icons($('#coverPrev')); };
  $('#btnCover').onclick = () => $('#coverFile').click();
  $('#coverFile').onchange = async e => {
    const f = e.target.files[0]; if(!f) return;
    const img = await optimizeImage(f, 720, 0.82);
    if(img) openImageEditor(img, res => { selectedCover = res; paintCover(); });
    e.target.value = '';
  };
  $('#btnCoverDel').onclick = () => { selectedCover = ''; paintCover(); };
  modalEl.addEventListener('click', e => { if(e.target.closest('[data-setic],[data-setcolbg]')) setTimeout(paintCover, 0); });

  $('#saveCatStyle').onclick=()=>{
    playTone('tap');
    S.catCovers = S.catCovers || {};
    if(selectedCover) S.catCovers[catName] = selectedCover; else delete S.catCovers[catName];
    S.catIcons = S.catIcons || {};
    S.catTones = S.catTones || {};
    S.catIcons[catName] = selectedIcon;
    S.catTones[catName] = [selectedBg, selectedFg];
    save();
    closeModal();
    if(PAGE==='quiz') renderQuiz();
    if(PAGE==='setting') renderSetting();
    if(PAGE==='home') renderHome();
    syncChrome();
    toast('บันทึกแล้ว','ok');
  };
}

function ask(title,msg,okText='ยืนยัน',danger=true){
  return new Promise(res=>{
    openModal(title,`<p style="color:var(--text2);line-height:1.6">${esc(msg)}</p>`,
      `<button class="btn ghost" id="_no">ยกเลิก</button><button class="btn ${danger?'red':''}" id="_yes">${esc(okText)}</button>`);
    $('#_no').onclick=()=>{closeModal();res(false);};
    $('#_yes').onclick=()=>{playTone('tap');closeModal();res(true);};
  });
}

const META={home:['หน้าแรก','ติวสอบตำรวจ'],quiz:['ข้อสอบ','คลังข้อสอบ'],cards:['บัตรจำ','ทบทวนความจำ'],
  exam:['จำลองสอบ','จัดชุดสอบ'],run:['กำลังสอบ','มีสมาธิ'],result:['ผลลัพธ์','สรุปผลคะแนน'],setting:['ตั้งค่า','ปรับแต่งระบบ']};
let PAGE='home';

async function go(p){
  if(PAGE==='run' && p!=='run' && EX.live){
    const ok=await ask('ออกจากการสอบ?','ระบบจะบันทึกข้อที่ทำไว้ต่อภายหลัง','ออก');
    if(!ok)return;
    holdExam();
  }
  playTone('tap');
  PAGE=p;
  document.body.dataset.page=p;
  if(p !== 'quiz'){ QF.sel = false; SEL.clear(); const sb = document.getElementById('selBar'); if(sb) sb.remove(); }
  $$('[data-go]').forEach(b=>b.classList.toggle('on',b.dataset.go===p));
  
  const topBlock = $('#topTitleBlock');
  if(p === 'home'){
    const currentTrackKey = curTrackKey();
    const trackInfo = getTrack(currentTrackKey);
    const name = (S.settings.name || '').trim() || 'P-exam';
    const avatar = S.settings.avatar || '';

    topBlock.innerHTML = `
      <div class="home-profile-header" id="homeProfileHeaderBtn" title="แตะเพื่อจัดการโปรไฟล์">
        <div class="hp-avatar-wrap" id="hpAvatarBox">
          ${avatar ? `<img src="${avatar}" style="width:100%;height:100%;object-fit:cover" alt="Avatar">` : `<i data-lucide="user" style="width:20px;height:20px"></i>`}
        </div>
        <div class="hp-info">
          <div class="hp-name-row">
            <b id="hpUserName">${esc(name)}</b>
            <i data-lucide="chevron-right"></i>
          </div>
          <small class="hp-track-badge" id="hpTrackName">สาย${trackInfo.label}</small>
        </div>
      </div>
    `;
  } else {
    topBlock.innerHTML = `
      <h1 id="ttl">${META[p][0]}</h1>
      <div class="sub" id="sub">${META[p][1]}</div>
    `;
  }

  requestAnimationFrame(() => {
    RENDER[p]();
    syncChrome();
    $('.main').scrollTo({top: 0, behavior: 'instant'});
  });
}

document.addEventListener('click',e=>{
  const g=e.target.closest('[data-go]'); if(g){go(g.dataset.go);}
});

function syncChrome(){
  updateSidebarProfile();
  $('#pillQ').textContent=S.questions.length.toLocaleString();
  $('#pillC').textContent=S.cards.length.toLocaleString();
  const fab=$('#fab');
  if(PAGE==='quiz') setQuizFab();
  else if(PAGE==='cards'){fab.hidden=false;fab.innerHTML='<i data-lucide="plus"></i>เพิ่มคำ';fab.onclick=()=>{playTone('tap');vcAdd();};}
  else fab.hidden=true;
  icons();
}

function streak(){
  let n=0,d=new Date();
  if(!(S.stats.days[dkey(d)]?.answered)) d.setDate(d.getDate()-1);
  for(;;){ const k=dkey(d); if(S.stats.days[k]?.answered>0){n++;d.setDate(d.getDate()-1);} else break; if(n>400)break; }
  return n;
}

function getMonToSunWeek(){
  const now = new Date();
  const currentDayOfWeek = now.getDay();
  const diffToMonday = (currentDayOfWeek === 0 ? -6 : 1) - currentDayOfWeek;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diffToMonday);

  const N = ['จ','อ','พ','พฤ','ศ','ส','อา'];
  const out = [];
  const todayKey = dkey(now);

  for(let i=0; i<7; i++){
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const k = dkey(d);
    out.push({
      k,
      dObj: d,
      lb: N[i],
      n: S.stats.days[k]?.answered || 0,
      today: k === todayKey
    });
  }
  return out;
}

function getCountdownInfo(){
  if(!S.settings.examDate) return null;
  const target = new Date(S.settings.examDate + 'T00:00:00');
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffTime = target - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if(isNaN(diffDays)) return null;

  return {
    daysLeft: diffDays,
    isPassed: diffDays < 0,
    isToday: diffDays === 0,
    examDateStr: formatThaiDate(S.settings.examDate)
  };
}

function calculateReadinessAndMastery(trackKey = 'admin'){
  const track = getTrack(trackKey);
  const mastery = {};
  
  S.cats.forEach(c => {
    mastery[c] = { 
      totalQ: 0,        // จำนวนข้อทั้งหมดในคลังวิชานี้
      seenQ: 0,         // จำนวนข้อไม่ซ้ำที่เคยทำไปแล้ว
      masteredQ: 0,     // ข้อที่ทำถูก (สถานะปัจจุบันทำได้)
      accuracy: 0,      // ความแม่นยำ % (ถูก / ข้อที่ทำแล้ว)
      coverage: 0,      // ความครอบคลุมเนื้อหา % (ทำแล้ว / คลังทั้งหมด)
      pct: 0,           // คะแนนความพร้อมรวม (70/30)
      confidence: 'low',// ระดับความน่าเชื่อถือข้อมูล
      statusText: ''    // ข้อความประเมิน
    };
  });

  // นับสถิติรายข้อตามจริงจากคลัง
  S.questions.forEach(q => {
    if(mastery[q.cat]){
      mastery[q.cat].totalQ++;
      const st = S.qstat[q.id];
      if(st && st.seen > 0){
        mastery[q.cat].seenQ++;
        // ถือว่าแม่นยำถ้าตอบถูกมากกว่าหรือเท่ากับตอบผิดในข้อนั้น
        if((st.ok || 0) >= (st.bad || 0) && (st.ok || 0) > 0){
          mastery[q.cat].masteredQ++;
        }
      }
    }
  });

  let totalWeight = 0;
  let scoreSum = 0;

  for(const c of S.cats){
    const d = mastery[c];
    
    // 1. ความแม่นยำ (Accuracy) 70%
    d.accuracy = d.seenQ > 0 ? Math.round((d.masteredQ / d.seenQ) * 100) : 0;
    
    // 2. การกวาดเนื้อหาในคลัง (Coverage) 30%
    d.coverage = d.totalQ > 0 ? Math.round((d.seenQ / d.totalQ) * 100) : 0;

    // 3. รวมคะแนนถ่วงน้ำหนัก (ล็อกไม่ให้เกิน 100%)
    if(d.seenQ === 0){
      d.pct = 0;
    } else {
      d.pct = clamp(Math.round((d.accuracy * 0.70) + (d.coverage * 0.30)), 0, 100);
    }

    // 4. ตัวตัดเกรดความน่าเชื่อถือ (Data Confidence)
    if(d.seenQ < 10){
      d.confidence = 'low';
      d.statusText = 'เพิ่งเริ่มฝึก (ข้อมูลน้อย)';
    } else if(d.coverage < 35){
      d.confidence = 'medium';
      d.statusText = d.pct >= 60 ? 'ทรงดี แต่ต้องกวาดข้อเพิ่ม' : 'ต้องฝึกข้อใหม่เพิ่ม';
    } else {
      d.confidence = 'high';
      d.statusText = d.pct >= 60 ? '✓ แม่นยำพร้อมสอบ' : 'ยังไม่ถึงเกณฑ์ 60%';
    }

    // คำนวณภาพรวมโอกาสติด
    const isFocus = track.focusCats && track.focusCats.includes(c);
    const weight = isFocus ? 1.4 : 1.0;
    totalWeight += weight;
    scoreSum += d.pct * weight;
  }

  const passProb = totalWeight > 0 ? clamp(Math.round(scoreSum / totalWeight), 0, 100) : 0;

  let statusText = 'เริ่มต้นลุย';
  let badgeColor = 'var(--muted)';
  let bgGrad = 'linear-gradient(135deg, #7286a6, #41527a)';

  if(passProb >= 80){
    statusText = 'โอกาสติดสูงมาก';
    badgeColor = 'var(--green)';
    bgGrad = 'linear-gradient(135deg, #12a150, #0097a7)';
  } else if(passProb >= 60){
    statusText = 'ผ่านเกณฑ์ลุ้นตัวจริง';
    badgeColor = 'var(--blue)';
    bgGrad = 'linear-gradient(135deg, #2b7cf0, #0097a7)';
  } else if(passProb >= 40){
    statusText = 'ต้องฟิตเพิ่มอีกนิด';
    badgeColor = 'var(--orange)';
    bgGrad = 'linear-gradient(135deg, #f08c00, #ff6b6b)';
  } else {
    statusText = 'ยังไม่ปลอดภัย รีบทวนด่วน';
    badgeColor = 'var(--red)';
    bgGrad = 'linear-gradient(135deg, #e04347, #be4bdb)';
  }

  return { passProb, statusText, badgeColor, bgGrad, mastery };
}


function openDayBreakdownModal(dayItem){
  const k = dayItem.k;
  const dData = S.stats.days[k] || { answered: 0, correct: 0, todayCat: {} };
  const thaiDateFormatted = formatThaiDate(k);
  const catStats = dData.todayCat || {};

  const doneList = [];
  const notDoneList = [];

  S.cats.forEach(c => {
    const done = catStats[c] || 0;
    if (done > 0) {
      doneList.push({ cat: c, count: done });
    } else {
      notDoneList.push(c);
    }
  });

  const body = `
    <div style="display:flex;flex-direction:column;gap:16px;padding:4px 0">
      <div style="background:var(--surface2);border:1px solid var(--line);border-radius:18px;padding:16px;display:flex;justify-content:space-between;align-items:center">
        <div>
          <b style="font-size:16px;color:var(--text);display:block">${esc(thaiDateFormatted)} (${dayItem.lb})</b>
          <small style="color:var(--muted);font-size:12px">สรุปสถิติประจำวัน</small>
        </div>
        <span class="tag ${dData.answered > 0 ? 'g' : ''}" style="font-size:14px;font-weight:700;padding:6px 14px;border-radius:20px">
          ${dData.answered.toLocaleString()} ข้อ
        </span>
      </div>

      <div>
        <div style="font-size:13px;font-weight:700;color:var(--text2);margin-bottom:8px;display:flex;align-items:center;gap:6px">
          <i data-lucide="check-circle-2" style="width:15px;height:15px;color:var(--green)"></i>
          วิชาที่ฝึกแล้ว (${doneList.length})
        </div>
        <div style="display:flex;flex-direction:column;gap:7px">
          ${doneList.length ? doneList.map(x => `
            <div style="display:flex;align-items:center;justify-content:space-between;background:var(--surface);border:1px solid var(--line);padding:11px 14px;border-radius:14px">
              <span style="font-size:14px;font-weight:600;color:var(--text)">${esc(x.cat)}</span>
              <span style="font-weight:700;color:var(--blue);font-size:13px">+${x.count} ข้อ</span>
            </div>
          `).join('') : '<div style="text-align:center;padding:14px;font-size:13px;color:var(--muted);background:var(--surface2);border-radius:14px">ยังไม่มีการทำข้อสอบในวันนี้</div>'}
        </div>
      </div>

      ${notDoneList.length ? `
        <div>
          <div style="font-size:13px;font-weight:700;color:var(--text2);margin-bottom:8px;display:flex;align-items:center;gap:6px">
            <i data-lucide="clock" style="width:15px;height:15px;color:var(--orange)"></i>
            วิชาที่ยังไม่ได้แตะ (${notDoneList.length})
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:8px">
            ${notDoneList.map(c => `
              <button class="chip" data-quickstart="${esc(c)}" style="padding:8px 12px;font-size:12.5px;display:inline-flex;align-items:center;gap:5px;border-radius:12px">
                <i data-lucide="play" style="width:12px;height:12px;color:var(--blue)"></i>
                ${esc(c)}
              </button>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;

  openModal('ประวัติประจำวัน', body, `<button class="btn ghost block" data-close style="border-radius:14px">ปิด</button>`);

  $$('[data-quickstart]').forEach(btn => {
    btn.onclick = () => {
      playTone('tap');
      closeModal();
      startExam({ cats: [btn.dataset.quickstart], count: 15, minutes: 15, mode: 'practice', label: 'ฝึก ' + btn.dataset.quickstart });
    };
  });
}


// ===== ตัวช่วยกลาง (ใช้เกณฑ์เดียวกันทั้งแอป) =====
// เป้าต่อวัน: ตั้งเอง หรือ 0 = อัตโนมัติจากข้อที่ยังไม่ทำ ÷ วันที่เหลือก่อนสอบ
function dailyGoal(){
  const g = +S.settings.goal || 0;
  if(g > 0) return g;
  const cd = getCountdownInfo();
  const left = S.questions.filter(q => !(S.qstat[q.id]?.seen > 0)).length;
  if(cd && !cd.isPassed && cd.daysLeft > 0 && left) return Math.max(10, Math.ceil(left / cd.daysLeft));
  return 30;
}
// ข้อที่ยังตอบผิดมากกว่าถูก = คิวทวนข้อผิด
function wrongQueue(){
  return S.questions.filter(q => { const st = S.qstat[q.id]; return st && (st.bad||0) > (st.ok||0); });
}
// วิชาที่อ่อนสุด เรียงจากคะแนนความพร้อมต่ำไปสูง (เฉพาะวิชาที่เริ่มทำแล้ว)
function weakSubjects(trackKey){
  const m = calculateReadinessAndMastery(trackKey).mastery;
  return S.cats.map(c => ({c, ...m[c]})).filter(x => x.seenQ > 0).sort((a,b) => a.pct - b.pct);
}
// ฝึกวิชาเดียว: เอาข้อที่ผิดก่อน แล้วตามด้วยข้อที่ยังไม่ทำ
function practiceSubject(cat){
  const qs = S.questions.filter(q => q.cat === cat);
  const st = q => S.qstat[q.id] || {};
  const ordered = [...qs.filter(q => (st(q).bad||0) > (st(q).ok||0)), ...qs.filter(q => !(st(q).seen > 0)), ...qs];
  const ids = [...new Set(ordered.map(q => q.id))].slice(0, 15);
  startExam({ids, count:ids.length, minutes:0, mode:'practice', label:'ซ่อม '+cat});
}
function startTodayNew(){
  const t = day(), goal = dailyGoal();
  const unseen = S.questions.filter(q => !(S.qstat[q.id]?.seen > 0));
  const pool = unseen.length ? unseen : S.questions;
  const count = Math.min(pool.length, Math.max(10, goal - t.answered));
  startExam({ids:pool.map(q=>q.id), count, minutes:0, mode:'practice', label:'ข้อใหม่วันนี้'});
}

function renderHome(){
  const t=day(), goal=dailyGoal(), rawPct=goal>0?Math.round(t.answered/goal*100):0;
  const pct=clamp(rawPct,0,100);
  const C=2*Math.PI*42;
  const h=new Date().getHours();
  const hi = h < 11 ? 'สวัสดีตอนเช้า' : h < 16 ? 'สวัสดีตอนบ่าย' : h < 19 ? 'สวัสดีตอนเย็น' : 'สวัสดีตอนค่ำ';
  const trackKey = curTrackKey();
  const cd = getCountdownInfo();
  const rStats = calculateReadinessAndMastery(trackKey);
  const weak = weakSubjects(trackKey);
  const weekData = getMonToSunWeek();
  const wrongN = wrongQueue().length;
  const due = vcDueCount();
  const ses = S.session;
  const sesDone = ses ? ses.ans.filter(a=>a!==null).length : 0;
  const heroBg = S.settings.heroBg
    ? `style="background:linear-gradient(rgba(20,40,70,.35),rgba(20,40,70,.55)),url('${S.settings.heroBg}') ${S.settings.heroPos||'center'}/cover no-repeat"` : '';
  const newDone = t.answered >= goal;

  const todo = [
    {id:'new',  ic:'sparkles',   bg:'color-mix(in srgb,var(--t1) 18%,var(--surface))', fg:'color-mix(in srgb,var(--t1) 80%,var(--text))',   title:'ทำข้อสอบตามเป้า', sub: newDone ? `ครบ ${goal} ข้อแล้ว · ทำเพิ่มได้` : `อีก ${goal - t.answered} ข้อ`, done:newDone},
    {id:'wrong',ic:'repeat',     bg:'color-mix(in srgb,var(--t2) 18%,var(--surface))', fg:'color-mix(in srgb,var(--t2) 80%,var(--text))',    title:'ทวนข้อที่ยังผิด',  sub: wrongN ? `${wrongN} ข้อ` : 'ไม่มีข้อค้าง', done:!wrongN},
    {id:'cards',ic:'layers',     bg:'color-mix(in srgb,var(--t3) 20%,var(--surface))', fg:'color-mix(in srgb,var(--t3) 80%,var(--text))', title:'บัตรจำถึงรอบทวน', sub: due ? `${due} ใบ` : 'ไม่มีบัตรค้าง', done:!due}
  ];

  const msRow = m => {
    const col = m.pct >= 60 ? 'var(--green)' : m.pct >= 40 ? 'var(--orange)' : 'var(--red)';
    const [bg, fg] = tone(m.c);
    return `<button class="hm-ms" data-fixcat="${esc(m.c)}"><div class="hm-ic sm" style="background:${bg};color:${fg}"><i data-lucide="${cicon(m.c)}"></i></div>
      <div class="hm-grow"><div class="hm-ms-top"><b>${esc(m.c)}</b><span style="color:${col}">${m.pct}%</span></div>
      <div class="hm-bar"><i style="width:${m.pct}%;background:${col}"></i></div></div><i data-lucide="chevron-right" class="hm-chev"></i></button>`;
  };

  $('#view').innerHTML = `<div class="hm">
  <header class="hm-hello">
    <small>${new Date().toLocaleDateString('th-TH',{weekday:'long',day:'numeric',month:'long'})}${cd && !cd.isPassed ? ` <span class="hm-cd ${cd.daysLeft<=14?'soon':''}">${cd.isToday ? 'วันนี้วันสอบ สู้ๆ!' : `อีก ${cd.daysLeft} วันสอบ`}</span>` : ''}</small>
    <h2>${hi}</h2>
  </header>

  <section class="hm-today" ${heroBg}>
    <div class="hm-ring">
      <svg viewBox="0 0 100 100"><circle class="bgc" cx="50" cy="50" r="42"/>
        <circle class="fgc" id="gr" cx="50" cy="50" r="42" stroke-dasharray="${C}" stroke-dashoffset="${C}"/></svg>
      <div class="hm-ring-txt"><b id="ringTxt">${rawPct}%</b><span>ของเป้า</span></div>
    </div>
    <div class="hm-today-body">
      <small>วันนี้ทำแล้ว</small>
      <h2>${t.answered}<span>/${goal} ข้อ</span></h2>
      <p>${S.settings.goal ? 'เป้าที่ตั้งเอง' : 'เป้าอัตโนมัติจากวันสอบ'} · เปลี่ยนได้ในตั้งค่า</p>
      ${ses ? `<div class="hm-ses"><i data-lucide="file-clock"></i><span>ค้างอยู่: ${esc(ses.label)}</span></div>` : ''}
    </div>
    <div class="hm-tstats">
      <div><b><i data-lucide="flame" class="ico"></i> ${streak()}</b><span>วันต่อเนื่อง</span></div>
      <div><b>${t.answered ? Math.round(t.correct/t.answered*100)+'%' : '–'}</b><span>ถูกวันนี้</span></div>
      <div><b>${cd && !cd.isPassed ? cd.daysLeft : '–'}</b><span>วันถึงสอบ</span></div>
    </div>
    <button class="hm-start" id="hmStart"><i data-lucide="play"></i>${ses ? `ทำต่อ · ${sesDone}/${ses.ids.length} ข้อ` : 'เริ่มทำวันนี้'}</button>
  </section>

  <section class="hm-card hm-c-todo">
    <div class="hm-head"><b>สิ่งที่ต้องทำวันนี้</b><span class="hm-count">${todo.filter(x=>x.done).length}/3</span></div>
    ${todo.map(x=>`<button class="hm-todo ${x.done?'done':''}" data-todo="${x.id}">
      <div class="hm-ic sm" style="background:${x.bg};color:${x.fg}"><i data-lucide="${x.done?'check':x.ic}"></i></div>
      <div class="hm-grow"><b>${x.title}</b><small>${x.sub}</small></div><i data-lucide="chevron-right" class="hm-chev"></i></button>`).join('')}
  </section>

  <section class="hm-card hm-c-ready">
    <div class="hm-head"><b>โอกาสสอบติด</b><span class="hm-prob" style="color:${rStats.badgeColor}">${rStats.passProb}%</span></div>
    <div class="hm-bar lg"><i style="width:${rStats.passProb}%;background:${rStats.badgeColor}"></i></div>
    <small class="hm-sub">${esc(rStats.statusText)} · คิดจากความแม่นยำและจำนวนข้อที่ทำแล้วแต่ละวิชา</small>
    ${weak.length ? `<div class="hm-label">${weak[0].pct >= 60 ? 'ทุกวิชาผ่านเกณฑ์ · เรียงจากคะแนนต่ำสุด' : 'วิชาที่ควรเน้น · แตะเพื่อซ่อม'}</div><div class="hm-ms-list">${weak.slice(0,3).map(msRow).join('')}
      <div id="hmMsMore" hidden>${weak.slice(3).map(msRow).join('')}</div></div>
      ${weak.length>3?`<button class="hm-link center" id="hmMsToggle">ดูทุกวิชา (${weak.length})</button>`:''}`
      : '<small class="hm-sub">เริ่มทำข้อสอบเพื่อให้ระบบวิเคราะห์วิชาที่ควรเน้น</small>'}
  </section>

  <section class="hm-card hm-c-week">
    <div class="hm-head"><b>สัปดาห์นี้</b><button class="hm-link" id="hmCal">ปฏิทิน</button></div>
    <div class="hm-week">${weekData.map((x,i)=>`<button data-dayclick="${i}" class="${x.n>0?'done':''} ${x.today?'today':''}"><span>${x.lb}</span><b>${x.n>0?x.n:'·'}</b></button>`).join('')}</div>
  </section>
  </div>`;

  setTimeout(()=>{const g=$('#gr'); if(g) g.style.strokeDashoffset=C-C*pct/100;},60);
  $('#hmStart').onclick = () => ses ? resumeExam() : startTodayNew();
  $$('[data-todo]').forEach(b => b.onclick = () => {
    const k = b.dataset.todo;
    if(k === 'new') return startTodayNew();
    if(k === 'cards') return vcStart(null);
    const ids = wrongQueue().map(q => q.id);
    if(!ids.length) return toast('ไม่มีข้อที่ต้องทวน เก่งมาก!','ok');
    startExam({ids, count:ids.length, minutes:0, mode:'practice', label:'ทวนข้อผิด'});
  });
  $$('[data-fixcat]').forEach(b => b.onclick = () => practiceSubject(b.dataset.fixcat));
  $('#hmCal').onclick = () => window.openNeoCal && openNeoCal();
  if($('#hmMsToggle')) $('#hmMsToggle').onclick = e => {
    const m = $('#hmMsMore'); m.hidden = !m.hidden;
    e.currentTarget.textContent = m.hidden ? `ดูทุกวิชา (${weak.length})` : 'ย่อ';
  };
  $$('[data-dayclick]').forEach(b => b.onclick = () => openDayBreakdownModal(weekData[+b.dataset.dayclick]));
  icons();
}

let QF={cat:'ทั้งหมด',term:'',sort:'order',star:false,limit:25};
let searchDebounce = null;

const SORT_LABELS = {
  order: 'ตามลำดับ',
  smart: 'แนะนำ',
  unseen: 'ยังไม่ทำ',
  wrong: 'จุดอ่อน',
  hard: 'ยากก่อน',
  new: 'ล่าสุด',
  cat: 'ตามหมวด'
};
