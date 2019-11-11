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
    userId: 1,
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

    if (!requestedFieldsSQL.includes("user_id")) {
      requestedFieldsSQL.push("user_id");
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
      return null;
    }
    const valueToProvide =
      convertSQLValueToGQLValueForItemDefinition(itemDefinition, selectQueryValue[0], requestedFields);
    itemDefinition.checkRoleAccessFor(
      ItemDefinitionIOActions.READ,
      tokenData.role,
      tokenData.userId,
      valueToProvide.user_id,
      requestedFields,
      true,
    );
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
    searchModeCounterpart.checkRoleAccessFor(
      ItemDefinitionIOActions.READ,
      tokenData.role,
      tokenData.userId,
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
    itemDefinition.checkRoleAccessFor(
      ItemDefinitionIOActions.CREATE,
      tokenData.role,
      tokenData.userId,
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
    itemDefinition.checkRoleAccessFor(
      ItemDefinitionIOActions.READ,
      tokenData.role,
      tokenData.userId,
      tokenData.userId,
      requestedFields,
      true,
    );
    return convertSQLValueToGQLValueForItemDefinition(itemDefinition, value, requestedFields);
  },
  async editItemDefinition(resolverArgs, itemDefinition) {
    checkLanguageAndRegion(resolverArgs.args);
    const tokenData = validateTokenAndGetData(resolverArgs.args.token);

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
    const userIdData = await knex.select("user_id").from(moduleTable).where({
      id,
      blocked_at: null,
      type: selfTable,
    });
    const userId = userIdData[0] && userIdData[0].user_id;
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
    return convertSQLValueToGQLValueForItemDefinition(itemDefinition, value, requestedFields);
  },
  async deleteItemDefinition(resolverArgs, itemDefinition) {
    checkLanguageAndRegion(resolverArgs.args);
    const tokenData = validateTokenAndGetData(resolverArgs.args.token);

    const requestedFields = graphqlFields(resolverArgs.info);
    checkFieldsAreAvailableForRole(tokenData, requestedFields);

    const mod = itemDefinition.getParentModule();
    const moduleTable = mod.getQualifiedPathName();
    const selfTable = itemDefinition.getQualifiedPathName();

    const id = resolverArgs.args.id;
    const userIdData = await knex.select("user_id").from(moduleTable).where({
      id,
      blocked_at: null,
      type: selfTable,
    });
    const userId = userIdData[0] && userIdData[0].user_id;
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
