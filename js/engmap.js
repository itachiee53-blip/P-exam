// ฉากใหญ่ต่อธีม: sky = หัวแผนที่ (400×110), a/b = แถบคั่นทุก 8 บท (400×150, เว้นกลางให้ถนน), ov = ของที่อยู่บนถนน (สะพาน 120×150), bits = ของเล็กโปรย (30×20)
const EM_CLOUD = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})" fill="#fff" opacity=".95"><ellipse cx="0" cy="0" rx="22" ry="9"/><circle cx="-8" cy="-5" r="9"/><circle cx="7" cy="-8" r="11"/></g>`;
const EM_BIRD = (x, y) => `<path d="M${x} ${y}q4-4 8 0q4-4 8 0" stroke="#64748b" stroke-width="1.6" fill="none" stroke-linecap="round"/>`;
const EM_BRIDGE = (deck, rail) => `<rect x="38" y="30" width="44" height="90" fill="${deck}"/><path d="M38 42h44M38 54h44M38 66h44M38 78h44M38 90h44M38 102h44" stroke="${rail}" stroke-width="1.5" opacity=".5"/><path d="M36 26v98M84 26v98" stroke="${rail}" stroke-width="4"/><path d="M33 30h6M33 60h6M33 90h6M33 120h6M81 30h6M81 60h6M81 90h6M81 120h6" stroke="${rail}" stroke-width="5" stroke-linecap="round"/>`;
const EM_RIVER = (c1, c2) => `<path d="M0 50q50-12 100 0t100 0 100 0 100 0v52q-50 12-100 0t-100 0-100 0-100 0z" fill="${c1}"/><path d="M20 70q10-5 20 0t20 0M260 66q10-5 20 0t20 0M110 86q10-5 20 0t20 0M320 88q10-5 20 0" stroke="${c2}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
const EM_SCENES = [
  { sky: `${EM_CLOUD(70, 50, 1.1)}${EM_CLOUD(250, 34, .8)}${EM_CLOUD(350, 70, .9)}<circle cx="330" cy="30" r="16" fill="#fde047"/><circle cx="330" cy="30" r="24" fill="#fde047" opacity=".25"/>${EM_BIRD(150, 40)}${EM_BIRD(170, 30)}<path d="M0 110q60-30 130-8t140 0 130-6v14H0z" fill="#c4e6b5"/>`,
    a: `${EM_RIVER('#8fd3f4', '#d6f1fc')}<ellipse cx="60" cy="88" rx="9" ry="4" fill="#4caf50"/><ellipse cx="330" cy="60" rx="10" ry="4" fill="#4caf50"/><circle cx="333" cy="58" r="3" fill="#ff7aa8"/><ellipse cx="290" cy="80" rx="8" ry="5" fill="#ffd23f"/><circle cx="297" cy="75" r="4" fill="#ffd23f"/><path d="M300 75l4 1-4 1z" fill="#ff8c2a"/>`,
    ov: EM_BRIDGE('#c8925f', '#8b5a3c'),
    b: `<ellipse cx="60" cy="150" rx="120" ry="70" fill="#b5dca4"/><ellipse cx="350" cy="150" rx="110" ry="60" fill="#a8d496"/><g transform="translate(70 40)"><path d="M-8 80l4-60h8l4 60z" fill="#f1f5f9"/><path d="M-8 20h16l-8-12z" fill="#e5484d"/><g stroke="#94a3b8" stroke-width="5" stroke-linecap="round"><path d="M0 14l-26-14M0 14l26 14M0 14l14-26M0 14l-14 26"/></g><circle cx="0" cy="14" r="4" fill="#64748b"/></g><path d="M280 96h100M280 110h100M290 90v26M310 90v26M330 90v26M350 90v26M370 90v26" stroke="#c8925f" stroke-width="3"/><g fill="#fff"><circle cx="300" cy="72" r="8"/><circle cx="310" cy="69" r="9"/><circle cx="320" cy="73" r="8"/></g><circle cx="326" cy="68" r="4.5" fill="#334155"/><path d="M302 80v6M318 80v6" stroke="#334155" stroke-width="2"/>`,
    bits: [`<path d="M8 20q-2-10 2-16M14 20q0-12 4-18M20 20q2-9 6-12" stroke="#5cb85c" stroke-width="2" fill="none" stroke-linecap="round"/>`, `<circle cx="15" cy="10" r="4" fill="#fff"/><circle cx="15" cy="10" r="1.8" fill="#fbbf24"/><path d="M15 14v6" stroke="#5cb85c" stroke-width="1.5"/>`, `<ellipse cx="15" cy="15" rx="7" ry="4" fill="#cbd5c0"/><ellipse cx="22" cy="17" rx="4" ry="2.5" fill="#b8c4ad"/>`] },
  { sky: `<circle cx="80" cy="40" r="18" fill="#fde047"/><circle cx="80" cy="40" r="27" fill="#fde047" opacity=".25"/>${EM_CLOUD(220, 40, 1)}${EM_CLOUD(340, 58, .8)}${EM_BIRD(150, 60)}${EM_BIRD(280, 30)}<path d="M0 82q50-8 100 0t100 0 100 0 100 0v28H0z" fill="#7fd3f2"/><path d="M0 92q50-8 100 0t100 0 100 0 100 0" stroke="#fff" stroke-width="3" fill="none" opacity=".8"/>`,
    a: `<rect y="40" width="400" height="70" fill="#7fd3f2"/><path d="M0 40q25-8 50 0t50 0 50 0 50 0 50 0 50 0 50 0 50 0M0 110q25 8 50 0t50 0 50 0 50 0 50 0 50 0 50 0 50 0" stroke="#fff" stroke-width="4" fill="none"/><path d="M40 70q8-5 16 0M300 82q8-5 16 0M90 92q8-5 16 0" stroke="#e0f7ff" stroke-width="3" fill="none"/><path d="M300 60h40l-6 10h-28z" fill="#f97316"/><path d="M320 60V36l14 20h-14z" fill="#fff"/>`,
    ov: EM_BRIDGE('#d9a66b', '#9a6b3f'),
    b: `<g transform="translate(60 18)"><path d="M-12 120l5-90h14l5 90z" fill="#fff"/><path d="M-10 90h20l1 12h-22zM-8 56h16l1 12h-18z" fill="#ef4444"/><rect x="-11" y="18" width="22" height="14" rx="3" fill="#fde047"/><path d="M-14 18h28l-14-12z" fill="#ef4444"/></g><ellipse cx="40" cy="146" rx="70" ry="20" fill="#94a3b8"/><ellipse cx="90" cy="140" rx="30" ry="14" fill="#a8b3c4"/><path d="M330 150Q326 110 338 78" stroke="#b07a4f" stroke-width="7" fill="none"/><path d="M338 78q-18-12-36 2q20-6 36 3zM338 78q20-14 38 2q-18-6-38 3zM338 78q-6-20-22-22q14 8 21 23z" fill="#34b26b"/>`,
    bits: [`<path d="M6 18q9-14 18 0z" fill="#fda4af"/><path d="M10 18l5-10 5 10" stroke="#fff" stroke-width="1"/>`, `<ellipse cx="15" cy="14" rx="6" ry="3.5" fill="#e7d3b0"/>`, `<path d="M15 4l2.5 5.5 6 .5-4.5 4 1.5 6-5.5-3-5.5 3 1.5-6-4.5-4 6-.5z" fill="#fb923c"/>`] },
  { sky: `<circle cx="320" cy="40" r="18" fill="#fdba74"/><circle cx="320" cy="40" r="28" fill="#fdba74" opacity=".25"/>${EM_CLOUD(90, 40, 1)}${EM_CLOUD(200, 64, .7)}<ellipse cx="160" cy="30" rx="5" ry="2.5" fill="#f97316" transform="rotate(30 160 30)"/><ellipse cx="240" cy="44" rx="5" ry="2.5" fill="#dc2626" transform="rotate(-20 240 44)"/><path d="M0 108q70-34 150-10t150-4 100-4v20H0z" fill="#f2cf85"/>`,
    a: `${EM_RIVER('#8ccbe8', '#d4eef9')}<ellipse cx="80" cy="72" rx="6" ry="3" fill="#f97316" transform="rotate(20 80 72)"/><ellipse cx="300" cy="84" rx="6" ry="3" fill="#dc2626" transform="rotate(-30 300 84)"/><ellipse cx="350" cy="66" rx="6" ry="3" fill="#fbbf24"/>`,
    ov: EM_BRIDGE('#b7794a', '#7c4a2a'),
    b: `<ellipse cx="70" cy="150" rx="130" ry="64" fill="#efc46e"/><ellipse cx="340" cy="150" rx="120" ry="56" fill="#e8b85a"/><g transform="translate(36 40)"><rect x="-3" y="30" width="6" height="30" fill="#8b5a3c"/><circle cx="0" cy="20" r="18" fill="#f97316"/></g><g transform="translate(96 54)"><rect x="-3" y="22" width="6" height="26" fill="#8b5a3c"/><circle cx="0" cy="14" r="15" fill="#fbbf24"/></g><g transform="translate(300 70)"><rect x="-22" y="0" width="44" height="30" rx="8" fill="#f3d27a"/><path d="M-22 10h44M-22 20h44" stroke="#d9b45a" stroke-width="2"/></g><g transform="translate(360 52)"><rect x="-3" y="24" width="6" height="28" fill="#8b5a3c"/><circle cx="0" cy="14" r="16" fill="#dc2626" opacity=".85"/></g>`,
    bits: [`<ellipse cx="15" cy="12" rx="8" ry="3.5" fill="#f97316" transform="rotate(-20 15 12)"/>`, `<ellipse cx="15" cy="13" rx="4" ry="5" fill="#a0673d"/><path d="M10 9h10" stroke="#6b4423" stroke-width="3" stroke-linecap="round"/>`, `<ellipse cx="15" cy="12" rx="8" ry="3.5" fill="#dc2626" transform="rotate(25 15 12)"/>`] },
  { sky: `${EM_CLOUD(60, 40, .9)}${EM_CLOUD(300, 30, 1.1)}<path d="M170 40l26-4 4 2-26 6zM186 36l-4-8h3l7 7z" fill="#94a3b8"/><circle cx="360" cy="70" r="14" fill="#fde047" opacity=".9"/><g fill="#c7d7ee"><rect x="0" y="66" width="30" height="44"/><rect x="34" y="52" width="24" height="58"/><rect x="62" y="74" width="28" height="36"/><rect x="250" y="60" width="26" height="50"/><rect x="280" y="76" width="34" height="34"/><rect x="318" y="58" width="22" height="52"/><rect x="344" y="80" width="56" height="30"/><rect x="100" y="84" width="40" height="26"/><rect x="200" y="78" width="40" height="32"/></g>`,
    a: `<rect y="56" width="400" height="44" fill="#cbd5e1"/><path d="M0 68h400M0 88h400" stroke="#64748b" stroke-width="3"/><path d="M10 64v28M30 64v28M50 64v28M70 64v28M90 64v28M110 64v28M130 64v28M270 64v28M290 64v28M310 64v28M330 64v28M350 64v28M370 64v28M390 64v28" stroke="#a16207" stroke-width="4" opacity=".6"/><path d="M140 40v20" stroke="#64748b" stroke-width="3"/><path d="M140 44l-36 0" stroke="#ef4444" stroke-width="5"/><path d="M128 44h-8M112 44h-8" stroke="#fff" stroke-width="5"/><circle cx="140" cy="36" r="5" fill="#ef4444"/>`,
    ov: `<path d="M36 68h48M36 88h48" stroke="#64748b" stroke-width="3"/>`,
    b: `<g fill="#93c5fd"><rect x="4" y="40" width="40" height="110" rx="3"/><rect x="300" y="30" width="38" height="120" rx="3"/></g><g fill="#5eead4"><rect x="48" y="66" width="36" height="84" rx="3"/><rect x="342" y="58" width="52" height="92" rx="3"/></g><rect x="88" y="90" width="44" height="60" rx="3" fill="#fdba74"/><rect x="262" y="80" width="34" height="70" rx="3" fill="#fca5a5"/><path d="M12 52h8m8 0h8M12 66h8m8 0h8M12 80h8m8 0h8M12 94h8m8 0h8M308 42h8m8 0h8M308 56h8m8 0h8M308 70h8m8 0h8M308 84h8m8 0h8M56 78h8m8 0h8M56 92h8m8 0h8M350 70h8m10 0h8M350 84h8m10 0h8M96 102h8m10 0h8M270 92h6m6 0h6" stroke="#fff" stroke-width="6" opacity=".8"/>`,
    bits: [`<circle cx="15" cy="12" r="7" fill="#22c55e"/><circle cx="11" cy="14" r="4" fill="#16a34a"/>`, `<rect x="11" y="6" width="8" height="12" rx="3" fill="#ef4444"/><rect x="9" y="9" width="12" height="3" rx="1.5" fill="#dc2626"/>`, `<ellipse cx="15" cy="14" rx="8" ry="3.5" fill="#94a3b8"/><ellipse cx="15" cy="13" rx="6" ry="2" fill="#64748b"/>`] },
  { sky: `${EM_CLOUD(100, 36, 1)}${EM_CLOUD(320, 50, .9)}<circle cx="230" cy="34" r="13" fill="#fef9c3"/><g fill="#fff"><circle cx="40" cy="80" r="2.5"/><circle cx="170" cy="60" r="2"/><circle cx="270" cy="84" r="2.5"/><circle cx="380" cy="30" r="2"/><circle cx="140" cy="20" r="2"/></g><path d="M0 110l60-46 40 26 50-40 60 50 50-34 60 30 40-20 40 34z" fill="#c4dbf3"/><path d="M150 50l-12 10 8 2 6-5 6 4 5-4zM260 76l-10 8 6 1 5-4 5 3z" fill="#fff"/>`,
    a: `<path d="M0 50q50-14 100 0t100 0 100 0 100 0v54q-50 12-100 0t-100 0-100 0-100 0z" fill="#dbeefe"/><path d="M30 60l20 14 14-6M300 70l18 10 20-4M90 90l16-8" stroke="#fff" stroke-width="3" fill="none"/><g transform="translate(320 70)"><circle r="7" fill="#fff" stroke="#cbd5e1"/><circle cy="-10" r="5" fill="#fff" stroke="#cbd5e1"/></g>`,
    ov: EM_BRIDGE('#b7794a', '#7c4a2a'),
    b: `<path d="M-10 150L70 30l60 80 30-30 20 70zM240 150l50-90 30 40 40-70 50 120z" fill="#a5c8ea"/><path d="M70 30l-16 24 10 4 6-6 8 5 8-6zM360 40l-14 20 8 3 6-5 6 4 6-5z" fill="#fff"/><g transform="translate(140 96)"><path d="M0 0l-12 22h24z" fill="#2f9e72"/><path d="M0 12l-14 26h28z" fill="#279164"/></g><g transform="translate(270 100)"><path d="M0 0l-12 22h24z" fill="#2f9e72"/><path d="M0 12l-14 26h28z" fill="#279164"/></g>`,
    bits: [`<path d="M15 4v14M8 7l14 8M22 7L8 15" stroke="#bfdbfe" stroke-width="2" stroke-linecap="round"/>`, `<ellipse cx="15" cy="15" rx="8" ry="4" fill="#94a3b8"/><ellipse cx="15" cy="12" rx="7" ry="3" fill="#fff"/>`, `<path d="M15 4l-6 12h12z" fill="#2f9e72"/><path d="M15 4l-3 5h6z" fill="#fff"/>`] },
  { sky: `<circle cx="200" cy="96" r="30" fill="#fdba74" opacity=".9"/><circle cx="200" cy="96" r="44" fill="#fdba74" opacity=".25"/>${EM_CLOUD(70, 40, 1)}${EM_CLOUD(330, 34, .9)}<ellipse cx="130" cy="60" rx="4" ry="2.5" fill="#f9a8d4"/><ellipse cx="270" cy="50" rx="4" ry="2.5" fill="#f472b6"/><ellipse cx="300" cy="80" rx="4" ry="2.5" fill="#fbcfe8"/><path d="M0 110q80-26 160-6t160-4 80-4v14H0z" fill="#f7c9dc"/>`,
    a: `${EM_RIVER('#93d5f2', '#d6f1fc')}<path d="M60 74q10-6 18 0q-8 6-18 0zM78 74l5-3v6z" fill="#fb923c"/><path d="M310 84q10-6 18 0q-8 6-18 0zM328 84l5-3v6z" fill="#f8fafc" stroke="#fb923c"/><ellipse cx="350" cy="62" rx="10" ry="4" fill="#4ade80"/><circle cx="352" cy="60" r="3" fill="#f472b6"/>`,
    ov: `<path d="M30 120Q60 30 90 120" stroke="#ef4444" stroke-width="8" fill="none"/><path d="M36 26v98M84 26v98" stroke="#ef4444" stroke-width="4"/><path d="M33 34h6M33 60h6M33 90h6M33 116h6M81 34h6M81 60h6M81 90h6M81 116h6" stroke="#b91c1c" stroke-width="5" stroke-linecap="round"/>`,
    b: `<g transform="translate(60 30)"><rect x="-14" y="70" width="28" height="50" fill="#fecaca"/><path d="M-30 74h60l-10-14h-40zM-26 50h52l-10-14h-32zM-20 26h40l-10-14h-20z" fill="#b91c1c"/><rect x="-10" y="40" width="20" height="10" fill="#fecaca"/><rect x="-8" y="62" width="16" height="12" fill="#fecaca"/><path d="M0 12V0" stroke="#b91c1c" stroke-width="3"/></g><g transform="translate(340 40)"><path d="M-30 110V20M30 110V20" stroke="#ef4444" stroke-width="9"/><path d="M-46 14h92l-6 10h-80z" fill="#ef4444"/><rect x="-36" y="32" width="72" height="6" fill="#f87171"/></g><circle cx="130" cy="120" r="18" fill="#f9a8d4"/><circle cx="270" cy="124" r="16" fill="#fbcfe8"/>`,
    bits: [`<ellipse cx="15" cy="12" rx="5" ry="3" fill="#f9a8d4" transform="rotate(30 15 12)"/>`, `<circle cx="15" cy="10" r="4" fill="#f472b6"/><circle cx="15" cy="10" r="1.6" fill="#fde047"/><path d="M15 14v6" stroke="#22c55e" stroke-width="1.5"/>`, `<path d="M8 20q-2-10 2-16M14 20q0-12 4-18M20 20q2-9 6-12" stroke="#4ade80" stroke-width="2" fill="none" stroke-linecap="round"/>`] },
  { sky: `<circle cx="80" cy="40" r="16" fill="#fde047"/><circle cx="80" cy="40" r="25" fill="#fde047" opacity=".25"/>${EM_CLOUD(250, 40, 1)}${EM_CLOUD(360, 64, .7)}<path d="M120 20q140 30 280 0" stroke="#94a3b8" stroke-width="1.2" fill="none"/><path d="M150 26l6 10 6-8zM200 32l6 10 6-9zM250 34l6 10 6-10zM300 32l6 10 6-9zM350 26l6 10 6-8z" fill="#ef4444"/><path d="M175 30l6 10 6-9zM225 34l6 10 6-10zM275 34l6 10 6-10zM325 30l6 10 6-9z" fill="#2563eb"/><path d="M0 110q100-24 200-8t200-2v10H0z" fill="#cfe0f8"/>`,
    a: `<rect y="40" width="400" height="76" rx="8" fill="#a7d99b"/><path d="M0 52h400M0 104h400" stroke="#fff" stroke-width="3" opacity=".8"/><g stroke="#94a3b8" stroke-width="2"><path d="M30 104V60M70 104V60M110 104V60M290 104V60M330 104V60M370 104V60"/></g><g><rect x="31" y="60" width="16" height="10" fill="#ef4444"/><rect x="71" y="60" width="16" height="10" fill="#1e3a8a"/><rect x="111" y="60" width="16" height="10" fill="#ef4444"/><rect x="291" y="60" width="16" height="10" fill="#1e3a8a"/><rect x="331" y="60" width="16" height="10" fill="#ef4444"/><rect x="371" y="60" width="16" height="10" fill="#1e3a8a"/></g>`,
    ov: '',
    b: `<g transform="translate(70 26)"><path d="M-60 40L0 6l60 34z" fill="#3b82f6"/><rect x="-56" y="40" width="112" height="8" fill="#dbeafe"/><path d="M-44 48v64M-22 48v64M0 48v64M22 48v64M44 48v64" stroke="#fff" stroke-width="8"/><rect x="-62" y="112" width="124" height="12" fill="#cbd5e1"/><circle cx="0" cy="26" r="6" fill="#fbbf24"/></g><g transform="translate(330 26)"><path d="M-60 40L0 6l60 34z" fill="#3b82f6"/><rect x="-56" y="40" width="112" height="8" fill="#dbeafe"/><path d="M-44 48v64M-22 48v64M0 48v64M22 48v64M44 48v64" stroke="#fff" stroke-width="8"/><rect x="-62" y="112" width="124" height="12" fill="#cbd5e1"/><circle cx="0" cy="26" r="6" fill="#fbbf24"/></g>`,
    bits: [`<path d="M8 20q-2-10 2-16M14 20q0-12 4-18M20 20q2-9 6-12" stroke="#4caf50" stroke-width="2" fill="none" stroke-linecap="round"/>`, `<path d="M15 3l3 6 6 1-4.5 4 1 6-5.5-3-5.5 3 1-6L6 10l6-1z" fill="#fbbf24"/>`, `<ellipse cx="15" cy="15" rx="7" ry="4" fill="#cbd5e1"/>`] }
];
// ไอคอนบนปกหนังสือ: วนตามหมวด ไม่ให้ซ้ำกันทุกเล่ม
const EM_ICONS = { sprout: ['sprout', 'pencil', 'lightbulb', 'book-a', 'star', 'sparkles'], home: ['house', 'coffee', 'utensils', 'bus', 'heart', 'phone'],
  shield: ['shield', 'siren', 'badge-check', 'fingerprint', 'gavel', 'car', 'search'], 'message-circle': ['message-circle', 'smile', 'handshake', 'quote', 'megaphone'],
  'spell-check': ['spell-check', 'puzzle', 'layers', 'type', 'whole-word', 'brain'], 'messages-square': ['messages-square', 'users', 'phone', 'handshake', 'coffee'],
  'book-open-text': ['book-open-text', 'newspaper', 'scroll', 'glasses', 'library'] };

// ---------- แผนที่บทเรียนแบบมีฉาก: แท็บ Lv.0–6, ถนนคดเคี้ยว, บทเป็นหนังสือ, ของประดับตามธีม (SVG นิ่ง ไม่วนอนิเมชัน) ----------
const EM_H = 132, EM_BH = 150; // ความสูงแถวบท / แถบฉาก (ต้องตรงกับ .em-row / .em-band)
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
  const E = engState(), { units, F } = engLevel(L), col = ENG_LV_C[L], T = EM_THEMES[L] || EM_THEMES[0], S = EM_SCENES[L] || EM_SCENES[0], P = Object.keys(T.props);
  const cur = F.findIndex((x, k) => engOpen(F, k) && !E.done[x.key]), d = F.filter(x => E.done[x.key]).length, due = engDue().length, N = F.length;
  const tabs = Array.from({ length: ENG_LV_N }, (_, l) => { const open = engLvOpen(l), t = EM_THEMES[l] || T;
    return `<button class="em-tab ${l === L ? 'on' : ''} ${open ? '' : 'lock'}" data-emlv="${l}" style="--tb:${t.bg};--tt:${t.tx}"><b>${open ? '' : '<i data-lucide="lock"></i>'}Lv.${l}</b><small>${engLevel(l).F.length} บท</small></button>`; }).join('');
  const rnd = n => { const x = Math.sin(n * 12.9898 + L * 78.233) * 43758.5453; return x - Math.floor(x); }; // สุ่มแบบคงที่ (เปิดใหม่ได้ภาพเดิม)
  // ลำดับแถว: หนังสือทุกบท + แถบฉากคั่นทุก 8 บท (สลับแบบ a/b)
  const seq = []; let y = 0, nb = 0;
  for(let k = 0; k < N; k++){ seq.push({ k, y, h: EM_H, x: k % 2 ? 73 : 27 }); y += EM_H; if((k + 1) % 8 === 0 && k < N - 1){ seq.push({ band: nb++ % 2 ? 'b' : 'a', y, h: EM_BH, x: 50 }); y += EM_BH; } }
  const cy = s => s.y + s.h / 2;
  let road = `M${seq[0].x} ${cy(seq[0])}`;
  for(let k = 1; k < seq.length; k++){ const a = seq[k - 1], b = seq[k], m = (cy(b) - cy(a)) / 2; road += `C${a.x} ${cy(a) + m} ${b.x} ${cy(b) - m} ${b.x} ${cy(b)}`; }
  const last = seq[seq.length - 1]; road += `C${last.x} ${cy(last) + 50} 50 ${y} 50 ${y + 40}`;
  const svgRoad = `<svg class="em-road" viewBox="0 0 100 ${y + 40}" preserveAspectRatio="none" style="height:${y + 40}px">
    <path d="${road}" stroke="${T.edge}" stroke-width="46" fill="none" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
    <path d="${road}" stroke="${T.road}" stroke-width="38" fill="none" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
    <path d="${road}" stroke="${T.dash}" stroke-width="3" fill="none" stroke-dasharray="10 12" vector-effect="non-scaling-stroke"/></svg>`;
  const unitOf = []; units.forEach(x => x.u.ls.forEach((_, li) => unitOf.push({ C: COURSES[x.c], c: x.c, u: x.u, li })));
  let under = '', rows = '', prev = -1;
  seq.forEach(s => {
    if(s.band){
      under += `<svg class="em-bandbg" viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice" style="top:${s.y}px"><use href="#emb-${s.band}"/></svg>`;
      rows += `<div class="em-band">${s.band === 'a' && S.ov ? '<svg class="em-ov" viewBox="0 0 120 150"><use href="#emb-ov"/></svg>' : ''}</div>`;
      return;
    }
    const i = s.k, { C, c, u, li } = unitOf[i], y0 = F[i], st = E.done[y0.key] || 0, open = engOpen(F, i), now = i === cur, side = i % 2 ? 'r' : 'l';
    let pi = Math.floor(rnd(i) * P.length); if(pi === prev) pi = (pi + 1) % P.length; prev = pi;
    const deco = li === 0
      ? `<div class="em-sign" style="--c:${C.color}"><i data-lucide="${C.ic}"></i><span><small>${ENG_CAT[c]}</small><b>${esc(u.t)}</b></span></div>`
      : `<svg class="em-prop" viewBox="0 0 100 80" style="--j:${Math.floor(rnd(i + 7) * 12)}%;--s:${(0.8 + rnd(i + 3) * 0.4).toFixed(2)};--f:${rnd(i + 5) < .5 ? -1 : 1}"><use href="#emp-${P[pi]}"/></svg>`;
    // ของเล็กโปรย 2 ชิ้นต่อแถว ตำแหน่งสุ่มคงที่ (เลี่ยงกลางถนน)
    const bits = [0, 1].map(n => { const r = rnd(i * 3 + n), xx = side === 'l' ? (n ? 6 + r * 14 : 48 + r * 10) : (n ? 80 + r * 14 : 38 + r * 10);
      return `<svg class="em-bit" viewBox="0 0 30 20" style="left:${xx.toFixed(1)}%;top:${Math.floor(8 + rnd(i * 5 + n) * 96)}px"><use href="#emt-${Math.floor(rnd(i * 7 + n) * 3)}"/></svg>`; }).join('');
    const ics = EM_ICONS[C.ic] || [C.ic];
    rows += `<div class="em-row ${side}">${bits}${deco}
      <button class="em-book pt${i % 4} ${i % 5 === 2 ? 'rib' : ''} ${st ? 'done' : ''} ${now ? 'now' : ''} ${open ? '' : 'lock'}" data-les="${i}" style="--cc:${C.color};--rt:${[-2, 1.5, 0, -1, 2][i % 5]}deg">
        ${now ? '<span class="em-bub">เริ่ม</span>' : ''}<small>${ENG_CAT[c]}</small><i data-lucide="${ics[li % ics.length]}"></i><em>บท ${i + 1}</em>
        ${st ? '<span class="em-badge ok"><i data-lucide="check"></i></span>' : open ? '' : '<span class="em-badge"><i data-lucide="lock"></i></span>'}
        ${st ? `<span class="em-stars">${'★'.repeat(st)}<u>${'★'.repeat(3 - st)}</u></span>` : ''}</button></div>`;
  });
  const ready = d === N, pass = E.lvPass[L];
  const defs = P.map(k => `<symbol id="emp-${k}" viewBox="0 0 100 80">${T.props[k]}</symbol>`).join('') + S.bits.map((b, k) => `<symbol id="emt-${k}" viewBox="0 0 30 20">${b}</symbol>`).join('')
    + `<symbol id="emb-a" viewBox="0 0 400 150">${S.a}</symbol><symbol id="emb-b" viewBox="0 0 400 150">${S.b}</symbol><symbol id="emb-ov" viewBox="0 0 120 150">${S.ov}</symbol>`;
  $('#view').innerHTML = `<div class="eng-lvhead" style="--c:${col}">
    <button class="ib" id="engBack"><i data-lucide="arrow-left"></i></button>
    <div><small>Lv.${L} · ${T.n}</small><b>${ENG_LEVELS[L]}</b></div><span class="eng-uprog">${d}/${N}</span></div>
    ${vocCard(L, F, col, cur)}
    <div class="em-tabs">${tabs}</div>
    <div class="em-map" style="--bg:${T.bg};--bl:${T.bl};--tx:${T.tx}">
      <svg width="0" height="0" style="position:absolute"><defs>${defs}</defs></svg>
      <svg class="em-sky" viewBox="0 0 400 110" preserveAspectRatio="xMidYMax slice">${S.sky}</svg>
      <div class="em-track"><div class="em-under">${under}</div>${svgRoad}<div class="em-rows">${rows}</div></div>
      <div class="eng-exam em-exam ${ready || pass ? '' : 'lock'} ${pass ? 'pass' : ''}" style="--c:${col}">
        <i data-lucide="${pass ? 'award' : 'trophy'}"></i><b>${pass ? `ผ่าน Lv.${L} แล้ว` : `สอบวัดผล Lv.${L}`}</b>
        <small>${pass ? `ผ่านเมื่อ ${pass}` : ready ? '30 ข้อ จับเวลา · ต้องได้ 80%' : `เรียนให้ครบ ${N} บทก่อน`}</small>
        ${ready || pass ? `<button class="eng-cta" id="engExam">${pass ? 'สอบอีกครั้ง' : 'เริ่มสอบ'}</button>` : ''}</div></div>
    <button class="eng-jump" id="engJump" hidden><i data-lucide="locate-fixed"></i>บทปัจจุบัน</button>`;
  $('#engBack').onclick = () => { ENG_LV = null; renderCards(); };
  if($('#engVoc')) $('#engVoc').onclick = () => vocSheet(L, F, col, cur);
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

