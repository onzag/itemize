[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server](../modules/server.md) / ISSRConfig

# Interface: ISSRConfig

[server](../modules/server.md).ISSRConfig

Specifies the SSR configuration for the multiple pages

## Table of contents

### Properties

- [collector](server.ISSRConfig.md#collector)
- [mainComponent](server.ISSRConfig.md#maincomponent)
- [rendererContext](server.ISSRConfig.md#renderercontext)
- [ussdConfig](server.ISSRConfig.md#ussdconfig)

### Methods

- [appWrapper](server.ISSRConfig.md#appwrapper)
- [mainWrapper](server.ISSRConfig.md#mainwrapper)

## Properties

### collector

• `Optional` **collector**: [`ICollectorType`](client.ICollectorType.md)

#### Defined in

[server/index.ts:110](https://github.com/onzag/itemize/blob/5c2808d3/server/index.ts#L110)

___

### mainComponent

• **mainComponent**: `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>

#### Defined in

[server/index.ts:107](https://github.com/onzag/itemize/blob/5c2808d3/server/index.ts#L107)

___

### rendererContext

• **rendererContext**: [`IRendererContext`](client_providers_renderer.IRendererContext.md)

#### Defined in

[server/index.ts:106](https://github.com/onzag/itemize/blob/5c2808d3/server/index.ts#L106)

___

### ussdConfig

• `Optional` **ussdConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `collector?` | [`ICollectorType`](client.ICollectorType.md) |
| `mainComponent` | `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\> |
| `rendererContext` | [`IRendererContext`](client_providers_renderer.IRendererContext.md) |
| `appWrapper?` | (`app`: `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>, `config`: [`IConfigRawJSONDataType`](config.IConfigRawJSONDataType.md)) => `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\> |
| `mainWrapper?` | (`mainComponet`: `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>, `config`: [`IConfigRawJSONDataType`](config.IConfigRawJSONDataType.md), `localeContext`: [`ILocaleContextType`](client_internal_providers_locale_provider.ILocaleContextType.md)) => `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\> |

#### Defined in

[server/index.ts:111](https://github.com/onzag/itemize/blob/5c2808d3/server/index.ts#L111)

## Methods

### appWrapper

▸ `Optional` **appWrapper**(`app`, `config`): `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\> |
| `config` | [`IConfigRawJSONDataType`](config.IConfigRawJSONDataType.md) |

#### Returns

`ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>

#### Defined in

[server/index.ts:108](https://github.com/onzag/itemize/blob/5c2808d3/server/index.ts#L108)

___

### mainWrapper

▸ `Optional` **mainWrapper**(`mainComponet`, `config`, `localeContext`): `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mainComponet` | `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\> |
| `config` | [`IConfigRawJSONDataType`](config.IConfigRawJSONDataType.md) |
| `localeContext` | [`ILocaleContextType`](client_internal_providers_locale_provider.ILocaleContextType.md) |

#### Returns

`ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>

#### Defined in

[server/index.ts:109](https://github.com/onzag/itemize/blob/5c2808d3/server/index.ts#L109)
