[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/raw-db](../modules/server_raw_db.md) / ItemizeRawDB

# Class: ItemizeRawDB

[server/raw-db](../modules/server_raw_db.md).ItemizeRawDB

This is a very advanced feature, if you are here is because you are doing raw database
updates and want to propagate them into your clients to ensure that the realtime attributes
get mantained and the caches get properly invalidated

## Table of contents

### Constructors

- [constructor](server_raw_db.ItemizeRawDB.md#constructor)

### Properties

- [cachedSelects](server_raw_db.ItemizeRawDB.md#cachedselects)
- [databaseConnection](server_raw_db.ItemizeRawDB.md#databaseconnection)
- [elastic](server_raw_db.ItemizeRawDB.md#elastic)
- [redisGlobal](server_raw_db.ItemizeRawDB.md#redisglobal)
- [redisPub](server_raw_db.ItemizeRawDB.md#redispub)
- [redisSub](server_raw_db.ItemizeRawDB.md#redissub)
- [root](server_raw_db.ItemizeRawDB.md#root)
- [transacting](server_raw_db.ItemizeRawDB.md#transacting)
- [transactingQueue](server_raw_db.ItemizeRawDB.md#transactingqueue)

### Methods

- [\_retrieveRawDBSelect](server_raw_db.ItemizeRawDB.md#_retrieverawdbselect)
- [\_updateCachedSelect](server_raw_db.ItemizeRawDB.md#_updatecachedselect)
- [checkRowValidityForInformingChanges](server_raw_db.ItemizeRawDB.md#checkrowvalidityforinformingchanges)
- [createGloballyCachedRawDBSelect](server_raw_db.ItemizeRawDB.md#creategloballycachedrawdbselect)
- [deleteGloballyCachedRawDBSelect](server_raw_db.ItemizeRawDB.md#deletegloballycachedrawdbselect)
- [executeGloballyCachedRawDBSelect](server_raw_db.ItemizeRawDB.md#executegloballycachedrawdbselect)
- [handleIncomingMessage](server_raw_db.ItemizeRawDB.md#handleincomingmessage)
- [informChangeOnRow](server_raw_db.ItemizeRawDB.md#informchangeonrow)
- [informChangeOnRowElastic](server_raw_db.ItemizeRawDB.md#informchangeonrowelastic)
- [informChangeOnRows](server_raw_db.ItemizeRawDB.md#informchangeonrows)
- [informChangeOnRowsElasticOnly](server_raw_db.ItemizeRawDB.md#informchangeonrowselasticonly)
- [informRowsHaveBeenAdded](server_raw_db.ItemizeRawDB.md#informrowshavebeenadded)
- [informRowsHaveBeenAddedElasticOnly](server_raw_db.ItemizeRawDB.md#informrowshavebeenaddedelasticonly)
- [informRowsHaveBeenDeleted](server_raw_db.ItemizeRawDB.md#informrowshavebeendeleted)
- [informRowsHaveBeenDeletedElasticOnly](server_raw_db.ItemizeRawDB.md#informrowshavebeendeletedelasticonly)
- [informRowsHaveBeenModified](server_raw_db.ItemizeRawDB.md#informrowshavebeenmodified)
- [informRowsHaveBeenModifiedElasticOnly](server_raw_db.ItemizeRawDB.md#informrowshavebeenmodifiedelasticonly)
- [performBatchRawDBDelete](server_raw_db.ItemizeRawDB.md#performbatchrawdbdelete)
- [performBatchRawDBUpdate](server_raw_db.ItemizeRawDB.md#performbatchrawdbupdate)
- [performModuleBatchRawDBUpdate](server_raw_db.ItemizeRawDB.md#performmodulebatchrawdbupdate)
- [performRawDBDelete](server_raw_db.ItemizeRawDB.md#performrawdbdelete)
- [performRawDBInsert](server_raw_db.ItemizeRawDB.md#performrawdbinsert)
- [performRawDBSelect](server_raw_db.ItemizeRawDB.md#performrawdbselect)
- [performRawDBUpdate](server_raw_db.ItemizeRawDB.md#performrawdbupdate)
- [processGQLValue](server_raw_db.ItemizeRawDB.md#processgqlvalue)
- [provideHashableV5Id](server_raw_db.ItemizeRawDB.md#providehashablev5id)
- [provideRandomV4Id](server_raw_db.ItemizeRawDB.md#providerandomv4id)
- [redoDictionariesFn](server_raw_db.ItemizeRawDB.md#redodictionariesfn)
- [retrieveGloballyCachedRawDBSelect](server_raw_db.ItemizeRawDB.md#retrievegloballycachedrawdbselect)
- [retrieveRawDBSelect](server_raw_db.ItemizeRawDB.md#retrieverawdbselect)
- [setupElastic](server_raw_db.ItemizeRawDB.md#setupelastic)
- [startTransaction](server_raw_db.ItemizeRawDB.md#starttransaction)
- [storeInDeleteRegistry](server_raw_db.ItemizeRawDB.md#storeindeleteregistry)
- [updateTrackers](server_raw_db.ItemizeRawDB.md#updatetrackers)

## Constructors

### constructor

• **new ItemizeRawDB**(`redisGlobal`, `redisPub`, `redisSub`, `databaseConnection`, `root`)

Builds a new instance of the change informer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `redisGlobal` | [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md) | - |
| `redisPub` | [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md) | the redis publish instance |
| `redisSub` | [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md) | - |
| `databaseConnection` | [`DatabaseConnection`](database.DatabaseConnection.md) | a connection to the database |
| `root` | [`default`](base_Root.default.md) | the root instance |

#### Defined in

[server/raw-db.ts:94](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L94)

## Properties

### cachedSelects

• `Private` **cachedSelects**: `Object` = `{}`

#### Index signature

▪ [prefixedUniqueID: `string`]: { `expiresAt`: `number` ; `intervalObject`: `NodeJS.Timer` ; `itemDefinitionOrModule`: [`default`](base_Root_Module_ItemDefinition.default.md) \| [`default`](base_Root_Module.default.md) \| `string` ; `preventJoin`: `boolean` ; `uniqueID`: `string` ; `updateInterval`: `number` ; `selecter`: (`builder`: [`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)) => `void`  }

#### Defined in

[server/raw-db.ts:74](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L74)

___

### databaseConnection

• **databaseConnection**: [`DatabaseConnection`](database.DatabaseConnection.md)

#### Defined in

[server/raw-db.ts:86](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L86)

___

### elastic

• `Private` **elastic**: [`ItemizeElasticClient`](server_elastic.ItemizeElasticClient.md)

#### Defined in

[server/raw-db.ts:69](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L69)

___

### redisGlobal

• `Private` **redisGlobal**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Defined in

[server/raw-db.ts:66](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L66)

___

### redisPub

• `Private` **redisPub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Defined in

[server/raw-db.ts:64](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L64)

___

### redisSub

• `Private` **redisSub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Defined in

[server/raw-db.ts:65](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L65)

___

### root

• `Private` **root**: [`default`](base_Root.default.md)

#### Defined in

[server/raw-db.ts:68](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L68)

___

### transacting

• `Private` **transacting**: `boolean`

#### Defined in

[server/raw-db.ts:71](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L71)

___

### transactingQueue

• `Private` **transactingQueue**: `Function`[] = `[]`

#### Defined in

[server/raw-db.ts:72](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L72)

## Methods

### \_retrieveRawDBSelect

▸ `Private` **_retrieveRawDBSelect**(`itemDefinitionOrModule`, `selecter`, `preventJoin?`): [`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinitionOrModule` | `string` \| [`default`](base_Root_Module.default.md) \| [`default`](base_Root_Module_ItemDefinition.default.md) |
| `selecter` | (`builder`: [`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)) => `void` |
| `preventJoin?` | `boolean` |

#### Returns

[`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)

#### Defined in

[server/raw-db.ts:1310](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L1310)

___

### \_updateCachedSelect

▸ `Private` **_updateCachedSelect**(`uniqueID`, `throwErrors?`): `Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[]\>

This is the function that handles the execution of the cached raw db select storage in global
redis

#### Parameters

| Name | Type |
| :------ | :------ |
| `uniqueID` | `string` |
| `throwErrors?` | `boolean` |

#### Returns

`Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[]\>

#### Defined in

[server/raw-db.ts:1490](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L1490)

___

### checkRowValidityForInformingChanges

▸ `Private` **checkRowValidityForInformingChanges**(`row`, `idef`, `doNotCheckTracked?`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `row` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |
| `idef` | [`default`](base_Root_Module_ItemDefinition.default.md) |
| `doNotCheckTracked?` | `boolean` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[server/raw-db.ts:264](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L264)

___

### createGloballyCachedRawDBSelect

▸ **createGloballyCachedRawDBSelect**(`uniqueID`, `itemDefinitionOrModule`, `selecter`, `preventJoin?`, `options?`): `Promise`<`void`\>

Note this is a slow method, better suited to use and forget

Creates a cached raw db select operation that executes
in the given interval

The reason for this is calculation of resources that are expensive and we would like to resolve only every so often
for example let's say we want to count the number of users but not be quite accurate

For example let's say we add the following function in our global manager when we initialize the server

initializeServer({...}, {...}, {globalManagerInitialServerDataFunction: (manager) => {
  manager.rawDB.createGloballyCachedRawDBSelect("NUMBER_OF_USERS", "users/user", (b) => b.select("COUNT(*)"), true);
}})

And then in and endpoint you may create in the router in order to get that information for the rows selected you may

appData.rawDB.retrieveGloballyCachedRawDBSelect("NUMBER_OF_USERS")

will yield the cached result exactly as it would do a raw db select

NOTE this method is slow, because of the way it has to function to ensure that the cached raw db select is created
and mantained by whichever instance created it first, it will send a message over the global network and then wait
to see if anything else is handling the same request with the same unique id, if there is, it will not create anything,
use doNotProbe if you want to create it regardless which will considerably speed it up

#### Parameters

| Name | Type |
| :------ | :------ |
| `uniqueID` | `string` |
| `itemDefinitionOrModule` | `string` \| [`default`](base_Root_Module.default.md) \| [`default`](base_Root_Module_ItemDefinition.default.md) |
| `selecter` | (`builder`: [`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)) => `void` |
| `preventJoin?` | `boolean` |
| `options?` | `Object` |
| `options.doNotProbe?` | `boolean` |
| `options.expire?` | `number` |
| `options.updateInterval?` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/raw-db.ts:1408](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L1408)

___

### deleteGloballyCachedRawDBSelect

▸ **deleteGloballyCachedRawDBSelect**(`uniqueID`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `uniqueID` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/raw-db.ts:1613](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L1613)

___

### executeGloballyCachedRawDBSelect

▸ **executeGloballyCachedRawDBSelect**(`uniqueID`): `Promise`<`void`\>

Executes a globally cached raw db select in order to keep it updated
in the cache

#### Parameters

| Name | Type |
| :------ | :------ |
| `uniqueID` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/raw-db.ts:1584](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L1584)

___

### handleIncomingMessage

▸ `Private` **handleIncomingMessage**(`channel`, `message`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `channel` | `string` |
| `message` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/raw-db.ts:1643](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L1643)

___

### informChangeOnRow

▸ `Private` **informChangeOnRow**(`row`, `action`, `elasticLanguageOverride`, `dataIsComplete`): `Promise`<{ `itemQualifiedPathName`: `any` = row.type; `lastModified`: `any` ; `moduleQualifiedPathName`: `string` = moduleName; `row`: [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)  }\>

Informs all the caches all the way to the clients of a change in a given
row

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `row` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | the row to inform a change on |
| `action` | ``"created"`` \| ``"modified"`` \| ``"deleted"`` | what happened to the row |
| `elasticLanguageOverride` | `string` | the elastic language override |
| `dataIsComplete` | `boolean` | whether the row contains complete data |

#### Returns

`Promise`<{ `itemQualifiedPathName`: `any` = row.type; `lastModified`: `any` ; `moduleQualifiedPathName`: `string` = moduleName; `row`: [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)  }\>

#### Defined in

[server/raw-db.ts:396](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L396)

___

### informChangeOnRowElastic

▸ `Private` **informChangeOnRowElastic**(`rowWithOlds`, `action`, `elasticLanguageOverride`, `dataIsComplete`, `hasBeenChecked`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `rowWithOlds` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |
| `action` | ``"created"`` \| ``"modified"`` \| ``"deleted"`` |
| `elasticLanguageOverride` | `string` |
| `dataIsComplete` | `boolean` |
| `hasBeenChecked` | `boolean` |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/raw-db.ts:291](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L291)

___

### informChangeOnRows

▸ `Private` **informChangeOnRows**(`rows`, `action`, `elasticLanguageOverride`, `rowDataIsComplete`): `Promise`<`void`\>

Actually does the job on informing changes in the rows
this function calls the changed mechanism and then does
the updates for all the searches that might be occuring inside
the clients that are related to those rows

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rows` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[] | the rows in question |
| `action` | ``"created"`` \| ``"modified"`` \| ``"deleted"`` | what happened to the rows |
| `elasticLanguageOverride` | `string` | - |
| `rowDataIsComplete` | `boolean` | whether the data is complete |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/raw-db.ts:493](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L493)

___

### informChangeOnRowsElasticOnly

▸ `Private` **informChangeOnRowsElasticOnly**(`rows`, `action`, `elasticLanguageOverride`, `rowDataIsComplete`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rows` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[] |
| `action` | ``"created"`` \| ``"modified"`` \| ``"deleted"`` |
| `elasticLanguageOverride` | `string` |
| `rowDataIsComplete` | `boolean` |

#### Returns

`void`

#### Defined in

[server/raw-db.ts:474](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L474)

___

### informRowsHaveBeenAdded

▸ **informRowsHaveBeenAdded**(`rows`, `elasticLanguageOverride?`, `rowDataIsComplete?`): `Promise`<`void`\>

Informs rows have been added in the database and as such all clients and instances
need to update its cache, this will affect all the way to each one of the singular clients
as it propagates database changes

Ensure each row that you pass provides at least the following data (otherwise it will fail)

id
version
type
created_by
parent_id
parent_type
parent_version
last_modified

If your data is complete (recommended) that is, both the module and the item table have been
joined, then the changes can be propagated more efficiently as the caches won't have to reach
for the database for the value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rows` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[] | the rows to inform a change on |
| `elasticLanguageOverride?` | `string` | the language override, null is a valid value, please provide undefined for unspecified |
| `rowDataIsComplete?` | `boolean` | whether the rows contain complete data |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/raw-db.ts:1092](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L1092)

___

### informRowsHaveBeenAddedElasticOnly

▸ **informRowsHaveBeenAddedElasticOnly**(`rows`, `elasticLanguageOverride?`, `rowDataIsComplete?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `rows` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[] |
| `elasticLanguageOverride?` | `string` |
| `rowDataIsComplete?` | `boolean` |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/raw-db.ts:1095](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L1095)

___

### informRowsHaveBeenDeleted

▸ **informRowsHaveBeenDeleted**(`rows`): `Promise`<`void`\>

Informs rows have been deleted in the database and as such all clients and instances
need to update its cache, this will affect all the way to each one of the singular clients
as it propagates database changes

This function will also add the deleted rows into the deleted registry

Ensure each row that you pass provides at least the following data (otherwise it will fail)

id
version
type
created_by
parent_id
parent_type
parent_version
last_modified

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rows` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[] | the rows to inform a change on |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/raw-db.ts:1057](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L1057)

___

### informRowsHaveBeenDeletedElasticOnly

▸ **informRowsHaveBeenDeletedElasticOnly**(`rows`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `rows` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[] |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/raw-db.ts:1062](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L1062)

___

### informRowsHaveBeenModified

▸ **informRowsHaveBeenModified**(`rows`, `elasticLanguageOverride?`, `rowDataIsComplete?`): `Promise`<`void`\>

Informs rows have changed in the database and as such all clients and instances
need to update its cache, this will affect all the way to each one of the singular clients
as it propagates database changes

Please make sure that you have updated the last_modified change in each one of the rows
you have modified before feeding them here otherwise while active clients will properly
update, inactive clients will fail to realize there has been a change once they ask
for the last modified signature

Ensure each row that you pass provides at least the following data (otherwise it will fail)

id
version
type
created_by
parent_id
parent_type
parent_version
last_modified

If your data is complete (recommended) that is, both the module and the item table have been
joined, then the changes can be propagated more efficiently as the caches won't have to reach
for the database for an updated value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rows` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[] | the rows to inform a change on |
| `elasticLanguageOverride?` | `string` | the language override, null is a valid value, please provide undefined for unspecified |
| `rowDataIsComplete?` | `boolean` | whether the rows contain complete data |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/raw-db.ts:1030](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L1030)

___

### informRowsHaveBeenModifiedElasticOnly

▸ **informRowsHaveBeenModifiedElasticOnly**(`rows`, `elasticLanguageOverride?`, `rowDataIsComplete?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `rows` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[] |
| `elasticLanguageOverride?` | `string` |
| `rowDataIsComplete?` | `boolean` |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/raw-db.ts:1033](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L1033)

___

### performBatchRawDBDelete

▸ **performBatchRawDBDelete**(`itemDefinitionOrModule`, `deleter`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinitionOrModule` | `string` \| [`default`](base_Root_Module.default.md) \| [`default`](base_Root_Module_ItemDefinition.default.md) |
| `deleter` | `Object` |
| `deleter.dangerousUseSilentMode?` | `boolean` |
| `deleter.preventJoin?` | `boolean` |
| `deleter.select` | (`builder`: [`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)) => `void` |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/raw-db.ts:1172](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L1172)

___

### performBatchRawDBUpdate

▸ **performBatchRawDBUpdate**(`item`, `updater`): `Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[]\>

Performs a raw db update for many rows
in the database this is a very powerful and quite
advanced method

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | `string` \| [`default`](base_Root_Module_ItemDefinition.default.md) |  |
| `updater` | `Object` |  |
| `updater.dangerousForceElasticLangUpdateTo?` | `string` | Forces a language update to the given language, will ignore silent mode if provided |
| `updater.dangerousForceElasticUpdate?` | `boolean` | Will update search indices anyway |
| `updater.dangerousUseSilentMode?` | `boolean` | Does not inform of updates or anything to the clusters or elastic or anything at all, does not modify the last modified signature |
| `updater.itemTableUpdate?` | [`IManyValueType`](../interfaces/database_base.IManyValueType.md) | - |
| `updater.moduleTableUpdate?` | [`IManyValueType`](../interfaces/database_base.IManyValueType.md) | - |
| `updater.itemTableUpdater?` | (`arg`: [`SetBuilder`](database_SetBuilder.SetBuilder.md), `redoDictionaries`: `RedoDictionariesFn`) => `void` | - |
| `updater.moduleTableUpdater?` | (`arg`: [`SetBuilder`](database_SetBuilder.SetBuilder.md), `redoDictionaries`: `RedoDictionariesFn`) => `void` | - |
| `updater.whereCriteriaSelector` | (`arg`: [`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)) => `void` | - |

#### Returns

`Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[]\>

#### Defined in

[server/raw-db.ts:1687](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L1687)

___

### performModuleBatchRawDBUpdate

▸ **performModuleBatchRawDBUpdate**(`moduleToUpdate`, `updater`): `Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[]\>

Performs a raw db update for many rows
in the database this is a very powerful and quite
advanced method

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `moduleToUpdate` | `string` \| [`default`](base_Root_Module.default.md) |  |
| `updater` | `Object` |  |
| `updater.dangerousForceElasticLangUpdateTo?` | `string` | Forces a language update to the given language, will ignore silent mode if provided |
| `updater.dangerousForceElasticUpdate?` | `boolean` | Will update search indices anyway |
| `updater.dangerousUseSilentMode?` | `boolean` | Does not inform of updates or anything to the clusters or elastic or anything at all, does not modify the last modified signature |
| `updater.moduleTableUpdate?` | [`IManyValueType`](../interfaces/database_base.IManyValueType.md) | - |
| `updater.moduleTableUpdater?` | (`arg`: [`SetBuilder`](database_SetBuilder.SetBuilder.md), `redoDictionaries`: `RedoDictionariesFnPropertyBased`) => `void` | - |
| `updater.whereCriteriaSelector` | (`arg`: [`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)) => `void` | - |

#### Returns

`Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[]\>

#### Defined in

[server/raw-db.ts:2114](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L2114)

___

### performRawDBDelete

▸ **performRawDBDelete**(`itemDefinitionOrModule`, `id`, `version`, `deleter`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinitionOrModule` | `string` \| [`default`](base_Root_Module.default.md) \| [`default`](base_Root_Module_ItemDefinition.default.md) |
| `id` | `string` |
| `version` | `string` |
| `deleter` | `Object` |
| `deleter.dangerousUseSilentMode?` | `boolean` |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/raw-db.ts:1158](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L1158)

___

### performRawDBInsert

▸ **performRawDBInsert**(`item`, `inserter`): `Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[]\>

Performs a raw db insert where the values of the database rows
are manually inserted value by value in a raw insert event

It is a rather advanced method to use as every row value to be inserted
has to be specified and it is easy to mess up

refer to processGQLValue in order to aid yourself a little when doing a raw db
insert

TODO returning builder access in order to modify what to return

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | `string` \| [`default`](base_Root_Module_ItemDefinition.default.md) |  |
| `inserter` | `Object` |  |
| `inserter.dangerousForceElasticLangUpdateTo?` | `string` | Forces a language update to the given language, will ignore silent mode if provided |
| `inserter.dangerousForceElasticUpdate?` | `boolean` | Will update search indices anyway |
| `inserter.dangerousUseSilentMode?` | `boolean` | Does not inform of updates or anything to the clusters or elastic or anything at all, does not modify the last modified signature |
| `inserter.values` | { `itemTableInsert`: [`IManyValueType`](../interfaces/database_base.IManyValueType.md) ; `moduleTableInsert`: [`IManyValueType`](../interfaces/database_base.IManyValueType.md)  }[] | - |

#### Returns

`Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[]\>

#### Defined in

[server/raw-db.ts:1202](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L1202)

___

### performRawDBSelect

▸ **performRawDBSelect**(`itemDefinitionOrModule`, `selecter`, `preventJoin?`): `Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[]\>

Provides a db query builder for the given item or a module

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemDefinitionOrModule` | `string` \| [`default`](base_Root_Module.default.md) \| [`default`](base_Root_Module_ItemDefinition.default.md) | the item or module |
| `selecter` | (`builder`: [`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)) => `void` | - |
| `preventJoin?` | `boolean` | when using an item, if you will not be using properties that are in the module table, like id, parents, creators, and prop extensions then you can prevent the join from happening |

#### Returns

`Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[]\>

#### Defined in

[server/raw-db.ts:1352](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L1352)

___

### performRawDBUpdate

▸ **performRawDBUpdate**(`item`, `id`, `version`, `updater`): `Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)\>

Performs a raw database update, use this method in order to update critical data that could
lead to race conditions, otherwise stay by updating through the cache

TODO returning builder access will affect tracked properties

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | `string` \| [`default`](base_Root_Module_ItemDefinition.default.md) |  |
| `id` | `string` |  |
| `version` | `string` |  |
| `updater` | `Object` |  |
| `updater.dangerousForceElasticLangUpdateTo?` | `string` | Forces a language update to the given language, will ignore silent mode if provided |
| `updater.dangerousForceElasticUpdate?` | `boolean` | Will update search indices anyway |
| `updater.dangerousUseSilentMode?` | `boolean` | Does not inform of updates or anything to the clusters or elastic or anything at all, does not modify the last modified signature |
| `updater.itemTableUpdate?` | [`IManyValueType`](../interfaces/database_base.IManyValueType.md) | - |
| `updater.moduleTableUpdate?` | [`IManyValueType`](../interfaces/database_base.IManyValueType.md) | - |
| `updater.itemTableUpdater?` | (`arg`: [`SetBuilder`](database_SetBuilder.SetBuilder.md), `redoDictionaries`: `RedoDictionariesFn`) => `void` | - |
| `updater.moduleTableUpdater?` | (`arg`: [`SetBuilder`](database_SetBuilder.SetBuilder.md), `redoDictionaries`: `RedoDictionariesFn`) => `void` | - |

#### Returns

`Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)\>

#### Defined in

[server/raw-db.ts:2314](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L2314)

___

### processGQLValue

▸ **processGQLValue**(`item`, `value`, `appData`, `dictionary`, `partialFields?`): `Object`

Will convert a graphql style value into a full row SQL value in order to execute many value
types functionality and directly insert values in a safer way

Note that this method is incapable of passing the required data for consuming stream which means
that if you set a value for a file and are working with files this will inevitably fail because
its incapable to access the storage provider and unable to consume streams

Raw writes on the database are after all dangerous

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | `string` \| [`default`](base_Root_Module_ItemDefinition.default.md) | the item definition that you want to convert a value for |
| `value` | `any` | the vale you want to convert |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) | - |
| `dictionary` | `string` | the dictionary to use |
| `partialFields?` | `any` | by default it will populate the entire row information that is necessary to fill each one of the required properties (not including the base) so with partial fields you can get partial values which are useful for updates, these are the same as graphql fields |

#### Returns

`Object`

an object which contains the total or partial values of the row to be inserted or updated

| Name | Type |
| :------ | :------ |
| `itemSQL` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |
| `modSQL` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |

#### Defined in

[server/raw-db.ts:183](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L183)

___

### provideHashableV5Id

▸ **provideHashableV5Id**(`input`): `string`

Provides a hashable v5 uuid that will ensure the same id
provided the same input

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` |

#### Returns

`string`

a url safe v5 uuid

#### Defined in

[server/raw-db.ts:158](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L158)

___

### provideRandomV4Id

▸ **provideRandomV4Id**(): `string`

When using raw db you might be able to specify your own ids
by using these so you know them ahead of time

It's a simple v4 uuid

#### Returns

`string`

a url safe v4 uuid

#### Defined in

[server/raw-db.ts:148](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L148)

___

### redoDictionariesFn

▸ `Private` **redoDictionariesFn**(`itemDefinitionOrModule`, `setBuilder`, `language`, `dictionary`, `propertyOrInclude`, `property`): `void`

A private helper function to use a item definition
and a set builder in order to update the dictionaries
of given properties

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinitionOrModule` | [`default`](base_Root_Module.default.md) \| [`default`](base_Root_Module_ItemDefinition.default.md) |
| `setBuilder` | [`SetBuilder`](database_SetBuilder.SetBuilder.md) |
| `language` | `string` |
| `dictionary` | `string` |
| `propertyOrInclude` | `string` |
| `property` | `string` |

#### Returns

`void`

#### Defined in

[server/raw-db.ts:1111](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L1111)

___

### retrieveGloballyCachedRawDBSelect

▸ **retrieveGloballyCachedRawDBSelect**(`uniqueID`, `options?`): `Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[]\>

Retrieves the raw db select that has been globally cached, given its unique id it will
provide the select results from that query

#### Parameters

| Name | Type |
| :------ | :------ |
| `uniqueID` | `string` |
| `options?` | `Object` |
| `options.returnNullOnError?` | `boolean` |

#### Returns

`Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[]\>

#### Defined in

[server/raw-db.ts:1545](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L1545)

___

### retrieveRawDBSelect

▸ **retrieveRawDBSelect**(`itemDefinitionOrModule`, `selecter`, `preventJoin?`): [`string`, [`BasicBindingType`](../modules/database_base.md#basicbindingtype)[]]

Retrieves a raw db select query in order to be used to assign values in updates

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinitionOrModule` | `string` \| [`default`](base_Root_Module.default.md) \| [`default`](base_Root_Module_ItemDefinition.default.md) |
| `selecter` | (`builder`: [`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)) => `void` |
| `preventJoin?` | `boolean` |

#### Returns

[`string`, [`BasicBindingType`](../modules/database_base.md#basicbindingtype)[]]

#### Defined in

[server/raw-db.ts:1369](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L1369)

___

### setupElastic

▸ **setupElastic**(`elastic`): `void`

the elastic instance depends on raw db and raw db depends on the
elastic instance, as such elastic adds itself in here when initialized

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `elastic` | [`ItemizeElasticClient`](server_elastic.ItemizeElasticClient.md) | the elastic instance |

#### Returns

`void`

#### Defined in

[server/raw-db.ts:120](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L120)

___

### startTransaction

▸ **startTransaction**<`T`\>(`fn`): `Promise`<`T`\>

Starts a new instance of raw db but in transaction mode

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | (`transactingRawDB`: [`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md)) => `Promise`<`T`\> | the transactional function |

#### Returns

`Promise`<`T`\>

whatever is returned in the transactional function

#### Defined in

[server/raw-db.ts:129](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L129)

___

### storeInDeleteRegistry

▸ `Private` **storeInDeleteRegistry**(`row`, `moduleName`, `trackedProperties`): `Promise`<`string`\>

Takes a row and stores it in the deleted registry

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `row` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | the row to store |
| `moduleName` | `string` | the module that it belongs to (based on the type) |
| `trackedProperties` | `string`[] | - |

#### Returns

`Promise`<`string`\>

the transaction time

#### Defined in

[server/raw-db.ts:232](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L232)

___

### updateTrackers

▸ `Private` **updateTrackers**(`transactingDb`, `results`, `potentialAffectedTrackedProperties`, `moduleTable`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactingDb` | [`DatabaseConnection`](database.DatabaseConnection.md) |
| `results` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[] |
| `potentialAffectedTrackedProperties` | `string`[] |
| `moduleTable` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/raw-db.ts:1970](https://github.com/onzag/itemize/blob/f2db74a5/server/raw-db.ts#L1970)
