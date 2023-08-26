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
let instance = supportsCacheWorker ? wrap<CacheWorker>(new Worker(url)) : null;
if (!instance) {
  // make a polyfilled version
  instance = new CacheWorker(true) as any;
}

// and wrap it into some information
const CacheWorkerInstance = {
  isSupported: !!supportsCacheWorker,
  isPolyfilled: !supportsCacheWorker,
  instance,
  getProxy: (obj: unknown) => {
    return proxy(obj);
  },
};

if (typeof window !== "undefined"){(window as any).CACHE_WORKER = CacheWorkerInstance};

if (CacheWorkerInstance.instance) {
  const STATE_LISTENERS: {[key: string]: Array<Function>} = {};

  const originalStoreState = CacheWorkerInstance.instance.storeState;
  const originalDeleteState = CacheWorkerInstance.instance.deleteState;

  CacheWorkerInstance.instance.storeState = (async (
    qualifiedName: string,
    id: string,
    version: string,
    value: any,
    overwriteLastModified: string,
  ) => {
    const rs = await originalStoreState.call(CacheWorkerInstance.instance, qualifiedName, id, version, value, overwriteLastModified);
    if (rs) {
      const listeners = STATE_LISTENERS[qualifiedName + "." + (id || "") + "." + (version || "")];
      listeners.forEach((l) => l(id, version, value, {overwriteLastModified: overwriteLastModified || null}));

      const idSpecificListeners = STATE_LISTENERS[qualifiedName + "." + (id || "")];
      idSpecificListeners.forEach((l) => l(id, version, value, {overwriteLastModified: overwriteLastModified || null}));
    }
    return rs;
  }) as any;

  CacheWorkerInstance.instance.deleteState = (async (
    qualifiedName: string,
    id: string,
    version: string,
  ) => {
    const rs = await originalDeleteState.call(CacheWorkerInstance.instance, qualifiedName, id, version);
    if (rs) {
      const listeners = STATE_LISTENERS[qualifiedName + "." + (id || "") + "." + (version || "")];
      listeners.forEach((l) => l(id, version, null, null));

      const idSpecificListeners = STATE_LISTENERS[qualifiedName + "." + (id || "")];
      idSpecificListeners.forEach((l) => l(id, version, null, null));
    }
    return rs;
  }) as any;

  CacheWorkerInstance.instance.addEventListenerToStateChange = ((
    qualifiedName: string,
    id: string,
    version: string,
    callback: (id: string, version: string, value: any, metadata: any) => void,
  ) => {
    const listenerLoc = qualifiedName + "." + (id || "") + "." + (version || "");
    if (!STATE_LISTENERS[listenerLoc]) {
      STATE_LISTENERS[listenerLoc] = [callback];
    } else {
      STATE_LISTENERS[listenerLoc].push(callback);
    }
  }) as any;

  CacheWorkerInstance.instance.removeEventListenerToStateChange = ((
    qualifiedName: string,
    id: string,
    version: string,
    callback: (id: string, version: string, value: any, metadata: any) => void,
  ) => {
    const listenerLoc = qualifiedName + "." + (id || "") + "." + (version || "");
    if (STATE_LISTENERS[listenerLoc]) {
      const index = STATE_LISTENERS[listenerLoc].indexOf(callback);
      if (index !== -1) {
        STATE_LISTENERS[listenerLoc].splice(index, 1);
      } 
    }
  }) as any;

  CacheWorkerInstance.instance.addUnversionedEventListenerToStateChange = ((
    qualifiedName: string,
    id: string,
    callback: (id: string, version: string, value: any, metadata: any) => void,
  ) => {
    const listenerLoc = qualifiedName + "." + (id || "");
    if (!STATE_LISTENERS[listenerLoc]) {
      STATE_LISTENERS[listenerLoc] = [callback];
    } else {
      STATE_LISTENERS[listenerLoc].push(callback);
    }
  }) as any;

  CacheWorkerInstance.instance.removeUnversionedEventListenerToStateChange = ((
    qualifiedName: string,
    id: string,
    callback: (id: string, version: string, value: any, metadata: any) => void,
  ) => {
    const listenerLoc = qualifiedName + "." + (id || "");
    if (STATE_LISTENERS[listenerLoc]) {
      const index = STATE_LISTENERS[listenerLoc].indexOf(callback);
      if (index !== -1) {
        STATE_LISTENERS[listenerLoc].splice(index, 1);
      } 
    }
  }) as any;
};

// return it
export default CacheWorkerInstance;
