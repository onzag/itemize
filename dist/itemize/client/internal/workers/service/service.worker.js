"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// We don't import corejs in our service worker as we do not really use
// any of that overall, we only need the regenerator runtime
require("regenerator-runtime/runtime");
const isDevelopment = process.env.NODE_ENV === "development";
const urlsToCache = [
    "/",
    "/rest/resource/lang.json",
    "/rest/resource/image-fail.svg",
    isDevelopment ? "/rest/resource/build.development.js" : "/rest/resource/build.production.js",
    isDevelopment ? "/rest/resource/commons.development.js" : "/rest/resource/commons.production.js",
    isDevelopment ? "/rest/resource/vendors~build.development.js" : "/rest/resource/vendors~build.production.js",
    isDevelopment ? "/rest/resource/build.development.css" : "/rest/resource/build.production.css",
    isDevelopment ? "/rest/resource/cache-worker.development.js" : "/rest/resource/cache-worker.production.js",
    isDevelopment ? "/rest/resource/vendors~cache-worker.development.js" : "/rest/resource/vendors~cache-worker.production.js",
    isDevelopment ? "/rest/resource/cache-worker.injector.development.js" : "/rest/resource/cache-worker.injector.production.js",
];
// the reason is that app always loads the
// production css no matter what, but it's then
// replaced if it's in development mode, production
// it's thought first so this would mess up the development
// environment so we add the production file nonetheless
if (isDevelopment) {
    urlsToCache.push("/rest/resource/build.production.css");
}
const CACHE_NAME = "ITEMIZEV1";
self.addEventListener("install", (event) => {
    console.log("SERVICE WORKER INSTALLING");
    event.waitUntil(caches.open(CACHE_NAME)
        .then((cache) => {
        return cache.addAll(urlsToCache);
    }));
});
self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") {
        return false;
    }
    const urlAnalyzed = new URL(event.request.url);
    const isOurHost = urlAnalyzed.hostname === self.location.hostname;
    if (urlAnalyzed.protocol !== "http:" &&
        urlAnalyzed.protocol !== "https:") {
        return false;
    }
    // these paths aren't managed by us, we just let them fail
    // and go through the network always
    const isInAtotallyUncachedPath = isOurHost &&
        urlAnalyzed.pathname.indexOf("/graphql") === 0 ||
        urlAnalyzed.pathname.indexOf("/sw") === 0 ||
        urlAnalyzed.pathname.indexOf("/socket.io") === 0;
    // returning false in such case
    if (isInAtotallyUncachedPath) {
        return false;
    }
    const shouldServeIndex = isOurHost &&
        urlAnalyzed.pathname.indexOf("/rest") !== 0 &&
        urlAnalyzed.pathname.indexOf("/uploads") !== 0;
    const actualEventRequest = shouldServeIndex ?
        new Request("/") : event.request;
    // TODO change the functionality of the main request to use cache slots
    // 1. make a message that says that the application is outdated and needs to reload
    // for that add an endpoint at /rest/buildnumber that provides the build number
    // at runtime, if the build number does not match and there is internet, cancel
    // everything and show a message the user needs to reload the app, basically add
    // an outdated flag
    // 2. send that old id to the service worker for the service worker to delete
    // the cache, somehow, maybe over here as the buildnumber will be send over here
    // so the service worker should be aware in order to remove the older buildnumbers
    // 3. delete the indexed db cache as well
    const shouldBeCachedIfNotFound = !isOurHost ||
        urlAnalyzed.pathname.indexOf("/rest/resource") === 0 ||
        actualEventRequest.headers.get("sw-cacheable") ||
        // in rare cases where index would have failed to cache
        shouldServeIndex;
    const shouldBeRechecked = !isOurHost;
    const acceptHeader = actualEventRequest.headers.get("Accept");
    const expectsImage = acceptHeader && acceptHeader.indexOf("image") === 0;
    const isBuildNumberCheck = urlAnalyzed.pathname.indexOf("/rest/buildnumber") === 0;
    const currentBuildNumber = isBuildNumberCheck ? urlAnalyzed.searchParams.get("current") : null;
    // otherwise we are going to try to find matches
    // yes even from /rest we try to find matches
    // some rest answers are meant to be cached such as
    // resources which are hard cached
    event.respondWith((async () => {
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
                        if (recheckedNetworkResponse.status === 200 ||
                            recheckedNetworkResponse.status === 0) {
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
            if (isBuildNumberCheck && netWorkResponse.status === 200) {
                // we clone the response stream
                const clonedResponse = netWorkResponse.clone();
                // let's parse the result
                const serverProvidedBuildNumber = await clonedResponse.text();
                // if build numbers do not match
                if (serverProvidedBuildNumber !== currentBuildNumber) {
                    console.log("Service worker wiping cache due to buildnumber mismatch", serverProvidedBuildNumber, currentBuildNumber);
                    await caches.delete(CACHE_NAME);
                    const recreatedCache = await caches.open(CACHE_NAME);
                    // we do not wait, if this fails that rare case
                    // where index fails to cache will save us
                    await recreatedCache.addAll(urlsToCache);
                }
                // resources are static, but they are language specific
                // so we don't really precache those, for example, the
                // build.en.json files and build.es.json files as well
                // as all the moment files, the term and conditions and so
                // on
            }
            else if (shouldBeCachedIfNotFound &&
                (netWorkResponse.status === 200 ||
                    netWorkResponse.status === 0)) {
                console.log("caching request ", actualEventRequest.url);
                const networkResponseClone = netWorkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(actualEventRequest, networkResponseClone);
                }).catch((err) => {
                    console.warn("could not catch", err);
                });
            }
            else if (expectsImage &&
                netWorkResponse.status === 404) {
                throw new Error("Invalid image not found");
            }
            return netWorkResponse;
        }
        catch (err) {
            if (expectsImage) {
                try {
                    const imageCachedResponse = await caches.match("/rest/resource/image-fail.svg");
                    return imageCachedResponse;
                }
                catch (err) {
                    // Nothing happens
                }
            }
            return new Response(null, {
                status: 503,
                statusText: "Service Unavailable",
            });
        }
    })());
});
