var base = location.protocol + "//" + location.host;

window = self;

self.importScripts(base + "/rest/resource/commons.production.js");
self.importScripts(base + "/rest/resource/cache-worker.production.js");