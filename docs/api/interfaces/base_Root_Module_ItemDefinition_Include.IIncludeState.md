[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root/Module/ItemDefinition/Include](../modules/base_Root_Module_ItemDefinition_Include.md) / IIncludeState

# Interface: IIncludeState

[base/Root/Module/ItemDefinition/Include](../modules/base_Root_Module_ItemDefinition_Include.md).IIncludeState

This represents the state of an include as it is fetched via
the getState function (with or without external checking)

## Table of contents

### Properties

- [canExclusionBeSet](base_Root_Module_ItemDefinition_Include.IIncludeState.md#canexclusionbeset)
- [exclusionState](base_Root_Module_ItemDefinition_Include.IIncludeState.md#exclusionstate)
- [includeId](base_Root_Module_ItemDefinition_Include.IIncludeState.md#includeid)
- [itemDefinitionName](base_Root_Module_ItemDefinition_Include.IIncludeState.md#itemdefinitionname)
- [itemState](base_Root_Module_ItemDefinition_Include.IIncludeState.md#itemstate)
- [stateExclusion](base_Root_Module_ItemDefinition_Include.IIncludeState.md#stateexclusion)
- [stateExclusionApplied](base_Root_Module_ItemDefinition_Include.IIncludeState.md#stateexclusionapplied)
- [stateExclusionHasBeenManuallySet](base_Root_Module_ItemDefinition_Include.IIncludeState.md#stateexclusionhasbeenmanuallyset)
- [stateExclusionModified](base_Root_Module_ItemDefinition_Include.IIncludeState.md#stateexclusionmodified)

## Properties

### canExclusionBeSet

• **canExclusionBeSet**: `boolean`

Whether the exclusion can be set according to the current rules

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:43](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/Include/index.ts#L43)

___

### exclusionState

• **exclusionState**: [`IncludeExclusionState`](../enums/base_Root_Module_ItemDefinition_Include.IncludeExclusionState.md)

The exclusion state as specified, an ANY exclusion state only occurs
in ternary mode

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:39](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/Include/index.ts#L39)

___

### includeId

• **includeId**: `string`

The include identifier from the item definition

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:47](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/Include/index.ts#L47)

___

### itemDefinitionName

• **itemDefinitionName**: `string`

The item definition name it contains (not its parent)

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:51](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/Include/index.ts#L51)

___

### itemState

• **itemState**: [`IItemStateType`](base_Root_Module_ItemDefinition.IItemStateType.md)

The item definition state it contains (not its parent)

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:55](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/Include/index.ts#L55)

___

### stateExclusion

• **stateExclusion**: [`IncludeExclusionState`](../enums/base_Root_Module_ItemDefinition_Include.IncludeExclusionState.md)

The state specified exclusion state by the user or another interaction

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:59](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/Include/index.ts#L59)

___

### stateExclusionApplied

• **stateExclusionApplied**: [`IncludeExclusionState`](../enums/base_Root_Module_ItemDefinition_Include.IncludeExclusionState.md)

The state specified exclusion that has been applied using the apply value functionality

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:63](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/Include/index.ts#L63)

___

### stateExclusionHasBeenManuallySet

• **stateExclusionHasBeenManuallySet**: `boolean`

Whether this state has been manually set

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:71](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/Include/index.ts#L71)

___

### stateExclusionModified

• **stateExclusionModified**: `boolean`

Whether this state has been modified by any action, either apply or set

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:67](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/Include/index.ts#L67)
