"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
const index_1 = require("../index");
const constants_1 = require("../../constants");
const util_1 = require("../../util");
const moment_1 = __importDefault(require("moment"));
;
class SEOGenerator {
    constructor(rules, container, knex, root, prefix, supportedLanguages, hostname) {
        this.primaryIndex = null;
        this.mainIndex = null;
        this.cache = {};
        this.container = container;
        this.knex = knex;
        this.root = root;
        this.prefix = prefix;
        this.rules = rules;
        this.supportedLanguages = supportedLanguages;
        this.hostname = hostname;
        this.primaryIndex = {
            lastQueried: null,
            entries: supportedLanguages.map((sl) => `sitemaps/${this.hostname}/${sl}/index.xml`),
            isIndex: true,
        };
    }
    async run() {
        await this.checkIndexFile();
        const results = [];
        for (const ruleKey of Object.keys(this.rules)) {
            results.push(await this.runFor(ruleKey, this.rules[ruleKey]));
        }
        delete this.cache;
        this.cache = {};
        const resultTimeStamp = moment_1.default().locale("en").utc().format("HH_mm_ss.DD_MM_YYYY");
        let totalURLS = [];
        results.forEach((result) => {
            this.mainIndex.lastQueried = {
                ...this.mainIndex.lastQueried,
                ...result.lastQueried,
            };
            this.mainIndex.entries.push(resultTimeStamp);
            totalURLS = totalURLS.concat(result.urls);
        });
        const entry = {
            lastQueried: null,
            entries: totalURLS,
            isIndex: false,
        };
        await this.writeFile(JSON.stringify(this.mainIndex), "sitemaps/" + this.hostname + "/main.json");
        await this.writeFile(JSON.stringify(entry), "sitemaps/" + this.hostname + "/main/" + resultTimeStamp + ".json");
        for (const lang of this.supportedLanguages) {
            const storagePrefix = "sitemaps/" + this.hostname + "/" + lang;
            const storageTarget = storagePrefix + "/index.xml";
            await this.writeSitemapFile(this.mainIndex, storageTarget, storagePrefix);
            await this.writeSitemapFile(entry, "sitemaps/" + this.hostname + "/" + lang + "/" + resultTimeStamp + ".xml", lang);
        }
    }
    async runHeadRequest(at) {
        return new Promise((resolve, reject) => {
            const strURL = this.prefix + at;
            index_1.logger.info("SEOGenerator.runHeadRequest: Checking sitemap " + at);
            const url = new URL(strURL);
            https_1.default.get({
                method: "HEAD",
                host: url.host,
                path: url.pathname,
            }, (resp) => {
                if (resp.statusCode === 200 || resp.statusCode === 0) {
                    index_1.logger.info("SEOGenerator.runHeadRequest: Checking succeed " + at);
                }
                else {
                    index_1.logger.info("SEOGenerator.runHeadRequest: Checking failed " + at);
                }
                return resolve(resp.statusCode === 200 || resp.statusCode === 0);
            });
        });
    }
    async runGetRequest(at) {
        return new Promise((resolve, reject) => {
            const strURL = this.prefix + at;
            index_1.logger.info("SEOGenerator.runGetRequest: Retrieving JSON sitemap " + at);
            const url = new URL(strURL);
            https_1.default.get({
                method: "GET",
                host: url.host,
                path: url.pathname,
            }, (resp) => {
                if (resp.statusCode === 200 || resp.statusCode === 0) {
                    index_1.logger.info("SEOGenerator.runGetRequest: Retrieving succeed, now parsing " + at);
                    let data = "";
                    resp.on("data", (chunk) => {
                        data += chunk;
                    });
                    resp.on("error", (err) => {
                        reject(err);
                    });
                    resp.on("end", () => {
                        // now that we got the answer, let's use our guess
                        try {
                            const parsedData = JSON.parse(data);
                            resolve(parsedData);
                        }
                        catch (err) {
                            reject(err);
                        }
                    });
                }
                else {
                    index_1.logger.info("SEOGenerator.runGetRequest: Retrieving failed " + at);
                    resolve(null);
                }
            });
        });
    }
    async writeFile(data, target) {
        index_1.logger.info("SEOGenerator.writeFile: Attempting to write file at: " + target);
    }
    async writeSitemapFile(src, target, prefix) {
        index_1.logger.info("SEOGenerator.writeSitemapFile: Attempting to write sitemap file at: " + target);
    }
    async checkIndexFile() {
        if (this.mainIndex) {
            return;
        }
        // TODO error handling
        const primaryIndexFound = await this.runHeadRequest("sitemaps/" + this.hostname + "/index.xml");
        const languagesIndexFound = await Promise.all(this.supportedLanguages.map(async (lang) => {
            return {
                lang,
                found: await this.runHeadRequest("sitemaps/" + this.hostname + "/" + lang + "/index.xml"),
            };
        }));
        // the primary index is not valid as some language is missing
        // this does not mean the language in question is invalid, it might just have been
        // added so the index must reflect that
        if (!primaryIndexFound || languagesIndexFound.some((li) => !li.found)) {
            this.writeSitemapFile(this.primaryIndex, "sitemaps/" + this.hostname + "/index.xml");
        }
        this.mainIndex = await this.runGetRequest("sitemaps/" + this.hostname + "/main.json");
        let mainIndexWasNotFound = !this.mainIndex;
        if (!this.mainIndex) {
            this.mainIndex = {
                lastQueried: null,
                entries: [],
                isIndex: true,
            };
        }
        const cachedEntries = {};
        for (const languageIndex of languagesIndexFound) {
            if (!languageIndex.found || mainIndexWasNotFound) {
                const storagePrefix = "sitemaps/" + this.hostname + "/" + languageIndex.lang;
                const storageTarget = storagePrefix + "/index.xml";
                await this.writeSitemapFile(this.mainIndex, storageTarget, storagePrefix);
            }
            // this might be pretty large, and while this is inefficient
            // it should never really happen
            for (const entryURL of this.mainIndex.entries) {
                const entry = cachedEntries[entryURL] ||
                    await this.runGetRequest("sitemaps/" + this.hostname + "/main/" + entryURL + ".json");
                cachedEntries[entryURL] = entry;
                await this.writeSitemapFile(entry, "sitemaps/" + this.hostname + "/" + languageIndex.lang + "/" + entryURL + ".xml", languageIndex.lang);
            }
        }
    }
    async runFor(key, rule) {
        if (rule.collect) {
            const collectedResults = [];
            const lastQueried = this.mainIndex.lastQueried || {};
            let index = -1;
            for (const collectionPoint of rule.collect) {
                index++;
                // this might be null
                const lastQueriedKey = key + "." + collectionPoint[0] + "." + (collectionPoint[1] || "");
                const querySince = this.mainIndex.lastQueried && this.mainIndex.lastQueried[lastQueriedKey];
                const cachedKey = collectionPoint[0] + "." + (collectionPoint[1] || "") + "." + (querySince || "");
                let query;
                if (!this.cache[cachedKey]) {
                    const splittedModule = collectionPoint[0].split("/");
                    const splittedIdef = collectionPoint[1] && collectionPoint[1].split("/");
                    if (splittedModule[0] === "") {
                        splittedModule.shift();
                    }
                    if (splittedIdef && splittedIdef[0] === "") {
                        splittedIdef.shift();
                    }
                    // get the module and the item definition, if exists
                    const mod = this.root.getModuleFor(splittedModule);
                    const idef = splittedIdef && mod.getItemDefinitionFor(splittedIdef);
                    query = this.knex.select(["id", "version", "created_at"]);
                    if (idef) {
                        query.from(idef.getQualifiedPathName()).join(mod.getQualifiedPathName(), (clause) => {
                            clause.on("id", "=", constants_1.CONNECTOR_SQL_COLUMN_ID_FK_NAME);
                            clause.on("version", "=", constants_1.CONNECTOR_SQL_COLUMN_VERSION_FK_NAME);
                        });
                    }
                    else {
                        query.from(mod.getQualifiedPathName());
                    }
                    if (querySince) {
                        query.where("created_at", ">", querySince);
                    }
                    query.where("blocked_at", null).orderBy("created_at", "desc");
                }
                const collected = this.cache[cachedKey] || await query;
                this.cache[cachedKey] = collected;
                if (collected[0]) {
                    lastQueried[lastQueriedKey] = collected[0].created_at;
                }
                collectedResults[index] = {
                    collected,
                };
            }
            const parametrize = rule.parametrize || this.defaultParametrizer;
            const parameters = parametrize(...collectedResults);
            let urls = [];
            parameters.forEach((parameterRule) => {
                let product = key;
                Object.keys(parameterRule.params).forEach((paramKey) => {
                    product = product.replace(new RegExp(util_1.escapeStringRegexp(":" + paramKey), "g"), parameterRule[paramKey]);
                });
                const urlsProduced = product.split(",");
                urlsProduced.forEach((urlProduced) => {
                    urls.push(urlProduced.trim());
                });
            });
            // results should remain cached during the whole run
            return {
                lastQueried,
                urls: [],
            };
        }
        return {
            lastQueried: null,
            urls: [],
        };
    }
    defaultParametrizer(...args) {
        // this just makes the id an version be the params
        return args[0].collected.map((r) => ({
            params: {
                id: r.id.toString(),
                version: r.version.toString(),
            },
        }));
    }
}
exports.SEOGenerator = SEOGenerator;
