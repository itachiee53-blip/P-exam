"use strict";
document.addEventListener('gesturestart', (e) => e.preventDefault());
document.addEventListener('touchstart', (e) => {
  if (e.touches.length > 1) e.preventDefault();
}, { passive: false });



const GDRIVE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyqICoNiiit799JliNB4OugQQbTQhLhNggB0SmXWmCg-xs7Lzlc2VrEnoXm0yOk0Gg2/exec";
let cloudCache = null;

async function openCloudHubModal(forceRefresh = false) {
  playTone('tap');

  if (cloudCache && !forceRefresh) {
    renderCloudHub(cloudCache);
    return;
  }

  openModal('คลังข้อสอบออนไลน์ (Google Drive)', 
    '<div style="text-align:center;padding:24px 16px" id="hubLoading">' +
      '<div style="font-size:36px;font-weight:900;color:var(--primary);margin-bottom:8px" id="hubLoadingPercent">0%</div>' +
      '<div style="background:var(--line);height:8px;border-radius:99px;overflow:hidden;margin:0 auto 12px;max-width:220px">' +
        '<div id="hubLoadingBar" style="background:#2563eb;height:100%;width:0%;transition:width 0.15s ease"></div>' +
      '</div>' +
      '<div style="font-size:13px;color:var(--muted)" id="hubLoadingStatus">กำลังดึงข้อมูลจาก Google Drive...</div>' +
    '</div>',
    ''
  );

  let pct = 0;
  const pText = $('#hubLoadingPercent');
  const pBar = $('#hubLoadingBar');

  const timer = setInterval(() => {
    if (pct < 90) {
      pct += Math.floor(Math.random() * 5) + 3;
      if (pct > 90) pct = 90;
      if (pText) pText.textContent = pct + '%';
      if (pBar) pBar.style.width = pct + '%';
    }
  }, 100);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    const res = await fetch(GDRIVE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action: "list" }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    const data = await res.json();

    clearInterval(timer);
    if (pText) pText.textContent = '100%';
    if (pBar) pBar.style.width = '100%';
    await new Promise(r => setTimeout(r, 150));

    cloudCache = data;
    renderCloudHub(data);

  } catch (err) {
    clearInterval(timer);
    clearTimeout(timeoutId);
    const loadingBox = $('#hubLoading');
    if (loadingBox) {
      loadingBox.innerHTML = 
        '<div style="color:#ef4444;font-size:14px;font-weight:700;margin-bottom:12px">การเชื่อมต่อล่าช้าหรืออินเทอร์เน็ตขัดข้อง</div>' +
        '<button class="btn btn-sm" onclick="openCloudHubModal(true)" style="background:#2563eb;color:#fff;padding:8px 18px;border-radius:10px">ลองใหม่อีกครั้ง</button>';
    }
  }
}

function renderCloudHub(data) {
  const TOTAL_LIMIT = 1024 * 1024 * 1024 * 1024;
  const usedMB = (data.totalBytes / (1024 * 1024)).toFixed(1);
  const percentVal = ((data.totalBytes / TOTAL_LIMIT) * 100).toFixed(2);

  openModal('คลังข้อสอบออนไลน์ (Google Drive)', 
    '<div style="padding:4px 0">' +
      '<div style="background:var(--surface2);border:1px solid var(--line);border-radius:16px;padding:12px 14px;margin-bottom:16px">' +
        '<div style="display:flex;justify-content:space-between;font-size:12px;color:var(--muted);margin-bottom:6px">' +
          '<span>พื้นที่สำรองข้อมูล</span>' +
          '<b>' + usedMB + ' MB / 1 TB (' + percentVal + '%)</b>' +
        '</div>' +
        '<div style="background:var(--line);height:6px;border-radius:99px;overflow:hidden">' +
          '<div style="background:#2563eb;width:' + Math.max(0.5, percentVal) + '%;height:100%"></div>' +
        '</div>' +
      '</div>' +

      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">' +
        '<b style="font-size:15px">รายการวิชาบนคลาวด์</b>' +
        '<button class="btn btn-sm" onclick="triggerUploadPicker()" style="background:#10b981;color:#fff;border-radius:10px;padding:6px 12px;font-weight:700">' +
          '<i data-lucide="upload" style="width:14px;height:14px;margin-right:4px"></i> ฝากข้อสอบ' +
        '</button>' +
      '</div>' +

      '<div id="cloudList" style="max-height:360px;overflow-y:auto;display:flex;flex-direction:column;gap:8px">' +
        (!data.items || !data.items.length 
          ? '<div style="text-align:center;padding:24px;color:var(--muted)">ยังไม่มีข้อสอบบนคลาวด์</div>' 
          : data.items.map((item, i) => {
              return '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;background:var(--surface2);border:1px solid var(--line);padding:10px 14px;border-radius:14px">' +
                '<div style="min-width:0">' +
                  '<b style="font-size:14px;display:block">' + esc(item.name) + '</b>' +
                  '<small style="color:var(--muted)">' + esc(item.count) + ' ข้อ · ' + (+item.size / (1024*1024) || 0).toFixed(1) + ' MB · ' + esc(item.date) + '</small>' +
                '</div>' +
                '<div style="display:flex;gap:6px;flex:none">' +
                  '<button class="btn btn-sm" data-cdl="' + i + '" style="background:#2563eb;color:#fff;border-radius:8px;padding:6px 10px">' +
                    '<i data-lucide="download" style="width:14px;height:14px"></i> โหลด' +
                  '</button>' +
                  ('<button class="btn btn-sm" data-cdel="' + i + '" style="background:#ef4444;color:#fff;border-radius:8px;padding:6px 10px">' +
                    '<i data-lucide="trash-2" style="width:14px;height:14px"></i>' +
                  '</button>') +
                '</div>' +
              '</div>';
            }            ).join('')
        ) +
      '</div>' +
    '</div>',
    ''
  );

  $$('[data-cdl]').forEach(b => { const it = data.items[+b.dataset.cdl]; b.onclick = () => downloadCloudFile(it.id, it.name); });
  $$('[data-cdel]').forEach(b => { const it = data.items[+b.dataset.cdel]; b.onclick = () => deleteCloudFile(it.fileName, it.name); });
  icons();
}

