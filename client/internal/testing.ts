/**
 * This file contains the global testing type and utilities
 * to provide a tester with information during UI tests of what
 * is currently in the page
 * 
 * This data is serializable on purpose
 * 
 * @packageDocumentation
 */

import {
  IChangedFeedbackEvent,
  IErrorEvent,
  IFeedbackRequest,
  IIdentifyRequest,
  IOwnedSearchFeedbackRequest,
  IOwnedSearchRecordsAddedEvent,
  IOwnedSearchRegisterRequest,
  IOwnedSearchUnregisterRequest,
  IParentedSearchFeedbackRequest,
  IParentedSearchRecordsAddedEvent,
  IParentedSearchRegisterRequest,
  IParentedSearchUnregisterRequest,
  IRegisterRequest,
  IUnregisterRequest,
} from "../../base/remote-protocol";

export interface IMountedItem {
  instanceUUID: string;
  module: string;
  itemDefinition: string;
  isExtensions: boolean;
  isSearchMode: boolean;
  id: number;
  version: string;
  wasContentLoadedFromMemory: boolean;
  wasFound: boolean;
  hadAFallback: boolean;
  staticStatus: "TOTAL" | "NO_LISTENING";
  avoidsLoading: boolean;
  mountTime: string;
  updateTime: string;
  unmountTime: string;
}

export interface IMountedModule {
  instanceUUID: string;
  module: string;
  mountTime: string;
  updateTime: string;
  unmountTime: string;
}

export interface IErrorEventWithTime extends IErrorEvent {
  time: string;
}

export interface IIdentifyRequestWithTime extends IIdentifyRequest {
  time: string;
}

export interface IFeedbackRequestWithTime extends IFeedbackRequest {
  time: string;
}

export interface IOwnedSearchFeedbackRequestWithTime extends IOwnedSearchFeedbackRequest {
  time: string;
}

export interface IParentedSearchFeedbackRequestWithTime extends IParentedSearchFeedbackRequest {
  time: string;
}

export interface IRegisterRequestWithTime extends IRegisterRequest {
  time: string;
}

export interface IUnregisterRequestWithTime extends IUnregisterRequest {
  time: string;
}

export interface IOwnedSearchRegisterRequestWithTime extends IOwnedSearchRegisterRequest {
  time: string;
}

export interface IOwnedSearchUnregisterRequestWithTime extends IOwnedSearchUnregisterRequest {
  time: string;
}

export interface IParentedSearchRegisterRequestWithTime extends IParentedSearchRegisterRequest {
  time: string;
}

export interface IParentedSearchUnregisterRequestWithTime extends IParentedSearchUnregisterRequest {
  time: string;
}

export interface IIdentifiedEventWithTime {
  time: string;
}

export interface IChangedFeedbackEventWithTime extends IChangedFeedbackEvent {
  time: string;
}

export interface IOwnedSearchRecordsAddedEventWithTime extends IOwnedSearchRecordsAddedEvent {
  time: string;
}

export interface IParentedSearchRecordsAddedEventWithTime extends IParentedSearchRecordsAddedEvent {
  time: string;
}

export interface IMountedExplorers {
  id: string;
  label: string;
  time: string;
}

export interface IGlobalTestingType {
  mountedItems: IMountedItem[];
  mountedModules: IMountedModule[];
  mountedExplorers: IMountedExplorers[];
  socket: {
    errors: IErrorEventWithTime[];

    // requests
    identifyRequests: IIdentifyRequestWithTime[];
    feedbackRequests: IFeedbackRequestWithTime[];
    ownedSearchFeedbackRequests: IOwnedSearchFeedbackRequestWithTime[];
    parentedSearchFeebackRequests: IParentedSearchFeedbackRequestWithTime[];
    registerRequests: IRegisterRequestWithTime[];
    unregisterRequests: IUnregisterRequestWithTime[];
    ownedSearchRegisterRequests: IOwnedSearchRegisterRequestWithTime[];
    ownedSearchUnregisterRequests: IOwnedSearchUnregisterRequestWithTime[];
    parentedSearchRegisterRequests: IParentedSearchRegisterRequestWithTime[];
    parentedSearchUnregisterRequests: IParentedSearchUnregisterRequestWithTime[];

    // events
    identifiedEvents: IIdentifiedEventWithTime[];
    changedFeedbackEvents: IChangedFeedbackEventWithTime[];
    ownedSearchRecordsAddedEvents: IOwnedSearchRecordsAddedEventWithTime[];
    parentedSearchRecordsAddedEvents: IParentedSearchRecordsAddedEventWithTime[];
  }
}

export function setupTesting() {
  if (process.env.NODE_ENV === "development") {
    window.TESTING = {
      mountedItems: [],
      mountedModules: [],
      mountedExplorers: [],
      socket: {
        errors: [],
        identifyRequests: [],
        feedbackRequests: [],
        ownedSearchFeedbackRequests: [],
        parentedSearchFeebackRequests: [],
        registerRequests: [],
        unregisterRequests: [],
        ownedSearchRegisterRequests: [],
        ownedSearchUnregisterRequests: [],
        parentedSearchRegisterRequests: [],
        parentedSearchUnregisterRequests: [],
        identifiedEvents: [],
        changedFeedbackEvents: [],
        ownedSearchRecordsAddedEvents: [],
        parentedSearchRecordsAddedEvents: [],
      },
    }
  }
}