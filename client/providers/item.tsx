import React, { useContext } from "react";
import { LocaleContext, ILocaleContextType } from "../internal/providers/locale-provider";
import ItemDefinition, { IItemSearchStateHighlightArgsType, IItemSearchStateType, IItemStateType } from "../../base/Root/Module/ItemDefinition";
import PropertyDefinition, { IPropertyDefinitionState } from "../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { IElasticHighlightRecordInfo, IElasticHighlightSingleRecordInfo, PropertyDefinitionSupportedType } from "../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import Include, { IncludeExclusionState } from "../../base/Root/Module/ItemDefinition/Include";
import { TokenContext, ITokenContextType } from "../internal/providers/token-provider";
import {
  PREFIX_GET,
  UNSPECIFIED_OWNER,
  ENDPOINT_ERRORS,
  MEMCACHED_DESTRUCTION_MARKERS_LOCATION,
  DESTRUCTION_MARKERS_LOCATION,
  IOrderByRuleType,
  MEMCACHED_SEARCH_DESTRUCTION_MARKERS_LOCATION,
  SEARCH_DESTRUCTION_MARKERS_LOCATION,
  PREFIX_SEARCH,
  MEMCACHED_UNMOUNT_SEARCH_DESTRUCTION_MARKERS_LOCATION,
  UNMOUNT_SEARCH_DESTRUCTION_MARKERS_LOCATION,
  MEMCACHED_UNMOUNT_DESTRUCTION_MARKERS_LOCATION,
  UNMOUNT_DESTRUCTION_MARKERS_LOCATION,
} from "../../constants";
import { IRQSearchRecord, IRQValue, IRQRequestFields, ProgresserFn } from "../../rq-querier";
import { requestFieldsAreContained } from "../../rq-util";
import { EndpointErrorType } from "../../base/errors";
import equals from "deep-equal";
import { ModuleContext } from "./module";
import CacheWorkerInstance from "../internal/workers/cache";
import { IRemoteListenerRecordsCallbackArg, RemoteListener } from "../internal/app/remote-listener";
import uuid from "uuid";
import {
  getFieldsAndArgs, runGetQueryFor, runDeleteQueryFor, runEditQueryFor, runAddQueryFor, runSearchQueryFor, IIncludeOverride,
  IPropertyOverride, ICacheMetadataMismatchAction, ISearchCacheMetadataMismatchAction, reprocessQueryArgumentsForFiles, getPropertyListForSearchMode, SearchCacheMetadataMismatchActionFn, getPropertyListDefault
} from "../internal/rq-client-util";
import { IPropertyCoreProps, IPropertySetterProps } from "../components/property/base";
import { PropertyDefinitionSearchInterfacesPrefixes } from "../../base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces";
import { ConfigContext } from "../internal/providers/config-provider";
import { IConfigRawJSONDataType } from "../../config";
import { setHistoryQSState, setHistoryState } from "../components/navigation";
import LocationRetriever from "../components/navigation/LocationRetriever";
import { Location } from "history";
import type { ICacheMetadataMatchType, ICacheStateMetadata } from "../internal/workers/cache/cache.worker.class";
import { blobToTransferrable } from "../../util";

const isDevelopment = process.env.NODE_ENV === "development";

const SSR_GRACE_TIME = 10000;
const LOAD_TIME = (new Date()).getTime();

interface IStoredStateLocation { id: string; version: string };

function getStoredStateLocation(v: boolean | string | IStoredStateLocation, currentId: string, currentVersion: string): IStoredStateLocation {
  return typeof v === "string" ?
    { id: v, version: null } : (
      typeof v === "boolean" ? { id: currentId || null, version: currentVersion || null } :
        v
    )
}

// THIS IS THE MOST IMPORTANT FILE OF WHOLE ITEMIZE
// HERE IS WHERE THE MAGIC HAPPENS

// TODO cache policy search destruction markers
// destruct a whole search and its children on logout

