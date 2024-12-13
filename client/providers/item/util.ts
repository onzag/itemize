import CacheWorkerInstance from "../../../client/internal/workers/cache";
import { IActionResponseWithSearchResults, IActionSearchOptions, IActualItemProviderState, IActualItemProviderProps, IPokeElementsType, PolicyPathType, IActionCleanOptions, IActionSubmitResponse, IActionResponseWithValue, ISearchItemValueContextType, IBasicFns, IActionDeleteOptions, IBasicActionResponse, IActionSubmitOptions } from ".";
import { IHookItemProviderState, IItemProviderOptions } from "./hook";
import ItemDefinition, { IItemSearchStateType, IItemStateType } from "../../../base/Root/Module/ItemDefinition";
import { DESTRUCTION_MARKERS_LOCATION, ENDPOINT_ERRORS, MEMCACHED_DESTRUCTION_MARKERS_LOCATION, MEMCACHED_SEARCH_DESTRUCTION_MARKERS_LOCATION, MEMCACHED_UNMOUNT_DESTRUCTION_MARKERS_LOCATION, MEMCACHED_UNMOUNT_SEARCH_DESTRUCTION_MARKERS_LOCATION, PREFIX_GET, PREFIX_SEARCH, SEARCH_DESTRUCTION_MARKERS_LOCATION, UNMOUNT_DESTRUCTION_MARKERS_LOCATION, UNMOUNT_SEARCH_DESTRUCTION_MARKERS_LOCATION, UNSPECIFIED_OWNER } from "../../../constants";
import uuid from "uuid";
import equals from "deep-equal";
import { PropertyDefinitionSearchInterfacesPrefixes } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces";
import { PropertyDefinitionSupportedType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import { IPropertySetterProps, IPropertyCoreProps, IPropertyBaseProps } from "../../../client/components/property/base";
import PropertyDefinition, { IPropertyDefinitionState } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { Location } from "history";
import {
  getFieldsAndArgs, runGetQueryFor, runDeleteQueryFor, runEditQueryFor, runAddQueryFor, runSearchQueryFor, IIncludeOverride,
  IPropertyOverride, ICacheMetadataMismatchAction, ISearchCacheMetadataMismatchAction, reprocessQueryArgumentsForFiles, getPropertyListForSearchMode, SearchCacheMetadataMismatchActionFn, getPropertyListDefault
} from "../../internal/rq-client-util";
import { IRemoteListenerRecordsCallbackArg, RemoteListener } from "../../../client/internal/app/remote-listener";
import { EndpointErrorType } from "../../../base/errors";
import { requestFieldsAreContained } from "../../../rq-util";
import { ICacheMetadataMatchType } from "../../../client/internal/workers/cache/cache.worker.class";
import { setHistoryQSState, setHistoryState } from "../../components/navigation";
import Include, { IncludeExclusionState } from "../../../base/Root/Module/ItemDefinition/Include";
import { blobToTransferrable } from "../../../util";
import { IRQRequestFields, IRQValue } from "../../../rq-querier";
import { IConfigRawJSONDataType } from "../../../config";

const isDevelopment = process.env.NODE_ENV === "development";

export function getPropertyFromCoreRule(baseRule: string | IPropertyBaseProps, itemDefinition: ItemDefinition) {
  const rule: IPropertyBaseProps = typeof baseRule === "string" ? {id: baseRule} : baseRule; 
  let actualId: string = rule.id;
  if (rule.searchVariant) {
    actualId = PropertyDefinitionSearchInterfacesPrefixes[rule.searchVariant.toUpperCase().replace("-", "_")] + rule.id;
  }
  if (rule.policyName && rule.policyType) {
    return itemDefinition.getPropertyDefinitionForPolicy(rule.policyType, rule.policyName, actualId);
  }
  if (rule.include) {
    const include = itemDefinition.getIncludeFor(rule.include);
    return include.getSinkingPropertyFor(actualId);
  }
  return itemDefinition.getPropertyDefinitionFor(actualId, true);
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
    itemState: getItemState(idef, propsOrOptions),
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

export function onPropertyEnforce(
  idef: ItemDefinition,
  options: IItemProviderOptions | IActualItemProviderProps,
  isCMounted: boolean,
  property: PropertyDefinition | string | IPropertyCoreProps,
  value: PropertyDefinitionSupportedType,
  givenForId: string,
  givenForVersion: string,
  performSearch: (options: IActionSearchOptions) => void,
  parentInstanceTrack: any,
  internal?: boolean,
  // doNotCleanSearchState?: boolean,
) {
  const actualProperty = property instanceof PropertyDefinition ?
    property : getPropertyFromCoreRule(property, idef);

  // this function is basically run by the setter
  // since they might be out of sync that's why the id is passed
  // the setter enforces values
  actualProperty.setSuperEnforced(givenForId || null, givenForVersion || null, value, parentInstanceTrack);
  // !doNotCleanSearchState && options.itemDefinitionInstance.cleanSearchState(options.forId || null, options.forVersion || null);
  onPropertyEnforceOrClearFinal(idef, options, isCMounted, givenForId, givenForVersion, performSearch, internal);
};

export function onPropertyClearEnforce(
  idef: ItemDefinition,
  options: IItemProviderOptions | IActualItemProviderProps,
  isCMounted: boolean,
  property: PropertyDefinition | string | IPropertyCoreProps,
  givenForId: string,
  givenForVersion: string,
  performSearch: (options: IActionSearchOptions) => void,
  parentInstanceTrack: any,
  internal?: boolean,
) {
  const actualProperty = property instanceof PropertyDefinition ?
    property : getPropertyFromCoreRule(property, idef);
  // same but removes the enforcement
  actualProperty.clearSuperEnforced(givenForId || null, givenForVersion || null, parentInstanceTrack);
  // options.itemDefinitionInstance.cleanSearchState(options.forId || null, options.forVersion || null);
  onPropertyEnforceOrClearFinal(idef, options, isCMounted, givenForId, givenForVersion, performSearch, internal);
};

export function installSetters(
  idef: ItemDefinition,
  options: IItemProviderOptions | IActualItemProviderProps,
  isCMounted: boolean,
  performSearch: (options: IActionSearchOptions) => void,
  parentInstanceTrack: any,
) {
  if (options.setters) {
    options.setters.forEach((setter) => {
      const property = getPropertyFromCoreRule(setter, idef);
      onPropertyEnforce(idef, options, isCMounted, property, setter.value, options.forId || null, options.forVersion || null, performSearch, parentInstanceTrack, true);
    });
  }
};

export function removeSetters(
  idef: ItemDefinition,
  options: IItemProviderOptions | IActualItemProviderProps,
  isCMounted: boolean,
  performSearch: (options: IActionSearchOptions) => void,
  parentInstanceTrack: any,
) {
  if (options.setters) {
    options.setters.forEach((setter) => {
      const property = getPropertyFromCoreRule(setter, idef);
      onPropertyClearEnforce(idef, options, isCMounted, property, options.forId || null, options.forVersion || null, performSearch, parentInstanceTrack, true);
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
      const property = getPropertyFromCoreRule(prefill, idef);
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
  // let's make this variable to check on whether things are invalid or not
  // first we check every property, that is included and allowed we use some
  // and return whether it's invalid
  const allIncludedPropertiesValid = options.properties.every((pId) => {
    // ignore if it is within an override
    if (options.propertyOverrides && options.propertyOverrides.find((override) => override.id === pId)) {
      return true;
    }

    // first lets try to get the state for the current state if any
    let p = state.itemState.properties.find((p) => p.propertyId === pId);
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

    const i = state.itemState.includes.find((i) => i.includeId === iId);
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
    const propertyInPolicy = state.itemState.policies[policyType][policyName]
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
  state: {readonly current: IHookItemProviderState | IActualItemProviderState},
  setState: (v: Partial<IHookItemProviderState | IActualItemProviderState>, cb?: () => void) => void,
  initialAutomaticNextSearchRef: { current: boolean },
  reloadNextSearchRef: { current: boolean },
  preventSearchFeedbackOnPossibleStaleDataRef: { current: boolean },
  activeSearchPromiseAwaiterRef: { current: string },
  activeSearchPromiseRef: { current: Promise<{ response: IActionResponseWithSearchResults, options: IActionSearchOptions }> },
  activeSearchOptionsRef: { current: IActionSearchOptions },
  activeSubmitPromiseAwaiterRef: { current: string },
  internalSearchDestructionMarkersRef: { current: Array<[string, string, string, [string, string, string], [string, string]]> },
  isUnmountedRef: { current: boolean },
  blockIdCleanRef: { current: string },
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

  if (state.current.searching || activeSearchPromiseRef.current) {
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
  const isValid = checkItemStateValidity(idef, propsOrOptions, state.current, {
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
    if (!isUnmountedRef.current) {
      setState({
        pokedElements,
      });
    }
    cleanWithProps(idef, propsOrOptions, isUnmountedRef.current, blockIdCleanRef.current, options, "fail", setState);
    const result = giveEmulatedInvalidError(
      idef,
      propsOrOptions,
      setState,
      isUnmountedRef.current,
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

  if (listenPolicy !== state.current.searchListenPolicy) {
    // the listener is bad altogether
    removePossibleSearchListeners(
      idef,
      remoteListener,
      state.current,
      onSearchReload,
    );
  } else {
    if (listenPolicy.includes("owner")) {
      if (options.createdBy !== state.current.searchOwner) {
        // this search listener is bad because the search
        // owner has changed, and the previously registered listener
        // if any does not match the owner, remember the search owner is the created by
        // value, and we are now redoing the search, and we might have a search listener
        // registered already for this search if that is the case
        removePossibleSearchListeners(
          idef,
          remoteListener,
          state.current,
          onSearchReload,
        );
      }
    }

    if (listenPolicy.includes("parent")) {
      // we basically do the exact same here, same logic
      if (!equals(searchParent, state.current.searchParent, { strict: true })) {
        // this search listener is bad because the search
        // parent has changed, and the previously registered listener
        // if any does not match the owner
        removePossibleSearchListeners(
          idef,
          remoteListener,
          state.current,
          onSearchReload,
        );
      }
    }

    if (listenPolicy.includes("property")) {
      if (!equals(searchCacheUsesProperty, state.current.searchCacheUsesProperty, { strict: true })) {
        removePossibleSearchListeners(
          idef,
          remoteListener,
          state.current,
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
  if (!isUnmountedRef.current) {
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

    if (!isUnmountedRef.current) {
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
    cleanWithProps(idef, propsOrOptions, isUnmountedRef.current, blockIdCleanRef.current, options, "fail", setState);
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

    if (!isUnmountedRef.current) {
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
    cleanWithProps(idef, propsOrOptions, isUnmountedRef.current, blockIdCleanRef.current, options, "success", setState);
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
  isUnmountedRef: { current: boolean },
  lastUpdateIdRef: { current: number },
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
  if (currentUpdateId === null || lastUpdateIdRef.current === currentUpdateId) {
    // we set the state to the new state
    if (!isUnmountedRef.current) {
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
  state: {readonly current: IHookItemProviderState | IActualItemProviderState},
  setState: (v: Partial<IHookItemProviderState | IActualItemProviderState>, cb?: () => void) => void,
  remoteListener: RemoteListener,
  isCMountedRef: { current: boolean },
  mountCbFns: { current: Array<() => void> },
  changedSearchListenerLastCollectedSearchIdRef: { current: { id: string } },
  initialAutomaticNextSearchRef: { current: boolean },
  isUnmountedRef: { current: boolean },
  internalUUID: string,
  lastUpdateIdRef: { current: number },
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
    setStateToCurrentValueWithExternalChecking(idef, setState, propsOrOptions, isUnmountedRef, lastUpdateIdRef, null, changeListener);
  }

  const listenersSetup = () => {
    const currentSearch = state.current;

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
      changedSearchListenerLastCollectedSearchIdRef.current.id : state.current.searchId;

    if (
      // no search id at all, not in the state, not on the changed listener, nowhere
      (!searchIdToCheckAgainst) ||
      // search is forced and we didn't load from location
      (propsOrOptions.automaticSearchForce && state.current.searchWasRestored !== "FROM_LOCATION") ||
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
    const searchState = getSearchStateOf(state.current);
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
    mountOrUpdateIdefForTesting(idef, propsOrOptions, state.current, internalUUID);
  }

  // and we attempt to load the current value
  if (!propsOrOptions.avoidLoading) {
    await loadValue();
  }

  if (propsOrOptions.loadStoredState) {
    const loc = getStoredStateLocation(propsOrOptions.loadStoredState, propsOrOptions.forId, propsOrOptions.forVersion);
    await loadStoredState(idef, propsOrOptions, setState, changeListener, basicFnsRetriever, loc);
    // setupStoredStateListener(loc);
  }

  if (isDevelopment) {
    installDoubleSlotter(idef, propsOrOptions);
  }
}

export interface IStoredStateLocation { id: string; version: string };

export async function loadStoredState(
  idef: ItemDefinition,
  propsOrOptions: IItemProviderOptions | IActualItemProviderProps,
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

      setState({
        itemState: getItemState(idef, propsOrOptions),
      }, () => {
        propsOrOptions.onStateLoadedFromStore && propsOrOptions.onStateLoadedFromStore(storedState, metadata, basicFnsRetriever());
      });
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
  state: {readonly current: IHookItemProviderState | IActualItemProviderState},
  setState: (v: Partial<IHookItemProviderState | IActualItemProviderState>) => void,
  remoteListener: RemoteListener,
  lastLoadingForIdRef: { current: string },
  lastLoadingForVersionRef: { current: string },
  lastLoadValuePromiseIsResolvedRef: { current: boolean },
  lastLoadValuePromiseRef: { current: Promise<void> },
  lastLoadValuePromiseResolveRef: { current: () => void },
  isUnmountedRef: { current: boolean },
  token: string,
  language: string,
  lastUpdateIdRef: { current: number },
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
    if ((state.current.loading || state.current.loaded || state.current.loadError) && !isUnmountedRef.current) {
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
    if (!isUnmountedRef.current) {
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
        mountOrUpdateIdefForTesting(idef, propsOrOptions, state.current, internalUUID, true);
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

      return loadValueCompleted(idef, propsOrOptions, setState, isUnmountedRef.current,
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
  if (!state.current.loading && !isUnmountedRef.current) {
    setState({
      loading: true,
      loaded: false,
    });
  } else if (!isUnmountedRef.current) {
    setState({
      loaded: false,
    });
  }

  if (isUnmountedRef.current) {
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
      setStateToCurrentValueWithExternalChecking(idef, setState, propsOrOptions, isUnmountedRef, lastUpdateIdRef, null, changeListener);
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

  return loadValueCompleted(idef, propsOrOptions, setState, isUnmountedRef.current,
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
    !isUnmounted && setState({
      itemState: getItemState(idef, propsOrOptions),
      loadError: null,
      notFound: true,
      isBlocked: false,
      isBlockedButDataIsAccessible: false,
      loading: false,
      loaded: true,
    });
  } else if (value.value) {
    // otherwise if we have a value, we check all these options
    !isUnmounted && setState({
      itemState: getItemState(idef, propsOrOptions),
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


export function setupListeners(
  idef: ItemDefinition,
  propsOrOptions: IItemProviderOptions | IActualItemProviderProps,
  remoteListener: RemoteListener,
  changeListener: () => void,
  loadListener: () => void,
  changeSearchListener: () => void,
  reloadListener: () => void,
  parentInstanceTrack: any,
) {
  /// first the change listener that checks for every change event that happens with the state
  idef.addListener(
    "change", propsOrOptions.forId || null, propsOrOptions.forVersion || null, changeListener,
  );
  idef.addListener(
    "load", propsOrOptions.forId || null, propsOrOptions.forVersion || null, loadListener,
  );

  // the search change listener
  if (idef.isInSearchMode()) {
    idef.addListener(
      "search-change", propsOrOptions.forId || null, propsOrOptions.forVersion || null, changeSearchListener,
    );
  }

  // second are the remote listeners, only when there's an id defined
  if (propsOrOptions.forId && !propsOrOptions.searchCounterpart) {
    // one is the reload, this gets called when the value of the field has differed from the one that
    // we have gotten (or have cached) this listener is very important for that reason, otherwise our app
    // will get frozen in the past
    idef.addListener(
      "reload", propsOrOptions.forId, propsOrOptions.forVersion || null, reloadListener,
    );

    if (!propsOrOptions.static) {
      // note how we used the item definition instance and that's because those events are piped from
      // within this remote listener, the remote listener pipes the events from the websocket
      // and triggers them in within the item definition instance; that's because the server just says what it does
      // it says "this has been deleted" or "this element has changed" or "the last time this element was changed was"
      // so the remote listener job is to check how does it compare to what we have in our application state
      // do the dates match?... do we even have a value for it?... etc... adding remote listeners is heavy
      // as it will send data either via HTTP or websockets
      remoteListener.addItemDefinitionListenerFor(
        parentInstanceTrack,
        idef.getQualifiedPathName(),
        propsOrOptions.forId,
        propsOrOptions.forVersion || null,
        propsOrOptions.slowPolling,
      );
    }
  }
}
export function unSetupListeners(
  idef: ItemDefinition,
  propsOrOptions: IItemProviderOptions | IActualItemProviderProps,
  state: IActualItemProviderState | IHookItemProviderState,
  remoteListener: RemoteListener,
  changeListener: () => void,
  loadListener: () => void,
  changeSearchListener: () => void,
  reloadListener: () => void,
  onSearchReload: (arg: IRemoteListenerRecordsCallbackArg) => void,
  parentInstanceTrack: any,
) {
  removePossibleSearchListeners(
    idef,
    remoteListener,
    state,
    onSearchReload,
  );

  // here we just remove the listeners that we have setup
  idef.removeListener(
    "change", propsOrOptions.forId || null, propsOrOptions.forVersion || null, changeListener,
  );
  idef.removeListener(
    "load", propsOrOptions.forId || null, propsOrOptions.forVersion || null, loadListener,
  );

  if (idef.isInSearchMode()) {
    idef.removeListener(
      "search-change", propsOrOptions.forId || null, propsOrOptions.forVersion || null, changeSearchListener,
    );
  }

  if (propsOrOptions.forId) {
    // remove all the remote listeners
    idef.removeListener(
      "reload", propsOrOptions.forId, propsOrOptions.forVersion || null, reloadListener,
    );

    if (!propsOrOptions.static) {
      remoteListener.removeItemDefinitionListenerFor(
        parentInstanceTrack,
        idef.getQualifiedPathName(),
        propsOrOptions.forId,
        propsOrOptions.forVersion || null,
      );
    }
  }
}

// componentDidUpdate breakdown
function onDidUpdateSearchState(
  currentSearchState: IItemSearchStateType,
  prevSearchState: IItemSearchStateType,
  propsOrOptions: IItemProviderOptions | IActualItemProviderProps,
) {
  if (
    propsOrOptions.onSearchStateChange
  ) {
    if (!equals(currentSearchState, prevSearchState, { strict: true })) {
      propsOrOptions.onSearchStateChange(currentSearchState);
    }
  }
}
export async function didUpdate(
  prevIdef: ItemDefinition,
  idef: ItemDefinition,
  prevPropsOrOptions: IItemProviderOptions | IActualItemProviderProps,
  prevState: IActualItemProviderState | IHookItemProviderState,
  propsOrOptions: IItemProviderOptions | IActualItemProviderProps,
  prevUser: {
    id: string,
    role: string,
    token: string,
  },
  user: {
    id: string,
    role: string,
    token: string,
  },
  state: {readonly current: IActualItemProviderState | IHookItemProviderState},
  setState: (v: Partial<IHookItemProviderState | IActualItemProviderState>) => void,
  blockIdCleanRef: { current: string },
  storeStateTimeoutRef: { current: any },
  internalSearchDestructionMarkersRef: { current: Array<[string, string, string, [string, string, string], [string, string]]> },
  isCMountedRef: { current: boolean },
  internalUUID: string,
  location: Location<any>,
  remoteListener: RemoteListener,
  isUnmountedRef: { current: boolean },
  lastUpdateIdRef: { current: number },
  search: (options: IActionSearchOptions) => void,
  load: () => Promise<IActionResponseWithValue>,
  reloadListener: () => void,
  loadListener: () => void,
  changeListener: () => void,
  changeSearchListener: () => void,
  onSearchReload: (arg: IRemoteListenerRecordsCallbackArg) => void,
  basicFnsRetriever: () => IBasicFns,
  parentInstanceTrack: any,
) {
  let currentSearch: IItemSearchStateType = state.current;
  let prevSearchState: IItemSearchStateType = prevState;

  if (
    propsOrOptions.onSearchStateChange
  ) {
    const currentStateCleaned = getSearchStateOf(currentSearch as any);
    const prevSearchStateCleaned = getSearchStateOf(prevSearchState as any);

    onDidUpdateSearchState(
      currentStateCleaned,
      prevSearchStateCleaned,
      propsOrOptions,
    );
  }

  // whether the item definition was updated
  // and changed
  const itemDefinitionWasUpdated = idef !== prevIdef;
  const uniqueIDChanged = (prevPropsOrOptions.forId || null) !== (propsOrOptions.forId || null) ||
    (prevPropsOrOptions.forVersion || null) !== (propsOrOptions.forVersion || null);
  const didSomethingThatInvalidatedSetters =
    !equals(propsOrOptions.setters, prevPropsOrOptions.setters, { strict: true }) ||
    uniqueIDChanged ||
    itemDefinitionWasUpdated;
  const didSomethingThatInvalidatedPrefills =
    !equals(propsOrOptions.prefills, prevPropsOrOptions.prefills, { strict: true }) ||
    uniqueIDChanged ||
    itemDefinitionWasUpdated;

  if (itemDefinitionWasUpdated || uniqueIDChanged) {
    releaseCleanupBlock(blockIdCleanRef, prevIdef, prevPropsOrOptions);
    blockCleanup(blockIdCleanRef, idef, propsOrOptions);
  }

  // if the mark for destruction has changed in a meaningful way
  // we recheck it
  if (
    (
      itemDefinitionWasUpdated ||
      uniqueIDChanged
    ) || (
      propsOrOptions.markForDestructionOnLogout !== prevPropsOrOptions.markForDestructionOnLogout
    ) || (
      propsOrOptions.markForDestructionOnUnmount !== prevPropsOrOptions.markForDestructionOnUnmount
    )
  ) {
    if (typeof propsOrOptions.markForDestructionOnLogout !== "undefined" && propsOrOptions.markForDestructionOnLogout !== null) {
      if (propsOrOptions.markForDestructionOnLogout) {
        markForDestruction(idef, false, false, propsOrOptions);
      } else {
        markForDestruction(idef, false, true, propsOrOptions);
      }
    }

    if (typeof propsOrOptions.markForDestructionOnUnmount !== "undefined" && propsOrOptions.markForDestructionOnUnmount !== null) {
      if (propsOrOptions.markForDestructionOnUnmount) {
        markForDestruction(idef, false, false, propsOrOptions);
      } else {
        markForDestruction(idef, false, true, propsOrOptions);
      }
    }
  }

  if (window.TESTING && process.env.NODE_ENV === "development") {
    mountOrUpdateIdefForTesting(
      idef,
      propsOrOptions,
      state.current,
      internalUUID,
    );
  }

  if (didSomethingThatInvalidatedSetters) {
    removeSetters(prevIdef, prevPropsOrOptions, isCMountedRef.current, search, parentInstanceTrack);
    installSetters(idef, propsOrOptions, isCMountedRef.current, search, parentInstanceTrack);
  }

  if (didSomethingThatInvalidatedPrefills) {
    installPrefills(idef, propsOrOptions, location);
  }

  // now if the id changed, the optimization flags changed, or the item definition
  // itself changed
  if (
    itemDefinitionWasUpdated ||
    uniqueIDChanged ||
    didSomethingThatInvalidatedSetters ||
    didSomethingThatInvalidatedPrefills ||
    !equals(prevPropsOrOptions.properties || [], propsOrOptions.properties || [], { strict: true }) ||
    !equals(prevPropsOrOptions.includes || [], propsOrOptions.includes || [], { strict: true }) ||
    !!prevPropsOrOptions.static !== !!propsOrOptions.static ||
    !!prevPropsOrOptions.includePolicies !== !!propsOrOptions.includePolicies
  ) {
    // now we have to check on whether the current state is static
    // or not
    const isStatic = propsOrOptions.static;
    // compared to the previous
    const wasStatic = prevPropsOrOptions.static;

    // if it's now static and it was not static before, we got to remove
    // the remote listeners, note that listeners are only added with an id
    // so we check for that as well
    let alreadyRemovedRemoteListeners: boolean = false;
    let alreadyAddedRemoteListeners: boolean = false;
    if (isStatic && !wasStatic && prevPropsOrOptions.forId) {
      // we mark the flag as true
      alreadyRemovedRemoteListeners = true;
      // and remove the listeners
      prevIdef.removeListener(
        "reload", prevPropsOrOptions.forId, prevPropsOrOptions.forVersion, reloadListener,
      );
      remoteListener.removeItemDefinitionListenerFor(
        parentInstanceTrack, prevIdef.getQualifiedPathName(),
        prevPropsOrOptions.forId, prevPropsOrOptions.forVersion || null,
      );
    } else if (!isStatic && wasStatic && propsOrOptions.forId) {
      alreadyAddedRemoteListeners = true;
      idef.addListener(
        "reload", propsOrOptions.forId, propsOrOptions.forVersion || null, reloadListener,
      );
      remoteListener.addItemDefinitionListenerFor(
        parentInstanceTrack, idef.getQualifiedPathName(),
        propsOrOptions.forId, propsOrOptions.forVersion || null,
        propsOrOptions.slowPolling,
      );
    }

    // if this was an item definition or id update
    if (
      itemDefinitionWasUpdated ||
      uniqueIDChanged
    ) {
      // we need to remove the old listeners
      prevIdef.removeListener(
        "change", prevPropsOrOptions.forId || null, prevPropsOrOptions.forVersion || null, changeListener,
      );
      prevIdef.removeListener(
        "load", prevPropsOrOptions.forId || null, prevPropsOrOptions.forVersion || null, loadListener,
      );
      if (prevIdef.isInSearchMode()) {
        prevIdef.removeListener(
          "search-change", prevPropsOrOptions.forId || null, prevPropsOrOptions.forVersion || null, changeSearchListener,
        );
      }
      // we only remove this listeners if we haven't done it before for other reasons
      if (prevPropsOrOptions.forId && !wasStatic && !alreadyRemovedRemoteListeners) {
        prevIdef.removeListener(
          "reload", prevPropsOrOptions.forId, prevPropsOrOptions.forVersion || null, reloadListener,
        );
        remoteListener.removeItemDefinitionListenerFor(
          parentInstanceTrack, prevIdef.getQualifiedPathName(),
          prevPropsOrOptions.forId, prevPropsOrOptions.forVersion || null,
        );
      }

      // add the new listeners
      idef.addListener(
        "change", propsOrOptions.forId || null, propsOrOptions.forVersion || null, changeListener,
      );
      idef.addListener(
        "load", propsOrOptions.forId || null, propsOrOptions.forVersion || null, loadListener,
      );
      if (idef.isInSearchMode()) {
        idef.addListener(
          "search-change", propsOrOptions.forId || null, propsOrOptions.forVersion || null, changeSearchListener,
        );
      }
      if (propsOrOptions.forId && !isStatic && !alreadyAddedRemoteListeners) {
        idef.addListener(
          "reload", propsOrOptions.forId, propsOrOptions.forVersion || null, reloadListener,
        );
        remoteListener.addItemDefinitionListenerFor(
          parentInstanceTrack, idef.getQualifiedPathName(),
          propsOrOptions.forId,
          propsOrOptions.forVersion || null,
          propsOrOptions.slowPolling,
        );
      }
    }

    // we set the value given we have changed the forId with the new optimization flags
    if (!isUnmountedRef.current) {
      setState({
        itemState: getItemState(idef, propsOrOptions),
      });
    }

    // and run the external check
    if (idef.containsAnExternallyCheckedProperty() && propsOrOptions.enableExternalChecks) {
      setStateToCurrentValueWithExternalChecking(idef, setState, propsOrOptions, isUnmountedRef, lastUpdateIdRef, null, changeListener);
    }
  }

  // if the id has changed or the item defintion was changed
  // or the role, which affects how things are fetch or the ownership
  // assumption, we need to reload the values if it's so necessary
  if (
    (prevPropsOrOptions.forId || null) !== (propsOrOptions.forId || null) ||
    (prevPropsOrOptions.forVersion || null) !== (propsOrOptions.forVersion || null) ||
    prevUser.id !== user.id ||
    prevUser.role !== user.role ||
    itemDefinitionWasUpdated ||
    !equals(prevPropsOrOptions.longTermCachingMetadata, propsOrOptions.longTermCachingMetadata, { strict: true })
  ) {
    if (!propsOrOptions.avoidLoading) {
      await load();
    }
  }

  const currentStoredStateLocation = getStoredStateLocation(prevPropsOrOptions.loadStoredState || null, prevPropsOrOptions.forId || null, prevPropsOrOptions.forVersion || null);
  const nextStoredStateLocation = getStoredStateLocation(propsOrOptions.loadStoredState || null, propsOrOptions.forId || null, propsOrOptions.forVersion || null);

  if (
    !equals(currentStoredStateLocation, nextStoredStateLocation, { strict: true })
  ) {
    await loadStoredState(
      idef,
      propsOrOptions,
      setState,
      changeListener,
      basicFnsRetriever,
      nextStoredStateLocation,
    );
  }

  // no search id for example if the slot changed during
  // an update of forId and forVersion and as a result
  // the search is empty in this slot
  if (!currentSearch.searchId || currentSearch.searchId !== prevSearchState.searchId) {
    if (!currentSearch.searchId) {
      removePossibleSearchListeners(prevIdef, remoteListener, prevState, onSearchReload);
    } else {
      // check for differences that demand a refreshment
      const ownerChanged = currentSearch.searchOwner !== prevSearchState.searchOwner;
      const parentChanged = !equals(currentSearch.searchParent, prevSearchState.searchParent, { strict: true });
      const propertyChanged = !equals(currentSearch.searchCacheUsesProperty, prevSearchState.searchCacheUsesProperty, { strict: true });

      if (ownerChanged || parentChanged || propertyChanged) {
        removePossibleSearchListeners(prevIdef, remoteListener, prevState, onSearchReload);
        // only request feedback if this was a loaded state that came from the state
        searchListenersSetup(idef, remoteListener, onSearchReload, currentSearch, state.current.searchWasRestored === "FROM_STATE");
      }
    }
  }

  // when get derived made it so that it loaded a new search state because
  // we have a new item definition slot id or anything
  // and we need to invalidate those search results that we got
  const getDerivedTriggeredASearchChange = state.current.searchWasRestored !== "NO" && (
    itemDefinitionWasUpdated || uniqueIDChanged ||
    (
      (
        location &&
        location.state &&
        location.state[propsOrOptions.loadSearchFromNavigation] &&
        location.state[propsOrOptions.loadSearchFromNavigation].searchId !== prevSearchState.searchId
      )
    )
  )

  if (
    // if the automatic search is not setup to just initial
    !propsOrOptions.automaticSearchIsOnlyInitial &&
    // if automatic search is only fallback there must not be an active search id as well
    (propsOrOptions.automaticSearchIsOnlyFallback ? !state.current.searchId : true) &&
    // if there was previously an automatic search
    (
      (
        prevPropsOrOptions.automaticSearch &&
        (
          isSearchUnequal(propsOrOptions.automaticSearch, prevPropsOrOptions.automaticSearch) ||
          // these two would cause search results to be dismissed because
          // the fact the token is a key part of the search itself so we would
          // dismiss the search in such a case as the token is different
          // that or the automatic search would be reexecuted
          itemDefinitionWasUpdated ||
          didSomethingThatInvalidatedSetters ||
          didSomethingThatInvalidatedPrefills ||
          prevUser.token !== user.token ||

          // no search id for example if the slot changed during
          // an update of forId and forVersion and as a result
          // the search is empty in this slot
          state.current.searchId === null
        )
      ) ||
      (!prevPropsOrOptions.automaticSearch && propsOrOptions.automaticSearch)
    ) && !state.current.searching
  ) {
    // maybe there's no new automatic search
    if (propsOrOptions.automaticSearch && !propsOrOptions.automaticSearch.clientDisabled) {
      // always perform the search even if there's a state
      if (propsOrOptions.automaticSearchForce || state.current.searchId === null) {
        search(propsOrOptions.automaticSearch);
      } else {
        // so knowing that let's check wether it loaded a search state that is currently active
        // well it must be because state.searchId must be something right now
        // so now we can assume getDerived loaded something into the search
        if (getDerivedTriggeredASearchChange) {
          propsOrOptions.onSearchStateLoaded && propsOrOptions.onSearchStateLoaded(getSearchStateOf(state.current));
        } else {
          // otherwise we automatically search
          search(propsOrOptions.automaticSearch);
        }
      }
    } else if (!propsOrOptions.automaticSearchDoNotAutoDismissDuringChanges) {
      dismissSearchResults(idef, remoteListener, state.current, setState, isUnmountedRef.current, onSearchReload);
    }
  } else if (getDerivedTriggeredASearchChange && state.current.searchId) {
    propsOrOptions.onSearchStateLoaded && propsOrOptions.onSearchStateLoaded(getSearchStateOf(state.current));
  }

  // this is a different instance, we consider it dismounted
  if (
    (prevPropsOrOptions as IActualItemProviderProps).mountId !== (propsOrOptions as IActualItemProviderProps).mountId
  ) {
    runDismountOn(
      prevIdef,
      prevPropsOrOptions,
      isUnmountedRef.current,
      blockIdCleanRef.current,
      setState,
      internalSearchDestructionMarkersRef,
    );
  }

  // expensive but necessary
  if (
    !itemDefinitionWasUpdated && !uniqueIDChanged && (
      (
        (propsOrOptions as IActualItemProviderProps).onStateChange ||
        (
          propsOrOptions.storeStateOnChange &&
          // won't use polyfills for storing states as that's just downright dangerous
          CacheWorkerInstance.isSupportedAsWorker
        )
      ) &&
      !equals(state.current.itemState, state.current.itemState, { strict: true })
    )
  ) {
    propsOrOptions.onStateChange && propsOrOptions.onStateChange(state.current.itemState, prevState.itemState);

    if (propsOrOptions.storeStateOnChange) {
      clearTimeout(storeStateTimeoutRef.current);
      storeStateTimeoutRef.current = setTimeout(storeStateDelayed.bind(null, idef, propsOrOptions, state), 600);
    }
  }

  if (process.env.NODE_ENV === "development") {
    const slotId = idef.getQualifiedPathName() + "." + (propsOrOptions.forId || "") + "." + (propsOrOptions.forVersion || "");
    const prevSlotId = prevIdef.getQualifiedPathName() + "." + (prevPropsOrOptions.forId || "") + "." + (prevPropsOrOptions.forVersion || "");
    if (slotId !== prevSlotId) {
      removeDoubleSlotter(prevIdef, prevPropsOrOptions);
      installDoubleSlotter(idef, propsOrOptions);
    }
  }
}

export function runDismountOn(
  idef: ItemDefinition,
  propsOrOptions: IItemProviderOptions | IActualItemProviderProps,
  isUnmounted: boolean,
  blockIdClean: string,
  setState: (v: Partial<IHookItemProviderState | IActualItemProviderState>) => void,
  internalSearchDestructionMarkersRef: { current: Array<[string, string, string, [string, string, string], [string, string]]> },
) {
  // when unmounting we check our optimization flags to see
  // if we are expecting to clean up the memory cache
  if (propsOrOptions.cleanOnDismount) {
    if (typeof propsOrOptions.cleanOnDismount === "boolean") {
      idef.cleanValueFor(propsOrOptions.forId || null, propsOrOptions.forVersion || null);
      // this will affect other instances that didn't dismount
      idef.triggerListeners(
        "change", propsOrOptions.forId || null, propsOrOptions.forVersion || null,
      );

      if (idef.isInSearchMode()) {
        idef.cleanSearchState(propsOrOptions.forId || null, propsOrOptions.forVersion || null);
        idef.triggerListeners("search-change", propsOrOptions.forId || null, propsOrOptions.forVersion || null);
      }
    } else {
      cleanWithProps(idef, propsOrOptions, isUnmounted, blockIdClean, propsOrOptions.cleanOnDismount, "success", setState, false);
    }
  }

  // executing destruction marker for self
  if (propsOrOptions.markForDestructionOnUnmount && propsOrOptions.forId) {
    const qualifiedName = idef.getQualifiedPathName();
    (async () => {
      const status = await CacheWorkerInstance.instance.deleteCachedValue(PREFIX_GET + qualifiedName, propsOrOptions.forId, propsOrOptions.forVersion || null);
      if (status) {
        // unmark destruction
        markForDestruction(idef, true, true, propsOrOptions);
      }
    })();
  }

  if (internalSearchDestructionMarkersRef.current && internalSearchDestructionMarkersRef.current.length) {
    // executing destruction markers for search
    internalSearchDestructionMarkersRef.current.forEach(async (m, index) => {
      const status = await CacheWorkerInstance.instance.deleteCachedSearch(
        PREFIX_SEARCH + m[1], //qualified path name
        m[0] as any, // by-
        m[2], // created by
        m[3], // parent
        m[4], // property
      );

      if (status) {
        // remove it from the destruction marker
        markSearchForDestruction(m[0] as any, m[1], m[2], m[3], m[4], true, true);
      }
    });
  }
}

export async function storeStateDelayed(
  idef: ItemDefinition,
  propsOrOptions: IItemProviderOptions | IActualItemProviderProps,
  state: {readonly current: IActualItemProviderState | IHookItemProviderState},
) {
  if (propsOrOptions.storeStateOnChange && CacheWorkerInstance.isSupportedAsWorker) {
    const location = getStoredStateLocation(propsOrOptions.storeStateOnChange, propsOrOptions.forId, propsOrOptions.forVersion);
    const serializable = ItemDefinition.getSerializableState(state.current.itemState, null, propsOrOptions.storeStateOnChangeApplyEnforced);
    const metadataSource = state.current.itemState &&
      state.current.itemState.rqOriginalFlattenedValue &&
      (state.current.itemState.rqOriginalFlattenedValue as any);
    const stateWasStored = await CacheWorkerInstance.instance.storeState(
      idef.getQualifiedPathName(),
      location.id,
      location.version,
      serializable,
      {
        overwriteLastModified: (metadataSource && metadataSource.last_modified) || null,
        overwriteId: (metadataSource && metadataSource.id) || null,
        overwriteVersion: (metadataSource && metadataSource.version) || null,
        overwriteType: (metadataSource && metadataSource.type) || null,
      }
    );

    if (stateWasStored) {
      propsOrOptions.onStateStored && propsOrOptions.onStateStored(state.current.itemState);
    } else {
      propsOrOptions.onStateStoreFailed && propsOrOptions.onStateStoreFailed(state.current.itemState);
    }
  }
}

export function reloadListener(
  idef: ItemDefinition,
  propsOrOptions: IItemProviderOptions | IActualItemProviderProps,
  isCMounted: boolean,
  mountCbFns: { current: Array<() => void> },
  reloadListener: () => void,
  reloadListenerTimeout: { current: any },
  loadValueWDenyCaches: () => void,
) {
  if (!isCMounted) {
    if (mountCbFns.current.indexOf(reloadListener) === -1) {
      mountCbFns.current.push(reloadListener);
    }
    return;
  }
  console.log("reload requested for", idef.getQualifiedPathName(), propsOrOptions.forId);
  // well this is very simple the app requested a reload
  // because it says that whatever we have in memory is not valid
  // whether it is in the cache or not, so we call it as so, and deny the cache
  // passing true
  if (!propsOrOptions.avoidLoading) {
    clearTimeout(reloadListenerTimeout.current);
    reloadListenerTimeout.current = setTimeout(loadValueWDenyCaches, 70);
  }
}

export function changeSearchListener(
  idef: ItemDefinition,
  propsOrOptions: IItemProviderOptions | IActualItemProviderProps,
  changedSearchListenerLastCollectedSearchId: {
    current: {
      id: string,
    },
  },
  mountCbFns: { current: Array<() => void> },
  isUnmounted: boolean,
  isCMounted: boolean,
  changeSearchListener: () => void,
  setState: (v: Partial<IHookItemProviderState | IActualItemProviderState>) => void,
) {
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
  }

  changedSearchListenerLastCollectedSearchId.current = {
    id: searchState.searchId
  };

  if (isUnmounted) {
    return;
  } else if (!isCMounted) {
    if (mountCbFns.current.indexOf(changeSearchListener) === -1) {
      mountCbFns.current.push(changeSearchListener);
    }
    return;
  }

  setState(searchState);
}

export async function changeListener(
  idef: ItemDefinition,
  propsOrOptions: IItemProviderOptions | IActualItemProviderProps,
  setState: (v: Partial<IHookItemProviderState | IActualItemProviderState>) => void,
  isUnmountedRef: { current: boolean },
  isCMountedRef: { current: boolean },
  mountCbFns: { current: Array<() => void> },
  repairCorruptionTimeoutRef: { current: any },
  lastLoadValuePromiseIsResolved: boolean,
  lastLoadValuePromise: Promise<void>,
  changeListener: () => void,
  reloadListener: () => void,
  repairCorruption?: boolean,
) {
  if (isUnmountedRef.current) {
    return;
  } else if (!isCMountedRef.current) {
    if (mountCbFns.current.indexOf(changeListener) === -1) {
      mountCbFns.current.push(changeListener);
    }
    return;
  }

  // it is still loading and we get an overlapping
  // change event while we are still loading something
  // we cannot be sure of what is going to happen until
  // that is done
  // this happened when 2 same users were loading at the same time with different data
  // one of them was cached and returned really fast, the other however used the network and was slower
  // the data signature was different, the change listener was triggered making it think that data
  // was corrupted, because it was, but the request was already on its way making it do two network requests
  // unnecessarily because it wasn't aware of the first one which would have solved the conflict
  // so this add awareness of the first request if it's on its way
  if (!lastLoadValuePromiseIsResolved) {
    // so let's wait until all that is done and then check
    // that way the slower value is ready and a proper fair comparison can be done
    await lastLoadValuePromise;
  }

  let isNotFound = false;
  // edge case, in some scenarios the data might come from the cache very fast
  // and the information in the fields might not contain and has forgotten this field
  // because it has been retrieved for the cache
  // 1. item provider 1 loads partial data from the cache which is outdated data
  // 2. item provider 2 loads some other fields from the endpoint, the applied value union hasn't triggered
  // when the request occurs, so the fields are not aware of each other
  // 3. item provider 1 requests feedback
  // 4. item provider 2 applies value and due to signature mismatch deletes item provider 1 outdated data and clears it up
  // 5. feedback arrives and listener considers that the signature matches, data has been deleted for the other provider
  let dataIsCorrupted = false;
  if (propsOrOptions.forId) {
    const appliedValue = idef.getRQAppliedValue(
      propsOrOptions.forId || null,
      propsOrOptions.forVersion || null,
    );
    if (appliedValue) {
      isNotFound = appliedValue.rawValue === null;

      const { requestFields } = getFieldsAndArgs({
        includeArgs: false,
        includeFields: true,
        includes: propsOrOptions.includes || {},
        properties: getPropertyListDefault(propsOrOptions.properties),
        itemDefinitionInstance: idef,
        forId: propsOrOptions.forId,
        forVersion: propsOrOptions.forVersion || null,
      });

      if (!requestFieldsAreContained(requestFields, appliedValue.requestFields)) {
        dataIsCorrupted = true;
      }
    }
  }

  if (dataIsCorrupted) {
    if (!repairCorruption) {
      // in the past this would be a call for reload listener but now
      // we want to call the repair corruption as this same event
      // just for even more resilliance to errors so that the corruption
      // is checked again and we pass true as the flag in order to ensure
      // that any corruption will be immediately fixed
      clearTimeout(repairCorruptionTimeoutRef.current);
      repairCorruptionTimeoutRef.current = setTimeout(changeListener.bind(null, true), 70);
    } else {
      // that is done here
      reloadListener();
      return;
    }
  } else {
    clearTimeout(repairCorruptionTimeoutRef.current);
  }

  // we basically just upgrade the state
  !isUnmountedRef.current && setState({
    itemState: getItemState(idef, propsOrOptions),
    // also search might do this, and it's true anyway
    notFound: isNotFound,
  });
}

export async function loadListener(
  idef: ItemDefinition,
  propsOrOptions: IItemProviderOptions | IActualItemProviderProps,
  state: {readonly current: IActualItemProviderState | IHookItemProviderState},
  setState: (v: Partial<IHookItemProviderState | IActualItemProviderState>) => void,
  isUnmountedRef: { current: boolean },
  isCMountedRef: { current: boolean },
  mountCbFns: { current: Array<() => void> },
  changeListener: () => void,
  loadListener: () => void,
) {
  if (isUnmountedRef.current) {
    return;
  } else if (!isCMountedRef.current) {
    if (mountCbFns.current.indexOf(loadListener) === -1) {
      mountCbFns.current.push(loadListener);
    }
    return;
  }

  // the item must update all its fields and its internal state
  // as the search did an apply to it
  changeListener();

  // already loaded this can happen if during a search it triggers load
  // but there's another component around holding the same value
  if (state.current.loaded) {
    return;
  }

  propsOrOptions.onWillLoad && propsOrOptions.onWillLoad();

  const forId = propsOrOptions.forId || null;
  const forVersion = propsOrOptions.forVersion || null;

  const appliedRQValue = idef.getRQAppliedValue(
    forId, forVersion,
  );
  if (appliedRQValue) {
    let cached: boolean = false;
    // we need to cache what we have been just specified
    if (
      // we do not use the polyfill to save get values
      CacheWorkerInstance.isSupportedAsWorker &&
      propsOrOptions.longTermCaching
    ) {
      const qualifiedName = idef.getQualifiedPathName();
      if (appliedRQValue.rawValue) {
        cached = await CacheWorkerInstance.instance.mergeCachedValue(
          PREFIX_GET + qualifiedName,
          forId,
          forVersion || null,
          appliedRQValue.rawValue,
          appliedRQValue.requestFields,
        );
      } else {
        cached = await CacheWorkerInstance.instance.setCachedValue(
          PREFIX_GET + qualifiedName,
          forId,
          forVersion || null,
          null,
          null,
        );
      }
    }

    const completedValue = {
      value: appliedRQValue.rawValue,
      error: null as any,
      cached,
      id: forId,
      version: forVersion,
    }

    propsOrOptions.onLoad && propsOrOptions.onLoad(completedValue);
  }

  // we basically just upgrade the state
  setState({
    // we do this because eg. the search relies on triggering the load listener
    // no notify that things aren't loading anymore
    loading: false,
    loaded: true,
  });
}

export async function loadStateFromFileAt(
  idef: ItemDefinition,
  stateFile: File | Blob,
  id: string,
  version?: string,
  specificProperties?: string[],
  specificIncludes?: { [includeId: string]: string[] },
) {
  await idef.applyStateFromPackage(
    id || null,
    version || null,
    stateFile,
    specificProperties,
    specificIncludes,
  );
  idef.triggerListeners(
    "change",
    id || null,
    version || null,
  );
}

export async function downloadStateAt(
  idef: ItemDefinition,
  lastLoadValuePromiseIsResolved: boolean,
  lastLoadValuePromise: Promise<void>,
  id: string,
  version: string,
  specificProperties?: string[],
  specificIncludes?: { [includeId: string]: string[] },
): Promise<Blob> {
  if (!lastLoadValuePromiseIsResolved) {
    await lastLoadValuePromise;
  }
  return idef.getStatePackage(
    id || null,
    version || null,
    specificProperties,
    specificIncludes,
    true,
  );
}

export async function onPropertyChange(
  idef: ItemDefinition,
  propsOrOptions: IItemProviderOptions | IActualItemProviderProps,
  state: {readonly current: IActualItemProviderState | IHookItemProviderState},
  lastLoadValuePromise: Promise<void>,
  lastUpdateIdRef: { current: number },
  updateTimeoutRef: { current: any },
  automaticSearchTimeoutRef: { current: any },
  preventSearchFeedbackOnPossibleStaleDataRef: { current: any },
  consumableQsStateRef: { current: any },
  consumableQsStateTimeoutRef: { current: any },
  location: Location<any>,
  updateFn: (currentUpdateId: number) => void,
  search: (options: IActionSearchOptions) => Promise<IActionResponseWithSearchResults>,

  property: PropertyDefinition | string | IPropertyCoreProps,
  value: PropertyDefinitionSupportedType,
  internalValue: any,
) {
  if (state.current.loading) {
    // loading will overwrite any possible property changes
    // so we await for it to end
    await lastLoadValuePromise;
  }

  const actualProperty = property instanceof PropertyDefinition ?
    property : getPropertyFromCoreRule(property, idef);

  // we simply set the current value in the property
  actualProperty.setCurrentValue(
    propsOrOptions.forId || null,
    propsOrOptions.forVersion || null,
    value,
    internalValue,
  );
  // idef.cleanSearchState(propsOrOptions.forId || null, propsOrOptions.forVersion || null);
  onPropertyChangeOrRestoreQsSync(
    idef,
    consumableQsStateRef,
    consumableQsStateTimeoutRef,
    location,
    propsOrOptions,
    actualProperty,
  );
  onPropertyChangeOrRestoreFinal(
    idef, lastUpdateIdRef, updateTimeoutRef, automaticSearchTimeoutRef,
    preventSearchFeedbackOnPossibleStaleDataRef, updateFn, search, propsOrOptions,
  );
}

export function onPropertyRestore(
  idef: ItemDefinition,
  propsOrOptions: IItemProviderOptions | IActualItemProviderProps,
  state: IActualItemProviderState | IHookItemProviderState,
  lastUpdateIdRef: { current: number },
  updateTimeoutRef: { current: any },
  automaticSearchTimeoutRef: { current: any },
  preventSearchFeedbackOnPossibleStaleDataRef: { current: any },
  consumableQsStateRef: { current: any },
  consumableQsStateTimeoutRef: { current: any },
  location: Location<any>,
  updateFn: (currentUpdateId: number) => void,
  search: (options: IActionSearchOptions) => Promise<IActionResponseWithSearchResults>,

  property: PropertyDefinition | string | IPropertyCoreProps,
) {
  if (state.loading) {
    return;
  }

  const actualProperty = property instanceof PropertyDefinition ?
    property : getPropertyFromCoreRule(property, idef);

  actualProperty.restoreValueFor(
    propsOrOptions.forId || null,
    propsOrOptions.forVersion || null,
  );
  // idef.cleanSearchState(propsOrOptions.forId || null, propsOrOptions.forVersion || null);
  onPropertyChangeOrRestoreQsSync(
    idef,
    consumableQsStateRef,
    consumableQsStateTimeoutRef,
    location,
    propsOrOptions,
    actualProperty,
  );
  onPropertyChangeOrRestoreFinal(
    idef, lastUpdateIdRef, updateTimeoutRef, automaticSearchTimeoutRef,
    preventSearchFeedbackOnPossibleStaleDataRef, updateFn, search, propsOrOptions,
  );
}

export function onPropertyChangeOrRestoreFinal(
  idef: ItemDefinition,
  lastUpdateIdRef: { current: number },
  updateTimeoutRef: { current: any },
  automaticSearchTimeoutRef: { current: any },
  preventSearchFeedbackOnPossibleStaleDataRef: { current: any },
  updateFn: (currentUpdateId: number) => void,
  search: (options: IActionSearchOptions) => Promise<IActionResponseWithSearchResults>,

  propsOrOptions: IItemProviderOptions | IActualItemProviderProps,
) {
  // trigger the listeners for change so everything updates nicely
  idef.triggerListeners(
    "change",
    propsOrOptions.forId || null,
    propsOrOptions.forVersion || null,
  );

  if (idef.containsAnExternallyCheckedProperty() && propsOrOptions.enableExternalChecks) {
    // so we build an id for this change, for that we simply use
    // the date
    const currentUpdateId = (new Date()).getTime();
    // this change was identified by this id
    lastUpdateIdRef.current = currentUpdateId;

    // we clear any previous timeout to check external properties
    clearTimeout(updateTimeoutRef.current);
    // and now we build a new timeout to check external properties, which such id
    // if in 600ms the user stops doing anything, the externally checked property
    // will triger and an external check will launch
    updateTimeoutRef.current = setTimeout(
      updateFn.bind(null, currentUpdateId),
      600,
    );
  }

  // if we are in search mode and have an automatic search we need
  // to retrigger the search when properties change
  if (propsOrOptions.automaticSearch && !propsOrOptions.automaticSearch.clientDisabled && !propsOrOptions.automaticSearchIsOnlyInitial) {
    clearTimeout(automaticSearchTimeoutRef.current);

    // if the search must be done instantly
    if (propsOrOptions.automaticSearchInstant) {
      preventSearchFeedbackOnPossibleStaleDataRef.current = true;
      search(propsOrOptions.automaticSearch);
    } else {
      automaticSearchTimeoutRef.current = setTimeout(() => {
        // now this varibale specifically is used in cached searches and the reason we need to
        // prevent search feedback for this is because we are just refiltering
        // as the properties have changed, we do not need to request for feedback
        // every single time a property changes because it is wasteful
        preventSearchFeedbackOnPossibleStaleDataRef.current = true;
        search(propsOrOptions.automaticSearch);
      }, 300);
    }
  }
}
export function onPropertyChangeOrRestoreQsSync(
  idef: ItemDefinition,
  consumableQsStateRef: { current: any },
  consumeQsStateTimeoutRef: { current: any },
  location: Location<any>,
  propsOrOptions: IItemProviderOptions | IActualItemProviderProps,

  property: PropertyDefinition,
) {
  // syncing from the query string in a cheap way
  if (propsOrOptions.queryStringSync && propsOrOptions.queryStringSync.length) {
    // grabbing the property to sync in there
    const propertiesToSync = (
      idef.isInSearchMode() ?
        getPropertyListForSearchMode(
          propsOrOptions.queryStringSync || [],
          idef.getStandardCounterpart()
        ) : getPropertyListDefault(propsOrOptions.queryStringSync)
    );


    const idToSync = property.getId()
    const isToSync = propertiesToSync.find((p) => p === idToSync);

    if (isToSync) {
      const value = property.getCurrentValue(
        propsOrOptions.forId || null,
        propsOrOptions.forVersion || null,
      );
      if (consumableQsStateRef.current) {
        consumableQsStateRef.current[idToSync] = value === null ? null : JSON.stringify(value);
      } else {
        consumableQsStateRef.current = {
          [idToSync]: value === null ? null : JSON.stringify(value)
        };
        consumeQsStateTimeoutRef.current = setTimeout(() => {
          setHistoryQSState(location, consumableQsStateRef.current, propsOrOptions.queryStringSyncReplace);
          consumableQsStateRef.current = null;
          consumeQsStateTimeoutRef.current = null;
        }, 200);
      }
    }
  }
}

export function willUnmount(
  idef: ItemDefinition,
  propsOrOptions: IItemProviderOptions | IActualItemProviderProps,
  state: IHookItemProviderState | IActualItemProviderState,
  setState: (v: Partial<IHookItemProviderState | IActualItemProviderState>) => void,
  remoteListener: RemoteListener,
  isUnmountedRef: { current: boolean },
  blockIdCleanRef: { current: string },
  internalSearchDestructionMarkersRef: { current: Array<[string, string, string, [string, string, string], [string, string]]> },
  isCMounted: boolean,
  changeListener: () => void,
  loadListener: () => void,
  changeSearchListener: () => void,
  reloadListener: () => void,
  onSearchReload: (arg: IRemoteListenerRecordsCallbackArg) => void,
  onConnectStatusChange: () => void,
  search: (options: IActionSearchOptions) => void,
  internalUUID: string,
  parentInstanceTrack: any,
) {
  isUnmountedRef.current = true;
  releaseCleanupBlock(
    blockIdCleanRef,
    idef,
    propsOrOptions,
  );
  unSetupListeners(
    idef,
    propsOrOptions,
    state,
    remoteListener,
    changeListener,
    loadListener,
    changeSearchListener,
    reloadListener,
    onSearchReload,
    parentInstanceTrack,
  );
  // this function doesn't call search
  // even when it takes it
  removeSetters(
    idef,
    propsOrOptions,
    isCMounted,
    search,
    parentInstanceTrack,
  );
  runDismountOn(
    idef,
    propsOrOptions,
    isUnmountedRef.current,
    blockIdCleanRef.current,
    setState,
    internalSearchDestructionMarkersRef,
  );
  remoteListener.removeConnectStatusListener(onConnectStatusChange);

  if (window.TESTING && process.env.NODE_ENV === "development") {
    const mountItem = window.TESTING.mountedItems.find(m => m.instanceUUID === internalUUID);
    if (mountItem) {
      mountItem.unmountTime = (new Date()).toISOString();
    }
  }

  removeDoubleSlotter(idef, propsOrOptions);
}

export function onIncludeSetExclusionState(
  idef: ItemDefinition,
  propsOrOptions: IItemProviderOptions | IActualItemProviderProps,
  lastUpdateIdRef: { current: number },
  updateTimeoutRef: { current: any },
  updateFn: (currentUpdateId: number) => void,
  include: Include,
  includeState: IncludeExclusionState,
) {
  // just sets the exclusion state
  include.setExclusionState(propsOrOptions.forId || null, propsOrOptions.forVersion || null, includeState);
  idef.triggerListeners(
    "change", propsOrOptions.forId || null, propsOrOptions.forVersion || null);

  // note how externally checked properties might be affected for this
  if (idef.containsAnExternallyCheckedProperty() && propsOrOptions.enableExternalChecks) {
    const currentUpdateId = (new Date()).getTime();
    lastUpdateIdRef.current = currentUpdateId;

    clearTimeout(updateTimeoutRef.current);
    updateTimeoutRef.current = setTimeout(
      updateFn.bind(null, currentUpdateId),
      600,
    );
  }
}

export async function del(
  idef: ItemDefinition,
  propsOrOptions: IItemProviderOptions | IActualItemProviderProps,
  state: {readonly current: IHookItemProviderState | IActualItemProviderState},
  setState: (v: Partial<IHookItemProviderState | IActualItemProviderState>) => void,
  isUnmountedRef: { current: boolean },
  blockIdCleanRef: { current: string },
  token: string,
  language: string,
  remoteListener: RemoteListener,

  options: IActionDeleteOptions = {},
): Promise<IBasicActionResponse> {
  if (state.current.deleting) {
    throw new Error("Can't delete while deleting, please consider your calls")
  }

  if (propsOrOptions.forId === null) {
    return null;
  }

  const isValid = checkItemStateValidity(
    idef,
    propsOrOptions,
    state.current,
    {
      properties: [],
      ...options,
    },
  );

  if (!isValid) {
    // if it's not poked already, let's poke it
    if (!isUnmountedRef.current) {
      setState({
        pokedElements: {
          properties: [],
          includes: {},
          policies: options.policies || [],
        },
      });
    }
    cleanWithProps(idef, propsOrOptions, isUnmountedRef.current, blockIdCleanRef.current, options, "fail", setState);
    return giveEmulatedInvalidError(idef, propsOrOptions, setState, isUnmountedRef.current, "deleteError", false, false);
  }

  if (options.beforeDelete) {
    const result = await options.beforeDelete();
    if (!result) {
      return null;
    }
  }

  const forId = options.deleteForId || propsOrOptions.forId;
  const forVersion = options.deleteForId ? (options.deleteForVersion || null) : (options.deleteForVersion || propsOrOptions.forVersion || null);

  const {
    argumentsForQuery,
  } = getFieldsAndArgs({
    includeArgs: false,
    includeFields: true,
    uniteFieldsWithAppliedValue: true,
    includesForArgs: {},
    propertiesForArgs: [],
    policiesForArgs: options.policies || [],
    itemDefinitionInstance: idef,
    forId,
    forVersion,
  });

  if (!isUnmountedRef.current) {
    setState({
      deleting: true,
    });
  }

  const {
    error,
  } = await runDeleteQueryFor({
    args: argumentsForQuery,
    itemDefinition: idef,
    id: forId,
    version: forVersion,
    token: token,
    language: language,
    listenerUUID: remoteListener.getUUID(),
    cacheStore: propsOrOptions.longTermCaching,
  }, {
    remoteListener: remoteListener,
  });

  if (error) {
    if (!isUnmountedRef.current) {
      setState({
        deleteError: error,
        deleting: false,
        deleted: false,
        pokedElements: {
          properties: [],
          includes: {},
          policies: options.policies || [],
        },
      });
    }
    cleanWithProps(idef, propsOrOptions, isUnmountedRef.current, blockIdCleanRef.current, options, "success", setState);
  } else {
    idef.applyValue(
      forId,
      forVersion,
      null,
      false,
      null,
      true,
    );
    idef.cleanValueFor(forId, forVersion);
    if (!isUnmountedRef.current) {
      setState({
        deleteError: null,
        deleting: false,
        deleted: true,
        pokedElements: {
          properties: [],
          includes: {},
          policies: (options.policies || []),
        },
      });

      if (forId === (propsOrOptions.forId || null) && forVersion === (propsOrOptions.forVersion || null)) {
        setState({
          notFound: true,
        });
      }
    }
    cleanWithProps(idef, propsOrOptions, isUnmountedRef.current, blockIdCleanRef.current, options, "fail", setState);
    idef.triggerListeners("change", forId, forVersion);
  }

  propsOrOptions.onDelete && propsOrOptions.onDelete({ error });
  return {
    error,
  };
}

export async function submit(
  idef: ItemDefinition,
  propsOrOptions: IItemProviderOptions | IActualItemProviderProps,
  state: {readonly current: IHookItemProviderState | IActualItemProviderState},
  setState: (v: Partial<IHookItemProviderState | IActualItemProviderState>) => void,
  activeSubmitPromiseRef: { current: Promise<{ response: IActionSubmitResponse, options: IActionSubmitOptions }> },
  activeSubmitPromiseAwaiterRef: { current: string },
  submitBlockPromisesRef: { current: Array<Promise<void>> },
  isUnmountedRef: { current: boolean },
  lastLoadValuePromiseRef: { current: Promise<void> },
  blockIdCleanRef: { current: string },
  config: IConfigRawJSONDataType,
  token: string,
  language: string,
  remoteListener: RemoteListener,

  originalOptions: IActionSubmitOptions,
): Promise<IActionSubmitResponse> {
  if ((originalOptions.blockUntil || originalOptions.blockReason) && !originalOptions.blockStatus) {
    throw new Error("blockUntil nor blockReason can be set if blockStatus is not true");
  }

  // the reason we might need to wait for load is because unless we have avoided
  // loading the applied value matters in order to unite the applied fields, however
  // if we are avoiding loading this doesn't really matter as it's truly loading and somehow
  // the submit button was pressed really fast
  const waitingForLoad = propsOrOptions.forId && !state.current.loaded && !propsOrOptions.avoidLoading;
  if (waitingForLoad) {
    if (state.current.loadError) {
      console.warn(
        "Attempted to submit with a loaded value in an error state, the result is that the value is not loaded " +
        "in memory, this is not an error, it simply means that the value was not considered for the update",
      );
    } else {
      console.warn(
        "Attempted to submit so fast that the value was not yet loaded in memory, this is not an error, " +
        "if this was an user triggered action, then the app is sluggish, if otherwise you submit manually eg. an automatic action " +
        "that triggers faster than a human can begin to react then it's not a problem, overall the app was loading a value for " +
        idef.getName() + " and the submit happened before such NEW value could be loaded, if your submit " +
        "is tied to a condition it could have been resolved with the old data if it held a partial value",
      );
    }
    await lastLoadValuePromiseRef.current;
  }

  // if we are already submitting
  let options = originalOptions;

  const cancelledResponse = {
    id: originalOptions.submitForId !== "undefined" ? options.submitForId : propsOrOptions.forId,
    version: originalOptions.submitForVersion !== "undefined" ? options.submitForVersion : propsOrOptions.forVersion,
    cancelled: true,
    deletedState: false,
    storedState: false,
    error: null as any,
  };

  if (state.current.submitting || activeSubmitPromiseRef.current) {
    if (originalOptions.pileSubmit) {
      const id = uuid.v4();
      activeSubmitPromiseAwaiterRef.current = id;

      const lastResponse = await activeSubmitPromiseRef.current;

      // another pile element has overtaken us
      // we must not execute, we have been cancelled
      if (activeSubmitPromiseAwaiterRef.current !== id) {
        // cancelled
        return cancelledResponse;
      }

      activeSubmitPromiseAwaiterRef.current = null;

      // patch the submit action
      if (typeof originalOptions.pileSubmit === "function") {
        const optionsOverride = originalOptions.pileSubmit(lastResponse.response, lastResponse.options);

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
      throw new Error("Can't submit while submitting, please consider your calls");
    }
  }

  let activeSubmitPromiseResolve = null as any;
  let activeSubmitPromiseReject = null as any;
  activeSubmitPromiseRef.current = new Promise((resolve, reject) => {
    activeSubmitPromiseResolve = resolve;
    activeSubmitPromiseReject = reject;
  });

  const isValid = checkItemStateValidity(
    idef,
    propsOrOptions,
    state.current,
    options,
  );
  const pokedElements = {
    properties: options.properties,
    includes: options.includes || {},
    policies: options.policies || [],
  }

  const submitForId = typeof options.submitForId !== "undefined" ? options.submitForId : propsOrOptions.forId;
  const submitForVersion = typeof options.submitForVersion !== "undefined" ? options.submitForVersion : propsOrOptions.forVersion;

  const determinedActionIsEdit = options.action ?
    options.action === "edit" :
    (submitForId && submitForId === (propsOrOptions.forId || null) && !state.current.notFound);

  // if it's invalid let's return the emulated error
  if (!isValid) {
    if (!isUnmountedRef.current) {
      setState({
        pokedElements,
      });
    }
    cleanWithProps(idef, propsOrOptions, isUnmountedRef.current, blockIdCleanRef.current, options, "fail", setState);

    const returnValue = giveEmulatedInvalidError(
      idef,
      propsOrOptions,
      setState,
      isUnmountedRef.current,
      "submitError",
      determinedActionIsEdit ? [submitForId || null, submitForVersion || null] : true,
      false,
    ) as IActionSubmitResponse;
    activeSubmitPromiseRef.current = null;
    activeSubmitPromiseResolve({ response: returnValue, options });

    // if it's not poked already, let's poke it
    return returnValue;
  }

  if (submitBlockPromisesRef.current.length) {
    if (!isUnmountedRef.current) {
      setState({
        submitting: true,
      });
    }

    await Promise.all(submitBlockPromisesRef.current);
    submitBlockPromisesRef.current = [];
  }

  // now checking the option for the before submit function, if it returns
  // false we cancel the submit request, we don't check policies yet
  if (options.beforeSubmit) {
    try {
      const result = await options.beforeSubmit();
      if (!result) {
        activeSubmitPromiseRef.current = null;
        activeSubmitPromiseResolve({ response: cancelledResponse, options });
        return cancelledResponse;
      }
    } catch (err) {
      activeSubmitPromiseRef.current = null;
      activeSubmitPromiseReject(err);
      throw err;
    }
  }

  const root = idef.getParentModule().getParentRoot();

  const itemDefinitionToSubmitFor = options.submitForItem ?
    root.registry[options.submitForItem] as ItemDefinition :
    idef;

  if (!itemDefinitionToSubmitFor) {
    const err = new Error("Could not determine the item definition to submit for, " + options.submitForItem);
    activeSubmitPromiseRef.current = null;
    activeSubmitPromiseReject(err);
    throw err;
  }

  // now we are going to build our query
  // also we make a check later on for the policies
  // if necessary
  const unpackedStateOverride: IItemStateType = options.stateOverride ? (
    options.stateOverride instanceof Blob ?
      await blobToTransferrable(options.stateOverride) as IItemStateType :
      options.stateOverride
  ) : null;

  const {
    requestFields,
    argumentsForQuery,
    argumentsFoundFilePaths,
    nothingToUpdate,
  } = getFieldsAndArgs({
    includeArgs: true,
    includeFields: true,
    uniteFieldsWithAppliedValue: true,
    differingPropertiesOnlyForArgs: options.differingOnly,
    differingIncludesOnlyForArgs: options.differingOnly,
    includes: itemDefinitionToSubmitFor !== idef ? {} : (propsOrOptions.includes || {}),
    properties: itemDefinitionToSubmitFor !== idef ? [] : getPropertyListDefault(propsOrOptions.properties),
    includesForArgs: options.includes || {},
    propertiesForArgs: options.properties,
    policiesForArgs: options.policies || [],
    itemDefinitionInstance: itemDefinitionToSubmitFor,
    forId: propsOrOptions.forId || null,
    forVersion: propsOrOptions.forVersion || null,
    submitForId: submitForId,
    submitForVersion: submitForVersion,
    propertyOverrides: options.propertyOverrides,
    includeOverrides: options.includeOverrides,
    stateOverride: unpackedStateOverride,
    block: {
      status: options.blockStatus || null,
      reason: options.blockReason || null,
      until: options.blockUntil || null,
    },
  });

  if (nothingToUpdate && determinedActionIsEdit) {
    if (options.preventNothingToUpdateError) {
      cleanWithProps(idef, propsOrOptions, isUnmountedRef.current, blockIdCleanRef.current, options, "success", setState);
      activeSubmitPromiseRef.current = null;
      const returnValue: IActionSubmitResponse = {
        id: determinedActionIsEdit ? (submitForId || null) : null,
        version: determinedActionIsEdit ? (submitForVersion || null) : null,
        error: null,
        storedState: false,
        deletedState: false,
        cancelled: false,
      }
      activeSubmitPromiseResolve({ response: returnValue, options });
      return returnValue;
    }

    cleanWithProps(idef, propsOrOptions, isUnmountedRef.current, blockIdCleanRef.current, options, "fail", setState);

    const returnValue = giveEmulatedInvalidError(
      idef,
      propsOrOptions,
      setState,
      isUnmountedRef.current,
      "submitError",
      determinedActionIsEdit ? [submitForId || null, submitForVersion || null] : true,
      false,
      "Nothing to update",
      ENDPOINT_ERRORS.NOTHING_TO_UPDATE,
    ) as IActionSubmitResponse;
    activeSubmitPromiseRef.current = null;
    activeSubmitPromiseResolve({ response: returnValue, options });

    // if it's not poked already, let's poke it
    return returnValue;
  }

  if (options.parentedBy && (
    !options.parentedByAddOnly || (options.parentedByAddOnly && !determinedActionIsEdit)
  )) {
    const itemDefinitionInQuestion = root.registry[options.parentedBy.item] as ItemDefinition;

    argumentsForQuery.parent_id = options.parentedBy.id;
    argumentsForQuery.parent_version = options.parentedBy.version || null;
    argumentsForQuery.parent_type = itemDefinitionInQuestion.getQualifiedPathName();
  }

  if (options.inBehalfOf) {
    argumentsForQuery.in_behalf_of = options.inBehalfOf;
  }

  if (options.indexing) {
    argumentsForQuery.indexing = options.indexing;
  }

  if (options.ifLastModified) {
    argumentsForQuery.if_last_modified = options.ifLastModified;
  }

  // now it's when we are actually submitting
  if (!isUnmountedRef.current) {
    setState({
      submitting: true,
    });
  }

  let value: IRQValue;
  let error: EndpointErrorType;
  let getQueryFields: IRQRequestFields;

  // if we are in edit as we have specified an action that is meant to be edit
  // or if we have a submit for id that is also our current item id and it is indeed found which means that we are sure
  // there's a value for it and it is loaded so we can be guaranteed this is meant to be an edit
  if (determinedActionIsEdit) {
    const submitTargetIsDifferent =
      itemDefinitionToSubmitFor !== idef ||
      submitForId !== propsOrOptions.forId;
    if (submitTargetIsDifferent) {
      // if we are submitting to edit to a different target to our own
      // basically copying during an edit action we need to do the same we do
      // in creating new values via copying
      const appliedValue = idef.getRQAppliedValue(
        propsOrOptions.forId || null,
        propsOrOptions.forVersion || null,
      );

      // so if we have an applied value we have stored content about
      if (appliedValue) {
        // now we can start refetching all those values to get them
        // back as files
        await reprocessQueryArgumentsForFiles(
          argumentsForQuery,
          argumentsFoundFilePaths,
          idef,
          config,
          propsOrOptions.forId || null,
          propsOrOptions.forVersion || null,
        );
      }
    }

    const totalValues = await runEditQueryFor({
      args: argumentsForQuery,
      fields: requestFields,
      itemDefinition: itemDefinitionToSubmitFor,
      token: token,
      language: options.languageOverride || language,
      id: submitForId || null,
      version: submitForVersion || null,
      listenerUUID: remoteListener.getUUID(),
      cacheStore: propsOrOptions.longTermCaching,
      waitAndMerge: options.waitAndMerge,
      progresser: options.progresser,
    }, {
      remoteListener: remoteListener,
    });

    value = totalValues.value;
    error = totalValues.error;
    getQueryFields = totalValues.getQueryFields;
  } else {
    // if we are submitting to add to a different element to our own
    // basically copying what we have in this item definition into
    // another of another kind, either new with undefined id or
    // a different version, we need to ensure all the files
    // are going to be there nicely and copied
    const appliedValue = idef.getRQAppliedValue(
      propsOrOptions.forId || null,
      propsOrOptions.forVersion || null,
    );

    // so if we have an applied value we have stored content about
    if (appliedValue) {
      // now we can start refetching all those values to get them
      // back as files
      await reprocessQueryArgumentsForFiles(
        argumentsForQuery,
        argumentsFoundFilePaths,
        idef,
        config,
        propsOrOptions.forId || null,
        propsOrOptions.forVersion || null,
      );
    }

    // now we can call the add query after all the files have been processed
    const totalValues = await runAddQueryFor({
      args: argumentsForQuery,
      fields: requestFields,
      itemDefinition: itemDefinitionToSubmitFor,
      token: token,
      language: options.languageOverride || language,
      listenerUUID: remoteListener.getUUID(),
      cacheStore: propsOrOptions.longTermCaching,
      forId: submitForId || null,
      forVersion: submitForVersion || null,
      waitAndMerge: options.waitAndMerge,
      progresser: options.progresser,
    }, {
      remoteListener: remoteListener,
    });
    value = totalValues.value;
    error = totalValues.error;
    getQueryFields = totalValues.getQueryFields;
  }

  let recievedId: string = null;
  let receivedVersion: string = null;
  let storedState: boolean = false;
  let deletedState: boolean = false;
  if (error) {
    if (
      options.storeStateIfCantConnect &&
      error.code === ENDPOINT_ERRORS.CANT_CONNECT &&
      // no polyfilling for storing states
      CacheWorkerInstance.isSupportedAsWorker
    ) {
      const state = idef.getStateNoExternalChecking(
        propsOrOptions.forId || null,
        propsOrOptions.forVersion || null,
      );
      const appliedValue = idef.getRQAppliedValue(
        propsOrOptions.forId || null,
        propsOrOptions.forVersion || null,
      );
      const serializable = ItemDefinition.getSerializableState(state, options.propertyOverrides, options.storeStateIfCantConnectApplyEnforced);
      const storingLocation = getStoredStateLocation(options.storeStateIfCantConnect, propsOrOptions.forId, propsOrOptions.forVersion);
      const metadataSource = appliedValue &&
        appliedValue.flattenedValue as any;
      storedState = await CacheWorkerInstance.instance.storeState(
        // eh its the same as itemDefinitionToRetrieveDataFrom
        idef.getQualifiedPathName(),
        storingLocation.id,
        storingLocation.version,
        serializable,
        {
          overwriteLastModified: (metadataSource && metadataSource.last_modified) || null,
          overwriteId: (metadataSource && metadataSource.id) || null,
          overwriteVersion: (metadataSource && metadataSource.version) || null,
          overwriteType: (metadataSource && metadataSource.type) || null,
        },
      );

      // inform potential callbacks
      if (storedState) {
        propsOrOptions.onStateStored && propsOrOptions.onStateStored(state);
      } else {
        propsOrOptions.onStateStoreFailed && propsOrOptions.onStateStoreFailed(state);
      }
    }

    if (!isUnmountedRef.current) {
      setState({
        submitError: error,
        submitting: false,
        submitted: false,
        pokedElements,
      });
    }
    cleanWithProps(idef, propsOrOptions, isUnmountedRef.current, blockIdCleanRef.current, options, "fail", setState);
  } else if (value) {
    if (
      options.clearStoredStateIfSubmitted &&
      // no polyfilling for state based stuff
      CacheWorkerInstance.isSupportedAsWorker
    ) {
      const storedLocation = getStoredStateLocation(options.clearStoredStateIfSubmitted, propsOrOptions.forId, propsOrOptions.forVersion);
      deletedState = await CacheWorkerInstance.instance.deleteState(
        // eh its the same itemDefinitionToRetrieveDataFrom
        idef.getQualifiedPathName(),
        storedLocation.id,
        storedLocation.version,
      );
    }

    if (!isUnmountedRef.current) {
      setState({
        submitError: null,
        submitting: false,
        submitted: true,
        pokedElements,
      });
    }

    recievedId = value.id as string;
    receivedVersion = value.version as string || null;
    itemDefinitionToSubmitFor.applyValue(
      recievedId,
      receivedVersion,
      value,
      false,
      getQueryFields,
      true,
    );

    const triggeredAnUpdate = cleanWithProps(
      idef,
      propsOrOptions,
      isUnmountedRef.current,
      blockIdCleanRef.current,
      options,
      "success",
      setState,
      // we avoid triggering an update if it's not the same
      // because it will use the idef
      itemDefinitionToSubmitFor !== idef,
    );
    if (!triggeredAnUpdate) {
      // we ensure this comes here if the submit for is not the same
      // but also clean with props might not have triggered an update itself
      itemDefinitionToSubmitFor.triggerListeners("change", recievedId || null, receivedVersion || null);

      // clean will props may have triggered the change listeners, but if there's a difference
      // between what we have cleaned and applied we want to trigger these listeners again for the
      // received value
    } else if (propsOrOptions.forId !== recievedId && (propsOrOptions.forVersion || null) !== (receivedVersion || null)) {
      itemDefinitionToSubmitFor.triggerListeners("change", recievedId || null, receivedVersion || null);
    }
  }

  // happens during an error or whatnot
  const result = {
    id: recievedId,
    version: receivedVersion || null,
    error,
    storedState,
    deletedState,
    cancelled: false,
  };
  propsOrOptions.onSubmit && propsOrOptions.onSubmit(result);

  activeSubmitPromiseRef.current = null;
  activeSubmitPromiseResolve({ response: result, options });

  return result;
}

export async function onSearchReload(
  idef: ItemDefinition,
  state: IHookItemProviderState | IActualItemProviderState,
  preventSearchFeedbackOnPossibleStaleDataRef: { current: boolean },
  reloadNextSearchRef: { current: boolean },
  search: (options: IActionSearchOptions) => Promise<IActionResponseWithSearchResults>,

  arg: IRemoteListenerRecordsCallbackArg
) {
  // prevent double searches and warn the developer
  if (state.searching) {
    console.warn(
      "Could not execute a search reload because the item is currently search reloading",
    );
    return;
  }

  // this function is called when remotely the search
  // is said to update, and it needs to be reloaded
  // however the server has already specified how the data
  // is meant to update, but launching this as it is, will
  // cause the client to check because it considers that the
  // data might be stale because it got the data from the
  // cache worker, but we had updated this data a couple of microseconds
  // earlier so we make this hack variable to prevent asking for
  // feedback as we already got feedback
  preventSearchFeedbackOnPossibleStaleDataRef.current = true;
  reloadNextSearchRef.current = true;
  await search(state.searchOriginalOptions);

  // now that the search is done, any records in cache would have updated
  // in the case of cachePolicy usages, and now we can trigger updates
  // down the line
  const root = idef.getParentModule().getParentRoot();
  arg.modifiedRecords.forEach((record) => {
    const iDef = root.registry[record.type] as ItemDefinition;
    const rqValue = iDef.getRQAppliedValue(record.id, record.version);
    if (!rqValue || !rqValue.flattenedValue || rqValue.flattenedValue.last_modified !== record.last_modified) {
      iDef.triggerListeners("reload", record.id, record.version);
    }
  });
}

export function getDerived(
  idef: ItemDefinition,
  location: Location<any>,
  propsOrOptions: IItemProviderOptions | IActualItemProviderProps,
  state: IHookItemProviderState | IActualItemProviderState,
): Partial<IHookItemProviderState> {
  // it is effective to do it here, so we use the state qualified name and the
  // idef qualified name to check, also the id in question matters to
  // normally we don't want to recalculate states in every render because
  // that is hugely inefficient, it would make the code simpler, but no
  // this needs to run fast, as it's already pretty resource intensive
  if (
    idef.getQualifiedPathName() !== state.itemState.itemDefQualifiedName ||
    (propsOrOptions.forId || null) !== (state.itemState.forId || null) ||
    (propsOrOptions.forVersion || null) !== (state.itemState.forVersion || null) ||
    (
      location &&
      location.state &&
      location.state[propsOrOptions.loadSearchFromNavigation] &&
      location.state[propsOrOptions.loadSearchFromNavigation].searchId !== state.searchId
    )
  ) {
    // for example when we didn't update right away the search state
    // when we changed slot this would cause old records to render
    // in the search loader
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
      searchCachePolicy: "none",
      searchListenPolicy: "none",
      searchHighlights: {},
      searchMetadata: null,
      searchListenSlowPolling: false,
      searchOriginalOptions: null,
    };

    let searchWasRestored = "NO";
    if (
      location &&
      location.state &&
      location.state[propsOrOptions.loadSearchFromNavigation] &&
      location.state[propsOrOptions.loadSearchFromNavigation].searchId !== state.searchId
    ) {
      const searchIdefState = location.state[propsOrOptions.loadSearchFromNavigation].searchIdefState;
      idef.applyState(
        propsOrOptions.forId || null,
        propsOrOptions.forVersion || null,
        searchIdefState,
      );
      searchState = location.state[propsOrOptions.loadSearchFromNavigation].searchState;
      searchWasRestored = "FROM_LOCATION";
    } else {
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
    }

    return {
      itemState: getItemState(idef, propsOrOptions),
      ...searchState,
      searchWasRestored: searchWasRestored as any,
    };
  }
  return null;
}