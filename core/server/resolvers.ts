import { IGraphQLResolversType, ISQLTableRowValue } from "../base/Root";
import fs from "fs";
import path from "path";
import Knex from "knex";
import graphqlFields from "graphql-fields";

const fsAsync = fs.promises;

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
    // TODO optimization
    const requestedFields = graphqlFields(resolverArgs.info);
    console.log(requestedFields);

    // TODO moderation fields blocking of retrieving
    // TODO blocked_at check if allows

    const selectQueryValue: ISQLTableRowValue[] =
      await knex.select().from(itemDefinition.getQualifiedPathName()).where({
        id: resolverArgs.args.id,
        blocked_at: null,
      });
    if (!selectQueryValue.length) {
      return null;
    }
    return itemDefinition.convertSQLValueToGQLValue(selectQueryValue[0]);
  },
  async searchItemDefinition(resolverArgs, itemDefinition) {
    // TODO optimization
    const requestedFields = graphqlFields(resolverArgs.info);
    console.log(requestedFields);

    const itemDefinitionSearchMode = itemDefinition.getSearchModeCounterpart();
    itemDefinitionSearchMode.getSQLQueryFor(resolverArgs.args);

    const baseQuery = knex.select().from(itemDefinition.getQualifiedPathName());
    const baseResult: ISQLTableRowValue[] = await baseQuery;
    return baseResult.map((row) => itemDefinition.convertSQLValueToGQLValue(row));
  },
  async addItemDefinition(resolverArgs, itemDefinition) {
    // TODO optimization
    const requestedFields = graphqlFields(resolverArgs.info);
    console.log(requestedFields);

    // TODO moderation fields blocking of setting the fields

    // TODO some of this data needs to be gotten from the token
    // TODO validation
    const sqlData: any = itemDefinition.convertGQLValueToSQLValue(resolverArgs.args, knex.raw);
    sqlData.type = itemDefinition.getQualifiedPathName();
    sqlData.created_at = knex.fn.now();
    // TODO user super, locale, fts_language
    sqlData.created_by = 1;
    sqlData.locale = "en";
    sqlData.fts_language = "en";

    // TODO check permissions for insert

    const insertQueryValue = await knex(itemDefinition.getQualifiedPathName()).insert(sqlData).returning("*");
    return insertQueryValue[0];
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

    const deleteQueryValue: ISQLTableRowValue[] =
      await knex(itemDefinition.getQualifiedPathName()).where({
        id: resolverArgs.args.id,
        blocked_at: null,
      }).delete("*");

    if (!deleteQueryValue.length) {
      return null;
    }

    return itemDefinition.convertSQLValueToGQLValue(deleteQueryValue[0]);
  },
};

export default resolvers;
