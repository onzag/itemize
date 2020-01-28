/**
 * Contains a protocol to be used with remote realtime communication in order
 * to supply realtime updates between the server and the client
 *
 * This is just a bunch of types that specifies a protocol
 *
 * @packageDocumentation
 */

import { IGQLSearchResult } from "../gql-querier";

// EVENTS

/**
 * The build number event is an event streamed from the
 * server to the client once this client has connected
 */
export const BUILDNUMBER_EVENT = "buildnumber";
/**
 * The shape of the build number event contains only the build number
 * within itsefl
 */
export interface IBuildNumberEvent {
  buildnumber: string;
}

/**
 * Event that comes from the server when something has
 * changed or as an answer from a feedback request
 */
export const CHANGED_FEEEDBACK_EVENT = "changed";
/**
 * The changed feedback event contains very specific fields
 */
export interface IChangedFeedbackEvent {
  /**
   * The item definition as a qualified name
   */
  itemDefinition: string;
  /**
   * The slot id of that item definition
   */
  id: number;
  /**
   * The event type
   * modified: means that is has been modified, you should re-request
   * not_found: meants that the item has been deleted
   * last_modified: comes as an answer to a feedback request, check for the last_modified attribute
   * in your client cache to see if the server version is more recent and re-request it if that is
   * the case, check the lastModified property
   */
  type: "modified" | "not_found" | "last_modified";
  /**
   * A timestamp that comes when type=last_modified
   */
  lastModified: string;
}

/**
 * Base form of when a search that adds records to
 */
interface IBaseSearchRecordsAddedEvent {
  /**
   * the qualified path name or type of the either module or item definition
   */
  qualifiedPathName: string;
  /**
   * the new ids that have been added
   */
  newIds: IGQLSearchResult[];
  /**
   * the new last record id
   */
  newLastRecordId: number;
}

/**
 * When they are owned items, as a search has been cached using a creator
 * as a base
 */
export const OWNED_SEARCH_RECORDS_ADDED_EVENT = "owned-search-records-added";
/**
 * The interface adds the creator in its event
 * check [[IOwnedSearchRegisterRequest]]
 */
export interface IOwnedSearchRecordsAddedEvent extends IBaseSearchRecordsAddedEvent {
  createdBy: number;
}

/**
 * When they are parented items the parent type and id, that has been cached
 * using those
 */
export const PARENTED_SEARCH_RECORDS_ADDED_EVENT = "parented-search-records-added";
/**
 * The interface adds the parent type (qualified path name) and parent id (slot id)
 * check [[IParentedSearchRegisterRequest]]
 */
export interface IParentedSearchRecordsAddedEvent extends IBaseSearchRecordsAddedEvent {
  parentType: string;
  parentId: number;
}

// REQUESTS

/**
 * The identify request comes when a socket first connects and identifies
 * itself (this must be the first request, or otherwise other requests will
 * be ignored)
 */
export const IDENTIFY_REQUEST = "identify";
/**
 * Pass an uuid and a token
 */
export interface IIdentifyRequest {
  uuid: string;
  token: string;
}

/**
 * The request that is sent to the server in order to register
 * a single item definition for updates and changes
 */
export const REGISTER_REQUEST = "register";
/**
 * The register event contains the item definition qualified
 * path name and the slot id
 */
export interface IRegisterRequest {
  itemDefinition: string;
  id: number;
}

/**
 * Request to unregister and stop getting notifications from
 * a single item definition
 */
export const UNREGISTER_REQUEST = "unregister";
/**
 * This mirrors [[IRegisterRequest]]
 */
export interface IUnregisterRequest {
  itemDefinition: string;
  id: number;
}

/**
 * a request that is sent to the server in order to
 * request feedback for a single item definition
 */
export const FEEDBACK_REQUEST = "feedback";
/**
 * The feedback request is similar to the register and unregister
 * which mirrors [[IRegisterRequest]]
 */
export interface IFeedbackRequest {
  itemDefinition: string;
  id: number;
}

/**
 * A request that is sent to the server to register
 * listening for changes in an owned or parented search
 * either by module or item definition
 *
 * This is the request version [[IBaseSearchRecordsAddedEvent]]
 */
interface IBaseSearchRegisterRequest {
  qualifiedPathName: string;
}

/**
 * this is necessary for owned searches in order to run created by
 * cached searches and then request for updates
 */
export const OWNED_SEARCH_REGISTER_REQUEST = "owned-search-register";
/**
 * The owned serach register request to register owned searches by adding a created by field
 * check [[IOwnedSearchRecordsAddedEvent]]
 */
export interface IOwnedSearchRegisterRequest extends IBaseSearchRegisterRequest {
  createdBy: number;
}

/**
 * this is necessary for parented searches in order to run parented by
 * cached searches and then request for updates
 */
export const PARENTED_SEARCH_REGISTER_REQUEST = "parented-search-register";
/**
 * The parented search register request adds the parent type and parent id
 * check [[IParentedSearchRecordsAddedEvent]]
 */
export interface IParentedSearchRegisterRequest extends IBaseSearchRegisterRequest {
  parentType: string;
  parentId: number;
}

/**
 * A request that is sent to the server to unregister
 * listening for changes in an owned or parented search
 * either by module or item definition
 */
interface IBaseSearchUnregisterRequest {
  qualifiedPathName: string;
}

/**
 * The unregister version of [[OWNED_SEARCH_REGISTER_REQUEST]]
 */
export const OWNED_SEARCH_UNREGISTER_REQUEST = "owned-search-unregister";
/**
 * The unregister version of [[IOwnedSearchRegisterRequest]]
 */
export interface IOwnedSearchUnregisterRequest extends IBaseSearchUnregisterRequest {
  createdBy: number;
}

/**
 * The unregister version of [[PARENTED_SEARCH_REGISTER_REQUEST]]
 */
export const PARENTED_SEARCH_UNREGISTER_REQUEST = "parented-search-unregister";
/**
 * The unregister version of [[IParentedSearchRegisterRequest]]
 */
export interface IParentedSearchUnregisterRequest extends IBaseSearchUnregisterRequest {
  parentType: string;
  parentId: number;
}

/**
 * a request that is sent to the server in order to
 * request feedback for a search, either by module
 * or item definition
 */
interface IBaseSearchFeedbackRequest {
  /**
   * The qualified path name either by module
   * or item definition
   */
  qualifiedPathName: string;
  /**
   * This is the database id field
   * since they come in order it's easy to know if
   * something has been added
   */
  knownLastRecordId: number;
}

/**
 * The feedback version of [[PARENTED_SEARCH_REGISTER_REQUEST]]
 */
export const OWNED_SEARCH_FEEDBACK_REQUEST = "owned-search-feedback";
/**
 * The feedback version of [[IParentedSearchRegisterRequest]]
 */
export interface IOwnedSearchFeedbackRequest extends IBaseSearchFeedbackRequest {
  createdBy: number;
}

/**
 * The feedback version of [[PARENTED_SEARCH_REGISTER_REQUEST]]
 */
export const PARENTED_SEARCH_FEEDBACK_REQUEST = "parented-search-feedback";
/**
 * The feedback version of [[IParentedSearchRegisterRequest]]
 */
export interface IParentedSearchFeedbackRequest extends IBaseSearchFeedbackRequest {
  parentType: string;
  parentId: number;
}
