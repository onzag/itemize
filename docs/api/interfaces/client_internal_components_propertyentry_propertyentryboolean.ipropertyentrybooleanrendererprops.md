[](../README.md) / [Exports](../modules.md) / [client/internal/components/PropertyEntry/PropertyEntryBoolean](../modules/client_internal_components_propertyentry_propertyentryboolean.md) / IPropertyEntryBooleanRendererProps

# Interface: IPropertyEntryBooleanRendererProps

[client/internal/components/PropertyEntry/PropertyEntryBoolean](../modules/client_internal_components_propertyentry_propertyentryboolean.md).IPropertyEntryBooleanRendererProps

Props that every boolean renderer is going to get

## Hierarchy

* [*IPropertyEntryRendererProps*](client_internal_components_propertyentry.ipropertyentryrendererprops.md)<[*PropertyDefinitionSupportedBooleanType*](../modules/base_root_module_itemdefinition_propertydefinition_types_boolean.md#propertydefinitionsupportedbooleantype)\>

  ↳ **IPropertyEntryBooleanRendererProps**

## Table of contents

### Properties

- [args](client_internal_components_propertyentry_propertyentryboolean.ipropertyentrybooleanrendererprops.md#args)
- [autoFocus](client_internal_components_propertyentry_propertyentryboolean.ipropertyentrybooleanrendererprops.md#autofocus)
- [canRestore](client_internal_components_propertyentry_propertyentryboolean.ipropertyentrybooleanrendererprops.md#canrestore)
- [currentAppliedValue](client_internal_components_propertyentry_propertyentryboolean.ipropertyentrybooleanrendererprops.md#currentappliedvalue)
- [currentInternalValue](client_internal_components_propertyentry_propertyentryboolean.ipropertyentrybooleanrendererprops.md#currentinternalvalue)
- [currentInvalidReason](client_internal_components_propertyentry_propertyentryboolean.ipropertyentrybooleanrendererprops.md#currentinvalidreason)
- [currentValid](client_internal_components_propertyentry_propertyentryboolean.ipropertyentrybooleanrendererprops.md#currentvalid)
- [currentValue](client_internal_components_propertyentry_propertyentryboolean.ipropertyentrybooleanrendererprops.md#currentvalue)
- [description](client_internal_components_propertyentry_propertyentryboolean.ipropertyentrybooleanrendererprops.md#description)
- [disabled](client_internal_components_propertyentry_propertyentryboolean.ipropertyentrybooleanrendererprops.md#disabled)
- [enableUserSetErrors](client_internal_components_propertyentry_propertyentryboolean.ipropertyentrybooleanrendererprops.md#enableuserseterrors)
- [falseLabel](client_internal_components_propertyentry_propertyentryboolean.ipropertyentrybooleanrendererprops.md#falselabel)
- [icon](client_internal_components_propertyentry_propertyentryboolean.ipropertyentrybooleanrendererprops.md#icon)
- [isTernary](client_internal_components_propertyentry_propertyentryboolean.ipropertyentrybooleanrendererprops.md#isternary)
- [label](client_internal_components_propertyentry_propertyentryboolean.ipropertyentrybooleanrendererprops.md#label)
- [nullLabel](client_internal_components_propertyentry_propertyentryboolean.ipropertyentrybooleanrendererprops.md#nulllabel)
- [onChange](client_internal_components_propertyentry_propertyentryboolean.ipropertyentrybooleanrendererprops.md#onchange)
- [onRestore](client_internal_components_propertyentry_propertyentryboolean.ipropertyentrybooleanrendererprops.md#onrestore)
- [placeholder](client_internal_components_propertyentry_propertyentryboolean.ipropertyentrybooleanrendererprops.md#placeholder)
- [propertyId](client_internal_components_propertyentry_propertyentryboolean.ipropertyentrybooleanrendererprops.md#propertyid)
- [rtl](client_internal_components_propertyentry_propertyentryboolean.ipropertyentrybooleanrendererprops.md#rtl)
- [trueLabel](client_internal_components_propertyentry_propertyentryboolean.ipropertyentrybooleanrendererprops.md#truelabel)

## Properties

### args

• **args**: *object*

The renderer args

#### Type declaration:

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[args](client_internal_components_propertyentry.ipropertyentryrendererprops.md#args)

Defined in: [client/internal/renderer.ts:19](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/renderer.ts#L19)

___

### autoFocus

• **autoFocus**: *boolean*

Whether the entry should autofocus

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[autoFocus](client_internal_components_propertyentry.ipropertyentryrendererprops.md#autofocus)

Defined in: [client/internal/components/PropertyEntry/index.tsx:103](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L103)

___

### canRestore

• **canRestore**: *boolean*

A boolean, normally true if our current applied value differs from our
current value, this check is exceptional as it uses the local equal function

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[canRestore](client_internal_components_propertyentry.ipropertyentryrendererprops.md#canrestore)

Defined in: [client/internal/components/PropertyEntry/index.tsx:75](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L75)

___

### currentAppliedValue

• **currentAppliedValue**: *boolean*

The currently applied value that is in sync with the server side

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[currentAppliedValue](client_internal_components_propertyentry.ipropertyentryrendererprops.md#currentappliedvalue)

Defined in: [client/internal/components/PropertyEntry/index.tsx:70](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L70)

___

### currentInternalValue

• `Optional` **currentInternalValue**: *any*

The current internal value, if any given

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[currentInternalValue](client_internal_components_propertyentry.ipropertyentryrendererprops.md#currentinternalvalue)

Defined in: [client/internal/components/PropertyEntry/index.tsx:98](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L98)

___

### currentInvalidReason

• `Optional` **currentInvalidReason**: *string*

If current valid is false, then there might be a reason
attached to it, this invalid reason is locale specific;
if there's no currently invalid reason, this usually means
the item was forced into the invalid state by the passing
of a flag

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[currentInvalidReason](client_internal_components_propertyentry.ipropertyentryrendererprops.md#currentinvalidreason)

Defined in: [client/internal/components/PropertyEntry/index.tsx:94](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L94)

___

### currentValid

• **currentValid**: *boolean*

Whether this current value is currently seen as valid, this is a finicky
value that does not correlate directly to the actual property
state; things such as being poked, or the user having forced
a value for this play a role as well

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[currentValid](client_internal_components_propertyentry.ipropertyentryrendererprops.md#currentvalid)

Defined in: [client/internal/components/PropertyEntry/index.tsx:86](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L86)

___

### currentValue

• **currentValue**: *boolean*

The current value

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[currentValue](client_internal_components_propertyentry.ipropertyentryrendererprops.md#currentvalue)

Defined in: [client/internal/components/PropertyEntry/index.tsx:79](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L79)

___

### description

• `Optional` **description**: *string*

The description of the property, properties might or might not have descriptions
this is locale specific; the description might not be passed if specified by the UI

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[description](client_internal_components_propertyentry.ipropertyentryrendererprops.md#description)

Defined in: [client/internal/components/PropertyEntry/index.tsx:61](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L61)

___

### disabled

• **disabled**: *boolean*

The disabled flag is passed often when the value is somehow
enforced, this means that the field cannot truly be editted
and attempts are futile to modify

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[disabled](client_internal_components_propertyentry.ipropertyentryrendererprops.md#disabled)

Defined in: [client/internal/components/PropertyEntry/index.tsx:109](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L109)

___

### enableUserSetErrors

• **enableUserSetErrors**: () => *void*

Allows for the display of user set error statuses, normally you
will call this function when your frield has been blurred so that
currentInvalidReason gets populated even if the field is not poked

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/index.tsx:116](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L116)

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[enableUserSetErrors](client_internal_components_propertyentry.ipropertyentryrendererprops.md#enableuserseterrors)

Defined in: [client/internal/components/PropertyEntry/index.tsx:116](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L116)

___

### falseLabel

• **falseLabel**: *string*

The label for the false value, it is localized, and it can be passed optionally, there's a default for it otherwise

Defined in: [client/internal/components/PropertyEntry/PropertyEntryBoolean.tsx:27](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/PropertyEntryBoolean.tsx#L27)

___

### icon

• `Optional` **icon**: ReactNode

Icon are an UI defined property for an icon to use during the view, handle as you wish

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[icon](client_internal_components_propertyentry.ipropertyentryrendererprops.md#icon)

Defined in: [client/internal/components/PropertyEntry/index.tsx:65](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L65)

___

### isTernary

• **isTernary**: *boolean*

Defines if the boolean represents a ternary boolean type, aka it's a nullable boolean, so
it holds 3 values, true, false and null; you should use different logic for ternary booleans

Defined in: [client/internal/components/PropertyEntry/PropertyEntryBoolean.tsx:19](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/PropertyEntryBoolean.tsx#L19)

___

### label

• `Optional` **label**: *string*

label of the property, every property should have a label unless it's hidden
this is locale specific

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[label](client_internal_components_propertyentry.ipropertyentryrendererprops.md#label)

Defined in: [client/internal/components/PropertyEntry/index.tsx:51](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L51)

___

### nullLabel

• **nullLabel**: *string*

The label for the null value, it is localized, and it can be passed optionally, there's a default for it otherwise

Defined in: [client/internal/components/PropertyEntry/PropertyEntryBoolean.tsx:31](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/PropertyEntryBoolean.tsx#L31)

___

### onChange

• **onChange**: (`value`: *boolean*, `internalValue`: *any*) => *void*

Standard on change function, every renderer will recieve this function
to trigger a change, however sometimes handlers will pass their own
change function that is supposed to be used instead of this one so
caution is advised which one to use

#### Type declaration:

▸ (`value`: *boolean*, `internalValue`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | *boolean* |
`internalValue` | *any* |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/index.tsx:124](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L124)

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[onChange](client_internal_components_propertyentry.ipropertyentryrendererprops.md#onchange)

Defined in: [client/internal/components/PropertyEntry/index.tsx:124](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L124)

___

### onRestore

• **onRestore**: () => *void*

Call in order to trigger restoration, ensure that canRestore is true
when doing this

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/index.tsx:129](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L129)

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[onRestore](client_internal_components_propertyentry.ipropertyentryrendererprops.md#onrestore)

Defined in: [client/internal/components/PropertyEntry/index.tsx:129](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L129)

___

### placeholder

• `Optional` **placeholder**: *string*

The placeholder of the property, every property should have a placeholder unless it's hidden
this is locale specific

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[placeholder](client_internal_components_propertyentry.ipropertyentryrendererprops.md#placeholder)

Defined in: [client/internal/components/PropertyEntry/index.tsx:56](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L56)

___

### propertyId

• **propertyId**: *string*

The property id in question

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[propertyId](client_internal_components_propertyentry.ipropertyentryrendererprops.md#propertyid)

Defined in: [client/internal/components/PropertyEntry/index.tsx:45](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L45)

___

### rtl

• **rtl**: *boolean*

Whether it is in rtl mode for a rtl language

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[rtl](client_internal_components_propertyentry.ipropertyentryrendererprops.md#rtl)

Defined in: [client/internal/renderer.ts:15](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/renderer.ts#L15)

___

### trueLabel

• **trueLabel**: *string*

The label for the true value, it is localized, and it can be passed optionally, there's a default for it otherwise

Defined in: [client/internal/components/PropertyEntry/PropertyEntryBoolean.tsx:23](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/PropertyEntryBoolean.tsx#L23)
