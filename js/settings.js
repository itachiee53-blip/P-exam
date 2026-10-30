"use strict";
function openRoundDetail(resultId, selectedCat = null){
  const res = S.results.find(x => x.id === resultId);
  if(!res) return;

  const pct = Math.round(res.correct / res.total * 100);
  const ev = res.evalResult || evaluateTrack(res, res.trackKey || 'admin');

  // ==========================================
  // VIEW 2: หน้ารายละเอียดข้อผิด (Full Screen Sheet)
  // ==========================================
  if(selectedCat){
    const wrongInCat = res.wrongList
      .map(w => ({ w, q: S.questions.find(x => x.id === w.id) }))
      .filter(item => item.q && item.q.cat === selectedCat);

    const catStat = res.byCat[selectedCat] || { c: 0, t: 0 };
    const catPct = catStat.t ? Math.round(catStat.c / catStat.t * 100) : 0;
    const isCatPass = catPct >= 60;
    const [cBg, cFg] = tone(selectedCat);
    const catIcon = cicon(selectedCat);

    let fsWrap = document.getElementById('fsReviewWrap');
    if(!fsWrap){
      fsWrap = document.createElement('div');
      fsWrap.id = 'fsReviewWrap';
      document.body.appendChild(fsWrap);
    }
    fsWrap.style.cssText = 'position:fixed;inset:0;background:var(--bg);z-index:180;display:flex;flex-direction:column;overflow:hidden;overscroll-behavior:contain;touch-action:pan-y;';

    const wrongListHtml = wrongInCat.length ? wrongInCat.map(({ w, q }, idx) => {
      const qImgsJson = JSON.stringify(q.qImgs || []).replace(/"/g, '&quot;');
      const eImgsJson = JSON.stringify(q.eImgs || []).replace(/"/g, '&quot;');
      const qw = q.qImgW ? `${q.qImgW}px` : '100%';
      const cw = q.cImgW ? `${q.cImgW}px` : '110px';
      const ew = q.eImgW ? `${q.eImgW}px` : '100%';

      const pickedImg = w.picked !== null && q.cImgs && q.cImgs[w.picked];
      const correctImg = q.cImgs && q.cImgs[q.a];
      const choiceExpPicked = (w.picked !== null && q.cExps && q.cExps[w.picked]) ? q.cExps[w.picked].trim() : '';
      const choiceExpCorrect = (q.cExps && q.cExps[q.a]) ? q.cExps[q.a].trim() : '';

      // กรองช่องว่าง ย่อหน้า อักขระพิเศษ และ HTML entities ด้านหน้าออกทั้งหมด
      const cleanQuestion = (q.q || '')
        .replace(/^[\s\u00A0\u200B\uFEFF]+/g, '')
        .replace(/^(?:&nbsp;|\s)+/gi, '')
        .trim();

      return `
      <div style="background:var(--surface);border-radius:22px;padding:20px 18px;margin-bottom:16px;border:1px solid var(--line);box-shadow:0 2px 10px rgba(0,0,0,0.02)">
        
        <!-- แถบด้านบน: ลำดับข้อ + แท็กตอบผิด -->
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
          <span style="font-size:12px;font-weight:800;color:var(--text);background:var(--surface2);border:1px solid var(--line);padding:3px 10px;border-radius:8px">
            ข้อที่ ${idx + 1}
          </span>
          <span style="font-size:11.5px;font-weight:700;color:#ef4444;background:rgba(239,68,68,0.08);padding:3px 9px;border-radius:20px">
            ✕ ตอบผิด
          </span>
        </div>

        <!-- เนื้อหาโจทย์ (ชิดซ้ายสนิท ไม่มีย่อหน้า/ไม่เว้นช่องว่างเกิน) -->
        <div style="font-size:16px;font-weight:600;color:var(--text);line-height:1.65;white-space:normal;word-break:break-word;text-align:left;margin-bottom:16px">
          ${cleanQuestion}
        </div>

        ${(q.qImgs && q.qImgs.length) ? `
          <div class="q-media-box" style="margin:8px 0 16px">
            ${q.qImgs.map((img, i) => `<img src="${img}" class="q-media-img" style="--img-w:${qw}" onclick="openLightboxGallery(${qImgsJson}, ${i})">`).join('')}
          </div>` : ''}

        <!-- กล่องเปรียบเทียบชอยส์ -->
        <div style="display:flex;flex-direction:column;gap:11px">
          
          <!-- คำตอบของคุณ -->
          <div style="border-radius:16px;background:rgba(239,68,68,0.03);border:1.5px solid rgba(239,68,68,0.22);padding:14px 16px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
              <span style="font-size:12px;font-weight:800;color:#ef4444;display:flex;align-items:center;gap:5px">
                <i data-lucide="x-circle" style="width:15px;height:15px"></i> คำตอบของคุณ
              </span>
              <div style="width:24px;height:24px;border-radius:7px;background:#ef4444;color:#fff;display:grid;place-items:center;font-size:12px;font-weight:800">
                ${w.picked !== null ? LB[w.picked] : '-'}
              </div>
            </div>
            <div style="font-size:14.5px;color:var(--text);line-height:1.55;font-weight:500;text-align:left">
              ${w.picked !== null ? q.c[w.picked] : '<span style="color:var(--muted)">ไม่ได้ตอบ</span>'}
            </div>
            ${choiceExpPicked ? `
              <div style="font-size:12.5px;color:var(--muted);margin-top:8px;padding-top:8px;border-top:1px dashed rgba(239,68,68,0.2);line-height:1.5;text-align:left">
                <i data-lucide="lightbulb" class="ico"></i> <b>เหตุผล:</b> ${choiceExpPicked}
              </div>` : ''}
            ${pickedImg ? `<img src="${pickedImg}" class="img-thumb" style="width:${cw};height:auto;max-height:140px;margin-top:10px;border-radius:10px" onclick="openLightboxGallery(['${pickedImg}'], 0)">` : ''}
          </div>

          <!-- เฉลยที่ถูกต้อง -->
          <div style="border-radius:16px;background:rgba(18,161,80,0.03);border:1.5px solid rgba(18,161,80,0.25);padding:14px 16px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
              <span style="font-size:12px;font-weight:800;color:#059669;display:flex;align-items:center;gap:5px">
                <i data-lucide="check-circle-2" style="width:15px;height:15px"></i> เฉลยที่ถูกต้อง
              </span>
              <div style="width:24px;height:24px;border-radius:7px;background:#10b981;color:#fff;display:grid;place-items:center;font-size:12px;font-weight:800">
                ${LB[q.a]}
              </div>
            </div>
            <div style="font-size:14.5px;color:var(--text);line-height:1.55;font-weight:600;text-align:left">
              ${q.c[q.a]}
            </div>
            ${choiceExpCorrect ? `
              <div style="font-size:12.5px;color:var(--text2);margin-top:8px;padding-top:8px;border-top:1px dashed rgba(18,161,80,0.2);line-height:1.5;text-align:left">
                <i data-lucide="lightbulb" class="ico"></i> <b>เหตุผล:</b> ${choiceExpCorrect}
              </div>` : ''}
            ${correctImg ? `<img src="${correctImg}" class="img-thumb" style="width:${cw};height:auto;max-height:140px;margin-top:10px;border-radius:10px" onclick="openLightboxGallery(['${correctImg}'], 0)">` : ''}
          </div>

        </div>

        <!-- อธิบายเพิ่มเติม -->
        ${q.e ? `
          <div style="margin-top:12px;padding:12px 14px;background:var(--surface2);border-radius:14px;font-size:13px;color:var(--text2);line-height:1.6;text-align:left">
            <span style="font-size:11.5px;font-weight:800;color:var(--blue);display:block;margin-bottom:2px"><i data-lucide="lightbulb" class="ico"></i> อธิบายเพิ่มเติม</span>
            ${q.e}
          </div>` : ''}

        ${(q.eImgs && q.eImgs.length) ? `
          <div class="q-media-box" style="margin-top:10px">
            ${q.eImgs.map((img, i) => `<img src="${img}" class="q-media-img" style="--img-w:${ew}" onclick="openLightboxGallery(${eImgsJson}, ${i})">`).join('')}
          </div>` : ''}
        <button class="btn sm ghost" data-mkcard="${q.id}" style="margin-top:12px" ${S.cards.some(c => c.srcQ === q.id) ? 'disabled' : ''}>
          <i data-lucide="layers"></i>${S.cards.some(c => c.srcQ === q.id) ? 'มีบัตรจำข้อนี้แล้ว' : 'สร้างบัตรจำจากข้อนี้'}</button>
      </div>
    `;}).join('') : `
      <div style="text-align:center;padding:70px 16px;color:var(--muted)">
        <div style="width:54px;height:54px;border-radius:50%;background:rgba(16,185,129,0.1);color:#10b981;display:grid;place-items:center;margin:0 auto 12px">
          <i data-lucide="award" style="width:28px;height:28px"></i>
        </div>
        <b style="font-size:17px;color:var(--text);display:block;margin-bottom:4px">ไม่มีข้อผิดพลาด</b>
        <small style="font-size:13px">วิชานี้ตอบถูกครบทุกข้อ</small>
      </div>`;

    fsWrap.innerHTML = `
      <!-- Header -->
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 18px;background:var(--surface);border-bottom:1px solid var(--line);flex:none">
        <div style="display:flex;align-items:center;gap:12px">
          <button class="ib sm" id="btnFsClose" title="ย้อนกลับ" style="border-radius:12px"><i data-lucide="arrow-left"></i></button>
          <div style="display:flex;align-items:center;gap:10px">
            <div style="width:38px;height:38px;border-radius:12px;background:${cBg};color:${cFg};display:grid;place-items:center;flex-shrink:0">
              <i data-lucide="${catIcon}" style="width:19px;height:19px"></i>
            </div>
            <div>
              <b style="font-size:15.5px;color:var(--text);display:block;line-height:1.2">${esc(selectedCat)}</b>
              <div style="font-size:12px;margin-top:2px;display:flex;align-items:center;gap:6px">
                <span style="font-weight:800;color:var(--green)">✓ ${catStat.c}/${catStat.t} ข้อ</span>
                <span style="color:var(--muted)">· พลาด ${wrongInCat.length}</span>
              </div>
            </div>
          </div>
        </div>

        <div style="text-align:right">
          <span style="font-size:12.5px;font-weight:900;color:${isCatPass ? '#10b981' : '#ef4444'};background:${isCatPass ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)'};padding:4px 10px;border-radius:99px;display:inline-block">
            ${catPct}% ${isCatPass ? 'ผ่าน' : 'ตก'}
          </span>
        </div>
      </div>

      <!-- รายการข้อ -->
      <div style="flex:1;overflow-y:auto;padding:16px 14px 100px;-webkit-overflow-scrolling:touch">
        <div style="max-width:720px;margin:0 auto">
          ${wrongListHtml}
        </div>
      </div>

      <!-- ปุ่มล่าง -->
      <div style="padding:12px 20px calc(14px + env(safe-area-inset-bottom));background:var(--surface);border-top:1px solid var(--line);display:flex;gap:12px;justify-content:center;flex:none">
        <button class="btn ghost" id="btnFsBack" style="flex:1;max-width:180px;border-radius:14px;font-weight:700">
          ย้อนกลับ
        </button>
        ${wrongInCat.length ? `
          <button class="btn" id="btnFsReplay" style="flex:2;max-width:260px;background:#f59e0b;color:#fff;border-radius:14px;font-weight:700">
            <i data-lucide="repeat"></i> ซ่อมวิชานี้ (${wrongInCat.length})
          </button>` : ''}
      </div>
    `;

    icons(fsWrap);

    const closeFs = () => {
      playTone('tap');
      fsWrap.remove();
    };

    $('#btnFsClose').onclick = closeFs;
    $$('[data-mkcard]', fsWrap).forEach(btn => btn.onclick = () => {
      const q = S.questions.find(x => x.id === btn.dataset.mkcard); if(!q) return;
      const id = uid();
      S.cards.unshift({ id, srcQ: q.id, f: q.q, b: `${LB[q.a]}. ${q.c[q.a]}${q.e ? '\n\n' + q.e : ''}`, fImg: q.qImgs?.[0] || '', bImg: '', fPos: 'bottom', bPos: 'bottom', cat: q.cat, box: 0, due: 0 });
      pushUndo('สร้างบัตรจำจากข้อผิด', { addC: [id] }); save(); syncChrome();
      btn.disabled = true; btn.innerHTML = 'สร้างบัตรจำแล้ว';
      undoToast('สร้างบัตรจำแล้ว (ดูได้ในหน้าบัตรจำ)');
    });
    $('#btnFsBack').onclick = closeFs;

    if($('#btnFsReplay')){
      $('#btnFsReplay').onclick = () => {
        playTone('tap');
        fsWrap.remove();
        closeModal();
        startExam({
          ids: wrongInCat.map(item => item.q.id),
          count: wrongInCat.length,
          minutes: 0,
          mode: 'practice',
          label: `ซ่อมข้อผิด ${selectedCat}`
        });
      };
    }
    return;
  }

  // ==========================================
  // VIEW 1: หน้ารายการสรุปเลือกวิชา (Modal)
  // ==========================================
  const catEntries = Object.entries(res.byCat || {});
  const body = `
    <div style="display:flex;flex-direction:column;gap:16px;padding-top:4px">
      <!-- บัตรสรุปผล -->
      <div style="background:var(--surface2);border:1px solid var(--line);border-radius:18px;padding:16px 18px">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px">
          <div style="flex:1;min-width:0">
            <!-- ปรับ line-height และ padding-bottom เพื่อไม่ให้สระอุ/สระล่างโดนตัดหาง -->
            <b style="font-size:16.5px;color:var(--text);display:block;line-height:1.55;padding-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
              ${esc(getSmartExamLabel(res))}
            </b>
            <div style="font-size:12px;color:var(--muted);margin-top:1px">
              ${new Date(res.date).toLocaleDateString('th-TH', {day:'numeric',month:'short',year:'2-digit'})} · ${mmss(res.used)}
            </div>
          </div>

          <div style="text-align:right;flex-shrink:0">
            <div style="font-size:22px;font-weight:900;color:${ev.pass ? '#10b981' : '#ef4444'};line-height:1">
              ${pct}%
            </div>
            <span style="font-size:11px;font-weight:700;color:${ev.pass ? '#10b981' : '#ef4444'};background:${ev.pass ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)'};padding:2px 8px;border-radius:20px;display:inline-block;margin-top:4px">
              ${ev.pass ? 'ผ่าน' : 'ไม่ผ่าน'}
            </span>
          </div>
        </div>

        <!-- คะแนน: ถูกเด่นชัดเจน ผิดเป็นโทนรอง -->
        <div style="display:flex;align-items:center;gap:8px;margin-top:12px;padding-top:10px;border-top:1px solid var(--line);font-size:13px">
          <span style="font-weight:800;color:var(--green);background:var(--green-2);padding:2px 9px;border-radius:8px">
            ✓ ถูก ${res.correct}/${res.total}
          </span>
          <span style="color:var(--muted);font-weight:500;padding-left:2px">
            ผิด ${res.wrong}
          </span>
        </div>
      </div>

      <!-- รายการวิชา -->
      <div>
        <div style="font-size:12.5px;font-weight:700;color:var(--muted);margin-bottom:8px;padding-left:2px">
          เลือกวิชาเพื่อตรวจเฉลย
        </div>
        <div style="display:flex;flex-direction:column;gap:8px">
          ${catEntries.map(([c, v]) => {
            const p = Math.round(v.c / v.t * 100);
            const isPass = p >= 60;
            const wrongCount = res.wrongList.filter(w => {
              const q = S.questions.find(x => x.id === w.id);
              return q && q.cat === c;
            }).length;

            const [cBg, cFg] = tone(c);
            const iconName = cicon(c);

            return `
              <div class="picker-item" data-pickcat="${esc(c)}" style="margin:0;padding:12px 14px;border-radius:16px;background:var(--surface);border:1px solid var(--line);cursor:pointer;display:flex;align-items:center;gap:12px">
                <div style="width:38px;height:38px;border-radius:12px;background:${cBg};color:${cFg};display:grid;place-items:center;flex-shrink:0">
                  <i data-lucide="${iconName}" style="width:19px;height:19px"></i>
                </div>

                <div style="flex:1;min-width:0">
                  <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:3px">
                    <b style="font-size:14.5px;color:var(--text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(c)}</b>
                    <span style="font-size:12.5px;font-weight:800;color:${isPass ? '#10b981' : '#ef4444'}">${p}%</span>
                  </div>
                  
                  <div style="display:flex;align-items:center;gap:8px">
                    <div style="flex:1;height:4px;border-radius:99px;background:var(--surface3);overflow:hidden">
                      <div style="width:${p}\%;height:100\%;background:${isPass ? '#10b981' : '#ef4444'};border-radius:99px"></div>
                    </div>
                    <small style="font-size:11px;flex-shrink:0">
                      <b style="color:var(--green)">ถูก ${v.c}/${v.t}</b> 
                      <span style="color:var(--muted)">${wrongCount ? `(ผิด ${wrongCount})` : ''}</span>
                    </small>
                  </div>
                </div>

                <i data-lucide="chevron-right" style="width:16px;height:16px;color:var(--muted);flex-shrink:0"></i>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;

  openModal(esc(getSmartExamLabel(res)), body, `
    <button class="btn ghost" data-close style="border-radius:14px;font-weight:700">ปิด</button>
    ${res.wrongList.length ? `
      <button class="btn" id="btnReplayAllWrong" style="background:#f59e0b;color:#fff;border-radius:14px;font-weight:700">
        <i data-lucide="repeat"></i> ซ่อมข้อผิด (${res.wrongList.length})
      </button>` : ''}
  `);

  $$('[data-pickcat]').forEach(el => {
    el.onclick = () => {
      playTone('tap');
      openRoundDetail(resultId, el.dataset.pickcat);
    };
  });

  if($('#btnReplayAllWrong')){
    $('#btnReplayAllWrong').onclick = () => {
      playTone('tap');
      closeModal();
      startExam({
        ids: res.wrongList.map(w => w.id),
        count: res.wrongList.length,
        minutes: 0,
        mode: 'practice',
        label: 'ซ่อมข้อผิด'
      });
    };
  }
}

function applyActiveFont() {
  const st = S.settings;
  let fontStyle = document.getElementById('custom-font-style');
  if (!fontStyle) {
    fontStyle = document.createElement('style');
    fontStyle.id = 'custom-font-style';
    document.head.appendChild(fontStyle);
  }

  const active = (st.customFonts || []).find(f => f.id === st.activeFontId);
  if (active && active.data) {
    fontStyle.innerHTML = `
      @font-face {
        font-family: 'AppCustomFont';
        src: url(${active.data});
      }
      body, button, input, select, textarea, h1, h2, h3, b {
        font-family: 'AppCustomFont', 'Sarabun', sans-serif !important;
      }
      .rq, .face .q, .opt-text, .opt-boxed-text, .qt, .fcard .fin, .rte-area {
        font-family: 'Sarabun', sans-serif !important;
      }        
    `;
  } else {
    fontStyle.innerHTML = '';
  }
}

function openFontManagerModal() {
  playTone('tap');
  const list = S.settings.customFonts || [];
  const curId = S.settings.activeFontId || '';

  const body = `
    <div style="display:flex;flex-direction:column;gap:10px">
      <input type="file" id="fontFileInput" accept=".ttf,.otf,.woff,.woff2" hidden>
      <button class="btn blue block" id="btnUploadNewFont">
        <i data-lucide="plus"></i> อัปโหลดฟอนต์ใหม่ (.ttf / .otf)
      </button>

      <div style="font-size:12.5px;color:var(--muted);margin-top:6px">ฟอนต์ที่มีในระบบ:</div>
      <div style="display:flex;flex-direction:column;gap:6px;max-height:260px;overflow-y:auto">
        <button class="picker-item ${!curId ? 'on' : ''}" data-choosefont="">
          <span>ค่าเริ่มต้น (Sarabun)</span>
          <span class="chk"><i data-lucide="check" style="width:14px;height:14px"></i></span>
        </button>
        ${list.map(f => `
          <div class="picker-item ${curId === f.id ? 'on' : ''}" style="cursor:pointer" data-choosefont="${f.id}">
            <span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(f.name)}</span>
            <div class="row" style="gap:6px">
              <span class="chk"><i data-lucide="check" style="width:14px;height:14px"></i></span>
              <button class="ib sm red" data-delfont="${f.id}" title="ลบ" onclick="event.stopPropagation()"><i data-lucide="trash-2"></i></button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  openModal('จัดการฟอนต์ในแอป', body, `<button class="btn ghost block" data-close>ปิด</button>`);

  $('#btnUploadNewFont').onclick = () => $('#fontFileInput').click();
  $('#fontFileInput').onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const fontName = file.name.replace(/\.[^/.]+$/, "");
      S.settings.customFonts = S.settings.customFonts || [];
      const newId = uid();
      S.settings.customFonts.push({ id: newId, name: fontName, data: reader.result });
      S.settings.activeFontId = newId;
      save();
      applyActiveFont();
      openFontManagerModal();
      toast('เพิ่มและใช้ฟอนต์แล้ว', 'ok');
    };
    reader.readAsDataURL(file);
  };

  $$('[data-choosefont]').forEach(btn => {     
    btn.onclick = () => {       
      playTone('tap');       
      S.settings.activeFontId = btn.dataset.choosefont;       
      save();       
      applyActiveFont();       
      openFontManagerModal();       
      toast('เปลี่ยนฟอนต์แล้ว', 'ok');     
    };   
  });    

  $$('[data-delfont]').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      playTone('tap');
      const fid = btn.dataset.delfont;
      S.settings.customFonts = S.settings.customFonts.filter(x => x.id !== fid);
      if (S.settings.activeFontId === fid) S.settings.activeFontId = '';
      save();
      applyActiveFont();
      openFontManagerModal();
      toast('ลบฟอนต์แล้ว');
    };
  });
}

