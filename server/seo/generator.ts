/**
 * This file contains the seo generator and helper interfaces
 * for using for SEO purposes
 * @module
 */

import { ISEORuleSet, ISEORule, ISEOCollectedResult, ISEOCollectedData, ISEOParametrizer } from ".";
import https from "https";
import { logger } from "../index";
import { ISitemapJSONType, ISitemapLastQueryType, toXML } from "./sitemaps";
import Root from "../../base/Root";
import { CONNECTOR_SQL_COLUMN_ID_FK_NAME, CONNECTOR_SQL_COLUMN_VERSION_FK_NAME } from "../../constants";
import { escapeStringRegexp } from "../../util";
import moment from "moment";
import { Readable } from "stream";
import equals from "deep-equal";
import StorageProvider from "../services/base/StorageProvider";
import { convertVersionsIntoNullsWhenNecessary } from "../version-null-value";
import { ItemizeRawDB } from "../../server/raw-db";
import { SelectBuilder } from "../../database/SelectBuilder";

/**
 * Whether seo is disabled
 * @ignore
 */
const NO_SEO = process.env.NO_SEO === "true";

/**
 * Represents the list of results
 */
interface ISEOPreResult {
  lastQueried: ISitemapLastQueryType,
  urls: string[],
  static: boolean,
};

/**
 * This is the seo generator class that runs
 * on the global service in order to build sitemaps
 * and setup the SEO in the server
 * 
 * Itemize builds sitemaps using these forms
 * 1. The primary JSON index, the primary index is not saved as it always takes the same
 * shape, it just contains a list of urls for all the given languages, it does not contain lastQueried
 * information.
 * 2. The main JSON index, this is the index that contains all the sitemaps that exist within it that were collected
 * during each run of the seo generator; the main index is stored as JSON form and it can be translated
 * to each language url, eg the url /hello/world becomes https://mysite.com/en/hello/world https://mysite.com/es/hello/world
 * and so on when converted into XML; the mainIndex is what contains the last queried information; every main index
 * has a reference to the static entry and as many dynamic entries as necessary.
 * 3. The static JSON entry, contains all the static urls, static urls are considered like those that do not collect and do
 * not parametrize as such they are basically just static content; it does not contain last queried information.
 * 4. Dynamic JSON entries, are collected and generated at a given time, they are based on the collection of the last entries
 * and if they have some data they will be appended and reference to the main JSON index.
 * 
 * Once these indexes have been calculated and properly generated they are converted into XML per language.
 * The primary index becomes the index at sitemaps/mysite.com/index.xml
 * because it is an index it references other sitemaps so it is prefixed for the container
 * The main JSON index becomes the index at sitemaps/mysite.com/en/index.xml in as many languages as necessary
 * because it is an index it references other sitemaps so it is prefixed for the container
 * The static JSON entry becomes the entry at sitemaps/mysite.com/en/static.xml in as many languages as necessary
 * because it is an entry type all their urls will be prefixed for the webpage with https://mysite.com/{language}/
 * All the dynamic JSON entries become entries at the given date in as many languages as necessary
 * because it is an entry type all their urls will be prefixed for the webpage with https://mysite.com/{language}/
 */
export class SEOGenerator {
  private root: Root;
  private rawDB: ItemizeRawDB;
  private storageClient: StorageProvider<any>;
  private rules: ISEORuleSet;
  private supportedLanguages: string[];
  private hostname: string;
  private pingGoogle: boolean;

  private primaryIndex: ISitemapJSONType = null;
  private mainIndex: ISitemapJSONType = null;
  private seoCache: { [key: string]: ISEOCollectedData[] } = {};

