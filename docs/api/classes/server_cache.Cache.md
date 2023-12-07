[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/cache](../modules/server_cache.md) / Cache

# Class: Cache

[server/cache](../modules/server_cache.md).Cache

The cache class that provides all the functionality that is
specified for the cache package, the cache is more than what
it name implies because it contains redis and it's the same in
all the servers

## Table of contents

### Constructors

- [constructor](server_cache.Cache.md#constructor)

### Properties

- [appData](server_cache.Cache.md#appdata)
- [currentlySetting](server_cache.Cache.md#currentlysetting)
- [databaseConnection](server_cache.Cache.md#databaseconnection)
- [domain](server_cache.Cache.md#domain)
- [elastic](server_cache.Cache.md#elastic)
- [listener](server_cache.Cache.md#listener)
- [memoryCache](server_cache.Cache.md#memorycache)
- [redisClient](server_cache.Cache.md#redisclient)
- [root](server_cache.Cache.md#root)
- [sensitiveConfig](server_cache.Cache.md#sensitiveconfig)
- [serverData](server_cache.Cache.md#serverdata)
- [storageClients](server_cache.Cache.md#storageclients)

### Methods

- [deletePossibleChildrenOf](server_cache.Cache.md#deletepossiblechildrenof)
- [forceCacheInto](server_cache.Cache.md#forcecacheinto)
- [getRaw](server_cache.Cache.md#getraw)
- [getServerData](server_cache.Cache.md#getserverdata)
- [onChangeInformed](server_cache.Cache.md#onchangeinformed)
- [onChangeInformedNoData](server_cache.Cache.md#onchangeinformednodata)
- [onServerDataChangeInformed](server_cache.Cache.md#onserverdatachangeinformed)
- [pokeCache](server_cache.Cache.md#pokecache)
- [requestCopy](server_cache.Cache.md#requestcopy)
- [requestCreation](server_cache.Cache.md#requestcreation)
- [requestDelete](server_cache.Cache.md#requestdelete)
- [requestListCache](server_cache.Cache.md#requestlistcache)
- [requestToken](server_cache.Cache.md#requesttoken)
- [requestUpdate](server_cache.Cache.md#requestupdate)
- [requestValue](server_cache.Cache.md#requestvalue)
- [setAppData](server_cache.Cache.md#setappdata)
- [setListener](server_cache.Cache.md#setlistener)
- [setRaw](server_cache.Cache.md#setraw)
- [triggerSearchListenersFor](server_cache.Cache.md#triggersearchlistenersfor)
- [updatePointerMap](server_cache.Cache.md#updatepointermap)
- [wipe](server_cache.Cache.md#wipe)

## Constructors

### constructor

• **new Cache**(`redisClient`, `databaseConnection`, `elastic`, `sensitiveConfig`, `storageClients`, `domain`, `root`, `initialServerData`)

Builds a new cache instance, before the cache is ready
it needs to be able to access the listener as well, but due
to the fact that the listener depends on the cache as well
it is instantiaded by te listener at the same time

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `redisClient` | [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md) | the redis client that is used for storing values |
| `databaseConnection` | [`DatabaseConnection`](database.DatabaseConnection.md) | - |
| `elastic` | [`ItemizeElasticClient`](server_elastic.ItemizeElasticClient.md) | - |
| `sensitiveConfig` | [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md) | - |
| `storageClients` | [`IStorageProvidersObject`](../interfaces/server_services_base_StorageProvider.IStorageProvidersObject.md) | - |
| `domain` | `string` | - |
| `root` | [`default`](base_Root.default.md) | the root of itemize |
| `initialServerData` | [`IServerDataType`](../interfaces/server.IServerDataType.md) | - |

#### Defined in

[server/cache.ts:217](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L217)

## Properties

### appData

• `Private` **appData**: [`IAppDataType`](../interfaces/server.IAppDataType.md)

#### Defined in

[server/cache.ts:199](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L199)

___

### currentlySetting

• `Private` **currentlySetting**: `Object` = `{}`

#### Index signature

▪ [id: `string`]: { `replacement`: `any` ; `valueBeingSet`: `any`  }

#### Defined in

[server/cache.ts:200](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L200)

___

### databaseConnection

• `Private` **databaseConnection**: [`DatabaseConnection`](database.DatabaseConnection.md)

#### Defined in

[server/cache.ts:186](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L186)

___

### domain

• `Private` **domain**: `string`

#### Defined in

[server/cache.ts:188](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L188)

___

### elastic

• `Private` **elastic**: [`ItemizeElasticClient`](server_elastic.ItemizeElasticClient.md)

#### Defined in

[server/cache.ts:187](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L187)

___

### listener

• `Private` **listener**: [`Listener`](server_listener.Listener.md)

#### Defined in

[server/cache.ts:192](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L192)

___

### memoryCache

• `Private` **memoryCache**: `Object` = `{}`

#### Index signature

▪ [key: `string`]: { `value`: [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)  }

#### Defined in

[server/cache.ts:194](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L194)

___

### redisClient

• `Private` **redisClient**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Defined in

[server/cache.ts:185](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L185)

___

### root

• `Private` **root**: [`default`](base_Root.default.md)

#### Defined in

[server/cache.ts:190](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L190)

___

### sensitiveConfig

• `Private` **sensitiveConfig**: [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md)

#### Defined in

[server/cache.ts:193](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L193)

___

### serverData

• `Private` **serverData**: [`IServerDataType`](../interfaces/server.IServerDataType.md)

#### Defined in

[server/cache.ts:191](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L191)

___

### storageClients

• `Private` **storageClients**: [`IStorageProvidersObject`](../interfaces/server_services_base_StorageProvider.IStorageProvidersObject.md)

#### Defined in

[server/cache.ts:189](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L189)

## Methods

### deletePossibleChildrenOf

▸ **deletePossibleChildrenOf**(`itemDefinition`, `id`, `version`): `Promise`<`void`\>

Deletes all the possible children that might have been set as parent of the deleted
item definition value

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinition` | [`default`](base_Root_Module_ItemDefinition.default.md) |
| `id` | `string` |
| `version` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/cache.ts:2447](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L2447)

___

### forceCacheInto

▸ `Private` **forceCacheInto**(`idefTable`, `id`, `version`, `value`, `ensure`): `Promise`<`void`\>

forces a cached value for a given item definition table in an id and version

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `idefTable` | `string` | the item definition table or its qualified name |
| `id` | `string` | the id |
| `version` | `string` | the version or null |
| `value` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | the value to store |
| `ensure` | `boolean` | if true does not trust the value right away and checks it against the current value last modified signature and will only set it if it's older (newer) |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/cache.ts:385](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L385)

___

### getRaw

▸ **getRaw**<`T`\>(`key`): `Promise`<{ `value`: `T`  }\>

Provides a cached value from its identifier

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | the identifier |

#### Returns

`Promise`<{ `value`: `T`  }\>

a promise with the value

#### Defined in

[server/cache.ts:256](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L256)

___

### getServerData

▸ **getServerData**(): [`IServerDataType`](../interfaces/server.IServerDataType.md)

Provides the current server data

#### Returns

[`IServerDataType`](../interfaces/server.IServerDataType.md)

#### Defined in

[server/cache.ts:3318](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L3318)

___

### onChangeInformed

▸ **onChangeInformed**(`itemDefinition`, `id`, `version`, `data?`): `Promise`<`void`\>

This function triggers once the remote listener has detected a change that has been done by
another server instance to a value that we are supposedly currently holding in memory

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemDefinition` | `string` | the item definition qualified name |
| `id` | `string` | the id of such |
| `version` | `string` | the version or null |
| `data?` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | the entire SQL result |

#### Returns

`Promise`<`void`\>

a void promise when done

#### Defined in

[server/cache.ts:3347](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L3347)

___

### onChangeInformedNoData

▸ **onChangeInformedNoData**(`itemDefinition`, `id`, `version`): `Promise`<`void`\>

When a change has been informed from the cluster that other cluster has made
but it provides no data about what has changed and it needs to be
manually fetched

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinition` | `string` |
| `id` | `string` |
| `version` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/cache.ts:3416](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L3416)

___

### onServerDataChangeInformed

▸ **onServerDataChangeInformed**(`newData`): `void`

This function is called once new server data was informed by a redis event

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newData` | [`IServerDataType`](../interfaces/server.IServerDataType.md) | the new server data that redis is giving |

#### Returns

`void`

#### Defined in

[server/cache.ts:3326](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L3326)

___

### pokeCache

▸ `Private` **pokeCache**(`keyIdentifier`): `Promise`<`void`\>

Resets the expiration clock of a given identifier

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keyIdentifier` | `string` | the identifier |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/cache.ts:354](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L354)

___

### requestCopy

▸ **requestCopy**(`item`, `id`, `version`, `options?`): `Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)\>

Given an item that needs to be copied it will create a new copy for it
with all its files and everything

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | `string` \| [`default`](base_Root_Module_ItemDefinition.default.md) | the item to copy from |
| `id` | `string` | the id to copy from |
| `version` | `string` | the version to copy from |
| `options` | [`ICopyOptions`](../interfaces/server_cache.ICopyOptions.md) | some options for side effects as this calls the request creation function |

#### Returns

`Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)\>

#### Defined in

[server/cache.ts:1510](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L1510)

___

### requestCreation

▸ **requestCreation**(`itemDefinition`, `value`, `options`): `Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)\>

Request the creation of a new item definition value for an specific item definition

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemDefinition` | [`default`](base_Root_Module_ItemDefinition.default.md) | the item definition we refer to |
| `value` | [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md) \| [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) \| [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) | the value to create, the value can be partial |
| `options` | [`ICreationOptions`](../interfaces/server_cache.ICreationOptions.md) | options as to create, some options are required |

#### Returns

`Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)\>

#### Defined in

[server/cache.ts:989](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L989)

___

### requestDelete

▸ **requestDelete**(`item`, `id`, `version`, `options?`): `Promise`<`void`\>

Request the deletition of an item definition value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | `string` \| [`default`](base_Root_Module_ItemDefinition.default.md) | the item definition to delete a value for |
| `id` | `string` | the id to delete for |
| `version` | `string` | the version to delete for |
| `options` | [`IDeleteOptions`](../interfaces/server_cache.IDeleteOptions.md) | - |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/cache.ts:2555](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L2555)

___

### requestListCache

▸ **requestListCache**(`records`): `Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[]\>

TODO Optimize this, right now it retrieves the list one by one
Requests a whole list of search results

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `records` | [`IGQLSearchRecord`](../interfaces/gql_querier.IGQLSearchRecord.md)[] | the records to request for |

#### Returns

`Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[]\>

a list of whole sql combined table row values

#### Defined in

[server/cache.ts:3307](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L3307)

___

### requestToken

▸ **requestToken**(`id`): `Promise`<`string`\>

Provides a valid token for a given
user, you might not really want to use this method
unless you are fairly sure as these are permanent tokens
for users for their given session id, normally you would use
these tokens for redirected logins

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the user id |

#### Returns

`Promise`<`string`\>

#### Defined in

[server/cache.ts:3106](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L3106)

___

### requestUpdate

▸ **requestUpdate**(`item`, `id`, `version`, `update`, `options`): `Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)\>

Requests an update for an item definition where new values are set for this existent item
definition value, these are taken as instructions and no checks are done on it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | `string` \| [`default`](base_Root_Module_ItemDefinition.default.md) | the item definition in question |
| `id` | `string` | the id to update |
| `version` | `string` | the version of that id to update |
| `update` | [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) | the update in question (partial values are allowed) |
| `options` | [`IUpdateOptions`](../interfaces/server_cache.IUpdateOptions.md) | - |

#### Returns

`Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)\>

a total combined table row value that can be converted into graphql

#### Defined in

[server/cache.ts:1671](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L1671)

___

### requestValue

▸ **requestValue**(`item`, `id`, `version`, `options?`): `Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)\>

Requests a value from the cache

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | `string` \| [`default`](base_Root_Module_ItemDefinition.default.md) | the item definition or a qualified name |
| `id` | `string` | the id to request for |
| `version` | `string` | the version |
| `options` | `Object` | - |
| `options.doNotEnsure?` | `boolean` | - |
| `options.forceRefresh?` | `boolean` | - |
| `options.useMemoryCache?` | `boolean` | a total opposite of refresh, (do not use together as refresh beats this one) which will use a 1 second memory cache to retrieve values and store them, use this if you think the value might be used consecutively and you don't care about accuraccy that much |
| `options.useMemoryCacheMs?` | `number` | - |

#### Returns

`Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)\>

a whole sql value that can be converted into graphql if necessary

#### Defined in

[server/cache.ts:3139](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L3139)

___

### setAppData

▸ **setAppData**(`appData`): `void`

Allows to set the app data in the server side
where this app is contained

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) | the app data |

#### Returns

`void`

#### Defined in

[server/cache.ts:3425](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L3425)

___

### setListener

▸ **setListener**(`listener`): `void`

Sets the listener for the remote interaction with the clients
that are connected, this listener is what informs the client of updates
the listener is highly related to the cache as it uses pubsub that
comes from redis

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `listener` | [`Listener`](server_listener.Listener.md) | the listener |

#### Returns

`void`

#### Defined in

[server/cache.ts:247](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L247)

___

### setRaw

▸ **setRaw**(`key`, `value`, `onConflict`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `any` |
| `onConflict` | (`value`: `any`) => `boolean` |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/cache.ts:301](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L301)

___

### triggerSearchListenersFor

▸ **triggerSearchListenersFor**(`itemDefinition`, `createdBy`, `newParent`, `originalParent`, `propertyMap`, `record`, `location`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinition` | [`default`](base_Root_Module_ItemDefinition.default.md) |
| `createdBy` | `string` |
| `newParent` | `Object` |
| `newParent.id` | `string` |
| `newParent.type` | `string` |
| `newParent.version` | `string` |
| `originalParent` | `Object` |
| `originalParent.id` | `string` |
| `originalParent.type` | `string` |
| `originalParent.version` | `string` |
| `propertyMap` | `IPropertyMapElement`[] |
| `record` | [`IGQLSearchRecord`](../interfaces/gql_querier.IGQLSearchRecord.md) |
| `location` | ``"modified"`` \| ``"deleted"`` \| ``"new"`` |

#### Returns

`void`

#### Defined in

[server/cache.ts:459](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L459)

___

### updatePointerMap

▸ `Private` **updatePointerMap**(`transactingDatabase`, `itemDefinition`, `id`, `version`, `pointerMap`): `Promise`<[`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactingDatabase` | [`DatabaseConnection`](database.DatabaseConnection.md) |
| `itemDefinition` | [`default`](base_Root_Module_ItemDefinition.default.md) |
| `id` | `string` |
| `version` | `string` |
| `pointerMap` | `IPropertyMapElementPointer`[] |

#### Returns

`Promise`<[`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md)\>

#### Defined in

[server/cache.ts:3429](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L3429)

___

### wipe

▸ **wipe**(): `Promise`<`void`\>

wipes the cache, usually executed on edge cases during connectivity issues
with clusters and nodes, once the connection is restablished with redis
the cache is wiped by the cluster manager which handles the cache

#### Returns

`Promise`<`void`\>

#### Defined in

[server/cache.ts:3396](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L3396)
