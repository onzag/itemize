"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const version_null_value_1 = require("./version-null-value");
const CACHE_EXPIRES_DAYS = 2;
class Cache {
    constructor(redisClient, knex) {
        this.redisClient = redisClient;
        this.knex = knex;
    }
    getIdefCachedValue(idefQueryIdentifier) {
        return new Promise((resolve, reject) => {
            this.redisClient.get(idefQueryIdentifier, (error, value) => {
                if (value === null) {
                    resolve(null);
                }
                if (!error) {
                    try {
                        resolve({
                            value: JSON.parse(value),
                        });
                        this.pokeCache(idefQueryIdentifier);
                    }
                    catch {
                        resolve(null);
                    }
                }
                else {
                    resolve(null);
                }
            });
        });
    }
    pokeCache(keyIdentifier) {
        this.redisClient.expire(keyIdentifier, CACHE_EXPIRES_DAYS * 86400);
    }
    forceCacheInto(idefTable, id, version, value) {
        const idefQueryIdentifier = "IDEFQUERY:" + idefTable + "." + id.toString() + "." + (version || "");
        return new Promise((resolve) => {
            this.redisClient.set(idefQueryIdentifier, JSON.stringify(value), (error) => {
                resolve(value);
                if (!error) {
                    this.pokeCache(idefQueryIdentifier);
                }
            });
        });
    }
    async requestCache(idefTable, moduleTable, id, version, refresh) {
        console.log("requested", idefTable, moduleTable, id);
        const idefQueryIdentifier = "IDEFQUERY:" + idefTable + "." + id.toString() + "." + (version || "");
        if (!refresh) {
            const currentValue = await this.getIdefCachedValue(idefQueryIdentifier);
            if (currentValue) {
                return currentValue.value;
            }
        }
        const queryValue = version_null_value_1.convertVersionsIntoNullsWhenNecessary(
        // let's remember versions as null do not exist in the database, instead it uses
        // the invalid empty string "" value
        await this.knex.first("*").from(moduleTable)
            .where("id", id).andWhere("version", version || "").join(idefTable, (clause) => {
            clause.on(constants_1.CONNECTOR_SQL_COLUMN_ID_FK_NAME, "=", "id");
            clause.on(constants_1.CONNECTOR_SQL_COLUMN_VERSION_FK_NAME, "=", "version");
        }) || null);
        this.redisClient.set(idefQueryIdentifier, JSON.stringify(queryValue), (error) => {
            if (!error) {
                this.pokeCache(idefQueryIdentifier);
            }
        });
        return queryValue;
    }
    checkCache(keyIdentifier) {
        return new Promise((resolve) => {
            this.redisClient.exists(keyIdentifier, (error, reply) => {
                if (error) {
                    resolve(false);
                }
                else {
                    resolve(reply === 1);
                }
            });
        });
    }
    async requestListCache(moduleTable, ids) {
        const resultValues = await Promise.all(ids.map((idContainer) => {
            return this.requestCache(idContainer.type, moduleTable, idContainer.id, idContainer.version);
        }));
        return resultValues;
    }
}
exports.Cache = Cache;
