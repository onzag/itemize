import { IAppDataType, logger } from "../../";
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
import Module from "../../../base/Root/Module";

export async function deleteItemDefinition(
  appData: IAppDataType,
  resolverArgs: IGraphQLIdefResolverArgs,
  itemDefinition: ItemDefinition,
): Promise<any> {
  logger.debug(
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

  logger.debug(
    "deleteItemDefinition: checking policy check for delete",
  );

  // we need to run the policy check for delete,
  // because there might be extra rules for data request
  // for doing a delete, for example, requesting a password
  // confirmation for deleting users, we also need to
  // gather the created_by and blocked_at to check the rights
  // of the user
  let userId: number;
  let contentId: string;
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
      knex: appData.knex,
      // this functions runs before the policy has been checked
      // and we do it for being efficient, because we can run
      // both of these checks with a single SQL query, and the policy
      // checker is built in a way that it demands and expects that
      preValidation: (content: ISQLTableRowValue) => {
        // if there is no userId then the row was null, we throw an error
        if (!content) {
          logger.debug(
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
        contentId = content.content_id;

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
            logger.debug(
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

  // yet now we check the role access, for the action of delete
  // note how we don't pass requested fields, because that's irrelevant
  // for the delete action
  logger.debug(
    "deleteItemDefinition: checking role access for delete",
  );
  itemDefinition.checkRoleAccessFor(
    ItemDefinitionIOActions.DELETE,
    tokenData.role,
    tokenData.id,
    userId,
    null,
    true,
  );

  // however now we need to check if we have triggers, for that we get
  // the absolute paths
  const pathOfThisIdef = itemDefinition.getAbsolutePath().join("/");
  const pathOfThisModule = mod.getPath().join("/");
  // and extract the triggers from the registry
  const itemDefinitionTrigger = appData.triggers.itemDefinition.io[pathOfThisIdef]
  const moduleTrigger = appData.triggers.module.io[pathOfThisModule];

  let currentWholeValueAsGQL: IGQLValue;

  // if we got any of them
  if (
    itemDefinitionTrigger || moduleTrigger
  ) {
    // we need to use the gql stored value for the trigger
    currentWholeValueAsGQL = convertSQLValueToGQLValueForItemDefinition(
      appData.knex,
      appData.cache.getServerData(),
      itemDefinition,
      wholeSqlStoredValue,
    );

    if (moduleTrigger) {
      // we execute the trigger
      await moduleTrigger({
        appData,
        itemDefinition,
        module: mod,
        value: currentWholeValueAsGQL,
        update: null,
        extraArgs: resolverArgs.args,
        action: IOTriggerActions.DELETE,
        id: resolverArgs.args.id as number,
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
        value: currentWholeValueAsGQL,
        update: null,
        extraArgs: resolverArgs.args,
        action: IOTriggerActions.DELETE,
        id: resolverArgs.args.id as number,
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
    contentId,
    resolverArgs.args.listener_uuid || null,
  );

  if (moduleTrigger) {
    // we execute the trigger
    await moduleTrigger({
      appData,
      itemDefinition,
      module: mod,
      value: currentWholeValueAsGQL,
      update: null,
      extraArgs: resolverArgs.args,
      action: IOTriggerActions.DELETED,
      id: resolverArgs.args.id as number,
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
      value: currentWholeValueAsGQL,
      update: null,
      extraArgs: resolverArgs.args,
      action: IOTriggerActions.DELETED,
      id: resolverArgs.args.id as number,
      version: resolverArgs.args.version as string || null,
      user: {
        role: tokenData.role,
        id: tokenData.id,
        customData: tokenData.customData,
      },
      forbid: defaultTriggerInvalidForbiddenFunction,
    });
  }

  // now we run the function to delete possible children of this item definition
  // if it was parented by something in there, such children must be removed
  // this is done to the side nevertheless
  deletePossibleChildrenOf(appData, itemDefinition, resolverArgs.args.id as number, resolverArgs.args.version as string || null);

  logger.debug(
    "deleteItemDefinition: done",
  );

  // return null, yep, the output is always null, because it's gone
  // however we are not running the check on the fields that can be read
  // but anyway there's no usable data, so why would we need a check
  return null;
}

/**
 * This function analyzes an item definition to check for a possible
 * parent and returns true if there's any parent rule within itself, including
 * its children that matches the possible parent
 * @param possibleParent the possible parent
 * @param idef the item definition in question
 * @returns a simple boolean
 */
function analyzeIdef(possibleParent: ItemDefinition, idef: ItemDefinition): boolean {
  const canBeParented = idef.checkCanBeParentedBy(possibleParent, false);
  if (canBeParented) {
    return true;
  }

  return idef.getChildDefinitions().some(analyzeIdef.bind(null, possibleParent));
}

/**
 * This function finds modules for a given module, including its children
 * that do match a possible parent rule
 * @param possibleParent the possible parent
 * @param module the current module to analyze
 * @returns a list of modules
 */
function findModules(possibleParent: ItemDefinition, module: Module): Module[] {
  // first we set up the modules we have collected, nothing yet
  let collectedModules: Module[] = [];
  // now we check if at least one of the item definitions within this module
  // can be set as child of the given possible parent
  const canAtLeastOneIdefBeChildOf = module.getAllChildItemDefinitions().some(analyzeIdef.bind(null, possibleParent));
  // if that's the case we add this same module to the list
  if (canAtLeastOneIdefBeChildOf) {
    collectedModules.push(module);
  }

  // now we need to check the child modules, for that we run this function recursively
  const childModules = module.getAllModules().map(findModules.bind(null, possibleParent)) as Module[];
  // and now we check if we got anything, if we did
  if (childModules.length) {
    // we concat the result
    collectedModules = collectedModules.concat(childModules);
  }

  // and return that
  return collectedModules;
}

/**
 * Deletes all the possible children that might have been set as parent of the deleted
 * item definition value
 * @param appData 
 * @param itemDefinition 
 * @param id 
 * @param version 
 */
async function deletePossibleChildrenOf(
  appData: IAppDataType,
  itemDefinition: ItemDefinition,
  id: number,
  version: string,
) {
  // first we need to find if there is even such a rule and in which modules so we can
  // query the database
  const modulesThatMightBeSetAsChildOf: Module[] =
    appData.root.getAllModules().map(findModules.bind(null, itemDefinition)).flat() as Module[];

  // if such is the case
  if (modulesThatMightBeSetAsChildOf.length) {
    // we get this is our current deleted item qualified name, and it's our parent type
    const idefQualified = itemDefinition.getQualifiedPathName();

    // now we can loop in these modules
    await Promise.all(modulesThatMightBeSetAsChildOf.map(async (mod) => {
      // and ask for results from the module table, where parents do match this
      let results: ISQLTableRowValue[];
      try {
        results = await appData.knex.select(["id", "version", "type", "content_id"]).from(mod.getQualifiedPathName()).where({
          parent_id: id,
          parent_version: version || "",
          parent_type: idefQualified,
        });
      } catch (err) {
        logger.error(
          "deletePossibleChildrenOf (MAYBE-ORPHANED): Failed to attempt to find orphans for deleting",
          {
            errMessage: err.message,
            errStack: err.stack,
            parentItemDefinition: itemDefinition.getQualifiedPathName(),
            parentId: id,
            parentVersion: version,
            moduleChildCheck: mod.getQualifiedPathName(),
          },
        );
        return;
      }

      // if we got results
      if (results.length) {
        // then we need to delete each, one by one
        await Promise.all(results.map(async (r) => {
          // we use the registry to get the proper item definition that represented
          // that module item
          const deleteItemDefinition = appData.root.registry[r.type] as ItemDefinition;
          try {
            // and request a delete on it
            await appData.cache.requestDelete(
              deleteItemDefinition,
              r.id,
              r.version || null,
              false,
              r.content_id,
              null,
            );
          } catch (err) {
            logger.error(
              "deletePossibleChildrenOf (ORPHANED): Failed to delete an orphan",
              {
                errMessage: err.message,
                errStack: err.stack,
                orphanItemDefinition: deleteItemDefinition.getQualifiedPathName(),
                orphanId: r.id,
                orphanVersion: r.version || null,
              },
            );
          }
        }));
      }
    }));
  }
}

export function deleteItemDefinitionFn(appData: IAppDataType): FGraphQLIdefResolverType {
  return deleteItemDefinition.bind(null, appData);
}
