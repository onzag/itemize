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
  handleConflictError,
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
import { EndpointError, EndpointErrorType } from "../../../base/errors";
import { flattenRawGQLValueOrFields } from "../../../gql-util";
import { ISQLTableRowValue } from "../../../base/Root/sql";
import { IGQLArgs, IGQLValue } from "../../../gql-querier";
import { IOTriggerActions } from "../triggers";
import Root from "../../../base/Root";
import { CustomRoleGranterEnvironment, CustomRoleManager } from "../roles";
import { CAN_LOG_DEBUG } from "../../environment";

function noop() { }

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
      {
        functionName: "editItemDefinition",
        message: "Failed to retrieve root from the pool",
        serious: true,
        err,
      },
    );
    throw new EndpointError({
      message: "Failed to retrieve root from the pool",
      code: ENDPOINT_ERRORS.INTERNAL_SERVER_ERROR,
    });
  }

  try {
    pooledRoot.setServerFlags(["EDIT", "EDIT_ONLY"]);
    const itemDefinition = pooledRoot.registry[resolverItemDefinition.getQualifiedPathName()] as ItemDefinition;

    CAN_LOG_DEBUG && logger.debug(
      {
        functionName: "editItemDefinition",
        message: "Executed edit for " + itemDefinition.getQualifiedPathName(),
      },
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
      {
        functionName: "editItemDefinition",
        message: "Retrieving actual owner of this item",
      },
    );

    let currentWholeValueAsGQL: IGQLValue;
    let rolesManager: CustomRoleManager;
    let ownerUserId: string;

    // so we run the policy check for edit, this item definition,
    // with the given id
    const wholeSqlStoredValue: ISQLTableRowValue = await runPolicyCheck(
      {
        policyTypes: ["edit", "read"],
        itemDefinition,
        id: resolverArgs.args.id,
        version: resolverArgs.args.version,
        role: tokenData.role,
        userId: tokenData.id,
        gqlArgValue: resolverArgs.args,
        gqlFlattenedRequestedFiels: requestedFields,
        appData,
        rolesManager: (sqlValue: ISQLTableRowValue) => {
          // Now that the policies have been checked, and that we get the value of the entire item
          // definition, we need to convert that value to GQL value, and for that we use the converter
          // note how we don't pass the requested fields because we want it all
          currentWholeValueAsGQL = convertSQLValueToGQLValueForItemDefinition(
            appData.cache.getServerData(),
            appData,
            itemDefinition,
            sqlValue,
          );

          ownerUserId = itemDefinition.isOwnerObjectId() ? sqlValue.id : sqlValue.created_by;
          rolesManager = new CustomRoleManager(appData.customRoles, {
            cache: appData.cache,
            databaseConnection: appData.databaseConnection,
            rawDB: appData.rawDB,
            value: currentWholeValueAsGQL,
            item: itemDefinition,
            module: itemDefinition.getParentModule(),
            root: appData.root,
            tokenData: tokenData,
            user: tokenData,
            environment: CustomRoleGranterEnvironment.MODIFYING,
            requestArgs: resolverArgs.args,
            owner: ownerUserId,
            parent: sqlValue.parent_id ? {
              id: sqlValue.parent_id,
              type: sqlValue.parent_type,
              version: sqlValue.parent_version,
            } : null,
            customId: null,
            environmentParent: null,
            id: resolverArgs.args.id,
            version: resolverArgs.args.version || null,
          });
          return rolesManager;
        },
        preValidation: async (content: ISQLTableRowValue) => {
          // if we don't get an user id this means that there's no owner, this is bad input
          if (!content) {
            CAN_LOG_DEBUG && logger.debug(
              {
                functionName: "editItemDefinition",
                message: "Failed due to lack of content data",
              },
            );
            throw new EndpointError({
              message: `There's no ${selfTable} with id ${resolverArgs.args.id} and version ${resolverArgs.args.version}`,
              code: ENDPOINT_ERRORS.NOT_FOUND,
            });
          }

          // also throw an error if it's blocked
          if (content.blocked_at !== null) {
            CAN_LOG_DEBUG && logger.debug(
              {
                functionName: "editItemDefinition",
                message: "Failed due to element being blocked",
              },
            );
            throw new EndpointError({
              message: "The item is blocked",
              code: ENDPOINT_ERRORS.BLOCKED,
            });
          }

          if (resolverArgs.args.if_last_modified && content.last_modified !== resolverArgs.args.if_last_modified) {
            CAN_LOG_DEBUG && logger.debug(
              {
                functionName: "editItemDefinition",
                message: "Failed due to element failing last modified check",
              },
            );

            const err: EndpointErrorType = {
              message: "The item conflicts with its last modification date",
              code: ENDPOINT_ERRORS.CONFLICT,
            };

            // now we need to find the triggers path
            // that due to a bug in typescript apparently this believes
            // its going to be initialized, so I have to do it again
            // here
            const pathOfThisIdef = itemDefinition.getAbsolutePath().join("/");
            const pathOfThisModule = mod.getPath().join("/");

            const shouldProceedAndOverwrite = await handleConflictError(
              pathOfThisIdef,
              pathOfThisModule,
              appData,
              err,
              content,
            );

            if (!shouldProceedAndOverwrite) {
              throw new EndpointError(err);
            }
          }
        },
      },
    );

    const knownParent = await validateParentingRules(
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

    const requestedFieldsInIdef = {};
    Object.keys(requestedFields).forEach((arg) => {
      if (
        itemDefinition.hasPropertyDefinitionFor(arg, true) ||
        arg.startsWith(INCLUDE_PREFIX) && itemDefinition.hasIncludeFor(arg.replace(INCLUDE_PREFIX, ""))
      ) {
        requestedFieldsInIdef[arg] = requestedFields[arg];
      }
    });

    CAN_LOG_DEBUG && logger.debug({
      functionName: "editItemDefinition",
      message: "Checking role access for editing",
    });
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
    const triggerCache = {};
    const modTriggerCache = {};

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
          language: resolverArgs.args.language,
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
            value: knownParent,
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
          setForId: noop,
          setVersion: noop,
          triggerCache: modTriggerCache,
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
          language: resolverArgs.args.language,
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
            value: knownParent,
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
          setForId: noop,
          setVersion: noop,
          triggerCache,
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
      {
        currentGQLValue: currentWholeValueAsGQL,
        currentSQLValue: wholeSqlStoredValue,
        editedBy: tokenData.id,
        language: resolverArgs.args.language,
        dictionary,
        containerId: wholeSqlStoredValue.container_id as string,
        listenerUUID: resolverArgs.args.listener_uuid || null,
        reparent: isReparenting ? {
          id: gqlValueToConvert.parent_id as string,
          version: gqlValueToConvert.parent_version as string,
          type: gqlValueToConvert.parent_type as string,
        } : null,
        blocking: (isToUnblock || isToBlock) ? {
          reason: resolverArgs.args.blocked_reason,
          status: resolverArgs.args.blocked,
          until: resolverArgs.args.blocked_until,
        } : null,
        indexing: resolverArgs.args.indexing || "detached",
      },
    );

    CAN_LOG_DEBUG && logger.debug(
      {
        functionName: "editItemDefinition",
        message: "SQL ouput retrieved",
      },
    );

    // convert it using the requested fields for that, and ignoring everything else
    const gqlValue = convertSQLValueToGQLValueForItemDefinition(
      appData.cache.getServerData(),
      appData,
      itemDefinition,
      sqlValue,
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
        requestedUpdate: gqlValueToConvert,
        requestedUpdateToBlock: isToBlock,
        requestedUpdateToUnblock: isToUnblock,
        requestedUpdateCreatedBy: null as string,
        requestedUpdateParent: isReparenting ? {
          id: gqlValueToConvert.parent_id as string,
          version: gqlValueToConvert.parent_version as string,
          type: gqlValueToConvert.parent_type as string,
          value: knownParent,
        } : null,
        newValue: gqlValue,
        newValueSQL: sqlValue,
        newValueBlocked: !!sqlValue.blocked_at,
        extraArgs,
        action: IOTriggerActions.EDITED_SYNC,
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
        triggerCache: modTriggerCache,
      };
      // we execute the trigger
      await moduleTrigger(args);

      (async () => {
        try {
          const detachedArgs = { ...args };
          detachedArgs.action = IOTriggerActions.EDITED;
          await moduleTrigger(detachedArgs);
        } catch (err) {
          logger.error(
            {
              functionName: "editItemDefinition",
              message: "Could not execute the EDITED module trigger",
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
        requestedUpdate: gqlValueToConvert,
        requestedUpdateToBlock: isToBlock,
        requestedUpdateToUnblock: isToUnblock,
        requestedUpdateCreatedBy: null as string,
        requestedUpdateParent: isReparenting ? {
          id: gqlValueToConvert.parent_id as string,
          version: gqlValueToConvert.parent_version as string,
          type: gqlValueToConvert.parent_type as string,
          value: knownParent,
        } : null,
        newValue: gqlValue,
        newValueSQL: sqlValue,
        newValueBlocked: !!sqlValue.blocked_at,
        extraArgs,
        action: IOTriggerActions.EDITED_SYNC,
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
        triggerCache,
      };
      // we call the trigger
      await itemDefinitionTrigger(args);

      (async () => {
        try {
          const detachedArgs = { ...args };
          detachedArgs.action = IOTriggerActions.EDITED;
          await itemDefinitionTrigger(detachedArgs);
        } catch (err) {
          logger.error(
            {
              functionName: "editItemDefinition",
              message: "Could not execute the EDITED item trigger",
              serious: true,
              err,
            },
          );
        }
      })();
    }

    const newRolesManagerWithEditedValue = rolesManager.subEnvironment({
      environment: CustomRoleGranterEnvironment.RETRIEVING,
      value: gqlValue,
      customId: null,
    });

    CAN_LOG_DEBUG && logger.debug({
      functionName: "editItemDefinition",
      message: "Checking role access for read",
    });
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
      {
        functionName: "editItemDefinition",
        message: "GQL ouput retrieved",
      },
    );

    pooledRoot.cleanState();
    appData.rootPool.release(pooledRoot);

    return finalOutput;
  } catch (err) {
    pooledRoot.cleanState();
    appData.rootPool.release(pooledRoot);
    throw err;
  }
}

export function editItemDefinitionFn(appData: IAppDataType): FGraphQLIdefResolverType {
  return editItemDefinition.bind(null, appData);
}
