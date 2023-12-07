[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/services/currency-layer](../modules/server_services_currency_layer.md) / CurrencyLayerService

# Class: CurrencyLayerService

[server/services/currency-layer](../modules/server_services_currency_layer.md).CurrencyLayerService

## Hierarchy

- [`default`](server_services_base_CurrencyFactorsProvider.default.md)<[`ICurrencyLayerConfig`](../interfaces/server_services_currency_layer.ICurrencyLayerConfig.md)\>

  ↳ **`CurrencyLayerService`**

## Table of contents

### Constructors

- [constructor](server_services_currency_layer.CurrencyLayerService.md#constructor)

### Properties

- [appConfig](server_services_currency_layer.CurrencyLayerService.md#appconfig)
- [appDbConfig](server_services_currency_layer.CurrencyLayerService.md#appdbconfig)
- [appRedisConfig](server_services_currency_layer.CurrencyLayerService.md#appredisconfig)
- [appSensitiveConfig](server_services_currency_layer.CurrencyLayerService.md#appsensitiveconfig)
- [config](server_services_currency_layer.CurrencyLayerService.md#config)
- [globalCustomServices](server_services_currency_layer.CurrencyLayerService.md#globalcustomservices)
- [globalDatabaseConnection](server_services_currency_layer.CurrencyLayerService.md#globaldatabaseconnection)
- [globalInstance](server_services_currency_layer.CurrencyLayerService.md#globalinstance)
- [globalMailProvider](server_services_currency_layer.CurrencyLayerService.md#globalmailprovider)
- [globalPhoneProvider](server_services_currency_layer.CurrencyLayerService.md#globalphoneprovider)
- [globalRawDB](server_services_currency_layer.CurrencyLayerService.md#globalrawdb)
- [globalRedis](server_services_currency_layer.CurrencyLayerService.md#globalredis)
- [globalRedisPub](server_services_currency_layer.CurrencyLayerService.md#globalredispub)
- [globalRedisSub](server_services_currency_layer.CurrencyLayerService.md#globalredissub)
- [globalRoot](server_services_currency_layer.CurrencyLayerService.md#globalroot)
- [instanceName](server_services_currency_layer.CurrencyLayerService.md#instancename)
- [localAppData](server_services_currency_layer.CurrencyLayerService.md#localappdata)
- [localInstance](server_services_currency_layer.CurrencyLayerService.md#localinstance)
- [registry](server_services_currency_layer.CurrencyLayerService.md#registry)

### Methods

- [execute](server_services_currency_layer.CurrencyLayerService.md#execute)
- [expressRouter](server_services_currency_layer.CurrencyLayerService.md#expressrouter)
- [getFactors](server_services_currency_layer.CurrencyLayerService.md#getfactors)
- [getInstanceName](server_services_currency_layer.CurrencyLayerService.md#getinstancename)
- [getRouter](server_services_currency_layer.CurrencyLayerService.md#getrouter)
- [getRunCycleTime](server_services_currency_layer.CurrencyLayerService.md#getruncycletime)
- [getTriggerRegistry](server_services_currency_layer.CurrencyLayerService.md#gettriggerregistry)
- [initialize](server_services_currency_layer.CurrencyLayerService.md#initialize)
- [isInstanceGlobal](server_services_currency_layer.CurrencyLayerService.md#isinstanceglobal)
- [isInstanceLocal](server_services_currency_layer.CurrencyLayerService.md#isinstancelocal)
- [logDebug](server_services_currency_layer.CurrencyLayerService.md#logdebug)
- [logError](server_services_currency_layer.CurrencyLayerService.md#logerror)
- [logInfo](server_services_currency_layer.CurrencyLayerService.md#loginfo)
- [requestInfo](server_services_currency_layer.CurrencyLayerService.md#requestinfo)
- [run](server_services_currency_layer.CurrencyLayerService.md#run)
- [setInstanceName](server_services_currency_layer.CurrencyLayerService.md#setinstancename)
- [setupGlobalResources](server_services_currency_layer.CurrencyLayerService.md#setupglobalresources)
- [setupLocalResources](server_services_currency_layer.CurrencyLayerService.md#setuplocalresources)
- [expressRouter](server_services_currency_layer.CurrencyLayerService.md#expressrouter)
- [getRouter](server_services_currency_layer.CurrencyLayerService.md#getrouter)
- [getTriggerRegistry](server_services_currency_layer.CurrencyLayerService.md#gettriggerregistry)
- [getType](server_services_currency_layer.CurrencyLayerService.md#gettype)
- [logDebug](server_services_currency_layer.CurrencyLayerService.md#logdebug)
- [logError](server_services_currency_layer.CurrencyLayerService.md#logerror)
- [logInfo](server_services_currency_layer.CurrencyLayerService.md#loginfo)

## Constructors

### constructor

• **new CurrencyLayerService**(`config`, `registry`, `configs`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ICurrencyLayerConfig`](../interfaces/server_services_currency_layer.ICurrencyLayerConfig.md) |
| `registry` | [`RegistryService`](server_services_registry.RegistryService.md) |
| `configs` | `Object` |
| `configs.config` | [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md) |
| `configs.dbConfig` | [`IDBConfigRawJSONDataType`](../interfaces/config.IDBConfigRawJSONDataType.md) |
| `configs.redisConfig` | [`IRedisConfigRawJSONDataType`](../interfaces/config.IRedisConfigRawJSONDataType.md) |
| `configs.sensitiveConfig` | [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md) |

#### Inherited from

[default](server_services_base_CurrencyFactorsProvider.default.md).[constructor](server_services_base_CurrencyFactorsProvider.default.md#constructor)

#### Defined in

[server/services/index.ts:58](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L58)

## Properties

### appConfig

• **appConfig**: [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md)

#### Inherited from

[default](server_services_base_CurrencyFactorsProvider.default.md).[appConfig](server_services_base_CurrencyFactorsProvider.default.md#appconfig)

#### Defined in

[server/services/index.ts:35](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L35)

___

### appDbConfig

• **appDbConfig**: [`IDBConfigRawJSONDataType`](../interfaces/config.IDBConfigRawJSONDataType.md)

#### Inherited from

[default](server_services_base_CurrencyFactorsProvider.default.md).[appDbConfig](server_services_base_CurrencyFactorsProvider.default.md#appdbconfig)

#### Defined in

[server/services/index.ts:37](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L37)

___

### appRedisConfig

• **appRedisConfig**: [`IRedisConfigRawJSONDataType`](../interfaces/config.IRedisConfigRawJSONDataType.md)

#### Inherited from

[default](server_services_base_CurrencyFactorsProvider.default.md).[appRedisConfig](server_services_base_CurrencyFactorsProvider.default.md#appredisconfig)

#### Defined in

[server/services/index.ts:38](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L38)

___

### appSensitiveConfig

• **appSensitiveConfig**: [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md)

#### Inherited from

[default](server_services_base_CurrencyFactorsProvider.default.md).[appSensitiveConfig](server_services_base_CurrencyFactorsProvider.default.md#appsensitiveconfig)

#### Defined in

[server/services/index.ts:36](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L36)

___

### config

• **config**: [`ICurrencyLayerConfig`](../interfaces/server_services_currency_layer.ICurrencyLayerConfig.md)

#### Inherited from

[default](server_services_base_CurrencyFactorsProvider.default.md).[config](server_services_base_CurrencyFactorsProvider.default.md#config)

#### Defined in

[server/services/index.ts:33](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L33)

___

### globalCustomServices

• **globalCustomServices**: `Object`

#### Index signature

▪ [name: `string`]: [`ServiceProvider`](server_services.ServiceProvider.md)<`any`\>

#### Inherited from

[default](server_services_base_CurrencyFactorsProvider.default.md).[globalCustomServices](server_services_base_CurrencyFactorsProvider.default.md#globalcustomservices)

#### Defined in

[server/services/index.ts:48](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L48)

___

### globalDatabaseConnection

• **globalDatabaseConnection**: [`DatabaseConnection`](database.DatabaseConnection.md)

#### Inherited from

[default](server_services_base_CurrencyFactorsProvider.default.md).[globalDatabaseConnection](server_services_base_CurrencyFactorsProvider.default.md#globaldatabaseconnection)

#### Defined in

[server/services/index.ts:40](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L40)

___

### globalInstance

• **globalInstance**: `boolean` = `false`

#### Inherited from

[default](server_services_base_CurrencyFactorsProvider.default.md).[globalInstance](server_services_base_CurrencyFactorsProvider.default.md#globalinstance)

#### Defined in

[server/services/index.ts:55](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L55)

___

### globalMailProvider

• **globalMailProvider**: [`default`](server_services_base_MailProvider.default.md)<`any`\>

#### Inherited from

[default](server_services_base_CurrencyFactorsProvider.default.md).[globalMailProvider](server_services_base_CurrencyFactorsProvider.default.md#globalmailprovider)

#### Defined in

[server/services/index.ts:46](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L46)

___

### globalPhoneProvider

• **globalPhoneProvider**: [`default`](server_services_base_PhoneProvider.default.md)<`any`\>

#### Inherited from

[default](server_services_base_CurrencyFactorsProvider.default.md).[globalPhoneProvider](server_services_base_CurrencyFactorsProvider.default.md#globalphoneprovider)

#### Defined in

[server/services/index.ts:47](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L47)

___

### globalRawDB

• **globalRawDB**: [`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md)

#### Inherited from

[default](server_services_base_CurrencyFactorsProvider.default.md).[globalRawDB](server_services_base_CurrencyFactorsProvider.default.md#globalrawdb)

#### Defined in

[server/services/index.ts:44](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L44)

___

### globalRedis

• **globalRedis**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[default](server_services_base_CurrencyFactorsProvider.default.md).[globalRedis](server_services_base_CurrencyFactorsProvider.default.md#globalredis)

#### Defined in

[server/services/index.ts:43](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L43)

___

### globalRedisPub

• **globalRedisPub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[default](server_services_base_CurrencyFactorsProvider.default.md).[globalRedisPub](server_services_base_CurrencyFactorsProvider.default.md#globalredispub)

#### Defined in

[server/services/index.ts:41](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L41)

___

### globalRedisSub

• **globalRedisSub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[default](server_services_base_CurrencyFactorsProvider.default.md).[globalRedisSub](server_services_base_CurrencyFactorsProvider.default.md#globalredissub)

#### Defined in

[server/services/index.ts:42](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L42)

___

### globalRoot

• **globalRoot**: [`default`](base_Root.default.md)

#### Inherited from

[default](server_services_base_CurrencyFactorsProvider.default.md).[globalRoot](server_services_base_CurrencyFactorsProvider.default.md#globalroot)

#### Defined in

[server/services/index.ts:45](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L45)

___

### instanceName

• **instanceName**: `string`

#### Inherited from

[default](server_services_base_CurrencyFactorsProvider.default.md).[instanceName](server_services_base_CurrencyFactorsProvider.default.md#instancename)

#### Defined in

[server/services/index.ts:54](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L54)

___

### localAppData

• **localAppData**: [`IAppDataType`](../interfaces/server.IAppDataType.md)

#### Inherited from

[default](server_services_base_CurrencyFactorsProvider.default.md).[localAppData](server_services_base_CurrencyFactorsProvider.default.md#localappdata)

#### Defined in

[server/services/index.ts:52](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L52)

___

### localInstance

• **localInstance**: `boolean` = `false`

#### Inherited from

[default](server_services_base_CurrencyFactorsProvider.default.md).[localInstance](server_services_base_CurrencyFactorsProvider.default.md#localinstance)

#### Defined in

[server/services/index.ts:56](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L56)

___

### registry

• **registry**: [`RegistryService`](server_services_registry.RegistryService.md)

#### Inherited from

[default](server_services_base_CurrencyFactorsProvider.default.md).[registry](server_services_base_CurrencyFactorsProvider.default.md#registry)

#### Defined in

[server/services/index.ts:34](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L34)

## Methods

### execute

▸ **execute**(): `void`

Performs the execution of the service, basically
it will do the run function and then re-run as specified

#### Returns

`void`

#### Inherited from

[default](server_services_base_CurrencyFactorsProvider.default.md).[execute](server_services_base_CurrencyFactorsProvider.default.md#execute)

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

[default](server_services_base_CurrencyFactorsProvider.default.md).[expressRouter](server_services_base_CurrencyFactorsProvider.default.md#expressrouter)

#### Defined in

[server/services/index.ts:116](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L116)

___

### getFactors

▸ **getFactors**(): `Promise`<[`ICurrencyFactors`](../interfaces/server_services_base_CurrencyFactorsProvider.ICurrencyFactors.md)\>

Should provide the currency factors

Override this function with your own functionality to provide
the factors

#### Returns

`Promise`<[`ICurrencyFactors`](../interfaces/server_services_base_CurrencyFactorsProvider.ICurrencyFactors.md)\>

#### Overrides

[default](server_services_base_CurrencyFactorsProvider.default.md).[getFactors](server_services_base_CurrencyFactorsProvider.default.md#getfactors)

#### Defined in

[server/services/currency-layer.ts:131](https://github.com/onzag/itemize/blob/a24376ed/server/services/currency-layer.ts#L131)

___

### getInstanceName

▸ **getInstanceName**(): `string`

#### Returns

`string`

#### Inherited from

[default](server_services_base_CurrencyFactorsProvider.default.md).[getInstanceName](server_services_base_CurrencyFactorsProvider.default.md#getinstancename)

#### Defined in

[server/services/index.ts:80](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L80)

___

### getRouter

▸ **getRouter**(`appData`): `Router` \| `Promise`<`Router`\>

Provides a router endpoint, the router endpoint
will exist directly under the rest services
this enables to create webhooks and other subservices
that are attached to this service

If the service provider if executed on a global environment
the endpoint does not get created, this means that in the global
manager this won't be executed, or anything that is meant
for the global manager

The router gets attached to /rest/service

**`override`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |

#### Returns

`Router` \| `Promise`<`Router`\>

#### Inherited from

[default](server_services_base_CurrencyFactorsProvider.default.md).[getRouter](server_services_base_CurrencyFactorsProvider.default.md#getrouter)

#### Defined in

[server/services/index.ts:266](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L266)

___

### getRunCycleTime

▸ **getRunCycleTime**(): `number`

Determines whether the run function
should run over again

**`override`**

#### Returns

`number`

#### Inherited from

[default](server_services_base_CurrencyFactorsProvider.default.md).[getRunCycleTime](server_services_base_CurrencyFactorsProvider.default.md#getruncycletime)

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

[default](server_services_base_CurrencyFactorsProvider.default.md).[getTriggerRegistry](server_services_base_CurrencyFactorsProvider.default.md#gettriggerregistry)

#### Defined in

[server/services/index.ts:293](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L293)

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

[default](server_services_base_CurrencyFactorsProvider.default.md).[initialize](server_services_base_CurrencyFactorsProvider.default.md#initialize)

#### Defined in

[server/services/index.ts:230](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L230)

___

### isInstanceGlobal

▸ **isInstanceGlobal**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[default](server_services_base_CurrencyFactorsProvider.default.md).[isInstanceGlobal](server_services_base_CurrencyFactorsProvider.default.md#isinstanceglobal)

#### Defined in

[server/services/index.ts:84](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L84)

___

### isInstanceLocal

▸ **isInstanceLocal**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[default](server_services_base_CurrencyFactorsProvider.default.md).[isInstanceLocal](server_services_base_CurrencyFactorsProvider.default.md#isinstancelocal)

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

[default](server_services_base_CurrencyFactorsProvider.default.md).[logDebug](server_services_base_CurrencyFactorsProvider.default.md#logdebug)

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

[default](server_services_base_CurrencyFactorsProvider.default.md).[logError](server_services_base_CurrencyFactorsProvider.default.md#logerror)

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

[default](server_services_base_CurrencyFactorsProvider.default.md).[logInfo](server_services_base_CurrencyFactorsProvider.default.md#loginfo)

#### Defined in

[server/services/index.ts:92](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L92)

___

### requestInfo

▸ `Private` **requestInfo**(): `Promise`<`CurrencyLayerResponse`\>

#### Returns

`Promise`<`CurrencyLayerResponse`\>

#### Defined in

[server/services/currency-layer.ts:28](https://github.com/onzag/itemize/blob/a24376ed/server/services/currency-layer.ts#L28)

___

### run

▸ **run**(): `void` \| `Promise`<`void`\>

Executes some code

**`override`**

#### Returns

`void` \| `Promise`<`void`\>

#### Inherited from

[default](server_services_base_CurrencyFactorsProvider.default.md).[run](server_services_base_CurrencyFactorsProvider.default.md#run)

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

[default](server_services_base_CurrencyFactorsProvider.default.md).[setInstanceName](server_services_base_CurrencyFactorsProvider.default.md#setinstancename)

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

[default](server_services_base_CurrencyFactorsProvider.default.md).[setupGlobalResources](server_services_base_CurrencyFactorsProvider.default.md#setupglobalresources)

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

[default](server_services_base_CurrencyFactorsProvider.default.md).[setupLocalResources](server_services_base_CurrencyFactorsProvider.default.md#setuplocalresources)

#### Defined in

[server/services/index.ts:148](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L148)

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

[default](server_services_base_CurrencyFactorsProvider.default.md).[expressRouter](server_services_base_CurrencyFactorsProvider.default.md#expressrouter)

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

[default](server_services_base_CurrencyFactorsProvider.default.md).[getRouter](server_services_base_CurrencyFactorsProvider.default.md#getrouter)

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

[default](server_services_base_CurrencyFactorsProvider.default.md).[getTriggerRegistry](server_services_base_CurrencyFactorsProvider.default.md#gettriggerregistry)

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

#### Overrides

[default](server_services_base_CurrencyFactorsProvider.default.md).[getType](server_services_base_CurrencyFactorsProvider.default.md#gettype)

#### Defined in

[server/services/currency-layer.ts:24](https://github.com/onzag/itemize/blob/a24376ed/server/services/currency-layer.ts#L24)

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

[default](server_services_base_CurrencyFactorsProvider.default.md).[logDebug](server_services_base_CurrencyFactorsProvider.default.md#logdebug)

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

[default](server_services_base_CurrencyFactorsProvider.default.md).[logError](server_services_base_CurrencyFactorsProvider.default.md#logerror)

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

[default](server_services_base_CurrencyFactorsProvider.default.md).[logInfo](server_services_base_CurrencyFactorsProvider.default.md#loginfo)

#### Defined in

[server/services/index.ts:104](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L104)
