[](../README.md) / [Exports](../modules.md) / [client/internal/components/PropertyEntry/PropertyEntrySelect](../modules/client_internal_components_propertyentry_propertyentryselect.md) / IPropertyEntrySelectRendererProps

# Interface: IPropertyEntrySelectRendererProps

[client/internal/components/PropertyEntry/PropertyEntrySelect](../modules/client_internal_components_propertyentry_propertyentryselect.md).IPropertyEntrySelectRendererProps

The renderer props for implementing the select renderer that pops in
when a property has specific valid values

The select handler and renderer is one of the simplest of its kind

## Hierarchy

* [*IPropertyEntryRendererProps*](client_internal_components_propertyentry.ipropertyentryrendererprops.md)<string \| number\>

  ↳ **IPropertyEntrySelectRendererProps**

## Table of contents

### Properties

- [args](client_internal_components_propertyentry_propertyentryselect.ipropertyentryselectrendererprops.md#args)
- [autoFocus](client_internal_components_propertyentry_propertyentryselect.ipropertyentryselectrendererprops.md#autofocus)
- [canRestore](client_internal_components_propertyentry_propertyentryselect.ipropertyentryselectrendererprops.md#canrestore)
- [currentAppliedValue](client_internal_components_propertyentry_propertyentryselect.ipropertyentryselectrendererprops.md#currentappliedvalue)
- [currentI18nValue](client_internal_components_propertyentry_propertyentryselect.ipropertyentryselectrendererprops.md#currenti18nvalue)
- [currentInternalValue](client_internal_components_propertyentry_propertyentryselect.ipropertyentryselectrendererprops.md#currentinternalvalue)
- [currentInvalidReason](client_internal_components_propertyentry_propertyentryselect.ipropertyentryselectrendererprops.md#currentinvalidreason)
- [currentValid](client_internal_components_propertyentry_propertyentryselect.ipropertyentryselectrendererprops.md#currentvalid)
- [currentValue](client_internal_components_propertyentry_propertyentryselect.ipropertyentryselectrendererprops.md#currentvalue)
- [description](client_internal_components_propertyentry_propertyentryselect.ipropertyentryselectrendererprops.md#description)
- [disabled](client_internal_components_propertyentry_propertyentryselect.ipropertyentryselectrendererprops.md#disabled)
- [enableUserSetErrors](client_internal_components_propertyentry_propertyentryselect.ipropertyentryselectrendererprops.md#enableuserseterrors)
- [icon](client_internal_components_propertyentry_propertyentryselect.ipropertyentryselectrendererprops.md#icon)
- [isNullable](client_internal_components_propertyentry_propertyentryselect.ipropertyentryselectrendererprops.md#isnullable)
- [isNumeric](client_internal_components_propertyentry_propertyentryselect.ipropertyentryselectrendererprops.md#isnumeric)
- [label](client_internal_components_propertyentry_propertyentryselect.ipropertyentryselectrendererprops.md#label)
- [nullValue](client_internal_components_propertyentry_propertyentryselect.ipropertyentryselectrendererprops.md#nullvalue)
- [onChange](client_internal_components_propertyentry_propertyentryselect.ipropertyentryselectrendererprops.md#onchange)
- [onRestore](client_internal_components_propertyentry_propertyentryselect.ipropertyentryselectrendererprops.md#onrestore)
- [placeholder](client_internal_components_propertyentry_propertyentryselect.ipropertyentryselectrendererprops.md#placeholder)
- [propertyId](client_internal_components_propertyentry_propertyentryselect.ipropertyentryselectrendererprops.md#propertyid)
- [rtl](client_internal_components_propertyentry_propertyentryselect.ipropertyentryselectrendererprops.md#rtl)
- [values](client_internal_components_propertyentry_propertyentryselect.ipropertyentryselectrendererprops.md#values)

## Properties

### args

• **args**: *object*

The renderer args

#### Type declaration:

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[args](client_internal_components_propertyentry.ipropertyentryrendererprops.md#args)

Defined in: [client/internal/renderer.ts:19](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/renderer.ts#L19)

___

### autoFocus

• **autoFocus**: *boolean*

Whether the entry should autofocus

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[autoFocus](client_internal_components_propertyentry.ipropertyentryrendererprops.md#autofocus)

Defined in: [client/internal/components/PropertyEntry/index.tsx:103](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L103)

___

### canRestore

• **canRestore**: *boolean*

A boolean, normally true if our current applied value differs from our
current value, this check is exceptional as it uses the local equal function

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[canRestore](client_internal_components_propertyentry.ipropertyentryrendererprops.md#canrestore)

Defined in: [client/internal/components/PropertyEntry/index.tsx:75](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L75)

___

### currentAppliedValue

• **currentAppliedValue**: *string* \| *number*

The currently applied value that is in sync with the server side

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[currentAppliedValue](client_internal_components_propertyentry.ipropertyentryrendererprops.md#currentappliedvalue)

Defined in: [client/internal/components/PropertyEntry/index.tsx:70](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L70)

___

### currentI18nValue

• **currentI18nValue**: *string*

The current value in its localized form

Defined in: [client/internal/components/PropertyEntry/PropertyEntrySelect.tsx:44](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/PropertyEntrySelect.tsx#L44)

___

### currentInternalValue

• `Optional` **currentInternalValue**: *any*

The current internal value, if any given

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[currentInternalValue](client_internal_components_propertyentry.ipropertyentryrendererprops.md#currentinternalvalue)

Defined in: [client/internal/components/PropertyEntry/index.tsx:98](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L98)

___

### currentInvalidReason

• `Optional` **currentInvalidReason**: *string*

If current valid is false, then there might be a reason
attached to it, this invalid reason is locale specific;
if there's no currently invalid reason, this usually means
the item was forced into the invalid state by the passing
of a flag

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[currentInvalidReason](client_internal_components_propertyentry.ipropertyentryrendererprops.md#currentinvalidreason)

Defined in: [client/internal/components/PropertyEntry/index.tsx:94](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L94)

___

### currentValid

• **currentValid**: *boolean*

Whether this current value is currently seen as valid, this is a finicky
value that does not correlate directly to the actual property
state; things such as being poked, or the user having forced
a value for this play a role as well

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[currentValid](client_internal_components_propertyentry.ipropertyentryrendererprops.md#currentvalid)

Defined in: [client/internal/components/PropertyEntry/index.tsx:86](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L86)

___

### currentValue

• **currentValue**: *string* \| *number*

The current value

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[currentValue](client_internal_components_propertyentry.ipropertyentryrendererprops.md#currentvalue)

Defined in: [client/internal/components/PropertyEntry/index.tsx:79](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L79)

___

### description

• `Optional` **description**: *string*

The description of the property, properties might or might not have descriptions
this is locale specific; the description might not be passed if specified by the UI

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[description](client_internal_components_propertyentry.ipropertyentryrendererprops.md#description)

Defined in: [client/internal/components/PropertyEntry/index.tsx:61](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L61)

___

### disabled

• **disabled**: *boolean*

The disabled flag is passed often when the value is somehow
enforced, this means that the field cannot truly be editted
and attempts are futile to modify

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[disabled](client_internal_components_propertyentry.ipropertyentryrendererprops.md#disabled)

Defined in: [client/internal/components/PropertyEntry/index.tsx:109](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L109)

___

### enableUserSetErrors

• **enableUserSetErrors**: () => *void*

Allows for the display of user set error statuses, normally you
will call this function when your frield has been blurred so that
currentInvalidReason gets populated even if the field is not poked

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/index.tsx:116](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L116)

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[enableUserSetErrors](client_internal_components_propertyentry.ipropertyentryrendererprops.md#enableuserseterrors)

Defined in: [client/internal/components/PropertyEntry/index.tsx:116](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L116)

___

### icon

• `Optional` **icon**: ReactNode

Icon are an UI defined property for an icon to use during the view, handle as you wish

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[icon](client_internal_components_propertyentry.ipropertyentryrendererprops.md#icon)

Defined in: [client/internal/components/PropertyEntry/index.tsx:65](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L65)

___

### isNullable

• **isNullable**: *boolean*

Whether it is nullable, so null should be an option

Defined in: [client/internal/components/PropertyEntry/PropertyEntrySelect.tsx:36](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/PropertyEntrySelect.tsx#L36)

___

### isNumeric

• **isNumeric**: *boolean*

Whether it represents a numeric value

Defined in: [client/internal/components/PropertyEntry/PropertyEntrySelect.tsx:40](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/PropertyEntrySelect.tsx#L40)

___

### label

• `Optional` **label**: *string*

label of the property, every property should have a label unless it's hidden
this is locale specific

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[label](client_internal_components_propertyentry.ipropertyentryrendererprops.md#label)

Defined in: [client/internal/components/PropertyEntry/index.tsx:51](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L51)

___

### nullValue

• **nullValue**: *object*

The null value

#### Type declaration:

Name | Type |
:------ | :------ |
`i18nValue` | *string* |
`value` | *null* |

Defined in: [client/internal/components/PropertyEntry/PropertyEntrySelect.tsx:28](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/PropertyEntrySelect.tsx#L28)

___

### onChange

• **onChange**: (`value`: *string* \| *number*, `internalValue`: *any*) => *void*

Standard on change function, every renderer will recieve this function
to trigger a change, however sometimes handlers will pass their own
change function that is supposed to be used instead of this one so
caution is advised which one to use

#### Type declaration:

▸ (`value`: *string* \| *number*, `internalValue`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | *string* \| *number* |
`internalValue` | *any* |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/index.tsx:124](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L124)

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[onChange](client_internal_components_propertyentry.ipropertyentryrendererprops.md#onchange)

Defined in: [client/internal/components/PropertyEntry/index.tsx:124](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L124)

___

### onRestore

• **onRestore**: () => *void*

Call in order to trigger restoration, ensure that canRestore is true
when doing this

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/index.tsx:129](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L129)

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[onRestore](client_internal_components_propertyentry.ipropertyentryrendererprops.md#onrestore)

Defined in: [client/internal/components/PropertyEntry/index.tsx:129](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L129)

___

### placeholder

• `Optional` **placeholder**: *string*

The placeholder of the property, every property should have a placeholder unless it's hidden
this is locale specific

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[placeholder](client_internal_components_propertyentry.ipropertyentryrendererprops.md#placeholder)

Defined in: [client/internal/components/PropertyEntry/index.tsx:56](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L56)

___

### propertyId

• **propertyId**: *string*

The property id in question

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[propertyId](client_internal_components_propertyentry.ipropertyentryrendererprops.md#propertyid)

Defined in: [client/internal/components/PropertyEntry/index.tsx:45](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L45)

___

### rtl

• **rtl**: *boolean*

Whether it is in rtl mode for a rtl language

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[rtl](client_internal_components_propertyentry.ipropertyentryrendererprops.md#rtl)

Defined in: [client/internal/renderer.ts:15](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/renderer.ts#L15)

___

### values

• **values**: { `i18nValue`: *string* ; `value`: *string* \| *number*  }[]

The values we are working with, an array that contains
how they are going to be displayed in the user's language and the actual value

Defined in: [client/internal/components/PropertyEntry/PropertyEntrySelect.tsx:21](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/PropertyEntrySelect.tsx#L21)
