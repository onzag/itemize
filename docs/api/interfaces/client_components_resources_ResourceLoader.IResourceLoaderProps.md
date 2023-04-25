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
- [serverSideResolver](client_components_resources_ResourceLoader.IResourceLoaderProps.md#serversideresolver)

## Properties

### includeToken

• `Optional` **includeToken**: `boolean`

Includes the token in the header for usage in validation as token

#### Defined in

[client/components/resources/ResourceLoader.tsx:26](https://github.com/onzag/itemize/blob/f2db74a5/client/components/resources/ResourceLoader.tsx#L26)

___

### keepContentDuringLoading

• `Optional` **keepContentDuringLoading**: `boolean`

The content will not change during loading
and it will be mantained as value so that the
screen does not blink

#### Defined in

[client/components/resources/ResourceLoader.tsx:68](https://github.com/onzag/itemize/blob/f2db74a5/client/components/resources/ResourceLoader.tsx#L68)

___

### path

• `Optional` **path**: `string`

the source path as a string, by default it is /rest/resource/

#### Defined in

[client/components/resources/ResourceLoader.tsx:30](https://github.com/onzag/itemize/blob/f2db74a5/client/components/resources/ResourceLoader.tsx#L30)

___

### pollEvery

• `Optional` **pollEvery**: `number`

Causes the resource to be requested with pooling

#### Defined in

[client/components/resources/ResourceLoader.tsx:62](https://github.com/onzag/itemize/blob/f2db74a5/client/components/resources/ResourceLoader.tsx#L62)

___

### src

• **src**: `string`

the source as a string, without the /rest/resource/ part, which is
defined in the path

#### Defined in

[client/components/resources/ResourceLoader.tsx:42](https://github.com/onzag/itemize/blob/f2db74a5/client/components/resources/ResourceLoader.tsx#L42)

___

### swCacheable

• `Optional` **swCacheable**: `boolean`

sw cacheable flag, defaults to true

#### Defined in

[client/components/resources/ResourceLoader.tsx:50](https://github.com/onzag/itemize/blob/f2db74a5/client/components/resources/ResourceLoader.tsx#L50)

___

### swNetworkFirst

• `Optional` **swNetworkFirst**: `boolean`

sw network first flag, defaults to false

#### Defined in

[client/components/resources/ResourceLoader.tsx:54](https://github.com/onzag/itemize/blob/f2db74a5/client/components/resources/ResourceLoader.tsx#L54)

___

### swRecheck

• `Optional` **swRecheck**: `boolean`

sw recheck flag, rechecks the content after done, defaults to false

#### Defined in

[client/components/resources/ResourceLoader.tsx:58](https://github.com/onzag/itemize/blob/f2db74a5/client/components/resources/ResourceLoader.tsx#L58)

___

### type

• **type**: ``"text"`` \| ``"json"`` \| ``"binary-blob"`` \| ``"binary-arraybuffer"``

Type to load

#### Defined in

[client/components/resources/ResourceLoader.tsx:72](https://github.com/onzag/itemize/blob/f2db74a5/client/components/resources/ResourceLoader.tsx#L72)

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

[client/components/resources/ResourceLoader.tsx:46](https://github.com/onzag/itemize/blob/f2db74a5/client/components/resources/ResourceLoader.tsx#L46)

___

### serverSideResolver

▸ `Optional` **serverSideResolver**(`appData`): `Promise`<[`IResourceCollectionResult`](server_ssr_collect.IResourceCollectionResult.md)\>

The server side resolver
TODO this has to do with the generator in order
to realize how this is resolved we need to support resources
in our SSR and request manager

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](server.IAppDataType.md) |

#### Returns

`Promise`<[`IResourceCollectionResult`](server_ssr_collect.IResourceCollectionResult.md)\>

#### Defined in

[client/components/resources/ResourceLoader.tsx:37](https://github.com/onzag/itemize/blob/f2db74a5/client/components/resources/ResourceLoader.tsx#L37)
