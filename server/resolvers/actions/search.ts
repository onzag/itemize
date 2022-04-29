import { IAppDataType } from "../../../server";
import { logger } from "../../logger";
import { IGraphQLIdefResolverArgs, FGraphQLIdefResolverType, FGraphQLModResolverType } from "../../../base/Root/gql";
import Module from "../../../base/Root/Module";
import {
  checkLanguage,
  validateTokenAndGetData,
  getDictionary,
  serverSideCheckItemDefinitionAgainst,
  validateTokenIsntBlocked,
  checkReadPoliciesAllowThisUserToSearch,
  filterAndPrepareGQLValue,
  retrieveSince,
  checkLimit,
  checkLimiters,
  defaultTriggerForbiddenFunction,
  checkUserCanSearch,
} from "../basic";
import ItemDefinition, { ItemDefinitionIOActions } from "../../../base/Root/Module/ItemDefinition";
import { buildElasticQueryForModule, buildSQLQueryForModule } from "../../../base/Root/Module/sql";
import { ISQLTableRowValue } from "../../../base/Root/sql";
import {
  INCLUDE_PREFIX,
  CONNECTOR_SQL_COLUMN_ID_FK_NAME,
  CONNECTOR_SQL_COLUMN_VERSION_FK_NAME,
  UNSPECIFIED_OWNER,
  ENDPOINT_ERRORS,
  EXCLUSION_STATE_SUFFIX,
} from "../../../constants";
import { buildElasticQueryForItemDefinition, buildSQLQueryForItemDefinition, convertSQLValueToGQLValueForItemDefinition } from "../../../base/Root/Module/ItemDefinition/sql";
import { IGQLSearchRecord, IGQLSearchRecordsContainer, IGQLSearchResultsContainer } from "../../../gql-querier";
import { convertVersionsIntoNullsWhenNecessary } from "../../version-null-value";
import { flattenRawGQLValueOrFields } from "../../../gql-util";
import { NanoSecondComposedDate } from "../../../nanodate";
import Root from "../../../base/Root";
import { EndpointError } from "../../../base/errors";
import { IOTriggerActions } from "../triggers";
import { CustomRoleGranterEnvironment, CustomRoleManager } from "../roles";
import { CAN_LOG_DEBUG } from "../../environment";
import type { SelectBuilder } from "../../../database/SelectBuilder";
import type { ElasticQueryBuilder } from "../../elastic";

