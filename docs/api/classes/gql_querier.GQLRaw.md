[@onzag/itemize](../README.md) / [Modules](../modules.md) / [gql-querier](../modules/gql_querier.md) / GQLRaw

# Class: GQLRaw

[gql-querier](../modules/gql_querier.md).GQLRaw

The __type__ allows for serialization of args
this might happen during RPC events it is reconstructed
in the class above

## Hierarchy

- **`GQLRaw`**

  ↳ [`GQLEnum`](gql_querier.GQLEnum.md)

  ↳ [`GQLVar`](gql_querier.GQLVar.md)

## Table of contents

### Constructors

- [constructor](gql_querier.GQLRaw.md#constructor)

### Properties

- [\_\_type\_\_](gql_querier.GQLRaw.md#__type__)
- [value](gql_querier.GQLRaw.md#value)

### Methods

- [toJSON](gql_querier.GQLRaw.md#tojson)

## Constructors

### constructor

• **new GQLRaw**(`value`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Defined in

[gql-querier.ts:512](https://github.com/onzag/itemize/blob/5c2808d3/gql-querier.ts#L512)

## Properties

### \_\_type\_\_

• **\_\_type\_\_**: `string` = `"GQLRaw"`

#### Defined in

[gql-querier.ts:511](https://github.com/onzag/itemize/blob/5c2808d3/gql-querier.ts#L511)

___

### value

• **value**: `string`

#### Defined in

[gql-querier.ts:509](https://github.com/onzag/itemize/blob/5c2808d3/gql-querier.ts#L509)

## Methods

### toJSON

▸ **toJSON**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `__type__` | `string` |
| `value` | `string` |

#### Defined in

[gql-querier.ts:515](https://github.com/onzag/itemize/blob/5c2808d3/gql-querier.ts#L515)
