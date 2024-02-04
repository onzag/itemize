[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/services/registry](../modules/server_services_registry.md) / RegistryService

# Class: RegistryService

[server/services/registry](../modules/server_services_registry.md).RegistryService

The registry service allows services to store critical information
in a key value fashion, it's a rather simple service on its own
and it's special and not treated like other services, it even
runs on the load-dump and dump mechanisms

## Hierarchy

- [`ServiceProvider`](server_services.ServiceProvider.md)\<`IRegistryConfig`\>

  ↳ **`RegistryService`**

## Table of contents

### Constructors

- [constructor](server_services_registry.RegistryService.md#constructor)

### Properties

- [appConfig](server_services_registry.RegistryService.md#appconfig)
- [appDbConfig](server_services_registry.RegistryService.md#appdbconfig)
- [appRedisConfig](server_services_registry.RegistryService.md#appredisconfig)
- [appSensitiveConfig](server_services_registry.RegistryService.md#appsensitiveconfig)
- [config](server_services_registry.RegistryService.md#config)
- [globalCustomServices](server_services_registry.RegistryService.md#globalcustomservices)
- [globalDatabaseConnection](server_services_registry.RegistryService.md#globaldatabaseconnection)
- [globalInstance](server_services_registry.RegistryService.md#globalinstance)
- [globalMailProvider](server_services_registry.RegistryService.md#globalmailprovider)
- [globalPhoneProvider](server_services_registry.RegistryService.md#globalphoneprovider)
- [globalRawDB](server_services_registry.RegistryService.md#globalrawdb)
- [globalRedis](server_services_registry.RegistryService.md#globalredis)
- [globalRedisPub](server_services_registry.RegistryService.md#globalredispub)
- [globalRedisSub](server_services_registry.RegistryService.md#globalredissub)
- [globalRoot](server_services_registry.RegistryService.md#globalroot)
- [instanceName](server_services_registry.RegistryService.md#instancename)
- [localAppData](server_services_registry.RegistryService.md#localappdata)
- [localInstance](server_services_registry.RegistryService.md#localinstance)
- [memoryCache](server_services_registry.RegistryService.md#memorycache)
- [registry](server_services_registry.RegistryService.md#registry)

### Methods

- [createJWTSecretFor](server_services_registry.RegistryService.md#createjwtsecretfor)
- [delKey](server_services_registry.RegistryService.md#delkey)
- [execute](server_services_registry.RegistryService.md#execute)
- [expressRouter](server_services_registry.RegistryService.md#expressrouter)
- [getAllInPkey](server_services_registry.RegistryService.md#getallinpkey)
- [getAllInPkeyWithMemoryCache](server_services_registry.RegistryService.md#getallinpkeywithmemorycache)
- [getInstanceName](server_services_registry.RegistryService.md#getinstancename)
- [getJWTSecretFor](server_services_registry.RegistryService.md#getjwtsecretfor)
- [getKey](server_services_registry.RegistryService.md#getkey)
- [getKeyWithMemoryCache](server_services_registry.RegistryService.md#getkeywithmemorycache)
- [getRouter](server_services_registry.RegistryService.md#getrouter)
- [getRunCycleTime](server_services_registry.RegistryService.md#getruncycletime)
- [getTriggerRegistry](server_services_registry.RegistryService.md#gettriggerregistry)
- [initialize](server_services_registry.RegistryService.md#initialize)
- [invalidateAllInPkeyMemoryCache](server_services_registry.RegistryService.md#invalidateallinpkeymemorycache)
- [invalidateMemoryCache](server_services_registry.RegistryService.md#invalidatememorycache)
- [isInstanceGlobal](server_services_registry.RegistryService.md#isinstanceglobal)
- [isInstanceLocal](server_services_registry.RegistryService.md#isinstancelocal)
- [logDebug](server_services_registry.RegistryService.md#logdebug)
- [logError](server_services_registry.RegistryService.md#logerror)
- [logInfo](server_services_registry.RegistryService.md#loginfo)
- [run](server_services_registry.RegistryService.md#run)
- [setInstanceName](server_services_registry.RegistryService.md#setinstancename)
- [setKey](server_services_registry.RegistryService.md#setkey)
- [setKeyDontUpdate](server_services_registry.RegistryService.md#setkeydontupdate)
- [setupGlobalResources](server_services_registry.RegistryService.md#setupglobalresources)
- [setupLocalResources](server_services_registry.RegistryService.md#setuplocalresources)
- [expressRouter](server_services_registry.RegistryService.md#expressrouter-1)
- [getRouter](server_services_registry.RegistryService.md#getrouter-1)
- [getTriggerRegistry](server_services_registry.RegistryService.md#gettriggerregistry-1)
- [getType](server_services_registry.RegistryService.md#gettype)
- [logDebug](server_services_registry.RegistryService.md#logdebug-1)
- [logError](server_services_registry.RegistryService.md#logerror-1)
- [logInfo](server_services_registry.RegistryService.md#loginfo-1)

## Constructors

### constructor

• **new RegistryService**(`config`, `registry`, `configs`): [`RegistryService`](server_services_registry.RegistryService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `IRegistryConfig` |
| `registry` | [`RegistryService`](server_services_registry.RegistryService.md) |
| `configs` | `Object` |
| `configs.config` | [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md) |
| `configs.dbConfig` | [`IDBConfigRawJSONDataType`](../interfaces/config.IDBConfigRawJSONDataType.md) |
| `configs.redisConfig` | [`IRedisConfigRawJSONDataType`](../interfaces/config.IRedisConfigRawJSONDataType.md) |
| `configs.sensitiveConfig` | [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md) |

#### Returns

[`RegistryService`](server_services_registry.RegistryService.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[constructor](server_services.ServiceProvider.md#constructor)

#### Defined in

[server/services/index.ts:58](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L58)

## Properties

### appConfig

• **appConfig**: [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[appConfig](server_services.ServiceProvider.md#appconfig)

#### Defined in

[server/services/index.ts:35](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L35)

___

### appDbConfig

• **appDbConfig**: [`IDBConfigRawJSONDataType`](../interfaces/config.IDBConfigRawJSONDataType.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[appDbConfig](server_services.ServiceProvider.md#appdbconfig)

#### Defined in

[server/services/index.ts:37](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L37)

___

### appRedisConfig

• **appRedisConfig**: [`IRedisConfigRawJSONDataType`](../interfaces/config.IRedisConfigRawJSONDataType.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[appRedisConfig](server_services.ServiceProvider.md#appredisconfig)

#### Defined in

[server/services/index.ts:38](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L38)

___

### appSensitiveConfig

• **appSensitiveConfig**: [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[appSensitiveConfig](server_services.ServiceProvider.md#appsensitiveconfig)

#### Defined in

[server/services/index.ts:36](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L36)

___

### config

• **config**: `IRegistryConfig`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[config](server_services.ServiceProvider.md#config)

#### Defined in

[server/services/index.ts:33](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L33)

___

### globalCustomServices

• **globalCustomServices**: `Object`

#### Index signature

▪ [name: `string`]: [`ServiceProvider`](server_services.ServiceProvider.md)\<`any`\>

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalCustomServices](server_services.ServiceProvider.md#globalcustomservices)

#### Defined in

[server/services/index.ts:48](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L48)

___

### globalDatabaseConnection

• **globalDatabaseConnection**: [`DatabaseConnection`](database.DatabaseConnection.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalDatabaseConnection](server_services.ServiceProvider.md#globaldatabaseconnection)

#### Defined in

[server/services/index.ts:40](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L40)

___

### globalInstance

• **globalInstance**: `boolean` = `false`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalInstance](server_services.ServiceProvider.md#globalinstance)

#### Defined in

[server/services/index.ts:55](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L55)

___

### globalMailProvider

• **globalMailProvider**: [`default`](server_services_base_MailProvider.default.md)\<`any`\>

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalMailProvider](server_services.ServiceProvider.md#globalmailprovider)

#### Defined in

[server/services/index.ts:46](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L46)

___

### globalPhoneProvider

• **globalPhoneProvider**: [`default`](server_services_base_PhoneProvider.default.md)\<`any`\>

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalPhoneProvider](server_services.ServiceProvider.md#globalphoneprovider)

#### Defined in

[server/services/index.ts:47](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L47)

___

### globalRawDB

• **globalRawDB**: [`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalRawDB](server_services.ServiceProvider.md#globalrawdb)

#### Defined in

[server/services/index.ts:44](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L44)

___

### globalRedis

• **globalRedis**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalRedis](server_services.ServiceProvider.md#globalredis)

#### Defined in

[server/services/index.ts:43](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L43)

___

### globalRedisPub

• **globalRedisPub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalRedisPub](server_services.ServiceProvider.md#globalredispub)

#### Defined in

[server/services/index.ts:41](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L41)

___

### globalRedisSub

• **globalRedisSub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalRedisSub](server_services.ServiceProvider.md#globalredissub)

#### Defined in

[server/services/index.ts:42](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L42)

___

### globalRoot

• **globalRoot**: [`default`](base_Root.default.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalRoot](server_services.ServiceProvider.md#globalroot)

#### Defined in

[server/services/index.ts:45](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L45)

___

### instanceName

• **instanceName**: `string`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[instanceName](server_services.ServiceProvider.md#instancename)

#### Defined in

[server/services/index.ts:54](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L54)

___

### localAppData

• **localAppData**: [`IAppDataType`](../interfaces/server.IAppDataType.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[localAppData](server_services.ServiceProvider.md#localappdata)

#### Defined in

[server/services/index.ts:52](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L52)

___

### localInstance

• **localInstance**: `boolean` = `false`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[localInstance](server_services.ServiceProvider.md#localinstance)

#### Defined in

[server/services/index.ts:56](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L56)

___

### memoryCache

• `Private` **memoryCache**: `Object` = `{}`

#### Index signature

▪ [key: `string`]: `any`

#### Defined in

[server/services/registry.ts:26](https://github.com/onzag/itemize/blob/73e0c39e/server/services/registry.ts#L26)

___

### registry

• **registry**: [`RegistryService`](server_services_registry.RegistryService.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[registry](server_services.ServiceProvider.md#registry)

#### Defined in

[server/services/index.ts:34](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L34)

## Methods

### createJWTSecretFor

▸ **createJWTSecretFor**(`pkey`, `skey?`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pkey` | `string` |
| `skey?` | `string` |

#### Returns

`Promise`\<`any`\>

#### Defined in

[server/services/registry.ts:223](https://github.com/onzag/itemize/blob/73e0c39e/server/services/registry.ts#L223)

___

### delKey

▸ **delKey**(`pkey`, `skey?`): `Promise`\<`void`\>

deletes a key value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pkey` | `string` | the primary key name |
| `skey?` | `string` | an optional secondary key name |

#### Returns

`Promise`\<`void`\>

#### Defined in

[server/services/registry.ts:272](https://github.com/onzag/itemize/blob/73e0c39e/server/services/registry.ts#L272)

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

[server/services/index.ts:170](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L170)

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

[server/services/index.ts:116](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L116)

___

### getAllInPkey

▸ **getAllInPkey**(`pkey`): `Promise`\<`IAllKeyResult`\>

Provides all the subkeys including the empty default subkey
for the given registry key name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pkey` | `string` | the primary key name |

#### Returns

`Promise`\<`IAllKeyResult`\>

#### Defined in

[server/services/registry.ts:110](https://github.com/onzag/itemize/blob/73e0c39e/server/services/registry.ts#L110)

___

### getAllInPkeyWithMemoryCache

▸ **getAllInPkeyWithMemoryCache**(`pkey`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pkey` | `string` |

#### Returns

`Promise`\<`any`\>

#### Defined in

[server/services/registry.ts:197](https://github.com/onzag/itemize/blob/73e0c39e/server/services/registry.ts#L197)

___

### getInstanceName

▸ **getInstanceName**(): `string`

#### Returns

`string`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[getInstanceName](server_services.ServiceProvider.md#getinstancename)

#### Defined in

[server/services/index.ts:80](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L80)

___

### getJWTSecretFor

▸ **getJWTSecretFor**(`pkey`, `skey?`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pkey` | `string` |
| `skey?` | `string` |

#### Returns

`Promise`\<`any`\>

#### Defined in

[server/services/registry.ts:244](https://github.com/onzag/itemize/blob/73e0c39e/server/services/registry.ts#L244)

___

### getKey

▸ **getKey**(`pkey`, `skey?`): `Promise`\<`any`\>

Provides a single key value
if not found provides null

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pkey` | `string` | the primary key name |
| `skey?` | `string` | an optional secondary key name |

#### Returns

`Promise`\<`any`\>

#### Defined in

[server/services/registry.ts:157](https://github.com/onzag/itemize/blob/73e0c39e/server/services/registry.ts#L157)

___

### getKeyWithMemoryCache

▸ **getKeyWithMemoryCache**(`pkey`, `skey?`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pkey` | `string` |
| `skey?` | `string` |

#### Returns

`Promise`\<`any`\>

#### Defined in

[server/services/registry.ts:205](https://github.com/onzag/itemize/blob/73e0c39e/server/services/registry.ts#L205)

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

[server/services/index.ts:266](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L266)

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

[server/services/index.ts:239](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L239)

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

[server/services/index.ts:293](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L293)

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

[server/services/index.ts:230](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L230)

___

### invalidateAllInPkeyMemoryCache

▸ **invalidateAllInPkeyMemoryCache**(`pkey`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pkey` | `string` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[server/services/registry.ts:219](https://github.com/onzag/itemize/blob/73e0c39e/server/services/registry.ts#L219)

___

### invalidateMemoryCache

▸ **invalidateMemoryCache**(`pkey`, `skey?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pkey` | `string` |
| `skey?` | `string` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[server/services/registry.ts:214](https://github.com/onzag/itemize/blob/73e0c39e/server/services/registry.ts#L214)

___

### isInstanceGlobal

▸ **isInstanceGlobal**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[isInstanceGlobal](server_services.ServiceProvider.md#isinstanceglobal)

#### Defined in

[server/services/index.ts:84](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L84)

___

### isInstanceLocal

▸ **isInstanceLocal**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[isInstanceLocal](server_services.ServiceProvider.md#isinstancelocal)

#### Defined in

[server/services/index.ts:88](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L88)

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

[server/services/index.ts:96](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L96)

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

[server/services/index.ts:100](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L100)

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

[server/services/index.ts:92](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L92)

___

### run

▸ **run**(): `void` \| `Promise`\<`void`\>

Executes some code

#### Returns

`void` \| `Promise`\<`void`\>

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[run](server_services.ServiceProvider.md#run)

#### Defined in

[server/services/index.ts:247](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L247)

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

[server/services/index.ts:76](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L76)

___

### setKey

▸ **setKey**(`pkey`, `value`, `skey?`): `Promise`\<`void`\>

Sets a key in the given registry

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pkey` | `string` | the primary key name |
| `value` | `any` | any JSON serializable value |
| `skey?` | `string` | an optional subkey value |

#### Returns

`Promise`\<`void`\>

#### Defined in

[server/services/registry.ts:37](https://github.com/onzag/itemize/blob/73e0c39e/server/services/registry.ts#L37)

___

### setKeyDontUpdate

▸ **setKeyDontUpdate**(`pkey`, `value`, `skey?`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pkey` | `string` |
| `value` | `any` |
| `skey?` | `string` |

#### Returns

`Promise`\<`any`\>

#### Defined in

[server/services/registry.ts:61](https://github.com/onzag/itemize/blob/73e0c39e/server/services/registry.ts#L61)

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

[server/services/index.ts:124](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L124)

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

[server/services/index.ts:148](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L148)

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

[server/services/index.ts:120](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L120)

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

[server/services/index.ts:283](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L283)

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

[server/services/index.ts:305](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L305)

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

[server/services/registry.ts:27](https://github.com/onzag/itemize/blob/73e0c39e/server/services/registry.ts#L27)

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

[server/services/index.ts:108](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L108)

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

[server/services/index.ts:112](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L112)

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

[server/services/index.ts:104](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L104)
