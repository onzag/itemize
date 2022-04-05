[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/ssr/collect](../modules/server_ssr_collect.md) / ICollectionResult

# Interface: ICollectionResult

[server/ssr/collect](../modules/server_ssr_collect.md).ICollectionResult

This is what a collection result looks like

## Table of contents

### Properties

- [lastModified](server_ssr_collect.ICollectionResult.md#lastmodified)
- [query](server_ssr_collect.ICollectionResult.md#query)
- [signature](server_ssr_collect.ICollectionResult.md#signature)

## Properties

### lastModified

• **lastModified**: `Date`

The date when the result was last modified

#### Defined in

[server/ssr/collect.ts:28](https://github.com/onzag/itemize/blob/5c2808d3/server/ssr/collect.ts#L28)

___

### query

• **query**: [`ISSRCollectedQueryType`](client_internal_providers_ssr_provider.ISSRCollectedQueryType.md)

The query value, the same that is passed to the client side
this contains the value and all the attributes

#### Defined in

[server/ssr/collect.ts:37](https://github.com/onzag/itemize/blob/5c2808d3/server/ssr/collect.ts#L37)

___

### signature

• **signature**: `string`

The signature for this specific collection result

#### Defined in

[server/ssr/collect.ts:32](https://github.com/onzag/itemize/blob/5c2808d3/server/ssr/collect.ts#L32)
