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
import { execAsync } from "../setup/exec";
import equals from "deep-equal";
import { httpRequest } from "../server/request";

const ELASTIC_VERSION = process.env.ELASTIC_VERSION || "8.2.0";
const REDIS_VERSION = process.env.REDIS_VERSION || "";
const POSTGIS_VERSION = process.env.POSTGIS_VERSION || "13-3.4";

const suffixer = {
  elastic: "",
  elasticLogs: "_logs",
  elasticAnalytics: "_analytics",
};

const ports = {
  elastic: 5601,
  elasticLogs: 5602,
  elasticAnalytics: 5603,
};

const pwd = process.cwd();

function wait(n: number) {
  return new Promise((r) => {
    setTimeout(r, n*1000);
  });
}

async function waitForElastic(port: string) {
  await wait(10);
  await httpRequest({
    isHttps: true,
    host: "localhost",
    port,
    method: "GET",
    path: "/_cluster/health?wait_for_status=yellow&timeout=60s",
    maxAttempts: 3,
    maxAttemptsRetryTime: 5000,
    returnNonOk: true,
  });
  await wait(10);
}

/**
 * this function is triggered by the main.ts file and passes its argument
 * its configuration is there, check the main.ts file for modification on how
 * this function is triggered and what parameters it needs
 * 
 * @param version the version param
 */
