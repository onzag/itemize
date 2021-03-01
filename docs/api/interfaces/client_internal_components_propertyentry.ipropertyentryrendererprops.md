[](../README.md) / [Exports](../modules.md) / [client/internal/components/PropertyEntry](../modules/client_internal_components_propertyentry.md) / IPropertyEntryRendererProps

# Interface: IPropertyEntryRendererProps<ValueType\>

[client/internal/components/PropertyEntry](../modules/client_internal_components_propertyentry.md).IPropertyEntryRendererProps

This is what every renderer gets regardless of type as long as it's an entry
type, it will get this instance as its props, the ValueType represents the property definition
type it epects as its current value

Expect these to be extended

## Type parameters

Name |
:------ |
`ValueType` |

## Hierarchy

* [*IRendererProps*](client_internal_renderer.irendererprops.md)

  ↳ **IPropertyEntryRendererProps**

  ↳↳ [*IPropertyEntryBooleanRendererProps*](client_internal_components_propertyentry_propertyentryboolean.ipropertyentrybooleanrendererprops.md)

  ↳↳ [*IPropertyEntryDateTimeRendererProps*](client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md)

  ↳↳ [*IPropertyEntryFieldRendererProps*](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md)

  ↳↳ [*IPropertyEntryFileRendererProps*](client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md)

  ↳↳ [*IPropertyEntryLocationRendererProps*](client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md)

  ↳↳ [*IPropertyEntryReferenceRendererProps*](client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md)

  ↳↳ [*IPropertyEntrySelectRendererProps*](client_internal_components_propertyentry_propertyentryselect.ipropertyentryselectrendererprops.md)

  ↳↳ [*IPropertyEntryTextRendererProps*](client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md)

## Table of contents

### Properties

