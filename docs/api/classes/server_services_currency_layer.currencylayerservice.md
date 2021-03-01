[](../README.md) / [Exports](../modules.md) / [server/services/currency-layer](../modules/server_services_currency_layer.md) / CurrencyLayerService

# Class: CurrencyLayerService

[server/services/currency-layer](../modules/server_services_currency_layer.md).CurrencyLayerService

## Hierarchy

* [*default*](server_services_base_currencyfactorsprovider.default.md)<[*ICurrencyLayerConfig*](../interfaces/server_services_currency_layer.icurrencylayerconfig.md)\>

  ↳ **CurrencyLayerService**

## Table of contents

### Constructors

- [constructor](server_services_currency_layer.currencylayerservice.md#constructor)

### Properties

- [appConfig](server_services_currency_layer.currencylayerservice.md#appconfig)
- [appSensitiveConfig](server_services_currency_layer.currencylayerservice.md#appsensitiveconfig)
- [config](server_services_currency_layer.currencylayerservice.md#config)
- [globalCustomServices](server_services_currency_layer.currencylayerservice.md#globalcustomservices)
- [globalDatabaseConnection](server_services_currency_layer.currencylayerservice.md#globaldatabaseconnection)
- [globalInstance](server_services_currency_layer.currencylayerservice.md#globalinstance)
- [globalMailProvider](server_services_currency_layer.currencylayerservice.md#globalmailprovider)
- [globalRawDB](server_services_currency_layer.currencylayerservice.md#globalrawdb)
- [globalRedis](server_services_currency_layer.currencylayerservice.md#globalredis)
- [globalRedisPub](server_services_currency_layer.currencylayerservice.md#globalredispub)
- [globalRoot](server_services_currency_layer.currencylayerservice.md#globalroot)
- [instanceName](server_services_currency_layer.currencylayerservice.md#instancename)
- [localAppData](server_services_currency_layer.currencylayerservice.md#localappdata)
- [localInstance](server_services_currency_layer.currencylayerservice.md#localinstance)
- [registry](server_services_currency_layer.currencylayerservice.md#registry)

### Methods

- [execute](server_services_currency_layer.currencylayerservice.md#execute)
- [expressRouter](server_services_currency_layer.currencylayerservice.md#expressrouter)
- [getFactors](server_services_currency_layer.currencylayerservice.md#getfactors)
- [getInstanceName](server_services_currency_layer.currencylayerservice.md#getinstancename)
- [getRouter](server_services_currency_layer.currencylayerservice.md#getrouter)
- [getRunCycleTime](server_services_currency_layer.currencylayerservice.md#getruncycletime)
- [getTriggerRegistry](server_services_currency_layer.currencylayerservice.md#gettriggerregistry)
- [initialize](server_services_currency_layer.currencylayerservice.md#initialize)
- [isInstanceGlobal](server_services_currency_layer.currencylayerservice.md#isinstanceglobal)
- [isInstanceLocal](server_services_currency_layer.currencylayerservice.md#isinstancelocal)
- [logDebug](server_services_currency_layer.currencylayerservice.md#logdebug)
- [logError](server_services_currency_layer.currencylayerservice.md#logerror)
- [logInfo](server_services_currency_layer.currencylayerservice.md#loginfo)
- [requestInfo](server_services_currency_layer.currencylayerservice.md#requestinfo)
- [run](server_services_currency_layer.currencylayerservice.md#run)
- [setInstanceName](server_services_currency_layer.currencylayerservice.md#setinstancename)
- [setupGlobalResources](server_services_currency_layer.currencylayerservice.md#setupglobalresources)
- [setupLocalResources](server_services_currency_layer.currencylayerservice.md#setuplocalresources)
- [expressRouter](server_services_currency_layer.currencylayerservice.md#expressrouter)
- [getRouter](server_services_currency_layer.currencylayerservice.md#getrouter)
- [getTriggerRegistry](server_services_currency_layer.currencylayerservice.md#gettriggerregistry)
- [getType](server_services_currency_layer.currencylayerservice.md#gettype)
- [logDebug](server_services_currency_layer.currencylayerservice.md#logdebug)
- [logError](server_services_currency_layer.currencylayerservice.md#logerror)
- [logInfo](server_services_currency_layer.currencylayerservice.md#loginfo)

## Constructors

### constructor

\+ **new CurrencyLayerService**(`config`: [*ICurrencyLayerConfig*](../interfaces/server_services_currency_layer.icurrencylayerconfig.md), `registry`: [*RegistryService*](server_services_registry.registryservice.md), `appConfig`: [*IConfigRawJSONDataType*](../interfaces/config.iconfigrawjsondatatype.md), `appSensitiveConfig`: [*ISensitiveConfigRawJSONDataType*](../interfaces/config.isensitiveconfigrawjsondatatype.md)): [*CurrencyLayerService*](server_services_currency_layer.currencylayerservice.md)

#### Parameters:

Name | Type |
:------ | :------ |
`config` | [*ICurrencyLayerConfig*](../interfaces/server_services_currency_layer.icurrencylayerconfig.md) |
`registry` | [*RegistryService*](server_services_registry.registryservice.md) |
`appConfig` | [*IConfigRawJSONDataType*](../interfaces/config.iconfigrawjsondatatype.md) |
`appSensitiveConfig` | [*ISensitiveConfigRawJSONDataType*](../interfaces/config.isensitiveconfigrawjsondatatype.md) |

**Returns:** [*CurrencyLayerService*](server_services_currency_layer.currencylayerservice.md)

Inherited from: [default](server_services_base_currencyfactorsprovider.default.md)

Defined in: [server/services/index.ts:51](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L51)

## Properties

### appConfig

• **appConfig**: [*IConfigRawJSONDataType*](../interfaces/config.iconfigrawjsondatatype.md)

Inherited from: [default](server_services_base_currencyfactorsprovider.default.md).[appConfig](server_services_base_currencyfactorsprovider.default.md#appconfig)

Defined in: [server/services/index.ts:34](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L34)

___

### appSensitiveConfig

• **appSensitiveConfig**: [*ISensitiveConfigRawJSONDataType*](../interfaces/config.isensitiveconfigrawjsondatatype.md)

Inherited from: [default](server_services_base_currencyfactorsprovider.default.md).[appSensitiveConfig](server_services_base_currencyfactorsprovider.default.md#appsensitiveconfig)

Defined in: [server/services/index.ts:35](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L35)

___

### config

• **config**: [*ICurrencyLayerConfig*](../interfaces/server_services_currency_layer.icurrencylayerconfig.md)

Inherited from: [default](server_services_base_currencyfactorsprovider.default.md).[config](server_services_base_currencyfactorsprovider.default.md#config)

Defined in: [server/services/index.ts:32](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L32)

___

### globalCustomServices

• **globalCustomServices**: *object*

#### Type declaration:

Inherited from: [default](server_services_base_currencyfactorsprovider.default.md).[globalCustomServices](server_services_base_currencyfactorsprovider.default.md#globalcustomservices)

Defined in: [server/services/index.ts:43](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L43)

___

### globalDatabaseConnection

• **globalDatabaseConnection**: [*DatabaseConnection*](database.databaseconnection.md)

Inherited from: [default](server_services_base_currencyfactorsprovider.default.md).[globalDatabaseConnection](server_services_base_currencyfactorsprovider.default.md#globaldatabaseconnection)

Defined in: [server/services/index.ts:37](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L37)

___

### globalInstance

• **globalInstance**: *boolean*

Inherited from: [default](server_services_base_currencyfactorsprovider.default.md).[globalInstance](server_services_base_currencyfactorsprovider.default.md#globalinstance)

Defined in: [server/services/index.ts:50](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L50)

___

### globalMailProvider

• **globalMailProvider**: [*default*](server_services_base_mailprovider.default.md)<any\>

Inherited from: [default](server_services_base_currencyfactorsprovider.default.md).[globalMailProvider](server_services_base_currencyfactorsprovider.default.md#globalmailprovider)

Defined in: [server/services/index.ts:42](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L42)

___

### globalRawDB

• **globalRawDB**: [*ItemizeRawDB*](server_raw_db.itemizerawdb.md)

Inherited from: [default](server_services_base_currencyfactorsprovider.default.md).[globalRawDB](server_services_base_currencyfactorsprovider.default.md#globalrawdb)

Defined in: [server/services/index.ts:40](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L40)

___

### globalRedis

• **globalRedis**: [*ItemizeRedisClient*](server_redis.itemizeredisclient.md)

Inherited from: [default](server_services_base_currencyfactorsprovider.default.md).[globalRedis](server_services_base_currencyfactorsprovider.default.md#globalredis)

Defined in: [server/services/index.ts:39](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L39)

___

### globalRedisPub

• **globalRedisPub**: [*ItemizeRedisClient*](server_redis.itemizeredisclient.md)

Inherited from: [default](server_services_base_currencyfactorsprovider.default.md).[globalRedisPub](server_services_base_currencyfactorsprovider.default.md#globalredispub)

Defined in: [server/services/index.ts:38](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L38)

___

### globalRoot

• **globalRoot**: [*default*](base_root.default.md)

Inherited from: [default](server_services_base_currencyfactorsprovider.default.md).[globalRoot](server_services_base_currencyfactorsprovider.default.md#globalroot)

Defined in: [server/services/index.ts:41](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L41)

___

### instanceName

• **instanceName**: *string*

Inherited from: [default](server_services_base_currencyfactorsprovider.default.md).[instanceName](server_services_base_currencyfactorsprovider.default.md#instancename)

Defined in: [server/services/index.ts:49](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L49)

___

### localAppData

• **localAppData**: [*IAppDataType*](../interfaces/server.iappdatatype.md)

Inherited from: [default](server_services_base_currencyfactorsprovider.default.md).[localAppData](server_services_base_currencyfactorsprovider.default.md#localappdata)

Defined in: [server/services/index.ts:47](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L47)

___

### localInstance

• **localInstance**: *boolean*

Inherited from: [default](server_services_base_currencyfactorsprovider.default.md).[localInstance](server_services_base_currencyfactorsprovider.default.md#localinstance)

Defined in: [server/services/index.ts:51](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L51)

___

### registry

• **registry**: [*RegistryService*](server_services_registry.registryservice.md)

Inherited from: [default](server_services_base_currencyfactorsprovider.default.md).[registry](server_services_base_currencyfactorsprovider.default.md#registry)

Defined in: [server/services/index.ts:33](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L33)

## Methods

### execute

▸ **execute**(): *void*

Performs the execution of the service, basically
it will do the run function and then re-run as specified

**Returns:** *void*

Inherited from: [default](server_services_base_currencyfactorsprovider.default.md)

Defined in: [server/services/index.ts:155](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L155)

___

### expressRouter

▸ **expressRouter**(`options?`: RouterOptions): *Router*

#### Parameters:

Name | Type |
:------ | :------ |
`options?` | RouterOptions |

**Returns:** *Router*

Inherited from: [default](server_services_base_currencyfactorsprovider.default.md)

Defined in: [server/services/index.ts:105](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L105)

___

### getFactors

▸ **getFactors**(): *Promise*<[*ICurrencyFactors*](../interfaces/server_services_base_currencyfactorsprovider.icurrencyfactors.md)\>

**Returns:** *Promise*<[*ICurrencyFactors*](../interfaces/server_services_base_currencyfactorsprovider.icurrencyfactors.md)\>

Overrides: [default](server_services_base_currencyfactorsprovider.default.md)

Defined in: [server/services/currency-layer.ts:103](https://github.com/onzag/itemize/blob/0e9b128c/server/services/currency-layer.ts#L103)

___

### getInstanceName

▸ **getInstanceName**(): *string*

**Returns:** *string*

Inherited from: [default](server_services_base_currencyfactorsprovider.default.md)

Defined in: [server/services/index.ts:69](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L69)

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

Inherited from: [default](server_services_base_currencyfactorsprovider.default.md)

Defined in: [server/services/index.ts:242](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L242)

___

### getRunCycleTime

▸ **getRunCycleTime**(): *number*

Determines whether the run function
should run over again

**`override`** 

**Returns:** *number*

Inherited from: [default](server_services_base_currencyfactorsprovider.default.md)

Defined in: [server/services/index.ts:215](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L215)

___

### getTriggerRegistry

▸ **getTriggerRegistry**(): [*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md) \| *Promise*<[*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md)\>

Allows to setup trigger registries via the service
so that they trigger just as normal trigger will do

**`override`** 

**Returns:** [*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md) \| *Promise*<[*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md)\>

Inherited from: [default](server_services_base_currencyfactorsprovider.default.md)

Defined in: [server/services/index.ts:269](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L269)

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

Inherited from: [default](server_services_base_currencyfactorsprovider.default.md)

Defined in: [server/services/index.ts:206](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L206)

___

### isInstanceGlobal

▸ **isInstanceGlobal**(): *boolean*

**Returns:** *boolean*

Inherited from: [default](server_services_base_currencyfactorsprovider.default.md)

Defined in: [server/services/index.ts:73](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L73)

___

### isInstanceLocal

▸ **isInstanceLocal**(): *boolean*

**Returns:** *boolean*

Inherited from: [default](server_services_base_currencyfactorsprovider.default.md)

Defined in: [server/services/index.ts:77](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L77)

___

### logDebug

▸ **logDebug**(`str`: *string*, `extra?`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`str` | *string* |
`extra?` | *any* |

**Returns:** *void*

Inherited from: [default](server_services_base_currencyfactorsprovider.default.md)

Defined in: [server/services/index.ts:85](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L85)

___

### logError

▸ **logError**(`str`: *string*, `extra?`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`str` | *string* |
`extra?` | *any* |

**Returns:** *void*

Inherited from: [default](server_services_base_currencyfactorsprovider.default.md)

Defined in: [server/services/index.ts:89](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L89)

___

### logInfo

▸ **logInfo**(`str`: *string*, `extra?`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`str` | *string* |
`extra?` | *any* |

**Returns:** *void*

Inherited from: [default](server_services_base_currencyfactorsprovider.default.md)

Defined in: [server/services/index.ts:81](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L81)

___

### requestInfo

▸ `Private`**requestInfo**(): *Promise*<CurrencyLayerResponse\>

**Returns:** *Promise*<CurrencyLayerResponse\>

Defined in: [server/services/currency-layer.ts:29](https://github.com/onzag/itemize/blob/0e9b128c/server/services/currency-layer.ts#L29)

___

### run

▸ **run**(): *void* \| *Promise*<void\>

Executes some code

**`override`** 

**Returns:** *void* \| *Promise*<void\>

Inherited from: [default](server_services_base_currencyfactorsprovider.default.md)

Defined in: [server/services/index.ts:223](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L223)

___

### setInstanceName

▸ **setInstanceName**(`n`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`n` | *string* |

**Returns:** *void*

Inherited from: [default](server_services_base_currencyfactorsprovider.default.md)

Defined in: [server/services/index.ts:65](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L65)

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

Inherited from: [default](server_services_base_currencyfactorsprovider.default.md)

Defined in: [server/services/index.ts:113](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L113)

___

### setupLocalResources

▸ **setupLocalResources**(`appData`: [*IAppDataType*](../interfaces/server.iappdatatype.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`appData` | [*IAppDataType*](../interfaces/server.iappdatatype.md) |

**Returns:** *void*

Inherited from: [default](server_services_base_currencyfactorsprovider.default.md)

Defined in: [server/services/index.ts:133](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L133)

___

### expressRouter

▸ `Static`**expressRouter**(`options?`: RouterOptions): *Router*

#### Parameters:

Name | Type |
:------ | :------ |
`options?` | RouterOptions |

**Returns:** *Router*

Inherited from: [default](server_services_base_currencyfactorsprovider.default.md)

Defined in: [server/services/index.ts:109](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L109)

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

Inherited from: [default](server_services_base_currencyfactorsprovider.default.md)

Defined in: [server/services/index.ts:259](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L259)

___

### getTriggerRegistry

▸ `Static`**getTriggerRegistry**(): [*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md) \| *Promise*<[*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md)\>

Allows to setup trigger registries via the service
so that they trigger just as normal trigger will do

This gets attached if a class is used rather than per instance

**`override`** 

**Returns:** [*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md) \| *Promise*<[*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md)\>

Inherited from: [default](server_services_base_currencyfactorsprovider.default.md)

Defined in: [server/services/index.ts:281](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L281)

___

### getType

▸ `Static`**getType**(): [*ServiceProviderType*](../enums/server_services.serviceprovidertype.md)

**Returns:** [*ServiceProviderType*](../enums/server_services.serviceprovidertype.md)

Overrides: [default](server_services_base_currencyfactorsprovider.default.md)

Defined in: [server/services/currency-layer.ts:25](https://github.com/onzag/itemize/blob/0e9b128c/server/services/currency-layer.ts#L25)

___

### logDebug

▸ `Static`**logDebug**(`str`: *string*, `extra?`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`str` | *string* |
`extra?` | *any* |

**Returns:** *void*

Inherited from: [default](server_services_base_currencyfactorsprovider.default.md)

Defined in: [server/services/index.ts:97](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L97)

___

### logError

▸ `Static`**logError**(`str`: *string*, `extra?`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`str` | *string* |
`extra?` | *any* |

**Returns:** *void*

Inherited from: [default](server_services_base_currencyfactorsprovider.default.md)

Defined in: [server/services/index.ts:101](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L101)

___

### logInfo

▸ `Static`**logInfo**(`str`: *string*, `extra?`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`str` | *string* |
`extra?` | *any* |

**Returns:** *void*

Inherited from: [default](server_services_base_currencyfactorsprovider.default.md)

Defined in: [server/services/index.ts:93](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L93)
