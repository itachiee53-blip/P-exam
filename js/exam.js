"use strict";
function renderExam(){
  const avail=poolOf(CFG.cats,CFG.onlyStar,CFG.diff).length;
  const use=Math.min(avail,CFG.count);
  const track = getTrack(curTrackKey());

  $('#view').innerHTML=`
  <div class="card">
    <div class="sec" style="margin-top:0"><i data-lucide="shield" style="color:var(--violet)"></i>สายสอบ</div>
    <div style="margin-bottom:12px">
      <button class="c-select block" id="btnPickExamTrack" style="width:100%">
        <span><b>${esc(track.label)}</b> <small style="color:var(--muted)">(${esc(track.ruleDesc)})</small></span>
        <i data-lucide="chevron-down"></i>
      </button>
    </div>

    <div class="sec"><i data-lucide="folder" style="color:var(--blue)"></i>หมวดวิชา</div>
    <div class="chips">
      <button class="chip ${!CFG.cats.length?'on':''}" data-ec="__all">ทุกหมวด</button>
      ${S.cats.map(c=>`<button class="chip ${CFG.cats.includes(c)?'on':''}" data-ec="${esc(c)}">${esc(c)} ·${S.questions.filter(q=>q.cat===c).length}</button>`).join('')}
    </div>

    <div class="sec"><i data-lucide="hash" style="color:var(--orange)"></i>จำนวนข้อ</div>
    <div class="chips">
      ${[10, 20, 50, 100, 150].map(n => `<button class="chip ${CFG.count === n ? 'on' : ''}" data-en="${n}">${n} ข้อ</button>`).join('')}
    </div>

    <div class="sec"><i data-lucide="clock" style="color:var(--green)"></i>เวลา</div>
    <div class="chips">${[15,30,60,90,150].map(n=>`<button class="chip ${CFG.minutes===n?'on':''}" data-em="${n}">${n} นาที</button>`).join('')}
      <button class="chip ${CFG.minutes===0?'on':''}" data-em="0">ไม่จำกัด</button></div>

    <div class="sec"><i data-lucide="sliders-horizontal" style="color:var(--cyan)"></i>รูปแบบ</div>
    <div class="chips">
      <button class="chip ${CFG.mode==='exam'?'on':''}" data-ex="exam">สอบจริง</button>
      <button class="chip ${CFG.mode==='practice'?'on':''}" data-ex="practice">ฝึกทำ</button>
      <button class="chip ${CFG.onlyStar?'on':''}" data-star="1"><i data-lucide="star" style="width:13px;height:13px;vertical-align:middle"></i> ดาว</button>
    </div>

    <div class="sec"><i data-lucide="gauge" style="color:var(--red)"></i>ความยาก</div>
    <div class="chips">${[['','ทุกระดับ'],...DIFFS.map(d=>[d,d])].map(([v,l])=>`<button class="chip ${CFG.diff===v?'on':''}" data-ed="${v}">${l} ·${v?S.questions.filter(q=>q.d===v&&(!CFG.cats.length||CFG.cats.includes(q.cat))).length:''}</button>`).join('')}</div>

    <div class="grid g3 keep" style="margin-top:20px">
      <div class="mini"><b>${avail.toLocaleString()}</b><span>ในคลัง</span></div>
      <div class="mini"><b style="color:var(--blue)">${use.toLocaleString()}</b><span>ใช้สอบ</span></div>
      <div class="mini"><b style="color:var(--orange)">${CFG.minutes||'∞'}</b><span>นาที</span></div>
    </div>
    <button class="btn lg block green" id="start" style="margin-top:18px" ${avail?'':'disabled'}>
      <i data-lucide="play"></i>${avail?'เริ่มสอบ':'ไม่มีข้อสอบ'}</button>
  </div>`;

  $('#btnPickExamTrack').onclick = () => pickTrack(renderExam);
  $$('[data-ed]').forEach(b => b.onclick = () => { CFG.diff = b.dataset.ed; renderExam(); });

  function updateExamSummary(){
    const avail = poolOf(CFG.cats, CFG.onlyStar, CFG.diff).length;
    const use = Math.min(avail, CFG.count);
    const minis = $$('.grid.g3.keep .mini b');
    if(minis.length >= 3){
      minis[0].textContent = avail.toLocaleString();
      minis[1].textContent = use.toLocaleString();
      minis[2].textContent = CFG.minutes || '∞';
    }
    const startBtn = $('#start');
    if(startBtn){
      startBtn.disabled = !avail;
      startBtn.innerHTML = `<i data-lucide="play"></i>${avail ? 'เริ่มสอบ' : 'ไม่มีข้อสอบ'}`;
      icons(startBtn);
    }
  }

  $$('[data-ec]').forEach(b => b.onclick = () => {     
    playTone('tap');     
    const v = b.dataset.ec;     
    if(v === '__all'){       
      CFG.cats = [];       
      $$('[data-ec]').forEach(btn => btn.classList.toggle('on', btn.dataset.ec === '__all'));
    } else {
      $('[data-ec="__all"]').classList.remove('on');
      if(CFG.cats.includes(v)){
        CFG.cats = CFG.cats.filter(x => x !== v);
        b.classList.remove('on');
      } else {
        CFG.cats.push(v);
        b.classList.add('on');
      }
      if(!CFG.cats.length) $('[data-ec="__all"]').classList.add('on');
    }
    updateExamSummary();
  });

  $$('[data-en]').forEach(b => {
    b.onclick = () => {     
      playTone('tap');     
      CFG.count = +b.dataset.en;     
      $$('[data-en]').forEach(btn => btn.classList.toggle('on', btn === b));
      updateExamSummary();
    };
  });

  $$('[data-em]').forEach(b => {
    b.onclick = () => {     
      playTone('tap');     
      CFG.minutes = +b.dataset.em;     
      $$('[data-em]').forEach(btn => btn.classList.toggle('on', btn === b));
      updateExamSummary();
    };
  });

  $$('[data-ex]').forEach(b => {
    b.onclick = () => {     
      playTone('tap');     
      CFG.mode = b.dataset.ex;     
      $$('[data-ex]').forEach(btn => btn.classList.toggle('on', btn === b));
    };
  });

  const starBtn = $('[data-star]');
  if(starBtn){
    starBtn.onclick = (e) => {
      playTone('tap');
      CFG.onlyStar = !CFG.onlyStar;
      e.currentTarget.classList.toggle('on', CFG.onlyStar);
      updateExamSummary();
    };
  }

  $('#start').onclick = () => {
    playTone('tap');
    startExam({...CFG,label:`${CFG.mode==='exam'?'สอบ':'ฝึก'} ${use} ข้อ`});
  };

  icons();
}

