[](../README.md) / [Exports](../modules.md) / [database/base](../modules/database_base.md) / IConditionalBuilderConditionType

# Interface: IConditionalBuilderConditionType

[database/base](../modules/database_base.md).IConditionalBuilderConditionType

Represents a conditional builder condition

## Table of contents

### Properties

- [condition](database_base.iconditionalbuilderconditiontype.md#condition)
- [gate](database_base.iconditionalbuilderconditiontype.md#gate)
- [prefix](database_base.iconditionalbuilderconditiontype.md#prefix)

## Properties

### condition

• **condition**: *string* \| [*ConditionalBuilder*](../classes/database_base.conditionalbuilder.md) \| [*QueryBuilder*](../classes/database_base.querybuilder.md)

The condition itself can be a subcondition
or an expression itself

Defined in: [database/base.ts:200](https://github.com/onzag/itemize/blob/5fcde7cf/database/base.ts#L200)

___

### gate

• **gate**: *AND* \| *OR*

The gate that is going to use

Defined in: [database/base.ts:204](https://github.com/onzag/itemize/blob/5fcde7cf/database/base.ts#L204)

___

### prefix

• **prefix**: *string*

An optional prefix that comes after the and rule

Defined in: [database/base.ts:208](https://github.com/onzag/itemize/blob/5fcde7cf/database/base.ts#L208)
