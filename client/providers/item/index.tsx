import React, { useContext } from "react";
import { LocaleContext, ILocaleContextType } from "../../internal/providers/locale-provider";
import ItemDefinition, { IItemSearchStateHighlightArgsType, IItemSearchStateType, IItemStateType } from "../../../base/Root/Module/ItemDefinition";
import PropertyDefinition from "../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { IElasticHighlightRecordInfo, IElasticHighlightSingleRecordInfo, PropertyDefinitionSupportedType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import Include, { IncludeExclusionState } from "../../../base/Root/Module/ItemDefinition/Include";
import { TokenContext, ITokenContextType } from "../../internal/providers/token-provider";
import {
  IOrderByRuleType,
} from "../../../constants";
import { IRQSearchRecord, IRQValue, IRQRequestFields, ProgresserFn } from "../../../rq-querier";
import { requestFieldsAreContained } from "../../../rq-util";
import { EndpointErrorType } from "../../../base/errors";
import equals from "deep-equal";
import { ModuleContext } from "../module";
import { IRemoteListenerRecordsCallbackArg, RemoteListener } from "../../internal/app/remote-listener";
import uuid from "uuid";
import {
  getFieldsAndArgs, IIncludeOverride,
  IPropertyOverride, ICacheMetadataMismatchAction, ISearchCacheMetadataMismatchAction, SearchCacheMetadataMismatchActionFn, getPropertyListDefault
} from "../../internal/rq-client-util";
import { IPropertyCoreProps, IPropertySetterProps } from "../../components/property/base";
import { ConfigContext } from "../../internal/providers/config-provider";
import { IConfigRawJSONDataType } from "../../../config";
import { useLocationRetriever } from "../../components/navigation/LocationRetriever";
import { Location } from "history";
import type { ICacheStateMetadata } from "../../internal/workers/cache/cache.worker.class";
import Hit from "../../components/analytics/Hit";
import Timetrack from "../../components/analytics/Timetrack";
import { genericAnalyticsDataProvider } from "../../components/analytics/util";
import {
  IStoredStateLocation, blockCleanup, changeListener, changeSearchListener, cleanWithProps,
  del, didUpdate, dismissDeleteError, dismissDeleted, dismissLoadError, dismissSearchError, dismissSearchResults,
  dismissSubmitError, dismissSubmitted, downloadStateAt, getDerived,
  installPrefills, installSetters, loadListener, loadStateFromFileAt, loadValue,
  onConnectStatusChange, onIncludeSetExclusionState, onMount, onPropertyChange, onPropertyClearEnforce, onPropertyEnforce,
  onPropertyRestore, onSearchReload, reloadListener, search, setStateToCurrentValueWithExternalChecking, setupInitialState,
  setupListeners, submit, willUnmount
} from "./util";

// THIS IS THE MOST IMPORTANT FILE OF WHOLE ITEMIZE
// HERE IS WHERE THE MAGIC HAPPENS

// TODO cache policy search destruction markers
// destruct a whole search and its children on logout


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
  } | "NO_PARENT";

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
export interface IItemProviderProps<
  T extends string = string,
> {
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
   * Use this to prevent warnigns about two item providers sharing
   * the same slot in search counterpart
   */
  searchCounterpartHasTwin?: boolean;
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
  setters?: Array<IPropertySetterProps<PropertyDefinitionSupportedType>>;
  /**
   * Similar to setters but the values are just prefilled and as such are not
   * readonly, prefills only get executed during the initial mount
   * of the component
   */
  prefills?: Array<IPropertySetterProps<PropertyDefinitionSupportedType>>;
  /**
   * Synchronizes a property based on a query string it behaves like a prefill
   * (and overrides the prefill) if it finds a value in the query string
   * and it will keep it updated bsed on that
   * 
   * Some properties cannot be qs tracked, such as files, only
   * values representing serializable objects can be tracked
   */
  queryStringSync?: Array<T | IPropertyCoreProps<T>>;
  /**
   * When using the query string sync it will replace the current history state
   */
  queryStringSyncReplace?: boolean;
  /**
   * only downloads and includes the properties specified in the list
   * in the state
   */
  properties?: Array<T | IPropertyCoreProps<T>>;
  // TODO have types for the includes too that can be set somehow
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

  /**
   * Analytics properties used for the item
   * 
   * when used in the analytics the context will always be the
   * signature of the item
   * 
   * if specified as a boolean true it will use a default configuration
   * 
   * {
   *   enabled: true,
   *   offlineTimeTrackId: "item",
   * }
   */
  analytics?: IItemAnalyticsProps | boolean;
}

