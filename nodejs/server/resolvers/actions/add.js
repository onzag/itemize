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
const gql_util_1 = require("../../../gql-util");
const errors_1 = require("../../../base/errors");
const triggers_1 = require("../triggers");
async function addItemDefinition(appData, resolverArgs, itemDefinition) {
    __1.logger.debug("addItemDefinition: executed adding for " + itemDefinition.getQualifiedPathName());
    // First we check the language and the region, based on the args
    // as we expect every request to contain this data and be
    // valid for our app
    basic_1.checkLanguage(appData, resolverArgs.args);
    // now we need to extract the token and get its data, making
    // sure it's a valid token
    const tokenData = await basic_1.validateTokenAndGetData(appData, resolverArgs.args.token);
    // check that the user is logged in, for adding, only logged users
    // are valid
    await basic_1.validateTokenIsntBlocked(appData.cache, tokenData);
    const containerId = resolverArgs.args.container_id;
    basic_1.validateContainerIdIsReal(containerId, appData.sensitiveConfig);
    // if we are specifying a for_id
    if (resolverArgs.args.for_id) {
        if (!resolverArgs.args.version) {
            throw new errors_1.EndpointError({
                message: "Specifying for_id without a version is not allowed",
                code: constants_1.ENDPOINT_ERRORS.FORBIDDEN,
            });
        }
        const unversionedValue = await appData.cache.requestValue(itemDefinition, resolverArgs.args.for_id, null);
        // if no such value of any version exists
        if (!unversionedValue) {
            throw new errors_1.EndpointError({
                message: "Theres no unversioned value for this version creation",
                code: constants_1.ENDPOINT_ERRORS.FORBIDDEN,
            });
        }
        itemDefinition.checkRoleCanVersion(tokenData.role, tokenData.id, unversionedValue.created_by, true);
    }
    // check the version on whether it's a valid value
    const isValidVersion = itemDefinition.isValidVersion(resolverArgs.args.version || null, appData.config.supportedLanguages);
    if (!isValidVersion) {
        throw new errors_1.EndpointError({
            message: "The provided version " + resolverArgs.args.version + " is deemed invalid",
            code: constants_1.ENDPOINT_ERRORS.FORBIDDEN,
        });
    }
    // now we must check if we are parenting
    const isParenting = !!(resolverArgs.args.parent_id || resolverArgs.args.parent_type || resolverArgs.args.parent_version);
    basic_1.validateParentingRules(appData, resolverArgs.args.parent_id, resolverArgs.args.parent_version || null, resolverArgs.args.parent_type, itemDefinition, tokenData.id, tokenData.role);
    // now we see which fields are being requested for the answer after adding, first
    // we flatten the fields, remember that we have external and internal fields
    // contained in the DATA value, we flatten that first
    const requestedFields = gql_util_1.flattenRawGQLValueOrFields(graphql_fields_1.default(resolverArgs.info));
    // now we use the basic functions and we check if the basic fields are available,
    // basic fields are module based, like moderation fields
    basic_1.checkBasicFieldsAreAvailableForRole(itemDefinition, tokenData, requestedFields);
    // now we extract the fields that we are actually adding to the item
    // definition, that is what is valid for adding and nothing else
    // for that we loop over the arguments, and we only get what is ITEM_
    // or what is included in the item definition, including extensions
    const addingFields = {};
    Object.keys(resolverArgs.args).forEach((arg) => {
        if (itemDefinition.hasPropertyDefinitionFor(arg, true) ||
            arg.startsWith(constants_1.INCLUDE_PREFIX) && itemDefinition.hasIncludeFor(arg.replace(constants_1.INCLUDE_PREFIX, ""))) {
            addingFields[arg] = resolverArgs.args[arg];
        }
    });
    let finalOwner = tokenData.id || constants_1.UNSPECIFIED_OWNER;
    if (resolverArgs.args.in_behalf_of) {
        itemDefinition.checkRoleCanCreateInBehalf(tokenData.role, true);
        finalOwner = resolverArgs.args.in_behalf_of;
        await basic_1.checkUserExists(appData.cache, finalOwner);
    }
    __1.logger.debug("addItemDefinition: Fields to add have been extracted", addingFields);
    __1.logger.debug("addItemDefinition: Checking basic role access for creation");
    // now we check the role access for the given
    // create action
    itemDefinition.checkRoleAccessFor(ItemDefinition_1.ItemDefinitionIOActions.CREATE, tokenData.role, tokenData.id, finalOwner, addingFields, true);
    // The rule for create and read are different
    // and set appart, one user might have the rule to
    // create something but not to read it, it's weird,
    // but a valid option
    const requestedFieldsThatRepresentPropertiesAndIncludes = {};
    Object.keys(requestedFields).forEach((arg) => {
        if (itemDefinition.hasPropertyDefinitionFor(arg, true) ||
            arg.startsWith(constants_1.INCLUDE_PREFIX) && itemDefinition.hasIncludeFor(arg.replace(constants_1.INCLUDE_PREFIX, ""))) {
            requestedFieldsThatRepresentPropertiesAndIncludes[arg] = requestedFields[arg];
        }
    });
    __1.logger.debug("addItemDefinition: Fields to be requested have been extracted", requestedFieldsThatRepresentPropertiesAndIncludes);
    __1.logger.debug("addItemDefinition: Checking basic role access for read");
    // so now we check the role access for the reading of
    // those fields, as you can see we use the userId of the user
    // since he will be the owner as well
    itemDefinition.checkRoleAccessFor(ItemDefinition_1.ItemDefinitionIOActions.READ, tokenData.role, tokenData.id, finalOwner, requestedFieldsThatRepresentPropertiesAndIncludes, true);
    // if all that has succeed we take the item definition and apply
    // the value from graphql, now you should understand how this is handled
    // the values are applied so that the whole item definition value is
    // fulfilled
    itemDefinition.applyValue(null, null, resolverArgs.args, false, tokenData.id, tokenData.role, null, false);
    // now we use this function which checks the current value against
    // the value that we have just set, the reason we are sending the args
    // is because we want to ensure that the values that you updated for
    // are the values that are being set, remember rules in item defintions
    // can change the output, and yet keep things valid, so the arg can be invalid
    // if the output is different from it
    await basic_1.serverSideCheckItemDefinitionAgainst(itemDefinition, resolverArgs.args, null, null);
    if (isParenting) {
        const parentModule = appData.root.registry[resolverArgs.args.parent_type].getParentModule().getQualifiedPathName();
        await basic_1.runPolicyCheck({
            policyTypes: ["parent"],
            itemDefinition,
            id: null,
            version: null,
            role: tokenData.role,
            gqlArgValue: resolverArgs.args,
            gqlFlattenedRequestedFiels: requestedFields,
            cache: appData.cache,
            parentModule,
            parentType: resolverArgs.args.parent_type,
            parentId: resolverArgs.args.parent_id,
            parentVersion: resolverArgs.args.parent_version || null,
            preParentValidation: (content) => {
                // this shouldn't really happen because validateParentingRules should have
                // checked whether it existed, but we check anyway
                if (!content) {
                    __1.logger.debug("addItemDefinition: failed due to lack of content data");
                    throw new errors_1.EndpointError({
                        message: `There's no parent ${resolverArgs.args.parent_type} with ` +
                            `id ${resolverArgs.args.parent_id} and version ${resolverArgs.args.parent_version}`,
                        code: constants_1.ENDPOINT_ERRORS.NOT_FOUND,
                    });
                }
                // this should have also not happen because validate should also have done it
                // but we check anyway
                if (content.blocked_at !== null) {
                    __1.logger.debug("addItemDefinition: failed due to element being blocked");
                    throw new errors_1.EndpointError({
                        message: "The parent is blocked",
                        code: constants_1.ENDPOINT_ERRORS.BLOCKED,
                    });
                }
            },
        });
    }
    // extract this information
    const mod = itemDefinition.getParentModule();
    // we need to get the dictionary that is used for this specific
    // language, remember, while the API uses a language and region(country)
    // field, the fields can use both language and language region combos
    // so we check via dictionaries
    const dictionary = basic_1.getDictionary(appData, resolverArgs.args);
    // now we need to setup what we want to convert, since the
    // converting functions can take the whole args with its extra
    // stuff by default it's just the whole args
    let gqlValueToConvert = resolverArgs.args;
    // however now we need to check if we have triggers, for that we get
    // the absolute paths
    const pathOfThisIdef = itemDefinition.getAbsolutePath().join("/");
    const pathOfThisModule = mod.getPath().join("/");
    // and extract the triggers from the registry
    const itemDefinitionTrigger = appData.triggers.itemDefinition[pathOfThisIdef];
    const moduleTrigger = appData.triggers.module[pathOfThisModule];
    // if we got any of them convert
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
                from: null,
                update: gqlValueToConvert,
                extraArgs,
                action: triggers_1.TriggerActions.CREATE,
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
                from: null,
                update: gqlValueToConvert,
                extraArgs,
                action: triggers_1.TriggerActions.CREATE,
            });
            // and make it the new value if such trigger was registered
            if (newValueAccordingToIdef) {
                gqlValueToConvert = newValueAccordingToIdef;
            }
        }
    }
    // the creation will ensure that the for_id and version
    // are valid and do not create strange data structures
    const value = await appData.cache.requestCreation(itemDefinition, resolverArgs.args.for_id || null, resolverArgs.args.version || null, gqlValueToConvert, tokenData.id, dictionary, containerId, isParenting ? {
        id: resolverArgs.args.parent_id,
        version: resolverArgs.args.parent_version,
        type: resolverArgs.args.parent_type,
    } : null);
    __1.logger.debug("addItemDefinition: SQL ouput retrieved");
    __1.logger.silly("addItemDefinition: Value is", value);
    // now we convert that SQL value to the respective GQL value
    // the reason we pass the requested fields is to filter by the fields
    // that we actually want, not passing this would make the gql value
    // be full (of nulls) our value is incomplete, so we need to
    // pass the requestedFields anyway
    const gqlValue = sql_1.convertSQLValueToGQLValueForItemDefinition(itemDefinition, value, requestedFields);
    const finalOutput = {
        DATA: gqlValue,
        ...gqlValue,
    };
    __1.logger.debug("addItemDefinition: GQL output calculated", finalOutput);
    // items that have just been added cannot be blocked or deleted, hence we just return
    // right away without checking
    return finalOutput;
}
exports.addItemDefinition = addItemDefinition;
function addItemDefinitionFn(appData) {
    return addItemDefinition.bind(null, appData);
}
exports.addItemDefinitionFn = addItemDefinitionFn;
