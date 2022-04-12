[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/components/resources/ResourceLoader

# Module: client/components/resources/ResourceLoader

This file contains the loader for html resources that lay within
the application and are part of its buildnumber (aka static) with caching
functionality

TODO this is incomplete as the ssr context is not properly collecting

## Table of contents

### Interfaces

- [IResourceLoaderProps](../interfaces/client_components_resources_ResourceLoader.IResourceLoaderProps.md)

### Functions

- [default](client_components_resources_ResourceLoader.md#default)

## Functions

### default

▸ **default**(`props`): `Element`

Displays a html resource that is included within the resources that this application
is shipped with

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IResourceLoaderProps`](../interfaces/client_components_resources_ResourceLoader.IResourceLoaderProps.md) | the resource loader props |

#### Returns

`Element`

an react component that wraps this html content

#### Defined in

[client/components/resources/ResourceLoader.tsx:272](https://github.com/onzag/itemize/blob/5c2808d3/client/components/resources/ResourceLoader.tsx#L272)