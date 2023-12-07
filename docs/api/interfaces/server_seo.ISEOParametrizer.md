[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/seo](../modules/server_seo.md) / ISEOParametrizer

# Interface: ISEOParametrizer

[server/seo](../modules/server_seo.md).ISEOParametrizer

Specifies the parameters that are to be given
into a url as they are replaced into this
url eg. /hello/:id if given {id: 1} becomes /hello/1

when creating SEO parameters they should contain
everything you need

## Table of contents

### Properties

- [lastModified](server_seo.ISEOParametrizer.md#lastmodified)
- [params](server_seo.ISEOParametrizer.md#params)

## Properties

### lastModified

• **lastModified**: `Date`

#### Defined in

[server/seo/index.ts:23](https://github.com/onzag/itemize/blob/a24376ed/server/seo/index.ts#L23)

___

### params

• **params**: `Object`

#### Index signature

▪ [parameter: `string`]: `string`

#### Defined in

[server/seo/index.ts:20](https://github.com/onzag/itemize/blob/a24376ed/server/seo/index.ts#L20)
