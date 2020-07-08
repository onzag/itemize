export interface ISitemapLastQueryType {
    [id: string]: string;
}
export interface ISitemapJSONType {
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
