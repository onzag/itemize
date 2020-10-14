"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEOGenerator = void 0;
const https_1 = __importDefault(require("https"));
const index_1 = require("../index");
const sitemaps_1 = require("./sitemaps");
const constants_1 = require("../../constants");
const util_1 = require("../../util");
const moment_1 = __importDefault(require("moment"));
const stream_1 = require("stream");
const deep_equal_1 = __importDefault(require("deep-equal"));
const NO_SEO = process.env.NO_SEO === "true";
// Used to optimize, it is found out that passing unecessary logs to the transport
// can slow the logger down even if it won't display
const LOG_LEVEL = process.env.LOG_LEVEL;
const CAN_LOG_DEBUG = LOG_LEVEL === "debug" || LOG_LEVEL === "silly" || (!LOG_LEVEL && process.env.NODE_ENV !== "production");
;
class SEOGenerator {
    /**
     * Buillds a new seo generator
     * @param rules the seo rules
     * @param cloudClient the cloud client with the XML files
     * @param knex the knex instance
     * @param root the root for definitions
     * @param prefix the prefix for the openstack container
     * @param supportedLanguages the supporte languages
     * @param hostname the hostname that we are creating sitemaps for
     * @param pingGoogle whether to ping google once we have updated our sitemaps
     */
    constructor(rules, cloudClient, knex, root, supportedLanguages, hostname, pingGoogle) {
        this.primaryIndex = null;
        this.mainIndex = null;
        this.cache = {};
        this.cloudClient = cloudClient;
        this.knex = knex;
        this.root = root;
        this.rules = rules;
        this.supportedLanguages = supportedLanguages;
        this.hostname = hostname;
        this.pingGoogle = pingGoogle;
        // this is the primary index, basically what represents the
        // main sitemap index that holds the root, it just refers to each
        // language xml file that it includes
        this.primaryIndex = {
            lastQueried: null,
            entries: supportedLanguages.map((sl) => `sitemaps/${this.hostname}/${sl}/index.xml`),
            isIndex: true,
        };
    }
    /**
     * Run the seo generator mechanism, usually run once a day
     */
    async run() {
        // if there's no seo we stop here
        if (NO_SEO) {
            return;
        }
        try {
            // so first we check that we have all the paths
            // ready
            await this.checkIndexFile();
            // now we setup a list of pre results
            const results = [];
            // for every rule, which are our paths
            for (const ruleKey of Object.keys(this.rules)) {
                // we add it to the results
                results.push(await this.runFor(ruleKey, this.rules[ruleKey]));
            }
            // now we delete the cache, this is important
            // otherwise it's a memory leak
            delete this.cache;
            this.cache = {};
            // now we need to get the urls we have collected
            let totalURLS = [];
            let totalStaticURLS = [];
            // and loop in our results
            results.forEach((result) => {
                if (!result.urls.length) {
                    return;
                }
                if (result.lastQueried) {
                    this.mainIndex.lastQueried = {
                        ...this.mainIndex.lastQueried,
                        ...result.lastQueried,
                    };
                }
                if (result.static) {
                    totalStaticURLS = totalStaticURLS.concat(result.urls);
                }
                else {
                    totalURLS = totalURLS.concat(result.urls);
                }
            });
            // now let's check our current main index
            let mainIndexChanged = false;
            // add static if it's missing
            if (!this.mainIndex.entries.includes("static")) {
                mainIndexChanged = true;
                this.mainIndex.entries.push("static");
            }
            // prepare this change variable which means any change
            // in any sitemap
            let changed = false;
            // now we get our current static file
            const currentStatic = await this.cloudClient.getFileJSON("sitemaps/" + this.hostname + "/main/static.json");
            // and the new one we are trying to set
            const newStatic = {
                lastQueried: null,
                entries: totalStaticURLS,
                isIndex: false,
            };
            // if they are not equal
            if (!deep_equal_1.default(currentStatic, newStatic)) {
                // it is indeed changed
                changed = true;
                // and we write our new static json
                await this.writeFile(JSON.stringify(newStatic), "sitemaps/" + this.hostname + "/main/static.json");
                for (const lang of this.supportedLanguages) {
                    // and every resulting sitemap from it
                    await this.writeSitemapFile(newStatic, "sitemaps/" + this.hostname + "/" + lang + "/static.xml", lang);
                }
            }
            // now let's check the dynamic created urls
            if (totalURLS.length) {
                // if we get any we for sure changed
                changed = true;
                // setup a timetamp for the filename
                const resultTimeStamp = moment_1.default().locale("en").utc().format("HH_mm_ss.DD_MM_YYYY");
                this.mainIndex.entries.push(resultTimeStamp);
                // and now we have modified our main index
                mainIndexChanged = true;
                // create the entry for this
                const entry = {
                    lastQueried: null,
                    entries: totalURLS,
                    isIndex: false,
                };
                // and we save the json in our main
                await this.writeFile(JSON.stringify(entry), "sitemaps/" + this.hostname + "/main/" + resultTimeStamp + ".json");
                // and now we save the sitemap in each language by converting it
                for (const lang of this.supportedLanguages) {
                    await this.writeSitemapFile(entry, "sitemaps/" + this.hostname + "/" + lang + "/" + resultTimeStamp + ".xml", lang);
                }
            }
            // if the main index changed we need to save the new
            // specified main index as referred by the definition
            if (mainIndexChanged) {
                await this.writeFile(JSON.stringify(this.mainIndex), "sitemaps/" + this.hostname + "/main/index.json");
                for (const lang of this.supportedLanguages) {
                    const storagePrefix = "sitemaps/" + this.hostname + "/" + lang;
                    const storageTarget = storagePrefix + "/index.xml";
                    await this.writeSitemapFile(this.mainIndex, storageTarget, storagePrefix, ".xml");
                }
            }
            // note how there's a difference between changed and mainIndexChanged
            // and it should be clear, changed is whether anything changed in any sitemap
            // whereas mainIndexChanged only refers to the main index, while it's unlikely
            // to have a changed without a mainIndexChanged it can happen when new statics
            // are added yet no new dynamic are added
            if (changed && this.pingGoogle) {
                const googleURL = "https://google.com/ping?sitemap=https://" + this.hostname + "/sitemap.xml";
                index_1.logger.info("SEOGenerator.run: Pinging google at  " + googleURL);
                try {
                    https_1.default.get(googleURL, (res) => {
                        if (res.statusCode !== 200 && res.statusCode !== 0) {
                            index_1.logger.error("SEOGenerator.run: failed to ping google due to invalid status code", {
                                statusCode: res.statusCode,
                                statusMessage: res.statusMessage,
                            });
                        }
                        res.on("error", (err) => {
                            index_1.logger.error("SEOGenerator.run: failed to ping google", {
                                errMessage: err.message,
                                errStack: err.stack,
                            });
                        });
                    });
                }
                catch (err) {
                    index_1.logger.error("SEOGenerator.run: failed to ping google", {
                        errMessage: err.message,
                        errStack: err.stack,
                    });
                }
            }
        }
        catch (err) {
            index_1.logger.error("SEOGenerator.run [SEVERE]: failed to generate sitemaps", {
                errMessage: err.message,
                errStack: err.stack,
            });
        }
    }
    async checkExist(at) {
        return this.cloudClient.checkExists(at);
    }
    /**
     * Writes a file at the specified endpoint
     * @param data the data to write
     * @param target the target endpoint url
     */
    async writeFile(data, target) {
        index_1.logger.info("SEOGenerator.writeFile: Attempting to write file at: " + target);
        const readStream = stream_1.Readable.from(data);
        await this.cloudClient.upload(target, readStream);
    }
    /**
     * Converts a JSON sitemap type to a xml type
     * @param src the source JSON type
     * @param target the target where to write the file
     * @param prefix an optional prefix to add before the url that is supposed to be added but
     * not before the openstack prefix
     * @param suffix an optional suffix to add after the url that is supposed to be added
     */
    async writeSitemapFile(src, target, prefix, suffix) {
        index_1.logger.info("SEOGenerator.writeSitemapFile: Attempting to write sitemap file at: " + target);
        await this.writeFile(sitemaps_1.toXML(src, this.hostname, this.cloudClient.getPrefix(), prefix, suffix), target);
    }
    async checkIndexFile() {
        if (this.mainIndex) {
            return;
        }
        // we will rewrite the primary index every time regardless if found or not, this ensures that
        // it's in sync
        await this.writeSitemapFile(this.primaryIndex, "sitemaps/" + this.hostname + "/index.xml");
        // we need to retrieve now the main index based on the json, if it exists
        this.mainIndex = await this.cloudClient.getFileJSON("sitemaps/" + this.hostname + "/main/index.json");
        let mainIndexWasNotFound = !this.mainIndex;
        // if we don't have a main index we build a new fresh one from scratch
        if (!this.mainIndex) {
            this.mainIndex = {
                lastQueried: null,
                entries: [],
                isIndex: true,
            };
        }
        // and do the same about the language indexes
        const languagesIndexFound = await Promise.all(this.supportedLanguages.map(async (lang) => {
            return {
                lang,
                found: await this.checkExist("sitemaps/" + this.hostname + "/" + lang + "/index.xml"),
            };
        }));
        // we use this variable to cache the content of the sitemaps in case
        // that we need to add more than one language at a given time
        const cachedEntries = {};
        // so we loop per language
        for (const languageIndex of languagesIndexFound) {
            // if we don't find it, or if the main index is not found which invalidates
            // every single one of these language indexes
            if (!languageIndex.found || mainIndexWasNotFound) {
                // we needd the storage prefix
                const storagePrefix = "sitemaps/" + this.hostname + "/" + languageIndex.lang;
                // and this is where we are storing our file
                const storageTarget = storagePrefix + "/index.xml";
                // we use the main index to replicate it
                await this.writeSitemapFile(this.mainIndex, 
                // we are storing here
                storageTarget, 
                // we need to prefix everything with the sitemaps/ourhost.com/en thing
                // because the main basically only contains these relative urls
                // and the sitemap spec wants absolute urls
                storagePrefix, 
                // and everything needs to be set as .xml at the end
                ".xml");
                // now we need to read every single entry from the main index entry list
                for (const entryURL of this.mainIndex.entries) {
                    // and fetch it from the target or use our cache
                    const entry = cachedEntries[entryURL] ||
                        await this.cloudClient.getFileJSON("sitemaps/" + this.hostname + "/main/" + entryURL + ".json");
                    // and store it in the cache
                    cachedEntries[entryURL] = entry;
                    // now we write that source json as a sitemap xml
                    await this.writeSitemapFile(
                    // these etries are actually urls of our site without the language prefixed to them
                    entry, 
                    // now we save it there, those are the urls we collected that timestamp (or static ones)
                    "sitemaps/" + this.hostname + "/" + languageIndex.lang + "/" + entryURL + ".xml", 
                    // and we prefix everything with the language, so that /my/url becomes /en/my/url
                    languageIndex.lang);
                }
            }
        }
    }
    /**
     * uses a seo rule in order to build the sitemap
     * @param key the comma separated urls that represents the key
     * @param rule the rule that we are following
     */
    async runFor(key, rule) {
        index_1.logger.info("Parsing sitemap for urls " + key);
        // if it's not crawable
        if (!rule.crawable) {
            // then nothing to be given
            return {
                lastQueried: null,
                urls: [],
                static: true,
            };
        }
        // otherwise let's see if it's a dynamic collect type
        if (rule.collect) {
            // so here we will store our results
            const collectedResults = [];
            // and this will be our last queried information
            const lastQueried = {};
            // we start at index -1 in order to start at 0
            let index = -1;
            for (const collectionPoint of rule.collect) {
                index++;
                // this might be null, we are seeing when we last queried this item
                const lastQueriedKey = key + "." + collectionPoint[0] + "." + (collectionPoint[1] || "");
                // and according to that we require since
                const querySince = this.mainIndex.lastQueried && this.mainIndex.lastQueried[lastQueriedKey];
                // this is our cache key for all the results we get to store in our cache, we also use the timestamp
                const cachedKey = collectionPoint[0] + "." + (collectionPoint[1] || "") + "." + (querySince || "");
                // so this will be our query
                let query;
                // and we will make the query if there's no cached result for it
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
                    if (!rule.collectAllVersions) {
                        query.where("version", "");
                    }
                    query.where("blocked_at", null).orderBy("created_at", "desc");
                }
                // otherwise we set by our cache or well, execute the query
                const collected = this.cache[cachedKey] ||
                    await query;
                // and that will be our value for our cache
                this.cache[cachedKey] = collected;
                // if we got something then we can set our last queried attribute to it
                if (collected[0]) {
                    lastQueried[lastQueriedKey] = collected[0].created_at;
                }
                // and add to our collected results
                collectedResults[index] = {
                    collected,
                };
            }
            // now we need the parametrize function, or we use the default
            const parametrize = rule.parametrize || this.defaultParametrizer;
            // and we pass the collected results to see how we parametrize our results
            const parameters = parametrize(...collectedResults);
            // now we fetch our urls
            let urls = [];
            // and the parameters start to loop
            parameters.forEach((parameterRule) => {
                // this will be our product after processing the key
                let product = key;
                // we need to literally replace every parameter key
                Object.keys(parameterRule.params).forEach((paramKey) => {
                    product = product.replace(new RegExp(util_1.escapeStringRegexp(":" + paramKey), "g"), parameterRule.params[paramKey]);
                });
                // and now we split the keys
                const urlsProduced = product.split(",");
                // and add each one of those urls produced to the list
                urlsProduced.forEach((urlProduced) => {
                    urls.push(urlProduced.trim());
                });
            });
            // results should remain cached during the whole run
            return {
                lastQueried,
                urls,
                static: false,
            };
        }
        // otherwise the urls are static, eg for the frontpage, terms and condition an whatnot
        // these vary only in language
        return {
            lastQueried: null,
            // we just split them
            urls: key.split(",").map((u) => u.trim()),
            static: true,
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
