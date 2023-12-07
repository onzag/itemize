[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/resources/ResourceLoader](../modules/client_components_resources_ResourceLoader.md) / IResourceLoaderProps

# Interface: IResourceLoaderProps

[client/components/resources/ResourceLoader](../modules/client_components_resources_ResourceLoader.md).IResourceLoaderProps

The props for the html resource loader

## Table of contents

### Properties

- [includeToken](client_components_resources_ResourceLoader.IResourceLoaderProps.md#includetoken)
- [keepContentDuringLoading](client_components_resources_ResourceLoader.IResourceLoaderProps.md#keepcontentduringloading)
- [path](client_components_resources_ResourceLoader.IResourceLoaderProps.md#path)
- [pollEvery](client_components_resources_ResourceLoader.IResourceLoaderProps.md#pollevery)
- [src](client_components_resources_ResourceLoader.IResourceLoaderProps.md#src)
- [swCacheable](client_components_resources_ResourceLoader.IResourceLoaderProps.md#swcacheable)
- [swNetworkFirst](client_components_resources_ResourceLoader.IResourceLoaderProps.md#swnetworkfirst)
- [swRecheck](client_components_resources_ResourceLoader.IResourceLoaderProps.md#swrecheck)
- [type](client_components_resources_ResourceLoader.IResourceLoaderProps.md#type)

### Methods

- [children](client_components_resources_ResourceLoader.IResourceLoaderProps.md#children)
- [clientSideResolver](client_components_resources_ResourceLoader.IResourceLoaderProps.md#clientsideresolver)
- [serverSideResolver](client_components_resources_ResourceLoader.IResourceLoaderProps.md#serversideresolver)

## Properties

### includeToken

• `Optional` **includeToken**: `boolean`

Includes the token in the header for usage in validation as token

#### Defined in

[client/components/resources/ResourceLoader.tsx:29](https://github.com/onzag/itemize/blob/a24376ed/client/components/resources/ResourceLoader.tsx#L29)

___

### keepContentDuringLoading

• `Optional` **keepContentDuringLoading**: `boolean`

The content will not change during loading
and it will be mantained as value so that the
screen does not blink

#### Defined in

[client/components/resources/ResourceLoader.tsx:78](https://github.com/onzag/itemize/blob/a24376ed/client/components/resources/ResourceLoader.tsx#L78)

___

### path

• `Optional` **path**: `string`

the source path as a string, by default it is /rest/resource/

#### Defined in

[client/components/resources/ResourceLoader.tsx:33](https://github.com/onzag/itemize/blob/a24376ed/client/components/resources/ResourceLoader.tsx#L33)

___

### pollEvery

• `Optional` **pollEvery**: `number`

Causes the resource to be requested with pooling

#### Defined in

[client/components/resources/ResourceLoader.tsx:72](https://github.com/onzag/itemize/blob/a24376ed/client/components/resources/ResourceLoader.tsx#L72)

___

### src

• `Optional` **src**: `string`

the source as a string, without the /rest/resource/ part, which is
defined in the path

#### Defined in

[client/components/resources/ResourceLoader.tsx:52](https://github.com/onzag/itemize/blob/a24376ed/client/components/resources/ResourceLoader.tsx#L52)

___

### swCacheable

• `Optional` **swCacheable**: `boolean`

sw cacheable flag, defaults to true

#### Defined in

[client/components/resources/ResourceLoader.tsx:60](https://github.com/onzag/itemize/blob/a24376ed/client/components/resources/ResourceLoader.tsx#L60)

___

### swNetworkFirst

• `Optional` **swNetworkFirst**: `boolean`

sw network first flag, defaults to false

#### Defined in

[client/components/resources/ResourceLoader.tsx:64](https://github.com/onzag/itemize/blob/a24376ed/client/components/resources/ResourceLoader.tsx#L64)

___

### swRecheck

• `Optional` **swRecheck**: `boolean`

sw recheck flag, rechecks the content after done, defaults to false

#### Defined in

[client/components/resources/ResourceLoader.tsx:68](https://github.com/onzag/itemize/blob/a24376ed/client/components/resources/ResourceLoader.tsx#L68)

___

### type

• **type**: ``"text"`` \| ``"json"`` \| ``"binary-blob"`` \| ``"binary-arraybuffer"``

Type to load

#### Defined in

[client/components/resources/ResourceLoader.tsx:82](https://github.com/onzag/itemize/blob/a24376ed/client/components/resources/ResourceLoader.tsx#L82)

## Methods

### children

▸ **children**(`data`, `loading`, `failed`): `ReactNode`

To define how the data is to be used

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `loading` | `boolean` |
| `failed` | `boolean` |

#### Returns

`ReactNode`

#### Defined in

[client/components/resources/ResourceLoader.tsx:56](https://github.com/onzag/itemize/blob/a24376ed/client/components/resources/ResourceLoader.tsx#L56)

___

### clientSideResolver

▸ `Optional` **clientSideResolver**(`fullsrc`): `string` \| `Promise`<`string`\>

A client side resolver to resolve instead of using fetch

does not support binary types

#### Parameters

| Name | Type |
| :------ | :------ |
| `fullsrc` | `string` |

#### Returns

`string` \| `Promise`<`string`\>

#### Defined in

[client/components/resources/ResourceLoader.tsx:47](https://github.com/onzag/itemize/blob/a24376ed/client/components/resources/ResourceLoader.tsx#L47)

___

### serverSideResolver

▸ `Optional` **serverSideResolver**(`appData`, `fullsrc`): [`IResourceCollectionResult`](server_ssr_collect.IResourceCollectionResult.md) \| `Promise`<[`IResourceCollectionResult`](server_ssr_collect.IResourceCollectionResult.md)\>

The server side resolver
to realize how this is resolved we need to support resources
in our SSR and request manager

does not support binary types

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](server.IAppDataType.md) |
| `fullsrc` | `string` |

#### Returns

[`IResourceCollectionResult`](server_ssr_collect.IResourceCollectionResult.md) \| `Promise`<[`IResourceCollectionResult`](server_ssr_collect.IResourceCollectionResult.md)\>

#### Defined in

[client/components/resources/ResourceLoader.tsx:41](https://github.com/onzag/itemize/blob/a24376ed/client/components/resources/ResourceLoader.tsx#L41)
