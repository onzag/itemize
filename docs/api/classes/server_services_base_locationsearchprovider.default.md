[](../README.md) / [Exports](../modules.md) / [server/services/base/LocationSearchProvider](../modules/server_services_base_locationsearchprovider.md) / default

# Class: default<T\>

[server/services/base/LocationSearchProvider](../modules/server_services_base_locationsearchprovider.md).default

The location search provider is a base interface type class
that specifies how to create a service for location search

## Type parameters

Name |
:------ |
`T` |

## Hierarchy

* [*ServiceProvider*](server_services.serviceprovider.md)<T\>

  ↳ **default**

  ↳↳ [*HereMapsService*](server_services_here.heremapsservice.md)

## Table of contents

### Constructors

- [constructor](server_services_base_locationsearchprovider.default.md#constructor)

### Properties

- [appConfig](server_services_base_locationsearchprovider.default.md#appconfig)
- [appSensitiveConfig](server_services_base_locationsearchprovider.default.md#appsensitiveconfig)
- [config](server_services_base_locationsearchprovider.default.md#config)
- [globalCustomServices](server_services_base_locationsearchprovider.default.md#globalcustomservices)
- [globalDatabaseConnection](server_services_base_locationsearchprovider.default.md#globaldatabaseconnection)
- [globalInstance](server_services_base_locationsearchprovider.default.md#globalinstance)
- [globalMailProvider](server_services_base_locationsearchprovider.default.md#globalmailprovider)
- [globalRawDB](server_services_base_locationsearchprovider.default.md#globalrawdb)
- [globalRedis](server_services_base_locationsearchprovider.default.md#globalredis)
- [globalRedisPub](server_services_base_locationsearchprovider.default.md#globalredispub)
- [globalRoot](server_services_base_locationsearchprovider.default.md#globalroot)
- [instanceName](server_services_base_locationsearchprovider.default.md#instancename)
- [localAppData](server_services_base_locationsearchprovider.default.md#localappdata)
- [localInstance](server_services_base_locationsearchprovider.default.md#localinstance)
- [registry](server_services_base_locationsearchprovider.default.md#registry)

### Methods

- [execute](server_services_base_locationsearchprovider.default.md#execute)
- [expressRouter](server_services_base_locationsearchprovider.default.md#expressrouter)
- [getInstanceName](server_services_base_locationsearchprovider.default.md#getinstancename)
- [getRouter](server_services_base_locationsearchprovider.default.md#getrouter)
- [getRunCycleTime](server_services_base_locationsearchprovider.default.md#getruncycletime)
- [getTriggerRegistry](server_services_base_locationsearchprovider.default.md#gettriggerregistry)
- [initialize](server_services_base_locationsearchprovider.default.md#initialize)
- [isInstanceGlobal](server_services_base_locationsearchprovider.default.md#isinstanceglobal)
- [isInstanceLocal](server_services_base_locationsearchprovider.default.md#isinstancelocal)
- [logDebug](server_services_base_locationsearchprovider.default.md#logdebug)
- [logError](server_services_base_locationsearchprovider.default.md#logerror)
- [logInfo](server_services_base_locationsearchprovider.default.md#loginfo)
- [makeIdOutOf](server_services_base_locationsearchprovider.default.md#makeidoutof)
- [requestAutocompleteFor](server_services_base_locationsearchprovider.default.md#requestautocompletefor)
- [requestGeocodeFor](server_services_base_locationsearchprovider.default.md#requestgeocodefor)
- [requestSearchFor](server_services_base_locationsearchprovider.default.md#requestsearchfor)
- [run](server_services_base_locationsearchprovider.default.md#run)
- [setInstanceName](server_services_base_locationsearchprovider.default.md#setinstancename)
- [setupGlobalResources](server_services_base_locationsearchprovider.default.md#setupglobalresources)
- [setupLocalResources](server_services_base_locationsearchprovider.default.md#setuplocalresources)
- [expressRouter](server_services_base_locationsearchprovider.default.md#expressrouter)
- [getRouter](server_services_base_locationsearchprovider.default.md#getrouter)
- [getTriggerRegistry](server_services_base_locationsearchprovider.default.md#gettriggerregistry)
- [getType](server_services_base_locationsearchprovider.default.md#gettype)
- [logDebug](server_services_base_locationsearchprovider.default.md#logdebug)
- [logError](server_services_base_locationsearchprovider.default.md#logerror)
- [logInfo](server_services_base_locationsearchprovider.default.md#loginfo)

## Constructors

### constructor

\+ **new default**<T\>(`config`: T, `registry`: [*RegistryService*](server_services_registry.registryservice.md), `appConfig`: [*IConfigRawJSONDataType*](../interfaces/config.iconfigrawjsondatatype.md), `appSensitiveConfig`: [*ISensitiveConfigRawJSONDataType*](../interfaces/config.isensitiveconfigrawjsondatatype.md)): [*default*](server_services_base_locationsearchprovider.default.md)<T\>

#### Type parameters:

Name |
:------ |
`T` |

#### Parameters:

Name | Type |
:------ | :------ |
`config` | T |
`registry` | [*RegistryService*](server_services_registry.registryservice.md) |
`appConfig` | [*IConfigRawJSONDataType*](../interfaces/config.iconfigrawjsondatatype.md) |
`appSensitiveConfig` | [*ISensitiveConfigRawJSONDataType*](../interfaces/config.isensitiveconfigrawjsondatatype.md) |

**Returns:** [*default*](server_services_base_locationsearchprovider.default.md)<T\>

Inherited from: [ServiceProvider](server_services.serviceprovider.md)

Defined in: [server/services/index.ts:51](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/index.ts#L51)

## Properties

### appConfig

• **appConfig**: [*IConfigRawJSONDataType*](../interfaces/config.iconfigrawjsondatatype.md)

Inherited from: [ServiceProvider](server_services.serviceprovider.md).[appConfig](server_services.serviceprovider.md#appconfig)

Defined in: [server/services/index.ts:34](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/index.ts#L34)

___

### appSensitiveConfig

• **appSensitiveConfig**: [*ISensitiveConfigRawJSONDataType*](../interfaces/config.isensitiveconfigrawjsondatatype.md)

Inherited from: [ServiceProvider](server_services.serviceprovider.md).[appSensitiveConfig](server_services.serviceprovider.md#appsensitiveconfig)

Defined in: [server/services/index.ts:35](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/index.ts#L35)

___

### config

• **config**: T

Inherited from: [ServiceProvider](server_services.serviceprovider.md).[config](server_services.serviceprovider.md#config)

Defined in: [server/services/index.ts:32](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/index.ts#L32)

___

### globalCustomServices

• **globalCustomServices**: *object*

#### Type declaration:

Inherited from: [ServiceProvider](server_services.serviceprovider.md).[globalCustomServices](server_services.serviceprovider.md#globalcustomservices)

Defined in: [server/services/index.ts:43](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/index.ts#L43)

___

### globalDatabaseConnection

• **globalDatabaseConnection**: [*DatabaseConnection*](database.databaseconnection.md)

Inherited from: [ServiceProvider](server_services.serviceprovider.md).[globalDatabaseConnection](server_services.serviceprovider.md#globaldatabaseconnection)

Defined in: [server/services/index.ts:37](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/index.ts#L37)

___

### globalInstance

• **globalInstance**: *boolean*

Inherited from: [ServiceProvider](server_services.serviceprovider.md).[globalInstance](server_services.serviceprovider.md#globalinstance)

Defined in: [server/services/index.ts:50](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/index.ts#L50)

___

### globalMailProvider

• **globalMailProvider**: [*default*](server_services_base_mailprovider.default.md)<any\>

Inherited from: [ServiceProvider](server_services.serviceprovider.md).[globalMailProvider](server_services.serviceprovider.md#globalmailprovider)

Defined in: [server/services/index.ts:42](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/index.ts#L42)

___

### globalRawDB

• **globalRawDB**: [*ItemizeRawDB*](server_raw_db.itemizerawdb.md)

Inherited from: [ServiceProvider](server_services.serviceprovider.md).[globalRawDB](server_services.serviceprovider.md#globalrawdb)

Defined in: [server/services/index.ts:40](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/index.ts#L40)

___

### globalRedis

• **globalRedis**: [*ItemizeRedisClient*](server_redis.itemizeredisclient.md)

Inherited from: [ServiceProvider](server_services.serviceprovider.md).[globalRedis](server_services.serviceprovider.md#globalredis)

Defined in: [server/services/index.ts:39](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/index.ts#L39)

___

### globalRedisPub

• **globalRedisPub**: [*ItemizeRedisClient*](server_redis.itemizeredisclient.md)

Inherited from: [ServiceProvider](server_services.serviceprovider.md).[globalRedisPub](server_services.serviceprovider.md#globalredispub)

Defined in: [server/services/index.ts:38](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/index.ts#L38)

___

### globalRoot

• **globalRoot**: [*default*](base_root.default.md)

Inherited from: [ServiceProvider](server_services.serviceprovider.md).[globalRoot](server_services.serviceprovider.md#globalroot)

Defined in: [server/services/index.ts:41](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/index.ts#L41)

___

### instanceName

• **instanceName**: *string*

Inherited from: [ServiceProvider](server_services.serviceprovider.md).[instanceName](server_services.serviceprovider.md#instancename)

Defined in: [server/services/index.ts:49](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/index.ts#L49)

___

### localAppData

• **localAppData**: [*IAppDataType*](../interfaces/server.iappdatatype.md)

Inherited from: [ServiceProvider](server_services.serviceprovider.md).[localAppData](server_services.serviceprovider.md#localappdata)

Defined in: [server/services/index.ts:47](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/index.ts#L47)

___

### localInstance

• **localInstance**: *boolean*

Inherited from: [ServiceProvider](server_services.serviceprovider.md).[localInstance](server_services.serviceprovider.md#localinstance)

Defined in: [server/services/index.ts:51](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/index.ts#L51)

___

### registry

• **registry**: [*RegistryService*](server_services_registry.registryservice.md)

Inherited from: [ServiceProvider](server_services.serviceprovider.md).[registry](server_services.serviceprovider.md#registry)

Defined in: [server/services/index.ts:33](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/index.ts#L33)

## Methods

### execute

▸ **execute**(): *void*

Performs the execution of the service, basically
it will do the run function and then re-run as specified

**Returns:** *void*

Inherited from: [ServiceProvider](server_services.serviceprovider.md)

Defined in: [server/services/index.ts:155](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/index.ts#L155)

___

### expressRouter

▸ **expressRouter**(`options?`: RouterOptions): *Router*

#### Parameters:

Name | Type |
:------ | :------ |
`options?` | RouterOptions |

**Returns:** *Router*

Inherited from: [ServiceProvider](server_services.serviceprovider.md)

Defined in: [server/services/index.ts:105](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/index.ts#L105)

___

### getInstanceName

▸ **getInstanceName**(): *string*

**Returns:** *string*

Inherited from: [ServiceProvider](server_services.serviceprovider.md)

Defined in: [server/services/index.ts:69](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/index.ts#L69)

___

### getRouter

▸ **getRouter**(`appData`: [*IAppDataType*](../interfaces/server.iappdatatype.md)): *Router* \| *Promise*<Router\>

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

#### Parameters:

Name | Type |
:------ | :------ |
`appData` | [*IAppDataType*](../interfaces/server.iappdatatype.md) |

**Returns:** *Router* \| *Promise*<Router\>

Inherited from: [ServiceProvider](server_services.serviceprovider.md)

Defined in: [server/services/index.ts:242](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/index.ts#L242)

___

### getRunCycleTime

▸ **getRunCycleTime**(): *number*

Determines whether the run function
should run over again

**`override`** 

**Returns:** *number*

Inherited from: [ServiceProvider](server_services.serviceprovider.md)

Defined in: [server/services/index.ts:215](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/index.ts#L215)

___

### getTriggerRegistry

▸ **getTriggerRegistry**(): [*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md) \| *Promise*<[*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md)\>

Allows to setup trigger registries via the service
so that they trigger just as normal trigger will do

**`override`** 

**Returns:** [*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md) \| *Promise*<[*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md)\>

Inherited from: [ServiceProvider](server_services.serviceprovider.md)

Defined in: [server/services/index.ts:269](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/index.ts#L269)

___

### initialize

▸ **initialize**(): *void* \| *Promise*<void\>

This function is executed during
the initialization of the service

If your service is a global service you will
have access to the global resources while
this function executes

**`override`** 

**Returns:** *void* \| *Promise*<void\>

Inherited from: [ServiceProvider](server_services.serviceprovider.md)

Defined in: [server/services/index.ts:206](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/index.ts#L206)

___

### isInstanceGlobal

▸ **isInstanceGlobal**(): *boolean*

**Returns:** *boolean*

Inherited from: [ServiceProvider](server_services.serviceprovider.md)

Defined in: [server/services/index.ts:73](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/index.ts#L73)

___

### isInstanceLocal

▸ **isInstanceLocal**(): *boolean*

**Returns:** *boolean*

Inherited from: [ServiceProvider](server_services.serviceprovider.md)

Defined in: [server/services/index.ts:77](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/index.ts#L77)

___

### logDebug

▸ **logDebug**(`str`: *string*, `extra?`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`str` | *string* |
`extra?` | *any* |

**Returns:** *void*

Inherited from: [ServiceProvider](server_services.serviceprovider.md)

Defined in: [server/services/index.ts:85](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/index.ts#L85)

___

### logError

▸ **logError**(`str`: *string*, `extra?`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`str` | *string* |
`extra?` | *any* |

**Returns:** *void*

Inherited from: [ServiceProvider](server_services.serviceprovider.md)

Defined in: [server/services/index.ts:89](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/index.ts#L89)

___

### logInfo

▸ **logInfo**(`str`: *string*, `extra?`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`str` | *string* |
`extra?` | *any* |

**Returns:** *void*

Inherited from: [ServiceProvider](server_services.serviceprovider.md)

Defined in: [server/services/index.ts:81](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/index.ts#L81)

___

### makeIdOutOf

▸ **makeIdOutOf**(`lat`: *number*, `lng`: *number*): *string*

A helping utility that specifies how to make location search ids
this is what itemize uses internally and it should be kept consistent
we cannot rely on ids given by third party services so we have
to create our own in order to be able to switch services

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`lat` | *number* | the latitude   |
`lng` | *number* | the longitude    |

**Returns:** *string*

Defined in: [server/services/base/LocationSearchProvider.ts:36](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/base/LocationSearchProvider.ts#L36)

___

### requestAutocompleteFor

▸ **requestAutocompleteFor**(`lat`: *string* \| *number*, `lng`: *string* \| *number*, `query`: *string*, `lang`: *string*, `sep`: *string*): *Promise*<[*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md)[]\>

Similar to search, but should return fewer results, and maybe
less accurate, these are used for autocompletition
this function should be overriden

**`override`** 

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`lat` | *string* \| *number* | the latitude where results should be nearby for   |
`lng` | *string* \| *number* | the longitude where results should be nearby for   |
`query` | *string* | a query of what we are searching for   |
`lang` | *string* | the language of the user   |
`sep` | *string* | the word separarator, usually a comma is here   |

**Returns:** *Promise*<[*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md)[]\>

a promise for a location array

Defined in: [server/services/base/LocationSearchProvider.ts:97](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/base/LocationSearchProvider.ts#L97)

___

### requestGeocodeFor

▸ **requestGeocodeFor**(`lat`: *string* \| *number*, `lng`: *string* \| *number*, `query`: *string*, `lang`: *string*, `sep`: *string*): *Promise*<[*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md)\>

This function is executed once the user requests a geocode
for a given location, you should override it

**`override`** 

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`lat` | *string* \| *number* | the latitude the geocode is requested for   |
`lng` | *string* \| *number* | the longitude the geocode is requested for   |
`query` | *string* | a query text (what is written in the search box while this is clicked)   |
`lang` | *string* | the language of the user   |
`sep` | *string* | the word separarator, usually a comma is here   |

**Returns:** *Promise*<[*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md)\>

a promise for a location

Defined in: [server/services/base/LocationSearchProvider.ts:52](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/base/LocationSearchProvider.ts#L52)

___

### requestSearchFor

▸ **requestSearchFor**(`lat`: *string* \| *number*, `lng`: *string* \| *number*, `query`: *string*, `lang`: *string*, `sep`: *string*): *Promise*<[*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md)[]\>

This function is executed once the user requests a search
for a given location, you should override it

**`override`** 

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`lat` | *string* \| *number* | the latitude where results should be nearby for   |
`lng` | *string* \| *number* | the longitude where results should be nearby for   |
`query` | *string* | a query of what we are searching for   |
`lang` | *string* | the language of the user   |
`sep` | *string* | the word separarator, usually a comma is here   |

**Returns:** *Promise*<[*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md)[]\>

a promise for a location array

Defined in: [server/services/base/LocationSearchProvider.ts:74](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/base/LocationSearchProvider.ts#L74)

___

### run

▸ **run**(): *void* \| *Promise*<void\>

Executes some code

**`override`** 

**Returns:** *void* \| *Promise*<void\>

Inherited from: [ServiceProvider](server_services.serviceprovider.md)

Defined in: [server/services/index.ts:223](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/index.ts#L223)

___

### setInstanceName

▸ **setInstanceName**(`n`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`n` | *string* |

**Returns:** *void*

Inherited from: [ServiceProvider](server_services.serviceprovider.md)

Defined in: [server/services/index.ts:65](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/index.ts#L65)

___

### setupGlobalResources

▸ **setupGlobalResources**(`globalDatabaseConnection`: [*DatabaseConnection*](database.databaseconnection.md), `globalClient`: [*ItemizeRedisClient*](server_redis.itemizeredisclient.md), `globalPub`: [*ItemizeRedisClient*](server_redis.itemizeredisclient.md), `globalMailProvider`: [*default*](server_services_base_mailprovider.default.md)<any\>, `globalCustomServices`: { [name: string]: [*ServiceProvider*](server_services.serviceprovider.md)<any\>;  }, `root`: [*default*](base_root.default.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`globalDatabaseConnection` | [*DatabaseConnection*](database.databaseconnection.md) |
`globalClient` | [*ItemizeRedisClient*](server_redis.itemizeredisclient.md) |
`globalPub` | [*ItemizeRedisClient*](server_redis.itemizeredisclient.md) |
`globalMailProvider` | [*default*](server_services_base_mailprovider.default.md)<any\> |
`globalCustomServices` | *object* |
`root` | [*default*](base_root.default.md) |

**Returns:** *void*

Inherited from: [ServiceProvider](server_services.serviceprovider.md)

Defined in: [server/services/index.ts:113](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/index.ts#L113)

___

### setupLocalResources

▸ **setupLocalResources**(`appData`: [*IAppDataType*](../interfaces/server.iappdatatype.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`appData` | [*IAppDataType*](../interfaces/server.iappdatatype.md) |

**Returns:** *void*

Inherited from: [ServiceProvider](server_services.serviceprovider.md)

Defined in: [server/services/index.ts:133](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/index.ts#L133)

___

### expressRouter

▸ `Static`**expressRouter**(`options?`: RouterOptions): *Router*

#### Parameters:

Name | Type |
:------ | :------ |
`options?` | RouterOptions |

**Returns:** *Router*

Inherited from: [ServiceProvider](server_services.serviceprovider.md)

Defined in: [server/services/index.ts:109](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/index.ts#L109)

___

### getRouter

▸ `Static`**getRouter**(`appData`: [*IAppDataType*](../interfaces/server.iappdatatype.md)): *Router* \| *Promise*<Router\>

Provides a router endpoint, but this method
is static, which means it only gets added once

If the service provider if executed on a global environment
the endpoint does not get created, this means that in the global
manager this won't be executed, or anything that is meant
for the global manager

the router gets attached to /rest/service

**`override`** 

#### Parameters:

Name | Type |
:------ | :------ |
`appData` | [*IAppDataType*](../interfaces/server.iappdatatype.md) |

**Returns:** *Router* \| *Promise*<Router\>

Inherited from: [ServiceProvider](server_services.serviceprovider.md)

Defined in: [server/services/index.ts:259](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/index.ts#L259)

___

### getTriggerRegistry

▸ `Static`**getTriggerRegistry**(): [*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md) \| *Promise*<[*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md)\>

Allows to setup trigger registries via the service
so that they trigger just as normal trigger will do

This gets attached if a class is used rather than per instance

**`override`** 

**Returns:** [*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md) \| *Promise*<[*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md)\>

Inherited from: [ServiceProvider](server_services.serviceprovider.md)

Defined in: [server/services/index.ts:281](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/index.ts#L281)

___

### getType

▸ `Static`**getType**(): [*ServiceProviderType*](../enums/server_services.serviceprovidertype.md)

**Returns:** [*ServiceProviderType*](../enums/server_services.serviceprovidertype.md)

Overrides: [ServiceProvider](server_services.serviceprovider.md)

Defined in: [server/services/base/LocationSearchProvider.ts:24](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/base/LocationSearchProvider.ts#L24)

___

### logDebug

▸ `Static`**logDebug**(`str`: *string*, `extra?`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`str` | *string* |
`extra?` | *any* |

**Returns:** *void*

Inherited from: [ServiceProvider](server_services.serviceprovider.md)

Defined in: [server/services/index.ts:97](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/index.ts#L97)

___

### logError

▸ `Static`**logError**(`str`: *string*, `extra?`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`str` | *string* |
`extra?` | *any* |

**Returns:** *void*

Inherited from: [ServiceProvider](server_services.serviceprovider.md)

Defined in: [server/services/index.ts:101](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/index.ts#L101)

___

### logInfo

▸ `Static`**logInfo**(`str`: *string*, `extra?`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`str` | *string* |
`extra?` | *any* |

**Returns:** *void*

Inherited from: [ServiceProvider](server_services.serviceprovider.md)

Defined in: [server/services/index.ts:93](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/index.ts#L93)
