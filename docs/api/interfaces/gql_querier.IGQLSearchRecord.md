[@onzag/itemize](../README.md) / [Modules](../modules.md) / [gql-querier](../modules/gql_querier.md) / IGQLSearchRecord

# Interface: IGQLSearchRecord

[gql-querier](../modules/gql_querier.md).IGQLSearchRecord

Search results as they are provided
by the search function, they are based
on the SEARCH_RECORD in the graphql types
that graphql returns

## Table of contents

### Properties

- [id](gql_querier.IGQLSearchRecord.md#id)
- [last\_modified](gql_querier.IGQLSearchRecord.md#last_modified)
- [type](gql_querier.IGQLSearchRecord.md#type)
- [version](gql_querier.IGQLSearchRecord.md#version)

## Properties

### id

• **id**: `string`

The id for the pg id

#### Defined in

[gql-querier.ts:31](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L31)

___

### last\_modified

• **last\_modified**: `string`

Whent he record was created

#### Defined in

[gql-querier.ts:39](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L39)

___

### type

• **type**: `string`

The type of the search record, basically a qualified name

#### Defined in

[gql-querier.ts:27](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L27)

___

### version

• **version**: `string`

The version for the pg version

#### Defined in

[gql-querier.ts:35](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L35)
