"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
const ItemDefinition_1 = require("../../../base/Root/Module/ItemDefinition");
const basic_1 = require("../basic");
const graphql_fields_1 = __importDefault(require("graphql-fields"));
const errors_1 = require("../../../base/errors");
const constants_1 = require("../../../constants");
const gql_util_1 = require("../../../gql-util");
const sql_1 = require("../../../base/Root/Module/ItemDefinition/sql");
const triggers_1 = require("../triggers");
async function deleteItemDefinition(appData, resolverArgs, itemDefinition) {
    __1.logger.debug("deleteItemDefinition: executed delete for " + itemDefinition.getQualifiedPathName());
    // do the basic things, check the language and region
    // and get the token data
    basic_1.checkLanguage(appData, resolverArgs.args);
    const tokenData = await basic_1.validateTokenAndGetData(appData, resolverArgs.args.token);
    // for deleting we must be logged in
    await basic_1.validateTokenIsntBlocked(appData.cache, tokenData);
    // we flatten and get the requested fields
    const requestedFields = gql_util_1.flattenRawGQLValueOrFields(graphql_fields_1.default(resolverArgs.info));
    basic_1.checkBasicFieldsAreAvailableForRole(itemDefinition, tokenData, requestedFields);
    // now we get this basic information
    const mod = itemDefinition.getParentModule();
    const selfTable = itemDefinition.getQualifiedPathName();
    __1.logger.debug("deleteItemDefinition: checking policy check for delete");
    // we need to run the policy check for delete,
    // because there might be extra rules for data request
    // for doing a delete, for example, requesting a password
    // confirmation for deleting users, we also need to
    // gather the created_by and blocked_at to check the rights
    // of the user
    let userId;
    let contentId;
    const wholeSqlStoredValue = await basic_1.runPolicyCheck({
        policyTypes: ["delete"],
        itemDefinition,
        id: resolverArgs.args.id,
        version: resolverArgs.args.version || null,
        role: tokenData.role,
        gqlArgValue: resolverArgs.args,
        gqlFlattenedRequestedFiels: null,
        cache: appData.cache,
        // this functions runs before the policy has been checked
        // and we do it for being efficient, because we can run
        // both of these checks with a single SQL query, and the policy
        // checker is built in a way that it demands and expects that
        preValidation: (content) => {
            // if there is no userId then the row was null, we throw an error
            if (!content) {
                __1.logger.debug("deleteItemDefinition: failed due to lack of content data");
                throw new errors_1.EndpointError({
                    message: `There's no ${selfTable} with id ${resolverArgs.args.id}`,
                    code: constants_1.ENDPOINT_ERRORS.NOT_FOUND,
                });
            }
            // so now we get the content information, which might
            // be null if nothing was found, so we check too
            userId = content.created_by;
            if (itemDefinition.isOwnerObjectId()) {
                userId = content.id;
            }
            contentId = content.content_id;
            // if the content is blocked, and our role has no special access
            // to moderation fields, then this content cannot be removed
            // from the website, no matter what
            if (content.blocked_at !== null) {
                const rolesThatHaveAccessToModerationFields = itemDefinition.getRolesWithModerationAccess();
                const hasAccessToModerationFields = rolesThatHaveAccessToModerationFields.includes(constants_1.ANYONE_METAROLE) ||
                    (rolesThatHaveAccessToModerationFields.includes(constants_1.ANYONE_LOGGED_METAROLE) && tokenData.role !== constants_1.GUEST_METAROLE) ||
                    rolesThatHaveAccessToModerationFields.includes(tokenData.role);
                if (!hasAccessToModerationFields) {
                    __1.logger.debug("deleteItemDefinition: failed due to blocked content and no moderation access for role " + tokenData.role);
                    throw new errors_1.EndpointError({
                        message: "The item is blocked, only users with role " +
                            rolesThatHaveAccessToModerationFields.join(",") + " can wipe this data",
                        code: constants_1.ENDPOINT_ERRORS.BLOCKED,
                    });
                }
            }
        },
    });
    // yet now we check the role access, for the action of delete
    // note how we don't pass requested fields, because that's irrelevant
    // for the delete action
    __1.logger.debug("deleteItemDefinition: checking role access for delete");
    itemDefinition.checkRoleAccessFor(ItemDefinition_1.ItemDefinitionIOActions.DELETE, tokenData.role, tokenData.id, userId, null, true);
    // however now we need to check if we have triggers, for that we get
    // the absolute paths
    const pathOfThisIdef = itemDefinition.getAbsolutePath().join("/");
    const pathOfThisModule = mod.getPath().join("/");
    // and extract the triggers from the registry
    const itemDefinitionTrigger = appData.triggers.itemDefinition[pathOfThisIdef];
    const moduleTrigger = appData.triggers.module[pathOfThisModule];
    // if we got any of them
    if (itemDefinitionTrigger || moduleTrigger) {
        // we need to use the gql stored value for the trigger
        const currentWholeValueAsGQL = sql_1.convertSQLValueToGQLValueForItemDefinition(itemDefinition, wholeSqlStoredValue);
        if (moduleTrigger) {
            // we execute the trigger
            await moduleTrigger({
                appData,
                itemDefinition,
                module: mod,
                from: currentWholeValueAsGQL,
                update: null,
                extraArgs: resolverArgs.args,
                action: triggers_1.TriggerActions.DELETE,
            });
        }
        // same with the item definition
        if (itemDefinitionTrigger) {
            // we call the trigger
            await itemDefinitionTrigger({
                appData,
                itemDefinition,
                module: mod,
                from: currentWholeValueAsGQL,
                update: null,
                extraArgs: resolverArgs.args,
                action: triggers_1.TriggerActions.DELETE,
            });
        }
    }
    await appData.cache.requestDelete(itemDefinition, resolverArgs.args.id, resolverArgs.args.version, false, contentId, resolverArgs.args.listener_uuid || null);
    __1.logger.debug("deleteItemDefinition: done");
    // return null, yep, the output is always null, because it's gone
    // however we are not running the check on the fields that can be read
    // but anyway there's no usable data, so why would we need a check
    return null;
}
exports.deleteItemDefinition = deleteItemDefinition;
function deleteItemDefinitionFn(appData) {
    return deleteItemDefinition.bind(null, appData);
}
exports.deleteItemDefinitionFn = deleteItemDefinitionFn;
