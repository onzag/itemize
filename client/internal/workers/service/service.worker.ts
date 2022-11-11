/**
 * This is the main service worker file
 * @module
 */

// We don't import corejs in our service worker as we do not really use
// any of that overall, we only need the regenerator runtime
import "regenerator-runtime/runtime";
import { IConfigRawJSONDataType } from "../../../../config";

declare var CONFIG: string;
declare var BUILDNUMBER: string;

const isDevelopment = process.env.NODE_ENV === "development";
// parsing and stringifying is more efficient
const config: IConfigRawJSONDataType = JSON.parse(CONFIG);
const buildnumber: string = (BUILDNUMBER).trim();

const urlsToCache = [
  "/?noredirect=true",
  "/rest/currency-factors",
  "/rest/resource/lang.json",
  "/rest/resource/image-fail.svg",
  isDevelopment ? "/rest/resource/build.development.js?buildnumber=" + buildnumber : "/rest/resource/build.production.js?buildnumber=" + buildnumber,
  isDevelopment ? "/rest/resource/commons.development.js?buildnumber=" + buildnumber : "/rest/resource/commons.production.js?buildnumber=" + buildnumber,
  isDevelopment ? "/rest/resource/vendors~build.development.js?buildnumber=" + buildnumber : "/rest/resource/vendors~build.production.js?buildnumber=" + buildnumber,
  isDevelopment ? "/rest/resource/polyfills.development.js?buildnumber=" + buildnumber : "/rest/resource/polyfills.production.js?buildnumber=" + buildnumber,
  isDevelopment ? "/rest/resource/build.development.css?buildnumber=" + buildnumber : "/rest/resource/build.production.css?buildnumber=" + buildnumber,
  isDevelopment ? "/rest/resource/vendors~build.development.css?buildnumber=" + buildnumber : "/rest/resource/vendors~build.production.css?buildnumber=" + buildnumber,
  isDevelopment ? "/rest/resource/cache-worker.development.js" : "/rest/resource/cache-worker.production.js",
  isDevelopment ? "/rest/resource/cache-worker.injector.development.js" : "/rest/resource/cache-worker.injector.production.js",
  config.fontUrl,
  ...config.cachedResources.map((r) => "/rest/resource/" + r),
  ...config.cachedExtUrls,
];
let CACHE_NAME = "ITEMIZEV" + buildnumber;

self.addEventListener("install", (event: any) => {
  console.log("SERVICE WORKER INSTALLING");
  (self as any).skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      }),
  );
});

