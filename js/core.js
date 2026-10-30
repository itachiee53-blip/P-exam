"use strict";
// ==========================================
// บันทึกข้อผิดพลาดในเครื่อง (ไม่ส่งออกไปไหน จนกว่าผู้ใช้กดคัดลอกเอง)
// ==========================================
const ERRLOG_KEY = 'pp_errlog', ERRLOG_MAX = 50;
let lastTapLabel = '';
function readErrLog(){ try{ return JSON.parse(localStorage.getItem(ERRLOG_KEY)) || []; }catch(e){ return []; } }
function logErr(msg, where){
  try{
    const list = readErrLog();
    list.unshift({ t: Date.now(), page: (document.body && document.body.dataset.page) || 'เริ่มแอป',
      msg: String(msg).slice(0, 300), where: where ? String(where).slice(0, 120) : '', tap: lastTapLabel });
    localStorage.setItem(ERRLOG_KEY, JSON.stringify(list.slice(0, ERRLOG_MAX)));
  }catch(e){}
}
function deviceInfo(){
  const ua = navigator.userAgent;
  const br = (ua.match(/SamsungBrowser\/[\d.]+/) || ua.match(/(CriOS|Chrome|FxiOS|Firefox|Edg)\/[\d.]+/) || ua.match(/Version\/[\d.]+.*Safari/) || ['ไม่ทราบ'])[0].replace(/\.\d+(\.\d+)*$/,'');
  const os = (ua.match(/Android [\d.]+/) || ua.match(/(iPhone|iPad) OS [\d_]+/) || ua.match(/(Windows|Mac OS X)[^;)]*/) || [''])[0].replace(/_/g,'.');
  return `${br} · ${os} · จอ ${innerWidth}×${innerHeight}`;
}
window.addEventListener('error', e => {
  const el = e.target;
  if(el && el !== window && el.getAttribute){
    const u = el.getAttribute('src') || el.getAttribute('href');
    if(u) logErr(`โหลดไฟล์ไม่สำเร็จ: ${u.split('/').pop().slice(0,60)}`, el.tagName.toLowerCase()); // ข้าม <img src=""> ที่ยังว่าง
  }
  else logErr(e.message || 'Error', e.filename ? `บรรทัด ${e.lineno}:${e.colno}` : '');
}, true);
window.addEventListener('unhandledrejection', e => logErr((e.reason && (e.reason.message || e.reason)) || 'Promise error', 'async'));
document.addEventListener('pointerdown', e => {
  const b = e.target.closest && e.target.closest('button,[data-go],.chip,.sw');
  if(!b) return;
  // เก็บแค่ชื่อปุ่ม ไม่เก็บเนื้อหาข้อสอบ
  lastTapLabel = b.closest('.opt,.qrow,.fcard') ? 'ตัวเลือก/ข้อสอบ' : (b.title || b.textContent || b.id || '').trim().replace(/\s+/g,' ').slice(0, 30);
}, {capture:true, passive:true});
const LB = ['ก','ข','ค','ง'];
const DIFFS = ['ง่าย','ปานกลาง','ยาก'];
const ICONS = {'กฎหมาย':'scale','งานสารบรรณ':'file-stack','คอมพิวเตอร์':'monitor','ภาษาไทย':'book-open','ความรู้ทั่วไป':'globe','ระเบียบตำรวจ':'shield','คณิตศาสตร์':'calculator','ความสามารถทั่วไป':'brain','ภาษาอังกฤษ':'languages'};
const TONES = [['var(--blue-2)','var(--blue)'],['var(--green-2)','var(--green)'],['var(--orange-2)','var(--orange)'],['var(--red-2)','var(--red)'],['var(--violet-2)','var(--violet)']];

const THAI_MONTHS = ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
const GOAL_OPTIONS = [10, 20, 50, 150, 300, 600];

const ICON_POOL = [
  'scale','file-stack','monitor','book-open','globe','shield',
  'graduation-cap','zap','flame','target','trophy','award',
  'cpu','database','bookmark','lightbulb','brain','pencil',
  'calculator','languages','compass','feather','badge-check','key',
  'lock','unlock','bell','clock','calendar','folder',
  'folder-check','heart','star','sparkles','help-circle','info'
];

