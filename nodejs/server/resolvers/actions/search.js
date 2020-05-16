"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../../server");
const basic_1 = require("../basic");
const ItemDefinition_1 = require("../../../base/Root/Module/ItemDefinition");
const sql_1 = require("../../../base/Root/Module/sql");
const constants_1 = require("../../../constants");
const sql_2 = require("../../../base/Root/Module/ItemDefinition/sql");
const version_null_value_1 = require("../../version-null-value");
async function searchModule(appData, resolverArgs, mod) {
    server_1.logger.debug("searchModule: executed search for " + mod.getQualifiedPathName());
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
    // now we build the search query, the search query only matches an id
    // note how we remove blocked_at
    const searchQuery = appData.knex.select(["id", "version", "type", "created_at"])
        .from(mod.getQualifiedPathName())
        .where("blocked_at", null);
    if (created_by) {
        searchQuery.where("created_by", created_by);
    }
    // now we build the sql query for the module
    sql_1.buildSQLQueryForModule(mod, resolverArgs.args, searchQuery, basic_1.getDictionary(appData, resolverArgs.args));
    // if we filter by type
    if (resolverArgs.args.types) {
        searchQuery.andWhere("type", resolverArgs.args.types);
    }
    if (resolverArgs.args.order_by === "DEFAULT") {
        searchQuery.orderBy("created_at", "DESC");
    }
    else {
        // TODO
    }
    // return using the base result, and only using the id
    const baseResult = (await searchQuery).map(version_null_value_1.convertVersionsIntoNullsWhenNecessary);
    const finalResult = {
        ids: baseResult,
        // TODO manually reorder the real latest by date
        last_record: baseResult[0] || null,
    };
    server_1.logger.debug("searchModule: succeed");
    return finalResult;
}
exports.searchModule = searchModule;
async function searchItemDefinition(appData, resolverArgs, itemDefinition) {
    server_1.logger.debug("searchItemDefinition: executed search for " + itemDefinition.getQualifiedPathName());
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
    const searchMod = mod.getSearchModule();
    // in this case it works because we are checking raw property names
    // with the search module, it has no items, so it can easily check it up
    const requiresJoin = Object.keys(resolverArgs.args).some((argName) => {
        return !constants_1.RESERVED_SEARCH_PROPERTIES[argName] && !searchMod.hasPropExtensionFor(argName);
    });
    // now we build the search query
    const searchQuery = appData.knex.select(["id", "version", "created_at"]).from(moduleTable)
        .where("blocked_at", null);
    if (created_by) {
        searchQuery.andWhere("created_by", created_by);
    }
    if (resolverArgs.args.parent_id && resolverArgs.args.parent_type) {
        searchQuery
            .andWhere("parent_id", resolverArgs.args.parent_id)
            .andWhere("parent_version", resolverArgs.args.parent_version || null)
            .andWhere("parent_type", resolverArgs.args.parent_type);
    }
    else {
        searchQuery
            .andWhere("parent_id", null);
    }
    if (resolverArgs.args.order_by === "DEFAULT") {
        searchQuery.orderBy("created_at", "DESC");
    }
    else {
        // TODO
    }
    // and now we call the function that builds the query itself into
    // that parent query, and adds the andWhere as required
    // into such query
    sql_2.buildSQLQueryForItemDefinition(itemDefinition, resolverArgs.args, searchQuery, basic_1.getDictionary(appData, resolverArgs.args));
    // if it requires the join, we add such a join
    if (requiresJoin) {
        searchQuery.join(selfTable, (clause) => {
            clause.on(constants_1.CONNECTOR_SQL_COLUMN_ID_FK_NAME, "=", "id");
            clause.on(constants_1.CONNECTOR_SQL_COLUMN_VERSION_FK_NAME, "=", "version");
        });
    }
    // now we get the base result, and convert every row
    const baseResult = await searchQuery;
    const ids = baseResult.map((row) => {
        return version_null_value_1.convertVersionsIntoNullsWhenNecessary({
            id: row.id,
            type: selfTable,
            created_at: row.created_at,
            version: row.version,
        });
    });
    const finalResult = {
        ids,
        // TODO manually reorder the real latest by date
        last_record: ids[0],
    };
    server_1.logger.debug("searchItemDefinition: done");
    return finalResult;
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
