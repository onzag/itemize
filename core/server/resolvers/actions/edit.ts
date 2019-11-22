import { IAppDataType } from "../../";
import ItemDefinition, { ItemDefinitionIOActions } from "../../../base/Root/Module/ItemDefinition";
import { IGraphQLIdefResolverArgs, FGraphQLIdefResolverType } from "../../../base/Root/gql";
import Debug from "../../debug";
import {
  checkLanguageAndRegion,
  validateTokenAndGetData,
  checkBasicFieldsAreAvailableForRole,
  buildColumnNames,
  mustBeLoggedIn,
  flattenFieldsFromRequestedFields,
  getDictionary,
  serverSideCheckItemDefinitionAgainst,
  runPolicyCheck,
} from "../basic";
import graphqlFields = require("graphql-fields");
import { RESERVED_BASE_PROPERTIES_SQL, CONNECTOR_SQL_COLUMN_FK_NAME, ITEM_PREFIX } from "../../../constants";
import {
  convertSQLValueToGQLValueForItemDefinition,
  convertGQLValueToSQLValueForItemDefinition,
} from "../../../base/Root/Module/ItemDefinition/sql";
import { convertGQLValueToSQLValueForModule } from "../../../base/Root/Module/sql";
import { GraphQLDataInputError } from "../../../base/errors";
const debug = Debug("resolvers/actions/edit");

