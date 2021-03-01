[](../README.md) / [Exports](../modules.md) / [server/services/here](../modules/server_services_here.md) / HereMapsService

# Class: HereMapsService

[server/services/here](../modules/server_services_here.md).HereMapsService

## Hierarchy

* [*default*](server_services_base_locationsearchprovider.default.md)<[*IHereMapsConfig*](../interfaces/server_services_here.iheremapsconfig.md)\>

  ↳ **HereMapsService**

## Table of contents

### Constructors

- [constructor](server_services_here.heremapsservice.md#constructor)

### Properties

- [appConfig](server_services_here.heremapsservice.md#appconfig)
- [appSensitiveConfig](server_services_here.heremapsservice.md#appsensitiveconfig)
- [config](server_services_here.heremapsservice.md#config)
- [globalCustomServices](server_services_here.heremapsservice.md#globalcustomservices)
- [globalDatabaseConnection](server_services_here.heremapsservice.md#globaldatabaseconnection)
- [globalInstance](server_services_here.heremapsservice.md#globalinstance)
- [globalMailProvider](server_services_here.heremapsservice.md#globalmailprovider)
- [globalRawDB](server_services_here.heremapsservice.md#globalrawdb)
- [globalRedis](server_services_here.heremapsservice.md#globalredis)
- [globalRedisPub](server_services_here.heremapsservice.md#globalredispub)
- [globalRoot](server_services_here.heremapsservice.md#globalroot)
- [instanceName](server_services_here.heremapsservice.md#instancename)
- [localAppData](server_services_here.heremapsservice.md#localappdata)
- [localInstance](server_services_here.heremapsservice.md#localinstance)
- [registry](server_services_here.heremapsservice.md#registry)

### Methods

- [execute](server_services_here.heremapsservice.md#execute)
- [expressRouter](server_services_here.heremapsservice.md#expressrouter)
- [getInstanceName](server_services_here.heremapsservice.md#getinstancename)
- [getRouter](server_services_here.heremapsservice.md#getrouter)
- [getRunCycleTime](server_services_here.heremapsservice.md#getruncycletime)
- [getTriggerRegistry](server_services_here.heremapsservice.md#gettriggerregistry)
- [initialize](server_services_here.heremapsservice.md#initialize)
- [isInstanceGlobal](server_services_here.heremapsservice.md#isinstanceglobal)
- [isInstanceLocal](server_services_here.heremapsservice.md#isinstancelocal)
- [logDebug](server_services_here.heremapsservice.md#logdebug)
- [logError](server_services_here.heremapsservice.md#logerror)
- [logInfo](server_services_here.heremapsservice.md#loginfo)
- [makeIdOutOf](server_services_here.heremapsservice.md#makeidoutof)
- [processHereResult](server_services_here.heremapsservice.md#processhereresult)
- [requestAutocompleteFor](server_services_here.heremapsservice.md#requestautocompletefor)
- [requestGeocodeFor](server_services_here.heremapsservice.md#requestgeocodefor)
- [requestSearchFor](server_services_here.heremapsservice.md#requestsearchfor)
- [run](server_services_here.heremapsservice.md#run)
- [setInstanceName](server_services_here.heremapsservice.md#setinstancename)
- [setupGlobalResources](server_services_here.heremapsservice.md#setupglobalresources)
- [setupLocalResources](server_services_here.heremapsservice.md#setuplocalresources)
- [expressRouter](server_services_here.heremapsservice.md#expressrouter)
- [getRouter](server_services_here.heremapsservice.md#getrouter)
- [getTriggerRegistry](server_services_here.heremapsservice.md#gettriggerregistry)
- [getType](server_services_here.heremapsservice.md#gettype)
- [logDebug](server_services_here.heremapsservice.md#logdebug)
- [logError](server_services_here.heremapsservice.md#logerror)
- [logInfo](server_services_here.heremapsservice.md#loginfo)

## Constructors

### constructor

\+ **new HereMapsService**(`config`: [*IHereMapsConfig*](../interfaces/server_services_here.iheremapsconfig.md), `registry`: [*RegistryService*](server_services_registry.registryservice.md), `appConfig`: [*IConfigRawJSONDataType*](../interfaces/config.iconfigrawjsondatatype.md), `appSensitiveConfig`: [*ISensitiveConfigRawJSONDataType*](../interfaces/config.isensitiveconfigrawjsondatatype.md)): [*HereMapsService*](server_services_here.heremapsservice.md)

#### Parameters:

Name | Type |
:------ | :------ |
`config` | [*IHereMapsConfig*](../interfaces/server_services_here.iheremapsconfig.md) |
`registry` | [*RegistryService*](server_services_registry.registryservice.md) |
`appConfig` | [*IConfigRawJSONDataType*](../interfaces/config.iconfigrawjsondatatype.md) |
`appSensitiveConfig` | [*ISensitiveConfigRawJSONDataType*](../interfaces/config.isensitiveconfigrawjsondatatype.md) |

**Returns:** [*HereMapsService*](server_services_here.heremapsservice.md)

Inherited from: [default](server_services_base_locationsearchprovider.default.md)

Defined in: [server/services/index.ts:51](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L51)

## Properties

### appConfig

• **appConfig**: [*IConfigRawJSONDataType*](../interfaces/config.iconfigrawjsondatatype.md)

Inherited from: [default](server_services_base_locationsearchprovider.default.md).[appConfig](server_services_base_locationsearchprovider.default.md#appconfig)

Defined in: [server/services/index.ts:34](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L34)

___

### appSensitiveConfig

• **appSensitiveConfig**: [*ISensitiveConfigRawJSONDataType*](../interfaces/config.isensitiveconfigrawjsondatatype.md)

Inherited from: [default](server_services_base_locationsearchprovider.default.md).[appSensitiveConfig](server_services_base_locationsearchprovider.default.md#appsensitiveconfig)

Defined in: [server/services/index.ts:35](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L35)

___

### config

• **config**: [*IHereMapsConfig*](../interfaces/server_services_here.iheremapsconfig.md)

Inherited from: [default](server_services_base_locationsearchprovider.default.md).[config](server_services_base_locationsearchprovider.default.md#config)

Defined in: [server/services/index.ts:32](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L32)

___

### globalCustomServices

• **globalCustomServices**: *object*

#### Type declaration:

Inherited from: [default](server_services_base_locationsearchprovider.default.md).[globalCustomServices](server_services_base_locationsearchprovider.default.md#globalcustomservices)

Defined in: [server/services/index.ts:43](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L43)

___

### globalDatabaseConnection

• **globalDatabaseConnection**: [*DatabaseConnection*](database.databaseconnection.md)

Inherited from: [default](server_services_base_locationsearchprovider.default.md).[globalDatabaseConnection](server_services_base_locationsearchprovider.default.md#globaldatabaseconnection)

Defined in: [server/services/index.ts:37](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L37)

___

### globalInstance

• **globalInstance**: *boolean*

Inherited from: [default](server_services_base_locationsearchprovider.default.md).[globalInstance](server_services_base_locationsearchprovider.default.md#globalinstance)

Defined in: [server/services/index.ts:50](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L50)

___

### globalMailProvider

• **globalMailProvider**: [*default*](server_services_base_mailprovider.default.md)<any\>

Inherited from: [default](server_services_base_locationsearchprovider.default.md).[globalMailProvider](server_services_base_locationsearchprovider.default.md#globalmailprovider)

Defined in: [server/services/index.ts:42](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L42)

___

### globalRawDB

• **globalRawDB**: [*ItemizeRawDB*](server_raw_db.itemizerawdb.md)

Inherited from: [default](server_services_base_locationsearchprovider.default.md).[globalRawDB](server_services_base_locationsearchprovider.default.md#globalrawdb)

Defined in: [server/services/index.ts:40](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L40)

___

### globalRedis

• **globalRedis**: [*ItemizeRedisClient*](server_redis.itemizeredisclient.md)

Inherited from: [default](server_services_base_locationsearchprovider.default.md).[globalRedis](server_services_base_locationsearchprovider.default.md#globalredis)

Defined in: [server/services/index.ts:39](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L39)

___

### globalRedisPub

• **globalRedisPub**: [*ItemizeRedisClient*](server_redis.itemizeredisclient.md)

Inherited from: [default](server_services_base_locationsearchprovider.default.md).[globalRedisPub](server_services_base_locationsearchprovider.default.md#globalredispub)

Defined in: [server/services/index.ts:38](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L38)

___

### globalRoot

• **globalRoot**: [*default*](root.default.md)

Inherited from: [default](server_services_base_locationsearchprovider.default.md).[globalRoot](server_services_base_locationsearchprovider.default.md#globalroot)

Defined in: [server/services/index.ts:41](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L41)

___

### instanceName

• **instanceName**: *string*

Inherited from: [default](server_services_base_locationsearchprovider.default.md).[instanceName](server_services_base_locationsearchprovider.default.md#instancename)

Defined in: [server/services/index.ts:49](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L49)

___

### localAppData

• **localAppData**: [*IAppDataType*](../interfaces/server.iappdatatype.md)

Inherited from: [default](server_services_base_locationsearchprovider.default.md).[localAppData](server_services_base_locationsearchprovider.default.md#localappdata)

Defined in: [server/services/index.ts:47](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L47)

___

### localInstance

• **localInstance**: *boolean*

Inherited from: [default](server_services_base_locationsearchprovider.default.md).[localInstance](server_services_base_locationsearchprovider.default.md#localinstance)

Defined in: [server/services/index.ts:51](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L51)

___

### registry

• **registry**: [*RegistryService*](server_services_registry.registryservice.md)

Inherited from: [default](server_services_base_locationsearchprovider.default.md).[registry](server_services_base_locationsearchprovider.default.md#registry)

Defined in: [server/services/index.ts:33](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L33)

## Methods

### execute

▸ **execute**(): *void*

Performs the execution of the service, basically
it will do the run function and then re-run as specified

**Returns:** *void*

Inherited from: [default](server_services_base_locationsearchprovider.default.md)

Defined in: [server/services/index.ts:155](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L155)

___

### expressRouter

▸ **expressRouter**(`options?`: RouterOptions): *Router*

#### Parameters:

Name | Type |
:------ | :------ |
`options?` | RouterOptions |

**Returns:** *Router*

Inherited from: [default](server_services_base_locationsearchprovider.default.md)

Defined in: [server/services/index.ts:105](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L105)

___

### getInstanceName

▸ **getInstanceName**(): *string*

**Returns:** *string*

Inherited from: [default](server_services_base_locationsearchprovider.default.md)

Defined in: [server/services/index.ts:69](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L69)

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

Inherited from: [default](server_services_base_locationsearchprovider.default.md)

Defined in: [server/services/index.ts:242](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L242)

___

### getRunCycleTime

▸ **getRunCycleTime**(): *number*

Determines whether the run function
should run over again

**`override`** 

**Returns:** *number*

Inherited from: [default](server_services_base_locationsearchprovider.default.md)

Defined in: [server/services/index.ts:215](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L215)

___

### getTriggerRegistry

▸ **getTriggerRegistry**(): [*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md) \| *Promise*<[*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md)\>

Allows to setup trigger registries via the service
so that they trigger just as normal trigger will do

**`override`** 

**Returns:** [*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md) \| *Promise*<[*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md)\>

Inherited from: [default](server_services_base_locationsearchprovider.default.md)

Defined in: [server/services/index.ts:269](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L269)

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

Inherited from: [default](server_services_base_locationsearchprovider.default.md)

Defined in: [server/services/index.ts:206](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L206)

___

### isInstanceGlobal

▸ **isInstanceGlobal**(): *boolean*

**Returns:** *boolean*

Inherited from: [default](server_services_base_locationsearchprovider.default.md)

Defined in: [server/services/index.ts:73](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L73)

___

### isInstanceLocal

▸ **isInstanceLocal**(): *boolean*

**Returns:** *boolean*

Inherited from: [default](server_services_base_locationsearchprovider.default.md)

Defined in: [server/services/index.ts:77](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L77)

___

### logDebug

▸ **logDebug**(`str`: *string*, `extra?`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`str` | *string* |
`extra?` | *any* |

**Returns:** *void*

Inherited from: [default](server_services_base_locationsearchprovider.default.md)

Defined in: [server/services/index.ts:85](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L85)

___

### logError

▸ **logError**(`str`: *string*, `extra?`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`str` | *string* |
`extra?` | *any* |

**Returns:** *void*

Inherited from: [default](server_services_base_locationsearchprovider.default.md)

Defined in: [server/services/index.ts:89](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L89)

___

### logInfo

▸ **logInfo**(`str`: *string*, `extra?`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`str` | *string* |
`extra?` | *any* |

**Returns:** *void*

Inherited from: [default](server_services_base_locationsearchprovider.default.md)

Defined in: [server/services/index.ts:81](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L81)

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

Inherited from: [default](server_services_base_locationsearchprovider.default.md)

Defined in: [server/services/base/LocationSearchProvider.ts:36](https://github.com/onzag/itemize/blob/0569bdf2/server/services/base/LocationSearchProvider.ts#L36)

___

### processHereResult

▸ `Private`**processHereResult**(`wordSeparator`: *string*, `suggestion`: IHereResult, `overwriteTxt?`: *string*): *object*

#### Parameters:

Name | Type |
:------ | :------ |
`wordSeparator` | *string* |
`suggestion` | IHereResult |
`overwriteTxt?` | *string* |

**Returns:** *object*

Name | Type |
:------ | :------ |
`atxt` | *string* |
`id` | *string* |
`lat` | *number* |
`lng` | *number* |
`txt` | *string* |

Defined in: [server/services/here.ts:33](https://github.com/onzag/itemize/blob/0569bdf2/server/services/here.ts#L33)

___

### requestAutocompleteFor

▸ **requestAutocompleteFor**(`lat`: *string* \| *number*, `lng`: *string* \| *number*, `query`: *string*, `lang`: *string*, `sep`: *string*): *Promise*<[*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md)[]\>

#### Parameters:

Name | Type |
:------ | :------ |
`lat` | *string* \| *number* |
`lng` | *string* \| *number* |
`query` | *string* |
`lang` | *string* |
`sep` | *string* |

**Returns:** *Promise*<[*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md)[]\>

Overrides: [default](server_services_base_locationsearchprovider.default.md)

Defined in: [server/services/here.ts:237](https://github.com/onzag/itemize/blob/0569bdf2/server/services/here.ts#L237)

___

### requestGeocodeFor

▸ **requestGeocodeFor**(`lat`: *string* \| *number*, `lng`: *string* \| *number*, `query`: *string*, `lang`: *string*, `sep`: *string*): *Promise*<[*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md)\>

#### Parameters:

Name | Type |
:------ | :------ |
`lat` | *string* \| *number* |
`lng` | *string* \| *number* |
`query` | *string* |
`lang` | *string* |
`sep` | *string* |

**Returns:** *Promise*<[*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md)\>

Overrides: [default](server_services_base_locationsearchprovider.default.md)

Defined in: [server/services/here.ts:43](https://github.com/onzag/itemize/blob/0569bdf2/server/services/here.ts#L43)

___

### requestSearchFor

▸ **requestSearchFor**(`lat`: *string* \| *number*, `lng`: *string* \| *number*, `query`: *string*, `lang`: *string*, `sep`: *string*): *Promise*<[*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md)[]\>

#### Parameters:

Name | Type |
:------ | :------ |
`lat` | *string* \| *number* |
`lng` | *string* \| *number* |
`query` | *string* |
`lang` | *string* |
`sep` | *string* |

**Returns:** *Promise*<[*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md)[]\>

Overrides: [default](server_services_base_locationsearchprovider.default.md)

Defined in: [server/services/here.ts:142](https://github.com/onzag/itemize/blob/0569bdf2/server/services/here.ts#L142)

___

### run

▸ **run**(): *void* \| *Promise*<void\>

Executes some code

**`override`** 

**Returns:** *void* \| *Promise*<void\>

Inherited from: [default](server_services_base_locationsearchprovider.default.md)

Defined in: [server/services/index.ts:223](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L223)

___

### setInstanceName

▸ **setInstanceName**(`n`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`n` | *string* |

**Returns:** *void*

Inherited from: [default](server_services_base_locationsearchprovider.default.md)

Defined in: [server/services/index.ts:65](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L65)

___

### setupGlobalResources

▸ **setupGlobalResources**(`globalDatabaseConnection`: [*DatabaseConnection*](database.databaseconnection.md), `globalClient`: [*ItemizeRedisClient*](server_redis.itemizeredisclient.md), `globalPub`: [*ItemizeRedisClient*](server_redis.itemizeredisclient.md), `globalMailProvider`: [*default*](server_services_base_mailprovider.default.md)<any\>, `globalCustomServices`: { [name: string]: [*ServiceProvider*](server_services.serviceprovider.md)<any\>;  }, `root`: [*default*](root.default.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`globalDatabaseConnection` | [*DatabaseConnection*](database.databaseconnection.md) |
`globalClient` | [*ItemizeRedisClient*](server_redis.itemizeredisclient.md) |
`globalPub` | [*ItemizeRedisClient*](server_redis.itemizeredisclient.md) |
`globalMailProvider` | [*default*](server_services_base_mailprovider.default.md)<any\> |
`globalCustomServices` | *object* |
`root` | [*default*](root.default.md) |

**Returns:** *void*

Inherited from: [default](server_services_base_locationsearchprovider.default.md)

Defined in: [server/services/index.ts:113](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L113)

___

### setupLocalResources

▸ **setupLocalResources**(`appData`: [*IAppDataType*](../interfaces/server.iappdatatype.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`appData` | [*IAppDataType*](../interfaces/server.iappdatatype.md) |

**Returns:** *void*

Inherited from: [default](server_services_base_locationsearchprovider.default.md)

Defined in: [server/services/index.ts:133](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L133)

___

### expressRouter

▸ `Static`**expressRouter**(`options?`: RouterOptions): *Router*

#### Parameters:

Name | Type |
:------ | :------ |
`options?` | RouterOptions |

**Returns:** *Router*

Inherited from: [default](server_services_base_locationsearchprovider.default.md)

Defined in: [server/services/index.ts:109](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L109)

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

Inherited from: [default](server_services_base_locationsearchprovider.default.md)

Defined in: [server/services/index.ts:259](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L259)

___

### getTriggerRegistry

▸ `Static`**getTriggerRegistry**(): [*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md) \| *Promise*<[*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md)\>

Allows to setup trigger registries via the service
so that they trigger just as normal trigger will do

This gets attached if a class is used rather than per instance

**`override`** 

**Returns:** [*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md) \| *Promise*<[*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md)\>

Inherited from: [default](server_services_base_locationsearchprovider.default.md)

Defined in: [server/services/index.ts:281](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L281)

___

### getType

▸ `Static`**getType**(): [*ServiceProviderType*](../enums/server_services.serviceprovidertype.md)

**Returns:** [*ServiceProviderType*](../enums/server_services.serviceprovidertype.md)

Overrides: [default](server_services_base_locationsearchprovider.default.md)

Defined in: [server/services/here.ts:30](https://github.com/onzag/itemize/blob/0569bdf2/server/services/here.ts#L30)

___

### logDebug

▸ `Static`**logDebug**(`str`: *string*, `extra?`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`str` | *string* |
`extra?` | *any* |

**Returns:** *void*

Inherited from: [default](server_services_base_locationsearchprovider.default.md)

Defined in: [server/services/index.ts:97](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L97)

___

### logError

▸ `Static`**logError**(`str`: *string*, `extra?`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`str` | *string* |
`extra?` | *any* |

**Returns:** *void*

Inherited from: [default](server_services_base_locationsearchprovider.default.md)

Defined in: [server/services/index.ts:101](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L101)

___

### logInfo

▸ `Static`**logInfo**(`str`: *string*, `extra?`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`str` | *string* |
`extra?` | *any* |

**Returns:** *void*

Inherited from: [default](server_services_base_locationsearchprovider.default.md)

Defined in: [server/services/index.ts:93](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L93)
