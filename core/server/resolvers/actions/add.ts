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
  flattenFieldsFromRequestedFields,
} from "../basic";
import graphqlFields = require("graphql-fields");
import { RESERVED_BASE_PROPERTIES_SQL, CONNECTOR_SQL_COLUMN_FK_NAME, ITEM_PREFIX } from "../../../constants";
import {
  convertSQLValueToGQLValueForItemDefinition,
  convertGQLValueToSQLValueForItemDefinition,
} from "../../../base/Root/Module/ItemDefinition/sql";
import { convertGQLValueToSQLValueForModule } from "../../../base/Root/Module/sql";
const debug = Debug("resolvers/actions/add");

export async function addItemDefinition(
  appData: IAppDataType,
  resolverArgs: IGraphQLIdefResolverArgs,
  itemDefinition: ItemDefinition,
) {
  checkLanguageAndRegion(resolverArgs.args);
  const tokenData = validateTokenAndGetData(resolverArgs.args.token);

  mustBeLoggedIn(tokenData);

  const requestedFields = flattenFieldsFromRequestedFields(graphqlFields(resolverArgs.info));
  checkFieldsAreAvailableForRole(tokenData, requestedFields);

  const addingFields = {};
  Object.keys(resolverArgs.args).forEach((arg) => {
    if (
      itemDefinition.hasPropertyDefinitionFor(arg, true) ||
      arg.startsWith(ITEM_PREFIX) && itemDefinition.hasItemFor(arg.replace(ITEM_PREFIX, ""))
    ) {
      addingFields[arg] = resolverArgs.args[arg];
    }
  });

  debug("extracted fields to add as", addingFields);

  debug("checking role access...");
  itemDefinition.checkRoleAccessFor(
    ItemDefinitionIOActions.CREATE,
    tokenData.role,
    tokenData.userId,
    // You might wonder why we used -1 as an user id, well
    // -1 works, no valid user id is negative, and unlogged users
    // have no user id, so imagine passing null, and having SELF as
    // the role, then this would pass, granted, it's an edge
    // case that shows the schema was defined weirdly, but none owns
    // a non existant object; in this case nevertheless, null would work
    // because SELF would be granted to the future owner of the object
    // but that would be strange, and even then, we are forcing users
    // to be logged in, but we still use -1; just to ignore selfs
    -1,
    addingFields,
    true,
  );

  const requestedFieldsSQL = buildColumnNames(requestedFields);

  const mod = itemDefinition.getParentModule();
  const moduleTable = mod.getQualifiedPathName();
  const selfTable = itemDefinition.getQualifiedPathName();

  // TODO validation
  const sqlIdefData: any = convertGQLValueToSQLValueForItemDefinition(
    itemDefinition,
    resolverArgs.args,
    appData.knex,
  );
  const sqlModData: any = convertGQLValueToSQLValueForModule(
    itemDefinition.getParentModule(),
    resolverArgs.args,
    appData.knex,
  );
  sqlModData.type = selfTable;
  sqlModData.created_at = appData.knex.fn.now();
  sqlModData.created_by = tokenData.userId;
  sqlModData.language = resolverArgs.args.language;
  sqlModData.country = resolverArgs.args.country;

  debug("SQL Input data for idef", sqlIdefData);
  debug("SQL Input data for module", sqlModData);

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

  if (!requestedModuleColumnsSQL.includes("id")) {
    debug("Adding id to requested sql columns from the module output as it's missing");
    requestedModuleColumnsSQL.push("id");
  }

  debug("Inserting...");
  const insertQueryValueMod = await appData.knex(moduleTable).insert(sqlModData).returning(requestedModuleColumnsSQL);
  sqlIdefData[CONNECTOR_SQL_COLUMN_FK_NAME] = insertQueryValueMod[0].id;

  const inserQuery = appData.knex(selfTable).insert(sqlIdefData);
  if (requestedIdefColumnsSQL.length) {
    inserQuery.returning(requestedIdefColumnsSQL);
  }
  const insertQueryValueIdef = await inserQuery;
  const value = {
    ...insertQueryValueMod[0],
    ...insertQueryValueIdef[0],
  };

  debug("SQL Output is", value);

  debug("Checking role access for read...");
  // The rule for create and read are different
  // and set appart, one user might have the rule to
  // create something but not to read it, it's weird,
  // but a valid option
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
    tokenData.userId,
    requestedFieldsInIdef,
    true,
  );
  const gqlValue = convertSQLValueToGQLValueForItemDefinition(itemDefinition, value, requestedFields);

  // items that have just been added cannot be blocked or deleted, hence we just return
  // right away without checking
  return {
    data: gqlValue,
    ...gqlValue,
  };
}

export function addItemDefinitionFn(appData: IAppDataType): FGraphQLIdefResolverType {
  return addItemDefinition.bind(null, appData);
}
