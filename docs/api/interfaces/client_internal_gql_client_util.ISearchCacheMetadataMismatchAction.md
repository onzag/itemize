[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/gql-client-util](../modules/client_internal_gql_client_util.md) / ISearchCacheMetadataMismatchAction

# Interface: ISearchCacheMetadataMismatchAction

[client/internal/gql-client-util](../modules/client_internal_gql_client_util.md).ISearchCacheMetadataMismatchAction

## Table of contents

### Properties

- [action](client_internal_gql_client_util.ISearchCacheMetadataMismatchAction.md#action)
- [recordsRefetchCondition](client_internal_gql_client_util.ISearchCacheMetadataMismatchAction.md#recordsrefetchcondition)
- [rewrite](client_internal_gql_client_util.ISearchCacheMetadataMismatchAction.md#rewrite)

## Properties

### action

• **action**: ``"REDO_SEARCH"`` \| ``"REFETCH_RECORDS"``

#### Defined in

[client/internal/gql-client-util.ts:58](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/gql-client-util.ts#L58)

___

### recordsRefetchCondition

• `Optional` **recordsRefetchCondition**: [`ICacheMetadataMismatchCondition`](client_internal_gql_client_util.ICacheMetadataMismatchCondition.md)

#### Defined in

[client/internal/gql-client-util.ts:60](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/gql-client-util.ts#L60)

___

### rewrite

• **rewrite**: ``"IF_CONDITION_SUCCEEDS"`` \| ``"ALWAYS"``

#### Defined in

[client/internal/gql-client-util.ts:59](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/gql-client-util.ts#L59)
