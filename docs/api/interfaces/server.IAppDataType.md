[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server](../modules/server.md) / IAppDataType

# Interface: IAppDataType

[server](../modules/server.md).IAppDataType

## Table of contents

### Properties

- [buildnumber](server.IAppDataType.md#buildnumber)
- [cache](server.IAppDataType.md#cache)
- [config](server.IAppDataType.md#config)
- [customRoles](server.IAppDataType.md#customroles)
- [customServices](server.IAppDataType.md#customservices)
- [customUserTokenQuery](server.IAppDataType.md#customusertokenquery)
- [databaseConnection](server.IAppDataType.md#databaseconnection)
- [express](server.IAppDataType.md#express)
- [indexDevelopment](server.IAppDataType.md#indexdevelopment)
- [indexProduction](server.IAppDataType.md#indexproduction)
- [langLocales](server.IAppDataType.md#langlocales)
- [listener](server.IAppDataType.md#listener)
- [locationSearchService](server.IAppDataType.md#locationsearchservice)
- [logger](server.IAppDataType.md#logger)
- [mailService](server.IAppDataType.md#mailservice)
- [paymentService](server.IAppDataType.md#paymentservice)
- [phoneService](server.IAppDataType.md#phoneservice)
- [rawDB](server.IAppDataType.md#rawdb)
- [redis](server.IAppDataType.md#redis)
- [redisGlobal](server.IAppDataType.md#redisglobal)
- [redisLocalPub](server.IAppDataType.md#redislocalpub)
- [redisLocalSub](server.IAppDataType.md#redislocalsub)
- [redisPub](server.IAppDataType.md#redispub)
- [redisSub](server.IAppDataType.md#redissub)
- [registry](server.IAppDataType.md#registry)
- [root](server.IAppDataType.md#root)
- [rootPool](server.IAppDataType.md#rootpool)
- [sensitiveConfig](server.IAppDataType.md#sensitiveconfig)
- [seoConfig](server.IAppDataType.md#seoconfig)
- [ssrConfig](server.IAppDataType.md#ssrconfig)
- [storage](server.IAppDataType.md#storage)
- [triggers](server.IAppDataType.md#triggers)
- [userLocalizationService](server.IAppDataType.md#userlocalizationservice)

## Properties

### buildnumber

• **buildnumber**: `string`

#### Defined in

[server/index.ts:143](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L143)

___

### cache

• **cache**: [`Cache`](../classes/server_cache.Cache.md)

#### Defined in

[server/index.ts:136](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L136)

___

### config

• **config**: [`IConfigRawJSONDataType`](config.IConfigRawJSONDataType.md)

#### Defined in

[server/index.ts:132](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L132)

___

### customRoles

• **customRoles**: [`ICustomRoleType`](server_resolvers_roles.ICustomRoleType.md)[]

#### Defined in

[server/index.ts:158](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L158)

___

### customServices

• **customServices**: `Object`

#### Index signature

▪ [name: `string`]: [`ServiceProvider`](../classes/server_services.ServiceProvider.md)<`any`\>

#### Defined in

[server/index.ts:154](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L154)

___

### customUserTokenQuery

• **customUserTokenQuery**: `any`

#### Defined in

[server/index.ts:146](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L146)

___

### databaseConnection

• **databaseConnection**: `DatabaseConnection`

#### Defined in

[server/index.ts:134](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L134)

___

### express

• **express**: typeof `e`

#### Defined in

[server/index.ts:157](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L157)

___

### indexDevelopment

• **indexDevelopment**: `string`

#### Defined in

[server/index.ts:130](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L130)

___

### indexProduction

• **indexProduction**: `string`

#### Defined in

[server/index.ts:131](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L131)

___

### langLocales

• **langLocales**: [`ILangLocalesType`](base_Root.ILangLocalesType.md)

#### Defined in

[server/index.ts:127](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L127)

___

### listener

• **listener**: [`Listener`](../classes/server_listener.Listener.md)

#### Defined in

[server/index.ts:135](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L135)

___

### locationSearchService

• **locationSearchService**: [`default`](../classes/server_services_base_LocationSearchProvider.default.md)<`any`\>

#### Defined in

[server/index.ts:152](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L152)

___

### logger

• **logger**: `Logger`

#### Defined in

[server/index.ts:147](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L147)

___

### mailService

• **mailService**: [`default`](../classes/server_services_base_MailProvider.default.md)<`any`\>

#### Defined in

[server/index.ts:148](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L148)

___

### paymentService

• **paymentService**: [`default`](../classes/server_services_base_PaymentProvider.default.md)<`any`\>

#### Defined in

[server/index.ts:150](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L150)

___

### phoneService

• **phoneService**: [`default`](../classes/server_services_base_PhoneProvider.default.md)<`any`\>

#### Defined in

[server/index.ts:149](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L149)

___

### rawDB

• **rawDB**: [`ItemizeRawDB`](../classes/server_raw_db.ItemizeRawDB.md)

#### Defined in

[server/index.ts:159](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L159)

___

### redis

• **redis**: [`ItemizeRedisClient`](../classes/server_redis.ItemizeRedisClient.md)

#### Defined in

[server/index.ts:137](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L137)

___

### redisGlobal

• **redisGlobal**: [`ItemizeRedisClient`](../classes/server_redis.ItemizeRedisClient.md)

#### Defined in

[server/index.ts:138](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L138)

___

### redisLocalPub

• **redisLocalPub**: [`ItemizeRedisClient`](../classes/server_redis.ItemizeRedisClient.md)

#### Defined in

[server/index.ts:141](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L141)

___

### redisLocalSub

• **redisLocalSub**: [`ItemizeRedisClient`](../classes/server_redis.ItemizeRedisClient.md)

#### Defined in

[server/index.ts:142](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L142)

___

### redisPub

• **redisPub**: [`ItemizeRedisClient`](../classes/server_redis.ItemizeRedisClient.md)

#### Defined in

[server/index.ts:139](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L139)

___

### redisSub

• **redisSub**: [`ItemizeRedisClient`](../classes/server_redis.ItemizeRedisClient.md)

#### Defined in

[server/index.ts:140](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L140)

___

### registry

• **registry**: [`RegistryService`](../classes/server_services_registry.RegistryService.md)

#### Defined in

[server/index.ts:153](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L153)

___

### root

• **root**: [`default`](../classes/base_Root.default.md)

#### Defined in

[server/index.ts:125](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L125)

___

### rootPool

• **rootPool**: `Pool`<[`default`](../classes/base_Root.default.md)\>

#### Defined in

[server/index.ts:126](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L126)

___

### sensitiveConfig

• **sensitiveConfig**: [`ISensitiveConfigRawJSONDataType`](config.ISensitiveConfigRawJSONDataType.md)

#### Defined in

[server/index.ts:133](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L133)

___

### seoConfig

• **seoConfig**: [`ISEOConfig`](server.ISEOConfig.md)

#### Defined in

[server/index.ts:129](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L129)

___

### ssrConfig

• **ssrConfig**: [`ISSRConfig`](server.ISSRConfig.md)

#### Defined in

[server/index.ts:128](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L128)

___

### storage

• **storage**: [`IStorageProvidersObject`](server_services_base_StorageProvider.IStorageProvidersObject.md)

#### Defined in

[server/index.ts:145](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L145)

___

### triggers

• **triggers**: [`ITriggerRegistry`](server_resolvers_triggers.ITriggerRegistry.md)

#### Defined in

[server/index.ts:144](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L144)

___

### userLocalizationService

• **userLocalizationService**: [`default`](../classes/server_services_base_UserLocalizationProvider.default.md)<`any`\>

#### Defined in

[server/index.ts:151](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L151)
