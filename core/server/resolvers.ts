import { IGraphQLResolversType } from "../base/Root";
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

    const selectQueryValue: any[] = await knex.select().from(itemDefinition.getQualifiedPathName()).where({
      id: resolverArgs.args.id,
    });
    if (!selectQueryValue.length) {
      return null;
    }
    return itemDefinition.convertSQLValueToGQLValue(selectQueryValue[0]);
  },
  async addItemDefinition(resolverArgs, itemDefinition) {
    // TODO some of this data needs to be gotten from the token
    const sqlData: any = itemDefinition.convertGQLValueToSQLValue(resolverArgs.args);
    sqlData.type = itemDefinition.getQualifiedPathName();
    sqlData.created_at = knex.fn.now();
    sqlData.created_by = 1;
    sqlData.locale = "en";
    sqlData.fts_language = "en";

    const insertQueryValue = await knex(itemDefinition.getQualifiedPathName()).insert(sqlData).returning("*");
    return insertQueryValue[0];
  },
};

export default resolvers;
