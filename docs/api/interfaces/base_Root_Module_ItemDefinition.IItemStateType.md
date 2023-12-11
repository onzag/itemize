[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root/Module/ItemDefinition](../modules/base_Root_Module_ItemDefinition.md) / IItemStateType

# Interface: IItemStateType

[base/Root/Module/ItemDefinition](../modules/base_Root_Module_ItemDefinition.md).IItemStateType

Represents the whole item definition state

## Table of contents

### Properties

- [forId](base_Root_Module_ItemDefinition.IItemStateType.md#forid)
- [forVersion](base_Root_Module_ItemDefinition.IItemStateType.md#forversion)
- [includes](base_Root_Module_ItemDefinition.IItemStateType.md#includes)
- [itemDefName](base_Root_Module_ItemDefinition.IItemStateType.md#itemdefname)
- [itemDefQualifiedName](base_Root_Module_ItemDefinition.IItemStateType.md#itemdefqualifiedname)
- [moduleName](base_Root_Module_ItemDefinition.IItemStateType.md#modulename)
- [policies](base_Root_Module_ItemDefinition.IItemStateType.md#policies)
- [properties](base_Root_Module_ItemDefinition.IItemStateType.md#properties)
- [rqOriginalFlattenedValue](base_Root_Module_ItemDefinition.IItemStateType.md#rqoriginalflattenedvalue)
- [searchState](base_Root_Module_ItemDefinition.IItemStateType.md#searchstate)

## Properties

### forId

• **forId**: `string`

The id that was used

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:446](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/index.ts#L446)

___

### forVersion

• **forVersion**: `string`

The version that was used

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:450](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/index.ts#L450)

___

### includes

• **includes**: [`IIncludeState`](base_Root_Module_ItemDefinition_Include.IIncludeState.md)[]

All the state of the includes within itself

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:430](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/index.ts#L430)

___

### itemDefName

• **itemDefName**: `string`

The name of the item definition

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:426](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/index.ts#L426)

___

### itemDefQualifiedName

• **itemDefQualifiedName**: `string`

The qualified name of the item definition

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:422](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/index.ts#L422)

___

### moduleName

• **moduleName**: `string`

The module this item definition resides (name only)

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:418](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/index.ts#L418)

___

### policies

• **policies**: [`IPoliciesStateType`](base_Root_Module_ItemDefinition.IPoliciesStateType.md)

All the policies state

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:438](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/index.ts#L438)

___

### properties

• **properties**: [`IPropertyDefinitionState`](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)\<[`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)\>[]

All the states of the properties included

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:434](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/index.ts#L434)

___

### rqOriginalFlattenedValue

• **rqOriginalFlattenedValue**: [`IRQValue`](rq_querier.IRQValue.md)

The original rq flattened value that was applied (if any)

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:442](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/index.ts#L442)

___

### searchState

• `Optional` **searchState**: `any`

An search state for this state in the given slot, in practise
this is used in the search mode in order to store search results as a way
to keep them linked to the state that is used in that way some data
might be assigned to this state

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:457](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/index.ts#L457)
