"use strict";
// =====================================================================
// คอร์สเรียนภาษาอังกฤษ (ไฟล์เนื้อหา: เพิ่มบทเรียนได้ที่นี่ที่เดียว)
// ---------------------------------------------------------------------
// U(คอร์ส, ระดับ, 'ชื่อหน่วย', `บทเรียน`)
//   ระดับ: 1 เริ่มต้น · 2 พื้นฐาน · 3 ปานกลาง · 4 ดี
//   บทเรียน: บรรทัดละคำ  "คำ/วลี | คำแปล | ประโยคตัวอย่าง"
//            คั่นแต่ละบทด้วยบรรทัด ---   (บทละ 5–6 คำกำลังดี)
// แอปสร้างแบบฝึกให้เองทั้งหมด: เลือกคำแปล แปลไทย→อังกฤษ ฟัง เติมคำ เรียงประโยค จับคู่
// =====================================================================
const COURSES = {
  police: { name: 'สอบตำรวจ', ic: 'shield', color: '#2f6fb5', units: [] },
  daily:  { name: 'ชีวิตประจำวัน', ic: 'home', color: '#0f9d76', units: [] },
  talk:   { name: 'สนทนาและการทำงาน', ic: 'messages-square', color: '#8b5cf6', units: [] }
};
const ENG_LEVELS = ['', 'เริ่มต้น', 'พื้นฐาน', 'ปานกลาง', 'ดี'];
function U(course, lv, t, text){
  const ls = text.trim().split(/\n\s*---\s*\n/).map(block => block.trim().split('\n').map(line => {
    const [en, th, ex] = line.split('|').map(s => (s || '').trim());
    return { en, th, ex: ex || '' };
  }).filter(w => w.en && w.th));
  COURSES[course].units.push({ t, lv, ls });
}

// ===== สอบตำรวจ =====
U('police', 1, 'งานตำรวจพื้นฐาน', `
police | ตำรวจ | Call the police now.
officer | เจ้าหน้าที่ | The officer is very kind.
station | สถานี | The police station is near here.
help | ช่วยเหลือ | Can you help me?
safe | ปลอดภัย | You are safe now.
danger | อันตราย | Danger! Stay back.
---
crime | อาชญากรรม | Crime is a big problem.
thief | ขโมย | The thief took my bag.
steal | ขโมย (กริยา) | He stole a car.
victim | ผู้เสียหาย | The victim is in hospital.
witness | พยาน | She was a witness.
report | แจ้งความ | I want to report a crime.
---
patrol | ลาดตระเวน | They patrol at night.
uniform | เครื่องแบบ | He wears a uniform.
duty | หน้าที่ | It is my duty.
rule | กฎ | Follow the rules.
public | สาธารณะ | This is a public road.
protect | ปกป้อง | Police protect people.
`);
U('police', 2, 'คดีและการจับกุม', `
arrest | จับกุม | The police arrested him.
suspect | ผู้ต้องสงสัย | The suspect ran away.
evidence | หลักฐาน | We need more evidence.
investigate | สืบสวน | They investigate the case.
case | คดี | The case is closed.
search | ค้นหา/ตรวจค้น | They searched the car.
---
robbery | การปล้น | A robbery happened last night.
fraud | การฉ้อโกง | He was arrested for fraud.
weapon | อาวุธ | He had a weapon.
drug | ยาเสพติด | Drugs are illegal.
escape | หลบหนี | The prisoner escaped.
chase | ไล่ตาม | The police chased the car.
---
warrant | หมายจับ/หมายค้น | The judge signed a warrant.
detain | ควบคุมตัว | He was detained for questioning.
custody | การควบคุมตัว | He is in police custody.
confess | สารภาพ | He confessed to the crime.
charge | ตั้งข้อหา | He was charged with theft.
release | ปล่อยตัว | They released him today.
`);
U('police', 2, 'ศาลและกฎหมาย', `
law | กฎหมาย | Everyone must obey the law.
court | ศาล | The case went to court.
judge | ผู้พิพากษา | The judge is fair.
lawyer | ทนายความ | I need a lawyer.
guilty | มีความผิด | He was found guilty.
innocent | บริสุทธิ์ | She is innocent.
---
trial | การพิจารณาคดี | The trial starts today.
prison | เรือนจำ | He went to prison.
fine | ค่าปรับ | I paid a fine.
illegal | ผิดกฎหมาย | Gambling is illegal.
legal | ถูกกฎหมาย | Is this legal?
penalty | บทลงโทษ | The penalty is heavy.
---
rights | สิทธิ | You have the right to stay silent.
citizen | พลเมือง | He is a Thai citizen.
constitution | รัฐธรรมนูญ | The constitution is the highest law.
testify | ให้การ | She testified in court.
accuse | กล่าวหา | They accused him of lying.
justice | ความยุติธรรม | We want justice.
`);
U('police', 3, 'จราจรและเหตุฉุกเฉิน', `
traffic | การจราจร | Traffic is heavy today.
accident | อุบัติเหตุ | There was an accident.
license | ใบอนุญาต | Show me your license.
helmet | หมวกกันน็อก | Wear a helmet.
speed | ความเร็ว | Slow down your speed.
checkpoint | ด่านตรวจ | Stop at the checkpoint.
---
emergency | เหตุฉุกเฉิน | Call 191 in an emergency.
injured | ได้รับบาดเจ็บ | Two people were injured.
ambulance | รถพยาบาล | Call an ambulance.
fire | ไฟไหม้ | There is a fire!
rescue | ช่วยชีวิต | They rescued the child.
crowd | ฝูงชน | The crowd was angry.
---
drunk | เมาสุรา | Don't drive when drunk.
crash | ชน | The car crashed into a tree.
block | ปิดกั้น | The road is blocked.
direction | ทิศทาง | Which direction did he go?
missing | สูญหาย | Her son is missing.
suspicious | น่าสงสัย | He looks suspicious.
`);
U('police', 3, 'กริยาที่ออกสอบบ่อย', `
prevent | ป้องกัน | Lock the door to prevent theft.
avoid | หลีกเลี่ยง | Avoid dark streets.
deny | ปฏิเสธ (ว่าไม่ได้ทำ) | He denied the charge.
refuse | ปฏิเสธ (ไม่ยอม) | He refused to answer.
obey | เชื่อฟัง | Obey the traffic rules.
warn | เตือน | They warned us about the storm.
---
require | ต้องการ/กำหนด | The job requires English.
provide | จัดหา | We provide free water.
respond | ตอบสนอง | Police responded quickly.
remain | ยังคง | Please remain calm.
survive | รอดชีวิต | Everyone survived.
suggest | แนะนำ | I suggest we leave now.
---
achieve | บรรลุ | She achieved her goal.
improve | ปรับปรุง | Practice to improve.
increase | เพิ่มขึ้น | Crime increased this year.
decrease | ลดลง | Accidents decreased.
include | รวมถึง | The price includes tax.
explain | อธิบาย | Please explain the rule.
`);
U('police', 4, 'คำศัพท์ระดับสูง', `
authority | อำนาจ/เจ้าหน้าที่ | Police have authority here.
violate | ละเมิด | He violated the law.
enforce | บังคับใช้ | Police enforce the law.
prohibit | ห้าม | Smoking is prohibited.
permit | อนุญาต | Parking is not permitted.
regulation | ระเบียบ | Follow the regulations.
---
corruption | การทุจริต | Corruption is a serious problem.
bribe | สินบน | He refused the bribe.
integrity | ความซื่อตรง | An officer needs integrity.
reliable | น่าเชื่อถือ | She is a reliable witness.
accurate | แม่นยำ | The report is accurate.
urgent | เร่งด่วน | This case is urgent.
---
negotiate | เจรจา | They negotiated with the man.
surrender | ยอมจำนน | He surrendered to police.
hostage | ตัวประกัน | They freed the hostage.
threat | ภัยคุกคาม | It is a threat to safety.
security | ความปลอดภัย | Security is tight today.
cooperate | ให้ความร่วมมือ | Please cooperate with us.
`);

