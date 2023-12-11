[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/services/local-storage](../modules/server_services_local_storage.md) / LocalStorageService

# Class: LocalStorageService

[server/services/local-storage](../modules/server_services_local_storage.md).LocalStorageService

## Hierarchy

- [`default`](server_services_base_StorageProvider.default.md)\<``null``\>

  ↳ **`LocalStorageService`**

## Table of contents

### Constructors

- [constructor](server_services_local_storage.LocalStorageService.md#constructor)

### Properties

- [appConfig](server_services_local_storage.LocalStorageService.md#appconfig)
- [appDbConfig](server_services_local_storage.LocalStorageService.md#appdbconfig)
- [appRedisConfig](server_services_local_storage.LocalStorageService.md#appredisconfig)
- [appSensitiveConfig](server_services_local_storage.LocalStorageService.md#appsensitiveconfig)
- [config](server_services_local_storage.LocalStorageService.md#config)
- [globalCustomServices](server_services_local_storage.LocalStorageService.md#globalcustomservices)
- [globalDatabaseConnection](server_services_local_storage.LocalStorageService.md#globaldatabaseconnection)
- [globalInstance](server_services_local_storage.LocalStorageService.md#globalinstance)
- [globalMailProvider](server_services_local_storage.LocalStorageService.md#globalmailprovider)
- [globalPhoneProvider](server_services_local_storage.LocalStorageService.md#globalphoneprovider)
- [globalRawDB](server_services_local_storage.LocalStorageService.md#globalrawdb)
- [globalRedis](server_services_local_storage.LocalStorageService.md#globalredis)
- [globalRedisPub](server_services_local_storage.LocalStorageService.md#globalredispub)
- [globalRedisSub](server_services_local_storage.LocalStorageService.md#globalredissub)
- [globalRoot](server_services_local_storage.LocalStorageService.md#globalroot)
- [id](server_services_local_storage.LocalStorageService.md#id)
- [instanceName](server_services_local_storage.LocalStorageService.md#instancename)
- [localAppData](server_services_local_storage.LocalStorageService.md#localappdata)
- [localInstance](server_services_local_storage.LocalStorageService.md#localinstance)
- [prefix](server_services_local_storage.LocalStorageService.md#prefix)
- [registry](server_services_local_storage.LocalStorageService.md#registry)

### Methods

- [copyFolder](server_services_local_storage.LocalStorageService.md#copyfolder)
- [download](server_services_local_storage.LocalStorageService.md#download)
- [dumpFolder](server_services_local_storage.LocalStorageService.md#dumpfolder)
- [execute](server_services_local_storage.LocalStorageService.md#execute)
- [exists](server_services_local_storage.LocalStorageService.md#exists)
- [expressRouter](server_services_local_storage.LocalStorageService.md#expressrouter)
- [getId](server_services_local_storage.LocalStorageService.md#getid)
- [getInstanceName](server_services_local_storage.LocalStorageService.md#getinstancename)
- [getPrefix](server_services_local_storage.LocalStorageService.md#getprefix)
- [getRouter](server_services_local_storage.LocalStorageService.md#getrouter)
- [getRunCycleTime](server_services_local_storage.LocalStorageService.md#getruncycletime)
- [getTriggerRegistry](server_services_local_storage.LocalStorageService.md#gettriggerregistry)
- [initialize](server_services_local_storage.LocalStorageService.md#initialize)
- [isInstanceGlobal](server_services_local_storage.LocalStorageService.md#isinstanceglobal)
- [isInstanceLocal](server_services_local_storage.LocalStorageService.md#isinstancelocal)
- [logDebug](server_services_local_storage.LocalStorageService.md#logdebug)
- [logError](server_services_local_storage.LocalStorageService.md#logerror)
- [logInfo](server_services_local_storage.LocalStorageService.md#loginfo)
- [read](server_services_local_storage.LocalStorageService.md#read)
- [removeFolder](server_services_local_storage.LocalStorageService.md#removefolder)
- [run](server_services_local_storage.LocalStorageService.md#run)
- [setId](server_services_local_storage.LocalStorageService.md#setid)
- [setInstanceName](server_services_local_storage.LocalStorageService.md#setinstancename)
- [setPrefix](server_services_local_storage.LocalStorageService.md#setprefix)
- [setupGlobalResources](server_services_local_storage.LocalStorageService.md#setupglobalresources)
- [setupLocalResources](server_services_local_storage.LocalStorageService.md#setuplocalresources)
- [upload](server_services_local_storage.LocalStorageService.md#upload)
- [expressRouter](server_services_local_storage.LocalStorageService.md#expressrouter-1)
- [getRouter](server_services_local_storage.LocalStorageService.md#getrouter-1)
- [getTriggerRegistry](server_services_local_storage.LocalStorageService.md#gettriggerregistry-1)
- [getType](server_services_local_storage.LocalStorageService.md#gettype)
- [logDebug](server_services_local_storage.LocalStorageService.md#logdebug-1)
- [logError](server_services_local_storage.LocalStorageService.md#logerror-1)
- [logInfo](server_services_local_storage.LocalStorageService.md#loginfo-1)

## Constructors

### constructor

• **new LocalStorageService**(`config`, `registry`, `configs`): [`LocalStorageService`](server_services_local_storage.LocalStorageService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | ``null`` |
| `registry` | [`RegistryService`](server_services_registry.RegistryService.md) |
| `configs` | `Object` |
| `configs.config` | [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md) |
| `configs.dbConfig` | [`IDBConfigRawJSONDataType`](../interfaces/config.IDBConfigRawJSONDataType.md) |
| `configs.redisConfig` | [`IRedisConfigRawJSONDataType`](../interfaces/config.IRedisConfigRawJSONDataType.md) |
| `configs.sensitiveConfig` | [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md) |

#### Returns

[`LocalStorageService`](server_services_local_storage.LocalStorageService.md)

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[constructor](server_services_base_StorageProvider.default.md#constructor)

#### Defined in

[server/services/index.ts:58](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L58)

## Properties

### appConfig

• **appConfig**: [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md)

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[appConfig](server_services_base_StorageProvider.default.md#appconfig)

#### Defined in

[server/services/index.ts:35](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L35)

___

### appDbConfig

• **appDbConfig**: [`IDBConfigRawJSONDataType`](../interfaces/config.IDBConfigRawJSONDataType.md)

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[appDbConfig](server_services_base_StorageProvider.default.md#appdbconfig)

#### Defined in

[server/services/index.ts:37](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L37)

___

### appRedisConfig

• **appRedisConfig**: [`IRedisConfigRawJSONDataType`](../interfaces/config.IRedisConfigRawJSONDataType.md)

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[appRedisConfig](server_services_base_StorageProvider.default.md#appredisconfig)

#### Defined in

[server/services/index.ts:38](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L38)

___

### appSensitiveConfig

• **appSensitiveConfig**: [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md)

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[appSensitiveConfig](server_services_base_StorageProvider.default.md#appsensitiveconfig)

#### Defined in

[server/services/index.ts:36](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L36)

___

### config

• **config**: ``null``

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[config](server_services_base_StorageProvider.default.md#config)

#### Defined in

[server/services/index.ts:33](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L33)

___

### globalCustomServices

• **globalCustomServices**: `Object`

#### Index signature

▪ [name: `string`]: [`ServiceProvider`](server_services.ServiceProvider.md)\<`any`\>

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[globalCustomServices](server_services_base_StorageProvider.default.md#globalcustomservices)

#### Defined in

[server/services/index.ts:48](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L48)

___

### globalDatabaseConnection

• **globalDatabaseConnection**: [`DatabaseConnection`](database.DatabaseConnection.md)

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[globalDatabaseConnection](server_services_base_StorageProvider.default.md#globaldatabaseconnection)

#### Defined in

[server/services/index.ts:40](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L40)

___

### globalInstance

• **globalInstance**: `boolean` = `false`

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[globalInstance](server_services_base_StorageProvider.default.md#globalinstance)

#### Defined in

[server/services/index.ts:55](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L55)

___

### globalMailProvider

• **globalMailProvider**: [`default`](server_services_base_MailProvider.default.md)\<`any`\>

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[globalMailProvider](server_services_base_StorageProvider.default.md#globalmailprovider)

#### Defined in

[server/services/index.ts:46](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L46)

___

### globalPhoneProvider

• **globalPhoneProvider**: [`default`](server_services_base_PhoneProvider.default.md)\<`any`\>

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[globalPhoneProvider](server_services_base_StorageProvider.default.md#globalphoneprovider)

#### Defined in

[server/services/index.ts:47](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L47)

___

### globalRawDB

• **globalRawDB**: [`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md)

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[globalRawDB](server_services_base_StorageProvider.default.md#globalrawdb)

#### Defined in

[server/services/index.ts:44](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L44)

___

### globalRedis

• **globalRedis**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[globalRedis](server_services_base_StorageProvider.default.md#globalredis)

#### Defined in

[server/services/index.ts:43](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L43)

___

### globalRedisPub

• **globalRedisPub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[globalRedisPub](server_services_base_StorageProvider.default.md#globalredispub)

#### Defined in

[server/services/index.ts:41](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L41)

___

### globalRedisSub

• **globalRedisSub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[globalRedisSub](server_services_base_StorageProvider.default.md#globalredissub)

#### Defined in

[server/services/index.ts:42](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L42)

___

### globalRoot

• **globalRoot**: [`default`](base_Root.default.md)

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[globalRoot](server_services_base_StorageProvider.default.md#globalroot)

#### Defined in

[server/services/index.ts:45](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L45)

___

### id

• **id**: `string`

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[id](server_services_base_StorageProvider.default.md#id)

#### Defined in

[server/services/base/StorageProvider.ts:16](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/StorageProvider.ts#L16)

___

### instanceName

• **instanceName**: `string`

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[instanceName](server_services_base_StorageProvider.default.md#instancename)

#### Defined in

[server/services/index.ts:54](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L54)

___

### localAppData

• **localAppData**: [`IAppDataType`](../interfaces/server.IAppDataType.md)

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[localAppData](server_services_base_StorageProvider.default.md#localappdata)

#### Defined in

[server/services/index.ts:52](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L52)

___

### localInstance

• **localInstance**: `boolean` = `false`

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[localInstance](server_services_base_StorageProvider.default.md#localinstance)

#### Defined in

[server/services/index.ts:56](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L56)

___

### prefix

• **prefix**: `string`

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[prefix](server_services_base_StorageProvider.default.md#prefix)

#### Defined in

[server/services/base/StorageProvider.ts:15](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/StorageProvider.ts#L15)

___

### registry

• **registry**: [`RegistryService`](server_services_registry.RegistryService.md)

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[registry](server_services_base_StorageProvider.default.md#registry)

#### Defined in

[server/services/index.ts:34](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L34)

## Methods

### copyFolder

▸ **copyFolder**(`remotePath`, `targetPath`, `target`): `Promise`\<`void`\>

Should copy a folder from one container to another target container, note that during
calls the target container may be itself, optimize if necessary for such calls

NECESSARY FOR CUSTOM SERVER COPY CALLS TO FUNCTION

#### Parameters

| Name | Type |
| :------ | :------ |
| `remotePath` | `string` |
| `targetPath` | `string` |
| `target` | [`default`](server_services_base_StorageProvider.default.md)\<`any`\> |

#### Returns

`Promise`\<`void`\>

#### Overrides

[default](server_services_base_StorageProvider.default.md).[copyFolder](server_services_base_StorageProvider.default.md#copyfolder)

#### Defined in

[server/services/local-storage.ts:103](https://github.com/onzag/itemize/blob/59702dd5/server/services/local-storage.ts#L103)

___

### download

▸ **download**(`at`): `ReadStream`

This function is necessary for downloading a file

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `at` | `string` | the remote file to download |

#### Returns

`ReadStream`

#### Overrides

[default](server_services_base_StorageProvider.default.md).[download](server_services_base_StorageProvider.default.md#download)

#### Defined in

[server/services/local-storage.ts:40](https://github.com/onzag/itemize/blob/59702dd5/server/services/local-storage.ts#L40)

___

### dumpFolder

▸ **dumpFolder**(`remotePath`, `localPath`): `Promise`\<`void`\>

This function is executed once an entire folder
is requested to be downloaded locally in the given
local path

NECESSARY FOR DUMPING TO FUNCTION

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `remotePath` | `string` | the remote path |
| `localPath` | `string` | the local path |

#### Returns

`Promise`\<`void`\>

#### Overrides

[default](server_services_base_StorageProvider.default.md).[dumpFolder](server_services_base_StorageProvider.default.md#dumpfolder)

#### Defined in

[server/services/local-storage.ts:99](https://github.com/onzag/itemize/blob/59702dd5/server/services/local-storage.ts#L99)

___

### execute

▸ **execute**(): `void`

Performs the execution of the service, basically
it will do the run function and then re-run as specified

#### Returns

`void`

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[execute](server_services_base_StorageProvider.default.md#execute)

#### Defined in

[server/services/index.ts:170](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L170)

___

### exists

▸ **exists**(`at`): `Promise`\<`boolean`\>

It's executed to verify whether a given remote resource
exists

NECESSARY FOR CORE ITEMIZE TO FUNCTION

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `at` | `string` | the resource to check for |

#### Returns

`Promise`\<`boolean`\>

#### Overrides

[default](server_services_base_StorageProvider.default.md).[exists](server_services_base_StorageProvider.default.md#exists)

#### Defined in

[server/services/local-storage.ts:112](https://github.com/onzag/itemize/blob/59702dd5/server/services/local-storage.ts#L112)

___

### expressRouter

▸ **expressRouter**(`options?`): `Router`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `RouterOptions` |

#### Returns

`Router`

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[expressRouter](server_services_base_StorageProvider.default.md#expressrouter)

#### Defined in

[server/services/index.ts:116](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L116)

___

### getId

▸ **getId**(): `string`

#### Returns

`string`

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[getId](server_services_base_StorageProvider.default.md#getid)

#### Defined in

[server/services/base/StorageProvider.ts:30](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/StorageProvider.ts#L30)

___

### getInstanceName

▸ **getInstanceName**(): `string`

#### Returns

`string`

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[getInstanceName](server_services_base_StorageProvider.default.md#getinstancename)

#### Defined in

[server/services/index.ts:80](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L80)

___

### getPrefix

▸ **getPrefix**(): `string`

#### Returns

`string`

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[getPrefix](server_services_base_StorageProvider.default.md#getprefix)

#### Defined in

[server/services/base/StorageProvider.ts:26](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/StorageProvider.ts#L26)

___

### getRouter

▸ **getRouter**(`appData`): `Router` \| `Promise`\<`Router`\>

Provides a router endpoint, the router endpoint
will exist directly under the rest services
this enables to create webhooks and other subservices
that are attached to this service

If the service provider if executed on a global environment
the endpoint does not get created, this means that in the global
manager this won't be executed, or anything that is meant
for the global manager

The router gets attached to /rest/service

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |

#### Returns

`Router` \| `Promise`\<`Router`\>

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[getRouter](server_services_base_StorageProvider.default.md#getrouter)

#### Defined in

[server/services/index.ts:266](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L266)

___

### getRunCycleTime

▸ **getRunCycleTime**(): `number`

Determines whether the run function
should run over again

#### Returns

`number`

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[getRunCycleTime](server_services_base_StorageProvider.default.md#getruncycletime)

#### Defined in

[server/services/index.ts:239](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L239)

___

### getTriggerRegistry

▸ **getTriggerRegistry**(): [`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md) \| `Promise`\<[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md)\>

Allows to setup trigger registries via the service
so that they trigger just as normal trigger will do

#### Returns

[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md) \| `Promise`\<[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md)\>

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[getTriggerRegistry](server_services_base_StorageProvider.default.md#gettriggerregistry)

#### Defined in

[server/services/index.ts:293](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L293)

___

### initialize

▸ **initialize**(): `void` \| `Promise`\<`void`\>

This function is executed during
the initialization of the service

If your service is a global service you will
have access to the global resources while
this function executes

#### Returns

`void` \| `Promise`\<`void`\>

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[initialize](server_services_base_StorageProvider.default.md#initialize)

#### Defined in

[server/services/index.ts:230](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L230)

___

### isInstanceGlobal

▸ **isInstanceGlobal**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[isInstanceGlobal](server_services_base_StorageProvider.default.md#isinstanceglobal)

#### Defined in

[server/services/index.ts:84](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L84)

___

### isInstanceLocal

▸ **isInstanceLocal**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[isInstanceLocal](server_services_base_StorageProvider.default.md#isinstancelocal)

#### Defined in

[server/services/index.ts:88](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L88)

___

### logDebug

▸ **logDebug**\<`T`\>(`data`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`IItemizeLoggingStructure`](../interfaces/server_logger.IItemizeLoggingStructure.md)\<`T`\> |

#### Returns

`void`

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[logDebug](server_services_base_StorageProvider.default.md#logdebug)

#### Defined in

[server/services/index.ts:96](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L96)

___

### logError

▸ **logError**\<`T`\>(`data`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`IItemizeLoggingErrorStructure`](../interfaces/server_logger.IItemizeLoggingErrorStructure.md)\<`T`\> |

#### Returns

`void`

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[logError](server_services_base_StorageProvider.default.md#logerror)

#### Defined in

[server/services/index.ts:100](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L100)

___

### logInfo

▸ **logInfo**\<`T`\>(`data`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`IItemizeLoggingStructure`](../interfaces/server_logger.IItemizeLoggingStructure.md)\<`T`\> |

#### Returns

`void`

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[logInfo](server_services_base_StorageProvider.default.md#loginfo)

#### Defined in

[server/services/index.ts:92](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L92)

___

### read

▸ **read**(`at`): `Promise`\<`string`\>

It's executed to read files

NECESSARY FOR SEO TO FUNCTION

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `at` | `string` | the file to read |

#### Returns

`Promise`\<`string`\>

#### Overrides

[default](server_services_base_StorageProvider.default.md).[read](server_services_base_StorageProvider.default.md#read)

#### Defined in

[server/services/local-storage.ts:135](https://github.com/onzag/itemize/blob/59702dd5/server/services/local-storage.ts#L135)

___

### removeFolder

▸ **removeFolder**(`at`): `Promise`\<`void`\>

This function is executed once a folder
removal is requested

NECESSARY FOR CORE ITEMIZE TO FUNCTION

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `at` | `string` | the remote folder to remove |

#### Returns

`Promise`\<`void`\>

#### Overrides

[default](server_services_base_StorageProvider.default.md).[removeFolder](server_services_base_StorageProvider.default.md#removefolder)

#### Defined in

[server/services/local-storage.ts:70](https://github.com/onzag/itemize/blob/59702dd5/server/services/local-storage.ts#L70)

___

### run

▸ **run**(): `void` \| `Promise`\<`void`\>

Executes some code

#### Returns

`void` \| `Promise`\<`void`\>

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[run](server_services_base_StorageProvider.default.md#run)

#### Defined in

[server/services/index.ts:247](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L247)

___

### setId

▸ **setId**(`id`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`void`

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[setId](server_services_base_StorageProvider.default.md#setid)

#### Defined in

[server/services/base/StorageProvider.ts:22](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/StorageProvider.ts#L22)

___

### setInstanceName

▸ **setInstanceName**(`n`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `string` |

#### Returns

`void`

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[setInstanceName](server_services_base_StorageProvider.default.md#setinstancename)

#### Defined in

[server/services/index.ts:76](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L76)

___

### setPrefix

▸ **setPrefix**(`prefix`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prefix` | `string` |

#### Returns

`void`

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[setPrefix](server_services_base_StorageProvider.default.md#setprefix)

#### Defined in

[server/services/base/StorageProvider.ts:18](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/StorageProvider.ts#L18)

___

### setupGlobalResources

▸ **setupGlobalResources**(`globalDatabaseConnection`, `globalClient`, `globalPub`, `globalSub`, `globalMailProvider`, `globalPhoneProvider`, `globalCustomServices`, `root`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `globalDatabaseConnection` | [`DatabaseConnection`](database.DatabaseConnection.md) |
| `globalClient` | [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md) |
| `globalPub` | [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md) |
| `globalSub` | [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md) |
| `globalMailProvider` | [`default`](server_services_base_MailProvider.default.md)\<`any`\> |
| `globalPhoneProvider` | [`default`](server_services_base_PhoneProvider.default.md)\<`any`\> |
| `globalCustomServices` | `Object` |
| `root` | [`default`](base_Root.default.md) |

#### Returns

`void`

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[setupGlobalResources](server_services_base_StorageProvider.default.md#setupglobalresources)

#### Defined in

[server/services/index.ts:124](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L124)

___

### setupLocalResources

▸ **setupLocalResources**(`appData`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |

#### Returns

`void`

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[setupLocalResources](server_services_base_StorageProvider.default.md#setuplocalresources)

#### Defined in

[server/services/index.ts:148](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L148)

___

### upload

▸ **upload**(`at`, `readStream`): `Promise`\<`void`\>

This function is executed when the service
uploading a read stream

NECESSARY FOR CORE ITEMIZE TO FUNCTION

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `at` | `string` | the remote file to use |
| `readStream` | `ReadStream` | the stream to read from |

#### Returns

`Promise`\<`void`\>

#### Overrides

[default](server_services_base_StorageProvider.default.md).[upload](server_services_base_StorageProvider.default.md#upload)

#### Defined in

[server/services/local-storage.ts:45](https://github.com/onzag/itemize/blob/59702dd5/server/services/local-storage.ts#L45)

___

### expressRouter

▸ **expressRouter**(`options?`): `Router`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `RouterOptions` |

#### Returns

`Router`

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[expressRouter](server_services_base_StorageProvider.default.md#expressrouter-1)

#### Defined in

[server/services/index.ts:120](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L120)

___

### getRouter

▸ **getRouter**(`appData`): `Router` \| `Promise`\<`Router`\>

Provides a router endpoint, but this method
is static, which means it only gets added once

If the service provider if executed on a global environment
the endpoint does not get created, this means that in the global
manager this won't be executed, or anything that is meant
for the global manager

the router gets attached to /rest/service

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |

#### Returns

`Router` \| `Promise`\<`Router`\>

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[getRouter](server_services_base_StorageProvider.default.md#getrouter-1)

#### Defined in

[server/services/index.ts:283](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L283)

___

### getTriggerRegistry

▸ **getTriggerRegistry**(): [`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md) \| `Promise`\<[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md)\>

Allows to setup trigger registries via the service
so that they trigger just as normal trigger will do

This gets attached if a class is used rather than per instance

#### Returns

[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md) \| `Promise`\<[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md)\>

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[getTriggerRegistry](server_services_base_StorageProvider.default.md#gettriggerregistry-1)

#### Defined in

[server/services/index.ts:305](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L305)

___

### getType

▸ **getType**(): [`ServiceProviderType`](../enums/server_services.ServiceProviderType.md)

Specifies whether the current service is a global service
if true global services will only execute initialize and a router
will not be extracted from them

it will instead have access to the global resources

#### Returns

[`ServiceProviderType`](../enums/server_services.ServiceProviderType.md)

#### Overrides

[default](server_services_base_StorageProvider.default.md).[getType](server_services_base_StorageProvider.default.md#gettype)

#### Defined in

[server/services/local-storage.ts:36](https://github.com/onzag/itemize/blob/59702dd5/server/services/local-storage.ts#L36)

___

### logDebug

▸ **logDebug**\<`T`\>(`data`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`IItemizeLoggingStructure`](../interfaces/server_logger.IItemizeLoggingStructure.md)\<`T`\> |

#### Returns

`void`

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[logDebug](server_services_base_StorageProvider.default.md#logdebug-1)

#### Defined in

[server/services/index.ts:108](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L108)

___

### logError

▸ **logError**\<`T`\>(`data`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`IItemizeLoggingErrorStructure`](../interfaces/server_logger.IItemizeLoggingErrorStructure.md)\<`T`\> |

#### Returns

`void`

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[logError](server_services_base_StorageProvider.default.md#logerror-1)

#### Defined in

[server/services/index.ts:112](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L112)

___

### logInfo

▸ **logInfo**\<`T`\>(`data`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`IItemizeLoggingStructure`](../interfaces/server_logger.IItemizeLoggingStructure.md)\<`T`\> |

#### Returns

`void`

#### Inherited from

[default](server_services_base_StorageProvider.default.md).[logInfo](server_services_base_StorageProvider.default.md#loginfo-1)

#### Defined in

[server/services/index.ts:104](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L104)
