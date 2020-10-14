"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalManager = void 0;
const _1 = require(".");
const constants_1 = require("../constants");
const currency_layer_1 = require("./services/currency-layer");
const uuid_1 = __importDefault(require("uuid"));
;
const wait = (time) => {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
};
class GlobalManager {
    constructor(root, knex, globalCache, redisPub, config, sensitiveConfig) {
        this.root = root;
        this.knex = knex;
        this.globalCache = globalCache;
        this.redisPub = redisPub;
        this.idefNeedsMantenience = [];
        this.modNeedsMantenience = [];
        this.serverData = null;
        this.config = config;
        this.sensitiveConfig = sensitiveConfig;
        this.currencyLayer = sensitiveConfig.currencyLayerAccessKey ?
            currency_layer_1.setupCurrencyLayer(sensitiveConfig.currencyLayerAccessKey, this.globalCache, sensitiveConfig.currencyLayerHttpsEnabled) :
            null;
        this.processIdef = this.processIdef.bind(this);
        this.processModule = this.processModule.bind(this);
        this.run = this.run.bind(this);
        this.addAdminUserIfMissing = this.addAdminUserIfMissing.bind(this);
        const modules = this.root.getAllModules();
        modules.forEach(this.processModule);
        this.addAdminUserIfMissing();
    }
    setSEOGenerator(seoGenerator) {
        this.seoGenerator = seoGenerator;
    }
    async addAdminUserIfMissing() {
        if (!this.config.roles.includes("ADMIN")) {
            _1.logger.info("GlobalManager.addAdminUserIfMissing: admin role is not included within the roles, avoiding this check");
            return;
        }
        const userMod = this.root.getModuleFor(["users"]);
        const userIdef = userMod.getItemDefinitionFor(["user"]);
        const moduleTable = userMod.getQualifiedPathName();
        const selfTable = userIdef.getQualifiedPathName();
        const primaryAdminUser = await this.knex.first(constants_1.CONNECTOR_SQL_COLUMN_ID_FK_NAME).from(selfTable).where("role", "ADMIN");
        if (!primaryAdminUser) {
            _1.logger.info("GlobalManager.addAdminUserIfMissing: admin user is considered missing, adding one");
            const currentAdminUserWithSuchUsername = await this.knex.first(constants_1.CONNECTOR_SQL_COLUMN_ID_FK_NAME).from(selfTable).where("username", "admin");
            let username = "admin";
            if (currentAdminUserWithSuchUsername) {
                username = "admin" + (new Date()).getTime();
            }
            const password = uuid_1.default.v4().replace(/\-/g, "");
            const sqlModData = {
                type: userIdef.getQualifiedPathName(),
                last_modified: this.knex.fn.now(),
                created_at: this.knex.fn.now(),
                created_by: constants_1.UNSPECIFIED_OWNER,
                version: "",
                container_id: this.sensitiveConfig.defaultContainerID,
            };
            const sqlIdefData = {
                username,
                password: this.knex.raw("crypt(?, gen_salt('bf',10))", password),
                role: "ADMIN",
                app_language: this.config.fallbackLanguage,
                app_country: this.config.fallbackCountryCode,
                app_currency: this.config.fallbackCurrency,
            };
            try {
                await this.knex.transaction(async (transactionKnex) => {
                    const insertQueryValueMod = await transactionKnex(moduleTable)
                        .insert(sqlModData).returning("*");
                    sqlIdefData[constants_1.CONNECTOR_SQL_COLUMN_ID_FK_NAME] = insertQueryValueMod[0].id;
                    sqlIdefData[constants_1.CONNECTOR_SQL_COLUMN_VERSION_FK_NAME] = insertQueryValueMod[0].version;
                    const insertQueryIdef = transactionKnex(selfTable).insert(sqlIdefData).returning("*");
                    const insertQueryValueIdef = await insertQueryIdef;
                    return {
                        ...insertQueryValueMod[0],
                        ...insertQueryValueIdef[0],
                    };
                });
            }
            catch (err) {
                _1.logger.error("GlobalManager.addAdminUserIfMissing: Failed to add admin user when it was considered missing", {
                    errMessage: err.message,
                    errStack: err.stack,
                });
            }
            _1.logger.info("GlobalManager.addAdminUserIfMissing: Sucessfully added admin user", {
                username,
                password,
            });
        }
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
    run() {
        if (this.seoGenerator) {
            (async () => {
                while (true) {
                    await this.seoGenerator.run();
                    const nowTime = (new Date()).getTime();
                    const timeItPassedSinceSeoGenRan = nowTime - this.serverDataLastUpdated;
                    const timeUntilSeoGenNeedsToRun = constants_1.SERVER_MAPPING_TIME - timeItPassedSinceSeoGenRan;
                    if (timeUntilSeoGenNeedsToRun <= 0) {
                        _1.logger.error("GlobalManager.run [SERIOUS]: during the processing of events the time needed until next mapping was negative" +
                            " this means the server took forever doing the last mapping, clearly something is off", {
                            timeUntilSeoGenNeedsToRun,
                        });
                    }
                    else {
                        await wait(timeUntilSeoGenNeedsToRun);
                    }
                }
            })();
        }
        (async () => {
            while (true) {
                await this.calculateServerData();
                await this.runOnce();
                const nowTime = (new Date()).getTime();
                const timeItPassedSinceServerDataLastUpdated = nowTime - this.serverDataLastUpdated;
                const timeUntilItNeedsToUpdate = constants_1.SERVER_DATA_MIN_UPDATE_TIME - timeItPassedSinceServerDataLastUpdated;
                if (timeUntilItNeedsToUpdate <= 0) {
                    _1.logger.error("GlobalManager.run [SERIOUS]: during the processing of events the time needed until next update was negative" +
                        " this means the server took too long doing mantenience tasks, this means your database is very large, while this is not " +
                        " a real error as it was handled gracefully, this should be addressed to itemize developers", {
                        timeUntilItNeedsToUpdate,
                    });
                }
                else {
                    await wait(timeUntilItNeedsToUpdate);
                }
            }
        })();
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
            itemDefinition: null,
            include: null,
        }));
        const limiters = mod.getRequestLimiters();
        const since = limiters && limiters.condition === "AND" ? limiters.since : null;
        await this.runFor(mod.getQualifiedPathName(), true, propertiesThatNeedMantenience, since);
    }
    async runForIdef(idef) {
        const propertiesThatNeedMantenience = idef.getAllPropertyDefinitions().filter((p) => p.getPropertyDefinitionDescription().sqlMantenience && p.isSearchable()).map((p) => ({
            pdef: p,
            itemDefinition: idef,
            include: null,
        }));
        const includePropertiesThatNeedMantenience = idef.getAllIncludes().map((i) => {
            return i.getSinkingProperties().filter((sp) => sp.getPropertyDefinitionDescription().sqlMantenience && sp.isSearchable()).map((sp) => ({
                pdef: sp,
                include: i,
                itemDefinition: idef,
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
            const mantenienceRule = p.pdef.getPropertyDefinitionDescription().sqlMantenience({
                knex: this.knex,
                serverData: null,
                id: p.pdef.getId(),
                prefix: p.include ? p.include.getPrefixedQualifiedIdentifier() : "",
                property: p.pdef,
                itemDefinition: p.itemDefinition,
            });
            if (mantenienceRule) {
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
        let query = "UPDATE ?? SET";
        let bindings = [tableName];
        query += " " + Object.keys(updateRules).map((columnToSet) => {
            const ruleRawStr = updateRules[columnToSet][0];
            bindings.push(columnToSet);
            bindings = bindings.concat(updateRules[columnToSet][1]);
            return "?? = " + ruleRawStr;
        }).join(", ");
        if (fromRules.length) {
            query += " FROM ";
            query += fromRules.map((rule) => {
                bindings.push(rule.from);
                bindings.push(rule.as);
                return "?? ??";
            }).join(",");
        }
        if (sinceLimiter || orWhereRules.length || andWhereRules.length) {
            query += " WHERE";
        }
        if (sinceLimiter) {
            query += " ?? >= ?";
            bindings.push("created_at", sinceLimiter);
        }
        if (andWhereRules.length) {
            if (sinceLimiter) {
                query += " AND ";
            }
            else {
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
            }
            else {
                query += " (";
            }
            query += orWhereRules.map((rule) => {
                bindings = bindings.concat(rule[1]);
                return rule[0];
            }).join(" OR ");
            query += ")";
        }
        await this.knex.raw(query, bindings);
        // we do not update last_modified in order to avoid useless updates
        // sql mantenience changes now so that it doesn't inform any client or cluster for changes
        // it could, but now it's considered a search only property, changes are hence, silent
        // UPDATE TABLE "stuffs" SET "normalized_0"=c0."factor"*"value_0", "normalized_1"=c1."factor"*"value_1" FROM "currencyfactors" c0, "currencyfactors" c1 WHERE c0."name"="currency_0" AND c1."name"="currency_1" AND (c0."factor"*s."value_0" > 0.5 OR c1."factor"*"value_1" > 0.5) RETURNING *
        // buggy typescript again
    }
    async calculateServerData() {
        try {
            this.serverData = {
                [constants_1.CURRENCY_FACTORS_IDENTIFIER]: this.currencyLayer ? await this.currencyLayer.requestCurrencyFactors() : null,
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
        // STORE currency factors in the database if available
        // for storing
        if (this.serverData[constants_1.CURRENCY_FACTORS_IDENTIFIER]) {
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
        }
        // stringify the server data
        const stringifiedServerData = JSON.stringify(this.serverData);
        // update the server data so that the instances can receive it
        this.globalCache.set(constants_1.SERVER_DATA_IDENTIFIER, stringifiedServerData, (err) => {
            if (err) {
                _1.logger.error("GlobalManager.informNewServerData: [SERIOUS] was unable to inform for new server data in set", {
                    errMessage: err.message,
                    errStack: err.stack,
                });
            }
        });
        const redisEvent = {
            source: "global",
            type: constants_1.SERVER_DATA_IDENTIFIER,
            serverInstanceGroupId: null,
            data: this.serverData,
        };
        // publishing new server data
        this.redisPub.publish(constants_1.SERVER_DATA_IDENTIFIER, JSON.stringify(redisEvent), (err) => {
            if (err) {
                _1.logger.error("GlobalManager.informNewServerData: [SERIOUS] was unable to inform for new server data in publish", {
                    errMessage: err.message,
                    errStack: err.stack,
                });
            }
        });
    }
}
exports.GlobalManager = GlobalManager;
