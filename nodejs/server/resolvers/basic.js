"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const errors_1 = require("../../base/errors");
const ItemDefinition_1 = __importDefault(require("../../base/Root/Module/ItemDefinition"));
const Module_1 = __importDefault(require("../../base/Root/Module"));
const sql_1 = require("../../base/Root/Module/ItemDefinition/sql");
const sql_2 = require("../../base/Root/Module/sql");
const __1 = require("..");
const deep_equal_1 = __importDefault(require("deep-equal"));
const Include_1 = require("../../base/Root/Module/ItemDefinition/Include");
const token_1 = require("../token");
const search_mode_1 = require("../../base/Root/Module/ItemDefinition/PropertyDefinition/search-mode");
// Used to optimize, it is found out that passing unecessary logs to the transport
// can slow the logger down even if it won't display
const LOG_LEVEL = process.env.LOG_LEVEL;
const CAN_LOG_SILLY = LOG_LEVEL === "silly";
function defaultTriggerForbiddenFunction(message) {
    throw new errors_1.EndpointError({
        message,
        code: constants_1.ENDPOINT_ERRORS.FORBIDDEN,
    });
}
exports.defaultTriggerForbiddenFunction = defaultTriggerForbiddenFunction;
function defaultTriggerWaitForPromiseFunction() {
    return;
}
exports.defaultTriggerWaitForPromiseFunction = defaultTriggerWaitForPromiseFunction;
function defaultTriggerInvalidForbiddenFunction(message) {
    __1.logger.error("Attempted to forbid on an already allowed action, this means that you attempted to call forbid on CREATED, EDITED or DELETED", {
        message,
    });
    return;
}
exports.defaultTriggerInvalidForbiddenFunction = defaultTriggerInvalidForbiddenFunction;
/**
 * Given a token, it validates and provides the role information
 * for use in the system
 * @param token the token passed via the args
 */
async function validateTokenAndGetData(appData, token) {
    let result;
    if (token === null) {
        result = {
            id: null,
            role: constants_1.GUEST_METAROLE,
            sessionId: null,
        };
    }
    else {
        let throwErr = false;
        try {
            result = await token_1.jwtVerify(token, appData.sensitiveConfig.jwtKey);
            if (!result.custom || result.isRealUser) {
                throwErr = (typeof result.id !== "number" ||
                    typeof result.role !== "string" ||
                    typeof result.sessionId !== "number");
            }
            else {
                throwErr = typeof result.role !== "string";
            }
        }
        catch (err) {
            throwErr = true;
        }
        if (throwErr) {
            throw new errors_1.EndpointError({
                message: "Invalid token that didn't pass verification",
                code: constants_1.ENDPOINT_ERRORS.UNSPECIFIED,
            });
        }
    }
    CAN_LOG_SILLY && __1.logger.silly("validateTokenAndGetData: validating token for user succeed", {
        token,
        result,
    });
    return result;
}
exports.validateTokenAndGetData = validateTokenAndGetData;
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
async function validateParentingRules(appData, parentId, parentVersion, parentType, itemDefinition, userId, role) {
    const isParenting = !!(parentId || parentVersion || parentType);
    if (!isParenting && itemDefinition.mustBeParented()) {
        throw new errors_1.EndpointError({
            message: "A parent is required",
            code: constants_1.ENDPOINT_ERRORS.UNSPECIFIED,
        });
    }
    else if (isParenting) {
        const parentingItemDefinition = appData.root.registry[parentType];
        if (!(parentingItemDefinition instanceof ItemDefinition_1.default)) {
            throw new errors_1.EndpointError({
                message: "Invalid parent type " + parentType,
                code: constants_1.ENDPOINT_ERRORS.UNSPECIFIED,
            });
        }
        itemDefinition.checkCanBeParentedBy(parentingItemDefinition, true);
        let result;
        try {
            result = await appData.cache.requestValue(parentingItemDefinition, parentId, parentVersion);
        }
        catch (err) {
            __1.logger.error("validateParentingRules [SERIOUS]: could not retrieve item definition value to validate parenting rules", {
                errStack: err.stack,
                errMessage: err.message,
                parentId,
                parentVersion,
                parentingItemDefinition,
            });
            throw err;
        }
        if (!result) {
            throw new errors_1.EndpointError({
                message: `There's no parent ${parentType} with id ${parentId}`,
                code: constants_1.ENDPOINT_ERRORS.NOT_FOUND,
            });
        }
        else if (result.blocked_at !== null) {
            throw new errors_1.EndpointError({
                message: "The parent is blocked",
                code: constants_1.ENDPOINT_ERRORS.BLOCKED,
            });
        }
        const parentOwnerId = parentingItemDefinition.isOwnerObjectId() ? result.id : result.created_by;
        itemDefinition.checkRoleAccessForParenting(role, userId, parentOwnerId, true);
    }
    CAN_LOG_SILLY && __1.logger.silly("validateParentingRules: parenting rules have passed");
}
exports.validateParentingRules = validateParentingRules;
/**
 * Checks if the basic fields are available for the given role, basic
 * fields are of those reserved properties that are in every module
 * @param tokenData the token data that is obtained via the validateTokenAndGetData
 * function
 * @param requestedFields the requested fields
 */
