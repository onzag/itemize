import fs from "fs";
const fsAsync = fs.promises;
import path from "path";
import { IDBConfigRawJSONDataType, IRedisConfigRawJSONDataType, IConfigRawJSONDataType } from "../config";
import { ensureConfigDirectory } from "../setup";
import { readConfigFile } from "../setup";
import colors from "colors";
import { execSudo } from "../setup/exec";
import equals from "deep-equal";

export async function start(version: string) {
  await ensureConfigDirectory();

  const standardConfig: IConfigRawJSONDataType = await readConfigFile("index.json");
  const dockerprefixer = standardConfig.appName.replace(/\s/g, "_").toLowerCase();

  const dbConfig: IDBConfigRawJSONDataType =
    await readConfigFile(version === "development" ? "db.sensitive.json" : `db.${version}.sensitive.json`);
  const redisConfig: IRedisConfigRawJSONDataType =
    await readConfigFile(version === "development" ? "redis.sensitive.json" : `redis.${version}.sensitive.json`);

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
    dbConfig.host !== "localhost" &&
    dbConfig.host !== "127.0.0.1"
  ) {
    console.log(colors.red("Development environment database is not set to localhost but to ") + dbConfig.host);
    console.log(colors.red("As so it cannot be executed"));
  } else {
    console.log(colors.yellow("Please allow Itemize to create a docker container for the database"));
    console.log(colors.yellow("The execution might take a while, please wait..."));
    try {
      const absPath = path.resolve("./node_modules/@onzag/itemize/dev-environment/pgsqlpostgis");
      await execSudo(
        `docker build -t pgsqlpostgis ${absPath}`,
        "Itemize Docker Contained PGSQL Postgis Enabled Database",
      );
      await execSudo(
        `docker run --name ${dockerprefixer}_devdb -e POSTGRES_PASSWORD=${dbConfig.password} ` +
        `-e POSTGRES_USER=${dbConfig.user} -e POSTGRES_DB=${dbConfig.database} ` +
        `-v "$PWD/devenv/pgdata":/var/lib/postgresql/data ` +
        `-p ${dbConfig.port}:5432 -d pgsqlpostgis`,
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

  if (!equals(redisConfig.cache, redisConfig.global)) {
    console.log(colors.red("The dev environment uses a single redis instance (the global), yet cache and global do not match, this will cause issues"));
  }

  if (!equals(redisConfig.pubSub, redisConfig.global)) {
    console.log(colors.red("The dev environment uses a single redis instance (the global), yet pubSub and global do not match, this will cause issues"));
  }

  if (
    redisConfig.global.host !== "localhost" &&
    redisConfig.global.host !== "127.0.0.1"
  ) {
    console.log(colors.red("Development environment redis is not set to localhost but to ") + redisConfig.global.host);
    console.log(colors.red("As so it cannot be executed"));
  } else if (
    redisConfig.global.password
  ) {
    console.log(colors.red("Development environment with redis is set with a password protection"));
    console.log(colors.red("As so it cannot be executed"));
  } else if (
    redisConfig.global.path
  ) {
    console.log(colors.red("Development environment with redis is set with an unix socket"));
    console.log(colors.red("As so it cannot be executed"));
  } else {
    console.log(colors.yellow("Please allow Itemize to create a docker container for redis"));
    console.log(colors.yellow("The execution might take a while, please wait..."));
    try {
      await execSudo(
        `docker run --name ${dockerprefixer}_devredis ` +
        `-p ${redisConfig.global.port}:6379 -d redis`,
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

export async function stop(version: string) {
  const standardConfig: IConfigRawJSONDataType = await readConfigFile("index.json");
  const dockerprefixer = standardConfig.appName.replace(/\s/g, "_").toLowerCase();

  const dbConfig: IDBConfigRawJSONDataType =
    await readConfigFile(version === "development" ? "db.sensitive.json" : `db.${version}.sensitive.json`);
  const redisConfig: IRedisConfigRawJSONDataType =
    await readConfigFile(version === "development" ? "redis.sensitive.json" : `redis.${version}.sensitive.json`);

  if (
    dbConfig.host === "localhost" ||
    dbConfig.host === "127.0.0.1"
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
      redisConfig.global.host === "localhost" ||
      redisConfig.global.host === "127.0.0.1"
    ) &&
    !redisConfig.global.password &&
    !redisConfig.global.path
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