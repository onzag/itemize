[](../README.md) / [Exports](../modules.md) / [base/Root/Module/ItemDefinition/Include](../modules/base_root_module_itemdefinition_include.md) / IIncludeState

# Interface: IIncludeState

[base/Root/Module/ItemDefinition/Include](../modules/base_root_module_itemdefinition_include.md).IIncludeState

This represents the state of an include as it is fetched via
the getState function (with or without external checking)

## Table of contents

### Properties

- [canExclusionBeSet](base_root_module_itemdefinition_include.iincludestate.md#canexclusionbeset)
- [exclusionState](base_root_module_itemdefinition_include.iincludestate.md#exclusionstate)
- [includeId](base_root_module_itemdefinition_include.iincludestate.md#includeid)
- [itemDefinitionName](base_root_module_itemdefinition_include.iincludestate.md#itemdefinitionname)
- [itemState](base_root_module_itemdefinition_include.iincludestate.md#itemstate)
- [stateExclusion](base_root_module_itemdefinition_include.iincludestate.md#stateexclusion)
- [stateExclusionApplied](base_root_module_itemdefinition_include.iincludestate.md#stateexclusionapplied)
- [stateExclusionHasBeenManuallySet](base_root_module_itemdefinition_include.iincludestate.md#stateexclusionhasbeenmanuallyset)
- [stateExclusionModified](base_root_module_itemdefinition_include.iincludestate.md#stateexclusionmodified)

## Properties

### canExclusionBeSet

• **canExclusionBeSet**: *boolean*

Whether the exclusion can be set according to the current rules

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:43](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/Include/index.ts#L43)

___

### exclusionState

• **exclusionState**: [*IncludeExclusionState*](../enums/base_root_module_itemdefinition_include.includeexclusionstate.md)

The exclusion state as specified, an ANY exclusion state only occurs
in ternary mode

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:39](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/Include/index.ts#L39)

___

### includeId

• **includeId**: *string*

The include identifier from the item definition

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:47](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/Include/index.ts#L47)

___

### itemDefinitionName

• **itemDefinitionName**: *string*

The item definition name it contains (not its parent)

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:51](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/Include/index.ts#L51)

___

### itemState

• **itemState**: [*IItemStateType*](base_root_module_itemdefinition.iitemstatetype.md)

The item definition state it contains (not its parent)

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:55](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/Include/index.ts#L55)

___

### stateExclusion

• **stateExclusion**: [*IncludeExclusionState*](../enums/base_root_module_itemdefinition_include.includeexclusionstate.md)

The state specified exclusion state by the user or another interaction

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:59](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/Include/index.ts#L59)

___

### stateExclusionApplied

• **stateExclusionApplied**: [*IncludeExclusionState*](../enums/base_root_module_itemdefinition_include.includeexclusionstate.md)

The state specified exclusion that has been applied using the apply value functionality

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:63](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/Include/index.ts#L63)

___

### stateExclusionHasBeenManuallySet

• **stateExclusionHasBeenManuallySet**: *boolean*

Whether this state has been manually set

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:71](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/Include/index.ts#L71)

___

### stateExclusionModified

• **stateExclusionModified**: *boolean*

Whether this state has been modified by any action, either apply or set

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:67](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/Include/index.ts#L67)
