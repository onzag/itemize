import { ISQLTableRowValue } from "../base/Root/sql";
import { IGraphQLResolversType } from "../base/Root/gql";
import fs from "fs";
import path from "path";
import Knex from "knex";
import graphqlFields from "graphql-fields";
import {
  CONNECTOR_SQL_COLUMN_FK_NAME,
  RESERVED_BASE_PROPERTIES_SQL,
  PREFIX_BUILD,
  RESERVED_SEARCH_PROPERTIES,
  MODERATION_FIELDS,
  ROLES_THAT_HAVE_ACCESS_TO_MODERATION_FIELDS,
  MAX_SQL_LIMIT,
  ITEM_PREFIX,
} from "../constants";
import { ItemDefinitionIOActions } from "../base/Root/Module/ItemDefinition";
import {
  convertSQLValueToGQLValueForItemDefinition,
  buildSQLQueryForItemDefinition,
  convertGQLValueToSQLValueForItemDefinition,
} from "../base/Root/Module/ItemDefinition/sql";
import { buildSQLQueryForModule } from "../base/Root/Module/sql";
import { convertSQLValueToGQLValueForModule } from "../base/Root/Module/sql";
import { convertGQLValueToSQLValueForModule } from "../base/Root/Module/sql";
import Debug from "./debug";
const debug = Debug("resolvers");

const fsAsync = fs.promises;

function buildColumnNames(base: any, prefix: string = ""): string[] {
  let result: string[] = [];
  Object.keys(base).forEach((key) => {
    if (Object.keys(base[key]).length === 0) {
      result.push(prefix + key);
    } else {
      result = result.concat(buildColumnNames(base[key], PREFIX_BUILD(prefix + key)));
    }
  });
  return result;
}

let knex: Knex;
let config: any;
let countryList: any;
(async () => {
  // Retrieve the config for the database
  const dbConfig = JSON.parse(await fsAsync.readFile(
    path.join("config", "db.json"),
    "utf8",
  ));
  config = JSON.parse(await fsAsync.readFile(
    "config.json",
    "utf8",
  ));
  countryList = JSON.parse(
    await fsAsync.readFile(
      path.join("resources", "countries.json"),
      "utf8",
    ),
  );

  // Create the connection string
  const dbConnectionKnexConfig = {
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
  };

  // we only need one client instance
  knex = Knex({
    client: "pg",
    debug: process.env.NODE_ENV !== "production",
    connection: dbConnectionKnexConfig,
  });
})();

function validateTokenAndGetData(token: string) {
  return {
    userId: 1,
    role: token,
  };
}

function checkFieldsAreAvailableForRole(tokenData: any, fieldData: any) {
  debug("Checking if fields are available for role...");
  const moderationFieldsHaveBeenRequested = MODERATION_FIELDS.some((field) => fieldData[field]);
  if (
    moderationFieldsHaveBeenRequested &&
    !ROLES_THAT_HAVE_ACCESS_TO_MODERATION_FIELDS.includes(tokenData.role)
  ) {
    debug(
      "Attempted to access to moderation fields with role",
      tokenData.role,
      "only",
      ROLES_THAT_HAVE_ACCESS_TO_MODERATION_FIELDS,
      "allowed",
    );
    throw new Error("You have requested to add/edit/view moderation fields with role: " + tokenData.role);
  }
}

function checkLimit(args: any) {
  debug("Checking the limit...");
  if (args.limit > MAX_SQL_LIMIT) {
    debug(
      "Exceeded limit with",
      args.limit,
      "the maximum is",
      MAX_SQL_LIMIT,
    );
    throw new Error("Limit set too high at " + args.limit);
  }
}

