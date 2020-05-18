"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
const ItemDefinition_1 = require("../../../base/Root/Module/ItemDefinition");
const basic_1 = require("../basic");
const graphql_fields_1 = __importDefault(require("graphql-fields"));
const constants_1 = require("../../../constants");
const sql_1 = require("../../../base/Root/Module/ItemDefinition/sql");
const errors_1 = require("../../../base/errors");
const gql_util_1 = require("../../../gql-util");
const triggers_1 = require("../triggers");
async function editItemDefinition(appData, resolverArgs, itemDefinition) {
    __1.logger.debug("editItemDefinition: executed edit for " + itemDefinition.getQualifiedPathName());
    // First we check the language and region of the item
    basic_1.checkLanguage(appData, resolverArgs.args);
    // we ge the token data
    const tokenData = await basic_1.validateTokenAndGetData(appData, resolverArgs.args.token);
    // for editing one must be logged in
    await basic_1.validateTokenIsntBlocked(appData.cache, tokenData);
    // now we get the requested fields, and check they are available for the given role
    const requestedFields = gql_util_1.flattenRawGQLValueOrFields(graphql_fields_1.default(resolverArgs.info));
    basic_1.checkBasicFieldsAreAvailableForRole(itemDefinition, tokenData, requestedFields);
    // now we get the basic information
    const mod = itemDefinition.getParentModule();
    const selfTable = itemDefinition.getQualifiedPathName();
    __1.logger.debug("editItemDefinition: retrieving actual owner of this item");
    // now we get these variables ready
    // we need to get the userId and the current
    // entire item definition value that is in the database
    // there's an easy way to request that, and now, we do it
    // at the same time we run the policy check
    let userId;
    // so we run the policy check for edit, this item definition,
    // with the given id
    const wholeSqlStoredValue = await basic_1.runPolicyCheck({
        policyTypes: ["edit", "read"],
        itemDefinition,
        id: resolverArgs.args.id,
        version: resolverArgs.args.version,
        role: tokenData.role,
        gqlArgValue: resolverArgs.args,
        gqlFlattenedRequestedFiels: requestedFields,
        cache: appData.cache,
        preValidation: (content) => {
            // if we don't get an user id this means that there's no owner, this is bad input
            if (!content) {
                __1.logger.debug("editItemDefinition: failed due to lack of content data");
                throw new errors_1.EndpointError({
                    message: `There's no ${selfTable} with id ${resolverArgs.args.id} and version ${resolverArgs.args.version}`,
                    code: constants_1.ENDPOINT_ERRORS.NOT_FOUND,
                });
            }
            // and fetch the userId
            userId = content.created_by;
            if (itemDefinition.isOwnerObjectId()) {
                userId = content.id;
            }
            // also throw an error if it's blocked
            if (content.blocked_at !== null) {
                __1.logger.debug("editItemDefinition: failed due to element being blocked");
                throw new errors_1.EndpointError({
                    message: "The item is blocked",
                    code: constants_1.ENDPOINT_ERRORS.BLOCKED,
                });
            }
        },
    });
    // Now that the policies have been checked, and that we get the value of the entire item
    // definition, we need to convert that value to GQL value, and for that we use the converter
    // note how we don't pass the requested fields because we want it all
    const currentWholeValueAsGQL = sql_1.convertSQLValueToGQLValueForItemDefinition(itemDefinition, wholeSqlStoredValue);
    // and now basically we create a new value that is the combination or both, where our new
    // values take precedence, yes there will be pollution, with token, id, and whatnot, but that
    // doesn't matter because the apply function ignores those
    const expectedUpdatedValue = {
        ...currentWholeValueAsGQL,
        ...resolverArgs.args,
    };
    // and as so we apply the value from graphql
    itemDefinition.applyValue(resolverArgs.args.id, resolverArgs.args.version || null, expectedUpdatedValue, false, tokenData.id, tokenData.role, null, false);
    // and then we check with the entire full value, we want to ensure no changes occurred
    // and that the updated value will be exactly the result and it will be valid
    await basic_1.serverSideCheckItemDefinitionAgainst(itemDefinition, expectedUpdatedValue, resolverArgs.args.id, resolverArgs.args.version || null);
    itemDefinition.cleanValueFor(resolverArgs.args.id, resolverArgs.args.version || null);
    // now we calculate the fields that we are editing, and the fields that we are
    // requesting
    const editingFields = {};
    Object.keys(resolverArgs.args).map(async (arg) => {
        if (itemDefinition.hasPropertyDefinitionFor(arg, true) ||
            (arg.startsWith(constants_1.INCLUDE_PREFIX) &&
                itemDefinition.hasIncludeFor(arg.replace(constants_1.INCLUDE_PREFIX, "").replace(constants_1.EXCLUSION_STATE_SUFFIX, "")))) {
            editingFields[arg] = resolverArgs.args[arg];
        }
    });
    __1.logger.debug("editItemDefinition: Fields to be edited from the idef have been extracted as", editingFields);
    const requestedFieldsInIdef = {};
    Object.keys(requestedFields).forEach((arg) => {
        if (itemDefinition.hasPropertyDefinitionFor(arg, true) ||
            arg.startsWith(constants_1.INCLUDE_PREFIX) && itemDefinition.hasIncludeFor(arg.replace(constants_1.INCLUDE_PREFIX, ""))) {
            requestedFieldsInIdef[arg] = requestedFields[arg];
        }
    });
    __1.logger.debug("editItemDefinition: Fields to be requested from the idef have been extracted as", requestedFieldsInIdef);
    __1.logger.debug("editItemDefinition: Checking role access for editing");
    // checking the role access for both
    itemDefinition.checkRoleAccessFor(ItemDefinition_1.ItemDefinitionIOActions.EDIT, tokenData.role, tokenData.id, userId, editingFields, true);
    __1.logger.debug("editItemDefinition: Checking role access for read");
    itemDefinition.checkRoleAccessFor(ItemDefinition_1.ItemDefinitionIOActions.READ, tokenData.role, tokenData.id, userId, requestedFieldsInIdef, true);
    // now we need to setup what we want to convert, since the
    // converting functions can take the whole args with its extra
    // stuff by default it's just the whole args
    let gqlValueToConvert = resolverArgs.args;
    // now we need to find the triggers
    const pathOfThisIdef = itemDefinition.getAbsolutePath().join("/");
    const pathOfThisModule = mod.getPath().join("/");
    // and extract the triggers from the registry
    const itemDefinitionTrigger = appData.triggers.itemDefinition[pathOfThisIdef];
    const moduleTrigger = appData.triggers.module[pathOfThisModule];
    // if we got any of them
    if (itemDefinitionTrigger || moduleTrigger) {
        // we split the args in the graphql query for that which belongs to the
        // item definition and that which is extra
        const [itemDefinitionSpecificArgs, extraArgs] = basic_1.splitArgsInGraphqlQuery(itemDefinition, resolverArgs.args);
        // so now we just want to convert the values setup here, as done
        // some heavy lifting
        gqlValueToConvert = itemDefinitionSpecificArgs;
        // and if we have a module trigger
        if (moduleTrigger) {
            // we execute the trigger
            const newValueAccordingToModule = await moduleTrigger({
                appData,
                itemDefinition,
                module: mod,
                from: currentWholeValueAsGQL,
                update: gqlValueToConvert,
                extraArgs,
                action: triggers_1.TriggerActions.EDIT,
            });
            // and if we have a new value
            if (newValueAccordingToModule) {
                // that will be our new value
                gqlValueToConvert = newValueAccordingToModule;
            }
        }
        // same with the item definition
        if (itemDefinitionTrigger) {
            // we call the trigger
            const newValueAccordingToIdef = await itemDefinitionTrigger({
                appData,
                itemDefinition,
                module: mod,
                from: currentWholeValueAsGQL,
                update: gqlValueToConvert,
                extraArgs,
                action: triggers_1.TriggerActions.EDIT,
            });
            // and make it the new value if such trigger was registered
            if (newValueAccordingToIdef) {
                gqlValueToConvert = newValueAccordingToIdef;
            }
        }
    }
    const dictionary = basic_1.getDictionary(appData, resolverArgs.args);
    const sqlValue = await appData.cache.requestUpdate(itemDefinition, resolverArgs.args.id, resolverArgs.args.version || null, gqlValueToConvert, currentWholeValueAsGQL, tokenData.id, dictionary, resolverArgs.args.listener_uuid || null);
    __1.logger.debug("editItemDefinition: SQL ouput retrieved");
    __1.logger.silly("editItemDefinition: Value is", sqlValue);
    // convert it using the requested fields for that, and ignoring everything else
    const gqlValue = sql_1.convertSQLValueToGQLValueForItemDefinition(itemDefinition, sqlValue, requestedFields);
    // we don't need to check for blocked or deleted because such items cannot be edited,
    // see before, so we return immediately, read has been checked already
    // we use the same strategy, all extra data will be chopped anyway by graphql
    const finalOutput = {
        DATA: gqlValue,
        ...gqlValue,
    };
    __1.logger.debug("editItemDefinition: GQL ouput retrieved");
    __1.logger.silly("editItemDefinition: value is", finalOutput);
    return finalOutput;
}
exports.editItemDefinition = editItemDefinition;
function editItemDefinitionFn(appData) {
    return editItemDefinition.bind(null, appData);
}
exports.editItemDefinitionFn = editItemDefinitionFn;