let EX={live:false,qs:[],order:[],ans:[],flag:[],cuts:[],streakOk:0,streakWrong:0,i:0,left:0,tid:null,mode:'exam',label:'',cfg:null,paused:false,elapsed:0};
let autoNextTimer = null;

function startExam(cfg){
  if(!cfg)return;
  let qs = [];
  const track = getTrack(curTrackKey());

  if(cfg.full){
    const lack = [];
    Object.entries(track.quota).forEach(([catName, needCount]) => {
      let catPool = S.questions.filter(q => q.cat === catName);
      if(S.settings.shuffleQ) catPool = shuffle(catPool);
      if(catPool.length < needCount) lack.push(`${catName} ${catPool.length}/${needCount}`);
      qs.push(...catPool.slice(0, needCount));
    });
    if(lack.length && qs.length) toast(`ข้อไม่พอ: ${lack.join(', ')}`, 'err');
  } else {
    let rawPool = cfg.ids ? cfg.ids.map(id=>S.questions.find(q=>q.id===id)).filter(Boolean)
                          : poolOf(cfg.cats||[],cfg.onlyStar,cfg.diff);
    // เลือกข้อจากทุกหมวดก่อน แล้วค่อยเรียงตามลำดับหมวด (เดิมตัดเอาแต่หมวดแรก)
    if(S.settings.shuffleQ) rawPool = shuffle(rawPool);
    const want = cfg.count || rawPool.length;
    rawPool = rawPool.slice(0, want);
    const order = c => { const i = S.cats.indexOf(c); return i < 0 ? 999 : i; };
    qs = rawPool.map((q, i) => [q, i]).sort((a, b) => order(a[0].cat) - order(b[0].cat) || a[1] - b[1]).map(x => x[0]);
  }

  if(!qs.length)return toast('ไม่มีข้อสอบ','err');

  EX={live:true,qs,
      order:qs.map(q=>S.settings.shuffleC?shuffle([0,1,2,3]):[0,1,2,3]),
      ans:Array(qs.length).fill(null),flag:Array(qs.length).fill(false),
      cuts:qs.map(()=>[]), qt:qs.map(()=>0),
      streakOk:0,
      streakWrong:0,
      i:0,left:(cfg.minutes||0)*60,tid:null,mode:cfg.mode||'exam',
      label:cfg.label||'ชุดข้อสอบ',cfg,paused:false,elapsed:0};
    S.last={...cfg};
  persist();
  go('run'); startClock();
}

function resumeExam(){
  const s=S.session; if(!s)return;
  const qs=s.ids.map(id=>S.questions.find(q=>q.id===id)).filter(Boolean);
  if(qs.length!==s.ids.length){S.session=null;save();go('home');return toast('ชุดเดิมไม่สมบูรณ์','err');}
  EX={live:true,qs,order:s.order,ans:s.ans,flag:s.flag,
      cuts:s.cuts || qs.map(()=>[]), qt:s.qt || qs.map(()=>0),
      streakOk:s.streakOk || 0,
      streakWrong:s.streakWrong || 0,
      i:s.i,left:s.left,tid:null,
      mode:s.mode,label:s.label,cfg:s.cfg,paused:false,elapsed:s.elapsed||0};
  go('run'); startClock();
}

function holdExam(){
  stopClock();
  EX.live=false;
  localStorage.removeItem('pp_active_exam');
  persist();
  save();
}

function persist(){
  if(!EX.qs.length) return;
  S.session = {
    ids: EX.qs.map(q => q.id),
    order: EX.order,
    ans: EX.ans,
    flag: EX.flag,
    cuts: EX.cuts,
    qt: EX.qt,
    streakOk: EX.streakOk,
    streakWrong: EX.streakWrong,
    i: EX.i,
    left: EX.left,
    mode: EX.mode,
    label: EX.label,
    cfg: EX.cfg,
    elapsed: EX.elapsed
  };
}

