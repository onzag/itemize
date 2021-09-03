/**
 * This file contains the action for adding for every item definition that
 * is added
 * @module
 */

import { IAppDataType } from "../../";
import { logger } from "../../logger";
import ItemDefinition, { ItemDefinitionIOActions } from "../../../base/Root/Module/ItemDefinition";
import { IGraphQLIdefResolverArgs, FGraphQLIdefResolverType } from "../../../base/Root/gql";
import {
  checkLanguage,
  validateTokenAndGetData,
  getDictionary,
  serverSideCheckItemDefinitionAgainst,
  validateTokenIsntBlocked,
  checkUserExists,
  validateParentingRules,
  runPolicyCheck,
  splitArgsInGraphqlQuery,
  validateContainerIdIsReal,
  defaultTriggerForbiddenFunction,
  defaultTriggerInvalidForbiddenFunction,
} from "../basic";
import graphqlFields from "graphql-fields";
import {
  INCLUDE_PREFIX,
  UNSPECIFIED_OWNER,
  ENDPOINT_ERRORS,
} from "../../../constants";
import {
  convertSQLValueToGQLValueForItemDefinition,
} from "../../../base/Root/Module/ItemDefinition/sql";
import { flattenRawGQLValueOrFields } from "../../../gql-util";
import { ISQLTableRowValue } from "../../../base/Root/sql";
import { EndpointError } from "../../../base/errors";
import { IGQLArgs } from "../../../gql-querier";
import { IOTriggerActions } from "../triggers";
import Root from "../../../base/Root";
import { CustomRoleGranterEnvironment, CustomRoleManager } from "../roles";

// Used to optimize, it is found out that passing unecessary logs to the transport
// can slow the logger down even if it won't display
const LOG_LEVEL = process.env.LOG_LEVEL;
const CAN_LOG_DEBUG = LOG_LEVEL === "debug" || LOG_LEVEL === "silly" || (!LOG_LEVEL && process.env.NODE_ENV !== "production");
const CAN_LOG_SILLY = LOG_LEVEL === "silly";

