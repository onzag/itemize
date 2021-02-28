[](../README.md) / [Exports](../modules.md) / client/fast-prototyping/wrappers

# Module: client/fast-prototyping/wrappers

Contains the fast prototyping wrappers for usage
with the itemize application in the fast prototyping mode

## Table of contents

### Functions

- [appWrapper](client_fast_prototyping_wrappers.md#appwrapper)
- [mainWrapper](client_fast_prototyping_wrappers.md#mainwrapper)

## Functions

### appWrapper

▸ **appWrapper**(`app`: React.ReactElement, `config`: [*IConfigRawJSONDataType*](../interfaces/config.iconfigrawjsondatatype.md)): *Element*

The appwrapper is the static wrapper that does not really ever change and stays on top
of the entire application for this reason, it's expected to render once

For fast prototyping we use material ui, and as such we pass those providers here

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`app` | React.ReactElement | the application that react is asking to render   |
`config` | [*IConfigRawJSONDataType*](../interfaces/config.iconfigrawjsondatatype.md) | the configuration that is being used, this is the same as the config.json    |

**Returns:** *Element*

Defined in: [client/fast-prototyping/wrappers.tsx:42](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/wrappers.tsx#L42)

___

### mainWrapper

▸ **mainWrapper**(`mainComponent`: React.ReactElement, `config`: [*IConfigRawJSONDataType*](../interfaces/config.iconfigrawjsondatatype.md), `localeContext`: [*ILocaleContextType*](../interfaces/client_internal_providers_locale_provider.ilocalecontexttype.md)): *Element*

The main wrapper stays under the app and it's a dynamic component that will be requested
to updated if the app locale context changes, which creates a chain effect

for fast prototyping we use the mui pickers utility for material ui pickers, and these
need to change according to locale

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`mainComponent` | React.ReactElement | the main component that is under the app   |
`config` | [*IConfigRawJSONDataType*](../interfaces/config.iconfigrawjsondatatype.md) | the config of the app   |
`localeContext` | [*ILocaleContextType*](../interfaces/client_internal_providers_locale_provider.ilocalecontexttype.md) | the locale that we are using    |

**Returns:** *Element*

Defined in: [client/fast-prototyping/wrappers.tsx:74](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/wrappers.tsx#L74)
