[@onzag/itemize](../README.md) / [Modules](../modules.md) / [gql-querier](../modules/gql_querier.md) / GQLVar

# Class: GQLVar

[gql-querier](../modules/gql_querier.md).GQLVar

A grapqhl variable

## Hierarchy

- [`GQLRaw`](gql_querier.GQLRaw.md)

  ↳ **`GQLVar`**

## Table of contents

### Constructors

- [constructor](gql_querier.GQLVar.md#constructor)

### Properties

- [\_\_type\_\_](gql_querier.GQLVar.md#__type__)
- [value](gql_querier.GQLVar.md#value)

### Methods

- [toJSON](gql_querier.GQLVar.md#tojson)

## Constructors

### constructor

• **new GQLVar**(`value`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Inherited from

[GQLRaw](gql_querier.GQLRaw.md).[constructor](gql_querier.GQLRaw.md#constructor)

#### Defined in

[gql-querier.ts:613](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L613)

## Properties

### \_\_type\_\_

• **\_\_type\_\_**: `string` = `"GQLVar"`

#### Overrides

[GQLRaw](gql_querier.GQLRaw.md).[__type__](gql_querier.GQLRaw.md#__type__)

#### Defined in

[gql-querier.ts:637](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L637)

___

### value

• **value**: `string`

#### Inherited from

[GQLRaw](gql_querier.GQLRaw.md).[value](gql_querier.GQLRaw.md#value)

#### Defined in

[gql-querier.ts:610](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L610)

## Methods

### toJSON

▸ **toJSON**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `__type__` | `string` |
| `value` | `string` |

#### Inherited from

[GQLRaw](gql_querier.GQLRaw.md).[toJSON](gql_querier.GQLRaw.md#tojson)

#### Defined in

[gql-querier.ts:616](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L616)
