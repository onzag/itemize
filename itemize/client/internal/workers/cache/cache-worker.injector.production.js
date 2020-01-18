var base = location.protocol + "//" + location.host + location.pathname.split("/").slice(0, -1).join("/");

self.importScripts(base + "/rest/resource/commons.production.js");
self.importScripts(base + "/rest/resource/cache-worker.production.js");