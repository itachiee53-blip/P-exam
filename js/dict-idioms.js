// สำนวน/คำแสลง/ประโยคติดปาก: สำนวน | แปล (แปลทั้งสำนวน ไม่แปลทีละคำ)
const DICT_IDIOMS = `
a ballpark figure | ตัวเลขประมาณคร่าวๆ
a blessing in disguise | เรื่องร้ายที่กลายเป็นดี
a double-edged sword | ดาบสองคม
a shot in the dark | การเดาสุ่ม
add insult to injury | ซ้ำเติม
after all | ท้ายที่สุดแล้ว
all right | ได้/โอเค
are you kidding | ล้อเล่นหรือเปล่า
as a result | ผลที่ตามมาคือ
as far as i know | เท่าที่ฉันรู้
as long as | ตราบใดที่
as soon as | ทันทีที่
as well as | และ/รวมทั้ง
at first | ตอนแรก
at last | ในที่สุด
at least | อย่างน้อย
back to square one | กลับไปเริ่มต้นใหม่
ballpark figure | ตัวเลขประมาณคร่าวๆ
be in touch | ติดต่อกัน
beat around the bush | พูดอ้อมค้อม
because of | เพราะ
better late than never | มาช้ายังดีกว่าไม่มา
better safe than sorry | กันไว้ดีกว่าแก้
big deal | เรื่องใหญ่
bite off more than you can chew | รับงานเกินตัว
blessing in disguise | เรื่องร้ายที่กลายเป็นดี
break a leg | ขอให้โชคดี (ก่อนแสดง)
break the ice | ทำลายความเงียบ/ความเกร็ง
by the way | อ้อ/ว่าแต่
call it a day | พอแค่นี้ก่อน/เลิกงาน
call the shots | เป็นคนตัดสินใจ
calm down | ใจเย็นๆ
caught red-handed | ถูกจับได้คาหนังคาเขา
cheer up | ร่าเริงหน่อยนะ
chill out | ผ่อนคลาย
cold feet | ความกลัวจนไม่กล้าทำ
cost an arm and a leg | แพงมาก
count me in | นับฉันด้วย
cut corners | ทำแบบลวกๆ เพื่อประหยัด
despite the fact | แม้ว่า
devil's advocate | คนที่แย้งเพื่อให้คิดรอบด้าน
double-edged sword | ดาบสองคม
down the drain | สูญเปล่า
due to | เนื่องจาก
even though | แม้ว่า
fair enough | ก็มีเหตุผล/โอเค
first of all | ก่อนอื่น
for example | ตัวอย่างเช่น
for instance | ตัวอย่างเช่น
freak out | ตกใจ/สติแตก
from now on | ต่อจากนี้ไป
get cold feet | ใจเสาะ/เปลี่ยนใจเพราะกลัว
get in touch | ติดต่อ
get the hang of | เริ่มทำเป็น/จับทางได้
get the hang of it | เริ่มทำเป็นแล้ว
give me a hand | ช่วยหน่อย
go the extra mile | ทุ่มเทเกินกว่าที่ต้องทำ
good for you | ดีแล้ว/ยินดีด้วย
hang in there | อดทนไว้นะ
hang out | ไปเที่ยวเล่น
hit the books | ตั้งใจอ่านหนังสือ
hit the road | ออกเดินทาง
hit the sack | เข้านอน
hold on | รอสักครู่
how come | ทำไมล่ะ
i'm all ears | ฉันตั้งใจฟังอยู่
in a nutshell | สรุปสั้นๆ
in accordance with | ตาม/สอดคล้องกับ
in addition | นอกจากนี้
in case | เผื่อว่า
in charge of | รับผิดชอบ
in front of | ข้างหน้า
in hindsight | เมื่อมองย้อนกลับไป
in other words | พูดอีกอย่างคือ
in spite of | แม้ว่า
in terms of | ในแง่ของ
in the loop | รับรู้ความคืบหน้า
in time | ทันเวลา
instead of | แทนที่จะ
it costs an arm and a leg | แพงมาก
it's up to you | แล้วแต่คุณ
jump to conclusions | ด่วนสรุป
just a moment | รอสักครู่
just a second | รอสักครู่
keep a low profile | ทำตัวเงียบๆ ไม่เด่น
keep in touch | ติดต่อกันไว้
keep me in the loop | แจ้งความคืบหน้าให้ทราบด้วย
last but not least | สุดท้ายแต่สำคัญ
lend a hand | ช่วยเหลือ
let the cat out of the bag | เผลอบอกความลับ
let's wrap up | มาสรุปกันเถอะ
long time no see | ไม่ได้เจอกันนาน
make a decision | ตัดสินใจ
make a mistake | ทำผิดพลาด
make sense | มีเหตุผล/เข้าใจได้
make sure | ทำให้แน่ใจ
makes sense | มีเหตุผล/เข้าใจได้
more or less | ประมาณนั้น
my bad | ฉันผิดเอง
my pleasure | ด้วยความยินดี
never mind | ไม่เป็นไร
next to | ข้างๆ
no big deal | ไม่เป็นไร/ไม่ใช่เรื่องใหญ่
no pain no gain | ไม่ลำบากก็ไม่ได้ผล
no problem | ไม่มีปัญหา
no way | ไม่มีทาง/จริงดิ
no worries | ไม่เป็นไร
not at all | ไม่เลย/ยินดี
of course | แน่นอน
off the record | ไม่เป็นทางการ/ห้ามเผยแพร่
on behalf of | ในนามของ
on cloud nine | มีความสุขมาก
on the contrary | ตรงกันข้าม
on the other hand | ในทางกลับกัน
on the record | อย่างเป็นทางการ
on the same page | เข้าใจตรงกัน
on the same wavelength | เข้าใจตรงกัน/คิดเหมือนกัน
on time | ตรงเวลา
once in a blue moon | นานๆ ครั้ง
over the moon | ดีใจมาก
pay attention | ตั้งใจ/ใส่ใจ
piece of cake | ง่ายมาก
play devil's advocate | แกล้งแย้งเพื่อให้คิดรอบด้าน
provided that | โดยมีเงื่อนไขว่า
pull someone's leg | แกล้งล้อเล่น
pulling my leg | แกล้งล้อเล่นฉัน
red-handed | คาหนังคาเขา
right away | ทันที
see eye to eye | เห็นตรงกัน
see you later | แล้วเจอกัน
shot in the dark | การเดาสุ่ม
so far | จนถึงตอนนี้
sooner or later | ไม่ช้าก็เร็ว
sounds good | ฟังดูดี
spill the beans | เผยความลับ
stage fright | ความประหม่าบนเวที
take care | ดูแลตัวเองนะ
take it easy | ใจเย็นๆ/พักผ่อนบ้าง
take part in | เข้าร่วม
take place | เกิดขึ้น/จัดขึ้น
the ball is in your court | ถึงตาคุณตัดสินใจแล้ว
the last straw | ฟางเส้นสุดท้าย
the tip of the iceberg | แค่ส่วนเล็กๆ ของปัญหา
time flies | เวลาผ่านไปเร็ว
tip of the iceberg | แค่ส่วนเล็กๆ ของปัญหา
to be honest | พูดตรงๆ
to sum up | สรุปคือ
turn a blind eye | ทำเป็นมองไม่เห็น
under the weather | ไม่ค่อยสบาย
up to you | แล้วแต่คุณ
what a pity | น่าเสียดายจัง
what a shame | น่าเสียดายจัง
what's up | ว่าไง
when pigs fly | ไม่มีทางเกิดขึ้น
with all due respect | ด้วยความเคารพ
wrap up | สรุป/ปิดท้าย
`;
