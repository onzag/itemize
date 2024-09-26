/**
 * Service worker file that injects the service worker
 * into the current application if possible
 * @module
 */

let CONTROLLER_CHANGED = false;
let CONTROLLER_CHANGE_FN: () => void = null;

/**
 * @ignore
 * used internally for calling a function once the controller changes
 * @param fn 
 */
export function onControllerChangeCall(fn: () => void) {
  if (CONTROLLER_CHANGED) {
    fn();
  } else {
    CONTROLLER_CHANGE_FN = fn;
  }
} 

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
    navigator.serviceWorker.oncontrollerchange = ((self: any, ev: any) => {
      CONTROLLER_CHANGED = true;
      CONTROLLER_CHANGE_FN && CONTROLLER_CHANGE_FN();
    }) as any;
  }
}
