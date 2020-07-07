export interface ISitemapLastQueryType {
    [id: string]: string;
}
export interface ISitemapJSONType {
    lastQueried: ISitemapLastQueryType;
    isIndex: boolean;
    entries: string[];
}
export declare function toXML(src: ISitemapJSONType, targetDomain: string, sourcePrefix: string, prefixURL?: string, suffixURL?: string): string;