// ===== ชีวิตประจำวัน =====
U('daily', 1, 'ทักทายและแนะนำตัว', `
hello | สวัสดี | Hello, how are you?
thank you | ขอบคุณ | Thank you very much.
sorry | ขอโทษ | Sorry, I am late.
name | ชื่อ | My name is Nut.
friend | เพื่อน | He is my friend.
family | ครอบครัว | I love my family.
---
morning | ตอนเช้า | Good morning!
night | ตอนกลางคืน | Good night.
today | วันนี้ | Today is Friday.
tomorrow | พรุ่งนี้ | See you tomorrow.
yesterday | เมื่อวาน | I was busy yesterday.
week | สัปดาห์ | I work five days a week.
---
happy | มีความสุข | I am happy today.
tired | เหนื่อย | I am very tired.
hungry | หิว | Are you hungry?
busy | ยุ่ง | Sorry, I am busy.
fine | สบายดี | I am fine, thanks.
ready | พร้อม | Are you ready?
`);
U('daily', 1, 'บ้านและของใช้', `
house | บ้าน | My house is small.
room | ห้อง | This is my room.
door | ประตู | Close the door, please.
window | หน้าต่าง | Open the window.
table | โต๊ะ | The book is on the table.
bed | เตียง | I go to bed at ten.
---
phone | โทรศัพท์ | Where is my phone?
key | กุญแจ | I lost my key.
bag | กระเป๋า | Her bag is red.
money | เงิน | I have no money.
clothes | เสื้อผ้า | I wash my clothes.
shoes | รองเท้า | Take off your shoes.
`);
U('daily', 2, 'กินดื่ม', `
breakfast | อาหารเช้า | I eat breakfast at seven.
lunch | อาหารกลางวัน | Let's have lunch.
dinner | อาหารเย็น | Dinner is ready.
water | น้ำ | Can I have some water?
delicious | อร่อย | This is delicious!
spicy | เผ็ด | Thai food is spicy.
---
menu | เมนู | Can I see the menu?
order | สั่ง (อาหาร) | I want to order now.
bill | บิล/ใบเสร็จ | Can I have the bill?
cook | ทำอาหาร | My mother cooks well.
sweet | หวาน | The cake is too sweet.
fresh | สด | The fish is fresh.
`);
U('daily', 2, 'ซื้อของ', `
buy | ซื้อ | I want to buy a shirt.
sell | ขาย | They sell fruit.
price | ราคา | What is the price?
cheap | ถูก | This is cheap.
expensive | แพง | That is too expensive.
change | เงินทอน | Here is your change.
---
discount | ส่วนลด | Is there a discount?
size | ขนาด | What size do you want?
try on | ลองสวม | Can I try it on?
pay | จ่าย | I will pay by card.
receipt | ใบเสร็จ | Keep your receipt.
refund | คืนเงิน | Can I get a refund?
`);
U('daily', 3, 'เดินทาง', `
bus | รถเมล์ | I take the bus to work.
train | รถไฟ | The train is late.
airport | สนามบิน | Take me to the airport.
ticket | ตั๋ว | I need two tickets.
left | ซ้าย | Turn left here.
right | ขวา | Turn right at the light.
---
far | ไกล | Is it far from here?
near | ใกล้ | The hotel is near the beach.
arrive | มาถึง | The plane arrives at nine.
leave | ออกเดินทาง | We leave at six.
map | แผนที่ | Can you show me on the map?
lost | หลงทาง | I think we are lost.
---
hotel | โรงแรม | We stay at a hotel.
passport | หนังสือเดินทาง | Show your passport.
luggage | กระเป๋าเดินทาง | My luggage is heavy.
delay | ล่าช้า | The flight is delayed.
cancel | ยกเลิก | The trip was cancelled.
book | จอง | I booked a room.
`);
U('daily', 4, 'อารมณ์และสุขภาพ', `
angry | โกรธ | Don't be angry.
worried | กังวล | I am worried about the test.
proud | ภูมิใจ | I am proud of you.
nervous | ประหม่า | I feel nervous.
calm | สงบ | Stay calm.
excited | ตื่นเต้น | We are excited!
---
headache | ปวดหัว | I have a headache.
fever | ไข้ | She has a fever.
medicine | ยา | Take this medicine.
pain | ความเจ็บปวด | I have pain in my leg.
healthy | สุขภาพดี | Eat well to stay healthy.
exercise | ออกกำลังกาย | I exercise every day.
`);

