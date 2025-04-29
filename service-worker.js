// Service Worker para o site JAFETECH
// Implementa cache para melhorar o desempenho e permitir funcionalidade offline

const CACHE_NAME = 'jafetech-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.min.css',
  '/js/agency.min.js',
  '/js/enhanced-functions.js',
  '/js/performance-optimizations.js',
  '/js/contact_me.min.js',
  '/js/jqBootstrapValidation.js',
  '/vendor/bootstrap/css/bootstrap.min.css',
  '/vendor/font-awesome/css/font-awesome.min.css',
  '/vendor/jquery/jquery.min.js',
  '/vendor/bootstrap/js/bootstrap.bundle.min.js',
  '/vendor/jquery-easing/jquery.easing.min.js',
  '/img/optimized/logo.png',
  '/img/optimized/Outro2.png',
  '/img/optimized/1.png',
  '/img/optimized/2.png',
  '/img/optimized/3.webp',
  '/img/optimized/4.png',
  '/img/optimized/logo_marca.jpeg',
  'https://fonts.googleapis.com/css?family=Montserrat:400,700',
  'https://fonts.googleapis.com/css?family=Kaushan+Script',
  'https://fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic',
  'https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css',
  'https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js'
];

// Instala o Service Worker e armazena em cache os recursos essenciais
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Estratégia de cache: Cache First, então Network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - retorna a resposta do cache
        if (response) {
          return response;
        }

        // Clone da requisição
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          response => {
            // Verifica se recebemos uma resposta válida
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone da resposta
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                // Não armazena em cache requisições de terceiros
                if (event.request.url.startsWith(self.location.origin)) {
                  cache.put(event.request, responseToCache);
                }
              });

            return response;
          }
        );
      })
  );
});

// Limpa caches antigos quando uma nova versão do Service Worker é ativada
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
