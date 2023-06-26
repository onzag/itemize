import { IAppDataType } from "../../";
import { logger } from "../../logger";
import ItemDefinition, { ItemDefinitionIOActions } from "../../../base/Root/Module/ItemDefinition";
import { IGraphQLIdefResolverArgs, FGraphQLIdefResolverType, FGraphQLModResolverType } from "../../../base/Root/gql";
import {
  checkLanguage,
  validateTokenAndGetData,
  filterAndPrepareGQLValue,
  checkLimit,
  validateTokenIsntBlocked,
  checkListTypes,
  runPolicyCheck,
  checkReadPoliciesAllowThisUserToSearch,
  defaultTriggerForbiddenFunction,
  getDictionary,
} from "../basic";
import {
  INCLUDE_PREFIX,
  UNSPECIFIED_OWNER,
  ENDPOINT_ERRORS,
} from "../../../constants";
import { ISQLTableRowValue } from "../../../base/Root/sql";
import Module from "../../../base/Root/Module";
import { flattenRawGQLValueOrFields } from "../../../gql-util";
import { EndpointError } from "../../../base/errors";
import { IGQLSearchRecord, IGQLValue } from "../../../gql-querier";
import { IOTriggerActions } from "../triggers";
import { buildElasticQueryForItemDefinition, convertSQLValueToGQLValueForItemDefinition } from "../../../base/Root/Module/ItemDefinition/sql";
import { CustomRoleGranterEnvironment, CustomRoleManager } from "../roles";
import { CAN_LOG_DEBUG } from "../../environment";
import type { IElasticHighlightReply, IElasticHighlightRecordInfo } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import { buildElasticQueryForModule } from "../../../base/Root/Module/sql";

function noop() { };

