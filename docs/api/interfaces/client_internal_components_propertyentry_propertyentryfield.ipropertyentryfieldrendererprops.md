[](../README.md) / [Exports](../modules.md) / [client/internal/components/PropertyEntry/PropertyEntryField](../modules/client_internal_components_propertyentry_propertyentryfield.md) / IPropertyEntryFieldRendererProps

# Interface: IPropertyEntryFieldRendererProps

[client/internal/components/PropertyEntry/PropertyEntryField](../modules/client_internal_components_propertyentry_propertyentryfield.md).IPropertyEntryFieldRendererProps

The property field renderers that every field will get

## Hierarchy

* [*IPropertyEntryRendererProps*](client_internal_components_propertyentry.ipropertyentryrendererprops.md)<string\>

  ↳ **IPropertyEntryFieldRendererProps**

## Table of contents

### Properties

- [args](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md#args)
- [autoFocus](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md#autofocus)
- [canRestore](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md#canrestore)
- [currency](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md#currency)
- [currencyAvailable](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md#currencyavailable)
- [currencyFormat](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md#currencyformat)
- [currencyI18n](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md#currencyi18n)
- [currentAppliedValue](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md#currentappliedvalue)
- [currentInternalValue](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md#currentinternalvalue)
- [currentInvalidReason](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md#currentinvalidreason)
- [currentTextualValue](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md#currenttextualvalue)
- [currentValid](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md#currentvalid)
- [currentValue](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md#currentvalue)
- [description](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md#description)
- [disabled](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md#disabled)
- [enableUserSetErrors](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md#enableuserseterrors)
- [htmlAutocomplete](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md#htmlautocomplete)
- [icon](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md#icon)
- [isNumericType](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md#isnumerictype)
- [label](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md#label)
- [onChange](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md#onchange)
- [onChangeByTextualValue](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md#onchangebytextualvalue)
- [onChangeCurrency](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md#onchangecurrency)
- [onChangeUnit](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md#onchangeunit)
- [onRestore](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md#onrestore)
- [placeholder](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md#placeholder)
- [propertyId](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md#propertyid)
- [rtl](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md#rtl)
- [subtype](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md#subtype)
- [type](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md#type)
- [unit](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md#unit)
- [unitI18n](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md#uniti18n)
- [unitImperialOptions](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md#unitimperialoptions)
- [unitIsLockedToPrimaries](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md#unitislockedtoprimaries)
- [unitOptions](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md#unitoptions)
- [unitPrefersImperial](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md#unitprefersimperial)
- [unitPrimary](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md#unitprimary)
- [unitPrimaryImperial](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md#unitprimaryimperial)
- [unitToNode](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md#unittonode)

## Properties

### args

• **args**: *object*

The renderer args

#### Type declaration:

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[args](client_internal_components_propertyentry.ipropertyentryrendererprops.md#args)

Defined in: [client/internal/renderer.ts:19](https://github.com/onzag/itemize/blob/11a98dec/client/internal/renderer.ts#L19)

___

### autoFocus

• **autoFocus**: *boolean*

Whether the entry should autofocus

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[autoFocus](client_internal_components_propertyentry.ipropertyentryrendererprops.md#autofocus)

Defined in: [client/internal/components/PropertyEntry/index.tsx:103](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/index.tsx#L103)

___

### canRestore

• **canRestore**: *boolean*

A boolean, normally true if our current applied value differs from our
current value, this check is exceptional as it uses the local equal function

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[canRestore](client_internal_components_propertyentry.ipropertyentryrendererprops.md#canrestore)

Defined in: [client/internal/components/PropertyEntry/index.tsx:75](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/index.tsx#L75)

___

### currency

• `Optional` **currency**: [*ICurrencyType*](imported_resources.icurrencytype.md)

So the curency we are currently using, only available if type="currency"

Defined in: [client/internal/components/PropertyEntry/PropertyEntryField.tsx:140](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L140)

___

### currencyAvailable

• `Optional` **currencyAvailable**: [*ICurrencyType*](imported_resources.icurrencytype.md)[]

All the currency types that are available, so you can allow for chosing
an alternative currency, only available if type="currency"

Defined in: [client/internal/components/PropertyEntry/PropertyEntryField.tsx:150](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L150)

___

### currencyFormat

• `Optional` **currencyFormat**: *$N* \| *N$*

So the curency format, it's a localization specific question, and specifies
whether the currency symbol goes first or last, only available if type="currency"

Defined in: [client/internal/components/PropertyEntry/PropertyEntryField.tsx:145](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L145)

___

### currencyI18n

• `Optional` **currencyI18n**: ICurrencyI18nType

The currency i18n data, only available if type="currency"

Defined in: [client/internal/components/PropertyEntry/PropertyEntryField.tsx:154](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L154)

___

### currentAppliedValue

• **currentAppliedValue**: *string*

The currently applied value that is in sync with the server side

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[currentAppliedValue](client_internal_components_propertyentry.ipropertyentryrendererprops.md#currentappliedvalue)

Defined in: [client/internal/components/PropertyEntry/index.tsx:70](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/index.tsx#L70)

___

### currentInternalValue

• `Optional` **currentInternalValue**: *any*

The current internal value, if any given

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[currentInternalValue](client_internal_components_propertyentry.ipropertyentryrendererprops.md#currentinternalvalue)

Defined in: [client/internal/components/PropertyEntry/index.tsx:98](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/index.tsx#L98)

___

### currentInvalidReason

• `Optional` **currentInvalidReason**: *string*

If current valid is false, then there might be a reason
attached to it, this invalid reason is locale specific;
if there's no currently invalid reason, this usually means
the item was forced into the invalid state by the passing
of a flag

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[currentInvalidReason](client_internal_components_propertyentry.ipropertyentryrendererprops.md#currentinvalidreason)

Defined in: [client/internal/components/PropertyEntry/index.tsx:94](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/index.tsx#L94)

___

### currentTextualValue

• **currentTextualValue**: *string*

A current textual value formatted as it should be, use this value
instead of any of the internal value or the current value

Defined in: [client/internal/components/PropertyEntry/PropertyEntryField.tsx:129](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L129)

___

### currentValid

• **currentValid**: *boolean*

Whether this current value is currently seen as valid, this is a finicky
value that does not correlate directly to the actual property
state; things such as being poked, or the user having forced
a value for this play a role as well

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[currentValid](client_internal_components_propertyentry.ipropertyentryrendererprops.md#currentvalid)

Defined in: [client/internal/components/PropertyEntry/index.tsx:86](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/index.tsx#L86)

___

### currentValue

• **currentValue**: *string*

The current value

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[currentValue](client_internal_components_propertyentry.ipropertyentryrendererprops.md#currentvalue)

Defined in: [client/internal/components/PropertyEntry/index.tsx:79](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/index.tsx#L79)

___

### description

• `Optional` **description**: *string*

The description of the property, properties might or might not have descriptions
this is locale specific; the description might not be passed if specified by the UI

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[description](client_internal_components_propertyentry.ipropertyentryrendererprops.md#description)

Defined in: [client/internal/components/PropertyEntry/index.tsx:61](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/index.tsx#L61)

___

### disabled

• **disabled**: *boolean*

The disabled flag is passed often when the value is somehow
enforced, this means that the field cannot truly be editted
and attempts are futile to modify

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[disabled](client_internal_components_propertyentry.ipropertyentryrendererprops.md#disabled)

Defined in: [client/internal/components/PropertyEntry/index.tsx:109](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/index.tsx#L109)

___

### enableUserSetErrors

• **enableUserSetErrors**: () => *void*

Allows for the display of user set error statuses, normally you
will call this function when your frield has been blurred so that
currentInvalidReason gets populated even if the field is not poked

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/index.tsx:116](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/index.tsx#L116)

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[enableUserSetErrors](client_internal_components_propertyentry.ipropertyentryrendererprops.md#enableuserseterrors)

Defined in: [client/internal/components/PropertyEntry/index.tsx:116](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/index.tsx#L116)

___

### htmlAutocomplete

• `Optional` **htmlAutocomplete**: *string*

The html autocomplete value is a property that comes in the schema to define how it is
to be html autocompleted

Defined in: [client/internal/components/PropertyEntry/PropertyEntryField.tsx:119](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L119)

___

### icon

• `Optional` **icon**: ReactNode

Icon are an UI defined property for an icon to use during the view, handle as you wish

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[icon](client_internal_components_propertyentry.ipropertyentryrendererprops.md#icon)

Defined in: [client/internal/components/PropertyEntry/index.tsx:65](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/index.tsx#L65)

___

### isNumericType

• **isNumericType**: *boolean*

Whether the type is a numeric type, INTEGER or FLOAT apply

Defined in: [client/internal/components/PropertyEntry/PropertyEntryField.tsx:124](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L124)

___

### label

• `Optional` **label**: *string*

label of the property, every property should have a label unless it's hidden
this is locale specific

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[label](client_internal_components_propertyentry.ipropertyentryrendererprops.md#label)

Defined in: [client/internal/components/PropertyEntry/index.tsx:51](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/index.tsx#L51)

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

Defined in: [client/internal/components/PropertyEntry/index.tsx:124](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/index.tsx#L124)

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[onChange](client_internal_components_propertyentry.ipropertyentryrendererprops.md#onchange)

Defined in: [client/internal/components/PropertyEntry/index.tsx:124](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/index.tsx#L124)

___

### onChangeByTextualValue

• **onChangeByTextualValue**: (`textualValue`: *string*) => *void*

Use this function instead of the onChange function, just pass
the textual value that the user input, the handler will be in charge
of knowing what value to apply to the actual item definition

#### Type declaration:

▸ (`textualValue`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`textualValue` | *string* |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryField.tsx:135](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L135)

Defined in: [client/internal/components/PropertyEntry/PropertyEntryField.tsx:135](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L135)

___

### onChangeCurrency

• `Optional` **onChangeCurrency**: (`code`: *string*) => *void*

Change the currency to another currecy, only available if type="currency"
pick the currency from the currencyAvailable, every currency in that list
should have a code, only available if type="currency"

#### Type declaration:

▸ (`code`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`code` | *string* |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryField.tsx:160](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L160)

Defined in: [client/internal/components/PropertyEntry/PropertyEntryField.tsx:160](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L160)

___

### onChangeUnit

• `Optional` **onChangeUnit**: (`unit`: *string*) => *void*

Change the unit code
only available if type="unit"

#### Type declaration:

▸ (`unit`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`unit` | *string* |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryField.tsx:210](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L210)

Defined in: [client/internal/components/PropertyEntry/PropertyEntryField.tsx:210](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L210)

___

### onRestore

• **onRestore**: () => *void*

Call in order to trigger restoration, ensure that canRestore is true
when doing this

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/index.tsx:129](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/index.tsx#L129)

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[onRestore](client_internal_components_propertyentry.ipropertyentryrendererprops.md#onrestore)

Defined in: [client/internal/components/PropertyEntry/index.tsx:129](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/index.tsx#L129)

___

### placeholder

• `Optional` **placeholder**: *string*

The placeholder of the property, every property should have a placeholder unless it's hidden
this is locale specific

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[placeholder](client_internal_components_propertyentry.ipropertyentryrendererprops.md#placeholder)

Defined in: [client/internal/components/PropertyEntry/index.tsx:56](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/index.tsx#L56)

___

### propertyId

• **propertyId**: *string*

The property id in question

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[propertyId](client_internal_components_propertyentry.ipropertyentryrendererprops.md#propertyid)

Defined in: [client/internal/components/PropertyEntry/index.tsx:45](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/index.tsx#L45)

___

### rtl

• **rtl**: *boolean*

Whether it is in rtl mode for a rtl language

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[rtl](client_internal_components_propertyentry.ipropertyentryrendererprops.md#rtl)

Defined in: [client/internal/renderer.ts:15](https://github.com/onzag/itemize/blob/11a98dec/client/internal/renderer.ts#L15)

___

### subtype

• `Optional` **subtype**: *string*

These are the subtypes

Defined in: [client/internal/components/PropertyEntry/PropertyEntryField.tsx:114](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L114)

___

### type

• **type**: *string* \| *number* \| *integer* \| *currency* \| *unit* \| *password* \| *text* \| *year*

These are the types that every field renderer is expected to support, the handler
makes it easier so implementing it shouldn't be too hard

Defined in: [client/internal/components/PropertyEntry/PropertyEntryField.tsx:110](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L110)

___

### unit

• `Optional` **unit**: *string*

The current unit code, only available if type="unit"

Defined in: [client/internal/components/PropertyEntry/PropertyEntryField.tsx:165](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L165)

___

### unitI18n

• `Optional` **unitI18n**: IUnitI18nType

The unit i18n data
only available if type="unit"

Defined in: [client/internal/components/PropertyEntry/PropertyEntryField.tsx:199](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L199)

___

### unitImperialOptions

• `Optional` **unitImperialOptions**: *string*[]

The code for all the unit options for the imperial type, only available if type="unit"
use these options to build a list to change the unit

Defined in: [client/internal/components/PropertyEntry/PropertyEntryField.tsx:183](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L183)

___

### unitIsLockedToPrimaries

• `Optional` **unitIsLockedToPrimaries**: *boolean*

Specifies that you shouldn't really try to switch the unit to any other than
unitPrimary, and unitPrimaryImperial
only available if type="unit"

Defined in: [client/internal/components/PropertyEntry/PropertyEntryField.tsx:194](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L194)

___

### unitOptions

• `Optional` **unitOptions**: *string*[]

The code for all the unit options for the metric type, only available if type="unit"
use these options to build a list to change the unit

Defined in: [client/internal/components/PropertyEntry/PropertyEntryField.tsx:178](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L178)

___

### unitPrefersImperial

• `Optional` **unitPrefersImperial**: *boolean*

Specifies whether you should give priority to imperial over metric,
only available if type="unit"

Defined in: [client/internal/components/PropertyEntry/PropertyEntryField.tsx:188](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L188)

___

### unitPrimary

• `Optional` **unitPrimary**: *string*

The code for the primary metric unit, only available if type="unit"

Defined in: [client/internal/components/PropertyEntry/PropertyEntryField.tsx:169](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L169)

___

### unitPrimaryImperial

• `Optional` **unitPrimaryImperial**: *string*

The code for the primary imperial unit, only available if type="unit"

Defined in: [client/internal/components/PropertyEntry/PropertyEntryField.tsx:173](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L173)

___

### unitToNode

• `Optional` **unitToNode**: (`unit`: *string*) => ReactNode

Unit codes are not meant to be nice on the screen, this converts these unit
codes to a human readable unit node
only available if type="unit"

#### Type declaration:

▸ (`unit`: *string*): ReactNode

#### Parameters:

Name | Type |
:------ | :------ |
`unit` | *string* |

**Returns:** ReactNode

Defined in: [client/internal/components/PropertyEntry/PropertyEntryField.tsx:205](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L205)

Defined in: [client/internal/components/PropertyEntry/PropertyEntryField.tsx:205](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L205)