const COLOR_POOL = [
  {bg:'color-mix(in srgb,#e5484d 16%,var(--surface))',fg:'#e5484d',name:'แดง'},
  {bg:'color-mix(in srgb,#f76b15 16%,var(--surface))',fg:'#f76b15',name:'ส้ม'},
  {bg:'color-mix(in srgb,#c99a06 16%,var(--surface))',fg:'#c99a06',name:'ทอง'},
  {bg:'color-mix(in srgb,#5d9b1c 16%,var(--surface))',fg:'#5d9b1c',name:'เขียวมะนาว'},
  {bg:'color-mix(in srgb,#2f9e64 16%,var(--surface))',fg:'#2f9e64',name:'เขียว'},
  {bg:'color-mix(in srgb,#0e9f9a 16%,var(--surface))',fg:'#0e9f9a',name:'เขียวน้ำทะเล'},
  {bg:'color-mix(in srgb,#0b8bd6 16%,var(--surface))',fg:'#0b8bd6',name:'ฟ้า'},
  {bg:'color-mix(in srgb,#3e63dd 16%,var(--surface))',fg:'#3e63dd',name:'น้ำเงิน'},
  {bg:'color-mix(in srgb,#8e4ec6 16%,var(--surface))',fg:'#8e4ec6',name:'ม่วง'},
  {bg:'color-mix(in srgb,#d6409f 16%,var(--surface))',fg:'#d6409f',name:'ชมพู'},
  {bg:'color-mix(in srgb,#9a6235 16%,var(--surface))',fg:'#9a6235',name:'น้ำตาล'},
  {bg:'color-mix(in srgb,#5f6673 16%,var(--surface))',fg:'#5f6673',name:'เทา'}
];

