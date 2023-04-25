[@onzag/itemize](../README.md) / [Modules](../modules.md) / [database/base](../modules/database_base.md) / IConditionalBuilderConditionType

# Interface: IConditionalBuilderConditionType

[database/base](../modules/database_base.md).IConditionalBuilderConditionType

Represents a conditional builder condition

## Table of contents

### Properties

- [condition](database_base.IConditionalBuilderConditionType.md#condition)
- [gate](database_base.IConditionalBuilderConditionType.md#gate)
- [prefix](database_base.IConditionalBuilderConditionType.md#prefix)

## Properties

### condition

• **condition**: `string` \| [`ConditionalBuilder`](../classes/database_base.ConditionalBuilder.md) \| [`QueryBuilder`](../classes/database_base.QueryBuilder.md)

The condition itself can be a subcondition
or an expression itself

#### Defined in

[database/base.ts:203](https://github.com/onzag/itemize/blob/f2db74a5/database/base.ts#L203)

___

### gate

• **gate**: ``"AND"`` \| ``"OR"``

The gate that is going to use

#### Defined in

[database/base.ts:207](https://github.com/onzag/itemize/blob/f2db74a5/database/base.ts#L207)

___

### prefix

• **prefix**: `string`

An optional prefix that comes after the and rule

#### Defined in

[database/base.ts:211](https://github.com/onzag/itemize/blob/f2db74a5/database/base.ts#L211)
