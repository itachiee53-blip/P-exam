/**
 * P-exam คลังข้อสอบออนไลน์ (Google Apps Script)
 * - ทุกคนดูและโหลดได้ทุกไฟล์
 * - ลบได้เฉพาะไฟล์ที่ตัวเองอัป (เทียบรหัสเจ้าของประจำเครื่อง)
 * - ไฟล์เก่าที่ไม่มีเจ้าของ: เจ้าของ Drive ลบเองได้ใน Google Drive
 *
 * วางทั้งไฟล์ได้เลย ไม่ต้องแก้อะไร: สคริปต์จะสร้างโฟลเดอร์ "P-exam คลังข้อสอบ" ใน Drive ให้เอง
 * (ถ้ามีโฟลเดอร์ชื่อนี้อยู่แล้วจะใช้อันเดิม)
 */
var FOLDER_NAME = 'P-exam คลังข้อสอบ';

function getFolder_() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty('FOLDER_ID');
  if (id) { try { return DriveApp.getFolderById(id); } catch (e) {} }
  var it = DriveApp.getFoldersByName(FOLDER_NAME);
  var folder = it.hasNext() ? it.next() : DriveApp.createFolder(FOLDER_NAME);
  props.setProperty('FOLDER_ID', folder.getId());
  return folder;
}

// กด Run ฟังก์ชันนี้ 1 ครั้งหลังวาง เพื่อให้ Google ขอสิทธิ์และสร้างโฟลเดอร์
function setup() {
  var f = getFolder_();
  Logger.log('พร้อมใช้งาน โฟลเดอร์: ' + f.getName() + ' (' + f.getUrl() + ')');
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var folder = getFolder_();
    switch (data.action) {
      case 'list': return json_(listFiles_(folder));
      case 'download': return downloadFile_(folder, data.fileId);
      case 'chunk_upload': return json_(chunkUpload_(folder, data));
      case 'delete': return json_(deleteFile_(folder, data));
      default: return json_({ ok: false, error: 'ไม่รู้จักคำสั่ง' });
    }
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message || err) });
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// เก็บเฉพาะค่าแฮชของรหัสเจ้าของ (คนอื่นเห็นแฮชก็เอาไปลบแทนไม่ได้)
function hash_(s) {
  var raw = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(s), Utilities.Charset.UTF_8);
  return raw.map(function (b) { return ('0' + (b & 0xff).toString(16)).slice(-2); }).join('');
}

function meta_(file) {
  try { return JSON.parse(file.getDescription() || '{}'); } catch (e) { return {}; }
}

