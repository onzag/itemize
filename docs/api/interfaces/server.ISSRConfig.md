[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server](../modules/server.md) / ISSRConfig

# Interface: ISSRConfig

[server](../modules/server.md).ISSRConfig

Specifies the SSR configuration for the multiple pages

## Table of contents

### Properties

- [appWrapper](server.ISSRConfig.md#appwrapper)
- [collector](server.ISSRConfig.md#collector)
- [mainComponent](server.ISSRConfig.md#maincomponent)
- [mainWrapper](server.ISSRConfig.md#mainwrapper)
- [rendererContext](server.ISSRConfig.md#renderercontext)
- [ussdConfig](server.ISSRConfig.md#ussdconfig)

## Properties

### appWrapper

• `Optional` **appWrapper**: (`app`: `ReactElement`\<`any`, `string` \| `JSXElementConstructor`\<`any`\>\>, `config`: [`IConfigRawJSONDataType`](config.IConfigRawJSONDataType.md)) => `ReactElement`\<`any`, `string` \| `JSXElementConstructor`\<`any`\>\>

#### Type declaration

▸ (`app`, `config`): `ReactElement`\<`any`, `string` \| `JSXElementConstructor`\<`any`\>\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `app` | `ReactElement`\<`any`, `string` \| `JSXElementConstructor`\<`any`\>\> |
| `config` | [`IConfigRawJSONDataType`](config.IConfigRawJSONDataType.md) |

##### Returns

`ReactElement`\<`any`, `string` \| `JSXElementConstructor`\<`any`\>\>

#### Defined in

[server/index.ts:156](https://github.com/onzag/itemize/blob/73e0c39e/server/index.ts#L156)

___

### collector

• `Optional` **collector**: [`ICollectorType`](client.ICollectorType.md)

#### Defined in

[server/index.ts:158](https://github.com/onzag/itemize/blob/73e0c39e/server/index.ts#L158)

___

### mainComponent

• **mainComponent**: `ReactElement`\<`any`, `string` \| `JSXElementConstructor`\<`any`\>\>

#### Defined in

[server/index.ts:155](https://github.com/onzag/itemize/blob/73e0c39e/server/index.ts#L155)

___

### mainWrapper

• `Optional` **mainWrapper**: (`mainComponet`: `ReactElement`\<`any`, `string` \| `JSXElementConstructor`\<`any`\>\>, `config`: [`IConfigRawJSONDataType`](config.IConfigRawJSONDataType.md), `localeContext`: [`ILocaleContextType`](client_internal_providers_locale_provider.ILocaleContextType.md)) => `ReactElement`\<`any`, `string` \| `JSXElementConstructor`\<`any`\>\>

#### Type declaration

▸ (`mainComponet`, `config`, `localeContext`): `ReactElement`\<`any`, `string` \| `JSXElementConstructor`\<`any`\>\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `mainComponet` | `ReactElement`\<`any`, `string` \| `JSXElementConstructor`\<`any`\>\> |
| `config` | [`IConfigRawJSONDataType`](config.IConfigRawJSONDataType.md) |
| `localeContext` | [`ILocaleContextType`](client_internal_providers_locale_provider.ILocaleContextType.md) |

##### Returns

`ReactElement`\<`any`, `string` \| `JSXElementConstructor`\<`any`\>\>

#### Defined in

[server/index.ts:157](https://github.com/onzag/itemize/blob/73e0c39e/server/index.ts#L157)

___

### rendererContext

• **rendererContext**: [`IRendererContext`](client_providers_renderer.IRendererContext.md)

#### Defined in

[server/index.ts:154](https://github.com/onzag/itemize/blob/73e0c39e/server/index.ts#L154)

___

### ussdConfig

• `Optional` **ussdConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `appWrapper?` | (`app`: `ReactElement`\<`any`, `string` \| `JSXElementConstructor`\<`any`\>\>, `config`: [`IConfigRawJSONDataType`](config.IConfigRawJSONDataType.md)) => `ReactElement`\<`any`, `string` \| `JSXElementConstructor`\<`any`\>\> |
| `mainComponent` | `ReactElement`\<`any`, `string` \| `JSXElementConstructor`\<`any`\>\> |
| `mainWrapper?` | (`mainComponet`: `ReactElement`\<`any`, `string` \| `JSXElementConstructor`\<`any`\>\>, `config`: [`IConfigRawJSONDataType`](config.IConfigRawJSONDataType.md), `localeContext`: [`ILocaleContextType`](client_internal_providers_locale_provider.ILocaleContextType.md)) => `ReactElement`\<`any`, `string` \| `JSXElementConstructor`\<`any`\>\> |
| `rendererContext` | [`IRendererContext`](client_providers_renderer.IRendererContext.md) |

#### Defined in

[server/index.ts:159](https://github.com/onzag/itemize/blob/73e0c39e/server/index.ts#L159)
