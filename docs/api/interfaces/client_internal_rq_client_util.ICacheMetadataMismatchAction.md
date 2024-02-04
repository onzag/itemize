[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/rq-client-util](../modules/client_internal_rq_client_util.md) / ICacheMetadataMismatchAction

# Interface: ICacheMetadataMismatchAction

[client/internal/rq-client-util](../modules/client_internal_rq_client_util.md).ICacheMetadataMismatchAction

## Table of contents

### Properties

- [action](client_internal_rq_client_util.ICacheMetadataMismatchAction.md#action)
- [condition](client_internal_rq_client_util.ICacheMetadataMismatchAction.md#condition)
- [rewrite](client_internal_rq_client_util.ICacheMetadataMismatchAction.md#rewrite)

## Properties

### action

• **action**: ``"NONE"`` \| ``"REFETCH"``

The action to perform for this singular item
REFETCH will retrieve the record again from the server

#### Defined in

[client/internal/rq-client-util.ts:83](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/rq-client-util.ts#L83)

___

### condition

• `Optional` **condition**: [`ICacheMetadataMismatchCondition`](client_internal_rq_client_util.ICacheMetadataMismatchCondition.md)

The condition to use when REFETCH is used

#### Defined in

[client/internal/rq-client-util.ts:94](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/rq-client-util.ts#L94)

___

### rewrite

• **rewrite**: ``"IF_CONDITION_SUCCEEDS"`` \| ``"ALWAYS"`` \| ``"NEVER"``

Specifies whether the metadata itself should be rewritten
into the cache, ALWAYS is preferrable

IF_CONDITION_SUCCEEDS is only useful when it is set to REFETCH_RECORDS

#### Defined in

[client/internal/rq-client-util.ts:90](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/rq-client-util.ts#L90)
