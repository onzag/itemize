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

[gql-querier.ts:613](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L613)

## Properties

### \_\_type\_\_

• **\_\_type\_\_**: `string` = `"GQLRaw"`

#### Defined in

[gql-querier.ts:612](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L612)

___

### value

• **value**: `string`

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

#### Defined in

[gql-querier.ts:616](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L616)
