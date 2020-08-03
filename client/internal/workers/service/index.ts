/**
 * Service worker file that injects the service worker
 * into the current application if possible
 * @packageDocumentation
 */

if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
  const isDevelopment = process.env.NODE_ENV === "development";
  let url: string;
  if (isDevelopment) {
    url = "/sw.development.js";
  } else {
    url = "/sw.production.js";
  }
  navigator.serviceWorker.register(url);
}
