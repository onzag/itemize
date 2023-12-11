[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/ssr/collect](../modules/server_ssr_collect.md) / IQueryCollectionResult

# Interface: IQueryCollectionResult

[server/ssr/collect](../modules/server_ssr_collect.md).IQueryCollectionResult

This is what a collection result looks like

## Hierarchy

- `IBaseCollectionResult`

  ↳ **`IQueryCollectionResult`**

## Table of contents

### Properties

- [lastModified](server_ssr_collect.IQueryCollectionResult.md#lastmodified)
- [query](server_ssr_collect.IQueryCollectionResult.md#query)
- [requestFieldsAcc](server_ssr_collect.IQueryCollectionResult.md#requestfieldsacc)
- [signature](server_ssr_collect.IQueryCollectionResult.md#signature)
- [type](server_ssr_collect.IQueryCollectionResult.md#type)

## Properties

### lastModified

• **lastModified**: `Date`

The date when the result was last modified

#### Inherited from

IBaseCollectionResult.lastModified

#### Defined in

[server/ssr/collect.ts:35](https://github.com/onzag/itemize/blob/59702dd5/server/ssr/collect.ts#L35)

___

### query

• **query**: [`ISSRCollectedQueryType`](client_internal_providers_ssr_provider.ISSRCollectedQueryType.md)

The query value, the same that is passed to the client side
this contains the value and all the attributes

#### Defined in

[server/ssr/collect.ts:73](https://github.com/onzag/itemize/blob/59702dd5/server/ssr/collect.ts#L73)

___

### requestFieldsAcc

• **requestFieldsAcc**: [`IRQRequestFields`](rq_querier.IRQRequestFields.md)

#### Defined in

[server/ssr/collect.ts:74](https://github.com/onzag/itemize/blob/59702dd5/server/ssr/collect.ts#L74)

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

• **type**: ``"query"``

#### Overrides

IBaseCollectionResult.type

#### Defined in

[server/ssr/collect.ts:75](https://github.com/onzag/itemize/blob/59702dd5/server/ssr/collect.ts#L75)
