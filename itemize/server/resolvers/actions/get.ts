import { IAppDataType } from "../../";
import ItemDefinition, { ItemDefinitionIOActions } from "../../../base/Root/Module/ItemDefinition";
import { IGraphQLIdefResolverArgs, FGraphQLIdefResolverType, FGraphQLModResolverType } from "../../../base/Root/gql";
import Debug from "debug";
import {
  checkLanguageAndRegion,
  validateTokenAndGetData,
  checkBasicFieldsAreAvailableForRole,
  flattenFieldsFromRequestedFields,
  filterAndPrepareGQLValue,
  checkListLimit,
  buildColumnNamesForModuleTableOnly,
  buildColumnNamesForItemDefinitionTableOnly,
  validateTokenIsntBlocked,
} from "../basic";
import graphqlFields = require("graphql-fields");
import {
  CONNECTOR_SQL_COLUMN_FK_NAME,
  ITEM_PREFIX,
} from "../../../constants";
import { ISQLTableRowValue } from "../../../base/Root/sql";
import Module from "../../../base/Root/Module";

const getItemDefinitionDebug = Debug("resolvers:getItemDefinition");
export async function getItemDefinition(
  appData: IAppDataType,
  resolverArgs: IGraphQLIdefResolverArgs,
  itemDefinition: ItemDefinition,
) {
  getItemDefinitionDebug(
    "EXECUTED for %s",
    itemDefinition.getQualifiedPathName(),
  );
  // first we check that the language and region provided are
  // right and available
  checkLanguageAndRegion(appData, resolverArgs.args);
  const tokenData = validateTokenAndGetData(resolverArgs.args.token);
  validateTokenIsntBlocked(appData.knex, tokenData);

  // now we find the requested fields that are requested
  // in the get request
  const requestedFields = flattenFieldsFromRequestedFields(graphqlFields(resolverArgs.info));
  checkBasicFieldsAreAvailableForRole(tokenData, requestedFields);

  // get the module, the module table name, the table for
  // the item definition
  const mod = itemDefinition.getParentModule();
  const moduleTable = mod.getQualifiedPathName();
  const selfTable = itemDefinition.getQualifiedPathName();

  // we build the SQL column names
  const requestedModuleColumnsSQL = buildColumnNamesForModuleTableOnly(
    requestedFields,
    mod,
  );
  const requestedIdefColumnsSQL = buildColumnNamesForItemDefinitionTableOnly(
    requestedFields,
    itemDefinition,
  );

  // if we don't include by whom it was created we add it
  if (!requestedModuleColumnsSQL.includes("created_by")) {
    requestedModuleColumnsSQL.push("created_by");
  }
  // the reason we need blocked_at is because filtering
  // is done by the filtering function outside
  if (!requestedModuleColumnsSQL.includes("blocked_at")) {
    requestedModuleColumnsSQL.push("blocked_at");
  }

  getItemDefinitionDebug("Requested columns for idef are %j", requestedIdefColumnsSQL);
  getItemDefinitionDebug("Requested columns for module are %j", requestedModuleColumnsSQL);

  // create the select query, filter the blockage, and select the right
  // type based on it
  const selectQuery = appData.knex.first(
    requestedModuleColumnsSQL.concat(requestedIdefColumnsSQL),
  ).from(moduleTable).where({
    id: resolverArgs.args.id,
    type: selfTable,
  });

  // add the join if it's required
  if (requestedIdefColumnsSQL.length) {
    selectQuery.join(selfTable, (clause) => {
      clause.on(CONNECTOR_SQL_COLUMN_FK_NAME, "=", "id");
    });
  }

  // execute the select query
  const selectQueryValue: ISQLTableRowValue = await selectQuery;

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
  if (!selectQueryValue) {
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
      tokenData.id,
      -1,
      requestedFieldsInIdef,
      true,
    );
    getItemDefinitionDebug("no result founds, returning null");
    return null;
  }
  getItemDefinitionDebug("SQL result found as %j", selectQueryValue);

  getItemDefinitionDebug("Checking role access for read");

  // now we check the role access, this function will throw an error
  // if that fails, and we only check for the requested fields
  itemDefinition.checkRoleAccessFor(
    ItemDefinitionIOActions.READ,
    tokenData.role,
    tokenData.id,
    selectQueryValue.created_by,
    requestedFieldsInIdef,
    true,
  );

  const valueToProvide = filterAndPrepareGQLValue(
    selectQueryValue,
    requestedFields,
    tokenData.role,
    itemDefinition,
  );

  getItemDefinitionDebug("SUCCEED with %j", valueToProvide);
  // return if otherwise succeeds
  return valueToProvide;
}

