[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root/Module/ItemDefinition](../modules/base_Root_Module_ItemDefinition.md) / IItemDefinitionRQValueType

# Interface: IItemDefinitionRQValueType

[base/Root/Module/ItemDefinition](../modules/base_Root_Module_ItemDefinition.md).IItemDefinitionRQValueType

This is how rq applied values are stored within
the item definition, using this structure, for the
application state

## Table of contents

### Properties

- [flattenedValue](base_Root_Module_ItemDefinition.IItemDefinitionRQValueType.md#flattenedvalue)
- [rawValue](base_Root_Module_ItemDefinition.IItemDefinitionRQValueType.md#rawvalue)
- [requestFields](base_Root_Module_ItemDefinition.IItemDefinitionRQValueType.md#requestfields)

## Properties

### flattenedValue

• **flattenedValue**: [`IRQValue`](rq_querier.IRQValue.md)

The flattened value without DATA fields

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:485](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L485)

___

### rawValue

• **rawValue**: [`IRQValue`](rq_querier.IRQValue.md)

The value as it came from rq endpoint

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:481](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L481)

___

### requestFields

• **requestFields**: [`IRQRequestFields`](rq_querier.IRQRequestFields.md)

The requested fields that were used

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:489](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L489)