function getSearchStateOf(state: IActualItemProviderState): IItemSearchStateType {
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

function getPropertyForSetter(setter: IPropertySetterProps<PropertyDefinitionSupportedType>, itemDefinition: ItemDefinition) {
  let actualId: string = setter.id;
  if (setter.searchVariant) {
    actualId = PropertyDefinitionSearchInterfacesPrefixes[setter.searchVariant.toUpperCase().replace("-", "_")] + setter.id;
  }
  if (setter.policyName && setter.policyType) {
    return itemDefinition.getPropertyDefinitionForPolicy(setter.policyType, setter.policyName, actualId);
  }
  return itemDefinition.getPropertyDefinitionFor(actualId, true);
}

function resolveCoreProp(value: string | IPropertyCoreProps) {
  if (typeof value === "string") {
    return value;
  } else if (value.searchVariant) {
    return PropertyDefinitionSearchInterfacesPrefixes[value.searchVariant.toUpperCase().replace("-", "_")] + value.id;
  }

  return value.id;
}

function isSearchUnequal(searchA: IActionSearchOptions, searchB: IActionSearchOptions) {
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

/**
 * A response given by some handlers like
 * loadValue
 */
export interface IBasicActionResponse {
  error: EndpointErrorType;
}

export interface IActionResponseWithValue extends IBasicActionResponse {
  value: any;
  cached: boolean;
  id: string;
  version: string;
}

export interface ILoadCompletedPayload extends IActionResponseWithValue {
  cached: boolean;
}

/**
 * A response given by submit and delete
 */
export interface IActionSubmitResponse extends IBasicActionResponse {
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
  records: IRQSearchRecord[];
  results: IRQValue[];
  count: number;
  limit: number;
  offset: number;
  cached: boolean;
  polyfilled: boolean;
  /**
   * Only truly relevant when pileSearch is used
   */
  cancelled: boolean;
}

export type PolicyPathType = [string, string, string];

/**
 * The clean options offered during execution
 */
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
   * Restores the value of a property back to its applied value after the action is completed and SUCCEEDS
   * as in the value that was retrieved from the server (or null if no value is loaded)
   * 
   * This is useful to keep unmodified states during adding, editing or even deleted
   * the value that is restored is the last value loaded, and since the action occurs
   * after the action is performed it will apply to that value
   */
  propertiesToRestoreOnSuccess?: string[];
  /**
   * Restores the value of a property back to its applied value after the action is completed
   * as in the value that was retrieved from the server (or null if no value is loaded)
   * 
   * This is useful to keep unmodified states during adding, editing or even deleted
   * the value that is restored is the last value loaded, and since the action occurs
   * after the action is performed it will apply to that value
   */
  propertiesToRestoreOnAny?: string[];
  /**
   * Restores the value of a property back to its applied value after the action is completed and FAILED
   * as in the value that was retrieved from the server (or null if no value is loaded)
   * 
   * This is useful to keep unmodified states during adding, editing or even deleted
   * the value that is restored is the last value loaded, and since the action occurs
   * after the action is performed it will apply to that value
   */
  propertiesToRestoreOnFailure?: string[];
  /**
   * Restores the value of an include and all its sinking properties back to its applied value after the action is completed and SUCCEEDS
   * as in the value that was retrieved from the server (or null if no value is loaded)
   * 
   * This is useful to keep unmodified states during adding, editing or even deleted
   * the value that is restored is the last value loaded, and since the action occurs
   * after the action is performed it will apply to that value
   */
  includesToRestoreOnSuccess?: string[];
  /**
   * Restores the value of an include and all its sinking properties back to its applied value after the action is completed
   * as in the value that was retrieved from the server (or null if no value is loaded)
   * 
   * This is useful to keep unmodified states during adding, editing or even deleted
   * the value that is restored is the last value loaded, and since the action occurs
   * after the action is performed it will apply to that value
   */
  includesToRestoreOnAny?: string[];
  /**
   * Restores the value of an include and all its sinking properties back to its applied value after the action is completed and FAILED
   * as in the value that was retrieved from the server (or null if no value is loaded)
   * 
   * This is useful to keep unmodified states during adding, editing or even deleted
   * the value that is restored is the last value loaded, and since the action occurs
   * after the action is performed it will apply to that value
   */
  includesToRestoreOnFailure?: string[];
  /**
   * After the action is completed and it SUCCEEDS all the properties and includes will be unpoked
   * 
   * When a property is considered poked its error state shows, as it's usually hidden until the user has "poked it"
   * for example in the case of a password when the password is empty the property is invalid, but it only shows
   * that error after the user has interacted with it, hence the combination of restoring and unpoking, will clear a field
   * and make it not show an error
   */
  unpokeAfterSuccess?: boolean;
  /**
   * After the action is completed all the properties and includes will be unpoked
   * 
   * When a property is considered poked its error state shows, as it's usually hidden until the user has "poked it"
   * for example in the case of a password when the password is empty the property is invalid, but it only shows
   * that error after the user has interacted with it, hence the combination of restoring and unpoking, will clear a field
   * and make it not show an error
   */
  unpokeAfterAny?: boolean;
  /**
   * After the action is completed and it FAILED all the properties and includes will be unpoked
   * 
   * When a property is considered poked its error state shows, as it's usually hidden until the user has "poked it"
   * for example in the case of a password when the password is empty the property is invalid, but it only shows
   * that error after the user has interacted with it, hence the combination of restoring and unpoking, will clear a field
   * and make it not show an error
   */
  unpokeAfterFailure?: boolean;
  /**
   * cleans the search results when the action is completed and it SUCCEEDS
   * 
   * The search results were retrieved using automatic search or the search actioner, this allows to clean them
   * once the action is completed
   */
  cleanSearchResultsOnSuccess?: boolean;
  /**
   * cleans the search results when the action is completed
   * 
   * The search results were retrieved using automatic search or the search actioner, this allows to clean them
   * once the action is completed
   */
  cleanSearchResultsOnAny?: boolean;
  /**
   * cleans the search results when the action is completed and it FAILED
   * 
   * The search results were retrieved using automatic search or the search actioner, this allows to clean them
   * once the action is completed
   */
  cleanSearchResultsOnFailure?: boolean;
  /**
   * Restores the state on success back to its applied value (all the properties and all the states) once the
   * given action, completes and SUCCEEDS
   */
  restoreStateOnSuccess?: boolean;
  /**
   * Restores the state on success back to its applied value (all the properties and all the states) once the
   * given action completes
   */
  restoreStateOnAny?: boolean;
  /**
   * Restores the state on success back to its applied value (all the properties and all the states) once the
   * given action, completes and FAILED
   */
  restoreStateOnFailure?: boolean;
  /**
   * Cleans the state back to all nulls on success, and destroys the current
   * applied value from the server, it wipes the data and clear memory
   * 
   * Warning, clean state on success might not clean anything
   * if the cleaning is blocked from happening by other providers that are using the same data; this is because
   * cleaning state releases all the memory and its applied value and it's basically used as such; to discard a value
   * but it's not possible to release the state for an applied value if other item provider is accessing such
   * state at the same time, always use propertiesToRestoreOn* when it's simply about restoring the value
   * back to empty or what they used to be as it may otherwise do nothing, cleaning IS NOT RELIABLE
   */
  cleanStateOnSuccess?: boolean;
  /**
   * Cleans the state back to all nulls on failure, and destroys the current
   * applied value from the server, it wipes the data and clear memory
   * 
   * Warning, clean state on failure might not clean anything
   * if the cleaning is blocked from happening by other providers that are using the same data; this is because
   * cleaning state releases all the memory and its applied value and it's basically used as such; to discard a value
   * but it's not possible to release the state for an applied value if other item provider is accessing such
   * state at the same time, always use propertiesToRestoreOn* when it's simply about restoring the value
   * back to empty or what they used to be as it may otherwise do nothing, cleaning IS NOT RELIABLE
   */
  cleanStateOnFailure?: boolean;
  /**
   * Cleans the state back to all nulls, and destroys the current
   * applied value from the server, it wipes the data and clear memory
   * 
   * Warning, clean state might not clean anything
   * if the cleaning is blocked from happening by other providers that are using the same data; this is because
   * cleaning state releases all the memory and its applied value and it's basically used as such; to discard a value
   * but it's not possible to release the state for an applied value if other item provider is accessing such
   * state at the same time, always use propertiesToRestoreOn* when it's simply about restoring the value
   * back to empty or what they used to be as it may otherwise do nothing, cleaning IS NOT RELIABLE
   */
  cleanStateOnAny?: boolean;
}

type ActionSubmitOptionCb = (lastResponse: IActionSubmitResponse, lastOptions: IActionSubmitOptions) => Partial<IActionSubmitOptions> | boolean;
type ActionSearchOptionCb = (lastResponse: IActionResponseWithSearchResults, lastOptions: IActionSearchOptions) => Partial<IActionSearchOptions> | boolean;

/**
 * The options for submitting, ediitng, adding, etc...
 */
export interface IActionSubmitOptions extends IActionCleanOptions {
  /**
   * Specifies the list of properties that are going to be sumbitted to the server
   */
  properties: string[];
  /**
   * From the given list of properties and includes given, only submit whatever is determined
   * to be different from the current applied value
   */
  differingOnly?: boolean;
  /**
   * The list of includes and their properties that are to be submitted
   */
  includes?: { [include: string]: string[] };
  /**
   * The list of policies to submit
   */
  policies?: PolicyPathType[];
  /**
   * a function to run before sumbit that you may use to cancel the execution
   * @returns a boolean that represents whether the action should continue or not
   */
  beforeSubmit?: () => boolean | Promise<boolean>;
  /**
   * A parent to apply to the action, when adding this will cause the parent to be set
   * when editing this will cause a reparent where the node is moved between parents
   * 
   * Check parentedByAddOnly when the submit is used in conjuction with both add/editing
   * because reparenting may be not desired
   */
  parentedBy?: {
    /**
     * The item that will become the parent, use the path or qualified path name
     * for example "users/user" or "MOD_users__IDEF_user" are both valid
     */
    item: string,
    /**
     * The id of the parent, it should be defined
     */
    id: string,
    /**
     * the version of the parent
     */
    version?: string,
  };
  /**
   * Prevents a reparent, as it will only allow the add action (whether inferred or determined) this means
   * that parenting is only executed during the adding
   * 
   * A reparent exists whenever the parent is specified (even if it's the same parent) so this option is useful
   * to prevent errors of repareting to the same parent (which the server will complain about)
   */
  parentedByAddOnly?: boolean;
  /**
   * The action to do, normally it's inferred, if the item is not found then the action will be add
   * if the item exists and holds an applied value it will be editing, use this to make it determined
   */
  action?: "add" | "edit";
  /**
   * Sets a block status for use of admistrators and moderators to block the access of this data to other
   * users, setting it to true makes it blocked, the user must have blocking rights
   */
  blockStatus?: boolean;
  /**
   * Applies a timer to the block status, this should be a date in the corrent date format, it should be created
   * using the createDateTimeValue function to get the correct format
   */
  blockUntil?: string;
  /**
   * The reason for a blocking, this reason can be accessed by owners of the item
   */
  blockReason?: string;
  /**
   * Submit for an specific id, instead of the id in question that the item represents
   * this is useful for example, for copying data between items, by submitting to a different
   * id a copy would be generated
   * 
   * Using `null` as the value here is also useful as this will generate a brand new item for
   * the same data, copying to a new slot, if the id is supposed to be specific
   */
  submitForId?: string;
  /**
   * Same as submitForId but instead specifies the version
   */
  submitForVersion?: string;
  /**
   * Advanced, allows to submit for an alternate item rather than the current
   * one, use the path format or the qualified path format for this
   */
  submitForItem?: string;
  /**
   * An user id to execute this action in behalf of, user should have the rights to execute
   * actions in behalf of someone else, when this occurs, the owner will be the user id that is
   * given here, and not the person that executes the action
   */
  inBehalfOf?: string;
  /**
   * A state override to submit, every item in itemize has a state that represents binary data as the item
   * state is a transferrable blob, you can use the functions `downloadState` and `downloadStateAt` that the item
   * provider has, or otherwise using the item loader in order to retrieve this blob, the blob is superior because
   * the state is fully included, otherwise you can retrieve the state from `onStateChange` and other functions that provide
   * a state that is used internally, these also work, but it does not hold binary data within it such as images or files
   */
  stateOverride?: Blob | IItemStateType;

  /**
   * Override properties at submit time, specify a new value for the property, this is a good and preferrable alternative
   * for using setters, since setters effect every item provider as they are globally installed but overrides simply override
   * the request
   */
  propertyOverrides?: IPropertyOverride[];

  /**
   * Override includes at submit time, specify a new value for the property, this is a good and preferrable alternative
   * for using setters, since setters effect every item provider as they are globally installed but overrides simply override
   * the request
   */
  includeOverrides?: IIncludeOverride[];
  /**
   * Override the language that the submit occurs, the language mechanism of itemize is very complex, but this refer
   * to the text type; normally the user submits all their information with the language that their application is set at,
   * this will override that
   * 
   * However the language that a given text field has does not just depend on this, every text field has a language attribute,
   * but by default it will be given a null value at the start and then it will be set later once the value is applied according
   * to the server criteria (and the server criteria is to use the same language as the user is set)
   */
  languageOverride?: string;
  /**
   * Wait and merge is used so that many requests that happen simultaneously are bundled
   * this is not very useful for submit requests where they should be more "instant", but exists here nonetheless
   */
  waitAndMerge?: boolean;
  /**
   * Informs about the progress of the submit as a percentage
   */
  progresser?: ProgresserFn;
  /**
   * if submitting already this will prevent throwing an error and instead
   * will wait until the submit time is free
   * 
   * Pass a function to return a partial for patching the submit action
   * in case you want that behaviour
   * 
   * This is useful for example when making a timed submit that will submit each time
   * the user makes an input and will save to the server, say whenever the user fills a full text field
   * there will be a delay of 600ms and it will submit, in this situation the user pastes and image, waits; and starts
   * saving and the user begins typing while it is still saving the last submit, then stops, but the image is so large
   * that it takes more than the grace time and a new submit is triggered before the last one has finished; in this case pile submit
   * should be set to true so that no two submits can happen at once, causing an error of simultaneous submits.
   * 
   * Instead this function will ensure to wait so that submits are "piled" and only the last one of the last batch is executed
   */
  pileSubmit?: boolean | ActionSubmitOptionCb;

  /**
   * Normally when editing if you are submitting nothing or there is nothing that has changed (which is an error from the server's concern)
   * the client will realize this and refuse to submit, triggering an error, use this so that while the client refuses to submit anyway you
   * do not get an error but instead get emulated success
   */
  preventNothingToUpdateError?: boolean;

  /**
   * Useful to create drafts that exist only in the client side, when submitting either adding or editing the connection may not be available
   * causing a CANT_CONNECT error where internet is not available, in this case the client will try to save the current state in the
   * indexedDB so that it remains as a draft, you will realize storedState is set to true in the response along the CANT_CONNECT error
   * also onStateStored will trigger, if this fails storedState will be false and onStateStoreFailed will trigger
   * 
   * Check loadStoredState for retrieving this state from the item's provider when loading a value
   * 
   * The option clearStoredStateIfSubmitted tends to be used in conjunction with this one
   */
  storeStateIfCantConnect?: boolean | string | IStoredStateLocation;

  /**
   * Normally when storing state the enforced values that have been set via setters are not in use
   * as those are set on top of the current value, use this to force them to be applied in the stored value
   */
  storeStateIfCantConnectApplyEnforced?: boolean;

  /**
   * After a draft has been used, it's likely that you don't need this value anymore as it reflects what the server side holds, so
   * storeStateIfCantConnect option and clearStoredStateIfSubmitted tend to be used in conjunction
   * 
   * when a successful submit is executed that is the state will be cleared
   * 
   * This allows to clear the state from the local database and free the space
   * 
   * when used as a string represents an unique slot where it will be stored
   * otherwise the one specified forId will be used
   */
  clearStoredStateIfSubmitted?: boolean | string | IStoredStateLocation;
  /**
   * Specifices what to do about searchengine indexes, wait for ensures that search engine indexes have been (tried) to be
   * updated before the request is released from the server, while the indexing may have failed (and that's silent) this can be
   * used to wait for indexing to be attempted and done/or fail just so that in most cases scenarios after this is released
   * search shall be guaranteed to contain updated results to whatever changed occurred
   * 
   * wait_for will wait for elastic indexes to be ready for the element in question
   * wait_for_all only has true effect when cascading effects are in operation, like when deleting a parent causes delete of
   * all children, it will wait until all the children are also ready
   * 
   * this doesn't apply for SQL indexes that don't use search engine, SQL indexes are consistent and are assured to be consistent
   * this is only concerning search engine synchronization
   */
  indexing?: "wait_for" | "wait_for_all" | "detached";
  /**
   * Specify the last modified value of the current value in an edit action and it will only overwrite values
   * if the last modified matches what is given here, this is for usage of concurrency when making updates with offline
   * support by storing states in drafts, when using onStateLoadedFromStore you will receive metadata that specifies the last_modified
   * signature of the given known loaded value when it was attempted to be written (be so one was loaded) this will allow to specify that 
   * overwriteLastModified as the ifLastModified so a CONFLICT error will be raised if the submit fails to write due to that reason
   * 
   * You may resolve conflicts manually
   */
  ifLastModified?: string;
}

/**
 * Options for deleting
 */
export interface IActionDeleteOptions extends IActionCleanOptions {
  /**
   * Id to delete for instead of the current one, allows for deleting another item from another slot
   */
  deleteForId?: string;
  /**
   * Version to delete for instead of the current one
   */
  deleteForVersion?: string;
  /**
   * Delete policies to include
   */
  policies?: PolicyPathType[];
  /**
   * A function that executes before the delete gets done, this allows to prevent
   * or not the deleting action
   * 
   * @returns a boolean or a promise with a boolean on whether one should proceed
   */
  beforeDelete?: () => boolean | Promise<boolean>;
  /**
   * Similar to submit this allows to use a progressing as a percentage
   * in deletes this is mostly useless since it's basically instant
   */
  progresser?: ProgresserFn;
}

/**
 * @ignore
 */
export type CacheMetadataGeneratorFn = (record: IRQSearchRecord) => any;

/**
 * The options for searching
 */
export interface IActionSearchOptions extends IActionCleanOptions {
  /**
   * Disables the search in the client side
   * 
   * There are many reasons you may want to do this.
   * 1. Just to disable a search, if that isn't ssrEnabled is equivalent to it being disabled altogether
   * 2. To make a search only be executed in the server side and never in the client side with ssrEnabled true, this will
   * still retain consistency during render
   */
  clientDisabled?: boolean;
  /**
   * The properties to request from the search that will apply to
   * each element in the search, these properties will be requested
   * 
   * for example if you have users and you want to search and retrieve the username
   * but you also need the profile_picture, you will put username and profile_picture here
   */
  requestedProperties: string[];
  /**
   * Use for server side optimization to avoid large payloads when doing SSR specific
   * renders, since the search is built and then stored as its state the mismatch
   * of signature is irrelevant
   * 
   * searches done using ssrRequestedProperties will unavoidably get re-requested
   * by the client side once it is mounted, similar to the case of cache policies
   */
  ssrRequestedProperties?: string[];
  /**
   * The requested includes and the sinking properties related to these includes
   */
  requestedIncludes?: { [include: string]: string[] };
  /**
   * Similar to ssrRequestedProperties but for includes
   */
  ssrRequestedIncludes?: { [include: string]: string[] };
  /**
   * The properties to be used to search with, properties to be used in search in the
   * search mode item (or module) must be searchable and used for search (or search only)
   * 
   * This represents an array of strings, normally you may use the standard property id
   * in here and that will include the default search counterparts ids, however you may be more specific
   * 
   * For example, a string type has SEARCH counterpart and IN counterpart, by default the search counterpart
   * will be used, however you may be more interested in using the IN counterpart for a list
   * 
   * In that sense
   * 
   * ["username"]
   * 
   * Is equivalent to
   * 
   * [
   *   {
   *     id: "username",
   *     searchVariant: "search",
   *   }
   * ]
   * 
   * And
   * 
   * [
   *   {
   *     id: "username",
   *     searchVariant: "in",
   *   }
   * ]
   * 
   * Will allow to use in type taglist search using that counterpart
   * 
   * type         default variants [optional variants]
   * =============================
   * boolean      exact
   * currency     from, to (disableRangedSearch=false) exact (disableRangedSearch=true)
   * date         from, to (disableRangedSearch=false) exact (disableRangedSearch=true)
   * datetime     from, to (disableRangedSearch=false) exact (disableRangedSearch=true)
   * file
   * files
   * integer      from, to (disableRangedSearch=false) exact (disableRangedSearch=true)
   * location     location, radius
   * number       from, to (disableRangedSearch=false) exact (disableRangedSearch=true)
   * password
   * payment      from, to, payment-status, payment-type (disableRangedSearch=false) exact, payment-status, payment-type (disableRangedSearch=true)
   * string       search, [in]
   * taglist      search
   * text         search
   * time         from, to (disableRangedSearch=false) exact (disableRangedSearch=true)
   * unit         from, to (disableRangedSearch=false) exact (disableRangedSearch=true)
   * year         from, to (disableRangedSearch=false) exact (disableRangedSearch=true)
   */
  searchByProperties: Array<string | IPropertyCoreProps>;
  /**
   * The includes to be used to search with
   */
  searchByIncludes?: { [include: string]: string[] };
  /**
   * Order by rule to be used by the database
   * 
   * By default they will be sorted by creation date (recommended)
   * 
   * {
   *   order: {
   *     priority: 0, // smaller numbers are higher priority
   *     direction: "asc",
   *     nulls: "last",
   *   },
   *   name: {
   *     priority: 1,
   *     direction: "asc",
   *     nulls: "first",
   *   },
   * }
   * 
   * in this case the property "order" which may be a number will be used first
   * to sort, and later the property for the username will be used for sorting
   */
  orderBy?: IOrderByRuleType;
  /**
   * By whom it was created, this allows to limit the results that are by a specific
   * creator, this is very useful for example to ensure security policies are met
   * as the server may refuse to serve some information unless the creator is provided
   * 
   * Note that every search mode item definition has a created_by property
   * this however takes priority and will override that
   */
  createdBy?: string;
  /**
   * The since attribute, will only retrieve items limited to that date
   * use the createDateTimeValue format in order to specify this value
   * 
   * note that this option takes priority
   * over the since property that exists within the search mode
   */
  since?: string;
  /**
   * Similar to since but to limit until when the results are received
   * use the function createDateTimeValue to specify this value
   * 
   * note that this option takes priority
   * over the since property that exists within the search mode
   */
  until?: string;

  /**
   * The parent of the item (another item) this is important to specify in some
   * security scenarios as a given user may only have contextual access to specific
   * items given a parent
   */
  parentedBy?: {
    /**
     * The qualified path of the item or a path for example
     * users/user or MOD_users__IDEF_user
     */
    item: string,
    /**
     * Parented by a specific element with an specific id
     * otherwise it is used for simple filtering
     * will not work to use with a cache policy as the id needs to be specified
     */
    id?: string,
    /**
     * The version for the given id that is wanted
     */
    version?: string,
  };

  /**
   * Use this to enable SSR search
   * SSR search is pretty heavy this is necessary for
   * USSD apps to work or for extreme SEO optimization
   * but it increases the payload retrieved by quite the amount
   * 
   * Cannot use cache policy
   * Only allowed in traditional search
   * It will not work otherwise
   */
  ssrEnabled?: boolean;

  /**
   * The cache policy to perform the search, using a cache policy will disable
   * any possibility of SSR since it can't be performed in the server side
   * 
   * none                 default, does not use a search cache
   * by-owner             will cause to download everything with the given createdBy attribute, and it will be stored in the local database
   * by-parent            will use the parent rather than the owner
   * by-owner-and-parent  will use both the owner and the parent and download everything related to this
   * by-property          will use a trackable property in order to cache, note that the property needs to be tracked
   *                      trackedProperty needs to be specified in this case
   */
  cachePolicy?: "by-owner" | "by-parent" | "by-owner-and-parent" | "by-property" | "none";
  /**
   * refuse to fallback to a standard search if no cache worker support or if cache fails for some reason
   * not recommended to use this anywhere unless for syncing
   * 
   * you may want to enable cacheDoNotUsePolyfill as well as searches are allowed to use polyfills
   * by default
   */
  cacheDoNotFallbackToSimpleSearch?: boolean;
  /**
   * if set searches that have been executed with the cache worker will not have a limit nor offset
   * applied to them, recommended to use if you want to download everything related to a specific user
   * but it may take forever due to batching, specially if the user has a lot of data
   */
  cacheNoLimitOffset?: boolean;
  /**
   * When resolving SSR based searches they can be done without the use of a limit offset
   * this property is secure because it is resolved in the server side only so if the search
   * is marked like this it cannot be requested via the client
   */
  ssrNoLimitOffset?: boolean;
  /**
   * Will not fallback to polyfill to store search results if the cache worker fails midway or is
   * otherwise not available, by default search will do all in its power to succesfully cache
   * even if that means using volatile memory
   */
  cacheDoNotFallbackToPolyfill?: boolean;
  /**
   * The tracked property, all tracked properties must be of type exact-value-tracked or exact-identifier-tracked
   * exact-value-tracked is an arbitrary string value, where an exact-identifier-tracked is used for ids such as user ids
   * or such where special characters are not allowed
   */
  trackedProperty?: string;
  /**
   * This metadata will be cached alongside the cached value and whenever the value is retrieved from the cache the metadata
   * is compared against the value here, looking for a potential mismatch, use this for example in the case of permission changes
   * in soft read rules; some values may be hidden under softReadRoleAccess where they do not trigger an error but are
   * simply hidden, if the permissions change for some reason (eg user changes role) a new value will not be retrieved simply because
   * it doesn't know this for example
   * 
   * {
   *   userRoleWhenRetrieved: userData.role,
   * }
   * 
   * will be enough to trigger a cacheMetadataMismatchAction when the role changes in order to attempt to invalidate the cache
   * due to this and the soft rules
   */
  cacheMetadata?: any;
  /**
   * This function or value is used to perform an action when a metadata mismatch has been detected, and this will
   * perform further invalidation, even invalidation based on singular attributes
   */
  cacheMetadataMismatchAction?: SearchCacheMetadataMismatchActionFn | ISearchCacheMetadataMismatchAction;
  /**
   * The listening policy will keep the values up to date based on the criteria given
   * when used in conjunction with cache policy the values should match
   * 
   * none
   * by-owner             will listen based on the owner of the item
   * by-parent            will listen based on the parent node
   * by-owner-and-parent  will listen based on both the owner and the parent
   * by-property          will use the tracked property to listen realtime values
   * 
   * A listen policy is recommended to use with a cache policy (otherwise the value in the db will be static)
   * but not recommended to use without as it will perform a brand new search every time
   */
  listenPolicy?: "by-owner" | "by-parent" | "by-owner-and-parent" | "by-property" | "none";
  /**
   * uses slow polling rather than realtime listening
   * this is not recommended to use, values update each minute more or less
   */
  listenPolicySlowPolling?: boolean;
  /**
   * Creates a destruction marker so that the value is destroyed during logout
   * once the user logouts the database is wiped from this search given its criteria
   * it should therefore have a cache policy
   */
  markForDestructionOnLogout?: boolean;
  /**
   * The destruction marker is executed once this component unmounts which will destroy
   * the search elements
   */
  markForDestructionOnUnmount?: boolean;
  /**
   * Normally searches will download a list of records and use these records to retrieve the next
   * values, so even if the database changes, the value is kept as it was during that one search,
   * however if the list is small this is rather ineffective, a traditional search will simply download
   * all the data in a single request without doing lists of records
   * 
   * traditional is better for single page views, but worse for paginations
   */
  traditional?: boolean;
  /**
   * The limit for the search in the database level, there's security attached to this
   * regarding the maximum records you may get, normally this number is smaller for traditional
   * search
   */
  limit: number;
  /**
   * The offset to use during this search
   */
  offset: number;
  /**
   * Types to search as, only truly usable on module based search
   */
  types?: string[];
  /**
   * By default when searching if a field is valued as null
   * then it will not be searched by it, the search action will delete
   * all null attributes, however if this flag is enabled these nulls will
   * be sent as search parameters, this means that only nulls will match
   * 
   * for example if searching an username the value "a" will search for all
   * users that contain an a, when the field is empty this is null, the default
   * behaviour is to send nothing, this means no filtering by username, however
   * with this flag a null value will be sent, which means only users that match
   * null itself will match, or a lack of username
   */
  enableNulls?: boolean;
  /**
   * will store the search results in the navigation and location and they
   * can later be loaded with loadSearchResultsFromNavigation
   */
  storeResultsInNavigation?: string;
  /**
   * uses wait and merge to merge with other searches
   */
  waitAndMerge?: boolean;
  /**
   * Uses a progresses to check the process of the search by a percentage
   */
  progresser?: ProgresserFn;
  /**
   * Uses the search engine instead of the standard database level query, provides some limitations
   * such as that it cannot anymore have offset that are non-zero so traditional pagination
   * is not feasible
   * 
   * if given a string value it represents the language that it is used, boolean uses all languages
   * 
   * The item must be search engine enabled or otherwise this will cause an error
   */
  useSearchEngine?: boolean | string;

  /**
   * Uses the full highlights during a search engine query, the number specified should be
   * between 1 and 50 as it highlights (10 recommended)
   */
  useSearchEngineFullHighlights?: number;

  /**
   * Only allow items of a specific version
   */
  versionFilter?: string;

  /**
   * Blacklist a specific version
   */
  versionFilterOut?: string;

  /**
   * Only allow items of a specific ids
   */
  idsFilter?: string[];

  /**
   * Blacklist ids
   */
  idsFilterOut?: string[];

  /**
   * Only allows items of a given creator
   * 
   * this acts like a filter after a search is done and does not replace
   * specifying the creator by createdBy as createdBy
   * has considerations with permissions
   */
  createdByFilterOut?: string[];

  /**
   * Denies items of a given creator (blacklist)
   * 
   * this acts like a filter after a search is done and does not replace
   * specifying the creator by createdBy as createdBy
   * has considerations with permissions
   */
  createdByFilter?: string[];

  /**
  * Only allows items of a given parent type
  * 
  * this acts like a filter after a search is done and does not replace
  * specifying the parent by parentedBy
  * has considerations with permissions
  */
  parentTypeFilter?: string[];

  /**
   * Denies items of a given parent type (blacklist)
   * 
   * this acts like a filter after a search is done and does not replace
   * specifying the parent by parentedBy
   * has considerations with permissions
   */
  parentTypeFilterOut?: string[];

  /**
  * Only allows items of a given parent id
  * 
  * this acts like a filter after a search is done and does not replace
  * specifying the parent by parentedBy
  * has considerations with permissions
  */
  parentIdsFilter?: string[];

  /**
   * Denies items of a given parent id (blacklist)
   * 
   * this acts like a filter after a search is done and does not replace
   * specifying the parent by parentedBy
   * has considerations with permissions
   */
  parentIdsFilterOut?: string[];

  /**
   * Pile search allows to pile search queries one on top of another and resolve conflicts that could be caused
   * by searching while searching, passing a boolean puts things in a queue where the last search is executed
   */
  pileSearch?: boolean | ActionSearchOptionCb;
}

/**
 * Represents the poking mechanism
 */
export interface IPokeElementsType {
  /**
   * properties that are poked as a list of string
   */
  properties: string[];
  /**
   * includes that are poked with their list of properties
   */
  includes: { [include: string]: string[] };
  /**
   * policies that are poked
   */
  policies: PolicyPathType[];
}

export interface IBasicFns {
  /**
   * Poke elements
   * @param elements 
   * @returns 
   */
  poke: (elements: IPokeElementsType) => void;
  /**
   * unpokes all elements
   * @returns 
   */
  unpoke: () => void;
  /**
   * makes it so that it reloads the value, the loadValue function
   * usually is executed on componentDidMount, pass deny cache in order to
   * do a hard refresh and bypass the cache
   * @param denyCache 
   * @returns 
   */
  reload: (denyCache?: boolean) => Promise<IActionResponseWithValue>;
  /**
   * submits the current information, when there's no id, this triggers an
   * add action, with an id however this trigger edition
   * @param options 
   * @returns a response with the status
   */
  submit: (options: IActionSubmitOptions) => Promise<IActionSubmitResponse>;
  /**
   * Simply deletes
   * @returns a response with the status
   */
  delete: () => Promise<IBasicActionResponse>;
  /**
   * cleans performs the cleanup of properties and policies
   * @param options 
   * @param state 
   * @param avoidTriggeringUpdate 
   * @returns 
   */
  clean: (options: IActionCleanOptions, state: "success" | "fail", avoidTriggeringUpdate?: boolean) => void;
  /**
   * performs a search, note that you should be in the searchMode however
   * since all items are the same it's totally possible to launch a search
   * in which case you'll just get a searchError you should be in search
   * mode because there are no endpoints otherwise
   * @param options 
   * @returns 
   */
  search: (options: IActionSearchOptions) => Promise<IActionResponseWithSearchResults>;
}

/**
 * The whole item definition context
 */
export interface IItemContextType extends IBasicFns {
  /**
   * the item definition in question
   */
  idef: ItemDefinition;
  /**
   * the state of this item definition that has
   * been pulled and calculated from this item definition
   */
  state: IItemStateType;
  /**
   * the id of which it was pulled from, this might be
   * null
   */
  forId: string;
  /**
   * the version of which it was pulled from
   */
  forVersion: string;
  /**
   * with ids a not found flag might be set if the item
   * is not found 404
   */
  notFound: boolean;
  /**
   * with ids the item might be blocked as well so this
   * flag is raised
   */
  blocked: boolean;
  /**
   * if you are a moderator, or have a role that permits it
   * data might still be available, this comes together with
   * blocked
   */
  blockedButDataAccessible: boolean;
  /**
   * an error that came during loading
   */
  loadError: EndpointErrorType;
  /**
   * whether it is currently loading
   */
  loading: boolean;
  /**
   * whether it loaded, sucesfully
   */
  loaded: boolean;
  /**
   * whether it is currently holding a state that was loaded
   * of any kind
   */
  holdsRemoteState: boolean;
  /**
   * an error that came during submitting
   */
  submitError: EndpointErrorType;
  /**
   * whether it is currently submitting
   */
  submitting: boolean;
  /**
   * whether it has submitted sucesfully, this is a transitory
   * flag, and should be removed, basically it means the item
   * is in a success state of submitted
   */
  submitted: boolean;
  /**
   * an error that came during deleting
   */
  deleteError: EndpointErrorType;
  /**
   * whether it is currently deleting
   */
  deleting: boolean;
  /**
   * same as submitted, a success flag that says whether the element
   * was deleted
   */
  deleted: boolean;
  /**
   * an error that occured during search
   */
  searchError: EndpointErrorType;
  /**
   * whether it is currently searching
   */
  searching: boolean;
  /**
   * the obtained search results from the rq endpoint
   * just as they come
   */
  searchRecords: IRQSearchRecord[];
  /**
   * The search results (only available if a traditional search was performed)
   */
  searchResults: IRQValue[];
  /**
   * The limit used in the given search
   */
  searchLimit: number;
  /**
   * The offset used int he given search
   */
  searchOffset: number;
  /**
   * The counted results from the search
   */
  searchCount: number;
  /**
   * every search gets an unique identifier
   */
  searchId: string;
  /**
   * Whether the search was not truly performed but was instead restored
   * for example, from the location, or from the state of the app
   */
  searchWasRestored: "NO" | "FROM_LOCATION" | "FROM_STATE";
  /**
   * a search owner, or null, for the createdBy argument
   */
  searchOwner: string;
  /**
   * Search last modified as it was retrieved from the server
   */
  searchLastModified: string;
  /**
   * passed onto the search to tell it if results that are retrieved
   * and then updated should be cached into the cache using the
   * long term strategy, this is usually true when cachePolicy is something
   */
  searchShouldCache: boolean;
  /**
   * the search fields that should be requested according
   * to the search function
   */
  searchFields: any;
  /**
   * The properties that were requested during the search
   */
  searchRequestedProperties: string[];
  /**
   * The includes that were requested during the search
   */
  searchRequestedIncludes: { [include: string]: string[] };
  /**
   * Whether the search engine was used or not
   */
  searchEngineEnabled: boolean;
  /**
   * The language that was used for the search using the search engine
   */
  searchEngineEnabledLang: string;
  /**
   * The language that was used for the search using the search engine
   */
  searchEngineUsedFullHighlights: number;
  /**
   * The highlight args that were received when using a search engine
   */
  searchEngineHighlightArgs: IItemSearchStateHighlightArgsType;
  /**
   * The highlights given by elasticsearch for the search that apply
   * to the entire search results
   */
  searchHighlights: IElasticHighlightRecordInfo;
  /**
   * The search metadata received
   */
  searchMetadata: string;
  /**
   * These are the specific highlights ot use within this value
   * and they will be passed to the renderer in order to show
   * the highlights
   */
  highlights: IElasticHighlightSingleRecordInfo;
  /**
   * poked is a flag that is raised to mean to ignore
   * anything regarding user set statuses and just mark
   * things as they are, for example, by default many fields
   * are empty (null) and they are invalid, but in UX wise
   * it makes no sense to show as invalid immediately
   * poked makes it so that every field shows its true state
   * they are poked
   */
  pokedElements: IPokeElementsType;
  /**
   * this is a listener that basically takes a property, and a new value
   * and internal value, whatever is down the line is not expected to do
   * changes directly, but rather call this function, this function will
   * then update everything under the hood
   * @param property 
   * @param value 
   * @param internalValue 
   * @returns 
   */
  onPropertyChange: (
    property: PropertyDefinition | string | IPropertyCoreProps,
    value: PropertyDefinitionSupportedType,
    internalValue: any,
  ) => void;
  /**
   * When the property shall be restored this listener shall be called
   * @param property 
   * @returns 
   */
  onPropertyRestore: (
    property: PropertyDefinition | string | IPropertyCoreProps,
  ) => void;
  /**
   * this is yet another passed function that does the same as properties
   * but with exclusion states
   * @param include 
   * @param state 
   * @returns 
   */
  onIncludeSetExclusionState: (
    include: Include,
    state: IncludeExclusionState,
  ) => void;
  /**
   * now this would be used on enforcement, this is used for the setter
   * the reason it also needs to specify the id is because it might
   * go out of sync with the item definition
   * @param property 
   * @param value 
   * @param givenForId 
   * @param givenForVersion 
   * @returns 
   */
  onPropertyEnforce: (
    property: PropertyDefinition | string | IPropertyCoreProps,
    value: PropertyDefinitionSupportedType,
    givenForId: string,
    givenForVersion: string,
  ) => void;
  /**
   * Clear the enforce that was previously set
   * @param property 
   * @param givenForId 
   * @param givenForVersion 
   * @returns 
   */
  onPropertyClearEnforce: (
    property: PropertyDefinition | string | IPropertyCoreProps,
    givenForId: string,
    givenForVersion: string,
  ) => void;

  /**
   * dismisses the load error
   * @returns 
   */
  dismissLoadError: () => void;
  /**
   * dismisses the submit error
   * @returns 
   */
  dismissSubmitError: () => void;
  /**
   * dismisses the submitted state
   * @returns 
   */
  dismissSubmitted: () => void;
  /**
   * dismisses the delete error
   * @returns 
   */
  dismissDeleteError: () => void;
  /**
   * dismisses the deleted state
   * @returns 
   */
  dismissDeleted: () => void;
  /**
   * dismisses the search error
   * @returns 
   */
  dismissSearchError: () => void;
  /**
   * dismisses the search results
   * @returns
   */
  dismissSearchResults: () => void;
  /**
   * downloads the state as a blob (file) of the current item
   * @param specificProperties 
   * @param specificIncludes 
   * @returns 
   */
  downloadState: (specificProperties?: string[], specificIncludes?: { [id: string]: string[] }) => Promise<Blob>;
  /**
   * Downloads the state as a blob (file) of the current item but at a given id, version combo
   * @param id 
   * @param version 
   * @param specificProperties 
   * @param specificIncludes 
   * @returns 
   */
  downloadStateAt: (id: string, version?: string, specificProperties?: string[], specificIncludes?: { [id: string]: string[] }) => Promise<Blob>;
  /**
   * Loads the state from a given file
   * @param f 
   * @param specificProperties 
   * @param specificIncludes 
   * @returns 
   */
  loadStateFromFile: (f: Blob | File, specificProperties?: string[], specificIncludes?: { [id: string]: string[] }) => Promise<void>;
  /**
   * Loads the state for a given file in the current item location at a given slot id and version
   * @param f 
   * @param id 
   * @param version 
   * @param specificProperties 
   * @param specificIncludes 
   * @returns 
   */
  loadStateFromFileAt: (
    f: Blob | File,
    id: string,
    version?: string,
    specificProperties?: string[],
    specificIncludes?: { [id: string]: string[] },
  ) => Promise<void>;

  /**
   * Simply the remote listener that this item is using to listen
   * it's always the same accross all items
   */
  remoteListener: RemoteListener;

  /**
   * A parent context that has been injected
   * @deprecated
   */
  injectedParentContext: IItemContextType;

  /**
   * Injects a promise so that the submit cannot resolve until this promise
   * is resolved
   * @param arg 
   * @returns 
   */
  injectSubmitBlockPromise: (arg: Promise<any>) => void;
}

/**
 * Represents the search context that is injected above an item provider in order to block
 * it from loading itself so it's aware that elements are being searched
 */
export interface ISearchItemValueContextType {
  /**
   * Records being searched that will eventually have an applied value
   */
  currentlySearching: IRQSearchRecord[];
  /**
   * Fields that are being searched
   */
  searchFields: IRQRequestFields;
  /**
   * Records that are overall in the search that is active avobe
   */
  searchRecords: IRQSearchRecord[];
}

/**
 * The item context represents the context that holds information about
 * an item, with its value and respective state, all item contexts
 * are synchronized as the state is held centrally in the item definition
 */
export const ItemContext = React.createContext<IItemContextType>(null);

/**
 * The phaser context is used by the item context phase in order to phase item contexts
 * through other item contexts, this is the new way that deprecates the injectParentContext mechanism
 */
export const ItemContextPhaserContext = React.createContext<{ [slotId: string]: IItemContextType }>({});

/**
 * The search item value context is what is used to inject the currently being searched context
 */
export const SearchItemValueContext = React.createContext<ISearchItemValueContextType>(null);

/**
 * The props for the item provider
 */
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
   * Normally items will be automatically reloaded when
   * their value couldn't be retrieved because it couldn't connect
   * the moment they are to connect, use this to disable that
   */
  doNotAutomaticReloadIfCantConnect?: boolean;
  /**
   * Normally items will be automatically reloaded when
   * their value couldn't be retrieved because it couldn't connect
   * the moment they are to connect, use this to disable that
   */
  doNotAutomaticReloadSearchIfCantConnect?: boolean;
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
  enableExternalChecks?: boolean;
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
   * For high accuracy realtime search, when search results are obtained during SSR
   * from a SSR search id, they may be considered true to what is currently in the database
   * however we are not certain because no listeners may have been installed (if the search has a listenPolicy)
   * disabling the grace time ensures that it is always checked against the database
   */
  automaticSearchNoGraceTime?: boolean;
  /**
   * Makes automatic search happen only on mount
   */
  automaticSearchIsOnlyInitial?: boolean;
  /**
   * Makes automatic search only happen if the object doesn't currently hold
   * a search state
   */
  automaticSearchIsOnlyFallback?: boolean;
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
   * Automatic search seeks for changes, sometimes what these changes
   * imply is that no search should be done, for example when having an automatic
   * search and then not having one, this will cause the search results to go away
   * and be dismissed, this may be unwanted behaviour for example if waiting for
   * some data to trigger an automatic search between automatic searches, you can prevent
   * it from being dismissed by using this option
   */
  automaticSearchDoNotAutoDismissDuringChanges?: boolean;
  /**
   * Load searches from the popstate event, use with the option for
   * storeResultsInNavigation and the same identifier
   */
  loadSearchFromNavigation?: string;
  /**
   * Setters for setting values for the properties within the item definition
   * itself, useful not to depend on mounting at time
   */
  setters?: IPropertySetterProps<PropertyDefinitionSupportedType>[];
  /**
   * Similar to setters but the values are just prefilled and as such are not
   * readonly, prefills only get executed during the initial mount
   * of the component
   */
  prefills?: IPropertySetterProps<PropertyDefinitionSupportedType>[];
  /**
   * Synchronizes a property based on a query string it behaves like a prefill
   * (and overrides the prefill) if it finds a value in the query string
   * and it will keep it updated bsed on that
   * 
   * Some properties cannot be qs tracked, such as files, only
   * values representing serializable objects can be tracked
   */
  queryStringSync?: Array<string | IPropertyCoreProps>;
  /**
   * When using the query string sync it will replace the current history state
   */
  queryStringSyncReplace?: boolean;
  /**
   * only downloads and includes the properties specified in the list
   * in the state
   */
  properties?: Array<string | IPropertyCoreProps>;
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
   * uses polling to keep the value updated rather than
   * using the standard method, it's updated only sometimes
   * on a minute basis, but it doesn't use a listener in exchange
   * 
   * It's not recommended to use this
   */
  slowPolling?: boolean;
  /**
   * uses long term caching with the worker cache strategy
   */
  longTermCaching?: boolean;
  /**
   * Cache metadata to push with the long term caching
   */
  longTermCachingMetadata?: any;
  /**
   * Cache rules to resolve during a metadata mismatch
   */
  longTermCachingMetadataMismatchAction?: ICacheMetadataMismatchAction;
  /**
   * loads the state from the cache worker if a
   * stored value is found
   * 
   * This plays with
   * onStateLoadedFromStore from this same provider
   * onStateStored from this same provider
   * storeStateOnChange from this same provider
   * storeStateIfCantConnect from submit action
   * and clearStoredStateIfConnected from submit action
   */
  loadStoredState?: boolean | string | IStoredStateLocation;
  /**
   * stores the state whenever the state changes
   */
  storeStateOnChange?: boolean | string | IStoredStateLocation;
  /**
   * When storing a state normally the value of the current state
   * does not include enforced values that have been set
   * with setters, or Setter or otherwise enforced
   */
  storeStateOnChangeApplyEnforced?: boolean;
  /**
   * marks the item for destruction as the user logs out
   */
  markForDestructionOnLogout?: boolean;
  /**
   * marks the item for destruction as the component unmounts
   */
  markForDestructionOnUnmount?: boolean;
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
   * @deprecated please use ItemContextPhase and ItemContextRetrieve instead
   */
  injectParentContext?: boolean;
  /**
   * Triggers if it will search for whatever reason
   */
  onWillSearch?: () => void;
  /**
   * callback triggers on search with the response
   */
  onSearch?: (data: IActionResponseWithSearchResults) => void;
  /**
   * callback triggers when new search data has been loaded into
   * the item state, not just when a new search has been executed but
   * also when memory data has been fetched or from location
   */
  onSearchStateChange?: (data: IItemSearchStateType) => void;
  /**
   * Occurs when a search state is preloaded at mount time taken from the
   * memory rather than a search action
   */
  onSearchStateLoaded?: (data: IItemSearchStateType) => void;
  /**
   * Callback triggers on submit
   */
  onSubmit?: (data: IActionSubmitResponse) => void;
  /**
   * Triggers if it will load for whatever reason
   */
  onWillLoad?: () => void;
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
  onStateChange?: (state: IItemStateType, prevState: IItemStateType) => void;
  /**
   * On state changes but from the store that is loaded
   * from a cache worker
   */
  onStateLoadedFromStore?: (state: IItemStateType, metadata: ICacheStateMetadata, fns: IBasicFns) => void;
  /**
   * Runs when the state was stored for whatever reason
   */
  onStateStored?: (state: IItemStateType) => void;
  /**
   * Runs when the state was attempted to store but failed to store
   */
  onStateStoreFailed?: (state: IItemStateType) => void;

  /**
   * Mainly for internal use and set by the record on its own
   * set the highlights for this element
   * 
   * the highlights are passed by the search provider
   */
  highlights?: IElasticHighlightSingleRecordInfo;

  /**
   * disables getting the state from the memory cache the state must
   * always be retrieved from the indexed cache or from network
   */
  doNotUseMemoryCache?: boolean;

  /**
   * disables using indexed as cache
   */
  doNotUseCache?: boolean;
}

