import express from "express";
import graphqlHTTP from "express-graphql";
import http from "http";
import path from "path";
import fs from "fs";
import Root from "../base/Root";
import resolvers from "./resolvers";
import { getGQLSchemaForRoot } from "../base/Root/gql";
import Knex from "knex";
const fsAsync = fs.promises;

const app = express();

export interface IAppDataType {
  root: Root;
  index: string;
  countries: any;
  config: any;
  knex: Knex;
}

function initializeApp(appData: IAppDataType) {

  app.use((req, res, next) => {
    res.removeHeader("X-Powered-By");
    next();
  });

  app.use("/graphql", graphqlHTTP({
    schema: getGQLSchemaForRoot(appData.root, resolvers(appData)),
    graphiql: true,
  }));

  app.get("/util/country", (req, res) => {
    // Only occurs during development
    res.setHeader("content-type", "application/json; charset=utf-8");

    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    if (ip === "127.0.0.1" || ip === "::1" || ip === "::ffff:127.0.0.1") {
      res.end(JSON.stringify({
        country: "FI",
        currency: "EUR",
        language: "fi",
      }));
      return;
    }

    // Occurs during production
    http.get(`http://api.ipstack.com/${ip}?access_key=${appData.config.ipStackAccessKey}`, (resp) => {
      let data = "";
      resp.on("data", (chunk) => {
        data += chunk;
      });
      resp.on("end", () => {
        const parsedData = JSON.parse(data);
        res.end(JSON.stringify({
          country: parsedData.country_code,
          currency: appData.countries[parsedData.country_code] ? appData.countries[parsedData.country_code].currency || "EUR" : "EUR",
          language: parsedData.languages[0] ? parsedData.languages[0].code :
            (appData.countries[parsedData.country_code] ? appData.countries[parsedData.country_code].languages[0] || "en" : "en"),
        }));
      });
    }).on("error", (err) => {
      res.end("EN");
    });
  });

  app.get("/resource/:resource", (req, res) => {
    const resourceName: string = req.params.resource;
    if (resourceName.indexOf("..") !== -1) {
      res.setHeader("Content-Type", "text/plain");
      res.end("Uh! uh! :) Directory Traversal Attack Denied :D");
    }
    res.sendFile(path.resolve(__dirname + `../../../data/${req.params.resource}`));
  });

  app.get("*", (req, res) => {
    res.setHeader("content-type", "text/html; charset=utf-8");
    res.end(appData.index);
  });
}

(async () => {
  let rawBuild: string;
  let config: any;
  let countries: any;
  let index: any;
  let build: any;
  let root: any;
  [config, countries, index, rawBuild] = await Promise.all([
    fsAsync.readFile("./dist/config.json", "utf8"),
    fsAsync.readFile("./dist/data/countries.json", "utf8"),
    fsAsync.readFile("./dist/data/index.html", "utf8"),
    fsAsync.readFile("./dist/data/build.en.json", "utf8"),
  ]);
  config = JSON.parse(config);
  countries = JSON.parse(countries);
  build = JSON.parse(rawBuild);
  root = new Root(build.root);

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
  const knex = Knex({
    client: "pg",
    debug: process.env.NODE_ENV !== "production",
    connection: dbConnectionKnexConfig,
  });

  initializeApp({
    root,
    index,
    countries,
    config,
    knex,
  });

  http.createServer(app).listen(config.port, () => {
    console.log("listening at", config.port);
  });
})();
