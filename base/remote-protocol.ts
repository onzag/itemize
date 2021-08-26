/**
 * Contains a protocol to be used with remote realtime communication in order
 * to supply realtime updates between the server and the client
 *
 * This is just a bunch of types that specifies a protocol this is the protocol
 * that is implemented by the remote listener
 *
 * @module
 */

import { IGQLSearchRecord } from "../gql-querier";

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
 * This event occurs when the currency factors have been changed and it streams to
 * every socket that just happens to be connected, not just identified but just
 * connected into it, while the data could be attached, we really want to perform
 * the request to the server in order to ensure that it is cached
 */
export const CURRENCY_FACTORS_UPDATED_EVENT = "currency-factors-updated";

/**
 * This is streamed to the client once the server hits an error
 * that was somehow caused by the client, there's no much use
 * for an error event other than notice invalid requests
 */
export const ERROR_EVENT = "listener-error";

/**
 * The shape of the error itself
 */
export interface IErrorEvent {
  message: string;
  request: any;
}

/**
 * Identified event comes once the user has been identified properly
 */
export const IDENTIFIED_EVENT = "identified";

/**
 * Event that occurs when the user has been kicked, when log out
 * from all devices has been triggered, users are kicked out and forcefully
 * logged out, this even also occurs on an invalid identified event
 */
export const KICKED_EVENT = "kicked";

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
  id: string;
  /**
   * The version of that item definition
   */
  version: string;
  /**
   * The event type
   * created: similar to modified means the item has been created, you should re-request
   * modified: means that is has been modified, you should re-request
   * not_found: meants that the item has been deleted
   * last_modified: comes as an answer to a feedback request, check for the last_modified attribute
   * in your client cache to see if the server version is more recent and re-request it if that is
   * the case, check the lastModified property
   */
  type: "created" | "modified" | "not_found" | "last_modified";
  /**
   * A timestamp that comes when type=last_modified
   */
  lastModified: string;
}

/**
 * Base form of when a search that adds records to
 */
interface IBaseSearchRecordsEvent {
  /**
   * the qualified path name or type of the either module or item definition
   */
  qualifiedPathName: string;
  /**
   * the new records that have been added
   */
  newRecords: IGQLSearchRecord[];
  /**
   * the records that have been deleted
   */
  lostRecords: IGQLSearchRecord[];
  /**
   * the records that have been modified
   */
  modifiedRecords: IGQLSearchRecord[];
  /**
   * the new last record search result
   */
  newLastModified: string;
}

/**
 * When they are owned items, as a search has been cached using a creator
 * as a base
 */
export const OWNED_SEARCH_RECORDS_EVENT = "owned-search-records";
/**
 * The interface adds the creator in its event
 * check [[IOwnedSearchRegisterRequest]]
 */
export interface IOwnedSearchRecordsEvent extends IBaseSearchRecordsEvent {
  createdBy: string;
}

/**
 * When they are parented items the parent type and id, that has been cached
 * using those
 */
export const PARENTED_SEARCH_RECORDS_EVENT = "parented-search-records";
/**
 * The interface adds the parent type (qualified path name) and parent id (slot id)
 * check [[IParentedSearchRegisterRequest]]
 */
export interface IParentedSearchRecordsEvent extends IBaseSearchRecordsEvent {
  parentType: string;
  parentId: string;
  parentVersion: string;
}

/**
 * When they are owned parented items the parent type and id, that has been cached
 * using those
 */
export const OWNED_PARENTED_SEARCH_RECORDS_EVENT = "owned-parented-search-records";
/**
 * The interface adds the parent type (qualified path name) and parent id (slot id)
 * check [[IParentedSearchRegisterRequest]]
 */
