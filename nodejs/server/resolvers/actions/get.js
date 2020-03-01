"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ItemDefinition_1 = require("../../../base/Root/Module/ItemDefinition");
const debug_1 = __importDefault(require("debug"));
const basic_1 = require("../basic");
const graphql_fields_1 = __importDefault(require("graphql-fields"));
const constants_1 = require("../../../constants");
const gql_util_1 = require("../../../gql-util");
const errors_1 = require("../../../base/errors");
const getItemDefinitionDebug = debug_1.default("resolvers:getItemDefinition");
async function getItemDefinition(appData, resolverArgs, itemDefinition) {
    getItemDefinitionDebug("EXECUTED for %s", itemDefinition.getQualifiedPathName());
    // first we check that the language and region provided are
    // right and available
    basic_1.checkLanguage(appData, resolverArgs.args);
    const tokenData = await basic_1.validateTokenAndGetData(appData, resolverArgs.args.token);
    await basic_1.validateTokenIsntBlocked(appData.cache, tokenData);
    // now we find the requested fields that are requested
    // in the get request
    const rawFields = graphql_fields_1.default(resolverArgs.info);
    const requestedFields = gql_util_1.flattenRawGQLValueOrFields(rawFields);
    basic_1.checkBasicFieldsAreAvailableForRole(itemDefinition, tokenData, requestedFields);
    // so we run the policy check for read, this item definition,
    // with the given id
    const selectQueryValue = await basic_1.runPolicyCheck({
        policyTypes: ["read"],
        itemDefinition,
        id: resolverArgs.args.id,
        version: resolverArgs.args.version || null,
        role: tokenData.role,
        gqlArgValue: resolverArgs.args,
        gqlFlattenedRequestedFiels: requestedFields,
        cache: appData.cache,
        preValidation: (content) => {
            // if there is no content, we force the entire policy check not to
            // be performed and return null
            if (!content) {
                return null;
            }
        },
    });
    // we get the requested fields that take part of the item definition
    // description
    const requestedFieldsInIdef = {};
    Object.keys(requestedFields).forEach((arg) => {
        if (itemDefinition.hasPropertyDefinitionFor(arg, true) ||
            arg.startsWith(constants_1.INCLUDE_PREFIX) && itemDefinition.hasIncludeFor(arg.replace(constants_1.INCLUDE_PREFIX, ""))) {
            requestedFieldsInIdef[arg] = requestedFields[arg];
        }
    });
    // if we don't have any result, we cannot even check permissions
    // the thing does not exist, returning null
    if (!selectQueryValue) {
        // now there is not much but to run this function
        // as a gimmick, we use -1 as the user id to make
        // some sort of global user, as OWNER rules clearly
        // do not apply, we want to throw an error
        // still to the user even though there is no data
        // to protect because the result comes whole thing
        // null, but still, just to keep some consistency we
        // run this function
        itemDefinition.checkRoleAccessFor(ItemDefinition_1.ItemDefinitionIOActions.READ, tokenData.role, tokenData.id, constants_1.UNSPECIFIED_OWNER, requestedFieldsInIdef, true);
        getItemDefinitionDebug("no result founds, returning null");
        // We do not return the 404, just return null in this case
        return null;
    }
    getItemDefinitionDebug("SQL result found as %j", selectQueryValue);
    getItemDefinitionDebug("Checking role access for read");
    let userId = selectQueryValue.created_by;
    if (itemDefinition.isOwnerObjectId()) {
        userId = selectQueryValue.id;
    }
    // now we check the role access, this function will throw an error
    // if that fails, and we only check for the requested fields
    itemDefinition.checkRoleAccessFor(ItemDefinition_1.ItemDefinitionIOActions.READ, tokenData.role, tokenData.id, userId, requestedFieldsInIdef, true);
    const valueToProvide = basic_1.filterAndPrepareGQLValue(selectQueryValue, requestedFields, tokenData.role, itemDefinition);
    getItemDefinitionDebug("SUCCEED with %j", valueToProvide.toReturnToUser);
    // return if otherwise succeeds
    return valueToProvide.toReturnToUser;
}
exports.getItemDefinition = getItemDefinition;
const getItemDefinitionListDebug = debug_1.default("resolvers:getItemDefinitionList");
async function getItemDefinitionList(appData, resolverArgs, itemDefinition) {
    getItemDefinitionListDebug("EXECUTED for %s", itemDefinition.getQualifiedPathName());
    // first we check that the language and region provided are
    // right and available
    basic_1.checkLanguage(appData, resolverArgs.args);
    basic_1.checkListLimit(resolverArgs.args.ids);
    const mod = itemDefinition.getParentModule();
    basic_1.checkListTypes(resolverArgs.args.ids, mod);
    const tokenData = await basic_1.validateTokenAndGetData(appData, resolverArgs.args.token);
    basic_1.checkReadPoliciesAllowThisUserToSearch(itemDefinition, tokenData.role);
    // now we find the requested fields that are requested
    // in the get request
    const requestedFields = gql_util_1.flattenRawGQLValueOrFields(graphql_fields_1.default(resolverArgs.info).results);
    basic_1.checkBasicFieldsAreAvailableForRole(itemDefinition, tokenData, requestedFields);
    // we get the requested fields that take part of the item definition
    // description
    const requestedFieldsInIdef = {};
    Object.keys(requestedFields).forEach((arg) => {
        if (itemDefinition.hasPropertyDefinitionFor(arg, true) ||
            arg.startsWith(constants_1.INCLUDE_PREFIX) && itemDefinition.hasIncludeFor(arg.replace(constants_1.INCLUDE_PREFIX, ""))) {
            requestedFieldsInIdef[arg] = requestedFields[arg];
        }
    });
    getItemDefinitionListDebug("Extracted requested fields from idef as %j", requestedFieldsInIdef);
    const created_by = resolverArgs.args.created_by;
    let ownerToCheckAgainst = constants_1.UNSPECIFIED_OWNER;
    if (created_by) {
        ownerToCheckAgainst = created_by;
    }
    itemDefinition.checkRoleAccessFor(ItemDefinition_1.ItemDefinitionIOActions.READ, tokenData.role, tokenData.id, ownerToCheckAgainst, requestedFieldsInIdef, true);
    // preventing a security leak here by ensuring that the type that we are searching
    // in the list is all consistent for the type of this item definition, when requesting
    // the cache and the query that will be used as a table name, as the type is the same
    // as the qualified path name and the table name, so by ensuring it's a legit name
    // we ensure there is no leak
    const selfTableType = itemDefinition.getQualifiedPathName();
    resolverArgs.args.ids.forEach((argId) => {
        if (argId.type !== selfTableType) {
            throw new errors_1.EndpointError({
                message: "Invalid id container type that didn't match the qualified name " + selfTableType,
                code: constants_1.ENDPOINT_ERRORS.UNSPECIFIED,
            });
        }
    });
    const resultValues = await appData.cache.requestListCache(resolverArgs.args.ids);
    const finalValues = resultValues.map((value) => {
        // preveting another security leak here, the user might have lied by saying that these
        // items were all created by this specific creator when doing searches
        if (created_by && value.created_by !== created_by) {
            throw new errors_1.EndpointError({
                message: "created_by mismatch, one of the items requested was not created by whom it was claimed",
                code: constants_1.ENDPOINT_ERRORS.UNSPECIFIED,
            });
        }
        return basic_1.filterAndPrepareGQLValue(value, requestedFields, tokenData.role, itemDefinition).toReturnToUser;
    });
    const resultAsObject = {
        results: finalValues,
    };
    getItemDefinitionListDebug("SUCCEED");
    return resultAsObject;
}
exports.getItemDefinitionList = getItemDefinitionList;
const getModuleListDebug = debug_1.default("resolvers:getModuleList");
async function getModuleList(appData, resolverArgs, mod) {
    console.log(mod.getQualifiedPathName());
    getModuleListDebug("EXECUTED for %s", mod.getQualifiedPathName());
    // first we check that the language and region provided are
    // right and available
    basic_1.checkLanguage(appData, resolverArgs.args);
    basic_1.checkListLimit(resolverArgs.args.ids);
    basic_1.checkListTypes(resolverArgs.args.ids, mod);
    const tokenData = await basic_1.validateTokenAndGetData(appData, resolverArgs.args.token);
    await basic_1.validateTokenIsntBlocked(appData.cache, tokenData);
    // now we find the requested fields that are requested
    // in the get request
    const requestedFields = gql_util_1.flattenRawGQLValueOrFields(graphql_fields_1.default(resolverArgs.info).results);
    basic_1.checkBasicFieldsAreAvailableForRole(mod, tokenData, requestedFields);
    // we get the requested fields that take part of the item definition
    // description
    const requestedFieldsInMod = {};
    Object.keys(requestedFields).forEach((arg) => {
        if (mod.hasPropExtensionFor(arg)) {
            requestedFieldsInMod[arg] = requestedFields[arg];
        }
    });
    getModuleListDebug("Requested fields calculated as %j", requestedFieldsInMod);
    getModuleListDebug("Checking role access for read");
    const created_by = resolverArgs.args.created_by;
    let ownerToCheckAgainst = constants_1.UNSPECIFIED_OWNER;
    if (created_by) {
        ownerToCheckAgainst = created_by;
    }
    mod.checkRoleAccessFor(ItemDefinition_1.ItemDefinitionIOActions.READ, tokenData.role, tokenData.id, ownerToCheckAgainst, requestedFieldsInMod, true);
    const resultValues = await appData.cache.requestListCache(resolverArgs.args.ids);
    // return if otherwise succeeds
    const finalValues = resultValues.map((value) => {
        // preveting another security leak here, the user might have lied by saying that these
        // items were all created by this specific creator when doing searches
        if (created_by && value.created_by !== created_by) {
            throw new errors_1.EndpointError({
                message: "created_by mismatch, one of the items requested was not created by whom it was claimed",
                code: constants_1.ENDPOINT_ERRORS.UNSPECIFIED,
            });
        }
        return basic_1.filterAndPrepareGQLValue(value, requestedFields, tokenData.role, mod).toReturnToUser;
    });
    const resultAsObject = {
        results: finalValues,
    };
    getModuleListDebug("SUCCEED");
    return resultAsObject;
}
exports.getModuleList = getModuleList;
function getItemDefinitionFn(appData) {
    return getItemDefinition.bind(null, appData);
}
exports.getItemDefinitionFn = getItemDefinitionFn;
function getItemDefinitionListFn(appData) {
    return getItemDefinitionList.bind(null, appData);
}
exports.getItemDefinitionListFn = getItemDefinitionListFn;
function getModuleListFn(appData) {
    return getModuleList.bind(null, appData);
}
exports.getModuleListFn = getModuleListFn;
