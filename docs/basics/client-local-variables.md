# Client local variables

These variables are set in local storage or in cookies in order to be able to 

## DISABLE_SERVICE_WORKER

(local storage)

if set to "true" it will disable the service worker

## devkey

(cookie)

use via the window function SET_DEV_MODE(mode, key) in order to set the mode, either "development" or "production" and is used to load a development build in a production environment in order to debug, you need a valid devkey nevertheless in order for it to function

this is a dangerous update and you should clear everything in your app other than that cookie, it will also destroy any SSR as SSR only works in whatever mode the server is.

## CACHE_WORKER_FORCE_POLYFILL

Forces the cache worker to act as if service workers were not possible in the web browser

## CACHE_WORKER_FORCE_STORAGE_FULL

Forces the cache worker to act as if the storage was full or otherwise writes couldn't be done

## CACHE_WORKER_FORCE_BAD_READS

Forces the cache worker to act as if the hard drive was damaged and there was no way to read information from it

## CACHE_WORKER_FORCE_BAD_WRITES

Forces the cache worker to act as if the hard drive was damaged and it was set in readonly mode