function checkLanguageAndRegion(args: any) {
  debug("Checking language and region...");
  if (typeof args.language !== "string" || args.language.length !== 2) {
    debug(
      "Invalid language code",
      args.language,
    );
    throw new Error("Please use valid non-regionalized language values");
  }
  if (!config.dictionaries[args.language]) {
    debug(
      "Unavailable/Unsupported language",
      args.language,
    );
    throw new Error("This language is not supported, as no dictionary has been set");
  }
  if (typeof args.country !== "string" || args.country.length !== 2) {
    debug(
      "Invalid country code",
      args.country,
    );
    throw new Error("Please use valid region 2-digit ISO codes in uppercase");
  }
  if (!countryList[args.country]) {
    debug(
      "Unknown country",
      args.country,
    );
    throw new Error("Unknown country " + args.country);
  }
}

function mustBeLoggedIn(tokenData: any) {
  if (!tokenData.userId) {
    throw new Error("Must be logged in");
  }
}

// TODO check editing, how does it work, can do partial editing?... roles might fuck this
// up because of enforcing partial editing
// TODO flagging
// TODO implementation of tokens

const resolvers: IGraphQLResolversType = {
  async getItemDefinition(resolverArgs, itemDefinition) {
    checkLanguageAndRegion(resolverArgs.args);
    const tokenData = validateTokenAndGetData(resolverArgs.args.token);

    const requestedFields = graphqlFields(resolverArgs.info);
    checkFieldsAreAvailableForRole(tokenData, requestedFields);

    const requestedFieldsSQL = buildColumnNames(requestedFields);
    if (requestedFieldsSQL.length === 0) {
      return {};
    }

    const mod = itemDefinition.getParentModule();
    const moduleTable = mod.getQualifiedPathName();
    const selfTable = itemDefinition.getQualifiedPathName();
    const requiresJoin = requestedFieldsSQL.some((columnName) =>
      !RESERVED_BASE_PROPERTIES_SQL[columnName] && !mod.hasPropExtensionFor(columnName));

    debug("queried fields grant a join with idef data?", requiresJoin);

    if (!requestedFieldsSQL.includes("created_by")) {
      requestedFieldsSQL.push("created_by");
    }
    const selectQuery = knex.select(requestedFieldsSQL).from(moduleTable).where({
      id: resolverArgs.args.id,
      blocked_at: null,
      type: selfTable,
    });
    if (requiresJoin) {
      selectQuery.join(selfTable, (clause) => {
        clause.on(CONNECTOR_SQL_COLUMN_FK_NAME, "=", "id");
      });
    }

    const selectQueryValue: ISQLTableRowValue[] = await selectQuery;
    if (!selectQueryValue.length) {
      debug("no result founds, returning null");
      return null;
    }
    debug("SQL result found as", selectQueryValue[0]);

    const valueToProvide =
      convertSQLValueToGQLValueForItemDefinition(itemDefinition, selectQueryValue[0], requestedFields);

    debug("converted to GQL as", valueToProvide);

    debug("Checking role access, will throw an error if false");
    itemDefinition.checkRoleAccessFor(
      ItemDefinitionIOActions.READ,
      tokenData.role,
      tokenData.userId,
      valueToProvide.created_by,
      requestedFields,
      true,
    );

    debug("providing value");
    return valueToProvide;
  },
  async searchItemDefinition(resolverArgs, itemDefinition) {
    checkLanguageAndRegion(resolverArgs.args);
    checkLimit(resolverArgs.args);
    const tokenData = validateTokenAndGetData(resolverArgs.args.token);

    const requestedFields = graphqlFields(resolverArgs.info);
    checkFieldsAreAvailableForRole(tokenData, requestedFields);

    itemDefinition.checkRoleAccessFor(
      ItemDefinitionIOActions.READ,
      tokenData.role,
      tokenData.userId,
      // So why is it -1 here as well, well
      // when searching, we cannot just check every
      // component to see if the user has the rights
      // using SELF for read, either a property or
      // the whole item definition, cannot be checked
      // during the search, it would make the query
      // too complex otherwise, it's unecessary, so what
      // we do, we assume searches are granted on role bases
      // and we stop considering SELF, so we can see
      // if the user can access all the values that
      // he is querying as his role grants it, without
      // considering selfs, granted we could use nulls,
      // but again, null is the user id of the non-logged
      // user, so if suddenly, a nonlogged user makes a search
      // request, all the SELF permissions will be granted, and he
      // might have unauthorized access
      -1,
      requestedFields,
      true,
    );
    const searchingFields = {};
    const searchModeCounterpart = itemDefinition.getSearchModeCounterpart();
    Object.keys(resolverArgs.args).forEach((arg) => {
      if (
        searchModeCounterpart.hasPropertyDefinitionFor(arg, true) ||
        arg.startsWith(ITEM_PREFIX) && searchModeCounterpart.hasItemFor(arg.replace(ITEM_PREFIX, ""))
      ) {
        searchingFields[arg] = resolverArgs.args[arg];
      }
    });
    // We also check for the role access of the search fields
    // the reason is simple, if we can use the query to query
    // the value of something we don't have access to, then, we
    // can brute force the value; for example, let's say we have
    // a SELF locked phone_number field, another user might wish
    // to know that phone number, so he starts a search process
    // and uses the EXACT_phone_number field, he will get returned null
    // until he matches the phone number, this is a leak, a weak one
    // but a leak nevertheless
    searchModeCounterpart.checkRoleAccessFor(
      ItemDefinitionIOActions.READ,
      tokenData.role,
      tokenData.userId,
      // And we also use -1 for the same reason as before
      // this is a search, we ignore SELF
      -1,
      searchingFields,
      true,
    );

    const requestedFieldsSQL = buildColumnNames(requestedFields);

    const mod = itemDefinition.getParentModule();
    const moduleTable = mod.getQualifiedPathName();
    const selfTable = itemDefinition.getQualifiedPathName();
    const searchMod = mod.getSearchModule();

    // the way we calculate whether it requires a join goes by checking
    // the base properties, to see if it represents a base property, like
    // id, created_at, created_by, locale, etc... if that runs false,
    // the we also have to check if we had a requeriment in the search
    // query, we check the arguments, arguments might be token, limit, etc...
    // ensure those are not, but the rest might be property ids, we check
    // if they are all property ids and represent extensions, if that's the case
    // we are basically doing a module level search, despite using this endpoint
    // so we don't need a join, joining will be a waste of resources
    const requiresJoin = requestedFieldsSQL.some((columnName) =>
      !RESERVED_BASE_PROPERTIES_SQL[columnName] && !mod.hasPropExtensionFor(columnName)) ||
      Object.keys(resolverArgs.args).some((argName) =>
      !RESERVED_SEARCH_PROPERTIES[argName] && !searchMod.hasPropExtensionFor(argName));

    const searchQuery = knex.select(requestedFieldsSQL).from(moduleTable).where({
      blocked_at: null,
      type: selfTable,
    });
    buildSQLQueryForItemDefinition(itemDefinition, resolverArgs.args, searchQuery);
    if (requiresJoin) {
      searchQuery.join(selfTable, (clause) => {
        clause.on(CONNECTOR_SQL_COLUMN_FK_NAME, "=", "id");
      });
    }
    searchQuery.andWhere("created_at", "<=", resolverArgs.args.search_date_identifier);
    if (resolverArgs.args.filter_by_language) {
      searchQuery.andWhere("language", resolverArgs.args.language);
    }
    if (resolverArgs.args.filter_by_country) {
      searchQuery.andWhere("country", resolverArgs.args.country);
    }
    searchQuery.limit(resolverArgs.args.limit).offset(resolverArgs.args.offset);
    // TODO we need to add a count query for both searches
    // we need to validate the dates

    const baseResult: ISQLTableRowValue[] = await searchQuery;
    return baseResult.map((row) => convertSQLValueToGQLValueForItemDefinition(itemDefinition, row, requestedFields));
  },
  async searchModule(resolverArgs, mod) {
    checkLanguageAndRegion(resolverArgs.args);
    checkLimit(resolverArgs.args);
    const tokenData = validateTokenAndGetData(resolverArgs.args.token);

    const requestedFields = graphqlFields(resolverArgs.info);
    checkFieldsAreAvailableForRole(tokenData, requestedFields);

    mod.checkRoleAccessFor(
      ItemDefinitionIOActions.READ,
      tokenData.role,
      tokenData.userId,
      // Same reason as before, with item definitions
      -1,
      requestedFields,
      true,
    );
    const searchingFields = {};
    const searchModeCounterpart = mod.getSearchModule();
    Object.keys(resolverArgs.args).forEach((arg) => {
      if (searchModeCounterpart.hasPropExtensionFor(arg)) {
        searchingFields[arg] = resolverArgs.args[arg];
      }
    });
    searchModeCounterpart.checkRoleAccessFor(
      ItemDefinitionIOActions.READ,
      tokenData.role,
      tokenData.userId,
      // Same reason as before, with item definitions
      -1,
      searchingFields,
      true,
    );

    const requestedFieldsSQL = buildColumnNames(requestedFields);

    let allItemDefinitionsInvolved = mod.getAllChildItemDefinitionsRecursive();
    if (resolverArgs.args.types) {
      allItemDefinitionsInvolved = allItemDefinitionsInvolved.filter((idef) => {
        return resolverArgs.args.types.includes(idef.getQualifiedPathName);
      });
    }

    const searchQuery = knex.select(requestedFieldsSQL).from(mod.getQualifiedPathName()).where({
      blocked_at: null,
    });
    buildSQLQueryForModule(mod, resolverArgs.args, searchQuery);
    searchQuery.andWhere("created_at", "<=", resolverArgs.args.search_date_identifier);
    if (resolverArgs.args.filter_by_language) {
      searchQuery.andWhere("language", resolverArgs.args.language);
    }
    if (resolverArgs.args.filter_by_country) {
      searchQuery.andWhere("country", resolverArgs.args.country);
    }
    searchQuery.limit(resolverArgs.args.limit).offset(resolverArgs.args.offset);

    const baseResult: ISQLTableRowValue[] = await searchQuery;
    return baseResult.map((row) => convertSQLValueToGQLValueForModule(mod, row, requestedFields));
  },
  async addItemDefinition(resolverArgs, itemDefinition) {
    checkLanguageAndRegion(resolverArgs.args);
    const tokenData = validateTokenAndGetData(resolverArgs.args.token);

    mustBeLoggedIn(tokenData);

    const requestedFields = graphqlFields(resolverArgs.info);
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
    const sqlIdefData: any = convertGQLValueToSQLValueForItemDefinition(itemDefinition, resolverArgs.args, knex.raw);
    const sqlModData: any = convertGQLValueToSQLValueForModule(
      itemDefinition.getParentModule(),
      resolverArgs.args,
      knex.raw,
    );
    sqlModData.type = selfTable;
    sqlModData.created_at = knex.fn.now();
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
      } else {
        requestedIdefColumnsSQL.push(columnName);
      }
    });

    if (!requestedModuleColumnsSQL.includes("id")) {
      debug("Adding id to requested sql columns from the module output as it's missing");
      requestedModuleColumnsSQL.push("id");
    }

    debug("Inserting...");
    const insertQueryValueMod = await knex(moduleTable).insert(sqlModData).returning(requestedModuleColumnsSQL);
    sqlIdefData[CONNECTOR_SQL_COLUMN_FK_NAME] = insertQueryValueMod[0].id;

    const inserQuery = knex(selfTable).insert(sqlIdefData);
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
    return convertSQLValueToGQLValueForItemDefinition(itemDefinition, value, requestedFields);
  },
  async editItemDefinition(resolverArgs, itemDefinition) {
    checkLanguageAndRegion(resolverArgs.args);
    const tokenData = validateTokenAndGetData(resolverArgs.args.token);

    mustBeLoggedIn(tokenData);

    const requestedFields = graphqlFields(resolverArgs.info);
    checkFieldsAreAvailableForRole(tokenData, requestedFields);

    const mod = itemDefinition.getParentModule();
    const moduleTable = mod.getQualifiedPathName();
    const selfTable = itemDefinition.getQualifiedPathName();

    const editingFields = {};
    Object.keys(resolverArgs.args).forEach((arg) => {
      if (
        itemDefinition.hasPropertyDefinitionFor(arg, true) ||
        arg.startsWith(ITEM_PREFIX) && itemDefinition.hasItemFor(arg.replace(ITEM_PREFIX, ""))
      ) {
        editingFields[arg] = resolverArgs.args[arg];
      }
    });
    const id = resolverArgs.args.id;
    const userIdData = await knex.select("created_by").from(moduleTable).where({
      id,
      blocked_at: null,
      type: selfTable,
    });
    const userId = userIdData[0] && userIdData[0].created_by;
    if (!userId) {
      throw new Error(`There's no ${selfTable} with id ${id}`);
    }
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
      requestedFields,
      true,
    );

    const requestedFieldsSQL = buildColumnNames(requestedFields);

    // TODO validation
    const sqlIdefData: any = convertGQLValueToSQLValueForItemDefinition(itemDefinition, resolverArgs.args, knex.raw);
    const sqlModData: any = convertGQLValueToSQLValueForModule(
      itemDefinition.getParentModule(),
      resolverArgs.args,
      knex.raw,
    );
    sqlModData.edited_at = knex.fn.now();

    const requestedModuleColumnsSQL: string[] = [];
    const requestedIdefColumnsSQL: string[] = [];
    requestedFieldsSQL.forEach((columnName) => {
      if (
        RESERVED_BASE_PROPERTIES_SQL[columnName] ||
        mod.hasPropExtensionFor(columnName)
      ) {
        requestedModuleColumnsSQL.push(columnName);
      } else {
        requestedIdefColumnsSQL.push(columnName);
      }
    });

    const updateQueryMod = knex(moduleTable).update(sqlModData).where("id", id);
    if (requestedModuleColumnsSQL.length) {
      updateQueryMod.returning(requestedModuleColumnsSQL);
    }
    const updateQueryIdef = knex(selfTable).update(sqlIdefData).where(CONNECTOR_SQL_COLUMN_FK_NAME, id);
    if (requestedIdefColumnsSQL.length) {
      updateQueryIdef.returning(requestedIdefColumnsSQL);
    }
    const [updateQueryValueMod, updateQueryValueIdef] = await Promise.all([
      updateQueryMod,
      updateQueryIdef,
    ]);
    const value = {
      ...updateQueryValueMod[0],
      ...updateQueryValueIdef[0],
    };
    return convertSQLValueToGQLValueForItemDefinition(itemDefinition, value, requestedFields);
  },
  async deleteItemDefinition(resolverArgs, itemDefinition) {
    checkLanguageAndRegion(resolverArgs.args);
    const tokenData = validateTokenAndGetData(resolverArgs.args.token);

    mustBeLoggedIn(tokenData);

    const requestedFields = graphqlFields(resolverArgs.info);
    checkFieldsAreAvailableForRole(tokenData, requestedFields);

    const mod = itemDefinition.getParentModule();
    const moduleTable = mod.getQualifiedPathName();
    const selfTable = itemDefinition.getQualifiedPathName();

    const id = resolverArgs.args.id;
    const userIdData = await knex.select("created_by").from(moduleTable).where({
      id,
      blocked_at: null,
      type: selfTable,
    });
    const userId = userIdData[0] && userIdData[0].created_by;
    if (!userId) {
      throw new Error(`There's no ${selfTable} with id ${id}`);
    }
    itemDefinition.checkRoleAccessFor(
      ItemDefinitionIOActions.DELETE,
      tokenData.role,
      tokenData.userId,
      userId,
      null,
      true,
    );
    itemDefinition.checkRoleAccessFor(
      ItemDefinitionIOActions.READ,
      tokenData.role,
      tokenData.userId,
      userId,
      requestedFields,
      true,
    );

    const value = resolvers.getItemDefinition(resolverArgs, itemDefinition);

    // It cascades to the item definition
    await knex(itemDefinition.getParentModule().getQualifiedPathName()).where({
      id: resolverArgs.args.id,
      blocked_at: null,
    }).delete();

    return value;
  },
};

export default resolvers;
