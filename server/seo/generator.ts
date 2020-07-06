import pkgcloud from "pkgcloud";
import { ISEORuleSet, ISEORule, ISEOCollectedResult, ISEOCollectedData, ISEOParametrizer } from ".";
import https from "https";
import { logger } from "../index";
import { ISitemapJSONType, ISitemapLastQueryType } from "./sitemaps";
import Knex from "knex";
import Root from "../../base/Root";
import { CONNECTOR_SQL_COLUMN_ID_FK_NAME, CONNECTOR_SQL_COLUMN_VERSION_FK_NAME } from "../../constants";
import { escapeStringRegexp } from "../../util";
import moment from "moment";

interface ISEOCollectedDataWithCreatedAt extends ISEOCollectedData {
  created_at: string;
}

interface ISEOPreResult {
  lastQueried: ISitemapLastQueryType,
  urls: string[],
};

export class SEOGenerator {
  private root: Root;
  private knex: Knex;
  private container: pkgcloud.storage.Container;
  private prefix: string;
  private rules: ISEORuleSet;
  private supportedLanguages: string[];
  private hostname: string;

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
  ) {
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
    }
  }

  public async run() {
    await this.checkIndexFile();
    const results: ISEOPreResult[] = [];
    for (const ruleKey of Object.keys(this.rules)) {
      results.push(await this.runFor(ruleKey, this.rules[ruleKey]));
    }

    delete this.cache;
    this.cache = {};

    const resultTimeStamp = moment().locale("en").utc().format("HH_mm_ss.DD_MM_YYYY");
    let totalURLS: string[] = [];
    results.forEach((result) => {
      this.mainIndex.lastQueried = {
        ...this.mainIndex.lastQueried,
        ...result.lastQueried,
      };

      this.mainIndex.entries.push(
        resultTimeStamp,
      );

      totalURLS = totalURLS.concat(result.urls);
    });

    const entry: ISitemapJSONType = {
      lastQueried: null,
      entries: totalURLS,
      isIndex: false,
    }

    await this.writeFile(
      JSON.stringify(this.mainIndex),
      "sitemaps/" + this.hostname + "/main.json",
    );

    await this.writeFile(
      JSON.stringify(entry),
      "sitemaps/" + this.hostname + "/main/" + resultTimeStamp + ".json",
    );

    for (const lang of this.supportedLanguages) {
      const storagePrefix = "sitemaps/" + this.hostname + "/" + lang;
      const storageTarget = storagePrefix + "/index.xml";
      await this.writeSitemapFile(
        this.mainIndex,
        storageTarget,
        storagePrefix,
      );

      await this.writeSitemapFile(
        entry,
        "sitemaps/" + this.hostname + "/" + lang + "/" + resultTimeStamp + ".xml",
        lang,
      );
    }
  }

  private async runHeadRequest(at: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const strURL = this.prefix + at;
      logger.info("SEOGenerator.runHeadRequest: Checking sitemap " + at);
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
      logger.info("SEOGenerator.runGetRequest: Retrieving JSON sitemap " + at);
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

  private async writeFile(data: string, target: string) {
    logger.info("SEOGenerator.writeFile: Attempting to write file at: " + target);
  }

  private async writeSitemapFile(src: ISitemapJSONType, target: string, prefix?: string) {
    logger.info("SEOGenerator.writeSitemapFile: Attempting to write sitemap file at: " + target);
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

    this.mainIndex = await this.runGetRequest("sitemaps/" + this.hostname + "/main.json");
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
        );
      }

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

  private async runFor(key: string, rule: ISEORule): Promise<ISEOPreResult> {
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
          product = product.replace(new RegExp(escapeStringRegexp(":" + paramKey), "g"), parameterRule[paramKey]);
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