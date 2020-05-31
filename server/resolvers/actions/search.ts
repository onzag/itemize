import { IAppDataType, logger } from "../../../server";
import { IGraphQLIdefResolverArgs, FGraphQLIdefResolverType, FGraphQLModResolverType } from "../../../base/Root/gql";
import Module from "../../../base/Root/Module";
import {
  checkLanguage,
  validateTokenAndGetData,
  getDictionary,
  serverSideCheckItemDefinitionAgainst,
  validateTokenIsntBlocked,
  checkReadPoliciesAllowThisUserToSearch,
  checkBasicFieldsAreAvailableForRole,
  filterAndPrepareGQLValue,
  retrieveSince,
  checkLimit,
  checkLimiters,
} from "../basic";
import ItemDefinition, { ItemDefinitionIOActions } from "../../../base/Root/Module/ItemDefinition";
import { buildSQLQueryForModule } from "../../../base/Root/Module/sql";
import { ISQLTableRowValue } from "../../../base/Root/sql";
import {
  INCLUDE_PREFIX,
  CONNECTOR_SQL_COLUMN_ID_FK_NAME,
  CONNECTOR_SQL_COLUMN_VERSION_FK_NAME,
  UNSPECIFIED_OWNER,
} from "../../../constants";
import { buildSQLQueryForItemDefinition } from "../../../base/Root/Module/ItemDefinition/sql";
import { IGQLSearchRecord, IGQLSearchRecordsContainer, IGQLSearchResultsContainer } from "../../../gql-querier";
import { convertVersionsIntoNullsWhenNecessary } from "../../version-null-value";
import { flattenRawGQLValueOrFields } from "../../../gql-util";
import graphqlFields from "graphql-fields";
import { NanoSecondComposedDate } from "../../../nanodate";

