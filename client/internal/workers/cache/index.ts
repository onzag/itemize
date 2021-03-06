/**
 * This is the cache worker injection file that will inject the cache worker
 * if it's possible, it also allows for importing it from anywhere in the app
 * the cache worker can be accessed easily as such
 * @module
 */

import { wrap } from "comlink";
import CacheWorker from "./cache.worker";

// we need to know in which environemnt we are in order to load
// the right version
const isDevelopment = process.env.NODE_ENV === "development";
let url: string;
if (isDevelopment) {
  url = "/rest/resource/cache-worker.injector.development.js";
} else {
  url = "/rest/resource/cache-worker.injector.production.js";
}

// now we check for indexed db support as it's necessary
// for the cache to function, there's no point in loading the browser
// if the cache is going to misbehave
const supportsCacheWorker = typeof window !== "undefined" && window.Worker && (
  window.indexedDB ||
  (window as any).mozIndexedDB ||
  (window as any).webkitIndexedDB ||
  (window as any).msIndexedDB
);

// we build the instance
const instance = supportsCacheWorker ? wrap<CacheWorker>(new Worker(url)) : null;

// and wrap it into some information
const CacheWorkerInstance = {
  isSupported: supportsCacheWorker,
  instance,
};

// return it
export default CacheWorkerInstance;
