import pkgcloud from "pkgcloud";
import { ISEORuleSet, ISEORule, ISEOCollectedResult, ISEOCollectedData, ISEOParametrizer } from ".";
import https from "https";
import { logger } from "../index";
import { ISitemapJSONType, ISitemapLastQueryType, toXML } from "./sitemaps";
import Knex from "knex";
import Root from "../../base/Root";
import { CONNECTOR_SQL_COLUMN_ID_FK_NAME, CONNECTOR_SQL_COLUMN_VERSION_FK_NAME } from "../../constants";
import { escapeStringRegexp } from "../../util";
import moment from "moment";
import { Readable } from "stream";
import equals from "deep-equal";
import { http } from "winston";

interface ISEOCollectedDataWithCreatedAt extends ISEOCollectedData {
  created_at: string;
}

interface ISEOPreResult {
  lastQueried: ISitemapLastQueryType,
  urls: string[],
  static: boolean,
};

export class SEOGenerator {
  private root: Root;
  private knex: Knex;
  private container: pkgcloud.storage.Container;
  private prefix: string;
  private rules: ISEORuleSet;
  private supportedLanguages: string[];
  private hostname: string;
  private pingGoogle: boolean;

  private primaryIndex: ISitemapJSONType = null;
  private mainIndex: ISitemapJSONType = null;
  private cache: {[key: string]: ISEOCollectedDataWithCreatedAt[]} = {};

  constructor(
    rules: ISEORuleSet,
    container: pkgcloud.storage.Container,
    knex: Knex,
    root: Root,
    prefix: string,
    supportedLanguages: string[],
    hostname: string,
    pingGoogle: boolean,
  ) {
    this.container = container;
    this.knex = knex;
    this.root = root;
    this.prefix = prefix;
    this.rules = rules;
    this.supportedLanguages = supportedLanguages;
    this.hostname = hostname;
    this.pingGoogle = pingGoogle;

    this.primaryIndex = {
      lastQueried: null,
      entries: supportedLanguages.map((sl) => `sitemaps/${this.hostname}/${sl}/index.xml`),
      isIndex: true,
    }
  }

  public async run() {
    // so first we check that we have all the paths
    // ready
    await this.checkIndexFile();

    // now we setup a list of pre results
    const results: ISEOPreResult[] = [];
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
    let totalURLS: string[] = [];
    let totalStaticURLS: string[] = [];

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
      } else {
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
    const currentStatic = await this.runGetRequest(
      "sitemaps/" + this.hostname + "/main/static.json",
    );
    // and the new one we are trying to set
    const newStatic: ISitemapJSONType = {
      lastQueried: null,
      entries: totalStaticURLS,
      isIndex: false,
    };

    // if they are not equal
    if (!equals(currentStatic, newStatic)) {
      // it is indeed changed
      changed = true;

      // and we write our new static json
      await this.writeFile(
        JSON.stringify(newStatic),
        "sitemaps/" + this.hostname + "/main/static.json",
      );

      for (const lang of this.supportedLanguages) {
        // and every resulting sitemap from it
        await this.writeSitemapFile(
          newStatic,
          "sitemaps/" + this.hostname + "/" + lang + "/static.xml",
          lang,
        );
      }
    }

    // now let's check the dynamic created urls
    if (totalURLS.length) {
      // if we get any we for sure changed
      changed = true;

      // setup a timetamp for the filename
      const resultTimeStamp = moment().locale("en").utc().format("HH_mm_ss.DD_MM_YYYY");
      this.mainIndex.entries.push(
        resultTimeStamp,
      );

      // and now we have modified our main index
      mainIndexChanged = true;

      // create the entry for this
      const entry: ISitemapJSONType = {
        lastQueried: null,
        entries: totalURLS,
        isIndex: false,
      }

      // and we save the json in our main
      await this.writeFile(
        JSON.stringify(entry),
        "sitemaps/" + this.hostname + "/main/" + resultTimeStamp + ".json",
      );

      // and now we save the sitemap in each language by converting it
      for (const lang of this.supportedLanguages) {
        await this.writeSitemapFile(
          entry,
          "sitemaps/" + this.hostname + "/" + lang + "/" + resultTimeStamp + ".xml",
          lang,
        );
      }
    }

    // if the main index changed we need to save the new
    // specified main index as referred by the definition
    if (mainIndexChanged) {
      await this.writeFile(
        JSON.stringify(this.mainIndex),
        "sitemaps/" + this.hostname + "/main/index.json",
      );

      for (const lang of this.supportedLanguages) {
        const storagePrefix = "sitemaps/" + this.hostname + "/" + lang;
        const storageTarget = storagePrefix + "/index.xml";
        await this.writeSitemapFile(
          this.mainIndex,
          storageTarget,
          storagePrefix,
          ".xml",
        );
      }
    }

    // note how there's a difference between changed and mainIndexChanged
    // and it should be clear, changed is whether anything changed in any sitemap
    // whereas mainIndexChanged only refers to the main index, while it's unlikely
    // to have a changed without a mainIndexChanged it can happen when new statics
    // are added yet no new dynamic are added
    if (changed && this.pingGoogle) {
      const googleURL = "https://google.com/ping?sitemap=https://" + this.hostname + "/sitemap.xml";
      logger.info("SEOGenerator.runHeadRequest: Pinging google at  " + googleURL);

      https.get(googleURL, (res) => {
        if (res.statusCode !== 200 && res.statusCode !== 0) {
          // TODO
        }
        res.on("error", (err) => {
          // TODO
        });
      });
    }
  }

