[@onzag/itemize](../README.md) / [Modules](../modules.md) / client

# Module: client

Contains the internal initialization function for initializing itemize app

## Table of contents

### Interfaces

- [ICollectorType](../interfaces/client.ICollectorType.md)

### Variables

- [history](client.md#history)

### Functions

- [getCookie](client.md#getcookie)
- [importScript](client.md#importscript)
- [initializeItemizeApp](client.md#initializeitemizeapp)

## Variables

### history

• **history**: `History`<`unknown`\>

#### Defined in

[client/index.tsx:108](https://github.com/onzag/itemize/blob/5c2808d3/client/index.tsx#L108)

## Functions

### getCookie

▸ **getCookie**(`name`): `string`

Provides a single cookie based on a name, this function
is used heavily in order to retrieve the session values

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the name of the cookie to provide |

#### Returns

`string`

the value of the cookie as a string or null

#### Defined in

[client/index.tsx:40](https://github.com/onzag/itemize/blob/5c2808d3/client/index.tsx#L40)

___

### importScript

▸ **importScript**(`src`): `Promise`<`void`\>

This function imports a file given a url

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `src` | `string` | the source url |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/index.tsx:117](https://github.com/onzag/itemize/blob/5c2808d3/client/index.tsx#L117)

___

### initializeItemizeApp

▸ **initializeItemizeApp**(`rendererContext`, `mainComponent`, `options?`): `Promise`<{ `id`: `string` ; `node`: `ReactNode`  }\>

The main function that initializes the itemize app, it's meant both to work
on the server and the client side, however it's optimized for client side functionality
and SSR is secondary

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rendererContext` | [`IRendererContext`](../interfaces/client_providers_renderer.IRendererContext.md) | the renderer context to use, specifies how both entries and view should be renderer based on these instructions, and it's static and provided to all the app, the renderer context can be replaced to give a different look and feel, check out the fast prototyping renderer context for the default context which uses material ui as this. Secondary renderers can be used and injected along the app by passing the renderer arg to the react Entry or View component to use a different renderer |
| `mainComponent` | `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\> | the main application component this is basically the user custom App component that defines the entire app, this is where the developer decides what to do, and uses components mainly out of the client/components in order to build its app, with navigation and all, but also can use fast prototyping components which in term use those components as base |
| `options?` | `Object` | optional options, very useful in many circumstances |
| `options.serverMode?` | `Object` | options for doing SSR, not required and shouldn't be provided when doing SSR, when server mode is set instead of doing a render, it will return a node, and an id; where id might be null, depending to the collection rules; this returned react node will not contain a router |
| `options.serverMode.clientDetails` | `Object` | - |
| `options.serverMode.clientDetails.country` | `string` | - |
| `options.serverMode.clientDetails.currency` | `string` | - |
| `options.serverMode.clientDetails.guessedData` | `string` | - |
| `options.serverMode.clientDetails.lang` | `string` | - |
| `options.serverMode.collector?` | [`ICollectorType`](../interfaces/client.ICollectorType.md) | - |
| `options.serverMode.config` | [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md) | - |
| `options.serverMode.langLocales` | [`ILangLocalesType`](../interfaces/base_Root.ILangLocalesType.md) | - |
| `options.serverMode.req` | `any` | - |
| `options.serverMode.res` | `any` | - |
| `options.serverMode.root` | [`default`](../classes/base_Root.default.md) | - |
| `options.serverMode.ssrContext` | [`ISSRContextType`](../interfaces/client_internal_providers_ssr_provider.ISSRContextType.md) | - |
| `options.serverMode.userLocalizationService` | `any` | - |
| `options.appWrapper?` | (`app`: `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>, `config`: [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md)) => `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\> | - |
| `options.mainWrapper?` | (`mainComponet`: `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>, `config`: [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md), `localeContext`: [`ILocaleContextType`](../interfaces/client_internal_providers_locale_provider.ILocaleContextType.md)) => `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\> | - |

#### Returns

`Promise`<{ `id`: `string` ; `node`: `ReactNode`  }\>

#### Defined in

[client/index.tsx:223](https://github.com/onzag/itemize/blob/5c2808d3/client/index.tsx#L223)
