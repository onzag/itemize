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

[server/environment.ts:87](https://github.com/onzag/itemize/blob/73e0c39e/server/environment.ts#L87)

___

### buildnumber

• **buildnumber**: `string`

#### Defined in

[server/environment.ts:90](https://github.com/onzag/itemize/blob/73e0c39e/server/environment.ts#L90)

___

### environment

• **environment**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `INSTANCE_CREATION_TIME` | `Date` |
| `INSTANCE_GROUP_ID` | `string` |
| `INSTANCE_MODE` | ``"CLUSTER_MANAGER"`` \| ``"GLOBAL_MANAGER"`` \| ``"ABSOLUTE"`` \| ``"EXTENDED"`` \| ``"BUILD_DATABASE"`` \| ``"LOAD_DATABASE_DUMP"`` \| ``"CLEAN_STORAGE"`` |
| `INSTANCE_UUID` | `string` |
| `LOG_LEVEL` | ``"debug"`` \| ``"silly"`` \| ``"info"`` \| ``"error"`` |
| `NODE_ENV` | ``"development"`` \| ``"production"`` |
| `NO_SEO` | `boolean` |
| `NO_SSR` | `boolean` |
| `USING_DOCKER` | `boolean` |

#### Defined in

[server/environment.ts:95](https://github.com/onzag/itemize/blob/73e0c39e/server/environment.ts#L95)

___

### nodeVersion

• **nodeVersion**: `string`

#### Defined in

[server/environment.ts:86](https://github.com/onzag/itemize/blob/73e0c39e/server/environment.ts#L86)

___

### platform

• **platform**: `string`

#### Defined in

[server/environment.ts:88](https://github.com/onzag/itemize/blob/73e0c39e/server/environment.ts#L88)

___

### postgresql

• **postgresql**: [`IDBConfigRawJSONDataType`](config.IDBConfigRawJSONDataType.md)

#### Defined in

[server/environment.ts:94](https://github.com/onzag/itemize/blob/73e0c39e/server/environment.ts#L94)

___

### redisCache

• **redisCache**: [`ISingleRedisConfigRawJSONDataType`](config.ISingleRedisConfigRawJSONDataType.md)

#### Defined in

[server/environment.ts:92](https://github.com/onzag/itemize/blob/73e0c39e/server/environment.ts#L92)

___

### redisGlobal

• **redisGlobal**: [`ISingleRedisConfigRawJSONDataType`](config.ISingleRedisConfigRawJSONDataType.md)

#### Defined in

[server/environment.ts:91](https://github.com/onzag/itemize/blob/73e0c39e/server/environment.ts#L91)

___

### redisPubSub

• **redisPubSub**: [`ISingleRedisConfigRawJSONDataType`](config.ISingleRedisConfigRawJSONDataType.md)

#### Defined in

[server/environment.ts:93](https://github.com/onzag/itemize/blob/73e0c39e/server/environment.ts#L93)
