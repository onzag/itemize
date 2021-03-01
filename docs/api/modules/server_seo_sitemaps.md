[](../README.md) / [Exports](../modules.md) / server/seo/sitemaps

# Module: server/seo/sitemaps

This file builds the sitemaps and converts the JSON type
structure to the XML type

## Table of contents

### Interfaces

- [ISitemapJSONType](../interfaces/server_seo_sitemaps.isitemapjsontype.md)
- [ISitemapLastQueryType](../interfaces/server_seo_sitemaps.isitemaplastquerytype.md)

### Functions

- [toXML](server_seo_sitemaps.md#toxml)

## Functions

### toXML

▸ **toXML**(`src`: [*ISitemapJSONType*](../interfaces/server_seo_sitemaps.isitemapjsontype.md), `targetDomain`: *string*, `sourcePrefix`: *string*, `prefixURL?`: *string*, `suffixURL?`: *string*): *string*

Converts a json sitemap file to a proper sitemap

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`src` | [*ISitemapJSONType*](../interfaces/server_seo_sitemaps.isitemapjsontype.md) | the json source   |
`targetDomain` | *string* | the target domain that we are making a SEO for   |
`sourcePrefix` | *string* | the source prefix (aka openstack/local prefix) where we store our files   |
`prefixURL?` | *string* | an optional prefix url to add between the source prefix and the target domain   |
`suffixURL?` | *string* | an optional suffix to add to the end    |

**Returns:** *string*

Defined in: [server/seo/sitemaps.ts:41](https://github.com/onzag/itemize/blob/0569bdf2/server/seo/sitemaps.ts#L41)
