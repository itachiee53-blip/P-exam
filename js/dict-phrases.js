// วลี/คำกริยาวลี/คำที่ต้องใช้คู่กัน/ชื่อเฉพาะหลายคำ: วลี | แปล (แตะคำใดคำหนึ่งในวลีแล้วแปลทั้งวลี)
const DICT_PHRASES = `
a cup of | หนึ่งถ้วย
a dozen | หนึ่งโหล
a draw | เสมอ
a glass of | หนึ่งแก้ว
a lot | มาก
a lot of | มาก
a piece of | หนึ่งชิ้น/แผ่น
according to | ตามที่
acted on impulse | ทำไปตามอารมณ์ชั่ววูบ
after meals | หลังอาหาร
air conditioner | แอร์
allergic to | แพ้
applied for asylum | ขอลี้ภัย
apply for | สมัคร
art gallery | หอศิลป์
as expensive as | แพงเท่ากับ
as fast as | เร็วเท่ากับ
as good as | ดีเท่ากับ
as tall as | สูงเท่ากับ
ask for | ขอ
bang rak | บางรัก
be into | ชอบ/สนใจ
be used to | เคยชินกับ
belong to | เป็นของ
body cameras | กล้องติดตัว
break down | เสีย (รถ)/ร้องไห้
break in | บุกรุกเข้าไป
break into | งัดเข้าไป
break out | เกิดขึ้นกะทันหัน
break up | ทลาย/เลิกกัน
bring up | ยกเรื่องขึ้นมา/เลี้ยงดู
broke down | เสีย (อดีต)
broke in | บุกรุกเข้ามา (อดีต)
broke out | เกิดขึ้น (ทะเลาะ/ไฟ) (อดีต)
broke up | ทลาย/เลิกกัน (อดีต)
by bus | โดยรถเมล์
call back | โทรกลับ
call center gangs | แก๊งคอลเซ็นเตอร์
call off | ยกเลิก
call you back | โทรกลับ
came across | เจอโดยบังเอิญ (อดีต)
came up with | คิดขึ้นมา (อดีต)
carried out | ดำเนินการ (อดีต)
carry on | ทำต่อไป
catch up | ตามทัน
check in | เช็กอิน
check out | เช็กเอาต์/ลองดู
checked in | เช็กอิน (อดีต)
chest pain | เจ็บหน้าอก
chiang mai | เชียงใหม่
civil servant | ข้าราชการ
clean up | ทำความสะอาด
come back | กลับมา
come in | เข้ามา
coping skills | ทักษะการรับมือ
crazy about | คลั่งไคล้
credit card | บัตรเครดิต
criminal record | ประวัติอาชญากรรม
cultural heritage | มรดกทางวัฒนธรรม
cut down on | ลดการ…
cut it in half | ตัดครึ่ง
cut off | ตัดขาด
data breach | ข้อมูลรั่วไหล
deal with | จัดการกับ
debated the bill | อภิปรายร่างกฎหมาย
depend on | ขึ้นอยู่กับ
digital age | ยุคดิจิทัล
do the laundry | ซักผ้า
driver's license | ใบขับขี่
driving license | ใบขับขี่
eat out | กินข้าวนอกบ้าน
echo chambers | ห้องเสียงสะท้อน (ฟังแต่ความเห็นที่เหมือนตัวเอง)
end up | ลงเอยด้วย
ended up | ลงเอยที่ (อดีต)
every day | ทุกวัน
face mask | หน้ากากอนามัย
fake news | ข่าวปลอม
fell down | ล้มลง
figure out | หาคำตอบ/เข้าใจ
fill in | กรอก
fill out | กรอก (แบบฟอร์ม)
find a compromise | หาทางประนีประนอม
find out | ค้นพบ/สืบหา
fish sauce | น้ำปลา
fitness test | ทดสอบสมรรถภาพ
fitting room | ห้องลองเสื้อ
flash floods | น้ำป่าไหลหลาก
fond of | ชอบ
fossil fuels | เชื้อเพลิงฟอสซิล
found guilty | ถูกตัดสินว่ามีความผิด
found out | ค้นพบ/รู้ความจริง (อดีต)
get along | เข้ากันได้
get back | กลับมา
get back to | ติดต่อกลับ
get in | เข้า (รถ)
get lost | หลงทาง
get off | ลง (รถ)
get on | ขึ้น (รถ)
get out | ออกไป
get up | ลุกขึ้น/ตื่นนอน
give back | คืน
give up | ยอมแพ้/เลิก
go back | กลับไป
go off | ดังขึ้น/ระเบิด
go on | ดำเนินต่อ/เกิดอะไรขึ้น
go out | ออกไปข้างนอก
go straight | ตรงไป
go straight ahead | ตรงไปข้างหน้า
go through | ผ่าน/ตรวจดู
go through customs | ผ่านศุลกากร
good for | ดีต่อ
got her nails done | ไปทำเล็บ
grassroots movement | การเคลื่อนไหวระดับรากหญ้า
green curry | แกงเขียวหวาน
greenhouse gases | ก๊าซเรือนกระจก
grew up | เติบโตมา
grow up | เติบโต
hand over | ส่งมอบ
hang up | วางสาย
has to | ต้อง
hat yai | หาดใหญ่
have to | ต้อง
heated debate | การถกเถียงอย่างดุเดือด
heavy traffic | รถติดหนัก
held up | ปล้น/ทำให้ล่าช้า (อดีต)
high school | มัธยมปลาย
how far | ไกลแค่ไหน
how long | นานแค่ไหน
how many | กี่
how much | เท่าไร
how often | บ่อยแค่ไหน
how old | อายุเท่าไร
id card | บัตรประชาชน
in lockdown | ปิดล็อกพื้นที่
in spite of | แม้ว่า
in the aftermath | หลังเหตุการณ์
interest rate | อัตราดอกเบี้ย
into photography | ชอบถ่ายภาพ
is into | ชอบ/สนใจ
is used to | เคยชินกับ
it takes | ใช้เวลา
jet lag | อาการเพลียจากเวลาต่างกัน
just a trim | เล็มนิดเดียว
keep up | รักษาระดับ/ตามทัน
keynote speech | ปาฐกถาหลัก
khao san | ข้าวสาร
khon kaen | ขอนแก่น
last night | เมื่อคืน
late check-out | เช็กเอาต์ช้า
law makers | ฝ่ายนิติบัญญัติ/ส.ส.
leading questions | คำถามชี้นำ
leave a tip | ให้ทิป
legal limit | ขีดจำกัดตามกฎหมาย
listen to | ฟัง
loan sharks | เงินกู้นอกระบบ
lock yourself in | ขังตัวเองไว้ข้างใน
log in | เข้าสู่ระบบ
log out | ออกจากระบบ
logical fallacy | ตรรกะวิบัติ
long-term effects | ผลระยะยาว
look after | ดูแล
look around | มองไปรอบๆ
look at | มอง/ดู
look for | มองหา
look forward to | ตั้งตารอ
look out | ระวัง
look up | ค้นหา
looking for | กำลังหา
looks after | ดูแล
lots of | มาก
low on fuel | น้ำมันใกล้หมด
loy krathong | ลอยกระทง
made a profit | ได้กำไร
made up | แต่งเรื่องขึ้น (อดีต)
main idea | ใจความสำคัญ
marital status | สถานภาพสมรส
media coverage | การนำเสนอข่าว
medical certificate | ใบรับรองแพทย์
moral dilemma | ทางเลือกที่ยากทางศีลธรรม
mother's day | วันแม่
move away | ถอยออกไป
moved out | ย้ายออก (อดีต)
muay thai | มวยไทย
native speakers | เจ้าของภาษา
new year | ปีใหม่
next week | สัปดาห์หน้า
on a diet | ควบคุมอาหาร
on impulse | ตามอารมณ์ชั่ววูบ
on sale | ลดราคา
on speaker | เปิดลำโพง
on the left | ทางซ้าย
on the right | ทางขวา
paradigm shift | การเปลี่ยนกระบวนทัศน์
passed the bill | ผ่านร่างกฎหมาย
pat you down | ตรวจค้นตัวคุณ
phone number | เบอร์โทรศัพท์
pick up | หยิบ/ไปรับ/รับสาย
pick you up | ไปรับคุณ
please wait a moment | กรุณารอสักครู่
plug in | เสียบปลั๊ก
point out | ชี้ให้เห็น
pointed out | ชี้ให้เห็น (อดีต)
police officer | เจ้าหน้าที่ตำรวจ
police station | สถานีตำรวจ
power imbalances | ความไม่สมดุลของอำนาจ
prime minister | นายกรัฐมนตรี
proud of | ภูมิใจใน
pull over | จอดข้างทาง
put off | เลื่อนออกไป
put on | สวมใส่
put out | ดับ (ไฟ)
put through | ต่อสาย
rainy season | ฤดูฝน
rama iv | ถนนพระรามสี่
ran away | วิ่งหนีไป
ran into | วิ่งเข้าไป/บังเอิญเจอ
ran out of | หมด (อดีต)
ran out of the house | วิ่งออกจากบ้าน
rely on | พึ่งพา
remain silent | นิ่งเงียบ
renewable energy | พลังงานหมุนเวียน
rent out | ปล่อยเช่า
restorative justice | กระบวนการยุติธรรมเชิงสมานฉันท์
road safety | ความปลอดภัยทางถนน
run a red light | ฝ่าไฟแดง
run away | หนีไป
run out of | หมด
rush hour | ชั่วโมงเร่งด่วน
scared of | กลัว
sea breeze | ลมทะเล
server is down | เซิร์ฟเวอร์ล่ม
set off | ออกเดินทาง/ทำให้ระเบิด
set up | ตั้ง/จัดตั้ง
sets a precedent | สร้างบรรทัดฐาน
shop owner | เจ้าของร้าน
show me | ให้ฉันดู
show up | มาถึง/ปรากฏตัว
showed great initiative | แสดงความริเริ่มอย่างมาก
shy with | ขี้อายกับ
sick leave | ลาป่วย
side effects | ผลข้างเคียง
sign up | สมัคร
sit down | นั่งลง
slow down | ชะลอ
social welfare | สวัสดิการสังคม
som tam | ส้มตำ
speak up | พูดดังขึ้น
speed up | เร่งความเร็ว
spending habits | นิสัยการใช้เงิน
staff turnover | อัตราการลาออก
stand up | ลุกขึ้นยืน
stay back | ถอยออกไป
stay silent | นิ่งเงียบ
suffers from | ป่วยเป็น/ทุกข์จาก
sun lotion | ครีมกันแดด
take a shower | อาบน้ำ (ฝักบัว)
take care of | ดูแล
take off | ถอด/เครื่องขึ้น
taxi stand | จุดจอดแท็กซี่
text me | ส่งข้อความหาฉัน
the line is busy | สายไม่ว่าง
this morning | เช้านี้
took action | ลงมือจัดการ (อดีต)
top priority | สิ่งสำคัญที่สุด
traffic jam | รถติด
try again | ลองอีกครั้ง
try it on | ลองใส่
turn down | ปฏิเสธ/ลดเสียง
turn into | กลายเป็น
turn left | เลี้ยวซ้าย
turn off | ปิด (ไฟ/เครื่อง)
turn on | เปิด (ไฟ/เครื่อง)
turn right | เลี้ยวขวา
turn up | เพิ่มเสียง/ปรากฏตัว
turned down | ปฏิเสธ (อดีต)
turned into | กลายเป็น (อดีต)
twice a day | วันละสองครั้ง
two-factor authentication | การยืนยันตัวตนสองขั้นตอน
used to be | เคยเป็น/เคยมี
used to live | เคยอาศัยอยู่
wait for | รอ
wake up | ตื่นนอน
was born | เกิด
went off | ดังขึ้น/ระเบิด (อดีต)
went through | ผ่าน (อดีต)
what time | กี่โมง
woke me up | ปลุกฉันตื่น
woke up | ตื่นนอน (อดีต)
work out | ออกกำลังกาย/แก้ปัญหา
worked overtime | ทำโอที
worried about | กังวลเรื่อง
would like | อยากได้ (สุภาพ)
write down | จดไว้
written test | ข้อเขียน
wrong number | โทรผิดเบอร์
`;
