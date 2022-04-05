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

• **new IServiceProviderClassType**(`config`, `registry`, `appConfig`, `appSensitiveConfig`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `T` |
| `registry` | [`RegistryService`](../classes/server_services_registry.RegistryService.md) |
| `appConfig` | [`IConfigRawJSONDataType`](config.IConfigRawJSONDataType.md) |
| `appSensitiveConfig` | [`ISensitiveConfigRawJSONDataType`](config.ISensitiveConfigRawJSONDataType.md) |

#### Defined in

[server/services/index.ts:296](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L296)

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

[server/services/index.ts:302](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L302)

___

### getTriggerRegistry

▸ **getTriggerRegistry**(): [`ITriggerRegistry`](server_resolvers_triggers.ITriggerRegistry.md) \| `Promise`<[`ITriggerRegistry`](server_resolvers_triggers.ITriggerRegistry.md)\>

#### Returns

[`ITriggerRegistry`](server_resolvers_triggers.ITriggerRegistry.md) \| `Promise`<[`ITriggerRegistry`](server_resolvers_triggers.ITriggerRegistry.md)\>

#### Defined in

[server/services/index.ts:303](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L303)

___

### getType

▸ **getType**(): [`ServiceProviderType`](../enums/server_services.ServiceProviderType.md)

#### Returns

[`ServiceProviderType`](../enums/server_services.ServiceProviderType.md)

#### Defined in

[server/services/index.ts:304](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L304)
