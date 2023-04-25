[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/internal/providers/config-provider

# Module: client/internal/providers/config-provider

Provides the configuration files down the line

## Table of contents

### Interfaces

- [IConfigProviderProps](../interfaces/client_internal_providers_config_provider.IConfigProviderProps.md)

### Variables

- [ConfigContext](client_internal_providers_config_provider.md#configcontext)

### Functions

- [ConfigProvider](client_internal_providers_config_provider.md#configprovider)

## Variables

### ConfigContext

• **ConfigContext**: `Context`<[`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md)\>

The context that provides the configuration

#### Defined in

[client/internal/providers/config-provider.tsx:12](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/providers/config-provider.tsx#L12)

## Functions

### ConfigProvider

▸ **ConfigProvider**(`props`): `Element`

The config provider allows to create a config context
should be placed even on top of the app itself
as the config is static

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IConfigProviderProps`](../interfaces/client_internal_providers_config_provider.IConfigProviderProps.md) | the config props |

#### Returns

`Element`

#### Defined in

[client/internal/providers/config-provider.tsx:28](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/providers/config-provider.tsx#L28)
