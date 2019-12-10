import { IAppDataType } from ".";
import express from "express";
import http from "http";
import path from "path";
import Module from "../base/Root/Module";
import { serverSideIndexChecker } from "../base/Root/Module/ItemDefinition/PropertyDefinition/server-checkers";
import PropertyDefinition from "../base/Root/Module/ItemDefinition/PropertyDefinition";
import ItemDefinition from "../base/Root/Module/ItemDefinition";
import bodyParser from "body-parser";
import { countries } from "../resources";
import { IAutocompleteOutputType } from "../base/Autocomplete";

// TODO comment and document

export default function restServices(appData: IAppDataType) {
  const router = express.Router();
  const bodyParserJSON = bodyParser.json({
    strict: false,
  });

  router.use((req, res, next) => {
    bodyParserJSON(req, res, (err) => {
      if (err) {
        res.status(400);
        res.end("Malformed JSON");
      } else {
        next();
      }
    });
  });

  async function routerIndexChecker(property: PropertyDefinition, req: express.Request, res: express.Response) {
    const value: any = req.body.value;
    const id: number = req.body.id;
    if (typeof id !== "number" && id !== null) {
      res.status(400);
      res.end("Invalid Input on id");
      return;
    }
    const definition = property.getPropertyDefinitionDescription();

    if (definition.json && typeof value !== definition.json) {
      res.status(400);
      res.end("Invalid Input on value");
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
    res.setHeader("content-type", "application/json; charset=utf-8");
    const isValid = await serverSideIndexChecker(appData.knex, property, value, id);
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
          currency: countries[parsedData.country_code] ? countries[parsedData.country_code].currency || "EUR" : "EUR",
          language: parsedData.languages[0] ? parsedData.languages[0].code :
            (countries[parsedData.country_code] ? countries[parsedData.country_code].languages[0] || "en" : "en"),
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

  router.get("/resource/:resource", (req, res) => {
    const resourceName: string = req.params.resource;
    if (resourceName.indexOf("..") !== -1) {
      res.setHeader("Content-Type", "text/plain");
      res.end("Uh! uh! :) Directory Traversal Attack Denied :D");
    }
    res.sendFile(path.resolve(__dirname + `../../../data/${req.params.resource}`));
  });

  appData.root.getAllModules().forEach(buildRouteForModule);

  appData.autocompletes.forEach((autocomplete) => {
    router.post("/autocomplete/" + autocomplete.getName() + "/", (req, res) => {
      const languageLocale: string = req.body.lang;
      const query: string = req.body.query;
      const filters: any = req.body.filters || {};

      if (typeof languageLocale !== "string" && typeof languageLocale !== "undefined" && languageLocale !== null) {
        res.status(400);
        res.end("Invalid Input on lang");
        return;
      }

      if (typeof query !== "string") {
        res.status(400);
        res.end("Invalid Input on query");
        return;
      }

      let results: IAutocompleteOutputType[];
      if (languageLocale) {
        results = autocomplete.findI18nRecommendations(query, languageLocale, filters);
      } else {
        results = autocomplete.findRecommendations(query, filters);
      }

      res.setHeader("content-type", "application/json; charset=utf-8");
      res.end(JSON.stringify(results));
    });

    router.post("/autocomplete-check/" + autocomplete.getName() + "/", (req, res) => {
      const value: string = req.body.value;
      const filters: any = req.body.filters || {};

      if (typeof value !== "string") {
        res.status(400);
        res.end("Invalid Input on query");
        return;
      }

      res.setHeader("content-type", "application/json; charset=utf-8");
      const isValid = !!autocomplete.findExactValueFor(value, filters);
      res.end(JSON.stringify(isValid));
    });
  });

  router.use((req, res) => {
    res.status(404);
    res.end("Unknown Endpoint");
  });

  return router;
}
