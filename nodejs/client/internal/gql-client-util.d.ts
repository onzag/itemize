import { IOrderByRuleType } from "../../constants";
import ItemDefinition from "../../base/Root/Module/ItemDefinition";
import { IGQLValue, IGQLRequestFields, IGQLArgs, IGQLSearchRecord } from "../../gql-querier";
import { EndpointErrorType } from "../../base/errors";
import { RemoteListener } from "./app/remote-listener";
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
}): {
    requestFields: any;
    argumentsForQuery: any;
};
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
