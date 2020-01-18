var base = location.protocol + "//" + location.host + location.pathname.split("/").slice(0, -1).join("/");

self.importScripts(base + "/rest/resource/commons.development.js");
self.importScripts(base + "/rest/resource/service.development.js");