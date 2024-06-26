/**
 * This provides the rest endpoints for the itemize app
 * @module
 */

import { IAppDataType } from ".";
import { logger } from "./logger";
import express from "express";
import path from "path";
import Module from "../base/Root/Module";
import { serverSideIndexChecker } from "../base/Root/Module/ItemDefinition/PropertyDefinition/server-checkers";
import PropertyDefinition from "../base/Root/Module/ItemDefinition/PropertyDefinition";
import ItemDefinition from "../base/Root/Module/ItemDefinition";
import { PROTECTED_RESOURCES, ENDPOINT_ERRORS, PING_DATA_IDENTIFIER, JWT_KEY, REPROCESSED_RESOURCES, ADMIN_ROLE } from "../constants";
import { getMode } from "./mode";
import { ENVIRONMENT_DETAILS, TRUST_ALL_INBOUND_CONNECTIONS } from "./environment";
import { jwtVerify } from "./token";
import { IServerSideTokenDataType } from "./resolvers/basic";
import fs from "fs";

export function secureEndpointRouter(appData: IAppDataType, req: express.Request, res: express.Response, next: () => void) {
  const hostname = req.headers["host"];
  const isHostLocalhost = hostname === "localhost" || hostname.indexOf("localhost") === 0;

  if (
    !TRUST_ALL_INBOUND_CONNECTIONS &&
    !isHostLocalhost &&
    hostname !== appData.config.developmentHostname &&
    hostname !== appData.config.productionHostname
  ) {
    res.status(403).end("Invalid hostname");
    return;
  }

  const originOfRequest = req.headers["origin"];
  const isOriginLocalhost = originOfRequest === "http://localhost" || originOfRequest === "https://localhost";

  // request does not come from locahost and we aren't trusting
  if (!isOriginLocalhost && !TRUST_ALL_INBOUND_CONNECTIONS) {
    // we will allow it depending of which
    if (originOfRequest === ("https://" + appData.config.developmentHostname)) {
      res.set("Access-Control-Allow-Origin", appData.config.developmentHostname);
    } else {
      res.set("Access-Control-Allow-Origin", appData.config.productionHostname);
    }
  } else {
    // otherwise request is coming from localhost or we are trusting of all
    // if trusting of all
    if (TRUST_ALL_INBOUND_CONNECTIONS) {
      // trusting all
      res.set("Access-Control-Allow-Origin", "*");
    } else {
      // otherwise we just allow it
      res.set("Access-Control-Allow-Origin", originOfRequest);
    }
  }

  // not coming from localhost and not trusitng all
  if (!isOriginLocalhost && !TRUST_ALL_INBOUND_CONNECTIONS) {
    // setting HSTS to force https
    res.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  }

  res.set("X-Frame-Options", "SAMEORIGIN");
  next();
}

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
  const bodyParserJSON = express.json({
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
    const id: string = req.body.id;
    // we get the version
    const version: string = req.body.version;

    // we always return json
    res.setHeader("content-type", "application/json; charset=utf-8");

    // check that they are valid
    if (typeof id !== "string" && id !== null) {
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
        property.rawData,
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
    const isValid = await serverSideIndexChecker(
      appData, property.getParentItemDefinition(), null, property, value, id, version,
    );
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
      !appData.userLocalizationService
    ) {
      logger.info({
        endpoint: "/util/country",
        message: "using default API response because " +
          (!appData.userLocalizationService ? "there's no localization service support" : "user is in localhost"),
      });

      res.end(JSON.stringify(standardAPIResponse));
      return;
    }

    const serviceResponse = await appData.userLocalizationService.getLocalizationFor(ip, standardAPIResponse);

    logger.info({
      endpoint: "/util/country",
      message: "Anonymous user has requested user localization information",
      data: {
        ip,
        serviceResponse,
      },
    });

    res.end(JSON.stringify(serviceResponse));
  });

  router.get("/util/location-revgeocode", async (req, res) => {
    res.setHeader("content-type", "application/json; charset=utf-8");

    if (
      !appData.locationSearchService
    ) {
      res.status(400);
      res.end(JSON.stringify({
        message: "A location fetcher hasn't been set",
        code: ENDPOINT_ERRORS.UNSPECIFIED,
      }));
      return;
    }

    if (
      !req.query.lat || isNaN(req.query.lat as any) ||
      !req.query.lng || isNaN(req.query.lng as any) ||
      !req.query.lang ||
      !req.query.sep
    ) {
      res.status(400);
      res.end(JSON.stringify({
        message: "Invalid request, needs parameters, lat, lng, lang and sep",
        code: ENDPOINT_ERRORS.UNSPECIFIED,
      }));
      return;
    }

    const finalResult = await appData.locationSearchService.requestRevGeocodeFor(
      req.query.lat as string,
      req.query.lng as string,
      req.query.q as string || null,
      req.query.lang as string,
      req.query.sep as string,
    );

    res.status(200);
    res.end(JSON.stringify(finalResult));
  });

  router.get("/util/location-autocomplete", async (req, res) => {
    res.setHeader("content-type", "application/json; charset=utf-8");

    if (
      !appData.locationSearchService
    ) {
      res.status(400);
      res.end(JSON.stringify({
        message: "A location fetcher hasn't been set",
        code: ENDPOINT_ERRORS.UNSPECIFIED,
      }));
      return;
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

    const finalResults = await appData.locationSearchService.requestAutocompleteFor(
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
      !appData.locationSearchService
    ) {
      res.status(400);
      res.end(JSON.stringify({
        message: "A location fetcher hasn't been set",
        code: ENDPOINT_ERRORS.UNSPECIFIED,
      }));
      return;
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

    const finalResults = await appData.locationSearchService.requestSearchFor(
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
  const reprocessedCache = {};
  REPROCESSED_RESOURCES.forEach((rr) => {
    const fileLocation = path.resolve(path.join("dist", "data", rr));

    // yes we are using sync, we need to stop the execution anyway
    // until this is processed
    const fileData = fs.readFileSync(fileLocation, "utf-8");

    const processedFileData = fileData
      .replace(/\$CONFIG/g, JSON.stringify(JSON.stringify(appData.config)))
      .replace(/\$BUILDNUMBER/g, JSON.stringify(appData.buildnumber));

    // store it in memory
    reprocessedCache[rr] = processedFileData;
  });

  router.use("/resource", (req, res, next) => {
    const isProtectedResource = PROTECTED_RESOURCES.includes(req.path);
    if (isProtectedResource) {
      const mode = getMode(appData, req);
      if (mode !== "development") {
        res.status(403).end("Forbidden you need a devkey to access this resource");
      }
    }

    const isReprocessedResource = REPROCESSED_RESOURCES.includes(req.path);

    if (isReprocessedResource) {
      res.writeHead(200, {
        "Content-Type": "application/javascript"
      }).end(reprocessedCache[req.path]);
      return;
    }

    return express.static(path.resolve(path.join("dist", "data")))(req, res, next);
  });

  // now let's get all modules
  appData.root.getAllModules().forEach(buildRouteForModule);

  async function validateToken(req: any) {
    const token = req.query.token && req.query.token.toString();

    if (!token) {
      return true;
    }

    let result: IServerSideTokenDataType;
    let forbidden: boolean = false;
    try {
      result = await jwtVerify<IServerSideTokenDataType>(token, await appData.registry.getJWTSecretFor(JWT_KEY));
      forbidden = (
        typeof result.id !== "string" ||
        typeof result.sessionId !== "number" ||
        result.role !== ADMIN_ROLE
      );
    } catch (err) {
      forbidden = true;
    }

    return forbidden;
  }

  router.get("/buildnumber", (req, res) => {
    res.setHeader("content-type", "application/json; charset=utf-8");
    res.end(appData.buildnumber.toString());
  });

  router.get("/currency-factors", (req, res) => {
    res.setHeader("content-type", "application/json; charset=utf-8");
    res.end(JSON.stringify(appData.cache.getServerData().CURRENCY_FACTORS));
  });

  // ADMINISTRATIVE STUFF
  // router.get("/logs/:level/:id", async (req, res) => {
  //   res.setHeader("content-type", "application/json; charset=utf-8");

  //   const forbidden = await validateToken(req);
  //   if (forbidden) {
  //     res.status(401).end(JSON.stringify({
  //       status: "NOT_AUTHORIZED",
  //     }));
  //     return;
  //   }

  //   let fromMs = req.query.from && Date.parse(req.query.from.toString());
  //   let toMs = req.query.to && Date.parse(req.query.to.toString());
  //   const level: "info" | "error" = req.params.level as any;
  //   const id = req.params.id;

  //   if (!fromMs || isNaN(fromMs) || !toMs || isNaN(toMs) || !id || (level !== "info" && level !== "error")) {
  //     res.status(400).end(JSON.stringify({
  //       status: "BAD_REQUEST",
  //     }));
  //   }

  //   const fromD = new Date(fromMs);
  //   const toD = new Date(toMs);

  //   const allLogs = await appData.loggingService.getLogsOf(id, level, fromD, toD);
  //   res.end(JSON.stringify({
  //     status: "OK",
  //     logs: allLogs,
  //   }));
  // });

  // router.get("/logs", async (req, res) => {
  //   res.setHeader("content-type", "application/json; charset=utf-8");

  //   const forbidden = await validateToken(req);
  //   if (forbidden) {
  //     res.status(401).end(JSON.stringify({
  //       status: "NOT_AUTHORIZED",
  //     }));
  //     return;
  //   }

  //   const allLogInstances = await appData.loggingService.getLogsInstanceIds();
  //   res.end(JSON.stringify({
  //     status: "OK",
  //     ids: allLogInstances,
  //   }));
  // })

  // router.delete("/logs/:id", async (req, res) => {
  //   res.setHeader("content-type", "application/json; charset=utf-8");

  //   const forbidden = await validateToken(req);
  //   if (forbidden) {
  //     res.status(401).end(JSON.stringify({
  //       status: "NOT_AUTHORIZED",
  //     }));
  //     return;
  //   }

  //   const status = await appData.loggingService.clearLogsOf(req.params.id);
  //   res.status(status === "OK" ? 200 : (status === "NOT_AUTHORIZED" ? 403 : 500)).end(JSON.stringify({
  //     status,
  //   }));
  // });

  // router.get("/clusters/info", async (req, res) => {
  //   res.setHeader("content-type", "application/json; charset=utf-8");

  //   const forbidden = await validateToken(req);
  //   if (forbidden) {
  //     res.status(401).end(JSON.stringify({
  //       status: "NOT_AUTHORIZED",
  //     }));
  //     return;
  //   }

  //   const allPings = await appData.loggingService.getAllStoredPingsAt(PING_DATA_IDENTIFIER);
  //   res.end(JSON.stringify({
  //     status: "OK",
  //     self: ENVIRONMENT_DETAILS,
  //     pings: allPings,
  //   }));
  // });

  // router.delete("/clusters/info/:uuid", async (req, res) => {
  //   res.setHeader("content-type", "application/json; charset=utf-8");

  //   const forbidden = await validateToken(req);
  //   if (forbidden) {
  //     res.status(401).end(JSON.stringify({
  //       status: "NOT_AUTHORIZED",
  //     }));
  //     return;
  //   }

  //   const status = await appData.loggingService.deletePingsFor(PING_DATA_IDENTIFIER, PING_STATUS_IDENTIFIER, req.params.uuid);
  //   res.status(status === "NOT_DEAD" ? 403 : 200).end(JSON.stringify({
  //     status,
  //   }));
  // });

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
  return { router, reprocessedCache };
}
