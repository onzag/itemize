import React from "react";
import { LocaleContext, ILocaleContextType } from "../internal/providers/locale-provider";
import ItemDefinition, { IItemStateType } from "../../base/Root/Module/ItemDefinition";
import PropertyDefinition, { IPropertyDefinitionState } from "../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { PropertyDefinitionSupportedType } from "../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import Include, { IncludeExclusionState } from "../../base/Root/Module/ItemDefinition/Include";
import { TokenContext, ITokenContextType } from "../internal/providers/token-provider";
import {
  PREFIX_GET,
  UNSPECIFIED_OWNER,
  ENDPOINT_ERRORS,
  MEMCACHED_DESTRUCTION_MARKERS_LOCATION,
  DESTRUCTION_MARKERS_LOCATION,
  IOrderByRuleType,
  INCLUDE_PREFIX,
  MEMCACHED_SEARCH_DESTRUCTION_MARKERS_LOCATION,
  SEARCH_DESTRUCTION_MARKERS_LOCATION,
} from "../../constants";
import { IGQLSearchRecord, IGQLValue, IGQLRequestFields, ProgresserFn } from "../../gql-querier";
import { requestFieldsAreContained } from "../../gql-util";
import { EndpointErrorType } from "../../base/errors";
import equals from "deep-equal";
import { ModuleContext } from "./module";
import { getConversionIds } from "../../base/Root/Module/ItemDefinition/PropertyDefinition/search-mode";
import CacheWorkerInstance from "../internal/workers/cache";
import { IRemoteListenerRecordsCallbackArg, RemoteListener } from "../internal/app/remote-listener";
import uuid from "uuid";
import { getFieldsAndArgs, runGetQueryFor, runDeleteQueryFor, runEditQueryFor, runAddQueryFor, runSearchQueryFor, IIncludeOverride, IPropertyOverride, reprocessFileArgumentForAdd } from "../internal/gql-client-util";
import { IPropertySetterProps } from "../components/property/base";
import { PropertyDefinitionSearchInterfacesPrefixes } from "../../base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces";
import { ConfigContext } from "../internal/providers/config-provider";
import { IConfigRawJSONDataType } from "../../config";
import { setHistoryState } from "../components/navigation";
import LocationRetriever from "../components/navigation/LocationRetriever";
import { Location } from "history";

const isDevelopment = process.env.NODE_ENV === "development";

// THIS IS THE MOST IMPORTANT FILE OF WHOLE ITEMIZE
// HERE IS WHERE THE MAGIC HAPPENS

// TODO cache policy search destruction markers
// destruct a whole search and its children on logout

function getPropertyListForSearchMode(properties: string[], standardCounterpart: ItemDefinition) {
  let result: string[] = [];
  properties.forEach((propertyId) => {
    if (
      propertyId === "search" ||
      propertyId === "created_by" ||
      propertyId === "since" ||
      standardCounterpart.isPropertyInSearchModeOnly(propertyId)
    ) {
      result.push(propertyId);
      return;
    }
    const standardProperty = standardCounterpart.getPropertyDefinitionFor(propertyId, true);
    result = result.concat(getConversionIds(standardProperty.rawData));
  });
  return result;
}

function getPropertyForSetter(setter: IPropertySetterProps, itemDefinition: ItemDefinition) {
  let actualId: string = setter.id;
  if (setter.searchVariant) {
    actualId = PropertyDefinitionSearchInterfacesPrefixes[setter.searchVariant.toUpperCase()] + setter.id;
  }
  if (setter.policyName && setter.policyType) {
    return itemDefinition.getPropertyDefinitionForPolicy(setter.policyType, setter.policyName, actualId);
  }
  return itemDefinition.getPropertyDefinitionFor(actualId, true);
}

/**
 * Rips the internal values from the state so it can be
 * serialized
 * @param state 
 */
function getSerializableState(state: IItemStateType): IItemStateType {
  const newState: IItemStateType = {
    ...state,
    properties: [
      ...state.properties,
    ],
    includes: [
      ...state.includes
    ]
  };

  newState.properties.forEach((p, index) => {
    newState.properties[index] = {
      ...p,
      internalValue: null,
    };
  });

  newState.includes.forEach((i, index) => {
    newState.includes[index] = {
      ...i,
      itemState: getSerializableState(i.itemState)
    };
  });

  return newState;
}

/**
 * A response given by some handlers like
 * loadValue
 */
export interface IBasicActionResponse {
  error: EndpointErrorType;
}

export interface IActionResponseWithValue extends IBasicActionResponse {
  value: any;
}

export interface ILoadCompletedPayload extends IActionResponseWithValue {
  forId: string;
  forVersion: string;
}

/**
 * A response given by submit and delete
 */
export interface IActionResponseWithId extends IBasicActionResponse {
  id: string;
  version: string;
  storedState: boolean;
  deletedState: boolean;
  cancelled: boolean;
}

/**
 * A response given by search
 */
export interface IActionResponseWithSearchResults extends IBasicActionResponse {
  searchId: string;
  records: IGQLSearchRecord[];
  results: IGQLValue[];
  count: number;
  limit: number;
  offset: number;
}

export type PolicyPathType = [string, string, string];

export interface IActionCleanOptions {
  /**
   * Cleans the value of a policy back to null
   */
  policiesToCleanOnSuccess?: PolicyPathType[];
  /**
   * Cleans the value of a policy back to null
   */
  policiesToCleanOnAny?: PolicyPathType[];
  /**
   * Cleans the value of a policy back to null
   */
  policiesToCleanOnFailure?: PolicyPathType[];
  /**
   * Restores the value of a property back to its applied value
   * or null if it doesn't have such
   */
  propertiesToRestoreOnSuccess?: string[];
  /**
   * Restores the value of a property back to its applied value
   * or null if it doesn't have such
   */
  propertiesToRestoreOnAny?: string[];
  /**
   * Restores the value of a property back to its applied value
   * or null if it doesn't have such
   */
  propertiesToRestoreOnFailure?: string[];
  /**
   * Restores the value of an include back to its applied value
   * or null if it doesn't have such
   */
  includesToRestoreOnSuccess?: string[];
  /**
   * Restores the value of an include back to its applied value
   * or null if it doesn't have such
   */
  includesToRestoreOnAny?: string[];
  /**
   * Restores the value of an include back to its applied value
   * or null if it doesn't have such
   */
  includesToRestoreOnFailure?: string[];
  /**
   * Makes all properties unpoked (invalid won't show)
   */
  unpokeAfterSuccess?: boolean;
  /**
   * Makes all properties unpoked (invalid won't show)
   */
  unpokeAfterAny?: boolean;
  /**
   * Makes all properties unpoked (invalid won't show)
   */
  unpokeAfterFailure?: boolean;
  /**
   * cleans the search results
   */
  cleanSearchResultsOnSuccess?: boolean;
  /**
   * cleans the search results
   */
  cleanSearchResultsOnAny?: boolean;
  /**
   * cleans the search results
   */
  cleanSearchResultsOnFailure?: boolean;
  /**
   * Restores the state on success back to its applied value
   * this will be a clean if no applied value exists
   */
  restoreStateOnSuccess?: boolean;
  /**
   * Restores the state on success back to its applied value
   * this will be a clean if no applied value exists
   */
  restoreStateOnAny?: boolean;
  /**
   * Restores the state on success back to its applied value
   * this will be a clean if no applied value exists
   */
  restoreStateOnFailure?: boolean;
  /**
   * Warning, clean state on success might not clean anything
   * if the cleaning is blocked from happening, this is because
   * other item provider is expecting to use the same value
   * always use propertiesToRestoreOn* in order to strip critical
   * data (eg. passwords) clean state is used for a memory relief
   * and itemize might decide that it's better not to provide it
   */
  cleanStateOnSuccess?: boolean;
  /**
   * Warning, clean state on success might not clean anything
   * if the cleaning is blocked from happening, this is because
   * other item provider is expecting to use the same value
   * always use propertiesToRestoreOn* in order to strip critical
   * data (eg. passwords) clean state is used for a memory relief
   * and itemize might decide that it's better not to provide it
   */
  cleanStateOnFailure?: boolean;
  /**
   * Warning, clean state on success might not clean anything
   * if the cleaning is blocked from happening, this is because
   * other item provider is expecting to use the same value
   * always use propertiesToRestoreOn* in order to strip critical
   * data (eg. passwords) clean state is used for a memory relief
   * and itemize might decide that it's better not to provide it
   */
  cleanStateOnAny?: boolean;
}

type ActionSubmitOptionCb = (lastResponse: IActionResponseWithId) => Partial<IActionSubmitOptions>;

/**
 * The options for submitting,
 * aka edit, aka add
 */
export interface IActionSubmitOptions extends IActionCleanOptions {
  properties: string[];
  differingOnly?: boolean;
  includes?: { [include: string]: string[] };
  policies?: PolicyPathType[];
  beforeSubmit?: () => boolean | Promise<boolean>;
  parentedBy?: {
    item: string,
    id: string,
    version?: string,
  };
  action?: "add" | "edit",
  submitForId?: string;
  submitForVersion?: string;
  inBehalfOf?: string;
  propertyOverrides?: IPropertyOverride[];
  includeOverrides?: IIncludeOverride[];
  languageOverride?: string;
  waitAndMerge?: boolean;
  progresser?: ProgresserFn;
  /**
   * if submitting already this will prevent throwing an error and instead
   * will wait until the submit time is free
   * 
   * pass a function to return a partial for patching the submit action
   * in case you want that behaviour
   */
  pileSubmit?: boolean | ActionSubmitOptionCb;
  storeStateIfCantConnect?: boolean;
  clearStoredStateIfConnected?: boolean;
}

export interface IActionDeleteOptions extends IActionCleanOptions {
  policies?: PolicyPathType[];
  beforeDelete?: () => boolean | Promise<boolean>;
  progresser?: ProgresserFn;
}

/**
 * The options for searching
 */
export interface IActionSearchOptions extends IActionCleanOptions {
  /**
   * The properties to be used to request, these have to be part
   * of your schema
   */
  requestedProperties: string[];
  /**
   * The requested includes (EXPERIMENTAL)
   */
  requestedIncludes?: { [include: string]: string[] };
  /**
   * The properties to be used to search with
   * you have access to three other special properties
   * that only exist within search mode "search", "created_by" and "since"
   */
  searchByProperties: string[];
  searchByIncludes?: { [include: string]: string[] };
  orderBy?: IOrderByRuleType;
  /**
   * By whom it was created, note that this option takes priority
   * over the created_by property that exists within the search mode
   */
  createdBy?: string;
  /**
   * The since attribute, note that this option takes priority
   * over the since property that exists within the search mode
   */
  since?: string;
  parentedBy?: {
    item: string,
    id: string,
    version?: string,
  };
  cachePolicy?: "by-owner" | "by-parent" | "by-owner-and-parent" | "none";
  listenPolicy?: "by-owner" | "by-parent" | "by-owner-and-parent" | "none";
  markForDestructionOnLogout?: boolean;
  traditional?: boolean;
  limit: number;
  offset: number;
  storeResultsInNavigation?: string;
  waitAndMerge?: boolean;
  progresser?: ProgresserFn;
}

export interface IPokeElementsType {
  properties: string[];
  includes: { [include: string]: string[] };
  policies: PolicyPathType[];
}

interface IBasicFns {
  // to remove the poked status
  poke: (elements: IPokeElementsType) => void;
  unpoke: () => void;
  // makes it so that it reloads the value, the loadValue function
  // usually is executed on componentDidMount, pass deny cache in order to
  // do a hard refresh and bypass the cache
  reload: (denyCache?: boolean) => Promise<IActionResponseWithValue>;
  // submits the current information, when there's no id, this triggers an
  // add action, with an id however this trigger edition
  submit: (options: IActionSubmitOptions) => Promise<IActionResponseWithId>;
  // straightwforward, deletes
  delete: () => Promise<IBasicActionResponse>;
  // cleans performs the cleanup of properties and policies
  clean: (options: IActionCleanOptions, state: "success" | "fail", avoidTriggeringUpdate?: boolean) => void;
  // performs a search, note that you should be in the searchMode however
  // since all items are the same it's totally possible to launch a search
  // in which case you'll just get a searchError you should be in search
  // mode because there are no endpoints otherwise
  search: (options: IActionSearchOptions) => Promise<IActionResponseWithSearchResults>;
}

/**
 * The whole item definition context
 */
export interface IItemContextType extends IBasicFns {
  // the item definition in question
  idef: ItemDefinition;
  // the state of this item definition that has
  // been pulled and calculated from this item definition
  state: IItemStateType;
  // the id of which it was pulled from, this might be
  // null
  forId: string;
  // the version of which it was pulled from
  forVersion: string;
  // with ids a not found flag might be set if the item
  // is not found 404
  notFound: boolean;
  // with ids the item might be blocked as well so this
  // flag is raised
  blocked: boolean;
  // if you are a moderator, or have a role that permits it
  // data might still be available, this comes together with
  // blocked
  blockedButDataAccessible: boolean;
  // an error that came during loading
  loadError: EndpointErrorType;
  // whether it is currently loading
  loading: boolean;
  // whether it loaded, sucesfully
  loaded: boolean;
  // an error that came during submitting
  submitError: EndpointErrorType;
  // whether it is currently submitting
  submitting: boolean;
  // whether it has submitted sucesfully, this is a transitory
  // flag, and should be removed, basically it means the item
  // is in a success state of submitted
  submitted: boolean;
  // an error that came during deleting
  deleteError: EndpointErrorType;
  // whether it is currently deleting
  deleting: boolean;
  // same as submitted, a success flag that says whether the element
  // was deleted
  deleted: boolean;
  // an error that occured during search
  searchError: EndpointErrorType;
  // whether it is currently searching
  searching: boolean;
  // the obtained search results from the graphql endpoint
  // just as they come
  searchRecords: IGQLSearchRecord[];
  searchResults: IGQLValue[];
  searchLimit: number;
  searchOffset: number;
  searchCount: number;
  // a search id for the obtained results whether error
  // or success
  searchId: string;
  searchWasRestored: boolean;
  // a search owner, or null, for the createdBy argument
  searchOwner: string;
  searchLastModified: string;
  // passed onto the search to tell it if results that are retrieved
  // and then updated should be cached into the cache using the
  // long term strategy, this is usually true when cachePolicy is something
  searchShouldCache: boolean;
  // the search fields that should be requested according
  // to the search function
  searchFields: any;
  searchRequestedProperties: string[];
  searchRequestedIncludes: { [include: string]: string[] };
  // poked is a flag that is raised to mean to ignore
  // anything regarding user set statuses and just mark
  // things as they are, for example, by default many fields
  // are empty (null) and they are invalid, but in UX wise
  // it makes no sense to show as invalid immediately
  // poked makes it so that every field shows its true state
  // they are poked
  pokedElements: IPokeElementsType;
  // this is a listener that basically takes a property, and a new value
  // and internal value, whatever is down the line is not expected to do
  // changes directly, but rather call this function, this function will
  // then update everything under the hood
  onPropertyChange: (
    property: PropertyDefinition,
    value: PropertyDefinitionSupportedType,
    internalValue: any,
  ) => void;
  // restores
  onPropertyRestore: (
    property: PropertyDefinition,
  ) => void;
  // this is yet another passed function that does the same as properties
  // but with exclusion states
  onIncludeSetExclusionState: (
    include: Include,
    state: IncludeExclusionState,
  ) => void;
  // now this would be used on enforcement, this is used for the setter
  // the reason it also needs to specify the id is because it might
  // go out of sync with the item definition
  onPropertyEnforce: (
    property: PropertyDefinition,
    value: PropertyDefinitionSupportedType,
    givenForId: string,
    givenForVersion: string,
  ) => void;
  onPropertyClearEnforce: (
    property: PropertyDefinition,
    givenForId: string,
    givenForVersion: string,
  ) => void;