/**
 * This represents the actual provider that does the job, it takes on some extra properties
 * taken from the contexts that this is expected to run under
 */
interface IActualItemProviderProps extends IItemProviderProps {
  /**
   * The token data is retrieved from the token provider and is used for
   * running the requests
   */
  tokenData: ITokenContextType;
  /**
   * locale data for, well.... localization, nah it's actually to setup the language
   * during requests, so that full text search can function
   */
  localeData: ILocaleContextType;
  /**
   * the item definition istance that was fetched from the itemDefinition
   */
  itemDefinitionInstance: ItemDefinition;
  /**
   * the qualified name of such item definition
   */
  itemDefinitionQualifiedName: string;
  /**
   * and whether it contains externally checked properties
   */
  containsExternallyCheckedProperty: boolean;
  /**
   * the remote listener for listening to changes that occur
   * server side
   */
  remoteListener: RemoteListener;
  /**
   * the searching context to pull values from
   */
  searchContext: ISearchItemValueContextType;
  /**
   * injected parent context
   * @deprecated
   */
  injectedParentContext: IItemContextType;
  /**
   * config that comes from the config provider
   */
  config: IConfigRawJSONDataType;
  /**
   * only available when supporting search from navigation
   */
  location?: Location<any>;
}

// This is the state of such, it's basically a copy of the
// context, so refer to that, the context is avobe
interface IActualItemProviderState extends IItemSearchStateType {
  searchWasRestored: "NO" | "FROM_STATE" | "FROM_LOCATION";
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

