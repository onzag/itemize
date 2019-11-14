import Debug from "../../debug";
import { IAppDataType } from "../../../server";
import { IGraphQLIdefResolverArgs, FGraphQLIdefResolverType, FGraphQLModResolverType } from "../../../base/Root/gql";
import Module from "../../../base/Root/Module";
import {
  checkLanguageAndRegion,
  checkLimit,
  validateTokenAndGetData,
  checkFieldsAreAvailableForRole,
  buildColumnNames,
} from "../basic";
import graphqlFields = require("graphql-fields");
import ItemDefinition, { ItemDefinitionIOActions } from "../../../base/Root/Module/ItemDefinition";
import { buildSQLQueryForModule, convertSQLValueToGQLValueForModule } from "../../../base/Root/Module/sql";
import { ISQLTableRowValue } from "../../../base/Root/sql";
import { ITEM_PREFIX, RESERVED_BASE_PROPERTIES_SQL, RESERVED_SEARCH_PROPERTIES, CONNECTOR_SQL_COLUMN_FK_NAME } from "../../../constants";
import { buildSQLQueryForItemDefinition, convertSQLValueToGQLValueForItemDefinition } from "../../../base/Root/Module/ItemDefinition/sql";
const debug = Debug("resolvers/actions/search");

export async function searchModule(
  appData: IAppDataType,
  resolverArgs: IGraphQLIdefResolverArgs,
  mod: Module,
) {
  checkLanguageAndRegion(resolverArgs.args);
  checkLimit(resolverArgs.args);
  const tokenData = validateTokenAndGetData(resolverArgs.args.token);

  const requestedFields = graphqlFields(resolverArgs.info);
  checkFieldsAreAvailableForRole(tokenData, requestedFields);

  const requestedFieldsInMod = {};
  Object.keys(requestedFields).forEach((arg) => {
    if (mod.hasPropExtensionFor(arg)) {
      requestedFieldsInMod[arg] = requestedFields[arg];
    }
  });
  mod.checkRoleAccessFor(
    ItemDefinitionIOActions.READ,
    tokenData.role,
    tokenData.userId,
    // Same reason as before, with item definitions
    -1,
    requestedFieldsInMod,
    true,
  );
  const searchingFields = {};
  const searchModeCounterpart = mod.getSearchModule();
  Object.keys(resolverArgs.args).forEach((arg) => {
    if (searchModeCounterpart.hasPropExtensionFor(arg)) {
      searchingFields[arg] = resolverArgs.args[arg];
    }
  });
  searchModeCounterpart.checkRoleAccessFor(
    ItemDefinitionIOActions.READ,
    tokenData.role,
    tokenData.userId,
    // Same reason as before, with item definitions
    -1,
    searchingFields,
    true,
  );

  const requestedFieldsSQL = buildColumnNames(requestedFields);

  let allItemDefinitionsInvolved = mod.getAllChildItemDefinitionsRecursive();
  if (resolverArgs.args.types) {
    allItemDefinitionsInvolved = allItemDefinitionsInvolved.filter((idef) => {
      return resolverArgs.args.types.includes(idef.getQualifiedPathName);
    });
  }

  const searchQuery = appData.knex.select(requestedFieldsSQL).from(mod.getQualifiedPathName()).where({
    blocked_at: null,
  });
  buildSQLQueryForModule(mod, resolverArgs.args, searchQuery);
  searchQuery.andWhere("created_at", "<=", resolverArgs.args.search_date_identifier);
  if (resolverArgs.args.filter_by_language) {
    searchQuery.andWhere("language", resolverArgs.args.language);
  }
  if (resolverArgs.args.filter_by_country) {
    searchQuery.andWhere("country", resolverArgs.args.country);
  }
  searchQuery.limit(resolverArgs.args.limit).offset(resolverArgs.args.offset);

  const baseResult: ISQLTableRowValue[] = await searchQuery;
  return baseResult.map((row) => convertSQLValueToGQLValueForModule(mod, row, requestedFields));
}

