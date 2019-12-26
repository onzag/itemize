import { wrap } from "comlink";
import CacheWorker from "../workers/cache.worker";

const isDevelopment = process.env.NODE_ENV === "development";
let url: string;
if (isDevelopment) {
  url = `/rest/resource/cache-worker.development.js?version=${(window as any).BUILD_NUMBER}`;
} else {
  url = `/rest/resource/cache-worker.production.js?version=${(window as any).BUILD_NUMBER}`;
}
const supportsCacheWorker = window.Worker && (
  window.indexedDB ||
  (window as any).mozIndexedDB ||
  (window as any).webkitIndexedDB ||
  (window as any).msIndexedDB
);
const instance = supportsCacheWorker ? wrap<CacheWorker>(new Worker(url)) : null;

const CacheWorkerInstance = {
  isSupported: supportsCacheWorker,
  instance,
};

export default CacheWorkerInstance;
