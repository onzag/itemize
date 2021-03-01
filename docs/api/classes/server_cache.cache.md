[](../README.md) / [Exports](../modules.md) / [server/cache](../modules/server_cache.md) / Cache

# Class: Cache

[server/cache](../modules/server_cache.md).Cache

The cache class that provides all the functionality that is
specified for the cache package, the cache is more than what
it name implies because it contains redis and it's the same in
all the servers

## Table of contents

### Constructors

- [constructor](server_cache.cache.md#constructor)

### Properties

- [databaseConnection](server_cache.cache.md#databaseconnection)
- [domain](server_cache.cache.md#domain)
- [listener](server_cache.cache.md#listener)
- [memoryCache](server_cache.cache.md#memorycache)
- [redisClient](server_cache.cache.md#redisclient)
- [root](server_cache.cache.md#root)
- [sensitiveConfig](server_cache.cache.md#sensitiveconfig)
- [serverData](server_cache.cache.md#serverdata)
- [storageClients](server_cache.cache.md#storageclients)

### Methods

- [analyzeIdefForPossibleParent](server_cache.cache.md#analyzeidefforpossibleparent)
- [analyzeModuleForPossibleParent](server_cache.cache.md#analyzemoduleforpossibleparent)
- [deletePossibleChildrenOf](server_cache.cache.md#deletepossiblechildrenof)
- [forceCacheInto](server_cache.cache.md#forcecacheinto)
- [getRaw](server_cache.cache.md#getraw)
- [getServerData](server_cache.cache.md#getserverdata)
- [onChangeInformed](server_cache.cache.md#onchangeinformed)
- [onChangeInformedNoData](server_cache.cache.md#onchangeinformednodata)
- [onServerDataChangeInformed](server_cache.cache.md#onserverdatachangeinformed)
- [pokeCache](server_cache.cache.md#pokecache)
- [requestCreation](server_cache.cache.md#requestcreation)
- [requestDelete](server_cache.cache.md#requestdelete)
- [requestListCache](server_cache.cache.md#requestlistcache)
- [requestToken](server_cache.cache.md#requesttoken)
- [requestUpdate](server_cache.cache.md#requestupdate)
- [requestUpdateSimple](server_cache.cache.md#requestupdatesimple)
- [requestValue](server_cache.cache.md#requestvalue)
- [setListener](server_cache.cache.md#setlistener)
- [setRaw](server_cache.cache.md#setraw)
- [triggerSearchListenersFor](server_cache.cache.md#triggersearchlistenersfor)
- [wipe](server_cache.cache.md#wipe)

## Constructors

### constructor

\+ **new Cache**(`redisClient`: [*ItemizeRedisClient*](server_redis.itemizeredisclient.md), `databaseConnection`: [*DatabaseConnection*](database.databaseconnection.md), `sensitiveConfig`: [*ISensitiveConfigRawJSONDataType*](../interfaces/config.isensitiveconfigrawjsondatatype.md), `storageClients`: [*IStorageProvidersObject*](../interfaces/server_services_base_storageprovider.istorageprovidersobject.md), `domain`: *string*, `root`: [*default*](base_root.default.md), `initialServerData`: [*IServerDataType*](../interfaces/server.iserverdatatype.md)): [*Cache*](server_cache.cache.md)

Builds a new cache instance, before the cache is ready
it needs to be able to access the listener as well, but due
to the fact that the listener depends on the cache as well
it is instantiaded by te listener at the same time

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`redisClient` | [*ItemizeRedisClient*](server_redis.itemizeredisclient.md) | the redis client that is used for storing values   |
`databaseConnection` | [*DatabaseConnection*](database.databaseconnection.md) | - |
`sensitiveConfig` | [*ISensitiveConfigRawJSONDataType*](../interfaces/config.isensitiveconfigrawjsondatatype.md) | - |
`storageClients` | [*IStorageProvidersObject*](../interfaces/server_services_base_storageprovider.istorageprovidersobject.md) | - |
`domain` | *string* | - |
`root` | [*default*](base_root.default.md) | the root of itemize    |
`initialServerData` | [*IServerDataType*](../interfaces/server.iserverdatatype.md) | - |

**Returns:** [*Cache*](server_cache.cache.md)

Defined in: [server/cache.ts:66](https://github.com/onzag/itemize/blob/5fcde7cf/server/cache.ts#L66)

## Properties

### databaseConnection

• `Private` **databaseConnection**: [*DatabaseConnection*](database.databaseconnection.md)

Defined in: [server/cache.ts:55](https://github.com/onzag/itemize/blob/5fcde7cf/server/cache.ts#L55)

___

### domain

• `Private` **domain**: *string*

Defined in: [server/cache.ts:56](https://github.com/onzag/itemize/blob/5fcde7cf/server/cache.ts#L56)

___

### listener

• `Private` **listener**: [*Listener*](server_listener.listener.md)

Defined in: [server/cache.ts:60](https://github.com/onzag/itemize/blob/5fcde7cf/server/cache.ts#L60)

___

### memoryCache

• `Private` **memoryCache**: *object*

#### Type declaration:

Defined in: [server/cache.ts:62](https://github.com/onzag/itemize/blob/5fcde7cf/server/cache.ts#L62)

___

### redisClient

• `Private` **redisClient**: [*ItemizeRedisClient*](server_redis.itemizeredisclient.md)

Defined in: [server/cache.ts:54](https://github.com/onzag/itemize/blob/5fcde7cf/server/cache.ts#L54)

___

### root

• `Private` **root**: [*default*](base_root.default.md)

Defined in: [server/cache.ts:58](https://github.com/onzag/itemize/blob/5fcde7cf/server/cache.ts#L58)

___

### sensitiveConfig

• `Private` **sensitiveConfig**: [*ISensitiveConfigRawJSONDataType*](../interfaces/config.isensitiveconfigrawjsondatatype.md)

Defined in: [server/cache.ts:61](https://github.com/onzag/itemize/blob/5fcde7cf/server/cache.ts#L61)

___

### serverData

• `Private` **serverData**: [*IServerDataType*](../interfaces/server.iserverdatatype.md)

Defined in: [server/cache.ts:59](https://github.com/onzag/itemize/blob/5fcde7cf/server/cache.ts#L59)

___

### storageClients

• `Private` **storageClients**: [*IStorageProvidersObject*](../interfaces/server_services_base_storageprovider.istorageprovidersobject.md)

Defined in: [server/cache.ts:57](https://github.com/onzag/itemize/blob/5fcde7cf/server/cache.ts#L57)

## Methods

### analyzeIdefForPossibleParent

▸ `Private`**analyzeIdefForPossibleParent**(`possibleParent`: [*default*](base_root_module_itemdefinition.default.md), `idef`: [*default*](base_root_module_itemdefinition.default.md)): *boolean*

This function analyzes an item definition to check for a possible
parent and returns true if there's any parent rule within itself, including
its children that matches the possible parent

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`possibleParent` | [*default*](base_root_module_itemdefinition.default.md) | the possible parent   |
`idef` | [*default*](base_root_module_itemdefinition.default.md) | the item definition in question   |

**Returns:** *boolean*

a simple boolean

Defined in: [server/cache.ts:899](https://github.com/onzag/itemize/blob/5fcde7cf/server/cache.ts#L899)

___

### analyzeModuleForPossibleParent

▸ `Private`**analyzeModuleForPossibleParent**(`possibleParent`: [*default*](base_root_module_itemdefinition.default.md), `module`: [*default*](base_root_module.default.md)): [*default*](base_root_module.default.md)[]

This function finds modules for a given module, including its children
that do match a possible parent rule

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`possibleParent` | [*default*](base_root_module_itemdefinition.default.md) | the possible parent   |
`module` | [*default*](base_root_module.default.md) | the current module to analyze   |

**Returns:** [*default*](base_root_module.default.md)[]

a list of modules

Defined in: [server/cache.ts:915](https://github.com/onzag/itemize/blob/5fcde7cf/server/cache.ts#L915)

___

### deletePossibleChildrenOf

▸ `Private`**deletePossibleChildrenOf**(`itemDefinition`: [*default*](base_root_module_itemdefinition.default.md), `id`: *string*, `version`: *string*): *Promise*<void\>

Deletes all the possible children that might have been set as parent of the deleted
item definition value

#### Parameters:

Name | Type |
:------ | :------ |
`itemDefinition` | [*default*](base_root_module_itemdefinition.default.md) |
`id` | *string* |
`version` | *string* |

**Returns:** *Promise*<void\>

Defined in: [server/cache.ts:945](https://github.com/onzag/itemize/blob/5fcde7cf/server/cache.ts#L945)

___

### forceCacheInto

▸ `Private`**forceCacheInto**(`idefTable`: *string*, `id`: *string*, `version`: *string*, `value`: [*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md)): *Promise*<void\>

forces a cached value for a given item definition table in an id and version

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`idefTable` | *string* | the item definition table or its qualified name   |
`id` | *string* | the id   |
`version` | *string* | the version or null   |
`value` | [*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md) | the value to store    |

**Returns:** *Promise*<void\>

Defined in: [server/cache.ts:190](https://github.com/onzag/itemize/blob/5fcde7cf/server/cache.ts#L190)

___

### getRaw

▸ **getRaw**<T\>(`key`: *string*): *Promise*<{ `value`: T  }\>

Provides a cached value from its identifier

#### Type parameters:

Name |
:------ |
`T` |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`key` | *string* | the identifier   |

**Returns:** *Promise*<{ `value`: T  }\>

a promise with the value

Defined in: [server/cache.ts:110](https://github.com/onzag/itemize/blob/5fcde7cf/server/cache.ts#L110)

___

### getServerData

▸ **getServerData**(): [*IServerDataType*](../interfaces/server.iserverdatatype.md)

Provides the current server data

**Returns:** [*IServerDataType*](../interfaces/server.iserverdatatype.md)

Defined in: [server/cache.ts:1486](https://github.com/onzag/itemize/blob/5fcde7cf/server/cache.ts#L1486)

___

### onChangeInformed

▸ **onChangeInformed**(`itemDefinition`: *string*, `id`: *string*, `version`: *string*, `data?`: [*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md)): *Promise*<void\>

This function triggers once the remote listener has detected a change that has been done by
another server instance to a value that we are supposedly currently holding in memory

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`itemDefinition` | *string* | the item definition qualified name   |
`id` | *string* | the id of such   |
`version` | *string* | the version or null   |
`data?` | [*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md) | the entire SQL result   |

**Returns:** *Promise*<void\>

a void promise when done

Defined in: [server/cache.ts:1510](https://github.com/onzag/itemize/blob/5fcde7cf/server/cache.ts#L1510)

___

### onChangeInformedNoData

▸ **onChangeInformedNoData**(`itemDefinition`: *string*, `id`: *string*, `version`: *string*): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`itemDefinition` | *string* |
`id` | *string* |
`version` | *string* |

**Returns:** *Promise*<void\>

Defined in: [server/cache.ts:1570](https://github.com/onzag/itemize/blob/5fcde7cf/server/cache.ts#L1570)

___

### onServerDataChangeInformed

▸ **onServerDataChangeInformed**(`newData`: [*IServerDataType*](../interfaces/server.iserverdatatype.md)): *void*

This function is called once new server data was informed by a redis event

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`newData` | [*IServerDataType*](../interfaces/server.iserverdatatype.md) | the new server data that redis is giving    |

**Returns:** *void*

Defined in: [server/cache.ts:1494](https://github.com/onzag/itemize/blob/5fcde7cf/server/cache.ts#L1494)

___

### pokeCache

▸ `Private`**pokeCache**(`keyIdentifier`: *string*): *Promise*<void\>

Resets the expiration clock of a given identifier

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`keyIdentifier` | *string* | the identifier    |

**Returns:** *Promise*<void\>

Defined in: [server/cache.ts:169](https://github.com/onzag/itemize/blob/5fcde7cf/server/cache.ts#L169)

___

### requestCreation

▸ **requestCreation**(`itemDefinition`: [*default*](base_root_module_itemdefinition.default.md), `forId`: *string*, `version`: *string*, `value`: [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md), `createdBy`: *string*, `dictionary`: *string*, `containerId`: *string*, `parent`: { `id`: *string* ; `type`: *string* ; `version`: *string*  }, `listenerUUID`: *string*): *Promise*<[*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md)\>

Request the creation of a new item definition value for an specific item definition

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`itemDefinition` | [*default*](base_root_module_itemdefinition.default.md) | the item definition we refer to   |
`forId` | *string* | an optional (or null) value for the id that is meant to be created for, when forId is used the item should exist, note that the cache doesn't check for any of this   |
`version` | *string* | an optional (or null) version for the item definition   |
`value` | [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md) | the value to create, the value can be partial   |
`createdBy` | *string* | the creator of this item, it can be null, in which case the creator would be left unspecified   |
`dictionary` | *string* | the dictionary to use, this can be left null as well when no text field is present but it is recommended to be set, represents a postgresql dictionary for building text indexes   |
`containerId` | *string* | - |
`parent` | *object* | the parent of this item, can be left null, note that no checks for parenting are done it will just execute   |
`parent.id` | *string* | the parent id   |
`parent.type` | *string* | the parent type   |
`parent.version` | *string* | the parent version   |
`listenerUUID` | *string* | the listener uuid   |

**Returns:** *Promise*<[*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md)\>

a total sql combined row value that can be converted into grapqhl

Defined in: [server/cache.ts:306](https://github.com/onzag/itemize/blob/5fcde7cf/server/cache.ts#L306)

___

### requestDelete

▸ **requestDelete**(`item`: *string* \| [*default*](base_root_module_itemdefinition.default.md), `id`: *string*, `version`: *string*, `dropAllVersions`: *boolean*, `containerId`: *string*, `listenerUUID`: *string*): *Promise*<void\>

Request the deletition of an item definition value

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`item` | *string* \| [*default*](base_root_module_itemdefinition.default.md) | the item definition to delete a value for   |
`id` | *string* | the id to delete for   |
`version` | *string* | the version to delete for   |
`dropAllVersions` | *boolean* | whether to drop all versions   |
`containerId` | *string* | the container id where these files are currently stored, ensure to pass the exact same one unsafe not to pass so it's required   |
`listenerUUID` | *string* | the listener uuid, from the listener, this ensures that the executor of this action doesn't get a notification, you can pass null for this if this is a computer operation and let every listener to be informed while it doesn't hurt to keep listenerUUID as null, it is expensive to send messages when they will be of no use the listener uuid ensures only those that needs updates will get them    |

**Returns:** *Promise*<void\>

Defined in: [server/cache.ts:1037](https://github.com/onzag/itemize/blob/5fcde7cf/server/cache.ts#L1037)

___

### requestListCache

▸ **requestListCache**(`records`: [*IGQLSearchRecord*](../interfaces/gql_querier.igqlsearchrecord.md)[]): *Promise*<[*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md)[]\>

TODO Optimize this, right now it retrieves the list one by one
Requests a whole list of search results

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`records` | [*IGQLSearchRecord*](../interfaces/gql_querier.igqlsearchrecord.md)[] | the records to request for   |

**Returns:** *Promise*<[*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md)[]\>

a list of whole sql combined table row values

Defined in: [server/cache.ts:1475](https://github.com/onzag/itemize/blob/5fcde7cf/server/cache.ts#L1475)

___

### requestToken

▸ **requestToken**(`id`: *string*): *Promise*<string\>

Provides a valid token for a given
user, you might not really want to use this method
unless you are fairly sure as these are permanent tokens
for users for their given session id, normally you would use
these tokens for redirected logins

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the user id    |

**Returns:** *Promise*<string\>

Defined in: [server/cache.ts:1345](https://github.com/onzag/itemize/blob/5fcde7cf/server/cache.ts#L1345)

___

### requestUpdate

▸ **requestUpdate**(`item`: *string* \| [*default*](base_root_module_itemdefinition.default.md), `id`: *string*, `version`: *string*, `update`: [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md), `currentValue`: [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md), `editedBy`: *string*, `dictionary`: *string*, `containerId`: *string*, `listenerUUID`: *string*): *Promise*<[*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md)\>

Requests an update for an item definition where new values are set for this existent item
definition value, these are taken as instructions and no checks are done on it

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`item` | *string* \| [*default*](base_root_module_itemdefinition.default.md) | the item definition in question   |
`id` | *string* | the id to update   |
`version` | *string* | the version of that id to update   |
`update` | [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md) | the update in question (partial values are allowed)   |
`currentValue` | [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md) | a current value as graphql, the current value can be requested from the cache itself, and then converted into graphql, but this is expensive, while for the edit process this is done anyway because of checks, if you are running this manually you might not need to pass these the reason current value are necessary is in order to perform a diffing operation and remove orphan files if your update process doesn't leave orphan files, as in you are not updating any file field, you can pass null to the current value   |
`editedBy` | *string* | the editor id, this causes the edited_at and edited_by field to change, however you can pass null to this value in order to mark it as computer edited rather than edited by an user   |
`dictionary` | *string* | the dictionary to use, just like the current value this is only relevant if you are updating full text search enabled fields, if that is not the case, you can pass null to the dictionary, but be careful   |
`containerId` | *string* | the container id where this item is stored, please when using update ensure to select the same container that the item is already created otherwise this will break the uploads and make them unreachable if you are passing no uploads it's safe to leave as null   |
`listenerUUID` | *string* | the listener uuid, from the listener, this ensures that the executor of this action doesn't get a notification, you can pass null for this if this is a computer operation and let every listener to be informed while it doesn't hurt to keep listenerUUID as null, it is expensive to send messages when they will be of no use the listener uuid ensures only those that needs updates will get them   |

**Returns:** *Promise*<[*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md)\>

a total combined table row value that can be converted into graphql

Defined in: [server/cache.ts:628](https://github.com/onzag/itemize/blob/5fcde7cf/server/cache.ts#L628)

___

### requestUpdateSimple

▸ **requestUpdateSimple**(`item`: *string* \| [*default*](base_root_module_itemdefinition.default.md), `id`: *string*, `version`: *string*, `update`: [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md), `dictionary`: *string*, `currentRawValueSQL?`: [*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md)): *Promise*<void\>

Requests an update for an item definition in a simple way
this might have more overhead than the normal request update

#### Parameters:

Name | Type |
:------ | :------ |
`item` | *string* \| [*default*](base_root_module_itemdefinition.default.md) |
`id` | *string* |
`version` | *string* |
`update` | [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md) |
`dictionary` | *string* |
`currentRawValueSQL?` | [*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md) |

**Returns:** *Promise*<void\>

Defined in: [server/cache.ts:570](https://github.com/onzag/itemize/blob/5fcde7cf/server/cache.ts#L570)

___

### requestValue

▸ **requestValue**(`item`: *string* \| [*default*](base_root_module_itemdefinition.default.md), `id`: *string*, `version`: *string*, `options?`: { `refresh?`: *boolean* ; `useMemoryCache?`: *boolean*  }): *Promise*<[*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md)\>

Requests a value from the cache

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`item` | *string* \| [*default*](base_root_module_itemdefinition.default.md) | the item definition or a qualified name   |
`id` | *string* | the id to request for   |
`version` | *string* | the version   |
`options?` | *object* | - |
`options.refresh?` | *boolean* | whether to skip the cache and request directly from the database and update the cache   |
`options.useMemoryCache?` | *boolean* | a total opposite of refresh, (do not use together as refresh beats this one) which will use a 1 second memory cache to retrieve values and store them, use this if you think the value might be used consecutively and you don't care about accuraccy that much   |

**Returns:** *Promise*<[*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md)\>

a whole sql value that can be converted into graphql if necessary

Defined in: [server/cache.ts:1379](https://github.com/onzag/itemize/blob/5fcde7cf/server/cache.ts#L1379)

___

### setListener

▸ **setListener**(`listener`: [*Listener*](server_listener.listener.md)): *void*

Sets the listener for the remote interaction with the clients
that are connected, this listener is what informs the client of updates
the listener is highly related to the cache as it uses pubsub that
comes from redis

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`listener` | [*Listener*](server_listener.listener.md) | the listener    |

**Returns:** *void*

Defined in: [server/cache.ts:101](https://github.com/onzag/itemize/blob/5fcde7cf/server/cache.ts#L101)

___

### setRaw

▸ **setRaw**(`key`: *string*, `value`: *any*): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`key` | *string* |
`value` | *any* |

**Returns:** *Promise*<void\>

Defined in: [server/cache.ts:147](https://github.com/onzag/itemize/blob/5fcde7cf/server/cache.ts#L147)

___

### triggerSearchListenersFor

▸ **triggerSearchListenersFor**(`itemDefinition`: [*default*](base_root_module_itemdefinition.default.md), `createdBy`: *string*, `parent`: { `id`: *string* ; `type`: *string* ; `version`: *string*  }, `record`: [*IGQLSearchRecord*](../interfaces/gql_querier.igqlsearchrecord.md), `location`: *modified* \| *new* \| *lost*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`itemDefinition` | [*default*](base_root_module_itemdefinition.default.md) |
`createdBy` | *string* |
`parent` | *object* |
`parent.id` | *string* |
`parent.type` | *string* |
`parent.version` | *string* |
`record` | [*IGQLSearchRecord*](../interfaces/gql_querier.igqlsearchrecord.md) |
`location` | *modified* \| *new* \| *lost* |

**Returns:** *void*

Defined in: [server/cache.ts:207](https://github.com/onzag/itemize/blob/5fcde7cf/server/cache.ts#L207)

___

### wipe

▸ **wipe**(): *Promise*<void\>

wipes the cache, usually executed on edge cases during connectivity issues
with clusters and nodes, once the connection is restablished with redis
the cache is wiped by the cluster manager which handles the cache

**Returns:** *Promise*<void\>

Defined in: [server/cache.ts:1558](https://github.com/onzag/itemize/blob/5fcde7cf/server/cache.ts#L1558)
