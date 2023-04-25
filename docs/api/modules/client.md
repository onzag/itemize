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

[client/index.tsx:109](https://github.com/onzag/itemize/blob/f2db74a5/client/index.tsx#L109)

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

[client/index.tsx:41](https://github.com/onzag/itemize/blob/f2db74a5/client/index.tsx#L41)

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

[client/index.tsx:118](https://github.com/onzag/itemize/blob/f2db74a5/client/index.tsx#L118)

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
| `options.serverMode?` | [`ISSRServerModeInfo`](../interfaces/server_ssr.ISSRServerModeInfo.md) | options for doing SSR, not required and shouldn't be provided when doing SSR, when server mode is set instead of doing a render, it will return a node, and an id; where id might be null, depending to the collection rules; this returned react node will not contain a router |
| `options.appWrapper?` | (`app`: `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>, `config`: [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md)) => `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\> | - |
| `options.mainWrapper?` | (`mainComponet`: `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>, `config`: [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md), `localeContext`: [`ILocaleContextType`](../interfaces/client_internal_providers_locale_provider.ILocaleContextType.md)) => `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\> | - |

#### Returns

`Promise`<{ `id`: `string` ; `node`: `ReactNode`  }\>

#### Defined in

[client/index.tsx:224](https://github.com/onzag/itemize/blob/f2db74a5/client/index.tsx#L224)