function renderSetting(){
  const st=S.settings;
  const currentTrackKey = curTrackKey();
  const currentTrack = getTrack(currentTrackKey);
  const curPos = st.heroPos || 'center';

  $('#view').innerHTML=`
  <div class="card">
    <div class="srow"><div class="ic" style="background:var(--navy);color:#fff"><i data-lucide="shield"></i></div>
      <div style="flex:1"><b>สายสอบ</b><small>${esc(currentTrack.ruleDesc)} · ${currentTrack.quotaTotal} ข้อ</small></div>
      <button class="c-select" id="btnSettingTrack">
        <span>${esc(currentTrack.label)}</span>
        <i data-lucide="chevron-down"></i>
      </button>
      <button class="ib sm" id="btnEditTrack" title="แก้เกณฑ์และจำนวนข้อ"><i data-lucide="sliders-horizontal"></i></button>
    </div>

    <div class="srow"><div class="ic" style="background:var(--red-2);color:var(--red)"><i data-lucide="calendar"></i></div>
      <div style="flex:1"><b>วันสอบจริง</b><small>นับถอยหลัง</small></div>
      <button class="c-select" id="btnPickDate">
        <span>${st.examDate ? formatThaiDate(st.examDate) : 'กำหนดวัน'}</span>
        <i data-lucide="chevron-down"></i>
      </button>
    </div>

    <div class="srow"><div class="ic" style="background:var(--surface3)"><i data-lucide="moon"></i></div>
      <div style="flex:1"><b>โหมดมืด</b><small>ถนอมตา</small></div>
      <div class="sw ${st.dark?'on':''}" id="s_dark"><i></i></div></div>

    <div class="srow"><div class="ic" style="background:var(--blue-2);color:var(--blue)"><i data-lucide="palette"></i></div>
      <div style="flex:1"><b>ธีมสี</b><small>เลือกโทนสีของทั้งแอป</small></div>
      <button class="c-select" id="btnPalette"><span>${(THEMES.find(x => x.id === st.palette) || THEMES[0]).name}</span><i data-lucide="chevron-down"></i></button>
    </div>

    <div class="srow"><div class="ic" style="background:var(--green-2);color:var(--green)"><i data-lucide="target"></i></div>
      <div style="flex:1"><b>เป้าต่อวัน</b><small>จำนวนข้อ</small></div>
      <button class="c-select" id="btnGoal">
        <span>${st.goal ? st.goal + ' ข้อ' : 'อัตโนมัติ (' + dailyGoal() + ' ข้อ)'}</span>
        <i data-lucide="chevron-down"></i>
      </button>
    </div>

    <div class="srow"><div class="ic" style="background:var(--cyan-2);color:var(--cyan)"><i data-lucide="shuffle"></i></div>
      <div style="flex:1"><b>สุ่มข้อ</b><small>สลับข้อ</small></div>
      <div class="sw ${st.shuffleQ?'on':''}" id="s_sq"><i></i></div></div>

    <div class="srow"><div class="ic" style="background:var(--violet-2);color:var(--violet)"><i data-lucide="list-restart"></i></div>
      <div style="flex:1"><b>สลับชอยส์</b><small>สลับ ก-ง</small></div>
      <div class="sw ${st.shuffleC?'on':''}" id="s_sc"><i></i></div></div>

    <div class="srow"><div class="ic" style="background:var(--blue-2);color:var(--blue)"><i data-lucide="play-circle"></i></div>
      <div style="flex:1"><b>ข้ามข้อออโต้</b><small>เลื่อนข้ออัตโนมัติ</small></div>
      <div class="sw ${st.autoNext?'on':''}" id="s_autonext"><i></i></div></div>

    <div class="srow"><div class="ic" style="background:var(--red-2);color:var(--red)"><i data-lucide="volume-2"></i></div>
      <div style="flex:1"><b>เสียงเอฟเฟกต์แอป</b><small>กดปุ่ม/ตอบถูกผิด</small></div>
      <div class="sw ${st.sound?'on':''}" id="s_snd"><i></i></div></div>
      
    <div class="srow"><div class="ic" style="background:var(--violet-2);color:var(--violet)"><i data-lucide="type"></i></div>
      <div style="flex:1"><b>ฟอนต์ในแอป</b><small>โหลดและเลือกใช้ฟอนต์เอง</small></div>
      <button class="btn sm violet" id="btnManageFont" style="background:var(--violet);color:#fff"><i data-lucide="folder"></i>จัดการฟอนต์</button>
    </div>

    <div class="srow" style="flex-wrap:wrap"><div class="ic" style="background:var(--blue-2);color:var(--blue)"><i data-lucide="image"></i></div>
      <div style="flex:1"><b>ภาพพื้นหลัง</b><small>ตำแหน่งรูป</small></div>
      <div class="row" style="gap:6px">
        <button class="btn sm ghost" id="btnUploadHero"><i data-lucide="upload"></i>เปลี่ยนรูป</button>
        ${st.heroBg ? '<button class="ib sm red" id="btnResetHero" title="ลบ"><i data-lucide="trash-2"></i></button>' : ''}
      </div>
      ${st.heroBg ? `
        <div style="width:100%;margin-top:8px;padding-top:8px;border-top:1px dashed var(--line);display:flex;align-items:center;justify-content:space-between">
          <small style="color:var(--muted)">ตำแหน่งภาพ:</small>
          <div class="chips">
            <button class="chip sm ${curPos==='top'?'on':''}" data-hpos="top">บน</button>
            <button class="chip sm ${curPos==='center'?'on':''}" data-hpos="center">กลาง</button>
            <button class="chip sm ${curPos==='bottom'?'on':''}" data-hpos="bottom">ล่าง</button>
          </div>
        </div>` : ''}
    </div>
    <input type="file" id="heroFileInput" accept="image/*" hidden>
  </div>

  <div class="sec"><i data-lucide="folder-tree"></i>จัดการหมวด</div>
  <div class="card">
    <div id="catbox">${S.cats.map(c=>{
      const n=S.questions.filter(q=>q.cat===c).length, m=S.cards.filter(x=>x.cat===c).length;
      const [bg,fg]=tone(c);
      return `<div class="catrow">
        <div class="ic" style="background:${bg};color:${fg}"><i data-lucide="${cicon(c)}"></i></div>
        <div style="flex:1"><b style="font-size:14.5px">${esc(c)}</b>
          <div style="font-size:12px;color:var(--muted)">${n.toLocaleString()} ข้อ · ${m.toLocaleString()} บัตร</div></div>
        <button class="ib sm" data-seticon="${esc(c)}" title="เปลี่ยนสี/ไอคอน"><i data-lucide="palette"></i></button>
        <button class="ib sm" data-catdrop="${esc(c)}" title="ลบ"><i data-lucide="trash-2"></i></button></div>`;}).join('')}</div>
    <div class="row" style="gap:8px;margin-top:14px">
      <input class="inp" id="newcat" placeholder="ชื่อหมวด" style="flex:1">
      <button class="btn" id="addcat"><i data-lucide="plus"></i>เพิ่ม</button></div>
  </div>

  <div class="sec"><i data-lucide="database"></i>ฐานข้อมูล</div>
  <div class="card">
    <div style="font-size:12.5px;color:${backupDaysAgo()>=BACKUP_REMIND_DAYS?'var(--red)':'var(--muted)'};margin-bottom:10px">
      สำรองล่าสุด: ${st.lastBackup ? formatThaiDate(dkey(new Date(st.lastBackup))) + ` (${backupDaysAgo()} วันก่อน)` : 'ยังไม่เคยสำรอง'}
    </div>
    <div class="grid g2">
      <button class="btn ghost" id="d_out"><i data-lucide="download"></i>ส่งออก</button>
      <button class="btn ghost" id="d_in"><i data-lucide="upload"></i>นำเข้า</button>
      <button class="btn red" id="d_clearall"><i data-lucide="trash-2"></i>ล้างทั้งหมด</button>
      <button class="btn red" id="d_reset"><i data-lucide="rotate-ccw"></i>ล้างสถิติ</button>
    </div>
    <input type="file" id="d_file" accept="application/json" hidden>
    <div class="srow" style="margin-top:8px;border-top:1px solid var(--line)"><div class="ic" style="background:var(--blue-2);color:var(--blue)"><i data-lucide="undo-2"></i></div>
      <div style="flex:1"><b>ย้อนกลับการเปลี่ยนแปลง</b><small>นำเข้า ลบ หรือล้างข้อมูลล่าสุด</small></div>
      <button class="c-select" id="btnUndoList">${UNDO.length ? `ดู (${UNDO.length})` : 'ไม่มี'}</button>
    </div>
    <div class="srow"><div class="ic" style="background:var(--orange-2);color:var(--orange)"><i data-lucide="bug"></i></div>
      <div style="flex:1"><b>บันทึกข้อผิดพลาด</b><small>เก็บปัญหาที่เกิดในเครื่องนี้ไว้ส่งให้ช่วยแก้</small></div>
      <button class="c-select" id="btnErrLog">${readErrLog().length ? `ดู (${readErrLog().length})` : 'ไม่มี'}</button>
    </div>
  </div>

  <div class="card" style="margin-top:14px;text-align:center;color:var(--muted);font-size:12.5px">
    <b style="color:var(--text)">P-exam</b><br>ใช้ได้แม้ไม่มีเน็ต เมื่อเปิดครั้งแรกแล้ว · ติดตั้งเป็นแอปได้จากเมนูเบราว์เซอร์
  </div>`;

  $('#btnManageFont').onclick = () => {
    openFontManagerModal();
  };

  $$('[data-hpos]').forEach(b => {
    b.onclick = () => {
      playTone('tap');
      S.settings.heroPos = b.dataset.hpos;
      save();
      renderSetting();
      toast('ปรับแล้ว', 'ok');
    };
  });

  $('#s_dark').onclick=()=>{playTone('tap');S.settings.dark=!S.settings.dark;save();theme();renderSetting();};

  $('#btnPickDate').onclick=()=>{
    openThaiDatePicker(st.examDate, (val)=>{
      S.settings.examDate = val;
      save();
      renderSetting();
      toast(val ? `วันสอบ: ${formatThaiDate(val)}` : 'ล้างแล้ว', 'ok');
    });
  };
  
  $('#btnSettingTrack').onclick = () => pickTrack(renderSetting);
  $('#btnEditTrack').onclick = () => openTrackEditor(curTrackKey());

  $('#btnGoal').onclick=()=>{
    openPicker({
      title:'เป้าต่อวัน',
      options: [{val:0, label:'อัตโนมัติ (คำนวณจากวันสอบ)'}, ...GOAL_OPTIONS.map(n=>({val:n, label:`${n} ข้อ / วัน`}))],
      value:st.goal,
      onSelect:(v)=>{
        S.settings.goal = +v;
        save();
        renderSetting();
        toast('บันทึกแล้ว','ok');
      }
    });
  };

  $('#s_sq').onclick=()=>{playTone('tap');S.settings.shuffleQ=!S.settings.shuffleQ;save();renderSetting();toast('บันทึกแล้ว','ok');};
  
  $('#s_autonext').onclick = () => {
    playTone('tap');
    S.settings.autoNext = !S.settings.autoNext;
    save();
    renderSetting();
    toast('บันทึกแล้ว', 'ok');
  };

  $('#s_sc').onclick=()=>{playTone('tap');S.settings.shuffleC=!S.settings.shuffleC;save();renderSetting();toast('บันทึกแล้ว','ok');};
  
  $('#s_snd').onclick=()=>{
    S.settings.sound=!S.settings.sound;
    save();
    renderSetting();
    if(S.settings.sound) playTone('ok');
  };

  const heroInput = $('#heroFileInput');
  $('#btnUploadHero').onclick = () => { playTone('tap'); heroInput.click(); };

  heroInput.onchange = async e => {
    const file = e.target.files[0];
    if(!file) return;
    const optImg = await optimizeImage(file, 1200, 0.85);
    openImageEditor(optImg, (finalImg) => {
      S.settings.heroBg = finalImg;
      save();
      renderSetting();
      toast('เปลี่ยนแล้ว', 'ok');
    });
    e.target.value = '';
  };

  if($('#btnResetHero')){
    $('#btnResetHero').onclick = async () => {
      if(await ask('รีเซ็ตพื้นหลัง?', 'ใช้ค่าเริ่มต้น', 'รีเซ็ต')){
        S.settings.heroBg = '';
        save();
        renderSetting();
        toast('ลบแล้ว', 'ok');
      }
    };
  }

  $$('[data-seticon]').forEach(b=>b.onclick=()=>{ playTone('tap'); openIconPicker(b.dataset.seticon); });

  $('#addcat').onclick=()=>{
    playTone('tap');
    const v=$('#newcat').value.trim();
    if(!v)return toast('ใส่ชื่อหมวด','err');
    if(S.cats.includes(v))return toast('มีหมวดนี้แล้ว','err');
    S.cats.push(v);
    save();
    renderSetting();
    toast('เพิ่มแล้ว','ok');
  };
  $('#newcat').onkeydown=e=>{if(e.key==='Enter')$('#addcat').click();};

  $$('[data-catdrop]').forEach(b => b.onclick = () => deleteCategory(b.dataset.catdrop));

  $('#d_out').onclick=()=>{ playTone('tap'); exportBackup(); renderSetting(); };
  $('#btnErrLog').onclick = () => openErrLog();
  $('#btnPalette').onclick = () => openPalettePicker();
  $('#btnUndoList').onclick = () => openUndoList();
  
  $('#d_in').onclick=()=>{ playTone('tap'); $('#d_file').click(); };
  $('#d_file').onchange=e=>{
    const f=e.target.files[0]; if(!f)return;
    const rd=new FileReader();
    rd.onload=()=>{try{
      const d=JSON.parse(rd.result);
      if(!d||!Array.isArray(d.questions))throw 0;
      ask('นำเข้าไฟล์สำรอง?', `ข้อมูลในเครื่องทั้งหมดจะถูกแทนที่ด้วยไฟล์นี้ (ข้อสอบ ${d.questions.length} ข้อ) · ย้อนกลับได้`, 'นำเข้า', false).then(ok => {
        if(!ok) return;
        snapshotUndo('นำเข้าไฟล์สำรอง');
        S=sanitizeState(Object.assign(fresh(),d));
        if(!S.tracks) S.tracks = clone(DEFAULT_TRACKS);
        day(); save(); theme(); go('home'); undoToast('นำเข้าไฟล์สำรองแล้ว');
      });
    }catch(x){toast('ไฟล์ไม่ถูกต้อง','err');}};
    rd.readAsText(f); e.target.value='';
  };

  $('#d_clearall').onclick=async()=>{
    if(await ask('ล้างข้อมูลทั้งหมด?','ข้อมูลทั้งหมดจะถูกรีเซ็ตเป็น 0 (ย้อนกลับได้จนกว่าจะล้างข้อมูลเบราว์เซอร์)','ล้างทั้งหมด')){
      snapshotUndo('ล้างข้อมูลทั้งหมด');
      S=fresh();
      await dbSet('state',S);
      day();theme();renderSetting();syncChrome();
      undoToast('ล้างหมดแล้ว');
    }
  };

    $('#d_reset').onclick=async()=>{
    if(await ask('ล้างสถิติ?','ประวัติการสอบจะถูกรีเซ็ต ยกเว้น เวลาสะสม (ย้อนกลับได้)','ล้างสถิติ')){
      snapshotUndo('ล้างสถิติ');
      S.results = [];
      S.qstat = {};
      S.stats.days = {}; // ล้างเฉพาะประวัติรายวัน แต่คง S.stats.minutes (เวลาสะสม) ไว้
      S.session = null;
      S.last = null;
      S.questions.forEach(q => { q.d = 'ง่าย'; });
      day();
      save();
      renderSetting();
      syncChrome();
      undoToast('ล้างสถิติแล้ว');
    }
  };
  icons();
}

