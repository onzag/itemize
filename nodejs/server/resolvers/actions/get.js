"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModuleListFn = exports.getItemDefinitionListFn = exports.getItemDefinitionFn = exports.getModuleList = exports.getItemDefinitionList = exports.getItemDefinition = void 0;
const __1 = require("../../");
const ItemDefinition_1 = require("../../../base/Root/Module/ItemDefinition");
const basic_1 = require("../basic");
const graphql_fields_1 = __importDefault(require("graphql-fields"));
const constants_1 = require("../../../constants");
const gql_util_1 = require("../../../gql-util");
const errors_1 = require("../../../base/errors");
const triggers_1 = require("../triggers");
const sql_1 = require("../../../base/Root/Module/ItemDefinition/sql");
// Used to optimize, it is found out that passing unecessary logs to the transport
// can slow the logger down even if it won't display
const LOG_LEVEL = process.env.LOG_LEVEL;
const CAN_LOG_DEBUG = LOG_LEVEL === "debug" || LOG_LEVEL === "silly" || (!LOG_LEVEL && process.env.NODE_ENV !== "production");
const CAN_LOG_SILLY = LOG_LEVEL === "silly";
async function getItemDefinition(appData, resolverArgs, itemDefinition) {
    CAN_LOG_DEBUG && __1.logger.debug("getItemDefinition: executed get for " + itemDefinition.getQualifiedPathName());
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
        knex: appData.knex,
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
        CAN_LOG_DEBUG && __1.logger.debug("getItemDefinition: no results found returning null");
        // We do not return the 404, just return null in this case
        return null;
    }
    let userId = selectQueryValue.created_by;
    if (itemDefinition.isOwnerObjectId()) {
        userId = selectQueryValue.id;
    }
    CAN_LOG_DEBUG && __1.logger.debug("getItemDefinition: checking role access for read");
    // now we check the role access, this function will throw an error
    // if that fails, and we only check for the requested fields
    itemDefinition.checkRoleAccessFor(ItemDefinition_1.ItemDefinitionIOActions.READ, tokenData.role, tokenData.id, userId, requestedFieldsInIdef, true);
    CAN_LOG_DEBUG && __1.logger.debug("getItemDefinition: SQL ouput retrieved");
    CAN_LOG_SILLY && __1.logger.silly("getItemDefinition: value is", selectQueryValue);
    const valueToProvide = basic_1.filterAndPrepareGQLValue(appData.knex, appData.cache.getServerData(), selectQueryValue, requestedFields, tokenData.role, itemDefinition);
    // now we need to find the triggers
    const pathOfThisIdef = itemDefinition.getAbsolutePath().join("/");
    const mod = itemDefinition.getParentModule();
    const pathOfThisModule = mod.getPath().join("/");
    // and extract the triggers from the registry
    const itemDefinitionTrigger = appData.triggers.itemDefinition.io[pathOfThisIdef];
    const moduleTrigger = appData.triggers.module.io[pathOfThisModule];
    let toReturnToUser = valueToProvide.toReturnToUser;
    if (moduleTrigger || itemDefinitionTrigger) {
        const currentWholeValueAsGQL = sql_1.convertSQLValueToGQLValueForItemDefinition(appData.knex, appData.cache.getServerData(), itemDefinition, selectQueryValue);
        if (moduleTrigger) {
            await moduleTrigger({
                appData,
                itemDefinition,
                module: mod,
                value: currentWholeValueAsGQL,
                update: null,
                extraArgs: resolverArgs.args,
                action: triggers_1.IOTriggerActions.READ,
                id: resolverArgs.args.id,
                version: resolverArgs.args.version || null,
                user: {
                    role: tokenData.role,
                    id: tokenData.id,
                    customData: tokenData.customData,
                },
                forbid: basic_1.defaultTriggerForbiddenFunction,
            });
        }
        if (itemDefinitionTrigger) {
            await itemDefinitionTrigger({
                appData,
                itemDefinition,
                module: mod,
                value: currentWholeValueAsGQL,
                update: null,
                extraArgs: resolverArgs.args,
                action: triggers_1.IOTriggerActions.READ,
                id: resolverArgs.args.id,
                version: resolverArgs.args.version || null,
                user: {
                    role: tokenData.role,
                    id: tokenData.id,
                    customData: tokenData.customData,
                },
                forbid: basic_1.defaultTriggerForbiddenFunction,
            });
        }
    }
    CAN_LOG_DEBUG && __1.logger.debug("getItemDefinition: GQL ouput retrieved");
    CAN_LOG_SILLY && __1.logger.silly("getItemDefinition: value is", toReturnToUser);
    // return if otherwise succeeds
    return toReturnToUser;
}
exports.getItemDefinition = getItemDefinition;
async function getItemDefinitionList(appData, resolverArgs, itemDefinition) {
    CAN_LOG_DEBUG && __1.logger.debug("getItemDefinitionList: executed get list for " + itemDefinition.getQualifiedPathName());
    // first we check that the language and region provided are
    // right and available
    basic_1.checkLanguage(appData, resolverArgs.args);
    basic_1.checkLimit(resolverArgs.args.records.length, itemDefinition, true);
    const mod = itemDefinition.getParentModule();
    basic_1.checkListTypes(resolverArgs.args.records, mod);
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
    CAN_LOG_DEBUG && __1.logger.debug("getItemDefinitionList: Extracted requested fields from idef", requestedFields);
    const created_by = resolverArgs.args.created_by;
    let ownerToCheckAgainst = constants_1.UNSPECIFIED_OWNER;
    if (created_by) {
        ownerToCheckAgainst = created_by;
    }
    CAN_LOG_DEBUG && __1.logger.debug("getItemDefinitionList: checking role access for read");
    itemDefinition.checkRoleAccessFor(ItemDefinition_1.ItemDefinitionIOActions.READ, tokenData.role, tokenData.id, ownerToCheckAgainst, requestedFieldsInIdef, true);
    // preventing a security leak here by ensuring that the type that we are searching
    // in the list is all consistent for the type of this item definition, when requesting
    // the cache and the query that will be used as a table name, as the type is the same
    // as the qualified path name and the table name, so by ensuring it's a legit name
    // we ensure there is no leak
    const selfTableType = itemDefinition.getQualifiedPathName();
    resolverArgs.args.records.forEach((argId) => {
        if (argId.type !== selfTableType) {
            throw new errors_1.EndpointError({
                message: "Invalid id container type that didn't match the qualified name " + selfTableType,
                code: constants_1.ENDPOINT_ERRORS.UNSPECIFIED,
            });
        }
    });
    const resultValues = await appData.cache.requestListCache(resolverArgs.args.records);
    const finalValues = await Promise.all(resultValues.map(async (value) => {
        // preveting another security leak here, the user might have lied by saying that these
        // items were all created by this specific creator when doing searches
        if (created_by && value.created_by !== created_by) {
            throw new errors_1.EndpointError({
                message: "created_by mismatch, one of the items requested was not created by whom it was claimed",
                code: constants_1.ENDPOINT_ERRORS.UNSPECIFIED,
            });
        }
        const valueToProvide = basic_1.filterAndPrepareGQLValue(appData.knex, appData.cache.getServerData(), value, requestedFields, tokenData.role, itemDefinition);
        const pathOfThisModule = mod.getPath().join("/");
        const pathOfThisIdef = itemDefinition.getPath().join("/");
        const moduleTrigger = appData.triggers.module.io[pathOfThisModule];
        const itemDefinitionTrigger = appData.triggers.itemDefinition.io[pathOfThisIdef];
        if (moduleTrigger || itemDefinitionTrigger) {
            const currentWholeValueAsGQL = sql_1.convertSQLValueToGQLValueForItemDefinition(appData.knex, appData.cache.getServerData(), itemDefinition, value);
            if (moduleTrigger) {
                await moduleTrigger({
                    appData,
                    itemDefinition,
                    module: mod,
                    value: currentWholeValueAsGQL,
                    update: null,
                    extraArgs: resolverArgs.args,
                    action: triggers_1.IOTriggerActions.READ,
                    id: value.id,
                    version: value.version || null,
                    user: {
                        role: tokenData.role,
                        id: tokenData.id,
                        customData: tokenData.customData,
                    },
                    forbid: basic_1.defaultTriggerForbiddenFunction,
                });
            }
            if (itemDefinitionTrigger) {
                await itemDefinitionTrigger({
                    appData,
                    itemDefinition,
                    module: mod,
                    value: currentWholeValueAsGQL,
                    update: null,
                    extraArgs: resolverArgs.args,
                    action: triggers_1.IOTriggerActions.READ,
                    id: value.id,
                    version: value.version || null,
                    user: {
                        role: tokenData.role,
                        id: tokenData.id,
                        customData: tokenData.customData,
                    },
                    forbid: basic_1.defaultTriggerForbiddenFunction,
                });
            }
        }
        return valueToProvide.toReturnToUser;
    }));
    const resultAsObject = {
        results: finalValues,
    };
    CAN_LOG_DEBUG && __1.logger.debug("getItemDefinitionList: done");
    return resultAsObject;
}
exports.getItemDefinitionList = getItemDefinitionList;
async function getModuleList(appData, resolverArgs, mod) {
    CAN_LOG_DEBUG && __1.logger.debug("getModuleList: executed get list for " + mod.getQualifiedPathName());
    // first we check that the language and region provided are
    // right and available
    basic_1.checkLanguage(appData, resolverArgs.args);
    basic_1.checkLimit(resolverArgs.args.records.length, mod, true);
    basic_1.checkListTypes(resolverArgs.args.records, mod);
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
    CAN_LOG_DEBUG && __1.logger.debug("getModuleList: Extracted requested fields from idef", requestedFieldsInMod);
    const created_by = resolverArgs.args.created_by;
    let ownerToCheckAgainst = constants_1.UNSPECIFIED_OWNER;
    if (created_by) {
        ownerToCheckAgainst = created_by;
    }
    CAN_LOG_DEBUG && __1.logger.debug("getModuleList: checking role access for read");
    mod.checkRoleAccessFor(ItemDefinition_1.ItemDefinitionIOActions.READ, tokenData.role, tokenData.id, ownerToCheckAgainst, requestedFieldsInMod, true);
    const resultValues = await appData.cache.requestListCache(resolverArgs.args.records);
    // return if otherwise succeeds
    const finalValues = await Promise.all(resultValues.map(async (value) => {
        // preveting another security leak here, the user might have lied by saying that these
        // items were all created by this specific creator when doing searches
        if (created_by && value.created_by !== created_by) {
            throw new errors_1.EndpointError({
                message: "created_by mismatch, one of the items requested was not created by whom it was claimed",
                code: constants_1.ENDPOINT_ERRORS.UNSPECIFIED,
            });
        }
        const valueToProvide = basic_1.filterAndPrepareGQLValue(appData.knex, appData.cache.getServerData(), value, requestedFields, tokenData.role, mod);
        const itemDefinition = appData.root.registry[value.type];
        const pathOfThisModule = mod.getPath().join("/");
        const pathOfThisIdef = itemDefinition.getPath().join("/");
        const moduleTrigger = appData.triggers.module.io[pathOfThisModule];
        const itemDefinitionTrigger = appData.triggers.itemDefinition.io[pathOfThisIdef];
        if (moduleTrigger || itemDefinitionTrigger) {
            const currentWholeValueAsGQL = sql_1.convertSQLValueToGQLValueForItemDefinition(appData.knex, appData.cache.getServerData(), itemDefinition, value);
            if (moduleTrigger) {
                await moduleTrigger({
                    appData,
                    itemDefinition,
                    module: mod,
                    value: currentWholeValueAsGQL,
                    update: null,
                    extraArgs: resolverArgs.args,
                    action: triggers_1.IOTriggerActions.READ,
                    id: value.id,
                    version: value.version || null,
                    user: {
                        role: tokenData.role,
                        id: tokenData.id,
                        customData: tokenData.customData,
                    },
                    forbid: basic_1.defaultTriggerForbiddenFunction,
                });
            }
            if (itemDefinitionTrigger) {
                await itemDefinitionTrigger({
                    appData,
                    itemDefinition,
                    module: mod,
                    value: currentWholeValueAsGQL,
                    update: null,
                    extraArgs: resolverArgs.args,
                    action: triggers_1.IOTriggerActions.READ,
                    id: value.id,
                    version: value.version || null,
                    user: {
                        role: tokenData.role,
                        id: tokenData.id,
                        customData: tokenData.customData,
                    },
                    forbid: basic_1.defaultTriggerForbiddenFunction,
                });
            }
        }
        return valueToProvide.toReturnToUser;
    }));
    const resultAsObject = {
        results: finalValues,
    };
    CAN_LOG_DEBUG && __1.logger.debug("getModuleList: done");
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
