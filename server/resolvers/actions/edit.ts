import { IAppDataType } from "../../";
import { logger } from "../../logger";
import ItemDefinition, { ItemDefinitionIOActions } from "../../../base/Root/Module/ItemDefinition";
import { IGraphQLIdefResolverArgs, FGraphQLIdefResolverType } from "../../../base/Root/gql";
import {
  checkLanguage,
  validateTokenAndGetData,
  getDictionary,
  serverSideCheckItemDefinitionAgainst,
  runPolicyCheck,
  validateTokenIsntBlocked,
  splitArgsInGraphqlQuery,
  defaultTriggerForbiddenFunction,
  defaultTriggerInvalidForbiddenFunction,
  validateParentingRules,
} from "../basic";
import {
  INCLUDE_PREFIX,
  EXCLUSION_STATE_SUFFIX,
  ENDPOINT_ERRORS,
  UNSPECIFIED_OWNER,
} from "../../../constants";
import {
  convertSQLValueToGQLValueForItemDefinition,
} from "../../../base/Root/Module/ItemDefinition/sql";
import { EndpointError } from "../../../base/errors";
import { flattenRawGQLValueOrFields } from "../../../gql-util";
import { ISQLTableRowValue } from "../../../base/Root/sql";
import { IGQLArgs } from "../../../gql-querier";
import { IOTriggerActions } from "../triggers";
import Root from "../../../base/Root";
import { CustomRoleGranterEnvironment, CustomRoleManager } from "../roles";

// Used to optimize, it is found out that passing unecessary logs to the transport
// can slow the logger down even if it won't display
const LOG_LEVEL = process.env.LOG_LEVEL;
const CAN_LOG_DEBUG = LOG_LEVEL === "debug" || LOG_LEVEL === "silly" || (!LOG_LEVEL && process.env.NODE_ENV !== "production");
const CAN_LOG_SILLY = LOG_LEVEL === "silly";

