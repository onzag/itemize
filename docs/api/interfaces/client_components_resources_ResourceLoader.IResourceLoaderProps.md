[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/resources/ResourceLoader](../modules/client_components_resources_ResourceLoader.md) / IResourceLoaderProps

# Interface: IResourceLoaderProps

[client/components/resources/ResourceLoader](../modules/client_components_resources_ResourceLoader.md).IResourceLoaderProps

The props for the html resource loader

## Table of contents

### Properties

- [path](client_components_resources_ResourceLoader.IResourceLoaderProps.md#path)
- [src](client_components_resources_ResourceLoader.IResourceLoaderProps.md#src)
- [swCacheable](client_components_resources_ResourceLoader.IResourceLoaderProps.md#swcacheable)
- [swNetworkFirst](client_components_resources_ResourceLoader.IResourceLoaderProps.md#swnetworkfirst)
- [swRecheck](client_components_resources_ResourceLoader.IResourceLoaderProps.md#swrecheck)

### Methods

- [children](client_components_resources_ResourceLoader.IResourceLoaderProps.md#children)
- [serverSideResolver](client_components_resources_ResourceLoader.IResourceLoaderProps.md#serversideresolver)

## Properties

### path

• `Optional` **path**: `string`

the source path as a string, by default it is /rest/resource/

#### Defined in

[client/components/resources/ResourceLoader.tsx:24](https://github.com/onzag/itemize/blob/5c2808d3/client/components/resources/ResourceLoader.tsx#L24)

___

### src

• **src**: `string`

the source as a string, without the /rest/resource/ part, which is
defined in the path

#### Defined in

[client/components/resources/ResourceLoader.tsx:36](https://github.com/onzag/itemize/blob/5c2808d3/client/components/resources/ResourceLoader.tsx#L36)

___

### swCacheable

• `Optional` **swCacheable**: `boolean`

sw cacheable flag, defaults to true

#### Defined in

[client/components/resources/ResourceLoader.tsx:44](https://github.com/onzag/itemize/blob/5c2808d3/client/components/resources/ResourceLoader.tsx#L44)

___

### swNetworkFirst

• `Optional` **swNetworkFirst**: `boolean`

sw network first flag, defaults to false

#### Defined in

[client/components/resources/ResourceLoader.tsx:48](https://github.com/onzag/itemize/blob/5c2808d3/client/components/resources/ResourceLoader.tsx#L48)

___

### swRecheck

• `Optional` **swRecheck**: `boolean`

sw recheck flag, rechecks the content after done, defaults to false

#### Defined in

[client/components/resources/ResourceLoader.tsx:52](https://github.com/onzag/itemize/blob/5c2808d3/client/components/resources/ResourceLoader.tsx#L52)

## Methods

### children

▸ **children**(`data`, `loading`, `failed`): `ReactNode`

To define how the data is to be used

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` |
| `loading` | `boolean` |
| `failed` | `boolean` |

#### Returns

`ReactNode`

#### Defined in

[client/components/resources/ResourceLoader.tsx:40](https://github.com/onzag/itemize/blob/5c2808d3/client/components/resources/ResourceLoader.tsx#L40)

___

### serverSideResolver

▸ `Optional` **serverSideResolver**(`appData`): `Promise`<`string`\>

The server side resolver
TODO this has to do with the generator in order
to realize how this is resolved we need to support resources
in our SSR and request manager

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](server.IAppDataType.md) |

#### Returns

`Promise`<`string`\>

#### Defined in

[client/components/resources/ResourceLoader.tsx:31](https://github.com/onzag/itemize/blob/5c2808d3/client/components/resources/ResourceLoader.tsx#L31)
