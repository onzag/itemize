import Root from "../base/Root";
import Module from "../base/Root/Module";
import ItemDefinition from "../base/Root/Module/ItemDefinition";
import { IServerDataType } from ".";
import { logger } from "./logger";
import {
  SERVER_DATA_IDENTIFIER, SERVER_DATA_MIN_UPDATE_TIME, CURRENCY_FACTORS_IDENTIFIER,
  CONNECTOR_SQL_COLUMN_ID_FK_NAME, CONNECTOR_SQL_COLUMN_VERSION_FK_NAME, UNSPECIFIED_OWNER, SERVER_MAPPING_TIME
} from "../constants";
import { ISensitiveConfigRawJSONDataType, IConfigRawJSONDataType } from "../config";
import PropertyDefinition from "../base/Root/Module/ItemDefinition/PropertyDefinition";
import uuid from "uuid";
import Include from "../base/Root/Module/ItemDefinition/Include";
import { SEOGenerator } from "./seo/generator";
import { IRedisEvent } from "../base/remote-protocol";
import { ServiceProvider } from "./services";
import CurrencyFactorsProvider from "./services/base/CurrencyFactorsProvider";
import { RegistryService } from "./services/registry";
import { ItemizeRedisClient } from "./redis";
import { ISQLTableRowValue } from "../base/Root/sql";
import MailProvider from "./services/base/MailProvider";
import { DatabaseConnection } from "../database";
import { IManyValueType } from "../database/base";

interface IMantainProp {
  pdef: PropertyDefinition;
  itemDefinition: ItemDefinition;
  include: Include;
};

const wait = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

export class GlobalManager {
  private root: Root;
  private databaseConnection: DatabaseConnection;
  private globalCache: ItemizeRedisClient;
  private redisPub: ItemizeRedisClient;
  private idefNeedsMantenience: ItemDefinition[];
  private modNeedsMantenience: Module[];
  private serverData: IServerDataType;
  private serverDataLastUpdated: number;
  private seoGenLastUpdated: number;
  private currencyFactorsProvider: CurrencyFactorsProvider<any>;
  private sensitiveConfig: ISensitiveConfigRawJSONDataType;
  private mailProvider: MailProvider<any>;
  private config: IConfigRawJSONDataType;
  private seoGenerator: SEOGenerator;
  private customServices: {
    [name: string]: ServiceProvider<any>,
  };
  private registry: RegistryService;

