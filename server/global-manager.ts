import Knex from "knex";
import { RedisClient } from "redis";
import Root from "../base/Root";
import Module from "../base/Root/Module";
import ItemDefinition from "../base/Root/Module/ItemDefinition";
import { logger, IServerDataType } from ".";
import { SERVER_DATA_IDENTIFIER, SERVER_DATA_MIN_UPDATE_TIME, CURRENCY_FACTORS_IDENTIFIER } from "../constants";
import { arrCurrencies } from "../imported-resources";
import { CHANGED_FEEEDBACK_EVENT } from "../base/remote-protocol";
import { ISensitiveConfigRawJSONDataType } from "../config";
import { CurrencyLayer, setupCurrencyLayer } from "./services/currency-layer";

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
    const childItemDefinitions = mod.getAllChildItemDefinitions();
    childItemDefinitions.forEach(this.processIdef);
  }
  private processIdef(idef: ItemDefinition) {
    idef.getChildDefinitions().forEach(this.processIdef);

    const properties =
      idef.getAllPropertyDefinitionsAndExtensions().filter((p) => p.getPropertyDefinitionDescription().sqlMantenience);

    if (properties.length) {
      logger.info(
        "GlobalManager.processIdef: found item definition that needs mantenience " + idef.getQualifiedPathName(),
      );
      this.idefNeedsMantenience.push(idef);
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
    for (const idef of this.idefNeedsMantenience) {
      await this.runForIdef(idef);
    }
  }
  private async runForIdef(idef: ItemDefinition) {
    const propertiesThatNeedMantenience =
      idef.getAllPropertyDefinitionsAndExtensions().filter((p) => p.getPropertyDefinitionDescription().sqlMantenience);

    const containsPropertiesInModule = propertiesThatNeedMantenience.some((p) => p.isExtension())
    const containsPropertiesInIdef = propertiesThatNeedMantenience.some((p) => !p.isExtension())
    
    const countResponse = await this.knex.count("MODULE_ID as COUNT").from(idef.getQualifiedPathName());
    const finalCount = countResponse[0].COUNT;

    // TODO IMPORTANT
    // UPDATE TABLE "stuffs" SET "normalized_0"=c0."factor"*"value_0", "normalized_1"=c1."factor"*"value_1" FROM "currencyfactors" c0, "currencyfactors" c1 WHERE c0."name"="currency_0" AND c1."name"="currency_1" AND (c0."factor"*s."value_0" > 0.5 OR c1."factor"*"value_1" > 0.5) RETURNING *

    // await this.knex.transaction((transactionKnex) => {
    //   transactionKnex(idef.getQualifiedPathName()).update()
    // });
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