export async function getItemDefinition(
  appData: IAppDataType,
  resolverArgs: IGraphQLIdefResolverArgs,
  itemDefinition: ItemDefinition,
) {
  CAN_LOG_DEBUG && logger.debug(
    {
      functionName: "getItemDefinition",
      message: "Executed get for " + itemDefinition.getQualifiedPathName(),
    },
  );
  // first we check that the language and region provided are
  // right and available
  checkLanguage(appData, resolverArgs.args);
  const tokenData = await validateTokenAndGetData(appData, resolverArgs.args.token);
  await validateTokenIsntBlocked(appData.cache, tokenData);

  // now we find the requested fields that are requested
  // in the get request
  const rawFields = resolverArgs.fields;
  const requestedFields = flattenRawGQLValueOrFields(rawFields);

  let currentWholeValueAsGQL: IGQLValue;
  let ownerId: string;
  let rolesManager: CustomRoleManager;

  // so we run the policy check for read, this item definition,
  // with the given id
  const selectQueryValue: ISQLTableRowValue = await runPolicyCheck(
    {
      policyTypes: ["read"],
      itemDefinition,
      id: resolverArgs.args.id,
      version: resolverArgs.args.version || null,
      role: tokenData.role,
      userId: tokenData.id,
      gqlArgValue: resolverArgs.args,
      gqlFlattenedRequestedFiels: requestedFields,
      appData,
      rolesManager: (sqlValue: ISQLTableRowValue) => {
        currentWholeValueAsGQL = sqlValue ? convertSQLValueToGQLValueForItemDefinition(
          appData.cache.getServerData(),
          appData,
          itemDefinition,
          sqlValue,
        ) : null;
      
        ownerId = sqlValue ? (itemDefinition.isOwnerObjectId() ? sqlValue.id : sqlValue.created_by) : null;
        rolesManager = new CustomRoleManager(appData.customRoles, {
          cache: appData.cache,
          databaseConnection: appData.databaseConnection,
          rawDB: appData.rawDB,
          value: currentWholeValueAsGQL,
          item: itemDefinition,
          module: itemDefinition.getParentModule(),
          root: appData.root,
          tokenData: tokenData,
          environment: CustomRoleGranterEnvironment.RETRIEVING,
          requestArgs: resolverArgs.args,
          owner: ownerId,
          parent: sqlValue && sqlValue.parent_id ? {
            id: sqlValue.parent_id,
            type: sqlValue.parent_type,
            version: sqlValue.parent_version,
          } : null,
          customId: null,
        });

        return rolesManager;
      },
      preValidation: (content: ISQLTableRowValue) => {
        // if there is no content, we force the entire policy check not to
        // be performed and return null
        if (!content) {
          return null;
        }
      },
    },
  );

  // we get the requested fields that take part of the item definition
  // description
  const requestedFieldsInIdef = {};
  Object.keys(requestedFields).forEach((arg) => {
    if (
      itemDefinition.hasPropertyDefinitionFor(arg, true) ||
      arg.startsWith(INCLUDE_PREFIX) && itemDefinition.hasIncludeFor(arg.replace(INCLUDE_PREFIX, ""))
    ) {
      requestedFieldsInIdef[arg] = requestedFields[arg];
    }
  });

  // if we don't have any result, we cannot even check permissions
  // the thing does not exist, returning null
  if (!selectQueryValue) {
    // now there is not much but to run this function
    // as a gimmick, we use -1 as the user id to make
    // some sort of global user, as OWNER rules clearly
    // do not apply, we want to throw an error
    // still to the user even though there is no data
    // to protect because the result comes whole thing
    // null, but still, just to keep some consistency we
    // run this function
    await itemDefinition.checkRoleAccessFor(
      ItemDefinitionIOActions.READ,
      tokenData.role,
      tokenData.id,
      UNSPECIFIED_OWNER,
      requestedFieldsInIdef,
      rolesManager,
      true,
    );
    CAN_LOG_DEBUG && logger.debug(
      {
        functionName: "getItemDefinition",
        message: "No results found returning null",
      },
    );
    // We do not return the 404, just return null in this case
    return null;
  }

  let userId = selectQueryValue.created_by;
  if (itemDefinition.isOwnerObjectId()) {
    userId = selectQueryValue.id;
  }

  CAN_LOG_DEBUG && logger.debug(
    {
      functionName: "getItemDefinition",
      message: "Checking role access for read",
    },
  );
  // now we check the role access, this function will throw an error
  // if that fails, and we only check for the requested fields
  await itemDefinition.checkRoleAccessFor(
    ItemDefinitionIOActions.READ,
    tokenData.role,
    tokenData.id,
    userId,
    requestedFieldsInIdef,
    rolesManager,
    true,
  );

  CAN_LOG_DEBUG && logger.debug(
    {
      functionName: "getItemDefinition",
      message: "SQL ouput retrieved",
    },
  );

  const valueToProvide = await filterAndPrepareGQLValue(
    appData.cache.getServerData(),
    appData,
    selectQueryValue,
    requestedFields,
    tokenData.role,
    tokenData.id,
    userId,
    rolesManager,
    itemDefinition,
  );

  // now we need to find the triggers
  const pathOfThisIdef = itemDefinition.getAbsolutePath().join("/");
  const mod = itemDefinition.getParentModule();
  const pathOfThisModule = mod.getPath().join("/");
  // and extract the triggers from the registry
  const itemDefinitionTrigger = appData.triggers.item.io[pathOfThisIdef]
  const moduleTrigger = appData.triggers.module.io[pathOfThisModule];

  let toReturnToUser: any = valueToProvide.toReturnToUser;

  if (moduleTrigger || itemDefinitionTrigger) {
    const dictionary = getDictionary(appData, resolverArgs.args);

    if (moduleTrigger) {
      await moduleTrigger({
        language: resolverArgs.args.language,
        dictionary,
        appData,
        itemDefinition,
        module: mod,
        originalValue: currentWholeValueAsGQL,
        originalValueSQL: selectQueryValue,
        originalValueBlocked: !!selectQueryValue.blocked_at,
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
        id: resolverArgs.args.id as string,
        version: resolverArgs.args.version as string || null,
        user: {
          role: tokenData.role,
          id: tokenData.id,
          customData: tokenData.customData,
        },
        forbid: defaultTriggerForbiddenFunction,
        customId: null,
        setForId: noop,
        setVersion: noop,
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
        originalValueSQL: selectQueryValue,
        originalValueBlocked: !!selectQueryValue.blocked_at,
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
        id: resolverArgs.args.id as string,
        version: resolverArgs.args.version as string || null,
        user: {
          role: tokenData.role,
          id: tokenData.id,
          customData: tokenData.customData,
        },
        forbid: defaultTriggerForbiddenFunction,
        customId: null,
        setForId: noop,
        setVersion: noop,
      });
    }
  }

  if (
    toReturnToUser.DATA &&
    !await itemDefinition.checkRoleCanReadOwner(
      tokenData.role,
      tokenData.id,
      toReturnToUser.DATA.created_by,
      rolesManager,
      false,
    )
  ) {
    if (toReturnToUser.DATA.created_by === toReturnToUser.DATA.edited_by) {
      toReturnToUser.DATA.edited_by = UNSPECIFIED_OWNER;
    };
    toReturnToUser.DATA.created_by = UNSPECIFIED_OWNER;
  }

  CAN_LOG_DEBUG && logger.debug(
    {
      functionName: "getItemDefinition",
      message: "GQL ouput retrieved",
    },
  );

  // return if otherwise succeeds
  return toReturnToUser;
}

