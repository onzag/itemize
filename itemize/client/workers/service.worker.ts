// This variable gets replaced with the build number
// This will cause the service worker to reactivate due to
// the byte difference
const BUILD_NUMBER = null;
const isDevelopment = process.env.NODE_ENV === "development";

const urlsToCache = [
  "/",
  "/rest/resource/lang.json",
  isDevelopment ? "/rest/resource/build.development.js" : "/rest/resource/build.production.js",
  isDevelopment ? "/rest/resource/build.development.css" : "/rest/resource/build.production.css",
  isDevelopment ? "/rest/resource/cache-worker.development.js" : "/rest/resource/cache-worker.production.js",
];
const CACHE_NAME = "ITEMIZE" + BUILD_NUMBER;

self.addEventListener("install", (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      }),
  );
});

self.addEventListener("activate", (event: any) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName.indexOf("ITEMIZE") === 0 && cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});

self.addEventListener("fetch", (event: any) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log("Service worker cache hit for ", event.request.url);
        return response;
      }
      return fetch(event.request);
    }),
  );
});
