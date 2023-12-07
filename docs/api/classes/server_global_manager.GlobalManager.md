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

[server/global-manager.ts:82](https://github.com/onzag/itemize/blob/a24376ed/server/global-manager.ts#L82)

## Properties

### blocksReleaseLastExecuted

• `Private` **blocksReleaseLastExecuted**: `number`

#### Defined in

[server/global-manager.ts:70](https://github.com/onzag/itemize/blob/a24376ed/server/global-manager.ts#L70)

___

### buildnumber

• **buildnumber**: `string`

#### Defined in

[server/global-manager.ts:58](https://github.com/onzag/itemize/blob/a24376ed/server/global-manager.ts#L58)

___

### config

• **config**: [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md)

#### Defined in

[server/global-manager.ts:74](https://github.com/onzag/itemize/blob/a24376ed/server/global-manager.ts#L74)

___

### currencyFactorsProvider

• `Private` **currencyFactorsProvider**: [`default`](server_services_base_CurrencyFactorsProvider.default.md)<`any`\>

#### Defined in

[server/global-manager.ts:71](https://github.com/onzag/itemize/blob/a24376ed/server/global-manager.ts#L71)

___

### customServices

• `Private` **customServices**: `Object`

#### Index signature

▪ [name: `string`]: [`ServiceProvider`](server_services.ServiceProvider.md)<`any`\>

#### Defined in

[server/global-manager.ts:75](https://github.com/onzag/itemize/blob/a24376ed/server/global-manager.ts#L75)

___

### databaseConnection

• `Private` **databaseConnection**: [`DatabaseConnection`](database.DatabaseConnection.md)

#### Defined in

[server/global-manager.ts:59](https://github.com/onzag/itemize/blob/a24376ed/server/global-manager.ts#L59)

___

### elastic

• **elastic**: [`ItemizeElasticClient`](server_elastic.ItemizeElasticClient.md)

#### Defined in

[server/global-manager.ts:61](https://github.com/onzag/itemize/blob/a24376ed/server/global-manager.ts#L61)

___

### elasticCleanupLastExecuted

• `Private` **elasticCleanupLastExecuted**: `number`

#### Defined in

[server/global-manager.ts:69](https://github.com/onzag/itemize/blob/a24376ed/server/global-manager.ts#L69)

___

### globalCache

• **globalCache**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Defined in

[server/global-manager.ts:62](https://github.com/onzag/itemize/blob/a24376ed/server/global-manager.ts#L62)

___

### idefNeedsMantenience

• `Private` **idefNeedsMantenience**: [`default`](base_Root_Module_ItemDefinition.default.md)[]

#### Defined in

[server/global-manager.ts:65](https://github.com/onzag/itemize/blob/a24376ed/server/global-manager.ts#L65)

___

### initialExecutionServerDataFn

• `Private` **initialExecutionServerDataFn**: [`InitialExecutionServerDataFn`](../modules/server_global_manager.md#initialexecutionserverdatafn)

#### Defined in

[server/global-manager.ts:80](https://github.com/onzag/itemize/blob/a24376ed/server/global-manager.ts#L80)

___

### mailProvider

• **mailProvider**: [`default`](server_services_base_MailProvider.default.md)<`any`\>

#### Defined in

[server/global-manager.ts:73](https://github.com/onzag/itemize/blob/a24376ed/server/global-manager.ts#L73)

___

### modNeedsMantenience

• `Private` **modNeedsMantenience**: [`default`](base_Root_Module.default.md)[]

#### Defined in

[server/global-manager.ts:66](https://github.com/onzag/itemize/blob/a24376ed/server/global-manager.ts#L66)

___

### phoneProvider

• **phoneProvider**: [`default`](server_services_base_PhoneProvider.default.md)<`any`\>

#### Defined in

[server/global-manager.ts:79](https://github.com/onzag/itemize/blob/a24376ed/server/global-manager.ts#L79)

___

### rawDB

• **rawDB**: [`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md)

#### Defined in

[server/global-manager.ts:60](https://github.com/onzag/itemize/blob/a24376ed/server/global-manager.ts#L60)

___

### redisPub

• **redisPub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Defined in

[server/global-manager.ts:63](https://github.com/onzag/itemize/blob/a24376ed/server/global-manager.ts#L63)

___

### redisSub

• **redisSub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Defined in

[server/global-manager.ts:64](https://github.com/onzag/itemize/blob/a24376ed/server/global-manager.ts#L64)

___

### registry

• **registry**: [`RegistryService`](server_services_registry.RegistryService.md)

#### Defined in

[server/global-manager.ts:78](https://github.com/onzag/itemize/blob/a24376ed/server/global-manager.ts#L78)

___

### root

• **root**: [`default`](base_Root.default.md)

#### Defined in

[server/global-manager.ts:57](https://github.com/onzag/itemize/blob/a24376ed/server/global-manager.ts#L57)

___

### sensitiveConfig

• **sensitiveConfig**: [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md)

#### Defined in

[server/global-manager.ts:72](https://github.com/onzag/itemize/blob/a24376ed/server/global-manager.ts#L72)

___

### serverData

• **serverData**: [`IServerDataType`](../interfaces/server.IServerDataType.md)

#### Defined in

[server/global-manager.ts:67](https://github.com/onzag/itemize/blob/a24376ed/server/global-manager.ts#L67)

___

### serverDataLastUpdated

• `Private` **serverDataLastUpdated**: `number`

#### Defined in

[server/global-manager.ts:68](https://github.com/onzag/itemize/blob/a24376ed/server/global-manager.ts#L68)

## Methods

### addAdminUserIfMissing

▸ `Private` **addAdminUserIfMissing**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[server/global-manager.ts:214](https://github.com/onzag/itemize/blob/a24376ed/server/global-manager.ts#L214)

___

### calculateServerData

▸ `Private` **calculateServerData**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[server/global-manager.ts:1209](https://github.com/onzag/itemize/blob/a24376ed/server/global-manager.ts#L1209)

___

### executeInitialServerDataFunction

▸ **executeInitialServerDataFunction**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[server/global-manager.ts:590](https://github.com/onzag/itemize/blob/a24376ed/server/global-manager.ts#L590)

___

### informNewServerData

▸ `Private` **informNewServerData**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[server/global-manager.ts:1236](https://github.com/onzag/itemize/blob/a24376ed/server/global-manager.ts#L1236)

___

### initializeServices

▸ **initializeServices**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[server/global-manager.ts:195](https://github.com/onzag/itemize/blob/a24376ed/server/global-manager.ts#L195)

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

[server/global-manager.ts:174](https://github.com/onzag/itemize/blob/a24376ed/server/global-manager.ts#L174)

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

[server/global-manager.ts:516](https://github.com/onzag/itemize/blob/a24376ed/server/global-manager.ts#L516)

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

[server/global-manager.ts:477](https://github.com/onzag/itemize/blob/a24376ed/server/global-manager.ts#L477)

___

### releaseBlocks

▸ **releaseBlocks**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[server/global-manager.ts:604](https://github.com/onzag/itemize/blob/a24376ed/server/global-manager.ts#L604)

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

[server/global-manager.ts:567](https://github.com/onzag/itemize/blob/a24376ed/server/global-manager.ts#L567)

___

### run

▸ **run**(): `void`

#### Returns

`void`

#### Defined in

[server/global-manager.ts:658](https://github.com/onzag/itemize/blob/a24376ed/server/global-manager.ts#L658)

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

[server/global-manager.ts:1069](https://github.com/onzag/itemize/blob/a24376ed/server/global-manager.ts#L1069)

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

[server/global-manager.ts:1021](https://github.com/onzag/itemize/blob/a24376ed/server/global-manager.ts#L1021)

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

[server/global-manager.ts:998](https://github.com/onzag/itemize/blob/a24376ed/server/global-manager.ts#L998)

___

### runOnce

▸ `Private` **runOnce**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[server/global-manager.ts:990](https://github.com/onzag/itemize/blob/a24376ed/server/global-manager.ts#L990)
