[@onzag/itemize](../README.md) / [Modules](../modules.md) / [gql-querier](../modules/gql_querier.md) / IGQLEndpointValue

# Interface: IGQLEndpointValue

[gql-querier](../modules/gql_querier.md).IGQLEndpointValue

A graphql endpoint output

## Table of contents

### Properties

- [data](gql_querier.IGQLEndpointValue.md#data)
- [errors](gql_querier.IGQLEndpointValue.md#errors)

## Properties

### data

• **data**: `Object`

#### Index signature

▪ [key: `string`]: [`IGQLValue`](gql_querier.IGQLValue.md)

#### Defined in

[gql-querier.ts:146](https://github.com/onzag/itemize/blob/5c2808d3/gql-querier.ts#L146)

___

### errors

• `Optional` **errors**: { `extensions`: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype) ; `path?`: `string`[]  }[]

#### Defined in

[gql-querier.ts:149](https://github.com/onzag/itemize/blob/5c2808d3/gql-querier.ts#L149)