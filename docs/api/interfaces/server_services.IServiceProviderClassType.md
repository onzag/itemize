[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/services](../modules/server_services.md) / IServiceProviderClassType

# Interface: IServiceProviderClassType<T\>

[server/services](../modules/server_services.md).IServiceProviderClassType

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Constructors

- [constructor](server_services.IServiceProviderClassType.md#constructor)

### Methods

- [getRouter](server_services.IServiceProviderClassType.md#getrouter)
- [getTriggerRegistry](server_services.IServiceProviderClassType.md#gettriggerregistry)
- [getType](server_services.IServiceProviderClassType.md#gettype)

## Constructors

### constructor

• **new IServiceProviderClassType**(`config`, `registry`, `configs`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `T` |
| `registry` | [`RegistryService`](../classes/server_services_registry.RegistryService.md) |
| `configs` | `Object` |
| `configs.config` | [`IConfigRawJSONDataType`](config.IConfigRawJSONDataType.md) |
| `configs.dbConfig` | [`IDBConfigRawJSONDataType`](config.IDBConfigRawJSONDataType.md) |
| `configs.redisConfig` | [`IRedisConfigRawJSONDataType`](config.IRedisConfigRawJSONDataType.md) |
| `configs.sensitiveConfig` | [`ISensitiveConfigRawJSONDataType`](config.ISensitiveConfigRawJSONDataType.md) |

#### Defined in

[server/services/index.ts:311](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L311)

## Methods

### getRouter

▸ **getRouter**(`appData`): `Router` \| `Promise`<`Router`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](server.IAppDataType.md) |

#### Returns

`Router` \| `Promise`<`Router`\>

#### Defined in

[server/services/index.ts:321](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L321)

___

### getTriggerRegistry

▸ **getTriggerRegistry**(): [`ITriggerRegistry`](server_resolvers_triggers.ITriggerRegistry.md) \| `Promise`<[`ITriggerRegistry`](server_resolvers_triggers.ITriggerRegistry.md)\>

#### Returns

[`ITriggerRegistry`](server_resolvers_triggers.ITriggerRegistry.md) \| `Promise`<[`ITriggerRegistry`](server_resolvers_triggers.ITriggerRegistry.md)\>

#### Defined in

[server/services/index.ts:322](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L322)

___

### getType

▸ **getType**(): [`ServiceProviderType`](../enums/server_services.ServiceProviderType.md)

#### Returns

[`ServiceProviderType`](../enums/server_services.ServiceProviderType.md)

#### Defined in

[server/services/index.ts:323](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L323)
