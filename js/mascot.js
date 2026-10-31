// น้องไฟ — SVG ท่า: watch friendly joy gusto confused upset sly walk · สีเลือกได้ (S.settings.mascCol)
const MASC_PAL = [['#a66bff', '#6a7dff', '#36a3ff'], ['#ff9a3c', '#ff5a36', '#ff3d6e'], ['#ff8ad8', '#ff5fa8', '#ff4f7b'], ['#5ef0c0', '#22d3a6', '#14a8e0'], ['#ffd84a', '#ffb020', '#ff7a1f']];
const MASC_TALK = ['อีกนิดเดียว!', 'เก่งมาก ไปต่อ!', 'ค่อยๆ ทำนะ', 'สู้ๆ!', 'วันนี้ฝึกแล้วเก่งขึ้นแน่'];
const MASC_K = '#111';
const MASC_BODY = 'M14 112C10 90 10 64 16 46C18 38 22 32 26 26C26 36 28 42 32 46C34 30 40 14 54 2C52 16 56 28 62 36C66 28 70 22 78 16C76 26 78 34 84 40C86 36 88 32 90 28C96 46 98 74 96 112Q90 122 82 114Q74 122 66 114Q58 122 50 114Q42 122 34 114Q26 122 18 116Z';
const MASC_GHOST = 'M14 112C12 84 22 58 55 58C88 58 98 84 96 112Q90 122 82 114Q74 122 66 114Q58 122 50 114Q42 122 34 114Q26 122 18 116Z';
function mascCol(){ return (typeof S !== 'undefined' && S.settings && S.settings.mascCol) || 0; }
function mascFace(m, g){
  const K = MASC_K, eye = (x, r = 10.5, dx = 0, dy = 0) => `<circle cx="${x}" cy="86" r="${r}" fill="#fff"/><g class="m-pup"><circle cx="${x + dx}" cy="${86 + dy}" r="${r * .57}" fill="${K}"/></g>`;
  const lid = (y = 86, a = 34, b = 76, r = 11.2) => { const w = Math.sqrt(r * r - (86 - y) ** 2).toFixed(2); return `<path d="${[a, b].map(x => `M${x - w} ${y}A${r} ${r} 0 0 1 ${x + +w} ${y}Z`).join('')}" fill="url(#${g})"/>`; };
  const st = `fill="none" stroke="${K}" stroke-width="2.6" stroke-linecap="round"`;
  if(m === 'joy') return `<g class="m-eyes">${eye(32, 10.5, -1)}${eye(78, 10.5, 1)}</g><path d="M50 84c6-6 15-1 13 7c-2 8-12 9-15 3c-2-4 0-8 2-10z" fill="${K}"/><path d="M53 89q3-3 5 0" ${st} stroke="url(#${g})" stroke-width="2"/>`;
  if(m === 'sly') return `<g class="m-eyes">${eye(34, 10.5, 2, 2)}${eye(76, 10.5, -2, 2)}${lid(83)}</g><path d="M50 93q5 4 10 0" ${st}/>`;
  if(m === 'gusto') return `<g class="m-eyes">${eye(34, 10.5, 3, 3)}${eye(76, 10.5, 3, 3)}${lid(85)}</g><path d="M52 92q3 2 5 0q-1 3 2 4" ${st}/>`;
  if(m === 'confused') return `<g class="m-eyes">${eye(32, 11)}${eye(78, 9.5, 0, 2)}</g><path d="M47 86l15 4" ${st}/>`;
  if(m === 'upset') return `<g class="m-eyes">${eye(34, 10.5, 0, 3)}${eye(76, 10.5, 0, 3)}${lid(84)}</g><path d="M50 94q5-5 10 0" ${st}/>`;
  if(m === 'walk') return `<g class="m-eyes">${eye(36, 10.5, 3)}${eye(78, 10.5, 3)}</g><path d="M53 92q5 4.5 10 0" ${st}/>`;
  if(m === 'watch') return `<g class="m-eyes">${eye(34)}${eye(76)}</g><circle cx="55" cy="91" r="2" fill="${K}"/>`;
  return `<g class="m-eyes">${eye(34, 10.5, 1.5, 1)}${eye(76, 10.5, -1.5, 1)}</g><path d="M50 92q5 4.5 10 0" ${st}/>`; // friendly
}
function mascSvg(m){
  const c = MASC_PAL[mascCol()] || MASC_PAL[0], g = 'mg' + mascCol();
  const arms = m === 'joy' ? `<path d="M15 60C6 54 2 44 4 34C10 42 14 44 20 46ZM95 60C104 54 108 44 106 34C100 42 96 44 90 46Z" fill="url(#${g})"/>`
    : m === 'walk' ? `<path d="M88 104q14-2 16 4q-2 6-14 6z" fill="url(#${g})"/>` : '';
  return `<svg viewBox="0 0 110 126" aria-hidden="true"><defs><linearGradient id="${g}" gradientUnits="userSpaceOnUse" x1="10" y1="0" x2="70" y2="126"><stop offset="0" stop-color="${c[0]}"/><stop offset=".5" stop-color="${c[1]}"/><stop offset="1" stop-color="${c[2]}"/></linearGradient></defs>
    <ellipse class="m-sh" cx="55" cy="121" rx="36" ry="4" fill="${c[1]}" opacity=".18"/>
    <g class="m-body">${arms}<path class="m-fl" d="${m === 'upset' ? MASC_GHOST : MASC_BODY}" fill="url(#${g})"/>${mascFace(m, g)}</g></svg>`;
}
function mascot(m = 'watch', id = '', cls = ''){ return `<button class="masc m-${m} ${cls}" ${id ? `id="${id}"` : ''} onclick="mascTap(this, event)" aria-label="น้องไฟ">${mascSvg(m)}</button>`; }
function mascMood(el){ const r = /\bm-(\w+)/.exec(el.className); return r ? r[1] : 'watch'; }
function mascSet(el, m){
  if(!el) return;
  el.className = el.className.replace(/\bm-\w+/, 'm-' + m).replace(/\s*\bbump\b/, '');
  el.innerHTML = mascSvg(m); void el.offsetWidth; el.classList.add('bump');
}
function mascLook(el, e){ // ลูกตามองตามจุดที่แตะ
  if(!el || !e) return;
  const r = el.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2), d = Math.hypot(dx, dy) || 1;
  el.style.setProperty('--px', (dx / d * 3).toFixed(1) + 'px'); el.style.setProperty('--py', (dy / d * 2.5).toFixed(1) + 'px');
}
function mascTap(el, e){
  if(e && e.target.closest('[data-mc]')){ // เปลี่ยนสี
    e.stopPropagation(); S.settings.mascCol = +e.target.closest('[data-mc]').dataset.mc; save();
    playTone('tap'); document.querySelectorAll('.masc').forEach(x => mascSet(x, mascMood(x) === 'upset' ? 'upset' : x === el ? 'joy' : mascMood(x)));
    return;
  }
  playTone('tap'); const keep = mascMood(el) === 'upset';
  mascSet(el, keep ? 'upset' : 'friendly');
  document.querySelectorAll('.masc-say').forEach(x => x.remove());
  const t = document.createElement('span'); t.className = 'masc-say';
  t.innerHTML = `<b>${MASC_TALK[Math.floor(Math.random() * MASC_TALK.length)]}</b><span>${MASC_PAL.map((c, k) => `<i data-mc="${k}" class="${k === mascCol() ? 'on' : ''}" style="background:linear-gradient(135deg,${c[0]},${c[2]})"></i>`).join('')}</span>`;
  el.appendChild(t); clearTimeout(el._st); el._st = setTimeout(() => t.remove(), 3500);
}
