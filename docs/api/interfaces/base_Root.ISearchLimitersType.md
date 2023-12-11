[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root](../modules/base_Root.md) / ISearchLimitersType

# Interface: ISearchLimitersType

[base/Root](../modules/base_Root.md).ISearchLimitersType

The request limiters that are set in the module
to limit the requests and the form of these requests
the reason these limiters are in the module is because
they are also used for optimization and matenience operations

## Table of contents

### Properties

- [condition](base_Root.ISearchLimitersType.md#condition)
- [createdBy](base_Root.ISearchLimitersType.md#createdby)
- [parenting](base_Root.ISearchLimitersType.md#parenting)
- [properties](base_Root.ISearchLimitersType.md#properties)
- [since](base_Root.ISearchLimitersType.md#since)

## Properties

### condition

• **condition**: ``"AND"`` \| ``"OR"``

#### Defined in

[base/Root/index.ts:58](https://github.com/onzag/itemize/blob/59702dd5/base/Root/index.ts#L58)

___

### createdBy

• `Optional` **createdBy**: `boolean`

#### Defined in

[base/Root/index.ts:60](https://github.com/onzag/itemize/blob/59702dd5/base/Root/index.ts#L60)

___

### parenting

• `Optional` **parenting**: `boolean`

#### Defined in

[base/Root/index.ts:61](https://github.com/onzag/itemize/blob/59702dd5/base/Root/index.ts#L61)

___

### properties

• `Optional` **properties**: [`IPropertyRequestLimiter`](base_Root.IPropertyRequestLimiter.md)[]

#### Defined in

[base/Root/index.ts:62](https://github.com/onzag/itemize/blob/59702dd5/base/Root/index.ts#L62)

___

### since

• `Optional` **since**: `number`

#### Defined in

[base/Root/index.ts:59](https://github.com/onzag/itemize/blob/59702dd5/base/Root/index.ts#L59)