  private internalSearchDestructionMarkers: Array<[string, string, string, [string, string, string], [string, string]]> = [];

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

  // used by store state on change in order to put
  // timeouts on top of each other and not run one
  // every time something changes
  private storeStateTimeout: NodeJS.Timeout = null;

  /**
   * The consumabel qs state that is being set
   */
  private consumableQsState: any = null;
  private consumeQsStateTimeout: NodeJS.Timeout = null;

  private static getItemStateStatic(props: IActualItemProviderProps) {
    return props.itemDefinitionInstance.getStateNoExternalChecking(
      props.forId || null,
      props.forVersion || null,
      props.enableExternalChecks,
      props.itemDefinitionInstance.isInSearchMode() ?
        getPropertyListForSearchMode(
          props.properties || [],
          props.itemDefinitionInstance.getStandardCounterpart()
        ) : getPropertyListDefault(props.properties),
      props.includes || {},
      !props.includePolicies,
    );
  }

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
      (props.forId || null) !== (state.itemState.forId || null) ||
      (props.forVersion || null) !== (state.itemState.forVersion || null) ||
      (
        props.location &&
        props.location.state &&
        props.location.state[props.loadSearchFromNavigation] &&
        props.location.state[props.loadSearchFromNavigation].searchId !== state.searchId
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
        props.location &&
        props.location.state &&
        props.location.state[props.loadSearchFromNavigation] &&
        props.location.state[props.loadSearchFromNavigation].searchId !== state.searchId
      ) {
        const searchIdefState = props.location.state[props.loadSearchFromNavigation].searchIdefState;
        props.itemDefinitionInstance.applyState(
          props.forId || null,
          props.forVersion || null,
          searchIdefState,
        );
        searchState = props.location.state[props.loadSearchFromNavigation].searchState;
        searchWasRestored = "FROM_LOCATION";
      } else {
        const searchStateComplex = props.itemDefinitionInstance.getSearchState(
          props.forId || null, props.forVersion || null,
        );

        if (searchStateComplex) {
          searchState = searchStateComplex.searchState;

          const state = searchStateComplex.state;
          props.itemDefinitionInstance.applyState(
            props.forId || null,
            props.forVersion || null,
            state,
          );

          searchWasRestored = "FROM_STATE";
        }
      }

