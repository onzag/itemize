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
  validateTokenIsntBlocked,
  checkUserExists,
  validateParentingRules,
  runPolicyCheck,
} from "../basic";
import graphqlFields from "graphql-fields";
import {
  CONNECTOR_SQL_COLUMN_ID_FK_NAME,
  CONNECTOR_SQL_COLUMN_VERSION_FK_NAME,
  INCLUDE_PREFIX,
  UNSPECIFIED_OWNER,
  ENDPOINT_ERRORS,
} from "../../../constants";
import {
  convertSQLValueToGQLValueForItemDefinition,
  convertGQLValueToSQLValueForItemDefinition,
} from "../../../base/Root/Module/ItemDefinition/sql";
import { convertGQLValueToSQLValueForModule } from "../../../base/Root/Module/sql";
import { flattenRawGQLValueOrFields } from "../../../gql-util";
import uuid from "uuid";
import { updateTransitoryIdIfExists } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/sql-files";
import { IParentedSearchRecordsAddedEvent, IOwnedSearchRecordsAddedEvent } from "../../../base/remote-protocol";
import { ISQLTableRowValue } from "../../../base/Root/sql";
import { EndpointError } from "../../../base/errors";
import { IGQLSearchResult } from "../../../gql-querier";
import { convertVersionsIntoNullsWhenNecessary } from "../../version-null-value";

