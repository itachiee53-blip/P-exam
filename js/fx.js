/* NEO FX — เอฟเฟกต์ตกแต่งล้วนๆ ไม่ยุ่งกับข้อมูล/ตรรกะของแอป */
(()=>{
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const LIT='.card,.week-card,.mastery-card,.resume-card,.setcard,.quick,.qrow,.mastery-item-v2,.course-card';
  const RIPPLE='.btn,.ib,.nav,.bn,.chip,.quick,.opt,.pal,.srs-btn,.picker-item,.fab';

  // spotlight ตามนิ้ว/เมาส์
  let lit=null;
  if(matchMedia('(hover:hover)').matches)
  document.addEventListener('pointermove',e=>{
    const el=e.target.closest&&e.target.closest(LIT);
    if(lit&&lit!==el)lit.classList.remove('neo-lit');
    lit=el;
    if(!el)return;
    const r=el.getBoundingClientRect();
    el.style.setProperty('--mx',(e.clientX-r.left)+'px');
    el.style.setProperty('--my',(e.clientY-r.top)+'px');
    el.classList.add('neo-lit');
  },{passive:true});
  document.addEventListener('pointerleave',()=>{if(lit)lit.classList.remove('neo-lit');lit=null;});

  // ripple ตอนกด
  document.addEventListener('pointerdown',e=>{
    if(reduce)return;
    const el=e.target.closest&&e.target.closest(RIPPLE);
    if(!el||el.disabled)return;
    const r=el.getBoundingClientRect(), s=Math.max(r.width,r.height)*2.2;
    const cs=getComputedStyle(el);
    if(cs.position==='static')el.style.position='relative';
    const w=document.createElement('span');
    w.className='neo-rip-wrap';
    const d=document.createElement('span');
    d.className='neo-ripple';
    d.style.cssText=`width:${s}px;height:${s}px;left:${e.clientX-r.left-s/2}px;top:${e.clientY-r.top-s/2}px`;
    w.appendChild(d);requestAnimationFrame(()=>el.appendChild(w));
    setTimeout(()=>w.remove(),650);
  },{passive:true});

  // แอนิเมชันตอนเปลี่ยนหน้า (เฉพาะตอนกดเมนู ไม่เล่นซ้ำทุกครั้งที่หน้า re-render)
  let enterT;
  const enter=()=>{
    if(reduce)return;
    document.body.classList.remove('neo-enter');void document.body.offsetWidth;
    document.body.classList.add('neo-enter');
    clearTimeout(enterT);enterT=setTimeout(()=>document.body.classList.remove('neo-enter'),900);
  };
  document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('[data-go]'))enter();},true);
  window.addEventListener('load',enter);

  // ตัวเลขวิ่งขึ้นบนการ์ดสถิติ
  const countUp=el=>{
    if(el.dataset.neoCounted)return;
    const m=el.textContent.trim().match(/^(\d[\d,]*)(%?)$/);
    if(!m)return;
    el.dataset.neoCounted='1';
    const end=parseInt(m[1].replace(/,/g,''),10), suf=m[2];
    if(!end||reduce)return;
    const t0=performance.now(), dur=900;
    const tick=t=>{
      const p=Math.min(1,(t-t0)/dur), v=Math.round(end*(1-Math.pow(1-p,3)));
      el.textContent=v.toLocaleString()+suf;
      if(p<1)requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const view=document.getElementById('view');
  if(view)new MutationObserver(()=>{
    if(!document.body.classList.contains('neo-enter'))return;
    view.querySelectorAll('.stat b,#ringTxt,.mini b,.sring .txt b,.neo-mini-grid b').forEach(countUp);
  }).observe(view,{childList:true});

  // แป้นพิมพ์บังช่องกรอก: ติดตามพื้นที่ที่มองเห็นจริง แล้วเลื่อนช่องที่กดมาไว้กลางจอ
  const vv=window.visualViewport, rs=document.documentElement.style;
  let fq=0,lh=-1,lt=-1;
  const fit=()=>{if(!vv||fq)return;fq=requestAnimationFrame(()=>{fq=0;const h=Math.round(vv.height),t=Math.round(vv.offsetTop);if(h===lh&&t===lt)return;lh=h;lt=t;rs.setProperty('--neo-vvh',h+'px');rs.setProperty('--neo-vvt',t+'px');});};
  if(vv){vv.addEventListener('resize',fit);vv.addEventListener('scroll',fit);fit();}
  const show=f=>{if(!f||!f.isConnected)return;const r=f.getBoundingClientRect(),h=vv?vv.height+vv.offsetTop:innerHeight;if(r.top>=(vv?vv.offsetTop:0)&&r.bottom<=h)return;f.scrollIntoView({block:'center',behavior:'smooth'});};
  document.addEventListener('focusin',e=>{
    const f=e.target;
    if(!f.matches||!f.matches('input:not([type=range]):not([type=file]),textarea,select,[contenteditable="true"]'))return;
    setTimeout(()=>show(f),400);
  });
  if(vv)vv.addEventListener('resize',()=>{const f=document.activeElement;if(f&&f.matches&&f.matches('input,textarea,[contenteditable="true"]'))show(f);});

  // ปฏิทินย้อนหลัง (อ่านจาก S.stats.days อย่างเดียว ไม่แก้ข้อมูล)
  const TH_M=['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];
  const TH_MS=['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
  const TH_D=['จ','อ','พ','พฤ','ศ','ส','อา'];
  const TH_DL=['อาทิตย์','จันทร์','อังคาร','พุธ','พฤหัสบดี','ศุกร์','เสาร์'];
  const dayData=k=>S.stats.days[k]||{answered:0,correct:0,minutes:0,todayCat:{}};
  const kDate=k=>{const [y,m,d]=k.split('-').map(Number);return new Date(y,m-1,d);};
  const shortT=m=>m>=60?`${Math.floor(m/60)} ชม.`:`${m} น.`;
  const heat=n=>n<=0?0:n<10?1:n<30?2:n<60?3:4;
  const monthSum=(y,m)=>{
    const pre=`${y}-${String(m+1).padStart(2,'0')}-`;let a=0,c=0,min=0,d=0;
    for(const k in S.stats.days){if(!k.startsWith(pre))continue;const x=S.stats.days[k];a+=x.answered||0;c+=x.correct||0;min+=x.minutes||0;if(x.answered>0)d++;}
    return {a,c,min,d};
  };
  const cal={y:0,m:0,sel:'',mode:'month'};
  let calSwiped=false;
  const calEl=()=>{
    let el=document.getElementById('neoCal');
    if(el)return el;
    el=document.createElement('div');el.id='neoCal';el.className='neo-cal';
    el.innerHTML='<div class="neo-cal-sheet"></div>';
    document.body.appendChild(el);
    el.addEventListener('click',e=>{
      if(calSwiped){calSwiped=false;return;}
      if(e.target===el)return closeCal();
      const b=e.target.closest('[data-cal]');if(!b)return;
      const a=b.dataset.cal;
      if(typeof playTone==='function')playTone('tap');
      if(a==='close')closeCal();
      else if(a==='prev'||a==='next')shiftCal(a==='next'?1:-1);
      else if(a==='mode'){cal.mode=cal.mode==='month'?'year':'month';renderCal();}
      else if(a==='today')openNeoCal();
      else if(a.startsWith('m:')){cal.m=+a.slice(2);cal.mode='month';renderCal();}
      else if(a.startsWith('d:')){cal.sel=a.slice(2);renderCal();}
      else if(a==='more')openDayBreakdownModal({k:cal.sel,lb:TH_D[(kDate(cal.sel).getDay()+6)%7]});
    });
    let sx=0;
    el.addEventListener('pointerdown',e=>{sx=e.clientX;});
    el.addEventListener('pointerup',e=>{
      const dx=e.clientX-sx;
      if(Math.abs(dx)>60&&e.target.closest('.neo-cal-grid,.neo-cal-years')){calSwiped=true;shiftCal(dx<0?1:-1);}
    });
    return el;
  };
  const shiftCal=n=>{
    if(cal.mode==='year')cal.y+=n;
    else{cal.m+=n;if(cal.m<0){cal.m=11;cal.y--;}if(cal.m>11){cal.m=0;cal.y++;}}
    renderCal();
  };
  const dayDetail=k=>{
    if(!k)return '<div class="neo-cal-day empty">แตะวันที่เพื่อดูรายละเอียด</div>';
    const x=dayData(k),dt=kDate(k),n=x.answered||0,ok=x.correct||0;
    const cats=Object.entries(x.todayCat||{}).filter(([,v])=>v>0).sort((a,b)=>b[1]-a[1]);
    return `<div class="neo-cal-day">
      <div class="neo-cal-day-h"><div><b>วัน${TH_DL[dt.getDay()]}ที่ ${dt.getDate()} ${TH_M[dt.getMonth()]} ${dt.getFullYear()+543}</b><small>${n?'สรุปผลวันนี้':'วันนี้ยังไม่ได้ทำข้อสอบ'}</small></div><span class="neo-pill">${n.toLocaleString()} ข้อ</span></div>
      ${n?`<div class="neo-cal-day-stats">
        <div><b>${ok.toLocaleString()}</b><span>ตอบถูก</span></div>
        <div><b>${Math.round(ok/n*100)}%</b><span>ความแม่น</span></div>
        <div><b>${hmin(x.minutes||0)}</b><span>เวลา</span></div>
      </div>
      ${cats.length?`<div class="neo-cal-cats">${cats.map(([cn,v])=>`<span class="tag b">${esc(cn)} · ${v}</span>`).join('')}</div>`:''}
      <button class="btn block" data-cal="more"><i data-lucide="list"></i>ดูแยกรายวิชา</button>`:''}
    </div>`;
  };
  const renderCal=()=>{
    const sh=calEl().querySelector('.neo-cal-sheet'), now=new Date(), todayK=dkey(now);
    let body;
    if(cal.mode==='month'){
      const s=monthSum(cal.y,cal.m), lead=(new Date(cal.y,cal.m,1).getDay()+6)%7, nd=new Date(cal.y,cal.m+1,0).getDate();
      let cells='<span></span>'.repeat(lead);
      for(let d=1;d<=nd;d++){
        const k=dkey(new Date(cal.y,cal.m,d)),n=dayData(k).answered||0;
        cells+=`<button class="neo-cd h${heat(n)}${k===todayK?' today':''}${k===cal.sel?' sel':''}" data-cal="d:${k}"><b>${d}</b>${n?`<small>${n}</small>`:''}</button>`;
      }
      const inMonth=cal.sel.startsWith(`${cal.y}-${String(cal.m+1).padStart(2,'0')}-`);
      body=`<div class="neo-cal-sum">
        <div><b>${s.a.toLocaleString()}</b><span>ข้อที่ทำ</span></div>
        <div><b>${s.a?Math.round(s.c/s.a*100):0}%</b><span>ความแม่น</span></div>
        <div><b>${s.d}</b><span>วันที่ทำ</span></div>
        <div><b>${shortT(s.min)}</b><span>เวลา</span></div>
      </div>
      <div class="neo-cal-grid">${TH_D.map(x=>`<i>${x}</i>`).join('')}${cells}</div>
      <div class="neo-cal-legend">น้อย<span class="h1"></span><span class="h2"></span><span class="h3"></span><span class="h4"></span>มาก</div>
      ${dayDetail(inMonth?cal.sel:'')}`;
    }else{
      const ms=TH_M.map((_,m)=>monthSum(cal.y,m)), max=Math.max(1,...ms.map(s=>s.a));
      const t=ms.reduce((o,s)=>({a:o.a+s.a,c:o.c+s.c,d:o.d+s.d,min:o.min+s.min}),{a:0,c:0,d:0,min:0});
      body=`<div class="neo-cal-sum">
        <div><b>${t.a.toLocaleString()}</b><span>ทั้งปี</span></div>
        <div><b>${t.a?Math.round(t.c/t.a*100):0}%</b><span>ความแม่น</span></div>
        <div><b>${t.d}</b><span>วันที่ทำ</span></div>
        <div><b>${shortT(t.min)}</b><span>เวลา</span></div>
      </div>
      <div class="neo-cal-years">${ms.map((s,m)=>`<button class="neo-cm${cal.y===now.getFullYear()&&m===now.getMonth()?' today':''}" data-cal="m:${m}">
        <b>${TH_MS[m]}</b><small>${s.a.toLocaleString()} ข้อ · ${s.d} วัน</small>
        <span class="neo-cm-bar"><i style="width:${Math.round(s.a/max*100)}%"></i></span></button>`).join('')}</div>`;
    }
    sh.innerHTML=`<div class="neo-cal-grab"></div>
      <div class="neo-cal-top">
        <button class="ib" data-cal="close"><i data-lucide="x"></i></button>
        <button class="neo-cal-title" data-cal="mode">${cal.mode==='month'?TH_M[cal.m]+' ':''}${cal.y+543}<i data-lucide="chevron-down"></i></button>
        <button class="ib" data-cal="prev"><i data-lucide="chevron-left"></i></button>
        <button class="ib" data-cal="next"><i data-lucide="chevron-right"></i></button>
      </div>${body}
      <button class="btn ghost block" data-cal="today" style="margin-top:14px"><i data-lucide="calendar-check"></i>กลับมาวันนี้</button>`;
    if(typeof icons==='function')icons();
  };
  const openNeoCal=window.openNeoCal=()=>{
    const n=new Date();Object.assign(cal,{y:n.getFullYear(),m:n.getMonth(),sel:dkey(n),mode:'month'});
    renderCal();document.body.classList.add('neo-cal-open');requestAnimationFrame(()=>calEl().classList.add('on'));
  };
  const closeCal=()=>{calEl().classList.remove('on');document.body.classList.remove('neo-cal-open');};

  // กองการ์ดหน้าแรก: ปัดซ้าย/ขวาเพื่อสลับการ์ด

  // เอียง 3D การ์ด hero ตามเมาส์ (เฉพาะจอที่มีเมาส์)
  if(matchMedia('(hover:hover)').matches&&!reduce){
    document.addEventListener('pointermove',e=>{
      const h=e.target.closest&&e.target.closest('.hero:not(.neo-dcard)');
      if(!h)return;
      const r=h.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
      h.style.transform=`perspective(1000px) rotateX(${(-y*4).toFixed(2)}deg) rotateY(${(x*5).toFixed(2)}deg)`;
      h.style.transition='transform .1s';
      h.onpointerleave=()=>{h.style.transition='transform .6s cubic-bezier(.2,.9,.2,1)';h.style.transform='';};
    },{passive:true});
  }
})();