      return {
        itemState: ActualItemProvider.getItemStateStatic(props),
        ...searchState,
        searchWasRestored: searchWasRestored as any,
      };
    }
    return null;
  }

  public static async getDerivedServerSideStateFromProps(props: IActualItemProviderProps, state: IActualItemProviderState): Promise<Partial<IActualItemProviderState>> {
    if (
      props.itemDefinitionInstance.isInSearchMode() &&
      props.automaticSearch
    ) {
      // cheesy way to get to the root
      const root = props.itemDefinitionInstance.getParentModule().getParentRoot();
      const id = props.forId || null;
      const version = props.forVersion || null;
      await root.callRequestManagerSearch(props.itemDefinitionInstance, id, version, props.automaticSearch);
      return ActualItemProvider.setupInitialState(props);
    } else if (
      state.loaded ||
      props.forId === null ||
      props.itemDefinitionInstance.isInSearchMode() ||
      props.itemDefinitionInstance.isExtensionsInstance() ||
      props.avoidLoading
    ) {
      return null;
    }

    const id = props.forId;
    const version = props.forVersion || null;

    const { requestFields } = getFieldsAndArgs({
      includeArgs: false,
      includeFields: true,
      includes: props.includes || {},
      properties: getPropertyListDefault(props.properties),
      itemDefinitionInstance: props.itemDefinitionInstance,
      forId: id,
      forVersion: version,
    });

    // let's check if what we have loaded this already as part of the search records
    // we have loaded, when there are search records this mean that the search loader
    // will have loaded these results in the state
    if (
      props.searchContext &&
      props.searchContext.searchRecords &&
      props.searchContext.searchRecords.find(
        (s) =>
          s.id === id &&
          s.version === version &&
          s.type === props.itemDefinitionInstance.getQualifiedPathName(),
      ) &&
      requestFieldsAreContained(requestFields, props.searchContext.searchFields)
    ) {
      // no need to load they are already in memory and the collector
      return null;
    }

    // cheesy way to get to the root
    const root = props.itemDefinitionInstance.getParentModule().getParentRoot();

    await root.callRequestManager(
      props.itemDefinitionInstance,
      id,
      version,
      requestFields,
    );
    return ActualItemProvider.setupInitialState(props);
  }

  public static setupInitialState(props: IActualItemProviderProps): IActualItemProviderState {
    // the value might already be available in memory, this is either because it was loaded
    // by another instance or because of SSR during the initial render
    const memoryLoaded = !!(props.forId && props.itemDefinitionInstance.hasAppliedValueTo(
      props.forId || null, props.forVersion || null,
    ));
    let memoryLoadedAndValid = false;
    // by default we don't know
    let isNotFound = false;
    if (memoryLoaded) {
      const appliedRQValue = props.itemDefinitionInstance.getRQAppliedValue(
        props.forId || null, props.forVersion || null,
      );
      // this is the same as for loadValue we are tyring to predict
      const { requestFields } = getFieldsAndArgs({
        includeArgs: false,
        includeFields: true,
        uniteFieldsWithAppliedValue: true,
        includes: props.includes || {},
        properties: getPropertyListDefault(props.properties),
        itemDefinitionInstance: props.itemDefinitionInstance,
        forId: props.forId || null,
        forVersion: props.forVersion || null,
      });
      // this will work even for null values, and null requestFields
      memoryLoadedAndValid = (
        appliedRQValue &&
        requestFieldsAreContained(requestFields, appliedRQValue.requestFields)
      );
      isNotFound = memoryLoadedAndValid && appliedRQValue.rawValue === null;
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
    const searchStateComplex = props.itemDefinitionInstance.getSearchState(
      props.forId || null, props.forVersion || null,
    );
    if (searchStateComplex) {
      searchState = searchStateComplex.searchState;

      const state = searchStateComplex.state;
      props.itemDefinitionInstance.applyState(
        props.forId || null,
        props.forVersion || null,
        state,
      );

      searchWasRestored = "FROM_STATE";
    }

    // so the initial setup
    return {
      // same we get the initial state, without checking it externally and passing
      // all the optimization flags
      itemState: ActualItemProvider.getItemStateStatic(props),
      // and we pass all this state
      isBlocked: false,
      isBlockedButDataIsAccessible: false,
      notFound: isNotFound,
      loadError: null,
      // loading will be true if we are setting up with an id
      // as after mount it will attempt to load such id, in order
      // to avoid pointless refresh we set it up as true from
      // the beggining
      loading: memoryLoadedAndValid ? false : (props.avoidLoading ? false : !!props.forId),
      // loaded will be whether is loaded or not only if there is an id
      // otherwise it's technically loaded
      loaded: props.forId ? memoryLoadedAndValid : true,

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
  // this is the id used for block cleaning
  private blockIdClean: string;

  // the list of submit block promises
  private submitBlockPromises: Array<Promise<any>> = [];

  // the list of submit block promises
  private activeSubmitPromise: Promise<{ response: IActionSubmitResponse, options: IActionSubmitOptions }> = null;
  private activeSubmitPromiseAwaiter: string = null;

  // the list of search block promises
  private activeSearchPromise: Promise<{ response: IActionResponseWithSearchResults, options: IActionSearchOptions }> = null;
  private activeSearchPromiseAwaiter: string = null;

  // sometimes reload calls can come in batches due to triggering actions
  // it doesn't hurt to catch them all and create a timeout
  private reloadListenerTimeout: NodeJS.Timeout = null;

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
    this.dismissDeleteError = this.dismissDeleteError.bind(this);
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
    this.dismissSearchError = this.dismissSearchError.bind(this);
    this.dismissSearchResults = this.dismissSearchResults.bind(this);
    this.onSearchReload = this.onSearchReload.bind(this);
    this.injectSubmitBlockPromise = this.injectSubmitBlockPromise.bind(this);
    this.installSetters = this.installSetters.bind(this);
    this.removeSetters = this.removeSetters.bind(this);
    this.installPrefills = this.installPrefills.bind(this);
    this.blockCleanup = this.blockCleanup.bind(this);
    this.releaseCleanupBlock = this.releaseCleanupBlock.bind(this);
    this.loadStateFromFile = this.loadStateFromFile.bind(this);
    this.loadStateFromFileAt = this.loadStateFromFileAt.bind(this);
    this.downloadState = this.downloadState.bind(this);
    this.downloadStateAt = this.downloadStateAt.bind(this);
    this.onConnectStatusChange = this.onConnectStatusChange.bind(this);

    // first we setup the listeners, this includes the on change listener that would make
    // the entire app respond to actions, otherwise the fields might as well be disabled
    // we do this here to avoid useless callback changes as the listeners are not ready
    this.installSetters(props);
    this.installPrefills(props);

    if (typeof document !== "undefined") {
      this.setupListeners();
      this.blockCleanup();
    }

    // we get the initial state
    this.state = ActualItemProvider.setupInitialState(props);
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
  public injectSubmitBlockPromise(p: Promise<any>) {
    this.submitBlockPromises.push(p);
  }
  public async markForDestruction(unmount: boolean, unmark: boolean, props: IActualItemProviderProps = this.props) {
    if (typeof document === "undefined") {
      return;
    }
    if (props.forId) {
      if (CacheWorkerInstance.instance) {
        await CacheWorkerInstance.instance.waitForInitializationBlock();
      }

      const qualifiedName = props.itemDefinitionInstance.getQualifiedPathName();
      const forId = props.forId;
      const forVersion = props.forVersion || null;

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
  public async markSearchForDestruction(
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
    }

    // syncing from the query string in a cheap way
    if (props.queryStringSync && props.queryStringSync.length) {
      // grabbing the property to sync in there
      const propertiesToSync = (
        props.itemDefinitionInstance.isInSearchMode() ?
          getPropertyListForSearchMode(
            props.queryStringSync || [],
            props.itemDefinitionInstance.getStandardCounterpart()
          ) : getPropertyListDefault(props.queryStringSync)
      )

      // using the search params to parse the information there
      const searchParamsParsed = new URLSearchParams(props.location.search);

      // and now we can sync if we find a value
      propertiesToSync.forEach((p) => {
        // check for it
        const valueInQueryString = searchParamsParsed.get(p);
        // we got something
        if (valueInQueryString) {
          // try to synchornize it
          try {
            const valueParsed = JSON.parse(valueInQueryString);
            const property = props.itemDefinitionInstance.getPropertyDefinitionFor(p, true);
            property.setCurrentValue(
              props.forId || null,
              props.forVersion || null,
              valueParsed,
              null,
            );
          } catch {
          }
        }
      });
    }

    if (props.prefills || (props.queryStringSync && props.queryStringSync.length)) {
      // !doNotCleanSearchState && props.itemDefinitionInstance.cleanSearchState(props.forId || null, props.forVersion || null);
      props.itemDefinitionInstance.triggerListeners(
        "change",
        props.forId || null,
        props.forVersion || null,
      );
    }
  }

  public onConnectStatusChange() {
    const isConnected = !this.props.remoteListener.isOffline();
    if (isConnected) {
      if (
        this.state.loadError &&
        this.state.loadError.code === ENDPOINT_ERRORS.CANT_CONNECT &&
        !this.props.doNotAutomaticReloadIfCantConnect
      ) {
        this.loadValue();
      }
      if (
        this.state.searchError &&
        this.state.searchError.code === ENDPOINT_ERRORS.CANT_CONNECT &&
        !this.props.doNotAutomaticReloadSearchIfCantConnect
      ) {
        this.search(this.state.searchOriginalOptions);
      }
    }
  }

  // so now we have mounted, what do we do at the start
  public async componentDidMount() {
    this.isCMounted = true;
    this.mountCbFns.forEach((c) => c());
    this.props.remoteListener.addConnectStatusListener(this.onConnectStatusChange);

    // now we retrieve the externally checked value
    if (this.props.containsExternallyCheckedProperty && this.props.enableExternalChecks) {
      this.setStateToCurrentValueWithExternalChecking(null);
    }

    const listenersSetup = () => {
      const currentSearch = this.state;

      // when we have a search that was done during SSR and was not stored
      // somewherue in our stuff, we don't want to request feedback
      // when we jst loaded the app because then it makes no sense
      // as the information should be up to date
      const shouldRequestFeedback = currentSearch.searchId === "SSR_SEARCH" && !this.props.automaticSearchNoGraceTime ? (
        (new Date()).getTime() - LOAD_TIME > SSR_GRACE_TIME
      ) : true;

      this.searchListenersSetup(
        currentSearch,
        shouldRequestFeedback,
      );
    };

    let searchWasRedone = false;
    if (this.props.automaticSearch && !this.props.automaticSearch.clientDisabled) {
      // the search listener might have triggered during the mount callback,
      // which means this function won't see the new state and won't trigger
      // automatic search so we use this variable to check it
      const searchIdToCheckAgainst = this.changedSearchListenerLastCollectedSearchId ?
        this.changedSearchListenerLastCollectedSearchId.id : this.state.searchId;

      if (
        // no search id at all, not in the state, not on the changed listener, nowhere
        (!searchIdToCheckAgainst) ||
        // search is forced and we didn't load from location
        (this.props.automaticSearchForce && this.state.searchWasRestored !== "FROM_LOCATION") ||
        // cache policies searches that have been resolved by SSR need to be redone
        // this is only relevant during mount of course
        // the reason is that the cache may have changes or not be inline with whatever
        // was calculated from the server side
        // that's the issue with ssrEnabled searches that are also cache
        (searchIdToCheckAgainst === "SSR_SEARCH" && this.props.automaticSearch.cachePolicy !== "none") ||
        (searchIdToCheckAgainst === "SSR_SEARCH" && this.props.automaticSearch.ssrRequestedProperties)
      ) {
        // this variable that is passed into the search is used to set the initial
        // state in case it needs to be saved in the history
        searchWasRedone = true;
        (async () => {
          try {
            this.initialAutomaticNextSearch = true;
            await this.search(this.props.automaticSearch);
          } catch {
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

    if (this.props.onSearchStateLoaded || this.props.onSearchStateChange) {
      const searchState = getSearchStateOf(this.state);
      if (searchState.searchId) {
        this.props.onSearchStateLoaded && this.props.onSearchStateLoaded(searchState);
        this.props.onSearchStateChange && this.props.onSearchStateChange(searchState);
      }
    }

    if (typeof this.props.markForDestructionOnLogout !== "undefined" && this.props.markForDestructionOnLogout !== null) {
      if (this.props.markForDestructionOnLogout) {
        this.markForDestruction(false, false);
      } else {
        this.markForDestruction(false, true);
      }
    }

    if (typeof this.props.markForDestructionOnUnmount !== "undefined" && this.props.markForDestructionOnUnmount !== null) {
      if (this.props.markForDestructionOnUnmount) {
        this.markForDestruction(true, false);
      } else {
        this.markForDestruction(true, true);
      }
    }

    if (window.TESTING && process.env.NODE_ENV === "development") {
      this.mountOrUpdateIdefForTesting();
    }

    // and we attempt to load the current value
    if (!this.props.avoidLoading) {
      await this.loadValue();
    }
    if (this.props.loadStoredState) {
      const loc = getStoredStateLocation(this.props.loadStoredState, this.props.forId, this.props.forVersion);
      await this.loadStoredState(loc);
      // this.setupStoredStateListener(loc);
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
          this.props.slowPolling,
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
      nextProps.children !== this.props.children ||
      nextProps.localeData !== this.props.localeData ||
      nextProps.tokenData.id !== this.props.tokenData.id ||
      nextProps.tokenData.role !== this.props.tokenData.role ||
      nextProps.remoteListener !== this.props.remoteListener ||
      nextProps.markForDestructionOnLogout !== this.props.markForDestructionOnLogout ||
      nextProps.markForDestructionOnUnmount !== this.props.markForDestructionOnUnmount ||
      !equals(nextProps.properties || [], this.props.properties || [], { strict: true }) ||
      !equals(nextProps.includes || [], this.props.includes || [], { strict: true }) ||
      !!nextProps.static !== !!this.props.static ||
      !!nextProps.includePolicies !== !!this.props.includePolicies ||
      !!nextProps.automaticSearchIsOnlyInitial !== !!this.props.automaticSearchIsOnlyInitial ||
      !!nextProps.automaticSearchIsOnlyFallback !== !!this.props.automaticSearchIsOnlyFallback ||
      !equals(nextProps.automaticSearch, this.props.automaticSearch, { strict: true }) ||
      !equals(nextProps.longTermCachingMetadata, this.props.longTermCachingMetadata, { strict: true }) ||
      !equals(nextProps.setters, this.props.setters, { strict: true }) ||
      nextProps.location !== this.props.location ||
      !equals(nextProps.injectedParentContext, this.props.injectedParentContext, { strict: true }) ||
      !equals(nextProps.highlights, this.props.highlights);
  }
  public async componentDidUpdate(
    prevProps: IActualItemProviderProps,
    prevState: IActualItemProviderState,
  ) {
    let currentSearch: IItemSearchStateType = this.state;
    let prevSearchState: IItemSearchStateType = prevState;

    if (
      this.props.onSearchStateChange
    ) {
      const currentStateCleaned = getSearchStateOf(currentSearch as any);
      const prevSearchStateCleaned = getSearchStateOf(prevSearchState as any);

      if (!equals(currentStateCleaned, prevSearchStateCleaned, { strict: true })) {
        this.props.onSearchStateChange(currentStateCleaned);
      }
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
      (
        itemDefinitionWasUpdated ||
        uniqueIDChanged
      ) || (
        this.props.markForDestructionOnLogout !== prevProps.markForDestructionOnLogout
      ) || (
        this.props.markForDestructionOnUnmount !== prevProps.markForDestructionOnUnmount
      )
    ) {
      if (typeof this.props.markForDestructionOnLogout !== "undefined" && this.props.markForDestructionOnLogout !== null) {
        if (this.props.markForDestructionOnLogout) {
          this.markForDestruction(false, false);
        } else {
          this.markForDestruction(false, true);
        }
      }

      if (typeof this.props.markForDestructionOnUnmount !== "undefined" && this.props.markForDestructionOnUnmount !== null) {
        if (this.props.markForDestructionOnUnmount) {
          this.markForDestruction(false, false);
        } else {
          this.markForDestruction(false, true);
        }
      }
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
          this.props.slowPolling,
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
            this.props.forId,
            this.props.forVersion || null,
            this.props.slowPolling,
          );
        }
      }

      // we set the value given we have changed the forId with the new optimization flags
      if (!this.isUnmounted) {
        this.setState({
          itemState: this.getItemState(),
        });
      }

      // and run the external check
      if (this.props.containsExternallyCheckedProperty && this.props.enableExternalChecks) {
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
      itemDefinitionWasUpdated ||
      !equals(prevProps.longTermCachingMetadata, this.props.longTermCachingMetadata, { strict: true })
    ) {
      if (!this.props.avoidLoading) {
        await this.loadValue();
      }
    }

    const currentStoredStateLocation = getStoredStateLocation(prevProps.loadStoredState || null, prevProps.forId || null, prevProps.forVersion || null);
    const nextStoredStateLocation = getStoredStateLocation(this.props.loadStoredState || null, this.props.forId || null, this.props.forVersion || null);

    if (
      !equals(currentStoredStateLocation, nextStoredStateLocation, { strict: true })
    ) {
      await this.loadStoredState(nextStoredStateLocation);
    }

    // no search id for example if the slot changed during
    // an update of forId and forVersion and as a result
    // the search is empty in this slot
    if (!currentSearch.searchId || currentSearch.searchId !== prevSearchState.searchId) {
      if (!currentSearch.searchId) {
        this.removePossibleSearchListeners(prevProps, prevState);
      } else {
        // check for differences that demand a refreshment
        const ownerChanged = currentSearch.searchOwner !== prevSearchState.searchOwner;
        const parentChanged = !equals(currentSearch.searchParent, prevSearchState.searchParent, { strict: true });
        const propertyChanged = !equals(currentSearch.searchCacheUsesProperty, prevSearchState.searchCacheUsesProperty, { strict: true });

        if (ownerChanged || parentChanged || propertyChanged) {
          this.removePossibleSearchListeners(prevProps, prevState);
          // only request feedback if this was a loaded state that came from the state
          this.searchListenersSetup(currentSearch, this.state.searchWasRestored === "FROM_STATE");
        }
      }
    }

    // when get derived made it so that it loaded a new search state because
    // we have a new item definition slot id or anything
    // and we need to invalidate those search results that we got
    const getDerivedTriggeredASearchChange = this.state.searchWasRestored !== "NO" && (
      itemDefinitionWasUpdated || uniqueIDChanged ||
      (
        (
          this.props.location &&
          this.props.location.state &&
          this.props.location.state[this.props.loadSearchFromNavigation] &&
          this.props.location.state[this.props.loadSearchFromNavigation].searchId !== prevSearchState.searchId
        )
      )
    )

    if (
      // if the automatic search is not setup to just initial
      !this.props.automaticSearchIsOnlyInitial &&
      // if automatic search is only fallback there must not be an active search id as well
      (this.props.automaticSearchIsOnlyFallback ? !this.state.searchId : true) &&
      // if there was previously an automatic search
      (
        (
          prevProps.automaticSearch &&
          (
            isSearchUnequal(this.props.automaticSearch, prevProps.automaticSearch) ||
            // these two would cause search results to be dismissed because
            // the fact the token is a key part of the search itself so we would
            // dismiss the search in such a case as the token is different
            // that or the automatic search would be reexecuted
            itemDefinitionWasUpdated ||
            didSomethingThatInvalidatedSetters ||
            didSomethingThatInvalidatedPrefills ||
            prevProps.tokenData.token !== this.props.tokenData.token ||

            // no search id for example if the slot changed during
            // an update of forId and forVersion and as a result
            // the search is empty in this slot
            this.state.searchId === null
          )
        ) ||
        (!prevProps.automaticSearch && this.props.automaticSearch)
      ) && !this.state.searching
    ) {
      // maybe there's no new automatic search
      if (this.props.automaticSearch && !this.props.automaticSearch.clientDisabled) {
        // always perform the search even if there's a state
        if (this.props.automaticSearchForce || this.state.searchId === null) {
          this.search(this.props.automaticSearch);
        } else {
          // so knowing that let's check wether it loaded a search state that is currently active
          // well it must be because this.state.searchId must be something right now
          // so now we can assume getDerived loaded something into the search
          if (getDerivedTriggeredASearchChange) {
            this.props.onSearchStateLoaded && this.props.onSearchStateLoaded(getSearchStateOf(this.state));
          } else {
            // otherwise we automatically search
            this.search(this.props.automaticSearch);
          }
        }
      } else if (!this.props.automaticSearchDoNotAutoDismissDuringChanges) {
        this.dismissSearchResults();
      }
    } else if (getDerivedTriggeredASearchChange && this.state.searchId) {
      this.props.onSearchStateLoaded && this.props.onSearchStateLoaded(getSearchStateOf(this.state));
    }

    // this is a different instance, we consider it dismounted
    if (
      prevProps.mountId !== this.props.mountId
    ) {
      this.runDismountOn(prevProps);
    }

    // expensive but necessary
    if (
      (
        this.props.onStateChange ||
        (
          this.props.storeStateOnChange &&
          // won't use polyfills for storing states as that's just downright dangerous
          CacheWorkerInstance.isSupportedAsWorker
        )
      ) &&
      !equals(this.state.itemState, prevState.itemState, { strict: true })
    ) {
      this.props.onStateChange && this.props.onStateChange(this.state.itemState, prevState.itemState);

      if (this.props.storeStateOnChange) {
        clearTimeout(this.storeStateTimeout);
        this.storeStateTimeout = setTimeout(this.storeStateDelayed, 600);
      }
    }
  }

  private async storeStateDelayed() {
    if (this.props.storeStateOnChange && CacheWorkerInstance.isSupportedAsWorker) {
      const location = getStoredStateLocation(this.props.storeStateOnChange, this.props.forId, this.props.forVersion);
      const serializable = ItemDefinition.getSerializableState(this.state.itemState, null, this.props.storeStateOnChangeApplyEnforced);
      const metadataSource = this.state.itemState &&
        this.state.itemState.rqOriginalFlattenedValue &&
        (this.state.itemState.rqOriginalFlattenedValue as any);
      const stateWasStored = await CacheWorkerInstance.instance.storeState(
        this.props.itemDefinitionQualifiedName,
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
        this.props.onStateStored && this.props.onStateStored(this.state.itemState);
      } else {
        this.props.onStateStoreFailed && this.props.onStateStoreFailed(this.state.itemState);
      }
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
      clearTimeout(this.reloadListenerTimeout);
      this.reloadListenerTimeout = setTimeout(this.loadValue.bind(this, true), 70);
    }
  }
  public changeSearchListener() {
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

    const searchStateComplex = this.props.itemDefinitionInstance.getSearchState(
      this.props.forId || null, this.props.forVersion || null,
    );
    if (searchStateComplex) {
      searchState = searchStateComplex.searchState;
    }

    this.changedSearchListenerLastCollectedSearchId = {
      id: searchState.searchId
    };

    if (this.isUnmounted) {
      return;
    } else if (!this.isCMounted) {
      if (this.mountCbFns.indexOf(this.changeSearchListener) === -1) {
        this.mountCbFns.push(this.changeSearchListener);
      }
      return;
    }

    this.setState(searchState);
  }
  private getItemState(props = this.props) {
    return ActualItemProvider.getItemStateStatic(props);
  }
  public async changeListener(repairCorruption?: boolean) {
    if (this.isUnmounted) {
      return;
    } else if (!this.isCMounted) {
      if (this.mountCbFns.indexOf(this.changeListener) === -1) {
        this.mountCbFns.push(this.changeListener);
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
    if (!this.lastLoadValuePromiseIsResolved) {
      // so let's wait until all that is done and then check
      // that way the slower value is ready and a proper fair comparison can be done
      await this.lastLoadValuePromise;
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
      const appliedValue = this.props.itemDefinitionInstance.getRQAppliedValue(
        this.props.forId || null,
        this.props.forVersion || null,
      );
      if (appliedValue) {
        isNotFound = appliedValue.rawValue === null;

        const { requestFields } = getFieldsAndArgs({
          includeArgs: false,
          includeFields: true,
          includes: this.props.includes || {},
          properties: getPropertyListDefault(this.props.properties),
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
      if (!repairCorruption) {
        // in the past this would be a call for reload listener but now
        // we want to call the repair corruption as this same event
        // just for even more resilliance to errors so that the corruption
        // is checked again and we pass true as the flag in order to ensure
        // that any corruption will be immediately fixed
        clearTimeout(this.repairCorruptionTimeout);
        this.repairCorruptionTimeout = setTimeout(this.changeListener.bind(this, true), 70);
      } else {
        // that is done here
        this.reloadListener();
        return;
      }
    } else {
      clearTimeout(this.repairCorruptionTimeout);
    }

    // we basically just upgrade the state
    !this.isUnmounted && this.setState({
      itemState: this.getItemState(),
      // also search might do this, and it's true anyway
      notFound: isNotFound,
    });
  }

  /**
   * This listener triggers on load and the search
   * loader triggers it
   */
  public async loadListener() {
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

    // already loaded this can happen if during a search it triggers load
    // but there's another component around holding the same value
    if (this.state.loaded) {
      return;
    }

    this.props.onWillLoad && this.props.onWillLoad();

    const forId = this.props.forId || null;
    const forVersion = this.props.forVersion || null;

    const appliedRQValue = this.props.itemDefinitionInstance.getRQAppliedValue(
      forId, forVersion,
    );
    if (appliedRQValue) {
      let cached: boolean = false;
      // we need to cache what we have been just specified
      if (
        // we do not use the polyfill to save get values
        CacheWorkerInstance.isSupportedAsWorker &&
        this.props.longTermCaching
      ) {
        const qualifiedName = this.props.itemDefinitionInstance.getQualifiedPathName();
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

      this.props.onLoad && this.props.onLoad(completedValue);
    }

    // we basically just upgrade the state
    this.setState({
      // we do this because eg. the search relies on triggering the load listener
      // no notify that things aren't loading anymore
      loading: false,
      loaded: true,
    });
  }
  public async loadStateFromFile(state: File | Blob, specificProperties?: string[], specificIncludes?: { [includeId: string]: string[] }) {
    this.loadStateFromFileAt(state, this.props.forId || null, this.props.forVersion || null, specificProperties, specificIncludes);
  }
  public async loadStateFromFileAt(
    state: File | Blob,
    id: string,
    version?: string,
    specificProperties?: string[],
    specificIncludes?: { [includeId: string]: string[] },
  ) {
    await this.props.itemDefinitionInstance.applyStateFromPackage(
      id || null,
      version || null,
      state,
      specificProperties,
      specificIncludes,
    );
    this.props.itemDefinitionInstance.triggerListeners(
      "change",
      id || null,
      version || null,
    );
  }
  public async downloadState(specificProperties?: string[], specificIncludes?: { [includeId: string]: string[] }): Promise<Blob> {
    return this.downloadStateAt(this.props.forId || null, this.props.forVersion || null, specificProperties, specificIncludes)
  }
  public async downloadStateAt(
    id: string,
    version: string,
    specificProperties?: string[],
    specificIncludes?: { [includeId: string]: string[] },
  ): Promise<Blob> {
    if (!this.lastLoadValuePromiseIsResolved) {
      await this.lastLoadValuePromise;
    }
    return this.props.itemDefinitionInstance.getStatePackage(
      id || null,
      version || null,
      specificProperties,
      specificIncludes,
      true,
    );
  }
  // public setupStoredStateListener(qPath: string, location: IStoredStateLocation) {
  //   if (CacheWorkerInstance.isSupportedAsWorker) {
  //     CacheWorkerInstance.instance.addEventListenerToStateChange(qPath, location.id, location.version, this.loadStoredStateListener);
  //   }
  // }
  // public removeStoredStateListener(qPath: string, location: IStoredStateLocation) {
  //   if (CacheWorkerInstance.isSupportedAsWorker) {
  //     CacheWorkerInstance.instance.removeEventListenerToStateChange(qPath, location.id, location.version, this.loadStoredStateListener);
  //   }
  // }
  // public loadStoredStateListener(id: string, version: string, value: any, metadata: {overwriteLastModified: string}) {
  //   if (value) {

  //   }
  // }
  public async loadStoredState(location: IStoredStateLocation) {
    // no polyfills for loaded states
    if (CacheWorkerInstance.isSupportedAsWorker && location) {
      const [storedState, metadata] = await CacheWorkerInstance.instance.retrieveState(
        this.props.itemDefinitionQualifiedName,
        location.id,
        location.version,
      );

      if (storedState) {
        this.props.itemDefinitionInstance.applyState(
          this.props.forId || null,
          this.props.forVersion || null,
          storedState,
        );
        this.props.itemDefinitionInstance.triggerListeners(
          "change",
          this.props.forId || null,
          this.props.forVersion || null,
          this.changeListener,
        );
        this.setState({
          itemState: this.getItemState(),
        }, () => {
          this.props.onStateLoadedFromStore && this.props.onStateLoadedFromStore(storedState, metadata, {
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
  public async loadValue(denyCaches?: boolean): Promise<IActionResponseWithValue> {
    const forId = this.props.forId;
    const forVersion = this.props.forVersion || null;

    this.lastLoadingForId = forId;
    this.lastLoadingForVersion = forVersion;

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
      properties: getPropertyListDefault(this.props.properties),
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
      !denyCaches &&
      !this.props.doNotUseMemoryCache &&
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

    this.props.onWillLoad && this.props.onWillLoad();

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

    const qualifiedName = this.props.itemDefinitionQualifiedName;

    let currentMetadata: ICacheMetadataMatchType;
    let denyMemoryCache: boolean = false;
    let denyCacheWorker: boolean = false;
    if (
      !denyCaches &&
      !this.props.doNotUseMemoryCache &&
      this.props.longTermCachingMetadata &&
      // no polyfilling for loading value and related meatadat
      CacheWorkerInstance.isSupportedAsWorker
    ) {
      currentMetadata = await CacheWorkerInstance.instance.readMetadata(
        PREFIX_GET + qualifiedName,
        forId,
        forVersion || null,
      );

      if (!equals(this.props.longTermCachingMetadata, currentMetadata) && this.props.longTermCachingMetadataMismatchAction) {
        // we deny the memory cache because we are now unsure of whether
        // the value held in memory is valid due to the metadata
        // as this value might have come from the cache when it was loaded
        // with such unmatching metadata
        denyMemoryCache = true;
        denyCacheWorker = true;
      }
    }

    if (!denyCaches && !denyMemoryCache && !this.props.doNotUseMemoryCache) {
      // Prevent loading at all if value currently available and memoryCached
      const appliedRQValue = this.props.itemDefinitionInstance.getRQAppliedValue(
        forId, forVersion,
      );
      if (
        appliedRQValue &&
        requestFieldsAreContained(requestFields, appliedRQValue.requestFields)
      ) {
        if (window.TESTING && process.env.NODE_ENV === "development") {
          this.mountOrUpdateIdefForTesting(true);
        }

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
        let cached: boolean = false;
        if (
          CacheWorkerInstance.isSupportedAsWorker &&
          this.props.longTermCaching &&
          !this.props.searchContext
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

        return this.loadValueCompleted({
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

    if (this.isUnmounted) {
      return;
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
      returnWorkerCachedValues: !denyCaches && !denyCacheWorker && !this.props.doNotUseCache,
      itemDefinition: this.props.itemDefinitionInstance,
      id: forId,
      version: forVersion,
      token: this.props.tokenData.token,
      language: this.props.localeData.language,
      cacheStore: this.props.longTermCaching,
      cacheStoreMetadata: this.props.longTermCachingMetadata,
      cacheStoreMetadataMismatchAction: this.props.longTermCachingMetadataMismatchAction,
      waitAndMerge: this.props.waitAndMerge,
      currentKnownMetadata: currentMetadata,
    }, {
      remoteListener: this.props.remoteListener,
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
      // we don't trigger our own listener
      this.props.itemDefinitionInstance.triggerListeners(
        "change", forId, forVersion, this.changeListener,
      );

      // we will do it by hand instead, once we set loaded to true

      // and if we have an externally checked property we do the external check
      // we need to ensure that our current item definition instance hasn't changed
      // its for id and for version while we were loading
      if (
        containsExternallyCheckedProperty &&
        this.props.enableExternalChecks &&
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
      cached,
      id: forId,
      version: forVersion,
    });
  }
  public loadValueCompleted(value: ILoadCompletedPayload): IActionResponseWithValue {
    // basically if it's unmounted, or what we were updating for does not match
    // what we are supposed to be updating for, this basically means load value got called once
    // again before the previous value managed to load, this can happen, when switching forId and/or
    // for version very rapidly
    const shouldNotUpdateState =
      this.isUnmounted ||
      value.id !== this.lastLoadingForId ||
      value.version !== this.lastLoadingForVersion;

    // return immediately
    if (shouldNotUpdateState) {
      this.lastLoadValuePromiseIsResolved = true;
      this.lastLoadValuePromiseResolve();

      const result = {
        value: value.value,
        error: value.error,
        cached: value.cached,
        id: value.id,
        version: value.version,
      };
      this.props.onLoad && this.props.onLoad(result);
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
        itemState: this.getItemState(),
      });

      // load later when connection is available
      // unnecessary this is done already by the connection state listener
      // using the load error
      // if (
      //   !this.isUnmounted &&
      //   value.error.code === ENDPOINT_ERRORS.CANT_CONNECT &&
      //   !this.props.doNotAutomaticReloadIfCantConnect
      // ) {
      //   this.props.remoteListener.addOnConnectOnceListener(this.loadValue);
      // }
      // otherwise if there's no value, it means the item is not found
    } else if (!value.value) {
      // we mark it as so, it is not found
      !this.isUnmounted && this.setState({
        itemState: this.getItemState(),
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
        itemState: this.getItemState(),
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
      cached: value.cached,
      id: value.id,
      version: value.version,
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
        ) : getPropertyListDefault(this.props.properties),
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

    if (this.props.containsExternallyCheckedProperty && this.props.enableExternalChecks) {
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
    if (this.props.automaticSearch && !this.props.automaticSearch.clientDisabled && !this.props.automaticSearchIsOnlyInitial) {
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
  private onPropertyChangeOrRestoreQsSync(property: PropertyDefinition) {
    // syncing from the query string in a cheap way
    if (this.props.queryStringSync && this.props.queryStringSync.length) {
      // grabbing the property to sync in there
      const propertiesToSync = (
        this.props.itemDefinitionInstance.isInSearchMode() ?
          getPropertyListForSearchMode(
            this.props.queryStringSync || [],
            this.props.itemDefinitionInstance.getStandardCounterpart()
          ) : getPropertyListDefault(this.props.queryStringSync)
      )


      const idToSync = property.getId()
      const isToSync = propertiesToSync.find((p) => p === idToSync);

      if (isToSync) {
        const value = property.getCurrentValue(
          this.props.forId || null,
          this.props.forVersion || null,
        );
        if (this.consumableQsState) {
          this.consumableQsState[idToSync] = value === null ? null : JSON.stringify(value);
        } else {
          this.consumableQsState = {
            [idToSync]: value === null ? null : JSON.stringify(value)
          };
          this.consumeQsStateTimeout = setTimeout(() => {
            setHistoryQSState(this.props.location, this.consumableQsState, this.props.queryStringSyncReplace);
            this.consumableQsState = null;
            this.consumeQsStateTimeout = null;
          }, 200);
        }
      }
    }
  }
  public onPropertyRestore(
    property: PropertyDefinition | string | IPropertyCoreProps,
  ) {
    if (this.state.loading) {
      return;
    }

    const actualProperty = property instanceof PropertyDefinition ?
      property : this.props.itemDefinitionInstance.getPropertyDefinitionFor(resolveCoreProp(property), true);

    actualProperty.restoreValueFor(
      this.props.forId || null,
      this.props.forVersion || null,
    );
    // this.props.itemDefinitionInstance.cleanSearchState(this.props.forId || null, this.props.forVersion || null);
    this.onPropertyChangeOrRestoreQsSync(actualProperty);
    this.onPropertyChangeOrRestoreFinal();
  }
  public async onPropertyChange(
    property: PropertyDefinition | string | IPropertyCoreProps,
    value: PropertyDefinitionSupportedType,
    internalValue: any,
  ) {
    if (this.state.loading) {
      // loading will overwrite any possible property changes
      // so we await for it to end
      await this.lastLoadValuePromise;
    }

    const actualProperty = property instanceof PropertyDefinition ?
      property : this.props.itemDefinitionInstance.getPropertyDefinitionFor(resolveCoreProp(property), true);

    // we simply set the current value in the property
    actualProperty.setCurrentValue(
      this.props.forId || null,
      this.props.forVersion || null,
      value,
      internalValue,
    );
    // this.props.itemDefinitionInstance.cleanSearchState(this.props.forId || null, this.props.forVersion || null);
    this.onPropertyChangeOrRestoreQsSync(actualProperty);
    this.onPropertyChangeOrRestoreFinal();
  }
  public onPropertyEnforceOrClearFinal(
    givenForId: string,
    givenForVersion: string,
    internal?: boolean,
  ) {
    this.props.itemDefinitionInstance.triggerListeners(
      "change",
      givenForId || null,
      givenForVersion || null,
    );
    if (
      !internal &&
      this.props.automaticSearch &&
      !this.props.automaticSearch.clientDisabled &&
      !this.props.automaticSearchIsOnlyInitial &&
      this.isCMounted
    ) {
      this.search(this.props.automaticSearch);
    }
  }
  public onPropertyEnforce(
    property: PropertyDefinition | string | IPropertyCoreProps,
    value: PropertyDefinitionSupportedType,
    givenForId: string,
    givenForVersion: string,
    internal?: boolean,
    // doNotCleanSearchState?: boolean,
  ) {
    const actualProperty = property instanceof PropertyDefinition ?
      property : this.props.itemDefinitionInstance.getPropertyDefinitionFor(resolveCoreProp(property), true);

    // this function is basically run by the setter
    // since they might be out of sync that's why the id is passed
    // the setter enforces values
    actualProperty.setSuperEnforced(givenForId || null, givenForVersion || null, value, this);
    // !doNotCleanSearchState && this.props.itemDefinitionInstance.cleanSearchState(this.props.forId || null, this.props.forVersion || null);
    this.onPropertyEnforceOrClearFinal(givenForId, givenForVersion, internal);
  }
  public onPropertyClearEnforce(
    property: PropertyDefinition | string | IPropertyCoreProps,
    givenForId: string,
    givenForVersion: string,
    internal?: boolean,
  ) {
    const actualProperty = property instanceof PropertyDefinition ?
      property : this.props.itemDefinitionInstance.getPropertyDefinitionFor(resolveCoreProp(property), true);
    // same but removes the enforcement
    actualProperty.clearSuperEnforced(givenForId || null, givenForVersion || null, this);
    // this.props.itemDefinitionInstance.cleanSearchState(this.props.forId || null, this.props.forVersion || null);
    this.onPropertyEnforceOrClearFinal(givenForId, givenForVersion, internal);
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
          props.itemDefinitionInstance.cleanSearchState(props.forId || null, props.forVersion || null);
          props.itemDefinitionInstance.triggerListeners("search-change", props.forId || null, props.forVersion || null);
        }
      } else {
        this.cleanWithProps(props, props.cleanOnDismount, "success", false);
      }
    }

    // executing destruction marker for self
    if (props.markForDestructionOnUnmount && props.forId) {
      const qualifiedName = this.props.itemDefinitionInstance.getQualifiedPathName();
      (async () => {
        const status = await CacheWorkerInstance.instance.deleteCachedValue(PREFIX_GET + qualifiedName, props.forId, props.forVersion || null);
        if (status) {
          // unmark destruction
          this.markForDestruction(true, true, props);
        }
      })();
    }

    if (this.internalSearchDestructionMarkers && this.internalSearchDestructionMarkers.length) {
      // executing destruction markers for search
      this.internalSearchDestructionMarkers.forEach(async (m, index) => {
        const status = await CacheWorkerInstance.instance.deleteCachedSearch(
          PREFIX_SEARCH + m[1], //qualified path name
          m[0] as any, // by-
          m[2], // created by
          m[3], // parent
          m[4], // property
        );

        if (status) {
          // remove it from the destruction marker
          this.markSearchForDestruction(m[0] as any, m[1], m[2], m[3], m[4], true, true);
        }
      });
    }
  }
  public componentWillUnmount() {
    this.isUnmounted = true;
    this.releaseCleanupBlock();
    this.unSetupListeners();
    this.removeSetters();
    this.runDismountOn();
    this.props.remoteListener.removeConnectStatusListener(this.onConnectStatusChange);

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
    if (this.props.containsExternallyCheckedProperty && this.props.enableExternalChecks) {
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
        const currentAppliedValue = this.props.itemDefinitionInstance.getRQAppliedValue(
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
      // ignore if it is within an override
      if (options.includeOverrides && options.includeOverrides.find((override) => override.id === iId)) {
        return true;
      }

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
          const currentAppliedValue = this.props.itemDefinitionInstance.getRQAppliedValue(
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
        .find((p: IPropertyDefinitionState<PropertyDefinitionSupportedType>) => p.propertyId === propertyId);
      return propertyInPolicy.valid;
    });
  }

  public giveEmulatedInvalidError(
    stateApplied: string,
    withIdVersion: boolean | [string, string],
    withSearchResults: boolean,
    errMessageOverride?: string,
    errorOverride?: string,
  ): IActionSubmitResponse | IActionResponseWithValue | IActionResponseWithSearchResults {

    if (isDevelopment) {
      console.warn(
        errMessageOverride ? "Action refused due to: " + errMessageOverride : "Action refused due to invalid partial/total state at",
        this.props.itemDefinitionInstance.getStateNoExternalChecking(this.props.forId || null, this.props.forVersion || null),
      );
    }

    const emulatedError: EndpointErrorType = {
      message: errMessageOverride || "Submit refused due to invalid information in form fields",
      code: errorOverride || ENDPOINT_ERRORS.INVALID_DATA_SUBMIT_REFUSED,
    };
    if (!this.isUnmounted) {
      this.setState({
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

    const forId = options.deleteForId || this.props.forId;
    const forVersion = options.deleteForId ? (options.deleteForVersion || null) : (options.deleteForVersion || this.props.forVersion || null);

    const {
      argumentsForQuery,
    } = getFieldsAndArgs({
      includeArgs: false,
      includeFields: true,
      uniteFieldsWithAppliedValue: true,
      includesForArgs: {},
      propertiesForArgs: [],
      policiesForArgs: options.policies || [],
      itemDefinitionInstance: this.props.itemDefinitionInstance,
      forId,
      forVersion,
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
      id: forId,
      version: forVersion,
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
      this.props.itemDefinitionInstance.applyValue(
        forId,
        forVersion,
        null,
        false,
        null,
        true,
      );
      this.props.itemDefinitionInstance.cleanValueFor(forId, forVersion);
      if (!this.isUnmounted) {
        this.setState({
          deleteError: null,
          deleting: false,
          deleted: true,
          pokedElements: {
            properties: [],
            includes: {},
            policies: (options.policies || []),
          },
        });

        if (forId === (this.props.forId || null) && forVersion === (this.props.forVersion || null)) {
          this.setState({
            notFound: true,
          });
        }
      }
      this.cleanWithProps(this.props, options, "fail");
      this.props.itemDefinitionInstance.triggerListeners("change", forId, forVersion);
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
      // cleaning may be blocked but we don't want it to be blocked by us
      let needsAddBlockCleanAgain = false;
      if (props.itemDefinitionInstance.hasBlockCleanFor(props.forId || null, props.forVersion || null, this.blockIdClean)) {
        needsAddBlockCleanAgain = true;
        props.itemDefinitionInstance.removeBlockCleanFor(props.forId || null, props.forVersion || null, this.blockIdClean);
      }

      // now we clean
      props.itemDefinitionInstance.cleanValueFor(props.forId || null, props.forVersion || null);

      // and reblock it in case
      if (needsAddBlockCleanAgain) {
        props.itemDefinitionInstance.addBlockCleanFor(props.forId || null, props.forVersion || null, this.blockIdClean);
      }

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
      props.itemDefinitionInstance.cleanSearchState(props.forId || null, props.forVersion || null);
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
  public async submit(originalOptions: IActionSubmitOptions): Promise<IActionSubmitResponse> {
    if ((originalOptions.blockUntil || originalOptions.blockReason) && !originalOptions.blockStatus) {
      throw new Error("blockUntil nor blockReason can be set if blockStatus is not true");
    }

    // the reason we might need to wait for load is because unless we have avoided
    // loading the applied value matters in order to unite the applied fields, however
    // if we are avoiding loading this doesn't really matter as it's truly loading and somehow
    // the submit button was pressed really fast
    const waitingForLoad = this.props.forId && !this.state.loaded && !this.props.avoidLoading;
    if (waitingForLoad) {
      if (this.state.loadError) {
        console.warn(
          "Attempted to submit with a loaded value in an error state, the result is that the value is not loaded " +
          "in memory, this is not an error, it simply means that the value was not considered for the update",
        );
      } else {
        console.warn(
          "Attempted to submit so fast that the value was not yet loaded in memory, this is not an error, " +
          "if this was an user triggered action, then the app is sluggish, if otherwise you submit manually eg. an automatic action " +
          "that triggers faster than a human can begin to react then it's not a problem, overall the app was loading a value for " +
          this.props.itemDefinitionInstance.getName() + " and the submit happened before such NEW value could be loaded, if your submit " +
          "is tied to a condition it could have been resolved with the old data if it held a partial value",
        );
      }
      await this.lastLoadValuePromise;
    }

    // if we are already submitting
    let options = originalOptions;

    const cancelledResponse = {
      id: originalOptions.submitForId !== "undefined" ? options.submitForId : this.props.forId,
      version: originalOptions.submitForVersion !== "undefined" ? options.submitForVersion : this.props.forVersion,
      cancelled: true,
      deletedState: false,
      storedState: false,
      error: null as any,
    };

    if (this.state.submitting || this.activeSubmitPromise) {
      if (originalOptions.pileSubmit) {
        const id = uuid.v4();
        this.activeSubmitPromiseAwaiter = id;

        const lastResponse = await this.activeSubmitPromise;

        // another pile element has overtaken us
        // we must not execute, we have been cancelled
        if (this.activeSubmitPromiseAwaiter !== id) {
          // cancelled
          return cancelledResponse;
        }

        this.activeSubmitPromiseAwaiter = null;

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
    this.activeSubmitPromise = new Promise((resolve, reject) => {
      activeSubmitPromiseResolve = resolve;
      activeSubmitPromiseReject = reject;
    });

    const isValid = this.checkItemStateValidity(options);
    const pokedElements = {
      properties: options.properties,
      includes: options.includes || {},
      policies: options.policies || [],
    }

    const submitForId = typeof options.submitForId !== "undefined" ? options.submitForId : this.props.forId;
    const submitForVersion = typeof options.submitForVersion !== "undefined" ? options.submitForVersion : this.props.forVersion;

    const determinedActionIsEdit = options.action ?
      options.action === "edit" :
      (submitForId && submitForId === (this.props.forId || null) && !this.state.notFound);

    // if it's invalid let's return the emulated error
    if (!isValid) {
      if (!this.isUnmounted) {
        this.setState({
          pokedElements,
        });
      }
      this.cleanWithProps(this.props, options, "fail");

      const returnValue = this.giveEmulatedInvalidError(
        "submitError",
        determinedActionIsEdit ? [submitForId || null, submitForVersion || null] : true,
        false,
      ) as IActionSubmitResponse;
      this.activeSubmitPromise = null;
      activeSubmitPromiseResolve({ response: returnValue, options });

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
      try {
        const result = await options.beforeSubmit();
        if (!result) {
          this.activeSubmitPromise = null;
          activeSubmitPromiseResolve({ response: cancelledResponse, options });
          return cancelledResponse;
        }
      } catch (err) {
        this.activeSubmitPromise = null;
        activeSubmitPromiseReject(err);
        throw err;
      }
    }

    const root = this.props.itemDefinitionInstance.getParentModule().getParentRoot();

    const itemDefinitionToSubmitFor = options.submitForItem ?
      root.registry[options.submitForItem] as ItemDefinition :
      this.props.itemDefinitionInstance;

    if (!itemDefinitionToSubmitFor) {
      const err = new Error("Could not determine the item definition to submit for, " + options.submitForItem);
      this.activeSubmitPromise = null;
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
      includes: itemDefinitionToSubmitFor !== this.props.itemDefinitionInstance ? {} : (this.props.includes || {}),
      properties: itemDefinitionToSubmitFor !== this.props.itemDefinitionInstance ? [] : getPropertyListDefault(this.props.properties),
      includesForArgs: options.includes || {},
      propertiesForArgs: options.properties,
      policiesForArgs: options.policies || [],
      itemDefinitionInstance: itemDefinitionToSubmitFor,
      forId: this.props.forId || null,
      forVersion: this.props.forVersion || null,
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
        this.cleanWithProps(this.props, options, "success");
        this.activeSubmitPromise = null;
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

      this.cleanWithProps(this.props, options, "fail");

      const returnValue = this.giveEmulatedInvalidError(
        "submitError",
        determinedActionIsEdit ? [submitForId || null, submitForVersion || null] : true,
        false,
        "Nothing to update",
        ENDPOINT_ERRORS.NOTHING_TO_UPDATE,
      ) as IActionSubmitResponse;
      this.activeSubmitPromise = null;
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
    if (!this.isUnmounted) {
      this.setState({
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
        itemDefinitionToSubmitFor !== this.props.itemDefinitionInstance ||
        submitForId !== this.props.forId;
      if (submitTargetIsDifferent) {
        // if we are submitting to edit to a different target to our own
        // basically copying during an edit action we need to do the same we do
        // in creating new values via copying
        const appliedValue = this.props.itemDefinitionInstance.getRQAppliedValue(
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
          await reprocessQueryArgumentsForFiles(
            argumentsForQuery,
            argumentsFoundFilePaths,
            originalContainerIdOfContent,
            this.props.itemDefinitionInstance,
            this.props.config,
            this.props.forId || null,
            this.props.forVersion || null,
          );
        }
      }

      const totalValues = await runEditQueryFor({
        args: argumentsForQuery,
        fields: requestFields,
        itemDefinition: itemDefinitionToSubmitFor,
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
      const appliedValue = this.props.itemDefinitionInstance.getRQAppliedValue(
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
        await reprocessQueryArgumentsForFiles(
          argumentsForQuery,
          argumentsFoundFilePaths,
          originalContainerIdOfContent,
          this.props.itemDefinitionInstance,
          this.props.config,
          this.props.forId || null,
          this.props.forVersion || null,
        );
      }

      // now we can call the add query after all the files have been processed
      const totalValues = await runAddQueryFor({
        args: argumentsForQuery,
        fields: requestFields,
        itemDefinition: itemDefinitionToSubmitFor,
        token: this.props.tokenData.token,
        language: options.languageOverride || this.props.localeData.language,
        listenerUUID: this.props.remoteListener.getUUID(),
        cacheStore: this.props.longTermCaching,
        forId: submitForId || null,
        forVersion: submitForVersion || null,
        waitAndMerge: options.waitAndMerge,
        containerId,
        progresser: options.progresser,
      }, {
        remoteListener: this.props.remoteListener,
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
        const state = this.props.itemDefinitionInstance.getStateNoExternalChecking(
          this.props.forId || null,
          this.props.forVersion || null,
        );
        const appliedValue = this.props.itemDefinitionInstance.getRQAppliedValue(
          this.props.forId || null,
          this.props.forVersion || null,
        );
        const serializable = ItemDefinition.getSerializableState(state, options.propertyOverrides, options.storeStateIfCantConnectApplyEnforced);
        const storingLocation = getStoredStateLocation(options.storeStateIfCantConnect, this.props.forId, this.props.forVersion);
        const metadataSource = appliedValue &&
          appliedValue.flattenedValue as any;
        storedState = await CacheWorkerInstance.instance.storeState(
          // eh its the same as itemDefinitionToRetrieveDataFrom
          this.props.itemDefinitionQualifiedName,
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
          this.props.onStateStored && this.props.onStateStored(state);
        } else {
          this.props.onStateStoreFailed && this.props.onStateStoreFailed(state);
        }
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
        options.clearStoredStateIfSubmitted &&
        // no polyfilling for state based stuff
        CacheWorkerInstance.isSupportedAsWorker
      ) {
        const storedLocation = getStoredStateLocation(options.clearStoredStateIfSubmitted, this.props.forId, this.props.forVersion);
        deletedState = await CacheWorkerInstance.instance.deleteState(
          // eh its the same itemDefinitionToRetrieveDataFrom
          this.props.itemDefinitionQualifiedName,
          storedLocation.id,
          storedLocation.version,
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
      itemDefinitionToSubmitFor.applyValue(
        recievedId,
        receivedVersion,
        value,
        false,
        getQueryFields,
        true,
      );

      const triggeredAnUpdate = this.cleanWithProps(
        this.props,
        options,
        "success",
        // we avoid triggering an update if it's not the same
        // because it will use the this.props.itemDefinitionInstance
        itemDefinitionToSubmitFor !== this.props.itemDefinitionInstance,
      );
      if (!triggeredAnUpdate) {
        // we ensure this comes here if the submit for is not the same
        // but also clean with props might not have triggered an update itself
        itemDefinitionToSubmitFor.triggerListeners("change", recievedId || null, receivedVersion || null);

        // clean will props may have triggered the change listeners, but if there's a difference
        // between what we have cleaned and applied we want to trigger these listeners again for the
        // received value
      } else if (this.props.forId !== recievedId && (this.props.forVersion || null) !== (receivedVersion || null)) {
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
    this.props.onSubmit && this.props.onSubmit(result);

    this.activeSubmitPromise = null;
    activeSubmitPromiseResolve({ response: result, options });

    return result;
  }

  private searchListenersSetup(
    state: IItemSearchStateType,
    requestFeedbackToo?: boolean
  ) {
    if (!state.searchId) {
      return;
    }

    if (state.searchListenPolicy === "none") {
      if (requestFeedbackToo) {
        this.searchFeedback(state);
      }

      return;
    }

    const standardCounterpart = this.props.itemDefinitionInstance.getStandardCounterpart();

    const standardCounterpartQualifiedName = (standardCounterpart.isExtensionsInstance() ?
      standardCounterpart.getParentModule().getQualifiedPathName() :
      standardCounterpart.getQualifiedPathName());
    if (state.searchListenPolicy === "by-owner") {
      this.props.remoteListener.addOwnedSearchListenerFor(
        standardCounterpartQualifiedName,
        state.searchOwner,
        state.searchLastModified,
        this.onSearchReload,
        state.searchCachePolicy !== "none",
        state.searchListenSlowPolling,
      );
    } else if (state.searchListenPolicy === "by-parent") {
      this.props.remoteListener.addParentedSearchListenerFor(
        standardCounterpartQualifiedName,
        state.searchParent[0],//.itemDefinition.getQualifiedPathName(),
        state.searchParent[1],//.id,
        state.searchParent[2] || null,
        state.searchLastModified,
        this.onSearchReload,
        state.searchCachePolicy !== "none",
        state.searchListenSlowPolling,
      );
    } else if (state.searchListenPolicy === "by-owner-and-parent") {
      this.props.remoteListener.addOwnedParentedSearchListenerFor(
        standardCounterpartQualifiedName,
        state.searchOwner,
        state.searchParent[0],//.itemDefinition.getQualifiedPathName(),
        state.searchParent[1],//.id,
        state.searchParent[2] || null,
        state.searchLastModified,
        this.onSearchReload,
        state.searchCachePolicy !== "none",
        state.searchListenSlowPolling,
      );
    } else if (state.searchListenPolicy === "by-property") {
      this.props.remoteListener.addPropertySearchListenerFor(
        standardCounterpartQualifiedName,
        state.searchCacheUsesProperty[0],
        state.searchCacheUsesProperty[1],
        state.searchLastModified,
        this.onSearchReload,
        state.searchCachePolicy !== "none",
        state.searchListenSlowPolling,
      );
    }

    if (requestFeedbackToo) {
      this.searchFeedback(state);
    }
  }
  private searchFeedback(
    state: IItemSearchStateType,
  ) {
    const standardCounterpart = this.props.itemDefinitionInstance.getStandardCounterpart();
    const standardCounterpartQualifiedName = (standardCounterpart.isExtensionsInstance() ?
      standardCounterpart.getParentModule().getQualifiedPathName() :
      standardCounterpart.getQualifiedPathName());

    if (state.searchListenPolicy === "by-owner" || state.searchCachePolicy === "by-owner") {
      this.props.remoteListener.requestOwnedSearchFeedbackFor({
        qualifiedPathName: standardCounterpartQualifiedName,
        createdBy: state.searchOwner,
        lastModified: state.searchLastModified,
      });
    }

    if (state.searchListenPolicy === "by-owner-and-parent" || state.searchCachePolicy === "by-owner-and-parent") {
      this.props.remoteListener.requestOwnedParentedSearchFeedbackFor({
        createdBy: state.searchOwner,
        qualifiedPathName: standardCounterpartQualifiedName,
        parentType: state.searchParent[0],
        parentId: state.searchParent[1],
        parentVersion: state.searchParent[2],
        lastModified: state.searchLastModified,
      });
    }

    if (state.searchListenPolicy === "by-parent" || state.searchCachePolicy === "by-parent") {
      this.props.remoteListener.requestParentedSearchFeedbackFor({
        qualifiedPathName: standardCounterpartQualifiedName,
        parentType: state.searchParent[0],
        parentId: state.searchParent[1],
        parentVersion: state.searchParent[2],
        lastModified: state.searchLastModified,
      });
    }

    if (state.searchListenPolicy === "by-property" || state.searchCachePolicy === "by-property") {
      this.props.remoteListener.requestPropertySearchFeedbackFor({
        qualifiedPathName: standardCounterpartQualifiedName,
        propertyId: state.searchCacheUsesProperty[0],
        propertyValue: state.searchCacheUsesProperty[1],
        lastModified: state.searchLastModified,
      });
    }
  }
  public async search(
    originalOptions: IActionSearchOptions,
  ): Promise<IActionResponseWithSearchResults> {
    if (!originalOptions || originalOptions.clientDisabled) {
      return;
    }

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

    if (this.state.searching || this.activeSearchPromise) {
      if (originalOptions.pileSearch) {
        const id = uuid.v4();
        this.activeSearchPromiseAwaiter = id;

        const lastResponse = await this.activeSearchPromise;

        // another pile element has overtaken us
        // we must not execute, we have been cancelled
        if (this.activeSearchPromiseAwaiter !== id) {
          // cancelled
          return cancelledResponse;
        }

        this.activeSubmitPromiseAwaiter = null;

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
    const standardCounterpart = this.props.itemDefinitionInstance.getStandardCounterpart();
    const standardCounterpartQualifiedName = (standardCounterpart.isExtensionsInstance() ?
      standardCounterpart.getParentModule().getQualifiedPathName() :
      standardCounterpart.getQualifiedPathName());
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
      this.props.onWillSearch && this.props.onWillSearch();
      this.props.onSearch && this.props.onSearch(result);

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
    if ((options.cachePolicy === "by-parent" || options.cachePolicy === "by-owner-and-parent") && (!options.parentedBy || !options.parentedBy.id)) {
      throw new Error("A by owner cache policy requires parentedBy option to be set with a specific id");
    } else if (options.parentedBy && options.parentedBy.id) {
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
    }

    this.props.onWillSearch && this.props.onWillSearch();

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
      itemDefinitionInstance: this.props.itemDefinitionInstance,
      forId: this.props.forId || null,
      forVersion: this.props.forVersion || null,
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

    if (listenPolicy !== this.state.searchListenPolicy) {
      // the listener is bad altogether
      this.removePossibleSearchListeners();
    } else {
      if (listenPolicy.includes("owner")) {
        if (options.createdBy !== this.state.searchOwner) {
          // this search listener is bad because the search
          // owner has changed, and the previously registered listener
          // if any does not match the owner, remember the search owner is the created by
          // value, and we are now redoing the search, and we might have a search listener
          // registered already for this search if that is the case
          this.removePossibleSearchListeners();
        }
      }

      if (listenPolicy.includes("parent")) {
        // we basically do the exact same here, same logic
        if (!equals(searchParent, this.state.searchParent, { strict: true })) {
          // this search listener is bad because the search
          // parent has changed, and the previously registered listener
          // if any does not match the owner
          this.removePossibleSearchListeners();
        }
      }

      if (listenPolicy.includes("property")) {
        if (!equals(searchCacheUsesProperty, this.state.searchCacheUsesProperty, { strict: true })) {
          this.removePossibleSearchListeners();
        }
      }
    }

    if (
      options.cachePolicy &&
      typeof options.markForDestructionOnLogout !== "undefined" &&
      options.markForDestructionOnLogout !== null
    ) {
      if (options.cachePolicy === "by-owner") {
        this.markSearchForDestruction(
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
        this.markSearchForDestruction(
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
        this.markSearchForDestruction(
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
        this.markSearchForDestruction(
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
        this.installInternalSearchDestructionMarker([
          options.cachePolicy,
          standardCounterpartQualifiedName,
          options.createdBy,
          null,
          null,
        ], !options.markForDestructionOnUnmount);
        this.markSearchForDestruction(
          options.cachePolicy,
          standardCounterpartQualifiedName,
          options.createdBy,
          null,
          null,
          true,
          !options.markForDestructionOnUnmount,
        );
      } else if (options.cachePolicy === "by-parent") {
        this.installInternalSearchDestructionMarker([
          options.cachePolicy,
          standardCounterpartQualifiedName,
          null,
          searchParent,
          null,
        ], !options.markForDestructionOnUnmount);
        this.markSearchForDestruction(
          options.cachePolicy,
          standardCounterpartQualifiedName,
          null,
          searchParent,
          null,
          true,
          !options.markForDestructionOnUnmount,
        );
      } else if (options.cachePolicy === "by-owner-and-parent") {
        this.installInternalSearchDestructionMarker([
          options.cachePolicy,
          standardCounterpartQualifiedName,
          options.createdBy,
          searchParent,
          null,
        ], !options.markForDestructionOnUnmount);
        this.markSearchForDestruction(
          options.cachePolicy,
          standardCounterpartQualifiedName,
          options.createdBy,
          searchParent,
          null,
          true,
          !options.markForDestructionOnUnmount,
        );
      } else if (options.cachePolicy === "by-property") {
        this.installInternalSearchDestructionMarker([
          options.cachePolicy,
          standardCounterpartQualifiedName,
          null,
          null,
          searchCacheUsesProperty,
        ], !options.markForDestructionOnUnmount);
        this.markSearchForDestruction(
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
    if (!this.isUnmounted) {
      this.setState({
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
      const root = this.props.itemDefinitionInstance.getParentModule().getParentRoot();
      types = options.types.map((t) => root.registry[t].getQualifiedPathName());
    }

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
        id: options.parentedBy.id || null,
        version: options.parentedBy.version || null,
      };
    }

    const stateOfSearch = this.props.itemDefinitionInstance.getStateNoExternalChecking(
      this.props.forId || null,
      this.props.forVersion || null,
    );

    if ((listenPolicy === "by-owner" || listenPolicy === "by-owner-and-parent") && !options.createdBy || options.createdBy === UNSPECIFIED_OWNER) {
      throw new Error("Listen policy is by-owner yet there's no creator specified");
    } else if ((listenPolicy === "by-parent" || listenPolicy === "by-owner-and-parent") && (!parentedBy || !parentedBy.id)) {
      throw new Error("Listen policy is by-parent yet there's no parent specified with a specific id");
    }

    let activeSearchPromiseResolve = null as any;
    let activeSearchPromiseReject = null as any;
    this.activeSearchPromise = new Promise((resolve, reject) => {
      activeSearchPromiseResolve = resolve;
      activeSearchPromiseReject = reject;
    });

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
      itemDefinition: this.props.itemDefinitionInstance,
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
      token: this.props.tokenData.token,
      language: this.props.localeData.language,
      limit: options.limit,
      offset: options.offset,
      enableNulls: options.enableNulls,
      parentedBy,
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
      remoteListener: this.props.remoteListener,
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
        this.props.itemDefinitionInstance.setSearchState(
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
                state: this.props.location.state,
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
      this.cleanWithProps(this.props, options, "fail");
    } else {
      let highlightArgs: any = null;

      if (!options.traditional && options.useSearchEngine) {
        // we are passing these highlight args that are used in the argument
        // we don't need to pass them down the line otherwise
        highlightArgs = {};
        Object.keys(argumentsForQuery).forEach((pId) => {
          if (this.props.itemDefinitionInstance.hasPropertyDefinitionFor(pId, true)) {
            const pValue = this.props.itemDefinitionInstance.getPropertyDefinitionFor(pId, true);

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

      this.searchListenersSetup(
        searchState,
      );

      // this would be a wasted instruction otherwise as it'd be reversed
      if (
        !options.cleanSearchResultsOnAny &&
        !options.cleanSearchResultsOnSuccess
      ) {
        this.props.itemDefinitionInstance.setSearchState(
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
                state: this.props.location.state,
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
      cached,
      cancelled: false,
      polyfilled,
    };
    this.props.onSearch && this.props.onSearch(result);
    this.activeSearchPromise = null;
    activeSearchPromiseResolve({ response: result, options });
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
      submitted: false,
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
  public async onSearchReload(arg: IRemoteListenerRecordsCallbackArg) {
    // prevent double searches and warn the developer
    if (this.state.searching) {
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
    this.preventSearchFeedbackOnPossibleStaleData = true;
    this.reloadNextSearch = true;
    await this.search(this.state.searchOriginalOptions);

    // now that the search is done, any records in cache would have updated
    // in the case of cachePolicy usages, and now we can trigger updates
    // down the line
    const root = this.props.itemDefinitionInstance.getParentModule().getParentRoot();
    arg.modifiedRecords.forEach((record) => {
      const iDef = root.registry[record.type] as ItemDefinition;
      const rqValue = iDef.getRQAppliedValue(record.id, record.version);
      if (!rqValue || !rqValue.flattenedValue || rqValue.flattenedValue.last_modified !== record.last_modified) {
        iDef.triggerListeners("reload", record.id, record.version);
      }
    });
  }
  public removePossibleSearchListeners(
    props: IActualItemProviderProps = this.props,
    state: IActualItemProviderState = this.state,
  ) {
    if (props.itemDefinitionInstance.isInSearchMode()) {
      const standardCounterpart = props.itemDefinitionInstance.getStandardCounterpart();
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
  private installInternalSearchDestructionMarker(marker: [string, string, string, [string, string, string], [string, string]], unmark: boolean) {
    const index = this.internalSearchDestructionMarkers.findIndex((m) => equals(m, marker, { strict: true }));
    if (unmark) {
      // found somwehre
      if (index !== -1) {
        // unmark it
        this.internalSearchDestructionMarkers.splice(index, 1);
      }

    // not found
    } else if (index === -1) {
      // mark it
      this.internalSearchDestructionMarkers.push(marker);
    }
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

    // nothing to render
    if (!this.props.children) {
      return null;
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
          holdsRemoteState: !!this.state.itemState.rqOriginalFlattenedValue,
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
          searchEngineEnabled: this.state.searchEngineEnabled,
          searchEngineEnabledLang: this.state.searchEngineEnabledLang,
          searchEngineUsedFullHighlights: this.state.searchEngineUsedFullHighlights,
          searchEngineHighlightArgs: this.state.searchEngineHighlightArgs,
          searchHighlights: this.state.searchHighlights,
          searchMetadata: this.state.searchMetadata,
          highlights: this.props.highlights,
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
          downloadState: this.downloadState,
          downloadStateAt: this.downloadStateAt,
          loadStateFromFile: this.loadStateFromFile,
          loadStateFromFileAt: this.loadStateFromFileAt,
        }}
      >
        {this.props.children}
      </ItemContext.Provider>
    );
  }
}

export type ItemProviderType = ActualItemProvider;
export type ItemProviderRefObject = React.RefObject<ActualItemProvider>;

/**
 * The item provider component provides the core functionality for the item provider
 */
export const ItemProvider = React.forwardRef<ActualItemProvider, IItemProviderProps>((props, ref) => {
  const config = useContext(ConfigContext);
  const localeData = useContext(LocaleContext);
  const tokenData = useContext(TokenContext);
  const data = useContext(ModuleContext);
  const searchContext = useContext(SearchItemValueContext);

  if (!data) {
    console.error("At element with props: ", props);
    throw new Error("The ItemProvider must be inside a ModuleProvider context");
  }
  let valueFor: ItemDefinition;
  if (props.itemDefinition) {
    if (typeof props.itemDefinition === "string") {
      if (props.itemDefinition.startsWith("MOD_") && props.itemDefinition.includes("IDEF")) {
        try {
          valueFor = data.mod.getParentRoot().registry[props.itemDefinition] as ItemDefinition;
        } catch (err) {
          console.error("At element with props: ", props);
          throw err;
        }
      } else {
        try {
          valueFor = data.mod.getItemDefinitionFor(props.itemDefinition.split("/"));
        } catch (err) {
          console.error("At element with props: ", props);
          throw err;
        }
      }
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
    if (props.loadSearchFromNavigation || (props.queryStringSync && props.queryStringSync.length)) {
      return (
        <LocationRetriever>
          {(location) => (
            <ItemContext.Consumer>{
              (value) => (
                <ActualItemProvider
                  {...actualProps}
                  injectedParentContext={value}
                  location={location}
                  ref={ref}
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
              ref={ref}
            />
          )
        }</ItemContext.Consumer>
      );
    }
  }

  if (props.loadSearchFromNavigation || (props.queryStringSync && props.queryStringSync.length)) {
    return (
      <LocationRetriever>
        {(location) => (
          <ActualItemProvider
            {...actualProps}
            injectedParentContext={null}
            location={location}
            ref={ref}
          />
        )}
      </LocationRetriever>
    );
  } else {
    return (
      <ActualItemProvider
        {...actualProps}
        injectedParentContext={null}
        ref={ref}
      />
    );
  }
});

/**
 * Props for a item provider without state
 */
interface INoStateItemProviderProps {
  /**
   * Item definition in question
   */
  itemDefinition?: string;
  /**
   * Children that will apply the component for
   */
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

/**
 * The no state item provider allows to set an item provider that holds no state
 * and therefore it is cheaper
 * 
 * @deprecated
 * @param props 
 * @returns 
 */
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
            if (props.itemDefinition.startsWith("MOD_") && props.itemDefinition.includes("IDEF")) {
              valueFor = data.mod.getParentRoot().registry[props.itemDefinition] as ItemDefinition;
            } else {
              valueFor = data.mod.getItemDefinitionFor(props.itemDefinition.split("/"))
            }
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

/**
 * Provides a previously injected parent context
 * @deprecated please use ItemContextPhase and ItemContextRetrieve instead
 * @param props 
 * @returns 
 */
export function ParentItemContextProvider(props: { children: React.ReactNode }) {
  return (
    <ItemContext.Consumer>
      {(value) => {
        if (!value.injectedParentContext) {
          console.warn("No parent context was injected during the usage of parent item context provider, defaulting to null");
        }
        return (<ItemContext.Provider value={value.injectedParentContext || null}>
          {props.children}
        </ItemContext.Provider>);
      }}
    </ItemContext.Consumer>
  );
}

interface IItemContextPhaseProps {
  /**
   * The children to phase to
   */
  children: React.ReactNode;
  /**
   * the slot to store at in order to phase multiple contexts
   */
  slot?: string;
};

/**
 * Phases the currrent item context until it is later retrieved so it can be used later at another level
 * for example the following
 * 
 * <ItemContextPhase>
 *   <ItemProvider
 *     {...}
 *   >
 *     <ItemContextRetrieve>
 *        
 *     </ItemContextRetrieve>
 *   </ItemProvider>
 * </ItemContextPhase>
 * 
 * will use the outer context inside the item context retrieve
 * 
 * you may use a lot in order to be able to phase multiple contexts
 * 
 * <ItemContextPhase slot="slot1">
 *   <ItemProvider
 *     {...}
 *   >
 *     <ItemContextPhase slot="slot2">
 *       <ItemContextRetrieve slot="slot1">
 *        
 *       </ItemContextRetrieve>
 *     </ItemContextPhase>
 *   </ItemProvider>
 * </ItemContextPhase>
 * 
 * In this case both contexts are phased in
 * 
 * @param props 
 * @returns 
 */
export function ItemContextPhase(props: IItemContextPhaseProps) {
  return (
    <ItemContextPhaserContext.Consumer>
      {(phaserValue) => (
        <ItemContext.Consumer>
          {(value) => {
            const newValue = {
              ...phaserValue,
            };
            const slotId = props.slot || "null";
            newValue[slotId] = value;
            return (<ItemContextPhaserContext.Provider value={newValue}>
              {props.children}
            </ItemContextPhaserContext.Provider>);
          }}
        </ItemContext.Consumer>
      )}
    </ItemContextPhaserContext.Consumer>
  );
}

/**
 * This is the item context retrieve and allows to retrieve the context
 * that was previously phased with ItemContextPhase
 * 
 * @param props 
 * @returns 
 */
export function ItemContextRetrieve(props: IItemContextPhaseProps) {
  return (
    <ItemContextPhaserContext.Consumer>
      {(value) => {
        return (<ItemContext.Provider value={value[props.slot || "null"]}>
          {props.children}
        </ItemContext.Provider>);
      }}
    </ItemContextPhaserContext.Consumer>
  );
}