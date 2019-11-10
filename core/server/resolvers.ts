import { IGraphQLResolversType, ISQLTableRowValue } from "../base/Root";
import fs from "fs";
import path from "path";
import Knex from "knex";
import graphqlFields from "graphql-fields";
import {
  CONNECTOR_SQL_COLUMN_FK_NAME,
  RESERVED_BASE_PROPERTIES_SQL,
  PREFIX_BUILD,
  RESERVED_SEARCH_PROPERTIES,
  USER_ROLES,
  MODERATION_FIELDS,
  ROLES_THAT_HAVE_ACCESS_TO_MODERATION_FIELDS,
  MAX_SQL_LIMIT,
} from "../constants";

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
    debug: true,
    connection: dbConnectionKnexConfig,
  });
})();

function validateTokenAndGetData(token: string) {
  return {
    id: 1,
    role: token,
  };
}

function checkFieldsAreAvailableForRole(tokenData: any, fieldData: any) {
  const moderationFieldsHaveBeenRequested = MODERATION_FIELDS.some((field) => fieldData[field]);
  if (
    moderationFieldsHaveBeenRequested &&
    !ROLES_THAT_HAVE_ACCESS_TO_MODERATION_FIELDS.includes(tokenData.role)
  ) {
    throw new Error("You have requested to add/edit/view moderation fields with role: " + tokenData.role);
  }
}

function checkLimit(args: any) {
  if (args.limit > MAX_SQL_LIMIT) {
    throw new Error("Limit set too high at " + args.limit);
  }
}

function checkLanguageAndRegion(args: any) {
  if (args.language.length !== 2) {
    throw new Error("Please use valid non-regionalized language values");
  }
  if (!config.dictionaries[args.language]) {
    throw new Error("This language is not supported, as no dictionary has been set");
  }
  if (args.country.length !== 2) {
    throw new Error("Please use valid region 2-digit ISO codes");
  }
}

// TODO validation of retrieval (roles)
// TODO validation of setting (roles)
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

    // TODO we need to check if the requested fields have the specific property definition rights
    // before granting anything

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
      return null;
    }
    return itemDefinition.convertSQLValueToGQLValue(selectQueryValue[0], requestedFields);
  },
  async searchItemDefinition(resolverArgs, itemDefinition) {
    checkLanguageAndRegion(resolverArgs.args);
    checkLimit(resolverArgs.args);
    const tokenData = validateTokenAndGetData(resolverArgs.args.token);

    const requestedFields = graphqlFields(resolverArgs.info);
    checkFieldsAreAvailableForRole(tokenData, requestedFields);

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
    itemDefinition.buildSQLQueryFrom(resolverArgs.args, searchQuery);
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
    return baseResult.map((row) => itemDefinition.convertSQLValueToGQLValue(row, requestedFields));
  },
  async searchModule(resolverArgs, mod) {
    checkLanguageAndRegion(resolverArgs.args);
    checkLimit(resolverArgs.args);
    const tokenData = validateTokenAndGetData(resolverArgs.args.token);

    const requestedFields = graphqlFields(resolverArgs.info);
    checkFieldsAreAvailableForRole(tokenData, requestedFields);

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
    mod.buildSQLQueryFrom(resolverArgs.args, searchQuery);
    searchQuery.andWhere("created_at", "<=", resolverArgs.args.search_date_identifier);
    if (resolverArgs.args.filter_by_language) {
      searchQuery.andWhere("language", resolverArgs.args.language);
    }
    if (resolverArgs.args.filter_by_country) {
      searchQuery.andWhere("country", resolverArgs.args.country);
    }
    searchQuery.limit(resolverArgs.args.limit).offset(resolverArgs.args.offset);

    const baseResult: ISQLTableRowValue[] = await searchQuery;
    return baseResult.map((row) => mod.convertSQLValueToGQLValue(row, requestedFields));
  },
  async addItemDefinition(resolverArgs, itemDefinition) {
    checkLanguageAndRegion(resolverArgs.args);
    const tokenData = validateTokenAndGetData(resolverArgs.args.token);

    const requestedFields = graphqlFields(resolverArgs.info);
    checkFieldsAreAvailableForRole(tokenData, requestedFields);

    const requestedFieldsSQL = buildColumnNames(requestedFields);

    // TODO moderation fields blocking of setting the fields

    const mod = itemDefinition.getParentModule();
    const moduleTable = mod.getQualifiedPathName();
    const selfTable = itemDefinition.getQualifiedPathName();

    // TODO validation
    const sqlIdefData: any = itemDefinition.convertGQLValueToSQLValue(resolverArgs.args, knex.raw);
    const sqlModData: any = itemDefinition.getParentModule().convertGQLValueToSQLValue(resolverArgs.args, knex.raw);
    sqlModData.type = selfTable;
    sqlModData.created_at = knex.fn.now();
    sqlModData.created_by = tokenData.id;
    sqlModData.language = resolverArgs.args.language;
    sqlModData.country = resolverArgs.args.country;

    // TODO check permissions for insert

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
      requestedModuleColumnsSQL.push("id");
    }

    const insertQueryValueMod = await knex(moduleTable).insert(sqlModData).returning(requestedModuleColumnsSQL);
    sqlIdefData[CONNECTOR_SQL_COLUMN_FK_NAME] = insertQueryValueMod[0].id;
    const insertQueryValueIdef = await knex(selfTable).insert(sqlIdefData).returning(requestedIdefColumnsSQL);
    const value = {
      ...insertQueryValueMod[0],
      ...insertQueryValueIdef[0],
    };
    return itemDefinition.convertSQLValueToGQLValue(value, requestedFields);
  },
  async editItemDefinition(resolverArgs, itemDefinition) {
    checkLanguageAndRegion(resolverArgs.args);
    const tokenData = validateTokenAndGetData(resolverArgs.args.token);

    const requestedFields = graphqlFields(resolverArgs.info);
    checkFieldsAreAvailableForRole(tokenData, requestedFields);

    const requestedFieldsSQL = buildColumnNames(requestedFields);

    const mod = itemDefinition.getParentModule();
    const moduleTable = mod.getQualifiedPathName();
    const selfTable = itemDefinition.getQualifiedPathName();

    // TODO validation
    const sqlIdefData: any = itemDefinition.convertGQLValueToSQLValue(resolverArgs.args, knex.raw);
    const sqlModData: any = itemDefinition.getParentModule().convertGQLValueToSQLValue(resolverArgs.args, knex.raw);
    sqlModData.edited_at = knex.fn.now();

    // TODO check permissions for edit
    // TODO check permissions for obtaining the values getting
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

    const id = resolverArgs.args.id;
    const [updateQueryValueMod, updateQueryValueIdef] = await Promise.all([
      knex(moduleTable).update(sqlModData)
        .where("id", id).returning(requestedModuleColumnsSQL),
      knex(selfTable).update(sqlIdefData)
        .where(CONNECTOR_SQL_COLUMN_FK_NAME, id).returning(requestedIdefColumnsSQL),
    ]);
    const value = {
      ...updateQueryValueMod[0],
      ...updateQueryValueIdef[0],
    };
    return itemDefinition.convertSQLValueToGQLValue(value, requestedFields);
  },
  async deleteItemDefinition(resolverArgs, itemDefinition) {
    checkLanguageAndRegion(resolverArgs.args);
    const tokenData = validateTokenAndGetData(resolverArgs.args.token);

    // TODO check permissions for delete
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
