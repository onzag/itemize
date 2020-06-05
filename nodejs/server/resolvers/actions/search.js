"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../../server");
const basic_1 = require("../basic");
const ItemDefinition_1 = require("../../../base/Root/Module/ItemDefinition");
const sql_1 = require("../../../base/Root/Module/sql");
const constants_1 = require("../../../constants");
const sql_2 = require("../../../base/Root/Module/ItemDefinition/sql");
const version_null_value_1 = require("../../version-null-value");
const gql_util_1 = require("../../../gql-util");
const graphql_fields_1 = __importDefault(require("graphql-fields"));
const nanodate_1 = require("../../../nanodate");
const errors_1 = require("../../../base/errors");
function findLastRecordDateCheatMethod(records) {
    let maximumRecords = null;
    let maximumRecordId = null;
    records.forEach((record) => {
        if (!maximumRecordId || record.id > maximumRecordId) {
            maximumRecordId = record.id;
            maximumRecords = [record];
        }
        else if (maximumRecordId === record.id) {
            maximumRecords.push(record);
        }
    });
    if (!maximumRecords.length) {
        return null;
    }
    if (maximumRecords.length === 1) {
        return maximumRecords[0].created_at;
    }
    if (maximumRecords.length === 2) {
        const versionedRecord = maximumRecords.find((r) => r.version !== null);
        return versionedRecord.created_at;
    }
    const recordsRespectiveNanoSecondAccuracyArray = maximumRecords.map((r) => new nanodate_1.NanoSecondComposedDate(r.created_at));
    const maxDate = recordsRespectiveNanoSecondAccuracyArray.reduce((prev, cur) => {
        return prev.greaterThan(cur) ? prev : cur;
    });
    return maxDate.original;
}
function searchModuleTraditional(appData, resolverArgs, mod) {
    return searchModule(appData, resolverArgs, mod, true);
}
exports.searchModuleTraditional = searchModuleTraditional;
async function searchModule(appData, resolverArgs, mod, traditional) {
    server_1.logger.debug("searchModule: executed search for " + mod.getQualifiedPathName());
    const since = basic_1.retrieveSince(resolverArgs.args);
    basic_1.checkLimit(resolverArgs.args.limit, mod, traditional);
    basic_1.checkLimiters(resolverArgs.args, mod);
    // check language and region
    basic_1.checkLanguage(appData, resolverArgs.args);
    const tokenData = await basic_1.validateTokenAndGetData(appData, resolverArgs.args.token);
    await basic_1.validateTokenIsntBlocked(appData.cache, tokenData);
    // now build the fields we are searching
    const searchingFields = {};
    // the search mode counterpart module
    const searchModeCounterpart = mod.getSearchModule();
    // now we loop over the arguments
    Object.keys(resolverArgs.args).forEach((arg) => {
        // if the search mode module has a propextension for that argument
        if (searchModeCounterpart.hasPropExtensionFor(arg)) {
            // then it's one of the fields we are searching against
            searchingFields[arg] = resolverArgs.args[arg];
        }
    });
    server_1.logger.debug("searchModule: retrieved search fields as", searchingFields);
    const created_by = resolverArgs.args.created_by;
    let ownerToCheckAgainst = constants_1.UNSPECIFIED_OWNER;
    if (created_by) {
        ownerToCheckAgainst = created_by;
    }
    // check role access for those searching fields
    // yes they are not being directly read but they can
    // be brute forced this way, and we are paranoid as hell
    server_1.logger.debug("searchModule: checking read role access based on " + searchModeCounterpart.getQualifiedPathName());
    searchModeCounterpart.checkRoleAccessFor(ItemDefinition_1.ItemDefinitionIOActions.READ, tokenData.role, tokenData.id, ownerToCheckAgainst, searchingFields, true);
    let fieldsToRequest = ["id", "version", "type", "created_at"];
    let requestedFields = null;
    const generalFields = graphql_fields_1.default(resolverArgs.info);
    if (traditional) {
        requestedFields = gql_util_1.flattenRawGQLValueOrFields(generalFields.results);
        basic_1.checkBasicFieldsAreAvailableForRole(mod, tokenData, requestedFields);
        fieldsToRequest = Object.keys(requestedFields);
        const requestedFieldsInMod = {};
        Object.keys(requestedFields || {}).forEach((arg) => {
            if (mod.hasPropExtensionFor(arg)) {
                requestedFieldsInMod[arg] = requestedFields[arg];
            }
        });
        server_1.logger.debug("searchModule: Extracted requested fields from module", fieldsToRequest);
        if (!fieldsToRequest.includes("created_at")) {
            fieldsToRequest.push("created_at");
        }
        if (!fieldsToRequest.includes("blocked_at")) {
            fieldsToRequest.push("blocked_at");
        }
        mod.checkRoleAccessFor(ItemDefinition_1.ItemDefinitionIOActions.READ, tokenData.role, tokenData.id, ownerToCheckAgainst, requestedFieldsInMod, true);
    }
    // now we build the search query, the search query only matches an id
    // note how we remove blocked_at
    const queryModel = appData.knex.table(mod.getQualifiedPathName())
        .where("blocked_at", null);
    if (created_by) {
        queryModel.andWhere("created_by", created_by);
    }
    if (since) {
        queryModel.andWhere("created_at", ">=", since);
    }
    if (typeof resolverArgs.args.version_filter !== "undefined") {
        queryModel.andWhere("version", resolverArgs.args.version_filter || "");
    }
    // now we build the sql query for the module
    const addedSearchRaw = sql_1.buildSQLQueryForModule(mod, resolverArgs.args, queryModel, basic_1.getDictionary(appData, resolverArgs.args), resolverArgs.args.search, resolverArgs.args.order_by);
    // if we filter by type
    if (resolverArgs.args.types) {
        queryModel.andWhere("type", resolverArgs.args.types);
    }
    const searchQuery = queryModel.clone();
    const limit = resolverArgs.args.limit;
    const offset = resolverArgs.args.offset;
    searchQuery.select(fieldsToRequest);
    addedSearchRaw.forEach((srApplyArgs) => {
        searchQuery.select(appData.knex.raw(...srApplyArgs));
    });
    searchQuery.limit(limit).offset(offset);
    const countQuery = queryModel.clone().count();
    countQuery.clearOrder();
    // return using the base result, and only using the id
    const baseResult = (generalFields.results || generalFields.records) ?
        (await searchQuery).map(version_null_value_1.convertVersionsIntoNullsWhenNecessary) :
        null;
    const countResult = generalFields.count ? (await countQuery) : null;
    const count = (countResult[0] && countResult[0].count) || null;
    if (traditional) {
        const finalResult = {
            results: baseResult.map((r) => {
                return basic_1.filterAndPrepareGQLValue(r, requestedFields, tokenData.role, mod).toReturnToUser;
            }),
            limit,
            offset,
            count,
        };
        server_1.logger.debug("searchModule: succeed traditionally");
        return finalResult;
    }
    else {
        const finalResult = {
            records: baseResult,
            last_record_date: findLastRecordDateCheatMethod(baseResult),
            limit,
            offset,
            count,
        };
        server_1.logger.debug("searchModule: succeed with records");
        return finalResult;
    }
}
exports.searchModule = searchModule;
function searchItemDefinitionTraditional(appData, resolverArgs, itemDefinition) {
    return searchItemDefinition(appData, resolverArgs, itemDefinition, true);
}
exports.searchItemDefinitionTraditional = searchItemDefinitionTraditional;
async function searchItemDefinition(appData, resolverArgs, resolverItemDefinition, traditional) {
    let pooledRoot;
    try {
        pooledRoot = await appData.rootPool.acquire().promise;
    }
    catch (err) {
        server_1.logger.error("addItemDefinition [SERIOUS]: Failed to retrieve root from the pool", {
            errMessage: err.message,
            errStack: err.stack,
        });
        throw new errors_1.EndpointError({
            message: "Failed to retrieve root from the pool",
            code: constants_1.ENDPOINT_ERRORS.INTERNAL_SERVER_ERROR,
        });
    }
    const itemDefinition = pooledRoot.registry[resolverItemDefinition.getQualifiedPathName()];
    server_1.logger.debug("searchItemDefinition: executed search for " + itemDefinition.getQualifiedPathName());
    const since = basic_1.retrieveSince(resolverArgs.args);
    basic_1.checkLimit(resolverArgs.args.limit, itemDefinition, traditional);
    basic_1.checkLimiters(resolverArgs.args, itemDefinition);
    // check the language and region
    basic_1.checkLanguage(appData, resolverArgs.args);
    const tokenData = await basic_1.validateTokenAndGetData(appData, resolverArgs.args.token);
    basic_1.checkReadPoliciesAllowThisUserToSearch(itemDefinition, tokenData.role);
    await basic_1.validateTokenIsntBlocked(appData.cache, tokenData);
    // now we need to get the fields that we are using to search
    const searchingFields = {};
    // for that we get the search mode counterpart of the item definition,
    // this is another item definition which provides search information
    const searchModeCounterpart = itemDefinition.getSearchModeCounterpart();
    // now we loop into every argument we were given
    Object.keys(resolverArgs.args).forEach((arg) => {
        // and we check if they are part of the searching query
        // for that they have to be part of the search query
        if (searchModeCounterpart.hasPropertyDefinitionFor(arg, true) ||
            arg.startsWith(constants_1.INCLUDE_PREFIX) && searchModeCounterpart.hasIncludeFor(arg.replace(constants_1.INCLUDE_PREFIX, ""))) {
            // add it and isolate it
            searchingFields[arg] = resolverArgs.args[arg];
        }
    });
    server_1.logger.debug("searchItemDefinition: retrieved search fields as", searchingFields);
    const created_by = resolverArgs.args.created_by;
    let ownerToCheckAgainst = constants_1.UNSPECIFIED_OWNER;
    if (created_by) {
        ownerToCheckAgainst = created_by;
    }
    // We also check for the role access of the search fields
    // the reason is simple, if we can use the query to query
    // the value of something we don't have access to, then, we
    // can brute force the value; for example, let's say we have
    // a &OWNER locked phone_number field, another user might wish
    // to know that phone number, so he starts a search process
    // and uses the EXACT_phone_number field, he will get returned null
    // until he matches the phone number, this is a leak, a weak one
    // but a leak nevertheless, we are so paranoid we prevent this
    server_1.logger.debug("searchItemDefinition: checking role access based on " + searchModeCounterpart.getQualifiedPathName());
    searchModeCounterpart.checkRoleAccessFor(ItemDefinition_1.ItemDefinitionIOActions.READ, tokenData.role, tokenData.id, ownerToCheckAgainst, searchingFields, true);
    // Checking search mode counterpart to validate
    searchModeCounterpart.applyValue(null, null, resolverArgs.args, false, tokenData.id, tokenData.role, null, false);
    await basic_1.serverSideCheckItemDefinitionAgainst(searchModeCounterpart, resolverArgs.args, null, null);
    // retrieve basic information
    const mod = itemDefinition.getParentModule();
    const moduleTable = mod.getQualifiedPathName();
    const selfTable = itemDefinition.getQualifiedPathName();
    let fieldsToRequest = ["id", "version", "type", "created_at"];
    let requestedFields = null;
    const generalFields = graphql_fields_1.default(resolverArgs.info);
    if (traditional) {
        requestedFields = gql_util_1.flattenRawGQLValueOrFields(generalFields.results);
        basic_1.checkBasicFieldsAreAvailableForRole(mod, tokenData, requestedFields);
        fieldsToRequest = Object.keys(requestedFields);
        const requestedFieldsInIdef = {};
        Object.keys(requestedFields || {}).forEach((arg) => {
            if (itemDefinition.hasPropertyDefinitionFor(arg, true) ||
                arg.startsWith(constants_1.INCLUDE_PREFIX) && itemDefinition.hasIncludeFor(arg.replace(constants_1.INCLUDE_PREFIX, ""))) {
                requestedFieldsInIdef[arg] = requestedFields[arg];
            }
        });
        server_1.logger.debug("searchItemDefinition: Extracted requested fields from module", fieldsToRequest);
        if (!fieldsToRequest.includes("created_at")) {
            fieldsToRequest.push("created_at");
        }
        if (!fieldsToRequest.includes("blocked_at")) {
            fieldsToRequest.push("blocked_at");
        }
        itemDefinition.checkRoleAccessFor(ItemDefinition_1.ItemDefinitionIOActions.READ, tokenData.role, tokenData.id, ownerToCheckAgainst, requestedFieldsInIdef, true);
    }
    // now we build the search query
    const queryModel = appData.knex.table(selfTable)
        .join(moduleTable, (clause) => {
        clause.on("id", "=", constants_1.CONNECTOR_SQL_COLUMN_ID_FK_NAME);
        clause.on("version", "=", constants_1.CONNECTOR_SQL_COLUMN_VERSION_FK_NAME);
    }).where("blocked_at", null);
    if (created_by) {
        queryModel.andWhere("created_by", created_by);
    }
    if (since) {
        queryModel.andWhere("created_at", ">=", since);
    }
    if (typeof resolverArgs.args.version_filter !== "undefined") {
        queryModel.andWhere("version", resolverArgs.args.version_filter || "");
    }
    if (resolverArgs.args.parent_id && resolverArgs.args.parent_type) {
        queryModel
            .andWhere("parent_id", resolverArgs.args.parent_id)
            .andWhere("parent_version", resolverArgs.args.parent_version || null)
            .andWhere("parent_type", resolverArgs.args.parent_type);
    }
    else {
        queryModel
            .andWhere("parent_id", null);
    }
    // and now we call the function that builds the query itself into
    // that parent query, and adds the andWhere as required
    // into such query
    const addedSearchRaw = sql_2.buildSQLQueryForItemDefinition(itemDefinition, resolverArgs.args, queryModel, basic_1.getDictionary(appData, resolverArgs.args), resolverArgs.args.search, resolverArgs.args.order_by);
    const searchQuery = queryModel.clone();
    const limit = resolverArgs.args.limit;
    const offset = resolverArgs.args.offset;
    searchQuery.select(fieldsToRequest);
    addedSearchRaw.forEach((srApplyArgs) => {
        searchQuery.select(appData.knex.raw(...srApplyArgs));
    });
    searchQuery.limit(limit).offset(offset);
    const countQuery = queryModel.clone().count();
    countQuery.clearOrder();
    // return using the base result, and only using the id
    const baseResult = (generalFields.results || generalFields.records) ?
        (await searchQuery).map(version_null_value_1.convertVersionsIntoNullsWhenNecessary) :
        null;
    const countResult = generalFields.count ? (await countQuery) : null;
    const count = (countResult[0] && countResult[0].count) || null;
    if (traditional) {
        const finalResult = {
            results: baseResult.map((r) => {
                return basic_1.filterAndPrepareGQLValue(r, requestedFields, tokenData.role, itemDefinition).toReturnToUser;
            }),
            limit,
            offset,
            count,
        };
        server_1.logger.debug("searchItemDefinition: succeed traditionally");
        pooledRoot.cleanState();
        appData.rootPool.release(pooledRoot);
        return finalResult;
    }
    else {
        const finalResult = {
            records: baseResult,
            last_record_date: findLastRecordDateCheatMethod(baseResult),
            limit,
            offset,
            count,
        };
        server_1.logger.debug("searchItemDefinition: succeed with records");
        pooledRoot.cleanState();
        appData.rootPool.release(pooledRoot);
        return finalResult;
    }
}
exports.searchItemDefinition = searchItemDefinition;
function searchItemDefinitionFn(appData) {
    return searchItemDefinition.bind(null, appData);
}
exports.searchItemDefinitionFn = searchItemDefinitionFn;
function searchModuleFn(appData) {
    return searchModule.bind(null, appData);
}
exports.searchModuleFn = searchModuleFn;
function searchItemDefinitionTraditionalFn(appData) {
    return searchItemDefinitionTraditional.bind(null, appData);
}
exports.searchItemDefinitionTraditionalFn = searchItemDefinitionTraditionalFn;
function searchModuleTraditionalFn(appData) {
    return searchModuleTraditional.bind(null, appData);
}
exports.searchModuleTraditionalFn = searchModuleTraditionalFn;
