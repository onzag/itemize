[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/services/base/USSDProvider](../modules/server_services_base_USSDProvider.md) / default

# Class: default\<T\>

[server/services/base/USSDProvider](../modules/server_services_base_USSDProvider.md).default

The PhoneProvider class is a service that provides SMS
functionality to the itemize server side app

The LoggingProvider class is a special class, and does not support
global mode, even if specified

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`ServiceProvider`](server_services.ServiceProvider.md)\<`T`\>

  ↳ **`default`**

  ↳↳ [`FakeUSSDService`](server_services_fake_ussd.FakeUSSDService.md)

## Table of contents

### Constructors

- [constructor](server_services_base_USSDProvider.default.md#constructor)

### Properties

- [appConfig](server_services_base_USSDProvider.default.md#appconfig)
- [appDbConfig](server_services_base_USSDProvider.default.md#appdbconfig)
- [appRedisConfig](server_services_base_USSDProvider.default.md#appredisconfig)
- [appSensitiveConfig](server_services_base_USSDProvider.default.md#appsensitiveconfig)
- [config](server_services_base_USSDProvider.default.md#config)
- [globalCustomServices](server_services_base_USSDProvider.default.md#globalcustomservices)
- [globalDatabaseConnection](server_services_base_USSDProvider.default.md#globaldatabaseconnection)
- [globalInstance](server_services_base_USSDProvider.default.md#globalinstance)
- [globalMailProvider](server_services_base_USSDProvider.default.md#globalmailprovider)
- [globalPhoneProvider](server_services_base_USSDProvider.default.md#globalphoneprovider)
- [globalRawDB](server_services_base_USSDProvider.default.md#globalrawdb)
- [globalRedis](server_services_base_USSDProvider.default.md#globalredis)
- [globalRedisPub](server_services_base_USSDProvider.default.md#globalredispub)
- [globalRedisSub](server_services_base_USSDProvider.default.md#globalredissub)
- [globalRoot](server_services_base_USSDProvider.default.md#globalroot)
- [instanceName](server_services_base_USSDProvider.default.md#instancename)
- [localAppData](server_services_base_USSDProvider.default.md#localappdata)
- [localInstance](server_services_base_USSDProvider.default.md#localinstance)
- [paginatorNext](server_services_base_USSDProvider.default.md#paginatornext)
- [paginatorNextNumericId](server_services_base_USSDProvider.default.md#paginatornextnumericid)
- [paginatorNextReverse](server_services_base_USSDProvider.default.md#paginatornextreverse)
- [paginatorPrev](server_services_base_USSDProvider.default.md#paginatorprev)
- [paginatorPrevNumericId](server_services_base_USSDProvider.default.md#paginatorprevnumericid)
- [paginatorPrevReverse](server_services_base_USSDProvider.default.md#paginatorprevreverse)
- [paginatorSeparator](server_services_base_USSDProvider.default.md#paginatorseparator)
- [registry](server_services_base_USSDProvider.default.md#registry)
- [separator](server_services_base_USSDProvider.default.md#separator)
- [sessions](server_services_base_USSDProvider.default.md#sessions)
- [sessionsTimeouts](server_services_base_USSDProvider.default.md#sessionstimeouts)
- [splitSize](server_services_base_USSDProvider.default.md#splitsize)
- [unattendedSessionExpiresTime](server_services_base_USSDProvider.default.md#unattendedsessionexpirestime)
- [wordSplitter](server_services_base_USSDProvider.default.md#wordsplitter)

### Methods

- [continueSession](server_services_base_USSDProvider.default.md#continuesession)
- [endSession](server_services_base_USSDProvider.default.md#endsession)
- [execute](server_services_base_USSDProvider.default.md#execute)
- [expressRouter](server_services_base_USSDProvider.default.md#expressrouter)
- [formatter](server_services_base_USSDProvider.default.md#formatter)
- [getInstanceName](server_services_base_USSDProvider.default.md#getinstancename)
- [getRouter](server_services_base_USSDProvider.default.md#getrouter)
- [getRunCycleTime](server_services_base_USSDProvider.default.md#getruncycletime)
- [getTriggerRegistry](server_services_base_USSDProvider.default.md#gettriggerregistry)
- [hasSession](server_services_base_USSDProvider.default.md#hassession)
- [initialize](server_services_base_USSDProvider.default.md#initialize)
- [isInstanceGlobal](server_services_base_USSDProvider.default.md#isinstanceglobal)
- [isInstanceLocal](server_services_base_USSDProvider.default.md#isinstancelocal)
- [logDebug](server_services_base_USSDProvider.default.md#logdebug)
- [logError](server_services_base_USSDProvider.default.md#logerror)
- [logInfo](server_services_base_USSDProvider.default.md#loginfo)
- [run](server_services_base_USSDProvider.default.md#run)
- [setInstanceName](server_services_base_USSDProvider.default.md#setinstancename)
- [setupGlobalResources](server_services_base_USSDProvider.default.md#setupglobalresources)
- [setupLocalResources](server_services_base_USSDProvider.default.md#setuplocalresources)
- [splitter](server_services_base_USSDProvider.default.md#splitter)
- [startSession](server_services_base_USSDProvider.default.md#startsession)
- [expressRouter](server_services_base_USSDProvider.default.md#expressrouter-1)
- [getRouter](server_services_base_USSDProvider.default.md#getrouter-1)
- [getTriggerRegistry](server_services_base_USSDProvider.default.md#gettriggerregistry-1)
- [getType](server_services_base_USSDProvider.default.md#gettype)
- [logDebug](server_services_base_USSDProvider.default.md#logdebug-1)
- [logError](server_services_base_USSDProvider.default.md#logerror-1)
- [logInfo](server_services_base_USSDProvider.default.md#loginfo-1)

## Constructors

### constructor

• **new default**\<`T`\>(`config`, `registry`, `configs`): [`default`](server_services_base_USSDProvider.default.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `T` |
| `registry` | [`RegistryService`](server_services_registry.RegistryService.md) |
| `configs` | `Object` |
| `configs.config` | [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md) |
| `configs.dbConfig` | [`IDBConfigRawJSONDataType`](../interfaces/config.IDBConfigRawJSONDataType.md) |
| `configs.redisConfig` | [`IRedisConfigRawJSONDataType`](../interfaces/config.IRedisConfigRawJSONDataType.md) |
| `configs.sensitiveConfig` | [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md) |

#### Returns

[`default`](server_services_base_USSDProvider.default.md)\<`T`\>

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[constructor](server_services.ServiceProvider.md#constructor)

#### Defined in

[server/services/index.ts:58](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L58)

## Properties

### appConfig

• **appConfig**: [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[appConfig](server_services.ServiceProvider.md#appconfig)

#### Defined in

[server/services/index.ts:35](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L35)

___

### appDbConfig

• **appDbConfig**: [`IDBConfigRawJSONDataType`](../interfaces/config.IDBConfigRawJSONDataType.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[appDbConfig](server_services.ServiceProvider.md#appdbconfig)

#### Defined in

[server/services/index.ts:37](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L37)

___

### appRedisConfig

• **appRedisConfig**: [`IRedisConfigRawJSONDataType`](../interfaces/config.IRedisConfigRawJSONDataType.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[appRedisConfig](server_services.ServiceProvider.md#appredisconfig)

#### Defined in

[server/services/index.ts:38](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L38)

___

### appSensitiveConfig

• **appSensitiveConfig**: [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[appSensitiveConfig](server_services.ServiceProvider.md#appsensitiveconfig)

#### Defined in

[server/services/index.ts:36](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L36)

___

### config

• **config**: `T`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[config](server_services.ServiceProvider.md#config)

#### Defined in

[server/services/index.ts:33](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L33)

___

### globalCustomServices

• **globalCustomServices**: `Object`

#### Index signature

▪ [name: `string`]: [`ServiceProvider`](server_services.ServiceProvider.md)\<`any`\>

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalCustomServices](server_services.ServiceProvider.md#globalcustomservices)

#### Defined in

[server/services/index.ts:48](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L48)

___

### globalDatabaseConnection

• **globalDatabaseConnection**: [`DatabaseConnection`](database.DatabaseConnection.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalDatabaseConnection](server_services.ServiceProvider.md#globaldatabaseconnection)

#### Defined in

[server/services/index.ts:40](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L40)

___

### globalInstance

• **globalInstance**: `boolean` = `false`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalInstance](server_services.ServiceProvider.md#globalinstance)

#### Defined in

[server/services/index.ts:55](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L55)

___

### globalMailProvider

• **globalMailProvider**: [`default`](server_services_base_MailProvider.default.md)\<`any`\>

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalMailProvider](server_services.ServiceProvider.md#globalmailprovider)

#### Defined in

[server/services/index.ts:46](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L46)

___

### globalPhoneProvider

• **globalPhoneProvider**: [`default`](server_services_base_PhoneProvider.default.md)\<`any`\>

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalPhoneProvider](server_services.ServiceProvider.md#globalphoneprovider)

#### Defined in

[server/services/index.ts:47](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L47)

___

### globalRawDB

• **globalRawDB**: [`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalRawDB](server_services.ServiceProvider.md#globalrawdb)

#### Defined in

[server/services/index.ts:44](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L44)

___

### globalRedis

• **globalRedis**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalRedis](server_services.ServiceProvider.md#globalredis)

#### Defined in

[server/services/index.ts:43](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L43)

___

### globalRedisPub

• **globalRedisPub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalRedisPub](server_services.ServiceProvider.md#globalredispub)

#### Defined in

[server/services/index.ts:41](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L41)

___

### globalRedisSub

• **globalRedisSub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalRedisSub](server_services.ServiceProvider.md#globalredissub)

#### Defined in

[server/services/index.ts:42](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L42)

___

### globalRoot

• **globalRoot**: [`default`](base_Root.default.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalRoot](server_services.ServiceProvider.md#globalroot)

#### Defined in

[server/services/index.ts:45](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L45)

___

### instanceName

• **instanceName**: `string`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[instanceName](server_services.ServiceProvider.md#instancename)

#### Defined in

[server/services/index.ts:54](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L54)

___

### localAppData

• **localAppData**: [`IAppDataType`](../interfaces/server.IAppDataType.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[localAppData](server_services.ServiceProvider.md#localappdata)

#### Defined in

[server/services/index.ts:52](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L52)

___

### localInstance

• **localInstance**: `boolean` = `false`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[localInstance](server_services.ServiceProvider.md#localinstance)

#### Defined in

[server/services/index.ts:56](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L56)

___

### paginatorNext

• **paginatorNext**: `string` = `">"`

#### Defined in

[server/services/base/USSDProvider.ts:68](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/USSDProvider.ts#L68)

___

### paginatorNextNumericId

• **paginatorNextNumericId**: `number` = `0`

#### Defined in

[server/services/base/USSDProvider.ts:73](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/USSDProvider.ts#L73)

___

### paginatorNextReverse

• **paginatorNextReverse**: `boolean` = `false`

#### Defined in

[server/services/base/USSDProvider.ts:71](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/USSDProvider.ts#L71)

___

### paginatorPrev

• **paginatorPrev**: `string` = `"<"`

#### Defined in

[server/services/base/USSDProvider.ts:67](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/USSDProvider.ts#L67)

___

### paginatorPrevNumericId

• **paginatorPrevNumericId**: `number` = `1`

#### Defined in

[server/services/base/USSDProvider.ts:72](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/USSDProvider.ts#L72)

___

### paginatorPrevReverse

• **paginatorPrevReverse**: `boolean` = `true`

#### Defined in

[server/services/base/USSDProvider.ts:70](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/USSDProvider.ts#L70)

___

### paginatorSeparator

• **paginatorSeparator**: `string` = `" "`

#### Defined in

[server/services/base/USSDProvider.ts:69](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/USSDProvider.ts#L69)

___

### registry

• **registry**: [`RegistryService`](server_services_registry.RegistryService.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[registry](server_services.ServiceProvider.md#registry)

#### Defined in

[server/services/index.ts:34](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L34)

___

### separator

• **separator**: `string` = `":"`

#### Defined in

[server/services/base/USSDProvider.ts:74](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/USSDProvider.ts#L74)

___

### sessions

• `Private` **sessions**: `Object` = `{}`

#### Index signature

▪ [phoneNumber: `string`]: `IUSSDSession`

#### Defined in

[server/services/base/USSDProvider.ts:79](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/USSDProvider.ts#L79)

___

### sessionsTimeouts

• `Private` **sessionsTimeouts**: `Object` = `{}`

#### Index signature

▪ [phoneNumber: `string`]: `any`

#### Defined in

[server/services/base/USSDProvider.ts:82](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/USSDProvider.ts#L82)

___

### splitSize

• **splitSize**: `number` = `182`

#### Defined in

[server/services/base/USSDProvider.ts:66](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/USSDProvider.ts#L66)

___

### unattendedSessionExpiresTime

• **unattendedSessionExpiresTime**: `number` = `86400000`

#### Defined in

[server/services/base/USSDProvider.ts:77](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/USSDProvider.ts#L77)

___

### wordSplitter

• **wordSplitter**: `string` = `" "`

#### Defined in

[server/services/base/USSDProvider.ts:75](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/USSDProvider.ts#L75)

## Methods

### continueSession

▸ **continueSession**(`phoneNumber`, `country`, `language`, `currency`, `input`): `Promise`\<[`IUSSDExpectedAction`](../interfaces/server_services_base_USSDProvider.IUSSDExpectedAction.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `phoneNumber` | `string` |
| `country` | `string` |
| `language` | `string` |
| `currency` | `string` |
| `input` | `string` |

#### Returns

`Promise`\<[`IUSSDExpectedAction`](../interfaces/server_services_base_USSDProvider.IUSSDExpectedAction.md)\>

#### Defined in

[server/services/base/USSDProvider.ts:148](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/USSDProvider.ts#L148)

___

### endSession

▸ **endSession**(`phoneNumber`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `phoneNumber` | `string` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[server/services/base/USSDProvider.ts:255](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/USSDProvider.ts#L255)

___

### execute

▸ **execute**(): `void`

Performs the execution of the service, basically
it will do the run function and then re-run as specified

#### Returns

`void`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[execute](server_services.ServiceProvider.md#execute)

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

[ServiceProvider](server_services.ServiceProvider.md).[expressRouter](server_services.ServiceProvider.md#expressrouter)

#### Defined in

[server/services/index.ts:116](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L116)

___

### formatter

▸ **formatter**(`text`, `actions`, `actionIndexBeginsAt`, `paginatorPrev`, `paginatorNext`): `IUSSDSessionChunk`

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |
| `actions` | [`IUSSDAction`](../interfaces/ussd.IUSSDAction.md)[] |
| `actionIndexBeginsAt` | `number` |
| `paginatorPrev` | `string` |
| `paginatorNext` | `string` |

#### Returns

`IUSSDSessionChunk`

#### Defined in

[server/services/base/USSDProvider.ts:261](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/USSDProvider.ts#L261)

___

### getInstanceName

▸ **getInstanceName**(): `string`

#### Returns

`string`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[getInstanceName](server_services.ServiceProvider.md#getinstancename)

#### Defined in

[server/services/index.ts:80](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L80)

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

[ServiceProvider](server_services.ServiceProvider.md).[getRouter](server_services.ServiceProvider.md#getrouter)

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

[ServiceProvider](server_services.ServiceProvider.md).[getRunCycleTime](server_services.ServiceProvider.md#getruncycletime)

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

[ServiceProvider](server_services.ServiceProvider.md).[getTriggerRegistry](server_services.ServiceProvider.md#gettriggerregistry)

#### Defined in

[server/services/index.ts:293](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L293)

___

### hasSession

▸ **hasSession**(`phoneNumber`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `phoneNumber` | `string` |

#### Returns

`boolean`

#### Defined in

[server/services/base/USSDProvider.ts:86](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/USSDProvider.ts#L86)

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

[ServiceProvider](server_services.ServiceProvider.md).[initialize](server_services.ServiceProvider.md#initialize)

#### Defined in

[server/services/index.ts:230](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L230)

___

### isInstanceGlobal

▸ **isInstanceGlobal**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[isInstanceGlobal](server_services.ServiceProvider.md#isinstanceglobal)

#### Defined in

[server/services/index.ts:84](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L84)

___

### isInstanceLocal

▸ **isInstanceLocal**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[isInstanceLocal](server_services.ServiceProvider.md#isinstancelocal)

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

[ServiceProvider](server_services.ServiceProvider.md).[logDebug](server_services.ServiceProvider.md#logdebug)

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

[ServiceProvider](server_services.ServiceProvider.md).[logError](server_services.ServiceProvider.md#logerror)

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

[ServiceProvider](server_services.ServiceProvider.md).[logInfo](server_services.ServiceProvider.md#loginfo)

#### Defined in

[server/services/index.ts:92](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L92)

___

### run

▸ **run**(): `void` \| `Promise`\<`void`\>

Executes some code

#### Returns

`void` \| `Promise`\<`void`\>

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[run](server_services.ServiceProvider.md#run)

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

[ServiceProvider](server_services.ServiceProvider.md).[setInstanceName](server_services.ServiceProvider.md#setinstancename)

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

[ServiceProvider](server_services.ServiceProvider.md).[setupGlobalResources](server_services.ServiceProvider.md#setupglobalresources)

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

[ServiceProvider](server_services.ServiceProvider.md).[setupLocalResources](server_services.ServiceProvider.md#setuplocalresources)

#### Defined in

[server/services/index.ts:148](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L148)

___

### splitter

▸ **splitter**(`chunk`): `IUSSDSessionChunk`[] \| `Promise`\<`IUSSDSessionChunk`[]\>

This is the code that is used to split the message into digestible
chunks, remember that to include the paginator prefixes into the digestible chunks

This splitter assumes GSM-7 bit encoding, and it's fixed to a 182 character size refer to the
splitSize if you want to change how the splitting mechanism works regarding this

You are given back a standard string during the sessions and it is the role of the
provider mechanism to decide how to handle these split chunks

Space for the paginators are also required as well as space for the numeric formats of
the actions

Overriding is not necessary but possible

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunk` | [`IUSSDChunk`](../interfaces/ussd.IUSSDChunk.md) |

#### Returns

`IUSSDSessionChunk`[] \| `Promise`\<`IUSSDSessionChunk`[]\>

#### Defined in

[server/services/base/USSDProvider.ts:312](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/USSDProvider.ts#L312)

___

### startSession

▸ **startSession**(`phoneNumber`, `country`, `language`, `currency`): `Promise`\<[`IUSSDExpectedAction`](../interfaces/server_services_base_USSDProvider.IUSSDExpectedAction.md)\>

Call this function once a session is created for a given user

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `phoneNumber` | `string` | the phone number in international form |
| `country` | `string` | - |
| `language` | `string` | - |
| `currency` | `string` | - |

#### Returns

`Promise`\<[`IUSSDExpectedAction`](../interfaces/server_services_base_USSDProvider.IUSSDExpectedAction.md)\>

#### Defined in

[server/services/base/USSDProvider.ts:95](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/USSDProvider.ts#L95)

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

[ServiceProvider](server_services.ServiceProvider.md).[expressRouter](server_services.ServiceProvider.md#expressrouter-1)

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

[ServiceProvider](server_services.ServiceProvider.md).[getRouter](server_services.ServiceProvider.md#getrouter-1)

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

[ServiceProvider](server_services.ServiceProvider.md).[getTriggerRegistry](server_services.ServiceProvider.md#gettriggerregistry-1)

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

[ServiceProvider](server_services.ServiceProvider.md).[getType](server_services.ServiceProvider.md#gettype)

#### Defined in

[server/services/base/USSDProvider.ts:62](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/USSDProvider.ts#L62)

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

[ServiceProvider](server_services.ServiceProvider.md).[logDebug](server_services.ServiceProvider.md#logdebug-1)

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

[ServiceProvider](server_services.ServiceProvider.md).[logError](server_services.ServiceProvider.md#logerror-1)

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

[ServiceProvider](server_services.ServiceProvider.md).[logInfo](server_services.ServiceProvider.md#loginfo-1)

#### Defined in

[server/services/index.ts:104](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L104)
