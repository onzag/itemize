[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/services](../modules/server_services.md) / ServiceProvider

# Class: ServiceProvider<T\>

[server/services](../modules/server_services.md).ServiceProvider

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- **`ServiceProvider`**

  ↳ [`default`](server_services_base_CurrencyFactorsProvider.default.md)

  ↳ [`default`](server_services_base_LocationSearchProvider.default.md)

  ↳ [`default`](server_services_base_MailProvider.default.md)

  ↳ [`default`](server_services_base_PaymentProvider.default.md)

  ↳ [`default`](server_services_base_PhoneProvider.default.md)

  ↳ [`default`](server_services_base_StorageProvider.default.md)

  ↳ [`default`](server_services_base_UserLocalizationProvider.default.md)

  ↳ [`RegistryService`](server_services_registry.RegistryService.md)

## Table of contents

### Constructors

- [constructor](server_services.ServiceProvider.md#constructor)

### Properties

- [appConfig](server_services.ServiceProvider.md#appconfig)
- [appSensitiveConfig](server_services.ServiceProvider.md#appsensitiveconfig)
- [config](server_services.ServiceProvider.md#config)
- [globalCustomServices](server_services.ServiceProvider.md#globalcustomservices)
- [globalDatabaseConnection](server_services.ServiceProvider.md#globaldatabaseconnection)
- [globalInstance](server_services.ServiceProvider.md#globalinstance)
- [globalMailProvider](server_services.ServiceProvider.md#globalmailprovider)
- [globalPhoneProvider](server_services.ServiceProvider.md#globalphoneprovider)
- [globalRawDB](server_services.ServiceProvider.md#globalrawdb)
- [globalRedis](server_services.ServiceProvider.md#globalredis)
- [globalRedisPub](server_services.ServiceProvider.md#globalredispub)
- [globalRedisSub](server_services.ServiceProvider.md#globalredissub)
- [globalRoot](server_services.ServiceProvider.md#globalroot)
- [instanceName](server_services.ServiceProvider.md#instancename)
- [lastRan](server_services.ServiceProvider.md#lastran)
- [localAppData](server_services.ServiceProvider.md#localappdata)
- [localInstance](server_services.ServiceProvider.md#localinstance)
- [registry](server_services.ServiceProvider.md#registry)

### Methods

- [execute](server_services.ServiceProvider.md#execute)
- [expressRouter](server_services.ServiceProvider.md#expressrouter)
- [getInstanceName](server_services.ServiceProvider.md#getinstancename)
- [getRouter](server_services.ServiceProvider.md#getrouter)
- [getRunCycleTime](server_services.ServiceProvider.md#getruncycletime)
- [getTriggerRegistry](server_services.ServiceProvider.md#gettriggerregistry)
- [initialize](server_services.ServiceProvider.md#initialize)
- [isInstanceGlobal](server_services.ServiceProvider.md#isinstanceglobal)
- [isInstanceLocal](server_services.ServiceProvider.md#isinstancelocal)
- [logDebug](server_services.ServiceProvider.md#logdebug)
- [logError](server_services.ServiceProvider.md#logerror)
- [logInfo](server_services.ServiceProvider.md#loginfo)
- [run](server_services.ServiceProvider.md#run)
- [setInstanceName](server_services.ServiceProvider.md#setinstancename)
- [setupGlobalResources](server_services.ServiceProvider.md#setupglobalresources)
- [setupLocalResources](server_services.ServiceProvider.md#setuplocalresources)
- [expressRouter](server_services.ServiceProvider.md#expressrouter)
- [getRouter](server_services.ServiceProvider.md#getrouter)
- [getTriggerRegistry](server_services.ServiceProvider.md#gettriggerregistry)
- [getType](server_services.ServiceProvider.md#gettype)
- [logDebug](server_services.ServiceProvider.md#logdebug)
- [logError](server_services.ServiceProvider.md#logerror)
- [logInfo](server_services.ServiceProvider.md#loginfo)

## Constructors

### constructor

• **new ServiceProvider**<`T`\>(`config`, `registry`, `appConfig`, `appSensitiveConfig`)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `T` |
| `registry` | [`RegistryService`](server_services_registry.RegistryService.md) |
| `appConfig` | [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md) |
| `appSensitiveConfig` | [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md) |

#### Defined in

[server/services/index.ts:58](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L58)

## Properties

### appConfig

• **appConfig**: [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md)

#### Defined in

[server/services/index.ts:37](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L37)

___

### appSensitiveConfig

• **appSensitiveConfig**: [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md)

#### Defined in

[server/services/index.ts:38](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L38)

___

### config

• **config**: `T`

#### Defined in

[server/services/index.ts:35](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L35)

___

### globalCustomServices

• **globalCustomServices**: `Object`

#### Index signature

▪ [name: `string`]: [`ServiceProvider`](server_services.ServiceProvider.md)<`any`\>

#### Defined in

[server/services/index.ts:48](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L48)

___

### globalDatabaseConnection

• **globalDatabaseConnection**: `DatabaseConnection`

#### Defined in

[server/services/index.ts:40](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L40)

___

### globalInstance

• **globalInstance**: `boolean`

#### Defined in

[server/services/index.ts:55](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L55)

___

### globalMailProvider

• **globalMailProvider**: [`default`](server_services_base_MailProvider.default.md)<`any`\>

#### Defined in

[server/services/index.ts:46](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L46)

___

### globalPhoneProvider

• **globalPhoneProvider**: [`default`](server_services_base_PhoneProvider.default.md)<`any`\>

#### Defined in

[server/services/index.ts:47](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L47)

___

### globalRawDB

• **globalRawDB**: [`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md)

#### Defined in

[server/services/index.ts:44](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L44)

___

### globalRedis

• **globalRedis**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Defined in

[server/services/index.ts:43](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L43)

___

### globalRedisPub

• **globalRedisPub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Defined in

[server/services/index.ts:41](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L41)

___

### globalRedisSub

• **globalRedisSub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Defined in

[server/services/index.ts:42](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L42)

___

### globalRoot

• **globalRoot**: [`default`](base_Root.default.md)

#### Defined in

[server/services/index.ts:45](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L45)

___

### instanceName

• **instanceName**: `string`

#### Defined in

[server/services/index.ts:54](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L54)

___

### lastRan

• `Private` **lastRan**: `number`

#### Defined in

[server/services/index.ts:33](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L33)

___

### localAppData

• **localAppData**: [`IAppDataType`](../interfaces/server.IAppDataType.md)

#### Defined in

[server/services/index.ts:52](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L52)

___

### localInstance

• **localInstance**: `boolean`

#### Defined in

[server/services/index.ts:56](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L56)

___

### registry

• **registry**: [`RegistryService`](server_services_registry.RegistryService.md)

#### Defined in

[server/services/index.ts:36](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L36)

## Methods

### execute

▸ **execute**(): `void`

Performs the execution of the service, basically
it will do the run function and then re-run as specified

#### Returns

`void`

#### Defined in

[server/services/index.ts:164](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L164)

___

### expressRouter

▸ **expressRouter**(`options?`): `Router`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `RouterOptions` |

#### Returns

`Router`

#### Defined in

[server/services/index.ts:110](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L110)

___

### getInstanceName

▸ **getInstanceName**(): `string`

#### Returns

`string`

#### Defined in

[server/services/index.ts:74](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L74)

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

#### Defined in

[server/services/index.ts:251](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L251)

___

### getRunCycleTime

▸ **getRunCycleTime**(): `number`

Determines whether the run function
should run over again

**`override`**

#### Returns

`number`

#### Defined in

[server/services/index.ts:224](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L224)

___

### getTriggerRegistry

▸ **getTriggerRegistry**(): [`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md) \| `Promise`<[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md)\>

Allows to setup trigger registries via the service
so that they trigger just as normal trigger will do

**`override`**

#### Returns

[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md) \| `Promise`<[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md)\>

#### Defined in

[server/services/index.ts:278](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L278)

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

#### Defined in

[server/services/index.ts:215](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L215)

___

### isInstanceGlobal

▸ **isInstanceGlobal**(): `boolean`

#### Returns

`boolean`

#### Defined in

[server/services/index.ts:78](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L78)

___

### isInstanceLocal

▸ **isInstanceLocal**(): `boolean`

#### Returns

`boolean`

#### Defined in

[server/services/index.ts:82](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L82)

___

### logDebug

▸ **logDebug**(`str`, `extra?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |
| `extra?` | `any` |

#### Returns

`void`

#### Defined in

[server/services/index.ts:90](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L90)

___

### logError

▸ **logError**(`str`, `extra?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |
| `extra?` | `any` |

#### Returns

`void`

#### Defined in

[server/services/index.ts:94](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L94)

___

### logInfo

▸ **logInfo**(`str`, `extra?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |
| `extra?` | `any` |

#### Returns

`void`

#### Defined in

[server/services/index.ts:86](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L86)

___

### run

▸ **run**(): `void` \| `Promise`<`void`\>

Executes some code

**`override`**

#### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[server/services/index.ts:232](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L232)

___

### setInstanceName

▸ **setInstanceName**(`n`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `string` |

#### Returns

`void`

#### Defined in

[server/services/index.ts:70](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L70)

___

### setupGlobalResources

▸ **setupGlobalResources**(`globalDatabaseConnection`, `globalClient`, `globalPub`, `globalSub`, `globalMailProvider`, `globalPhoneProvider`, `globalCustomServices`, `root`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `globalDatabaseConnection` | `DatabaseConnection` |
| `globalClient` | [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md) |
| `globalPub` | [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md) |
| `globalSub` | [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md) |
| `globalMailProvider` | [`default`](server_services_base_MailProvider.default.md)<`any`\> |
| `globalPhoneProvider` | [`default`](server_services_base_PhoneProvider.default.md)<`any`\> |
| `globalCustomServices` | `Object` |
| `root` | [`default`](base_Root.default.md) |

#### Returns

`void`

#### Defined in

[server/services/index.ts:118](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L118)

___

### setupLocalResources

▸ **setupLocalResources**(`appData`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |

#### Returns

`void`

#### Defined in

[server/services/index.ts:142](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L142)

___

### expressRouter

▸ `Static` **expressRouter**(`options?`): `Router`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `RouterOptions` |

#### Returns

`Router`

#### Defined in

[server/services/index.ts:114](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L114)

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

#### Defined in

[server/services/index.ts:268](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L268)

___

### getTriggerRegistry

▸ `Static` **getTriggerRegistry**(): [`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md) \| `Promise`<[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md)\>

Allows to setup trigger registries via the service
so that they trigger just as normal trigger will do

This gets attached if a class is used rather than per instance

**`override`**

#### Returns

[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md) \| `Promise`<[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md)\>

#### Defined in

[server/services/index.ts:290](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L290)

___

### getType

▸ `Static` **getType**(): [`ServiceProviderType`](../enums/server_services.ServiceProviderType.md)

Specifies whether the current service is a global service
if true global services will only execute initialize and a router
will not be extracted from them

it will instead have access to the global resources

**`override`**

#### Returns

[`ServiceProviderType`](../enums/server_services.ServiceProviderType.md)

#### Defined in

[server/services/index.ts:156](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L156)

___

### logDebug

▸ `Static` **logDebug**(`str`, `extra?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |
| `extra?` | `any` |

#### Returns

`void`

#### Defined in

[server/services/index.ts:102](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L102)

___

### logError

▸ `Static` **logError**(`str`, `extra?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |
| `extra?` | `any` |

#### Returns

`void`

#### Defined in

[server/services/index.ts:106](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L106)

___

### logInfo

▸ `Static` **logInfo**(`str`, `extra?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |
| `extra?` | `any` |

#### Returns

`void`

#### Defined in

[server/services/index.ts:98](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L98)
