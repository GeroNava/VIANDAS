const CACHE_NAME = 'viandas-reparto-v2';

// Archivos básicos que se guardan en el celular para funcionar rápido/offline
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Instalación: Guarda los archivos esenciales en la memoria del celular
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepta las peticiones: Busca primero en caché, si no está, va a internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si el archivo está en caché, lo devuelve directo
        if (response) {
          return response;
        }
        // Si no está, lo descarga de internet
        return fetch(event.request);
      })
  );
});

// Actualización: Borra cachés viejos si cambias la versión de la app
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
