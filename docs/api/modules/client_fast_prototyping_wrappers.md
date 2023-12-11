[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/fast-prototyping/wrappers

# Module: client/fast-prototyping/wrappers

Contains the fast prototyping wrappers for usage
with the itemize application in the fast prototyping mode

## Table of contents

### Variables

- [ReuseCacheContextEmotionIsAMess](client_fast_prototyping_wrappers.md#reusecachecontextemotionisamess)

### Functions

- [appWrapper](client_fast_prototyping_wrappers.md#appwrapper)
- [createEmotionCache](client_fast_prototyping_wrappers.md#createemotioncache)
- [mainWrapper](client_fast_prototyping_wrappers.md#mainwrapper)

## Variables

### ReuseCacheContextEmotionIsAMess

• `Const` **ReuseCacheContextEmotionIsAMess**: `Context`\<`boolean`\>

#### Defined in

[client/fast-prototyping/wrappers.tsx:22](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/wrappers.tsx#L22)

## Functions

### appWrapper

▸ **appWrapper**(`app`, `config`): `Element`

The appwrapper is the static wrapper that does not really ever change and stays on top
of the entire application for this reason, it's expected to render once

For fast prototyping we use material ui, and as such we pass those providers here

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `app` | `ReactElement`\<`any`, `string` \| `JSXElementConstructor`\<`any`\>\> | the application that react is asking to render |
| `config` | [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md) | the configuration that is being used, this is the same as the config.json |

#### Returns

`Element`

#### Defined in

[client/fast-prototyping/wrappers.tsx:81](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/wrappers.tsx#L81)

___

### createEmotionCache

▸ **createEmotionCache**(`isRtl`, `useDoubleCache`): `EmotionCache`

#### Parameters

| Name | Type |
| :------ | :------ |
| `isRtl` | `boolean` |
| `useDoubleCache` | `boolean` |

#### Returns

`EmotionCache`

#### Defined in

[client/fast-prototyping/wrappers.tsx:45](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/wrappers.tsx#L45)

___

### mainWrapper

▸ **mainWrapper**(`mainComponent`, `config`, `localeContext`): `Element`

The main wrapper stays under the app and it's a dynamic component that will be requested
to updated if the app locale context changes, which creates a chain effect

for fast prototyping we use the mui pickers utility for material ui pickers, and these
need to change according to locale

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mainComponent` | `ReactElement`\<`any`, `string` \| `JSXElementConstructor`\<`any`\>\> | the main component that is under the app |
| `config` | [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md) | the config of the app |
| `localeContext` | [`ILocaleContextType`](../interfaces/client_internal_providers_locale_provider.ILocaleContextType.md) | the locale that we are using |

#### Returns

`Element`

#### Defined in

[client/fast-prototyping/wrappers.tsx:110](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/wrappers.tsx#L110)