const debug = Debug("resolvers:addItemDefinition");
export async function addItemDefinition(
  appData: IAppDataType,
  resolverArgs: IGraphQLIdefResolverArgs,
  itemDefinition: ItemDefinition,
) {
  debug("EXECUTED for %s", itemDefinition.getQualifiedPathName());
  // First we check the language and the region, based on the args
  // as we expect every request to contain this data and be
  // valid for our app
  checkLanguage(appData, resolverArgs.args);
  // now we need to extract the token and get its data, making
  // sure it's a valid token
  const tokenData = await validateTokenAndGetData(appData, resolverArgs.args.token);

  // check that the user is logged in, for adding, only logged users
  // are valid
  await validateTokenIsntBlocked(appData.cache, tokenData);

  // now we must check if we are parenting
  const isParenting = !!(
    resolverArgs.args.parent_id || resolverArgs.args.parent_type || resolverArgs.args.parent_version
  );
  validateParentingRules(
    appData,
    resolverArgs.args.parent_id,
    resolverArgs.args.parent_version || null,
    resolverArgs.args.parent_type,
    itemDefinition,
    tokenData.id,
    tokenData.role,
  );

  // now we see which fields are being requested for the answer after adding, first
  // we flatten the fields, remember that we have external and internal fields
  // contained in the DATA value, we flatten that first
  const requestedFields = flattenRawGQLValueOrFields(graphqlFields(resolverArgs.info));
  // now we use the basic functions and we check if the basic fields are available,
  // basic fields are module based, like moderation fields
  checkBasicFieldsAreAvailableForRole(itemDefinition, tokenData, requestedFields);

  // now we extract the fields that we are actually adding to the item
  // definition, that is what is valid for adding and nothing else
  // for that we loop over the arguments, and we only get what is ITEM_
  // or what is included in the item definition, including extensions
  const addingFields = {};
  Object.keys(resolverArgs.args).forEach((arg) => {
    if (
      itemDefinition.hasPropertyDefinitionFor(arg, true) ||
      arg.startsWith(INCLUDE_PREFIX) && itemDefinition.hasIncludeFor(arg.replace(INCLUDE_PREFIX, ""))
    ) {
      addingFields[arg] = resolverArgs.args[arg];
    }
  });

  let finalOwner = tokenData.id || UNSPECIFIED_OWNER;
  if (resolverArgs.args.in_behalf_of) {
    itemDefinition.checkRoleCanCreateInBehalf(tokenData.role, true);
    finalOwner = resolverArgs.args.in_behalf_of;
    await checkUserExists(appData.cache, finalOwner);
  }

  debug("Fields to add have been extracted as %j", addingFields);

  debug("Checking role access for creation...");
  // now we check the role access for the given
  // create action
  itemDefinition.checkRoleAccessFor(
    ItemDefinitionIOActions.CREATE,
    tokenData.role,
    tokenData.id,
    finalOwner,
    addingFields,
    true,
  );

  // The rule for create and read are different
  // and set appart, one user might have the rule to
  // create something but not to read it, it's weird,
  // but a valid option
  const requestedFieldsThatRepresentPropertiesAndIncludes = {};
  Object.keys(requestedFields).forEach((arg) => {
    if (
      itemDefinition.hasPropertyDefinitionFor(arg, true) ||
      arg.startsWith(INCLUDE_PREFIX) && itemDefinition.hasIncludeFor(arg.replace(INCLUDE_PREFIX, ""))
    ) {
      requestedFieldsThatRepresentPropertiesAndIncludes[arg] = requestedFields[arg];
    }
  });

  debug(
    "Fields to be requested from the idef have been extracted as %j",
    requestedFieldsThatRepresentPropertiesAndIncludes,
  );
  debug("Checking role access for read...");
  // so now we check the role access for the reading of
  // those fields, as you can see we use the userId of the user
  // since he will be the owner as well
  itemDefinition.checkRoleAccessFor(
    ItemDefinitionIOActions.READ,
    tokenData.role,
    tokenData.id,
    finalOwner,
    requestedFieldsThatRepresentPropertiesAndIncludes,
    true,
  );

  // if all that has succeed we take the item definition and apply
  // the value from graphql, now you should understand how this is handled
  // the values are applied so that the whole item definition value is
  // fulfilled
  itemDefinition.applyValue(null, null, resolverArgs.args, false, tokenData.id, tokenData.role, null, false);
  // now we use this function which checks the current value against
  // the value that we have just set, the reason we are sending the args
  // is because we want to ensure that the values that you updated for
  // are the values that are being set, remember rules in item defintions
  // can change the output, and yet keep things valid, so the arg can be invalid
  // if the output is different from it
  await serverSideCheckItemDefinitionAgainst(itemDefinition, resolverArgs.args, null, null);

  if (isParenting) {
    const parentModule = (
      appData.root.registry[resolverArgs.args.parent_type] as ItemDefinition
    ).getParentModule().getQualifiedPathName();
    await runPolicyCheck({
      policyTypes: ["parent"],
      itemDefinition,
      id: null,
      version: null,
      role: tokenData.role,
      gqlArgValue: resolverArgs.args,
      gqlFlattenedRequestedFiels: requestedFields,
      cache: appData.cache,
      parentModule,
      parentType: resolverArgs.args.parent_type,
      parentId: resolverArgs.args.parent_id,
      parentVersion: resolverArgs.args.parent_version || null,
      preParentValidation: (content: ISQLTableRowValue) => {
        // this shouldn't really happen because validateParentingRules should have
        // checked whether it existed, but we check anyway
        if (!content) {
          debug("FAILED due to lack of content data");
          throw new EndpointError({
            message: `There's no parent ${resolverArgs.args.parent_type} with ` +
            `id ${resolverArgs.args.parent_id} and version ${resolverArgs.args.parent_version}`,
            code: ENDPOINT_ERRORS.NOT_FOUND,
          });
        }

        // this should have also not happen because validate should also have done it
        // but we check anyway
        if (content.blocked_at !== null) {
          debug("FAILED due to element being blocked");
          throw new EndpointError({
            message: "The parent is blocked",
            code: ENDPOINT_ERRORS.BLOCKED,
          });
        }
      },
    });
  }

  // extract this information
  const mod = itemDefinition.getParentModule();
  const moduleTable = mod.getQualifiedPathName();
  const selfTable = itemDefinition.getQualifiedPathName();

  // we need to get the dictionary that is used for this specific
  // language, remember, while the API uses a language and region(country)
  // field, the fields can use both language and language region combos
  // so we check via dictionaries
  const dictionary = getDictionary(appData, resolverArgs.args);

  const transitoryId = "TEMP" + uuid.v4().replace(/-/g, "");

  // now we extract the SQL information for both item definition table
  // and the module table, this value is database ready, and hence needs
  // knex and the dictionary to convert fields that need it
  const sqlIdefData: any = await convertGQLValueToSQLValueForItemDefinition(
    transitoryId,
    itemDefinition,
    resolverArgs.args,
    null,
    appData.knex,
    dictionary,
  );
  const sqlModData: any = await convertGQLValueToSQLValueForModule(
    transitoryId,
    itemDefinition.getParentModule(),
    itemDefinition,
    resolverArgs.args,
    null,
    appData.knex,
    dictionary,
  );

  // this data is added every time when creating
  sqlModData.type = selfTable;
  sqlModData.created_at = appData.knex.fn.now();
  sqlModData.last_modified = appData.knex.fn.now();
  sqlModData.created_by = tokenData.id || UNSPECIFIED_OWNER;

  if (isParenting) {
    sqlModData.parent_id = resolverArgs.args.parent_id;
    // the version can never be null, so we must cast it into the invalid
    // empty string value
    sqlModData.parent_version = resolverArgs.args.parent_version || "";
    sqlModData.parent_type = resolverArgs.args.parent_type;
  }

  debug("SQL Input data for idef is %j", sqlIdefData);
  debug("SQL Input data for module is %j", sqlModData);

  // now let's build the transaction for the insert query which requires
  // two tables to be modified, and it always does so, as item definition information
  // must be added because create requires so
  const value: ISQLTableRowValue = convertVersionsIntoNullsWhenNecessary(
    await appData.knex.transaction(async (transactionKnex) => {
      debug("Inserting...");
      // so we insert in the module, this is very simple
      // we use the transaction in the module table
      // insert the sql data that we got ready, and return
      // the requested columns in sql, there's always at least 1
      // because we always need the id
      const insertQueryValueMod = await transactionKnex(moduleTable)
        .insert(sqlModData).returning("*");

      // so with that in mind, we add the foreign key column value
      // for combining both and keeping them joined togeher
      sqlIdefData[CONNECTOR_SQL_COLUMN_ID_FK_NAME] = insertQueryValueMod[0].id;
      sqlIdefData[CONNECTOR_SQL_COLUMN_VERSION_FK_NAME] = insertQueryValueMod[0].version;

      // so now we create the insert query
      const insertQueryIdef = transactionKnex(selfTable).insert(sqlIdefData).returning("*");
      // so we call the qery
      const insertQueryValueIdef = await insertQueryIdef;

      // and we return the joined result
      return {
        ...insertQueryValueMod[0],
        ...insertQueryValueIdef[0],
      };
    }),
  );

  debug("SQL Output is %j", value);
  appData.cache.forceCacheInto(selfTable, value.id, value.version, value);

  // now we convert that SQL value to the respective GQL value
  // the reason we pass the requested fields is to filter by the fields
  // that we actually want, not passing this would make the gql value
  // be full (of nulls) our value is incomplete, so we need to
  // pass the requestedFields anyway
  const gqlValue = convertSQLValueToGQLValueForItemDefinition(
    itemDefinition,
    value,
    requestedFields,
  );

  const finalOutput = {
    DATA: gqlValue,
    ...gqlValue,
  };

  await updateTransitoryIdIfExists(
    itemDefinition,
    transitoryId,
    value.id.toString(),
  );

  const searchResultForThisValue: IGQLSearchResult = {
    id: value.id,
    version: value.version,
    type: selfTable,
    created_at: value.created_at,
  };

  const itemDefinitionBasedOwnedEvent: IOwnedSearchRecordsAddedEvent = {
    qualifiedPathName: selfTable,
    createdBy: itemDefinition.isOwnerObjectId() ? value.id : sqlModData.created_by,
    newIds: [
      searchResultForThisValue,
    ],
    newLastRecord: searchResultForThisValue,
  };
  appData.listener.triggerOwnedSearchListeners(
    itemDefinitionBasedOwnedEvent,
    null, // TODO add the listener uuid, maybe?
  );

  const moduleBasedOwnedEvent: IOwnedSearchRecordsAddedEvent = {
    ...itemDefinitionBasedOwnedEvent,
    qualifiedPathName: moduleTable,
  };
  appData.listener.triggerOwnedSearchListeners(
    moduleBasedOwnedEvent,
    null, // TODO add the listener uuid, maybe?
  );

  if (isParenting) {
    const itemDefinitionBasedParentedEvent: IParentedSearchRecordsAddedEvent = {
      qualifiedPathName: selfTable,
      parentId: resolverArgs.args.parent_id,
      parentVersion: resolverArgs.args.parent_version || null,
      parentType: resolverArgs.args.parent_type,
      newIds: [
        searchResultForThisValue,
      ],
      newLastRecord: searchResultForThisValue,
    };
    appData.listener.triggerParentedSearchListeners(
      itemDefinitionBasedParentedEvent,
      null, // TODO add the listener uuid, maybe?
    );

    const moduleBasedParentedEvent: IParentedSearchRecordsAddedEvent = {
      ...itemDefinitionBasedParentedEvent,
      qualifiedPathName: moduleTable,
    };
    appData.listener.triggerParentedSearchListeners(
      moduleBasedParentedEvent,
      null, // TODO add the listener uuid, maybe?
    );
  }

  debug("SUCCEED with GQL output %j", finalOutput);

  // items that have just been added cannot be blocked or deleted, hence we just return
  // right away without checking
  return finalOutput;
}

export function addItemDefinitionFn(appData: IAppDataType): FGraphQLIdefResolverType {
  return addItemDefinition.bind(null, appData);
}