// ===== สนทนาและการทำงาน =====
U('talk', 1, 'ประโยคสุภาพ', `
please | กรุณา | Please sit down.
excuse me | ขอโทษนะครับ/ค่ะ | Excuse me, where is the toilet?
of course | แน่นอน | Of course I can help.
no problem | ไม่เป็นไร | No problem at all.
welcome | ยินดีต้อนรับ | Welcome to Thailand.
again | อีกครั้ง | Please say that again.
---
understand | เข้าใจ | I don't understand.
speak | พูด | Can you speak slowly?
repeat | พูดซ้ำ | Could you repeat that?
mean | หมายถึง | What does it mean?
know | รู้ | I don't know.
ask | ถาม | Can I ask a question?
`);
U('talk', 2, 'ที่ทำงาน', `
work | งาน/ทำงาน | I work in an office.
job | อาชีพ | I like my job.
boss | หัวหน้า | My boss is kind.
meeting | การประชุม | The meeting starts at nine.
team | ทีม | We work as a team.
task | งานที่ได้รับมอบหมาย | Finish this task today.
---
deadline | กำหนดส่ง | The deadline is Friday.
schedule | ตารางงาน | Check your schedule.
salary | เงินเดือน | He gets a good salary.
experience | ประสบการณ์ | I have two years of experience.
skill | ทักษะ | English is a useful skill.
responsible | รับผิดชอบ | I am responsible for this.
`);
U('talk', 3, 'โทรศัพท์และอีเมล', `
call | โทร | I will call you later.
message | ข้อความ | I sent you a message.
hold on | รอสักครู่ | Hold on, please.
available | ว่าง | Are you available now?
contact | ติดต่อ | Please contact me.
reply | ตอบกลับ | Please reply soon.
---
attach | แนบ | I attached the file.
confirm | ยืนยัน | Please confirm the time.
inform | แจ้งให้ทราบ | I will inform the team.
request | คำขอ | I have a request.
appointment | นัดหมาย | I have an appointment at two.
urgent | ด่วน | This is urgent.
`);
U('talk', 4, 'แสดงความคิดเห็น', `
agree | เห็นด้วย | I agree with you.
disagree | ไม่เห็นด้วย | I disagree.
opinion | ความคิดเห็น | In my opinion, it is good.
reason | เหตุผล | What is the reason?
suggest | เสนอแนะ | I suggest a new plan.
prefer | ชอบมากกว่า | I prefer tea to coffee.
---
important | สำคัญ | This is very important.
necessary | จำเป็น | Is it necessary?
possible | เป็นไปได้ | Is it possible?
probably | น่าจะ | He will probably come.
however | อย่างไรก็ตาม | However, I am not sure.
because | เพราะว่า | I am late because of traffic.
`);
