[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/ssr](../modules/server_ssr.md) / ISSRServerModeInfo

# Interface: ISSRServerModeInfo

[server/ssr](../modules/server_ssr.md).ISSRServerModeInfo

## Table of contents

### Properties

- [appliedRule](server_ssr.ISSRServerModeInfo.md#appliedrule)
- [clientDetails](server_ssr.ISSRServerModeInfo.md#clientdetails)
- [collector](server_ssr.ISSRServerModeInfo.md#collector)
- [config](server_ssr.ISSRServerModeInfo.md#config)
- [ip](server_ssr.ISSRServerModeInfo.md#ip)
- [langLocales](server_ssr.ISSRServerModeInfo.md#langlocales)
- [originalUrl](server_ssr.ISSRServerModeInfo.md#originalurl)
- [root](server_ssr.ISSRServerModeInfo.md#root)
- [ssrContext](server_ssr.ISSRServerModeInfo.md#ssrcontext)
- [userLocalizationService](server_ssr.ISSRServerModeInfo.md#userlocalizationservice)

### Methods

- [redirectTo](server_ssr.ISSRServerModeInfo.md#redirectto)

## Properties

### appliedRule

• **appliedRule**: [`ISSRRule`](server_ssr.ISSRRule.md)

#### Defined in

[server/ssr/index.ts:67](https://github.com/onzag/itemize/blob/f2db74a5/server/ssr/index.ts#L67)

___

### clientDetails

• **clientDetails**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `country` | `string` |
| `currency` | `string` |
| `guessedData` | `string` |
| `lang` | `string` |

#### Defined in

[server/ssr/index.ts:55](https://github.com/onzag/itemize/blob/f2db74a5/server/ssr/index.ts#L55)

___

### collector

• `Optional` **collector**: [`ICollectorType`](client.ICollectorType.md)

#### Defined in

[server/ssr/index.ts:52](https://github.com/onzag/itemize/blob/f2db74a5/server/ssr/index.ts#L52)

___

### config

• **config**: [`IConfigRawJSONDataType`](config.IConfigRawJSONDataType.md)

#### Defined in

[server/ssr/index.ts:53](https://github.com/onzag/itemize/blob/f2db74a5/server/ssr/index.ts#L53)

___

### ip

• **ip**: `string`

#### Defined in

[server/ssr/index.ts:66](https://github.com/onzag/itemize/blob/f2db74a5/server/ssr/index.ts#L66)

___

### langLocales

• **langLocales**: [`ILangLocalesType`](base_Root.ILangLocalesType.md)

#### Defined in

[server/ssr/index.ts:61](https://github.com/onzag/itemize/blob/f2db74a5/server/ssr/index.ts#L61)

___

### originalUrl

• **originalUrl**: `string`

#### Defined in

[server/ssr/index.ts:63](https://github.com/onzag/itemize/blob/f2db74a5/server/ssr/index.ts#L63)

___

### root

• **root**: [`default`](../classes/base_Root.default.md)

#### Defined in

[server/ssr/index.ts:62](https://github.com/onzag/itemize/blob/f2db74a5/server/ssr/index.ts#L62)

___

### ssrContext

• **ssrContext**: [`ISSRContextType`](client_internal_providers_ssr_provider.ISSRContextType.md)

#### Defined in

[server/ssr/index.ts:54](https://github.com/onzag/itemize/blob/f2db74a5/server/ssr/index.ts#L54)

___

### userLocalizationService

• **userLocalizationService**: `any`

#### Defined in

[server/ssr/index.ts:65](https://github.com/onzag/itemize/blob/f2db74a5/server/ssr/index.ts#L65)

## Methods

### redirectTo

▸ **redirectTo**(`path`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`void`

#### Defined in

[server/ssr/index.ts:64](https://github.com/onzag/itemize/blob/f2db74a5/server/ssr/index.ts#L64)