self.addEventListener("fetch", (event: any) => {
  if (event.request.method !== "GET") {
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
    (
      urlAnalyzed.pathname.indexOf("/graphql") === 0 ||
      urlAnalyzed.pathname.indexOf("/sw") === 0 ||
      urlAnalyzed.pathname.indexOf("/sitemap.xml") === 0 ||
      urlAnalyzed.pathname.indexOf("/robots.txt") === 0 ||
      urlAnalyzed.pathname.indexOf("/favicon") === 0 ||
      urlAnalyzed.pathname.indexOf("/socket.io") === 0 ||
      event.request.headers.get("sw-cacheable") === "false"
    );

  // returning false in such case
  if (isInAtotallyUncachedPath) {
    return false;
  }

  // use network first, rather than going for the SW first
  // by not selecting rest we are going for all the paths that should
  // serve the index, but also we include currency factors here
  const useNetworkFirstStrategy =
    isOurHost &&
    (
      (
        // enabled if it is not rest
        urlAnalyzed.pathname.indexOf("/rest") !== 0 &&
        // enabled if it is not uploads
        urlAnalyzed.pathname.indexOf("/uploads") !== 0
      ) ||
      // or it is our special rest endpoint we enable
      urlAnalyzed.pathname.indexOf("/rest/currency-factors") === 0 ||
      // or we have the special header for network first
      event.request.headers.get("sw-network-first") === "true"
    );
  // this basically means that we would be serving the response for / for the index response
  // rather than whatever the request was pointing too, that means we ignore the request
  // note that this only has to do if the request fails
  const useNetworkFirstStrategyUseThisPathInstead =
    useNetworkFirstStrategy && urlAnalyzed.pathname.indexOf("/rest") !== 0 ? "/?noredirect=true" : null;

  const shouldBeCachedIfFound =
    (
      !isOurHost &&
      config.cacheableExtHostnames.includes(urlAnalyzed.hostname)
    ) ||
    urlAnalyzed.searchParams.get("sw-cacheable") === "true" ||
    event.request.headers.get("sw-cacheable") === "true" ||
    (isOurHost && urlAnalyzed.pathname.indexOf("/rest/resource") === 0) ||
    (isOurHost && urlAnalyzed.pathname.indexOf("/rest/currency-factors") === 0);

  const shouldBeRechecked = urlAnalyzed.searchParams.get("sw-recheck") === "true" || event.request.headers.get("sw-recheck") === "true";
  const acceptHeader = event.request.headers.get("Accept");
  const expectsImage = acceptHeader && acceptHeader.indexOf("image") === 0;
  const isBuildNumberCheck = urlAnalyzed.pathname.indexOf("/rest/buildnumber") === 0;
  const currentAppBuildNumber = isBuildNumberCheck ? urlAnalyzed.searchParams.get("current") : null;
  const currentSwBuildNumber = buildnumber;

  // otherwise we are going to try to find matches
  // yes even from /rest we try to find matches
  // some rest answers are meant to be cached such as
  // resources which are hard cached
  event.respondWith(
    (async () => {
      try {
        // we don't even try to get the cache if it's one of our index paths, we will try
        // network first
        const cachedResponse = useNetworkFirstStrategy ? null : await (await caches.open(CACHE_NAME)).match(event.request);
        // if we get a match in our cache
        if (cachedResponse) {
          // if it should be rechecked
          if (shouldBeRechecked) {
            // we basically run this fetch request, outside, notice
            // how we don't return into it
            fetch(event.request).then((recheckedNetworkResponse) => {
              // fetch it if we can, and if we get the right status code
              if (
                recheckedNetworkResponse.status === 200 ||
                recheckedNetworkResponse.status === 0
              ) {
                // then add to the cache
                return caches.open(CACHE_NAME).then((cache) => {
                  cache.put(event.request, recheckedNetworkResponse);
                });
              }
            }).catch(() => null);
          }
          console.log("Service worker cache hit for ", event.request.url);
          return cachedResponse;
        }

        const netWorkResponse = await fetch(event.request);
        if (isBuildNumberCheck && netWorkResponse.status === 200) {
          // we clone the response stream
          const clonedResponse = netWorkResponse.clone();
          // let's parse the result
          const serverProvidedBuildNumber = (await clonedResponse.text()).trim();
          // if build numbers do not match
          if (
            // the server build number does not match the app
            serverProvidedBuildNumber !== currentAppBuildNumber ||
            // the server build number doesn't match the service worker
            serverProvidedBuildNumber !== currentSwBuildNumber ||
            // the app build number doesn't match the service worker
            currentAppBuildNumber !== currentSwBuildNumber

            // in reality the app build number should always match the server provided
            // so it will be the second that hits, the only situation this will not occur
            // is if there was no network in which case we don't really have a 200 status
            // as our fetch will simply crash
          ) {
            console.log(
              "Service worker wiping itself due to buildnumber mismatch",
              serverProvidedBuildNumber,
              currentAppBuildNumber,
              currentSwBuildNumber,
            );
            await caches.delete(CACHE_NAME);

            // We will update the cache name in case anything else is added to it
            // and the user keeps using this and not updating the application as requested
            CACHE_NAME = "ITEMIZEV" + serverProvidedBuildNumber;

            // this is due to an error in the past, now that a request to the page uses the network
            // first strategy it will always receive an updated buildnumber and when the client requests
            // a buildnumber update it will always be up to date
            // now the service worker is different with each buildnumber
            // and it can know if it has cached things for an older cache as caches
            // are also used numerically, once the client knows the service worker
            // has changed it is able to reload
            return new Response(
              null,
              {
                status: 205,
                statusText: "Reset Content",
              },
            );
          }

          // now for the network first logic
        } else if (
          useNetworkFirstStrategy &&
          netWorkResponse.status !== 200
        ) {
          console.log("network not available, using cached for network first request");
          let requestToUse: Request = useNetworkFirstStrategyUseThisPathInstead ?
            new Request(useNetworkFirstStrategyUseThisPathInstead) : event.request;
          const cached = await (await caches.open(CACHE_NAME)).match(requestToUse);
          if (cached) {
            console.log("Service worker cache hit for network first request ", event.request.url);
            return cached;
          }

          // resources are static, but they are language specific
          // so we don't really precache those, for example, the
          // build.en.json files and build.es.json files as well
          // as all the moment files, the term and conditions and so
          // on
        } else if (
          shouldBeCachedIfFound &&
          (
            netWorkResponse.status === 200 ||
            netWorkResponse.status === 0
          )
        ) {
          console.log("caching request ", event.request.url);
          const networkResponseClone = netWorkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponseClone);
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
        if (
          useNetworkFirstStrategy
        ) {
          try {
            console.log("network not available, using cached for network first request");
            let requestToUse: Request = useNetworkFirstStrategyUseThisPathInstead ?
              new Request(useNetworkFirstStrategyUseThisPathInstead) : event.request;
            const cached = await caches.match(requestToUse);
            if (cached) {
              console.log("Service worker cache hit for network first request ", event.request.url);
              return cached;
            }
          } catch (err) {
            // Nothing happens
          }
        }
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
