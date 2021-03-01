[](../README.md) / [Exports](../modules.md) / [server/global-manager](../modules/server_global_manager.md) / GlobalManager

# Class: GlobalManager

[server/global-manager](../modules/server_global_manager.md).GlobalManager

## Table of contents

### Constructors

- [constructor](server_global_manager.globalmanager.md#constructor)

### Properties

- [config](server_global_manager.globalmanager.md#config)
- [currencyFactorsProvider](server_global_manager.globalmanager.md#currencyfactorsprovider)
- [customServices](server_global_manager.globalmanager.md#customservices)
- [databaseConnection](server_global_manager.globalmanager.md#databaseconnection)
- [globalCache](server_global_manager.globalmanager.md#globalcache)
- [idefNeedsMantenience](server_global_manager.globalmanager.md#idefneedsmantenience)
- [mailProvider](server_global_manager.globalmanager.md#mailprovider)
- [modNeedsMantenience](server_global_manager.globalmanager.md#modneedsmantenience)
- [redisPub](server_global_manager.globalmanager.md#redispub)
- [registry](server_global_manager.globalmanager.md#registry)
- [root](server_global_manager.globalmanager.md#root)
- [sensitiveConfig](server_global_manager.globalmanager.md#sensitiveconfig)
- [seoGenLastUpdated](server_global_manager.globalmanager.md#seogenlastupdated)
- [seoGenerator](server_global_manager.globalmanager.md#seogenerator)
- [serverData](server_global_manager.globalmanager.md#serverdata)
- [serverDataLastUpdated](server_global_manager.globalmanager.md#serverdatalastupdated)

### Methods

- [addAdminUserIfMissing](server_global_manager.globalmanager.md#addadminuserifmissing)
- [calculateServerData](server_global_manager.globalmanager.md#calculateserverdata)
- [informNewServerData](server_global_manager.globalmanager.md#informnewserverdata)
- [initializeServices](server_global_manager.globalmanager.md#initializeservices)
- [installGlobalService](server_global_manager.globalmanager.md#installglobalservice)
- [processIdef](server_global_manager.globalmanager.md#processidef)
- [processModule](server_global_manager.globalmanager.md#processmodule)
- [run](server_global_manager.globalmanager.md#run)
- [runFor](server_global_manager.globalmanager.md#runfor)
- [runForIdef](server_global_manager.globalmanager.md#runforidef)
- [runForModule](server_global_manager.globalmanager.md#runformodule)
- [runOnce](server_global_manager.globalmanager.md#runonce)
- [setSEOGenerator](server_global_manager.globalmanager.md#setseogenerator)

## Constructors

### constructor

\+ **new GlobalManager**(`root`: [*default*](base_root.default.md), `databaseConnection`: [*DatabaseConnection*](database.databaseconnection.md), `globalCache`: [*ItemizeRedisClient*](server_redis.itemizeredisclient.md), `redisPub`: [*ItemizeRedisClient*](server_redis.itemizeredisclient.md), `config`: [*IConfigRawJSONDataType*](../interfaces/config.iconfigrawjsondatatype.md), `sensitiveConfig`: [*ISensitiveConfigRawJSONDataType*](../interfaces/config.isensitiveconfigrawjsondatatype.md), `currencyFactorsProvider`: [*default*](server_services_base_currencyfactorsprovider.default.md)<any\>, `mailProvider`: [*default*](server_services_base_mailprovider.default.md)<any\>, `registry`: [*RegistryService*](server_services_registry.registryservice.md)): [*GlobalManager*](server_global_manager.globalmanager.md)

#### Parameters:

Name | Type |
:------ | :------ |
`root` | [*default*](base_root.default.md) |
`databaseConnection` | [*DatabaseConnection*](database.databaseconnection.md) |
`globalCache` | [*ItemizeRedisClient*](server_redis.itemizeredisclient.md) |
`redisPub` | [*ItemizeRedisClient*](server_redis.itemizeredisclient.md) |
`config` | [*IConfigRawJSONDataType*](../interfaces/config.iconfigrawjsondatatype.md) |
`sensitiveConfig` | [*ISensitiveConfigRawJSONDataType*](../interfaces/config.isensitiveconfigrawjsondatatype.md) |
`currencyFactorsProvider` | [*default*](server_services_base_currencyfactorsprovider.default.md)<any\> |
`mailProvider` | [*default*](server_services_base_mailprovider.default.md)<any\> |
`registry` | [*RegistryService*](server_services_registry.registryservice.md) |

**Returns:** [*GlobalManager*](server_global_manager.globalmanager.md)

Defined in: [server/global-manager.ts:54](https://github.com/onzag/itemize/blob/5fcde7cf/server/global-manager.ts#L54)

## Properties

### config

• `Private` **config**: [*IConfigRawJSONDataType*](../interfaces/config.iconfigrawjsondatatype.md)

Defined in: [server/global-manager.ts:49](https://github.com/onzag/itemize/blob/5fcde7cf/server/global-manager.ts#L49)

___

### currencyFactorsProvider

• `Private` **currencyFactorsProvider**: [*default*](server_services_base_currencyfactorsprovider.default.md)<any\>

Defined in: [server/global-manager.ts:46](https://github.com/onzag/itemize/blob/5fcde7cf/server/global-manager.ts#L46)

___

### customServices

• `Private` **customServices**: *object*

#### Type declaration:

Defined in: [server/global-manager.ts:51](https://github.com/onzag/itemize/blob/5fcde7cf/server/global-manager.ts#L51)

___

### databaseConnection

• `Private` **databaseConnection**: [*DatabaseConnection*](database.databaseconnection.md)

Defined in: [server/global-manager.ts:38](https://github.com/onzag/itemize/blob/5fcde7cf/server/global-manager.ts#L38)

___

### globalCache

• `Private` **globalCache**: [*ItemizeRedisClient*](server_redis.itemizeredisclient.md)

Defined in: [server/global-manager.ts:39](https://github.com/onzag/itemize/blob/5fcde7cf/server/global-manager.ts#L39)

___

### idefNeedsMantenience

• `Private` **idefNeedsMantenience**: [*default*](base_root_module_itemdefinition.default.md)[]

Defined in: [server/global-manager.ts:41](https://github.com/onzag/itemize/blob/5fcde7cf/server/global-manager.ts#L41)

___

### mailProvider

• `Private` **mailProvider**: [*default*](server_services_base_mailprovider.default.md)<any\>

Defined in: [server/global-manager.ts:48](https://github.com/onzag/itemize/blob/5fcde7cf/server/global-manager.ts#L48)

___

### modNeedsMantenience

• `Private` **modNeedsMantenience**: [*default*](base_root_module.default.md)[]

Defined in: [server/global-manager.ts:42](https://github.com/onzag/itemize/blob/5fcde7cf/server/global-manager.ts#L42)

___

### redisPub

• `Private` **redisPub**: [*ItemizeRedisClient*](server_redis.itemizeredisclient.md)

Defined in: [server/global-manager.ts:40](https://github.com/onzag/itemize/blob/5fcde7cf/server/global-manager.ts#L40)

___

### registry

• `Private` **registry**: [*RegistryService*](server_services_registry.registryservice.md)

Defined in: [server/global-manager.ts:54](https://github.com/onzag/itemize/blob/5fcde7cf/server/global-manager.ts#L54)

___

### root

• `Private` **root**: [*default*](base_root.default.md)

Defined in: [server/global-manager.ts:37](https://github.com/onzag/itemize/blob/5fcde7cf/server/global-manager.ts#L37)

___

### sensitiveConfig

• `Private` **sensitiveConfig**: [*ISensitiveConfigRawJSONDataType*](../interfaces/config.isensitiveconfigrawjsondatatype.md)

Defined in: [server/global-manager.ts:47](https://github.com/onzag/itemize/blob/5fcde7cf/server/global-manager.ts#L47)

___

### seoGenLastUpdated

• `Private` **seoGenLastUpdated**: *number*

Defined in: [server/global-manager.ts:45](https://github.com/onzag/itemize/blob/5fcde7cf/server/global-manager.ts#L45)

___

### seoGenerator

• `Private` **seoGenerator**: [*SEOGenerator*](server_seo_generator.seogenerator.md)

Defined in: [server/global-manager.ts:50](https://github.com/onzag/itemize/blob/5fcde7cf/server/global-manager.ts#L50)

___

### serverData

• `Private` **serverData**: [*IServerDataType*](../interfaces/server.iserverdatatype.md)

Defined in: [server/global-manager.ts:43](https://github.com/onzag/itemize/blob/5fcde7cf/server/global-manager.ts#L43)

___

### serverDataLastUpdated

• `Private` **serverDataLastUpdated**: *number*

Defined in: [server/global-manager.ts:44](https://github.com/onzag/itemize/blob/5fcde7cf/server/global-manager.ts#L44)

## Methods

### addAdminUserIfMissing

▸ `Private`**addAdminUserIfMissing**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [server/global-manager.ts:119](https://github.com/onzag/itemize/blob/5fcde7cf/server/global-manager.ts#L119)

___

### calculateServerData

▸ `Private`**calculateServerData**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [server/global-manager.ts:564](https://github.com/onzag/itemize/blob/5fcde7cf/server/global-manager.ts#L564)

___

### informNewServerData

▸ `Private`**informNewServerData**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [server/global-manager.ts:582](https://github.com/onzag/itemize/blob/5fcde7cf/server/global-manager.ts#L582)

___

### initializeServices

▸ **initializeServices**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [server/global-manager.ts:105](https://github.com/onzag/itemize/blob/5fcde7cf/server/global-manager.ts#L105)

___

### installGlobalService

▸ **installGlobalService**(`service`: [*ServiceProvider*](server_services.serviceprovider.md)<any\>): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`service` | [*ServiceProvider*](server_services.serviceprovider.md)<any\> |

**Returns:** *void*

Defined in: [server/global-manager.ts:101](https://github.com/onzag/itemize/blob/5fcde7cf/server/global-manager.ts#L101)

___

### processIdef

▸ `Private`**processIdef**(`idef`: [*default*](base_root_module_itemdefinition.default.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`idef` | [*default*](base_root_module_itemdefinition.default.md) |

**Returns:** *void*

Defined in: [server/global-manager.ts:285](https://github.com/onzag/itemize/blob/5fcde7cf/server/global-manager.ts#L285)

___

### processModule

▸ `Private`**processModule**(`mod`: [*default*](base_root_module.default.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`mod` | [*default*](base_root_module.default.md) |

**Returns:** *void*

Defined in: [server/global-manager.ts:264](https://github.com/onzag/itemize/blob/5fcde7cf/server/global-manager.ts#L264)

___

### run

▸ **run**(): *void*

**Returns:** *void*

Defined in: [server/global-manager.ts:311](https://github.com/onzag/itemize/blob/5fcde7cf/server/global-manager.ts#L311)

___

### runFor

▸ `Private`**runFor**(`tableName`: *string*, `isModule`: *boolean*, `properties`: IMantainProp[], `since`: *number*): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`tableName` | *string* |
`isModule` | *boolean* |
`properties` | IMantainProp[] |
`since` | *number* |

**Returns:** *Promise*<void\>

Defined in: [server/global-manager.ts:443](https://github.com/onzag/itemize/blob/5fcde7cf/server/global-manager.ts#L443)

___

### runForIdef

▸ `Private`**runForIdef**(`idef`: [*default*](base_root_module_itemdefinition.default.md)): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`idef` | [*default*](base_root_module_itemdefinition.default.md) |

**Returns:** *Promise*<void\>

Defined in: [server/global-manager.ts:419](https://github.com/onzag/itemize/blob/5fcde7cf/server/global-manager.ts#L419)

___

### runForModule

▸ `Private`**runForModule**(`mod`: [*default*](base_root_module.default.md)): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`mod` | [*default*](base_root_module.default.md) |

**Returns:** *Promise*<void\>

Defined in: [server/global-manager.ts:408](https://github.com/onzag/itemize/blob/5fcde7cf/server/global-manager.ts#L408)

___

### runOnce

▸ `Private`**runOnce**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [server/global-manager.ts:400](https://github.com/onzag/itemize/blob/5fcde7cf/server/global-manager.ts#L400)

___

### setSEOGenerator

▸ **setSEOGenerator**(`seoGenerator`: [*SEOGenerator*](server_seo_generator.seogenerator.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`seoGenerator` | [*SEOGenerator*](server_seo_generator.seogenerator.md) |

**Returns:** *void*

Defined in: [server/global-manager.ts:98](https://github.com/onzag/itemize/blob/5fcde7cf/server/global-manager.ts#L98)