function startClock(){ stopClock(); EX.tid=setInterval(clock,1000); }
function stopClock(){ if(EX.tid)clearInterval(EX.tid); EX.tid=null; }
function clock(){
  if(!EX.live||EX.paused||document.hidden)return;
  EX.elapsed++;
  if(EX.qt) EX.qt[EX.i] = (EX.qt[EX.i] || 0) + 1; // เวลาที่อยู่กับข้อที่เปิดอยู่
  if(EX.cfg.minutes)EX.left--;
  const t=$('#tmr');
  if(t){ 
    t.querySelector('span').textContent=EX.cfg.minutes?mmss(EX.left):mmss(EX.elapsed);
    t.classList.toggle('warn',!!EX.cfg.minutes&&EX.left<=60); 
  }
  if(EX.cfg.minutes&&EX.left<=0){toast('หมดเวลา','err');submitExam(true);}
}


function renderRun(){
  if(!EX.qs.length){ $('#view').innerHTML=`<div class="card empty"><i data-lucide="timer"></i><div>ยังไม่มีการสอบ</div>
    <button class="btn" style="margin-top:12px" data-go="exam">เริ่มสอบ</button></div>`;icons();return;}
  $('#view').innerHTML=`
  <div class="rtop">
    <button class="ib" id="rExit" title="ออก"><i data-lucide="x"></i></button>
    <div class="timer" id="tmr"><i data-lucide="clock"></i><span>${EX.cfg.minutes?mmss(EX.left):mmss(EX.elapsed)}</span></div>
    ${EX.cfg.minutes?`<button class="ib" id="rPause" title="พัก"><i data-lucide="pause"></i></button>`:''}
    <button class="ib" id="rEditQ" title="แก้ไขข้อสอบ"><i data-lucide="pencil"></i></button>
    <button class="ib star" id="rStar" title="ติดดาว"><i data-lucide="star"></i></button>
    <button class="ib cut" id="rCut" title="ตัดชอยส์"><i data-lucide="scissors"></i></button>
    <span class="tag ${EX.mode==='practice'?'g':'b'}" style="padding:7px 11px">${EX.mode==='practice'?'ฝึก':'สอบ'}</span>
    <button class="ib sp" id="rPal" title="ผังข้อ"><i data-lucide="layout-grid"></i></button>
  </div>
  <div class="bar" style="margin-bottom:14px"><i id="rbar" style="width:0%"></i></div>
  <div class="rgrid">
    <div>
      <div class="card" style="padding:22px" id="qbox"></div>
      <div class="rnav">
        <button class="btn ghost" id="rPrev"><i data-lucide="chevron-left"></i>ก่อนหน้า</button>
        <button class="btn" id="rNext">ถัดไป<i data-lucide="chevron-right"></i></button>
      </div>
      <button class="btn green block" id="rSubmit" style="margin-top:9px"><i data-lucide="send"></i>ส่งคำตอบ</button>
    </div>
    <aside class="card palette">
      <b style="font-size:13.5px">ผังข้อสอบ</b>
      <div class="legend">
        <span><i style="background:var(--surface3)"></i>ยังไม่ตอบ</span>
        <span><i style="background:var(--blue)"></i>ตอบแล้ว</span>
      </div>
      <div class="palgrid" id="pg"></div>
    </aside>
  </div>`;

  $('#rExit').onclick=()=>{ playTone('tap'); go('home'); };
  $('#rPrev').onclick=()=>{ playTone('tap'); jump(EX.i-1); };
  $('#rNext').onclick=()=>{ playTone('tap'); jump(EX.i+1); };
  
  $('#rEditQ').onclick=()=>{
    playTone('tap');
    const q = EX.qs[EX.i];
    qForm(q, () => {
      paintQ();
      toast('อัปเดตแล้ว', 'ok');
    });
  };

  $('#rStar').onclick=()=>{
    playTone('tap');
    const q=EX.qs[EX.i];
    q.star=!q.star; save();
    paintQ();
    toast(q.star?'ติดดาวแล้ว':'ปลดดาวแล้ว');
  };
  $('#rCut').onclick=()=>{
    playTone('tap');
    openCutModal();
  };
  $('#rSubmit').onclick=()=>{ playTone('tap'); confirmSubmit(); };
  $('#rPal').onclick=()=>{ playTone('tap'); palSheet(); };
  if($('#rPause'))$('#rPause').onclick=togglePause;
  paintQ(); icons();
}

function openCutModal(){
  const curCuts = EX.cuts[EX.i] || [];
  const ord = EX.order[EX.i];

  const body = `
    <div style="display:flex;gap:10px;justify-content:center;padding:12px 0">
      ${ord.map((oi, pos)=>{
        const isCut = curCuts.includes(oi);
        return `
          <button class="btn ${isCut?'red':'ghost'}" data-cutitem="${oi}" style="min-width:58px;height:48px;font-size:18px;font-weight:700">
            ${isCut ? '<s>'+LB[pos]+'</s>' : LB[pos]}
          </button>
        `;
      }).join('')}
    </div>
  `;

  openModal('ตัดชอยส์', body, `<button class="btn ghost block" data-close>ปิด</button>`);

  $$('[data-cutitem]').forEach(b => {
    b.onclick = () => {
      playTone('tap');
      const oi = +b.dataset.cutitem;
      let list = EX.cuts[EX.i] || [];
      if(list.includes(oi)){
        list = list.filter(x => x !== oi);
      } else {
        list.push(oi);
        if(EX.ans[EX.i] === oi) EX.ans[EX.i] = null;
      }
      EX.cuts[EX.i] = list;
      persist();
      paintQ();
      openCutModal();
    };
  });
}

