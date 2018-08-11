const CACHE_NAME = 'app_serviceworker_v_1';
const cacheUrls = [
    '/js/dist/bundle.js',
    '/js/dist/style.css',
    '/',
    '/img/avatar'
];

self.addEventListener('install', function (event) {
    console.log('install', event);
    // задержим обработку события
    // если произойдёт ошибка, serviceWorker не установится
    event.waitUntil(
        // находим в глобальном хранилище Cache-объект с нашим именем
        // если такого не существует, то он будет создан
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

self.addEventListener('fetch', function (event) {

    // /** online first */
    // if (navigator.onLine) {
    //     return fetch(event.request);
    // }

    /** cache first */
    event.respondWith(
        caches
            .match(event.request)
            .then((cachedResponse) => {
                // выдаём кэш, если он есть
                if (cachedResponse) {
                    return cachedResponse;
                }
                return fetch(event.request);
            })
            .catch((err) => {
                console.error('smth went wrong with caches.match: ', err);
             })
    );
});
