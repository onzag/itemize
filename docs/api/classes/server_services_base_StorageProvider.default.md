[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/services/base/StorageProvider](../modules/server_services_base_StorageProvider.md) / default

# Class: default<T\>

[server/services/base/StorageProvider](../modules/server_services_base_StorageProvider.md).default

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`ServiceProvider`](server_services.ServiceProvider.md)<`T`\>

  ↳ **`default`**

  ↳↳ [`LocalStorageService`](server_services_local_storage.LocalStorageService.md)

  ↳↳ [`OpenstackService`](server_services_openstack.OpenstackService.md)

## Table of contents

### Constructors

- [constructor](server_services_base_StorageProvider.default.md#constructor)

### Properties

- [appConfig](server_services_base_StorageProvider.default.md#appconfig)
- [appSensitiveConfig](server_services_base_StorageProvider.default.md#appsensitiveconfig)
- [config](server_services_base_StorageProvider.default.md#config)
- [globalCustomServices](server_services_base_StorageProvider.default.md#globalcustomservices)
- [globalDatabaseConnection](server_services_base_StorageProvider.default.md#globaldatabaseconnection)
- [globalInstance](server_services_base_StorageProvider.default.md#globalinstance)
- [globalMailProvider](server_services_base_StorageProvider.default.md#globalmailprovider)
- [globalPhoneProvider](server_services_base_StorageProvider.default.md#globalphoneprovider)
- [globalRawDB](server_services_base_StorageProvider.default.md#globalrawdb)
- [globalRedis](server_services_base_StorageProvider.default.md#globalredis)
- [globalRedisPub](server_services_base_StorageProvider.default.md#globalredispub)
- [globalRedisSub](server_services_base_StorageProvider.default.md#globalredissub)
- [globalRoot](server_services_base_StorageProvider.default.md#globalroot)
- [id](server_services_base_StorageProvider.default.md#id)
- [instanceName](server_services_base_StorageProvider.default.md#instancename)
- [localAppData](server_services_base_StorageProvider.default.md#localappdata)
- [localInstance](server_services_base_StorageProvider.default.md#localinstance)
- [prefix](server_services_base_StorageProvider.default.md#prefix)
- [registry](server_services_base_StorageProvider.default.md#registry)

### Methods

- [copyFolder](server_services_base_StorageProvider.default.md#copyfolder)
- [dumpFolder](server_services_base_StorageProvider.default.md#dumpfolder)
- [execute](server_services_base_StorageProvider.default.md#execute)
- [exists](server_services_base_StorageProvider.default.md#exists)
- [expressRouter](server_services_base_StorageProvider.default.md#expressrouter)
- [getId](server_services_base_StorageProvider.default.md#getid)
- [getInstanceName](server_services_base_StorageProvider.default.md#getinstancename)
- [getPrefix](server_services_base_StorageProvider.default.md#getprefix)
- [getRouter](server_services_base_StorageProvider.default.md#getrouter)
- [getRunCycleTime](server_services_base_StorageProvider.default.md#getruncycletime)
- [getTriggerRegistry](server_services_base_StorageProvider.default.md#gettriggerregistry)
- [initialize](server_services_base_StorageProvider.default.md#initialize)
- [isInstanceGlobal](server_services_base_StorageProvider.default.md#isinstanceglobal)
- [isInstanceLocal](server_services_base_StorageProvider.default.md#isinstancelocal)
- [logDebug](server_services_base_StorageProvider.default.md#logdebug)
- [logError](server_services_base_StorageProvider.default.md#logerror)
- [logInfo](server_services_base_StorageProvider.default.md#loginfo)
- [read](server_services_base_StorageProvider.default.md#read)
- [removeFolder](server_services_base_StorageProvider.default.md#removefolder)
- [run](server_services_base_StorageProvider.default.md#run)
- [setId](server_services_base_StorageProvider.default.md#setid)
- [setInstanceName](server_services_base_StorageProvider.default.md#setinstancename)
- [setPrefix](server_services_base_StorageProvider.default.md#setprefix)
- [setupGlobalResources](server_services_base_StorageProvider.default.md#setupglobalresources)
- [setupLocalResources](server_services_base_StorageProvider.default.md#setuplocalresources)
- [upload](server_services_base_StorageProvider.default.md#upload)
- [expressRouter](server_services_base_StorageProvider.default.md#expressrouter)
- [getRouter](server_services_base_StorageProvider.default.md#getrouter)
- [getTriggerRegistry](server_services_base_StorageProvider.default.md#gettriggerregistry)
- [getType](server_services_base_StorageProvider.default.md#gettype)
- [logDebug](server_services_base_StorageProvider.default.md#logdebug)
- [logError](server_services_base_StorageProvider.default.md#logerror)
- [logInfo](server_services_base_StorageProvider.default.md#loginfo)

## Constructors

### constructor

• **new default**<`T`\>(`config`, `registry`, `appConfig`, `appSensitiveConfig`)

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

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[constructor](server_services.ServiceProvider.md#constructor)

#### Defined in

[server/services/index.ts:58](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L58)

## Properties

### appConfig

• **appConfig**: [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[appConfig](server_services.ServiceProvider.md#appconfig)

#### Defined in

[server/services/index.ts:37](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L37)

___

### appSensitiveConfig

• **appSensitiveConfig**: [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[appSensitiveConfig](server_services.ServiceProvider.md#appsensitiveconfig)

#### Defined in

[server/services/index.ts:38](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L38)

___

### config

• **config**: `T`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[config](server_services.ServiceProvider.md#config)

#### Defined in

[server/services/index.ts:35](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L35)

___

### globalCustomServices

• **globalCustomServices**: `Object`

#### Index signature

▪ [name: `string`]: [`ServiceProvider`](server_services.ServiceProvider.md)<`any`\>

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalCustomServices](server_services.ServiceProvider.md#globalcustomservices)

#### Defined in

[server/services/index.ts:48](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L48)

___

### globalDatabaseConnection

• **globalDatabaseConnection**: [`DatabaseConnection`](database.DatabaseConnection.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalDatabaseConnection](server_services.ServiceProvider.md#globaldatabaseconnection)

#### Defined in

[server/services/index.ts:40](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L40)

___

### globalInstance

• **globalInstance**: `boolean`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalInstance](server_services.ServiceProvider.md#globalinstance)

#### Defined in

[server/services/index.ts:55](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L55)

___

### globalMailProvider

• **globalMailProvider**: [`default`](server_services_base_MailProvider.default.md)<`any`\>

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalMailProvider](server_services.ServiceProvider.md#globalmailprovider)

#### Defined in

[server/services/index.ts:46](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L46)

___

### globalPhoneProvider

• **globalPhoneProvider**: [`default`](server_services_base_PhoneProvider.default.md)<`any`\>

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalPhoneProvider](server_services.ServiceProvider.md#globalphoneprovider)

#### Defined in

[server/services/index.ts:47](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L47)

___

### globalRawDB

• **globalRawDB**: [`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalRawDB](server_services.ServiceProvider.md#globalrawdb)

#### Defined in

[server/services/index.ts:44](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L44)

___

### globalRedis

• **globalRedis**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalRedis](server_services.ServiceProvider.md#globalredis)

#### Defined in

[server/services/index.ts:43](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L43)

___

### globalRedisPub

• **globalRedisPub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalRedisPub](server_services.ServiceProvider.md#globalredispub)

#### Defined in

[server/services/index.ts:41](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L41)

___

### globalRedisSub

• **globalRedisSub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalRedisSub](server_services.ServiceProvider.md#globalredissub)

#### Defined in

[server/services/index.ts:42](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L42)

___

### globalRoot

• **globalRoot**: [`default`](base_Root.default.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalRoot](server_services.ServiceProvider.md#globalroot)

#### Defined in

[server/services/index.ts:45](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L45)

___

### id

• **id**: `string`

#### Defined in

[server/services/base/StorageProvider.ts:16](https://github.com/onzag/itemize/blob/5c2808d3/server/services/base/StorageProvider.ts#L16)

___

### instanceName

• **instanceName**: `string`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[instanceName](server_services.ServiceProvider.md#instancename)

#### Defined in

[server/services/index.ts:54](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L54)

___

### localAppData

• **localAppData**: [`IAppDataType`](../interfaces/server.IAppDataType.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[localAppData](server_services.ServiceProvider.md#localappdata)

#### Defined in

[server/services/index.ts:52](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L52)

___

### localInstance

• **localInstance**: `boolean`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[localInstance](server_services.ServiceProvider.md#localinstance)

#### Defined in

[server/services/index.ts:56](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L56)

___

### prefix

• **prefix**: `string`

#### Defined in

[server/services/base/StorageProvider.ts:15](https://github.com/onzag/itemize/blob/5c2808d3/server/services/base/StorageProvider.ts#L15)

___

### registry

• **registry**: [`RegistryService`](server_services_registry.RegistryService.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[registry](server_services.ServiceProvider.md#registry)

#### Defined in

[server/services/index.ts:36](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L36)

## Methods

### copyFolder

▸ **copyFolder**(`remotePath`, `targetPath`, `target`): `Promise`<`void`\>

Should copy a folder from one container to another target container, note that during
calls the target container may be itself, optimize if necessary for such calls

NECESSARY FOR CUSTOM SERVER COPY CALLS TO FUNCTION

**`override`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `remotePath` | `string` |
| `targetPath` | `string` |
| `target` | [`default`](server_services_base_StorageProvider.default.md)<`any`\> |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/services/base/StorageProvider.ts:102](https://github.com/onzag/itemize/blob/5c2808d3/server/services/base/StorageProvider.ts#L102)

___

### dumpFolder

▸ **dumpFolder**(`remotePath`, `localPath`): `Promise`<`void`\>

This function is executed once an entire folder
is requested to be downloaded locally in the given
local path

NECESSARY FOR DUMPING TO FUNCTION

**`override`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `remotePath` | `string` | the remote path |
| `localPath` | `string` | the local path |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/services/base/StorageProvider.ts:87](https://github.com/onzag/itemize/blob/5c2808d3/server/services/base/StorageProvider.ts#L87)

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

[server/services/index.ts:164](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L164)

___

### exists

▸ **exists**(`at`): `Promise`<`boolean`\>

It's executed to verify whether a given remote resource
exists

NECESSARY FOR CORE ITEMIZE TO FUNCTION

**`override`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `at` | `string` | the resource to check for |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[server/services/base/StorageProvider.ts:72](https://github.com/onzag/itemize/blob/5c2808d3/server/services/base/StorageProvider.ts#L72)

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

[server/services/index.ts:110](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L110)

___

### getId

▸ **getId**(): `string`

#### Returns

`string`

#### Defined in

[server/services/base/StorageProvider.ts:30](https://github.com/onzag/itemize/blob/5c2808d3/server/services/base/StorageProvider.ts#L30)

___

### getInstanceName

▸ **getInstanceName**(): `string`

#### Returns

`string`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[getInstanceName](server_services.ServiceProvider.md#getinstancename)

#### Defined in

[server/services/index.ts:74](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L74)

___

### getPrefix

▸ **getPrefix**(): `string`

#### Returns

`string`

#### Defined in

[server/services/base/StorageProvider.ts:26](https://github.com/onzag/itemize/blob/5c2808d3/server/services/base/StorageProvider.ts#L26)

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

[ServiceProvider](server_services.ServiceProvider.md).[getRouter](server_services.ServiceProvider.md#getrouter)

#### Defined in

[server/services/index.ts:251](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L251)

___

### getRunCycleTime

▸ **getRunCycleTime**(): `number`

Determines whether the run function
should run over again

**`override`**

#### Returns

`number`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[getRunCycleTime](server_services.ServiceProvider.md#getruncycletime)

#### Defined in

[server/services/index.ts:224](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L224)

___

### getTriggerRegistry

▸ **getTriggerRegistry**(): [`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md) \| `Promise`<[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md)\>

Allows to setup trigger registries via the service
so that they trigger just as normal trigger will do

**`override`**

#### Returns

[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md) \| `Promise`<[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md)\>

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[getTriggerRegistry](server_services.ServiceProvider.md#gettriggerregistry)

#### Defined in

[server/services/index.ts:278](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L278)

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

[ServiceProvider](server_services.ServiceProvider.md).[initialize](server_services.ServiceProvider.md#initialize)

#### Defined in

[server/services/index.ts:215](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L215)

___

### isInstanceGlobal

▸ **isInstanceGlobal**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[isInstanceGlobal](server_services.ServiceProvider.md#isinstanceglobal)

#### Defined in

[server/services/index.ts:78](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L78)

___

### isInstanceLocal

▸ **isInstanceLocal**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[isInstanceLocal](server_services.ServiceProvider.md#isinstancelocal)

#### Defined in

[server/services/index.ts:82](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L82)

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

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[logDebug](server_services.ServiceProvider.md#logdebug)

#### Defined in

[server/services/index.ts:90](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L90)

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

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[logError](server_services.ServiceProvider.md#logerror)

#### Defined in

[server/services/index.ts:94](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L94)

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

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[logInfo](server_services.ServiceProvider.md#loginfo)

#### Defined in

[server/services/index.ts:86](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L86)

___

### read

▸ **read**(`at`): `Promise`<`string`\>

It's executed to read files

NECESSARY FOR SEO TO FUNCTION

**`override`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `at` | `string` | the file to read |

#### Returns

`Promise`<`string`\>

#### Defined in

[server/services/base/StorageProvider.ts:114](https://github.com/onzag/itemize/blob/5c2808d3/server/services/base/StorageProvider.ts#L114)

___

### removeFolder

▸ **removeFolder**(`at`): `Promise`<`void`\>

This function is executed once a folder
removal is requested

NECESSARY FOR CORE ITEMIZE TO FUNCTION

**`override`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `at` | `string` | the remote folder to remove |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/services/base/StorageProvider.ts:59](https://github.com/onzag/itemize/blob/5c2808d3/server/services/base/StorageProvider.ts#L59)

___

### run

▸ **run**(): `void` \| `Promise`<`void`\>

Executes some code

**`override`**

#### Returns

`void` \| `Promise`<`void`\>

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[run](server_services.ServiceProvider.md#run)

#### Defined in

[server/services/index.ts:232](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L232)

___

### setId

▸ **setId**(`id`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`void`

#### Defined in

[server/services/base/StorageProvider.ts:22](https://github.com/onzag/itemize/blob/5c2808d3/server/services/base/StorageProvider.ts#L22)

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

[server/services/index.ts:70](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L70)

___

### setPrefix

▸ **setPrefix**(`prefix`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prefix` | `string` |

#### Returns

`void`

#### Defined in

[server/services/base/StorageProvider.ts:18](https://github.com/onzag/itemize/blob/5c2808d3/server/services/base/StorageProvider.ts#L18)

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

[ServiceProvider](server_services.ServiceProvider.md).[setupGlobalResources](server_services.ServiceProvider.md#setupglobalresources)

#### Defined in

[server/services/index.ts:118](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L118)

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

[server/services/index.ts:142](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L142)

___

### upload

▸ **upload**(`at`, `readStream`, `mustBeVerified`): `Promise`<`void`\>

This function is executed when the service
uploading a read stream

NECESSARY FOR CORE ITEMIZE TO FUNCTION

**`override`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `at` | `string` | the remote file to use |
| `readStream` | `ReadStream` \| `Readable` | the stream to read from |
| `mustBeVerified` | `boolean` | a boolean that specifies whether the resouce must be verified and return a 200 when requested |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/services/base/StorageProvider.ts:46](https://github.com/onzag/itemize/blob/5c2808d3/server/services/base/StorageProvider.ts#L46)

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

[ServiceProvider](server_services.ServiceProvider.md).[expressRouter](server_services.ServiceProvider.md#expressrouter)

#### Defined in

[server/services/index.ts:114](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L114)

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

[ServiceProvider](server_services.ServiceProvider.md).[getRouter](server_services.ServiceProvider.md#getrouter)

#### Defined in

[server/services/index.ts:268](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L268)

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

[ServiceProvider](server_services.ServiceProvider.md).[getTriggerRegistry](server_services.ServiceProvider.md#gettriggerregistry)

#### Defined in

[server/services/index.ts:290](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L290)

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

[ServiceProvider](server_services.ServiceProvider.md).[getType](server_services.ServiceProvider.md#gettype)

#### Defined in

[server/services/base/StorageProvider.ts:11](https://github.com/onzag/itemize/blob/5c2808d3/server/services/base/StorageProvider.ts#L11)

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

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[logDebug](server_services.ServiceProvider.md#logdebug)

#### Defined in

[server/services/index.ts:102](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L102)

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

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[logError](server_services.ServiceProvider.md#logerror)

#### Defined in

[server/services/index.ts:106](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L106)

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

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[logInfo](server_services.ServiceProvider.md#loginfo)

#### Defined in

[server/services/index.ts:98](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L98)
