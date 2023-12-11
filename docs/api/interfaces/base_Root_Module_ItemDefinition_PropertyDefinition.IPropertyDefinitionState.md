[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root/Module/ItemDefinition/PropertyDefinition](../modules/base_Root_Module_ItemDefinition_PropertyDefinition.md) / IPropertyDefinitionState

# Interface: IPropertyDefinitionState\<T\>

[base/Root/Module/ItemDefinition/PropertyDefinition](../modules/base_Root_Module_ItemDefinition_PropertyDefinition.md).IPropertyDefinitionState

This is the state you receive from a property once you request it

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype) |

## Table of contents

### Properties

- [default](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md#default)
- [enforced](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md#enforced)
- [hidden](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md#hidden)
- [internalValue](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md#internalvalue)
- [invalidReason](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md#invalidreason)
- [propertyId](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md#propertyid)
- [stateAppliedValue](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md#stateappliedvalue)
- [stateValue](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md#statevalue)
- [stateValueHasBeenManuallySet](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md#statevaluehasbeenmanuallyset)
- [stateValueModified](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md#statevaluemodified)
- [userSet](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md#userset)
- [valid](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md#valid)
- [value](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md#value)

## Properties

### default

• **default**: `boolean`

whether it represents a default value (it is not user set in this case)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:298](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L298)

___

### enforced

• **enforced**: `boolean`

whether the value is enforced (by enforcedProperties or other means), not user set as well

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:302](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L302)

___

### hidden

• **hidden**: `boolean`

whether the property is mean to be hidden and not interacted by the user

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:306](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L306)

___

### internalValue

• **internalValue**: `any`

an internal value that can be used for state management
usually used only by react in order to keep its internal state, internal
values are not always guaranteed to come as they are in sync with the value
an internal value is null if it considers itself not in sync in which case
the app should still be able to display something from the value, internal values
are basically only returned if the state value is the current value

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:328](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L328)

___

### invalidReason

• **invalidReason**: `string`

the reason of why it is not valid (it can also be a custom reason)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:314](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L314)

___

### propertyId

• **propertyId**: `string`

the property id in question

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:359](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L359)

___

### stateAppliedValue

• **stateAppliedValue**: `T`

the applied value, this is the value that is set up in the state by the applying
function and it might differ from the state value as the user modifies it, this is
the original value

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:341](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L341)

___

### stateValue

• **stateValue**: `any`

the state value, the state value consists on the value that is set up
in the state, in most case it is equal to the value; for example in case of
a default value, the state value is null, but the actual value is something else
usually the internal value is correlated to the state value

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:335](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L335)

___

### stateValueHasBeenManuallySet

• **stateValueHasBeenManuallySet**: `boolean`

unlike state value modified, manually set values are considered manually set once the
value has been updating using the setCurrentValue function rather than applyValue this means
applyValue is used when loading values, whereas setCurrentValue is used for user input
this means you can tell appart modifications of the state value from either computer
or user input as long as it was used accordingly

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:355](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L355)

___

### stateValueModified

• **stateValueModified**: `boolean`

whether the state value has been modified by any external force, either programatically
or not, this will usually be true for any value other than null, usually becomes true
once the field is touched even once

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:347](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L347)

___

### userSet

• **userSet**: `boolean`

whether this value was user set

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:294](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L294)

___

### valid

• **valid**: `boolean`

whether the value is valid

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:310](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L310)

___

### value

• **value**: `T`

the value that the property currently has, it can be different from state
values because

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:319](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L319)
