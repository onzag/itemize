import { IAppDataType } from "../../";
import ItemDefinition, { ItemDefinitionIOActions } from "../../../base/Root/Module/ItemDefinition";
import { IGraphQLIdefResolverArgs, FGraphQLIdefResolverType } from "../../../base/Root/gql";
import Debug from "../../debug";
import {
  checkLanguageAndRegion,
  validateTokenAndGetData,
  checkBasicFieldsAreAvailableForRole,
  buildColumnNames,
  flattenFieldsFromRequestedFields,
  filterAndPrepareGQLValue,
} from "../basic";
import graphqlFields = require("graphql-fields");
import {
  RESERVED_BASE_PROPERTIES_SQL,
  CONNECTOR_SQL_COLUMN_FK_NAME,
  ITEM_PREFIX,
} from "../../../constants";
import { ISQLTableRowValue } from "../../../base/Root/sql";
const debug = Debug("resolvers/actions/get");

export async function getItemDefinition(
  appData: IAppDataType,
  resolverArgs: IGraphQLIdefResolverArgs,
  itemDefinition: ItemDefinition,
) {
  // first we check that the language and region provided are
  // right and available
  checkLanguageAndRegion(appData, resolverArgs.args);
  const tokenData = validateTokenAndGetData(resolverArgs.args.token);

  // now we find the requested fields that are requested
  // in the get request
  const requestedFields = flattenFieldsFromRequestedFields(graphqlFields(resolverArgs.info));
  checkBasicFieldsAreAvailableForRole(tokenData, requestedFields);

  // we build the SQL column names
  const requestedFieldsSQL = buildColumnNames(requestedFields);

  // get the module, the module table name, the table for
  // the item definition
  const mod = itemDefinition.getParentModule();
  const moduleTable = mod.getQualifiedPathName();
  const selfTable = itemDefinition.getQualifiedPathName();
  // we check if a join is required if one of the columns we are requesting
  // is not a property or one of the bases from the module, any ITEM_ prefixed
  // property indicates a join is required, and any missing property also does
  const requiresJoin = requestedFieldsSQL.some((columnName) =>
    !RESERVED_BASE_PROPERTIES_SQL[columnName] && !mod.hasPropExtensionFor(columnName));

  debug("queried fields grant a join with idef data?", requiresJoin);

  // if we don't include by whom it was created we add it
  if (!requestedFieldsSQL.includes("created_by")) {
    requestedFieldsSQL.push("created_by");
  }
  if (!requestedFieldsSQL.includes("blocked_at")) {
    requestedFieldsSQL.push("blocked_at");
  }
  if (!requestedFieldsSQL.includes("deleted_at")) {
    requestedFieldsSQL.push("deleted_at");
  }

  // create the select query, filter the blockage, and select the right
  // type based on it
  const selectQuery = appData.knex.select(requestedFieldsSQL).from(moduleTable).where({
    id: resolverArgs.args.id,
    type: selfTable,
  });

  // add the join if it's required
  if (requiresJoin) {
    selectQuery.join(selfTable, (clause) => {
      clause.on(CONNECTOR_SQL_COLUMN_FK_NAME, "=", "id");
    });
  }

  // execute the select query
  const selectQueryValue: ISQLTableRowValue[] = await selectQuery;

  // we get the requested fields that take part of the item definition
  // description
  const requestedFieldsInIdef = {};
  Object.keys(requestedFields).forEach((arg) => {
    if (
      itemDefinition.hasPropertyDefinitionFor(arg, true) ||
      arg.startsWith(ITEM_PREFIX) && itemDefinition.hasItemFor(arg.replace(ITEM_PREFIX, ""))
    ) {
      requestedFieldsInIdef[arg] = requestedFields[arg];
    }
  });

  // if we don't have any result, we cannot even check permissions
  // the thing does not exist, returning null
  if (!selectQueryValue.length) {
    // now there is not much but to run this function
    // as a gimmick, we use -1 as the user id to make
    // some sort of global user, as SELF rules clearly
    // do not apply, we want to throw an error
    // still to the user even though there is no data
    // to protect because the result comes whole thing
    // null, but still, just to keep some consistency we
    // run this function
    itemDefinition.checkRoleAccessFor(
      ItemDefinitionIOActions.READ,
      tokenData.role,
      tokenData.userId,
      -1,
      requestedFieldsInIdef,
      true,
    );
    debug("no result founds, returning null");
    return null;
  }
  debug("SQL result found as", selectQueryValue[0]);

  debug("Checking role access, will throw an error if false");

  // now we check the role access, this function will throw an error
  // if that fails, and we only check for the requested fields
  itemDefinition.checkRoleAccessFor(
    ItemDefinitionIOActions.READ,
    tokenData.role,
    tokenData.userId,
    selectQueryValue[0].created_by,
    requestedFieldsInIdef,
    true,
  );

  const valueToProvide = filterAndPrepareGQLValue(
    selectQueryValue[0],
    requestedFields,
    tokenData.role,
    itemDefinition,
  );

  debug("converted to GQL as", valueToProvide);

  debug("providing value");
  // return if otherwise succeeds
  return valueToProvide;
}

export function getItemDefinitionFn(appData: IAppDataType): FGraphQLIdefResolverType {
  return getItemDefinition.bind(null, appData);
}
