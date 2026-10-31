// ---------- แผนที่บทเรียนแบบมีฉาก: แท็บ Lv.0–6, ถนนคดเคี้ยว, บทเป็นหนังสือ, ของประดับตามธีม (SVG นิ่ง ไม่วนอนิเมชัน) ----------
const EM_H = 132; // ความสูงต่อแถว (ต้องตรงกับ .em-row)
const EM_SH = '<ellipse cx="50" cy="77" rx="30" ry="3.5" fill="#0f172a" opacity=".07"/>';
const EM_THEMES = [
  { n: 'ทุ่งหญ้า', bg: '#d9f0cf', bl: '#c8e8bb', road: '#ade09f', edge: '#90cc82', dash: '#f4fbef', tx: '#2f7a3a', props: {
    tree: `${EM_SH}<rect x="46" y="48" width="8" height="29" rx="3" fill="#a0714f"/><circle cx="50" cy="34" r="21" fill="#5cb85c"/><circle cx="35" cy="46" r="14" fill="#4caf50"/><circle cx="65" cy="46" r="14" fill="#6cc36c"/><circle cx="43" cy="27" r="6" fill="#86d686" opacity=".8"/>`,
    pond: `<ellipse cx="50" cy="60" rx="47" ry="17" fill="#7cc8f0"/><ellipse cx="50" cy="58" rx="40" ry="12" fill="#a3dcf7"/><ellipse cx="57" cy="55" rx="13" ry="8" fill="#ffd23f"/><circle cx="67" cy="45" r="7" fill="#ffd23f"/><path d="M73 45l7 2-7 2z" fill="#ff8c2a"/><circle cx="68.5" cy="43.5" r="1.3" fill="#334155"/><ellipse cx="30" cy="59" rx="7" ry="4.5" fill="#ffe169"/><circle cx="36" cy="54" r="4" fill="#ffe169"/><path d="M39.5 54l4 1-4 1z" fill="#ff8c2a"/>`,
    flowers: `${EM_SH}<path d="M30 77V52M50 77V44M70 77V54" stroke="#4caf50" stroke-width="3" stroke-linecap="round"/><ellipse cx="40" cy="66" rx="8" ry="3.5" fill="#5cb85c" transform="rotate(-25 40 66)"/><ellipse cx="60" cy="66" rx="8" ry="3.5" fill="#5cb85c" transform="rotate(25 60 66)"/><circle cx="30" cy="50" r="8" fill="#ff7aa8"/><circle cx="30" cy="50" r="3" fill="#ffd23f"/><circle cx="50" cy="42" r="9" fill="#a78bfa"/><circle cx="50" cy="42" r="3.5" fill="#fff3b0"/><circle cx="70" cy="52" r="7.5" fill="#ff9f43"/><circle cx="70" cy="52" r="3" fill="#fff3b0"/>`,
    mushroom: `${EM_SH}<rect x="44" y="50" width="12" height="27" rx="5" fill="#fff3e0"/><path d="M24 55Q50 14 76 55Z" fill="#ef4444"/><circle cx="41" cy="42" r="4.5" fill="#fff"/><circle cx="56" cy="34" r="3.5" fill="#fff"/><circle cx="63" cy="47" r="3.5" fill="#fff"/>`,
    barn: `${EM_SH}<rect x="22" y="40" width="56" height="37" fill="#e5484d"/><path d="M17 43L50 15l33 28z" fill="#a43c5b"/><rect x="45" y="25" width="10" height="9" rx="1" fill="#fff"/><rect x="39" y="52" width="22" height="25" fill="#fff"/><path d="M39 52l22 25M61 52L39 77" stroke="#e5484d" stroke-width="3"/>`,
    bush: `${EM_SH}<circle cx="34" cy="62" r="14" fill="#4caf50"/><circle cx="52" cy="56" r="17" fill="#5cb85c"/><circle cx="68" cy="64" r="12" fill="#6cc36c"/><circle cx="48" cy="50" r="5" fill="#86d686" opacity=".8"/>` } },
  { n: 'ชายหาด', bg: '#fbeccb', bl: '#bfe6f5', road: '#f3d9a0', edge: '#e7c27a', dash: '#fffaf0', tx: '#a16207', props: {
    palm: `${EM_SH}<path d="M50 77Q45 52 55 28" stroke="#b07a4f" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M55 28Q36 16 18 30Q38 23 55 31zM55 28Q74 15 88 31Q70 23 55 31zM55 28Q48 8 32 6Q46 14 54 29zM55 28Q66 8 80 10Q66 15 56 29z" fill="#34b26b"/><circle cx="51" cy="32" r="3.5" fill="#8b5a2b"/><circle cx="58" cy="33" r="3.5" fill="#8b5a2b"/>`,
    umbrella: `${EM_SH}<rect x="30" y="68" width="40" height="9" rx="2" fill="#38bdf8"/><path d="M50 76V30" stroke="#94a3b8" stroke-width="3"/><path d="M18 36Q50 2 82 36z" fill="#f43f5e"/><path d="M39 36Q42 12 50 10Q58 12 61 36z" fill="#fff"/>`,
    waves: `<ellipse cx="50" cy="58" rx="48" ry="19" fill="#7fd3f2"/><path d="M14 54q6-6 12 0t12 0 12 0M48 62q6-6 12 0t12 0 12 0M28 68q6-5 12 0t12 0" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    star: `${EM_SH}<path d="M38 50l5 11 12 1-9 8 3 12-11-6-11 6 3-12-9-8 12-1z" fill="#fb923c" transform="translate(0 -8)"/><path d="M62 74q8-18 16 0z" fill="#fda4af"/><path d="M66 74l4-12M70 74v-13M74 74l-4-12" stroke="#fff" stroke-width="1.5"/>`,
    castle: `${EM_SH}<rect x="28" y="48" width="44" height="29" fill="#f1c27d"/><path d="M28 48v-7h7v4h6v-4h6v4h6v-4h6v4h6v-4h7v7z" fill="#e8b267"/><rect x="45" y="62" width="10" height="15" rx="5" fill="#d99a4e"/><path d="M50 41V24" stroke="#94a3b8" stroke-width="2"/><path d="M50 24l12 4-12 4z" fill="#f43f5e"/>`,
    boat: `<ellipse cx="50" cy="66" rx="44" ry="12" fill="#7fd3f2"/><path d="M24 60h52l-8 12H32z" fill="#f97316"/><path d="M50 60V22" stroke="#94a3b8" stroke-width="2.5"/><path d="M52 24l22 32H52z" fill="#fff"/><path d="M48 30L32 56h16z" fill="#fde68a"/>` } },
  { n: 'ใบไม้เปลี่ยนสี', bg: '#fbe7b5', bl: '#f7da98', road: '#f6c96b', edge: '#e8b14c', dash: '#fff6e0', tx: '#b45309', props: {
    tree: `${EM_SH}<rect x="46" y="48" width="8" height="29" rx="3" fill="#8b5a3c"/><circle cx="50" cy="34" r="21" fill="#f59e0b"/><circle cx="35" cy="47" r="13" fill="#f97316"/><circle cx="65" cy="45" r="14" fill="#fbbf24"/><circle cx="44" cy="26" r="6" fill="#fcd34d" opacity=".8"/>`,
    bench: `${EM_SH}<rect x="20" y="44" width="60" height="7" rx="2" fill="#b7794a"/><rect x="20" y="54" width="60" height="7" rx="2" fill="#a0673d"/><rect x="18" y="62" width="64" height="6" rx="2" fill="#c98a55"/><path d="M26 68v9M74 68v9" stroke="#64748b" stroke-width="4"/>`,
    lamp: `${EM_SH}<path d="M50 77V26" stroke="#64748b" stroke-width="4"/><rect x="42" y="74" width="16" height="4" rx="2" fill="#64748b"/><path d="M40 28h20l-4-12H44z" fill="#475569"/><circle cx="50" cy="31" r="6" fill="#fde047"/><circle cx="50" cy="31" r="12" fill="#fde047" opacity=".25"/>`,
    pumpkin: `${EM_SH}<ellipse cx="38" cy="64" rx="13" ry="12" fill="#f97316"/><ellipse cx="50" cy="63" rx="12" ry="14" fill="#fb923c"/><ellipse cx="62" cy="64" rx="13" ry="12" fill="#f97316"/><path d="M50 50q-1-8 5-10" stroke="#65a30d" stroke-width="3.5" fill="none" stroke-linecap="round"/><ellipse cx="78" cy="72" rx="6" ry="3" fill="#dc2626" transform="rotate(-20 78 72)"/>`,
    tent: `${EM_SH}<path d="M18 77Q22 34 50 32Q78 34 82 77z" fill="#fb923c"/><path d="M40 77q2-22 10-24q8 2 10 24z" fill="#7c2d12"/><path d="M26 77Q30 44 50 40" stroke="#fdba74" stroke-width="3" fill="none"/>`,
    leaves: `${EM_SH}<ellipse cx="30" cy="70" rx="9" ry="4" fill="#f97316" transform="rotate(-15 30 70)"/><ellipse cx="48" cy="72" rx="9" ry="4" fill="#dc2626" transform="rotate(10 48 72)"/><ellipse cx="66" cy="69" rx="9" ry="4" fill="#fbbf24" transform="rotate(-25 66 69)"/><ellipse cx="40" cy="64" rx="8" ry="3.5" fill="#f59e0b" transform="rotate(20 40 64)"/><ellipse cx="58" cy="62" rx="8" ry="3.5" fill="#ea580c" transform="rotate(-10 58 62)"/>` } },
  { n: 'เมือง', bg: '#e3eefb', bl: '#d3e3f7', road: '#bfcce0', edge: '#a6b6cc', dash: '#ffffff', tx: '#1d4ed8', props: {
    city: `${EM_SH}<rect x="14" y="34" width="22" height="43" rx="2" fill="#60a5fa"/><rect x="38" y="14" width="24" height="63" rx="2" fill="#2dd4bf"/><rect x="64" y="40" width="22" height="37" rx="2" fill="#fdba74"/><path d="M19 41h4m6 0h4M19 50h4m6 0h4M19 59h4m6 0h4M43 22h4m6 0h4M43 31h4m6 0h4M43 40h4m6 0h4M43 49h4m6 0h4M43 58h4m6 0h4M69 47h4m6 0h4M69 56h4m6 0h4" stroke="#fff" stroke-width="4" opacity=".85"/>`,
    light: `${EM_SH}<path d="M50 77V40" stroke="#64748b" stroke-width="4"/><rect x="40" y="12" width="20" height="40" rx="6" fill="#475569"/><circle cx="50" cy="21" r="5" fill="#f87171"/><circle cx="50" cy="32" r="5" fill="#fcd34d"/><circle cx="50" cy="43" r="5" fill="#4ade80"/>`,
    bus: `${EM_SH}<path d="M34 77V26" stroke="#64748b" stroke-width="3"/><circle cx="34" cy="24" r="10" fill="#3b82f6"/><rect x="29" y="20" width="10" height="7" rx="2" fill="#fff"/><rect x="46" y="44" width="40" height="28" rx="6" fill="#facc15"/><rect x="50" y="48" width="32" height="10" rx="2" fill="#e0f2fe"/><circle cx="56" cy="73" r="4.5" fill="#334155"/><circle cx="76" cy="73" r="4.5" fill="#334155"/>`,
    car: `${EM_SH}<path d="M18 66q0-10 10-10h8l8-10h18l10 10h8q10 0 10 10v6H18z" fill="#f43f5e"/><path d="M47 49h14l7 7H41z" fill="#e0f2fe"/><circle cx="33" cy="72" r="6" fill="#334155"/><circle cx="68" cy="72" r="6" fill="#334155"/><circle cx="33" cy="72" r="2.5" fill="#cbd5e1"/><circle cx="68" cy="72" r="2.5" fill="#cbd5e1"/>`,
    planter: `${EM_SH}<path d="M36 60h28l-4 17H40z" fill="#f97316"/><rect x="47" y="44" width="6" height="16" fill="#8b5a3c"/><circle cx="50" cy="36" r="15" fill="#22c55e"/><circle cx="42" cy="42" r="8" fill="#16a34a"/>`,
    cross: `<rect x="6" y="46" width="88" height="28" rx="6" fill="#cbd5e1"/><path d="M18 50v20M30 50v20M42 50v20M54 50v20M66 50v20M78 50v20" stroke="#fff" stroke-width="7"/>` } },
  { n: 'ภูเขาหิมะ', bg: '#eaf4fd', bl: '#d8eafa', road: '#cde2f6', edge: '#b3cfeb', dash: '#ffffff', tx: '#0369a1', props: {
    pine: `${EM_SH}<rect x="46" y="64" width="8" height="13" fill="#8b5a3c"/><path d="M50 10L26 44h48z" fill="#2f9e72"/><path d="M50 24L22 60h56z" fill="#279164"/><path d="M50 10l-8 11q8 4 16 0z" fill="#fff"/><path d="M36 44q14 5 28 0" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/>`,
    cabin: `${EM_SH}<rect x="26" y="46" width="48" height="31" fill="#b7794a"/><path d="M20 48L50 22l30 26z" fill="#fff"/><path d="M20 48L50 22l30 26" stroke="#cbd5e1" stroke-width="2" fill="none"/><rect x="62" y="22" width="7" height="14" fill="#94a3b8"/><rect x="44" y="58" width="12" height="19" fill="#7c4a2a"/><rect x="31" y="54" width="9" height="8" fill="#fde68a"/>`,
    snowman: `${EM_SH}<circle cx="50" cy="62" r="15" fill="#fff" stroke="#dbeafe" stroke-width="2"/><circle cx="50" cy="38" r="11" fill="#fff" stroke="#dbeafe" stroke-width="2"/><path d="M50 39l10 2-10 2z" fill="#f97316"/><circle cx="46" cy="35" r="1.6" fill="#334155"/><circle cx="54" cy="35" r="1.6" fill="#334155"/><path d="M40 48h20l-2 5H42z" fill="#ef4444"/><rect x="42" y="20" width="16" height="8" rx="2" fill="#3b82f6"/>`,
    mountain: `<path d="M2 77L36 22l20 30 10-14 32 39z" fill="#a5c8ea"/><path d="M36 22l-9 15 6 3 4-5 5 4 4-5z" fill="#fff"/><path d="M66 38l-6 9 4 2 3-3 3 2z" fill="#fff"/>`,
    drift: `<ellipse cx="34" cy="70" rx="26" ry="9" fill="#fff"/><ellipse cx="64" cy="72" rx="24" ry="7" fill="#f8fbff"/><circle cx="24" cy="40" r="2" fill="#fff"/><circle cx="56" cy="30" r="2.5" fill="#fff"/><circle cx="76" cy="46" r="2" fill="#fff"/>`,
    sled: `${EM_SH}<path d="M24 70h52q6 0 6-6" stroke="#64748b" stroke-width="3" fill="none" stroke-linecap="round"/><rect x="28" y="56" width="44" height="10" rx="3" fill="#ef4444"/><rect x="34" y="44" width="20" height="12" rx="3" fill="#38bdf8"/>` } },
  { n: 'สวนดอกไม้', bg: '#fde4ee', bl: '#f9d2e3', road: '#f6c2d8', edge: '#eba9c5', dash: '#fff4f8', tx: '#be185d', props: {
    sakura: `${EM_SH}<path d="M50 77V50l-10-10M50 56l10-12" stroke="#8b5a3c" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="50" cy="32" r="19" fill="#f9a8d4"/><circle cx="34" cy="40" r="13" fill="#f472b6"/><circle cx="66" cy="40" r="13" fill="#fbcfe8"/><circle cx="44" cy="24" r="6" fill="#fdf2f8" opacity=".8"/>`,
    bridge: `<ellipse cx="50" cy="68" rx="46" ry="10" fill="#93d5f2"/><path d="M10 66Q50 22 90 66" stroke="#ef4444" stroke-width="7" fill="none"/><path d="M14 54Q50 16 86 54" stroke="#ef4444" stroke-width="3" fill="none"/><path d="M26 47v12M38 37v14M50 34v14M62 37v14M74 47v12" stroke="#ef4444" stroke-width="3"/>`,
    lantern: `${EM_SH}<rect x="40" y="70" width="20" height="7" fill="#94a3b8"/><rect x="45" y="52" width="10" height="18" fill="#a8b3c4"/><rect x="38" y="38" width="24" height="15" rx="2" fill="#cbd5e1"/><rect x="45" y="42" width="10" height="8" fill="#fde68a"/><path d="M32 39L50 24l18 15z" fill="#94a3b8"/>`,
    lily: `<ellipse cx="50" cy="62" rx="46" ry="15" fill="#93d5f2"/><ellipse cx="34" cy="62" rx="10" ry="5" fill="#4ade80"/><ellipse cx="64" cy="58" rx="12" ry="6" fill="#22c55e"/><circle cx="64" cy="54" r="5" fill="#f472b6"/><circle cx="64" cy="54" r="2" fill="#fde047"/><ellipse cx="48" cy="69" rx="8" ry="4" fill="#4ade80"/>`,
    tulips: `${EM_SH}<path d="M30 77V54M44 77V48M58 77V52M72 77V56" stroke="#22c55e" stroke-width="3"/><path d="M24 54q6 6 12 0v-8l-3 3-3-4-3 4-3-3z" fill="#f43f5e"/><path d="M38 48q6 6 12 0v-8l-3 3-3-4-3 4-3-3z" fill="#c084fc"/><path d="M52 52q6 6 12 0v-8l-3 3-3-4-3 4-3-3z" fill="#fb7185"/><path d="M66 56q6 6 12 0v-8l-3 3-3-4-3 4-3-3z" fill="#facc15"/>`,
    gate: `${EM_SH}<path d="M24 77V30M76 77V30" stroke="#ef4444" stroke-width="7"/><rect x="14" y="24" width="72" height="7" rx="3" fill="#ef4444"/><rect x="20" y="36" width="60" height="5" fill="#f87171"/>` } },
  { n: 'โรงเรียนนายร้อย', bg: '#e4edfc', bl: '#fdf1c9', road: '#f1da8c', edge: '#dfc165', dash: '#fffbea', tx: '#1e40af', props: {
    flag: `${EM_SH}<path d="M34 77V12" stroke="#94a3b8" stroke-width="3"/><rect x="35" y="14" width="40" height="5" fill="#ef4444"/><rect x="35" y="19" width="40" height="5" fill="#fff"/><rect x="35" y="24" width="40" height="10" fill="#1e3a8a"/><rect x="35" y="34" width="40" height="5" fill="#fff"/><rect x="35" y="39" width="40" height="5" fill="#ef4444"/>`,
    hall: `${EM_SH}<path d="M14 36L50 14l36 22z" fill="#3b82f6"/><rect x="18" y="36" width="64" height="6" fill="#dbeafe"/><path d="M26 42v28M40 42v28M60 42v28M74 42v28" stroke="#fff" stroke-width="6"/><rect x="18" y="42" width="64" height="28" fill="#f8fafc" opacity=".5"/><rect x="14" y="70" width="72" height="7" fill="#cbd5e1"/><circle cx="50" cy="27" r="4" fill="#fbbf24"/>`,
    shield: `${EM_SH}<path d="M50 14l26 9v18q0 22-26 34Q24 63 24 41V23z" fill="#2563eb"/><path d="M50 21l19 7v14q0 16-19 26Q31 58 31 42V28z" fill="#3b82f6"/><path d="M50 32l4 9 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1z" fill="#fbbf24"/>`,
    cone: `${EM_SH}<rect x="30" y="70" width="40" height="7" rx="2" fill="#f97316"/><path d="M42 70l6-50h4l6 50z" fill="#fb923c"/><path d="M45 48h10l1 8H44zM47 32h6l1 6h-8z" fill="#fff"/>`,
    tree: `${EM_SH}<rect x="46" y="48" width="8" height="29" rx="3" fill="#a0714f"/><circle cx="50" cy="34" r="21" fill="#4caf50"/><circle cx="35" cy="46" r="13" fill="#43a047"/><circle cx="65" cy="46" r="13" fill="#66bb6a"/>`,
    car: `${EM_SH}<path d="M16 66q0-10 10-10h9l9-10h18l10 10h8q10 0 10 10v6H16z" fill="#fff" stroke="#cbd5e1" stroke-width="1.5"/><rect x="16" y="62" width="74" height="5" fill="#2563eb"/><path d="M47 49h14l7 7H40z" fill="#bfdbfe"/><rect x="48" y="40" width="6" height="6" rx="1" fill="#ef4444"/><rect x="54" y="40" width="6" height="6" rx="1" fill="#3b82f6"/><circle cx="32" cy="72" r="6" fill="#334155"/><circle cx="72" cy="72" r="6" fill="#334155"/>` } }
];

function renderEngPath(L){
  const E = engState(), { units, F } = engLevel(L), col = ENG_LV_C[L], T = EM_THEMES[L] || EM_THEMES[0], P = Object.keys(T.props);
  const cur = F.findIndex((x, k) => engOpen(F, k) && !E.done[x.key]), d = F.filter(x => E.done[x.key]).length, due = engDue().length, N = F.length;
  const tabs = Array.from({ length: ENG_LV_N }, (_, l) => { const open = engLvOpen(l), t = EM_THEMES[l] || T;
    return `<button class="em-tab ${l === L ? 'on' : ''} ${open ? '' : 'lock'}" data-emlv="${l}" style="--tb:${t.bg};--tt:${t.tx}"><b>${open ? '' : '<i data-lucide="lock"></i>'}Lv.${l}</b><small>${engLevel(l).F.length} บท</small></button>`; }).join('');
  // ถนน: เส้นโค้งผ่านกลางหนังสือทุกเล่ม (สลับซ้าย 27% / ขวา 73%)
  const X = k => k % 2 ? 73 : 27, Y = k => k * EM_H + EM_H / 2;
  let road = `M${X(0)} ${Y(0)}`;
  for(let k = 1; k < N; k++) road += `C${X(k - 1)} ${Y(k - 1) + EM_H / 2} ${X(k)} ${Y(k) - EM_H / 2} ${X(k)} ${Y(k)}`;
  road += `C${X(N - 1)} ${Y(N - 1) + EM_H / 2} 50 ${N * EM_H} 50 ${N * EM_H + 40}`;
  const svgRoad = `<svg class="em-road" viewBox="0 0 100 ${N * EM_H + 40}" preserveAspectRatio="none" style="height:${N * EM_H + 40}px">
    <path d="${road}" stroke="${T.edge}" stroke-width="46" fill="none" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
    <path d="${road}" stroke="${T.road}" stroke-width="38" fill="none" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
    <path d="${road}" stroke="${T.dash}" stroke-width="3" fill="none" stroke-dasharray="10 12" vector-effect="non-scaling-stroke"/></svg>`;
  let i = 0, rows = '';
  units.forEach(x => {
    const C = COURSES[x.c], u = x.u;
    u.ls.forEach((_, li) => {
      const y = F[i], st = E.done[y.key] || 0, open = engOpen(F, i), now = i === cur, side = i % 2 ? 'r' : 'l';
      const deco = li === 0
        ? `<div class="em-sign" style="--c:${C.color}"><i data-lucide="${C.ic}"></i><span><small>${ENG_CAT[x.c]}</small><b>${esc(u.t)}</b></span></div>`
        : `<svg class="em-prop" viewBox="0 0 100 80" style="--j:${(i * 37) % 9}%;--s:${[1, .86, 1.12][i % 3]}"><use href="#emp-${P[(i * 3 + 1) % P.length]}"/></svg>`;
      rows += `<div class="em-row ${side}">${deco}
        <button class="em-book ${st ? 'done' : ''} ${now ? 'now' : ''} ${open ? '' : 'lock'}" data-les="${i}" style="--cc:${C.color}">
          ${now ? '<span class="em-bub">เริ่ม</span>' : ''}<small>${ENG_CAT[x.c]}</small><i data-lucide="${C.ic}"></i><em>บท ${i + 1}</em>
          ${st ? '<span class="em-badge ok"><i data-lucide="check"></i></span>' : open ? '' : '<span class="em-badge"><i data-lucide="lock"></i></span>'}
          ${st ? `<span class="em-stars">${'★'.repeat(st)}<u>${'★'.repeat(3 - st)}</u></span>` : ''}</button></div>`;
      i++;
    });
  });
  const ready = d === N, pass = E.lvPass[L];
  $('#view').innerHTML = `<div class="eng-lvhead" style="--c:${col}">
    <button class="ib" id="engBack"><i data-lucide="arrow-left"></i></button>
    <div><small>Lv.${L} · ${T.n}</small><b>${ENG_LEVELS[L]}</b></div><span class="eng-uprog">${d}/${N}</span></div>
    ${due >= 4 ? `<button class="eng-review" id="engRev"><i data-lucide="refresh-cw"></i><span><b>บททวนอัตโนมัติ</b><small>${due} คำใกล้ลืม</small></span><i data-lucide="chevron-right"></i></button>` : ''}
    <div class="em-tabs">${tabs}</div>
    <div class="em-map" style="--bg:${T.bg};--bl:${T.bl};--tx:${T.tx}">
      <svg width="0" height="0" style="position:absolute"><defs>${P.map(k => `<symbol id="emp-${k}" viewBox="0 0 100 80">${T.props[k]}</symbol>`).join('')}</defs></svg>
      ${svgRoad}<div class="em-rows">${rows}</div>
      <div class="eng-exam em-exam ${ready || pass ? '' : 'lock'} ${pass ? 'pass' : ''}" style="--c:${col}">
        <i data-lucide="${pass ? 'award' : 'trophy'}"></i><b>${pass ? `ผ่าน Lv.${L} แล้ว` : `สอบวัดผล Lv.${L}`}</b>
        <small>${pass ? `ผ่านเมื่อ ${pass}` : ready ? '30 ข้อ จับเวลา · ต้องได้ 80%' : `เรียนให้ครบ ${N} บทก่อน`}</small>
        ${ready || pass ? `<button class="eng-cta" id="engExam">${pass ? 'สอบอีกครั้ง' : 'เริ่มสอบ'}</button>` : ''}</div></div>
    <button class="eng-jump" id="engJump" hidden><i data-lucide="locate-fixed"></i>บทปัจจุบัน</button>`;
  $('#engBack').onclick = () => { ENG_LV = null; renderCards(); };
  if($('#engRev')) $('#engRev').onclick = engReview;
  if($('#engExam')) $('#engExam').onclick = () => levelExam(L);
  $$('[data-emlv]').forEach(b => b.onclick = () => { const l = +b.dataset.emlv; if(l === L) return; if(!engLvOpen(l)) return toast(`ผ่าน Lv.${l - 1} ก่อน`, 'err'); ENG_LV = l; renderCards(); });
  $$('[data-les]').forEach(b => b.onclick = () => { const k = +b.dataset.les; engOpen(F, k) ? lessonStart(F[k].c, F[k].ci) : toast('ผ่านบทก่อนหน้าก่อน', 'err'); });
  icons();
  const on = $('.em-tab.on'); if(on) on.scrollIntoView({ inline: 'center', block: 'nearest' });
  const nn = $('.em-book.now'), j = $('#engJump');
  if(nn && j && 'IntersectionObserver' in window){
    new IntersectionObserver(([e]) => { if(j.isConnected) j.hidden = e.isIntersecting; }).observe(nn);
    j.onclick = () => nn.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }
}
