import { IAppDataType } from "../../";
import ItemDefinition, { ItemDefinitionIOActions } from "../../../base/Root/Module/ItemDefinition";
import { IGraphQLIdefResolverArgs, FGraphQLIdefResolverType, FGraphQLModResolverType } from "../../../base/Root/gql";
import Debug from "debug";
import {
  checkLanguage,
  validateTokenAndGetData,
  checkBasicFieldsAreAvailableForRole,
  filterAndPrepareGQLValue,
  checkListLimit,
  validateTokenIsntBlocked,
  checkListTypes,
} from "../basic";
import graphqlFields = require("graphql-fields");
import {
  ITEM_PREFIX,
  UNSPECIFIED_OWNER,
} from "../../../constants";
import { ISQLTableRowValue } from "../../../base/Root/sql";
import Module from "../../../base/Root/Module";
import { flattenRawGQLValueOrFields } from "../../../gql-util";

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
  checkLanguage(appData, resolverArgs.args);
  const tokenData = await validateTokenAndGetData(appData, resolverArgs.args.token);
  await validateTokenIsntBlocked(appData.knex, appData.cache, tokenData);

  // now we find the requested fields that are requested
  // in the get request
  const rawFields = graphqlFields(resolverArgs.info);
  const requestedFields = flattenRawGQLValueOrFields(rawFields);
  checkBasicFieldsAreAvailableForRole(tokenData, requestedFields);

  // get the module, the module table name, the table for
  // the item definition
  const mod = itemDefinition.getParentModule();
  const moduleTable = mod.getQualifiedPathName();
  const selfTable = itemDefinition.getQualifiedPathName();

  const selectQueryValue: ISQLTableRowValue =
    await appData.cache.requestCache(selfTable, moduleTable, resolverArgs.args.id);

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
      UNSPECIFIED_OWNER,
      requestedFieldsInIdef,
      true,
    );
    getItemDefinitionDebug("no result founds, returning null");
    // We do not return the 404, just return null in this case
    return null;
  }
  getItemDefinitionDebug("SQL result found as %j", selectQueryValue);

  getItemDefinitionDebug("Checking role access for read");

  let userId = selectQueryValue.created_by;
  if (itemDefinition.isOwnerObjectId()) {
    userId = selectQueryValue.id;
  }

  // now we check the role access, this function will throw an error
  // if that fails, and we only check for the requested fields
  itemDefinition.checkRoleAccessFor(
    ItemDefinitionIOActions.READ,
    tokenData.role,
    tokenData.id,
    userId,
    requestedFieldsInIdef,
    true,
  );

  const valueToProvide = filterAndPrepareGQLValue(
    selectQueryValue,
    requestedFields,
    tokenData.role,
    itemDefinition,
  );

  getItemDefinitionDebug("SUCCEED with %j", valueToProvide.toReturnToUser);
  // return if otherwise succeeds
  return valueToProvide.toReturnToUser;
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
  checkLanguage(appData, resolverArgs.args);
  checkListLimit(resolverArgs.args.ids);
  const mod = itemDefinition.getParentModule();
  checkListTypes(resolverArgs.args.ids, mod);
  const tokenData = await validateTokenAndGetData(appData, resolverArgs.args.token);

  // now we find the requested fields that are requested
  // in the get request
  const requestedFields = flattenRawGQLValueOrFields(graphqlFields(resolverArgs.info));
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
    UNSPECIFIED_OWNER,
    requestedFieldsInIdef,
    true,
  );

  // get the module, the module table name, the table for
  // the item definition
  const moduleTable = mod.getQualifiedPathName();
  const resultValues: ISQLTableRowValue[] = await this.appData.cache.requestListCache(
    moduleTable,
    resolverArgs.args.ids,
  );

  const finalValues = resultValues.map(
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
  checkLanguage(appData, resolverArgs.args);
  checkListLimit(resolverArgs.args.ids);
  checkListTypes(resolverArgs.args.ids, mod);
  const tokenData = await validateTokenAndGetData(appData, resolverArgs.args.token);
  await validateTokenIsntBlocked(appData.knex, appData.cache, tokenData);

  // now we find the requested fields that are requested
  // in the get request
  const requestedFields = flattenRawGQLValueOrFields(graphqlFields(resolverArgs.info));
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
    UNSPECIFIED_OWNER,
    requestedFieldsInMod,
    true,
  );

  const moduleTable = mod.getQualifiedPathName();
  const resultValues: ISQLTableRowValue[] = await this.appData.cache.requestListCache(
    moduleTable,
    resolverArgs.args.ids,
  );

  // return if otherwise succeeds
  const finalValues = resultValues.map(
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
