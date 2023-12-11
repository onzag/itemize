[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/services/elastic-logger](../modules/server_services_elastic_logger.md) / ElasticLoggerService

# Class: ElasticLoggerService

[server/services/elastic-logger](../modules/server_services_elastic_logger.md).ElasticLoggerService

The PhoneProvider class is a service that provides SMS
functionality to the itemize server side app

The LoggingProvider class is a special class, and does not support
global mode, even if specified

## Hierarchy

- [`default`](server_services_base_LoggingProvider.default.md)\<``null``\>

  ↳ **`ElasticLoggerService`**

## Table of contents

### Constructors

- [constructor](server_services_elastic_logger.ElasticLoggerService.md#constructor)

### Properties

- [appConfig](server_services_elastic_logger.ElasticLoggerService.md#appconfig)
- [appDbConfig](server_services_elastic_logger.ElasticLoggerService.md#appdbconfig)
- [appRedisConfig](server_services_elastic_logger.ElasticLoggerService.md#appredisconfig)
- [appSensitiveConfig](server_services_elastic_logger.ElasticLoggerService.md#appsensitiveconfig)
- [config](server_services_elastic_logger.ElasticLoggerService.md#config)
- [elastic](server_services_elastic_logger.ElasticLoggerService.md#elastic)
- [globalCustomServices](server_services_elastic_logger.ElasticLoggerService.md#globalcustomservices)
- [globalDatabaseConnection](server_services_elastic_logger.ElasticLoggerService.md#globaldatabaseconnection)
- [globalInstance](server_services_elastic_logger.ElasticLoggerService.md#globalinstance)
- [globalMailProvider](server_services_elastic_logger.ElasticLoggerService.md#globalmailprovider)
- [globalPhoneProvider](server_services_elastic_logger.ElasticLoggerService.md#globalphoneprovider)
- [globalRawDB](server_services_elastic_logger.ElasticLoggerService.md#globalrawdb)
- [globalRedis](server_services_elastic_logger.ElasticLoggerService.md#globalredis)
- [globalRedisPub](server_services_elastic_logger.ElasticLoggerService.md#globalredispub)
- [globalRedisSub](server_services_elastic_logger.ElasticLoggerService.md#globalredissub)
- [globalRoot](server_services_elastic_logger.ElasticLoggerService.md#globalroot)
- [instanceName](server_services_elastic_logger.ElasticLoggerService.md#instancename)
- [localAppData](server_services_elastic_logger.ElasticLoggerService.md#localappdata)
- [localInstance](server_services_elastic_logger.ElasticLoggerService.md#localinstance)
- [registry](server_services_elastic_logger.ElasticLoggerService.md#registry)

### Methods

- [clearLogsOf](server_services_elastic_logger.ElasticLoggerService.md#clearlogsof)
- [execute](server_services_elastic_logger.ElasticLoggerService.md#execute)
- [expressRouter](server_services_elastic_logger.ElasticLoggerService.md#expressrouter)
- [getInstanceName](server_services_elastic_logger.ElasticLoggerService.md#getinstancename)
- [getLogsInstanceIds](server_services_elastic_logger.ElasticLoggerService.md#getlogsinstanceids)
- [getLogsOf](server_services_elastic_logger.ElasticLoggerService.md#getlogsof)
- [getRouter](server_services_elastic_logger.ElasticLoggerService.md#getrouter)
- [getRunCycleTime](server_services_elastic_logger.ElasticLoggerService.md#getruncycletime)
- [getTriggerRegistry](server_services_elastic_logger.ElasticLoggerService.md#gettriggerregistry)
- [initialize](server_services_elastic_logger.ElasticLoggerService.md#initialize)
- [isInstanceGlobal](server_services_elastic_logger.ElasticLoggerService.md#isinstanceglobal)
- [isInstanceLocal](server_services_elastic_logger.ElasticLoggerService.md#isinstancelocal)
- [log](server_services_elastic_logger.ElasticLoggerService.md#log)
- [logDebug](server_services_elastic_logger.ElasticLoggerService.md#logdebug)
- [logError](server_services_elastic_logger.ElasticLoggerService.md#logerror)
- [logInfo](server_services_elastic_logger.ElasticLoggerService.md#loginfo)
- [logToFallback](server_services_elastic_logger.ElasticLoggerService.md#logtofallback)
- [run](server_services_elastic_logger.ElasticLoggerService.md#run)
- [setInstanceName](server_services_elastic_logger.ElasticLoggerService.md#setinstancename)
- [setupGlobalResources](server_services_elastic_logger.ElasticLoggerService.md#setupglobalresources)
- [setupLocalResources](server_services_elastic_logger.ElasticLoggerService.md#setuplocalresources)
- [expressRouter](server_services_elastic_logger.ElasticLoggerService.md#expressrouter-1)
- [getRouter](server_services_elastic_logger.ElasticLoggerService.md#getrouter-1)
- [getTriggerRegistry](server_services_elastic_logger.ElasticLoggerService.md#gettriggerregistry-1)
- [getType](server_services_elastic_logger.ElasticLoggerService.md#gettype)
- [logDebug](server_services_elastic_logger.ElasticLoggerService.md#logdebug-1)
- [logError](server_services_elastic_logger.ElasticLoggerService.md#logerror-1)
- [logInfo](server_services_elastic_logger.ElasticLoggerService.md#loginfo-1)

## Constructors

### constructor

• **new ElasticLoggerService**(`config`, `registry`, `configs`): [`ElasticLoggerService`](server_services_elastic_logger.ElasticLoggerService.md)

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

[`ElasticLoggerService`](server_services_elastic_logger.ElasticLoggerService.md)

#### Inherited from

[default](server_services_base_LoggingProvider.default.md).[constructor](server_services_base_LoggingProvider.default.md#constructor)

#### Defined in

[server/services/base/LoggingProvider.ts:50](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/LoggingProvider.ts#L50)

## Properties

### appConfig

• **appConfig**: [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md)

#### Inherited from

[default](server_services_base_LoggingProvider.default.md).[appConfig](server_services_base_LoggingProvider.default.md#appconfig)

#### Defined in

[server/services/index.ts:35](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L35)

___

### appDbConfig

• **appDbConfig**: [`IDBConfigRawJSONDataType`](../interfaces/config.IDBConfigRawJSONDataType.md)

#### Inherited from

[default](server_services_base_LoggingProvider.default.md).[appDbConfig](server_services_base_LoggingProvider.default.md#appdbconfig)

#### Defined in

[server/services/index.ts:37](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L37)

___

### appRedisConfig

• **appRedisConfig**: [`IRedisConfigRawJSONDataType`](../interfaces/config.IRedisConfigRawJSONDataType.md)

#### Inherited from

[default](server_services_base_LoggingProvider.default.md).[appRedisConfig](server_services_base_LoggingProvider.default.md#appredisconfig)

#### Defined in

[server/services/index.ts:38](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L38)

___

### appSensitiveConfig

• **appSensitiveConfig**: [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md)

#### Inherited from

[default](server_services_base_LoggingProvider.default.md).[appSensitiveConfig](server_services_base_LoggingProvider.default.md#appsensitiveconfig)

#### Defined in

[server/services/index.ts:36](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L36)

___

### config

• **config**: ``null``

#### Inherited from

[default](server_services_base_LoggingProvider.default.md).[config](server_services_base_LoggingProvider.default.md#config)

#### Defined in

[server/services/index.ts:33](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L33)

___

### elastic

• `Private` **elastic**: `default`

#### Defined in

[server/services/elastic-logger.ts:16](https://github.com/onzag/itemize/blob/59702dd5/server/services/elastic-logger.ts#L16)

___

### globalCustomServices

• **globalCustomServices**: `Object`

#### Index signature

▪ [name: `string`]: [`ServiceProvider`](server_services.ServiceProvider.md)\<`any`\>

#### Inherited from

[default](server_services_base_LoggingProvider.default.md).[globalCustomServices](server_services_base_LoggingProvider.default.md#globalcustomservices)

#### Defined in

[server/services/index.ts:48](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L48)

___

### globalDatabaseConnection

• **globalDatabaseConnection**: [`DatabaseConnection`](database.DatabaseConnection.md)

#### Inherited from

[default](server_services_base_LoggingProvider.default.md).[globalDatabaseConnection](server_services_base_LoggingProvider.default.md#globaldatabaseconnection)

#### Defined in

[server/services/index.ts:40](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L40)

___

### globalInstance

• **globalInstance**: `boolean` = `false`

#### Inherited from

[default](server_services_base_LoggingProvider.default.md).[globalInstance](server_services_base_LoggingProvider.default.md#globalinstance)

#### Defined in

[server/services/index.ts:55](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L55)

___

### globalMailProvider

• **globalMailProvider**: [`default`](server_services_base_MailProvider.default.md)\<`any`\>

#### Inherited from

[default](server_services_base_LoggingProvider.default.md).[globalMailProvider](server_services_base_LoggingProvider.default.md#globalmailprovider)

#### Defined in

[server/services/index.ts:46](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L46)

___

### globalPhoneProvider

• **globalPhoneProvider**: [`default`](server_services_base_PhoneProvider.default.md)\<`any`\>

#### Inherited from

[default](server_services_base_LoggingProvider.default.md).[globalPhoneProvider](server_services_base_LoggingProvider.default.md#globalphoneprovider)

#### Defined in

[server/services/index.ts:47](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L47)

___

### globalRawDB

• **globalRawDB**: [`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md)

#### Inherited from

[default](server_services_base_LoggingProvider.default.md).[globalRawDB](server_services_base_LoggingProvider.default.md#globalrawdb)

#### Defined in

[server/services/index.ts:44](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L44)

___

### globalRedis

• **globalRedis**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[default](server_services_base_LoggingProvider.default.md).[globalRedis](server_services_base_LoggingProvider.default.md#globalredis)

#### Defined in

[server/services/index.ts:43](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L43)

___

### globalRedisPub

• **globalRedisPub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[default](server_services_base_LoggingProvider.default.md).[globalRedisPub](server_services_base_LoggingProvider.default.md#globalredispub)

#### Defined in

[server/services/index.ts:41](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L41)

___

### globalRedisSub

• **globalRedisSub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[default](server_services_base_LoggingProvider.default.md).[globalRedisSub](server_services_base_LoggingProvider.default.md#globalredissub)

#### Defined in

[server/services/index.ts:42](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L42)

___

### globalRoot

• **globalRoot**: [`default`](base_Root.default.md)

#### Inherited from

[default](server_services_base_LoggingProvider.default.md).[globalRoot](server_services_base_LoggingProvider.default.md#globalroot)

#### Defined in

[server/services/index.ts:45](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L45)

___

### instanceName

• **instanceName**: `string`

#### Inherited from

[default](server_services_base_LoggingProvider.default.md).[instanceName](server_services_base_LoggingProvider.default.md#instancename)

#### Defined in

[server/services/index.ts:54](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L54)

___

### localAppData

• **localAppData**: [`IAppDataType`](../interfaces/server.IAppDataType.md)

#### Inherited from

[default](server_services_base_LoggingProvider.default.md).[localAppData](server_services_base_LoggingProvider.default.md#localappdata)

#### Defined in

[server/services/index.ts:52](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L52)

___

### localInstance

• **localInstance**: `boolean` = `false`

#### Inherited from

[default](server_services_base_LoggingProvider.default.md).[localInstance](server_services_base_LoggingProvider.default.md#localinstance)

#### Defined in

[server/services/index.ts:56](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L56)

___

### registry

• **registry**: [`RegistryService`](server_services_registry.RegistryService.md)

#### Inherited from

[default](server_services_base_LoggingProvider.default.md).[registry](server_services_base_LoggingProvider.default.md#registry)

#### Defined in

[server/services/index.ts:34](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L34)

## Methods

### clearLogsOf

▸ **clearLogsOf**(`instanceId`): `Promise`\<``"OK"`` \| ``"ERROR"`` \| ``"NOT_AUTHORIZED"``\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `instanceId` | `string` |

#### Returns

`Promise`\<``"OK"`` \| ``"ERROR"`` \| ``"NOT_AUTHORIZED"``\>

#### Overrides

[default](server_services_base_LoggingProvider.default.md).[clearLogsOf](server_services_base_LoggingProvider.default.md#clearlogsof)

#### Defined in

[server/services/elastic-logger.ts:115](https://github.com/onzag/itemize/blob/59702dd5/server/services/elastic-logger.ts#L115)

___

### execute

▸ **execute**(): `void`

Performs the execution of the service, basically
it will do the run function and then re-run as specified

#### Returns

`void`

#### Inherited from

[default](server_services_base_LoggingProvider.default.md).[execute](server_services_base_LoggingProvider.default.md#execute)

#### Defined in

[server/services/index.ts:170](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L170)

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

[default](server_services_base_LoggingProvider.default.md).[expressRouter](server_services_base_LoggingProvider.default.md#expressrouter)

#### Defined in

[server/services/index.ts:116](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L116)

___

### getInstanceName

▸ **getInstanceName**(): `string`

#### Returns

`string`

#### Inherited from

[default](server_services_base_LoggingProvider.default.md).[getInstanceName](server_services_base_LoggingProvider.default.md#getinstancename)

#### Defined in

[server/services/index.ts:80](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L80)

___

### getLogsInstanceIds

▸ **getLogsInstanceIds**(): `Promise`\<`string`[]\>

#### Returns

`Promise`\<`string`[]\>

#### Overrides

[default](server_services_base_LoggingProvider.default.md).[getLogsInstanceIds](server_services_base_LoggingProvider.default.md#getlogsinstanceids)

#### Defined in

[server/services/elastic-logger.ts:97](https://github.com/onzag/itemize/blob/59702dd5/server/services/elastic-logger.ts#L97)

___

### getLogsOf

▸ **getLogsOf**(`instanceId`, `level`, `fromDate`, `toDate`): `Promise`\<[`ILogsResult`](../interfaces/server_services_base_LoggingProvider.ILogsResult.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `instanceId` | `string` |
| `level` | ``"info"`` \| ``"error"`` |
| `fromDate` | `Date` |
| `toDate` | `Date` |

#### Returns

`Promise`\<[`ILogsResult`](../interfaces/server_services_base_LoggingProvider.ILogsResult.md)\>

#### Overrides

[default](server_services_base_LoggingProvider.default.md).[getLogsOf](server_services_base_LoggingProvider.default.md#getlogsof)

#### Defined in

[server/services/elastic-logger.ts:131](https://github.com/onzag/itemize/blob/59702dd5/server/services/elastic-logger.ts#L131)

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

[default](server_services_base_LoggingProvider.default.md).[getRouter](server_services_base_LoggingProvider.default.md#getrouter)

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

[default](server_services_base_LoggingProvider.default.md).[getRunCycleTime](server_services_base_LoggingProvider.default.md#getruncycletime)

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

[default](server_services_base_LoggingProvider.default.md).[getTriggerRegistry](server_services_base_LoggingProvider.default.md#gettriggerregistry)

#### Defined in

[server/services/index.ts:293](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L293)

___

### initialize

▸ **initialize**(): `Promise`\<`void`\>

This function is executed during
the initialization of the service

If your service is a global service you will
have access to the global resources while
this function executes

#### Returns

`Promise`\<`void`\>

#### Overrides

[default](server_services_base_LoggingProvider.default.md).[initialize](server_services_base_LoggingProvider.default.md#initialize)

#### Defined in

[server/services/elastic-logger.ts:18](https://github.com/onzag/itemize/blob/59702dd5/server/services/elastic-logger.ts#L18)

___

### isInstanceGlobal

▸ **isInstanceGlobal**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[default](server_services_base_LoggingProvider.default.md).[isInstanceGlobal](server_services_base_LoggingProvider.default.md#isinstanceglobal)

#### Defined in

[server/services/index.ts:84](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L84)

___

### isInstanceLocal

▸ **isInstanceLocal**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[default](server_services_base_LoggingProvider.default.md).[isInstanceLocal](server_services_base_LoggingProvider.default.md#isinstancelocal)

#### Defined in

[server/services/index.ts:88](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L88)

___

### log

▸ **log**(`instanceId`, `level`, `data`): `Promise`\<`void`\>

The function that is executed to log the messages

This function is allowed to return an error in case it failed to log
as when done so the fallback file will be used until the connection
is restored

#### Parameters

| Name | Type |
| :------ | :------ |
| `instanceId` | `string` |
| `level` | `string` |
| `data` | [`IItemizeFinalLoggingObject`](../interfaces/server_logger.IItemizeFinalLoggingObject.md) |

#### Returns

`Promise`\<`void`\>

#### Overrides

[default](server_services_base_LoggingProvider.default.md).[log](server_services_base_LoggingProvider.default.md#log)

#### Defined in

[server/services/elastic-logger.ts:88](https://github.com/onzag/itemize/blob/59702dd5/server/services/elastic-logger.ts#L88)

___

### logDebug

▸ **logDebug**(): `void`

#### Returns

`void`

#### Inherited from

[default](server_services_base_LoggingProvider.default.md).[logDebug](server_services_base_LoggingProvider.default.md#logdebug)

#### Defined in

[server/services/base/LoggingProvider.ts:66](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/LoggingProvider.ts#L66)

___

### logError

▸ **logError**(): `void`

#### Returns

`void`

#### Inherited from

[default](server_services_base_LoggingProvider.default.md).[logError](server_services_base_LoggingProvider.default.md#logerror)

#### Defined in

[server/services/base/LoggingProvider.ts:71](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/LoggingProvider.ts#L71)

___

### logInfo

▸ **logInfo**(): `void`

#### Returns

`void`

#### Inherited from

[default](server_services_base_LoggingProvider.default.md).[logInfo](server_services_base_LoggingProvider.default.md#loginfo)

#### Defined in

[server/services/base/LoggingProvider.ts:76](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/LoggingProvider.ts#L76)

___

### logToFallback

▸ **logToFallback**(`err`, `instanceId`, `level`, `data`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `instanceId` | `string` |
| `level` | ``"info"`` \| ``"error"`` |
| `data` | [`IItemizeFinalLoggingObject`](../interfaces/server_logger.IItemizeFinalLoggingObject.md) |

#### Returns

`Promise`\<`void`\>

#### Inherited from

[default](server_services_base_LoggingProvider.default.md).[logToFallback](server_services_base_LoggingProvider.default.md#logtofallback)

#### Defined in

[server/services/base/LoggingProvider.ts:96](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/LoggingProvider.ts#L96)

___

### run

▸ **run**(): `void` \| `Promise`\<`void`\>

Executes some code

#### Returns

`void` \| `Promise`\<`void`\>

#### Inherited from

[default](server_services_base_LoggingProvider.default.md).[run](server_services_base_LoggingProvider.default.md#run)

#### Defined in

[server/services/index.ts:247](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L247)

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

[default](server_services_base_LoggingProvider.default.md).[setInstanceName](server_services_base_LoggingProvider.default.md#setinstancename)

#### Defined in

[server/services/index.ts:76](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L76)

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

[default](server_services_base_LoggingProvider.default.md).[setupGlobalResources](server_services_base_LoggingProvider.default.md#setupglobalresources)

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

[default](server_services_base_LoggingProvider.default.md).[setupLocalResources](server_services_base_LoggingProvider.default.md#setuplocalresources)

#### Defined in

[server/services/index.ts:148](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L148)

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

[default](server_services_base_LoggingProvider.default.md).[expressRouter](server_services_base_LoggingProvider.default.md#expressrouter-1)

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

[default](server_services_base_LoggingProvider.default.md).[getRouter](server_services_base_LoggingProvider.default.md#getrouter-1)

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

[default](server_services_base_LoggingProvider.default.md).[getTriggerRegistry](server_services_base_LoggingProvider.default.md#gettriggerregistry-1)

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

#### Inherited from

[default](server_services_base_LoggingProvider.default.md).[getType](server_services_base_LoggingProvider.default.md#gettype)

#### Defined in

[server/services/base/LoggingProvider.ts:46](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/LoggingProvider.ts#L46)

___

### logDebug

▸ **logDebug**(): `void`

#### Returns

`void`

#### Inherited from

[default](server_services_base_LoggingProvider.default.md).[logDebug](server_services_base_LoggingProvider.default.md#logdebug-1)

#### Defined in

[server/services/base/LoggingProvider.ts:81](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/LoggingProvider.ts#L81)

___

### logError

▸ **logError**(): `void`

#### Returns

`void`

#### Inherited from

[default](server_services_base_LoggingProvider.default.md).[logError](server_services_base_LoggingProvider.default.md#logerror-1)

#### Defined in

[server/services/base/LoggingProvider.ts:86](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/LoggingProvider.ts#L86)

___

### logInfo

▸ **logInfo**(): `void`

#### Returns

`void`

#### Inherited from

[default](server_services_base_LoggingProvider.default.md).[logInfo](server_services_base_LoggingProvider.default.md#loginfo-1)

#### Defined in

[server/services/base/LoggingProvider.ts:91](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/LoggingProvider.ts#L91)
