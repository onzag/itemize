import Knex from "knex";
import { RedisClient } from "redis";
import Root from "../base/Root";
import Module from "../base/Root/Module";
import ItemDefinition from "../base/Root/Module/ItemDefinition";
import { logger, IServerDataType } from ".";
import { SERVER_DATA_IDENTIFIER, SERVER_DATA_MIN_UPDATE_TIME, CURRENCY_FACTORS_IDENTIFIER, CONNECTOR_SQL_COLUMN_ID_FK_NAME, CONNECTOR_SQL_COLUMN_VERSION_FK_NAME } from "../constants";
import { CHANGED_FEEEDBACK_EVENT } from "../base/remote-protocol";
import { ISensitiveConfigRawJSONDataType } from "../config";
import { CurrencyLayer, setupCurrencyLayer } from "./services/currency-layer";
import PropertyDefinition from "../base/Root/Module/ItemDefinition/PropertyDefinition";
import { ISQLTableRowValue } from "../base/Root/sql";

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
  constructor(
    root: Root,
    knex: Knex,
    globalCache: RedisClient,
    redisPub: RedisClient,
    sensitiveConfig: ISensitiveConfigRawJSONDataType,
  ) {
    this.root = root;
    this.knex = knex;
    this.globalCache = globalCache;
    this.redisPub = redisPub;
    this.idefNeedsMantenience = [];
    this.modNeedsMantenience = [];
    this.serverData = null;
    this.currencyLayer = setupCurrencyLayer(sensitiveConfig.currencyLayerAccessKey, this.globalCache, sensitiveConfig.currencyLayerHttpsEnabled);

    this.processIdef = this.processIdef.bind(this);
    this.processModule = this.processModule.bind(this);
    this.run = this.run.bind(this);

    const modules = this.root.getAllModules();
    modules.forEach(this.processModule)
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
    const propertiesThatNeedMantenience =
      mod.getAllPropExtensions().filter((p) => p.getPropertyDefinitionDescription().sqlMantenience && p.isSearchable()).map((p) => ({
        pdef: p,
        prefix: "",
      }));
    const limiters = mod.getRequestLimiters();
    const since = limiters && limiters.condition === "AND" ? limiters.since : null;
    await this.runFor(mod.getQualifiedPathName(), true, propertiesThatNeedMantenience, since);
  }
  private async runForIdef(idef: ItemDefinition) {
    const propertiesThatNeedMantenience =
      idef.getAllPropertyDefinitions().filter((p) => p.getPropertyDefinitionDescription().sqlMantenience && p.isSearchable()).map((p) => ({
        pdef: p,
        prefix: "",
      }));

    const includePropertiesThatNeedMantenience = idef.getAllIncludes().map((i) => {
      return i.getSinkingProperties().filter((sp) => sp.getPropertyDefinitionDescription().sqlMantenience && sp.isSearchable()).map((sp) => ({
        pdef: sp,
        prefix: i.getPrefixedQualifiedIdentifier(),
      }));
    });

    let totalPropertiesThatNeedMantenience = propertiesThatNeedMantenience;
    includePropertiesThatNeedMantenience.forEach((includePropArray) => {
      totalPropertiesThatNeedMantenience = totalPropertiesThatNeedMantenience.concat(includePropArray);
    });
    const mod = idef.getParentModule();
    const limiters = mod.getRequestLimiters();
    const since = limiters && limiters.condition === "AND" ? limiters.since : null;
    await this.runFor(idef.getQualifiedPathName(), false, totalPropertiesThatNeedMantenience, since);
  }
  private async runFor(tableName: string, isModule: boolean, properties: Array<{pdef: PropertyDefinition, prefix: string}>, since: number) {
    const sinceLimiter = since ? new Date((new Date()).getTime() - since) : null;

    const updateRules: any = {};
    const fromRules: Array<{
      from: string,
      as: string,
    }> = [];
    const andWhereRules: any[] = [];
    const orWhereRules: any[] = [];
    properties.forEach((p) => {
      const mantenienceRule = p.pdef.getPropertyDefinitionDescription().sqlMantenience(
        p.prefix,
        p.pdef.getId(),
        this.knex,
      );
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

    if (isModule) {
      updateQuery.returning(["id", "version", "type"]);
    } else {
      updateQuery.returning([CONNECTOR_SQL_COLUMN_ID_FK_NAME, CONNECTOR_SQL_COLUMN_VERSION_FK_NAME]);
    }

    // UPDATE TABLE "stuffs" SET "normalized_0"=c0."factor"*"value_0", "normalized_1"=c1."factor"*"value_1" FROM "currencyfactors" c0, "currencyfactors" c1 WHERE c0."name"="currency_0" AND c1."name"="currency_1" AND (c0."factor"*s."value_0" > 0.5 OR c1."factor"*"value_1" > 0.5) RETURNING *
    // buggy typescript again
    const updateResults = (await updateQuery) as any as ISQLTableRowValue[];
    updateResults.forEach((result) => {
      const id = result[isModule ? "id" : CONNECTOR_SQL_COLUMN_ID_FK_NAME];
      const version = result[isModule ? "version" : CONNECTOR_SQL_COLUMN_VERSION_FK_NAME] || null;
      const idefName = isModule ? result["type"] : tableName;
      const idef = this.root.registry[idefName] as ItemDefinition;

      this.informUpdatesFor(
        idef,
        id,
        version,
      );
    });
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
  private async informUpdatesFor(idef: ItemDefinition, id: number, version: string) {
    const mergedIndexIdentifier = idef.getQualifiedPathName() + "." + id + "." + (version || "");
    const redisEvent = {
      event,
      listenerUUID: null as string,
      serverInstanceGroupId: null as string,
      mergedIndexIdentifier,
      eventType: CHANGED_FEEEDBACK_EVENT,
    };
    logger.debug(
      "Listener.informUpdatesFor: triggering redis event",
      redisEvent,
    );
    this.redisPub.publish(mergedIndexIdentifier, JSON.stringify(redisEvent));
  }
}