const getItemDefinitionListDebug = Debug("resolvers:getItemDefinitionList");
export async function getItemDefinitionList(
  appData: IAppDataType,
  resolverArgs: IGraphQLIdefResolverArgs,
  itemDefinition: ItemDefinition,
) {
  getItemDefinitionListDebug(
    "EXECUTED for %s",
    itemDefinition.getQualifiedPathName(),
  );

  // first we check that the language and region provided are
  // right and available
  checkLanguageAndRegion(appData, resolverArgs.args);
  checkListLimit(resolverArgs.args.ids);
  const tokenData = validateTokenAndGetData(resolverArgs.args.token);

  // now we find the requested fields that are requested
  // in the get request
  const requestedFields = flattenFieldsFromRequestedFields(graphqlFields(resolverArgs.info));
  checkBasicFieldsAreAvailableForRole(tokenData, requestedFields);

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
  getItemDefinitionListDebug("Extracted requested fields from idef as %j", requestedFieldsInIdef);
  getItemDefinitionListDebug("Checking global read access");
  itemDefinition.checkRoleAccessFor(
    ItemDefinitionIOActions.READ,
    tokenData.role,
    tokenData.id,
    -1,
    requestedFieldsInIdef,
    true,
  );

  // get the module, the module table name, the table for
  // the item definition
  const mod = itemDefinition.getParentModule();
  const moduleTable = mod.getQualifiedPathName();
  const selfTable = itemDefinition.getQualifiedPathName();

  // we build the SQL column names
  const requestedModuleColumnsSQL = buildColumnNamesForModuleTableOnly(
    requestedFields,
    mod,
  );
  const requestedIdefColumnsSQL = buildColumnNamesForItemDefinitionTableOnly(
    requestedFields,
    itemDefinition,
  );
  // the reason we need blocked_at is because filtering
  // is done by the filtering function outside
  if (!requestedModuleColumnsSQL.includes("blocked_at")) {
    requestedModuleColumnsSQL.push("blocked_at");
  }
  if (!requestedModuleColumnsSQL.includes("id")) {
    requestedModuleColumnsSQL.push("id");
  }

  getItemDefinitionListDebug("Requested columns for idef are %j", requestedIdefColumnsSQL);
  getItemDefinitionListDebug("Requested columns for module are %j", requestedModuleColumnsSQL);

  // create the select query, filter the blockage, and select the right
  // type based on it
  const selectQuery = appData.knex.select(
    requestedModuleColumnsSQL.concat(requestedIdefColumnsSQL),
  ).from(moduleTable).where({
    id: resolverArgs.args.ids,
    type: selfTable,
  });

  // add the join if it's required
  if (requestedIdefColumnsSQL.length) {
    selectQuery.join(selfTable, (clause) => {
      clause.on(CONNECTOR_SQL_COLUMN_FK_NAME, "=", "id");
    });
  }

  // execute the select query
  const selectQueryValue: ISQLTableRowValue[] = await selectQuery;
  const restoredValuesOrder: ISQLTableRowValue[] = resolverArgs.args.ids.map((id: number) => {
    return selectQueryValue.find((row) => row.id === id);
  });

  const finalValues = restoredValuesOrder.map(
    (value) => filterAndPrepareGQLValue(value, requestedFields, tokenData.role, itemDefinition),
  );

  getItemDefinitionListDebug("SUCCEED");

  // return if otherwise succeeds
  return finalValues;
}

const getModuleListDebug = Debug("resolvers:getModuleList");
export async function getModuleList(
  appData: IAppDataType,
  resolverArgs: IGraphQLIdefResolverArgs,
  mod: Module,
) {
  getModuleListDebug(
    "EXECUTED for %s",
    mod.getQualifiedPathName(),
  );
  // first we check that the language and region provided are
  // right and available
  checkLanguageAndRegion(appData, resolverArgs.args);
  checkListLimit(resolverArgs.args.ids);
  const tokenData = validateTokenAndGetData(resolverArgs.args.token);
  validateTokenIsntBlocked(appData.knex, tokenData);

  // now we find the requested fields that are requested
  // in the get request
  const requestedFields = flattenFieldsFromRequestedFields(graphqlFields(resolverArgs.info));
  checkBasicFieldsAreAvailableForRole(tokenData, requestedFields);

  // we get the requested fields that take part of the item definition
  // description
  const requestedFieldsInMod = {};
  Object.keys(requestedFields).forEach((arg) => {
    if (mod.hasPropExtensionFor(arg)) {
      requestedFieldsInMod[arg] = requestedFields[arg];
    }
  });
  getModuleListDebug(
    "Requested fields calculated as %j",
    requestedFieldsInMod,
  );
  getModuleListDebug("Checking global role access for read");
  mod.checkRoleAccessFor(
    ItemDefinitionIOActions.READ,
    tokenData.role,
    tokenData.id,
    -1,
    requestedFieldsInMod,
    true,
  );

  // we build the SQL column names
  const requestedFieldsSQL = buildColumnNamesForModuleTableOnly(
    requestedFields,
    mod,
  );
  // the reason we need blocked_at is because filtering
  // is done by the filtering function outside
  if (!requestedFieldsSQL.includes("blocked_at")) {
    requestedFieldsSQL.push("blocked_at");
  }
  if (!requestedFieldsSQL.includes("id")) {
    requestedFieldsSQL.push("id");
  }

  getItemDefinitionListDebug("Requested columns are %j", requestedFieldsSQL);

  // get the module, the module table name, the table for
  // the item definition
  const moduleTable = mod.getQualifiedPathName();

  // create the select query, filter the blockage, and select the right
  // type based on it
  const selectQuery = appData.knex.select(requestedFieldsSQL).from(moduleTable).where({
    id: resolverArgs.args.ids,
  });

  // execute the select query
  const selectQueryValue: ISQLTableRowValue[] = await selectQuery;
  const restoredValuesOrder: ISQLTableRowValue[] = resolverArgs.args.ids.map((id: number) => {
    return selectQueryValue.find((row) => row.id === id);
  });

  // return if otherwise succeeds
  const finalValues = restoredValuesOrder.map(
    (value) => filterAndPrepareGQLValue(value, requestedFields, tokenData.role, mod),
  );

  getItemDefinitionListDebug("SUCCEED");
  return finalValues;
}

export function getItemDefinitionFn(appData: IAppDataType): FGraphQLIdefResolverType {
  return getItemDefinition.bind(null, appData);
}

export function getItemDefinitionListFn(appData: IAppDataType): FGraphQLIdefResolverType {
  return getItemDefinitionList.bind(null, appData);
}

export function getModuleListFn(appData: IAppDataType): FGraphQLModResolverType {
  return getItemDefinitionList.bind(null, appData);
}
