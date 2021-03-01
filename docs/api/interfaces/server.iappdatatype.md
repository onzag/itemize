[](../README.md) / [Exports](../modules.md) / [server](../modules/server.md) / IAppDataType

# Interface: IAppDataType

[server](../modules/server.md).IAppDataType

## Table of contents

### Properties

- [buildnumber](server.iappdatatype.md#buildnumber)
- [cache](server.iappdatatype.md#cache)
- [config](server.iappdatatype.md#config)
- [customRoles](server.iappdatatype.md#customroles)
- [customServices](server.iappdatatype.md#customservices)
- [customUserTokenQuery](server.iappdatatype.md#customusertokenquery)
- [databaseConnection](server.iappdatatype.md#databaseconnection)
- [indexDevelopment](server.iappdatatype.md#indexdevelopment)
- [indexProduction](server.iappdatatype.md#indexproduction)
- [langLocales](server.iappdatatype.md#langlocales)
- [listener](server.iappdatatype.md#listener)
- [locationSearchService](server.iappdatatype.md#locationsearchservice)
- [logger](server.iappdatatype.md#logger)
- [mailService](server.iappdatatype.md#mailservice)
- [rawDB](server.iappdatatype.md#rawdb)
- [redis](server.iappdatatype.md#redis)
- [redisGlobal](server.iappdatatype.md#redisglobal)
- [redisLocalPub](server.iappdatatype.md#redislocalpub)
- [redisLocalSub](server.iappdatatype.md#redislocalsub)
- [redisPub](server.iappdatatype.md#redispub)
- [redisSub](server.iappdatatype.md#redissub)
- [registry](server.iappdatatype.md#registry)
- [root](server.iappdatatype.md#root)
- [rootPool](server.iappdatatype.md#rootpool)
- [sensitiveConfig](server.iappdatatype.md#sensitiveconfig)
- [seoConfig](server.iappdatatype.md#seoconfig)
- [ssrConfig](server.iappdatatype.md#ssrconfig)
- [storage](server.iappdatatype.md#storage)
- [triggers](server.iappdatatype.md#triggers)
- [userLocalizationService](server.iappdatatype.md#userlocalizationservice)

## Properties

### buildnumber

• **buildnumber**: *string*

Defined in: [server/index.ts:157](https://github.com/onzag/itemize/blob/0e9b128c/server/index.ts#L157)

___

### cache

• **cache**: [*Cache*](../classes/server_cache.cache.md)

Defined in: [server/index.ts:150](https://github.com/onzag/itemize/blob/0e9b128c/server/index.ts#L150)

___

### config

• **config**: [*IConfigRawJSONDataType*](config.iconfigrawjsondatatype.md)

Defined in: [server/index.ts:146](https://github.com/onzag/itemize/blob/0e9b128c/server/index.ts#L146)

___

### customRoles

• **customRoles**: [*ICustomRoleType*](server_resolvers_roles.icustomroletype.md)[]

Defined in: [server/index.ts:169](https://github.com/onzag/itemize/blob/0e9b128c/server/index.ts#L169)

___

### customServices

• **customServices**: *object*

#### Type declaration:

Defined in: [server/index.ts:166](https://github.com/onzag/itemize/blob/0e9b128c/server/index.ts#L166)

___

### customUserTokenQuery

• **customUserTokenQuery**: *any*

Defined in: [server/index.ts:160](https://github.com/onzag/itemize/blob/0e9b128c/server/index.ts#L160)

___

### databaseConnection

• **databaseConnection**: [*DatabaseConnection*](../classes/database.databaseconnection.md)

Defined in: [server/index.ts:148](https://github.com/onzag/itemize/blob/0e9b128c/server/index.ts#L148)

___

### indexDevelopment

• **indexDevelopment**: *string*

Defined in: [server/index.ts:144](https://github.com/onzag/itemize/blob/0e9b128c/server/index.ts#L144)

___

### indexProduction

• **indexProduction**: *string*

Defined in: [server/index.ts:145](https://github.com/onzag/itemize/blob/0e9b128c/server/index.ts#L145)

___

### langLocales

• **langLocales**: [*ILangLocalesType*](base_root.ilanglocalestype.md)

Defined in: [server/index.ts:141](https://github.com/onzag/itemize/blob/0e9b128c/server/index.ts#L141)

___

### listener

• **listener**: [*Listener*](../classes/server_listener.listener.md)

Defined in: [server/index.ts:149](https://github.com/onzag/itemize/blob/0e9b128c/server/index.ts#L149)

___

### locationSearchService

• **locationSearchService**: [*default*](../classes/server_services_base_locationsearchprovider.default.md)<any\>

Defined in: [server/index.ts:164](https://github.com/onzag/itemize/blob/0e9b128c/server/index.ts#L164)

___

### logger

• **logger**: *Logger*

Defined in: [server/index.ts:161](https://github.com/onzag/itemize/blob/0e9b128c/server/index.ts#L161)

___

### mailService

• **mailService**: [*default*](../classes/server_services_base_mailprovider.default.md)<any\>

Defined in: [server/index.ts:162](https://github.com/onzag/itemize/blob/0e9b128c/server/index.ts#L162)

___

### rawDB

• **rawDB**: [*ItemizeRawDB*](../classes/server_raw_db.itemizerawdb.md)

Defined in: [server/index.ts:170](https://github.com/onzag/itemize/blob/0e9b128c/server/index.ts#L170)

___

### redis

• **redis**: [*ItemizeRedisClient*](../classes/server_redis.itemizeredisclient.md)

Defined in: [server/index.ts:151](https://github.com/onzag/itemize/blob/0e9b128c/server/index.ts#L151)

___

### redisGlobal

• **redisGlobal**: [*ItemizeRedisClient*](../classes/server_redis.itemizeredisclient.md)

Defined in: [server/index.ts:152](https://github.com/onzag/itemize/blob/0e9b128c/server/index.ts#L152)

___

### redisLocalPub

• **redisLocalPub**: [*ItemizeRedisClient*](../classes/server_redis.itemizeredisclient.md)

Defined in: [server/index.ts:155](https://github.com/onzag/itemize/blob/0e9b128c/server/index.ts#L155)

___

### redisLocalSub

• **redisLocalSub**: [*ItemizeRedisClient*](../classes/server_redis.itemizeredisclient.md)

Defined in: [server/index.ts:156](https://github.com/onzag/itemize/blob/0e9b128c/server/index.ts#L156)

___

### redisPub

• **redisPub**: [*ItemizeRedisClient*](../classes/server_redis.itemizeredisclient.md)

Defined in: [server/index.ts:153](https://github.com/onzag/itemize/blob/0e9b128c/server/index.ts#L153)

___

### redisSub

• **redisSub**: [*ItemizeRedisClient*](../classes/server_redis.itemizeredisclient.md)

Defined in: [server/index.ts:154](https://github.com/onzag/itemize/blob/0e9b128c/server/index.ts#L154)

___

### registry

• **registry**: [*RegistryService*](../classes/server_services_registry.registryservice.md)

Defined in: [server/index.ts:165](https://github.com/onzag/itemize/blob/0e9b128c/server/index.ts#L165)

___

### root

• **root**: [*default*](../classes/base_root.default.md)

Defined in: [server/index.ts:139](https://github.com/onzag/itemize/blob/0e9b128c/server/index.ts#L139)

___

### rootPool

• **rootPool**: *Pool*<[*default*](../classes/base_root.default.md)\>

Defined in: [server/index.ts:140](https://github.com/onzag/itemize/blob/0e9b128c/server/index.ts#L140)

___

### sensitiveConfig

• **sensitiveConfig**: [*ISensitiveConfigRawJSONDataType*](config.isensitiveconfigrawjsondatatype.md)

Defined in: [server/index.ts:147](https://github.com/onzag/itemize/blob/0e9b128c/server/index.ts#L147)

___

### seoConfig

• **seoConfig**: [*ISEOConfig*](server.iseoconfig.md)

Defined in: [server/index.ts:143](https://github.com/onzag/itemize/blob/0e9b128c/server/index.ts#L143)

___

### ssrConfig

• **ssrConfig**: [*ISSRConfig*](server.issrconfig.md)

Defined in: [server/index.ts:142](https://github.com/onzag/itemize/blob/0e9b128c/server/index.ts#L142)

___

### storage

• **storage**: [*IStorageProvidersObject*](server_services_base_storageprovider.istorageprovidersobject.md)

Defined in: [server/index.ts:159](https://github.com/onzag/itemize/blob/0e9b128c/server/index.ts#L159)

___

### triggers

• **triggers**: [*ITriggerRegistry*](server_resolvers_triggers.itriggerregistry.md)

Defined in: [server/index.ts:158](https://github.com/onzag/itemize/blob/0e9b128c/server/index.ts#L158)

___

### userLocalizationService

• **userLocalizationService**: [*default*](../classes/server_services_base_userlocalizationprovider.default.md)<any\>

Defined in: [server/index.ts:163](https://github.com/onzag/itemize/blob/0e9b128c/server/index.ts#L163)
