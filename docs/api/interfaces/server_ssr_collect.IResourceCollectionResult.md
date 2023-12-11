[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/ssr/collect](../modules/server_ssr_collect.md) / IResourceCollectionResult

# Interface: IResourceCollectionResult

[server/ssr/collect](../modules/server_ssr_collect.md).IResourceCollectionResult

## Hierarchy

- `IBaseCollectionResult`

  ↳ **`IResourceCollectionResult`**

## Table of contents

### Properties

- [data](server_ssr_collect.IResourceCollectionResult.md#data)
- [lastModified](server_ssr_collect.IResourceCollectionResult.md#lastmodified)
- [signature](server_ssr_collect.IResourceCollectionResult.md#signature)
- [type](server_ssr_collect.IResourceCollectionResult.md#type)

## Properties

### data

• **data**: `string`

The data collected if any

#### Defined in

[server/ssr/collect.ts:54](https://github.com/onzag/itemize/blob/59702dd5/server/ssr/collect.ts#L54)

___

### lastModified

• **lastModified**: `Date`

The date when the result was last modified

#### Inherited from

IBaseCollectionResult.lastModified

#### Defined in

[server/ssr/collect.ts:35](https://github.com/onzag/itemize/blob/59702dd5/server/ssr/collect.ts#L35)

___

### signature

• **signature**: `string`

The signature for this specific collection result
make it something unique, and include the last modified date within it
separate by dots, this specifies this exact data point

#### Inherited from

IBaseCollectionResult.signature

#### Defined in

[server/ssr/collect.ts:41](https://github.com/onzag/itemize/blob/59702dd5/server/ssr/collect.ts#L41)

___

### type

• **type**: ``"resource"``

The type collected

#### Overrides

IBaseCollectionResult.type

#### Defined in

[server/ssr/collect.ts:58](https://github.com/onzag/itemize/blob/59702dd5/server/ssr/collect.ts#L58)
