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
  runPolicyCheck,
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
): Promise<any> {
  checkLanguageAndRegion(appData, resolverArgs.args);
  const tokenData = validateTokenAndGetData(resolverArgs.args.token);

  mustBeLoggedIn(tokenData);

  const requestedFields = flattenFieldsFromRequestedFields(graphqlFields(resolverArgs.info));
  checkBasicFieldsAreAvailableForRole(tokenData, requestedFields);

  const mod = itemDefinition.getParentModule();
  const moduleTable = mod.getQualifiedPathName();
  const selfTable = itemDefinition.getQualifiedPathName();

  debug("Checking access to the element to delete");
  let userId: number;
  await runPolicyCheck(
    "delete",
    itemDefinition,
    resolverArgs.args.id,
    tokenData.role,
    resolverArgs.args,
    appData.knex,
    ["created_by", "blocked_at"],
    (contentData: any) => {
      userId = contentData && contentData.created_by;
      if (!userId) {
        throw new GraphQLDataInputError(`There's no ${selfTable} with id ${resolverArgs.args.id}`);
      }
      debug("Retrieved", contentData);
      if (
        contentData.blocked_at !== null &&
        !ROLES_THAT_HAVE_ACCESS_TO_MODERATION_FIELDS.includes(tokenData.role)
      ) {
        throw new GraphQLDataInputError("The item is blocked, only users with role " +
          ROLES_THAT_HAVE_ACCESS_TO_MODERATION_FIELDS.join(",") + " can wipe this data");
      }
    },
  );

  debug("Checking role access...");
  itemDefinition.checkRoleAccessFor(
    ItemDefinitionIOActions.DELETE,
    tokenData.role,
    tokenData.userId,
    userId,
    null,
    true,
  );

  await appData.knex(itemDefinition.getParentModule().getQualifiedPathName()).delete().where({
    id: resolverArgs.args.id,
    type: selfTable,
  });

  debug("returning from the delete");
  return null;
}

export function deleteItemDefinitionFn(appData: IAppDataType): FGraphQLIdefResolverType {
  return deleteItemDefinition.bind(null, appData);
}
