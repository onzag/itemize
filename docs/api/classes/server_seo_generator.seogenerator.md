[](../README.md) / [Exports](../modules.md) / [server/seo/generator](../modules/server_seo_generator.md) / SEOGenerator

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

- [constructor](server_seo_generator.seogenerator.md#constructor)

### Properties

- [hostname](server_seo_generator.seogenerator.md#hostname)
- [mainIndex](server_seo_generator.seogenerator.md#mainindex)
- [pingGoogle](server_seo_generator.seogenerator.md#pinggoogle)
- [primaryIndex](server_seo_generator.seogenerator.md#primaryindex)
- [rawDB](server_seo_generator.seogenerator.md#rawdb)
- [root](server_seo_generator.seogenerator.md#root)
- [rules](server_seo_generator.seogenerator.md#rules)
- [seoCache](server_seo_generator.seogenerator.md#seocache)
- [storageClient](server_seo_generator.seogenerator.md#storageclient)
- [supportedLanguages](server_seo_generator.seogenerator.md#supportedlanguages)

### Methods

- [checkExist](server_seo_generator.seogenerator.md#checkexist)
- [checkIndexFile](server_seo_generator.seogenerator.md#checkindexfile)
- [defaultParametrizer](server_seo_generator.seogenerator.md#defaultparametrizer)
- [run](server_seo_generator.seogenerator.md#run)
- [runFor](server_seo_generator.seogenerator.md#runfor)
- [writeFile](server_seo_generator.seogenerator.md#writefile)
- [writeSitemapFile](server_seo_generator.seogenerator.md#writesitemapfile)

## Constructors

### constructor

\+ **new SEOGenerator**(`rules`: [*ISEORuleSet*](../interfaces/server_seo.iseoruleset.md), `storageClient`: [*default*](server_services_base_storageprovider.default.md)<any\>, `rawDB`: [*ItemizeRawDB*](server_raw_db.itemizerawdb.md), `root`: [*default*](base_root.default.md), `supportedLanguages`: *string*[], `hostname`: *string*, `pingGoogle`: *boolean*): [*SEOGenerator*](server_seo_generator.seogenerator.md)

Buillds a new seo generator

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rules` | [*ISEORuleSet*](../interfaces/server_seo.iseoruleset.md) | the seo rules   |
`storageClient` | [*default*](server_services_base_storageprovider.default.md)<any\> | the storageClient with the XML files   |
`rawDB` | [*ItemizeRawDB*](server_raw_db.itemizerawdb.md) | the raw db instance   |
`root` | [*default*](base_root.default.md) | the root for definitions   |
`supportedLanguages` | *string*[] | the supporte languages   |
`hostname` | *string* | the hostname that we are creating sitemaps for   |
`pingGoogle` | *boolean* | whether to ping google once we have updated our sitemaps    |

**Returns:** [*SEOGenerator*](server_seo_generator.seogenerator.md)

Defined in: [server/seo/generator.ts:77](https://github.com/onzag/itemize/blob/55e63f2c/server/seo/generator.ts#L77)

## Properties

### hostname

• `Private` **hostname**: *string*

Defined in: [server/seo/generator.ts:72](https://github.com/onzag/itemize/blob/55e63f2c/server/seo/generator.ts#L72)

___

### mainIndex

• `Private` **mainIndex**: [*ISitemapJSONType*](../interfaces/server_seo_sitemaps.isitemapjsontype.md)= null

Defined in: [server/seo/generator.ts:76](https://github.com/onzag/itemize/blob/55e63f2c/server/seo/generator.ts#L76)

___

### pingGoogle

• `Private` **pingGoogle**: *boolean*

Defined in: [server/seo/generator.ts:73](https://github.com/onzag/itemize/blob/55e63f2c/server/seo/generator.ts#L73)

___

### primaryIndex

• `Private` **primaryIndex**: [*ISitemapJSONType*](../interfaces/server_seo_sitemaps.isitemapjsontype.md)= null

Defined in: [server/seo/generator.ts:75](https://github.com/onzag/itemize/blob/55e63f2c/server/seo/generator.ts#L75)

___

### rawDB

• `Private` **rawDB**: [*ItemizeRawDB*](server_raw_db.itemizerawdb.md)

Defined in: [server/seo/generator.ts:68](https://github.com/onzag/itemize/blob/55e63f2c/server/seo/generator.ts#L68)

___

### root

• `Private` **root**: [*default*](base_root.default.md)

Defined in: [server/seo/generator.ts:67](https://github.com/onzag/itemize/blob/55e63f2c/server/seo/generator.ts#L67)

___

### rules

• `Private` **rules**: [*ISEORuleSet*](../interfaces/server_seo.iseoruleset.md)

Defined in: [server/seo/generator.ts:70](https://github.com/onzag/itemize/blob/55e63f2c/server/seo/generator.ts#L70)

___

### seoCache

• `Private` **seoCache**: *object*

#### Type declaration:

Defined in: [server/seo/generator.ts:77](https://github.com/onzag/itemize/blob/55e63f2c/server/seo/generator.ts#L77)

___

### storageClient

• `Private` **storageClient**: [*default*](server_services_base_storageprovider.default.md)<any\>

Defined in: [server/seo/generator.ts:69](https://github.com/onzag/itemize/blob/55e63f2c/server/seo/generator.ts#L69)

___

### supportedLanguages

• `Private` **supportedLanguages**: *string*[]

Defined in: [server/seo/generator.ts:71](https://github.com/onzag/itemize/blob/55e63f2c/server/seo/generator.ts#L71)

## Methods

### checkExist

▸ `Private`**checkExist**(`at`: *string*): *Promise*<boolean\>

#### Parameters:

Name | Type |
:------ | :------ |
`at` | *string* |

**Returns:** *Promise*<boolean\>

Defined in: [server/seo/generator.ts:320](https://github.com/onzag/itemize/blob/55e63f2c/server/seo/generator.ts#L320)

___

### checkIndexFile

▸ `Private`**checkIndexFile**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [server/seo/generator.ts:359](https://github.com/onzag/itemize/blob/55e63f2c/server/seo/generator.ts#L359)

___

### defaultParametrizer

▸ `Private`**defaultParametrizer**(`arg`: { `collectedResults`: [*ISEOCollectedResult*](../interfaces/server_seo.iseocollectedresult.md)[]  }): [*ISEOParametrizer*](../interfaces/server_seo.iseoparametrizer.md)[]

defines how the parameters are collected from the given
SEO results

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | *object* | the collected results argument    |
`arg.collectedResults` | [*ISEOCollectedResult*](../interfaces/server_seo.iseocollectedresult.md)[] | - |

**Returns:** [*ISEOParametrizer*](../interfaces/server_seo.iseoparametrizer.md)[]

Defined in: [server/seo/generator.ts:598](https://github.com/onzag/itemize/blob/55e63f2c/server/seo/generator.ts#L598)

___

### run

▸ **run**(): *Promise*<void\>

Run the seo generator mechanism, usually run once a day

**Returns:** *Promise*<void\>

Defined in: [server/seo/generator.ts:120](https://github.com/onzag/itemize/blob/55e63f2c/server/seo/generator.ts#L120)

___

### runFor

▸ `Private`**runFor**(`key`: *string*, `rule`: [*ISEORule*](../interfaces/server_seo.iseorule.md)): *Promise*<ISEOPreResult\>

uses a seo rule in order to build the sitemap

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`key` | *string* | the comma separated urls that represents the key   |
`rule` | [*ISEORule*](../interfaces/server_seo.iseorule.md) | the rule that we are following    |

**Returns:** *Promise*<ISEOPreResult\>

Defined in: [server/seo/generator.ts:444](https://github.com/onzag/itemize/blob/55e63f2c/server/seo/generator.ts#L444)

___

### writeFile

▸ `Private`**writeFile**(`data`: *string*, `target`: *string*): *Promise*<void\>

Writes a file at the specified endpoint

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`data` | *string* | the data to write   |
`target` | *string* | the target endpoint url    |

**Returns:** *Promise*<void\>

Defined in: [server/seo/generator.ts:329](https://github.com/onzag/itemize/blob/55e63f2c/server/seo/generator.ts#L329)

___

### writeSitemapFile

▸ `Private`**writeSitemapFile**(`src`: [*ISitemapJSONType*](../interfaces/server_seo_sitemaps.isitemapjsontype.md), `target`: *string*, `prefix?`: *string*, `suffix?`: *string*): *Promise*<void\>

Converts a JSON sitemap type to a xml type

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`src` | [*ISitemapJSONType*](../interfaces/server_seo_sitemaps.isitemapjsontype.md) | the source JSON type   |
`target` | *string* | the target where to write the file   |
`prefix?` | *string* | an optional prefix to add before the url that is supposed to be added but not before the openstack prefix   |
`suffix?` | *string* | an optional suffix to add after the url that is supposed to be added    |

**Returns:** *Promise*<void\>

Defined in: [server/seo/generator.ts:348](https://github.com/onzag/itemize/blob/55e63f2c/server/seo/generator.ts#L348)
