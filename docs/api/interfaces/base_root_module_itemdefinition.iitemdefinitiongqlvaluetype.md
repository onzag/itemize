[](../README.md) / [Exports](../modules.md) / [base/Root/Module/ItemDefinition](../modules/base_root_module_itemdefinition.md) / IItemDefinitionGQLValueType

# Interface: IItemDefinitionGQLValueType

[base/Root/Module/ItemDefinition](../modules/base_root_module_itemdefinition.md).IItemDefinitionGQLValueType

This is how graphql applied values are stored within
the item definition, using this structure, for the
application state

## Table of contents

### Properties

- [flattenedValue](base_root_module_itemdefinition.iitemdefinitiongqlvaluetype.md#flattenedvalue)
- [rawValue](base_root_module_itemdefinition.iitemdefinitiongqlvaluetype.md#rawvalue)
- [requestFields](base_root_module_itemdefinition.iitemdefinitiongqlvaluetype.md#requestfields)

## Properties

### flattenedValue

• **flattenedValue**: [*IGQLValue*](gql_querier.igqlvalue.md)

The flattened value without DATA fields

Defined in: [base/Root/Module/ItemDefinition/index.ts:357](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/index.ts#L357)

___

### rawValue

• **rawValue**: [*IGQLValue*](gql_querier.igqlvalue.md)

The value as it came from graphql endpoint

Defined in: [base/Root/Module/ItemDefinition/index.ts:353](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/index.ts#L353)

___

### requestFields

• **requestFields**: [*IGQLRequestFields*](gql_querier.igqlrequestfields.md)

The requested fields that were used

Defined in: [base/Root/Module/ItemDefinition/index.ts:361](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/index.ts#L361)