export interface IOwnedParentedSearchRecordsEvent extends IParentedSearchRecordsEvent, IOwnedSearchRecordsEvent {
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

export const IdentifyRequestSchema = {
  type: "object",
  properties: {
    uuid: {
      type: "string",
    },
    token: {
      type: ["string", "null"],
    }
  },
  required: [
    "uuid",
    "token",
  ]
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
  id: string;
  version: string;
}

export const RegisterRequestSchema = {
  type: "object",
  properties: {
    itemDefinition: {
      type: "string",
    },
    id: {
      type: "string",
    },
    version: {
      type: ["string", "null"],
    }
  },
  required: [
    "itemDefinition",
    "id",
    "version",
  ],
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
  id: string;
  version: string;
}

export const UnregisterRequestSchema = {
  type: "object",
  properties: {
    itemDefinition: {
      type: "string",
    },
    id: {
      type: "string",
    },
    version: {
      type: ["string", "null"],
    }
  },
  required: [
    "itemDefinition",
    "id",
    "version",
  ],
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
  id: string;
  version: string;
}

export const FeedbackRequestSchema = {
  type: "object",
  properties: {
    itemDefinition: {
      type: "string",
    },
    id: {
      type: "string",
    },
    version: {
      type: ["string", "null"],
    }
  },
  required: [
    "itemDefinition",
    "id",
    "version",
  ],
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
  createdBy: string;
}

export const OwnedSearchRegisterRequestSchema = {
  type: "object",
  properties: {
    qualifiedPathName: {
      type: "string",
    },
    createdBy: {
      type: "string",
    },
  },
  required: [
    "qualifiedPathName",
    "createdBy",
  ],
}

/**
 * this is necessary for parented searches in order to run parented by
 * cached searches and then request for updates
 */
export const PARENTED_SEARCH_REGISTER_REQUEST = "parented-search-register";

/**
 * this is necessary for parented searches in order to run parented by
 * cached searches and then request for updates
 */
export const OWNED_PARENTED_SEARCH_REGISTER_REQUEST = "owned-parented-search-register";

/**
 * The parented search register request adds the parent type and parent id
 * check [[IParentedSearchRecordsAddedEvent]]
 */
export interface IParentedSearchRegisterRequest extends IBaseSearchRegisterRequest {
  parentType: string;
  parentId: string;
  parentVersion: string;
}
export const ParentedSearchRegisterRequestSchema = {
  type: "object",
  properties: {
    qualifiedPathName: {
      type: "string",
    },
    parentType: {
      type: "string",
    },
    parentId: {
      type: "string",
    },
    parentVersion: {
      type: ["string", "null"],
    },
  },
  required: [
    "qualifiedPathName",
    "parentType",
    "parentId",
    "parentVersion",
  ],
}

/**
 * The owned parented search register request adds the parent type and parent id
 * check [[IOwnedParentedSearchRecordsAddedEvent]]
 */
export interface IOwnedParentedSearchRegisterRequest extends IParentedSearchRegisterRequest, IOwnedSearchRegisterRequest {
}
export const OwnedParentedSearchRegisterRequestSchema = {
  type: "object",
  properties: {
    qualifiedPathName: {
      type: "string",
    },
    parentType: {
      type: "string",
    },
    parentId: {
      type: "string",
    },
    parentVersion: {
      type: ["string", "null"],
    },
    createdBy: {
      type: "string",
    },
  },
  required: [
    "qualifiedPathName",
    "parentType",
    "parentId",
    "parentVersion",
    "createdBy",
  ],
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
  createdBy: string;
}
export const OwnedSearchUnregisterRequestSchema = {
  type: "object",
  properties: {
    qualifiedPathName: {
      type: "string",
    },
    createdBy: {
      type: "string",
    },
  },
  required: [
    "qualifiedPathName",
    "createdBy",
  ],
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
  parentId: string;
  parentVersion: string;
}
export const ParentedSearchUnregisterRequestSchema = {
  type: "object",
  properties: {
    qualifiedPathName: {
      type: "string",
    },
    parentType: {
      type: "string",
    },
    parentId: {
      type: "string",
    },
    parentVersion: {
      type: ["string", "null"],
    },
  },
  required: [
    "qualifiedPathName",
    "parentType",
    "parentId",
    "parentVersion",
  ],
}

/**
 * The unregister version of [[OWNED_PARENTED_SEARCH_REGISTER_REQUEST]]
 */
export const OWNED_PARENTED_SEARCH_UNREGISTER_REQUEST = "owned-parented-search-unregister";
/**
 * The unregister version of [[IOwnedParentedSearchRegisterRequest]]
 */
export interface IOwnedParentedSearchUnregisterRequest extends IOwnedSearchUnregisterRequest, IParentedSearchUnregisterRequest {

};
export const OwnedParentedSearchUnregisterRequestSchema = {
  type: "object",
  properties: {
    qualifiedPathName: {
      type: "string",
    },
    parentType: {
      type: "string",
    },
    parentId: {
      type: "string",
    },
    parentVersion: {
      type: ["string", "null"],
    },
    createdBy: {
      type: "string",
    },
  },
  required: [
    "qualifiedPathName",
    "parentType",
    "parentId",
    "parentVersion",
    "createdBy",
  ],
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
  lastModified: string;
}

/**
 * The feedback version of [[PARENTED_SEARCH_REGISTER_REQUEST]]
 */
export const OWNED_SEARCH_FEEDBACK_REQUEST = "owned-search-feedback";
/**
 * The feedback version of [[IParentedSearchRegisterRequest]]
 */
export interface IOwnedSearchFeedbackRequest extends IBaseSearchFeedbackRequest {
  createdBy: string;
}

export const OwnedSearchFeedbackRequestSchema = {
  type: "object",
  properties: {
    qualifiedPathName: {
      type: "string",
    },
    lastModified: {
      type: ["string", "null"],
    },
    createdBy: {
      type: "string",
    },
  },
  required: [
    "qualifiedPathName",
    "lastModified",
    "createdBy",
  ],
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
  parentId: string;
  parentVersion: string;
}
export const ParentedSearchFeedbackRequestSchema = {
  type: "object",
  properties: {
    qualifiedPathName: {
      type: "string",
    },
    lastModified: {
      type: ["string", "null"],
    },
    parentType: {
      type: "string",
    },
    parentId: {
      type: "string",
    },
    parentVersion: {
      type: ["string", "null"],
    },
  },
  required: [
    "qualifiedPathName",
    "lastModified",
    "parentType",
    "parentId",
    "parentVersion",
  ],
}

/**
 * The feedback version of [[PARENTED_SEARCH_REGISTER_REQUEST]]
 */
export const OWNED_PARENTED_SEARCH_FEEDBACK_REQUEST = "owned-parented-search-feedback";
/**
 * The feedback version of [[IOwnedParentedSearchRegisterRequest]]
 */
export interface IOwnedParentedSearchFeedbackRequest extends IParentedSearchFeedbackRequest, IOwnedSearchFeedbackRequest {

}
export const OwnedParentedSearchFeedbackRequestSchema = {
  type: "object",
  properties: {
    qualifiedPathName: {
      type: "string",
    },
    lastModified: {
      type: ["string", "null"],
    },
    parentType: {
      type: "string",
    },
    parentId: {
      type: "string",
    },
    parentVersion: {
      type: ["string", "null"],
    },
    createdBy: {
      type: "string",
    },
  },
  required: [
    "qualifiedPathName",
    "lastModified",
    "parentType",
    "parentId",
    "parentVersion",
    "createdBy",
  ],
}

export interface IRedisEvent {
  type: string;
  request?: any;
  event?: any;
  listenerUUID?: string;
  source: "local" | "global";
  serverInstanceGroupId: string;
  mergedIndexIdentifier: string;
  data?: any;
}

export function generateBasicMergedIndexIdentifier(
  idefOrMod: string,
  id: string,
  version: string,
) {
  return idefOrMod + "." + id + "." + (version || "")
}

export function generateOwnedSearchMergedIndexIdentifier(
  idefOrModSearchIsAgainst: string,
  createdBy: string,
) {
  return "OWNED_SEARCH." + idefOrModSearchIsAgainst + "." + createdBy
}

export function generateParentedSearchMergedIndexIdentifier(
  idefOrModSearchIsAgainst: string,
  parentType: string,
  parentId: string,
  parentVersion: string,
) {
  return "PARENTED_SEARCH." + idefOrModSearchIsAgainst + "." + parentType + "." + parentId + "." + (parentVersion || "");
}

export function generateOwnedParentedSearchMergedIndexIdentifier(
  idefOrModSearchIsAgainst: string,
  createdBy: string,
  parentType: string,
  parentId: string,
  parentVersion: string,
) {
  return "OWNED_PARENTED_SEARCH." + idefOrModSearchIsAgainst + "." + createdBy + "." + parentType + "." + parentId + "." + (parentVersion || "");
}
