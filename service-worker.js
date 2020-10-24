const CACHE_NAME = "moviematchV1";
const urlsToCache = [
    "/",
    "/img/android-chrome-192x192.png",
    "/img/android-chrome-512x512.png",
    "/img/take.jpg",
    "/img/chill.jpg",
    "/img/cinema.jpg",
    "/img/incoming.jpg",
    "/img/living.jpg",
    "/img/popcorn.jpg",
    "/index.html",
    "/nav.html",
    "/pages/about.html",
    "/pages/genres.html",
    "/pages/home.html",
    "/pages/search.html",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/css/materialize.min.css",
    "/css/style.css"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches
        .match(event.request, {
            cacheName: CACHE_NAME
        })
        .then((response) => {
            if (response) {
                console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                return response;
            }
            console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
            return fetch(event.request);
        })
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});