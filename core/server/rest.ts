import { IAppDataType } from ".";
import express from "express";
import http from "http";
import path from "path";
import Module from "../base/Root/Module";
import { serverSideIndexChecker } from "../base/Root/Module/ItemDefinition/PropertyDefinition/sql";
import PropertyDefinition from "../base/Root/Module/ItemDefinition/PropertyDefinition";
import ItemDefinition from "../base/Root/Module/ItemDefinition";
import bodyParser from "body-parser";

export default function restServices(appData: IAppDataType) {
  const router = express.Router();

  router.use(bodyParser.json());

  async function routerIndexChecker(property: PropertyDefinition, req: express.Request, res: express.Response) {
    res.setHeader("content-type", "application/json; charset=utf-8");

    const value: any = req.body;
    const definition = property.getPropertyDefinitionDescription();
    if (definition.json && typeof value !== definition.json) {
      res.status(400);
      res.end("Invalid Input");
      return;
    }
    if (definition.validate) {
      const invalidReason = definition.validate(
        value,
        property.getSubtype(),
      );
      if (invalidReason) {
        res.status(400);
        res.end("Invalid Input");
        return;
      }
    }
    const isValid = await serverSideIndexChecker(appData.knex, property, value);
    res.end(JSON.stringify(isValid));
  }

  function buildRouteForProperty(qualifiedPath: string, property: PropertyDefinition) {
    if (property.isUnique()) {
      router.post(
        "/index-check/" + qualifiedPath + "/" + property.getId(),
        routerIndexChecker.bind(null, property),
      );
    }
  }

  function buildRouteForItemDefinition(idef: ItemDefinition) {
    idef.getAllPropertyDefinitions().forEach((pd) => {
      buildRouteForProperty(idef.getQualifiedPathName(), pd);
    });

    idef.getChildDefinitions().forEach(buildRouteForItemDefinition);
  }

  function buildRouteForModule(mod: Module) {
    mod.getAllPropExtensions().forEach((pe) => {
      buildRouteForProperty(mod.getQualifiedPathName(), pe);
    });

    mod.getAllModules().forEach(buildRouteForModule);
    mod.getAllChildItemDefinitions().forEach(buildRouteForItemDefinition);
  }

  router.get("/util/country", (req, res) => {
    res.setHeader("content-type", "application/json; charset=utf-8");

    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    // This only occurs during development
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
      res.end(JSON.stringify({
        country: "FI",
        currency: "EUR",
        language: "en",
      }));
    });
  });

  router.get("/rest/resource/:resource", (req, res) => {
    const resourceName: string = req.params.resource;
    if (resourceName.indexOf("..") !== -1) {
      res.setHeader("Content-Type", "text/plain");
      res.end("Uh! uh! :) Directory Traversal Attack Denied :D");
    }
    res.sendFile(path.resolve(__dirname + `../../../data/${req.params.resource}`));
  });

  appData.root.getAllModules().forEach(buildRouteForModule);

  return router;
}
