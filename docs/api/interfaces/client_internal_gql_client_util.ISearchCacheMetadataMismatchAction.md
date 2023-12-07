[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/gql-client-util](../modules/client_internal_gql_client_util.md) / ISearchCacheMetadataMismatchAction

# Interface: ISearchCacheMetadataMismatchAction

[client/internal/gql-client-util](../modules/client_internal_gql_client_util.md).ISearchCacheMetadataMismatchAction

The search action to perform if a mismatch is detected

## Table of contents

### Properties

- [action](client_internal_gql_client_util.ISearchCacheMetadataMismatchAction.md#action)
- [recordsRefetchCondition](client_internal_gql_client_util.ISearchCacheMetadataMismatchAction.md#recordsrefetchcondition)
- [rewrite](client_internal_gql_client_util.ISearchCacheMetadataMismatchAction.md#rewrite)

## Properties

### action

• **action**: ``"NONE"`` \| ``"REDO_SEARCH"`` \| ``"REFETCH_RECORDS"``

The action to perform for this mismatch
REDO_SEARCH will simply redo all the search
REFETCH_RECORDS will refetch specific records based on the recordsRefetchCondition which should be provided

#### Defined in

[client/internal/gql-client-util.ts:106](https://github.com/onzag/itemize/blob/a24376ed/client/internal/gql-client-util.ts#L106)

___

### recordsRefetchCondition

• `Optional` **recordsRefetchCondition**: [`ICacheMetadataMismatchCondition`](client_internal_gql_client_util.ICacheMetadataMismatchCondition.md)

The condition to use when REFETCH_RECORDS is used

#### Defined in

[client/internal/gql-client-util.ts:117](https://github.com/onzag/itemize/blob/a24376ed/client/internal/gql-client-util.ts#L117)

___

### rewrite

• **rewrite**: ``"ALWAYS"`` \| ``"IF_CONDITION_SUCCEEDS"`` \| ``"NEVER"``

Specifies whether the metadata itself should be rewritten
into the cache, ALWAYS is preferrable

IF_CONDITION_SUCCEEDS is only useful when it is set to REFETCH_RECORDS

#### Defined in

[client/internal/gql-client-util.ts:113](https://github.com/onzag/itemize/blob/a24376ed/client/internal/gql-client-util.ts#L113)
