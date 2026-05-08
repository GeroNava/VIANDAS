const CACHE_NAME = 'reparto-v2-cache-v1';
const ASSETS_TO_CACHE = [
  'Repartidores_V2_0.html',
  'manifest.json',
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.15.0/Sortable.min.js'
];

// Instalación y cacheo
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activación
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// Estrategia: Primero buscar en Red, si falla ir al Cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request))
  );
});