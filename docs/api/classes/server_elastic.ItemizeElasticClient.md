[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/elastic](../modules/server_elastic.md) / ItemizeElasticClient

# Class: ItemizeElasticClient

[server/elastic](../modules/server_elastic.md).ItemizeElasticClient

This is the elastic client that is used in the global manager to keep
things up to date in the global service as well as in the standard servers
to perform queries against elastic

## Table of contents

### Constructors

- [constructor](server_elastic.ItemizeElasticClient.md#constructor)

### Properties

- [currentlyEnsuringIndexInGroup](server_elastic.ItemizeElasticClient.md#currentlyensuringindexingroup)
- [elasticClient](server_elastic.ItemizeElasticClient.md#elasticclient)
- [langAnalyzers](server_elastic.ItemizeElasticClient.md#langanalyzers)
- [lastFailedWaitMultiplied](server_elastic.ItemizeElasticClient.md#lastfailedwaitmultiplied)
- [pings](server_elastic.ItemizeElasticClient.md#pings)
- [pingsInitialDataSet](server_elastic.ItemizeElasticClient.md#pingsinitialdataset)
- [prepareInstancePromise](server_elastic.ItemizeElasticClient.md#prepareinstancepromise)
- [prepareInstancePromiseResolve](server_elastic.ItemizeElasticClient.md#prepareinstancepromiseresolve)
- [rawDB](server_elastic.ItemizeElasticClient.md#rawdb)
- [root](server_elastic.ItemizeElasticClient.md#root)
- [rootSchema](server_elastic.ItemizeElasticClient.md#rootschema)
- [runningConsistencyCheckOn](server_elastic.ItemizeElasticClient.md#runningconsistencycheckon)
- [serverData](server_elastic.ItemizeElasticClient.md#serverdata)
- [serverDataPromise](server_elastic.ItemizeElasticClient.md#serverdatapromise)
- [serverDataPromiseResolve](server_elastic.ItemizeElasticClient.md#serverdatapromiseresolve)

### Methods

- [\_rebuildAllIndexes](server_elastic.ItemizeElasticClient.md#_rebuildallindexes)
- [\_rebuildIndexGroup](server_elastic.ItemizeElasticClient.md#_rebuildindexgroup)
- [\_runConsistencyCheck](server_elastic.ItemizeElasticClient.md#_runconsistencycheck)
- [createDocument](server_elastic.ItemizeElasticClient.md#createdocument)
- [createDocumentUnknownEverything](server_elastic.ItemizeElasticClient.md#createdocumentunknowneverything)
- [createOrUpdateSimpleIndex](server_elastic.ItemizeElasticClient.md#createorupdatesimpleindex)
- [createPing](server_elastic.ItemizeElasticClient.md#createping)
- [deleteDocument](server_elastic.ItemizeElasticClient.md#deletedocument)
- [deleteDocumentUnknownLanguage](server_elastic.ItemizeElasticClient.md#deletedocumentunknownlanguage)
- [deleteDocumentsUnknownLanguage](server_elastic.ItemizeElasticClient.md#deletedocumentsunknownlanguage)
- [deletePingsFor](server_elastic.ItemizeElasticClient.md#deletepingsfor)
- [ensureIndexInGroup](server_elastic.ItemizeElasticClient.md#ensureindexingroup)
- [ensureIndexes](server_elastic.ItemizeElasticClient.md#ensureindexes)
- [ensureSimpleIndex](server_elastic.ItemizeElasticClient.md#ensuresimpleindex)
- [executeCountQuery](server_elastic.ItemizeElasticClient.md#executecountquery)
- [executePing](server_elastic.ItemizeElasticClient.md#executeping)
- [executePings](server_elastic.ItemizeElasticClient.md#executepings)
- [executeQuery](server_elastic.ItemizeElasticClient.md#executequery)
- [generateMissingIndexInGroup](server_elastic.ItemizeElasticClient.md#generatemissingindexingroup)
- [getAllStoredPingsAt](server_elastic.ItemizeElasticClient.md#getallstoredpingsat)
- [getDocumentBasicInfo](server_elastic.ItemizeElasticClient.md#getdocumentbasicinfo)
- [getSelectBuilder](server_elastic.ItemizeElasticClient.md#getselectbuilder)
- [getSeqNoInfo](server_elastic.ItemizeElasticClient.md#getseqnoinfo)
- [guessGeoIpFor](server_elastic.ItemizeElasticClient.md#guessgeoipfor)
- [guessLanguageFor](server_elastic.ItemizeElasticClient.md#guesslanguagefor)
- [informNewServerData](server_elastic.ItemizeElasticClient.md#informnewserverdata)
- [isRunningConsistencyCheck](server_elastic.ItemizeElasticClient.md#isrunningconsistencycheck)
- [performElasticSelect](server_elastic.ItemizeElasticClient.md#performelasticselect)
- [prepareInstance](server_elastic.ItemizeElasticClient.md#prepareinstance)
- [rebuildIndexes](server_elastic.ItemizeElasticClient.md#rebuildindexes)
- [retrieveCurrentSchemaDefinition](server_elastic.ItemizeElasticClient.md#retrievecurrentschemadefinition)
- [retrieveIndexStatusInfo](server_elastic.ItemizeElasticClient.md#retrieveindexstatusinfo)
- [runConsistencyCheck](server_elastic.ItemizeElasticClient.md#runconsistencycheck)
- [setIndexStatusInfo](server_elastic.ItemizeElasticClient.md#setindexstatusinfo)
- [updateDocument](server_elastic.ItemizeElasticClient.md#updatedocument)
- [updateDocumentUnknownEverything](server_elastic.ItemizeElasticClient.md#updatedocumentunknowneverything)
- [updateDocumentUnknownOriginalLanguage](server_elastic.ItemizeElasticClient.md#updatedocumentunknownoriginallanguage)
- [updateIndices](server_elastic.ItemizeElasticClient.md#updateindices)
- [waitForServerData](server_elastic.ItemizeElasticClient.md#waitforserverdata)

## Constructors

### constructor

• **new ItemizeElasticClient**(`root`, `rawDB`, `elasticClient`, `langAnalyzers`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`default`](base_Root.default.md) |
| `rawDB` | [`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md) |
| `elasticClient` | `default` |
| `langAnalyzers` | `ILangAnalyzers` |

#### Defined in

[server/elastic.ts:237](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L237)

## Properties

### currentlyEnsuringIndexInGroup

• `Private` **currentlyEnsuringIndexInGroup**: `Object` = `{}`

#### Index signature

▪ [n: `string`]: `Promise`<`boolean`\>

#### Defined in

[server/elastic.ts:232](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L232)

___

### elasticClient

• **elasticClient**: `default`

#### Defined in

[server/elastic.ts:217](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L217)

___

### langAnalyzers

• `Private` **langAnalyzers**: `ILangAnalyzers`

#### Defined in

[server/elastic.ts:221](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L221)

___

### lastFailedWaitMultiplied

• `Private` **lastFailedWaitMultiplied**: `number` = `0`

#### Defined in

[server/elastic.ts:223](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L223)

___

### pings

• `Private` **pings**: `IElasticPingSetter`<`any`, `any`\>[] = `[]`

#### Defined in

[server/elastic.ts:234](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L234)

___

### pingsInitialDataSet

• `Private` **pingsInitialDataSet**: `boolean`[] = `[]`

#### Defined in

[server/elastic.ts:235](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L235)

___

### prepareInstancePromise

• `Private` **prepareInstancePromise**: `Promise`<`void`\>

#### Defined in

[server/elastic.ts:229](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L229)

___

### prepareInstancePromiseResolve

• `Private` **prepareInstancePromiseResolve**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[server/elastic.ts:230](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L230)

___

### rawDB

• `Private` **rawDB**: [`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md)

#### Defined in

[server/elastic.ts:218](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L218)

___

### root

• `Private` **root**: [`default`](base_Root.default.md)

#### Defined in

[server/elastic.ts:219](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L219)

___

### rootSchema

• `Private` **rootSchema**: [`IElasticSchemaDefinitionType`](../interfaces/base_Root_sql.IElasticSchemaDefinitionType.md)

#### Defined in

[server/elastic.ts:220](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L220)

___

### runningConsistencyCheckOn

• `Private` **runningConsistencyCheckOn**: `Object` = `{}`

#### Index signature

▪ [key: `string`]: `Promise`<`void`\>

#### Defined in

[server/elastic.ts:224](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L224)

___

### serverData

• `Private` **serverData**: `any`

#### Defined in

[server/elastic.ts:222](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L222)

___

### serverDataPromise

• `Private` **serverDataPromise**: `Promise`<`void`\>

#### Defined in

[server/elastic.ts:226](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L226)

___

### serverDataPromiseResolve

• `Private` **serverDataPromiseResolve**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[server/elastic.ts:227](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L227)

## Methods

### \_rebuildAllIndexes

▸ `Private` **_rebuildAllIndexes**(): `Promise`<`string`[]\>

#### Returns

`Promise`<`string`[]\>

#### Defined in

[server/elastic.ts:423](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L423)

___

### \_rebuildIndexGroup

▸ `Private` **_rebuildIndexGroup**(`qualifiedName`, `value`, `isInitialRebuildIndexes`): `Promise`<`void`\>

This function is used to internally rebuild an index

#### Parameters

| Name | Type |
| :------ | :------ |
| `qualifiedName` | `string` |
| `value` | [`IElasticIndexDefinitionType`](../interfaces/base_Root_sql.IElasticIndexDefinitionType.md) |
| `isInitialRebuildIndexes` | `boolean` |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/elastic.ts:645](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L645)

___

### \_runConsistencyCheck

▸ `Private` **_runConsistencyCheck**(`rawDBClient`, `idef`, `timeRan`, `batchNumber`, `knownStatusInfo`, `knownLimiters`, `ensuranceCache`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `rawDBClient` | [`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md) |
| `idef` | [`default`](base_Root_Module_ItemDefinition.default.md) |
| `timeRan` | `Date` |
| `batchNumber` | `number` |
| `knownStatusInfo` | `IElasticIndexInformationType` |
| `knownLimiters` | [`ISearchLimitersType`](../interfaces/base_Root.ISearchLimitersType.md) |
| `ensuranceCache` | `any` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[server/elastic.ts:1088](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L1088)

___

### createDocument

▸ **createDocument**(`itemDefinition`, `language`, `id`, `version`, `value?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinition` | `string` \| [`default`](base_Root_Module_ItemDefinition.default.md) |
| `language` | `string` |
| `id` | `string` |
| `version` | `string` |
| `value?` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/elastic.ts:2573](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L2573)

___

### createDocumentUnknownEverything

▸ **createDocumentUnknownEverything**(`itemDefinition`, `id`, `version`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinition` | `string` \| [`default`](base_Root_Module_ItemDefinition.default.md) |
| `id` | `string` |
| `version` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/elastic.ts:2229](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L2229)

___

### createOrUpdateSimpleIndex

▸ `Private` **createOrUpdateSimpleIndex**(`id`, `value`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `value` | [`IElasticIndexDefinitionType`](../interfaces/base_Root_sql.IElasticIndexDefinitionType.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/elastic.ts:560](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L560)

___

### createPing

▸ **createPing**<`N`, `T`\>(`setter`): `void`

#### Type parameters

| Name |
| :------ |
| `N` |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `setter` | `IElasticPingSetter`<`N`, `T`\> |

#### Returns

`void`

#### Defined in

[server/elastic.ts:2653](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L2653)

___

### deleteDocument

▸ **deleteDocument**(`itemDefinition`, `language`, `id`, `version`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinition` | `string` \| [`default`](base_Root_Module_ItemDefinition.default.md) |
| `language` | `string` |
| `id` | `string` |
| `version` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/elastic.ts:2178](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L2178)

___

### deleteDocumentUnknownLanguage

▸ **deleteDocumentUnknownLanguage**(`itemDefinition`, `id`, `version`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinition` | `string` \| [`default`](base_Root_Module_ItemDefinition.default.md) |
| `id` | `string` |
| `version` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/elastic.ts:2162](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L2162)

___

### deleteDocumentsUnknownLanguage

▸ **deleteDocumentsUnknownLanguage**(`itemDefinition`, `ids`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinition` | `string` \| [`default`](base_Root_Module_ItemDefinition.default.md) |
| `ids` | (`string` \| { `id`: `string` ; `version`: `string`  })[] |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/elastic.ts:2117](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L2117)

___

### deletePingsFor

▸ **deletePingsFor**(`dataIndex`, `statusIndex`, `instanceId`): `Promise`<``"NOT_DEAD"`` \| ``"OK"``\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataIndex` | `string` |
| `statusIndex` | `string` |
| `instanceId` | `string` |

#### Returns

`Promise`<``"NOT_DEAD"`` \| ``"OK"``\>

#### Defined in

[server/elastic.ts:2735](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L2735)

___

### ensureIndexInGroup

▸ `Private` **ensureIndexInGroup**(`indexName`, `language`, `value`, `cache?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `indexName` | `string` |
| `language` | `string` |
| `value` | [`IElasticIndexDefinitionType`](../interfaces/base_Root_sql.IElasticIndexDefinitionType.md) |
| `cache?` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[server/elastic.ts:1967](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L1967)

___

### ensureIndexes

▸ **ensureIndexes**(`itemDefinitionOrModule`, `throwError?`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinitionOrModule` | `string` \| [`default`](base_Root_Module.default.md) \| [`default`](base_Root_Module_ItemDefinition.default.md) |
| `throwError?` | `boolean` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[server/elastic.ts:872](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L872)

___

### ensureSimpleIndex

▸ **ensureSimpleIndex**(`id`, `schema`, `throwError?`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `schema` | [`IElasticIndexDefinitionType`](../interfaces/base_Root_sql.IElasticIndexDefinitionType.md) |
| `throwError?` | `boolean` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[server/elastic.ts:827](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L827)

___

### executeCountQuery

▸ **executeCountQuery**(`elasticQuery`, `options?`): `Promise`<`CountResponse`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `elasticQuery` | [`ElasticQueryBuilder`](server_elastic.ElasticQueryBuilder.md) |
| `options` | `ElasticRequestOptions` |

#### Returns

`Promise`<`CountResponse`\>

#### Defined in

[server/elastic.ts:2643](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L2643)

___

### executePing

▸ `Private` **executePing**(`index`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/elastic.ts:2667](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L2667)

___

### executePings

▸ `Private` **executePings**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[server/elastic.ts:2717](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L2717)

___

### executeQuery

▸ **executeQuery**(`elasticQuery`, `options?`): `Promise`<`SearchResponse`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md), `Record`<`string`, `AggregationsAggregate`\>\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `elasticQuery` | [`ElasticQueryBuilder`](server_elastic.ElasticQueryBuilder.md) |
| `options` | `ElasticRequestOptions` |

#### Returns

`Promise`<`SearchResponse`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md), `Record`<`string`, `AggregationsAggregate`\>\>\>

#### Defined in

[server/elastic.ts:2634](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L2634)

___

### generateMissingIndexInGroup

▸ `Private` **generateMissingIndexInGroup**(`indexName`, `language`, `value`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `indexName` | `string` |
| `language` | `string` |
| `value` | [`IElasticIndexDefinitionType`](../interfaces/base_Root_sql.IElasticIndexDefinitionType.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/elastic.ts:2004](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L2004)

___

### getAllStoredPingsAt

▸ **getAllStoredPingsAt**<`N`\>(`dataIndex`): `Promise`<{ [key: string]: `N`;  }\>

#### Type parameters

| Name |
| :------ |
| `N` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataIndex` | `string` |

#### Returns

`Promise`<{ [key: string]: `N`;  }\>

#### Defined in

[server/elastic.ts:2721](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L2721)

___

### getDocumentBasicInfo

▸ **getDocumentBasicInfo**(`itemDefinition`, `id`, `version`): `Promise`<`IDocumentBasicInfo`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinition` | `string` \| [`default`](base_Root_Module_ItemDefinition.default.md) |
| `id` | `string` |
| `version` | `string` |

#### Returns

`Promise`<`IDocumentBasicInfo`[]\>

#### Defined in

[server/elastic.ts:2070](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L2070)

___

### getSelectBuilder

▸ **getSelectBuilder**(`itemDefinitionOrModule`, `language?`, `types?`): [`ElasticQueryBuilder`](server_elastic.ElasticQueryBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinitionOrModule` | `string` \| [`default`](base_Root_Module.default.md) \| [`default`](base_Root_Module_ItemDefinition.default.md) |
| `language?` | `string` |
| `types?` | (`string` \| [`default`](base_Root_Module_ItemDefinition.default.md))[] |

#### Returns

[`ElasticQueryBuilder`](server_elastic.ElasticQueryBuilder.md)

#### Defined in

[server/elastic.ts:2605](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L2605)

___

### getSeqNoInfo

▸ **getSeqNoInfo**(`info`): `Promise`<`IDocumentSeqNoInfo`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `info` | `IDocumentBasicInfo` |

#### Returns

`Promise`<`IDocumentSeqNoInfo`\>

#### Defined in

[server/elastic.ts:2040](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L2040)

___

### guessGeoIpFor

▸ **guessGeoIpFor**(`ip`): `Promise`<{ `city_name?`: `string` ; `continent_name?`: `string` ; `country_iso_code?`: `string` ; `country_name?`: `string` ; `location?`: { `lat`: `number` ; `lon`: `number`  } ; `region_iso_code?`: `string` ; `region_name?`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ip` | `string` |

#### Returns

`Promise`<{ `city_name?`: `string` ; `continent_name?`: `string` ; `country_iso_code?`: `string` ; `country_name?`: `string` ; `location?`: { `lat`: `number` ; `lon`: `number`  } ; `region_iso_code?`: `string` ; `region_name?`: `string`  }\>

#### Defined in

[server/elastic.ts:2789](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L2789)

___

### guessLanguageFor

▸ **guessLanguageFor**(`text`): `Promise`<{ `model_id`: `string` ; `predicted_value`: `string` ; `prediction_probability`: `string` ; `prediction_score`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |

#### Returns

`Promise`<{ `model_id`: `string` ; `predicted_value`: `string` ; `prediction_probability`: `string` ; `prediction_score`: `string`  }\>

#### Defined in

[server/elastic.ts:2830](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L2830)

___

### informNewServerData

▸ **informNewServerData**(`serverData`): `Promise`<`void`\>

This function is automatically called by the global manager when new server
data has been obtained, you should not use it by yourself

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverData` | `any` | the server data that has changed |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/elastic.ts:274](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L274)

___

### isRunningConsistencyCheck

▸ **isRunningConsistencyCheck**(`onElement?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `onElement?` | `string` \| [`default`](base_Root_Module.default.md) \| [`default`](base_Root_Module_ItemDefinition.default.md) |

#### Returns

`boolean`

#### Defined in

[server/elastic.ts:1082](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L1082)

___

### performElasticSelect

▸ **performElasticSelect**(`itemDefinitionOrModule`, `selecter`, `language?`): `Promise`<`SearchResponse`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md), `Record`<`string`, `AggregationsAggregate`\>\>\>

Performs an elastic search

This is the function you use

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinitionOrModule` | `string` \| [`default`](base_Root_Module.default.md) \| [`default`](base_Root_Module_ItemDefinition.default.md) |
| `selecter` | (`builder`: [`ElasticQueryBuilder`](server_elastic.ElasticQueryBuilder.md)) => `void` |
| `language?` | `string` |

#### Returns

`Promise`<`SearchResponse`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md), `Record`<`string`, `AggregationsAggregate`\>\>\>

#### Defined in

[server/elastic.ts:2595](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L2595)

___

### prepareInstance

▸ **prepareInstance**(): `Promise`<`void`\>

Prepares the itemize instance so that all the necessary meta indexes are contained
and checks wether existant indexes match the shape, this can take a very long time
this function is called automatically by the global manager

#### Returns

`Promise`<`void`\>

a void promise

#### Defined in

[server/elastic.ts:373](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L373)

___

### rebuildIndexes

▸ **rebuildIndexes**(`itemDefinitionOrModule`): `Promise`<`void`\>

Builds an index from scratch if this is found not to match
the given schema, this function is ran automatically and you are not
supposed to use it

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinitionOrModule` | `string` \| [`default`](base_Root_Module.default.md) \| [`default`](base_Root_Module_ItemDefinition.default.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/elastic.ts:805](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L805)

___

### retrieveCurrentSchemaDefinition

▸ `Private` **retrieveCurrentSchemaDefinition**(`indexName`): `Promise`<`IndicesGetMappingResponse`\>

For a given index, either itself or wildcard form it will
return all the mappings that it knows to have, if no mapping
are found it will return null

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `indexName` | `string` | the index name to check |

#### Returns

`Promise`<`IndicesGetMappingResponse`\>

whatever it finds, or null if the index does not exist

#### Defined in

[server/elastic.ts:491](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L491)

___

### retrieveIndexStatusInfo

▸ `Private` **retrieveIndexStatusInfo**(`qualifiedName`): `Promise`<`IElasticIndexInformationType`\>

retrieves the status information for a given index, also uses cahing to ensure
consistency

#### Parameters

| Name | Type |
| :------ | :------ |
| `qualifiedName` | `string` |

#### Returns

`Promise`<`IElasticIndexInformationType`\>

#### Defined in

[server/elastic.ts:535](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L535)

___

### runConsistencyCheck

▸ **runConsistencyCheck**(`onElement?`, `force?`): `Promise`<`void`\>

This is a fairly redundant function used to manually repopulate the indexes based on the last time
they were manually repopulated, this is a redundant function because most of the time those records
will be deemed to be already in the index, but sometimes they will be found to have a missing index
when a missing index is found because it doesn't match the signature then it will be created, modified or
deleted manually.

This function asks the master database for a record of what changed since the last time it was dormant,
and it will give a list of records created, records modified, and records deleted since that time

Then the function will requests all the documents since that transaction time, created, or modified.

eg. let's give an index with inconsistencies, where, document 1 is missing, it was added but somehow
it was missed in the index, the function will check if this document exists, and when found not to it will
request that to be added, an inconsistency was found.

document 2 was modified but it didn't match, once the last modified signature doesn't match, docuent 2 will
be requested to be added just like document 1, from the database

document 3 still is there, but it doesn't come in the result because it is old, but it's dangling somewhere
in the index, for that we need to find an document for the given id and version, of all the deleted documents,
if we find some of them, we shall delete them.

If any of these consistency checks fails because they can't fix the inconsistency then the last consistency check doesn't
change and the next consistency check will be ran against the same data

If a consistency check has never ran before, then it will request these records since the beggining of time (or as the since
limiter restricts to do) and will populate everything it finds, this basically builds the index from scratch
and may be expensive on first try, you may get errors

This function is run automatically with the elastic consistency checker that runs in the global manager in elastic mode or
in absolute mode, you may want to run a manual consistency check but it is unecessary check the server consistency check
regarding how often these consistency checks are ran regarding SERVER_ELASTIC_CLEANUP_TIME

Will also flush old records that do not respect the since limiter

Will also find duplicates in some cases that are not in the right language, as it tries to find and check against
all the records that match given ids on the list, if it finds two of those, one of those must be invalid

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `onElement?` | `string` \| [`default`](base_Root_Module.default.md) \| [`default`](base_Root_Module_ItemDefinition.default.md) | the element to run the consistency check on, if none specified will run it on everything |
| `force?` | `boolean` | by default the consistency will wait for preparation and will not overlap other consistency checks, use this to just run it right away regardless regardless of anything |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/elastic.ts:1023](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L1023)

___

### setIndexStatusInfo

▸ `Private` **setIndexStatusInfo**(`qualifiedName`, `value`): `Promise`<`void`\>

Updates the index status info for a given index or group
of indexes given its qualified name

#### Parameters

| Name | Type |
| :------ | :------ |
| `qualifiedName` | `string` |
| `value` | `IElasticIndexInformationType` |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/elastic.ts:515](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L515)

___

### updateDocument

▸ **updateDocument**(`itemDefinition`, `language`, `id`, `version`, `value?`): `Promise`<`void`\>

Updates a document for a given index
if the index does not exist the whole operation is ingored and instead
a rebuild operation is launched for the given index (which should fetch everything up to date)

The execution will not do a thing if
1. the item itself is not search engine enabled
2. it's determined that it doesn't pass the specified limiter

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinition` | `string` \| [`default`](base_Root_Module_ItemDefinition.default.md) |
| `language` | `string` |
| `id` | `string` |
| `version` | `string` |
| `value?` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/elastic.ts:2331](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L2331)

___

### updateDocumentUnknownEverything

▸ **updateDocumentUnknownEverything**(`itemDefinition`, `id`, `version`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinition` | `string` \| [`default`](base_Root_Module_ItemDefinition.default.md) |
| `id` | `string` |
| `version` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/elastic.ts:2268](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L2268)

___

### updateDocumentUnknownOriginalLanguage

▸ **updateDocumentUnknownOriginalLanguage**(`itemDefinition`, `language`, `id`, `version`, `value?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinition` | `string` \| [`default`](base_Root_Module_ItemDefinition.default.md) |
| `language` | `string` |
| `id` | `string` |
| `version` | `string` |
| `value?` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/elastic.ts:2309](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L2309)

___

### updateIndices

▸ **updateIndices**(`onElement?`, `force?`): `Promise`<`void`\>

An alias for running a consistency check

this function can actually be ran from within a cluster, or extended instance
if it believes it is doing something that warrants that mechanism

#### Parameters

| Name | Type |
| :------ | :------ |
| `onElement?` | `string` \| [`default`](base_Root_Module.default.md) \| [`default`](base_Root_Module_ItemDefinition.default.md) |
| `force?` | `boolean` |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/elastic.ts:976](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L976)

___

### waitForServerData

▸ `Private` **waitForServerData**(): `Promise`<`void`\>

A function used within this class in order to wait for the server
data to be ready

#### Returns

`Promise`<`void`\>

a void promise

#### Defined in

[server/elastic.ts:359](https://github.com/onzag/itemize/blob/a24376ed/server/elastic.ts#L359)