  /**
   * Buillds a new seo generator
   * @param rules the seo rules
   * @param storageClient the storageClient with the XML files
   * @param rawDB the raw db instance
   * @param root the root for definitions
   * @param prefix the prefix for the openstack container
   * @param supportedLanguages the supporte languages
   * @param hostname the hostname that we are creating sitemaps for
   * @param pingGoogle whether to ping google once we have updated our sitemaps
   */
  constructor(
    rules: ISEORuleSet,
    storageClient: StorageProvider<any>,
    rawDB: ItemizeRawDB,
    root: Root,
    supportedLanguages: string[],
    hostname: string,
    pingGoogle: boolean,
  ) {
    this.storageClient = storageClient;
    this.rawDB = rawDB;
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
    }
  }

  /**
   * Run the seo generator mechanism, usually run once a day
   */
  public async run() {
    // if there's no seo we stop here
    if (NO_SEO) {
      return;
    }

    try {
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
      delete this.seoCache;
      this.seoCache = {};

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
      const currentStatic = JSON.parse(await this.storageClient.read(
        "sitemaps/" + this.hostname + "/main/static.json",
      ));
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
        logger.info("SEOGenerator.run: Pinging google at  " + googleURL);

        try {
          https.get(googleURL, (res) => {
            if (res.statusCode !== 200 && res.statusCode !== 0) {
              logger.error(
                "SEOGenerator.run: failed to ping google due to invalid status code",
                {
                  statusCode: res.statusCode,
                  statusMessage: res.statusMessage,
                }
              );
            }
            res.on("error", (err) => {
              logger.error(
                "SEOGenerator.run: failed to ping google",
                {
                  errMessage: err.message,
                  errStack: err.stack,
                }
              );
            });
          });
        } catch (err) {
          logger.error(
            "SEOGenerator.run: failed to ping google",
            {
              errMessage: err.message,
              errStack: err.stack,
            }
          );
        }
      }
    } catch (err) {
      logger.error(
        "SEOGenerator.run [SEVERE]: failed to generate sitemaps",
        {
          errMessage: err.message,
          errStack: err.stack,
        }
      );
    }
  }

  private async checkExist(at: string): Promise<boolean> {
    return this.storageClient.exists(at);
  }

  /**
   * Writes a file at the specified endpoint
   * @param data the data to write
   * @param target the target endpoint url
   */
  private async writeFile(data: string, target: string): Promise<void> {
    logger.info("SEOGenerator.writeFile: Attempting to write file at: " + target);

    const readStream = Readable.from(data);
    await this.storageClient.upload(
      target,
      readStream,
      false,
    );
  }

  /**
   * Converts a JSON sitemap type to a xml type
   * @param src the source JSON type
   * @param target the target where to write the file
   * @param prefix an optional prefix to add before the url that is supposed to be added but
   * not before the openstack prefix
   * @param suffix an optional suffix to add after the url that is supposed to be added
   */
  private async writeSitemapFile(
    src: ISitemapJSONType,
    target: string,
    prefix?: string,
    suffix?: string,
  ) {
    logger.info("SEOGenerator.writeSitemapFile: Attempting to write sitemap file at: " + target);

    await this.writeFile(toXML(src, this.hostname, this.storageClient.getPrefix(), prefix, suffix), target);
  }

  private async checkIndexFile() {
    if (this.mainIndex) {
      return;
    }

    // we will rewrite the primary index every time regardless if found or not, this ensures that
    // it's in sync
    await this.writeSitemapFile(this.primaryIndex, "sitemaps/" + this.hostname + "/index.xml");

    // we need to retrieve now the main index based on the json, if it exists
    this.mainIndex = JSON.parse(await this.storageClient.read("sitemaps/" + this.hostname + "/main/index.json"));
    let mainIndexWasNotFound = !this.mainIndex;

    // if we don't have a main index we build a new fresh one from scratch
    if (!this.mainIndex) {
      this.mainIndex = {
        lastQueried: null,
        entries: [],
        isIndex: true,
      }
    }

    // and do the same about the language indexes
    const languagesIndexFound = await Promise.all(this.supportedLanguages.map(async (lang) => {
      return {
        lang,
        found: await this.checkExist("sitemaps/" + this.hostname + "/" + lang + "/index.xml"),
      }
    }));

    // we use this variable to cache the content of the sitemaps in case
    // that we need to add more than one language at a given time
    const cachedEntries: { [url: string]: ISitemapJSONType } = {};

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
        await this.writeSitemapFile(
          this.mainIndex,
          // we are storing here
          storageTarget,
          // we need to prefix everything with the sitemaps/ourhost.com/en thing
          // because the main basically only contains these relative urls
          // and the sitemap spec wants absolute urls
          storagePrefix,
          // and everything needs to be set as .xml at the end
          ".xml",
        );

        // now we need to read every single entry from the main index entry list
        for (const entryURL of this.mainIndex.entries) {
          // and fetch it from the target or use our cache
          const entry: ISitemapJSONType =
            cachedEntries[entryURL] ||
            JSON.parse(await this.storageClient.read("sitemaps/" + this.hostname + "/main/" + entryURL + ".json"));
          // and store it in the cache
          cachedEntries[entryURL] = entry;

          // now we write that source json as a sitemap xml
          await this.writeSitemapFile(
            // these etries are actually urls of our site without the language prefixed to them
            entry,
            // now we save it there, those are the urls we collected that timestamp (or static ones)
            "sitemaps/" + this.hostname + "/" + languageIndex.lang + "/" + entryURL + ".xml",
            // and we prefix everything with the language, so that /my/url becomes /en/my/url
            languageIndex.lang,
          );
        }
      }
    }
  }

  /**
   * uses a seo rule in order to build the sitemap
   * @param key the comma separated urls that represents the key
   * @param rule the rule that we are following
   */
  private async runFor(key: string, rule: ISEORule): Promise<ISEOPreResult> {
    logger.info("SEOGenerator.runFor: Parsing sitemap for urls " + key);

    // if it's not crawable
    if (!rule.crawable) {
      // then nothing to be given
      return {
        lastQueried: null,
        urls: [],
        static: true,
      }
    }

    // otherwise let's see if it's a dynamic collect type
    // either because collect is set or parametrize is set
    if (rule.collect || rule.parametrize) {
      // so here we will store our results
      const collectedResults: ISEOCollectedResult[] = [];
      // and this will be our last queried information
      const lastQueried = {};

      // we start at index -1 in order to start at 0
      let index = -1;
      if (rule.collect) {
        for (const collectionPoint of rule.collect) {
          index++;

          // this might be null, we are seeing when we last queried this item
          const lastQueriedKey = key + "." + collectionPoint.module + "." + (collectionPoint.item || "");
          // and according to that we require since
          const querySince = this.mainIndex.lastQueried && this.mainIndex.lastQueried[
            lastQueriedKey
          ];
          // this is our cache key for all the results we get to store in our cache, we also use the timestamp
          const cachedKey = collectionPoint.module + "." + (collectionPoint.item || "") + "." + (querySince || "");

          // so this will be our query
          let query: SelectBuilder;

          // and we will make the query if there's no cached result for it
          if (!this.seoCache[cachedKey]) {
            const splittedModule = collectionPoint.module.split("/");
            const splittedIdef = collectionPoint.item && collectionPoint.item.split("/");
            if (splittedModule[0] === "") {
              splittedModule.shift();
            }
            if (splittedIdef && splittedIdef[0] === "") {
              splittedIdef.shift();
            }

            // get the module and the item definition, if exists
            const mod = this.root.getModuleFor(splittedModule);
            const idef = splittedIdef && mod.getItemDefinitionFor(splittedIdef);

            const whatToSelect = ["id", "version", "created_at"].concat(collectionPoint.extraProperties || []);

            query = this.rawDB.databaseConnection.getSelectBuilder();
            query.select(...whatToSelect);
            if (idef) {
              query.fromBuilder.from(idef.getQualifiedPathName());
              query.joinBuilder.join(mod.getQualifiedPathName(), (clause) => {
                clause.onColumnEquals("id", CONNECTOR_SQL_COLUMN_ID_FK_NAME);
                clause.onColumnEquals("version", CONNECTOR_SQL_COLUMN_VERSION_FK_NAME);
              });
            } else {
              query.fromBuilder.from(mod.getQualifiedPathName());
            }

            if (querySince) {
              query.whereBuilder.andWhereColumn("created_at", ">", querySince);
            }

            if (!collectionPoint.collectAllVersions) {
              query.whereBuilder.andWhereColumn("version", "");
            }

            query.whereBuilder.andWhereColumnNull("blocked_at");
            query.orderByBuilder.orderBy("created_at", "DESC", "LAST");
          }

          // otherwise we set by our cache or well, execute the query
          const collected: ISEOCollectedData[] =
            this.seoCache[cachedKey] ||
            await this.rawDB.databaseConnection.queryRows(query) as ISEOCollectedData[];

          // fix the null values
          collected.forEach((c) => convertVersionsIntoNullsWhenNecessary(c));

          // and that will be our value for our cache
          this.seoCache[cachedKey] = collected;

          // if we got something then we can set our last queried attribute to it
          if (collected[0]) {
            lastQueried[lastQueriedKey] = collected[0].created_at;
          }

          // and add to our collected results
          collectedResults[index] = {
            collected,
          };
        }
      }

      // now we need the parametrize function, or we use the default
      const parametrize = rule.parametrize || this.defaultParametrizer;
      // and we pass the collected results to see how we parametrize our results
      const parameters = await parametrize({
        collectedResults,
        root: this.root,
        rawDB: this.rawDB,
      });

      // now we fetch our urls
      let urls: string[] = [];
      // and the parameters start to loop
      parameters.forEach((parameterRule) => {
        // this will be our product after processing the key
        let product = key;
        // we need to literally replace every parameter key
        Object.keys(parameterRule.params).forEach((paramKey) => {
          product = product.replace(new RegExp(escapeStringRegexp(":" + paramKey), "g"), parameterRule.params[paramKey]);
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

  /**
   * defines how the parameters are collected from the given
   * SEO results
   * @param arg the collected results argument
   */
  private defaultParametrizer(arg: {
    collectedResults: ISEOCollectedResult[]
  }): ISEOParametrizer[] {
    // this just makes the id an version be the params
    return arg.collectedResults.map((cr) => {
      return cr.collected.map((r) => ({
        params: {
          id: r.id,
          version: r.version,
        },
      }));
    }).flat();
  }
}