// ตัวละครไฟ "น้องไฟ" — SVG วาดเอง ท่า: watch friendly joy gusto confused upset sly walk
const MASC_C = '#ff5a36';
const MASC_TALK = ['อีกนิดเดียว!', 'เก่งมาก ไปต่อ!', 'ค่อยๆ ทำนะ', 'สู้ๆ!', 'วันนี้ฝึกแล้วเก่งขึ้นแน่'];
function mascFace(m){
  const eye = (x, s = 1) => `<circle cx="${x}" cy="62" r="${9 * s}" fill="#fff"/><g class="m-pup"><circle cx="${x}" cy="${m === 'upset' ? 65 : 62}" r="${5 * s}" fill="#1e1b2e"/><circle cx="${x + 1.6}" cy="${m === 'upset' ? 63.4 : 60.4}" r="1.5" fill="#fff"/></g>`;
  const st = 'fill="none" stroke="#1e1b2e" stroke-width="3.6" stroke-linecap="round"';
  const open = `<path d="M41 71h18q0 13-9 13t-9-13z" fill="#1e1b2e"/><path d="M45 80q5-4 10 0q-2 3-5 3t-5-3z" fill="#ff8fa3"/>`;
  if(m === 'joy') return `<path d="M28 64q8-9 16 0M56 64q8-9 16 0" ${st}/>${open}`;
  if(m === 'gusto') return `<g class="m-eyes">${eye(36)}${eye(64)}</g>${open}<path d="M10 40l-6-4M8 54H1M90 40l6-4M92 54h7" ${st} stroke="#ffb020"/>`;
  if(m === 'confused') return `<g class="m-eyes">${eye(36)}${eye(64, .8)}</g><path d="M42 77q4-4 8 0t8 0" ${st}/>`;
  if(m === 'upset') return `<g class="m-eyes">${eye(36)}${eye(64)}</g><path d="M27 50l12 4M73 50l-12 4" ${st}/><path d="M44 79q6-6 12 0" ${st}/>`;
  if(m === 'sly') return `<g class="m-eyes">${eye(36)}${eye(64)}<path d="M25 52h22v9H25zM53 52h22v9H53z" fill="${MASC_C}"/><path d="M26 61h20M54 61h20" ${st}/></g><path d="M44 75q7 4 13-2" ${st}/>`;
  const mouth = m === 'watch' ? '<circle cx="50" cy="75" r="2.4" fill="#1e1b2e"/>' : `<path d="M44 73q6 6 12 0" ${st}/>`;
  return `<g class="m-eyes">${eye(36)}${eye(64)}</g>${mouth}`;
}
function mascSvg(m){
  return `<svg viewBox="0 0 100 112" aria-hidden="true"><ellipse class="m-sh" cx="50" cy="106" rx="30" ry="4.5" fill="#1e1b2e" opacity=".12"/>
    <g class="m-body"><path d="M16 94C12 74 14 52 22 28c4 10 8 14 14 16C36 28 42 14 52 4c4 14 10 22 14 30c4-4 8-8 14-12c8 18 10 42 6 72q-7 10-14 2q-7 10-14 2q-7 10-14 2q-7 10-14 2q-7 10-14 0z" fill="${MASC_C}"/>
    <path d="M30 88c-4-14-2-26 4-36c4 6 8 8 12 8c0-10 4-18 8-24c4 10 10 16 12 24c4 10 4 20 2 28z" fill="#ff7a4f" opacity=".55"/>${mascFace(m)}</g></svg>`;
}
function mascot(m = 'watch', id = '', cls = ''){ return `<button class="masc m-${m} ${cls}" ${id ? `id="${id}"` : ''} onclick="mascTap(this)" aria-label="น้องไฟ">${mascSvg(m)}</button>`; }
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
function mascTap(el){
  playTone('tap'); mascSet(el, el.classList.contains('m-upset') ? 'upset' : 'friendly');
  document.querySelectorAll('.masc-say').forEach(x => x.remove());
  const t = document.createElement('span'); t.className = 'masc-say'; t.textContent = MASC_TALK[Math.floor(Math.random() * MASC_TALK.length)];
  el.appendChild(t); setTimeout(() => t.remove(), 1800);
}
