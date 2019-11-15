import { IAppDataType } from "../../";
import ItemDefinition, { ItemDefinitionIOActions } from "../../../base/Root/Module/ItemDefinition";
import { IGraphQLIdefResolverArgs, FGraphQLIdefResolverType } from "../../../base/Root/gql";
import Debug from "../../debug";
import {
  checkLanguageAndRegion,
  validateTokenAndGetData,
  checkBasicFieldsAreAvailableForRole,
  mustBeLoggedIn,
  flattenFieldsFromRequestedFields,
} from "../basic";
import graphqlFields = require("graphql-fields");
import { GraphQLDataInputError } from "../../../base/errors";
import { getItemDefinition } from "./get";
import { ROLES_THAT_HAVE_ACCESS_TO_MODERATION_FIELDS } from "../../../constants";
const debug = Debug("resolvers/actions/delete");

export async function deleteItemDefinition(
  appData: IAppDataType,
  resolverArgs: IGraphQLIdefResolverArgs,
  itemDefinition: ItemDefinition,
) {
  checkLanguageAndRegion(appData, resolverArgs.args);
  const tokenData = validateTokenAndGetData(resolverArgs.args.token);

  mustBeLoggedIn(tokenData);

  const requestedFields = flattenFieldsFromRequestedFields(graphqlFields(resolverArgs.info));
  checkBasicFieldsAreAvailableForRole(tokenData, requestedFields);

  const mod = itemDefinition.getParentModule();
  const moduleTable = mod.getQualifiedPathName();
  const selfTable = itemDefinition.getQualifiedPathName();

  debug("Checking access to the element to delete");
  const id = resolverArgs.args.id;
  const contentData = await appData.knex.select("created_by", "deleted_at", "blocked_at").from(moduleTable).where({
    id,
    type: selfTable,
  });
  const userId = contentData[0] && contentData[0].created_by;
  if (!userId) {
    throw new GraphQLDataInputError(`There's no ${selfTable} with id ${id}`);
  }
  debug("Retrieved", contentData[0]);
  if (contentData[0].deleted_at !== null) {
    throw new GraphQLDataInputError("The item has been deleted already");
  }
  if (
    contentData[0].blocked_at !== null &&
    !ROLES_THAT_HAVE_ACCESS_TO_MODERATION_FIELDS.includes(tokenData.role)
  ) {
    throw new GraphQLDataInputError("The item is blocked, only users with role " +
      ROLES_THAT_HAVE_ACCESS_TO_MODERATION_FIELDS.join(",") + " can wipe this data");
  }

  debug("Checking role access...");
  itemDefinition.checkRoleAccessFor(
    ItemDefinitionIOActions.DELETE,
    tokenData.role,
    tokenData.userId,
    userId,
    null,
    true,
  );

  // So we run a soft delete, the reason for this is that searchs might be active
  // that are going to match this element for paginating users, we have to keep the
  // consistency for that point in time, the point in time is marked by SEARCH_REQUESTS_LIFE_IN_MS
  // the item will still match searches done before delete but its data will not
  // be accessible by anyone, the item will be deleted once the life has ellapsed
  // when a search is over SEARCH_REQUESTS_LIFE_IN_MS old, it will be invalid, hence
  // the rows data can be deleted, but do not delete the row itself, only the data
  // we still have to keep consistency of old rows
  await appData.knex(itemDefinition.getParentModule().getQualifiedPathName()).update({
    deleted_at: appData.knex.fn.now(),
    deleted_by: tokenData.userId,
  }).where({
    id: resolverArgs.args.id,
  });

  // TODO we should use the update query for this, but not yet, because this is a soft delete
  debug("calling get query from the get...");
  const value = await getItemDefinition(appData, resolverArgs, itemDefinition);

  debug("returning from the delete");
  return value;
}

export function deleteItemDefinitionFn(appData: IAppDataType): FGraphQLIdefResolverType {
  return deleteItemDefinition.bind(null, appData);
}
