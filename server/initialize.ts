/**
 * This file contains the initialization function that initializes
 * the itemize application, just basically setting up the rest endpoints
 * and whatever the server requires to show something to the client
 * @packageDocumentation
 */

import { IAppDataType, IServerCustomizationDataType, logger, app } from ".";
import express from "express";
import graphqlHTTP from "express-graphql";
import path from "path";
import resolvers from "./resolvers";
import { getGQLSchemaForRoot } from "../base/Root/gql";
import { MAX_ALL_COMBINED_FILES_SIZE, MAX_FILE_SIZE, MAX_FIELD_SIZE, ENDPOINT_ERRORS } from "../constants";
import { GraphQLError } from "graphql";
import { EndpointError, EndpointErrorType } from "../base/errors";
import restServices from "./rest";
import { customUserQueries } from "./user/queries";
import { customUserMutations } from "./user/mutations";
import { graphqlUploadExpress } from "graphql-upload";
import { buildCustomTokenQueries } from "./custom-graphql";
import { getMode } from "./mode";
import { userRestServices } from "./user/rest";

import { ssrGenerator } from "./ssr/generator";

const NODE_ENV = process.env.NODE_ENV;
const NO_SEO = process.env.NO_SEO === "true";

/**
 * This is the function that catches the errors that are thrown
 * within graphql
 * @param error the error that is thrown
 */
const customFormatErrorFn = (error: GraphQLError) => {
  const originalError = error.originalError;
  let constructor = null;
  if (originalError) {
    constructor = originalError.constructor;
  }

  let extensions: EndpointErrorType;
  switch (constructor) {
    case EndpointError:
      const gqlDataInputError = error.originalError as EndpointError;
      extensions = gqlDataInputError.data;
      break;
    default:
      logger.error(
        "customFormatErrorFn: Caught unexpected error from graphql parsing",
        {
          errMessage: error.message,
          errStack: error.stack,
        },
      );
      extensions = {
        message: "Unspecified Error while parsing data",
        code: ENDPOINT_ERRORS.UNSPECIFIED,
      };
  }

  return {
    extensions,
    ...error,
  };
};

/**
 * The resolve wrappers that wraps every resolve function
 * from graphql
 * @param fn the function that is supposed to run
 * @param source graphql source
 * @param args grapql args
 * @param context grapql context
 * @param info graphql info
 */
async function customResolveWrapper(
  fn: any,
  source: any,
  args: any,
  context: any,
  info: any,
): Promise<any> {
  try {
    return await fn(source, args, context, info);
  } catch (err) {
    if (err instanceof EndpointError) {
      throw err;
    }
    logger.error(
      "customResolveWrapper: Found internal server error",
      {
        errStack: err.stack,
        errMessage: err.message,
      }
    );
    throw new EndpointError({
      message: "Internal Server Error",
      code: ENDPOINT_ERRORS.INTERNAL_SERVER_ERROR,
    });
  }
}

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

  // if we have a custom router and custom router endpoint rather than the standard
  if (custom.customRouterEndpoint) {
    app.use(custom.customRouterEndpoint, custom.customRouter(appData));
  } else if (custom.customRouter) {
    app.use(custom.customRouter(appData));
  }

  // adding rest services
  app.use("/rest/user", userRestServices(appData));
  app.use("/rest", restServices(appData));
  routers.forEach((r) => {
    app.use("/rest/service", r);
  });

  const customUserQueriesProcessed = customUserQueries(appData);
  appData.customUserTokenQuery = customUserQueriesProcessed.token.resolve;

  // custom graphql queries combined
  const allCustomQueries = {
    ...customUserQueriesProcessed,
    ...(custom.customGQLQueries && custom.customGQLQueries(appData)),
    ...(custom.customTokenGQLQueries && buildCustomTokenQueries(appData, custom.customTokenGQLQueries)),
  };

  // custom mutations combined
  const allCustomMutations = {
    ...customUserMutations(appData),
    ...(custom.customGQLMutations && custom.customGQLMutations(appData)),
  };

  // now we need to combine such queries with the resolvers
  const finalAllCustomQueries = {};
  Object.keys(allCustomQueries).forEach((customQueryKey) => {
    finalAllCustomQueries[customQueryKey] = {
      ...allCustomQueries[customQueryKey],
      resolve: customResolveWrapper.bind(null, allCustomQueries[customQueryKey].resolve),
    };
  });

  // do the same with the mutations
  const finalAllCustomMutations = {};
  Object.keys(allCustomMutations).forEach((customMutationKey) => {
    finalAllCustomMutations[customMutationKey] = {
      ...allCustomMutations[customMutationKey],
      resolve: customResolveWrapper.bind(null, allCustomMutations[customMutationKey].resolve),
    };
  });

  // now weadd the graphql endpoint
  app.use(
    "/graphql",
    graphqlUploadExpress({
      maxFileSize: MAX_FILE_SIZE,
      maxFiles: MAX_ALL_COMBINED_FILES_SIZE,
      maxFieldSize: MAX_FIELD_SIZE,
    }),
    graphqlHTTP({
      schema: getGQLSchemaForRoot(
        appData.root,
        finalAllCustomQueries,
        finalAllCustomMutations,
        resolvers(appData),
      ),
      graphiql: true,
      customFormatErrorFn,
    }),
  );

  // service worker setup
  app.get("/sw.development.js", (req, res) => {
    res.sendFile(path.resolve(path.join("dist", "data", "service-worker.development.js")));
  });
  app.get("/sw.production.js", (req, res) => {
    res.sendFile(path.resolve(path.join("dist", "data", "service-worker.production.js")));
  });

  if (appData.sensitiveConfig.localContainer) {
    logger.warn(
      "initializeApp: Initializing an uploads endpoint for the cluster",
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
  app.get("/robots.txt", (req, res) => {
    res.setHeader("content-type", "text/plain; charset=utf-8");

    if (NO_SEO) {
      res.end("user-agent: *\ndisallow: /\n");
      return;
    }

    let result: string = "user-agent: *\ndisallow: /rest/util/*\ndisallow: /rest/index-check/*\n" +
      "disallow: /rest/currency-factors\ndisallow: /graphql\n";
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

      const prefix = appData.storage[appData.sensitiveConfig.seoContainerID].getPrefix();
      let host = "";
      if (prefix.startsWith("/")) {
        host = "https://" +
          (
            process.env.NODE_ENV === "production" ?
            appData.config.productionHostname :
            appData.config.developmentHostname
          );
      }
      result += "Sitemap: " + host +
        prefix + (prefix.endsWith("/") ? "" : "/") + 
        "sitemaps/" + hostname + "/index.xml";
    }

    res.end(result);
  });

  if (!NO_SEO) {
    const prefix = appData.storage[appData.sensitiveConfig.seoContainerID].getPrefix();
    app.get("/sitemap.xml", (req, res) => {
      res.redirect(prefix + (prefix.endsWith("/") ? "" : "/") + "sitemaps/" + hostname + "/index.xml")
    });
  }

  // and now the main index setup
  app.get("*", (req, res) => {
    const mode = getMode(appData, req);
    if (mode === "development") {
      ssrGenerator(req, res, appData.indexDevelopment, appData, mode);
    } else {
      ssrGenerator(req, res, appData.indexProduction, appData, mode);
    }
  });
}