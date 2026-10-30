"use strict";
function renderCards(){
  const L=cPool(); CFF.i=L.length?clamp(CFF.i,0,L.length-1):0;
  const c=L[CFF.i];
  let dueN=0;
  try {
    dueN = S.cards.filter(x=>(x.due||0)<=Date.now()).length;
  } catch(e) { dueN = 0; }

  $('#view').innerHTML=`
  <div class="row" style="gap:8px;flex-wrap:wrap;margin-bottom:12px">
    <div class="chips sc" style="flex:1;min-width:0">
      ${['ทั้งหมด',...S.cats].map(x=>`<button class="chip ${CFF.cat===x?'on':''}" data-cc="${esc(x)}">${esc(x)}</button>`).join('')}
    </div>
    <button class="ib" id="btnCardMenu" title="เมนูจัดการ"><i data-lucide="more-vertical"></i></button>
    <button class="ib" id="cList" title="สลับมุมมอง"><i data-lucide="${CFF.list==='card'?'list':'square'}"></i></button>
  </div>
  <div class="chips" style="margin-bottom:14px">
    ${[['due',`ค้าง (${dueN})`],['all','ทั้งหมด'],['hard','ไม่แม่น']].map(([k,t])=>
      `<button class="chip ${CFF.mode===k?'on':''}" data-cm="${k}">${t}</button>`).join('')}
  </div>

  ${CFF.list==='list' ? listView() : cardView(L,c)}

  <div class="grid g4 keep" style="margin-top:18px;max-width:640px;margin-left:auto;margin-right:auto">
    <div class="card mini"><b style="color:var(--red)">${S.cards.filter(x=>(x.box||0)===0).length}</b><span>ลืม</span></div>
    <div class="card mini"><b style="color:var(--orange)">${S.cards.filter(x=>(x.box||0)===1).length}</b><span>พอได้</span></div>
    <div class="card mini"><b style="color:var(--blue)">${S.cards.filter(x=>(x.box||0)===2).length}</b><span>ดี</span></div>
    <div class="card mini"><b style="color:var(--green)">${S.cards.filter(x=>(x.box||0)>=3).length}</b><span>แม่นยำ</span></div>
  </div>`;

    function cardView(L, c){
    if(!L.length) return `<div class="card empty" style="max-width:640px;margin:0 auto">
      <i data-lucide="layers"></i><div>ไม่มีบัตรจำ</div></div>`;
    const box=(c.box||0);
    const boxLabels = ['ลืม', 'พอได้', 'ดี', 'แม่นยำ'];
    const boxTagCls = ['r', 'o', 'b', 'g'];

    // ตรวจจับว่าข้อความด้านหน้ามีตัวภาษาอังกฤษหรือไม่ เพื่อแสดงปุ่มอ่านออกเสียง
    const isEnglish = /[a-zA-Z]/.test(c.f);

    return `<div class="fstage">
      <div class="row" style="justify-content:space-between;font-size:12.5px;color:var(--muted);margin-bottom:8px">
        <span>${CFF.i+1} / ${L.length}</span>
        <div class="row" style="gap:6px">
          <span class="tag ${boxTagCls[box]||'g'}">${boxLabels[box]||'แม่นยำ'}</span>
        </div>
      </div>
      <div class="bar"><i style="width:${(CFF.i+1)/L.length*100}%"></i></div>
      
      <div class="fcard ${CFF.flip?'flip':''}" id="fc">
        <div class="fin">
          
          <!-- หน้าบัตร (FRONT) -->
          <div class="face front">
            <div class="card-header-row">
              <span class="tag b">${esc(c.cat)}</span>
              ${isEnglish ? `
                <button type="button" class="btn-tts" onclick="event.stopPropagation();speakCard()" title="ฟังเสียงอ่าน">
                  <i data-lucide="volume-2" style="width:18px;height:18px"></i>
                </button>
              ` : '<span></span>'}
            </div>

            <div class="card-body-wrap">
              ${c.fImg && c.fPos !== 'top' ? `<img src="${c.fImg}" class="card-img-preview" onclick="event.stopPropagation();openLightboxGallery(['${c.fImg}'], 0)">` : ''}
              <div class="card-word">${c.f}</div>
              ${c.fImg && c.fPos === 'top' ? `<img src="${c.fImg}" class="card-img-preview" onclick="event.stopPropagation();openLightboxGallery(['${c.fImg}'], 0)">` : ''}
            </div>

            <div class="card-hint-row">
              <i data-lucide="touchpad" style="width:13px;height:13px"></i>
              <span>แตะเพื่อดูคำแปล / ตัวอย่าง</span>
            </div>
          </div>

          <!-- หลังบัตร (BACK) -->
          <div class="face back">
            <div class="card-header-row">
              <span class="tag g"><i data-lucide="check" style="width:11px;height:11px"></i> คำตอบ & คำแปล</span>
              <span style="font-size:11px;color:var(--muted)">SRS กล่องที่ ${box+1}</span>
            </div>

            <div class="card-body-wrap">
              ${c.bImg && c.bPos !== 'top' ? `<img src="${c.bImg}" class="card-img-preview" onclick="event.stopPropagation();openLightboxGallery(['${c.bImg}'], 0)">` : ''}
              <div class="card-def">${c.b}</div>
              ${c.bImg && c.bPos === 'top' ? `<img src="${c.bImg}" class="card-img-preview" onclick="event.stopPropagation();openLightboxGallery(['${c.bImg}'], 0)">` : ''}
            </div>

            <div class="card-hint-row">
              <i data-lucide="rotate-ccw" style="width:13px;height:13px"></i>
              <span>แตะเพื่อพลิกกลับ</span>
            </div>
          </div>

        </div>
      </div>
      
      <!-- ปุ่มประเมินความจำ Spaced Repetition (SRS) -->
      <div class="srs-ctrl">
        <button class="srs-btn l1" data-srs="0">ลืม<small>ทวนวันนี้</small></button>
        <button class="srs-btn l2" data-srs="1">พอได้<small>2 วัน</small></button>
        <button class="srs-btn l3" data-srs="2">ดี<small>5 วัน</small></button>
        <button class="srs-btn l4" data-srs="3">แม่น<small>14 วัน</small></button>
      </div>

      <div class="row" style="justify-content:center;gap:8px;margin-top:14px">
        <button class="ib sm" id="cPrev" title="ก่อนหน้า"><i data-lucide="chevron-left"></i></button>
        <button class="ib sm" id="cShuf" title="สลับ"><i data-lucide="shuffle"></i></button>
        <button class="ib sm" id="cEdit" title="แก้ไข"><i data-lucide="pencil"></i></button>
        <button class="ib sm" id="cDrop" title="ลบ"><i data-lucide="trash-2"></i></button>
        <button class="ib sm" id="cNext" title="ถัดไป"><i data-lucide="chevron-right"></i></button>
      </div>
    </div>`;
  }

  function listView(){
    const L=S.cards.filter(x=>CFF.cat==='ทั้งหมด'||x.cat===CFF.cat);
    if(!L.length)return `<div class="card empty"><i data-lucide="layers"></i><div>ไม่มีบัตร</div></div>`;
    const boxLabels = ['ลืม', 'พอได้', 'ดี', 'แม่นยำ'];
    const boxTagCls = ['r', 'o', 'b', 'g'];
    return L.map(x=>`<div class="qrow"><div class="no">${(x.box||0)+1}</div>
      <div class="body"><div class="qt">${x.f}</div>
        <div style="font-size:13px;color:var(--muted);margin-top:4px;white-space:pre-wrap">${x.b}</div>
        <div class="meta"><span class="tag b">${esc(x.cat)}</span>
          <span class="tag ${boxTagCls[x.box]||'g'}">${boxLabels[x.box]||'แม่นยำ'}</span></div></div>
      <div class="side"><button class="ib sm" data-cedit="${x.id}"><i data-lucide="pencil"></i></button>
        <button class="ib sm" data-cdrop="${x.id}"><i data-lucide="trash-2"></i></button></div></div>`).join('');
  }

  $$('[data-cc]').forEach(b=>b.onclick=()=>{ playTone('tap'); CFF.cat=b.dataset.cc; CFF.i=0; CFF.flip=false; renderCards(); });$$('[data-cm]').forEach(b=>b.onclick=()=>{ playTone('tap'); CFF.mode=b.dataset.cm; CFF.i=0; CFF.flip=false; renderCards(); });$('#cList').onclick=()=>{ playTone('tap'); CFF.list=CFF.list==='card'?'list':'card'; renderCards(); };

  $('#btnCardMenu').onclick = () => {
    playTone('tap');
    const curCat = CFF.cat;
    const catCardCount = curCat === 'ทั้งหมด' ? S.cards.length : S.cards.filter(x => x.cat === curCat).length;
    
    const body = `
      <div style="display:flex;flex-direction:column;gap:8px">
        <button class="picker-item" id="mImport">
          <div class="row" style="gap:10px">
            <i data-lucide="clipboard-list" style="width:18px;height:18px;color:var(--blue)"></i>
            <span>นำเข้าชุดบัตรจำ</span>
          </div>
        </button>
        <button class="picker-item" id="mDeleteChoice" style="color:var(--red)">
          <div class="row" style="gap:10px">
            <i data-lucide="trash-2" style="width:18px;height:18px;color:var(--red)"></i>
            <span>ลบบัตรจำทั้งหมด</span>
          </div>
        </button>
      </div>
    `;

    openModal('จัดการบัตรจำ', body, `<button class="btn ghost block" data-close>ปิด</button>`);

    $('#mImport').onclick = () => {
      closeModal();
      bulkCardForm();
    };

    $('#mDeleteChoice').onclick = () => {
      playTone('tap');
      const delBody = `
        <div style="display:flex;flex-direction:column;gap:8px">
          ${curCat !== 'ทั้งหมด' ? `
            <button class="picker-item" id="mDelCurCat" style="color:var(--red)">
              <div style="text-align:left">
                <b>ลบเฉพาะหมวด "${esc(curCat)}"</b>
                <small style="display:block;color:var(--muted)">มีทั้งหมด ${catCardCount} ใบ</small>
              </div>
            </button>
          ` : ''}
          <button class="picker-item" id="mDelSelectCat">
            <div style="text-align:left">
              <b>เลือกหมวดวิชาที่จะลบ</b>
              <small style="display:block;color:var(--muted)">เลือกวิชาที่ต้องการลบ</small>
            </div>
          </button>
          <button class="picker-item" id="mDelAll" style="color:var(--red);border-color:var(--red-2);background:var(--red-2)">
            <div style="text-align:left">
              <b>ลบบัตรจำทุกวิชาทั้งหมด (${S.cards.length} ใบ)</b>
              <small style="display:block;color:var(--red)">ล้างบัตรคำในระบบทั้งหมดถาวร</small>
            </div>
          </button>
        </div>
      `;

      openModal('เลือกลักษณะการลบ', delBody, `<button class="btn ghost block" data-close>ยกเลิก</button>`);

      if($('#mDelCurCat')){
        $('#mDelCurCat').onclick = async () => {
          closeModal();
          if(await ask(`ลบบัตรหมวด "${curCat}"?`, `จะลบบัตรคำในหมวดนี้ทั้งหมด ${catCardCount} ใบ`, 'ลบ')){
            removeCards(x => x.cat === curCat, `ลบบัตรหมวด ${curCat}`);
            CFF.cat = 'ทั้งหมด';
            CFF.i = 0;
            renderCards();
            syncChrome();
            undoToast(`ลบบัตรหมวด "${curCat}" แล้ว`);
          }
        };
      }

      $('#mDelSelectCat').onclick = () => {
        closeModal();
        const pickList = S.cats.map(c => {
          const count = S.cards.filter(x => x.cat === c).length;
          return { val: c, label: `${c} (${count} ใบ)` };
        });
        openPicker({
          title: 'เลือกวิชาที่ต้องการลบบัตร',
          options: pickList,
          value: '',
          onSelect: async (selectedCat) => {
            const count = S.cards.filter(x => x.cat === selectedCat).length;
            if(!count) return toast('หมวดนี้ไม่มีบัตรคำ', 'err');
            if(await ask(`ลบบัตรหมวด "${selectedCat}"?`, `จะลบบัตรคำในหมวดนี้ทั้งหมด ${count} ใบ`, 'ลบ')){
              removeCards(x => x.cat === selectedCat, `ลบบัตรหมวด ${selectedCat}`);
              CFF.cat = 'ทั้งหมด';
              CFF.i = 0;
              renderCards();
              syncChrome();
              undoToast(`ลบบัตรหมวด "${selectedCat}" แล้ว`);
            }
          }
        });
      };

      $('#mDelAll').onclick = async () => {
        closeModal();
        if(await ask('ลบบัตรจำทั้งหมด?', `จะลบบัตรคำทุกหมวดวิชาทั้งหมด ${S.cards.length} ใบอย่างถาวร`, 'ลบทั้งหมด')){
          removeCards(() => true, 'ลบบัตรจำทั้งหมด');
          CFF.cat = 'ทั้งหมด';
          CFF.i = 0;
          renderCards();
          syncChrome();
          undoToast('ลบบัตรคำทั้งหมดแล้ว');
        }
      };
    };
  };

  $$('[data-cedit]').forEach(b=>b.onclick=()=>{ playTone('tap'); cForm(S.cards.find(x=>x.id===b.dataset.cedit)); });$$
('[data-cdrop]').forEach(b=>b.onclick=async()=>{
    if(await ask('ลบบัตรนี้?','บัตรจะถูกลบถาวร','ลบ')){
      removeCards(x=>x.id===b.dataset.cdrop, 'ลบบัตร 1 ใบ');
      renderCards();
      syncChrome();
      undoToast('ลบบัตรแล้ว');
    }
  });

  if(c && CFF.list === 'card'){
    const fc = $('#fc');     if(fc) {       fc.onclick = () => {         playTone('tap');         CFF.flip = !CFF.flip;         fc.classList.toggle('flip', CFF.flip);       };     }      $$('[data-srs]').forEach(b => {
      b.onclick = () => rateCard(c, +b.dataset.srs);
    });

    if($('#cNext')) $('#cNext').onclick = () => step(1);
    if($('#cPrev')) $('#cPrev').onclick = () => step(-1);
    if($('#cShuf')) $('#cShuf').onclick = () => {
      playTone('tap');
      CFF.i = Math.floor(Math.random() * L.length);
      CFF.flip = false;
      renderCards();
      toast('สุ่มใหม่');
    };
    if($('#cEdit')) $('#cEdit').onclick = () => cForm(c);
    if($('#cDrop')) $('#cDrop').onclick = async () => {
      if(await ask('ลบบัตรนี้?', 'บัตรจะถูกลบถาวร', 'ลบ')){
        removeCards(x => x.id === c.id, 'ลบบัตร 1 ใบ');
        renderCards();
        syncChrome();
        undoToast('ลบบัตรแล้ว');
      }
    };
  }
  icons();

  function step(n){ playTone('tap'); CFF.flip=false; const len=cPool().length||1; CFF.i=(CFF.i+n+len)%len; renderCards(); }
  
  function rateCard(card, level){
    card.box = level;
    const days = SRS_INTERVALS[level];
    card.due = Date.now() + Math.round(days * 864e5);
    save();
    playTone(level >= 2 ? 'ok' : 'wrong');
    const msg = ['ทวนซ้ำวันนี้', 'ทวนอีก 2 วัน', 'ทวนอีก 5 วัน', 'แม่นยำ (อีก 14 วัน)'][level];
    toast(msg, level >= 2 ? 'ok' : 'info');
    CFF.flip = false;
    
    const currentList = cPool();
    const len = currentList.length;
    if(!len){ renderCards(); return; }
    
    CFF.i = (CFF.i + 1) % len;
    renderCards();
  }
}