function checkBasicFieldsAreAvailableForRole(itemDefinitionOrModule, tokenData, requestedFields) {
    if (typeof requestedFields === "undefined" || requestedFields === null) {
        return true;
    }
    // now we check if moderation fields have been requested
    const moderationFieldsHaveBeenRequested = constants_1.MODERATION_FIELDS.some((field) => requestedFields[field]);
    // if they have been requested, and our role has no native access to that
    if (moderationFieldsHaveBeenRequested) {
        const rolesThatHaveAccessToModerationFields = itemDefinitionOrModule.getRolesWithModerationAccess();
        const hasAccessToModerationFields = rolesThatHaveAccessToModerationFields.includes(constants_1.ANYONE_METAROLE) ||
            (rolesThatHaveAccessToModerationFields.includes(constants_1.ANYONE_LOGGED_METAROLE) && tokenData.role !== constants_1.GUEST_METAROLE) ||
            rolesThatHaveAccessToModerationFields.includes(tokenData.role);
        if (!hasAccessToModerationFields) {
            CAN_LOG_SILLY && __1.logger.silly("checkBasicFieldsAreAvailableForRole: Attempted to access to moderation fields with invalid role", {
                role: tokenData.role,
                rolesThatHaveAccessToModerationFields,
            });
            // we throw an error
            throw new errors_1.EndpointError({
                message: "You have requested to add/edit/view moderation fields with role: " + tokenData.role,
                code: constants_1.ENDPOINT_ERRORS.FORBIDDEN,
            });
        }
    }
    CAN_LOG_SILLY && __1.logger.silly("checkBasicFieldsAreAvailableForRole: basic fields access role succeed");
}
exports.checkBasicFieldsAreAvailableForRole = checkBasicFieldsAreAvailableForRole;
function retrieveSince(args) {
    if (args.since) {
        const date = new Date(args.since);
        if (date instanceof Date && !isNaN(date.getTime())) {
            return date.toISOString();
        }
        else {
            throw new errors_1.EndpointError({
                message: "Could not parse since value " + args.since,
                code: constants_1.ENDPOINT_ERRORS.UNSPECIFIED,
            });
        }
    }
    return null;
}
exports.retrieveSince = retrieveSince;
function checkLimiters(args, idefOrMod) {
    const mod = idefOrMod instanceof Module_1.default ? idefOrMod : idefOrMod.getParentModule();
    const modLimiters = mod.getRequestLimiters();
    const idefLimiters = idefOrMod instanceof ItemDefinition_1.default ? idefOrMod.getRequestLimiters() : null;
    if (!modLimiters && !idefLimiters) {
        return;
    }
    let customLimitersCombined = [];
    if (modLimiters && modLimiters.custom) {
        customLimitersCombined = customLimitersCombined.concat(modLimiters.custom.map((l) => ({
            modLimiter: true,
            propertyId: l,
        })));
    }
    if (idefLimiters && idefLimiters.custom) {
        customLimitersCombined = customLimitersCombined.concat(idefLimiters.custom.map((l) => ({
            modLimiter: false,
            propertyId: l,
        })));
    }
    let customError = null;
    let customErrorIsModLimiter = false;
    let someModCustomLimiterSucceed = false;
    let someIdefCustomLimiterSucceed = false;
    if (customLimitersCombined.length) {
        customLimitersCombined.forEach((v) => {
            const property = idefOrMod instanceof Module_1.default ?
                mod.getPropExtensionFor(v.propertyId) :
                idefOrMod.getPropertyDefinitionFor(v.propertyId, true);
            const expectedConversionIds = search_mode_1.getConversionIds(property.rawData);
            const succeed = expectedConversionIds.every((conversionId) => {
                return typeof args[conversionId] === "undefined";
            });
            if (!succeed) {
                customErrorIsModLimiter = v.modLimiter;
                if (v.modLimiter) {
                    customError = "Missing custom request search limiter required by limiter set by " + v.propertyId + " in module " +
                        mod.getQualifiedPathName() + " requiring of " + expectedConversionIds.join(", ");
                }
                else {
                    customError = "Missing custom request search limiter required by limiter set by " + v.propertyId + " in idef " +
                        idefOrMod.getQualifiedPathName() + " requiring of " + expectedConversionIds.join(", ");
                }
            }
            if (succeed && v.modLimiter && !someModCustomLimiterSucceed) {
                someModCustomLimiterSucceed = succeed;
            }
            else if (succeed && !v.modLimiter && !someIdefCustomLimiterSucceed) {
                someIdefCustomLimiterSucceed = succeed;
            }
        });
    }
    if (modLimiters &&
        modLimiters.condition === "AND" &&
        customError &&
        customErrorIsModLimiter) {
        throw new errors_1.EndpointError({
            message: customError,
            code: constants_1.ENDPOINT_ERRORS.UNSPECIFIED,
        });
    }
    else if (idefLimiters &&
        idefLimiters.condition === "AND" &&
        customError &&
        !customErrorIsModLimiter) {
        throw new errors_1.EndpointError({
            message: customError,
            code: constants_1.ENDPOINT_ERRORS.UNSPECIFIED,
        });
    }
    let sinceError = null;
    let sinceSucceed = false;
    if (modLimiters && modLimiters.since) {
        const sinceArg = args.since ? new Date(args.since) : null;
        const hasSince = !!sinceArg;
        if (!hasSince) {
            sinceError = "Missing since limiter which is a required limiter";
        }
        else {
            const now = (new Date()).getTime();
            const sinceMs = sinceArg.getTime();
            if (now - sinceMs > modLimiters.since) {
                sinceError = "Since is not respected as it requires a difference of less than " +
                    modLimiters.since + "ms but " + sinceMs + " provided";
            }
            else {
                sinceSucceed = true;
            }
        }
    }
    if (modLimiters &&
        modLimiters.condition === "AND" &&
        sinceError) {
        throw new errors_1.EndpointError({
            message: sinceError,
            code: constants_1.ENDPOINT_ERRORS.UNSPECIFIED,
        });
    }
    let createdBySucceed = false;
    if (modLimiters && modLimiters.createdBy) {
        createdBySucceed = !!(args.created_by);
    }
    if (modLimiters &&
        modLimiters.condition === "AND" &&
        !createdBySucceed) {
        throw new errors_1.EndpointError({
            message: "Created by is required as a limiter, yet none was specified",
            code: constants_1.ENDPOINT_ERRORS.UNSPECIFIED,
        });
    }
    let parentingSucceed = false;
    if (modLimiters && modLimiters.parenting) {
        parentingSucceed = !!(args.parent_id && args.parent_type);
    }
    if (modLimiters &&
        modLimiters.condition === "AND" &&
        !parentingSucceed) {
        throw new errors_1.EndpointError({
            message: "Parenting is required as a limiter, yet none was specified",
            code: constants_1.ENDPOINT_ERRORS.UNSPECIFIED,
        });
    }
    if (modLimiters && modLimiters.condition === "OR") {
        const passedCustom = modLimiters.custom && someModCustomLimiterSucceed;
        const passedSince = modLimiters.since && sinceSucceed;
        const passedCreatedBy = modLimiters.createdBy && createdBySucceed;
        const passedParenting = modLimiters.parenting && parentingSucceed;
        if (passedCustom ||
            passedSince ||
            passedCreatedBy ||
            passedParenting) {
            return;
        }
        throw new errors_1.EndpointError({
            message: "None of the OR request limiting conditions from the module passed",
            code: constants_1.ENDPOINT_ERRORS.UNSPECIFIED,
        });
    }
    if (idefLimiters && idefLimiters.condition === "OR") {
        const passedCustom = modLimiters.custom && someIdefCustomLimiterSucceed;
        if (passedCustom) {
            return;
        }
        throw new errors_1.EndpointError({
            message: "None of the OR request limiting conditions from the item definition passed",
            code: constants_1.ENDPOINT_ERRORS.UNSPECIFIED,
        });
    }
}
exports.checkLimiters = checkLimiters;
/**
 * Checks that the limit of search results is within the range that the item
 * defintion allows
 */