export interface IItemProviderPropsWSpecificArrayProperties<
  T extends string = string,
  SP extends Record<string, {variant: string; value: any}> = {},
> extends Omit<IItemProviderProps<T>, 'setters' | 'prefills'> {
  /**
   * Setters for setting values for the properties within the item definition
   * itself, useful not to depend on mounting at time
   */
  setters?: Array<{
    [K in keyof SP & string]: IPropertySetterProps<SP[K]["value"], K, SP[K]["variant"]>;
  }[keyof SP & string]>;
  /**
   * Similar to setters but the values are just prefilled and as such are not
   * readonly, prefills only get executed during the initial mount
   * of the component
   */
  prefills?: Array<{
    [K in keyof SP & string]: IPropertySetterProps<SP[K]["value"], K, SP[K]["variant"]>;
  }[keyof SP & string]>;
}

/**
 * The analytics props to customize the analytics behaviour using the
 * inner analytics mechanism with Timetrack and Hit
 */
export interface IItemAnalyticsProps {
  /**
   * whether it's enabled
   */
  enabled: boolean;
  /**
   * the track id for online usage that is tracked securely in the server side
   */
  onlineTimeTrackId?: string;
  /**
   * the track id for offline all time usage that is tracked in the client side
   */
  offlineTimeTrackId?: string;
  /**
   * used with hits, specifies the weight of the hit
   * will not be used in timetrack as it doesn't support it since the weight of a timetrack
   * is equivalent to the time spent
   */
  weight?: number;
  /**
   * The track id for an online hit
   */
  onlineHitTrackId?: string;
  /**
   * the track id for an offline client side tracked hit
   */
  offlineHitTrackId?: string;
  /**
   * Allows to track anonymous users
   */
  trackAnonymous?: boolean;
  /**
   * The default data generator, it will use the item default data generator by default
   * it's preferred that you don't override this function unless you want to override
   * all default data
   */
  defaultDataGenerator?: () => object;
  /**
   * By default the data that gets attached to the object comes from the default data generator
   * @returns 
   */
  extraDataGenerator?: (type: "online-time-track" | "offline-time-track" | "online-hit" | "offline-hit") => object;
}

/**
 * This represents the actual provider that does the job, it takes on some extra properties
 * taken from the contexts that this is expected to run under
 */
export interface IActualItemProviderProps extends IItemProviderProps {
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
   * config that comes from the config provider
   */
  config: IConfigRawJSONDataType;
  /**
   * the current location
   */
  location: Location<any>;
}

// This is the state of such, it's basically a copy of the
// context, so refer to that, the context is avobe
export interface IActualItemProviderState extends IItemSearchStateType {
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

  // sometimes when doing some updates when you change the item
  // definition to another item definition (strange but ok)
  // the state between the item and the expected state will
  // not match, so we need to make it be the state of the
  // item definition itself, so we make a check using the qualified name
  public static getDerivedStateFromProps(
    props: IActualItemProviderProps,
    state: IActualItemProviderState,
  ): Partial<IActualItemProviderState> {
    return getDerived(props.itemDefinitionInstance, props.location, props, state);
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
      return setupInitialState(props.itemDefinitionInstance, props);
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
    return setupInitialState(props.itemDefinitionInstance, props);
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
  private activeSearchOptions: IActionSearchOptions = null;

  // sometimes reload calls can come in batches due to triggering actions
  // it doesn't hurt to catch them all and create a timeout
  private reloadListenerTimeout: NodeJS.Timeout = null;

  private stateAsRef: { readonly current: IActualItemProviderState };

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
    this.dismissSubmitted = this.dismissSubmitted.bind(this);
    this.dismissDeleted = this.dismissDeleted.bind(this);
    this.clean = this.clean.bind(this);
    this.poke = this.poke.bind(this);
    this.unpoke = this.unpoke.bind(this);
    this.search = this.search.bind(this);
    this.dismissSearchError = this.dismissSearchError.bind(this);
    this.dismissSearchResults = this.dismissSearchResults.bind(this);
    this.onSearchReload = this.onSearchReload.bind(this);
    this.injectSubmitBlockPromise = this.injectSubmitBlockPromise.bind(this);
    this.loadStateFromFile = this.loadStateFromFile.bind(this);
    this.loadStateFromFileAt = this.loadStateFromFileAt.bind(this);
    this.downloadState = this.downloadState.bind(this);
    this.downloadStateAt = this.downloadStateAt.bind(this);
    this.onConnectStatusChange = this.onConnectStatusChange.bind(this);
    this.internalDataProviderForAnalytics = this.internalDataProviderForAnalytics.bind(this);
    this.basicFnsRetriever = this.basicFnsRetriever.bind(this);

    // first we setup the listeners, this includes the on change listener that would make
    // the entire app respond to actions, otherwise the fields might as well be disabled
    // we do this here to avoid useless callback changes as the listeners are not ready
    installSetters(props.itemDefinitionInstance, props, this.isCMounted, this.search, this);
    installPrefills(props.itemDefinitionInstance, props, props.location);

    if (typeof document !== "undefined") {
      setupListeners(
        props.itemDefinitionInstance,
        props,
        props.remoteListener,
        this.changeListener,
        this.loadListener,
        this.changeSearchListener,
        this.reloadListener,
        this,
      );
      const $this = this;
      blockCleanup(
        {
          get current() {
            return $this.blockIdClean;
          },
          set current(v: string) {
            $this.blockIdClean = v;
          }
        },
        props.itemDefinitionInstance,
        props,
      );
    }

    // we get the initial state
    this.state = setupInitialState(props.itemDefinitionInstance, props);

    const $this = this;
    this.stateAsRef = {
      get current() {
        return $this.state;
      },
    };
  }

