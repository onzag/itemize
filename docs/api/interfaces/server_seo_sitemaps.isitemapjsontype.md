[](../README.md) / [Exports](../modules.md) / [server/seo/sitemaps](../modules/server_seo_sitemaps.md) / ISitemapJSONType

# Interface: ISitemapJSONType

[server/seo/sitemaps](../modules/server_seo_sitemaps.md).ISitemapJSONType

This is the sitemap as a json and it's used as a parsed
value for a sitemap that should exist in the specified folder
where the sitemap should be

## Table of contents

### Properties

- [entries](server_seo_sitemaps.isitemapjsontype.md#entries)
- [isIndex](server_seo_sitemaps.isitemapjsontype.md#isindex)
- [lastQueried](server_seo_sitemaps.isitemapjsontype.md#lastqueried)

## Properties

### entries

• **entries**: *string*[]

Just a list of urls

Defined in: [server/seo/sitemaps.ts:30](https://github.com/onzag/itemize/blob/5fcde7cf/server/seo/sitemaps.ts#L30)

___

### isIndex

• **isIndex**: *boolean*

Whether it is an index type, index types is what truly contains these fields on the itemize structure for sitemaps is

Defined in: [server/seo/sitemaps.ts:26](https://github.com/onzag/itemize/blob/5fcde7cf/server/seo/sitemaps.ts#L26)

___

### lastQueried

• **lastQueried**: [*ISitemapLastQueryType*](server_seo_sitemaps.isitemaplastquerytype.md)

A main index will contain this filed, it is normally null for eg. the main entry, the static
index but the last queried is when some bit of data was last queried in the form of URL_RULE.MODULE_PATH.ITEM_PATH
and it contains a date where it will ask for what it was created after that, this is used for collection

Defined in: [server/seo/sitemaps.ts:22](https://github.com/onzag/itemize/blob/5fcde7cf/server/seo/sitemaps.ts#L22)
