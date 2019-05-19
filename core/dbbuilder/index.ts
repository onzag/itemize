import * as fs from "fs";
import * as path from "path";
import * as colors from "colors/safe";
import * as rawKnex from "knex";

const fsAsync = fs.promises;

// Retrieve the config
(async () => {
  const dbConfig = JSON.parse(await fsAsync.readFile(
    path.join("config", "db.json"),
    "utf8",
  ));

  const dbConnectionKnexConfig = {
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
  };

  const knex = rawKnex({
    client: "pg",
    connection: dbConnectionKnexConfig,
  });

  console.log(colors.yellow(`attempting database connection at ${dbConnectionKnexConfig.host}...`));

  console.log(await knex.select("*").from("MOD_user__IDEF_user"));
})();
