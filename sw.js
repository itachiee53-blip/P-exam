// P-exam service worker: ใช้งานได้แม้ไม่มีเน็ต
// - หน้าแอป: ดึงจากเน็ตก่อน (ได้เวอร์ชันใหม่เสมอ) ถ้าออฟไลน์ใช้ของที่เก็บไว้
// - ไฟล์อื่น (เสียง ไอคอน ฟอนต์ ไลบรารี): ใช้ของที่เก็บไว้ทันที แล้วอัปเดตเบื้องหลัง
const CACHE = 'pexam-v1';
const CORE = ['./', 'index.html', 'manifest.json', 'icons/icon-192.png', 'icons/icon-512.png',
  'sounds/tap.mp3', 'sounds/pick.mp3', 'sounds/correct.mp3', 'sounds/wrong.mp3', 'sounds/done.mp3'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || req.url.includes('script.google.com')) return;
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(res => {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put('index.html', copy)); return res;
    }).catch(() => caches.match('index.html')));
    return;
  }
  e.respondWith(caches.match(req).then(hit => {
    const net = fetch(req).then(res => {
      if (res && (res.ok || res.type === 'opaque')) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => hit);
    return hit || net;
  }));
});