function cleanName_(s) {
  return String(s || 'ไม่ระบุ').replace(/[\\\/:*?"<>|]/g, '').replace(/__/g, '_').slice(0, 60);
}

// รายชื่อไฟล์ "วิชา__จำนวนข้อ(__เจ้าของ).json" (ข้ามไฟล์ชิ้นส่วน .part_)
function listFiles_(folder) {
  var files = folder.getFiles(), items = [], totalBytes = 0;
  while (files.hasNext()) {
    var file = files.next(), fName = file.getName();
    if (fName.indexOf('.part_') > -1 || !/\.json$/.test(fName)) continue;
    var size = file.getSize(); totalBytes += size;
    var parts = fName.replace(/\.json$/, '').split('__');
    var m = meta_(file);
    items.push({
      id: file.getId(),
      fileName: fName,
      name: parts[0],
      count: parts.length > 1 ? parseInt(parts[1], 10) || 0 : 0,
      size: size,
      date: Utilities.formatDate(file.getLastUpdated(), 'Asia/Bangkok', 'dd/MM/yyyy HH:mm'),
      ownerHash: m.ownerHash || '',
      ownerName: m.ownerName || ''
    });
  }
  items.sort(function (a, b) { return a.name.localeCompare(b.name, 'th'); });
  return { ok: true, items: items, totalBytes: totalBytes };
}

function downloadFile_(folder, fileId) {
  var file = DriveApp.getFileById(fileId);
  // อนุญาตเฉพาะไฟล์ในโฟลเดอร์คลังเท่านั้น
  var parents = file.getParents(), inside = false;
  while (parents.hasNext()) if (parents.next().getId() === folder.getId()) inside = true;
  if (!inside) return json_({ ok: false, error: 'ไม่พบไฟล์' });
  return ContentService.createTextOutput(file.getBlob().getDataAsString('UTF-8')).setMimeType(ContentService.MimeType.JSON);
}

// รับไฟล์เป็นชิ้น แล้วรวมเมื่อครบทุกชิ้น
function chunkUpload_(folder, d) {
  if (!d.ownerId) return { ok: false, error: 'ไม่มีรหัสเจ้าของ (อัปเดตแอปก่อน)' };
  var subject = cleanName_(d.subject), owner = hash_(d.ownerId), tag = owner.slice(0, 8);
  var base = subject + '__' + tag;
  var idx = parseInt(d.chunkIndex, 10), total = parseInt(d.totalChunks, 10);
  if (idx === 0) removeByPrefix_(folder, base + '.part_');               // เริ่มใหม่: ล้างชิ้นค้าง
  folder.createFile(base + '.part_' + ('0000' + idx).slice(-4), d.chunkData, MimeType.PLAIN_TEXT);
  if (idx < total - 1) return { ok: true, received: idx + 1 };

  // ชิ้นสุดท้าย: รวมตามลำดับ
  var partsIt = folder.getFiles(), parts = [];
  while (partsIt.hasNext()) { var f = partsIt.next(); if (f.getName().indexOf(base + '.part_') === 0) parts.push(f); }
  if (parts.length !== total) return { ok: false, error: 'ได้รับไม่ครบ ' + parts.length + '/' + total + ' ชิ้น ลองใหม่อีกครั้ง' };
  parts.sort(function (a, b) { return a.getName() < b.getName() ? -1 : 1; });
  var content = parts.map(function (f) { return f.getBlob().getDataAsString('UTF-8'); }).join('');
  JSON.parse(content); // ตรวจว่าไฟล์สมบูรณ์

  // คนเดิมอัปวิชาเดิมซ้ำ = แทนที่ไฟล์เก่าของตัวเอง (ไม่ทับของเพื่อน)
  var all = folder.getFiles();
  while (all.hasNext()) {
    var g = all.next(), n = g.getName();
    if (/\.json$/.test(n) && n.split('__')[0] === subject && meta_(g).ownerHash === owner) g.setTrashed(true);
  }
  var out = folder.createFile(subject + '__' + (parseInt(d.totalQuestions, 10) || 0) + '__' + tag + '.json', content, MimeType.PLAIN_TEXT);
  out.setDescription(JSON.stringify({ ownerHash: owner, ownerName: String(d.ownerName || '').slice(0, 40) }));
  parts.forEach(function (f) { f.setTrashed(true); });
  return { ok: true, fileName: out.getName() };
}

function removeByPrefix_(folder, prefix) {
  var it = folder.getFiles();
  while (it.hasNext()) { var f = it.next(); if (f.getName().indexOf(prefix) === 0) f.setTrashed(true); }
}

function deleteFile_(folder, d) {
  var it = folder.getFilesByName(String(d.fileName || ''));
  if (!it.hasNext()) return { ok: false, error: 'ไม่พบไฟล์' };
  var file = it.next(), m = meta_(file);
  if (!m.ownerHash) return { ok: false, error: 'ไฟล์เก่าไม่มีเจ้าของ ให้เจ้าของ Drive ลบใน Google Drive' };
  if (!d.ownerId || hash_(d.ownerId) !== m.ownerHash) return { ok: false, error: 'ลบได้เฉพาะไฟล์ที่คุณอัปเอง' };
  file.setTrashed(true); // ย้ายไปถังขยะของ Drive (กู้คืนได้ 30 วัน)
  return { ok: true };
}
