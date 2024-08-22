/**
 * This file contains the initialization function that initializes
 * the itemize application, just basically setting up the rest endpoints
 * and whatever the server requires to show something to the client
 * @module
 */

import { IAppDataType, IServerCustomizationDataType, app } from ".";
import { logger } from "./logger";
import express from "express";
import path from "path";
import { MAX_FILES_PER_REQUEST, MAX_FILE_SIZE, MAX_FIELD_SIZE } from "../constants";
import restServices, { secureEndpointRouter } from "./rest";
import { getMode } from "./mode";
import { userRestServices } from "./user/rest";
import { CLUSTER_ID, INSTANCE_UUID, NODE_ENV, NO_SEO } from "./environment";

import { ssrGenerator } from "./ssr/generator";
import { SEOGenerator } from "./seo/generator";
import { rqSystem } from "./rq";
import { jwtVerify } from "./token";

/**
 * Initializes the server application with its configuration
 * @param appData the application data to use
 * @param custom the custom config that has been passed
 */
export function initializeApp(appData: IAppDataType, custom: IServerCustomizationDataType, routers: express.Router[]) {
  // removing the powered by header
  app.use((req, res, next) => {
    res.removeHeader("X-Powered-By");
    next();
  });

  app.use(secureEndpointRouter.bind(null, appData));

  // if we have a custom router and custom router endpoint rather than the standard
  if (custom.customRouterEndpoint) {
    app.use(custom.customRouterEndpoint, custom.customRouter(appData));
  } else if (custom.customRouter) {
    app.use(custom.customRouter(appData));
  }

  // adding rest services
  app.use("/rest/user", userRestServices(appData));
  routers.forEach((r) => {
    app.use("/rest/service", r);
  });

  const { router, reprocessedCache } = restServices(appData);
  app.use("/rest", router);

  app.use(
    "/rq",
    rqSystem({
      maxFileSize: MAX_FILE_SIZE,
      maxFiles: MAX_FILES_PER_REQUEST,
      maxFieldSize: MAX_FIELD_SIZE,
      jsonSchema: appData.rqSchema,
      schema: appData.rqSchemaWithResolvers,
    }),
  );

  app.get("/uuid", (req, res) => {
    res.status(200).end(INSTANCE_UUID);
  });

  // service worker setup
  app.get("/sw.development.js", (req, res) => {
    if (reprocessedCache["/service.worker.development.js"]) {
      res.writeHead(200, {
        "Content-Type": "application/javascript"
      }).end(reprocessedCache["/service.worker.development.js"]);
      return;
    }
    res.sendFile(path.resolve(path.join("dist", "data", "service.worker.development.js")));
  });
  app.get("/sw.production.js", (req, res) => {
    if (reprocessedCache["/service.worker.production.js"]) {
      res.writeHead(200, {
        "Content-Type": "application/javascript"
      }).end(reprocessedCache["/service.worker.production.js"]);
      return;
    }
    res.sendFile(path.resolve(path.join("dist", "data", "service.worker.production.js")));
  });

  logger.info(
    {
      functionName: "initializeApp",
      message: "Initializing an uploads endpoint for the cluster",
    },
  );

  // create it at the uploads endpoint
  app.use(
    "/uploads/:clusterid",
    async (req, res, next) => {
      // first lets check the cluster is being asked for the file
      const subdomainOfCluster = appData.config.clusterSubdomains[req.params.clusterid];
      if (typeof subdomainOfCluster !== "string") {
        res.status(404).end("Cluster does not exist");
        return;
      }

      if (!req.path) {
        res.status(400).end("Missing file path");
        return;
      }

      let pathOfFile = path.normalize(req.path.replace(`/uploads/${req.params.clusterid}`, ""));
      // single or double dots kinda sus
      if (pathOfFile.startsWith(".")) {
        res.status(400).end("Invalid file path");
        return;
      }
      if (!pathOfFile.startsWith("/")) {
        pathOfFile = "/" + pathOfFile;
      }

      if (req.method === "GET") {
        if (req.headers.accept === "application/json") {
          if (req.params.clusterid !== CLUSTER_ID) {
            res.status(400).end("A GET request for application/json must be done to the respective cluster that owns the subdomain, requested: " +
              JSON.stringify(req.params.clusterid) + " but the respondant is: " + JSON.stringify(CLUSTER_ID));
            return;
          }
  
          const token = req.headers["token"];
  
          if (!token || typeof token !== "string") {
            res.status(403).end("Missing token in headers");
            return;
          }

          try {
            const verifyToken = await jwtVerify(token, appData.storage.storageJWTKey) as any;
  
            let expectedPathOfFile = verifyToken.pathname;
            if (!pathOfFile.startsWith("/")) {
              expectedPathOfFile = "/" + expectedPathOfFile;
            }
  
            if (expectedPathOfFile !== pathOfFile) {
              res.status(403).end("Token does not grant listing of the given path");
              return;
            }
          } catch (err) {
            res.status(403).end("Invalid token");
            return;
          };

          const filesList = await appData.storage.listOwnFiles(pathOfFile);

          res.setHeader("content-type", "application/json; charset=utf-8");
          res.status(200).end(JSON.stringify(filesList));
        } else {
          if (!await appData.storage.existsOwn(pathOfFile)) {
            // we are the cluster, yet we don't have that file
            if (req.params.clusterid === CLUSTER_ID) {
              res.status(404).end("File does not exist");
              return;
            }
  
            try {
              // copy the file from the other cluster
              const status = await appData.storage.copyRemoteAt(
                pathOfFile,
                req.params.clusterid,
                pathOfFile,
              );
  
              if (!status.found) {
                res.status(404).end("File does not exist at remote cluster");
                return;
              }
            } catch (err) {
              logger.error(
                {
                  functionName: "initializeApp",
                  message: "Failed to copy remote file to rebuild CDN",
                  err,
                },
              );
  
              res.status(500).end("Failed connection to remote cluster");
              return;
            }
          }
  
          appData.storage.serve(req, res, next);
        }
      } else if (req.method === "DELETE") {
        if (req.params.clusterid !== CLUSTER_ID) {
          res.status(400).end("A delete request must be done to the respective cluster that owns the subdomain, requested: " +
            JSON.stringify(req.params.clusterid) + " but the respondant is: " + JSON.stringify(CLUSTER_ID));
          return;
        }

        const token = req.headers["token"];

        if (!token || typeof token !== "string") {
          res.status(403).end("Missing token in headers");
          return;
        }

        try {
          const verifyToken = await jwtVerify(token, appData.storage.storageJWTKey) as any;

          let expectedPathOfFile = verifyToken.pathname;
          if (!pathOfFile.startsWith("/")) {
            expectedPathOfFile = "/" + expectedPathOfFile;
          }

          if (expectedPathOfFile !== pathOfFile) {
            res.status(403).end("Token does not grant removal of the given path");
            return;
          }
        } catch (err) {
          res.status(403).end("Invalid token");
          return;
        };

        appData.storage.removeOwnPath(pathOfFile);
      } else if (req.method === "HEAD") {
        if (req.params.clusterid !== CLUSTER_ID) {
          res.status(400).end("A head request must be done to the respective cluster that owns the subdomain, requested: " +
            JSON.stringify(req.params.clusterid) + " but the respondant is: " + JSON.stringify(CLUSTER_ID));
          return;
        }

        res.status(appData.storage.existsOwn(pathOfFile) ? 200 : 404).end();
        return;
      } else if (req.method === "POST") {
        if (req.params.clusterid !== CLUSTER_ID) {
          res.status(400).end("A post request must be done to the respective cluster that owns the subdomain, requested: " +
            JSON.stringify(req.params.clusterid) + " but the respondant is: " + JSON.stringify(CLUSTER_ID));
          return;
        }

        const token = req.headers["token"];

        if (!token || typeof token !== "string") {
          res.status(403).end("Missing token in headers");
          return;
        }

        try {
          const verifyToken = await jwtVerify(token, appData.storage.storageJWTKey) as any;

          let expectedPathOfFile = verifyToken.pathname;
          if (!pathOfFile.startsWith("/")) {
            expectedPathOfFile = "/" + expectedPathOfFile;
          }

          if (expectedPathOfFile !== pathOfFile) {
            res.status(403).end("Token does not grant add/modify to the given path");
            return;
          }
        } catch (err) {
          res.status(403).end("Invalid token");
          return;
        };

        try {
          // pipe the stream directly to the storage
          // it should save it to a file
          await appData.storage.save(
            pathOfFile,
            req,
          );
          res.status(200).end();
        } catch (err) {
          res.status(500).end("Internal Server Error");
        }
      } else {
        res.status(400).end("Invalid method");
        return;
      }
    }
  );

  const hostname = NODE_ENV === "production" ? appData.config.productionHostname : appData.config.developmentHostname;
  const host = "https://" + hostname;
  app.get("/robots.txt", (req, res) => {
    res.setHeader("content-type", "text/plain; charset=utf-8");

    if (NO_SEO) {
      res.end("user-agent: *\ndisallow: /\n");
      return;
    }

    let result: string = "user-agent: *\ndisallow: /rest/util/*\ndisallow: /rest/index-check/*\n" +
      "disallow: /rest/currency-factors\ndisallow: /rq\ndisallow: /rq\n";

    if (appData.seoConfig) {
      Object.keys(appData.seoConfig.seoRules).forEach((urlSet) => {
        const rule = appData.seoConfig.seoRules[urlSet];
        if (!rule.crawable) {
          const splittedSet = urlSet.replace(/^:[A-Za-z_-]+/g, "*").split(",");
          appData.config.supportedLanguages.forEach((supportedLanguage) => {
            splittedSet.forEach((denyURL) => {
              result += "disallow: /" + supportedLanguage
              if (!denyURL.startsWith("/")) {
                result += "/"
              }
              result += denyURL;
            });
          });
        }
      });
      result += "Sitemap: " + host + (host.endsWith("/") ? "" : "/") + "sitemap.xml";
    }

    res.end(result);
  });

  if (!NO_SEO) {
    const seoGenerator = new SEOGenerator(
      appData.seoConfig.seoRules,
      appData.rawDB,
      appData.root,
      appData.config.supportedLanguages,
      hostname,
      appData.buildnumber,
    );

    app.get("/sitemap.xml", (req, res) => {
      seoGenerator.provide(req, res);
    });
  } else {
    app.get("/sitemap.xml", (req, res) => {
      res.status(404).end();
    });
  }

  // and now the main index setup
  app.get("*", (req, res) => {
    const mode = getMode(appData, req);
    if (mode === "development") {
      ssrGenerator(appData, mode, {
        mode: "html",
        req, res,
        html: appData.indexDevelopment,
      });
    } else {
      ssrGenerator(appData, mode, {
        mode: "html",
        req, res,
        html: appData.indexProduction,
      });
    }
  });
}