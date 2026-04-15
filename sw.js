// Service Worker — Estadísticas Gallardas
// Gestiona caché offline básica

const CACHE_NAME = 'gallardas-v1';
const ASSETS = [
  './',
  './index.html',
  './app.html',
  './css/main.css',
  './js/firebase-config.js',
  './js/auth.js',
  './js/app.js',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap',
];

// Instalar: cachear assets estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activar: limpiar caches antiguas
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: network-first para Firebase, cache-first para assets
self.addEventListener('fetch', e => {
  const url = e.request.url;

  // Firebase siempre en red
  if (url.includes('firebase') || url.includes('firestore') || url.includes('googleapis.com/identitytoolkit')) {
    return;
  }

  // Google Fonts: cache-first
  if (url.includes('fonts.googleapis.com') || url.includes('fonts.gstatic.com')) {
    e.respondWith(
      caches.match(e.request).then(cached =>
        cached || fetch(e.request).then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
          return res;
        })
      )
    );
    return;
  }

  // Assets locales: network-first con fallback a caché
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
