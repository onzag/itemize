/**
 * This is the cache worker injection file that will inject the cache worker
 * if it's possible, it also allows for importing it from anywhere in the app
 * the cache worker can be accessed easily as such
 * @module
 */

import { wrap, proxy } from "comlink";
import CacheWorker from "./cache.worker.class";

// we need to know in which environemnt we are in order to load
// the right version
const isDevelopment = process.env.NODE_ENV === "development";
let url: string;
if (isDevelopment) {
  url = "/rest/resource/cache-worker.injector.development.js";
} else {
  url = "/rest/resource/cache-worker.injector.production.js";
}

const CACHE_WORKER_FORCE_POLYFILL = typeof localStorage !== "undefined" && localStorage.getItem("CACHE_WORKER_FORCE_POLYFILL") === "true";
const CACHE_WORKER_FORCE_STORAGE_FULL = typeof localStorage !== "undefined" && localStorage.getItem("CACHE_WORKER_FORCE_STORAGE_FULL") === "true";
const CACHE_WORKER_FORCE_BAD_READS = typeof localStorage !== "undefined" && localStorage.getItem("CACHE_WORKER_FORCE_BAD_READS") === "true";
const CACHE_WORKER_FORCE_BAD_WRITES = typeof localStorage !== "undefined" && localStorage.getItem("CACHE_WORKER_FORCE_BAD_WRITES") === "true";

// now we check for indexed db support as it's necessary
// for the cache to function, there's no point in loading the browser
// if the cache is going to misbehave
const supportsCacheWorker = CACHE_WORKER_FORCE_POLYFILL ? false : (
  typeof window !== "undefined" && window.Worker && (
    window.indexedDB ||
    (window as any).mozIndexedDB ||
    (window as any).webkitIndexedDB ||
    (window as any).msIndexedDB
  )
);

// we build the instance
let instance = supportsCacheWorker ? wrap<CacheWorker>(new Worker(url)) : null;
if (instance && CACHE_WORKER_FORCE_STORAGE_FULL) {
  instance.forceStorageFull();
}
if (instance && CACHE_WORKER_FORCE_BAD_READS) {
  instance.forceBadReads();
}
if (instance && CACHE_WORKER_FORCE_BAD_WRITES) {
  instance.forceBadWrites();
}
if (!instance) {
  // make a polyfilled version
  instance = new CacheWorker(true) as any;
}

// double wrap despite of all
// in order to have the main thread functions
// available
instance = new CacheWorker(true, instance as any) as any;

// and wrap it into some information
const CacheWorkerInstance = {
  isSupportedAsWorker: !!supportsCacheWorker,
  isPolyfilled: !supportsCacheWorker,
  instance,
  getProxy: (obj: unknown) => {
    return proxy(obj);
  },
};

if (typeof window !== "undefined") { (window as any).CACHE_WORKER = CacheWorkerInstance };

// return it
export default CacheWorkerInstance;
