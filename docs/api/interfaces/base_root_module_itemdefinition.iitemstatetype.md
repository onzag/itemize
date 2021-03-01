[](../README.md) / [Exports](../modules.md) / [base/Root/Module/ItemDefinition](../modules/base_root_module_itemdefinition.md) / IItemStateType

# Interface: IItemStateType

[base/Root/Module/ItemDefinition](../modules/base_root_module_itemdefinition.md).IItemStateType

Represents the whole item definition state

## Table of contents

### Properties

- [forId](base_root_module_itemdefinition.iitemstatetype.md#forid)
- [forVersion](base_root_module_itemdefinition.iitemstatetype.md#forversion)
- [gqlOriginalFlattenedValue](base_root_module_itemdefinition.iitemstatetype.md#gqloriginalflattenedvalue)
- [includes](base_root_module_itemdefinition.iitemstatetype.md#includes)
- [internalState](base_root_module_itemdefinition.iitemstatetype.md#internalstate)
- [itemDefName](base_root_module_itemdefinition.iitemstatetype.md#itemdefname)
- [itemDefQualifiedName](base_root_module_itemdefinition.iitemstatetype.md#itemdefqualifiedname)
- [moduleName](base_root_module_itemdefinition.iitemstatetype.md#modulename)
- [policies](base_root_module_itemdefinition.iitemstatetype.md#policies)
- [properties](base_root_module_itemdefinition.iitemstatetype.md#properties)

## Properties

### forId

• **forId**: *string*

The id that was used

Defined in: [base/Root/Module/ItemDefinition/index.ts:319](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L319)

___

### forVersion

• **forVersion**: *string*

The version that was used

Defined in: [base/Root/Module/ItemDefinition/index.ts:323](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L323)

___

### gqlOriginalFlattenedValue

• **gqlOriginalFlattenedValue**: [*IGQLValue*](gql_querier.igqlvalue.md)

The original graphql flattened value that was applied (if any)

Defined in: [base/Root/Module/ItemDefinition/index.ts:315](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L315)

___

### includes

• **includes**: [*IIncludeState*](base_root_module_itemdefinition_include.iincludestate.md)[]

All the state of the includes within itself

Defined in: [base/Root/Module/ItemDefinition/index.ts:303](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L303)

___

### internalState

• **internalState**: *any*

An internal state for this state in the given slot, in practise
this is used in the search mode in order to store search results as a way
to keep them linked to the state that is used in that way some data
might be assigned to this state

Defined in: [base/Root/Module/ItemDefinition/index.ts:330](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L330)

___

### itemDefName

• **itemDefName**: *string*

The name of the item definition

Defined in: [base/Root/Module/ItemDefinition/index.ts:299](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L299)

___

### itemDefQualifiedName

• **itemDefQualifiedName**: *string*

The qualified name of the item definition

Defined in: [base/Root/Module/ItemDefinition/index.ts:295](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L295)

___

### moduleName

• **moduleName**: *string*

The module this item definition resides (name only)

Defined in: [base/Root/Module/ItemDefinition/index.ts:291](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L291)

___

### policies

• **policies**: [*IPoliciesStateType*](base_root_module_itemdefinition.ipoliciesstatetype.md)

All the policies state

Defined in: [base/Root/Module/ItemDefinition/index.ts:311](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L311)

___

### properties

• **properties**: [*IPropertyDefinitionState*](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionstate.md)[]

All the states of the properties included

Defined in: [base/Root/Module/ItemDefinition/index.ts:307](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L307)
