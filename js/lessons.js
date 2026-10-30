"use strict";
// =====================================================================
// คอร์สเรียนภาษาอังกฤษ (ไฟล์เนื้อหา: เพิ่มบทเรียนได้ที่นี่ที่เดียว)
// ---------------------------------------------------------------------
// U(คอร์ส, ระดับ, 'ชื่อหน่วย', `บทเรียน`)
//   ระดับ (= เลเวล Lv.): 0 เริ่มจากศูนย์ · 1 เริ่มต้น · 2 พื้นฐาน · 3 ปานกลาง · 4 ดี · 5 คล่อง · 6 เชี่ยวชาญ
//   บทเรียน: บรรทัดละคำ  "คำ/วลี | คำแปล | ประโยคตัวอย่าง | คำแปลประโยค"
//            คั่นแต่ละบทด้วยบรรทัด ---   (บทละ 5–6 คำกำลังดี)
// บทสนทนา: D(ระดับ, 'หัวข้อ', `A: ... / B: ___ | คำตอบ | ตัวหลอก1; ตัวหลอก2; ตัวหลอก3 | คำแปลบทสนทนา`)  (ตัวหลอกคั่นด้วย ;)
// อ่านจับใจความ: R(ระดับ, 'หัวข้อ', 'ชื่อเรื่อง', `บทความ`, `คำแปล`, `คำถาม | คำตอบ | ตัวหลอก1; ตัวหลอก2; ตัวหลอก3`)
// ไวยากรณ์: G(ระดับ, 'หัวข้อ', 'กฎสั้นๆ', `ประโยคมี ___ | คำตอบ | ตัวหลอก1, ตัวหลอก2, ตัวหลอก3 | เหตุผล | คำแปล`)
// แอปสร้างแบบฝึกให้เองทั้งหมด: เลือกคำแปล แปลไทย→อังกฤษ ฟัง เติมคำ เรียงประโยค จับคู่
// =====================================================================
const COURSES = {
  basic:  { name: 'เริ่มจากศูนย์', ic: 'sprout', color: '#22c55e', units: [] },
  police: { name: 'สอบตำรวจ', ic: 'shield', color: '#4f8df7', units: [] },
  daily:  { name: 'ชีวิตประจำวัน', ic: 'home', color: '#1fbf8f', units: [] },
  talk:   { name: 'สนทนาและการทำงาน', ic: 'messages-square', color: '#a07cf8', units: [] },
  grammar:{ name: 'ไวยากรณ์ออกสอบ', ic: 'spell-check', color: '#ff8a4c', units: [], gram: true },
  dialog: { name: 'บทสนทนาออกสอบ', ic: 'message-circle', color: '#38bdf8', units: [], gram: true, kind: 'dialog' },
  read:   { name: 'อ่านจับใจความ', ic: 'book-open-text', color: '#ec6ba8', units: [], gram: true, kind: 'read' }
};
const ENG_LEVELS = ['เริ่มจากศูนย์', 'เริ่มต้น', 'พื้นฐาน', 'ปานกลาง', 'ดี', 'คล่อง', 'เชี่ยวชาญ'];
function U(course, lv, t, text){
  const ls = text.trim().split(/\n\s*---\s*\n/).map(block => block.trim().split('\n').map(line => {
    const [en, th, ex, tr] = line.split('|').map(s => (s || '').trim());
    return { en, th, ex: ex || '', tr: tr || '' };
  }).filter(w => w.en && w.th));
  const C = COURSES[course]; C.units.push({ t, lv, ls }); (C.def = C.def || []).push(t); // def = ลำดับที่เขียน (ใช้ย้ายความคืบหน้าแบบเก่า)
}

// ===== สอบตำรวจ =====
U('police', 1, 'งานตำรวจพื้นฐาน', `
police | ตำรวจ | Call the police now. | โทรเรียกตำรวจเดี๋ยวนี้
officer | เจ้าหน้าที่ | The officer is very kind. | เจ้าหน้าที่คนนั้นใจดีมาก
station | สถานี | The police station is near here. | สถานีตำรวจอยู่ใกล้ๆ นี้
help | ช่วยเหลือ | Can you help me? | คุณช่วยฉันได้ไหม
safe | ปลอดภัย | You are safe now. | ตอนนี้คุณปลอดภัยแล้ว
danger | อันตราย | Danger! Stay back. | อันตราย! ถอยไป
---
crime | อาชญากรรม | Crime is a big problem. | อาชญากรรมเป็นปัญหาใหญ่
thief | ขโมย | The thief took my bag. | ขโมยเอากระเป๋าของฉันไป
steal | ขโมย (กริยา) | He stole a car. | เขาขโมยรถคันหนึ่ง
victim | ผู้เสียหาย | The victim is in hospital. | ผู้เสียหายอยู่ที่โรงพยาบาล
witness | พยาน | She was a witness. | เธอเป็นพยาน
report | แจ้งความ | I want to report a crime. | ฉันต้องการแจ้งความ
---
patrol | ลาดตระเวน | They patrol at night. | พวกเขาลาดตระเวนตอนกลางคืน
uniform | เครื่องแบบ | He wears a uniform. | เขาสวมเครื่องแบบ
duty | หน้าที่ | It is my duty. | มันเป็นหน้าที่ของฉัน
rule | กฎ | Follow the rules. | ปฏิบัติตามกฎ
public | สาธารณะ | This is a public road. | นี่คือถนนสาธารณะ
protect | ปกป้อง | Police protect people. | ตำรวจปกป้องประชาชน
`);
U('police', 2, 'คดีและการจับกุม', `
arrest | จับกุม | The police arrested him. | ตำรวจจับกุมเขาแล้ว
suspect | ผู้ต้องสงสัย | The suspect ran away. | ผู้ต้องสงสัยหนีไปแล้ว
evidence | หลักฐาน | We need more evidence. | เราต้องการหลักฐานเพิ่ม
investigate | สืบสวน | They investigate the case. | พวกเขาสืบสวนคดีนี้
case | คดี | The case is closed. | คดีนี้ปิดแล้ว
search | ค้นหา/ตรวจค้น | They searched the car. | พวกเขาตรวจค้นรถคันนั้น
---
robbery | การปล้น | A robbery happened last night. | เกิดการปล้นเมื่อคืนนี้
fraud | การฉ้อโกง | He was arrested for fraud. | เขาถูกจับในข้อหาฉ้อโกง
weapon | อาวุธ | He had a weapon. | เขามีอาวุธ
drug | ยาเสพติด | Drugs are illegal. | ยาเสพติดผิดกฎหมาย
escape | หลบหนี | The prisoner escaped. | นักโทษหลบหนีไปแล้ว
chase | ไล่ตาม | The police chased the car. | ตำรวจไล่ตามรถคันนั้น
---
warrant | หมายจับ/หมายค้น | The judge signed a warrant. | ผู้พิพากษาลงนามในหมายแล้ว
detain | ควบคุมตัว | He was detained for questioning. | เขาถูกควบคุมตัวไปสอบปากคำ
custody | การควบคุมตัว | He is in police custody. | เขาอยู่ในการควบคุมตัวของตำรวจ
confess | สารภาพ | He confessed to the crime. | ชายคนนั้นสารภาพว่าก่ออาชญากรรม
charge | ตั้งข้อหา | He was charged with theft. | เขาถูกตั้งข้อหาลักทรัพย์
release | ปล่อยตัว | They released him today. | พวกเขาปล่อยตัวเขาวันนี้
`);
U('police', 2, 'ศาลและกฎหมาย', `
law | กฎหมาย | Everyone must obey the law. | ทุกคนต้องปฏิบัติตามกฎหมาย
court | ศาล | The case went to court. | คดีนี้ขึ้นสู่ศาลแล้ว
judge | ผู้พิพากษา | The judge is fair. | ผู้พิพากษายุติธรรม
lawyer | ทนายความ | I need a lawyer. | ฉันต้องการทนายความ
guilty | มีความผิด | He was found guilty. | เขาถูกตัดสินว่ามีความผิด
innocent | บริสุทธิ์ | She is innocent. | เธอบริสุทธิ์
---
trial | การพิจารณาคดี | The trial starts today. | การพิจารณาคดีเริ่มวันนี้
prison | เรือนจำ | He went to prison. | เขาเข้าเรือนจำ
fine | ค่าปรับ | I paid a fine. | ฉันจ่ายค่าปรับแล้ว
illegal | ผิดกฎหมาย | Gambling is illegal. | การพนันผิดกฎหมาย
legal | ถูกกฎหมาย | Is this legal? | สิ่งนี้ถูกกฎหมายไหม
penalty | บทลงโทษ | The penalty is heavy. | บทลงโทษหนักมาก
---
rights | สิทธิ | You have the right to stay silent. | คุณมีสิทธิ์ที่จะไม่ให้การ
citizen | พลเมือง | He is a Thai citizen. | เขาเป็นพลเมืองไทย
constitution | รัฐธรรมนูญ | The constitution is the highest law. | รัฐธรรมนูญเป็นกฎหมายสูงสุด
testify | ให้การ | She testified in court. | เธอให้การในศาล
accuse | กล่าวหา | They accused him of lying. | พวกเขากล่าวหาว่าเขาโกหก
justice | ความยุติธรรม | We want justice. | เราต้องการความยุติธรรม
`);
U('police', 3, 'จราจรและเหตุฉุกเฉิน', `
traffic | การจราจร | Traffic is heavy today. | วันนี้รถติดมาก
accident | อุบัติเหตุ | There was an accident. | เกิดอุบัติเหตุขึ้น
license | ใบอนุญาต | Show me your license. | ขอดูใบอนุญาตของคุณ
helmet | หมวกกันน็อก | Wear a helmet. | สวมหมวกกันน็อก
speed | ความเร็ว | Slow down your speed. | ลดความเร็วลง
checkpoint | ด่านตรวจ | Stop at the checkpoint. | หยุดที่ด่านตรวจ
---
emergency | เหตุฉุกเฉิน | Call 191 in an emergency. | โทร 191 เมื่อมีเหตุฉุกเฉิน
injured | ได้รับบาดเจ็บ | Two people were injured. | มีคนได้รับบาดเจ็บสองคน
ambulance | รถพยาบาล | Call an ambulance. | เรียกรถพยาบาล
fire | ไฟไหม้ | There is a fire! | ไฟไหม้!
rescue | ช่วยชีวิต | They rescued the child. | พวกเขาช่วยเด็กไว้ได้
crowd | ฝูงชน | The crowd was angry. | ฝูงชนโกรธมาก
---
drunk | เมาสุรา | Don't drive when drunk. | อย่าขับรถตอนเมา
crash | ชน | The car crashed into a tree. | รถชนต้นไม้
block | ปิดกั้น | The road is blocked. | ถนนถูกปิดกั้น
direction | ทิศทาง | Which direction did he go? | เขาไปทางไหน
missing | สูญหาย | Her son is missing. | ลูกชายของเธอหายตัวไป
suspicious | น่าสงสัย | He looks suspicious. | เขาดูน่าสงสัย
`);
U('police', 3, 'กริยาที่ออกสอบบ่อย', `
prevent | ป้องกัน | Lock the door to prevent theft. | ล็อกประตูเพื่อป้องกันขโมย
avoid | หลีกเลี่ยง | Avoid dark streets. | หลีกเลี่ยงถนนที่มืด
deny | ปฏิเสธ (ว่าไม่ได้ทำ) | He denied the charge. | เขาปฏิเสธข้อกล่าวหา
refuse | ปฏิเสธ (ไม่ยอม) | He refused to answer. | เขาไม่ยอมตอบ
obey | เชื่อฟัง | Obey the traffic rules. | ปฏิบัติตามกฎจราจร
warn | เตือน | They warned us about the storm. | พวกเขาเตือนเราเรื่องพายุ
---
require | ต้องการ/กำหนด | The job requires English. | งานนี้ต้องใช้ภาษาอังกฤษ
provide | จัดหา | We provide free water. | เรามีน้ำดื่มฟรีให้
respond | ตอบสนอง | Police responded quickly. | ตำรวจตอบสนองอย่างรวดเร็ว
remain | ยังคง | Please remain calm. | กรุณาอยู่ในความสงบ
survive | รอดชีวิต | Everyone survived. | ทุกคนรอดชีวิต
suggest | แนะนำ | I suggest we leave now. | ฉันแนะนำให้เราไปกันเดี๋ยวนี้
---
achieve | บรรลุ | She achieved her goal. | เธอบรรลุเป้าหมายแล้ว
improve | ปรับปรุง | Practice to improve. | ฝึกฝนเพื่อพัฒนาตัวเอง
increase | เพิ่มขึ้น | Crime increased this year. | อาชญากรรมเพิ่มขึ้นในปีนี้
decrease | ลดลง | Accidents decreased. | อุบัติเหตุลดลง
include | รวมถึง | The price includes tax. | ราคานี้รวมภาษีแล้ว
explain | อธิบาย | Please explain the rule. | กรุณาอธิบายกฎ
`);
U('police', 4, 'คำศัพท์ระดับสูง', `
authority | อำนาจ/เจ้าหน้าที่ | Police have authority here. | ตำรวจมีอำนาจที่นี่
violate | ละเมิด | He violated the law. | เขาทำผิดกฎหมาย
enforce | บังคับใช้ | Police enforce the law. | ตำรวจบังคับใช้กฎหมาย
prohibit | ห้าม | Smoking is prohibited. | ห้ามสูบบุหรี่
permit | อนุญาต | Parking is not permitted. | ไม่อนุญาตให้จอดรถ
regulation | ระเบียบ | Follow the regulations. | ปฏิบัติตามระเบียบ
---
corruption | การทุจริต | Corruption is a serious problem. | การทุจริตเป็นปัญหาร้ายแรง
bribe | สินบน | He refused the bribe. | เขาปฏิเสธสินบน
integrity | ความซื่อตรง | An officer needs integrity. | เจ้าหน้าที่ต้องมีความซื่อตรง
reliable | น่าเชื่อถือ | She is a reliable witness. | เธอเป็นพยานที่น่าเชื่อถือ
accurate | แม่นยำ | The report is accurate. | รายงานนี้แม่นยำ
urgent | เร่งด่วน | This case is urgent. | คดีนี้เร่งด่วน
---
negotiate | เจรจา | They negotiated with the man. | พวกเขาเจรจากับชายคนนั้น
surrender | ยอมจำนน | He surrendered to police. | เขามอบตัวกับตำรวจ
hostage | ตัวประกัน | They freed the hostage. | พวกเขาช่วยตัวประกันออกมาได้
threat | ภัยคุกคาม | It is a threat to safety. | มันเป็นภัยต่อความปลอดภัย
security | ความปลอดภัย | Security is tight today. | วันนี้การรักษาความปลอดภัยเข้มงวด
cooperate | ให้ความร่วมมือ | Please cooperate with us. | กรุณาให้ความร่วมมือกับเรา
`);

// ===== ชีวิตประจำวัน =====
U('daily', 1, 'ทักทายและแนะนำตัว', `
hello | สวัสดี | Hello, how are you? | สวัสดี สบายดีไหม
thank you | ขอบคุณ | Thank you very much. | ขอบคุณมาก
sorry | ขอโทษ | Sorry, I am late. | ขอโทษ ฉันมาสาย
name | ชื่อ | My name is Nut. | ฉันชื่อนัท
friend | เพื่อน | He is my friend. | เขาเป็นเพื่อนของฉัน
family | ครอบครัว | I love my family. | ฉันรักครอบครัวของฉัน
---
morning | ตอนเช้า | Good morning! | อรุณสวัสดิ์
night | ตอนกลางคืน | Good night. | ราตรีสวัสดิ์
today | วันนี้ | Today is Friday. | วันนี้วันศุกร์
tomorrow | พรุ่งนี้ | See you tomorrow. | พรุ่งนี้เจอกัน
yesterday | เมื่อวาน | I was busy yesterday. | เมื่อวานฉันยุ่ง
week | สัปดาห์ | I work five days a week. | ฉันทำงานสัปดาห์ละห้าวัน
---
happy | มีความสุข | I am happy today. | วันนี้ฉันมีความสุข
tired | เหนื่อย | I am very tired. | ฉันเหนื่อยมาก
hungry | หิว | Are you hungry? | คุณหิวไหม
busy | ยุ่ง | Sorry, I am busy. | ขอโทษ ฉันยุ่งอยู่
fine | สบายดี | I am fine, thanks. | ฉันสบายดี ขอบคุณ
ready | พร้อม | Are you ready? | คุณพร้อมหรือยัง
`);
U('daily', 1, 'บ้านและของใช้', `
house | บ้าน | My house is small. | บ้านของฉันหลังเล็ก
room | ห้อง | This is my room. | นี่คือห้องของฉัน
door | ประตู | Close the door, please. | กรุณาปิดประตู
window | หน้าต่าง | Open the window. | เปิดหน้าต่าง
table | โต๊ะ | The book is on the table. | หนังสืออยู่บนโต๊ะ
bed | เตียง | I go to bed at ten. | ฉันเข้านอนตอนสี่ทุ่ม
---
phone | โทรศัพท์ | Where is my phone? | โทรศัพท์ของฉันอยู่ไหน
key | กุญแจ | I lost my key. | ฉันทำกุญแจหาย
bag | กระเป๋า | Her bag is red. | กระเป๋าของเธอสีแดง
money | เงิน | I have no money. | ฉันไม่มีเงิน
clothes | เสื้อผ้า | I wash my clothes. | ฉันซักเสื้อผ้า
shoes | รองเท้า | Take off your shoes. | ถอดรองเท้า
`);
U('daily', 2, 'กินดื่ม', `
breakfast | อาหารเช้า | I eat breakfast at seven. | ฉันกินอาหารเช้าตอนเจ็ดโมง
lunch | อาหารกลางวัน | Let's have lunch. | ไปกินข้าวกลางวันกัน
dinner | อาหารเย็น | Dinner is ready. | อาหารเย็นพร้อมแล้ว
water | น้ำ | Can I have some water? | ขอน้ำหน่อยได้ไหม
delicious | อร่อย | This is delicious! | อร่อยมาก!
spicy | เผ็ด | Thai food is spicy. | อาหารไทยเผ็ด
---
menu | เมนู | Can I see the menu? | ขอดูเมนูหน่อย
order | สั่ง (อาหาร) | I want to order now. | ฉันอยากสั่งอาหารตอนนี้
bill | บิล/ใบเสร็จ | Can I have the bill? | ขอบิลด้วย
cook | ทำอาหาร | My mother cooks well. | แม่ของฉันทำอาหารเก่ง
sweet | หวาน | The cake is too sweet. | เค้กหวานเกินไป
fresh | สด | The fish is fresh. | ปลาสด
`);
U('daily', 2, 'ซื้อของ', `
buy | ซื้อ | I want to buy a shirt. | ฉันอยากซื้อเสื้อเชิ้ต
sell | ขาย | They sell fruit. | พวกเขาขายผลไม้
price | ราคา | What is the price? | ราคาเท่าไหร่
cheap | ถูก | This is cheap. | อันนี้ถูก
expensive | แพง | That is too expensive. | อันนั้นแพงเกินไป
change | เงินทอน | Here is your change. | นี่เงินทอนของคุณ
---
discount | ส่วนลด | Is there a discount? | มีส่วนลดไหม
size | ขนาด | What size do you want? | คุณต้องการขนาดไหน
try on | ลองสวม | Can I try it on? | ขอลองสวมได้ไหม
pay | จ่าย | I will pay by card. | ฉันจะจ่ายด้วยบัตร
receipt | ใบเสร็จ | Keep your receipt. | เก็บใบเสร็จไว้
refund | คืนเงิน | Can I get a refund? | ขอคืนเงินได้ไหม
`);
U('daily', 3, 'เดินทาง', `
bus | รถเมล์ | I take the bus to work. | ฉันนั่งรถเมล์ไปทำงาน
train | รถไฟ | The train is late. | รถไฟมาสาย
airport | สนามบิน | Take me to the airport. | พาฉันไปสนามบิน
ticket | ตั๋ว | I need two tickets. | ฉันต้องการตั๋วสองใบ
left | ซ้าย | Turn left here. | เลี้ยวซ้ายตรงนี้
right | ขวา | Turn right at the light. | เลี้ยวขวาที่ไฟแดง
---
far | ไกล | Is it far from here? | ไกลจากที่นี่ไหม
near | ใกล้ | The hotel is near the beach. | โรงแรมอยู่ใกล้ชายหาด
arrive | มาถึง | The plane arrives at nine. | เครื่องบินมาถึงตอนเก้าโมง
leave | ออกเดินทาง | We leave at six. | เราออกเดินทางตอนหกโมง
map | แผนที่ | Can you show me on the map? | ช่วยชี้ในแผนที่ให้หน่อยได้ไหม
lost | หลงทาง | I think we are lost. | ฉันว่าเราหลงทางแล้ว
---
hotel | โรงแรม | We stay at a hotel. | เราพักที่โรงแรม
passport | หนังสือเดินทาง | Show your passport. | แสดงหนังสือเดินทางของคุณ
luggage | กระเป๋าเดินทาง | My luggage is heavy. | กระเป๋าเดินทางของฉันหนัก
delay | ล่าช้า | The flight is delayed. | เที่ยวบินล่าช้า
cancel | ยกเลิก | The trip was cancelled. | การเดินทางถูกยกเลิก
book | จอง | I booked a room. | ฉันจองห้องไว้แล้ว
`);
U('daily', 4, 'อารมณ์และสุขภาพ', `
angry | โกรธ | Don't be angry. | อย่าโกรธเลย
worried | กังวล | I am worried about the test. | ฉันกังวลเรื่องการสอบ
proud | ภูมิใจ | I am proud of you. | ฉันภูมิใจในตัวคุณ
nervous | ประหม่า | I feel nervous. | ฉันรู้สึกประหม่า
calm | สงบ | Stay calm. | ใจเย็นๆ
excited | ตื่นเต้น | We are excited! | พวกเราตื่นเต้นมาก!
---
headache | ปวดหัว | I have a headache. | ฉันปวดหัว
fever | ไข้ | She has a fever. | เธอมีไข้
medicine | ยา | Take this medicine. | กินยานี้
pain | ความเจ็บปวด | I have pain in my leg. | ฉันเจ็บที่ขา
healthy | สุขภาพดี | Eat well to stay healthy. | กินดีเพื่อให้สุขภาพดี
exercise | ออกกำลังกาย | I exercise every day. | ฉันออกกำลังกายทุกวัน
`);

// ===== สนทนาและการทำงาน =====
U('talk', 1, 'ประโยคสุภาพ', `
please | กรุณา | Please sit down. | เชิญนั่งครับ/ค่ะ
excuse me | ขอโทษนะครับ/ค่ะ | Excuse me, where is the toilet? | ขอโทษครับ ห้องน้ำอยู่ที่ไหน
of course | แน่นอน | Of course I can help. | แน่นอน ฉันช่วยได้
no problem | ไม่เป็นไร | No problem at all. | ไม่เป็นไรเลย
welcome | ยินดีต้อนรับ | Welcome to Thailand. | ยินดีต้อนรับสู่ประเทศไทย
again | อีกครั้ง | Please say that again. | กรุณาพูดอีกครั้ง
---
understand | เข้าใจ | I don't understand. | ฉันไม่เข้าใจ
speak | พูด | Can you speak slowly? | คุณพูดช้าๆ ได้ไหม
repeat | พูดซ้ำ | Could you repeat that? | คุณช่วยพูดซ้ำได้ไหม
mean | หมายถึง | What does it mean? | มันหมายความว่าอะไร
know | รู้ | I don't know. | ฉันไม่รู้
ask | ถาม | Can I ask a question? | ขอถามอะไรหน่อยได้ไหม
`);
U('talk', 2, 'ที่ทำงาน', `
work | งาน/ทำงาน | I work in an office. | ฉันทำงานในสำนักงาน
job | อาชีพ | I like my job. | ฉันชอบงานของฉัน
boss | หัวหน้า | My boss is kind. | หัวหน้าของฉันใจดี
meeting | การประชุม | The meeting starts at nine. | การประชุมเริ่มเก้าโมง
team | ทีม | We work as a team. | เราทำงานเป็นทีม
task | งานที่ได้รับมอบหมาย | Finish this task today. | ทำงานนี้ให้เสร็จวันนี้
---
deadline | กำหนดส่ง | The deadline is Friday. | กำหนดส่งคือวันศุกร์
schedule | ตารางงาน | Check your schedule. | ตรวจดูตารางงานของคุณ
salary | เงินเดือน | He gets a good salary. | เขาได้เงินเดือนดี
experience | ประสบการณ์ | I have two years of experience. | ฉันมีประสบการณ์สองปี
skill | ทักษะ | English is a useful skill. | ภาษาอังกฤษเป็นทักษะที่มีประโยชน์
responsible | รับผิดชอบ | I am responsible for this. | ฉันรับผิดชอบเรื่องนี้
`);
U('talk', 3, 'โทรศัพท์และอีเมล', `
call | โทร | I will call you later. | เดี๋ยวฉันโทรหาคุณ
message | ข้อความ | I sent you a message. | ฉันส่งข้อความหาคุณแล้ว
hold on | รอสักครู่ | Hold on, please. | กรุณารอสักครู่
available | ว่าง | Are you available now? | ตอนนี้คุณว่างไหม
contact | ติดต่อ | Please contact me. | กรุณาติดต่อฉัน
reply | ตอบกลับ | Please reply soon. | กรุณาตอบกลับโดยเร็ว
---
attach | แนบ | I attached the file. | ฉันแนบไฟล์ไว้แล้ว
confirm | ยืนยัน | Please confirm the time. | กรุณายืนยันเวลา
inform | แจ้งให้ทราบ | I will inform the team. | ฉันจะแจ้งให้ทีมทราบ
request | คำขอ | I have a request. | ฉันมีเรื่องจะขอ
appointment | นัดหมาย | I have an appointment at two. | ฉันมีนัดตอนบ่ายสอง
urgent | ด่วน | This is urgent. | เรื่องนี้ด่วน
`);
U('talk', 4, 'แสดงความคิดเห็น', `
agree | เห็นด้วย | I agree with you. | ฉันเห็นด้วยกับคุณ
disagree | ไม่เห็นด้วย | I disagree. | ฉันไม่เห็นด้วย
opinion | ความคิดเห็น | In my opinion, it is good. | ในความคิดของฉัน มันดี
reason | เหตุผล | What is the reason? | เหตุผลคืออะไร
suggest | เสนอแนะ | I suggest a new plan. | ฉันเสนอแผนใหม่
prefer | ชอบมากกว่า | I prefer tea to coffee. | ฉันชอบชามากกว่ากาแฟ
---
important | สำคัญ | This is very important. | เรื่องนี้สำคัญมาก
necessary | จำเป็น | Is it necessary? | จำเป็นไหม
possible | เป็นไปได้ | Is it possible? | เป็นไปได้ไหม
probably | น่าจะ | He will probably come. | เขาน่าจะมา
however | อย่างไรก็ตาม | However, I am not sure. | อย่างไรก็ตาม ฉันไม่แน่ใจ
because | เพราะว่า | I am late because of traffic. | ฉันมาสายเพราะรถติด
`);

// ===== เพิ่มเติม (ชุดที่ 2) =====
U('police', 1, 'รูปพรรณสัณฐาน', `
tall | สูง | The man is tall. | ผู้ชายคนนั้นตัวสูง
short | เตี้ย/สั้น | She has short hair. | เธอผมสั้น
thin | ผอม | He is very thin. | เขาผอมมาก
fat | อ้วน | The suspect is a bit fat. | ผู้ต้องสงสัยค่อนข้างอ้วน
hair | ผม | He has black hair. | เขามีผมสีดำ
glasses | แว่นตา | She wears glasses. | เธอสวมแว่นตา
---
scar | แผลเป็น | He has a scar on his face. | เขามีแผลเป็นบนใบหน้า
tattoo | รอยสัก | He has a tattoo on his arm. | เขามีรอยสักที่แขน
beard | เครา | The man has a beard. | ชายคนนั้นมีเครา
wear | สวม | He wears a red shirt. | เขาสวมเสื้อสีแดง
old | แก่/เก่า | He is about fifty years old. | เขาอายุประมาณห้าสิบปี
young | หนุ่ม/สาว | She is young. | เธอยังสาว
`);
U('police', 2, 'สถานที่ในเมือง', `
bank | ธนาคาร | The bank opens at nine. | ธนาคารเปิดเก้าโมง
market | ตลาด | I buy food at the market. | ฉันซื้ออาหารที่ตลาด
hospital | โรงพยาบาล | Take him to the hospital. | พาเขาไปโรงพยาบาล
school | โรงเรียน | The school is closed today. | วันนี้โรงเรียนปิด
temple | วัด | The temple is very old. | วัดนี้เก่ามาก
bridge | สะพาน | Cross the bridge. | ข้ามสะพานไป
---
corner | หัวมุม | The shop is on the corner. | ร้านอยู่ตรงหัวมุม
crossroad | สี่แยก | Turn left at the crossroad. | เลี้ยวซ้ายที่สี่แยก
parking lot | ลานจอดรถ | The car is in the parking lot. | รถอยู่ในลานจอดรถ
alley | ซอย/ตรอก | He ran into an alley. | เขาวิ่งเข้าไปในซอย
building | อาคาร | The building has ten floors. | อาคารนี้มีสิบชั้น
entrance | ทางเข้า | Wait at the entrance. | รอที่ทางเข้า
`);
U('police', 3, 'อาชญากรรมออนไลน์', `
online | ออนไลน์ | Don't share your password online. | อย่าบอกรหัสผ่านทางออนไลน์
scam | การหลอกลวง | It is a phone scam. | มันคือการหลอกลวงทางโทรศัพท์
hacker | แฮกเกอร์ | A hacker stole the data. | แฮกเกอร์ขโมยข้อมูลไป
password | รหัสผ่าน | Change your password often. | เปลี่ยนรหัสผ่านบ่อยๆ
account | บัญชี | Someone used my bank account. | มีคนใช้บัญชีธนาคารของฉัน
transfer | โอน (เงิน) | Don't transfer money to strangers. | อย่าโอนเงินให้คนแปลกหน้า
---
fake | ปลอม | This is a fake website. | นี่คือเว็บไซต์ปลอม
identity | ตัวตน | They stole his identity. | พวกเขาขโมยตัวตนของเขา
victim | เหยื่อ | Many victims lost money. | เหยื่อหลายคนสูญเงิน
gamble | เล่นการพนัน | Online gambling is illegal. | การพนันออนไลน์ผิดกฎหมาย
data | ข้อมูล | Protect your personal data. | ปกป้องข้อมูลส่วนตัวของคุณ
link | ลิงก์ | Don't click this link. | อย่ากดลิงก์นี้
`);
U('police', 4, 'การสอบสวน', `
interrogate | สอบปากคำ | They interrogated the suspect. | พวกเขาสอบปากคำผู้ต้องสงสัย
statement | คำให้การ | He gave a statement. | เขาให้การแล้ว
alibi | ข้อแก้ตัวว่าอยู่ที่อื่น | He has a strong alibi. | เขามีข้อแก้ตัวที่หนักแน่น
motive | แรงจูงใจ | What was the motive? | แรงจูงใจคืออะไร
deny | ปฏิเสธ | She denied everything. | เธอปฏิเสธทุกอย่าง
admit | ยอมรับ | He admitted his mistake. | เขายอมรับความผิดพลาด
---
fingerprint | ลายนิ้วมือ | They found his fingerprint. | พวกเขาพบลายนิ้วมือของเขา
footage | ภาพจากกล้อง | We checked the CCTV footage. | เราตรวจดูภาพจากกล้องวงจรปิดแล้ว
clue | เบาะแส | The police found a clue. | ตำรวจพบเบาะแส
crime scene | ที่เกิดเหตุ | Don't touch the crime scene. | อย่าแตะต้องที่เกิดเหตุ
prove | พิสูจน์ | Can you prove it? | คุณพิสูจน์ได้ไหม
solve | คลี่คลาย (คดี) | They solved the case. | พวกเขาคลี่คลายคดีได้แล้ว
`);
U('daily', 1, 'เวลาและกิจวัตร', `
wake up | ตื่นนอน | I wake up at six. | ฉันตื่นนอนตอนหกโมง
shower | อาบน้ำ | I take a shower every morning. | ฉันอาบน้ำทุกเช้า
brush | แปรง | Brush your teeth. | แปรงฟัน
go to work | ไปทำงาน | I go to work by bus. | ฉันไปทำงานด้วยรถเมล์
hour | ชั่วโมง | It takes one hour. | ใช้เวลาหนึ่งชั่วโมง
minute | นาที | Wait five minutes. | รอห้านาที
---
early | เช้า/ก่อนเวลา | I came early. | ฉันมาก่อนเวลา
late | สาย | Don't be late. | อย่ามาสาย
always | เสมอ | I always drink coffee. | ฉันดื่มกาแฟเสมอ
sometimes | บางครั้ง | I sometimes cook. | บางครั้งฉันก็ทำอาหาร
never | ไม่เคย | I never smoke. | ฉันไม่เคยสูบบุหรี่
usually | ปกติ | I usually sleep at ten. | ปกติฉันนอนสี่ทุ่ม
`);
U('daily', 2, 'สภาพอากาศ', `
weather | สภาพอากาศ | How is the weather? | อากาศเป็นอย่างไรบ้าง
rain | ฝน | It will rain today. | วันนี้ฝนจะตก
sunny | แดดออก | It is sunny today. | วันนี้แดดออก
cloudy | มีเมฆมาก | The sky is cloudy. | ท้องฟ้ามีเมฆมาก
hot | ร้อน | It is very hot. | ร้อนมาก
cold | หนาว/เย็น | It is cold at night. | กลางคืนอากาศหนาว
---
wind | ลม | The wind is strong. | ลมแรง
storm | พายุ | A storm is coming. | พายุกำลังมา
flood | น้ำท่วม | The road is flooded. | ถนนน้ำท่วม
umbrella | ร่ม | Take an umbrella. | เอาร่มไปด้วย
season | ฤดู | Rainy season is long. | หน้าฝนยาวนาน
wet | เปียก | My shoes are wet. | รองเท้าของฉันเปียก
`);
U('daily', 3, 'โทรทัศน์และข่าว', `
news | ข่าว | Did you watch the news? | คุณดูข่าวหรือยัง
watch | ดู | I watch TV at night. | ฉันดูทีวีตอนกลางคืน
show | รายการ | This show is funny. | รายการนี้ตลก
famous | มีชื่อเสียง | He is a famous singer. | เขาเป็นนักร้องที่มีชื่อเสียง
popular | เป็นที่นิยม | This song is popular. | เพลงนี้ได้รับความนิยม
story | เรื่องราว | Tell me a story. | เล่าเรื่องให้ฉันฟังหน่อย
---
event | เหตุการณ์ | It was a big event. | มันเป็นงานใหญ่
happen | เกิดขึ้น | What happened? | เกิดอะไรขึ้น
announce | ประกาศ | They announced the result. | พวกเขาประกาศผลแล้ว
public | ประชาชน | The public was angry. | ประชาชนโกรธมาก
interview | สัมภาษณ์ | He gave an interview. | เขาให้สัมภาษณ์
article | บทความ | I read an article about it. | ฉันอ่านบทความเกี่ยวกับเรื่องนี้
`);
U('daily', 4, 'สังคมและสิ่งแวดล้อม', `
environment | สิ่งแวดล้อม | Protect the environment. | ปกป้องสิ่งแวดล้อม
pollution | มลพิษ | Air pollution is bad. | มลพิษทางอากาศเป็นสิ่งไม่ดี
recycle | รีไซเคิล | We recycle bottles. | เรารีไซเคิลขวด
government | รัฐบาล | The government made a plan. | รัฐบาลวางแผนแล้ว
economy | เศรษฐกิจ | The economy is growing. | เศรษฐกิจกำลังเติบโต
community | ชุมชน | We help our community. | เราช่วยเหลือชุมชนของเรา
---
election | การเลือกตั้ง | The election is next month. | การเลือกตั้งจะมีขึ้นเดือนหน้า
vote | ลงคะแนน | Everyone should vote. | ทุกคนควรไปลงคะแนน
volunteer | อาสาสมัคร | She is a volunteer. | เธอเป็นอาสาสมัคร
poverty | ความยากจน | Poverty is a big problem. | ความยากจนเป็นปัญหาใหญ่
population | ประชากร | The population is growing. | ประชากรกำลังเพิ่มขึ้น
improve | พัฒนา | We want to improve the city. | เราอยากพัฒนาเมือง
`);
U('talk', 1, 'คำถามพื้นฐาน', `
what | อะไร | What is your name? | คุณชื่ออะไร
where | ที่ไหน | Where do you live? | คุณอาศัยอยู่ที่ไหน
when | เมื่อไหร่ | When is the test? | สอบเมื่อไหร่
who | ใคร | Who is that man? | ผู้ชายคนนั้นคือใคร
why | ทำไม | Why are you late? | ทำไมคุณมาสาย
how | อย่างไร | How do you go to work? | คุณไปทำงานอย่างไร
---
how much | ราคาเท่าไหร่ | How much is this? | อันนี้ราคาเท่าไหร่
how many | กี่ (จำนวน) | How many people are there? | มีคนกี่คน
which | อันไหน | Which one do you want? | คุณต้องการอันไหน
whose | ของใคร | Whose bag is this? | กระเป๋าใบนี้ของใคร
how long | นานแค่ไหน | How long does it take? | ใช้เวลานานแค่ไหน
what time | กี่โมง | What time is it? | ตอนนี้กี่โมง
`);
U('talk', 2, 'นัดหมายและเชิญชวน', `
invite | เชิญ | I invite you to my party. | ฉันเชิญคุณมางานปาร์ตี้ของฉัน
free | ว่าง | Are you free tonight? | คืนนี้คุณว่างไหม
join | ร่วม | Can I join you? | ขอฉันไปด้วยได้ไหม
meet | พบ | Let's meet at noon. | เจอกันตอนเที่ยงนะ
plan | แผน | What is your plan? | แผนของคุณคืออะไร
later | ทีหลัง | See you later. | แล้วเจอกัน
---
sure | ได้เลย | Sure, I can come. | ได้เลย ฉันไปได้
maybe | อาจจะ | Maybe next time. | ไว้คราวหน้านะ
postpone | เลื่อน | Let's postpone the meeting. | เลื่อนการประชุมกันเถอะ
remind | เตือนความจำ | Please remind me. | กรุณาเตือนฉันด้วย
promise | สัญญา | I promise to come. | ฉันสัญญาว่าจะมา
on time | ตรงเวลา | Please be on time. | กรุณามาตรงเวลา
`);
U('talk', 3, 'ปัญหาและการแก้ไข', `
problem | ปัญหา | What is the problem? | ปัญหาคืออะไร
solve | แก้ไข | We can solve it. | เราแก้ไขได้
mistake | ความผิดพลาด | It was my mistake. | มันเป็นความผิดของฉัน
fix | ซ่อม/แก้ | Can you fix it? | คุณซ่อมได้ไหม
apologize | ขอโทษ | I apologize for the delay. | ขออภัยที่ล่าช้า
complain | ร้องเรียน | He complained to the manager. | เขาร้องเรียนกับผู้จัดการ
---
broken | เสีย/พัง | My phone is broken. | โทรศัพท์ของฉันเสีย
wrong | ผิด | Something is wrong. | มีบางอย่างผิดปกติ
check | ตรวจสอบ | Please check again. | กรุณาตรวจสอบอีกครั้ง
support | สนับสนุน | Thank you for your support. | ขอบคุณสำหรับการสนับสนุน
solution | ทางแก้ | We found a solution. | เราหาทางแก้ได้แล้ว
patient | อดทน | Please be patient. | กรุณาอดทนรอ
`);
U('talk', 4, 'สัมภาษณ์งาน', `
apply | สมัคร | I want to apply for this job. | ฉันอยากสมัครงานนี้
interview | สัมภาษณ์ | The interview is tomorrow. | พรุ่งนี้มีสัมภาษณ์
strength | จุดแข็ง | My strength is teamwork. | จุดแข็งของฉันคือการทำงานเป็นทีม
weakness | จุดอ่อน | What is your weakness? | จุดอ่อนของคุณคืออะไร
goal | เป้าหมาย | My goal is to be a police officer. | เป้าหมายของฉันคือเป็นตำรวจ
qualified | มีคุณสมบัติ | He is qualified for the job. | เขามีคุณสมบัติเหมาะกับงานนี้
---
confident | มั่นใจ | Be confident. | มั่นใจในตัวเองไว้
hardworking | ขยัน | She is hardworking. | เธอขยัน
achievement | ความสำเร็จ | Tell me about your achievement. | เล่าความสำเร็จของคุณให้ฟังหน่อย
career | อาชีพการงาน | I want a career in the police. | ฉันอยากทำงานในวงการตำรวจ
challenge | ความท้าทาย | I like a challenge. | ฉันชอบความท้าทาย
opportunity | โอกาส | Thank you for this opportunity. | ขอบคุณสำหรับโอกาสนี้
`);

// ===== ไวยากรณ์ออกสอบ =====
function G(lv, t, rule, text){
  const ls = text.trim().split(/\n\s*---\s*\n/).map(block => block.trim().split('\n').map(line => {
    const [q, a, w, why, tr] = line.split('|').map(s => (s || '').trim());
    return { q, a, w: (w || '').split(',').map(x => x.trim()).filter(Boolean), why: why || '', tr: tr || '', en: a, th: why || '' };
  }).filter(g => g.q && g.a));
  const C = COURSES.grammar; C.units.push({ t, lv, rule, ls }); (C.def = C.def || []).push(t);
}
G(1, 'Verb to be', 'I → am · He/She/It/คนเดียว → is · You/We/They/หลายคน → are', `
I ___ a police officer. | am | is, are, be | I ใช้ am | ฉันเป็นตำรวจ
She ___ very kind. | is | am, are, be | She เอกพจน์ใช้ is | เธอใจดีมาก
They ___ at the station. | are | is, am, be | They พหูพจน์ใช้ are | พวกเขาอยู่ที่สถานี
The cars ___ red. | are | is, am, was | cars พหูพจน์ใช้ are | รถพวกนั้นสีแดง
My brother ___ a lawyer. | is | are, am, be | my brother คนเดียวใช้ is | พี่ชายของฉันเป็นทนาย
We ___ ready now. | are | is, am, be | We ใช้ are | ตอนนี้เราพร้อมแล้ว
`);
G(1, 'Present Simple', 'ทำเป็นประจำ/ความจริง · He/She/It + V-s/es · ปฏิเสธ does not + V1', `
He ___ to work every day. | goes | go, going, gone | He + V-es (go → goes) | เขาไปทำงานทุกวัน
They ___ English at school. | study | studies, studying, studied | They + V1 ไม่เติม s | พวกเขาเรียนภาษาอังกฤษที่โรงเรียน
She ___ coffee every morning. | drinks | drink, drinking, drank | She + V-s | เธอดื่มกาแฟทุกเช้า
The sun ___ in the east. | rises | rise, rising, rose | ความจริงทั่วไป ประธานเอกพจน์ + V-s | ดวงอาทิตย์ขึ้นทางทิศตะวันออก
He ___ not like spicy food. | does | do, is, did | He ปฏิเสธใช้ does not + V1 | เขาไม่ชอบอาหารเผ็ด
___ you speak English? | Do | Does, Are, Is | You ใช้ Do ในคำถาม | คุณพูดภาษาอังกฤษได้ไหม
`);
G(1, 'Articles a / an / the', 'a + เสียงพยัญชนะ · an + เสียงสระ (a e i o u) · the = สิ่งที่รู้กันว่าอันไหน/มีหนึ่งเดียว', `
He is ___ officer. | an | a, the, - | officer ขึ้นต้นเสียงสระ ใช้ an | เขาเป็นเจ้าหน้าที่
I saw ___ dog in the street. | a | an, the, - | dog เสียงพยัญชนะ ใช้ a | ฉันเห็นสุนัขตัวหนึ่งบนถนน
Wait ___ hour, please. | an | a, the, - | hour ออกเสียง "อาว" (h ไม่ออกเสียง) ใช้ an | กรุณารอหนึ่งชั่วโมง
___ sun is very hot today. | The | A, An, - | มีหนึ่งเดียวใช้ the | วันนี้แดดร้อนมาก
She is ___ university student. | a | an, the, - | university ออกเสียง "ยู" (พยัญชนะ) ใช้ a | เธอเป็นนักศึกษามหาวิทยาลัย
Close ___ door, please. | the | a, an, - | ประตูที่รู้กันว่าบานไหน ใช้ the | กรุณาปิดประตู
`);
G(1, 'Pronouns', 'I/me/my · he/him/his · she/her/her · we/us/our · they/them/their', `
This is ___ car. | my | me, I, mine | หน้าคำนามใช้ my | นี่คือรถของฉัน
Please help ___. | me | my, I, mine | หลังกริยาใช้ me | กรุณาช่วยฉันด้วย
I know ___. She is my friend. | her | she, hers, his | หลังกริยา she → her | ฉันรู้จักเธอ เธอเป็นเพื่อนฉัน
The bag is ___. | mine | my, me, I | ไม่มีคำนามตามหลัง ใช้ mine | กระเป๋าใบนี้เป็นของฉัน
___ are police officers. | They | Them, Their, Theirs | ประธานใช้ They | พวกเขาเป็นตำรวจ
The police found ___ fingerprints. | his | him, he, himself | หน้าคำนามใช้ his | ตำรวจพบลายนิ้วมือของเขา
`);
G(2, 'Present Continuous', 'กำลังทำอยู่ตอนนี้ · is/am/are + V-ing', `
She ___ reading a book now. | is | are, am, be | She + is + V-ing | ตอนนี้เธอกำลังอ่านหนังสือ
They are ___ football. | playing | play, played, plays | are + V-ing | พวกเขากำลังเล่นฟุตบอล
Look! The man ___ away. | is running | runs, ran, run | Look! = กำลังเกิดขึ้น | ดูสิ! ผู้ชายคนนั้นกำลังวิ่งหนี
I ___ for the bus at the moment. | am waiting | wait, waited, waits | at the moment = ตอนนี้ | ตอนนี้ฉันกำลังรอรถเมล์
What are you ___? | doing | do, does, did | are + V-ing | คุณกำลังทำอะไรอยู่
Listen! Someone ___ for help. | is calling | calls, called, call | Listen! = กำลังเกิดขึ้น | ฟังสิ! มีคนกำลังร้องขอความช่วยเหลือ
`);
G(2, 'Past Simple', 'เกิดและจบในอดีต (yesterday, last, ago) · V2 · ปฏิเสธ/คำถามใช้ did + V1', `
I ___ him yesterday. | saw | see, seen, seeing | yesterday ใช้ V2 (see → saw) | เมื่อวานฉันเห็นเขา
The police ___ the thief last night. | caught | catch, catched, catching | last night ใช้ V2 (catch → caught) | เมื่อคืนตำรวจจับขโมยได้
She ___ to Bangkok two years ago. | went | go, goes, gone | ago ใช้ V2 (go → went) | เธอไปกรุงเทพฯ เมื่อสองปีก่อน
He did not ___ the answer. | know | knew, knows, known | did not + V1 | เขาไม่รู้คำตอบ
___ you call the police? | Did | Do, Does, Were | ถามอดีตใช้ Did + V1 | คุณโทรหาตำรวจหรือเปล่า
They ___ at home last Sunday. | were | was, are, be | They + were | วันอาทิตย์ที่แล้วพวกเขาอยู่บ้าน
`);
G(2, 'Future: will / be going to', 'will + V1 = ตัดสินใจตอนพูด/คาดเดา · be going to + V1 = วางแผนไว้แล้ว', `
I ___ help you tomorrow. | will | am, did, was | will + V1 | พรุ่งนี้ฉันจะช่วยคุณ
She is going ___ a new car. | to buy | buy, buying, bought | be going to + V1 | เธอจะซื้อรถคันใหม่
It ___ rain tonight. | will | is, does, has | คาดเดาอนาคตใช้ will | คืนนี้ฝนจะตก
We are ___ to visit our parents. | going | go, went, gone | be going to | เราจะไปเยี่ยมพ่อแม่
He will ___ the exam next month. | take | takes, took, taking | will + V1 | เขาจะสอบเดือนหน้า
They ___ going to move next year. | are | is, will, do | They + are going to | ปีหน้าพวกเขาจะย้ายบ้าน
`);
G(2, 'Prepositions in / on / at', 'at = เวลา/จุด · on = วัน/วันที่/บนพื้นผิว · in = เดือน ปี ช่วงเวลา/ข้างใน', `
The meeting is ___ 9 o'clock. | at | in, on, by | เวลาที่แน่นอนใช้ at | ประชุมเก้าโมง
I was born ___ 1999. | in | on, at, by | ปีใช้ in | ฉันเกิดปี 1999
See you ___ Monday. | on | in, at, by | วันใช้ on | เจอกันวันจันทร์
The book is ___ the table. | on | in, at, under | บนพื้นผิวใช้ on | หนังสืออยู่บนโต๊ะ
He lives ___ Bangkok. | in | on, at, to | เมือง/ประเทศใช้ in | เขาอาศัยอยู่ในกรุงเทพฯ
The exam is ___ December. | in | on, at, by | เดือนใช้ in | สอบเดือนธันวาคม
`);
G(2, 'Countable / Uncountable', 'many + นามนับได้ · much + นามนับไม่ได้ · a few / a little · some (บอกเล่า) any (ปฏิเสธ/คำถาม)', `
How ___ people are there? | many | much, little, any | people นับได้ใช้ many | มีคนกี่คน
I don't have ___ money. | much | many, few, a few | money นับไม่ได้ใช้ much | ฉันมีเงินไม่มาก
There is ___ water in the bottle. | some | many, a few, any | บอกเล่า + นามนับไม่ได้ ใช้ some | มีน้ำอยู่ในขวดบ้าง
Do you have ___ questions? | any | some, much, a little | คำถามใช้ any | คุณมีคำถามไหม
I have ___ friends here. | a few | a little, much, any | friends นับได้ใช้ a few | ฉันมีเพื่อนอยู่ที่นี่ไม่กี่คน
Add ___ sugar, please. | a little | a few, many, few | sugar นับไม่ได้ใช้ a little | ใส่น้ำตาลนิดหน่อย
`);
G(3, 'Present Perfect', 'have/has + V3 · ทำมาแล้ว/ต่อเนื่องถึงตอนนี้ · since + จุดเวลา, for + ระยะเวลา', `
I ___ finished my work. | have | has, am, did | I + have + V3 | ฉันทำงานเสร็จแล้ว
She has ___ here for five years. | worked | work, working, works | has + V3 | เธอทำงานที่นี่มาห้าปีแล้ว
They have lived here ___ 2015. | since | for, from, ago | จุดเวลาใช้ since | พวกเขาอยู่ที่นี่ตั้งแต่ปี 2015
He has been a police officer ___ ten years. | for | since, ago, from | ระยะเวลาใช้ for | เขาเป็นตำรวจมาสิบปีแล้ว
___ you ever been to Japan? | Have | Has, Did, Are | you + Have + V3 | คุณเคยไปญี่ปุ่นไหม
The police have ___ the suspect. | caught | catch, catching, catches | have + V3 (catch → caught) | ตำรวจจับผู้ต้องสงสัยได้แล้ว
`);
G(3, 'Comparatives & Superlatives', 'คำสั้น + er than / the + est · คำยาว more ... than / the most ...', `
He is ___ than his brother. | taller | tall, tallest, more tall | เปรียบเทียบสองสิ่ง + er than | เขาสูงกว่าพี่ชาย
This is the ___ building in the city. | tallest | taller, tall, most tall | the + est = ที่สุด | นี่คืออาคารที่สูงที่สุดในเมือง
This test is ___ difficult than the last one. | more | most, much, very | คำยาวใช้ more ... than | ข้อสอบนี้ยากกว่าครั้งก่อน
She is the ___ student in the class. | best | better, good, most good | good → better → best | เธอเป็นนักเรียนที่เก่งที่สุดในห้อง
Today is ___ than yesterday. | hotter | hot, hottest, more hot | hot → hotter (เพิ่ม t) | วันนี้ร้อนกว่าเมื่อวาน
It is the most ___ case of the year. | important | importanter, importantest, more important | the most + คำยาว | เป็นคดีที่สำคัญที่สุดของปี
`);
G(3, 'Modal verbs', 'can / must / should / may + V1 เสมอ (ไม่เติม s, ไม่มี to)', `
You ___ wear a helmet. It is the law. | must | can, may, would | กฎบังคับใช้ must | คุณต้องสวมหมวกกันน็อก มันเป็นกฎหมาย
She can ___ three languages. | speak | speaks, speaking, to speak | modal + V1 | เธอพูดได้สามภาษา
You ___ see a doctor. You look sick. | should | must not, can't, may not | คำแนะนำใช้ should | คุณควรไปหาหมอ ดูไม่สบาย
You ___ smoke here. | must not | must, should, can | ห้ามใช้ must not | ห้ามสูบบุหรี่ที่นี่
___ I come in? | May | Must, Should, Will | ขออนุญาตอย่างสุภาพใช้ May | ขอเข้าไปได้ไหม
He can't ___ the door. | open | opens, opened, to open | can't + V1 | เขาเปิดประตูไม่ได้
`);
G(3, 'Conjunctions', 'and เพิ่ม · but ขัดแย้ง · because เหตุ · so ผล · although แม้ว่า', `
He was tired, ___ he kept working. | but | so, because, and | ขัดแย้งกันใช้ but | เขาเหนื่อยแต่ก็ยังทำงานต่อ
I stayed home ___ it was raining. | because | so, but, although | บอกเหตุผลใช้ because | ฉันอยู่บ้านเพราะฝนตก
It was late, ___ we went home. | so | because, but, although | ผลลัพธ์ใช้ so | ดึกแล้ว เราจึงกลับบ้าน
___ he is rich, he is not happy. | Although | Because, So, But | แม้ว่าใช้ Although | แม้ว่าเขารวย แต่เขาไม่มีความสุข
She likes tea ___ coffee. | and | but, so, because | เพิ่มเติมใช้ and | เธอชอบชาและกาแฟ
He studied hard, ___ he passed the exam. | so | but, because, although | ผลลัพธ์ใช้ so | เขาตั้งใจเรียน จึงสอบผ่าน
`);
G(3, 'Gerund & Infinitive', 'enjoy/avoid/finish/mind + V-ing · want/need/decide/hope + to V1 · หลังบุพบทใช้ V-ing', `
I enjoy ___ music. | listening to | listen to, to listen to, listened to | enjoy + V-ing | ฉันชอบฟังเพลง
She wants ___ a police officer. | to become | becoming, become, became | want + to V1 | เธออยากเป็นตำรวจ
Avoid ___ at night. | driving | to drive, drive, drove | avoid + V-ing | หลีกเลี่ยงการขับรถตอนกลางคืน
He decided ___ the job. | to take | taking, take, took | decide + to V1 | เขาตัดสินใจรับงานนี้
Thank you for ___ me. | helping | help, to help, helped | หลังบุพบท for ใช้ V-ing | ขอบคุณที่ช่วยฉัน
I need ___ some rest. | to get | getting, get, got | need + to V1 | ฉันต้องพักผ่อน
`);
G(4, 'Passive Voice', 'ผู้ถูกกระทำเป็นประธาน · be + V3 (+ by ผู้ทำ)', `
The thief ___ by the police. | was caught | caught, catches, was catch | อดีต + ถูกกระทำ = was + V3 | ขโมยถูกตำรวจจับ
English ___ in many countries. | is spoken | speaks, is speaking, spoke | ปัจจุบันถูกกระทำ = is + V3 | ภาษาอังกฤษถูกใช้พูดในหลายประเทศ
The car was ___ last night. | stolen | stole, steal, stealing | was + V3 (steal → stolen) | รถถูกขโมยเมื่อคืน
The report will be ___ tomorrow. | finished | finish, finishing, finishes | will be + V3 | รายงานจะเสร็จพรุ่งนี้
These rules ___ by everyone. | must be followed | must follow, must following, must be follow | must be + V3 | ทุกคนต้องปฏิบัติตามกฎเหล่านี้
The building ___ in 1990. | was built | built, is build, was building | อดีต + ถูกกระทำ | อาคารนี้สร้างในปี 1990
`);
G(4, 'If-clauses', 'If + V1, will + V1 (เป็นไปได้) · If + V2, would + V1 (สมมติไม่จริง)', `
If it rains, I ___ stay home. | will | would, am, did | If + V1 → will | ถ้าฝนตก ฉันจะอยู่บ้าน
If I ___ rich, I would buy a house. | were | am, will be, be | สมมติไม่จริงใช้ were | ถ้าฉันรวย ฉันจะซื้อบ้าน
If you heat ice, it ___. | melts | melt, melted, will melted | ความจริงทั่วไป If + V1, V1 | ถ้าเอาน้ำแข็งไปอุ่น มันจะละลาย
If he studied, he ___ pass. | would | will, can, does | If + V2 → would + V1 | ถ้าเขาตั้งใจเรียน เขาคงสอบผ่าน
If you ___ hard, you will pass. | study | studied, will study, studying | If + V1 (ไม่ใช้ will หลัง if) | ถ้าคุณตั้งใจเรียน คุณจะสอบผ่าน
Call me if you ___ help. | need | needed, will need, needing | if + V1 | ถ้าต้องการความช่วยเหลือ โทรหาฉัน
`);
G(4, 'Relative pronouns', 'who = คน · which = สิ่งของ/สัตว์ · that = ได้ทั้งคน/สิ่งของ · whose = ของใคร', `
The man ___ stole my bag ran away. | who | which, whose, where | ขยายคนใช้ who | ผู้ชายที่ขโมยกระเป๋าฉันวิ่งหนีไป
This is the car ___ was stolen. | which | who, whose, where | ขยายสิ่งของใช้ which | นี่คือรถที่ถูกขโมย
She is the officer ___ helped me. | who | which, whose, what | ขยายคนใช้ who | เธอคือเจ้าหน้าที่ที่ช่วยฉัน
The boy ___ father is a judge is my friend. | whose | who, which, that | ของใครใช้ whose | เด็กผู้ชายที่พ่อเป็นผู้พิพากษาเป็นเพื่อนฉัน
I lost the phone ___ you gave me. | that | who, whose, what | ขยายสิ่งของใช้ that ได้ | ฉันทำโทรศัพท์ที่คุณให้มาหาย
The place ___ the crime happened is closed. | where | which, who, whose | สถานที่ใช้ where | สถานที่เกิดเหตุถูกปิด
`);
G(4, 'Question tags', 'บอกเล่า → tag ปฏิเสธ · ปฏิเสธ → tag บอกเล่า · ใช้กริยาช่วยตัวเดิม', `
You are a student, ___? | aren't you | are you, don't you, isn't it | บอกเล่า are → aren't you | คุณเป็นนักเรียนใช่ไหม
She can swim, ___? | can't she | can she, doesn't she, isn't she | บอกเล่า can → can't she | เธอว่ายน้ำได้ใช่ไหม
He doesn't smoke, ___? | does he | doesn't he, is he, did he | ปฏิเสธ → tag บอกเล่า | เขาไม่สูบบุหรี่ใช่ไหม
They went home, ___? | didn't they | did they, don't they, weren't they | went (อดีต) → didn't | พวกเขากลับบ้านแล้วใช่ไหม
It is hot today, ___? | isn't it | is it, doesn't it, wasn't it | is → isn't it | วันนี้ร้อนใช่ไหม
You will come, ___? | won't you | will you, don't you, aren't you | will → won't | คุณจะมาใช่ไหม
`);

// ===== บทสนทนาออกสอบ =====
function D(lv, t, text){
  const ls = text.trim().split(/\n\s*---\s*\n/).map(block => block.trim().split('\n').map(line => {
    const [d, a, w, tr] = line.split('|').map(s => (s || '').trim());
    return { lines: d.split('/').map(x => x.trim()), q: d, a, w: w.split(';').map(x => x.trim()).filter(Boolean), tr: tr || '', why: '', en: a, th: '' };
  }));
  const C = COURSES.dialog; C.units.push({ t, lv, rule: '', ls }); (C.def = C.def || []).push(t);
}
D(1, 'ทักทายและขอความช่วยเหลือ', `
A: Good morning. How are you? / B: ___ | I'm fine, thank you. And you? | Good night.; I'm 25 years old.; Yes, I am a student. | A: อรุณสวัสดิ์ สบายดีไหม / B: สบายดี ขอบคุณ แล้วคุณล่ะ
A: Thank you for your help. / B: ___ | You're welcome. | Yes, please.; I'm sorry.; See you yesterday. | A: ขอบคุณที่ช่วย / B: ด้วยความยินดี
A: Excuse me, where is the bank? / B: ___ | It's next to the post office. | It's 10 o'clock.; I like the bank.; Yes, it is. | A: ขอโทษครับ ธนาคารอยู่ที่ไหน / B: อยู่ข้างที่ทำการไปรษณีย์
A: I'm sorry I'm late. / B: ___ | That's all right. | You're welcome.; Nice to meet you.; Yes, you are. | A: ขอโทษที่มาสาย / B: ไม่เป็นไร
A: Nice to meet you. / B: ___ | Nice to meet you too. | I'm fine, thanks.; Goodbye.; Yes, I do. | A: ยินดีที่ได้รู้จัก / B: ยินดีที่ได้รู้จักเช่นกัน
---
A: Can you help me, please? / B: ___ | Sure. What's the problem? | No, I can't swim.; It's my pleasure to eat.; I'm not hungry. | A: ช่วยฉันหน่อยได้ไหม / B: ได้ มีปัญหาอะไร
A: What time is it? / B: ___ | It's half past two. | It's Monday.; It's very hot.; It's two kilometers. | A: กี่โมงแล้ว / B: บ่ายสองโมงครึ่ง
A: May I use your phone? / B: ___ | Of course. Here you are. | No, I'm busy tomorrow.; Yes, it's my phone number.; I don't know him. | A: ขอใช้โทรศัพท์หน่อยได้ไหม / B: ได้เลย นี่ครับ
A: Would you like some water? / B: ___ | Yes, please. | Yes, I would like it yesterday.; No, I'm water.; I like swimming. | A: ดื่มน้ำไหม / B: ครับ ขอบคุณ
A: How can I get to the hospital? / B: ___ | Go straight and turn left. | It is a big hospital.; I am a doctor.; By the hospital. | A: ไปโรงพยาบาลยังไง / B: ตรงไปแล้วเลี้ยวซ้าย
`);
D(2, 'ที่สถานีตำรวจ', `
A: Good afternoon. How can I help you? / B: ___ | I want to report a stolen motorbike. | I want to buy a motorbike.; I'm a good driver.; Good afternoon to you too, bye. | A: สวัสดีครับ มีอะไรให้ช่วยไหม / B: ผมต้องการแจ้งความรถมอเตอร์ไซค์หาย
A: When did it happen? / B: ___ | Last night, around ten o'clock. | At the market.; Because I was tired.; With my friend. | A: เกิดเหตุเมื่อไหร่ / B: เมื่อคืน ประมาณสี่ทุ่ม
A: Where did you park it? / B: ___ | In front of my apartment. | At eight o'clock.; It's red.; I parked it quickly. | A: คุณจอดไว้ที่ไหน / B: หน้าอพาร์ตเมนต์ของผม
A: Can you describe the thief? / B: ___ | He was tall and wore a black jacket. | He stole my bike.; I don't like him.; He was at nine. | A: บรรยายลักษณะขโมยได้ไหม / B: เขาตัวสูงและใส่แจ็กเก็ตสีดำ
A: Please fill in this form. / B: ___ | OK. Can I borrow a pen? | No, I'm full.; Yes, it's a nice form.; I'm sorry to hear that. | A: กรุณากรอกแบบฟอร์มนี้ / B: ได้ครับ ขอยืมปากกาหน่อย
---
A: I lost my wallet. / B: ___ | When did you last see it? | Congratulations!; That's a good idea.; I like your wallet. | A: ฉันทำกระเป๋าเงินหาย / B: คุณเห็นมันครั้งสุดท้ายเมื่อไหร่
A: What was in your wallet? / B: ___ | My ID card and about 2,000 baht. | It was brown leather.; I lost it on the bus.; Yes, there was. | A: ในกระเป๋ามีอะไรบ้าง / B: บัตรประชาชนกับเงินประมาณ 2,000 บาท
A: Can I see your ID card? / B: ___ | Here it is. | I can see it.; It's my card game.; Yes, I see. | A: ขอดูบัตรประชาชนหน่อย / B: นี่ครับ
A: We will call you if we find it. / B: ___ | Thank you very much, officer. | I will find you.; Don't call me again.; It's not my phone. | A: ถ้าเราเจอจะโทรหาคุณ / B: ขอบคุณมากครับ คุณตำรวจ
A: Is anyone hurt? / B: ___ | No, everyone is safe. | Yes, I'm hungry.; It's not my car.; I don't have time. | A: มีใครบาดเจ็บไหม / B: ไม่มี ทุกคนปลอดภัย
`);
D(3, 'ท้องถนนและการจราจร', `
A: Can I see your driving license, please? / B: ___ | Sure. Here you are. | I can drive very well.; My car is new.; I don't like driving. | A: ขอดูใบขับขี่หน่อยครับ / B: ได้ครับ นี่ครับ
A: Do you know why I stopped you? / B: ___ | Was I driving too fast? | Because I like you.; Yes, I stopped too.; I know your name. | A: รู้ไหมว่าทำไมผมเรียกให้หยุด / B: ผมขับเร็วเกินไปเหรอครับ
A: You were not wearing a helmet. / B: ___ | I'm sorry. I won't do it again. | Thank you, it's a nice helmet.; Yes, I'm wearing it now, bye.; My helmet is at home, so it's OK. | A: คุณไม่ได้สวมหมวกกันน็อก / B: ขอโทษครับ จะไม่ทำอีก
A: There's been an accident on the highway. / B: ___ | Is anyone injured? | Let's have lunch.; I like highways.; Happy birthday! | A: เกิดอุบัติเหตุบนทางหลวง / B: มีคนบาดเจ็บไหม
A: How far is the next checkpoint? / B: ___ | About five kilometers from here. | It's at noon.; It's very far away, yesterday.; About five o'clock. | A: ด่านตรวจถัดไปอยู่ไกลแค่ไหน / B: ประมาณห้ากิโลเมตรจากที่นี่
---
A: Could you move your car, please? / B: ___ | Oh, sorry. I'll move it now. | Yes, I love my car.; No, it's a red car.; It's my parking. Goodbye forever. | A: ช่วยเลื่อนรถหน่อยได้ไหมครับ / B: ขอโทษครับ จะเลื่อนเดี๋ยวนี้
A: Have you been drinking tonight? / B: ___ | No, officer. I only had water. | Yes, I'm driving now.; I drink every morning.; Tonight is very dark. | A: คืนนี้คุณดื่มมาหรือเปล่า / B: เปล่าครับ ผมดื่มแค่น้ำ
A: Which way to the airport? / B: ___ | Take the second exit on the left. | The airport is big.; By plane.; At three o'clock. | A: ไปสนามบินทางไหน / B: ใช้ทางออกที่สองทางซ้าย
A: The road is closed because of flooding. / B: ___ | Is there another way? | I like rain.; Good, let's swim there.; The road is long. | A: ถนนปิดเพราะน้ำท่วม / B: มีทางอื่นไหม
A: You have to pay a fine of 500 baht. / B: ___ | Where can I pay it? | I like 500 baht.; Fine, thank you.; It's very cheap food. | A: คุณต้องเสียค่าปรับ 500 บาท / B: จ่ายได้ที่ไหน
`);
D(4, 'สถานการณ์ทั่วไป', `
A: I think someone is following me. / B: ___ | Stay calm. Where are you now? | Follow me, please.; That's a good idea.; I don't think so, bye. | A: ฉันว่ามีคนตามฉันมา / B: ใจเย็นๆ ตอนนี้คุณอยู่ที่ไหน
A: Would you mind waiting outside? / B: ___ | Not at all. | Yes, I'd love to.; No, I don't wait.; I mind you. | A: รบกวนรอข้างนอกได้ไหม / B: ได้เลย (ไม่รบกวน)
A: Why do you want to be a police officer? / B: ___ | Because I want to help people and keep society safe. | Because I am a police officer.; I want to be rich tomorrow.; Yes, I want. | A: ทำไมคุณถึงอยากเป็นตำรวจ / B: เพราะผมอยากช่วยเหลือประชาชนและรักษาความปลอดภัยของสังคม
A: What would you do if you saw a crime? / B: ___ | I would call the police immediately. | I would see it again.; I did it yesterday.; I will crime. | A: ถ้าเห็นการก่ออาชญากรรมคุณจะทำอย่างไร / B: ผมจะโทรแจ้งตำรวจทันที
A: How long have you lived here? / B: ___ | For about ten years. | Since ten kilometers.; Yes, I live here.; At ten o'clock. | A: คุณอาศัยอยู่ที่นี่มานานเท่าไหร่ / B: ประมาณสิบปี
---
A: Let's meet at the station at 8. / B: ___ | Sounds good. See you then. | I met you yesterday.; The station is big.; Good night forever. | A: เจอกันที่สถานีตอน 8 โมง / B: ได้เลย แล้วเจอกัน
A: I passed the police exam! / B: ___ | Congratulations! I'm so happy for you. | I'm sorry to hear that.; Never mind.; Take care of yourself. | A: ผมสอบตำรวจผ่านแล้ว! / B: ยินดีด้วย ดีใจกับคุณมาก
A: My mother is in the hospital. / B: ___ | I'm sorry to hear that. I hope she gets better soon. | Congratulations!; That's great news!; Have a nice trip. | A: แม่ของฉันอยู่โรงพยาบาล / B: เสียใจด้วย ขอให้ท่านหายเร็วๆ
A: Could you speak more slowly, please? / B: ___ | Of course. Sorry about that. | No, I speak English.; Yes, I'm slow.; I'm fast. | A: ช่วยพูดช้าลงหน่อยได้ไหม / B: ได้ครับ ขอโทษด้วย
A: Do you mind if I open the window? / B: ___ | No, go ahead. | Yes, please open it.; I don't have a window.; It's very windy, thanks. | A: ขอเปิดหน้าต่างได้ไหม / B: ได้เลย เชิญ
`);

// ===== อ่านจับใจความ =====
function R(lv, t, title, text, tr, qs){
  const C = COURSES.read;
  let u = C.units.find(x => x.t === t && x.lv === lv);
  if(!u){ u = { t, lv, rule: '', ls: [] }; C.units.push(u); (C.def = C.def || []).push(t); }
  u.ls.push(qs.trim().split('\n').map(line => {
    const [q, a, w] = line.split('|').map(s => (s || '').trim());
    return { q, a, w: w.split(';').map(x => x.trim()).filter(Boolean), tr: '', why: '', en: a, th: '', title, text: text.trim().replace(/\s+/g, ' '), ptr: tr.trim().replace(/\s+/g, ' ') };
  }));
}
R(1, 'เรื่องสั้นง่ายๆ', 'My Day', `Somchai is a police officer. He wakes up at five every morning. He runs in the park for thirty minutes. Then he eats breakfast with his family. He goes to work by motorbike. He works at a police station near the market. He likes his job because he can help people.`,
`สมชายเป็นตำรวจ เขาตื่นนอนตีห้าทุกเช้า เขาวิ่งในสวนสาธารณะสามสิบนาที แล้วกินอาหารเช้ากับครอบครัว เขาไปทำงานด้วยมอเตอร์ไซค์ เขาทำงานที่สถานีตำรวจใกล้ตลาด เขาชอบงานของเขาเพราะได้ช่วยเหลือผู้คน`, `
What is Somchai's job? | A police officer | A teacher; A doctor; A driver
What time does he wake up? | At five | At six; At seven; At eight
How does he go to work? | By motorbike | By bus; On foot; By car
Why does he like his job? | He can help people. | He can sleep a lot.; It is near his home.; He gets a lot of money.
`);
R(1, 'เรื่องสั้นง่ายๆ', 'The Lost Dog', `Mali has a small white dog. Its name is Lucky. Yesterday Lucky ran out of the house and did not come back. Mali was very sad. She put a photo of Lucky on the internet. In the evening, a neighbor called her. He found Lucky in the temple near their village. Mali was very happy.`,
`มะลิมีสุนัขสีขาวตัวเล็กชื่อลักกี้ เมื่อวานลักกี้วิ่งออกจากบ้านแล้วไม่กลับมา มะลิเสียใจมาก เธอโพสต์รูปลักกี้ลงอินเทอร์เน็ต ตอนเย็นเพื่อนบ้านโทรหาเธอ เขาพบลักกี้ที่วัดใกล้หมู่บ้าน มะลิดีใจมาก`, `
What color is Lucky? | White | Black; Brown; Gray
When did Lucky run away? | Yesterday | Last week; This morning; Two days ago
Who found Lucky? | A neighbor | A police officer; Mali's mother; A monk
Where was Lucky found? | At a temple | At a school; At the market; In the park
`);
R(2, 'ข่าวและประกาศ', 'Road Notice', `Notice: Rama IV Road will be closed from 10 p.m. Saturday to 5 a.m. Sunday for road repairs. Drivers should use Sathorn Road instead. Buses number 4 and 47 will change their routes. For more information, please call 1197. We are sorry for any inconvenience.`,
`ประกาศ: ถนนพระรามสี่จะปิดตั้งแต่สี่ทุ่มวันเสาร์ถึงตีห้าวันอาทิตย์เพื่อซ่อมถนน ผู้ขับขี่ควรใช้ถนนสาทรแทน รถเมล์สาย 4 และ 47 จะเปลี่ยนเส้นทาง สอบถามเพิ่มเติมโทร 1197 ขออภัยในความไม่สะดวก`, `
Why will the road be closed? | For road repairs | For a festival; Because of an accident; Because of flooding
When will the road open again? | 5 a.m. Sunday | 10 p.m. Saturday; 5 p.m. Sunday; Monday morning
Which road should drivers use? | Sathorn Road | Rama IV Road; Silom Road; Highway 4
What number can people call for information? | 1197 | 191; 1669; 47
`);
R(2, 'ข่าวและประกาศ', 'Thief Caught', `Police in Chiang Mai arrested a 28-year-old man on Monday. He stole mobile phones from tourists at the night market. A shop owner saw him and called the police. Officers found twelve phones in his bag. The man said he needed money to pay his debts. He will go to court next week.`,
`ตำรวจเชียงใหม่จับกุมชายอายุ 28 ปีเมื่อวันจันทร์ เขาขโมยโทรศัพท์มือถือจากนักท่องเที่ยวที่ตลาดกลางคืน เจ้าของร้านเห็นจึงโทรแจ้งตำรวจ เจ้าหน้าที่พบโทรศัพท์สิบสองเครื่องในกระเป๋าของเขา ชายคนนั้นบอกว่าต้องการเงินไปใช้หนี้ เขาจะขึ้นศาลสัปดาห์หน้า`, `
What did the man steal? | Mobile phones | Wallets; Motorbikes; Cameras
Who called the police? | A shop owner | A tourist; His friend; A taxi driver
How many phones did the police find? | Twelve | Two; Twenty; Eight
Why did he steal? | He needed money for his debts. | He wanted to travel.; He wanted new phones.; He was angry at tourists.
`);
R(3, 'งานตำรวจ', 'Online Scam Warning', `The police are warning people about a new phone scam. Criminals call and say they are from a bank. They say there is a problem with your account and ask for your password. Banks never ask for passwords by phone. If you get this kind of call, hang up and contact your bank directly. You can also report it to the police at 1441.`,
`ตำรวจเตือนประชาชนเรื่องแก๊งหลอกลวงทางโทรศัพท์รูปแบบใหม่ คนร้ายโทรมาอ้างว่าเป็นธนาคาร บอกว่าบัญชีของคุณมีปัญหาและขอรหัสผ่าน ธนาคารไม่เคยขอรหัสผ่านทางโทรศัพท์ ถ้าได้รับสายแบบนี้ให้วางสายแล้วติดต่อธนาคารโดยตรง หรือแจ้งตำรวจที่ 1441`, `
Who do the criminals say they are? | Bank staff | Police officers; Doctors; Teachers
What do the criminals ask for? | Your password | Your address; Your photo; Your car
What should you do if you get this call? | Hang up and contact your bank | Give them your password; Call them back later; Send them money
What is the main idea of this text? | A warning about phone scams | How to open a bank account; How to become a police officer; A new phone for sale
`);
R(3, 'งานตำรวจ', 'Community Police', `Many police stations now have community police officers. These officers walk around neighborhoods, talk to people, and listen to their problems. They also visit schools to teach children about road safety and drugs. Because people trust them, they often get useful information about crimes. This program has helped reduce crime in many areas.`,
`ปัจจุบันสถานีตำรวจหลายแห่งมีตำรวจชุมชน เจ้าหน้าที่เหล่านี้เดินตรวจในชุมชน พูดคุยกับประชาชน และรับฟังปัญหา พวกเขายังไปโรงเรียนเพื่อสอนเด็กเรื่องความปลอดภัยบนท้องถนนและยาเสพติด เพราะประชาชนไว้ใจ พวกเขาจึงมักได้ข้อมูลที่เป็นประโยชน์เกี่ยวกับอาชญากรรม โครงการนี้ช่วยลดอาชญากรรมได้ในหลายพื้นที่`, `
What do community police officers do? | Talk to people and listen to their problems | Sell things in the market; Drive buses; Work only in offices
What do they teach children? | Road safety and drugs | Mathematics; English songs; Cooking
Why do they get useful information? | People trust them | They pay people; They use cameras; They read newspapers
What is the result of this program? | Less crime | More traffic; More drugs; Fewer schools
`);
R(4, 'บทความ', 'Fitness Test', `Every applicant for the police force must pass a fitness test. The test usually includes running, push-ups, and sit-ups. Many applicants fail because they start training too late. Experts recommend exercising at least three months before the test. A healthy diet and enough sleep are also important. Being fit is not only for the test; officers need good health throughout their careers.`,
`ผู้สมัครเป็นตำรวจทุกคนต้องผ่านการทดสอบสมรรถภาพร่างกาย ซึ่งมักประกอบด้วยการวิ่ง วิดพื้น และลุกนั่ง ผู้สมัครหลายคนสอบไม่ผ่านเพราะเริ่มฝึกช้าเกินไป ผู้เชี่ยวชาญแนะนำให้ออกกำลังกายอย่างน้อยสามเดือนก่อนสอบ อาหารที่มีประโยชน์และการนอนหลับที่เพียงพอก็สำคัญ การมีร่างกายแข็งแรงไม่ได้มีไว้แค่สอบ เพราะตำรวจต้องมีสุขภาพดีตลอดชีวิตการทำงาน`, `
Why do many applicants fail? | They start training too late. | The test is too easy.; They eat too much.; They sleep too much.
How long before the test should you start exercising? | At least three months | One week; Three days; One year
Which is NOT part of the test? | Swimming | Running; Push-ups; Sit-ups
What does the writer mean by "throughout their careers"? | During their whole working life | Only during the test; Only at night; After they retire
`);
R(4, 'บทความ', 'Cybercrime', `Cybercrime is increasing quickly around the world. Criminals use the internet to steal money, personal data, and even identities. Some create fake shopping websites, while others send emails with dangerous links. Police forces now train special officers to investigate online crimes. However, experts say the best protection is public awareness: people should use strong passwords and never share personal information with strangers.`,
`อาชญากรรมไซเบอร์เพิ่มขึ้นอย่างรวดเร็วทั่วโลก คนร้ายใช้อินเทอร์เน็ตขโมยเงิน ข้อมูลส่วนตัว และแม้แต่ตัวตน บางคนสร้างเว็บไซต์ขายของปลอม บางคนส่งอีเมลที่มีลิงก์อันตราย ปัจจุบันตำรวจฝึกเจ้าหน้าที่พิเศษเพื่อสืบสวนอาชญากรรมออนไลน์ อย่างไรก็ตาม ผู้เชี่ยวชาญกล่าวว่าการป้องกันที่ดีที่สุดคือการตระหนักรู้ของประชาชน ควรใช้รหัสผ่านที่คาดเดายากและไม่ให้ข้อมูลส่วนตัวกับคนแปลกหน้า`, `
What is happening to cybercrime? | It is increasing quickly. | It is decreasing.; It has stopped.; It only happens in Thailand.
Which is an example of cybercrime in the text? | Fake shopping websites | Stealing cars; Selling drugs on the street; Fighting in a bar
According to experts, what is the best protection? | Public awareness | More police stations; Expensive computers; Closing the internet
The word "strangers" means | people you do not know | your family members; police officers; your best friends
`);

// ===== เพิ่มเติม (ชุดที่ 3) =====
U('police', 1, 'อุปกรณ์และยานพาหนะ', `
handcuffs | กุญแจมือ | He put handcuffs on the thief. | เขาใส่กุญแจมือให้ขโมย
radio | วิทยุสื่อสาร | Call the station by radio. | ติดต่อสถานีทางวิทยุ
gun | ปืน | The officer has a gun. | เจ้าหน้าที่มีปืน
flashlight | ไฟฉาย | Use a flashlight at night. | ใช้ไฟฉายตอนกลางคืน
badge | ตราประจำตัว | Show your police badge. | แสดงตราตำรวจของคุณ
siren | ไซเรน | I heard a police siren. | ฉันได้ยินเสียงไซเรนตำรวจ
---
vehicle | ยานพาหนะ | Stop the vehicle now. | หยุดรถเดี๋ยวนี้
whistle | นกหวีด | He blew a whistle. | เขาเป่านกหวีด
camera | กล้อง | The camera recorded the crime. | กล้องบันทึกการก่อเหตุไว้
vest | เสื้อกั๊ก | Wear a safety vest. | สวมเสื้อกั๊กนิรภัย
boots | รองเท้าบูท | His boots are black. | รองเท้าบูทของเขาสีดำ
cell | ห้องขัง | He spent the night in a cell. | เขาค้างคืนในห้องขัง
`);
U('police', 2, 'ร่างกายและการบาดเจ็บ', `
head | ศีรษะ | He hit his head. | เขาศีรษะกระแทก
arm | แขน | My arm hurts. | แขนของฉันเจ็บ
leg | ขา | She broke her leg. | ขาของเธอหัก
blood | เลือด | There is blood on the floor. | มีเลือดบนพื้น
wound | บาดแผล | Clean the wound. | ทำความสะอาดแผล
bleed | เลือดออก | His nose is bleeding. | จมูกของเขาเลือดออก
---
hurt | เจ็บ/ทำให้บาดเจ็บ | Did he hurt you? | เขาทำร้ายคุณหรือเปล่า
unconscious | หมดสติ | The man is unconscious. | ชายคนนั้นหมดสติ
breathe | หายใจ | Can he breathe? | เขาหายใจได้ไหม
first aid | การปฐมพยาบาล | Give him first aid. | ปฐมพยาบาลเขา
bandage | ผ้าพันแผล | Put a bandage on it. | พันแผลไว้
bruise | รอยฟกช้ำ | She has a bruise on her arm. | เธอมีรอยฟกช้ำที่แขน
`);
U('police', 3, 'อาชญากรรมร้ายแรง', `
murder | ฆาตกรรม | He was arrested for murder. | เขาถูกจับในข้อหาฆาตกรรม
kidnap | ลักพาตัว | They kidnapped a child. | พวกเขาลักพาตัวเด็ก
gang | แก๊ง | The gang sold drugs. | แก๊งนี้ขายยาเสพติด
assault | ทำร้ายร่างกาย | He was charged with assault. | เขาถูกตั้งข้อหาทำร้ายร่างกาย
burglary | การย่องเบา/บุกรุกลักทรัพย์ | There was a burglary last night. | เมื่อคืนมีการบุกรุกลักทรัพย์
pickpocket | ล้วงกระเป๋า | A pickpocket took my wallet. | นักล้วงกระเป๋าเอากระเป๋าเงินฉันไป
---
dealer | ผู้ค้า | The police caught a drug dealer. | ตำรวจจับผู้ค้ายาได้
addict | ผู้ติดยา | He is a drug addict. | เขาเป็นคนติดยา
trafficking | การค้ามนุษย์/ค้ายา | Human trafficking is a serious crime. | การค้ามนุษย์เป็นอาชญากรรมร้ายแรง
vandalism | การทำลายทรัพย์สิน | Vandalism is a crime. | การทำลายทรัพย์สินเป็นอาชญากรรม
arson | การวางเพลิง | The fire was caused by arson. | ไฟไหม้เกิดจากการวางเพลิง
illegal immigrant | ผู้เข้าเมืองผิดกฎหมาย | They found illegal immigrants. | พวกเขาพบผู้เข้าเมืองผิดกฎหมาย
`);
U('police', 4, 'การปฏิบัติหน้าที่', `
operation | ปฏิบัติการ | The operation started at dawn. | ปฏิบัติการเริ่มตอนรุ่งเช้า
raid | การบุกตรวจค้น | Police raided the house. | ตำรวจบุกตรวจค้นบ้านหลังนั้น
surveillance | การเฝ้าติดตาม | The suspect is under surveillance. | ผู้ต้องสงสัยอยู่ระหว่างการเฝ้าติดตาม
undercover | นอกเครื่องแบบ/แฝงตัว | He works as an undercover officer. | เขาทำงานเป็นตำรวจนอกเครื่องแบบ
backup | กำลังเสริม | We need backup now. | เราต้องการกำลังเสริมเดี๋ยวนี้
jurisdiction | เขตอำนาจ | This area is not our jurisdiction. | พื้นที่นี้ไม่ใช่เขตอำนาจของเรา
---
discipline | วินัย | Police need strong discipline. | ตำรวจต้องมีวินัยเข้มแข็ง
commander | ผู้บังคับบัญชา | The commander gave an order. | ผู้บังคับบัญชาสั่งการ
rank | ยศ | What is your rank? | คุณยศอะไร
salute | ทำความเคารพ | Salute the flag. | ทำความเคารพธงชาติ
oath | คำสาบาน | He took an oath to serve the people. | เขาสาบานตนว่าจะรับใช้ประชาชน
honor | เกียรติ | It is an honor to serve. | เป็นเกียรติที่ได้รับใช้
`);
U('daily', 1, 'สีและตัวเลข', `
red | สีแดง | The light is red. | ไฟเป็นสีแดง
blue | สีน้ำเงิน/ฟ้า | The sky is blue. | ท้องฟ้าสีฟ้า
green | สีเขียว | Go when it is green. | ไปได้เมื่อไฟเขียว
yellow | สีเหลือง | She has a yellow bag. | เธอมีกระเป๋าสีเหลือง
black | สีดำ | He wore a black shirt. | เขาสวมเสื้อสีดำ
white | สีขาว | The car is white. | รถสีขาว
---
first | ที่หนึ่ง/แรก | This is my first time. | นี่เป็นครั้งแรกของฉัน
second | ที่สอง/วินาที | Wait a second. | รอสักครู่
half | ครึ่ง | Cut it in half. | ตัดครึ่ง
hundred | ร้อย | It costs one hundred baht. | ราคาหนึ่งร้อยบาท
thousand | พัน | Five thousand people came. | มีคนมาห้าพันคน
number | ตัวเลข/หมายเลข | What is your phone number? | เบอร์โทรศัพท์ของคุณคืออะไร
`);
U('daily', 2, 'ครอบครัวและงานบ้าน', `
father | พ่อ | My father is a farmer. | พ่อของฉันเป็นชาวนา
mother | แม่ | My mother cooks well. | แม่ของฉันทำอาหารเก่ง
brother | พี่ชาย/น้องชาย | I have one brother. | ฉันมีพี่น้องผู้ชายหนึ่งคน
sister | พี่สาว/น้องสาว | My sister is a nurse. | พี่สาวของฉันเป็นพยาบาล
husband | สามี | Her husband is kind. | สามีของเธอใจดี
wife | ภรรยา | His wife is a teacher. | ภรรยาของเขาเป็นครู
---
clean | ทำความสะอาด/สะอาด | I clean my room every day. | ฉันทำความสะอาดห้องทุกวัน
wash | ล้าง/ซัก | Wash your hands. | ล้างมือ
kitchen | ห้องครัว | Mom is in the kitchen. | แม่อยู่ในครัว
garden | สวน | We have a small garden. | เรามีสวนเล็กๆ
laundry | ผ้าที่ต้องซัก | I do the laundry on Sunday. | ฉันซักผ้าวันอาทิตย์
sweep | กวาด | Sweep the floor, please. | ช่วยกวาดพื้นหน่อย
`);
U('daily', 3, 'การเงินและธนาคาร', `
cash | เงินสด | Do you have cash? | คุณมีเงินสดไหม
save | เก็บออม | I save money every month. | ฉันเก็บเงินทุกเดือน
spend | ใช้จ่าย | Don't spend too much. | อย่าใช้จ่ายมากเกินไป
credit card | บัตรเครดิต | Can I pay by credit card? | จ่ายด้วยบัตรเครดิตได้ไหม
loan | เงินกู้ | He got a loan from the bank. | เขากู้เงินจากธนาคาร
debt | หนี้ | She has a lot of debt. | เธอมีหนี้มาก
---
withdraw | ถอนเงิน | I want to withdraw money. | ฉันต้องการถอนเงิน
deposit | ฝากเงิน | Deposit the money today. | ฝากเงินวันนี้
tax | ภาษี | We pay tax every year. | เราจ่ายภาษีทุกปี
cost | ราคา/มีราคา | How much does it cost? | ราคาเท่าไหร่
afford | มีเงินพอซื้อ | I can't afford a new car. | ฉันไม่มีเงินพอซื้อรถใหม่
budget | งบประมาณ | We have a small budget. | เรามีงบประมาณน้อย
`);
U('daily', 4, 'เทคโนโลยี', `
computer | คอมพิวเตอร์ | I use a computer at work. | ฉันใช้คอมพิวเตอร์ที่ทำงาน
download | ดาวน์โหลด | Download the app. | ดาวน์โหลดแอป
update | อัปเดต | Update your phone. | อัปเดตโทรศัพท์ของคุณ
screen | หน้าจอ | The screen is broken. | หน้าจอแตก
battery | แบตเตอรี่ | My battery is low. | แบตเตอรี่ของฉันใกล้หมด
charge | ชาร์จ | I need to charge my phone. | ฉันต้องชาร์จโทรศัพท์
---
social media | โซเชียลมีเดีย | Don't post everything on social media. | อย่าโพสต์ทุกอย่างลงโซเชียลมีเดีย
device | อุปกรณ์ | Turn off your device. | ปิดอุปกรณ์ของคุณ
install | ติดตั้ง | Install the program. | ติดตั้งโปรแกรม
delete | ลบ | Delete the message. | ลบข้อความ
connect | เชื่อมต่อ | Connect to the Wi-Fi. | เชื่อมต่อไวไฟ
signal | สัญญาณ | There is no signal here. | ที่นี่ไม่มีสัญญาณ
`);
U('talk', 2, 'ขอบคุณ ขอโทษ ขออนุญาต', `
appreciate | ซาบซึ้ง/ขอบคุณ | I appreciate your help. | ฉันซาบซึ้งที่คุณช่วย
forgive | ให้อภัย | Please forgive me. | โปรดให้อภัยฉัน
allow | อนุญาต | Are we allowed to park here? | เราจอดรถที่นี่ได้ไหม
mind | รังเกียจ/รบกวน | Do you mind if I sit here? | ขอนั่งตรงนี้ได้ไหม
favor | ความช่วยเหลือ | Can you do me a favor? | ช่วยอะไรฉันหน่อยได้ไหม
permission | การอนุญาต | You need permission. | คุณต้องได้รับอนุญาต
---
upstairs | ชั้นบน | The office is upstairs. | สำนักงานอยู่ชั้นบน
downstairs | ชั้นล่าง | Wait downstairs. | รอที่ชั้นล่าง
floor | ชั้น/พื้น | It's on the third floor. | อยู่ชั้นสาม
elevator | ลิฟต์ | Take the elevator. | ขึ้นลิฟต์
reception | แผนกต้อนรับ | Ask at reception. | สอบถามที่แผนกต้อนรับ
restroom | ห้องน้ำ | Where is the restroom? | ห้องน้ำอยู่ที่ไหน
`);
U('talk', 3, 'บริการและติดต่อราชการ', `
customer | ลูกค้า | The customer is waiting. | ลูกค้ากำลังรออยู่
service | บริการ | The service is good. | บริการดี
form | แบบฟอร์ม | Fill in this form. | กรอกแบบฟอร์มนี้
sign | ลงชื่อ/ป้าย | Sign here, please. | กรุณาลงชื่อตรงนี้
document | เอกสาร | Bring your documents. | นำเอกสารมาด้วย
copy | สำเนา | I need a copy of your ID card. | ฉันต้องการสำเนาบัตรประชาชนของคุณ
---
manager | ผู้จัดการ | I want to speak to the manager. | ฉันอยากคุยกับผู้จัดการ
complaint | คำร้องเรียน | I want to make a complaint. | ฉันต้องการร้องเรียน
exchange | แลกเปลี่ยน | Can I exchange this shirt? | ขอเปลี่ยนเสื้อตัวนี้ได้ไหม
wait | รอ | Please wait a moment. | กรุณารอสักครู่
office hours | เวลาทำการ | Office hours are 8:30 to 4:30. | เวลาทำการคือ 8:30 ถึง 16:30
queue number | บัตรคิว | Take a queue number. | รับบัตรคิว
`);
U('talk', 4, 'ประชุมและนำเสนอ', `
present | นำเสนอ | I will present the plan. | ฉันจะนำเสนอแผน
discuss | หารือ | Let's discuss the problem. | มาหารือเรื่องปัญหากัน
decide | ตัดสินใจ | We need to decide today. | เราต้องตัดสินใจวันนี้
agenda | วาระการประชุม | What is on the agenda? | มีวาระอะไรบ้าง
summary | สรุป | Here is a short summary. | นี่คือสรุปสั้นๆ
result | ผลลัพธ์ | The result is good. | ผลลัพธ์ดี
---
propose | เสนอ | I propose a new idea. | ฉันเสนอความคิดใหม่
feedback | ความคิดเห็นกลับ | Thank you for your feedback. | ขอบคุณสำหรับความคิดเห็น
progress | ความคืบหน้า | We made good progress. | เราคืบหน้าไปมาก
conclude | สรุป/ปิดท้าย | Let me conclude. | ขอสรุปปิดท้าย
example | ตัวอย่าง | Can you give an example? | ยกตัวอย่างได้ไหม
detail | รายละเอียด | Tell me the details. | บอกรายละเอียดหน่อย
`);
G(1, 'There is / There are', 'There is + นามเอกพจน์/นับไม่ได้ · There are + นามพหูพจน์', `
There ___ a car in front of the house. | is | are, be, am | a car เอกพจน์ใช้ is | มีรถคันหนึ่งอยู่หน้าบ้าน
There ___ many people in the market. | are | is, am, be | people พหูพจน์ใช้ are | มีคนมากมายในตลาด
There ___ some water in the glass. | is | are, have, has | water นับไม่ได้ใช้ is | มีน้ำอยู่ในแก้ว
___ there any questions? | Are | Is, Do, Does | questions พหูพจน์ใช้ Are | มีคำถามไหม
There ___ two police officers at the gate. | are | is, has, have | two officers พหูพจน์ใช้ are | มีตำรวจสองนายที่ประตู
There ___ a problem yesterday. | was | were, is, are | yesterday + เอกพจน์ใช้ was | เมื่อวานมีปัญหา
`);
G(2, 'Adverbs of frequency', 'always > usually > often > sometimes > never · วางหน้ากริยาแท้ แต่หลัง verb to be', `
He ___ goes to work by bus. | usually | usual, use, used | วางหน้ากริยา goes | ปกติเขาไปทำงานด้วยรถเมล์
She is ___ late. | never | ever, not ever, none | หลัง verb to be | เธอไม่เคยมาสาย
I ___ drink coffee in the morning. | always | all, allways, every | always = เสมอ | ฉันดื่มกาแฟตอนเช้าเสมอ
They ___ play football on Sunday. | often | much, very, many | often = บ่อย | พวกเขาเล่นฟุตบอลวันอาทิตย์บ่อยๆ
How ___ do you exercise? | often | many, much, long | How often = บ่อยแค่ไหน | คุณออกกำลังกายบ่อยแค่ไหน
We ___ eat out on weekends. | sometimes | sometime, some, someday | sometimes = บางครั้ง | บางครั้งเราก็กินข้าวนอกบ้านช่วงสุดสัปดาห์
`);
G(2, 'Plural nouns', 'ส่วนใหญ่ + s · ลงท้าย s/sh/ch/x + es · y → ies · คำพิเศษ man→men, child→children', `
I have two ___. | boxes | boxs, boxies, box | ลงท้าย x เติม es | ฉันมีกล่องสองใบ
There are three ___ in the room. | men | mans, mens, man | man → men | มีผู้ชายสามคนในห้อง
The ___ are playing. | children | childs, childrens, child | child → children | เด็กๆ กำลังเล่นกัน
I visited two ___. | cities | citys, cityes, city | y หลังพยัญชนะ → ies | ฉันไปเที่ยวสองเมือง
She bought five ___. | watches | watchs, watchies, watch | ลงท้าย ch เติม es | เธอซื้อนาฬิกาห้าเรือน
My ___ hurt. | feet | foots, feets, foot | foot → feet | เท้าของฉันเจ็บ
`);
G(3, 'Past Continuous', 'was/were + V-ing = กำลังทำอยู่ในอดีต · มักใช้กับ when/while', `
I ___ sleeping when the phone rang. | was | were, am, is | I + was + V-ing | ฉันกำลังนอนอยู่ตอนโทรศัพท์ดัง
They were ___ TV at 8 last night. | watching | watch, watched, watches | were + V-ing | เมื่อคืนตอนสองทุ่มพวกเขากำลังดูทีวี
What ___ you doing at that time? | were | was, did, are | you + were | ตอนนั้นคุณกำลังทำอะไรอยู่
While she was cooking, he ___ the floor. | was cleaning | cleaned, cleans, is cleaning | while + สองเหตุการณ์พร้อมกัน | ขณะที่เธอทำอาหาร เขากำลังทำความสะอาดพื้น
The thief ___ when the police arrived. | was running | runs, is running, run | กำลังทำอยู่ตอนอีกเหตุการณ์เกิด | ขโมยกำลังวิ่งหนีตอนตำรวจมาถึง
It ___ raining all day yesterday. | was | were, is, did | It + was | เมื่อวานฝนตกทั้งวัน
`);
G(3, 'Too / Enough / So / Such', 'too + adj = เกินไป · adj + enough = พอ · so + adj · such + a + adj + noun', `
This box is ___ heavy to carry. | too | enough, so, very much | too + adj = เกินไป | กล่องนี้หนักเกินกว่าจะยก
He is old ___ to drive. | enough | too, so, such | adj + enough | เขาอายุมากพอที่จะขับรถ
It was ___ a good movie. | such | so, too, enough | such + a + adj + noun | มันเป็นหนังที่ดีมาก
She is ___ kind. | so | such, enough, too much | so + adj | เธอใจดีมาก
We don't have ___ time. | enough | too, so, such | enough + noun | เรามีเวลาไม่พอ
The coffee is too hot ___ drink. | to | for, so, that | too + adj + to V1 | กาแฟร้อนเกินกว่าจะดื่ม
`);
G(4, 'Used to / Be used to', 'used to + V1 = เคยทำในอดีต (ตอนนี้ไม่แล้ว) · be used to + V-ing = เคยชิน', `
I ___ smoke, but I stopped. | used to | use to, am used to, used | used to + V1 = เคยทำ | ฉันเคยสูบบุหรี่ แต่เลิกแล้ว
He is used to ___ up early. | getting | get, got, gets | be used to + V-ing | เขาชินกับการตื่นเช้า
Did you ___ live here? | use to | used to, using to, uses to | Did + use to (ไม่มี d) | คุณเคยอยู่ที่นี่ไหม
She ___ used to the hot weather. | is | does, has, used | be used to | เธอชินกับอากาศร้อน
There ___ be a cinema here. | used to | is used to, use, using to | used to = เคยมี | ที่นี่เคยมีโรงหนัง
I'm not used to ___ on the left. | driving | drive, drove, drives | be used to + V-ing | ฉันไม่ชินกับการขับชิดซ้าย
`);
G(4, 'Reported speech', 'เล่าคำพูดคนอื่น: ถอยกาล is→was, will→would, can→could · said (that) / told + คน', `
He said he ___ tired. | was | is, will be, be | is → was | เขาบอกว่าเขาเหนื่อย
She told ___ that she was busy. | me | to me, I, my | told + คน | เธอบอกฉันว่าเธอยุ่ง
They said they ___ come tomorrow. | would | will, can, are | will → would | พวกเขาบอกว่าจะมาพรุ่งนี้
He said he ___ swim. | could | can, cans, is | can → could | เขาบอกว่าเขาว่ายน้ำได้
The officer asked me where I ___. | lived | live, do live, living | คำถามแบบเล่า ใช้ลำดับประโยคบอกเล่า | เจ้าหน้าที่ถามว่าฉันอาศัยอยู่ที่ไหน
She asked ___ I was a student. | if | that, what, so | ถามแบบ yes/no ใช้ if | เธอถามว่าฉันเป็นนักเรียนหรือเปล่า
`);
D(2, 'ร้านค้าและร้านอาหาร', `
A: Are you ready to order? / B: ___ | Yes, I'd like fried rice, please. | Yes, I'm ready to sleep.; No, I ordered it yesterday.; It's very delicious, bye. | A: พร้อมสั่งอาหารหรือยัง / B: พร้อมแล้ว ขอข้าวผัดครับ
A: How would you like to pay? / B: ___ | By credit card, please. | Very much, thank you.; At the restaurant.; It's 200 baht. | A: จะชำระเงินแบบไหน / B: ใช้บัตรเครดิตครับ
A: Can I try this shirt on? / B: ___ | Sure. The fitting room is over there. | No, it's a shirt.; Yes, it's 500 baht.; I like your shirt too. | A: ขอลองเสื้อตัวนี้ได้ไหม / B: ได้ ห้องลองอยู่ทางโน้น
A: This is too expensive. / B: ___ | I can give you a 10% discount. | Yes, it's very cheap.; Thank you for coming.; I'm too expensive too. | A: แพงเกินไป / B: ลดให้ 10% ครับ
A: Anything else? / B: ___ | No, that's all. Thank you. | Yes, I'm else.; I like anything.; See you anything. | A: รับอะไรเพิ่มไหม / B: ไม่แล้ว แค่นี้ ขอบคุณ
---
A: Excuse me, this soup is cold. / B: ___ | I'm so sorry. I'll bring you a new one. | Yes, it's a cold day.; Good, cold soup is nice.; Please eat it fast. | A: ขอโทษครับ ซุปเย็นแล้ว / B: ขอโทษจริงๆ จะนำถ้วยใหม่มาให้
A: Do you have this in a larger size? / B: ___ | Let me check for you. | Yes, I am larger.; It's a big shop.; No, it's my size. | A: มีไซซ์ใหญ่กว่านี้ไหม / B: ขอเช็คให้ก่อนนะครับ
A: Can I have the bill, please? / B: ___ | Sure, here you are. | Yes, my name is Bill.; I don't like bills.; Bill is not here. | A: ขอบิลด้วย / B: ได้ครับ นี่ครับ
A: Is service charge included? / B: ___ | Yes, it's already included. | Yes, I'm in service.; No, I'm a charger.; The service was yesterday. | A: รวมค่าบริการแล้วหรือยัง / B: รวมแล้วครับ
A: What do you recommend? / B: ___ | The green curry is very popular. | I recommend you.; Yes, I do.; It's very far. | A: แนะนำอะไรดี / B: แกงเขียวหวานเป็นที่นิยมมาก
`);
D(3, 'โทรศัพท์และนัดหมาย', `
A: Hello, may I speak to Officer Somchai? / B: ___ | Just a moment, please. | Yes, you speak English.; He is a good officer.; No, I can't speak. | A: สวัสดีครับ ขอสายคุณสมชายครับ / B: รอสักครู่นะครับ
A: He's not here right now. / B: ___ | Can I leave a message? | Here is right now.; OK, I'm here too.; Good, see you now. | A: ตอนนี้เขาไม่อยู่ / B: ขอฝากข้อความได้ไหม
A: When are you free this week? / B: ___ | How about Thursday afternoon? | I'm free of charge.; Last week was good.; Yes, I am free. | A: สัปดาห์นี้คุณว่างเมื่อไหร่ / B: บ่ายวันพฤหัสบดีดีไหม
A: Sorry, I can't hear you. / B: ___ | I'll call you back. | I can't see you.; Yes, you hear me.; Hear is good. | A: ขอโทษ ไม่ได้ยินเลย / B: เดี๋ยวโทรกลับนะ
A: Can we change the meeting to Monday? / B: ___ | Sure, Monday is fine for me. | Change is good money.; I met him on Monday.; No, it's a meeting. | A: เลื่อนประชุมเป็นวันจันทร์ได้ไหม / B: ได้ วันจันทร์สะดวกครับ
---
A: You have the wrong number. / B: ___ | Oh, I'm sorry to bother you. | Thank you, it's my number.; Yes, number one.; It's not wrong. | A: โทรผิดเบอร์แล้วครับ / B: ขอโทษที่รบกวนครับ
A: Who's calling, please? / B: ___ | This is Nut from the police station. | I'm calling you.; Please call me.; Yes, I'm calling. | A: ใครโทรมาครับ / B: นัทจากสถานีตำรวจครับ
A: Could you spell your name? / B: ___ | Sure. N-U-T. | My name is long.; I can't spell well, bye.; It's a nice name. | A: ช่วยสะกดชื่อหน่อยได้ไหม / B: ได้ครับ N-U-T
A: I'll be there in ten minutes. / B: ___ | OK, see you soon. | Ten minutes ago.; I'm not there.; There is ten. | A: อีกสิบนาทีถึง / B: โอเค แล้วเจอกัน
A: Thank you for calling. / B: ___ | You're welcome. Goodbye. | Yes, call me.; Calling is free.; I'm sorry to hear that. | A: ขอบคุณที่โทรมา / B: ยินดีครับ สวัสดีครับ
`);
R(1, 'เรื่องสั้นง่ายๆ', 'At the Market', `Every Saturday, Nida goes to the market with her mother. They buy vegetables, fruit, and fish. Nida likes mangoes very much. The market is very busy in the morning, so they go early. After shopping, they eat noodles at a small shop. Then they take a taxi home because the bags are heavy.`,
`ทุกวันเสาร์ นิดาไปตลาดกับแม่ พวกเขาซื้อผัก ผลไม้ และปลา นิดาชอบมะม่วงมาก ตลาดคนเยอะมากตอนเช้า พวกเขาจึงไปแต่เช้า หลังซื้อของ พวกเขากินก๋วยเตี๋ยวที่ร้านเล็กๆ แล้วนั่งแท็กซี่กลับบ้านเพราะถุงหนัก`, `
When does Nida go to the market? | Every Saturday | Every day; Every Sunday; On Monday
What fruit does Nida like? | Mangoes | Bananas; Apples; Oranges
Why do they go early? | The market is busy in the morning. | The market closes at 7.; They want to sleep later.; Nida goes to school.
How do they go home? | By taxi | On foot; By bus; By motorbike
`);
R(2, 'ข่าวและประกาศ', 'Lost and Found', `Found: a black wallet near the bus stop on Silom Road on Tuesday evening. It has an ID card, two bank cards, and some cash. The owner can collect it at Bang Rak Police Station from 8 a.m. to 8 p.m. Please bring another document to prove your identity.`,
`พบกระเป๋าเงินสีดำใกล้ป้ายรถเมล์ถนนสีลมเมื่อเย็นวันอังคาร ข้างในมีบัตรประชาชน บัตรธนาคารสองใบ และเงินสดจำนวนหนึ่ง เจ้าของมารับได้ที่สถานีตำรวจบางรักตั้งแต่ 8 โมงเช้าถึง 2 ทุ่ม กรุณานำเอกสารอื่นมาเพื่อยืนยันตัวตน`, `
Where was the wallet found? | Near a bus stop | In a taxi; At a hospital; In the police station
What color is the wallet? | Black | Brown; Red; White
Where can the owner get it? | Bang Rak Police Station | Silom bus stop; The bank; Any police station
What must the owner bring? | Another document to prove identity | Some cash; Two bank cards; A photo of the wallet
`);
R(3, 'งานตำรวจ', 'Songkran Safety', `During the Songkran holiday, many people travel home and road accidents increase. This year, police set up more than 2,000 checkpoints across the country. Officers checked drivers for alcohol and made sure motorcyclists wore helmets. The police also asked people not to drive when they are tired. As a result, the number of accidents was lower than last year.`,
`ช่วงวันหยุดสงกรานต์ ผู้คนจำนวนมากเดินทางกลับบ้านและอุบัติเหตุบนท้องถนนเพิ่มขึ้น ปีนี้ตำรวจตั้งด่านตรวจมากกว่า 2,000 จุดทั่วประเทศ เจ้าหน้าที่ตรวจแอลกอฮอล์ผู้ขับขี่และดูว่าผู้ขับขี่มอเตอร์ไซค์สวมหมวกกันน็อก ตำรวจยังขอให้ประชาชนไม่ขับรถตอนเหนื่อย ผลคือจำนวนอุบัติเหตุลดลงจากปีที่แล้ว`, `
Why do accidents increase during Songkran? | Many people travel home. | The roads are new.; It rains a lot.; There are no police.
How many checkpoints did police set up? | More than 2,000 | About 200; Exactly 1,000; Less than 2,000
What did officers check? | Alcohol and helmets | Passports and tickets; Phones and bags; Car colors
What was the result? | Fewer accidents than last year | More accidents than last year; No checkpoints; More tired drivers
`);
R(4, 'บทความ', 'Why Police Need English', `Thailand welcomes millions of foreign tourists every year. When tourists lose their passports, get into accidents, or become victims of crime, they often need help from the police. Officers who can speak English can understand the problem quickly and give clear instructions. This builds trust and improves the country's image. For this reason, English skills are now an important part of police training and recruitment.`,
`ประเทศไทยต้อนรับนักท่องเที่ยวต่างชาติหลายล้านคนทุกปี เมื่อนักท่องเที่ยวทำหนังสือเดินทางหาย ประสบอุบัติเหตุ หรือตกเป็นเหยื่ออาชญากรรม มักต้องการความช่วยเหลือจากตำรวจ เจ้าหน้าที่ที่พูดภาษาอังกฤษได้จะเข้าใจปัญหาได้เร็วและให้คำแนะนำที่ชัดเจน ซึ่งสร้างความไว้วางใจและภาพลักษณ์ที่ดีให้ประเทศ ด้วยเหตุนี้ ทักษะภาษาอังกฤษจึงเป็นส่วนสำคัญของการฝึกอบรมและการรับสมัครตำรวจ`, `
Who often needs help from the police? | Foreign tourists | Police trainers; Thai students only; Airline staff
What can English-speaking officers do? | Understand problems quickly | Travel abroad for free; Avoid all crimes; Stop tourists from coming
What does the word "image" mean here? | how people see the country | a photo; a passport; a camera
What is the main idea? | English is important for Thai police. | Tourists should learn Thai.; Thailand has many accidents.; Police should travel more.
`);

// ===== เพิ่มเติม (ชุดที่ 4) =====
U('police', 2, 'ป้ายและประกาศ', `
no entry | ห้ามเข้า | The sign says no entry. | ป้ายเขียนว่าห้ามเข้า
keep out | ห้ามเข้าใกล้ | Danger! Keep out. | อันตราย! ห้ามเข้าใกล้
no parking | ห้ามจอด | You can't park here. It says no parking. | จอดที่นี่ไม่ได้ ป้ายเขียนว่าห้ามจอด
one way | เดินรถทางเดียว | This is a one way street. | ถนนนี้เดินรถทางเดียว
exit | ทางออก | Where is the exit? | ทางออกอยู่ที่ไหน
caution | ระวัง | Caution: wet floor. | ระวัง พื้นเปียก
---
speed limit | จำกัดความเร็ว | The speed limit is 80. | จำกัดความเร็ว 80
pedestrian | คนเดินเท้า | Stop for pedestrians. | หยุดให้คนเดินเท้า
crosswalk | ทางม้าลาย | Cross at the crosswalk. | ข้ามที่ทางม้าลาย
staff only | เฉพาะเจ้าหน้าที่ | This room is for staff only. | ห้องนี้เฉพาะเจ้าหน้าที่
out of order | ใช้การไม่ได้ | The elevator is out of order. | ลิฟต์ใช้การไม่ได้
fire exit | ทางหนีไฟ | Use the fire exit. | ใช้ทางหนีไฟ
`);
U('police', 3, 'ภัยพิบัติและการกู้ภัย', `
earthquake | แผ่นดินไหว | The earthquake damaged many houses. | แผ่นดินไหวทำให้บ้านหลายหลังเสียหาย
landslide | ดินถล่ม | The landslide blocked the road. | ดินถล่มปิดทางถนน
evacuate | อพยพ | Please evacuate the building. | กรุณาอพยพออกจากอาคาร
shelter | ที่พักพิง | They stayed in a shelter. | พวกเขาพักที่ศูนย์พักพิง
survivor | ผู้รอดชีวิต | They found two survivors. | พวกเขาพบผู้รอดชีวิตสองคน
damage | ความเสียหาย | The storm caused heavy damage. | พายุสร้างความเสียหายหนัก
---
disaster | ภัยพิบัติ | The flood was a disaster. | น้ำท่วมครั้งนั้นเป็นภัยพิบัติ
warning | คำเตือน | They gave a storm warning. | พวกเขาประกาศเตือนพายุ
victim | ผู้ประสบภัย | The victims need food and water. | ผู้ประสบภัยต้องการอาหารและน้ำ
supplies | สิ่งของจำเป็น | Send supplies to the village. | ส่งของจำเป็นไปที่หมู่บ้าน
volunteer | อาสาสมัคร | Many volunteers came to help. | อาสาสมัครหลายคนมาช่วย
safe zone | พื้นที่ปลอดภัย | Go to the safe zone. | ไปที่พื้นที่ปลอดภัย
`);
U('police', 4, 'คำพ้องความหมายออกสอบ', `
large | ใหญ่ (= big) | It is a large building. | เป็นอาคารขนาดใหญ่
begin | เริ่ม (= start) | The class begins at nine. | ชั้นเรียนเริ่มเก้าโมง
quick | เร็ว (= fast) | He made a quick decision. | เขาตัดสินใจอย่างรวดเร็ว
assist | ช่วยเหลือ (= help) | Officers assist the public. | เจ้าหน้าที่ช่วยเหลือประชาชน
purchase | ซื้อ (= buy) | He purchased a new car. | เขาซื้อรถใหม่
observe | สังเกต (= watch) | Observe the suspect carefully. | สังเกตผู้ต้องสงสัยอย่างละเอียด
---
difficult | ยาก (= hard) | The test was difficult. | ข้อสอบยาก
huge | ใหญ่มาก (= very big) | There was a huge crowd. | มีฝูงชนจำนวนมาก
silent | เงียบ (= quiet) | Please be silent. | กรุณาเงียบ
correct | ถูกต้อง (= right) | Your answer is correct. | คำตอบของคุณถูกต้อง
finish | เสร็จ (= end) | Finish your report today. | ทำรายงานให้เสร็จวันนี้
attempt | พยายาม (= try) | He attempted to escape. | เขาพยายามหลบหนี
`);
U('daily', 1, 'อาชีพ', `
teacher | ครู | My mother is a teacher. | แม่ของฉันเป็นครู
doctor | หมอ | The doctor is busy. | หมอยุ่งอยู่
nurse | พยาบาล | The nurse is very kind. | พยาบาลใจดีมาก
farmer | ชาวนา/เกษตรกร | My father is a farmer. | พ่อของฉันเป็นเกษตรกร
soldier | ทหาร | He wants to be a soldier. | เขาอยากเป็นทหาร
driver | คนขับรถ | The bus driver is careful. | คนขับรถเมล์ขับอย่างระวัง
---
engineer | วิศวกร | She is an engineer. | เธอเป็นวิศวกร
cook | พ่อครัว/แม่ครัว | He is a good cook. | เขาทำอาหารเก่ง
student | นักเรียน/นักศึกษา | I am a student. | ฉันเป็นนักเรียน
worker | คนงาน | The workers are building a road. | คนงานกำลังสร้างถนน
seller | คนขาย | The seller is friendly. | คนขายเป็นมิตร
firefighter | นักดับเพลิง | The firefighters saved the family. | นักดับเพลิงช่วยครอบครัวนั้นไว้
`);
U('daily', 3, 'Phrasal verbs ที่ใช้บ่อย', `
get up | ลุกขึ้น/ตื่นนอน | I get up at six. | ฉันตื่นนอนตอนหกโมง
turn on | เปิด (ไฟ/เครื่อง) | Turn on the light. | เปิดไฟ
turn off | ปิด (ไฟ/เครื่อง) | Turn off your phone. | ปิดโทรศัพท์
look for | มองหา | I'm looking for my keys. | ฉันกำลังหากุญแจ
pick up | หยิบ/ไปรับ | I'll pick you up at five. | ฉันจะไปรับคุณตอนห้าโมง
give up | ยอมแพ้/เลิก | Don't give up. | อย่ายอมแพ้
---
find out | ค้นพบ/สืบรู้ | The police found out the truth. | ตำรวจรู้ความจริงแล้ว
look after | ดูแล | She looks after her mother. | เธอดูแลแม่
put on | สวมใส่ | Put on your helmet. | สวมหมวกกันน็อก
take off | ถอด/เครื่องขึ้น | Take off your shoes. | ถอดรองเท้า
run away | วิ่งหนี | The thief ran away. | ขโมยวิ่งหนีไป
fill in | กรอก (แบบฟอร์ม) | Fill in your name here. | กรอกชื่อตรงนี้
`);
U('daily', 4, 'สำนวนที่ใช้บ่อย', `
take care | ดูแลตัวเองนะ | Take care and see you soon. | ดูแลตัวเองนะ แล้วเจอกัน
good luck | ขอให้โชคดี | Good luck with your exam. | ขอให้สอบโชคดี
never mind | ไม่เป็นไร | Never mind, it's not important. | ไม่เป็นไร ไม่สำคัญ
it depends | แล้วแต่ | It depends on the weather. | แล้วแต่สภาพอากาศ
by the way | อีกอย่างหนึ่ง | By the way, where do you live? | ว่าแต่ คุณอยู่ที่ไหน
in a hurry | รีบ | Sorry, I'm in a hurry. | ขอโทษ ฉันรีบอยู่
---
on duty | ปฏิบัติหน้าที่อยู่ | He is on duty tonight. | คืนนี้เขาเข้าเวร
off duty | นอกเวลางาน | She is off duty today. | วันนี้เธอไม่ได้เข้าเวร
as soon as possible | เร็วที่สุดเท่าที่ทำได้ | Call me as soon as possible. | โทรหาฉันเร็วที่สุด
for example | ตัวอย่างเช่น | I like fruit, for example mangoes. | ฉันชอบผลไม้ เช่น มะม่วง
make sure | ตรวจให้แน่ใจ | Make sure the door is locked. | ตรวจให้แน่ใจว่าประตูล็อกแล้ว
keep calm | ใจเย็นไว้ | Keep calm and wait. | ใจเย็นไว้แล้วรอ
`);
U('talk', 1, 'แนะนำตัว', `
introduce | แนะนำ | Let me introduce myself. | ขอแนะนำตัวเอง
born | เกิด | I was born in Khon Kaen. | ฉันเกิดที่ขอนแก่น
live | อาศัยอยู่ | I live in Bangkok. | ฉันอาศัยอยู่ในกรุงเทพฯ
hobby | งานอดิเรก | My hobby is running. | งานอดิเรกของฉันคือการวิ่ง
graduate | จบการศึกษา | I graduated from Chiang Mai University. | ฉันจบจากมหาวิทยาลัยเชียงใหม่
age | อายุ | What is your age? | คุณอายุเท่าไหร่
---
married | แต่งงานแล้ว | Are you married? | คุณแต่งงานแล้วหรือยัง
single | โสด | I'm single. | ฉันโสด
hometown | บ้านเกิด | My hometown is in the north. | บ้านเกิดของฉันอยู่ภาคเหนือ
favorite | ที่ชอบที่สุด | My favorite food is som tam. | อาหารที่ชอบที่สุดคือส้มตำ
dream | ความฝัน | My dream is to be a police officer. | ความฝันของฉันคือการเป็นตำรวจ
free time | เวลาว่าง | I read in my free time. | ฉันอ่านหนังสือเวลาว่าง
`);
U('talk', 3, 'แนะนำและเตือน', `
advise | แนะนำ | I advise you to rest. | ฉันแนะนำให้คุณพักผ่อน
had better | ควรจะ (ไม่งั้นแย่) | You had better leave now. | คุณควรออกไปเดี๋ยวนี้
careful | ระมัดระวัง | Be careful on the road. | ระวังบนถนนด้วย
watch out | ระวัง! | Watch out! A car is coming. | ระวัง! มีรถมา
don't forget | อย่าลืม | Don't forget your ID card. | อย่าลืมบัตรประชาชน
instead | แทน | Take the bus instead. | นั่งรถเมล์แทน
---
recommend | แนะนำ | I recommend this hotel. | ฉันแนะนำโรงแรมนี้
risk | ความเสี่ยง | It's a big risk. | มันเสี่ยงมาก
avoid | หลีกเลี่ยง | Avoid going out at night. | หลีกเลี่ยงการออกไปข้างนอกตอนกลางคืน
important | สำคัญ | It's important to sleep well. | การนอนหลับให้ดีเป็นสิ่งสำคัญ
better | ดีกว่า | It's better to ask. | ถามดีกว่า
remember | จำ/อย่าลืม | Remember to lock the door. | อย่าลืมล็อกประตู
`);
G(1, 'Wh-questions', 'What อะไร · Where ที่ไหน · When เมื่อไหร่ · Who ใคร · Why ทำไม · How อย่างไร', `
___ is your name? | What | Where, Who, How | ถามชื่อใช้ What | คุณชื่ออะไร
___ do you live? | Where | What, When, Who | ถามสถานที่ใช้ Where | คุณอาศัยอยู่ที่ไหน
___ is the exam? | When | Who, Where, Why | ถามเวลาใช้ When | สอบเมื่อไหร่
___ is that man? | Who | What, Which, Whose | ถามบุคคลใช้ Who | ผู้ชายคนนั้นคือใคร
___ were you late? | Why | How, What, Who | ถามเหตุผลใช้ Why | ทำไมคุณมาสาย
___ do you go to work? | How | What, Who, Whose | ถามวิธีใช้ How | คุณไปทำงานอย่างไร
`);
G(2, 'Prepositions of movement', 'into เข้าไปใน · out of ออกจาก · across ข้าม · through ผ่าน (ทะลุ) · along ไปตาม · toward ไปทาง', `
The thief ran ___ the house. | out of | out, off of, outside to | ออกจากใช้ out of | ขโมยวิ่งออกจากบ้าน
Walk ___ the road carefully. | across | through, into, among | ข้ามถนนใช้ across | ข้ามถนนอย่างระมัดระวัง
The train went ___ the tunnel. | through | across, on, over to | ผ่านอุโมงค์ใช้ through | รถไฟวิ่งผ่านอุโมงค์
He jumped ___ the pool. | into | in to, inside of, onto of | เข้าไปในใช้ into | เขากระโดดลงสระ
We walked ___ the river. | along | among, between, into | ไปตามแนวใช้ along | เราเดินเลียบแม่น้ำ
The car drove ___ the station. | toward | into of, between, among | มุ่งไปทางใช้ toward | รถขับไปทางสถานี
`);
G(3, 'Subject-verb agreement', 'ประธานเอกพจน์ + กริยาเอกพจน์ · Everyone / Each / Nobody = เอกพจน์ · A and B = พหูพจน์', `
Everyone ___ here. | is | are, were, be | Everyone เป็นเอกพจน์ | ทุกคนอยู่ที่นี่
Tom and Jerry ___ friends. | are | is, was, be | A and B เป็นพหูพจน์ | ทอมกับเจอร์รี่เป็นเพื่อนกัน
Each of the students ___ a book. | has | have, having, are | Each = เอกพจน์ | นักเรียนแต่ละคนมีหนังสือ
The news ___ good. | is | are, were, have | news นับไม่ได้ ใช้เอกพจน์ | ข่าวนี้ดี
One of my friends ___ a police officer. | is | are, were, be | One of ... = เอกพจน์ | เพื่อนคนหนึ่งของฉันเป็นตำรวจ
The police ___ looking for the man. | are | is, was, has | police ใช้กริยาพหูพจน์ | ตำรวจกำลังตามหาชายคนนั้น
`);
G(4, 'If type 3 & wish', 'If + had V3, would have + V3 = สมมติอดีตที่ไม่เกิดจริง · wish + V2 (ปัจจุบัน) / had V3 (อดีต)', `
If I had studied, I ___ passed. | would have | will have, would, had | If + had V3 → would have V3 | ถ้าฉันตั้งใจเรียน ฉันคงสอบผ่านไปแล้ว
If he ___ earlier, he wouldn't have missed the bus. | had left | left, has left, would leave | If + had V3 | ถ้าเขาออกเร็วกว่านี้ เขาคงไม่พลาดรถเมล์
I wish I ___ rich. | were | am, will be, be | wish + were (ปัจจุบันที่ไม่จริง) | ฉันอยากรวยจัง
She wishes she ___ English well. | spoke | speaks, speak, will speak | wish + V2 | เธออยากพูดภาษาอังกฤษเก่ง
I wish I ___ that. | hadn't said | didn't say, don't say, won't say | เสียดายอดีตใช้ had V3 | ฉันไม่น่าพูดแบบนั้นเลย
If it had not rained, we ___ gone out. | would have | will have, had, would | would have + V3 | ถ้าฝนไม่ตก เราคงออกไปข้างนอกแล้ว
`);
G(4, 'Modal + have V3', 'should have V3 = ควรจะทำ (แต่ไม่ได้ทำ) · must have V3 = คงจะ (มั่นใจ) · might have V3 = อาจจะ', `
You ___ told me earlier. | should have | should, must, can | ควรทำแต่ไม่ได้ทำ | คุณน่าจะบอกฉันก่อนหน้านี้
The ground is wet. It ___ rained. | must have | should have, can, will | มั่นใจเรื่องอดีต | พื้นเปียก ฝนคงตกมา
He isn't here. He ___ gone home. | might have | should, must, will | อาจจะ (ไม่แน่ใจ) | เขาไม่อยู่ เขาอาจกลับบ้านไปแล้ว
I should have ___ harder. | studied | study, studying, studies | modal + have + V3 | ฉันน่าจะตั้งใจเรียนให้มากกว่านี้
She must have ___ her keys. | lost | lose, losing, loses | must have + V3 | เธอคงทำกุญแจหาย
You shouldn't have ___ so fast. | driven | drive, drove, driving | drive → driven | คุณไม่ควรขับเร็วขนาดนั้น
`);
D(2, 'ช่วยเหลือนักท่องเที่ยว', `
A: I lost my passport. What should I do? / B: ___ | You should report it to the police and contact your embassy. | You should buy a new bag.; Passports are very cheap.; Please enjoy your trip. | A: ฉันทำหนังสือเดินทางหาย ควรทำอย่างไร / B: คุณควรแจ้งตำรวจและติดต่อสถานทูต
A: Where is the nearest police station? / B: ___ | It's about 200 meters down this road. | It's very new.; Yes, it's a police station.; I'm a tourist too. | A: สถานีตำรวจที่ใกล้ที่สุดอยู่ไหน / B: ไปตามถนนนี้ประมาณ 200 เมตร
A: A taxi driver charged me too much. / B: ___ | Do you remember the taxi number? | Taxis are yellow.; You should pay more.; I like taxis. | A: คนขับแท็กซี่เก็บเงินเกิน / B: คุณจำทะเบียนแท็กซี่ได้ไหม
A: Is it safe to walk here at night? / B: ___ | Yes, but stay on the main road. | No, I walk every day.; It's a nice night.; Yes, it's very dark. | A: เดินแถวนี้ตอนกลางคืนปลอดภัยไหม / B: ปลอดภัย แต่เดินบนถนนใหญ่นะ
A: Can you call a doctor? My friend is sick. / B: ___ | Of course. I'll call an ambulance now. | Your friend is very nice.; I'm not a doctor, bye.; Sick is not good food. | A: ช่วยเรียกหมอได้ไหม เพื่อนไม่สบาย / B: ได้เลย จะเรียกรถพยาบาลเดี๋ยวนี้
---
A: Someone took my bag at the beach. / B: ___ | When did it happen? | The beach is beautiful.; Take another bag.; I like the sea. | A: มีคนเอากระเป๋าฉันไปที่ชายหาด / B: เกิดเหตุเมื่อไหร่
A: Do you speak English? / B: ___ | Yes, a little. How can I help? | Yes, I'm from England.; No, I'm English.; English is a country. | A: คุณพูดภาษาอังกฤษได้ไหม / B: ได้นิดหน่อย มีอะไรให้ช่วยไหม
A: How do I get to the Grand Palace? / B: ___ | You can take a boat or a taxi. | It's a very grand palace.; The king lives there.; I got there last year. | A: ไปวัดพระแก้ว/พระบรมมหาราชวังยังไง / B: นั่งเรือหรือแท็กซี่ไปได้
A: Thank you so much for your help, officer. / B: ___ | My pleasure. Enjoy your stay in Thailand. | Yes, I'm an officer.; Please help me too.; No, thank you. | A: ขอบคุณมากที่ช่วยครับคุณตำรวจ / B: ยินดีครับ ขอให้เที่ยวเมืองไทยให้สนุก
A: Can I see your ID, please? / B: ___ | Here's my passport. | I can see you.; My ID is beautiful.; No, I can't see. | A: ขอดูบัตรประจำตัวหน่อย / B: นี่หนังสือเดินทางของผมครับ
`);
D(3, 'เหตุฉุกเฉิน', `
A: Help! There's a fire in my building! / B: ___ | Stay calm. What's the address? | That's a nice building.; Fire is very hot.; Please call me tomorrow. | A: ช่วยด้วย! ไฟไหม้ตึก! / B: ใจเย็นๆ ที่อยู่คืออะไร
A: Is anyone still inside? / B: ___ | Yes, an old woman is on the third floor. | Yes, I'm outside.; Inside is warm.; No, I don't know inside. | A: ยังมีคนอยู่ข้างในไหม / B: มี คุณยายอยู่ชั้นสาม
A: My son is missing. / B: ___ | What was he wearing when you last saw him? | He is a good son.; Don't worry, he is missing.; I miss him too. | A: ลูกชายฉันหายไป / B: ตอนที่เห็นครั้งสุดท้ายเขาใส่ชุดอะไร
A: There's been a car accident. / B: ___ | Where exactly are you? | Cars are expensive.; I had an accident too.; Accidents are fun. | A: เกิดอุบัติเหตุรถชน / B: คุณอยู่ตรงไหนแน่
A: Someone is breaking into my house! / B: ___ | Lock yourself in a room. Police are on the way. | Please open the door for him.; Your house is big.; Call me next week. | A: มีคนกำลังงัดบ้านฉัน! / B: ล็อกตัวเองในห้อง ตำรวจกำลังไป
---
A: He's not breathing! / B: ___ | Start CPR now. The ambulance is coming. | Please wait until tomorrow.; He's very tired.; Breathing is easy. | A: เขาไม่หายใจ! / B: ทำ CPR เดี๋ยวนี้ รถพยาบาลกำลังมา
A: How many people are injured? / B: ___ | Three people, one seriously. | Three cars.; Many times.; At three o'clock. | A: มีคนบาดเจ็บกี่คน / B: สามคน สาหัสหนึ่งคน
A: Can you describe the car? / B: ___ | It was a white pickup truck. | It drove very fast, bye.; I like cars.; It was yesterday. | A: บรรยายลักษณะรถได้ไหม / B: เป็นรถกระบะสีขาว
A: Which way did he go? / B: ___ | He ran toward the market. | He went yesterday.; He is a good runner.; By the way. | A: เขาไปทางไหน / B: เขาวิ่งไปทางตลาด
A: Please stay on the line. / B: ___ | OK, I'm still here. | Line is long.; I'm standing in line.; No, I'm busy. | A: กรุณาถือสายรอ / B: ได้ ยังอยู่ในสาย
`);
R(1, 'เรื่องสั้นง่ายๆ', 'A New Friend', `Tom is from England. He is visiting Thailand for two weeks. On his first day, he got lost in Bangkok. A young police officer helped him find his hotel. The officer spoke English well. They talked about football and Thai food. Now they are friends, and they send messages every week.`,
`ทอมมาจากอังกฤษ เขามาเที่ยวประเทศไทยสองสัปดาห์ วันแรกเขาหลงทางในกรุงเทพฯ ตำรวจหนุ่มคนหนึ่งช่วยพาเขาไปโรงแรม ตำรวจคนนั้นพูดภาษาอังกฤษเก่ง พวกเขาคุยกันเรื่องฟุตบอลและอาหารไทย ตอนนี้พวกเขาเป็นเพื่อนกันและส่งข้อความหากันทุกสัปดาห์`, `
Where is Tom from? | England | America; Japan; Thailand
How long is Tom staying in Thailand? | Two weeks | Two days; Two months; One week
Who helped Tom? | A police officer | A taxi driver; A teacher; A hotel worker
What did they talk about? | Football and Thai food | Cars and money; Music and movies; Work and school
`);
R(2, 'ข่าวและประกาศ', 'Job Notice', `The Royal Thai Police is accepting applications for new officers. Applicants must be Thai citizens, aged 18 to 27, and have finished high school. They must also pass a written test, a fitness test, and an interview. Applications are open online from 1 to 30 June. Results will be announced in September.`,
`สำนักงานตำรวจแห่งชาติเปิดรับสมัครเจ้าหน้าที่ตำรวจใหม่ ผู้สมัครต้องมีสัญชาติไทย อายุ 18 ถึง 27 ปี และจบมัธยมปลาย ต้องผ่านการสอบข้อเขียน การทดสอบสมรรถภาพ และการสัมภาษณ์ เปิดรับสมัครออนไลน์ตั้งแต่ 1 ถึง 30 มิถุนายน ประกาศผลในเดือนกันยายน`, `
What is this notice about? | Applying to be a police officer | Buying a police car; A new police station; A football match
What age can apply? | 18 to 27 | 15 to 20; 20 to 35; Over 30
Which is NOT a test? | A swimming test | A written test; A fitness test; An interview
When will results be announced? | In September | In June; On 30 June; Next year
`);
R(3, 'งานตำรวจ', 'Drunk Driving', `Drunk driving is one of the main causes of road deaths in Thailand. Alcohol makes drivers slow to react and causes poor judgment. The legal limit for most drivers is 50 milligrams of alcohol per 100 milliliters of blood. Drivers who break the law can be fined, lose their license, or even go to prison. Police say the safest choice is simple: if you drink, don't drive.`,
`การเมาแล้วขับเป็นสาเหตุหลักอย่างหนึ่งของการเสียชีวิตบนท้องถนนในประเทศไทย แอลกอฮอล์ทำให้ผู้ขับขี่ตอบสนองช้าและตัดสินใจผิดพลาด เกณฑ์ตามกฎหมายสำหรับผู้ขับขี่ส่วนใหญ่คือ 50 มิลลิกรัมต่อเลือด 100 มิลลิลิตร ผู้ฝ่าฝืนอาจถูกปรับ ถูกยึดใบขับขี่ หรือถึงขั้นจำคุก ตำรวจบอกว่าทางเลือกที่ปลอดภัยที่สุดคือ ถ้าดื่มอย่าขับ`, `
What does alcohol do to drivers? | Makes them slow to react | Makes them drive better; Makes them sleep less; Helps them see at night
What is the legal limit for most drivers? | 50 mg per 100 ml of blood | 100 mg per 50 ml; 5 mg per 100 ml; There is no limit
Which is NOT a punishment mentioned? | Doing community service | A fine; Losing the license; Prison
What is the police's advice? | If you drink, don't drive. | Drive slowly after drinking.; Drink only at night.; Take a taxi to work.
`);
R(4, 'บทความ', 'Teamwork in Policing', `Police work is rarely done alone. Solving a case often requires officers, detectives, forensic experts, and members of the public to work together. Good communication is essential: if information is not shared, important clues may be missed. Leaders play a key role by giving clear orders and supporting their team. Studies show that teams with strong trust and cooperation solve more cases and make fewer mistakes.`,
`งานตำรวจแทบไม่เคยทำคนเดียว การคลี่คลายคดีมักต้องอาศัยเจ้าหน้าที่ นักสืบ ผู้เชี่ยวชาญด้านนิติวิทยาศาสตร์ และประชาชนร่วมมือกัน การสื่อสารที่ดีจึงจำเป็นมาก ถ้าไม่แบ่งปันข้อมูล เบาะแสสำคัญอาจตกหล่น ผู้นำมีบทบาทสำคัญด้วยการสั่งการที่ชัดเจนและสนับสนุนทีม งานวิจัยพบว่าทีมที่ไว้ใจและร่วมมือกันดีจะคลี่คลายคดีได้มากกว่าและผิดพลาดน้อยกว่า`, `
What is the main idea? | Police work needs teamwork. | Police should work alone.; Forensic experts are the most important.; Leaders don't need teams.
What may happen if information is not shared? | Important clues may be missed. | Cases are solved faster.; Leaders give clearer orders.; The public helps more.
The word "essential" means | very important | not necessary; very cheap; dangerous
According to studies, strong teams | solve more cases and make fewer mistakes | work fewer hours; need no leaders; make more mistakes
`);

// ===== Lv.0 เริ่มจากศูนย์ =====
U('basic', 0, 'ตัวเลข 1–12', `
one | หนึ่ง | I have one brother. | ฉันมีพี่น้องผู้ชายหนึ่งคน
two | สอง | I have two cats. | ฉันมีแมวสองตัว
three | สาม | She has three bags. | เธอมีกระเป๋าสามใบ
four | สี่ | A car has four wheels. | รถมีสี่ล้อ
five | ห้า | I work five days a week. | ฉันทำงานสัปดาห์ละห้าวัน
six | หก | I wake up at six. | ฉันตื่นตอนหกโมง
---
seven | เจ็ด | A week has seven days. | หนึ่งสัปดาห์มีเจ็ดวัน
eight | แปด | The shop opens at eight. | ร้านเปิดแปดโมง
nine | เก้า | The meeting is at nine. | ประชุมเก้าโมง
ten | สิบ | I have ten fingers. | ฉันมีนิ้วสิบนิ้ว
eleven | สิบเอ็ด | The bus number is eleven. | รถเมล์สายสิบเอ็ด
twelve | สิบสอง | A year has twelve months. | หนึ่งปีมีสิบสองเดือน
`);
U('basic', 0, 'ตัวเลขหลักสิบ', `
thirteen | สิบสาม | He is thirteen years old. | เขาอายุสิบสามปี
fifteen | สิบห้า | Wait fifteen minutes. | รอสิบห้านาที
twenty | ยี่สิบ | I am twenty years old. | ฉันอายุยี่สิบปี
thirty | สามสิบ | It costs thirty baht. | ราคาสามสิบบาท
fifty | ห้าสิบ | The speed limit is fifty. | จำกัดความเร็วห้าสิบ
zero | ศูนย์ | My number starts with zero. | เบอร์ของฉันขึ้นต้นด้วยศูนย์
`);
U('basic', 0, 'วันและเดือน', `
Monday | วันจันทร์ | I work on Monday. | ฉันทำงานวันจันทร์
Tuesday | วันอังคาร | See you on Tuesday. | เจอกันวันอังคาร
Wednesday | วันพุธ | The test is on Wednesday. | สอบวันพุธ
Thursday | วันพฤหัสบดี | Thursday is a busy day. | วันพฤหัสบดีเป็นวันที่ยุ่ง
Friday | วันศุกร์ | I love Friday. | ฉันชอบวันศุกร์
Saturday | วันเสาร์ | We go to the market on Saturday. | เราไปตลาดวันเสาร์
---
Sunday | วันอาทิตย์ | I rest on Sunday. | ฉันพักผ่อนวันอาทิตย์
weekend | วันหยุดสุดสัปดาห์ | Have a nice weekend. | ขอให้มีความสุขในวันหยุด
month | เดือน | I go home every month. | ฉันกลับบ้านทุกเดือน
year | ปี | This year I will pass the exam. | ปีนี้ฉันจะสอบผ่าน
birthday | วันเกิด | Happy birthday! | สุขสันต์วันเกิด
date | วันที่ | What is the date today? | วันนี้วันที่เท่าไหร่
---
January | มกราคม | The new year starts in January. | ปีใหม่เริ่มเดือนมกราคม
April | เมษายน | Songkran is in April. | สงกรานต์อยู่ในเดือนเมษายน
June | มิถุนายน | It rains a lot in June. | เดือนมิถุนายนฝนตกเยอะ
August | สิงหาคม | Mother's Day is in August. | วันแม่อยู่ในเดือนสิงหาคม
October | ตุลาคม | The exam is in October. | สอบเดือนตุลาคม
December | ธันวาคม | December is cool. | เดือนธันวาคมอากาศเย็น
`);
U('basic', 0, 'คำง่ายๆ ที่ใช้ทุกวัน', `
hi | หวัดดี | Hi, how are you? | หวัดดี เป็นยังไงบ้าง
bye | บาย/ลาก่อน | Bye, see you tomorrow. | บาย เจอกันพรุ่งนี้
yes | ใช่/ครับ/ค่ะ | Yes, I am. | ใช่ ฉันเป็น
no | ไม่ | No, thank you. | ไม่ ขอบคุณ
OK | โอเค/ตกลง | OK, let's go. | โอเค ไปกันเถอะ
see you | แล้วเจอกัน | See you later. | แล้วเจอกันนะ
---
man | ผู้ชาย | The man is tall. | ผู้ชายคนนั้นตัวสูง
woman | ผู้หญิง | The woman is a nurse. | ผู้หญิงคนนั้นเป็นพยาบาล
boy | เด็กผู้ชาย | The boy is playing. | เด็กผู้ชายกำลังเล่น
girl | เด็กผู้หญิง | The girl is reading. | เด็กผู้หญิงกำลังอ่านหนังสือ
baby | ทารก | The baby is sleeping. | ทารกกำลังหลับ
people | ผู้คน | Many people are here. | มีผู้คนมากมายอยู่ที่นี่
`);
U('basic', 0, 'สิ่งของและกริยาง่ายๆ', `
pen | ปากกา | Can I use your pen? | ขอใช้ปากกาหน่อย
book | หนังสือ | I read a book. | ฉันอ่านหนังสือ
chair | เก้าอี้ | Sit on the chair. | นั่งบนเก้าอี้
cup | ถ้วย/แก้ว | A cup of coffee, please. | ขอกาแฟหนึ่งแก้ว
car | รถยนต์ | My car is red. | รถของฉันสีแดง
clock | นาฬิกา (แขวน/ตั้ง) | Look at the clock. | ดูนาฬิกาสิ
---
eat | กิน | I eat rice every day. | ฉันกินข้าวทุกวัน
drink | ดื่ม | Drink some water. | ดื่มน้ำหน่อย
sleep | นอน | I sleep at ten. | ฉันนอนสี่ทุ่ม
sit | นั่ง | Please sit down. | เชิญนั่ง
stand | ยืน | Stand up, please. | กรุณายืนขึ้น
walk | เดิน | I walk to school. | ฉันเดินไปโรงเรียน
---
read | อ่าน | I read every night. | ฉันอ่านหนังสือทุกคืน
write | เขียน | Write your name here. | เขียนชื่อตรงนี้
open | เปิด | Open the door, please. | กรุณาเปิดประตู
close | ปิด | Close the window. | ปิดหน้าต่าง
come | มา | Come here, please. | มานี่หน่อย
go | ไป | Let's go home. | กลับบ้านกันเถอะ
`);
U('basic', 0, 'คำบอกลักษณะง่ายๆ', `
big | ใหญ่ | It is a big house. | เป็นบ้านหลังใหญ่
small | เล็ก | I have a small bag. | ฉันมีกระเป๋าใบเล็ก
good | ดี | This is good. | อันนี้ดี
bad | ไม่ดี/แย่ | That is bad. | นั่นแย่
new | ใหม่ | I have a new phone. | ฉันมีโทรศัพท์ใหม่
fast | เร็ว | The car is fast. | รถคันนี้เร็ว
---
slow | ช้า | The bus is slow. | รถเมล์ช้า
long | ยาว | The road is long. | ถนนยาว
easy | ง่าย | English is easy. | ภาษาอังกฤษง่าย
hard | ยาก/แข็ง | This test is hard. | ข้อสอบนี้ยาก
beautiful | สวย | The temple is beautiful. | วัดสวยมาก
happy | มีความสุข | I am happy. | ฉันมีความสุข
`);
G(0, 'This / That / These / Those', 'this = นี่ (ใกล้, อันเดียว) · that = นั่น (ไกล, อันเดียว) · these = เหล่านี้ · those = เหล่านั้น', `
___ is my pen. (ใกล้ตัว) | This | These, Those, They | ใกล้ + อันเดียวใช้ This | นี่คือปากกาของฉัน
___ are my friends. (ใกล้ตัว) | These | This, That, It | ใกล้ + หลายคนใช้ These | เหล่านี้คือเพื่อนของฉัน
Look at ___ car over there. | that | this, these, those | ไกล + อันเดียวใช้ that | ดูรถคันนั้นทางโน้นสิ
___ books on the shelf are old. | Those | That, This, It | ไกล + หลายอันใช้ Those | หนังสือพวกนั้นบนชั้นเก่าแล้ว
Is ___ your bag? (ถืออยู่) | this | these, those, they | ใกล้ + อันเดียว | นี่กระเป๋าของคุณใช่ไหม
Are ___ your shoes? (อยู่ไกล) | those | that, this, it | ไกล + หลายอัน | นั่นรองเท้าของคุณใช่ไหม
`);
G(0, 'Have / Has', 'I / You / We / They + have · He / She / It + has', `
I ___ a car. | have | has, am, is | I ใช้ have | ฉันมีรถ
She ___ a dog. | has | have, is, are | She ใช้ has | เธอมีสุนัข
They ___ two children. | have | has, are, is | They ใช้ have | พวกเขามีลูกสองคน
He ___ a headache. | has | have, is, are | He ใช้ has | เขาปวดหัว
We ___ a test today. | have | has, are, is | We ใช้ have | วันนี้เรามีสอบ
My mother ___ long hair. | has | have, is, are | my mother = she ใช้ has | แม่ของฉันผมยาว
`);
D(0, 'คุยง่ายๆ', `
A: Hello! / B: ___ | Hi! | Bye!; Yes!; Ten! | A: สวัสดี! / B: หวัดดี!
A: What's your name? / B: ___ | My name is Nut. | I'm fine.; I'm twenty.; Yes, it is. | A: คุณชื่ออะไร / B: ฉันชื่อนัท
A: How old are you? / B: ___ | I'm twenty-five. | I'm fine, thanks.; My name is Ann.; I'm from Thailand. | A: คุณอายุเท่าไหร่ / B: ฉันอายุยี่สิบห้า
A: Where are you from? / B: ___ | I'm from Thailand. | I'm twenty.; I'm a student.; I'm happy. | A: คุณมาจากไหน / B: ฉันมาจากประเทศไทย
A: Thank you! / B: ___ | You're welcome. | Yes, please.; Hello.; I'm OK. | A: ขอบคุณ! / B: ด้วยความยินดี
`);
R(0, 'อ่านเรื่องแรก', 'This Is Ben', `This is Ben. He is twenty years old. He is from Chiang Mai. He has a small dog. Its name is Max. Ben likes rice and chicken. He gets up at six every day.`,
`นี่คือเบน เขาอายุยี่สิบปี เขามาจากเชียงใหม่ เขามีสุนัขตัวเล็กชื่อแม็กซ์ เบนชอบข้าวกับไก่ เขาตื่นนอนตอนหกโมงทุกวัน`, `
How old is Ben? | Twenty | Twelve; Two; Thirty
Where is Ben from? | Chiang Mai | Bangkok; Phuket; England
What is the dog's name? | Max | Ben; Mai; Lucky
What time does Ben get up? | At six | At seven; At five; At ten
`);
// ===== แสลงและภาษาพูด =====
U('talk', 3, 'แสลงและภาษาพูด', `
gonna | จะ (= going to) | I'm gonna call you later. | เดี๋ยวฉันจะโทรหานะ
wanna | อยาก (= want to) | Do you wanna eat? | อยากกินอะไรไหม
gotta | ต้อง (= have got to) | I gotta go now. | ฉันต้องไปแล้ว
what's up | ว่าไง/เป็นไงบ้าง | Hey, what's up? | เฮ้ ว่าไง
no worries | ไม่เป็นไร/ไม่ต้องห่วง | No worries, I can help. | ไม่ต้องห่วง ฉันช่วยได้
chill | ชิลๆ/ผ่อนคลาย | Let's just chill at home. | ชิลๆ อยู่บ้านกันเถอะ
---
my bad | ผิดเอง/ขอโทษ | Sorry, my bad. | ขอโทษ ผิดเองแหละ
hang out | ไปเที่ยวเล่น/สังสรรค์ | Let's hang out this weekend. | สุดสัปดาห์นี้ไปเที่ยวกัน
awesome | สุดยอด | That's awesome! | สุดยอดไปเลย!
kinda | ค่อนข้าง/นิดๆ | I'm kinda tired. | ฉันเหนื่อยนิดๆ
I'm down | เอาด้วย | Pizza tonight? I'm down. | คืนนี้กินพิซซ่าไหม เอาด้วย
cool | เจ๋ง/โอเค | Cool, see you there. | โอเค แล้วเจอกันที่นั่น
`);
U('talk', 4, 'แสลงและสำนวนขั้นสูง', `
piece of cake | ง่ายมาก (หมูๆ) | The test was a piece of cake. | ข้อสอบหมูมาก
no way | ไม่จริงน่า/ไม่มีทาง | No way! You passed? | ไม่จริงน่า! สอบผ่านเหรอ
broke | ถังแตก | I'm broke until payday. | ฉันถังแตกจนกว่าเงินเดือนจะออก
freak out | ตกใจ/สติแตก | Don't freak out. It's OK. | อย่าตกใจ ไม่เป็นไร
hit the road | ออกเดินทาง | Let's hit the road. | ออกเดินทางกันเถอะ
under the weather | ไม่ค่อยสบาย | I'm feeling under the weather. | วันนี้ไม่ค่อยสบาย
---
break a leg | ขอให้โชคดี (ก่อนแสดง/สอบ) | Break a leg in your interview! | ขอให้สัมภาษณ์โชคดีนะ
call it a day | พอแค่นี้ก่อน | Let's call it a day. | วันนี้พอแค่นี้ก่อน
on the same page | เข้าใจตรงกัน | Are we on the same page? | เราเข้าใจตรงกันไหม
get the hang of it | เริ่มจับทางได้ | You'll get the hang of it. | เดี๋ยวก็จับทางได้
hang in there | อดทนไว้/สู้ๆ | Hang in there. You can do it. | สู้ๆ นะ คุณทำได้
it's up to you | แล้วแต่คุณ | Coffee or tea? It's up to you. | กาแฟหรือชา แล้วแต่คุณ
`);

// ===== เพิ่มเติม (ชุดที่ 5): เติมทุกเลเวล =====
U('basic', 0, 'ร่างกาย', `
head | หัว | My head hurts. | ฉันปวดหัว
eye | ตา | She has big eyes. | เธอตาโต
ear | หู | Cover your ears. | ปิดหูไว้
nose | จมูก | My nose is red. | จมูกฉันแดง
mouth | ปาก | Open your mouth. | อ้าปาก
hand | มือ | Wash your hands. | ล้างมือ
---
foot | เท้า | My foot hurts. | เท้าฉันเจ็บ
face | ใบหน้า | Wash your face. | ล้างหน้า
teeth | ฟัน | Brush your teeth. | แปรงฟัน
back | หลัง | My back hurts. | ฉันปวดหลัง
finger | นิ้วมือ | I cut my finger. | ฉันทำนิ้วมือบาด
body | ร่างกาย | Exercise is good for your body. | การออกกำลังกายดีต่อร่างกาย
`);
U('basic', 0, 'สัตว์', `
dog | สุนัข | The dog is barking. | สุนัขกำลังเห่า
cat | แมว | The cat is sleeping. | แมวกำลังนอน
bird | นก | I see a bird. | ฉันเห็นนก
fish | ปลา | Fish live in water. | ปลาอาศัยอยู่ในน้ำ
cow | วัว | The cow gives milk. | วัวให้นม
chicken | ไก่ | We have five chickens. | เรามีไก่ห้าตัว
---
pig | หมู | The pig is fat. | หมูอ้วน
horse | ม้า | He rides a horse. | เขาขี่ม้า
elephant | ช้าง | The elephant is big. | ช้างตัวใหญ่
snake | งู | Be careful! A snake! | ระวัง! งู!
monkey | ลิง | The monkey likes bananas. | ลิงชอบกล้วย
duck | เป็ด | The duck can swim. | เป็ดว่ายน้ำได้
`);
U('basic', 0, 'อาหารและเครื่องดื่ม', `
rice | ข้าว | Thai people eat rice. | คนไทยกินข้าว
egg | ไข่ | I eat an egg every morning. | ฉันกินไข่ทุกเช้า
bread | ขนมปัง | I want some bread. | ฉันอยากได้ขนมปัง
milk | นม | Drink your milk. | ดื่มนมซะ
fruit | ผลไม้ | Fruit is good for you. | ผลไม้มีประโยชน์
noodles | ก๋วยเตี๋ยว/บะหมี่ | I like noodles. | ฉันชอบก๋วยเตี๋ยว
---
coffee | กาแฟ | One coffee, please. | ขอกาแฟหนึ่งแก้ว
tea | ชา | Do you want tea? | อยากดื่มชาไหม
juice | น้ำผลไม้ | Orange juice, please. | ขอน้ำส้ม
meat | เนื้อสัตว์ | I don't eat meat. | ฉันไม่กินเนื้อสัตว์
vegetable | ผัก | Eat your vegetables. | กินผักด้วย
food | อาหาร | Thai food is delicious. | อาหารไทยอร่อย
`);
G(0, 'คำถาม Yes/No', 'Is/Are + ประธาน ...? (กับ be) · Do/Does + ประธาน + V1 ...? (กับกริยาอื่น)', `
___ you a student? | Are | Is, Do, Does | you ใช้ Are | คุณเป็นนักเรียนใช่ไหม
___ she your sister? | Is | Are, Do, Does | she ใช้ Is | เธอเป็นพี่สาวของคุณใช่ไหม
___ you like coffee? | Do | Does, Are, Is | กริยา like + you ใช้ Do | คุณชอบกาแฟไหม
___ he work here? | Does | Do, Is, Are | กริยา work + he ใช้ Does | เขาทำงานที่นี่ไหม
___ they at home? | Are | Is, Do, Does | they + be ใช้ Are | พวกเขาอยู่บ้านไหม
___ it hot today? | Is | Are, Do, Does | it ใช้ Is | วันนี้ร้อนไหม
`);
D(0, 'คุยง่ายๆ 2', `
A: Do you like cats? / B: ___ | Yes, I do. | Yes, I am.; No, I'm not.; Yes, it is. | A: คุณชอบแมวไหม / B: ชอบ
A: Are you hungry? / B: ___ | Yes, I am. | Yes, I do.; No, I don't.; Yes, it does. | A: คุณหิวไหม / B: หิว
A: What is this? / B: ___ | It's a pen. | I'm a pen.; Yes, it is.; It's ten. | A: นี่คืออะไร / B: มันคือปากกา
A: Good night! / B: ___ | Good night! See you tomorrow. | Good morning!; Nice to meet you.; I'm fine. | A: ราตรีสวัสดิ์! / B: ราตรีสวัสดิ์ พรุ่งนี้เจอกัน
A: Can I have water, please? / B: ___ | Sure. Here you are. | Yes, I am water.; No, I'm fine.; Water is blue. | A: ขอน้ำหน่อยได้ไหม / B: ได้ นี่ครับ
`);
R(0, 'อ่านเรื่องแรก', 'My Family', `I am Fah. I am a student. I have a father, a mother, and one brother. My father is a farmer. My mother is a cook. My brother is ten years old. We have two dogs. I love my family.`,
`ฉันชื่อฟ้า ฉันเป็นนักเรียน ฉันมีพ่อ แม่ และพี่น้องผู้ชายหนึ่งคน พ่อเป็นเกษตรกร แม่เป็นแม่ครัว น้องชายอายุสิบขวบ เรามีสุนัขสองตัว ฉันรักครอบครัวของฉัน`, `
What is Fah? | A student | A cook; A farmer; A teacher
What is her father's job? | A farmer | A cook; A doctor; A driver
How old is her brother? | Ten | Two; Twelve; Twenty
How many dogs do they have? | Two | One; Three; Ten
`);
U('daily', 1, 'เสื้อผ้า', `
shirt | เสื้อเชิ้ต | He wears a white shirt. | เขาสวมเสื้อเชิ้ตสีขาว
pants | กางเกงขายาว | These pants are too long. | กางเกงตัวนี้ยาวเกินไป
dress | ชุดกระโปรง | She has a red dress. | เธอมีชุดสีแดง
jacket | เสื้อแจ็กเก็ต | Take a jacket. It's cold. | เอาแจ็กเก็ตไปด้วย อากาศหนาว
hat | หมวก | I wear a hat in the sun. | ฉันสวมหมวกตอนแดดออก
socks | ถุงเท้า | Where are my socks? | ถุงเท้าฉันอยู่ไหน
---
skirt | กระโปรง | Her skirt is blue. | กระโปรงของเธอสีน้ำเงิน
T-shirt | เสื้อยืด | I like this T-shirt. | ฉันชอบเสื้อยืดตัวนี้
belt | เข็มขัด | He needs a belt. | เขาต้องการเข็มขัด
watch | นาฬิกาข้อมือ | My watch is new. | นาฬิกาของฉันใหม่
pocket | กระเป๋าเสื้อ/กางเกง | The key is in my pocket. | กุญแจอยู่ในกระเป๋ากางเกง
uniform | เครื่องแบบ | Students wear uniforms. | นักเรียนสวมเครื่องแบบ
`);
U('daily', 1, 'สถานที่และห้อง', `
bathroom | ห้องน้ำ | The bathroom is upstairs. | ห้องน้ำอยู่ชั้นบน
bedroom | ห้องนอน | My bedroom is small. | ห้องนอนของฉันเล็ก
living room | ห้องนั่งเล่น | We watch TV in the living room. | เราดูทีวีในห้องนั่งเล่น
office | สำนักงาน | He is at the office. | เขาอยู่ที่สำนักงาน
shop | ร้านค้า | The shop is closed. | ร้านปิดแล้ว
restaurant | ร้านอาหาร | Let's go to a restaurant. | ไปร้านอาหารกันเถอะ
---
post office | ที่ทำการไปรษณีย์ | Where is the post office? | ไปรษณีย์อยู่ที่ไหน
pharmacy | ร้านขายยา | Buy medicine at the pharmacy. | ซื้อยาที่ร้านขายยา
gas station | ปั๊มน้ำมัน | Stop at the gas station. | แวะปั๊มน้ำมัน
supermarket | ซูเปอร์มาร์เก็ต | I shop at the supermarket. | ฉันซื้อของที่ซูเปอร์มาร์เก็ต
park | สวนสาธารณะ | Let's walk in the park. | ไปเดินเล่นในสวนกัน
village | หมู่บ้าน | I live in a small village. | ฉันอาศัยอยู่ในหมู่บ้านเล็กๆ
`);
G(1, 'Can / Can\'t', 'can + V1 = ทำได้ · can\'t + V1 = ทำไม่ได้ · ถาม: Can + ประธาน + V1?', `
I ___ swim. | can | cans, can to, canning | can + V1 | ฉันว่ายน้ำได้
She ___ drive. She is too young. | can't | can, cans, doesn't can | ทำไม่ได้ใช้ can't | เธอขับรถไม่ได้ เธอเด็กเกินไป
___ you help me? | Can | Do, Are, Is | ถามใช้ Can | ช่วยฉันได้ไหม
He can ___ English well. | speak | speaks, speaking, to speak | can + V1 | เขาพูดภาษาอังกฤษเก่ง
Can you ___ me? | hear | hears, heard, hearing | can + V1 | คุณได้ยินฉันไหม
Birds ___ fly. | can | can't, are, does | นกบินได้ | นกบินได้
`);
G(1, "Possessive 's", "ของ ...: คน + 's (Tom's car) · พหูพจน์ลงท้าย s + ' (the boys' room)", `
This is ___ bag. | Nida's | Nida, Nidas, Nida is | ของนิดาใช้ 's | นี่คือกระเป๋าของนิดา
My ___ name is Somchai. | father's | father, fathers, father is | ชื่อของพ่อ | พ่อของฉันชื่อสมชาย
The ___ room is big. | children's | childrens, childs', children | children + 's | ห้องของเด็กๆ ใหญ่
That is my ___ car. | brother's | brother, brothers, brother is | รถของพี่ชาย | นั่นคือรถของพี่ชายฉัน
The ___ office is on the left. | manager's | manager, managers, manager is | สำนักงานของผู้จัดการ | สำนักงานผู้จัดการอยู่ทางซ้าย
Is this ___ phone? | your | you, you's, yours | หน้าคำนามใช้ your | นี่โทรศัพท์ของคุณใช่ไหม
`);
D(1, 'ถามทาง', `
A: Excuse me, where is the station? / B: ___ | Go straight and turn right. | It's five o'clock.; I'm a station.; Yes, it is big. | A: ขอโทษครับ สถานีอยู่ไหน / B: ตรงไปแล้วเลี้ยวขวา
A: Is it far from here? / B: ___ | No, it's about five minutes on foot. | Yes, I'm far.; It's here today.; No, I'm not here. | A: ไกลจากที่นี่ไหม / B: ไม่ไกล เดินประมาณห้านาที
A: Can I walk there? / B: ___ | Yes, it's not far. | Yes, I can swim.; No, I'm walking.; It's a nice walk shoe. | A: เดินไปได้ไหม / B: ได้ ไม่ไกล
A: Where can I take a taxi? / B: ___ | There's a taxi stand over there. | Take it home.; I don't have a taxi.; Taxis are yellow and green. | A: เรียกแท็กซี่ได้ที่ไหน / B: มีจุดจอดแท็กซี่ทางโน้น
A: Thank you very much! / B: ___ | No problem. Have a nice day! | Yes, you are.; I'm sorry.; Good night, bye bye bye. | A: ขอบคุณมาก! / B: ไม่เป็นไร ขอให้เป็นวันที่ดี
`);
R(1, 'เรื่องสั้นง่ายๆ', 'A Rainy Day', `Today it is raining. Mai cannot go to the park. She stays at home with her cat. She reads a book and drinks hot chocolate. In the afternoon, her friend Joy calls her. They talk for one hour. In the evening, the rain stops, and Mai goes out to buy food.`,
`วันนี้ฝนตก ใหม่ไปสวนสาธารณะไม่ได้ เธออยู่บ้านกับแมว เธออ่านหนังสือและดื่มช็อกโกแลตร้อน ตอนบ่ายเพื่อนชื่อจอยโทรมา พวกเขาคุยกันหนึ่งชั่วโมง ตอนเย็นฝนหยุด ใหม่จึงออกไปซื้ออาหาร`, `
Why can't Mai go to the park? | It is raining. | She is sick.; The park is closed.; She has work.
What does Mai drink? | Hot chocolate | Coffee; Cold water; Tea
Who calls Mai? | Joy | Her mother; Her cat; A police officer
What does Mai do in the evening? | Buys food | Goes to the park; Sleeps; Reads a book
`);
U('daily', 2, 'กีฬาและงานอดิเรก', `
football | ฟุตบอล | We play football on Sunday. | เราเล่นฟุตบอลวันอาทิตย์
swim | ว่ายน้ำ | I swim every morning. | ฉันว่ายน้ำทุกเช้า
run | วิ่ง | He runs five kilometers. | เขาวิ่งห้ากิโลเมตร
music | ดนตรี/เพลง | I listen to music. | ฉันฟังเพลง
movie | ภาพยนตร์ | Let's watch a movie. | ไปดูหนังกันเถอะ
game | เกม | He plays games on his phone. | เขาเล่นเกมในโทรศัพท์
---
team | ทีม | Our team won. | ทีมของเราชนะ
win | ชนะ | Thailand won the match. | ไทยชนะการแข่งขัน
lose | แพ้ | We lost the game. | เราแพ้เกม
practice | ฝึกซ้อม | Practice every day. | ฝึกซ้อมทุกวัน
gym | ยิม/โรงยิม | I go to the gym after work. | ฉันไปยิมหลังเลิกงาน
favorite | ชื่นชอบที่สุด | My favorite sport is boxing. | กีฬาที่ชอบที่สุดคือมวย
`);
U('police', 2, 'การรายงานเหตุการณ์', `
happen | เกิดขึ้น | What happened here? | เกิดอะไรขึ้นที่นี่
see | เห็น | I saw a man with a knife. | ฉันเห็นผู้ชายถือมีด
hear | ได้ยิน | I heard a loud noise. | ฉันได้ยินเสียงดัง
describe | บรรยาย | Can you describe him? | บรรยายลักษณะเขาได้ไหม
location | สถานที่ | What is your location? | คุณอยู่ที่ไหน
time | เวลา | What time did it happen? | เกิดเหตุกี่โมง
---
knife | มีด | He had a knife. | เขามีมีด
noise | เสียงดัง | The noise woke me up. | เสียงดังปลุกฉันตื่น
neighbor | เพื่อนบ้าน | My neighbor called the police. | เพื่อนบ้านโทรเรียกตำรวจ
stranger | คนแปลกหน้า | A stranger was in my house. | มีคนแปลกหน้าอยู่ในบ้านฉัน
quickly | อย่างรวดเร็ว | He left quickly. | เขาออกไปอย่างรวดเร็ว
license plate | ป้ายทะเบียน | Did you see the license plate? | คุณเห็นป้ายทะเบียนไหม
`);
G(2, 'Should / Have to', 'should + V1 = ควร · have to / has to + V1 = ต้อง (จำเป็น) · don\'t have to = ไม่จำเป็นต้อง', `
You ___ drink more water. | should | have, must to, shoulds | คำแนะนำใช้ should | คุณควรดื่มน้ำมากขึ้น
I ___ work tomorrow. | have to | has to, should to, haves | I + have to | พรุ่งนี้ฉันต้องทำงาน
She ___ wear a uniform at work. | has to | have to, haves to, should to | She + has to | เธอต้องสวมเครื่องแบบที่ทำงาน
You don't ___ pay. It's free. | have to | has to, should, must | ไม่จำเป็นต้อง | ไม่ต้องจ่าย ฟรี
You ___ smoke. It's bad for you. | shouldn't | should, have to, has to | ไม่ควร | คุณไม่ควรสูบบุหรี่ มันไม่ดีต่อสุขภาพ
Does he ___ go now? | have to | has to, should to, haves to | Does + have to | เขาต้องไปตอนนี้ไหม
`);
D(2, 'ที่โรงพยาบาล', `
A: What's the matter? / B: ___ | I have a terrible headache. | It's a matter.; I'm a doctor.; Nothing is matter. | A: เป็นอะไรมา / B: ปวดหัวมาก
A: How long have you felt like this? / B: ___ | Since yesterday morning. | For a long hospital.; I feel good, bye.; Like this. | A: เป็นแบบนี้มานานแค่ไหน / B: ตั้งแต่เมื่อวานเช้า
A: Are you allergic to any medicine? / B: ___ | No, I'm not. | Yes, I like medicine.; No, I'm a medicine.; Medicine is good. | A: แพ้ยาอะไรไหม / B: ไม่แพ้
A: Take this twice a day after meals. / B: ___ | OK. Thank you, doctor. | I'm not hungry.; Twice is two.; No, I take it once. | A: กินยานี้วันละสองครั้งหลังอาหาร / B: ครับ ขอบคุณครับหมอ
A: You should rest for two days. / B: ___ | Can I get a medical certificate? | I rest every week.; Two days ago.; I'm not tired, so no. | A: ควรพักสองวัน / B: ขอใบรับรองแพทย์ได้ไหม
`);
R(2, 'ข่าวและประกาศ', 'Water Festival Rules', `During the Songkran festival, the city will close Khao San Road to cars from April 13 to 15. Visitors can play with water from 10 a.m. to 9 p.m. Glass bottles and alcohol sales on the street are not allowed. Police and volunteers will be on duty to help tourists. Please respect the rules and enjoy the festival safely.`,
`ช่วงเทศกาลสงกรานต์ เมืองจะปิดถนนข้าวสารไม่ให้รถผ่านตั้งแต่ 13 ถึง 15 เมษายน ผู้มาเที่ยวเล่นน้ำได้ตั้งแต่ 10 โมงเช้าถึง 3 ทุ่ม ห้ามนำขวดแก้วและห้ามขายแอลกอฮอล์บนถนน ตำรวจและอาสาสมัครจะประจำจุดช่วยเหลือนักท่องเที่ยว โปรดเคารพกฎและสนุกกับเทศกาลอย่างปลอดภัย`, `
Which road will be closed? | Khao San Road | Silom Road; Rama IV Road; Sathorn Road
What time can people play with water? | 10 a.m. to 9 p.m. | All day and night; 9 a.m. to 10 a.m.; Only in the evening
What is NOT allowed? | Glass bottles | Water guns; Tourists; Music
Who will help tourists? | Police and volunteers | Taxi drivers; Shop owners; Teachers
`);
U('talk', 3, 'การเจรจาและต่อรอง', `
negotiate | ต่อรอง | Can we negotiate the price? | ต่อราคาได้ไหม
offer | ข้อเสนอ/เสนอ | I can offer you a discount. | ฉันลดราคาให้ได้
deal | ข้อตกลง | It's a deal! | ตกลงตามนั้น!
compromise | ประนีประนอม | Let's find a compromise. | มาหาทางประนีประนอมกัน
reasonable | สมเหตุสมผล | That price is reasonable. | ราคานั้นสมเหตุสมผล
accept | ยอมรับ | I accept your offer. | ฉันรับข้อเสนอของคุณ
---
condition | เงื่อนไข | What are the conditions? | มีเงื่อนไขอะไรบ้าง
agreement | ข้อตกลง | We signed an agreement. | เราเซ็นข้อตกลงแล้ว
benefit | ผลประโยชน์ | It will benefit both of us. | มันเป็นประโยชน์กับทั้งสองฝ่าย
contract | สัญญา | Read the contract carefully. | อ่านสัญญาอย่างละเอียด
reject | ปฏิเสธ | They rejected our plan. | พวกเขาปฏิเสธแผนของเรา
final | สุดท้าย | Is this your final price? | นี่ราคาสุดท้ายหรือยัง
`);
G(3, 'As ... as', 'as + adj + as = เท่ากับ · not as + adj + as = ไม่เท่า', `
He is as tall ___ his father. | as | than, like, so | as ... as | เขาสูงเท่าพ่อ
This phone is not as ___ as that one. | expensive | more expensive, most expensive, expensiver | not as + adj + as | โทรศัพท์เครื่องนี้ไม่แพงเท่าเครื่องนั้น
She runs as ___ as a professional. | fast | faster, fastest, more fast | as + adj + as | เธอวิ่งเร็วเท่านักกีฬาอาชีพ
Today is not ___ hot as yesterday. | as | so much, more, than | not as ... as | วันนี้ไม่ร้อนเท่าเมื่อวาน
Come as soon ___ possible. | as | than, to, so | as soon as possible | มาให้เร็วที่สุดเท่าที่ทำได้
My English is as ___ as yours. | good | better, best, well as | as + adj + as | ภาษาอังกฤษของฉันดีเท่าของคุณ
`);
D(3, 'โรงแรมและการเดินทาง', `
A: I'd like to check in. / B: ___ | Sure. May I see your passport, please? | Check it out.; I'd like it too.; The hotel is big. | A: ขอเช็คอินครับ / B: ได้ค่ะ ขอดูหนังสือเดินทางด้วยค่ะ
A: What time is breakfast? / B: ___ | From 6:30 to 10 a.m. | It's very delicious.; At the restaurant only.; Yes, it is breakfast. | A: อาหารเช้ากี่โมง / B: 6:30 ถึง 10 โมงเช้า
A: The air conditioner in my room is broken. / B: ___ | I'm sorry. I'll send someone right away. | Open the window then.; It's not my room.; Air is free. | A: แอร์ห้องผมเสีย / B: ขอโทษค่ะ จะส่งคนไปเดี๋ยวนี้
A: Could I have a late check-out? / B: ___ | Yes, you can stay until 2 p.m. | Check out now.; No, it's late.; It's a check. | A: ขอเช็คเอาท์ช้าได้ไหม / B: ได้ค่ะ อยู่ได้ถึงบ่ายสอง
A: Can you call a taxi to the airport? / B: ___ | Of course. It'll be here in ten minutes. | The airport is far.; I'm not a taxi.; Yes, call it. | A: ช่วยเรียกแท็กซี่ไปสนามบินได้ไหม / B: ได้ค่ะ อีกสิบนาทีรถมา
`);
R(3, 'งานตำรวจ', 'Tourist Police', `The Tourist Police is a special unit that helps foreign visitors. Officers speak English and other languages, and they work in popular tourist areas such as Bangkok, Phuket, and Chiang Mai. Tourists can call 1155 for help 24 hours a day. The unit handles problems like lost passports, scams, and accidents. Many tourists say the officers are friendly and helpful.`,
`ตำรวจท่องเที่ยวเป็นหน่วยพิเศษที่ช่วยเหลือนักท่องเที่ยวต่างชาติ เจ้าหน้าที่พูดภาษาอังกฤษและภาษาอื่นๆ และทำงานในแหล่งท่องเที่ยวยอดนิยม เช่น กรุงเทพฯ ภูเก็ต และเชียงใหม่ นักท่องเที่ยวโทร 1155 ขอความช่วยเหลือได้ตลอด 24 ชั่วโมง หน่วยนี้ดูแลปัญหาต่างๆ เช่น หนังสือเดินทางหาย การหลอกลวง และอุบัติเหตุ นักท่องเที่ยวหลายคนบอกว่าเจ้าหน้าที่เป็นมิตรและช่วยเหลือดี`, `
Who does the Tourist Police help? | Foreign visitors | Thai students; Farmers; Bus drivers
What number can tourists call? | 1155 | 191; 1669; 1197
Which problem is NOT mentioned? | Hotel bookings | Lost passports; Scams; Accidents
How do many tourists describe the officers? | Friendly and helpful | Strict and rude; Busy and slow; Quiet and shy
`);
U('police', 4, 'Collocations ออกสอบ', `
make a decision | ตัดสินใจ | We need to make a decision now. | เราต้องตัดสินใจตอนนี้
take a break | พักผ่อนสักครู่ | Let's take a break. | พักกันสักครู่
pay attention | ตั้งใจ/ใส่ใจ | Pay attention to the road. | ตั้งใจดูถนน
keep a promise | รักษาสัญญา | He always keeps his promises. | เขารักษาสัญญาเสมอ
commit a crime | ก่ออาชญากรรม | He committed a crime. | เขาก่ออาชญากรรม
take action | ลงมือดำเนินการ | The police took action quickly. | ตำรวจลงมือดำเนินการอย่างรวดเร็ว
---
make progress | มีความคืบหน้า | We made good progress. | เราคืบหน้าไปมาก
do your best | ทำให้ดีที่สุด | Do your best in the exam. | ทำข้อสอบให้ดีที่สุด
break the law | ทำผิดกฎหมาย | Don't break the law. | อย่าทำผิดกฎหมาย
take responsibility | รับผิดชอบ | Take responsibility for your actions. | รับผิดชอบการกระทำของตัวเอง
follow the rules | ทำตามกฎ | Everyone must follow the rules. | ทุกคนต้องทำตามกฎ
gain experience | ได้รับประสบการณ์ | You will gain experience. | คุณจะได้ประสบการณ์
`);
U('daily', 4, 'คำศัพท์ระดับสูงทั่วไป', `
analyze | วิเคราะห์ | Analyze the data carefully. | วิเคราะห์ข้อมูลอย่างละเอียด
evaluate | ประเมิน | We will evaluate the results. | เราจะประเมินผล
significant | สำคัญ/มีนัยสำคัญ | It was a significant change. | มันเป็นการเปลี่ยนแปลงที่สำคัญ
efficient | มีประสิทธิภาพ | This method is more efficient. | วิธีนี้มีประสิทธิภาพกว่า
consequence | ผลที่ตามมา | Think about the consequences. | คิดถึงผลที่ตามมา
obvious | ชัดเจน | The answer is obvious. | คำตอบชัดเจน
---
maintain | รักษาไว้ | Maintain a safe distance. | รักษาระยะห่างที่ปลอดภัย
estimate | ประมาณ | Can you estimate the cost? | ประมาณค่าใช้จ่ายได้ไหม
contribute | มีส่วนร่วม | Everyone can contribute. | ทุกคนมีส่วนร่วมได้
essential | จำเป็นมาก | Water is essential for life. | น้ำจำเป็นต่อชีวิต
generate | สร้าง/ก่อให้เกิด | Solar panels generate power. | แผงโซลาร์สร้างพลังงาน
previous | ก่อนหน้า | It was better than the previous one. | ดีกว่าครั้งก่อน
`);
G(4, 'Causative: have / get', 'have + คน + V1 · have + ของ + V3 (ให้คนอื่นทำให้) · get + ของ + V3', `
I had my car ___ yesterday. | repaired | repair, repairing, to repair | have + ของ + V3 | เมื่อวานฉันเอารถไปซ่อม
She gets her hair ___ every month. | cut | cutting, to cut, cuts | get + ของ + V3 | เธอไปตัดผมทุกเดือน
The officer had the man ___ the form. | fill in | filled in, to fill in, filling in | have + คน + V1 | เจ้าหน้าที่ให้ชายคนนั้นกรอกแบบฟอร์ม
We need to get the documents ___. | checked | check, checking, to check | get + ของ + V3 | เราต้องให้คนตรวจเอกสาร
I'll have my assistant ___ you. | call | called, calling, to calling | have + คน + V1 | ฉันจะให้ผู้ช่วยโทรหาคุณ
He had his phone ___. | stolen | stole, steal, stealing | have + ของ + V3 (ถูกกระทำ) | เขาถูกขโมยโทรศัพท์
`);
G(4, 'Not only ... but also', 'not only A but also B = ไม่เพียงแต่ A แต่ยัง B · both A and B · either A or B · neither A nor B', `
He is not only smart ___ hardworking. | but also | and also, but too, or also | not only ... but also | เขาไม่เพียงฉลาดแต่ยังขยัน
___ Tom and Ann passed the exam. | Both | Either, Neither, Not only | both ... and | ทั้งทอมและแอนสอบผ่าน
You can ___ call or email me. | either | both, neither, not | either ... or | คุณจะโทรหรืออีเมลมาก็ได้
___ he nor his wife was at home. | Neither | Either, Both, Not | neither ... nor | ทั้งเขาและภรรยาไม่อยู่บ้าน
She speaks both English ___ Chinese. | and | or, nor, but | both ... and | เธอพูดได้ทั้งอังกฤษและจีน
Not only ___ he late, but he also forgot the report. | was | he was, is he, did | Not only ขึ้นต้นประโยค ต้องสลับ was he | เขาไม่เพียงมาสายแต่ยังลืมรายงานด้วย
`);
D(4, 'โต้แย้งอย่างสุภาพ', `
A: I think we should close the road. / B: ___ | I see your point, but that might cause traffic jams. | Yes, you are a road.; I think so road.; Close it yesterday. | A: ผมคิดว่าเราควรปิดถนน / B: เข้าใจครับ แต่อาจทำให้รถติด
A: This plan won't work. / B: ___ | Could you tell me why you think so? | Yes, it works.; Plans are paper.; I won't work today. | A: แผนนี้ไม่ได้ผลหรอก / B: ช่วยบอกเหตุผลได้ไหมว่าทำไมคิดแบบนั้น
A: Everyone agrees with me. / B: ___ | Actually, I have a different opinion. | Everyone is here.; I agree with everyone, bye.; Me is everyone. | A: ทุกคนเห็นด้วยกับผม / B: ที่จริงผมมีความเห็นต่าง
A: Let's discuss it calmly. / B: ___ | You're right. Let's look at the facts. | I'm not calm, sorry.; Discuss is a word.; Calm down yourself. | A: มาคุยกันใจเย็นๆ เถอะ / B: จริงครับ มาดูข้อเท็จจริงกัน
A: Can we meet halfway? / B: ___ | That sounds fair to me. | Halfway is far.; I'm on my way.; No, meet me at home. | A: เราพบกันครึ่งทางได้ไหม / B: ฟังดูยุติธรรมดีครับ
`);
R(4, 'บทความ', 'Stress and Health', `Police officers often work long hours and face dangerous situations, which can lead to high levels of stress. Long-term stress may cause sleep problems, heart disease, and depression. Experts suggest several ways to manage it: regular exercise, enough sleep, and talking with family or friends. Some police departments now provide counselors for their staff. Taking care of mental health is not a sign of weakness; it helps officers serve the public better.`,
`ตำรวจมักทำงานหลายชั่วโมงและเผชิญสถานการณ์อันตราย ซึ่งอาจทำให้เครียดมาก ความเครียดระยะยาวอาจทำให้นอนไม่หลับ เป็นโรคหัวใจ และซึมเศร้า ผู้เชี่ยวชาญแนะนำวิธีจัดการหลายอย่าง เช่น ออกกำลังกายสม่ำเสมอ นอนให้พอ และพูดคุยกับครอบครัวหรือเพื่อน ปัจจุบันหน่วยงานตำรวจบางแห่งมีนักให้คำปรึกษาให้เจ้าหน้าที่ การดูแลสุขภาพจิตไม่ใช่ความอ่อนแอ แต่ช่วยให้เจ้าหน้าที่รับใช้ประชาชนได้ดีขึ้น`, `
Why do police officers often feel stressed? | Long hours and dangerous situations | Too much free time; Low salary only; Easy work
Which is NOT a way to manage stress mentioned? | Working more hours | Regular exercise; Enough sleep; Talking with family
What do some police departments provide? | Counselors | Free cars; Longer holidays; More weapons
What is the writer's opinion about mental health care? | It helps officers serve better. | It shows weakness.; It is not important.; It costs too much.
`);

// ===== Lv.5 คล่อง =====
U('daily', 5, 'ภาษาข่าว', `
crisis | วิกฤต | The country faces an economic crisis. | ประเทศเผชิญวิกฤตเศรษฐกิจ
reform | ปฏิรูป | The government promised police reform. | รัฐบาลสัญญาว่าจะปฏิรูปตำรวจ
protest | ประท้วง | Thousands joined the protest. | คนหลายพันเข้าร่วมการประท้วง
scandal | เรื่องอื้อฉาว | The minister resigned after the scandal. | รัฐมนตรีลาออกหลังเรื่องอื้อฉาว
inflation | เงินเฟ้อ | Inflation makes food more expensive. | เงินเฟ้อทำให้อาหารแพงขึ้น
policy | นโยบาย | The new policy starts next year. | นโยบายใหม่เริ่มปีหน้า
---
unemployment | การว่างงาน | Unemployment is rising. | การว่างงานเพิ่มขึ้น
debate | การอภิปราย | There was a heated debate. | มีการอภิปรายอย่างดุเดือด
campaign | การรณรงค์ | They started a road safety campaign. | พวกเขาเริ่มรณรงค์ความปลอดภัยทางถนน
poll | ผลสำรวจความเห็น | A new poll shows strong support. | ผลสำรวจใหม่แสดงการสนับสนุนอย่างมาก
controversy | ข้อถกเถียง | The decision caused controversy. | การตัดสินใจนั้นก่อให้เกิดข้อถกเถียง
official | เจ้าหน้าที่/เป็นทางการ | An official confirmed the news. | เจ้าหน้าที่ยืนยันข่าวแล้ว
`);
U('daily', 5, 'อารมณ์แบบละเอียด', `
frustrated | หงุดหงิด/คับข้องใจ | I'm frustrated with the slow internet. | ฉันหงุดหงิดกับเน็ตช้า
overwhelmed | ท่วมท้น/รับมือไม่ไหว | She felt overwhelmed by work. | เธอรู้สึกงานล้นมือ
relieved | โล่งใจ | I was relieved to hear the news. | ฉันโล่งใจที่ได้ยินข่าวนี้
grateful | ซาบซึ้งใจ | I'm grateful for your help. | ฉันซาบซึ้งใจที่คุณช่วย
embarrassed | อาย | He was embarrassed by his mistake. | เขาอายกับความผิดพลาดของตัวเอง
confused | สับสน | I'm confused. Can you explain again? | ฉันสับสน อธิบายอีกครั้งได้ไหม
---
disappointed | ผิดหวัง | I was disappointed with the result. | ฉันผิดหวังกับผลลัพธ์
furious | โกรธจัด | The customer was furious. | ลูกค้าโกรธจัด
exhausted | เหนื่อยล้ามาก | After the shift, I was exhausted. | หลังเข้าเวรฉันเหนื่อยมาก
delighted | ดีใจมาก | We are delighted to meet you. | เรายินดีมากที่ได้พบคุณ
jealous | อิจฉา | He is jealous of his brother. | เขาอิจฉาพี่ชาย
ashamed | ละอายใจ | He felt ashamed of what he did. | เขาละอายใจกับสิ่งที่ทำ
`);
U('police', 5, 'กระบวนการยุติธรรม', `
prosecute | ฟ้องร้องดำเนินคดี | The state will prosecute him. | รัฐจะฟ้องดำเนินคดีกับเขา
defendant | จำเลย | The defendant denied the charges. | จำเลยปฏิเสธข้อกล่าวหา
plaintiff | โจทก์ | The plaintiff asked for compensation. | โจทก์เรียกค่าเสียหาย
verdict | คำตัดสิน | The court will give its verdict today. | ศาลจะอ่านคำตัดสินวันนี้
acquit | ยกฟ้อง/ตัดสินว่าไม่ผิด | He was acquitted of all charges. | เขาได้รับการยกฟ้องทุกข้อหา
convict | ตัดสินว่ามีความผิด | She was convicted of fraud. | เธอถูกตัดสินว่าผิดฐานฉ้อโกง
---
testimony | คำให้การ | His testimony was important. | คำให้การของเขาสำคัญมาก
probation | การคุมประพฤติ | He was put on probation for a year. | เขาถูกคุมประพฤติหนึ่งปี
parole | การพักโทษ | She was released on parole. | เธอได้รับการพักโทษ
compensation | ค่าชดเชย | The victim received compensation. | ผู้เสียหายได้รับค่าชดเชย
lawsuit | คดีความ | They filed a lawsuit against the company. | พวกเขายื่นฟ้องบริษัท
appeal | ยื่นอุทธรณ์ | The lawyer will appeal the decision. | ทนายจะยื่นอุทธรณ์คำตัดสิน
`);
U('talk', 5, 'ที่ทำงานขั้นสูง', `
colleague | เพื่อนร่วมงาน | My colleague helped me. | เพื่อนร่วมงานช่วยฉัน
promotion | การเลื่อนตำแหน่ง | He got a promotion last year. | เขาได้เลื่อนตำแหน่งปีที่แล้ว
resign | ลาออก | She decided to resign. | เธอตัดสินใจลาออก
workload | ปริมาณงาน | My workload is heavy this month. | เดือนนี้งานฉันหนัก
delegate | มอบหมายงาน | A good leader knows how to delegate. | ผู้นำที่ดีรู้วิธีมอบหมายงาน
priority | ลำดับความสำคัญ | Safety is our top priority. | ความปลอดภัยคือสิ่งสำคัญที่สุดของเรา
---
supervise | ควบคุมดูแล | He supervises ten officers. | เขาดูแลเจ้าหน้าที่สิบนาย
initiative | ความคิดริเริ่ม | She showed great initiative. | เธอแสดงความคิดริเริ่มอย่างดี
collaborate | ร่วมมือกัน | We collaborate with other agencies. | เราร่วมมือกับหน่วยงานอื่น
assess | ประเมิน | We need to assess the risk. | เราต้องประเมินความเสี่ยง
performance | ผลการปฏิบัติงาน | His performance was excellent. | ผลงานของเขายอดเยี่ยม
deadline | กำหนดเส้นตาย | We missed the deadline. | เราพลาดกำหนดส่ง
`);
U('talk', 5, 'สำนวนอังกฤษ (Idioms)', `
once in a blue moon | นานๆ ครั้ง | I eat fast food once in a blue moon. | ฉันกินฟาสต์ฟู้ดนานๆ ครั้ง
cost an arm and a leg | แพงมหาโหด | That car cost an arm and a leg. | รถคันนั้นแพงหูฉี่
hit the books | ตั้งใจอ่านหนังสือ | I need to hit the books tonight. | คืนนี้ต้องอ่านหนังสือหนัก
beat around the bush | พูดอ้อมค้อม | Stop beating around the bush. | เลิกพูดอ้อมค้อมได้แล้ว
the last straw | ฟางเส้นสุดท้าย | Being late again was the last straw. | มาสายอีกครั้งคือฟางเส้นสุดท้าย
speak of the devil | พูดถึงก็มาพอดี | Speak of the devil, here he is! | พูดถึงก็มาพอดีเลย
---
better late than never | มาช้ายังดีกว่าไม่มา | You finished it? Better late than never. | เสร็จแล้วเหรอ ช้ายังดีกว่าไม่ทำ
in hot water | เดือดร้อน/มีปัญหา | He's in hot water with his boss. | เขามีปัญหากับหัวหน้า
let the cat out of the bag | เผลอหลุดความลับ | Who let the cat out of the bag? | ใครเผลอหลุดความลับ
see eye to eye | เห็นตรงกัน | We don't always see eye to eye. | เราไม่ได้เห็นตรงกันเสมอไป
cut corners | ทำแบบลวกๆ | Don't cut corners on safety. | อย่าทำลวกๆ เรื่องความปลอดภัย
on thin ice | เสี่ยงต่อปัญหา | You're on thin ice after that mistake. | หลังความผิดพลาดนั้นคุณกำลังเสี่ยง
`);
G(5, 'Mixed conditionals', 'If + had V3, would + V1 now (อดีตส่งผลถึงปัจจุบัน) · If + V2, would have V3 (นิสัยปัจจุบันส่งผลอดีต)', `
If I had studied harder, I ___ a police officer now. | would be | would have been, will be, am | อดีต → ผลตอนนี้ (now) | ถ้าเมื่อก่อนฉันตั้งใจเรียน ตอนนี้ฉันคงเป็นตำรวจแล้ว
If she ___ the job, she would be rich now. | had taken | took, takes, would take | If + had V3 | ถ้าเธอรับงานนั้น ตอนนี้เธอคงรวยแล้ว
If he weren't so lazy, he ___ the exam last year. | would have passed | would pass, passed, will pass | นิสัยปัจจุบัน → ผลในอดีต | ถ้าเขาไม่ขี้เกียจ ปีที่แล้วเขาคงสอบผ่านไปแล้ว
If I ___ my phone, I could call you now. | hadn't lost | didn't lose, don't lose, wouldn't lose | If + had V3 | ถ้าฉันไม่ทำโทรศัพท์หาย ตอนนี้คงโทรหาคุณได้
If you had listened, you ___ confused now. | wouldn't be | won't be, wouldn't have been, aren't | อดีต → ตอนนี้ | ถ้าคุณตั้งใจฟัง ตอนนี้คงไม่สับสน
If she spoke English, she ___ the tourist yesterday. | could have helped | can help, could help, helped | ความสามารถปัจจุบัน → อดีต | ถ้าเธอพูดอังกฤษได้ เมื่อวานคงช่วยนักท่องเที่ยวได้
`);
G(5, 'Relative clauses แบบมีคอมมา', 'ข้อมูลเพิ่มเติม (non-defining) ใส่คอมมา ใช้ who / which / whose ห้ามใช้ that', `
My father, ___ is a doctor, lives in Khon Kaen. | who | that, which, whose | คน + ข้อมูลเพิ่ม ใช้ who | พ่อของฉันซึ่งเป็นหมอ อาศัยอยู่ที่ขอนแก่น
Bangkok, ___ is the capital, is very crowded. | which | that, who, where | สิ่ง/สถานที่ + คอมมา ใช้ which | กรุงเทพฯ ซึ่งเป็นเมืองหลวง มีคนแออัดมาก
The officer, ___ car was stolen, reported it. | whose | who, which, that | ของใคร ใช้ whose | เจ้าหน้าที่ที่รถถูกขโมยได้แจ้งความ
He passed the exam, ___ surprised everyone. | which | that, what, who | which อ้างทั้งประโยค | เขาสอบผ่าน ซึ่งทำให้ทุกคนแปลกใจ
Phuket, ___ I visited last year, is beautiful. | which | where, that, who | ทำหน้าที่กรรมของ visited ใช้ which | ภูเก็ตที่ฉันไปเมื่อปีก่อนสวยมาก
My sister, ___ you met yesterday, is a nurse. | whom | which, whose, that | กรรมเป็นคน ใช้ whom (หรือ who) | พี่สาวที่คุณเจอเมื่อวานเป็นพยาบาล
`);
G(5, 'Wish / If only (ขั้นสูง)', 'wish + would = อยากให้คนอื่นเปลี่ยน · wish + could = อยากทำได้ · If only = ถ้าเพียงแต่ (เน้นกว่า wish)', `
I wish you ___ stop talking. | would | will, can, did | อยากให้คนอื่นเปลี่ยนพฤติกรรม | ฉันอยากให้คุณหยุดพูดเสียที
I wish I ___ speak five languages. | could | can, will, would to | อยากมีความสามารถ | ฉันอยากพูดได้ห้าภาษา
If only I ___ more time! | had | have, would have, will have | If only + V2 (ปัจจุบัน) | ถ้าฉันมีเวลามากกว่านี้ก็ดี
If only she ___ the truth earlier. | had told | told, tells, would tell | If only + had V3 (อดีต) | ถ้าเธอบอกความจริงเร็วกว่านี้ก็ดี
He wishes it ___ raining. | would stop | stops, stopped, will stop | wish + would | เขาอยากให้ฝนหยุดตก
I wish I ___ so much last night. | hadn't eaten | didn't eat, wouldn't eat, don't eat | เสียดายอดีต | ฉันไม่น่ากินเยอะขนาดนั้นเมื่อคืน
`);
D(5, 'สัมภาษณ์และที่ทำงาน', `
A: Tell me about yourself. / B: ___ | I'm a hardworking person with three years of experience in security. | I'm fine, thank you.; Myself is good.; Tell me first. | A: เล่าเกี่ยวกับตัวคุณหน่อย / B: ผมเป็นคนขยันและมีประสบการณ์ด้านรักษาความปลอดภัยสามปี
A: How do you handle pressure? / B: ___ | I stay calm, focus on priorities, and solve one problem at a time. | I handle it with my hands.; Pressure is very high.; I don't know pressure. | A: คุณรับมือกับความกดดันอย่างไร / B: ผมใจเย็น จัดลำดับความสำคัญ และแก้ทีละปัญหา
A: Where do you see yourself in five years? / B: ___ | I hope to become a skilled investigator. | I see myself in the mirror.; In five years ago.; Yes, I see. | A: อีกห้าปีคุณเห็นตัวเองเป็นอย่างไร / B: ผมหวังว่าจะเป็นนักสืบที่เชี่ยวชาญ
A: Do you have any questions for us? / B: ___ | Yes. What training do new officers receive? | No, I'm the question.; Questions are hard.; Yes, I have a car. | A: มีคำถามอะไรถึงเราไหม / B: มีครับ เจ้าหน้าที่ใหม่จะได้รับการฝึกอบรมอะไรบ้าง
A: We'll let you know by next week. / B: ___ | Thank you for your time. I look forward to hearing from you. | Let me know now.; Next week is late, bye.; I know it already. | A: เราจะแจ้งผลภายในสัปดาห์หน้า / B: ขอบคุณที่สละเวลาครับ หวังว่าจะได้ข่าวดี
`);
D(5, 'ระงับเหตุตึงเครียด', `
A: This is ridiculous! I've waited two hours! / B: ___ | I understand you're upset. Let me see how I can help. | Wait two more hours.; It's not ridiculous.; Calm down or leave! | A: บ้าไปแล้ว! รอมาสองชั่วโมง! / B: เข้าใจว่าคุณไม่พอใจ ขอดูว่าจะช่วยอย่างไรได้
A: He hit my car and drove away! / B: ___ | Are you hurt? Did you see the license plate? | Your car is old anyway.; He drove very well.; That's not my problem. | A: เขาชนรถผมแล้วขับหนี! / B: คุณบาดเจ็บไหม เห็นป้ายทะเบียนไหม
A: I didn't do anything wrong! / B: ___ | Then please stay calm and let's sort this out together. | You did everything wrong.; Wrong is not right.; Go away now. | A: ผมไม่ได้ทำอะไรผิด! / B: งั้นใจเย็นๆ แล้วมาช่วยกันคลี่คลายเรื่องนี้
A: Why are you stopping me? / B: ___ | You were driving without your headlights on. | Because I like stopping.; I'm not stopping.; Ask your friend. | A: ทำไมเรียกผมหยุด / B: คุณขับรถโดยไม่เปิดไฟหน้า
A: I want to speak to your supervisor. / B: ___ | Certainly. I'll call him for you. | He doesn't speak.; No, I am the boss of the world.; Speak to me later forever. | A: ขอคุยกับหัวหน้าคุณ / B: ได้ครับ จะเรียกให้
`);
R(5, 'บทความวิเคราะห์', 'Fake News', `Fake news spreads quickly on social media, often faster than the truth. Some false stories are created to make money from clicks, while others aim to influence public opinion. During emergencies, fake news can cause panic and even put lives at risk. Before sharing a story, readers should check the source, look for the same news on trusted websites, and be careful with shocking headlines. Thinking critically is one of the most important skills in the digital age.`,
`ข่าวปลอมแพร่กระจายอย่างรวดเร็วบนโซเชียลมีเดีย มักเร็วกว่าความจริง ข่าวปลอมบางเรื่องสร้างขึ้นเพื่อหาเงินจากยอดคลิก บางเรื่องมุ่งชี้นำความคิดของประชาชน ในเหตุฉุกเฉิน ข่าวปลอมอาจทำให้เกิดความตื่นตระหนกและเป็นอันตรายต่อชีวิต ก่อนแชร์ ผู้อ่านควรตรวจสอบแหล่งที่มา หาข่าวเดียวกันจากเว็บที่เชื่อถือได้ และระวังพาดหัวที่ชวนตกใจ การคิดวิเคราะห์จึงเป็นทักษะสำคัญที่สุดอย่างหนึ่งในยุคดิจิทัล`, `
Why are some fake stories created? | To make money from clicks | To help police; To teach English; To sell newspapers only
What can fake news cause during emergencies? | Panic | Better safety; Less traffic; Good weather
Which is NOT advice in the text? | Share shocking stories quickly | Check the source; Use trusted websites; Be careful with headlines
The phrase "thinking critically" is closest to | carefully judging information | thinking negatively; thinking fast; not thinking
`);
R(5, 'งานตำรวจยุคใหม่', 'Body Cameras', `Many police forces now require officers to wear body cameras. Supporters say the cameras protect both the public and the police, because they provide clear evidence of what really happened. Studies in some countries found fewer complaints against officers after cameras were introduced. However, critics worry about privacy, especially when cameras record people inside their homes. Clear rules about when to record and how long to keep videos are therefore essential.`,
`ปัจจุบันตำรวจหลายแห่งกำหนดให้เจ้าหน้าที่ติดกล้องที่ตัว ผู้สนับสนุนบอกว่ากล้องปกป้องทั้งประชาชนและตำรวจ เพราะเป็นหลักฐานชัดเจนว่าเกิดอะไรขึ้นจริง งานศึกษาในบางประเทศพบว่าข้อร้องเรียนต่อเจ้าหน้าที่ลดลงหลังเริ่มใช้กล้อง อย่างไรก็ตาม ผู้วิจารณ์กังวลเรื่องความเป็นส่วนตัว โดยเฉพาะเมื่อกล้องบันทึกภาพคนในบ้าน กฎที่ชัดเจนว่าจะบันทึกเมื่อไหร่และเก็บวิดีโอนานแค่ไหนจึงจำเป็นมาก`, `
Why do supporters like body cameras? | They provide clear evidence. | They are cheap.; They replace officers.; They stop all crime.
What happened after cameras were introduced in some countries? | Fewer complaints against officers | More complaints; More crime; Officers quit
What is the critics' main worry? | Privacy | Cost; Battery life; Camera size
What does the writer think is essential? | Clear rules about recording | More cameras; Banning cameras; Bigger police forces
`);
// ===== Lv.6 เชี่ยวชาญ =====
U('daily', 6, 'Phrasal verbs ขั้นสูง', `
put off | เลื่อนออกไป | Don't put off your training. | อย่าผัดวันประกันพรุ่งเรื่องการฝึก
come up with | คิดขึ้นมาได้ | She came up with a great idea. | เธอคิดไอเดียเจ๋งๆ ได้
look into | ตรวจสอบ/สืบดู | The police will look into the case. | ตำรวจจะตรวจสอบคดีนี้
turn down | ปฏิเสธ | He turned down the bribe. | เขาปฏิเสธสินบน
carry out | ดำเนินการ | They carried out the operation. | พวกเขาดำเนินปฏิบัติการ
bring up | ยกขึ้นมาพูด/เลี้ยงดู | Don't bring up that topic. | อย่ายกเรื่องนั้นขึ้นมาพูด
---
figure out | คิดออก/หาทางออก | I can't figure out the answer. | ฉันคิดคำตอบไม่ออก
get along with | เข้ากันได้ | I get along with my team. | ฉันเข้ากับทีมได้ดี
run out of | หมด (ของ) | We ran out of water. | น้ำหมดแล้ว
set up | ตั้ง/จัดตั้ง | They set up a checkpoint. | พวกเขาตั้งด่านตรวจ
hold up | ปล้น/ทำให้ล่าช้า | Two men held up the bank. | ชายสองคนปล้นธนาคาร
make up | แต่งเรื่อง/คืนดี | He made up the whole story. | เขาแต่งเรื่องทั้งหมดขึ้นมา
`);
U('daily', 6, 'คำเชื่อมและศัพท์เชิงวิชาการ', `
perspective | มุมมอง | Try to see it from my perspective. | ลองมองจากมุมของฉันดู
assumption | ข้อสันนิษฐาน | Your assumption is wrong. | ข้อสันนิษฐานของคุณผิด
ambiguous | กำกวม | The instructions were ambiguous. | คำสั่งกำกวม
inevitable | หลีกเลี่ยงไม่ได้ | Change is inevitable. | การเปลี่ยนแปลงเป็นสิ่งหลีกเลี่ยงไม่ได้
comprehensive | ครอบคลุม | We need a comprehensive plan. | เราต้องการแผนที่ครอบคลุม
sustainable | ยั่งยืน | We need sustainable solutions. | เราต้องการทางแก้ที่ยั่งยืน
---
nevertheless | อย่างไรก็ตาม | It was risky; nevertheless, we did it. | มันเสี่ยง แต่เราก็ทำ
furthermore | ยิ่งไปกว่านั้น | Furthermore, the plan is cheap. | ยิ่งไปกว่านั้น แผนนี้ราคาถูก
whereas | ในขณะที่ (เปรียบเทียบ) | He likes tea, whereas I like coffee. | เขาชอบชา ในขณะที่ฉันชอบกาแฟ
consequently | ด้วยเหตุนี้ | He was late; consequently, he missed the bus. | เขามาสาย จึงตกรถ
despite | ทั้งที่/แม้ว่า | Despite the rain, we went out. | แม้ฝนตก เราก็ออกไป
moreover | นอกจากนี้ | Moreover, it saves time. | นอกจากนี้ยังประหยัดเวลา
`);
U('police', 6, 'นิติวิทยาศาสตร์และการสืบสวน', `
forensic | นิติวิทยาศาสตร์ | The forensic team arrived. | ทีมนิติวิทยาศาสตร์มาถึงแล้ว
DNA | ดีเอ็นเอ | DNA matched the suspect. | ดีเอ็นเอตรงกับผู้ต้องสงสัย
autopsy | การชันสูตรศพ | The autopsy showed poisoning. | ผลชันสูตรพบว่าถูกวางยา
trace | ร่องรอย | They found traces of blood. | พวกเขาพบร่องรอยเลือด
tamper | แก้ไข/ยุ่งเกี่ยว (หลักฐาน) | Someone tampered with the evidence. | มีคนยุ่งกับหลักฐาน
circumstantial | (หลักฐาน) แวดล้อม | The evidence is only circumstantial. | หลักฐานเป็นแค่พยานแวดล้อม
---
informant | ผู้ให้ข้อมูล | An informant gave us a tip. | ผู้ให้ข้อมูลส่งเบาะแสมา
cold case | คดีที่ยังไม่คลี่คลาย (นาน) | They reopened a cold case. | พวกเขารื้อคดีเก่าขึ้นมาใหม่
conviction | การตัดสินว่ามีความผิด | The evidence led to a conviction. | หลักฐานนำไปสู่การตัดสินลงโทษ
interrogation | การสอบสวน | The interrogation lasted hours. | การสอบสวนกินเวลาหลายชั่วโมง
eyewitness | ประจักษ์พยาน | An eyewitness saw the crash. | ประจักษ์พยานเห็นการชน
breakthrough | ความคืบหน้าครั้งสำคัญ | DNA was the breakthrough in the case. | ดีเอ็นเอคือจุดพลิกของคดี
`);
U('talk', 6, 'แสลงร่วมสมัย', `
lit | สนุกสุดๆ/ปัง | The party was lit! | ปาร์ตี้ปังมาก
salty | งอน/หงุดหงิด | Why are you so salty? | ทำไมงอนจัง
ghost | หายเงียบ | He ghosted me after the date. | เขาหายเงียบหลังเดต
flex | อวด | Stop flexing your new phone. | เลิกอวดมือถือใหม่ได้แล้ว
low-key | แอบ/นิดๆ | I'm low-key nervous. | แอบตื่นเต้นนิดๆ
vibe | ฟีล/บรรยากาศ | This café has a nice vibe. | ร้านนี้ฟีลดี
---
no cap | ไม่โม้/จริงๆ นะ | That was the best food ever, no cap. | อร่อยที่สุดเลย ไม่โม้
sus | น่าสงสัย | That guy looks sus. | หมอนั่นดูน่าสงสัย
FOMO | กลัวตกกระแส | I went because of FOMO. | ไปเพราะกลัวตกกระแส
cringe | น่าอาย/เขิน | That video is so cringe. | คลิปนั้นน่าอายมาก
slay | ทำได้ปังมาก | You slayed that presentation! | พรีเซนต์ปังมาก!
bet | ได้เลย/จัดไป | See you at 7? Bet. | เจอกันหนึ่งทุ่มนะ ได้เลย
`);
G(6, 'Inversion', 'ขึ้นต้นด้วยคำปฏิเสธ/จำกัด (Never, Rarely, Not only, Hardly, Only then) → กลับกริยาช่วยไว้หน้าประธาน', `
Never ___ such a big crowd. | have I seen | I have seen, I saw, did I saw | Never + กริยาช่วย + ประธาน | ฉันไม่เคยเห็นฝูงชนมากขนาดนี้
Rarely ___ late for work. | is he | he is, does he is, he does | Rarely + be + ประธาน | เขาแทบไม่เคยมาทำงานสาย
Hardly had I arrived ___ the phone rang. | when | than, then, that | Hardly ... when | ฉันเพิ่งมาถึง โทรศัพท์ก็ดังทันที
Only then ___ the truth. | did I realize | I realized, I did realize, realized I | Only then + did + ประธาน + V1 | ตอนนั้นเองฉันจึงรู้ความจริง
Under no circumstances ___ open this door. | should you | you should, you shouldn't, should not you | Under no circumstances + กริยาช่วย + ประธาน | ห้ามเปิดประตูนี้ไม่ว่ากรณีใดๆ
Not until midnight ___ home. | did they come | they came, they did come, came they | Not until + did + ประธาน | พวกเขากลับบ้านตอนเที่ยงคืนนั่นแหละ
`);
G(6, 'Passive ขั้นสูง (It is said that)', 'It is said / believed / reported that ... · ประธาน + is said + to V1 / to have V3', `
It ___ that the suspect has left the country. | is believed | believes, is believing, believed | It + is + V3 + that | เชื่อกันว่าผู้ต้องสงสัยหนีออกนอกประเทศแล้ว
The man is said ___ very rich. | to be | being, be, to been | is said + to V1 | ว่ากันว่าชายคนนั้นรวยมาก
He is reported ___ the money last year. | to have stolen | to steal, stealing, stole | เหตุการณ์อดีต: to have V3 | มีรายงานว่าเขาขโมยเงินเมื่อปีก่อน
It ___ that prices will rise. | is expected | expects, is expecting, expected to | It is expected that | คาดกันว่าราคาจะสูงขึ้น
She is thought ___ in Chiang Mai now. | to be living | to live yesterday, living, lives | กำลังเกิดขึ้น: to be V-ing | เชื่อว่าตอนนี้เธออาศัยอยู่ที่เชียงใหม่
The thieves ___ to have escaped by boat. | are believed | believe, are believing, believed by | ประธานพหูพจน์ + are believed | เชื่อว่าคนร้ายหนีไปทางเรือ
`);
G(6, 'Subjunctive & Cleft', 'It is essential/important that + ประธาน + V1 (ไม่เติม s) · It was ... that ... = เน้นส่วนที่สำคัญ', `
It is essential that every officer ___ the rules. | follow | follows, followed, will follow | that + ประธาน + V1 เสมอ | จำเป็นที่เจ้าหน้าที่ทุกคนต้องทำตามกฎ
The judge insisted that he ___ present. | be | is, was, being | insist that + be | ผู้พิพากษายืนยันว่าเขาต้องมา
I suggest that she ___ a lawyer. | contact | contacts, contacted, will contact | suggest that + V1 | ฉันแนะนำว่าเธอควรติดต่อทนาย
It was the neighbor ___ called the police. | who | which, whose, what | It was + คน + who | เพื่อนบ้านนั่นแหละที่โทรเรียกตำรวจ
It was in 2020 ___ the law changed. | that | which, who, when it | It was + เวลา + that | กฎหมายเปลี่ยนในปี 2020 นั่นเอง
What I need ___ more time. | is | are, have, be | What I need + is | สิ่งที่ฉันต้องการคือเวลาเพิ่ม
`);
D(6, 'สื่อสารกับสื่อมวลชน', `
A: Can you confirm the suspect has been arrested? / B: ___ | I can confirm that a 35-year-old man is in custody. | Yes, I'm the suspect.; No comment, bye forever.; I arrested you. | A: ยืนยันได้ไหมว่าจับผู้ต้องสงสัยได้แล้ว / B: ยืนยันได้ว่าชายอายุ 35 ปีอยู่ในความควบคุมของเรา
A: What was the motive? / B: ___ | It's too early to say. The investigation is ongoing. | Motive is a word.; He liked motives.; Ask him yourself. | A: แรงจูงใจคืออะไร / B: ยังเร็วเกินไปที่จะบอก การสอบสวนยังดำเนินอยู่
A: Is the public in danger? / B: ___ | There is no ongoing threat to the public. | The public is big.; Danger is everywhere, run!; Yes, I'm in danger. | A: ประชาชนตกอยู่ในอันตรายไหม / B: ขณะนี้ไม่มีภัยคุกคามต่อประชาชน
A: Will you release the CCTV footage? / B: ___ | We'll release it once it doesn't affect the case. | Footage is long.; I released it yesterday to my friend.; CCTV is a camera. | A: จะเผยแพร่ภาพจากกล้องวงจรปิดไหม / B: จะเผยแพร่เมื่อไม่กระทบต่อคดี
A: What should witnesses do? / B: ___ | Anyone with information should call our hotline. | Witnesses should run.; Do nothing at all.; They should watch TV. | A: พยานควรทำอย่างไร / B: ใครมีข้อมูลโทรแจ้งสายด่วนของเรา
`);
D(6, 'คุยเล่นแบบเจ้าของภาษา', `
A: How's it going? / B: ___ | Not bad. Pretty busy these days, though. | It's going to Bangkok.; Going is good walking.; I'm going now, bye. | A: เป็นไงบ้าง / B: ก็ดีนะ ช่วงนี้ยุ่งหน่อย
A: Long time no see! / B: ___ | I know! It's been ages. How have you been? | I see you now.; Long time is long.; No, I don't see. | A: ไม่เจอกันนานเลย! / B: ใช่! นานมากเลย สบายดีไหม
A: Guess what? I got the job! / B: ___ | No way! That's amazing. Congrats! | What job?; Guess it again.; I don't guess. | A: รู้อะไรไหม ฉันได้งานแล้ว! / B: จริงดิ! สุดยอด ยินดีด้วย!
A: Want to grab a coffee? / B: ___ | Sure, I could use a break. | Grab it yourself.; Coffee is brown.; I grab every day. | A: ไปหากาแฟกินกันไหม / B: ได้ กำลังอยากพักพอดี
A: I'm so stressed about the exam. / B: ___ | Hang in there. You've got this! | Exams are easy for me.; Stress is a word.; Don't take it. | A: เครียดเรื่องสอบมาก / B: สู้ๆ นะ ทำได้แน่นอน!
`);
R(6, 'บทความวิชาการ', 'Artificial Intelligence in Policing', `Artificial intelligence is increasingly used in policing, from analyzing CCTV footage to predicting where crimes are likely to occur. Proponents argue that such tools allow limited resources to be deployed more efficiently. Nevertheless, critics warn that algorithms trained on biased data may reinforce existing inequalities, unfairly targeting certain communities. Moreover, decisions made by complex systems can be difficult to explain in court. Consequently, many experts insist that AI should support, rather than replace, human judgment.`,
`ปัญญาประดิษฐ์ถูกนำมาใช้ในงานตำรวจมากขึ้น ตั้งแต่วิเคราะห์ภาพกล้องวงจรปิดไปจนถึงคาดการณ์ว่าอาชญากรรมน่าจะเกิดที่ใด ผู้สนับสนุนให้เหตุผลว่าเครื่องมือเหล่านี้ช่วยใช้ทรัพยากรที่มีจำกัดได้อย่างมีประสิทธิภาพ อย่างไรก็ตาม ผู้วิจารณ์เตือนว่าอัลกอริทึมที่ฝึกด้วยข้อมูลที่มีอคติอาจตอกย้ำความไม่เท่าเทียม และเล็งเป้าบางชุมชนอย่างไม่เป็นธรรม นอกจากนี้ การตัดสินใจของระบบที่ซับซ้อนยังอธิบายในศาลได้ยาก ด้วยเหตุนี้ ผู้เชี่ยวชาญจำนวนมากจึงยืนยันว่า AI ควรสนับสนุน ไม่ใช่แทนที่ การตัดสินใจของมนุษย์`, `
According to proponents, AI helps police | use limited resources more efficiently | replace all officers; stop all crime; avoid courts
What is the risk of biased data? | It may unfairly target some communities. | It makes AI faster.; It reduces costs.; It improves privacy.
The word "Consequently" shows | a result | a contrast; an example; a time
What is the writer's main conclusion? | AI should support human judgment. | AI should replace humans.; AI should be banned.; AI is always fair.
`);
R(6, 'บทความวิชาการ', 'The Value of Bilingual Officers', `In an increasingly globalized society, bilingual officers are no longer a luxury but a necessity. Language barriers can delay emergency responses, lead to misunderstandings, and even result in wrongful arrests. Officers who can communicate with victims and witnesses in their own language often obtain more accurate information. Furthermore, they help build trust with migrant and tourist communities, who may otherwise be reluctant to report crimes. Investing in language training, therefore, benefits both the police and the public.`,
`ในสังคมที่เชื่อมโยงกันทั่วโลกมากขึ้น เจ้าหน้าที่ที่พูดได้สองภาษาไม่ใช่ของฟุ่มเฟือยอีกต่อไป แต่เป็นสิ่งจำเป็น อุปสรรคทางภาษาอาจทำให้การตอบสนองเหตุฉุกเฉินล่าช้า เกิดความเข้าใจผิด หรือถึงขั้นจับกุมผิดตัว เจ้าหน้าที่ที่สื่อสารกับผู้เสียหายและพยานด้วยภาษาของพวกเขาได้มักได้ข้อมูลที่แม่นยำกว่า ยิ่งไปกว่านั้น ยังช่วยสร้างความไว้วางใจกับชุมชนแรงงานต่างชาติและนักท่องเที่ยว ซึ่งอาจลังเลที่จะแจ้งความ การลงทุนฝึกภาษาจึงเป็นประโยชน์ทั้งต่อตำรวจและประชาชน`, `
According to the text, bilingual officers are | a necessity | a luxury; unnecessary; too expensive
Which is NOT a problem caused by language barriers? | Higher salaries | Delayed responses; Misunderstandings; Wrongful arrests
The word "reluctant" means | unwilling | happy; quick; required
What does the writer recommend? | Investing in language training | Hiring only foreigners; Ignoring tourists; Using only translators apps
`);

// ===== เพิ่มเติม (ชุดที่ 6): Lv.5–6 =====
U('police', 5, 'ความมั่นคงและอาชญากรรมข้ามชาติ', `
terrorism | การก่อการร้าย | Police work to prevent terrorism. | ตำรวจทำงานเพื่อป้องกันการก่อการร้าย
border | ชายแดน | They patrol the border. | พวกเขาลาดตระเวนตามชายแดน
smuggling | การลักลอบขนของ | Drug smuggling is a serious problem. | การลักลอบขนยาเสพติดเป็นปัญหาร้ายแรง
money laundering | การฟอกเงิน | He was charged with money laundering. | เขาถูกตั้งข้อหาฟอกเงิน
extradite | ส่งตัวข้ามแดน | He was extradited to Thailand. | เขาถูกส่งตัวข้ามแดนกลับไทย
intelligence | ข่าวกรอง | They received intelligence about the plan. | พวกเขาได้รับข่าวกรองเกี่ยวกับแผน
---
counterfeit | ปลอมแปลง | Police seized counterfeit money. | ตำรวจยึดธนบัตรปลอม
network | เครือข่าย | They broke up a criminal network. | พวกเขาทลายเครือข่ายอาชญากรรม
suspect list | รายชื่อผู้ต้องสงสัย | His name is on the suspect list. | ชื่อเขาอยู่ในรายชื่อผู้ต้องสงสัย
cooperation | ความร่วมมือ | International cooperation is essential. | ความร่วมมือระหว่างประเทศเป็นสิ่งจำเป็น
seize | ยึด | Officers seized the drugs. | เจ้าหน้าที่ยึดยาเสพติด
fugitive | ผู้หลบหนี | The fugitive was caught in Laos. | ผู้หลบหนีถูกจับได้ที่ลาว
`);
U('daily', 5, 'สุขภาพและการแพทย์', `
symptom | อาการ | What are your symptoms? | คุณมีอาการอย่างไร
diagnosis | การวินิจฉัย | The doctor made a diagnosis. | แพทย์วินิจฉัยโรคแล้ว
prescription | ใบสั่งยา | You need a prescription. | คุณต้องมีใบสั่งยา
treatment | การรักษา | The treatment worked well. | การรักษาได้ผลดี
recover | ฟื้นตัว | He recovered quickly. | เขาฟื้นตัวเร็ว
infection | การติดเชื้อ | The wound has an infection. | แผลติดเชื้อ
---
injection | การฉีดยา | The nurse gave him an injection. | พยาบาลฉีดยาให้เขา
emergency room | ห้องฉุกเฉิน | Take him to the emergency room. | พาเขาไปห้องฉุกเฉิน
surgery | การผ่าตัด | She needs surgery. | เธอต้องผ่าตัด
allergic | แพ้ | I'm allergic to seafood. | ฉันแพ้อาหารทะเล
blood pressure | ความดันโลหิต | Check your blood pressure. | วัดความดันโลหิต
mental health | สุขภาพจิต | Mental health is important. | สุขภาพจิตสำคัญ
`);
U('talk', 5, 'การโน้มน้าวและนำเสนอ', `
persuade | โน้มน้าว | I tried to persuade him. | ฉันพยายามโน้มน้าวเขา
convince | ทำให้เชื่อ | She convinced me to try. | เธอทำให้ฉันยอมลอง
argument | ข้อโต้แย้ง | That's a strong argument. | นั่นเป็นข้อโต้แย้งที่หนักแน่น
evidence | หลักฐาน | Do you have evidence for that? | คุณมีหลักฐานไหม
point out | ชี้ให้เห็น | I'd like to point out one problem. | ขอชี้ให้เห็นปัญหาหนึ่ง
emphasize | เน้นย้ำ | I want to emphasize safety. | ฉันอยากเน้นย้ำเรื่องความปลอดภัย
---
in addition | นอกจากนี้ | In addition, it is cheaper. | นอกจากนี้ยังถูกกว่า
on the other hand | ในทางกลับกัน | On the other hand, it takes time. | ในทางกลับกัน มันใช้เวลา
to sum up | สรุปแล้ว | To sum up, we need more officers. | สรุปแล้ว เราต้องการเจ้าหน้าที่เพิ่ม
in my view | ในมุมมองของฉัน | In my view, this plan works. | ในมุมมองของฉัน แผนนี้ใช้ได้
advantage | ข้อดี | What are the advantages? | ข้อดีมีอะไรบ้าง
disadvantage | ข้อเสีย | The main disadvantage is cost. | ข้อเสียหลักคือค่าใช้จ่าย
`);
U('daily', 5, 'Phrasal verbs ชีวิตประจำวัน 2', `
show up | มาถึง/โผล่มา | He didn't show up. | เขาไม่มา
calm down | ใจเย็นลง | Please calm down. | กรุณาใจเย็นๆ
check in | เช็คอิน | We checked in at noon. | เราเช็คอินตอนเที่ยง
break down | (รถ) เสีย | My car broke down. | รถฉันเสีย
go through | ผ่าน (ความยาก)/ตรวจดู | She went through a hard time. | เธอผ่านช่วงเวลาที่ยากลำบาก
take over | รับช่วงต่อ | Who will take over the case? | ใครจะรับช่วงคดีนี้ต่อ
---
hand in | ส่ง (งาน) | Hand in your report by Friday. | ส่งรายงานภายในวันศุกร์
point out | ชี้ให้เห็น | He pointed out the mistake. | เขาชี้ข้อผิดพลาดให้เห็น
come across | พบโดยบังเอิญ | I came across an old photo. | ฉันเจอรูปเก่าโดยบังเอิญ
deal with | จัดการกับ | We must deal with this problem. | เราต้องจัดการปัญหานี้
end up | ลงเอย | We ended up at the station. | เราลงเอยที่สถานี
keep up with | ตามทัน | It's hard to keep up with the news. | ตามข่าวให้ทันยาก
`);
G(5, 'Participle clauses', 'ย่อประโยค: V-ing = ทำเอง (กริยาเกิดพร้อม/ก่อน) · V3 = ถูกกระทำ · Having V3 = ทำเสร็จก่อน', `
___ the police, the thief ran away. | Seeing | Seen, Saw, To seeing | ขโมยเห็นเอง ใช้ V-ing | เมื่อเห็นตำรวจ ขโมยก็วิ่งหนี
___ in 1990, the building is very old. | Built | Building, Build, Having building | อาคารถูกสร้าง ใช้ V3 | อาคารที่สร้างในปี 1990 นี้เก่ามาก
___ finished the report, he went home. | Having | Have, Had, Being | Having + V3 = ทำเสร็จก่อน | หลังทำรายงานเสร็จ เขาก็กลับบ้าน
The man ___ near the door is my boss. | standing | stood, stands, to stand | ขยายคำนาม (กำลังยืน) | ผู้ชายที่ยืนใกล้ประตูคือหัวหน้าฉัน
The car ___ last night was found. | stolen | stealing, stole, steal | ขยายคำนาม (ถูกขโมย) | รถที่ถูกขโมยเมื่อคืนถูกพบแล้ว
___ tired, she went to bed early. | Feeling | Felt, Feel, To feel | V-ing บอกเหตุผล | เพราะรู้สึกเหนื่อย เธอจึงเข้านอนเร็ว
`);
G(5, 'Linking words: although / despite / however', 'although + ประโยค · despite / in spite of + นาม/V-ing · however, + ประโยคใหม่', `
___ it was raining, we went out. | Although | Despite, However, In spite | although + ประโยค | แม้ว่าฝนตก เราก็ออกไป
___ the rain, we went out. | Despite | Although, However, Even | despite + นาม | แม้ฝนตก เราก็ออกไป
He studied hard. ___, he failed. | However | Although, Despite, Because | however + คอมมา + ประโยคใหม่ | เขาตั้งใจเรียน อย่างไรก็ตามเขาสอบตก
In spite of ___ tired, she kept working. | being | she was, be, been | in spite of + V-ing | ทั้งที่เหนื่อย เธอก็ทำงานต่อ
She passed ___ she didn't study much. | even though | despite, however, in spite of | even though + ประโยค | เธอสอบผ่านทั้งที่ไม่ค่อยได้อ่าน
___ his age, he runs very fast. | Despite | Although, However, Even though | despite + นาม | แม้อายุมาก เขาวิ่งเร็วมาก
`);
G(5, 'Future Perfect & Future Continuous', 'will be + V-ing = กำลังทำอยู่ ณ เวลาในอนาคต · will have + V3 = จะทำเสร็จแล้วก่อนเวลาในอนาคต', `
This time tomorrow, I ___ on the beach. | will be lying | will lie, will have lain, am lying | กำลังทำอยู่ในอนาคต | พรุ่งนี้เวลานี้ฉันจะนอนอยู่บนชายหาด
By 2030, he ___ for the police for ten years. | will have worked | will work, will be work, works | By + อนาคต = ทำเสร็จ/ครบแล้ว | ถึงปี 2030 เขาจะทำงานตำรวจครบสิบปี
Don't call at 8. We ___ dinner. | will be having | will have had, have, had | กำลังทำ ณ ตอนนั้น | อย่าโทรตอนสองทุ่ม ตอนนั้นเรากำลังกินข้าว
By the time you arrive, I ___ the report. | will have finished | will finish, finish, am finishing | By the time = เสร็จก่อน | กว่าคุณจะมา ฉันคงทำรายงานเสร็จแล้ว
At noon, she ___ her exam. | will be taking | will have take, takes, took | กำลังทำตอนเที่ยง | ตอนเที่ยงเธอจะกำลังสอบอยู่
Will you ___ the car tomorrow? | be using | have using, using, used | ถามแผนอย่างสุภาพ | พรุ่งนี้คุณจะใช้รถไหม
`);
D(5, 'แสดงความเห็นในที่ประชุม', `
A: What do you think about the new plan? / B: ___ | Overall it's good, but I'm concerned about the cost. | I think it's a plan.; New is new.; I don't think, sorry. | A: คุณคิดอย่างไรกับแผนใหม่ / B: โดยรวมดี แต่ผมกังวลเรื่องค่าใช้จ่าย
A: Could you explain that in more detail? / B: ___ | Sure. Let me give you an example. | Detail is small.; No, it's enough.; Explain it yourself. | A: ช่วยอธิบายละเอียดกว่านี้ได้ไหม / B: ได้ครับ ขอยกตัวอย่าง
A: I'm afraid I don't agree. / B: ___ | That's fair. What would you suggest instead? | Don't be afraid.; Agree with me now.; You're wrong forever. | A: ผมเกรงว่าจะไม่เห็นด้วย / B: เข้าใจครับ แล้วคุณจะเสนออะไรแทน
A: Let's move on to the next point. / B: ___ | Before we do, can I add one thing? | Point is sharp.; Move your car.; Next is next. | A: ไปประเด็นถัดไปกัน / B: ก่อนไป ขอเพิ่มอีกเรื่องได้ไหม
A: So, do we all agree? / B: ___ | Yes, I think we've reached a decision. | We are all here.; Agree is a word.; I agree to disagree to agree. | A: สรุปเห็นด้วยกันหมดไหม / B: ครับ คิดว่าเราได้ข้อสรุปแล้ว
`);
R(5, 'บทความวิเคราะห์', 'Social Media and Crime', `Social media has changed the way crimes are committed and solved. Criminals use online platforms to sell illegal goods, recruit members, and deceive victims. At the same time, the police increasingly rely on public posts to identify suspects and track their movements. In several recent cases, videos shared by ordinary citizens provided the key evidence. However, investigators must verify such material carefully, since images can be edited or taken out of context.`,
`โซเชียลมีเดียเปลี่ยนวิธีการก่อและคลี่คลายอาชญากรรม คนร้ายใช้แพลตฟอร์มออนไลน์ขายของผิดกฎหมาย ชักชวนสมาชิก และหลอกลวงเหยื่อ ในขณะเดียวกัน ตำรวจก็พึ่งพาโพสต์สาธารณะในการระบุตัวผู้ต้องสงสัยและติดตามความเคลื่อนไหวมากขึ้น ในหลายคดีล่าสุด วิดีโอที่ประชาชนทั่วไปแชร์กลายเป็นหลักฐานสำคัญ อย่างไรก็ตาม ผู้สืบสวนต้องตรวจสอบข้อมูลเหล่านี้อย่างรอบคอบ เพราะภาพอาจถูกตัดต่อหรือนำมาใช้ผิดบริบท`, `
How do criminals use social media? | To sell illegal goods and deceive victims | To report crimes; To help police; To teach English
What did ordinary citizens provide in some cases? | Key evidence | Money; Weapons; Lawyers
Why must investigators verify material carefully? | Images can be edited. | Videos are too long.; Posts are expensive.; Citizens are always wrong.
The phrase "out of context" means | without the surrounding situation | in the wrong country; too old; very clear
`);
U('police', 6, 'กฎหมายและสิทธิขั้นสูง', `
due process | กระบวนการที่ชอบด้วยกฎหมาย | Everyone deserves due process. | ทุกคนควรได้รับกระบวนการที่ชอบด้วยกฎหมาย
presumption of innocence | หลักสันนิษฐานว่าบริสุทธิ์ | The law respects the presumption of innocence. | กฎหมายเคารพหลักสันนิษฐานว่าบริสุทธิ์
warrantless | โดยไม่มีหมาย | Warrantless searches are limited. | การค้นโดยไม่มีหมายถูกจำกัด
admissible | (หลักฐาน) รับฟังได้ | The evidence was not admissible. | หลักฐานนั้นรับฟังไม่ได้
statute | บทบัญญัติกฎหมาย | The statute was changed in 2019. | บทบัญญัติกฎหมายถูกแก้ในปี 2019
liability | ความรับผิด | The company accepted liability. | บริษัทยอมรับความรับผิด
---
negligence | ความประมาท | He was charged with negligence. | เขาถูกตั้งข้อหาประมาท
misconduct | การประพฤติมิชอบ | The officer was fired for misconduct. | เจ้าหน้าที่ถูกไล่ออกเพราะประพฤติมิชอบ
accountability | ความรับผิดชอบที่ตรวจสอบได้ | The public demands accountability. | ประชาชนเรียกร้องความรับผิดชอบ
impartial | เป็นกลาง | A judge must be impartial. | ผู้พิพากษาต้องเป็นกลาง
infringe | ละเมิด (สิทธิ) | Don't infringe on people's rights. | อย่าละเมิดสิทธิของประชาชน
mandate | อำนาจหน้าที่/คำสั่ง | Police have a mandate to protect. | ตำรวจมีหน้าที่ปกป้อง
`);
U('daily', 6, 'คำคุณศัพท์ขั้นสูง', `
meticulous | ละเอียดถี่ถ้วน | She is meticulous in her work. | เธอทำงานละเอียดถี่ถ้วน
resilient | ฟื้นตัวเก่ง/ไม่ย่อท้อ | He is resilient under pressure. | เขาไม่ย่อท้อแม้ถูกกดดัน
diligent | ขยันหมั่นเพียร | A diligent student studies daily. | นักเรียนที่ขยันจะอ่านทุกวัน
reluctant | ลังเล/ไม่เต็มใจ | He was reluctant to talk. | เขาไม่ค่อยเต็มใจพูด
vulnerable | เปราะบาง | Children are vulnerable. | เด็กเป็นกลุ่มเปราะบาง
crucial | สำคัญยิ่ง | Timing is crucial. | จังหวะเวลาสำคัญมาก
---
genuine | แท้/จริงใจ | Is this a genuine signature? | ลายเซ็นนี้ของจริงไหม
hostile | เป็นศัตรู/ไม่เป็นมิตร | The crowd became hostile. | ฝูงชนเริ่มก้าวร้าว
consistent | สม่ำเสมอ/สอดคล้อง | His story is not consistent. | เรื่องของเขาไม่สอดคล้องกัน
thorough | ละเอียดทั่วถึง | We need a thorough search. | เราต้องค้นอย่างละเอียด
reckless | สะเพร่า/ประมาทเลินเล่อ | That was reckless driving. | นั่นคือการขับขี่ที่ประมาท
transparent | โปร่งใส | The process must be transparent. | กระบวนการต้องโปร่งใส
`);
U('talk', 6, 'สำนวนขั้นสูง 2', `
a blessing in disguise | เรื่องร้ายที่กลายเป็นดี | Losing that job was a blessing in disguise. | การตกงานนั้นกลายเป็นเรื่องดี
the tip of the iceberg | แค่ส่วนเล็กๆ ที่เห็น | This case is just the tip of the iceberg. | คดีนี้เป็นแค่ยอดภูเขาน้ำแข็ง
get out of hand | ควบคุมไม่ได้ | The situation got out of hand. | สถานการณ์ควบคุมไม่ได้
a wake-up call | สัญญาณเตือนให้ตื่นตัว | The accident was a wake-up call. | อุบัติเหตุเป็นสัญญาณเตือน
go the extra mile | ทุ่มเทเกินหน้าที่ | Good officers go the extra mile. | ตำรวจที่ดีทุ่มเทเกินหน้าที่
read between the lines | อ่านนัยแฝง | Read between the lines of his statement. | อ่านนัยแฝงในคำให้การของเขา
---
jump to conclusions | ด่วนสรุป | Don't jump to conclusions. | อย่าด่วนสรุป
the benefit of the doubt | ยกประโยชน์แห่งความสงสัย | Give him the benefit of the doubt. | ยกประโยชน์แห่งความสงสัยให้เขา
think outside the box | คิดนอกกรอบ | We need to think outside the box. | เราต้องคิดนอกกรอบ
on the same wavelength | คิดตรงกัน | We're on the same wavelength. | เราคิดตรงกัน
bite off more than you can chew | รับงานเกินตัว | Don't bite off more than you can chew. | อย่ารับงานเกินตัว
keep a low profile | เก็บตัวเงียบ | The suspect is keeping a low profile. | ผู้ต้องสงสัยเก็บตัวเงียบ
`);
U('daily', 6, 'ศัพท์สังคมและเศรษฐกิจ', `
inequality | ความเหลื่อมล้ำ | Inequality is a global issue. | ความเหลื่อมล้ำเป็นปัญหาระดับโลก
urbanization | การกลายเป็นเมือง | Urbanization is changing villages. | การขยายตัวของเมืองกำลังเปลี่ยนหมู่บ้าน
infrastructure | โครงสร้างพื้นฐาน | The city needs better infrastructure. | เมืองต้องการโครงสร้างพื้นฐานที่ดีกว่านี้
welfare | สวัสดิการ | The government improved social welfare. | รัฐบาลปรับปรุงสวัสดิการสังคม
migration | การย้ายถิ่น | Migration affects the labor market. | การย้ายถิ่นส่งผลต่อตลาดแรงงาน
regulation | การกำกับดูแล | Stronger regulation is needed. | ต้องการการกำกับดูแลที่เข้มงวดขึ้น
---
recession | ภาวะเศรษฐกิจถดถอย | The country is in a recession. | ประเทศอยู่ในภาวะเศรษฐกิจถดถอย
investment | การลงทุน | Foreign investment is growing. | การลงทุนจากต่างชาติกำลังเพิ่มขึ้น
corruption | การคอร์รัปชัน | Corruption damages trust. | คอร์รัปชันทำลายความไว้วางใจ
transparency | ความโปร่งใส | We need more transparency. | เราต้องการความโปร่งใสมากขึ้น
priority | สิ่งสำคัญอันดับแรก | Education should be a priority. | การศึกษาควรเป็นเรื่องสำคัญอันดับแรก
impact | ผลกระทบ | The impact was huge. | ผลกระทบใหญ่มาก
`);
G(6, 'Advanced modals', 'needn\'t have V3 = ทำไปแล้วโดยไม่จำเป็น · could have V3 = (ตอนนั้น) ทำได้แต่ไม่ได้ทำ · can\'t have V3 = เป็นไปไม่ได้ว่า (อดีต)', `
You ___ brought food. We have plenty. | needn't have | mustn't have, can't have, shouldn't | ทำไปแล้วแต่ไม่จำเป็น | คุณไม่จำเป็นต้องเอาอาหารมาก็ได้ เรามีเยอะ
He ___ been the thief. He was with me. | can't have | mustn't have, needn't have, shouldn't | เป็นไปไม่ได้ (อดีต) | เขาไม่น่าใช่ขโมย เขาอยู่กับฉัน
You ___ called me! I would have helped. | could have | can have, must, will have | ทำได้แต่ไม่ได้ทำ | คุณน่าจะโทรหาฉัน ฉันจะได้ช่วย
She ___ forgotten. She never forgets. | can't have | must have, should have, would | ไม่น่าเป็นไปได้ | เธอไม่น่าลืม เธอไม่เคยลืม
They ___ left early. The lights are off. | must have | can't have, needn't have, shouldn't | มั่นใจว่าเกิดแล้ว | พวกเขาคงออกไปแล้ว ไฟปิดอยู่
We ___ worried. Everything was fine. | needn't have | mustn't have, can't have, wouldn't | กังวลไปเปล่าๆ | เราไม่น่ากังวลเลย ทุกอย่างเรียบร้อยดี
`);
G(6, 'Nominalization & formal style', 'ภาษาทางการนิยมใช้คำนาม: decide → decision · investigate → investigation · ใช้ The + นาม + of', `
The ___ of the case took two years. | investigation | investigate, investigating, investigated | ใช้คำนามหลัง the | การสืบสวนคดีนี้ใช้เวลาสองปี
His ___ to resign surprised everyone. | decision | decide, decided, deciding | คำนามของ decide | การตัดสินใจลาออกของเขาทำให้ทุกคนแปลกใจ
The ___ of the new law is next month. | introduction | introduce, introducing, introduced | คำนามของ introduce | การบังคับใช้กฎหมายใหม่คือเดือนหน้า
There has been a sharp ___ in crime. | increase | increasing, increased, increases | a + คำนาม | อาชญากรรมเพิ่มขึ้นอย่างมาก
We appreciate your ___. | cooperation | cooperate, cooperative, cooperating | หลัง your ใช้คำนาม | เราขอบคุณสำหรับความร่วมมือ
The ___ of evidence led to his release. | absence | absent, absently, absences of | the + คำนาม + of | การไม่มีหลักฐานทำให้เขาได้รับการปล่อยตัว
`);
D(6, 'การเจรจาต่อรองในสถานการณ์วิกฤต', `
A: Nobody come closer! / B: ___ | Okay, I'm staying right here. Let's just talk. | Come here now!; I'm coming closer.; You can't stop me. | A: ห้ามใครเข้ามาใกล้! / B: โอเค ผมอยู่ตรงนี้ มาคุยกันก่อน
A: Nobody listens to me. / B: ___ | I'm listening now. Tell me what happened. | That's not true.; Talk to someone else.; I'm busy. | A: ไม่มีใครฟังผมเลย / B: ตอนนี้ผมฟังอยู่ เล่าให้ฟังหน่อยว่าเกิดอะไรขึ้น
A: I want a car and no police. / B: ___ | I hear you. Let me see what I can do, but first, is everyone safe? | Sure, take my car.; No way, never.; Police are everywhere, ha. | A: ผมต้องการรถและไม่มีตำรวจ / B: ผมได้ยินแล้ว ขอดูว่าทำอะไรได้บ้าง แต่ก่อนอื่น ทุกคนปลอดภัยไหม
A: Why should I trust you? / B: ___ | Because I've been honest with you, and I want this to end safely. | You shouldn't.; Trust is cheap.; Because I'm the boss. | A: ทำไมผมต้องเชื่อคุณ / B: เพราะผมพูดตรงกับคุณมาตลอด และอยากให้เรื่องนี้จบอย่างปลอดภัย
A: If I come out, what happens to me? / B: ___ | You'll be treated fairly, and you can tell your side of the story. | You'll go to prison forever.; Nothing, go home.; I don't know, bye. | A: ถ้าผมออกไป จะเกิดอะไรขึ้น / B: คุณจะได้รับการปฏิบัติอย่างเป็นธรรม และได้เล่าเรื่องในมุมของคุณ
`);
R(6, 'บทความวิชาการ', 'Restorative Justice', `Traditional justice systems focus primarily on punishing offenders. Restorative justice, by contrast, aims to repair the harm caused by crime by bringing victims, offenders, and communities together. Through facilitated meetings, offenders are encouraged to acknowledge the consequences of their actions and make amends. Research suggests that this approach can reduce reoffending and increase victim satisfaction. Nevertheless, it is not suitable for every case, particularly those involving serious violence or significant power imbalances.`,
`ระบบยุติธรรมแบบดั้งเดิมเน้นการลงโทษผู้กระทำผิดเป็นหลัก ในทางตรงข้าม ยุติธรรมเชิงสมานฉันท์มุ่งเยียวยาความเสียหายจากอาชญากรรม โดยนำผู้เสียหาย ผู้กระทำผิด และชุมชนมาพบกัน ผ่านการประชุมที่มีผู้ดำเนินการ ผู้กระทำผิดได้รับการส่งเสริมให้ยอมรับผลจากการกระทำและชดใช้ งานวิจัยชี้ว่าแนวทางนี้ลดการกระทำผิดซ้ำและเพิ่มความพึงพอใจของผู้เสียหาย อย่างไรก็ตาม ไม่เหมาะกับทุกคดี โดยเฉพาะคดีที่มีความรุนแรงร้ายแรงหรือมีความไม่เท่าเทียมทางอำนาจอย่างมาก`, `
What do traditional justice systems mainly focus on? | Punishing offenders | Helping communities; Paying victims; Educating police
What is the main aim of restorative justice? | To repair the harm caused by crime | To punish more strictly; To replace courts; To free all prisoners
According to research, restorative justice can | reduce reoffending | increase crime; remove victims; end all violence
"make amends" is closest in meaning to | make up for a wrong | make a promise; make an arrest; make money
`);

// ===== เพิ่มเติม (ชุดที่ 7): คำศัพท์ทุกเลเวล =====
U('daily', 1, 'ในห้องเรียน', `
desk | โต๊ะเรียน | Put your bag under the desk. | วางกระเป๋าไว้ใต้โต๊ะ
paper | กระดาษ | Give me a piece of paper. | ขอกระดาษหนึ่งแผ่น
pencil | ดินสอ | Write with a pencil. | เขียนด้วยดินสอ
homework | การบ้าน | Did you do your homework? | ทำการบ้านหรือยัง
lesson | บทเรียน | Today's lesson is easy. | บทเรียนวันนี้ง่าย
question | คำถาม | Can I ask a question? | ขอถามได้ไหม
---
answer | คำตอบ/ตอบ | Answer the question. | ตอบคำถาม
test | การทดสอบ | We have a test tomorrow. | พรุ่งนี้มีสอบ
class | ชั้นเรียน | The class starts at nine. | ชั้นเรียนเริ่มเก้าโมง
board | กระดาน | Look at the board. | ดูที่กระดาน
page | หน้า (หนังสือ) | Open your book to page ten. | เปิดหนังสือหน้าสิบ
word | คำ | What does this word mean? | คำนี้แปลว่าอะไร
`);
U('daily', 1, 'รสชาติและการทำอาหาร', `
salty | เค็ม | The soup is too salty. | ซุปเค็มเกินไป
sour | เปรี้ยว | Lime is sour. | มะนาวเปรี้ยว
bitter | ขม | This coffee is bitter. | กาแฟนี้ขม
boil | ต้ม | Boil the water first. | ต้มน้ำก่อน
fry | ทอด | Fry the eggs. | ทอดไข่
grill | ย่าง | We grill chicken on Sunday. | เราย่างไก่วันอาทิตย์
---
cut | หั่น/ตัด | Cut the vegetables. | หั่นผัก
mix | ผสม | Mix the sugar and milk. | ผสมน้ำตาลกับนม
pour | เท | Pour the water into the cup. | เทน้ำลงในแก้ว
bowl | ชาม | A bowl of rice, please. | ขอข้าวหนึ่งชาม
plate | จาน | Put it on the plate. | วางบนจาน
spoon | ช้อน | I need a spoon. | ฉันต้องการช้อน
`);
U('daily', 1, 'ตำแหน่งที่ตั้ง', `
in front of | ข้างหน้า | The car is in front of the house. | รถอยู่หน้าบ้าน
behind | ข้างหลัง | The cat is behind the door. | แมวอยู่หลังประตู
next to | ข้างๆ | The bank is next to the school. | ธนาคารอยู่ข้างโรงเรียน
between | ระหว่าง | The shop is between two banks. | ร้านอยู่ระหว่างธนาคารสองแห่ง
under | ใต้ | The keys are under the table. | กุญแจอยู่ใต้โต๊ะ
above | เหนือ | The clock is above the door. | นาฬิกาอยู่เหนือประตู
---
inside | ข้างใน | Wait inside. | รอข้างใน
outside | ข้างนอก | It's cold outside. | ข้างนอกหนาว
opposite | ตรงข้าม | The police station is opposite the market. | สถานีตำรวจอยู่ตรงข้ามตลาด
top | ด้านบน | Write your name at the top. | เขียนชื่อไว้ด้านบน
bottom | ด้านล่าง | Sign at the bottom. | เซ็นชื่อด้านล่าง
around | รอบๆ | Look around. | มองไปรอบๆ
`);
U('police', 1, 'คำสั่งที่ใช้บ่อย', `
stop | หยุด | Stop the car! | หยุดรถ!
wait | รอ | Wait here, please. | รอตรงนี้
follow | ตาม | Follow me. | ตามผมมา
show | แสดง/ให้ดู | Show me your hands. | ให้ดูมือ
turn around | หันหลัง | Turn around slowly. | หันหลังช้าๆ
get down | หมอบลง | Get down on the ground! | หมอบลงกับพื้น!
---
step back | ถอยหลัง | Please step back. | กรุณาถอยหลัง
come with me | มากับผม | Please come with me. | กรุณามากับผม
don't move | อย่าขยับ | Don't move! | อย่าขยับ!
hands up | ยกมือขึ้น | Hands up! | ยกมือขึ้น!
calm down | ใจเย็น | Calm down, sir. | ใจเย็นครับคุณ
let me see | ขอดู | Let me see your ID. | ขอดูบัตรประชาชนหน่อย
`);
U('daily', 2, 'ธรรมชาติ', `
mountain | ภูเขา | We climbed the mountain. | เราปีนภูเขา
river | แม่น้ำ | The river is long. | แม่น้ำยาว
sea | ทะเล | I love the sea. | ฉันรักทะเล
forest | ป่า | Don't get lost in the forest. | อย่าหลงในป่า
island | เกาะ | Phuket is an island. | ภูเก็ตเป็นเกาะ
beach | ชายหาด | Let's go to the beach. | ไปชายหาดกันเถอะ
---
sky | ท้องฟ้า | The sky is clear. | ท้องฟ้าแจ่มใส
sun | ดวงอาทิตย์ | The sun is hot. | แดดร้อน
moon | ดวงจันทร์ | The moon is bright tonight. | คืนนี้พระจันทร์สว่าง
star | ดาว | I can see many stars. | ฉันเห็นดาวมากมาย
tree | ต้นไม้ | Sit under the tree. | นั่งใต้ต้นไม้
flower | ดอกไม้ | She bought flowers. | เธอซื้อดอกไม้
`);
U('daily', 2, 'ญาติและความสัมพันธ์', `
boyfriend | แฟน (ชาย) | Her boyfriend is a soldier. | แฟนของเธอเป็นทหาร
girlfriend | แฟน (หญิง) | His girlfriend is kind. | แฟนของเขาใจดี
couple | คู่รัก | They are a happy couple. | พวกเขาเป็นคู่รักที่มีความสุข
wedding | งานแต่งงาน | We went to their wedding. | เราไปงานแต่งงานของพวกเขา
divorce | หย่า | They got divorced. | พวกเขาหย่ากัน
relative | ญาติ | I visit my relatives. | ฉันไปเยี่ยมญาติ
---
cousin | ลูกพี่ลูกน้อง | My cousin lives in Bangkok. | ลูกพี่ลูกน้องฉันอยู่กรุงเทพฯ
uncle | ลุง/น้า/อา (ชาย) | My uncle is a police officer. | ลุงของฉันเป็นตำรวจ
aunt | ป้า/น้า/อา (หญิง) | My aunt cooks well. | ป้าของฉันทำอาหารเก่ง
grandparents | ปู่ย่าตายาย | I love my grandparents. | ฉันรักปู่ย่าตายาย
nephew | หลานชาย | My nephew is five. | หลานชายอายุห้าขวบ
son | ลูกชาย | Her son is a student. | ลูกชายของเธอเป็นนักเรียน
`);
U('police', 2, 'ด่านตรวจและการเรียกตรวจ', `
pull over | จอดข้างทาง | Please pull over here. | กรุณาจอดข้างทางตรงนี้
step out | ลงจากรถ | Please step out of the car. | กรุณาลงจากรถ
seat belt | เข็มขัดนิรภัย | Fasten your seat belt. | คาดเข็มขัดนิรภัย
registration | ทะเบียนรถ | Show me the car registration. | ขอดูเล่มทะเบียนรถ
insurance | ประกัน | Do you have insurance? | คุณมีประกันไหม
breathalyzer | เครื่องเป่าแอลกอฮอล์ | Blow into the breathalyzer. | เป่าเครื่องวัดแอลกอฮอล์
---
inspect | ตรวจสอบ | We need to inspect the car. | เราต้องตรวจรถ
trunk | ท้ายรถ | Open the trunk, please. | กรุณาเปิดท้ายรถ
engine | เครื่องยนต์ | Turn off the engine. | ดับเครื่องยนต์
proceed | ไปต่อ/ดำเนินการ | You may proceed. | ไปต่อได้
violation | การฝ่าฝืน | It's a traffic violation. | เป็นการฝ่าฝืนกฎจราจร
ticket | ใบสั่ง | I'll give you a ticket. | ผมจะออกใบสั่งให้
`);
U('talk', 2, 'แสดงความรู้สึกและความคิด', `
I think | ฉันคิดว่า | I think it's a good idea. | ฉันคิดว่าเป็นความคิดที่ดี
I believe | ฉันเชื่อว่า | I believe you. | ฉันเชื่อคุณ
I guess | ฉันเดาว่า | I guess he's late. | ฉันเดาว่าเขามาสาย
I'm not sure | ฉันไม่แน่ใจ | I'm not sure about that. | ฉันไม่แน่ใจเรื่องนั้น
actually | จริงๆ แล้ว | Actually, I'm a teacher. | จริงๆ แล้วฉันเป็นครู
in fact | ที่จริงแล้ว | In fact, it was easy. | ที่จริงมันง่าย
---
definitely | แน่นอน | I will definitely come. | ฉันจะมาแน่นอน
absolutely | อย่างแน่นอน/เห็นด้วยเต็มที่ | Absolutely, you're right. | แน่นอน คุณพูดถูก
no doubt | ไม่ต้องสงสัย | No doubt he will win. | ไม่ต้องสงสัยว่าเขาจะชนะ
I hope | ฉันหวังว่า | I hope you pass. | ฉันหวังว่าคุณจะสอบผ่าน
I'm afraid | ฉันเกรงว่า | I'm afraid I can't help. | ฉันเกรงว่าช่วยไม่ได้
it seems | ดูเหมือนว่า | It seems easy. | ดูเหมือนจะง่าย
`);
U('daily', 3, 'การท่องเที่ยว', `
sightseeing | การเที่ยวชมสถานที่ | We went sightseeing in Ayutthaya. | เราไปเที่ยวชมอยุธยา
souvenir | ของที่ระลึก | I bought a souvenir. | ฉันซื้อของที่ระลึก
guide | ไกด์/มัคคุเทศก์ | Our guide speaks English. | ไกด์ของเราพูดภาษาอังกฤษ
tour | ทัวร์ | We joined a city tour. | เราเข้าร่วมทัวร์ชมเมือง
itinerary | แผนการเดินทาง | Here is the itinerary. | นี่คือแผนการเดินทาง
reservation | การจอง | I have a reservation. | ฉันจองไว้แล้ว
---
currency | สกุลเงิน | What currency do they use? | เขาใช้สกุลเงินอะไร
exchange rate | อัตราแลกเปลี่ยน | The exchange rate is good today. | อัตราแลกเปลี่ยนวันนี้ดี
departure | การออกเดินทาง | Departure is at 10. | ออกเดินทางสิบโมง
arrival | การมาถึง | Check the arrival time. | ตรวจเวลามาถึง
customs | ศุลกากร | Go through customs. | ผ่านด่านศุลกากร
visa | วีซ่า | Do I need a visa? | ฉันต้องใช้วีซ่าไหม
`);
U('daily', 3, 'ที่ทำงานในสำนักงาน', `
printer | เครื่องพิมพ์ | The printer is broken. | เครื่องพิมพ์เสีย
file | แฟ้ม/ไฟล์ | Send me the file. | ส่งไฟล์มาให้หน่อย
folder | แฟ้มเอกสาร | Put it in the folder. | ใส่ไว้ในแฟ้ม
meeting room | ห้องประชุม | The meeting room is full. | ห้องประชุมเต็ม
extension | เบอร์ต่อภายใน | Call extension 204. | โทรเบอร์ต่อ 204
staff | พนักงาน | All staff must attend. | พนักงานทุกคนต้องเข้าร่วม
---
overtime | ล่วงเวลา | I worked overtime yesterday. | เมื่อวานฉันทำโอที
shift | กะ (การทำงาน) | My shift starts at six. | กะของฉันเริ่มหกโมง
day off | วันหยุด | Tomorrow is my day off. | พรุ่งนี้เป็นวันหยุดของฉัน
leave | ลา (งาน) | She is on sick leave. | เธอลาป่วย
report to | รายงานต่อ | I report to the chief. | ฉันรายงานต่อหัวหน้า
memo | บันทึกข้อความ | Read the memo. | อ่านบันทึกข้อความ
`);
U('police', 3, 'ตามหาบุคคลสูญหาย', `
last seen | เห็นครั้งสุดท้าย | She was last seen at the mall. | เห็นเธอครั้งสุดท้ายที่ห้าง
height | ส่วนสูง | What is his height? | เขาสูงเท่าไหร่
weight | น้ำหนัก | His weight is about 70 kilos. | น้ำหนักประมาณ 70 กิโล
clothing | เสื้อผ้า/การแต่งกาย | Describe her clothing. | บรรยายการแต่งกายของเธอ
recent photo | รูปล่าสุด | Do you have a recent photo? | มีรูปล่าสุดไหม
hotline | สายด่วน | Call the hotline. | โทรสายด่วน
---
search party | ทีมค้นหา | A search party was sent. | ส่งทีมค้นหาออกไปแล้ว
located | พบตัวแล้ว | The child has been located. | พบตัวเด็กแล้ว
reunite | พาไปพบกันอีกครั้ง | We reunited her with her family. | เราพาเธอกลับไปพบครอบครัว
whereabouts | ที่อยู่/ร่องรอย | His whereabouts are unknown. | ไม่ทราบว่าเขาอยู่ที่ไหน
disappear | หายตัว | He disappeared last week. | เขาหายตัวไปเมื่อสัปดาห์ก่อน
contact number | เบอร์ติดต่อ | Leave your contact number. | ทิ้งเบอร์ติดต่อไว้
`);
U('talk', 3, 'คำเชื่อมในการพูด', `
first of all | ก่อนอื่น | First of all, thank you. | ก่อนอื่น ขอบคุณครับ
then | จากนั้น | Then we went home. | จากนั้นเรากลับบ้าน
after that | หลังจากนั้น | After that, he called me. | หลังจากนั้นเขาโทรหาฉัน
finally | ในที่สุด/สุดท้าย | Finally, we arrived. | ในที่สุดเราก็มาถึง
anyway | ยังไงก็ตาม | Anyway, let's start. | ยังไงก็ตาม เริ่มกันเลย
so | ดังนั้น | It was late, so I left. | มันดึกแล้ว ฉันจึงกลับ
---
also | ด้วย/ยัง | I also like tea. | ฉันชอบชาด้วย
however | อย่างไรก็ตาม | However, it's expensive. | อย่างไรก็ตาม มันแพง
for instance | ตัวอย่างเช่น | For instance, you can walk. | ตัวอย่างเช่น คุณเดินไปได้
in other words | พูดอีกอย่างคือ | In other words, we failed. | พูดอีกอย่างคือ เราล้มเหลว
meanwhile | ในขณะเดียวกัน | Meanwhile, the police arrived. | ในขณะเดียวกัน ตำรวจก็มาถึง
eventually | ในที่สุด | Eventually, he confessed. | ในที่สุดเขาก็สารภาพ
`);
U('daily', 4, 'สิ่งแวดล้อมขั้นสูง', `
climate change | การเปลี่ยนแปลงสภาพภูมิอากาศ | Climate change affects everyone. | การเปลี่ยนแปลงสภาพภูมิอากาศกระทบทุกคน
global warming | ภาวะโลกร้อน | Global warming is a serious problem. | ภาวะโลกร้อนเป็นปัญหาร้ายแรง
renewable | หมุนเวียนได้ | Solar power is renewable energy. | พลังงานแสงอาทิตย์เป็นพลังงานหมุนเวียน
waste | ขยะ/ของเสีย | Reduce your waste. | ลดขยะของคุณ
plastic | พลาสติก | Avoid plastic bags. | หลีกเลี่ยงถุงพลาสติก
emission | การปล่อย (ก๊าซ) | Car emissions pollute the air. | ไอเสียรถทำให้อากาศเป็นพิษ
---
deforestation | การตัดไม้ทำลายป่า | Deforestation causes floods. | การตัดไม้ทำลายป่าทำให้น้ำท่วม
endangered | ใกล้สูญพันธุ์ | Tigers are endangered. | เสือใกล้สูญพันธุ์
conserve | อนุรักษ์ | Conserve water. | ประหยัดน้ำ
drought | ภัยแล้ง | The drought lasted months. | ภัยแล้งกินเวลาหลายเดือน
wildlife | สัตว์ป่า | Protect wildlife. | ปกป้องสัตว์ป่า
smog | หมอกควัน | The smog is bad in March. | หมอกควันแย่ในเดือนมีนาคม
`);
U('daily', 4, 'สื่อและการสื่อสาร', `
broadcast | ออกอากาศ | The news is broadcast at eight. | ข่าวออกอากาศสองทุ่ม
journalist | นักข่าว | The journalist asked questions. | นักข่าวถามคำถาม
headline | พาดหัวข่าว | Read the headline. | อ่านพาดหัวข่าว
press conference | การแถลงข่าว | Police held a press conference. | ตำรวจแถลงข่าว
source | แหล่งข่าว/ที่มา | What is your source? | แหล่งข่าวของคุณคืออะไร
rumor | ข่าวลือ | It's just a rumor. | แค่ข่าวลือ
---
verify | ตรวจสอบความจริง | Verify the information first. | ตรวจสอบข้อมูลก่อน
publish | เผยแพร่ | They published the story. | พวกเขาเผยแพร่เรื่องนี้
audience | ผู้ชม | The audience was large. | ผู้ชมเยอะมาก
viewpoint | มุมมอง | Respect other viewpoints. | เคารพมุมมองของผู้อื่น
statement | แถลงการณ์ | The police released a statement. | ตำรวจออกแถลงการณ์
coverage | การรายงานข่าว | The media coverage was huge. | สื่อรายงานข่าวอย่างมาก
`);
U('police', 4, 'การป้องกันอาชญากรรม', `
prevention | การป้องกัน | Crime prevention starts at home. | การป้องกันอาชญากรรมเริ่มที่บ้าน
awareness | การตระหนักรู้ | We need more public awareness. | เราต้องการความตระหนักรู้ของประชาชนมากขึ้น
CCTV | กล้องวงจรปิด | Install CCTV at the gate. | ติดกล้องวงจรปิดที่ประตู
lighting | แสงสว่าง | Good lighting reduces crime. | แสงสว่างที่ดีช่วยลดอาชญากรรม
alarm | สัญญาณเตือนภัย | The alarm went off. | สัญญาณเตือนดังขึ้น
neighborhood watch | อาสาเฝ้าระวังชุมชน | Join the neighborhood watch. | เข้าร่วมอาสาเฝ้าระวังชุมชน
---
deter | ยับยั้ง | Cameras deter thieves. | กล้องช่วยยับยั้งขโมย
secure | ปลอดภัย/ทำให้ปลอดภัย | Keep your house secure. | ดูแลบ้านให้ปลอดภัย
valuables | ของมีค่า | Don't leave valuables in the car. | อย่าทิ้งของมีค่าไว้ในรถ
lock | ล็อก/กุญแจ | Always lock your door. | ล็อกประตูเสมอ
risk | ความเสี่ยง | Reduce the risk of theft. | ลดความเสี่ยงจากการถูกขโมย
outreach | การลงพื้นที่เข้าถึงชุมชน | The police do community outreach. | ตำรวจลงพื้นที่เข้าถึงชุมชน
`);
U('daily', 5, 'เทคโนโลยีและไซเบอร์ขั้นสูง', `
encryption | การเข้ารหัส | Encryption protects data. | การเข้ารหัสปกป้องข้อมูล
malware | มัลแวร์ | The computer has malware. | คอมพิวเตอร์ติดมัลแวร์
phishing | ฟิชชิง (หลอกเอาข้อมูล) | That email is phishing. | อีเมลนั้นเป็นฟิชชิง
firewall | ไฟร์วอลล์ | Turn on the firewall. | เปิดไฟร์วอลล์
breach | การรั่วไหล/ละเมิด | There was a data breach. | มีข้อมูลรั่วไหล
authentication | การยืนยันตัวตน | Use two-factor authentication. | ใช้การยืนยันตัวตนสองขั้น
---
backup | สำรองข้อมูล | Make a backup every week. | สำรองข้อมูลทุกสัปดาห์
server | เซิร์ฟเวอร์ | The server is down. | เซิร์ฟเวอร์ล่ม
privacy | ความเป็นส่วนตัว | Protect your privacy online. | ปกป้องความเป็นส่วนตัวออนไลน์
vulnerability | ช่องโหว่ | They fixed the vulnerability. | พวกเขาแก้ช่องโหว่แล้ว
ransomware | แรนซัมแวร์ | Ransomware locked the files. | แรนซัมแวร์ล็อกไฟล์
digital footprint | ร่องรอยดิจิทัล | Be careful of your digital footprint. | ระวังร่องรอยดิจิทัลของคุณ
`);
U('talk', 5, 'กริยาทางการ', `
acquire | ได้มา | He acquired new skills. | เขาได้ทักษะใหม่
allocate | จัดสรร | Allocate more officers to the area. | จัดสรรเจ้าหน้าที่ไปพื้นที่นั้นมากขึ้น
comply | ปฏิบัติตาม | You must comply with the law. | คุณต้องปฏิบัติตามกฎหมาย
determine | กำหนด/ตัดสิน | We must determine the cause. | เราต้องหาสาเหตุ
enhance | ยกระดับ | Training enhances performance. | การฝึกช่วยยกระดับผลงาน
facilitate | อำนวยความสะดวก | We facilitate the process. | เราอำนวยความสะดวกในกระบวนการ
---
implement | นำไปใช้ | They implemented a new system. | พวกเขานำระบบใหม่มาใช้
obtain | ได้รับ | Obtain permission first. | ขออนุญาตก่อน
pursue | ไล่ตาม/มุ่งมั่น | Pursue your dream. | ไล่ตามความฝัน
retain | รักษาไว้ | Retain all receipts. | เก็บใบเสร็จทั้งหมดไว้
undergo | ได้รับ (การฝึก/รักษา) | Recruits undergo tough training. | ผู้สมัครต้องผ่านการฝึกหนัก
anticipate | คาดการณ์ | We anticipate heavy traffic. | เราคาดว่ารถจะติดหนัก
`);
U('daily', 6, 'คำนามเชิงนามธรรม', `
dilemma | ภาวะกลืนไม่เข้าคายไม่ออก | It was a moral dilemma. | มันเป็นภาวะลำบากใจทางศีลธรรม
paradox | ความย้อนแย้ง | It's a strange paradox. | มันเป็นความย้อนแย้งที่แปลก
phenomenon | ปรากฏการณ์ | It's a natural phenomenon. | เป็นปรากฏการณ์ธรรมชาติ
hypothesis | สมมติฐาน | Test your hypothesis. | ทดสอบสมมติฐานของคุณ
criterion | เกณฑ์ | What is the main criterion? | เกณฑ์หลักคืออะไร
consensus | ฉันทามติ | We reached a consensus. | เราได้ฉันทามติ
---
implication | นัยยะ/ผลที่ตามมา | Think about the implications. | คิดถึงผลที่ตามมา
discrepancy | ความไม่สอดคล้อง | There is a discrepancy in his story. | เรื่องเล่าของเขาไม่สอดคล้องกัน
scrutiny | การตรวจสอบอย่างละเอียด | The case is under scrutiny. | คดีนี้อยู่ภายใต้การตรวจสอบอย่างเข้มงวด
rationale | เหตุผลเบื้องหลัง | Explain the rationale. | อธิบายเหตุผล
precedent | บรรทัดฐาน | This sets a precedent. | สิ่งนี้สร้างบรรทัดฐาน
integrity | ความซื่อตรง | Integrity matters most. | ความซื่อตรงสำคัญที่สุด
`);
U('talk', 6, 'กริยาขั้นสูง', `
undermine | บ่อนทำลาย | Corruption undermines trust. | คอร์รัปชันบ่อนทำลายความไว้วางใจ
exacerbate | ทำให้แย่ลง | Panic exacerbated the situation. | ความตื่นตระหนกทำให้สถานการณ์แย่ลง
mitigate | บรรเทา | We must mitigate the risk. | เราต้องลดความเสี่ยง
scrutinize | ตรวจสอบละเอียด | Scrutinize the evidence. | ตรวจสอบหลักฐานอย่างละเอียด
alleviate | บรรเทา | Medicine alleviates pain. | ยาช่วยบรรเทาความเจ็บปวด
compel | บังคับ/ทำให้ต้อง | The law compels us to act. | กฎหมายบังคับให้เราต้องลงมือ
---
endorse | รับรอง/สนับสนุน | The chief endorsed the plan. | หัวหน้ารับรองแผน
refute | หักล้าง | He refuted the claim. | เขาหักล้างข้อกล่าวหา
reconcile | ไกล่เกลี่ย/คืนดี | They reconciled after the fight. | พวกเขาคืนดีกันหลังทะเลาะ
substantiate | พิสูจน์ให้มีหลักฐาน | Can you substantiate your claim? | คุณพิสูจน์ข้อกล่าวอ้างได้ไหม
uphold | ธำรงไว้ | Police uphold the law. | ตำรวจธำรงไว้ซึ่งกฎหมาย
circumvent | หลบเลี่ยง | They tried to circumvent the rules. | พวกเขาพยายามหลบเลี่ยงกฎ
`);

// ===== เพิ่มเติม (ชุดที่ 8) =====
U('daily', 1, 'ของใช้ส่วนตัว', `
toothbrush | แปรงสีฟัน | I need a new toothbrush. | ฉันต้องการแปรงสีฟันใหม่
soap | สบู่ | Wash your hands with soap. | ล้างมือด้วยสบู่
towel | ผ้าเช็ดตัว | Can I have a towel? | ขอผ้าเช็ดตัวหน่อย
shampoo | แชมพู | This shampoo smells nice. | แชมพูนี้หอม
mirror | กระจกเงา | Look in the mirror. | ส่องกระจก
comb | หวี | Where is my comb? | หวีของฉันอยู่ไหน
---
tissue | กระดาษทิชชู | Do you have a tissue? | มีทิชชูไหม
charger | ที่ชาร์จ | I forgot my charger. | ฉันลืมที่ชาร์จ
toothpaste | ยาสีฟัน | We need toothpaste. | เราต้องซื้อยาสีฟัน
razor | มีดโกน | He bought a razor. | เขาซื้อมีดโกน
keychain | พวงกุญแจ | This keychain is cute. | พวงกุญแจนี้น่ารัก
lotion | โลชั่น | Use sun lotion at the beach. | ทากันแดดตอนไปทะเล
`);
U('daily', 1, 'กริยาที่ใช้บ่อย 2', `
learn | เรียนรู้ | I want to learn English. | ฉันอยากเรียนภาษาอังกฤษ
teach | สอน | She teaches math. | เธอสอนคณิตศาสตร์
study | เรียน/ศึกษา | I study every night. | ฉันอ่านหนังสือทุกคืน
try | ลอง/พยายาม | Try again. | ลองอีกครั้ง
forget | ลืม | Don't forget your keys. | อย่าลืมกุญแจ
carry | ถือ/แบก | Can you carry this box? | ช่วยถือกล่องนี้ได้ไหม
---
bring | นำมา | Bring your ID card. | นำบัตรประชาชนมา
take | หยิบ/พาไป | Take an umbrella. | เอาร่มไปด้วย
put | วาง | Put it on the table. | วางไว้บนโต๊ะ
send | ส่ง | Send me a message. | ส่งข้อความมาหาฉัน
receive | ได้รับ | I received your email. | ฉันได้รับอีเมลของคุณแล้ว
use | ใช้ | Can I use your phone? | ขอใช้โทรศัพท์หน่อย
`);
U('daily', 2, 'เครื่องใช้ไฟฟ้า', `
fridge | ตู้เย็น | Put the milk in the fridge. | ใส่นมไว้ในตู้เย็น
fan | พัดลม | Turn on the fan. | เปิดพัดลม
air conditioner | เครื่องปรับอากาศ | The air conditioner is broken. | แอร์เสีย
washing machine | เครื่องซักผ้า | The washing machine is noisy. | เครื่องซักผ้าเสียงดัง
microwave | ไมโครเวฟ | Heat it in the microwave. | อุ่นในไมโครเวฟ
iron | เตารีด/รีดผ้า | I iron my uniform every day. | ฉันรีดเครื่องแบบทุกวัน
---
vacuum | ดูดฝุ่น | Vacuum the floor. | ดูดฝุ่นพื้น
light bulb | หลอดไฟ | Change the light bulb. | เปลี่ยนหลอดไฟ
plug | ปลั๊ก/เสียบปลั๊ก | Plug in the TV. | เสียบปลั๊กทีวี
socket | เต้ารับไฟฟ้า | The socket is near the bed. | เต้ารับอยู่ใกล้เตียง
remote | รีโมท | Where is the remote? | รีโมทอยู่ไหน
kettle | กาต้มน้ำ | Boil water in the kettle. | ต้มน้ำในกาต้มน้ำ
`);
U('daily', 2, 'ผลไม้และผัก', `
banana | กล้วย | Monkeys like bananas. | ลิงชอบกล้วย
mango | มะม่วง | Mango with sticky rice is delicious. | ข้าวเหนียวมะม่วงอร่อย
orange | ส้ม | I drink orange juice. | ฉันดื่มน้ำส้ม
apple | แอปเปิล | An apple a day is healthy. | กินแอปเปิลวันละลูกดีต่อสุขภาพ
watermelon | แตงโม | Watermelon is sweet. | แตงโมหวาน
coconut | มะพร้าว | Drink fresh coconut water. | ดื่มน้ำมะพร้าวสด
---
carrot | แครอท | Rabbits eat carrots. | กระต่ายกินแครอท
onion | หัวหอม | Cut the onion. | หั่นหัวหอม
garlic | กระเทียม | Thai food uses garlic. | อาหารไทยใช้กระเทียม
potato | มันฝรั่ง | I like fried potatoes. | ฉันชอบมันฝรั่งทอด
tomato | มะเขือเทศ | Add some tomatoes. | ใส่มะเขือเทศหน่อย
cabbage | กะหล่ำปลี | Cabbage is cheap. | กะหล่ำปลีราคาถูก
`);
U('police', 2, 'ข้อหาที่พบบ่อย', `
trespassing | บุกรุก | No trespassing! | ห้ามบุกรุก!
speeding | ขับรถเร็วเกินกำหนด | He was stopped for speeding. | เขาถูกเรียกเพราะขับเร็วเกินกำหนด
littering | ทิ้งขยะ | Littering is fined. | ทิ้งขยะมีโทษปรับ
gambling | การพนัน | Illegal gambling is a crime. | การพนันผิดกฎหมายเป็นอาชญากรรม
fighting | การทะเลาะวิวาท | They were arrested for fighting. | พวกเขาถูกจับเพราะทะเลาะวิวาท
shoplifting | ลักขโมยในร้าน | She was caught shoplifting. | เธอถูกจับขณะขโมยของในร้าน
---
drunk driving | เมาแล้วขับ | Drunk driving kills. | เมาแล้วขับคร่าชีวิต
illegal parking | จอดรถผิดกฎหมาย | You'll get a ticket for illegal parking. | จอดผิดจะโดนใบสั่ง
forgery | การปลอมเอกสาร | Forgery is a serious offense. | การปลอมเอกสารเป็นความผิดร้ายแรง
noise complaint | ร้องเรียนเสียงดัง | We got a noise complaint. | มีคนร้องเรียนเรื่องเสียงดัง
harassment | การคุกคาม | Report any harassment. | แจ้งความหากถูกคุกคาม
possession | การครอบครอง (ของผิดกฎหมาย) | He was arrested for drug possession. | เขาถูกจับข้อหาครอบครองยาเสพติด
`);
U('daily', 3, 'ที่อยู่อาศัย', `
apartment | อพาร์ตเมนต์ | I live in an apartment. | ฉันอาศัยอยู่ในอพาร์ตเมนต์
landlord | เจ้าของที่พัก | Call the landlord. | โทรหาเจ้าของห้อง
tenant | ผู้เช่า | The tenant pays every month. | ผู้เช่าจ่ายทุกเดือน
lease | สัญญาเช่า | Sign the lease. | เซ็นสัญญาเช่า
utilities | ค่าน้ำค่าไฟ | Utilities are included. | รวมค่าน้ำค่าไฟแล้ว
electricity | ไฟฟ้า | The electricity is off. | ไฟดับ
---
water bill | ค่าน้ำ | I paid the water bill. | ฉันจ่ายค่าน้ำแล้ว
maintenance | การซ่อมบำรุง | Call maintenance for repairs. | เรียกฝ่ายซ่อมบำรุง
furniture | เฟอร์นิเจอร์ | The room has no furniture. | ห้องไม่มีเฟอร์นิเจอร์
move in | ย้ายเข้า | We move in next week. | เราย้ายเข้าสัปดาห์หน้า
move out | ย้ายออก | He moved out yesterday. | เขาย้ายออกเมื่อวาน
security guard | ยามรักษาความปลอดภัย | Ask the security guard. | ถามยาม
`);
U('talk', 3, 'มารยาทและวัฒนธรรม', `
polite | สุภาพ | Thai people are polite. | คนไทยสุภาพ
rude | หยาบคาย | Don't be rude. | อย่าหยาบคาย
respect | เคารพ | Respect the elderly. | เคารพผู้สูงอายุ
custom | ธรรมเนียม | It's a local custom. | มันเป็นธรรมเนียมท้องถิ่น
tradition | ประเพณี | Songkran is a Thai tradition. | สงกรานต์เป็นประเพณีไทย
culture | วัฒนธรรม | I love Thai culture. | ฉันรักวัฒนธรรมไทย
---
greet | ทักทาย | We greet with a wai. | เราทักทายด้วยการไหว้
gesture | ท่าทาง | It's a friendly gesture. | เป็นท่าทางที่เป็นมิตร
behave | ประพฤติ | Please behave yourself. | กรุณาประพฤติตัวดีๆ
manners | มารยาท | He has good manners. | เขามีมารยาทดี
appropriate | เหมาะสม | Wear appropriate clothes. | แต่งกายให้เหมาะสม
offend | ทำให้ขุ่นเคือง | I didn't mean to offend you. | ฉันไม่ได้ตั้งใจทำให้คุณขุ่นเคือง
`);
U('police', 3, 'การจราจรขั้นกลาง', `
intersection | ทางแยก | Slow down at the intersection. | ชะลอที่ทางแยก
lane | ช่องทาง | Stay in your lane. | อยู่ในช่องทางของคุณ
overtake | แซง | Don't overtake on a bend. | อย่าแซงทางโค้ง
traffic jam | รถติด | I'm stuck in a traffic jam. | ฉันติดอยู่ในรถติด
roadblock | การตั้งด่านปิดถนน | Police set up a roadblock. | ตำรวจตั้งด่านปิดถนน
detour | ทางเบี่ยง | Take the detour. | ใช้ทางเบี่ยง
---
horn | แตร | Don't use your horn here. | ห้ามบีบแตรที่นี่
red light | ไฟแดง | He ran a red light. | เขาฝ่าไฟแดง
U-turn | กลับรถ | No U-turn here. | ห้ามกลับรถที่นี่
motorway | ทางด่วน/มอเตอร์เวย์ | Motorbikes can't use the motorway. | มอเตอร์ไซค์ขึ้นมอเตอร์เวย์ไม่ได้
toll | ค่าผ่านทาง | Pay the toll here. | จ่ายค่าผ่านทางที่นี่
pedestrian bridge | สะพานลอย | Use the pedestrian bridge. | ใช้สะพานลอย
`);
U('daily', 4, 'บุคลิกภาพ', `
ambitious | มีความทะเยอทะยาน | She is very ambitious. | เธอมีความทะเยอทะยานมาก
generous | ใจกว้าง | He is generous to everyone. | เขาใจกว้างกับทุกคน
stubborn | ดื้อ | My brother is stubborn. | พี่ชายฉันดื้อ
shy | ขี้อาย | She is shy with strangers. | เธอขี้อายกับคนแปลกหน้า
outgoing | ชอบเข้าสังคม | He is outgoing and friendly. | เขาชอบเข้าสังคมและเป็นมิตร
selfish | เห็นแก่ตัว | Don't be selfish. | อย่าเห็นแก่ตัว
---
humble | ถ่อมตัว | Great leaders are humble. | ผู้นำที่ยิ่งใหญ่ถ่อมตัว
mature | เป็นผู้ใหญ่ | He is mature for his age. | เขาเป็นผู้ใหญ่เกินวัย
lazy | ขี้เกียจ | Don't be lazy. | อย่าขี้เกียจ
cheerful | ร่าเริง | She is always cheerful. | เธอร่าเริงเสมอ
curious | อยากรู้อยากเห็น | Children are curious. | เด็กๆ อยากรู้อยากเห็น
sensitive | อ่อนไหว | He is very sensitive. | เขาอ่อนไหวมาก
`);
U('police', 4, 'การสื่อสารทางวิทยุ', `
copy that | รับทราบ | Copy that, over. | รับทราบ เปลี่ยน
over | เปลี่ยน (จบประโยค) | Unit 5 here, over. | หน่วย 5 พูด เปลี่ยน
standby | สแตนด์บาย/รอ | Standby for orders. | รอคำสั่ง
en route | กำลังเดินทางไป | Unit 3 en route. | หน่วย 3 กำลังเดินทางไป
on scene | ถึงที่เกิดเหตุแล้ว | We are on scene. | เราถึงที่เกิดเหตุแล้ว
dispatch | ศูนย์สั่งการ | Dispatch, we need an ambulance. | ศูนย์ เราต้องการรถพยาบาล
---
requesting backup | ขอกำลังเสริม | Requesting backup at the market. | ขอกำลังเสริมที่ตลาด
suspect fleeing | ผู้ต้องสงสัยกำลังหลบหนี | Suspect fleeing on foot. | ผู้ต้องสงสัยกำลังวิ่งหนี
all clear | ปลอดภัย/เคลียร์แล้ว | The building is all clear. | อาคารเคลียร์แล้ว
ETA | เวลาที่คาดว่าจะถึง | What's your ETA? | คาดว่าจะถึงเมื่อไหร่
unit | หน่วย (ปฏิบัติการ) | Send another unit. | ส่งอีกหน่วยไป
negative | ไม่/ไม่ใช่ (ทางวิทยุ) | Negative, no suspects found. | ไม่พบผู้ต้องสงสัย
`);
U('talk', 4, 'การขอร้องอย่างสุภาพ', `
would you mind | รบกวน...ได้ไหม | Would you mind closing the door? | รบกวนปิดประตูได้ไหม
could you possibly | พอจะ...ได้ไหม | Could you possibly help me? | พอจะช่วยฉันได้ไหม
I was wondering if | ไม่ทราบว่า...ได้ไหม | I was wondering if you're free. | ไม่ทราบว่าคุณว่างไหม
would it be possible | เป็นไปได้ไหมที่จะ | Would it be possible to leave early? | เป็นไปได้ไหมที่จะออกก่อน
I'd appreciate it if | จะขอบคุณมากถ้า | I'd appreciate it if you called me. | จะขอบคุณมากถ้าคุณโทรมา
sorry to bother you | ขอโทษที่รบกวน | Sorry to bother you, but… | ขอโทษที่รบกวนนะ แต่...
---
if you don't mind | ถ้าไม่รบกวน | If you don't mind, I'll sit here. | ถ้าไม่รบกวน ขอนั่งตรงนี้
when you have a moment | เมื่อคุณว่าง | Call me when you have a moment. | ว่างเมื่อไหร่โทรหาฉันนะ
at your convenience | ตามสะดวก | Reply at your convenience. | ตอบกลับตามสะดวก
thank you in advance | ขอบคุณล่วงหน้า | Thank you in advance. | ขอบคุณล่วงหน้า
may I ask | ขอถามได้ไหม | May I ask your name? | ขอทราบชื่อได้ไหม
I'd be grateful | จะขอบคุณมาก | I'd be grateful for your help. | จะขอบคุณมากสำหรับความช่วยเหลือ
`);
U('daily', 5, 'ศัพท์ธุรกิจ', `
revenue | รายได้ | Revenue increased this year. | รายได้เพิ่มขึ้นปีนี้
profit | กำไร | The company made a profit. | บริษัทมีกำไร
loss | ขาดทุน/การสูญเสีย | They had a big loss. | พวกเขาขาดทุนมาก
stakeholder | ผู้มีส่วนได้ส่วนเสีย | Talk to all stakeholders. | คุยกับผู้มีส่วนได้ส่วนเสียทุกฝ่าย
merger | การควบรวมกิจการ | The merger was approved. | การควบรวมได้รับอนุมัติ
entrepreneur | ผู้ประกอบการ | She is a young entrepreneur. | เธอเป็นผู้ประกอบการรุ่นใหม่
---
supply chain | ห่วงโซ่อุปทาน | The supply chain was disrupted. | ห่วงโซ่อุปทานหยุดชะงัก
startup | บริษัทเกิดใหม่ | He works at a tech startup. | เขาทำงานที่สตาร์ทอัพด้านเทคโนโลยี
turnover | ยอดขาย/อัตราลาออก | Staff turnover is high. | อัตราการลาออกของพนักงานสูง
shareholder | ผู้ถือหุ้น | Shareholders voted yes. | ผู้ถือหุ้นลงมติเห็นชอบ
forecast | พยากรณ์ | The sales forecast is good. | การคาดการณ์ยอดขายดี
asset | สินทรัพย์ | Police froze his assets. | ตำรวจอายัดทรัพย์สินของเขา
`);
U('police', 5, 'การควบคุมฝูงชน', `
crowd control | การควบคุมฝูงชน | Officers trained in crowd control. | เจ้าหน้าที่ฝึกการควบคุมฝูงชน
riot | การจลาจล | The protest turned into a riot. | การประท้วงกลายเป็นจลาจล
barricade | สิ่งกีดขวาง | They removed the barricade. | พวกเขารื้อสิ่งกีดขวาง
disperse | สลาย (ฝูงชน) | Police dispersed the crowd. | ตำรวจสลายฝูงชน
demonstration | การชุมนุม | The demonstration was peaceful. | การชุมนุมเป็นไปอย่างสงบ
rally | การชุมนุมใหญ่ | Thousands joined the rally. | คนนับพันร่วมชุมนุม
---
curfew | เคอร์ฟิว | A curfew was announced. | มีการประกาศเคอร์ฟิว
escalate | บานปลาย | Don't let it escalate. | อย่าให้บานปลาย
de-escalate | ลดความตึงเครียด | Officers tried to de-escalate. | เจ้าหน้าที่พยายามลดความตึงเครียด
peaceful | สงบ | Keep the protest peaceful. | ชุมนุมอย่างสงบ
megaphone | โทรโข่ง | He spoke through a megaphone. | เขาพูดผ่านโทรโข่ง
cordon | แนวกั้น | Police set up a cordon. | ตำรวจตั้งแนวกั้น
`);
U('talk', 5, 'สำนวนในการทำงาน', `
touch base | ติดต่อกันสักหน่อย | Let's touch base next week. | สัปดาห์หน้าคุยกันหน่อย
ballpark figure | ตัวเลขคร่าวๆ | Give me a ballpark figure. | ขอตัวเลขคร่าวๆ
back to square one | กลับไปเริ่มใหม่ | The plan failed. Back to square one. | แผนล้ม ต้องเริ่มใหม่
get the ball rolling | เริ่มดำเนินการ | Let's get the ball rolling. | เริ่มลงมือกันเถอะ
in the loop | รับรู้ความเคลื่อนไหว | Keep me in the loop. | อัปเดตให้ฉันรู้ด้วย
cut to the chase | เข้าเรื่องเลย | Let's cut to the chase. | เข้าเรื่องเลยดีกว่า
---
think on your feet | คิดไว/แก้สถานการณ์เฉพาะหน้า | Police must think on their feet. | ตำรวจต้องคิดไว
call the shots | เป็นคนตัดสินใจ | The chief calls the shots. | หัวหน้าเป็นคนตัดสินใจ
win-win situation | ได้ประโยชน์ทั้งสองฝ่าย | It's a win-win situation. | เป็นสถานการณ์ที่ได้ทั้งสองฝ่าย
learning curve | ช่วงเรียนรู้ | The new system has a learning curve. | ระบบใหม่ต้องใช้เวลาเรียนรู้
up in the air | ยังไม่แน่นอน | Our plans are up in the air. | แผนของเรายังไม่แน่นอน
pull your weight | ทำส่วนของตัวเองให้ดี | Everyone must pull their weight. | ทุกคนต้องทำหน้าที่ของตัวเองให้ดี
`);
U('daily', 6, 'การเมืองและการปกครอง', `
legislation | กฎหมาย (ที่ออกโดยรัฐสภา) | New legislation was passed. | กฎหมายใหม่ผ่านแล้ว
parliament | รัฐสภา | Parliament debated the bill. | รัฐสภาอภิปรายร่างกฎหมาย
coalition | รัฐบาลผสม/พันธมิตร | They formed a coalition. | พวกเขาจัดตั้งรัฐบาลผสม
referendum | การลงประชามติ | A referendum will be held. | จะมีการลงประชามติ
amendment | การแก้ไขเพิ่มเติม | They proposed an amendment. | พวกเขาเสนอการแก้ไขเพิ่มเติม
bureaucracy | ระบบราชการ | Bureaucracy slows things down. | ระบบราชการทำให้ทุกอย่างช้า
---
decentralize | กระจายอำนาจ | Decentralize power to local areas. | กระจายอำนาจสู่ท้องถิ่น
sovereignty | อำนาจอธิปไตย | National sovereignty must be respected. | ต้องเคารพอำนาจอธิปไตย
diplomacy | การทูต | Diplomacy solved the conflict. | การทูตแก้ความขัดแย้ง
sanction | การคว่ำบาตร | They imposed sanctions. | พวกเขาใช้มาตรการคว่ำบาตร
ratify | ให้สัตยาบัน | The treaty was ratified. | สนธิสัญญาได้รับการให้สัตยาบัน
constituency | เขตเลือกตั้ง | He won in his constituency. | เขาชนะในเขตเลือกตั้งของเขา
`);
U('talk', 6, 'คำวิเศษณ์ขั้นสูง', `
inevitably | อย่างหลีกเลี่ยงไม่ได้ | Prices will inevitably rise. | ราคาจะสูงขึ้นอย่างหลีกเลี่ยงไม่ได้
predominantly | ส่วนใหญ่ | The area is predominantly rural. | พื้นที่ส่วนใหญ่เป็นชนบท
arguably | อาจกล่าวได้ว่า | It is arguably the best plan. | อาจกล่าวได้ว่าเป็นแผนที่ดีที่สุด
notably | โดยเฉพาะอย่างยิ่ง | Crime fell, notably in Bangkok. | อาชญากรรมลดลง โดยเฉพาะในกรุงเทพฯ
subsequently | ต่อมา | He was subsequently arrested. | ต่อมาเขาถูกจับ
substantially | อย่างมาก | Costs rose substantially. | ค่าใช้จ่ายเพิ่มขึ้นอย่างมาก
---
thereby | ด้วยเหตุนั้น/โดยการนั้น | He confessed, thereby closing the case. | เขาสารภาพ ทำให้คดีปิดลง
hence | ดังนั้น | It was late; hence, we left. | ดึกแล้ว เราจึงกลับ
albeit | แม้ว่า | It worked, albeit slowly. | มันได้ผล แม้จะช้า
ostensibly | โดยอ้างว่า/ภายนอกดูเหมือน | He came, ostensibly to help. | เขามาโดยอ้างว่าจะช่วย
invariably | อย่างสม่ำเสมอ/ทุกครั้ง | He is invariably late. | เขามาสายทุกครั้ง
presumably | สันนิษฐานว่า | Presumably, he left early. | สันนิษฐานว่าเขาออกไปก่อน
`);

U('basic', 0, 'รูปทรงและขนาด', `
circle | วงกลม | Draw a circle. | วาดวงกลม
square | สี่เหลี่ยมจัตุรัส | The table is square. | โต๊ะเป็นสี่เหลี่ยม
line | เส้น | Draw a line. | ลากเส้น
round | กลม | The ball is round. | ลูกบอลกลม
heavy | หนัก | This bag is heavy. | กระเป๋านี้หนัก
---
light | เบา | The box is light. | กล่องเบา
full | เต็ม | The bus is full. | รถเมล์เต็ม
empty | ว่างเปล่า | The glass is empty. | แก้วว่าง
wide | กว้าง | The road is wide. | ถนนกว้าง
thick | หนา | The book is thick. | หนังสือหนา
`);
U('basic', 0, 'คำเวลาง่ายๆ', `
now | ตอนนี้ | I am busy now. | ตอนนี้ฉันยุ่ง
soon | เร็วๆ นี้ | See you soon. | แล้วเจอกันเร็วๆ นี้
often | บ่อย | I often walk to work. | ฉันเดินไปทำงานบ่อย
---
afternoon | ตอนบ่าย | See you this afternoon. | เจอกันบ่ายนี้
evening | ตอนเย็น | We eat dinner in the evening. | เรากินข้าวเย็นตอนเย็น
`);
U('daily', 1, 'ในครัว', `
fork | ส้อม | Use a fork and spoon. | ใช้ช้อนส้อม
glass | แก้ว | A glass of water, please. | ขอน้ำหนึ่งแก้ว
pan | กระทะ | Heat the pan. | ตั้งกระทะให้ร้อน
pot | หม้อ | Cook rice in a pot. | หุงข้าวในหม้อ
stove | เตา | Turn off the stove. | ปิดเตา
---
sugar | น้ำตาล | No sugar, please. | ไม่ใส่น้ำตาล
salt | เกลือ | Add a little salt. | ใส่เกลือนิดหน่อย
oil | น้ำมัน | Fry it in oil. | ทอดในน้ำมัน
sauce | ซอส | Fish sauce is salty. | น้ำปลาเค็ม
ice | น้ำแข็ง | Coffee with ice, please. | ขอกาแฟใส่น้ำแข็ง
chopsticks | ตะเกียบ | Eat noodles with chopsticks. | กินก๋วยเตี๋ยวด้วยตะเกียบ
`);
U('daily', 1, 'สภาพอากาศพื้นฐาน', `
warm | อบอุ่น | It's warm today. | วันนี้อากาศอุ่น
dry | แห้ง | The air is dry. | อากาศแห้ง
foggy | มีหมอก | It's foggy this morning. | เช้านี้มีหมอก
thunder | ฟ้าร้อง | I heard thunder. | ฉันได้ยินฟ้าร้อง
lightning | ฟ้าแลบ | Lightning is dangerous. | ฟ้าผ่าอันตราย
---
rainbow | รุ้ง | Look at the rainbow! | ดูรุ้งสิ!
cloud | เมฆ | There are many clouds. | มีเมฆเยอะ
temperature | อุณหภูมิ | The temperature is 35 degrees. | อุณหภูมิ 35 องศา
degree | องศา | It's 30 degrees today. | วันนี้ 30 องศา
humid | ชื้น | Bangkok is hot and humid. | กรุงเทพฯ ร้อนชื้น
breeze | ลมพัดเบาๆ | I like the sea breeze. | ฉันชอบลมทะเล
`);
U('police', 1, 'ข้อมูลส่วนตัว', `
first name | ชื่อจริง | What is your first name? | ชื่อจริงของคุณคืออะไร
last name | นามสกุล | Spell your last name. | สะกดนามสกุล
address | ที่อยู่ | Write your address. | เขียนที่อยู่
nationality | สัญชาติ | What is your nationality? | คุณสัญชาติอะไร
date of birth | วันเกิด | Your date of birth, please. | ขอวันเดือนปีเกิด
gender | เพศ | Gender: male or female. | เพศ: ชายหรือหญิง
---
phone number | เบอร์โทร | Give me your phone number. | ขอเบอร์โทรศัพท์
email address | อีเมล | Write your email address. | เขียนอีเมล
occupation | อาชีพ | What is your occupation? | คุณประกอบอาชีพอะไร
ID number | เลขบัตรประชาชน | What is your ID number? | เลขบัตรประชาชนของคุณคืออะไร
signature | ลายเซ็น | Your signature here. | เซ็นชื่อตรงนี้
married status | สถานภาพสมรส | What is your marital status? | สถานภาพสมรสของคุณคืออะไร
`);
U('daily', 2, 'ร่างกายเพิ่มเติม', `
neck | คอ | My neck hurts. | ฉันปวดคอ
shoulder | ไหล่ | He hurt his shoulder. | เขาเจ็บไหล่
knee | หัวเข่า | I fell on my knee. | ฉันล้มเข่ากระแทก
stomach | ท้อง | I have a stomachache. | ฉันปวดท้อง
chest | หน้าอก | He has chest pain. | เขาเจ็บหน้าอก
skin | ผิวหนัง | Protect your skin from the sun. | ปกป้องผิวจากแดด
---
elbow | ข้อศอก | He hit me with his elbow. | เขาใช้ศอกกระแทกฉัน
wrist | ข้อมือ | She wears a watch on her wrist. | เธอใส่นาฬิกาที่ข้อมือ
ankle | ข้อเท้า | I twisted my ankle. | ข้อเท้าฉันพลิก
toe | นิ้วเท้า | My toe hurts. | นิ้วเท้าฉันเจ็บ
lip | ริมฝีปาก | Her lips are red. | ริมฝีปากเธอแดง
tongue | ลิ้น | Don't burn your tongue. | ระวังลิ้นพอง
`);
U('daily', 2, 'ช้อปปิ้งออนไลน์', `
order online | สั่งออนไลน์ | I order food online. | ฉันสั่งอาหารออนไลน์
cart | ตะกร้าสินค้า | Add it to your cart. | ใส่ลงตะกร้า
checkout | ชำระเงิน | Go to checkout. | ไปที่ชำระเงิน
shipping | การจัดส่ง | Shipping is free. | ส่งฟรี
tracking number | เลขพัสดุ | Here is your tracking number. | นี่คือเลขพัสดุ
parcel | พัสดุ | My parcel arrived. | พัสดุมาถึงแล้ว
---
review | รีวิว | Read the reviews first. | อ่านรีวิวก่อน
out of stock | สินค้าหมด | It's out of stock. | สินค้าหมด
coupon | คูปอง | Use this coupon. | ใช้คูปองนี้
cash on delivery | เก็บเงินปลายทาง | I'll pay cash on delivery. | ฉันจะจ่ายเก็บเงินปลายทาง
return | คืนสินค้า | Can I return it? | คืนสินค้าได้ไหม
`);
U('talk', 2, 'คุยเรื่องอาหาร', `
hungry for | อยากกิน | I'm hungry for pizza. | อยากกินพิซซ่า
taste | รสชาติ/ชิม | Taste this soup. | ชิมซุปนี้
smell | กลิ่น/ได้กลิ่น | It smells good. | กลิ่นหอม
vegetarian | มังสวิรัติ | I'm vegetarian. | ฉันกินมังสวิรัติ
not too spicy | ไม่เผ็ดมาก | Not too spicy, please. | ไม่เผ็ดมากนะ
---
take away | สั่งกลับบ้าน | Take away, please. | ใส่ถุงกลับบ้าน
eat here | ทานที่นี่ | We'll eat here. | ทานที่นี่
dessert | ของหวาน | What's for dessert? | ของหวานมีอะไร
snack | ของว่าง | I want a snack. | อยากกินของว่าง
recipe | สูตรอาหาร | Can I have the recipe? | ขอสูตรได้ไหม
treat | เลี้ยง | Lunch is my treat. | มื้อกลางวันนี้ฉันเลี้ยง
`);
U('police', 2, 'สถานีตำรวจ', `
front desk | เคาน์เตอร์หน้า | Ask at the front desk. | สอบถามที่เคาน์เตอร์หน้า
duty officer | ร้อยเวร/เจ้าหน้าที่เวร | Talk to the duty officer. | คุยกับเจ้าหน้าที่เวร
complaint form | แบบฟอร์มแจ้งความ | Fill out a complaint form. | กรอกแบบฟอร์มแจ้งความ
case number | เลขคดี | Keep your case number. | เก็บเลขคดีไว้
police report | บันทึกประจำวัน | I need a police report for insurance. | ฉันต้องใช้ใบแจ้งความยื่นประกัน
detective | นักสืบ | A detective will call you. | นักสืบจะโทรหาคุณ
---
interview room | ห้องสอบสวน | Wait in the interview room. | รอในห้องสอบสวน
lost property | ของหาย | Is this lost property? | นี่ของหายใช่ไหม
claim | แจ้งขอรับ/อ้างสิทธิ์ | You can claim it here. | มาขอรับคืนได้ที่นี่
proof | หลักฐานยืนยัน | Do you have proof of ownership? | มีหลักฐานความเป็นเจ้าของไหม
on call | เวรเรียก | The doctor is on call. | หมออยู่เวร
patrol car | รถสายตรวจ | A patrol car is coming. | รถสายตรวจกำลังมา
`);
U('daily', 3, 'สุขภาพและการออกกำลังกาย', `
diet | การควบคุมอาหาร | I'm on a diet. | ฉันกำลังคุมอาหาร
calorie | แคลอรี | This has many calories. | อันนี้แคลอรีสูง
muscle | กล้ามเนื้อ | Exercise builds muscle. | ออกกำลังกายสร้างกล้ามเนื้อ
stretch | ยืดเส้น | Stretch before running. | ยืดเส้นก่อนวิ่ง
push-up | วิดพื้น | Do twenty push-ups. | วิดพื้นยี่สิบครั้ง
sit-up | ลุกนั่ง | I can do forty sit-ups. | ฉันลุกนั่งได้สี่สิบครั้ง
---
jog | วิ่งเหยาะ | I jog every evening. | ฉันวิ่งเหยาะทุกเย็น
fit | ฟิต/แข็งแรง | Police must be fit. | ตำรวจต้องแข็งแรง
energy | พลังงาน | I have no energy today. | วันนี้ไม่มีแรง
rest | พักผ่อน | You need rest. | คุณต้องพักผ่อน
habit | นิสัย | Exercise is a good habit. | การออกกำลังกายเป็นนิสัยที่ดี
`);
U('talk', 3, 'โทรศัพท์และข้อความ', `
voicemail | ข้อความเสียง | Leave a voicemail. | ฝากข้อความเสียงไว้
missed call | สายที่ไม่ได้รับ | I had a missed call from you. | ฉันมีสายที่ไม่ได้รับจากคุณ
call back | โทรกลับ | I'll call you back. | เดี๋ยวโทรกลับ
hang up | วางสาย | Don't hang up. | อย่าวางสาย
busy line | สายไม่ว่าง | The line is busy. | สายไม่ว่าง
put through | ต่อสาย | I'll put you through. | จะต่อสายให้
---
text | ส่งข้อความ | Text me later. | ส่งข้อความมานะ
video call | วิดีโอคอล | Let's have a video call. | วิดีโอคอลกัน
speaker | ลำโพง | Put it on speaker. | เปิดลำโพง
battery dying | แบตใกล้หมด | My battery is dying. | แบตฉันใกล้หมด
bad signal | สัญญาณไม่ดี | Sorry, bad signal. | ขอโทษ สัญญาณไม่ดี
group chat | แชทกลุ่ม | Add me to the group chat. | เพิ่มฉันเข้าแชทกลุ่ม
`);
U('daily', 4, 'การศึกษา', `
university | มหาวิทยาลัย | She studies at a university. | เธอเรียนมหาวิทยาลัย
scholarship | ทุนการศึกษา | She won a scholarship. | เธอได้ทุน
semester | ภาคเรียน | The semester starts in June. | ภาคเรียนเริ่มมิถุนายน
lecture | การบรรยาย | The lecture was long. | การบรรยายยาวมาก
assignment | งานที่ได้รับมอบหมาย | Submit your assignment. | ส่งงาน
---
tuition | ค่าเล่าเรียน | Tuition is expensive. | ค่าเล่าเรียนแพง
enroll | ลงทะเบียนเรียน | Enroll before Friday. | ลงทะเบียนก่อนวันศุกร์
grade | เกรด/คะแนน | I got a good grade. | ฉันได้เกรดดี
research | การวิจัย | He does research on crime. | เขาวิจัยเรื่องอาชญากรรม
knowledge | ความรู้ | Knowledge is power. | ความรู้คือพลัง
`);
U('police', 4, 'ยาเสพติด', `
methamphetamine | ยาบ้า (เมทแอมเฟตามีน) | Police seized methamphetamine pills. | ตำรวจยึดยาบ้า
cannabis | กัญชา | Cannabis laws have changed. | กฎหมายกัญชาเปลี่ยนแล้ว
overdose | ใช้ยาเกินขนาด | He died of an overdose. | เขาเสียชีวิตจากการใช้ยาเกินขนาด
addiction | การติดยา | Addiction is a disease. | การติดยาเป็นโรค
rehab | ศูนย์บำบัด | He went to rehab. | เขาเข้าบำบัด
urine test | ตรวจปัสสาวะ | Take a urine test. | ตรวจปัสสาวะ
---
trafficker | ผู้ค้ายารายใหญ่ | The trafficker was arrested. | ผู้ค้ารายใหญ่ถูกจับ
pills | เม็ดยา | They found 10,000 pills. | พบยาหนึ่งหมื่นเม็ด
crystal meth | ไอซ์ | Crystal meth is very dangerous. | ไอซ์อันตรายมาก
sniffer dog | สุนัขดมกลิ่น | The sniffer dog found drugs. | สุนัขดมกลิ่นพบยาเสพติด
hideout | ที่ซ่อน/แหล่งกบดาน | Police raided their hideout. | ตำรวจบุกแหล่งกบดาน
supply | จัดหา/การจัดหา | Cut off the drug supply. | ตัดการส่งยาเสพติด
`);
U('talk', 5, 'การให้ข้อเสนอแนะ', `
constructive | สร้างสรรค์ | Give constructive feedback. | ให้คำติชมเชิงสร้างสรรค์
criticism | คำวิจารณ์ | Accept criticism calmly. | รับคำวิจารณ์อย่างใจเย็น
praise | คำชม | He deserves praise. | เขาสมควรได้คำชม
improvement | การปรับปรุง | There is room for improvement. | ยังปรับปรุงได้อีก
area to improve | จุดที่ควรพัฒนา | This is an area to improve. | นี่คือจุดที่ควรพัฒนา
---
well done | ทำได้ดี | Well done, team! | ทีมทำได้ดีมาก!
keep it up | ทำต่อไปนะ | Great work, keep it up! | เยี่ยม ทำต่อไปนะ!
to be honest | พูดตามตรง | To be honest, it needs work. | พูดตามตรง ยังต้องปรับอีก
I noticed | ฉันสังเกตว่า | I noticed you were late. | ฉันสังเกตว่าคุณมาสาย
next time | ครั้งหน้า | Next time, check it twice. | ครั้งหน้าตรวจสองรอบนะ
overall | โดยรวม | Overall, it was good. | โดยรวมดี
`);
U('daily', 6, 'วิทยาศาสตร์และการวิจัย', `
experiment | การทดลอง | They did an experiment. | พวกเขาทำการทดลอง
evidence-based | อิงหลักฐาน | Use evidence-based methods. | ใช้วิธีที่อิงหลักฐาน
methodology | ระเบียบวิธี | Explain your methodology. | อธิบายระเบียบวิธี
variable | ตัวแปร | Control the variables. | ควบคุมตัวแปร
correlation | ความสัมพันธ์เชิงสถิติ | There is a correlation. | มีความสัมพันธ์กัน
sample | กลุ่มตัวอย่าง | The sample was small. | กลุ่มตัวอย่างน้อย
---
findings | ผลการศึกษา | The findings were clear. | ผลการศึกษาชัดเจน
data set | ชุดข้อมูล | Analyze the data set. | วิเคราะห์ชุดข้อมูล
peer review | การประเมินโดยผู้ทรงคุณวุฒิ | The study passed peer review. | งานวิจัยผ่านการประเมิน
theory | ทฤษฎี | It's only a theory. | เป็นแค่ทฤษฎี
statistic | สถิติ | Crime statistics are falling. | สถิติอาชญากรรมลดลง
bias | อคติ | Avoid bias in research. | หลีกเลี่ยงอคติในการวิจัย
`);

U('basic', 0, 'สีเพิ่มเติม', `
pink | สีชมพู | She likes pink. | เธอชอบสีชมพู
purple | สีม่วง | The flower is purple. | ดอกไม้สีม่วง
brown | สีน้ำตาล | He has brown eyes. | เขาตาสีน้ำตาล
gray | สีเทา | The sky is gray. | ท้องฟ้าสีเทา
gold | สีทอง/ทอง | She wears a gold ring. | เธอใส่แหวนทอง
silver | สีเงิน/เงิน | The car is silver. | รถสีเงิน
---
dark | มืด/เข้ม | The room is dark. | ห้องมืด
bright | สว่าง/สด | The light is bright. | ไฟสว่าง
colorful | หลากสี | The market is colorful. | ตลาดมีสีสัน
dirty | สกปรก | My shoes are dirty. | รองเท้าฉันสกปรก
quiet | เงียบ | The library is quiet. | ห้องสมุดเงียบ
loud | ดัง | The music is loud. | เพลงดัง
`);
U('daily', 1, 'การเดินทางในเมือง', `
taxi | แท็กซี่ | Take a taxi. | นั่งแท็กซี่
motorcycle taxi | วินมอเตอร์ไซค์ | I take a motorcycle taxi. | ฉันนั่งวินมอเตอร์ไซค์
skytrain | รถไฟฟ้า | The skytrain is fast. | รถไฟฟ้าเร็ว
subway | รถไฟใต้ดิน | Take the subway to Silom. | นั่งรถไฟใต้ดินไปสีลม
boat | เรือ | We took a boat. | เรานั่งเรือ
bicycle | จักรยาน | I ride a bicycle. | ฉันปั่นจักรยาน
---
bus stop | ป้ายรถเมล์ | Wait at the bus stop. | รอที่ป้ายรถเมล์
get on | ขึ้น (รถ) | Get on the bus. | ขึ้นรถเมล์
get off | ลง (รถ) | Get off here. | ลงตรงนี้
fare | ค่าโดยสาร | The fare is 20 baht. | ค่าโดยสาร 20 บาท
driver's seat | ที่นั่งคนขับ | Sit in the driver's seat. | นั่งที่คนขับ
rush hour | ชั่วโมงเร่งด่วน | Avoid rush hour. | หลีกเลี่ยงชั่วโมงเร่งด่วน
`);
U('police', 1, 'สิ่งของในคดี', `
wallet | กระเป๋าสตางค์ | My wallet was stolen. | กระเป๋าสตางค์ถูกขโมย
purse | กระเป๋าถือ | She lost her purse. | เธอทำกระเป๋าถือหาย
jewelry | เครื่องประดับ | They stole her jewelry. | พวกเขาขโมยเครื่องประดับ
laptop | แล็ปท็อป | My laptop is missing. | แล็ปท็อปหาย
backpack | เป้ | He carried a black backpack. | เขาสะพายเป้สีดำ
necklace | สร้อยคอ | Her gold necklace is gone. | สร้อยทองของเธอหายไป
---
ring | แหวน | I lost my ring. | ฉันทำแหวนหาย
bracelet | สร้อยข้อมือ | It's a silver bracelet. | เป็นสร้อยข้อมือเงิน
earrings | ต่างหู | She wore earrings. | เธอใส่ต่างหู
bank card | บัตรธนาคาร | Cancel your bank card. | อายัดบัตรธนาคาร
brand | ยี่ห้อ | What brand is your phone? | โทรศัพท์ยี่ห้ออะไร
model | รุ่น | What model is it? | รุ่นอะไร
`);
U('talk', 1, 'คำถามในชีวิตประจำวัน', `
how are you | สบายดีไหม | Hi, how are you? | สวัสดี สบายดีไหม
what do you do | ทำงานอะไร | What do you do? | คุณทำงานอะไร
where do you live | อยู่ที่ไหน | Where do you live? | คุณอยู่ที่ไหน
how old are you | อายุเท่าไหร่ | How old are you? | คุณอายุเท่าไหร่
do you have | คุณมี...ไหม | Do you have a pen? | คุณมีปากกาไหม
can I help you | ให้ช่วยอะไรไหม | Can I help you? | ให้ช่วยอะไรไหม
---
what's wrong | เป็นอะไร | What's wrong? | เป็นอะไรไป
what happened | เกิดอะไรขึ้น | What happened? | เกิดอะไรขึ้น
are you OK | คุณโอเคไหม | Are you OK? | คุณโอเคไหม
nice to meet you | ยินดีที่ได้รู้จัก | Nice to meet you, Ann. | ยินดีที่ได้รู้จักนะแอน
see you later | แล้วเจอกัน | See you later! | แล้วเจอกัน!
have a nice day | ขอให้เป็นวันที่ดี | Have a nice day! | ขอให้เป็นวันที่ดี!
`);
U('daily', 2, 'งานอดิเรกเพิ่มเติม', `
painting | การวาดภาพ | Her hobby is painting. | งานอดิเรกของเธอคือวาดภาพ
fishing | การตกปลา | We go fishing on weekends. | เราไปตกปลาวันหยุด
camping | การตั้งแคมป์ | Let's go camping. | ไปตั้งแคมป์กัน
gardening | การทำสวน | My mother loves gardening. | แม่ชอบทำสวน
photography | การถ่ายภาพ | He is into photography. | เขาชอบถ่ายภาพ
cycling | การปั่นจักรยาน | Cycling is good exercise. | การปั่นจักรยานเป็นการออกกำลังที่ดี
---
hiking | การเดินป่า | We went hiking in Chiang Mai. | เราไปเดินป่าที่เชียงใหม่
chess | หมากรุก | Do you play chess? | เล่นหมากรุกไหม
guitar | กีตาร์ | He plays the guitar. | เขาเล่นกีตาร์
karaoke | คาราโอเกะ | Let's sing karaoke. | ไปร้องคาราโอเกะกัน
novel | นวนิยาย | I'm reading a novel. | ฉันกำลังอ่านนิยาย
collect | สะสม | He collects coins. | เขาสะสมเหรียญ
`);
U('police', 2, 'บรรยายเหตุการณ์', `
suddenly | ทันใดนั้น | Suddenly, he ran away. | ทันใดนั้นเขาก็วิ่งหนี
loudly | เสียงดัง | He shouted loudly. | เขาตะโกนเสียงดัง
shout | ตะโกน | Someone shouted for help. | มีคนตะโกนขอความช่วยเหลือ
scream | กรีดร้อง | I heard a woman scream. | ฉันได้ยินผู้หญิงกรีดร้อง
push | ผลัก | He pushed me. | เขาผลักฉัน
hit | ตี/ชน | The car hit a tree. | รถชนต้นไม้
---
grab | คว้า | He grabbed my bag. | เขาคว้ากระเป๋าฉัน
fall | ล้ม | She fell down. | เธอล้มลง
break | ทำแตก/พัง | They broke the window. | พวกเขาทุบหน้าต่างแตก
threaten | ข่มขู่ | He threatened me. | เขาข่มขู่ฉัน
attack | โจมตี/ทำร้าย | A dog attacked the boy. | สุนัขทำร้ายเด็ก
`);
U('daily', 3, 'อาหารและร้านอาหารขั้นกลาง', `
appetizer | อาหารเรียกน้ำย่อย | Let's order an appetizer. | สั่งอาหารเรียกน้ำย่อยกัน
main course | อาหารจานหลัก | What's the main course? | อาหารจานหลักคืออะไร
buffet | บุฟเฟต์ | We had a buffet lunch. | เรากินบุฟเฟต์กลางวัน
portion | ปริมาณ (ต่อจาน) | The portion is big. | ปริมาณเยอะ
grilled | ย่าง | I'll have grilled fish. | ขอปลาย่าง
steamed | นึ่ง | Steamed rice, please. | ขอข้าวสวย
---
raw | ดิบ | Don't eat raw meat. | อย่ากินเนื้อดิบ
well-done | สุกมาก | Steak, well-done please. | สเต๊กสุกมาก
waiter | พนักงานเสิร์ฟ | Call the waiter. | เรียกพนักงานเสิร์ฟ
tip | ทิป | Leave a tip. | ให้ทิป
reservation table | โต๊ะที่จองไว้ | We have a table booked. | เราจองโต๊ะไว้แล้ว
allergy | อาการแพ้ | I have a peanut allergy. | ฉันแพ้ถั่วลิสง
`);
U('police', 3, 'สิทธิผู้ต้องหา', `
right to remain silent | สิทธิที่จะไม่ให้การ | You have the right to remain silent. | คุณมีสิทธิที่จะไม่ให้การ
attorney | ทนายความ | You may call an attorney. | คุณโทรหาทนายได้
interpreter | ล่าม | Do you need an interpreter? | ต้องการล่ามไหม
detention | การควบคุมตัว | He is in detention. | เขาถูกควบคุมตัว
charge sheet | บันทึกข้อกล่าวหา | Read the charge sheet. | อ่านบันทึกข้อกล่าวหา
bail bond | หลักทรัพย์ประกัน | Post a bail bond. | วางหลักทรัพย์ประกันตัว
---
consulate | สถานกงสุล | Contact your consulate. | ติดต่อสถานกงสุล
fair treatment | การปฏิบัติอย่างเป็นธรรม | Everyone gets fair treatment. | ทุกคนได้รับการปฏิบัติอย่างเป็นธรรม
inform of rights | แจ้งสิทธิ | We must inform you of your rights. | เราต้องแจ้งสิทธิให้คุณทราบ
legal aid | ความช่วยเหลือทางกฎหมาย | Free legal aid is available. | มีความช่วยเหลือทางกฎหมายฟรี
release on bail | ปล่อยตัวชั่วคราว | He was released on bail. | เขาได้รับการปล่อยตัวชั่วคราว
holding cell | ห้องควบคุมชั่วคราว | Put him in the holding cell. | นำตัวไปห้องควบคุมชั่วคราว
`);
U('talk', 3, 'การชวนและการปฏิเสธ', `
how about | ...ดีไหม | How about dinner tonight? | คืนนี้กินข้าวด้วยกันดีไหม
why don't we | ทำไมเราไม่... | Why don't we go now? | ทำไมเราไม่ไปตอนนี้เลย
shall we | ...กันไหม | Shall we start? | เริ่มกันไหม
I'd love to | ยินดีมาก | I'd love to come. | ยินดีมากที่จะไป
sounds good | ฟังดูดี | Sounds good to me. | ฟังดูดีนะ
count me in | นับฉันด้วย | Count me in! | นับฉันด้วย!
---
I'm afraid I can't | เกรงว่าไม่ได้ | I'm afraid I can't come. | เกรงว่าไปไม่ได้
maybe another time | ไว้คราวหน้า | Maybe another time. | ไว้คราวหน้านะ
I have plans | มีนัดแล้ว | Sorry, I have plans. | ขอโทษ มีนัดแล้ว
rain check | ขอเลื่อนไปก่อน | Can I take a rain check? | ขอเลื่อนไปก่อนได้ไหม
I'll pass | ขอผ่าน | Thanks, but I'll pass. | ขอบคุณ แต่ขอผ่าน
let me check | ขอเช็คก่อน | Let me check my schedule. | ขอเช็คตารางก่อน
`);
U('daily', 4, 'ความสัมพันธ์และสังคม', `
relationship | ความสัมพันธ์ | They have a good relationship. | พวกเขามีความสัมพันธ์ที่ดี
trust | ความไว้วางใจ | Trust is important. | ความไว้ใจสำคัญ
argue | ทะเลาะ/โต้เถียง | They argue a lot. | พวกเขาทะเลาะกันบ่อย
---
friendship | มิตรภาพ | Our friendship is strong. | มิตรภาพของเราแน่นแฟ้น
loneliness | ความเหงา | Loneliness affects health. | ความเหงากระทบสุขภาพ
community spirit | จิตสำนึกชุมชน | The village has great community spirit. | หมู่บ้านนี้มีจิตสำนึกชุมชนดี
peer pressure | แรงกดดันจากเพื่อน | Don't give in to peer pressure. | อย่ายอมตามแรงกดดันจากเพื่อน
generation gap | ช่องว่างระหว่างวัย | There is a generation gap. | มีช่องว่างระหว่างวัย
get along | เข้ากันได้ | They get along well. | พวกเขาเข้ากันได้ดี
`);
U('talk', 4, 'การเล่าเรื่อง', `
once upon a time | กาลครั้งหนึ่ง | Once upon a time, there was a king. | กาลครั้งหนึ่งมีพระราชา
at first | ตอนแรก | At first, I was scared. | ตอนแรกฉันกลัว
later on | ต่อมา | Later on, we became friends. | ต่อมาเราก็เป็นเพื่อนกัน
all of a sudden | ทันใดนั้น | All of a sudden, the lights went out. | ทันใดนั้นไฟก็ดับ
in the end | ในท้ายที่สุด | In the end, it was fine. | สุดท้ายก็ไม่เป็นไร
to my surprise | ที่น่าแปลกใจ | To my surprise, he passed. | น่าแปลกใจที่เขาสอบผ่าน
---
luckily | โชคดีที่ | Luckily, nobody was hurt. | โชคดีที่ไม่มีใครบาดเจ็บ
unfortunately | โชคไม่ดีที่ | Unfortunately, I missed the bus. | โชคไม่ดีที่ฉันตกรถ
as soon as | ทันทีที่ | Call me as soon as you arrive. | ถึงแล้วโทรหาทันที
while | ขณะที่ | While I was cooking, he called. | ขณะที่ฉันทำอาหาร เขาโทรมา
by the time | กว่าจะ | By the time we arrived, it was dark. | กว่าเราจะถึงก็มืดแล้ว
it turned out | ปรากฏว่า | It turned out he was right. | ปรากฏว่าเขาพูดถูก
`);
U('police', 5, 'การตรวจที่เกิดเหตุ', `
crime scene tape | เทปกั้นที่เกิดเหตุ | Don't cross the crime scene tape. | อย่าข้ามเทปกั้นที่เกิดเหตุ
evidence bag | ถุงเก็บหลักฐาน | Put it in an evidence bag. | ใส่ถุงเก็บหลักฐาน
gloves | ถุงมือ | Wear gloves at the scene. | สวมถุงมือในที่เกิดเหตุ
footprint | รอยเท้า | They found a footprint. | พบรอยเท้า
bloodstain | คราบเลือด | There was a bloodstain on the wall. | มีคราบเลือดบนผนัง
bullet | กระสุน | They found a bullet. | พบกระสุน
---
photograph | ถ่ายภาพ (หลักฐาน) | Photograph the scene. | ถ่ายภาพที่เกิดเหตุ
sketch | ภาพสเก็ตช์ | Draw a sketch of the room. | วาดภาพสเก็ตช์ห้อง
contaminate | ปนเปื้อน | Don't contaminate the evidence. | อย่าทำให้หลักฐานปนเปื้อน
secure the area | กันพื้นที่ | Secure the area first. | กันพื้นที่ก่อน
chain of custody | ห่วงโซ่การครอบครองหลักฐาน | Keep the chain of custody. | รักษาห่วงโซ่การครอบครองหลักฐาน
`);
U('daily', 5, 'ภาษากฎหมายทั่วไป', `
clause | ข้อ (ในสัญญา) | Read clause 5. | อ่านข้อ 5
terms and conditions | ข้อกำหนดและเงื่อนไข | Read the terms and conditions. | อ่านข้อกำหนดและเงื่อนไข
consent | ความยินยอม | You need written consent. | ต้องมีความยินยอมเป็นลายลักษณ์อักษร
breach of contract | ผิดสัญญา | That's a breach of contract. | นั่นคือการผิดสัญญา
dispute | ข้อพิพาท | They settled the dispute. | พวกเขายุติข้อพิพาท
---
witness statement | คำให้การพยาน | Sign the witness statement. | ลงนามในคำให้การพยาน
legally binding | มีผลผูกพันทางกฎหมาย | This contract is legally binding. | สัญญานี้มีผลผูกพันทางกฎหมาย
notary | ผู้รับรองเอกสาร | Get it signed by a notary. | ให้ผู้รับรองเอกสารลงนาม
power of attorney | หนังสือมอบอำนาจ | I need a power of attorney. | ฉันต้องการหนังสือมอบอำนาจ
fine print | ข้อความตัวเล็ก (เงื่อนไขแฝง) | Always read the fine print. | อ่านตัวเล็กทุกครั้ง
void | เป็นโมฆะ | The contract is void. | สัญญาเป็นโมฆะ
`);
U('talk', 6, 'ภาษาการทูตและทางการ', `
with all due respect | ด้วยความเคารพ | With all due respect, I disagree. | ด้วยความเคารพ ผมไม่เห็นด้วย
I take your point | ผมเข้าใจประเด็นของคุณ | I take your point, but… | ผมเข้าใจประเด็นของคุณ แต่...
it's worth noting | ควรสังเกตว่า | It's worth noting that costs rose. | ควรสังเกตว่าต้นทุนสูงขึ้น
on behalf of | ในนามของ | On behalf of the police, thank you. | ในนามตำรวจ ขอบคุณครับ
please be advised | ขอแจ้งให้ทราบว่า | Please be advised the road is closed. | ขอแจ้งให้ทราบว่าถนนปิด
in light of | เนื่องจาก/ในแง่ของ | In light of new evidence, we reopened the case. | เนื่องจากมีหลักฐานใหม่ เราจึงเปิดคดีใหม่
---
with regard to | เกี่ยวกับ | With regard to your request, yes. | เกี่ยวกับคำขอของคุณ ได้ครับ
I would like to stress | ขอเน้นย้ำว่า | I would like to stress safety. | ขอเน้นย้ำเรื่องความปลอดภัย
we regret to inform | เสียใจที่ต้องแจ้งว่า | We regret to inform you… | เราเสียใจที่ต้องแจ้งว่า...
at this stage | ในขั้นนี้ | At this stage, we cannot comment. | ในขั้นนี้ยังไม่สามารถให้ความเห็นได้
going forward | นับจากนี้ | Going forward, we will improve. | นับจากนี้เราจะปรับปรุง
to that end | เพื่อการนั้น | To that end, we hired more staff. | เพื่อการนั้น เราจ้างคนเพิ่ม
`);
U('police', 6, 'อาชญากรรมทางการเงิน', `
embezzlement | การยักยอกทรัพย์ | He was charged with embezzlement. | เขาถูกตั้งข้อหายักยอกทรัพย์
insider trading | การใช้ข้อมูลภายในซื้อขายหุ้น | Insider trading is illegal. | การใช้ข้อมูลภายในซื้อขายหุ้นผิดกฎหมาย
Ponzi scheme | แชร์ลูกโซ่ | It was a Ponzi scheme. | มันคือแชร์ลูกโซ่
tax evasion | การหลีกเลี่ยงภาษี | He was jailed for tax evasion. | เขาติดคุกข้อหาเลี่ยงภาษี
shell company | บริษัทบังหน้า | They used a shell company. | พวกเขาใช้บริษัทบังหน้า
asset freeze | การอายัดทรัพย์ | The court ordered an asset freeze. | ศาลสั่งอายัดทรัพย์
---
audit | การตรวจสอบบัญชี | The audit found problems. | การตรวจสอบบัญชีพบปัญหา
kickback | เงินใต้โต๊ะ | He took kickbacks. | เขารับเงินใต้โต๊ะ
mule account | บัญชีม้า | Don't rent out a mule account. | อย่าเปิดบัญชีม้าให้เช่า
whistleblower | ผู้เปิดโปง | A whistleblower exposed the fraud. | ผู้เปิดโปงเปิดเผยการฉ้อโกง
cryptocurrency | สกุลเงินดิจิทัล | Scammers asked for cryptocurrency. | มิจฉาชีพขอเงินดิจิทัล
illicit | ผิดกฎหมาย/ลับลมคมใน | Illicit funds were moved abroad. | เงินผิดกฎหมายถูกโอนไปต่างประเทศ
`);

U('basic', 0, 'คำกริยาง่ายๆ 2', `
look | มอง | Look at me. | มองฉันสิ
listen | ฟัง | Listen to the teacher. | ฟังครู
play | เล่น | Children play outside. | เด็กๆ เล่นข้างนอก
---
give | ให้ | Give me the pen. | ส่งปากกาให้หน่อย
get | ได้รับ | I get up at six. | ฉันตื่นตอนหกโมง
make | ทำ/สร้าง | Make a cake. | ทำเค้ก
like | ชอบ | I like dogs. | ฉันชอบหมา
want | ต้องการ | I want water. | ฉันต้องการน้ำ
need | จำเป็นต้อง | I need help. | ฉันต้องการความช่วยเหลือ
`);
U('daily', 1, 'สัตว์เลี้ยงและสัตว์อื่นๆ', `
pet | สัตว์เลี้ยง | Do you have a pet? | คุณมีสัตว์เลี้ยงไหม
puppy | ลูกสุนัข | The puppy is cute. | ลูกหมาน่ารัก
kitten | ลูกแมว | The kitten is sleeping. | ลูกแมวกำลังนอน
rabbit | กระต่าย | The rabbit eats carrots. | กระต่ายกินแครอท
tiger | เสือ | Tigers are dangerous. | เสืออันตราย
mosquito | ยุง | Mosquitoes bite at night. | ยุงกัดตอนกลางคืน
---
ant | มด | There are ants on the table. | มีมดบนโต๊ะ
frog | กบ | Frogs live near water. | กบอาศัยใกล้น้ำ
crocodile | จระเข้ | Don't swim here. Crocodiles! | อย่าว่ายตรงนี้ มีจระเข้!
turtle | เต่า | The turtle is slow. | เต่าเดินช้า
lizard | จิ้งจก | There's a lizard on the wall. | มีจิ้งจกบนผนัง
cockroach | แมลงสาบ | I hate cockroaches. | ฉันเกลียดแมลงสาบ
`);
U('police', 1, 'สถานที่ราชการ', `
city hall | ศาลากลาง/สำนักงานเขต | Go to city hall. | ไปสำนักงานเขต
embassy | สถานทูต | Call your embassy. | โทรหาสถานทูต
immigration office | ตรวจคนเข้าเมือง | Visit the immigration office. | ไปที่ตรวจคนเข้าเมือง
district office | ที่ว่าการอำเภอ | Get it at the district office. | ไปทำที่อำเภอ
courthouse | อาคารศาล | The courthouse is downtown. | ศาลอยู่ใจกลางเมือง
fire station | สถานีดับเพลิง | The fire station is near. | สถานีดับเพลิงอยู่ใกล้
---
military camp | ค่ายทหาร | It's a military camp. | เป็นค่ายทหาร
police academy | โรงเรียนนายร้อยตำรวจ | He studies at the police academy. | เขาเรียนที่โรงเรียนนายร้อยตำรวจ
training center | ศูนย์ฝึก | Recruits go to the training center. | ผู้สมัครไปศูนย์ฝึก
headquarters | กองบัญชาการ | Report to headquarters. | รายงานตัวที่กองบัญชาการ
checkpoint booth | ป้อมตำรวจ | Ask at the police booth. | ถามที่ป้อมตำรวจ
`);
U('daily', 2, 'งานและอาชีพเพิ่มเติม', `
mechanic | ช่างซ่อมรถ | The mechanic fixed my car. | ช่างซ่อมรถของฉันแล้ว
electrician | ช่างไฟฟ้า | Call an electrician. | เรียกช่างไฟ
plumber | ช่างประปา | The plumber is coming. | ช่างประปากำลังมา
pilot | นักบิน | He wants to be a pilot. | เขาอยากเป็นนักบิน
accountant | นักบัญชี | My sister is an accountant. | พี่สาวเป็นนักบัญชี
---
dentist | ทันตแพทย์ | I went to the dentist. | ฉันไปหาหมอฟัน
chef | เชฟ | The chef cooks well. | เชฟทำอาหารเก่ง
guard | ยาม | The guard stopped him. | ยามหยุดเขาไว้
cashier | แคชเชียร์ | Pay the cashier. | จ่ายที่แคชเชียร์
volunteer worker | อาสาสมัคร | She is a volunteer worker. | เธอเป็นอาสาสมัคร
`);
U('talk', 2, 'ช่วยเหลือและขอบคุณ', `
let me help | ให้ฉันช่วย | Let me help you. | ให้ฉันช่วยนะ
here you are | นี่ครับ/ค่ะ | Here you are. | นี่ครับ
go ahead | เชิญเลย | Go ahead, please. | เชิญเลยครับ
no thanks | ไม่เป็นไร ขอบคุณ | No thanks, I'm fine. | ไม่เป็นไร ฉันโอเค
that's kind of you | คุณใจดีจัง | That's kind of you. | คุณใจดีจัง
it's my pleasure | ยินดีเลย | It's my pleasure. | ด้วยความยินดี
---
don't mention it | ไม่ต้องเกรงใจ | Don't mention it. | ไม่ต้องเกรงใจ
I owe you one | ติดหนี้บุญคุณ | Thanks! I owe you one. | ขอบคุณ! ติดค้างไว้นะ
anytime | เมื่อไหร่ก็ได้ | Anytime! | ได้ทุกเมื่อ!
take your time | ไม่ต้องรีบ | Take your time. | ไม่ต้องรีบ
be careful | ระวังนะ | Be careful on the road. | ระวังบนถนนนะ
good job | เก่งมาก | Good job! | เก่งมาก!
`);
U('daily', 3, 'ข่าวและเหตุการณ์ทั่วไป', `
election day | วันเลือกตั้ง | Election day is Sunday. | วันเลือกตั้งคือวันอาทิตย์
festival | เทศกาล | Loy Krathong is a festival. | ลอยกระทงเป็นเทศกาล
ceremony | พิธี | The ceremony starts at nine. | พิธีเริ่มเก้าโมง
holiday season | ช่วงวันหยุดยาว | Traffic is heavy in holiday season. | ช่วงหยุดยาวรถติด
celebration | การเฉลิมฉลอง | There was a big celebration. | มีการเฉลิมฉลองใหญ่
parade | ขบวนพาเหรด | We watched the parade. | เราดูขบวนพาเหรด
---
concert | คอนเสิร์ต | The concert was crowded. | คอนเสิร์ตคนแน่น
exhibition | นิทรรศการ | Visit the exhibition. | ไปชมนิทรรศการ
competition | การแข่งขัน | She won the competition. | เธอชนะการแข่งขัน
fireworks | ดอกไม้ไฟ | The fireworks were beautiful. | ดอกไม้ไฟสวยมาก
countdown | การนับถอยหลัง | Join the New Year countdown. | ร่วมเคาท์ดาวน์ปีใหม่
crowded | แออัด | The street is crowded. | ถนนคนแน่น
`);
U('police', 3, 'อาวุธและวัตถุอันตราย', `
pistol | ปืนพก | He had a pistol. | เขามีปืนพก
rifle | ปืนยาว | The soldier carried a rifle. | ทหารถือปืนยาว
ammunition | กระสุน | They seized ammunition. | ยึดกระสุนได้
explosive | วัตถุระเบิด | Don't touch the explosive. | อย่าแตะวัตถุระเบิด
bomb squad | หน่วยเก็บกู้ระเบิด | Call the bomb squad. | เรียกหน่วยเก็บกู้ระเบิด
license to carry | ใบอนุญาตพกพา | Do you have a license to carry? | มีใบอนุญาตพกพาไหม
---
replica | ของเลียนแบบ | It was a replica gun. | เป็นปืนปลอม
sharp object | ของมีคม | No sharp objects allowed. | ห้ามนำของมีคมเข้า
firearm | อาวุธปืน | Firearms must be registered. | อาวุธปืนต้องขึ้นทะเบียน
trigger | ไกปืน | Keep your finger off the trigger. | อย่าวางนิ้วบนไกปืน
holster | ซองปืน | Put the gun in the holster. | ใส่ปืนในซอง
taser | ปืนช็อตไฟฟ้า | The officer used a taser. | เจ้าหน้าที่ใช้ปืนช็อตไฟฟ้า
`);
U('talk', 4, 'การแสดงความเห็นใจ', `
I'm so sorry | เสียใจด้วยจริงๆ | I'm so sorry for your loss. | เสียใจด้วยกับการสูญเสีย
that must be hard | คงลำบากมาก | That must be hard for you. | คงลำบากสำหรับคุณมาก
I understand | ฉันเข้าใจ | I understand how you feel. | ฉันเข้าใจความรู้สึกคุณ
it's not your fault | ไม่ใช่ความผิดคุณ | It's not your fault. | ไม่ใช่ความผิดของคุณ
cheer up | ร่าเริงหน่อยนะ | Cheer up! | ร่าเริงหน่อยนะ!
I'm here for you | ฉันอยู่ตรงนี้นะ | I'm here for you. | ฉันอยู่ข้างคุณนะ
---
get well soon | หายไวๆ | Get well soon! | หายไวๆ นะ!
my condolences | ขอแสดงความเสียใจ | My condolences to your family. | ขอแสดงความเสียใจต่อครอบครัวคุณ
it'll be OK | ทุกอย่างจะโอเค | Don't worry, it'll be OK. | ไม่ต้องห่วง ทุกอย่างจะโอเค
take care of yourself | ดูแลตัวเองด้วย | Take care of yourself. | ดูแลตัวเองด้วยนะ
what a shame | น่าเสียดาย | What a shame! | น่าเสียดายจัง!
that's terrible | แย่มากเลย | Oh, that's terrible. | โอ้ แย่มากเลย
`);
U('daily', 4, 'การทำงานและอาชีพการงาน', `
resume | ประวัติย่อ | Send your resume. | ส่งประวัติย่อมา
job interview | สัมภาษณ์งาน | I have a job interview. | ฉันมีสัมภาษณ์งาน
applicant | ผู้สมัคร | There are 500 applicants. | มีผู้สมัคร 500 คน
hire | จ้าง | They hired ten officers. | พวกเขารับเจ้าหน้าที่สิบคน
retire | เกษียณ | My father retired last year. | พ่อเกษียณปีที่แล้ว
---
full-time | เต็มเวลา | It's a full-time job. | เป็นงานเต็มเวลา
part-time | พาร์ทไทม์ | I work part-time. | ฉันทำงานพาร์ทไทม์
benefits | สวัสดิการ | The job has good benefits. | งานนี้สวัสดิการดี
probation period | ช่วงทดลองงาน | The probation period is three months. | ทดลองงานสามเดือน
qualification | คุณวุฒิ | What are your qualifications? | คุณมีคุณวุฒิอะไรบ้าง
career path | เส้นทางอาชีพ | Plan your career path. | วางแผนเส้นทางอาชีพ
`);
U('police', 4, 'การค้ามนุษย์และการคุ้มครอง', `
human trafficking | การค้ามนุษย์ | Human trafficking is a serious crime. | การค้ามนุษย์เป็นอาชญากรรมร้ายแรง
forced labor | แรงงานบังคับ | They rescued victims of forced labor. | ช่วยเหยื่อแรงงานบังคับ
exploitation | การแสวงประโยชน์ | Stop child exploitation. | หยุดการแสวงประโยชน์จากเด็ก
domestic violence | ความรุนแรงในครอบครัว | Report domestic violence. | แจ้งเหตุความรุนแรงในครอบครัว
abuse | การทารุณ/ล่วงละเมิด | Child abuse must be reported. | การทารุณเด็กต้องแจ้งความ
protection order | คำสั่งคุ้มครอง | She got a protection order. | เธอได้รับคำสั่งคุ้มครอง
---
safe house | บ้านพักปลอดภัย | Victims stay in a safe house. | ผู้เสียหายพักที่บ้านพักปลอดภัย
underage | อายุต่ำกว่าเกณฑ์ | Selling alcohol to the underage is illegal. | ขายเหล้าให้เด็กผิดกฎหมาย
guardian | ผู้ปกครอง | Call the child's guardian. | โทรหาผู้ปกครองของเด็ก
social worker | นักสังคมสงเคราะห์ | A social worker will help. | นักสังคมสงเคราะห์จะช่วย
rescue operation | ปฏิบัติการช่วยเหลือ | The rescue operation succeeded. | ปฏิบัติการช่วยเหลือสำเร็จ
victim support | การช่วยเหลือผู้เสียหาย | Contact victim support. | ติดต่อหน่วยช่วยเหลือผู้เสียหาย
`);
U('talk', 5, 'การเจรจาและไกล่เกลี่ย', `
mediate | ไกล่เกลี่ย | The officer mediated the dispute. | เจ้าหน้าที่ไกล่เกลี่ยข้อพิพาท
common ground | จุดร่วม | Let's find common ground. | มาหาจุดร่วมกัน
concession | การยอมผ่อนปรน | Both sides made concessions. | ทั้งสองฝ่ายยอมผ่อนปรน
settlement | การตกลงยุติ | They reached a settlement. | พวกเขาตกลงยุติเรื่องได้
mutual | ซึ่งกันและกัน | Mutual respect is key. | การเคารพซึ่งกันและกันคือหัวใจ
grievance | ความคับข้องใจ | Listen to their grievances. | รับฟังความคับข้องใจของพวกเขา
---
impasse | ทางตัน | Talks reached an impasse. | การเจรจาถึงทางตัน
leverage | อำนาจต่อรอง | We have little leverage. | เรามีอำนาจต่อรองน้อย
counteroffer | ข้อเสนอโต้กลับ | They made a counteroffer. | พวกเขายื่นข้อเสนอโต้กลับ
non-negotiable | ต่อรองไม่ได้ | Safety is non-negotiable. | ความปลอดภัยต่อรองไม่ได้
de-escalation | การลดความตึงเครียด | De-escalation saves lives. | การลดความตึงเครียดช่วยรักษาชีวิต
middle ground | ทางสายกลาง | We found a middle ground. | เราพบทางสายกลาง
`);
U('daily', 6, 'ปรัชญาและจริยธรรม', `
ethics | จริยธรรม | Police ethics are important. | จริยธรรมตำรวจสำคัญ
moral | ศีลธรรม/ทางศีลธรรม | It's a moral question. | เป็นคำถามทางศีลธรรม
principle | หลักการ | He has strong principles. | เขามีหลักการที่หนักแน่น
virtue | คุณธรรม | Honesty is a virtue. | ความซื่อสัตย์เป็นคุณธรรม
justify | ให้เหตุผลรองรับ | Can you justify that? | คุณให้เหตุผลรองรับได้ไหม
conscience | มโนธรรม | Follow your conscience. | ทำตามมโนธรรม
---
accountable | ต้องรับผิดชอบ | Leaders must be accountable. | ผู้นำต้องรับผิดชอบ
fairness | ความเป็นธรรม | Fairness matters. | ความเป็นธรรมสำคัญ
prejudice | อคติ | Fight prejudice. | ต่อสู้กับอคติ
dignity | ศักดิ์ศรี | Treat people with dignity. | ปฏิบัติต่อคนอย่างมีศักดิ์ศรี
compassion | ความเห็นอกเห็นใจ | Show compassion to victims. | แสดงความเห็นใจต่อผู้เสียหาย
abuse of power | การใช้อำนาจโดยมิชอบ | Abuse of power is a crime. | การใช้อำนาจโดยมิชอบเป็นความผิด
`);
U('talk', 6, 'การพูดในที่สาธารณะ', `
keynote | ปาฐกถาหลัก | She gave the keynote speech. | เธอกล่าวปาฐกถาหลัก
audience engagement | การมีส่วนร่วมของผู้ฟัง | Audience engagement was high. | ผู้ฟังมีส่วนร่วมสูง
rhetorical question | คำถามเชิงวาทศิลป์ | He asked a rhetorical question. | เขาถามคำถามเชิงวาทศิลป์
anecdote | เรื่องเล่าสั้นๆ | Start with an anecdote. | เริ่มด้วยเรื่องเล่าสั้นๆ
articulate | พูดได้ชัดเจน | She is very articulate. | เธอพูดได้ชัดเจนมาก
eloquent | มีวาทศิลป์ | It was an eloquent speech. | เป็นสุนทรพจน์ที่ไพเราะ
---
elaborate | อธิบายเพิ่มเติม | Could you elaborate? | ช่วยขยายความได้ไหม
in conclusion | โดยสรุป | In conclusion, we must act. | โดยสรุป เราต้องลงมือ
let me clarify | ขอชี้แจง | Let me clarify one point. | ขอชี้แจงประเด็นหนึ่ง
take questions | รับคำถาม | I'll now take questions. | ตอนนี้ขอรับคำถาม
visual aid | สื่อประกอบ | Use a visual aid. | ใช้สื่อประกอบ
stage fright | ประหม่าบนเวที | I have stage fright. | ฉันประหม่าเวลาขึ้นเวที
`);

U('basic', 0, 'คำบุพบทและคำง่ายๆ', `
here | ที่นี่ | Come here. | มานี่
there | ที่นั่น | Go there. | ไปที่นั่น
up | ขึ้น | Look up. | มองขึ้นไป
down | ลง | Sit down. | นั่งลง
left side | ด้านซ้าย | It's on the left side. | อยู่ด้านซ้าย
right side | ด้านขวา | It's on the right side. | อยู่ด้านขวา
---
very | มาก | It's very hot. | ร้อนมาก
too | เกินไป/ด้วย | It's too big. | ใหญ่เกินไป
and | และ | You and me. | คุณและฉัน
but | แต่ | It's cheap but good. | ถูกแต่ดี
or | หรือ | Tea or coffee? | ชาหรือกาแฟ
with | กับ | Come with me. | มากับฉัน
`);
U('daily', 1, 'ร้านค้าและการซื้อ', `
market stall | แผงลอย | She has a market stall. | เธอมีแผงในตลาด
too expensive | แพงไป | It's too expensive. | แพงไป
cheaper | ถูกกว่า | Do you have a cheaper one? | มีอันที่ถูกกว่าไหม
I'll take it | เอาอันนี้ | OK, I'll take it. | โอเค เอาอันนี้
---
just looking | แค่ดูเฉยๆ | I'm just looking. | แค่ดูเฉยๆ
open hours | เวลาเปิด | What are your open hours? | ร้านเปิดกี่โมง
closed | ปิด | The shop is closed today. | วันนี้ร้านปิด
sale | ลดราคา | Shoes are on sale. | รองเท้าลดราคา
pay by card | จ่ายบัตร | Can I pay by card? | จ่ายบัตรได้ไหม
`);
U('police', 1, 'ยานพาหนะและรถ', `
pickup truck | รถกระบะ | He drove a white pickup truck. | เขาขับรถกระบะสีขาว
van | รถตู้ | A van stopped outside. | มีรถตู้จอดข้างนอก
truck | รถบรรทุก | The truck was too fast. | รถบรรทุกขับเร็วไป
scooter | รถสกู๊ตเตอร์ | She rides a scooter. | เธอขี่สกู๊ตเตอร์
sedan | รถเก๋ง | It's a black sedan. | เป็นรถเก๋งสีดำ
wheel | ล้อ | The wheel is flat. | ล้อแบน
---
tire | ยางรถ | Check your tires. | ตรวจยางรถ
headlight | ไฟหน้า | Turn on your headlights. | เปิดไฟหน้า
brake | เบรก | Use the brake. | เหยียบเบรก
fuel | เชื้อเพลิง | We are low on fuel. | น้ำมันใกล้หมด
dent | รอยบุบ | There's a dent in the door. | ประตูมีรอยบุบ
`);
U('talk', 1, 'คำตอบสั้นๆ', `
of course not | ไม่เลย | Of course not! | ไม่เลย!
I see | อ๋อ เข้าใจแล้ว | Oh, I see. | อ๋อ เข้าใจแล้ว
really | จริงเหรอ | Really? | จริงเหรอ
me too | ฉันด้วย | Me too! | ฉันด้วย!
me neither | ฉันก็ไม่ | Me neither. | ฉันก็ไม่
---
not really | ไม่ค่อย | Not really. | ไม่ค่อยหรอก
I don't think so | ไม่น่าใช่ | I don't think so. | ไม่น่าจะใช่
exactly | ถูกต้องเลย | Exactly! | ถูกต้องเลย!
wait a minute | เดี๋ยวก่อน | Wait a minute! | เดี๋ยวก่อน!
`);
U('daily', 2, 'กิจวัตรตอนเย็นและที่บ้าน', `
come home | กลับบ้าน | I come home at six. | ฉันกลับบ้านหกโมง
take a bath | อาบน้ำ (แช่) | I take a bath at night. | ฉันอาบน้ำตอนกลางคืน
make dinner | ทำอาหารเย็น | Mom makes dinner. | แม่ทำอาหารเย็น
do the dishes | ล้างจาน | I do the dishes. | ฉันล้างจาน
watch TV | ดูทีวี | We watch TV together. | เราดูทีวีด้วยกัน
go to bed | เข้านอน | I go to bed early. | ฉันเข้านอนเร็ว
---
set an alarm | ตั้งนาฬิกาปลุก | Set an alarm for five. | ตั้งปลุกตีห้า
feed the cat | ให้อาหารแมว | Feed the cat, please. | ให้อาหารแมวด้วย
take out the trash | เอาขยะไปทิ้ง | Take out the trash. | เอาขยะไปทิ้ง
make the bed | ปูเตียง | Make your bed. | ปูเตียงด้วย
lock the door | ล็อกประตู | Lock the door at night. | ล็อกประตูตอนกลางคืน
turn off the lights | ปิดไฟ | Turn off the lights. | ปิดไฟ
`);
U('police', 2, 'สายตรวจและเวร', `
beat | เขตตรวจ | This street is on my beat. | ถนนนี้อยู่ในเขตตรวจของฉัน
night shift | กะกลางคืน | I work the night shift. | ฉันเข้ากะกลางคืน
partner | คู่หู | My partner is driving. | คู่หูกำลังขับรถ
patrol route | เส้นทางตรวจ | Follow the patrol route. | ตามเส้นทางตรวจ
logbook | สมุดบันทึก | Write it in the logbook. | เขียนลงสมุดบันทึก
briefing | การชี้แจงก่อนปฏิบัติงาน | The briefing is at 7. | ประชุมชี้แจงตอนเจ็ดโมง
---
call sign | รหัสเรียกขาน | My call sign is Alpha 2. | รหัสเรียกขานคือ อัลฟา 2
response time | เวลาตอบสนอง | Our response time is five minutes. | เราไปถึงภายในห้านาที
hot spot | จุดเสี่ยง | This market is a hot spot. | ตลาดนี้เป็นจุดเสี่ยง
check on | ไปดู/ตรวจดู | Check on the old man. | ไปดูคุณลุงหน่อย
handover | การส่งเวร | The handover is at 8. | ส่งเวรตอนแปดโมง
off-duty | นอกเวร | He was off-duty. | เขาไม่ได้อยู่เวร
`);
U('daily', 3, 'การแพทย์ฉุกเฉินพื้นฐาน', `
CPR | การปั๊มหัวใจ | Do you know CPR? | คุณทำ CPR เป็นไหม
choke | สำลัก | The child is choking. | เด็กกำลังสำลัก
burn | แผลไฟไหม้/ลวก | Cool the burn with water. | ราดน้ำที่แผลไฟลวก
faint | เป็นลม | She fainted in the heat. | เธอเป็นลมเพราะร้อน
dizzy | เวียนหัว | I feel dizzy. | ฉันเวียนหัว
pulse | ชีพจร | Check his pulse. | ตรวจชีพจร
---
bleeding | เลือดออก | Stop the bleeding. | ห้ามเลือด
pressure | แรงกด | Apply pressure. | กดไว้
stretcher | เปลหาม | Bring a stretcher. | เอาเปลหามมา
heart attack | หัวใจวาย | He had a heart attack. | เขาหัวใจวาย
seizure | อาการชัก | He is having a seizure. | เขากำลังชัก
recovery position | ท่าพักฟื้น | Put him in the recovery position. | จับเขานอนท่าพักฟื้น
`);
U('talk', 3, 'การบ่นและร้องเรียน', `
I'd like to complain | ขอร้องเรียน | I'd like to complain about the noise. | ขอร้องเรียนเรื่องเสียงดัง
not working | ใช้ไม่ได้ | The light is not working. | ไฟใช้ไม่ได้
it's not acceptable | รับไม่ได้ | This is not acceptable. | อย่างนี้รับไม่ได้
I expected | ฉันคาดว่า | I expected better service. | ฉันคาดว่าบริการจะดีกว่านี้
disappointing | น่าผิดหวัง | The food was disappointing. | อาหารน่าผิดหวัง
fix it | ซ่อม/แก้ให้ | Please fix it. | ช่วยแก้ให้ด้วย
---
refund please | ขอคืนเงิน | I want a refund, please. | ขอคืนเงิน
speak to someone | คุยกับใครสักคน | Can I speak to someone in charge? | ขอคุยกับผู้รับผิดชอบ
this is the second time | ครั้งที่สองแล้ว | This is the second time! | นี่ครั้งที่สองแล้ว!
I'm not happy with | ฉันไม่พอใจ | I'm not happy with this. | ฉันไม่พอใจเรื่องนี้
what will you do | คุณจะทำยังไง | What will you do about it? | คุณจะจัดการยังไง
make it right | แก้ไขให้ถูกต้อง | Please make it right. | ช่วยแก้ให้ถูกต้อง
`);
U('daily', 4, 'บ้านและการซ่อมแซม', `
leak | รั่ว | The roof is leaking. | หลังคารั่ว
repair | ซ่อมแซม | We need to repair the wall. | ต้องซ่อมผนัง
tool | เครื่องมือ | Bring your tools. | เอาเครื่องมือมาด้วย
hammer | ค้อน | Use a hammer. | ใช้ค้อน
screwdriver | ไขควง | Pass me the screwdriver. | ส่งไขควงมา
ladder | บันได (พาด) | Hold the ladder. | จับบันไดไว้
---
paint | ทาสี | We painted the house. | เราทาสีบ้าน
renovate | ปรับปรุง (บ้าน) | They renovated the kitchen. | พวกเขาปรับปรุงครัว
pipe | ท่อ | The pipe is broken. | ท่อแตก
wire | สายไฟ | Don't touch the wire. | อย่าแตะสายไฟ
roof | หลังคา | The roof needs repair. | หลังคาต้องซ่อม
blackout | ไฟดับทั้งพื้นที่ | There was a blackout. | ไฟดับทั้งเขต
`);
U('police', 4, 'การสอบสวนผู้ต้องสงสัย', `
alibi check | ตรวจสอบข้อแก้ตัว | We did an alibi check. | เราตรวจสอบข้อแก้ตัว
lie | โกหก | He lied to the police. | เขาโกหกตำรวจ
contradict | ขัดแย้ง | His statements contradict. | คำให้การของเขาขัดกัน
nervous behavior | พฤติกรรมกระวนกระวาย | He showed nervous behavior. | เขาแสดงพฤติกรรมกระวนกระวาย
cooperate fully | ให้ความร่วมมือเต็มที่ | Please cooperate fully. | กรุณาให้ความร่วมมือเต็มที่
open-ended question | คำถามปลายเปิด | Ask open-ended questions. | ถามคำถามปลายเปิด
---
leading question | คำถามชี้นำ | Avoid leading questions. | หลีกเลี่ยงคำถามชี้นำ
body language | ภาษากาย | Watch his body language. | สังเกตภาษากาย
confession | คำสารภาพ | He signed a confession. | เขาลงนามคำสารภาพ
accomplice | ผู้สมรู้ร่วมคิด | He had an accomplice. | เขามีผู้สมรู้ร่วมคิด
timeline | ลำดับเหตุการณ์ | Build a timeline. | ทำลำดับเหตุการณ์
deny everything | ปฏิเสธทุกอย่าง | The suspect denied everything. | ผู้ต้องสงสัยปฏิเสธทุกอย่าง
`);
U('talk', 4, 'การให้คำแนะนำทาง/วิธีทำ', `
first step | ขั้นแรก | The first step is easy. | ขั้นแรกง่าย
next step | ขั้นต่อไป | What's the next step? | ขั้นต่อไปคืออะไร
make sure you | อย่าลืม... | Make sure you lock it. | อย่าลืมล็อกนะ
be sure to | ต้อง...ให้ได้ | Be sure to bring your ID. | ต้องนำบัตรมาให้ได้
it's best to | ดีที่สุดคือ | It's best to go early. | ไปเช้าดีที่สุด
you'll need | คุณต้องใช้ | You'll need a passport. | คุณต้องใช้พาสปอร์ต
---
straight ahead | ตรงไปข้างหน้า | Go straight ahead. | ตรงไปข้างหน้า
take the second left | เลี้ยวซ้ายที่สอง | Take the second left. | เลี้ยวซ้ายแยกที่สอง
you can't miss it | หาง่ายมาก | It's big. You can't miss it. | ใหญ่มาก หาง่าย
on foot | เดินเท้า | It's ten minutes on foot. | เดินสิบนาที
across from | ตรงข้าม | It's across from the bank. | อยู่ตรงข้ามธนาคาร
at the end of | ที่สุด/ปลาย | It's at the end of the street. | อยู่สุดถนน
`);
U('daily', 5, 'ความรู้สึกที่ซับซ้อน', `
nostalgic | คิดถึงอดีต | This song makes me nostalgic. | เพลงนี้ทำให้คิดถึงอดีต
skeptical | ไม่เชื่อง่ายๆ | I'm skeptical about it. | ฉันยังไม่ค่อยเชื่อ
optimistic | มองโลกในแง่ดี | Stay optimistic. | มองโลกในแง่ดีไว้
pessimistic | มองโลกในแง่ร้าย | Don't be so pessimistic. | อย่ามองโลกในแง่ร้ายนัก
indifferent | เฉยเมย | He seemed indifferent. | เขาดูเฉยเมย
---
devastated | เสียใจสุดๆ | She was devastated by the news. | เธอเสียใจสุดๆ กับข่าว
thrilled | ดีใจสุดๆ | I'm thrilled to be here. | ดีใจมากที่ได้มา
insecure | ไม่มั่นใจในตัวเอง | He feels insecure. | เขารู้สึกไม่มั่นใจ
content | พอใจ | I'm content with my life. | ฉันพอใจกับชีวิต
hopeful | มีความหวัง | We are hopeful. | เรามีความหวัง
`);
U('police', 5, 'ข่าวกรองและการเฝ้าติดตาม', `
stakeout | การซุ่มเฝ้า | They did a stakeout all night. | พวกเขาซุ่มเฝ้าทั้งคืน
wiretap | การดักฟัง | A wiretap needs a court order. | การดักฟังต้องมีคำสั่งศาล
tip-off | การแจ้งเบาะแส | They got a tip-off. | ได้รับแจ้งเบาะแส
lead | เบาะแสที่ตามต่อได้ | We have a new lead. | เรามีเบาะแสใหม่
tail | สะกดรอยตาม | Tail the suspect. | สะกดรอยผู้ต้องสงสัย
cover | การอำพราง | Don't blow your cover. | อย่าให้ถูกเปิดโปง
---
sting operation | ปฏิบัติการล่อซื้อ | It was a sting operation. | เป็นปฏิบัติการล่อซื้อ
decoy | ตัวล่อ | They used a decoy. | พวกเขาใช้ตัวล่อ
safe distance | ระยะปลอดภัย | Keep a safe distance. | รักษาระยะห่างปลอดภัย
monitor | ติดตาม/เฝ้าดู | Monitor his phone. | ติดตามโทรศัพท์ของเขา
profile | โปรไฟล์/ประวัติ | We built a profile of the suspect. | เราทำโปรไฟล์ผู้ต้องสงสัย
classified | ลับ | This information is classified. | ข้อมูลนี้เป็นความลับ
`);
U('daily', 6, 'ศัพท์ทางจิตวิทยา', `
cognitive | เกี่ยวกับการรับรู้/ความคิด | It affects cognitive skills. | มันกระทบทักษะการคิด
perception | การรับรู้ | Perception is not always reality. | การรับรู้ไม่ใช่ความจริงเสมอ
motivation | แรงจูงใจ | Find your motivation. | หาแรงจูงใจของคุณ
resilience | ความยืดหยุ่นทางใจ | Build resilience. | สร้างความเข้มแข็งทางใจ
trauma | บาดแผลทางใจ | Victims may suffer trauma. | ผู้เสียหายอาจมีบาดแผลทางใจ
empathy | ความเข้าอกเข้าใจ | Empathy helps officers. | ความเข้าอกเข้าใจช่วยเจ้าหน้าที่
---
coping | การรับมือ | Learn coping skills. | เรียนรู้วิธีรับมือ
burnout | ภาวะหมดไฟ | Avoid burnout. | หลีกเลี่ยงภาวะหมดไฟ
self-esteem | ความนับถือตนเอง | She has low self-esteem. | เธอนับถือตัวเองต่ำ
impulse | แรงกระตุ้น | He acted on impulse. | เขาทำไปตามอารมณ์ชั่ววูบ
behavioral | ทางพฤติกรรม | There are behavioral changes. | มีการเปลี่ยนแปลงทางพฤติกรรม
well-being | ความเป็นอยู่ที่ดี | Mental well-being matters. | สุขภาวะทางใจสำคัญ
`);
U('talk', 6, 'การโต้วาที', `
counterargument | ข้อโต้แย้งกลับ | Consider the counterargument. | พิจารณาข้อโต้แย้งกลับ
rebuttal | การโต้กลับ | Prepare your rebuttal. | เตรียมคำโต้กลับ
premise | ข้อตั้ง | The premise is wrong. | ข้อตั้งผิด
fallacy | ตรรกะวิบัติ | That's a logical fallacy. | นั่นคือตรรกะวิบัติ
valid point | ประเด็นที่สมเหตุสมผล | You make a valid point. | คุณมีประเด็นที่สมเหตุสมผล
concede | ยอมรับ (ในบางส่วน) | I concede that point. | ผมยอมรับประเด็นนั้น
---
outweigh | มีน้ำหนักมากกว่า | The benefits outweigh the costs. | ข้อดีมากกว่าข้อเสีย
by contrast | ในทางตรงข้าม | By contrast, the rural rate fell. | ในทางตรงข้าม อัตราในชนบทลดลง
it follows that | จึงตามมาว่า | It follows that we must act. | จึงตามมาว่าเราต้องลงมือ
to some extent | ในระดับหนึ่ง | I agree to some extent. | เห็นด้วยในระดับหนึ่ง
compelling | น่าเชื่อถือ/หนักแน่น | It's a compelling argument. | เป็นข้อโต้แย้งที่หนักแน่น
flawed | มีข้อบกพร่อง | The logic is flawed. | ตรรกะมีข้อบกพร่อง
`);

// เรียงหน่วยตามระดับ (ความคืบหน้าบันทึกด้วยชื่อหน่วย จึงแทรกหน่วยใหม่ได้)
Object.values(COURSES).forEach(C => C.units.sort((a, b) => a.lv - b.lv));

