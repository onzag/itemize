/**
 * File is used to perform testing for the live connections to the databases
 * and clusters that are running within the system
 */

import { DatabaseConnection } from "../database";
import { IDBConfigRawJSONDataType } from "../config";
import { IRedisConfigRawJSONDataType } from "../config";
import fs from "fs";
import path from "path";
import redis, { RedisClient } from "redis";
import { Client } from "@elastic/elasticsearch";
const fsAsync = fs.promises;

import colors from "colors";

/**
 * Runs the connection test
 * @param version the version to check, whether developent or production
 */
export default async function runConTest(version: string) {
  if (version !== "development" && version !== "production") {
    throw new Error("Unknown version to test: " + version + " should be development or production");
  }

  // let's get the db config that we use to connect
  const dbConfigToUse = version === "development" ? "db.sensitive.json" : `db.${version}.sensitive.json`;
  const redisConfigToUse = version === "development" ? "redis.sensitive.json" : `redis.${version}.sensitive.json`;

  // parse the files from their paths
  const dbConfig: IDBConfigRawJSONDataType = JSON.parse(await fsAsync.readFile(path.join("config", dbConfigToUse), "utf-8"));
  const redisConfig: IRedisConfigRawJSONDataType = JSON.parse(await fsAsync.readFile(path.join("config", redisConfigToUse), "utf-8"));

  Object.keys(redisConfig.cache).forEach((key) => {
    if (redisConfig.cache[key] === null) {
      delete redisConfig.cache[key];
    }
  });
  Object.keys(redisConfig.pubSub).forEach((key) => {
    if (redisConfig.pubSub[key] === null) {
      delete redisConfig.pubSub[key];
    }
  });
  Object.keys(redisConfig.global).forEach((key) => {
    if (redisConfig.global[key] === null) {
      delete redisConfig.global[key];
    }
  });

  const dbConnectionConfig = {
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
  };


  console.log("Attempting to connect to postgreSQL database at " + dbConnectionConfig.host + ":" + dbConnectionConfig.port +
    ", at database " + dbConnectionConfig.database + ", with user " + dbConnectionConfig.user);

  // make a db connection and run a test
  const dbConnection = new DatabaseConnection(dbConnectionConfig);

  let schemaTableExists: any = null;
  try {
    schemaTableExists = (await dbConnection.queryFirst(
      `SELECT EXISTS(SELECT * FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'schema') AS "exists"`,
    )).exists;
  } catch (err) {
    console.log(colors.red(err.stack));
    console.log(colors.red("Failed to perform a SQL query"));
    throw err;
  }

  if (!schemaTableExists) {
    console.log(colors.red("Did not find a schema table, was the database ever built?"));
    process.exit(1);
  } else {
    console.log(colors.green("Successfully performed a select query"));
  }

  // now try to test redis
  console.log("Attempting to connect to global redis");

  try {
    const globalRedis = redisConfig.global;
    const globalClient = redis.createClient(globalRedis);
    await testRedisClient(globalClient);
    globalClient.quit();
  } catch (err) {
    console.log(colors.red(err.stack));
    console.log("Failed to connect to the global redis service");
    process.exit(1);
  }

  console.log(colors.green("Successfully connected to global redis"));

  console.log("Attempting to connect to global pub sub redis");

  try {
    const pubSubRedis = redisConfig.pubSub;
    const pubSubClient = redis.createClient(pubSubRedis);
    await testRedisClient(pubSubClient);
    pubSubClient.quit();
  } catch (err) {
    console.log(colors.red(err.stack));
    console.log("Failed to connect to the pub sub redis service");
    process.exit(1);
  }

  console.log(colors.green("Successfully connected to pub sub redis"));

  console.log("Attempting to connect to cluster cache redis");

  try {
    const clusterRedis = redisConfig.cache;
    const clusterClient = redis.createClient(clusterRedis);
    await testRedisClient(clusterClient);
    clusterClient.quit();
  } catch (err) {
    console.log(colors.red(err.stack));
    console.log("Failed to connect to the local cache redis service");
    process.exit(1);
  }

  console.log(colors.green("Successfully connected to local redis"));

  // if we have elastic available
  if (dbConfig.elastic) {
    // we check it as well
    console.log("Attempting to connect to elasticsearch");

    try {
      // doing a ping pong
      const client = new Client(dbConfig.elastic);
      const pong = await client.ping({}, {
        requestTimeout: 3000,
      });

      if (pong) {
        console.log(colors.green("Succesfully received an elastic reply"));
      }
    } catch (err) {
      console.log(colors.red(err.stack));
      if (err.meta?.statusCode === 0) {
        console.log(colors.yellow("If the connection was dropped due to invalid certificate, this means that you need to install the certificate, " + 
        "in the client machine for https connections, NODE_TLS_REJECT_UNAUTHORIZED=0 is not recommended to use in production"));
        console.log(colors.yellow("A valid option is to use NODE_EXTRA_CA_CERTS=/path/to/cert.crt but it also needs to be added to the service files"));
      }
      console.log(colors.red("Failed to connect to elasticsearch"));
      process.exit(1);
    }
  }

  console.log(colors.green("ALL TESTS PASSED"));
}

/**
 * Tiny function to test a redis client to see if it even connects
 * @param client 
 * @returns a void promise
 */
async function testRedisClient(client: RedisClient) {
  return new Promise<void>((resolve, reject) => {
    client.on("connect", () => {
      resolve();
    });
    client.on("error", (err) => {
      reject(err);
    });
  });
}