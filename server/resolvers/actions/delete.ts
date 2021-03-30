import { IAppDataType, } from "../../";
import { logger } from "../../logger";
import ItemDefinition, { ItemDefinitionIOActions } from "../../../base/Root/Module/ItemDefinition";
import { IGraphQLIdefResolverArgs, FGraphQLIdefResolverType } from "../../../base/Root/gql";
import {
  checkLanguage,
  validateTokenAndGetData,
  checkBasicFieldsAreAvailableForRole,
  runPolicyCheck,
  validateTokenIsntBlocked,
  defaultTriggerForbiddenFunction,
  defaultTriggerInvalidForbiddenFunction,
} from "../basic";
import graphqlFields from "graphql-fields";
import { EndpointError } from "../../../base/errors";
import { ENDPOINT_ERRORS, ANYONE_LOGGED_METAROLE, ANYONE_METAROLE,
  GUEST_METAROLE } from "../../../constants";
import { flattenRawGQLValueOrFields } from "../../../gql-util";
import { ISQLTableRowValue } from "../../../base/Root/sql";
import { convertSQLValueToGQLValueForItemDefinition } from "../../../base/Root/Module/ItemDefinition/sql";
import { IOTriggerActions } from "../triggers";
import { IGQLValue } from "../../../gql-querier";
import { CustomRoleGranterEnvironment, CustomRoleManager } from "../roles";

// Used to optimize, it is found out that passing unecessary logs to the transport
// can slow the logger down even if it won't display
const LOG_LEVEL = process.env.LOG_LEVEL;
const CAN_LOG_DEBUG = LOG_LEVEL === "debug" || LOG_LEVEL === "silly" || (!LOG_LEVEL && process.env.NODE_ENV !== "production");

