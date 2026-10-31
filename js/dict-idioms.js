// สำนวน/คำแสลง/ประโยคติดปาก: สำนวน | แปล (แปลทั้งสำนวน ไม่แปลทีละคำ)
const DICT_IDIOMS = `
a ballpark figure | ตัวเลขประมาณคร่าวๆ
a blessing in disguise | เรื่องร้ายที่กลายเป็นดี
a double-edged sword | ดาบสองคม
a growing body of research | งานวิจัยจำนวนมากขึ้นเรื่อยๆ
a shot in the dark | การเดาสุ่ม
add insult to injury | ซ้ำเติม
after all | ท้ายที่สุดแล้ว
agree to disagree | ต่างคนต่างความเห็น ไม่ต้องเถียงกัน
all right | ได้/โอเค
an apple a day | กินแอปเปิลวันละลูก (ช่วยให้สุขภาพดี)
and you | แล้วคุณล่ะ
anything else | อะไรอีกไหม
are you kidding | ล้อเล่นหรือเปล่า
as a result | ผลที่ตามมาคือ
as far as i know | เท่าที่ฉันรู้
as long as | ตราบใดที่
as soon as | ทันทีที่
as well as | และ/รวมทั้ง
at first | ตอนแรก
at last | ในที่สุด
at least | อย่างน้อย
at risk | เสี่ยง/ตกอยู่ในอันตราย
at the moment | ตอนนี้
at the same time | ในเวลาเดียวกัน
back to square one | กลับไปเริ่มต้นใหม่
ballpark figure | ตัวเลขประมาณคร่าวๆ
be in touch | ติดต่อกัน
beat around the bush | พูดอ้อมค้อม
because of | เพราะ
behave yourself | ทำตัวดีๆ
believe in you | เชื่อมั่นในตัวคุณ
benefit both of us | เป็นประโยชน์ต่อทั้งสองฝ่าย
benefit of the doubt | ให้โอกาสเชื่อไว้ก่อน
better late than never | มาช้ายังดีกว่าไม่มา
better safe than sorry | กันไว้ดีกว่าแก้
big deal | เรื่องใหญ่
bite off more than you can chew | รับงานเกินตัว
blessing in disguise | เรื่องร้ายที่กลายเป็นดี
blow your cover | ทำให้ตัวจริงถูกเปิดเผย
bottom line | ประเด็นสำคัญที่สุด
break a leg | ขอให้โชคดี (ก่อนแสดง)
break the ice | ทำลายความเงียบ/ความเกร็ง
bring you up to speed | อัปเดตให้รู้เรื่อง
but also | แต่ยัง
by the way | อ้อ/ว่าแต่
call it a day | พอแค่นี้ก่อน/เลิกงาน
call the shots | เป็นคนตัดสินใจ
calm down | ใจเย็นๆ
can't afford | ไม่มีเงินพอจะซื้อ
can't stand | ทนไม่ได้
caught red-handed | ถูกจับได้คาหนังคาเขา
cheer up | ร่าเริงหน่อยนะ
cheers mate | ขอบใจนะเพื่อน
chill out | ผ่อนคลาย
cold feet | ความกลัวจนไม่กล้าทำ
comes first | มาก่อน/สำคัญที่สุด
control the narrative | คุมทิศทางการเล่าเรื่อง
cost an arm and a leg | แพงมาก
count me in | นับฉันด้วย
cringe | น่าอาย/เขิน (แสลง)
cut corners | ทำแบบลวกๆ เพื่อประหยัด
dear sir or madam | เรียนท่านผู้เกี่ยวข้อง
despite the fact | แม้ว่า
devil's advocate | คนที่แย้งเพื่อให้คิดรอบด้าน
didn't mean to | ไม่ได้ตั้งใจ
didn't show up | ไม่มา
do me a favor | ช่วยอะไรหน่อย
do you mind if | รังเกียจไหมถ้า…
don't get lost | อย่าหลงทาง
don't give up | อย่ายอมแพ้
don't mind | ไม่รังเกียจ/ไม่เป็นไร
don't worry about it | ไม่ต้องห่วง
double-edged sword | ดาบสองคม
down the drain | สูญเปล่า
due to | เนื่องจาก
even though | แม้ว่า
fair enough | ก็มีเหตุผล/โอเค
feel like | รู้สึกอยาก
feeling under the weather | รู้สึกไม่ค่อยสบาย
final price | ราคาสุดท้าย
first of all | ก่อนอื่น
flexing | อวด (แสลง)
fomo | กลัวตกกระแส (แสลง)
for example | ตัวอย่างเช่น
for his age | เมื่อเทียบกับอายุ
for instance | ตัวอย่างเช่น
for more information | สอบถามข้อมูลเพิ่มเติม
freak out | ตกใจ/สติแตก
free to go | ไปได้แล้ว
from now on | ต่อจากนี้ไป
get along well | เข้ากันได้ดี
get back to you | ติดต่อกลับ
get cold feet | ใจเสาะ/เปลี่ยนใจเพราะกลัว
get in touch | ติดต่อ
get the hang of | เริ่มทำเป็น/จับทางได้
get the hang of it | เริ่มทำเป็นแล้ว
gets better soon | หายเร็วๆ
ghosted | หายเงียบไปเฉยๆ (แสลง)
give in to | ยอมตาม
give me a hand | ช่วยหน่อย
go the extra mile | ทุ่มเทเกินกว่าที่ต้องทำ
go viral | ดังในโลกออนไลน์
gonna | จะ (going to)
good for you | ดีแล้ว/ยินดีด้วย
good luck with | ขอให้โชคดีกับ…
good manners | มีมารยาท
good morning | สวัสดีตอนเช้า
good night | ราตรีสวัสดิ์
got out of hand | เกินควบคุม
gotta | ต้อง (got to)
grab a coffee | ไปกินกาแฟกัน
guess what | รู้อะไรไหม
hang in there | อดทนไว้นะ
hang out | ไปเที่ยวเล่น
happy birthday | สุขสันต์วันเกิด
have a nice weekend | ขอให้มีวันหยุดสุดสัปดาห์ที่ดี
have you ever been | คุณเคยไป…ไหม
here it is | นี่ไง
hit the books | ตั้งใจอ่านหนังสือ
hit the road | ออกเดินทาง
hit the sack | เข้านอน
hold on | รอสักครู่
how come | ทำไมล่ะ
how have you been | ช่วงนี้เป็นยังไงบ้าง
how long have you | คุณ…มานานแค่ไหนแล้ว
how's it going | เป็นยังไงบ้าง
how's work going | งานเป็นยังไงบ้าง
i could use a break | อยากพักจัง
i hear you | ฉันเข้าใจ (ฟังอยู่)
i see your point | เข้าใจประเด็นของคุณ
i think we are lost | ฉันว่าเราหลงทางแล้ว
i understand how you feel | เข้าใจความรู้สึกคุณ
i won't do it again | จะไม่ทำอีกแล้ว
i'm all ears | ฉันตั้งใจฟังอยู่
i'm broke | ไม่มีเงินเลย
i'm broke until payday | ไม่มีเงินจนเงินเดือนออก
i'm fine thank you | สบายดี ขอบคุณ
i'm glad | ดีใจ
i'm just looking | แค่ดูเฉยๆ
i'm so happy for you | ดีใจด้วยจริงๆ
i'm sorry to hear that | เสียใจด้วยนะ
i'm still here | ฉันยังอยู่ตรงนี้
i'm swamped | งานล้นมือ
if only | ถ้าเพียงแต่
in a nutshell | สรุปสั้นๆ
in accordance with | ตาม/สอดคล้องกับ
in addition | นอกจากนี้
in case | เผื่อว่า
in charge | รับผิดชอบ/ผู้ดูแล
in charge of | รับผิดชอบ
in front of | ข้างหน้า
in hindsight | เมื่อมองย้อนกลับไป
in more detail | ละเอียดกว่านี้
in other words | พูดอีกอย่างคือ
in spite of | แม้ว่า
in terms of | ในแง่ของ
in the loop | รับรู้ความคืบหน้า
in time | ทันเวลา
instead of | แทนที่จะ
is said to be | ว่ากันว่า
is there another way | มีทางอื่นไหม
it can be argued that | อาจกล่าวได้ว่า
it costs an arm and a leg | แพงมาก
it is believed that | เชื่อกันว่า
it is expected that | คาดว่า
it is widely accepted that | เป็นที่ยอมรับกันทั่วไปว่า
it's a deal | ตกลงตามนั้น
it's been ages | นานมากแล้ว
it's ok to ask for help | ขอความช่วยเหลือได้ไม่ผิด
it's up to you | แล้วแต่คุณ
jump to conclusions | ด่วนสรุป
just a moment | รอสักครู่
just a moment please | รอสักครู่นะครับ/คะ
just a second | รอสักครู่
just chill | ชิลๆ
keep a low profile | ทำตัวเงียบๆ ไม่เด่น
keep in touch | ติดต่อกันไว้
keep me in the loop | แจ้งความคืบหน้าให้ทราบด้วย
keeps his promises | รักษาสัญญาเสมอ
kinda | ค่อนข้าง (kind of)
last but not least | สุดท้ายแต่สำคัญ
lead to | นำไปสู่
leave a message | ฝากข้อความ
lend a hand | ช่วยเหลือ
let me introduce myself | ขอแนะนำตัว
let me see what i can do | ขอดูว่าช่วยอะไรได้บ้าง
let the cat out of the bag | เผลอบอกความลับ
let's wrap up | มาสรุปกันเถอะ
lit | สุดยอด/สนุกมาก (แสลง)
long shot | โอกาสน้อยมาก
long time no see | ไม่ได้เจอกันนาน
look forward to hearing from you | หวังว่าจะได้รับการติดต่อกลับ
low-key | แอบๆ/นิดหน่อย (แสลง)
make a decision | ตัดสินใจ
make a mistake | ทำผิดพลาด
make a valid point | มีประเด็นที่ถูกต้อง
make amends | ชดใช้/แก้ไขความผิด
make sense | มีเหตุผล/เข้าใจได้
make sure | ทำให้แน่ใจ
make your bed | เก็บที่นอน
makes sense | มีเหตุผล/เข้าใจได้
maybe next time | ไว้คราวหน้า
meet halfway | ประนีประนอมกันคนละครึ่ง
more or less | ประมาณนั้น
move on | ไปต่อ
move on to | ไปต่อที่
my bad | ฉันผิดเอง
my battery is dying | แบตใกล้หมด
my pleasure | ด้วยความยินดี
my treat | ฉันเลี้ยง
never mind | ไม่เป็นไร
next to | ข้างๆ
nice to meet you too | ยินดีที่ได้รู้จักเช่นกัน
no big deal | ไม่เป็นไร/ไม่ใช่เรื่องใหญ่
no longer | ไม่…อีกต่อไป
no pain no gain | ไม่ลำบากก็ไม่ได้ผล
no problem | ไม่มีปัญหา
no problem at all | ไม่มีปัญหาเลย
no way | ไม่มีทาง/จริงดิ
no worries | ไม่เป็นไร
not a fan of | ไม่ค่อยชอบ
not at all | ไม่เลย/ยินดี
not my thing | ไม่ใช่แนวฉัน
not only | ไม่เพียงแต่
not until | ไม่จน…
of course | แน่นอน
off the record | ไม่เป็นทางการ/ห้ามเผยแพร่
oh i see | อ๋อ เข้าใจแล้ว
on behalf of | ในนามของ
on behalf of the police | ในนามของตำรวจ
on cloud nine | มีความสุขมาก
on the contrary | ตรงกันข้าม
on the other hand | ในทางกลับกัน
on the record | อย่างเป็นทางการ
on the same page | เข้าใจตรงกัน
on the same wavelength | เข้าใจตรงกัน/คิดเหมือนกัน
on the spot | ณ ที่นั้นทันที
on time | ตรงเวลา
once in a blue moon | นานๆ ครั้ง
one problem at a time | ทีละปัญหา
only then | เมื่อนั้นเอง
out of context | ตัดออกจากบริบท
out of hand | ควบคุมไม่ได้
over the moon | ดีใจมาก
pay attention | ตั้งใจ/ใส่ใจ
piece of cake | ง่ายมาก
play a key role | มีบทบาทสำคัญ
play devil's advocate | แกล้งแย้งเพื่อให้คิดรอบด้าน
provided that | โดยมีเงื่อนไขว่า
pull someone's leg | แกล้งล้อเล่น
pull their weight | ทำหน้าที่ของตัวเองเต็มที่
pulling my leg | แกล้งล้อเล่นฉัน
put lives at risk | ทำให้ชีวิตตกอยู่ในอันตราย
put you through | ต่อสายให้
ran a red light | ฝ่าไฟแดง
reached a decision | ได้ข้อสรุปแล้ว
reached an impasse | ถึงทางตัน
red-handed | คาหนังคาเขา
remain calm | ใจเย็นไว้
result in | ส่งผลให้
right away | ทันที
room for improvement | ยังพัฒนาได้อีก
salty | หงุดหงิด/ขี้งอน (แสลง)
say that again | พูดอีกครั้ง
see eye to eye | เห็นตรงกัน
see it from my perspective | มองจากมุมของฉัน
see you later | แล้วเจอกัน
see you on | เจอกันวัน…
see you then | แล้วเจอกัน
see you tomorrow | เจอกันพรุ่งนี้
shot in the dark | การเดาสุ่ม
signed off on | อนุมัติ
slayed | ทำได้ปังมาก (แสลง)
so far | จนถึงตอนนี้
so far so good | จนถึงตอนนี้ก็ดี
so salty | หงุดหงิด/งอน (แสลง)
sooner or later | ไม่ช้าก็เร็ว
sorry about that | ขอโทษด้วยนะ
sorry for any inconvenience | ขออภัยในความไม่สะดวก
sorry for your loss | เสียใจด้วยกับการสูญเสีย
sort out | จัดการให้เรียบร้อย
sort this out | จัดการเรื่องนี้ให้เรียบร้อย
sounds fair | ฟังดูยุติธรรม
sounds good | ฟังดูดี
sounds good to me | ฉันโอเค
spill the beans | เผยความลับ
stage fright | ความประหม่าบนเวที
stay calm | ใจเย็นไว้
stay healthy | รักษาสุขภาพ
stay on the line | ถือสายรอไว้
stay on the main road | ใช้ถนนใหญ่ไว้
sus | น่าสงสัย (แสลง)
take a rain check | ขอเลื่อนไปคราวหน้า
take care | ดูแลตัวเองนะ
take care and see you soon | ดูแลตัวเองนะ แล้วเจอกัน
take it easy | ใจเย็นๆ/พักผ่อนบ้าง
take part in | เข้าร่วม
take place | เกิดขึ้น/จัดขึ้น
taken out of context | ถูกตัดตอนออกจากบริบท
tell me about | เล่าเรื่อง…ให้ฟัง
tell me about yourself | เล่าเกี่ยวกับตัวคุณหน่อย
thank you for your time | ขอบคุณที่สละเวลา
thank you very much | ขอบคุณมาก
thanks for the heads-up | ขอบคุณที่บอกล่วงหน้า
that means a lot | มีความหมายกับฉันมาก
that's all | แค่นั้น
that's all right | ไม่เป็นไร
that's awesome | เจ๋งมาก
that's great news | ข่าวดีมาก
the ball is in your court | ถึงตาคุณตัดสินใจแล้ว
the fine print | รายละเอียดตัวเล็กในสัญญา
the last straw | ฟางเส้นสุดท้าย
the right thing | สิ่งที่ถูกต้อง
the tip of the iceberg | แค่ส่วนเล็กๆ ของปัญหา
think on their feet | คิดเร็วแก้ปัญหาเฉพาะหน้า
thinking critically | การคิดอย่างมีวิจารณญาณ
this time tomorrow | เวลานี้พรุ่งนี้
time flies | เวลาผ่านไปเร็ว
tip of the iceberg | แค่ส่วนเล็กๆ ของปัญหา
to be honest | พูดตรงๆ
to sum up | สรุปคือ
too early to say | ยังเร็วเกินไปที่จะบอก
turn a blind eye | ทำเป็นมองไม่เห็น
two years ago | เมื่อสองปีก่อน
under no circumstances | ไม่ว่าในกรณีใดก็ตาม
under the weather | ไม่ค่อยสบาย
up to you | แล้วแต่คุณ
vibe | บรรยากาศ/ฟีล (แสลง)
wait a second | รอแป๊บนึง
wake-up call | สัญญาณเตือนให้ตื่นตัว
walk-ins are welcome | ไม่ต้องจองก็ได้
wanna | อยาก (want to)
was lit | สนุกสุดๆ
we regret to inform you | เราเสียใจที่ต้องแจ้งว่า
we're almost there | ใกล้ถึงแล้ว
went out | ดับ/ออกไปข้างนอก (อดีต)
went through a hard time | ผ่านช่วงเวลาที่ยากลำบาก
went viral | ดังในโลกออนไลน์
what a pity | น่าเสียดายจัง
what a shame | น่าเสียดายจัง
what do you recommend | แนะนำอะไรดี
what's the matter | เป็นอะไรไป
what's up | ว่าไง
when pigs fly | ไม่มีทางเกิดขึ้น
where do you see yourself | คุณเห็นตัวเองเป็นยังไงใน…
who's calling | ใครโทรมาครับ/คะ
why you think so | ทำไมคุณคิดอย่างนั้น
with all due respect | ด้วยความเคารพ
work well under pressure | ทำงานได้ดีภายใต้ความกดดัน
worth noting | ควรสังเกต
would you like | รับ…ไหม
wrap up | สรุป/ปิดท้าย
yes a little | ได้นิดหน่อย
yes i do | ใช่ ฉัน…
yes please | ได้ ขอบคุณ
you had better | คุณควรจะ…
you're welcome | ยินดีครับ/ค่ะ
your side of the story | เรื่องเล่าจากฝั่งของคุณ
`;
