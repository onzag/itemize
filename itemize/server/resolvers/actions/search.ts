import Debug from "debug";
import { IAppDataType } from "../../../server";
import { IGraphQLIdefResolverArgs, FGraphQLIdefResolverType, FGraphQLModResolverType } from "../../../base/Root/gql";
import Module from "../../../base/Root/Module";
import {
  checkLanguageAndRegion,
  validateTokenAndGetData,
  getDictionary,
  serverSideCheckItemDefinitionAgainst,
  validateTokenIsntBlocked,
} from "../basic";
import ItemDefinition, { ItemDefinitionIOActions } from "../../../base/Root/Module/ItemDefinition";
import { buildSQLQueryForModule } from "../../../base/Root/Module/sql";
import { ISQLTableRowValue } from "../../../base/Root/sql";
import {
  ITEM_PREFIX,
  RESERVED_SEARCH_PROPERTIES,
  CONNECTOR_SQL_COLUMN_FK_NAME,
} from "../../../constants";
import { buildSQLQueryForItemDefinition } from "../../../base/Root/Module/ItemDefinition/sql";

const searchModuleDebug = Debug("resolvers:searchModule");
export async function searchModule(
  appData: IAppDataType,
  resolverArgs: IGraphQLIdefResolverArgs,
  mod: Module,
) {
  searchModuleDebug(
    "EXECUTED for %s",
    mod.getQualifiedPathName(),
  );

  // check language and region
  checkLanguageAndRegion(appData, resolverArgs.args);
  const tokenData = validateTokenAndGetData(resolverArgs.args.token);
  validateTokenIsntBlocked(appData.knex, tokenData);

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

  searchModuleDebug(
    "Searching fields retrieved as %j",
    searchingFields,
  );

  searchModuleDebug(
    "Checking read role access based on %s",
    searchModeCounterpart.getQualifiedPathName(),
  );

  // check role access for those searching fields
  // yes they are not being directly read but they can
  // be brute forced this way, and we are paranoid as hell
  searchModeCounterpart.checkRoleAccessFor(
    ItemDefinitionIOActions.READ,
    tokenData.role,
    tokenData.id,
    // Same reason as before, with item definitions
    -1,
    searchingFields,
    true,
  );

  // now we build the search query, the search query only matches an id
  // note how we remove blocked_at
  const searchQuery = appData.knex.select(["id"])
    .from(mod.getQualifiedPathName())
    .where("blocked_at", null);

  // now we build the sql query for the module
  buildSQLQueryForModule(
    mod,
    resolverArgs.args,
    searchQuery,
    getDictionary(appData, resolverArgs.args),
  );

  // if we filter by language and country we add that
  if (resolverArgs.args.filter_by_language) {
    searchQuery.andWhere("language", resolverArgs.args.language);
  }
  if (resolverArgs.args.filter_by_country) {
    searchQuery.andWhere("country", resolverArgs.args.country);
  }
  if (resolverArgs.args.types) {
    searchQuery.andWhere("type", resolverArgs.args.types);
  }

  // return using the base result, and only using the id
  const baseResult: ISQLTableRowValue[] = await searchQuery;
  const finalResult = {
    ids: baseResult.map((row) => row.id),
  };

  searchModuleDebug("SUCCEED with %j", finalResult);

  return finalResult;
}

const searchItemDefinitionDebug = Debug("resolvers:searchItemDefinition");
export async function searchItemDefinition(
  appData: IAppDataType,
  resolverArgs: IGraphQLIdefResolverArgs,
  itemDefinition: ItemDefinition,
) {
  searchItemDefinitionDebug(
    "EXECUTED for %s",
    itemDefinition.getQualifiedPathName(),
  );

  // check the language and region
  checkLanguageAndRegion(appData, resolverArgs.args);
  const tokenData = validateTokenAndGetData(resolverArgs.args.token);
  validateTokenIsntBlocked(appData.knex, tokenData);

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

  searchItemDefinitionDebug(
    "Searching fields retrieved as %j",
    searchingFields,
  );

  searchItemDefinitionDebug(
    "Checking read role access based on %s",
    searchModeCounterpart.getQualifiedPathName(),
  );

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
    tokenData.id,
    // And we also use -1 for the same reason as before
    // this is a search, we ignore SELF
    -1,
    searchingFields,
    true,
  );

  // Checking search mode counterpart to validate
  searchModeCounterpart.applyValueFromGQL(null, resolverArgs.args);
  await serverSideCheckItemDefinitionAgainst(
    searchModeCounterpart,
    resolverArgs.args,
    null,
  );

  // retrieve basic information
  const mod = itemDefinition.getParentModule();
  const moduleTable = mod.getQualifiedPathName();
  const selfTable = itemDefinition.getQualifiedPathName();
  const searchMod = mod.getSearchModule();

  // in this case it works because we are checking raw property names
  // with the search module, it has no items, so it can easily check it up
  const requiresJoin = Object.keys(resolverArgs.args).some((argName) =>
      !RESERVED_SEARCH_PROPERTIES[argName] && !searchMod.hasPropExtensionFor(argName));

  searchItemDefinitionDebug(
    "Join considered as %j",
    requiresJoin,
  );

  // now we build the search query
  const searchQuery = appData.knex.select(["id"]).from(moduleTable)
    .where("blocked_at", null);
  // and now we call the function that builds the query itself into
  // that parent query, and adds the andWhere as required
  // into such query
  buildSQLQueryForItemDefinition(
    itemDefinition,
    resolverArgs.args,
    searchQuery,
    getDictionary(appData, resolverArgs.args),
  );

  // if it requires the join, we add such a join
  if (requiresJoin) {
    searchQuery.join(selfTable, (clause) => {
      clause.on(CONNECTOR_SQL_COLUMN_FK_NAME, "=", "id");
    });
  }

  // we add filters if they are requested as so
  if (resolverArgs.args.filter_by_language) {
    searchQuery.andWhere("language", resolverArgs.args.language);
  }
  if (resolverArgs.args.filter_by_country) {
    searchQuery.andWhere("country", resolverArgs.args.country);
  }

  // now we get the base result, and convert every row
  const baseResult: ISQLTableRowValue[] = await searchQuery;
  const finalResult = {
    ids: baseResult.map((row) => row.id),
  };
  searchItemDefinitionDebug("SUCCEED with %j", finalResult);
  return finalResult;
}

export function searchItemDefinitionFn(appData: IAppDataType): FGraphQLIdefResolverType {
  return searchItemDefinition.bind(null, appData);
}

export function searchModuleFn(appData: IAppDataType): FGraphQLModResolverType {
  return searchModule.bind(null, appData);
}