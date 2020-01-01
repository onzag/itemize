const isDevelopment = process.env.NODE_ENV === "development";

const urlsToCache = [
  "/",
  "/rest/resource/lang.json",
  "/rest/resource/image-fail.svg",
  isDevelopment ? "/rest/resource/build.development.js" : "/rest/resource/build.production.js",
  isDevelopment ? "/rest/resource/build.development.css" : "/rest/resource/build.production.css",
  isDevelopment ? "/rest/resource/cache-worker.development.js" : "/rest/resource/cache-worker.production.js",
];
// the reason is that app always loads the
// production css no matter what, but it's then
// replaced if it's in development mode, production
// it's thought first so this would mess up the development
// environment so we add the production file nonetheless
if (isDevelopment) {
  urlsToCache.push(
    "/rest/resource/build.production.css",
  );
}
const CACHE_NAME = "ITEMIZEV1";

self.addEventListener("install", (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      }),
  );
});

self.addEventListener("fetch", (event: any) => {
  if (event.request.method === "POST") {
    return false;
  }

  const urlAnalyzed = new URL(
    event.request.url,
  );
  const isOurHost = urlAnalyzed.hostname === self.location.hostname;

  if (
    urlAnalyzed.protocol !== "http:" &&
    urlAnalyzed.protocol !== "https:"
  ) {
    return false;
  }

  // these paths aren't managed by us, we just let them fail
  // and go through the network always
  const isInAtotallyUncachedPath =
    isOurHost &&
    urlAnalyzed.pathname.indexOf("/graphql") === 0 ||
    urlAnalyzed.pathname.indexOf("/sw") === 0 ||
    urlAnalyzed.pathname.indexOf("/socket.io") === 0;

  // returning false in such case
  if (isInAtotallyUncachedPath) {
    return false;
  }

  const shouldBeCachedIfNotFound =
    !isOurHost ||
    urlAnalyzed.pathname.indexOf("/rest/resource") === 0;

  const shouldServeIndex =
    isOurHost &&
    urlAnalyzed.pathname.indexOf("/rest") !== 0 &&
    urlAnalyzed.pathname.indexOf("/uploads") !== 0;

  const shouldBeRechecked = true;

  const actualEventRequest: Request = shouldServeIndex ?
    new Request("/") : event.request;

  const acceptHeader = actualEventRequest.headers.get("Accept");
  const expectsImage = acceptHeader && acceptHeader.indexOf("image") === 0;

  // otherwise we are going to try to find matches
  // yes even from /rest we try to find matches
  // some rest answers are meant to be cached such as
  // resources which are hard cached
  event.respondWith(
    (async () => {
      try {
        const cachedResponse = await caches.match(actualEventRequest);
        // if we get a match in our cache
        if (cachedResponse) {
          // if it should be rechecked
          if (shouldBeRechecked) {
            // we basically run this fetch request, outside, notice
            // how we don't return into it
            fetch(actualEventRequest).then((recheckedNetworkResponse) => {
              // fetch it if we can, and if we get the right status code
              if (
                recheckedNetworkResponse.status === 200 ||
                recheckedNetworkResponse.status === 0
              ) {
                // then add to the cache
                return caches.open(CACHE_NAME).then((cache) => {
                  cache.put(actualEventRequest, recheckedNetworkResponse);
                });
              }
            }).catch(() => null);
          }
          console.log("Service worker cache hit for ", actualEventRequest.url);
          return cachedResponse;
        }

        const netWorkResponse = await fetch(actualEventRequest);
        // resources are static, but they are language specific
        // so we don't really precache those, for example, the
        // build.en.json files and build.es.json files as well
        // as all the moment files, the term and conditions and so
        // on
        if (
          shouldBeCachedIfNotFound &&
          (
            netWorkResponse.status === 200 ||
            netWorkResponse.status === 0
          )
        ) {
          console.log("caching request ", actualEventRequest.url);
          const networkResponseClone = netWorkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(actualEventRequest, networkResponseClone);
          }).catch((err) => {
            console.warn("could not catch", err);
          });
        } else if (
          expectsImage &&
          netWorkResponse.status === 404
        ) {
          throw new Error("Invalid image not found");
        }

        return netWorkResponse;
      } catch (err) {
        if (expectsImage) {
          try {
            const imageCachedResponse = await caches.match("/rest/resource/image-fail.svg");
            return imageCachedResponse;
          } catch (err) {
            // Nothing happens
          }
        }
        return new Response(null, {
          status: 503,
          statusText: "Service Unavailable",
        });
      }
    })(),
  );
});
