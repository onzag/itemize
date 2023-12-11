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
- [databaseConfig](server.IAppDataType.md#databaseconfig)
- [databaseConnection](server.IAppDataType.md#databaseconnection)
- [domain](server.IAppDataType.md#domain)
- [elastic](server.IAppDataType.md#elastic)
- [express](server.IAppDataType.md#express)
- [indexDevelopment](server.IAppDataType.md#indexdevelopment)
- [indexProduction](server.IAppDataType.md#indexproduction)
- [langLocales](server.IAppDataType.md#langlocales)
- [listener](server.IAppDataType.md#listener)
- [locationSearchService](server.IAppDataType.md#locationsearchservice)
- [logger](server.IAppDataType.md#logger)
- [loggingService](server.IAppDataType.md#loggingservice)
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
- [rqSchema](server.IAppDataType.md#rqschema)
- [sensitiveConfig](server.IAppDataType.md#sensitiveconfig)
- [seoConfig](server.IAppDataType.md#seoconfig)
- [ssrConfig](server.IAppDataType.md#ssrconfig)
- [storage](server.IAppDataType.md#storage)
- [triggers](server.IAppDataType.md#triggers)
- [userLocalizationService](server.IAppDataType.md#userlocalizationservice)
- [userTokenQuery](server.IAppDataType.md#usertokenquery)
- [ussdService](server.IAppDataType.md#ussdservice)

## Properties

### buildnumber

• **buildnumber**: `string`

#### Defined in

[server/index.ts:192](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L192)

___

### cache

• **cache**: [`Cache`](../classes/server_cache.Cache.md)

#### Defined in

[server/index.ts:185](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L185)

___

### config

• **config**: [`IConfigRawJSONDataType`](config.IConfigRawJSONDataType.md)

#### Defined in

[server/index.ts:180](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L180)

___

### customRoles

• **customRoles**: [`ICustomRoleType`](server_resolvers_roles.ICustomRoleType.md)[]

#### Defined in

[server/index.ts:208](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L208)

___

### customServices

• **customServices**: `Object`

#### Index signature

▪ [name: `string`]: [`ServiceProvider`](../classes/server_services.ServiceProvider.md)\<`any`\>

#### Defined in

[server/index.ts:204](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L204)

___

### databaseConfig

• **databaseConfig**: [`IDBConfigRawJSONDataType`](config.IDBConfigRawJSONDataType.md)

#### Defined in

[server/index.ts:182](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L182)

___

### databaseConnection

• **databaseConnection**: [`DatabaseConnection`](../classes/database.DatabaseConnection.md)

#### Defined in

[server/index.ts:183](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L183)

___

### domain

• **domain**: `string`

#### Defined in

[server/index.ts:211](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L211)

___

### elastic

• **elastic**: [`ItemizeElasticClient`](../classes/server_elastic.ItemizeElasticClient.md)

#### Defined in

[server/index.ts:210](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L210)

___

### express

• **express**: typeof `e`

#### Defined in

[server/index.ts:207](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L207)

___

### indexDevelopment

• **indexDevelopment**: `string`

#### Defined in

[server/index.ts:178](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L178)

___

### indexProduction

• **indexProduction**: `string`

#### Defined in

[server/index.ts:179](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L179)

___

### langLocales

• **langLocales**: [`ILangLocalesType`](base_Root.ILangLocalesType.md)

#### Defined in

[server/index.ts:175](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L175)

___

### listener

• **listener**: [`Listener`](../classes/server_listener.Listener.md)

#### Defined in

[server/index.ts:184](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L184)

___

### locationSearchService

• **locationSearchService**: [`default`](../classes/server_services_base_LocationSearchProvider.default.md)\<`any`\>

#### Defined in

[server/index.ts:201](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L201)

___

### logger

• **logger**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `debug` | (`arg`: [`IItemizeLoggingStructure`](server_logger.IItemizeLoggingStructure.md)\<`any`\>) => `void` |
| `error` | (`arg`: [`IItemizeLoggingErrorStructure`](server_logger.IItemizeLoggingErrorStructure.md)\<`any`\>) => `void` |
| `info` | (`arg`: [`IItemizeLoggingStructure`](server_logger.IItemizeLoggingStructure.md)\<`any`\>) => `void` |

#### Defined in

[server/index.ts:195](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L195)

___

### loggingService

• **loggingService**: [`default`](../classes/server_services_base_LoggingProvider.default.md)\<`any`\>

#### Defined in

[server/index.ts:199](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L199)

___

### mailService

• **mailService**: [`default`](../classes/server_services_base_MailProvider.default.md)\<`any`\>

#### Defined in

[server/index.ts:196](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L196)

___

### paymentService

• **paymentService**: [`default`](../classes/server_services_base_PaymentProvider.default.md)\<`any`\>

#### Defined in

[server/index.ts:198](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L198)

___

### phoneService

• **phoneService**: [`default`](../classes/server_services_base_PhoneProvider.default.md)\<`any`\>

#### Defined in

[server/index.ts:197](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L197)

___

### rawDB

• **rawDB**: [`ItemizeRawDB`](../classes/server_raw_db.ItemizeRawDB.md)

#### Defined in

[server/index.ts:209](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L209)

___

### redis

• **redis**: [`ItemizeRedisClient`](../classes/server_redis.ItemizeRedisClient.md)

#### Defined in

[server/index.ts:186](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L186)

___

### redisGlobal

• **redisGlobal**: [`ItemizeRedisClient`](../classes/server_redis.ItemizeRedisClient.md)

#### Defined in

[server/index.ts:187](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L187)

___

### redisLocalPub

• **redisLocalPub**: [`ItemizeRedisClient`](../classes/server_redis.ItemizeRedisClient.md)

#### Defined in

[server/index.ts:190](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L190)

___

### redisLocalSub

• **redisLocalSub**: [`ItemizeRedisClient`](../classes/server_redis.ItemizeRedisClient.md)

#### Defined in

[server/index.ts:191](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L191)

___

### redisPub

• **redisPub**: [`ItemizeRedisClient`](../classes/server_redis.ItemizeRedisClient.md)

#### Defined in

[server/index.ts:188](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L188)

___

### redisSub

• **redisSub**: [`ItemizeRedisClient`](../classes/server_redis.ItemizeRedisClient.md)

#### Defined in

[server/index.ts:189](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L189)

___

### registry

• **registry**: [`RegistryService`](../classes/server_services_registry.RegistryService.md)

#### Defined in

[server/index.ts:203](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L203)

___

### root

• **root**: [`default`](../classes/base_Root.default.md)

#### Defined in

[server/index.ts:172](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L172)

___

### rootPool

• **rootPool**: `Pool`\<[`default`](../classes/base_Root.default.md)\>

#### Defined in

[server/index.ts:173](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L173)

___

### rqSchema

• **rqSchema**: [`RQRootSchema`](base_Root_rq.RQRootSchema.md)

#### Defined in

[server/index.ts:174](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L174)

___

### sensitiveConfig

• **sensitiveConfig**: [`ISensitiveConfigRawJSONDataType`](config.ISensitiveConfigRawJSONDataType.md)

#### Defined in

[server/index.ts:181](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L181)

___

### seoConfig

• **seoConfig**: [`ISEOConfig`](server.ISEOConfig.md)

#### Defined in

[server/index.ts:177](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L177)

___

### ssrConfig

• **ssrConfig**: [`ISSRConfig`](server.ISSRConfig.md)

#### Defined in

[server/index.ts:176](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L176)

___

### storage

• **storage**: [`IStorageProvidersObject`](server_services_base_StorageProvider.IStorageProvidersObject.md)

#### Defined in

[server/index.ts:194](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L194)

___

### triggers

• **triggers**: [`ITriggerRegistry`](server_resolvers_triggers.ITriggerRegistry.md)

#### Defined in

[server/index.ts:193](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L193)

___

### userLocalizationService

• **userLocalizationService**: [`default`](../classes/server_services_base_UserLocalizationProvider.default.md)\<`any`\>

#### Defined in

[server/index.ts:200](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L200)

___

### userTokenQuery

• **userTokenQuery**: (`arg`: \{ `country?`: `string` ; `password?`: `string` ; `token?`: `string` ; `username?`: `string`  }) => `Promise`\<\{ `id`: `string` ; `role`: `string` ; `token`: `string`  }\>

#### Type declaration

▸ (`arg`): `Promise`\<\{ `id`: `string` ; `role`: `string` ; `token`: `string`  }\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `Object` |
| `arg.country?` | `string` |
| `arg.password?` | `string` |
| `arg.token?` | `string` |
| `arg.username?` | `string` |

##### Returns

`Promise`\<\{ `id`: `string` ; `role`: `string` ; `token`: `string`  }\>

#### Defined in

[server/index.ts:212](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L212)

___

### ussdService

• **ussdService**: [`default`](../classes/server_services_base_USSDProvider.default.md)\<`any`\>

#### Defined in

[server/index.ts:202](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L202)
