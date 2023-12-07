[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/seo/generator](../modules/server_seo_generator.md) / SEOGenerator

# Class: SEOGenerator

[server/seo/generator](../modules/server_seo_generator.md).SEOGenerator

This is the seo generator class that runs
on the global service in order to build sitemaps
and setup the SEO in the server

Itemize builds sitemaps using these forms
1. The primary JSON index, the primary index is not saved as it always takes the same
shape, it just contains a list of urls for all the given languages, it does not contain lastQueried
information.
2. The main JSON index, this is the index that contains all the sitemaps that exist within it that were collected
during each run of the seo generator; the main index is stored as JSON form and it can be translated
to each language url, eg the url /hello/world becomes https://mysite.com/en/hello/world https://mysite.com/es/hello/world
and so on when converted into XML; the mainIndex is what contains the last queried information; every main index
has a reference to the static entry and as many dynamic entries as necessary.
3. The static JSON entry, contains all the static urls, static urls are considered like those that do not collect and do
not parametrize as such they are basically just static content; it does not contain last queried information.
4. Dynamic JSON entries, are collected and generated at a given time, they are based on the collection of the last entries
and if they have some data they will be appended and reference to the main JSON index.

Once these indexes have been calculated and properly generated they are converted into XML per language.
The primary index becomes the index at sitemaps/mysite.com/index.xml
because it is an index it references other sitemaps so it is prefixed for the container
The main JSON index becomes the index at sitemaps/mysite.com/en/index.xml in as many languages as necessary
because it is an index it references other sitemaps so it is prefixed for the container
The static JSON entry becomes the entry at sitemaps/mysite.com/en/static.xml in as many languages as necessary
because it is an entry type all their urls will be prefixed for the webpage with https://mysite.com/{language}/
All the dynamic JSON entries become entries at the given date in as many languages as necessary
because it is an entry type all their urls will be prefixed for the webpage with https://mysite.com/{language}/

## Table of contents

### Constructors

- [constructor](server_seo_generator.SEOGenerator.md#constructor)

### Properties

- [buildnumber](server_seo_generator.SEOGenerator.md#buildnumber)
- [hostname](server_seo_generator.SEOGenerator.md#hostname)
- [rawDB](server_seo_generator.SEOGenerator.md#rawdb)
- [root](server_seo_generator.SEOGenerator.md#root)
- [rules](server_seo_generator.SEOGenerator.md#rules)
- [supportedLanguages](server_seo_generator.SEOGenerator.md#supportedlanguages)

### Methods

- [defaultParametrizer](server_seo_generator.SEOGenerator.md#defaultparametrizer)
- [provide](server_seo_generator.SEOGenerator.md#provide)

## Constructors

### constructor

• **new SEOGenerator**(`rules`, `rawDB`, `root`, `supportedLanguages`, `hostname`, `buildnumber`)

Buillds a new seo generator

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rules` | [`ISEORuleSet`](../interfaces/server_seo.ISEORuleSet.md) | the seo rules |
| `rawDB` | [`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md) | the raw db instance |
| `root` | [`default`](base_Root.default.md) | the root for definitions |
| `supportedLanguages` | `string`[] | the supporte languages |
| `hostname` | `string` | the hostname that we are creating sitemaps for |
| `buildnumber` | `string` | - |

#### Defined in

[server/seo/generator.ts:59](https://github.com/onzag/itemize/blob/a24376ed/server/seo/generator.ts#L59)

## Properties

### buildnumber

• `Private` **buildnumber**: `string`

#### Defined in

[server/seo/generator.ts:48](https://github.com/onzag/itemize/blob/a24376ed/server/seo/generator.ts#L48)

___

### hostname

• `Private` **hostname**: `string`

#### Defined in

[server/seo/generator.ts:47](https://github.com/onzag/itemize/blob/a24376ed/server/seo/generator.ts#L47)

___

### rawDB

• `Private` **rawDB**: [`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md)

#### Defined in

[server/seo/generator.ts:44](https://github.com/onzag/itemize/blob/a24376ed/server/seo/generator.ts#L44)

___

### root

• `Private` **root**: [`default`](base_Root.default.md)

#### Defined in

[server/seo/generator.ts:43](https://github.com/onzag/itemize/blob/a24376ed/server/seo/generator.ts#L43)

___

### rules

• `Private` **rules**: [`ISEORuleSet`](../interfaces/server_seo.ISEORuleSet.md)

#### Defined in

[server/seo/generator.ts:45](https://github.com/onzag/itemize/blob/a24376ed/server/seo/generator.ts#L45)

___

### supportedLanguages

• `Private` **supportedLanguages**: `string`[]

#### Defined in

[server/seo/generator.ts:46](https://github.com/onzag/itemize/blob/a24376ed/server/seo/generator.ts#L46)

## Methods

### defaultParametrizer

▸ `Private` **defaultParametrizer**(`arg`): [`ISEOParametrizer`](../interfaces/server_seo.ISEOParametrizer.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `Object` |
| `arg.buildnumber` | `string` |
| `arg.collectedResults` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[] |

#### Returns

[`ISEOParametrizer`](../interfaces/server_seo.ISEOParametrizer.md)[]

#### Defined in

[server/seo/generator.ts:193](https://github.com/onzag/itemize/blob/a24376ed/server/seo/generator.ts#L193)

___

### provide

▸ **provide**(`req`, `res`): `Promise`<`void`\>

This is what does the processing hooking directly into the sitemap.xml

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `req` | `any` | the relevant request |
| `res` | `any` |  |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/seo/generator.ts:83](https://github.com/onzag/itemize/blob/a24376ed/server/seo/generator.ts#L83)
