import CacheWorker from "./cache.worker";
declare const CacheWorkerInstance: {
    isSupported: any;
    instance: import("comlink").Remote<CacheWorker>;
};
export default CacheWorkerInstance;
