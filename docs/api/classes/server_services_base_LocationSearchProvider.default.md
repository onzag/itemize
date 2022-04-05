[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/services/base/LocationSearchProvider](../modules/server_services_base_LocationSearchProvider.md) / default

# Class: default<T\>

[server/services/base/LocationSearchProvider](../modules/server_services_base_LocationSearchProvider.md).default

The location search provider is a base interface type class
that specifies how to create a service for location search

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`ServiceProvider`](server_services.ServiceProvider.md)<`T`\>

  ↳ **`default`**

  ↳↳ [`HereMapsService`](server_services_here.HereMapsService.md)

## Table of contents

### Constructors

- [constructor](server_services_base_LocationSearchProvider.default.md#constructor)

### Properties

- [appConfig](server_services_base_LocationSearchProvider.default.md#appconfig)
- [appSensitiveConfig](server_services_base_LocationSearchProvider.default.md#appsensitiveconfig)
- [config](server_services_base_LocationSearchProvider.default.md#config)
- [globalCustomServices](server_services_base_LocationSearchProvider.default.md#globalcustomservices)
- [globalDatabaseConnection](server_services_base_LocationSearchProvider.default.md#globaldatabaseconnection)
- [globalInstance](server_services_base_LocationSearchProvider.default.md#globalinstance)
- [globalMailProvider](server_services_base_LocationSearchProvider.default.md#globalmailprovider)
- [globalPhoneProvider](server_services_base_LocationSearchProvider.default.md#globalphoneprovider)
- [globalRawDB](server_services_base_LocationSearchProvider.default.md#globalrawdb)
- [globalRedis](server_services_base_LocationSearchProvider.default.md#globalredis)
- [globalRedisPub](server_services_base_LocationSearchProvider.default.md#globalredispub)
- [globalRedisSub](server_services_base_LocationSearchProvider.default.md#globalredissub)
- [globalRoot](server_services_base_LocationSearchProvider.default.md#globalroot)
- [instanceName](server_services_base_LocationSearchProvider.default.md#instancename)
- [localAppData](server_services_base_LocationSearchProvider.default.md#localappdata)
- [localInstance](server_services_base_LocationSearchProvider.default.md#localinstance)
- [registry](server_services_base_LocationSearchProvider.default.md#registry)

### Methods

- [execute](server_services_base_LocationSearchProvider.default.md#execute)
- [expressRouter](server_services_base_LocationSearchProvider.default.md#expressrouter)
- [getInstanceName](server_services_base_LocationSearchProvider.default.md#getinstancename)
- [getRouter](server_services_base_LocationSearchProvider.default.md#getrouter)
- [getRunCycleTime](server_services_base_LocationSearchProvider.default.md#getruncycletime)
- [getTriggerRegistry](server_services_base_LocationSearchProvider.default.md#gettriggerregistry)
- [initialize](server_services_base_LocationSearchProvider.default.md#initialize)
- [isInstanceGlobal](server_services_base_LocationSearchProvider.default.md#isinstanceglobal)
- [isInstanceLocal](server_services_base_LocationSearchProvider.default.md#isinstancelocal)
- [logDebug](server_services_base_LocationSearchProvider.default.md#logdebug)
- [logError](server_services_base_LocationSearchProvider.default.md#logerror)
- [logInfo](server_services_base_LocationSearchProvider.default.md#loginfo)
- [makeIdOutOf](server_services_base_LocationSearchProvider.default.md#makeidoutof)
- [requestAutocompleteFor](server_services_base_LocationSearchProvider.default.md#requestautocompletefor)
- [requestGeocodeFor](server_services_base_LocationSearchProvider.default.md#requestgeocodefor)
- [requestSearchFor](server_services_base_LocationSearchProvider.default.md#requestsearchfor)
- [run](server_services_base_LocationSearchProvider.default.md#run)
- [setInstanceName](server_services_base_LocationSearchProvider.default.md#setinstancename)
- [setupGlobalResources](server_services_base_LocationSearchProvider.default.md#setupglobalresources)
- [setupLocalResources](server_services_base_LocationSearchProvider.default.md#setuplocalresources)
- [expressRouter](server_services_base_LocationSearchProvider.default.md#expressrouter)
- [getRouter](server_services_base_LocationSearchProvider.default.md#getrouter)
- [getTriggerRegistry](server_services_base_LocationSearchProvider.default.md#gettriggerregistry)
- [getType](server_services_base_LocationSearchProvider.default.md#gettype)
- [logDebug](server_services_base_LocationSearchProvider.default.md#logdebug)
- [logError](server_services_base_LocationSearchProvider.default.md#logerror)
- [logInfo](server_services_base_LocationSearchProvider.default.md#loginfo)

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

[server/services/index.ts:58](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L58)

## Properties

### appConfig

• **appConfig**: [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[appConfig](server_services.ServiceProvider.md#appconfig)

#### Defined in

[server/services/index.ts:37](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L37)

___

### appSensitiveConfig

• **appSensitiveConfig**: [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[appSensitiveConfig](server_services.ServiceProvider.md#appsensitiveconfig)

#### Defined in

[server/services/index.ts:38](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L38)

___

### config

• **config**: `T`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[config](server_services.ServiceProvider.md#config)

#### Defined in

[server/services/index.ts:35](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L35)

___

### globalCustomServices

• **globalCustomServices**: `Object`

#### Index signature

▪ [name: `string`]: [`ServiceProvider`](server_services.ServiceProvider.md)<`any`\>

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalCustomServices](server_services.ServiceProvider.md#globalcustomservices)

#### Defined in

[server/services/index.ts:48](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L48)

___

### globalDatabaseConnection

• **globalDatabaseConnection**: `DatabaseConnection`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalDatabaseConnection](server_services.ServiceProvider.md#globaldatabaseconnection)

#### Defined in

[server/services/index.ts:40](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L40)

___

### globalInstance

• **globalInstance**: `boolean`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalInstance](server_services.ServiceProvider.md#globalinstance)

#### Defined in

[server/services/index.ts:55](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L55)

___

### globalMailProvider

• **globalMailProvider**: [`default`](server_services_base_MailProvider.default.md)<`any`\>

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalMailProvider](server_services.ServiceProvider.md#globalmailprovider)

#### Defined in

[server/services/index.ts:46](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L46)

___

### globalPhoneProvider

• **globalPhoneProvider**: [`default`](server_services_base_PhoneProvider.default.md)<`any`\>

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalPhoneProvider](server_services.ServiceProvider.md#globalphoneprovider)

#### Defined in

[server/services/index.ts:47](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L47)

___

### globalRawDB

• **globalRawDB**: [`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalRawDB](server_services.ServiceProvider.md#globalrawdb)

#### Defined in

[server/services/index.ts:44](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L44)

___

### globalRedis

• **globalRedis**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalRedis](server_services.ServiceProvider.md#globalredis)

#### Defined in

[server/services/index.ts:43](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L43)

___

### globalRedisPub

• **globalRedisPub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalRedisPub](server_services.ServiceProvider.md#globalredispub)

#### Defined in

[server/services/index.ts:41](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L41)

___

### globalRedisSub

• **globalRedisSub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalRedisSub](server_services.ServiceProvider.md#globalredissub)

#### Defined in

[server/services/index.ts:42](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L42)

___

### globalRoot

• **globalRoot**: [`default`](base_Root.default.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalRoot](server_services.ServiceProvider.md#globalroot)

#### Defined in

[server/services/index.ts:45](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L45)

___

### instanceName

• **instanceName**: `string`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[instanceName](server_services.ServiceProvider.md#instancename)

#### Defined in

[server/services/index.ts:54](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L54)

___

### localAppData

• **localAppData**: [`IAppDataType`](../interfaces/server.IAppDataType.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[localAppData](server_services.ServiceProvider.md#localappdata)

#### Defined in

[server/services/index.ts:52](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L52)

___

### localInstance

• **localInstance**: `boolean`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[localInstance](server_services.ServiceProvider.md#localinstance)

#### Defined in

[server/services/index.ts:56](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L56)

___

### registry

• **registry**: [`RegistryService`](server_services_registry.RegistryService.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[registry](server_services.ServiceProvider.md#registry)

#### Defined in

[server/services/index.ts:36](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L36)

## Methods

### execute

▸ **execute**(): `void`

Performs the execution of the service, basically
it will do the run function and then re-run as specified

#### Returns

`void`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[execute](server_services.ServiceProvider.md#execute)

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

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[expressRouter](server_services.ServiceProvider.md#expressrouter)

#### Defined in

[server/services/index.ts:110](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L110)

___

### getInstanceName

▸ **getInstanceName**(): `string`

#### Returns

`string`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[getInstanceName](server_services.ServiceProvider.md#getinstancename)

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

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[getRouter](server_services.ServiceProvider.md#getrouter)

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

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[getRunCycleTime](server_services.ServiceProvider.md#getruncycletime)

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

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[getTriggerRegistry](server_services.ServiceProvider.md#gettriggerregistry)

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

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[initialize](server_services.ServiceProvider.md#initialize)

#### Defined in

[server/services/index.ts:215](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L215)

___

### isInstanceGlobal

▸ **isInstanceGlobal**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[isInstanceGlobal](server_services.ServiceProvider.md#isinstanceglobal)

#### Defined in

[server/services/index.ts:78](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L78)

___

### isInstanceLocal

▸ **isInstanceLocal**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[isInstanceLocal](server_services.ServiceProvider.md#isinstancelocal)

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

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[logDebug](server_services.ServiceProvider.md#logdebug)

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

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[logError](server_services.ServiceProvider.md#logerror)

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

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[logInfo](server_services.ServiceProvider.md#loginfo)

#### Defined in

[server/services/index.ts:86](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L86)

___

### makeIdOutOf

▸ **makeIdOutOf**(`lat`, `lng`): `string`

A helping utility that specifies how to make location search ids
this is what itemize uses internally and it should be kept consistent
we cannot rely on ids given by third party services so we have
to create our own in order to be able to switch services

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lat` | `number` | the latitude |
| `lng` | `number` | the longitude |

#### Returns

`string`

#### Defined in

[server/services/base/LocationSearchProvider.ts:36](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/LocationSearchProvider.ts#L36)

___

### requestAutocompleteFor

▸ **requestAutocompleteFor**(`lat`, `lng`, `query`, `lang`, `sep`): `Promise`<[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md)[]\>

Similar to search, but should return fewer results, and maybe
less accurate, these are used for autocompletition
this function should be overriden

**`override`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lat` | `string` \| `number` | the latitude where results should be nearby for |
| `lng` | `string` \| `number` | the longitude where results should be nearby for |
| `query` | `string` | a query of what we are searching for |
| `lang` | `string` | the language of the user |
| `sep` | `string` | the word separarator, usually a comma is here |

#### Returns

`Promise`<[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md)[]\>

a promise for a location array

#### Defined in

[server/services/base/LocationSearchProvider.ts:97](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/LocationSearchProvider.ts#L97)

___

### requestGeocodeFor

▸ **requestGeocodeFor**(`lat`, `lng`, `query`, `lang`, `sep`): `Promise`<[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md)\>

This function is executed once the user requests a geocode
for a given location, you should override it

**`override`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lat` | `string` \| `number` | the latitude the geocode is requested for |
| `lng` | `string` \| `number` | the longitude the geocode is requested for |
| `query` | `string` | a query text (what is written in the search box while this is clicked) |
| `lang` | `string` | the language of the user |
| `sep` | `string` | the word separarator, usually a comma is here |

#### Returns

`Promise`<[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md)\>

a promise for a location

#### Defined in

[server/services/base/LocationSearchProvider.ts:52](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/LocationSearchProvider.ts#L52)

___

### requestSearchFor

▸ **requestSearchFor**(`lat`, `lng`, `query`, `lang`, `sep`): `Promise`<[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md)[]\>

This function is executed once the user requests a search
for a given location, you should override it

**`override`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lat` | `string` \| `number` | the latitude where results should be nearby for |
| `lng` | `string` \| `number` | the longitude where results should be nearby for |
| `query` | `string` | a query of what we are searching for |
| `lang` | `string` | the language of the user |
| `sep` | `string` | the word separarator, usually a comma is here |

#### Returns

`Promise`<[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md)[]\>

a promise for a location array

#### Defined in

[server/services/base/LocationSearchProvider.ts:74](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/LocationSearchProvider.ts#L74)

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

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[setInstanceName](server_services.ServiceProvider.md#setinstancename)

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

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[setupGlobalResources](server_services.ServiceProvider.md#setupglobalresources)

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

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[setupLocalResources](server_services.ServiceProvider.md#setuplocalresources)

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

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[expressRouter](server_services.ServiceProvider.md#expressrouter)

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

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[getRouter](server_services.ServiceProvider.md#getrouter)

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

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[getTriggerRegistry](server_services.ServiceProvider.md#gettriggerregistry)

#### Defined in

[server/services/index.ts:290](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L290)

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

[server/services/base/LocationSearchProvider.ts:24](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/LocationSearchProvider.ts#L24)

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

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[logError](server_services.ServiceProvider.md#logerror)

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

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[logInfo](server_services.ServiceProvider.md#loginfo)

#### Defined in

[server/services/index.ts:98](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L98)
