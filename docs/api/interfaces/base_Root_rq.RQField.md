[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root/rq](../modules/base_Root_rq.md) / RQField

# Interface: RQField

[base/Root/rq](../modules/base_Root_rq.md).RQField

## Hierarchy

- `RQBase`

  ↳ **`RQField`**

## Table of contents

### Properties

- [array](base_Root_rq.RQField.md#array)
- [description](base_Root_rq.RQField.md#description)
- [extFields](base_Root_rq.RQField.md#extfields)
- [ownFields](base_Root_rq.RQField.md#ownfields)
- [required](base_Root_rq.RQField.md#required)
- [stdFields](base_Root_rq.RQField.md#stdfields)
- [type](base_Root_rq.RQField.md#type)
- [values](base_Root_rq.RQField.md#values)

## Properties

### array

• `Optional` **array**: `boolean`

#### Overrides

RQBase.array

#### Defined in

[base/Root/rq.ts:39](https://github.com/onzag/itemize/blob/a24376ed/base/Root/rq.ts#L39)

___

### description

• `Optional` **description**: `string`

#### Overrides

RQBase.description

#### Defined in

[base/Root/rq.ts:58](https://github.com/onzag/itemize/blob/a24376ed/base/Root/rq.ts#L58)

___

### extFields

• `Optional` **extFields**: `Object`

Signals the precense of a DATA layer that contains both
std fields and own fields

if not present then it's null

#### Index signature

▪ [id: `string`]: [`RQField`](base_Root_rq.RQField.md)

#### Defined in

[base/Root/rq.ts:52](https://github.com/onzag/itemize/blob/a24376ed/base/Root/rq.ts#L52)

___

### ownFields

• `Optional` **ownFields**: `Object`

#### Index signature

▪ [id: `string`]: [`RQField`](base_Root_rq.RQField.md)

#### Defined in

[base/Root/rq.ts:55](https://github.com/onzag/itemize/blob/a24376ed/base/Root/rq.ts#L55)

___

### required

• `Optional` **required**: `boolean`

#### Overrides

RQBase.required

#### Defined in

[base/Root/rq.ts:42](https://github.com/onzag/itemize/blob/a24376ed/base/Root/rq.ts#L42)

___

### stdFields

• `Optional` **stdFields**: `Object`

#### Index signature

▪ [id: `string`]: [`RQField`](base_Root_rq.RQField.md)

#### Defined in

[base/Root/rq.ts:43](https://github.com/onzag/itemize/blob/a24376ed/base/Root/rq.ts#L43)

___

### type

• **type**: ``"string"`` \| ``"number"`` \| ``"boolean"`` \| ``"object"`` \| ``"integer"`` \| ``"any"`` \| ``"binary"`` \| ``"integer-positive"``

#### Overrides

RQBase.type

#### Defined in

[base/Root/rq.ts:40](https://github.com/onzag/itemize/blob/a24376ed/base/Root/rq.ts#L40)

___

### values

• `Optional` **values**: `any`[]

#### Overrides

RQBase.values

#### Defined in

[base/Root/rq.ts:41](https://github.com/onzag/itemize/blob/a24376ed/base/Root/rq.ts#L41)
