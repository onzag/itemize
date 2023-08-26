import "core-js/stable";
import "regenerator-runtime/runtime";
import CacheWorker from "./cache.worker.class";

import { expose } from "comlink";

// console.log("CACHE WORKER EXPOSING");

// expose using comlink
expose(new CacheWorker(false));
