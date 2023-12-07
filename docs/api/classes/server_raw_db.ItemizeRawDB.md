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
- [eventQueue](server_raw_db.ItemizeRawDB.md#eventqueue)
- [fakeListener](server_raw_db.ItemizeRawDB.md#fakelistener)
- [memCachedSelects](server_raw_db.ItemizeRawDB.md#memcachedselects)
- [redisGlobal](server_raw_db.ItemizeRawDB.md#redisglobal)
- [redisPub](server_raw_db.ItemizeRawDB.md#redispub)
- [redisSub](server_raw_db.ItemizeRawDB.md#redissub)
- [root](server_raw_db.ItemizeRawDB.md#root)
- [singleClientMode](server_raw_db.ItemizeRawDB.md#singleclientmode)
- [transacting](server_raw_db.ItemizeRawDB.md#transacting)

### Methods

- [\_retrieveRawDBSelect](server_raw_db.ItemizeRawDB.md#_retrieverawdbselect)
- [\_retrieveRawDBSelectSimple](server_raw_db.ItemizeRawDB.md#_retrieverawdbselectsimple)
- [\_updateCachedSelect](server_raw_db.ItemizeRawDB.md#_updatecachedselect)
- [changeRowLanguageFn](server_raw_db.ItemizeRawDB.md#changerowlanguagefn)
- [checkRowValidityForInformingChanges](server_raw_db.ItemizeRawDB.md#checkrowvalidityforinformingchanges)
- [closeRawDBCursor](server_raw_db.ItemizeRawDB.md#closerawdbcursor)
- [completeRowData](server_raw_db.ItemizeRawDB.md#completerowdata)
- [consumeEventQueue](server_raw_db.ItemizeRawDB.md#consumeeventqueue)
- [createGloballyCachedRawDBSelect](server_raw_db.ItemizeRawDB.md#creategloballycachedrawdbselect)
- [declareRawDBCursorSelect](server_raw_db.ItemizeRawDB.md#declarerawdbcursorselect)
- [deleteGloballyCachedRawDBSelect](server_raw_db.ItemizeRawDB.md#deletegloballycachedrawdbselect)
- [executeGloballyCachedRawDBSelect](server_raw_db.ItemizeRawDB.md#executegloballycachedrawdbselect)
- [fetchFromRawDBCursor](server_raw_db.ItemizeRawDB.md#fetchfromrawdbcursor)
- [handleIncomingMessage](server_raw_db.ItemizeRawDB.md#handleincomingmessage)
- [hookInto](server_raw_db.ItemizeRawDB.md#hookinto)
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
- [moveFromRawDBCursor](server_raw_db.ItemizeRawDB.md#movefromrawdbcursor)
- [performBatchRawDBDelete](server_raw_db.ItemizeRawDB.md#performbatchrawdbdelete)
- [performBatchRawDBUpdate](server_raw_db.ItemizeRawDB.md#performbatchrawdbupdate)
- [performModuleBatchRawDBUpdate](server_raw_db.ItemizeRawDB.md#performmodulebatchrawdbupdate)
- [performRawDBCursorSelect](server_raw_db.ItemizeRawDB.md#performrawdbcursorselect)
- [performRawDBDelete](server_raw_db.ItemizeRawDB.md#performrawdbdelete)
- [performRawDBInsert](server_raw_db.ItemizeRawDB.md#performrawdbinsert)
- [performRawDBSelect](server_raw_db.ItemizeRawDB.md#performrawdbselect)
- [performRawDBSelectAgainstDeletedRegistry](server_raw_db.ItemizeRawDB.md#performrawdbselectagainstdeletedregistry)
- [performRawDBUpdate](server_raw_db.ItemizeRawDB.md#performrawdbupdate)
- [processGQLValue](server_raw_db.ItemizeRawDB.md#processgqlvalue)
- [provideHashableV5Id](server_raw_db.ItemizeRawDB.md#providehashablev5id)
- [provideRandomV4Id](server_raw_db.ItemizeRawDB.md#providerandomv4id)
- [retrieveGloballyCachedRawDBSelect](server_raw_db.ItemizeRawDB.md#retrievegloballycachedrawdbselect)
- [retrieveRawDBSelect](server_raw_db.ItemizeRawDB.md#retrieverawdbselect)
- [setupElastic](server_raw_db.ItemizeRawDB.md#setupelastic)
- [startSingleClientOperation](server_raw_db.ItemizeRawDB.md#startsingleclientoperation)
- [startTransaction](server_raw_db.ItemizeRawDB.md#starttransaction)
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

[server/raw-db.ts:124](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L124)

## Properties

### cachedSelects

• `Private` **cachedSelects**: `Object` = `{}`

#### Index signature

▪ [prefixedUniqueID: `string`]: { `expiresAt`: `number` ; `intervalObject`: `NodeJS.Timer` ; `itemDefinitionOrModule`: [`default`](base_Root_Module_ItemDefinition.default.md) \| [`default`](base_Root_Module.default.md) \| `string` ; `preventJoin`: `boolean` ; `uniqueID`: `string` ; `updateInterval`: `number` ; `selecter`: (`builder`: [`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)) => `void`  }

#### Defined in

[server/raw-db.ts:95](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L95)

___

### databaseConnection

• **databaseConnection**: [`DatabaseConnection`](database.DatabaseConnection.md)

#### Defined in

[server/raw-db.ts:116](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L116)

___

### elastic

• `Private` **elastic**: [`ItemizeElasticClient`](server_elastic.ItemizeElasticClient.md)

#### Defined in

[server/raw-db.ts:89](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L89)

___

### eventQueue

• `Private` **eventQueue**: `Function`[] = `[]`

#### Defined in

[server/raw-db.ts:93](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L93)

___

### fakeListener

• `Private` **fakeListener**: [`Listener`](server_listener.Listener.md)

#### Defined in

[server/raw-db.ts:86](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L86)

___

### memCachedSelects

• `Private` **memCachedSelects**: `Object` = `{}`

#### Index signature

▪ [uniqueID: `string`]: { `err?`: `Error` ; `ready`: `boolean` ; `value`: [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[] ; `waitingPromise`: `Promise`<`void`\>  }

#### Defined in

[server/raw-db.ts:107](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L107)

___

### redisGlobal

• `Private` **redisGlobal**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Defined in

[server/raw-db.ts:84](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L84)

___

### redisPub

• `Private` **redisPub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Defined in

[server/raw-db.ts:82](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L82)

___

### redisSub

• `Private` **redisSub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Defined in

[server/raw-db.ts:83](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L83)

___

### root

• `Private` **root**: [`default`](base_Root.default.md)

#### Defined in

[server/raw-db.ts:88](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L88)

___

### singleClientMode

• `Private` **singleClientMode**: `boolean`

#### Defined in

[server/raw-db.ts:92](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L92)

___

### transacting

• `Private` **transacting**: `boolean`

#### Defined in

[server/raw-db.ts:91](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L91)

## Methods

### \_retrieveRawDBSelect

▸ `Private` **_retrieveRawDBSelect**(`itemDefinitionOrModule`, `selecter`, `options?`): [`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinitionOrModule` | `string` \| [`default`](base_Root_Module.default.md) \| [`default`](base_Root_Module_ItemDefinition.default.md) |
| `selecter` | (`builder`: [`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)) => `void` |
| `options` | `Object` |
| `options.preventJoin?` | `boolean` |

#### Returns

[`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)

#### Defined in

[server/raw-db.ts:1986](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L1986)

___

### \_retrieveRawDBSelectSimple

▸ `Private` **_retrieveRawDBSelectSimple**(`table`, `selecter`): [`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `table` | `string` |
| `selecter` | (`builder`: [`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)) => `void` |

#### Returns

[`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)

#### Defined in

[server/raw-db.ts:2027](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L2027)

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

[server/raw-db.ts:2454](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L2454)

___

### changeRowLanguageFn

▸ `Private` **changeRowLanguageFn**(`itemDefinitionOrModule`, `setBuilder`, `language`, `dictionary`, `propertyOrInclude`, `property`): `void`

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

[server/raw-db.ts:1399](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L1399)

___

### checkRowValidityForInformingChanges

▸ `Private` **checkRowValidityForInformingChanges**(`row`, `idef`, `doNotCheckTracked?`): `Promise`<`boolean`\>

Takes a row and stores it in the deleted registry

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `row` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | the row to store |
| `idef` | [`default`](base_Root_Module_ItemDefinition.default.md) | - |
| `doNotCheckTracked?` | `boolean` | - |

#### Returns

`Promise`<`boolean`\>

the transaction time

#### Defined in

[server/raw-db.ts:491](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L491)

___

### closeRawDBCursor

▸ **closeRawDBCursor**(`cursorName`): `Promise`<`QueryResult`<`any`\>\>

Removes a given cursor

#### Parameters

| Name | Type |
| :------ | :------ |
| `cursorName` | `string` |

#### Returns

`Promise`<`QueryResult`<`any`\>\>

#### Defined in

[server/raw-db.ts:2135](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L2135)

___

### completeRowData

▸ **completeRowData**(`rows`): `Promise`<[[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[], `boolean`]\>

Given incomplete row data this function will complete the row data (if possible)
and return completed array, note that this will likely be out of the order given
as the order in and out is not guaranteed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rows` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[] | the rows, they should all have at least, id, version and type defined |

#### Returns

`Promise`<[[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[], `boolean`]\>

the entire row data

#### Defined in

[server/raw-db.ts:362](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L362)

___

### consumeEventQueue

▸ **consumeEventQueue**(`options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.ensureOrder?` | `boolean` |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/raw-db.ts:172](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L172)

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

[server/raw-db.ts:2372](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L2372)

___

### declareRawDBCursorSelect

▸ **declareRawDBCursorSelect**(`itemDefinitionOrModule`, `cursorName`, `selecter`, `options?`): `Promise`<`QueryResult`<`any`\>\>

Declares a new cursor agains a select statment and does nothing about it

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinitionOrModule` | `string` \| [`default`](base_Root_Module.default.md) \| [`default`](base_Root_Module_ItemDefinition.default.md) |
| `cursorName` | `string` |
| `selecter` | (`builder`: [`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)) => `void` |
| `options` | `Object` |
| `options.noScroll?` | `boolean` |
| `options.preventJoin?` | `boolean` |
| `options.withHold?` | `boolean` |

#### Returns

`Promise`<`QueryResult`<`any`\>\>

#### Defined in

[server/raw-db.ts:2045](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L2045)

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

[server/raw-db.ts:2579](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L2579)

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

[server/raw-db.ts:2550](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L2550)

___

### fetchFromRawDBCursor

▸ **fetchFromRawDBCursor**(`cursorName`, `fetcher`): `Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[]\>

Fetches from a cursor that was already declared

#### Parameters

| Name | Type |
| :------ | :------ |
| `cursorName` | `string` |
| `fetcher` | (`builder`: [`FetchOrMoveFromCursorBuilder`](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md)) => `void` |

#### Returns

`Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[]\>

#### Defined in

[server/raw-db.ts:2106](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L2106)

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

[server/raw-db.ts:2609](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L2609)

___

### hookInto

▸ **hookInto**(`connection`, `options?`): [`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md)

Hooks into an existing database connection to give it raw db capabilities

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `connection` | [`DatabaseConnection`](database.DatabaseConnection.md) | the connection in question |
| `options` | `Object` | the options given |
| `options.singleClient?` | `boolean` | - |
| `options.transacting?` | `boolean` | if transacting please make sure to consume the events yourself by calling consumeTransactingEventQueue once the changes have been commited |

#### Returns

[`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md)

a new instance of raw db

#### Defined in

[server/raw-db.ts:209](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L209)

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

[server/raw-db.ts:645](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L645)

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

[server/raw-db.ts:518](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L518)

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

[server/raw-db.ts:771](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L771)

___

### informChangeOnRowsElasticOnly

▸ `Private` **informChangeOnRowsElasticOnly**(`rows`, `action`, `elasticLanguageOverride`, `rowDataIsComplete`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `rows` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[] |
| `action` | ``"created"`` \| ``"modified"`` \| ``"deleted"`` |
| `elasticLanguageOverride` | `string` |
| `rowDataIsComplete` | `boolean` |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/raw-db.ts:733](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L733)

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

[server/raw-db.ts:1380](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L1380)

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

[server/raw-db.ts:1383](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L1383)

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

[server/raw-db.ts:1345](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L1345)

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

[server/raw-db.ts:1350](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L1350)

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

[server/raw-db.ts:1318](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L1318)

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

[server/raw-db.ts:1321](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L1321)

___

### moveFromRawDBCursor

▸ **moveFromRawDBCursor**(`cursorName`, `mover`): `Promise`<`QueryResult`<`any`\>\>

Moves from a cursor that was already declared

#### Parameters

| Name | Type |
| :------ | :------ |
| `cursorName` | `string` |
| `mover` | (`builder`: [`FetchOrMoveFromCursorBuilder`](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md)) => `void` |

#### Returns

`Promise`<`QueryResult`<`any`\>\>

#### Defined in

[server/raw-db.ts:2121](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L2121)

___

### performBatchRawDBDelete

▸ **performBatchRawDBDelete**(`itemDefinitionOrModule`, `where`, `deleteFiles?`, `deleter?`): `Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinitionOrModule` | `string` \| [`default`](base_Root_Module.default.md) \| [`default`](base_Root_Module_ItemDefinition.default.md) |
| `where` | (`builder`: [`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)) => `void` |
| `deleteFiles?` | ``false`` \| { `domain`: `string` ; `storage`: [`IStorageProvidersObject`](../interfaces/server_services_base_StorageProvider.IStorageProvidersObject.md)  } |
| `deleter` | `Object` |
| `deleter.dangerousUseSilentMode?` | `boolean` |
| `deleter.returningAll?` | `boolean` |
| `deleter.useJoinedReturn?` | `boolean` |
| `deleter.useJoinedWhere?` | `boolean` |

#### Returns

`Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[]\>

#### Defined in

[server/raw-db.ts:1475](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L1475)

___

### performBatchRawDBUpdate

▸ **performBatchRawDBUpdate**(`item`, `updater`): `Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[]\>

Performs a raw db update for many rows
in the database this is a very powerful and quite
advanced method

Updating tracked properties will result in slower speeds for the query
try to avoid updating tracked properties using a raw db query

NOTE: A raw db update is unable to update the pointers properly as it will
only update the pointer in the given side while ignoring the pointers
of the other side, normally the raw db update will refuse to update pointers
(that is able to detect) unless dangerousForceUpdatePointers is specified

NOTE a raw db update is unable to trigger side effects

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | `string` \| [`default`](base_Root_Module_ItemDefinition.default.md) |  |
| `updater` | `Object` |  |
| `updater.dangerousForceElasticLangUpdateTo?` | `string` | Forces a language update to the given language, will ignore silent mode if provided |
| `updater.dangerousForceElasticUpdate?` | `boolean` | Will update search indices anyway |
| `updater.dangerousForceUpdatePointers?` | `boolean` | Update pointers columns anyway  A raw db update is unable to update the pointers properly as it will only update the pointer in the given side while ignoring the pointers of the other side, normally the raw db update will refuse to update pointers (that is able to detect) unless dangerousForceUpdatePointers is specified |
| `updater.dangerousUseSilentMode?` | `boolean` | Does not inform of updates or anything to the clusters or elastic or anything at all, does not modify the last modified signature |
| `updater.itemTableUpdate?` | [`IManyValueType`](../interfaces/database_base.IManyValueType.md) | - |
| `updater.moduleTableUpdate?` | [`IManyValueType`](../interfaces/database_base.IManyValueType.md) | - |
| `updater.returnOldColumnsFor?` | `string`[] | List of properties to return old columns for, give the property names and the old values for such properties will be returned note that there's quite a big overhead for such query |
| `updater.itemTableUpdater?` | (`arg`: [`SetBuilder`](database_SetBuilder.SetBuilder.md), `changeRowLanguage`: `changeRowLanguageFn`) => `void` | - |
| `updater.moduleTableUpdater?` | (`arg`: [`SetBuilder`](database_SetBuilder.SetBuilder.md), `changeRowLanguage`: `changeRowLanguageFn`) => `void` | - |
| `updater.whereCriteriaSelector` | (`arg`: [`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)) => `void` | - |

#### Returns

`Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[]\>

#### Defined in

[server/raw-db.ts:2663](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L2663)

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
| `updater.dangerousSplitIntoItemUpdatesIfTrackedPropertiesPresent?` | `boolean` | When tracked properties are present a module based update isnt possible, however by using this you may split the update into several sub-updates that are item based  A transaction will not be used, changes will be commited instantly |
| `updater.dangerousUseSilentMode?` | `boolean` | Does not inform of updates or anything to the clusters or elastic or anything at all, does not modify the last modified signature |
| `updater.moduleTableUpdate?` | [`IManyValueType`](../interfaces/database_base.IManyValueType.md) | - |
| `updater.moduleTableUpdater?` | (`arg`: [`SetBuilder`](database_SetBuilder.SetBuilder.md), `changeRowLanguage`: `changeRowLanguageFnPropertyBased`) => `void` | - |
| `updater.whereCriteriaSelector` | (`arg`: [`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)) => `void` | - |

#### Returns

`Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[]\>

#### Defined in

[server/raw-db.ts:3206](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L3206)

___

### performRawDBCursorSelect

▸ **performRawDBCursorSelect**(`itemDefinitionOrModule`, `selecter`, `options?`): `AsyncGenerator`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[], `void`, `boolean`\>

This generator peforms a cursos based raw db select
executing a select function batch by batch with a given
batch size that defaults to 100 until all records of the
select are consumed

Whenever retrieving the next value you can provide a boolean
on whether the process should continue or it should stop, you should always ensure
that either the entire rows are consumed or if you need to abruptly stop
the processing to pass false to the next iterator because otherwise
the cursor will remain in the database hogging memory

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinitionOrModule` | `string` \| [`default`](base_Root_Module.default.md) \| [`default`](base_Root_Module_ItemDefinition.default.md) |
| `selecter` | (`builder`: [`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)) => `void` |
| `options` | `Object` |
| `options.batchSize?` | `number` |
| `options.preventJoin?` | `boolean` |
| `options.withHold?` | `boolean` |

#### Returns

`AsyncGenerator`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[], `void`, `boolean`\>

#### Defined in

[server/raw-db.ts:2155](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L2155)

___

### performRawDBDelete

▸ **performRawDBDelete**(`itemDefinitionOrModule`, `id`, `version`, `deleteFiles?`, `deleter?`): `Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinitionOrModule` | `string` \| [`default`](base_Root_Module.default.md) \| [`default`](base_Root_Module_ItemDefinition.default.md) |
| `id` | `string` |
| `version` | `string` |
| `deleteFiles?` | ``false`` \| { `domain`: `string` ; `storage`: [`IStorageProvidersObject`](../interfaces/server_services_base_StorageProvider.IStorageProvidersObject.md)  } |
| `deleter` | `Object` |
| `deleter.dangerousUseSilentMode?` | `boolean` |
| `deleter.returnAll?` | `boolean` |
| `deleter.useJoinedReturn?` | `boolean` |
| `deleter.useJoinedWhere?` | `boolean` |
| `deleter.where?` | (`builder`: [`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)) => `void` |

#### Returns

`Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[]\>

#### Defined in

[server/raw-db.ts:1446](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L1446)

___

### performRawDBInsert

▸ **performRawDBInsert**(`item`, `inserter`): `Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[]\>

Performs a raw db insert where the values of the database rows
are manually inserted value by value in a raw insert event

It is a rather advanced method to use as every row value to be inserted
has to be specified and it is easy to mess up

refer to processGQLValue in order to aid yourself a little when doing a raw db
insert

NOTE a raw db insert is unable to trigger side effects

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

[server/raw-db.ts:1878](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L1878)

___

### performRawDBSelect

▸ **performRawDBSelect**(`itemDefinitionOrModule`, `selecter`, `options?`): `Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[]\>

Provides a db query builder for the given item or a module

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemDefinitionOrModule` | `string` \| [`default`](base_Root_Module.default.md) \| [`default`](base_Root_Module_ItemDefinition.default.md) | the item or module |
| `selecter` | (`builder`: [`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)) => `void` | - |
| `options` | `Object` | - |
| `options.preventJoin?` | `boolean` | - |
| `options.useMemoryCache?` | `string` | - |
| `options.useMemoryCacheMs?` | `number` | - |

#### Returns

`Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[]\>

#### Defined in

[server/raw-db.ts:2255](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L2255)

___

### performRawDBSelectAgainstDeletedRegistry

▸ **performRawDBSelectAgainstDeletedRegistry**(`selecter`): `Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `selecter` | (`builder`: [`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)) => `void` |

#### Returns

`Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[]\>

#### Defined in

[server/raw-db.ts:2240](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L2240)

___

### performRawDBUpdate

▸ **performRawDBUpdate**(`item`, `id`, `version`, `updater`): `Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)\>

Performs a raw database update, use this method in order to update critical data that could
lead to race conditions, otherwise stay by updating through the cache

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
| `updater.itemTableUpdater?` | (`arg`: [`SetBuilder`](database_SetBuilder.SetBuilder.md), `changeRowLanguage`: `changeRowLanguageFn`) => `void` | - |
| `updater.moduleTableUpdater?` | (`arg`: [`SetBuilder`](database_SetBuilder.SetBuilder.md), `changeRowLanguage`: `changeRowLanguageFn`) => `void` | - |

#### Returns

`Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)\>

#### Defined in

[server/raw-db.ts:3435](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L3435)

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

[server/raw-db.ts:311](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L311)

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

[server/raw-db.ts:286](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L286)

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

[server/raw-db.ts:276](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L276)

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

[server/raw-db.ts:2511](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L2511)

___

### retrieveRawDBSelect

▸ **retrieveRawDBSelect**(`itemDefinitionOrModule`, `selecter`, `options?`): [`string`, [`BasicBindingType`](../modules/database_base.md#basicbindingtype)[]]

Retrieves a raw db select query in order to be used to assign values in updates

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinitionOrModule` | `string` \| [`default`](base_Root_Module.default.md) \| [`default`](base_Root_Module_ItemDefinition.default.md) |
| `selecter` | (`builder`: [`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)) => `void` |
| `options` | `Object` |
| `options.preventJoin?` | `boolean` |

#### Returns

[`string`, [`BasicBindingType`](../modules/database_base.md#basicbindingtype)[]]

#### Defined in

[server/raw-db.ts:2331](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L2331)

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

[server/raw-db.ts:168](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L168)

___

### startSingleClientOperation

▸ **startSingleClientOperation**<`T`\>(`fn`, `opts?`): `Promise`<`T`\>

Starts a new instance of raw db but for a single client
operation, it's useful for cursors and in fact itemize
will reject cursors not started in transactions

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | (`transactingRawDB`: [`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md)) => `Promise`<`T`\> | the transactional function |
| `opts` | `Object` | - |
| `opts.ensureEventConsumptionOrder?` | `boolean` | - |

#### Returns

`Promise`<`T`\>

whatever is returned in the transactional function

#### Defined in

[server/raw-db.ts:252](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L252)

___

### startTransaction

▸ **startTransaction**<`T`\>(`fn`, `opts?`): `Promise`<`T`\>

Starts a new instance of raw db but in transaction mode

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | (`transactingRawDB`: [`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md)) => `Promise`<`T`\> | the transactional function |
| `opts` | `Object` | - |
| `opts.ensureEventConsumptionOrder?` | `boolean` | - |

#### Returns

`Promise`<`T`\>

whatever is returned in the transactional function

#### Defined in

[server/raw-db.ts:228](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L228)

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

[server/raw-db.ts:3036](https://github.com/onzag/itemize/blob/a24376ed/server/raw-db.ts#L3036)
