/**
 * This is the cache worker injection file that will inject the cache worker
 * if it's possible, it also allows for importing it from anywhere in the app
 * the cache worker can be accessed easily as such
 * @packageDocumentation
 */
import CacheWorker from "./cache.worker";
declare const CacheWorkerInstance: {
    isSupported: any;
    instance: import("comlink").Remote<CacheWorker>;
};
export default CacheWorkerInstance;
