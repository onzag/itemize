/**
 * Contains utilities for building a grapqhl client to interact
 * with the server, this is meant only for the javascript context
 * itself as it performs a lot of storing, checking and so on
 * @packageDocumentation
 */
import { IOrderByRuleType } from "../../constants";
import ItemDefinition from "../../base/Root/Module/ItemDefinition";
import { IGQLValue, IGQLRequestFields, IGQLArgs, IGQLSearchRecord } from "../../gql-querier";
import { EndpointErrorType } from "../../base/errors";
import { RemoteListener } from "./app/remote-listener";
import { PropertyDefinitionSupportedType } from "../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
export interface IPropertyOverride {
    id: string;
    value: PropertyDefinitionSupportedType;
}
export interface IIncludeOverride {
    id: string;
    exclusionState?: "INCLUDED" | "EXCLUDED" | "ANY";
    overrides?: IPropertyOverride[];
}
/**
 * Provides the fields and args for an item definition in order
 * to create a query
 * @param options.includeArgs whether to include the args at all
 * @param options.includeFields whether to include fields at all
 * @param options.properties what properties to include in fields
 * @param options.includes what includes to include in the fields
 * @param options.onlyIncludePropertiesForArgs what properties to include in args
 * @param options.onlyIncludeIncludesForArgs what includes to include in args
 * @param appliedOwner the owner that owns this item
 * @param userRole the role of the user
 * @param userId the id of the user
 * @param itemDefinitionInstance the item definition
 * @param forId the slot id if any
 * @param forVersion the version if any
 */
export declare function getFieldsAndArgs(options: {
    includeArgs: boolean;
    includeFields: boolean;
    properties?: string[];
    differingPropertiesOnlyForArgs?: boolean;
    differingIncludesOnlyForArgs?: boolean;
    includes?: string[];
    propertiesForArgs?: string[];
    includesForArgs?: string[];
    policiesForArgs?: [string, string, string][];
    appliedOwner?: number;
    userRole: string;
    userId: number;
    itemDefinitionInstance: ItemDefinition;
    forId: number;
    forVersion: string;
    uniteFieldsWithAppliedValue?: boolean;
    propertyOverrides?: IPropertyOverride[];
    includeOverrides?: IIncludeOverride[];
}): {
    requestFields: any;
    argumentsForQuery: any;
};
/**
 * Runs a get query for a given item definition and its args
 * @param arg the arg to use
 * @param arg.args the args to request the server with, normaly just {}
 * @param arg.fields the fields we are requesting
 * @param arg.returnMemoryCachedValues whether to return values that are cached
 * in memory
 * @param arg.returnWorkerCachedValues whether to return values that are in the cache worker
 * @param arg.returnWorkerCachedValuesIfNoInternet optimally it will request the internet but if it
 * can't connect it will request the worker instead
 * @param arg.itemDefinition the item definition we are requesting for
 * @param arg.id the id we are requesting for
 * @param arg.version the version we are requesting for
 * @param arg.language the language we are using for it, used for dictionary purposes
 * @param arg.token the token we are using
 * @param arg.cacheStore whether to store the results in the cache
 * @returns a promise with a bunch of information
 */
export declare function runGetQueryFor(arg: {
    args: IGQLArgs;
    fields: IGQLRequestFields;
    returnMemoryCachedValues: boolean;
    returnWorkerCachedValues: boolean;
    returnWorkerCachedValuesIfNoInternet?: boolean;
    itemDefinition: ItemDefinition;
    id: number;
    version: string;
    language: string;
    token: string;
    cacheStore: boolean;
}): Promise<{
    error: EndpointErrorType;
    value: IGQLValue;
    memoryCached: boolean;
    cached: boolean;
    getQueryFields: IGQLRequestFields;
}>;
/**
 *
 * @param arg the information for the delete query
 * @param arg.args the args for the delete query, might contain
 * policy information
 * @param arg.itemDefinition the item definition we want to run a delete query for
 * @param arg.id the id we want to delete for
 * @param arg.version the version that we are deleting for (or null)
 * @param arg.token the token to use
 * @param arg.language the language to use, for dictionary purposes
 * @param arg.listenerUUID the listener uuid to send with
 * @param arg.cacheStore whether to cache store the deleted information
 * @returns a promise with an error on whether it succeed or not
 */
export declare function runDeleteQueryFor(arg: {
    args: IGQLArgs;
    itemDefinition: ItemDefinition;
    id: number;
    version: string;
    token: string;
    language: string;
    listenerUUID: string;
    cacheStore: boolean;
}): Promise<{
    error: EndpointErrorType;
}>;
/**
 * Runs an add query for a given item definition
 * @param arg the arg information
 * @param arg.args the graphql args for the add query that contains the information
 * for the stuff we want to add, contains the values, as well as the policies
 * @param arg.fields the fields we want to retrieve as a result of our addition
 * @param arg.itemDefinition the item definition we are adding for
 * @param arg.token the token we are using for the addition process
 * @param arg.language the langauge to use for dictionary purposes
 * @param arg.listenerUUID the listener uuid to inform for changes
 * @param arg.cacheStore whether to store the results of the addition process as a get query
 * @param arg.forId a for id is used along forVersion to create a new version for the given id
 * @param arg.forVersion a for version is used to start versioning the query element
 * @param arg.containerId the container id to use for storage, should be calculated by the client
 * as long as it's valid the server comply; the container id should depend on the location of
 * the user
 * @returns a promise with an error, the fields that can be used to retrieve the same value in a get
 * query, and the value that was retrieved
 */