// รหัสเจ้าของไฟล์ประจำเครื่อง: ใช้ยืนยันว่าลบได้เฉพาะไฟล์ที่ตัวเองอัป
function cloudOwnerId(){
  if(!S.settings.cloudOwner){ S.settings.cloudOwner = uid() + uid() + uid(); save(); }
  return S.settings.cloudOwner;
}

window.downloadCloudFile = async (fileId, subName) => {
  toast('กำลังดาวน์โหลด ' + subName + '...', 'info');
  try {
    const res = await fetch(GDRIVE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action: "download", fileId: fileId })
    });
    const data = await res.json();
    if (data.questions && data.questions.length) {
      const incoming = data.questions.map(q => sanitizeQuestion({ ...q }));
      const isAll = subName === 'รวมทุกวิชา';
      const mine = isAll ? S.questions.length : S.questions.filter(q => q.cat === subName).length;
      closeModal();
      setTimeout(() => openModal(`นำเข้า "${esc(subName)}"`, `
        <p style="color:var(--text2);line-height:1.6">ไฟล์นี้มี <b>${incoming.length}</b> ข้อ · ในเครื่องคุณมี${isAll ? 'ทั้งหมด' : 'วิชานี้'} <b>${mine}</b> ข้อ</p>
        <p style="font-size:12.5px;color:var(--muted);margin-top:8px">เลือก "เพิ่มต่อท้าย" เพื่อเก็บของเดิมไว้ หรือ "แทนที่" เพื่อลบของเดิม${isAll ? 'ทั้งหมด' : 'วิชานี้'}ก่อน · ย้อนกลับได้ทั้งสองแบบ</p>`,
        `<button class="btn ghost" id="cl_add"><i data-lucide="plus"></i>เพิ่มต่อท้าย</button><button class="btn red" id="cl_rep" ${mine ? '' : 'disabled'}><i data-lucide="replace"></i>แทนที่</button>`), 120);
      const apply = replace => {
        const have = new Set(S.questions.map(q => q.id));
        incoming.forEach(q => { if(have.has(q.id)) q.id = uid(); });
        const newCats = [];
        incoming.forEach(q => { q.cat = String(q.cat || S.cats[0]).replace(/[<>"'`]/g, ''); if(!S.cats.includes(q.cat)){ S.cats.push(q.cat); newCats.push(q.cat); } });
        if(data.catIcons) Object.entries(data.catIcons).forEach(([k, v]) => { if(!S.catIcons[k] && ICON_POOL.includes(v)) S.catIcons[k] = v; });
        const delQ = replace ? withIdx(S.questions, q => isAll || q.cat === subName) : [];
        if(replace) S.questions = S.questions.filter(q => !(isAll || q.cat === subName));
        S.questions.push(...incoming);
        pushUndo(`${replace ? 'แทนที่' : 'เพิ่ม'}จากคลังออนไลน์: ${subName}`, { addQ: incoming.map(q => q.id), delQ, addCats: newCats });
        save(); syncChrome(); closeModal(); refreshPage();
        undoToast(`${replace ? 'แทนที่' : 'เพิ่ม'} "${subName}" ${incoming.length} ข้อแล้ว`);
      };
      setTimeout(() => { $('#cl_add').onclick = () => apply(false); $('#cl_rep').onclick = () => apply(true); }, 160);
    }
  } catch(e) {
    toast('ดาวน์โหลดล้มเหลว ตรวจสอบอินเทอร์เน็ต', 'err');
  }
};

window.deleteCloudFile = (fileName, subName) => {
  openModal('ยืนยันการลบไฟล์', 
    '<div style="text-align:center;padding:12px 0">' +
      '<div style="font-size:15px;margin-bottom:16px">คุณต้องการลบข้อสอบวิชา <b>"' + esc(subName) + '"</b> ออกจากคลังออนไลน์ใช่หรือไม่?<br><small style="color:var(--red)">คลังนี้ใช้ร่วมกับเพื่อน ไฟล์นี้อาจเป็นของคนอื่น</small></div>' +
      '<div style="display:flex;gap:10px;justify-content:center">' +
        '<button class="btn btn-sub" onclick="closeModal()">ยกเลิก</button>' +
        '<button class="btn btn-err" id="btnConfirmDelete" style="background:#ef4444;color:#fff">ยืนยันลบ</button>' +
      '</div>' +
    '</div>', 
    ''
  );

  $('#btnConfirmDelete').onclick = async () => {
    closeModal();
    toast('กำลังลบข้อมูล...', 'info');
    try {
      const res = await fetch(GDRIVE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ action: "delete", fileName: fileName, ownerId: cloudOwnerId() })
      });
      const r = await res.json().catch(() => ({}));
      if (r && (r.error || r.ok === false)) return toast(r.error || 'ลบไม่ได้: ไม่ใช่ไฟล์ของคุณ', 'err');
      toast('ลบไฟล์เรียบร้อย', 'ok');
      cloudCache = null;
      openCloudHubModal(true);
    } catch(e) {
      toast('ลบไฟล์ไม่สำเร็จ', 'err');
    }
  };
};

