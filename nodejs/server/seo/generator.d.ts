import { ISEORuleSet } from ".";
import Knex from "knex";
import Root from "../../base/Root";
import { CloudClient } from "../cloud";
export declare class SEOGenerator {
    private root;
    private knex;
    private cloudClient;
    private rules;
    private supportedLanguages;
    private hostname;
    private pingGoogle;
    private primaryIndex;
    private mainIndex;
    private cache;
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
    constructor(rules: ISEORuleSet, cloudClient: CloudClient, knex: Knex, root: Root, supportedLanguages: string[], hostname: string, pingGoogle: boolean);
    /**
     * Run the seo generator mechanism, usually run once a day
     */
    run(): Promise<void>;
    private checkExist;
    /**
     * Writes a file at the specified endpoint
     * @param data the data to write
     * @param target the target endpoint url
     */
    private writeFile;
    /**
     * Converts a JSON sitemap type to a xml type
     * @param src the source JSON type
     * @param target the target where to write the file
     * @param prefix an optional prefix to add before the url that is supposed to be added but
     * not before the openstack prefix
     * @param suffix an optional suffix to add after the url that is supposed to be added
     */
    private writeSitemapFile;
    private checkIndexFile;
    /**
     * uses a seo rule in order to build the sitemap
     * @param key the comma separated urls that represents the key
     * @param rule the rule that we are following
     */
    private runFor;
    private defaultParametrizer;
}
