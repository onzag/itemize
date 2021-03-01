[](../README.md) / [Exports](../modules.md) / [server/services/registry](../modules/server_services_registry.md) / RegistryService

# Class: RegistryService

[server/services/registry](../modules/server_services_registry.md).RegistryService

The registry service allows services to store critical information
in a key value fashion, it's a rather simple service on its own
and it's special and not treated like other services, it even
runs on the load-dump and dump mechanisms

## Hierarchy

* [*ServiceProvider*](server_services.serviceprovider.md)<IRegistryConfig\>

  ↳ **RegistryService**

## Table of contents

### Constructors

- [constructor](server_services_registry.registryservice.md#constructor)

### Properties

- [appConfig](server_services_registry.registryservice.md#appconfig)
- [appSensitiveConfig](server_services_registry.registryservice.md#appsensitiveconfig)
- [config](server_services_registry.registryservice.md#config)
- [globalCustomServices](server_services_registry.registryservice.md#globalcustomservices)
- [globalDatabaseConnection](server_services_registry.registryservice.md#globaldatabaseconnection)
- [globalInstance](server_services_registry.registryservice.md#globalinstance)
- [globalMailProvider](server_services_registry.registryservice.md#globalmailprovider)
- [globalRawDB](server_services_registry.registryservice.md#globalrawdb)
- [globalRedis](server_services_registry.registryservice.md#globalredis)
- [globalRedisPub](server_services_registry.registryservice.md#globalredispub)
- [globalRoot](server_services_registry.registryservice.md#globalroot)
- [instanceName](server_services_registry.registryservice.md#instancename)
- [localAppData](server_services_registry.registryservice.md#localappdata)
- [localInstance](server_services_registry.registryservice.md#localinstance)
- [registry](server_services_registry.registryservice.md#registry)

### Methods

- [delKey](server_services_registry.registryservice.md#delkey)
- [execute](server_services_registry.registryservice.md#execute)
- [expressRouter](server_services_registry.registryservice.md#expressrouter)
- [getAllInPkey](server_services_registry.registryservice.md#getallinpkey)
- [getInstanceName](server_services_registry.registryservice.md#getinstancename)
- [getKey](server_services_registry.registryservice.md#getkey)
- [getRouter](server_services_registry.registryservice.md#getrouter)
- [getRunCycleTime](server_services_registry.registryservice.md#getruncycletime)
- [getTriggerRegistry](server_services_registry.registryservice.md#gettriggerregistry)
- [initialize](server_services_registry.registryservice.md#initialize)
- [isInstanceGlobal](server_services_registry.registryservice.md#isinstanceglobal)
- [isInstanceLocal](server_services_registry.registryservice.md#isinstancelocal)
- [logDebug](server_services_registry.registryservice.md#logdebug)
- [logError](server_services_registry.registryservice.md#logerror)
- [logInfo](server_services_registry.registryservice.md#loginfo)
- [run](server_services_registry.registryservice.md#run)
- [setInstanceName](server_services_registry.registryservice.md#setinstancename)
- [setKey](server_services_registry.registryservice.md#setkey)
- [setupGlobalResources](server_services_registry.registryservice.md#setupglobalresources)
- [setupLocalResources](server_services_registry.registryservice.md#setuplocalresources)
- [expressRouter](server_services_registry.registryservice.md#expressrouter)
- [getRouter](server_services_registry.registryservice.md#getrouter)
- [getTriggerRegistry](server_services_registry.registryservice.md#gettriggerregistry)
- [getType](server_services_registry.registryservice.md#gettype)
- [logDebug](server_services_registry.registryservice.md#logdebug)
- [logError](server_services_registry.registryservice.md#logerror)
- [logInfo](server_services_registry.registryservice.md#loginfo)

## Constructors

### constructor

\+ **new RegistryService**(`config`: IRegistryConfig, `registry`: [*RegistryService*](server_services_registry.registryservice.md), `appConfig`: [*IConfigRawJSONDataType*](../interfaces/config.iconfigrawjsondatatype.md), `appSensitiveConfig`: [*ISensitiveConfigRawJSONDataType*](../interfaces/config.isensitiveconfigrawjsondatatype.md)): [*RegistryService*](server_services_registry.registryservice.md)

#### Parameters:

Name | Type |
:------ | :------ |
`config` | IRegistryConfig |
`registry` | [*RegistryService*](server_services_registry.registryservice.md) |
`appConfig` | [*IConfigRawJSONDataType*](../interfaces/config.iconfigrawjsondatatype.md) |
`appSensitiveConfig` | [*ISensitiveConfigRawJSONDataType*](../interfaces/config.isensitiveconfigrawjsondatatype.md) |

**Returns:** [*RegistryService*](server_services_registry.registryservice.md)

Inherited from: [ServiceProvider](server_services.serviceprovider.md)

Defined in: [server/services/index.ts:51](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/index.ts#L51)

## Properties

### appConfig

• **appConfig**: [*IConfigRawJSONDataType*](../interfaces/config.iconfigrawjsondatatype.md)

Inherited from: [ServiceProvider](server_services.serviceprovider.md).[appConfig](server_services.serviceprovider.md#appconfig)

Defined in: [server/services/index.ts:34](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/index.ts#L34)

___

### appSensitiveConfig

• **appSensitiveConfig**: [*ISensitiveConfigRawJSONDataType*](../interfaces/config.isensitiveconfigrawjsondatatype.md)

Inherited from: [ServiceProvider](server_services.serviceprovider.md).[appSensitiveConfig](server_services.serviceprovider.md#appsensitiveconfig)

Defined in: [server/services/index.ts:35](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/index.ts#L35)

___

### config

• **config**: IRegistryConfig

Inherited from: [ServiceProvider](server_services.serviceprovider.md).[config](server_services.serviceprovider.md#config)

Defined in: [server/services/index.ts:32](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/index.ts#L32)

___

### globalCustomServices

• **globalCustomServices**: *object*

#### Type declaration:

Inherited from: [ServiceProvider](server_services.serviceprovider.md).[globalCustomServices](server_services.serviceprovider.md#globalcustomservices)

Defined in: [server/services/index.ts:43](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/index.ts#L43)

___

### globalDatabaseConnection

• **globalDatabaseConnection**: [*DatabaseConnection*](database.databaseconnection.md)

Inherited from: [ServiceProvider](server_services.serviceprovider.md).[globalDatabaseConnection](server_services.serviceprovider.md#globaldatabaseconnection)

Defined in: [server/services/index.ts:37](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/index.ts#L37)

___

### globalInstance

• **globalInstance**: *boolean*

Inherited from: [ServiceProvider](server_services.serviceprovider.md).[globalInstance](server_services.serviceprovider.md#globalinstance)

Defined in: [server/services/index.ts:50](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/index.ts#L50)

___

### globalMailProvider

• **globalMailProvider**: [*default*](server_services_base_mailprovider.default.md)<any\>

Inherited from: [ServiceProvider](server_services.serviceprovider.md).[globalMailProvider](server_services.serviceprovider.md#globalmailprovider)

Defined in: [server/services/index.ts:42](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/index.ts#L42)

___

### globalRawDB

• **globalRawDB**: [*ItemizeRawDB*](server_raw_db.itemizerawdb.md)

Inherited from: [ServiceProvider](server_services.serviceprovider.md).[globalRawDB](server_services.serviceprovider.md#globalrawdb)

Defined in: [server/services/index.ts:40](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/index.ts#L40)

___

### globalRedis

• **globalRedis**: [*ItemizeRedisClient*](server_redis.itemizeredisclient.md)

Inherited from: [ServiceProvider](server_services.serviceprovider.md).[globalRedis](server_services.serviceprovider.md#globalredis)

Defined in: [server/services/index.ts:39](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/index.ts#L39)

___

### globalRedisPub

• **globalRedisPub**: [*ItemizeRedisClient*](server_redis.itemizeredisclient.md)

Inherited from: [ServiceProvider](server_services.serviceprovider.md).[globalRedisPub](server_services.serviceprovider.md#globalredispub)

Defined in: [server/services/index.ts:38](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/index.ts#L38)

___

### globalRoot

• **globalRoot**: [*default*](base_root.default.md)

Inherited from: [ServiceProvider](server_services.serviceprovider.md).[globalRoot](server_services.serviceprovider.md#globalroot)

Defined in: [server/services/index.ts:41](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/index.ts#L41)

___

### instanceName

• **instanceName**: *string*

Inherited from: [ServiceProvider](server_services.serviceprovider.md).[instanceName](server_services.serviceprovider.md#instancename)

Defined in: [server/services/index.ts:49](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/index.ts#L49)

___

### localAppData

• **localAppData**: [*IAppDataType*](../interfaces/server.iappdatatype.md)

Inherited from: [ServiceProvider](server_services.serviceprovider.md).[localAppData](server_services.serviceprovider.md#localappdata)

Defined in: [server/services/index.ts:47](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/index.ts#L47)

___

### localInstance

• **localInstance**: *boolean*

Inherited from: [ServiceProvider](server_services.serviceprovider.md).[localInstance](server_services.serviceprovider.md#localinstance)

Defined in: [server/services/index.ts:51](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/index.ts#L51)

___

### registry

• **registry**: [*RegistryService*](server_services_registry.registryservice.md)

Inherited from: [ServiceProvider](server_services.serviceprovider.md).[registry](server_services.serviceprovider.md#registry)

Defined in: [server/services/index.ts:33](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/index.ts#L33)

## Methods

### delKey

▸ **delKey**(`pkey`: *string*, `skey?`: *string*): *Promise*<void\>

deletes a key value

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`pkey` | *string* | the primary key name   |
`skey?` | *string* | an optional secondary key name    |

**Returns:** *Promise*<void\>

Defined in: [server/services/registry.ts:131](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/registry.ts#L131)

___

### execute

▸ **execute**(): *void*

Performs the execution of the service, basically
it will do the run function and then re-run as specified

**Returns:** *void*

Inherited from: [ServiceProvider](server_services.serviceprovider.md)

Defined in: [server/services/index.ts:155](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/index.ts#L155)

___

### expressRouter

▸ **expressRouter**(`options?`: RouterOptions): *Router*

#### Parameters:

Name | Type |
:------ | :------ |
`options?` | RouterOptions |

**Returns:** *Router*

Inherited from: [ServiceProvider](server_services.serviceprovider.md)

Defined in: [server/services/index.ts:105](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/index.ts#L105)

___

### getAllInPkey

▸ **getAllInPkey**(`pkey`: *string*): *Promise*<IAllKeyResult\>

Provides all the subkeys including the empty default subkey
for the given registry key name

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`pkey` | *string* | the primary key name    |

**Returns:** *Promise*<IAllKeyResult\>

Defined in: [server/services/registry.ts:57](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/registry.ts#L57)

___

### getInstanceName

▸ **getInstanceName**(): *string*

**Returns:** *string*

Inherited from: [ServiceProvider](server_services.serviceprovider.md)

Defined in: [server/services/index.ts:69](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/index.ts#L69)

___

### getKey

▸ **getKey**(`pkey`: *string*, `skey?`: *string*): *Promise*<any\>

Provides a single key value
if not found provides null

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`pkey` | *string* | the primary key name   |
`skey?` | *string* | an optional secondary key name    |

**Returns:** *Promise*<any\>

Defined in: [server/services/registry.ts:95](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/registry.ts#L95)

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

Defined in: [server/services/index.ts:242](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/index.ts#L242)

___

### getRunCycleTime

▸ **getRunCycleTime**(): *number*

Determines whether the run function
should run over again

**`override`** 

**Returns:** *number*

Inherited from: [ServiceProvider](server_services.serviceprovider.md)

Defined in: [server/services/index.ts:215](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/index.ts#L215)

___

### getTriggerRegistry

▸ **getTriggerRegistry**(): [*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md) \| *Promise*<[*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md)\>

Allows to setup trigger registries via the service
so that they trigger just as normal trigger will do

**`override`** 

**Returns:** [*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md) \| *Promise*<[*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md)\>

Inherited from: [ServiceProvider](server_services.serviceprovider.md)

Defined in: [server/services/index.ts:269](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/index.ts#L269)

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

Defined in: [server/services/index.ts:206](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/index.ts#L206)

___

### isInstanceGlobal

▸ **isInstanceGlobal**(): *boolean*

**Returns:** *boolean*

Inherited from: [ServiceProvider](server_services.serviceprovider.md)

Defined in: [server/services/index.ts:73](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/index.ts#L73)

___

### isInstanceLocal

▸ **isInstanceLocal**(): *boolean*

**Returns:** *boolean*

Inherited from: [ServiceProvider](server_services.serviceprovider.md)

Defined in: [server/services/index.ts:77](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/index.ts#L77)

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

Defined in: [server/services/index.ts:85](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/index.ts#L85)

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

Defined in: [server/services/index.ts:89](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/index.ts#L89)

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

Defined in: [server/services/index.ts:81](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/index.ts#L81)

___

### run

▸ **run**(): *void* \| *Promise*<void\>

Executes some code

**`override`** 

**Returns:** *void* \| *Promise*<void\>

Inherited from: [ServiceProvider](server_services.serviceprovider.md)

Defined in: [server/services/index.ts:223](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/index.ts#L223)

___

### setInstanceName

▸ **setInstanceName**(`n`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`n` | *string* |

**Returns:** *void*

Inherited from: [ServiceProvider](server_services.serviceprovider.md)

Defined in: [server/services/index.ts:65](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/index.ts#L65)

___

### setKey

▸ **setKey**(`pkey`: *string*, `value`: *any*, `skey?`: *string*): *Promise*<void\>

Sets a key in the given registry

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`pkey` | *string* | the primary key name   |
`value` | *any* | any JSON serializable value   |
`skey?` | *string* | an optional subkey value    |

**Returns:** *Promise*<void\>

Defined in: [server/services/registry.ts:35](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/registry.ts#L35)

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

Defined in: [server/services/index.ts:113](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/index.ts#L113)

___

### setupLocalResources

▸ **setupLocalResources**(`appData`: [*IAppDataType*](../interfaces/server.iappdatatype.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`appData` | [*IAppDataType*](../interfaces/server.iappdatatype.md) |

**Returns:** *void*

Inherited from: [ServiceProvider](server_services.serviceprovider.md)

Defined in: [server/services/index.ts:133](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/index.ts#L133)

___

### expressRouter

▸ `Static`**expressRouter**(`options?`: RouterOptions): *Router*

#### Parameters:

Name | Type |
:------ | :------ |
`options?` | RouterOptions |

**Returns:** *Router*

Inherited from: [ServiceProvider](server_services.serviceprovider.md)

Defined in: [server/services/index.ts:109](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/index.ts#L109)

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

Defined in: [server/services/index.ts:259](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/index.ts#L259)

___

### getTriggerRegistry

▸ `Static`**getTriggerRegistry**(): [*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md) \| *Promise*<[*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md)\>

Allows to setup trigger registries via the service
so that they trigger just as normal trigger will do

This gets attached if a class is used rather than per instance

**`override`** 

**Returns:** [*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md) \| *Promise*<[*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md)\>

Inherited from: [ServiceProvider](server_services.serviceprovider.md)

Defined in: [server/services/index.ts:281](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/index.ts#L281)

___

### getType

▸ `Static`**getType**(): [*ServiceProviderType*](../enums/server_services.serviceprovidertype.md)

**Returns:** [*ServiceProviderType*](../enums/server_services.serviceprovidertype.md)

Overrides: [ServiceProvider](server_services.serviceprovider.md)

Defined in: [server/services/registry.ts:25](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/registry.ts#L25)

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

Defined in: [server/services/index.ts:97](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/index.ts#L97)

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

Defined in: [server/services/index.ts:101](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/index.ts#L101)

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

Defined in: [server/services/index.ts:93](https://github.com/onzag/itemize/blob/3efa2a4a/server/services/index.ts#L93)
