"use strict";
// =====================================================================
// คอร์สเรียนภาษาอังกฤษ (ไฟล์เนื้อหา: เพิ่มบทเรียนได้ที่นี่ที่เดียว)
// ---------------------------------------------------------------------
// U(คอร์ส, ระดับ, 'ชื่อหน่วย', `บทเรียน`)
//   ระดับ: 1 เริ่มต้น · 2 พื้นฐาน · 3 ปานกลาง · 4 ดี
//   บทเรียน: บรรทัดละคำ  "คำ/วลี | คำแปล | ประโยคตัวอย่าง | คำแปลประโยค"
//            คั่นแต่ละบทด้วยบรรทัด ---   (บทละ 5–6 คำกำลังดี)
// ไวยากรณ์: G(ระดับ, 'หัวข้อ', 'กฎสั้นๆ', `ประโยคมี ___ | คำตอบ | ตัวหลอก1, ตัวหลอก2, ตัวหลอก3 | เหตุผล | คำแปล`)
// แอปสร้างแบบฝึกให้เองทั้งหมด: เลือกคำแปล แปลไทย→อังกฤษ ฟัง เติมคำ เรียงประโยค จับคู่
// =====================================================================
const COURSES = {
  police: { name: 'สอบตำรวจ', ic: 'shield', color: '#2f6fb5', units: [] },
  daily:  { name: 'ชีวิตประจำวัน', ic: 'home', color: '#0f9d76', units: [] },
  talk:   { name: 'สนทนาและการทำงาน', ic: 'messages-square', color: '#8b5cf6', units: [] },
  grammar:{ name: 'ไวยากรณ์ออกสอบ', ic: 'spell-check', color: '#e8590c', units: [], gram: true }
};
const ENG_LEVELS = ['', 'เริ่มต้น', 'พื้นฐาน', 'ปานกลาง', 'ดี'];
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

// เรียงหน่วยตามระดับ (ความคืบหน้าบันทึกด้วยชื่อหน่วย จึงแทรกหน่วยใหม่ได้)
Object.values(COURSES).forEach(C => C.units.sort((a, b) => a.lv - b.lv));

