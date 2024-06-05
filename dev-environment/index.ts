/**
 * Contains the functionality for executing the development environment based on some config
 * 
 * @module
 */

import fs from "fs";
const fsAsync = fs.promises;
import path from "path";
import { IDBConfigRawJSONDataType, IRedisConfigRawJSONDataType, IConfigRawJSONDataType } from "../config";
import { ensureConfigDirectory } from "../setup";
import { readConfigFile } from "../setup";
import colors from "colors";
import { execSudo } from "../setup/exec";
import equals from "deep-equal";

const ELASTIC_VERSION = process.env.ELASTIC_VERSION || "8.2.0";
const REDIS_VERSION = process.env.REDIS_VERSION || "";
const POSTGIS_VERSION = process.env.POSTGIS_VERSION || "13-3.4";

/**
 * this function is triggered by the main.ts file and passes its argument
 * its configuration is there, check the main.ts file for modification on how
 * this function is triggered and what parameters it needs
 * 
 * @param version the version param
 */
export async function start(version: string) {
  // first we ensure the config directory exists
  await ensureConfigDirectory();

  // now we need our standard generic config
  const standardConfig: IConfigRawJSONDataType = await readConfigFile("index.json");
  // we will use our app name for docker prefixing
  const dockerprefixer = standardConfig.appName.replace(/\s/g, "_").toLowerCase();

  // we need database and redis configuration
  const dbConfig: IDBConfigRawJSONDataType =
    await readConfigFile(version === "development" ? "db.sensitive.json" : `db.${version}.sensitive.json`);
  const redisConfig: IRedisConfigRawJSONDataType =
    await readConfigFile(version === "development" ? "redis.sensitive.json" : `redis.${version}.sensitive.json`);

  // now we check if the devenv folder exist
  let devEnvFolderExists = true;
  try {
    await fsAsync.access("devenv", fs.constants.F_OK);
  } catch (e) {
    devEnvFolderExists = false;
  }
  // and if not we create it
  if (!devEnvFolderExists) {
    await fsAsync.mkdir("devenv");
  }

  // and the pgdata folder within it
  let pgDataFolderExists = true;
  try {
    await fsAsync.access(path.join("devenv", "pgdata"), fs.constants.F_OK);
  } catch (e) {
    pgDataFolderExists = false;
  }
  // we need to ensure it as well
  if (!pgDataFolderExists) {
    await fsAsync.mkdir(path.join("devenv", "pgdata"));
  }

  try {
    // and we execute this command with the configuration
    // it will execute for localhost of course
    console.log(colors.yellow("Please allow Itemize to create a network"));
    await execSudo(
      `docker network create ${dockerprefixer}_network`,
      "Itemize Docker Network Creator",
    );
  } catch (err) {
    // if something fails show a message
    console.log(colors.red(err.message));
    console.log(colors.yellow("Something went wrong please allow for cleanup..."));
    try {
      await execSudo(
        `docker network rm ${dockerprefixer}_network`,
        "Itemize Docker Network Creator",
      );
    } catch {
    }
    throw err;
  }

  // so because this is a devenv the config in order to make sense
  // should be in localhost
  if (
    dbConfig.host !== "localhost" &&
    dbConfig.host !== "127.0.0.1"
  ) {
    // otherwise we log this can't work
    console.log(colors.red("Development environment database is not set to localhost but to ") + dbConfig.host);
    console.log(colors.red("As so it cannot be executed"));
  } else {
    // otherwise yes we can do itt
    console.log(colors.yellow("Please allow Itemize to create a docker container for the database"));
    console.log(colors.yellow("The execution might take a while, please wait..."));

    // and for such we need to first know where we are, we need an absolute path for all this
    try {
      // and we execute this command with the configuration
      // it will execute for localhost of course
      await execSudo(
        `docker run --net ${dockerprefixer}_network --name ${dockerprefixer}_devdb -e POSTGRES_PASSWORD=${dbConfig.password} ` +
        `-e POSTGRES_USER=${dbConfig.user} -e POSTGRES_DB=${dbConfig.database} ` +
        `-v "$PWD/devenv/pgdata":/var/lib/postgresql/data ` +
        `-p ${dbConfig.port}:5432 -d postgis/postgis:${POSTGIS_VERSION}`,
        "Itemize Docker Contained PGSQL Postgis Enabled Database",
      );
    } catch (err) {
      // if something fails show a message
      console.log(colors.red(err.message));
      console.log(colors.yellow("Something went wrong please allow for cleanup..."));
      try {
        await execSudo(
          `docker rm ${dockerprefixer}_devdb`,
          "Itemize Docker Contained PGSQL Postgis Enabled Database",
        );
      } catch {
      }
      throw err;
    }
  }

  if (dbConfig.elastic) {
    const elasticNode = dbConfig.elastic.node;
    const proxy = dbConfig.elastic.proxy;
    if (proxy) {
      console.log(colors.red("Development environment elastic database is setup woth a proxy at ") + proxy);
      console.log(colors.red("As so it cannot be initialized"));
    } else if (elasticNode) {
      let elasticURL = typeof elasticNode === "string" || (elasticNode instanceof URL) ? elasticNode : elasticNode.url;
      if (typeof elasticURL === "string") {
        elasticURL = new URL(elasticURL);
      }
      if (elasticURL) {
        const hostname = (elasticURL as URL).hostname;
        const port = (elasticURL as URL).port;
        const protocol = (elasticURL as URL).protocol;
        const username = dbConfig.elastic.auth && dbConfig.elastic.auth.username;
        const password = dbConfig.elastic.auth && dbConfig.elastic.auth.password;
        if ((hostname === "localhost" || hostname === "127.0.0.1") && protocol === "https:" && username === "elastic") {
          console.log(colors.yellow("Please allow Itemize to create a docker container for elasticsearch"));
          console.log(colors.yellow("The execution might take a while, please wait..."));

          try {
            // and we execute this command with the configuration
            // it will execute for localhost of course
            await execSudo(
              "sysctl -w vm.max_map_count=262144",
              "Itemize Sysctl setup for elasticsearch",
            );
            await execSudo(
              `docker run --net ${dockerprefixer}_network --name ${dockerprefixer}_devedb -e ELASTIC_PASSWORD=${password} ` +
              `-e "ES_JAVA_OPTS=-Xms4g -Xmx4g" ` +
              `-p ${port}:9200 -d docker.elastic.co/elasticsearch/elasticsearch:${ELASTIC_VERSION}`,
              "Itemize Docker Contained Elasticsearch Database",
            );
          } catch (err) {
            // if something fails show a message
            console.log(colors.red(err.message));
            console.log(colors.yellow("Something went wrong please allow for cleanup..."));
            try {
              await execSudo(
                `docker rm ${dockerprefixer}_devedb`,
                "Itemize Docker Contained Elasticsearch Database",
              );
            } catch {
            }
            throw err;
          }
        } else if (hostname !== "localhost" && hostname !== "127.0.0.1") {
          console.log(colors.red("Development environment elastic database host is connecting to ") + hostname);
          console.log(colors.red("As so it cannot be initialized"));
        } else if (username !== "elastic") {
          console.log(colors.red("Development environment elastic database is using username (should be elastic) ") + username);
          console.log(colors.red("As so it cannot be initialized"));
        } else if (protocol !== "https:") {
          console.log(colors.red("Development environment elastic database host is using protocol ") + protocol);
          console.log(colors.red("As so it cannot be initialized"));
        }
      } else {
        console.log(colors.red("Development environment elastic database node has no url to connect to"));
        console.log(colors.red("As so it cannot be initialized"));
      }
    } else {
      console.log(colors.red("Development environment elastic database does not have a single node setup, it may have no node or multinode"));
      console.log(colors.red("As so it cannot be initialized"));
    }
  }

  // now we need to check fr this, we have global, pubsub and local cache
  // which we all need, for development, we should usually use a single instance
  // the devenv uses the global as reference

  // so if the local doesn't equal something's odd
  if (!equals(redisConfig.cache, redisConfig.global)) {
    console.log(colors.red("The dev environment uses a single redis instance (the global), yet cache and global do not match, this will cause issues"));
  }

  // if the pubsub doesn't equal it's also odd for a development environment
  if (!equals(redisConfig.pubSub, redisConfig.global)) {
    console.log(colors.red("The dev environment uses a single redis instance (the global), yet pubSub and global do not match, this will cause issues"));
  }

  // so we use the global as a reference
  // but if it's not localhost there's no much we can do about it
  if (
    redisConfig.global.host !== "localhost" &&
    redisConfig.global.host !== "127.0.0.1"
  ) {
    // so we show the message
    console.log(colors.red("Development environment redis is not set to localhost but to ") + redisConfig.global.host);
    console.log(colors.red("As so it cannot be executed"));
  } else if (
    redisConfig.global.password
  ) {
    // password protection is also not supported for the development environment
    console.log(colors.red("Development environment with redis is set with a password protection"));
    console.log(colors.red("As so it cannot be executed"));
  } else if (
    redisConfig.global.path
  ) {
    // path, not supported as well
    console.log(colors.red("Development environment with redis is set with an unix socket"));
    console.log(colors.red("As so it cannot be executed"));
  } else {
    // otherwise we are good to go
    console.log(colors.yellow("Please allow Itemize to create a docker container for redis"));
    console.log(colors.yellow("The execution might take a while, please wait..."));

    // and we attempt to execute
    try {
      await execSudo(
        `docker run --net ${dockerprefixer}_network --name ${dockerprefixer}_devredis ` +
        `-p ${redisConfig.global.port}:6379 -d redis${REDIS_VERSION ? ":" + REDIS_VERSION : ""}`,
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

/**
 * This function is what is used to stop the development environment
 * check the main.ts file to see how this is called
 *
 * @param version the version to stop for
 */
export async function stop(version: string) {
  // we read all this information just like in start
  const standardConfig: IConfigRawJSONDataType = await readConfigFile("index.json");
  const dockerprefixer = standardConfig.appName.replace(/\s/g, "_").toLowerCase();

  // the dbconfig and redis
  const dbConfig: IDBConfigRawJSONDataType =
    await readConfigFile(version === "development" ? "db.sensitive.json" : `db.${version}.sensitive.json`);
  const redisConfig: IRedisConfigRawJSONDataType =
    await readConfigFile(version === "development" ? "redis.sensitive.json" : `redis.${version}.sensitive.json`);

  // we can only stop for localhost
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
    dbConfig.elastic
  ) {
    const elasticNode = dbConfig.elastic.node;
    const proxy = dbConfig.elastic.proxy;
    const username = dbConfig.elastic.auth && dbConfig.elastic.auth.username;

    if (!proxy && elasticNode && username === "elastic") {
      let elasticURL = typeof elasticNode === "string" || (elasticNode instanceof URL) ? elasticNode : elasticNode.url;
      if (typeof elasticURL === "string") {
        elasticURL = new URL(elasticURL);
      }

      if (elasticURL) {
        const hostname = (elasticURL as URL).hostname;
        const protocol = (elasticURL as URL).protocol;

        if ((hostname === "localhost" || hostname === "127.0.0.1") && protocol === "https:") {
          try {
            console.log(colors.yellow("Please allow Itemize to stop the Elastic docker container"));
            await execSudo(
              `docker stop ${dockerprefixer}_devedb`,
              "Itemize Docker Contained Elasticsearch Database",
            );
      
            console.log(colors.yellow("Now we attempt to remove the Elastic docker container"));
            await execSudo(
              `docker rm ${dockerprefixer}_devedb`,
              "Itemize Docker Contained Elasticsearch Database",
            );
          } catch (err) {
          }
        }
      }
    }
  }

  // same for redis
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

  try {
    console.log(colors.yellow("Please allow Itemize to remove the development network"));
    await execSudo(
      `docker network rm ${dockerprefixer}_network`,
      "Itemize Docker Network",
    );
  } catch (err) {
  }
}