export declare function runAddQueryFor(arg: {
    args: IGQLArgs;
    fields: IGQLRequestFields;
    itemDefinition: ItemDefinition;
    token: string;
    language: string;
    listenerUUID: string;
    cacheStore: boolean;
    forId: number;
    forVersion: string;
    containerId: string;
}): Promise<{
    error: EndpointErrorType;
    value: IGQLValue;
    getQueryFields: IGQLRequestFields;
}>;
/**
 * Runs an edit query for a given item definition
 * @param arg the arg with the get query information
 * @param arg.args the arg to use the edition for, these contain the new property values
 * as well as any policies that are deemed necessary
 * @param arg.fields the fields to request from the edit query
 * @param arg.itemDefinition the item definition we are editing
 * @param arg.token the token for validation
 * @param arg.langauge the language used, for dictionary purposes
 * @param arg.id the id we are editing
 * @param arg.version the version we are editing, or null
 * @param arg.listenerUUID the listener uuid we are using
 * @param arg.cacheStore whether to store the result of this edition in our cache
 */
export declare function runEditQueryFor(arg: {
    args: IGQLArgs;
    fields: IGQLRequestFields;
    itemDefinition: ItemDefinition;
    token: string;
    language: string;
    id: number;
    version: string;
    listenerUUID: string;
    cacheStore: boolean;
}): Promise<{
    error: EndpointErrorType;
    value: IGQLValue;
    getQueryFields: IGQLRequestFields;
}>;
/**
 * Runs the surprisingly complex search query
 * @param arg the arg for the search operation
 * @param arg.args the search args, contains our search options for the properties
 * such as EXACT_property_id and things like that
 * @param arg.fields the fields we want to request for the result, not the record,
 * these fields are used either for cache policied by-owner or by-parent searches,
 * as well as traditional mode, but they are not used in other circumstances
 * @param arg.itemDefinition the item definition we are running a search query for
 * it should be an extensions instance if we are doing it for a module
 * @param arg.orderBy an order by rule
 * @param arg.createdBy in order to filter by creator, should be present
 * if cachePolicy is by-owner otherwise null
 * @param arg.parentedBy in order to filter by parenting, should be present
 * if cachePolicy is by-parent otherwise null
 * @param arg.traditional a traditional search, doesn't support any cache policy
 * @param arg.limit the limit to limit by, this should be less or equal to the limit
 * that you can get search results (for traditional) or search records (for standard)
 * @param arg.offset the offset to start with, if using a cache policy this must be 0 or otherwise
 * it will cause inconsistencies
 * @param arg.token the token to run the search query for
 * @param arg.language the language for dictionary purposes
 * @param arg.versionFilter an optional filter to filter by a given version so only
 * items matching a version appear
 * @param searchCacheOptions the search cache options used and required for by-owner
 * and by-parent searches
 * @param searchCacheOptions.remoteListener the remote listener object
 * @param searchCacheOptions.onSearchUpdated the function to trigger once the cache policy
 * has indicated records have been added
 * @param searchCacheOptions.preventStaleFeeback when a search query is re-ran data might
 * be considered stale, but we might not want to run a feedback request for this search, this
 * happens when the search upated gets called, an then it will re-run the search, since there was
 * a window of time, dataMightBeStale is true, and it might ask feedback, for something it just
 * modified, this variable can always be false for 100% consistency
 * @returns a promise with the error, results (for traditional), the records, the count
 * which might me larger than the number of records, however the record length should
 * be equal to the limit, and the offset given
 */
export declare function runSearchQueryFor(arg: {
    args: IGQLArgs;
    fields: IGQLRequestFields;
    itemDefinition: ItemDefinition;
    orderBy: IOrderByRuleType;
    createdBy: number;
    parentedBy: {
        itemDefinition: ItemDefinition;
        id: number;
        version: string;
    };
    cachePolicy: "by-owner" | "by-parent" | "none";
    traditional: boolean;
    limit: number;
    offset: number;
    token: string;
    language: string;
    versionFilter?: string;
}, searchCacheOptions: {
    remoteListener: RemoteListener;
    onSearchUpdated: () => void;
    preventStaleFeeback: boolean;
}): Promise<{
    error: EndpointErrorType;
    results?: IGQLValue[];
    records: IGQLSearchRecord[];
    count: number;
    limit: number;
    offset: number;
}>;
