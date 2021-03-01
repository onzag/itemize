[](../README.md) / [Exports](../modules.md) / [gql-querier](../modules/gql_querier.md) / GQLRaw

# Class: GQLRaw

[gql-querier](../modules/gql_querier.md).GQLRaw

The __type__ allows for serialization of args
this might happen during RPC events it is reconstructed
in the class above

## Hierarchy

* **GQLRaw**

  ↳ [*GQLEnum*](gql_querier.gqlenum.md)

  ↳ [*GQLVar*](gql_querier.gqlvar.md)

## Table of contents

### Constructors

- [constructor](gql_querier.gqlraw.md#constructor)

### Properties

- [\_\_type\_\_](gql_querier.gqlraw.md#__type__)
- [value](gql_querier.gqlraw.md#value)

### Methods

- [toJSON](gql_querier.gqlraw.md#tojson)

## Constructors

### constructor

\+ **new GQLRaw**(`value`: *string*): [*GQLRaw*](gql_querier.gqlraw.md)

#### Parameters:

Name | Type |
:------ | :------ |
`value` | *string* |

**Returns:** [*GQLRaw*](gql_querier.gqlraw.md)

Defined in: [gql-querier.ts:497](https://github.com/onzag/itemize/blob/55e63f2c/gql-querier.ts#L497)

## Properties

### \_\_type\_\_

• **\_\_type\_\_**: *string*= "GQLRaw"

Defined in: [gql-querier.ts:497](https://github.com/onzag/itemize/blob/55e63f2c/gql-querier.ts#L497)

___

### value

• **value**: *string*

Defined in: [gql-querier.ts:495](https://github.com/onzag/itemize/blob/55e63f2c/gql-querier.ts#L495)

## Methods

### toJSON

▸ **toJSON**(): *object*

**Returns:** *object*

Name | Type |
:------ | :------ |
`__type__` | *string* |
`value` | *string* |

Defined in: [gql-querier.ts:501](https://github.com/onzag/itemize/blob/55e63f2c/gql-querier.ts#L501)
