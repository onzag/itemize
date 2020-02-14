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
const sql_1 = require("../../../base/Root/Module/ItemDefinition/sql");
const sql_2 = require("../../../base/Root/Module/sql");
const errors_1 = require("../../../base/errors");
const gql_util_1 = require("../../../gql-util");
const version_null_value_1 = require("../../version-null-value");
const debug = debug_1.default("resolvers:editItemDefinition");
async function editItemDefinition(appData, resolverArgs, itemDefinition) {
    debug("EXECUTED for %s", itemDefinition.getQualifiedPathName());
    // First we check the language and region of the item
    basic_1.checkLanguage(appData, resolverArgs.args);
    // we ge the token data
    const tokenData = await basic_1.validateTokenAndGetData(appData, resolverArgs.args.token);
    // for editing one must be logged in
    await basic_1.validateTokenIsntBlocked(appData.cache, tokenData);
    // now we get the requested fields, and check they are available for the given role
    const requestedFields = gql_util_1.flattenRawGQLValueOrFields(graphql_fields_1.default(resolverArgs.info));
    basic_1.checkBasicFieldsAreAvailableForRole(tokenData, requestedFields);
    // now we get the basic information
    const mod = itemDefinition.getParentModule();
    const moduleTable = mod.getQualifiedPathName();
    const selfTable = itemDefinition.getQualifiedPathName();
    debug("Making query to get the owner of this item");
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
                debug("FAILED due to lack of content data");
                throw new errors_1.EndpointError({
                    message: `There's no ${selfTable} with id ${resolverArgs.args.id}`,
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
                debug("FAILED due to element being blocked");
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
    debug("Current GQL value found as %j", currentWholeValueAsGQL);
    // and now basically we create a new value that is the combination or both, where our new
    // values take precedence, yes there will be pollution, with token, id, and whatnot, but that
    // doesn't matter because the apply function ignores those
    const expectedUpdatedValue = {
        ...currentWholeValueAsGQL,
        ...resolverArgs.args,
    };
    debug("Expectd GQL value considered as %j, applying such value", expectedUpdatedValue);
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
    debug("Fields to be edited from the idef have been extracted as %j", editingFields);
    const requestedFieldsInIdef = {};
    Object.keys(requestedFields).forEach((arg) => {
        if (itemDefinition.hasPropertyDefinitionFor(arg, true) ||
            arg.startsWith(constants_1.INCLUDE_PREFIX) && itemDefinition.hasIncludeFor(arg.replace(constants_1.INCLUDE_PREFIX, ""))) {
            requestedFieldsInIdef[arg] = requestedFields[arg];
        }
    });
    debug("Fields to be requested from the idef have been extracted as %j", requestedFieldsInIdef);
    debug("Checking role access for editing");
    // checking the role access for both
    itemDefinition.checkRoleAccessFor(ItemDefinition_1.ItemDefinitionIOActions.EDIT, tokenData.role, tokenData.id, userId, editingFields, true);
    debug("Checking role access for read");
    itemDefinition.checkRoleAccessFor(ItemDefinition_1.ItemDefinitionIOActions.READ, tokenData.role, tokenData.id, userId, requestedFieldsInIdef, true);
    // and we now build both queries for updating
    // we are telling by setting the partialFields variable
    // that we only want the editingFields to be returned
    // into the SQL value, this is valid in here because
    // we don't want things to be defaulted in the query
    const dictionary = basic_1.getDictionary(appData, resolverArgs.args);
    const sqlIdefData = await sql_1.convertGQLValueToSQLValueForItemDefinition(resolverArgs.args.id.toString(), itemDefinition, resolverArgs.args, currentWholeValueAsGQL, appData.knex, dictionary, editingFields);
    const sqlModData = await sql_2.convertGQLValueToSQLValueForModule(resolverArgs.args.id.toString(), itemDefinition.getParentModule(), itemDefinition, resolverArgs.args, currentWholeValueAsGQL, appData.knex, dictionary, editingFields);
    // now we check if we are updating anything at all
    if (Object.keys(sqlIdefData).length === 0 &&
        Object.keys(sqlModData).length === 0) {
        debug("FAILED due to input data being none");
        throw new errors_1.EndpointError({
            message: "You are not updating anything whatsoever",
            code: constants_1.ENDPOINT_ERRORS.NOTHING_TO_UPDATE,
        });
    }
    // update when it was edited
    sqlModData.edited_at = appData.knex.fn.now();
    sqlModData.last_modified = appData.knex.fn.now();
    sqlModData.edited_by = tokenData.id;
    debug("SQL Input data for idef is %j", sqlIdefData);
    debug("SQL Input data for module is %j", sqlModData);
    // we build the transaction for the action
    const value = version_null_value_1.convertVersionsIntoNullsWhenNecessary(await appData.knex.transaction(async (transactionKnex) => {
        // and add them if we have them, note that the module will always have
        // something to update because the edited_at field is always added when
        // edition is taking place
        const updateQueryMod = transactionKnex(moduleTable)
            .update(sqlModData).where("id", resolverArgs.args.id)
            .returning("*");
        // for the update query of the item definition we have to take several things
        // into consideration, first we set it as an empty object
        let updateOrSelectQueryIdef = {};
        // if we have something to update
        if (Object.keys(sqlIdefData).length) {
            // we make the update query
            updateOrSelectQueryIdef = transactionKnex(selfTable).update(sqlIdefData).where(constants_1.CONNECTOR_SQL_COLUMN_ID_FK_NAME, resolverArgs.args.id).andWhere(constants_1.CONNECTOR_SQL_COLUMN_VERSION_FK_NAME, resolverArgs.args.version || null).returning("*");
            // otherwise we check if we are just requesting some fields from the idef
        }
        else {
            // and make a simple select query
            updateOrSelectQueryIdef = transactionKnex(selfTable).select("*").where(constants_1.CONNECTOR_SQL_COLUMN_ID_FK_NAME, resolverArgs.args.id).andWhere(constants_1.CONNECTOR_SQL_COLUMN_VERSION_FK_NAME, resolverArgs.args.version || null);
        }
        // if there's nothing to update, or there is nothing to retrieve, it won't touch the idef table
        // now we run both queries
        const updateQueryValueMod = await updateQueryMod;
        const updateQueryValueIdef = await updateOrSelectQueryIdef;
        return {
            ...updateQueryValueMod[0],
            ...updateQueryValueIdef[0],
        };
    }));
    debug("SQL Output is %j", value);
    // convert it using the requested fields for that, and ignoring everything else
    const gqlValue = sql_1.convertSQLValueToGQLValueForItemDefinition(itemDefinition, value, requestedFields);
    // we don't need to check for blocked or deleted because such items cannot be edited,
    // see before, so we return immediately, read has been checked already
    // we use the same strategy, all extra data will be chopped anyway by graphql
    const finalOutput = {
        DATA: gqlValue,
        ...gqlValue,
    };
    debug("SUCCEED with GQL output %j", finalOutput);
    // we return and this executes after it returns
    (async () => {
        await appData.cache.forceCacheInto(selfTable, resolverArgs.args.id, resolverArgs.args.version || null, value);
        const changeEvent = {
            itemDefinition: selfTable,
            id: resolverArgs.args.id,
            version: resolverArgs.args.version || null,
            type: "modified",
            lastModified: null,
        };
        appData.listener.triggerListeners(changeEvent, resolverArgs.args.listener_uuid || null);
    })();
    return finalOutput;
}
exports.editItemDefinition = editItemDefinition;
function editItemDefinitionFn(appData) {
    return editItemDefinition.bind(null, appData);
}
exports.editItemDefinitionFn = editItemDefinitionFn;