  constructor(
    root: Root,
    databaseConnection: DatabaseConnection,
    globalCache: ItemizeRedisClient,
    redisPub: ItemizeRedisClient,
    config: IConfigRawJSONDataType,
    sensitiveConfig: ISensitiveConfigRawJSONDataType,
    currencyFactorsProvider: CurrencyFactorsProvider<any>,
    mailProvider: MailProvider<any>,
    registry: RegistryService,
  ) {
    this.root = root;
    this.databaseConnection = databaseConnection;
    this.globalCache = globalCache;
    this.redisPub = redisPub;
    this.idefNeedsMantenience = [];
    this.modNeedsMantenience = [];
    this.serverData = null;
    this.config = config;
    this.sensitiveConfig = sensitiveConfig;
    this.registry = registry;
    this.mailProvider = mailProvider;

    this.currencyFactorsProvider = currencyFactorsProvider;

    this.customServices = {};

    mailProvider &&
      mailProvider.setupGlobalResources(this.databaseConnection, this.globalCache, this.redisPub, this.mailProvider, this.customServices, this.root);
    currencyFactorsProvider &&
      currencyFactorsProvider.setupGlobalResources(this.databaseConnection, this.globalCache, this.redisPub, this.mailProvider, this.customServices, this.root);

    this.processIdef = this.processIdef.bind(this);
    this.processModule = this.processModule.bind(this);
    this.run = this.run.bind(this);
    this.addAdminUserIfMissing = this.addAdminUserIfMissing.bind(this);

    const modules = this.root.getAllModules();
    modules.forEach(this.processModule);

    this.addAdminUserIfMissing();
  }
  public setSEOGenerator(seoGenerator: SEOGenerator) {
    this.seoGenerator = seoGenerator;
  }
  public installGlobalService(service: ServiceProvider<any>) {
    this.customServices[service.getInstanceName()] = service;
    service.setupGlobalResources(this.databaseConnection, this.globalCache, this.redisPub, this.mailProvider, this.customServices, this.root);
  }
  public async initializeServices() {
    if (this.mailProvider) {
      await this.mailProvider.initialize();
    }
    if (this.currencyFactorsProvider) {
      await this.currencyFactorsProvider.initialize();
    }

    await Promise.all(
      Object.keys(this.customServices).map((sKey) => {
        return this.customServices[sKey].initialize();
      })
    );
  }
  private async addAdminUserIfMissing() {
    if (!this.config.roles.includes("ADMIN")) {
      logger.info(
        "GlobalManager.addAdminUserIfMissing: admin role is not included within the roles, avoiding this check",
      );
      return;
    }

    const userMod = this.root.getModuleFor(["users"]);
    const userIdef = userMod.getItemDefinitionFor(["user"]);
    const moduleTable = userMod.getQualifiedPathName();
    const selfTable = userIdef.getQualifiedPathName();
    let primaryAdminUser: any;
    try {
      primaryAdminUser = await this.databaseConnection.queryFirst(
        `SELECT ${JSON.stringify(CONNECTOR_SQL_COLUMN_ID_FK_NAME)} FROM ${JSON.stringify(selfTable)} WHERE "role"='ADMIN' LIMIT 1`,
      );
    } catch (err) {
      logger.error(
        "GlobalManager.addAdminUserIfMissing [SERIOUS]: database does not appear to be connected",
        {
          errMessage: err.message,
          errStack: err.stack,
        }
      );
    }

    if (!primaryAdminUser) {
      logger.info(
        "GlobalManager.addAdminUserIfMissing: admin user is considered missing, adding one",
      );

      let currentAdminUserWithSuchUsername: any;
      try {
        currentAdminUserWithSuchUsername = await this.databaseConnection.queryFirst(
          `SELECT ${JSON.stringify(CONNECTOR_SQL_COLUMN_ID_FK_NAME)} FROM ${JSON.stringify(selfTable)} WHERE "username"='admin' LIMIT 1`,
        );
      } catch (err) {
        logger.error(
          "GlobalManager.addAdminUserIfMissing [SERIOUS]: database does not appear to be connected",
          {
            errMessage: err.message,
            errStack: err.stack,
          }
        );
      }

      let username = "admin";
      if (currentAdminUserWithSuchUsername) {
        username = "admin" + (new Date()).getTime();
      }

      const password = uuid.v4().replace(/\-/g, "");

      const sqlModData: IManyValueType = {
        type: userIdef.getQualifiedPathName(),
        last_modified: [
          "NOW()",
          [],
        ],
        created_at: [
          "NOW()",
          [],
        ],
        created_by: UNSPECIFIED_OWNER,
        version: "",
        container_id: this.sensitiveConfig.defaultContainerID,
      }

      const sqlIdefData: IManyValueType = {
        username,
        password: [
          "crypt(?, gen_salt('bf',10))",
          [
            password,
          ]
        ],
        role: "ADMIN",
        app_language: this.config.fallbackLanguage,
        app_country: this.config.fallbackCountryCode,
        app_currency: this.config.fallbackCurrency,
      }

      const moreIdefProperties = userIdef.getAllPropertyDefinitionsAndExtensions();
      moreIdefProperties.forEach((p) => {
        const id = p.getId();
        const isExtension = p.isExtension();

        if ((isExtension && !sqlModData[id]) || (!isExtension && !sqlIdefData[id])) {
          const value = p.getCurrentValue(null, null);
          const sqlInValue: ISQLTableRowValue = p.getPropertyDefinitionDescription().sqlIn({
            dictionary: "english",
            id,
            itemDefinition: userIdef,
            prefix: "",
            property: p,
            serverData: this.serverData,
            value,
          });

          if (isExtension) {
            Object.assign(sqlModData, sqlInValue);
          } else {
            Object.assign(sqlIdefData, sqlInValue);
          }
        }
      });

      try {
        await this.databaseConnection.startTransaction(async (transactingDatabase) => {
          const insertQueryMod = transactingDatabase.getInsertBuilder().table(moduleTable);
          insertQueryMod.insert(sqlModData).returningBuilder.returningAll();
          const insertQueryValueMod = await transactingDatabase.queryFirst(insertQueryMod);

          sqlIdefData[CONNECTOR_SQL_COLUMN_ID_FK_NAME] = insertQueryValueMod.id;
          sqlIdefData[CONNECTOR_SQL_COLUMN_VERSION_FK_NAME] = insertQueryValueMod.version;

          const insertQueryIdef = transactingDatabase.getInsertBuilder().table(selfTable);
          insertQueryIdef.insert(sqlIdefData).returningBuilder.returningAll();
          const insertQueryValueIdef = await transactingDatabase.queryFirst(insertQueryIdef);

          return {
            ...insertQueryValueMod,
            ...insertQueryValueIdef,
          };
        });
      } catch (err) {
        logger.error(
          "GlobalManager.addAdminUserIfMissing: Failed to add admin user when it was considered missing",
          {
            errMessage: err.message,
            errStack: err.stack,
          }
        );
      }

      logger.info(
        "GlobalManager.addAdminUserIfMissing: Sucessfully added admin user",
        {
          username,
          password,
        }
      )
    }
  }
  private processModule(mod: Module) {
    mod.getAllModules().forEach(this.processModule);
    const hasSqlManteniedProperties =
      mod.getAllPropExtensions().some((p) => p.getPropertyDefinitionDescription().sqlMantenience && p.isSearchable());
    if (hasSqlManteniedProperties) {
      logger.info(
        "GlobalManager.processModule: found module that needs mantenience " + mod.getQualifiedPathName(),
      );
      this.modNeedsMantenience.push(mod);

      const requestLimiters = mod.getRequestLimiters();
      const sinceLimiter = requestLimiters && requestLimiters.condition === "AND" && requestLimiters.since;
      if (!requestLimiters || !sinceLimiter) {
        logger.info(
          "GlobalManager.processModule: module has definitions that need mantenience but they hold no AND since request limiter " + mod.getQualifiedPathName(),
        );
      }
    }
    const childItemDefinitions = mod.getAllChildItemDefinitions();
    childItemDefinitions.forEach(this.processIdef);
  }
  private processIdef(idef: ItemDefinition) {
    idef.getChildDefinitions().forEach(this.processIdef);

    const hasSqlManteniedProperties =
      idef.getAllPropertyDefinitions().some((p) => p.getPropertyDefinitionDescription().sqlMantenience && p.isSearchable());

    const hasIncludeSQLManteniedProperties =
      idef.getAllIncludes().some((i) => {
        return i.getSinkingProperties().some((sp) => sp.getPropertyDefinitionDescription().sqlMantenience && sp.isSearchable());
      });

    if (hasSqlManteniedProperties || hasIncludeSQLManteniedProperties) {
      logger.info(
        "GlobalManager.processIdef: found item definition that needs mantenience " + idef.getQualifiedPathName(),
      );
      this.idefNeedsMantenience.push(idef);

      const requestLimiters = idef.getRequestLimiters() || (idef.getParentModule()).getRequestLimiters();
      const sinceLimiter = requestLimiters && requestLimiters.condition === "AND" && requestLimiters.since;
      if (!requestLimiters || !sinceLimiter) {
        logger.info(
          "GlobalManager.processIdef: item definition need mantenience but item definition nor module holds no AND since request limiter " + idef.getQualifiedPathName(),
        );
      }
    }
  }
  public run() {
    logger.info("GlobalManager.run: running global manager");

    // currency factors shoudn't really have its own execution but who knows
    if (this.currencyFactorsProvider) {
      this.currencyFactorsProvider.execute();
    }

    // hijack the seo generator and do our own executions
    if (this.seoGenerator) {
      (async () => {
        while (true) {
          this.seoGenLastUpdated = (new Date()).getTime();

          logger.info("GlobalManager.run: running SEO Generator");
          try {
            await this.seoGenerator.run();
          } catch (err) {
            logger.error(
              "GlobalManager.run [SERIOUS]: Seo generator failed to run",
              {
                errStack: err.stack,
                errMessage: err.message,
              }
            );
          }

          const nowTime = (new Date()).getTime();
          const timeItPassedSinceSeoGenRan = nowTime - this.seoGenLastUpdated;
          const timeUntilSeoGenNeedsToRun = SERVER_MAPPING_TIME - timeItPassedSinceSeoGenRan;

          if (timeUntilSeoGenNeedsToRun <= 0) {
            logger.error(
              "GlobalManager.run [SERIOUS]: during the processing of events the time needed until next mapping was negative" +
              " this means the server took forever doing the last mapping, clearly something is off",
              {
                timeUntilSeoGenNeedsToRun,
              }
            );
          } else {
            logger.info("GlobalManager.run: SEO generator tasked to run in " + timeUntilSeoGenNeedsToRun + "ms");
            await wait(timeUntilSeoGenNeedsToRun);
          }
        }
      })();
    }

    // this is what it's used with currency factors in reality
    (async () => {
      while (true) {
        this.serverDataLastUpdated = (new Date()).getTime();

        await this.calculateServerData();

        try {
          await this.runOnce();
        } catch (err) {
          logger.error(
            "GlobalManager.run [SERIOUS]: run once function failed to run",
            {
              errStack: err.stack,
              errMessage: err.message,
            }
          );
        }

        const nowTime = (new Date()).getTime();
        const timeItPassedSinceServerDataLastUpdated = nowTime - this.serverDataLastUpdated;
        const timeUntilItNeedsToUpdate = SERVER_DATA_MIN_UPDATE_TIME - timeItPassedSinceServerDataLastUpdated;

        if (timeUntilItNeedsToUpdate <= 0) {
          logger.error(
            "GlobalManager.run [SERIOUS]: during the processing of events the time needed until next update was negative" +
            " this means the server took too long doing mantenience tasks, this means your database is very large, while this is not " +
            " a real error as it was handled gracefully, this should be addressed to itemize developers",
            {
              timeUntilItNeedsToUpdate,
            }
          );
        } else {
          logger.info("GlobalManager.run: Server data and updater tasked to run in " + timeUntilItNeedsToUpdate + "ms");
          await wait(timeUntilItNeedsToUpdate);
        }
      }
    })();

    // execute every custom service
    Object.keys(this.customServices).forEach((s) => this.customServices[s].execute());
  }
  private async runOnce() {
    for (const mod of this.modNeedsMantenience) {
      await this.runForModule(mod);
    }
    for (const idef of this.idefNeedsMantenience) {
      await this.runForIdef(idef);
    }
  }
  private async runForModule(mod: Module) {
    const propertiesThatNeedMantenience: IMantainProp[] =
      mod.getAllPropExtensions().filter((p) => p.getPropertyDefinitionDescription().sqlMantenience && p.isSearchable()).map((p) => ({
        pdef: p,
        itemDefinition: null,
        include: null,
      }));
    const limiters = mod.getRequestLimiters();
    const since = limiters && limiters.condition === "AND" ? limiters.since : null;
    await this.runFor(mod.getQualifiedPathName(), true, propertiesThatNeedMantenience, since);
  }
  private async runForIdef(idef: ItemDefinition) {
    const propertiesThatNeedMantenience: IMantainProp[] =
      idef.getAllPropertyDefinitions().filter((p) => p.getPropertyDefinitionDescription().sqlMantenience && p.isSearchable()).map((p) => ({
        pdef: p,
        itemDefinition: idef,
        include: null,
      }));

    const includePropertiesThatNeedMantenience: IMantainProp[][] = idef.getAllIncludes().map((i) => {
      return i.getSinkingProperties().filter((sp) => sp.getPropertyDefinitionDescription().sqlMantenience && sp.isSearchable()).map((sp) => ({
        pdef: sp,
        include: i,
        itemDefinition: idef,
      }));
    });

    let totalPropertiesThatNeedMantenience: IMantainProp[] = propertiesThatNeedMantenience;
    includePropertiesThatNeedMantenience.forEach((includePropArray) => {
      totalPropertiesThatNeedMantenience = totalPropertiesThatNeedMantenience.concat(includePropArray);
    });
    const limiters = idef.getRequestLimiters() || (idef.getParentModule()).getRequestLimiters();
    const since = limiters && limiters.condition === "AND" ? limiters.since : null;
    await this.runFor(idef.getQualifiedPathName(), false, totalPropertiesThatNeedMantenience, since);
  }
  private async runFor(tableName: string, isModule: boolean, properties: IMantainProp[], since: number) {
    const sinceLimiter = since ? new Date((new Date()).getTime() - since) : null;

    // let's build the update rules for the mantenience
    const updateRules: any = {};

    // these are the from tables we should select
    const fromRules: Array<{
      from: string,
      as: string,
    }> = [];

    // and and or rules
    const andWhereRules: Array<[string, any[]]> = [];
    const orWhereRules: Array<[string, any[]]> = [];

    // so we lookup all the properties for mantenience rules
    properties.forEach((p) => {
      // and get one if given
      const mantenienceRule = p.pdef.getPropertyDefinitionDescription().sqlMantenience({
        serverData: null,
        id: p.pdef.getId(),
        prefix: p.include ? p.include.getPrefixedQualifiedIdentifier() : "",
        property: p.pdef,
        itemDefinition: p.itemDefinition,
      });

      // if we get one
      if (mantenienceRule) {
        // we save the data
        updateRules[mantenienceRule.columnToSet] = mantenienceRule.setColumnToRaw;
        if (mantenienceRule.from) {
          fromRules.push({
            from: mantenienceRule.from,
            as: mantenienceRule.fromAs,
          });
        }
        if (mantenienceRule.whereRaw) {
          andWhereRules.push(mantenienceRule.whereRaw);
        }
        if (mantenienceRule.updateConditionRaw) {
          orWhereRules.push(mantenienceRule.updateConditionRaw);
        }
      }
    });

    // now we can build the query
    let query = `UPDATE ${JSON.stringify(tableName)} SET`;
    // and the bindings for that query at the same time
    let bindings: any[] = [];

    query += " " + Object.keys(updateRules).map((columnToSet) => {
      // this specifies what column we are setting and how we are setting it as
      const ruleRawStr = updateRules[columnToSet][0];
      bindings = bindings.concat(updateRules[columnToSet][1]);

      // and we set it to the value
      return JSON.stringify(columnToSet) + " = " + ruleRawStr;
    }).join(", ");

    if (fromRules.length) {
      query += " FROM "
      query += fromRules.map((rule) => {
        return JSON.stringify(rule.from) + " " + JSON.stringify(rule.as);
      }).join(",");
    }

    if (sinceLimiter || orWhereRules.length || andWhereRules.length) {
      query += " WHERE";
    }

    if (sinceLimiter) {
      query += ` "created_at" >= ?`;
      bindings.push(sinceLimiter);
    }

    if (andWhereRules.length) {
      if (sinceLimiter) {
        query += " AND ";
      } else {
        query += " ";
      }
      query += andWhereRules.map((rule) => {
        bindings = bindings.concat(rule[1]);
        return rule[0];
      }).join(" AND ");
    }

    if (orWhereRules.length) {
      if (sinceLimiter || andWhereRules.length) {
        query += " AND (";
      } else {
        query += " (";
      }

      query += orWhereRules.map((rule) => {
        bindings = bindings.concat(rule[1]);
        return rule[0];
      }).join(" OR ");

      query += ")"
    }

    const splitted = query.split("?");
    let pgifiedQuery = "";
    splitted.forEach((v, index) => {
      if (index !== 0) {
        pgifiedQuery += "$" + index;
      }
      pgifiedQuery += v;
    });

    await this.databaseConnection.query(pgifiedQuery, bindings);

    // we do not update last_modified in order to avoid useless updates
    // sql mantenience changes now so that it doesn't inform any client or cluster for changes
    // it could, but now it's considered a search only property, changes are hence, silent

    // UPDATE TABLE "stuffs" SET "normalized_0"=c0."factor"*"value_0", "normalized_1"=c1."factor"*"value_1" FROM "currencyfactors" c0, "currencyfactors" c1 WHERE c0."name"="currency_0" AND c1."name"="currency_1" AND (c0."factor"*s."value_0" > 0.5 OR c1."factor"*"value_1" > 0.5) RETURNING *
    // buggy typescript again
  }
  private async calculateServerData() {
    logger.info("GlobalManager.calculateServerData: Updating server data");

    try {
      this.serverData = {
        [CURRENCY_FACTORS_IDENTIFIER]: this.currencyFactorsProvider ? await this.currencyFactorsProvider.getFactors() : null,
      };
      await this.informNewServerData();
    } catch (err) {
      logger.error(
        "GlobalManager.calculateServerData [SERIOUS]: failed to calculate server data",
        {
          errMessage: err.message,
          errStack: err.stack,
        }
      );
    }
  }
  private async informNewServerData() {
    logger.info("GlobalManager.informNewServerData: Updating database with new server data");

    // STORE currency factors in the database if available
    // for storing
    if (this.serverData[CURRENCY_FACTORS_IDENTIFIER]) {
      let valuesContainer = "";
      let valuesAsArray: Array<string | number> = [];
      Object.keys(
        this.serverData[CURRENCY_FACTORS_IDENTIFIER]
      ).forEach(
        (currencyId, index) => {
          if (valuesContainer) {
            valuesContainer += ",";
          }
          const nValue = index * 2;
          valuesContainer += `($${nValue + 1},$${nValue + 2})`;
          valuesAsArray = valuesAsArray.concat([currencyId, this.serverData[CURRENCY_FACTORS_IDENTIFIER][currencyId]]);
        },
      );
      try {
        await this.databaseConnection.queryFirst(`INSERT INTO ${JSON.stringify(CURRENCY_FACTORS_IDENTIFIER)} ("code", "factor") VALUES ${valuesContainer} ` +
          `ON CONFLICT ("code") DO UPDATE SET "factor" = EXCLUDED."factor"`, valuesAsArray);
      } catch (err) {
        logger.error(
          "GlobalManager.informNewServerData: [SERIOUS] was unable to update database new currency data",
          {
            errMessage: err.message,
            errStack: err.stack,
          }
        );
      }
    }

    logger.info("GlobalManager.informNewServerData: Updating global cache with new server data");

    // stringify the server data
    const stringifiedServerData = JSON.stringify(this.serverData);

    // update the server data so that the instances can receive it
    this.globalCache.redisClient.set(
      SERVER_DATA_IDENTIFIER,
      stringifiedServerData,
      (err: Error) => {
        if (err) {
          logger.error(
            "GlobalManager.informNewServerData: [SERIOUS] was unable to inform for new server data in set",
            {
              errMessage: err.message,
              errStack: err.stack,
            }
          );
        }
      }
    );

    logger.info("GlobalManager.informNewServerData: Informing clusters of new server data");

    const redisEvent: IRedisEvent = {
      source: "global",
      type: SERVER_DATA_IDENTIFIER,
      serverInstanceGroupId: null,
      data: this.serverData,
    }

    // publishing new server data
    this.redisPub.redisClient.publish(
      SERVER_DATA_IDENTIFIER,
      JSON.stringify(redisEvent),
      (err: Error) => {
        if (err) {
          logger.error(
            "GlobalManager.informNewServerData: [SERIOUS] was unable to inform for new server data in publish",
            {
              errMessage: err.message,
              errStack: err.stack,
            }
          );
        }
      }
    );
  }
}