const BACKUP_REMIND_DAYS = 7;
function backupDaysAgo(){
  const t = S.settings.lastBackup;
  return t ? Math.floor((Date.now() - t) / 864e5) : Infinity;
}
function exportBackup(){
  const blob=new Blob([JSON.stringify(S,null,2)],{type:'application/json'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob); a.download=`p-exam-backup-${dkey()}.json`; a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href),1500);
  S.settings.lastBackup = Date.now(); save();
  toast('ส่งออกแล้ว','ok');
}
// เตือนวันละครั้งถ้าไม่ได้สำรองเกิน 7 วัน (ข้อมูลอยู่ในเบราว์เซอร์อย่างเดียว ล้างแล้วหาย)
function remindBackup(){
  if(!S.questions.length || backupDaysAgo() < BACKUP_REMIND_DAYS) return;
  if(S.settings.backupNagDay === dkey()) return;
  S.settings.backupNagDay = dkey(); save();
  const ago = backupDaysAgo();
  openModal('สำรองข้อมูลกันหาย', `<p style="color:var(--text2);line-height:1.6">
    ${ago === Infinity ? 'ยังไม่เคยสำรองข้อมูลเลย' : `ไม่ได้สำรองข้อมูลมา ${ago} วัน`}<br>
    ข้อสอบ ${S.questions.length.toLocaleString()} ข้อและสถิติทั้งหมดเก็บอยู่ในเบราว์เซอร์นี้เท่านั้น ถ้าล้างข้อมูลเบราว์เซอร์หรือเปลี่ยนเครื่องจะหายทั้งหมด</p>`,
    `<button class="btn ghost" data-close>ภายหลัง</button><button class="btn" id="btnNagBackup"><i data-lucide="download"></i>สำรองเลย</button>`);
  $('#btnNagBackup').onclick = () => { exportBackup(); closeModal(); };
}

