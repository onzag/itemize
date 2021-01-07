/**
 * Contains the interfaces for generating SEO
 * @packageDocumentation
 */

import Root from "../../base/Root";
import Knex from "knex";

/**
 * Specifies the parameters that are to be given
 * into a url as they are replaced into this
 * url eg. /hello/:id if given {id: 1} becomes /hello/1
 * 
 * when creating SEO parameters they should contain
 * everything you need
 */
export interface ISEOParametrizer {
  params: {
    [parameter: string]: string
  },
}

/**
 * Represents a collected data point
 * the id, version and created_at are always
 * provided to the given seo collection endpoint
 * however extra properties can be added when requested by
 * the ISEOCollectionRequest
 */
export interface ISEOCollectedData {
  id: string;
  version: string;
  created_at: string;
  [extraProperty: string]: any;
}

export interface ISEOCollectionRequest {
  module: string,
  item?: string,
  extraProperties?: string[],
  /**
   * By default only the base version is collected, if you wish you can collect all the versions
   */
  collectAllVersions?: boolean;
}

/**
 * When collection is done a list of collected results is obtained
 * this is what a single collected result looks like
 */
export interface ISEOCollectedResult {
  collected: ISEOCollectedData[];
}

/**
 * Represents a rule for building the SEO sitemaps
 */
export interface ISEORule {
  /**
   * Whether this is a crawable url, you might set this value to true or
   * false, depending on you
   */
  crawable: boolean;
  /**
   * The collect rule is an optional base rule of what needs to be collected in order to populate these results
   * the first string represents the module path, eg. "users" you should separate it by / if there's more
   * into them, the second string represents the item definition path eg. "user" also separated by / if there's
   * more depth to them
   * 
   * The collect rule is the base point for parametrization, and only new results get collected, for efficiency reasons
   * a signature is built and only what is newly added gets collected
   * 
   * lets suppose you are about to build urls for /group/:id/subgroup/:sid where a subgroup is parented by a group
   * in that case your collection rule would be as you only need the subgroups as this is a subgroup url
   * [{
   *   module: "social",
   *   item: "subgroup",
   *   extraProperties: ["parent_id"]
   * }]
   * 
   * When you run the parametrize function you will get all the results for these, suppose you got a new group added
   * since last check results will look like the ISEOCollectedResult interface as an array
   * 
   * [
   *   {
   *     collected: [
   *       {
   *         id: 3,
   *         version: null,
   *         created_at: "???",
   *         parent_id: 2
   *       },
   *       {
   *         id: 4,
   *         version: null,
   *         created_at: "???",
   *         parent_id: 1
   *       },
   *     ]
   *   }
   * ]
   * 
   * So this specifies all the new subgroups added and now you can build the url by using the parametrize function
   * 
   * (arg) => (arg.collectedResults[0].collected.map(r) => ({params: {sid: r.id, id: r.parent_id}}));
   * 
   * this will correctly parametrize and replace every id with every other, notice that you have access to knex
   * and the root in these, this should enable you to create complex parametrizers eg. suppose you are using the
   * /group/:name/subgroup/:name instead in the urls (however this is not recommended unless your names are static)
   * and this isn't even good for indexing, but whatever, even this is possible to SEO
   * 
   * In this case you will have to change your extraProperties rule to include the name, and you will have to request
   * the parent in the parent_id using knex (there's no cache on the global manager) and you should get the container it
   * is in; you might want to use a memory cache while the parametrizer run, the parametrizer can return a promise so
   * it can be async
   * 
   */
  collect?: ISEOCollectionRequest[];
  /**
   * This is the parametrize function, only makes sense to use when you specify the collect attribute as this needs
   * to make use of collected results, however you might specify parametrize without using collect at all, but bear in mind that
   * you will have somehow to keep track of what you are searching for yourself, parametrize is only really intended to run with
   * collect
   */
  parametrize?: (arg: {
    collectedResults: ISEOCollectedResult[];
    root: Root,
    knex: Knex,
  }) => ISEOParametrizer[] | Promise<ISEOParametrizer[]>
}

/**
 * The SEO ruleset specifies how to do SEO for given
 * urls
 */
export interface ISEORuleSet {
  [commaSeparatedURLsWithoutLanguage: string]: ISEORule,
}