window.triggerUploadPicker = function() {
  playTone('tap');
  const options = [
    { val: '__ALL__', label: 'ทุกวิชาทั้งหมด (' + S.questions.length + ' ข้อ)' },
    ...S.cats.map(c => ({ val: c, label: c + ' (' + S.questions.filter(q=>q.cat===c).length + ' ข้อ)' }))
  ];
  
  openPicker({
    title: 'เลือกวิชาที่จะฝากขึ้น Google Drive',
    options,
    value: '',
    onSelect: async (selected) => {
      const toUploadQs = selected === '__ALL__' 
        ? S.questions 
        : S.questions.filter(q => q.cat === selected);

      if(!toUploadQs.length) return toast('ไม่มีข้อสอบในหมวดนี้', 'err');

      const subName = selected === '__ALL__' ? 'รวมทุกวิชา' : selected;
      const totalQuestions = toUploadQs.length;
      const jsonString = JSON.stringify({
        questions: toUploadQs,
        catIcons: S.catIcons || {},
        catTones: S.catTones || {}
      });

      const CHUNK_SIZE = 10 * 1024 * 1024;
      const totalChunks = Math.ceil(jsonString.length / CHUNK_SIZE);

      document.body.style.pointerEvents = 'none';
      document.body.style.userSelect = 'none';

      const overlay = document.createElement('div');
      overlay.id = 'chunkUploadOverlay';
      overlay.style.cssText = 
        'position:fixed;inset:0;background:rgba(15,23,42,0.85);' +
        'z-index:999999;display:flex;align-items:center;justify-content:center;padding:20px;' +
        'pointer-events:auto;';

      overlay.innerHTML = 
        '<div style="background:var(--surface,#ffffff);width:100%;max-width:380px;border-radius:24px;' +
        'padding:28px 24px;text-align:center;box-shadow:0 15px 35px rgba(0,0,0,0.3);' +
        'border:2px solid var(--line,#e2e8f0);">' +
          
          '<div style="width:54px;height:54px;border-radius:16px;background:rgba(37,99,235,0.1);' +
          'display:flex;align-items:center;justify-content:center;margin:0 auto 16px;color:#2563eb;" id="upBoxIcon">' +
            '<i data-lucide="cloud-upload" style="width:28px;height:28px"></i>' +
          '</div>' +

          '<div style="font-size:18px;font-weight:800;color:var(--text,#0f172a);margin-bottom:4px">กำลังอัปโหลดข้อสอบ</div>' +
          '<div style="font-size:13px;color:var(--muted,#64748b);margin-bottom:20px">' + subName + '</div>' +

          '<div style="font-size:48px;font-weight:900;letter-spacing:-1px;color:#2563eb;margin-bottom:12px;font-variant-numeric:tabular-nums;line-height:1" id="upNum">0%</div>' +

          '<div style="width:100%;height:12px;background:var(--line,#e2e8f0);border-radius:99px;overflow:hidden;margin-bottom:14px;border:1px solid rgba(0,0,0,0.05)">' +
            '<div id="upFill" style="width:0%;height:100%;background:#2563eb;border-radius:99px;transition:width 0.15s ease-out"></div>' +
          '</div>' +

          '<div style="font-size:13px;font-weight:700;color:var(--text,#1e293b);margin-bottom:4px" id="upTextInfo">เตรียมส่งข้อมูล... (0/' + totalChunks + ' ส่วน)</div>' +
          '<div style="font-size:12px;color:var(--muted,#94a3b8);margin-bottom:24px" id="upSubInfo">ระบบกำลังส่งข้อมูล ห้ามปิดหรือสลับแอป</div>' +

          '<button id="btnFinishUpload" style="display:none;width:100%;padding:14px;border-radius:14px;background:#2563eb;color:#fff;border:none;font-weight:800;font-size:15px;cursor:pointer;">เสร็จสิ้น</button>' +
        '</div>';

      document.body.appendChild(overlay);
      icons();

      const preventNav = (e) => { e.preventDefault(); e.returnValue = ''; };
      window.addEventListener('beforeunload', preventNav);

      const upNum = document.getElementById('upNum');
      const upFill = document.getElementById('upFill');
      const upTextInfo = document.getElementById('upTextInfo');
      const upSubInfo = document.getElementById('upSubInfo');
      const btnFinishUpload = document.getElementById('btnFinishUpload');
      const upBoxIcon = document.getElementById('upBoxIcon');

      let displayPercent = 0;
      let targetPercent = 0;
      let isDone = false;

      const progressTicker = setInterval(() => {
        if (isDone) return;
        if (displayPercent < targetPercent) {
          displayPercent += Math.min(2, targetPercent - displayPercent);
        } else if (displayPercent < 95) {
          if (Math.random() > 0.4) {
            displayPercent += 1;
          }
        }
        if (upNum) upNum.textContent = displayPercent + '%';
        if (upFill) upFill.style.width = displayPercent + '%';
      }, 120);

      try {
        for (let i = 0; i < totalChunks; i++) {
          const start = i * CHUNK_SIZE;
          const end = Math.min(start + CHUNK_SIZE, jsonString.length);
          const chunkData = jsonString.substring(start, end);

          if (upTextInfo) upTextInfo.textContent = 'กำลังส่งส่วนที่ ' + (i + 1) + '/' + totalChunks + '...';

          const upRes = await fetch(GDRIVE_SCRIPT_URL, {
            method: "POST",
            redirect: "follow",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify({
              action: "chunk_upload",
              ownerId: cloudOwnerId(),
              ownerName: (S.settings.name || '').trim() || 'ไม่ระบุชื่อ',
              subject: subName,
              totalQuestions: totalQuestions,
              chunkIndex: i,
              totalChunks: totalChunks,
              chunkData: chunkData
            })
          });

          const upJson = await upRes.json().catch(() => ({}));
          if (upJson && upJson.ok === false) throw new Error(upJson.error || 'อัปโหลดไม่สำเร็จ');
          targetPercent = Math.round(((i + 1) / totalChunks) * 100);
        }

        clearInterval(progressTicker);
        targetPercent = 100;
        while (displayPercent < 100) {
          displayPercent += 2;
          if (displayPercent > 100) displayPercent = 100;
          if (upNum) upNum.textContent = displayPercent + '%';
          if (upFill) upFill.style.width = displayPercent + '%';
          await new Promise(r => setTimeout(r, 20));
        }
        isDone = true;

        window.removeEventListener('beforeunload', preventNav);

        if (upBoxIcon) {
          upBoxIcon.style.background = 'rgba(16,185,129,0.1)';
          upBoxIcon.style.color = '#10b981';
          upBoxIcon.innerHTML = '<i data-lucide="check-circle-2" style="width:28px;height:28px"></i>';
          icons();
        }
        if (upTextInfo) upTextInfo.textContent = 'อัปโหลดข้อสอบขึ้นคลังออนไลน์แล้ว!';
        if (upSubInfo) upSubInfo.textContent = 'อัปโหลดเฉพาะข้อสอบ ไม่รวมสถิติ (สำรองข้อมูลทั้งหมดใช้ปุ่ม "ส่งออก" ในตั้งค่า)';

        if (btnFinishUpload) {
          btnFinishUpload.style.display = 'block';
          btnFinishUpload.onclick = () => {
            playTone('tap');
            overlay.remove();
            document.body.style.pointerEvents = '';
            document.body.style.userSelect = '';
            openCloudHubModal();
          };
        }

      } catch (err) {
        clearInterval(progressTicker);
        window.removeEventListener('beforeunload', preventNav);
        document.body.style.pointerEvents = '';
        document.body.style.userSelect = '';
        overlay.remove();
        toast(err && err.message ? err.message : 'การอัปโหลดขัดข้อง กรุณาลองใหม่อีกครั้ง', 'err');
      }
    }
  });
};
