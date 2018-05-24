const CACHE_NAME = 'app_serviceworker_v_1';
const cacheUrls = [
    '/js/dist/bundle.js',
    '/js/dist/style.css',
    '/js/dist/8b043ca82d1db5bcc0629f6451527ce5.GIF',
    '/js/dist/0e9700093b01a9f4978b9b9e82e57e41.gif',
    '/js/dist/cdee8779e638e9df44c96d104025be72.JPEG',
    '/'
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
    let url = event.request.url;
    event.respondWith(
        caches
            .match(event.request)
            .then(function (cachedResponse) {
                console.log(url);
                if (cachedResponse) {
                    return cachedResponse;
                }
                return fetch(event.request);
            })
    );
});
