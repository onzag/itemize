[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/environment](../modules/server_environment.md) / IEnvironmentInfo

# Interface: IEnvironmentInfo

[server/environment](../modules/server_environment.md).IEnvironmentInfo

## Table of contents

### Properties

- [arch](server_environment.IEnvironmentInfo.md#arch)
- [buildnumber](server_environment.IEnvironmentInfo.md#buildnumber)
- [environment](server_environment.IEnvironmentInfo.md#environment)
- [nodeVersion](server_environment.IEnvironmentInfo.md#nodeversion)
- [platform](server_environment.IEnvironmentInfo.md#platform)
- [postgresql](server_environment.IEnvironmentInfo.md#postgresql)
- [redisCache](server_environment.IEnvironmentInfo.md#rediscache)
- [redisGlobal](server_environment.IEnvironmentInfo.md#redisglobal)
- [redisPubSub](server_environment.IEnvironmentInfo.md#redispubsub)

## Properties

### arch

• **arch**: `string`

#### Defined in

[server/environment.ts:84](https://github.com/onzag/itemize/blob/f2db74a5/server/environment.ts#L84)

___

### buildnumber

• **buildnumber**: `string`

#### Defined in

[server/environment.ts:87](https://github.com/onzag/itemize/blob/f2db74a5/server/environment.ts#L87)

___

### environment

• **environment**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `INSTANCE_CREATION_TIME` | `Date` |
| `INSTANCE_GROUP_ID` | `string` |
| `INSTANCE_MODE` | ``"CLUSTER_MANAGER"`` \| ``"GLOBAL_MANAGER"`` \| ``"ABSOLUTE"`` \| ``"EXTENDED"`` \| ``"BUILD_DATABASE"`` \| ``"LOAD_DATABASE_DUMP"`` \| ``"CLEAN_STORAGE"`` \| ``"CLEAN_SITEMAPS"`` |
| `INSTANCE_UUID` | `string` |
| `LOG_LEVEL` | ``"error"`` \| ``"info"`` \| ``"debug"`` \| ``"silly"`` |
| `NODE_ENV` | ``"production"`` \| ``"development"`` |
| `NO_SEO` | `boolean` |
| `NO_SSR` | `boolean` |
| `PING_GOOGLE` | `boolean` |
| `USING_DOCKER` | `boolean` |

#### Defined in

[server/environment.ts:92](https://github.com/onzag/itemize/blob/f2db74a5/server/environment.ts#L92)

___

### nodeVersion

• **nodeVersion**: `string`

#### Defined in

[server/environment.ts:83](https://github.com/onzag/itemize/blob/f2db74a5/server/environment.ts#L83)

___

### platform

• **platform**: `string`

#### Defined in

[server/environment.ts:85](https://github.com/onzag/itemize/blob/f2db74a5/server/environment.ts#L85)

___

### postgresql

• **postgresql**: [`IDBConfigRawJSONDataType`](config.IDBConfigRawJSONDataType.md)

#### Defined in

[server/environment.ts:91](https://github.com/onzag/itemize/blob/f2db74a5/server/environment.ts#L91)

___

### redisCache

• **redisCache**: [`ISingleRedisConfigRawJSONDataType`](config.ISingleRedisConfigRawJSONDataType.md)

#### Defined in

[server/environment.ts:89](https://github.com/onzag/itemize/blob/f2db74a5/server/environment.ts#L89)

___

### redisGlobal

• **redisGlobal**: [`ISingleRedisConfigRawJSONDataType`](config.ISingleRedisConfigRawJSONDataType.md)

#### Defined in

[server/environment.ts:88](https://github.com/onzag/itemize/blob/f2db74a5/server/environment.ts#L88)

___

### redisPubSub

• **redisPubSub**: [`ISingleRedisConfigRawJSONDataType`](config.ISingleRedisConfigRawJSONDataType.md)

#### Defined in

[server/environment.ts:90](https://github.com/onzag/itemize/blob/f2db74a5/server/environment.ts#L90)
