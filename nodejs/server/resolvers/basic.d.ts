import ItemDefinition from "../../base/Root/Module/ItemDefinition";
import Module from "../../base/Root/Module";
import { IAppDataType } from "..";
import Include from "../../base/Root/Module/ItemDefinition/Include";
import { Cache } from "../cache";
import { ISQLTableRowValue } from "../../base/Root/sql";
import { IGQLValue, IGQLSearchRecord, IGQLArgs, IGQLRequestFields } from "../../gql-querier";
import { ISensitiveConfigRawJSONDataType } from "../../config";
import Knex from "knex";
export interface IServerSideTokenDataType {
    role: string;
    id: number;
    sessionId?: number;
    custom?: boolean;
    isRealUser?: boolean;
    customData?: any;
}
export declare function defaultTriggerForbiddenFunction(message: string): void;
export declare function defaultTriggerInvalidForbiddenFunction(message: string): void;
/**
 * Given a token, it validates and provides the role information
 * for use in the system
 * @param token the token passed via the args
 */
export declare function validateTokenAndGetData(appData: IAppDataType, token: string): Promise<IServerSideTokenDataType>;
/**
 * Validates that the parenting rules are respected for the item definition
 * in question that wants to be created
 * @param appData the app data
 * @param parentId the id of the parent item definition
 * @param parentVersion the version of the parent item definition
 * @param parentType the type of the parent item definition
 * @param itemDefinition the item definition that is attempting to child
 * @param userId the user id
 * @param role the role
 */
export declare function validateParentingRules(appData: IAppDataType, parentId: number, parentVersion: string, parentType: string, itemDefinition: ItemDefinition, userId: number, role: string): Promise<void>;
/**
 * Checks if the basic fields are available for the given role, basic
 * fields are of those reserved properties that are in every module
 * @param tokenData the token data that is obtained via the validateTokenAndGetData
 * function
 * @param requestedFields the requested fields
 */
export declare function checkBasicFieldsAreAvailableForRole(itemDefinitionOrModule: ItemDefinition | Module, tokenData: IServerSideTokenDataType, requestedFields: any): boolean;
export declare function retrieveSince(args: IGQLArgs): string;
export declare function checkLimiters(args: IGQLArgs, idefOrMod: Module | ItemDefinition): void;
/**
 * Checks that the limit of search results is within the range that the item
 * defintion allows
 */
export declare function checkLimit(limit: number, idefOrMod: Module | ItemDefinition, traditional: boolean): void;
export declare function checkListTypes(records: IGQLSearchRecord[], mod: Module): void;
/**
 * Checks the language and region given the arguments passed
 * by the graphql resolver
 * @param appData the app data that is currently in context
 * @param args the args themselves being passed to the resolver
 */
export declare function checkLanguage(appData: IAppDataType, args: any): void;
/**
 * This just extracts the dictionary given the app data
 * and the language of choice
 * @param appData the app data
 * @param args the whole args of the graphql request
 */
export declare function getDictionary(appData: IAppDataType, args: any): string;
/**
 * Validates and checks that a given container id is valid
 * to store data in
 * @param containerId the container id
 * @param sensitiveConfig the sensitive config
 */
export declare function validateContainerIdIsReal(containerId: string, sensitiveConfig: ISensitiveConfigRawJSONDataType): void;
/**
 * Validates the current token isn't blocked whether it is said so
 * by the rules of the session id, user is removed, or invalid credentials
 * @param cache the appdata cache instance
 * @param tokenData the token data obtained and parsed
 */
export declare function validateTokenIsntBlocked(cache: Cache, tokenData: IServerSideTokenDataType): Promise<void>;
export declare function checkUserExists(cache: Cache, id: number): Promise<void>;
export interface IFilteredAndPreparedValueType {
    toReturnToUser: any;
    actualValue: any;
    requestFields: any;
    convertedValue: any;
}
/**
 * Filters and prepares a graphql value for output to the rest endpoint
 * given the value that has given by the server, the requested fields
 * that are supposed to be outputted, the role of the current user
 * and the parent module or item definition this value belongs to,
 * the form comes with the DATA and the externalized fields
 * @param value the value gotten from the sql database
 * @param requestedFields the requested fields, flattened
 * @param role the role of the user requesting the data
 * @param parentModuleOrIdef the parent module or item definition the value belongs to
 */
export declare function filterAndPrepareGQLValue(knex: Knex, serverData: any, value: IGQLValue, requestedFields: IGQLRequestFields, role: string, parentModuleOrIdef: ItemDefinition | Module): IFilteredAndPreparedValueType;
/**
 * Checks that an item definition current state is
 * valid and that the gqlArgValue provided is a match
 * for this item definition current value, remember
 * that in order to set the state to the gqlArgValue
 * you should run itemDefinition.applyValue(gqlArgValue);
 * @param itemDefinition the item definition in question
 * @param gqlArgValue the arg value that was set
 * @param id the stored item id, if available, or null
 * @param version the stored item version if avaliable
 * @param referredInclude this is an optional include used to basically
 * provide better error logging
 */
export declare function serverSideCheckItemDefinitionAgainst(itemDefinition: ItemDefinition, gqlArgValue: IGQLValue, id: number, version: string, referredInclude?: Include, referredParentOfInclude?: ItemDefinition): Promise<void>;
/**
 * Users cannot search if they have an active read policy in their roles
 * this function checks and throws an error if there's such a thing
 * @param itemDefinition the item definition to check read policies for
 * @param role the role
 */
export declare function checkReadPoliciesAllowThisUserToSearch(itemDefinition: ItemDefinition, role: string): void;
/**
 * Splits the arguments in a graphql query from what it comes to be part
 * of the item definition or module in question and what is extra arguments
 * that are used within the query
 * @param moduleOrItemDefinition the module or item definition
 * @param args the arguments to split
 */
export declare function splitArgsInGraphqlQuery(moduleOrItemDefinition: Module | ItemDefinition, args: IGQLArgs): [IGQLArgs, IGQLArgs];
/**
 * Runs a policy check on the requested information
 * @param arg.policyType the policy type on which the request is made on, edit, delete
 * @param arg.itemDefinition the item definition in question
 * @param arg.id the id of that item definition on the database
 * @param arg.version the version of the item definition on the database
 * @param arg.role the role of the current user
 * @param arg.gqlArgValue the arg value given in the arguments from graphql, where the info should be
 * in qualified path names for the policies
 * @param arg.gqlFlattenedRequestedFiels the flattened request fields that have been requested to read
 * @param arg.cache the cache instance
 * @param arg.preValidation a validation to do, validate if the row doesn't exist here, and anything else necessary
 * the function will crash by Internal server error if no validation is done if the row is null; return
 * a value if you want to force it to return instead without an error
 * @param arg.parentModule the parent module to use in a policy type parent
 * @param arg.parentType the parent type (qualified name and table) to use in a policy type parent
 * @param arg.parentId the parent id to use in a policy type parent
 * @param arg.parentPrevalidation a pre validation to run
 */
export declare function runPolicyCheck(arg: {
    policyTypes: string[];
    itemDefinition: ItemDefinition;
    id: number;
    version: string;
    role: string;
    gqlArgValue: IGQLValue;
    gqlFlattenedRequestedFiels: any;
    cache: Cache;
    knex: Knex;
    preValidation?: (content: ISQLTableRowValue) => void | ISQLTableRowValue;
    parentModule?: string;
    parentType?: string;
    parentId?: number;
    parentVersion?: string;
    preParentValidation?: (content: ISQLTableRowValue) => void | ISQLTableRowValue;
}): Promise<ISQLTableRowValue>;
