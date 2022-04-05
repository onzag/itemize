[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/global-manager](../modules/server_global_manager.md) / GlobalManager

# Class: GlobalManager

[server/global-manager](../modules/server_global_manager.md).GlobalManager

## Table of contents

### Constructors

- [constructor](server_global_manager.GlobalManager.md#constructor)

### Properties

- [blocksReleaseLastExecuted](server_global_manager.GlobalManager.md#blocksreleaselastexecuted)
- [config](server_global_manager.GlobalManager.md#config)
- [currencyFactorsProvider](server_global_manager.GlobalManager.md#currencyfactorsprovider)
- [customServices](server_global_manager.GlobalManager.md#customservices)
- [databaseConnection](server_global_manager.GlobalManager.md#databaseconnection)
- [globalCache](server_global_manager.GlobalManager.md#globalcache)
- [idefNeedsMantenience](server_global_manager.GlobalManager.md#idefneedsmantenience)
- [mailProvider](server_global_manager.GlobalManager.md#mailprovider)
- [modNeedsMantenience](server_global_manager.GlobalManager.md#modneedsmantenience)
- [phoneProvider](server_global_manager.GlobalManager.md#phoneprovider)
- [rawDB](server_global_manager.GlobalManager.md#rawdb)
- [redisPub](server_global_manager.GlobalManager.md#redispub)
- [redisSub](server_global_manager.GlobalManager.md#redissub)
- [registry](server_global_manager.GlobalManager.md#registry)
- [root](server_global_manager.GlobalManager.md#root)
- [sensitiveConfig](server_global_manager.GlobalManager.md#sensitiveconfig)
- [seoGenLastUpdated](server_global_manager.GlobalManager.md#seogenlastupdated)
- [seoGenerator](server_global_manager.GlobalManager.md#seogenerator)
- [serverData](server_global_manager.GlobalManager.md#serverdata)
- [serverDataLastUpdated](server_global_manager.GlobalManager.md#serverdatalastupdated)

### Methods

- [addAdminUserIfMissing](server_global_manager.GlobalManager.md#addadminuserifmissing)
- [calculateServerData](server_global_manager.GlobalManager.md#calculateserverdata)
- [informNewServerData](server_global_manager.GlobalManager.md#informnewserverdata)
- [initializeServices](server_global_manager.GlobalManager.md#initializeservices)
- [installGlobalService](server_global_manager.GlobalManager.md#installglobalservice)
- [processIdef](server_global_manager.GlobalManager.md#processidef)
- [processModule](server_global_manager.GlobalManager.md#processmodule)
- [releaseBlocks](server_global_manager.GlobalManager.md#releaseblocks)
- [releaseBlocksFor](server_global_manager.GlobalManager.md#releaseblocksfor)
- [run](server_global_manager.GlobalManager.md#run)
- [runFor](server_global_manager.GlobalManager.md#runfor)
- [runForIdef](server_global_manager.GlobalManager.md#runforidef)
- [runForModule](server_global_manager.GlobalManager.md#runformodule)
- [runOnce](server_global_manager.GlobalManager.md#runonce)
- [setSEOGenerator](server_global_manager.GlobalManager.md#setseogenerator)

## Constructors

### constructor

• **new GlobalManager**(`root`, `databaseConnection`, `rawDB`, `globalCache`, `redisPub`, `redisSub`, `config`, `sensitiveConfig`, `currencyFactorsProvider`, `mailProvider`, `phoneProvider`, `registry`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`default`](base_Root.default.md) |
| `databaseConnection` | [`DatabaseConnection`](database.DatabaseConnection.md) |
| `rawDB` | [`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md) |
| `globalCache` | [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md) |
| `redisPub` | [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md) |
| `redisSub` | [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md) |
| `config` | [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md) |
| `sensitiveConfig` | [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md) |
| `currencyFactorsProvider` | [`default`](server_services_base_CurrencyFactorsProvider.default.md)<`any`\> |
| `mailProvider` | [`default`](server_services_base_MailProvider.default.md)<`any`\> |
| `phoneProvider` | [`default`](server_services_base_PhoneProvider.default.md)<`any`\> |
| `registry` | [`RegistryService`](server_services_registry.RegistryService.md) |

#### Defined in

[server/global-manager.ts:72](https://github.com/onzag/itemize/blob/5c2808d3/server/global-manager.ts#L72)

## Properties

### blocksReleaseLastExecuted

• `Private` **blocksReleaseLastExecuted**: `number`

#### Defined in

[server/global-manager.ts:60](https://github.com/onzag/itemize/blob/5c2808d3/server/global-manager.ts#L60)

___

### config

• `Private` **config**: [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md)

#### Defined in

[server/global-manager.ts:64](https://github.com/onzag/itemize/blob/5c2808d3/server/global-manager.ts#L64)

___

### currencyFactorsProvider

• `Private` **currencyFactorsProvider**: [`default`](server_services_base_CurrencyFactorsProvider.default.md)<`any`\>

#### Defined in

[server/global-manager.ts:61](https://github.com/onzag/itemize/blob/5c2808d3/server/global-manager.ts#L61)

___

### customServices

• `Private` **customServices**: `Object`

#### Index signature

▪ [name: `string`]: [`ServiceProvider`](server_services.ServiceProvider.md)<`any`\>

#### Defined in

[server/global-manager.ts:66](https://github.com/onzag/itemize/blob/5c2808d3/server/global-manager.ts#L66)

___

### databaseConnection

• `Private` **databaseConnection**: [`DatabaseConnection`](database.DatabaseConnection.md)

#### Defined in

[server/global-manager.ts:50](https://github.com/onzag/itemize/blob/5c2808d3/server/global-manager.ts#L50)

___

### globalCache

• `Private` **globalCache**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Defined in

[server/global-manager.ts:52](https://github.com/onzag/itemize/blob/5c2808d3/server/global-manager.ts#L52)

___

### idefNeedsMantenience

• `Private` **idefNeedsMantenience**: [`default`](base_Root_Module_ItemDefinition.default.md)[]

#### Defined in

[server/global-manager.ts:55](https://github.com/onzag/itemize/blob/5c2808d3/server/global-manager.ts#L55)

___

### mailProvider

• `Private` **mailProvider**: [`default`](server_services_base_MailProvider.default.md)<`any`\>

#### Defined in

[server/global-manager.ts:63](https://github.com/onzag/itemize/blob/5c2808d3/server/global-manager.ts#L63)

___

### modNeedsMantenience

• `Private` **modNeedsMantenience**: [`default`](base_Root_Module.default.md)[]

#### Defined in

[server/global-manager.ts:56](https://github.com/onzag/itemize/blob/5c2808d3/server/global-manager.ts#L56)

___

### phoneProvider

• `Private` **phoneProvider**: [`default`](server_services_base_PhoneProvider.default.md)<`any`\>

#### Defined in

[server/global-manager.ts:70](https://github.com/onzag/itemize/blob/5c2808d3/server/global-manager.ts#L70)

___

### rawDB

• `Private` **rawDB**: [`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md)

#### Defined in

[server/global-manager.ts:51](https://github.com/onzag/itemize/blob/5c2808d3/server/global-manager.ts#L51)

___

### redisPub

• `Private` **redisPub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Defined in

[server/global-manager.ts:53](https://github.com/onzag/itemize/blob/5c2808d3/server/global-manager.ts#L53)

___

### redisSub

• `Private` **redisSub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Defined in

[server/global-manager.ts:54](https://github.com/onzag/itemize/blob/5c2808d3/server/global-manager.ts#L54)

___

### registry

• `Private` **registry**: [`RegistryService`](server_services_registry.RegistryService.md)

#### Defined in

[server/global-manager.ts:69](https://github.com/onzag/itemize/blob/5c2808d3/server/global-manager.ts#L69)

___

### root

• `Private` **root**: [`default`](base_Root.default.md)

#### Defined in

[server/global-manager.ts:49](https://github.com/onzag/itemize/blob/5c2808d3/server/global-manager.ts#L49)

___

### sensitiveConfig

• `Private` **sensitiveConfig**: [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md)

#### Defined in

[server/global-manager.ts:62](https://github.com/onzag/itemize/blob/5c2808d3/server/global-manager.ts#L62)

___

### seoGenLastUpdated

• `Private` **seoGenLastUpdated**: `number`

#### Defined in

[server/global-manager.ts:59](https://github.com/onzag/itemize/blob/5c2808d3/server/global-manager.ts#L59)

___

### seoGenerator

• `Private` **seoGenerator**: [`SEOGenerator`](server_seo_generator.SEOGenerator.md)

#### Defined in

[server/global-manager.ts:65](https://github.com/onzag/itemize/blob/5c2808d3/server/global-manager.ts#L65)

___

### serverData

• `Private` **serverData**: [`IServerDataType`](../interfaces/server.IServerDataType.md)

#### Defined in

[server/global-manager.ts:57](https://github.com/onzag/itemize/blob/5c2808d3/server/global-manager.ts#L57)

___

### serverDataLastUpdated

• `Private` **serverDataLastUpdated**: `number`

#### Defined in

[server/global-manager.ts:58](https://github.com/onzag/itemize/blob/5c2808d3/server/global-manager.ts#L58)

## Methods

### addAdminUserIfMissing

▸ `Private` **addAdminUserIfMissing**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[server/global-manager.ts:182](https://github.com/onzag/itemize/blob/5c2808d3/server/global-manager.ts#L182)

___

### calculateServerData

▸ `Private` **calculateServerData**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[server/global-manager.ts:795](https://github.com/onzag/itemize/blob/5c2808d3/server/global-manager.ts#L795)

___

### informNewServerData

▸ `Private` **informNewServerData**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[server/global-manager.ts:815](https://github.com/onzag/itemize/blob/5c2808d3/server/global-manager.ts#L815)

___

### initializeServices

▸ **initializeServices**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[server/global-manager.ts:165](https://github.com/onzag/itemize/blob/5c2808d3/server/global-manager.ts#L165)

___

### installGlobalService

▸ **installGlobalService**(`service`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `service` | [`ServiceProvider`](server_services.ServiceProvider.md)<`any`\> |

#### Returns

`void`

#### Defined in

[server/global-manager.ts:152](https://github.com/onzag/itemize/blob/5c2808d3/server/global-manager.ts#L152)

___

### processIdef

▸ `Private` **processIdef**(`idef`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `idef` | [`default`](base_Root_Module_ItemDefinition.default.md) |

#### Returns

`void`

#### Defined in

[server/global-manager.ts:368](https://github.com/onzag/itemize/blob/5c2808d3/server/global-manager.ts#L368)

___

### processModule

▸ `Private` **processModule**(`mod`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `mod` | [`default`](base_Root_Module.default.md) |

#### Returns

`void`

#### Defined in

[server/global-manager.ts:337](https://github.com/onzag/itemize/blob/5c2808d3/server/global-manager.ts#L337)

___

### releaseBlocks

▸ **releaseBlocks**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[server/global-manager.ts:433](https://github.com/onzag/itemize/blob/5c2808d3/server/global-manager.ts#L433)

___

### releaseBlocksFor

▸ **releaseBlocksFor**(`m`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `m` | [`default`](base_Root_Module.default.md) \| [`default`](base_Root.default.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/global-manager.ts:411](https://github.com/onzag/itemize/blob/5c2808d3/server/global-manager.ts#L411)

___

### run

▸ **run**(): `void`

#### Returns

`void`

#### Defined in

[server/global-manager.ts:473](https://github.com/onzag/itemize/blob/5c2808d3/server/global-manager.ts#L473)

___

### runFor

▸ `Private` **runFor**(`tableName`, `isModule`, `properties`, `since`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tableName` | `string` |
| `isModule` | `boolean` |
| `properties` | `IMantainProp`[] |
| `since` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/global-manager.ts:656](https://github.com/onzag/itemize/blob/5c2808d3/server/global-manager.ts#L656)

___

### runForIdef

▸ `Private` **runForIdef**(`idef`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `idef` | [`default`](base_Root_Module_ItemDefinition.default.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/global-manager.ts:608](https://github.com/onzag/itemize/blob/5c2808d3/server/global-manager.ts#L608)

___

### runForModule

▸ `Private` **runForModule**(`mod`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mod` | [`default`](base_Root_Module.default.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/global-manager.ts:585](https://github.com/onzag/itemize/blob/5c2808d3/server/global-manager.ts#L585)

___

### runOnce

▸ `Private` **runOnce**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[server/global-manager.ts:577](https://github.com/onzag/itemize/blob/5c2808d3/server/global-manager.ts#L577)

___

### setSEOGenerator

▸ **setSEOGenerator**(`seoGenerator`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `seoGenerator` | [`SEOGenerator`](server_seo_generator.SEOGenerator.md) |

#### Returns

`void`

#### Defined in

[server/global-manager.ts:149](https://github.com/onzag/itemize/blob/5c2808d3/server/global-manager.ts#L149)