  // dismisses of he many errors and flags
  dismissLoadError: () => void;
  dismissSubmitError: () => void;
  dismissSubmitted: () => void;
  dismissDeleteError: () => void;
  dismissDeleted: () => void;
  dismissSearchError: () => void;
  dismissSearchResults: () => void;

  // the remote listener
  remoteListener: RemoteListener;

  // an injected parent context if available
  injectedParentContext: IItemContextType;

  // inject a promise that blocks the submit process, this is currently
  // not used anywhere but was introduced as a means of blocking submitting
  // when necessary using promises
  injectSubmitBlockPromise: (arg: Promise<any>) => void;
}

export interface ISearchItemValueContextType {
  currentlySearching: IGQLSearchRecord[];
  searchFields: any;
}

// This is the context that will serve it
export const ItemContext = React.createContext<IItemContextType>(null);
export const SearchItemValueContext = React.createContext<ISearchItemValueContextType>(null);

// Now we pass on the provider, this is what the developer
// is actually expected to fill
export interface IItemProviderProps {
  /**
   * children that will be feed into the context
   */
  children?: React.ReactNode;
  /**
   * mounting id, adding a mounting id ensures
   * that the on dismount functions are called
   * if this changes, otherwise they will only be called
   * on the literal componentWillUnmount alone
   */
  mountId?: string;
  /**
   * the item definition slash/separated/path
   * if you don't specify this, the context will be
   * based on the prop extensions emulated item definition
   */
  itemDefinition?: string | ItemDefinition;
  /**
   * the id, specifying an id makes a huge difference
   */
  forId?: string;
  /**
   * the version
   */
  forVersion?: string;
  /**
   * Loads the unversioned version if the version
   * given is not found since every value must have
   * an unversioned primary form
   */
  loadUnversionedFallback?: boolean;
  /**
   * Allows to load the moderation fields
   */
  loadModerationFields?: boolean;
  /**
   * whether this is about the search counterpart for using
   * with searches, this opens a whole can of worms
   */
  searchCounterpart?: boolean;
  /**
   * some fields, eg. autocompleted ones and unique ones have rest
   * endpoints for them that will run checks, you might want to disable
   * these checks in two circumstances, 1. for efficiency if you don't need them
   * 2. for an UX reason, for example during login, if the field is constantly checking
   * that the external check is unique, for an username, then you will have an annoying
   * error popping on, saying that the username is taken, but you are logging in so that
   * external check is unecessary; note that disabling external checks has no effect
   * if the item definition has no externally checked properties
   */
  disableExternalChecks?: boolean;
  /**
   * automatic search triggers an automatic search when the item mounts
   * or it detects a change in the properties, this basically triggers
   * the .search function with these arguments whenever it is detected
   * it should do so
   */
  automaticSearch?: IActionSearchOptions;
  /**
   * Forces the automatic search to happen even if the search already holds
   * a state
   */
  automaticSearchForce?: boolean;
  /**
   * Makes automatic search happen only on mount
   */
  automaticSearchIsOnlyInitial?: boolean;
  /**
   * Make the automatic search refresh immediately
   * not compatible with automaticSearchIsOnlyInitial
   * usually the automatic search will stack refreshes for 300ms
   * in order to allow keystrokes to stack and not update per keystroke
   * on your entry field but sometimes you would
   * rather get instant results, as eg. your filters are selects
   * rather than entries with text
   */
  automaticSearchInstant?: boolean;
  /**
   * Load searches from the popstate event, use with the option for
   * storeResultsInNavigation and the same identifier
   */
  loadSearchFromNavigation?: string;
  /**
   * Setters for setting values for the properties within the item definition
   * itself, useful not to depend on mounting at time
   */
  setters?: IPropertySetterProps[];
  /**
   * Similar to setters but the values are just prefilled and as such are not
   * readonly, prefills only get executed during the initial mount
   * of the component
   */
  prefills?: IPropertySetterProps[];
  /**
   * only downloads and includes the properties specified in the list
   * in the state
   */
  properties?: string[];
  /**
   * only includes the items specified in the list in the state
   */
  includes?: { [include: string]: string[] };
  /**
   * excludes the policies from being part of the state
   */
  includePolicies?: boolean;
  /**
   * cleans or restores the value from the memory once the object dismounts
   * or the mount id changes; always remember to set a mountId property
   * for using this in order to be able to difference item definition
   * loaders between themselves
   */
  cleanOnDismount?: boolean | IActionCleanOptions;
  /**
   * static components do not update
   * A no listening static item definition will not update on
   * remote changes
   * a total static component does not even ask for feedback
   * it displays what it initially gets, wherever it comes from
   */
  static?: "TOTAL" | "NO_LISTENING";
  /**
   * uses long term caching with the worker cache strategy
   */
  longTermCaching?: boolean;
  /**
   * loads the state from the cache worker if a
   * stored value is found
   */
  loadStateFromCache?: boolean;
  /**
   * marks the item for destruction as the user logs out
   */
  markForDestructionOnLogout?: boolean;
  /**
   * avoids running loadValue
   */
  avoidLoading?: boolean;
  /**
   * loads using the slow method but it can be more efficient
   * as it will load values with a timeout
   */
  waitAndMerge?: boolean;
  /**
   * allows insertion of the parent context within the children
   */
  injectParentContext?: boolean;
  /**
   * callback triggers on search with the response
   */
  onSearch?: (data: IActionResponseWithSearchResults) => void;
  /**
   * Callback triggers on submit
   */
  onSubmit?: (data: IActionResponseWithId) => void;
  /**
   * Callback triggers on load
   */
  onLoad?: (data: IActionResponseWithValue) => void;
  /**
   * Callback triggers on delete
   */
  onDelete?: (data: IBasicActionResponse) => void;
  /**
   * On state change, triggers when the item definition internal
   * state changes for whatever reason use with care as
   * it makes the execution slower
   */
  onStateChange?: (state: IItemStateType) => void;
  /**
   * On state changes but from the store that is loaded
   * from a cache worker
   */
  onStateLoadedFromStore?: (state: IItemStateType, fns: IBasicFns) => void;
}

// This represents the actual provider that does the job, it takes on some extra properties
// taken from the contexts that this is expected to run under
interface IActualItemProviderProps extends IItemProviderProps {
  // token data to get the current user id, and role, for requests
  tokenData: ITokenContextType;
  // locale data for, well.... localization, nah it's actually to setup the language
  // during requests, so that full text search can function
  localeData: ILocaleContextType;
  // the item definition istance that was fetched from the itemDefinition
  itemDefinitionInstance: ItemDefinition;
  // the qualified name of such item definition
  itemDefinitionQualifiedName: string;
  // and whether it contains externally checked properties
  containsExternallyCheckedProperty: boolean;
  // the remote listener for listening to changes that occur
  // server side
  remoteListener: RemoteListener;
  // the searching context to pull values from
  searchContext: ISearchItemValueContextType;
  // injected parent context
  injectedParentContext: IItemContextType;
  // config
  config: IConfigRawJSONDataType;
  // only available when supporting search from navigation
  location?: Location<any>;
}

interface IActualItemProviderSearchState {
  searchError: EndpointErrorType;
  searching: boolean;
  searchRecords: IGQLSearchRecord[];
  searchResults: IGQLValue[];
  searchLimit: number;
  searchOffset: number;
  searchCount: number;
  searchId: string;
  searchOwner: string;
  searchLastModified: string;
  searchParent: [string, string, string];
  searchShouldCache: boolean;
  searchRequestedProperties: string[];
  searchRequestedIncludes: { [include: string]: string[] };
  searchFields: any;
};

// This is the state of such, it's basically a copy of the
// context, so refer to that, the context is avobe
interface IActualItemProviderState extends IActualItemProviderSearchState {
  searchWasRestored: boolean;
  itemState: IItemStateType;
  isBlocked: boolean;
  isBlockedButDataIsAccessible: boolean;
  notFound: boolean;
  loadError: EndpointErrorType;
  loading: boolean;
  loaded: boolean;
  submitError: EndpointErrorType;
  submitting: boolean;
  submitted: boolean;
  deleteError: EndpointErrorType;
  deleting: boolean;
  deleted: boolean;
  pokedElements: IPokeElementsType;
}

/**
 * Here it is, the mighty
 */
