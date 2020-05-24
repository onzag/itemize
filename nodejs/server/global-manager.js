"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const constants_1 = require("../constants");
const remote_protocol_1 = require("../base/remote-protocol");
const currency_layer_1 = require("./services/currency-layer");
const wait = (time) => {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
};
class GlobalManager {
    constructor(root, knex, globalCache, redisPub, sensitiveConfig) {
        this.root = root;
        this.knex = knex;
        this.globalCache = globalCache;
        this.redisPub = redisPub;
        this.idefNeedsMantenience = [];
        this.serverData = null;
        this.currencyLayer = currency_layer_1.setupCurrencyLayer(sensitiveConfig.currencyLayerAccessKey, this.globalCache, sensitiveConfig.currencyLayerHttpsEnabled);
        this.processIdef = this.processIdef.bind(this);
        this.processModule = this.processModule.bind(this);
        this.run = this.run.bind(this);
        const modules = this.root.getAllModules();
        modules.forEach(this.processModule);
    }
    processModule(mod) {
        mod.getAllModules().forEach(this.processModule);
        const childItemDefinitions = mod.getAllChildItemDefinitions();
        childItemDefinitions.forEach(this.processIdef);
    }
    processIdef(idef) {
        idef.getChildDefinitions().forEach(this.processIdef);
        const properties = idef.getAllPropertyDefinitionsAndExtensions().filter((p) => p.getPropertyDefinitionDescription().sqlMantenience);
        if (properties.length) {
            _1.logger.info("GlobalManager.processIdef: found item definition that needs mantenience " + idef.getQualifiedPathName());
            this.idefNeedsMantenience.push(idef);
        }
    }
    async run() {
        while (true) {
            await this.calculateServerData();
            await this.runOnce();
            const nowTime = (new Date()).getTime();
            const timeItPassedSinceServerDataLastUpdated = nowTime - this.serverDataLastUpdated;
            const timeUntilItNeedsToUpdate = constants_1.SERVER_DATA_MIN_UPDATE_TIME - timeItPassedSinceServerDataLastUpdated;
            if (timeUntilItNeedsToUpdate <= 0) {
                _1.logger.error("GlobalManager.processIdef [SERIOUS]: during the processing of events the time needed until next update was negative" +
                    " this means the server took too long doing mantenience tasks, this means your database is very large, while this is not " +
                    " a real error as it was handled gracefully, this should be addressed to itemize developers", {
                    timeUntilItNeedsToUpdate,
                });
            }
            else {
                await wait(timeUntilItNeedsToUpdate);
            }
        }
    }
    async runOnce() {
        for (const idef of this.idefNeedsMantenience) {
            await this.runForIdef(idef);
        }
    }
    async runForIdef(idef) {
        const propertiesThatNeedMantenience = idef.getAllPropertyDefinitionsAndExtensions().filter((p) => p.getPropertyDefinitionDescription().sqlMantenience);
        const containsPropertiesInModule = propertiesThatNeedMantenience.some((p) => p.isExtension());
        const containsPropertiesInIdef = propertiesThatNeedMantenience.some((p) => !p.isExtension());
        const countResponse = await this.knex.count("MODULE_ID as COUNT").from(idef.getQualifiedPathName());
        const finalCount = countResponse[0].COUNT;
        // TODO
        // UPDATE TABLE "stuffs" SET "normalized_0"=c0."factor"*"value_0", "normalized_1"=c1."factor"*"value_1" FROM "currencyfactors" c0, "currencyfactors" c1 WHERE c0."name"="currency_0" AND c1."name"="currency_1" AND (c0."factor"*s."value_0" > 0.5 OR c1."factor"*"value_1" > 0.5) RETURNING *
        // await this.knex.transaction((transactionKnex) => {
        //   transactionKnex(idef.getQualifiedPathName()).update()
        // });
    }
    async calculateServerData() {
        try {
            this.serverData = {
                [constants_1.CURRENCY_FACTORS_IDENTIFIER]: await this.currencyLayer.requestCurrencyFactors(),
            };
            this.serverDataLastUpdated = (new Date()).getTime();
            await this.informNewServerData();
        }
        catch (err) {
            _1.logger.error("GlobalManager.calculateServerData [SERIOUS]: failed to calculate server data", {
                errMessage: err.message,
                errStack: err.stack,
            });
        }
    }
    async informNewServerData() {
        let valuesContainer = "";
        let valuesAsArray = [];
        Object.keys(this.serverData[constants_1.CURRENCY_FACTORS_IDENTIFIER]).forEach((currencyId) => {
            if (valuesContainer) {
                valuesContainer += ",";
            }
            valuesContainer += "(?,?)";
            valuesAsArray = valuesAsArray.concat([currencyId, this.serverData[constants_1.CURRENCY_FACTORS_IDENTIFIER][currencyId]]);
        });
        try {
            await this.knex.raw(`INSERT INTO ?? ("code", "factor") VALUES ${valuesContainer} ` +
                `ON CONFLICT ("code") DO UPDATE SET "factor" = EXCLUDED."factor"`, [constants_1.CURRENCY_FACTORS_IDENTIFIER].concat(valuesAsArray));
        }
        catch (err) {
            _1.logger.error("GlobalManager.informNewServerData: [SERIOUS] was unable to update database new currency data", {
                errMessage: err.message,
                errStack: err.stack,
            });
        }
        const stringifiedServerData = JSON.stringify(this.serverData);
        this.globalCache.set(constants_1.SERVER_DATA_IDENTIFIER, stringifiedServerData, (err) => {
            if (err) {
                _1.logger.error("GlobalManager.informNewServerData: [SERIOUS] was unable to inform for new server data in set", {
                    errMessage: err.message,
                    errStack: err.stack,
                });
            }
        });
        this.redisPub.publish(constants_1.SERVER_DATA_IDENTIFIER, stringifiedServerData, (err) => {
            if (err) {
                _1.logger.error("GlobalManager.informNewServerData: [SERIOUS] was unable to inform for new server data in publish", {
                    errMessage: err.message,
                    errStack: err.stack,
                });
            }
        });
    }
    async informUpdatesFor(idef, id, version) {
        const mergedIndexIdentifier = idef.getQualifiedPathName() + "." + id + "." + (version || "");
        const redisEvent = {
            event,
            listenerUUID: null,
            serverInstanceGroupId: null,
            mergedIndexIdentifier,
            eventType: remote_protocol_1.CHANGED_FEEEDBACK_EVENT,
        };
        _1.logger.debug("Listener.informUpdatesFor: triggering redis event", redisEvent);
        this.redisPub.publish(mergedIndexIdentifier, JSON.stringify(redisEvent));
    }
}
exports.GlobalManager = GlobalManager;
