import Knex from "knex";
import { RedisClient } from "redis";
import Root from "../base/Root";
import Module from "../base/Root/Module";
import ItemDefinition from "../base/Root/Module/ItemDefinition";
import { logger, IServerDataType } from ".";
import { SERVER_DATA_IDENTIFIER, SERVER_DATA_MIN_UPDATE_TIME, CURRENCY_FACTORS_IDENTIFIER,
  CONNECTOR_SQL_COLUMN_ID_FK_NAME, CONNECTOR_SQL_COLUMN_VERSION_FK_NAME, UNSPECIFIED_OWNER } from "../constants";
import { ISensitiveConfigRawJSONDataType, IConfigRawJSONDataType } from "../config";
import { CurrencyLayer, setupCurrencyLayer } from "./services/currency-layer";
import PropertyDefinition from "../base/Root/Module/ItemDefinition/PropertyDefinition";
import uuid from "uuid";
import Include from "../base/Root/Module/ItemDefinition/Include";

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
  private knex: Knex;
  private globalCache: RedisClient;
  private redisPub: RedisClient;
  private idefNeedsMantenience: ItemDefinition[];
  private modNeedsMantenience: Module[];
  private serverData: IServerDataType;
  private serverDataLastUpdated: number;
  private currencyLayer: CurrencyLayer;
  private sensitiveConfig: ISensitiveConfigRawJSONDataType;
  private config: IConfigRawJSONDataType;
  constructor(
    root: Root,
    knex: Knex,
    globalCache: RedisClient,
    redisPub: RedisClient,
    config: IConfigRawJSONDataType,
    sensitiveConfig: ISensitiveConfigRawJSONDataType,
  ) {
    this.root = root;
    this.knex = knex;
    this.globalCache = globalCache;
    this.redisPub = redisPub;
    this.idefNeedsMantenience = [];
    this.modNeedsMantenience = [];
    this.serverData = null;
    this.config = config;
    this.sensitiveConfig = sensitiveConfig;

    this.currencyLayer = setupCurrencyLayer(sensitiveConfig.currencyLayerAccessKey, this.globalCache, sensitiveConfig.currencyLayerHttpsEnabled);

    this.processIdef = this.processIdef.bind(this);
    this.processModule = this.processModule.bind(this);
    this.run = this.run.bind(this);
    this.addAdminUserIfMissing = this.addAdminUserIfMissing.bind(this);

    const modules = this.root.getAllModules();
    modules.forEach(this.processModule);

    this.addAdminUserIfMissing();
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
    const primaryAdminUser = await this.knex.first(CONNECTOR_SQL_COLUMN_ID_FK_NAME).from(selfTable).where("role", "ADMIN");

    if (!primaryAdminUser) {
      logger.info(
        "GlobalManager.addAdminUserIfMissing: admin user is considered missing, adding one",
      );

      const currentAdminUserWithSuchUsername =
        await this.knex.first(CONNECTOR_SQL_COLUMN_ID_FK_NAME).from(selfTable).where("username", "admin");
      let username = "admin";
      if (currentAdminUserWithSuchUsername) {
        username = "admin" + (new Date()).getTime();
      }

      const password = uuid.v4().replace(/\-/g,"");

      const sqlModData = {
        type: userIdef.getQualifiedPathName(),
        last_modified: this.knex.fn.now(),
        created_at: this.knex.fn.now(),
        created_by: UNSPECIFIED_OWNER,
        version: "",
        container_id: this.sensitiveConfig.defaultContainerID,
      }

      const sqlIdefData = {
        username,
        password: this.knex.raw("crypt(?, gen_salt('bf',10))", password),
        role: "ADMIN",
        app_language: this.config.fallbackLanguage,
        app_country: this.config.fallbackCountryCode,
        app_currency: this.config.fallbackCurrency,
      }

      try {
        await this.knex.transaction(async (transactionKnex) => {
          const insertQueryValueMod = await transactionKnex(moduleTable)
            .insert(sqlModData).returning("*");
    
          sqlIdefData[CONNECTOR_SQL_COLUMN_ID_FK_NAME] = insertQueryValueMod[0].id;
          sqlIdefData[CONNECTOR_SQL_COLUMN_VERSION_FK_NAME] = insertQueryValueMod[0].version;
    
          const insertQueryIdef = transactionKnex(selfTable).insert(sqlIdefData).returning("*");
          const insertQueryValueIdef = await insertQueryIdef;
    
          return {
            ...insertQueryValueMod[0],
            ...insertQueryValueIdef[0],
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

      const mod = idef.getParentModule();
      const requestLimiters = mod.getRequestLimiters();
      const sinceLimiter = requestLimiters && requestLimiters.condition === "AND" && requestLimiters.since;
      if (!requestLimiters || !sinceLimiter) {
        logger.info(
          "GlobalManager.processIdef: item definition need mantenience but module holds no AND since request limiter " + idef.getQualifiedPathName(),
        );
      }
    }
  }
  public async run() {
    while (true) {
      await this.calculateServerData();
      await this.runOnce();

      const nowTime = (new Date()).getTime();
      const timeItPassedSinceServerDataLastUpdated = nowTime - this.serverDataLastUpdated;
      const timeUntilItNeedsToUpdate = SERVER_DATA_MIN_UPDATE_TIME - timeItPassedSinceServerDataLastUpdated;

      if (timeUntilItNeedsToUpdate <= 0) {
        logger.error(
          "GlobalManager.processIdef [SERIOUS]: during the processing of events the time needed until next update was negative" +
          " this means the server took too long doing mantenience tasks, this means your database is very large, while this is not " +
          " a real error as it was handled gracefully, this should be addressed to itemize developers",
          {
            timeUntilItNeedsToUpdate,
          }
        );
      } else {
        await wait(timeUntilItNeedsToUpdate);
      }
    }
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
    const mod = idef.getParentModule();
    const limiters = mod.getRequestLimiters();
    const since = limiters && limiters.condition === "AND" ? limiters.since : null;
    await this.runFor(idef.getQualifiedPathName(), false, totalPropertiesThatNeedMantenience, since);
  }
  private async runFor(tableName: string, isModule: boolean, properties: IMantainProp[], since: number) {
    const sinceLimiter = since ? new Date((new Date()).getTime() - since) : null;

    const updateRules: any = {};
    const fromRules: Array<{
      from: string,
      as: string,
    }> = [];
    const andWhereRules: any[] = [];
    const orWhereRules: any[] = [];
    properties.forEach((p) => {
      const mantenienceRule = p.pdef.getPropertyDefinitionDescription().sqlMantenience({
        knex: this.knex,
        serverData: null,
        id: p.pdef.getId(),
        prefix: p.include ? p.include.getPrefixedQualifiedIdentifier() : "",
        property: p.pdef,
        itemDefinition: p.itemDefinition,
      });
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
    });

    const updateQuery = this.knex.update(updateRules).table(tableName);
    if (fromRules.length) {
      const bindings: string[] = [];
      const structure = fromRules.map((rule) => {
        bindings.push(rule.from);
        if (rule.as) {
          bindings.push(rule.as);
          return "?? ??";
        }
        return "??";
      });

      const rawFrom = this.knex.raw(structure.join(","), bindings);
      updateQuery.from(rawFrom);
    }
    if (andWhereRules.length) {
      andWhereRules.forEach((wr) => {
        updateQuery.andWhere(wr);
      });
    }
    if (sinceLimiter) {
      updateQuery.andWhere("created_at", ">=", sinceLimiter);
    }
    if (orWhereRules.length) {
      updateQuery.andWhere((orBuilder) => {
        orWhereRules.forEach((orRule) => {
          orBuilder.orWhere(orRule);
        });
      });
    }

    // we do not update last_modified in order to avoid useless updates
    // sql mantenience changes now so that it doesn't inform any client or cluster for changes
    // it could, but now it's considered a search only property, changes are hence, silent

    // UPDATE TABLE "stuffs" SET "normalized_0"=c0."factor"*"value_0", "normalized_1"=c1."factor"*"value_1" FROM "currencyfactors" c0, "currencyfactors" c1 WHERE c0."name"="currency_0" AND c1."name"="currency_1" AND (c0."factor"*s."value_0" > 0.5 OR c1."factor"*"value_1" > 0.5) RETURNING *
    // buggy typescript again
  }
  private async calculateServerData() {
    try {
      this.serverData = {
        [CURRENCY_FACTORS_IDENTIFIER]: await this.currencyLayer.requestCurrencyFactors(),
      };
      this.serverDataLastUpdated = (new Date()).getTime();
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
    let valuesContainer = "";
    let valuesAsArray: Array<string | number> = [];
    Object.keys(
      this.serverData[CURRENCY_FACTORS_IDENTIFIER]
    ).forEach(
      (currencyId) => {
        if (valuesContainer) {
          valuesContainer += ",";
        }
        valuesContainer += "(?,?)";
        valuesAsArray = valuesAsArray.concat([currencyId, this.serverData[CURRENCY_FACTORS_IDENTIFIER][currencyId]]);
      },
    );
    try {
      await this.knex.raw(`INSERT INTO ?? ("code", "factor") VALUES ${valuesContainer} ` +
      `ON CONFLICT ("code") DO UPDATE SET "factor" = EXCLUDED."factor"`, [CURRENCY_FACTORS_IDENTIFIER].concat(valuesAsArray as any));
    } catch(err) {
      logger.error(
        "GlobalManager.informNewServerData: [SERIOUS] was unable to update database new currency data",
        {
          errMessage: err.message,
          errStack: err.stack,
        }
      );
    }
    const stringifiedServerData = JSON.stringify(this.serverData);
    this.globalCache.set(
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
    this.redisPub.publish(
      SERVER_DATA_IDENTIFIER,
      stringifiedServerData,
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