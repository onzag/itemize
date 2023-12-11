[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/ssr/collect](../modules/server_ssr_collect.md) / ISearchCollectionResult

# Interface: ISearchCollectionResult

[server/ssr/collect](../modules/server_ssr_collect.md).ISearchCollectionResult

## Hierarchy

- `IBaseCollectionResult`

  ↳ **`ISearchCollectionResult`**

## Table of contents

### Properties

- [lastModified](server_ssr_collect.ISearchCollectionResult.md#lastmodified)
- [search](server_ssr_collect.ISearchCollectionResult.md#search)
- [signature](server_ssr_collect.ISearchCollectionResult.md#signature)
- [type](server_ssr_collect.ISearchCollectionResult.md#type)

## Properties

### lastModified

• **lastModified**: `Date`

The date when the result was last modified

#### Inherited from

IBaseCollectionResult.lastModified

#### Defined in

[server/ssr/collect.ts:35](https://github.com/onzag/itemize/blob/59702dd5/server/ssr/collect.ts#L35)

___

### search

• **search**: [`ISSRCollectedSearchType`](client_internal_providers_ssr_provider.ISSRCollectedSearchType.md)

#### Defined in

[server/ssr/collect.ts:79](https://github.com/onzag/itemize/blob/59702dd5/server/ssr/collect.ts#L79)

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

• **type**: ``"search"``

#### Overrides

IBaseCollectionResult.type

#### Defined in

[server/ssr/collect.ts:80](https://github.com/onzag/itemize/blob/59702dd5/server/ssr/collect.ts#L80)
