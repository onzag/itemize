/**
 * Service worker file that injects the service worker
 * into the current application if possible
 * @module
 */

if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
  const isDevelopment = process.env.NODE_ENV === "development";
  const isBruteForceDisabled = localStorage.getItem("DISABLE_SERVICE_WORKER") === "true";
  let url: string;
  if (isDevelopment) {
    url = "/sw.development.js";
  } else {
    url = "/sw.production.js";
  }
  if (!isBruteForceDisabled) {
    navigator.serviceWorker.register(url);
  }
}