export async function editItemDefinition(
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

  // TODO implement whole value check, for both, add and edit,
  // it's safer to do so because w eanyway select the content data
  // here we can manage to request all the fields in a join and then
  // doing a pseudoupdate and checking if it will produce a valid result
  itemDefinition.applyValueFromGQL(resolverArgs.args);
  serverSideCheckItemDefinitionAgainst(itemDefinition, resolverArgs.args);

  debug("Making query to get the owner of this item");

  // first we make the query for the item, which is not blocked
  // in the module name for the given id, as we need to know who created
  // the item in order to validate roles

  let userId: number;
  await runPolicyCheck(
    "edit",
    itemDefinition,
    resolverArgs.args.id,
    tokenData.role,
    resolverArgs.args,
    appData.knex,
    ["created_by", "blocked_at"],
    (contentData: any) => {
      userId = contentData && contentData.created_by;
      // if we don't get an user id this means that there's no owner, this is bad input
      if (!userId) {
        throw new GraphQLDataInputError(`There's no ${selfTable} with id ${resolverArgs.args.id}`);
      }
      if (contentData.blocked_at !== null) {
        throw new GraphQLDataInputError(`The item is blocked`);
      }
    },
  );

  // now we calculate the fields that we are editing, and the fields that we are
  // requesting
  const editingFields = {};
  Object.keys(resolverArgs.args).forEach((arg) => {
    if (
      itemDefinition.hasPropertyDefinitionFor(arg, true) ||
      arg.startsWith(ITEM_PREFIX) && itemDefinition.hasItemFor(arg.replace(ITEM_PREFIX, ""))
    ) {
      editingFields[arg] = resolverArgs.args[arg];
    }
  });
  const requestedFieldsInIdef = {};
  Object.keys(requestedFields).forEach((arg) => {
    if (
      itemDefinition.hasPropertyDefinitionFor(arg, true) ||
      arg.startsWith(ITEM_PREFIX) && itemDefinition.hasItemFor(arg.replace(ITEM_PREFIX, ""))
    ) {
      requestedFieldsInIdef[arg] = requestedFields[arg];
    }
  });

  // checking the role access for both
  debug("Checking role access for editing fields...", editingFields);
  itemDefinition.checkRoleAccessFor(
    ItemDefinitionIOActions.EDIT,
    tokenData.role,
    tokenData.userId,
    userId,
    editingFields,
    true,
  );
  itemDefinition.checkRoleAccessFor(
    ItemDefinitionIOActions.READ,
    tokenData.role,
    tokenData.userId,
    userId,
    requestedFieldsInIdef,
    true,
  );

  // now we build the sql requested fields
  const requestedFieldsSQL = buildColumnNames(requestedFields);

  // TODO validation

  // and we now build both queries for updating
  // we are telling by setting the partialFields variable
  // that we only want the editingFields to be returned
  // into the SQL value, this is valid in here because
  // we don't want things to be defaulted in the query
  const dictionary = getDictionary(appData, resolverArgs.args);
  const sqlIdefData: any = convertGQLValueToSQLValueForItemDefinition(
    itemDefinition,
    resolverArgs.args,
    appData.knex,
    dictionary,
    editingFields,
  );
  const sqlModData: any = convertGQLValueToSQLValueForModule(
    itemDefinition.getParentModule(),
    resolverArgs.args,
    appData.knex,
    dictionary,
    editingFields,
  );

  if (
    Object.keys(sqlIdefData).length === 0 &&
    Object.keys(sqlModData).length === 0
  ) {
    throw new GraphQLDataInputError("You are not updating anything whatsoever");
  }

  // update when it was edited
  sqlModData.edited_at = appData.knex.fn.now();
  sqlModData.edited_by = tokenData.userId;

  // we need to build the "returning" attributes from
  // the updated queries, for that we need to check
  // which ones comes from where
  const requestedModuleColumnsSQL: string[] = [];
  const requestedIdefColumnsSQL: string[] = [];
  requestedFieldsSQL.forEach((columnName) => {
    if (
      RESERVED_BASE_PROPERTIES_SQL[columnName] ||
      mod.hasPropExtensionFor(columnName)
    ) {
      requestedModuleColumnsSQL.push(columnName);
    } else {
      requestedIdefColumnsSQL.push(columnName);
    }
  });

  const value = await appData.knex.transaction(async (transactionKnex) => {
    // and add them if we have them, note that the module will always have
    // something to update because the edited_at field is always added when
    // edition is taking place
    const updateQueryMod = transactionKnex(moduleTable).update(sqlModData).where("id", resolverArgs.args.id);
    if (requestedModuleColumnsSQL.length) {
      updateQueryMod.returning(requestedModuleColumnsSQL);
    }

    // for the update query of the item definition we have to take several things
    // into consideration, first we set it as an empty object
    let updateOrSelectQueryIdef: any = {};
    // if we have something to update
    if (Object.keys(sqlIdefData).length) {
      // we make the update query
      updateOrSelectQueryIdef = transactionKnex(selfTable).update(sqlIdefData).where(
        CONNECTOR_SQL_COLUMN_FK_NAME,
        resolverArgs.args.id,
      );
      // we only get to return something in the returning statment if we have something to return
      if (requestedIdefColumnsSQL.length) {
        updateOrSelectQueryIdef.returning(requestedIdefColumnsSQL);
      }
    // otherwise we check if we are just requesting some fields from the idef
    } else if (requestedIdefColumnsSQL.length) {
      // and make a simple select query
      updateOrSelectQueryIdef = transactionKnex(selfTable).select(requestedIdefColumnsSQL)
        .where(CONNECTOR_SQL_COLUMN_FK_NAME, resolverArgs.args.id);
    }
    // if there's nothing to update, or there is nothing to retrieve, it won't touch the idef table

    // now we run both queries at the same time
    const updateQueryValueMod = await updateQueryMod;
    const updateQueryValueIdef = await updateOrSelectQueryIdef;

    return {
      ...updateQueryValueMod[0],
      ...updateQueryValueIdef[0],
    };
  });

  // convert it using the requested fields for that, and ignoring everything else
  const gqlValue = convertSQLValueToGQLValueForItemDefinition(itemDefinition, value, requestedFields);

  // we don't need to check for blocked or deleted because such items cannot be edited,
  // see before, so we return immediately, read has been checked already
  // we use the same strategy, all extra data will be chopped anyway by graphql
  return {
    DATA: gqlValue,
    ...gqlValue,
  };
}

export function editItemDefinitionFn(appData: IAppDataType): FGraphQLIdefResolverType {
  return editItemDefinition.bind(null, appData);
}