export class ActualItemProvider extends
  React.Component<IActualItemProviderProps, IActualItemProviderState> {
  // an internal uuid only used for testing purposes
  private internalUUID: string;

  // this variable is useful is async tasks like loadValue are still executing after
  // this component has unmounted, which is a memory leak
  private isUnmounted: boolean = false;
  private isCMounted: boolean = false;
  /**
   * Because sometimes functions for listeners run while the thing
   * is mounting, but we haven't mounted yet, we use these callbacks
   * to store these callbacks for the listeners; this happens
   * because the willUnmount of another item definition might trigger
   * a change event while this instance is mounting, during cleanup
   */
  private mountCbFns: Array<() => void> = [];
  /**
   * Because the listener might be triggered during a mount cb and this
   * will not change the state, automatic search might not trigger on mount
   * as it sees the previous state, so with this, we might now if the
   * search id was changed and for what, and trigger automatic search
   */
  private changedSearchListenerLastCollectedSearchId: {
    id: string;
  } = null;

  private initialAutomaticNextSearch: boolean = false;
  private reloadNextSearch: boolean = false;
  /**
   * this is a hack variable, when the server
   * sends a reload event for a search and that causes
   * the cache worker to add such a value to the list
   * that it considered to be added, and then this
   * causes this instance to call for an update
   * and the search needs to be reloaded
   * however the server has already specified how the data
   * is meant to update, but launching this as it is, will
   * cause the client to check because it considers that the
   * data might be stale because it got the data from the
   * cache worker, but we had updated this data a couple of microseconds
   * earlier so we make this hack variable to prevent asking for
   * feedback as we already got feedback
   * 
   * Check the on search reload function where it is set and then
   * it's sent to the search querier so that feedback
   * is not requested
   */
  private preventSearchFeedbackOnPossibleStaleData: boolean = false;

  /**
   * During loading both the id and version might be suddenly hot
   * updated before the server had time to reply this ensures
   * that we will only apply the value for the last loading
   * value and not overwrite if we have changed such value hot
   */
  private lastLoadingForId: string = null;
  private lastLoadingForVersion: string = null;

  /**
   * Some functons such as submit, on property change
   * events where we request new values for the
   * properties need to wait for loading to be done
   * with these promises we can await for the last loading
   * event
   */
  private lastLoadValuePromise: Promise<void> = null;
  private lastLoadValuePromiseIsResolved: boolean = true;
  private lastLoadValuePromiseResolve: () => void = null;

  private automaticSearchTimeout: NodeJS.Timer = null;

  // repair certain edge cases of data corruption due to event
  // timing
  private repairCorruptionTimeout: NodeJS.Timeout = null;

  // sometimes when doing some updates when you change the item
  // definition to another item definition (strange but ok)
  // the state between the item and the expected state will
  // not match, so we need to make it be the state of the
  // item definition itself, so we make a check using the qualified name
  public static getDerivedStateFromProps(
    props: IActualItemProviderProps,
    state: IActualItemProviderState,
  ): Partial<IActualItemProviderState> {
    // it is effective to do it here, so we use the state qualified name and the
    // idef qualified name to check, also the id in question matters to
    // normally we don't want to recalculate states in every render because
    // that is hugely inefficient, it would make the code simpler, but no
    // this needs to run fast, as it's already pretty resource intensive
    if (
      props.itemDefinitionQualifiedName !== state.itemState.itemDefQualifiedName ||
      (props.forId || null) !== (state.itemState.forId || null)
    ) {
      // note how we pass the optimization flags
      return {
        itemState: props.itemDefinitionInstance.getStateNoExternalChecking(
          props.forId || null,
          props.forVersion || null,
          !props.disableExternalChecks,
          props.itemDefinitionInstance.isInSearchMode() ?
            getPropertyListForSearchMode(
              props.properties || [],
              props.itemDefinitionInstance.getStandardCounterpart()
            ) : props.properties || [],
          props.includes || {},
          !props.includePolicies,
        ),
      };
    }
    return null;
  }

  // These are used for external checking, when available
  // we dont want to external check based off every character
  // so we have a timeout and update id
  private updateTimeout: NodeJS.Timer;
  // the update id is to prevent value stacking if for some
  // weird reason an external check returns before another, say
  // kitt returns after kitten, which might give an error if they
  // come out of order, so only the last state is relevant
  private lastUpdateId: number;
  // here we store the last options we used during a search
  // event this is just to that when the reload is executed these
  // options are used
  private lastOptionsUsedForSearch: IActionSearchOptions;
  // this is the id used for block cleaning
  private blockIdClean: string;

  // the list of submit block promises
  private submitBlockPromises: Array<Promise<any>> = [];

  // the list of submit block promises
  private activeSubmitPromise: Promise<IActionResponseWithId> = null;
  private activeSubmitPromiseAwaiter: string = null;

  constructor(props: IActualItemProviderProps) {
    super(props);

    if (
      typeof document !== "undefined" &&
      window.TESTING &&
      process.env.NODE_ENV === "development"
    ) {
      this.internalUUID = uuid.v4();
    }

    // Just binding all the functions to ensure their context is defined
    this.onPropertyChange = this.onPropertyChange.bind(this);
    this.onPropertyRestore = this.onPropertyRestore.bind(this);
    this.onPropertyChangeOrRestoreFinal = this.onPropertyChangeOrRestoreFinal.bind(this);
    this.onIncludeSetExclusionState = this.onIncludeSetExclusionState.bind(this);
    this.loadValue = this.loadValue.bind(this);
    this.delete = this.delete.bind(this);
    this.changeListener = this.changeListener.bind(this);
    this.loadListener = this.loadListener.bind(this);
    this.changeSearchListener = this.changeSearchListener.bind(this);
    this.reloadListener = this.reloadListener.bind(this);
    this.submit = this.submit.bind(this);
    this.dismissLoadError = this.dismissLoadError.bind(this);
    this.dismissSubmitError = this.dismissSubmitError.bind(this);
    this.dismissDeleteError = this.dismissSubmitError.bind(this);
    this.onPropertyEnforce = this.onPropertyEnforce.bind(this);
    this.onPropertyClearEnforce = this.onPropertyClearEnforce.bind(this);
    this.onPropertyEnforceOrClearFinal = this.onPropertyEnforceOrClearFinal.bind(this);
    this.dismissSubmitted = this.dismissSubmitted.bind(this);
    this.dismissDeleted = this.dismissDeleted.bind(this);
    this.cleanWithProps = this.cleanWithProps.bind(this);
    this.clean = this.clean.bind(this);
    this.poke = this.poke.bind(this);
    this.unpoke = this.unpoke.bind(this);
    this.search = this.search.bind(this);
    this.loadSearch = this.loadSearch.bind(this);
    this.dismissSearchError = this.dismissSearchError.bind(this);
    this.dismissSearchResults = this.dismissSearchResults.bind(this);
    this.onSearchReload = this.onSearchReload.bind(this);
    this.injectSubmitBlockPromise = this.injectSubmitBlockPromise.bind(this);
    this.installSetters = this.installSetters.bind(this);
    this.removeSetters = this.removeSetters.bind(this);
    this.installPrefills = this.installPrefills.bind(this);
    this.blockCleanup = this.blockCleanup.bind(this);
    this.releaseCleanupBlock = this.releaseCleanupBlock.bind(this);

    // first we setup the listeners, this includes the on change listener that would make
    // the entire app respond to actions, otherwise the fields might as well be disabled
    // we do this here to avoid useless callback changes as the listeners are not ready
    this.installSetters();
    this.installPrefills();

    if (typeof document !== "undefined") {
      this.setupListeners();
      this.blockCleanup();
    }

    // we get the initial state
    this.state = this.setupInitialState();

    // and if we have a cache, which runs behind a worker
    // won't run in server mode so it's safe
    if (CacheWorkerInstance.isSupported) {
      // let's set it up
      // as you can see this function might run several times per instance
      // but that's okay, all next runs get ignored
      CacheWorkerInstance.instance.setupVersion(parseInt(window.BUILD_NUMBER, 10));
    }
  }
  public blockCleanup(props: IActualItemProviderProps = this.props) {
    if (props.forId) {
      if (!this.blockIdClean) {
        this.blockIdClean = uuid.v4();
      }
      this.props.itemDefinitionInstance.addBlockCleanFor(props.forId || null, props.forVersion || null, this.blockIdClean);
    }
  }
  public releaseCleanupBlock(props: IActualItemProviderProps = this.props) {
    if (props.forId) {
      if (!this.blockIdClean) {
        this.blockIdClean = uuid.v4();
      }
      this.props.itemDefinitionInstance.removeBlockCleanFor(props.forId || null, props.forVersion || null, this.blockIdClean);
    }
  }
  public setupInitialState(): IActualItemProviderState {
    // the value might already be available in memory, this is either because it was loaded
    // by another instance or because of SSR during the initial render
    const memoryLoaded = !!(this.props.forId && this.props.itemDefinitionInstance.hasAppliedValueTo(
      this.props.forId || null, this.props.forVersion || null,
    ));
    let memoryLoadedAndValid = false;
    // by default we don't know
    let isNotFound = false;
    if (memoryLoaded) {
      const appliedGQLValue = this.props.itemDefinitionInstance.getGQLAppliedValue(
        this.props.forId || null, this.props.forVersion || null,
      );
      // this is the same as for loadValue we are tyring to predict
      const { requestFields } = getFieldsAndArgs({
        includeArgs: false,
        includeFields: true,
        uniteFieldsWithAppliedValue: true,
        includes: this.props.includes || {},
        properties: this.props.properties || [],
        includeModeration: this.props.loadModerationFields,
        itemDefinitionInstance: this.props.itemDefinitionInstance,
        forId: this.props.forId || null,
        forVersion: this.props.forVersion || null,
      });
      // this will work even for null values, and null requestFields
      memoryLoadedAndValid = (
        appliedGQLValue &&
        requestFieldsAreContained(requestFields, appliedGQLValue.requestFields)
      );
      isNotFound = memoryLoadedAndValid && appliedGQLValue.rawValue === null;
    }

    let searchState: IActualItemProviderSearchState = {
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
      searchShouldCache: false,
      searchFields: null,
      searchRequestedIncludes: {},
      searchRequestedProperties: [],
    };
    const internalState = this.props.itemDefinitionInstance.getInternalState(
      this.props.forId || null, this.props.forVersion || null,
    );
    if (internalState) {
      searchState = internalState.searchState;

      const state = internalState.state;
      this.props.itemDefinitionInstance.applyState(
        this.props.forId || null,
        this.props.forVersion || null,
        state,
      );
    }

    // so the initial setup
    return {
      // same we get the initial state, without checking it externally and passing
      // all the optimization flags
      itemState: this.props.itemDefinitionInstance.getStateNoExternalChecking(
        this.props.forId || null,
        this.props.forVersion || null,
        !this.props.disableExternalChecks,
        this.props.itemDefinitionInstance.isInSearchMode() ?
          getPropertyListForSearchMode(
            this.props.properties || [],
            this.props.itemDefinitionInstance.getStandardCounterpart()
          ) : this.props.properties || [],
        this.props.includes || {},
        !this.props.includePolicies,
      ),
      // and we pass all this state
      isBlocked: false,
      isBlockedButDataIsAccessible: false,
      notFound: isNotFound,
      loadError: null,
      // loading will be true if we are setting up with an id
      // as after mount it will attempt to load such id, in order
      // to avoid pointless refresh we set it up as true from
      // the beggining
      loading: memoryLoadedAndValid ? false : (this.props.avoidLoading ? false : !!this.props.forId),
      // loaded will be whether is loaded or not only if there is an id
      // otherwise it's technically loaded
      loaded: this.props.forId ? memoryLoadedAndValid : true,

      submitError: null,
      submitting: false,
      submitted: false,

      deleteError: null,
      deleting: false,
      deleted: false,

      ...searchState,
      searchWasRestored: true,

      pokedElements: {
        properties: [],
        includes: {},
        policies: [],
      },
    };
  }
  public injectSubmitBlockPromise(p: Promise<any>) {
    this.submitBlockPromises.push(p);
  }
  public markForDestruction() {
    if (this.props.forId) {
      const qualifiedName = this.props.itemDefinitionInstance.getQualifiedPathName();
      const forId = this.props.forId;
      const forVersion = this.props.forVersion || null;

      (window as any)[MEMCACHED_DESTRUCTION_MARKERS_LOCATION] =
        (window as any)[MEMCACHED_DESTRUCTION_MARKERS_LOCATION] ||
        JSON.parse(localStorage.getItem(DESTRUCTION_MARKERS_LOCATION) || "{}");
      let changed = false;
      if (!(window as any)[MEMCACHED_DESTRUCTION_MARKERS_LOCATION][qualifiedName]) {
        (window as any)[MEMCACHED_DESTRUCTION_MARKERS_LOCATION][qualifiedName] = [[forId, forVersion]];
        changed = true;
      } else {
        if (!(window as any)[MEMCACHED_DESTRUCTION_MARKERS_LOCATION][qualifiedName]
          .find((m: [string, string]) => m[0] === forId && m[1] === forVersion)) {
          changed = true;
          (window as any)[MEMCACHED_DESTRUCTION_MARKERS_LOCATION][qualifiedName].push([forId, forVersion]);
        }
      }

      if (changed) {
        localStorage.setItem(DESTRUCTION_MARKERS_LOCATION, JSON.stringify((window as any)[MEMCACHED_DESTRUCTION_MARKERS_LOCATION]));
      }
    }
  }
  public markSearchForDestruction(
    type: "by-parent" | "by-owner" | "by-owner-and-parent",
    qualifiedName: string,
    owner: string,
    parent: [string, string, string],
  ) {
    (window as any)[MEMCACHED_SEARCH_DESTRUCTION_MARKERS_LOCATION] =
      (window as any)[MEMCACHED_SEARCH_DESTRUCTION_MARKERS_LOCATION] ||
      JSON.parse(localStorage.getItem(SEARCH_DESTRUCTION_MARKERS_LOCATION) || "{}");
    let changed = false;
    if (!(window as any)[MEMCACHED_SEARCH_DESTRUCTION_MARKERS_LOCATION][qualifiedName]) {
      (window as any)[MEMCACHED_SEARCH_DESTRUCTION_MARKERS_LOCATION][qualifiedName] = [
        [type, owner, parent],
      ];
      changed = true;
    } else {
      if (
        !(window as any)[MEMCACHED_SEARCH_DESTRUCTION_MARKERS_LOCATION][qualifiedName]
          .find((m: [string, string, [string, string, string]]) =>
            m[0] === type && equals(m[1], owner, { strict: true }) && equals(m[2], parent, { strict: true }))
      ) {
        changed = true;
        (window as any)[MEMCACHED_SEARCH_DESTRUCTION_MARKERS_LOCATION][qualifiedName].push([type, owner, parent]);
      }
    }

    if (changed) {
      localStorage.setItem(SEARCH_DESTRUCTION_MARKERS_LOCATION, JSON.stringify((window as any)[MEMCACHED_SEARCH_DESTRUCTION_MARKERS_LOCATION]));
    }
  }
  public installSetters(props: IActualItemProviderProps = this.props) {
    if (props.setters) {
      props.setters.forEach((setter) => {
        const property = getPropertyForSetter(setter, props.itemDefinitionInstance);
        this.onPropertyEnforce(property, setter.value, props.forId || null, props.forVersion || null, true);
      });
    }
  }
  public removeSetters(props: IActualItemProviderProps = this.props) {
    if (props.setters) {
      props.setters.forEach((setter) => {
        const property = getPropertyForSetter(setter, props.itemDefinitionInstance);
        this.onPropertyClearEnforce(property, props.forId || null, props.forVersion || null, true);
      });
    }
  }
  public installPrefills(props: IActualItemProviderProps = this.props) {
    if (props.prefills) {
      props.prefills.forEach((prefill) => {
        const property = getPropertyForSetter(prefill, props.itemDefinitionInstance);
        property.setCurrentValue(
          props.forId || null,
          props.forVersion || null,
          prefill.value,
          null,
        );
      });
      props.itemDefinitionInstance.cleanInternalState(props.forId || null, props.forVersion || null);
      props.itemDefinitionInstance.triggerListeners(
        "change",
        props.forId || null,
        props.forVersion || null,
      );
    }
  }
  // so now we have mounted, what do we do at the start
  public async componentDidMount() {
    this.isCMounted = true;
    this.mountCbFns.forEach((c) => c());

    // now we retrieve the externally checked value
    if (this.props.containsExternallyCheckedProperty && !this.props.disableExternalChecks) {
      this.setStateToCurrentValueWithExternalChecking(null);
    }

    // this used to be done in the constructor, but it just happens
    // that it won't work with SSR
    let searchIdLoadedFromLocation: string = null;
    if (this.props.loadSearchFromNavigation) {
      searchIdLoadedFromLocation = this.loadSearch();
    }

    if (this.props.automaticSearch) {
      // the search listener might have triggered during the mount callback,
      // which means this function won't see the new state and won't trigger
      // automatic search so we use this variable to check it
      const searchIdToCheckAgainst = this.changedSearchListenerLastCollectedSearchId ?
        this.changedSearchListenerLastCollectedSearchId.id : this.state.searchId;

      if (
        // no search id at all, not in the state, not on the changed listener, nowhere
        (!searchIdToCheckAgainst && !searchIdLoadedFromLocation) ||
        // search is forced and we didn't load from location
        (this.props.automaticSearchForce && !searchIdLoadedFromLocation)
      ) {
        // this variable that is passed into the search is used to set the initial
        // state in case it needs to be saved in the history
        this.initialAutomaticNextSearch = true;
        this.search(this.props.automaticSearch);
      } else {
        this.searchListenersSetup(
          this.props.automaticSearch,
          this.state.searchLastModified,
          this.state.searchOwner,
          this.state.searchParent,
          true,
        );
      }
    }

    if (this.props.markForDestructionOnLogout) {
      this.markForDestruction();
    }

    if (window.TESTING && process.env.NODE_ENV === "development") {
      this.mountOrUpdateIdefForTesting();
    }

    // and we attempt to load the current value
    if (!this.props.avoidLoading) {
      await this.loadValue();
    }
    if (this.props.loadStateFromCache) {
      await this.loadStoredState();
    }
  }

  public mountOrUpdateIdefForTesting(wasContentLoadedFromMemory?: boolean) {
    if (process.env.NODE_ENV === "development") {
      const current = window.TESTING.mountedItems.find(m => m.instanceUUID === this.internalUUID);
      const idefId = this.props.itemDefinitionInstance.getQualifiedPathName();
      const modId = this.props.itemDefinitionInstance.getParentModule().getQualifiedPathName();
      if (current) {
        current.module = modId;
        current.itemDefinition = idefId;
        current.id = this.props.forId || null;
        current.version = this.props.forVersion || null;
        current.isSearchMode = this.props.itemDefinitionInstance.isInSearchMode();
        current.isExtensions = this.props.itemDefinitionInstance.isExtensionsInstance();
        current.wasFound = !this.state.notFound;
        current.staticStatus = this.props.static;
        if (typeof wasContentLoadedFromMemory !== "undefined") {
          current.wasContentLoadedFromMemory = wasContentLoadedFromMemory;
        }
        current.hadAFallback = !!this.props.loadUnversionedFallback;
        current.updateTime = (new Date()).toISOString();
        current.avoidsLoading = !!this.props.avoidLoading;
      } else {
        window.TESTING.mountedItems.push({
          instanceUUID: this.internalUUID,
          module: modId,
          itemDefinition: idefId,
          id: this.props.forId || null,
          version: this.props.forVersion || null,
          isSearchMode: this.props.itemDefinitionInstance.isInSearchMode(),
          isExtensions: this.props.itemDefinitionInstance.isExtensionsInstance(),
          mountTime: (new Date()).toISOString(),
          wasFound: !this.state.notFound,
          hadAFallback: !!this.props.loadUnversionedFallback,
          updateTime: null,
          unmountTime: null,
          staticStatus: this.props.static,
          wasContentLoadedFromMemory: !!wasContentLoadedFromMemory,
          avoidsLoading: !!this.props.avoidLoading,
        });
      }
    }
  }

  // setup the listeners is simple
  public setupListeners() {
    /// first the change listener that checks for every change event that happens with the state
    this.props.itemDefinitionInstance.addListener(
      "change", this.props.forId || null, this.props.forVersion || null, this.changeListener,
    );
    this.props.itemDefinitionInstance.addListener(
      "load", this.props.forId || null, this.props.forVersion || null, this.loadListener,
    );

    // the search change listener
    if (this.props.itemDefinitionInstance.isInSearchMode()) {
      this.props.itemDefinitionInstance.addListener(
        "search-change", this.props.forId || null, this.props.forVersion || null, this.changeSearchListener,
      );
    }

    // second are the remote listeners, only when there's an id defined
    if (this.props.forId && !this.props.searchCounterpart) {
      // one is the reload, this gets called when the value of the field has differed from the one that
      // we have gotten (or have cached) this listener is very important for that reason, otherwise our app
      // will get frozen in the past
      this.props.itemDefinitionInstance.addListener(
        "reload", this.props.forId, this.props.forVersion || null, this.reloadListener,
      );

      if (!this.props.static) {
        // note how we used the item definition instance and that's because those events are piped from
        // within this remote listener, the remote listener pipes the events from the websocket
        // and triggers them in within the item definition instance; that's because the server just says what it does
        // it says "this has been deleted" or "this element has changed" or "the last time this element was changed was"
        // so the remote listener job is to check how does it compare to what we have in our application state
        // do the dates match?... do we even have a value for it?... etc... adding remote listeners is heavy
        // as it will send data either via HTTP or websockets
        this.props.remoteListener.addItemDefinitionListenerFor(
          this,
          this.props.itemDefinitionInstance.getQualifiedPathName(),
          this.props.forId,
          this.props.forVersion || null,
        );
      }
    }
  }
  public unSetupListeners() {
    this.removePossibleSearchListeners();

    // here we just remove the listeners that we have setup
    this.props.itemDefinitionInstance.removeListener(
      "change", this.props.forId || null, this.props.forVersion || null, this.changeListener,
    );
    this.props.itemDefinitionInstance.removeListener(
      "load", this.props.forId || null, this.props.forVersion || null, this.loadListener,
    );

    if (this.props.itemDefinitionInstance.isInSearchMode()) {
      this.props.itemDefinitionInstance.removeListener(
        "search-change", this.props.forId || null, this.props.forVersion || null, this.changeSearchListener,
      );
    }

    if (this.props.forId) {
      // remove all the remote listeners
      this.props.itemDefinitionInstance.removeListener(
        "reload", this.props.forId, this.props.forVersion || null, this.reloadListener,
      );

      if (!this.props.static) {
        this.props.remoteListener.removeItemDefinitionListenerFor(
          this,
          this.props.itemDefinitionInstance.getQualifiedPathName(),
          this.props.forId,
          this.props.forVersion || null,
        );
      }
    }
  }
  public shouldComponentUpdate(
    nextProps: IActualItemProviderProps,
    nextState: IActualItemProviderState,
  ) {
    // so first things first, we want to keep it efficient
    // so let's check if first we updated into something
    // that invalidates the state, refer to the static
    // getDerivedStateFromProps to see how the new state
    // is retrieved
    const updatedIntoSomethingThatInvalidatesTheState =
      this.props.itemDefinitionInstance !== nextProps.itemDefinitionInstance;

    // we only care about things that affect render, the state
    // all of it if it differs does, the optimization flags
    // children, locale data, and ownership assumption
    return updatedIntoSomethingThatInvalidatesTheState ||
      !equals(this.state, nextState, { strict: true }) ||
      (nextProps.forId || null) !== (this.props.forId || null) ||
      !!nextProps.loadModerationFields !== !!this.props.loadModerationFields ||
      nextProps.children !== this.props.children ||
      nextProps.localeData !== this.props.localeData ||
      nextProps.tokenData.id !== this.props.tokenData.id ||
      nextProps.tokenData.role !== this.props.tokenData.role ||
      nextProps.remoteListener !== this.props.remoteListener ||
      !equals(nextProps.properties || [], this.props.properties || [], { strict: true }) ||
      !equals(nextProps.includes || [], this.props.includes || [], { strict: true }) ||
      !!nextProps.static !== !!this.props.static ||
      !!nextProps.includePolicies !== !!this.props.includePolicies ||
      !!nextProps.automaticSearchIsOnlyInitial !== !!this.props.automaticSearchIsOnlyInitial ||
      !equals(nextProps.automaticSearch, this.props.automaticSearch, { strict: true }) ||
      !equals(nextProps.setters, this.props.setters, { strict: true }) ||
      nextProps.location !== this.props.location ||
      !equals(nextProps.injectedParentContext, this.props.injectedParentContext, { strict: true });
  }
  public async componentDidUpdate(
    prevProps: IActualItemProviderProps,
    prevState: IActualItemProviderState,
  ) {
    if (
      prevProps.location &&
      this.props.location &&
      prevProps.location !== this.props.location &&
      ((
        prevProps.location.state &&
        prevProps.location.state[prevProps.loadSearchFromNavigation] &&
        prevProps.location.state[prevProps.loadSearchFromNavigation].searchId
      ) || null) !==
      ((
        this.props.location.state &&
        this.props.location.state[this.props.loadSearchFromNavigation] &&
        this.props.location.state[this.props.loadSearchFromNavigation].searchId
      ) || null)
    ) {
      this.loadSearch();
    }

    // whether the item definition was updated
    // and changed
    const itemDefinitionWasUpdated = this.props.itemDefinitionInstance !== prevProps.itemDefinitionInstance;
    const uniqueIDChanged = (prevProps.forId || null) !== (this.props.forId || null) ||
      (prevProps.forVersion || null) !== (this.props.forVersion || null);
    const didSomethingThatInvalidatedSetters =
      !equals(this.props.setters, prevProps.setters, { strict: true }) ||
      uniqueIDChanged ||
      itemDefinitionWasUpdated;
    const didSomethingThatInvalidatedPrefills =
      !equals(this.props.prefills, prevProps.prefills, { strict: true }) ||
      uniqueIDChanged ||
      itemDefinitionWasUpdated;

    if (itemDefinitionWasUpdated || uniqueIDChanged) {
      this.releaseCleanupBlock(prevProps);
      this.blockCleanup();
    }

    // if the mark for destruction has changed in a meaningful way
    // we recheck it
    if (
      this.props.markForDestructionOnLogout &&
      (
        itemDefinitionWasUpdated ||
        uniqueIDChanged
      )
    ) {
      this.markForDestruction();
    }

    if (window.TESTING && process.env.NODE_ENV === "development") {
      this.mountOrUpdateIdefForTesting();
    }

    if (didSomethingThatInvalidatedSetters) {
      this.removeSetters(prevProps);
      this.installSetters();
    }

    if (didSomethingThatInvalidatedPrefills) {
      this.installPrefills();
    }

    // now if the id changed, the optimization flags changed, or the item definition
    // itself changed
    if (
      itemDefinitionWasUpdated ||
      uniqueIDChanged ||
      didSomethingThatInvalidatedSetters ||
      didSomethingThatInvalidatedPrefills ||
      !equals(prevProps.properties || [], this.props.properties || [], { strict: true }) ||
      !equals(prevProps.includes || [], this.props.includes || [], { strict: true }) ||
      !!prevProps.static !== !!this.props.static ||
      !!prevProps.includePolicies !== !!this.props.includePolicies
    ) {
      // now we have to check on whether the current state is static
      // or not
      const isStatic = this.props.static;
      // compared to the previous
      const wasStatic = prevProps.static;

      // if it's now static and it was not static before, we got to remove
      // the remote listeners, note that listeners are only added with an id
      // so we check for that as well
      let alreadyRemovedRemoteListeners: boolean = false;
      let alreadyAddedRemoteListeners: boolean = false;
      if (isStatic && !wasStatic && prevProps.forId) {
        // we mark the flag as true
        alreadyRemovedRemoteListeners = true;
        // and remove the listeners
        prevProps.itemDefinitionInstance.removeListener(
          "reload", prevProps.forId, prevProps.forVersion, this.reloadListener,
        );
        prevProps.remoteListener.removeItemDefinitionListenerFor(
          this, prevProps.itemDefinitionInstance.getQualifiedPathName(),
          prevProps.forId, prevProps.forVersion || null,
        );
      } else if (!isStatic && wasStatic && this.props.forId) {
        alreadyAddedRemoteListeners = true;
        this.props.itemDefinitionInstance.addListener(
          "reload", this.props.forId, this.props.forVersion || null, this.reloadListener,
        );
        this.props.remoteListener.addItemDefinitionListenerFor(
          this, this.props.itemDefinitionInstance.getQualifiedPathName(),
          this.props.forId, this.props.forVersion || null,
        );
      }

      // if this was an item definition or id update
      if (
        itemDefinitionWasUpdated ||
        uniqueIDChanged
      ) {
        // we need to remove the old listeners
        prevProps.itemDefinitionInstance.removeListener(
          "change", prevProps.forId || null, prevProps.forVersion || null, this.changeListener,
        );
        prevProps.itemDefinitionInstance.removeListener(
          "load", prevProps.forId || null, prevProps.forVersion || null, this.loadListener,
        );
        if (prevProps.itemDefinitionInstance.isInSearchMode()) {
          prevProps.itemDefinitionInstance.removeListener(
            "search-change", prevProps.forId || null, prevProps.forVersion || null, this.changeSearchListener,
          );
        }
        // we only remove this listeners if we haven't done it before for other reasons
        if (prevProps.forId && !wasStatic && !alreadyRemovedRemoteListeners) {
          prevProps.itemDefinitionInstance.removeListener(
            "reload", prevProps.forId, prevProps.forVersion || null, this.reloadListener,
          );
          prevProps.remoteListener.removeItemDefinitionListenerFor(
            this, prevProps.itemDefinitionInstance.getQualifiedPathName(),
            prevProps.forId, prevProps.forVersion || null,
          );
        }

        // add the new listeners
        this.props.itemDefinitionInstance.addListener(
          "change", this.props.forId || null, this.props.forVersion || null, this.changeListener,
        );
        this.props.itemDefinitionInstance.addListener(
          "load", this.props.forId || null, this.props.forVersion || null, this.loadListener,
        );
        if (this.props.itemDefinitionInstance.isInSearchMode()) {
          this.props.itemDefinitionInstance.addListener(
            "search-change", this.props.forId || null, this.props.forVersion || null, this.changeSearchListener,
          );
        }
        if (this.props.forId && !isStatic && !alreadyAddedRemoteListeners) {
          this.props.itemDefinitionInstance.addListener(
            "reload", this.props.forId, this.props.forVersion || null, this.reloadListener,
          );
          this.props.remoteListener.addItemDefinitionListenerFor(
            this, this.props.itemDefinitionInstance.getQualifiedPathName(),
            this.props.forId, this.props.forVersion || null,
          );
        }
      }

      // we set the value given we have changed the forId with the new optimization flags
      if (!this.isUnmounted) {
        this.setState({
          itemState: this.props.itemDefinitionInstance.getStateNoExternalChecking(
            this.props.forId || null,
            this.props.forVersion || null,
            !this.props.disableExternalChecks,
            this.props.itemDefinitionInstance.isInSearchMode() ?
              getPropertyListForSearchMode(
                this.props.properties || [],
                this.props.itemDefinitionInstance.getStandardCounterpart()
              ) : this.props.properties || [],
            this.props.includes || {},
            !this.props.includePolicies,
          ),
        });
      }

      // and run the external check
      if (this.props.containsExternallyCheckedProperty && !this.props.disableExternalChecks) {
        this.setStateToCurrentValueWithExternalChecking(null);
      }
    }

    // if the id has changed or the item defintion was changed
    // or the role, which affects how things are fetch or the ownership
    // assumption, we need to reload the values if it's so necessary
    if (
      (prevProps.forId || null) !== (this.props.forId || null) ||
      (prevProps.forVersion || null) !== (this.props.forVersion || null) ||
      prevProps.tokenData.id !== this.props.tokenData.id ||
      prevProps.tokenData.role !== this.props.tokenData.role ||
      prevProps.loadModerationFields !== this.props.loadModerationFields ||
      itemDefinitionWasUpdated
    ) {
      if (!this.props.avoidLoading) {
        await this.loadValue();
      }
    }

    if (
      uniqueIDChanged &&
      this.props.loadStateFromCache
    ) {
      await this.loadStoredState();
    }

    if (
      // if the automatic search is not setup to just initial
      !this.props.automaticSearchIsOnlyInitial &&
      // if there was previously an automatic search
      (
        (
          prevProps.automaticSearch &&
          (
            !equals(this.props.automaticSearch, prevProps.automaticSearch, { strict: true }) ||
            // these two would cause search results to be dismissed because
            // the fact the token is a key part of the search itself so we would
            // dismiss the search in such a case as the token is different
            // that or the automatic search would be reexecuted
            itemDefinitionWasUpdated ||
            didSomethingThatInvalidatedSetters ||
            didSomethingThatInvalidatedPrefills ||
            prevProps.tokenData.token !== this.props.tokenData.token
          )
        ) ||
        (!prevProps.automaticSearch && this.props.automaticSearch)
      )
    ) {
      // we might have a listener in an old item definition
      // so we need to get rid of it
      if (itemDefinitionWasUpdated) {
        this.removePossibleSearchListeners(prevProps, prevState);
      }
      // maybe there's no new automatic search
      if (this.props.automaticSearch) {
        this.search(this.props.automaticSearch);
      } else {
        this.dismissSearchResults();
      }
    }

    // this is a different instance, we consider it dismounted
    if (
      prevProps.mountId !== this.props.mountId
    ) {
      this.runDismountOn(prevProps);
    }

    // expensive but necessary
    if (this.props.onStateChange && !equals(this.state.itemState, prevState.itemState, { strict: true })) {
      this.props.onStateChange(this.state.itemState);
    }
  }

  public reloadListener() {
    if (!this.isCMounted) {
      if (this.mountCbFns.indexOf(this.reloadListener) === -1) {
        this.mountCbFns.push(this.reloadListener);
      }
      return;
    }
    console.log("reload requested for", this.props.itemDefinitionInstance.getQualifiedPathName(), this.props.forId);
    // well this is very simple the app requested a reload
    // because it says that whatever we have in memory is not valid
    // whether it is in the cache or not, so we call it as so, and deny the cache
    // passing true
    if (!this.props.avoidLoading) {
      this.loadValue(true);
    }
  }
  public changeSearchListener() {
    if (this.isUnmounted) {
      return;
    } else if (!this.isCMounted) {
      if (this.mountCbFns.indexOf(this.changeSearchListener) === -1) {
        this.mountCbFns.push(this.changeSearchListener);
      }
      return;
    }

    let searchState: IActualItemProviderSearchState = {
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
      searchShouldCache: false,
      searchFields: null,
      searchRequestedIncludes: {},
      searchRequestedProperties: [],
    };
    const internalState = this.props.itemDefinitionInstance.getInternalState(
      this.props.forId || null, this.props.forVersion || null,
    );
    if (internalState) {
      searchState = internalState.searchState;
    }

    this.changedSearchListenerLastCollectedSearchId = {
      id: searchState.searchId
    };

    this.setState(searchState);
  }
  public changeListener() {
    if (this.isUnmounted) {
      return;
    } else if (!this.isCMounted) {
      if (this.mountCbFns.indexOf(this.changeListener) === -1) {
        this.mountCbFns.push(this.changeListener);
      }
      return;
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
    if (this.props.forId) {
      const appliedValue = this.props.itemDefinitionInstance.getGQLAppliedValue(
        this.props.forId || null,
        this.props.forVersion || null,
      );
      if (appliedValue) {
        isNotFound = appliedValue.rawValue === null;

        const { requestFields } = getFieldsAndArgs({
          includeArgs: false,
          includeFields: true,
          includes: this.props.includes || {},
          properties: this.props.properties || [],
          includeModeration: this.props.loadModerationFields,
          itemDefinitionInstance: this.props.itemDefinitionInstance,
          forId: this.props.forId,
          forVersion: this.props.forVersion || null,
        });

        if (!requestFieldsAreContained(requestFields, appliedValue.requestFields)) {
          dataIsCorrupted = true;
        }
      }
    }

    if (dataIsCorrupted) {
      clearTimeout(this.repairCorruptionTimeout);
      this.repairCorruptionTimeout = setTimeout(this.reloadListener, 70);
    }

    // we basically just upgrade the state
    this.setState({
      itemState: this.props.itemDefinitionInstance.getStateNoExternalChecking(
        this.props.forId || null,
        this.props.forVersion || null,
        !this.props.disableExternalChecks,
        this.props.itemDefinitionInstance.isInSearchMode() ?
          getPropertyListForSearchMode(
            this.props.properties || [],
            this.props.itemDefinitionInstance.getStandardCounterpart()
          ) : this.props.properties || [],
        this.props.includes || {},
        !this.props.includePolicies,
      ),
      // also search might do this, and it's true anyway
      notFound: isNotFound,
    });
  }

  /**
   * This listener triggers on load and the search
   * loader triggers it
   */
  public loadListener() {
    if (this.isUnmounted) {
      return;
    } else if (!this.isCMounted) {
      if (this.mountCbFns.indexOf(this.loadListener) === -1) {
        this.mountCbFns.push(this.loadListener);
      }
      return;
    }

    // the item must update all its fields and its internal state
    // as the search did an apply to it
    this.changeListener();

    const forId = this.props.forId || null;
    const forVersion = this.props.forVersion || null;

    const appliedGQLValue = this.props.itemDefinitionInstance.getGQLAppliedValue(
      forId, forVersion,
    );
    if (appliedGQLValue) {
      const completedValue: IActionResponseWithValue = {
        value: appliedGQLValue.rawValue,
        error: null,
      }
      // we need to cache what we have been just specified
      if (
        CacheWorkerInstance.isSupported &&
        this.props.longTermCaching
      ) {
        const qualifiedName = this.props.itemDefinitionInstance.getQualifiedPathName();
        if (appliedGQLValue.rawValue) {
          CacheWorkerInstance.instance.mergeCachedValue(
            PREFIX_GET + qualifiedName,
            forId,
            forVersion || null,
            appliedGQLValue.rawValue,
            appliedGQLValue.requestFields,
          );
        } else {
          CacheWorkerInstance.instance.setCachedValue(
            PREFIX_GET + qualifiedName,
            forId,
            forVersion || null,
            null,
            null,
          );
        }
      }

      this.props.onLoad && this.props.onLoad(completedValue);
      return completedValue;
    }

    // we basically just upgrade the state
    this.setState({
      // we do this because eg. the search relies on triggering the load listener
      // no notify that things aren't loading anymore
      loading: false,
      loaded: true,
    });
  }
  public async loadStoredState() {
    if (CacheWorkerInstance.isSupported) {
      const storedState = await CacheWorkerInstance.instance.retrieveState(
        this.props.itemDefinitionQualifiedName,
        this.props.forId || null,
        this.props.forVersion || null,
      );

      if (storedState) {
        this.props.itemDefinitionInstance.applyState(
          this.props.forId || null,
          this.props.forVersion || null,
          storedState,
        );
        this.setState({
          itemState: this.props.itemDefinitionInstance.getStateNoExternalChecking(
            this.props.forId || null,
            this.props.forVersion || null,
            !this.props.disableExternalChecks,
            this.props.itemDefinitionInstance.isInSearchMode() ?
              getPropertyListForSearchMode(
                this.props.properties || [],
                this.props.itemDefinitionInstance.getStandardCounterpart()
              ) : this.props.properties || [],
            this.props.includes || {},
            !this.props.includePolicies,
          ),
        }, () => {
          this.props.onStateLoadedFromStore(storedState, {
            submit: this.submit,
            delete: this.delete,
            reload: this.loadValue,
            clean: this.clean,
            poke: this.poke,
            search: this.search,
            unpoke: this.unpoke,
          });
        });
      }
    }
  }
  public async loadValue(denyCache?: boolean): Promise<IActionResponseWithValue> {
    const forId = this.props.forId;
    const forVersion = this.props.forVersion || null;

    this.lastLoadingForId = forId;
    this.lastLoadingForVersion = forVersion;

    // we wil reuse the old promise in case
    // there's an overlapping value being loaded
    // the old call won't trigger the promise
    // as it won't match the current signature
    if (this.lastLoadValuePromiseIsResolved) {
      this.lastLoadValuePromise = new Promise((resolve) => {
        this.lastLoadValuePromiseResolve = resolve;
      });
      this.lastLoadValuePromiseIsResolved = false;
    }

    // we don't use loading here because there's one big issue
    // elements are assumed into the loading state by the constructor
    // if they have an id
    if (!forId || this.props.searchCounterpart) {
      if ((this.state.loading || this.state.loaded || this.state.loadError) && !this.isUnmounted) {
        this.setState({
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
      includes: this.props.includes || {},
      properties: this.props.properties || [],
      includeModeration: this.props.loadModerationFields,
      itemDefinitionInstance: this.props.itemDefinitionInstance,
      forId: forId,
      forVersion: forVersion,
    });

    // the reason why we use deny cache here is simple
    // the search context is a form of a memory cache, it might be loading
    // still when for some reason it was asked to reload, I can think of a extreme case
    // when the client loads from memory, a reload is requested, but the search conxtext hasn't
    // released yet the value
    if (
      !denyCache &&
      this.props.searchContext &&
      this.props.searchContext.currentlySearching.find(
        (s) =>
          s.id === forId &&
          s.version === forVersion &&
          s.type === this.props.itemDefinitionInstance.getQualifiedPathName(),
      ) &&
      requestFieldsAreContained(requestFields, this.props.searchContext.searchFields)
    ) {
      // now we wait for the search loader to trigger the load event
      if (!this.isUnmounted) {
        this.setState({
          loading: true,
          loaded: false,
        });
      }
      return null;
    }

    if (!denyCache) {
      // Prevent loading at all if value currently available and memoryCached
      const appliedGQLValue = this.props.itemDefinitionInstance.getGQLAppliedValue(
        forId, forVersion,
      );
      if (
        appliedGQLValue &&
        requestFieldsAreContained(requestFields, appliedGQLValue.requestFields)
      ) {
        if (window.TESTING && process.env.NODE_ENV === "development") {
          this.mountOrUpdateIdefForTesting(true);
        }
        const completedValue = this.loadValueCompleted({
          value: appliedGQLValue.rawValue,
          error: null,
          forId,
          forVersion,
        });
        if (this.props.static !== "TOTAL") {
          this.props.remoteListener.requestFeedbackFor({
            itemDefinition: this.props.itemDefinitionInstance.getQualifiedPathName(),
            id: forId,
            version: forVersion || null,
          });
        }
        // in some situations the value can be in memory but not yet permanently cached
        // (eg. when there is a search context)
        // and another item without a search context attempts to load the value this will
        // make it so that when we are exiting the search context it caches
        if (
          CacheWorkerInstance.isSupported &&
          this.props.longTermCaching &&
          !this.props.searchContext
        ) {
          const qualifiedName = this.props.itemDefinitionInstance.getQualifiedPathName();
          if (appliedGQLValue.rawValue) {
            CacheWorkerInstance.instance.mergeCachedValue(
              PREFIX_GET + qualifiedName,
              forId,
              forVersion || null,
              appliedGQLValue.rawValue,
              appliedGQLValue.requestFields,
            );
          } else {
            CacheWorkerInstance.instance.setCachedValue(
              PREFIX_GET + qualifiedName,
              forId,
              forVersion || null,
              null,
              null,
            );
          }
        }

        this.props.onLoad && this.props.onLoad(completedValue);
        return completedValue;
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
    if (!this.state.loading && !this.isUnmounted) {
      this.setState({
        loading: true,
        loaded: false,
      });
    } else if (!this.isUnmounted) {
      this.setState({
        loaded: false,
      });
    }

    const containsExternallyCheckedProperty = this.props.containsExternallyCheckedProperty;
    const qualifiedPathName = this.props.itemDefinitionInstance.getQualifiedPathName();

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
      returnWorkerCachedValues: !denyCache,
      itemDefinition: this.props.itemDefinitionInstance,
      id: forId,
      version: forVersion,
      token: this.props.tokenData.token,
      language: this.props.localeData.language,
      cacheStore: this.props.longTermCaching,
      waitAndMerge: this.props.waitAndMerge,
    });

    if (!error) {
      // we apply the value, whatever we have gotten this will affect all the instances
      // that use the same value, note that value can be null
      this.props.itemDefinitionInstance.applyValue(
        forId,
        forVersion,
        value,
        false,
        getQueryFields,
        true,
      );

      // and then we trigger the change listener for all the instances
      this.props.itemDefinitionInstance.triggerListeners(
        "change", forId, forVersion,
      );
      // and if we have an externally checked property we do the external check
      // we need to ensure that our current item definition instance hasn't changed
      // its for id and for version while we were loading
      if (
        containsExternallyCheckedProperty &&
        !this.props.disableExternalChecks &&
        forId === this.lastLoadingForId &&
        forVersion === this.lastLoadingForVersion
      ) {
        this.setStateToCurrentValueWithExternalChecking(null);
      }
    }

    // if the item has been cached, as in returned from the indexed db database
    // rather than the server, we don't know if it's actually the current value
    // so we request feedback from the listener, the listener will kick a reload
    // event if it finds a mismatch which will cause this function to run again (see above)
    // but the denyCache flag will be active, ensuring the value will be requested
    // from the server
    if (cached && this.props.static !== "TOTAL") {
      this.props.remoteListener.requestFeedbackFor({
        itemDefinition: qualifiedPathName,
        id: forId,
        version: forVersion,
      });
    }

    return this.loadValueCompleted({
      value,
      error,
      forId,
      forVersion,
    });
  }
  public loadValueCompleted(value: ILoadCompletedPayload): IActionResponseWithValue {
    // basically if it's unmounted, or what we were updating for does not match
    // what we are supposed to be updating for, this basically means load value got called once
    // again before the previous value managed to load, this can happen, when switching forId and/or
    // for version very rapidly
    const shouldNotUpdateState =
      this.isUnmounted ||
      value.forId !== this.lastLoadingForId ||
      value.forVersion !== this.lastLoadingForVersion;

    // return immediately
    if (shouldNotUpdateState) {
      const result = {
        value: value.value,
        error: value.error,
      };
      this.props.onLoad && this.props.onLoad(result)
      return result;
    }

    // so once everything has been completed this function actually runs per instance
    if (value.error) {
      // if we got an error we basically have no value
      !this.isUnmounted && this.setState({
        // set the load error and all the logical states, we are not loading
        // anymore
        loadError: value.error,
        loaded: false,
        isBlocked: false,
        isBlockedButDataIsAccessible: false,
        notFound: false,
        loading: false,
      });
      // otherwise if there's no value, it means the item is not found
    } else if (!value.value) {
      // we mark it as so, it is not found
      !this.isUnmounted && this.setState({
        loadError: null,
        notFound: true,
        isBlocked: false,
        isBlockedButDataIsAccessible: false,
        loading: false,
        loaded: true,
      });
    } else if (value.value) {
      // otherwise if we have a value, we check all these options
      !this.isUnmounted && this.setState({
        loadError: null,
        notFound: false,
        isBlocked: !!value.value.blocked_at,
        isBlockedButDataIsAccessible: value.value.blocked_at ? !!value.value.DATA : false,
        loading: false,
        loaded: true,
      });
    }

    this.lastLoadValuePromiseIsResolved = true;
    this.lastLoadValuePromiseResolve();

    // now we return
    const result = {
      value: value.value,
      error: value.error,
    };
    this.props.onLoad && this.props.onLoad(result);
    return result;
  }
  public async setStateToCurrentValueWithExternalChecking(currentUpdateId: number) {
    // so when we want to externally check we first run the external check
    // using the normal get state function which runs async
    const newItemState = await this.props.itemDefinitionInstance.getState(
      this.props.forId || null,
      this.props.forVersion || null,
      this.props.itemDefinitionInstance.isInSearchMode() ?
        getPropertyListForSearchMode(
          this.props.properties || [],
          this.props.itemDefinitionInstance.getStandardCounterpart()
        ) : this.props.properties || [],
      this.props.includes || {},
      !this.props.includePolicies,
    );

    // if the current update id is null (as in always update) or the last update id
    // that was requested is the same as the current (this is important in order)
    // to avoid situations where two external checks have been requested for some
    // reason only the last should be applied
    if (currentUpdateId === null || this.lastUpdateId === currentUpdateId) {
      // we set the state to the new state
      if (!this.isUnmounted) {
        this.setState({
          itemState: newItemState,
        });
      }
      // and trigger change listeners, all but our listener
      // we still need to trigger all other listeners
      this.props.itemDefinitionInstance.triggerListeners(
        "change", this.props.forId || null, this.props.forVersion || null, this.changeListener);
    }
  }
  public onPropertyChangeOrRestoreFinal() {
    // trigger the listeners for change so everything updates nicely
    this.props.itemDefinitionInstance.triggerListeners(
      "change",
      this.props.forId || null,
      this.props.forVersion || null,
    );

    if (this.props.containsExternallyCheckedProperty && !this.props.disableExternalChecks) {
      // so we build an id for this change, for that we simply use
      // the date
      const currentUpdateId = (new Date()).getTime();
      // this change was identified by this id
      this.lastUpdateId = currentUpdateId;

      // we clear any previous timeout to check external properties
      clearTimeout(this.updateTimeout);
      // and now we build a new timeout to check external properties, which such id
      // if in 600ms the user stops doing anything, the externally checked property
      // will triger and an external check will launch
      this.updateTimeout = setTimeout(
        this.setStateToCurrentValueWithExternalChecking.bind(this, currentUpdateId),
        600,
      );
    }

    // if we are in search mode and have an automatic search we need
    // to retrigger the search when properties change
    if (this.props.automaticSearch && !this.props.automaticSearchIsOnlyInitial) {
      clearTimeout(this.automaticSearchTimeout);

      // if the search must be done instantly
      if (this.props.automaticSearchInstant) {
        this.preventSearchFeedbackOnPossibleStaleData = true;
        this.search(this.props.automaticSearch);
      } else {
        this.automaticSearchTimeout = setTimeout(() => {
          // now this varibale specifically is used in cached searches and the reason we need to
          // prevent search feedback for this is because we are just refiltering
          // as the properties have changed, we do not need to request for feedback
          // every single time a property changes because it is wasteful
          this.preventSearchFeedbackOnPossibleStaleData = true;
          this.search(this.props.automaticSearch);
        }, 300);
      }
    }
  }
  public onPropertyRestore(
    property: PropertyDefinition,
  ) {
    if (this.state.loading) {
      return;
    }

    property.restoreValueFor(
      this.props.forId || null,
      this.props.forVersion || null,
    );
    this.props.itemDefinitionInstance.cleanInternalState(this.props.forId || null, this.props.forVersion || null);
    this.onPropertyChangeOrRestoreFinal();
  }
  public async onPropertyChange(
    property: PropertyDefinition,
    value: PropertyDefinitionSupportedType,
    internalValue: any,
  ) {
    if (this.state.loading) {
      // loading will overwrite any possible property changes
      // so we await for it to end
      await this.lastLoadValuePromise;
    }

    // we simply set the current value in the property
    property.setCurrentValue(
      this.props.forId || null,
      this.props.forVersion || null,
      value,
      internalValue,
    );
    this.props.itemDefinitionInstance.cleanInternalState(this.props.forId || null, this.props.forVersion || null);
    this.onPropertyChangeOrRestoreFinal();
  }
  public onPropertyEnforceOrClearFinal(
    givenForId: string,
    givenForVersion: string,
  ) {
    this.props.itemDefinitionInstance.triggerListeners(
      "change",
      givenForId || null,
      givenForVersion || null,
    );
    if (this.props.automaticSearch && !this.props.automaticSearchIsOnlyInitial && this.isCMounted) {
      this.search(this.props.automaticSearch);
    }
  }
  public onPropertyEnforce(
    property: PropertyDefinition,
    value: PropertyDefinitionSupportedType,
    givenForId: string,
    givenForVersion: string,
    internal?: boolean,
  ) {
    // this function is basically run by the setter
    // since they might be out of sync that's why the id is passed
    // the setter enforces values
    property.setSuperEnforced(givenForId || null, givenForVersion || null, value, this);
    this.props.itemDefinitionInstance.cleanInternalState(this.props.forId || null, this.props.forVersion || null);
    if (!internal) {
      this.onPropertyEnforceOrClearFinal(givenForId, givenForVersion);
    }
  }
  public onPropertyClearEnforce(
    property: PropertyDefinition,
    givenForId: string,
    givenForVersion: string,
    internal?: boolean,
  ) {
    // same but removes the enforcement
    property.clearSuperEnforced(givenForId || null, givenForVersion || null, this);
    this.props.itemDefinitionInstance.cleanInternalState(this.props.forId || null, this.props.forVersion || null);
    if (!internal) {
      this.onPropertyEnforceOrClearFinal(givenForId, givenForVersion);
    }
  }
  public runDismountOn(props: IActualItemProviderProps = this.props) {
    // when unmounting we check our optimization flags to see
    // if we are expecting to clean up the memory cache
    if (props.cleanOnDismount) {
      if (typeof props.cleanOnDismount === "boolean") {
        props.itemDefinitionInstance.cleanValueFor(props.forId || null, props.forVersion || null);
        // this will affect other instances that didn't dismount
        props.itemDefinitionInstance.triggerListeners(
          "change", props.forId || null, props.forVersion || null,
        );

        if (props.itemDefinitionInstance.isInSearchMode()) {
          props.itemDefinitionInstance.cleanInternalState(props.forId || null, props.forVersion || null);
          props.itemDefinitionInstance.triggerListeners("search-change", props.forId || null, props.forVersion || null);
        }
      } else {
        this.cleanWithProps(props, props.cleanOnDismount, "success", false);
      }
    }
  }
  public componentWillUnmount() {
    this.isUnmounted = true;
    this.releaseCleanupBlock();
    this.unSetupListeners();
    this.removeSetters();
    this.runDismountOn();

    if (window.TESTING && process.env.NODE_ENV === "development") {
      const mountItem = window.TESTING.mountedItems.find(m => m.instanceUUID === this.internalUUID);
      if (mountItem) {
        mountItem.unmountTime = (new Date()).toISOString();
      }
    }
  }
  public onIncludeSetExclusionState(include: Include, state: IncludeExclusionState) {
    // just sets the exclusion state
    include.setExclusionState(this.props.forId || null, this.props.forVersion || null, state);
    this.props.itemDefinitionInstance.triggerListeners(
      "change", this.props.forId || null, this.props.forVersion || null);

    // note how externally checked properties might be affected for this
    if (this.props.containsExternallyCheckedProperty && !this.props.disableExternalChecks) {
      const currentUpdateId = (new Date()).getTime();
      this.lastUpdateId = currentUpdateId;

      clearTimeout(this.updateTimeout);
      this.updateTimeout = setTimeout(
        this.setStateToCurrentValueWithExternalChecking.bind(this, currentUpdateId),
        600,
      );
    }
  }
  public checkItemStateValidity(
    options: {
      properties: string[],
      includes?: { [include: string]: string[] },
      policies?: PolicyPathType[],
      onlyIncludeIfDiffersFromAppliedValue?: boolean,
    },
  ): boolean {
    // let's make this variable to check on whether things are invalid or not
    // first we check every property, that is included and allowed we use some
    // and return whether it's invalid
    const allIncludedPropertiesValid = options.properties.every((pId) => {
      // first lets try to get the state for the current state if any
      let p = this.state.itemState.properties.find((p) => p.propertyId === pId);
      // in some situations, say when we try to manually submit a property this property might not be avaliable
      // in the state but yet still exist within the item definition itself
      if (!p) {
        p = this.props.itemDefinitionInstance.getPropertyDefinitionFor(pId, true)
          .getStateNoExternalChecking(this.props.forId || null, this.props.forVersion || null, true);
      }
      // now we check if we have the option to only include those that differ
      // from the applied value
      if (options.onlyIncludeIfDiffersFromAppliedValue) {
        // we get the current applied value, if any
        const currentAppliedValue = this.props.itemDefinitionInstance.getGQLAppliedValue(
          this.props.forId || null, this.props.forVersion || null);
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
      const i = this.state.itemState.includes.find((i) => i.includeId === iId);
      // and now we get the sinking property ids
      const include = this.props.itemDefinitionInstance.getIncludeFor(i.includeId);
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
          const currentAppliedValue = this.props.itemDefinitionInstance.getGQLAppliedValue(
            this.props.forId || null, this.props.forVersion || null);
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
      const propertyInPolicy = this.state.itemState.policies[policyType][policyName]
        .find((p: IPropertyDefinitionState) => p.propertyId === propertyId);
      return propertyInPolicy.valid;
    });
  }

  public giveEmulatedInvalidError(
    stateApplied: string,
    withId: boolean,
    withSearchResults: boolean,
  ): IActionResponseWithId | IActionResponseWithValue | IActionResponseWithSearchResults {

    if (isDevelopment) {
      console.warn(
        "Action refused due to invalid partial/total state at",
        this.props.itemDefinitionInstance.getStateNoExternalChecking(this.props.forId || null, this.props.forVersion || null),
      );
    }

    const emulatedError: EndpointErrorType = {
      message: "Submit refused due to invalid information in form fields",
      code: ENDPOINT_ERRORS.INVALID_DATA_SUBMIT_REFUSED,
    };
    if (!this.isUnmounted) {
      this.setState({
        [stateApplied]: emulatedError,
      } as any);
    }

    if (withId) {
      return {
        id: null,
        version: null,
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
      };
    } else {
      return {
        value: null,
        error: emulatedError,
      };
    }
  }
  public async delete(options: IActionDeleteOptions = {}): Promise<IBasicActionResponse> {
    if (this.state.deleting) {
      throw new Error("Can't delete while deleting, please consider your calls")
    }

    if (this.props.forId === null) {
      return null;
    }

    const isValid = this.checkItemStateValidity({
      properties: [],
      ...options,
    });

    if (!isValid) {
      // if it's not poked already, let's poke it
      if (!this.isUnmounted) {
        this.setState({
          pokedElements: {
            properties: [],
            includes: {},
            policies: options.policies || [],
          },
        });
      }
      this.cleanWithProps(this.props, options, "fail");
      return this.giveEmulatedInvalidError("deleteError", false, false);
    }

    if (options.beforeDelete) {
      const result = await options.beforeDelete();
      if (!result) {
        return null;
      }
    }

    const {
      argumentsForQuery,
    } = getFieldsAndArgs({
      includeArgs: false,
      includeFields: true,
      uniteFieldsWithAppliedValue: true,
      includesForArgs: {},
      propertiesForArgs: [],
      policiesForArgs: options.policies || [],
      includeModeration: false,
      itemDefinitionInstance: this.props.itemDefinitionInstance,
      forId: this.props.forId,
      forVersion: this.props.forVersion || null,
    });

    if (!this.isUnmounted) {
      this.setState({
        deleting: true,
      });
    }

    const {
      error,
    } = await runDeleteQueryFor({
      args: argumentsForQuery,
      itemDefinition: this.props.itemDefinitionInstance,
      id: this.props.forId,
      version: this.props.forVersion || null,
      token: this.props.tokenData.token,
      language: this.props.localeData.language,
      listenerUUID: this.props.remoteListener.getUUID(),
      cacheStore: this.props.longTermCaching,
    });

    if (error) {
      if (!this.isUnmounted) {
        this.setState({
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
      this.cleanWithProps(this.props, options, "success");
    } else {
      this.props.itemDefinitionInstance.cleanValueFor(this.props.forId || null, this.props.forVersion || null);
      if (!this.isUnmounted) {
        this.setState({
          deleteError: null,
          deleting: false,
          deleted: true,
          notFound: true,
          pokedElements: {
            properties: [],
            includes: {},
            policies: (options.policies || []),
          },
        });
      }
      this.cleanWithProps(this.props, options, "fail");
      this.props.itemDefinitionInstance.triggerListeners("change", this.props.forId, this.props.forVersion || null);
    }

    this.props.onDelete && this.props.onDelete({ error });
    return {
      error,
    };
  }
  public clean(
    options: IActionCleanOptions,
    state: "success" | "fail",
    avoidTriggeringUpdate?: boolean,
  ): boolean {
    return this.cleanWithProps(
      this.props,
      options,
      state,
      avoidTriggeringUpdate,
    );
  }
  public cleanWithProps(
    props: IActualItemProviderProps,
    options: IActionCleanOptions,
    state: "success" | "fail",
    avoidTriggeringUpdate?: boolean,
  ): boolean {
    if (!this.isUnmounted) {
      if (
        options.unpokeAfterAny ||
        options.unpokeAfterFailure && state === "fail" ||
        options.unpokeAfterSuccess && state === "success"
      ) {
        this.setState({
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
      props.itemDefinitionInstance
        .getPropertyDefinitionFor(ptr, true).restoreValueFor(props.forId || null,
          props.forVersion || null);
    };
    if (
      options.propertiesToRestoreOnSuccess && state === "success"
    ) {
      let propertiesToRestore = options.propertiesToRestoreOnSuccess;
      if (props.itemDefinitionInstance.isInSearchMode()) {
        propertiesToRestore = getPropertyListForSearchMode(
          propertiesToRestore,
          props.itemDefinitionInstance.getStandardCounterpart()
        );
      }
      propertiesToRestore.forEach(restorePropertyFn);
      needsUpdate = true;
    }
    if (
      options.propertiesToRestoreOnAny
    ) {
      let propertiesToRestore = options.propertiesToRestoreOnAny;
      if (props.itemDefinitionInstance.isInSearchMode()) {
        propertiesToRestore = getPropertyListForSearchMode(
          propertiesToRestore,
          props.itemDefinitionInstance.getStandardCounterpart()
        );
      }
      propertiesToRestore.forEach(restorePropertyFn);
      needsUpdate = true;
    }
    if (
      options.propertiesToRestoreOnFailure && state === "fail"
    ) {
      let propertiesToRestore = options.propertiesToRestoreOnFailure;
      if (props.itemDefinitionInstance.isInSearchMode()) {
        propertiesToRestore = getPropertyListForSearchMode(
          propertiesToRestore,
          props.itemDefinitionInstance.getStandardCounterpart()
        );
      }
      propertiesToRestore.forEach(restorePropertyFn);
      needsUpdate = true;
    }

    // RESTORING INCLUDES
    const restoreIncludeFn = (itr: string) => {
      props.itemDefinitionInstance
        .getIncludeFor(itr).restoreValueFor(props.forId || null,
          props.forVersion || null);
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
      props.itemDefinitionInstance.cleanValueFor(props.forId || null, props.forVersion || null);
      needsUpdate = true;
    } else if (
      options.restoreStateOnAny ||
      (options.restoreStateOnFailure && state === "fail") ||
      (options.restoreStateOnSuccess && state === "success")
    ) {
      props.itemDefinitionInstance.restoreValueFor(props.forId || null, props.forVersion || null);
      needsUpdate = true;
    }

    // CLEANING POLICIES, POLICIES CAN'T BE RESTORED
    const cleanupPolicyFn = (policyArray: PolicyPathType) => {
      props.itemDefinitionInstance
        .getPropertyDefinitionForPolicy(...policyArray).cleanValueFor(props.forId || null,
          props.forVersion || null);
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
      props.itemDefinitionInstance.cleanInternalState(props.forId || null, props.forVersion || null);
    }

    // NOw we check if we need an update in the listeners and if we are allowed to trigger it
    let triggeredUpdate: boolean = needsUpdate && !avoidTriggeringUpdate
    if (triggeredUpdate) {
      props.itemDefinitionInstance.triggerListeners("change", props.forId || null, props.forVersion || null);
    }
    if (needsSearchUpdate && !avoidTriggeringUpdate) {
      props.itemDefinitionInstance.triggerListeners("search-change", props.forId || null, props.forVersion || null);
    }
    return triggeredUpdate;
  }
  public async submit(originalOptions: IActionSubmitOptions): Promise<IActionResponseWithId> {
    // the reason we might need to wait for load is because unless we have avoided
    // loading the applied value matters in order to unite the applied fields, however
    // if we are avoiding loading this doesn't really matter as it's truly loading and somehow
    // the submit button was pressed really fast
    const waitingForLoad = this.props.forId && !this.state.loaded && !this.props.avoidLoading;
    if (waitingForLoad) {
      console.warn(
        "Attempted to submit so fast that the value was not yet loaded in memory, this is not an error, just means the app is sluggish",
      );
      await this.lastLoadValuePromise;
    }

    // if we are already submitting
    let options = originalOptions;
    if (this.state.submitting || this.activeSubmitPromise) {
      if (originalOptions.pileSubmit) {
        const id = uuid.v4();
        this.activeSubmitPromiseAwaiter = id;

        const lastResponse = await this.activeSubmitPromise;

        // another pile element has overtaken us
        // we must not execute, we have been cancelled
        if (this.activeSubmitPromiseAwaiter !== id) {
          // cancelled
          return {
            id: originalOptions.submitForId !== "undefined" ? options.submitForId : this.props.forId,
            version: originalOptions.submitForVersion !== "undefined" ? options.submitForVersion : this.props.forVersion,
            cancelled: true,
            deletedState: false,
            storedState: false,
            error: null,
          };
        }

        this.activeSubmitPromiseAwaiter = null;

        // patch the submit action
        if (typeof originalOptions.pileSubmit === "function") {
          options = {
            ...options,
            ...originalOptions.pileSubmit(lastResponse),
          }
        }
      } else {
        throw new Error("Can't submit while submitting, please consider your calls");
      }
    }

    let activeSubmitPromiseResolve = null as any;
    this.activeSubmitPromise = new Promise((resolve) => {
      activeSubmitPromiseResolve = resolve;
    });

    const isValid = this.checkItemStateValidity(options);
    const pokedElements = {
      properties: options.properties,
      includes: options.includes || {},
      policies: options.policies || [],
    }

    // if it's invalid let's return the emulated error
    if (!isValid) {
      if (!this.isUnmounted) {
        this.setState({
          pokedElements,
        });
      }
      this.cleanWithProps(this.props, options, "fail");

      const returnValue = this.giveEmulatedInvalidError("submitError", true, false) as IActionResponseWithId;;
      this.activeSubmitPromise = null;
      activeSubmitPromiseResolve(returnValue);

      // if it's not poked already, let's poke it
      return returnValue;
    }

    if (this.submitBlockPromises.length) {
      if (!this.isUnmounted) {
        this.setState({
          submitting: true,
        });
      }

      await Promise.all(this.submitBlockPromises);
      this.submitBlockPromises = [];
    }

    // now checking the option for the before submit function, if it returns
    // false we cancel the submit request, we don't check policies yet
    if (options.beforeSubmit) {
      const result = await options.beforeSubmit();
      if (!result) {
        this.activeSubmitPromise = null;
        activeSubmitPromiseResolve(null);
        return null;
      }
    }

    // now we are going to build our query
    // also we make a check later on for the policies
    // if necessary

    const {
      requestFields,
      argumentsForQuery,
      argumentsFoundFilePaths,
    } = getFieldsAndArgs({
      includeArgs: true,
      includeFields: true,
      uniteFieldsWithAppliedValue: true,
      differingPropertiesOnlyForArgs: options.differingOnly,
      differingIncludesOnlyForArgs: options.differingOnly,
      includes: this.props.includes || {},
      properties: this.props.properties || [],
      includesForArgs: options.includes || {},
      includeModeration: false,
      propertiesForArgs: options.properties,
      policiesForArgs: options.policies || [],
      itemDefinitionInstance: this.props.itemDefinitionInstance,
      forId: this.props.forId || null,
      forVersion: this.props.forVersion || null,
      propertyOverrides: options.propertyOverrides,
      includeOverrides: options.includeOverrides,
    });

    if (options.parentedBy) {
      const itemDefinitionInQuestion = this.props.itemDefinitionInstance.getParentModule()
        .getParentRoot().registry[options.parentedBy.item] as ItemDefinition;

      argumentsForQuery.parent_id = options.parentedBy.id;
      argumentsForQuery.parent_version = options.parentedBy.version || null;
      argumentsForQuery.parent_type = itemDefinitionInQuestion.getQualifiedPathName();
    }

    if (options.inBehalfOf) {
      argumentsForQuery.in_behalf_of = options.inBehalfOf;
    }

    // now it's when we are actually submitting
    if (!this.isUnmounted) {
      this.setState({
        submitting: true,
      });
    }

    const submitForId = typeof options.submitForId !== "undefined" ? options.submitForId : this.props.forId;
    const submitForVersion = typeof options.submitForVersion !== "undefined" ? options.submitForVersion : this.props.forVersion;

    let value: IGQLValue;
    let error: EndpointErrorType;
    let getQueryFields: IGQLRequestFields;

    // if we are in edit as we have specified an action that is meant to be edit
    // or if we have a submit for id that is also our current item id and it is indeed found which means that we are sure
    // there's a value for it and it is loaded so we can be guaranteed this is meant to be an edit
    if (options.action ? options.action === "edit" : (submitForId && submitForId === (this.props.forId || null) && !this.state.notFound)) {
      const totalValues = await runEditQueryFor({
        args: argumentsForQuery,
        fields: requestFields,
        itemDefinition: this.props.itemDefinitionInstance,
        token: this.props.tokenData.token,
        language: options.languageOverride || this.props.localeData.language,
        id: submitForId || null,
        version: submitForVersion || null,
        listenerUUID: this.props.remoteListener.getUUID(),
        cacheStore: this.props.longTermCaching,
        waitAndMerge: options.waitAndMerge,
        progresser: options.progresser,
      });

      value = totalValues.value;
      error = totalValues.error;
      getQueryFields = totalValues.getQueryFields;
    } else {
      // otherwise it is an add query
      let containerId: string
      Object.keys(this.props.config.containersRegionMappers).forEach((mapper) => {
        if (mapper.split(";").includes(this.props.localeData.country)) {
          containerId = this.props.config.containersRegionMappers[mapper];
        }
      });
      if (!containerId) {
        containerId = this.props.config.containersRegionMappers["*"];
      }

      // if we are submitting to add to a different element to our own
      // basically copying what we have in this item definition into
      // another of another kind, either new with undefined id or
      // a different version, we need to ensure all the files
      // are going to be there nicely and copied
      const appliedValue = this.props.itemDefinitionInstance.getGQLAppliedValue(
        this.props.forId || null,
        this.props.forVersion || null,
      );
      const originalContainerIdOfContent = appliedValue &&
        appliedValue.rawValue &&
        appliedValue.rawValue.container_id as string;

      // so if we have an applied value we have stored content about
      if (originalContainerIdOfContent) {
        // now we can start refetching all those values to get them
        // back as files
        await Promise.all(
          // so we map in those file paths we found
          argumentsFoundFilePaths.map(async (path: [string, string] | [string]) => {
            // these are for the ones with includes
            if (path.length === 2) {
              // we get the include
              const include = this.props.itemDefinitionInstance.getIncludeFor(path[0].replace(INCLUDE_PREFIX, ""));
              // and reprocess the value
              argumentsForQuery[path[0]][path[1]] = await reprocessFileArgumentForAdd(argumentsForQuery[path[0]][path[1]], {
                config: this.props.config,
                containerId: originalContainerIdOfContent,
                forId: this.props.forId || null,
                forVersion: this.props.forVersion || null,
                include,
                itemDefinition: this.props.itemDefinitionInstance,
                property: include.getSinkingPropertyFor(path[1]),
              });
            } else {
              // and for standard raw properties
              argumentsForQuery[path[0]] = await reprocessFileArgumentForAdd(argumentsForQuery[path[0]], {
                config: this.props.config,
                containerId: originalContainerIdOfContent,
                forId: this.props.forId || null,
                forVersion: this.props.forVersion || null,
                include: null,
                itemDefinition: this.props.itemDefinitionInstance,
                property: this.props.itemDefinitionInstance.getPropertyDefinitionFor(path[0], true),
              });
            }
          })
        );
      }

      // now we can call the add query after all the files have been processed
      const totalValues = await runAddQueryFor({
        args: argumentsForQuery,
        fields: requestFields,
        itemDefinition: this.props.itemDefinitionInstance,
        token: this.props.tokenData.token,
        language: options.languageOverride || this.props.localeData.language,
        listenerUUID: this.props.remoteListener.getUUID(),
        cacheStore: this.props.longTermCaching,
        forId: submitForId || null,
        forVersion: submitForVersion || null,
        waitAndMerge: options.waitAndMerge,
        containerId,
        progresser: options.progresser,
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
        CacheWorkerInstance.isSupported
      ) {
        const state = this.props.itemDefinitionInstance.getStateNoExternalChecking(
          this.props.forId || null,
          this.props.forVersion || null,
        );
        const serializable = getSerializableState(state);
        storedState = await CacheWorkerInstance.instance.storeState(
          this.props.itemDefinitionQualifiedName,
          this.props.forId || null,
          this.props.forVersion || null,
          serializable,
        );
      }

      if (!this.isUnmounted) {
        this.setState({
          submitError: error,
          submitting: false,
          submitted: false,
          pokedElements,
        });
      }
      this.cleanWithProps(this.props, options, "fail");
    } else if (value) {
      if (
        options.clearStoredStateIfConnected &&
        CacheWorkerInstance.isSupported
      ) {
        deletedState = await CacheWorkerInstance.instance.deleteState(
          this.props.itemDefinitionQualifiedName,
          this.props.forId || null,
          this.props.forVersion || null,
        );
      }

      if (!this.isUnmounted) {
        this.setState({
          submitError: null,
          submitting: false,
          submitted: true,
          pokedElements,
        });
      }

      recievedId = value.id as string;
      receivedVersion = value.version as string || null;
      this.props.itemDefinitionInstance.applyValue(
        recievedId,
        receivedVersion,
        value,
        false,
        getQueryFields,
        true,
      );

      const triggeredAnUpdate = this.cleanWithProps(this.props, options, "success");
      if (!triggeredAnUpdate) {
        this.props.itemDefinitionInstance.triggerListeners("change", recievedId || null, receivedVersion || null);

        // clean will props may have triggered the change listeners, but if there's a difference
        // between what we have cleaned and applied we want to trigger these listeners again for the
        // received value
      } else if (this.props.forId !== recievedId && (this.props.forVersion || null) !== (receivedVersion || null)) {
        this.props.itemDefinitionInstance.triggerListeners("change", recievedId || null, receivedVersion || null);
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
    this.props.onSubmit && this.props.onSubmit(result);

    this.activeSubmitPromise = null;
    activeSubmitPromiseResolve(result);

    return result;
  }

  /**
   * Loads the search from the location
   * @returns the search id that it managed to collect
   */
  public loadSearch(): string {
    if (this.isUnmounted) {
      return;
    }

    const searchId = (
      this.props.location.state &&
      this.props.location.state[this.props.loadSearchFromNavigation] &&
      this.props.location.state[this.props.loadSearchFromNavigation].searchId
    ) || null;

    if (searchId === this.state.searchId) {
      return null;
    }

    if (searchId) {
      const searchIdefState = this.props.location.state[this.props.loadSearchFromNavigation].searchIdefState;
      this.props.itemDefinitionInstance.applyState(
        this.props.forId || null,
        this.props.forVersion || null,
        searchIdefState,
      );
      const searchState = this.props.location.state[this.props.loadSearchFromNavigation].searchState;
      this.setState({
        itemState: this.props.itemDefinitionInstance.getStateNoExternalChecking(
          this.props.forId || null,
          this.props.forVersion || null,
          !this.props.disableExternalChecks,
          this.props.itemDefinitionInstance.isInSearchMode() ?
            getPropertyListForSearchMode(
              this.props.properties || [],
              this.props.itemDefinitionInstance.getStandardCounterpart()
            ) : this.props.properties || [],
          this.props.includes || {},
          !this.props.includePolicies,
        ),
        ...searchState,
        searchWasRestored: true,
      });
    }

    return searchId;
  }
  private async searchListenersSetup(
    options: IActionSearchOptions,
    lastModified: string,
    createdBy: string,
    parentedBy: [string, string, string],
    requestFeedbackToo?: boolean
  ) {
    const listenPolicy = options.listenPolicy || options.cachePolicy || "none";

    if (listenPolicy === "none") {
      if (requestFeedbackToo) {
        this.searchFeedback(options, lastModified, createdBy, parentedBy);
      }

      return;
    }

    const standardCounterpart = this.props.itemDefinitionInstance.getStandardCounterpart();

    const standardCounterpartQualifiedName = (standardCounterpart.isExtensionsInstance() ?
      standardCounterpart.getParentModule().getQualifiedPathName() :
      standardCounterpart.getQualifiedPathName());
    if (listenPolicy === "by-owner") {
      this.props.remoteListener.addOwnedSearchListenerFor(
        standardCounterpartQualifiedName,
        createdBy,
        lastModified,
        this.onSearchReload,
        (options.cachePolicy || "none") !== "none",
      );
    } else if (listenPolicy === "by-parent") {
      this.props.remoteListener.addParentedSearchListenerFor(
        standardCounterpartQualifiedName,
        parentedBy[0],//.itemDefinition.getQualifiedPathName(),
        parentedBy[1],//.id,
        parentedBy[2] || null,
        lastModified,
        this.onSearchReload,
        (options.cachePolicy || "none") !== "none"
      );
    } else if (listenPolicy === "by-owner-and-parent") {
      this.props.remoteListener.addOwnedParentedSearchListenerFor(
        standardCounterpartQualifiedName,
        createdBy,
        parentedBy[0],
        parentedBy[1],
        parentedBy[2] || null,
        lastModified,
        this.onSearchReload,
        (options.cachePolicy || "none") !== "none"
      );
    }

    if (requestFeedbackToo) {
      this.searchFeedback(options, lastModified, createdBy, parentedBy);
    }
  }
  private async searchFeedback(
    options: IActionSearchOptions,
    lastModified: string,
    createdBy: string,
    parentedBy: [string, string, string],
  ) {
    if (options.cachePolicy === "none") {
      return;
    }

    const standardCounterpart = this.props.itemDefinitionInstance.getStandardCounterpart();
    const standardCounterpartQualifiedName = (standardCounterpart.isExtensionsInstance() ?
      standardCounterpart.getParentModule().getQualifiedPathName() :
      standardCounterpart.getQualifiedPathName());

    if (options.cachePolicy === "by-owner") {
      this.props.remoteListener.requestOwnedSearchFeedbackFor({
        qualifiedPathName: standardCounterpartQualifiedName,
        createdBy: createdBy,
        lastModified: lastModified,
      });
    } else if (options.cachePolicy === "by-owner-and-parent") {
      this.props.remoteListener.requestOwnedParentedSearchFeedbackFor({
        createdBy: createdBy,
        qualifiedPathName: standardCounterpartQualifiedName,
        parentType: parentedBy[0],
        parentId: parentedBy[1],
        parentVersion: parentedBy[2],
        lastModified: lastModified,
      });
    } else if (options.cachePolicy === "by-parent" ) {
      this.props.remoteListener.requestParentedSearchFeedbackFor({
        qualifiedPathName: standardCounterpartQualifiedName,
        parentType: parentedBy[0],
        parentId: parentedBy[1],
        parentVersion: parentedBy[2],
        lastModified: lastModified,
      });
    }
  }
  public async search(
    options: IActionSearchOptions,
  ): Promise<IActionResponseWithSearchResults> {
    // had issues with pollution as other functions
    // were calling search and passing a second argument
    // causing initial automatic to be true
    const initialAutomatic = this.initialAutomaticNextSearch;
    const isReloadSearch = this.reloadNextSearch;
    this.initialAutomaticNextSearch = false;
    this.reloadNextSearch = false;

    // we extract the hack variable
    const preventSearchFeedbackOnPossibleStaleData = this.preventSearchFeedbackOnPossibleStaleData;
    this.preventSearchFeedbackOnPossibleStaleData = false;

    if (this.state.searching) {
      throw new Error("Can't search while searching, please consider your calls");
    }

    if (options.searchByProperties.includes("created_by") && options.createdBy) {
      throw new Error("searchByProperties includes created by yet in the options an override was included as " + options.createdBy);
    } else if (options.searchByProperties.includes("since") && options.since) {
      throw new Error("searchByProperties includes created by yet in the options an override was included as " + options.createdBy);
    }

    // we need the standard counterpart given we are in search mode right now, 
    const standardCounterpart = this.props.itemDefinitionInstance.getStandardCounterpart();
    // first we calculate the properties that are to be submitted, by using the standard counterpart
    // a search action is only to be executed if the item definition (either a real item definition or
    // one representing a module) is actually in search mode, otherwise this would crash
    const propertiesForArgs = getPropertyListForSearchMode(options.searchByProperties, standardCounterpart);

    // now we use this function to check that everything is valid
    const isValid = this.checkItemStateValidity({
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
      if (!this.isUnmounted) {
        this.setState({
          pokedElements,
        });
      }
      this.cleanWithProps(this.props, options, "fail");
      const result = this.giveEmulatedInvalidError("searchError", false, true) as IActionResponseWithSearchResults;
      this.props.onSearch && this.props.onSearch(result);
      return result;;
    }

    if (
      options.cachePolicy !== "none" &&
      typeof options.cachePolicy !== "undefined" &&
      options.cachePolicy !== null &&
      options.traditional
    ) {
      throw new Error("A cache policy cannot be set with a traditional search");
    }

    // now we check the cache policy by owner
    if ((options.cachePolicy === "by-owner" || options.cachePolicy === "by-owner-and-parent") && !options.createdBy) {
      throw new Error("A by owner cache policy requires createdBy option to be set");
    }

    // and the cache policy by parenting
    let searchParent: [string, string, string] = null;
    if ((options.cachePolicy === "by-parent" || options.cachePolicy === "by-owner-and-parent") && !options.parentedBy) {
      throw new Error("A by owner cache policy requires parentedBy option to be set");
    } else if (options.parentedBy) {
      // because the parenting rule goes by a path, eg.... module/module  and then idef/idef
      // we need to loop and find it by the path in order to find both
      const itemDefinitionInQuestion = this.props.itemDefinitionInstance.getParentModule()
        .getParentRoot().registry[options.parentedBy.item] as ItemDefinition;

      // and that way we calculate the search parent
      searchParent = [
        itemDefinitionInQuestion.getQualifiedPathName(),
        options.parentedBy.id,
        options.parentedBy.version || null,
      ];

      if (options.markForDestructionOnLogout && (options.cachePolicy === "by-parent" || options.cachePolicy === "by-owner-and-parent")) {
        this.markSearchForDestruction(options.cachePolicy, this.props.itemDefinitionInstance.getQualifiedPathName(), options.createdBy || null, searchParent);
      }
    }

    if (options.cachePolicy === "by-owner") {
      if (options.createdBy !== this.state.searchOwner) {
        // this search listener is bad because the search
        // owner has changed, and the previously registered listener
        // if any does not match the owner, remember the search owner is the created by
        // value, and we are now redoing the search, and we might have a search listener
        // registered already for this search if that is the case
        this.removePossibleSearchListeners();
      }

      if (options.markForDestructionOnLogout) {
        this.markSearchForDestruction(options.cachePolicy, this.props.itemDefinitionInstance.getQualifiedPathName(), options.createdBy, null);
      }
    } else if (options.cachePolicy === "by-parent") {
      // we basically do the exact same here, same logic
      if (!equals(searchParent, this.state.searchParent, { strict: true })) {
        // this search listener is bad because the search
        // parent has changed, and the previously registered listener
        // if any does not match the owner
        this.removePossibleSearchListeners();
      }
    } else {
      // otherwise we are removing here because we have no cache policy
      // and hence no reason to have search listeners at all to listen to changes
      this.removePossibleSearchListeners();
    }

    // we save the last options used for our last search
    this.lastOptionsUsedForSearch = options;

    // and then set the state to searching
    if (!this.isUnmounted) {
      this.setState({
        searching: true,
      });
    }

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
      includeModeration: false,
      itemDefinitionInstance: this.props.itemDefinitionInstance,
      forId: this.props.forId || null,
      forVersion: this.props.forVersion || null,
    });

    // the fields nevertheless are another story as it uses the standard logic
    const searchFieldsAndArgs = getFieldsAndArgs({
      includeArgs: false,
      includeFields: true,
      properties: options.requestedProperties,
      includes: options.requestedIncludes || {},
      includeModeration: false,
      itemDefinitionInstance: standardCounterpart,
      forId: null,
      forVersion: null,
    });
    // while these search fields are of virtually no use for standard searchs
    // these are used when doing a traditional search and when doing a search
    // in a cache policy mode
    const requestedSearchFields = searchFieldsAndArgs.requestFields;

    let parentedBy = null;
    if (options.parentedBy) {
      const root = this.props.itemDefinitionInstance.getParentModule().getParentRoot();
      const parentIdef = root.registry[options.parentedBy.item] as ItemDefinition;
      parentedBy = {
        itemDefinition: parentIdef,
        id: options.parentedBy.id,
        version: options.parentedBy.version || null,
      };
    }

    const stateOfSearch = this.props.itemDefinitionInstance.getStateNoExternalChecking(
      this.props.forId || null,
      this.props.forVersion || null,
    );

    const listenPolicy = options.listenPolicy || options.cachePolicy || "none";

    if ((listenPolicy === "by-owner" || listenPolicy === "by-owner-and-parent") && !options.createdBy || options.createdBy === UNSPECIFIED_OWNER) {
      throw new Error("Listen policy is by-owner yet there's no creator specified");
    } else if ((listenPolicy === "by-parent" || listenPolicy === "by-owner-and-parent") && !parentedBy) {
      throw new Error("Listen policy is by-parent yet there's no parent specified");
    }

    const {
      results,
      records,
      count,
      limit,
      offset,
      error,
      lastModified,
    } = await runSearchQueryFor({
      args: argumentsForQuery,
      fields: requestedSearchFields,
      itemDefinition: this.props.itemDefinitionInstance,
      cachePolicy: options.cachePolicy || "none",
      createdBy: options.createdBy || null,
      since: options.since || null,
      orderBy: options.orderBy || {
        created_at: {
          priority: 0,
          nulls: "last",
          direction: "desc",
        }
      },
      traditional: !!options.traditional,
      token: this.props.tokenData.token,
      language: this.props.localeData.language,
      limit: options.limit,
      offset: options.offset,
      parentedBy,
      waitAndMerge: options.waitAndMerge,
      progresser: options.progresser,
    }, {
      remoteListener: this.props.remoteListener,
      preventCacheStaleFeeback: preventSearchFeedbackOnPossibleStaleData,
    });

    if (!error && listenPolicy !== "none") {
      this.searchListenersSetup(options, lastModified, options.createdBy || null, searchParent);
    }

    const searchId = uuid.v4();
    if (error) {
      const searchState = {
        searchError: error,
        searching: false,
        searchResults: results,
        searchRecords: records,
        searchCount: count,
        searchLimit: limit,
        searchOffset: offset,
        searchId,
        searchOwner: options.createdBy || null,
        searchParent,
        searchShouldCache: !!options.cachePolicy,
        searchFields: requestedSearchFields,
        searchRequestedProperties: options.requestedProperties,
        searchRequestedIncludes: options.requestedIncludes || {},
        searchLastModified: lastModified,
      };

      // this would be a wasted instruction otherwise as it'd be reversed
      if (
        !options.cleanSearchResultsOnAny &&
        !options.cleanSearchResultsOnFailure
      ) {
        this.props.itemDefinitionInstance.setInternalState(
          this.props.forId || null,
          this.props.forVersion || null,
          {
            searchState,
            state: stateOfSearch,
          },
        );
      }

      if (!this.isUnmounted) {
        this.setState({
          ...searchState,
          searchWasRestored: false,
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
                state: this.props.location.state,
                pathname: location.pathname,
                search: searchPart,
                hash: location.hash,
              },
              {
                [options.storeResultsInNavigation]: {
                  searchId,
                  searchState,
                  searchIdefState: getSerializableState(stateOfSearch),
                }
              },
              initialAutomatic || rFlagged || isReloadSearch,
            );
          }
        });
      }
      this.cleanWithProps(this.props, options, "fail");
    } else {
      const searchState = {
        searchError: null as any,
        searching: false,
        searchResults: results,
        searchRecords: records,
        searchCount: count,
        searchLimit: limit,
        searchOffset: offset,
        searchId,
        searchOwner: options.createdBy || null,
        searchParent,
        searchShouldCache: !!options.cachePolicy,
        searchFields: requestedSearchFields,
        searchRequestedProperties: options.requestedProperties,
        searchRequestedIncludes: options.requestedIncludes || {},
        searchLastModified: lastModified,
      };

      // this would be a wasted instruction otherwise as it'd be reversed
      if (
        !options.cleanSearchResultsOnAny &&
        !options.cleanSearchResultsOnSuccess
      ) {
        this.props.itemDefinitionInstance.setInternalState(
          this.props.forId || null,
          this.props.forVersion || null,
          {
            searchState,
            state: stateOfSearch,
          },
        );
      }

      if (!this.isUnmounted) {
        this.setState({
          ...searchState,
          searchWasRestored: false,
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
                state: this.props.location.state,
                pathname: location.pathname,
                search: searchPart,
                hash: location.hash,
              },
              {
                [options.storeResultsInNavigation]: {
                  searchId,
                  searchState,
                  searchIdefState: getSerializableState(stateOfSearch),
                }
              },
              initialAutomatic || rFlagged,
            );
          }
        });
      }
      this.cleanWithProps(this.props, options, "success");
    }

    this.props.itemDefinitionInstance.triggerListeners(
      "search-change",
      this.props.forId,
      this.props.forVersion,
      this.changeSearchListener,
    );

    const result = {
      searchId,
      results,
      records,
      count,
      limit,
      offset,
      error,
    };
    this.props.onSearch && this.props.onSearch(result);
    return result;
  }
  public dismissLoadError() {
    if (this.isUnmounted) {
      return;
    }
    this.setState({
      loadError: null,
    });
  }
  public dismissDeleteError() {
    if (this.isUnmounted) {
      return;
    }
    this.setState({
      deleteError: null,
    });
  }
  public dismissSubmitError() {
    if (this.isUnmounted) {
      return;
    }
    this.setState({
      submitError: null,
    });
  }
  public dismissSubmitted() {
    if (this.isUnmounted) {
      return;
    }
    this.setState({
      submitted: null,
    });
  }
  public dismissDeleted() {
    if (this.isUnmounted) {
      return;
    }
    this.setState({
      deleted: false,
    });
  }
  public dismissSearchError() {
    if (this.isUnmounted) {
      return;
    }
    this.setState({
      searchError: null,
    });
  }
  public onSearchReload(arg: IRemoteListenerRecordsCallbackArg) {
    // this function is called when remotely the search
    // is said to update, and it needs to be reloaded
    // however the server has already specified how the data
    // is meant to update, but launching this as it is, will
    // cause the client to check because it considers that the
    // data might be stale because it got the data from the
    // cache worker, but we had updated this data a couple of microseconds
    // earlier so we make this hack variable to prevent asking for
    // feedback as we already got feedback
    this.preventSearchFeedbackOnPossibleStaleData = true;
    this.reloadNextSearch = true;
    this.search(this.lastOptionsUsedForSearch);
  }
  public removePossibleSearchListeners(
    props: IActualItemProviderProps = this.props,
    state: IActualItemProviderState = this.state,
  ) {
    if (props.itemDefinitionInstance.isInSearchMode()) {
      const standardCounterpart = this.props.itemDefinitionInstance.getStandardCounterpart();
      const standardCounterpartQualifiedName = (standardCounterpart.isExtensionsInstance() ?
        standardCounterpart.getParentModule().getQualifiedPathName() :
        standardCounterpart.getQualifiedPathName());

      if (state.searchOwner) {
        props.remoteListener.removeOwnedSearchListenerFor(
          this.onSearchReload,
          standardCounterpartQualifiedName,
          state.searchOwner,
        );
      }
      if (state.searchParent) {
        props.remoteListener.removeParentedSearchListenerFor(
          this.onSearchReload,
          standardCounterpartQualifiedName,
          state.searchParent[0],
          state.searchParent[1],
          state.searchParent[2],
        );
      }
      if (state.searchParent && state.searchOwner) {
        props.remoteListener.removeOwnedParentedSearchListenerFor(
          this.onSearchReload,
          standardCounterpartQualifiedName,
          state.searchOwner,
          state.searchParent[0],
          state.searchParent[1],
          state.searchParent[2],
        );
      }
    }
  }
  public dismissSearchResults() {
    this.removePossibleSearchListeners();
    if (!this.isUnmounted) {
      this.setState({
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
  public poke(elements: IPokeElementsType) {
    if (this.isUnmounted) {
      return;
    }

    this.setState({
      pokedElements: elements,
    });
  }
  public unpoke() {
    if (this.isUnmounted) {
      return;
    }
    this.setState({
      pokedElements: {
        properties: [],
        includes: {},
        policies: [],
      },
    });
  }
  public async beforeSSRRender(): Promise<void> {
    if (
      this.state.loaded ||
      this.props.forId === null ||
      this.props.itemDefinitionInstance.isInSearchMode() ||
      this.props.itemDefinitionInstance.isExtensionsInstance()
    ) {
      return null;
    }

    // cheesy way to get to the root
    const root = this.props.itemDefinitionInstance.getParentModule().getParentRoot();
    const id = this.props.forId;
    const version = this.props.forVersion || null;

    await root.callRequestManager(this.props.itemDefinitionInstance, id, version);
    this.state = this.setupInitialState();
  }
  public render() {
    if (
      this.props.loadUnversionedFallback &&
      this.props.forId &&
      this.props.forVersion &&
      this.state.notFound
    ) {
      const newProps: IItemProviderProps = {
        ...this.props,
        loadUnversionedFallback: false,
        forVersion: null,
      }

      return (
        <ItemProvider {...newProps} />
      );
    }

    return (
      <ItemContext.Provider
        value={{
          idef: this.props.itemDefinitionInstance,
          state: this.state.itemState,
          onPropertyChange: this.onPropertyChange,
          onPropertyRestore: this.onPropertyRestore,
          onIncludeSetExclusionState: this.onIncludeSetExclusionState,
          onPropertyEnforce: this.onPropertyEnforce,
          onPropertyClearEnforce: this.onPropertyClearEnforce,
          notFound: this.state.notFound,
          blocked: this.state.isBlocked,
          blockedButDataAccessible: this.state.isBlockedButDataIsAccessible,
          loadError: this.state.loadError,
          loading: this.state.loading,
          loaded: this.state.loaded,
          submitError: this.state.submitError,
          submitting: this.state.submitting,
          submitted: this.state.submitted,
          deleteError: this.state.deleteError,
          deleting: this.state.deleting,
          deleted: this.state.deleted,
          searchError: this.state.searchError,
          searching: this.state.searching,
          searchRecords: this.state.searchRecords,
          searchResults: this.state.searchResults,
          searchLimit: this.state.searchLimit,
          searchCount: this.state.searchCount,
          searchOffset: this.state.searchOffset,
          searchId: this.state.searchId,
          searchWasRestored: this.state.searchWasRestored,
          searchOwner: this.state.searchOwner,
          searchLastModified: this.state.searchLastModified,
          searchShouldCache: this.state.searchShouldCache,
          searchFields: this.state.searchFields,
          searchRequestedProperties: this.state.searchRequestedProperties,
          searchRequestedIncludes: this.state.searchRequestedIncludes,
          pokedElements: this.state.pokedElements,
          submit: this.submit,
          reload: this.loadValue,
          delete: this.delete,
          clean: this.clean,
          search: this.search,
          forId: this.props.forId || null,
          forVersion: this.props.forVersion || null,
          dismissLoadError: this.dismissLoadError,
          dismissSubmitError: this.dismissSubmitError,
          dismissSubmitted: this.dismissSubmitted,
          dismissDeleteError: this.dismissDeleteError,
          dismissDeleted: this.dismissDeleted,
          dismissSearchError: this.dismissSearchError,
          dismissSearchResults: this.dismissSearchResults,
          poke: this.poke,
          unpoke: this.unpoke,
          remoteListener: this.props.remoteListener,
          injectSubmitBlockPromise: this.injectSubmitBlockPromise,
          injectedParentContext: this.props.injectedParentContext,
        }}
      >
        {this.props.children}
      </ItemContext.Provider>
    );
  }
}

export function ItemProvider(props: IItemProviderProps) {
  return (
    <ConfigContext.Consumer>
      {(config) => (
        <LocaleContext.Consumer>
          {
            (localeData) => (
              <TokenContext.Consumer>
                {
                  (tokenData) => (
                    <ModuleContext.Consumer>
                      {
                        (data) => (
                          <SearchItemValueContext.Consumer>
                            {(searchContext) => {
                              if (!data) {
                                throw new Error("The ItemProvider must be inside a ModuleProvider context");
                              }
                              let valueFor: ItemDefinition;
                              if (props.itemDefinition) {
                                if (typeof props.itemDefinition === "string") {
                                  valueFor =
                                    data.mod.getParentRoot().registry[props.itemDefinition] as ItemDefinition ||
                                    data.mod.getItemDefinitionFor(props.itemDefinition.split("/"));
                                } else {
                                  valueFor = props.itemDefinition;
                                }
                              } else {
                                valueFor = data.mod.getPropExtensionItemDefinition();
                              }
                              if (props.searchCounterpart) {
                                valueFor = valueFor.getSearchModeCounterpart();
                              }

                              const actualProps = {
                                localeData,
                                tokenData,
                                itemDefinitionInstance: valueFor,
                                itemDefinitionQualifiedName: valueFor.getQualifiedPathName(),
                                containsExternallyCheckedProperty: valueFor.containsAnExternallyCheckedProperty(),
                                remoteListener: data.remoteListener,
                                searchContext: searchContext,
                                config: config,
                                ...props,
                              }

                              if (props.injectParentContext) {
                                if (props.loadSearchFromNavigation) {
                                  return (
                                    <LocationRetriever>
                                      {(location) => (
                                        <ItemContext.Consumer>{
                                          (value) => (
                                            <ActualItemProvider
                                              {...actualProps}
                                              injectedParentContext={value}
                                              location={location}
                                            />
                                          )
                                        }</ItemContext.Consumer>
                                      )}
                                    </LocationRetriever>
                                  );
                                } else {
                                  return (
                                    <ItemContext.Consumer>{
                                      (value) => (
                                        <ActualItemProvider
                                          {...actualProps}
                                          injectedParentContext={value}
                                        />
                                      )
                                    }</ItemContext.Consumer>
                                  );
                                }
                              }

                              if (props.loadSearchFromNavigation) {
                                return (
                                  <LocationRetriever>
                                    {(location) => (
                                      <ActualItemProvider
                                        {...actualProps}
                                        injectedParentContext={null}
                                        location={location}
                                      />
                                    )}
                                  </LocationRetriever>
                                );
                              } else {
                                return (
                                  <ActualItemProvider
                                    {...actualProps}
                                    injectedParentContext={null}
                                  />
                                );
                              }
                            }}
                          </SearchItemValueContext.Consumer>
                        )
                      }
                    </ModuleContext.Consumer>
                  )
                }
              </TokenContext.Consumer>
            )
          }
        </LocaleContext.Consumer>
      )}
    </ConfigContext.Consumer>
  );
}

interface INoStateItemProviderProps {
  itemDefinition?: string;
  children?: React.ReactNode;
}

interface IActualNoStateItemProviderProps extends INoStateItemProviderProps {
  itemDefinitionInstance: ItemDefinition;
  itemDefinitionQualifiedName: string;
}

class ActualNoStateItemProvider extends React.Component<IActualNoStateItemProviderProps> {
  public shouldComponentUpdate(nextProps: IActualNoStateItemProviderProps) {
    return nextProps.itemDefinitionQualifiedName !== this.props.itemDefinitionQualifiedName ||
      nextProps.children !== this.props.children;
  }
  public render() {
    return (
      <ItemContext.Provider
        value={{
          idef: this.props.itemDefinitionInstance,
        } as any}
      >
        {this.props.children}
      </ItemContext.Provider>
    );
  }
}

export function NoStateItemProvider(props: INoStateItemProviderProps) {
  return (
    <ModuleContext.Consumer>
      {
        (data) => {
          if (!data) {
            throw new Error("The ItemProvider must be inside a ModuleProvider context");
          }
          let valueFor: ItemDefinition;
          if (props.itemDefinition) {
            valueFor =
              data.mod.getParentRoot().registry[props.itemDefinition] as ItemDefinition ||
              data.mod.getItemDefinitionFor(props.itemDefinition.split("/"));
          } else {
            valueFor = data.mod.getPropExtensionItemDefinition();
          }

          return (
            <ActualNoStateItemProvider
              itemDefinitionInstance={valueFor}
              itemDefinitionQualifiedName={valueFor.getQualifiedPathName()}
              {...props}
            />
          );
        }
      }
    </ModuleContext.Consumer>
  )
}

export function ParentItemContextProvider(props: { children: React.ReactNode }) {
  return (
    <ItemContext.Consumer>
      {(value) => (
        <ItemContext.Provider value={value.injectedParentContext}>
          {props.children}
        </ItemContext.Provider>
      )}
    </ItemContext.Consumer>
  )
}