  private async runHeadRequest(at: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const strURL = this.prefix + at;
      const url = new URL(strURL);
      https.get({
        method: "HEAD",
        host: url.host,
        path: url.pathname,
      }, (resp) => {
        if (resp.statusCode === 200 || resp.statusCode === 0) {
          logger.info("SEOGenerator.runHeadRequest: Checking succeed " + at);
        } else {
          logger.info("SEOGenerator.runHeadRequest: Checking failed " + at);
        }
  
        return resolve(resp.statusCode === 200 || resp.statusCode === 0);
      });
    });
  }

  private async runGetRequest(at: string): Promise<ISitemapJSONType> {
    return new Promise((resolve, reject) => {
      const strURL = this.prefix + at;
      const url = new URL(strURL);
      https.get({
        method: "GET",
        host: url.host,
        path: url.pathname,
      }, (resp) => {
        if (resp.statusCode === 200 || resp.statusCode === 0) {
          logger.info("SEOGenerator.runGetRequest: Retrieving succeed, now parsing " + at);
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
            } catch (err) {
              reject(err);
            }
          });
        } else {
          logger.info("SEOGenerator.runGetRequest: Retrieving failed " + at);
          resolve(null);
        }
      });
    });
  }

  private async writeFile(data: string, target: string): Promise<void> {
    logger.info("SEOGenerator.writeFile: Attempting to write file at: " + target);

    const writeStream = this.container.client.upload({
      container: this.container as any,
      remote: target,
    });
    const readStream = Readable.from(data);
    readStream.pipe(writeStream);
  
    return new Promise((resolve, reject) => {
      writeStream.on("finish", () => {
        logger.debug("SEOGenerator.writeFile: Finished uploading " + target);
        resolve();
      });
      writeStream.on("error", reject);
    });
  }

  private async writeSitemapFile(
    src: ISitemapJSONType,
    target: string,
    prefix?: string,
    suffix?: string,
  ) {
    logger.info("SEOGenerator.writeSitemapFile: Attempting to write sitemap file at: " + target);

    await this.writeFile(toXML(src, this.hostname, this.prefix, prefix, suffix), target);
  }

  private async checkIndexFile() {
    if (this.mainIndex) {
      return;
    }

    // TODO error handling

    const primaryIndexFound = await this.runHeadRequest("sitemaps/" + this.hostname + "/index.xml");
    const languagesIndexFound = await Promise.all(this.supportedLanguages.map(async (lang) => {
      return {
        lang,
        found: await this.runHeadRequest("sitemaps/" + this.hostname + "/" + lang + "/index.xml"),
      }
    }));

    // the primary index is not valid as some language is missing
    // this does not mean the language in question is invalid, it might just have been
    // added so the index must reflect that
    if (!primaryIndexFound || languagesIndexFound.some((li) => !li.found)) {
      this.writeSitemapFile(this.primaryIndex, "sitemaps/" + this.hostname + "/index.xml");
    }

    this.mainIndex = await this.runGetRequest("sitemaps/" + this.hostname + "/main/index.json");
    let mainIndexWasNotFound = !this.mainIndex;
    if (!this.mainIndex) {
      this.mainIndex = {
        lastQueried: null,
        entries: [],
        isIndex: true,
      }
    }

    const cachedEntries: {[url: string]: ISitemapJSONType} = {};
    for (const languageIndex of languagesIndexFound) {
      if (!languageIndex.found || mainIndexWasNotFound) {
        const storagePrefix = "sitemaps/" + this.hostname + "/" + languageIndex.lang;
        const storageTarget = storagePrefix + "/index.xml";
        await this.writeSitemapFile(
          this.mainIndex,
          storageTarget,
          storagePrefix,
          ".xml",
        );

        // this might be pretty large, and while this is inefficient
        // it should never really happen
        for (const entryURL of this.mainIndex.entries) {
          const entry: ISitemapJSONType =
            cachedEntries[entryURL] ||
            await this.runGetRequest("sitemaps/" + this.hostname + "/main/" + entryURL + ".json");
          cachedEntries[entryURL] = entry;

          await this.writeSitemapFile(
            entry,
            "sitemaps/" + this.hostname + "/" + languageIndex.lang + "/" + entryURL + ".xml",
            languageIndex.lang,
          );
        }
      }
    }
  }

  private async runFor(key: string, rule: ISEORule): Promise<ISEOPreResult> {
    logger.info("Parsing sitemap for urls " + key);

    if (!rule.crawable) {
      return {
        lastQueried: null,
        urls: [],
        static: true,
      }
    }
  
    if (rule.collect) {
      const collectedResults: ISEOCollectedResult[] = [];
      const lastQueried = this.mainIndex.lastQueried || {};
      let index = -1;
      for (const collectionPoint of rule.collect) {
        index++;
        // this might be null
        const lastQueriedKey = key + "." + collectionPoint[0] + "." + (collectionPoint[1] || "");
        const querySince = this.mainIndex.lastQueried && this.mainIndex.lastQueried[
          lastQueriedKey
        ];
        const cachedKey = collectionPoint[0] + "." + (collectionPoint[1] || "") + "." + (querySince || "");

        let query: Knex.QueryBuilder;
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
              clause.on("id", "=", CONNECTOR_SQL_COLUMN_ID_FK_NAME);
              clause.on("version", "=", CONNECTOR_SQL_COLUMN_VERSION_FK_NAME);
            })
          } else {
            query.from(mod.getQualifiedPathName());
          }

          if (querySince) {
            query.where("created_at", ">", querySince);
          }

          query.where("blocked_at", null).orderBy("created_at", "desc");
        }

        const collected: ISEOCollectedDataWithCreatedAt[] = this.cache[cachedKey] || await query as ISEOCollectedDataWithCreatedAt[];
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

      let urls: string[] = [];
      parameters.forEach((parameterRule) => {
        let product = key;
        Object.keys(parameterRule.params).forEach((paramKey) => {
          product = product.replace(new RegExp(escapeStringRegexp(":" + paramKey), "g"), parameterRule.params[paramKey]);
        });

        const urlsProduced = product.split(",");
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

    return {
      lastQueried: null,
      urls: key.split(","),
      static: true,
    };
  }

  private defaultParametrizer(...args: ISEOCollectedResult[]): ISEOParametrizer[] {
    // this just makes the id an version be the params
    return args[0].collected.map((r) => ({
      params: {
        id: r.id.toString(),
        version: r.version.toString(),
      },
    }));
  }
}