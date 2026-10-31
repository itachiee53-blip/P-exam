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
___ is my pen. | This | These, Those, They | ใกล้ + อันเดียวใช้ This | นี่คือปากกาของฉัน
___ are my friends. | These | This, That, It | ใกล้ + หลายคนใช้ These | เหล่านี้คือเพื่อนของฉัน
Look at ___ car over there. | that | this, these, those | ไกล + อันเดียวใช้ that | ดูรถคันนั้นทางโน้นสิ
___ books on the shelf are old. | Those | That, This, It | ไกล + หลายอันใช้ Those | หนังสือพวกนั้นบนชั้นเก่าแล้ว
Is ___ your bag? | this | these, those, they | ใกล้ + อันเดียว | นี่กระเป๋าของคุณใช่ไหม
Are ___ your shoes? | those | that, this, it | ไกล + หลายอัน | นั่นรองเท้าของคุณใช่ไหม
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

U('basic', 0, 'ห้องและบ้านง่ายๆ', `
home | บ้าน | I'm at home. | ฉันอยู่บ้าน
wall | ผนัง | The wall is white. | ผนังสีขาว
toilet | ห้องน้ำ/ส้วม | Where is the toilet? | ห้องน้ำอยู่ไหน
stairs | บันได | Go up the stairs. | ขึ้นบันได
lamp | โคมไฟ | Turn on the lamp. | เปิดโคมไฟ
---
TV | โทรทัศน์ | Turn off the TV. | ปิดทีวี
sofa | โซฟา | Sit on the sofa. | นั่งบนโซฟา
fridge door | ประตูตู้เย็น | Close the fridge door. | ปิดประตูตู้เย็น
pillow | หมอน | I need a pillow. | ฉันต้องการหมอน
blanket | ผ้าห่ม | It's cold. Get a blanket. | หนาว เอาผ้าห่มมา
`);
U('daily', 1, 'เสื้อผ้าและลักษณะ', `
long sleeve | แขนยาว | A long sleeve shirt, please. | ขอเสื้อแขนยาว
short sleeve | แขนสั้น | It's a short sleeve shirt. | เป็นเสื้อแขนสั้น
jeans | กางเกงยีนส์ | He wears blue jeans. | เขาใส่ยีนส์สีฟ้า
shorts | กางเกงขาสั้น | It's hot. Wear shorts. | ร้อน ใส่กางเกงขาสั้น
sandals | รองเท้าแตะ | Take off your sandals. | ถอดรองเท้าแตะ
sneakers | รองเท้าผ้าใบ | He wore white sneakers. | เขาใส่รองเท้าผ้าใบสีขาว
---
cap | หมวกแก๊ป | He wore a black cap. | เขาใส่หมวกแก๊ปสีดำ
hoodie | เสื้อฮู้ด | The thief wore a hoodie. | ขโมยใส่เสื้อฮู้ด
mask | หน้ากาก | He wore a face mask. | เขาใส่หน้ากากอนามัย
sunglasses | แว่นกันแดด | She wears sunglasses. | เธอใส่แว่นกันแดด
striped | ลายทาง | A striped shirt. | เสื้อลายทาง
plain | สีพื้น/เรียบ | A plain white T-shirt. | เสื้อยืดสีขาวเรียบ
`);
U('police', 1, 'อาการและเหตุด่วน', `
help me | ช่วยด้วย | Help me, please! | ช่วยด้วย!
fire! | ไฟไหม้! | Fire! Get out! | ไฟไหม้! ออกไป!
thief! | ขโมย! | Thief! Stop him! | ขโมย! จับไว้!
call 191 | โทร 191 | Call 191 now! | โทร 191 เดี๋ยวนี้!
I'm lost | ฉันหลงทาง | Excuse me, I'm lost. | ขอโทษ ฉันหลงทาง
I'm hurt | ฉันเจ็บ | I'm hurt. Call a doctor. | ฉันเจ็บ เรียกหมอ
---
someone is following me | มีคนตามฉัน | Someone is following me. | มีคนตามฉัน
he took my phone | เขาเอาโทรศัพท์ฉันไป | He took my phone! | เขาเอาโทรศัพท์ฉันไป!
over there | ทางโน้น | He went over there. | เขาไปทางโน้น
hurry | รีบ | Hurry, please! | รีบหน่อย!
be quiet | เงียบ | Be quiet! | เงียบ!
stay here | อยู่ตรงนี้ | Stay here. | อยู่ตรงนี้
`);
U('daily', 2, 'ธนาคารพื้นฐาน', `
ATM | ตู้เอทีเอ็ม | Where is the ATM? | ตู้เอทีเอ็มอยู่ไหน
PIN | รหัสบัตร | Never share your PIN. | อย่าบอกรหัสบัตร
balance | ยอดเงิน | Check your balance. | เช็คยอดเงิน
account number | เลขบัญชี | What's your account number? | เลขบัญชีอะไร
bank book | สมุดบัญชี | Bring your bank book. | นำสมุดบัญชีมา
bank transfer | โอนเงิน | I'll do a bank transfer. | ฉันจะโอนเงิน
---
QR code | คิวอาร์โค้ด | Scan the QR code. | สแกนคิวอาร์โค้ด
coin | เหรียญ | I have some coins. | ฉันมีเหรียญ
banknote | ธนบัตร | A 1,000-baht banknote. | ธนบัตรพันบาท
fee | ค่าธรรมเนียม | There's no fee. | ไม่มีค่าธรรมเนียม
savings | เงินออม | I have some savings. | ฉันมีเงินออม
interest | ดอกเบี้ย | The interest rate is low. | ดอกเบี้ยต่ำ
`);
U('talk', 2, 'ชวนคุยเรื่องทั่วไป', `
what's new | มีอะไรใหม่ไหม | Hey, what's new? | เฮ้ มีอะไรใหม่ไหม
how was your day | วันนี้เป็นไงบ้าง | How was your day? | วันนี้เป็นไงบ้าง
not bad | ก็ดี | Not bad, thanks. | ก็ดี ขอบคุณ
pretty good | ค่อนข้างดี | Pretty good! | ค่อนข้างดีเลย!
so-so | งั้นๆ | It was so-so. | ก็งั้นๆ
nice weather | อากาศดี | Nice weather today! | วันนี้อากาศดี!
---
weekend plans | แผนวันหยุด | Any weekend plans? | มีแผนวันหยุดไหม
I'm into | ฉันชอบ/อิน | I'm into football. | ฉันชอบฟุตบอล
same here | เหมือนกัน | Same here! | เหมือนกันเลย!
good to know | ดีที่รู้ | Good to know. | ดีที่รู้นะ
catch up | คุยอัปเดตกัน | Let's catch up soon. | เร็วๆ นี้มาคุยอัปเดตกัน
`);
U('police', 2, 'คำบรรยายรูปร่างหน้าตา', `
bald | หัวล้าน | He is bald. | เขาหัวล้าน
curly hair | ผมหยิก | She has curly hair. | เธอผมหยิก
straight hair | ผมตรง | Long straight hair. | ผมยาวตรง
mustache | หนวด | He has a mustache. | เขามีหนวด
slim | ผอมเพรียว | She is slim. | เธอผอมเพรียว
medium height | สูงปานกลาง | He is of medium height. | เขาสูงปานกลาง
---
dark skin | ผิวคล้ำ | He has dark skin. | เขาผิวคล้ำ
fair skin | ผิวขาว | She has fair skin. | เธอผิวขาว
in his twenties | อายุยี่สิบกว่า | He is in his twenties. | เขาอายุยี่สิบกว่า
middle-aged | วัยกลางคน | A middle-aged woman. | ผู้หญิงวัยกลางคน
limp | เดินกะเผลก | He walks with a limp. | เขาเดินกะเผลก
accent | สำเนียง | He has a northern accent. | เขามีสำเนียงเหนือ
`);
U('daily', 3, 'ชีวิตในเมืองและชนบท', `
countryside | ชนบท | I grew up in the countryside. | ฉันโตในชนบท
downtown | ใจกลางเมือง | I work downtown. | ฉันทำงานกลางเมือง
suburb | ชานเมือง | We live in the suburbs. | เราอยู่ชานเมือง
rice field | นาข้าว | There are rice fields everywhere. | มีนาข้าวทุกที่
farm | ฟาร์ม | My uncle has a farm. | ลุงมีฟาร์ม
factory | โรงงาน | She works in a factory. | เธอทำงานในโรงงาน
---
skyscraper | ตึกระฟ้า | Bangkok has many skyscrapers. | กรุงเทพฯ มีตึกระฟ้าเยอะ
noise pollution | มลพิษทางเสียง | The city has noise pollution. | เมืองมีมลพิษทางเสียง
cost of living | ค่าครองชีพ | The cost of living is high. | ค่าครองชีพสูง
commute | เดินทางไปทำงาน | My commute is one hour. | ฉันเดินทางไปทำงานชั่วโมงหนึ่ง
local | ท้องถิ่น | Try the local food. | ลองอาหารท้องถิ่น
neighborhood | ละแวกบ้าน | It's a quiet neighborhood. | เป็นละแวกที่เงียบ
`);
U('talk', 3, 'การวางแผนและการนัด', `
schedule a meeting | นัดประชุม | Let's schedule a meeting. | นัดประชุมกัน
reschedule | เลื่อนนัด | Can we reschedule? | เลื่อนนัดได้ไหม
cancel the appointment | ยกเลิกนัด | I need to cancel the appointment. | ต้องยกเลิกนัด
confirm the time | ยืนยันเวลา | Please confirm the time. | ยืนยันเวลาด้วย
be on time | ตรงเวลา | Please be on time. | มาตรงเวลานะ
running late | จะไปสาย | Sorry, I'm running late. | ขอโทษ กำลังจะไปสาย
---
the day after tomorrow | มะรืนนี้ | See you the day after tomorrow. | เจอกันมะรืน
next Monday | วันจันทร์หน้า | Is next Monday OK? | วันจันทร์หน้าโอเคไหม
in the morning | ตอนเช้า | Let's meet in the morning. | เจอกันตอนเช้า
in advance | ล่วงหน้า | Book in advance. | จองล่วงหน้า
on the way | อยู่ระหว่างทาง | I'm on the way. | กำลังไป
see you there | เจอกันที่นั่น | OK, see you there. | โอเค เจอกันที่นั่น
`);
U('daily', 4, 'ภัยออนไลน์และความปลอดภัย', `
scammer | มิจฉาชีพ | Don't trust scammers. | อย่าไว้ใจมิจฉาชีพ
fake profile | โปรไฟล์ปลอม | He used a fake profile. | เขาใช้โปรไฟล์ปลอม
romance scam | หลอกให้รัก | She lost money in a romance scam. | เธอเสียเงินจากการหลอกให้รัก
call center gang | แก๊งคอลเซ็นเตอร์ | Beware of call center gangs. | ระวังแก๊งคอลเซ็นเตอร์
OTP | รหัสยืนยันครั้งเดียว | Never share your OTP. | อย่าบอกรหัส OTP
suspicious link | ลิงก์น่าสงสัย | Don't click suspicious links. | อย่ากดลิงก์น่าสงสัย
---
hack | แฮก | My account was hacked. | บัญชีถูกแฮก
report scam | แจ้งมิจฉาชีพ | Report the scam to 1441. | แจ้งมิจฉาชีพที่ 1441
too good to be true | ดีเกินจริง | It's too good to be true. | ดีเกินกว่าจะเป็นจริง
urgent request | ขอด่วน | Be careful of urgent requests. | ระวังการขอด่วนๆ
verify identity | ยืนยันตัวตน | Always verify identity. | ยืนยันตัวตนทุกครั้ง
`);
U('police', 4, 'คดีอุบัติเหตุจราจร', `
collision | การชน | There was a collision at the junction. | มีการชนที่แยก
head-on | ประสานงา | It was a head-on crash. | ชนประสานงา
rear-end | ชนท้าย | A truck rear-ended my car. | รถบรรทุกชนท้ายรถฉัน
hit-and-run | ชนแล้วหนี | It was a hit-and-run. | ชนแล้วหนี
skid marks | รอยเบรก | Look at the skid marks. | ดูรอยเบรก
dashcam | กล้องหน้ารถ | Check the dashcam video. | ดูคลิปกล้องหน้ารถ
---
liable | ต้องรับผิด | The driver is liable. | คนขับต้องรับผิด
settle | ตกลงยอมความ | They settled on the spot. | ตกลงยอมความกันที่เกิดเหตุ
claim number | เลขเคลม | Write down the claim number. | จดเลขเคลม
tow truck | รถลาก | Call a tow truck. | เรียกรถลาก
fatality | ผู้เสียชีวิต | There was one fatality. | มีผู้เสียชีวิตหนึ่งราย
reckless driving | ขับรถประมาท | He was charged with reckless driving. | เขาถูกตั้งข้อหาขับรถประมาท
`);
U('talk', 5, 'การสัมภาษณ์และนำเสนอตัวเอง', `
background | ภูมิหลัง | Tell me about your background. | เล่าภูมิหลังของคุณ
teamwork | การทำงานเป็นทีม | I'm good at teamwork. | ฉันเก่งเรื่องทำงานเป็นทีม
leadership | ภาวะผู้นำ | I showed leadership. | ฉันแสดงภาวะผู้นำ
problem-solving | การแก้ปัญหา | I have problem-solving skills. | ฉันมีทักษะแก้ปัญหา
dedicated | ทุ่มเท | I'm dedicated to my work. | ฉันทุ่มเทให้งาน
---
under pressure | ภายใต้แรงกดดัน | I work well under pressure. | ฉันทำงานได้ดีภายใต้แรงกดดัน
motivated | มีแรงจูงใจ | I'm highly motivated. | ฉันมีแรงจูงใจสูง
contribute to | มีส่วนช่วย | I want to contribute to society. | ฉันอยากมีส่วนช่วยสังคม
long-term goal | เป้าหมายระยะยาว | My long-term goal is to lead. | เป้าระยะยาวคือเป็นผู้นำ
adapt | ปรับตัว | I adapt quickly. | ฉันปรับตัวเร็ว
passionate | หลงใหล/มีไฟ | I'm passionate about justice. | ฉันมีไฟเรื่องความยุติธรรม
`);
U('daily', 6, 'ศัพท์สื่อและวาทกรรม', `
narrative | เรื่องเล่า/การเล่า | Control the narrative. | ควบคุมการเล่าเรื่อง
propaganda | โฆษณาชวนเชื่อ | That is propaganda. | นั่นคือโฆษณาชวนเชื่อ
misinformation | ข้อมูลผิด | Stop misinformation. | หยุดข้อมูลผิด
censorship | การเซ็นเซอร์ | They oppose censorship. | พวกเขาต่อต้านการเซ็นเซอร์
public opinion | ความคิดเห็นสาธารณะ | Public opinion is changing. | ความเห็นสาธารณะกำลังเปลี่ยน
viral | แพร่กระจายอย่างรวดเร็ว | The video went viral. | คลิปไวรัล
---
echo chamber | ห้องเสียงสะท้อน (ฟังแต่ความเห็นเดียวกัน) | Social media creates echo chambers. | โซเชียลสร้างห้องเสียงสะท้อน
credibility | ความน่าเชื่อถือ | The source lacks credibility. | แหล่งข่าวขาดความน่าเชื่อถือ
sensational | หวือหวา | It's a sensational headline. | พาดหัวหวือหวา
objective | เป็นกลาง/วัตถุวิสัย | Be objective. | เป็นกลาง
discourse | วาทกรรม | Public discourse is divided. | วาทกรรมสาธารณะแตกแยก
fact-check | ตรวจสอบข้อเท็จจริง | Always fact-check. | ตรวจสอบข้อเท็จจริงเสมอ
`);
U('police', 6, 'การจัดการภาวะวิกฤต', `
contingency plan | แผนสำรอง | We need a contingency plan. | เราต้องมีแผนสำรอง
command center | ศูนย์บัญชาการ | Report to the command center. | รายงานศูนย์บัญชาการ
mobilize | ระดมกำลัง | Mobilize all units. | ระดมทุกหน่วย
casualty | ผู้บาดเจ็บ/เสียชีวิต | There were many casualties. | มีผู้บาดเจ็บล้มตายจำนวนมาก
triage | คัดแยกผู้ป่วย | Medics began triage. | หน่วยแพทย์เริ่มคัดแยก
lockdown | ปิดพื้นที่ | The school is in lockdown. | โรงเรียนปิดพื้นที่
---
perimeter | แนวรอบนอก | Secure the perimeter. | ควบคุมแนวรอบนอก
coordinate | ประสานงาน | Coordinate with the army. | ประสานงานกับทหาร
situational awareness | การรับรู้สถานการณ์ | Keep situational awareness. | รักษาการรับรู้สถานการณ์
aftermath | ผลพวงหลังเหตุการณ์ | In the aftermath, we helped victims. | หลังเหตุการณ์เราช่วยผู้ประสบภัย
debrief | สรุปผลหลังปฏิบัติการ | We'll debrief tomorrow. | พรุ่งนี้สรุปผลปฏิบัติการ
protocol | ระเบียบปฏิบัติ | Follow the protocol. | ทำตามระเบียบปฏิบัติ
`);

U('daily', 1, 'อารมณ์พื้นฐาน', `
sad | เศร้า | Why are you sad? | ทำไมเศร้า
scared | กลัว | I'm scared of dogs. | ฉันกลัวหมา
bored | เบื่อ | I'm bored. | ฉันเบื่อ
surprised | แปลกใจ | I was surprised. | ฉันแปลกใจ
lonely | เหงา | He feels lonely. | เขารู้สึกเหงา
sleepy | ง่วง | I'm sleepy. | ฉันง่วง
---
thirsty | กระหายน้ำ | I'm thirsty. | ฉันหิวน้ำ
sick | ป่วย | She is sick today. | วันนี้เธอป่วย
glad | ดีใจ | I'm glad you came. | ดีใจที่คุณมา
upset | ไม่พอใจ/เสียใจ | Don't be upset. | อย่าเสียใจเลย
cold feeling | รู้สึกหนาว | I feel cold. | ฉันรู้สึกหนาว
`);
U('police', 1, 'คำถามพื้นฐานของตำรวจ', `
what's your name | คุณชื่ออะไร | What's your name, sir? | คุณชื่ออะไรครับ
where are you going | จะไปไหน | Where are you going? | คุณจะไปไหน
where are you from | มาจากไหน | Where are you from? | คุณมาจากไหน
is this your car | รถคุณใช่ไหม | Is this your car? | รถคันนี้ของคุณใช่ไหม
do you have ID | มีบัตรไหม | Do you have ID? | มีบัตรประจำตัวไหม
how can I help | ให้ช่วยอะไร | How can I help you? | ให้ช่วยอะไรครับ
---
what happened here | เกิดอะไรขึ้นที่นี่ | What happened here? | เกิดอะไรขึ้นที่นี่
anyone hurt | มีใครเจ็บไหม | Is anyone hurt? | มีใครเจ็บไหม
which way | ทางไหน | Which way did he go? | เขาไปทางไหน
what color | สีอะไร | What color was the car? | รถสีอะไร
how many people | กี่คน | How many people were there? | มีกี่คน
`);
U('daily', 2, 'การเดินทางทางอากาศ', `
boarding pass | บัตรขึ้นเครื่อง | Show your boarding pass. | แสดงบัตรขึ้นเครื่อง
gate | ประตูขึ้นเครื่อง | Go to gate 5. | ไปประตู 5
flight | เที่ยวบิน | My flight is at noon. | เที่ยวบินฉันเที่ยงวัน
check-in counter | เคาน์เตอร์เช็คอิน | Go to the check-in counter. | ไปเคาน์เตอร์เช็คอิน
carry-on | กระเป๋าถือขึ้นเครื่อง | One carry-on bag only. | กระเป๋าถือขึ้นเครื่องหนึ่งใบ
window seat | ที่นั่งริมหน้าต่าง | A window seat, please. | ขอที่นั่งริมหน้าต่าง
---
aisle seat | ที่นั่งริมทางเดิน | I prefer an aisle seat. | ฉันชอบที่นั่งริมทางเดิน
security check | ตรวจความปลอดภัย | Go through the security check. | ผ่านจุดตรวจความปลอดภัย
land | (เครื่อง) ลง | We landed safely. | เราลงจอดปลอดภัย
baggage claim | จุดรับกระเป๋า | Go to baggage claim. | ไปรับกระเป๋า
jet lag | อาการเจ็ตแล็ก | I have jet lag. | ฉันเจ็ตแล็ก
`);
U('talk', 2, 'การถามและให้ข้อมูล', `
could you tell me | ช่วยบอกหน่อยได้ไหม | Could you tell me the time? | ช่วยบอกเวลาหน่อย
do you know | คุณรู้ไหม | Do you know where it is? | รู้ไหมว่าอยู่ไหน
I'm looking for | ฉันกำลังหา | I'm looking for the bank. | ฉันหาธนาคาร
is there | มี...ไหม | Is there a shop near here? | แถวนี้มีร้านไหม
how far | ไกลแค่ไหน | How far is it? | ไกลแค่ไหน
how do I | ฉันจะ...อย่างไร | How do I get there? | ไปที่นั่นยังไง
---
what time does | ...กี่โมง | What time does it open? | เปิดกี่โมง
let me know | บอกให้รู้ด้วย | Let me know, OK? | บอกด้วยนะ
I have a question | ฉันมีคำถาม | I have a question. | ฉันมีคำถาม
could you repeat | พูดซ้ำได้ไหม | Could you repeat that? | พูดอีกทีได้ไหม
what does it mean | แปลว่าอะไร | What does it mean? | แปลว่าอะไร
how do you spell | สะกดยังไง | How do you spell it? | สะกดยังไง
`);
U('police', 2, 'การช่วยเหลือนักท่องเที่ยว', `
tourist | นักท่องเที่ยว | The tourist needs help. | นักท่องเที่ยวต้องการความช่วยเหลือ
lost passport | พาสปอร์ตหาย | I have a lost passport. | ฉันทำพาสปอร์ตหาย
overcharge | เก็บเงินเกิน | The driver overcharged me. | คนขับเก็บเงินเกิน
receipt please | ขอใบเสร็จ | Ask for a receipt. | ขอใบเสร็จ
travel insurance | ประกันการเดินทาง | Do you have travel insurance? | มีประกันการเดินทางไหม
hotel name | ชื่อโรงแรม | What's your hotel name? | ชื่อโรงแรมอะไร
---
translate | แปล | I'll translate for you. | ผมจะแปลให้
map app | แอปแผนที่ | Use the map app. | ใช้แอปแผนที่
tourist police | ตำรวจท่องเที่ยว | Call the tourist police at 1155. | โทรตำรวจท่องเที่ยว 1155
scam warning | เตือนการหลอกลวง | Here is a scam warning. | นี่คือคำเตือนการหลอกลวง
local rules | กฎท้องถิ่น | Respect local rules. | เคารพกฎท้องถิ่น
enjoy your stay | ขอให้เที่ยวสนุก | Enjoy your stay! | ขอให้เที่ยวสนุก!
`);
U('daily', 3, 'สุขภาพจิตและความเครียด', `
stress | ความเครียด | Work causes stress. | งานทำให้เครียด
anxiety | ความวิตกกังวล | He suffers from anxiety. | เขามีภาวะวิตกกังวล
depression | ภาวะซึมเศร้า | Depression is an illness. | ซึมเศร้าเป็นโรค
relax | ผ่อนคลาย | Try to relax. | พยายามผ่อนคลาย
meditate | นั่งสมาธิ | I meditate every morning. | ฉันนั่งสมาธิทุกเช้า
counselor | ผู้ให้คำปรึกษา | Talk to a counselor. | คุยกับผู้ให้คำปรึกษา
---
sleep well | หลับสบาย | I didn't sleep well. | ฉันนอนไม่ค่อยหลับ
take a walk | ไปเดินเล่น | Take a walk to relax. | ไปเดินเล่นให้ผ่อนคลาย
talk it out | ระบายออกมา | Let's talk it out. | มาคุยระบายกัน
overthink | คิดมาก | Don't overthink. | อย่าคิดมาก
ask for help | ขอความช่วยเหลือ | It's OK to ask for help. | ขอความช่วยเหลือได้นะ
`);
U('talk', 3, 'แสดงความเห็นด้วยและไม่เห็นด้วย', `
I agree with you | ฉันเห็นด้วยกับคุณ | I agree with you. | ฉันเห็นด้วยกับคุณ
you're right | คุณพูดถูก | You're right. | คุณพูดถูก
that's true | จริง | That's true. | จริง
I'm not so sure | ไม่ค่อยแน่ใจ | I'm not so sure about that. | ไม่ค่อยแน่ใจนะ
I see what you mean | เข้าใจที่คุณพูด | I see what you mean, but… | เข้าใจที่คุณพูด แต่...
I'm against it | ฉันไม่เห็นด้วย | I'm against it. | ฉันคัดค้าน
---
that's a good point | ประเด็นดี | That's a good point. | ประเด็นดี
not necessarily | ไม่จำเป็นเสมอไป | Not necessarily. | ไม่จำเป็นเสมอไป
fair enough | ก็สมเหตุสมผล | Fair enough. | ก็โอเค สมเหตุสมผล
I couldn't agree more | เห็นด้วยที่สุด | I couldn't agree more. | เห็นด้วยที่สุด
let's agree to disagree | ต่างคนต่างความเห็นก็ได้ | Let's agree to disagree. | เห็นต่างกันได้
on the contrary | ตรงกันข้าม | On the contrary, it's cheap. | ตรงกันข้าม มันถูก
`);
U('daily', 4, 'การเงินส่วนบุคคล', `
income | รายได้ | My income is stable. | รายได้ฉันมั่นคง
expense | ค่าใช้จ่าย | Track your expenses. | ติดตามค่าใช้จ่าย
installment | ผ่อนชำระ | I pay in installments. | ฉันผ่อนชำระ
mortgage | สินเชื่อบ้าน | We have a mortgage. | เรามีหนี้บ้าน
pension | เงินบำนาญ | He gets a pension. | เขาได้เงินบำนาญ
insurance premium | เบี้ยประกัน | The premium is high. | เบี้ยประกันแพง
---
credit score | คะแนนเครดิต | Check your credit score. | เช็คคะแนนเครดิต
overdue | เกินกำหนด | The bill is overdue. | บิลเกินกำหนดชำระ
emergency fund | เงินสำรองฉุกเฉิน | Keep an emergency fund. | มีเงินสำรองฉุกเฉินไว้
loan shark | เงินกู้นอกระบบ | Avoid loan sharks. | หลีกเลี่ยงเงินกู้นอกระบบ
financial plan | แผนการเงิน | Make a financial plan. | วางแผนการเงิน
spending habit | พฤติกรรมการใช้จ่าย | Change your spending habits. | เปลี่ยนพฤติกรรมการใช้จ่าย
`);
U('police', 4, 'การรักษาความปลอดภัยงานใหญ่', `
VIP | บุคคลสำคัญ | Protect the VIP. | อารักขาบุคคลสำคัญ
escort | คุ้มกัน/ขบวนนำ | Police escorted the bus. | ตำรวจนำขบวนรถบัส
security check point | จุดตรวจความปลอดภัย | Pass the security checkpoint. | ผ่านจุดตรวจความปลอดภัย
metal detector | เครื่องตรวจโลหะ | Walk through the metal detector. | เดินผ่านเครื่องตรวจโลหะ
bag search | ตรวจกระเป๋า | There is a bag search. | มีการตรวจกระเป๋า
restricted area | พื้นที่หวงห้าม | This is a restricted area. | นี่คือพื้นที่หวงห้าม
---
access card | บัตรผ่าน | Show your access card. | แสดงบัตรผ่าน
crowd flow | การไหลของฝูงชน | Manage the crowd flow. | จัดการการไหลของฝูงชน
emergency exit | ทางออกฉุกเฉิน | Keep the emergency exit clear. | อย่าขวางทางออกฉุกเฉิน
evacuation route | เส้นทางอพยพ | Know the evacuation route. | รู้เส้นทางอพยพ
lost child | เด็กหลง | We found a lost child. | เราพบเด็กหลง
first aid station | จุดปฐมพยาบาล | Go to the first aid station. | ไปจุดปฐมพยาบาล
`);
U('talk', 4, 'อีเมลและการเขียนงาน', `
dear sir | เรียนท่าน | Dear Sir or Madam, | เรียนท่านที่เกี่ยวข้อง
I am writing to | ข้าพเจ้าเขียนมาเพื่อ | I am writing to apply for the job. | เขียนมาเพื่อสมัครงาน
please find attached | ตามที่แนบมา | Please find attached my CV. | ตามที่แนบประวัติมา
regarding | เกี่ยวกับ | Regarding your email… | เกี่ยวกับอีเมลของคุณ...
I look forward to | หวังว่าจะ | I look forward to your reply. | หวังว่าจะได้รับคำตอบ
best regards | ด้วยความนับถือ | Best regards, Nut | ด้วยความนับถือ นัท
---
kind regards | ด้วยความเคารพ | Kind regards, | ด้วยความเคารพ
subject line | หัวเรื่องอีเมล | Write a clear subject line. | เขียนหัวเรื่องให้ชัด
forward | ส่งต่อ | Forward the email to me. | ส่งต่ออีเมลมาให้
cc | สำเนาถึง | CC your manager. | ส่งสำเนาถึงหัวหน้า
reply all | ตอบทุกคน | Don't click reply all. | อย่ากดตอบทุกคน
follow up | ติดตามผล | I'll follow up tomorrow. | พรุ่งนี้จะติดตามผล
`);
U('daily', 5, 'สิ่งแวดล้อมและพลังงาน', `
solar panel | แผงโซลาร์ | We installed solar panels. | เราติดแผงโซลาร์
wind turbine | กังหันลม | Wind turbines make power. | กังหันลมผลิตไฟ
carbon footprint | รอยเท้าคาร์บอน | Reduce your carbon footprint. | ลดรอยเท้าคาร์บอน
electric vehicle | รถยนต์ไฟฟ้า | I drive an electric vehicle. | ฉันขับรถยนต์ไฟฟ้า
fossil fuel | เชื้อเพลิงฟอสซิล | Stop using fossil fuels. | เลิกใช้เชื้อเพลิงฟอสซิล
biodegradable | ย่อยสลายได้ | Use biodegradable bags. | ใช้ถุงย่อยสลายได้
---
ecosystem | ระบบนิเวศ | Protect the ecosystem. | ปกป้องระบบนิเวศ
habitat | ถิ่นที่อยู่ | The tiger's habitat is shrinking. | ถิ่นที่อยู่ของเสือลดลง
greenhouse gas | ก๊าซเรือนกระจก | Cut greenhouse gases. | ลดก๊าซเรือนกระจก
sustainability | ความยั่งยืน | Sustainability is key. | ความยั่งยืนเป็นหัวใจ
PM2.5 | ฝุ่นพีเอ็ม 2.5 | PM2.5 is high today. | วันนี้ฝุ่น PM2.5 สูง
air quality | คุณภาพอากาศ | Check the air quality. | เช็คคุณภาพอากาศ
`);
U('talk', 6, 'การวิจารณ์และการวิเคราะห์', `
critique | บทวิจารณ์/วิจารณ์ | Write a critique of the policy. | เขียนบทวิจารณ์นโยบาย
assess the impact | ประเมินผลกระทบ | We must assess the impact. | ต้องประเมินผลกระทบ
pros and cons | ข้อดีข้อเสีย | List the pros and cons. | ระบุข้อดีข้อเสีย
underlying cause | สาเหตุเบื้องลึก | Find the underlying cause. | หาสาเหตุเบื้องลึก
long-term effect | ผลระยะยาว | Consider the long-term effects. | พิจารณาผลระยะยาว
trade-off | การได้อย่างเสียอย่าง | It's a trade-off. | เป็นการได้อย่างเสียอย่าง
---
in hindsight | เมื่อมองย้อนกลับไป | In hindsight, it was a mistake. | มองย้อนไปแล้วมันผิดพลาด
take into account | นำมาพิจารณา | Take cost into account. | นำค่าใช้จ่ายมาพิจารณา
on balance | เมื่อชั่งน้ำหนักแล้ว | On balance, the plan is good. | ชั่งน้ำหนักแล้วแผนนี้ดี
shortcoming | ข้อบกพร่อง | The plan has shortcomings. | แผนมีข้อบกพร่อง
nuance | ความแตกต่างเล็กน้อย | Notice the nuance. | สังเกตความต่างเล็กน้อย
paradigm | กระบวนทัศน์ | It's a paradigm shift. | เป็นการเปลี่ยนกระบวนทัศน์
`);
U('police', 6, 'ความร่วมมือระหว่างประเทศ', `
Interpol | ตำรวจสากล | Interpol issued a notice. | ตำรวจสากลออกหมาย
red notice | หมายแดง | He is on a red notice. | เขาถูกออกหมายแดง
bilateral | ทวิภาคี | A bilateral agreement was signed. | ลงนามข้อตกลงทวิภาคี
treaty | สนธิสัญญา | An extradition treaty exists. | มีสนธิสัญญาส่งผู้ร้ายข้ามแดน
liaison officer | เจ้าหน้าที่ประสานงาน | Contact the liaison officer. | ติดต่อเจ้าหน้าที่ประสานงาน
joint operation | ปฏิบัติการร่วม | It was a joint operation. | เป็นปฏิบัติการร่วม
---
cross-border | ข้ามพรมแดน | Cross-border crime is rising. | อาชญากรรมข้ามพรมแดนเพิ่มขึ้น
deport | เนรเทศ | He was deported. | เขาถูกเนรเทศ
mutual legal assistance | ความช่วยเหลือทางกฎหมายระหว่างกัน | They requested mutual legal assistance. | ขอความช่วยเหลือทางกฎหมายระหว่างประเทศ
jurisdictional | เกี่ยวกับเขตอำนาจ | There was a jurisdictional dispute. | มีข้อพิพาทเรื่องเขตอำนาจ
global network | เครือข่ายทั่วโลก | They broke a global network. | ทลายเครือข่ายทั่วโลก
asylum | ลี้ภัย | He applied for asylum. | เขายื่นขอลี้ภัย
`);

U('basic', 0, 'คำนามรอบตัว 2', `
---
road | ถนน | The road is long. | ถนนยาว
`);
U('daily', 1, 'ร่างกายและความรู้สึกทางกาย', `
toothache | ปวดฟัน | I have a toothache. | ฉันปวดฟัน
stomachache | ปวดท้อง | He has a stomachache. | เขาปวดท้อง
cough | ไอ | She has a bad cough. | เธอไอหนัก
sore throat | เจ็บคอ | I have a sore throat. | ฉันเจ็บคอ
---
runny nose | น้ำมูกไหล | I have a runny nose. | ฉันน้ำมูกไหล
itchy | คัน | My skin is itchy. | ผิวฉันคัน
tired eyes | ตาล้า | I have tired eyes. | ตาฉันล้า
backache | ปวดหลัง | I have a backache. | ฉันปวดหลัง
sneeze | จาม | He sneezed loudly. | เขาจามเสียงดัง
vomit | อาเจียน | She vomited twice. | เธออาเจียนสองครั้ง
`);
U('police', 1, 'ป้ายและคำเตือนง่ายๆ', `
no smoking | ห้ามสูบบุหรี่ | No smoking here. | ห้ามสูบบุหรี่ที่นี่
danger zone | เขตอันตราย | Keep out of the danger zone. | ห้ามเข้าเขตอันตราย
slow down | ลดความเร็ว | Slow down, school zone. | ลดความเร็ว เขตโรงเรียน
wet floor | พื้นเปียก | Caution: wet floor. | ระวังพื้นเปียก
private | ส่วนบุคคล | Private property. | ทรัพย์สินส่วนบุคคล
---
pull | ดึง | Pull to open. | ดึงเพื่อเปิด
entrance only | ทางเข้าเท่านั้น | This is entrance only. | ทางเข้าเท่านั้น
no photos | ห้ามถ่ายภาพ | No photos allowed. | ห้ามถ่ายภาพ
keep left | ชิดซ้าย | Keep left. | ชิดซ้าย
watch your step | ระวังก้าว | Watch your step. | ระวังขั้นบันได
`);
U('daily', 2, 'งานบ้านเพิ่มเติม', `
dust | ปัดฝุ่น | Dust the shelves. | ปัดฝุ่นชั้นวาง
mop | ถูพื้น | Mop the floor. | ถูพื้น
fold | พับ | Fold the clothes. | พับเสื้อผ้า
hang | แขวน/ตาก | Hang the clothes outside. | ตากผ้าข้างนอก
tidy up | จัดให้เรียบร้อย | Tidy up your room. | จัดห้องให้เรียบร้อย
water the plants | รดน้ำต้นไม้ | Water the plants daily. | รดน้ำต้นไม้ทุกวัน
---
trash bag | ถุงขยะ | We need trash bags. | เราต้องการถุงขยะ
bucket | ถังน้ำ | Fill the bucket. | เติมน้ำในถัง
broom | ไม้กวาด | Where is the broom? | ไม้กวาดอยู่ไหน
detergent | ผงซักฟอก | Buy detergent. | ซื้อผงซักฟอก
chore | งานบ้าน | I hate chores. | ฉันเกลียดงานบ้าน
messy | รก | The room is messy. | ห้องรก
`);
U('talk', 2, 'การขออนุญาตและการขอ', `
can I | ขอ...ได้ไหม | Can I sit here? | ขอนั่งตรงนี้ได้ไหม
may I | ขออนุญาต | May I come in? | ขออนุญาตเข้าไป
is it OK if | ...ได้ไหม | Is it OK if I leave early? | ขอกลับก่อนได้ไหม
could I have | ขอ...หน่อย | Could I have some water? | ขอน้ำหน่อย
I'd like | ฉันต้องการ | I'd like a coffee. | ขอกาแฟหนึ่งแก้ว
please wait | กรุณารอ | Please wait here. | กรุณารอที่นี่
---
of course you can | ได้อยู่แล้ว | Of course you can. | ได้อยู่แล้ว
sorry, you can't | ขอโทษ ไม่ได้ | Sorry, you can't park here. | ขอโทษ จอดที่นี่ไม่ได้
not allowed | ไม่อนุญาต | Pets are not allowed. | ไม่อนุญาตสัตว์เลี้ยง
go right ahead | เชิญเลย | Go right ahead. | เชิญเลย
just a second | แป๊บนึง | Just a second, please. | แป๊บนึงนะ
after you | เชิญก่อน | After you. | เชิญคุณก่อน
`);
U('police', 2, 'การค้นและยึดของ', `
pat down | ตรวจค้นตัว | I need to pat you down. | ขอตรวจค้นตัว
empty your pockets | เอาของออกจากกระเป๋า | Empty your pockets. | เอาของในกระเป๋าออกมา
search warrant | หมายค้น | We have a search warrant. | เรามีหมายค้น
confiscate | ยึด | Police confiscated the drugs. | ตำรวจยึดยาเสพติด
illegal item | ของผิดกฎหมาย | Any illegal items? | มีของผิดกฎหมายไหม
inventory | รายการของกลาง | Make an inventory. | ทำรายการของกลาง
---
seal | ผนึก | Seal the evidence. | ผนึกของกลาง
receipt of seizure | ใบรับของกลาง | Here is a receipt of seizure. | นี่ใบรับของกลาง
owner | เจ้าของ | Who is the owner? | ใครเป็นเจ้าของ
belongings | ข้าวของ | Take your belongings. | เอาข้าวของไปด้วย
consent to search | ยินยอมให้ค้น | Do you consent to a search? | ยินยอมให้ค้นไหม
cash found | เงินสดที่พบ | Count the cash found. | นับเงินสดที่พบ
`);
U('daily', 3, 'การเรียนภาษา', `
vocabulary | คำศัพท์ | Learn new vocabulary. | เรียนคำศัพท์ใหม่
grammar | ไวยากรณ์ | Grammar is important. | ไวยากรณ์สำคัญ
pronunciation | การออกเสียง | Practice your pronunciation. | ฝึกการออกเสียง
fluent | คล่อง | She is fluent in English. | เธอพูดอังกฤษคล่อง
native speaker | เจ้าของภาษา | Talk to native speakers. | คุยกับเจ้าของภาษา
dictionary | พจนานุกรม | Use a dictionary. | ใช้พจนานุกรม
---
sentence | ประโยค | Write a sentence. | เขียนประโยค
meaning | ความหมาย | What's the meaning? | ความหมายคืออะไร
translate into | แปลเป็น | Translate it into Thai. | แปลเป็นภาษาไทย
listening | การฟัง | Listening is hard. | การฟังยาก
speaking | การพูด | Speaking takes practice. | การพูดต้องฝึก
`);
U('talk', 3, 'การแสดงความประหลาดใจและปฏิกิริยา', `
wow | ว้าว | Wow, that's amazing! | ว้าว สุดยอด!
you're kidding | ล้อเล่นน่า | You're kidding! | ล้อเล่นน่า!
what a surprise | น่าแปลกใจจัง | What a surprise! | น่าแปลกใจจัง!
oh no | โอ้ไม่นะ | Oh no! I forgot. | โอ้ไม่นะ ลืม!
that's great | ดีมาก | That's great news! | ข่าวดีมาก!
I can't believe it | ไม่อยากเชื่อ | I can't believe it! | ไม่อยากเชื่อเลย!
---
seriously | จริงจังเหรอ | Seriously? | จริงจังเหรอ
how come | ทำไมล่ะ | How come you're late? | ทำไมมาสายล่ะ
lucky you | โชคดีจัง | Lucky you! | โชคดีจัง!
too bad | แย่จัง | Too bad. | แย่จัง
fantastic | ยอดเยี่ยม | That's fantastic! | ยอดเยี่ยม!
no kidding | ไม่ได้ล้อเล่น/จริงเลย | No kidding! | จริงเลย!
`);
U('daily', 4, 'การเมืองพื้นฐาน', `
voter | ผู้มีสิทธิเลือกตั้ง | Every voter must show ID. | ผู้มีสิทธิต้องแสดงบัตร
candidate | ผู้สมัคร | Who is your candidate? | ผู้สมัครของคุณคือใคร
party | พรรคการเมือง | Which party won? | พรรคไหนชนะ
minister | รัฐมนตรี | The minister spoke today. | รัฐมนตรีพูดวันนี้
prime minister | นายกรัฐมนตรี | The prime minister visited. | นายกฯ มาเยือน
law maker | ผู้ออกกฎหมาย | Law makers passed the bill. | ผู้ออกกฎหมายผ่านร่างกฎหมาย
---
democracy | ประชาธิปไตย | Thailand is a democracy. | ไทยเป็นประชาธิปไตย
opposition | ฝ่ายค้าน | The opposition disagreed. | ฝ่ายค้านไม่เห็นด้วย
public service | บริการสาธารณะ | Police provide a public service. | ตำรวจให้บริการสาธารณะ
local government | ส่วนท้องถิ่น | Contact the local government. | ติดต่อส่วนท้องถิ่น
civil servant | ข้าราชการ | He is a civil servant. | เขาเป็นข้าราชการ
`);
U('police', 4, 'การปฏิบัติงานกลางคืน', `
nightlife area | ย่านสถานบันเทิง | We patrol the nightlife area. | เราตรวจย่านสถานบันเทิง
bar | บาร์ | The bar closes at 2 a.m. | บาร์ปิดตีสอง
closing time | เวลาปิด | It's closing time. | ถึงเวลาปิดแล้ว
underage drinking | ดื่มเหล้าก่อนวัย | Underage drinking is illegal. | ดื่มเหล้าก่อนวัยผิดกฎหมาย
brawl | การตะลุมบอน | A brawl broke out. | เกิดการตะลุมบอน
intoxicated | มึนเมา | He was intoxicated. | เขามึนเมา
---
noise level | ระดับเสียง | Keep the noise level down. | ลดระดับเสียง
license check | ตรวจใบอนุญาต | We'll do a license check. | จะตรวจใบอนุญาต
bouncer | การ์ดหน้าร้าน | The bouncer called us. | การ์ดหน้าร้านโทรหาเรา
spiked drink | เครื่องดื่มผสมยา | Watch for spiked drinks. | ระวังเครื่องดื่มผสมยา
sober up | สร่างเมา | Let him sober up. | ให้เขาสร่างเมาก่อน
get home safely | กลับบ้านปลอดภัย | Get home safely. | กลับบ้านปลอดภัยนะ
`);
U('talk', 5, 'การบริหารทีม', `
team leader | หัวหน้าทีม | She is our team leader. | เธอเป็นหัวหน้าทีม
assign | มอบหมาย | Assign tasks clearly. | มอบหมายงานให้ชัด
set goals | ตั้งเป้า | Set clear goals. | ตั้งเป้าให้ชัด
motivate | จูงใจ | Motivate your team. | จูงใจทีม
conflict | ความขัดแย้ง | Resolve the conflict. | แก้ความขัดแย้ง
morale | ขวัญกำลังใจ | Team morale is high. | ขวัญกำลังใจทีมดี
---
recognize | ยกย่อง | Recognize good work. | ยกย่องผลงานดี
mentor | พี่เลี้ยง | He is my mentor. | เขาเป็นพี่เลี้ยงฉัน
coach | ฝึกสอน | Coach new officers. | ฝึกสอนเจ้าหน้าที่ใหม่
evaluate performance | ประเมินผลงาน | We evaluate performance yearly. | ประเมินผลงานทุกปี
chain of command | สายการบังคับบัญชา | Follow the chain of command. | ทำตามสายการบังคับบัญชา
`);
U('daily', 6, 'ศัพท์ทางวัฒนธรรมและสังคมขั้นสูง', `
diversity | ความหลากหลาย | Diversity makes us stronger. | ความหลากหลายทำให้เราแข็งแกร่ง
inclusion | การมีส่วนร่วมอย่างทั่วถึง | Promote inclusion. | ส่งเสริมการมีส่วนร่วม
stereotype | ภาพเหมารวม | Avoid stereotypes. | หลีกเลี่ยงการเหมารวม
discrimination | การเลือกปฏิบัติ | Discrimination is illegal. | การเลือกปฏิบัติผิดกฎหมาย
heritage | มรดก | Protect our cultural heritage. | ปกป้องมรดกวัฒนธรรม
assimilation | การกลมกลืน | Assimilation takes time. | การกลมกลืนต้องใช้เวลา
---
marginalized | ถูกทำให้เป็นชายขอบ | Help marginalized groups. | ช่วยกลุ่มชายขอบ
cohesion | ความเป็นปึกแผ่น | Social cohesion matters. | ความเป็นปึกแผ่นทางสังคมสำคัญ
tolerance | ความอดกลั้น/ยอมรับความต่าง | Tolerance builds peace. | ความอดกลั้นสร้างสันติ
equity | ความเสมอภาค (ตามความต้องการ) | Equity is not equality. | ความเสมอภาคไม่ใช่ความเท่ากัน
civic duty | หน้าที่พลเมือง | Voting is a civic duty. | การเลือกตั้งเป็นหน้าที่พลเมือง
grassroots | รากหญ้า | It's a grassroots movement. | เป็นขบวนการระดับรากหญ้า
`);

U('daily', 1, 'เครื่องดื่มและขนม', `
soda | น้ำอัดลม | A can of soda, please. | ขอน้ำอัดลมหนึ่งกระป๋อง
iced tea | ชาเย็น | Thai iced tea is sweet. | ชาเย็นหวาน
smoothie | น้ำปั่น | A mango smoothie, please. | ขอน้ำมะม่วงปั่น
beer | เบียร์ | He doesn't drink beer. | เขาไม่ดื่มเบียร์
candy | ลูกอม | Kids love candy. | เด็กชอบลูกอม
chocolate | ช็อกโกแลต | I like dark chocolate. | ฉันชอบดาร์กช็อกโกแลต
---
cookie | คุกกี้ | Have a cookie. | กินคุกกี้สิ
ice cream | ไอศกรีม | Let's get ice cream. | ไปกินไอศกรีมกัน
cake | เค้ก | Happy birthday cake! | เค้กวันเกิด!
chips | มันฝรั่งทอดกรอบ | A bag of chips. | มันฝรั่งทอดหนึ่งถุง
sticky rice | ข้าวเหนียว | I eat sticky rice. | ฉันกินข้าวเหนียว
straw | หลอด | No straw, please. | ไม่เอาหลอด
`);
U('police', 1, 'ตัวเลขและเวลาในงานตำรวจ', `
o'clock | นาฬิกา (บอกเวลา) | It happened at ten o'clock. | เกิดเหตุตอนสิบนาฬิกา
half past | ครึ่ง (เวลา) | Half past nine. | เก้าโมงครึ่ง
quarter past | สิบห้านาที (หลังชั่วโมง) | Quarter past eight. | แปดโมงสิบห้า
a.m. | ก่อนเที่ยง | 2 a.m. | ตีสอง
p.m. | หลังเที่ยง | 3 p.m. | บ่ายสามโมง
midnight | เที่ยงคืน | At midnight. | ตอนเที่ยงคืน
---
noon | เที่ยงวัน | At noon. | ตอนเที่ยง
about | ประมาณ | About five people. | ประมาณห้าคน
first time | ครั้งแรก | Is this the first time? | นี่ครั้งแรกหรือเปล่า
twice | สองครั้ง | He called twice. | เขาโทรสองครั้ง
dozen | โหล | A dozen eggs. | ไข่หนึ่งโหล
`);
U('daily', 2, 'ร้านเสริมสวยและบริการ', `
haircut | การตัดผม | I need a haircut. | ฉันต้องตัดผม
barber | ช่างตัดผมชาย | The barber is busy. | ช่างตัดผมยุ่ง
salon | ร้านทำผม | She went to the salon. | เธอไปร้านทำผม
massage | นวด | Let's get a Thai massage. | ไปนวดไทยกัน
laundry service | บริการซักรีด | Use the laundry service. | ใช้บริการซักรีด
tailor | ช่างตัดเสื้อ | The tailor made my suit. | ช่างตัดสูทให้ฉัน
---
appointment time | เวลานัด | What's my appointment time? | นัดกี่โมง
walk-in | ไม่ต้องนัด | Walk-ins are welcome. | ไม่ต้องนัดก็ได้
trim | เล็มผม | Just a trim, please. | แค่เล็มนิดหน่อย
dye | ย้อมสี | I want to dye my hair. | ฉันอยากย้อมผม
nails | เล็บ | She got her nails done. | เธอไปทำเล็บ
price list | รายการราคา | Can I see the price list? | ขอดูรายการราคา
`);
U('talk', 2, 'บอกความชอบและความต้องการ', `
I prefer | ฉันชอบ...มากกว่า | I prefer tea. | ฉันชอบชามากกว่า
I can't stand | ทนไม่ได้ | I can't stand the heat. | ทนร้อนไม่ไหว
I'm fond of | ชื่นชอบ | I'm fond of cats. | ฉันชอบแมว
I'm not a fan of | ไม่ค่อยชอบ | I'm not a fan of spicy food. | ไม่ค่อยชอบเผ็ด
I'd rather | ฉันอยาก...มากกว่า | I'd rather stay home. | ฉันอยากอยู่บ้านมากกว่า
I feel like | อยาก (ทำ) | I feel like eating noodles. | อยากกินก๋วยเตี๋ยว
---
my favorite | ที่ฉันชอบที่สุด | Blue is my favorite. | สีฟ้าคือสีที่ชอบที่สุด
I'm crazy about | คลั่งไคล้ | I'm crazy about football. | ฉันคลั่งฟุตบอล
it's not my thing | ไม่ใช่แนวฉัน | Dancing is not my thing. | เต้นไม่ใช่แนวฉัน
either is fine | อะไรก็ได้ | Tea or coffee? Either is fine. | ชาหรือกาแฟ อะไรก็ได้
I don't mind | ไม่ว่าอะไร | I don't mind waiting. | ไม่ว่าที่ต้องรอ
whatever you like | ตามใจคุณ | Choose whatever you like. | เลือกตามใจเลย
`);
U('police', 2, 'การดูแลผู้เสียหาย', `
are you safe | ปลอดภัยไหม | Are you safe now? | ตอนนี้ปลอดภัยไหม
you're safe now | ปลอดภัยแล้ว | Don't worry, you're safe now. | ไม่ต้องห่วง ปลอดภัยแล้ว
take a deep breath | หายใจลึกๆ | Take a deep breath. | หายใจลึกๆ
tell me what happened | เล่าให้ฟัง | Tell me what happened. | เล่าให้ฟังว่าเกิดอะไรขึ้น
in your own words | ในแบบของคุณเอง | Tell me in your own words. | เล่าตามแบบของคุณ
we will help | เราจะช่วย | We will help you. | เราจะช่วยคุณ
---
family contact | ติดต่อครอบครัว | Can we call your family? | ให้เราโทรหาครอบครัวไหม
medical help | ความช่วยเหลือทางการแพทย์ | Do you need medical help? | ต้องการแพทย์ไหม
follow-up | ติดตามผล | We'll do a follow-up call. | เราจะโทรติดตาม
you did the right thing | คุณทำถูกแล้ว | You did the right thing. | คุณทำถูกแล้ว
`);
U('daily', 3, 'สภาพอากาศและภัยธรรมชาติ', `
heatwave | คลื่นความร้อน | There is a heatwave this week. | สัปดาห์นี้มีคลื่นความร้อน
typhoon | ไต้ฝุ่น | A typhoon is coming. | ไต้ฝุ่นกำลังมา
tsunami | สึนามิ | A tsunami warning was issued. | ออกคำเตือนสึนามิ
monsoon | มรสุม | The monsoon brings rain. | มรสุมนำฝนมา
flash flood | น้ำป่าไหลหลาก | Beware of flash floods. | ระวังน้ำป่าไหลหลาก
---
heavy rain | ฝนตกหนัก | Heavy rain is expected. | คาดว่าฝนตกหนัก
hail | ลูกเห็บ | It hailed yesterday. | เมื่อวานลูกเห็บตก
storm warning | ประกาศเตือนพายุ | There is a storm warning. | มีประกาศเตือนพายุ
power outage | ไฟดับ | The storm caused a power outage. | พายุทำให้ไฟดับ
emergency kit | ชุดอุปกรณ์ฉุกเฉิน | Prepare an emergency kit. | เตรียมชุดฉุกเฉิน
high tide | น้ำขึ้น | Don't swim at high tide. | อย่าว่ายน้ำตอนน้ำขึ้น
`);
U('talk', 3, 'การพูดเรื่องอดีตและประสบการณ์', `
I used to | ฉันเคย... | I used to live in Korat. | ฉันเคยอยู่โคราช
have you ever | เคย...ไหม | Have you ever been to Japan? | เคยไปญี่ปุ่นไหม
I've never | ฉันไม่เคย | I've never seen snow. | ฉันไม่เคยเห็นหิมะ
back then | ตอนนั้น | Back then, I was poor. | ตอนนั้นฉันจน
when I was young | ตอนเด็ก | When I was young, I lived here. | ตอนเด็กฉันอยู่ที่นี่
a long time ago | นานมาแล้ว | It was a long time ago. | นานมาแล้ว
---
these days | ทุกวันนี้ | These days, I work a lot. | ทุกวันนี้ฉันทำงานหนัก
recently | เมื่อเร็วๆ นี้ | I recently moved. | ฉันเพิ่งย้ายบ้าน
so far | จนถึงตอนนี้ | So far, so good. | จนถึงตอนนี้ก็ดี
since then | ตั้งแต่นั้น | Since then, I've changed. | ตั้งแต่นั้นฉันก็เปลี่ยน
experience of | ประสบการณ์เรื่อง | I have experience of teaching. | ฉันมีประสบการณ์สอน
memorable | น่าจดจำ | It was a memorable trip. | เป็นทริปที่น่าจดจำ
`);
U('daily', 4, 'สุขภาพระบบต่างๆ', `
diabetes | เบาหวาน | He has diabetes. | เขาเป็นเบาหวาน
blood test | ตรวจเลือด | You need a blood test. | คุณต้องตรวจเลือด
X-ray | เอกซเรย์ | Take an X-ray. | ถ่ายเอกซเรย์
vaccine | วัคซีน | Get the flu vaccine. | ฉีดวัคซีนไข้หวัดใหญ่
check-up | ตรวจสุขภาพ | I have a yearly check-up. | ฉันตรวจสุขภาพทุกปี
cholesterol | คอเลสเตอรอล | His cholesterol is high. | คอเลสเตอรอลเขาสูง
---
side effect | ผลข้างเคียง | Are there side effects? | มีผลข้างเคียงไหม
dose | ขนาดยา | Take one dose daily. | กินวันละหนึ่งครั้ง
painkiller | ยาแก้ปวด | Take a painkiller. | กินยาแก้ปวด
antibiotic | ยาปฏิชีวนะ | Finish the antibiotics. | กินยาปฏิชีวนะให้หมด
admitted | ได้รับเข้าโรงพยาบาล | He was admitted to hospital. | เขาต้องนอนโรงพยาบาล
discharged | ออกจากโรงพยาบาล | She was discharged today. | วันนี้เธอออกจากโรงพยาบาล
`);
U('police', 4, 'งานธุรการตำรวจ', `
paperwork | งานเอกสาร | I have a lot of paperwork. | ฉันมีงานเอกสารเยอะ
file a report | ทำรายงาน | File a report today. | ทำรายงานวันนี้
deadline for filing | กำหนดส่งเอกสาร | The filing deadline is Friday. | กำหนดส่งคือวันศุกร์
approval | การอนุมัติ | We need approval first. | ต้องได้รับอนุมัติก่อน
official letter | หนังสือราชการ | Send an official letter. | ส่งหนังสือราชการ
stamp | ตราประทับ | It needs an official stamp. | ต้องประทับตรา
---
copy of ID | สำเนาบัตรประชาชน | Bring a copy of your ID. | นำสำเนาบัตรมา
certified copy | สำเนารับรอง | A certified copy, please. | ขอสำเนารับรอง
database | ฐานข้อมูล | Check the database. | ตรวจฐานข้อมูล
record | บันทึก/ประวัติ | He has a criminal record. | เขามีประวัติอาชญากรรม
background check | ตรวจประวัติ | Do a background check. | ตรวจสอบประวัติ
archive | เอกสารเก่า/คลัง | It's in the archive. | อยู่ในคลังเอกสาร
`);
U('talk', 4, 'การสนทนาในที่ทำงาน', `
how's work | งานเป็นไง | How's work going? | งานเป็นยังไงบ้าง
swamped | ยุ่งมาก | I'm swamped today. | วันนี้งานล้นมือ
on track | เป็นไปตามแผน | We're on track. | ทุกอย่างเป็นไปตามแผน
behind schedule | ล่าช้ากว่ากำหนด | The project is behind schedule. | โครงการล่าช้า
heads-up | แจ้งเตือนล่วงหน้า | Thanks for the heads-up. | ขอบคุณที่บอกล่วงหน้า
brainstorm | ระดมความคิด | Let's brainstorm. | มาระดมความคิดกัน
---
wrap up | สรุปปิด | Let's wrap up the meeting. | สรุปปิดการประชุม
action items | สิ่งที่ต้องทำต่อ | Here are the action items. | นี่คือสิ่งที่ต้องทำต่อ
sign off | อนุมัติ/ลงนาม | The boss signed off on it. | หัวหน้าอนุมัติแล้ว
bring up to speed | อัปเดตให้ทัน | Let me bring you up to speed. | ขออัปเดตให้คุณทราบ
work from home | ทำงานที่บ้าน | I work from home on Friday. | ศุกร์ฉันทำงานที่บ้าน
team building | กิจกรรมสร้างทีม | We had team building. | เรามีกิจกรรมสร้างทีม
`);
U('daily', 5, 'เศรษฐกิจและการค้า', `
export | ส่งออก | Thailand exports rice. | ไทยส่งออกข้าว
import | นำเข้า | We import oil. | เรานำเข้าน้ำมัน
trade | การค้า | Trade is growing. | การค้ากำลังเติบโต
tariff | ภาษีศุลกากร | New tariffs were added. | มีภาษีนำเข้าใหม่
GDP | ผลิตภัณฑ์มวลรวม | GDP grew by 3 percent. | GDP โต 3 เปอร์เซ็นต์
tourism industry | อุตสาหกรรมท่องเที่ยว | The tourism industry recovered. | อุตสาหกรรมท่องเที่ยวฟื้นตัว
---
consumer | ผู้บริโภค | Protect consumers. | ปกป้องผู้บริโภค
demand | อุปสงค์/ความต้องการ | Demand is high. | ความต้องการสูง
minimum wage | ค่าแรงขั้นต่ำ | The minimum wage rose. | ค่าแรงขั้นต่ำขึ้น
labor | แรงงาน | Labor costs are rising. | ค่าแรงสูงขึ้น
recovery | การฟื้นตัว | The economy is in recovery. | เศรษฐกิจกำลังฟื้นตัว
`);
U('police', 5, 'การฝึกและสมรรถภาพตำรวจ', `
recruit | ผู้สมัคร/พลทหารใหม่ | New recruits start Monday. | ผู้เข้ารับการฝึกเริ่มวันจันทร์
drill | การฝึกซ้อม | We have a fire drill. | เรามีการซ้อมหนีไฟ
firearms training | การฝึกยิงปืน | Firearms training is weekly. | ฝึกยิงปืนทุกสัปดาห์
self-defense | การป้องกันตัว | Learn self-defense. | เรียนการป้องกันตัว
endurance | ความอดทน | Running builds endurance. | การวิ่งสร้างความอดทน
obstacle course | สนามเครื่องกีดขวาง | Finish the obstacle course. | ผ่านสนามเครื่องกีดขวาง
---
physical test | ทดสอบร่างกาย | I passed the physical test. | ผ่านการทดสอบร่างกาย
written exam | ข้อสอบข้อเขียน | The written exam is hard. | ข้อสอบข้อเขียนยาก
graduation ceremony | พิธีจบการศึกษา | My graduation ceremony is soon. | พิธีจบใกล้แล้ว
marksmanship | ความแม่นยำในการยิง | His marksmanship is excellent. | เขายิงแม่นมาก
fitness standard | เกณฑ์สมรรถภาพ | Meet the fitness standard. | ผ่านเกณฑ์สมรรถภาพ
cadet | นักเรียนนายร้อย | He is a police cadet. | เขาเป็นนักเรียนนายร้อยตำรวจ
`);
U('talk', 6, 'สำนวนขั้นสูง 3', `
the ball is in your court | ถึงตาคุณตัดสินใจ | The ball is in your court now. | ตอนนี้ถึงตาคุณแล้ว
a double-edged sword | ดาบสองคม | Social media is a double-edged sword. | โซเชียลเป็นดาบสองคม
add insult to injury | ซ้ำเติม | To add insult to injury, it rained. | ซ้ำเติมด้วยฝนตก
by the book | ตามระเบียบเป๊ะ | He does everything by the book. | เขาทำทุกอย่างตามระเบียบ
caught red-handed | จับได้คาหนังคาเขา | The thief was caught red-handed. | ขโมยถูกจับคาหนังคาเขา
turn a blind eye | ทำเป็นมองไม่เห็น | Don't turn a blind eye to crime. | อย่าเมินเฉยต่ออาชญากรรม
---
a long shot | โอกาสน้อย | It's a long shot, but try. | โอกาสน้อยแต่ลองดู
the bottom line | ประเด็นสำคัญที่สุด | The bottom line is safety. | สิ่งสำคัญที่สุดคือความปลอดภัย
in a nutshell | โดยสรุปสั้นๆ | In a nutshell, we won. | สรุปสั้นๆ เราชนะ
play it by ear | ดูสถานการณ์ไป | Let's play it by ear. | ดูสถานการณ์ไปก่อน
under the table | ใต้โต๊ะ (ไม่ถูกกฎหมาย) | He was paid under the table. | เขาได้เงินใต้โต๊ะ
go down the drain | สูญเปล่า | All our work went down the drain. | งานทั้งหมดสูญเปล่า
`);
U('daily', 6, 'ภาษาวิชาการ (คำเชื่อมขั้นสูง)', `
notwithstanding | แม้ว่า/อย่างไรก็ตาม | Notwithstanding the risks, we proceeded. | แม้มีความเสี่ยง เราก็ดำเนินการ
in accordance with | ตามที่สอดคล้องกับ | Act in accordance with the law. | ปฏิบัติตามกฎหมาย
with respect to | ในส่วนที่เกี่ยวกับ | With respect to cost, it's fine. | ในเรื่องค่าใช้จ่ายโอเค
insofar as | ในขอบเขตที่ | Insofar as I know, he's innocent. | เท่าที่ฉันรู้ เขาบริสุทธิ์
thus | ดังนั้น | Thus, the case was closed. | ดังนั้นคดีจึงปิด
whereby | ซึ่งโดยการนั้น | A system whereby crimes are reported online. | ระบบที่ให้แจ้งความออนไลน์ได้
---
hitherto | จนถึงบัดนี้ | A hitherto unknown suspect. | ผู้ต้องสงสัยที่ไม่เคยรู้จักมาก่อน
henceforth | นับจากนี้ไป | Henceforth, rules will change. | นับจากนี้กฎจะเปลี่ยน
provided that | โดยมีเงื่อนไขว่า | You can go, provided that you return. | ไปได้ ถ้ากลับมา
inasmuch as | เนื่องจาก | Inasmuch as he confessed, he got less time. | เนื่องจากสารภาพจึงได้ลดโทษ
vis-à-vis | เมื่อเทียบกับ | Our position vis-à-vis the others. | จุดยืนของเราเทียบกับคนอื่น
de facto | โดยพฤตินัย | He is the de facto leader. | เขาเป็นผู้นำโดยพฤตินัย
`);

U('daily', 1, 'สถานที่ท่องเที่ยวไทย', `
temple fair | งานวัด | Let's go to the temple fair. | ไปงานวัดกัน
night market | ตลาดกลางคืน | The night market is fun. | ตลาดกลางคืนสนุก
floating market | ตลาดน้ำ | We visited a floating market. | เราไปตลาดน้ำ
waterfall | น้ำตก | The waterfall is beautiful. | น้ำตกสวย
national park | อุทยานแห่งชาติ | Khao Yai is a national park. | เขาใหญ่เป็นอุทยานแห่งชาติ
---
cave | ถ้ำ | Don't go into the cave alone. | อย่าเข้าถ้ำคนเดียว
palace | พระราชวัง | The palace is closed today. | วันนี้วังปิด
museum | พิพิธภัณฑ์ | The museum is free. | พิพิธภัณฑ์เข้าฟรี
zoo | สวนสัตว์ | Kids love the zoo. | เด็กชอบสวนสัตว์
old town | เมืองเก่า | Walk around the old town. | เดินเล่นเมืองเก่า
hot spring | น้ำพุร้อน | We relaxed at the hot spring. | เราผ่อนคลายที่น้ำพุร้อน
`);
U('police', 1, 'อุปกรณ์สื่อสารและสำนักงาน', `
walkie-talkie | วิทยุมือถือ | Use the walkie-talkie. | ใช้วิทยุมือถือ
notebook | สมุดจด | Write it in your notebook. | จดลงสมุด
clipboard | คลิปบอร์ด | He held a clipboard. | เขาถือคลิปบอร์ด
stapler | ที่เย็บกระดาษ | Pass me the stapler. | ส่งที่เย็บกระดาษมา
envelope | ซองจดหมาย | Put it in an envelope. | ใส่ซอง
calendar | ปฏิทิน | Check the calendar. | ดูปฏิทิน
---
scanner | เครื่องสแกน | Use the scanner. | ใช้เครื่องสแกน
ink | หมึก | The printer needs ink. | เครื่องพิมพ์หมึกหมด
marker | ปากกาเมจิก | Write with a marker. | เขียนด้วยปากกาเมจิก
tape | เทป | Use some tape. | ใช้เทปติด
battery pack | แบตสำรอง | Bring a battery pack. | เอาแบตสำรองมา
flash drive | แฟลชไดรฟ์ | Save it on a flash drive. | บันทึกลงแฟลชไดรฟ์
`);
U('daily', 2, 'การเดินทางระยะไกล', `
bus terminal | สถานีขนส่ง | Go to the bus terminal. | ไปสถานีขนส่ง
sleeper train | รถไฟตู้นอน | We took the sleeper train. | เรานั่งรถไฟตู้นอน
round trip | ไป-กลับ | A round trip ticket, please. | ขอตั๋วไปกลับ
one-way | เที่ยวเดียว | A one-way ticket. | ตั๋วเที่ยวเดียว
platform | ชานชาลา | The train is on platform 3. | รถไฟอยู่ชานชาลา 3
delay notice | ประกาศล่าช้า | There is a delay notice. | มีประกาศล่าช้า
---
rest stop | จุดพักรถ | Let's stop at the rest stop. | แวะจุดพักรถ
road trip | ทริปขับรถเที่ยว | We went on a road trip. | เราขับรถเที่ยว
car rental | เช่ารถ | Is there a car rental? | มีที่เช่ารถไหม
GPS | จีพีเอส | Follow the GPS. | ตามจีพีเอส
fill up | เติม (น้ำมัน) | Fill up the tank. | เติมน้ำมันให้เต็ม
journey | การเดินทาง | It was a long journey. | เป็นการเดินทางที่ยาวนาน
`);
U('talk', 2, 'การโทรติดต่อหน่วยงาน', `
customer service | ฝ่ายบริการลูกค้า | Call customer service. | โทรหาฝ่ายบริการลูกค้า
press one | กดหนึ่ง | For English, press one. | ภาษาอังกฤษกดหนึ่ง
hold the line | ถือสายรอ | Please hold the line. | กรุณาถือสายรอ
transfer the call | โอนสาย | I'll transfer your call. | จะโอนสายให้
reference number | หมายเลขอ้างอิง | Your reference number is 4521. | หมายเลขอ้างอิงคือ 4521
operator | พนักงานรับสาย | Talk to an operator. | คุยกับพนักงาน
---
leave your number | ฝากเบอร์ไว้ | Leave your number, please. | ฝากเบอร์ไว้
business hours | เวลาทำการ | Call during business hours. | โทรในเวลาทำการ
I'll get back to you | จะติดต่อกลับ | I'll get back to you soon. | จะติดต่อกลับเร็วๆ นี้
the line dropped | สายหลุด | Sorry, the line dropped. | ขอโทษ สายหลุด
speak up | พูดดังขึ้น | Could you speak up? | พูดดังขึ้นหน่อยได้ไหม
spell it out | สะกดให้ฟัง | Please spell it out. | สะกดให้ฟังหน่อย
`);
U('police', 2, 'สิ่งที่ตำรวจพูดกับประชาชน', `
thank you for your cooperation | ขอบคุณที่ให้ความร่วมมือ | Thank you for your cooperation. | ขอบคุณที่ให้ความร่วมมือ
please stay calm | กรุณาสงบสติ | Please stay calm. | กรุณาใจเย็นๆ
for your safety | เพื่อความปลอดภัยของคุณ | For your safety, stay inside. | เพื่อความปลอดภัย อยู่ข้างใน
move along | เดินต่อไป | Please move along. | กรุณาเดินต่อไป
the road is closed | ถนนปิด | Sorry, the road is closed. | ขอโทษ ถนนปิด
use the other side | ใช้อีกฝั่ง | Use the other side, please. | ใช้อีกฝั่งครับ
---
you're free to go | ไปได้แล้ว | You're free to go. | คุณไปได้แล้ว
have a safe trip | เดินทางปลอดภัย | Have a safe trip. | เดินทางปลอดภัย
we'll be in touch | เราจะติดต่อไป | We'll be in touch. | เราจะติดต่อไป
sign here please | ลงชื่อตรงนี้ | Sign here, please. | ลงชื่อตรงนี้ครับ
keep this copy | เก็บสำเนานี้ไว้ | Keep this copy. | เก็บสำเนานี้ไว้
call us anytime | โทรหาได้ตลอด | Call us anytime. | โทรหาเราได้ตลอด
`);
U('daily', 3, 'อุปกรณ์ไอทีและการใช้งาน', `
password reset | รีเซ็ตรหัสผ่าน | Click password reset. | กดรีเซ็ตรหัสผ่าน
log in | เข้าสู่ระบบ | Log in with your email. | เข้าสู่ระบบด้วยอีเมล
log out | ออกจากระบบ | Always log out. | ออกจากระบบทุกครั้ง
username | ชื่อผู้ใช้ | Enter your username. | ใส่ชื่อผู้ใช้
upload | อัปโหลด | Upload the photo. | อัปโหลดรูป
screenshot | ภาพหน้าจอ | Take a screenshot. | แคปหน้าจอ
---
storage | พื้นที่เก็บข้อมูล | My phone storage is full. | พื้นที่โทรศัพท์เต็ม
restart | รีสตาร์ท | Restart your phone. | รีสตาร์ทโทรศัพท์
settings | การตั้งค่า | Go to settings. | ไปที่การตั้งค่า
notification | การแจ้งเตือน | Turn off notifications. | ปิดการแจ้งเตือน
Bluetooth | บลูทูธ | Turn on Bluetooth. | เปิดบลูทูธ
offline | ออฟไลน์ | The app works offline. | แอปใช้ออฟไลน์ได้
`);
U('talk', 3, 'การให้และรับคำชม', `
you look great | คุณดูดีมาก | You look great today! | วันนี้คุณดูดีมาก!
nice job | ทำได้ดี | Nice job on the report. | รายงานทำได้ดี
I'm impressed | ประทับใจ | I'm impressed. | ประทับใจมาก
you're so talented | เก่งมาก | You're so talented! | คุณเก่งมาก!
thanks, that means a lot | ขอบคุณ มีความหมายมาก | Thanks, that means a lot. | ขอบคุณ มีความหมายกับฉันมาก
I appreciate it | ซาบซึ้งใจ | I really appreciate it. | ซาบซึ้งใจจริงๆ
---
you made my day | ทำให้วันนี้ดีขึ้น | You made my day! | คุณทำให้วันนี้ฉันดีขึ้น!
it was nothing | ไม่เท่าไหร่หรอก | Oh, it was nothing. | โอ้ ไม่เท่าไหร่หรอก
you're too kind | ใจดีเกินไปแล้ว | You're too kind. | คุณใจดีเกินไปแล้ว
proud of you | ภูมิใจในตัวคุณ | I'm proud of you. | ภูมิใจในตัวคุณ
keep up the good work | ทำดีต่อไปนะ | Keep up the good work! | ทำดีแบบนี้ต่อไปนะ!
well deserved | สมควรได้รับ | Your promotion is well deserved. | การเลื่อนตำแหน่งสมควรแล้ว
`);
U('daily', 4, 'ชีวิตครอบครัวขั้นกลาง', `
raise children | เลี้ยงลูก | Raising children is hard. | การเลี้ยงลูกยาก
household | ครัวเรือน | The household has five people. | ครัวเรือนมีห้าคน
parenting | การเลี้ยงดูลูก | Good parenting matters. | การเลี้ยงดูที่ดีสำคัญ
elderly | ผู้สูงอายุ | Help the elderly. | ช่วยเหลือผู้สูงอายุ
take care of | ดูแล | I take care of my grandmother. | ฉันดูแลยาย
inherit | ได้รับมรดก | He inherited the land. | เขาได้รับที่ดินเป็นมรดก
---
in-laws | ครอบครัวฝั่งคู่สมรส | I visit my in-laws. | ฉันไปเยี่ยมบ้านแฟน
single parent | พ่อแม่เลี้ยงเดี่ยว | She is a single parent. | เธอเป็นแม่เลี้ยงเดี่ยว
sibling | พี่น้อง | I have two siblings. | ฉันมีพี่น้องสองคน
twins | ฝาแฝด | They are twins. | พวกเขาเป็นฝาแฝด
newborn | ทารกแรกเกิด | The newborn is healthy. | ทารกแรกเกิดแข็งแรง
family reunion | งานรวมญาติ | We have a family reunion. | เรามีงานรวมญาติ
`);
U('police', 4, 'การสื่อสารกับสื่อ', `
press release | ข่าวประชาสัมพันธ์ | Police issued a press release. | ตำรวจออกข่าวประชาสัมพันธ์
spokesperson | โฆษก | The police spokesperson spoke. | โฆษกตำรวจแถลง
no comment | ไม่แสดงความคิดเห็น | No comment at this time. | ขณะนี้ไม่แสดงความคิดเห็น
ongoing investigation | การสอบสวนที่ยังดำเนินอยู่ | It's an ongoing investigation. | การสอบสวนยังดำเนินอยู่
confirm reports | ยืนยันรายงาน | We can confirm reports of a fire. | ยืนยันว่ามีไฟไหม้จริง
appeal for information | ขอเบาะแสจากประชาชน | Police appeal for information. | ตำรวจขอเบาะแสจากประชาชน
---
media briefing | แถลงข่าวสั้น | There's a media briefing at 3. | มีแถลงข่าวบ่ายสาม
off the record | ไม่เปิดเผยแหล่งข่าว | This is off the record. | อันนี้ไม่ออกสื่อนะ
public safety | ความปลอดภัยสาธารณะ | Public safety comes first. | ความปลอดภัยของประชาชนมาก่อน
update the public | แจ้งความคืบหน้าแก่ประชาชน | We'll update the public. | เราจะแจ้งความคืบหน้า
rumors online | ข่าวลือออนไลน์ | Don't believe rumors online. | อย่าเชื่อข่าวลือออนไลน์
official channel | ช่องทางทางการ | Follow our official channel. | ติดตามช่องทางทางการ
`);
U('talk', 5, 'การนำเสนอข้อมูลตัวเลข', `
increase sharply | เพิ่มขึ้นอย่างรวดเร็ว | Crime increased sharply. | อาชญากรรมเพิ่มขึ้นมาก
decline | ลดลง | Accidents declined. | อุบัติเหตุลดลง
remain stable | คงที่ | The number remained stable. | ตัวเลขคงที่
peak | จุดสูงสุด | Traffic peaks at 6 p.m. | รถติดสูงสุดตอนหกโมงเย็น
percentage | ร้อยละ | What percentage passed? | ผ่านกี่เปอร์เซ็นต์
average | ค่าเฉลี่ย | The average age is 25. | อายุเฉลี่ย 25 ปี
---
compared to | เมื่อเทียบกับ | Compared to last year, it's lower. | เทียบกับปีก่อนต่ำกว่า
chart | แผนภูมิ | Look at this chart. | ดูแผนภูมินี้
trend | แนวโน้ม | The trend is positive. | แนวโน้มเป็นบวก
figure | ตัวเลข | The figures are clear. | ตัวเลขชัดเจน
double | เพิ่มเป็นสองเท่า | Sales doubled. | ยอดขายเพิ่มเป็นสองเท่า
roughly | คร่าวๆ | Roughly 200 people came. | มาประมาณ 200 คน
`);
U('daily', 5, 'ศิลปะและความบันเทิง', `
artist | ศิลปิน | She is a famous artist. | เธอเป็นศิลปินชื่อดัง
gallery | หอศิลป์ | Visit the art gallery. | ไปหอศิลป์
sculpture | ประติมากรรม | It's a stone sculpture. | เป็นประติมากรรมหิน
performance art | ศิลปะการแสดง | I like performance art. | ฉันชอบศิลปะการแสดง
documentary | สารคดี | We watched a documentary. | เราดูสารคดี
soundtrack | เพลงประกอบ | The soundtrack is great. | เพลงประกอบเพราะมาก
---
plot | โครงเรื่อง | The plot is confusing. | โครงเรื่องงง
character | ตัวละคร | Who is your favorite character? | ชอบตัวละครไหน
director | ผู้กำกับ | The director won an award. | ผู้กำกับได้รางวัล
premiere | รอบปฐมทัศน์ | The premiere is tonight. | รอบปฐมทัศน์คืนนี้
review score | คะแนนรีวิว | The review score is high. | คะแนนรีวิวสูง
masterpiece | ผลงานชิ้นเอก | It's a masterpiece. | เป็นผลงานชิ้นเอก
`);
U('talk', 6, 'ภาษาเชิงวิชาการในการเขียน', `
this essay argues | เรียงความนี้เสนอว่า | This essay argues that… | เรียงความนี้เสนอว่า...
it can be argued | อาจกล่าวได้ว่า | It can be argued that… | อาจกล่าวได้ว่า...
evidence suggests | หลักฐานชี้ว่า | Evidence suggests a link. | หลักฐานชี้ว่ามีความเชื่อมโยง
a growing body of | จำนวนที่เพิ่มขึ้นของ | A growing body of research shows… | งานวิจัยจำนวนมากขึ้นแสดงว่า...
plays a key role | มีบทบาทสำคัญ | Education plays a key role. | การศึกษามีบทบาทสำคัญ
it is widely accepted | เป็นที่ยอมรับกันทั่วไป | It is widely accepted that… | เป็นที่ยอมรับกันว่า...
---
to illustrate | เพื่อแสดงให้เห็น | To illustrate, consider this case. | เพื่อให้เห็นภาพ ลองดูกรณีนี้
in summary | โดยสรุป | In summary, the plan works. | โดยสรุป แผนนี้ใช้ได้
a key factor | ปัจจัยสำคัญ | Poverty is a key factor. | ความยากจนเป็นปัจจัยสำคัญ
further research | การวิจัยเพิ่มเติม | Further research is needed. | ต้องการการวิจัยเพิ่มเติม
limitations | ข้อจำกัด | The study has limitations. | การศึกษามีข้อจำกัด
draw a conclusion | สรุปผล | We can draw a conclusion. | เราสามารถสรุปผลได้
`);

U('daily', 1, 'กริยาที่ใช้บ่อย 3', `
wait for | รอ | Wait for me. | รอฉันด้วย
think about | คิดเกี่ยวกับ | Think about it. | คิดดูก่อน
talk to | คุยกับ | Talk to your boss. | คุยกับหัวหน้า
listen to | ฟัง | Listen to music. | ฟังเพลง
pay for | จ่ายค่า | I'll pay for lunch. | ฉันจ่ายค่าข้าวเที่ยง
---
help out | ช่วยเหลือ | Can you help out? | ช่วยหน่อยได้ไหม
clean up | เก็บกวาด | Clean up your desk. | เก็บโต๊ะให้เรียบร้อย
wake | ปลุก | Wake me at six. | ปลุกฉันตอนหกโมง
hurry up | รีบหน่อย | Hurry up! | รีบหน่อย!
sit down | นั่งลง | Please sit down. | เชิญนั่ง
`);
U('police', 1, 'คำบอกทิศทาง', `
north | ทิศเหนือ | Drive north. | ขับไปทางเหนือ
south | ทิศใต้ | The suspect went south. | ผู้ต้องสงสัยไปทางใต้
east | ทิศตะวันออก | The sun rises in the east. | ดวงอาทิตย์ขึ้นทางตะวันออก
west | ทิศตะวันตก | Head west on this road. | ไปทางตะวันตก
toward | ไปทาง | He ran toward the river. | เขาวิ่งไปทางแม่น้ำ
away from | ออกห่างจาก | Move away from the car. | ออกห่างจากรถ
---
corner of | หัวมุมของ | At the corner of Silom Road. | ที่หัวมุมถนนสีลม
end of the street | สุดถนน | It's at the end of the street. | อยู่สุดถนน
nearby | ใกล้ๆ | Is there a hospital nearby? | ใกล้ๆ มีโรงพยาบาลไหม
far away | ไกลออกไป | It's far away. | ไกลมาก
landmark | จุดสังเกต | Any landmark near you? | ใกล้คุณมีจุดสังเกตอะไรไหม
`);
U('daily', 2, 'ร้านอาหารตามสั่ง', `
fried rice | ข้าวผัด | One fried rice, please. | ขอข้าวผัดหนึ่งจาน
noodle soup | ก๋วยเตี๋ยวน้ำ | I'll have noodle soup. | ขอก๋วยเตี๋ยวน้ำ
papaya salad | ส้มตำ | Papaya salad, not spicy. | ส้มตำไม่เผ็ด
curry | แกง | Green curry is delicious. | แกงเขียวหวานอร่อย
fried egg | ไข่ดาว | Add a fried egg. | เพิ่มไข่ดาว
basil | กะเพรา | Pork with basil, please. | ขอกะเพราหมู
---
pork | หมู | I don't eat pork. | ฉันไม่กินหมู
beef | เนื้อวัว | Beef noodles, please. | ขอก๋วยเตี๋ยวเนื้อ
shrimp | กุ้ง | I'm allergic to shrimp. | ฉันแพ้กุ้ง
seafood | อาหารทะเล | I love seafood. | ฉันชอบอาหารทะเล
extra | พิเศษ | Extra rice, please. | ขอข้าวพิเศษ
less sugar | หวานน้อย | Less sugar, please. | หวานน้อย
`);
U('talk', 2, 'ประโยคแสดงความกังวลและให้กำลังใจ', `
don't worry | ไม่ต้องห่วง | Don't worry about it. | ไม่ต้องห่วง
you can do it | คุณทำได้ | You can do it! | คุณทำได้!
I'm worried about | ฉันกังวลเรื่อง | I'm worried about the test. | ฉันกังวลเรื่องสอบ
it's OK | ไม่เป็นไร | It's OK. | ไม่เป็นไร
try your best | พยายามให้เต็มที่ | Try your best. | ทำให้ดีที่สุด
never give up | อย่ายอมแพ้ | Never give up! | อย่ายอมแพ้!
---
I believe in you | ฉันเชื่อในตัวคุณ | I believe in you. | ฉันเชื่อในตัวคุณ
almost there | ใกล้แล้ว | We're almost there. | ใกล้ถึงแล้ว
one step at a time | ทีละขั้น | Take it one step at a time. | ค่อยๆ ทำทีละขั้น
what if | ถ้าเกิด... | What if I fail? | ถ้าเกิดสอบตกล่ะ
calm your nerves | คลายความตื่นเต้น | Calm your nerves. | คลายความตื่นเต้นหน่อย
you've got this | คุณทำได้แน่ | You've got this! | คุณทำได้แน่!
`);
U('police', 2, 'คดีลักทรัพย์และบุกรุก', `
break in | งัดเข้า | Someone broke in last night. | มีคนงัดบ้านเมื่อคืน
burglar | ขโมยขึ้นบ้าน | The burglar took my TV. | ขโมยเอาทีวีไป
broken lock | กุญแจถูกงัด | The lock is broken. | กุญแจถูกงัด
missing items | ของที่หายไป | List the missing items. | ทำรายการของที่หาย
fingerprints | ลายนิ้วมือ | Don't touch anything. We need fingerprints. | อย่าแตะอะไร เราต้องเก็บลายนิ้วมือ
security camera | กล้องรักษาความปลอดภัย | Check the security camera. | ตรวจกล้องรักษาความปลอดภัย
---
broken window | หน้าต่างแตก | They came in through a broken window. | เข้ามาทางหน้าต่างที่แตก
estimated value | มูลค่าโดยประมาณ | What's the estimated value? | มูลค่าประมาณเท่าไหร่
serial number | หมายเลขเครื่อง | Do you know the serial number? | รู้หมายเลขเครื่องไหม
pawn shop | โรงรับจำนำ | Check the pawn shops. | ตรวจตามโรงรับจำนำ
stolen goods | ของโจร | They sold stolen goods. | พวกเขาขายของโจร
`);
U('daily', 3, 'งานบริการและลูกค้า', `
counter | เคาน์เตอร์ | Pay at the counter. | จ่ายที่เคาน์เตอร์
queue up | เข้าแถว | Please queue up. | กรุณาเข้าแถว
next please | คนต่อไป | Next, please! | คนต่อไป!
service charge | ค่าบริการ | Is there a service charge? | มีค่าบริการไหม
warranty | การรับประกัน | It has a one-year warranty. | รับประกันหนึ่งปี
replacement | ของทดแทน | Can I get a replacement? | ขอเปลี่ยนของใหม่ได้ไหม
---
membership | สมาชิก | Do you have a membership card? | มีบัตรสมาชิกไหม
points | แต้มสะสม | You earned 50 points. | คุณได้ 50 แต้ม
free delivery | ส่งฟรี | Free delivery over 500 baht. | ส่งฟรีเมื่อซื้อเกิน 500 บาท
satisfaction | ความพึงพอใจ | Customer satisfaction is high. | ความพึงพอใจลูกค้าสูง
feedback form | แบบฟอร์มความเห็น | Fill out the feedback form. | กรอกแบบประเมิน
loyal customer | ลูกค้าประจำ | She is a loyal customer. | เธอเป็นลูกค้าประจำ
`);
U('police', 3, 'การปฏิบัติต่อคนเปราะบาง', `
elderly person | ผู้สูงอายุ | Help the elderly person cross. | ช่วยผู้สูงอายุข้ามถนน
disability | ความพิการ | He has a disability. | เขามีความพิการ
wheelchair | รถเข็น | She uses a wheelchair. | เธอใช้รถเข็น
hearing impaired | บกพร่องทางการได้ยิน | He is hearing impaired. | เขาบกพร่องทางการได้ยิน
sign language | ภาษามือ | Do you know sign language? | รู้ภาษามือไหม
mental illness | ป่วยทางจิต | Treat mental illness with care. | ดูแลผู้ป่วยจิตเวชอย่างระมัดระวัง
---
homeless | คนไร้บ้าน | Help homeless people. | ช่วยเหลือคนไร้บ้าน
runaway | เด็กหนีออกจากบ้าน | The runaway was found. | พบเด็กที่หนีออกจากบ้านแล้ว
gentle | อ่อนโยน | Use a gentle voice. | ใช้น้ำเสียงอ่อนโยน
caregiver | ผู้ดูแล | Call the caregiver. | โทรหาผู้ดูแล
special needs | ความต้องการพิเศษ | The child has special needs. | เด็กมีความต้องการพิเศษ
`);
U('talk', 3, 'เล่าความฝันและเป้าหมาย', `
someday | สักวันหนึ่ง | Someday I'll travel the world. | สักวันฉันจะเที่ยวรอบโลก
achieve my dream | ทำความฝันให้สำเร็จ | I will achieve my dream. | ฉันจะทำความฝันให้สำเร็จ
plan to | วางแผนจะ | I plan to study abroad. | ฉันวางแผนไปเรียนต่างประเทศ
hope to | หวังว่าจะ | I hope to pass. | หวังว่าจะสอบผ่าน
work hard | ทำงานหนัก | I work hard every day. | ฉันทำงานหนักทุกวัน
in the future | ในอนาคต | In the future, I'll be a leader. | ในอนาคตฉันจะเป็นผู้นำ
---
my goal is | เป้าหมายของฉันคือ | My goal is to help people. | เป้าหมายของฉันคือช่วยคน
step by step | ทีละขั้น | Step by step, I improve. | ฉันพัฒนาทีละขั้น
make it happen | ทำให้เป็นจริง | I'll make it happen. | ฉันจะทำให้เป็นจริง
dream job | งานในฝัน | Police officer is my dream job. | ตำรวจคืออาชีพในฝัน
inspire | สร้างแรงบันดาลใจ | My father inspires me. | พ่อเป็นแรงบันดาลใจ
determined | มุ่งมั่น | I'm determined to succeed. | ฉันมุ่งมั่นจะสำเร็จ
`);
U('daily', 4, 'ศัพท์กีฬาขั้นกลาง', `
tournament | ทัวร์นาเมนต์ | They won the tournament. | พวกเขาชนะทัวร์นาเมนต์
referee | ผู้ตัดสิน | The referee blew the whistle. | ผู้ตัดสินเป่านกหวีด
score a goal | ยิงประตู | He scored a goal. | เขายิงประตูได้
draw | เสมอ | The match was a draw. | การแข่งขันเสมอ
champion | แชมป์ | She is the champion. | เธอเป็นแชมป์
---
stadium | สนามกีฬา | The stadium was full. | สนามเต็ม
athlete | นักกีฬา | He is a professional athlete. | เขาเป็นนักกีฬาอาชีพ
medal | เหรียญรางวัล | She won a gold medal. | เธอได้เหรียญทอง
injury time | ทดเวลาบาดเจ็บ | They scored in injury time. | ยิงได้ในช่วงทดเวลา
Muay Thai | มวยไทย | He trains Muay Thai. | เขาฝึกมวยไทย
`);
U('police', 4, 'การประสานงานหน่วยงาน', `
fire department | หน่วยดับเพลิง | Call the fire department. | เรียกหน่วยดับเพลิง
rescue team | ทีมกู้ภัย | The rescue team arrived. | ทีมกู้ภัยมาถึง
paramedic | เจ้าหน้าที่กู้ชีพ | Paramedics treated him. | เจ้าหน้าที่กู้ชีพรักษาเขา
coast guard | หน่วยยามฝั่ง | The coast guard found the boat. | ยามฝั่งพบเรือ
customs officer | เจ้าหน้าที่ศุลกากร | Customs officers checked bags. | เจ้าหน้าที่ศุลกากรตรวจกระเป๋า
immigration officer | เจ้าหน้าที่ตรวจคนเข้าเมือง | Talk to the immigration officer. | คุยกับเจ้าหน้าที่ตรวจคนเข้าเมือง
---
local authority | หน่วยงานท้องถิ่น | Inform the local authority. | แจ้งหน่วยงานท้องถิ่น
army | กองทัพบก | The army helped with the flood. | ทหารช่วยน้ำท่วม
agency | หน่วยงาน | Many agencies worked together. | หลายหน่วยงานร่วมมือกัน
joint team | ทีมร่วม | A joint team was formed. | ตั้งทีมร่วม
share information | แบ่งปันข้อมูล | Agencies share information. | หน่วยงานแบ่งปันข้อมูล
hand over | ส่งต่อ (คดี/ตัว) | Hand over the suspect. | ส่งตัวผู้ต้องสงสัย
`);
U('talk', 4, 'การให้เหตุผล', `
the reason is | เหตุผลคือ | The reason is simple. | เหตุผลง่ายมาก
that's why | นั่นคือเหตุผลที่ | That's why I came. | นั่นคือเหตุผลที่ฉันมา
due to | เนื่องจาก | The game was canceled due to rain. | เกมถูกยกเลิกเพราะฝน
as a result | ผลก็คือ | As a result, we were late. | ผลคือเรามาสาย
since | เนื่องจาก | Since you're here, help me. | ไหนๆ ก็มาแล้ว ช่วยหน่อย
in order to | เพื่อที่จะ | I study in order to pass. | ฉันอ่านเพื่อให้สอบผ่าน
---
so that | เพื่อให้ | Speak slowly so that I understand. | พูดช้าๆ เพื่อให้ฉันเข้าใจ
because of | เพราะ | We stayed in because of the rain. | เราอยู่ในบ้านเพราะฝน
for this reason | ด้วยเหตุนี้ | For this reason, we said no. | ด้วยเหตุนี้เราจึงปฏิเสธ
the main reason | เหตุผลหลัก | The main reason is cost. | เหตุผลหลักคือราคา
it depends on | ขึ้นอยู่กับ | It depends on the weather. | ขึ้นอยู่กับสภาพอากาศ
otherwise | มิฉะนั้น | Hurry, otherwise we'll be late. | รีบหน่อย ไม่งั้นจะสาย
`);
U('daily', 5, 'สุขภาพจิตขั้นสูง', `
mindfulness | การมีสติ | Practice mindfulness. | ฝึกสติ
therapy | การบำบัด | She goes to therapy. | เธอไปบำบัด
self-care | การดูแลตัวเอง | Self-care is important. | การดูแลตัวเองสำคัญ
boundaries | ขอบเขตส่วนตัว | Set healthy boundaries. | ตั้งขอบเขตที่ดี
emotional | ทางอารมณ์ | She was very emotional. | เธออารมณ์อ่อนไหวมาก
support group | กลุ่มช่วยเหลือ | Join a support group. | เข้าร่วมกลุ่มช่วยเหลือ
---
panic attack | อาการแพนิก | He had a panic attack. | เขามีอาการแพนิก
insomnia | นอนไม่หลับ | I suffer from insomnia. | ฉันนอนไม่หลับ
recover from | ฟื้นจาก | She recovered from trauma. | เธอฟื้นจากบาดแผลทางใจ
seek help | ขอความช่วยเหลือ | Seek help early. | ขอความช่วยเหลือแต่เนิ่นๆ
stigma | ตราบาป | Fight the stigma of mental illness. | ต่อสู้กับตราบาปเรื่องโรคจิตเวช
hotline number | เบอร์สายด่วน | Call the mental health hotline 1323. | โทรสายด่วนสุขภาพจิต 1323
`);
U('police', 5, 'การบังคับใช้กฎหมายจราจรขั้นสูง', `
speed camera | กล้องจับความเร็ว | A speed camera caught him. | กล้องจับความเร็วจับได้
demerit points | ตัดแต้มใบขับขี่ | He lost demerit points. | เขาถูกตัดแต้ม
license suspension | พักใช้ใบขับขี่ | He got a license suspension. | ถูกพักใบขับขี่
blood alcohol | ระดับแอลกอฮอล์ในเลือด | His blood alcohol was high. | แอลกอฮอล์ในเลือดสูง
overloaded | บรรทุกเกิน | The truck was overloaded. | รถบรรทุกเกินพิกัด
unregistered | ไม่จดทะเบียน | It's an unregistered vehicle. | เป็นรถไม่จดทะเบียน
---
expired | หมดอายุ | Your license is expired. | ใบขับขี่หมดอายุ
traffic court | ศาลจราจร | You must go to traffic court. | ต้องไปศาลจราจร
impound | ยึดรถ | We will impound the car. | เราจะยึดรถ
modified exhaust | ท่อแต่ง | Modified exhausts are illegal. | ท่อแต่งเสียงดังผิดกฎหมาย
street racing | แข่งรถบนถนน | Street racing is dangerous. | แข่งรถบนถนนอันตราย
road rage | ความโกรธบนท้องถนน | It was a road rage incident. | เป็นเหตุบันดาลโทสะบนถนน
`);
U('talk', 5, 'การโน้มน้าวขั้นสูง', `
I strongly believe | ฉันเชื่ออย่างยิ่ง | I strongly believe this is right. | ฉันเชื่ออย่างยิ่งว่าถูก
the evidence shows | หลักฐานแสดงว่า | The evidence shows it works. | หลักฐานแสดงว่าได้ผล
consider this | ลองพิจารณาสิ่งนี้ | Consider this example. | ลองพิจารณาตัวอย่างนี้
imagine if | ลองนึกดูว่าถ้า | Imagine if everyone helped. | ลองนึกว่าถ้าทุกคนช่วย
the benefit is | ประโยชน์คือ | The benefit is clear. | ประโยชน์ชัดเจน
it's in our interest | เป็นประโยชน์ของเรา | It's in our interest to act. | การลงมือเป็นประโยชน์ของเรา
---
I urge you | ขอเรียกร้องให้คุณ | I urge you to reconsider. | ขอให้คุณพิจารณาใหม่
let's not forget | อย่าลืมว่า | Let's not forget the victims. | อย่าลืมผู้เสียหาย
the fact is | ความจริงคือ | The fact is, we need help. | ความจริงคือเราต้องการความช่วยเหลือ
without a doubt | อย่างไม่ต้องสงสัย | Without a doubt, it's worth it. | คุ้มค่าแน่นอน
most importantly | ที่สำคัญที่สุด | Most importantly, stay safe. | ที่สำคัญที่สุด ปลอดภัยไว้
think of the cost | คิดถึงต้นทุน | Think of the cost of doing nothing. | คิดถึงต้นทุนของการไม่ทำอะไร
`);
U('daily', 6, 'ศัพท์เทคโนโลยีขั้นสูง', `
algorithm | อัลกอริทึม | The algorithm decides what we see. | อัลกอริทึมกำหนดสิ่งที่เราเห็น
artificial intelligence | ปัญญาประดิษฐ์ | Artificial intelligence is changing work. | AI กำลังเปลี่ยนการทำงาน
automation | ระบบอัตโนมัติ | Automation saves time. | ระบบอัตโนมัติประหยัดเวลา
blockchain | บล็อกเชน | Blockchain records transactions. | บล็อกเชนบันทึกธุรกรรม
facial recognition | การจดจำใบหน้า | Facial recognition found the suspect. | ระบบจดจำใบหน้าพบผู้ต้องสงสัย
big data | ข้อมูลขนาดใหญ่ | Police use big data. | ตำรวจใช้ข้อมูลขนาดใหญ่
---
biometric | ชีวมิติ | Biometric data is sensitive. | ข้อมูลชีวมิติเป็นข้อมูลอ่อนไหว
deepfake | ดีปเฟก | That video is a deepfake. | คลิปนั้นเป็นดีปเฟก
drone | โดรน | Police used a drone. | ตำรวจใช้โดรน
cloud storage | ที่เก็บข้อมูลบนคลาวด์ | Save it in cloud storage. | บันทึกบนคลาวด์
digital forensics | นิติวิทยาศาสตร์ดิจิทัล | Digital forensics recovered the files. | นิติดิจิทัลกู้ไฟล์คืนได้
cyberattack | การโจมตีทางไซเบอร์ | The bank suffered a cyberattack. | ธนาคารถูกโจมตีทางไซเบอร์
`);
U('police', 6, 'การปฏิรูปและธรรมาภิบาลตำรวจ', `
oversight | การกำกับดูแล | Independent oversight is needed. | ต้องมีการกำกับดูแลอิสระ
public trust | ความไว้วางใจของประชาชน | Build public trust. | สร้างความไว้วางใจของประชาชน
code of conduct | จรรยาบรรณ | Follow the code of conduct. | ปฏิบัติตามจรรยาบรรณ
disciplinary action | การลงโทษทางวินัย | He faced disciplinary action. | เขาถูกลงโทษทางวินัย
internal affairs | หน่วยตรวจสอบภายใน | Internal affairs is investigating. | หน่วยตรวจสอบภายในกำลังสอบสวน
use of force | การใช้กำลัง | Use of force must be justified. | การใช้กำลังต้องมีเหตุผลรองรับ
---
community policing | ตำรวจชุมชน | Community policing builds trust. | ตำรวจชุมชนสร้างความไว้ใจ
performance review | การประเมินผลงาน | Annual performance review. | การประเมินผลงานประจำปี
merit-based | ตามระบบคุณธรรม | Promotion should be merit-based. | การเลื่อนตำแหน่งควรยึดคุณธรรม
professionalism | ความเป็นมืออาชีพ | Show professionalism. | แสดงความเป็นมืออาชีพ
human rights | สิทธิมนุษยชน | Respect human rights. | เคารพสิทธิมนุษยชน
rule of law | หลักนิติธรรม | Uphold the rule of law. | ธำรงหลักนิติธรรม
`);

U('talk', 1, 'คำลงท้ายและคำทักทายพิเศษ', `
good afternoon | สวัสดีตอนบ่าย | Good afternoon, sir. | สวัสดีตอนบ่ายครับ
good evening | สวัสดีตอนเย็น | Good evening, everyone. | สวัสดีตอนเย็นทุกคน
happy new year | สวัสดีปีใหม่ | Happy New Year! | สวัสดีปีใหม่!
congratulations | ยินดีด้วย | Congratulations on your exam! | ยินดีด้วยที่สอบผ่าน!
welcome back | ยินดีต้อนรับกลับมา | Welcome back! | ยินดีต้อนรับกลับมา!
take it easy | ทำตัวสบายๆ | Take it easy. | ทำตัวสบายๆ นะ
---
good luck tomorrow | ขอให้โชคดีพรุ่งนี้ | Good luck tomorrow! | ขอให้โชคดีพรุ่งนี้!
safe travels | เดินทางปลอดภัย | Safe travels! | เดินทางปลอดภัยนะ!
sweet dreams | ฝันดี | Good night. Sweet dreams. | ราตรีสวัสดิ์ ฝันดี
cheers | ไชโย/ขอบใจ | Cheers, mate! | ขอบใจนะเพื่อน!
best wishes | ด้วยความปรารถนาดี | Best wishes to your family. | ขอให้ครอบครัวคุณมีความสุข
see you soon | แล้วพบกันใหม่ | See you soon, friend. | แล้วพบกันใหม่เพื่อน
`);

// ===== ศัพท์ออกสอบ (เพิ่มรอบอัตโนมัติ) =====
U('daily', 2, 'ศัพท์ออกสอบ: กริยา 1', `
borrow | ยืม | Can I borrow your pen? | ฉันขอยืมปากกาคุณได้ไหม
lend | ให้ยืม | I can lend you some money. | ฉันให้คุณยืมเงินได้
hide | ซ่อน | The thief hid in the alley. | ขโมยซ่อนอยู่ในซอย
climb | ปีน | We climbed the mountain. | เราปีนภูเขา
hate | เกลียด | I hate waiting. | ฉันเกลียดการรอ
hope | หวัง | I hope you pass the exam. | ฉันหวังว่าคุณจะสอบผ่าน
---
enter | เข้า | Please enter through the front door. | กรุณาเข้าทางประตูหน้า
gather | รวบรวม/รวมตัว | People gathered outside. | ผู้คนรวมตัวกันข้างนอก
fail | ล้มเหลว/สอบตก | Don't be afraid to fail. | อย่ากลัวความล้มเหลว
earn | หา (เงิน)/ได้รับ | He earns 15,000 baht a month. | เขาหาเงินได้เดือนละ 15,000 บาท
owe | ติดหนี้ | I owe you 100 baht. | ฉันติดเงินคุณ 100 บาท
guess | เดา | Guess the answer. | เดาคำตอบดู
`);
U('daily', 2, 'ศัพท์ออกสอบ: กริยา 2', `
celebrate | ฉลอง | We celebrated his birthday. | เราฉลองวันเกิดของเขา
deliver | ส่ง (ของ) | They deliver food to your door. | พวกเขาส่งอาหารถึงหน้าประตู
discover | ค้นพบ | They discovered the truth. | พวกเขาค้นพบความจริง
destroy | ทำลาย | The fire destroyed the house. | ไฟทำลายบ้านหลังนั้น
expect | คาดหวัง/คาดว่า | I expect him at nine. | ฉันคาดว่าเขาจะมาเก้าโมง
invent | ประดิษฐ์ | Who invented the telephone? | ใครประดิษฐ์โทรศัพท์
---
prepare | เตรียม | Prepare your documents. | เตรียมเอกสารของคุณ
mention | กล่าวถึง | He didn't mention the money. | เขาไม่ได้พูดถึงเรื่องเงิน
notice | สังเกตเห็น | Did you notice anything strange? | คุณสังเกตเห็นอะไรแปลกๆ ไหม
remove | เอาออก | Remove your shoes, please. | กรุณาถอดรองเท้า
replace | แทนที่/เปลี่ยนใหม่ | Replace the old battery. | เปลี่ยนแบตเตอรี่ก้อนเก่า
share | แบ่งปัน | Share the information with the team. | แบ่งปันข้อมูลกับทีม
`);
U('daily', 2, 'ศัพท์ออกสอบ: คุณศัพท์ 1', `
alone | คนเดียว/ลำพัง | She lives alone. | เธออยู่คนเดียว
afraid | กลัว | I'm afraid of dogs. | ฉันกลัวสุนัข
alive | ยังมีชีวิตอยู่ | The victim is still alive. | ผู้เสียหายยังมีชีวิตอยู่
awful | แย่มาก | The weather is awful today. | วันนี้อากาศแย่มาก
basic | พื้นฐาน | Learn basic English first. | เรียนภาษาอังกฤษพื้นฐานก่อน
common | ทั่วไป/พบบ่อย | Theft is a common crime. | การลักทรัพย์เป็นอาชญากรรมที่พบบ่อย
---
terrible | แย่มาก/น่ากลัว | It was a terrible accident. | มันเป็นอุบัติเหตุที่ร้ายแรงมาก
excellent | ยอดเยี่ยม | Your English is excellent. | ภาษาอังกฤษของคุณยอดเยี่ยม
familiar | คุ้นเคย | His face looks familiar. | หน้าเขาดูคุ้นๆ
ordinary | ธรรมดา | It was an ordinary day. | มันเป็นวันธรรมดา
similar | คล้ายกัน | The two cars are similar. | รถสองคันนั้นคล้ายกัน
rare | หายาก | This bird is rare. | นกชนิดนี้หายาก
`);
U('daily', 2, 'ศัพท์ออกสอบ: คำนาม 1', `
advice | คำแนะนำ | Thank you for your advice. | ขอบคุณสำหรับคำแนะนำ
choice | ทางเลือก | You have no choice. | คุณไม่มีทางเลือก
amount | จำนวน | A large amount of money was stolen. | เงินจำนวนมากถูกขโมย
ability | ความสามารถ | She has the ability to lead. | เธอมีความสามารถในการเป็นผู้นำ
adult | ผู้ใหญ่ | Tickets are 100 baht for adults. | ตั๋วผู้ใหญ่ราคา 100 บาท
distance | ระยะทาง | Keep a safe distance. | รักษาระยะห่างที่ปลอดภัย
---
effort | ความพยายาม | Thank you for your effort. | ขอบคุณสำหรับความพยายามของคุณ
emotion | อารมณ์ | Control your emotions. | ควบคุมอารมณ์ของคุณ
enemy | ศัตรู | He has no enemies. | เขาไม่มีศัตรู
fear | ความกลัว | He has a fear of heights. | เขากลัวความสูง
fault | ความผิด | It's not your fault. | ไม่ใช่ความผิดของคุณ
pride | ความภูมิใจ | She spoke with pride. | เธอพูดด้วยความภูมิใจ
`);
U('daily', 3, 'ศัพท์ออกสอบ: กริยา 3', `
admire | ชื่นชม | I admire your courage. | ฉันชื่นชมความกล้าหาญของคุณ
adopt | รับเลี้ยง/นำมาใช้ | They adopted a new system. | พวกเขานำระบบใหม่มาใช้
appear | ปรากฏ/ดูเหมือน | He appeared at the door. | เขาปรากฏตัวที่ประตู
arrange | จัดเตรียม/นัด | I'll arrange a meeting. | ฉันจะนัดประชุมให้
attend | เข้าร่วม | All officers must attend. | เจ้าหน้าที่ทุกคนต้องเข้าร่วม
attract | ดึงดูด | The festival attracts tourists. | เทศกาลดึงดูดนักท่องเที่ยว
---
belong | เป็นของ | This bag belongs to me. | กระเป๋าใบนี้เป็นของฉัน
blame | ตำหนิ/โทษ | Don't blame others. | อย่าโทษคนอื่น
bother | รบกวน | Sorry to bother you. | ขอโทษที่รบกวน
compare | เปรียบเทียบ | Compare the two photos. | เปรียบเทียบรูปสองรูป
compete | แข่งขัน | Thousands compete for the job. | คนนับพันแข่งขันกันเพื่องานนี้
complete | ทำให้เสร็จ/ครบ | Complete the form. | กรอกแบบฟอร์มให้ครบ
`);
U('daily', 3, 'ศัพท์ออกสอบ: กริยา 4', `
concentrate | ตั้งสมาธิ | I can't concentrate. | ฉันตั้งสมาธิไม่ได้
consider | พิจารณา | Please consider my request. | กรุณาพิจารณาคำขอของฉัน
continue | ทำต่อ | Continue straight ahead. | ตรงไปข้างหน้าต่อ
create | สร้าง | They created a new app. | พวกเขาสร้างแอปใหม่
declare | ประกาศ/สำแดง | Do you have anything to declare? | คุณมีอะไรต้องสำแดงไหม
defend | ป้องกัน/แก้ต่าง | He defended himself. | เขาป้องกันตัวเอง
---
depend | ขึ้นอยู่กับ | It depends on the weather. | ขึ้นอยู่กับสภาพอากาศ
deserve | สมควรได้รับ | You deserve a rest. | คุณสมควรได้พัก
design | ออกแบบ | She designed the uniform. | เธอออกแบบเครื่องแบบ
develop | พัฒนา | Develop your skills. | พัฒนาทักษะของคุณ
divide | แบ่ง | Divide the class into groups. | แบ่งชั้นเรียนเป็นกลุ่ม
donate | บริจาค | They donated blood. | พวกเขาบริจาคเลือด
`);
U('daily', 3, 'ศัพท์ออกสอบ: คุณศัพท์ 2', `
anxious | กังวล | I feel anxious before exams. | ฉันรู้สึกกังวลก่อนสอบ
aware | ตระหนัก/รู้ตัว | Are you aware of the risk? | คุณรู้ถึงความเสี่ยงไหม
brief | สั้น/กระชับ | Give a brief answer. | ตอบสั้นๆ
capable | มีความสามารถ | She is a capable officer. | เธอเป็นเจ้าหน้าที่ที่มีความสามารถ
certain | แน่ใจ/บางอย่าง | Are you certain? | คุณแน่ใจไหม
convenient | สะดวก | Is Monday convenient for you? | วันจันทร์สะดวกสำหรับคุณไหม
---
cruel | โหดร้าย | It was a cruel crime. | มันเป็นอาชญากรรมที่โหดร้าย
decent | ดี/เหมาะสม | He has a decent job. | เขามีงานที่ดี
eager | กระตือรือร้น | She is eager to learn. | เธอกระตือรือร้นที่จะเรียน
entire | ทั้งหมด | They searched the entire building. | พวกเขาค้นทั้งอาคาร
equal | เท่ากัน | Everyone is equal under the law. | ทุกคนเท่าเทียมกันภายใต้กฎหมาย
exact | แน่นอน/ตรง | What is the exact time? | เวลาที่แน่นอนคือกี่โมง
`);
U('daily', 3, 'ศัพท์ออกสอบ: คำนาม 2', `
adventure | การผจญภัย | The trip was an adventure. | การเดินทางเป็นการผจญภัย
ambition | ความทะเยอทะยาน | His ambition is to be a police officer. | ความใฝ่ฝันของเขาคือเป็นตำรวจ
attitude | ทัศนคติ | She has a positive attitude. | เธอมีทัศนคติเชิงบวก
belief | ความเชื่อ | Respect other people's beliefs. | เคารพความเชื่อของผู้อื่น
charity | การกุศล | They gave money to charity. | พวกเขาบริจาคเงินเพื่อการกุศล
comfort | ความสบาย/ปลอบใจ | She tried to comfort the victim. | เธอพยายามปลอบผู้เสียหาย
---
courage | ความกล้าหาญ | It takes courage to tell the truth. | ต้องใช้ความกล้าในการพูดความจริง
decade | ทศวรรษ (10 ปี) | Crime fell over the last decade. | อาชญากรรมลดลงในทศวรรษที่ผ่านมา
disease | โรค | Heart disease is common. | โรคหัวใจพบได้บ่อย
faith | ศรัทธา/ความเชื่อมั่น | I have faith in you. | ฉันเชื่อมั่นในตัวคุณ
fortune | โชคลาภ/ทรัพย์สมบัติ | He made a fortune. | เขาร่ำรวยมาก
liberty | เสรีภาพ | Liberty must be protected. | เสรีภาพต้องได้รับการปกป้อง
`);
U('daily', 4, 'ศัพท์ออกสอบ: กริยา 5', `
abandon | ละทิ้ง | They abandoned the car. | พวกเขาทิ้งรถไว้
absorb | ดูดซับ | Plants absorb water. | พืชดูดซับน้ำ
accompany | ไปด้วย/ติดตาม | An officer will accompany you. | เจ้าหน้าที่จะไปกับคุณ
accomplish | ทำสำเร็จ | We accomplished our goal. | เราทำเป้าหมายสำเร็จ
adjust | ปรับ | Adjust your mirror. | ปรับกระจกของคุณ
alter | เปลี่ยนแปลง/แก้ไข | Don't alter the document. | อย่าแก้ไขเอกสาร
---
approve | อนุมัติ/เห็นชอบ | The chief approved the plan. | หัวหน้าอนุมัติแผน
assume | สันนิษฐาน/คิดเอาเอง | Don't assume he is guilty. | อย่าคิดเอาเองว่าเขาผิด
betray | ทรยศ | He betrayed his friend. | เขาทรยศเพื่อน
boast | คุยโว | He boasted about his car. | เขาคุยโวเรื่องรถของเขา
calculate | คำนวณ | Calculate the total cost. | คำนวณค่าใช้จ่ายทั้งหมด
capture | จับกุม/จับได้ | Police captured the fugitive. | ตำรวจจับผู้หลบหนีได้
`);
U('daily', 4, 'ศัพท์ออกสอบ: กริยา 6', `
combine | รวมกัน | Combine the two reports. | รวมรายงานสองฉบับ
confront | เผชิญหน้า | She confronted the thief. | เธอเผชิญหน้ากับขโมย
consult | ปรึกษา | Consult a doctor. | ปรึกษาแพทย์
consume | บริโภค/ใช้ | Cars consume a lot of fuel. | รถยนต์ใช้น้ำมันมาก
contain | บรรจุ/มี | The bag contained drugs. | กระเป๋ามียาเสพติดอยู่
cope | รับมือ | How do you cope with stress? | คุณรับมือกับความเครียดอย่างไร
---
detect | ตรวจพบ | The dog detected drugs. | สุนัขตรวจพบยาเสพติด
distribute | แจกจ่าย | They distributed food to victims. | พวกเขาแจกอาหารให้ผู้ประสบภัย
disturb | รบกวน | Do not disturb. | ห้ามรบกวน
eliminate | กำจัด/ตัดออก | We eliminated two suspects. | เราตัดผู้ต้องสงสัยออกสองคน
encourage | สนับสนุน/ให้กำลังใจ | My father encouraged me. | พ่อให้กำลังใจฉัน
ensure | ทำให้แน่ใจ | Ensure the door is locked. | ตรวจให้แน่ใจว่าประตูล็อกแล้ว
`);
U('daily', 4, 'ศัพท์ออกสอบ: คุณศัพท์ 3', `
aggressive | ก้าวร้าว | The man became aggressive. | ชายคนนั้นเริ่มก้าวร้าว
alternative | ทางเลือกอื่น | Is there an alternative route? | มีเส้นทางอื่นไหม
ancient | โบราณ | Ayutthaya is an ancient city. | อยุธยาเป็นเมืองโบราณ
apparent | ชัดเจน/ดูเหมือน | There was no apparent reason. | ไม่มีเหตุผลที่ชัดเจน
brilliant | ยอดเยี่ยม/ฉลาดมาก | That's a brilliant idea. | นั่นเป็นความคิดที่ยอดเยี่ยม
casual | ลำลอง/สบายๆ | Wear casual clothes. | ใส่ชุดลำลอง
---
delicate | บอบบาง/ละเอียดอ่อน | It's a delicate matter. | มันเป็นเรื่องละเอียดอ่อน
dramatic | อย่างมาก/น่าตื่นเต้น | There was a dramatic increase. | มีการเพิ่มขึ้นอย่างมาก
enormous | ใหญ่มหาศาล | The damage was enormous. | ความเสียหายมหาศาล
flexible | ยืดหยุ่น | My schedule is flexible. | ตารางของฉันยืดหยุ่น
formal | เป็นทางการ | Use formal language. | ใช้ภาษาทางการ
gradual | ค่อยเป็นค่อยไป | There was a gradual change. | มีการเปลี่ยนแปลงทีละน้อย
`);
U('daily', 4, 'ศัพท์ออกสอบ: คำนาม 3', `
access | การเข้าถึง | Only staff have access. | เฉพาะพนักงานเท่านั้นที่เข้าถึงได้
aspect | แง่มุม | Consider every aspect. | พิจารณาทุกแง่มุม
barrier | สิ่งกีดขวาง/อุปสรรค | Language is a barrier. | ภาษาเป็นอุปสรรค
burden | ภาระ | Debt is a heavy burden. | หนี้เป็นภาระหนัก
capacity | ความจุ/ขีดความสามารถ | The stadium has a capacity of 50,000. | สนามจุคนได้ 50,000 คน
chaos | ความวุ่นวาย | The crowd caused chaos. | ฝูงชนก่อความวุ่นวาย
---
element | องค์ประกอบ | Trust is a key element. | ความไว้วางใจเป็นองค์ประกอบสำคัญ
feature | ลักษณะเด่น/คุณสมบัติ | The phone has a new feature. | โทรศัพท์มีฟีเจอร์ใหม่
function | หน้าที่/การทำงาน | What is the function of this button? | ปุ่มนี้มีหน้าที่อะไร
influence | อิทธิพล | Media has a strong influence. | สื่อมีอิทธิพลมาก
margin | ส่วนต่าง/ขอบ | He won by a small margin. | เขาชนะด้วยคะแนนห่างเล็กน้อย
phase | ระยะ/ขั้นตอน | The first phase is complete. | ระยะแรกเสร็จแล้ว
`);
U('daily', 5, 'ศัพท์ออกสอบ: กริยา 7', `
exceed | เกิน | Don't exceed the speed limit. | อย่าขับเกินความเร็วที่กำหนด
exclude | ไม่รวม/กันออก | Tax is excluded. | ไม่รวมภาษี
expand | ขยาย | The company expanded abroad. | บริษัทขยายไปต่างประเทศ
explode | ระเบิด | The bomb exploded at noon. | ระเบิดตอนเที่ยง
expose | เปิดเผย/เปิดโปง | The report exposed corruption. | รายงานเปิดโปงการทุจริต
extend | ขยาย/ต่อเวลา | Can I extend my visa? | ฉันต่อวีซ่าได้ไหม
---
forbid | ห้าม | Smoking is forbidden here. | ห้ามสูบบุหรี่ที่นี่
frustrate | ทำให้หงุดหงิด | Slow internet frustrates me. | อินเทอร์เน็ตช้าทำให้ฉันหงุดหงิด
fulfill | ทำให้สำเร็จ/ทำตาม | He fulfilled his promise. | เขาทำตามสัญญา
guarantee | รับประกัน | We can't guarantee success. | เรารับประกันความสำเร็จไม่ได้
hesitate | ลังเล | Don't hesitate to call us. | อย่าลังเลที่จะโทรหาเรา
imply | สื่อเป็นนัย | What are you implying? | คุณหมายความว่าอะไร
`);
U('daily', 5, 'ศัพท์ออกสอบ: กริยา 8', `
interfere | แทรกแซง/ยุ่ง | Don't interfere with the investigation. | อย่าแทรกแซงการสืบสวน
interrupt | ขัดจังหวะ | Sorry to interrupt. | ขอโทษที่ขัดจังหวะ
invade | บุกรุก/รุกราน | They invaded his privacy. | พวกเขาบุกรุกความเป็นส่วนตัวของเขา
isolate | แยกออก/กักตัว | Isolate the area. | แยกพื้นที่ออก
neglect | ละเลย | Don't neglect your health. | อย่าละเลยสุขภาพ
occupy | ครอบครอง/ใช้ (พื้นที่) | The seat is occupied. | ที่นั่งมีคนนั่งแล้ว
---
overcome | เอาชนะ | She overcame her fear. | เธอเอาชนะความกลัวได้
participate | มีส่วนร่วม | Everyone can participate. | ทุกคนมีส่วนร่วมได้
possess | ครอบครอง | He possessed illegal drugs. | เขาครอบครองยาเสพติด
preserve | อนุรักษ์/รักษา | Preserve the crime scene. | รักษาสภาพที่เกิดเหตุ
pretend | แกล้งทำ | He pretended to be sick. | เขาแกล้งป่วย
restrict | จำกัด | Access is restricted. | การเข้าถึงถูกจำกัด
`);
U('daily', 5, 'ศัพท์ออกสอบ: คุณศัพท์ 4', `
abundant | อุดมสมบูรณ์/มากมาย | Water is abundant here. | ที่นี่มีน้ำมากมาย
adequate | เพียงพอ | Get adequate sleep. | นอนให้เพียงพอ
harsh | รุนแรง/เข้มงวด | The punishment was harsh. | บทลงโทษรุนแรง
fierce | ดุร้าย/ดุเดือด | It was a fierce fight. | เป็นการต่อสู้ที่ดุเดือด
modest | ถ่อมตัว/พอประมาณ | He is modest about his success. | เขาถ่อมตัวเรื่องความสำเร็จ
permanent | ถาวร | Is this job permanent? | งานนี้เป็นงานประจำไหม
---
precise | แม่นยำ/ชัดเจน | Give precise details. | ให้รายละเอียดที่ชัดเจน
rapid | รวดเร็ว | There was a rapid response. | มีการตอบสนองอย่างรวดเร็ว
relevant | เกี่ยวข้อง | Is this information relevant? | ข้อมูลนี้เกี่ยวข้องไหม
sincere | จริงใจ | Please accept my sincere apology. | โปรดรับคำขอโทษอย่างจริงใจ
sufficient | เพียงพอ | There is sufficient evidence. | มีหลักฐานเพียงพอ
vague | คลุมเครือ | His answer was vague. | คำตอบของเขาคลุมเครือ
`);
U('daily', 6, 'ศัพท์ออกสอบ: กริยาขั้นสูง', `
sacrifice | เสียสละ | He sacrificed his life. | เขาเสียสละชีวิต
sustain | รักษาไว้/ได้รับ (บาดเจ็บ) | He sustained serious injuries. | เขาได้รับบาดเจ็บสาหัส
tolerate | อดทน/ยอมรับ | We will not tolerate violence. | เราจะไม่ยอมรับความรุนแรง
transform | เปลี่ยนแปลงอย่างมาก | Technology transformed policing. | เทคโนโลยีเปลี่ยนงานตำรวจอย่างมาก
yield | ให้ทาง/ให้ผล | Yield to pedestrians. | ให้ทางคนเดินเท้า
tackle | จัดการ/รับมือ | We must tackle corruption. | เราต้องจัดการกับการทุจริต
---
classify | จำแนก/จัดเป็นความลับ | The files are classified. | แฟ้มถูกจัดเป็นความลับ
manufacture | ผลิต | They manufacture fake goods. | พวกเขาผลิตสินค้าปลอม
restore | ฟื้นฟู/คืนสู่สภาพเดิม | Police restored order. | ตำรวจฟื้นฟูความสงบ
reveal | เปิดเผย | The test revealed the truth. | การตรวจเปิดเผยความจริง
unite | รวมเป็นหนึ่ง | We must unite against crime. | เราต้องร่วมมือกันต่อต้านอาชญากรรม
swear | สาบาน | Do you swear to tell the truth? | คุณสาบานว่าจะพูดความจริงไหม
`);

U('daily', 2, 'ศัพท์ออกสอบ: กริยา 9', `
cheat | โกง | Don't cheat on the exam. | อย่าโกงข้อสอบ
cure | รักษาให้หาย | This medicine can cure the disease. | ยานี้รักษาโรคให้หายได้
explore | สำรวจ | Let's explore the old town. | ไปสำรวจเมืองเก่ากันเถอะ
hunt | ล่า/ตามหา | Police are hunting the killer. | ตำรวจกำลังตามล่าฆาตกร
pause | หยุดชั่วคราว | Pause the video, please. | กรุณาหยุดวิดีโอไว้ก่อน
scare | ทำให้กลัว | The noise scared the children. | เสียงนั้นทำให้เด็กๆ กลัว
---
whisper | กระซิบ | She whispered his name. | เธอกระซิบชื่อเขา
imagine | จินตนาการ | Imagine you are a police officer. | ลองนึกภาพว่าคุณเป็นตำรวจ
ignore | เพิกเฉย | Don't ignore the warning. | อย่าเพิกเฉยต่อคำเตือน
realize | ตระหนัก/รู้ตัว | I realized I was lost. | ฉันรู้ตัวว่าหลงทาง
recall | นึกออก/เรียกคืน | I can't recall his name. | ฉันนึกชื่อเขาไม่ออก
reduce | ลด | Reduce your speed. | ลดความเร็วลง
`);
U('daily', 2, 'ศัพท์ออกสอบ: คุณศัพท์ 5', `
absent | ขาด/ไม่อยู่ | He was absent from work today. | วันนี้เขาขาดงาน
blank | ว่างเปล่า | Write your name in the blank space. | เขียนชื่อในช่องว่าง
bold | กล้า/ตัวหนา | That was a bold decision. | นั่นเป็นการตัดสินใจที่กล้าหาญ
horrible | น่ากลัว/แย่มาก | It was a horrible crime. | เป็นอาชญากรรมที่น่ากลัว
loyal | ซื่อสัตย์/จงรักภักดี | Dogs are loyal animals. | สุนัขเป็นสัตว์ที่ซื่อสัตย์
rough | หยาบ/ขรุขระ/คร่าวๆ | The road is rough. | ถนนขรุขระ
---
narrow | แคบ | The alley is very narrow. | ซอยแคบมาก
broad | กว้าง | He has broad shoulders. | เขาไหล่กว้าง
tough | ยาก/แข็งแกร่ง | Police training is tough. | การฝึกตำรวจหนักมาก
typical | โดยทั่วไป/ตามแบบฉบับ | This is a typical scam. | นี่คือการหลอกลวงแบบทั่วไป
violent | รุนแรง | He has a violent past. | เขามีประวัติใช้ความรุนแรง
strict | เข้มงวด | The rules are strict. | กฎเข้มงวด
`);
U('daily', 2, 'ศัพท์ออกสอบ: คำนาม 4', `
award | รางวัล | She won an award. | เธอได้รับรางวัล
battle | การต่อสู้ | It was a long battle. | เป็นการต่อสู้ที่ยาวนาน
chief | หัวหน้า | The police chief spoke today. | ผู้บังคับการตำรวจพูดวันนี้
expert | ผู้เชี่ยวชาญ | Ask an expert. | ถามผู้เชี่ยวชาญ
mission | ภารกิจ | The mission was a success. | ภารกิจสำเร็จ
mystery | ปริศนา | His death is a mystery. | การตายของเขาเป็นปริศนา
---
option | ทางเลือก | You have two options. | คุณมีสองทางเลือก
routine | กิจวัตร | Exercise is part of my routine. | การออกกำลังกายเป็นกิจวัตรของฉัน
shame | ความอับอาย/น่าเสียดาย | What a shame! | น่าเสียดายจัง
silence | ความเงียบ | There was silence in the room. | ห้องเงียบสนิท
talent | พรสวรรค์ | She has a talent for music. | เธอมีพรสวรรค์ด้านดนตรี
wealth | ความมั่งคั่ง | Health is better than wealth. | สุขภาพดีกว่าความร่ำรวย
`);
U('daily', 3, 'ศัพท์ออกสอบ: กริยา 10', `
advertise | โฆษณา | They advertise on TV. | พวกเขาโฆษณาทางทีวี
amaze | ทำให้ประหลาดใจ | Her skill amazed everyone. | ฝีมือเธอทำให้ทุกคนทึ่ง
annoy | ทำให้รำคาญ | The noise annoys me. | เสียงนั้นทำให้ฉันรำคาญ
amuse | ทำให้ขบขัน | The story amused the children. | เรื่องนั้นทำให้เด็กๆ ขำ
burst | แตก/ปะทุ | The water pipe burst. | ท่อน้ำแตก
collapse | ถล่ม/ล้มลง | The bridge collapsed. | สะพานถล่ม
---
comment | แสดงความเห็น | Police refused to comment. | ตำรวจปฏิเสธที่จะให้ความเห็น
communicate | สื่อสาร | We communicate by radio. | เราสื่อสารกันทางวิทยุ
defeat | เอาชนะ | Thailand defeated Japan. | ไทยชนะญี่ปุ่น
depart | ออกเดินทาง | The bus departs at six. | รถออกตอนหกโมง
drown | จมน้ำ | A boy almost drowned. | เด็กชายเกือบจมน้ำ
elect | เลือกตั้ง | People elect their leaders. | ประชาชนเลือกผู้นำของตน
`);
U('daily', 3, 'ศัพท์ออกสอบ: กริยา 11', `
employ | จ้าง | The company employs 200 people. | บริษัทจ้างพนักงาน 200 คน
examine | ตรวจสอบ | The doctor examined the victim. | แพทย์ตรวจผู้เสียหาย
express | แสดงออก | Express your opinion. | แสดงความคิดเห็นของคุณ
gain | ได้รับ/เพิ่มขึ้น | You will gain experience. | คุณจะได้รับประสบการณ์
handle | จัดการ | Can you handle this case? | คุณจัดการคดีนี้ได้ไหม
harm | ทำร้าย/ทำอันตราย | He didn't mean to harm anyone. | เขาไม่ได้ตั้งใจทำร้ายใคร
---
heal | รักษา/หาย (แผล) | The wound will heal soon. | แผลจะหายเร็วๆ นี้
identify | ระบุตัว | Can you identify the man? | คุณระบุตัวชายคนนั้นได้ไหม
injure | ทำให้บาดเจ็บ | Two people were injured. | มีคนได้รับบาดเจ็บสองคน
insist | ยืนยัน/ยืนกราน | He insisted he was innocent. | เขายืนกรานว่าบริสุทธิ์
intend | ตั้งใจ | I intend to pass the exam. | ฉันตั้งใจจะสอบให้ผ่าน
locate | ค้นหาตำแหน่ง/ตั้งอยู่ | We located the stolen car. | เราพบตำแหน่งรถที่ถูกขโมย
`);
U('daily', 3, 'ศัพท์ออกสอบ: คุณศัพท์ 6', `
annual | ประจำปี | The annual meeting is in May. | การประชุมประจำปีจัดในเดือนพฤษภาคม
constant | ตลอดเวลา/คงที่ | The pain is constant. | ปวดตลอดเวลา
domestic | ภายในประเทศ/ในบ้าน | Domestic flights are cheap. | เที่ยวบินในประเทศราคาถูก
extreme | สุดขั้ว/รุนแรงมาก | Avoid extreme heat. | หลีกเลี่ยงความร้อนจัด
former | อดีต/คนก่อน | He is a former police officer. | เขาเป็นอดีตตำรวจ
frequent | บ่อย | Accidents are frequent here. | อุบัติเหตุเกิดบ่อยที่นี่
---
immediate | ทันที | We need an immediate answer. | เราต้องการคำตอบทันที
instant | ทันที/สำเร็จรูป | I like instant noodles. | ฉันชอบบะหมี่กึ่งสำเร็จรูป
major | สำคัญ/ใหญ่ | It was a major problem. | มันเป็นปัญหาใหญ่
minor | เล็กน้อย | He had minor injuries. | เขาบาดเจ็บเล็กน้อย
physical | ทางกาย | Pass the physical test. | สอบผ่านการทดสอบร่างกาย
practical | ใช้ได้จริง | Give me practical advice. | ให้คำแนะนำที่ใช้ได้จริง
`);
U('daily', 3, 'ศัพท์ออกสอบ: คำนาม 5', `
bargain | ของถูก/การต่อรอง | This shirt is a bargain. | เสื้อตัวนี้ราคาถูกมาก
desire | ความปรารถนา | He has a strong desire to win. | เขาอยากชนะมาก
doubt | ความสงสัย | There is no doubt. | ไม่ต้องสงสัยเลย
draft | ร่าง/ฉบับร่าง | Send me the first draft. | ส่งฉบับร่างแรกมาให้ฉัน
manner | ท่าทาง/ลักษณะ | He spoke in a calm manner. | เขาพูดด้วยท่าทีสงบ
method | วิธีการ | This method works well. | วิธีนี้ได้ผลดี
---
occasion | โอกาส/งาน | Wear a suit for special occasions. | ใส่สูทในโอกาสพิเศษ
origin | ที่มา/ต้นกำเนิด | What is the origin of this word? | คำนี้มีที่มาจากไหน
pity | ความสงสาร/น่าเสียดาย | It's a pity you can't come. | น่าเสียดายที่คุณมาไม่ได้
plenty | มากมาย/เหลือเฟือ | We have plenty of time. | เรามีเวลาเหลือเฟือ
quantity | ปริมาณ | Police found a large quantity of drugs. | ตำรวจพบยาเสพติดปริมาณมาก
quarrel | การทะเลาะ | They had a quarrel about money. | พวกเขาทะเลาะกันเรื่องเงิน
`);
U('daily', 4, 'ศัพท์ออกสอบ: กริยา 12', `
accelerate | เร่งความเร็ว | The car accelerated suddenly. | รถเร่งความเร็วกะทันหัน
accommodate | รองรับ/ให้ที่พัก | The hotel can accommodate 200 guests. | โรงแรมรองรับแขกได้ 200 คน
acknowledge | ยอมรับ/แจ้งรับทราบ | He acknowledged his mistake. | เขายอมรับความผิดพลาด
affect | ส่งผลกระทบ | Stress affects your health. | ความเครียดส่งผลต่อสุขภาพ
appoint | แต่งตั้ง | He was appointed chief. | เขาได้รับแต่งตั้งเป็นหัวหน้า
assure | ยืนยัน/ให้ความมั่นใจ | I assure you it's safe. | ฉันยืนยันว่ามันปลอดภัย
---
boost | ส่งเสริม/เพิ่ม | Exercise boosts your energy. | การออกกำลังกายช่วยเพิ่มพลัง
conduct | ดำเนินการ | Police conducted a search. | ตำรวจทำการตรวจค้น
construct | ก่อสร้าง | They constructed a new road. | พวกเขาสร้างถนนใหม่
define | ให้นิยาม | Define the word "justice". | ให้นิยามคำว่า "ความยุติธรรม"
devote | อุทิศ | She devoted her life to helping others. | เธออุทิศชีวิตเพื่อช่วยผู้อื่น
dismiss | ไล่ออก/ปัด (ข้อกล่าวหา) | The court dismissed the case. | ศาลยกฟ้องคดี
`);
U('daily', 4, 'ศัพท์ออกสอบ: กริยา 13', `
display | แสดง/จัดแสดง | Display your ID card. | แสดงบัตรประจำตัวของคุณ
enable | ทำให้สามารถ | The app enables fast reporting. | แอปช่วยให้แจ้งเหตุได้เร็ว
encounter | เผชิญ/พบ | We encountered many problems. | เราเผชิญปัญหามากมาย
engage | มีส่วนร่วม/ดึงดูด | Engage with the community. | มีส่วนร่วมกับชุมชน
establish | ก่อตั้ง/พิสูจน์ | We must establish the facts. | เราต้องหาข้อเท็จจริงให้ได้
exhaust | ทำให้หมดแรง/ใช้หมด | The long shift exhausted him. | กะยาวทำให้เขาหมดแรง
---
illustrate | แสดงให้เห็น/ยกตัวอย่าง | Let me illustrate with an example. | ขอยกตัวอย่างให้เห็น
impress | ทำให้ประทับใจ | Her answer impressed the panel. | คำตอบของเธอทำให้กรรมการประทับใจ
indicate | บ่งบอก/ชี้ | The evidence indicates murder. | หลักฐานบ่งชี้ว่าเป็นการฆาตกรรม
involve | เกี่ยวข้อง | Was he involved in the crime? | เขาเกี่ยวข้องกับคดีไหม
launch | เปิดตัว/เริ่ม | Police launched an investigation. | ตำรวจเริ่มการสืบสวน
lean | พิง/เอน | Don't lean on the door. | อย่าพิงประตู
`);
U('daily', 4, 'ศัพท์ออกสอบ: คุณศัพท์ 7', `
alike | เหมือนกัน | The twins look alike. | ฝาแฝดหน้าเหมือนกัน
complex | ซับซ้อน | The case is complex. | คดีนี้ซับซ้อน
conscious | รู้สึกตัว/ตระหนัก | Is the victim conscious? | ผู้เสียหายรู้สึกตัวไหม
effective | ได้ผล | This is an effective method. | นี่เป็นวิธีที่ได้ผล
global | ทั่วโลก | Climate change is a global issue. | การเปลี่ยนแปลงสภาพอากาศเป็นปัญหาระดับโลก
individual | แต่ละคน/บุคคล | Each individual has rights. | ทุกคนมีสิทธิ
---
potential | ศักยภาพ/ที่อาจเกิดขึ้น | He is a potential suspect. | เขาเป็นผู้ที่อาจเป็นผู้ต้องสงสัย
primary | หลัก/ประถม | Safety is our primary goal. | ความปลอดภัยเป็นเป้าหมายหลัก
prior | ก่อนหน้า | Do you have any prior convictions? | คุณเคยต้องโทษมาก่อนไหม
proper | เหมาะสม/ถูกต้อง | Wear proper uniform. | สวมเครื่องแบบให้ถูกต้อง
sensible | มีเหตุผล | That's a sensible decision. | นั่นเป็นการตัดสินใจที่มีเหตุผล
severe | รุนแรง | He has severe injuries. | เขาบาดเจ็บสาหัส
`);
U('daily', 4, 'ศัพท์ออกสอบ: คำนาม 6', `
command | คำสั่ง/การบังคับบัญชา | Follow the command. | ปฏิบัติตามคำสั่ง
concern | ความกังวล | Safety is our main concern. | ความปลอดภัยคือสิ่งที่เรากังวลที่สุด
contest | การแข่งขัน | She won the singing contest. | เธอชนะการประกวดร้องเพลง
finance | การเงิน | He works in finance. | เขาทำงานด้านการเงิน
fund | กองทุน/เงินทุน | They raised funds for victims. | พวกเขาระดมทุนช่วยผู้เสียหาย
issue | ประเด็น/ปัญหา | Drugs are a serious issue. | ยาเสพติดเป็นปัญหาร้ายแรง
---
obligation | ข้อผูกมัด/หน้าที่ | You have no obligation to pay. | คุณไม่มีหน้าที่ต้องจ่าย
procedure | ขั้นตอน | Follow the correct procedure. | ทำตามขั้นตอนที่ถูกต้อง
profession | อาชีพ | Policing is a noble profession. | ตำรวจเป็นอาชีพที่มีเกียรติ
range | ช่วง/ระยะ | The price range is wide. | ช่วงราคากว้าง
region | ภูมิภาค | The northern region is cold. | ภาคเหนือหนาว
resource | ทรัพยากร | We have limited resources. | เรามีทรัพยากรจำกัด
`);
U('daily', 5, 'ศัพท์ออกสอบ: กริยา 14', `
mislead | ทำให้เข้าใจผิด | Don't mislead the public. | อย่าทำให้ประชาชนเข้าใจผิด
oppose | คัดค้าน | Many people opposed the plan. | หลายคนคัดค้านแผนนี้
organize | จัด/จัดระเบียบ | They organized a rally. | พวกเขาจัดการชุมนุม
perform | ปฏิบัติ/แสดง | Officers perform their duty. | เจ้าหน้าที่ปฏิบัติหน้าที่
predict | ทำนาย | Nobody can predict the future. | ไม่มีใครทำนายอนาคตได้
produce | ผลิต | Thailand produces rice. | ประเทศไทยผลิตข้าว
---
promote | เลื่อนตำแหน่ง/ส่งเสริม | She was promoted to sergeant. | เธอได้เลื่อนยศเป็นจ่า
punish | ลงโทษ | Criminals must be punished. | อาชญากรต้องถูกลงโทษ
qualify | มีคุณสมบัติ | You qualify for the job. | คุณมีคุณสมบัติสำหรับงานนี้
quote | อ้างอิง/เสนอราคา | Can you quote a price? | คุณเสนอราคาได้ไหม
react | ตอบสนอง | How did he react? | เขามีปฏิกิริยาอย่างไร
refer | อ้างถึง/ส่งต่อ | The case was referred to court. | คดีถูกส่งต่อไปยังศาล
`);
U('daily', 5, 'ศัพท์ออกสอบ: กริยา 15', `
reflect | สะท้อน | The results reflect your effort. | ผลลัพธ์สะท้อนความพยายามของคุณ
regard | ถือว่า/คำนึง | He is regarded as a hero. | เขาได้รับการยกย่องเป็นวีรบุรุษ
register | ลงทะเบียน | Register your vehicle. | จดทะเบียนรถของคุณ
regret | เสียใจ | I regret my decision. | ฉันเสียใจกับการตัดสินใจ
rely | พึ่งพา | You can rely on me. | คุณพึ่งพาฉันได้
remark | กล่าว/ข้อสังเกต | He made a rude remark. | เขาพูดจาหยาบคาย
---
represent | เป็นตัวแทน | She represents the police. | เธอเป็นตัวแทนของตำรวจ
reserve | จอง/สำรอง | I reserved a table. | ฉันจองโต๊ะไว้
resist | ต่อต้าน/ขัดขืน | Don't resist arrest. | อย่าขัดขืนการจับกุม
resolve | แก้ไข/ยุติ | We resolved the problem. | เราแก้ปัญหาได้แล้ว
reward | รางวัล/ให้รางวัล | There is a reward for information. | มีรางวัลนำจับสำหรับผู้ให้ข้อมูล
ruin | ทำลาย/ทำให้พัง | The rain ruined our trip. | ฝนทำให้ทริปเราพัง
`);
U('daily', 6, 'ศัพท์ออกสอบ: คุณศัพท์ขั้นสูง', `
abstract | นามธรรม | Justice is an abstract idea. | ความยุติธรรมเป็นแนวคิดนามธรรม
sophisticated | ซับซ้อน/ล้ำสมัย | It was a sophisticated scam. | เป็นการหลอกลวงที่ซับซ้อน
approximately | ประมาณ | It takes approximately two hours. | ใช้เวลาประมาณสองชั่วโมง
specific | เฉพาะเจาะจง | Be more specific. | ช่วยพูดให้เจาะจงกว่านี้
valid | ใช้ได้/มีผล | Your passport is not valid. | หนังสือเดินทางของคุณใช้ไม่ได้
tense | ตึงเครียด | The situation is tense. | สถานการณ์ตึงเครียด
---
solid | แข็ง/หนักแน่น | We have solid evidence. | เรามีหลักฐานหนักแน่น
slight | เล็กน้อย | There is a slight problem. | มีปัญหาเล็กน้อย
steady | สม่ำเสมอ/มั่นคง | Keep a steady speed. | รักษาความเร็วให้สม่ำเสมอ
stable | มั่นคง/คงที่ | His condition is stable. | อาการของเขาคงที่
suitable | เหมาะสม | Is this suitable for children? | สิ่งนี้เหมาะกับเด็กไหม
spare | สำรอง/ว่าง | Do you have a spare tire? | คุณมียางสำรองไหม
`);
U('daily', 5, 'ศัพท์ออกสอบ: กริยา 16', `
satisfy | ทำให้พอใจ | The answer didn't satisfy him. | คำตอบไม่ทำให้เขาพอใจ
seek | แสวงหา | Seek help early. | ขอความช่วยเหลือแต่เนิ่นๆ
select | เลือก | Select the correct answer. | เลือกคำตอบที่ถูกต้อง
separate | แยก | Separate the two suspects. | แยกผู้ต้องสงสัยสองคนออกจากกัน
struggle | ดิ้นรน/ต่อสู้ | He struggled to breathe. | เขาหายใจลำบาก
submit | ส่ง/ยื่น | Submit your application online. | ยื่นใบสมัครทางออนไลน์
---
succeed | ประสบความสำเร็จ | If you work hard, you will succeed. | ถ้าทำงานหนัก คุณจะประสบความสำเร็จ
suppose | สมมติ/คิดว่า | I suppose you're right. | ฉันว่าคุณพูดถูก
surround | ล้อมรอบ | Police surrounded the building. | ตำรวจล้อมอาคาร
tend | มีแนวโน้ม | Prices tend to rise. | ราคามีแนวโน้มสูงขึ้น
transport | ขนส่ง | They transported drugs by truck. | พวกเขาขนยาเสพติดด้วยรถบรรทุก
vary | แตกต่างกันไป | Prices vary by season. | ราคาแตกต่างกันไปตามฤดู
`);
U('daily', 5, 'ศัพท์ออกสอบ: คำนาม 7', `
species | สายพันธุ์ | This species is endangered. | สายพันธุ์นี้ใกล้สูญพันธุ์
status | สถานะ | Check the status of your case. | ตรวจสอบสถานะคดีของคุณ
strategy | กลยุทธ์ | We need a new strategy. | เราต้องการกลยุทธ์ใหม่
sympathy | ความเห็นใจ | You have my sympathy. | ฉันเห็นใจคุณ
target | เป้าหมาย | Tourists are a common target. | นักท่องเที่ยวเป็นเป้าหมายบ่อย
wisdom | ปัญญา/ความรอบรู้ | Age brings wisdom. | อายุนำมาซึ่งปัญญา
---
rival | คู่แข่ง | The two gangs are rivals. | สองแก๊งเป็นคู่แข่งกัน
value | คุณค่า/มูลค่า | What is the value of the ring? | แหวนวงนี้มีมูลค่าเท่าไร
worth | คุ้มค่า/มีค่า | The car is worth a lot. | รถคันนี้มีมูลค่ามาก
ban | การห้าม/ห้าม | There is a ban on smoking. | มีการห้ามสูบบุหรี่
grant | ทุน/อนุญาต | She received a study grant. | เธอได้รับทุนการศึกษา
alert | แจ้งเตือน/ตื่นตัว | Stay alert on patrol. | ตื่นตัวไว้ขณะลาดตระเวน
`);

U('police', 4, 'คดีอาชญากรรมรุนแรง', `
homicide | การฆาตกรรม | The homicide unit is investigating. | หน่วยคดีฆาตกรรมกำลังสืบสวน
manslaughter | การฆ่าคนโดยไม่เจตนา | He was charged with manslaughter. | เขาถูกตั้งข้อหาฆ่าคนโดยไม่เจตนา
kidnapping | การลักพาตัว | The kidnapping happened at night. | การลักพาตัวเกิดขึ้นตอนกลางคืน
abduction | การลักพาตัว/พาตัวไป | Report any child abduction at once. | แจ้งเหตุเด็กถูกพาตัวไปทันที
ransom | ค่าไถ่ | They demanded a ransom. | พวกเขาเรียกค่าไถ่
hijack | จี้ (ยานพาหนะ) | Men hijacked a truck. | คนร้ายจี้รถบรรทุก
---
extortion | การกรรโชกทรัพย์ | He was arrested for extortion. | เขาถูกจับข้อหากรรโชกทรัพย์
blackmail | การแบล็กเมล์/ข่มขู่เอาเงิน | She was a victim of blackmail. | เธอตกเป็นเหยื่อการแบล็กเมล์
stalking | การสะกดรอยตาม/คุกคาม | Stalking is a crime. | การสะกดรอยคุกคามเป็นความผิด
mugging | การจี้ชิงทรัพย์ (บนถนน) | There was a mugging near the station. | มีการจี้ชิงทรัพย์ใกล้สถานี
looting | การปล้นสะดม | Looting followed the riot. | การปล้นสะดมเกิดขึ้นหลังจลาจล
sabotage | การก่อวินาศกรรม | The fire was sabotage. | ไฟไหม้ครั้งนี้เป็นการก่อวินาศกรรม
`);
U('police', 4, 'ตำแหน่งและบุคคลในกระบวนการยุติธรรม', `
sergeant | จ่า/สิบตำรวจ | The sergeant gave the orders. | จ่าเป็นคนสั่งการ
lieutenant | ร้อยตำรวจ | He was promoted to lieutenant. | เขาได้เลื่อนเป็นร้อยตำรวจ
inspector | สารวัตร/ผู้ตรวจ | Talk to the inspector. | คุยกับสารวัตร
commissioner | ผู้บัญชาการ | The commissioner held a press conference. | ผู้บัญชาการแถลงข่าว
superintendent | ผู้กำกับการ | The superintendent visited the station. | ผู้กำกับการมาเยี่ยมสถานี
constable | พลตำรวจ | A constable was on patrol. | พลตำรวจกำลังลาดตระเวน
---
rookie | มือใหม่ | He is a rookie officer. | เขาเป็นตำรวจมือใหม่
investigator | ผู้สืบสวน | The investigator found a clue. | ผู้สืบสวนพบเบาะแส
dispatcher | เจ้าหน้าที่สั่งการวิทยุ | The dispatcher sent two units. | เจ้าหน้าที่สั่งการส่งสองหน่วยไป
bailiff | เจ้าหน้าที่ศาล | The bailiff opened the court. | เจ้าหน้าที่ศาลเปิดการพิจารณา
magistrate | ผู้พิพากษา (ศาลแขวง) | He appeared before a magistrate. | เขาไปปรากฏตัวต่อหน้าผู้พิพากษา
juror | ลูกขุน | Each juror heard the evidence. | ลูกขุนทุกคนฟังหลักฐาน
`);
U('police', 5, 'ขั้นตอนทางคดีอาญา', `
arraignment | การนำตัวฟ้องและอ่านข้อหา | The arraignment is on Monday. | การอ่านฟ้องมีขึ้นวันจันทร์
indictment | คำฟ้อง | The indictment lists five charges. | คำฟ้องระบุห้าข้อหา
plea | คำให้การ (รับ/ปฏิเสธ) | He entered a plea of not guilty. | เขาให้การปฏิเสธ
remand | คุมขังระหว่างพิจารณา | He was remanded in custody. | เขาถูกคุมขังระหว่างพิจารณาคดี
subpoena | หมายเรียกพยาน | She received a subpoena. | เธอได้รับหมายเรียกพยาน
affidavit | คำให้การเป็นลายลักษณ์อักษรที่สาบาน | Sign the affidavit. | ลงนามในคำให้การ
---
acquittal | การยกฟ้อง/พิพากษาว่าไม่ผิด | The trial ended in acquittal. | คดีจบลงด้วยการยกฟ้อง
exonerate | พ้นผิด | DNA evidence exonerated him. | หลักฐานดีเอ็นเอทำให้เขาพ้นผิด
sentencing | การพิพากษาโทษ | Sentencing is next week. | การพิพากษาโทษมีขึ้นสัปดาห์หน้า
felony | ความผิดร้ายแรง | Robbery is a felony. | การปล้นเป็นความผิดร้ายแรง
misdemeanor | ความผิดลหุโทษ | Littering is a misdemeanor. | การทิ้งขยะเป็นความผิดลหุโทษ
allegation | ข้อกล่าวหา | He denied the allegations. | เขาปฏิเสธข้อกล่าวหา
`);
U('police', 5, 'ผู้กระทำผิดและเครือข่าย', `
perpetrator | ผู้ก่อเหตุ | The perpetrator fled the scene. | ผู้ก่อเหตุหนีจากที่เกิดเหตุ
culprit | ผู้กระทำผิด/ตัวการ | Police caught the culprit. | ตำรวจจับตัวการได้
offender | ผู้กระทำความผิด | He is a repeat offender. | เขาเป็นผู้กระทำผิดซ้ำ
felon | ผู้กระทำความผิดร้ายแรง | A felon cannot own a gun. | ผู้ต้องโทษคดีร้ายแรงมีปืนไม่ได้
inmate | ผู้ต้องขัง | Two inmates escaped. | ผู้ต้องขังสองคนหลบหนี
juvenile | เยาวชน | He was sent to a juvenile center. | เขาถูกส่งไปสถานพินิจเยาวชน
---
fraudster | นักต้มตุ๋น | The fraudster used a fake name. | นักต้มตุ๋นใช้ชื่อปลอม
thug | อันธพาล | Thugs attacked the shop. | อันธพาลบุกทำร้ายร้าน
vandal | ผู้ทำลายทรัพย์สิน | Vandals broke the windows. | คนร้ายทุบกระจกหน้าต่าง
vigilante | ผู้ลงโทษเองนอกกฎหมาย | Don't act like a vigilante. | อย่าตัดสินลงโทษเองนอกกฎหมาย
syndicate | ขบวนการ/เครือข่าย | Police broke a drug syndicate. | ตำรวจทลายขบวนการยาเสพติด
cartel | กลุ่มค้า (ยา)/แก๊งค้ายา | The cartel smuggled drugs. | แก๊งค้ายาลักลอบขนยาเสพติด
`);
U('police', 5, 'อุปกรณ์และยุทธวิธีตำรวจ', `
baton | กระบอง | The officer carried a baton. | เจ้าหน้าที่พกกระบอง
handcuff | ใส่กุญแจมือ | Handcuff the suspect. | ใส่กุญแจมือผู้ต้องสงสัย
bulletproof | กันกระสุน | Wear a bulletproof vest. | สวมเสื้อเกราะกันกระสุน
bodycam | กล้องติดตัว | The bodycam recorded everything. | กล้องติดตัวบันทึกทุกอย่าง
frisk | ตรวจค้นตัว | The officer frisked the man. | เจ้าหน้าที่ตรวจค้นตัวชายคนนั้น
apprehend | จับกุม | They apprehended the suspect. | พวกเขาจับกุมผู้ต้องสงสัย
---
manhunt | การไล่ล่าตัว | A manhunt is under way. | กำลังมีการไล่ล่าตัวคนร้าย
crackdown | การปราบปรามขั้นเด็ดขาด | There is a crackdown on drunk driving. | มีการปราบปรามเมาแล้วขับ
precinct | เขตตำรวจ/สถานีในเขต | He works in the 5th precinct. | เขาทำงานที่สถานีเขต 5
mugshot | ภาพถ่ายผู้ต้องหา | Police released his mugshot. | ตำรวจเผยแพร่ภาพผู้ต้องหา
ballistics | การตรวจพิสูจน์อาวุธปืน | Ballistics matched the gun. | ผลตรวจพิสูจน์ปืนตรงกัน
gunshot | เสียงปืน/บาดแผลกระสุน | Neighbors heard a gunshot. | เพื่อนบ้านได้ยินเสียงปืน
`);
U('police', 6, 'ความผิดเฉพาะทาง', `
larceny | การลักทรัพย์ | He was charged with larceny. | เขาถูกตั้งข้อหาลักทรัพย์
swindle | ฉ้อโกง | They swindled old people. | พวกเขาฉ้อโกงผู้สูงอายุ
racketeering | การประกอบธุรกิจผิดกฎหมายเป็นขบวนการ | The gang faced racketeering charges. | แก๊งถูกตั้งข้อหาประกอบกิจการผิดกฎหมาย
contraband | ของเถื่อน | Customs seized contraband. | ศุลกากรยึดของเถื่อน
bootleg | ของปลอม/ของเถื่อน | They sold bootleg DVDs. | พวกเขาขายดีวีดีเถื่อน
poaching | การลักลอบล่าสัตว์ | Poaching threatens wildlife. | การลักลอบล่าสัตว์คุกคามสัตว์ป่า
---
loitering | การเตร็ดเตร่ | No loitering here. | ห้ามเตร็ดเตร่บริเวณนี้
truancy | การหนีเรียน | Truancy can lead to crime. | การหนีเรียนอาจนำไปสู่อาชญากรรม
graffiti | การพ่นสีกำแพง | Graffiti covered the wall. | กำแพงเต็มไปด้วยภาพพ่นสี
narcotics | ยาเสพติด | He works in the narcotics unit. | เขาทำงานในหน่วยปราบยาเสพติด
deportation | การเนรเทศ | He faces deportation. | เขาอาจถูกเนรเทศ
evict | ขับไล่ (ผู้เช่า) | The landlord evicted the tenant. | เจ้าของบ้านไล่ผู้เช่าออก
`);
U('police', 6, 'หลักกฎหมายอาญาขั้นสูง', `
premeditated | ไตร่ตรองไว้ก่อน | It was a premeditated murder. | เป็นการฆาตกรรมโดยไตร่ตรองไว้ก่อน
accessory | ผู้สนับสนุนการกระทำผิด | She was an accessory to the crime. | เธอเป็นผู้สนับสนุนการกระทำผิด
abet | สนับสนุน (การกระทำผิด) | He aided and abetted the thief. | เขาช่วยเหลือและสนับสนุนขโมย
entrapment | การล่อให้กระทำผิด | The defense claimed entrapment. | ฝ่ายจำเลยอ้างว่าถูกล่อให้กระทำผิด
duress | การถูกบังคับข่มขู่ | He signed under duress. | เขาลงนามโดยถูกข่มขู่
deterrent | สิ่งยับยั้ง | Cameras are a good deterrent. | กล้องเป็นเครื่องยับยั้งที่ดี
---
recidivism | การกระทำผิดซ้ำ | Education reduces recidivism. | การศึกษาช่วยลดการกระทำผิดซ้ำ
coroner | เจ้าพนักงานชันสูตรศพ | The coroner examined the body. | เจ้าพนักงานชันสูตรตรวจศพ
inquest | การไต่สวนการตาย | An inquest will be held. | จะมีการไต่สวนการตาย
adjudicate | ตัดสินชี้ขาด | The court will adjudicate the case. | ศาลจะตัดสินชี้ขาดคดี
enforcement | การบังคับใช้ | Law enforcement must be fair. | การบังคับใช้กฎหมายต้องยุติธรรม
hearsay | คำบอกเล่า (ได้ยินมา) | Hearsay is weak evidence. | คำบอกเล่าเป็นหลักฐานที่อ่อน
`);
U('talk', 3, 'กริยาวลีที่ใช้บ่อย 1', `
back up | สนับสนุน/สำรองข้อมูล | Back up your files. | สำรองไฟล์ของคุณ
break up | เลิกกัน/สลาย | Police broke up the fight. | ตำรวจสลายการทะเลาะวิวาท
call off | ยกเลิก | They called off the meeting. | พวกเขายกเลิกการประชุม
carry on | ทำต่อไป | Carry on with your work. | ทำงานของคุณต่อไป
check out | ลองดู/เช็กเอาต์ | Check out this new app. | ลองดูแอปใหม่นี้
count on | พึ่งพา/ไว้ใจ | You can count on me. | คุณไว้ใจฉันได้
---
cut off | ตัดขาด | The flood cut off the village. | น้ำท่วมตัดขาดหมู่บ้าน
drop off | ไปส่ง | I'll drop you off at the station. | ฉันจะไปส่งคุณที่สถานี
fill out | กรอก (แบบฟอร์ม) | Fill out this form, please. | กรุณากรอกแบบฟอร์มนี้
get back | กลับมา/ได้คืน | When did you get back? | คุณกลับมาเมื่อไร
give away | แจกฟรี/เผยความลับ | They gave away free water. | พวกเขาแจกน้ำฟรี
go on | ดำเนินต่อ/เกิดขึ้น | What's going on here? | เกิดอะไรขึ้นที่นี่
`);
U('talk', 3, 'กริยาวลีที่ใช้บ่อย 2', `
grow up | เติบโต | I grew up in Khon Kaen. | ฉันโตที่ขอนแก่น
hang on | รอสักครู่/จับไว้ | Hang on, I'll check. | รอเดี๋ยว ฉันจะเช็กให้
keep up | ตามให้ทัน/ทำต่อไป | Keep up the good work. | ทำดีแบบนี้ต่อไป
look out | ระวัง | Look out! A car is coming. | ระวัง! มีรถมา
look up | ค้นหา (ข้อมูล) | Look up the word in a dictionary. | ค้นคำในพจนานุกรม
move on | ไปต่อ/ก้าวผ่าน | It's time to move on. | ถึงเวลาก้าวต่อไปแล้ว
---
pass away | เสียชีวิต | His father passed away last year. | พ่อของเขาเสียชีวิตเมื่อปีที่แล้ว
put away | เก็บเข้าที่ | Put away your phone. | เก็บโทรศัพท์ของคุณ
sign up | สมัคร | Sign up for the course. | สมัครเรียนคอร์สนี้
throw away | ทิ้ง | Don't throw away the receipt. | อย่าทิ้งใบเสร็จ
warm up | อบอุ่นร่างกาย/อุ่น | Warm up before running. | วอร์มร่างกายก่อนวิ่ง
write down | จดไว้ | Write down the plate number. | จดเลขทะเบียนไว้
`);
U('talk', 4, 'กริยาวลีที่ใช้บ่อย 3', `
break out | ปะทุ/เกิดขึ้นกะทันหัน | A fire broke out last night. | เกิดไฟไหม้เมื่อคืน
cut down on | ลดการ… | Cut down on sugar. | ลดการกินน้ำตาล
fall apart | พังทลาย | My old shoes are falling apart. | รองเท้าเก่าของฉันกำลังจะพัง
fall behind | ตามไม่ทัน/ล้าหลัง | Don't fall behind in class. | อย่าเรียนตามเพื่อนไม่ทัน
get away | หนีไป | The thief got away. | ขโมยหนีไปได้
get by | พอเอาตัวรอด | I can get by in English. | ฉันพอใช้ภาษาอังกฤษเอาตัวรอดได้
---
get over | หายจาก/ทำใจได้ | She got over her cold. | เธอหายหวัดแล้ว
get rid of | กำจัด | Get rid of old files. | ลบไฟล์เก่าทิ้ง
give in | ยอมแพ้/ยอมตาม | Don't give in to pressure. | อย่ายอมแพ้ต่อแรงกดดัน
go over | ตรวจทาน/ทบทวน | Let's go over the plan. | มาทบทวนแผนกัน
kick off | เริ่มต้น | The match kicks off at seven. | การแข่งขันเริ่มตอนหนึ่งทุ่ม
knock out | ทำให้สลบ/น็อก | He was knocked out in the fight. | เขาถูกต่อยสลบในการต่อสู้
`);
U('talk', 4, 'กริยาวลีที่ใช้บ่อย 4', `
lay off | เลิกจ้าง | The factory laid off 100 workers. | โรงงานเลิกจ้างคนงาน 100 คน
leave out | ตัดออก/ไม่รวม | Don't leave out any details. | อย่าตัดรายละเอียดใดออก
let down | ทำให้ผิดหวัง | I won't let you down. | ฉันจะไม่ทำให้คุณผิดหวัง
look forward to | ตั้งตารอ | I look forward to meeting you. | ฉันตั้งตารอที่จะได้พบคุณ
look up to | นับถือ | I look up to my father. | ฉันนับถือพ่อ
look down on | ดูถูก | Don't look down on others. | อย่าดูถูกคนอื่น
---
make out | มองออก/เข้าใจ | I can't make out his face. | ฉันมองหน้าเขาไม่ออก
mix up | สับสน/ปนกัน | I mixed up the two names. | ฉันจำชื่อสองชื่อสลับกัน
pass out | เป็นลม | She passed out in the heat. | เธอเป็นลมเพราะความร้อน
pay back | ใช้คืน | I'll pay you back tomorrow. | ฉันจะคืนเงินพรุ่งนี้
put out | ดับ (ไฟ) | Firefighters put out the fire. | นักดับเพลิงดับไฟ
run into | บังเอิญเจอ/ชน | I ran into an old friend. | ฉันบังเอิญเจอเพื่อนเก่า
`);
U('talk', 4, 'กริยาวลีที่ใช้บ่อย 5', `
set off | ออกเดินทาง/ทำให้ดัง | The smoke set off the alarm. | ควันทำให้สัญญาณเตือนดัง
settle down | สงบลง/ลงหลักปักฐาน | Please settle down, everyone. | ทุกคนสงบลงหน่อย
show off | อวด | He likes to show off his car. | เขาชอบอวดรถ
shut down | ปิดตัว/ปิดเครื่อง | Police shut down the illegal casino. | ตำรวจสั่งปิดบ่อนเถื่อน
sort out | จัดการให้เรียบร้อย | We'll sort out the problem. | เราจะจัดการปัญหาให้เรียบร้อย
stand by | เตรียมพร้อม/สนับสนุน | Stand by for orders. | เตรียมพร้อมรอคำสั่ง
---
stand out | โดดเด่น | Her answer stood out. | คำตอบของเธอโดดเด่น
stand up for | ปกป้อง/ยืนหยัดเพื่อ | Stand up for what is right. | ยืนหยัดในสิ่งที่ถูกต้อง
take after | หน้าตา/นิสัยเหมือน (พ่อแม่) | He takes after his father. | เขาเหมือนพ่อ
take on | รับ (งาน/ความรับผิดชอบ) | She took on more work. | เธอรับงานเพิ่ม
take up | เริ่ม (งานอดิเรก)/ใช้ (เวลา) | I took up running. | ฉันเริ่มวิ่ง
turn up | ปรากฏตัว/เพิ่มเสียง | He didn't turn up for work. | เขาไม่มาทำงาน
`);
U('talk', 5, 'กริยาวลีที่ใช้บ่อย 6', `
put up with | ทน | I can't put up with the noise. | ฉันทนเสียงดังไม่ได้
tear down | รื้อถอน | They tore down the old building. | พวกเขารื้อตึกเก่า
wear out | สึกหรอ/เหนื่อยล้า | The tires are worn out. | ยางสึกหมดแล้ว
work out | ออกกำลังกาย/คิดออก | I work out at the gym. | ฉันออกกำลังกายที่ยิม
back down | ยอมถอย | He refused to back down. | เขาไม่ยอมถอย
blow up | ระเบิด/โมโห | The car blew up. | รถระเบิด
---
bring about | ทำให้เกิด | Technology brought about change. | เทคโนโลยีทำให้เกิดการเปลี่ยนแปลง
cheer on | เชียร์ | Fans cheered on the team. | แฟนๆ เชียร์ทีม
come forward | ออกมาแจ้ง/ให้ข้อมูล | Witnesses should come forward. | พยานควรออกมาให้ข้อมูล
cover up | ปกปิด | They tried to cover up the crime. | พวกเขาพยายามปกปิดอาชญากรรม
drop out | ลาออกกลางคัน | He dropped out of school. | เขาลาออกจากโรงเรียนกลางคัน
hold back | กลั้น/ยับยั้ง | She held back her tears. | เธอกลั้นน้ำตา
`);
U('talk', 5, 'กริยาวลีที่ใช้บ่อย 7', `
crack down on | ปราบปราม | Police are cracking down on gambling. | ตำรวจกำลังปราบปรามการพนัน
get away with | ทำผิดแล้วรอดตัว | He won't get away with it. | เขาจะไม่รอดตัวไปได้
lock up | ขัง/ล็อกให้เรียบร้อย | They locked up the thief. | พวกเขาขังขโมยไว้
own up | ยอมรับ (ความผิด) | He owned up to his mistake. | เขายอมรับความผิดพลาด
turn in | มอบตัว/ส่ง (งาน) | The suspect turned himself in. | ผู้ต้องสงสัยเข้ามอบตัว
track down | ตามหาจนเจอ | Police tracked down the car. | ตำรวจตามหารถจนเจอ
---
rule out | ตัดออก (ความเป็นไปได้) | We can't rule out murder. | เรายังตัดความเป็นไปได้ว่าเป็นฆาตกรรมไม่ได้
step in | เข้ามาช่วย/แทรกแซง | The officer stepped in to stop the fight. | เจ้าหน้าที่เข้าไปห้ามการต่อสู้
take down | จดบันทึก/รื้อลง | Take down his statement. | จดคำให้การของเขาไว้
tip off | แจ้งเบาะแส | Someone tipped off the police. | มีคนแจ้งเบาะแสตำรวจ
weigh up | ชั่งน้ำหนัก (ข้อดีข้อเสีย) | Weigh up the risks. | ชั่งน้ำหนักความเสี่ยง
wipe out | กวาดล้าง/ทำลายหมด | The flood wiped out the crops. | น้ำท่วมทำลายพืชผลหมด
`);

U('daily', 1, 'คำคู่ตรงข้าม 1', `
rich | รวย | He is very rich. | เขารวยมาก
poor | จน/แย่ | They are poor but happy. | พวกเขาจนแต่มีความสุข
strong | แข็งแรง | Police officers must be strong. | ตำรวจต้องแข็งแรง
weak | อ่อนแอ | I feel weak today. | วันนี้ฉันรู้สึกอ่อนแรง
deep | ลึก | The river is deep. | แม่น้ำลึก
shallow | ตื้น | Swim in the shallow water. | ว่ายในน้ำตื้น
---
soft | นุ่ม/เบา | The bed is soft. | เตียงนุ่ม
sharp | คม | Be careful, the knife is sharp. | ระวัง มีดคม
smooth | เรียบ/ลื่น | The road is smooth. | ถนนเรียบ
tidy | เรียบร้อย | Keep your room tidy. | จัดห้องให้เรียบร้อย
modern | ทันสมัย | Bangkok is a modern city. | กรุงเทพฯ เป็นเมืองทันสมัย
dangerous | อันตราย | Drunk driving is dangerous. | เมาแล้วขับอันตราย
`);
U('daily', 2, 'คุณศัพท์ -ed กับ -ing 1', `
interested | สนใจ (คนรู้สึก) | I'm interested in English. | ฉันสนใจภาษาอังกฤษ
interesting | น่าสนใจ (สิ่งนั้น) | This movie is interesting. | หนังเรื่องนี้น่าสนใจ
boring | น่าเบื่อ (สิ่งนั้น) | The lesson was boring. | บทเรียนน่าเบื่อ
tiring | น่าเหนื่อย (สิ่งนั้น) | The night shift is tiring. | กะดึกเหนื่อยมาก
amazed | ทึ่ง (คนรู้สึก) | I was amazed by the view. | ฉันทึ่งกับวิว
amazing | น่าทึ่ง (สิ่งนั้น) | The view is amazing. | วิวน่าทึ่งมาก
---
shocked | ตกใจ (คนรู้สึก) | We were shocked by the news. | เราตกใจกับข่าวนั้น
shocking | น่าตกใจ (สิ่งนั้น) | The news was shocking. | ข่าวนั้นน่าตกใจ
frightened | กลัว (คนรู้สึก) | The child was frightened. | เด็กกลัว
frightening | น่ากลัว (สิ่งนั้น) | It was a frightening night. | เป็นคืนที่น่ากลัว
confusing | น่าสับสน (สิ่งนั้น) | The map is confusing. | แผนที่ดูสับสน
exciting | น่าตื่นเต้น (สิ่งนั้น) | The game was exciting. | เกมนั้นน่าตื่นเต้น
`);
U('daily', 3, 'คุณศัพท์ -ed กับ -ing 2', `
satisfied | พอใจ (คนรู้สึก) | Are you satisfied with the service? | คุณพอใจกับบริการไหม
satisfying | น่าพอใจ (สิ่งนั้น) | It was a satisfying meal. | เป็นมื้ออาหารที่น่าพอใจ
annoyed | รำคาญ (คนรู้สึก) | I'm annoyed with my neighbor. | ฉันรำคาญเพื่อนบ้าน
annoying | น่ารำคาญ (สิ่งนั้น) | That noise is annoying. | เสียงนั้นน่ารำคาญ
relaxed | ผ่อนคลาย (คนรู้สึก) | I feel relaxed at the beach. | ฉันรู้สึกผ่อนคลายที่ชายหาด
relaxing | ทำให้ผ่อนคลาย (สิ่งนั้น) | The music is relaxing. | เพลงนี้ฟังสบาย
---
terrified | หวาดกลัวมาก (คนรู้สึก) | She was terrified of the dark. | เธอกลัวความมืดมาก
terrifying | น่าหวาดกลัว (สิ่งนั้น) | The storm was terrifying. | พายุน่ากลัวมาก
fascinated | หลงใหล/ทึ่ง (คนรู้สึก) | He is fascinated by history. | เขาหลงใหลประวัติศาสตร์
fascinating | น่าหลงใหล (สิ่งนั้น) | Space is fascinating. | อวกาศน่าทึ่งมาก
embarrassing | น่าอาย (สิ่งนั้น) | It was an embarrassing mistake. | เป็นความผิดพลาดที่น่าอาย
surprising | น่าประหลาดใจ (สิ่งนั้น) | The result was surprising. | ผลลัพธ์น่าประหลาดใจ
`);
U('daily', 2, 'คำที่สับสนบ่อย 1', `
tell | บอก (tell + คน) | Tell me the truth. | บอกความจริงกับฉัน
rob | ปล้น (rob + คน/สถานที่) | They robbed a bank. | พวกเขาปล้นธนาคาร
raise | ยก (ต้องมีกรรม) | Raise your hand. | ยกมือขึ้น
rise | ขึ้น (ไม่มีกรรม) | Prices rise every year. | ราคาขึ้นทุกปี
lay | วาง (ต้องมีกรรม) | Lay the baby on the bed. | วางทารกบนเตียง
quite | ค่อนข้าง (ต่างจาก quiet = เงียบ) | The test was quite easy. | ข้อสอบค่อนข้างง่าย
---
whether | ว่า…หรือไม่ (ต่างจาก weather) | I don't know whether he is home. | ฉันไม่รู้ว่าเขาอยู่บ้านหรือเปล่า
fun | สนุก (ความสนุก) | The party was fun. | งานปาร์ตี้สนุก
funny | ตลก | He is a funny man. | เขาเป็นคนตลก
trip | ทริป/การเดินทางสั้นๆ | We took a trip to Phuket. | เราไปเที่ยวภูเก็ต
fewer | น้อยกว่า (นับได้) | There are fewer accidents this year. | ปีนี้อุบัติเหตุน้อยลง
less | น้อยกว่า (นับไม่ได้) | Drink less coffee. | ดื่มกาแฟให้น้อยลง
`);
U('daily', 3, 'คำที่สับสนบ่อย 2', `
effect | ผล (คำนาม) | The medicine had no effect. | ยาไม่ได้ผล
except | ยกเว้น (ต่างจาก accept) | Everyone came except Tom. | ทุกคนมายกเว้นทอม
loose | หลวม (ต่างจาก lose) | These pants are loose. | กางเกงตัวนี้หลวม
desert | ทะเลทราย/ทิ้ง (ต่างจาก dessert) | The Sahara is a desert. | ซาฮาราเป็นทะเลทราย
besides | นอกจากนี้ | Besides English, he speaks Chinese. | นอกจากภาษาอังกฤษ เขายังพูดจีนได้
beside | ข้างๆ | Sit beside me. | นั่งข้างฉัน
---
among | ท่ามกลาง (3 ขึ้นไป) | He hid among the crowd. | เขาซ่อนตัวอยู่ในฝูงชน
farther | ไกลกว่า (ระยะทาง) | The station is farther than the bank. | สถานีอยู่ไกลกว่าธนาคาร
further | เพิ่มเติม/ต่อไป | For further information, call us. | สอบถามข้อมูลเพิ่มเติมโทรหาเรา
latter | อย่างหลัง | Of tea and coffee, I prefer the latter. | ระหว่างชากับกาแฟ ฉันชอบอย่างหลัง
economic | เกี่ยวกับเศรษฐกิจ | There is an economic crisis. | มีวิกฤตเศรษฐกิจ
economical | ประหยัด | This car is economical. | รถคันนี้ประหยัด
`);
U('daily', 4, 'คำที่สับสนบ่อย 3', `
principal | ครูใหญ่/หลัก | The principal spoke to the students. | ครูใหญ่พูดกับนักเรียน
altogether | โดยสิ้นเชิง/ทั้งหมด (ต่างจาก all together) | The plan failed altogether. | แผนล้มเหลวโดยสิ้นเชิง
stationary | อยู่กับที่ | The car was stationary. | รถจอดนิ่งอยู่กับที่
stationery | เครื่องเขียน | Buy stationery at the shop. | ซื้อเครื่องเขียนที่ร้าน
complement | ส่วนเติมเต็ม/เข้ากัน | The wine complements the food. | ไวน์เข้ากับอาหาร
compliment | คำชม | Thank you for the compliment. | ขอบคุณสำหรับคำชม
---
emigrate | ย้ายออกไปอยู่ต่างประเทศ | They emigrated to Australia. | พวกเขาย้ายไปอยู่ออสเตรเลีย
immigrate | ย้ายเข้ามาอยู่ (ประเทศนี้) | Many people immigrate to Thailand. | หลายคนย้ายมาอยู่ไทย
historic | สำคัญทางประวัติศาสตร์ | It was a historic day. | เป็นวันสำคัญทางประวัติศาสตร์
historical | เกี่ยวกับประวัติศาสตร์ | I like historical movies. | ฉันชอบหนังอิงประวัติศาสตร์
council | สภา/คณะกรรมการ | The city council met today. | สภาเมืองประชุมวันนี้
counsel | คำปรึกษา/ทนาย | He sought legal counsel. | เขาปรึกษาทนาย
`);
U('daily', 4, 'คำที่สับสนบ่อย 4', `
personal | ส่วนตัว | This is my personal phone. | นี่คือโทรศัพท์ส่วนตัวของฉัน
personnel | บุคลากร | Only authorized personnel may enter. | เฉพาะเจ้าหน้าที่ที่ได้รับอนุญาตเท่านั้น
insure | ทำประกัน | Insure your car. | ทำประกันรถของคุณ
maximum | สูงสุด | The maximum speed is 90. | ความเร็วสูงสุดคือ 90
minimum | ต่ำสุด | The minimum age is 18. | อายุขั้นต่ำคือ 18 ปี
majority | ส่วนใหญ่ | The majority voted yes. | เสียงส่วนใหญ่โหวตเห็นด้วย
---
minority | ส่วนน้อย | Protect minority groups. | ปกป้องกลุ่มคนส่วนน้อย
temporary | ชั่วคราว | This is a temporary job. | นี่เป็นงานชั่วคราว
visible | มองเห็นได้ | The sign is clearly visible. | ป้ายมองเห็นได้ชัด
invisible | มองไม่เห็น | The gas is invisible. | ก๊าซนั้นมองไม่เห็น
victory | ชัยชนะ | It was a great victory. | เป็นชัยชนะที่ยิ่งใหญ่
ally | พันธมิตร | Thailand is a close ally. | ไทยเป็นพันธมิตรใกล้ชิด
`);
U('daily', 3, 'คำตรงข้ามด้วยคำเติมหน้า', `
dishonest | ไม่ซื่อสัตย์ | He is a dishonest man. | เขาเป็นคนไม่ซื่อสัตย์
impatient | ใจร้อน | Don't be impatient. | อย่าใจร้อน
impossible | เป็นไปไม่ได้ | Nothing is impossible. | ไม่มีอะไรเป็นไปไม่ได้
irresponsible | ไม่รับผิดชอบ | That was irresponsible driving. | นั่นเป็นการขับรถที่ไม่รับผิดชอบ
unlikely | ไม่น่าจะเป็นไปได้ | It's unlikely to rain. | ไม่น่าจะมีฝนตก
brave | กล้าหาญ | The brave officer saved the child. | ตำรวจผู้กล้าช่วยเด็กไว้
---
cowardly | ขี้ขลาด | It was a cowardly attack. | เป็นการโจมตีที่ขี้ขลาด
honest | ซื่อสัตย์ | Be honest with me. | ซื่อสัตย์กับฉัน
blunt | ทื่อ/พูดตรงเกินไป | The knife is blunt. | มีดทื่อ
worrying | น่ากังวล | The crime rate is worrying. | อัตราอาชญากรรมน่ากังวล
exhausting | เหนื่อยมาก (สิ่งนั้น) | The training was exhausting. | การฝึกเหนื่อยมาก
thrilling | น่าตื่นเต้นมาก | It was a thrilling chase. | เป็นการไล่ล่าที่ตื่นเต้นมาก
`);

U('daily', 1, 'เกม: เมนูและการตั้งค่า', `
level | ด่าน/ระดับ | I finished level five. | ฉันผ่านด่านห้าแล้ว
load | โหลด (เกมที่เซฟไว้) | Load your last save. | โหลดเซฟล่าสุด
quit | ออก/เลิก | Are you sure you want to quit? | แน่ใจว่าจะออกไหม
volume | ระดับเสียง | Turn down the volume. | ลดเสียงลง
language | ภาษา | Change the language to English. | เปลี่ยนภาษาเป็นอังกฤษ
controller | จอยเกม | Connect your controller. | เชื่อมต่อจอยของคุณ
---
keyboard | คีย์บอร์ด | Press any key on the keyboard. | กดปุ่มใดก็ได้บนคีย์บอร์ด
mouse | เมาส์/หนู | Click with the left mouse button. | คลิกเมาส์ซ้าย
subtitles | คำบรรยาย (ซับ) | Turn on English subtitles. | เปิดซับภาษาอังกฤษ
graphics | กราฟิก | The graphics are amazing. | กราฟิกสวยมาก
brightness | ความสว่าง | Adjust the brightness. | ปรับความสว่าง
resolution | ความละเอียด (จอ) | Set the resolution to 1080p. | ตั้งความละเอียดเป็น 1080p
`);
U('daily', 2, 'เกม: ตัวละครและสถานะ', `
health | พลังชีวิต/สุขภาพ | Your health is low. | พลังชีวิตของคุณเหลือน้อย
stamina | ความอึด/พลังกาย | Running uses stamina. | การวิ่งใช้พลังกาย
mana | พลังเวท (มานา) | You need more mana. | คุณต้องการมานาเพิ่ม
armor | เกราะ | Buy better armor. | ซื้อเกราะที่ดีกว่านี้
shield | โล่ | Raise your shield. | ยกโล่ขึ้น
potion | ยา (ในเกม) | Drink a health potion. | ดื่มยาเพิ่มเลือด
---
avatar | ตัวละครแทนตัว/รูปโปรไฟล์ | Choose your avatar. | เลือกตัวละครของคุณ
customize | ปรับแต่ง | Customize your character. | ปรับแต่งตัวละครของคุณ
gear | อุปกรณ์/ไอเทมสวมใส่ | Upgrade your gear. | อัปเกรดอุปกรณ์ของคุณ
equip | สวมใส่ (อุปกรณ์) | Equip the new sword. | สวมดาบเล่มใหม่
slot | ช่อง (เก็บของ/เซฟ) | Choose a save slot. | เลือกช่องเซฟ
upgrade | อัปเกรด | Upgrade your weapon. | อัปเกรดอาวุธของคุณ
`);
U('daily', 2, 'เกม: การเล่นและการควบคุม', `
jump | กระโดด | Press A to jump. | กด A เพื่อกระโดด
dodge | หลบ | Dodge the attack! | หลบการโจมตี!
aim | เล็ง/เป้าหมาย | Aim for the head. | เล็งที่หัว
reload | บรรจุกระสุนใหม่ | Reload your gun. | บรรจุกระสุนใหม่
ammo | กระสุน | I'm out of ammo. | กระสุนฉันหมดแล้ว
sprint | วิ่งเร็ว | Hold Shift to sprint. | กด Shift ค้างไว้เพื่อวิ่งเร็ว
---
crouch | ย่อตัว | Crouch behind the wall. | ย่อตัวหลังกำแพง
respawn | เกิดใหม่ (ในเกม) | You will respawn in five seconds. | คุณจะเกิดใหม่ในห้าวินาที
revive | ชุบชีวิต/ช่วยให้ฟื้น | Revive your teammate. | ช่วยชุบเพื่อนร่วมทีม
spawn | เกิด (ศัตรู/ไอเทมปรากฏ) | Enemies spawn here. | ศัตรูเกิดตรงนี้
cooldown | เวลาคูลดาวน์ | The skill has a long cooldown. | สกิลนี้คูลดาวน์นาน
stealth | การลอบเร้น | Use stealth to pass the guards. | ลอบผ่านยามไป
`);
U('daily', 3, 'เกม: ภารกิจและเนื้อเรื่อง', `
quest | ภารกิจ (เควส) | Accept the quest. | รับเควส
side quest | ภารกิจรอง | This side quest gives good loot. | เควสรองนี้ได้ของดี
main quest | ภารกิจหลัก | Follow the main quest. | ทำภารกิจหลักต่อ
tutorial | บทสอนเล่น | Skip the tutorial. | ข้ามบทสอนเล่น
cutscene | ฉากคัตซีน | Watch the cutscene. | ดูฉากคัตซีน
dialogue | บทสนทนา | Choose a dialogue option. | เลือกตัวเลือกบทสนทนา
---
ending | ตอนจบ | This game has three endings. | เกมนี้มีสามฉากจบ
hint | คำใบ้ | Need a hint? | ต้องการคำใบ้ไหม
puzzle | ปริศนา | Solve the puzzle to open the door. | ไขปริศนาเพื่อเปิดประตู
unlock | ปลดล็อก | You unlocked a new map. | คุณปลดล็อกแผนที่ใหม่
loot | ของที่เก็บได้ (ไอเทม) | Collect the loot. | เก็บไอเทม
craft | สร้าง/คราฟต์ | Craft a new sword. | คราฟต์ดาบเล่มใหม่
`);
U('daily', 3, 'เกม: ออนไลน์และทีม', `
multiplayer | โหมดหลายผู้เล่น | Let's play multiplayer. | มาเล่นโหมดหลายคนกัน
co-op | เล่นร่วมกัน (ร่วมทีม) | This game has co-op mode. | เกมนี้มีโหมดเล่นร่วมกัน
lobby | ห้องรอ (ล็อบบี้) | Wait in the lobby. | รอในล็อบบี้
matchmaking | การหาคู่แข่ง/จับคู่ | Matchmaking takes a minute. | การจับคู่ใช้เวลาหนึ่งนาที
lag | อาการแลค/หน่วง | The game is lagging. | เกมแลค
ping | ค่าปิง (ความหน่วงเน็ต) | My ping is too high. | ปิงของฉันสูงเกินไป
---
teammate | เพื่อนร่วมทีม | Help your teammate. | ช่วยเพื่อนร่วมทีม
opponent | คู่ต่อสู้ | Your opponent is strong. | คู่ต่อสู้ของคุณเก่ง
guild | กิลด์ | Join a guild. | เข้ากิลด์
clan | แคลน/กลุ่ม | Our clan won the war. | แคลนของเราชนะสงคราม
ranked | โหมดจัดอันดับ | I only play ranked. | ฉันเล่นแต่โหมดแรงก์
leaderboard | ตารางอันดับ | You are top of the leaderboard. | คุณอยู่อันดับหนึ่งในตาราง
`);
U('daily', 4, 'เกม: อัปเดตและแนวเกม', `
patch | แพตช์ (การอัปเดตแก้ไข) | The new patch fixed the bug. | แพตช์ใหม่แก้บั๊กแล้ว
bug | บั๊ก/แมลง | I found a bug. | ฉันเจอบั๊ก
glitch | ความผิดพลาดชั่วคราว | A glitch froze the game. | เกมค้างเพราะความผิดพลาด
buff | ทำให้เก่งขึ้น (บัฟ) | They buffed my favorite hero. | พวกเขาบัฟฮีโร่ที่ฉันชอบ
nerf | ทำให้อ่อนลง (เนิร์ฟ) | The sword was nerfed. | ดาบถูกเนิร์ฟ
difficulty | ระดับความยาก | Choose a difficulty: easy, normal or hard. | เลือกความยาก ง่าย ปกติ หรือยาก
---
coins | เหรียญ | Collect 100 coins. | เก็บเหรียญ 100 เหรียญ
gems | อัญมณี (เงินในเกม) | Spend gems to buy skins. | ใช้เพชรซื้อสกิน
survival | การเอาชีวิตรอด | I love survival games. | ฉันชอบเกมเอาชีวิตรอด
shooter | เกมยิง | It's a first-person shooter. | เป็นเกมยิงมุมมองบุคคลที่หนึ่ง
racing | การแข่งรถ | Let's play a racing game. | มาเล่นเกมแข่งรถกัน
simulator | เกมจำลอง | He plays a farming simulator. | เขาเล่นเกมจำลองการทำฟาร์ม
`);
U('daily', 2, 'หนังและซีรีส์: พื้นฐาน', `
episode | ตอน | I watched three episodes. | ฉันดูไปสามตอน
series | ซีรีส์ | This series has two seasons. | ซีรีส์นี้มีสองซีซั่น
actor | นักแสดงชาย | He is my favorite actor. | เขาเป็นนักแสดงที่ฉันชอบ
actress | นักแสดงหญิง | She is a famous actress. | เธอเป็นนักแสดงหญิงที่มีชื่อเสียง
comedy | หนังตลก | Let's watch a comedy. | ดูหนังตลกกันเถอะ
drama | ละคร/ดราม่า | It's a police drama. | เป็นละครแนวตำรวจ
---
horror | สยองขวัญ | I don't like horror movies. | ฉันไม่ชอบหนังสยองขวัญ
romance | โรแมนติก | It's a romance movie. | เป็นหนังโรแมนติก
animation | แอนิเมชัน | Kids love animation. | เด็กๆ ชอบแอนิเมชัน
hero | ฮีโร่/พระเอก | The hero saved the city. | ฮีโร่ช่วยเมืองไว้
villain | ตัวร้าย | The villain was scary. | ตัวร้ายน่ากลัว
trailer | ตัวอย่างหนัง | Did you see the trailer? | คุณดูตัวอย่างหนังหรือยัง
`);
U('daily', 3, 'หนังและซีรีส์: เนื้อเรื่อง', `
scene | ฉาก/ที่เกิดเหตุ | That scene was so sad. | ฉากนั้นเศร้ามาก
spoiler | การสปอยล์ | No spoilers, please! | ห้ามสปอยล์นะ!
twist | จุดหักมุม | The ending had a big twist. | ตอนจบหักมุมมาก
cliffhanger | ตอนจบค้างให้ลุ้น | The episode ended on a cliffhanger. | ตอนนี้จบแบบค้างให้ลุ้น
flashback | ฉากย้อนอดีต | The story starts with a flashback. | เรื่องเริ่มด้วยฉากย้อนอดีต
protagonist | ตัวเอก | The protagonist is a young detective. | ตัวเอกเป็นนักสืบหนุ่ม
---
heroine | นางเอก | The heroine is brave. | นางเอกกล้าหาญ
sidekick | ผู้ช่วยคู่หู | Every hero needs a sidekick. | ฮีโร่ทุกคนต้องมีคู่หู
sequel | ภาคต่อ | The sequel comes out next year. | ภาคต่อจะออกปีหน้า
prequel | ภาคก่อนหน้า (เล่าเรื่องก่อน) | The prequel explains his past. | ภาคก่อนหน้าเล่าอดีตของเขา
remake | การสร้างใหม่ (รีเมก) | It's a remake of an old film. | เป็นหนังรีเมกจากเรื่องเก่า
franchise | แฟรนไชส์ (หนังชุด) | It's a huge movie franchise. | เป็นหนังชุดที่ยิ่งใหญ่
`);
U('daily', 3, 'หนังและซีรีส์: การดู', `
dubbed | พากย์ (เสียง) | I prefer the original, not dubbed. | ฉันชอบเสียงต้นฉบับมากกว่าพากย์
stream | สตรีม/ดูออนไลน์ | You can stream it on Netflix. | ดูออนไลน์ได้ที่ Netflix
streaming | บริการสตรีมมิง | Streaming is cheaper than cinema. | สตรีมมิงถูกกว่าโรงหนัง
binge | ดูรวดเดียว | I binged the whole series. | ฉันดูซีรีส์รวดเดียวจบ
genre | แนว (หนัง/เพลง) | What genre do you like? | คุณชอบแนวไหน
thriller | หนังระทึกขวัญ | It's a crime thriller. | เป็นหนังระทึกขวัญแนวอาชญากรรม
---
rating | คะแนน/เรต | The movie has a high rating. | หนังได้คะแนนสูง
critic | นักวิจารณ์ | Critics loved the movie. | นักวิจารณ์ชอบหนังเรื่องนี้
cast | นักแสดงทั้งหมด | The cast is amazing. | นักแสดงทั้งหมดยอดเยี่ยม
role | บทบาท | He played the role of a cop. | เขารับบทตำรวจ
costume | เครื่องแต่งกาย | The costumes are beautiful. | ชุดสวยมาก
stunt | ฉากผาดโผน | He did his own stunts. | เขาแสดงฉากผาดโผนเอง
`);
U('daily', 4, 'หนังและซีรีส์: เบื้องหลัง', `
producer | ผู้อำนวยการสร้าง | The producer paid for the film. | ผู้อำนวยการสร้างออกทุนทำหนัง
script | บท | The actor read the script. | นักแสดงอ่านบท
screenplay | บทภาพยนตร์ | She wrote the screenplay. | เธอเขียนบทภาพยนตร์
special effects | เทคนิคพิเศษ | The special effects are great. | เทคนิคพิเศษยอดเยี่ยม
box office | รายได้หนัง/บ็อกซ์ออฟฟิศ | The film was a box office hit. | หนังทำรายได้ถล่มทลาย
blockbuster | หนังฟอร์มยักษ์ | It's a summer blockbuster. | เป็นหนังฟอร์มยักษ์ช่วงซัมเมอร์
---
nominee | ผู้ได้รับการเสนอชื่อ | She was an Oscar nominee. | เธอได้รับการเสนอชื่อเข้าชิงออสการ์
narrator | ผู้บรรยาย | The narrator has a calm voice. | ผู้บรรยายเสียงนุ่ม
fiction | เรื่องแต่ง | This is a work of fiction. | นี่คือเรื่องแต่ง
nonfiction | สารคดี/เรื่องจริง | I read nonfiction books. | ฉันอ่านหนังสือเรื่องจริง
chapter | บท/ตอน | Read chapter one. | อ่านบทที่หนึ่ง
fandom | กลุ่มแฟนคลับ | The fandom is huge online. | แฟนคลับในออนไลน์เยอะมาก
`);
U('daily', 1, 'เพลง: พื้นฐาน', `
singer | นักร้อง | She is a great singer. | เธอเป็นนักร้องเก่ง
band | วงดนตรี | My favorite band is from Korea. | วงที่ฉันชอบมาจากเกาหลี
album | อัลบั้ม | Their new album is out. | อัลบั้มใหม่ของพวกเขาออกแล้ว
piano | เปียโน | I can play the piano. | ฉันเล่นเปียโนได้
drum | กลอง | He plays the drums. | เขาเล่นกลอง
violin | ไวโอลิน | She plays the violin. | เธอเล่นไวโอลิน
---
love | รัก/ความรัก | This song is about love. | เพลงนี้เกี่ยวกับความรัก
heart | หัวใจ | You broke my heart. | คุณทำให้ใจฉันสลาย
miss | คิดถึง/พลาด | I miss you so much. | ฉันคิดถึงคุณมาก
crazy | บ้า/คลั่ง | I'm crazy about you. | ฉันหลงคุณมาก
wild | ป่า/อิสระ/สุดเหวี่ยง | Let's go wild tonight. | คืนนี้มาสุดเหวี่ยงกัน
tears | น้ำตา | She sang with tears in her eyes. | เธอร้องเพลงทั้งน้ำตา
`);
U('daily', 2, 'เพลง: ส่วนประกอบของเพลง', `
lyrics | เนื้อเพลง | I love the lyrics of this song. | ฉันชอบเนื้อเพลงนี้
chorus | ท่อนฮุก/ท่อนร้องซ้ำ | Sing the chorus with me. | ร้องท่อนฮุกกับฉัน
verse | ท่อนเพลง (ท่อนเล่าเรื่อง) | The second verse is sad. | ท่อนที่สองเศร้า
melody | ทำนอง | The melody is beautiful. | ทำนองไพเราะ
rhythm | จังหวะ | Dance to the rhythm. | เต้นตามจังหวะ
tune | ทำนอง/เพลง | I can't get this tune out of my head. | เพลงนี้ติดหูไม่หาย
---
track | เพลง (ในอัลบั้ม)/ติดตาม | Track three is my favorite. | เพลงที่สามเป็นเพลงโปรด
playlist | รายการเพลง | Add it to my playlist. | เพิ่มลงในเพลย์ลิสต์ของฉัน
duet | เพลงคู่ | They sang a duet. | พวกเขาร้องเพลงคู่
remix | รีมิกซ์ | I like the remix better. | ฉันชอบเวอร์ชันรีมิกซ์มากกว่า
acoustic | อะคูสติก (เครื่องดนตรีไม่เสียบไฟ) | She played an acoustic version. | เธอเล่นเวอร์ชันอะคูสติก
vocal | เสียงร้อง | Her vocals are powerful. | เสียงร้องของเธอทรงพลัง
`);
U('daily', 3, 'เพลง: แนวเพลงและคำในเพลง', `
pop | เพลงป๊อป | I listen to pop music. | ฉันฟังเพลงป๊อป
rock | เพลงร็อก/หิน | He loves rock music. | เขาชอบเพลงร็อก
jazz | แจ๊ส | We went to a jazz bar. | เราไปบาร์แจ๊ส
rap | แร็พ | He can rap very fast. | เขาแร็พได้เร็วมาก
rapper | แร็พเปอร์ | She is a famous rapper. | เธอเป็นแร็พเปอร์ชื่อดัง
songwriter | นักแต่งเพลง | He is a singer and songwriter. | เขาเป็นทั้งนักร้องและนักแต่งเพลง
---
stage | เวที | The band is on stage. | วงอยู่บนเวที
soul | จิตวิญญาณ/เพลงโซล | She sings from her soul. | เธอร้องเพลงจากใจ
forever | ตลอดไป | I will love you forever. | ฉันจะรักเธอตลอดไป
darling | ที่รัก | Goodnight, darling. | ราตรีสวัสดิ์นะที่รัก
shine | ส่องแสง/เปล่งประกาย | Let your light shine. | ปล่อยให้แสงของเธอเปล่งประกาย
fade | จางหาย | The memories will never fade. | ความทรงจำจะไม่มีวันจางหาย
`);
U('daily', 3, 'เพลง: ความรักในเนื้อเพลง', `
crush | คนที่แอบชอบ | I have a crush on her. | ฉันแอบชอบเธอ
breakup | การเลิกรา | This is a breakup song. | นี่คือเพลงอกหัก
heartbreak | ความอกหัก | Heartbreak takes time to heal. | อาการอกหักต้องใช้เวลารักษา
fall in love | ตกหลุมรัก | I fell in love with you. | ฉันตกหลุมรักเธอ
let go | ปล่อยวาง/ปล่อยมือ | It's time to let go. | ถึงเวลาปล่อยวางแล้ว
heartbeat | จังหวะหัวใจ | I can hear your heartbeat. | ฉันได้ยินเสียงหัวใจเธอ
---
soulmate | เนื้อคู่ | You are my soulmate. | เธอคือเนื้อคู่ของฉัน
sweetheart | ที่รัก/คนรัก | Hello, sweetheart. | สวัสดีจ้ะที่รัก
lover | คนรัก | They were lovers. | พวกเขาเคยเป็นคนรักกัน
memories | ความทรงจำ | We made so many memories. | เราสร้างความทรงจำมากมาย
goodbye kiss | จูบลา | It was our goodbye kiss. | มันคือจูบลาของเรา
yearn | โหยหา | I yearn for your touch. | ฉันโหยหาสัมผัสของเธอ
`);

U('daily', 2, 'งานบ้านและธุระประจำวัน', `
groceries | ของชำ/ของใช้ในบ้าน | I buy groceries every Sunday. | ฉันซื้อของเข้าบ้านทุกวันอาทิตย์
dishes | จานชาม | It's your turn to wash the dishes. | ถึงตาคุณล้างจานแล้ว
chores | งานบ้าน | I do my chores in the morning. | ฉันทำงานบ้านตอนเช้า
errand | ธุระ | I have to run some errands. | ฉันต้องไปทำธุระ
rent | ค่าเช่า/เช่า | The rent is 6,000 baht a month. | ค่าเช่าเดือนละ 6,000 บาท
roommate | เพื่อนร่วมห้อง | My roommate is very tidy. | เพื่อนร่วมห้องฉันเรียบร้อยมาก
---
condo | คอนโด | She lives in a condo. | เธออยู่คอนโด
appliance | เครื่องใช้ไฟฟ้า | The kitchen has new appliances. | ครัวมีเครื่องใช้ไฟฟ้าใหม่
mold | เชื้อรา | There is mold on the wall. | มีเชื้อราบนผนัง
pest | สัตว์รบกวน | We need pest control. | เราต้องกำจัดสัตว์รบกวน
leftovers | อาหารที่เหลือ | Eat the leftovers for lunch. | กินอาหารเหลือเป็นมื้อกลางวัน
takeout | อาหารสั่งกลับบ้าน | Let's get takeout tonight. | คืนนี้สั่งอาหารกลับบ้านกันเถอะ
`);
U('daily', 2, 'ทำอาหารในครัว', `
ingredient | ส่วนผสม/วัตถุดิบ | Buy fresh ingredients. | ซื้อวัตถุดิบสด
bake | อบ | I baked a cake. | ฉันอบเค้ก
steam | นึ่ง/ไอน้ำ | Steam the fish for ten minutes. | นึ่งปลาสิบนาที
chop | สับ/หั่น | Chop the onions. | สับหัวหอม
slice | หั่นเป็นแผ่น/ชิ้น | Slice the bread. | หั่นขนมปังเป็นแผ่น
stir | คน | Stir the soup slowly. | คนซุปช้าๆ
---
flavor | รสชาติ | This soup has a strong flavor. | ซุปนี้รสเข้มข้น
peel | ปอกเปลือก | Peel the potatoes. | ปอกมันฝรั่ง
grate | ขูด | Grate some cheese. | ขูดชีส
dough | แป้งโด | Knead the dough. | นวดแป้ง
simmer | เคี่ยว (ไฟอ่อน) | Let it simmer for an hour. | เคี่ยวไว้หนึ่งชั่วโมง
marinate | หมัก | Marinate the chicken overnight. | หมักไก่ไว้ข้ามคืน
`);
U('daily', 3, 'ชีวิตการทำงาน', `
bonus | โบนัส | We got a bonus this year. | ปีนี้เราได้โบนัส
presentation | การนำเสนอ | I have a presentation tomorrow. | พรุ่งนี้ฉันต้องนำเสนองาน
invoice | ใบแจ้งหนี้ | Send me the invoice. | ส่งใบแจ้งหนี้มาให้ฉัน
subscription | การสมัครสมาชิก (รายเดือน) | Cancel the subscription. | ยกเลิกการสมัครสมาชิก
delivery | การจัดส่ง | Delivery is free. | ส่งฟรี
paycheck | เงินเดือน (ที่ได้แต่ละงวด) | I'm waiting for my paycheck. | ฉันรอเงินเดือนออก
---
payroll | ระบบเงินเดือน/บัญชีเงินเดือน | Ask the payroll department. | ถามแผนกเงินเดือน
coworker | เพื่อนร่วมงาน | My coworker helped me. | เพื่อนร่วมงานช่วยฉัน
intern | นักศึกษาฝึกงาน | She is an intern here. | เธอเป็นนักศึกษาฝึกงานที่นี่
freelance | ฟรีแลนซ์ | He works freelance. | เขาทำงานฟรีแลนซ์
workplace | ที่ทำงาน | Safety in the workplace is important. | ความปลอดภัยในที่ทำงานสำคัญ
cubicle | โต๊ะทำงานแบบกั้นห้อง | My cubicle is near the window. | โต๊ะทำงานของฉันอยู่ใกล้หน้าต่าง
`);
U('daily', 3, 'ข่าวและสื่อออนไลน์', `
reporter | นักข่าว | The reporter asked a question. | นักข่าวถามคำถาม
editor | บรรณาธิการ | The editor checked the story. | บรรณาธิการตรวจข่าว
press | สื่อมวลชน | The police spoke to the press. | ตำรวจให้สัมภาษณ์สื่อ
breaking news | ข่าวด่วน | Here is some breaking news. | นี่คือข่าวด่วน
trending | กำลังเป็นกระแส | This topic is trending. | หัวข้อนี้กำลังเป็นกระแส
hashtag | แฮชแท็ก | Use the hashtag in your post. | ใช้แฮชแท็กในโพสต์ของคุณ
---
follower | ผู้ติดตาม | She has a million followers. | เธอมีผู้ติดตามหนึ่งล้านคน
influencer | อินฟลูเอนเซอร์ | He is a food influencer. | เขาเป็นอินฟลูเอนเซอร์สายอาหาร
post | โพสต์ | Don't post your address online. | อย่าโพสต์ที่อยู่ของคุณทางออนไลน์
subscribe | กดติดตาม/สมัครรับ | Subscribe to my channel. | กดติดตามช่องของฉัน
livestream | ไลฟ์สด | She sells clothes on livestream. | เธอไลฟ์ขายเสื้อผ้า
meme | มีม | That meme is so funny. | มีมนั้นตลกมาก
`);
U('daily', 3, 'โซเชียลมีเดีย', `
caption | แคปชัน/คำบรรยายภาพ | Write a funny caption. | เขียนแคปชันตลกๆ
feed | ฟีด (หน้ารวมโพสต์) | I saw it on my feed. | ฉันเห็นมันในฟีด
reel | คลิปสั้น (รีล) | She makes cooking reels. | เธอทำคลิปสั้นสอนทำอาหาร
tag | แท็ก | Tag your friends in the photo. | แท็กเพื่อนในรูป
unfollow | เลิกติดตาม | I unfollowed that account. | ฉันเลิกติดตามบัญชีนั้น
selfie | เซลฟี่ | Let's take a selfie. | ถ่ายเซลฟี่กัน
---
filter | ฟิลเตอร์/ตัวกรอง | She always uses a filter. | เธอใช้ฟิลเตอร์ตลอด
emoji | อีโมจิ | He replied with an emoji. | เขาตอบกลับด้วยอีโมจิ
repost | รีโพสต์/แชร์ต่อ | Don't repost fake news. | อย่าแชร์ข่าวปลอมต่อ
direct message | ข้อความส่วนตัว (DM) | Send me a direct message. | ส่งข้อความส่วนตัวมาหาฉัน
go live | ไลฟ์สด | I'll go live at eight. | ฉันจะไลฟ์ตอนสองทุ่ม
screen time | เวลาที่ใช้หน้าจอ | Reduce your screen time. | ลดเวลาเล่นหน้าจอ
`);
U('talk', 2, 'คำพูดแบบเพื่อนคุยกัน', `
weird | แปลก | That's so weird. | แปลกมาก
gross | น่าขยะแขยง | Ew, that's gross! | อี๋ น่าขยะแขยง!
creepy | น่าขนลุก | That house is creepy. | บ้านหลังนั้นน่าขนลุก
cute | น่ารัก | Your puppy is so cute. | ลูกหมาของคุณน่ารักมาก
adorable | น่ารักมาก | The baby is adorable. | ทารกน่ารักมาก
awkward | อึดอัด/เก้อ | That was an awkward moment. | เป็นช่วงที่อึดอัดมาก
---
hilarious | ตลกมาก | The movie was hilarious. | หนังตลกมาก
ridiculous | ไร้สาระ/บ้าบอ | That price is ridiculous. | ราคานั้นบ้ามาก
legit | ของจริง/เชื่อถือได้ | Is this website legit? | เว็บนี้ของจริงไหม
sketchy | น่าสงสัย/ไม่น่าไว้ใจ | That guy looks sketchy. | หมอนั่นดูไม่น่าไว้ใจ
shady | ไม่โปร่งใส/มีลับลมคมใน | It's a shady business. | เป็นธุรกิจที่มีลับลมคมใน
lame | น่าเบื่อ/ห่วย | That joke was lame. | มุกนั้นแป้ก
`);
U('talk', 3, 'ภาษาพูดในหนังและซีรีส์', `
epic | สุดยอด/ยิ่งใหญ่ | That was an epic battle. | เป็นการต่อสู้ที่สุดยอด
insane | บ้า/สุดๆ | The ending was insane! | ตอนจบสุดยอดมาก!
dude | เพื่อน/ไอ้หนุ่ม | Hey dude, what's up? | ว่าไงเพื่อน
bro | พี่ชาย/เพื่อน (ชาย) | Thanks, bro. | ขอบใจนะเพื่อน
buddy | เพื่อนสนิท | He's my buddy from school. | เขาเป็นเพื่อนสนิทสมัยเรียน
folks | ผู้คน/ทุกคน | That's all, folks! | แค่นี้แหละทุกคน!
---
yeah | ใช่/อือ | Yeah, I know. | อือ ฉันรู้
nope | ไม่ (ภาษาพูด) | Nope, not today. | ไม่ ไม่ใช่วันนี้
yep | ใช่ (ภาษาพูด) | Yep, that's him. | ใช่ นั่นแหละเขา
alright | โอเค/ได้ | Alright, let's go. | โอเค ไปกัน
whatever | อะไรก็ได้/ช่างมัน | Whatever, I don't care. | ช่างมัน ฉันไม่สน
literally | อย่างแท้จริง/แบบจริงๆ | I literally ran all the way. | ฉันวิ่งมาตลอดทางจริงๆ
`);
U('talk', 3, 'คำพูดย่อและคำเสริมในภาษาพูด', `
y'all | พวกคุณทุกคน (you all) | Thank y'all for coming. | ขอบคุณทุกคนที่มา
ain't | ไม่ (am not/isn't) | That ain't right. | แบบนั้นไม่ถูก
lotta | เยอะ (a lot of) | That's a lotta money. | เงินเยอะมาก
dunno | ไม่รู้ (don't know) | I dunno where he is. | ไม่รู้ว่าเขาอยู่ไหน
lemme | ขอ/ให้ฉัน (let me) | Lemme see that. | ขอดูหน่อย
gimme | ให้ฉัน (give me) | Gimme a second. | ขอเวลาแป๊บนึง
---
basically | โดยพื้นฐาน/สรุปคือ | Basically, he lied. | สรุปคือเขาโกหก
honestly | พูดตรงๆ | Honestly, I'm tired. | พูดตรงๆ ฉันเหนื่อย
totally | โดยสิ้นเชิง/สุดๆ | You're totally right. | คุณพูดถูกที่สุด
obviously | แน่นอน/เห็นได้ชัด | Obviously, he was nervous. | เห็นได้ชัดว่าเขาประหม่า
outta | ออกไปจาก (out of) | Get outta here! | ออกไปจากที่นี่!
sorta | ประมาณว่า (sort of) | It's sorta weird. | มันแปลกๆ นะ
`);
U('talk', 4, 'สแลงที่ได้ยินบ่อย', `
mess up | ทำพัง/ทำพลาด | I messed up the test. | ฉันทำข้อสอบพัง
screw up | ทำพลาดครั้งใหญ่ | Don't screw this up. | อย่าทำพังล่ะ
blow it | ทำเสียโอกาส | I had one chance and I blew it. | ฉันมีโอกาสเดียวแต่ทำพลาด
nailed it | ทำได้เป๊ะ/ทำได้ดีมาก | You nailed it! | ทำได้เป๊ะเลย!
for real | จริงเหรอ/จริงจัง | For real? You passed? | จริงเหรอ สอบผ่านแล้ว?
you bet | แน่นอนอยู่แล้ว | You bet I'll be there. | แน่นอนว่าฉันจะไป
---
catch you later | แล้วเจอกัน | Catch you later, bro. | แล้วเจอกันนะเพื่อน
see ya | บาย/แล้วเจอกัน | See ya tomorrow! | เจอกันพรุ่งนี้!
hit me up | ทักมานะ/ติดต่อมา | Hit me up if you're free. | ว่างเมื่อไหร่ทักมานะ
hang tight | รอแป๊บ/อดทนไว้ | Hang tight, help is coming. | รอก่อนนะ ความช่วยเหลือกำลังมา
keep it real | เป็นตัวของตัวเอง/จริงใจ | Just keep it real. | แค่เป็นตัวของตัวเอง
no biggie | ไม่เป็นไร/เรื่องเล็ก | Thanks! — No biggie. | ขอบคุณ! — ไม่เป็นไร
`);

U('daily', 2, 'เที่ยวทะเลและธรรมชาติ', `
resort | รีสอร์ต | We stayed at a beach resort. | เราพักที่รีสอร์ตริมทะเล
cliff | หน้าผา | Don't stand near the cliff. | อย่ายืนใกล้หน้าผา
tent | เต็นท์ | We slept in a tent. | เรานอนในเต็นท์
sunscreen | ครีมกันแดด | Put on sunscreen. | ทาครีมกันแดด
sunburn | ผิวไหม้แดด | I got a bad sunburn. | ฉันผิวไหม้แดดหนักมาก
jellyfish | แมงกะพรุน | Watch out for jellyfish. | ระวังแมงกะพรุน
---
snorkel | ดำน้ำตื้น | We snorkeled near the island. | เราดำน้ำตื้นใกล้เกาะ
dive | ดำน้ำ/กระโดดลงน้ำ | He dived into the pool. | เขากระโดดลงสระ
surf | โต้คลื่น | I want to learn to surf. | ฉันอยากหัดโต้คลื่น
kayak | เรือคายัก | Let's rent a kayak. | เช่าเรือคายักกันเถอะ
shore | ชายฝั่ง | The boat came to shore. | เรือเข้าฝั่ง
harbor | ท่าเรือ | The ship is in the harbor. | เรือจอดอยู่ในท่าเรือ
`);
U('daily', 3, 'วิวและการเดินทางไกล', `
layover | การแวะต่อเครื่อง | I have a layover in Dubai. | ฉันต้องแวะต่อเครื่องที่ดูไบ
hostel | โฮสเทล | Hostels are cheap. | โฮสเทลราคาถูก
scenery | ทิวทัศน์ | The scenery is beautiful. | ทิวทัศน์สวยงาม
landscape | ภูมิทัศน์ | The landscape is green. | ภูมิทัศน์เขียวขจี
skyline | เส้นขอบฟ้า (ตึกในเมือง) | The city skyline at night is amazing. | วิวตึกในเมืองตอนกลางคืนสวยมาก
sunset | พระอาทิตย์ตก | Let's watch the sunset. | ไปดูพระอาทิตย์ตกกัน
---
sunrise | พระอาทิตย์ขึ้น | We woke up for the sunrise. | เราตื่นมาดูพระอาทิตย์ขึ้น
horizon | ขอบฟ้า | A ship appeared on the horizon. | มีเรือโผล่ที่ขอบฟ้า
tide | น้ำขึ้นน้ำลง | The tide is coming in. | น้ำกำลังขึ้น
wave | คลื่น/โบกมือ | The waves are big today. | วันนี้คลื่นแรง
canoe | เรือแคนู | They paddled a canoe. | พวกเขาพายเรือแคนู
boarding gate | ประตูขึ้นเครื่อง | Go to the boarding gate. | ไปที่ประตูขึ้นเครื่อง
`);
U('daily', 2, 'ญาติและเหตุการณ์ในครอบครัว', `
niece | หลานสาว | My niece is three years old. | หลานสาวฉันอายุสามขวบ
twin | ฝาแฝด | She has a twin brother. | เธอมีพี่น้องฝาแฝดชาย
in-law | ญาติฝ่ายสามี/ภรรยา | My in-laws live in Chiang Mai. | ญาติฝ่ายภรรยาฉันอยู่เชียงใหม่
stepmother | แม่เลี้ยง | His stepmother is kind. | แม่เลี้ยงของเขาใจดี
stepfather | พ่อเลี้ยง | My stepfather raised me. | พ่อเลี้ยงเลี้ยงฉันมา
orphan | เด็กกำพร้า | He grew up as an orphan. | เขาโตมาเป็นเด็กกำพร้า
---
widow | หญิงม่าย | She became a widow at forty. | เธอเป็นม่ายตอนอายุสี่สิบ
fiance | คู่หมั้น (ชาย) | Her fiance is a soldier. | คู่หมั้นของเธอเป็นทหาร
bride | เจ้าสาว | The bride looks beautiful. | เจ้าสาวสวยมาก
groom | เจ้าบ่าว | The groom is nervous. | เจ้าบ่าวตื่นเต้น
anniversary | วันครบรอบ | Today is our wedding anniversary. | วันนี้วันครบรอบแต่งงานของเรา
engagement | การหมั้น | They announced their engagement. | พวกเขาประกาศหมั้น
`);
U('daily', 3, 'บุคลิกภาพและนิสัย', `
introvert | คนเก็บตัว | I'm an introvert. | ฉันเป็นคนเก็บตัว
extrovert | คนชอบเข้าสังคม | She is a real extrovert. | เธอเป็นคนชอบเข้าสังคมมาก
arrogant | หยิ่ง/อวดดี | He is rude and arrogant. | เขาหยาบคายและหยิ่ง
moody | อารมณ์แปรปรวน | She is moody in the morning. | เธออารมณ์ไม่ดีตอนเช้า
careless | สะเพร่า | That was a careless mistake. | นั่นเป็นความผิดพลาดจากความสะเพร่า
clumsy | ซุ่มซ่าม | I'm so clumsy. | ฉันซุ่มซ่ามมาก
---
talkative | ช่างพูด | My sister is talkative. | น้องสาวฉันช่างพูด
bossy | ชอบสั่ง | Don't be so bossy. | อย่าชอบสั่งนักเลย
childish | ทำตัวเป็นเด็ก | Stop being childish. | เลิกทำตัวเป็นเด็กได้แล้ว
easygoing | สบายๆ ไม่คิดมาก | He is very easygoing. | เขาเป็นคนสบายๆ
picky | เลือกมาก/จู้จี้ | She is a picky eater. | เธอเลือกกินมาก
nosy | ชอบสอดรู้สอดเห็น | My neighbor is nosy. | เพื่อนบ้านฉันชอบสอดรู้
`);
U('daily', 2, 'ร่างกายและอาการเล็กน้อย', `
pimple | สิว | I have a pimple on my nose. | ฉันมีสิวที่จมูก
wrinkle | ริ้วรอย | Sunscreen prevents wrinkles. | ครีมกันแดดช่วยป้องกันริ้วรอย
freckle | กระ | She has freckles on her face. | เธอมีกระบนใบหน้า
sweat | เหงื่อ | I'm covered in sweat. | ฉันเหงื่อท่วมตัว
blister | ตุ่มพอง | New shoes gave me blisters. | รองเท้าใหม่ทำให้เท้าพอง
rash | ผื่น | He has a rash on his arm. | เขามีผื่นที่แขน
---
cramp | ตะคริว | I got a cramp in my leg. | ฉันเป็นตะคริวที่ขา
yawn | หาว | Stop yawning in class. | เลิกหาวในห้องเรียน
hiccup | สะอึก | I have the hiccups. | ฉันสะอึก
snore | กรน | My father snores loudly. | พ่อฉันกรนดัง
sprain | แพลง | I sprained my ankle. | ข้อเท้าฉันแพลง
fracture | กระดูกร้าว/หัก | The X-ray shows a fracture. | เอกซเรย์พบกระดูกร้าว
`);
U('daily', 2, 'ซื้อของในซูเปอร์มาร์เก็ต', `
grocery store | ร้านขายของชำ | The grocery store is open 24 hours. | ร้านของชำเปิด 24 ชั่วโมง
aisle | ทางเดินระหว่างชั้นวาง | Milk is in aisle five. | นมอยู่ช่องทางเดินที่ห้า
barcode | บาร์โค้ด | Scan the barcode. | สแกนบาร์โค้ด
trolley | รถเข็น | Get a trolley. | หยิบรถเข็นมา
basket | ตะกร้า | Put it in the basket. | ใส่ในตะกร้า
label | ฉลาก | Read the label carefully. | อ่านฉลากให้ดี
---
expiry date | วันหมดอายุ | Check the expiry date. | ตรวจวันหมดอายุ
haggle | ต่อราคา | You can haggle at the market. | ที่ตลาดต่อราคาได้
wholesale | ขายส่ง | They sell at wholesale prices. | พวกเขาขายราคาส่ง
retail | ขายปลีก | The retail price is 199 baht. | ราคาขายปลีก 199 บาท
self-checkout | จ่ายเงินด้วยตัวเอง | Use the self-checkout. | ใช้เครื่องจ่ายเงินด้วยตัวเอง
loyalty card | บัตรสะสมแต้ม | Do you have a loyalty card? | คุณมีบัตรสะสมแต้มไหม
`);
U('daily', 1, 'เสื้อผ้าและอากาศหนาวฝน', `
raincoat | เสื้อกันฝน | Wear a raincoat today. | วันนี้ใส่เสื้อกันฝน
scarf | ผ้าพันคอ | It's cold, take a scarf. | หนาวนะ เอาผ้าพันคอไปด้วย
sweater | เสื้อกันหนาว (ไหมพรม) | She wears a red sweater. | เธอใส่เสื้อไหมพรมสีแดง
slippers | รองเท้าแตะในบ้าน | Wear slippers in the house. | ใส่รองเท้าแตะในบ้าน
heels | รองเท้าส้นสูง | She can't walk in heels. | เธอใส่ส้นสูงเดินไม่ได้
mittens | ถุงมือ (แบบไม่แยกนิ้ว) | The kids wore mittens. | เด็กๆ ใส่ถุงมือ
---
thunderstorm | พายุฝนฟ้าคะนอง | A thunderstorm is coming. | พายุฝนฟ้าคะนองกำลังมา
drizzle | ฝนปรอยๆ | It's only a drizzle. | แค่ฝนปรอยๆ
frost | น้ำค้างแข็ง | There was frost on the car. | มีน้ำค้างแข็งเกาะบนรถ
chilly | หนาวเย็น | It's a bit chilly tonight. | คืนนี้หนาวนิดหน่อย
freezing | หนาวจัด | It's freezing outside! | ข้างนอกหนาวจัด!
mild | อบอุ่นพอดี/อ่อนๆ | The weather is mild today. | วันนี้อากาศกำลังดี
`);
U('talk', 3, 'ความรักและการออกเดต', `
dating | การออกเดต | Are they dating? | พวกเขาคบกันอยู่เหรอ
ex | แฟนเก่า | I saw my ex today. | วันนี้ฉันเจอแฟนเก่า
first date | เดตแรก | I'm nervous about our first date. | ฉันตื่นเต้นกับเดตแรกของเรา
blind date | การนัดบอด | My friend set me up on a blind date. | เพื่อนจัดนัดบอดให้ฉัน
pop the question | ขอแต่งงาน (สำนวน) | He popped the question on the beach. | เขาขอแต่งงานที่ชายหาด
honeymoon | ฮันนีมูน | They went to Bali for their honeymoon. | พวกเขาไปฮันนีมูนที่บาหลี
---
flirt | จีบ/หยอด | Stop flirting with her. | เลิกจีบเธอได้แล้ว
dump | บอกเลิก/ทิ้ง | She dumped him last week. | เธอบอกเลิกเขาสัปดาห์ที่แล้ว
long-distance | ทางไกล | We have a long-distance relationship. | เราคบกันแบบทางไกล
commitment | ความผูกพัน/คำมั่น | He is afraid of commitment. | เขากลัวการผูกมัด
get back together | กลับมาคบกัน | They got back together. | พวกเขากลับมาคบกันแล้ว
move in together | ย้ายมาอยู่ด้วยกัน | We moved in together last year. | เราย้ายมาอยู่ด้วยกันเมื่อปีที่แล้ว
`);

U('basic', 0, 'ธรรมชาติรอบตัว', `
snow | หิมะ | I want to see snow. | ฉันอยากเห็นหิมะ
lake | ทะเลสาบ | The lake is very big. | ทะเลสาบใหญ่มาก
leaf | ใบไม้ | A leaf fell on my head. | ใบไม้ร่วงใส่หัวฉัน
grass | หญ้า | The grass is green. | หญ้าสีเขียว
sand | ทราย | The sand is hot. | ทรายร้อน
earth | โลก/ดิน | The Earth is round. | โลกกลม
---
ocean | มหาสมุทร | Fish live in the ocean. | ปลาอาศัยอยู่ในมหาสมุทร
planet | ดาวเคราะห์ | Earth is our planet. | โลกเป็นดาวเคราะห์ของเรา
field | ทุ่ง/สนาม | Cows eat in the field. | วัวกินหญ้าในทุ่ง
valley | หุบเขา | The village is in a valley. | หมู่บ้านอยู่ในหุบเขา
jungle | ป่าดงดิบ | Tigers live in the jungle. | เสืออาศัยอยู่ในป่า
pond | บ่อน้ำ | There are fish in the pond. | ในบ่อมีปลา
`);
U('basic', 0, 'อารมณ์และการกระทำง่ายๆ', `
laugh | หัวเราะ | Don't laugh at me. | อย่าหัวเราะเยาะฉัน
cry | ร้องไห้ | The baby is crying. | ทารกกำลังร้องไห้
kiss | จูบ/หอม | She kissed her son. | เธอหอมลูกชาย
hug | กอด | Give me a hug. | กอดฉันหน่อย
joke | มุกตลก | Tell me a joke. | เล่ามุกให้ฟังหน่อย
gift | ของขวัญ | Thank you for the gift. | ขอบคุณสำหรับของขวัญ
---
kick | เตะ | Kick the ball. | เตะลูกบอล
dig | ขุด | The dog is digging a hole. | สุนัขกำลังขุดหลุม
bite | กัด | Does your dog bite? | สุนัขของคุณกัดไหม
chew | เคี้ยว | Chew your food well. | เคี้ยวอาหารให้ละเอียด
nod | พยักหน้า | He nodded and smiled. | เขาพยักหน้าและยิ้ม
joy | ความสุข/ความยินดี | She cried with joy. | เธอร้องไห้ด้วยความดีใจ
`);
U('basic', 0, 'ของในบ้านของฉัน', `
bath | อ่างอาบน้ำ/การอาบน้ำ | I take a bath at night. | ฉันอาบน้ำตอนกลางคืน
bell | กระดิ่ง | Ring the bell. | กดกริ่ง
card | การ์ด/บัตร | I made a birthday card. | ฉันทำการ์ดวันเกิด
carpet | พรม | The carpet is soft. | พรมนุ่ม
ceiling | เพดาน | There is a spider on the ceiling. | มีแมงมุมบนเพดาน
couch | โซฟา | He is sleeping on the couch. | เขานอนอยู่บนโซฟา
---
cupboard | ตู้ (เก็บของ) | The cups are in the cupboard. | แก้วอยู่ในตู้
curtain | ผ้าม่าน | Close the curtains. | ปิดผ้าม่าน
cushion | เบาะ/หมอนอิง | Sit on the cushion. | นั่งบนเบาะ
drawer | ลิ้นชัก | The key is in the drawer. | กุญแจอยู่ในลิ้นชัก
sink | อ่างล้างจาน | Put the dishes in the sink. | วางจานในอ่างล้างจาน
toy | ของเล่น | The kids love this toy. | เด็กๆ ชอบของเล่นนี้
`);
U('daily', 1, 'สัตว์น่ารู้ 1', `
lion | สิงโต | The lion is the king of the jungle. | สิงโตเป็นราชาแห่งป่า
wolf | หมาป่า | The wolf howled at night. | หมาป่าหอนตอนกลางคืน
fox | สุนัขจิ้งจอก | A fox is very clever. | สุนัขจิ้งจอกฉลาดมาก
deer | กวาง | We saw a deer in the forest. | เราเห็นกวางในป่า
goat | แพะ | The goat eats grass. | แพะกินหญ้า
sheep | แกะ | The farmer has fifty sheep. | ชาวนามีแกะห้าสิบตัว
---
owl | นกฮูก | Owls hunt at night. | นกฮูกล่าเหยื่อตอนกลางคืน
eagle | นกอินทรี | An eagle flew over the mountain. | นกอินทรีบินผ่านภูเขา
parrot | นกแก้ว | The parrot can talk. | นกแก้วพูดได้
pigeon | นกพิราบ | Pigeons are everywhere in the city. | ในเมืองมีนกพิราบทุกที่
swan | หงส์ | Swans swim on the lake. | หงส์ว่ายน้ำในทะเลสาบ
goose | ห่าน | The goose chased me. | ห่านไล่ฉัน
`);
U('daily', 1, 'สัตว์น่ารู้ 2', `
dolphin | โลมา | Dolphins are smart. | โลมาฉลาด
shark | ฉลาม | I saw a shark! | ฉันเห็นฉลาม!
crab | ปู | I love crab curry. | ฉันชอบแกงปู
lobster | กุ้งมังกร | Lobster is expensive. | กุ้งมังกรแพง
oyster | หอยนางรม | We ate fresh oysters. | เรากินหอยนางรมสด
penguin | เพนกวิน | Penguins can't fly. | เพนกวินบินไม่ได้
---
rat | หนู (ตัวใหญ่) | There is a rat in the kitchen. | มีหนูในครัว
snail | หอยทาก | The snail is very slow. | หอยทากช้ามาก
spider | แมงมุม | I'm scared of spiders. | ฉันกลัวแมงมุม
wasp | ตัวต่อ | A wasp stung me. | ตัวต่อต่อยฉัน
worm | หนอน/ไส้เดือน | The bird ate a worm. | นกกินหนอน
insect | แมลง | Ants are insects. | มดเป็นแมลง
`);
U('daily', 1, 'ผลไม้และผักเพิ่มเติม', `
grape | องุ่น | I bought some grapes. | ฉันซื้อองุ่นมา
lemon | มะนาวเหลือง (เลมอน) | Add some lemon juice. | เติมน้ำเลมอน
lime | มะนาว | Thai food uses a lot of lime. | อาหารไทยใช้มะนาวเยอะ
peach | ลูกพีช | The peach is sweet. | ลูกพีชหวาน
pear | ลูกแพร์ | I like pears. | ฉันชอบลูกแพร์
plum | ลูกพลัม | This plum is sour. | ลูกพลัมลูกนี้เปรี้ยว
---
strawberry | สตรอว์เบอร์รี | I love strawberry ice cream. | ฉันชอบไอศกรีมสตรอว์เบอร์รี
melon | แตงไทย/เมลอน | Cut the melon into pieces. | หั่นเมลอนเป็นชิ้น
olive | มะกอก | Use olive oil. | ใช้น้ำมันมะกอก
pea | ถั่วลันเตา | Add some peas to the rice. | ใส่ถั่วลันเตาลงในข้าว
pumpkin | ฟักทอง | Pumpkin soup is delicious. | ซุปฟักทองอร่อย
spinach | ผักโขม | Spinach is good for you. | ผักโขมดีต่อสุขภาพ
`);
U('daily', 1, 'อาหารและของกินเพิ่มเติม', `
cheese | ชีส | I want extra cheese. | ฉันขอชีสเพิ่ม
butter | เนย | Put butter on the bread. | ทาเนยบนขนมปัง
honey | น้ำผึ้ง | Tea with honey, please. | ขอชาใส่น้ำผึ้ง
biscuit | บิสกิต | Have a biscuit. | กินบิสกิตสิ
pancake | แพนเค้ก | I had pancakes for breakfast. | ฉันกินแพนเค้กเป็นมื้อเช้า
sausage | ไส้กรอก | Kids love sausages. | เด็กๆ ชอบไส้กรอก
---
salad | สลัด | I'll have a salad. | ฉันขอสลัด
steak | สเต๊ก | How do you like your steak? | คุณชอบสเต๊กแบบไหน
stew | สตู | Beef stew is warm and tasty. | สตูเนื้ออุ่นและอร่อย
toast | ขนมปังปิ้ง | I eat toast every morning. | ฉันกินขนมปังปิ้งทุกเช้า
pie | พาย | Mom made an apple pie. | แม่ทำพายแอปเปิล
noodle | เส้นก๋วยเตี๋ยว | These noodles are spicy. | ก๋วยเตี๋ยวนี้เผ็ด
`);
U('daily', 2, 'เสื้อผ้าและเครื่องประดับ', `
coat | เสื้อโค้ท | Wear a warm coat. | ใส่เสื้อโค้ทอุ่นๆ
suit | ชุดสูท | He wore a black suit. | เขาใส่ชุดสูทสีดำ
sock | ถุงเท้า | I lost a sock. | ถุงเท้าหายไปข้างหนึ่ง
glove | ถุงมือ | Wear gloves at the crime scene. | สวมถุงมือที่ที่เกิดเหตุ
button | กระดุม/ปุ่ม | Press the red button. | กดปุ่มสีแดง
collar | ปกเสื้อ/ปลอกคอ | The dog has a red collar. | สุนัขใส่ปลอกคอสีแดง
---
sleeve | แขนเสื้อ | Roll up your sleeves. | พับแขนเสื้อขึ้น
trousers | กางเกงขายาว | He wore gray trousers. | เขาใส่กางเกงขายาวสีเทา
blouse | เสื้อผู้หญิง | She wore a white blouse. | เธอใส่เสื้อเชิ้ตสีขาว
ribbon | ริบบิ้น | Tie it with a ribbon. | ผูกด้วยริบบิ้น
diamond | เพชร | The ring has a diamond. | แหวนมีเพชร
jewel | อัญมณี | The jewels were stolen. | อัญมณีถูกขโมย
`);
U('daily', 2, 'เครื่องมือและของใช้', `
scissors | กรรไกร | Pass me the scissors. | ส่งกรรไกรให้หน่อย
glue | กาว | Use glue to fix it. | ใช้กาวซ่อม
rope | เชือก | Tie the boat with a rope. | ผูกเรือด้วยเชือก
nail | ตะปู/เล็บ | Hammer the nail in. | ตอกตะปูลงไป
screw | สกรู/ขันสกรู | Tighten the screw. | ขันสกรูให้แน่น
needle | เข็ม | I need a needle and thread. | ฉันต้องการเข็มกับด้าย
---
thread | ด้าย/กระทู้ | The thread is too short. | ด้ายสั้นไป
ruler | ไม้บรรทัด | Draw a line with a ruler. | ใช้ไม้บรรทัดลากเส้น
eraser | ยางลบ | Can I borrow your eraser? | ขอยืมยางลบหน่อย
shovel | พลั่ว | Dig with a shovel. | ขุดด้วยพลั่ว
magnet | แม่เหล็ก | The magnet holds the note. | แม่เหล็กติดโน้ตไว้
torch | ไฟฉาย/คบเพลิง | Take a torch. It's dark. | เอาไฟฉายไป มืดนะ
`);
U('daily', 2, 'อวัยวะและส่วนต่างๆ ของร่างกาย', `
brain | สมอง | Use your brain. | ใช้สมองหน่อย
bone | กระดูก | He broke a bone. | เขากระดูกหัก
cheek | แก้ม | She has red cheeks. | เธอแก้มแดง
chin | คาง | He has a beard on his chin. | เขามีเคราที่คาง
forehead | หน้าผาก | He has a scar on his forehead. | เขามีแผลเป็นที่หน้าผาก
jaw | กราม/ขากรรไกร | He was hit on the jaw. | เขาถูกต่อยที่กราม
---
throat | ลำคอ | My throat hurts. | ฉันเจ็บคอ
thumb | นิ้วโป้ง | He gave a thumbs up. | เขายกนิ้วโป้ง
waist | เอว | The belt is around my waist. | เข็มขัดคาดเอวฉัน
lung | ปอด | Smoking hurts your lungs. | การสูบบุหรี่ทำร้ายปอด
liver | ตับ | Alcohol damages the liver. | แอลกอฮอล์ทำลายตับ
kidney | ไต | Drink water for your kidneys. | ดื่มน้ำเพื่อไต
`);
U('daily', 2, 'สถานที่ในเมืองเพิ่มเติม', `
church | โบสถ์ | There is a church near the school. | มีโบสถ์ใกล้โรงเรียน
cinema | โรงภาพยนตร์ | Let's go to the cinema. | ไปดูหนังกันเถอะ
garage | โรงรถ/อู่ | The car is in the garage. | รถอยู่ในโรงรถ
mall | ห้างสรรพสินค้า | Meet me at the mall. | เจอกันที่ห้าง
pub | ผับ | They met at a pub. | พวกเขาเจอกันที่ผับ
tower | หอคอย/ตึกสูง | The tower is 300 meters tall. | หอคอยสูง 300 เมตร
---
castle | ปราสาท | The king lived in a castle. | กษัตริย์อาศัยในปราสาท
cottage | กระท่อม/บ้านในชนบท | They have a cottage by the lake. | พวกเขามีบ้านพักริมทะเลสาบ
tunnel | อุโมงค์ | The train went into a tunnel. | รถไฟเข้าอุโมงค์
path | ทางเดิน | Follow the path. | เดินตามทาง
yard | สนามหน้าบ้าน | The kids play in the yard. | เด็กๆ เล่นในสนามหน้าบ้าน
fountain | น้ำพุ | Meet me at the fountain. | เจอกันที่น้ำพุ
`);
U('daily', 2, 'เรือและการเดินทางทางน้ำ', `
ship | เรือใหญ่ | The ship left the port. | เรือออกจากท่า
ferry | เรือข้ามฟาก | Take the ferry to the island. | นั่งเรือข้ามฟากไปเกาะ
raft | แพ | They floated on a raft. | พวกเขาลอยบนแพ
sail | ใบเรือ/แล่นเรือ | We sailed to the island. | เราแล่นเรือไปที่เกาะ
deck | ดาดฟ้าเรือ | Let's go up on deck. | ขึ้นไปบนดาดฟ้าเรือกัน
crew | ลูกเรือ/ทีมงาน | The crew helped the passengers. | ลูกเรือช่วยผู้โดยสาร
---
captain | กัปตัน | The captain spoke to us. | กัปตันพูดกับเรา
rocket | จรวด | The rocket went to space. | จรวดขึ้นสู่อวกาศ
tractor | รถแทรกเตอร์ | The farmer drives a tractor. | ชาวนาขับรถแทรกเตอร์
wagon | เกวียน/รถพ่วง | The horse pulled the wagon. | ม้าลากเกวียน
pedal | แป้นเหยียบ/ปั่น | Push the pedal. | เหยียบแป้น
rail | ราง/ราวจับ | Hold the rail. | จับราวไว้
`);
U('daily', 2, 'กริยาท่าทางร่างกาย', `
bend | ก้ม/งอ | Bend your knees. | งอเข่า
bounce | กระเด้ง | The ball bounced high. | ลูกบอลเด้งสูง
crawl | คลาน | The baby can crawl. | ทารกคลานได้แล้ว
drag | ลาก | Don't drag your bag. | อย่าลากกระเป๋า
kneel | คุกเข่า | Kneel down, please. | กรุณาคุกเข่าลง
knock | เคาะ | Knock before you enter. | เคาะก่อนเข้า
---
shrug | ยักไหล่ | He just shrugged. | เขาแค่ยักไหล่
grin | ยิ้มกว้าง | She grinned at me. | เธอยิ้มกว้างให้ฉัน
frown | ขมวดคิ้ว | Why are you frowning? | ทำไมขมวดคิ้วล่ะ
squeeze | บีบ | Squeeze the lemon. | บีบเลมอน
swing | แกว่ง/ชิงช้า | The kids are on the swing. | เด็กๆ เล่นชิงช้า
slide | ลื่นไถล/สไลเดอร์ | The car slid on the wet road. | รถลื่นไถลบนถนนเปียก
`);
U('daily', 3, 'วัสดุต่างๆ', `
metal | โลหะ | The box is made of metal. | กล่องทำจากโลหะ
steel | เหล็กกล้า | The bridge is made of steel. | สะพานทำจากเหล็กกล้า
cotton | ผ้าฝ้าย | This shirt is 100% cotton. | เสื้อนี้ผ้าฝ้าย 100%
wool | ขนแกะ/ผ้าวูล | Wool keeps you warm. | ผ้าวูลช่วยให้อบอุ่น
rubber | ยาง | The tires are made of rubber. | ยางรถทำจากยาง
fabric | ผ้า | Choose the fabric. | เลือกผ้า
---
brick | อิฐ | The wall is made of brick. | กำแพงก่อด้วยอิฐ
clay | ดินเหนียว | She makes pots from clay. | เธอปั้นหม้อจากดินเหนียว
wax | ขี้ผึ้ง | Candles are made of wax. | เทียนทำจากขี้ผึ้ง
ivory | งาช้าง | Selling ivory is illegal. | การขายงาช้างผิดกฎหมาย
feather | ขนนก | It's as light as a feather. | เบาเหมือนขนนก
fur | ขนสัตว์ | The cat has soft fur. | แมวมีขนนุ่ม
`);
U('daily', 3, 'คำบรรยายลักษณะ', `
asleep | หลับอยู่ | The baby is asleep. | ทารกหลับอยู่
awake | ตื่นอยู่ | Are you still awake? | คุณยังตื่นอยู่ไหม
bare | เปล่า/เปลือย | Don't walk in bare feet. | อย่าเดินเท้าเปล่า
comfortable | สบาย | These shoes are comfortable. | รองเท้าคู่นี้ใส่สบาย
damp | ชื้น | The room is damp. | ห้องชื้น
flat | แบน/ห้องชุด | I have a flat tire. | ยางรถฉันแบน
---
neat | เรียบร้อย/เจ๋ง | Your writing is neat. | ลายมือคุณเรียบร้อย
ripe | สุก (ผลไม้) | The mangoes are ripe. | มะม่วงสุกแล้ว
greedy | โลภ | Don't be greedy. | อย่าโลภ
evil | ชั่วร้าย | The villain is evil. | ตัวร้ายชั่วร้าย
deaf | หูหนวก | He is deaf in one ear. | เขาหูหนวกข้างหนึ่ง
disabled | พิการ | This toilet is for disabled people. | ห้องน้ำนี้สำหรับผู้พิการ
`);
U('daily', 3, 'การเกษตรและชนบท', `
crop | พืชผล | The crops need rain. | พืชผลต้องการฝน
harvest | การเก็บเกี่ยว | Rice harvest is in November. | การเก็บเกี่ยวข้าวคือเดือนพฤศจิกายน
wheat | ข้าวสาลี | Bread is made from wheat. | ขนมปังทำจากข้าวสาลี
grain | เมล็ดพืช/ธัญพืช | Eat whole grains. | กินธัญพืชไม่ขัดสี
hay | ฟาง | The horse eats hay. | ม้ากินฟาง
cattle | วัวควาย | The farmer has fifty cattle. | ชาวนามีวัวห้าสิบตัว
---
seed | เมล็ด | Plant the seeds in spring. | ปลูกเมล็ดในฤดูใบไม้ผลิ
soil | ดิน | The soil is rich. | ดินอุดมสมบูรณ์
root | ราก | The tree has deep roots. | ต้นไม้มีรากลึก
fence | รั้ว | Jump over the fence. | กระโดดข้ามรั้ว
mud | โคลน | My shoes are covered in mud. | รองเท้าฉันเปื้อนโคลน
meadow | ทุ่งหญ้า | Sheep graze in the meadow. | แกะเล็มหญ้าในทุ่ง
`);
U('daily', 3, 'แฟนตาซีและนิทาน', `
dragon | มังกร | The dragon breathed fire. | มังกรพ่นไฟ
fairy | นางฟ้า | The fairy granted a wish. | นางฟ้าให้พร
witch | แม่มด | The witch has a black cat. | แม่มดมีแมวดำ
wand | ไม้กายสิทธิ์ | He waved his magic wand. | เขาโบกไม้กายสิทธิ์
magic | เวทมนตร์ | Do you believe in magic? | คุณเชื่อเรื่องเวทมนตร์ไหม
prince | เจ้าชาย | The prince saved the princess. | เจ้าชายช่วยเจ้าหญิง
---
princess | เจ้าหญิง | The princess lived in a castle. | เจ้าหญิงอาศัยในปราสาท
kingdom | อาณาจักร | The kingdom was at peace. | อาณาจักรสงบสุข
throne | บัลลังก์ | The king sat on his throne. | กษัตริย์นั่งบนบัลลังก์
sword | ดาบ | He drew his sword. | เขาชักดาบออกมา
treasure | สมบัติ | They found hidden treasure. | พวกเขาพบสมบัติที่ซ่อนไว้
pirate | โจรสลัด | Pirates attacked the ship. | โจรสลัดโจมตีเรือ
`);

U('basic', 0, 'สัตว์ในสวนสัตว์และฟาร์ม', `
camel | อูฐ | Camels live in the desert. | อูฐอาศัยในทะเลทราย
giraffe | ยีราฟ | The giraffe has a long neck. | ยีราฟคอยาว
zebra | ม้าลาย | The zebra has stripes. | ม้าลายมีลายทาง
donkey | ลา | The donkey carries bags. | ลาแบกกระเป๋า
tortoise | เต่าบก | The tortoise is very old. | เต่าตัวนี้แก่มาก
squirrel | กระรอก | A squirrel is in the tree. | กระรอกอยู่บนต้นไม้
---
ostrich | นกกระจอกเทศ | An ostrich can run fast. | นกกระจอกเทศวิ่งเร็ว
lamb | ลูกแกะ | The lamb is white. | ลูกแกะสีขาว
pony | ม้าแคระ | The kids rode a pony. | เด็กๆ ขี่ม้าแคระ
ox | วัวตัวผู้ (ใช้งาน) | The ox pulls the cart. | วัวลากเกวียน
toad | คางคก | A toad jumped out. | คางคกกระโดดออกมา
turkey | ไก่งวง | We ate turkey. | เรากินไก่งวง
`);
U('daily', 1, 'ในครัวและบนโต๊ะอาหาร', `
oven | เตาอบ | Put the cake in the oven. | ใส่เค้กในเตาอบ
jar | ขวดโหล | Open the jar. | เปิดขวดโหล
lid | ฝา | Put the lid on the pot. | ปิดฝาหม้อ
mug | แก้วมัก | I drink coffee from a mug. | ฉันดื่มกาแฟจากแก้วมัก
tray | ถาด | Put the cups on the tray. | วางแก้วบนถาด
napkin | กระดาษเช็ดปาก | Can I have a napkin? | ขอกระดาษเช็ดปากหน่อย
---
saucer | จานรองแก้ว | Put the cup on the saucer. | วางแก้วบนจานรอง
pepper | พริกไทย | Add salt and pepper. | ใส่เกลือและพริกไทย
flour | แป้ง | We need flour to make bread. | ต้องใช้แป้งทำขนมปัง
gravy | น้ำราด (เกรวี) | Pour gravy on the chicken. | ราดน้ำเกรวีบนไก่
jelly | เยลลี่ | Kids love jelly. | เด็กๆ ชอบเยลลี่
pudding | พุดดิ้ง | We had pudding for dessert. | เรากินพุดดิ้งเป็นของหวาน
`);
U('daily', 1, 'ห้องต่างๆ ในบ้านเพิ่มเติม', `
wardrobe | ตู้เสื้อผ้า | Hang your clothes in the wardrobe. | แขวนเสื้อผ้าในตู้
closet | ตู้ติดผนัง | The shoes are in the closet. | รองเท้าอยู่ในตู้
rug | พรมผืนเล็ก | The rug is by the door. | พรมอยู่ข้างประตู
mat | เสื่อ/พรมเช็ดเท้า | Wipe your feet on the mat. | เช็ดเท้าบนพรม
sponge | ฟองน้ำ | Clean it with a sponge. | ทำความสะอาดด้วยฟองน้ำ
tub | อ่าง | Fill the tub with water. | เติมน้ำในอ่าง
---
tap | ก๊อกน้ำ | Turn off the tap. | ปิดก๊อกน้ำ
tile | กระเบื้อง | The floor tiles are cold. | กระเบื้องพื้นเย็น
stair | บันได (ขั้น) | He fell down the stairs. | เขาตกบันได
balcony | ระเบียง | I drink coffee on the balcony. | ฉันดื่มกาแฟที่ระเบียง
basement | ห้องใต้ดิน | The box is in the basement. | กล่องอยู่ในห้องใต้ดิน
porch | ชานบ้าน | Leave the parcel on the porch. | วางพัสดุไว้ที่ชานบ้าน
`);
U('daily', 1, 'ต้นไม้และดอกไม้', `
branch | กิ่งไม้/สาขา | A bird sat on a branch. | นกเกาะกิ่งไม้
bush | พุ่มไม้ | The thief hid behind a bush. | ขโมยซ่อนหลังพุ่มไม้
oak | ต้นโอ๊ก | The oak tree is very old. | ต้นโอ๊กแก่มาก
pine | ต้นสน | Pine trees grow on the mountain. | ต้นสนขึ้นบนภูเขา
palm | ต้นปาล์ม/ฝ่ามือ | Palm trees grow by the sea. | ต้นปาล์มขึ้นริมทะเล
rose | ดอกกุหลาบ | He gave her a red rose. | เขาให้กุหลาบแดงเธอ
---
tulip | ดอกทิวลิป | Tulips come from Holland. | ทิวลิปมาจากฮอลแลนด์
petal | กลีบดอก | The petals are pink. | กลีบดอกสีชมพู
stem | ลำต้น/ก้าน | Cut the stem. | ตัดก้าน
thorn | หนาม | Roses have thorns. | กุหลาบมีหนาม
vine | เถาวัลย์ | Vines covered the wall. | เถาวัลย์ปกคลุมกำแพง
weed | วัชพืช | Pull out the weeds. | ถอนวัชพืช
`);
U('daily', 2, 'ธรรมชาติและพื้นดิน', `
fog | หมอก | Drive slowly in the fog. | ขับช้าๆ ในหมอก
mist | หมอกบาง | Mist covered the lake. | หมอกบางปกคลุมทะเลสาบ
dew | น้ำค้าง | The grass is wet with dew. | หญ้าเปียกน้ำค้าง
dawn | รุ่งอรุณ | We left at dawn. | เราออกเดินทางตอนรุ่งสาง
flame | เปลวไฟ | The flames were very high. | เปลวไฟสูงมาก
spark | ประกายไฟ | A spark started the fire. | ประกายไฟทำให้เกิดไฟไหม้
---
volcano | ภูเขาไฟ | The volcano erupted. | ภูเขาไฟระเบิด
coast | ชายฝั่ง | We drove along the coast. | เราขับรถเลียบชายฝั่ง
edge | ขอบ | Don't stand on the edge. | อย่ายืนที่ขอบ
hole | หลุม/รู | There is a hole in my sock. | ถุงเท้าฉันมีรู
ditch | คูน้ำ/ร่อง | The car fell into a ditch. | รถตกคูน้ำ
dirt | ดิน/สิ่งสกปรก | His hands were covered in dirt. | มือเขาเปื้อนดิน
`);
U('daily', 2, 'ของเล่นและงานอดิเรก', `
kite | ว่าว | Let's fly a kite. | ไปเล่นว่าวกัน
dice | ลูกเต๋า | Roll the dice. | ทอยลูกเต๋า
puppet | หุ่นมือ/หุ่นเชิด | The puppet show was fun. | การแสดงหุ่นสนุก
robot | หุ่นยนต์ | The robot can clean. | หุ่นยนต์ทำความสะอาดได้
comic | การ์ตูน/ตลก | I read comics. | ฉันอ่านการ์ตูน
golf | กอล์ฟ | My boss plays golf. | หัวหน้าฉันเล่นกอล์ฟ
---
hockey | ฮอกกี้ | They play ice hockey. | พวกเขาเล่นฮอกกี้น้ำแข็ง
ski | เล่นสกี | I want to learn to ski. | ฉันอยากหัดเล่นสกี
sled | เลื่อนหิมะ | Kids rode a sled down the hill. | เด็กๆ นั่งเลื่อนลงเนิน
knit | ถัก (ไหมพรม) | Grandma knitted a scarf. | ยายถักผ้าพันคอ
sew | เย็บ | Can you sew a button? | คุณเย็บกระดุมเป็นไหม
poem | บทกวี | She wrote a poem. | เธอเขียนบทกวี
`);
U('daily', 2, 'ดนตรีศิลปะและชื่อเสียง', `
choir | คณะนักร้องประสานเสียง | She sings in a choir. | เธอร้องในคณะประสานเสียง
orchestra | วงออร์เคสตรา | The orchestra played well. | วงออร์เคสตราเล่นได้ดี
flute | ขลุ่ย | He plays the flute. | เขาเป่าขลุ่ย
poet | กวี | He is a famous poet. | เขาเป็นกวีชื่อดัง
frame | กรอบรูป | Put the photo in a frame. | ใส่รูปในกรอบ
chalk | ชอล์ก | Write on the board with chalk. | เขียนกระดานด้วยชอล์ก
---
circus | ละครสัตว์ | We went to the circus. | เราไปดูละครสัตว์
idol | ไอดอล/ดารา | She is my idol. | เธอเป็นไอดอลของฉัน
fame | ชื่อเสียง | He wants fame and money. | เขาต้องการชื่อเสียงและเงิน
fashion | แฟชั่น | She works in fashion. | เธอทำงานด้านแฟชั่น
prize | รางวัล | He won first prize. | เขาได้รางวัลที่หนึ่ง
diary | ไดอารี่ | I write in my diary every night. | ฉันเขียนไดอารี่ทุกคืน
`);
U('daily', 2, 'กริยาในชีวิตประจำวัน: ชุดเสริม 1', `
bless | อวยพร | God bless you. | ขอพระเจ้าคุ้มครองคุณ
bury | ฝัง | The dog buried a bone. | สุนัขฝังกระดูก
dare | กล้า/ท้า | I dare you to try. | ฉันท้าให้คุณลอง
dip | จุ่ม | Dip the bread in the soup. | จุ่มขนมปังในซุป
drip | หยด | Water is dripping from the roof. | น้ำหยดจากหลังคา
fasten | รัด/ติด | Fasten your seat belt. | คาดเข็มขัดนิรภัย
---
freeze | แช่แข็ง/หยุดนิ่ง | Freeze! Police! | หยุด! ตำรวจ!
grind | บด | Grind the coffee beans. | บดเมล็ดกาแฟ
growl | คำราม | The dog growled at me. | สุนัขคำรามใส่ฉัน
hatch | ฟักออกจากไข่ | The eggs will hatch soon. | ไข่จะฟักเร็วๆ นี้
scratch | ข่วน/เกา | The cat scratched me. | แมวข่วนฉัน
spill | ทำหก | I spilled my coffee. | ฉันทำกาแฟหก
`);
U('daily', 2, 'กริยาในชีวิตประจำวัน: ชุดเสริม 2', `
spit | ถุย/บ้วน | Don't spit on the street. | อย่าถ่มน้ำลายบนถนน
sting | ต่อย (แมลง) | The bee stung my hand. | ผึ้งต่อยมือฉัน
shave | โกน | He shaves every morning. | เขาโกนหนวดทุกเช้า
roast | ย่าง/อบ | Roast the chicken. | อบไก่
rot | เน่า | The fruit will rot. | ผลไม้จะเน่า
trick | หลอก/กลอุบาย | He tricked me. | เขาหลอกฉัน
---
beg | ขอร้อง/ขอทาน | I beg you, please help. | ฉันขอร้อง ช่วยด้วย
bark | เห่า | The dog barks at night. | สุนัขเห่าตอนกลางคืน
bloom | บาน (ดอกไม้) | The flowers bloom in spring. | ดอกไม้บานในฤดูใบไม้ผลิ
blow | พัด/เป่า | Blow out the candles. | เป่าเทียน
bow | โค้ง/คำนับ | He bowed to the king. | เขาโค้งคำนับกษัตริย์
crack | ร้าว/แตก | The glass cracked. | แก้วร้าว
`);
U('daily', 3, 'คำนามนามธรรมที่ใช้บ่อย', `
anger | ความโกรธ | He couldn't control his anger. | เขาควบคุมความโกรธไม่ได้
appetite | ความอยากอาหาร | I have no appetite. | ฉันไม่อยากอาหาร
beauty | ความงาม | The beauty of nature is amazing. | ความงามของธรรมชาติน่าทึ่ง
behavior | พฤติกรรม | His behavior was strange. | พฤติกรรมของเขาแปลก
birth | การเกิด | What is your date of birth? | วันเกิดของคุณคือวันไหน
breath | ลมหายใจ | Take a deep breath. | หายใจเข้าลึกๆ
---
freedom | อิสรภาพ | Freedom is precious. | อิสรภาพเป็นสิ่งล้ำค่า
century | ศตวรรษ | The temple is a century old. | วัดนี้อายุหนึ่งร้อยปี
gossip | การนินทา | Don't listen to gossip. | อย่าฟังคำนินทา
chat | การคุยเล่น | We had a nice chat. | เราคุยกันสนุก
journal | วารสาร/บันทึก | Keep a daily journal. | จดบันทึกประจำวัน
mess | ความยุ่งเหยิง | Your room is a mess. | ห้องคุณรกมาก
`);
U('daily', 3, 'ของใช้รอบตัวเพิ่มเติม', `
candle | เทียน | Light a candle. | จุดเทียน
chain | โซ่ | Lock your bike with a chain. | ล็อกจักรยานด้วยโซ่
cable | สายเคเบิล | Plug in the cable. | เสียบสาย
cage | กรง | The bird is in a cage. | นกอยู่ในกรง
clip | คลิป/ที่หนีบ | Use a clip to hold the papers. | ใช้ที่หนีบกระดาษ
code | รหัส | Enter the code. | ใส่รหัส
---
string | เชือกเส้นเล็ก | Tie it with string. | ผูกด้วยเชือก
stripe | ลายทาง | The shirt has blue stripes. | เสื้อมีลายทางสีน้ำเงิน
knot | ปม | Tie a knot. | ผูกปม
lace | เชือกผูกรองเท้า/ลูกไม้ | Tie your shoelaces. | ผูกเชือกรองเท้า
yarn | ไหมพรม | She bought red yarn. | เธอซื้อไหมพรมสีแดง
zip | ซิป/รูดซิป | Zip up your jacket. | รูดซิปเสื้อแจ็กเก็ต
`);
U('daily', 3, 'ส่วนต่างๆ ของสัตว์', `
claw | กรงเล็บ | The cat has sharp claws. | แมวมีกรงเล็บคม
paw | อุ้งเท้า | The dog hurt its paw. | สุนัขเจ็บอุ้งเท้า
wing | ปีก | The bird broke its wing. | นกปีกหัก
nest | รัง | Birds build nests. | นกสร้างรัง
web | ใยแมงมุม/เว็บ | A spider made a web. | แมงมุมชักใย
skeleton | โครงกระดูก | They found a skeleton. | พวกเขาพบโครงกระดูก
---
skull | กะโหลก | The skull was cracked. | กะโหลกร้าว
spine | กระดูกสันหลัง | He hurt his spine. | เขาบาดเจ็บกระดูกสันหลัง
shell | เปลือก/กระดอง | The turtle hid in its shell. | เต่าหลบในกระดอง
hive | รังผึ้ง | Don't touch the hive. | อย่าแตะรังผึ้ง
flock | ฝูง (นก/แกะ) | A flock of birds flew by. | ฝูงนกบินผ่าน
creature | สิ่งมีชีวิต | It was a strange creature. | มันเป็นสิ่งมีชีวิตประหลาด
`);
U('daily', 3, 'สถานที่ในชนบท', `
hut | กระท่อม | They live in a small hut. | พวกเขาอยู่ในกระท่อมเล็กๆ
cabin | กระท่อมไม้/ห้องโดยสาร | We stayed in a cabin. | เราพักในกระท่อมไม้
shed | เพิง/โรงเก็บของ | The tools are in the shed. | เครื่องมืออยู่ในโรงเก็บของ
mill | โรงสี | The rice mill is busy. | โรงสีข้าวยุ่งมาก
dam | เขื่อน | The dam holds back the water. | เขื่อนกักน้ำไว้
mine | เหมือง/ของฉัน | He works in a gold mine. | เขาทำงานในเหมืองทอง
---
lawn | สนามหญ้า | Mow the lawn. | ตัดหญ้าในสนาม
hedge | รั้วต้นไม้ | Trim the hedge. | ตัดแต่งรั้วต้นไม้
trail | เส้นทางเดินป่า | Follow the trail. | เดินตามเส้นทาง
pit | หลุม/บ่อ | He fell into a pit. | เขาตกหลุม
pole | เสา | The flag is on a pole. | ธงอยู่บนเสา
farmhouse | บ้านในไร่ | They live in an old farmhouse. | พวกเขาอยู่บ้านไร่หลังเก่า
`);
U('daily', 3, 'คำคุณศัพท์และคำวิเศษณ์เพิ่มเติม', `
accidentally | โดยบังเอิญ/ไม่ได้ตั้งใจ | I accidentally deleted the file. | ฉันเผลอลบไฟล์
apart | ห่างกัน/แยกกัน | They live apart. | พวกเขาอยู่แยกกัน
attractive | น่าดึงดูด/หน้าตาดี | She is very attractive. | เธอดูดีมาก
automatic | อัตโนมัติ | The door is automatic. | ประตูเป็นแบบอัตโนมัติ
backward | ถอยหลัง | Take one step backward. | ถอยหลังหนึ่งก้าว
blond | ผมบลอนด์ | She has blond hair. | เธอผมสีบลอนด์
---
fancy | หรูหรา | It's a fancy restaurant. | เป็นร้านอาหารหรู
giant | ยักษ์/ใหญ่มาก | It was a giant wave. | เป็นคลื่นยักษ์
ill | ป่วย | He is ill in bed. | เขาป่วยนอนอยู่บนเตียง
kind | ใจดี/ชนิด | What kind of music do you like? | คุณชอบเพลงแนวไหน
hardly | แทบจะไม่ | I can hardly hear you. | ฉันแทบไม่ได้ยินคุณ
dear | ที่รัก/เรียน (จดหมาย) | Dear Sir, | เรียน ท่าน
`);
U('daily', 4, 'บุคคลในสังคมและประวัติศาสตร์', `
lord | ท่านลอร์ด/เจ้านาย | The lord owned the land. | ท่านลอร์ดเป็นเจ้าของที่ดิน
slave | ทาส | Slaves worked in the fields. | ทาสทำงานในไร่
tribe | ชนเผ่า | The tribe lives in the forest. | ชนเผ่าอาศัยอยู่ในป่า
navy | กองทัพเรือ | He joined the navy. | เขาเข้ากองทัพเรือ
maid | แม่บ้าน | The maid cleaned the room. | แม่บ้านทำความสะอาดห้อง
clerk | เสมียน/พนักงาน | Ask the clerk at the desk. | ถามพนักงานที่โต๊ะ
---
shepherd | คนเลี้ยงแกะ | The shepherd watched the sheep. | คนเลี้ยงแกะดูแลฝูงแกะ
nun | แม่ชี | The nun teaches at the school. | แม่ชีสอนที่โรงเรียน
pupil | นักเรียน/รูม่านตา | The school has 500 pupils. | โรงเรียนมีนักเรียน 500 คน
mammal | สัตว์เลี้ยงลูกด้วยนม | Whales are mammals. | วาฬเป็นสัตว์เลี้ยงลูกด้วยนม
dinosaur | ไดโนเสาร์ | Dinosaurs lived long ago. | ไดโนเสาร์มีชีวิตอยู่นานมาแล้ว
giant panda | แพนด้ายักษ์ | The giant panda eats bamboo. | แพนด้ายักษ์กินไผ่
`);
U('daily', 4, 'สารและเครื่องจักร', `
pill | ยาเม็ด | Take one pill a day. | กินยาวันละเม็ด
poison | ยาพิษ | The rat poison is dangerous. | ยาเบื่อหนูอันตราย
powder | ผง | It's a white powder. | เป็นผงสีขาว
bomb | ระเบิด | Police found a bomb. | ตำรวจพบระเบิด
cigarette | บุหรี่ | He lit a cigarette. | เขาจุดบุหรี่
clinic | คลินิก | Go to the clinic. | ไปคลินิก
---
liquid | ของเหลว | No liquids on the plane. | ห้ามนำของเหลวขึ้นเครื่อง
tube | หลอด/ท่อ | A tube of toothpaste. | ยาสีฟันหนึ่งหลอด
tank | ถัง/รถถัง | Fill up the tank. | เติมน้ำมันให้เต็มถัง
pump | ปั๊ม/สูบ | Pump up the tire. | สูบลมยาง
motor | มอเตอร์ | The motor is broken. | มอเตอร์เสีย
radar | เรดาร์ | Police use radar to check speed. | ตำรวจใช้เรดาร์ตรวจความเร็ว
`);
U('daily', 4, 'การวัดและปริมาณ', `
inch | นิ้ว (หน่วยวัด) | It's six inches long. | ยาวหกนิ้ว
pint | ไพนต์ (หน่วยตวง) | A pint of milk, please. | ขอนมหนึ่งไพนต์
cent | เซนต์ | It costs ninety cents. | ราคาเก้าสิบเซนต์
bunch | พวง/กลุ่ม | A bunch of bananas. | กล้วยหนึ่งหวี
pile | กอง | A pile of clothes. | กองเสื้อผ้า
lump | ก้อน | There is a lump on his head. | หัวเขามีก้อนบวม
---
loaf | ก้อน (ขนมปัง) | Buy a loaf of bread. | ซื้อขนมปังหนึ่งก้อน
sack | กระสอบ | A sack of rice. | ข้าวหนึ่งกระสอบ
layer | ชั้น | Add a layer of cheese. | ใส่ชีสอีกชั้น
scale | ตาชั่ง/ขนาด | Weigh it on the scale. | ชั่งบนตาชั่ง
gap | ช่องว่าง | Mind the gap. | ระวังช่องว่าง
dot | จุด | Connect the dots. | ลากเส้นเชื่อมจุด
`);

U('daily', 1, 'อาหารและวัตถุดิบเพิ่มเติม', `
bean | ถั่ว | I like green beans. | ฉันชอบถั่วแขก
corn | ข้าวโพด | Grilled corn is my favorite snack. | ข้าวโพดปิ้งเป็นของว่างที่ฉันชอบ
cucumber | แตงกวา | Slice the cucumber. | หั่นแตงกวา
mushroom | เห็ด | Add some mushrooms. | ใส่เห็ดหน่อย
salmon | ปลาแซลมอน | I ordered grilled salmon. | ฉันสั่งแซลมอนย่าง
pickle | ผักดอง | I don't like pickles. | ฉันไม่ชอบผักดอง
---
ginger | ขิง | Ginger tea is good for colds. | ชาขิงดีต่ออาการหวัด
spice | เครื่องเทศ | Thai food uses many spices. | อาหารไทยใช้เครื่องเทศหลายอย่าง
cream | ครีม | Coffee with cream, please. | ขอกาแฟใส่ครีม
crumb | เศษ (ขนม) | There are crumbs on the table. | มีเศษขนมบนโต๊ะ
nut | ถั่ว (เปลือกแข็ง) | He is allergic to nuts. | เขาแพ้ถั่ว
dish | จาน/อาหาร (จานหนึ่ง) | Pad Thai is a famous dish. | ผัดไทยเป็นอาหารที่มีชื่อเสียง
`);
U('daily', 1, 'ของใช้ทั่วไปเพิ่มเติม', `
bench | ม้านั่ง | Sit on the bench. | นั่งบนม้านั่ง
stool | เก้าอี้ไม่มีพนัก | He sat on a stool. | เขานั่งบนเก้าอี้สตูล
vase | แจกัน | Put the flowers in a vase. | ใส่ดอกไม้ในแจกัน
net | ตาข่าย | The ball hit the net. | ลูกบอลโดนตาข่าย
hook | ตะขอ | Hang your coat on the hook. | แขวนเสื้อบนตะขอ
wig | วิก/ผมปลอม | The thief wore a wig. | ขโมยใส่วิก
---
rag | ผ้าขี้ริ้ว | Clean it with a rag. | เช็ดด้วยผ้าขี้ริ้ว
mail | จดหมาย/ไปรษณีย์ | Did you check the mail? | คุณเช็กจดหมายหรือยัง
lift | ลิฟต์/ยก | Take the lift to the fifth floor. | ขึ้นลิฟต์ไปชั้นห้า
pool | สระว่ายน้ำ | The hotel has a pool. | โรงแรมมีสระว่ายน้ำ
flag | ธง | The Thai flag has three colors. | ธงไทยมีสามสี
gum | หมากฝรั่ง/เหงือก | Don't chew gum in class. | ห้ามเคี้ยวหมากฝรั่งในห้องเรียน
`);
U('daily', 2, 'คำทั่วไปที่ใช้บ่อย', `
adore | รักมาก/ชื่นชอบมาก | I adore my grandmother. | ฉันรักยายมาก
curl | ม้วน/ลอนผม | She has curls in her hair. | เธอมีผมลอน
punch | ต่อย | He punched the wall. | เขาต่อยกำแพง
race | การแข่ง/เชื้อชาติ | Who won the race? | ใครชนะการแข่ง
match | การแข่งขัน/ไม้ขีดไฟ | The match starts at seven. | การแข่งขันเริ่มหนึ่งทุ่ม
cross | ข้าม/กากบาท | Cross the road carefully. | ข้ามถนนอย่างระมัดระวัง
---
tear | ฉีก/น้ำตา | Don't tear the paper. | อย่าฉีกกระดาษ
rust | สนิม | The old car is full of rust. | รถเก่าเต็มไปด้วยสนิม
shadow | เงา | I saw a shadow at the window. | ฉันเห็นเงาที่หน้าต่าง
flash | แสงวาบ/แฟลช | Turn off the flash. | ปิดแฟลช
channel | ช่อง | Change the channel. | เปลี่ยนช่อง
exam | การสอบ | The police exam is next month. | สอบตำรวจเดือนหน้า
`);
U('daily', 2, 'เครื่องมือและของโบราณ', `
blade | ใบมีด | The blade is very sharp. | ใบมีดคมมาก
saw | เลื่อย | Cut the wood with a saw. | ตัดไม้ด้วยเลื่อย
spade | เสียม/จอบ | Dig with a spade. | ขุดด้วยเสียม
rake | คราด | Use a rake to collect leaves. | ใช้คราดกวาดใบไม้
rod | คันเบ็ด/แท่ง | He has a fishing rod. | เขามีคันเบ็ด
whip | แส้ | The rider used a whip. | คนขี่ใช้แส้
---
spear | หอก | The hunter threw a spear. | นักล่าขว้างหอก
saddle | อานม้า | Put the saddle on the horse. | วางอานบนหลังม้า
paddle | ไม้พาย/พาย | Paddle the boat. | พายเรือ
crane | ปั้นจั่น/นกกระเรียน | A crane lifted the car. | ปั้นจั่นยกรถขึ้น
compass | เข็มทิศ | Use a compass to find north. | ใช้เข็มทิศหาทิศเหนือ
crown | มงกุฎ | The queen wore a crown. | ราชินีสวมมงกุฎ
`);
U('daily', 2, 'คำนามหลากหลายในชีวิต', `
allowance | ค่าขนม/เบี้ยเลี้ยง | My son gets a weekly allowance. | ลูกชายได้ค่าขนมรายสัปดาห์
capital | เมืองหลวง/ทุน | Bangkok is the capital of Thailand. | กรุงเทพฯ เป็นเมืองหลวงของไทย
chip | ชิ้นเล็ก/ชิป/มันฝรั่งทอด | A bag of potato chips. | มันฝรั่งทอดหนึ่งถุง
coal | ถ่านหิน | Coal pollutes the air. | ถ่านหินก่อมลพิษทางอากาศ
column | คอลัมน์/เสา | Read the first column. | อ่านคอลัมน์แรก
cycle | วงจร/ปั่นจักรยาน | I cycle to work. | ฉันปั่นจักรยานไปทำงาน
---
dairy | ผลิตภัณฑ์นม | I can't eat dairy. | ฉันกินผลิตภัณฑ์นมไม่ได้
drain | ท่อระบายน้ำ | The drain is blocked. | ท่อระบายน้ำตัน
folk | พื้นบ้าน/ผู้คน | I like Thai folk music. | ฉันชอบเพลงพื้นบ้านไทย
grave | หลุมศพ/ร้ายแรง | We visited his grave. | เราไปเยี่ยมหลุมศพของเขา
jail | คุก | He spent a year in jail. | เขาติดคุกหนึ่งปี
kid | เด็ก | The kids are playing outside. | เด็กๆ เล่นอยู่ข้างนอก
`);
U('daily', 3, 'อุปนิสัยและความรู้สึกเชิงนามธรรม', `
confidence | ความมั่นใจ | Speak with confidence. | พูดอย่างมั่นใจ
confusion | ความสับสน | There was confusion at the scene. | เกิดความสับสนที่ที่เกิดเหตุ
courtesy | ความสุภาพ | Treat people with courtesy. | ปฏิบัติต่อผู้คนอย่างสุภาพ
creativity | ความคิดสร้างสรรค์ | The job needs creativity. | งานนี้ต้องใช้ความคิดสร้างสรรค์
curiosity | ความอยากรู้อยากเห็น | Children are full of curiosity. | เด็กเต็มไปด้วยความอยากรู้
enthusiasm | ความกระตือรือร้น | She works with enthusiasm. | เธอทำงานอย่างกระตือรือร้น
---
apology | คำขอโทษ | Please accept my apology. | โปรดรับคำขอโทษของฉัน
arrogance | ความหยิ่งยโส | His arrogance made people angry. | ความหยิ่งของเขาทำให้คนโกรธ
destiny | โชคชะตา | It was his destiny. | มันคือโชคชะตาของเขา
distinction | ความแตกต่าง/เกียรตินิยม | She graduated with distinction. | เธอจบเกียรตินิยม
elegance | ความสง่างาม | She dresses with elegance. | เธอแต่งตัวสง่างาม
exception | ข้อยกเว้น | There are no exceptions. | ไม่มีข้อยกเว้น
`);
U('daily', 3, 'การศึกษาและมหาวิทยาลัย', `
campus | มหาวิทยาลัย (พื้นที่) | The campus is very big. | มหาวิทยาลัยกว้างมาก
classmate | เพื่อนร่วมชั้น | He was my classmate. | เขาเคยเป็นเพื่อนร่วมชั้นของฉัน
curriculum | หลักสูตร | The curriculum includes English. | หลักสูตรรวมภาษาอังกฤษ
diploma | ประกาศนียบัตร | She got her diploma. | เธอได้รับประกาศนียบัตร
dormitory | หอพัก | Students live in the dormitory. | นักศึกษาอาศัยในหอพัก
biology | ชีววิทยา | I study biology. | ฉันเรียนชีววิทยา
---
chemistry | เคมี | Chemistry is hard. | เคมียาก
attendance | การเข้าเรียน/เข้าร่วม | Attendance is important. | การเข้าเรียนสำคัญ
admission | การรับเข้า/ค่าเข้า | Admission is free. | เข้าฟรี
certificate | ใบรับรอง/ประกาศนียบัตร | Show your birth certificate. | แสดงสูติบัตรของคุณ
biography | ชีวประวัติ | I read his biography. | ฉันอ่านชีวประวัติของเขา
edition | ฉบับ/พิมพ์ครั้งที่ | This is the new edition. | นี่คือฉบับใหม่
`);
U('daily', 3, 'การเดินทางและสถานที่สำคัญ', `
destination | จุดหมายปลายทาง | Phuket is a popular destination. | ภูเก็ตเป็นจุดหมายยอดนิยม
avenue | ถนนใหญ่ | Walk down the avenue. | เดินไปตามถนนใหญ่
bay | อ่าว | The boat is in the bay. | เรืออยู่ในอ่าว
cathedral | มหาวิหาร | We visited an old cathedral. | เราไปเยี่ยมมหาวิหารเก่า
cemetery | สุสาน | He was buried in the cemetery. | เขาถูกฝังที่สุสาน
corridor | ทางเดิน (ในอาคาร) | Wait in the corridor. | รอที่ทางเดิน
---
baggage | สัมภาระ | Collect your baggage. | รับสัมภาระของคุณ
aircraft | อากาศยาน | The aircraft landed safely. | เครื่องบินลงจอดอย่างปลอดภัย
cargo | สินค้าบรรทุก | The ship carried cargo. | เรือบรรทุกสินค้า
altitude | ความสูง (จากระดับน้ำทะเล) | We are flying at high altitude. | เรากำลังบินที่ระดับความสูง
astronaut | นักบินอวกาศ | He wants to be an astronaut. | เขาอยากเป็นนักบินอวกาศ
cyclist | คนปั่นจักรยาน | Watch out for cyclists. | ระวังคนปั่นจักรยาน
`);
U('daily', 3, 'ธุรกิจและการค้าเพิ่มเติม', `
client | ลูกค้า | I have a meeting with a client. | ฉันมีนัดกับลูกค้า
commerce | การค้า | Online commerce is growing. | การค้าออนไลน์กำลังเติบโต
commodity | สินค้าโภคภัณฑ์ | Rice is an important commodity. | ข้าวเป็นสินค้าสำคัญ
corporation | บริษัทใหญ่ | He works for a big corporation. | เขาทำงานให้บริษัทใหญ่
auction | การประมูล | The car was sold at auction. | รถถูกขายทอดตลาด
bankruptcy | การล้มละลาย | The company faced bankruptcy. | บริษัทเผชิญการล้มละลาย
---
deficit | การขาดดุล | The budget has a deficit. | งบประมาณขาดดุล
dividend | เงินปันผล | Shareholders received a dividend. | ผู้ถือหุ้นได้รับเงินปันผล
expenditure | รายจ่าย | Cut your expenditure. | ลดรายจ่าย
expertise | ความเชี่ยวชาญ | We need your expertise. | เราต้องการความเชี่ยวชาญของคุณ
brochure | แผ่นพับ | Take a brochure. | หยิบแผ่นพับไป
bureau | สำนักงาน/กรม | The tourist bureau can help. | สำนักงานท่องเที่ยวช่วยได้
`);
U('daily', 4, 'วิทยาศาสตร์และธรรมชาติขั้นกลาง', `
atmosphere | บรรยากาศ | The atmosphere was friendly. | บรรยากาศเป็นกันเอง
bacteria | แบคทีเรีย | Wash your hands to kill bacteria. | ล้างมือเพื่อฆ่าเชื้อแบคทีเรีย
carbon | คาร์บอน | Trees absorb carbon. | ต้นไม้ดูดซับคาร์บอน
chemical | สารเคมี | Don't touch the chemicals. | อย่าแตะสารเคมี
circuit | วงจร | The circuit is broken. | วงจรขาด
density | ความหนาแน่น | Bangkok has a high population density. | กรุงเทพฯ มีความหนาแน่นประชากรสูง
---
ecology | นิเวศวิทยา | Pollution harms the ecology. | มลพิษทำร้ายระบบนิเวศ
equation | สมการ | Solve the equation. | แก้สมการ
evolution | วิวัฒนาการ | Darwin studied evolution. | ดาร์วินศึกษาวิวัฒนาการ
extinction | การสูญพันธุ์ | Many species face extinction. | หลายสายพันธุ์เสี่ยงต่อการสูญพันธุ์
epidemic | โรคระบาด | There was a flu epidemic. | มีการระบาดของไข้หวัด
calcium | แคลเซียม | Milk has calcium. | นมมีแคลเซียม
`);
U('daily', 4, 'สังคมการเมืองและประวัติศาสตร์', `
ambassador | เอกอัครราชทูต | The ambassador visited the school. | เอกอัครราชทูตมาเยี่ยมโรงเรียน
ballot | บัตรเลือกตั้ง | Put your ballot in the box. | หย่อนบัตรเลือกตั้งลงหีบ
boycott | คว่ำบาตร | They boycotted the shop. | พวกเขาคว่ำบาตรร้าน
capitalism | ทุนนิยม | Capitalism is an economic system. | ทุนนิยมเป็นระบบเศรษฐกิจ
colony | อาณานิคม | Thailand was never a colony. | ไทยไม่เคยเป็นอาณานิคม
committee | คณะกรรมการ | The committee will decide. | คณะกรรมการจะตัดสินใจ
---
commission | คณะกรรมการ/ค่าคอมมิชชัน | He earns a commission on sales. | เขาได้ค่าคอมมิชชันจากยอดขาย
conference | การประชุมใหญ่ | The conference is in Bangkok. | การประชุมจัดที่กรุงเทพฯ
convention | การประชุมใหญ่/ธรรมเนียม | It's a convention to shake hands. | การจับมือเป็นธรรมเนียม
civilization | อารยธรรม | Ancient civilizations were amazing. | อารยธรรมโบราณน่าทึ่ง
dynasty | ราชวงศ์ | The dynasty ruled for 200 years. | ราชวงศ์ปกครอง 200 ปี
empire | จักรวรรดิ | The Roman Empire was huge. | จักรวรรดิโรมันกว้างใหญ่
`);
U('daily', 4, 'การเปลี่ยนแปลงและคุณภาพงาน', `
expansion | การขยายตัว | The city's expansion is fast. | เมืองขยายตัวเร็ว
exploration | การสำรวจ | Space exploration is expensive. | การสำรวจอวกาศมีค่าใช้จ่ายสูง
expedition | การสำรวจ (เดินทางไกล) | They went on an expedition. | พวกเขาออกเดินทางสำรวจ
explosion | การระเบิด | We heard a loud explosion. | เราได้ยินเสียงระเบิดดัง
exposure | การสัมผัส/การเปิดเผย | Avoid exposure to the sun. | หลีกเลี่ยงการตากแดด
emergence | การเกิดขึ้น | The emergence of AI changed work. | การเกิดขึ้นของ AI เปลี่ยนการทำงาน
---
abundance | ความอุดมสมบูรณ์ | Fruit grows in abundance here. | ที่นี่ผลไม้อุดมสมบูรณ์
accuracy | ความแม่นยำ | Check the accuracy of the data. | ตรวจความแม่นยำของข้อมูล
efficiency | ประสิทธิภาพ | We must improve efficiency. | เราต้องปรับปรุงประสิทธิภาพ
complexity | ความซับซ้อน | The complexity of the case is high. | คดีนี้ซับซ้อนมาก
conservation | การอนุรักษ์ | Wildlife conservation is important. | การอนุรักษ์สัตว์ป่าสำคัญ
duration | ระยะเวลา | The duration of the course is six weeks. | คอร์สนี้ใช้เวลาหกสัปดาห์
`);
U('daily', 3, 'ผู้คนและงานเลี้ยง', `
banquet | งานเลี้ยงใหญ่ | The banquet starts at seven. | งานเลี้ยงเริ่มหนึ่งทุ่ม
carnival | งานคาร์นิวัล | The carnival was colorful. | งานคาร์นิวัลมีสีสัน
celebrity | คนดัง | She is a celebrity. | เธอเป็นคนดัง
beverage | เครื่องดื่ม | Beverages are free. | เครื่องดื่มฟรี
amusement | ความบันเทิง | We went to an amusement park. | เราไปสวนสนุก
cartoon | การ์ตูน | Kids watch cartoons. | เด็กๆ ดูการ์ตูน
---
acquaintance | คนรู้จัก | He is just an acquaintance. | เขาเป็นแค่คนรู้จัก
bachelor | ชายโสด/ปริญญาตรี | He has a bachelor's degree. | เขามีปริญญาตรี
ancestor | บรรพบุรุษ | We respect our ancestors. | เราเคารพบรรพบุรุษ
descendant | ลูกหลาน/ผู้สืบเชื้อสาย | He is a descendant of the king. | เขาเป็นผู้สืบเชื้อสายของกษัตริย์
emperor | จักรพรรดิ | The emperor ruled China. | จักรพรรดิปกครองจีน
beggar | ขอทาน | A beggar asked for money. | ขอทานขอเงิน
`);
U('daily', 3, 'คำนามทั่วไปขั้นกลาง', `
advocate | ผู้สนับสนุน/ทนาย | She is an advocate for women's rights. | เธอเป็นผู้สนับสนุนสิทธิสตรี
agriculture | เกษตรกรรม | Agriculture is important in Thailand. | เกษตรกรรมสำคัญในประเทศไทย
architecture | สถาปัตยกรรม | I love Thai architecture. | ฉันชอบสถาปัตยกรรมไทย
blueprint | พิมพ์เขียว | Look at the blueprint. | ดูพิมพ์เขียว
boundary | เขตแดน/ขอบเขต | Set clear boundaries. | กำหนดขอบเขตให้ชัดเจน
container | ภาชนะ/ตู้คอนเทนเนอร์ | Drugs were hidden in a container. | ยาเสพติดถูกซ่อนในตู้คอนเทนเนอร์
---
convenience | ความสะดวก | Call us at your convenience. | โทรหาเราเมื่อคุณสะดวก
conversation | บทสนทนา | We had a long conversation. | เราคุยกันนาน
circumstance | สถานการณ์/สภาพการณ์ | Under the circumstances, we waited. | ในสถานการณ์นั้น เรารอไว้ก่อน
climate | ภูมิอากาศ | Thailand has a hot climate. | ไทยมีภูมิอากาศร้อน
equipment | อุปกรณ์ | Check your equipment. | ตรวจอุปกรณ์ของคุณ
era | ยุค | It was the end of an era. | มันคือจุดจบของยุคหนึ่ง
`);
U('daily', 4, 'คำนามน่ารู้ขั้นสูง', `
artery | หลอดเลือดแดง | The bullet hit an artery. | กระสุนโดนหลอดเลือดแดง
dosage | ขนาดยา | Follow the correct dosage. | ใช้ยาตามขนาดที่ถูกต้อง
adolescence | วัยรุ่น | Adolescence is a hard time. | วัยรุ่นเป็นช่วงที่ยากลำบาก
debris | เศษซาก | Debris covered the road. | เศษซากเต็มถนน
decay | การผุพัง/เน่าเปื่อย | Sugar causes tooth decay. | น้ำตาลทำให้ฟันผุ
dialect | ภาษาถิ่น | He speaks the northern dialect. | เขาพูดภาษาเหนือ
---
ethnic | ชาติพันธุ์ | Thailand has many ethnic groups. | ไทยมีหลายกลุ่มชาติพันธุ์
donation | การบริจาค | Thank you for your donation. | ขอบคุณสำหรับการบริจาค
autumn | ฤดูใบไม้ร่วง | Leaves fall in autumn. | ใบไม้ร่วงในฤดูใบไม้ร่วง
blossom | ดอกไม้บาน | Cherry blossoms are pink. | ดอกซากุระสีชมพู
basin | อ่าง/ลุ่มน้ำ | Wash your face in the basin. | ล้างหน้าในอ่าง
chamber | ห้อง/สภา | The chamber was dark. | ห้องนั้นมืด
`);
U('daily', 2, 'อวกาศและสิ่งของน่ารู้', `
orbit | วงโคจร | The moon orbits the Earth. | ดวงจันทร์โคจรรอบโลก
galaxy | กาแล็กซี | Our galaxy is huge. | กาแล็กซีของเรากว้างใหญ่
comet | ดาวหาง | We saw a comet. | เราเห็นดาวหาง
meteor | ดาวตก | Make a wish on a meteor. | อธิษฐานกับดาวตก
submarine | เรือดำน้ำ | The submarine went deep. | เรือดำน้ำดำลึก
paradise | สวรรค์ | This island is a paradise. | เกาะนี้คือสวรรค์
---
veil | ผ้าคลุมหน้า | The bride wore a veil. | เจ้าสาวสวมผ้าคลุมหน้า
twig | กิ่งไม้เล็ก | The bird carried a twig. | นกคาบกิ่งไม้
pebble | ก้อนกรวด | He threw a pebble into the lake. | เขาโยนก้อนกรวดลงทะเลสาบ
moth | ผีเสื้อกลางคืน | A moth flew to the light. | ผีเสื้อกลางคืนบินเข้าหาไฟ
log | ท่อนซุง/บันทึก | Sit on the log. | นั่งบนท่อนซุง
coffin | โลงศพ | They carried the coffin. | พวกเขาแบกโลงศพ
`);

U('daily', 2, 'กริยาท่าทางและการทำความสะอาด', `
blink | กะพริบตา | Don't blink! | อย่ากะพริบตา!
clap | ปรบมือ | Everyone clapped. | ทุกคนปรบมือ
sigh | ถอนหายใจ | She sighed sadly. | เธอถอนหายใจเศร้าๆ
sip | จิบ | Sip your tea slowly. | จิบชาช้าๆ
stare | จ้อง | Don't stare at people. | อย่าจ้องคนอื่น
glance | เหลือบมอง | He glanced at his watch. | เขาเหลือบดูนาฬิกา
---
yell | ตะโกน | Don't yell at me. | อย่าตะโกนใส่ฉัน
wipe | เช็ด | Wipe the table. | เช็ดโต๊ะ
wrap | ห่อ | Wrap the gift. | ห่อของขวัญ
rinse | ล้าง (ด้วยน้ำ) | Rinse your mouth. | บ้วนปาก
scrub | ขัด | Scrub the floor. | ขัดพื้น
soak | แช่ | Soak the beans overnight. | แช่ถั่วไว้ข้ามคืน
`);
U('daily', 2, 'กริยาในชีวิตประจำวัน: ชุดเสริม 3', `
decorate | ตกแต่ง | We decorated the room. | เราตกแต่งห้อง
entertain | ให้ความบันเทิง | He entertained the guests. | เขาสร้างความบันเทิงให้แขก
congratulate | แสดงความยินดี | I congratulated her. | ฉันแสดงความยินดีกับเธอ
memorize | ท่องจำ | Memorize ten words a day. | ท่องจำวันละสิบคำ
edit | แก้ไข | Edit the video. | ตัดต่อวิดีโอ
erase | ลบ | Erase the board. | ลบกระดาน
---
browse | เลือกดู/ท่องเว็บ | I'm just browsing. | ฉันแค่ดูๆ
swap | สลับ/แลก | Let's swap seats. | สลับที่นั่งกันเถอะ
slip | ลื่น | I slipped on the wet floor. | ฉันลื่นบนพื้นเปียก
spoil | ทำให้เสีย/ตามใจ | Don't spoil the ending. | อย่าสปอยล์ตอนจบ
panic | ตื่นตระหนก | Don't panic. | อย่าตื่นตกใจ
wander | เดินเตร็ดเตร่ | We wandered around the market. | เราเดินเล่นรอบตลาด
`);
U('daily', 2, 'กริยาการปะทะและการเคลื่อนไหวเร็ว', `
bump | ชน/กระแทก | I bumped my head. | ฉันหัวชน
smash | ทุบแตก | He smashed the window. | เขาทุบหน้าต่างแตก
slam | กระแทก (ปิดแรง) | Don't slam the door. | อย่าปิดประตูแรง
slap | ตบ | She slapped his face. | เธอตบหน้าเขา
shove | ผลัก | He shoved me. | เขาผลักฉัน
snatch | ฉก/กระชาก | A man snatched her bag. | ชายคนหนึ่งกระชากกระเป๋าเธอ
---
sneak | แอบ/ย่อง | He sneaked out at night. | เขาแอบออกไปตอนกลางคืน
sniff | ดม/สูดจมูก | The dog sniffed the bag. | สุนัขดมกระเป๋า
shiver | ตัวสั่น (หนาว) | I'm shivering with cold. | ฉันหนาวจนตัวสั่น
tremble | สั่น (กลัว) | Her hands were trembling. | มือเธอสั่น
gasp | อ้าปากค้าง/หายใจหอบ | She gasped in surprise. | เธออ้าปากค้างด้วยความตกใจ
sob | สะอื้น | The child sobbed. | เด็กสะอื้นไห้
`);
U('daily', 3, 'กริยาทำอาหาร งานฝีมือ และการเดิน', `
carve | แกะสลัก/หั่น | He carved a statue. | เขาแกะสลักรูปปั้น
brew | ชง/ต้ม (กาแฟ เบียร์) | Brew some coffee. | ชงกาแฟหน่อย
blend | ปั่นผสม | Blend the fruit. | ปั่นผลไม้
sprinkle | โรย | Sprinkle some salt. | โรยเกลือนิดหน่อย
stain | คราบ/ทำเปื้อน | There's a stain on your shirt. | เสื้อคุณมีคราบ
polish | ขัดเงา | Polish your shoes. | ขัดรองเท้า
---
fetch | ไปเอามา | Fetch some water. | ไปเอาน้ำมาหน่อย
hike | เดินป่า | We hiked up the hill. | เราเดินขึ้นเขา
roam | ท่องไป | Dogs roam the streets. | สุนัขเดินเพ่นพ่านบนถนน
juggle | โยนรับ/จัดการหลายอย่าง | I juggle work and study. | ฉันจัดการทั้งงานและเรียน
march | เดินแถว | Soldiers marched past. | ทหารเดินแถวผ่าน
stroll | เดินเล่น | We strolled along the beach. | เราเดินเล่นริมหาด
`);
U('daily', 3, 'กริยาความรู้สึก', `
cherish | ทะนุถนอม/รักษา | Cherish every moment. | ทะนุถนอมทุกช่วงเวลา
envy | อิจฉา | I envy your skills. | ฉันอิจฉาฝีมือคุณ
resent | ขุ่นเคือง | He resented his boss. | เขาขุ่นเคืองหัวหน้า
despise | ดูถูก/เกลียดชัง | She despises liars. | เธอเกลียดคนโกหก
crave | อยากมาก | I'm craving pizza. | ฉันอยากกินพิซซ่ามาก
mourn | ไว้ทุกข์ | The nation mourned the king. | ทั้งประเทศไว้ทุกข์ให้กษัตริย์
---
grieve | โศกเศร้า | She is grieving for her father. | เธอโศกเศร้าถึงพ่อ
rejoice | ยินดี/ปลื้มปีติ | People rejoiced at the news. | ผู้คนยินดีกับข่าวนั้น
marvel | ทึ่ง/ประหลาดใจ | We marveled at the view. | เราทึ่งกับวิว
reassure | ทำให้มั่นใจ/ปลอบ | The officer reassured the child. | เจ้าหน้าที่ปลอบเด็ก
soothe | ปลอบโยน/บรรเทา | Music soothes me. | ดนตรีทำให้ฉันสงบ
console | ปลอบใจ | She consoled her friend. | เธอปลอบใจเพื่อน
`);
U('daily', 3, 'กริยาการล้อเลียนและการกลั่นแกล้ง', `
tease | แซว/ล้อ | Don't tease your sister. | อย่าแซวน้อง
mock | ล้อเลียน | They mocked his accent. | พวกเขาล้อเลียนสำเนียงเขา
flatter | ยกยอ | Don't flatter me. | อย่ายกยอฉัน
scold | ดุ | Mom scolded me. | แม่ดุฉัน
nag | บ่นจู้จี้ | Stop nagging me. | เลิกบ่นฉันได้แล้ว
pester | รบเร้า/กวนใจ | Kids pestered him for candy. | เด็กๆ รบเร้าขอลูกอม
---
irritate | ทำให้หงุดหงิด/ระคายเคือง | Smoke irritates my eyes. | ควันทำให้ตาฉันระคายเคือง
embarrass | ทำให้อับอาย | Don't embarrass me. | อย่าทำให้ฉันอาย
humiliate | ทำให้ขายหน้า | He humiliated her in public. | เขาทำให้เธอขายหน้าต่อหน้าคน
intimidate | ข่มขู่ | Don't try to intimidate the witness. | อย่าข่มขู่พยาน
harass | คุกคาม | He harassed her online. | เขาคุกคามเธอทางออนไลน์
bully | รังแก | Stop bullying him. | เลิกรังแกเขา
`);
U('daily', 3, 'กริยาการเรียนและการสื่อสาร', `
clarify | ชี้แจง/ทำให้ชัด | Please clarify your answer. | กรุณาชี้แจงคำตอบ
summarize | สรุป | Summarize the story. | สรุปเรื่อง
outline | ร่างโครง | Outline your plan. | ร่างโครงแผนของคุณ
recite | ท่อง | Recite the poem. | ท่องบทกวี
rehearse | ซ้อม | We rehearsed the speech. | เราซ้อมสุนทรพจน์
revise | ทบทวน/แก้ไข | Revise for the exam. | ทบทวนบทเรียนก่อนสอบ
---
interpret | ตีความ/แปล | Can you interpret for me? | ช่วยแปลให้ฉันได้ไหม
comprehend | เข้าใจ | I can't comprehend it. | ฉันเข้าใจไม่ได้
distinguish | แยกแยะ | Distinguish right from wrong. | แยกแยะถูกผิด
compose | แต่ง (เพลง/ข้อความ) | He composed a song. | เขาแต่งเพลง
cite | อ้างอิง | Cite your sources. | อ้างอิงแหล่งที่มา
infer | อนุมาน | What can you infer from this? | คุณอนุมานอะไรได้จากสิ่งนี้
`);
U('daily', 4, 'กริยาการปกปิดและการหลบหนี', `
conceal | ซ่อน/ปกปิด | He concealed a knife. | เขาซ่อนมีด
disguise | ปลอมตัว | He disguised himself as a monk. | เขาปลอมตัวเป็นพระ
deceive | หลอกลวง | Don't deceive the public. | อย่าหลอกลวงประชาชน
lure | ล่อ | They lured victims online. | พวกเขาล่อเหยื่อทางออนไลน์
manipulate | ชักใย/บงการ | He manipulated his friends. | เขาบงการเพื่อน
exploit | เอาเปรียบ/ใช้ประโยชน์ | They exploited workers. | พวกเขาเอาเปรียบแรงงาน
---
flee | หนี | The suspect fled the country. | ผู้ต้องสงสัยหนีออกนอกประเทศ
retreat | ถอย | The enemy retreated. | ศัตรูถอยทัพ
vanish | หายไป | The man vanished. | ชายคนนั้นหายตัวไป
overlook | มองข้าม/มองเห็นวิว | Don't overlook small details. | อย่ามองข้ามรายละเอียดเล็กๆ
overhear | ได้ยินโดยบังเอิญ | I overheard their plan. | ฉันได้ยินแผนของพวกเขาโดยบังเอิญ
intercept | สกัดกั้น/ดักฟัง | Police intercepted the call. | ตำรวจดักฟังโทรศัพท์
`);
U('daily', 4, 'กริยาการสร้างและการเปลี่ยนสภาพ', `
demolish | รื้อถอน | They demolished the building. | พวกเขารื้ออาคาร
dismantle | แยกชิ้นส่วน/ทลาย | Police dismantled the gang. | ตำรวจทลายแก๊ง
erect | สร้าง/ตั้ง | They erected a statue. | พวกเขาสร้างรูปปั้น
assemble | ประกอบ/ชุมนุม | Assemble the bed. | ประกอบเตียง
compress | บีบอัด | Compress the file. | บีบอัดไฟล์
extract | สกัด/ดึงออก | The dentist extracted a tooth. | หมอฟันถอนฟัน
---
dissolve | ละลาย/ยุบ | Sugar dissolves in water. | น้ำตาลละลายในน้ำ
evaporate | ระเหย | The water evaporated. | น้ำระเหยไป
ignite | จุดติด | The gas ignited. | แก๊สติดไฟ
emit | ปล่อย (แสง/ก๊าซ) | Cars emit smoke. | รถยนต์ปล่อยควัน
transmit | ส่ง/แพร่ | The disease is transmitted by mosquitoes. | โรคนี้แพร่ผ่านยุง
rotate | หมุน/สลับ | Rotate the tires. | สลับยาง
`);
U('daily', 4, 'กริยาการเพิ่มลดและเริ่มหยุด', `
diminish | ลดลง | The pain diminished. | ความเจ็บปวดลดลง
enlarge | ขยาย | Enlarge the photo. | ขยายรูป
intensify | ทวีความรุนแรง | The storm intensified. | พายุทวีความรุนแรง
inflate | สูบลม/พองตัว | Inflate the tires. | สูบลมยาง
shrink | หด | My shirt shrank. | เสื้อฉันหด
swell | บวม | My ankle swelled up. | ข้อเท้าฉันบวม
---
fluctuate | ขึ้นลง | Prices fluctuate. | ราคาขึ้นๆ ลงๆ
prolong | ยืดเวลา | Don't prolong the meeting. | อย่ายืดการประชุม
terminate | ยุติ/สิ้นสุด | The contract was terminated. | สัญญาถูกยกเลิก
cease | หยุด/ยุติ | The fighting ceased. | การสู้รบยุติลง
commence | เริ่ม | The ceremony will commence at nine. | พิธีจะเริ่มเก้าโมง
halt | หยุด | Halt! Who goes there? | หยุด! นั่นใคร?
`);
U('daily', 4, 'กริยาทางการแพทย์และสุขภาพ', `
diagnose | วินิจฉัย | The doctor diagnosed flu. | แพทย์วินิจฉัยว่าเป็นไข้หวัด
prescribe | สั่งยา | The doctor prescribed medicine. | แพทย์สั่งยา
inject | ฉีด | The nurse injected the drug. | พยาบาลฉีดยา
infect | ติดเชื้อ | The wound is infected. | แผลติดเชื้อ
inhale | หายใจเข้า | Inhale deeply. | หายใจเข้าลึกๆ
exhale | หายใจออก | Now exhale slowly. | ตอนนี้หายใจออกช้าๆ
---
digest | ย่อย | Milk is hard to digest. | นมย่อยยาก
nourish | บำรุง | Good food nourishes the body. | อาหารดีบำรุงร่างกาย
purify | ทำให้บริสุทธิ์/กรอง | Purify the water. | กรองน้ำให้สะอาด
remedy | วิธีแก้/ยารักษา | Honey is a good remedy for coughs. | น้ำผึ้งแก้ไอได้ดี
relieve | บรรเทา | This pill relieves pain. | ยานี้บรรเทาอาการปวด
refresh | ทำให้สดชื่น/รีเฟรช | Refresh the page. | รีเฟรชหน้าเว็บ
`);
U('daily', 5, 'กริยาการทำลายและขัดขวาง', `
deteriorate | แย่ลง/เสื่อม | His health deteriorated. | สุขภาพของเขาแย่ลง
devastate | ทำลายล้าง | The flood devastated the town. | น้ำท่วมทำลายเมือง
endanger | ทำให้ตกอยู่ในอันตราย | Speeding endangers lives. | การขับเร็วเป็นอันตรายต่อชีวิต
impair | ทำให้เสื่อม/บกพร่อง | Alcohol impairs judgment. | แอลกอฮอล์ทำให้การตัดสินใจบกพร่อง
hinder | ขัดขวาง | Rain hindered the search. | ฝนขัดขวางการค้นหา
hamper | เป็นอุปสรรค | Traffic hampered the rescue. | การจราจรเป็นอุปสรรคต่อการช่วยเหลือ
---
obstruct | กีดขวาง | Don't obstruct the road. | อย่ากีดขวางถนน
disrupt | ทำให้หยุดชะงัก | The storm disrupted flights. | พายุทำให้เที่ยวบินหยุดชะงัก
distort | บิดเบือน | He distorted the facts. | เขาบิดเบือนข้อเท็จจริง
distract | ทำให้ไขว้เขว | Phones distract drivers. | โทรศัพท์ทำให้คนขับเสียสมาธิ
discourage | ทำให้ท้อ/ห้ามปราม | Don't discourage him. | อย่าทำให้เขาท้อ
deprive | พรากไป/ทำให้ขาด | Lack of sleep deprives the brain. | การอดนอนทำให้สมองขาดการพักผ่อน
`);
U('daily', 5, 'กริยากฎหมายและการประกาศ', `
abolish | ยกเลิก (กฎหมาย) | They abolished the death penalty. | พวกเขายกเลิกโทษประหาร
amend | แก้ไข (กฎหมาย) | The law was amended. | กฎหมายถูกแก้ไข
authorize | อนุมัติ/ให้อำนาจ | Who authorized this? | ใครอนุมัติเรื่องนี้
impose | กำหนด/บังคับใช้ | They imposed a curfew. | พวกเขาประกาศเคอร์ฟิว
levy | เรียกเก็บ (ภาษี) | The government levied a new tax. | รัฐบาลเรียกเก็บภาษีใหม่
administer | บริหาร/ให้ (ยา) | The nurse administered the drug. | พยาบาลให้ยา
---
condemn | ประณาม | We condemn violence. | เราประณามความรุนแรง
denounce | ประณาม/กล่าวโทษ | He denounced corruption. | เขาประณามการทุจริต
proclaim | ประกาศ | The king proclaimed a holiday. | กษัตริย์ประกาศวันหยุด
pledge | ให้คำมั่น | They pledged support. | พวกเขาให้คำมั่นว่าจะสนับสนุน
vow | สาบาน/ปฏิญาณ | He vowed to find the killer. | เขาสาบานว่าจะหาฆาตกร
preside | เป็นประธาน | The judge presided over the trial. | ผู้พิพากษาเป็นประธานการพิจารณาคดี
`);
U('daily', 5, 'กริยาความเพียรและความสำเร็จ', `
compensate | ชดเชย | They compensated the victims. | พวกเขาชดเชยผู้เสียหาย
deduct | หักออก | Tax is deducted from salary. | ภาษีถูกหักจากเงินเดือน
invest | ลงทุน | Invest in education. | ลงทุนในการศึกษา
prosper | เจริญรุ่งเรือง | The town prospered. | เมืองเจริญรุ่งเรือง
flourish | เฟื่องฟู | Tourism flourished. | การท่องเที่ยวเฟื่องฟู
thrive | เติบโตได้ดี | Plants thrive in the sun. | พืชเติบโตดีในแดด
---
strive | พยายามอย่างหนัก | Strive to do your best. | พยายามทำให้ดีที่สุด
persevere | อดทนพากเพียร | Persevere and you will win. | อดทนแล้วคุณจะชนะ
persist | ยืนหยัด/ดำเนินต่อ | The rain persisted all day. | ฝนตกต่อเนื่องทั้งวัน
endure | อดทน | She endured the pain. | เธออดทนต่อความเจ็บปวด
withstand | ทนทาน/ต้านทาน | The house withstood the storm. | บ้านทนพายุได้
triumph | ชัยชนะ/ได้ชัย | Good triumphs over evil. | ความดีชนะความชั่ว
`);
U('daily', 6, 'กริยาการคิดขั้นสูง', `
contemplate | ไตร่ตรอง | He contemplated quitting. | เขาไตร่ตรองว่าจะลาออก
deliberate | ไตร่ตรอง/จงใจ | It was a deliberate act. | เป็นการกระทำโดยจงใจ
ponder | ครุ่นคิด | She pondered the question. | เธอครุ่นคิดถึงคำถาม
presume | สันนิษฐาน | I presume you are tired. | ฉันคิดว่าคุณคงเหนื่อย
perceive | รับรู้/มองว่า | How do people perceive the police? | ประชาชนมองตำรวจอย่างไร
foresee | คาดการณ์ล่วงหน้า | Nobody foresaw the crisis. | ไม่มีใครคาดการณ์วิกฤตได้
---
reckon | คิดว่า/คาดว่า | I reckon he's right. | ฉันคิดว่าเขาพูดถูก
conceive | คิด/ตั้งครรภ์ | He conceived a new plan. | เขาคิดแผนใหม่ขึ้นมา
formulate | กำหนด/คิดค้น | Formulate a strategy. | กำหนดกลยุทธ์
innovate | สร้างนวัตกรรม | Companies must innovate. | บริษัทต้องสร้างนวัตกรรม
improvise | ด้นสด/แก้สถานการณ์เฉพาะหน้า | We had to improvise. | เราต้องแก้สถานการณ์เฉพาะหน้า
orchestrate | วางแผนจัดการ (เบื้องหลัง) | He orchestrated the robbery. | เขาวางแผนการปล้น
`);
U('daily', 6, 'กริยาอำนาจและการต่อต้าน', `
liberate | ปลดปล่อย | Soldiers liberated the city. | ทหารปลดปล่อยเมือง
oppress | กดขี่ | The king oppressed the people. | กษัตริย์กดขี่ประชาชน
conquer | พิชิต | They conquered the land. | พวกเขาพิชิตดินแดน
overthrow | โค่นล้ม | They overthrew the government. | พวกเขาโค่นล้มรัฐบาล
rebel | กบฏ/ต่อต้าน | Teenagers often rebel. | วัยรุ่นมักต่อต้าน
revolt | ก่อจลาจล/ลุกฮือ | The people revolted. | ประชาชนลุกฮือ
---
retaliate | ตอบโต้ | Don't retaliate. | อย่าตอบโต้
provoke | ยั่วยุ | Don't provoke him. | อย่ายั่วยุเขา
inflict | ทำให้ได้รับ (ความเสียหาย) | The storm inflicted heavy damage. | พายุสร้างความเสียหายหนัก
torment | ทรมาน | Guilt tormented him. | ความรู้สึกผิดทรมานเขา
exile | เนรเทศ | He was exiled. | เขาถูกเนรเทศ
imprison | จำคุก | He was imprisoned for ten years. | เขาถูกจำคุกสิบปี
`);
U('daily', 6, 'กริยาสิทธิและการบุกเบิก', `
conform | ปฏิบัติตาม (กฎ/สังคม) | You must conform to the rules. | คุณต้องปฏิบัติตามกฎ
adhere | ยึดถือ/ปฏิบัติตาม | Adhere to the procedure. | ยึดถือขั้นตอน
oblige | บังคับ/ช่วยเหลือ | The law obliges you to stop. | กฎหมายบังคับให้คุณหยุด
entitle | ให้สิทธิ | You are entitled to a lawyer. | คุณมีสิทธิมีทนาย
empower | ให้อำนาจ | Education empowers women. | การศึกษาให้พลังแก่ผู้หญิง
embark | เริ่มต้น/ขึ้นเรือ | She embarked on a new career. | เธอเริ่มอาชีพใหม่
---
endeavor | พยายาม | We endeavor to help. | เราพยายามช่วยเหลือ
venture | เสี่ยง/กิจการ | He ventured into the forest. | เขาเสี่ยงเข้าไปในป่า
surpass | เหนือกว่า/แซง | She surpassed her goal. | เธอทำได้เกินเป้า
prevail | ชนะ/แพร่หลาย | Justice will prevail. | ความยุติธรรมจะชนะ
withdraw from | ถอนตัวจาก | He withdrew from the race. | เขาถอนตัวจากการแข่งขัน
summon | เรียกตัว | He was summoned to court. | เขาถูกเรียกตัวไปศาล
`);

U('daily', 2, 'กริยาการมองและแสง', `
gaze | จ้องมอง (นานๆ) | She gazed at the stars. | เธอจ้องมองดวงดาว
glare | จ้องเขม็ง/แสงจ้า | He glared at me. | เขาจ้องเขม็งใส่ฉัน
glimpse | เห็นแวบหนึ่ง | I caught a glimpse of the thief. | ฉันเห็นขโมยแวบหนึ่ง
glow | เรืองแสง | The lamp glows at night. | โคมเรืองแสงตอนกลางคืน
gleam | ส่องแสงวาว | His eyes gleamed. | ดวงตาเขาเป็นประกาย
sparkle | ระยิบระยับ | The sea sparkled in the sun. | ทะเลระยิบระยับในแสงแดด
---
glisten | เป็นมันวาว | Her face glistened with sweat. | ใบหน้าเธอเป็นมันด้วยเหงื่อ
radiate | แผ่ (ความร้อน/ความสุข) | She radiates confidence. | เธอเปล่งความมั่นใจ
illuminate | ส่องสว่าง | Lights illuminated the street. | ไฟส่องสว่างถนน
brighten | ทำให้สว่าง/สดใส | Your smile brightens my day. | รอยยิ้มของคุณทำให้วันของฉันสดใส
blush | หน้าแดง (อาย) | She blushed when he smiled. | เธอหน้าแดงตอนเขายิ้ม
doze | งีบ | Grandpa dozed on the sofa. | ปู่งีบบนโซฟา
`);
U('daily', 2, 'กริยาเสียงพูดและเสียงร้อง', `
mumble | พึมพำ | Don't mumble. Speak clearly. | อย่าพึมพำ พูดให้ชัด
murmur | พูดเบาๆ | She murmured his name. | เธอพูดชื่อเขาเบาๆ
mutter | บ่นพึมพำ | He muttered something angrily. | เขาบ่นพึมพำอย่างโกรธๆ
groan | ครวญคราง | He groaned in pain. | เขาครางด้วยความเจ็บปวด
grumble | บ่น | Stop grumbling. | เลิกบ่นได้แล้ว
whine | ร้องโอดครวญ/งอแง | The child whined all day. | เด็กงอแงทั้งวัน
---
wail | ร้องคร่ำครวญ | The mother wailed loudly. | แม่ร้องคร่ำครวญเสียงดัง
weep | ร่ำไห้ | She wept at the funeral. | เธอร่ำไห้ในงานศพ
shriek | กรีดร้อง | She shrieked in fear. | เธอกรีดร้องด้วยความกลัว
squeal | ร้องเสียงแหลม | The kids squealed with joy. | เด็กๆ ร้องกรี๊ดด้วยความดีใจ
roar | คำราม/โห่ร้อง | The crowd roared. | ฝูงชนโห่ร้อง
howl | หอน | Wolves howl at the moon. | หมาป่าหอนใส่ดวงจันทร์
`);
U('daily', 2, 'กริยาการเคลื่อนไหวทั่วไป', `
drift | ลอยไป | The boat drifted away. | เรือลอยไป
glide | ร่อน | The bird glided through the air. | นกร่อนไปในอากาศ
hover | ลอยนิ่ง/บินวน | The helicopter hovered above. | เฮลิคอปเตอร์ลอยอยู่ข้างบน
soar | ทะยานขึ้น | Prices soared. | ราคาพุ่งสูง
tumble | ล้มกลิ้ง | He tumbled down the stairs. | เขากลิ้งตกบันได
stumble | สะดุด | I stumbled on a rock. | ฉันสะดุดหิน
---
stagger | เดินโซเซ | The drunk man staggered home. | ชายเมาเดินโซเซกลับบ้าน
stride | ก้าวยาวๆ | He strode into the room. | เขาก้าวยาวๆ เข้าห้อง
wade | ลุย (น้ำ) | We waded across the river. | เราลุยข้ามแม่น้ำ
wobble | โยกเยก | The table wobbles. | โต๊ะโยกเยก
sway | แกว่งไกว | The trees swayed in the wind. | ต้นไม้แกว่งไปตามลม
tilt | เอียง | Tilt your head back. | เงยหน้าขึ้น
`);
U('daily', 3, 'กริยามือและการจับ', `
grasp | จับแน่น/เข้าใจ | Grasp the rope. | จับเชือกไว้แน่น
grip | กำแน่น | Grip the handle. | จับที่จับให้แน่น
pinch | หยิก/บีบ | Don't pinch your brother. | อย่าหยิกน้อง
fling | เหวี่ยง | He flung the bag away. | เขาเหวี่ยงกระเป๋าทิ้ง
hurl | ขว้างแรง | Protesters hurled stones. | ผู้ประท้วงขว้างก้อนหิน
flip | พลิก | Flip the pancake. | พลิกแพนเค้ก
---
flick | ดีด/สะบัด | Flick the switch. | ดีดสวิตช์
fumble | งุ่มง่าม/คลำ | He fumbled for his keys. | เขาคลำหากุญแจ
caress | ลูบไล้ | She caressed the cat. | เธอลูบแมว
heave | ยก/ดึงอย่างแรง | They heaved the box up. | พวกเขายกกล่องขึ้น
rummage | ค้นหา (รื้อ) | He rummaged through the drawer. | เขารื้อค้นลิ้นชัก
whisk | ตี (ไข่)/พาไปเร็ว | Whisk the eggs. | ตีไข่
`);
U('daily', 3, 'กริยาอารมณ์และอาการ', `
flinch | สะดุ้ง/ผงะ | He flinched at the noise. | เขาสะดุ้งกับเสียง
startle | ทำให้ตกใจ | The noise startled me. | เสียงนั้นทำให้ฉันตกใจ
shudder | สั่นสะท้าน | I shudder to think about it. | แค่คิดก็ขนลุก
fidget | อยู่ไม่สุข | Stop fidgeting. | อยู่นิ่งๆ หน่อย
stammer | พูดติดอ่าง | He stammered when nervous. | เขาพูดติดอ่างเวลาประหม่า
gulp | กลืนอึก | He gulped his water. | เขากลืนน้ำอึกใหญ่
---
brag | คุยโว | Stop bragging. | เลิกคุยโวได้แล้ว
gloat | สะใจ/ยิ้มเยาะ | Don't gloat over others' failure. | อย่าสะใจที่คนอื่นล้มเหลว
loathe | เกลียดมาก | I loathe cold weather. | ฉันเกลียดอากาศหนาวมาก
lament | คร่ำครวญ/เสียดาย | He lamented his lost youth. | เขาเสียดายวัยหนุ่ม
relish | ชื่นชอบ/เพลิดเพลิน | She relished the challenge. | เธอสนุกกับความท้าทาย
savor | ลิ้มรส/ดื่มด่ำ | Savor the moment. | ดื่มด่ำกับช่วงเวลานี้
`);
U('daily', 3, 'กริยาความสัมพันธ์กับผู้คน', `
befriend | ผูกมิตร | He befriended the new student. | เขาผูกมิตรกับนักเรียนใหม่
mingle | ปะปน/เข้าสังคม | Mingle with the guests. | พูดคุยกับแขก
bond | ผูกพัน | The team bonded quickly. | ทีมสนิทกันเร็ว
confide | ไว้ใจบอกความลับ | She confided in me. | เธอไว้ใจเล่าความลับให้ฉัน
coax | เกลี้ยกล่อม | She coaxed the cat out. | เธอเกลี้ยกล่อมให้แมวออกมา
charm | ทำให้หลงเสน่ห์ | He charmed everyone. | เขาทำให้ทุกคนหลงเสน่ห์
---
pamper | เอาใจ/ตามใจ | Pamper yourself today. | วันนี้ตามใจตัวเองหน่อย
nurture | เลี้ยงดู/บ่มเพาะ | Parents nurture their children. | พ่อแม่เลี้ยงดูลูก
foster | อุปถัมภ์/ส่งเสริม | Sports foster teamwork. | กีฬาส่งเสริมการทำงานเป็นทีม
pardon | ให้อภัย/อภัยโทษ | Pardon me? | ขอโทษ ว่าอะไรนะ?
plead | วิงวอน/ให้การ | She pleaded for help. | เธอวิงวอนขอความช่วยเหลือ
tempt | ล่อใจ | Don't tempt me. | อย่ามายั่วฉัน
`);
U('daily', 3, 'กริยาการพูดและการแสดงออก', `
exaggerate | พูดเกินจริง | Don't exaggerate. | อย่าพูดเกินจริง
exclaim | อุทาน | "Wow!" she exclaimed. | "ว้าว!" เธออุทาน
utter | เปล่ง (เสียง/คำพูด) | He didn't utter a word. | เขาไม่พูดสักคำ
recount | เล่า | She recounted the story. | เธอเล่าเรื่องนั้น
preach | สั่งสอน/เทศน์ | Don't preach to me. | อย่ามาสั่งสอนฉัน
chant | ตะโกนพร้อมกัน/สวด | The crowd chanted his name. | ฝูงชนตะโกนชื่อเขาพร้อมกัน
---
portray | พรรณนา/แสดงเป็น | He portrayed a police officer. | เขารับบทเป็นตำรวจ
imitate | เลียนแบบ | Kids imitate their parents. | เด็กเลียนแบบพ่อแม่
mimic | ล้อเลียน/เลียนแบบ | Parrots can mimic voices. | นกแก้วเลียนเสียงได้
echo | ก้อง/สะท้อน | His voice echoed in the cave. | เสียงเขาก้องในถ้ำ
convey | ถ่ายทอด/สื่อ | Words can't convey my feelings. | คำพูดไม่อาจสื่อความรู้สึกฉันได้
inquire | สอบถาม | I'd like to inquire about the job. | ฉันขอสอบถามเรื่องงาน
`);
U('daily', 4, 'กริยาการทำลายและความรุนแรง', `
shatter | แตกละเอียด | The glass shattered. | แก้วแตกกระจาย
wreck | ทำพัง | The storm wrecked the boat. | พายุทำเรือพัง
crumble | ร่วน/พังทลาย | The old wall crumbled. | กำแพงเก่าพังทลาย
topple | ล้มคว่ำ/โค่น | The tree toppled over. | ต้นไม้ล้มคว่ำ
trample | เหยียบย่ำ | People were trampled in the crowd. | ผู้คนถูกเหยียบในฝูงชน
slash | ฟัน/กรีด/ลดราคา | Someone slashed my tires. | มีคนกรีดยางรถฉัน
---
strangle | บีบคอ | He tried to strangle her. | เขาพยายามบีบคอเธอ
slaughter | ฆ่าหมู่/ฆ่าสัตว์ | They slaughtered the pigs. | พวกเขาฆ่าหมู
scorch | ไหม้เกรียม | The sun scorched the grass. | แดดเผาหญ้าเกรียม
smear | ป้าย/ใส่ร้าย | Mud was smeared on the wall. | โคลนถูกป้ายบนกำแพง
clash | ปะทะ | Police clashed with protesters. | ตำรวจปะทะกับผู้ประท้วง
collide | ชนกัน | Two cars collided. | รถสองคันชนกัน
`);
U('daily', 4, 'กริยาการเคลื่อนที่และขับขี่', `
steer | บังคับทิศทาง | Steer the car to the left. | หักรถไปทางซ้าย
navigate | นำทาง | Use GPS to navigate. | ใช้จีพีเอสนำทาง
propel | ขับเคลื่อน | The engine propels the boat. | เครื่องยนต์ขับเคลื่อนเรือ
plunge | ดิ่ง/กระโจน | The car plunged into the river. | รถพุ่งลงแม่น้ำ
descend | ลง | The plane began to descend. | เครื่องบินเริ่มลดระดับ
elevate | ยกระดับ/ยกสูง | Elevate your leg. | ยกขาให้สูง
---
dash | พุ่งไป/รีบ | I have to dash. | ฉันต้องรีบไปแล้ว
hustle | รีบเร่ง/ขยัน | We hustled to the station. | เรารีบไปสถานี
linger | อ้อยอิ่ง/ค้างอยู่ | The smell lingered. | กลิ่นยังติดอยู่
prowl | ด้อมๆ มองๆ | A man was prowling around the house. | ชายคนหนึ่งด้อมๆ มองๆ รอบบ้าน
pounce | ตะครุบ | The cat pounced on the mouse. | แมวตะครุบหนู
stoop | ก้มตัว | He stooped to pick it up. | เขาก้มลงเก็บ
`);
U('daily', 4, 'กริยาสภาพแวดล้อมและการอยู่อาศัย', `
dwell | อาศัยอยู่/จมอยู่กับ | Don't dwell on the past. | อย่าจมอยู่กับอดีต
reside | พำนัก | He resides in Bangkok. | เขาพำนักที่กรุงเทพฯ
inhabit | อาศัยอยู่ (ในพื้นที่) | Tigers inhabit the forest. | เสืออาศัยอยู่ในป่า
cultivate | เพาะปลูก/บ่มเพาะ | Farmers cultivate rice. | ชาวนาปลูกข้าว
graze | เล็มหญ้า/ถลอก | Cows graze in the field. | วัวเล็มหญ้าในทุ่ง
breed | ผสมพันธุ์/เพาะ | They breed dogs. | พวกเขาเพาะพันธุ์สุนัข
---
drench | เปียกโชก | I was drenched in the rain. | ฉันเปียกโชกเพราะฝน
erupt | ปะทุ | The volcano erupted. | ภูเขาไฟปะทุ
scatter | กระจาย | The crowd scattered. | ฝูงชนกระจายตัว
swirl | หมุนวน | Leaves swirled in the wind. | ใบไม้หมุนวนในสายลม
stink | ส่งกลิ่นเหม็น | The trash stinks. | ขยะเหม็น
clog | อุดตัน | Hair clogged the drain. | ผมอุดท่อ
`);
U('daily', 4, 'กริยาการจัดการและปรับปรุง', `
modify | ดัดแปลง/แก้ไข | He modified his car. | เขาดัดแปลงรถ
moderate | ปรับให้พอดี/ดำเนินรายการ | Moderate your drinking. | ดื่มให้พอประมาณ
substitute | แทนที่ | Substitute sugar with honey. | ใช้น้ำผึ้งแทนน้ำตาล
subtract | ลบ (เลข) | Subtract 5 from 10. | เอา 10 ลบ 5
integrate | รวมเข้าด้วยกัน | Integrate the two systems. | รวมสองระบบเข้าด้วยกัน
incorporate | ผนวก/รวม | Incorporate exercise into your day. | ใส่การออกกำลังกายในชีวิตประจำวัน
---
rectify | แก้ไขให้ถูก | We will rectify the error. | เราจะแก้ไขข้อผิดพลาด
renew | ต่ออายุ | Renew your license. | ต่ออายุใบขับขี่
reinforce | เสริมกำลัง | Reinforce the wall. | เสริมกำแพงให้แข็งแรง
regain | ได้คืน | He regained consciousness. | เขาฟื้นคืนสติ
retrieve | กู้คืน/นำกลับมา | Retrieve the deleted files. | กู้ไฟล์ที่ลบไป
reclaim | เรียกคืน | Reclaim your luggage here. | รับกระเป๋าคืนที่นี่
`);
U('daily', 4, 'กริยาการตรวจสอบและการลงมือ', `
probe | สอบสวน/สำรวจ | Police are probing the case. | ตำรวจกำลังสอบสวนคดี
penetrate | ทะลุ/แทรกซึม | The bullet penetrated the wall. | กระสุนทะลุกำแพง
intervene | เข้าแทรกแซง | The police had to intervene. | ตำรวจต้องเข้าแทรกแซง
intrude | บุกรุก/ล่วงล้ำ | Sorry to intrude. | ขอโทษที่รบกวน
execute | ปฏิบัติ/ประหาร | Execute the plan. | ดำเนินการตามแผน
exert | ใช้ (แรง/อิทธิพล) | Don't exert yourself. | อย่าหักโหม
---
prompt | กระตุ้น/ทันที | The news prompted panic. | ข่าวทำให้เกิดความตื่นตระหนก
stimulate | กระตุ้น | Coffee stimulates the brain. | กาแฟกระตุ้นสมอง
urge | เร่งเร้า/กระตุ้น | I urge you to stop. | ฉันขอเรียกร้องให้คุณหยุด
suppress | ปราบปราม/กดไว้ | He suppressed a smile. | เขากลั้นยิ้ม
suspend | ระงับ/แขวน | His license was suspended. | ใบขับขี่ของเขาถูกพัก
stall | ดับ (เครื่อง)/ถ่วงเวลา | The car stalled. | รถดับ
`);
U('daily', 5, 'กริยาการแสดงและการเผยแพร่', `
exhibit | จัดแสดง | The museum exhibits old coins. | พิพิธภัณฑ์จัดแสดงเหรียญเก่า
unveil | เปิดตัว | They unveiled a new car. | พวกเขาเปิดตัวรถใหม่
unfold | คลี่/เปิดเผย | The story unfolds slowly. | เรื่องราวค่อยๆ เผยออกมา
commemorate | รำลึก | We commemorate the heroes. | เรารำลึกถึงวีรชน
dedicate | อุทิศ | This song is dedicated to my mom. | เพลงนี้อุทิศให้แม่
render | ทำให้/ให้บริการ | The news rendered him speechless. | ข่าวทำให้เขาพูดไม่ออก
---
derive | ได้มาจาก | The word is derived from Latin. | คำนี้มาจากภาษาละติน
consist | ประกอบด้วย | The team consists of five officers. | ทีมประกอบด้วยเจ้าหน้าที่ห้าคน
correspond | สอดคล้อง/ติดต่อทางจดหมาย | His story doesn't correspond with the facts. | เรื่องเขาไม่สอดคล้องกับข้อเท็จจริง
convert | เปลี่ยน/แปลง | Convert baht to dollars. | แปลงบาทเป็นดอลลาร์
condense | ย่อ/ควบแน่น | Condense the report. | ย่อรายงาน
detach | แยกออก | Detach the form here. | ฉีกแบบฟอร์มตรงนี้
`);
U('daily', 5, 'กริยาการควบคุมและครอบงำ', `
dominate | ครอบงำ/ครองตลาด | They dominate the market. | พวกเขาครองตลาด
dictate | บงการ/บอกให้จด | Don't let fear dictate your life. | อย่าให้ความกลัวกำหนดชีวิต
confine | กักขัง/จำกัด | He was confined to bed. | เขาต้องนอนติดเตียง
enclose | ล้อมรอบ/แนบ | Please find the enclosed form. | โปรดดูแบบฟอร์มที่แนบมา
expel | ไล่ออก | He was expelled from school. | เขาถูกไล่ออกจากโรงเรียน
repel | ขับไล่ | This spray repels mosquitoes. | สเปรย์นี้ไล่ยุง
---
conspire | สมคบคิด | They conspired to rob the bank. | พวกเขาสมคบกันปล้นธนาคาร
contend | แข่งขัน/ยืนยัน | Several teams contend for the title. | หลายทีมแข่งชิงแชมป์
combat | ต่อสู้/ปราบ | We must combat drug abuse. | เราต้องปราบปรามยาเสพติด
bombard | ระดม (ยิง/ถาม) | Reporters bombarded him with questions. | นักข่าวระดมถามเขา
bolster | เสริม/หนุน | Good news bolstered confidence. | ข่าวดีเสริมความมั่นใจ
reign | ครองราชย์/ครอบงำ | The king reigned for 70 years. | กษัตริย์ครองราชย์ 70 ปี
`);
U('daily', 5, 'กริยาคุณธรรมและศาสนา', `
worship | บูชา | They worship at the temple. | พวกเขาไปไหว้พระที่วัด
repent | สำนึกผิด | He repented his sins. | เขาสำนึกผิด
redeem | ไถ่ถอน/แลก | Redeem your points. | แลกแต้มของคุณ
refrain | งดเว้น | Please refrain from smoking. | กรุณางดสูบบุหรี่
indulge | ปล่อยตัว/ตามใจ | Don't indulge in junk food. | อย่าตามใจตัวเองกินขยะ
reproach | ตำหนิ | He reproached himself. | เขาตำหนิตัวเอง
---
perish | ตาย/สูญสิ้น | Many perished in the fire. | หลายคนเสียชีวิตในกองเพลิง
starve | อดอาหาร/หิวมาก | I'm starving! | ฉันหิวจะตายแล้ว!
quench | ดับ (กระหาย/ไฟ) | Water quenches thirst. | น้ำดับกระหาย
hoard | กักตุน | Don't hoard food. | อย่ากักตุนอาหาร
haunt | หลอกหลอน | The memory haunts him. | ความทรงจำหลอกหลอนเขา
procrastinate | ผัดวันประกันพรุ่ง | Stop procrastinating. | เลิกผัดวันประกันพรุ่ง
`);
U('daily', 5, 'กริยาการทำงานของสิ่งต่างๆ', `
immerse | จุ่ม/ดื่มด่ำ | Immerse yourself in English. | ทำให้ตัวเองอยู่กับภาษาอังกฤษ
enrich | ทำให้สมบูรณ์ขึ้น | Reading enriches the mind. | การอ่านทำให้จิตใจสมบูรณ์
enlighten | ให้ความรู้/ทำให้ตาสว่าง | The book enlightened me. | หนังสือทำให้ฉันตาสว่าง
interact | มีปฏิสัมพันธ์ | Kids interact with each other. | เด็กๆ มีปฏิสัมพันธ์กัน
replicate | ทำซ้ำ | Scientists replicated the test. | นักวิทยาศาสตร์ทำการทดลองซ้ำ
nominate | เสนอชื่อ | She was nominated for an award. | เธอได้รับการเสนอชื่อเข้าชิงรางวัล
---
precede | มาก่อน | Lightning precedes thunder. | ฟ้าแลบมาก่อนฟ้าร้อง
omit | ละเว้น | Don't omit any details. | อย่าละรายละเอียดใด
object | คัดค้าน | I object to this plan. | ฉันคัดค้านแผนนี้
straighten | ทำให้ตรง/จัดให้เรียบร้อย | Straighten your tie. | จัดเนกไทให้ตรง
dangle | ห้อยต่องแต่ง | His legs dangled over the edge. | ขาเขาห้อยต่องแต่งที่ขอบ
cling | เกาะแน่น/ยึดติด | The child clung to her mother. | เด็กเกาะแม่แน่น
`);
U('daily', 3, 'กริยาสนุกๆ และในครัว', `
tickle | จั๊กจี้ | Stop tickling me! | เลิกจั๊กจี้ฉันได้แล้ว!
wriggle | ดิ้นไปมา | The worm wriggled. | หนอนดิ้นไปมา
wrestle | ปล้ำ | The boys wrestled on the grass. | เด็กชายปล้ำกันบนหญ้า
feast | งานเลี้ยง/กินอย่างเต็มที่ | We feasted on seafood. | เรากินอาหารทะเลกันเต็มที่
devour | กินอย่างตะกละ | The kids devoured the cake. | เด็กๆ กินเค้กหมดเกลี้ยง
bathe | อาบน้ำ (ให้) | Bathe the baby. | อาบน้ำให้ทารก
---
batter | แป้งชุบทอด/ทุบตี | Dip the shrimp in batter. | ชุบกุ้งในแป้ง
bloat | ท้องอืด/บวม | I feel bloated. | ฉันรู้สึกท้องอืด
bundle | มัด/ห่อ | A bundle of cash. | เงินสดหนึ่งปึก
buckle | หัวเข็มขัด/รัด | Buckle up! | คาดเข็มขัด!
budge | ขยับ | The door won't budge. | ประตูไม่ขยับเลย
weave | ทอ/สาน | She weaves silk. | เธอทอผ้าไหม
`);

U('daily', 1, 'คุณศัพท์พื้นฐานที่ใช้บ่อย', `
clever | ฉลาด | She is very clever. | เธอฉลาดมาก
friendly | เป็นมิตร | The people here are friendly. | คนที่นี่เป็นมิตร
handsome | หล่อ | He is tall and handsome. | เขาสูงและหล่อ
ugly | น่าเกลียด | It's an ugly building. | เป็นตึกที่น่าเกลียด
tiny | เล็กมาก | The kitten is tiny. | ลูกแมวตัวเล็กมาก
noisy | เสียงดัง | The street is noisy. | ถนนเสียงดัง
---
silly | โง่/ไร้สาระ | Don't be silly. | อย่าทำตัวไร้สาระ
lucky | โชคดี | You are so lucky! | คุณโชคดีมาก!
tasty | อร่อย | This soup is tasty. | ซุปนี้อร่อย
yummy | อร่อย (ภาษาเด็ก) | Yummy cake! | เค้กอร่อย!
strange | แปลก | I heard a strange noise. | ฉันได้ยินเสียงแปลกๆ
scary | น่ากลัว | That movie was scary. | หนังเรื่องนั้นน่ากลัว
`);
U('daily', 1, 'คุณศัพท์บรรยายสิ่งของ', `
shiny | เป็นเงา | He has a shiny new car. | เขามีรถใหม่เงาวับ
sticky | เหนียว | My hands are sticky. | มือฉันเหนียว
fluffy | ฟู/นุ่ม | The cat is fluffy. | แมวขนฟู
dusty | เต็มไปด้วยฝุ่น | The room is dusty. | ห้องฝุ่นเยอะ
muddy | เปื้อนโคลน | My shoes are muddy. | รองเท้าฉันเปื้อนโคลน
smelly | เหม็น | The trash is smelly. | ขยะเหม็น
---
juicy | ฉ่ำ | The mango is juicy. | มะม่วงฉ่ำ
crunchy | กรอบ | I like crunchy chips. | ฉันชอบมันฝรั่งกรอบ
slippery | ลื่น | The floor is slippery. | พื้นลื่น
steep | ชัน | The hill is steep. | เนินชัน
icy | เย็นจัด/เป็นน้ำแข็ง | The road is icy. | ถนนเป็นน้ำแข็ง
stormy | มีพายุ | It's a stormy night. | เป็นคืนที่มีพายุ
`);
U('daily', 2, 'คุณศัพท์บุคลิกภาพเชิงบวก', `
charming | มีเสน่ห์ | He is a charming man. | เขาเป็นผู้ชายที่มีเสน่ห์
talented | มีพรสวรรค์ | She is a talented singer. | เธอเป็นนักร้องที่มีพรสวรรค์
intelligent | ฉลาด | Dolphins are intelligent. | โลมาฉลาด
energetic | กระฉับกระเฉง | Kids are energetic. | เด็กๆ กระฉับกระเฉง
playful | ขี้เล่น | The puppy is playful. | ลูกหมาขี้เล่น
thoughtful | ใส่ใจผู้อื่น | That's very thoughtful of you. | คุณช่างใส่ใจ
---
wise | ฉลาดรอบรู้ | My grandfather is wise. | ปู่ของฉันฉลาดรอบรู้
witty | มีไหวพริบ/คมคาย | She gave a witty answer. | เธอตอบอย่างมีไหวพริบ
punctual | ตรงต่อเวลา | Police must be punctual. | ตำรวจต้องตรงต่อเวลา
faithful | ซื่อสัตย์/ภักดี | He is a faithful husband. | เขาเป็นสามีที่ซื่อสัตย์
thankful | รู้สึกขอบคุณ | I'm thankful for your help. | ฉันขอบคุณสำหรับความช่วยเหลือ
trustworthy | น่าไว้วางใจ | He is trustworthy. | เขาน่าไว้วางใจ
`);
U('daily', 2, 'คุณศัพท์บุคลิกภาพเชิงลบ', `
grumpy | ขี้หงุดหงิด | He is grumpy in the morning. | เขาขี้หงุดหงิดตอนเช้า
naughty | ซน | The boy is naughty. | เด็กชายซน
foolish | โง่เขลา | That was a foolish mistake. | นั่นเป็นความผิดพลาดที่โง่เขลา
forgetful | ขี้ลืม | My grandma is forgetful. | ยายฉันขี้ลืม
sneaky | ลับๆ ล่อๆ | That was a sneaky trick. | นั่นเป็นกลอุบายที่แยบยล
stingy | ขี้เหนียว | Don't be stingy. | อย่าขี้เหนียว
---
nasty | น่ารังเกียจ/ร้ายกาจ | He said nasty things. | เขาพูดจาร้ายกาจ
vain | หลงตัวเอง/ไร้ผล | He is vain about his looks. | เขาหลงรูปตัวเอง
timid | ขี้อาย/ขี้กลัว | The timid boy hid. | เด็กขี้อายแอบซ่อน
gullible | หลงเชื่อง่าย | Don't be so gullible. | อย่าหลงเชื่อง่ายนัก
restless | กระสับกระส่าย | I feel restless. | ฉันรู้สึกกระวนกระวาย
cranky | อารมณ์ไม่ดี | The baby is cranky. | ทารกงอแง
`);
U('daily', 2, 'คุณศัพท์ความรู้สึก', `
joyful | สนุกสนาน/เปี่ยมสุข | It was a joyful day. | เป็นวันที่มีความสุข
overjoyed | ดีใจมาก | She was overjoyed. | เธอดีใจมาก
puzzled | งุนงง | He looked puzzled. | เขาดูงุนงง
miserable | ทุกข์ใจ | I feel miserable. | ฉันรู้สึกเป็นทุกข์
gloomy | หม่นหมอง | It's a gloomy day. | เป็นวันที่หม่นหมอง
uneasy | ไม่สบายใจ | I felt uneasy. | ฉันรู้สึกไม่สบายใจ
---
helpless | ช่วยตัวเองไม่ได้ | The victim felt helpless. | ผู้เสียหายรู้สึกสิ้นหวัง
hopeless | สิ้นหวัง | The situation is hopeless. | สถานการณ์สิ้นหวัง
desperate | สิ้นหวัง/ร้อนรน | He was desperate for money. | เขาร้อนเงินมาก
envious | อิจฉา | She was envious of her sister. | เธออิจฉาพี่สาว
drowsy | ง่วงซึม | This medicine makes you drowsy. | ยานี้ทำให้ง่วง
numb | ชา | My fingers are numb. | นิ้วฉันชา
`);
U('daily', 2, 'คุณศัพท์รูปร่างหน้าตา', `
chubby | จ้ำม่ำ | The baby is chubby. | ทารกจ้ำม่ำ
plump | อวบ | She is a bit plump. | เธออวบนิดหน่อย
skinny | ผอมมาก | He is very skinny. | เขาผอมมาก
slender | เพรียว | She has slender legs. | เธอมีขาเรียว
gorgeous | สวยมาก | You look gorgeous. | คุณดูสวยมาก
pale | ซีด | You look pale. | คุณดูหน้าซีด
---
scrawny | ผอมแห้ง | A scrawny dog followed us. | สุนัขผอมแห้งเดินตามเรา
hideous | น่าเกลียดมาก | It was a hideous mask. | เป็นหน้ากากที่น่าเกลียดมาก
elegant | สง่างาม | She wore an elegant dress. | เธอสวมชุดสง่างาม
graceful | อ่อนช้อย | She is a graceful dancer. | เธอเป็นนักเต้นที่อ่อนช้อย
crooked | คดงอ | He has crooked teeth. | เขาฟันเก
shabby | เก่าโทรม | He wore shabby clothes. | เขาใส่เสื้อผ้าเก่าโทรม
`);
U('daily', 3, 'คุณศัพท์ยอดเยี่ยมและน่าทึ่ง', `
incredible | เหลือเชื่อ | The view is incredible. | วิวเหลือเชื่อ
remarkable | โดดเด่น/น่าทึ่ง | She made remarkable progress. | เธอพัฒนาอย่างน่าทึ่ง
outstanding | ยอดเยี่ยม | He is an outstanding officer. | เขาเป็นเจ้าหน้าที่ดีเด่น
magnificent | งดงามยิ่งใหญ่ | The palace is magnificent. | พระราชวังงดงามยิ่งใหญ่
splendid | งดงาม/ยอดเยี่ยม | What a splendid idea! | ช่างเป็นความคิดที่ยอดเยี่ยม!
superb | ดีเลิศ | The food was superb. | อาหารดีเลิศ
---
terrific | ยอดเยี่ยม | You did a terrific job. | คุณทำได้ยอดเยี่ยม
wonderful | วิเศษ | We had a wonderful time. | เรามีช่วงเวลาที่วิเศษ
marvelous | น่าอัศจรรย์ | It was a marvelous show. | เป็นการแสดงที่น่าอัศจรรย์
stunning | สวยตะลึง | The sunset was stunning. | พระอาทิตย์ตกสวยตะลึง
breathtaking | สวยจนลืมหายใจ | The scenery is breathtaking. | ทิวทัศน์สวยจนลืมหายใจ
impressive | น่าประทับใจ | Your English is impressive. | ภาษาอังกฤษของคุณน่าประทับใจ
`);
U('daily', 3, 'คุณศัพท์ขนาดและพลัง', `
gigantic | มหึมา | It was a gigantic wave. | เป็นคลื่นมหึมา
immense | มหาศาล | The project was immense. | โครงการใหญ่โตมหาศาล
massive | ใหญ่มาก | There was a massive fire. | เกิดไฟไหม้ใหญ่
vast | กว้างใหญ่ | The ocean is vast. | มหาสมุทรกว้างใหญ่
tremendous | มหาศาล | It made a tremendous noise. | มันส่งเสียงดังมาก
mighty | ทรงพลัง | The mighty river flows fast. | แม่น้ำอันทรงพลังไหลเชี่ยว
---
sturdy | แข็งแรงทนทาน | It's a sturdy table. | เป็นโต๊ะที่แข็งแรง
robust | แข็งแกร่ง | We need a robust system. | เราต้องการระบบที่แข็งแกร่ง
fragile | เปราะบาง | Handle with care, it's fragile. | ระวัง ของแตกง่าย
feeble | อ่อนแอ | He gave a feeble excuse. | เขาให้ข้ออ้างที่ฟังไม่ขึ้น
bulky | เทอะทะ | The box is bulky. | กล่องเทอะทะ
dense | หนาแน่น/ทึบ | The forest is dense. | ป่าทึบ
`);
U('daily', 3, 'คุณศัพท์บรรยายสถานที่และบรรยากาศ', `
cozy | อบอุ่นน่าอยู่ | The café is cozy. | คาเฟ่อบอุ่นน่านั่ง
picturesque | งดงามราวภาพวาด | It's a picturesque village. | เป็นหมู่บ้านที่งดงามราวภาพวาด
tranquil | เงียบสงบ | It's a tranquil lake. | เป็นทะเลสาบที่เงียบสงบ
serene | สงบเยือกเย็น | She has a serene face. | เธอมีใบหน้าสงบเยือกเย็น
lively | มีชีวิตชีวา | The market is lively. | ตลาดคึกคัก
vibrant | มีชีวิตชีวา/สีสด | Bangkok is a vibrant city. | กรุงเทพฯ เป็นเมืองที่มีชีวิตชีวา
---
exotic | แปลกตา/ต่างถิ่น | We ate exotic fruit. | เรากินผลไม้แปลกตา
secluded | สันโดษ/ห่างไกลผู้คน | We found a secluded beach. | เราเจอชายหาดที่เงียบสงบห่างผู้คน
barren | แห้งแล้ง | The land is barren. | ดินแดนแห้งแล้ง
bleak | หดหู่/มืดมน | The future looks bleak. | อนาคตดูมืดมน
hazy | มีหมอกควัน/เลือนราง | The sky is hazy. | ท้องฟ้ามีหมอกควัน
spotless | สะอาดเอี่ยม | The kitchen is spotless. | ครัวสะอาดเอี่ยม
`);
U('daily', 3, 'คุณศัพท์ความแปลกและไร้สาระ', `
odd | แปลก | That's odd. | แปลกจัง
peculiar | ประหลาด | There's a peculiar smell. | มีกลิ่นประหลาด
bizarre | พิสดาร | It was a bizarre story. | เป็นเรื่องพิสดาร
absurd | ไร้สาระ/ไม่สมเหตุสมผล | That's absurd! | ไร้สาระสิ้นดี!
quirky | แปลกแหวกแนว | She has a quirky style. | เธอมีสไตล์แหวกแนว
mysterious | ลึกลับ | A mysterious man called. | ชายลึกลับโทรมา
---
unusual | ผิดปกติ/ไม่ธรรมดา | It's unusual for him to be late. | ผิดปกติที่เขามาสาย
unique | เป็นหนึ่งเดียว | Everyone is unique. | ทุกคนมีเอกลักษณ์
trivial | เล็กน้อย/ไม่สำคัญ | It's a trivial problem. | เป็นปัญหาเล็กน้อย
useless | ไร้ประโยชน์ | This old phone is useless. | โทรศัพท์เก่านี้ไร้ประโยชน์
worthless | ไร้ค่า | The fake ring is worthless. | แหวนปลอมไม่มีค่า
tedious | น่าเบื่อหน่าย | Paperwork is tedious. | งานเอกสารน่าเบื่อ
`);
U('daily', 3, 'คุณศัพท์อันตรายและความโหดร้าย', `
lethal | ถึงตาย | It's a lethal weapon. | เป็นอาวุธร้ายแรงถึงชีวิต
vicious | ดุร้าย/โหดเหี้ยม | It was a vicious attack. | เป็นการโจมตีที่โหดเหี้ยม
ruthless | ไร้ความปรานี | He is a ruthless criminal. | เขาเป็นอาชญากรที่ไร้ความปรานี
savage | ป่าเถื่อน | It was a savage crime. | เป็นอาชญากรรมที่ป่าเถื่อน
wicked | ชั่วร้าย | The wicked witch laughed. | แม่มดชั่วร้ายหัวเราะ
cunning | เจ้าเล่ห์ | The fox is cunning. | สุนัขจิ้งจอกเจ้าเล่ห์
---
menacing | น่ากลัว/คุกคาม | He gave me a menacing look. | เขามองฉันอย่างคุกคาม
outrageous | อุกอาจ/เกินไป | The price is outrageous. | ราคาสูงเกินไปมาก
disgusting | น่าขยะแขยง | The smell is disgusting. | กลิ่นน่าขยะแขยง
filthy | สกปรกมาก | The toilet was filthy. | ห้องน้ำสกปรกมาก
rotten | เน่า | The eggs are rotten. | ไข่เน่า
grim | น่าสยดสยอง/เคร่งเครียด | The news is grim. | ข่าวน่าหดหู่
`);
U('daily', 4, 'คุณศัพท์ความระมัดระวังและความกล้า', `
cautious | ระมัดระวัง | Be cautious at night. | ระมัดระวังในตอนกลางคืน
wary | ระแวง | Be wary of strangers. | ระวังคนแปลกหน้า
vigilant | ตื่นตัว/เฝ้าระวัง | Officers must be vigilant. | เจ้าหน้าที่ต้องตื่นตัว
prudent | รอบคอบ | It's prudent to save money. | การออมเงินเป็นเรื่องรอบคอบ
fearless | ไม่เกรงกลัว | She is a fearless reporter. | เธอเป็นนักข่าวที่ไม่กลัวอะไร
daring | กล้าบ้าบิ่น | It was a daring rescue. | เป็นการช่วยเหลือที่กล้าหาญ
---
valiant | กล้าหาญ | He made a valiant effort. | เขาพยายามอย่างกล้าหาญ
adventurous | ชอบผจญภัย | She is adventurous. | เธอชอบผจญภัย
hasty | รีบร้อน | Don't make a hasty decision. | อย่าตัดสินใจรีบร้อน
frantic | ร้อนรน/วุ่นวาย | She made a frantic call. | เธอโทรมาอย่างร้อนรน
hysterical | ตื่นตระหนกสุดขีด | The woman was hysterical. | ผู้หญิงคนนั้นตื่นตระหนกสุดขีด
defiant | ท้าทาย/ขัดขืน | He was defiant in court. | เขาแสดงท่าทีท้าทายในศาล
`);
U('daily', 4, 'คุณศัพท์คุณค่าและความหรูหรา', `
precious | ล้ำค่า | Time is precious. | เวลามีค่า
valuable | มีค่า | Keep your valuables safe. | เก็บของมีค่าให้ปลอดภัย
luxurious | หรูหรา | It's a luxurious hotel. | เป็นโรงแรมหรูหรา
lavish | ฟุ่มเฟือย/อลังการ | They had a lavish wedding. | พวกเขาจัดงานแต่งอลังการ
wealthy | ร่ำรวย | He is a wealthy businessman. | เขาเป็นนักธุรกิจที่ร่ำรวย
affordable | ราคาไม่แพง | The rent is affordable. | ค่าเช่าราคาไม่แพง
---
frugal | ประหยัด/มัธยัสถ์ | She lives a frugal life. | เธอใช้ชีวิตอย่างประหยัด
thrifty | ประหยัด | My mom is thrifty. | แม่ฉันประหยัด
scarce | ขาดแคลน | Water is scarce in summer. | น้ำขาดแคลนในหน้าร้อน
ample | เพียงพอ/มากมาย | There is ample parking. | มีที่จอดรถเพียงพอ
authentic | แท้ | This is authentic Thai food. | นี่คืออาหารไทยแท้
exquisite | ประณีตงดงาม | The silk is exquisite. | ผ้าไหมประณีตงดงาม
`);
U('daily', 4, 'คุณศัพท์ความรู้สึกและท่าที', `
affectionate | รักใคร่/แสดงความรัก | The cat is affectionate. | แมวขี้อ้อน
tender | อ่อนโยน/นุ่ม | The meat is tender. | เนื้อนุ่ม
intimate | ใกล้ชิดสนิทสนม | They are intimate friends. | พวกเขาเป็นเพื่อนสนิท
devoted | ทุ่มเท/ซื่อสัตย์ | She is a devoted mother. | เธอเป็นแม่ที่ทุ่มเท
earnest | จริงจัง/จริงใจ | He made an earnest request. | เขาขอร้องอย่างจริงจัง
candid | ตรงไปตรงมา | She gave a candid answer. | เธอตอบอย่างตรงไปตรงมา
---
solemn | เคร่งขรึม | It was a solemn ceremony. | เป็นพิธีที่เคร่งขรึม
sullen | บึ้งตึง | He was sullen all day. | เขาหน้าบึ้งทั้งวัน
weary | เหนื่อยล้า | She looked weary. | เธอดูเหนื่อยล้า
troubled | มีปัญหา/กังวลใจ | He has a troubled past. | เขามีอดีตที่มีปัญหา
spiteful | มุ่งร้าย | It was a spiteful comment. | เป็นความเห็นที่มุ่งร้าย
petty | เล็กน้อย/ใจแคบ | Don't be petty. | อย่าใจแคบ
`);
U('daily', 4, 'คุณศัพท์การกระทำและความเร็ว', `
swift | รวดเร็ว | Police took swift action. | ตำรวจดำเนินการอย่างรวดเร็ว
brisk | กระฉับกระเฉง/สดชื่น | We took a brisk walk. | เราเดินเร็วๆ
agile | คล่องแคล่ว | Cats are agile. | แมวคล่องแคล่ว
abrupt | กะทันหัน/ห้วน | The bus made an abrupt stop. | รถเมล์เบรกกะทันหัน
idle | ว่าง/เกียจคร้าน | Don't leave the engine idle. | อย่าติดเครื่องทิ้งไว้
persistent | ไม่ลดละ/เรื้อรัง | He has a persistent cough. | เขาไอเรื้อรัง
---
vigorous | แข็งขัน/กระฉับกระเฉง | Do vigorous exercise. | ออกกำลังกายหนักๆ
intense | เข้มข้น/รุนแรง | The heat was intense. | ความร้อนรุนแรง
rigid | แข็งทื่อ/เคร่งครัด | The rules are too rigid. | กฎเคร่งครัดเกินไป
flawless | ไร้ที่ติ | Her English is flawless. | ภาษาอังกฤษของเธอไร้ที่ติ
vivid | ชัดเจน/สดใส | I have a vivid memory of it. | ฉันจำได้อย่างชัดเจน
subtle | แนบเนียน/ละเอียดอ่อน | There is a subtle difference. | มีความต่างเล็กน้อย
`);
U('daily', 5, 'คุณศัพท์ขั้นสูง: นิสัยและสถานะ', `
naive | ไร้เดียงสา | Don't be naive. | อย่าไร้เดียงสานัก
ignorant | ไม่รู้/โง่เขลา | He is ignorant of the law. | เขาไม่รู้กฎหมาย
shrewd | หลักแหลม | She is a shrewd businesswoman. | เธอเป็นนักธุรกิจที่หลักแหลม
pompous | วางท่า/โอ้อวด | He is a pompous man. | เขาเป็นคนวางท่า
obnoxious | น่ารังเกียจ | His behavior was obnoxious. | พฤติกรรมเขาน่ารังเกียจ
vulgar | หยาบคาย | Don't use vulgar language. | อย่าใช้ภาษาหยาบคาย
---
noble | สูงส่ง/มีเกียรติ | It's a noble cause. | เป็นจุดมุ่งหมายอันสูงส่ง
honorable | มีเกียรติ | He is an honorable man. | เขาเป็นคนมีเกียรติ
merciful | เมตตา | Be merciful. | จงมีเมตตา
obedient | เชื่อฟัง | The dog is obedient. | สุนัขเชื่อฟัง
meek | อ่อนน้อม/ว่านอนสอนง่าย | She is meek and quiet. | เธออ่อนน้อมและเงียบ
zealous | กระตือรือร้นมาก | He is a zealous supporter. | เขาเป็นผู้สนับสนุนที่แรงกล้า
`);
U('daily', 5, 'คุณศัพท์ขั้นสูง: คุณภาพ', `
superior | เหนือกว่า/ผู้บังคับบัญชา | Report to your superior. | รายงานผู้บังคับบัญชา
dependable | พึ่งพาได้ | He is a dependable officer. | เขาเป็นเจ้าหน้าที่ที่พึ่งพาได้
gifted | มีพรสวรรค์ | She is a gifted child. | เธอเป็นเด็กมีพรสวรรค์
inventive | ช่างคิดค้น | He is very inventive. | เขาช่างคิดค้นมาก
keen | กระตือรือร้น/แหลมคม | She is keen to learn. | เธอกระตือรือร้นที่จะเรียน
glorious | รุ่งโรจน์/งดงาม | It was a glorious day. | เป็นวันที่งดงาม
---
majestic | สง่างามยิ่งใหญ่ | The mountains are majestic. | ภูเขาสง่างามยิ่งใหญ่
radiant | เปล่งปลั่ง | She looked radiant. | เธอดูเปล่งปลั่ง
mellow | นุ่มนวล/ผ่อนคลาย | The music is mellow. | ดนตรีนุ่มนวล
quaint | น่ารักแบบเก่าๆ | It's a quaint little town. | เป็นเมืองเล็กๆ น่ารักแบบโบราณ
harmless | ไม่มีอันตราย | The snake is harmless. | งูไม่มีพิษ
tame | เชื่อง | The bird is tame. | นกเชื่อง
`);
U('daily', 5, 'คุณศัพท์ขั้นสูง: ความรู้สึกเชิงลบ', `
wretched | น่าสังเวช | They live in wretched conditions. | พวกเขาอยู่ในสภาพน่าสังเวช
tragic | น่าเศร้า | It was a tragic accident. | เป็นอุบัติเหตุที่น่าเศร้า
painful | เจ็บปวด | It's a painful memory. | เป็นความทรงจำที่เจ็บปวด
sore | เจ็บ (ระบม) | My muscles are sore. | กล้ามเนื้อฉันระบม
hollow | กลวง | The tree trunk is hollow. | ลำต้นกลวง
dim | สลัว | The light is dim. | ไฟสลัว
---
dull | น่าเบื่อ/ทื่อ | The meeting was dull. | การประชุมน่าเบื่อ
bland | จืดชืด | The food is bland. | อาหารจืดชืด
coarse | หยาบ | The fabric is coarse. | ผ้าหยาบ
greasy | มันเยิ้ม | Greasy food is unhealthy. | อาหารมันๆ ไม่ดีต่อสุขภาพ
soggy | แฉะ/เปียกแฉะ | The bread is soggy. | ขนมปังแฉะ
moist | ชุ่มชื้น | The cake is moist. | เค้กนุ่มชุ่มชื่น
`);

U('daily', 3, 'คุณศัพท์เพิ่มเติม ชุด 1', `
acute | เฉียบพลัน/รุนแรง | He has acute pain. | เขาปวดเฉียบพลัน
anonymous | ไม่ระบุชื่อ | An anonymous caller gave a tip. | ผู้โทรไม่ระบุชื่อให้เบาะแส
appealing | น่าดึงดูด | The offer is appealing. | ข้อเสนอน่าสนใจ
astonishing | น่าประหลาดใจมาก | The result was astonishing. | ผลลัพธ์น่าทึ่งมาก
bumpy | ขรุขระ/กระแทก | It was a bumpy ride. | การเดินทางกระแทกตลอด
brittle | เปราะ | Old bones are brittle. | กระดูกคนแก่เปราะ
---
crisp | กรอบ/สดชื่น | The air is crisp. | อากาศสดชื่น
dainty | บอบบางน่ารัก | She has dainty hands. | เธอมีมือเล็กบอบบาง
dazzling | แสบตา/สวยตระการ | The lights were dazzling. | แสงไฟแสบตา
delightful | น่ายินดี/น่ารื่นรมย์ | We had a delightful evening. | เรามีค่ำคืนที่น่ารื่นรมย์
enthusiastic | กระตือรือร้น | The students are enthusiastic. | นักเรียนกระตือรือร้น
fragrant | หอม | Jasmine is fragrant. | มะลิหอม
`);
U('daily', 3, 'คุณศัพท์เพิ่มเติม ชุด 2', `
fuzzy | ฟู/พร่ามัว | The photo is fuzzy. | รูปพร่ามัว
worthy | สมควร/มีค่าควร | He is worthy of trust. | เขาควรค่าแก่การไว้วางใจ
gracious | เมตตา/สุภาพอ่อนโยน | She is a gracious host. | เธอเป็นเจ้าภาพที่สุภาพอ่อนโยน
heavenly | ราวสวรรค์ | This cake tastes heavenly. | เค้กนี้อร่อยราวสวรรค์
hesitant | ลังเล | She was hesitant to speak. | เธอลังเลที่จะพูด
jolly | ร่าเริง | Santa is jolly. | ซานตาร่าเริง
---
prickly | มีหนาม/ขี้รำคาญ | The cactus is prickly. | กระบองเพชรมีหนาม
rusty | ขึ้นสนิม/ฝีมือตก | My English is a bit rusty. | ภาษาอังกฤษของฉันฝืดไปหน่อย
sleek | เพรียว/เงางาม | It's a sleek new phone. | เป็นโทรศัพท์ใหม่ที่ดูเพรียวงาม
sloppy | สะเพร่า/เลอะเทอะ | That was sloppy work. | งานนั้นทำแบบลวกๆ
sparkling | ระยิบระยับ/อัดลม | I'll have sparkling water. | ฉันขอน้ำแร่อัดลม
upbeat | ร่าเริง/มองโลกในแง่ดี | The song is upbeat. | เพลงนี้สนุกสดใส
`);
U('daily', 1, 'คำบอกสถานที่และเวลา', `
abroad | ต่างประเทศ | She studied abroad. | เธอเรียนต่อต่างประเทศ
ahead | ข้างหน้า | Go straight ahead. | ตรงไปข้างหน้า
anywhere | ที่ไหนก็ได้ | Sit anywhere you like. | นั่งที่ไหนก็ได้ที่ชอบ
elsewhere | ที่อื่น | Let's eat elsewhere. | ไปกินที่อื่นกัน
indoors | ในร่ม/ในบ้าน | Stay indoors during the storm. | อยู่ในบ้านช่วงพายุ
outdoors | กลางแจ้ง | Kids love playing outdoors. | เด็กๆ ชอบเล่นกลางแจ้ง
---
overseas | ต่างประเทศ | He works overseas. | เขาทำงานต่างประเทศ
together | ด้วยกัน | Let's go together. | ไปด้วยกันเถอะ
tonight | คืนนี้ | What are you doing tonight? | คืนนี้คุณทำอะไร
once | หนึ่งครั้ง/ครั้งหนึ่ง | I've been there once. | ฉันเคยไปที่นั่นครั้งหนึ่ง
lately | ช่วงนี้ | I've been busy lately. | ช่วงนี้ฉันยุ่ง
shortly | ในไม่ช้า | The doctor will see you shortly. | หมอจะตรวจคุณในไม่ช้า
`);
U('daily', 2, 'คำบอกความถี่', `
rarely | นานๆ ครั้ง | I rarely eat fast food. | ฉันกินฟาสต์ฟู้ดนานๆ ครั้ง
seldom | แทบไม่ | He seldom goes out. | เขาแทบไม่ออกไปไหน
occasionally | บางครั้งบางคราว | We occasionally meet for lunch. | บางครั้งเราก็นัดกินข้าวเที่ยง
frequently | บ่อยๆ | Accidents happen frequently here. | อุบัติเหตุเกิดบ่อยที่นี่
regularly | เป็นประจำ | Exercise regularly. | ออกกำลังกายเป็นประจำ
constantly | ตลอดเวลา | He is constantly late. | เขามาสายตลอด
---
repeatedly | ซ้ำๆ | He called repeatedly. | เขาโทรมาซ้ำๆ
hourly | ทุกชั่วโมง | Buses leave hourly. | รถออกทุกชั่วโมง
yearly | ทุกปี | We have a yearly check-up. | เราตรวจสุขภาพทุกปี
normally | ตามปกติ | I normally wake up at six. | ปกติฉันตื่นหกโมง
typically | โดยทั่วไป | It typically takes an hour. | โดยทั่วไปใช้เวลาหนึ่งชั่วโมง
generally | โดยทั่วไป/ส่วนใหญ่ | People are generally kind. | คนส่วนใหญ่ใจดี
`);
U('daily', 2, 'คำบอกระดับมากน้อย', `
almost | เกือบ | I'm almost ready. | ฉันเกือบพร้อมแล้ว
nearly | เกือบ | It's nearly midnight. | เกือบเที่ยงคืนแล้ว
barely | แทบจะไม่ | I can barely see. | ฉันแทบมองไม่เห็น
scarcely | แทบจะไม่ | There was scarcely any food. | แทบไม่มีอาหารเลย
fairly | ค่อนข้าง | The test was fairly easy. | ข้อสอบค่อนข้างง่าย
somewhat | ค่อนข้าง/บ้าง | I'm somewhat tired. | ฉันค่อนข้างเหนื่อย
---
slightly | เล็กน้อย | The price rose slightly. | ราคาขึ้นเล็กน้อย
extremely | อย่างมาก | It's extremely hot. | ร้อนมาก
highly | อย่างยิ่ง | I highly recommend it. | ฉันแนะนำอย่างยิ่ง
greatly | อย่างมาก | Your help is greatly appreciated. | ขอบคุณสำหรับความช่วยเหลืออย่างมาก
utterly | อย่างสิ้นเชิง | I was utterly exhausted. | ฉันเหนื่อยสุดๆ
relatively | ค่อนข้าง (เมื่อเทียบ) | It's relatively cheap. | ค่อนข้างถูกเมื่อเทียบกัน
`);
U('daily', 2, 'คำบอกลักษณะการกระทำ 1', `
carefully | อย่างระมัดระวัง | Drive carefully. | ขับรถอย่างระมัดระวัง
quietly | อย่างเงียบๆ | Please speak quietly. | กรุณาพูดเบาๆ
softly | อย่างนุ่มนวล/เบาๆ | She spoke softly. | เธอพูดเบาๆ
gently | อย่างอ่อนโยน | Hold the baby gently. | อุ้มทารกเบาๆ
rudely | อย่างหยาบคาย | He spoke rudely to me. | เขาพูดกับฉันอย่างหยาบคาย
sadly | อย่างเศร้า/น่าเสียดาย | Sadly, he died. | น่าเศร้าที่เขาเสียชีวิต
---
gladly | ด้วยความยินดี | I'll gladly help. | ฉันยินดีช่วย
eagerly | อย่างกระตือรือร้น | We waited eagerly. | เรารออย่างใจจดใจจ่อ
patiently | อย่างอดทน | Wait patiently. | รออย่างอดทน
warmly | อย่างอบอุ่น | They welcomed us warmly. | พวกเขาต้อนรับเราอย่างอบอุ่น
wisely | อย่างฉลาด | Spend your money wisely. | ใช้เงินอย่างฉลาด
wildly | อย่างบ้าคลั่ง | The crowd cheered wildly. | ฝูงชนโห่ร้องอย่างบ้าคลั่ง
`);
U('daily', 3, 'คำบอกลักษณะการกระทำ 2', `
easily | อย่างง่ายดาย | He passed easily. | เขาสอบผ่านอย่างง่ายดาย
firmly | อย่างมั่นคง/หนักแน่น | Hold it firmly. | จับให้แน่น
tightly | แน่น | Close the lid tightly. | ปิดฝาให้แน่น
smoothly | อย่างราบรื่น | Everything went smoothly. | ทุกอย่างเป็นไปอย่างราบรื่น
steadily | อย่างสม่ำเสมอ | Prices rose steadily. | ราคาสูงขึ้นอย่างต่อเนื่อง
swiftly | อย่างรวดเร็ว | Police acted swiftly. | ตำรวจลงมืออย่างรวดเร็ว
---
rapidly | อย่างรวดเร็ว | The fire spread rapidly. | ไฟลามอย่างรวดเร็ว
promptly | ทันที/ตรงเวลา | Reply promptly. | ตอบกลับทันที
instantly | ทันที | He died instantly. | เขาเสียชีวิตทันที
immediately | ทันที | Call the police immediately. | โทรแจ้งตำรวจทันที
urgently | อย่างเร่งด่วน | We urgently need blood. | เราต้องการเลือดด่วน
silently | อย่างเงียบเชียบ | He left silently. | เขาจากไปอย่างเงียบๆ
`);
U('daily', 3, 'คำบอกลักษณะการกระทำ 3', `
neatly | อย่างเรียบร้อย | Fold your clothes neatly. | พับเสื้อผ้าให้เรียบร้อย
properly | อย่างถูกต้อง | Wear your uniform properly. | สวมเครื่องแบบให้ถูกต้อง
perfectly | อย่างสมบูรณ์แบบ | It fits perfectly. | พอดีเป๊ะ
precisely | อย่างแม่นยำ | That's precisely what I mean. | นั่นแหละที่ฉันหมายถึง
thoroughly | อย่างละเอียดถี่ถ้วน | Search the room thoroughly. | ค้นห้องอย่างละเอียด
strictly | อย่างเคร่งครัด | Smoking is strictly prohibited. | ห้ามสูบบุหรี่โดยเด็ดขาด
---
sharply | อย่างแหลมคม/ฮวบ | Prices fell sharply. | ราคาลดลงฮวบ
strongly | อย่างแข็งขัน | I strongly disagree. | ฉันไม่เห็นด้วยอย่างยิ่ง
heavily | อย่างหนัก | It rained heavily. | ฝนตกหนัก
deeply | อย่างลึกซึ้ง | I'm deeply sorry. | ฉันเสียใจอย่างสุดซึ้ง
freely | อย่างอิสระ | Speak freely. | พูดได้อย่างอิสระ
openly | อย่างเปิดเผย | He talked openly about it. | เขาพูดเรื่องนั้นอย่างเปิดเผย
`);
U('daily', 3, 'คำบอกความแน่นอนและความเป็นไปได้', `
certainly | แน่นอน | I will certainly come. | ฉันจะมาแน่นอน
surely | แน่นอน/คงจะ | Surely you know him? | คุณรู้จักเขาแน่ๆ ใช่ไหม
truly | อย่างแท้จริง | I'm truly sorry. | ฉันขอโทษจริงๆ
clearly | อย่างชัดเจน | Speak clearly. | พูดให้ชัดเจน
apparently | ดูเหมือนว่า | Apparently, he left early. | ดูเหมือนว่าเขาออกไปก่อน
evidently | เห็นได้ชัดว่า | He was evidently drunk. | เห็นได้ชัดว่าเขาเมา
---
possibly | อาจจะ | It will possibly rain. | ฝนอาจจะตก
potentially | อาจเป็นไปได้ | It's potentially dangerous. | อาจเป็นอันตรายได้
supposedly | ว่ากันว่า | He is supposedly rich. | ว่ากันว่าเขารวย
seemingly | ดูเหมือน | It was a seemingly easy task. | เป็นงานที่ดูเหมือนง่าย
hopefully | หวังว่า | Hopefully, it won't rain. | หวังว่าฝนจะไม่ตก
fortunately | โชคดีที่ | Fortunately, nobody was hurt. | โชคดีที่ไม่มีใครบาดเจ็บ
`);
U('daily', 3, 'คำบอกเวลาและลำดับเหตุการณ์', `
afterwards | หลังจากนั้น | We ate and afterwards went home. | เรากินข้าวแล้วหลังจากนั้นก็กลับบ้าน
beforehand | ล่วงหน้า | Call me beforehand. | โทรบอกฉันล่วงหน้า
currently | ปัจจุบันนี้ | He is currently in custody. | ปัจจุบันเขาถูกควบคุมตัว
formerly | แต่ก่อน | The building was formerly a school. | อาคารนี้แต่ก่อนเป็นโรงเรียน
previously | ก่อนหน้านี้ | I previously worked in a bank. | ก่อนหน้านี้ฉันทำงานธนาคาร
presently | ตอนนี้/ในไม่ช้า | He is presently on leave. | ตอนนี้เขาลาพัก
---
initially | ในตอนแรก | Initially, he denied it. | ตอนแรกเขาปฏิเสธ
originally | แต่เดิม | I'm originally from Korat. | เดิมฉันเป็นคนโคราช
ultimately | ท้ายที่สุด | Ultimately, it's your choice. | ท้ายที่สุดก็เป็นทางเลือกของคุณ
newly | ใหม่ๆ/เพิ่ง | They are newly married. | พวกเขาเพิ่งแต่งงาน
temporarily | ชั่วคราว | The road is temporarily closed. | ถนนปิดชั่วคราว
permanently | อย่างถาวร | He moved permanently. | เขาย้ายไปอย่างถาวร
`);
U('daily', 4, 'คำบอกขอบเขตและความสำคัญ', `
especially | โดยเฉพาะ | I love fruit, especially mango. | ฉันชอบผลไม้ โดยเฉพาะมะม่วง
mainly | ส่วนใหญ่/หลักๆ | The victims were mainly tourists. | ผู้เสียหายส่วนใหญ่เป็นนักท่องเที่ยว
mostly | ส่วนมาก | The sky is mostly clear. | ท้องฟ้าส่วนใหญ่แจ่มใส
primarily | เป็นหลัก | The course is primarily for beginners. | คอร์สนี้สำหรับผู้เริ่มต้นเป็นหลัก
solely | เพียงอย่างเดียว | You are solely responsible. | คุณต้องรับผิดชอบแต่เพียงผู้เดียว
merely | เพียงแค่ | It was merely a joke. | มันเป็นแค่เรื่องตลก
---
purely | ล้วนๆ | It was purely an accident. | มันเป็นอุบัติเหตุล้วนๆ
partly | บางส่วน | It's partly my fault. | ส่วนหนึ่งเป็นความผิดของฉัน
fully | อย่างเต็มที่ | I fully agree. | ฉันเห็นด้วยเต็มที่
entirely | ทั้งหมด | It's entirely up to you. | ขึ้นอยู่กับคุณทั้งหมด
completely | อย่างสมบูรณ์/โดยสิ้นเชิง | I completely forgot. | ฉันลืมสนิท
virtually | เกือบจะ | It's virtually impossible. | แทบเป็นไปไม่ได้
`);
U('daily', 4, 'คำบอกท่าทีของผู้พูด', `
frankly | พูดตรงๆ | Frankly, I don't care. | พูดตรงๆ ฉันไม่สน
personally | โดยส่วนตัว | Personally, I prefer tea. | โดยส่วนตัวฉันชอบชามากกว่า
genuinely | อย่างจริงใจ | She was genuinely happy. | เธอดีใจจริงๆ
sincerely | ด้วยความจริงใจ | Yours sincerely, | ด้วยความนับถือ
willingly | ด้วยความเต็มใจ | He willingly helped us. | เขาเต็มใจช่วยเรา
reluctantly | อย่างไม่เต็มใจ | He reluctantly agreed. | เขาตกลงอย่างไม่เต็มใจ
---
deliberately | โดยเจตนา | He deliberately broke it. | เขาจงใจทำแตก
intentionally | โดยตั้งใจ | Did you do it intentionally? | คุณตั้งใจทำหรือเปล่า
secretly | อย่างลับๆ | They met secretly. | พวกเขาแอบพบกัน
officially | อย่างเป็นทางการ | The road is officially open. | ถนนเปิดอย่างเป็นทางการ
plainly | อย่างชัดแจ้ง/เรียบง่าย | He was plainly lying. | เห็นชัดว่าเขาโกหก
naturally | โดยธรรมชาติ/แน่นอน | Naturally, she was upset. | แน่นอนว่าเธอเสียใจ
`);
U('daily', 4, 'คำเชื่อมและคำวิเศษณ์บอกทิศทาง', `
accordingly | ตามนั้น/ดังนั้น | Act accordingly. | ปฏิบัติตามนั้น
likewise | เช่นเดียวกัน | Nice to meet you. — Likewise. | ยินดีที่ได้รู้จัก — เช่นกัน
similarly | ในทำนองเดียวกัน | Similarly, prices rose last year. | ในทำนองเดียวกัน ปีที่แล้วราคาก็สูงขึ้น
nonetheless | อย่างไรก็ตาม | It was hard; nonetheless, we finished. | มันยาก อย่างไรก็ตามเราทำเสร็จ
indeed | จริงๆ/แท้จริง | It was indeed a great day. | มันเป็นวันที่ยอดเยี่ยมจริงๆ
somehow | อย่างไรก็ตาม/ด้วยวิธีใดก็ตาม | Somehow, we got home. | ไม่รู้ยังไงแต่เรากลับถึงบ้านได้
---
aside | ไว้ข้างๆ | Put your phone aside. | วางโทรศัพท์ไว้ข้างๆ
anymore | อีกต่อไป | I don't smoke anymore. | ฉันไม่สูบบุหรี่แล้ว
awhile | สักพัก | Stay awhile. | อยู่สักพักสิ
alongside | ข้างๆ/ควบคู่ | Officers worked alongside soldiers. | เจ้าหน้าที่ทำงานควบคู่กับทหาร
backwards | ถอยหลัง/กลับหลัง | Count backwards from ten. | นับถอยหลังจากสิบ
increasingly | มากขึ้นเรื่อยๆ | It's increasingly difficult. | ยากขึ้นเรื่อยๆ
`);
U('daily', 5, 'คำวิเศษณ์ขั้นสูง ชุด 1', `
simultaneously | พร้อมกัน | They spoke simultaneously. | พวกเขาพูดพร้อมกัน
significantly | อย่างมีนัยสำคัญ | Crime fell significantly. | อาชญากรรมลดลงอย่างมาก
specifically | โดยเฉพาะ/อย่างเจาะจง | I specifically asked for tea. | ฉันขอชาโดยเฉพาะ
essentially | โดยพื้นฐาน | It's essentially the same. | โดยพื้นฐานแล้วเหมือนกัน
consistently | อย่างสม่ำเสมอ | She consistently scores high. | เธอได้คะแนนสูงอย่างสม่ำเสมอ
doubtless | อย่างไม่ต้องสงสัย | He will doubtless win. | เขาจะชนะอย่างไม่ต้องสงสัย
---
vaguely | อย่างคลุมเครือ/ลางๆ | I vaguely remember him. | ฉันจำเขาได้ลางๆ
commonly | โดยทั่วไป | It's commonly used. | ใช้กันทั่วไป
closely | อย่างใกล้ชิด | Watch him closely. | จับตาดูเขาใกล้ชิด
directly | โดยตรง | Contact your bank directly. | ติดต่อธนาคารโดยตรง
equally | อย่างเท่าเทียม | Treat everyone equally. | ปฏิบัติต่อทุกคนอย่างเท่าเทียม
separately | แยกกัน | Interview them separately. | สอบปากคำแยกกัน
`);
U('daily', 5, 'คำวิเศษณ์ขั้นสูง ชุด 2', `
readily | อย่างง่ายดาย/เต็มใจ | Help is readily available. | มีความช่วยเหลือพร้อมเสมอ
necessarily | จำเป็น (เสมอไป) | Expensive isn't necessarily better. | แพงไม่จำเป็นต้องดีกว่า
worldwide | ทั่วโลก | The song is famous worldwide. | เพลงนี้ดังทั่วโลก
casually | อย่างสบายๆ | He dressed casually. | เขาแต่งตัวสบายๆ
briefly | สั้นๆ | Explain briefly. | อธิบายสั้นๆ
gradually | ทีละน้อย | He gradually got better. | เขาค่อยๆ ดีขึ้น
---
unexpectedly | อย่างไม่คาดคิด | He arrived unexpectedly. | เขามาถึงอย่างไม่คาดคิด
safely | อย่างปลอดภัย | We arrived safely. | เรามาถึงอย่างปลอดภัย
widely | อย่างกว้างขวาง | English is widely spoken. | ภาษาอังกฤษใช้กันอย่างกว้างขวาง
simply | เพียงแค่/อย่างง่าย | Simply press this button. | แค่กดปุ่มนี้
loosely | อย่างหลวมๆ | Tie it loosely. | ผูกหลวมๆ
fiercely | อย่างดุเดือด | They fought fiercely. | พวกเขาต่อสู้อย่างดุเดือด
`);

U('daily', 2, 'คอมพิวเตอร์และอุปกรณ์', `
browser | เบราว์เซอร์ | Open your web browser. | เปิดเบราว์เซอร์
cursor | เคอร์เซอร์ | Move the cursor here. | เลื่อนเคอร์เซอร์มาตรงนี้
desktop | หน้าจอเดสก์ท็อป/คอมตั้งโต๊ะ | Save it on the desktop. | บันทึกไว้ที่หน้าจอ
hardware | ฮาร์ดแวร์ | The hardware is old. | ฮาร์ดแวร์เก่าแล้ว
software | ซอฟต์แวร์ | Install the new software. | ติดตั้งซอฟต์แวร์ใหม่
icon | ไอคอน | Click the icon. | คลิกไอคอน
---
modem | โมเด็ม | Restart the modem. | รีสตาร์ทโมเด็ม
router | เราเตอร์ | The router is in the living room. | เราเตอร์อยู่ในห้องนั่งเล่น
webcam | เว็บแคม | Turn on your webcam. | เปิดเว็บแคม
tablet | แท็บเล็ต/ยาเม็ด | I study on my tablet. | ฉันเรียนบนแท็บเล็ต
touchscreen | จอสัมผัส | The phone has a touchscreen. | โทรศัพท์มีจอสัมผัส
wireless | ไร้สาย | I use a wireless mouse. | ฉันใช้เมาส์ไร้สาย
`);
U('daily', 3, 'อินเทอร์เน็ตและโปรแกรม', `
digital | ดิจิทัล | Keep a digital copy. | เก็บสำเนาดิจิทัลไว้
interface | หน้าตาโปรแกรม/ส่วนต่อประสาน | The app has a simple interface. | แอปมีหน้าตาเรียบง่าย
pixel | พิกเซล | The image has low pixels. | รูปภาพความละเอียดต่ำ
processor | หน่วยประมวลผล | This laptop has a fast processor. | แล็ปท็อปนี้ประมวลผลเร็ว
spreadsheet | ตารางคำนวณ | Put the data in a spreadsheet. | ใส่ข้อมูลในตารางคำนวณ
virus | ไวรัส | My computer has a virus. | คอมพิวเตอร์ฉันติดไวรัส
---
bandwidth | แบนด์วิดท์ | Video uses a lot of bandwidth. | วิดีโอใช้แบนด์วิดท์มาก
domain | โดเมน/ขอบเขต | Buy a domain name. | ซื้อชื่อโดเมน
inbox | กล่องข้อความเข้า | Check your inbox. | ตรวจกล่องข้อความ
spam | สแปม/ข้อความขยะ | The email went to spam. | อีเมลเข้าไปอยู่ในสแปม
tab | แท็บ | Open a new tab. | เปิดแท็บใหม่
template | แม่แบบ | Use this template. | ใช้แม่แบบนี้
`);
U('daily', 3, 'เทคโนโลยีใกล้ตัว', `
gadget | อุปกรณ์ไฮเทค | He loves new gadgets. | เขาชอบอุปกรณ์ไฮเทคใหม่ๆ
podcast | พอดแคสต์ | I listen to podcasts. | ฉันฟังพอดแคสต์
program | โปรแกรม/รายการ | Install the program. | ติดตั้งโปรแกรม
robotics | วิทยาการหุ่นยนต์ | She studies robotics. | เธอเรียนวิทยาการหุ่นยนต์
smartwatch | นาฬิกาอัจฉริยะ | My smartwatch counts my steps. | นาฬิกาอัจฉริยะนับก้าวของฉัน
thumbnail | ภาพย่อ | Click the thumbnail. | คลิกภาพย่อ
---
toolbar | แถบเครื่องมือ | The button is on the toolbar. | ปุ่มอยู่บนแถบเครื่องมือ
widget | วิดเจ็ต | Add a weather widget. | เพิ่มวิดเจ็ตสภาพอากาศ
firmware | เฟิร์มแวร์ | Update the firmware. | อัปเดตเฟิร์มแวร์
earphones | หูฟัง | Use earphones on the bus. | ใช้หูฟังบนรถเมล์
power bank | แบตสำรอง | Bring a power bank. | พกแบตสำรองไปด้วย
hotspot | ฮอตสปอต | Turn on your hotspot. | เปิดฮอตสปอต
`);
U('daily', 2, 'อาการป่วยที่พบบ่อย', `
ache | ปวด | I have a back ache. | ฉันปวดหลัง
flu | ไข้หวัดใหญ่ | I have the flu. | ฉันเป็นไข้หวัดใหญ่
germ | เชื้อโรค | Wash your hands to kill germs. | ล้างมือเพื่อฆ่าเชื้อโรค
illness | ความเจ็บป่วย | He has a serious illness. | เขาป่วยหนัก
injury | การบาดเจ็บ | He had a head injury. | เขาบาดเจ็บที่ศีรษะ
nausea | อาการคลื่นไส้ | The medicine may cause nausea. | ยาอาจทำให้คลื่นไส้
---
dizziness | อาการเวียนหัว | Dizziness is a side effect. | อาการเวียนหัวเป็นผลข้างเคียง
migraine | ไมเกรน | She has a migraine. | เธอเป็นไมเกรน
asthma | หอบหืด | He has asthma. | เขาเป็นโรคหอบหืด
vitamin | วิตามิน | Take your vitamins. | กินวิตามิน
thermometer | ปรอทวัดไข้ | Use a thermometer. | ใช้ปรอทวัดไข้
crutch | ไม้ค้ำยัน | He walks with crutches. | เขาเดินด้วยไม้ค้ำ
`);
U('daily', 4, 'โรคและการรักษาในโรงพยาบาล', `
appendix | ไส้ติ่ง | He had his appendix removed. | เขาผ่าตัดไส้ติ่ง
cancer | มะเร็ง | Smoking causes cancer. | การสูบบุหรี่ทำให้เป็นมะเร็ง
insulin | อินซูลิน | Diabetics need insulin. | ผู้ป่วยเบาหวานต้องใช้อินซูลิน
obesity | โรคอ้วน | Obesity is a health problem. | โรคอ้วนเป็นปัญหาสุขภาพ
pneumonia | ปอดบวม | He has pneumonia. | เขาเป็นปอดบวม
stroke | โรคหลอดเลือดสมอง | He had a stroke. | เขาเป็นโรคหลอดเลือดสมอง
---
tumor | เนื้องอก | Doctors found a tumor. | แพทย์พบเนื้องอก
ulcer | แผลในกระเพาะ | He has a stomach ulcer. | เขาเป็นแผลในกระเพาะ
syringe | เข็มฉีดยา | Police found a syringe. | ตำรวจพบเข็มฉีดยา
stitch | เย็บแผล | He needed five stitches. | เขาต้องเย็บแผลห้าเข็ม
ward | หอผู้ป่วย | She is in the children's ward. | เธออยู่หอผู้ป่วยเด็ก
surgeon | ศัลยแพทย์ | The surgeon saved his life. | ศัลยแพทย์ช่วยชีวิตเขาไว้
`);
U('daily', 1, 'อาชีพ ชุด 1', `
baker | คนทำขนมปัง | The baker makes bread. | คนทำขนมปังอบขนมปัง
butcher | คนขายเนื้อ | Buy meat from the butcher. | ซื้อเนื้อจากร้านขายเนื้อ
carpenter | ช่างไม้ | The carpenter made a table. | ช่างไม้ทำโต๊ะ
cleaner | พนักงานทำความสะอาด | The cleaner comes every day. | พนักงานทำความสะอาดมาทุกวัน
gardener | คนสวน | The gardener cuts the grass. | คนสวนตัดหญ้า
fisherman | ชาวประมง | The fisherman caught a big fish. | ชาวประมงจับปลาตัวใหญ่ได้
---
florist | คนขายดอกไม้ | Buy roses from the florist. | ซื้อกุหลาบจากร้านดอกไม้
hairdresser | ช่างทำผม | My hairdresser is very good. | ช่างทำผมของฉันเก่งมาก
janitor | ภารโรง | The janitor cleaned the hall. | ภารโรงทำความสะอาดห้องโถง
librarian | บรรณารักษ์ | Ask the librarian. | ถามบรรณารักษ์
lifeguard | เจ้าหน้าที่ช่วยชีวิต | The lifeguard saved a child. | เจ้าหน้าที่ช่วยชีวิตช่วยเด็กไว้
locksmith | ช่างกุญแจ | Call a locksmith. | เรียกช่างกุญแจ
`);
U('daily', 2, 'อาชีพ ชุด 2', `
architect | สถาปนิก | The architect designed the house. | สถาปนิกออกแบบบ้าน
designer | นักออกแบบ | She is a fashion designer. | เธอเป็นนักออกแบบแฟชั่น
jeweler | ช่างอัญมณี | The jeweler fixed my ring. | ช่างอัญมณีซ่อมแหวนให้ฉัน
miner | คนงานเหมือง | The miners were trapped. | คนงานเหมืองติดอยู่ข้างใน
musician | นักดนตรี | He is a talented musician. | เขาเป็นนักดนตรีที่เก่ง
nanny | พี่เลี้ยงเด็ก | The nanny looks after the kids. | พี่เลี้ยงดูแลเด็กๆ
---
pharmacist | เภสัชกร | Ask the pharmacist. | ถามเภสัชกร
photographer | ช่างภาพ | The photographer took our picture. | ช่างภาพถ่ายรูปเรา
receptionist | พนักงานต้อนรับ | The receptionist gave me a key. | พนักงานต้อนรับให้กุญแจฉัน
sailor | กะลาสี | The sailor worked on the ship. | กะลาสีทำงานบนเรือ
salesperson | พนักงานขาย | The salesperson was helpful. | พนักงานขายช่วยได้มาก
secretary | เลขานุการ | Leave a message with my secretary. | ฝากข้อความไว้กับเลขาของฉัน
`);
U('daily', 3, 'อาชีพ ชุด 3', `
economist | นักเศรษฐศาสตร์ | Economists expect growth. | นักเศรษฐศาสตร์คาดว่าจะเติบโต
physicist | นักฟิสิกส์ | Einstein was a physicist. | ไอน์สไตน์เป็นนักฟิสิกส์
politician | นักการเมือง | The politician gave a speech. | นักการเมืองกล่าวสุนทรพจน์
professor | ศาสตราจารย์ | She is a law professor. | เธอเป็นศาสตราจารย์ด้านกฎหมาย
programmer | โปรแกรมเมอร์ | He works as a programmer. | เขาทำงานเป็นโปรแกรมเมอร์
psychologist | นักจิตวิทยา | Talk to a psychologist. | คุยกับนักจิตวิทยา
---
scientist | นักวิทยาศาสตร์ | Scientists study the virus. | นักวิทยาศาสตร์ศึกษาไวรัส
technician | ช่างเทคนิค | A technician fixed the printer. | ช่างเทคนิคซ่อมเครื่องพิมพ์
therapist | นักบำบัด | She sees a therapist. | เธอพบนักบำบัด
translator | นักแปล | We need a translator. | เราต้องการนักแปล
tutor | ครูสอนพิเศษ | I have an English tutor. | ฉันมีครูสอนพิเศษภาษาอังกฤษ
veterinarian | สัตวแพทย์ | Take the dog to the veterinarian. | พาสุนัขไปหาสัตวแพทย์
`);
U('daily', 1, 'กีฬา ชุด 1', `
badminton | แบดมินตัน | Let's play badminton. | มาเล่นแบดมินตันกัน
baseball | เบสบอล | Baseball is popular in Japan. | เบสบอลเป็นที่นิยมในญี่ปุ่น
basketball | บาสเกตบอล | He plays basketball. | เขาเล่นบาสเกตบอล
boxing | มวย | Thai boxing is famous. | มวยไทยมีชื่อเสียง
soccer | ฟุตบอล | Soccer is my favorite sport. | ฟุตบอลเป็นกีฬาที่ฉันชอบ
tennis | เทนนิส | She plays tennis well. | เธอเล่นเทนนิสเก่ง
---
volleyball | วอลเลย์บอล | Thailand has a strong volleyball team. | ไทยมีทีมวอลเลย์บอลที่เก่ง
swimming | ว่ายน้ำ | Swimming is good exercise. | การว่ายน้ำเป็นการออกกำลังกายที่ดี
skating | สเก็ต | We went ice skating. | เราไปเล่นสเก็ตน้ำแข็ง
diving | ดำน้ำ/กระโดดน้ำ | Diving in Phuket is amazing. | การดำน้ำที่ภูเก็ตยอดเยี่ยม
jogging | วิ่งเหยาะๆ | I go jogging every morning. | ฉันวิ่งเหยาะๆ ทุกเช้า
yoga | โยคะ | She does yoga to relax. | เธอเล่นโยคะเพื่อผ่อนคลาย
`);
U('daily', 2, 'กีฬา ชุด 2', `
goalkeeper | ผู้รักษาประตู | The goalkeeper saved the ball. | ผู้รักษาประตูเซฟลูกได้
hurdle | รั้วกระโดดข้าม/อุปสรรค | He jumped the hurdles. | เขากระโดดข้ามรั้ว
league | ลีก | They won the league. | พวกเขาชนะลีก
marathon | มาราธอน | She ran a marathon. | เธอวิ่งมาราธอน
pitch | สนาม (ฟุตบอล) | The players are on the pitch. | ผู้เล่นอยู่ในสนาม
player | ผู้เล่น | He is the best player. | เขาเป็นผู้เล่นที่ดีที่สุด
---
racket | ไม้แร็กเกต | I need a new racket. | ฉันต้องการไม้แร็กเกตใหม่
score | คะแนน/ทำคะแนน | What's the score? | คะแนนเท่าไหร่
trophy | ถ้วยรางวัล | They won the trophy. | พวกเขาได้ถ้วยรางวัล
umpire | กรรมการ (เทนนิส/คริกเก็ต) | The umpire made a call. | กรรมการตัดสิน
weightlifting | ยกน้ำหนัก | Thailand won gold in weightlifting. | ไทยได้เหรียญทองยกน้ำหนัก
wrestling | มวยปล้ำ | He does wrestling. | เขาเล่นมวยปล้ำ
`);

U('daily', 1, 'ส่วนต่างๆ ของบ้าน', `
attic | ห้องใต้หลังคา | Old boxes are in the attic. | กล่องเก่าอยู่ในห้องใต้หลังคา
chimney | ปล่องไฟ | Smoke came out of the chimney. | ควันออกจากปล่องไฟ
doorbell | กริ่งประตู | Someone rang the doorbell. | มีคนกดกริ่ง
doormat | พรมเช็ดเท้า | The key is under the doormat. | กุญแจอยู่ใต้พรมเช็ดเท้า
driveway | ทางรถเข้าบ้าน | Park in the driveway. | จอดรถที่ทางเข้าบ้าน
fireplace | เตาผิง | Sit by the fireplace. | นั่งข้างเตาผิง
---
gutter | รางน้ำ | The gutter is full of leaves. | รางน้ำเต็มไปด้วยใบไม้
hallway | ทางเดินในบ้าน | Wait in the hallway. | รอที่ทางเดิน
mailbox | ตู้จดหมาย | Check the mailbox. | ดูตู้จดหมาย
patio | ลานหลังบ้าน | We ate on the patio. | เรากินข้าวที่ลานหลังบ้าน
staircase | บันได | The staircase is narrow. | บันไดแคบ
shelf | ชั้นวาง | Put the book on the shelf. | วางหนังสือบนชั้น
`);
U('daily', 1, 'ของใช้ในบ้านเพิ่มเติม', `
bunk | เตียงสองชั้น | The kids sleep in bunk beds. | เด็กๆ นอนเตียงสองชั้น
faucet | ก๊อกน้ำ | The faucet is leaking. | ก๊อกน้ำรั่ว
hammock | เปลญวน | He sleeps in a hammock. | เขานอนในเปลญวน
heater | เครื่องทำความร้อน | Turn on the water heater. | เปิดเครื่องทำน้ำอุ่น
lantern | ตะเกียง/โคม | We released lanterns. | เราปล่อยโคมลอย
lightbulb | หลอดไฟ | Change the lightbulb. | เปลี่ยนหลอดไฟ
---
mattress | ฟูก | The mattress is too soft. | ฟูกนุ่มเกินไป
pillowcase | ปลอกหมอน | Wash the pillowcases. | ซักปลอกหมอน
quilt | ผ้านวม | Grandma made a quilt. | ยายทำผ้านวม
radiator | หม้อน้ำ | The car's radiator is hot. | หม้อน้ำรถร้อน
switch | สวิตช์/เปลี่ยน | Press the switch. | กดสวิตช์
toaster | เครื่องปิ้งขนมปัง | Put the bread in the toaster. | ใส่ขนมปังในเครื่องปิ้ง
`);
U('daily', 2, 'ยานพาหนะเพิ่มเติม', `
carriage | รถม้า/ตู้รถไฟ | The queen rode in a carriage. | ราชินีนั่งรถม้า
convertible | รถเปิดประทุน | He drives a red convertible. | เขาขับรถเปิดประทุนสีแดง
cruise | ล่องเรือ | We went on a cruise. | เราไปล่องเรือ
helicopter | เฮลิคอปเตอร์ | A helicopter rescued them. | เฮลิคอปเตอร์ช่วยพวกเขาไว้
jeep | รถจี๊ป | The soldiers drove a jeep. | ทหารขับรถจี๊ป
limousine | รถลีมูซีน | A limousine picked them up. | รถลีมูซีนมารับพวกเขา
---
minivan | รถตู้ (ส่วนตัว) | We rented a minivan. | เราเช่ารถตู้
rickshaw | รถลาก/สามล้อ | Take a rickshaw to the market. | นั่งสามล้อไปตลาด
shuttle | รถรับส่ง | Take the airport shuttle. | ขึ้นรถรับส่งสนามบิน
tram | รถราง | We took a tram downtown. | เรานั่งรถรางเข้าเมือง
vessel | เรือ/ภาชนะ | The vessel sank. | เรือจม
windshield | กระจกหน้ารถ | The windshield is cracked. | กระจกหน้ารถร้าว
`);
U('daily', 2, 'ถนนและสิ่งอำนวยความสะดวก', `
freeway | ทางด่วน | Take the freeway. | ขึ้นทางด่วน
highway | ทางหลวง | There was an accident on the highway. | เกิดอุบัติเหตุบนทางหลวง
pavement | ทางเท้า | Walk on the pavement. | เดินบนทางเท้า
railway | ทางรถไฟ | The railway station is near. | สถานีรถไฟอยู่ใกล้ๆ
terminal | อาคารผู้โดยสาร | Go to Terminal 2. | ไปที่อาคาร 2
speedometer | มาตรวัดความเร็ว | Check the speedometer. | ดูมาตรวัดความเร็ว
---
parking meter | เครื่องเก็บค่าจอดรถ | Put coins in the parking meter. | หยอดเหรียญในเครื่องเก็บค่าจอด
trash can | ถังขยะ | Throw it in the trash can. | ทิ้งลงถังขยะ
ventilation | การระบายอากาศ | The room has poor ventilation. | ห้องระบายอากาศไม่ดี
toll booth | ด่านเก็บเงิน | Stop at the toll booth. | หยุดที่ด่านเก็บเงิน
overpass | สะพานลอย/ทางยกระดับ | Use the overpass. | ใช้สะพานลอย
roundabout | วงเวียน | Turn left at the roundabout. | เลี้ยวซ้ายที่วงเวียน
`);
U('daily', 3, 'ภูมิศาสตร์และธรรมชาติ', `
canyon | หุบเขาลึก | The Grand Canyon is huge. | แกรนด์แคนยอนกว้างใหญ่
coral | ปะการัง | Don't touch the coral. | อย่าแตะปะการัง
current | กระแสน้ำ/ปัจจุบัน | The current is strong. | กระแสน้ำแรง
equator | เส้นศูนย์สูตร | It's hot at the equator. | ที่เส้นศูนย์สูตรร้อน
erosion | การกัดเซาะ | Erosion damaged the coast. | การกัดเซาะทำลายชายฝั่ง
fossil | ฟอสซิล | They found a dinosaur fossil. | พวกเขาพบฟอสซิลไดโนเสาร์
---
glacier | ธารน้ำแข็ง | The glacier is melting. | ธารน้ำแข็งกำลังละลาย
iceberg | ภูเขาน้ำแข็ง | The ship hit an iceberg. | เรือชนภูเขาน้ำแข็ง
lagoon | ทะเลสาบน้ำเค็ม | The lagoon is calm. | ลากูนสงบ
lava | ลาวา | Lava flowed down the hill. | ลาวาไหลลงเนิน
peninsula | คาบสมุทร | Thailand is on a peninsula. | ไทยตั้งอยู่บนคาบสมุทร
plateau | ที่ราบสูง | Korat is on a plateau. | โคราชอยู่บนที่ราบสูง
`);
U('daily', 3, 'ภัยธรรมชาติและระบบนิเวศ', `
asteroid | ดาวเคราะห์น้อย | An asteroid hit the Earth. | ดาวเคราะห์น้อยพุ่งชนโลก
avalanche | หิมะถล่ม | The avalanche buried the village. | หิมะถล่มทับหมู่บ้าน
blizzard | พายุหิมะ | We got stuck in a blizzard. | เราติดอยู่ในพายุหิมะ
hurricane | พายุเฮอริเคน | The hurricane hit Florida. | พายุเฮอริเคนพัดถล่มฟลอริดา
tornado | พายุทอร์นาโด | A tornado destroyed the town. | ทอร์นาโดทำลายเมือง
swamp | หนองน้ำ | Crocodiles live in the swamp. | จระเข้อาศัยในหนองน้ำ
---
prairie | ทุ่งหญ้าแพรรี | Bison live on the prairie. | ควายป่าอาศัยในทุ่งหญ้า
rainforest | ป่าฝน | The Amazon is a rainforest. | แอมะซอนเป็นป่าฝน
reef | แนวปะการัง | We dived at the reef. | เราดำน้ำที่แนวปะการัง
savanna | ทุ่งหญ้าสะวันนา | Lions live on the savanna. | สิงโตอาศัยในทุ่งหญ้าสะวันนา
sunflower | ดอกทานตะวัน | The sunflower field is beautiful. | ทุ่งทานตะวันสวย
wilderness | ป่าดงดิบ/ที่รกร้าง | They got lost in the wilderness. | พวกเขาหลงในป่า
`);
U('daily', 4, 'การปกครองและผู้นำ', `
anthem | เพลงชาติ | Stand for the national anthem. | ยืนตรงเคารพเพลงชาติ
cabinet | คณะรัฐมนตรี/ตู้ | The cabinet met today. | คณะรัฐมนตรีประชุมวันนี้
census | สำมะโนประชากร | The census counts people. | สำมะโนประชากรนับจำนวนคน
citizenship | สัญชาติ/ความเป็นพลเมือง | He applied for citizenship. | เขายื่นขอสัญชาติ
councilor | สมาชิกสภา | The councilor visited us. | สมาชิกสภามาเยี่ยมเรา
dictator | ผู้เผด็จการ | The dictator ruled for years. | ผู้เผด็จการปกครองหลายปี
---
diplomat | นักการทูต | He is a diplomat. | เขาเป็นนักการทูต
federal | ของรัฐบาลกลาง | The FBI is a federal agency. | FBI เป็นหน่วยงานของรัฐบาลกลาง
governor | ผู้ว่าราชการ | The governor visited the flood area. | ผู้ว่าฯ ลงพื้นที่น้ำท่วม
mayor | นายกเทศมนตรี | The mayor opened the park. | นายกเทศมนตรีเปิดสวนสาธารณะ
monarchy | ระบอบกษัตริย์ | Thailand has a monarchy. | ไทยมีสถาบันพระมหากษัตริย์
premier | นายกรัฐมนตรี/ยอดเยี่ยม | The premier spoke on TV. | นายกฯ พูดออกทีวี
`);
U('daily', 4, 'การเมืองและรัฐ', `
president | ประธานาธิบดี/ประธาน | The president gave a speech. | ประธานาธิบดีกล่าวสุนทรพจน์
republic | สาธารณรัฐ | France is a republic. | ฝรั่งเศสเป็นสาธารณรัฐ
senate | วุฒิสภา | The senate passed the bill. | วุฒิสภาผ่านร่างกฎหมาย
senator | สมาชิกวุฒิสภา | The senator voted no. | สว. โหวตไม่เห็นด้วย
veto | ยับยั้ง/วีโต้ | The president vetoed the law. | ประธานาธิบดียับยั้งกฎหมาย
ministry | กระทรวง | He works at the Ministry of Interior. | เขาทำงานที่กระทรวงมหาดไทย
---
legislature | ฝ่ายนิติบัญญัติ | The legislature makes laws. | ฝ่ายนิติบัญญัติออกกฎหมาย
electorate | ผู้มีสิทธิเลือกตั้ง | The electorate wants change. | ผู้มีสิทธิเลือกตั้งต้องการการเปลี่ยนแปลง
municipal | ของเทศบาล | Municipal workers cleaned the street. | พนักงานเทศบาลทำความสะอาดถนน
province | จังหวัด | Chiang Mai is a northern province. | เชียงใหม่เป็นจังหวัดทางเหนือ
regime | ระบอบการปกครอง | The old regime fell. | ระบอบเก่าล่มสลาย
constituent | ผู้มีสิทธิเลือกตั้งในเขต | The MP met his constituents. | ส.ส. พบประชาชนในเขต
`);

// เรียงหน่วยตามระดับ (ความคืบหน้าบันทึกด้วยชื่อหน่วย จึงแทรกหน่วยใหม่ได้)
Object.values(COURSES).forEach(C => C.units.sort((a, b) => a.lv - b.lv));