export function findLastRecordLastModifiedDate(...records: IGQLSearchRecord[][]): string {
  const recordsRespectiveNanoSecondAccuracyArray = records.flat().map((r) => new NanoSecondComposedDate(r.last_modified));
  if (recordsRespectiveNanoSecondAccuracyArray.length === 0) {
    return null;
  }
  const maxDate = recordsRespectiveNanoSecondAccuracyArray.reduce((prev, cur) => {
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
  CAN_LOG_DEBUG && logger.debug(
    "searchModule: executed search for " + mod.getQualifiedPathName(),
  );

  const usesElastic = resolverArgs.args.searchengine === true;
  const elasticIndexLang = (usesElastic && resolverArgs.args.searchengine_language) || null;

  if (usesElastic && !mod.isSearchEngineEnabled()) {
    throw new EndpointError({
      message: mod.getQualifiedPathName() + " does not support search engine searches",
      code: ENDPOINT_ERRORS.UNSPECIFIED,
    });
  } else if (usesElastic && resolverArgs.args.offset !== 0) {
    // this is a limitation of elasticsearch that it doesn't allow for pagination
    // with more than 10000 hits, and this is something we cannot ensure
    // as a result we disable the whole thing
    throw new EndpointError({
      message: "Using the search engine does not support non-zero offsets",
      code: ENDPOINT_ERRORS.UNSPECIFIED,
    });
  }

  const since = retrieveSince(resolverArgs.args);
  checkLimit(resolverArgs.args.limit as number, mod, traditional);
  checkLimiters(resolverArgs.args, mod);

  // check language and region
  checkLanguage(appData, resolverArgs.args);
  const tokenData = await validateTokenAndGetData(appData, resolverArgs.args.token);
  await validateTokenIsntBlocked(appData.cache, tokenData);
  checkUserCanSearch(resolverArgs.args, mod, tokenData);

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

  CAN_LOG_DEBUG && logger.debug(
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
  CAN_LOG_DEBUG && logger.debug(
    "searchModule: checking read role access based on " + searchModeCounterpart.getQualifiedPathName(),
  );

  const ownerId = resolverArgs.args.created_by || null;
  const rolesManager = new CustomRoleManager(appData.customRoles, {
    cache: appData.cache,
    databaseConnection: appData.databaseConnection,
    rawDB: appData.rawDB,
    value: null,
    item: null,
    module: mod,
    root: appData.root,
    tokenData: tokenData,
    environment: traditional ? CustomRoleGranterEnvironment.SEARCHING_TRADITIONAL : CustomRoleGranterEnvironment.SEARCHING_RECORDS,
    requestArgs: resolverArgs.args,
    owner: ownerId,
    parent: resolverArgs.args.parent_id && resolverArgs.args.parent_type ? {
      id: resolverArgs.args.parent_id,
      type: resolverArgs.args.parent_type,
      version: resolverArgs.args.parent_version || null,
    } : null,
    customId: null,
  });
  await searchModeCounterpart.checkRoleAccessFor(
    ItemDefinitionIOActions.READ,
    tokenData.role,
    tokenData.id,
    ownerToCheckAgainst,
    searchingFields,
    rolesManager,
    true,
  );

  // because we have just checked that our properties have the role access
  // this is not enough, because we must also check that the given children
  // have the basic readRoleAccess as well into them
  let typesToCheckReadToo: ItemDefinition[];
  if (!resolverArgs.args.types) {
    typesToCheckReadToo = mod.getAllChildItemDefinitions();
  } else {
    typesToCheckReadToo = resolverArgs.args.types.map((t: string) => {
      const idef = appData.root.registry[t] as ItemDefinition;
      if (!idef) {
        throw new EndpointError({
          message: "Invalid item type: " + t,
          code: ENDPOINT_ERRORS.UNSPECIFIED,
        });
      } else if (!(idef instanceof ItemDefinition)) {
        throw new EndpointError({
          message: "Invalid item type " + t + ", not an Item Definition",
          code: ENDPOINT_ERRORS.UNSPECIFIED,
        });
      } else if (idef.getParentModule() !== mod) {
        throw new EndpointError({
          message: "Invalid item type " + t + ", not a child of " + mod.getQualifiedPathName(),
          code: ENDPOINT_ERRORS.UNSPECIFIED,
        });
      }

      return idef;
    });
  }

  for (let t of typesToCheckReadToo) {
    const specificRolesManager = rolesManager.subEnvironment({
      item: t,
    });

    await t.checkRoleAccessFor(
      ItemDefinitionIOActions.READ,
      tokenData.role,
      tokenData.id,
      ownerToCheckAgainst,
      // we are now not checking for any property just
      // the item as a whole
      // because we are just dealing with prop extensions
      // so this is irrelevant, and using it will just re-execute
      // what has already been done so
      {},
      specificRolesManager,
      true,
    );
  }

  let sqlFieldsToRequest: string[] = ["id", "version", "type", "last_modified"];
  let requestedFields: any = null;
  const generalFields = resolverArgs.fields;
  if (traditional) {
    requestedFields = flattenRawGQLValueOrFields(generalFields.results);
    const fieldsToRequestRawValue = Object.keys(requestedFields);

    const requestedFieldsInMod = {};
    Object.keys(requestedFields || {}).forEach((arg) => {
      if (mod.hasPropExtensionFor(arg)) {
        requestedFieldsInMod[arg] = requestedFields[arg];
      }
    });
    CAN_LOG_DEBUG && logger.debug(
      "searchModule: Extracted requested fields from module",
      fieldsToRequestRawValue,
    );

    await mod.checkRoleAccessFor(
      ItemDefinitionIOActions.READ,
      tokenData.role,
      tokenData.id,
      ownerToCheckAgainst,
      requestedFieldsInMod,
      rolesManager,
      true,
    );

    sqlFieldsToRequest = [];
    fieldsToRequestRawValue.forEach((v) => {
      const propDef = mod.hasPropExtensionFor(v) && mod.getPropExtensionFor(v);
      if (!propDef) {
        sqlFieldsToRequest.push(v);
      } else {
        const sqlSelectFields = propDef.getPropertyDefinitionDescription().sqlSelect({
          id: v,
          itemDefinition: null,
          prefix: "",
          property: propDef,
          serverData: appData.cache.getServerData(),
        });
        sqlFieldsToRequest = sqlFieldsToRequest.concat(sqlSelectFields);
      }
    });

    if (!sqlFieldsToRequest.includes("last_modified")) {
      sqlFieldsToRequest.push("last_modified");
    }
    if (!sqlFieldsToRequest.includes("blocked_at")) {
      sqlFieldsToRequest.push("blocked_at");
    }
  }

  let elasticQuery: ElasticQueryBuilder;
  let queryModel: SelectBuilder;

  // now we build the search query, the search query only matches an id
  // note how we remove blocked_at
  if (usesElastic) {
    elasticQuery = appData.elastic.getSelectBuilder(
      mod,
      elasticIndexLang,
      resolverArgs.args.types,
    );
    elasticQuery.mustTerm({
      blocked_by: null,
    });

    if (created_by) {
      // we need to check for all the possible results we might get
      await Promise.all(mod.getAllChildItemDefinitions().map(async (idef) => {
        // we need to check whether the user can read the owner field for that creator
        // that is specifying, this is because you are reading the owner if you are
        // searching by it, indirectly
        await idef.checkRoleCanReadOwner(tokenData.role, tokenData.id, created_by, rolesManager, true);
      }));

      elasticQuery.mustTerm({
        created_by: created_by,
      });
    }

    if (since) {
      elasticQuery.must({
        range: {
          created_at: {
            gte: since,
          }
        }
      });
    }

    if (typeof resolverArgs.args.version_filter !== "undefined") {
      elasticQuery.mustTerm({
        version: resolverArgs.args.version_filter || null,
      });
    }

    if (resolverArgs.args.parent_id && resolverArgs.args.parent_type) {
      elasticQuery.mustTerm({
        parent_id: resolverArgs.args.parent_id,
        parent_version: resolverArgs.args.parent_version || null,
        parent_type: resolverArgs.args.parent_type,
      });
    } else if (resolverArgs.args.parent_type) {
      elasticQuery.mustTerm({
        parent_type: resolverArgs.args.parent_type,
      });
    }
  } else {
    queryModel = appData.databaseConnection.getSelectBuilder();
    queryModel.fromBuilder.from(mod.getQualifiedPathName());
    queryModel.whereBuilder.andWhereColumnNull("blocked_at");

    if (created_by) {
      // we need to check for all the possible results we might get
      await Promise.all(mod.getAllChildItemDefinitions().map(async (idef) => {
        // we need to check whether the user can read the owner field for that creator
        // that is specifying, this is because you are reading the owner if you are
        // searching by it, indirectly
        await idef.checkRoleCanReadOwner(tokenData.role, tokenData.id, created_by, rolesManager, true);
      }));
      queryModel.whereBuilder.andWhereColumn("created_by", created_by);
    }

    if (since) {
      queryModel.whereBuilder.andWhereColumn("created_at", ">=", since);
    }

    if (typeof resolverArgs.args.version_filter !== "undefined") {
      queryModel.whereBuilder.andWhereColumn("version", resolverArgs.args.version_filter || "");
    }

    if (resolverArgs.args.parent_id && resolverArgs.args.parent_type) {
      queryModel.whereBuilder
        .andWhereColumn("parent_id", resolverArgs.args.parent_id)
        .andWhereColumn("parent_version", resolverArgs.args.parent_version || "")
        .andWhereColumn("parent_type", resolverArgs.args.parent_type);
    } else if (resolverArgs.args.parent_type) {
      queryModel.whereBuilder
        .andWhereColumn("parent_type", resolverArgs.args.parent_type);
    }

    // if we filter by type
    if (resolverArgs.args.types) {
      queryModel.whereBuilder.andWhere(
        `"type" = ANY(ARRAY[${resolverArgs.args.types.map(() => "?").join(",")}]::TEXT[])`,
        resolverArgs.args.types,
      );
    }
  }

  const pathOfThisModule = mod.getPath().join("/");
  const moduleTrigger = appData.triggers.module.search[pathOfThisModule];

  const dictionary = getDictionary(appData, resolverArgs.args);

  if (moduleTrigger) {
    await moduleTrigger({
      language: resolverArgs.args.language,
      dictionary,
      appData,
      module: mod,
      itemDefinition: null,
      args: resolverArgs.args,
      user: {
        role: tokenData.role,
        id: tokenData.id,
        customData: tokenData.customData,
      },
      usesElastic,
      elasticQueryBuilder: elasticQuery,
      whereBuilder: queryModel.whereBuilder,
      forbid: defaultTriggerForbiddenFunction,
    });
  }

  const limit: number = resolverArgs.args.limit;
  const offset: number = resolverArgs.args.offset;

  let baseResult: ISQLTableRowValue[] = [];
  let count: number = 0;

  if (usesElastic) {
    buildElasticQueryForModule(
      appData.cache.getServerData(),
      mod,
      resolverArgs.args,
      elasticQuery,
      resolverArgs.args.language,
      dictionary,
      resolverArgs.args.search,
      resolverArgs.args.order_by,
    );

    elasticQuery.setSourceIncludes(sqlFieldsToRequest);
    elasticQuery.setSize(limit);

    const requestBaseResult = (generalFields.results || generalFields.records);
    const requestCount = generalFields.count;

    // we have the count from here anyway
    if (requestBaseResult) {
      const result = await appData.elastic.executeQuery(elasticQuery);
      count = result.hits.total as number;
      baseResult = result.hits.hits.map((r) => {
        return r._source;
      })
    } else if (requestCount) {
      const result = await appData.elastic.executeCountQuery(elasticQuery);
      count = result.count;
    }
  } else {
    // now we build the sql query for the module
    const addedSearchRaw = buildSQLQueryForModule(
      appData.cache.getServerData(),
      mod,
      resolverArgs.args,
      queryModel.whereBuilder,
      queryModel.orderByBuilder,
      resolverArgs.args.language,
      dictionary,
      resolverArgs.args.search,
      resolverArgs.args.order_by,
    );

    queryModel.select(...sqlFieldsToRequest);
    addedSearchRaw.forEach((srApplyArgs) => {
      queryModel.selectExpression(srApplyArgs[0], srApplyArgs[1]);
    });
    queryModel.limit(limit).offset(offset);

    // return using the base result, and only using the id
    const requestBaseResult = (generalFields.results || generalFields.records);
    baseResult = requestBaseResult ?
      (await appData.databaseConnection.queryRows(queryModel)).map(convertVersionsIntoNullsWhenNecessary) as IGQLSearchRecord[] :
      [];

    queryModel.clear();
    queryModel.selectExpression(`COUNT(*) AS "count"`);
    queryModel.orderByBuilder.clear();

    // if we have requested for a base result, and we got less than the limit, we know the count right away
    // it's the same as our array len plus the offset
    if (requestBaseResult && baseResult.length < limit) {
      count = baseResult.length + offset;
    } else {
      const countResult: ISQLTableRowValue = generalFields.count ? (await appData.databaseConnection.queryFirst(queryModel)) : null;
      count = countResult ? countResult.count : null;
    }
  }

  if (traditional) {
    const finalResult: IGQLSearchResultsContainer = {
      results: await Promise.all(
        baseResult.map(async (r) => {
          const valueToProvide = await filterAndPrepareGQLValue(
            appData.cache.getServerData(),
            r,
            requestedFields,
            tokenData.role,
            tokenData.id,
            ownerId,
            rolesManager,
            mod,
          );

          const itemDefinition = appData.root.registry[r.type] as ItemDefinition;
          const pathOfThisModule = mod.getPath().join("/");
          const pathOfThisIdef = itemDefinition.getPath().join("/");
          const moduleTrigger = appData.triggers.module.io[pathOfThisModule];
          const itemDefinitionTrigger = appData.triggers.item.io[pathOfThisIdef]

          if (moduleTrigger || itemDefinitionTrigger) {
            const currentWholeValueAsGQL = convertSQLValueToGQLValueForItemDefinition(
              appData.cache.getServerData(),
              itemDefinition,
              r,
            );

            if (moduleTrigger) {
              await moduleTrigger({
                language: resolverArgs.args.language,
                dictionary,
                appData,
                itemDefinition,
                module: mod,
                originalValue: currentWholeValueAsGQL,
                originalValueSQL: r,
                originalValueBlocked: !!r.blocked_at,
                requestedUpdate: null,
                requestedUpdateToBlock: null,
                requestedUpdateToUnblock: null,
                requestedUpdateParent: null,
                requestedUpdateCreatedBy: null,
                newValue: null,
                newValueSQL: null,
                newValueBlocked: null,
                extraArgs: resolverArgs.args,
                action: IOTriggerActions.READ,
                id: r.id as string,
                version: r.version as string || null,
                user: {
                  role: tokenData.role,
                  id: tokenData.id,
                  customData: tokenData.customData,
                },
                forbid: defaultTriggerForbiddenFunction,
                customId: null,
              });
            }

            if (itemDefinitionTrigger) {
              await itemDefinitionTrigger({
                language: resolverArgs.args.language,
                dictionary,
                appData,
                itemDefinition,
                module: mod,
                originalValue: currentWholeValueAsGQL,
                originalValueSQL: r,
                originalValueBlocked: !!r.blocked_at,
                requestedUpdate: null,
                requestedUpdateToBlock: null,
                requestedUpdateToUnblock: null,
                requestedUpdateParent: null,
                requestedUpdateCreatedBy: null,
                newValue: null,
                newValueSQL: null,
                newValueBlocked: null,
                extraArgs: resolverArgs.args,
                action: IOTriggerActions.READ,
                id: r.id as string,
                version: r.version as string || null,
                user: {
                  role: tokenData.role,
                  id: tokenData.id,
                  customData: tokenData.customData,
                },
                forbid: defaultTriggerForbiddenFunction,
                customId: null,
              });
            }
          }

          const toReturnToUser = valueToProvide.toReturnToUser;
          if (
            toReturnToUser.DATA &&
            !await itemDefinition.checkRoleCanReadOwner(
              tokenData.role,
              tokenData.id,
              toReturnToUser.created_by,
              rolesManager,
              false
            )
          ) {
            if (toReturnToUser.DATA.created_by === toReturnToUser.DATA.edited_by) {
              toReturnToUser.DATA.edited_by = UNSPECIFIED_OWNER;
            };
            toReturnToUser.DATA.created_by = UNSPECIFIED_OWNER;
          }

          return toReturnToUser;
        }),
      ),
      last_modified: findLastRecordLastModifiedDate(baseResult as IGQLSearchRecord[]),
      limit,
      offset,
      count,
    }

    CAN_LOG_DEBUG && logger.debug(
      "searchModule: succeed traditionally",
    );

    return finalResult;
  } else {
    const finalResult: IGQLSearchRecordsContainer = {
      records: baseResult as IGQLSearchRecord[],
      last_modified: findLastRecordLastModifiedDate(baseResult as IGQLSearchRecord[]),
      limit,
      offset,
      count,
    };

    CAN_LOG_DEBUG && logger.debug(
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
  resolverItemDefinition: ItemDefinition,
  traditional?: boolean,
) {
  const usesElastic = resolverArgs.args.searchengine === true;
  const elasticIndexLang = (usesElastic && resolverArgs.args.searchengine_language) || null;

  if (usesElastic && !resolverItemDefinition.isSearchEngineEnabled()) {
    throw new EndpointError({
      message: resolverItemDefinition.getQualifiedPathName() + " does not support search engine searches",
      code: ENDPOINT_ERRORS.UNSPECIFIED,
    });
  } else if (usesElastic && resolverArgs.args.offset !== 0) {
    // this is a limitation of elasticsearch that it doesn't allow for pagination
    // with more than 10000 hits, and this is something we cannot ensure
    // as a result we disable the whole thing
    throw new EndpointError({
      message: "Using the search engine does not support non-zero offsets",
      code: ENDPOINT_ERRORS.UNSPECIFIED,
    });
  }

  let pooledRoot: Root;
  try {
    pooledRoot = await appData.rootPool.acquire().promise;
  } catch (err) {
    logger.error(
      "addItemDefinition [SERIOUS]: Failed to retrieve root from the pool",
      {
        errMessage: err.message,
        errStack: err.stack,
      },
    );
    throw new EndpointError({
      message: "Failed to retrieve root from the pool",
      code: ENDPOINT_ERRORS.INTERNAL_SERVER_ERROR,
    });
  }

  pooledRoot.setServerFlags(["SEARCH", "SEARCH_ONLY"]);
  const itemDefinition = pooledRoot.registry[resolverItemDefinition.getQualifiedPathName()] as ItemDefinition;

  CAN_LOG_DEBUG && logger.debug(
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
  checkUserCanSearch(resolverArgs.args, itemDefinition, tokenData);

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

  CAN_LOG_DEBUG && logger.debug(
    "searchItemDefinition: retrieved search fields as",
    searchingFields,
  );

  const ownerId = resolverArgs.args.created_by || null;
  const rolesManager = new CustomRoleManager(appData.customRoles, {
    cache: appData.cache,
    databaseConnection: appData.databaseConnection,
    rawDB: appData.rawDB,
    value: null,
    item: itemDefinition,
    module: itemDefinition.getParentModule(),
    tokenData: tokenData,
    root: appData.root,
    environment: traditional ? CustomRoleGranterEnvironment.SEARCHING_TRADITIONAL : CustomRoleGranterEnvironment.SEARCHING_RECORDS,
    requestArgs: resolverArgs.args,
    owner: ownerId,
    parent: resolverArgs.args.parent_id && resolverArgs.args.parent_type ? {
      id: resolverArgs.args.parent_id,
      type: resolverArgs.args.parent_type,
      version: resolverArgs.args.parent_version || null,
    } : null,
    customId: null,
  });

  const created_by = resolverArgs.args.created_by;
  let ownerToCheckAgainst = UNSPECIFIED_OWNER;
  if (created_by) {
    // we need to check whether the user can read the owner field for that creator
    // that is specifying, this is because you are reading the owner if you are
    // searching by it, indirectly
    await itemDefinition.checkRoleCanReadOwner(tokenData.role, tokenData.id, created_by, rolesManager, true);
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
  CAN_LOG_DEBUG && logger.debug(
    "searchItemDefinition: checking role access based on " + searchModeCounterpart.getQualifiedPathName(),
  );
  await searchModeCounterpart.checkRoleAccessFor(
    ItemDefinitionIOActions.READ,
    tokenData.role,
    tokenData.id,
    ownerToCheckAgainst,
    searchingFields,
    rolesManager,
    true,
  );

  // Checking search mode counterpart to validate
  searchModeCounterpart.applyValue(null, null, resolverArgs.args, false, null, false);
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

  let sqlFieldsToRequest: string[] = ["id", "version", "type", "last_modified"];
  let requestedFields: any = null;
  const generalFields = resolverArgs.fields;
  if (traditional) {
    requestedFields = flattenRawGQLValueOrFields(generalFields.results);
    const fieldsToRequestRawValue = Object.keys(requestedFields);

    const requestedFieldsInIdef = {};
    Object.keys(requestedFields || {}).forEach((arg) => {
      if (
        itemDefinition.hasPropertyDefinitionFor(arg, true) ||
        arg.startsWith(INCLUDE_PREFIX) && itemDefinition.hasIncludeFor(arg.replace(INCLUDE_PREFIX, ""))
      ) {
        requestedFieldsInIdef[arg] = requestedFields[arg];
      }
    });
    CAN_LOG_DEBUG && logger.debug(
      "searchItemDefinition: Extracted requested fields from module",
      fieldsToRequestRawValue,
    );

    sqlFieldsToRequest = [];
    fieldsToRequestRawValue.forEach((v) => {
      if (v.startsWith(INCLUDE_PREFIX)) {
        const actualName = v.replace(INCLUDE_PREFIX, "");
        const include = itemDefinition.hasIncludeFor(actualName) && itemDefinition.getIncludeFor(actualName);

        // will filter out exclusion state from getting here cheaply
        if (include) {
          const includeProperties = requestedFields[v];

          const includePrefix = include.getPrefixedQualifiedIdentifier();
          const includeExclusionState = includePrefix + EXCLUSION_STATE_SUFFIX;

          if (!sqlFieldsToRequest.includes(includeExclusionState)) {
            sqlFieldsToRequest.push(includeExclusionState);
          }

          Object.keys(includeProperties).forEach((v2) => {
            const propDef = include.getSinkingPropertyFor(v2);
            const sqlSelectFields = propDef.getPropertyDefinitionDescription().sqlSelect({
              id: v2,
              itemDefinition,
              prefix: includePrefix,
              property: propDef,
              serverData: appData.cache.getServerData(),
              include,
            });
            sqlFieldsToRequest = sqlFieldsToRequest.concat(sqlSelectFields);
          });
        } else {
          sqlFieldsToRequest.push(v);
        }
      } else {
        // will filter out special properties
        const propDef = itemDefinition.hasPropertyDefinitionFor(v, true) && itemDefinition.getPropertyDefinitionFor(v, true);
        if (!propDef) {
          sqlFieldsToRequest.push(v);
        } else {
          const sqlSelectFields = propDef.getPropertyDefinitionDescription().sqlSelect({
            id: v,
            itemDefinition,
            prefix: "",
            property: propDef,
            serverData: appData.cache.getServerData(),
          });
          sqlFieldsToRequest = sqlFieldsToRequest.concat(...sqlSelectFields);
        }
      }
    });

    if (!sqlFieldsToRequest.includes("last_modified")) {
      sqlFieldsToRequest.push("last_modified");
    }
    // we need these to get the DATA properly populated
    // as the filterAndPrepareGQLValue will use of those
    // to know if the value is blocked to return to user
    if (!sqlFieldsToRequest.includes("blocked_at")) {
      sqlFieldsToRequest.push("blocked_at");
    }

    await itemDefinition.checkRoleAccessFor(
      ItemDefinitionIOActions.READ,
      tokenData.role,
      tokenData.id,
      ownerToCheckAgainst,
      requestedFieldsInIdef,
      rolesManager,
      true,
    );
  }

  let elasticQuery: ElasticQueryBuilder;
  let queryModel: SelectBuilder;

  // now we build the search query
  if (usesElastic) {
    elasticQuery = appData.elastic.getSelectBuilder(
      itemDefinition,
      elasticIndexLang,
    );
    elasticQuery.mustTerm({
      blocked_by: null,
    });

    if (created_by) {
      elasticQuery.mustTerm({
        created_by: created_by,
      });
    }

    if (since) {
      elasticQuery.must({
        range: {
          created_at: {
            gte: since,
          }
        }
      });
    }

    if (typeof resolverArgs.args.version_filter !== "undefined") {
      elasticQuery.mustTerm({
        version: resolverArgs.args.version_filter || null,
      });
    }

    if (resolverArgs.args.parent_id && resolverArgs.args.parent_type) {
      elasticQuery.mustTerm({
        parent_id: resolverArgs.args.parent_id,
        parent_version: resolverArgs.args.parent_version || null,
        parent_type: resolverArgs.args.parent_type,
      });
    } else if (resolverArgs.args.parent_type) {
      elasticQuery.mustTerm({
        parent_type: resolverArgs.args.parent_type,
      });
    }

  } else {
    queryModel = appData.databaseConnection.getSelectBuilder();
    queryModel.fromBuilder.from(selfTable);
    queryModel.joinBuilder.join(moduleTable, (clause) => {
      clause.onColumnEquals("id", CONNECTOR_SQL_COLUMN_ID_FK_NAME);
      clause.onColumnEquals("version", CONNECTOR_SQL_COLUMN_VERSION_FK_NAME);
    });
    queryModel.whereBuilder.andWhereColumnNull("blocked_at");

    if (created_by) {
      queryModel.whereBuilder.andWhereColumn("created_by", created_by);
    }

    if (since) {
      queryModel.whereBuilder.andWhereColumn("created_at", ">=", since);
    }

    if (typeof resolverArgs.args.version_filter !== "undefined") {
      queryModel.whereBuilder.andWhereColumn("version", resolverArgs.args.version_filter || "");
    }

    if (resolverArgs.args.parent_id && resolverArgs.args.parent_type) {
      queryModel.whereBuilder
        .andWhereColumn("parent_id", resolverArgs.args.parent_id)
        .andWhereColumn("parent_version", resolverArgs.args.parent_version || "")
        .andWhereColumn("parent_type", resolverArgs.args.parent_type);
    } else if (resolverArgs.args.parent_type) {
      queryModel.whereBuilder
        .andWhereColumn("parent_type", resolverArgs.args.parent_type);
    }
  }

  const pathOfThisModule = mod.getPath().join("/");
  const moduleTrigger = appData.triggers.module.search[pathOfThisModule];
  const pathOfThisIdef = itemDefinition.getAbsolutePath().join("/");
  const idefTrigger = appData.triggers.item.search[pathOfThisIdef];

  const dictionary = getDictionary(appData, resolverArgs.args);

  if (moduleTrigger || idefTrigger) {
    const args = {
      language: resolverArgs.args.language,
      dictionary,
      appData,
      module: mod,
      itemDefinition,
      args: resolverArgs.args,
      user: {
        role: tokenData.role,
        id: tokenData.id,
        customData: tokenData.customData,
      },
      usesElastic,
      whereBuilder: queryModel ? queryModel.whereBuilder : null,
      elasticQueryBuilder: elasticQuery || null,
      forbid: defaultTriggerForbiddenFunction,
    };
    if (moduleTrigger) {
      await moduleTrigger(args);
    }
    if (idefTrigger) {
      await idefTrigger(args);
    }
  }

  // and now we call the function that builds the query itself into
  // that parent query, and adds the andWhere as required
  // into such query
  let count: number = 0;
  let baseResult: ISQLTableRowValue[] = [];
  const limit: number = resolverArgs.args.limit;
  const offset: number = resolverArgs.args.offset;

  if (usesElastic) {
    buildElasticQueryForItemDefinition(
      appData.cache.getServerData(),
      itemDefinition,
      resolverArgs.args,
      elasticQuery,
      resolverArgs.args.language,
      dictionary,
      resolverArgs.args.search,
      resolverArgs.args.order_by,
    );

    elasticQuery.setSourceIncludes(sqlFieldsToRequest);
    elasticQuery.setSize(limit);

    const requestBaseResult = (generalFields.results || generalFields.records);
    const requestCount = generalFields.count;

    // we have the count from here anyway
    if (requestBaseResult) {
      const result = await appData.elastic.executeQuery(elasticQuery);
      count = result.hits.total as number;
      baseResult = result.hits.hits.map((r) => {
        return r._source;
      })
    } else if (requestCount) {
      const result = await appData.elastic.executeCountQuery(elasticQuery);
      count = result.count;
    }
  } else {
    const addedSearchRaw = buildSQLQueryForItemDefinition(
      appData.cache.getServerData(),
      itemDefinition,
      resolverArgs.args,
      queryModel.whereBuilder,
      queryModel.orderByBuilder,
      resolverArgs.args.language,
      dictionary,
      resolverArgs.args.search,
      resolverArgs.args.order_by,
    );

    queryModel.select(...sqlFieldsToRequest);
    addedSearchRaw.forEach((srApplyArgs) => {
      queryModel.selectExpression(srApplyArgs[0], srApplyArgs[1]);
    });
    queryModel.limit(limit).offset(offset);

    // return using the base result, and only using the id
    const requestBaseResult = (generalFields.results || generalFields.records);
    baseResult = requestBaseResult ?
      (await appData.databaseConnection.queryRows(queryModel)).map(convertVersionsIntoNullsWhenNecessary) as IGQLSearchRecord[] :
      [];

    queryModel.clear();
    queryModel.selectExpression(`COUNT(*) AS "count"`);
    queryModel.orderByBuilder.clear();

    // if we have requested for a base result, and we got less than the limit, we know the count right away
    // it's the same as our array len plus the offset
    if (requestBaseResult && baseResult.length < limit) {
      count = baseResult.length + offset;
    } else {
      const countResult: ISQLTableRowValue = generalFields.count ? (await appData.databaseConnection.queryFirst(queryModel)) : null;
      count = countResult ? countResult.count : null;
    }
  }

  if (traditional) {
    const finalResult: IGQLSearchResultsContainer = {
      results: await Promise.all(
        baseResult.map(async (r) => {
          const valueToProvide = await filterAndPrepareGQLValue(
            appData.cache.getServerData(),
            r,
            requestedFields,
            tokenData.role,
            tokenData.id,
            ownerId,
            rolesManager,
            itemDefinition,
          );

          const pathOfThisModule = mod.getPath().join("/");
          const pathOfThisIdef = itemDefinition.getPath().join("/");
          const moduleTrigger = appData.triggers.module.io[pathOfThisModule];
          const itemDefinitionTrigger = appData.triggers.item.io[pathOfThisIdef]

          if (moduleTrigger || itemDefinitionTrigger) {
            const currentWholeValueAsGQL = convertSQLValueToGQLValueForItemDefinition(
              appData.cache.getServerData(),
              itemDefinition,
              r,
            );

            if (moduleTrigger) {
              await moduleTrigger({
                language: resolverArgs.args.language,
                dictionary,
                appData,
                itemDefinition,
                module: mod,
                originalValue: currentWholeValueAsGQL,
                originalValueSQL: r,
                originalValueBlocked: !!r.blocked_at,
                requestedUpdate: null,
                requestedUpdateToUnblock: null,
                requestedUpdateToBlock: null,
                requestedUpdateParent: null,
                requestedUpdateCreatedBy: null,
                newValue: null,
                newValueSQL: null,
                newValueBlocked: null,
                extraArgs: resolverArgs.args,
                action: IOTriggerActions.READ,
                id: r.id as string,
                version: r.version as string || null,
                user: {
                  role: tokenData.role,
                  id: tokenData.id,
                  customData: tokenData.customData,
                },
                forbid: defaultTriggerForbiddenFunction,
                customId: null,
              });
            }

            if (itemDefinitionTrigger) {
              await itemDefinitionTrigger({
                language: resolverArgs.args.language,
                dictionary,
                appData,
                itemDefinition,
                module: mod,
                originalValue: currentWholeValueAsGQL,
                originalValueSQL: r,
                originalValueBlocked: !!r.blocked_at,
                requestedUpdate: null,
                requestedUpdateToUnblock: null,
                requestedUpdateToBlock: null,
                requestedUpdateParent: null,
                requestedUpdateCreatedBy: null,
                newValue: null,
                newValueSQL: null,
                newValueBlocked: null,
                extraArgs: resolverArgs.args,
                action: IOTriggerActions.READ,
                id: r.id as string,
                version: r.version as string || null,
                user: {
                  role: tokenData.role,
                  id: tokenData.id,
                  customData: tokenData.customData,
                },
                forbid: defaultTriggerForbiddenFunction,
                customId: null,
              });
            }
          }

          const toReturnToUser = valueToProvide.toReturnToUser;
          if (
            toReturnToUser.DATA &&
            !await itemDefinition.checkRoleCanReadOwner(
              tokenData.role,
              tokenData.id,
              toReturnToUser.DATA.created_by,
              rolesManager,
              false
            )
          ) {
            if (toReturnToUser.DATA.created_by === toReturnToUser.DATA.edited_by) {
              toReturnToUser.DATA.edited_by = UNSPECIFIED_OWNER;
            };
            toReturnToUser.DATA.created_by = UNSPECIFIED_OWNER;
          }

          return toReturnToUser;
        })
      ),
      last_modified: findLastRecordLastModifiedDate(baseResult as IGQLSearchRecord[]),
      limit,
      offset,
      count,
    }

    CAN_LOG_DEBUG && logger.debug(
      "searchItemDefinition: succeed traditionally",
    );

    pooledRoot.cleanState();
    appData.rootPool.release(pooledRoot);
    return finalResult;
  } else {
    const finalResult: IGQLSearchRecordsContainer = {
      records: baseResult as IGQLSearchRecord[],
      last_modified: findLastRecordLastModifiedDate(baseResult as IGQLSearchRecord[]),
      limit,
      offset,
      count,
    };

    CAN_LOG_DEBUG && logger.debug(
      "searchItemDefinition: succeed with records",
    );

    pooledRoot.cleanState();
    appData.rootPool.release(pooledRoot);
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
