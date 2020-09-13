export interface ISitemapLastQueryType {
    [id: string]: string;
}
/**
 * This is the sitemap as a json and it's used as a parsed
 * value for a sitemap that should exist in the specified folder
 * where the sitemap should be
 */
export interface ISitemapJSONType {
    /**
     * This is an object for all the elements inside the sitemap
     * and when they were last queried
     */
    lastQueried: ISitemapLastQueryType;
    isIndex: boolean;
    entries: string[];
}
/**
 * Converts a json sitemap file to a proper sitemap
 * @param src the json source
 * @param targetDomain the target domain that we are making a SEO for
 * @param sourcePrefix the source prefix (aka openstack prefix) where we store our files
 * @param prefixURL an optional prefix url to add between the source prefix and the target domain
 * @param suffixURL an optional suffix to add to the end
 */
export declare function toXML(src: ISitemapJSONType, targetDomain: string, sourcePrefix: string, prefixURL?: string, suffixURL?: string): string;
