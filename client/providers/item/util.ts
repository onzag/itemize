import CacheWorkerInstance from "../../../client/internal/workers/cache";
import { IActionResponseWithSearchResults, IActionSearchOptions, IActualItemProviderState, IActualItemProviderProps, IPokeElementsType, PolicyPathType, IActionCleanOptions, IActionSubmitResponse, IActionResponseWithValue, ISearchItemValueContextType, IBasicFns } from ".";
import { IHookItemProviderState, IItemProviderOptions } from "./hook";
import ItemDefinition, { IItemSearchStateType } from "../../../base/Root/Module/ItemDefinition";
import { DESTRUCTION_MARKERS_LOCATION, ENDPOINT_ERRORS, MEMCACHED_DESTRUCTION_MARKERS_LOCATION, MEMCACHED_SEARCH_DESTRUCTION_MARKERS_LOCATION, MEMCACHED_UNMOUNT_DESTRUCTION_MARKERS_LOCATION, MEMCACHED_UNMOUNT_SEARCH_DESTRUCTION_MARKERS_LOCATION, PREFIX_GET, SEARCH_DESTRUCTION_MARKERS_LOCATION, UNMOUNT_DESTRUCTION_MARKERS_LOCATION, UNMOUNT_SEARCH_DESTRUCTION_MARKERS_LOCATION, UNSPECIFIED_OWNER } from "../../../constants";
import uuid from "uuid";
import equals from "deep-equal";
import { PropertyDefinitionSearchInterfacesPrefixes } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces";
import { PropertyDefinitionSupportedType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import { IPropertySetterProps, IPropertyCoreProps } from "../../../client/components/property/base";
import PropertyDefinition, { IPropertyDefinitionState } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { Location } from "history";
import {
  getFieldsAndArgs, runGetQueryFor, runDeleteQueryFor, runEditQueryFor, runAddQueryFor, runSearchQueryFor, IIncludeOverride,
  IPropertyOverride, ICacheMetadataMismatchAction, ISearchCacheMetadataMismatchAction, reprocessQueryArgumentsForFiles, getPropertyListForSearchMode, SearchCacheMetadataMismatchActionFn, getPropertyListDefault
} from "../../internal/rq-client-util";
import { IRemoteListenerRecordsCallbackArg, RemoteListener } from "../../../client/internal/app/remote-listener";
import { EndpointErrorType } from "../../../base/errors";
import { setHistoryState } from "../../../client/components/navigation";
import { requestFieldsAreContained } from "../../../rq-util";
import { ICacheMetadataMatchType } from "../../../client/internal/workers/cache/cache.worker.class";

const isDevelopment = process.env.NODE_ENV === "development";

export function getPropertyForSetter(setter: IPropertySetterProps<PropertyDefinitionSupportedType>, itemDefinition: ItemDefinition) {
  let actualId: string = setter.id;
  if (setter.searchVariant) {
    actualId = PropertyDefinitionSearchInterfacesPrefixes[setter.searchVariant.toUpperCase().replace("-", "_")] + setter.id;
  }
  if (setter.policyName && setter.policyType) {
    return itemDefinition.getPropertyDefinitionForPolicy(setter.policyType, setter.policyName, actualId);
  }
  return itemDefinition.getPropertyDefinitionFor(actualId, true);
}

export function resolveCoreProp(value: string | IPropertyCoreProps) {
  if (typeof value === "string") {
    return value;
  } else if (value.searchVariant) {
    return PropertyDefinitionSearchInterfacesPrefixes[value.searchVariant.toUpperCase().replace("-", "_")] + value.id;
  }

  return value.id;
}

export function isSearchUnequal(searchA: IActionSearchOptions, searchB: IActionSearchOptions) {
  let searchANoFn = searchA;
  let searchBNoFn = searchB;
  if (
    searchA &&
    searchA.cacheMetadataMismatchAction
  ) {
    if (typeof searchA.cacheMetadataMismatchAction === "function") {
      searchANoFn = { ...searchA, cacheMetadataMismatchAction: null as any };
    } else {
      searchANoFn = {
        ...searchA,
        cacheMetadataMismatchAction: {
          ...searchA.cacheMetadataMismatchAction,
          recordsRefetchCondition: {
            ...searchA.cacheMetadataMismatchAction.recordsRefetchCondition,
            custom: null as any,
          }
        }
      }
    }
  }

  if (
    searchB &&
    searchB.cacheMetadataMismatchAction
  ) {
    if (typeof searchB.cacheMetadataMismatchAction === "function") {
      searchBNoFn = { ...searchB, cacheMetadataMismatchAction: null as any };
    } else {
      searchBNoFn = {
        ...searchB,
        cacheMetadataMismatchAction: {
          ...searchB.cacheMetadataMismatchAction,
          recordsRefetchCondition: {
            ...searchB.cacheMetadataMismatchAction.recordsRefetchCondition,
            custom: null as any,
          }
        }
      }
    }
  }

  return !equals(searchANoFn, searchBNoFn, { strict: true });
}

export function setupInitialState(
  idef: ItemDefinition,
  propsOrOptions: IItemProviderOptions | IActualItemProviderProps,
  isProps: boolean,
) {
  // the value might already be available in memory, this is either because it was loaded
  // by another instance or because of SSR during the initial render
  const memoryLoaded = !!(propsOrOptions.forId && idef.hasAppliedValueTo(
    propsOrOptions.forId || null, propsOrOptions.forVersion || null,
  ));
  let memoryLoadedAndValid = false;
  // by default we don't know
  let isNotFound = false;
  let isBlocked = false;
  let isBlockedButDataIsAccessible = false;
  if (memoryLoaded) {
    const appliedRQValue = idef.getRQAppliedValue(
      propsOrOptions.forId || null, propsOrOptions.forVersion || null,
    );
    // this is the same as for loadValue we are tyring to predict
    const { requestFields } = getFieldsAndArgs({
      includeArgs: false,
      includeFields: true,
      uniteFieldsWithAppliedValue: true,
      includes: propsOrOptions.includes || {},
      properties: getPropertyListDefault(propsOrOptions.properties),
      itemDefinitionInstance: idef,
      forId: propsOrOptions.forId || null,
      forVersion: propsOrOptions.forVersion || null,
    });
    // this will work even for null values, and null requestFields
    memoryLoadedAndValid = (
      appliedRQValue &&
      requestFieldsAreContained(requestFields, appliedRQValue.requestFields)
    );
    isNotFound = memoryLoadedAndValid && appliedRQValue.rawValue === null;
    isBlocked = !isNotFound && !!appliedRQValue.rawValue.blocked_at;
    isBlockedButDataIsAccessible = isBlocked && !!appliedRQValue.rawValue.DATA;
  }

  let searchWasRestored: "NO" | "FROM_STATE" | "FROM_LOCATION" = "NO";
  let searchState: IItemSearchStateType = {
    searchError: null,
    searching: false,
    searchResults: null,
    searchRecords: null,
    searchLimit: null,
    searchOffset: null,
    searchCount: null,
    searchId: null,
    searchOwner: null,
    searchLastModified: null,
    searchParent: null,
    searchCacheUsesProperty: null,
    searchShouldCache: false,
    searchFields: null,
    searchRequestedIncludes: {},
    searchRequestedProperties: [],
    searchEngineEnabled: false,
    searchEngineEnabledLang: null,
    searchEngineUsedFullHighlights: null,
    searchEngineHighlightArgs: null,
    searchHighlights: {},
    searchMetadata: null,
    searchCachePolicy: "none",
    searchListenPolicy: "none",
    searchOriginalOptions: null,
    searchListenSlowPolling: false,
  };
  const searchStateComplex = idef.getSearchState(
    propsOrOptions.forId || null, propsOrOptions.forVersion || null,
  );
  if (searchStateComplex) {
    searchState = searchStateComplex.searchState;

    const state = searchStateComplex.state;
    idef.applyState(
      propsOrOptions.forId || null,
      propsOrOptions.forVersion || null,
      state,
    );

    searchWasRestored = "FROM_STATE";
  }

  // so the initial setup
  const value = {
    // same we get the initial state, without checking it externally and passing
    // all the optimization flags
    itemState: !isProps ? null : getItemState(idef, propsOrOptions),
    // and we pass all this state
    isBlocked,
    isBlockedButDataIsAccessible,
    notFound: isNotFound,
    loadError: null,
    // loading will be true if we are setting up with an id
    // as after mount it will attempt to load such id, in order
    // to avoid pointless refresh we set it up as true from
    // the beggining
    loading: memoryLoadedAndValid ? false : (propsOrOptions.avoidLoading ? false : !!propsOrOptions.forId),
    // loaded will be whether is loaded or not only if there is an id
    // otherwise it's technically loaded
    loaded: propsOrOptions.forId ? memoryLoadedAndValid : true,

    submitError: null,
    submitting: false,
    submitted: false,

    deleteError: null,
    deleting: false,
    deleted: false,

    ...searchState,
    searchWasRestored,

    pokedElements: {
      properties: [],
      includes: {},
      policies: [],
    },
  };
  if (!isProps) {
    delete value.itemState;
  }
  return value;
};

export function blockCleanup(blockIdClean: { current: string }, idef: ItemDefinition, options: IItemProviderOptions | IActualItemProviderProps) {
  if (options.forId) {
    if (!blockIdClean.current) {
      blockIdClean.current = uuid.v4();
    }
    idef.addBlockCleanFor(options.forId || null, options.forVersion || null, blockIdClean.current);
  }
};

export function releaseCleanupBlock(blockIdClean: { current: string }, idef: ItemDefinition, options: IItemProviderOptions | IActualItemProviderProps) {
  if (options.forId) {
    if (!blockIdClean.current) {
      blockIdClean.current = uuid.v4();
    }
    idef.removeBlockCleanFor(options.forId || null, options.forVersion || null, blockIdClean.current);
  }
};

export async function markForDestruction(idef: ItemDefinition, unmount: boolean, unmark: boolean, options: IItemProviderOptions | IActualItemProviderProps) {
  if (typeof document === "undefined") {
    return;
  }
  if (options.forId) {
    if (CacheWorkerInstance.instance) {
      await CacheWorkerInstance.instance.waitForInitializationBlock();
    }

    const qualifiedName = idef.getQualifiedPathName();
    const forId = options.forId;
    const forVersion = options.forVersion || null;

    const locationMemcached = unmount ? MEMCACHED_UNMOUNT_DESTRUCTION_MARKERS_LOCATION : MEMCACHED_DESTRUCTION_MARKERS_LOCATION;
    const locationReal = unmount ? UNMOUNT_DESTRUCTION_MARKERS_LOCATION : DESTRUCTION_MARKERS_LOCATION;

    // the destruction marker simply follows the criteria [id, version] identified by its qualifiedName
    (window as any)[locationMemcached] =
      (window as any)[locationMemcached] ||
      JSON.parse(localStorage.getItem(locationReal) || "{}");
    let changed = false;

    if (unmark) {
      if (!(window as any)[locationMemcached][qualifiedName]) {
        // already unmarked
      } else {
        const indexFound = (window as any)[locationMemcached][qualifiedName]
          .findIndex((m: [string, string]) => m[0] === forId && m[1] === forVersion);
        // found at index
        if (indexFound !== -1) {
          changed = true;
          (window as any)[locationMemcached][qualifiedName].splice(indexFound, 1);
        }
      }
    } else {
      if (!(window as any)[locationMemcached][qualifiedName]) {
        (window as any)[locationMemcached][qualifiedName] = [[forId, forVersion]];
        changed = true;
      } else {
        if (!(window as any)[locationMemcached][qualifiedName]
          .find((m: [string, string]) => m[0] === forId && m[1] === forVersion)) {
          changed = true;
          (window as any)[locationMemcached][qualifiedName].push([forId, forVersion]);
        }
      }
    }

    if (changed) {
      localStorage.setItem(locationReal, JSON.stringify((window as any)[locationMemcached]));
    }
  }
}

export async function markSearchForDestruction(
  type: "by-parent" | "by-owner" | "by-owner-and-parent" | "by-property",
  qualifiedName: string,
  owner: string,
  parent: [string, string, string],
  property: [string, string],
  unmount: boolean,
  unmark: boolean,
) {
  if (typeof document === "undefined") {
    return;
  }

  if (CacheWorkerInstance.instance) {
    await CacheWorkerInstance.instance.waitForInitializationBlock();
  }

  const locationMemcached =
    unmount ? MEMCACHED_UNMOUNT_SEARCH_DESTRUCTION_MARKERS_LOCATION : MEMCACHED_SEARCH_DESTRUCTION_MARKERS_LOCATION;
  const locationReal =
    unmount ? UNMOUNT_SEARCH_DESTRUCTION_MARKERS_LOCATION : SEARCH_DESTRUCTION_MARKERS_LOCATION;

  (window as any)[locationMemcached] =
    (window as any)[locationMemcached] ||
    JSON.parse(localStorage.getItem(locationReal) || "{}");
  let changed = false;

  if (unmark) {
    if (!(window as any)[locationMemcached][qualifiedName]) {
      // already not there
    } else {
      const foundValueIndex = (window as any)[locationMemcached][qualifiedName]
        .findIndex((m: [string, string, [string, string, string], [string, string]]) =>
          m[0] === type && equals(m[1], owner, { strict: true }) && equals(m[2], parent, { strict: true }) && equals(m[3], property, { strict: true }));
      if (foundValueIndex !== -1) {
        changed = true;
        (window as any)[locationMemcached][qualifiedName].splice(foundValueIndex, 1);
      }
    }
  } else {
    if (!(window as any)[locationMemcached][qualifiedName]) {
      (window as any)[locationMemcached][qualifiedName] = [
        [type, owner, parent, property],
      ];
      changed = true;
    } else {
      if (
        !(window as any)[locationMemcached][qualifiedName]
          .find((m: [string, string, [string, string, string], [string, string]]) =>
            m[0] === type && equals(m[1], owner, { strict: true }) && equals(m[2], parent, { strict: true }) && equals(m[3], property, { strict: true }))
      ) {
        changed = true;
        (window as any)[locationMemcached][qualifiedName].push([type, owner, parent, property]);
      }
    }
  }

  if (changed) {
    localStorage.setItem(locationReal, JSON.stringify((window as any)[locationMemcached]));
  }
};

function onPropertyEnforceOrClearFinal(
  idef: ItemDefinition,
  options: IItemProviderOptions | IActualItemProviderProps,
  isCMounted: boolean,
  givenForId: string,
  givenForVersion: string,
  performSearch: (options: IActionSearchOptions) => void,
  internal?: boolean,
) {
  idef.triggerListeners(
    "change",
    givenForId || null,
    givenForVersion || null,
  );
  if (
    !internal &&
    options.automaticSearch &&
    !options.automaticSearch.clientDisabled &&
    !options.automaticSearchIsOnlyInitial &&
    isCMounted
  ) {
    performSearch(
      options.automaticSearch
    );
  }
};

function onPropertyEnforce(
  idef: ItemDefinition,
  options: IItemProviderOptions | IActualItemProviderProps,
  isCMounted: boolean,
  property: PropertyDefinition | string | IPropertyCoreProps,
  value: PropertyDefinitionSupportedType,
  givenForId: string,
  givenForVersion: string,
  performSearch: (options: IActionSearchOptions) => void,
  internal?: boolean,
  // doNotCleanSearchState?: boolean,
) {
  const actualProperty = property instanceof PropertyDefinition ?
    property : idef.getPropertyDefinitionFor(resolveCoreProp(property), true);

  // this function is basically run by the setter
  // since they might be out of sync that's why the id is passed
  // the setter enforces values
  actualProperty.setSuperEnforced(givenForId || null, givenForVersion || null, value, this);
  // !doNotCleanSearchState && options.itemDefinitionInstance.cleanSearchState(options.forId || null, options.forVersion || null);
  onPropertyEnforceOrClearFinal(idef, options, isCMounted, givenForId, givenForVersion, performSearch, internal);
};

function onPropertyClearEnforce(
  idef: ItemDefinition,
  options: IItemProviderOptions | IActualItemProviderProps,
  isCMounted: boolean,
  property: PropertyDefinition | string | IPropertyCoreProps,
  givenForId: string,
  givenForVersion: string,
  performSearch: (options: IActionSearchOptions) => void,
  internal?: boolean,
) {
  const actualProperty = property instanceof PropertyDefinition ?
    property : idef.getPropertyDefinitionFor(resolveCoreProp(property), true);
  // same but removes the enforcement
  actualProperty.clearSuperEnforced(givenForId || null, givenForVersion || null, this);
  // options.itemDefinitionInstance.cleanSearchState(options.forId || null, options.forVersion || null);
  onPropertyEnforceOrClearFinal(idef, options, isCMounted, givenForId, givenForVersion, performSearch, internal);
};

export function installSetters(
  idef: ItemDefinition,
  options: IItemProviderOptions | IActualItemProviderProps,
  isCMounted: boolean,
  performSearch: (options: IActionSearchOptions) => void,
) {
  if (options.setters) {
    options.setters.forEach((setter) => {
      const property = getPropertyForSetter(setter, idef);
      onPropertyEnforce(idef, options, isCMounted, property, setter.value, options.forId || null, options.forVersion || null, performSearch, true);
    });
  }
};

export function removeSetters(
  idef: ItemDefinition,
  options: IItemProviderOptions | IActualItemProviderProps,
  isCMounted: boolean,
  performSearch: (options: IActionSearchOptions) => void,
) {
  if (options.setters) {
    options.setters.forEach((setter) => {
      const property = getPropertyForSetter(setter, idef);
      onPropertyClearEnforce(idef, options, isCMounted, property, options.forId || null, options.forVersion || null, performSearch, true);
    });
  }
};

export function installPrefills(
  idef: ItemDefinition,
  options: IItemProviderOptions | IActualItemProviderProps,
  location: Location<any>,
) {
  if (options.prefills) {
    options.prefills.forEach((prefill) => {
      const property = getPropertyForSetter(prefill, idef);
      property.setCurrentValue(
        options.forId || null,
        options.forVersion || null,
        prefill.value,
        null,
      );
    });
  }

  // syncing from the query string in a cheap way
  if (options.queryStringSync && options.queryStringSync.length) {
    // grabbing the property to sync in there
    const propertiesToSync = (
      idef.isInSearchMode() ?
        getPropertyListForSearchMode(
          options.queryStringSync || [],
          idef.getStandardCounterpart()
        ) : getPropertyListDefault(options.queryStringSync)
    )

    // using the search params to parse the information there
    const searchParamsParsed = new URLSearchParams(location.search);

    // and now we can sync if we find a value
    propertiesToSync.forEach((p) => {
      // check for it
      const valueInQueryString = searchParamsParsed.get(p);
      // we got something
      if (valueInQueryString) {
        // try to synchornize it
        try {
          const valueParsed = JSON.parse(valueInQueryString);
          const property = idef.getPropertyDefinitionFor(p, true);
          property.setCurrentValue(
            options.forId || null,
            options.forVersion || null,
            valueParsed,
            null,
          );
        } catch {
        }
      }
    });
  }

  if (options.prefills || (options.queryStringSync && options.queryStringSync.length)) {
    // !doNotCleanSearchState && idef.cleanSearchState(propsOrOptions.forId || null, propsOrOptions.forVersion || null);
    idef.triggerListeners(
      "change",
      options.forId || null,
      options.forVersion || null,
    );
  }
};

export function getItemState(
  idef: ItemDefinition,
  propsOrOptions: IActualItemProviderProps | IItemProviderOptions,
) {
  return idef.getStateNoExternalChecking(
    propsOrOptions.forId || null,
    propsOrOptions.forVersion || null,
    propsOrOptions.enableExternalChecks,
    idef.isInSearchMode() ?
      getPropertyListForSearchMode(
        propsOrOptions.properties || [],
        idef.getStandardCounterpart()
      ) : getPropertyListDefault(propsOrOptions.properties),
    propsOrOptions.includes || {},
    !propsOrOptions.includePolicies,
  );
}

export function cleanWithProps(
  idef: ItemDefinition,
  propsOrOptions: IActualItemProviderProps | IItemProviderOptions,
  isUnmounted: boolean,
  blockIdClean: string,
  options: IActionCleanOptions,
  state: "success" | "fail",
  setState: (v: Partial<IHookItemProviderState | IActualItemProviderState>) => void,
  avoidTriggeringUpdate?: boolean,
): boolean {
  if (!isUnmounted) {
    if (
      options.unpokeAfterAny ||
      options.unpokeAfterFailure && state === "fail" ||
      options.unpokeAfterSuccess && state === "success"
    ) {
      setState({
        pokedElements: {
          properties: [],
          includes: {},
          policies: [],
        }
      });
    }
  }

  let needsUpdate: boolean = false;
  let needsSearchUpdate: boolean = false;

  // RESTORING PROPERTIES
  const restorePropertyFn = (ptr: string) => {
    idef
      .getPropertyDefinitionFor(ptr, true).restoreValueFor(propsOrOptions.forId || null,
        propsOrOptions.forVersion || null);
  };
  if (
    options.propertiesToRestoreOnSuccess && state === "success"
  ) {
    let propertiesToRestore = options.propertiesToRestoreOnSuccess;
    if (idef.isInSearchMode()) {
      propertiesToRestore = getPropertyListForSearchMode(
        propertiesToRestore,
        idef.getStandardCounterpart()
      );
    }
    propertiesToRestore.forEach(restorePropertyFn);
    needsUpdate = true;
  }
  if (
    options.propertiesToRestoreOnAny
  ) {
    let propertiesToRestore = options.propertiesToRestoreOnAny;
    if (idef.isInSearchMode()) {
      propertiesToRestore = getPropertyListForSearchMode(
        propertiesToRestore,
        idef.getStandardCounterpart()
      );
    }
    propertiesToRestore.forEach(restorePropertyFn);
    needsUpdate = true;
  }
  if (
    options.propertiesToRestoreOnFailure && state === "fail"
  ) {
    let propertiesToRestore = options.propertiesToRestoreOnFailure;
    if (idef.isInSearchMode()) {
      propertiesToRestore = getPropertyListForSearchMode(
        propertiesToRestore,
        idef.getStandardCounterpart()
      );
    }
    propertiesToRestore.forEach(restorePropertyFn);
    needsUpdate = true;
  }

  // RESTORING INCLUDES
  const restoreIncludeFn = (itr: string) => {
    idef
      .getIncludeFor(itr).restoreValueFor(propsOrOptions.forId || null,
        propsOrOptions.forVersion || null);
  };
  if (
    options.includesToRestoreOnSuccess && state === "success"
  ) {
    options.includesToRestoreOnSuccess.forEach(restoreIncludeFn);
    needsUpdate = true;
  }
  if (
    options.includesToRestoreOnAny
  ) {
    options.includesToRestoreOnAny.forEach(restoreIncludeFn);
    needsUpdate = true;
  }
  if (
    options.includesToRestoreOnFailure && state === "fail"
  ) {
    options.includesToRestoreOnFailure.forEach(restoreIncludeFn);
    needsUpdate = true;
  }

  // CLEANING STATE
  if (
    options.cleanStateOnAny ||
    (options.cleanStateOnFailure && state === "fail") ||
    (options.cleanStateOnSuccess && state === "success")
  ) {
    // cleaning may be blocked but we don't want it to be blocked by us
    let needsAddBlockCleanAgain = false;
    if (idef.hasBlockCleanFor(propsOrOptions.forId || null, propsOrOptions.forVersion || null, blockIdClean)) {
      needsAddBlockCleanAgain = true;
      idef.removeBlockCleanFor(propsOrOptions.forId || null, propsOrOptions.forVersion || null, blockIdClean);
    }

    // now we clean
    idef.cleanValueFor(propsOrOptions.forId || null, propsOrOptions.forVersion || null);

    // and reblock it in case
    if (needsAddBlockCleanAgain) {
      idef.addBlockCleanFor(propsOrOptions.forId || null, propsOrOptions.forVersion || null, blockIdClean);
    }

    needsUpdate = true;
  } else if (
    options.restoreStateOnAny ||
    (options.restoreStateOnFailure && state === "fail") ||
    (options.restoreStateOnSuccess && state === "success")
  ) {
    idef.restoreValueFor(propsOrOptions.forId || null, propsOrOptions.forVersion || null);
    needsUpdate = true;
  }

  // CLEANING POLICIES, POLICIES CAN'T BE RESTORED
  const cleanupPolicyFn = (policyArray: PolicyPathType) => {
    idef
      .getPropertyDefinitionForPolicy(...policyArray).cleanValueFor(propsOrOptions.forId || null,
        propsOrOptions.forVersion || null);
  }
  if (
    options.policiesToCleanOnSuccess && state === "success"
  ) {
    options.policiesToCleanOnSuccess.forEach(cleanupPolicyFn);
    needsUpdate = true;
  }
  if (
    options.policiesToCleanOnAny
  ) {
    options.policiesToCleanOnAny.forEach(cleanupPolicyFn);
    needsUpdate = true;
  }
  if (
    options.policiesToCleanOnFailure && state === "fail"
  ) {
    options.policiesToCleanOnFailure.forEach(cleanupPolicyFn);
    needsUpdate = true;
  }

  if (
    options.cleanSearchResultsOnAny ||
    options.cleanSearchResultsOnFailure && state === "fail" ||
    options.cleanSearchResultsOnSuccess && state === "success"
  ) {
    needsSearchUpdate = true;
    idef.cleanSearchState(propsOrOptions.forId || null, propsOrOptions.forVersion || null);
  }

  // NOw we check if we need an update in the listeners and if we are allowed to trigger it
  let triggeredUpdate: boolean = needsUpdate && !avoidTriggeringUpdate
  if (triggeredUpdate) {
    idef.triggerListeners("change", propsOrOptions.forId || null, propsOrOptions.forVersion || null);
  }
  if (needsSearchUpdate && !avoidTriggeringUpdate) {
    idef.triggerListeners("search-change", propsOrOptions.forId || null, propsOrOptions.forVersion || null);
  }
  return triggeredUpdate;
}


function giveEmulatedInvalidError(
  idef: ItemDefinition,
  propsOrOptions: IActualItemProviderProps | IItemProviderOptions,
  setState: (v: Partial<IHookItemProviderState | IActualItemProviderState>) => void,
  isUnmounted: boolean,
  stateApplied: string,
  withIdVersion: boolean | [string, string],
  withSearchResults: boolean,
  errMessageOverride?: string,
  errorOverride?: string,
): IActionSubmitResponse | IActionResponseWithValue | IActionResponseWithSearchResults {

  if (isDevelopment) {
    console.warn(
      errMessageOverride ? "Action refused due to: " + errMessageOverride : "Action refused due to invalid partial/total state at",
      idef.getStateNoExternalChecking(propsOrOptions.forId || null, propsOrOptions.forVersion || null),
    );
  }

  const emulatedError: EndpointErrorType = {
    message: errMessageOverride || "Submit refused due to invalid information in form fields",
    code: errorOverride || ENDPOINT_ERRORS.INVALID_DATA_SUBMIT_REFUSED,
  };
  if (!isUnmounted) {
    setState({
      [stateApplied]: emulatedError,
    } as any);
  }

  if (withIdVersion) {
    return {
      id: typeof withIdVersion !== "boolean" ? withIdVersion[0] : null,
      version: typeof withIdVersion !== "boolean" ? withIdVersion[1] : null,
      error: emulatedError,
      storedState: false,
      deletedState: false,
      cancelled: false,
    };
  } else if (withSearchResults) {
    return {
      searchId: null,
      results: null,
      records: null,
      limit: null,
      offset: null,
      count: null,
      error: emulatedError,
      cached: false,
      polyfilled: false,
      cancelled: false,
    };
  } else {
    return {
      value: null,
      error: emulatedError,
      cached: false,
      id: null,
      version: null,
    };
  }
}

export function checkItemStateValidity(
  idef: ItemDefinition,
  propsOrOptions: IActualItemProviderProps | IItemProviderOptions,
  state: IHookItemProviderState | IActualItemProviderState,
  options: {
    properties: string[],
    includes?: { [include: string]: string[] },
    policies?: PolicyPathType[],
    onlyIncludeIfDiffersFromAppliedValue?: boolean,
    propertyOverrides?: IPropertyOverride[];
    includeOverrides?: IIncludeOverride[];
  },
): boolean {
  const itemState = (state as IActualItemProviderState).itemState || getItemState(idef, propsOrOptions);

  // let's make this variable to check on whether things are invalid or not
  // first we check every property, that is included and allowed we use some
  // and return whether it's invalid
  const allIncludedPropertiesValid = options.properties.every((pId) => {
    // ignore if it is within an override
    if (options.propertyOverrides && options.propertyOverrides.find((override) => override.id === pId)) {
      return true;
    }

    // first lets try to get the state for the current state if any
    let p = itemState.properties.find((p) => p.propertyId === pId);
    // in some situations, say when we try to manually submit a property this property might not be avaliable
    // in the state but yet still exist within the item definition itself
    if (!p) {
      p = idef.getPropertyDefinitionFor(pId, true)
        .getStateNoExternalChecking(propsOrOptions.forId || null, propsOrOptions.forVersion || null, true);
    }
    // now we check if we have the option to only include those that differ
    // from the applied value
    if (options.onlyIncludeIfDiffersFromAppliedValue) {
      // we get the current applied value, if any
      const currentAppliedValue = idef.getRQAppliedValue(
        propsOrOptions.forId || null, propsOrOptions.forVersion || null);
      // if there is an applied value for that property
      if (currentAppliedValue && typeof currentAppliedValue.flattenedValue[p.propertyId] !== "undefined") {
        // let's check if it's differ from what we have in the state
        const doesNotDifferFromAppliedValue = equals(
          currentAppliedValue.flattenedValue[p.propertyId],
          p.value,
          { strict: true },
        );
        // if it does not differ, then it's false as it won't be included
        if (doesNotDifferFromAppliedValue) {
          return true;
        } else {
          // otherwise it really depends
          return p.valid;
        }
      } else {
        // otherwise if there's no applied value we consider
        // the applied value to be null
        const doesNotDifferFromAppliedValue = p.value === null;
        if (doesNotDifferFromAppliedValue) {
          return true;
        } else {
          return p.valid;
        }
      }
    }
    return p.valid;
  });

  if (!allIncludedPropertiesValid) {
    return false;
  }

  const allIncludedIncludesAreValid = !options.includes ? true : Object.keys(options.includes).every((iId) => {
    // ignore if it is within an override
    if (options.includeOverrides && options.includeOverrides.find((override) => override.id === iId)) {
      return true;
    }

    const i = itemState.includes.find((i) => i.includeId === iId);
    // and now we get the sinking property ids
    const include = idef.getIncludeFor(i.includeId);
    const sinkingPropertyIds = options.includes[iId];

    // and we extract the state only if it's a sinking property
    return i.itemState.properties.every((p) => {
      if (!sinkingPropertyIds.includes(p.propertyId)) {
        return true;
      }
      // now we check if we have the option to only include those that differ
      // from the applied value
      if (options.onlyIncludeIfDiffersFromAppliedValue) {
        // we get the current applied value, if any
        const currentAppliedValue = idef.getRQAppliedValue(
          propsOrOptions.forId || null, propsOrOptions.forVersion || null);
        // if there is an applied value for that property
        if (currentAppliedValue && currentAppliedValue.flattenedValue[include.getQualifiedIdentifier()]) {
          const includeAppliedValue = currentAppliedValue.flattenedValue[include.getQualifiedIdentifier()];
          if (typeof includeAppliedValue[p.propertyId] !== "undefined") {
            // let's check if it's differ from what we have in the state
            const doesNotDifferFromAppliedValue = equals(
              includeAppliedValue[p.propertyId],
              p.value,
              { strict: true },
            );
            // so if it does differ from applied value
            if (!doesNotDifferFromAppliedValue) {
              return true;
            }
          }
        }
      }

      return p.valid;
    });
  });

  if (!allIncludedIncludesAreValid) {
    return false;
  }

  if (!options.policies) {
    return true;
  }

  return options.policies.every((pKeys) => {
    const [policyType, policyName, propertyId] = pKeys;
    const propertyInPolicy = itemState.policies[policyType][policyName]
      .find((p: IPropertyDefinitionState<PropertyDefinitionSupportedType>) => p.propertyId === propertyId);
    return propertyInPolicy.valid;
  });
}

function removePossibleSearchListeners(
  idef: ItemDefinition,
  remoteListener: RemoteListener,
  state: IActualItemProviderState | IHookItemProviderState,
  onSearchReload: (arg: IRemoteListenerRecordsCallbackArg) => void,
) {
  if (idef.isInSearchMode()) {
    const standardCounterpart = idef.getStandardCounterpart();
    const standardCounterpartQualifiedName = (standardCounterpart.isExtensionsInstance() ?
      standardCounterpart.getParentModule().getQualifiedPathName() :
      standardCounterpart.getQualifiedPathName());

    if (state.searchOwner) {
      remoteListener.removeOwnedSearchListenerFor(
        onSearchReload,
        standardCounterpartQualifiedName,
        state.searchOwner,
      );
    }
    if (state.searchParent) {
      remoteListener.removeParentedSearchListenerFor(
        onSearchReload,
        standardCounterpartQualifiedName,
        state.searchParent[0],
        state.searchParent[1],
        state.searchParent[2],
      );
    }
    if (state.searchParent && state.searchOwner) {
      remoteListener.removeOwnedParentedSearchListenerFor(
        onSearchReload,
        standardCounterpartQualifiedName,
        state.searchOwner,
        state.searchParent[0],
        state.searchParent[1],
        state.searchParent[2],
      );
    }
  }
}

export async function search(
  idef: ItemDefinition,
  propsOrOptions: IItemProviderOptions | IActualItemProviderProps,
  originalOptions: IActionSearchOptions,
  state: IHookItemProviderState | IActualItemProviderState,
  setState: (v: Partial<IHookItemProviderState | IActualItemProviderState>, cb?: () => void) => void,
  initialAutomaticNextSearchRef: { current: boolean },
  reloadNextSearchRef: { current: boolean },
  preventSearchFeedbackOnPossibleStaleDataRef: { current: boolean },
  activeSearchPromiseAwaiterRef: { current: string },
  activeSearchPromiseRef: { current: Promise<{ response: IActionResponseWithSearchResults, options: IActionSearchOptions }> },
  activeSearchOptionsRef: { current: IActionSearchOptions },
  activeSubmitPromiseAwaiterRef: { current: string },
  internalSearchDestructionMarkersRef: { current: Array<[string, string, string, [string, string, string], [string, string]]> },
  isUnmounted: boolean,
  blockIdClean: string,
  token: string,
  language: string,
  remoteListener: RemoteListener,
  locationFromHistory: Location<any>,
  onSearchReload: (arg: IRemoteListenerRecordsCallbackArg) => void,
  changeSearchListener: () => void,
): Promise<IActionResponseWithSearchResults> {
  if (!originalOptions || originalOptions.clientDisabled) {
    return;
  }

  // had issues with pollution as other functions
  // were calling search and passing a second argument
  // causing initial automatic to be true
  const initialAutomatic = initialAutomaticNextSearchRef.current;
  const isReloadSearch = reloadNextSearchRef.current;
  initialAutomaticNextSearchRef.current = false;
  reloadNextSearchRef.current = false;

  // we extract the hack variable
  const preventSearchFeedbackOnPossibleStaleData = preventSearchFeedbackOnPossibleStaleDataRef.current;
  preventSearchFeedbackOnPossibleStaleDataRef.current = false;

  let options = originalOptions;

  const cancelledResponse: IActionResponseWithSearchResults = {
    searchId: null,
    cached: false,
    polyfilled: false,
    count: null,
    limit: options.limit,
    offset: options.offset,
    records: null,
    results: null,
    cancelled: true,
    error: null,
  };

  if (state.searching || activeSearchPromiseRef.current) {
    if (originalOptions.pileSearch) {
      const id = uuid.v4();
      activeSearchPromiseAwaiterRef.current = id;

      const lastResponse = await activeSearchPromiseRef.current;

      // another pile element has overtaken us
      // we must not execute, we have been cancelled
      if (activeSearchPromiseAwaiterRef.current !== id) {
        // cancelled
        return cancelledResponse;
      }

      activeSubmitPromiseAwaiterRef.current = null;

      // patch the submit action
      if (typeof originalOptions.pileSearch === "function") {
        const optionsOverride = originalOptions.pileSearch(lastResponse.response, lastResponse.options);

        if (optionsOverride === false) {
          // cancel
          return cancelledResponse;
        } else if (optionsOverride !== true) {
          options = {
            ...options,
            ...optionsOverride,
          }
        }
      }
    } else {
      console.warn(
        "Can't search while searching to trigger at " + idef.getQualifiedPathName() + " newly provided options:",
        originalOptions,
        "active options:",
        activeSearchOptionsRef.current,
        "id-version: " + JSON.stringify(propsOrOptions.forId || null) + "." + JSON.stringify(propsOrOptions.forVersion || null),
      );
      throw new Error("Can't search while searching, please consider your calls");
    }
  }

  if (options.searchByProperties.includes("created_by") && options.createdBy) {
    throw new Error("searchByProperties includes created by yet in the options an override was included as " + options.createdBy);
  } else if (options.searchByProperties.includes("since") && options.since) {
    throw new Error("searchByProperties includes created by yet in the options an override was included as " + options.createdBy);
  } else if (options.searchByProperties.includes("until") && options.until) {
    throw new Error("searchByProperties includes until yet in the options an override was included as " + options.until);
  }

  if (options.cachePolicy !== "none" && options.cachePolicy) {
    options.searchByProperties.forEach((p) => {
      const propertyId = typeof p === "string" ? p : p.id;

      if (!options.requestedProperties.includes(propertyId)) {
        throw new Error(
          "searchByProperties is using " +
          propertyId +
          " but this property is not requested, yet you are using a cache mode " +
          options.cachePolicy +
          " this is a problem because searches are resolved locally and it will lack this field to resolve the search"
        );
      }
    });
  }

  if (options.cachePolicy && options.cachePolicy !== "none" && options.useSearchEngine) {
    // using a cache policy and then listening for changes could result in catasthrope if a record
    // is invalid (inconsistent) in the search engine, the client will not realize and then ask to get fed
    // changes, an invalid record may therefore remain invalid even after is fixed in a consistency check
    // but the client will never realize; when using the SQL database which is the source of truth this is assured not
    // to occur
    throw new Error(
      "Using a search engine with cache policy is not allowed for consistency reasons, "
      + "search engine isn't 100% assured to be consistent, but the database is",
    );
  }

  if (options.useSearchEngineFullHighlights && !options.useSearchEngine) {
    throw new Error(
      "Using a search engine full highlights without useSearchEngine enabled is not allowed"
    );
  }

  // if (options.ssrEnabled && options.cachePolicy && options.cachePolicy !== "none") {
  //   console.warn("You have a SSR enabled search that uses cache policy, this will not execute in the server side due to conflicting instructions");
  // }

  if (options.ssrEnabled && !options.traditional) {
    console.warn("You have a SSR enabled search that does not use traditional search, this will not execute in the server side due to conflicting instructions");
  }

  // we need the standard counterpart given we are in search mode right now, 
  const standardCounterpart = idef.getStandardCounterpart();
  const standardCounterpartQualifiedName = (standardCounterpart.isExtensionsInstance() ?
    standardCounterpart.getParentModule().getQualifiedPathName() :
    standardCounterpart.getQualifiedPathName());
  // first we calculate the properties that are to be submitted, by using the standard counterpart
  // a search action is only to be executed if the item definition (either a real item definition or
  // one representing a module) is actually in search mode, otherwise this would crash
  const propertiesForArgs = getPropertyListForSearchMode(options.searchByProperties, standardCounterpart);

  // now we use this function to check that everything is valid
  const isValid = checkItemStateValidity(idef, propsOrOptions, state, {
    properties: propertiesForArgs,
    includes: options.searchByIncludes || {},
  });

  // if it's invalid let's return the emulated error
  const pokedElements: IPokeElementsType = {
    properties: propertiesForArgs,
    includes: options.searchByIncludes || {},
    policies: [],
  };
  if (!isValid) {
    if (!isUnmounted) {
      setState({
        pokedElements,
      });
    }
    cleanWithProps(idef, propsOrOptions, isUnmounted, blockIdClean, options, "fail", setState);
    const result = giveEmulatedInvalidError(
      idef,
      propsOrOptions,
      setState,
      isUnmounted,
      "searchError",
      false,
      true,
    ) as IActionResponseWithSearchResults;
    propsOrOptions.onWillSearch && propsOrOptions.onWillSearch();
    propsOrOptions.onSearch && propsOrOptions.onSearch(result);

    return result;;
  }

  // now we check the cache policy by owner
  if ((options.cachePolicy === "by-owner" || options.cachePolicy === "by-owner-and-parent") && !options.createdBy) {
    throw new Error("A by owner cache policy requires createdBy option to be set");
  }

  let trackedPropertyDef: PropertyDefinition = null;
  let trackedPropertyVal: string = null;
  if (options.cachePolicy === "by-property" && !options.trackedProperty && !options.listenPolicy) {
    throw new Error("A by property cache policy requires trackedProperty option to be set");
  } else if (options.trackedProperty && (options.cachePolicy ? options.cachePolicy !== "by-property" : options.listenPolicy !== "by-property")) {
    throw new Error("trackedProperty can only be used with by-property cache policy or listen policy");
  }

  if (options.trackedProperty) {
    trackedPropertyDef = standardCounterpart.getPropertyDefinitionFor(options.trackedProperty, true);
    if (!trackedPropertyDef.isTracked()) {
      throw new Error("trackedProperty can only be used with string properties that are tracked");
    }
  }

  // and the cache policy by parenting
  let searchParent: [string, string, string] = null;
  if ((options.cachePolicy === "by-parent" || options.cachePolicy === "by-owner-and-parent") &&
    (options.parentedBy === "NO_PARENT" || !options.parentedBy || !options.parentedBy.id)) {
    throw new Error("A by owner-and-parent cache policy requires parentedBy option to be set with a specific id");
  } else if (options.parentedBy && options.parentedBy !== "NO_PARENT" && options.parentedBy.id) {
    // because the parenting rule goes by a path, eg.... module/module  and then idef/idef
    // we need to loop and find it by the path in order to find both
    const itemDefinitionInQuestion = idef.getParentModule()
      .getParentRoot().registry[options.parentedBy.item] as ItemDefinition;

    // and that way we calculate the search parent
    searchParent = [
      itemDefinitionInQuestion.getQualifiedPathName(),
      options.parentedBy.id,
      options.parentedBy.version || null,
    ];
  }

  propsOrOptions.onWillSearch && propsOrOptions.onWillSearch();

  // the args of the item definition depend on the search mode, hence we use
  // our current item definition instance to get the arguments we want to load
  // in order to perform the search based on the search mode
  const {
    argumentsForQuery,
  } = getFieldsAndArgs({
    includeArgs: true,
    includeFields: false,
    propertiesForArgs,
    includesForArgs: options.searchByIncludes || {},
    itemDefinitionInstance: idef,
    forId: propsOrOptions.forId || null,
    forVersion: propsOrOptions.forVersion || null,
  });

  let searchCacheUsesProperty: [string, string] = null;
  if (trackedPropertyDef) {
    trackedPropertyVal = argumentsForQuery["SEARCH_" + trackedPropertyDef.getId()];

    if (!trackedPropertyVal) {
      throw new Error(
        "trackedProperty value for " + trackedPropertyDef.getId() + " is null or empty string, this is not allowed as a trackeable value"
      );
    }

    searchCacheUsesProperty = [trackedPropertyDef.getId(), trackedPropertyVal];
  }

  const listenPolicy = options.listenPolicy || options.cachePolicy || "none";

  if (listenPolicy !== state.searchListenPolicy) {
    // the listener is bad altogether
    removePossibleSearchListeners(
      idef,
      remoteListener,
      state,
      onSearchReload,
    );
  } else {
    if (listenPolicy.includes("owner")) {
      if (options.createdBy !== state.searchOwner) {
        // this search listener is bad because the search
        // owner has changed, and the previously registered listener
        // if any does not match the owner, remember the search owner is the created by
        // value, and we are now redoing the search, and we might have a search listener
        // registered already for this search if that is the case
        removePossibleSearchListeners(
          idef,
          remoteListener,
          state,
          onSearchReload,
        );
      }
    }

    if (listenPolicy.includes("parent")) {
      // we basically do the exact same here, same logic
      if (!equals(searchParent, state.searchParent, { strict: true })) {
        // this search listener is bad because the search
        // parent has changed, and the previously registered listener
        // if any does not match the owner
        removePossibleSearchListeners(
          idef,
          remoteListener,
          state,
          onSearchReload,
        );
      }
    }

    if (listenPolicy.includes("property")) {
      if (!equals(searchCacheUsesProperty, state.searchCacheUsesProperty, { strict: true })) {
        removePossibleSearchListeners(
          idef,
          remoteListener,
          state,
          onSearchReload,
        );
      }
    }
  }

  if (
    options.cachePolicy &&
    typeof options.markForDestructionOnLogout !== "undefined" &&
    options.markForDestructionOnLogout !== null
  ) {
    if (options.cachePolicy === "by-owner") {
      markSearchForDestruction(
        options.cachePolicy,
        standardCounterpartQualifiedName,
        options.createdBy,
        null,
        null,
        false,
        // unmark
        !options.markForDestructionOnLogout,
      );
    } else if (options.cachePolicy === "by-parent") {
      markSearchForDestruction(
        options.cachePolicy,
        standardCounterpartQualifiedName,
        null,
        searchParent,
        null,
        false,
        // unmark
        !options.markForDestructionOnLogout,
      );
    } else if (options.cachePolicy === "by-owner-and-parent") {
      markSearchForDestruction(
        options.cachePolicy,
        standardCounterpartQualifiedName,
        options.createdBy,
        searchParent,
        null,
        false,
        // unmark
        !options.markForDestructionOnLogout,
      );
    } else if (options.cachePolicy === "by-property") {
      markSearchForDestruction(
        options.cachePolicy,
        standardCounterpartQualifiedName,
        null,
        null,
        searchCacheUsesProperty,
        false,
        // unmark
        !options.markForDestructionOnLogout,
      );
    }
  }

  if (
    options.cachePolicy &&
    typeof options.markForDestructionOnUnmount !== "undefined" &&
    options.markForDestructionOnUnmount !== null
  ) {
    if (options.cachePolicy === "by-owner") {
      installInternalSearchDestructionMarker(internalSearchDestructionMarkersRef, [
        options.cachePolicy,
        standardCounterpartQualifiedName,
        options.createdBy,
        null,
        null,
      ], !options.markForDestructionOnUnmount);
      markSearchForDestruction(
        options.cachePolicy,
        standardCounterpartQualifiedName,
        options.createdBy,
        null,
        null,
        true,
        !options.markForDestructionOnUnmount,
      );
    } else if (options.cachePolicy === "by-parent") {
      installInternalSearchDestructionMarker(internalSearchDestructionMarkersRef, [
        options.cachePolicy,
        standardCounterpartQualifiedName,
        null,
        searchParent,
        null,
      ], !options.markForDestructionOnUnmount);
      markSearchForDestruction(
        options.cachePolicy,
        standardCounterpartQualifiedName,
        null,
        searchParent,
        null,
        true,
        !options.markForDestructionOnUnmount,
      );
    } else if (options.cachePolicy === "by-owner-and-parent") {
      installInternalSearchDestructionMarker(internalSearchDestructionMarkersRef, [
        options.cachePolicy,
        standardCounterpartQualifiedName,
        options.createdBy,
        searchParent,
        null,
      ], !options.markForDestructionOnUnmount);
      markSearchForDestruction(
        options.cachePolicy,
        standardCounterpartQualifiedName,
        options.createdBy,
        searchParent,
        null,
        true,
        !options.markForDestructionOnUnmount,
      );
    } else if (options.cachePolicy === "by-property") {
      installInternalSearchDestructionMarker(internalSearchDestructionMarkersRef, [
        options.cachePolicy,
        standardCounterpartQualifiedName,
        null,
        null,
        searchCacheUsesProperty,
      ], !options.markForDestructionOnUnmount);
      markSearchForDestruction(
        options.cachePolicy,
        standardCounterpartQualifiedName,
        null,
        null,
        searchCacheUsesProperty,
        true,
        !options.markForDestructionOnUnmount,
      );
    }
  }

  // and then set the state to searching
  if (!isUnmounted) {
    setState({
      searching: true,
    });
  }

  // the fields nevertheless are another story as it uses the standard logic
  const searchFieldsAndArgs = getFieldsAndArgs({
    includeArgs: false,
    includeFields: true,
    properties: options.requestedProperties,
    includes: options.requestedIncludes || {},
    itemDefinitionInstance: standardCounterpart,
    forId: null,
    forVersion: null,
  });

  let types: string[] = null;
  if (options.types) {
    const root = idef.getParentModule().getParentRoot();
    types = options.types.map((t) => root.registry[t].getQualifiedPathName());
  }

  // while these search fields are of virtually no use for standard searchs
  // these are used when doing a traditional search and when doing a search
  // in a cache policy mode
  const requestedSearchFields = searchFieldsAndArgs.requestFields;

  let parentedBy = null;
  let parentNull = false;
  if (options.parentedBy && options.parentedBy !== "NO_PARENT") {
    const root = idef.getParentModule().getParentRoot();
    const parentIdef = root.registry[options.parentedBy.item] as ItemDefinition;
    parentedBy = {
      itemDefinition: parentIdef,
      id: options.parentedBy.id || null,
      version: options.parentedBy.version || null,
    };
  } else if (options.parentedBy === "NO_PARENT") {
    parentNull = true;
  }

  const stateOfSearch = idef.getStateNoExternalChecking(
    propsOrOptions.forId || null,
    propsOrOptions.forVersion || null,
  );

  if ((listenPolicy === "by-owner" || listenPolicy === "by-owner-and-parent") && !options.createdBy || options.createdBy === UNSPECIFIED_OWNER) {
    throw new Error("Listen policy is by-owner yet there's no creator specified");
  } else if ((listenPolicy === "by-parent" || listenPolicy === "by-owner-and-parent") && (!parentedBy || !parentedBy.id)) {
    throw new Error("Listen policy is by-parent yet there's no parent specified with a specific id");
  }

  let activeSearchPromiseResolve = null as any;
  let activeSearchPromiseReject = null as any;
  activeSearchPromiseRef.current = new Promise((resolve, reject) => {
    activeSearchPromiseResolve = resolve;
    activeSearchPromiseReject = reject;
  });
  activeSearchOptionsRef.current = options;

  const {
    results,
    records,
    count,
    limit,
    offset,
    error,
    lastModified,
    highlights,
    metadata,
    cached,
    polyfilled,
  } = await runSearchQueryFor({
    args: argumentsForQuery,
    fields: requestedSearchFields,
    itemDefinition: idef,
    cachePolicy: options.cachePolicy || "none",
    cacheDoNotFallbackToSimpleSearch: options.cacheDoNotFallbackToSimpleSearch,
    cacheDoNotFallbackToPolyfill: options.cacheDoNotFallbackToPolyfill,
    cacheNoLimitOffset: options.cacheNoLimitOffset,
    trackedProperty: options.trackedProperty || null,
    createdBy: options.createdBy || null,
    since: options.since || null,
    until: options.until || null,
    orderBy: options.orderBy || {
      created_at: {
        priority: 0,
        nulls: "last",
        direction: "desc",
      }
    },
    types,
    traditional: !!options.traditional,
    token: token,
    language: language,
    limit: options.limit,
    offset: options.offset,
    enableNulls: options.enableNulls,
    parentedBy,
    parentNull,
    waitAndMerge: options.waitAndMerge,
    progresser: options.progresser,
    cacheStoreMetadata: options.cacheMetadata,
    cacheStoreMetadataMismatchAction: options.cacheMetadataMismatchAction,
    useSearchEngine: options.useSearchEngine,
    useSearchEngineFullHighlights: options.useSearchEngineFullHighlights,
    versionFilter: options.versionFilter,
    idsFilter: options.idsFilter,
    idsFilterOut: options.idsFilterOut,
    createdByFilter: options.createdByFilter,
    createdByFilterOut: options.createdByFilterOut,
    parentTypeFilter: options.parentTypeFilter,
    parentTypeFilterOut: options.parentTypeFilterOut,
    parentIdsFilter: options.parentIdsFilter,
    parentIdsFilterOut: options.parentIdsFilterOut,
    versionFilterOut: options.versionFilterOut,
  }, {
    remoteListener: remoteListener,
    preventCacheStaleFeeback: preventSearchFeedbackOnPossibleStaleData,
  });

  const searchId = uuid.v4();

  if (error) {
    const searchState = {
      searchError: error,
      searching: false,
      searchResults: results,
      searchHighlights: highlights,
      searchMetadata: metadata,
      searchRecords: records,
      searchCount: count,
      searchLimit: limit,
      searchOffset: offset,
      searchId,
      searchOwner: options.createdBy || null,
      searchParent,
      searchCacheUsesProperty,
      searchShouldCache: options.cachePolicy && options.cachePolicy !== "none",
      searchFields: requestedSearchFields,
      searchRequestedProperties: options.requestedProperties,
      searchRequestedIncludes: options.requestedIncludes || {},
      searchLastModified: lastModified,
      searchEngineEnabled: !!options.useSearchEngine,
      searchEngineEnabledLang: typeof options.useSearchEngine === "string" ? options.useSearchEngine : null,
      searchEngineUsedFullHighlights: options.useSearchEngineFullHighlights || null,
      searchEngineHighlightArgs: null as any,
      searchCachePolicy: options.cachePolicy || "none",
      searchListenPolicy: options.listenPolicy || options.cachePolicy || "none",
      searchOriginalOptions: options,
      searchListenSlowPolling: options.listenPolicySlowPolling || false,
    };

    // this would be a wasted instruction otherwise as it'd be reversed
    if (
      !options.cleanSearchResultsOnAny &&
      !options.cleanSearchResultsOnFailure
    ) {
      idef.setSearchState(
        propsOrOptions.forId || null,
        propsOrOptions.forVersion || null,
        {
          searchState,
          state: stateOfSearch,
        },
      );
    }

    if (!isUnmounted) {
      setState({
        ...searchState,
        searchWasRestored: "NO",
        pokedElements,
      }, () => {
        if (options.storeResultsInNavigation) {
          // we need to use the current location in order to ensure
          // that nothing changed during the set state event
          const searchParams = new URLSearchParams(location.search);
          const rFlagged = searchParams.get("r") === "t";
          searchParams.delete("r");

          let searchPart = searchParams.toString();
          if (!searchPart.startsWith("?")) {
            searchPart = "?" + searchPart;
          }

          setHistoryState(
            {
              state: locationFromHistory.state,
              pathname: location.pathname,
              search: searchPart,
              hash: location.hash,
            },
            {
              [options.storeResultsInNavigation]: {
                searchId,
                searchState,
                searchIdefState: ItemDefinition.getSerializableState(stateOfSearch),
              }
            },
            initialAutomatic || rFlagged || isReloadSearch,
          );
        }
      });
    }
    cleanWithProps(idef, propsOrOptions, isUnmounted, blockIdClean, options, "fail", setState);
  } else {
    let highlightArgs: any = null;

    if (!options.traditional && options.useSearchEngine) {
      // we are passing these highlight args that are used in the argument
      // we don't need to pass them down the line otherwise
      highlightArgs = {};
      Object.keys(argumentsForQuery).forEach((pId) => {
        if (idef.hasPropertyDefinitionFor(pId, true)) {
          const pValue = idef.getPropertyDefinitionFor(pId, true);

          if (pValue.getType() === "string" && pValue.getSubtype() === "search") {
            const value = argumentsForQuery[pId];
            // highlighting is only useful if it's not null
            // otherwise it's plain useless
            if (value !== null) {
              highlightArgs[pId] = value;
            }
          }
        }
      });
    }

    const searchState = {
      searchError: null as any,
      searching: false,
      searchResults: results,
      searchHighlights: highlights,
      searchMetadata: metadata,
      searchRecords: records,
      searchCount: count,
      searchLimit: limit,
      searchOffset: offset,
      searchId,
      searchOwner: options.createdBy || null,
      searchParent,
      searchCacheUsesProperty,
      searchShouldCache: options.cachePolicy && options.cachePolicy !== "none",
      searchFields: requestedSearchFields,
      searchRequestedProperties: options.requestedProperties,
      searchRequestedIncludes: options.requestedIncludes || {},
      searchLastModified: lastModified,
      searchEngineEnabled: !!options.useSearchEngine,
      searchEngineEnabledLang: typeof options.useSearchEngine === "string" ? options.useSearchEngine : null,
      searchEngineUsedFullHighlights: options.useSearchEngineFullHighlights || null,
      searchEngineHighlightArgs: highlightArgs,
      searchCachePolicy: options.cachePolicy || "none",
      searchListenPolicy: options.listenPolicy || options.cachePolicy || "none",
      searchOriginalOptions: options,
      searchListenSlowPolling: options.listenPolicySlowPolling || false,
    };

    searchListenersSetup(
      idef,
      remoteListener,
      onSearchReload,
      searchState,
    );

    // this would be a wasted instruction otherwise as it'd be reversed
    if (
      !options.cleanSearchResultsOnAny &&
      !options.cleanSearchResultsOnSuccess
    ) {
      idef.setSearchState(
        propsOrOptions.forId || null,
        propsOrOptions.forVersion || null,
        {
          searchState,
          state: stateOfSearch,
        },
      );
    }

    if (!isUnmounted) {
      setState({
        ...searchState,
        searchWasRestored: "NO",
        pokedElements,
      }, () => {
        if (options.storeResultsInNavigation) {
          // we need to use the current location in order to ensure
          // that nothing changed during the set state event
          const searchParams = new URLSearchParams(location.search);
          const rFlagged = searchParams.get("r") === "t";
          searchParams.delete("r");

          let searchPart = searchParams.toString();
          if (!searchPart.startsWith("?")) {
            searchPart = "?" + searchPart;
          }

          setHistoryState(
            {
              state: locationFromHistory.state,
              pathname: location.pathname,
              search: searchPart,
              hash: location.hash,
            },
            {
              [options.storeResultsInNavigation]: {
                searchId,
                searchState,
                searchIdefState: ItemDefinition.getSerializableState(stateOfSearch),
              }
            },
            initialAutomatic || rFlagged,
          );
        }
      });
    }
    cleanWithProps(idef, propsOrOptions, isUnmounted, blockIdClean, options, "success", setState);
  }

  idef.triggerListeners(
    "search-change",
    propsOrOptions.forId,
    propsOrOptions.forVersion,
    changeSearchListener,
  );

  const result = {
    searchId,
    results,
    records,
    count,
    limit,
    offset,
    error,
    cached,
    cancelled: false,
    polyfilled,
  };
  propsOrOptions.onSearch && propsOrOptions.onSearch(result);
  activeSearchPromiseRef.current = null;
  activeSearchOptionsRef.current = null;
  activeSearchPromiseResolve({ response: result, options });
  return result;
}

export function searchListenersSetup(
  idef: ItemDefinition,
  remoteListener: RemoteListener,
  onSearchReload: (arg: IRemoteListenerRecordsCallbackArg) => void,
  state: IItemSearchStateType,
  requestFeedbackToo?: boolean
) {
  if (!state.searchId) {
    return;
  }

  if (state.searchListenPolicy === "none") {
    if (requestFeedbackToo) {
      searchFeedback(idef, remoteListener, state);
    }

    return;
  }

  const standardCounterpart = idef.getStandardCounterpart();

  const standardCounterpartQualifiedName = (standardCounterpart.isExtensionsInstance() ?
    standardCounterpart.getParentModule().getQualifiedPathName() :
    standardCounterpart.getQualifiedPathName());
  if (state.searchListenPolicy === "by-owner") {
    remoteListener.addOwnedSearchListenerFor(
      standardCounterpartQualifiedName,
      state.searchOwner,
      state.searchLastModified,
      onSearchReload,
      state.searchCachePolicy !== "none",
      state.searchListenSlowPolling,
    );
  } else if (state.searchListenPolicy === "by-parent") {
    remoteListener.addParentedSearchListenerFor(
      standardCounterpartQualifiedName,
      state.searchParent[0],//.itemDefinition.getQualifiedPathName(),
      state.searchParent[1],//.id,
      state.searchParent[2] || null,
      state.searchLastModified,
      onSearchReload,
      state.searchCachePolicy !== "none",
      state.searchListenSlowPolling,
    );
  } else if (state.searchListenPolicy === "by-owner-and-parent") {
    remoteListener.addOwnedParentedSearchListenerFor(
      standardCounterpartQualifiedName,
      state.searchOwner,
      state.searchParent[0],//.itemDefinition.getQualifiedPathName(),
      state.searchParent[1],//.id,
      state.searchParent[2] || null,
      state.searchLastModified,
      onSearchReload,
      state.searchCachePolicy !== "none",
      state.searchListenSlowPolling,
    );
  } else if (state.searchListenPolicy === "by-property") {
    remoteListener.addPropertySearchListenerFor(
      standardCounterpartQualifiedName,
      state.searchCacheUsesProperty[0],
      state.searchCacheUsesProperty[1],
      state.searchLastModified,
      onSearchReload,
      state.searchCachePolicy !== "none",
      state.searchListenSlowPolling,
    );
  }

  if (requestFeedbackToo) {
    searchFeedback(idef, remoteListener, state);
  }
}
function searchFeedback(
  idef: ItemDefinition,
  remoteListener: RemoteListener,
  state: IItemSearchStateType,
) {
  const standardCounterpart = idef.getStandardCounterpart();
  const standardCounterpartQualifiedName = (standardCounterpart.isExtensionsInstance() ?
    standardCounterpart.getParentModule().getQualifiedPathName() :
    standardCounterpart.getQualifiedPathName());

  if (state.searchListenPolicy === "by-owner" || state.searchCachePolicy === "by-owner") {
    remoteListener.requestOwnedSearchFeedbackFor({
      qualifiedPathName: standardCounterpartQualifiedName,
      createdBy: state.searchOwner,
      lastModified: state.searchLastModified,
    });
  }

  if (state.searchListenPolicy === "by-owner-and-parent" || state.searchCachePolicy === "by-owner-and-parent") {
    remoteListener.requestOwnedParentedSearchFeedbackFor({
      createdBy: state.searchOwner,
      qualifiedPathName: standardCounterpartQualifiedName,
      parentType: state.searchParent[0],
      parentId: state.searchParent[1],
      parentVersion: state.searchParent[2],
      lastModified: state.searchLastModified,
    });
  }

  if (state.searchListenPolicy === "by-parent" || state.searchCachePolicy === "by-parent") {
    remoteListener.requestParentedSearchFeedbackFor({
      qualifiedPathName: standardCounterpartQualifiedName,
      parentType: state.searchParent[0],
      parentId: state.searchParent[1],
      parentVersion: state.searchParent[2],
      lastModified: state.searchLastModified,
    });
  }

  if (state.searchListenPolicy === "by-property" || state.searchCachePolicy === "by-property") {
    remoteListener.requestPropertySearchFeedbackFor({
      qualifiedPathName: standardCounterpartQualifiedName,
      propertyId: state.searchCacheUsesProperty[0],
      propertyValue: state.searchCacheUsesProperty[1],
      lastModified: state.searchLastModified,
    });
  }
}

function installInternalSearchDestructionMarker(
  internalSearchDestructionMarkersRef: { current: Array<[string, string, string, [string, string, string], [string, string]]> },
  marker: [string, string, string, [string, string, string], [string, string]],
  unmark: boolean,
) {
  const index = internalSearchDestructionMarkersRef.current.findIndex((m) => equals(m, marker, { strict: true }));
  if (unmark) {
    // found somwehre
    if (index !== -1) {
      // unmark it
      internalSearchDestructionMarkersRef.current.splice(index, 1);
    }

    // not found
  } else if (index === -1) {
    // mark it
    internalSearchDestructionMarkersRef.current.push(marker);
  }
}

export function dismissSearchResults(
  idef: ItemDefinition,
  remoteListener: RemoteListener,
  state: IActualItemProviderState | IHookItemProviderState,
  setState: (v: Partial<IHookItemProviderState | IActualItemProviderState>) => void,
  isUnmounted: boolean,
  onSearchReload: (arg: IRemoteListenerRecordsCallbackArg) => void,
) {
  removePossibleSearchListeners(
    idef,
    remoteListener,
    state,
    onSearchReload,
  );
  if (!isUnmounted) {
    setState({
      searchId: null,
      searchFields: null,
      searchOwner: null,
      searchLastModified: null,
      searchShouldCache: false,
      searchRequestedIncludes: {},
      searchRequestedProperties: [],
      searchResults: null,
      searchRecords: null,
    });
  }
}

export function dismissLoadError(
  isUnmounted: boolean,
  setState: (v: Partial<IHookItemProviderState | IActualItemProviderState>) => void,
) {
  if (isUnmounted) {
    return;
  }
  setState({
    loadError: null,
  });
}
export function dismissDeleteError(
  isUnmounted: boolean,
  setState: (v: Partial<IHookItemProviderState | IActualItemProviderState>) => void,
) {
  if (isUnmounted) {
    return;
  }
  setState({
    deleteError: null,
  });
}
export function dismissSubmitError(
  isUnmounted: boolean,
  setState: (v: Partial<IHookItemProviderState | IActualItemProviderState>) => void,
) {
  if (isUnmounted) {
    return;
  }
  setState({
    submitError: null,
  });
}
export function dismissSubmitted(
  isUnmounted: boolean,
  setState: (v: Partial<IHookItemProviderState | IActualItemProviderState>) => void,
) {
  if (isUnmounted) {
    return;
  }
  setState({
    submitted: false,
  });
}
export function dismissDeleted(
  isUnmounted: boolean,
  setState: (v: Partial<IHookItemProviderState | IActualItemProviderState>) => void,
) {
  if (isUnmounted) {
    return;
  }
  setState({
    deleted: false,
  });
}
export function dismissSearchError(
  isUnmounted: boolean,
  setState: (v: Partial<IHookItemProviderState | IActualItemProviderState>) => void,
) {
  if (isUnmounted) {
    return;
  }
  setState({
    searchError: null,
  });
}
export function onConnectStatusChange(
  propsOrOptions: IItemProviderOptions | IActualItemProviderProps,
  remoteListener: RemoteListener,
  state: IHookItemProviderState | IActualItemProviderState,
  search: (options: IActionSearchOptions) => void,
  loadValue: () => void,
) {
  const isConnected = !remoteListener.isOffline();
  if (isConnected) {
    if (
      state.loadError &&
      state.loadError.code === ENDPOINT_ERRORS.CANT_CONNECT &&
      !propsOrOptions.doNotAutomaticReloadIfCantConnect
    ) {
      loadValue();
    }
    if (
      state.searchError &&
      state.searchError.code === ENDPOINT_ERRORS.CANT_CONNECT &&
      !propsOrOptions.doNotAutomaticReloadSearchIfCantConnect
    ) {
      search(state.searchOriginalOptions);
    }
  }
}

// originally taking the current update id only
export async function setStateToCurrentValueWithExternalChecking(
  idef: ItemDefinition,
  setState: (v: Partial<IHookItemProviderState | IActualItemProviderState>) => void,
  propsOrOptions: IItemProviderOptions | IActualItemProviderProps,
  isProps: boolean,
  isUnmounted: boolean,
  lastUpdateId: number,
  currentUpdateId: number,
  changeListener: () => void,
) {
  // so when we want to externally check we first run the external check
  // using the normal get state function which runs async
  const newItemState = await idef.getState(
    propsOrOptions.forId || null,
    propsOrOptions.forVersion || null,
    idef.isInSearchMode() ?
      getPropertyListForSearchMode(
        propsOrOptions.properties || [],
        idef.getStandardCounterpart()
      ) : getPropertyListDefault(propsOrOptions.properties),
    propsOrOptions.includes || {},
    !propsOrOptions.includePolicies,
  );

  // if the current update id is null (as in always update) or the last update id
  // that was requested is the same as the current (this is important in order)
  // to avoid situations where two external checks have been requested for some
  // reason only the last should be applied
  if (currentUpdateId === null || lastUpdateId === currentUpdateId) {
    // we set the state to the new state
    if (!isUnmounted && isProps) {
      setState({
        itemState: newItemState,
      });
    }
    // and trigger change listeners, all but our listener
    // we still need to trigger all other listeners
    idef.triggerListeners(
      "change", propsOrOptions.forId || null, propsOrOptions.forVersion || null, changeListener);
  }
}

export const SSR_GRACE_TIME = 10000;
export const LOAD_TIME = (new Date()).getTime();

export async function onMount(
  idef: ItemDefinition,
  propsOrOptions: IItemProviderOptions | IActualItemProviderProps,
  isProps: boolean,
  state: IHookItemProviderState | IActualItemProviderState,
  setState: (v: Partial<IHookItemProviderState | IActualItemProviderState>, cb?: () => void) => void,
  remoteListener: RemoteListener,
  isCMountedRef: { current: boolean },
  mountCbFns: { current: Array<() => void> },
  changedSearchListenerLastCollectedSearchIdRef: { current: { id: string } },
  initialAutomaticNextSearchRef: { current: boolean },
  isUnmounted: boolean,
  internalUUID: string,
  lastUpdateId: number,
  basicFnsRetriever: () => IBasicFns,
  onConnectStatusChange: () => void,
  onSearchReload: (arg: IRemoteListenerRecordsCallbackArg) => void,
  search: (options: IActionSearchOptions) => Promise<IActionResponseWithSearchResults>,
  loadValue: () => Promise<IActionResponseWithValue>,
  changeListener: () => void,
) {
  isCMountedRef.current = true;
  mountCbFns.current.forEach((c) => c());
  remoteListener.addConnectStatusListener(onConnectStatusChange);

  // now we retrieve the externally checked value
  if (idef.containsAnExternallyCheckedProperty() && propsOrOptions.enableExternalChecks) {
    setStateToCurrentValueWithExternalChecking(idef, setState, propsOrOptions, isProps, isUnmounted, lastUpdateId, null, changeListener);
  }

  const listenersSetup = () => {
    const currentSearch = state;

    // when we have a search that was done during SSR and was not stored
    // somewherue in our stuff, we don't want to request feedback
    // when we jst loaded the app because then it makes no sense
    // as the information should be up to date
    const shouldRequestFeedback = currentSearch.searchId === "SSR_SEARCH" && !propsOrOptions.automaticSearchNoGraceTime ? (
      (new Date()).getTime() - LOAD_TIME > SSR_GRACE_TIME
    ) : true;

    searchListenersSetup(
      idef,
      remoteListener,
      onSearchReload,
      currentSearch,
      shouldRequestFeedback,
    );
  };

  let searchWasRedone = false;
  if (propsOrOptions.automaticSearch && !propsOrOptions.automaticSearch.clientDisabled) {
    // the search listener might have triggered during the mount callback,
    // which means this function won't see the new state and won't trigger
    // automatic search so we use this variable to check it
    const searchIdToCheckAgainst = changedSearchListenerLastCollectedSearchIdRef.current ?
      changedSearchListenerLastCollectedSearchIdRef.current.id : state.searchId;

    if (
      // no search id at all, not in the state, not on the changed listener, nowhere
      (!searchIdToCheckAgainst) ||
      // search is forced and we didn't load from location
      (propsOrOptions.automaticSearchForce && state.searchWasRestored !== "FROM_LOCATION") ||
      // cache policies searches that have been resolved by SSR need to be redone
      // this is only relevant during mount of course
      // the reason is that the cache may have changes or not be inline with whatever
      // was calculated from the server side
      // that's the issue with ssrEnabled searches that are also cache
      (searchIdToCheckAgainst === "SSR_SEARCH" && propsOrOptions.automaticSearch.cachePolicy !== "none") ||
      (searchIdToCheckAgainst === "SSR_SEARCH" && propsOrOptions.automaticSearch.ssrRequestedProperties)
    ) {
      // this variable that is passed into the search is used to set the initial
      // state in case it needs to be saved in the history
      searchWasRedone = true;
      (async () => {
        try {
          initialAutomaticNextSearchRef.current = true;
          await search(propsOrOptions.automaticSearch);
        } catch (err) {
          console.error(err);
          // setup listeners just in case
          // for a failed search
          listenersSetup();
        }
      })();
    }
  }

  if (!searchWasRedone) {
    listenersSetup();
  }

  if (propsOrOptions.onSearchStateLoaded || propsOrOptions.onSearchStateChange) {
    const searchState = getSearchStateOf(state);
    if (searchState.searchId) {
      propsOrOptions.onSearchStateLoaded && propsOrOptions.onSearchStateLoaded(searchState);
      propsOrOptions.onSearchStateChange && propsOrOptions.onSearchStateChange(searchState);
    }
  }

  if (typeof propsOrOptions.markForDestructionOnLogout !== "undefined" && propsOrOptions.markForDestructionOnLogout !== null) {
    if (propsOrOptions.markForDestructionOnLogout) {
      markForDestruction(idef, false, false, propsOrOptions);
    } else {
      markForDestruction(idef, false, true, propsOrOptions);
    }
  }

  if (typeof propsOrOptions.markForDestructionOnUnmount !== "undefined" && propsOrOptions.markForDestructionOnUnmount !== null) {
    if (propsOrOptions.markForDestructionOnUnmount) {
      markForDestruction(idef, true, false, propsOrOptions);
    } else {
      markForDestruction(idef, true, true, propsOrOptions);
    }
  }

  if (window.TESTING && process.env.NODE_ENV === "development") {
    mountOrUpdateIdefForTesting(idef, propsOrOptions, state, internalUUID);
  }

  // and we attempt to load the current value
  if (!propsOrOptions.avoidLoading) {
    await loadValue();
  }

  if (propsOrOptions.loadStoredState) {
    const loc = getStoredStateLocation(propsOrOptions.loadStoredState, propsOrOptions.forId, propsOrOptions.forVersion);
    await loadStoredState(idef, propsOrOptions, isProps, setState, changeListener, basicFnsRetriever, loc);
    // setupStoredStateListener(loc);
  }

  installDoubleSlotter(idef, propsOrOptions);
}

export interface IStoredStateLocation { id: string; version: string };

export async function loadStoredState(
  idef: ItemDefinition,
  propsOrOptions: IItemProviderOptions | IActualItemProviderProps,
  isProps: boolean,
  setState: (v: Partial<IHookItemProviderState | IActualItemProviderState>, cb?: () => void) => void,
  changeListener: () => void,
  basicFnsRetriever: () => IBasicFns,
  storageLocation: IStoredStateLocation,
) {
  // no polyfills for loaded states
  if (CacheWorkerInstance.isSupportedAsWorker && storageLocation) {
    const [storedState, metadata] = await CacheWorkerInstance.instance.retrieveState(
      idef.getQualifiedPathName(),
      storageLocation.id,
      storageLocation.version,
    );

    if (storedState) {
      idef.applyState(
        propsOrOptions.forId || null,
        propsOrOptions.forVersion || null,
        storedState,
      );
      idef.triggerListeners(
        "change",
        propsOrOptions.forId || null,
        propsOrOptions.forVersion || null,
        changeListener,
      );

      if (isProps) {
        setState({
          itemState: getItemState(idef, propsOrOptions),
        }, () => {
          propsOrOptions.onStateLoadedFromStore && propsOrOptions.onStateLoadedFromStore(storedState, metadata, basicFnsRetriever());
        });
      } else {
        propsOrOptions.onStateLoadedFromStore && propsOrOptions.onStateLoadedFromStore(storedState, metadata, basicFnsRetriever());
      }
    }
  }
}

function getStoredStateLocation(v: boolean | string | IStoredStateLocation, currentId: string, currentVersion: string): IStoredStateLocation {
  return typeof v === "string" ?
    { id: v, version: null } : (
      typeof v === "boolean" ? { id: currentId || null, version: currentVersion || null } :
        v
    )
}

export function mountOrUpdateIdefForTesting(
  idef: ItemDefinition,
  propsOrOptions: IItemProviderOptions | IActualItemProviderProps,
  state: IHookItemProviderState | IActualItemProviderState,
  internalUUID: string,
  wasContentLoadedFromMemory?: boolean,
) {
  if (process.env.NODE_ENV === "development") {
    const current = window.TESTING.mountedItems.find(m => m.instanceUUID === internalUUID);
    const idefId = idef.getQualifiedPathName();
    const modId = idef.getParentModule().getQualifiedPathName();
    if (current) {
      current.module = modId;
      current.itemDefinition = idefId;
      current.id = propsOrOptions.forId || null;
      current.version = propsOrOptions.forVersion || null;
      current.isSearchMode = idef.isInSearchMode();
      current.isExtensions = idef.isExtensionsInstance();
      current.wasFound = !state.notFound;
      current.staticStatus = propsOrOptions.static;
      if (typeof wasContentLoadedFromMemory !== "undefined") {
        current.wasContentLoadedFromMemory = wasContentLoadedFromMemory;
      }
      current.hadAFallback = !!propsOrOptions.loadUnversionedFallback;
      current.updateTime = (new Date()).toISOString();
      current.avoidsLoading = !!propsOrOptions.avoidLoading;
    } else {
      window.TESTING.mountedItems.push({
        instanceUUID: internalUUID,
        module: modId,
        itemDefinition: idefId,
        id: propsOrOptions.forId || null,
        version: propsOrOptions.forVersion || null,
        isSearchMode: idef.isInSearchMode(),
        isExtensions: idef.isExtensionsInstance(),
        mountTime: (new Date()).toISOString(),
        wasFound: !state.notFound,
        hadAFallback: !!propsOrOptions.loadUnversionedFallback,
        updateTime: null,
        unmountTime: null,
        staticStatus: propsOrOptions.static,
        wasContentLoadedFromMemory: !!wasContentLoadedFromMemory,
        avoidsLoading: !!propsOrOptions.avoidLoading,
      });
    }
  }
}

export function getSearchStateOf(state: IActualItemProviderState | IHookItemProviderState): IItemSearchStateType {
  return {
    searchCount: state.searchCount,
    searchError: state.searchError,
    searchFields: state.searchFields,
    searchId: state.searchId,
    searchLastModified: state.searchLastModified,
    searchLimit: state.searchLimit,
    searchOffset: state.searchOffset,
    searchOwner: state.searchOwner,
    searchParent: state.searchParent,
    searchRecords: state.searchRecords,
    searchCacheUsesProperty: state.searchCacheUsesProperty,
    searchRequestedIncludes: state.searchRequestedIncludes,
    searchRequestedProperties: state.searchRequestedProperties,
    searchResults: state.searchResults,
    searchShouldCache: state.searchShouldCache,
    searching: state.searching,
    searchEngineEnabled: state.searchEngineEnabled,
    searchEngineEnabledLang: state.searchEngineEnabledLang,
    searchEngineUsedFullHighlights: state.searchEngineUsedFullHighlights,
    searchEngineHighlightArgs: state.searchEngineHighlightArgs,
    searchHighlights: state.searchHighlights,
    searchMetadata: state.searchMetadata,
    searchCachePolicy: state.searchCachePolicy,
    searchListenPolicy: state.searchListenPolicy,
    searchOriginalOptions: state.searchOriginalOptions,
    searchListenSlowPolling: state.searchListenSlowPolling,
  };
}

/**
* internally used in development only to check for double slotting
* where two search items share a state and may be unnoticed
*/
export function installDoubleSlotter(
  idef: ItemDefinition,
  propsOrOptions: IItemProviderOptions | IActualItemProviderProps,
) {
  if (process.env.NODE_ENV === "development" && !(window as any).DOUBLE_SLOTTING_FAILSAFE) {
    (window as any).DOUBLE_SLOTTING_FAILSAFE = {};
  }
  if (process.env.NODE_ENV === "development" && idef.isInSearchMode()) {
    const slotId = idef.getQualifiedPathName() + "." + (propsOrOptions.forId || "") + "." + (propsOrOptions.forVersion || "");
    if (
      (window as any).DOUBLE_SLOTTING_FAILSAFE[slotId] &&
      (window as any).DOUBLE_SLOTTING_FAILSAFE[slotId].length &&
      !propsOrOptions.searchCounterpartHasTwin
    ) {
      console.warn(
        "Found two instances of an item provider in search mode at the same slot at the same time, " +
        "this is not an error, but they share a search state, on item: " + JSON.stringify(idef.getQualifiedPathName()) +
        " at id: " + JSON.stringify(propsOrOptions.forId || null) +
        " and version: " + JSON.stringify(propsOrOptions.forVersion || null));
    }
    (window as any).DOUBLE_SLOTTING_FAILSAFE[slotId] = (window as any).DOUBLE_SLOTTING_FAILSAFE[slotId] || [];
    (window as any).DOUBLE_SLOTTING_FAILSAFE[slotId].push(this);
  }
}

/**
   * internally used in development only to check for double slotting
   * where two search items share a state and may be unnoticed
   */
export function removeDoubleSlotter(
  idef: ItemDefinition,
  propsOrOptions: IItemProviderOptions | IActualItemProviderProps,
) {
  if (process.env.NODE_ENV === "development" && idef.isInSearchMode() && (window as any).DOUBLE_SLOTTING_FAILSAFE) {
    const slotId = idef.getQualifiedPathName() + "." + (propsOrOptions.forId || "") + "." + (propsOrOptions.forVersion || "");
    if ((window as any).DOUBLE_SLOTTING_FAILSAFE[slotId] && (window as any).DOUBLE_SLOTTING_FAILSAFE[slotId].length) {
      const indexToRemove = (window as any).DOUBLE_SLOTTING_FAILSAFE[slotId].findIndex(i => i === this);
      if (indexToRemove !== -1) {
        (window as any).DOUBLE_SLOTTING_FAILSAFE[slotId].splice(indexToRemove, 1);
      }
      if ((window as any).DOUBLE_SLOTTING_FAILSAFE[slotId].length === 0) {
        delete (window as any).DOUBLE_SLOTTING_FAILSAFE[slotId];
      }
      if ((window as any).DOUBLE_SLOTTING_FAILSAFE[slotId] && (window as any).DOUBLE_SLOTTING_FAILSAFE[slotId].length === 1) {
        console.warn(
          "The double slotting on item: " + JSON.stringify(idef.getQualifiedPathName()) +
          " at id: " + JSON.stringify(propsOrOptions.forId || null) +
          " and version: " + JSON.stringify(propsOrOptions.forVersion || null) + " has been removed");
      }
    }
  }
}

export async function loadValue(
  idef: ItemDefinition,
  propsOrOptions: IItemProviderOptions | IActualItemProviderProps,
  isProps: boolean,
  state: IHookItemProviderState | IActualItemProviderState,
  setState: (v: Partial<IHookItemProviderState | IActualItemProviderState>) => void,
  remoteListener: RemoteListener,
  lastLoadingForIdRef: { current: string },
  lastLoadingForVersionRef: { current: string },
  lastLoadValuePromiseIsResolvedRef: { current: boolean },
  lastLoadValuePromiseRef: { current: Promise<void> },
  lastLoadValuePromiseResolveRef: { current: () => void },
  isUnmounted: boolean,
  token: string,
  language: string,
  lastUpdateId: number,
  internalUUID: string,
  searchContext: ISearchItemValueContextType,
  changeListener: () => void,
  denyCaches?: boolean,
): Promise<IActionResponseWithValue> {
  const forId = propsOrOptions.forId;
  const forVersion = propsOrOptions.forVersion || null;

  lastLoadingForIdRef.current = forId;
  lastLoadingForVersionRef.current = forVersion;

  // we don't use loading here because there's one big issue
  // elements are assumed into the loading state by the constructor
  // if they have an id
  if (!forId || propsOrOptions.searchCounterpart) {
    if ((state.loading || state.loaded || state.loadError) && !isUnmounted) {
      setState({
        loadError: null,
        loaded: false,
        isBlocked: false,
        isBlockedButDataIsAccessible: false,
        notFound: false,
        loading: false,
      });
    }
    return null;
  }

  // We get the request fields that we are going to use
  // in order to load the value, we use the optimizers
  // so as to request only what is necessary for it to be populated
  // there is however one thing, different optimizers might have been
  // used accross the application, and two components with different
  // optimizations might have been used at the same time for the
  // same id
  const { requestFields } = getFieldsAndArgs({
    includeArgs: false,
    includeFields: true,
    uniteFieldsWithAppliedValue: true,
    includes: propsOrOptions.includes || {},
    properties: getPropertyListDefault(propsOrOptions.properties),
    itemDefinitionInstance: idef,
    forId: forId,
    forVersion: forVersion,
  });

  // the reason why we use deny cache here is simple
  // the search context is a form of a memory cache, it might be loading
  // still when for some reason it was asked to reload, I can think of a extreme case
  // when the client loads from memory, a reload is requested, but the search conxtext hasn't
  // released yet the value
  if (
    !denyCaches &&
    !propsOrOptions.doNotUseMemoryCache &&
    searchContext &&
    searchContext.currentlySearching.find(
      (s) =>
        s.id === forId &&
        s.version === forVersion &&
        s.type === idef.getQualifiedPathName(),
    ) &&
    requestFieldsAreContained(requestFields, searchContext.searchFields)
  ) {
    // now we wait for the search loader to trigger the load event
    if (!isUnmounted) {
      setState({
        loading: true,
        loaded: false,
      });
    }
    return null;
  }

  propsOrOptions.onWillLoad && propsOrOptions.onWillLoad();

  // we wil reuse the old promise in case
  // there's an overlapping value being loaded
  // the old call won't trigger the promise
  // as it won't match the current signature
  if (lastLoadValuePromiseIsResolvedRef.current) {
    lastLoadValuePromiseRef.current = new Promise((resolve) => {
      lastLoadValuePromiseResolveRef.current = resolve;
    });
    lastLoadValuePromiseIsResolvedRef.current = false;
  }

  const qualifiedName = idef.getQualifiedPathName();

  let currentMetadata: ICacheMetadataMatchType;
  let denyMemoryCache: boolean = false;
  let denyCacheWorker: boolean = false;
  if (
    !denyCaches &&
    !propsOrOptions.doNotUseMemoryCache &&
    propsOrOptions.longTermCachingMetadata &&
    // no polyfilling for loading value and related meatadat
    CacheWorkerInstance.isSupportedAsWorker
  ) {
    currentMetadata = await CacheWorkerInstance.instance.readMetadata(
      PREFIX_GET + qualifiedName,
      forId,
      forVersion || null,
    );

    if (!equals(propsOrOptions.longTermCachingMetadata, currentMetadata) && propsOrOptions.longTermCachingMetadataMismatchAction) {
      // we deny the memory cache because we are now unsure of whether
      // the value held in memory is valid due to the metadata
      // as this value might have come from the cache when it was loaded
      // with such unmatching metadata
      denyMemoryCache = true;
      denyCacheWorker = true;
    }
  }

  if (!denyCaches && !denyMemoryCache && !propsOrOptions.doNotUseMemoryCache) {
    // Prevent loading at all if value currently available and memoryCached
    const appliedRQValue = idef.getRQAppliedValue(
      forId, forVersion,
    );
    if (
      appliedRQValue &&
      requestFieldsAreContained(requestFields, appliedRQValue.requestFields)
    ) {
      if (window.TESTING && process.env.NODE_ENV === "development") {
        mountOrUpdateIdefForTesting(idef, propsOrOptions, state, internalUUID, true);
      }

      if (propsOrOptions.static !== "TOTAL") {
        remoteListener.requestFeedbackFor({
          itemDefinition: idef.getQualifiedPathName(),
          id: forId,
          version: forVersion || null,
        });
      }
      // in some situations the value can be in memory but not yet permanently cached
      // (eg. when there is a search context)
      // and another item without a search context attempts to load the value this will
      // make it so that when we are exiting the search context it caches
      let cached: boolean = false;
      if (
        CacheWorkerInstance.isSupportedAsWorker &&
        propsOrOptions.longTermCaching &&
        !searchContext
      ) {
        if (appliedRQValue.rawValue) {
          try {
            cached = await CacheWorkerInstance.instance.mergeCachedValue(
              PREFIX_GET + qualifiedName,
              forId,
              forVersion || null,
              appliedRQValue.rawValue,
              appliedRQValue.requestFields,
            );
          } catch { }
        } else {
          try {
            cached = await CacheWorkerInstance.instance.setCachedValue(
              PREFIX_GET + qualifiedName,
              forId,
              forVersion || null,
              null,
              null,
            );
          } catch { }
        }
      }

      return loadValueCompleted(idef, propsOrOptions, isProps, setState, isUnmounted,
        lastLoadingForIdRef, lastLoadingForVersionRef, lastLoadValuePromiseIsResolvedRef, lastLoadValuePromiseResolveRef, {
        value: appliedRQValue.rawValue,
        error: null,
        cached,
        id: forId,
        version: forVersion,
      });
    }
  }

  // the loading state is launched here, however
  // the loading is removed by the listener not by
  // this same function, to be efficient, we could remove
  // it via this function but doing it in the listener
  // who listens for change is better, items are clearly
  // not loading if the listener has detected a change in them
  // you might wonder why in the loader and not in the waiter
  // well it's because the waiter might only executes for the active
  // instance
  if (!state.loading && !isUnmounted) {
    setState({
      loading: true,
      loaded: false,
    });
  } else if (!isUnmounted) {
    setState({
      loaded: false,
    });
  }

  if (isUnmounted) {
    return;
  }

  const containsExternallyCheckedProperty = idef.containsAnExternallyCheckedProperty();
  const qualifiedPathName = idef.getQualifiedPathName();

  // remember that this waiter only runs on the first instance
  // that managed to get the memo, it waits for all the other instances
  // and then runs this query
  const {
    error,
    value,
    cached,
    getQueryFields,
  } = await runGetQueryFor({
    args: {},
    fields: requestFields,
    returnMemoryCachedValues: false,
    returnWorkerCachedValues: !denyCaches && !denyCacheWorker && !propsOrOptions.doNotUseCache,
    itemDefinition: idef,
    id: forId,
    version: forVersion,
    token: token,
    language: language,
    cacheStore: propsOrOptions.longTermCaching,
    cacheStoreMetadata: propsOrOptions.longTermCachingMetadata,
    cacheStoreMetadataMismatchAction: propsOrOptions.longTermCachingMetadataMismatchAction,
    waitAndMerge: propsOrOptions.waitAndMerge,
    currentKnownMetadata: currentMetadata,
  }, {
    remoteListener: remoteListener,
  });

  if (!error) {
    // we apply the value, whatever we have gotten this will affect all the instances
    // that use the same value, note that value can be null
    idef.applyValue(
      forId,
      forVersion,
      value,
      false,
      getQueryFields,
      true,
    );

    // and then we trigger the change listener for all the instances
    // we don't trigger our own listener
    idef.triggerListeners(
      "change", forId, forVersion, changeListener,
    );

    // we will do it by hand instead, once we set loaded to true

    // and if we have an externally checked property we do the external check
    // we need to ensure that our current item definition instance hasn't changed
    // its for id and for version while we were loading
    if (
      containsExternallyCheckedProperty &&
      propsOrOptions.enableExternalChecks &&
      forId === lastLoadingForIdRef.current &&
      forVersion === lastLoadingForVersionRef.current
    ) {
      setStateToCurrentValueWithExternalChecking(idef, setState, propsOrOptions, isProps, isUnmounted, lastUpdateId, null, changeListener);
    }
  }

  // if the item has been cached, as in returned from the indexed db database
  // rather than the server, we don't know if it's actually the current value
  // so we request feedback from the listener, the listener will kick a reload
  // event if it finds a mismatch which will cause this function to run again (see above)
  // but the denyCache flag will be active, ensuring the value will be requested
  // from the server
  if (cached && propsOrOptions.static !== "TOTAL") {
    remoteListener.requestFeedbackFor({
      itemDefinition: qualifiedPathName,
      id: forId,
      version: forVersion,
    });
  }

  return loadValueCompleted(idef, propsOrOptions, isProps, setState, isUnmounted,
    lastLoadingForIdRef, lastLoadingForVersionRef, lastLoadValuePromiseIsResolvedRef, lastLoadValuePromiseResolveRef, {
    value,
    error,
    cached,
    id: forId,
    version: forVersion,
  });
}

export interface ILoadCompletedPayload extends IActionResponseWithValue {
  cached: boolean;
}

function loadValueCompleted(
  idef: ItemDefinition,
  propsOrOptions: IItemProviderOptions | IActualItemProviderProps,
  isProps: boolean,
  setState: (v: Partial<IHookItemProviderState | IActualItemProviderState>) => void,
  isUnmounted: boolean,
  lastLoadingForIdRef: { current: string },
  lastLoadingForVersionRef: { current: string },
  lastLoadValuePromiseIsResolvedRef: { current: boolean },
  lastLoadValuePromiseResolveRef: { current: () => void },
  value: ILoadCompletedPayload,
): IActionResponseWithValue {
  // basically if it's unmounted, or what we were updating for does not match
  // what we are supposed to be updating for, this basically means load value got called once
  // again before the previous value managed to load, this can happen, when switching forId and/or
  // for version very rapidly
  const shouldNotUpdateState =
    isUnmounted ||
    value.id !== lastLoadingForIdRef.current ||
    value.version !== lastLoadingForVersionRef.current;

  // return immediately
  if (shouldNotUpdateState) {
    lastLoadValuePromiseIsResolvedRef.current = true;
    lastLoadValuePromiseResolveRef.current();

    const result = {
      value: value.value,
      error: value.error,
      cached: value.cached,
      id: value.id,
      version: value.version,
    };
    propsOrOptions.onLoad && propsOrOptions.onLoad(result);
    return result;
  }

  // so once everything has been completed this function actually runs per instance
  if (value.error) {
    // if we got an error we basically have no value
    !isUnmounted && setState({
      // set the load error and all the logical states, we are not loading
      // anymore
      loadError: value.error,
      loaded: false,
      isBlocked: false,
      isBlockedButDataIsAccessible: false,
      notFound: false,
      loading: false,
      itemState: getItemState(idef, propsOrOptions),
    });

    // load later when connection is available
    // unnecessary this is done already by the connection state listener
    // using the load error
    // if (
    //   !isUnmounted &&
    //   value.error.code === ENDPOINT_ERRORS.CANT_CONNECT &&
    //   !propsOrOptions.doNotAutomaticReloadIfCantConnect
    // ) {
    //   propsOrOptions.remoteListener.addOnConnectOnceListener(loadValue);
    // }
    // otherwise if there's no value, it means the item is not found
  } else if (!value.value) {
    // we mark it as so, it is not found
    !isUnmounted && isProps && setState({
      itemState: getItemState(idef, propsOrOptions),
      loadError: null,
      notFound: true,
      isBlocked: false,
      isBlockedButDataIsAccessible: false,
      loading: false,
      loaded: true,
    });
    !isUnmounted && !isProps && setState({
      loadError: null,
      notFound: true,
      isBlocked: false,
      isBlockedButDataIsAccessible: false,
      loading: false,
      loaded: true,
    });
  } else if (value.value) {
    // otherwise if we have a value, we check all these options
    !isUnmounted && isProps && setState({
      itemState: getItemState(idef, propsOrOptions),
      loadError: null,
      notFound: false,
      isBlocked: !!value.value.blocked_at,
      isBlockedButDataIsAccessible: value.value.blocked_at ? !!value.value.DATA : false,
      loading: false,
      loaded: true,
    });
    !isUnmounted && !isProps && setState({
      loadError: null,
      notFound: false,
      isBlocked: !!value.value.blocked_at,
      isBlockedButDataIsAccessible: value.value.blocked_at ? !!value.value.DATA : false,
      loading: false,
      loaded: true,
    });
  }

  lastLoadValuePromiseIsResolvedRef.current = true;
  lastLoadValuePromiseResolveRef.current();

  // now we return
  const result = {
    value: value.value,
    error: value.error,
    cached: value.cached,
    id: value.id,
    version: value.version,
  };
  propsOrOptions.onLoad && propsOrOptions.onLoad(result);
  return result;
}