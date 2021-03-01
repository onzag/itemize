[](../README.md) / [Exports](../modules.md) / client

# Module: client

Contains the internal initialization function for initializing itemize app

## Table of contents

### Interfaces

- [ICollectorType](../interfaces/client.icollectortype.md)

### Variables

- [history](client.md#history)

### Functions

- [getCookie](client.md#getcookie)
- [importScript](client.md#importscript)
- [initializeItemizeApp](client.md#initializeitemizeapp)

## Variables

### history

• `Const` **history**: *History*<{}\>

Defined in: [client/index.tsx:108](https://github.com/onzag/itemize/blob/0569bdf2/client/index.tsx#L108)

## Functions

### getCookie

▸ **getCookie**(`name`: *string*): *string*

Provides a single cookie based on a name, this function
is used heavily in order to retrieve the session values

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | the name of the cookie to provide   |

**Returns:** *string*

the value of the cookie as a string or null

Defined in: [client/index.tsx:40](https://github.com/onzag/itemize/blob/0569bdf2/client/index.tsx#L40)

___

### importScript

▸ **importScript**(`src`: *string*): *Promise*<void\>

This function imports a file given a url

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`src` | *string* | the source url    |

**Returns:** *Promise*<void\>

Defined in: [client/index.tsx:117](https://github.com/onzag/itemize/blob/0569bdf2/client/index.tsx#L117)

___

### initializeItemizeApp

▸ **initializeItemizeApp**(`rendererContext`: [*IRendererContext*](../interfaces/client_providers_renderer.irenderercontext.md), `mainComponent`: React.ReactElement, `options?`: { `appWrapper?`: (`app`: React.ReactElement, `config`: [*IConfigRawJSONDataType*](../interfaces/config.iconfigrawjsondatatype.md)) => React.ReactElement ; `mainWrapper?`: (`mainComponet`: React.ReactElement, `config`: [*IConfigRawJSONDataType*](../interfaces/config.iconfigrawjsondatatype.md), `localeContext`: [*ILocaleContextType*](../interfaces/client_internal_providers_locale_provider.ilocalecontexttype.md)) => React.ReactElement ; `serverMode?`: { `clientDetails`: { `country`: *string* ; `currency`: *string* ; `guessedData`: *string* ; `lang`: *string*  } ; `collector?`: [*ICollectorType*](../interfaces/client.icollectortype.md) ; `config`: [*IConfigRawJSONDataType*](../interfaces/config.iconfigrawjsondatatype.md) ; `langLocales`: [*ILangLocalesType*](../interfaces/root.ilanglocalestype.md) ; `req`: *any* ; `res`: *any* ; `root`: [*default*](../classes/root.default.md) ; `ssrContext`: [*ISSRContextType*](../interfaces/client_internal_providers_ssr_provider.issrcontexttype.md) ; `userLocalizationService`: *any*  }  }): *Promise*<{ `id`: *string* ; `node`: ReactNode  }\>

The main function that initializes the itemize app, it's meant both to work
on the server and the client side, however it's optimized for client side functionality
and SSR is secondary

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rendererContext` | [*IRendererContext*](../interfaces/client_providers_renderer.irenderercontext.md) | the renderer context to use, specifies how both entries and view should be renderer based on these instructions, and it's static and provided to all the app, the renderer context can be replaced to give a different look and feel, check out the fast prototyping renderer context for the default context which uses material ui as this. Secondary renderers can be used and injected along the app by passing the renderer arg to the react Entry or View component to use a different renderer   |
`mainComponent` | React.ReactElement | the main application component this is basically the user custom App component that defines the entire app, this is where the developer decides what to do, and uses components mainly out of the client/components in order to build its app, with navigation and all, but also can use fast prototyping components which in term use those components as base   |
`options?` | *object* | optional options, very useful in many circumstances   |
`options.appWrapper?` | (`app`: React.ReactElement, `config`: [*IConfigRawJSONDataType*](../interfaces/config.iconfigrawjsondatatype.md)) => React.ReactElement | a function that wraps the application itself, and executes only once over the initialization of the app, it acts like a react component that should return a react element, allows to put static things in the app on top of it that are required (likely by the renderers or other custom components) such as providers, eg. for fast prototyping the app wrapper will add the material UI theme provider as well as the CSS baseline. NOTE that the app wrapper despite being wrapping the app, the app itself (and as such this wrapper) sits under the config provider, ssr provider, route provider, and the renderer context provider so it's totally possible for the app wrapper to access these, even when it's absolutely not recommended.   |
`options.mainWrapper?` | (`mainComponet`: React.ReactElement, `config`: [*IConfigRawJSONDataType*](../interfaces/config.iconfigrawjsondatatype.md), `localeContext`: [*ILocaleContextType*](../interfaces/client_internal_providers_locale_provider.ilocalecontexttype.md)) => React.ReactElement | a function that wraps the main component that was given, the main component sits under the true application under the locale context provider and the token provider, it provides as arguments the config and the locale context; the main wrapper can execute several times any time the main component top context changes, as such ensure that it's effective enough, the mainWrapper is only truly expected to execute these several times during login/out events and any localization change; this is then where you put localization sensitive provider, eg. in the case of fast prototyping the moment utils provider which is locale sensitive is passed here   |
`options.serverMode?` | *object* | options for doing SSR, not required and shouldn't be provided when doing SSR, when server mode is set instead of doing a render, it will return a node, and an id; where id might be null, depending to the collection rules; this returned react node will not contain a router   |
`options.serverMode.clientDetails` | *object* | - |
`options.serverMode.clientDetails.country` | *string* | - |
`options.serverMode.clientDetails.currency` | *string* | - |
`options.serverMode.clientDetails.guessedData` | *string* | - |
`options.serverMode.clientDetails.lang` | *string* | - |
`options.serverMode.collector?` | [*ICollectorType*](../interfaces/client.icollectortype.md) | - |
`options.serverMode.config` | [*IConfigRawJSONDataType*](../interfaces/config.iconfigrawjsondatatype.md) | - |
`options.serverMode.langLocales` | [*ILangLocalesType*](../interfaces/root.ilanglocalestype.md) | - |
`options.serverMode.req` | *any* | - |
`options.serverMode.res` | *any* | - |
`options.serverMode.root` | [*default*](../classes/root.default.md) | - |
`options.serverMode.ssrContext` | [*ISSRContextType*](../interfaces/client_internal_providers_ssr_provider.issrcontexttype.md) | - |
`options.serverMode.userLocalizationService` | *any* | - |

**Returns:** *Promise*<{ `id`: *string* ; `node`: ReactNode  }\>

Defined in: [client/index.tsx:221](https://github.com/onzag/itemize/blob/0569bdf2/client/index.tsx#L221)
