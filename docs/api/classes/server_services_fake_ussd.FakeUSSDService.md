[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/services/fake-ussd](../modules/server_services_fake_ussd.md) / FakeUSSDService

# Class: FakeUSSDService

[server/services/fake-ussd](../modules/server_services_fake_ussd.md).FakeUSSDService

## Hierarchy

- [`default`](server_services_base_USSDProvider.default.md)<``null``\>

  ↳ **`FakeUSSDService`**

## Table of contents

### Constructors

- [constructor](server_services_fake_ussd.FakeUSSDService.md#constructor)

### Properties

- [appConfig](server_services_fake_ussd.FakeUSSDService.md#appconfig)
- [appDbConfig](server_services_fake_ussd.FakeUSSDService.md#appdbconfig)
- [appRedisConfig](server_services_fake_ussd.FakeUSSDService.md#appredisconfig)
- [appSensitiveConfig](server_services_fake_ussd.FakeUSSDService.md#appsensitiveconfig)
- [config](server_services_fake_ussd.FakeUSSDService.md#config)
- [globalCustomServices](server_services_fake_ussd.FakeUSSDService.md#globalcustomservices)
- [globalDatabaseConnection](server_services_fake_ussd.FakeUSSDService.md#globaldatabaseconnection)
- [globalInstance](server_services_fake_ussd.FakeUSSDService.md#globalinstance)
- [globalMailProvider](server_services_fake_ussd.FakeUSSDService.md#globalmailprovider)
- [globalPhoneProvider](server_services_fake_ussd.FakeUSSDService.md#globalphoneprovider)
- [globalRawDB](server_services_fake_ussd.FakeUSSDService.md#globalrawdb)
- [globalRedis](server_services_fake_ussd.FakeUSSDService.md#globalredis)
- [globalRedisPub](server_services_fake_ussd.FakeUSSDService.md#globalredispub)
- [globalRedisSub](server_services_fake_ussd.FakeUSSDService.md#globalredissub)
- [globalRoot](server_services_fake_ussd.FakeUSSDService.md#globalroot)
- [instanceName](server_services_fake_ussd.FakeUSSDService.md#instancename)
- [localAppData](server_services_fake_ussd.FakeUSSDService.md#localappdata)
- [localInstance](server_services_fake_ussd.FakeUSSDService.md#localinstance)
- [paginatorNext](server_services_fake_ussd.FakeUSSDService.md#paginatornext)
- [paginatorNextNumericId](server_services_fake_ussd.FakeUSSDService.md#paginatornextnumericid)
- [paginatorNextReverse](server_services_fake_ussd.FakeUSSDService.md#paginatornextreverse)
- [paginatorPrev](server_services_fake_ussd.FakeUSSDService.md#paginatorprev)
- [paginatorPrevNumericId](server_services_fake_ussd.FakeUSSDService.md#paginatorprevnumericid)
- [paginatorPrevReverse](server_services_fake_ussd.FakeUSSDService.md#paginatorprevreverse)
- [paginatorSeparator](server_services_fake_ussd.FakeUSSDService.md#paginatorseparator)
- [registry](server_services_fake_ussd.FakeUSSDService.md#registry)
- [separator](server_services_fake_ussd.FakeUSSDService.md#separator)
- [splitSize](server_services_fake_ussd.FakeUSSDService.md#splitsize)
- [unattendedSessionExpiresTime](server_services_fake_ussd.FakeUSSDService.md#unattendedsessionexpirestime)
- [wordSplitter](server_services_fake_ussd.FakeUSSDService.md#wordsplitter)

### Methods

- [continueSession](server_services_fake_ussd.FakeUSSDService.md#continuesession)
- [endSession](server_services_fake_ussd.FakeUSSDService.md#endsession)
- [execute](server_services_fake_ussd.FakeUSSDService.md#execute)
- [expressRouter](server_services_fake_ussd.FakeUSSDService.md#expressrouter)
- [formatter](server_services_fake_ussd.FakeUSSDService.md#formatter)
- [getInstanceName](server_services_fake_ussd.FakeUSSDService.md#getinstancename)
- [getRouter](server_services_fake_ussd.FakeUSSDService.md#getrouter)
- [getRunCycleTime](server_services_fake_ussd.FakeUSSDService.md#getruncycletime)
- [getTriggerRegistry](server_services_fake_ussd.FakeUSSDService.md#gettriggerregistry)
- [hasSession](server_services_fake_ussd.FakeUSSDService.md#hassession)
- [initialize](server_services_fake_ussd.FakeUSSDService.md#initialize)
- [isInstanceGlobal](server_services_fake_ussd.FakeUSSDService.md#isinstanceglobal)
- [isInstanceLocal](server_services_fake_ussd.FakeUSSDService.md#isinstancelocal)
- [logDebug](server_services_fake_ussd.FakeUSSDService.md#logdebug)
- [logError](server_services_fake_ussd.FakeUSSDService.md#logerror)
- [logInfo](server_services_fake_ussd.FakeUSSDService.md#loginfo)
- [run](server_services_fake_ussd.FakeUSSDService.md#run)
- [setInstanceName](server_services_fake_ussd.FakeUSSDService.md#setinstancename)
- [setupGlobalResources](server_services_fake_ussd.FakeUSSDService.md#setupglobalresources)
- [setupLocalResources](server_services_fake_ussd.FakeUSSDService.md#setuplocalresources)
- [splitter](server_services_fake_ussd.FakeUSSDService.md#splitter)
- [startSession](server_services_fake_ussd.FakeUSSDService.md#startsession)
- [expressRouter](server_services_fake_ussd.FakeUSSDService.md#expressrouter)
- [getRouter](server_services_fake_ussd.FakeUSSDService.md#getrouter)
- [getTriggerRegistry](server_services_fake_ussd.FakeUSSDService.md#gettriggerregistry)
- [getType](server_services_fake_ussd.FakeUSSDService.md#gettype)
- [logDebug](server_services_fake_ussd.FakeUSSDService.md#logdebug)
- [logError](server_services_fake_ussd.FakeUSSDService.md#logerror)
- [logInfo](server_services_fake_ussd.FakeUSSDService.md#loginfo)

## Constructors

### constructor

• **new FakeUSSDService**(`config`, `registry`, `configs`)

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

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[constructor](server_services_base_USSDProvider.default.md#constructor)

#### Defined in

[server/services/index.ts:58](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L58)

## Properties

### appConfig

• **appConfig**: [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md)

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[appConfig](server_services_base_USSDProvider.default.md#appconfig)

#### Defined in

[server/services/index.ts:35](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L35)

___

### appDbConfig

• **appDbConfig**: [`IDBConfigRawJSONDataType`](../interfaces/config.IDBConfigRawJSONDataType.md)

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[appDbConfig](server_services_base_USSDProvider.default.md#appdbconfig)

#### Defined in

[server/services/index.ts:37](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L37)

___

### appRedisConfig

• **appRedisConfig**: [`IRedisConfigRawJSONDataType`](../interfaces/config.IRedisConfigRawJSONDataType.md)

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[appRedisConfig](server_services_base_USSDProvider.default.md#appredisconfig)

#### Defined in

[server/services/index.ts:38](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L38)

___

### appSensitiveConfig

• **appSensitiveConfig**: [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md)

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[appSensitiveConfig](server_services_base_USSDProvider.default.md#appsensitiveconfig)

#### Defined in

[server/services/index.ts:36](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L36)

___

### config

• **config**: ``null``

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[config](server_services_base_USSDProvider.default.md#config)

#### Defined in

[server/services/index.ts:33](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L33)

___

### globalCustomServices

• **globalCustomServices**: `Object`

#### Index signature

▪ [name: `string`]: [`ServiceProvider`](server_services.ServiceProvider.md)<`any`\>

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[globalCustomServices](server_services_base_USSDProvider.default.md#globalcustomservices)

#### Defined in

[server/services/index.ts:48](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L48)

___

### globalDatabaseConnection

• **globalDatabaseConnection**: [`DatabaseConnection`](database.DatabaseConnection.md)

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[globalDatabaseConnection](server_services_base_USSDProvider.default.md#globaldatabaseconnection)

#### Defined in

[server/services/index.ts:40](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L40)

___

### globalInstance

• **globalInstance**: `boolean` = `false`

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[globalInstance](server_services_base_USSDProvider.default.md#globalinstance)

#### Defined in

[server/services/index.ts:55](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L55)

___

### globalMailProvider

• **globalMailProvider**: [`default`](server_services_base_MailProvider.default.md)<`any`\>

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[globalMailProvider](server_services_base_USSDProvider.default.md#globalmailprovider)

#### Defined in

[server/services/index.ts:46](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L46)

___

### globalPhoneProvider

• **globalPhoneProvider**: [`default`](server_services_base_PhoneProvider.default.md)<`any`\>

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[globalPhoneProvider](server_services_base_USSDProvider.default.md#globalphoneprovider)

#### Defined in

[server/services/index.ts:47](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L47)

___

### globalRawDB

• **globalRawDB**: [`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md)

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[globalRawDB](server_services_base_USSDProvider.default.md#globalrawdb)

#### Defined in

[server/services/index.ts:44](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L44)

___

### globalRedis

• **globalRedis**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[globalRedis](server_services_base_USSDProvider.default.md#globalredis)

#### Defined in

[server/services/index.ts:43](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L43)

___

### globalRedisPub

• **globalRedisPub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[globalRedisPub](server_services_base_USSDProvider.default.md#globalredispub)

#### Defined in

[server/services/index.ts:41](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L41)

___

### globalRedisSub

• **globalRedisSub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[globalRedisSub](server_services_base_USSDProvider.default.md#globalredissub)

#### Defined in

[server/services/index.ts:42](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L42)

___

### globalRoot

• **globalRoot**: [`default`](base_Root.default.md)

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[globalRoot](server_services_base_USSDProvider.default.md#globalroot)

#### Defined in

[server/services/index.ts:45](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L45)

___

### instanceName

• **instanceName**: `string`

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[instanceName](server_services_base_USSDProvider.default.md#instancename)

#### Defined in

[server/services/index.ts:54](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L54)

___

### localAppData

• **localAppData**: [`IAppDataType`](../interfaces/server.IAppDataType.md)

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[localAppData](server_services_base_USSDProvider.default.md#localappdata)

#### Defined in

[server/services/index.ts:52](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L52)

___

### localInstance

• **localInstance**: `boolean` = `false`

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[localInstance](server_services_base_USSDProvider.default.md#localinstance)

#### Defined in

[server/services/index.ts:56](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L56)

___

### paginatorNext

• **paginatorNext**: `string` = `">"`

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[paginatorNext](server_services_base_USSDProvider.default.md#paginatornext)

#### Defined in

[server/services/base/USSDProvider.ts:68](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/USSDProvider.ts#L68)

___

### paginatorNextNumericId

• **paginatorNextNumericId**: `number` = `0`

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[paginatorNextNumericId](server_services_base_USSDProvider.default.md#paginatornextnumericid)

#### Defined in

[server/services/base/USSDProvider.ts:73](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/USSDProvider.ts#L73)

___

### paginatorNextReverse

• **paginatorNextReverse**: `boolean` = `false`

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[paginatorNextReverse](server_services_base_USSDProvider.default.md#paginatornextreverse)

#### Defined in

[server/services/base/USSDProvider.ts:71](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/USSDProvider.ts#L71)

___

### paginatorPrev

• **paginatorPrev**: `string` = `"<"`

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[paginatorPrev](server_services_base_USSDProvider.default.md#paginatorprev)

#### Defined in

[server/services/base/USSDProvider.ts:67](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/USSDProvider.ts#L67)

___

### paginatorPrevNumericId

• **paginatorPrevNumericId**: `number` = `1`

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[paginatorPrevNumericId](server_services_base_USSDProvider.default.md#paginatorprevnumericid)

#### Defined in

[server/services/base/USSDProvider.ts:72](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/USSDProvider.ts#L72)

___

### paginatorPrevReverse

• **paginatorPrevReverse**: `boolean` = `true`

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[paginatorPrevReverse](server_services_base_USSDProvider.default.md#paginatorprevreverse)

#### Defined in

[server/services/base/USSDProvider.ts:70](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/USSDProvider.ts#L70)

___

### paginatorSeparator

• **paginatorSeparator**: `string` = `" "`

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[paginatorSeparator](server_services_base_USSDProvider.default.md#paginatorseparator)

#### Defined in

[server/services/base/USSDProvider.ts:69](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/USSDProvider.ts#L69)

___

### registry

• **registry**: [`RegistryService`](server_services_registry.RegistryService.md)

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[registry](server_services_base_USSDProvider.default.md#registry)

#### Defined in

[server/services/index.ts:34](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L34)

___

### separator

• **separator**: `string` = `":"`

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[separator](server_services_base_USSDProvider.default.md#separator)

#### Defined in

[server/services/base/USSDProvider.ts:74](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/USSDProvider.ts#L74)

___

### splitSize

• **splitSize**: `number` = `182`

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[splitSize](server_services_base_USSDProvider.default.md#splitsize)

#### Defined in

[server/services/base/USSDProvider.ts:66](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/USSDProvider.ts#L66)

___

### unattendedSessionExpiresTime

• **unattendedSessionExpiresTime**: `number` = `86400000`

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[unattendedSessionExpiresTime](server_services_base_USSDProvider.default.md#unattendedsessionexpirestime)

#### Defined in

[server/services/base/USSDProvider.ts:77](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/USSDProvider.ts#L77)

___

### wordSplitter

• **wordSplitter**: `string` = `" "`

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[wordSplitter](server_services_base_USSDProvider.default.md#wordsplitter)

#### Defined in

[server/services/base/USSDProvider.ts:75](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/USSDProvider.ts#L75)

## Methods

### continueSession

▸ **continueSession**(`phoneNumber`, `country`, `language`, `currency`, `input`): `Promise`<[`IUSSDExpectedAction`](../interfaces/server_services_base_USSDProvider.IUSSDExpectedAction.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `phoneNumber` | `string` |
| `country` | `string` |
| `language` | `string` |
| `currency` | `string` |
| `input` | `string` |

#### Returns

`Promise`<[`IUSSDExpectedAction`](../interfaces/server_services_base_USSDProvider.IUSSDExpectedAction.md)\>

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[continueSession](server_services_base_USSDProvider.default.md#continuesession)

#### Defined in

[server/services/base/USSDProvider.ts:148](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/USSDProvider.ts#L148)

___

### endSession

▸ **endSession**(`phoneNumber`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `phoneNumber` | `string` |

#### Returns

`Promise`<`void`\>

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[endSession](server_services_base_USSDProvider.default.md#endsession)

#### Defined in

[server/services/base/USSDProvider.ts:255](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/USSDProvider.ts#L255)

___

### execute

▸ **execute**(): `void`

Performs the execution of the service, basically
it will do the run function and then re-run as specified

#### Returns

`void`

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[execute](server_services_base_USSDProvider.default.md#execute)

#### Defined in

[server/services/index.ts:170](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L170)

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

[default](server_services_base_USSDProvider.default.md).[expressRouter](server_services_base_USSDProvider.default.md#expressrouter)

#### Defined in

[server/services/index.ts:116](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L116)

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

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[formatter](server_services_base_USSDProvider.default.md#formatter)

#### Defined in

[server/services/base/USSDProvider.ts:261](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/USSDProvider.ts#L261)

___

### getInstanceName

▸ **getInstanceName**(): `string`

#### Returns

`string`

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[getInstanceName](server_services_base_USSDProvider.default.md#getinstancename)

#### Defined in

[server/services/index.ts:80](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L80)

___

### getRouter

▸ **getRouter**(`appData`): `Router`

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

`Router`

#### Overrides

[default](server_services_base_USSDProvider.default.md).[getRouter](server_services_base_USSDProvider.default.md#getrouter)

#### Defined in

[server/services/fake-ussd.ts:5](https://github.com/onzag/itemize/blob/a24376ed/server/services/fake-ussd.ts#L5)

___

### getRunCycleTime

▸ **getRunCycleTime**(): `number`

Determines whether the run function
should run over again

**`override`**

#### Returns

`number`

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[getRunCycleTime](server_services_base_USSDProvider.default.md#getruncycletime)

#### Defined in

[server/services/index.ts:239](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L239)

___

### getTriggerRegistry

▸ **getTriggerRegistry**(): [`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md) \| `Promise`<[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md)\>

Allows to setup trigger registries via the service
so that they trigger just as normal trigger will do

**`override`**

#### Returns

[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md) \| `Promise`<[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md)\>

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[getTriggerRegistry](server_services_base_USSDProvider.default.md#gettriggerregistry)

#### Defined in

[server/services/index.ts:293](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L293)

___

### hasSession

▸ **hasSession**(`phoneNumber`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `phoneNumber` | `string` |

#### Returns

`boolean`

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[hasSession](server_services_base_USSDProvider.default.md#hassession)

#### Defined in

[server/services/base/USSDProvider.ts:86](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/USSDProvider.ts#L86)

___

### initialize

▸ **initialize**(): `void` \| `Promise`<`void`\>

This function is executed during
the initialization of the service

If your service is a global service you will
have access to the global resources while
this function executes

**`override`**

#### Returns

`void` \| `Promise`<`void`\>

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[initialize](server_services_base_USSDProvider.default.md#initialize)

#### Defined in

[server/services/index.ts:230](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L230)

___

### isInstanceGlobal

▸ **isInstanceGlobal**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[isInstanceGlobal](server_services_base_USSDProvider.default.md#isinstanceglobal)

#### Defined in

[server/services/index.ts:84](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L84)

___

### isInstanceLocal

▸ **isInstanceLocal**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[isInstanceLocal](server_services_base_USSDProvider.default.md#isinstancelocal)

#### Defined in

[server/services/index.ts:88](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L88)

___

### logDebug

▸ **logDebug**<`T`\>(`data`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`IItemizeLoggingStructure`](../interfaces/server_logger.IItemizeLoggingStructure.md)<`T`\> |

#### Returns

`void`

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[logDebug](server_services_base_USSDProvider.default.md#logdebug)

#### Defined in

[server/services/index.ts:96](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L96)

___

### logError

▸ **logError**<`T`\>(`data`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`IItemizeLoggingErrorStructure`](../interfaces/server_logger.IItemizeLoggingErrorStructure.md)<`T`\> |

#### Returns

`void`

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[logError](server_services_base_USSDProvider.default.md#logerror)

#### Defined in

[server/services/index.ts:100](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L100)

___

### logInfo

▸ **logInfo**<`T`\>(`data`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`IItemizeLoggingStructure`](../interfaces/server_logger.IItemizeLoggingStructure.md)<`T`\> |

#### Returns

`void`

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[logInfo](server_services_base_USSDProvider.default.md#loginfo)

#### Defined in

[server/services/index.ts:92](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L92)

___

### run

▸ **run**(): `void` \| `Promise`<`void`\>

Executes some code

**`override`**

#### Returns

`void` \| `Promise`<`void`\>

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[run](server_services_base_USSDProvider.default.md#run)

#### Defined in

[server/services/index.ts:247](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L247)

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

[default](server_services_base_USSDProvider.default.md).[setInstanceName](server_services_base_USSDProvider.default.md#setinstancename)

#### Defined in

[server/services/index.ts:76](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L76)

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
| `globalMailProvider` | [`default`](server_services_base_MailProvider.default.md)<`any`\> |
| `globalPhoneProvider` | [`default`](server_services_base_PhoneProvider.default.md)<`any`\> |
| `globalCustomServices` | `Object` |
| `root` | [`default`](base_Root.default.md) |

#### Returns

`void`

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[setupGlobalResources](server_services_base_USSDProvider.default.md#setupglobalresources)

#### Defined in

[server/services/index.ts:124](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L124)

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

[default](server_services_base_USSDProvider.default.md).[setupLocalResources](server_services_base_USSDProvider.default.md#setuplocalresources)

#### Defined in

[server/services/index.ts:148](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L148)

___

### splitter

▸ **splitter**(`chunk`): `IUSSDSessionChunk`[] \| `Promise`<`IUSSDSessionChunk`[]\>

This is the code that is used to split the message into digestible
chunks, remember that to include the paginator prefixes into the digestible chunks

This splitter assumes GSM-7 bit encoding, and it's fixed to a 182 character size refer to the
splitSize if you want to change how the splitting mechanism works regarding this

You are given back a standard string during the sessions and it is the role of the
provider mechanism to decide how to handle these split chunks

Space for the paginators are also required as well as space for the numeric formats of
the actions

Overriding is not necessary but possible

**`override`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunk` | [`IUSSDChunk`](../interfaces/ussd.IUSSDChunk.md) |

#### Returns

`IUSSDSessionChunk`[] \| `Promise`<`IUSSDSessionChunk`[]\>

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[splitter](server_services_base_USSDProvider.default.md#splitter)

#### Defined in

[server/services/base/USSDProvider.ts:312](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/USSDProvider.ts#L312)

___

### startSession

▸ **startSession**(`phoneNumber`, `country`, `language`, `currency`): `Promise`<[`IUSSDExpectedAction`](../interfaces/server_services_base_USSDProvider.IUSSDExpectedAction.md)\>

Call this function once a session is created for a given user

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `phoneNumber` | `string` | the phone number in international form |
| `country` | `string` | - |
| `language` | `string` | - |
| `currency` | `string` | - |

#### Returns

`Promise`<[`IUSSDExpectedAction`](../interfaces/server_services_base_USSDProvider.IUSSDExpectedAction.md)\>

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[startSession](server_services_base_USSDProvider.default.md#startsession)

#### Defined in

[server/services/base/USSDProvider.ts:95](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/USSDProvider.ts#L95)

___

### expressRouter

▸ `Static` **expressRouter**(`options?`): `Router`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `RouterOptions` |

#### Returns

`Router`

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[expressRouter](server_services_base_USSDProvider.default.md#expressrouter)

#### Defined in

[server/services/index.ts:120](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L120)

___

### getRouter

▸ `Static` **getRouter**(`appData`): `Router` \| `Promise`<`Router`\>

Provides a router endpoint, but this method
is static, which means it only gets added once

If the service provider if executed on a global environment
the endpoint does not get created, this means that in the global
manager this won't be executed, or anything that is meant
for the global manager

the router gets attached to /rest/service

**`override`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |

#### Returns

`Router` \| `Promise`<`Router`\>

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[getRouter](server_services_base_USSDProvider.default.md#getrouter)

#### Defined in

[server/services/index.ts:283](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L283)

___

### getTriggerRegistry

▸ `Static` **getTriggerRegistry**(): [`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md) \| `Promise`<[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md)\>

Allows to setup trigger registries via the service
so that they trigger just as normal trigger will do

This gets attached if a class is used rather than per instance

**`override`**

#### Returns

[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md) \| `Promise`<[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md)\>

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[getTriggerRegistry](server_services_base_USSDProvider.default.md#gettriggerregistry)

#### Defined in

[server/services/index.ts:305](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L305)

___

### getType

▸ `Static` **getType**(): [`ServiceProviderType`](../enums/server_services.ServiceProviderType.md)

Specifies whether the current service is a global service
if true global services will only execute initialize and a router
will not be extracted from them

it will instead have access to the global resources

#### Returns

[`ServiceProviderType`](../enums/server_services.ServiceProviderType.md)

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[getType](server_services_base_USSDProvider.default.md#gettype)

#### Defined in

[server/services/base/USSDProvider.ts:62](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/USSDProvider.ts#L62)

___

### logDebug

▸ `Static` **logDebug**<`T`\>(`data`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`IItemizeLoggingStructure`](../interfaces/server_logger.IItemizeLoggingStructure.md)<`T`\> |

#### Returns

`void`

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[logDebug](server_services_base_USSDProvider.default.md#logdebug)

#### Defined in

[server/services/index.ts:108](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L108)

___

### logError

▸ `Static` **logError**<`T`\>(`data`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`IItemizeLoggingErrorStructure`](../interfaces/server_logger.IItemizeLoggingErrorStructure.md)<`T`\> |

#### Returns

`void`

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[logError](server_services_base_USSDProvider.default.md#logerror)

#### Defined in

[server/services/index.ts:112](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L112)

___

### logInfo

▸ `Static` **logInfo**<`T`\>(`data`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`IItemizeLoggingStructure`](../interfaces/server_logger.IItemizeLoggingStructure.md)<`T`\> |

#### Returns

`void`

#### Inherited from

[default](server_services_base_USSDProvider.default.md).[logInfo](server_services_base_USSDProvider.default.md#loginfo)

#### Defined in

[server/services/index.ts:104](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L104)
