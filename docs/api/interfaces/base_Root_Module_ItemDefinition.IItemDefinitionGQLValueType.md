[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root/Module/ItemDefinition](../modules/base_Root_Module_ItemDefinition.md) / IItemDefinitionGQLValueType

# Interface: IItemDefinitionGQLValueType

[base/Root/Module/ItemDefinition](../modules/base_Root_Module_ItemDefinition.md).IItemDefinitionGQLValueType

This is how graphql applied values are stored within
the item definition, using this structure, for the
application state

## Table of contents

### Properties

- [flattenedValue](base_Root_Module_ItemDefinition.IItemDefinitionGQLValueType.md#flattenedvalue)
- [rawValue](base_Root_Module_ItemDefinition.IItemDefinitionGQLValueType.md#rawvalue)
- [requestFields](base_Root_Module_ItemDefinition.IItemDefinitionGQLValueType.md#requestfields)

## Properties

### flattenedValue

• **flattenedValue**: [`IGQLValue`](gql_querier.IGQLValue.md)

The flattened value without DATA fields

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:381](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/index.ts#L381)

___

### rawValue

• **rawValue**: [`IGQLValue`](gql_querier.IGQLValue.md)

The value as it came from graphql endpoint

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:377](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/index.ts#L377)

___

### requestFields

• **requestFields**: [`IGQLRequestFields`](gql_querier.IGQLRequestFields.md)

The requested fields that were used

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:385](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/index.ts#L385)
