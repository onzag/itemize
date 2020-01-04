import { IAppDataType } from "../../";
import ItemDefinition, { ItemDefinitionIOActions } from "../../../base/Root/Module/ItemDefinition";
import { IGraphQLIdefResolverArgs, FGraphQLIdefResolverType } from "../../../base/Root/gql";
import Debug from "debug";
import {
  checkLanguage,
  validateTokenAndGetData,
  checkBasicFieldsAreAvailableForRole,
  getDictionary,
  serverSideCheckItemDefinitionAgainst,
  runPolicyCheck,
  buildColumnNamesForModuleTableOnly,
  buildColumnNamesForItemDefinitionTableOnly,
  validateTokenIsntBlocked,
} from "../basic";
import graphqlFields = require("graphql-fields");
import { CONNECTOR_SQL_COLUMN_FK_NAME, ITEM_PREFIX, EXCLUSION_STATE_SUFFIX } from "../../../constants";
import {
  convertSQLValueToGQLValueForItemDefinition,
  convertGQLValueToSQLValueForItemDefinition,
} from "../../../base/Root/Module/ItemDefinition/sql";
import { convertGQLValueToSQLValueForModule } from "../../../base/Root/Module/sql";
import { GraphQLEndpointError } from "../../../base/errors";
import { flattenRawGQLValueOrFields } from "../../../gql-util";
import { ISQLTableRowValue } from "../../../base/Root/sql";

