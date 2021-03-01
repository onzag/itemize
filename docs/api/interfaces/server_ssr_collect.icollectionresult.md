[](../README.md) / [Exports](../modules.md) / [server/ssr/collect](../modules/server_ssr_collect.md) / ICollectionResult

# Interface: ICollectionResult

[server/ssr/collect](../modules/server_ssr_collect.md).ICollectionResult

This is what a collection result looks like

## Table of contents

### Properties

- [lastModified](server_ssr_collect.icollectionresult.md#lastmodified)
- [query](server_ssr_collect.icollectionresult.md#query)
- [signature](server_ssr_collect.icollectionresult.md#signature)

## Properties

### lastModified

• **lastModified**: Date

The date when the result was last modified

Defined in: [server/ssr/collect.ts:26](https://github.com/onzag/itemize/blob/55e63f2c/server/ssr/collect.ts#L26)

___

### query

• **query**: [*ISSRCollectedQueryType*](client_internal_providers_ssr_provider.issrcollectedquerytype.md)

The query value, the same that is passed to the client side
this contains the value and all the attributes

Defined in: [server/ssr/collect.ts:35](https://github.com/onzag/itemize/blob/55e63f2c/server/ssr/collect.ts#L35)

___

### signature

• **signature**: *string*

The signature for this specific collection result

Defined in: [server/ssr/collect.ts:30](https://github.com/onzag/itemize/blob/55e63f2c/server/ssr/collect.ts#L30)
