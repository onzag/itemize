[](../README.md) / [Exports](../modules.md) / [gql-querier](../modules/gql_querier.md) / GQLVar

# Class: GQLVar

[gql-querier](../modules/gql_querier.md).GQLVar

A grapqhl variable

## Hierarchy

* [*GQLRaw*](gql_querier.gqlraw.md)

  ↳ **GQLVar**

## Table of contents

### Constructors

- [constructor](gql_querier.gqlvar.md#constructor)

### Properties

- [\_\_type\_\_](gql_querier.gqlvar.md#__type__)
- [value](gql_querier.gqlvar.md#value)

### Methods

- [toJSON](gql_querier.gqlvar.md#tojson)

## Constructors

### constructor

\+ **new GQLVar**(`value`: *string*): [*GQLVar*](gql_querier.gqlvar.md)

#### Parameters:

Name | Type |
:------ | :------ |
`value` | *string* |

**Returns:** [*GQLVar*](gql_querier.gqlvar.md)

Inherited from: [GQLRaw](gql_querier.gqlraw.md)

Defined in: [gql-querier.ts:497](https://github.com/onzag/itemize/blob/28218320/gql-querier.ts#L497)

## Properties

### \_\_type\_\_

• **\_\_type\_\_**: *string*= "GQLVar"

Overrides: [GQLRaw](gql_querier.gqlraw.md).[__type__](gql_querier.gqlraw.md#__type__)

Defined in: [gql-querier.ts:522](https://github.com/onzag/itemize/blob/28218320/gql-querier.ts#L522)

___

### value

• **value**: *string*

Inherited from: [GQLRaw](gql_querier.gqlraw.md).[value](gql_querier.gqlraw.md#value)

Defined in: [gql-querier.ts:495](https://github.com/onzag/itemize/blob/28218320/gql-querier.ts#L495)

## Methods

### toJSON

▸ **toJSON**(): *object*

**Returns:** *object*

Name | Type |
:------ | :------ |
`__type__` | *string* |
`value` | *string* |

Inherited from: [GQLRaw](gql_querier.gqlraw.md)

Defined in: [gql-querier.ts:501](https://github.com/onzag/itemize/blob/28218320/gql-querier.ts#L501)
