[](../README.md) / [Exports](../modules.md) / [base/Root/Module/ItemDefinition/PropertyDefinition](../modules/base_root_module_itemdefinition_propertydefinition.md) / IPropertyDefinitionState

# Interface: IPropertyDefinitionState

[base/Root/Module/ItemDefinition/PropertyDefinition](../modules/base_root_module_itemdefinition_propertydefinition.md).IPropertyDefinitionState

This is the state you receive from a property once you request it

## Table of contents

### Properties

- [default](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionstate.md#default)
- [enforced](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionstate.md#enforced)
- [hidden](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionstate.md#hidden)
- [internalValue](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionstate.md#internalvalue)
- [invalidReason](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionstate.md#invalidreason)
- [propertyId](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionstate.md#propertyid)
- [stateAppliedValue](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionstate.md#stateappliedvalue)
- [stateValue](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionstate.md#statevalue)
- [stateValueHasBeenManuallySet](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionstate.md#statevaluehasbeenmanuallyset)
- [stateValueModified](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionstate.md#statevaluemodified)
- [userSet](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionstate.md#userset)
- [valid](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionstate.md#valid)
- [value](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionstate.md#value)

## Properties

### default

• **default**: *boolean*

whether it represents a default value (it is not user set in this case)

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:280](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L280)

___

### enforced

• **enforced**: *boolean*

whether the value is enforced (by enforcedProperties or other means), not user set as well

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:284](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L284)

___

### hidden

• **hidden**: *boolean*

whether the property is mean to be hidden and not interacted by the user

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:288](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L288)

___

### internalValue

• **internalValue**: *any*

an internal value that can be used for state management
usually used only by react in order to keep its internal state, internal
values are not always guaranteed to come as they are in sync with the value
an internal value is null if it considers itself not in sync in which case
the app should still be able to display something from the value, internal values
are basically only returned if the state value is the current value

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:310](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L310)

___

### invalidReason

• **invalidReason**: *string*

the reason of why it is not valid (it can also be a custom reason)

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:296](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L296)

___

### propertyId

• **propertyId**: *string*

the property id in question

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:341](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L341)

___

### stateAppliedValue

• **stateAppliedValue**: [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype)

the applied value, this is the value that is set up in the state by the applying
function and it might differ from the state value as the user modifies it, this is
the original value

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:323](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L323)

___

### stateValue

• **stateValue**: *any*

the state value, the state value consists on the value that is set up
in the state, in most case it is equal to the value; for example in case of
a default value, the state value is null, but the actual value is something else
usually the internal value is correlated to the state value

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:317](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L317)

___

### stateValueHasBeenManuallySet

• **stateValueHasBeenManuallySet**: *boolean*

unlike state value modified, manually set values are considered manually set once the
value has been updating using the setCurrentValue function rather than applyValue this means
applyValue is used when loading values, whereas setCurrentValue is used for user input
this means you can tell appart modifications of the state value from either computer
or user input as long as it was used accordingly

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:337](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L337)

___

### stateValueModified

• **stateValueModified**: *boolean*

whether the state value has been modified by any external force, either programatically
or not, this will usually be true for any value other than null, usually becomes true
once the field is touched even once

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:329](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L329)

___

### userSet

• **userSet**: *boolean*

whether this value was user set

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:276](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L276)

___

### valid

• **valid**: *boolean*

whether the value is valid

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:292](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L292)

___

### value

• **value**: [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype)

the value that the property currently has, it can be different from state
values because

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:301](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L301)
