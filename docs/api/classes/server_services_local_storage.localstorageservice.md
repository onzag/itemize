[](../README.md) / [Exports](../modules.md) / [server/services/local-storage](../modules/server_services_local_storage.md) / LocalStorageService

# Class: LocalStorageService

[server/services/local-storage](../modules/server_services_local_storage.md).LocalStorageService

## Hierarchy

* [*default*](server_services_base_storageprovider.default.md)<*null*\>

  ↳ **LocalStorageService**

## Table of contents

### Constructors

- [constructor](server_services_local_storage.localstorageservice.md#constructor)

### Properties

- [appConfig](server_services_local_storage.localstorageservice.md#appconfig)
- [appSensitiveConfig](server_services_local_storage.localstorageservice.md#appsensitiveconfig)
- [config](server_services_local_storage.localstorageservice.md#config)
- [globalCustomServices](server_services_local_storage.localstorageservice.md#globalcustomservices)
- [globalDatabaseConnection](server_services_local_storage.localstorageservice.md#globaldatabaseconnection)
- [globalInstance](server_services_local_storage.localstorageservice.md#globalinstance)
- [globalMailProvider](server_services_local_storage.localstorageservice.md#globalmailprovider)
- [globalRawDB](server_services_local_storage.localstorageservice.md#globalrawdb)
- [globalRedis](server_services_local_storage.localstorageservice.md#globalredis)
- [globalRedisPub](server_services_local_storage.localstorageservice.md#globalredispub)
- [globalRoot](server_services_local_storage.localstorageservice.md#globalroot)
- [id](server_services_local_storage.localstorageservice.md#id)
- [instanceName](server_services_local_storage.localstorageservice.md#instancename)
- [localAppData](server_services_local_storage.localstorageservice.md#localappdata)
- [localInstance](server_services_local_storage.localstorageservice.md#localinstance)
- [prefix](server_services_local_storage.localstorageservice.md#prefix)
- [registry](server_services_local_storage.localstorageservice.md#registry)

### Methods

- [dumpFolder](server_services_local_storage.localstorageservice.md#dumpfolder)
- [execute](server_services_local_storage.localstorageservice.md#execute)
- [exists](server_services_local_storage.localstorageservice.md#exists)
- [expressRouter](server_services_local_storage.localstorageservice.md#expressrouter)
- [getId](server_services_local_storage.localstorageservice.md#getid)
- [getInstanceName](server_services_local_storage.localstorageservice.md#getinstancename)
- [getPrefix](server_services_local_storage.localstorageservice.md#getprefix)
- [getRouter](server_services_local_storage.localstorageservice.md#getrouter)
- [getRunCycleTime](server_services_local_storage.localstorageservice.md#getruncycletime)
- [getTriggerRegistry](server_services_local_storage.localstorageservice.md#gettriggerregistry)
- [initialize](server_services_local_storage.localstorageservice.md#initialize)
- [isInstanceGlobal](server_services_local_storage.localstorageservice.md#isinstanceglobal)
- [isInstanceLocal](server_services_local_storage.localstorageservice.md#isinstancelocal)
- [logDebug](server_services_local_storage.localstorageservice.md#logdebug)
- [logError](server_services_local_storage.localstorageservice.md#logerror)
- [logInfo](server_services_local_storage.localstorageservice.md#loginfo)
- [read](server_services_local_storage.localstorageservice.md#read)
- [removeFolder](server_services_local_storage.localstorageservice.md#removefolder)
- [run](server_services_local_storage.localstorageservice.md#run)
- [setId](server_services_local_storage.localstorageservice.md#setid)
- [setInstanceName](server_services_local_storage.localstorageservice.md#setinstancename)
- [setPrefix](server_services_local_storage.localstorageservice.md#setprefix)
- [setupGlobalResources](server_services_local_storage.localstorageservice.md#setupglobalresources)
- [setupLocalResources](server_services_local_storage.localstorageservice.md#setuplocalresources)
- [upload](server_services_local_storage.localstorageservice.md#upload)
- [expressRouter](server_services_local_storage.localstorageservice.md#expressrouter)
- [getRouter](server_services_local_storage.localstorageservice.md#getrouter)
- [getTriggerRegistry](server_services_local_storage.localstorageservice.md#gettriggerregistry)
- [getType](server_services_local_storage.localstorageservice.md#gettype)
- [logDebug](server_services_local_storage.localstorageservice.md#logdebug)
- [logError](server_services_local_storage.localstorageservice.md#logerror)
- [logInfo](server_services_local_storage.localstorageservice.md#loginfo)

## Constructors

### constructor

\+ **new LocalStorageService**(`config`: *null*, `registry`: [*RegistryService*](server_services_registry.registryservice.md), `appConfig`: [*IConfigRawJSONDataType*](../interfaces/config.iconfigrawjsondatatype.md), `appSensitiveConfig`: [*ISensitiveConfigRawJSONDataType*](../interfaces/config.isensitiveconfigrawjsondatatype.md)): [*LocalStorageService*](server_services_local_storage.localstorageservice.md)

#### Parameters:

Name | Type |
:------ | :------ |
`config` | *null* |
`registry` | [*RegistryService*](server_services_registry.registryservice.md) |
`appConfig` | [*IConfigRawJSONDataType*](../interfaces/config.iconfigrawjsondatatype.md) |
`appSensitiveConfig` | [*ISensitiveConfigRawJSONDataType*](../interfaces/config.isensitiveconfigrawjsondatatype.md) |

**Returns:** [*LocalStorageService*](server_services_local_storage.localstorageservice.md)

Inherited from: [default](server_services_base_storageprovider.default.md)

Defined in: [server/services/index.ts:51](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L51)

## Properties

### appConfig

• **appConfig**: [*IConfigRawJSONDataType*](../interfaces/config.iconfigrawjsondatatype.md)

Inherited from: [default](server_services_base_storageprovider.default.md).[appConfig](server_services_base_storageprovider.default.md#appconfig)

Defined in: [server/services/index.ts:34](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L34)

___

### appSensitiveConfig

• **appSensitiveConfig**: [*ISensitiveConfigRawJSONDataType*](../interfaces/config.isensitiveconfigrawjsondatatype.md)

Inherited from: [default](server_services_base_storageprovider.default.md).[appSensitiveConfig](server_services_base_storageprovider.default.md#appsensitiveconfig)

Defined in: [server/services/index.ts:35](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L35)

___

### config

• **config**: *null*

Inherited from: [default](server_services_base_storageprovider.default.md).[config](server_services_base_storageprovider.default.md#config)

Defined in: [server/services/index.ts:32](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L32)

___

### globalCustomServices

• **globalCustomServices**: *object*

#### Type declaration:

Inherited from: [default](server_services_base_storageprovider.default.md).[globalCustomServices](server_services_base_storageprovider.default.md#globalcustomservices)

Defined in: [server/services/index.ts:43](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L43)

___

### globalDatabaseConnection

• **globalDatabaseConnection**: [*DatabaseConnection*](database.databaseconnection.md)

Inherited from: [default](server_services_base_storageprovider.default.md).[globalDatabaseConnection](server_services_base_storageprovider.default.md#globaldatabaseconnection)

Defined in: [server/services/index.ts:37](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L37)

___

### globalInstance

• **globalInstance**: *boolean*

Inherited from: [default](server_services_base_storageprovider.default.md).[globalInstance](server_services_base_storageprovider.default.md#globalinstance)

Defined in: [server/services/index.ts:50](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L50)

___

### globalMailProvider

• **globalMailProvider**: [*default*](server_services_base_mailprovider.default.md)<any\>

Inherited from: [default](server_services_base_storageprovider.default.md).[globalMailProvider](server_services_base_storageprovider.default.md#globalmailprovider)

Defined in: [server/services/index.ts:42](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L42)

___

### globalRawDB

• **globalRawDB**: [*ItemizeRawDB*](server_raw_db.itemizerawdb.md)

Inherited from: [default](server_services_base_storageprovider.default.md).[globalRawDB](server_services_base_storageprovider.default.md#globalrawdb)

Defined in: [server/services/index.ts:40](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L40)

___

### globalRedis

• **globalRedis**: [*ItemizeRedisClient*](server_redis.itemizeredisclient.md)

Inherited from: [default](server_services_base_storageprovider.default.md).[globalRedis](server_services_base_storageprovider.default.md#globalredis)

Defined in: [server/services/index.ts:39](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L39)

___

### globalRedisPub

• **globalRedisPub**: [*ItemizeRedisClient*](server_redis.itemizeredisclient.md)

Inherited from: [default](server_services_base_storageprovider.default.md).[globalRedisPub](server_services_base_storageprovider.default.md#globalredispub)

Defined in: [server/services/index.ts:38](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L38)

___

### globalRoot

• **globalRoot**: [*default*](base_root.default.md)

Inherited from: [default](server_services_base_storageprovider.default.md).[globalRoot](server_services_base_storageprovider.default.md#globalroot)

Defined in: [server/services/index.ts:41](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L41)

___

### id

• **id**: *string*

Inherited from: [default](server_services_base_storageprovider.default.md).[id](server_services_base_storageprovider.default.md#id)

Defined in: [server/services/base/StorageProvider.ts:16](https://github.com/onzag/itemize/blob/0e9b128c/server/services/base/StorageProvider.ts#L16)

___

### instanceName

• **instanceName**: *string*

Inherited from: [default](server_services_base_storageprovider.default.md).[instanceName](server_services_base_storageprovider.default.md#instancename)

Defined in: [server/services/index.ts:49](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L49)

___

### localAppData

• **localAppData**: [*IAppDataType*](../interfaces/server.iappdatatype.md)

Inherited from: [default](server_services_base_storageprovider.default.md).[localAppData](server_services_base_storageprovider.default.md#localappdata)

Defined in: [server/services/index.ts:47](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L47)

___

### localInstance

• **localInstance**: *boolean*

Inherited from: [default](server_services_base_storageprovider.default.md).[localInstance](server_services_base_storageprovider.default.md#localinstance)

Defined in: [server/services/index.ts:51](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L51)

___

### prefix

• **prefix**: *string*

Inherited from: [default](server_services_base_storageprovider.default.md).[prefix](server_services_base_storageprovider.default.md#prefix)

Defined in: [server/services/base/StorageProvider.ts:15](https://github.com/onzag/itemize/blob/0e9b128c/server/services/base/StorageProvider.ts#L15)

___

### registry

• **registry**: [*RegistryService*](server_services_registry.registryservice.md)

Inherited from: [default](server_services_base_storageprovider.default.md).[registry](server_services_base_storageprovider.default.md#registry)

Defined in: [server/services/index.ts:33](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L33)

## Methods

### dumpFolder

▸ **dumpFolder**(`remotePath`: *string*, `localPath`: *string*): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`remotePath` | *string* |
`localPath` | *string* |

**Returns:** *Promise*<void\>

Overrides: [default](server_services_base_storageprovider.default.md)

Defined in: [server/services/local-storage.ts:75](https://github.com/onzag/itemize/blob/0e9b128c/server/services/local-storage.ts#L75)

___

### execute

▸ **execute**(): *void*

Performs the execution of the service, basically
it will do the run function and then re-run as specified

**Returns:** *void*

Inherited from: [default](server_services_base_storageprovider.default.md)

Defined in: [server/services/index.ts:155](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L155)

___

### exists

▸ **exists**(`at`: *string*): *Promise*<boolean\>

#### Parameters:

Name | Type |
:------ | :------ |
`at` | *string* |

**Returns:** *Promise*<boolean\>

Overrides: [default](server_services_base_storageprovider.default.md)

Defined in: [server/services/local-storage.ts:79](https://github.com/onzag/itemize/blob/0e9b128c/server/services/local-storage.ts#L79)

___

### expressRouter

▸ **expressRouter**(`options?`: RouterOptions): *Router*

#### Parameters:

Name | Type |
:------ | :------ |
`options?` | RouterOptions |

**Returns:** *Router*

Inherited from: [default](server_services_base_storageprovider.default.md)

Defined in: [server/services/index.ts:105](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L105)

___

### getId

▸ **getId**(): *string*

**Returns:** *string*

Inherited from: [default](server_services_base_storageprovider.default.md)

Defined in: [server/services/base/StorageProvider.ts:30](https://github.com/onzag/itemize/blob/0e9b128c/server/services/base/StorageProvider.ts#L30)

___

### getInstanceName

▸ **getInstanceName**(): *string*

**Returns:** *string*

Inherited from: [default](server_services_base_storageprovider.default.md)

Defined in: [server/services/index.ts:69](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L69)

___

### getPrefix

▸ **getPrefix**(): *string*

**Returns:** *string*

Inherited from: [default](server_services_base_storageprovider.default.md)

Defined in: [server/services/base/StorageProvider.ts:26](https://github.com/onzag/itemize/blob/0e9b128c/server/services/base/StorageProvider.ts#L26)

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

Inherited from: [default](server_services_base_storageprovider.default.md)

Defined in: [server/services/index.ts:242](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L242)

___

### getRunCycleTime

▸ **getRunCycleTime**(): *number*

Determines whether the run function
should run over again

**`override`** 

**Returns:** *number*

Inherited from: [default](server_services_base_storageprovider.default.md)

Defined in: [server/services/index.ts:215](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L215)

___

### getTriggerRegistry

▸ **getTriggerRegistry**(): [*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md) \| *Promise*<[*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md)\>

Allows to setup trigger registries via the service
so that they trigger just as normal trigger will do

**`override`** 

**Returns:** [*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md) \| *Promise*<[*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md)\>

Inherited from: [default](server_services_base_storageprovider.default.md)

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

Inherited from: [default](server_services_base_storageprovider.default.md)

Defined in: [server/services/index.ts:206](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L206)

___

### isInstanceGlobal

▸ **isInstanceGlobal**(): *boolean*

**Returns:** *boolean*

Inherited from: [default](server_services_base_storageprovider.default.md)

Defined in: [server/services/index.ts:73](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L73)

___

### isInstanceLocal

▸ **isInstanceLocal**(): *boolean*

**Returns:** *boolean*

Inherited from: [default](server_services_base_storageprovider.default.md)

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

Inherited from: [default](server_services_base_storageprovider.default.md)

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

Inherited from: [default](server_services_base_storageprovider.default.md)

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

Inherited from: [default](server_services_base_storageprovider.default.md)

Defined in: [server/services/index.ts:81](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L81)

___

### read

▸ **read**(`at`: *string*): *Promise*<string\>

#### Parameters:

Name | Type |
:------ | :------ |
`at` | *string* |

**Returns:** *Promise*<string\>

Overrides: [default](server_services_base_storageprovider.default.md)

Defined in: [server/services/local-storage.ts:94](https://github.com/onzag/itemize/blob/0e9b128c/server/services/local-storage.ts#L94)

___

### removeFolder

▸ **removeFolder**(`at`: *string*): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`at` | *string* |

**Returns:** *Promise*<void\>

Overrides: [default](server_services_base_storageprovider.default.md)

Defined in: [server/services/local-storage.ts:57](https://github.com/onzag/itemize/blob/0e9b128c/server/services/local-storage.ts#L57)

___

### run

▸ **run**(): *void* \| *Promise*<void\>

Executes some code

**`override`** 

**Returns:** *void* \| *Promise*<void\>

Inherited from: [default](server_services_base_storageprovider.default.md)

Defined in: [server/services/index.ts:223](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L223)

___

### setId

▸ **setId**(`id`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`id` | *string* |

**Returns:** *void*

Inherited from: [default](server_services_base_storageprovider.default.md)

Defined in: [server/services/base/StorageProvider.ts:22](https://github.com/onzag/itemize/blob/0e9b128c/server/services/base/StorageProvider.ts#L22)

___

### setInstanceName

▸ **setInstanceName**(`n`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`n` | *string* |

**Returns:** *void*

Inherited from: [default](server_services_base_storageprovider.default.md)

Defined in: [server/services/index.ts:65](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L65)

___

### setPrefix

▸ **setPrefix**(`prefix`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`prefix` | *string* |

**Returns:** *void*

Inherited from: [default](server_services_base_storageprovider.default.md)

Defined in: [server/services/base/StorageProvider.ts:18](https://github.com/onzag/itemize/blob/0e9b128c/server/services/base/StorageProvider.ts#L18)

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

Inherited from: [default](server_services_base_storageprovider.default.md)

Defined in: [server/services/index.ts:113](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L113)

___

### setupLocalResources

▸ **setupLocalResources**(`appData`: [*IAppDataType*](../interfaces/server.iappdatatype.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`appData` | [*IAppDataType*](../interfaces/server.iappdatatype.md) |

**Returns:** *void*

Inherited from: [default](server_services_base_storageprovider.default.md)

Defined in: [server/services/index.ts:133](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L133)

___

### upload

▸ **upload**(`at`: *string*, `readStream`: *ReadStream*): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`at` | *string* |
`readStream` | *ReadStream* |

**Returns:** *Promise*<void\>

Overrides: [default](server_services_base_storageprovider.default.md)

Defined in: [server/services/local-storage.ts:32](https://github.com/onzag/itemize/blob/0e9b128c/server/services/local-storage.ts#L32)

___

### expressRouter

▸ `Static`**expressRouter**(`options?`: RouterOptions): *Router*

#### Parameters:

Name | Type |
:------ | :------ |
`options?` | RouterOptions |

**Returns:** *Router*

Inherited from: [default](server_services_base_storageprovider.default.md)

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

Inherited from: [default](server_services_base_storageprovider.default.md)

Defined in: [server/services/index.ts:259](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L259)

___

### getTriggerRegistry

▸ `Static`**getTriggerRegistry**(): [*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md) \| *Promise*<[*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md)\>

Allows to setup trigger registries via the service
so that they trigger just as normal trigger will do

This gets attached if a class is used rather than per instance

**`override`** 

**Returns:** [*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md) \| *Promise*<[*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md)\>

Inherited from: [default](server_services_base_storageprovider.default.md)

Defined in: [server/services/index.ts:281](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L281)

___

### getType

▸ `Static`**getType**(): [*ServiceProviderType*](../enums/server_services.serviceprovidertype.md)

**Returns:** [*ServiceProviderType*](../enums/server_services.serviceprovidertype.md)

Overrides: [default](server_services_base_storageprovider.default.md)

Defined in: [server/services/local-storage.ts:29](https://github.com/onzag/itemize/blob/0e9b128c/server/services/local-storage.ts#L29)

___

### logDebug

▸ `Static`**logDebug**(`str`: *string*, `extra?`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`str` | *string* |
`extra?` | *any* |

**Returns:** *void*

Inherited from: [default](server_services_base_storageprovider.default.md)

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

Inherited from: [default](server_services_base_storageprovider.default.md)

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

Inherited from: [default](server_services_base_storageprovider.default.md)

Defined in: [server/services/index.ts:93](https://github.com/onzag/itemize/blob/0e9b128c/server/services/index.ts#L93)
