import ItemDefinition from "../../base/Root/Module/ItemDefinition";
import Module from "../../base/Root/Module";
import { IAppDataType } from "..";
import Include from "../../base/Root/Module/ItemDefinition/Include";
import { Cache } from "../cache";
import { ISQLTableRowValue } from "../../base/Root/sql";
import { IGQLValue, IGQLSearchResult } from "../../gql-querier";
/**
 * Builds the column names expected for a given module only
 * @param requestedFields the requested fields given by graphql fields and flattened
 * @param mod the module in question
 */
export declare function buildColumnNamesForModuleTableOnly(requestedFields: any, mod: Module): string[];
/**
 * Builds the column names expected for a given item definition only
 * ignoring all the extensions and base fields
 * @param requestedFields the requested fields given by graphql fields and flattened
 * @param itemDefinition item definition in question
 * @param prefix a prefix to append to everything
 */
export declare function buildColumnNamesForItemDefinitionTableOnly(requestedFields: any, itemDefinition: ItemDefinition, prefix?: string): string[];
export interface IServerSideTokenDataType {
    id: number;
    role: string;
}
/**
 * Given a token, it validates and provides the role information
 * for use in the system
 * @param token the token passed via the args
 */
export declare function validateTokenAndGetData(appData: IAppDataType, token: string): Promise<IServerSideTokenDataType>;
export declare function validateParentingRules(appData: IAppDataType, id: number, version: string, type: string, itemDefinition: ItemDefinition, userId: number, role: string): Promise<void>;
/**
 * Checks if the basic fields are available for the given role, basic
 * fields are of those reserved properties that are in every module
 * @param tokenData the token data that is obtained via the validateTokenAndGetData
 * function
 * @param requestedFields the requested fields
 */
export declare function checkBasicFieldsAreAvailableForRole(itemDefinitionOrModule: ItemDefinition | Module, tokenData: IServerSideTokenDataType, requestedFields: any): void;
/**
 * Checks a list provided by the getter functions that use
 * lists to ensure the request isn't too large
 * @param ids the list ids that have been requested
 */
export declare function checkListLimit(ids: IGQLSearchResult[]): void;
export declare function checkListTypes(ids: IGQLSearchResult[], mod: Module): void;
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
export declare function validateTokenIsntBlocked(cache: Cache, tokenData: IServerSideTokenDataType): Promise<void>;
export declare function checkUserExists(cache: Cache, id: number): Promise<void>;
export interface IFilteredAndPreparedValueType {
    toReturnToUser: any;
    actualValue: any;
}
/**
 * Filters and prepares a graphql value for output to the rest endpoint
 * given the value that has given by the server, the requested fields
 * that are supposed to be outputted, the role of the current user
 * and the parent module or item definition this value belongs to,
 * the form comes with the DATA and the externalized fields
 * @param value the value gotten from the sql database
 * @param requestedFields the requested fields
 * @param role the role of the user requesting the data
 * @param parentModuleOrIdef the parent module or item definition the value belongs to
 */
export declare function filterAndPrepareGQLValue(value: any, requestedFields: any, role: string, parentModuleOrIdef: ItemDefinition | Module): IFilteredAndPreparedValueType;
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
    preValidation?: (content: ISQLTableRowValue) => void | ISQLTableRowValue;
    parentModule?: string;
    parentType?: string;
    parentId?: number;
    parentVersion?: string;
    preParentValidation?: (content: ISQLTableRowValue) => void | ISQLTableRowValue;
}): Promise<ISQLTableRowValue>;