function checkLimit(limit, idefOrMod, traditional) {
    const mod = idefOrMod instanceof Module_1.default ? idefOrMod : idefOrMod.getParentModule();
    const maxSearchResults = traditional ? mod.getMaxSearchResults() : mod.getMaxSearchRecords();
    if (limit > maxSearchResults) {
        throw new errors_1.EndpointError({
            message: "Too many " + (traditional ? "results" : "records") + " at once, max is " + maxSearchResults,
            code: constants_1.ENDPOINT_ERRORS.UNSPECIFIED,
        });
    }
    CAN_LOG_SILLY && __1.logger.silly("checkLimit: checking limits succeed");
}
exports.checkLimit = checkLimit;
function checkListTypes(records, mod) {
    records.forEach((idContainer) => {
        const itemDefinition = mod.getParentRoot().registry[idContainer.type];
        if (!itemDefinition) {
            throw new errors_1.EndpointError({
                message: "Unknown qualified path name for " + idContainer.type,
                code: constants_1.ENDPOINT_ERRORS.UNSPECIFIED,
            });
        }
        else if (itemDefinition instanceof Module_1.default) {
            throw new errors_1.EndpointError({
                message: "Expected qualified identifier for item definition but got one for module " + idContainer.type,
                code: constants_1.ENDPOINT_ERRORS.UNSPECIFIED,
            });
        }
        if (itemDefinition.getParentModule() !== mod) {
            throw new errors_1.EndpointError({
                message: "Invalid parent for " + idContainer.type + " expected parent as " + mod.getQualifiedPathName(),
                code: constants_1.ENDPOINT_ERRORS.UNSPECIFIED,
            });
        }
    });
    CAN_LOG_SILLY && __1.logger.silly("checkListLimit: checking list types succeed");
}
exports.checkListTypes = checkListTypes;
/**
 * Checks the language and region given the arguments passed
 * by the graphql resolver
 * @param appData the app data that is currently in context
 * @param args the args themselves being passed to the resolver
 */
