"use strict";
// ==========================================
// ระบบโปรไฟล์ รูปภาพ และ Lightbox
// ==========================================
let editorImage = new Image();
let editorState = { rotation: 0, flipH: false, flipV: false };
let editorCallback = null;
let activeGallery = [];
let activeGalleryIdx = 0;


function optimizeImage(file, maxWidth = 800, quality = 0.75){
  return new Promise((resolve) => {
    const img = new Image();
    // ใช้วิธีสร้าง URL ชั่วคราวแทนการอ่านไฟล์ลงแรม (ประหยัดแรมมือถือได้ 90% ป้องกันเว็บเด้ง)
    const objectUrl = URL.createObjectURL(file);
    
    img.onload = () => {
      // คืนพื้นที่แรมทันทีที่โหลดรูปเสร็จ
      URL.revokeObjectURL(objectUrl);
      
      let { width, height } = img;
      // ล็อกขนาดสูงสุดไว้ไม่ให้เกิน 800x1200 เพื่อไม่ให้ Editor กินแรมตอนปรับรูป
      const MAX_W = maxWidth;
      const MAX_H = 1200;
      
      if(width > MAX_W || height > MAX_H){
        const ratio = Math.min(MAX_W / width, MAX_H / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d', { alpha: false });
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(img, 0, 0, width, height);
      
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(null);
    };
    
    img.src = objectUrl;
  });
}

function updateSidebarProfile(){
  const name = (S.settings.name || '').trim() || 'P-exam';
  const avatar = S.settings.avatar || '';

  const sideNameEl = $('#sideUserName');
  if(sideNameEl) sideNameEl.textContent = name;

  const sideBox = $('#sideAvatarBox');
  if(sideBox){
    if(avatar){
      sideBox.innerHTML = `<img src="${avatar}" class="avatar-img" alt="Avatar">`;
    } else {
      sideBox.innerHTML = `<i data-lucide="shield-check"></i>`;
    }
  }

  const hpName = $('#hpUserName');
  if(hpName) hpName.textContent = name;

  const hpBox = $('#hpAvatarBox');
  if(hpBox){
    if(avatar){
      hpBox.innerHTML = `<img src="${avatar}" style="width:100%;height:100%;object-fit:cover" alt="Avatar">`;
    } else {
      hpBox.innerHTML = `<i data-lucide="user" style="width:20px;height:20px"></i>`;
    }
  }

  const currentTrackKey = curTrackKey();
  const trackInfo = getTrack(currentTrackKey);
  const hpTrack = $('#hpTrackName');
  if(hpTrack) hpTrack.textContent = `สาย${trackInfo.label}`;

  icons();
}

function openProfileModal(){
  playTone('tap');
  const curName = S.settings.name || '';
  let curAvatar = S.settings.avatar || '';

  const body = `
    <div style="display:flex;flex-direction:column;gap:16px;align-items:center;text-align:center">
      <div style="position:relative;width:96px;height:96px;border-radius:28px;background:var(--blue-2);color:var(--blue);display:grid;place-items:center;overflow:hidden;box-shadow:var(--sh2);border:2px solid var(--line)" id="profileAvatarPreview">
        ${curAvatar ? `<img src="${curAvatar}" style="width:100%;height:100%;object-fit:cover">` : `<i data-lucide="user" style="width:42px;height:42px"></i>`}
      </div>
      <div class="row" style="gap:8px">
        <button class="btn sm ghost" id="btnUploadAvatar"><i data-lucide="camera"></i>เปลี่ยนรูป</button>
        ${curAvatar ? '<button class="btn sm red" id="btnRemoveAvatar"><i data-lucide="trash-2"></i>ลบรูป</button>' : ''}
      </div>
      <input type="file" id="inpAvatarFile" accept="image/*" hidden>

      <div class="field" style="width:100%;text-align:left">
        <label>ชื่อผู้ใช้ / ชื่อเล่น</label>
        <input class="inp" id="inpProfileName" value="${esc(curName)}" placeholder="เช่น ว่าที่ร้อยตำรวจตรี...">
      </div>
    </div>
  `;

  openModal('จัดการโปรไฟล์', body, `<button class="btn ghost" data-close>ยกเลิก</button><button class="btn" id="btnSaveProfile"><i data-lucide="check"></i>บันทึก</button>`, { focus: '#inpProfileName' });

  $('#btnUploadAvatar').onclick = () => $('#inpAvatarFile').click();
  $('#inpAvatarFile').onchange = async e => {
    const file = e.target.files[0];
    if(!file) return;
    const opt = await optimizeImage(file, 512, 0.85);
    openImageEditor(opt, (res) => {
      curAvatar = res;
      const prev = $('#profileAvatarPreview');
      if(prev) prev.innerHTML = `<img src="${curAvatar}" style="width:100%;height:100%;object-fit:cover">`;
    });
    e.target.value = '';
  };

  if($('#btnRemoveAvatar')){
    $('#btnRemoveAvatar').onclick = () => {
      playTone('tap');
      curAvatar = '';
      const prev = $('#profileAvatarPreview');
      if(prev) prev.innerHTML = `<i data-lucide="user" style="width:42px;height:42px"></i>`;
      toast('ลบรูปแล้ว');
    };
  }

  $('#btnSaveProfile').onclick = () => {
    playTone('tap');
    const n = $('#inpProfileName').value.trim();
    S.settings.name = n;
    S.settings.avatar = curAvatar;
    save();
    closeModal();
    updateSidebarProfile();
    if(PAGE === 'home') renderHome();
    toast('บันทึกโปรไฟล์แล้ว', 'ok');
  };
}

document.addEventListener('click', e => {
  const brand = e.target.closest('#brandProfileBtn');
  const hp = e.target.closest('#homeProfileHeaderBtn');
  if(brand || hp){
    openProfileModal();
  }
});

function openLightboxGallery(imgList, startIdx = 0){
  if(!imgList || !imgList.length) return;
  playTone('tap');
  activeGallery = imgList;
  activeGalleryIdx = clamp(startIdx, 0, imgList.length - 1);
  updateGalleryView();
  $('#lightbox').classList.add('on');
  document.body.classList.add('lightbox-open');
}

function updateGalleryView(){
  const img = $('#lightboxImg');
  const counter = $('#lbCounter');
  const prevBtn = $('#lbPrev');
  const nextBtn = $('#lbNext');

  img.src = activeGallery[activeGalleryIdx];
  counter.textContent = `${activeGalleryIdx + 1} / ${activeGallery.length}`;

  const isMulti = activeGallery.length > 1;
  prevBtn.style.display = isMulti ? 'grid' : 'none';
  nextBtn.style.display = isMulti ? 'grid' : 'none';
  icons($('#lightbox'));
}

function stepGallery(dir){
  if(activeGallery.length <= 1) return;
  playTone('tap');
  activeGalleryIdx = (activeGalleryIdx + dir + activeGallery.length) % activeGallery.length;
  updateGalleryView();
}

function closeLightbox(){
  playTone('tap');
  $('#lightbox').classList.remove('on');
  $('#lightboxImg').src = '';
  activeGallery = [];
  document.body.classList.remove('lightbox-open');
}

$('#lbPrev').onclick = e => { e.stopPropagation(); stepGallery(-1); };
$('#lbNext').onclick = e => { e.stopPropagation(); stepGallery(1); };
$('#lightboxClose').onclick = e => { e.stopPropagation(); closeLightbox(); };
$('#lightbox').onclick = e => {
  if(e.target.id === 'lightbox' || e.target.id === 'lbTouchArea') closeLightbox();
};

let lbTouchStartX = 0;
$('#lightbox').ontouchstart = e => {
  lbTouchStartX = e.touches[0].clientX;
};
$('#lightbox').ontouchend = e => {
  const diffX = lbTouchStartX - e.changedTouches[0].clientX;
  if(Math.abs(diffX) > 45){
    stepGallery(diffX > 0 ? 1 : -1);
  }
};

function openImageEditor(src, onComplete){
  editorCallback = onComplete;
  editorState = { rotation: 0, flipH: false, flipV: false };
  editorImage = new Image();
  editorImage.onload = () => {
    $('#imgEditorMask').classList.add('on');
    document.body.classList.add('modal-locked');
    redrawEditorCanvas();
    icons($('#imgEditorMask'));
  };
  editorImage.src = src;
}

function closeImageEditor(){
  $('#imgEditorMask').classList.remove('on');
  if(!$('#mask').classList.contains('on') && !$('#rteMask').classList.contains('on')) {
    document.body.classList.remove('modal-locked');
  }
  editorCallback = null;
}

function redrawEditorCanvas(){
  const canvas = $('#imgEditorCanvas');
  if(!canvas || !editorImage.width) return;
  const ctx = canvas.getContext('2d');
  
  const rad = (editorState.rotation * Math.PI) / 180;
  const isRotated = Math.abs(editorState.rotation % 180) !== 0;
  
  const w = isRotated ? editorImage.height : editorImage.width;
  const h = isRotated ? editorImage.width : editorImage.height;

  const maxW = 520, maxH = 320;
  const scale = Math.min(1, maxW / w, maxH / h);

  canvas.width = Math.round(w * scale);
  canvas.height = Math.round(h * scale);

  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(rad);
  ctx.scale(editorState.flipH ? -1 : 1, editorState.flipV ? -1 : 1);
  ctx.drawImage(
    editorImage,
    -editorImage.width * scale / 2,
    -editorImage.height * scale / 2,
    editorImage.width * scale,
    editorImage.height * scale
  );
  ctx.restore();
}

function exportEditedImage(){
  if(!editorImage.width) return '';
  const isRotated = Math.abs(editorState.rotation % 180) !== 0;
  const w = isRotated ? editorImage.height : editorImage.width;
  const h = isRotated ? editorImage.width : editorImage.height;

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { alpha: false });
  ctx.imageSmoothingEnabled = true;

  ctx.save();
  ctx.translate(w / 2, h / 2);
  ctx.rotate((editorState.rotation * Math.PI) / 180);
  ctx.scale(editorState.flipH ? -1 : 1, editorState.flipV ? -1 : 1);
  ctx.drawImage(editorImage, -editorImage.width / 2, -editorImage.height / 2);
  ctx.restore();

  return canvas.toDataURL('image/jpeg', 0.85);
}

$('#edRotL').onclick = () => { playTone('tap'); editorState.rotation = (editorState.rotation - 90) % 360; redrawEditorCanvas(); };
$('#edRotR').onclick = () => { playTone('tap'); editorState.rotation = (editorState.rotation + 90) % 360; redrawEditorCanvas(); };
$('#edFlipH').onclick = () => { playTone('tap'); editorState.flipH = !editorState.flipH; redrawEditorCanvas(); };
$('#edFlipV').onclick = () => { playTone('tap'); editorState.flipV = !editorState.flipV; redrawEditorCanvas(); };
$('#edReset').onclick = () => { playTone('tap'); editorState = { rotation: 0, flipH: false, flipV: false }; redrawEditorCanvas(); };
$('#edCancel').onclick = () => { playTone('tap'); closeImageEditor(); };
$('#edSave').onclick = () => {
  playTone('tap');
  const result = exportEditedImage();
  if(editorCallback) editorCallback(result);
  closeImageEditor();
};

// ==========================================
// ระบบจัดฟอนต์ข้อความ (Rich Text Editor)
// ==========================================
let rteTarget = null;
let savedSelection = null;

function saveCurrentSelection(){
  const sel = window.getSelection();
  if(sel.rangeCount > 0){
    savedSelection = sel.getRangeAt(0);    
  }
}

function restoreCurrentSelection(){
  if(savedSelection){
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(savedSelection);
  }
}

function openRichTextEditor(targetInputId){
  playTone('tap');
  const target = document.getElementById(targetInputId);
  if(!target) return;
  rteTarget = target;
  
  const box = $('#rteContent');
  box.innerHTML = target.value ? target.value.replace(/\n/g, '<br>') : '';
  
  $('#rteColorPalette').classList.remove('open');
  $('#rteMask').classList.add('on');
  document.body.classList.add('modal-locked');
  icons($('#rteMask'));
  box.focus();
}

function closeRichTextEditor(){
  $('#rteMask').classList.remove('on');
  $('#rteColorPalette').classList.remove('open');
  if(!$('#mask').classList.contains('on')) document.body.classList.remove('modal-locked');
  rteTarget = null;
  savedSelection = null;
}

document.addEventListener('selectionchange', () => {
  const sel = window.getSelection();
  const box = $('#rteContent');
  if (sel && sel.rangeCount > 0 && box && box.contains(sel.anchorNode)) {
    savedSelection = sel.getRangeAt(0);
  }
});

$$('#rteMask [data-cmd]').forEach(btn => {
  btn.onmousedown = (e) => {
    e.preventDefault();
    playTone('tap');
    const cmd = btn.dataset.cmd;
    const val = btn.dataset.val || null;
    document.execCommand(cmd, false, val);
    saveCurrentSelection();
  };
});

window.insertFracModal = function() {
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount) return;

  const range = sel.getRangeAt(0);
  const selectedText = sel.toString().trim();

  let num = '1', den = '2';

  if (selectedText && selectedText.includes('/')) {
    const parts = selectedText.split('/');
    num = parts[0].trim();
    den = parts[1].trim();
  }

  const fracSpan = document.createElement('span');
  fracSpan.className = 'math-frac';
  fracSpan.innerHTML = `<span>${num}</span><span>${den}</span>`;

  range.deleteContents();
  range.insertNode(fracSpan);

  range.setStartAfter(fracSpan);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
};

const toggleColorBtn = $('#btnToggleColor');
if(toggleColorBtn) {
  toggleColorBtn.onpointerdown = (e) => {
    if (e.cancelable) e.preventDefault();
    playTone('tap');
    saveCurrentSelection();
    $('#rteColorPalette').classList.toggle('open');
  };
}

$$('.rte-dot').forEach(dot => {
  dot.onpointerdown = (e) => {
    if (e.cancelable) e.preventDefault();
    e.stopPropagation();
    playTone('tap');
    restoreCurrentSelection();
    document.execCommand('foreColor', false, dot.dataset.col);
    saveCurrentSelection();
  };
});

$('#rteClose').onclick = closeRichTextEditor;
$('#rteCancel').onclick = closeRichTextEditor;

$('#rteSave').onclick = () => {
  if(!rteTarget) return closeRichTextEditor();
  playTone('tap');
  let html = $('#rteContent').innerHTML;
  html = html.replace(/<div><br><\/div>/gi, '\n')
             .replace(/<div>/gi, '\n')
             .replace(/<\/div>/gi, '')
             .replace(/<br\s*\/?>/gi, '\n');
             
  rteTarget.value = html.trim();
  closeRichTextEditor();
};
