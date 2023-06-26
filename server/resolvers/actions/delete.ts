import { IAppDataType, } from "../../";
import { logger } from "../../logger";
import ItemDefinition, { ItemDefinitionIOActions } from "../../../base/Root/Module/ItemDefinition";
import { IGraphQLIdefResolverArgs, FGraphQLIdefResolverType } from "../../../base/Root/gql";
import {
  checkLanguage,
  validateTokenAndGetData,
  runPolicyCheck,
  validateTokenIsntBlocked,
  defaultTriggerForbiddenFunction,
  defaultTriggerInvalidForbiddenFunction,
  getDictionary,
} from "../basic";
import { EndpointError } from "../../../base/errors";
import {
  ENDPOINT_ERRORS, ANYONE_LOGGED_METAROLE, ANYONE_METAROLE,
  GUEST_METAROLE,
  OWNER_METAROLE
} from "../../../constants";
import { ISQLTableRowValue } from "../../../base/Root/sql";
import { convertSQLValueToGQLValueForItemDefinition } from "../../../base/Root/Module/ItemDefinition/sql";
import { IOTriggerActions } from "../triggers";
import { IGQLValue } from "../../../gql-querier";
import { CustomRoleGranterEnvironment, CustomRoleManager } from "../roles";
import { CAN_LOG_DEBUG } from "../../environment";

function noop() { };