function checkLanguage(appData, args) {
    // basically we check the type and if the lenght is right
    if (typeof args.language !== "string" || args.language.length !== 2) {
        throw new errors_1.EndpointError({
            message: "Please use valid non-regionalized language values",
            code: constants_1.ENDPOINT_ERRORS.UNSPECIFIED,
        });
    }
    // now we check if this is one of the languages we have
    // a dictionary assigned, only languages with a dictionary
    // assigned can be used by the database
    if (!appData.config.dictionaries[args.language]) {
        throw new errors_1.EndpointError({
            message: "This language is not supported, as no dictionary has been set",
            code: constants_1.ENDPOINT_ERRORS.UNSPECIFIED,
        });
    }
    CAN_LOG_SILLY && __1.logger.silly("checkLanguage: checking limits succeed");
}
exports.checkLanguage = checkLanguage;
/**
 * Checks that a given user can perform the given search
 * as it was requested
 * @param args the args
 * @param moduleOrIdef a module or an item definition the search is held against
 * @param tokenData the token data
 */
function checkUserCanSearch(args, moduleOrIdef, tokenData) {
    const roles = moduleOrIdef.getRolesWithSearchAccess();
    if (roles.includes(constants_1.ANYONE_METAROLE) ||
        roles.includes(tokenData.role)) {
        return;
    }
    const canOwnerSearch = roles.includes(constants_1.OWNER_METAROLE);
    if (canOwnerSearch && args.created_by === tokenData.id) {
        return;
    }
    else if (canOwnerSearch && args.created_by && tokenData.id && args.created_by !== tokenData.id) {
        throw new errors_1.EndpointError({
            message: "You have requested a search for items owned by user " + args.created_by +
                " , but you identify yourself as " + tokenData.id,
            code: constants_1.ENDPOINT_ERRORS.FORBIDDEN,
        });
    }
    throw new errors_1.EndpointError({
        message: "Your role is forbidden from performing search",
        code: constants_1.ENDPOINT_ERRORS.FORBIDDEN,
    });
}
exports.checkUserCanSearch = checkUserCanSearch;
/**
 * This just extracts the dictionary given the app data
 * and the language of choice
 * @param appData the app data
 * @param args the whole args of the graphql request
 */
function getDictionary(appData, args) {
    const dictionary = appData.config.dictionaries[args.language];
    CAN_LOG_SILLY && __1.logger.silly("getDictionary: got dictionary " + dictionary);
    return dictionary;
}
exports.getDictionary = getDictionary;
/**
 * Validates and checks that a given container id is valid
 * to store data in
 * @param containerId the container id
 * @param sensitiveConfig the sensitive config
 */
function validateContainerIdIsReal(containerId, sensitiveConfig) {
    if (!sensitiveConfig.openstackContainers[containerId]) {
        throw new errors_1.EndpointError({
            message: "Container id " + containerId + " does not exist",
            code: constants_1.ENDPOINT_ERRORS.UNSPECIFIED,
        });
    }
}
exports.validateContainerIdIsReal = validateContainerIdIsReal;
/**
 * Validates the current token isn't blocked whether it is said so
 * by the rules of the session id, user is removed, or invalid credentials
 * @param cache the appdata cache instance
 * @param tokenData the token data obtained and parsed
 */
