[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/environment

# Module: server/environment

## Table of contents

### Interfaces

- [IEnvironmentInfo](../interfaces/server_environment.IEnvironmentInfo.md)

### Variables

- [CAN\_LOG\_DEBUG](server_environment.md#can_log_debug)
- [ELASTIC\_EXECUTE\_CONSISTENCY\_CHECKS\_FROM\_SCRATCH\_AT](server_environment.md#elastic_execute_consistency_checks_from_scratch_at)
- [EMULATE\_BAD\_REDIS\_WRITES](server_environment.md#emulate_bad_redis_writes)
- [EMULATE\_ELASTIC\_SYNC\_FAILURE\_AT](server_environment.md#emulate_elastic_sync_failure_at)
- [EMULATE\_SILENT\_ELASTIC\_SYNC\_FAILURE\_AT](server_environment.md#emulate_silent_elastic_sync_failure_at)
- [ENVIRONMENT\_DETAILS](server_environment.md#environment_details)
- [FAKE\_EMAILS](server_environment.md#fake_emails)
- [FAKE\_SMS](server_environment.md#fake_sms)
- [FAKE\_USSD](server_environment.md#fake_ussd)
- [FORCE\_ALL\_OUTBOUND\_MAIL\_TO](server_environment.md#force_all_outbound_mail_to)
- [FORCE\_ALL\_OUTBOUND\_SMS\_TO](server_environment.md#force_all_outbound_sms_to)
- [FORCE\_CONSOLE\_LOGS](server_environment.md#force_console_logs)
- [FORCE\_ELASTIC\_REBUILD](server_environment.md#force_elastic_rebuild)
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
- [PORT](server_environment.md#port)
- [REFRESH\_ADMIN\_PASSWORD](server_environment.md#refresh_admin_password)
- [TRUST\_ALL\_INBOUND\_CONNECTIONS](server_environment.md#trust_all_inbound_connections)
- [USING\_DOCKER](server_environment.md#using_docker)

### Functions

- [buildEnvironmentInfo](server_environment.md#buildenvironmentinfo)

## Variables

### CAN\_LOG\_DEBUG

• **CAN\_LOG\_DEBUG**: `boolean`

#### Defined in

[server/environment.ts:65](https://github.com/onzag/itemize/blob/a24376ed/server/environment.ts#L65)

___

### ELASTIC\_EXECUTE\_CONSISTENCY\_CHECKS\_FROM\_SCRATCH\_AT

• **ELASTIC\_EXECUTE\_CONSISTENCY\_CHECKS\_FROM\_SCRATCH\_AT**: `string`

#### Defined in

[server/environment.ts:133](https://github.com/onzag/itemize/blob/a24376ed/server/environment.ts#L133)

___

### EMULATE\_BAD\_REDIS\_WRITES

• **EMULATE\_BAD\_REDIS\_WRITES**: `boolean`

#### Defined in

[server/environment.ts:134](https://github.com/onzag/itemize/blob/a24376ed/server/environment.ts#L134)

___

### EMULATE\_ELASTIC\_SYNC\_FAILURE\_AT

• **EMULATE\_ELASTIC\_SYNC\_FAILURE\_AT**: `string`

#### Defined in

[server/environment.ts:131](https://github.com/onzag/itemize/blob/a24376ed/server/environment.ts#L131)

___

### EMULATE\_SILENT\_ELASTIC\_SYNC\_FAILURE\_AT

• **EMULATE\_SILENT\_ELASTIC\_SYNC\_FAILURE\_AT**: `string`

#### Defined in

[server/environment.ts:132](https://github.com/onzag/itemize/blob/a24376ed/server/environment.ts#L132)

___

### ENVIRONMENT\_DETAILS

• **ENVIRONMENT\_DETAILS**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `INSTANCE_CREATION_TIME` | `Date` |
| `INSTANCE_GROUP_ID` | `string` |
| `INSTANCE_MODE` | ``"CLUSTER_MANAGER"`` \| ``"GLOBAL_MANAGER"`` \| ``"ABSOLUTE"`` \| ``"EXTENDED"`` \| ``"BUILD_DATABASE"`` \| ``"LOAD_DATABASE_DUMP"`` \| ``"CLEAN_STORAGE"`` |
| `INSTANCE_UUID` | `string` |
| `LOG_LEVEL` | ``"error"`` \| ``"info"`` \| ``"debug"`` \| ``"silly"`` |
| `NODE_ENV` | ``"production"`` \| ``"development"`` |
| `NO_SEO` | `boolean` |
| `NO_SSR` | `boolean` |
| `USING_DOCKER` | `boolean` |

#### Defined in

[server/environment.ts:73](https://github.com/onzag/itemize/blob/a24376ed/server/environment.ts#L73)

___

### FAKE\_EMAILS

• **FAKE\_EMAILS**: `boolean`

#### Defined in

[server/environment.ts:47](https://github.com/onzag/itemize/blob/a24376ed/server/environment.ts#L47)

___

### FAKE\_SMS

• **FAKE\_SMS**: `boolean`

#### Defined in

[server/environment.ts:46](https://github.com/onzag/itemize/blob/a24376ed/server/environment.ts#L46)

___

### FAKE\_USSD

• **FAKE\_USSD**: `boolean`

#### Defined in

[server/environment.ts:48](https://github.com/onzag/itemize/blob/a24376ed/server/environment.ts#L48)

___

### FORCE\_ALL\_OUTBOUND\_MAIL\_TO

• **FORCE\_ALL\_OUTBOUND\_MAIL\_TO**: `string`

#### Defined in

[server/environment.ts:136](https://github.com/onzag/itemize/blob/a24376ed/server/environment.ts#L136)

___

### FORCE\_ALL\_OUTBOUND\_SMS\_TO

• **FORCE\_ALL\_OUTBOUND\_SMS\_TO**: `string`

#### Defined in

[server/environment.ts:137](https://github.com/onzag/itemize/blob/a24376ed/server/environment.ts#L137)

___

### FORCE\_CONSOLE\_LOGS

• **FORCE\_CONSOLE\_LOGS**: `boolean`

#### Defined in

[server/environment.ts:71](https://github.com/onzag/itemize/blob/a24376ed/server/environment.ts#L71)

___

### FORCE\_ELASTIC\_REBUILD

• **FORCE\_ELASTIC\_REBUILD**: `boolean`

#### Defined in

[server/environment.ts:70](https://github.com/onzag/itemize/blob/a24376ed/server/environment.ts#L70)

___

### GLOBAL\_MANAGER\_MODE

• **GLOBAL\_MANAGER\_MODE**: ``"ABSOLUTE"`` \| ``"ELASTIC"`` \| ``"SERVER_DATA"`` \| ``"SERVICES"``

#### Defined in

[server/environment.ts:16](https://github.com/onzag/itemize/blob/a24376ed/server/environment.ts#L16)

___

### GLOBAL\_MANAGER\_SERVICES

• **GLOBAL\_MANAGER\_SERVICES**: `string`[]

#### Defined in

[server/environment.ts:17](https://github.com/onzag/itemize/blob/a24376ed/server/environment.ts#L17)

___

### INSTANCE\_CREATION\_TIME

• **INSTANCE\_CREATION\_TIME**: `Date`

#### Defined in

[server/environment.ts:23](https://github.com/onzag/itemize/blob/a24376ed/server/environment.ts#L23)

___

### INSTANCE\_GROUP\_ID

• **INSTANCE\_GROUP\_ID**: `string`

#### Defined in

[server/environment.ts:14](https://github.com/onzag/itemize/blob/a24376ed/server/environment.ts#L14)

___

### INSTANCE\_LOG\_ERROR\_FILE

• **INSTANCE\_LOG\_ERROR\_FILE**: `string`

#### Defined in

[server/environment.ts:25](https://github.com/onzag/itemize/blob/a24376ed/server/environment.ts#L25)

___

### INSTANCE\_LOG\_FILE

• **INSTANCE\_LOG\_FILE**: `string`

#### Defined in

[server/environment.ts:24](https://github.com/onzag/itemize/blob/a24376ed/server/environment.ts#L24)

___

### INSTANCE\_MODE

• **INSTANCE\_MODE**: ``"CLUSTER_MANAGER"`` \| ``"GLOBAL_MANAGER"`` \| ``"ABSOLUTE"`` \| ``"EXTENDED"`` \| ``"BUILD_DATABASE"`` \| ``"LOAD_DATABASE_DUMP"`` \| ``"CLEAN_STORAGE"``

#### Defined in

[server/environment.ts:15](https://github.com/onzag/itemize/blob/a24376ed/server/environment.ts#L15)

___

### INSTANCE\_UUID

• **INSTANCE\_UUID**: `string`

#### Defined in

[server/environment.ts:18](https://github.com/onzag/itemize/blob/a24376ed/server/environment.ts#L18)

___

### LOG\_LEVEL

• **LOG\_LEVEL**: ``"debug"`` \| ``"silly"`` \| ``"info"`` \| ``"error"``

#### Defined in

[server/environment.ts:49](https://github.com/onzag/itemize/blob/a24376ed/server/environment.ts#L49)

___

### NODE\_ENV

• **NODE\_ENV**: ``"development"`` \| ``"production"``

#### Defined in

[server/environment.ts:8](https://github.com/onzag/itemize/blob/a24376ed/server/environment.ts#L8)

___

### NO\_SEO

• **NO\_SEO**: `boolean`

#### Defined in

[server/environment.ts:66](https://github.com/onzag/itemize/blob/a24376ed/server/environment.ts#L66)

___

### NO\_SSR

• **NO\_SSR**: `boolean`

#### Defined in

[server/environment.ts:67](https://github.com/onzag/itemize/blob/a24376ed/server/environment.ts#L67)

___

### PORT

• **PORT**: `number`

#### Defined in

[server/environment.ts:13](https://github.com/onzag/itemize/blob/a24376ed/server/environment.ts#L13)

___

### REFRESH\_ADMIN\_PASSWORD

• **REFRESH\_ADMIN\_PASSWORD**: `boolean`

#### Defined in

[server/environment.ts:26](https://github.com/onzag/itemize/blob/a24376ed/server/environment.ts#L26)

___

### TRUST\_ALL\_INBOUND\_CONNECTIONS

• **TRUST\_ALL\_INBOUND\_CONNECTIONS**: `boolean`

#### Defined in

[server/environment.ts:5](https://github.com/onzag/itemize/blob/a24376ed/server/environment.ts#L5)

___

### USING\_DOCKER

• **USING\_DOCKER**: `boolean`

#### Defined in

[server/environment.ts:45](https://github.com/onzag/itemize/blob/a24376ed/server/environment.ts#L45)

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

[server/environment.ts:98](https://github.com/onzag/itemize/blob/a24376ed/server/environment.ts#L98)