export async function searchItemDefinition(
  appData: IAppDataType,
  resolverArgs: IGraphQLIdefResolverArgs,
  itemDefinition: ItemDefinition,
) {
  // check the language and region, as well as the limit
  // defined in the query
  checkLanguageAndRegion(resolverArgs.args);
  checkLimit(resolverArgs.args);
  const tokenData = validateTokenAndGetData(resolverArgs.args.token);

  // now we get the requested fields
  const requestedFields = graphqlFields(resolverArgs.info);
  checkFieldsAreAvailableForRole(tokenData, requestedFields);

  debug("Checking role access for read in idef...");
  // check the role access for the read operation
  // in a generic way, ignoring SELF
  const requestedFieldsInIdef = {};
  Object.keys(requestedFields).forEach((arg) => {
    if (
      itemDefinition.hasPropertyDefinitionFor(arg, true) ||
      arg.startsWith(ITEM_PREFIX) && itemDefinition.hasItemFor(arg.replace(ITEM_PREFIX, ""))
    ) {
      requestedFieldsInIdef[arg] = requestedFields[arg];
    }
  });
  itemDefinition.checkRoleAccessFor(
    ItemDefinitionIOActions.READ,
    tokenData.role,
    tokenData.userId,
    // So why is it -1 here as well, well
    // when searching, we cannot just check every
    // component to see if the user has the rights
    // using SELF for read, either a property or
    // the whole item definition, cannot be checked
    // during the search, it would make the query
    // too complex otherwise, it's unecessary, so what
    // we do, we assume searches are granted on role bases
    // and we stop considering SELF, so we can see
    // if the user can access all the values that
    // he is querying as his role grants it, without
    // considering selfs, granted we could use nulls,
    // but again, null is the user id of the non-logged
    // user, so if suddenly, a nonlogged user makes a search
    // request, all the SELF permissions will be granted, and he
    // might have unauthorized access
    -1,
    requestedFieldsInIdef,
    true,
  );

  // now we need to get the fields that we are using to search
  const searchingFields = {};
  // for that we get the search mode counterpart of the item definition,
  // this is another item definition which provides search information
  const searchModeCounterpart = itemDefinition.getSearchModeCounterpart();
  // now we loop into every argument we were given
  Object.keys(resolverArgs.args).forEach((arg) => {
    // and we check if they are part of the searching query
    // for that they have to be part of the search query
    if (
      searchModeCounterpart.hasPropertyDefinitionFor(arg, true) ||
      arg.startsWith(ITEM_PREFIX) && searchModeCounterpart.hasItemFor(arg.replace(ITEM_PREFIX, ""))
    ) {
      // add it and isolate it
      searchingFields[arg] = resolverArgs.args[arg];
    }
  });

  debug("Checking role access for read in idef search mode...");

  // We also check for the role access of the search fields
  // the reason is simple, if we can use the query to query
  // the value of something we don't have access to, then, we
  // can brute force the value; for example, let's say we have
  // a SELF locked phone_number field, another user might wish
  // to know that phone number, so he starts a search process
  // and uses the EXACT_phone_number field, he will get returned null
  // until he matches the phone number, this is a leak, a weak one
  // but a leak nevertheless
  searchModeCounterpart.checkRoleAccessFor(
    ItemDefinitionIOActions.READ,
    tokenData.role,
    tokenData.userId,
    // And we also use -1 for the same reason as before
    // this is a search, we ignore SELF
    -1,
    searchingFields,
    true,
  );

  // now we also need to check for the requested fields in the
  // getter
  const requestedFieldsSQL = buildColumnNames(requestedFields);

  // retrieve basic information
  const mod = itemDefinition.getParentModule();
  const moduleTable = mod.getQualifiedPathName();
  const selfTable = itemDefinition.getQualifiedPathName();
  const searchMod = mod.getSearchModule();

  // the way we calculate whether it requires a join goes by checking
  // the base properties, to see if it represents a base property, like
  // id, created_at, created_by, locale, etc... if that runs false,
  // the we also have to check if we had a requeriment in the search
  // query, we check the arguments, arguments might be token, limit, etc...
  // ensure those are not, but the rest might be property ids, we check
  // if they are all property ids and represent extensions, if that's the case
  // we are basically doing a module level search, despite using this endpoint
  // so we don't need a join, joining will be a waste of resources
  const requiresJoin = requestedFieldsSQL.some((columnName) =>
    !RESERVED_BASE_PROPERTIES_SQL[columnName] && !mod.hasPropExtensionFor(columnName)) ||
    Object.keys(resolverArgs.args).some((argName) =>
      !RESERVED_SEARCH_PROPERTIES[argName] && !searchMod.hasPropExtensionFor(argName));

  debug("queried fields grant a join with idef data?", requiresJoin);

  // now we build the search query
  const searchQuery = appData.knex.select(requestedFieldsSQL).from(moduleTable).where({
    blocked_at: null,
    type: selfTable,
  });
  // and now we call the function that builds the query itself into
  // that parent query, and adds the andWhere as required
  // into such query
  buildSQLQueryForItemDefinition(itemDefinition, resolverArgs.args, searchQuery);

  // if it requires the join, we add such a join
  if (requiresJoin) {
    searchQuery.join(selfTable, (clause) => {
      clause.on(CONNECTOR_SQL_COLUMN_FK_NAME, "=", "id");
    });
  }

  // now we need to use the search date identifier, this identifier is required
  // and prevents searchs from jumping around as we paginate
  searchQuery.andWhere("created_at", "<=", resolverArgs.args.search_date_identifier);

  // we add filters if they are requested as so
  if (resolverArgs.args.filter_by_language) {
    searchQuery.andWhere("language", resolverArgs.args.language);
  }
  if (resolverArgs.args.filter_by_country) {
    searchQuery.andWhere("country", resolverArgs.args.country);
  }

  // add the limit
  searchQuery.limit(resolverArgs.args.limit).offset(resolverArgs.args.offset);

  // TODO we need to add a count query for both searches, module and idef
  // TODO we need to validate the dates for the search_date_identifier, also
  // the whole dates are messed up, when retrieving a date it comes funny,
  // also when sending the date it might be funny
  // TODO we need to implement full text search, it's not yet implemented
  // TODO we need to implement location radius search, it's not yet implemented
  // TODO implement a mechanism to keep the count consistant based on the search_date_identifier
  // one of the things we can do is to leverage nulls, basically duing a search if some content
  // is deleted or blocked during the search, this will cause the pagination to misbehave, we
  // already take care of adding content but no care is taken on deleting content, the process
  // I imagine is to implement a soft delete, where all the fields values are set to null,
  // respecting the privacy of the user, and a date is added, for blocked_at this process
  // is rather straightforward because we have a blocked_at attribute already with a date
  // and all we should do is to keep the search on that date in time; at the end, we check this
  // data here in this server, map it, and return null, if either blocked_at or deleted_at are
  // added there, there, in the last map, where we convert, is where we can check, it's perfect
  // no data leaks

  // now we get the base result, and convert every row
  const baseResult: ISQLTableRowValue[] = await searchQuery;
  return baseResult.map((row) => convertSQLValueToGQLValueForItemDefinition(itemDefinition, row, requestedFields));
}

export function searchItemDefinitionFn(appData: IAppDataType): FGraphQLIdefResolverType {
  return searchItemDefinition.bind(null, appData);
}

export function searchModuleFn(appData: IAppDataType): FGraphQLModResolverType {
  return searchModule.bind(null, appData);
}
