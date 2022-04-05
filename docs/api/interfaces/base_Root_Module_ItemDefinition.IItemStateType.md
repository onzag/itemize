[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root/Module/ItemDefinition](../modules/base_Root_Module_ItemDefinition.md) / IItemStateType

# Interface: IItemStateType

[base/Root/Module/ItemDefinition](../modules/base_Root_Module_ItemDefinition.md).IItemStateType

Represents the whole item definition state

## Table of contents

### Properties

- [forId](base_Root_Module_ItemDefinition.IItemStateType.md#forid)
- [forVersion](base_Root_Module_ItemDefinition.IItemStateType.md#forversion)
- [gqlOriginalFlattenedValue](base_Root_Module_ItemDefinition.IItemStateType.md#gqloriginalflattenedvalue)
- [includes](base_Root_Module_ItemDefinition.IItemStateType.md#includes)
- [internalState](base_Root_Module_ItemDefinition.IItemStateType.md#internalstate)
- [itemDefName](base_Root_Module_ItemDefinition.IItemStateType.md#itemdefname)
- [itemDefQualifiedName](base_Root_Module_ItemDefinition.IItemStateType.md#itemdefqualifiedname)
- [moduleName](base_Root_Module_ItemDefinition.IItemStateType.md#modulename)
- [policies](base_Root_Module_ItemDefinition.IItemStateType.md#policies)
- [properties](base_Root_Module_ItemDefinition.IItemStateType.md#properties)

## Properties

### forId

• **forId**: `string`

The id that was used

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:343](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L343)

___

### forVersion

• **forVersion**: `string`

The version that was used

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:347](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L347)

___

### gqlOriginalFlattenedValue

• **gqlOriginalFlattenedValue**: [`IGQLValue`](gql_querier.IGQLValue.md)

The original graphql flattened value that was applied (if any)

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:339](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L339)

___

### includes

• **includes**: [`IIncludeState`](base_Root_Module_ItemDefinition_Include.IIncludeState.md)[]

All the state of the includes within itself

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:327](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L327)

___

### internalState

• **internalState**: `any`

An internal state for this state in the given slot, in practise
this is used in the search mode in order to store search results as a way
to keep them linked to the state that is used in that way some data
might be assigned to this state

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:354](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L354)

___

### itemDefName

• **itemDefName**: `string`

The name of the item definition

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:323](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L323)

___

### itemDefQualifiedName

• **itemDefQualifiedName**: `string`

The qualified name of the item definition

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:319](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L319)

___

### moduleName

• **moduleName**: `string`

The module this item definition resides (name only)

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:315](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L315)

___

### policies

• **policies**: [`IPoliciesStateType`](base_Root_Module_ItemDefinition.IPoliciesStateType.md)

All the policies state

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:335](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L335)

___

### properties

• **properties**: [`IPropertyDefinitionState`](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)[]

All the states of the properties included

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:331](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L331)