export async function deleteItemDefinition(
  appData: IAppDataType,
  resolverArgs: IGraphQLIdefResolverArgs,
  itemDefinition: ItemDefinition,
): Promise<any> {
  CAN_LOG_DEBUG && logger.debug(
    "deleteItemDefinition: executed delete for " + itemDefinition.getQualifiedPathName(),
  );

  // do the basic things, check the language and region
  // and get the token data
  checkLanguage(appData, resolverArgs.args);
  const tokenData = await validateTokenAndGetData(appData, resolverArgs.args.token);

  // for deleting we must be logged in
  await validateTokenIsntBlocked(appData.cache, tokenData);

  // we flatten and get the requested fields
  const requestedFields = flattenRawGQLValueOrFields(graphqlFields(resolverArgs.info));
  checkBasicFieldsAreAvailableForRole(itemDefinition, tokenData, requestedFields);

  // now we get this basic information
  const mod = itemDefinition.getParentModule();
  const selfTable = itemDefinition.getQualifiedPathName();

  CAN_LOG_DEBUG && logger.debug(
    "deleteItemDefinition: checking policy check for delete",
  );

  // we need to run the policy check for delete,
  // because there might be extra rules for data request
  // for doing a delete, for example, requesting a password
  // confirmation for deleting users, we also need to
  // gather the created_by and blocked_at to check the rights
  // of the user
  let userId: string;
  let containerId: string;
  const wholeSqlStoredValue: ISQLTableRowValue = await runPolicyCheck(
    {
      policyTypes: ["delete"],
      itemDefinition,
      id: resolverArgs.args.id,
      version: resolverArgs.args.version || null,
      role: tokenData.role,
      gqlArgValue: resolverArgs.args,
      gqlFlattenedRequestedFiels: null,
      cache: appData.cache,
      // this functions runs before the policy has been checked
      // and we do it for being efficient, because we can run
      // both of these checks with a single SQL query, and the policy
      // checker is built in a way that it demands and expects that
      preValidation: (content: ISQLTableRowValue) => {
        // if there is no userId then the row was null, we throw an error
        if (!content) {
          CAN_LOG_DEBUG && logger.debug(
            "deleteItemDefinition: failed due to lack of content data",
          );
          throw new EndpointError({
            message: `There's no ${selfTable} with id ${resolverArgs.args.id}`,
            code: ENDPOINT_ERRORS.NOT_FOUND,
          });
        }

        // so now we get the content information, which might
        // be null if nothing was found, so we check too
        userId = content.created_by;
        if (itemDefinition.isOwnerObjectId()) {
          userId = content.id;
        }
        containerId = content.container_id;

        // if the content is blocked, and our role has no special access
        // to moderation fields, then this content cannot be removed
        // from the website, no matter what
        if (
          content.blocked_at !== null
        ) {
          const rolesThatHaveAccessToModerationFields = itemDefinition.getRolesWithModerationAccess();
          const hasAccessToModerationFields = rolesThatHaveAccessToModerationFields.includes(ANYONE_METAROLE) ||
            (rolesThatHaveAccessToModerationFields.includes(ANYONE_LOGGED_METAROLE) && tokenData.role !== GUEST_METAROLE) ||
            rolesThatHaveAccessToModerationFields.includes(tokenData.role);
          if (!hasAccessToModerationFields) {
            CAN_LOG_DEBUG && logger.debug(
              "deleteItemDefinition: failed due to blocked content and no moderation access for role " + tokenData.role,
            );
            throw new EndpointError({
              message: "The item is blocked, only users with role " +
              rolesThatHaveAccessToModerationFields.join(",") + " can wipe this data",
              code: ENDPOINT_ERRORS.BLOCKED,
            });
          }
        }
      },
    },
  );

  const currentWholeValueAsGQL: IGQLValue = convertSQLValueToGQLValueForItemDefinition(
    appData.cache.getServerData(),
    itemDefinition,
    wholeSqlStoredValue,
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
    environment: CustomRoleGranterEnvironment.REMOVAL,
    owner: wholeSqlStoredValue ?
      (itemDefinition.isOwnerObjectId() ? wholeSqlStoredValue.id : wholeSqlStoredValue.created_by) : null,
    parent: wholeSqlStoredValue && wholeSqlStoredValue.parent_id ? {
      id: wholeSqlStoredValue.parent_id,
      type: wholeSqlStoredValue.parent_type,
      version: wholeSqlStoredValue.parent_version,
    } : null,
  });

  // yet now we check the role access, for the action of delete
  // note how we don't pass requested fields, because that's irrelevant
  // for the delete action
  CAN_LOG_DEBUG && logger.debug(
    "deleteItemDefinition: checking role access for delete",
  );
  await itemDefinition.checkRoleAccessFor(
    ItemDefinitionIOActions.DELETE,
    tokenData.role,
    tokenData.id,
    userId,
    null,
    rolesManager,
    true,
  );

  // however now we need to check if we have triggers, for that we get
  // the absolute paths
  const pathOfThisIdef = itemDefinition.getAbsolutePath().join("/");
  const pathOfThisModule = mod.getPath().join("/");
  // and extract the triggers from the registry
  const itemDefinitionTrigger = appData.triggers.item.io[pathOfThisIdef]
  const moduleTrigger = appData.triggers.module.io[pathOfThisModule];
  // if we got any of them
  if (
    itemDefinitionTrigger || moduleTrigger
  ) {
    if (moduleTrigger) {
      // we execute the trigger
      await moduleTrigger({
        appData,
        itemDefinition,
        module: mod,
        originalValue: currentWholeValueAsGQL,
        requestedUpdate: null,
        newValue: null,
        extraArgs: resolverArgs.args,
        action: IOTriggerActions.DELETE,
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
    // same with the item definition
    if (itemDefinitionTrigger) {
      // we call the trigger
      await itemDefinitionTrigger({
        appData,
        itemDefinition,
        module: mod,
        originalValue: currentWholeValueAsGQL,
        requestedUpdate: null,
        newValue: null,
        extraArgs: resolverArgs.args,
        action: IOTriggerActions.DELETE,
        id: resolverArgs.args.id as string,
        version: resolverArgs.args.version as string || null,
        user: {
          role: tokenData.role,
          id: tokenData.id,
          customData: tokenData.customData,
        },
        forbid: defaultTriggerForbiddenFunction,
      });
    }
  }

  await appData.cache.requestDelete(
    itemDefinition,
    resolverArgs.args.id,
    resolverArgs.args.version,
    !resolverArgs.args.version,
    containerId,
    resolverArgs.args.listener_uuid || null,
  );

  if (moduleTrigger) {
    // we execute the trigger
    await moduleTrigger({
      appData,
      itemDefinition,
      module: mod,
      originalValue: currentWholeValueAsGQL,
      requestedUpdate: null,
      newValue: null,
      extraArgs: resolverArgs.args,
      action: IOTriggerActions.DELETED,
      id: resolverArgs.args.id as string,
      version: resolverArgs.args.version as string || null,
      user: {
        role: tokenData.role,
        id: tokenData.id,
        customData: tokenData.customData,
      },
      forbid: defaultTriggerInvalidForbiddenFunction,
    });
  }

  // same with the item definition
  if (itemDefinitionTrigger) {
    // we call the trigger
    await itemDefinitionTrigger({
      appData,
      itemDefinition,
      module: mod,
      originalValue: currentWholeValueAsGQL,
      requestedUpdate: null,
      newValue: null,
      extraArgs: resolverArgs.args,
      action: IOTriggerActions.DELETED,
      id: resolverArgs.args.id as string,
      version: resolverArgs.args.version as string || null,
      user: {
        role: tokenData.role,
        id: tokenData.id,
        customData: tokenData.customData,
      },
      forbid: defaultTriggerInvalidForbiddenFunction,
    });
  }

  CAN_LOG_DEBUG && logger.debug(
    "deleteItemDefinition: done",
  );

  // return null, yep, the output is always null, because it's gone
  // however we are not running the check on the fields that can be read
  // but anyway there's no usable data, so why would we need a check
  return null;
}

export function deleteItemDefinitionFn(appData: IAppDataType): FGraphQLIdefResolverType {
  return deleteItemDefinition.bind(null, appData);
}
