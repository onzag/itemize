[](../README.md) / [Exports](../modules.md) / [client/internal/components/PropertyEntry/PropertyEntryDateTime](../modules/client_internal_components_propertyentry_propertyentrydatetime.md) / IPropertyEntryDateTimeRendererProps

# Interface: IPropertyEntryDateTimeRendererProps

[client/internal/components/PropertyEntry/PropertyEntryDateTime](../modules/client_internal_components_propertyentry_propertyentrydatetime.md).IPropertyEntryDateTimeRendererProps

## Hierarchy

* [*IPropertyEntryRendererProps*](client_internal_components_propertyentry.ipropertyentryrendererprops.md)<[*PropertyDefinitionSupportedDateType*](../modules/base_root_module_itemdefinition_propertydefinition_types_date.md#propertydefinitionsupporteddatetype)\>

  ↳ **IPropertyEntryDateTimeRendererProps**

## Table of contents

### Properties

- [args](client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md#args)
- [autoFocus](client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md#autofocus)
- [canRestore](client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md#canrestore)
- [currentAppliedValue](client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md#currentappliedvalue)
- [currentInternalValue](client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md#currentinternalvalue)
- [currentInvalidReason](client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md#currentinvalidreason)
- [currentValid](client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md#currentvalid)
- [currentValue](client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md#currentvalue)
- [dateTimeFormat](client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md#datetimeformat)
- [description](client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md#description)
- [disabled](client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md#disabled)
- [enableUserSetErrors](client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md#enableuserseterrors)
- [i18nCancel](client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md#i18ncancel)
- [i18nOk](client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md#i18nok)
- [icon](client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md#icon)
- [label](client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md#label)
- [momentValue](client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md#momentvalue)
- [onChange](client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md#onchange)
- [onChangeByMoment](client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md#onchangebymoment)
- [onRestore](client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md#onrestore)
- [placeholder](client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md#placeholder)
- [propertyId](client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md#propertyid)
- [rtl](client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md#rtl)
- [type](client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md#type)

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

• **currentAppliedValue**: *string*

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

• **currentValue**: *string*

The current value

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[currentValue](client_internal_components_propertyentry.ipropertyentryrendererprops.md#currentvalue)

Defined in: [client/internal/components/PropertyEntry/index.tsx:79](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L79)

___

### dateTimeFormat

• **dateTimeFormat**: *string*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryDateTime.tsx:50](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/PropertyEntryDateTime.tsx#L50)

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

### i18nCancel

• **i18nCancel**: *string*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryDateTime.tsx:47](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/PropertyEntryDateTime.tsx#L47)

___

### i18nOk

• **i18nOk**: *string*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryDateTime.tsx:48](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/PropertyEntryDateTime.tsx#L48)

___

### icon

• `Optional` **icon**: ReactNode

Icon are an UI defined property for an icon to use during the view, handle as you wish

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[icon](client_internal_components_propertyentry.ipropertyentryrendererprops.md#icon)

Defined in: [client/internal/components/PropertyEntry/index.tsx:65](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L65)

___

### label

• `Optional` **label**: *string*

label of the property, every property should have a label unless it's hidden
this is locale specific

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[label](client_internal_components_propertyentry.ipropertyentryrendererprops.md#label)

Defined in: [client/internal/components/PropertyEntry/index.tsx:51](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L51)

___

### momentValue

• **momentValue**: *any*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryDateTime.tsx:46](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/PropertyEntryDateTime.tsx#L46)

___

### onChange

• **onChange**: (`value`: *string*, `internalValue`: *any*) => *void*

Standard on change function, every renderer will recieve this function
to trigger a change, however sometimes handlers will pass their own
change function that is supposed to be used instead of this one so
caution is advised which one to use

#### Type declaration:

▸ (`value`: *string*, `internalValue`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | *string* |
`internalValue` | *any* |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/index.tsx:124](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L124)

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[onChange](client_internal_components_propertyentry.ipropertyentryrendererprops.md#onchange)

Defined in: [client/internal/components/PropertyEntry/index.tsx:124](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L124)

___

### onChangeByMoment

• **onChangeByMoment**: (`value`: *any*) => *void*

#### Type declaration:

▸ (`value`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | *any* |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryDateTime.tsx:49](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/PropertyEntryDateTime.tsx#L49)

Defined in: [client/internal/components/PropertyEntry/PropertyEntryDateTime.tsx:49](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/PropertyEntryDateTime.tsx#L49)

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

### type

• **type**: *date* \| *datetime* \| *time*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryDateTime.tsx:45](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/PropertyEntryDateTime.tsx#L45)
