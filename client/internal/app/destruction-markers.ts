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

  // now we loop over the destruction markers
  const statuses: boolean[][] = await Promise.all(Object.keys(destructionMarkers).map((qualifiedPathName: string) => {
    return Promise.all(destructionMarkers[qualifiedPathName].map((marker: [string, string]) => {
      // and delete everything within it
      return CacheWorkerInstance.instance.deleteCachedValue(
        PREFIX_GET + qualifiedPathName,
        marker[0],
        marker[1],
      );
    }));
  }));

  const statusesFlat: boolean[] = statuses.flat();
  const failed: boolean = statusesFlat.some((s) => !s);

  if (!failed) {
    // clean them from the memory cache to match local storage
    (window as any)[locMemcached] = {};
    // as we delete from local storage as well
    localStorage.removeItem(locReal);
  }

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

  // now we loop over the destruction markers
  const searchStatuses: boolean[][] = await Promise.all(Object.keys(searchDestructionMarkers).map((qualifiedPathName: string) => {
    return Promise.all(searchDestructionMarkers[qualifiedPathName].map((marker: [string, string, [string, string, string], [string, string]]) => {
      // and delete everything within it
      // the first value of the marker is the type of caching that was used
      // the second is the owner
      // the thrid is the parent
      // the fourth is the tracked property
      return CacheWorkerInstance.instance.deleteCachedSearch(
        PREFIX_SEARCH + qualifiedPathName,
        marker[0] as any,
        marker[1],
        marker[2],
        marker[3],
      );
    }));
  }));

  const searchStatusesFlat: boolean[] = searchStatuses.flat();
  const searchFailed: boolean = searchStatusesFlat.some((s) => !s);

  if (!searchFailed) {
    // clean them from the memory cache to match local storage
    (window as any)[locSearchMemcached] = {};
    // as we delete from local storage as well
    localStorage.removeItem(locSearchReal);
  }

  return !searchFailed;
}