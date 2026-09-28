// Ambala Worker Service Worker - Auto Cache Cleaner
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
      .then(() => self.registration.unregister())
  );
});

self.addEventListener('fetch', (event) => {
  // Network first always, never cache stale files
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