function togglePause(){
  playTone('tap');
  EX.paused=!EX.paused;
  const b=$('#rPause'); if(b)b.innerHTML=`<i data-lucide="${EX.paused?'play':'pause'}"></i>`;
  $('#qbox').style.display=EX.paused?'none':'block';
  toast(EX.paused?'พักสอบ':'ทำต่อ'); icons();
}

function paintQ(){
  const q = EX.qs[EX.i], ord = EX.order[EX.i], picked = EX.ans[EX.i];
  const isInstant = (EX.mode === 'practice');
  const revealed = isInstant && picked !== null;
  const qImgsJson = JSON.stringify(q.qImgs || []).replace(/"/g, '&quot;');
  const eImgsJson = JSON.stringify(q.eImgs || []).replace(/"/g, '&quot;');
  const cuts = EX.cuts[EX.i] || [];

  const qw = q.qImgW ? `${q.qImgW}px` : '260px';
  const cw = q.cImgW ? `${q.cImgW}px` : '110px';
  const ew = q.eImgW ? `${q.eImgW}px` : '240px';

  let layoutClass = 'opts-vertical';
  if (q.cType === 'horizontal') layoutClass = 'opts-horizontal';
  else if (q.cType === 'box') layoutClass = 'opts-boxed';

  $('#rbar').style.width = ((EX.i + 1) / EX.qs.length * 100) + '%';
  $('#qbox').innerHTML = `
    <div class="row" style="gap:7px;flex-wrap:wrap">
      <span class="tag b">ข้อ ${EX.i+1} / ${EX.qs.length}</span>
      <span class="tag">${esc(q.cat)}</span>
      <span class="dsel" role="group" aria-label="ระดับความยากของข้อนี้">${DIFFS.map((d, i) => `<button type="button" class="d${i} ${(q.d||'ง่าย')===d?'on':''}" data-setd="${d}">${d}</button>`).join('')}</span>
      ${q.star?'<span class="tag o" style="background:#fff6e0;color:#f5a524"><i data-lucide="star" style="width:11px;height:11px"></i>ดาว</span>':''}
      ${cuts.length ? `<span class="tag r"><i data-lucide="scissors" style="width:11px;height:11px"></i>ตัด ${cuts.length}</span>` : ''}
    </div>
    <div class="rq">${q.q}</div>
    ${(q.qImgs && q.qImgs.length) ? `
      <div class="q-media-box">
        ${q.qImgs.map((img, idx) => `<img src="${img}" class="q-media-img" style="--img-w:${qw}" onclick="openLightboxGallery(${qImgsJson}, ${idx})">`).join('')}
      </div>` : ''}
    <div id="opts" class="${layoutClass}">
      ${ord.map((oi, pos) => {
        let cls = picked === oi ? 'on' : '';
        const isCut = cuts.includes(oi);
        if(isCut) cls += ' is-cut';
        if(revealed){
          if(oi === q.a) cls = 'right';
          else if(oi === picked) cls = 'bad';
        }
        const cImg = q.cImgs && q.cImgs[oi];
        const hasChoiceExp = q.cExps && q.cExps[oi] && q.cExps[oi].trim();

        return `<div class="opt-wrap">
          <button class="opt ${cls}" data-o="${oi}" ${(revealed || isCut)?'disabled':''}>
            <div class="opt-header">
              <span class="k">${LB[pos]}</span>
              <div style="flex:1;min-width:0">
                ${q.cType === 'box' ? `<div class="opt-boxed-text">${q.c[oi]}</div>` : `<span class="opt-text">${q.c[oi]}</span>`}
              </div>
            </div>
            ${cImg ? `
              <div style="margin-left:43px;margin-top:6px">
                <img src="${cImg}" class="img-thumb" style="width:${cw};height:auto;max-height:180px" onclick="event.stopPropagation();openLightboxGallery(['${cImg}'], 0)">
              </div>` : ''}
          </button>
          ${(revealed && hasChoiceExp) ? `
            <button type="button" class="btn-why-round" data-toggleexp="${oi}" title="ดูเหตุผล">
              <i data-lucide="help-circle"></i>
            </button>
            <div class="opt-exp-box" id="exp_box_${oi}">
              <div style="display:flex;align-items:baseline;flex-wrap:wrap;gap:6px">
                <span style="color:#e57373;font-weight:600;flex-shrink:0">เหตุผล :</span>
                <span style="color:var(--text);flex:1;min-width:0">${(q.cExps[oi]||'').trim()}</span>
              </div>
            </div>` : ''}
        </div>`;
      }).join('')}      
    </div>
    ${revealed ? `       
      <div class="fb ${picked===q.a?'ok':'no'}">
        <b>${picked===q.a?'✓ ถูกต้อง':'✗ เฉลย: '+LB[q.a]+'. '}</b>
        <span style="font-weight:500">${q.c[q.a]}</span>
        ${q.e ? `<div style="margin-top:8px;white-space:pre-wrap;line-height:1.6;border-left:3px solid currentColor;padding-left:10px;background:rgba(0,0,0,.03);border-radius:0 8px 8px 0;padding-top:4px;padding-bottom:4px"><i data-lucide="lightbulb" class="ico"></i> ${q.e}</div>` : ''}
        ${(q.eImgs && q.eImgs.length) ? `
          <div class="q-media-box" style="margin-top:10px">
            ${q.eImgs.map((img, idx) => `<img src="${img}" class="q-media-img" style="--img-w:${ew}" onclick="openLightboxGallery(${eImgsJson}, ${idx})">`).join('')}
          </div>` : ''}
      </div>` : ''}`;

  $$('#opts .opt:not(.is-cut)').forEach(b => b.onclick = () => pick(+b.dataset.o));
  // ตั้งระดับความยากของข้อนี้เองระหว่างทำ (ระบบปรับอัตโนมัติจะเริ่มนับใหม่จากค่าที่ตั้ง)
  $$('[data-setd]').forEach(b => b.onclick = () => {
    q.d = b.dataset.setd;
    const st = S.qstat[q.id]; if(st){ st.streakOk = 0; st.streakBad = 0; }
    save();
    $$('[data-setd]').forEach(x => x.classList.toggle('on', x === b));
  });
  $$('[data-toggleexp]').forEach(b => {
    b.onclick = (e) => {
      e.stopPropagation();
      playTone('tap');
      const box = $('#exp_box_' + b.dataset.toggleexp);
      if(box){
        const isOpen = box.classList.toggle('open');
        b.classList.toggle('active', isOpen);
      }
    };
  });

  const sb = $('#rStar'); if(sb) sb.classList.toggle('on', !!q.star);
  const cb = $('#rCut'); if(cb) cb.classList.toggle('on', cuts.length > 0);
  $('#rPrev').disabled = EX.i === 0;
  $('#rNext').innerHTML = EX.i === EX.qs.length - 1 ? 'ข้อสุดท้ายแล้ว' : 'ถัดไป<i data-lucide="chevron-right"></i>';
  $('#rNext').disabled = EX.i === EX.qs.length - 1;
  paintPal($('#pg'));
  icons();
}

function paintPal(box){
  if(!box)return;
  box.innerHTML=EX.qs.map((_,i)=>
    `<button class="pal ${EX.ans[i]!==null?'done':''} ${i===EX.i?'cur':''}" data-p="${i}">${i+1}</button>`).join('');
  $$('[data-p]',box).forEach(b=>b.onclick=()=>{ playTone('tap'); jump(+b.dataset.p); closeModal(); });
}

function jump(i){ if(i<0||i>=EX.qs.length)return; EX.i=i; persist(); paintQ(); }

function pick(oi){
  if(EX.paused) return;
  const cuts = EX.cuts[EX.i] || [];
  if(cuts.includes(oi)) return;

  const q = EX.qs[EX.i];
  const isInstant = (EX.mode === 'practice');

  if(isInstant && EX.ans[EX.i] !== null) return;
  EX.ans[EX.i] = oi; 
  persist();

  if(isInstant){
    const ok = (oi === q.a);
    const st = S.qstat[q.id] = S.qstat[q.id] || {seen:0, ok:0, bad:0, streakOk:0, streakBad:0};
    st.seen++; 
    ok ? st.ok++ : st.bad++;
    
    evaluateAdaptiveDifficulty(q.id, ok);

    const d = day(); 
    d.answered++; 
    if(ok) d.correct++;
    d.todayCat[q.cat] = (d.todayCat[q.cat] || 0) + 1;

    paintQ();
    playTone(ok ? 'ok' : 'wrong');

    clearTimeout(autoNextTimer);
    if(S.settings.autoNext && EX.i < EX.qs.length - 1) {
      autoNextTimer = setTimeout(() => jump(EX.i + 1), 1200);
    }
  } else {
    playTone('pick');
    const optButtons = document.querySelectorAll('#opts .opt');
    optButtons.forEach(btn => {
      btn.classList.toggle('on', +btn.dataset.o === oi);
    });

    const palBtn = document.querySelector(`.palgrid [data-p="${EX.i}"]`);
    if(palBtn) palBtn.classList.add('done');

    clearTimeout(autoNextTimer);
    if(S.settings.autoNext && EX.i < EX.qs.length - 1) {
      autoNextTimer = setTimeout(() => jump(EX.i + 1), 200);
    }
  }
}

function palSheet(){
  openModal('ผังข้อสอบ',`<div class="legend" style="margin-top:0">
      <span><i style="background:var(--surface3)"></i>ยังไม่ตอบ</span>
      <span><i style="background:var(--blue)"></i>ตอบแล้ว</span></div>
    <div class="palgrid" id="pg2" style="max-height:45vh;grid-template-columns:repeat(6,1fr)"></div>`,
    `<button class="btn ghost" data-close>ปิด</button>`);
  paintPal($('#pg2'));
}

async function confirmSubmit(){
  const total = EX.qs.length;
  const answered = EX.ans.filter(a => a !== null).length;
  const blank = total - answered;
  const isComplete = (blank === 0);

  const body = `
    <div style="text-align:center;padding:12px 0">
      <div class="submit-check-icon">
       <i data-lucide="send"></i>
      </div>
      
      <div id="procStatusTxt" style="font-size:16px;font-weight:700;margin-top:8px;color:var(--text)">
        ตรวจเช็กความถูกต้องเรียบร้อย!
      </div>

      <div style="background:var(--surface2);border:1px solid var(--line);border-radius:14px;padding:12px 18px;margin:16px auto;display:inline-block;text-align:left;box-shadow:var(--sh1)">
        <div style="font-weight:700;color:var(--text);margin-bottom:3px;font-size:14.5px">
          สถานะ: ${isComplete ? '<span style="color:var(--green)">✓ ทำครบทุกข้อ</span>' : `<span style="color:var(--orange)">⚠️️ ยังไม่ตอบ ${blank} ข้อ</span>`}
        </div>
        <small style="color:var(--muted);font-size:12.5px">ตอบแล้ว ${answered} / ${total} ข้อ</small>
      </div>
    </div>
  `;

  openModal('สรุปส่งข้อสอบ', body, `
    <button class="btn ghost" id="btnCancelSubmit">กลับ</button>
    <button class="btn green" id="btnConfirmSubmit"><i data-lucide="check"></i>ยืนยันส่ง</button>
  `);

  $('#btnCancelSubmit').onclick = () => { playTone('tap'); closeModal(); };
  $('#btnConfirmSubmit').onclick = () => {
    playTone('tap');
    submitExam(false);
  };
}

function submitExam(timeup){
  stopClock(); EX.live=false;
  const total=EX.qs.length; let correct=0, byCat={}, wrong=[];
  const d=day();

  EX.qs.forEach((q,i)=>{
    byCat[q.cat]=byCat[q.cat]||{t:0,c:0,s:0}; byCat[q.cat].t++; byCat[q.cat].s+=(EX.qt&&EX.qt[i])||0;
    const a=EX.ans[i];
    if(EX.mode!=='practice'){
      const st=S.qstat[q.id]=S.qstat[q.id]||{seen:0,ok:0,bad:0,streakOk:0,streakBad:0};
      if(a!==null){
        st.seen++; 
        const isCorrect = (a===q.a);
        isCorrect?st.ok++:st.bad++;
        evaluateAdaptiveDifficulty(q.id, isCorrect);
        d.todayCat[q.cat] = (d.todayCat[q.cat] || 0) + 1;
      }
    }
    if(a===q.a){correct++;byCat[q.cat].c++;}
    else wrong.push({id:q.id,picked:a});
  });

  const blank=EX.ans.filter(a=>a===null).length;
  if(EX.mode!=='practice'){ d.answered+=total-blank; d.correct+=correct; }
  
  const trackKey = curTrackKey();
  const evalResult = evaluateTrack({correct, total, byCat}, trackKey);

  S.results.unshift({
    id:uid(),date:new Date().toISOString(),label:EX.label,mode:EX.mode,
    total,correct,wrong:total-correct-blank,blank,used:EX.elapsed,byCat,wrongList:wrong,
    cfg:EX.cfg,timeup:!!timeup,trackKey,evalResult
  });
  S.results=S.results.slice(0,60);
  S.session=null; 
  save();
  
  playTone('submit');

  openModal('สรุปส่งข้อสอบ', `
    <div style="text-align:center;padding:24px 10px;">
      <div style="font-size:16px;font-weight:700;margin-bottom:8px">กำลังประมวลผลคำตอบ...</div>
      <div style="height:6px;width:80%;max-width:240px;background:var(--surface3);border-radius:10px;margin:12px auto;overflow:hidden">
       <div id="progBar" style="height:100%;width:0%;background:var(--blue);border-radius:10px;"></div>
      </div>
      <small style="color:var(--text2);font-size:12px">กำลังตรวจนับและสรุปผลคะแนน...</small>
    </div>
  `, '');

  setTimeout(() => {
    closeModal();
    go('result');
    toast('ส่งแล้ว', 'ok');
  }, 2400);
}

document.addEventListener('keydown',e=>{
  if(PAGE!=='run'||!EX.live||$('#mask').classList.contains('on')||$('#imgEditorMask').classList.contains('on')||$('#rteMask').classList.contains('on'))return;
  if(['1','2','3','4'].includes(e.key)){
    const pos=+e.key-1, ord=EX.order[EX.i]; if(ord&&ord[pos]!==undefined)pick(ord[pos]);
  }
  if(e.key==='ArrowRight'){ playTone('tap'); jump(EX.i+1); }
  if(e.key==='ArrowLeft'){ playTone('tap'); jump(EX.i-1); }
  if(e.key.toLowerCase()==='e'){
    playTone('tap');
    const q = EX.qs[EX.i];
    qForm(q, () => { paintQ(); toast('อัปเดตแล้ว', 'ok'); });
  }
  if(e.key.toLowerCase()==='c'){
    playTone('tap');
    openCutModal();
  }
});


function getSmartExamLabel(x) {
  if (x.mode === 'wrong' || (x.label && x.label.includes('ข้อผิด'))) {
    return `ทบทวนข้อผิด (${x.total} ข้อ)`;
  }
  if (x.total === 150) {
    return 'จำลองสอบจริง (150 ข้อ)';
  }
  if (x.subject || (x.label && !x.label.startsWith('สอบ '))) {
    const baseName = x.subject || x.label.replace(/\s*\(ชุด\s*\d+\)/, '');
    const setNum = (x.label && x.label.match(/\(ชุด\s*\d+\)/)) ? ` ${x.label.match(/\(ชุด\s*\d+\)/)[0]}` : '';
    return `${baseName}${setNum} (${x.total} ข้อ)`;
  }
  return `ชุดทดสอบสุ่ม (${x.total} ข้อ)`;
}

let histLimit = 5;
function renderResult(){
  const r=S.results[0];
  if(!r){
    $('#view').innerHTML=`<div class="card empty"><i data-lucide="bar-chart-3"></i>
      <div>ยังไม่มีผลสอบ</div><button class="btn" style="margin-top:14px" data-go="exam"><i data-lucide="play"></i>เริ่มสอบ</button></div>`;
    icons();return;
  }
  const pct=Math.round(r.correct/r.total*100);
  const C=2*Math.PI*82;
  const trackKey = r.trackKey || curTrackKey();
  const ev = evaluateTrack(r, trackKey);
  const tr = getTrack(trackKey);
  const catRow = c => {
    const v = r.byCat[c]; const p = Math.round(v.c / v.t * 100), cc = p >= ev.passPct ? 'var(--green)' : 'var(--red)';
    const q = tr.quota[c];
    const sec = v.s != null ? Math.round(v.s / v.t) : null;
    return `<div class="crow"><div class="lb">${esc(c)}${q && v.t < q ? ` <small style="color:var(--muted)">(${v.t}/${q})</small>` : ''}${sec != null ? `<small class="pace ${sec > pace ? 'slow' : ''}">${sec} วิ/ข้อ</small>` : ''}</div>
      <div class="bar" style="height:10px"><i style="width:${p}%;background:${cc}"></i></div>
      <div class="vl" style="color:${cc}">${v.c}/${v.t} (${p}%)</div></div>`;
  };
  // ความเร็วต่อข้อ เทียบกับเวลาสนามจริงของสาย (เช่น 180 นาที / 170 ข้อ ≈ 64 วิ)
  const pace = tr.minutes && tr.quotaTotal ? Math.round(tr.minutes * 60 / tr.quotaTotal) : 60;
  const hasPace = Object.values(r.byCat).some(v => v.s != null);
  const avg = hasPace ? Math.round(Object.values(r.byCat).reduce((a, v) => a + (v.s || 0), 0) / r.total) : 0;
  const paceHtml = hasPace ? `<div class="pace-sum ${avg > pace ? 'slow' : ''}"><i data-lucide="timer"></i>เฉลี่ย <b>${avg} วิ/ข้อ</b> · สนามจริงควรไม่เกิน ${pace} วิ/ข้อ</div>` : '';
  let scoreSectionHtml;
  if(ev.rule === 'parts'){
    const inParts = new Set(ev.parts.flatMap(x => x.cats));
    const others = Object.keys(r.byCat).filter(c => !inParts.has(c));
    scoreSectionHtml = `<div class="card">${ev.parts.map((pt, i) => `
      <div class="part-header ${i ? 'p2' : ''}"><span>${esc(pt.name)}</span>
        <span style="color:${pt.T ? (pt.pass ? 'var(--green)' : 'var(--red)') : 'var(--muted)'}">${pt.T ? `${pt.C}/${pt.T} (${pt.pct}%)` : 'ยังไม่ได้ทำ'}</span></div>
      ${pt.cats.filter(c => r.byCat[c]).map(catRow).join('') || '<div style="font-size:12px;color:var(--muted);padding:4px 0">ไม่มีวิชาในภาคนี้ในชุดนี้</div>'}`).join('')}
      ${others.length ? `<div class="part-header p2"><span>วิชาที่ไม่นับภาค</span></div>${others.map(catRow).join('')}` : ''}
      <div style="font-size:12px;color:var(--muted);margin-top:10px">เกณฑ์สาย${esc(tr.label)}: ${esc(tr.ruleDesc)}</div></div>`;
  } else {
    scoreSectionHtml = `<div class="card">
      <div class="part-header"><span>คะแนนรวม</span><span style="color:${ev.pass ? 'var(--green)' : 'var(--red)'}">${r.correct}/${r.total} (${ev.overall}%)</span></div>
      ${Object.keys(r.byCat).map(catRow).join('')}
      <div style="font-size:12px;color:var(--muted);margin-top:10px">เกณฑ์สาย${esc(tr.label)}: ${esc(tr.ruleDesc)} · รายวิชาเป็นข้อมูลประกอบ</div></div>`;
  }
  scoreSectionHtml = scoreSectionHtml.replace('<div class="card">', '<div class="card">' + paceHtml);

  $('#view').innerHTML=`
  <div class="card" style="text-align:center;padding:26px 18px">
    <div class="sring">
      <svg viewBox="0 0 196 196"><circle class="bgc" cx="98" cy="98" r="82"/>
        <circle class="fgc" id="sr" cx="98" cy="98" r="82" stroke="${ev.pass ? 'var(--green)' : 'var(--red)'}" stroke-dasharray="${C}" stroke-dashoffset="${C}"/></svg>
      <div class="txt"><b>${r.correct}<span style="font-size:20px;color:var(--muted)">/${r.total}</span></b><span>${pct}%</span></div>
    </div>
    
    <div>
      <span class="pass-badge ${ev.pass?'pass':'fail'}">
        <i data-lucide="${ev.pass?'check-circle-2':'alert-octagon'}"></i>
        ${ev.pass ? 'ผ่าน' : 'ตก'}
      </span>
    </div>
    <h2 style="margin-top:10px;color:${ev.pass?'var(--green)':'var(--red)'}">${esc(ev.reason)}</h2>
    ${ev.note ? `<div style="font-size:12px;color:var(--orange);margin-top:2px">${esc(ev.note)}</div>` : ''}
    <div style="font-size:12.5px;color:var(--muted);margin-top:4px">
      สาย${esc(ev.trackName)} · ${new Date(r.date).toLocaleString('th-TH',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}
      ${r.timeup?' · หมดเวลา':''}
    </div>

    <div class="grid g4" style="margin-top:18px">
      <div class="mini"><b style="color:var(--green)">${r.correct}</b><span>ถูก</span></div>
      <div class="mini"><b style="color:var(--red)">${r.wrong}</b><span>ผิด</span></div>
      <div class="mini"><b style="color:var(--muted)">${r.blank}</b><span>ไม่ตอบ</span></div>
      <div class="mini"><b>${mmss(r.used)}</b><span>เวลา</span></div>
    </div>
    <div class="grid g3 keep" style="margin-top:16px">
      <button class="btn orange" id="rvWrong" ${r.wrongList.length?'':'disabled'}><i data-lucide="repeat"></i>ทวนข้อผิด</button>
      <button class="btn ghost" id="rvAgain"><i data-lucide="rotate-ccw"></i>สอบใหม่</button>
      <button class="btn ghost" data-go="home"><i data-lucide="home"></i>หน้าแรก</button>
    </div>
  </div>

  <div class="sec"><i data-lucide="pie-chart"></i>คะแนนตามวิชา</div>
  ${scoreSectionHtml}

  <div class="sec"><i data-lucide="history"></i>ประวัติสอบ
    ${S.results.length>1?'<span class="more" id="clrHist">ล้าง</span>':''}
  </div>
  <div class="card">
    ${S.results.slice(0, histLimit).map((x)=>{     
      const p = Math.round(x.correct/x.total*100);
      const pass = x.evalResult ? x.evalResult.pass : p >= 60;
      return `
        <div class="hrow" data-showdetail="${x.id}">
          <span class="tag ${pass?'g':'r'}" style="min-width:44px;justify-content:center">${pass?'ผ่าน':'ตก'}</span>
          <div style="flex:1;min-width:0">
            <div style="font-size:13.5px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(getSmartExamLabel(x))}</div>
            <div style="font-size:11.5px;color:var(--muted)">${x.correct}/${x.total} (${p}%) · ${mmss(x.used)}</div>
          </div>
          <span style="font-size:11.5px;color:var(--muted)">${new Date(x.date).toLocaleDateString('th-TH',{day:'numeric',month:'short'})}</span>
          <i data-lucide="chevron-right" style="width:16px;height:16px;color:var(--muted)"></i>
          <button class="ib sm" data-hdrop="${x.id}" title="ลบ" onclick="event.stopPropagation()"><i data-lucide="trash-2"></i></button>
        </div>
      `;
    }).join('')}
 </div>
${S.results.length > 5 ? `
  <div style="display:flex;gap:8px;margin-top:10px">
    ${histLimit < S.results.length ? `
      <button class="btn ghost block sm" id="btnMoreHist" style="flex:1">
      <i data-lucide="chevron-down"></i>ดูเพิ่ม (+${Math.min(5, S.results.length - histLimit)})
      </button>
    ` : ''}
    ${histLimit > 5 ? `
      <button class="btn ghost block sm" id="btnCollapseHist" style="flex:1">
        <i data-lucide="chevron-up"></i>พับเก็บ
      </button>
    ` : ''}
  </div>
` : ''}
`;


  setTimeout(()=>{const el=$('#sr'); if(el)el.style.strokeDashoffset=C-C*pct/100;},80);
  
  $('#rvWrong').onclick=()=>{ 
    playTone('tap'); 
    startExam({ids:r.wrongList.map(w=>w.id),count:r.wrongList.length,minutes:0,mode:'practice',label:'ทวนข้อผิด'}); 
  };
  
  $('#rvAgain').onclick=()=>{ 
    playTone('tap'); 
    startExam({...r.cfg,label:r.label}); 
  };

  $$('[data-showdetail]').forEach(item=>{
    item.onclick = () => {
      playTone('tap');
      openRoundDetail(item.dataset.showdetail);
    };
  });

  $$('[data-hdrop]').forEach(b=>b.onclick=(e)=>{ 
    e.stopPropagation();
    playTone('tap'); 
    S.results=S.results.filter(x=>x.id!==b.dataset.hdrop);
    save();
    renderResult();
    toast('ลบแล้ว','ok');
  });

  if($('#clrHist'))$('#clrHist').onclick=async()=>{
    if(await ask('ล้างประวัติ?','ผลสอบย้อนหลังจะถูกลบ (ย้อนกลับได้)','ล้าง')){
      snapshotUndo('ล้างประวัติผลสอบ');
      S.results=[];
      save();
      renderResult();
      syncChrome();
      undoToast('ล้างประวัติแล้ว');
    }
  };
  icons();
    const bMore = $('#btnMoreHist');
  if(bMore) bMore.onclick = () => { histLimit += 5; renderResult(); };

  const bLess = $('#btnCollapseHist');
  if(bLess) bLess.onclick = () => { histLimit = 5; renderResult(); };
}