function cForm(card){
  const d=card||{f:'',b:'',fImg:'',bImg:'',fPos:'bottom',bPos:'bottom',cat:CFF.cat!=='ทั้งหมด'?CFF.cat:S.cats[0],box:3};
  let selectedCat = d.cat;
  let curFImg = d.fImg || '';
  let curBImg = d.bImg || '';
  let curFPos = d.fPos || 'bottom';
  let curBPos = d.bPos || 'bottom';

  function paintCardImgPreviews(){
    const fBox = $('#f_img_preview');
    const bBox = $('#b_img_preview');
    if(fBox){
      fBox.innerHTML = curFImg ? `
        <div class="img-preview-box">
          <img src="${curFImg}" class="img-thumb" style="width:70px;height:70px" onclick="openLightboxGallery(['${curFImg}'], 0)">
          <button type="button" class="del-btn" id="delFImg">×</button>
        </div>` : '';
      if($('#delFImg')) $('#delFImg').onclick = () => { curFImg = ''; paintCardImgPreviews(); };
    }
    if(bBox){
      bBox.innerHTML = curBImg ? `
        <div class="img-preview-box">
          <img src="${curBImg}" class="img-thumb" style="width:70px;height:70px" onclick="openLightboxGallery(['${curBImg}'], 0)">
          <button type="button" class="del-btn" id="delBImg">×</button>
        </div>` : '';
      if($('#delBImg')) $('#delBImg').onclick = () => { curBImg = ''; paintCardImgPreviews(); };
    }
  }

  openModal(card?'แก้ไขบัตร':'เพิ่มบัตร',`
    <div class="field">
      <div class="row" style="justify-content:space-between;margin-bottom:6px">
        <label style="margin:0">ด้านหน้า (คำถาม/คำสำคัญ) *</label>
        <div class="row" style="gap:6px">
          <button type="button" class="btn sm ghost" onclick="openRichTextEditor('k_f')" style="padding:4px 9px;font-size:12px"><i data-lucide="type"></i>จัดฟอนต์</button>
          <button type="button" class="btn sm ghost" id="btnAddFImg"><i data-lucide="image-plus"></i>แนบรูป</button>
        </div>
        <input type="file" id="inp_fimg" accept="image/*" hidden>
      </div>
      <textarea class="inp" id="k_f" placeholder="คำถาม" style="min-height:90px">${esc(d.f)}</textarea>
      <div class="row" style="margin-top:6px;gap:8px;align-items:center">
        <small style="color:var(--muted)">ตำแหน่งข้อความ:</small>
        <div class="chips" id="wrap_fpos">
          <button type="button" class="chip sm ${curFPos==='top'?'on':''}" data-fpos="top">ไว้บนรูป</button>
          <button type="button" class="chip sm ${curFPos==='bottom'?'on':''}" data-fpos="bottom">ไว้ใต้รูป</button>
        </div>
      </div>
      <div id="f_img_preview" style="margin-top:6px"></div>
    </div>

    <div class="field">
      <div class="row" style="justify-content:space-between;margin-bottom:6px">
        <label style="margin:0">ด้านหลัง (คำตอบ/สรุป) *</label>
        <div class="row" style="gap:6px">
          <button type="button" class="btn sm ghost" onclick="openRichTextEditor('k_b')" style="padding:4px 9px;font-size:12px"><i data-lucide="type"></i>จัดฟอนต์</button>
          <button type="button" class="btn sm ghost" id="btnAddBImg"><i data-lucide="image-plus"></i>แนบรูป</button>
        </div>
        <input type="file" id="inp_bimg" accept="image/*" hidden>
      </div>
      <textarea class="inp" id="k_b" placeholder="คำตอบ" style="min-height:90px">${esc(d.b)}</textarea>
      <div class="row" style="margin-top:6px;gap:8px;align-items:center">
        <small style="color:var(--muted)">ตำแหน่งข้อความ:</small>
        <div class="chips" id="wrap_bpos">
          <button type="button" class="chip sm ${curBPos==='top'?'on':''}" data-bpos="top">ไว้บนรูป</button>
          <button type="button" class="chip sm ${curBPos==='bottom'?'on':''}" data-bpos="bottom">ไว้ใต้รูป</button>
        </div>
      </div>
      <div id="b_img_preview" style="margin-top:6px"></div>
    </div>

    <div class="field">
      <label>หมวดหมู่ *</label>
      <div class="chips" id="k_cats">
        ${S.cats.map(c=>`<button type="button" class="chip ${selectedCat===c?'on':''}" data-cat="${esc(c)}">${esc(c)}</button>`).join('')}
      </div>
    </div>`,
    `<button class="btn ghost" data-close>ยกเลิก</button><button class="btn" id="k_save"><i data-lucide="save"></i>บันทึก</button>`,{focus:'#k_f'});

  paintCardImgPreviews();
  icons($('#modal'));

  $$('#wrap_fpos .chip').forEach(b => {     b.onclick = () => {       playTone('tap');       curFPos = b.dataset.fpos;       $$
('#wrap_fpos .chip').forEach(x => x.classList.toggle('on', x === b));
    };
  });

  $$('#wrap_bpos .chip').forEach(b => {     b.onclick = () => {       playTone('tap');       curBPos = b.dataset.bpos;       $$
('#wrap_bpos .chip').forEach(x => x.classList.toggle('on', x === b));
    };
  });

  $('#btnAddFImg').onclick = () => $('#inp_fimg').click();
  $('#inp_fimg').onchange = async e => {
    const file = e.target.files[0];
    if(!file) return;
    const optImg = await optimizeImage(file, 1024, 0.80);
    openImageEditor(optImg, (finalImg) => {
      curFImg = finalImg;
      paintCardImgPreviews();
    });
    e.target.value = '';
  };

  $('#btnAddBImg').onclick = () => $('#inp_bimg').click();
  $('#inp_bimg').onchange = async e => {
    const file = e.target.files[0];
    if(!file) return;
    const optImg = await optimizeImage(file, 1024, 0.80);
    openImageEditor(optImg, (finalImg) => {
      curBImg = finalImg;
      paintCardImgPreviews();
    });
    e.target.value = '';
  };

  $$('#k_cats .chip').forEach(b=>b.onclick=()=>{     playTone('tap'); selectedCat=b.dataset.cat;     $$
('#k_cats .chip').forEach(x=>x.classList.toggle('on',x===b));
  });

  $('#k_save').onclick=()=>{
    const f=sanitizeHTML($('#k_f').value.trim()),b=sanitizeHTML($('#k_b').value.trim());
    if(!f&&!curFImg)return toast('ใส่คำถามหรือรูปด้านหน้าก่อน','err');
    if(!b&&!curBImg)return toast('ใส่คำตอบหรือรูปด้านหลังก่อน','err');
    playTone('tap');
    closeModal();
    setTimeout(()=>{
      if(card){
        card.f=f; card.b=b; card.fImg=curFImg; card.bImg=curBImg;
        card.fPos=curFPos; card.bPos=curBPos; card.cat=selectedCat;
      } else {
        S.cards.unshift({id:uid(), f, b, fImg:curFImg, bImg:curBImg, fPos:curFPos, bPos:curBPos, cat:selectedCat, box:3, due:0});
      }
      save();renderCards();syncChrome();toast(card?'แก้ไขแล้ว':'เพิ่มแล้ว','ok');
    }, 40);
  };
}
let CFG={cats:[],count:20,minutes:30,mode:'exam',onlyStar:false,diff:''};
const poolOf=(cats,onlyStar,diff)=>S.questions.filter(q=>(!cats.length||cats.includes(q.cat))&&(!onlyStar||q.star)&&(!diff||q.d===diff));

// เลือกสายสอบ (ค่าเดียวทั้งแอป)
function pickTrack(after){
  const opts = Object.keys(S.tracks).map(k => { const t = getTrack(k); return { val: k, label: `${t.label} · ${t.ruleDesc}` }; });
  opts.push({ val: '__edit', label: 'แก้เกณฑ์ / เพิ่มสายใหม่…' });
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
