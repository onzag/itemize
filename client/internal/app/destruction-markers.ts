import { MEMCACHED_DESTRUCTION_MARKERS_LOCATION, DESTRUCTION_MARKERS_LOCATION, PREFIX_GET, SEARCH_DESTRUCTION_MARKERS_LOCATION, MEMCACHED_SEARCH_DESTRUCTION_MARKERS_LOCATION, PREFIX_SEARCH, MEMCACHED_UNMOUNT_DESTRUCTION_MARKERS_LOCATION, UNMOUNT_DESTRUCTION_MARKERS_LOCATION, MEMCACHED_UNMOUNT_SEARCH_DESTRUCTION_MARKERS_LOCATION, UNMOUNT_SEARCH_DESTRUCTION_MARKERS_LOCATION } from "../../../constants";
import CacheWorkerInstance from "../workers/cache";

export async function destroyDestructionMarkers(unmount?: boolean, intialization?: boolean) {
  const locReal = unmount ? UNMOUNT_DESTRUCTION_MARKERS_LOCATION : DESTRUCTION_MARKERS_LOCATION;
  const locMemcached = unmount ? MEMCACHED_UNMOUNT_DESTRUCTION_MARKERS_LOCATION : MEMCACHED_DESTRUCTION_MARKERS_LOCATION;

  // gathering the destruction markers
  const destructionMarkers =
    // if we have memcached them, pick those
    (window as any)[locMemcached] ||
    // otherwise get them from local storage
    JSON.parse(localStorage.getItem(locReal) || "{}");

  let failed = false;

  // now we loop over the destruction markers
  await Promise.all(Object.keys(destructionMarkers).map((qualifiedPathName: string) => {
    return Promise.all(destructionMarkers[qualifiedPathName].map(async (marker: [string, string]) => {
      // and delete everything within it
      const status = await CacheWorkerInstance.instance.deleteCachedValue(
        PREFIX_GET + qualifiedPathName,
        marker[0],
        marker[1],
      );

      if (status) {
        const currentIndex = destructionMarkers[qualifiedPathName].findIndex((m: any) => m === marker);
        if (currentIndex !== -1) {
          // remove marker
          destructionMarkers[qualifiedPathName].splice(currentIndex, 1);
        }
        if (destructionMarkers[qualifiedPathName].length === 0) {
          delete destructionMarkers[qualifiedPathName];
        }
      } else {
        failed = true;
        console.warn(
          "Failed to remove destruction marker for " + qualifiedPathName + " with id " + marker[0] + " and version " + marker[1],
        );
      }
    }));
  }));

  // clean them from the memory cache to match local storage
  (window as any)[locMemcached] = destructionMarkers;
  // as we delete from local storage as well
  localStorage.setItem(locReal, JSON.stringify(destructionMarkers));

  return !failed;
}

export async function destroySearchDestructionMarkers(unmount?: boolean, intialization?: boolean) {
  const locSearchReal = unmount ? UNMOUNT_SEARCH_DESTRUCTION_MARKERS_LOCATION : SEARCH_DESTRUCTION_MARKERS_LOCATION;
  const locSearchMemcached = unmount ? MEMCACHED_UNMOUNT_SEARCH_DESTRUCTION_MARKERS_LOCATION : MEMCACHED_SEARCH_DESTRUCTION_MARKERS_LOCATION;

  // gathering the search destruction markers
  const searchDestructionMarkers =
    // if we have memcached them, pick those
    (window as any)[locSearchMemcached] ||
    // otherwise get them from local storage
    JSON.parse(localStorage.getItem(locSearchReal) || "{}");

  let failed = false;

  // now we loop over the destruction markers
  await Promise.all(Object.keys(searchDestructionMarkers).map((qualifiedPathName: string) => {
    return Promise.all(searchDestructionMarkers[qualifiedPathName].map(async (marker: [string, string, [string, string, string], [string, string]]) => {
      // and delete everything within it
      // the first value of the marker is the type of caching that was used
      // the second is the owner
      // the thrid is the parent
      // the fourth is the tracked property
      const status = await CacheWorkerInstance.instance.deleteCachedSearch(
        PREFIX_SEARCH + qualifiedPathName,
        marker[0] as any,
        marker[1],
        marker[2],
        marker[3],
      );

      if (status) {
        const currentIndex = searchDestructionMarkers[qualifiedPathName].findIndex((m: any) => m === marker);
        if (currentIndex !== -1) {
          // remove marker
          searchDestructionMarkers[qualifiedPathName].splice(currentIndex, 1);
        }
        if (searchDestructionMarkers[qualifiedPathName].length === 0) {
          delete searchDestructionMarkers[qualifiedPathName];
        }
      } else {
        failed = true;
        console.warn(
          "Failed to remove search destruction marker for " + qualifiedPathName,
          marker,
        );
      }
    }));
  }));

  // clean them from the memory cache to match local storage
  (window as any)[locSearchMemcached] = searchDestructionMarkers;
  // as we delete from local storage as well
  localStorage.setItem(locSearchReal, JSON.stringify(searchDestructionMarkers));

  return !failed;
}