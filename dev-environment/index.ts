import fs from "fs";
const fsAsync = fs.promises;
import path from "path";
import { IDBConfigRawJSONDataType, IRedisConfigRawJSONDataType, IConfigRawJSONDataType } from "../config";
import { ensureConfigDirectory } from "../setup";
import { readConfigFile } from "../setup";
import colors from "colors";
import { execSudo } from "../setup/exec";
import equals from "deep-equal";

export async function start() {
  await ensureConfigDirectory();

  const standardConfig: IConfigRawJSONDataType = await readConfigFile("index.json");
  const dockerprefixer = standardConfig.appName.replace(/\s/g, "_").toLowerCase();

  const dbConfigDevelopment: IDBConfigRawJSONDataType = await readConfigFile("db.sensitive.json");
  const redisConfigDevelopment: IRedisConfigRawJSONDataType = await readConfigFile("redis.sensitive.json");

  let devEnvFolderExists = true;
  try {
    await fsAsync.access("devenv", fs.constants.F_OK);
  } catch (e) {
    devEnvFolderExists = false;
  }
  if (!devEnvFolderExists) {
    await fsAsync.mkdir("devenv");
  }

  let pgDataFolderExists = true;
  try {
    await fsAsync.access(path.join("devenv", "pgdata"), fs.constants.F_OK);
  } catch (e) {
    pgDataFolderExists = false;
  }
  if (!pgDataFolderExists) {
    await fsAsync.mkdir(path.join("devenv", "pgdata"));
  }

  if (
    dbConfigDevelopment.host !== "localhost" &&
    dbConfigDevelopment.host !== "127.0.0.1"
  ) {
    console.log(colors.red("Development environment database is not set to localhost but to ") + dbConfigDevelopment.host);
    console.log(colors.red("As so it cannot be executed"));
  } else {
    console.log(colors.yellow("Please allow Itemize to create a docker container for the database"));
    console.log(colors.yellow("The execution might take a while, please wait..."));
    try {
      const absPath = path.resolve("./node_modules/itemize/dev-environment/pgsqlpostgis");
      await execSudo(
        `docker build -t pgsqlpostgis ${absPath}`,
        "Itemize Docker Contained PGSQL Postgis Enabled Database",
      );
      await execSudo(
        `docker run --name ${dockerprefixer}_devdb -e POSTGRES_PASSWORD=${dbConfigDevelopment.password} ` +
        `-e POSTGRES_USER=${dbConfigDevelopment.user} -e POSTGRES_DB=${dbConfigDevelopment.database} ` +
        `-v "$PWD/devenv/pgdata":/var/lib/postgresql/data ` +
        `-p ${dbConfigDevelopment.port}:5432 -d pgsqlpostgis`,
        "Itemize Docker Contained PGSQL Postgis Enabled Database",
      );
    } catch (err) {
      console.log(colors.red(err.message));
      console.log(colors.yellow("Something went wrong please allow for cleanup..."));
      await execSudo(
        `docker rm ${dockerprefixer}_devdb`,
        "Itemize Docker Contained PGSQL Postgis Enabled Database",
      );
      throw err;
    }
  }

  if (!equals(redisConfigDevelopment.cache, redisConfigDevelopment.global)) {
    console.log(colors.red("The dev environment uses a single redis instance (the global), yet cache and global do not match, this will cause issues"));
  }

  if (!equals(redisConfigDevelopment.pubSub, redisConfigDevelopment.global)) {
    console.log(colors.red("The dev environment uses a single redis instance (the global), yet pubSub and global do not match, this will cause issues"));
  }

  if (
    redisConfigDevelopment.global.host !== "localhost" &&
    redisConfigDevelopment.global.host !== "127.0.0.1"
  ) {
    console.log(colors.red("Development environment redis is not set to localhost but to ") + redisConfigDevelopment.global.host);
    console.log(colors.red("As so it cannot be executed"));
  } else if (
    redisConfigDevelopment.global.password
  ) {
    console.log(colors.red("Development environment with redis is set with a password protection"));
    console.log(colors.red("As so it cannot be executed"));
  } else if (
    redisConfigDevelopment.global.path
  ) {
    console.log(colors.red("Development environment with redis is set with an unix socket"));
    console.log(colors.red("As so it cannot be executed"));
  } else {
    console.log(colors.yellow("Please allow Itemize to create a docker container for redis"));
    console.log(colors.yellow("The execution might take a while, please wait..."));
    try {
      await execSudo(
        `docker run --name ${dockerprefixer}_devredis ` +
        `-p ${redisConfigDevelopment.global.port}:6379 -d redis`,
        "Itemize Docker Contained REDIS Database",
      );
    } catch (err) {
      console.log(colors.red(err.message));
      console.log(colors.yellow("Something went wrong please allow for cleanup..."));
      await execSudo(
        `docker rm ${dockerprefixer}_devredis`,
        "Itemize Docker Contained REDIS Database",
      );
      throw err;
    }
  }
}

export async function stop() {
  const standardConfig: IConfigRawJSONDataType = await readConfigFile("index.json");
  const dockerprefixer = standardConfig.appName.replace(/\s/g, "_").toLowerCase();

  const dbConfigDevelopment: IDBConfigRawJSONDataType = await readConfigFile("db.sensitive.json");
  const redisConfigDevelopment: IRedisConfigRawJSONDataType = await readConfigFile("redis.sensitive.json");

  if (
    dbConfigDevelopment.host === "localhost" ||
    dbConfigDevelopment.host === "127.0.0.1"
  ) {
    try {
      console.log(colors.yellow("Please allow Itemize to stop the PGSQL docker container"));
      await execSudo(
        `docker stop ${dockerprefixer}_devdb`,
        "Itemize Docker Contained PGSQL Database",
      );

      console.log(colors.yellow("Now we attempt to remove the PGSQL docker container"));
      await execSudo(
        `docker rm ${dockerprefixer}_devdb`,
        "Itemize Docker Contained PGSQL Database",
      );
    } catch (err) {
    }
  }

  if (
    (
      redisConfigDevelopment.global.host === "localhost" ||
      redisConfigDevelopment.global.host === "127.0.0.1"
    ) &&
    !redisConfigDevelopment.global.password &&
    !redisConfigDevelopment.global.path
  ) {
    try {
      console.log(colors.yellow("Please allow Itemize to stop the REDIS docker container"));
      await execSudo(
        `docker stop ${dockerprefixer}_devredis`,
        "Itemize Docker Contained REDIS Database",
      );

      console.log(colors.yellow("Now we attempt to remove the REDIS docker container"));
      await execSudo(
        `docker rm ${dockerprefixer}_devredis`,
        "Itemize Docker Contained REDIS Database",
      );
    } catch (err) {
    }
  }
}