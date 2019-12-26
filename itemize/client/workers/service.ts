if ("serviceWorker" in navigator) {
  const isDevelopment = process.env.NODE_ENV === "development";
  let url: string;
  if (isDevelopment) {
    url = "/rest/resource/service-worker.development.js";
  } else {
    url = "/rest/resource/service-worker.production.js";
  }
  navigator.serviceWorker.register(url);
}
