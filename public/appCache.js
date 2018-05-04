const CACHE_NAME = 'app_serviceworker_v_1';
const cacheUrls = [
    '/',
    '/img/oil.GIF',
    '/js/dist/bundle.js',
    '/img/',
    '/css/styles.css',
    '/js/views/GameView/styles.css'
];

self.addEventListener('install', function (event) {
    console.log('install', event);
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                // загружаем в наш cache необходимые файлы
                return cache.addAll(cacheUrls);
            })
            .catch((err) => {
                console.error('smth wrong with cache.open: ', err);
            })
    );
});

self.addEventListener('activate', function (event) {
    // активация
    console.log('activate', event);
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(function (cachedResponse) {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return fetch(event.request);
            })
    );
});