// ค่าเริ่มต้นของสายสอบ (ผู้ใช้แก้/เพิ่มสายได้ในตั้งค่า → เก็บไว้ใน S.tracks)
// rule: 'parts' = ต้องผ่านทุกภาค, 'total' = ดูคะแนนรวม
const DEFAULT_TRACKS = {
  admin: {
    name: 'อำนวยการ', year: '2569', rule: 'parts', passPct: 60, minutes: 180,
    focusCats: ['งานสารบรรณ', 'คอมพิวเตอร์'],
    quota: { 'ความสามารถทั่วไป': 20, 'คณิตศาสตร์': 20, 'ภาษาไทย': 20, 'งานสารบรรณ': 30, 'คอมพิวเตอร์': 40, 'กฎหมาย': 25, 'ภาษาอังกฤษ': 15 },
    parts: [
      { name: 'ภาค 1 ความรู้ความสามารถทั่วไป', cats: ['ความสามารถทั่วไป', 'คณิตศาสตร์', 'ภาษาไทย', 'ความรู้ทั่วไป'] },
      { name: 'ภาค 2 ความรู้เฉพาะตำแหน่ง', cats: ['คอมพิวเตอร์', 'งานสารบรรณ', 'กฎหมาย', 'ภาษาอังกฤษ', 'ระเบียบตำรวจ'] }
    ]
  },
  suppress: {
    name: 'ปราบปราม', year: 'นสต.18', rule: 'total', passPct: 60, minutes: 180,
    focusCats: ['กฎหมาย', 'ความสามารถทั่วไป'],
    quota: { 'ความสามารถทั่วไป': 30, 'ภาษาไทย': 25, 'คอมพิวเตอร์': 25, 'ภาษาอังกฤษ': 30, 'สังคม': 20, 'กฎหมาย': 20 },
    parts: []
  }
};
const clone = o => JSON.parse(JSON.stringify(o));
function curTrackKey(){
  const t = S.tracks || {};
  return t[S.settings.track] ? S.settings.track : (Object.keys(t)[0] || 'admin');
}
function getTrack(key){
  const all = S.tracks || DEFAULT_TRACKS;
  const k = all[key] ? key : curTrackKey();
  const t = all[k] || DEFAULT_TRACKS.admin;
  const total = Object.values(t.quota || {}).reduce((a, b) => a + (+b || 0), 0);
  return { key: k, ...t, label: t.name + (t.year ? ' ' + t.year : ''), quotaTotal: total,
    ruleDesc: t.rule === 'parts' ? `ต้องผ่านทุกภาค ภาคละ ≥ ${t.passPct}%` : `คะแนนรวม ≥ ${t.passPct}%` };
}
// ประเมินผลตามเกณฑ์ของสาย (ใช้ทั้งหน้าผลสอบและประวัติ)
function evaluateTrack(result, trackKey){
  const tr = getTrack(trackKey), byCat = result.byCat || {}, P = tr.passPct;
  const overall = result.total ? Math.round(result.correct / result.total * 100) : 0;
  const quotaCats = Object.entries(tr.quota || {}).filter(([, n]) => n > 0);
  const isFull = quotaCats.length > 0 && quotaCats.every(([c, n]) => (byCat[c]?.t || 0) >= n);
  const note = isFull ? '' : `ชุดนี้ไม่ครบโควตาสนามจริง (${result.total}/${tr.quotaTotal} ข้อ) ผลเป็นการประเมินคร่าวๆ`;
  if(tr.rule !== 'parts' || !(tr.parts || []).length){
    const pass = overall >= P;
    return { pass, trackName: tr.label, rule: 'total', passPct: P, overall, isFull, note, parts: [],
      reason: pass ? `ผ่านเกณฑ์คะแนนรวม (${overall}% ≥ ${P}%)` : `คะแนนรวมไม่ถึงเกณฑ์ (${overall}% ต้อง ≥ ${P}%)` };
  }
  const parts = tr.parts.map(pt => {
    let T = 0, C = 0;
    pt.cats.forEach(c => { if(byCat[c]){ T += byCat[c].t; C += byCat[c].c; } });
    const pct = T ? Math.round(C / T * 100) : 0;
    return { name: pt.name, cats: pt.cats, T, C, pct, pass: T > 0 && pct >= P };
  });
  const missing = parts.filter(x => !x.T);
  if(missing.length){
    const pass = overall >= P;
    return { pass, trackName: tr.label, rule: 'parts', passPct: P, overall, isFull, parts,
      reason: pass ? `ผ่านเฉพาะส่วนที่ทำ (${overall}%)` : `ต่ำกว่าเกณฑ์ (${overall}%)`,
      note: `ยังไม่ได้ทำ ${missing.map(x => x.name).join(', ')} · สายนี้ต้องผ่านทุกภาค` };
  }
  const fail = parts.filter(x => !x.pass), pass = !fail.length;
  return { pass, trackName: tr.label, rule: 'parts', passPct: P, overall, isFull, note, parts,
    reason: pass ? `ผ่านทุกภาค (${parts.map(x => x.pct + '%').join(' · ')})` : `ไม่ผ่าน ${fail.map(x => `${x.name.split(' ').slice(0,2).join(' ')} (${x.pct}%)`).join(', ')}` };
}

const $  = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>Array.from(r.querySelectorAll(s));
const uid = ()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7);
const esc = s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const shuffle=a=>{const x=a.slice();for(let i=x.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[x[i],x[j]]=[x[j],x[i]];}return x;};
const dkey=(d=new Date())=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const mmss=s=>{s=Math.max(0,Math.round(s));const h=Math.floor(s/3600);const m=Math.floor(s%3600/60);const c=s%60;
  return h?`${h}:${String(m).padStart(2,'0')}:${String(c).padStart(2,'0')}`:`${String(m).padStart(2,'0')}:${String(c).padStart(2,'0')}`;};
const hmin=m=>m>=60?`${Math.floor(m/60)} ชม. ${m%60} น.`:`${m} น.`;
// วาดไอคอนเฉพาะ <i data-lucide> ที่ยังไม่ถูกวาด (lucide.createIcons จะวาดไอคอนทั้งหน้าใหม่ทุกครั้ง ทำให้กระตุก)
const ICON_CASE=n=>n.replace(/(^|-)([a-z0-9])/g,(_,a,b)=>b.toUpperCase());
const icons=(root=document)=>{
  const L=window.lucide; if(!L) return;
  root.querySelectorAll('i[data-lucide]').forEach(el=>{try{
    const n=el.getAttribute('data-lucide'), node=L.icons[ICON_CASE(n)]; if(!node) return;
    const at={'aria-hidden':'true'}; for(const x of el.attributes) at[x.name]=x.value;
    at.class=['lucide','lucide-'+n,at.class].filter(Boolean).join(' ');
    el.replaceWith(L.createElement(node,at));
  }catch(e){}});
};
const cicon=cat=>(S.catIcons&&S.catIcons[cat])||ICONS[cat]||'folder';
const tone=cat=>{
  if(S.catTones && S.catTones[cat]) return S.catTones[cat];
  return TONES[Math.max(0,S.cats.indexOf(cat))%TONES.length];
};

