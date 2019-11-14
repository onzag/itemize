import { IAppDataType } from "../../";
import ItemDefinition, { ItemDefinitionIOActions } from "../../../base/Root/Module/ItemDefinition";
import { IGraphQLIdefResolverArgs, FGraphQLIdefResolverType } from "../../../base/Root/gql";
import Debug from "../../debug";
import {
  checkLanguageAndRegion,
  validateTokenAndGetData,
  checkFieldsAreAvailableForRole,
  buildColumnNames,
  mustBeLoggedIn,
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
  checkLanguageAndRegion(resolverArgs.args);
  const tokenData = validateTokenAndGetData(resolverArgs.args.token);

  mustBeLoggedIn(tokenData);

  const requestedFields = graphqlFields(resolverArgs.info);
  checkFieldsAreAvailableForRole(tokenData, requestedFields);

  const mod = itemDefinition.getParentModule();
  const moduleTable = mod.getQualifiedPathName();
  const selfTable = itemDefinition.getQualifiedPathName();

  debug("Making query to get the owner of this item");

  // first we make the query for the item, which is not blocked
  // in the module name for the given id, as we need to know who created
  // the item in order to validate roles
  const id = resolverArgs.args.id;
  const userIdData = await appData.knex.select("created_by").from(moduleTable).where({
    id,
    blocked_at: null,
    type: selfTable,
  });
  const userId = userIdData[0] && userIdData[0].created_by;
  // if we don't get an user id this means that there's no owner, this is bad input
  if (!userId) {
    throw new GraphQLDataInputError(`There's no ${selfTable} with id ${id}`);
  }

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
  const sqlIdefData: any = convertGQLValueToSQLValueForItemDefinition(
    itemDefinition,
    resolverArgs.args,
    appData.knex.raw,
    editingFields,
  );
  const sqlModData: any = convertGQLValueToSQLValueForModule(
    itemDefinition.getParentModule(),
    resolverArgs.args,
    appData.knex.raw,
    editingFields,
  );
  // TODO throw an error if no fields are changing at all
  // update when it was edited
  sqlModData.edited_at = appData.knex.fn.now();

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

  // and add them if we have them, note that the module will always have
  // something to update because the edited_at field is always added when
  // edition is taking place
  const updateQueryMod = appData.knex(moduleTable).update(sqlModData).where("id", id);
  if (requestedModuleColumnsSQL.length) {
    updateQueryMod.returning(requestedModuleColumnsSQL);
  }

  // for the update query of the item definition we have to take several things
  // into consideration, first we set it as an empty object
  let updateOrSelectQueryIdef: any = {};
  // if we have something to update
  if (Object.keys(sqlIdefData).length) {
    // we make the update query
    updateOrSelectQueryIdef = appData.knex(selfTable).update(sqlIdefData).where(CONNECTOR_SQL_COLUMN_FK_NAME, id);
    // we only get to return something in the returning statment if we have something to return
    if (requestedIdefColumnsSQL.length) {
      updateOrSelectQueryIdef.returning(requestedIdefColumnsSQL);
    }
  // otherwise we check if we are just requesting some fields from the idef
  } else if (requestedIdefColumnsSQL.length) {
    // and make a simple select query
    updateOrSelectQueryIdef = appData.knex(selfTable).select(requestedIdefColumnsSQL)
      .where(CONNECTOR_SQL_COLUMN_FK_NAME, id);
  }
  // if there's nothing to update, or there is nothing to retrieve, it won't touch the idef table

  // now we run both queries at the same time
  const [updateQueryValueMod, updateQueryValueIdef] = await Promise.all([
    updateQueryMod,
    updateOrSelectQueryIdef,
  ]);

  // and return the given value
  const value = {
    ...updateQueryValueMod[0],
    ...updateQueryValueIdef[0],
  };

  // convert it using the requested fields for that, and ignoring everything else
  return convertSQLValueToGQLValueForItemDefinition(itemDefinition, value, requestedFields);
}

export function editItemDefinitionFn(appData: IAppDataType): FGraphQLIdefResolverType {
  return editItemDefinition.bind(null, appData);
}