async function validateTokenIsntBlocked(cache, tokenData) {
    if (tokenData.id && (!tokenData.custom || tokenData.isRealUser)) {
        let sqlResult;
        try {
            sqlResult = await cache.requestValue("MOD_users__IDEF_user", tokenData.id, null);
        }
        catch (err) {
            __1.logger.error("validateTokenIsntBlocked [SERIOUS]: Couldn't validate whether the token is blocked or not", {
                errStack: err.stack,
                errMessage: err.message,
                tokenData,
            });
            throw err;
        }
        if (!sqlResult) {
            throw new errors_1.EndpointError({
                message: "User has been removed",
                code: constants_1.ENDPOINT_ERRORS.USER_REMOVED,
            });
        }
        else if (sqlResult.blocked_at !== null) {
            throw new errors_1.EndpointError({
                message: "User is Blocked",
                code: constants_1.ENDPOINT_ERRORS.USER_BLOCKED,
            });
        }
        else if ((sqlResult.session_id || 0) !== tokenData.sessionId) {
            throw new errors_1.EndpointError({
                message: "Token has been rendered invalid",
                code: constants_1.ENDPOINT_ERRORS.INVALID_CREDENTIALS,
            });
        }
        else if (sqlResult.role !== tokenData.role) {
            throw new errors_1.EndpointError({
                message: "Token has role mismatch",
                code: constants_1.ENDPOINT_ERRORS.INVALID_CREDENTIALS,
            });
        }
    }
    CAN_LOG_SILLY && __1.logger.silly("validateTokenIsntBlocked: token block checking succeed");
}
exports.validateTokenIsntBlocked = validateTokenIsntBlocked;
async function checkUserExists(cache, id) {
    let sqlResult;
    try {
        sqlResult = await cache.requestValue("MOD_users__IDEF_user", id, null);
    }
    catch (err) {
        __1.logger.error("checkUserExists [SERIOUS]: Couldn't check whether the user exists", {
            errStack: err.stack,
            errMessage: err.message,
            userId: id,
        });
        throw err;
    }
    if (!sqlResult) {
        throw new errors_1.EndpointError({
            message: "User has been removed",
            code: constants_1.ENDPOINT_ERRORS.USER_REMOVED,
        });
    }
    CAN_LOG_SILLY && __1.logger.silly("checkUserExists: check user exist succeed");
}
exports.checkUserExists = checkUserExists;
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
function filterAndPrepareGQLValue(knex, serverData, value, requestedFields, role, parentModuleOrIdef) {
    // we are going to get the value for the item
    let valueOfTheItem;
    if (parentModuleOrIdef instanceof ItemDefinition_1.default) {
        // we convert the value we were provided, of course, we only need
        // to process what was requested
        valueOfTheItem = sql_1.convertSQLValueToGQLValueForItemDefinition(knex, serverData, parentModuleOrIdef, value, requestedFields);
    }
    else {
        // same for modules
        valueOfTheItem = sql_2.convertSQLValueToGQLValueForModule(knex, serverData, parentModuleOrIdef, value, requestedFields);
    }
    // we add the object like this, all the non requested data, eg.
    // values inside that should be outside, and outside that will be inside
    // will be stripped
    const actualValue = {
        DATA: valueOfTheItem,
    };
    const finalRequestFields = {
        DATA: { ...requestedFields },
    };
    constants_1.EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES.forEach((property) => {
        if (typeof value[property] !== "undefined" && requestedFields[property]) {
            actualValue[property] = value[property];
            delete actualValue.DATA[property];
            finalRequestFields[property] = {};
            delete finalRequestFields.DATA[property];
        }
    });
    const valueToProvide = {
        toReturnToUser: actualValue,
        actualValue,
        requestFields: finalRequestFields,
        convertedValue: valueOfTheItem,
    };
    if (value.blocked_at !== null) {
        const rolesThatHaveAccessToModerationFields = parentModuleOrIdef.getRolesWithModerationAccess();
        const hasAccessToModerationFields = rolesThatHaveAccessToModerationFields.includes(constants_1.ANYONE_METAROLE) ||
            (rolesThatHaveAccessToModerationFields.includes(constants_1.ANYONE_LOGGED_METAROLE) && role !== constants_1.GUEST_METAROLE) ||
            rolesThatHaveAccessToModerationFields.includes(role);
        if (!hasAccessToModerationFields) {
            valueToProvide.toReturnToUser.DATA = null;
        }
    }
    CAN_LOG_SILLY && __1.logger.silly("validateTokenIsntBlocked: prepared the value to provide", valueToProvide);
    return valueToProvide;
}
exports.filterAndPrepareGQLValue = filterAndPrepareGQLValue;
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
async function serverSideCheckItemDefinitionAgainst(itemDefinition, gqlArgValue, id, version, referredInclude, referredParentOfInclude) {
    // we get the current value of the item definition instance
    let currentValue;
    try {
        currentValue = await itemDefinition.getState(id, version);
    }
    catch (err) {
        __1.logger.error("serverSideCheckItemDefinitionAgainst [SERIOUS]: Couldn't retrieve item definition state", {
            errStack: err.stack,
            errMessage: err.message,
            id,
            version,
            itemDefinition: itemDefinition.getQualifiedPathName(),
            referredInclude: referredInclude ? referredInclude.getQualifiedIdentifier() : null,
            referredParentOfInclude: referredParentOfInclude ? referredParentOfInclude.getQualifiedPathName() : null,
        });
        throw err;
    }
    CAN_LOG_SILLY && __1.logger.silly("serverSideCheckItemDefinitionAgainst: current state value for " + id + " and " + version, currentValue);
    // now we are going to loop over the properties of that value
    currentValue.properties.forEach((propertyValue) => {
        // and we get what is set in the graphql value
        const gqlPropertyValue = gqlArgValue[propertyValue.propertyId];
        // now we check if it has an invalid reason
        if (propertyValue.invalidReason) {
            CAN_LOG_SILLY && __1.logger.silly("serverSideCheckItemDefinitionAgainst: failed due to property " + propertyValue.propertyId + " failing", propertyValue);
            // throw an error then
            throw new errors_1.EndpointError({
                message: `validation failed at property ${propertyValue.propertyId} with error ${propertyValue.invalidReason}`,
                code: constants_1.ENDPOINT_ERRORS.INVALID_PROPERTY,
                pcode: propertyValue.invalidReason,
                modulePath: (referredParentOfInclude || itemDefinition).getParentModule().getPath(),
                itemDefPath: (referredParentOfInclude || itemDefinition).getPath(),
                includeId: referredInclude && referredInclude.getId(),
                includeIdItemDefPath: referredParentOfInclude && referredParentOfInclude.getPath(),
                propertyId: propertyValue.propertyId,
            });
            // we also check that the values are matching, but only if they have been
            // defined in the graphql value
        }
        else if (typeof gqlPropertyValue !== "undefined" && !deep_equal_1.default(gqlPropertyValue, propertyValue.value)) {
            CAN_LOG_SILLY && __1.logger.silly("serverSideCheckItemDefinitionAgainst: failed due to property " + propertyValue.propertyId + " being unequal", {
                propertyValue,
                gqlPropertyValue,
            });
            throw new errors_1.EndpointError({
                message: `validation failed at property ${propertyValue.propertyId} with a mismatch of calculated value`,
                code: constants_1.ENDPOINT_ERRORS.INVALID_PROPERTY,
                // someone might have been trying to hack for this to happen
                // a null pcode is a red flag, well almost all these checks show tampering
                // this will make the client side give an error nevertheless
                pcode: null,
                modulePath: (referredParentOfInclude || itemDefinition).getParentModule().getPath(),
                itemDefPath: (referredParentOfInclude || itemDefinition).getPath(),
                includeId: referredInclude && referredInclude.getId(),
                includeIdItemDefPath: referredParentOfInclude && referredParentOfInclude.getPath(),
                propertyId: propertyValue.propertyId,
            });
        }
    });
    // we now check the items
    for (const includeValue of currentValue.includes) {
        // now we take the item itself
        const include = itemDefinition.getIncludeFor(includeValue.includeId);
        // the graphql item value
        let gqlIncludeValue = gqlArgValue[include.getQualifiedIdentifier()];
        // if it's undefined we make it null
        if (typeof gqlIncludeValue === "undefined") {
            gqlIncludeValue = null;
        }
        // the graphql exclusion state value
        const gqlExclusionState = gqlArgValue[include.getQualifiedExclusionStateIdentifier()] || null;
        // now we check if the exclusion states match
        if (includeValue.exclusionState !== gqlExclusionState) {
            CAN_LOG_SILLY && __1.logger.silly("serverSideCheckItemDefinitionAgainst: failed due to exclusion mismatch", {
                includeValue,
                gqlExclusionState,
            });
            throw new errors_1.EndpointError({
                message: `validation failed at include ${includeValue.includeId} with a mismatch of exclusion state`,
                code: constants_1.ENDPOINT_ERRORS.INVALID_INCLUDE,
                modulePath: (referredParentOfInclude || itemDefinition).getParentModule().getPath(),
                itemDefPath: (referredParentOfInclude || itemDefinition).getPath(),
                includeId: includeValue.includeId,
                includeIdItemDefPath: referredParentOfInclude && referredParentOfInclude.getPath(),
            });
            // and we check if the there's a value set despite it being excluded
        }
        else if (gqlExclusionState === Include_1.IncludeExclusionState.EXCLUDED && gqlIncludeValue !== null) {
            CAN_LOG_SILLY && __1.logger.silly("serverSideCheckItemDefinitionAgainst: failed due to value set on include where it was excluded", {
                includeValue,
                gqlExclusionState,
            });
            throw new errors_1.EndpointError({
                message: `validation failed at include ${includeValue.includeId} with an excluded item but data set for it`,
                code: constants_1.ENDPOINT_ERRORS.INVALID_INCLUDE,
                modulePath: (referredParentOfInclude || itemDefinition).getParentModule().getPath(),
                itemDefPath: (referredParentOfInclude || itemDefinition).getPath(),
                includeId: includeValue.includeId,
                includeIdItemDefPath: referredParentOfInclude && referredParentOfInclude.getPath(),
            });
        }
        // now we run a server side check of item definition in the
        // specific item data, that's where we use our referred item
        await serverSideCheckItemDefinitionAgainst(include.getItemDefinition(), gqlIncludeValue, id, version, include, referredParentOfInclude || itemDefinition);
    }
    CAN_LOG_SILLY && __1.logger.silly("serverSideCheckItemDefinitionAgainst: succeed checking item definition consistency");
}
exports.serverSideCheckItemDefinitionAgainst = serverSideCheckItemDefinitionAgainst;
/**
 * Users cannot search if they have an active read policy in their roles
 * this function checks and throws an error if there's such a thing
 * @param itemDefinition the item definition to check read policies for
 * @param role the role
 */