  public injectSubmitBlockPromise(p: Promise<any>) {
    this.submitBlockPromises.push(p);
  }

  public onConnectStatusChange() {
    return onConnectStatusChange(
      this.props,
      this.props.remoteListener,
      this.state,
      this.search,
      this.loadValue,
    );
  }

  public basicFnsRetriever(): IBasicFns {
    return {
      clean: this.clean,
      delete: this.delete,
      poke: this.poke,
      reload: this.loadValue,
      search: this.search,
      submit: this.submit,
      unpoke: this.unpoke,
    };
  }

  // so now we have mounted, what do we do at the start
  public async componentDidMount() {
    const $this = this;
    return await onMount(this.props.itemDefinitionInstance, this.props,
      this.stateAsRef, this.setState.bind(this), this.props.remoteListener,
      {
        get current() {
          return $this.isCMounted;
        },
        set current(v: boolean) {
          $this.isCMounted = v;
        },
      },
      {
        get current() {
          return $this.mountCbFns;
        },
        set current(v: Array<() => void>) {
          $this.mountCbFns = v;
        },
      },
      {
        get current() {
          return $this.changedSearchListenerLastCollectedSearchId;
        },
        set current(v: { id: string }) {
          $this.changedSearchListenerLastCollectedSearchId = v;
        },
      },
      {
        get current() {
          return $this.initialAutomaticNextSearch;
        },
        set current(v: boolean) {
          $this.initialAutomaticNextSearch = v;
        },
      },
      {
        get current() {
          return $this.isUnmounted;
        },
        set current(v: boolean) {
          $this.isUnmounted = v;
        },
      },
      this.internalUUID,
      {
        get current() {
          return $this.lastUpdateId;
        },
        set current(v: number) {
          $this.lastUpdateId = v;
        },
      },
      this.basicFnsRetriever,
      this.onConnectStatusChange,
      this.onSearchReload,
      this.search,
      this.loadValue,
      this.changeListener,
    );
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
      !equals(nextProps.highlights, this.props.highlights) ||
      !equals(nextProps.analytics, this.props.analytics);
  }

  public componentDidUpdate(
    prevProps: IActualItemProviderProps,
    prevState: IActualItemProviderState,
  ) {
    const $this = this;
    return didUpdate(
      prevProps.itemDefinitionInstance,
      this.props.itemDefinitionInstance,
      prevProps,
      prevState,
      this.props,
      prevProps.tokenData,
      this.props.tokenData,
      this.stateAsRef,
      this.setState.bind(this),
      {
        get current() {
          return $this.blockIdClean;
        },
        set current(v: string) {
          $this.blockIdClean = v;
        },
      },
      {
        get current() {
          return $this.storeStateTimeout;
        },
        set current(v: any) {
          $this.storeStateTimeout = v;
        },
      },
      {
        get current() {
          return $this.internalSearchDestructionMarkers;
        },
        set current(v: Array<[string, string, string, [string, string, string], [string, string]]>) {
          $this.internalSearchDestructionMarkers = v;
        },
      },
      {
        get current() {
          return $this.isCMounted;
        },
        set current(v: boolean) {
          $this.isCMounted = v;
        },
      },
      this.internalUUID,
      this.props.location,
      this.props.remoteListener,
      {
        get current() {
          return $this.isUnmounted;
        },
        set current(v: boolean) {
          $this.isUnmounted = v;
        },
      },
      {
        get current() {
          return $this.lastUpdateId;
        },
        set current(v: number) {
          $this.lastUpdateId = v;
        },
      },
      this.search,
      this.loadValue,
      this.reloadListener,
      this.loadListener,
      this.changeListener,
      this.changeSearchListener,
      this.onSearchReload,
      this.basicFnsRetriever,
      this,
    );
  }

