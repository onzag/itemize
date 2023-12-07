[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/gql-client-util](../modules/client_internal_gql_client_util.md) / ICacheMetadataMismatchCondition

# Interface: ICacheMetadataMismatchCondition

[client/internal/gql-client-util](../modules/client_internal_gql_client_util.md).ICacheMetadataMismatchCondition

Represents a condition to use with item data
that is used to invalidate them

## Table of contents

### Properties

- [custom](client_internal_gql_client_util.ICacheMetadataMismatchCondition.md#custom)
- [isBlocked](client_internal_gql_client_util.ICacheMetadataMismatchCondition.md#isblocked)
- [isNotFound](client_internal_gql_client_util.ICacheMetadataMismatchCondition.md#isnotfound)
- [metadataComparison](client_internal_gql_client_util.ICacheMetadataMismatchCondition.md#metadatacomparison)

## Properties

### custom

• `Optional` **custom**: [`ICacheMetadataMismatchConditionRule`](client_internal_gql_client_util.ICacheMetadataMismatchConditionRule.md)

This is only relevant for non-blocked and found items
that have been cached into the database, in this case
we can specify a per property rule for fetching new records

#### Defined in

[client/internal/gql-client-util.ts:60](https://github.com/onzag/itemize/blob/a24376ed/client/internal/gql-client-util.ts#L60)

___

### isBlocked

• `Optional` **isBlocked**: `boolean`

The item is blocked, items that are blocked will match
this condition

#### Defined in

[client/internal/gql-client-util.ts:65](https://github.com/onzag/itemize/blob/a24376ed/client/internal/gql-client-util.ts#L65)

___

### isNotFound

• `Optional` **isNotFound**: `boolean`

The item is not found, it has either been deleted or
something has happened to it that the record was missing

#### Defined in

[client/internal/gql-client-util.ts:70](https://github.com/onzag/itemize/blob/a24376ed/client/internal/gql-client-util.ts#L70)

___

### metadataComparison

• `Optional` **metadataComparison**: `cacheMetadataComparisonFn`

Matches the condition by a simple metadata comparison
from the old metadata and the new metadata

#### Defined in

[client/internal/gql-client-util.ts:75](https://github.com/onzag/itemize/blob/a24376ed/client/internal/gql-client-util.ts#L75)
