[@onzag/itemize](../README.md) / [Modules](../modules.md) / database/base

# Module: database/base

Contains the base query builder and a conditional one

## Table of contents

### Classes

- [ConditionalBuilder](../classes/database_base.ConditionalBuilder.md)
- [QueryBuilder](../classes/database_base.QueryBuilder.md)

### Interfaces

- [IConditionalBuilderConditionType](../interfaces/database_base.IConditionalBuilderConditionType.md)
- [IManyValueType](../interfaces/database_base.IManyValueType.md)

### Type aliases

- [BasicBindingType](database_base.md#basicbindingtype)
- [ConditionalBuilderFn](database_base.md#conditionalbuilderfn)
- [ExtendedBindingType](database_base.md#extendedbindingtype)
- [ValueType](database_base.md#valuetype)

## Type aliases

### BasicBindingType

Ƭ **BasicBindingType**: `string` \| `number` \| `boolean` \| [`BasicBindingType`](database_base.md#basicbindingtype)[]

Represents a binding type, that binds to $1, $2, $3 etc... in the query itself
supports string, number, boolean or an array of those

#### Defined in

[database/base.ts:17](https://github.com/onzag/itemize/blob/5c2808d3/database/base.ts#L17)

___

### ConditionalBuilderFn

Ƭ **ConditionalBuilderFn**<`T`\>: (`builder`: `T`) => `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`builder`): `void`

The conditional builder function that is used to build
conditions that are nested

##### Parameters

| Name | Type |
| :------ | :------ |
| `builder` | `T` |

##### Returns

`void`

#### Defined in

[database/base.ts:218](https://github.com/onzag/itemize/blob/5c2808d3/database/base.ts#L218)

___

### ExtendedBindingType

Ƭ **ExtendedBindingType**: [`BasicBindingType`](database_base.md#basicbindingtype) \| [`QueryBuilder`](../classes/database_base.QueryBuilder.md)

An extended way to represent bindings as a tree, represents the basic bindings
plus the query builder itself that can act as a compounded binding element
[binding, binding, binding, [binding, binding, binding]...]

#### Defined in

[database/base.ts:24](https://github.com/onzag/itemize/blob/5c2808d3/database/base.ts#L24)

___

### ValueType

Ƭ **ValueType**: `string` \| `number` \| `boolean` \| [`string`, (`string` \| `number`)[]]

Represents a value that can be used to insert or update by, whatever
needs to be assigned a value, we support string, number, booleans
and raw values represented by an array and its bindings

#### Defined in

[database/base.ts:11](https://github.com/onzag/itemize/blob/5c2808d3/database/base.ts#L11)
