"use strict";
/**
 * Contains a protocol to be used with remote realtime communication in order
 * to supply realtime updates between the server and the client
 *
 * This is just a bunch of types that specifies a protocol
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
// EVENTS
/**
 * The build number event is an event streamed from the
 * server to the client once this client has connected
 */
exports.BUILDNUMBER_EVENT = "buildnumber";
/**
 * Identified event comes once the user has been identified properly
 */
exports.IDENTIFIED_EVENT = "identified";
/**
 * Event that comes from the server when something has
 * changed or as an answer from a feedback request
 */
exports.CHANGED_FEEEDBACK_EVENT = "changed";
/**
 * When they are owned items, as a search has been cached using a creator
 * as a base
 */
exports.OWNED_SEARCH_RECORDS_ADDED_EVENT = "owned-search-records-added";
/**
 * When they are parented items the parent type and id, that has been cached
 * using those
 */
exports.PARENTED_SEARCH_RECORDS_ADDED_EVENT = "parented-search-records-added";
// REQUESTS
/**
 * The identify request comes when a socket first connects and identifies
 * itself (this must be the first request, or otherwise other requests will
 * be ignored)
 */
exports.IDENTIFY_REQUEST = "identify";
/**
 * The request that is sent to the server in order to register
 * a single item definition for updates and changes
 */
exports.REGISTER_REQUEST = "register";
/**
 * Request to unregister and stop getting notifications from
 * a single item definition
 */
exports.UNREGISTER_REQUEST = "unregister";
/**
 * a request that is sent to the server in order to
 * request feedback for a single item definition
 */
exports.FEEDBACK_REQUEST = "feedback";
/**
 * this is necessary for owned searches in order to run created by
 * cached searches and then request for updates
 */
exports.OWNED_SEARCH_REGISTER_REQUEST = "owned-search-register";
/**
 * this is necessary for parented searches in order to run parented by
 * cached searches and then request for updates
 */
exports.PARENTED_SEARCH_REGISTER_REQUEST = "parented-search-register";
/**
 * The unregister version of [[OWNED_SEARCH_REGISTER_REQUEST]]
 */
exports.OWNED_SEARCH_UNREGISTER_REQUEST = "owned-search-unregister";
/**
 * The unregister version of [[PARENTED_SEARCH_REGISTER_REQUEST]]
 */
exports.PARENTED_SEARCH_UNREGISTER_REQUEST = "parented-search-unregister";
/**
 * The feedback version of [[PARENTED_SEARCH_REGISTER_REQUEST]]
 */
exports.OWNED_SEARCH_FEEDBACK_REQUEST = "owned-search-feedback";
/**
 * The feedback version of [[PARENTED_SEARCH_REGISTER_REQUEST]]
 */
exports.PARENTED_SEARCH_FEEDBACK_REQUEST = "parented-search-feedback";
