[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/gql-client-util](../modules/client_internal_gql_client_util.md) / ICacheMetadataMismatchAction

# Interface: ICacheMetadataMismatchAction

[client/internal/gql-client-util](../modules/client_internal_gql_client_util.md).ICacheMetadataMismatchAction

## Table of contents

### Properties

- [action](client_internal_gql_client_util.ICacheMetadataMismatchAction.md#action)
- [condition](client_internal_gql_client_util.ICacheMetadataMismatchAction.md#condition)
- [rewrite](client_internal_gql_client_util.ICacheMetadataMismatchAction.md#rewrite)

## Properties

### action

• **action**: ``"REFETCH"``

#### Defined in

[client/internal/gql-client-util.ts:52](https://github.com/onzag/itemize/blob/f2f29986/client/internal/gql-client-util.ts#L52)

___

### condition

• `Optional` **condition**: [`ICacheMetadataMismatchCondition`](client_internal_gql_client_util.ICacheMetadataMismatchCondition.md)

#### Defined in

[client/internal/gql-client-util.ts:54](https://github.com/onzag/itemize/blob/f2f29986/client/internal/gql-client-util.ts#L54)

___

### rewrite

• **rewrite**: ``"IF_CONDITION_SUCCEEDS"`` \| ``"ALWAYS"``

#### Defined in

[client/internal/gql-client-util.ts:53](https://github.com/onzag/itemize/blob/f2f29986/client/internal/gql-client-util.ts#L53)