function checkReadPoliciesAllowThisUserToSearch(itemDefinition, role) {
    const policiesForThisType = itemDefinition.getPolicyNamesFor("read");
    policiesForThisType.forEach((policyName) => {
        const roles = itemDefinition.getRolesForPolicy("read", policyName);
        if (roles.includes(role) ||
            roles.includes(constants_1.ANYONE_METAROLE) ||
            (roles.includes(constants_1.ANYONE_LOGGED_METAROLE) && role !== constants_1.GUEST_METAROLE)) {
            throw new errors_1.EndpointError({
                message: "Searching with an active read policy is not allowed, the policy in question is " + policyName,
                code: constants_1.ENDPOINT_ERRORS.FORBIDDEN,
            });
        }
    });
    CAN_LOG_SILLY && __1.logger.silly("checkReadPoliciesAllowThisUserToSearch: succeed checking policies allow user to search");
}
exports.checkReadPoliciesAllowThisUserToSearch = checkReadPoliciesAllowThisUserToSearch;
const reservedKeys = Object.keys(constants_1.RESERVED_BASE_PROPERTIES);
/**
 * Splits the arguments in a graphql query from what it comes to be part
 * of the item definition or module in question and what is extra arguments
 * that are used within the query
 * @param moduleOrItemDefinition the module or item definition
 * @param args the arguments to split
 */
