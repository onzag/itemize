import { IGraphQLResolversType, ISQLTableRowValue } from "../base/Root";
import fs from "fs";
import path from "path";
import Knex from "knex";
import graphqlFields from "graphql-fields";
import { CONNECTOR_SQL_COLUMN_FK_NAME, RESERVED_BASE_PROPERTIES_SQL, PREFIX_BUILD } from "../constants";

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
(async () => {
  // Retrieve the config for the database
  const dbConfig = JSON.parse(await fsAsync.readFile(
    path.join("config", "db.json"),
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

const resolvers: IGraphQLResolversType = {
  async getItemDefinition(resolverArgs, itemDefinition) {
    const requestedFields = graphqlFields(resolverArgs.info);
    const requestedFieldsSQL = buildColumnNames(requestedFields);

    // TODO moderation fields blocking of retrieving
    // TODO blocked_at check if allows

    const mod = itemDefinition.getParentModule();
    const moduleTable = mod.getQualifiedPathName();
    const selfTable = itemDefinition.getQualifiedPathName();
    const requiresJoin = requestedFieldsSQL.some((columnName) =>
      !RESERVED_BASE_PROPERTIES_SQL[columnName] && !mod.hasPropExtensionFor(columnName));

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
    const requestedFields = graphqlFields(resolverArgs.info);
    const requestedFieldsSQL = buildColumnNames(requestedFields);

    const mod = itemDefinition.getParentModule();
    const moduleTable = mod.getQualifiedPathName();
    const selfTable = itemDefinition.getQualifiedPathName();
    const requiresJoin = requestedFieldsSQL.some((columnName) =>
      !RESERVED_BASE_PROPERTIES_SQL[columnName] && !mod.hasPropExtensionFor(columnName));

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

    const baseResult: ISQLTableRowValue[] = await searchQuery;
    return baseResult.map((row) => itemDefinition.convertSQLValueToGQLValue(row, requestedFields));
  },
  async searchModule(resolverArgs, mod) {
    const requestedFields = graphqlFields(resolverArgs.info);
    const requestedFieldsSQL = buildColumnNames(requestedFields);

    let allItemDefinitionsInvolved = mod.getAllChildItemDefinitionsRecursive();
    if (resolverArgs.args.types) {
      allItemDefinitionsInvolved = allItemDefinitionsInvolved.filter((idef) => {
        return resolverArgs.args.types.includes(idef.getQualifiedPathName);
      });
    }

    const builderQuery = knex.select(requestedFieldsSQL).from(mod.getQualifiedPathName()).where({
      blocked_at: null,
    });
    mod.buildSQLQueryFrom(resolverArgs.args, builderQuery);

    const baseResult: ISQLTableRowValue[] = await builderQuery;
    return baseResult.map((row) => mod.convertSQLValueToGQLValue(row, requestedFields));
  },
  async addItemDefinition(resolverArgs, itemDefinition) {
    const requestedFields = graphqlFields(resolverArgs.info);
    const requestedFieldsSQL = buildColumnNames(requestedFields);

    // TODO moderation fields blocking of setting the fields

    const mod = itemDefinition.getParentModule();
    const moduleTable = mod.getQualifiedPathName();
    const selfTable = itemDefinition.getQualifiedPathName();

    // TODO some of this data needs to be gotten from the token
    // TODO validation
    const sqlIdefData: any = itemDefinition.convertGQLValueToSQLValue(resolverArgs.args, knex.raw);
    const sqlModData: any = itemDefinition.getParentModule().convertGQLValueToSQLValue(resolverArgs.args, knex.raw);
    sqlModData.type = selfTable;
    sqlModData.created_at = knex.fn.now();
    // TODO user super, locale, fts_language
    sqlModData.created_by = 1;
    sqlModData.locale = "en";
    sqlModData.fts_language = "en";

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
    sqlIdefData.MODULE_ID = insertQueryValueMod[0].id;
    const insertQueryValueIdef = await knex(selfTable).insert(sqlIdefData).returning(requestedIdefColumnsSQL);
    const value = {
      ...insertQueryValueMod[0],
      ...insertQueryValueIdef[0],
    };
    return itemDefinition.convertSQLValueToGQLValue(value, requestedFields);
  },
  async editItemDefinition(resolverArgs, itemDefinition) {
    // TODO optimization
    const requestedFields = graphqlFields(resolverArgs.info);
    console.log(requestedFields);

    // TODO moderation reasons blocking of edit and gather of the fields

    // TODO some of this data needs to be gotten from the token
    // TODO validation
    const sqlData: any = itemDefinition.convertGQLValueToSQLValue(resolverArgs.args, knex.raw);

    // TODO check permissions for edit

    // TODO this is messed up

    const insertQueryValue = await knex(itemDefinition.getQualifiedPathName()).update(sqlData).where({
      id: resolverArgs.args.id,
      blocked_at: null,
    });
    return insertQueryValue[0];
  },
  async deleteItemDefinition(resolverArgs, itemDefinition) {
    // TODO optimization
    const requestedFields = graphqlFields(resolverArgs.info);
    console.log(requestedFields);

    // TODO fix this query too, we need to join as well, do not rely in cascade
    const deleteQueryValue: ISQLTableRowValue[] =
      await knex(itemDefinition.getParentModule().getQualifiedPathName()).where({
        id: resolverArgs.args.id,
        blocked_at: null,
      }).delete("*");

    if (!deleteQueryValue.length) {
      return null;
    }

    return itemDefinition.convertSQLValueToGQLValue(deleteQueryValue[0], null);
  },
};

export default resolvers;