export async function start(version: string, kibana?: "with-kibana") {
  // first we ensure the config directory exists
  await ensureConfigDirectory();

  const useKibana = !!kibana;

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
    console.log(colors.yellow("Itemize is creating a network"));
    await execAsync(
      `docker network create ${dockerprefixer}_network`,
    );
  } catch (err) {
    // if something fails show a message
    console.log(colors.red(err.message));
    console.log(colors.yellow("Something went wrong please allow for cleanup..."));
    try {
      await execAsync(
        `docker network rm ${dockerprefixer}_network`,
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
    console.log(colors.yellow("Itemize is creating a docker container for the database"));
    console.log(colors.yellow("The execution might take a while, please wait..."));

    // and for such we need to first know where we are, we need an absolute path for all this
    try {
      // and we execute this command with the configuration
      // it will execute for localhost of course
      await execAsync(
        `docker run --net ${dockerprefixer}_network --name ${dockerprefixer}_devdb -e POSTGRES_PASSWORD=${dbConfig.password} ` +
        `-e POSTGRES_USER=${dbConfig.user} -e POSTGRES_DB=${dbConfig.database} ` +
        `-v ${path.join(pwd, "devenv", "pgdata")}:/var/lib/postgresql/data ` +
        `-p ${dbConfig.port}:5432 -d postgis/postgis:${POSTGIS_VERSION}`,
      );
    } catch (err) {
      // if something fails show a message
      console.log(colors.red(err.message));
      console.log(colors.yellow("Something went wrong please allow for cleanup..."));
      try {
        await execAsync(
          `docker rm ${dockerprefixer}_devdb`,
        );
      } catch {
      }
      throw err;
    }
  }

  const allElastics = ["elastic", "elasticLogs", "elasticAnalytics"];
  for (let eVersion of allElastics) {
    if (dbConfig[eVersion]) {
      const elasticNode = dbConfig[eVersion].node;
      const proxy = dbConfig[eVersion].proxy;
      if (proxy) {
        console.log(colors.red("Development environment " + eVersion + " database is setup with a proxy at ") + proxy);
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
          const username = dbConfig[eVersion].auth && dbConfig[eVersion].auth.username;
          const password = dbConfig[eVersion].auth && dbConfig[eVersion].auth.password;
          if ((hostname === "localhost" || hostname === "127.0.0.1") && protocol === "https:" && username === "elastic") {
            console.log(colors.yellow("Itemize is creating a docker container for " + eVersion));
            console.log(colors.yellow("The execution might take a while, please wait..."));

            try {
              await execAsync(
                `docker run --net ${dockerprefixer}_network --name ${dockerprefixer}_devedb${suffixer[eVersion]} -e ELASTIC_PASSWORD=${password} ` +
                `-e "ES_JAVA_OPTS=-Xms4g -Xmx4g" ` +
                `-p ${port}:9200 -d docker.elastic.co/elasticsearch/elasticsearch:${ELASTIC_VERSION}`,
              );
            } catch (err) {
              // if something fails show a message
              console.log(colors.red(err.message));
              console.log(colors.yellow("Something went wrong please allow for cleanup..."));
              try {
                await execAsync(
                  `docker rm ${dockerprefixer}_devedb${suffixer[eVersion]}`,
                );
              } catch {
              }
              throw err;
            }

            if (useKibana) {
              // otherwise we are good to go
              console.log(colors.yellow("Itemize is creating a docker container for kibana " + eVersion));

              console.log(colors.yellow("Waiting until elasticsearch is ready..."));
              await waitForElastic(port);
              console.log(colors.green("Done"));

              console.log(colors.yellow("The execution might take a while, please wait..."));
          
              try {
                await execAsync(
                  `docker exec -t ${dockerprefixer}_devedb${suffixer[eVersion]} /usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token -s kibana`,
                );
              } catch (err) {
                console.log(colors.red(err.message));
                console.log(colors.yellow("Something went wrong when creating the enrollment token..."));
                throw err;
              }
          
              try {
                await execAsync(
                  `docker run --net ${dockerprefixer}_network --name ${dockerprefixer}_devkibana${suffixer[eVersion]} ` +
                  `-p ${ports[eVersion]}:5601 -d docker.elastic.co/kibana/kibana:${ELASTIC_VERSION}`,
                );
              } catch (err) {
                console.log(colors.red(err.message));
                console.log(colors.yellow("Something went wrong when creating kibana, please allow for cleanup..."));
                await execAsync(
                  `docker rm ${dockerprefixer}_devkibana`,
                );
                throw err;
              }

              try {
                await execAsync(
                  `docker logs ${dockerprefixer}_devkibana${suffixer[eVersion]}`,
                );
              } catch (err) {}
            }
          } else if (hostname !== "localhost" && hostname !== "127.0.0.1") {
            console.log(colors.red("Development environment " + eVersion + " database host is connecting to ") + hostname);
            console.log(colors.red("As so it cannot be initialized"));
          } else if (username !== "elastic") {
            console.log(colors.red("Development environment " + eVersion + " database is using username (should be elastic) ") + username);
            console.log(colors.red("As so it cannot be initialized"));
          } else if (protocol !== "https:") {
            console.log(colors.red("Development environment " + eVersion + " database host is using protocol ") + protocol);
            console.log(colors.red("As so it cannot be initialized"));
          }
        } else {
          console.log(colors.red("Development environment " + eVersion + " database node has no url to connect to"));
          console.log(colors.red("As so it cannot be initialized"));
        }
      } else {
        console.log(colors.red("Development environment " + eVersion + " database does not have a single node setup, it may have no node or multinode"));
        console.log(colors.red("As so it cannot be initialized"));
      }
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
    console.log(colors.yellow("Itemize is creating a docker container for redis"));
    console.log(colors.yellow("The execution might take a while, please wait..."));

    // and we attempt to execute
    try {
      await execAsync(
        `docker run --net ${dockerprefixer}_network --name ${dockerprefixer}_devredis ` +
        `-p ${redisConfig.global.port}:6379 -d redis${REDIS_VERSION ? ":" + REDIS_VERSION : ""}`,
      );
    } catch (err) {
      console.log(colors.red(err.message));
      console.log(colors.yellow("Something went wrong please allow for cleanup..."));
      await execAsync(
        `docker rm ${dockerprefixer}_devredis`,
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
      console.log(colors.yellow("Itemize is stopping the PGSQL docker container"));
      await execAsync(
        `docker stop ${dockerprefixer}_devdb`,
      );

      console.log(colors.yellow("Now we attempt to remove the PGSQL docker container"));
      await execAsync(
        `docker rm ${dockerprefixer}_devdb`,
      );
    } catch (err) {
    }
  }

  const allElastics = ["elastic", "elasticLogs", "elasticAnalytics"];
  for (let eVersion of allElastics) {
    if (
      dbConfig[eVersion]
    ) {
      const elasticNode = dbConfig[eVersion].node;
      const proxy = dbConfig[eVersion].proxy;
      const username = dbConfig[eVersion].auth && dbConfig[eVersion].auth.username;

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
              console.log(colors.yellow("Itemize is stopping a potential kibana container"));
              await execAsync(
                `docker stop ${dockerprefixer}_devkibana${suffixer[eVersion]}`,
              );
        
              console.log(colors.yellow("Now we attempt to stop the potential kibana docker container"));
              await execAsync(
                `docker rm ${dockerprefixer}_devkibana${suffixer[eVersion]}`,
              );
            } catch (err) {
            }
            
            try {
              console.log(colors.yellow("Please allow Itemize to stop the Elastic docker container"));
              await execAsync(
                `docker stop ${dockerprefixer}_devedb${suffixer[eVersion]}`,
              );

              console.log(colors.yellow("Now we attempt to remove the Elastic docker container"));
              await execAsync(
                `docker rm ${dockerprefixer}_devedb${suffixer[eVersion]}`,
              );
            } catch (err) {
            }
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
      console.log(colors.yellow("Itemize is stopping the REDIS docker container"));
      await execAsync(
        `docker stop ${dockerprefixer}_devredis`,
      );

      console.log(colors.yellow("Now we attempt to remove the REDIS docker container"));
      await execAsync(
        `docker rm ${dockerprefixer}_devredis`,
      );
    } catch (err) {
    }
  }

  try {
    console.log(colors.yellow("Itemize is removing the development network"));
    await execAsync(
      `docker network rm ${dockerprefixer}_network`,
    );
  } catch (err) {
  }
}
