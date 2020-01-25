import { IGQLSearchResult } from "../gql-querier";

// EVENTS
export const BUILDNUMBER_EVENT = "buildnumber";
export interface IBuildNumberEvent {
  buildnumber: string;
}

// Event that comes from the server when something has
// changed or as an answer from a feedback request
export const CHANGED_FEEEDBACK_EVENT = "changed";
export interface IChangedFeedbackEvent {
  itemDefinition: string;
  id: number;
  type: "modified" | "not_found" | "last_modified";
  lastModified: string;
}

// Base form of when a search that adds records to
interface IBaseSearchRecordsAddedEvent {
  // the qualified path name or type of the either module or item definition
  qualifiedPathName: string;
  // the new ids that have been added
  newIds: IGQLSearchResult[];
  // the new last record id
  newLastRecordId: number;
}

// When they are owned items the creator of these
export const OWNED_SEARCH_RECORDS_ADDED_EVENT = "owned-search-records-added";
export interface IOwnedSearchRecordsAddedEvent extends IBaseSearchRecordsAddedEvent {
  createdBy: number;
}

// When they are parented items the parent type and id
export const PARENTED_SEARCH_RECORDS_ADDED_EVENT = "parented-search-records-added";
export interface IParentedSearchRecordsAddedEvent extends IBaseSearchRecordsAddedEvent {
  parentType: string;
  parentId: number;
}

// REQUESTS
export const IDENTIFY_REQUEST = "identify";
export interface IIdentifyRequest {
  uuid: string;
  token: string;
}

// The request that is sent to the server in order to register
// a single item definition for updates and changes
export const REGISTER_REQUEST = "register";
export interface IRegisterRequest {
  itemDefinition: string;
  id: number;
}

// Request to unregister and stop getting notifications from
// a single item definition
export const UNREGISTER_REQUEST = "unregister";
export interface IUnregisterRequest {
  itemDefinition: string;
  id: number;
}

// a request that is sent to the server in order to
// request feedback for a single item definition
export const FEEDBACK_REQUEST = "feedback";
export interface IFeedbackRequest {
  itemDefinition: string;
  id: number;
}

// A request that is sent to the server to register
// listening for changes in an owned or parented search
// either by module or item definition
interface IBaseSearchRegisterRequest {
  qualifiedPathName: string;
}

// this is necessary for owned searches
export const OWNED_SEARCH_REGISTER_REQUEST = "owned-search-register";
export interface IOwnedSearchRegisterRequest extends IBaseSearchRegisterRequest {
  createdBy: number;
}

// and this for parented
export const PARENTED_SEARCH_REGISTER_REQUEST = "parented-search-register";
export interface IParentedSearchRegisterRequest extends IBaseSearchRegisterRequest {
  parentType: string;
  parentId: number;
}

// A request that is sent to the server to unregister
// listening for changes in an owned or parented search
// either by module or item definition
interface IBaseSearchUnregisterRequest {
  qualifiedPathName: string;
}

// this is necessary for owned searches
export const OWNED_SEARCH_UNREGISTER_REQUEST = "owned-search-unregister";
export interface IOwnedSearchUnregisterRequest extends IBaseSearchUnregisterRequest {
  createdBy: number;
}

// and this for parented
export const PARENTED_SEARCH_UNREGISTER_REQUEST = "parented-search-unregister";
export interface IParentedSearchUnregisterRequest extends IBaseSearchUnregisterRequest {
  parentType: string;
  parentId: number;
}

// a request that is sent to the server in order to
// request feedback for a search, either by module
// or item definition
interface IBaseSearchFeedbackRequest {
  qualifiedPathName: string;
  knownLastRecordId: number;
}

// this is necessary for owned searches
export const OWNED_SEARCH_FEEDBACK_REQUEST = "owned-search-feedback";
export interface IOwnedSearchFeedbackRequest extends IBaseSearchFeedbackRequest {
  createdBy: number;
}

// and this for parented
export const PARENTED_SEARCH_FEEDBACK_REQUEST = "parented-search-feedback";
export interface IParentedSearchFeedbackRequest extends IBaseSearchFeedbackRequest {
  parentType: string;
  parentId: number;
}