function formatThaiDate(dateStr){
  if(!dateStr) return 'ยังไม่ได้กำหนด';
  const parts = dateStr.split('-');
  if(parts.length !== 3) return dateStr;
  const y = parseInt(parts[0], 10) + 543;
  const m = THAI_MONTHS[parseInt(parts[1], 10) - 1];
  const d = parseInt(parts[2], 10);
  return `${d} ${m} ${y}`;
}

const DB_NAME = 'PolicePrepDB';
const DB_VERSION = 1;
let db = null;

function initDB(){
  return new Promise((res, rej)=>{
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = e => {
      const d = e.target.result;
      if(!d.objectStoreNames.contains('app_state')){
        d.createObjectStore('app_state', { keyPath: 'key' });
      }
    };
    req.onsuccess = e => { db = e.target.result; res(db); };
    req.onerror = e => rej(e);
  });
}

function dbGet(key){
  return new Promise(res => {
    if(!db) return res(null);
    const tx = db.transaction('app_state', 'readonly');
    const store = tx.objectStore('app_state');
    const req = store.get(key);
    req.onsuccess = () => res(req.result ? req.result.val : null);
    req.onerror = () => res(null);
  });
}

function dbSet(key, val){
  return new Promise(res => {
    if(!db) return res(false);
    const tx = db.transaction('app_state', 'readwrite');
    const store = tx.objectStore('app_state');
    store.put({ key, val });
    tx.oncomplete = () => res(true);
    tx.onerror = () => res(false);
  });
}

function fresh(){
  return {
    v:30,
    cats:['ความสามารถทั่วไป','ภาษาไทย','คอมพิวเตอร์','งานสารบรรณ','กฎหมาย','ภาษาอังกฤษ','ความรู้ทั่วไป'],
    catIcons:{},
    catTones:{},
    tracks:clone(DEFAULT_TRACKS),
    questions:[],
    cards:[],
    results:[],
    qstat:{},
    stats:{minutes:0,days:{}},
    settings:{
      dark:false,
      goal:30,
      name:'',
      avatar:'',
      shuffleQ:true,
      shuffleC:false,
      instant:true,
      sound:true,
      track:'admin',
      heroBg:'',
      heroPos:'center',
      examDate:'',
      autoNext: true,
      customFonts: [],
      activeFontId: '',
    },
    session:null, last:null
  };
}

let S = fresh();
let saveDebounce = null;

function save(){
  if(!S.session) localStorage.removeItem('pp_active_exam');
  clearTimeout(saveDebounce);
  saveDebounce = setTimeout(async () => {
    await dbSet('state', S);
  }, 250);
}


function day(k=dkey()){ 
  S.stats.days[k]=S.stats.days[k]||{answered:0,correct:0,minutes:0,todayCat:{}}; 
  S.stats.days[k].todayCat = S.stats.days[k].todayCat || {};
  return S.stats.days[k]; 
}

function evaluateAdaptiveDifficulty(questionId, isCorrect){
  const q = S.questions.find(x => x.id === questionId);
  if(!q) return;

  const st = S.qstat[questionId] = S.qstat[questionId] || { seen: 0, ok: 0, bad: 0, streakOk: 0, streakBad: 0 };

  if(isCorrect){
    st.streakOk = (st.streakOk || 0) + 1;
    st.streakBad = 0;
    if(st.streakOk >= 2){
      if(q.d === 'ยาก') q.d = 'ปานกลาง';
      else if(q.d === 'ปานกลาง') q.d = 'ง่าย';
      st.streakOk = 0;
    }
  } else {
    st.streakBad = (st.streakBad || 0) + 1;
    st.streakOk = 0;
    if(st.streakBad >= 2){
      if(q.d === 'ง่าย') q.d = 'ปานกลาง';
      else if(q.d === 'ปานกลาง') q.d = 'ยาก';
      st.streakBad = 0;
    }
  }
}