  public reloadListener() {
    const $this = this;
    return reloadListener(
      this.props.itemDefinitionInstance,
      this.props,
      this.isCMounted,
      {
        get current() {
          return $this.mountCbFns;
        },
        set current(v: Array<() => void>) {
          $this.mountCbFns = v;
        },
      },
      this.reloadListener,
      {
        get current() {
          return $this.reloadListenerTimeout;
        },
        set current(v: any) {
          $this.reloadListenerTimeout = v;
        },
      },
      () => {
        this.loadValue(true);
      }
    )
  }
  public changeSearchListener() {
    const $this = this;
    return changeSearchListener(
      this.props.itemDefinitionInstance,
      this.props,
      {
        get current() {
          return $this.changedSearchListenerLastCollectedSearchId;
        },
        set current(v: { id: string }) {
          $this.changedSearchListenerLastCollectedSearchId = v;
        }
      },
      {
        get current() {
          return $this.mountCbFns;
        },
        set current(v: Array<() => void>) {
          $this.mountCbFns = v;
        },
      },
      this.isUnmounted,
      this.isCMounted,
      this.changeSearchListener,
      this.setState.bind(this),
    );
  }
  public async changeListener(repairCorruption?: boolean) {
    const $this = this;
    return await changeListener(
      this.props.itemDefinitionInstance,
      this.props,
      this.setState.bind(this),
      {
        get current() {
          return $this.isUnmounted;
        },
        set current(v: boolean) {
          $this.isUnmounted = v;
        },
      },
      {
        get current() {
          return $this.isCMounted;
        },
        set current(v: boolean) {
          $this.isCMounted = v;
        },
      },
      {
        get current() {
          return $this.mountCbFns;
        },
        set current(v: Array<() => void>) {
          $this.mountCbFns = v;
        },
      },
      {
        get current() {
          return $this.repairCorruptionTimeout;
        },
        set current(v: any) {
          $this.repairCorruptionTimeout = v;
        }
      },
      this.lastLoadValuePromiseIsResolved,
      this.lastLoadValuePromise,
      this.changeListener,
      this.reloadListener,
      repairCorruption,
    );
  }

