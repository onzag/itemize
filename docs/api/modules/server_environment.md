[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/environment

# Module: server/environment

## Table of contents

### Interfaces

- [IEnvironmentInfo](../interfaces/server_environment.IEnvironmentInfo.md)

### Variables

- [CAN\_LOG\_DEBUG](server_environment.md#can_log_debug)
- [ENVIRONMENT\_DETAILS](server_environment.md#environment_details)
- [FAKE\_EMAILS](server_environment.md#fake_emails)
- [FAKE\_SMS](server_environment.md#fake_sms)
- [FAKE\_USSD](server_environment.md#fake_ussd)
- [FORCE\_CONSOLE\_LOGS](server_environment.md#force_console_logs)
- [GLOBAL\_MANAGER\_MODE](server_environment.md#global_manager_mode)
- [GLOBAL\_MANAGER\_SERVICES](server_environment.md#global_manager_services)
- [INSTANCE\_CREATION\_TIME](server_environment.md#instance_creation_time)
- [INSTANCE\_GROUP\_ID](server_environment.md#instance_group_id)
- [INSTANCE\_LOG\_ERROR\_FILE](server_environment.md#instance_log_error_file)
- [INSTANCE\_LOG\_FILE](server_environment.md#instance_log_file)
- [INSTANCE\_MODE](server_environment.md#instance_mode)
- [INSTANCE\_UUID](server_environment.md#instance_uuid)
- [LOG\_LEVEL](server_environment.md#log_level)
- [NODE\_ENV](server_environment.md#node_env)
- [NO\_SEO](server_environment.md#no_seo)
- [NO\_SSR](server_environment.md#no_ssr)
- [PING\_GOOGLE](server_environment.md#ping_google)
- [PORT](server_environment.md#port)
- [USING\_DOCKER](server_environment.md#using_docker)

### Functions

- [buildEnvironmentInfo](server_environment.md#buildenvironmentinfo)

## Variables

### CAN\_LOG\_DEBUG

• **CAN\_LOG\_DEBUG**: `boolean`

#### Defined in

[server/environment.ts:65](https://github.com/onzag/itemize/blob/f2db74a5/server/environment.ts#L65)

___

### ENVIRONMENT\_DETAILS

• **ENVIRONMENT\_DETAILS**: `Object`

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

[server/environment.ts:69](https://github.com/onzag/itemize/blob/f2db74a5/server/environment.ts#L69)

___

### FAKE\_EMAILS

• **FAKE\_EMAILS**: `boolean`

#### Defined in

[server/environment.ts:46](https://github.com/onzag/itemize/blob/f2db74a5/server/environment.ts#L46)

___

### FAKE\_SMS

• **FAKE\_SMS**: `boolean`

#### Defined in

[server/environment.ts:45](https://github.com/onzag/itemize/blob/f2db74a5/server/environment.ts#L45)

___

### FAKE\_USSD

• **FAKE\_USSD**: `boolean`

#### Defined in

[server/environment.ts:47](https://github.com/onzag/itemize/blob/f2db74a5/server/environment.ts#L47)

___

### FORCE\_CONSOLE\_LOGS

• **FORCE\_CONSOLE\_LOGS**: `boolean`

#### Defined in

[server/environment.ts:49](https://github.com/onzag/itemize/blob/f2db74a5/server/environment.ts#L49)

___

### GLOBAL\_MANAGER\_MODE

• **GLOBAL\_MANAGER\_MODE**: ``"ABSOLUTE"`` \| ``"ELASTIC"`` \| ``"SITEMAPS"`` \| ``"SERVER_DATA"`` \| ``"SERVICES"``

#### Defined in

[server/environment.ts:14](https://github.com/onzag/itemize/blob/f2db74a5/server/environment.ts#L14)

___

### GLOBAL\_MANAGER\_SERVICES

• **GLOBAL\_MANAGER\_SERVICES**: `string`[]

#### Defined in

[server/environment.ts:15](https://github.com/onzag/itemize/blob/f2db74a5/server/environment.ts#L15)

___

### INSTANCE\_CREATION\_TIME

• **INSTANCE\_CREATION\_TIME**: `Date`

#### Defined in

[server/environment.ts:21](https://github.com/onzag/itemize/blob/f2db74a5/server/environment.ts#L21)

___

### INSTANCE\_GROUP\_ID

• **INSTANCE\_GROUP\_ID**: `string`

#### Defined in

[server/environment.ts:12](https://github.com/onzag/itemize/blob/f2db74a5/server/environment.ts#L12)

___

### INSTANCE\_LOG\_ERROR\_FILE

• **INSTANCE\_LOG\_ERROR\_FILE**: `string`

#### Defined in

[server/environment.ts:23](https://github.com/onzag/itemize/blob/f2db74a5/server/environment.ts#L23)

___

### INSTANCE\_LOG\_FILE

• **INSTANCE\_LOG\_FILE**: `string`

#### Defined in

[server/environment.ts:22](https://github.com/onzag/itemize/blob/f2db74a5/server/environment.ts#L22)

___

### INSTANCE\_MODE

• **INSTANCE\_MODE**: ``"CLUSTER_MANAGER"`` \| ``"GLOBAL_MANAGER"`` \| ``"ABSOLUTE"`` \| ``"EXTENDED"`` \| ``"BUILD_DATABASE"`` \| ``"LOAD_DATABASE_DUMP"`` \| ``"CLEAN_STORAGE"`` \| ``"CLEAN_SITEMAPS"``

#### Defined in

[server/environment.ts:13](https://github.com/onzag/itemize/blob/f2db74a5/server/environment.ts#L13)

___

### INSTANCE\_UUID

• **INSTANCE\_UUID**: `string`

#### Defined in

[server/environment.ts:16](https://github.com/onzag/itemize/blob/f2db74a5/server/environment.ts#L16)

___

### LOG\_LEVEL

• **LOG\_LEVEL**: ``"debug"`` \| ``"silly"`` \| ``"info"`` \| ``"error"``

#### Defined in

[server/environment.ts:48](https://github.com/onzag/itemize/blob/f2db74a5/server/environment.ts#L48)

___

### NODE\_ENV

• **NODE\_ENV**: ``"development"`` \| ``"production"``

#### Defined in

[server/environment.ts:6](https://github.com/onzag/itemize/blob/f2db74a5/server/environment.ts#L6)

___

### NO\_SEO

• **NO\_SEO**: `boolean`

#### Defined in

[server/environment.ts:66](https://github.com/onzag/itemize/blob/f2db74a5/server/environment.ts#L66)

___

### NO\_SSR

• **NO\_SSR**: `boolean`

#### Defined in

[server/environment.ts:67](https://github.com/onzag/itemize/blob/f2db74a5/server/environment.ts#L67)

___

### PING\_GOOGLE

• **PING\_GOOGLE**: `boolean`

#### Defined in

[server/environment.ts:44](https://github.com/onzag/itemize/blob/f2db74a5/server/environment.ts#L44)

___

### PORT

• **PORT**: `number`

#### Defined in

[server/environment.ts:11](https://github.com/onzag/itemize/blob/f2db74a5/server/environment.ts#L11)

___

### USING\_DOCKER

• **USING\_DOCKER**: `boolean`

#### Defined in

[server/environment.ts:43](https://github.com/onzag/itemize/blob/f2db74a5/server/environment.ts#L43)

## Functions

### buildEnvironmentInfo

▸ **buildEnvironmentInfo**(`buildnumber`, `redisConfig`, `databaseConfig`): [`IEnvironmentInfo`](../interfaces/server_environment.IEnvironmentInfo.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `buildnumber` | `string` |
| `redisConfig` | [`IRedisConfigRawJSONDataType`](../interfaces/config.IRedisConfigRawJSONDataType.md) |
| `databaseConfig` | [`IDBConfigRawJSONDataType`](../interfaces/config.IDBConfigRawJSONDataType.md) |

#### Returns

[`IEnvironmentInfo`](../interfaces/server_environment.IEnvironmentInfo.md)

#### Defined in

[server/environment.ts:95](https://github.com/onzag/itemize/blob/f2db74a5/server/environment.ts#L95)
