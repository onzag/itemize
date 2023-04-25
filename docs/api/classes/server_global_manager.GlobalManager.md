[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/global-manager](../modules/server_global_manager.md) / GlobalManager

# Class: GlobalManager

[server/global-manager](../modules/server_global_manager.md).GlobalManager

## Table of contents

### Constructors

- [constructor](server_global_manager.GlobalManager.md#constructor)

### Properties

- [blocksReleaseLastExecuted](server_global_manager.GlobalManager.md#blocksreleaselastexecuted)
- [buildnumber](server_global_manager.GlobalManager.md#buildnumber)
- [config](server_global_manager.GlobalManager.md#config)
- [currencyFactorsProvider](server_global_manager.GlobalManager.md#currencyfactorsprovider)
- [customServices](server_global_manager.GlobalManager.md#customservices)
- [databaseConnection](server_global_manager.GlobalManager.md#databaseconnection)
- [elastic](server_global_manager.GlobalManager.md#elastic)
- [elasticCleanupLastExecuted](server_global_manager.GlobalManager.md#elasticcleanuplastexecuted)
- [globalCache](server_global_manager.GlobalManager.md#globalcache)
- [idefNeedsMantenience](server_global_manager.GlobalManager.md#idefneedsmantenience)
- [initialExecutionServerDataFn](server_global_manager.GlobalManager.md#initialexecutionserverdatafn)
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
- [executeInitialServerDataFunction](server_global_manager.GlobalManager.md#executeinitialserverdatafunction)
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

• **new GlobalManager**(`buildnumber`, `root`, `databaseConnection`, `rawDB`, `elastic`, `globalCache`, `redisPub`, `redisSub`, `config`, `sensitiveConfig`, `currencyFactorsProvider`, `mailProvider`, `phoneProvider`, `registry`, `initialExecutionServerDataFn`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `buildnumber` | `string` |
| `root` | [`default`](base_Root.default.md) |
| `databaseConnection` | [`DatabaseConnection`](database.DatabaseConnection.md) |
| `rawDB` | [`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md) |
| `elastic` | [`ItemizeElasticClient`](server_elastic.ItemizeElasticClient.md) |
| `globalCache` | [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md) |
| `redisPub` | [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md) |
| `redisSub` | [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md) |
| `config` | [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md) |
| `sensitiveConfig` | [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md) |
| `currencyFactorsProvider` | [`default`](server_services_base_CurrencyFactorsProvider.default.md)<`any`\> |
| `mailProvider` | [`default`](server_services_base_MailProvider.default.md)<`any`\> |
| `phoneProvider` | [`default`](server_services_base_PhoneProvider.default.md)<`any`\> |
| `registry` | [`RegistryService`](server_services_registry.RegistryService.md) |
| `initialExecutionServerDataFn` | [`InitialExecutionServerDataFn`](../modules/server_global_manager.md#initialexecutionserverdatafn) |

#### Defined in

[server/global-manager.ts:86](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L86)

## Properties

### blocksReleaseLastExecuted

• `Private` **blocksReleaseLastExecuted**: `number`

#### Defined in

[server/global-manager.ts:73](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L73)

___

### buildnumber

• **buildnumber**: `string`

#### Defined in

[server/global-manager.ts:60](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L60)

___

### config

• **config**: [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md)

#### Defined in

[server/global-manager.ts:77](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L77)

___

### currencyFactorsProvider

• `Private` **currencyFactorsProvider**: [`default`](server_services_base_CurrencyFactorsProvider.default.md)<`any`\>

#### Defined in

[server/global-manager.ts:74](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L74)

___

### customServices

• `Private` **customServices**: `Object`

#### Index signature

▪ [name: `string`]: [`ServiceProvider`](server_services.ServiceProvider.md)<`any`\>

#### Defined in

[server/global-manager.ts:79](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L79)

___

### databaseConnection

• `Private` **databaseConnection**: [`DatabaseConnection`](database.DatabaseConnection.md)

#### Defined in

[server/global-manager.ts:61](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L61)

___

### elastic

• **elastic**: [`ItemizeElasticClient`](server_elastic.ItemizeElasticClient.md)

#### Defined in

[server/global-manager.ts:63](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L63)

___

### elasticCleanupLastExecuted

• `Private` **elasticCleanupLastExecuted**: `number`

#### Defined in

[server/global-manager.ts:72](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L72)

___

### globalCache

• **globalCache**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Defined in

[server/global-manager.ts:64](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L64)

___

### idefNeedsMantenience

• `Private` **idefNeedsMantenience**: [`default`](base_Root_Module_ItemDefinition.default.md)[]

#### Defined in

[server/global-manager.ts:67](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L67)

___

### initialExecutionServerDataFn

• `Private` **initialExecutionServerDataFn**: [`InitialExecutionServerDataFn`](../modules/server_global_manager.md#initialexecutionserverdatafn)

#### Defined in

[server/global-manager.ts:84](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L84)

___

### mailProvider

• **mailProvider**: [`default`](server_services_base_MailProvider.default.md)<`any`\>

#### Defined in

[server/global-manager.ts:76](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L76)

___

### modNeedsMantenience

• `Private` **modNeedsMantenience**: [`default`](base_Root_Module.default.md)[]

#### Defined in

[server/global-manager.ts:68](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L68)

___

### phoneProvider

• **phoneProvider**: [`default`](server_services_base_PhoneProvider.default.md)<`any`\>

#### Defined in

[server/global-manager.ts:83](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L83)

___

### rawDB

• **rawDB**: [`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md)

#### Defined in

[server/global-manager.ts:62](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L62)

___

### redisPub

• **redisPub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Defined in

[server/global-manager.ts:65](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L65)

___

### redisSub

• **redisSub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Defined in

[server/global-manager.ts:66](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L66)

___

### registry

• **registry**: [`RegistryService`](server_services_registry.RegistryService.md)

#### Defined in

[server/global-manager.ts:82](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L82)

___

### root

• **root**: [`default`](base_Root.default.md)

#### Defined in

[server/global-manager.ts:59](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L59)

___

### sensitiveConfig

• **sensitiveConfig**: [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md)

#### Defined in

[server/global-manager.ts:75](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L75)

___

### seoGenLastUpdated

• `Private` **seoGenLastUpdated**: `number`

#### Defined in

[server/global-manager.ts:71](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L71)

___

### seoGenerator

• `Private` **seoGenerator**: [`SEOGenerator`](server_seo_generator.SEOGenerator.md)

#### Defined in

[server/global-manager.ts:78](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L78)

___

### serverData

• **serverData**: [`IServerDataType`](../interfaces/server.IServerDataType.md)

#### Defined in

[server/global-manager.ts:69](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L69)

___

### serverDataLastUpdated

• `Private` **serverDataLastUpdated**: `number`

#### Defined in

[server/global-manager.ts:70](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L70)

## Methods

### addAdminUserIfMissing

▸ `Private` **addAdminUserIfMissing**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[server/global-manager.ts:221](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L221)

___

### calculateServerData

▸ `Private` **calculateServerData**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[server/global-manager.ts:1221](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L1221)

___

### executeInitialServerDataFunction

▸ **executeInitialServerDataFunction**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[server/global-manager.ts:543](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L543)

___

### informNewServerData

▸ `Private` **informNewServerData**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[server/global-manager.ts:1248](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L1248)

___

### initializeServices

▸ **initializeServices**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[server/global-manager.ts:202](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L202)

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

[server/global-manager.ts:181](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L181)

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

[server/global-manager.ts:470](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L470)

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

[server/global-manager.ts:431](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L431)

___

### releaseBlocks

▸ **releaseBlocks**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[server/global-manager.ts:557](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L557)

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

[server/global-manager.ts:521](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L521)

___

### run

▸ **run**(): `void`

#### Returns

`void`

#### Defined in

[server/global-manager.ts:611](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L611)

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

[server/global-manager.ts:1081](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L1081)

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

[server/global-manager.ts:1033](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L1033)

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

[server/global-manager.ts:1010](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L1010)

___

### runOnce

▸ `Private` **runOnce**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[server/global-manager.ts:1002](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L1002)

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

[server/global-manager.ts:178](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L178)