// คำศัพท์ในหน่วยที่กำลังเรียน (บทคำศัพท์ถัดไป ทั้ง 2 บทของหน่วย) · เจอ = เรียนบทนั้นจบแล้ว (E.known)
function vocUnit(F, cur){
  let k = F.findIndex((x, i) => i >= Math.max(cur, 0) && !COURSES[x.c].gram);
  if(k < 0) k = F.map(x => !COURSES[x.c].gram).lastIndexOf(true);
  if(k < 0) return null;
  const u = F[k], G = F.map((x, i) => ({ x, n: i + 1 })).filter(g => g.x.c === u.c && g.x.ui === u.ui).map(g => ({ n: g.n, ws: g.x.ws.filter(w => w.en) }));
  return { t: u.u.t, G, all: G.flatMap(g => g.ws) };
}
function vocCard(L, F, col, cur){
  const V = vocUnit(F, cur); if(!V) return '';
  const E = engState(), n = V.all.length, k = V.all.filter(w => E.known[w.en]).length, p = n ? k / n : 0;
  return `<button class="eng-voc" id="engVoc" style="--c:${col};--p:${(p * 100).toFixed(1)}">
    <span class="ev-ring"><svg viewBox="0 0 44 44"><circle cx="22" cy="22" r="18"/><circle cx="22" cy="22" r="18" pathLength="100"/></svg><i data-lucide="book-a"></i></span>
    <span class="ev-t"><b>${esc(V.t)}</b><small>เจอแล้ว <em>${k}</em> · เหลือ ${n - k} คำ</small></span>
    <span class="ev-n">${k}/${n}</span><i data-lucide="chevron-right"></i></button>`;
}
function vocSheet(L, F, col, cur){
  const E = engState(), V = vocUnit(F, cur), G = V.G, all = V.all, k = all.filter(w => E.known[w.en]).length, due = engDue().length;
  const body = `<div class="voc-s" style="--c:${col}">
    <div class="voc-sum"><div><b>${k}</b><small>เจอแล้ว</small></div><div><b>${all.length - k}</b><small>ยังไม่เจอ</small></div><div><b>${all.length}</b><small>ทั้งหมด</small></div></div>
    <div class="voc-bar"><i style="--p:${all.length ? k / all.length * 100 : 0}%"></i></div>
    <div class="voc-f"><button class="on" data-vf="">ทั้งหมด</button><button data-vf="y">เจอแล้ว</button><button data-vf="n">ยังไม่เจอ</button></div>
    <div class="voc-l">${G.map((g, gi) => `<section style="--d:${gi * 60}ms"><h4>บท ${g.n}<span>${g.ws.filter(w => E.known[w.en]).length}/${g.ws.length}</span></h4><div>${g.ws.map(w => {
      const y = !!E.known[w.en]; return `<button class="voc-w ${y ? 'y' : 'n'}" data-say="${esc(w.en)}"><b>${esc(w.en)}</b><small>${y ? esc(w.th) : '?'}</small></button>`; }).join('')}</div></section>`).join('')}</div></div>`;
  openModal(esc(V.t), body, due >= 4 ? `<button class="btn" id="vocRev"><i data-lucide="refresh-cw"></i>ทวนคำใกล้ลืม ${due} คำ</button>` : '');
  $$('[data-vf]').forEach(b => b.onclick = () => { $$('[data-vf]').forEach(x => x.classList.toggle('on', x === b)); const f = b.dataset.vf;
    $$('.voc-l section').forEach(s => { let c = 0; s.querySelectorAll('.voc-w').forEach(w => { const h = f && !w.classList.contains(f); w.hidden = h; c += !h; }); s.hidden = !c; }); });
  $$('.voc-w.y').forEach(b => b.onclick = () => speakWord(b.dataset.say));
  if($('#vocRev')) $('#vocRev').onclick = () => { closeModal(); engReview(); };
}
