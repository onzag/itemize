/**
 * This file contains the seo generator and helper interfaces
 * for using for SEO purposes
 * @module
 */

import { ISEORuleSet, ISEOParametrizer } from ".";
import Root from "../../base/Root";
import { escapeStringRegexp } from "../../util";
import { ItemizeRawDB } from "../../server/raw-db";
import { ISQLTableRowValue } from "../../base/Root/sql";

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
  private rules: ISEORuleSet;
  private supportedLanguages: string[];
  private hostname: string;
  private buildnumber: string;

  /**
   * Buillds a new seo generator
   * @param rules the seo rules
   * @param rawDB the raw db instance
   * @param root the root for definitions
   * @param prefix the prefix for the openstack container
   * @param supportedLanguages the supporte languages
   * @param hostname the hostname that we are creating sitemaps for
   */
  constructor(
    rules: ISEORuleSet,
    rawDB: ItemizeRawDB,
    root: Root,
    supportedLanguages: string[],
    hostname: string,
    buildnumber: string,
  ) {
    this.rawDB = rawDB;
    this.root = root;
    this.rules = rules;
    this.supportedLanguages = supportedLanguages;
    this.hostname = hostname;
    this.buildnumber = buildnumber;

    this.defaultParametrizer = this.defaultParametrizer.bind(this);
  }

  /**
   * This is what does the processing hooking directly into the sitemap.xml
   * @param req  the relevant request
   * @param res 
   * @returns 
   */
  public async provide(req: any, res: any) {
    let requestCancelled = false;

    req.on('close', () => {
      requestCancelled = true;
    });

    res.setHeader('Content-Type', 'text/xml');
    res.write("<?xml version='1.0' encoding='UTF-8'?>");
    res.write("<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">");

    for (let urlSet of Object.keys(this.rules)) {
      if (requestCancelled) {
        return;
      }

      const allUrls = urlSet.split(",").map((v) => v.trim());
      const rule = this.rules[urlSet];

      if (rule.crawable) {
        const processCollectedResults = async (collectedResults: ISQLTableRowValue[]) => {
          const parametrize = rule.parametrize || this.defaultParametrizer;
          const parameters = await parametrize({
            collectedResults,
            root: this.root,
            rawDB: this.rawDB,
            buildnumber: this.buildnumber,
          });

          if (requestCancelled) {
            return;
          }

          allUrls.forEach((singleUrl) => {
            parameters.forEach((parameterRule) => {
              // this will be our product after processing the key
              let product = singleUrl;
              // we need to literally replace every parameter key
              Object.keys(parameterRule.params).forEach((paramKey) => {
                product = product.replace(new RegExp(escapeStringRegexp(":" + paramKey), "g"), parameterRule.params[paramKey]);
              });

              if (product) {
                if (product[0] !== "/") {
                  product = "/" + product;
                }

                this.supportedLanguages.forEach((l) => {
                  res.write("<url>");
                  res.write("<loc>https://" + this.hostname + "/" + l + product + "</loc>");
                  if (parameterRule.lastModified) {
                    res.write("<lastmod>" + parameterRule.lastModified.toISOString() + "</lastmod>");
                  }
                  res.write("</url>");
                });
              }
            });
          })
        }

        if (rule.collect) {
          await this.rawDB.startSingleClientOperation(async (singleClient) => {
            if (requestCancelled) {
              return;
            }

            const generator = singleClient.performRawDBCursorSelect(rule.collect.itemOrModule, (s) => {
              const whatToSelect = [
                "id",
                "version",
                "created_at",
                "last_modified",
              ].concat(rule.collect.extraColumns || []);
              s.select(...whatToSelect);
              if (!rule.collect.collectAllVersions) {
                s.whereBuilder.andWhereColumn("version", "");
              }
              rule.collect.customWhere && rule.collect.customWhere(s.whereBuilder);
            }, {
              batchSize: 10,
              withHold: true,
            });

            let rows = await generator.next();
            while (!rows.done) {
              if (requestCancelled) {
                generator.throw(new Error("Request Cancelled"));
                return;
              }
              if (rows.value) {
                await processCollectedResults(rows.value);
              }

              rows = await generator.next();
            }
          });
        } else {
          await processCollectedResults(null);
        }
      }
    }

    res.end("</urlset>");
  }

  // /**
  //  * defines how the parameters are collected from the given
  //  * SEO results
  //  * @param arg the collected results argument
  //  */
  private defaultParametrizer(arg: {
    collectedResults: ISQLTableRowValue[],
    buildnumber: string,
  }): ISEOParametrizer[] {
    if (!arg.collectedResults) {
      return [
        {
          params: {},
          lastModified: new Date(parseInt(arg.buildnumber)),
        },
      ]
    }

    // this just makes the id an version be the params
    return arg.collectedResults.map((r) => {
      return ({
        params: {
          id: r.id,
          version: r.version,
        },
        lastModified: new Date(r.last_modified),
      })
    });
  }
}