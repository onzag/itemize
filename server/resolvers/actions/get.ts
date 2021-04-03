import { IAppDataType } from "../../";
import { logger } from "../../logger";
import ItemDefinition, { ItemDefinitionIOActions } from "../../../base/Root/Module/ItemDefinition";
import { IGraphQLIdefResolverArgs, FGraphQLIdefResolverType, FGraphQLModResolverType } from "../../../base/Root/gql";
import {
  checkLanguage,
  validateTokenAndGetData,
  checkBasicFieldsAreAvailableForRole,
  filterAndPrepareGQLValue,
  checkLimit,
  validateTokenIsntBlocked,
  checkListTypes,
  runPolicyCheck,
  checkReadPoliciesAllowThisUserToSearch,
  defaultTriggerForbiddenFunction,
} from "../basic";
import graphqlFields from "graphql-fields";
import {
  INCLUDE_PREFIX,
  UNSPECIFIED_OWNER,
  ENDPOINT_ERRORS,
} from "../../../constants";
import { ISQLTableRowValue } from "../../../base/Root/sql";
import Module from "../../../base/Root/Module";
import { flattenRawGQLValueOrFields } from "../../../gql-util";
import { EndpointError } from "../../../base/errors";
import { IGQLSearchRecord } from "../../../gql-querier";
import { IOTriggerActions } from "../triggers";
import { convertSQLValueToGQLValueForItemDefinition } from "../../../base/Root/Module/ItemDefinition/sql";
import { CustomRoleGranterEnvironment, CustomRoleManager } from "../roles";

// Used to optimize, it is found out that passing unecessary logs to the transport
// can slow the logger down even if it won't display
const LOG_LEVEL = process.env.LOG_LEVEL;
const CAN_LOG_DEBUG = LOG_LEVEL === "debug" || LOG_LEVEL === "silly" || (!LOG_LEVEL && process.env.NODE_ENV !== "production");
const CAN_LOG_SILLY = LOG_LEVEL === "silly";

