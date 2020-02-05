import { IAppDataType } from "../../";
import ItemDefinition, { ItemDefinitionIOActions } from "../../../base/Root/Module/ItemDefinition";
import { IGraphQLIdefResolverArgs, FGraphQLIdefResolverType } from "../../../base/Root/gql";
import Debug from "debug";
import {
  checkLanguage,
  validateTokenAndGetData,
  checkBasicFieldsAreAvailableForRole,
  runPolicyCheck,
  validateTokenIsntBlocked,
} from "../basic";
import graphqlFields from "graphql-fields";
import { EndpointError } from "../../../base/errors";
import { ROLES_THAT_HAVE_ACCESS_TO_MODERATION_FIELDS, ENDPOINT_ERRORS } from "../../../constants";
import { flattenRawGQLValueOrFields } from "../../../gql-util";
import { deleteEverythingInTransitoryId } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/sql-files";
import { IChangedFeedbackEvent } from "../../../base/remote-protocol";

const debug = Debug("resolvers:deleteItemDefinition");
export async function deleteItemDefinition(
  appData: IAppDataType,
  resolverArgs: IGraphQLIdefResolverArgs,
  itemDefinition: ItemDefinition,
): Promise<any> {
  debug("EXECUTED for %s", itemDefinition.getQualifiedPathName());

  // do the basic things, check the language and region
  // and get the token data
  checkLanguage(appData, resolverArgs.args);
  const tokenData = await validateTokenAndGetData(appData, resolverArgs.args.token);

  // for deleting we must be logged in
  await validateTokenIsntBlocked(appData.cache, tokenData);

  // we flatten and get the requested fields
  const requestedFields = flattenRawGQLValueOrFields(graphqlFields(resolverArgs.info));
  checkBasicFieldsAreAvailableForRole(tokenData, requestedFields);

  // now we get this basic information
  const mod = itemDefinition.getParentModule();
  const moduleTable = mod.getQualifiedPathName();
  const selfTable = itemDefinition.getQualifiedPathName();

  debug("Checking access to the element to delete");

  // we need to run the policy check for delete,
  // because there might be extra rules for data request
  // for doing a delete, for example, requesting a password
  // confirmation for deleting users, we also need to
  // gather the created_by and blocked_at to check the rights
  // of the user
  let userId: number;
  await runPolicyCheck(
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
      preValidation: (content: any) => {
        // if there is no userId then the row was null, we throw an error
        if (!content) {
          debug("FAILED due to lack of content data");
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

        // if the content is blocked, and our role has no special access
        // to moderation fields, then this content cannot be removed
        // from the website, no matter what
        if (
          content.blocked_at !== null &&
          !ROLES_THAT_HAVE_ACCESS_TO_MODERATION_FIELDS.includes(tokenData.role)
        ) {
          debug("FAILED due to blocked content and no moderation access for role %s", tokenData.role);
          throw new EndpointError({
            message: "The item is blocked, only users with role " +
            ROLES_THAT_HAVE_ACCESS_TO_MODERATION_FIELDS.join(",") + " can wipe this data",
            code: ENDPOINT_ERRORS.BLOCKED,
          });
        }
      },
    },
  );

  // yet now we check the role access, for the action of delete
  // note how we don't pass requested fields, because that's irrelevant
  // for the delete action
  debug("Checking role access for delete");
  itemDefinition.checkRoleAccessFor(
    ItemDefinitionIOActions.DELETE,
    tokenData.role,
    tokenData.id,
    userId,
    null,
    true,
  );

  // we run this, not even required to do it as a transaction
  // because the index in the item definition cascades
  // TODO drop all versions
  await appData.knex(moduleTable).delete().where({
    id: resolverArgs.args.id,
    version: resolverArgs.args.version,
    type: selfTable,
  });

  debug("SUCCEED");

  // we don't want to await any of this
  deleteEverythingInTransitoryId(
    itemDefinition,
    resolverArgs.args.id.toString(),
  );
  (async () => {
    await appData.cache.forceCacheInto(selfTable, resolverArgs.args.id, resolverArgs.args.version || null, null);
    const changeEvent: IChangedFeedbackEvent = {
      itemDefinition: selfTable,
      id: resolverArgs.args.id,
      version: resolverArgs.args.version || null,
      type: "not_found",
      lastModified: null,
    };
    appData.listener.triggerListeners(
      changeEvent,
      resolverArgs.args.listener_uuid || null,
    );
  })();

  // return null, yep, the output is always null, because it's gone
  // however we are not running the check on the fields that can be read
  // but anyway there's no usable data, so why would we need a check
  return null;
}

export function deleteItemDefinitionFn(appData: IAppDataType): FGraphQLIdefResolverType {
  return deleteItemDefinition.bind(null, appData);
}
