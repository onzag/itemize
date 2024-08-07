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
import { resolversRQ } from "./resolvers";
import { MAX_FILES_PER_REQUEST, MAX_FILE_SIZE, MAX_FIELD_SIZE } from "../constants";
import restServices, { secureEndpointRouter } from "./rest";
import { getMode } from "./mode";
import { userRestServices } from "./user/rest";
import { NODE_ENV, NO_SEO } from "./environment";

import { ssrGenerator } from "./ssr/generator";
import { SEOGenerator } from "./seo/generator";
import { getRQSchemaForRoot } from "../base/Root/rq";
import { rqSystem } from "./rq";

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

  if (appData.sensitiveConfig.localContainer) {
    logger.info(
      {
        functionName: "initializeApp",
        message: "Initializing an uploads endpoint for the cluster",
      },
    );

    app.use(
      "/uploads",
      express.static("uploads", {
        cacheControl: true,
        maxAge: 0,
        immutable: true,
        etag: true,
        dotfiles: "allow",
        lastModified: true,
        index: false,
      })
    );
  }

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