export async function getItemDefinition(
  appData: IAppDataType,
  resolverArgs: IGraphQLIdefResolverArgs,
  itemDefinition: ItemDefinition,
) {
  CAN_LOG_DEBUG && logger.debug(
    "getItemDefinition: executed get for " + itemDefinition.getQualifiedPathName(),
  );
  // first we check that the language and region provided are
  // right and available
  checkLanguage(appData, resolverArgs.args);
  const tokenData = await validateTokenAndGetData(appData, resolverArgs.args.token);
  await validateTokenIsntBlocked(appData.cache, tokenData);

  // now we find the requested fields that are requested
  // in the get request
  const rawFields = graphqlFields(resolverArgs.info);
  const requestedFields = flattenRawGQLValueOrFields(rawFields);
  checkBasicFieldsAreAvailableForRole(itemDefinition, tokenData, requestedFields);

  // so we run the policy check for read, this item definition,
  // with the given id
  const selectQueryValue: ISQLTableRowValue = await runPolicyCheck(
    {
      policyTypes: ["read"],
      itemDefinition,
      id: resolverArgs.args.id,
      version: resolverArgs.args.version || null,
      role: tokenData.role,
      gqlArgValue: resolverArgs.args,
      gqlFlattenedRequestedFiels: requestedFields,
      cache: appData.cache,
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

  const currentWholeValueAsGQL = selectQueryValue ? convertSQLValueToGQLValueForItemDefinition(
    appData.cache.getServerData(),
    itemDefinition,
    selectQueryValue,
  ) : null;

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
    owner: selectQueryValue ? (itemDefinition.isOwnerObjectId() ? selectQueryValue.id : selectQueryValue.created_by) : null,
    parent: selectQueryValue && selectQueryValue.parent_id ? {
      id: selectQueryValue.parent_id,
      type: selectQueryValue.parent_type,
      version: selectQueryValue.parent_version,
    } : null,
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
      "getItemDefinition: no results found returning null",
    );
    // We do not return the 404, just return null in this case
    return null;
  }

  let userId = selectQueryValue.created_by;
  if (itemDefinition.isOwnerObjectId()) {
    userId = selectQueryValue.id;
  }

  CAN_LOG_DEBUG && logger.debug(
    "getItemDefinition: checking role access for read",
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
    "getItemDefinition: SQL ouput retrieved",
  );
  CAN_LOG_SILLY && logger.silly(
    "getItemDefinition: value is",
    selectQueryValue,
  );


  const valueToProvide = filterAndPrepareGQLValue(
    appData.cache.getServerData(),
    selectQueryValue,
    requestedFields,
    tokenData.role,
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
    if (moduleTrigger) {
      await moduleTrigger({
        appData,
        itemDefinition,
        module: mod,
        originalValue: currentWholeValueAsGQL,
        originalValueSQL: selectQueryValue,
        requestedUpdate: null,
        newValue: null,
        newValueSQL: null,
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
      });
    }

    if (itemDefinitionTrigger) {
      await itemDefinitionTrigger({
        appData,
        itemDefinition,
        module: mod,
        originalValue: currentWholeValueAsGQL,
        originalValueSQL: selectQueryValue,
        requestedUpdate: null,
        newValue: null,
        newValueSQL: null,
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
    "getItemDefinition: GQL ouput retrieved",
  );
  CAN_LOG_SILLY && logger.silly(
    "getItemDefinition: value is",
    toReturnToUser,
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
    "getItemDefinitionList: executed get list for " + itemDefinition.getQualifiedPathName(),
  );

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
  const requestedFields = flattenRawGQLValueOrFields(graphqlFields(resolverArgs.info).results);
  checkBasicFieldsAreAvailableForRole(itemDefinition, tokenData, requestedFields);

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

  CAN_LOG_DEBUG && logger.debug(
    "getItemDefinitionList: Extracted requested fields from idef",
    requestedFields,
  );

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

  const resultValues: ISQLTableRowValue[] = await appData.cache.requestListCache(
    resolverArgs.args.records,
  );

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

      const valueToProvide = filterAndPrepareGQLValue(
        appData.cache.getServerData(),
        value,
        requestedFields,
        tokenData.role,
        itemDefinition,
      );

      const pathOfThisModule = mod.getPath().join("/");
      const pathOfThisIdef = itemDefinition.getPath().join("/");
      const moduleTrigger = appData.triggers.module.io[pathOfThisModule];
      const itemDefinitionTrigger = appData.triggers.item.io[pathOfThisIdef];

      CAN_LOG_DEBUG && logger.debug(
        "getItemDefinitionList: checking role access for read",
      );
      const currentWholeValueAsGQL = convertSQLValueToGQLValueForItemDefinition(
        appData.cache.getServerData(),
        itemDefinition,
        value,
      );
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
        owner: itemDefinition.isOwnerObjectId() ? value.id : value.created_by,
        parent: value.parent_id ? {
          id: value.parent_id,
          type: value.parent_type,
          version: value.parent_version,
        } : null,
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

      if (moduleTrigger || itemDefinitionTrigger) {
        if (moduleTrigger) {
          await moduleTrigger({
            appData,
            itemDefinition,
            module: mod,
            originalValue: currentWholeValueAsGQL,
            originalValueSQL: value,
            requestedUpdate: null,
            newValue: null,
            newValueSQL: null,
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
          });
        }

        if (itemDefinitionTrigger) {
          await itemDefinitionTrigger({
            appData,
            itemDefinition,
            module: mod,
            originalValue: currentWholeValueAsGQL,
            originalValueSQL: value,
            requestedUpdate: null,
            newValue: null,
            newValueSQL: null,
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
  };
  CAN_LOG_DEBUG && logger.debug("getItemDefinitionList: done");

  return resultAsObject;
}

export async function getModuleList(
  appData: IAppDataType,
  resolverArgs: IGraphQLIdefResolverArgs,
  mod: Module,
) {
  CAN_LOG_DEBUG && logger.debug(
    "getModuleList: executed get list for " + mod.getQualifiedPathName(),
  );
  // first we check that the language and region provided are
  // right and available
  checkLanguage(appData, resolverArgs.args);
  checkLimit((resolverArgs.args.records as IGQLSearchRecord[]).length, mod, true);
  checkListTypes(resolverArgs.args.records, mod);
  const tokenData = await validateTokenAndGetData(appData, resolverArgs.args.token);
  await validateTokenIsntBlocked(appData.cache, tokenData);

  // now we find the requested fields that are requested
  // in the get request
  const requestedFields = flattenRawGQLValueOrFields(graphqlFields(resolverArgs.info).results);
  checkBasicFieldsAreAvailableForRole(mod, tokenData, requestedFields);

  // we get the requested fields that take part of the item definition
  // description
  const requestedFieldsInMod = {};
  Object.keys(requestedFields).forEach((arg) => {
    if (mod.hasPropExtensionFor(arg)) {
      requestedFieldsInMod[arg] = requestedFields[arg];
    }
  });
  CAN_LOG_DEBUG && logger.debug(
    "getModuleList: Extracted requested fields from idef",
    requestedFieldsInMod,
  );

  const created_by = resolverArgs.args.created_by;
  let ownerToCheckAgainst = UNSPECIFIED_OWNER;
  if (created_by) {
    ownerToCheckAgainst = created_by;
  }

  const resultValues: ISQLTableRowValue[] = await appData.cache.requestListCache(
    resolverArgs.args.records,
  );

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

      const valueToProvide = filterAndPrepareGQLValue(
        appData.cache.getServerData(),
        value,
        requestedFields,
        tokenData.role,
        mod,
      );

      const itemDefinition = appData.root.registry[value.type] as ItemDefinition;
      const pathOfThisModule = mod.getPath().join("/");
      const pathOfThisIdef = itemDefinition.getPath().join("/");
      const moduleTrigger = appData.triggers.module.io[pathOfThisModule];
      const itemDefinitionTrigger = appData.triggers.item.io[pathOfThisIdef];

      const currentWholeValueAsGQL = convertSQLValueToGQLValueForItemDefinition(
        appData.cache.getServerData(),
        itemDefinition,
        value,
      );

      CAN_LOG_DEBUG && logger.debug(
        "getModuleList: checking role access for read",
      );
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
        owner: itemDefinition.isOwnerObjectId() ? value.id : value.created_by,
        parent: value.parent_id ? {
          id: value.parent_id,
          type: value.parent_type,
          version: value.parent_version,
        } : null,
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

      if (moduleTrigger || itemDefinitionTrigger) {
        if (moduleTrigger) {
          await moduleTrigger({
            appData,
            itemDefinition,
            module: mod,
            originalValue: currentWholeValueAsGQL,
            originalValueSQL: value,
            requestedUpdate: null,
            newValue: null,
            newValueSQL: null,
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
          });
        }

        if (itemDefinitionTrigger) {
          await itemDefinitionTrigger({
            appData,
            itemDefinition,
            module: mod,
            originalValue: currentWholeValueAsGQL,
            originalValueSQL: value,
            requestedUpdate: null,
            newValue: null,
            newValueSQL: null,
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
  };

  CAN_LOG_DEBUG && logger.debug("getModuleList: done");
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