export async function getItemDefinitionList(
  appData: IAppDataType,
  resolverArgs: IGraphQLIdefResolverArgs,
  itemDefinition: ItemDefinition,
) {
  CAN_LOG_DEBUG && logger.debug(
    {
      functionName: "getItemDefinitionList",
      message: "Executed get list for " + itemDefinition.getQualifiedPathName(),
    },
  );

  const usesElastic = resolverArgs.args.searchengine === true;
  const elasticIndexLang = (usesElastic && resolverArgs.args.searchengine_language) || null;

  if (usesElastic && !itemDefinition.isSearchEngineEnabled()) {
    throw new EndpointError({
      message: itemDefinition.getQualifiedPathName() + " does not support search engine searches",
      code: ENDPOINT_ERRORS.UNSPECIFIED,
    });
  }

  // first we check that the language and region provided are
  // right and available
  checkLanguage(appData, resolverArgs.args);
  checkLimit((resolverArgs.args.records as IGQLSearchRecord[]).length, itemDefinition, true);
  const mod = itemDefinition.getParentModule();
  checkListTypes(resolverArgs.args.records, mod);
  const tokenData = await validateTokenAndGetData(appData, resolverArgs.args.token);
  checkReadPoliciesAllowThisUserToSearch(
    itemDefinition,
    tokenData.role,
  );

  // now we find the requested fields that are requested
  // in the get request
  const requestedFields = flattenRawGQLValueOrFields(resolverArgs.fields.results);

  // we get the requested fields that take part of the item definition
  // description
  const requestedFieldsInIdef = {};
  Object.keys(requestedFields).forEach((arg) => {
    if (
      itemDefinition.hasPropertyDefinitionFor(arg, true) ||
      arg.startsWith(INCLUDE_PREFIX) && itemDefinition.hasIncludeFor(arg.replace(INCLUDE_PREFIX, ""))
    ) {
      requestedFieldsInIdef[arg] = requestedFields[arg];
    }
  });

  const created_by = resolverArgs.args.created_by;
  let ownerToCheckAgainst = UNSPECIFIED_OWNER;
  if (created_by) {
    ownerToCheckAgainst = created_by;
  }

  // preventing a security leak here by ensuring that the type that we are searching
  // in the list is all consistent for the type of this item definition, when requesting
  // the cache and the query that will be used as a table name, as the type is the same
  // as the qualified path name and the table name, so by ensuring it's a legit name
  // we ensure there is no leak
  const selfTableType = itemDefinition.getQualifiedPathName();
  resolverArgs.args.records.forEach((argId: IGQLSearchRecord) => {
    if (argId.type !== selfTableType) {
      throw new EndpointError({
        message: "Invalid id container type that didn't match the qualified name " + selfTableType,
        code: ENDPOINT_ERRORS.UNSPECIFIED,
      });
    }
  });

  let highlights: string = null;
  let resultValues: ISQLTableRowValue[];

  if (usesElastic) {
    const resultQuery = appData.elastic.getSelectBuilder(
      itemDefinition,
      elasticIndexLang,
    );
    resultQuery.mustTerms({
      _id: resolverArgs.args.records.map((r: IGQLSearchRecord) => r.id + "." + (r.version || ""))
    });

    const dictionary = getDictionary(appData, resolverArgs.args);

    let rHighReply: IElasticHighlightReply = {};
    resultQuery.should((q) => {
      rHighReply = buildElasticQueryForItemDefinition(
        appData.cache.getServerData(),
        appData,
        itemDefinition,
        resolverArgs.args,
        q,
        resolverArgs.args.language,
        dictionary,
        resolverArgs.args.search,
        resolverArgs.args.order_by,
      );
    });

    const highlightKeys = Object.keys(rHighReply);
    resultQuery.setHighlightsOn(rHighReply);

    const result = await appData.elastic.executeQuery(resultQuery);
    const highlightsJSON: IElasticHighlightRecordInfo = {};
    resultValues = result.hits.hits.map((r) => {
      highlightsJSON[r._id] = {};
      highlightKeys.forEach((highlightNameOriginal) => {
        const originalMatch = rHighReply[highlightNameOriginal];
        highlightsJSON[r._id][originalMatch.name] = {
          highlights: (r.highlight && r.highlight[highlightNameOriginal]) || null,
          match: originalMatch.match,
        }
      });
      return r._source;
    });
    highlights = JSON.stringify(highlightsJSON);
  } else {
    resultValues = await appData.cache.requestListCache(
      resolverArgs.args.records,
    );
  }

  const finalValues = await Promise.all(resultValues.map(
    async (value) => {
      // preveting another security leak here, the user might have lied by saying that these
      // items were all created by this specific creator when doing searches
      if (created_by && value.created_by !== created_by) {
        throw new EndpointError({
          message: "created_by mismatch, one of the items requested was not created by whom it was claimed",
          code: ENDPOINT_ERRORS.UNSPECIFIED,
        });
      }

      const pathOfThisModule = mod.getPath().join("/");
      const pathOfThisIdef = itemDefinition.getPath().join("/");
      const moduleTrigger = appData.triggers.module.io[pathOfThisModule];
      const itemDefinitionTrigger = appData.triggers.item.io[pathOfThisIdef];

      CAN_LOG_DEBUG && logger.debug(
        {
          functionName: "getItemDefinitionList",
          message: "Checking role access for read",
        },
      );
      const currentWholeValueAsGQL = convertSQLValueToGQLValueForItemDefinition(
        appData.cache.getServerData(),
        appData,
        itemDefinition,
        value,
      );

      const ownerId = itemDefinition.isOwnerObjectId() ? value.id : value.created_by;
      const rolesManager = new CustomRoleManager(appData.customRoles, {
        cache: appData.cache,
        databaseConnection: appData.databaseConnection,
        rawDB: appData.rawDB,
        value: currentWholeValueAsGQL,
        item: itemDefinition,
        module: itemDefinition.getParentModule(),
        root: appData.root,
        tokenData: tokenData,
        environment: CustomRoleGranterEnvironment.RETRIEVING,
        requestArgs: resolverArgs.args,
        owner: ownerId,
        parent: value.parent_id ? {
          id: value.parent_id,
          type: value.parent_type,
          version: value.parent_version,
        } : null,
        customId: null,
      });

      await itemDefinition.checkRoleAccessFor(
        ItemDefinitionIOActions.READ,
        tokenData.role,
        tokenData.id,
        ownerToCheckAgainst,
        requestedFieldsInIdef,
        rolesManager,
        true,
      );

      const valueToProvide = await filterAndPrepareGQLValue(
        appData.cache.getServerData(),
        appData,
        value,
        requestedFields,
        tokenData.role,
        tokenData.id,
        ownerToCheckAgainst,
        rolesManager,
        itemDefinition,
      );

      if (moduleTrigger || itemDefinitionTrigger) {
        const dictionary = getDictionary(appData, resolverArgs.args);

        if (moduleTrigger) {
          await moduleTrigger({
            language: resolverArgs.args.language,
            dictionary,
            appData,
            itemDefinition,
            module: mod,
            originalValue: currentWholeValueAsGQL,
            originalValueSQL: value,
            originalValueBlocked: !!value.blocked_at,
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
            id: value.id as string,
            version: value.version as string || null,
            user: {
              role: tokenData.role,
              id: tokenData.id,
              customData: tokenData.customData,
            },
            forbid: defaultTriggerForbiddenFunction,
            customId: null,
            setForId: noop,
            setVersion: noop,
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
            originalValueSQL: value,
            originalValueBlocked: !!value.blocked_at,
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
            id: value.id as string,
            version: value.version as string || null,
            user: {
              role: tokenData.role,
              id: tokenData.id,
              customData: tokenData.customData,
            },
            forbid: defaultTriggerForbiddenFunction,
            customId: null,
            setForId: noop,
            setVersion: noop,
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
          false,
        )
      ) {
        if (toReturnToUser.DATA.created_by === toReturnToUser.DATA.edited_by) {
          toReturnToUser.DATA.edited_by = UNSPECIFIED_OWNER;
        };
        toReturnToUser.DATA.created_by = UNSPECIFIED_OWNER;
      }

      return toReturnToUser;
    },
  ));

  const resultAsObject = {
    results: finalValues,
    highlights,
  };

  CAN_LOG_DEBUG && logger.debug({
    functionName: "getItemDefinitionList",
    message: "Done",
  });

  return resultAsObject;
}

export async function getModuleList(
  appData: IAppDataType,
  resolverArgs: IGraphQLIdefResolverArgs,
  mod: Module,
) {
  CAN_LOG_DEBUG && logger.debug(
    {
      functionName: "getModuleList",
      message: "Executed get list for " + mod.getQualifiedPathName(),
    },
  );

  const usesElastic = resolverArgs.args.searchengine === true;
  const elasticIndexLang = (usesElastic && resolverArgs.args.searchengine_language) || null;

  if (usesElastic && !mod.isSearchEngineEnabled()) {
    throw new EndpointError({
      message: mod.getQualifiedPathName() + " does not support search engine searches",
      code: ENDPOINT_ERRORS.UNSPECIFIED,
    });
  }

  // first we check that the language and region provided are
  // right and available
  checkLanguage(appData, resolverArgs.args);
  checkLimit((resolverArgs.args.records as IGQLSearchRecord[]).length, mod, true);
  checkListTypes(resolverArgs.args.records, mod);
  const tokenData = await validateTokenAndGetData(appData, resolverArgs.args.token);
  await validateTokenIsntBlocked(appData.cache, tokenData);

  // now we find the requested fields that are requested
  // in the get request
  const requestedFields = flattenRawGQLValueOrFields(resolverArgs.fields.results);

  // we get the requested fields that take part of the item definition
  // description
  const requestedFieldsInMod = {};
  Object.keys(requestedFields).forEach((arg) => {
    if (mod.hasPropExtensionFor(arg)) {
      requestedFieldsInMod[arg] = requestedFields[arg];
    }
  });

  const created_by = resolverArgs.args.created_by;
  let ownerToCheckAgainst = UNSPECIFIED_OWNER;
  if (created_by) {
    ownerToCheckAgainst = created_by;
  }

  let highlights: string = null;
  let resultValues: ISQLTableRowValue[];

  if (usesElastic) {
    const resultQuery = appData.elastic.getSelectBuilder(
      mod,
      elasticIndexLang,
    );
    resultQuery.mustTerms({
      _id: resolverArgs.args.records.map((r: IGQLSearchRecord) => r.id + "." + (r.version || ""))
    });

    const dictionary = getDictionary(appData, resolverArgs.args);

    let rHighReply: IElasticHighlightReply = {};
    resultQuery.should((q) => {
      rHighReply = buildElasticQueryForModule(
        appData.cache.getServerData(),
        appData,
        mod,
        resolverArgs.args,
        q,
        resolverArgs.args.language,
        dictionary,
        resolverArgs.args.search,
        resolverArgs.args.order_by,
      );
    });

    const highlightKeys = Object.keys(rHighReply);
    resultQuery.setHighlightsOn(rHighReply);

    const result = await appData.elastic.executeQuery(resultQuery);
    const highlightsJSON: IElasticHighlightRecordInfo = {};
    resultValues = result.hits.hits.map((r) => {
      highlightsJSON[r._id] = {};
      highlightKeys.forEach((highlightNameOriginal) => {
        const originalMatch = rHighReply[highlightNameOriginal];
        highlightsJSON[r._id][originalMatch.name] = {
          highlights: (r.highlight && r.highlight[highlightNameOriginal]) || null,
          match: originalMatch.match,
        }
      });
      return r._source;
    });
    highlights = JSON.stringify(highlightsJSON);
  } else {
    resultValues = await appData.cache.requestListCache(
      resolverArgs.args.records,
    );
  }

  // return if otherwise succeeds
  const finalValues = await Promise.all(resultValues.map(
    async (value) => {
      // preveting another security leak here, the user might have lied by saying that these
      // items were all created by this specific creator when doing searches
      if (created_by && value.created_by !== created_by) {
        throw new EndpointError({
          message: "created_by mismatch, one of the items requested was not created by whom it was claimed",
          code: ENDPOINT_ERRORS.UNSPECIFIED,
        });
      }

      const itemDefinition = appData.root.registry[value.type] as ItemDefinition;
      const pathOfThisModule = mod.getPath().join("/");
      const pathOfThisIdef = itemDefinition.getPath().join("/");
      const moduleTrigger = appData.triggers.module.io[pathOfThisModule];
      const itemDefinitionTrigger = appData.triggers.item.io[pathOfThisIdef];

      const currentWholeValueAsGQL = convertSQLValueToGQLValueForItemDefinition(
        appData.cache.getServerData(),
        appData,
        itemDefinition,
        value,
      );

      CAN_LOG_DEBUG && logger.debug(
        {
          functionName: "getModuleList",
          message: "Checking role access for read",
        },
      );
      const ownerId = itemDefinition.isOwnerObjectId() ? value.id : value.created_by;
      const rolesManager = new CustomRoleManager(appData.customRoles, {
        cache: appData.cache,
        databaseConnection: appData.databaseConnection,
        rawDB: appData.rawDB,
        value: currentWholeValueAsGQL,
        item: itemDefinition,
        module: itemDefinition.getParentModule(),
        root: appData.root,
        tokenData: tokenData,
        environment: CustomRoleGranterEnvironment.RETRIEVING,
        requestArgs: resolverArgs.args,
        owner: ownerId,
        parent: value.parent_id ? {
          id: value.parent_id,
          type: value.parent_type,
          version: value.parent_version,
        } : null,
        customId: null,
      });
      await mod.checkRoleAccessFor(
        ItemDefinitionIOActions.READ,
        tokenData.role,
        tokenData.id,
        ownerToCheckAgainst,
        requestedFieldsInMod,
        rolesManager,
        true,
      );

      const valueToProvide = await filterAndPrepareGQLValue(
        appData.cache.getServerData(),
        appData,
        value,
        requestedFields,
        tokenData.role,
        tokenData.id,
        ownerToCheckAgainst,
        rolesManager,
        mod,
      );

      if (moduleTrigger || itemDefinitionTrigger) {
        const dictionary = getDictionary(appData, resolverArgs.args);

        if (moduleTrigger) {
          await moduleTrigger({
            language: resolverArgs.args.language,
            dictionary,
            appData,
            itemDefinition,
            module: mod,
            originalValue: currentWholeValueAsGQL,
            originalValueSQL: value,
            originalValueBlocked: !!value.blocked_at,
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
            id: value.id as string,
            version: value.version as string || null,
            user: {
              role: tokenData.role,
              id: tokenData.id,
              customData: tokenData.customData,
            },
            forbid: defaultTriggerForbiddenFunction,
            customId: null,
            setForId: noop,
            setVersion: noop,
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
            originalValueSQL: value,
            originalValueBlocked: !!value.blocked_at,
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
            id: value.id as string,
            version: value.version as string || null,
            user: {
              role: tokenData.role,
              id: tokenData.id,
              customData: tokenData.customData,
            },
            forbid: defaultTriggerForbiddenFunction,
            customId: null,
            setForId: noop,
            setVersion: noop,
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
          false,
        )
      ) {
        if (toReturnToUser.DATA.created_by === toReturnToUser.DATA.edited_by) {
          toReturnToUser.DATA.edited_by = UNSPECIFIED_OWNER;
        };
        toReturnToUser.DATA.created_by = UNSPECIFIED_OWNER;
      }

      return toReturnToUser;
    },
  ));

  const resultAsObject = {
    results: finalValues,
    highlights,
  };

  CAN_LOG_DEBUG && logger.debug({
    functionName: "getModuleList",
    message: "Done",
  });
  return resultAsObject;
}

export function getItemDefinitionFn(appData: IAppDataType): FGraphQLIdefResolverType {
  return getItemDefinition.bind(null, appData);
}

export function getItemDefinitionListFn(appData: IAppDataType): FGraphQLIdefResolverType {
  return getItemDefinitionList.bind(null, appData);
}

export function getModuleListFn(appData: IAppDataType): FGraphQLModResolverType {
  return getModuleList.bind(null, appData);
}
