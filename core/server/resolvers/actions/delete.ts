import { IAppDataType } from "../../";
import ItemDefinition, { ItemDefinitionIOActions } from "../../../base/Root/Module/ItemDefinition";
import { IGraphQLIdefResolverArgs, FGraphQLIdefResolverType } from "../../../base/Root/gql";
import Debug from "../../debug";
import {
  checkLanguageAndRegion,
  validateTokenAndGetData,
  checkFieldsAreAvailableForRole,
  mustBeLoggedIn,
} from "../basic";
import graphqlFields = require("graphql-fields");
import { ITEM_PREFIX } from "../../../constants";
import { GraphQLDataInputError } from "../../../base/errors";
import { getItemDefinition } from "./get";
const debug = Debug("resolvers/actions/delete");

export async function deleteItemDefinition(
  appData: IAppDataType,
  resolverArgs: IGraphQLIdefResolverArgs,
  itemDefinition: ItemDefinition,
) {
  checkLanguageAndRegion(resolverArgs.args);
  const tokenData = validateTokenAndGetData(resolverArgs.args.token);

  mustBeLoggedIn(tokenData);

  const requestedFields = graphqlFields(resolverArgs.info);
  checkFieldsAreAvailableForRole(tokenData, requestedFields);

  const mod = itemDefinition.getParentModule();
  const moduleTable = mod.getQualifiedPathName();
  const selfTable = itemDefinition.getQualifiedPathName();

  const id = resolverArgs.args.id;
  const userIdData = await appData.knex.select("created_by").from(moduleTable).where({
    id,
    blocked_at: null,
    type: selfTable,
  });
  const userId = userIdData[0] && userIdData[0].created_by;
  if (!userId) {
    throw new GraphQLDataInputError(`There's no ${selfTable} with id ${id}`);
  }
  itemDefinition.checkRoleAccessFor(
    ItemDefinitionIOActions.DELETE,
    tokenData.role,
    tokenData.userId,
    userId,
    null,
    true,
  );
  const requestedFieldsInIdef = {};
  Object.keys(requestedFields).forEach((arg) => {
    if (
      itemDefinition.hasPropertyDefinitionFor(arg, true) ||
      arg.startsWith(ITEM_PREFIX) && itemDefinition.hasItemFor(arg.replace(ITEM_PREFIX, ""))
    ) {
      requestedFieldsInIdef[arg] = requestedFields[arg];
    }
  });
  itemDefinition.checkRoleAccessFor(
    ItemDefinitionIOActions.READ,
    tokenData.role,
    tokenData.userId,
    userId,
    requestedFields,
    true,
  );

  const value = getItemDefinition(appData, resolverArgs, itemDefinition);

  // It cascades to the item definition
  await appData.knex(itemDefinition.getParentModule().getQualifiedPathName()).where({
    id: resolverArgs.args.id,
    blocked_at: null,
  }).delete();

  return value;
}

export function deleteItemDefinitionFn(appData: IAppDataType): FGraphQLIdefResolverType {
  return deleteItemDefinition.bind(null, appData);
}
