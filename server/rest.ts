import { IAppDataType, logger } from ".";
import express from "express";
import path from "path";
import Module from "../base/Root/Module";
import { serverSideIndexChecker } from "../base/Root/Module/ItemDefinition/PropertyDefinition/server-checkers";
import PropertyDefinition from "../base/Root/Module/ItemDefinition/PropertyDefinition";
import ItemDefinition from "../base/Root/Module/ItemDefinition";
import bodyParser from "body-parser";
import { PROTECTED_RESOURCES, ENDPOINT_ERRORS } from "../constants";
import { getMode } from "./mode";

// TODO comment and document

/**
 * this function contains and build all the rest services
 * by returning a router that holds them inside the
 * /rest/ endpoint
 * @param appData the app data that it passes
 */
export default function restServices(appData: IAppDataType) {
  // we create the router
  const router = express.Router();
  // and the body parser of json type, non strict
  // to allow for simple single json values such as null, false,
  // etc...
  const bodyParserJSON = bodyParser.json({
    strict: false,
  });

  // now we use the body parse router
  router.use((req, res, next) => {
    bodyParserJSON(req, res, (err) => {
      if (err) {
        res.setHeader("content-type", "application/json; charset=utf-8");
        res.status(400);
        res.end(JSON.stringify({
          message: "malformed json",
          code: ENDPOINT_ERRORS.UNSPECIFIED,
        }));
      } else {
        next();
      }
    });
  });

  /**
   * this is the function that represents the index checker
   * @param property the property that is being used
   * @param req the request
   * @param res and response
   */
  async function routerIndexChecker(property: PropertyDefinition, req: express.Request, res: express.Response) {
    // so we get the value that has been parsed from the body
    const value: any = req.body.value;
    // we get the id
    const id: number = req.body.id;
    // we get the version
    const version: string = req.body.version;

    // we always return json
    res.setHeader("content-type", "application/json; charset=utf-8");

    // check that they are valid
    if (typeof id !== "number" && id !== null) {
      res.status(400);
      res.end(JSON.stringify({
        message: "Invalid input on id",
        code: ENDPOINT_ERRORS.UNSPECIFIED,
      }));
      return;
    }
    if (typeof version !== "string" && version !== null) {
      res.status(400);
      res.end(JSON.stringify({
        message: "Invalid input on version",
        code: ENDPOINT_ERRORS.UNSPECIFIED,
      }));
      return;
    }
    // get get the definition description
    const definition = property.getPropertyDefinitionDescription();

    // if the definition has a json and the value of not of that type
    if (definition.json && typeof value !== definition.json) {
      res.status(400);
      res.end(JSON.stringify({
        message: "Invalid input on value",
        code: ENDPOINT_ERRORS.UNSPECIFIED,
      }));
      return;
    }

    // let's pass it over the validate function
    if (definition.validate) {
      const invalidReason = definition.validate(
        value,
        property.getSubtype(),
      );

      // if the property definition complains
      if (invalidReason) {
        res.status(400);
        res.end(JSON.stringify({
          message: "Invalid input",
          code: ENDPOINT_ERRORS.UNSPECIFIED,
        }));
        return;
      }
    }

    // we use the server side index checker
    const isValid = await serverSideIndexChecker(appData.knex, property, value, id, version);
    res.end(JSON.stringify(isValid));
  }

  /**
   * Builds all the routes for a property, basically only index checks for now
   * @param qualifiedPath the qualified path of the item definition
   * @param property the property itself
   */
  function buildRouteForProperty(qualifiedPath: string, property: PropertyDefinition) {
    // if the property is unique
    if (property.isUnique()) {
      // we actually add it
      router.post(
        "/index-check/" + qualifiedPath + "/" + property.getId(),
        routerIndexChecker.bind(null, property),
      );
    }
  }

  /**
   * Builds all the routes for an item definition
   * basically creates all the necessary index-check functions
   * @param idef the item definition in question
   */
  function buildRouteForItemDefinition(idef: ItemDefinition) {
    idef.getAllPropertyDefinitions().forEach((pd) => {
      buildRouteForProperty(idef.getQualifiedPathName(), pd);
    });

    idef.getChildDefinitions().forEach(buildRouteForItemDefinition);
  }

  /**
   * Builds all the routes for a module
   * basically just obtains all the item definitions and
   * runs it
   * @param mod the module
   */
  function buildRouteForModule(mod: Module) {
    mod.getAllPropExtensions().forEach((pe) => {
      buildRouteForProperty(mod.getQualifiedPathName(), pe);
    });

    mod.getAllModules().forEach(buildRouteForModule);
    mod.getAllChildItemDefinitions().forEach(buildRouteForItemDefinition);
  }

  // now in order to get the country at /rest/util/country
  // which guesses in which country we are
  router.get("/util/country", async (req, res) => {
    res.setHeader("content-type", "application/json; charset=utf-8");

    const standardAPIResponse = {
      country: appData.config.fallbackCountryCode,
      currency: appData.config.fallbackCurrency,
      language: appData.config.fallbackLanguage,
    };

    const XFF = req.headers["X-Forwarded-For"] || req.headers["x-forwarded-for"];
    let ip = req.connection.remoteAddress;
    if (typeof XFF === "string") {
      ip = XFF.split(",")[0].trim();
    } else if (Array.isArray(XFF)) {
      ip = XFF[0];
    }

    // This only occurs during development
    if (
      ip === "127.0.0.1" ||
      ip === "::1" ||
      ip === "::ffff:127.0.0.1" ||
      !appData.ipStack
    ) {
      res.end(JSON.stringify(standardAPIResponse));
      return;
    }

    logger.info("Requesting location for ip address of " + ip);

    const ipStackResponse = await appData.ipStack.requestUserInfoForIp(ip, standardAPIResponse);
    res.end(JSON.stringify(ipStackResponse));
  });

  router.get("/util/location-geocode", async (req, res) => {
    res.setHeader("content-type", "application/json; charset=utf-8");

    if (
      !appData.here
    ) {
      res.status(400);
      res.end(JSON.stringify({
        message: "A location fetcher hasn't been set",
        code: ENDPOINT_ERRORS.UNSPECIFIED,
      }));
    }

    if (
      !req.query.lat || isNaN(req.query.lat as any) ||
      !req.query.lng || isNaN(req.query.lng as any) ||
      !req.query.lang ||
      !req.query.sep ||
      !req.query.q
    ) {
      res.status(400);
      res.end(JSON.stringify({
        message: "Invalid request, needs parameters, lat, lng, lang, sep and q",
        code: ENDPOINT_ERRORS.UNSPECIFIED,
      }));
      return;
    }

    const finalResult = await appData.here.requestGeocodeFor(
      req.query.lat as string,
      req.query.lng as string,
      req.query.q as string,
      req.query.lang as string,
      req.query.sep as string,
    );

    res.status(200);
    res.end(JSON.stringify(finalResult));
  });

  router.get("/util/location-autocomplete", async (req, res) => {
    res.setHeader("content-type", "application/json; charset=utf-8");

    if (
      !appData.here
    ) {
      res.status(400);
      res.end(JSON.stringify({
        message: "A location fetcher hasn't been set",
        code: ENDPOINT_ERRORS.UNSPECIFIED,
      }));
    }

    if (
      !req.query.lat || isNaN(req.query.lat as any) ||
      !req.query.lng || isNaN(req.query.lng as any) ||
      !req.query.lang ||
      !req.query.sep ||
      !req.query.q
    ) {
      res.status(400);
      res.end(JSON.stringify({
        message: "Invalid request, needs parameters, lat, lng, lang, sep and q",
        code: ENDPOINT_ERRORS.UNSPECIFIED,
      }));
      return;
    }

    const finalResults = await appData.here.requestAutocompleteFor(
      req.query.lat as string,
      req.query.lng as string,
      req.query.q as string,
      req.query.lang as string,
      req.query.sep as string,
    );

    res.status(200);
    res.end(JSON.stringify(finalResults));
  });

  router.get("/util/location-search", async (req, res) => {
    res.setHeader("content-type", "application/json; charset=utf-8");

    if (
      !appData.here
    ) {
      res.status(400);
      res.end(JSON.stringify({
        message: "A location fetcher hasn't been set",
        code: ENDPOINT_ERRORS.UNSPECIFIED,
      }));
    }

    if (
      !req.query.lat || isNaN(req.query.lat as any) ||
      !req.query.lng || isNaN(req.query.lng as any) ||
      !req.query.lang ||
      !req.query.sep ||
      !req.query.q
    ) {
      res.status(400);
      res.end(JSON.stringify({
        message: "Invalid request, needs parameters, lat, lng, lang, sep and q",
        code: ENDPOINT_ERRORS.UNSPECIFIED,
      }));
      return;
    }

    const finalResults = await appData.here.requestSearchFor(
      req.query.lat as string,
      req.query.lng as string,
      req.query.q as string,
      req.query.lang as string,
      req.query.sep as string,
    );

    res.status(200);
    res.end(JSON.stringify(finalResults));
  });

  // add the static resources
  router.use("/resource", (req, res, next) => {
    const isProtectedResource = PROTECTED_RESOURCES.includes(req.path);
    if (isProtectedResource) {
      const mode = getMode(appData, req);
      if (mode !== "development") {
        res.status(403).end("Forbidden you need a devkey to access this resource");
      }
    }
    return express.static(path.resolve(path.join("dist", "data")))(req, res, next);
  });

  // now let's get all modules
  appData.root.getAllModules().forEach(buildRouteForModule);

  router.get("/buildnumber", (req, res) => {
    res.setHeader("content-type", "application/json; charset=utf-8");
    res.end(appData.buildnumber.toString());
  });

  router.get("/currency-factors", (req, res) => {
    res.setHeader("content-type", "application/json; charset=utf-8");
    res.end(JSON.stringify(appData.cache.getServerData().CURRENCY_FACTORS));
  });

  // now we add a 404
  router.use((req, res) => {
    res.status(404);
    res.setHeader("content-type", "application/json; charset=utf-8");
    res.end(JSON.stringify({
      message: "nothing to be found here",
      code: ENDPOINT_ERRORS.NOT_FOUND,
    }));
  });

  // return the router
  return router;
}
