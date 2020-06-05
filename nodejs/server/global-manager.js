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
        this.modNeedsMantenience = [];
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
        const hasSqlManteniedProperties = mod.getAllPropExtensions().some((p) => p.getPropertyDefinitionDescription().sqlMantenience && p.isSearchable());
        if (hasSqlManteniedProperties) {
            _1.logger.info("GlobalManager.processModule: found module that needs mantenience " + mod.getQualifiedPathName());
            this.modNeedsMantenience.push(mod);
            const requestLimiters = mod.getRequestLimiters();
            const sinceLimiter = requestLimiters && requestLimiters.condition === "AND" && requestLimiters.since;
            if (!requestLimiters || !sinceLimiter) {
                _1.logger.info("GlobalManager.processModule: module has definitions that need mantenience but they hold no AND since request limiter " + mod.getQualifiedPathName());
            }
        }
        const childItemDefinitions = mod.getAllChildItemDefinitions();
        childItemDefinitions.forEach(this.processIdef);
    }
    processIdef(idef) {
        idef.getChildDefinitions().forEach(this.processIdef);
        const hasSqlManteniedProperties = idef.getAllPropertyDefinitions().some((p) => p.getPropertyDefinitionDescription().sqlMantenience && p.isSearchable());
        const hasIncludeSQLManteniedProperties = idef.getAllIncludes().some((i) => {
            return i.getSinkingProperties().some((sp) => sp.getPropertyDefinitionDescription().sqlMantenience && sp.isSearchable());
        });
        if (hasSqlManteniedProperties || hasIncludeSQLManteniedProperties) {
            _1.logger.info("GlobalManager.processIdef: found item definition that needs mantenience " + idef.getQualifiedPathName());
            this.idefNeedsMantenience.push(idef);
            const mod = idef.getParentModule();
            const requestLimiters = mod.getRequestLimiters();
            const sinceLimiter = requestLimiters && requestLimiters.condition === "AND" && requestLimiters.since;
            if (!requestLimiters || !sinceLimiter) {
                _1.logger.info("GlobalManager.processIdef: item definition need mantenience but module holds no AND since request limiter " + idef.getQualifiedPathName());
            }
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
        for (const mod of this.modNeedsMantenience) {
            await this.runForModule(mod);
        }
        for (const idef of this.idefNeedsMantenience) {
            await this.runForIdef(idef);
        }
    }
    async runForModule(mod) {
        const propertiesThatNeedMantenience = mod.getAllPropExtensions().filter((p) => p.getPropertyDefinitionDescription().sqlMantenience && p.isSearchable()).map((p) => ({
            pdef: p,
            prefix: "",
        }));
        const limiters = mod.getRequestLimiters();
        const since = limiters && limiters.condition === "AND" ? limiters.since : null;
        await this.runFor(mod.getQualifiedPathName(), true, propertiesThatNeedMantenience, since);
    }
    async runForIdef(idef) {
        const propertiesThatNeedMantenience = idef.getAllPropertyDefinitions().filter((p) => p.getPropertyDefinitionDescription().sqlMantenience && p.isSearchable()).map((p) => ({
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
    async runFor(tableName, isModule, properties, since) {
        const sinceLimiter = since ? new Date((new Date()).getTime() - since) : null;
        const updateRules = {};
        const fromRules = [];
        const andWhereRules = [];
        const orWhereRules = [];
        properties.forEach((p) => {
            const mantenienceRule = p.pdef.getPropertyDefinitionDescription().sqlMantenience(p.prefix, p.pdef.getId(), this.knex);
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
            const bindings = [];
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
        }
        else {
            updateQuery.returning([constants_1.CONNECTOR_SQL_COLUMN_ID_FK_NAME, constants_1.CONNECTOR_SQL_COLUMN_VERSION_FK_NAME]);
        }
        // UPDATE TABLE "stuffs" SET "normalized_0"=c0."factor"*"value_0", "normalized_1"=c1."factor"*"value_1" FROM "currencyfactors" c0, "currencyfactors" c1 WHERE c0."name"="currency_0" AND c1."name"="currency_1" AND (c0."factor"*s."value_0" > 0.5 OR c1."factor"*"value_1" > 0.5) RETURNING *
        // buggy typescript again
        const updateResults = (await updateQuery);
        updateResults.forEach((result) => {
            const id = result[isModule ? "id" : constants_1.CONNECTOR_SQL_COLUMN_ID_FK_NAME];
            const version = result[isModule ? "version" : constants_1.CONNECTOR_SQL_COLUMN_VERSION_FK_NAME] || null;
            const idefName = isModule ? result["type"] : tableName;
            const idef = this.root.registry[idefName];
            this.informUpdatesFor(idef, id, version);
        });
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