function splitArgsInGraphqlQuery(moduleOrItemDefinition, args) {
    const resultingSelfValues = {};
    const resultingExtraArgs = {};
    const propertyIds = (moduleOrItemDefinition instanceof Module_1.default ?
        moduleOrItemDefinition.getAllPropExtensions() :
        moduleOrItemDefinition.getAllPropertyDefinitionsAndExtensions()).map((p) => p.getId());
    const includeIds = (moduleOrItemDefinition instanceof Module_1.default ? [] :
        moduleOrItemDefinition.getAllIncludes()).map((i) => i.getQualifiedIdentifier());
    Object.keys(args).forEach((key) => {
        if (propertyIds.includes(key) || includeIds.includes(key) || reservedKeys.includes(key)) {
            resultingSelfValues[key] = args[key];
        }
        else {
            resultingExtraArgs[key] = args[key];
        }
    });
    CAN_LOG_SILLY && __1.logger.silly("splitArgsInGraphqlQuery: succeed splitting args for graphql");
    return [resultingSelfValues, resultingExtraArgs];
}
exports.splitArgsInGraphqlQuery = splitArgsInGraphqlQuery;
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
async function runPolicyCheck(arg) {
    CAN_LOG_SILLY && __1.logger.silly("runPolicyCheck: Executed policy check for item definition");
    // so now we get the information we need first
    const mod = arg.itemDefinition.getParentModule();
    let selectQueryValue = null;
    let parentSelectQueryValue = null;
    if (arg.policyTypes.includes("read") || arg.policyTypes.includes("delete") || arg.policyTypes.includes("edit")) {
        try {
            selectQueryValue = await arg.cache.requestValue(arg.itemDefinition, arg.id, arg.version);
        }
        catch (err) {
            __1.logger.error("runPolicyCheck [SERIOUS]: could not run policy checks due to cache/database fail", {
                id: arg.id,
                version: arg.version,
                itemDefinition: arg.itemDefinition,
            });
            throw err;
        }
    }
    if (arg.policyTypes.includes("parent")) {
        try {
            parentSelectQueryValue = await arg.cache.requestValue(arg.parentType, arg.parentId, arg.parentVersion);
        }
        catch (err) {
            __1.logger.error("runPolicyCheck [SERIOUS]: could not run policy checks due to cache/database fail on parent rule", {
                parentVersion: arg.parentVersion,
                parentId: arg.parentId,
                parentType: arg.parentType,
                parentModule: arg.parentModule
            });
            throw err;
        }
    }
    if (arg.preValidation) {
        const forcedResult = arg.preValidation(selectQueryValue);
        if (typeof forcedResult !== "undefined") {
            return forcedResult;
        }
    }
    if (arg.preParentValidation) {
        const forcedResult2 = arg.preParentValidation(parentSelectQueryValue);
        if (typeof forcedResult2 !== "undefined") {
            return forcedResult2;
        }
    }
    for (const policyType of arg.policyTypes) {
        // let's get all the policies that we have for this policy type group
        const policiesForThisType = arg.itemDefinition.getPolicyNamesFor(policyType);
        // so we loop in these policies
        for (const policyName of policiesForThisType) {
            CAN_LOG_SILLY && __1.logger.silly("runPolicyCheck: Found policy", {
                policyName,
            });
            // and we get the roles that need to apply to this policy
            const rolesForThisSpecificPolicy = arg.itemDefinition.getRolesForPolicy(policyType, policyName);
            // if this is not our user, we can just continue with the next
            if (!rolesForThisSpecificPolicy.includes(arg.role)) {
                CAN_LOG_SILLY && __1.logger.silly("ignoring policy the role does not require it", {
                    policyName,
                    role: arg.role,
                    rolesForThisSpecificPolicy,
                });
                continue;
            }
            const gqlCheckingElement = policyType === "read" ? arg.gqlFlattenedRequestedFiels : arg.gqlArgValue;
            if (policyType !== "delete" && policyType !== "parent") {
                const applyingPropertyIds = arg.itemDefinition.getApplyingPropertyIdsForPolicy(policyType, policyName);
                const applyingPropertyOnlyAppliesWhenCurrentIsNonNull = arg.itemDefinition.doesApplyingPropertyOnlyAppliesWhenCurrentIsNonNull(policyType, policyName);
                let someIncludeOrPropertyIsApplied = false;
                if (applyingPropertyIds) {
                    someIncludeOrPropertyIsApplied =
                        applyingPropertyIds.some((applyingPropertyId) => {
                            const isDefinedInReadOrEdit = typeof gqlCheckingElement[applyingPropertyId] !== "undefined";
                            const isCurrentlyNull = selectQueryValue[applyingPropertyId] === null;
                            if (applyingPropertyOnlyAppliesWhenCurrentIsNonNull && isCurrentlyNull) {
                                return false;
                            }
                            return isDefinedInReadOrEdit;
                        });
                }
                if (!someIncludeOrPropertyIsApplied) {
                    const applyingIncludeIds = arg.itemDefinition.getApplyingIncludeIdsForPolicy(policyType, policyName);
                    if (applyingIncludeIds) {
                        someIncludeOrPropertyIsApplied =
                            applyingIncludeIds.some((applyingIncludeId) => {
                                const include = arg.itemDefinition.getIncludeFor(applyingIncludeId);
                                return (typeof gqlCheckingElement[include.getQualifiedIdentifier()] !== "undefined" ||
                                    typeof gqlCheckingElement[include.getQualifiedExclusionStateIdentifier()] !== "undefined");
                            });
                    }
                }
                if (!someIncludeOrPropertyIsApplied) {
                    CAN_LOG_SILLY && __1.logger.silly("runPolicyCheck: ignoring policy as there was no match for applying property or include", {
                        policyName,
                        applyingPropertyIds,
                    });
                    continue;
                }
            }
            // otherwise we need to see which properties are in consideration for this
            // policy
            const propertiesInContext = arg.itemDefinition.getPropertiesForPolicy(policyType, policyName);
            // we loop through those properties
            for (const property of propertiesInContext) {
                CAN_LOG_SILLY && __1.logger.silly("runPolicyCheck: found property in policy", {
                    propertyId: property.getId(),
                });
                // now we need the qualified policy identifier, that's where in the args
                // the value for this policy is stored
                const qualifiedPolicyIdentifier = property.getQualifiedPolicyIdentifier(policyType, policyName);
                // and like that we get the value that has been set for that policy
                let policyValueForTheProperty = arg.gqlArgValue[qualifiedPolicyIdentifier];
                // if it's undefined, we set it to null
                if (typeof policyValueForTheProperty === "undefined") {
                    policyValueForTheProperty = null;
                }
                CAN_LOG_SILLY && __1.logger.silly("runPolicyCheck: Property qualified policy identifier found and value is set", {
                    qualifiedPolicyIdentifier,
                    policyValueForTheProperty,
                });
                // now we check if it's a valid value, the value we have given, for the given property
                // this is a shallow check but works
                let invalidReason;
                try {
                    invalidReason = await property.isValidValue(arg.id, arg.version, policyValueForTheProperty);
                }
                catch (err) {
                    __1.logger.error("runPolicyCheck [SERIOUS]: couldn't check if the value is valid", {
                        id: arg.id,
                        version: arg.version,
                        policyValueForTheProperty,
                    });
                    throw err;
                }
                // if we get an invalid reason, the policy cannot even pass there
                if (invalidReason) {
                    CAN_LOG_SILLY && __1.logger.silly("runPolicyCheck: Failed for not passing property validation", {
                        invalidReason,
                    });
                    throw new errors_1.EndpointError({
                        message: `validation failed for ${qualifiedPolicyIdentifier} with reason ${invalidReason}`,
                        code: constants_1.ENDPOINT_ERRORS.INVALID_POLICY,
                        modulePath: mod.getPath(),
                        itemDefPath: arg.itemDefinition.getPath(),
                        policyType,
                        policyName,
                    });
                }
                // otherwise we create a selection meta column, for our policy using the sql equal
                // which will create a column field with the policy name that is going to be
                // equal to that value, eg. "name" = 'policyValueForProperty' AS "MY_POLICY"
                // because policies are uppercase this avoids collisions with properties
                const policyMatches = property.getPropertyDefinitionDescription().sqlSSCacheEqual({
                    id: property.getId(),
                    value: policyValueForTheProperty,
                    prefix: "",
                    row: policyType === "parent" ? parentSelectQueryValue : selectQueryValue,
                    property,
                    knex: arg.knex,
                    serverData: arg.cache.getServerData(),
                    itemDefinition: arg.itemDefinition,
                });
                if (!policyMatches) {
                    CAN_LOG_SILLY && __1.logger.silly("runPolicyCheck: Failed due to policy not pasing", {
                        policyName,
                    });
                    throw new errors_1.EndpointError({
                        message: `validation failed for policy ${policyName}`,
                        code: constants_1.ENDPOINT_ERRORS.INVALID_POLICY,
                        modulePath: mod.getPath(),
                        itemDefPath: arg.itemDefinition.getPath(),
                        policyType,
                        policyName,
                    });
                }
            }
        }
    }
    CAN_LOG_SILLY && __1.logger.silly("runPolicyCheck: Completed checking policies");
    return selectQueryValue;
}
exports.runPolicyCheck = runPolicyCheck;