  /**
   * This listener triggers on load and the search
   * loader triggers it
   */
  public async loadListener() {
    const $this = this;
    return await loadListener(
      this.props.itemDefinitionInstance,
      this.props,
      this.stateAsRef,
      this.setState.bind(this),
      {
        get current() {
          return $this.isUnmounted;
        },
        set current(v: boolean) {
          $this.isUnmounted = v;
        },
      },
      {
        get current() {
          return $this.isCMounted;
        },
        set current(v: boolean) {
          $this.isCMounted = v;
        },
      },
      {
        get current() {
          return $this.mountCbFns;
        },
        set current(v: Array<() => void>) {
          $this.mountCbFns = v;
        },
      },
      this.changeListener,
      this.loadListener,
    );
  }
  public async loadStateFromFile(stateFile: File | Blob, specificProperties?: string[], specificIncludes?: { [includeId: string]: string[] }) {
    return this.loadStateFromFileAt(stateFile, this.props.forId || null, this.props.forVersion || null, specificProperties, specificIncludes);
  }
  public async loadStateFromFileAt(
    stateFile: File | Blob,
    id: string,
    version?: string,
    specificProperties?: string[],
    specificIncludes?: { [includeId: string]: string[] },
  ) {
    return await loadStateFromFileAt(
      this.props.itemDefinitionInstance,
      stateFile,
      id,
      version,
      specificProperties,
      specificIncludes,
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
    return await downloadStateAt(
      this.props.itemDefinitionInstance,
      this.lastLoadValuePromiseIsResolved,
      this.lastLoadValuePromise,
      id,
      version,
      specificProperties,
      specificIncludes,
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
  public async loadValue(denyCaches?: boolean): Promise<IActionResponseWithValue> {
    const $this = this;
    return await loadValue(
      this.props.itemDefinitionInstance,
      this.props,
      this.stateAsRef,
      this.setState.bind(this),
      this.props.remoteListener,
      {
        get current() {
          return $this.lastLoadingForId;
        },
        set current(v: string) {
          $this.lastLoadingForId = v;
        }
      },
      {
        get current() {
          return $this.lastLoadingForVersion;
        },
        set current(v: string) {
          $this.lastLoadingForVersion = v;
        }
      },
      {
        get current() {
          return $this.lastLoadValuePromiseIsResolved;
        },
        set current(v: boolean) {
          $this.lastLoadValuePromiseIsResolved = v;
        }
      },
      {
        get current() {
          return $this.lastLoadValuePromise;
        },
        set current(v: Promise<void>) {
          $this.lastLoadValuePromise = v;
        }
      },
      {
        get current() {
          return $this.lastLoadValuePromiseResolve;
        },
        set current(v: () => void) {
          $this.lastLoadValuePromiseResolve = v;
        }
      },
      {
        get current() {
          return $this.isUnmounted;
        },
        set current(v: boolean) {
          $this.isUnmounted = v;
        },
      },
      this.props.tokenData.token,
      this.props.localeData.language,
      {
        get current() {
          return $this.lastUpdateId;
        },
        set current(v: number) {
          $this.lastUpdateId = v;
        },
      },
      this.internalUUID,
      this.props.searchContext,
      this.changeListener,
      denyCaches,
    );
  }

  /**
   * Called by entries or manually to restore a file
   * @param property 
   * @returns 
   */
  public onPropertyRestore(
    property: PropertyDefinition | string | IPropertyCoreProps,
  ) {
    const $this = this;
    return onPropertyRestore(
      this.props.itemDefinitionInstance,
      this.props,
      this.state,
      {
        get current() {
          return $this.lastUpdateId;
        },
        set current(v: number) {
          $this.lastUpdateId = v;
        },
      },
      {
        get current() {
          return $this.updateTimeout;
        },
        set current(v: any) {
          $this.updateTimeout = v;
        },
      },
      {
        get current() {
          return $this.automaticSearchTimeout;
        },
        set current(v: any) {
          $this.automaticSearchTimeout = v;
        },
      },
      {
        get current() {
          return $this.preventSearchFeedbackOnPossibleStaleData;
        },
        set current(v: any) {
          $this.preventSearchFeedbackOnPossibleStaleData = v;
        },
      },
      {
        get current() {
          return $this.consumableQsState;
        },
        set current(v: any) {
          $this.consumableQsState = v;
        },
      },
      {
        get current() {
          return $this.consumeQsStateTimeout;
        },
        set current(v: any) {
          $this.consumeQsStateTimeout = v;
        },
      },
      this.props.location,
      (currentUpdateId: number) => {
        setStateToCurrentValueWithExternalChecking(
          this.props.itemDefinitionInstance,
          this.setState.bind(this),
          this.props,
          {
            get current() {
              return $this.isUnmounted;
            },
            set current(v: boolean) {
              $this.isUnmounted = v;
            },
          },
          {
            get current() {
              return $this.lastUpdateId;
            },
            set current(v: number) {
              $this.lastUpdateId = v;
            },
          },
          currentUpdateId,
          this.changeListener,
        );
      },
      this.search,
      property,
    );
  }

  /**
   * Called by entries to manually change the value of a property
   * @param property 
   * @param value 
   * @param internalValue 
   */
  public async onPropertyChange(
    property: PropertyDefinition | string | IPropertyCoreProps,
    value: PropertyDefinitionSupportedType,
    internalValue: any,
  ) {
    const $this = this;
    return onPropertyChange(
      this.props.itemDefinitionInstance,
      this.props,
      this.stateAsRef,
      this.lastLoadValuePromise,
      {
        get current() {
          return $this.lastUpdateId;
        },
        set current(v: number) {
          $this.lastUpdateId = v;
        },
      },
      {
        get current() {
          return $this.updateTimeout;
        },
        set current(v: any) {
          $this.updateTimeout = v;
        },
      },
      {
        get current() {
          return $this.automaticSearchTimeout;
        },
        set current(v: any) {
          $this.automaticSearchTimeout = v;
        },
      },
      {
        get current() {
          return $this.preventSearchFeedbackOnPossibleStaleData;
        },
        set current(v: any) {
          $this.preventSearchFeedbackOnPossibleStaleData = v;
        },
      },
      {
        get current() {
          return $this.consumableQsState;
        },
        set current(v: any) {
          $this.consumableQsState = v;
        },
      },
      {
        get current() {
          return $this.consumeQsStateTimeout;
        },
        set current(v: any) {
          $this.consumeQsStateTimeout = v;
        },
      },
      this.props.location,
      (currentUpdateId: number) => {
        setStateToCurrentValueWithExternalChecking(
          this.props.itemDefinitionInstance,
          this.setState.bind(this),
          this.props,
          {
            get current() {
              return $this.isUnmounted;
            },
            set current(v: boolean) {
              $this.isUnmounted = v;
            },
          },
          {
            get current() {
              return $this.lastUpdateId;
            },
            set current(v: number) {
              $this.lastUpdateId = v;
            },
          },
          currentUpdateId,
          this.changeListener,
        );
      },
      this.search,
      property,
      value,
      internalValue,
    );
  }

  public onPropertyEnforce(
    property: PropertyDefinition | string | IPropertyCoreProps,
    value: PropertyDefinitionSupportedType,
    givenForId: string,
    givenForVersion: string,
    // doNotCleanSearchState?: boolean,
  ) {
    return onPropertyEnforce(
      this.props.itemDefinitionInstance,
      this.props,
      this.isCMounted,
      property,
      value,
      givenForId,
      givenForVersion,
      this.search,
      this,
    );
  }
  public onPropertyClearEnforce(
    property: PropertyDefinition | string | IPropertyCoreProps,
    givenForId: string,
    givenForVersion: string,
  ) {
    return onPropertyClearEnforce(
      this.props.itemDefinitionInstance,
      this.props,
      this.isCMounted,
      property,
      givenForId,
      givenForVersion,
      this.search,
      this,
    );
  }

  public componentWillUnmount() {
    const $this = this;
    willUnmount(
      this.props.itemDefinitionInstance,
      this.props,
      this.state,
      this.setState.bind(this),
      this.props.remoteListener,
      {
        get current() {
          return $this.isUnmounted;
        },
        set current(v: boolean) {
          $this.isUnmounted = v;
        }
      },
      {
        get current() {
          return $this.blockIdClean;
        },
        set current(v: string) {
          $this.blockIdClean = v;
        }
      },
      {
        get current() {
          return $this.internalSearchDestructionMarkers;
        },
        set current(v: Array<[string, string, string, [string, string, string], [string, string]]>) {
          $this.internalSearchDestructionMarkers = v;
        },
      },
      this.isCMounted,
      this.changeListener,
      this.loadListener,
      this.changeSearchListener,
      this.reloadListener,
      this.onSearchReload,
      this.onConnectStatusChange,
      this.search,
      this.internalUUID,
      this,
    );
  }

  public onIncludeSetExclusionState(include: Include, state: IncludeExclusionState) {
    const $this = this;
    return onIncludeSetExclusionState(
      this.props.itemDefinitionInstance,
      this.props,
      {
        get current() {
          return $this.lastUpdateId;
        },
        set current(v: number) {
          $this.lastUpdateId = v;
        },
      },
      {
        get current() {
          return $this.updateTimeout;
        },
        set current(v: any) {
          $this.updateTimeout = v;
        },
      },
      (currentUpdateId: number) => {
        setStateToCurrentValueWithExternalChecking(
          this.props.itemDefinitionInstance,
          this.setState.bind(this),
          this.props,
          {
            get current() {
              return $this.isUnmounted;
            },
            set current(v: boolean) {
              $this.isUnmounted = v;
            },
          },
          {
            get current() {
              return $this.lastUpdateId;
            },
            set current(v: number) {
              $this.lastUpdateId = v;
            },
          },
          currentUpdateId,
          this.changeListener,
        );
      },
      include,
      state,
    );
  }

  public async delete(options: IActionDeleteOptions = {}): Promise<IBasicActionResponse> {
    const $this = this;
    return await del(
      this.props.itemDefinitionInstance,
      this.props,
      this.stateAsRef,
      this.setState.bind(this),
      {
        get current() {
          return $this.isUnmounted;
        },
        set current(v: boolean) {
          $this.isUnmounted = v;
        },
      },
      {
        get current() {
          return $this.blockIdClean;
        },
        set current(v: string) {
          $this.blockIdClean = v;
        },
      },
      this.props.tokenData.token,
      this.props.localeData.language,
      this.props.remoteListener,
      options,
    );
  }

  public clean(
    options: IActionCleanOptions,
    state: "success" | "fail",
    avoidTriggeringUpdate?: boolean,
  ): boolean {
    return cleanWithProps(
      this.props.itemDefinitionInstance,
      this.props,
      this.isUnmounted,
      this.blockIdClean,
      options,
      state,
      this.setState.bind(this),
      avoidTriggeringUpdate,
    );
  }

  public async submit(options: IActionSubmitOptions): Promise<IActionSubmitResponse> {
    const $this = this;
    return await submit(
      this.props.itemDefinitionInstance,
      this.props,
      this.stateAsRef,
      this.setState.bind(this),
      {
        get current() {
          return $this.activeSubmitPromise;
        },
        set current(v) {
          $this.activeSubmitPromise = v;
        },
      },
      {
        get current() {
          return $this.activeSearchPromiseAwaiter;
        },
        set current(v) {
          $this.activeSearchPromiseAwaiter = v;
        },
      },
      {
        get current() {
          return $this.submitBlockPromises;
        },
        set current(v) {
          $this.submitBlockPromises = v;
        },
      },
      {
        get current() {
          return $this.isUnmounted;
        },
        set current(v: boolean) {
          $this.isUnmounted = v;
        },
      },
      {
        get current() {
          return $this.lastLoadValuePromise;
        },
        set current(v) {
          $this.lastLoadValuePromise = v;
        },
      },
      {
        get current() {
          return $this.blockIdClean;
        },
        set current(v: string) {
          $this.blockIdClean = v;
        },
      },
      this.props.config,
      this.props.tokenData.token,
      this.props.localeData.language,
      this.props.remoteListener,
      options,
    );
  }

  public async search(
    options: IActionSearchOptions,
  ): Promise<IActionResponseWithSearchResults> {
    const $this = this;
    return await search(
      this.props.itemDefinitionInstance,
      this.props,
      options,
      this.stateAsRef,
      this.setState.bind(this),
      {
        get current() {
          return $this.initialAutomaticNextSearch;
        },
        set current(v: boolean) {
          $this.initialAutomaticNextSearch = v;
        },
      },
      {
        get current() {
          return $this.reloadNextSearch;
        },
        set current(v: boolean) {
          $this.reloadNextSearch = v;
        },
      },
      {
        get current() {
          return $this.preventSearchFeedbackOnPossibleStaleData;
        },
        set current(v: boolean) {
          $this.preventSearchFeedbackOnPossibleStaleData = v;
        },
      },
      {
        get current() {
          return $this.activeSearchPromiseAwaiter;
        },
        set current(v: string) {
          $this.activeSearchPromiseAwaiter = v;
        },
      },
      {
        get current() {
          return $this.activeSearchPromise;
        },
        set current(v: Promise<{ response: IActionResponseWithSearchResults, options: IActionSearchOptions }>) {
          $this.activeSearchPromise = v;
        },
      },
      {
        get current() {
          return $this.activeSearchOptions;
        },
        set current(v: IActionSearchOptions) {
          $this.activeSearchOptions = v;
        },
      },
      {
        get current() {
          return $this.activeSubmitPromiseAwaiter;
        },
        set current(v: string) {
          $this.activeSubmitPromiseAwaiter = v;
        },
      },
      {
        get current() {
          return $this.internalSearchDestructionMarkers;
        },
        set current(v: Array<[string, string, string, [string, string, string], [string, string]]>) {
          $this.internalSearchDestructionMarkers = v;
        },
      },
      {
        get current() {
          return $this.isUnmounted;
        },
        set current(v: boolean) {
          $this.isUnmounted = v;
        },
      },
      {
        get current() {
          return $this.blockIdClean;
        },
        set current(v: string) {
          $this.blockIdClean = v;
        },
      },
      this.props.tokenData.token,
      this.props.localeData.language,
      this.props.remoteListener,
      this.props.location,
      this.onSearchReload,
      this.changeSearchListener,
    );
  }
  public dismissLoadError() {
    dismissLoadError(
      this.isUnmounted,
      this.setState.bind(this),
    );
  }
  public dismissDeleteError() {
    dismissDeleteError(
      this.isUnmounted,
      this.setState.bind(this),
    );
  }
  public dismissSubmitError() {
    dismissSubmitError(
      this.isUnmounted,
      this.setState.bind(this),
    );
  }
  public dismissSubmitted() {
    dismissSubmitted(
      this.isUnmounted,
      this.setState.bind(this),
    );
  }
  public dismissDeleted() {
    dismissDeleted(
      this.isUnmounted,
      this.setState.bind(this),
    );
  }
  public dismissSearchError() {
    dismissSearchError(
      this.isUnmounted,
      this.setState.bind(this),
    );
  }

  // Must be copied as it is unique to the Item Provider
  // and should be a use callback in hook mode
  private async onSearchReload(arg: IRemoteListenerRecordsCallbackArg) {
    const $this = this;
    return await onSearchReload(
      this.props.itemDefinitionInstance,
      this.state,
      {
        get current() {
          return $this.preventSearchFeedbackOnPossibleStaleData;
        },
        set current(v) {
          $this.preventSearchFeedbackOnPossibleStaleData = v;
        }
      },
      {
        get current() {
          return $this.reloadNextSearch;
        },
        set current(v) {
          $this.reloadNextSearch = v;
        }
      },
      this.search,
      arg,
    );
  }

  public dismissSearchResults() {
    return dismissSearchResults(
      this.props.itemDefinitionInstance,
      this.props.remoteListener,
      this.state,
      this.setState.bind(this),
      this.isUnmounted,
      this.onSearchReload,
    );
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

  private internalDataProviderForAnalytics() {
    const generalData = genericAnalyticsDataProvider() as any;
    generalData.id = this.props.forId;
    generalData.version = this.props.forVersion || null;
    generalData.type = this.props.itemDefinitionQualifiedName;
    return generalData;
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

    let analyticsNode: React.ReactNode = null;
    if (
      this.props.analytics &&
      this.state.loaded &&
      !this.state.notFound &&
      this.props.forId
    ) {
      const realAnalytics: IItemAnalyticsProps = this.props.analytics === true ? {
        enabled: true,
        offlineTimeTrackId: "item",
      } : this.props.analytics;

      const context = this.props.itemDefinitionQualifiedName + "." + this.props.forId + "." + (this.props.forVersion || "");

      analyticsNode = (
        <>
          {realAnalytics.offlineHitTrackId ? (
            <Hit
              trackId={realAnalytics.offlineHitTrackId}
              enabled={realAnalytics.enabled}
              context={context}
              dataGenerator={this.internalDataProviderForAnalytics}
              weight={realAnalytics.weight}
              trackOffline={true}
              trackAnonymous={realAnalytics.trackAnonymous}
            />
          ) : null}
          {realAnalytics.onlineHitTrackId ? (
            <Hit
              trackId={realAnalytics.onlineHitTrackId}
              enabled={realAnalytics.enabled}
              context={context}
              weight={realAnalytics.weight}
              dataGenerator={this.internalDataProviderForAnalytics}
              trackAnonymous={realAnalytics.trackAnonymous}
            />
          ) : null}
          {realAnalytics.offlineTimeTrackId ? (
            <Timetrack
              trackId={realAnalytics.offlineTimeTrackId}
              enabled={realAnalytics.enabled}
              context={context}
              dataGenerator={this.internalDataProviderForAnalytics}
              trackOffline={true}
              trackAnonymous={realAnalytics.trackAnonymous}
            />
          ) : null}
          {realAnalytics.onlineTimeTrackId ? (
            <Timetrack
              trackId={realAnalytics.onlineTimeTrackId}
              enabled={realAnalytics.enabled}
              context={context}
              dataGenerator={this.internalDataProviderForAnalytics}
              trackAnonymous={realAnalytics.trackAnonymous}
            />
          ) : null}
        </>
      );
    }

    // nothing to render
    if (!this.props.children) {
      return analyticsNode;
    }

    return (
      <>
        {analyticsNode}
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
            downloadState: this.downloadState,
            downloadStateAt: this.downloadStateAt,
            loadStateFromFile: this.loadStateFromFile,
            loadStateFromFileAt: this.loadStateFromFileAt,
          }}
        >
          {this.props.children}
        </ItemContext.Provider>
      </>
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
  const location = useLocationRetriever();

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
    location,
    ...props,
  }

  return (
    <ActualItemProvider
      {...actualProps}
      ref={ref}
    />
  );
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