export async function addItemDefinition(
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

  pooledRoot.setServerFlags(["CREATE", "CREATE_ONLY"]);
  const itemDefinition = pooledRoot.registry[resolverItemDefinition.getQualifiedPathName()] as ItemDefinition;

  CAN_LOG_DEBUG && logger.debug(
    "addItemDefinition: executed adding for " + itemDefinition.getQualifiedPathName(),
  );

  // First we check the language and the region, based on the args
  // as we expect every request to contain this data and be
  // valid for our app
  checkLanguage(appData, resolverArgs.args);
  // now we need to extract the token and get its data, making
  // sure it's a valid token
  const tokenData = await validateTokenAndGetData(appData, resolverArgs.args.token);

  // check that the user is logged in, for adding, only logged users
  // are valid
  await validateTokenIsntBlocked(appData.cache, tokenData);
  const containerId: string = resolverArgs.args.container_id;
  validateContainerIdIsReal(containerId, appData.sensitiveConfig);

  // now we must check if we are parenting
  const isParenting = !!(
    resolverArgs.args.parent_id || resolverArgs.args.parent_type || resolverArgs.args.parent_version
  );

  const ownerId = resolverArgs.args.in_behalf_of || tokenData.id;

  const hasNoVersion = !resolverArgs.args.version;

  const isCustomId: boolean = resolverArgs.args.for_id && hasNoVersion;
  const customId = isCustomId ? resolverArgs.args.for_id : null;

  const rolesManager = new CustomRoleManager(appData.customRoles, {
    cache: appData.cache,
    databaseConnection: appData.databaseConnection,
    rawDB: appData.rawDB,
    value: null,
    item: itemDefinition,
    module: itemDefinition.getParentModule(),
    root: appData.root,
    tokenData: tokenData,
    environment: CustomRoleGranterEnvironment.CREATION,
    owner: ownerId,
    parent: isParenting ? {
      id: resolverArgs.args.parent_id,
      type: resolverArgs.args.parent_type,
      version: resolverArgs.args.parent_version || null,
    } : null,
    customId,
  });

  // if we are specifying a for_id
  if (resolverArgs.args.for_id) {
    if (hasNoVersion) {
      await itemDefinition.checkRoleCanCustomId(tokenData.role, rolesManager, true);
    }

    // we get the unversioned value anyway just in case
    const unversionedValue = await appData.cache.requestValue(
      itemDefinition,
      resolverArgs.args.for_id,
      null,
    );

    // if we have an unversioned value already existing
    // we cannot simply override with add 
    if (unversionedValue && hasNoVersion) {
      throw new EndpointError({
        message: "The value for that id already exists",
        code: ENDPOINT_ERRORS.FORBIDDEN,
      });
    } else if (!unversionedValue && !hasNoVersion) {
      throw new EndpointError({
        message: "Theres no unversioned value for this version creation",
        code: ENDPOINT_ERRORS.FORBIDDEN,
      });
    } else if (unversionedValue && unversionedValue.type !== itemDefinition.getQualifiedPathName()) {
      throw new EndpointError({
        message: "The unversioned version is not of the same type as what is being attempted to create",
        code: ENDPOINT_ERRORS.FORBIDDEN,
      });
    }

    if (!hasNoVersion) {
      await itemDefinition.checkRoleCanVersion(tokenData.role, tokenData.id, unversionedValue.created_by as string, rolesManager, true);
    }
  } else if (resolverArgs.args.version) {
    throw new EndpointError({
      message: "Specifying version without a for_id is not allowed",
      code: ENDPOINT_ERRORS.FORBIDDEN,
    });
  }

  // check the version on whether it's a valid value
  const isValidVersion =
    itemDefinition.isValidVersion(resolverArgs.args.version || null, appData.config.supportedLanguages);
  if (!isValidVersion) {
    throw new EndpointError({
      message: "The provided version " + resolverArgs.args.version + " is deemed invalid",
      code: ENDPOINT_ERRORS.FORBIDDEN,
    });
  }

  // now we see which fields are being requested for the answer after adding, first
  // we flatten the fields, remember that we have external and internal fields
  // contained in the DATA value, we flatten that first
  const requestedFields = flattenRawGQLValueOrFields(graphqlFields(resolverArgs.info));

  // now we extract the fields that we are actually adding to the item
  // definition, that is what is valid for adding and nothing else
  // for that we loop over the arguments, and we only get what is ITEM_
  // or what is included in the item definition, including extensions
  const addingFields = {};
  Object.keys(resolverArgs.args).forEach((arg) => {
    if (
      itemDefinition.hasPropertyDefinitionFor(arg, true) ||
      arg.startsWith(INCLUDE_PREFIX) && itemDefinition.hasIncludeFor(arg.replace(INCLUDE_PREFIX, ""))
    ) {
      addingFields[arg] = resolverArgs.args[arg];
    }
  });

  let finalOwner = tokenData.id || UNSPECIFIED_OWNER;
  if (resolverArgs.args.in_behalf_of) {
    let targetRole: string = null;
    let alreadyCheckedUserExisted = false;
    if (itemDefinition.rawData.createInBehalfTargetRoles && itemDefinition.rawData.createInBehalfTargetRoles.length) {
      const targetUser = await appData.cache.requestValue("MOD_users__IDEF_user", resolverArgs.args.in_behalf_of, null);
      if (!targetUser) {
        throw new EndpointError({
          message: `There's no user to create in behalf of with id ${resolverArgs.args.in_behalf_of}`,
          code: ENDPOINT_ERRORS.UNSPECIFIED,
        });
      }
      alreadyCheckedUserExisted = true;
      targetRole = targetUser.role;
    }
    await itemDefinition.checkRoleCanCreateInBehalf(tokenData.role, targetRole, rolesManager, true);
    finalOwner = resolverArgs.args.in_behalf_of;
    if (!alreadyCheckedUserExisted) {
      await checkUserExists(appData.cache, finalOwner);
    }
  }

  await validateParentingRules(
    appData,
    resolverArgs.args.parent_id,
    resolverArgs.args.parent_version || null,
    resolverArgs.args.parent_type,
    itemDefinition,
    tokenData.id,
    finalOwner,
    tokenData.role,
    rolesManager,
    false,
  );

  CAN_LOG_DEBUG && logger.debug(
    "addItemDefinition: Fields to add have been extracted",
    addingFields,
  );

  CAN_LOG_DEBUG && logger.debug(
    "addItemDefinition: Checking basic role access for creation",
  );

  // now we check the role access for the given
  // create action
  await itemDefinition.checkRoleAccessFor(
    ItemDefinitionIOActions.CREATE,
    tokenData.role,
    tokenData.id,
    finalOwner,
    addingFields,
    rolesManager,
    true,
  );

  // The rule for create and read are different
  // and set appart, one user might have the rule to
  // create something but not to read it, it's weird,
  // but a valid option
  const requestedFieldsThatRepresentPropertiesAndIncludes = {};
  Object.keys(requestedFields).forEach((arg) => {
    if (
      itemDefinition.hasPropertyDefinitionFor(arg, true) ||
      arg.startsWith(INCLUDE_PREFIX) && itemDefinition.hasIncludeFor(arg.replace(INCLUDE_PREFIX, ""))
    ) {
      requestedFieldsThatRepresentPropertiesAndIncludes[arg] = requestedFields[arg];
    }
  });

  CAN_LOG_DEBUG && logger.debug(
    "addItemDefinition: Fields to be requested have been extracted",
    requestedFieldsThatRepresentPropertiesAndIncludes,
  );

  CAN_LOG_DEBUG && logger.debug(
    "addItemDefinition: Checking basic role access for read",
  );

  // if all that has succeed we take the item definition and apply
  // the value from graphql, now you should understand how this is handled
  // the values are applied so that the whole item definition value is
  // fulfilled
  itemDefinition.applyValue(null, null, resolverArgs.args, false, null, false);
  // now we use this function which checks the current value against
  // the value that we have just set, the reason we are sending the args
  // is because we want to ensure that the values that you updated for
  // are the values that are being set, remember rules in item defintions
  // can change the output, and yet keep things valid, so the arg can be invalid
  // if the output is different from it
  await serverSideCheckItemDefinitionAgainst(itemDefinition, resolverArgs.args, null, null);

  if (isParenting) {
    const parentModule = (
      appData.root.registry[resolverArgs.args.parent_type] as ItemDefinition
    ).getParentModule().getQualifiedPathName();
    await runPolicyCheck({
      policyTypes: ["parent"],
      itemDefinition: itemDefinition,
      id: null,
      version: null,
      role: tokenData.role,
      gqlArgValue: resolverArgs.args,
      gqlFlattenedRequestedFiels: requestedFields,
      cache: appData.cache,
      parentModule,
      parentType: resolverArgs.args.parent_type,
      parentId: resolverArgs.args.parent_id,
      parentVersion: resolverArgs.args.parent_version || null,
      preParentValidation: (content: ISQLTableRowValue) => {
        // this shouldn't really happen because validateParentingRules should have
        // checked whether it existed, but we check anyway
        if (!content) {
          CAN_LOG_DEBUG && logger.debug(
            "addItemDefinition: failed due to lack of content data",
          );
          throw new EndpointError({
            message: `There's no parent ${resolverArgs.args.parent_type} with ` +
              `id ${resolverArgs.args.parent_id} and version ${resolverArgs.args.parent_version}`,
            code: ENDPOINT_ERRORS.NOT_FOUND,
          });
        }

        // this should have also not happen because validate should also have done it
        // but we check anyway
        if (content.blocked_at !== null) {
          CAN_LOG_DEBUG && logger.debug(
            "addItemDefinition: failed due to element being blocked",
          );
          throw new EndpointError({
            message: "The parent is blocked",
            code: ENDPOINT_ERRORS.BLOCKED,
          });
        }
      },
    });
  }

  // extract this information
  const mod = itemDefinition.getParentModule();

  // we need to get the dictionary that is used for this specific
  // language, remember, while the API uses a language and region(country)
  // field, the fields can use both language and language region combos
  // so we check via dictionaries
  const dictionary = getDictionary(appData, resolverArgs.args);

  // now we need to setup what we want to convert, since the
  // converting functions can take the whole args with its extra
  // stuff by default it's just the whole args
  let gqlValueToConvert: IGQLArgs = resolverArgs.args;

  // however now we need to check if we have triggers, for that we get
  // the absolute paths
  const pathOfThisIdef = itemDefinition.getAbsolutePath().join("/");
  const pathOfThisModule = mod.getPath().join("/");
  // and extract the triggers from the registry
  const itemDefinitionTrigger = appData.triggers.item.io[pathOfThisIdef]
  const moduleTrigger = appData.triggers.module.io[pathOfThisModule];

  let itemDefinitionSpecificArgs: IGQLArgs = null;
  let extraArgs: IGQLArgs = null;
  // if we got any of them convert
  if (
    itemDefinitionTrigger || moduleTrigger
  ) {
    // we split the args in the graphql query for that which belongs to the
    // item definition and that which is extra
    [itemDefinitionSpecificArgs, extraArgs] = splitArgsInGraphqlQuery(
      itemDefinition,
      resolverArgs.args,
    );
    // so now we just want to convert the values setup here, as done
    // some heavy lifting
    gqlValueToConvert = itemDefinitionSpecificArgs;
    // and if we have a module trigger
    if (moduleTrigger) {
      // we execute the trigger
      const newValueAccordingToModule = await moduleTrigger({
        appData,
        itemDefinition: itemDefinition,
        module: mod,
        originalValue: null,
        originalValueSQL: null,
        originalValueBlocked: null,
        requestedUpdate: gqlValueToConvert,
        requestedUpdateToBlock: false,
        requestedUpdateToUnblock: false,
        newValue: null,
        newValueSQL: null,
        newValueBlocked: null,
        extraArgs,
        action: IOTriggerActions.CREATE,
        id: null,
        version: null,
        user: {
          role: tokenData.role,
          id: tokenData.id,
          customData: tokenData.customData,
        },
        forbid: defaultTriggerForbiddenFunction,
        customId,
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
      const newValueAccordingToIdef = await itemDefinitionTrigger({
        appData,
        itemDefinition: itemDefinition,
        module: mod,
        originalValue: null,
        originalValueSQL: null,
        originalValueBlocked: null,
        requestedUpdate: gqlValueToConvert,
        requestedUpdateToBlock: false,
        requestedUpdateToUnblock: false,
        newValue: null,
        newValueSQL: null,
        newValueBlocked: null,
        extraArgs,
        action: IOTriggerActions.CREATE,
        id: null,
        version: null,
        user: {
          role: tokenData.role,
          id: tokenData.id,
          customData: tokenData.customData,
        },
        forbid: defaultTriggerForbiddenFunction,
        customId,
      });
      // and make it the new value if such trigger was registered
      if (newValueAccordingToIdef) {
        gqlValueToConvert = newValueAccordingToIdef;
      }
    }
  }

  const isNowParenting = !!(
    gqlValueToConvert.parent_id || gqlValueToConvert.parent_type || gqlValueToConvert.parent_version
  );

  // the creation will ensure that the for_id and version
  // are valid and do not create strange data structures
  const value = await appData.cache.requestCreation(
    itemDefinition,
    resolverArgs.args.for_id || null,
    resolverArgs.args.version || null,
    gqlValueToConvert,
    finalOwner,
    dictionary,
    containerId,
    isNowParenting ? {
      id: gqlValueToConvert.parent_id as string,
      version: gqlValueToConvert.parent_version as string,
      type: gqlValueToConvert.parent_type as string,
    } : null,
    resolverArgs.args.listener_uuid || null,
  );

  CAN_LOG_DEBUG && logger.debug(
    "addItemDefinition: SQL ouput retrieved",
  );
  CAN_LOG_SILLY && logger.silly(
    "addItemDefinition: Value is",
    value,
  );

  // now we convert that SQL value to the respective GQL value
  // the reason we pass the requested fields is to filter by the fields
  // that we actually want, not passing this would make the gql value
  // be full (of nulls) our value is incomplete, so we need to
  // pass the requestedFields anyway
  const gqlValue = convertSQLValueToGQLValueForItemDefinition(
    appData.cache.getServerData(),
    itemDefinition,
    value,
  );

  if (
    moduleTrigger
  ) {
    await moduleTrigger({
      appData,
      itemDefinition: itemDefinition,
      module: mod,
      originalValue: null,
      originalValueSQL: null,
      originalValueBlocked: null,
      requestedUpdate: gqlValueToConvert,
      requestedUpdateToBlock: false,
      requestedUpdateToUnblock: false,
      newValue: gqlValue,
      newValueSQL: value,
      newValueBlocked: false,
      extraArgs,
      action: IOTriggerActions.CREATED,
      id: value.id,
      version: value.version,
      user: {
        role: tokenData.role,
        id: tokenData.id,
        customData: tokenData.customData,
      },
      forbid: defaultTriggerInvalidForbiddenFunction,
      customId: null,
    });
  }
  if (itemDefinitionTrigger) {
    await itemDefinitionTrigger({
      appData,
      itemDefinition: itemDefinition,
      module: mod,
      originalValue: null,
      originalValueSQL: null,
      originalValueBlocked: null,
      requestedUpdate: gqlValueToConvert,
      requestedUpdateToBlock: false,
      requestedUpdateToUnblock: false,
      newValue: gqlValue,
      newValueSQL: value,
      newValueBlocked: false,
      extraArgs,
      action: IOTriggerActions.CREATED,
      id: value.id,
      version: value.version,
      user: {
        role: tokenData.role,
        id: tokenData.id,
        customData: tokenData.customData,
      },
      forbid: defaultTriggerInvalidForbiddenFunction,
      customId: null,
    });
  }

  const newRolesManagerWithKnownValue = rolesManager.subEnvironment({
    environment: CustomRoleGranterEnvironment.RETRIEVING,
    value: gqlValue,
    customId: null,
  });

  // so now we check the role access for the reading of
  // those fields, as you can see we use the userId of the user
  // since he will be the owner as well
  await itemDefinition.checkRoleAccessFor(
    ItemDefinitionIOActions.READ,
    tokenData.role,
    tokenData.id,
    finalOwner,
    requestedFieldsThatRepresentPropertiesAndIncludes,
    newRolesManagerWithKnownValue,
    true,
  );

  await itemDefinition.applySoftReadRoleAccessTo(
    tokenData.role,
    tokenData.id,
    finalOwner,
    newRolesManagerWithKnownValue,
    gqlValue,
  );

  const finalOutput = {
    DATA: gqlValue,
    ...gqlValue,
  };

  if (
    !await itemDefinition.checkRoleCanReadOwner(
      tokenData.role,
      tokenData.id,
      (finalOutput as any).DATA.created_by,
      newRolesManagerWithKnownValue,
      false,
    )
  ) {
    if ((finalOutput as any).DATA.created_by === (finalOutput as any).DATA.edited_by) {
      (finalOutput as any).DATA.edited_by = UNSPECIFIED_OWNER;
    }
    (finalOutput as any).DATA.created_by = UNSPECIFIED_OWNER;
  }

  CAN_LOG_DEBUG && logger.debug(
    "addItemDefinition: GQL output calculated",
    finalOutput,
  );

  pooledRoot.cleanState();
  appData.rootPool.release(pooledRoot);

  // items that have just been added cannot be blocked or deleted, hence we just return
  // right away without checking
  return finalOutput;
}

export function addItemDefinitionFn(appData: IAppDataType): FGraphQLIdefResolverType {
  return addItemDefinition.bind(null, appData);
}
