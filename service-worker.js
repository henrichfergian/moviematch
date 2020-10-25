const CACHE_NAME = "moviematchV1";
const urlsToCache = [
    "https://use.fontawesome.com/releases/v5.15.1/css/all.css",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://use.fontawesome.com/releases/v5.15.1/webfonts/fa-brands-400.woff2",
    "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
    "https://code.jquery.com/jquery-3.3.1.min.js",
    "/",
    "/img/android-chrome-192x192.png",
    "/img/android-chrome-512x512.png",
    "/img/apple-touch-icon.png",
    "/img/take.jpg",
    "/img/time.jpg",
    "/img/chill.jpg",
    "/img/cinema.jpg",
    "/img/incoming.jpg",
    "/img/living.jpg",
    "/img/popcorn.jpg",
    "/img/tmdb-icon.svg",
    "/index.html",
    "/nav.html",
    "/manifest.json",
    "/pages/about.html",
    "/pages/genres.html",
    "/pages/home.html",
    "/pages/search.html",
    "/pages/showtimes.html",
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