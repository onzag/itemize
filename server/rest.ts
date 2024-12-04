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
import { PROTECTED_RESOURCES, ENDPOINT_ERRORS, PING_DATA_IDENTIFIER, JWT_KEY, REPROCESSED_RESOURCES, ADMIN_ROLE, SERVER_ELASTIC_PING_INTERVAL_TIME } from "../constants";
import { getMode } from "./mode";
import { IEnvironmentInfo, TRUST_ALL_INBOUND_CONNECTIONS } from "./environment";
import { jwtVerify } from "./token";
import { IServerSideTokenDataType } from "./resolvers/basic";
import fs from "fs";
import { INetwork, INetworkDbNode, INetworkServerNode } from "./network";
import uuidv5 from "uuid/v5";

const NAMESPACE = "23ab4609-df49-4fdf-931b-4203adb284f3";
export function makeNetworkIdOutOf(str: string) {
  return "DB" + uuidv5(str, NAMESPACE).replace(/-/g, "");
}

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

  router.get("/util/location-tz", async (req, res) => {
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
      !req.query.lng || isNaN(req.query.lng as any)
    ) {
      res.status(400);
      res.end(JSON.stringify({
        message: "Invalid request, needs parameters, lat, lng",
        code: ENDPOINT_ERRORS.UNSPECIFIED,
      }));
      return;
    }

    const finalResult = await appData.locationSearchService.performTimezoneRequest(
      req.query.lat as string,
      req.query.lng as string,
    );

    res.status(200);
    res.end(JSON.stringify(finalResult));
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
    const token = (
      req.query.token && req.query.token.toString()
    ) || (
        req.headers["token"] && req.headers["token"].toString()
      );

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
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.end(appData.buildnumber.toString());
  });

  router.get("/currency-factors", (req, res) => {
    res.setHeader("content-type", "application/json; charset=utf-8");
    res.end(JSON.stringify(appData.cache.getServerData().CURRENCY_FACTORS));
  });

  // ADMINISTRATIVE STUFF
  router.get("/admin/network", async (req, res) => {
    res.setHeader("content-type", "application/json; charset=utf-8");

    const forbidden = await validateToken(req);
    if (forbidden) {
      res.status(401).end(JSON.stringify({
        status: "NOT_AUTHORIZED",
      }));
      return;
    }

    const instances = await appData.loggingService.getPingsWithData<IEnvironmentInfo>(PING_DATA_IDENTIFIER);
    const networkResult: INetwork = {
      nodes: [],
    };

    await Promise.all(instances.map(async (i) => {
      if (!i.data || !i.data.environment || !i.data.environment.CLUSTER_ID) {
        return;
      }

      const groupId = i.data.environment.CLUSTER_ID;

      const currentTime = (new Date()).getTime();
      const createdTime = (new Date(i.timestamp)).getTime();

      const timeDifference = currentTime - createdTime;

      const isAliveByDefault = timeDifference <= (SERVER_ELASTIC_PING_INTERVAL_TIME * 2);

      const livingInfo = await appData.loggingService.isPingAlive(
        i.instanceId,
        PING_DATA_IDENTIFIER,
      );

      const node: INetworkServerNode = {
        createdAt: i.timestamp,
        envData: i.data.environment,
        groupId,
        instanceId: i.instanceId,
        nodeId: i.instanceId,
        alive: livingInfo.alive || isAliveByDefault,
        lastHeard: livingInfo.lastHeard || i.timestamp,
        nodeType: "server",

        // to determine
        name: null,
        type: null,
        links: [],
      }

      let hasDbConnection = false;
      let hasGlobalRedisConnection = false;
      let hasPubsubRedisConnection = false;
      let hasClusterRedisConnection = false;
      let hasElasticConnection = false;

      if (i.data.environment.INSTANCE_MODE === "ABSOLUTE") {
        node.type = "absolute";
        node.name = i.data.environment.NODE_ENV + " absolute server";

        hasDbConnection = true;
        hasGlobalRedisConnection = true;
        hasPubsubRedisConnection = true;
        hasClusterRedisConnection = true;
        hasElasticConnection = true;

      } else if (i.data.environment.INSTANCE_MODE === "GLOBAL_MANAGER") {
        hasDbConnection = true;
        hasGlobalRedisConnection = true;
        hasPubsubRedisConnection = true;
        hasElasticConnection = true;

        if (i.data.environment.GLOBAL_MANAGER_MODE === "ABSOLUTE") {
          node.type = "global-manager-absolute";
          node.name = "absolute global manager";
        } else if (i.data.environment.GLOBAL_MANAGER_MODE === "ELASTIC") {
          node.type = "global-manager-elastic";
          node.name = "elasticsearch and indexing global manager";
        } else if (i.data.environment.GLOBAL_MANAGER_MODE === "SERVER_DATA") {
          node.type = "global-manager-server-data";
          node.name = "server data global manager";
        } else if (i.data.environment.GLOBAL_MANAGER_MODE === "SERVICES") {
          if (i.data.environment.GLOBAL_MANAGER_SERVICES.length === 0) {
            node.type = "global-manager-services";
            node.name = "absolute services global manager";
          } else {
            node.type = "global-manager-service-x";
            node.name = "services global manager (" + i.data.environment.GLOBAL_MANAGER_SERVICES.join(", ") + ")";
          }
        } else {
          return;
        }
      } else if (i.data.environment.INSTANCE_MODE === "CLUSTER_MANAGER") {
        node.type = "cluster-manager";
        node.name = i.data.environment.NODE_ENV + " cluster manager";

        hasDbConnection = true;
        hasGlobalRedisConnection = true;
        hasPubsubRedisConnection = true;
        hasClusterRedisConnection = true;
        hasElasticConnection = true;
      } else if (i.data.environment.INSTANCE_MODE === "EXTENDED") {
        node.type = "extended";
        node.name = i.data.environment.NODE_ENV + " extended server";

        hasDbConnection = true;
        hasGlobalRedisConnection = true;
        hasPubsubRedisConnection = true;
        hasClusterRedisConnection = true;
        hasElasticConnection = true;
      } else {
        return;
      }

      if (hasDbConnection) {
        const pgInfo = i.data.postgresql;
        if (pgInfo?.host) {
          const hostlocation = pgInfo.host + ":" + (pgInfo.port || "5432");
          const nodeId = makeNetworkIdOutOf(hostlocation);
          let db: INetworkDbNode = networkResult.nodes.find((v) => v.nodeId === nodeId) as INetworkDbNode;
          if (!db) {
            db = {
              type: "pg",
              groupId: "GLOBAL",
              host: hostlocation,
              nodeType: "database",
              links: [
                {
                  id: i.instanceId,
                  type: "uses-as-central-database",
                },
              ],
              name: "PostgreSQL database",
              nodeId,
            };
            networkResult.nodes.push(db);
          } else {
            db.links.push({
              id: i.instanceId,
              type: "uses-as-central-database",
            });
          }

          node.links.push({
            id: nodeId,
            type: "uses-as-central-database",
          });
        }
      }

      if (hasElasticConnection) {
        const elasicInfo = i.data.elastic;
        if (elasicInfo?.node) {
          const hostlocation = elasicInfo.node;
          const nodeId = makeNetworkIdOutOf(hostlocation);
          let elastic: INetworkDbNode = networkResult.nodes.find((v) => v.nodeId === nodeId) as INetworkDbNode;
          if (!elastic) {
            elastic = {
              type: "elastic",
              groupId: "GLOBAL",
              host: hostlocation,
              nodeType: "database",
              links: [
                {
                  id: i.instanceId,
                  type: "uses-as-search-database",
                },
              ],
              name: "Elasticsearch database",
              nodeId,
            };
            networkResult.nodes.push(elastic);
          } else {
            elastic.links.push({
              id: i.instanceId,
              type: "uses-as-search-database",
            });
          }

          node.links.push({
            id: nodeId,
            type: "uses-as-search-database",
          });
        }

        const elasicLogsInfo = i.data.elastic;
        if (elasicLogsInfo?.node) {
          const hostlocation = elasicLogsInfo.node;
          const nodeId = makeNetworkIdOutOf(hostlocation);
          let elasticLogs: INetworkDbNode = networkResult.nodes.find((v) => v.nodeId === nodeId) as INetworkDbNode;
          if (!elasticLogs) {
            elasticLogs = {
              type: "elastic",
              groupId: "GLOBAL",
              host: hostlocation,
              nodeType: "database",
              links: [
                {
                  id: i.instanceId,
                  type: "uses-as-logs-database",
                },
              ],
              name: "Elasticsearch database",
              nodeId,
            };
            networkResult.nodes.push(elasticLogs);
          } else {
            elasticLogs.links.push({
              id: i.instanceId,
              type: "uses-as-logs-database",
            });
          }

          node.links.push({
            id: nodeId,
            type: "uses-as-logs-database",
          });
        }

        const elasicAnalyticsInfo = i.data.elasticAnalytics;
        if (elasicAnalyticsInfo?.node) {
          const hostlocation = elasicAnalyticsInfo.node;
          const nodeId = makeNetworkIdOutOf(hostlocation);
          let elasticAnalytics: INetworkDbNode = networkResult.nodes.find((v) => v.nodeId === nodeId) as INetworkDbNode;
          if (!elasticAnalytics) {
            elasticAnalytics = {
              type: "elastic",
              groupId: "GLOBAL",
              host: hostlocation,
              nodeType: "database",
              links: [
                {
                  id: i.instanceId,
                  type: "uses-as-analytics-database",
                },
              ],
              name: "Elasticsearch database",
              nodeId,
            };
            networkResult.nodes.push(elasticAnalytics);
          } else {
            elasticAnalytics.links.push({
              id: i.instanceId,
              type: "uses-as-analytics-database",
            });
          }

          node.links.push({
            id: nodeId,
            type: "uses-as-analytics-database",
          });
        }
      }

      if (hasClusterRedisConnection) {
        const redisInfo = i.data.redisCache;
        if (redisInfo?.host) {
          const hostlocation = redisInfo.host + ":" + (redisInfo.port || "6379") + "/" + (redisInfo.path || "");
          const nodeId = makeNetworkIdOutOf(hostlocation);
          let redisNode = networkResult.nodes.find((n) => n.nodeId === nodeId);
          if (!redisNode) {
            redisNode = {
              nodeType: "database",
              groupId,
              type: "redis",
              host: hostlocation,
              links: [
                {
                  id: i.instanceId,
                  type: "uses-as-cluster-cache",
                },
              ],
              name: "Redis server",
              nodeId,
            };
            networkResult.nodes.push(redisNode);
          } else {
            redisNode.links.push({
              id: i.instanceId,
              type: "uses-as-cluster-cache",
            });
          }

          node.links.push({
            id: nodeId,
            type: "uses-as-cluster-cache",
          });
        }
      }

      if (hasGlobalRedisConnection) {
        const redisInfo = i.data.redisGlobal;
        if (redisInfo?.host) {
          const hostlocation = redisInfo.host + ":" + (redisInfo.port || "6379") + "/" + (redisInfo.path || "");
          const nodeId = makeNetworkIdOutOf(hostlocation);
          let redisNode = networkResult.nodes.find((n) => n.nodeId === nodeId);
          if (!redisNode) {
            redisNode = {
              nodeType: "database",
              groupId,
              type: "redis",
              host: hostlocation,
              links: [
                {
                  id: i.instanceId,
                  type: "uses-as-global-cache",
                },
              ],
              name: "Redis server",
              nodeId,
            };
            networkResult.nodes.push(redisNode);
          } else {
            redisNode.links.push({
              id: i.instanceId,
              type: "uses-as-global-cache",
            });

            if (redisNode.groupId !== "GLOBAL") {
              redisNode.groupId = "GLOBAL";
            }
          }

          node.links.push({
            id: nodeId,
            type: "uses-as-global-cache",
          });
        }
      }

      if (hasPubsubRedisConnection) {
        const redisInfo = i.data.redisPubSub;
        if (redisInfo?.host) {
          const hostlocation = redisInfo.host + ":" + (redisInfo.port || "6379") + "/" + (redisInfo.path || "");
          const nodeId = makeNetworkIdOutOf(hostlocation);
          let redisNode = networkResult.nodes.find((n) => n.nodeId === nodeId);
          if (!redisNode) {
            redisNode = {
              nodeType: "database",
              groupId,
              type: "redis",
              host: hostlocation,
              links: [
                {
                  id: i.instanceId,
                  type: "uses-as-global-pubsub",
                },
              ],
              name: "Redis server",
              nodeId,
            };
            networkResult.nodes.push(redisNode);
          } else {
            redisNode.links.push({
              id: i.instanceId,
              type: "uses-as-global-pubsub",
            });

            if (redisNode.groupId !== "GLOBAL") {
              redisNode.groupId = "GLOBAL";
            }
          }

          node.links.push({
            id: nodeId,
            type: "uses-as-global-pubsub",
          });
        }
      }

      networkResult.nodes.push(node);
    }));

    res.status(200).end(JSON.stringify(networkResult));
  });

  router.get("/admin/nodes/:id/logs/:level", async (req, res) => {
    res.setHeader("content-type", "application/json; charset=utf-8");

    const forbidden = await validateToken(req);
    if (forbidden) {
      res.status(401).end(JSON.stringify({
        status: "NOT_AUTHORIZED",
      }));
      return;
    }

    let fromMs = req.query.from && (Date.parse(req.query.from.toString()) || parseInt(req.query.from.toString()));
    let toMs = req.query.to && (Date.parse(req.query.to.toString()) || parseInt(req.query.to.toString()));
    const level: "info" | "error" | "any" = req.params.level as any;
    const id = req.params.id;

    if (!fromMs || isNaN(fromMs) || !id || (level !== "info" && level !== "error" && level !== "any")) {
      res.status(400).end(JSON.stringify({
        status: "BAD_REQUEST",
      }));
    }

    const fromD = new Date(fromMs);
    const toD = toMs && !isNaN(toMs) ? new Date(toMs) : null;

    const allLogs = await appData.loggingService.getLogsOf(id, level, fromD, toD);
    res.end(JSON.stringify({
      status: "OK",
      logs: allLogs,
    }));
  });

  router.get("/admin/nodes/:id/pings/:pid", async (req, res) => {
    res.setHeader("content-type", "application/json; charset=utf-8");

    const forbidden = await validateToken(req);
    if (forbidden) {
      res.status(401).end(JSON.stringify({
        status: "NOT_AUTHORIZED",
      }));
      return;
    }

    let fromMs = req.query.from && (Date.parse(req.query.from.toString()) || parseInt(req.query.from.toString()));
    let toMs = req.query.to && (Date.parse(req.query.to.toString()) || parseInt(req.query.to.toString()));
    const pingid = req.params.pid;
    const id = req.params.id;

    if (!fromMs || isNaN(fromMs) || !id || !pingid) {
      res.status(400).end(JSON.stringify({
        status: "BAD_REQUEST",
      }));
    }

    const fromD = new Date(fromMs);
    const toD = toMs && !isNaN(toMs) ? new Date(toMs) : null;

    const allPings = await appData.loggingService.getPingsOf(id, pingid, fromD, toD);
    res.end(JSON.stringify({
      status: "OK",
      pings: allPings,
    }));
  });

  router.delete("/admin/nodes/:id/logs", async (req, res) => {
    res.setHeader("content-type", "application/json; charset=utf-8");

    const forbidden = await validateToken(req);
    if (forbidden) {
      res.status(401).end(JSON.stringify({
        status: "NOT_AUTHORIZED",
      }));
      return;
    }

    try {
      await appData.loggingService.clearLogsOf(req.params.id);
      res.status(200).end(JSON.stringify({status: "OK"}));
    } catch (err) {
      res.status(500).end(JSON.stringify({status: "INTERNAL_SERVER_ERROR", stack: err.stack}));
    }
  });

  router.delete("/admin/nodes/:id/pings/:pid", async (req, res) => {
    res.setHeader("content-type", "application/json; charset=utf-8");

    const forbidden = await validateToken(req);
    if (forbidden) {
      res.status(401).end(JSON.stringify({
        status: "NOT_AUTHORIZED",
      }));
      return;
    }

    try {
      await appData.loggingService.clearPingsOf(req.params.id, req.params.pid);
      res.status(200).end(JSON.stringify({status: "OK"}));
    } catch (err) {
      res.status(500).end(JSON.stringify({status: "INTERNAL_SERVER_ERROR", stack: err.stack}));
    }
  });

  router.get("/admin/nodes/:id/pingfile/:pid", async (req, res) => {
    res.setHeader("content-type", "text/plain; charset=utf-8");

    const forbidden = await validateToken(req);
    if (forbidden) {
      res.status(401).end("NOT_AUTHORIZED");
      return;
    }

    res.status(200);
    await appData.loggingService.streamPingsOf(req.params.id, req.params.pid, res.write.bind(res));
    res.end();
  });

  router.get("/admin/nodes/:id/logfile", async (req, res) => {
    res.setHeader("content-type", "text/plain; charset=utf-8");

    const forbidden = await validateToken(req);
    if (forbidden) {
      res.status(401).end("NOT_AUTHORIZED");
      return;
    }

    res.status(200);
    await appData.loggingService.streamLogsOf(req.params.id, res.write.bind(res));
    res.end();
  });

  router.delete("/admin/nodes/:id", async (req, res) => {
    res.setHeader("content-type", "application/json; charset=utf-8");

    const forbidden = await validateToken(req);
    if (forbidden) {
      res.status(401).end(JSON.stringify({
        status: "NOT_AUTHORIZED",
      }));
      return;
    }

    const adminKey = req.headers["adminkey"];

    if (!adminKey || adminKey !== appData.sensitiveConfig.adminKey) {
      res.status(403).end(JSON.stringify({
        status: "INVALID_ADMIN_KEY",
      }));
      return;
    }

    const isAlive = await appData.loggingService.isPingAlive(req.params.id, PING_DATA_IDENTIFIER);

    if (isAlive.alive) {
      res.status(403).end(JSON.stringify({status: "NODE_IS_ALIVE", lastHeard: isAlive.lastHeard}));
    } else {
      try {
        // this deletes pings by default because the event listeners
        // attached to clearing the logs automatically by the exposed default logger
        // node will be ofifically gone
        await appData.loggingService.clearLogsOf(req.params.id);
        res.status(200).end(JSON.stringify({status: "OK"}));
      } catch (err) {
        res.status(500).end(JSON.stringify({status: "INTERNAL_SERVER_ERROR"}));
      }
    }
  });
  
  router.get("/admin/item/:type/:id/:version", async (req, res) => {
    res.setHeader("content-type", "application/json; charset=utf-8");

    const forbidden = await validateToken(req);
    if (forbidden) {
      res.status(401).end(JSON.stringify({
        status: "NOT_AUTHORIZED",
      }));
      return;
    }

    const adminKey = req.headers["adminkey"];

    if (!adminKey || adminKey !== appData.sensitiveConfig.adminKey) {
      res.status(403).end(JSON.stringify({
        status: "INVALID_ADMIN_KEY",
      }));
      return;
    }

    const actualVersion = req.params.version === "_" ? null : req.params.version;

    try {
      const value = await appData.cache.requestValue(req.params.type, req.params.id, actualVersion);
      res.status(200).end(JSON.stringify({status: "OK", value}));
    } catch (err) {
      res.status(500).end(JSON.stringify({status: "INTERNAL_SERVER_ERROR", stack: err.stack}));
    }
  });

  router.delete("/admin/item/:type/:id/:version", async (req, res) => {
    res.setHeader("content-type", "application/json; charset=utf-8");

    const forbidden = await validateToken(req);
    if (forbidden) {
      res.status(401).end(JSON.stringify({
        status: "NOT_AUTHORIZED",
      }));
      return;
    }

    const adminKey = req.headers["adminkey"];

    if (!adminKey || adminKey !== appData.sensitiveConfig.adminKey) {
      res.status(403).end(JSON.stringify({
        status: "INVALID_ADMIN_KEY",
      }));
      return;
    }

    const actualVersion = req.params.version === "_" ? null : req.params.version;

    try {
      const value = await appData.cache.requestDelete(req.params.type, req.params.id, actualVersion);
      res.status(200).end(JSON.stringify({status: "OK", value}));
    } catch (err) {
      res.status(500).end(JSON.stringify({status: "INTERNAL_SERVER_ERROR", stack: err.stack}));
    }
  });

  router.put("/admin/item/:type/:id/:version", async (req, res) => {
    res.setHeader("content-type", "application/json; charset=utf-8");

    const forbidden = await validateToken(req);
    if (forbidden) {
      res.status(401).end(JSON.stringify({
        status: "NOT_AUTHORIZED",
      }));
      return;
    }

    const adminKey = req.headers["adminkey"];

    if (!adminKey || adminKey !== appData.sensitiveConfig.adminKey) {
      res.status(403).end(JSON.stringify({
        status: "INVALID_ADMIN_KEY",
      }));
      return;
    }

    const actualVersion = req.params.version === "_" ? null : req.params.version;

    if (!req.body.update || typeof req.body.update !== "object" || req.body.update === null) {
      res.status(400).end(JSON.stringify({
        status: "INVALID_JSON_UPDATE",
      }));
      return;
    }

    if (!req.body.dictionary || typeof req.body.dictionary !== "string") {
      res.status(400).end(JSON.stringify({
        status: "INVALID_DICTIONARY",
      }));
      return;
    }

    if (!req.body.language || typeof req.body.language !== "string") {
      res.status(400).end(JSON.stringify({
        status: "INVALID_LANGUAGE",
      }));
      return;
    }

    try {
      const value = await appData.cache.requestUpdate(
        req.params.type,
        req.params.id,
        actualVersion,
        req.body.update,
        {
          dictionary: req.body.dictionary,
          language: req.body.language,
        }
      );
      res.status(200).end(JSON.stringify({status: "OK", value}));
    } catch (err) {
      res.status(500).end(JSON.stringify({status: "INTERNAL_SERVER_ERROR", stack: err.stack}));
    }
  });

  router.post("/admin/elastic/reindex/:type", async (req, res) => {
    res.setHeader("content-type", "application/json; charset=utf-8");

    const forbidden = await validateToken(req);
    if (forbidden) {
      res.status(401).end(JSON.stringify({
        status: "NOT_AUTHORIZED",
      }));
      return;
    }

    const adminKey = req.headers["adminkey"];

    if (!adminKey || adminKey !== appData.sensitiveConfig.adminKey) {
      res.status(403).end(JSON.stringify({
        status: "INVALID_ADMIN_KEY",
      }));
      return;
    }

    try {
      await appData.elastic.rebuildIndexes(req.params.type, true);
      await appData.elastic.runConsistencyCheck(req.params.type, true);
      res.status(200).end(JSON.stringify({status: "OK"}));
    } catch (err) {
      res.status(500).end(JSON.stringify({status: "INTERNAL_SERVER_ERROR", stack: err.stack}));
    }
  });

  router.post("/admin/elastic/recheck/:type", async (req, res) => {
    res.setHeader("content-type", "application/json; charset=utf-8");

    const forbidden = await validateToken(req);
    if (forbidden) {
      res.status(401).end(JSON.stringify({
        status: "NOT_AUTHORIZED",
      }));
      return;
    }

    const adminKey = req.headers["adminkey"];

    if (!adminKey || adminKey !== appData.sensitiveConfig.adminKey) {
      res.status(403).end(JSON.stringify({
        status: "INVALID_ADMIN_KEY",
      }));
      return;
    }

    try {
      await appData.elastic.runConsistencyCheck(req.params.type, true);
      res.status(200).end(JSON.stringify({status: "OK"}));
    } catch (err) {
      res.status(500).end(JSON.stringify({status: "INTERNAL_SERVER_ERROR", stack: err.stack}));
    }
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
  return { router, reprocessedCache };
}
