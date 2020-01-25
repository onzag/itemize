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
  runPolicyCheck,
  checkReadPoliciesAllowThisUserToSearch,
} from "../basic";
import graphqlFields from "graphql-fields";
import {
  INCLUDE_PREFIX,
  UNSPECIFIED_OWNER,
} from "../../../constants";
import { ISQLTableRowValue } from "../../../base/Root/sql";
import Module from "../../../base/Root/Module";
import { flattenRawGQLValueOrFields } from "../../../gql-util";
import { EndpointError } from "../../../base/errors";
import { IGQLSearchResultIdentifierType } from "./search";

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
  await validateTokenIsntBlocked(appData.cache, tokenData);

  // now we find the requested fields that are requested
  // in the get request
  const rawFields = graphqlFields(resolverArgs.info);
  const requestedFields = flattenRawGQLValueOrFields(rawFields);
  checkBasicFieldsAreAvailableForRole(tokenData, requestedFields);

  // so we run the policy check for read, this item definition,
  // with the given id
  const selectQueryValue: ISQLTableRowValue = await runPolicyCheck(
    {
      policyTypes: ["read"],
      itemDefinition,
      id: resolverArgs.args.id,
      role: tokenData.role,
      gqlArgValue: resolverArgs.args,
      gqlFlattenedRequestedFiels: requestedFields,
      cache: appData.cache,
      preValidation: (content: ISQLTableRowValue) => {
        // if there is no content, we force the entire policy check not to
        // be performed and return null
        if (!content) {
          return null;
        }
      },
    },
  );

  // we get the requested fields that take part of the item definition
  // description
  const requestedFieldsInIdef = {};
  Object.keys(requestedFields).forEach((arg) => {
    if (
      itemDefinition.hasPropertyDefinitionFor(arg, true) ||
      arg.startsWith(INCLUDE_PREFIX) && itemDefinition.hasIncludeFor(arg.replace(INCLUDE_PREFIX, ""))
    ) {
      requestedFieldsInIdef[arg] = requestedFields[arg];
    }
  });

  // if we don't have any result, we cannot even check permissions
  // the thing does not exist, returning null
  if (!selectQueryValue) {
    // now there is not much but to run this function
    // as a gimmick, we use -1 as the user id to make
    // some sort of global user, as OWNER rules clearly
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
  checkReadPoliciesAllowThisUserToSearch(
    itemDefinition,
    tokenData.role,
  );

  // now we find the requested fields that are requested
  // in the get request
  const requestedFields = flattenRawGQLValueOrFields(graphqlFields(resolverArgs.info).results);
  checkBasicFieldsAreAvailableForRole(tokenData, requestedFields);

  // we get the requested fields that take part of the item definition
  // description
  const requestedFieldsInIdef = {};
  Object.keys(requestedFields).forEach((arg) => {
    if (
      itemDefinition.hasPropertyDefinitionFor(arg, true) ||
      arg.startsWith(INCLUDE_PREFIX) && itemDefinition.hasIncludeFor(arg.replace(INCLUDE_PREFIX, ""))
    ) {
      requestedFieldsInIdef[arg] = requestedFields[arg];
    }
  });
  getItemDefinitionListDebug("Extracted requested fields from idef as %j", requestedFieldsInIdef);

  const created_by = resolverArgs.args.created_by;
  let ownerToCheckAgainst = UNSPECIFIED_OWNER;
  if (created_by) {
    ownerToCheckAgainst = created_by;
  }

  itemDefinition.checkRoleAccessFor(
    ItemDefinitionIOActions.READ,
    tokenData.role,
    tokenData.id,
    ownerToCheckAgainst,
    requestedFieldsInIdef,
    true,
  );

  // preventing a security leak here by ensuring that the type that we are searching
  // in the list is all consistent for the type of this item definition, when requesting
  // the cache and the query that will be used as a table name, as the type is the same
  // as the qualified path name and the table name, so by ensuring it's a legit name
  // we ensure there is no leak
  const selfTableType = itemDefinition.getQualifiedPathName();
  resolverArgs.args.ids.forEach((argId: IGQLSearchResultIdentifierType) => {
    if (argId.type !== selfTableType) {
      throw new EndpointError({
        message: "Invalid id container type that didn't match the qualified name " + selfTableType,
        code: "UNSPECIFIED",
      });
    }
  });

  // get the module, the module table name, the table for
  // the item definition
  const moduleTable = mod.getQualifiedPathName();
  const resultValues: ISQLTableRowValue[] = await appData.cache.requestListCache(
    moduleTable,
    resolverArgs.args.ids,
  );

  const finalValues = resultValues.map(
    (value) => {
      // preveting another security leak here, the user might have lied by saying that these
      // items were all created by this specific creator when doing searches
      if (created_by && value.created_by !== created_by) {
        throw new EndpointError({
          message: "created_by mismatch, one of the items requested was not created by whom it was claimed",
          code: "UNSPECIFIED",
        });
      }
      return filterAndPrepareGQLValue(value, requestedFields, tokenData.role, itemDefinition).toReturnToUser;
    },
  );

  const resultAsObject = {
    results: finalValues,
  };
  getItemDefinitionListDebug("SUCCEED");
  return resultAsObject;
}

const getModuleListDebug = Debug("resolvers:getModuleList");
export async function getModuleList(
  appData: IAppDataType,
  resolverArgs: IGraphQLIdefResolverArgs,
  mod: Module,
) {
  console.log(mod.getQualifiedPathName());
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
  await validateTokenIsntBlocked(appData.cache, tokenData);

  // now we find the requested fields that are requested
  // in the get request
  const requestedFields = flattenRawGQLValueOrFields(graphqlFields(resolverArgs.info).results);
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
  getModuleListDebug("Checking role access for read");
  const created_by = resolverArgs.args.created_by;
  let ownerToCheckAgainst = UNSPECIFIED_OWNER;
  if (created_by) {
    ownerToCheckAgainst = created_by;
  }
  mod.checkRoleAccessFor(
    ItemDefinitionIOActions.READ,
    tokenData.role,
    tokenData.id,
    ownerToCheckAgainst,
    requestedFieldsInMod,
    true,
  );

  const moduleTable = mod.getQualifiedPathName();
  const resultValues: ISQLTableRowValue[] = await appData.cache.requestListCache(
    moduleTable,
    resolverArgs.args.ids,
  );

  // return if otherwise succeeds
  const finalValues = resultValues.map(
    (value) => {
      // preveting another security leak here, the user might have lied by saying that these
      // items were all created by this specific creator when doing searches
      if (created_by && value.created_by !== created_by) {
        throw new EndpointError({
          message: "created_by mismatch, one of the items requested was not created by whom it was claimed",
          code: "UNSPECIFIED",
        });
      }
      return filterAndPrepareGQLValue(value, requestedFields, tokenData.role, mod).toReturnToUser;
    },
  );

  const resultAsObject = {
    results: finalValues,
  };
  getModuleListDebug("SUCCEED");
  return resultAsObject;
}

export function getItemDefinitionFn(appData: IAppDataType): FGraphQLIdefResolverType {
  return getItemDefinition.bind(null, appData);
}

export function getItemDefinitionListFn(appData: IAppDataType): FGraphQLIdefResolverType {
  return getItemDefinitionList.bind(null, appData);
}

export function getModuleListFn(appData: IAppDataType): FGraphQLModResolverType {
  return getModuleList.bind(null, appData);
}