export async function deleteItemDefinition(
  appData: IAppDataType,
  resolverArgs: IGraphQLIdefResolverArgs,
  itemDefinition: ItemDefinition,
): Promise<any> {
  CAN_LOG_DEBUG && logger.debug(
    {
      functionName: "deleteItemDefinition",
      message: "Executed delete for " + itemDefinition.getQualifiedPathName(),
    },
  );

  // do the basic things, check the language and region
  // and get the token data
  checkLanguage(appData, resolverArgs.args);
  const tokenData = await validateTokenAndGetData(appData, resolverArgs.args.token);

  // for deleting we must be logged in
  await validateTokenIsntBlocked(appData.cache, tokenData);

  // now we get this basic information
  const mod = itemDefinition.getParentModule();
  const selfTable = itemDefinition.getQualifiedPathName();

  CAN_LOG_DEBUG && logger.debug(
    {
      functionName: "deleteItemDefinition",
      message: "Checking policy check for delete",
    },
  );

  let currentWholeValueAsGQL: IGQLValue;
  let rolesManager: CustomRoleManager;

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
      userId: tokenData.id,
      gqlArgValue: resolverArgs.args,
      gqlFlattenedRequestedFiels: null,
      appData,
      rolesManager: (sqlValue: ISQLTableRowValue) => {
        const ownerUserId = sqlValue ? (itemDefinition.isOwnerObjectId() ? sqlValue.id : sqlValue.created_by) : null;
        currentWholeValueAsGQL = convertSQLValueToGQLValueForItemDefinition(
          appData.cache.getServerData(),
          appData,
          itemDefinition,
          sqlValue,
        );
        rolesManager = new CustomRoleManager(appData.customRoles, {
          cache: appData.cache,
          databaseConnection: appData.databaseConnection,
          rawDB: appData.rawDB,
          value: currentWholeValueAsGQL,
          item: itemDefinition,
          module: itemDefinition.getParentModule(),
          root: appData.root,
          tokenData: tokenData,
          environment: CustomRoleGranterEnvironment.REMOVAL,
          requestArgs: resolverArgs.args,
          owner: ownerUserId,
          parent: sqlValue && sqlValue.parent_id ? {
            id: sqlValue.parent_id,
            type: sqlValue.parent_type,
            version: sqlValue.parent_version,
          } : null,
          customId: null,
        });
        return rolesManager;
      },
      // this functions runs before the policy has been checked
      // and we do it for being efficient, because we can run
      // both of these checks with a single SQL query, and the policy
      // checker is built in a way that it demands and expects that
      preValidation: (content: ISQLTableRowValue) => {
        // if there is no userId then the row was null, we throw an error
        if (!content) {
          CAN_LOG_DEBUG && logger.debug(
            {
              functionName: "deleteItemDefinition",
              message: "Failed due to lack of content data",
            },
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
          const rolesThatHaveAccessToModeration = itemDefinition.getRolesWithModerationAccess();
          const hasAccessToModerationFields = rolesThatHaveAccessToModeration.includes(ANYONE_METAROLE) ||
            (rolesThatHaveAccessToModeration.includes(ANYONE_LOGGED_METAROLE) && tokenData.role !== GUEST_METAROLE) ||
            (rolesThatHaveAccessToModeration.includes(OWNER_METAROLE) && tokenData.id === userId) ||
            rolesThatHaveAccessToModeration.includes(tokenData.role);
          if (!hasAccessToModerationFields) {
            CAN_LOG_DEBUG && logger.debug(
              {
                functionName: "deleteItemDefinition",
                message: "Failed due to blocked content and no moderation access for role " + tokenData.role,
              },
            );
            throw new EndpointError({
              message: "The item is blocked, only users with role " +
                rolesThatHaveAccessToModeration.join(",") + " can wipe this data",
              code: ENDPOINT_ERRORS.BLOCKED,
            });
          }
        }
      },
    },
  );

  // yet now we check the role access, for the action of delete
  // note how we don't pass requested fields, because that's irrelevant
  // for the delete action
  CAN_LOG_DEBUG && logger.debug(
    {
      functionName: "deleteItemDefinition",
      message: "Checking role access for delete",
    },
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

  let dictionary: string;

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
    dictionary = getDictionary(appData, resolverArgs.args);
    if (moduleTrigger) {
      // we execute the trigger
      await moduleTrigger({
        language: resolverArgs.args.language,
        dictionary,
        appData,
        itemDefinition,
        module: mod,
        originalValue: currentWholeValueAsGQL,
        originalValueSQL: wholeSqlStoredValue,
        originalValueBlocked: !!wholeSqlStoredValue.blocked_at,
        requestedUpdate: null,
        requestedUpdateToBlock: false,
        requestedUpdateToUnblock: false,
        requestedUpdateCreatedBy: null,
        requestedUpdateParent: null,
        newValue: null,
        newValueSQL: null,
        newValueBlocked: null,
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
        customId: null,
        setForId: noop,
        setVersion: noop,
      });
    }
    // same with the item definition
    if (itemDefinitionTrigger) {
      // we call the trigger
      await itemDefinitionTrigger({
        language: resolverArgs.args.language,
        dictionary,
        appData,
        itemDefinition,
        module: mod,
        originalValue: currentWholeValueAsGQL,
        originalValueSQL: wholeSqlStoredValue,
        originalValueBlocked: !!wholeSqlStoredValue.blocked_at,
        requestedUpdate: null,
        requestedUpdateToBlock: false,
        requestedUpdateToUnblock: false,
        requestedUpdateCreatedBy: null,
        requestedUpdateParent: null,
        newValue: null,
        newValueSQL: null,
        newValueBlocked: null,
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
        customId: null,
        setForId: noop,
        setVersion: noop,
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
    const args = {
      language: resolverArgs.args.language,
      dictionary,
      appData,
      itemDefinition,
      module: mod,
      originalValue: currentWholeValueAsGQL,
      originalValueSQL: wholeSqlStoredValue,
      originalValueBlocked: !!wholeSqlStoredValue.blocked_at,
      requestedUpdate: null as any,
      requestedUpdateToBlock: false,
      requestedUpdateToUnblock: false,
      requestedUpdateCreatedBy: null as string,
      requestedUpdateParent: null as any,
      newValue: null as any,
      newValueSQL: null as any,
      newValueBlocked: null as any,
      extraArgs: resolverArgs.args,
      action: IOTriggerActions.DELETED_SYNC,
      id: resolverArgs.args.id as string,
      version: resolverArgs.args.version as string || null,
      user: {
        role: tokenData.role,
        id: tokenData.id,
        customData: tokenData.customData,
      },
      forbid: defaultTriggerInvalidForbiddenFunction,
      customId: null as string,
      setForId: noop,
      setVersion: noop,
    };
    // we execute the trigger
    await moduleTrigger(args);

    (async () => {
      try {
        const detachedArgs = { ...args };
        detachedArgs.action = IOTriggerActions.DELETED;
        await moduleTrigger(detachedArgs);
      } catch (err) {
        logger.error(
          {
            functionName: "deleteItemDefinition",
            message: "Could not execute the DELETED module trigger",
            serious: true,
            err,
          },
        );
      }
    })();
  }

  // same with the item definition
  if (itemDefinitionTrigger) {
    const args = {
      language: resolverArgs.args.language,
      dictionary,
      appData,
      itemDefinition,
      module: mod,
      originalValue: currentWholeValueAsGQL,
      originalValueSQL: wholeSqlStoredValue,
      originalValueBlocked: !!wholeSqlStoredValue.blocked_at,
      requestedUpdate: null as any,
      requestedUpdateToBlock: false,
      requestedUpdateToUnblock: false,
      requestedUpdateCreatedBy: null as string,
      requestedUpdateParent: null as any,
      newValue: null as any,
      newValueSQL: null as any,
      newValueBlocked: null as any,
      extraArgs: resolverArgs.args,
      action: IOTriggerActions.DELETED_SYNC,
      id: resolverArgs.args.id as string,
      version: resolverArgs.args.version as string || null,
      user: {
        role: tokenData.role,
        id: tokenData.id,
        customData: tokenData.customData,
      },
      forbid: defaultTriggerInvalidForbiddenFunction,
      customId: null as string,
      setForId: noop,
      setVersion: noop,
    };
    // we call the trigger
    await itemDefinitionTrigger(args);

    (async () => {
      try {
        const detachedArgs = { ...args };
        detachedArgs.action = IOTriggerActions.DELETED;
        await itemDefinitionTrigger(detachedArgs);
      } catch (err) {
        logger.error(
          {
            functionName: "deleteItemDefinition",
            message: "Could not execute the DELETED item trigger",
            serious: true,
            err,
          },
        );
      }
    })();
  }

  CAN_LOG_DEBUG && logger.debug(
    {
      functionName: "deleteItemDefinition",
      message: "Done",
    },
  );

  // return null, yep, the output is always null, because it's gone
  // however we are not running the check on the fields that can be read
  // but anyway there's no usable data, so why would we need a check
  return null;
}

export function deleteItemDefinitionFn(appData: IAppDataType): FGraphQLIdefResolverType {
  return deleteItemDefinition.bind(null, appData);
}