function openErrLog(){
  const list = readErrLog();
  const fmt = x => new Date(x.t).toLocaleString('th-TH',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'});
  const META_PAGE = {home:'หน้าแรก',quiz:'ข้อสอบ',cards:'บัตรจำ',exam:'จำลองสอบ',run:'กำลังสอบ',result:'ผลลัพธ์',setting:'ตั้งค่า'};
  const pg = p => META_PAGE[p] || p;
  const text = `ข้อมูลเครื่อง: ${deviceInfo()}\n\n` + (list.length ? list.map(x =>
    `${fmt(x)} · ${pg(x.page)}\n  ${x.msg}${x.where ? ' ('+x.where+')' : ''}${x.tap ? '\n  แตะล่าสุด: '+x.tap : ''}`).join('\n\n') : 'ไม่มีข้อผิดพลาด');
  openModal('บันทึกข้อผิดพลาด', `
    ${list.length ? list.map(x => `<div style="padding:10px 0;border-bottom:1px solid var(--line)">
        <div style="font-size:12px;color:var(--muted)">${esc(fmt(x))} · ${esc(pg(x.page))}</div>
        <div style="font-size:13.5px;font-weight:600;color:var(--red);word-break:break-word;margin-top:2px">${esc(x.msg)}</div>
        ${x.where ? `<div style="font-size:12px;color:var(--muted)">${esc(x.where)}</div>` : ''}
        ${x.tap ? `<div style="font-size:12px;color:var(--text2)">แตะล่าสุด: ${esc(x.tap)}</div>` : ''}
      </div>`).join('') : '<div class="empty" style="padding:24px"><div>ไม่มีข้อผิดพลาด</div></div>'}
    <div style="font-size:12px;color:var(--muted);margin-top:12px">ข้อมูลเครื่อง: ${esc(deviceInfo())}</div>`,
    `<button class="btn ghost" id="errClear"><i data-lucide="trash-2"></i>ล้าง</button><button class="btn" id="errCopy"><i data-lucide="copy"></i>คัดลอกทั้งหมด</button>`);
  $('#errClear').onclick = () => { localStorage.removeItem(ERRLOG_KEY); closeModal(); if(PAGE==='setting') renderSetting(); toast('ล้างแล้ว','ok'); };
  $('#errCopy').onclick = async () => {
    try{ await navigator.clipboard.writeText(text); }
    catch(e){ const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); }
    toast('คัดลอกแล้ว วางในแชตได้เลย','ok');
  };
}