- [args](client_internal_components_propertyentry.ipropertyentryrendererprops.md#args)
- [autoFocus](client_internal_components_propertyentry.ipropertyentryrendererprops.md#autofocus)
- [canRestore](client_internal_components_propertyentry.ipropertyentryrendererprops.md#canrestore)
- [currentAppliedValue](client_internal_components_propertyentry.ipropertyentryrendererprops.md#currentappliedvalue)
- [currentInternalValue](client_internal_components_propertyentry.ipropertyentryrendererprops.md#currentinternalvalue)
- [currentInvalidReason](client_internal_components_propertyentry.ipropertyentryrendererprops.md#currentinvalidreason)
- [currentValid](client_internal_components_propertyentry.ipropertyentryrendererprops.md#currentvalid)
- [currentValue](client_internal_components_propertyentry.ipropertyentryrendererprops.md#currentvalue)
- [description](client_internal_components_propertyentry.ipropertyentryrendererprops.md#description)
- [disabled](client_internal_components_propertyentry.ipropertyentryrendererprops.md#disabled)
- [enableUserSetErrors](client_internal_components_propertyentry.ipropertyentryrendererprops.md#enableuserseterrors)
- [icon](client_internal_components_propertyentry.ipropertyentryrendererprops.md#icon)
- [label](client_internal_components_propertyentry.ipropertyentryrendererprops.md#label)
- [onChange](client_internal_components_propertyentry.ipropertyentryrendererprops.md#onchange)
- [onRestore](client_internal_components_propertyentry.ipropertyentryrendererprops.md#onrestore)
- [placeholder](client_internal_components_propertyentry.ipropertyentryrendererprops.md#placeholder)
- [propertyId](client_internal_components_propertyentry.ipropertyentryrendererprops.md#propertyid)
- [rtl](client_internal_components_propertyentry.ipropertyentryrendererprops.md#rtl)

## Properties

### args

• **args**: *object*

The renderer args

#### Type declaration:

Inherited from: [IRendererProps](client_internal_renderer.irendererprops.md).[args](client_internal_renderer.irendererprops.md#args)

Defined in: [client/internal/renderer.ts:19](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/renderer.ts#L19)

___

### autoFocus

• **autoFocus**: *boolean*

Whether the entry should autofocus

Defined in: [client/internal/components/PropertyEntry/index.tsx:103](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/index.tsx#L103)

___

### canRestore

• **canRestore**: *boolean*

A boolean, normally true if our current applied value differs from our
current value, this check is exceptional as it uses the local equal function

Defined in: [client/internal/components/PropertyEntry/index.tsx:75](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/index.tsx#L75)

___

### currentAppliedValue

• **currentAppliedValue**: ValueType

The currently applied value that is in sync with the server side

Defined in: [client/internal/components/PropertyEntry/index.tsx:70](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/index.tsx#L70)

___

### currentInternalValue

• `Optional` **currentInternalValue**: *any*

The current internal value, if any given

Defined in: [client/internal/components/PropertyEntry/index.tsx:98](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/index.tsx#L98)

___

### currentInvalidReason

• `Optional` **currentInvalidReason**: *string*

If current valid is false, then there might be a reason
attached to it, this invalid reason is locale specific;
if there's no currently invalid reason, this usually means
the item was forced into the invalid state by the passing
of a flag

Defined in: [client/internal/components/PropertyEntry/index.tsx:94](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/index.tsx#L94)

___

### currentValid

• **currentValid**: *boolean*

Whether this current value is currently seen as valid, this is a finicky
value that does not correlate directly to the actual property
state; things such as being poked, or the user having forced
a value for this play a role as well

Defined in: [client/internal/components/PropertyEntry/index.tsx:86](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/index.tsx#L86)

___

### currentValue

• **currentValue**: ValueType

The current value

Defined in: [client/internal/components/PropertyEntry/index.tsx:79](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/index.tsx#L79)

___

### description

• `Optional` **description**: *string*

The description of the property, properties might or might not have descriptions
this is locale specific; the description might not be passed if specified by the UI

Defined in: [client/internal/components/PropertyEntry/index.tsx:61](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/index.tsx#L61)

___

### disabled

• **disabled**: *boolean*

The disabled flag is passed often when the value is somehow
enforced, this means that the field cannot truly be editted
and attempts are futile to modify

Defined in: [client/internal/components/PropertyEntry/index.tsx:109](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/index.tsx#L109)

___

### enableUserSetErrors

• **enableUserSetErrors**: () => *void*

Allows for the display of user set error statuses, normally you
will call this function when your frield has been blurred so that
currentInvalidReason gets populated even if the field is not poked

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/index.tsx:116](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/index.tsx#L116)

Defined in: [client/internal/components/PropertyEntry/index.tsx:116](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/index.tsx#L116)

___

### icon

• `Optional` **icon**: ReactNode

Icon are an UI defined property for an icon to use during the view, handle as you wish

Defined in: [client/internal/components/PropertyEntry/index.tsx:65](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/index.tsx#L65)

___

### label

• `Optional` **label**: *string*

label of the property, every property should have a label unless it's hidden
this is locale specific

Defined in: [client/internal/components/PropertyEntry/index.tsx:51](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/index.tsx#L51)

___

### onChange

• **onChange**: (`value`: ValueType, `internalValue`: *any*) => *void*

Standard on change function, every renderer will recieve this function
to trigger a change, however sometimes handlers will pass their own
change function that is supposed to be used instead of this one so
caution is advised which one to use

#### Type declaration:

▸ (`value`: ValueType, `internalValue`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | ValueType |
`internalValue` | *any* |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/index.tsx:124](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/index.tsx#L124)

Defined in: [client/internal/components/PropertyEntry/index.tsx:124](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/index.tsx#L124)

___

### onRestore

• **onRestore**: () => *void*

Call in order to trigger restoration, ensure that canRestore is true
when doing this

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/index.tsx:129](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/index.tsx#L129)

Defined in: [client/internal/components/PropertyEntry/index.tsx:129](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/index.tsx#L129)

___

### placeholder

• `Optional` **placeholder**: *string*

The placeholder of the property, every property should have a placeholder unless it's hidden
this is locale specific

Defined in: [client/internal/components/PropertyEntry/index.tsx:56](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/index.tsx#L56)

___

### propertyId

• **propertyId**: *string*

The property id in question

Defined in: [client/internal/components/PropertyEntry/index.tsx:45](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/index.tsx#L45)

___

### rtl

• **rtl**: *boolean*

Whether it is in rtl mode for a rtl language

Inherited from: [IRendererProps](client_internal_renderer.irendererprops.md).[rtl](client_internal_renderer.irendererprops.md#rtl)

Defined in: [client/internal/renderer.ts:15](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/renderer.ts#L15)