const debug = Debug("resolvers:editItemDefinition");
export async function editItemDefinition(
  appData: IAppDataType,
  resolverArgs: IGraphQLIdefResolverArgs,
  itemDefinition: ItemDefinition,
) {
  debug("EXECUTED for %s", itemDefinition.getQualifiedPathName());

  // First we check the language and region of the item
  checkLanguage(appData, resolverArgs.args);
  // we ge the token data
  const tokenData = await validateTokenAndGetData(appData, resolverArgs.args.token);

  // for editing one must be logged in
  await validateTokenIsntBlocked(appData.cache, tokenData);

  // now we get the requested fields, and check they are available for the given role
  const requestedFields = flattenRawGQLValueOrFields(graphqlFields(resolverArgs.info));
  checkBasicFieldsAreAvailableForRole(tokenData, requestedFields);

  // now we get the basic information
  const mod = itemDefinition.getParentModule();
  const moduleTable = mod.getQualifiedPathName();
  const selfTable = itemDefinition.getQualifiedPathName();

  debug("Making query to get the owner of this item");

  // now we get these variables ready
  // we need to get the userId and the current
  // entire item definition value that is in the database
  // there's an easy way to request that, and now, we do it
  // at the same time we run the policy check
  let userId: number;

  // so we run the policy check for edit, this item definition,
  // with the given id
  const wholeSqlStoredValue: ISQLTableRowValue = await runPolicyCheck(
    "edit",
    itemDefinition,
    resolverArgs.args.id,
    tokenData.role,
    resolverArgs.args,
    appData.cache,
    (content: ISQLTableRowValue) => {
      // if we don't get an user id this means that there's no owner, this is bad input
      if (!content) {
        debug("FAILED due to lack of content data");
        throw new GraphQLEndpointError({
          message: `There's no ${selfTable} with id ${resolverArgs.args.id}`,
          code: "NOT_FOUND",
        });
      }

      // and fetch the userId
      userId = content.created_by;
      if (itemDefinition.isOwnerObjectId()) {
        userId = content.id;
      }

      // also throw an error if it's blocked
      if (content.blocked_at !== null) {
        debug("FAILED due to element being blocked");
        throw new GraphQLEndpointError({
          message: "The item is blocked",
          code: "BLOCKED",
        });
      }
    },
  );

  // Now that the policies have been checked, and that we get the value of the entire item
  // definition, we need to convert that value to GQL value, and for that we use the converter
  // note how we don't pass the requested fields because we want it all
  const currentWholeValueAsGQL = convertSQLValueToGQLValueForItemDefinition(itemDefinition, wholeSqlStoredValue);
  debug("Current GQL value found as %j", currentWholeValueAsGQL);
  // and now basically we create a new value that is the combination or both, where our new
  // values take precedence, yes there will be pollution, with token, id, and whatnot, but that
  // doesn't matter because the apply function ignores those
  const expectedUpdatedValue = {
    ...currentWholeValueAsGQL,
    ...resolverArgs.args,
  };
  debug("Expectd GQL value considered as %j, applying such value", expectedUpdatedValue);
  // and as so we apply the value from graphql
  itemDefinition.applyValue(
    resolverArgs.args.id, expectedUpdatedValue, false, tokenData.id, tokenData.role, null);
  // and then we check with the entire full value, we want to ensure no changes occurred
  // and that the updated value will be exactly the result and it will be valid
  await serverSideCheckItemDefinitionAgainst(
    itemDefinition,
    expectedUpdatedValue,
    resolverArgs.args.id,
  );
  itemDefinition.cleanValueFor(resolverArgs.args.id);

  // now we calculate the fields that we are editing, and the fields that we are
  // requesting
  const editingFields = {};
  Object.keys(resolverArgs.args).map(async (arg) => {
    if (
      itemDefinition.hasPropertyDefinitionFor(arg, true) ||
      (
        arg.startsWith(ITEM_PREFIX) &&
        itemDefinition.hasItemFor(arg.replace(ITEM_PREFIX, "").replace(EXCLUSION_STATE_SUFFIX, ""))
      )
    ) {
      editingFields[arg] = resolverArgs.args[arg];
    }
  });
  debug(
    "Fields to be edited from the idef have been extracted as %j",
    editingFields,
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
  debug(
    "Fields to be requested from the idef have been extracted as %j",
    requestedFieldsInIdef,
  );

  debug("Checking role access for editing");
  // checking the role access for both
  itemDefinition.checkRoleAccessFor(
    ItemDefinitionIOActions.EDIT,
    tokenData.role,
    tokenData.id,
    userId,
    editingFields,
    true,
  );
  debug("Checking role access for read");
  itemDefinition.checkRoleAccessFor(
    ItemDefinitionIOActions.READ,
    tokenData.role,
    tokenData.id,
    userId,
    requestedFieldsInIdef,
    true,
  );

  // and we now build both queries for updating
  // we are telling by setting the partialFields variable
  // that we only want the editingFields to be returned
  // into the SQL value, this is valid in here because
  // we don't want things to be defaulted in the query
  const dictionary = getDictionary(appData, resolverArgs.args);
  const sqlIdefData: any = await convertGQLValueToSQLValueForItemDefinition(
    resolverArgs.args.id.toString(),
    itemDefinition,
    resolverArgs.args,
    currentWholeValueAsGQL,
    appData.knex,
    dictionary,
    editingFields,
  );
  const sqlModData: any = convertGQLValueToSQLValueForModule(
    resolverArgs.args.id.toString(),
    itemDefinition.getParentModule(),
    itemDefinition,
    resolverArgs.args,
    currentWholeValueAsGQL,
    appData.knex,
    dictionary,
    editingFields,
  );

  // now we check if we are updating anything at all
  if (
    Object.keys(sqlIdefData).length === 0 &&
    Object.keys(sqlModData).length === 0
  ) {
    debug("FAILED due to input data being none");
    throw new GraphQLEndpointError({
      message: "You are not updating anything whatsoever",
      code: "NOTHING_TO_UPDATE",
    });
  }

  // update when it was edited
  sqlModData.edited_at = appData.knex.fn.now();
  sqlModData.last_modified = appData.knex.fn.now();
  sqlModData.edited_by = tokenData.id;

  debug("SQL Input data for idef is %j", sqlIdefData);
  debug("SQL Input data for module is %j", sqlModData);

  // we build the transaction for the action
  const value = await appData.knex.transaction(async (transactionKnex) => {
    // and add them if we have them, note that the module will always have
    // something to update because the edited_at field is always added when
    // edition is taking place
    const updateQueryMod = transactionKnex(moduleTable)
      .update(sqlModData).where("id", resolverArgs.args.id)
      .returning("*");

    // for the update query of the item definition we have to take several things
    // into consideration, first we set it as an empty object
    let updateOrSelectQueryIdef: any = {};
    // if we have something to update
    if (Object.keys(sqlIdefData).length) {
      // we make the update query
      updateOrSelectQueryIdef = transactionKnex(selfTable).update(sqlIdefData).where(
        CONNECTOR_SQL_COLUMN_FK_NAME,
        resolverArgs.args.id,
      ).returning("*");
    // otherwise we check if we are just requesting some fields from the idef
    } else {
      // and make a simple select query
      updateOrSelectQueryIdef = transactionKnex(selfTable).select("*")
        .where(CONNECTOR_SQL_COLUMN_FK_NAME, resolverArgs.args.id);
    }
    // if there's nothing to update, or there is nothing to retrieve, it won't touch the idef table

    // now we run both queries
    const updateQueryValueMod = await updateQueryMod;
    const updateQueryValueIdef = await updateOrSelectQueryIdef;

    return {
      ...updateQueryValueMod[0],
      ...updateQueryValueIdef[0],
    };
  });

  debug("SQL Output is %j", value);

  // convert it using the requested fields for that, and ignoring everything else
  const gqlValue = convertSQLValueToGQLValueForItemDefinition(itemDefinition, value, requestedFields);

  // we don't need to check for blocked or deleted because such items cannot be edited,
  // see before, so we return immediately, read has been checked already
  // we use the same strategy, all extra data will be chopped anyway by graphql
  const finalOutput = {
    DATA: gqlValue,
    ...gqlValue,
  };

  debug("SUCCEED with GQL output %j", finalOutput);

  // we return and this executes after it returns
  (async () => {
    await appData.cache.forceCacheInto(selfTable, resolverArgs.args.id, value);
    appData.listener.triggerListeners(
      mod.getPath().join("/"),
      itemDefinition.getPath().join("/"),
      resolverArgs.args.id,
      resolverArgs.args.listener_uuid,
      false,
    );
  })();

  return finalOutput;
}

export function editItemDefinitionFn(appData: IAppDataType): FGraphQLIdefResolverType {
  return editItemDefinition.bind(null, appData);
}
