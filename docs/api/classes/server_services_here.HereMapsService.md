[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/services/here](../modules/server_services_here.md) / HereMapsService

# Class: HereMapsService

[server/services/here](../modules/server_services_here.md).HereMapsService

The location search provider is a base interface type class
that specifies how to create a service for location search

## Hierarchy

- [`default`](server_services_base_LocationSearchProvider.default.md)\<[`IHereMapsConfig`](../interfaces/server_services_here.IHereMapsConfig.md)\>

  ↳ **`HereMapsService`**

## Table of contents

### Constructors

- [constructor](server_services_here.HereMapsService.md#constructor)

### Properties

- [appConfig](server_services_here.HereMapsService.md#appconfig)
- [appDbConfig](server_services_here.HereMapsService.md#appdbconfig)
- [appRedisConfig](server_services_here.HereMapsService.md#appredisconfig)
- [appSensitiveConfig](server_services_here.HereMapsService.md#appsensitiveconfig)
- [config](server_services_here.HereMapsService.md#config)
- [globalCustomServices](server_services_here.HereMapsService.md#globalcustomservices)
- [globalDatabaseConnection](server_services_here.HereMapsService.md#globaldatabaseconnection)
- [globalInstance](server_services_here.HereMapsService.md#globalinstance)
- [globalMailProvider](server_services_here.HereMapsService.md#globalmailprovider)
- [globalPhoneProvider](server_services_here.HereMapsService.md#globalphoneprovider)
- [globalRawDB](server_services_here.HereMapsService.md#globalrawdb)
- [globalRedis](server_services_here.HereMapsService.md#globalredis)
- [globalRedisPub](server_services_here.HereMapsService.md#globalredispub)
- [globalRedisSub](server_services_here.HereMapsService.md#globalredissub)
- [globalRoot](server_services_here.HereMapsService.md#globalroot)
- [instanceName](server_services_here.HereMapsService.md#instancename)
- [localAppData](server_services_here.HereMapsService.md#localappdata)
- [localInstance](server_services_here.HereMapsService.md#localinstance)
- [registry](server_services_here.HereMapsService.md#registry)

### Methods

- [execute](server_services_here.HereMapsService.md#execute)
- [expressRouter](server_services_here.HereMapsService.md#expressrouter)
- [getInstanceName](server_services_here.HereMapsService.md#getinstancename)
- [getRouter](server_services_here.HereMapsService.md#getrouter)
- [getRunCycleTime](server_services_here.HereMapsService.md#getruncycletime)
- [getTriggerRegistry](server_services_here.HereMapsService.md#gettriggerregistry)
- [initialize](server_services_here.HereMapsService.md#initialize)
- [isInstanceGlobal](server_services_here.HereMapsService.md#isinstanceglobal)
- [isInstanceLocal](server_services_here.HereMapsService.md#isinstancelocal)
- [logDebug](server_services_here.HereMapsService.md#logdebug)
- [logError](server_services_here.HereMapsService.md#logerror)
- [logInfo](server_services_here.HereMapsService.md#loginfo)
- [makeIdOutOf](server_services_here.HereMapsService.md#makeidoutof)
- [processHereResult](server_services_here.HereMapsService.md#processhereresult)
- [requestAutocompleteFor](server_services_here.HereMapsService.md#requestautocompletefor)
- [requestRevGeocodeFor](server_services_here.HereMapsService.md#requestrevgeocodefor)
- [requestSearchFor](server_services_here.HereMapsService.md#requestsearchfor)
- [run](server_services_here.HereMapsService.md#run)
- [setInstanceName](server_services_here.HereMapsService.md#setinstancename)
- [setupGlobalResources](server_services_here.HereMapsService.md#setupglobalresources)
- [setupLocalResources](server_services_here.HereMapsService.md#setuplocalresources)
- [expressRouter](server_services_here.HereMapsService.md#expressrouter-1)
- [getRouter](server_services_here.HereMapsService.md#getrouter-1)
- [getTriggerRegistry](server_services_here.HereMapsService.md#gettriggerregistry-1)
- [getType](server_services_here.HereMapsService.md#gettype)
- [logDebug](server_services_here.HereMapsService.md#logdebug-1)
- [logError](server_services_here.HereMapsService.md#logerror-1)
- [logInfo](server_services_here.HereMapsService.md#loginfo-1)

## Constructors

### constructor

• **new HereMapsService**(`config`, `registry`, `configs`): [`HereMapsService`](server_services_here.HereMapsService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`IHereMapsConfig`](../interfaces/server_services_here.IHereMapsConfig.md) |
| `registry` | [`RegistryService`](server_services_registry.RegistryService.md) |
| `configs` | `Object` |
| `configs.config` | [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md) |
| `configs.dbConfig` | [`IDBConfigRawJSONDataType`](../interfaces/config.IDBConfigRawJSONDataType.md) |
| `configs.redisConfig` | [`IRedisConfigRawJSONDataType`](../interfaces/config.IRedisConfigRawJSONDataType.md) |
| `configs.sensitiveConfig` | [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md) |

#### Returns

[`HereMapsService`](server_services_here.HereMapsService.md)

#### Inherited from

[default](server_services_base_LocationSearchProvider.default.md).[constructor](server_services_base_LocationSearchProvider.default.md#constructor)

#### Defined in

[server/services/index.ts:58](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L58)

## Properties

### appConfig

• **appConfig**: [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md)

#### Inherited from

[default](server_services_base_LocationSearchProvider.default.md).[appConfig](server_services_base_LocationSearchProvider.default.md#appconfig)

#### Defined in

[server/services/index.ts:35](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L35)

___

### appDbConfig

• **appDbConfig**: [`IDBConfigRawJSONDataType`](../interfaces/config.IDBConfigRawJSONDataType.md)

#### Inherited from

[default](server_services_base_LocationSearchProvider.default.md).[appDbConfig](server_services_base_LocationSearchProvider.default.md#appdbconfig)

#### Defined in

[server/services/index.ts:37](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L37)

___

### appRedisConfig

• **appRedisConfig**: [`IRedisConfigRawJSONDataType`](../interfaces/config.IRedisConfigRawJSONDataType.md)

#### Inherited from

[default](server_services_base_LocationSearchProvider.default.md).[appRedisConfig](server_services_base_LocationSearchProvider.default.md#appredisconfig)

#### Defined in

[server/services/index.ts:38](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L38)

___

### appSensitiveConfig

• **appSensitiveConfig**: [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md)

#### Inherited from

[default](server_services_base_LocationSearchProvider.default.md).[appSensitiveConfig](server_services_base_LocationSearchProvider.default.md#appsensitiveconfig)

#### Defined in

[server/services/index.ts:36](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L36)

___

### config

• **config**: [`IHereMapsConfig`](../interfaces/server_services_here.IHereMapsConfig.md)

#### Inherited from

[default](server_services_base_LocationSearchProvider.default.md).[config](server_services_base_LocationSearchProvider.default.md#config)

#### Defined in

[server/services/index.ts:33](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L33)

___

### globalCustomServices

• **globalCustomServices**: `Object`

#### Index signature

▪ [name: `string`]: [`ServiceProvider`](server_services.ServiceProvider.md)\<`any`\>

#### Inherited from

[default](server_services_base_LocationSearchProvider.default.md).[globalCustomServices](server_services_base_LocationSearchProvider.default.md#globalcustomservices)

#### Defined in

[server/services/index.ts:48](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L48)

___

### globalDatabaseConnection

• **globalDatabaseConnection**: [`DatabaseConnection`](database.DatabaseConnection.md)

#### Inherited from

[default](server_services_base_LocationSearchProvider.default.md).[globalDatabaseConnection](server_services_base_LocationSearchProvider.default.md#globaldatabaseconnection)

#### Defined in

[server/services/index.ts:40](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L40)

___

### globalInstance

• **globalInstance**: `boolean` = `false`

#### Inherited from

[default](server_services_base_LocationSearchProvider.default.md).[globalInstance](server_services_base_LocationSearchProvider.default.md#globalinstance)

#### Defined in

[server/services/index.ts:55](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L55)

___

### globalMailProvider

• **globalMailProvider**: [`default`](server_services_base_MailProvider.default.md)\<`any`\>

#### Inherited from

[default](server_services_base_LocationSearchProvider.default.md).[globalMailProvider](server_services_base_LocationSearchProvider.default.md#globalmailprovider)

#### Defined in

[server/services/index.ts:46](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L46)

___

### globalPhoneProvider

• **globalPhoneProvider**: [`default`](server_services_base_PhoneProvider.default.md)\<`any`\>

#### Inherited from

[default](server_services_base_LocationSearchProvider.default.md).[globalPhoneProvider](server_services_base_LocationSearchProvider.default.md#globalphoneprovider)

#### Defined in

[server/services/index.ts:47](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L47)

___

### globalRawDB

• **globalRawDB**: [`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md)

#### Inherited from

[default](server_services_base_LocationSearchProvider.default.md).[globalRawDB](server_services_base_LocationSearchProvider.default.md#globalrawdb)

#### Defined in

[server/services/index.ts:44](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L44)

___

### globalRedis

• **globalRedis**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[default](server_services_base_LocationSearchProvider.default.md).[globalRedis](server_services_base_LocationSearchProvider.default.md#globalredis)

#### Defined in

[server/services/index.ts:43](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L43)

___

### globalRedisPub

• **globalRedisPub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[default](server_services_base_LocationSearchProvider.default.md).[globalRedisPub](server_services_base_LocationSearchProvider.default.md#globalredispub)

#### Defined in

[server/services/index.ts:41](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L41)

___

### globalRedisSub

• **globalRedisSub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[default](server_services_base_LocationSearchProvider.default.md).[globalRedisSub](server_services_base_LocationSearchProvider.default.md#globalredissub)

#### Defined in

[server/services/index.ts:42](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L42)

___

### globalRoot

• **globalRoot**: [`default`](base_Root.default.md)

#### Inherited from

[default](server_services_base_LocationSearchProvider.default.md).[globalRoot](server_services_base_LocationSearchProvider.default.md#globalroot)

#### Defined in

[server/services/index.ts:45](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L45)

___

### instanceName

• **instanceName**: `string`

#### Inherited from

[default](server_services_base_LocationSearchProvider.default.md).[instanceName](server_services_base_LocationSearchProvider.default.md#instancename)

#### Defined in

[server/services/index.ts:54](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L54)

___

### localAppData

• **localAppData**: [`IAppDataType`](../interfaces/server.IAppDataType.md)

#### Inherited from

[default](server_services_base_LocationSearchProvider.default.md).[localAppData](server_services_base_LocationSearchProvider.default.md#localappdata)

#### Defined in

[server/services/index.ts:52](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L52)

___

### localInstance

• **localInstance**: `boolean` = `false`

#### Inherited from

[default](server_services_base_LocationSearchProvider.default.md).[localInstance](server_services_base_LocationSearchProvider.default.md#localinstance)

#### Defined in

[server/services/index.ts:56](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L56)

___

### registry

• **registry**: [`RegistryService`](server_services_registry.RegistryService.md)

#### Inherited from

[default](server_services_base_LocationSearchProvider.default.md).[registry](server_services_base_LocationSearchProvider.default.md#registry)

#### Defined in

[server/services/index.ts:34](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L34)

## Methods

### execute

▸ **execute**(): `void`

Performs the execution of the service, basically
it will do the run function and then re-run as specified

#### Returns

`void`

#### Inherited from

[default](server_services_base_LocationSearchProvider.default.md).[execute](server_services_base_LocationSearchProvider.default.md#execute)

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

[default](server_services_base_LocationSearchProvider.default.md).[expressRouter](server_services_base_LocationSearchProvider.default.md#expressrouter)

#### Defined in

[server/services/index.ts:116](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L116)

___

### getInstanceName

▸ **getInstanceName**(): `string`

#### Returns

`string`

#### Inherited from

[default](server_services_base_LocationSearchProvider.default.md).[getInstanceName](server_services_base_LocationSearchProvider.default.md#getinstancename)

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

[default](server_services_base_LocationSearchProvider.default.md).[getRouter](server_services_base_LocationSearchProvider.default.md#getrouter)

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

[default](server_services_base_LocationSearchProvider.default.md).[getRunCycleTime](server_services_base_LocationSearchProvider.default.md#getruncycletime)

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

[default](server_services_base_LocationSearchProvider.default.md).[getTriggerRegistry](server_services_base_LocationSearchProvider.default.md#gettriggerregistry)

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

[default](server_services_base_LocationSearchProvider.default.md).[initialize](server_services_base_LocationSearchProvider.default.md#initialize)

#### Defined in

[server/services/index.ts:230](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L230)

___

### isInstanceGlobal

▸ **isInstanceGlobal**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[default](server_services_base_LocationSearchProvider.default.md).[isInstanceGlobal](server_services_base_LocationSearchProvider.default.md#isinstanceglobal)

#### Defined in

[server/services/index.ts:84](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L84)

___

### isInstanceLocal

▸ **isInstanceLocal**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[default](server_services_base_LocationSearchProvider.default.md).[isInstanceLocal](server_services_base_LocationSearchProvider.default.md#isinstancelocal)

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

[default](server_services_base_LocationSearchProvider.default.md).[logDebug](server_services_base_LocationSearchProvider.default.md#logdebug)

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

[default](server_services_base_LocationSearchProvider.default.md).[logError](server_services_base_LocationSearchProvider.default.md#logerror)

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

[default](server_services_base_LocationSearchProvider.default.md).[logInfo](server_services_base_LocationSearchProvider.default.md#loginfo)

#### Defined in

[server/services/index.ts:92](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L92)

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

#### Inherited from

[default](server_services_base_LocationSearchProvider.default.md).[makeIdOutOf](server_services_base_LocationSearchProvider.default.md#makeidoutof)

#### Defined in

[server/services/base/LocationSearchProvider.ts:35](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/LocationSearchProvider.ts#L35)

___

### processHereResult

▸ **processHereResult**(`wordSeparator`, `suggestion`, `overwriteTxt?`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `wordSeparator` | `string` |
| `suggestion` | `IHereResult` |
| `overwriteTxt?` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `atxt` | `string` |
| `id` | `string` |
| `lat` | `number` |
| `lng` | `number` |
| `txt` | `string` |

#### Defined in

[server/services/here.ts:50](https://github.com/onzag/itemize/blob/59702dd5/server/services/here.ts#L50)

___

### requestAutocompleteFor

▸ **requestAutocompleteFor**(`lat`, `lng`, `query`, `lang`, `sep`): `Promise`\<[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md)[]\>

Similar to search, but should return fewer results, and maybe
less accurate, these are used for autocompletition
this function should be overriden

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lat` | `string` \| `number` | the latitude where results should be nearby for |
| `lng` | `string` \| `number` | the longitude where results should be nearby for |
| `query` | `string` | a query of what we are searching for |
| `lang` | `string` | the language of the user |
| `sep` | `string` | the word separarator, usually a comma is here |

#### Returns

`Promise`\<[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md)[]\>

a promise for a location array

#### Overrides

[default](server_services_base_LocationSearchProvider.default.md).[requestAutocompleteFor](server_services_base_LocationSearchProvider.default.md#requestautocompletefor)

#### Defined in

[server/services/here.ts:282](https://github.com/onzag/itemize/blob/59702dd5/server/services/here.ts#L282)

___

### requestRevGeocodeFor

▸ **requestRevGeocodeFor**(`lat`, `lng`, `query`, `lang`, `sep`): `Promise`\<[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md)\>

This function is executed once the user requests a geocode
for a given location, you should override it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lat` | `string` \| `number` | the latitude the geocode is requested for |
| `lng` | `string` \| `number` | the longitude the geocode is requested for |
| `query` | `string` | a query text (what is written in the search box while this is clicked) |
| `lang` | `string` | the language of the user |
| `sep` | `string` | the word separarator, usually a comma is here |

#### Returns

`Promise`\<[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md)\>

a promise for a location

#### Overrides

[default](server_services_base_LocationSearchProvider.default.md).[requestRevGeocodeFor](server_services_base_LocationSearchProvider.default.md#requestrevgeocodefor)

#### Defined in

[server/services/here.ts:59](https://github.com/onzag/itemize/blob/59702dd5/server/services/here.ts#L59)

___

### requestSearchFor

▸ **requestSearchFor**(`lat`, `lng`, `query`, `lang`, `sep`): `Promise`\<[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md)[]\>

This function is executed once the user requests a search
for a given location, you should override it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lat` | `string` \| `number` | the latitude where results should be nearby for |
| `lng` | `string` \| `number` | the longitude where results should be nearby for |
| `query` | `string` | a query of what we are searching for |
| `lang` | `string` | the language of the user |
| `sep` | `string` | the word separarator, usually a comma is here |

#### Returns

`Promise`\<[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md)[]\>

a promise for a location array

#### Overrides

[default](server_services_base_LocationSearchProvider.default.md).[requestSearchFor](server_services_base_LocationSearchProvider.default.md#requestsearchfor)

#### Defined in

[server/services/here.ts:175](https://github.com/onzag/itemize/blob/59702dd5/server/services/here.ts#L175)

___

### run

▸ **run**(): `void` \| `Promise`\<`void`\>

Executes some code

#### Returns

`void` \| `Promise`\<`void`\>

#### Inherited from

[default](server_services_base_LocationSearchProvider.default.md).[run](server_services_base_LocationSearchProvider.default.md#run)

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

[default](server_services_base_LocationSearchProvider.default.md).[setInstanceName](server_services_base_LocationSearchProvider.default.md#setinstancename)

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

[default](server_services_base_LocationSearchProvider.default.md).[setupGlobalResources](server_services_base_LocationSearchProvider.default.md#setupglobalresources)

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

[default](server_services_base_LocationSearchProvider.default.md).[setupLocalResources](server_services_base_LocationSearchProvider.default.md#setuplocalresources)

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

[default](server_services_base_LocationSearchProvider.default.md).[expressRouter](server_services_base_LocationSearchProvider.default.md#expressrouter-1)

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

[default](server_services_base_LocationSearchProvider.default.md).[getRouter](server_services_base_LocationSearchProvider.default.md#getrouter-1)

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

[default](server_services_base_LocationSearchProvider.default.md).[getTriggerRegistry](server_services_base_LocationSearchProvider.default.md#gettriggerregistry-1)

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

[default](server_services_base_LocationSearchProvider.default.md).[getType](server_services_base_LocationSearchProvider.default.md#gettype)

#### Defined in

[server/services/here.ts:47](https://github.com/onzag/itemize/blob/59702dd5/server/services/here.ts#L47)

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

[default](server_services_base_LocationSearchProvider.default.md).[logDebug](server_services_base_LocationSearchProvider.default.md#logdebug-1)

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

[default](server_services_base_LocationSearchProvider.default.md).[logError](server_services_base_LocationSearchProvider.default.md#logerror-1)

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

[default](server_services_base_LocationSearchProvider.default.md).[logInfo](server_services_base_LocationSearchProvider.default.md#loginfo-1)

#### Defined in

[server/services/index.ts:104](https://github.com/onzag/itemize/blob/59702dd5/server/services/index.ts#L104)