export async function editItemDefinition(
  appData: IAppDataType,
  resolverArgs: IGraphQLIdefResolverArgs,
  resolverItemDefinition: ItemDefinition,
) {
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

  pooledRoot.setServerFlags(["EDIT", "EDIT_ONLY"]);
  const itemDefinition = pooledRoot.registry[resolverItemDefinition.getQualifiedPathName()] as ItemDefinition;

  CAN_LOG_DEBUG && logger.debug(
    "editItemDefinition: executed edit for " + itemDefinition.getQualifiedPathName(),
  );

  // First we check the language and region of the item
  checkLanguage(appData, resolverArgs.args);
  // we ge the token data
  const tokenData = await validateTokenAndGetData(appData, resolverArgs.args.token);

  // for editing one must be logged in
  await validateTokenIsntBlocked(appData.cache, tokenData);

  // now we get the requested fields, and check they are available for the given role
  const requestedFields = flattenRawGQLValueOrFields(resolverArgs.fields);

  // now we get the basic information
  const mod = itemDefinition.getParentModule();
  const selfTable = itemDefinition.getQualifiedPathName();

  CAN_LOG_DEBUG && logger.debug(
    "editItemDefinition: retrieving actual owner of this item",
  );

  // so we run the policy check for edit, this item definition,
  // with the given id
  const wholeSqlStoredValue: ISQLTableRowValue = await runPolicyCheck(
    {
      policyTypes: ["edit", "read"],
      itemDefinition,
      id: resolverArgs.args.id,
      version: resolverArgs.args.version,
      role: tokenData.role,
      gqlArgValue: resolverArgs.args,
      gqlFlattenedRequestedFiels: requestedFields,
      cache: appData.cache,
      preValidation: (content: ISQLTableRowValue) => {
        // if we don't get an user id this means that there's no owner, this is bad input
        if (!content) {
          CAN_LOG_DEBUG && logger.debug(
            "editItemDefinition: failed due to lack of content data",
          );
          throw new EndpointError({
            message: `There's no ${selfTable} with id ${resolverArgs.args.id} and version ${resolverArgs.args.version}`,
            code: ENDPOINT_ERRORS.NOT_FOUND,
          });
        }

        // also throw an error if it's blocked
        if (content.blocked_at !== null) {
          CAN_LOG_DEBUG && logger.debug(
            "editItemDefinition: failed due to element being blocked",
          );
          throw new EndpointError({
            message: "The item is blocked",
            code: ENDPOINT_ERRORS.BLOCKED,
          });
        }
      },
    },
  );

  // Now that the policies have been checked, and that we get the value of the entire item
  // definition, we need to convert that value to GQL value, and for that we use the converter
  // note how we don't pass the requested fields because we want it all
  const currentWholeValueAsGQL = convertSQLValueToGQLValueForItemDefinition(
    appData.cache.getServerData(),
    itemDefinition,
    wholeSqlStoredValue,
  );

  const ownerUserId = itemDefinition.isOwnerObjectId() ? wholeSqlStoredValue.id : wholeSqlStoredValue.created_by;
  const rolesManager = new CustomRoleManager(appData.customRoles, {
    cache: appData.cache,
    databaseConnection: appData.databaseConnection,
    rawDB: appData.rawDB,
    value: currentWholeValueAsGQL,
    item: itemDefinition,
    module: itemDefinition.getParentModule(),
    root: appData.root,
    tokenData: tokenData,
    environment: CustomRoleGranterEnvironment.MODIFYING,
    requestArgs: resolverArgs.args,
    owner: ownerUserId,
    parent: wholeSqlStoredValue.parent_id ? {
      id: wholeSqlStoredValue.parent_id,
      type: wholeSqlStoredValue.parent_type,
      version: wholeSqlStoredValue.parent_version,
    } : null,
    customId: null,
  });

  await validateParentingRules(
    appData,
    resolverArgs.args.parent_id,
    resolverArgs.args.parent_version || null,
    resolverArgs.args.parent_type,
    itemDefinition,
    tokenData.id,
    tokenData.id,
    tokenData.role,
    rolesManager,
    true,
  );

  const isToBlock = resolverArgs.args.blocked === true;
  const isToUnblock = resolverArgs.args.blocked === false;

  if (isToBlock || isToUnblock) {
    itemDefinition.checkRoleAccessForModeration(
      tokenData.role, tokenData.id, ownerUserId, rolesManager, false,
    );

    if (resolverArgs.args.blocked_reason && resolverArgs.args.blocked_reason.length > 128) {
      throw new EndpointError({
        message: "Blocked reason is too long",
        code: ENDPOINT_ERRORS.FORBIDDEN,
      });
    }
  }

  // and now basically we create a new value that is the combination or both, where our new
  // values take precedence, yes there will be pollution, with token, id, and whatnot, but that
  // doesn't matter because the apply function ignores those
  const expectedUpdatedValue = {
    ...currentWholeValueAsGQL,
    ...resolverArgs.args,
  };

  // and as so we apply the value from graphql
  itemDefinition.applyValue(
    resolverArgs.args.id,
    resolverArgs.args.version || null,
    expectedUpdatedValue,
    false,
    null,
    false,
  );
  // and then we check with the entire full value, we want to ensure no changes occurred
  // and that the updated value will be exactly the result and it will be valid
  await serverSideCheckItemDefinitionAgainst(
    itemDefinition,
    resolverArgs.args,
    resolverArgs.args.id,
    resolverArgs.args.version || null,
  );
  itemDefinition.cleanValueFor(
    resolverArgs.args.id,
    resolverArgs.args.version || null,
  );

  // now we calculate the fields that we are editing, and the fields that we are
  // requesting
  const editingFields = {};
  Object.keys(resolverArgs.args).map(async (arg) => {
    if (
      itemDefinition.hasPropertyDefinitionFor(arg, true) ||
      (
        arg.startsWith(INCLUDE_PREFIX) &&
        itemDefinition.hasIncludeFor(arg.replace(INCLUDE_PREFIX, "").replace(EXCLUSION_STATE_SUFFIX, ""))
      )
    ) {
      editingFields[arg] = resolverArgs.args[arg];
    }
  });

  CAN_LOG_DEBUG && logger.debug(
    "editItemDefinition: Fields to be edited from the idef have been extracted as",
    editingFields,
  );
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
    "editItemDefinition: Fields to be requested from the idef have been extracted as",
    requestedFieldsInIdef,
  );

  CAN_LOG_DEBUG && logger.debug("editItemDefinition: Checking role access for editing");
  // checking the role access for both
  await itemDefinition.checkRoleAccessFor(
    ItemDefinitionIOActions.EDIT,
    tokenData.role,
    tokenData.id,
    ownerUserId,
    editingFields,
    rolesManager,
    true,
  );

  // now we need to setup what we want to convert, since the
  // converting functions can take the whole args with its extra
  // stuff by default it's just the whole args
  let gqlValueToConvert: IGQLArgs = resolverArgs.args;

  // now we need to find the triggers
  const pathOfThisIdef = itemDefinition.getAbsolutePath().join("/");
  const pathOfThisModule = mod.getPath().join("/");
  // and extract the triggers from the registry
  const itemDefinitionTrigger = appData.triggers.item.io[pathOfThisIdef]
  const moduleTrigger = appData.triggers.module.io[pathOfThisModule];

  const dictionary = getDictionary(appData, resolverArgs.args);

  let extraArgs: IGQLArgs;

  // if we got any of them
  if (
    itemDefinitionTrigger || moduleTrigger
  ) {
    // we split the args in the graphql query for that which belongs to the
    // item definition and that which is extra
    const [itemDefinitionSpecificArgs, extraArgsFromSplit] = splitArgsInGraphqlQuery(
      itemDefinition,
      resolverArgs.args,
    );
    extraArgs = extraArgsFromSplit;

    // so now we just want to convert the values setup here, as done
    // some heavy lifting
    gqlValueToConvert = itemDefinitionSpecificArgs;
    // and if we have a module trigger
    if (moduleTrigger) {
      // we execute the trigger
      const isReparenting = !!(
        gqlValueToConvert.parent_id || gqlValueToConvert.parent_type || gqlValueToConvert.parent_version
      );
      const newValueAccordingToModule = await moduleTrigger({
        dictionary,
        appData,
        itemDefinition,
        module: mod,
        originalValue: currentWholeValueAsGQL,
        originalValueSQL: wholeSqlStoredValue,
        originalValueBlocked: !!wholeSqlStoredValue.blocked_at,
        requestedUpdate: gqlValueToConvert,
        requestedUpdateToBlock: isToBlock,
        requestedUpdateToUnblock: isToUnblock,
        requestedUpdateParent: isReparenting ? {
          id: resolverArgs.args.parent_id as string,
          version: resolverArgs.args.parent_version as string,
          type: resolverArgs.args.parent_type as string,
        } : null,
        requestedUpdateCreatedBy: null,
        newValue: null,
        newValueSQL: null,
        newValueBlocked: null,
        extraArgs,
        action: IOTriggerActions.EDIT,
        id: resolverArgs.args.id as string,
        version: resolverArgs.args.version as string || null,
        user: {
          role: tokenData.role,
          id: tokenData.id,
          customData: tokenData.customData,
        },
        forbid: defaultTriggerForbiddenFunction,
        customId: null,
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
      const isReparenting = !!(
        gqlValueToConvert.parent_id || gqlValueToConvert.parent_type || gqlValueToConvert.parent_version
      );
      const newValueAccordingToIdef = await itemDefinitionTrigger({
        dictionary,
        appData,
        itemDefinition,
        module: mod,
        originalValue: currentWholeValueAsGQL,
        originalValueSQL: wholeSqlStoredValue,
        originalValueBlocked: !!wholeSqlStoredValue.blocked_at,
        requestedUpdate: gqlValueToConvert,
        requestedUpdateToBlock: isToBlock,
        requestedUpdateToUnblock: isToUnblock,
        requestedUpdateParent: isReparenting ? {
          id: resolverArgs.args.parent_id as string,
          version: resolverArgs.args.parent_version as string,
          type: resolverArgs.args.parent_type as string,
        } : null,
        requestedUpdateCreatedBy: null,
        newValue: null,
        newValueSQL: null,
        newValueBlocked: null,
        extraArgs,
        action: IOTriggerActions.EDIT,
        id: resolverArgs.args.id as string,
        version: resolverArgs.args.version as string || null,
        user: {
          role: tokenData.role,
          id: tokenData.id,
          customData: tokenData.customData,
        },
        forbid: defaultTriggerForbiddenFunction,
        customId: null,
      });
      // and make it the new value if such trigger was registered
      if (newValueAccordingToIdef) {
        gqlValueToConvert = newValueAccordingToIdef;
      }
    }
  }

  const isReparenting = !!(
    gqlValueToConvert.parent_id || gqlValueToConvert.parent_type || gqlValueToConvert.parent_version
  );

  const sqlValue = await appData.cache.requestUpdate(
    itemDefinition,
    resolverArgs.args.id,
    resolverArgs.args.version || null,
    gqlValueToConvert,
    wholeSqlStoredValue,
    currentWholeValueAsGQL,
    tokenData.id,
    dictionary,
    wholeSqlStoredValue.container_id as string,
    resolverArgs.args.listener_uuid || null,
    isReparenting ? {
      id: gqlValueToConvert.parent_id as string,
      version: gqlValueToConvert.parent_version as string,
      type: gqlValueToConvert.parent_type as string,
    } : null,
    (isToUnblock || isToBlock) ? {
      reason: resolverArgs.args.blocked_reason,
      status: resolverArgs.args.blocked,
      until: resolverArgs.args.blocked_until,
    } : null,
  );

  CAN_LOG_DEBUG && logger.debug(
    "editItemDefinition: SQL ouput retrieved",
  );
  CAN_LOG_SILLY && logger.silly(
    "editItemDefinition: Value is",
    sqlValue,
  );

  // convert it using the requested fields for that, and ignoring everything else
  const gqlValue = convertSQLValueToGQLValueForItemDefinition(
    appData.cache.getServerData(),
    itemDefinition,
    sqlValue,
  );

  if (moduleTrigger) {
    // we execute the trigger
    await moduleTrigger({
      dictionary,
      appData,
      itemDefinition,
      module: mod,
      originalValue: currentWholeValueAsGQL,
      originalValueSQL: wholeSqlStoredValue,
      originalValueBlocked: !!wholeSqlStoredValue.blocked_at,
      requestedUpdate: gqlValueToConvert,
      requestedUpdateToBlock: isToBlock,
      requestedUpdateToUnblock: isToUnblock,
      requestedUpdateCreatedBy: null,
      requestedUpdateParent: isReparenting ? {
        id: gqlValueToConvert.parent_id as string,
        version: gqlValueToConvert.parent_version as string,
        type: gqlValueToConvert.parent_type as string,
      } : null,
      newValue: gqlValue,
      newValueSQL: sqlValue,
      newValueBlocked: !!sqlValue.blocked_at,
      extraArgs,
      action: IOTriggerActions.EDITED,
      id: resolverArgs.args.id as string,
      version: resolverArgs.args.version as string || null,
      user: {
        role: tokenData.role,
        id: tokenData.id,
        customData: tokenData.customData,
      },
      forbid: defaultTriggerInvalidForbiddenFunction,
      customId: null,
    });
  }
  // same with the item definition
  if (itemDefinitionTrigger) {
    // we call the trigger
    await itemDefinitionTrigger({
      dictionary,
      appData,
      itemDefinition,
      module: mod,
      originalValue: currentWholeValueAsGQL,
      originalValueSQL: wholeSqlStoredValue,
      originalValueBlocked: !!wholeSqlStoredValue.blocked_at,
      requestedUpdate: gqlValueToConvert,
      requestedUpdateToBlock: isToBlock,
      requestedUpdateToUnblock: isToUnblock,
      requestedUpdateCreatedBy: null,
      requestedUpdateParent: isReparenting ? {
        id: gqlValueToConvert.parent_id as string,
        version: gqlValueToConvert.parent_version as string,
        type: gqlValueToConvert.parent_type as string,
      } : null,
      newValue: gqlValue,
      newValueSQL: sqlValue,
      newValueBlocked: !!sqlValue.blocked_at,
      extraArgs,
      action: IOTriggerActions.EDITED,
      id: resolverArgs.args.id as string,
      version: resolverArgs.args.version as string || null,
      user: {
        role: tokenData.role,
        id: tokenData.id,
        customData: tokenData.customData,
      },
      forbid: defaultTriggerInvalidForbiddenFunction,
      customId: null,
    });
  }

  const newRolesManagerWithEditedValue = rolesManager.subEnvironment({
    environment: CustomRoleGranterEnvironment.RETRIEVING,
    value: gqlValue,
  });

  CAN_LOG_DEBUG && logger.debug("editItemDefinition: Checking role access for read");
  await itemDefinition.checkRoleAccessFor(
    ItemDefinitionIOActions.READ,
    tokenData.role,
    tokenData.id,
    ownerUserId,
    requestedFieldsInIdef,
    newRolesManagerWithEditedValue,
    true,
  );

  await itemDefinition.applySoftReadRoleAccessTo(
    tokenData.role,
    tokenData.id,
    ownerUserId,
    newRolesManagerWithEditedValue,
    gqlValue,
  );

  // we don't need to check for blocked or deleted because such items cannot be edited,
  // see before, so we return immediately, read has been checked already
  // we use the same strategy, all extra data will be chopped anyway by graphql
  const finalOutput = {
    DATA: gqlValue,
    ...gqlValue,
  };

  if (
    !await
      itemDefinition.checkRoleCanReadOwner(
        tokenData.role,
        tokenData.id,
        (finalOutput as any).DATA.created_by,
        newRolesManagerWithEditedValue,
        false,
      )
  ) {
    if ((finalOutput as any).DATA.created_by === (finalOutput as any).DATA.edited_by) {
      (finalOutput as any).DATA.edited_by = UNSPECIFIED_OWNER;
    }
    (finalOutput as any).DATA.created_by = UNSPECIFIED_OWNER;
  }

  CAN_LOG_DEBUG && logger.debug(
    "editItemDefinition: GQL ouput retrieved",
  );
  CAN_LOG_SILLY && logger.silly(
    "editItemDefinition: value is",
    finalOutput,
  );

  pooledRoot.cleanState();
  appData.rootPool.release(pooledRoot);

  return finalOutput;
}

export function editItemDefinitionFn(appData: IAppDataType): FGraphQLIdefResolverType {
  return editItemDefinition.bind(null, appData);
}
