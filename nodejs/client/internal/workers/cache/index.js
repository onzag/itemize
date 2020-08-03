"use strict";
/**
 * This is the cache worker injection file that will inject the cache worker
 * if it's possible, it also allows for importing it from anywhere in the app
 * the cache worker can be accessed easily as such
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const comlink_1 = require("comlink");
// we need to know in which environemnt we are in order to load
// the right version
const isDevelopment = process.env.NODE_ENV === "development";
let url;
if (isDevelopment) {
    url = "/rest/resource/cache-worker.injector.development.js";
}
else {
    url = "/rest/resource/cache-worker.injector.production.js";
}
// now we check for indexed db support as it's necessary
// for the cache to function, there's no point in loading the browser
// if the cache is going to misbehave
const supportsCacheWorker = typeof window !== "undefined" && window.Worker && (window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB);
// we build the instance
const instance = supportsCacheWorker ? comlink_1.wrap(new Worker(url)) : null;
// and wrap it into some information
const CacheWorkerInstance = {
    isSupported: supportsCacheWorker,
    instance,
};
// return it
exports.default = CacheWorkerInstance;
