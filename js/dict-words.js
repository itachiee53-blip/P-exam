// คำเดี่ยว: คำ | แปล (แตะคำในบทเรียนแล้วใช้ไฟล์นี้ ถ้าคำนั้นไม่อยู่ในคำศัพท์ของบทเรียน)
const DICT_WORDS = `
a | หนึ่ง (คำนำหน้านาม)
about | เกี่ยวกับ/ประมาณ
abroad | ต่างประเทศ
absence | การไม่อยู่
academy | โรงเรียน (นายร้อย)
acceptable | ยอมรับได้
access | การเข้าถึง
accordance | ตาม (in accordance with)
according | ตามที่ (according to)
acknowledge | ยอมรับ
across | ข้าม
act | กระทำ/พระราชบัญญัติ
action | การกระทำ
add | เพิ่ม
addition | การเพิ่ม
advance | ล่วงหน้า/ก้าวหน้า
advice | คำแนะนำ
affairs | กิจการ
affect | ส่งผลต่อ
afraid | กลัว
after | หลังจาก
again | อีกครั้ง
against | ต่อต้าน/กับ
ago | ที่แล้ว
ahead | ข้างหน้า
ai | เอไอ (ปัญญาประดิษฐ์)
aid | ความช่วยเหลือ
aim | เป้าหมาย/มุ่ง
air | อากาศ
aisle | ทางเดิน
alcohol | แอลกอฮอล์
all | ทั้งหมด
almost | เกือบ
alone | คนเดียว
along | ไปตาม
alpha | อัลฟ่า
already | แล้ว
also | ด้วย/ยัง
although | แม้ว่า
am | เป็น/อยู่/คือ
amazing | น่าทึ่ง
amends | การชดใช้ (make amends)
an | หนึ่ง (คำนำหน้านาม)
and | และ
ann | แอน (ชื่อคน)
annual | ประจำปี
another | อีกอันหนึ่ง
any | ใดๆ
anyone | ใครก็ได้
anything | อะไรก็ได้
app | แอป
application | แอป/ใบสมัคร
approach | วิธีการ/เข้าใกล้
approved | อนุมัติ
are | เป็น/อยู่/คือ
area | พื้นที่
art | ศิลปะ
artificial | ประดิษฐ์
assistance | ความช่วยเหลือ
assistant | ผู้ช่วย
at | ที่/เวลา
ate | กิน (อดีต)
attend | เข้าร่วม
attention | ความสนใจ
award | รางวัล
away | ห่างออกไป
ayutthaya | อยุธยา
back | กลับ
bad | ไม่ดี
baggage | กระเป๋าเดินทาง
baht | บาท
bail | ประกันตัว
ball | ลูกบอล
ballpark | ประมาณคร่าวๆ
bang | บาง (บางรัก)
bangkok | กรุงเทพฯ
bark | เห่า
barriers | อุปสรรค
base | ฐาน
bath | อาบน้ำ
be | เป็น/อยู่
became | กลายเป็น (อดีต)
because | เพราะว่า
become | กลายเป็น
been | เป็น/อยู่ (V3)
before | ก่อน
began | เริ่ม (อดีต)
behalf | ในนามของ
behavior | พฤติกรรม
believe | เชื่อ
ben | เบน (ชื่อคน)
bend | ก้ม/งอ
best | ดีที่สุด
beware | ระวัง
big | ใหญ่
bilingual | สองภาษา
binding | ผูกมัด
birth | การเกิด
bit | นิดหน่อย
bite | กัด
blessing | พร
blew | พัด/เป่า (อดีต)
blind | ตาบอด
blow | เป่า/พัด
bomb | ระเบิด
bond | ประกัน/พันธบัตร
booking | การจอง
booth | ตู้/บูธ
borrow | ยืม
both | ทั้งสอง
bother | รบกวน
bottle | ขวด
bought | ซื้อ (อดีต)
box | กล่อง
boxes | กล่อง (หลายใบ)
boxing | มวย
breath | ลมหายใจ
brought | นำมา (อดีต)
build | สร้าง
built | สร้าง (อดีต)
bulb | หลอดไฟ
bush | พุ่มไม้
business | ธุรกิจ
but | แต่
by | โดย/ด้วย
caf | คาเฟ่
came | มา (อดีต)
camp | ค่าย
can | สามารถ
cannot | ไม่สามารถ
capital | เมืองหลวง
car | รถยนต์
carbon | คาร์บอน
card | บัตร
care | ดูแล/ใส่ใจ
catch | จับ
caught | จับได้ (อดีต)
cause | สาเหตุ/ทำให้เกิด
center | ศูนย์กลาง
certain | แน่นอน/บางอย่าง
certainly | แน่นอน
certificate | ใบรับรอง
certified | รับรอง
chain | โซ่/ห่วงโซ่
chamber | ห้อง
channel | ช่องทาง
chat | คุย
cheer | เชียร์ (cheer up = ร่าเริงหน่อย)
chew | เคี้ยว
chiang | เชียง (เชียงใหม่)
chief | หัวหน้า
child | เด็ก
children | เด็กๆ
chinese | จีน
choice | ทางเลือก
choose | เลือก
cinema | โรงภาพยนตร์
circumstances | สถานการณ์
city | เมือง
civic | พลเมือง
civil | พลเรือน
clarify | ชี้แจง
clear | ชัดเจน/ใส
click | คลิก
climate | ภูมิอากาศ
climb | ปีน
clock | นาฬิกา (o'clock = นาฬิกา)
close | ใกล้/ปิด
closer | ใกล้กว่า
closest | ใกล้ที่สุด
coast | ชายฝั่ง
code | รหัส
color | สี
come | มา
command | คำสั่ง
comment | ความเห็น
committed | กระทำ (ผิด)
common | ทั่วไป/ร่วมกัน
communicate | สื่อสาร
communication | การสื่อสาร
company | บริษัท
compare | เปรียบเทียบ
complex | ซับซ้อน
concerned | กังวล
conclusion | ข้อสรุป
conditioner | เครื่องปรับ (air conditioner = แอร์)
condolences | แสดงความเสียใจ
conduct | ความประพฤติ/ดำเนินการ
conference | การประชุม
confusing | สับสน
congrats | ยินดีด้วย
cons | ข้อเสีย
consider | พิจารณา
context | บริบท
contingency | แผนสำรอง
contrary | ตรงกันข้าม
contrast | ความแตกต่าง
control | ควบคุม
convenience | ความสะดวก
could | สามารถ (อดีต/สุภาพ)
count | นับ
countries | ประเทศ (หลายประเทศ)
country | ประเทศ
course | หลักสูตร/คอร์ส
crazy | บ้า
cream | ครีม
create | สร้าง
credit | เครดิต
criminal | อาชญากร
critical | วิกฤต/วิจารณ์
critics | นักวิจารณ์
cross | ข้าม
crossborder | ข้ามพรมแดน
crystal | คริสตัล (ยาไอซ์)
cultural | ทางวัฒนธรรม
curly | หยิก
curve | โค้ง
cute | น่ารัก
cv | ประวัติย่อ
cybercrime | อาชญากรรมไซเบอร์
dance | เต้นรำ
dangerous | อันตราย
dawn | รุ่งเช้า
day | วัน
de | (de facto = โดยพฤตินัย)
dear | ที่รัก
death | การเสียชีวิต
deceive | หลอกลวง
decision | การตัดสินใจ
deep | ลึก
delivery | การส่ง
demerit | ตัดคะแนน
department | แผนก/กรม
depend | ขึ้นอยู่กับ
deploy | ส่งกำลัง/นำไปใช้
deserve | สมควรได้รับ
detector | เครื่องตรวจ
devil | ปีศาจ
did | ทำ (อดีต)
died | เสียชีวิต (อดีต)
different | แตกต่าง
digital | ดิจิทัล
direct | ตรง
disciplinary | ทางวินัย
disease | โรค
disguise | ปลอมตัว (blessing in disguise = เรื่องร้ายกลายเป็นดี)
dish | จาน
disrupt | ขัดขวาง
distance | ระยะทาง
district | เขต/อำเภอ
divided | แตกแยก
do | ทำ
does | ทำ
dog | สุนัข
domestic | ในบ้าน/ในประเทศ
done | ทำ (V3)
double | สองเท่า
double-edged | ดาบสองคม
doubt | สงสัย
down | ลง
drain | ท่อ (down the drain = สูญเปล่า)
drive | ขับ
driven | ขับ (V3)
drop | ทำตก/ลดลง
drove | ขับ (อดีต)
due | ถึงกำหนด/เนื่องจาก
during | ระหว่าง
each | แต่ละ
earlier | ก่อนหน้านี้
early | เช้า/ก่อนเวลา
earn | ได้รับ/หาเงิน
eat | กิน
eaten | กิน (V3)
eats | กิน
echo | เสียงสะท้อน
economic | เศรษฐกิจ
edged | มีคม
edit | แก้ไข
education | การศึกษา
effect | ผลกระทบ
either | อย่างใดอย่างหนึ่ง
electric | ไฟฟ้า
else | อื่น
email | อีเมล
en | (en route = ระหว่างทาง)
encourage | สนับสนุน
end | จบ/ปลาย
engagement | การหมั้น/การมีส่วนร่วม
england | ประเทศอังกฤษ
english | ภาษาอังกฤษ
english-speaking | พูดอังกฤษได้
enjoy | สนุก/เพลิดเพลิน
enough | พอ
enter | เข้า/ป้อน
entry | การเข้า
equality | ความเท่าเทียม
especially | โดยเฉพาะ
essay | เรียงความ
evacuation | การอพยพ
evasion | การหลีกเลี่ยง
even | แม้แต่
ever | เคย
every | ทุก
everyone | ทุกคน
everything | ทุกอย่าง
everywhere | ทุกที่
exam | การสอบ
excellent | ยอดเยี่ยม
excuse | ขอโทษ/ข้ออ้าง
exhaust | ท่อไอเสีย
exist | มีอยู่
existing | ที่มีอยู่
expect | คาดหวัง
experts | ผู้เชี่ยวชาญ
exposed | ถูกเปิดโปง
extent | ขอบเขต
extradition | การส่งผู้ร้ายข้ามแดน
facial | ใบหน้า
fact | ข้อเท็จจริง
facto | (de facto = โดยพฤตินัย)
factor | ปัจจัย
fah | ฟ้า (ชื่อคน)
fail | ล้มเหลว/สอบตก
fair | ยุติธรรม
false | เท็จ
fast | เร็ว
fasten | รัด
faster | เร็วกว่า
fault | ความผิด
feel | รู้สึก
feeling | ความรู้สึก
feet | เท้า/ฟุต
fell | ล้ม (อดีต)
felt | รู้สึก (อดีต)
female | หญิง
few | น้อย (นับได้)
fewer | น้อยกว่า (นับได้)
field | ทุ่ง/สาขา
fight | ต่อสู้
fill | เติม/กรอก
financial | การเงิน
find | พบ
fitness | สมรรถภาพร่างกาย
five | ห้า
flag | ธง
flash | แสงวาบ
flat | แบน (ยาง)
flee | หลบหนี
floating | ลอยน้ำ
flow | การไหล
flu | ไข้หวัด
fly | บิน
focus | เน้น/จดจ่อ
fond | ชอบ
for | สำหรับ/เป็นเวลา
force | กำลัง/บังคับ
forced | บังคับ
forces | กองกำลัง/บังคับ
foreign | ต่างชาติ
forgot | ลืม (อดีต)
forgotten | ลืม (V3)
forty | สี่สิบ
fossil | ฟอสซิล
found | พบ (อดีต)
freak | ตกใจ (freak out)
freeze | อายัด/แช่แข็ง
fright | ความกลัว (stage fright = ประหม่าบนเวที)
from | จาก
front | ด้านหน้า
froze | ค้าง/แข็ง (อดีต)
fully | อย่างเต็มที่
fun | สนุก
fund | กองทุน
funds | เงินทุน
funny | ตลก
further | มากขึ้น/ต่อไป
future | อนาคต
gain | ได้รับ
gap | ช่องว่าง
gas | แก๊ส/น้ำมัน
gases | ก๊าซ
gave | ให้ (อดีต)
generation | รุ่น
get | ได้รับ
give | ให้
global | ทั่วโลก
globalized | โลกาภิวัตน์
go | ไป
goes | ไป
gone | ไป/หายไป (V3)
good | ดี
goodbye | ลาก่อน
got | ได้รับ (อดีต)
graduation | การจบการศึกษา
grand | ยิ่งใหญ่
grandmother | ยาย/ย่า
great | ยอดเยี่ยม
greenhouse | เรือนกระจก
grew | เติบโต (อดีต)
ground | พื้น
group | กลุ่ม
growing | กำลังเติบโต
guess | เดา
guy | ผู้ชาย
had | มี (อดีต)
halfway | ครึ่งทาง
hall | ห้องโถง
handle | จัดการ
hard | ยาก/หนัก
harder | ยากกว่า/หนักขึ้น
harm | อันตราย/ทำร้าย
has | มี
hate | เกลียด
have | มี
he | เขา (ชาย)
health | สุขภาพ
heart | หัวใจ
heat | ความร้อน
heated | ดุเดือด
held | ถือ/จัด (อดีต)
helpful | ช่วยได้มาก
her | เธอ/ของเธอ
here | ที่นี่
hey | เฮ้
high | สูง
higher | สูงกว่า
highest | สูงที่สุด
highly | อย่างมาก
highway | ทางหลวง
him | เขา (กรรม)
hindsight | มองย้อนหลัง
his | ของเขา
hold | ถือ/จัด
holiday | วันหยุด
home | บ้าน
honest | ซื่อสัตย์
honesty | ความซื่อสัตย์
hope | หวัง
hot | ร้อน
hotter | ร้อนกว่า
how | อย่างไร
human | มนุษย์
i | ฉัน
iceberg | ภูเขาน้ำแข็ง
idea | ความคิด
identify | ระบุ
if | ถ้า
illness | ความเจ็บป่วย
illustrate | แสดงให้เห็น
image | ภาพ
imagine | จินตนาการ
imbalance | ความไม่สมดุล
immediately | ทันที
immigrant | ผู้อพยพ
immigration | ตรวจคนเข้าเมือง
impaired | บกพร่อง
impose | กำหนด/บังคับใช้
impressed | ประทับใจ
in | ใน
inasmuch | เนื่องจาก (inasmuch as)
incident | เหตุการณ์
inconvenience | ความไม่สะดวก
independent | อิสระ
industry | อุตสาหกรรม
influence | อิทธิพล
information | ข้อมูล
injury | การบาดเจ็บ
innocence | ความบริสุทธิ์
insider | คนใน
insist | ยืนกราน
insofar | เท่าที่ (insofar as)
instance | ตัวอย่าง (for instance)
instructions | คำแนะนำ
insult | ดูถูก
internal | ภายใน
international | ระหว่างประเทศ
internet | อินเทอร์เน็ต
into | เข้าไปใน
introduction | การแนะนำ
invest | ลงทุน
investigation | การสืบสวน
investigator | ผู้สืบสวน
involve | เกี่ยวข้อง
is | เป็น/อยู่/คือ
issue | ประเด็น/ออก (เอกสาร)
it | มัน
item | สิ่งของ
its | ของมัน
iv | สี่
jail | จำคุก
jam | ติดขัด (traffic jam = รถติด)
japan | ญี่ปุ่น
jerry | เจอร์รี่ (ชื่อคน)
jet | เครื่องบินเจ็ต (jet lag = อาการเพลียเวลาเปลี่ยน)
joint | ร่วม
joy | จอย (ชื่อคน)/ความสุข
judgment | การตัดสิน
jump | กระโดด
junction | ทางแยก
just | เพิ่ง/แค่
kaen | แก่น (ขอนแก่น)
keep | เก็บ/รักษา/ทำต่อไป
kept | เก็บ (อดีต)
khao | ข้าว (ชื่อ)
khon | ขอน (ขอนแก่น)
kid | เด็ก
kidding | ล้อเล่น
kill | ฆ่า
kilometers | กิโลเมตร
kilos | กิโล
kind | ใจดี/ชนิด
king | กษัตริย์
kit | ชุดอุปกรณ์
korat | โคราช
krathong | กระทง
lack | ขาด
lag | ล่าช้า
language | ภาษา
languages | ภาษา (หลายภาษา)
laos | ลาว
large | ใหญ่
larger | ใหญ่กว่า
last | ล่าสุด/ที่แล้ว
laundering | ฟอก (เงิน)
leader | ผู้นำ
leaders | ผู้นำ
least | น้อยที่สุด
led | นำ (อดีต)
less | น้อยกว่า
let | ปล่อยให้/ให้
letter | จดหมาย
level | ระดับ
liaison | ประสานงาน
library | ห้องสมุด
life | ชีวิต
like | ชอบ/เหมือน
lime | มะนาว
limit | ขีดจำกัด
limited | จำกัด
list | รายการ
little | เล็ก/น้อย
log | บันทึก (log in = เข้าสู่ระบบ)
logic | ตรรกะ
logical | มีเหตุผล
long | ยาว
long-term | ระยะยาว
longer | นานกว่า/ยาวกว่า
loop | วง (in the loop = รับรู้)
lot | มาก (a lot)
love | รัก
low | ต่ำ
lower | ต่ำกว่า/ลด
loy | ลอย (Loy Krathong)
loyal | ภักดี
luck | โชค
lucky | โชคดี
luxury | ความหรูหรา
lying | โกหก/นอน
machine | เครื่อง
madam | คุณผู้หญิง
made | ทำ/สร้าง (อดีต)
mai | ใหม่ (เชียงใหม่)
main | หลัก
mainly | ส่วนใหญ่
make | ทำ/สร้าง
maker | ผู้ทำ
male | ชาย
mali | มะลิ (ชื่อคน)
mall | ห้าง
man | ผู้ชาย
manage | จัดการ
many | มาก (นับได้)
march | มีนาคม/เดินขบวน
marital | การสมรส
mark | รอย
match | การแข่งขัน/เข้ากัน
mate | เพื่อน
material | วัสดุ/เนื้อหา
math | คณิตศาสตร์
matter | เรื่อง/สำคัญ
max | แม็กซ์ (ชื่อ)
may | อาจ/ขออนุญาต
me | ฉัน (กรรม)
meal | มื้ออาหาร
media | สื่อ
medical | ทางการแพทย์
medics | หน่วยแพทย์
medium | กลาง
melt | ละลาย
members | สมาชิก
men | ผู้ชาย (หลายคน)
mental | ทางจิตใจ
mention | กล่าวถึง
met | พบ (อดีต)
metal | โลหะ
meters | เมตร
meth | ยาบ้า/ไอซ์
method | วิธี
mg | มิลลิกรัม
middle | กลาง
might | อาจจะ
migrant | ผู้อพยพ
mile | ไมล์
military | ทหาร
milligrams | มิลลิกรัม
milliliters | มิลลิลิตร
million | ล้าน
mine | ของฉัน
minimum | ขั้นต่ำ
minutes | นาที
miss | พลาด/คิดถึง
missed | พลาด/คิดถึง (อดีต)
misunderstanding | ความเข้าใจผิด
ml | มิลลิลิตร
mobile | มือถือ
modified | ดัดแปลง
mom | แม่
moment | ช่วงเวลา/สักครู่
more | มากกว่า
most | มากที่สุด
motorbike | รถมอเตอร์ไซค์
motorcycle | มอเตอร์ไซค์
motorcyclist | คนขี่มอเตอร์ไซค์
move | ย้าย/เคลื่อน
movement | การเคลื่อนไหว
muay | มวย (มวยไทย)
much | มาก (นับไม่ได้)
mule | บัญชีม้า (money mule)
must | ต้อง
my | ของฉัน
myself | ตัวฉันเอง
national | แห่งชาติ
native | เจ้าของภาษา/พื้นเมือง
natural | ธรรมชาติ
near | ใกล้
nearest | ใกล้ที่สุด
necessity | ความจำเป็น
need | จำเป็นต้อง
neither | ไม่ทั้งสอง
nerves | ประสาท/ความกังวล
never | ไม่เคย
new | ใหม่
next | ถัดไป
nice | ดี/น่ารัก
nida | นิดา (ชื่อคน)
nightlife | สถานบันเทิงยามค่ำคืน
no | ไม่/ไม่มี
nobody | ไม่มีใคร
noisy | เสียงดัง
noodle | ก๋วยเตี๋ยว
nor | และไม่
northern | ภาคเหนือ
not | ไม่
nothing | ไม่มีอะไร
notice | สังเกต/ประกาศ
now | ตอนนี้
nut | นัท (ชื่อคน)
nutshell | สรุปสั้นๆ (in a nutshell)
o | —
object | วัตถุ
obstacle | อุปสรรค
occur | เกิดขึ้น
of | ของ
off | ปิด/ออก
offenders | ผู้กระทำผิด
offense | ความผิด
often | บ่อย
oh | โอ้
okay | โอเค
on | บน/ใน (วัน)
once | ครั้งหนึ่ง/เมื่อ
one | หนึ่ง
ongoing | ที่ดำเนินอยู่
only | เท่านั้น
open-ended | ปลายเปิด
oppose | คัดค้าน
or | หรือ
ordinary | ธรรมดา
other | อื่น
others | คนอื่น
our | ของเรา
out | ออก
outage | ไฟดับ/ระบบล่ม
owe | ติดหนี้
own | ของตัวเอง
ownership | ความเป็นเจ้าของ
pack | ซอง/แพ็ค
paid | จ่าย (อดีต)
panel | แผง
panic | ตื่นตระหนก
papaya | มะละกอ
parent | พ่อแม่
park | สวนสาธารณะ/จอด
part | ส่วน
particularly | โดยเฉพาะ
pass | ผ่าน/ส่งให้
past | อดีต/ผ่าน
pat | ตบเบาๆ
path | เส้นทาง
pawn | จำนำ
payday | วันเงินเดือนออก
peace | สันติภาพ
peanut | ถั่วลิสง
peer | เพื่อนรุ่นเดียวกัน
people | ผู้คน
per | ต่อ
percent | เปอร์เซ็นต์
period | ช่วงเวลา
person | บุคคล
personal | ส่วนตัว
phones | โทรศัพท์
photo | รูปภาพ
phrase | วลี
phuket | ภูเก็ต
physical | ทางกาย
pick | เลือก/รับ
pickup | รถกระบะ
piece | ชิ้น
pizza | พิซซ่า
place | สถานที่
plane | เครื่องบิน
plant | ต้นไม้/ปลูก
please | กรุณา
pleasure | ความยินดี
plenty | มากมาย
pm | เวลาหลังเที่ยง
point | จุด/ประเด็น/ชี้
pointed | ชี้ (อดีต)
poisoning | การวางยาพิษ
pollute | ก่อมลพิษ
ponzi | แชร์ลูกโซ่ (Ponzi)
pool | สระว่ายน้ำ
poor | จน/แย่
position | ตำแหน่ง
positive | บวก/ดี
post | โพสต์/ด่าน
power | พลัง/อำนาจ
predict | ทำนาย
premium | พรีเมียม
prepare | เตรียม
presentation | การนำเสนอ
press | กด/สื่อมวลชน
presumption | การสันนิษฐาน
pretty | สวย/ค่อนข้าง
primarily | เป็นหลัก
prime | นายก (prime minister)
print | พิมพ์
prisoner | นักโทษ
process | กระบวนการ
professional | มืออาชีพ
program | โปรแกรม
project | โครงการ
promote | ส่งเสริม
property | ทรัพย์สิน
proponent | ผู้สนับสนุน
pros | ข้อดี
protection | การคุ้มครอง
punish | ลงโทษ
punishment | การลงโทษ
qr | คิวอาร์
quality | คุณภาพ
quarter | หนึ่งในสี่/15 นาที
queue | คิว
racing | แข่งรถ
rage | ความโกรธ
rainy | ฝนตก
raise | ยก/เลี้ยงดู
rak | รัก (บางรัก)
rama | พระราม
ran | วิ่ง (อดีต)
rang | ดัง (อดีต)
rarely | แทบจะไม่
rate | อัตรา
rather | ค่อนข้าง/แทนที่จะ
reach | ไปถึง
react | ตอบสนอง
reader | ผู้อ่าน
reality | ความเป็นจริง
realize | ตระหนัก
recent | ล่าสุด
recognition | การจดจำ
reconsider | พิจารณาใหม่
recruitment | การรับสมัคร
reduce | ลด
reference | อ้างอิง
regard | เกี่ยวกับ
regards | ด้วยความนับถือ
registered | จดทะเบียน
regret | เสียใจ
regular | สม่ำเสมอ
reinforce | เสริม
rely | พึ่งพา
remove | เอาออก
rent | เช่า
rental | ให้เช่า
reoffend | กระทำผิดซ้ำ
reopen | เปิดอีกครั้ง
replace | แทนที่
reset | รีเซ็ต
resolve | แก้ไข
resources | ทรัพยากร
response | การตอบสนอง
responsibility | ความรับผิดชอบ
restorative | ฟื้นฟู
restricted | จำกัด/หวงห้าม
reunion | การรวมญาติ
rhetorical | เชิงวาทศิลป์
rich | รวย
ride | ขี่/นั่ง (รถ)
ridiculous | ไร้สาระ
rise | เพิ่มขึ้น
risky | เสี่ยง
road | ถนน
role | บทบาท
roll | กลิ้ง
romance | ความรัก
rose | เพิ่มขึ้น (อดีต)/กุหลาบ
route | เส้นทาง
royal | หลวง
run | วิ่ง
runny | ไหล (น้ำมูก)
runs | วิ่ง
rural | ชนบท
rush | เร่งรีบ (rush hour = ชั่วโมงเร่งด่วน)
sad | เศร้า
safe | ปลอดภัย
safest | ปลอดภัยที่สุด
safety | ความปลอดภัย
said | พูด (อดีต)
salad | สลัด
same | เหมือนกัน
san | สาร (ข้าวสาร)
sathorn | สาทร
saw | เห็น (อดีต)
say | พูด
scan | สแกน
scene | ที่เกิดเหตุ
scheme | แผนการ
score | คะแนน
seat | ที่นั่ง
see | เห็น
seek | แสวงหา
seem | ดูเหมือน
seen | เห็น (V3)
self-care | ดูแลตัวเอง
sent | ส่ง (อดีต)
september | กันยายน
serial | หมายเลข (serial number)
serious | ร้ายแรง/จริงจัง
servant | ผู้รับใช้ (civil servant = ข้าราชการ)
serve | รับใช้/เสิร์ฟ
set | ตั้ง/ชุด
several | หลาย
shall | จะ/ควร
shame | น่าเสียดาย/ความอาย
share | แบ่งปัน
shark | ฉลาม
sharp | คม/แหลม
she | เธอ
sheet | แผ่น
shelf | ชั้นวาง
shell | เปลือก (shell company = บริษัทบังหน้า)
shelves | ชั้นวาง (หลายชั้น)
shocking | น่าตกใจ
shot | การยิง/ความพยายาม
shots | การตัดสินใจ (call the shots)
should | ควร
shrink | หดตัว
side | ด้าน/ข้าง
silom | สีลม
simple | ง่าย
sing | ร้องเพลง
singer | นักร้อง
sir | ท่าน (ชาย)
situation | สถานการณ์
situational | ตามสถานการณ์
skid | ลื่นไถล
sleeper | ตู้นอน
sleeve | แขนเสื้อ
small | เล็ก
smart | ฉลาด
smoke | ควัน/สูบ
smoking | การสูบบุหรี่
sniffer | ดมกลิ่น (สุนัขดมกลิ่น)
snow | หิมะ
so | ดังนั้น
sober | ไม่เมา
social | สังคม
society | สังคม
solar | แสงอาทิตย์
sold | ขาย (อดีต)
som | ส้ม (ส้มตำ)
somchai | สมชาย (ชื่อคน)
some | บ้าง/บางส่วน
someone | ใครบางคน
something | บางสิ่ง
song | เพลง
songkran | สงกรานต์
sore | เจ็บ
sorry | ขอโทษ
sort | ชนิด/จัดเรียง
sound | เสียง/ฟังดู
soup | ซุป
special | พิเศษ
speech | สุนทรพจน์
spell | สะกด
spent | ใช้ (เงิน/เวลา) (อดีต)
spiked | ถูกใส่ยา
spirit | จิตวิญญาณ
spite | แม้ว่า (in spite of)
spoke | พูด (อดีต)
spoken | พูด (V3)
sport | กีฬา
spot | จุด/สังเกตเห็น
spread | แพร่กระจาย
spring | ฤดูใบไม้ผลิ
squad | หน่วย
stable | มั่นคง
stage | เวที/ขั้น
stall | แผงลอย
standard | มาตรฐาน
start | เริ่ม
state | รัฐ/ระบุ
status | สถานะ
stay | อยู่/พัก
steak | สเต็ก
step | ขั้น/ก้าว
sticky | เหนียว
still | ยังคง
sting | ล่อซื้อ
stock | สต็อก/หุ้น
stole | ขโมย (อดีต)
stolen | ถูกขโมย (V3)
stone | หิน
straight | ตรง
strange | แปลก
street | ถนน
strong | แข็งแรง
stronger | แข็งแรงกว่า
stuck | ติด
subject | วิชา/หัวข้อ
submit | ส่ง
succeed | สำเร็จ
such | เช่นนั้น/มาก
sudden | ทันที
suffer | ทุกข์ทรมาน
suit | ชุดสูท/เหมาะ
suitable | เหมาะสม
sum | ผลรวม
supervisor | หัวหน้างาน
supporter | ผู้สนับสนุน
surprise | แปลกใจ/เซอร์ไพรส์
surrounding | รอบๆ
suspension | การพักใช้
sword | ดาบ
system | ระบบ
t-shirt | เสื้อยืด
take | เอา/ใช้เวลา
taken | เอา (V3)
talented | มีพรสวรรค์
talk | พูดคุย
tall | สูง
taller | สูงกว่า
tallest | สูงที่สุด
tam | ตำ (ส้มตำ)
tank | ถัง
target | เป้าหมาย
tech | เทคโนโลยี
tell | บอก
ten | สิบ
terminal | อาคารผู้โดยสาร
terms | เงื่อนไข
terrible | แย่มาก
thai | ไทย
thailand | ประเทศไทย
than | กว่า
thank | ขอบคุณ
thanks | ขอบคุณ
that | นั่น/นั้น/ที่
the | คำนำหน้านามเฉพาะ
theft | การลักขโมย
their | ของพวกเขา
them | พวกเขา (กรรม)
then | แล้ว/จากนั้น
there | ที่นั่น/มี
therefore | ดังนั้น
these | เหล่านี้
they | พวกเขา
thief | ขโมย
thieves | ขโมย (หลายคน)
things | สิ่งของ
think | คิด
third | ที่สาม
this | นี่/นี้
those | เหล่านั้น
though | แม้ว่า
thought | คิด (อดีต)
three | สาม
throat | คอ
through | ผ่าน/ทะลุ
throughout | ตลอด
tide | กระแสน้ำ
tidy | เรียบร้อย
tight | แน่น
time | เวลา/ครั้ง
to | ไปยัง/เพื่อ
together | ด้วยกัน
told | บอก (อดีต)
tom | ทอม (ชื่อคน)
tonight | คืนนี้
too | เกินไป/ด้วย
took | เอา (อดีต)
topic | หัวข้อ
touch | สัมผัส
tough | ยาก
tourism | การท่องเที่ยว
tourist | นักท่องเที่ยว
tourists | นักท่องเที่ยว
tow | ลาก
town | เมือง
track | ติดตาม/ราง
tracking | ติดตาม
traditional | ดั้งเดิม
transaction | ธุรกรรม
trash | ขยะ
travel | เดินทาง
trip | การเดินทาง
true | จริง
truth | ความจริง
tshirt | เสื้อยืด
tunnel | อุโมงค์
turbine | กังหัน
turn | เลี้ยว/หมุน/ถึงตา
twisted | บิด
two | สอง
two-factor | สองขั้นตอน
u-turn | กลับรถ
underlying | เบื้องหลัง
unfair | ไม่ยุติธรรม
unknown | ไม่ทราบ
until | จนกระทั่ง
unwilling | ไม่เต็มใจ
up | ขึ้น
upon | เมื่อ/บน
urge | เรียกร้อง
urine | ปัสสาวะ
us | เรา (กรรม)
useful | มีประโยชน์
uturn | กลับรถ
valid | ถูกต้อง/ใช้ได้
value | มูลค่า
very | มาก
video | วิดีโอ
view | มุมมอง
village | หมู่บ้าน
violence | ความรุนแรง
vis | (vis-à-vis = เมื่อเทียบกับ)
visit | เยี่ยม/ไปเที่ยว
visitor | ผู้มาเยือน
visual | ภาพ
voice | เสียง
wage | ค่าจ้าง
wai | ไหว้
wake | ตื่น
walk | เดิน
walk-ins | ลูกค้า walk-in
want | ต้องการ
was | เป็น/อยู่ (อดีต)
wavelength | ความยาวคลื่น (on the same wavelength = เข้าใจตรงกัน)
way | ทาง/วิธี
we | เรา
website | เว็บไซต์
well | ดี/เก่ง
went | ไป (อดีต)
were | เป็น/อยู่ (อดีต)
what | อะไร
whatever | อะไรก็ตาม
when | เมื่อ
where | ที่ไหน
which | อันไหน/ซึ่ง
who | ใคร/ผู้ซึ่ง
whole | ทั้งหมด
whom | ผู้ซึ่ง (กรรม)
why | ทำไม
wi-fi | ไวไฟ
wifi | ไวไฟ
will | จะ
wish | ปรารถนา/อวยพร
with | กับ
without | โดยไม่มี
woke | ตื่น (อดีต)
woman | ผู้หญิง
won | ชนะ (อดีต)
wonder | สงสัย
wore | สวม (อดีต)
world | โลก
worry | กังวล
worth | คุ้มค่า
would | จะ (สุภาพ/สมมติ)
wrap | ห่อ (wrap up = สรุป)
writer | นักเขียน
written | เขียน (V3)
wrongful | โดยมิชอบ
x-ray | เอกซเรย์
xray | เอกซเรย์
yai | ใหญ่ (หาดใหญ่)
year | ปี
year-old | อายุ…ปี
yearold | อายุ…ปี
yes | ใช่
you | คุณ
your | ของคุณ
yourself | ตัวคุณเอง
zone | เขต
`;