function findLastRecordDateCheatMethod(records: IGQLSearchRecord[]): string {
  let maximumRecords: IGQLSearchRecord[] = null;
  let maximumRecordId: number = null;
  records.forEach((record: IGQLSearchRecord) => {
    if (!maximumRecordId || record.id > maximumRecordId) {
      maximumRecordId = record.id;
      maximumRecords = [record];
    } else if (maximumRecordId === record.id) {
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

  const recordsRespectiveNanoSecondAccuracyArray = maximumRecords.map((r) => new NanoSecondComposedDate(r.created_at));
  const maxDate = recordsRespectiveNanoSecondAccuracyArray.reduce((prev,cur) => {
    return prev.greaterThan(cur) ? prev : cur;
  });
  return maxDate.original;
}

export function searchModuleTraditional(
  appData: IAppDataType,
  resolverArgs: IGraphQLIdefResolverArgs,
  mod: Module,
) {
  return searchModule(appData, resolverArgs, mod, true);
}

export async function searchModule(
  appData: IAppDataType,
  resolverArgs: IGraphQLIdefResolverArgs,
  mod: Module,
  traditional?: boolean,
) {
  logger.debug(
    "searchModule: executed search for " + mod.getQualifiedPathName(),
  );

  const since = retrieveSince(resolverArgs.args);
  checkLimit(resolverArgs.args.limit as number, mod, traditional);
  checkLimiters(resolverArgs.args, mod);

  // check language and region
  checkLanguage(appData, resolverArgs.args);
  const tokenData = await validateTokenAndGetData(appData, resolverArgs.args.token);
  await validateTokenIsntBlocked(appData.cache, tokenData);

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

  logger.debug(
    "searchModule: retrieved search fields as",
    searchingFields,
  );

  const created_by = resolverArgs.args.created_by;
  let ownerToCheckAgainst = UNSPECIFIED_OWNER;
  if (created_by) {
    ownerToCheckAgainst = created_by;
  }

  // check role access for those searching fields
  // yes they are not being directly read but they can
  // be brute forced this way, and we are paranoid as hell
  logger.debug(
    "searchModule: checking read role access based on " + searchModeCounterpart.getQualifiedPathName(),
  );
  searchModeCounterpart.checkRoleAccessFor(
    ItemDefinitionIOActions.READ,
    tokenData.role,
    tokenData.id,
    ownerToCheckAgainst,
    searchingFields,
    true,
  );

  let fieldsToRequest: string[] = ["id", "version", "type", "created_at"];
  let requestedFields: any = null;
  const generalFields = graphqlFields(resolverArgs.info);
  if (traditional) {
    requestedFields = flattenRawGQLValueOrFields(generalFields.results);
    checkBasicFieldsAreAvailableForRole(mod, tokenData, requestedFields);

    fieldsToRequest = Object.keys(requestedFields);

    const requestedFieldsInMod = {};
    Object.keys(requestedFields || {}).forEach((arg) => {
      if (mod.hasPropExtensionFor(arg)) {
        requestedFieldsInMod[arg] = requestedFields[arg];
      }
    });
    logger.debug(
      "searchModule: Extracted requested fields from module",
      fieldsToRequest,
    );
    if (!fieldsToRequest.includes("created_at")) {
      fieldsToRequest.push("created_at");
    }
    if (!fieldsToRequest.includes("blocked_at")) {
      fieldsToRequest.push("blocked_at");
    }
    mod.checkRoleAccessFor(
      ItemDefinitionIOActions.READ,
      tokenData.role,
      tokenData.id,
      ownerToCheckAgainst,
      requestedFieldsInMod,
      true,
    );
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
  const addedSearchRaw = buildSQLQueryForModule(
    mod,
    resolverArgs.args,
    queryModel,
    getDictionary(appData, resolverArgs.args),
    resolverArgs.args.search,
    resolverArgs.args.order_by,
  );

  // if we filter by type
  if (resolverArgs.args.types) {
    queryModel.andWhere("type", resolverArgs.args.types);
  }

  const searchQuery = queryModel.clone();
  const limit: number = resolverArgs.args.limit;
  const offset: number = resolverArgs.args.offset;

  searchQuery.select(fieldsToRequest);
  addedSearchRaw.forEach((srApplyArgs) => {
    searchQuery.select(appData.knex.raw(...srApplyArgs));
  });
  searchQuery.limit(limit).offset(offset);

  const countQuery = queryModel.clone().count();
  countQuery.clearOrder();

  // return using the base result, and only using the id
  const baseResult: ISQLTableRowValue[] = (generalFields.results || generalFields.records) ?
    (await searchQuery).map(convertVersionsIntoNullsWhenNecessary) as IGQLSearchRecord[] :
    null;
  const countResult: ISQLTableRowValue[] = generalFields.count ? (await countQuery) : null;
  const count = (countResult[0] && countResult[0].count) || null;
  if (traditional) {
    const finalResult: IGQLSearchResultsContainer = {
      results: baseResult.map((r) => {
        return filterAndPrepareGQLValue(r, requestedFields, tokenData.role, mod).toReturnToUser;
      }),
      limit,
      offset,
      count, 
    }

    logger.debug(
      "searchModule: succeed traditionally",
    );

    return finalResult;
  } else {
    const finalResult: IGQLSearchRecordsContainer = {
      records: baseResult as IGQLSearchRecord[],
      last_record_date: findLastRecordDateCheatMethod(baseResult as IGQLSearchRecord[]),
      limit,
      offset,
      count, 
    };
  
    logger.debug(
      "searchModule: succeed with records",
    );
  
    return finalResult;
  }
}

export function searchItemDefinitionTraditional(
  appData: IAppDataType,
  resolverArgs: IGraphQLIdefResolverArgs,
  itemDefinition: ItemDefinition,
) {
  return searchItemDefinition(appData, resolverArgs, itemDefinition, true);
}

export async function searchItemDefinition(
  appData: IAppDataType,
  resolverArgs: IGraphQLIdefResolverArgs,
  itemDefinition: ItemDefinition,
  traditional?: boolean,
) {
  logger.debug(
    "searchItemDefinition: executed search for " + itemDefinition.getQualifiedPathName(),
  );

  const since = retrieveSince(resolverArgs.args);
  checkLimit(resolverArgs.args.limit as number, itemDefinition, traditional);
  checkLimiters(resolverArgs.args, itemDefinition);

  // check the language and region
  checkLanguage(appData, resolverArgs.args);
  const tokenData = await validateTokenAndGetData(appData, resolverArgs.args.token);
  checkReadPoliciesAllowThisUserToSearch(
    itemDefinition,
    tokenData.role,
  );
  await validateTokenIsntBlocked(appData.cache, tokenData);

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
      arg.startsWith(INCLUDE_PREFIX) && searchModeCounterpart.hasIncludeFor(arg.replace(INCLUDE_PREFIX, ""))
    ) {
      // add it and isolate it
      searchingFields[arg] = resolverArgs.args[arg];
    }
  });

  logger.debug(
    "searchItemDefinition: retrieved search fields as",
    searchingFields,
  );

  const created_by = resolverArgs.args.created_by;
  let ownerToCheckAgainst = UNSPECIFIED_OWNER;
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
  logger.debug(
    "searchItemDefinition: checking role access based on " + searchModeCounterpart.getQualifiedPathName(),
  );
  searchModeCounterpart.checkRoleAccessFor(
    ItemDefinitionIOActions.READ,
    tokenData.role,
    tokenData.id,
    ownerToCheckAgainst,
    searchingFields,
    true,
  );

  // Checking search mode counterpart to validate
  searchModeCounterpart.applyValue(null, null, resolverArgs.args, false, tokenData.id, tokenData.role, null, false);
  await serverSideCheckItemDefinitionAgainst(
    searchModeCounterpart,
    resolverArgs.args,
    null,
    null,
  );

  // retrieve basic information
  const mod = itemDefinition.getParentModule();
  const moduleTable = mod.getQualifiedPathName();
  const selfTable = itemDefinition.getQualifiedPathName();

  let fieldsToRequest: string[] = ["id", "version", "type", "created_at"];
  let requestedFields: any = null;
  const generalFields = graphqlFields(resolverArgs.info);
  if (traditional) {
    requestedFields = flattenRawGQLValueOrFields(generalFields.results);
    checkBasicFieldsAreAvailableForRole(mod, tokenData, requestedFields);

    fieldsToRequest = Object.keys(requestedFields);
    const requestedFieldsInIdef = {};
    Object.keys(requestedFields || {}).forEach((arg) => {
      if (
        itemDefinition.hasPropertyDefinitionFor(arg, true) ||
        arg.startsWith(INCLUDE_PREFIX) && itemDefinition.hasIncludeFor(arg.replace(INCLUDE_PREFIX, ""))
      ) {
        requestedFieldsInIdef[arg] = requestedFields[arg];
      }
    });
    logger.debug(
      "searchItemDefinition: Extracted requested fields from module",
      fieldsToRequest,
    );
    if (!fieldsToRequest.includes("created_at")) {
      fieldsToRequest.push("created_at");
    }
    if (!fieldsToRequest.includes("blocked_at")) {
      fieldsToRequest.push("blocked_at");
    }

    itemDefinition.checkRoleAccessFor(
      ItemDefinitionIOActions.READ,
      tokenData.role,
      tokenData.id,
      ownerToCheckAgainst,
      requestedFieldsInIdef,
      true,
    );
  }

  // now we build the search query
  const queryModel = appData.knex.table(selfTable)
    .join(moduleTable, (clause) => {
      clause.on("id", "=", CONNECTOR_SQL_COLUMN_ID_FK_NAME);
      clause.on("version", "=", CONNECTOR_SQL_COLUMN_VERSION_FK_NAME);
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
  } else {
    queryModel
      .andWhere("parent_id", null);
  }

  // and now we call the function that builds the query itself into
  // that parent query, and adds the andWhere as required
  // into such query
  const addedSearchRaw = buildSQLQueryForItemDefinition(
    itemDefinition,
    resolverArgs.args,
    queryModel,
    getDictionary(appData, resolverArgs.args),
    resolverArgs.args.search,
    resolverArgs.args.order_by,
  );

  const searchQuery = queryModel.clone();
  const limit: number = resolverArgs.args.limit;
  const offset: number = resolverArgs.args.offset;

  searchQuery.select(fieldsToRequest);
  addedSearchRaw.forEach((srApplyArgs) => {
    searchQuery.select(appData.knex.raw(...srApplyArgs));
  });
  searchQuery.limit(limit).offset(offset);
  const countQuery = queryModel.clone().count();
  countQuery.clearOrder();

  // return using the base result, and only using the id
  const baseResult: ISQLTableRowValue[] = (generalFields.results || generalFields.records) ?
    (await searchQuery).map(convertVersionsIntoNullsWhenNecessary) as IGQLSearchRecord[] :
    null;
  const countResult: ISQLTableRowValue[] = generalFields.count ? (await countQuery) : null;
  const count = (countResult[0] && countResult[0].count) || null;
  if (traditional) {
    const finalResult: IGQLSearchResultsContainer = {
      results: baseResult.map((r) => {
        return filterAndPrepareGQLValue(r, requestedFields, tokenData.role, itemDefinition).toReturnToUser;
      }),
      limit,
      offset,
      count, 
    }

    logger.debug(
      "searchItemDefinition: succeed traditionally",
    );

    return finalResult;
  } else {
    const finalResult: IGQLSearchRecordsContainer = {
      records: baseResult as IGQLSearchRecord[],
      last_record_date: findLastRecordDateCheatMethod(baseResult as IGQLSearchRecord[]),
      limit,
      offset,
      count, 
    };
  
    logger.debug(
      "searchItemDefinition: succeed with records",
    );
  
    return finalResult;
  }
}

export function searchItemDefinitionFn(appData: IAppDataType): FGraphQLIdefResolverType {
  return searchItemDefinition.bind(null, appData);
}

export function searchModuleFn(appData: IAppDataType): FGraphQLModResolverType {
  return searchModule.bind(null, appData);
}

export function searchItemDefinitionTraditionalFn(appData: IAppDataType): FGraphQLIdefResolverType {
  return searchItemDefinitionTraditional.bind(null, appData);
}

export function searchModuleTraditionalFn(appData: IAppDataType): FGraphQLModResolverType {
  return searchModuleTraditional.bind(null, appData);
}
