[](../README.md) / [Exports](../modules.md) / client/internal/providers/config-provider

# Module: client/internal/providers/config-provider

Provides the configuration files down the line

## Table of contents

### Interfaces

- [IConfigProviderProps](../interfaces/client_internal_providers_config_provider.iconfigproviderprops.md)

### Variables

- [ConfigContext](client_internal_providers_config_provider.md#configcontext)

### Functions

- [ConfigProvider](client_internal_providers_config_provider.md#configprovider)

## Variables

### ConfigContext

• `Const` **ConfigContext**: *Context*<[*IConfigRawJSONDataType*](../interfaces/config.iconfigrawjsondatatype.md)\>

The context that provides the configuration

Defined in: [client/internal/providers/config-provider.tsx:12](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/providers/config-provider.tsx#L12)

## Functions

### ConfigProvider

▸ **ConfigProvider**(`props`: [*IConfigProviderProps*](../interfaces/client_internal_providers_config_provider.iconfigproviderprops.md)): *Element*

The config provider allows to create a config context
should be placed even on top of the app itself
as the config is static

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`props` | [*IConfigProviderProps*](../interfaces/client_internal_providers_config_provider.iconfigproviderprops.md) | the config props    |

**Returns:** *Element*

Defined in: [client/internal/providers/config-provider.tsx:28](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/providers/config-provider.tsx#L28)
