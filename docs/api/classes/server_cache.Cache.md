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
- [databaseConnection](server_cache.Cache.md#databaseconnection)
- [domain](server_cache.Cache.md#domain)
- [listener](server_cache.Cache.md#listener)
- [memoryCache](server_cache.Cache.md#memorycache)
- [redisClient](server_cache.Cache.md#redisclient)
- [root](server_cache.Cache.md#root)
- [sensitiveConfig](server_cache.Cache.md#sensitiveconfig)
- [serverData](server_cache.Cache.md#serverdata)
- [storageClients](server_cache.Cache.md#storageclients)

### Methods

- [analyzeIdefForPossibleParent](server_cache.Cache.md#analyzeidefforpossibleparent)
- [analyzeModuleForPossibleParent](server_cache.Cache.md#analyzemoduleforpossibleparent)
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
- [requestUpdateSimple](server_cache.Cache.md#requestupdatesimple)
- [requestValue](server_cache.Cache.md#requestvalue)
- [setAppData](server_cache.Cache.md#setappdata)
- [setListener](server_cache.Cache.md#setlistener)
- [setRaw](server_cache.Cache.md#setraw)
- [triggerSearchListenersFor](server_cache.Cache.md#triggersearchlistenersfor)
- [wipe](server_cache.Cache.md#wipe)

## Constructors

### constructor

• **new Cache**(`redisClient`, `databaseConnection`, `sensitiveConfig`, `storageClients`, `domain`, `root`, `initialServerData`)

Builds a new cache instance, before the cache is ready
it needs to be able to access the listener as well, but due
to the fact that the listener depends on the cache as well
it is instantiaded by te listener at the same time

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `redisClient` | [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md) | the redis client that is used for storing values |
| `databaseConnection` | [`DatabaseConnection`](database.DatabaseConnection.md) | - |
| `sensitiveConfig` | [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md) | - |
| `storageClients` | [`IStorageProvidersObject`](../interfaces/server_services_base_StorageProvider.IStorageProvidersObject.md) | - |
| `domain` | `string` | - |
| `root` | [`default`](base_Root.default.md) | the root of itemize |
| `initialServerData` | [`IServerDataType`](../interfaces/server.IServerDataType.md) | - |

#### Defined in

[server/cache.ts:80](https://github.com/onzag/itemize/blob/5c2808d3/server/cache.ts#L80)

## Properties

### appData

• `Private` **appData**: [`IAppDataType`](../interfaces/server.IAppDataType.md)

#### Defined in

[server/cache.ts:69](https://github.com/onzag/itemize/blob/5c2808d3/server/cache.ts#L69)

___

### databaseConnection

• `Private` **databaseConnection**: [`DatabaseConnection`](database.DatabaseConnection.md)

#### Defined in

[server/cache.ts:57](https://github.com/onzag/itemize/blob/5c2808d3/server/cache.ts#L57)

___

### domain

• `Private` **domain**: `string`

#### Defined in

[server/cache.ts:58](https://github.com/onzag/itemize/blob/5c2808d3/server/cache.ts#L58)

___

### listener

• `Private` **listener**: [`Listener`](server_listener.Listener.md)

#### Defined in

[server/cache.ts:62](https://github.com/onzag/itemize/blob/5c2808d3/server/cache.ts#L62)

___

### memoryCache

• `Private` **memoryCache**: `Object` = `{}`

#### Index signature

▪ [key: `string`]: { `value`: [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)  }

#### Defined in

[server/cache.ts:64](https://github.com/onzag/itemize/blob/5c2808d3/server/cache.ts#L64)

___

### redisClient

• `Private` **redisClient**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Defined in

[server/cache.ts:56](https://github.com/onzag/itemize/blob/5c2808d3/server/cache.ts#L56)

___

### root

• `Private` **root**: [`default`](base_Root.default.md)

#### Defined in

[server/cache.ts:60](https://github.com/onzag/itemize/blob/5c2808d3/server/cache.ts#L60)

___

### sensitiveConfig

• `Private` **sensitiveConfig**: [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md)

#### Defined in

[server/cache.ts:63](https://github.com/onzag/itemize/blob/5c2808d3/server/cache.ts#L63)

___

### serverData

• `Private` **serverData**: [`IServerDataType`](../interfaces/server.IServerDataType.md)

#### Defined in

[server/cache.ts:61](https://github.com/onzag/itemize/blob/5c2808d3/server/cache.ts#L61)

___

### storageClients

• `Private` **storageClients**: [`IStorageProvidersObject`](../interfaces/server_services_base_StorageProvider.IStorageProvidersObject.md)

#### Defined in

[server/cache.ts:59](https://github.com/onzag/itemize/blob/5c2808d3/server/cache.ts#L59)

## Methods

### analyzeIdefForPossibleParent

▸ `Private` **analyzeIdefForPossibleParent**(`possibleParent`, `idef`): `boolean`

This function analyzes an item definition to check for a possible
parent and returns true if there's any parent rule within itself, including
its children that matches the possible parent

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `possibleParent` | [`default`](base_Root_Module_ItemDefinition.default.md) | the possible parent |
| `idef` | [`default`](base_Root_Module_ItemDefinition.default.md) | the item definition in question |

#### Returns

`boolean`

a simple boolean

#### Defined in

[server/cache.ts:1477](https://github.com/onzag/itemize/blob/5c2808d3/server/cache.ts#L1477)

___

### analyzeModuleForPossibleParent

▸ `Private` **analyzeModuleForPossibleParent**(`possibleParent`, `module`): [`default`](base_Root_Module.default.md)[]

This function finds modules for a given module, including its children
that do match a possible parent rule

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `possibleParent` | [`default`](base_Root_Module_ItemDefinition.default.md) | the possible parent |
| `module` | [`default`](base_Root_Module.default.md) | the current module to analyze |

#### Returns

[`default`](base_Root_Module.default.md)[]

a list of modules

#### Defined in

[server/cache.ts:1493](https://github.com/onzag/itemize/blob/5c2808d3/server/cache.ts#L1493)

___

### deletePossibleChildrenOf

▸ `Private` **deletePossibleChildrenOf**(`itemDefinition`, `id`, `version`): `Promise`<`void`\>

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

[server/cache.ts:1523](https://github.com/onzag/itemize/blob/5c2808d3/server/cache.ts#L1523)

___

### forceCacheInto

▸ `Private` **forceCacheInto**(`idefTable`, `id`, `version`, `value`): `Promise`<`void`\>

forces a cached value for a given item definition table in an id and version

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `idefTable` | `string` | the item definition table or its qualified name |
| `id` | `string` | the id |
| `version` | `string` | the version or null |
| `value` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | the value to store |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/cache.ts:193](https://github.com/onzag/itemize/blob/5c2808d3/server/cache.ts#L193)

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

[server/cache.ts:113](https://github.com/onzag/itemize/blob/5c2808d3/server/cache.ts#L113)

___

### getServerData

▸ **getServerData**(): [`IServerDataType`](../interfaces/server.IServerDataType.md)

Provides the current server data

#### Returns

[`IServerDataType`](../interfaces/server.IServerDataType.md)

#### Defined in

[server/cache.ts:2165](https://github.com/onzag/itemize/blob/5c2808d3/server/cache.ts#L2165)

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

[server/cache.ts:2189](https://github.com/onzag/itemize/blob/5c2808d3/server/cache.ts#L2189)

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

[server/cache.ts:2257](https://github.com/onzag/itemize/blob/5c2808d3/server/cache.ts#L2257)

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

[server/cache.ts:2173](https://github.com/onzag/itemize/blob/5c2808d3/server/cache.ts#L2173)

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

[server/cache.ts:172](https://github.com/onzag/itemize/blob/5c2808d3/server/cache.ts#L172)

___

### requestCopy

▸ **requestCopy**(`item`, `id`, `version`, `targetId`, `targetVersion`, `targetContainerId?`, `targetCreatedBy?`, `targetParent?`, `currentRawValueSQL?`, `options?`): `Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)\>

Given an item that needs to be copied it will create a new copy for it
with all its files and everything

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | `string` \| [`default`](base_Root_Module_ItemDefinition.default.md) | the item to copy from |
| `id` | `string` | the id to copy from |
| `version` | `string` | the version to copy from |
| `targetId` | `string` | the target id to copy at |
| `targetVersion` | `string` | the target version to copy at |
| `targetContainerId?` | `string` | the target container id to use (if not specified will use the same) |
| `targetCreatedBy?` | `string` | the target creator to use (if not specified will use the same) |
| `targetParent?` | `Object` | the target parent to use (if not specified will use the same as the original) |
| `targetParent.id` | `string` | - |
| `targetParent.type` | `string` | - |
| `targetParent.version` | `string` | - |
| `currentRawValueSQL?` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | the current known value for this source item (if not specified will find it) |
| `options` | `Object` | some options for side effects as this calls the request creation function |
| `options.ignorePreSideEffects?` | `boolean` | - |
| `options.ignoreSideEffects?` | `boolean` | - |

#### Returns

`Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)\>

#### Defined in

[server/cache.ts:773](https://github.com/onzag/itemize/blob/5c2808d3/server/cache.ts#L773)

___

### requestCreation

▸ **requestCreation**(`itemDefinition`, `forId`, `version`, `value`, `createdBy`, `dictionary`, `containerId`, `parent`, `listenerUUID`, `options?`): `Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)\>

Request the creation of a new item definition value for an specific item definition

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemDefinition` | [`default`](base_Root_Module_ItemDefinition.default.md) | the item definition we refer to |
| `forId` | `string` | an optional (or null) value for the id that is meant to be created for, when forId is used the item should exist, note that the cache doesn't check for any of this |
| `version` | `string` | an optional (or null) version for the item definition |
| `value` | [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md) \| [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) \| [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) | the value to create, the value can be partial |
| `createdBy` | `string` | the creator of this item, it can be null, in which case the creator would be left unspecified |
| `dictionary` | `string` | the dictionary to use, this can be left null as well when no text field is present but it is recommended to be set, represents a postgresql dictionary for building text indexes |
| `containerId` | `string` | - |
| `parent` | `Object` | the parent of this item, can be left null, note that no checks for parenting are done it will just execute |
| `parent.id` | `string` | the parent id |
| `parent.type` | `string` | the parent type |
| `parent.version` | `string` | the parent version |
| `listenerUUID` | `string` | the listener uuid |
| `options` | `Object` | - |
| `options.ignorePreSideEffects?` | `boolean` | - |
| `options.ignoreSideEffects?` | `boolean` | - |

#### Returns

`Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)\>

a total sql combined row value that can be converted into grapqhl

#### Defined in

[server/cache.ts:348](https://github.com/onzag/itemize/blob/5c2808d3/server/cache.ts#L348)

___

### requestDelete

▸ **requestDelete**(`item`, `id`, `version`, `dropAllVersions`, `containerId`, `listenerUUID`, `options?`): `Promise`<`void`\>

Request the deletition of an item definition value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | `string` \| [`default`](base_Root_Module_ItemDefinition.default.md) | the item definition to delete a value for |
| `id` | `string` | the id to delete for |
| `version` | `string` | the version to delete for |
| `dropAllVersions` | `boolean` | whether to drop all versions |
| `containerId` | `string` | the container id where these files are currently stored, ensure to pass the exact same one unsafe not to pass so it's required |
| `listenerUUID` | `string` | the listener uuid, from the listener, this ensures that the executor of this action doesn't get a notification, you can pass null for this if this is a computer operation and let every listener to be informed while it doesn't hurt to keep listenerUUID as null, it is expensive to send messages when they will be of no use the listener uuid ensures only those that needs updates will get them |
| `options` | `Object` | - |
| `options.ignoreSideEffects?` | `boolean` | - |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/cache.ts:1629](https://github.com/onzag/itemize/blob/5c2808d3/server/cache.ts#L1629)

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

[server/cache.ts:2154](https://github.com/onzag/itemize/blob/5c2808d3/server/cache.ts#L2154)

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

[server/cache.ts:2024](https://github.com/onzag/itemize/blob/5c2808d3/server/cache.ts#L2024)

___

### requestUpdate

▸ **requestUpdate**(`item`, `id`, `version`, `update`, `currentSQLValue`, `currentValue`, `editedBy`, `dictionary`, `containerId`, `listenerUUID`, `reparent`, `blocking`, `options?`): `Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)\>

Requests an update for an item definition where new values are set for this existent item
definition value, these are taken as instructions and no checks are done on it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | `string` \| [`default`](base_Root_Module_ItemDefinition.default.md) | the item definition in question |
| `id` | `string` | the id to update |
| `version` | `string` | the version of that id to update |
| `update` | [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) | the update in question (partial values are allowed) |
| `currentSQLValue` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | the same value but as the raw row |
| `currentValue` | [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md) | a current value as graphql, the current value can be requested from the cache itself, and then converted into graphql, but this is expensive, while for the edit process this is done anyway because of checks, if you are running this manually you might not need to pass these the reason current value are necessary is in order to perform a diffing operation and remove orphan files if your update process doesn't leave orphan files, as in you are not updating any file field, you can pass null to the current value |
| `editedBy` | `string` | the editor id, this causes the edited_at and edited_by field to change, however you can pass null to this value in order to mark it as computer edited rather than edited by an user |
| `dictionary` | `string` | the dictionary to use, just like the current value this is only relevant if you are updating full text search enabled fields, if that is not the case, you can pass null to the dictionary, but be careful |
| `containerId` | `string` | the container id where this item is stored, please when using update ensure to select the same container that the item is already created otherwise this will break the uploads and make them unreachable if you are passing no uploads it's safe to leave as null |
| `listenerUUID` | `string` | the listener uuid, from the listener, this ensures that the executor of this action doesn't get a notification, you can pass null for this if this is a computer operation and let every listener to be informed while it doesn't hurt to keep listenerUUID as null, it is expensive to send messages when they will be of no use the listener uuid ensures only those that needs updates will get them |
| `reparent` | `Object` | - |
| `reparent.id` | `string` | - |
| `reparent.type` | `string` | - |
| `reparent.version` | `string` | - |
| `blocking` | `Object` | - |
| `blocking.reason` | `string` | - |
| `blocking.status` | `boolean` | - |
| `blocking.until` | `string` | - |
| `options` | `Object` | - |
| `options.ignorePreSideEffects?` | `boolean` | - |
| `options.ignoreSideEffects?` | `boolean` | - |

#### Returns

`Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)\>

a total combined table row value that can be converted into graphql

#### Defined in

[server/cache.ts:973](https://github.com/onzag/itemize/blob/5c2808d3/server/cache.ts#L973)

___

### requestUpdateSimple

▸ **requestUpdateSimple**(`item`, `id`, `version`, `update`, `dictionary`, `currentRawValueSQL?`, `options?`): `Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)\>

Requests an update for an item definition in a simple way
this might have more overhead than the normal request update

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | `string` \| [`default`](base_Root_Module_ItemDefinition.default.md) |
| `id` | `string` |
| `version` | `string` |
| `update` | [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) |
| `dictionary` | `string` |
| `currentRawValueSQL?` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |
| `options?` | `Object` |
| `options.ignorePreSideEffects?` | `boolean` |
| `options.ignoreSideEffects?` | `boolean` |

#### Returns

`Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)\>

#### Defined in

[server/cache.ts:906](https://github.com/onzag/itemize/blob/5c2808d3/server/cache.ts#L906)

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
| `options?` | `Object` | - |
| `options.refresh?` | `boolean` | whether to skip the cache and request directly from the database and update the cache |
| `options.useMemoryCache?` | `boolean` | a total opposite of refresh, (do not use together as refresh beats this one) which will use a 1 second memory cache to retrieve values and store them, use this if you think the value might be used consecutively and you don't care about accuraccy that much |

#### Returns

`Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)\>

a whole sql value that can be converted into graphql if necessary

#### Defined in

[server/cache.ts:2058](https://github.com/onzag/itemize/blob/5c2808d3/server/cache.ts#L2058)

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

[server/cache.ts:2266](https://github.com/onzag/itemize/blob/5c2808d3/server/cache.ts#L2266)

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

[server/cache.ts:104](https://github.com/onzag/itemize/blob/5c2808d3/server/cache.ts#L104)

___

### setRaw

▸ **setRaw**(`key`, `value`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `any` |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/cache.ts:150](https://github.com/onzag/itemize/blob/5c2808d3/server/cache.ts#L150)

___

### triggerSearchListenersFor

▸ **triggerSearchListenersFor**(`itemDefinition`, `createdBy`, `parent`, `record`, `location`, `doNotTriggerOwnedEventsBecauseItsReparent?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinition` | [`default`](base_Root_Module_ItemDefinition.default.md) |
| `createdBy` | `string` |
| `parent` | `Object` |
| `parent.id` | `string` |
| `parent.type` | `string` |
| `parent.version` | `string` |
| `record` | [`IGQLSearchRecord`](../interfaces/gql_querier.IGQLSearchRecord.md) |
| `location` | ``"modified"`` \| ``"new"`` \| ``"lost"`` |
| `doNotTriggerOwnedEventsBecauseItsReparent?` | `boolean` |

#### Returns

`void`

#### Defined in

[server/cache.ts:210](https://github.com/onzag/itemize/blob/5c2808d3/server/cache.ts#L210)

___

### wipe

▸ **wipe**(): `Promise`<`void`\>

wipes the cache, usually executed on edge cases during connectivity issues
with clusters and nodes, once the connection is restablished with redis
the cache is wiped by the cluster manager which handles the cache

#### Returns

`Promise`<`void`\>

#### Defined in

[server/cache.ts:2237](https://github.com/onzag/itemize/blob/5c2808d3/server/cache.ts#L2237)
