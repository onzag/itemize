[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/components/PropertyEntry/PropertyEntryField](../modules/client_internal_components_PropertyEntry_PropertyEntryField.md) / IPropertyEntryFieldRendererProps

# Interface: IPropertyEntryFieldRendererProps

[client/internal/components/PropertyEntry/PropertyEntryField](../modules/client_internal_components_PropertyEntry_PropertyEntryField.md).IPropertyEntryFieldRendererProps

The property field renderers that every field will get

## Hierarchy

- [`IPropertyEntryRendererProps`](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md)<`ValueType`\>

  ↳ **`IPropertyEntryFieldRendererProps`**

## Table of contents

### Properties

- [args](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#args)
- [autoFocus](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#autofocus)
- [canRestore](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#canrestore)
- [countriesAvailable](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#countriesavailable)
- [currency](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#currency)
- [currencyAvailable](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#currencyavailable)
- [currencyFormat](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#currencyformat)
- [currencyI18n](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#currencyi18n)
- [currentAppliedValue](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#currentappliedvalue)
- [currentInternalValue](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#currentinternalvalue)
- [currentInvalidReason](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#currentinvalidreason)
- [currentTextualValue](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#currenttextualvalue)
- [currentValid](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#currentvalid)
- [currentValue](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#currentvalue)
- [currentValueLang](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#currentvaluelang)
- [defaultCountry](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#defaultcountry)
- [defaultCurrency](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#defaultcurrency)
- [defaultLanguage](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#defaultlanguage)
- [description](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#description)
- [disabled](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#disabled)
- [isNumericType](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#isnumerictype)
- [label](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#label)
- [language](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#language)
- [languageOverride](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#languageoverride)
- [languagesAvailable](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#languagesavailable)
- [placeholder](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#placeholder)
- [propertyId](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#propertyid)
- [rtl](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#rtl)
- [subtype](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#subtype)
- [type](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#type)
- [uniqueId](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#uniqueid)
- [unit](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#unit)
- [unitI18n](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#uniti18n)
- [unitImperialOptions](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#unitimperialoptions)
- [unitIsLockedToPrimaries](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#unitislockedtoprimaries)
- [unitOptions](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#unitoptions)
- [unitPrefersImperial](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#unitprefersimperial)
- [unitPrimary](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#unitprimary)
- [unitPrimaryImperial](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#unitprimaryimperial)

### Methods

- [enableUserSetErrors](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#enableuserseterrors)
- [onChange](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#onchange)
- [onChangeByTextualValue](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#onchangebytextualvalue)
- [onChangeCurrency](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#onchangecurrency)
- [onChangeTextLanguage](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#onchangetextlanguage)
- [onChangeUnit](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#onchangeunit)
- [onRestore](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#onrestore)
- [unitToNode](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#unittonode)

## Properties

### args

• **args**: `Object`

The renderer args

#### Index signature

▪ [arg: `string`]: `any`

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[args](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#args)

#### Defined in

[client/internal/renderer.ts:19](https://github.com/onzag/itemize/blob/a24376ed/client/internal/renderer.ts#L19)

___

### autoFocus

• **autoFocus**: `boolean`

Whether the entry should autofocus

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[autoFocus](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#autofocus)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:107](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/index.tsx#L107)

___

### canRestore

• **canRestore**: `boolean`

A boolean, normally true if our current applied value differs from our
current value, this check is exceptional as it uses the local equal function

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[canRestore](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#canrestore)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:79](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/index.tsx#L79)

___

### countriesAvailable

• `Optional` **countriesAvailable**: [`ICountryType`](imported_resources.ICountryType.md)[]

The countries we have available, only avaliable if subtype is phone, country or language

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:191](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L191)

___

### currency

• `Optional` **currency**: [`ICurrencyType`](imported_resources.ICurrencyType.md)

So the curency we are currently using, only available if type="currency"

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:209](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L209)

___

### currencyAvailable

• `Optional` **currencyAvailable**: [`ICurrencyType`](imported_resources.ICurrencyType.md)[]

All the currency types that are available, so you can allow for chosing
an alternative currency, only available if type="currency" or subtype is currency

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:219](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L219)

___

### currencyFormat

• `Optional` **currencyFormat**: ``"$N"`` \| ``"N$"``

So the curency format, it's a localization specific question, and specifies
whether the currency symbol goes first or last, only available if type="currency"

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:214](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L214)

___

### currencyI18n

• `Optional` **currencyI18n**: `ICurrencyI18nType`

The currency i18n data, only available if type="currency"

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:223](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L223)

___

### currentAppliedValue

• **currentAppliedValue**: `ValueType`

The currently applied value that is in sync with the server side

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[currentAppliedValue](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentappliedvalue)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:74](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/index.tsx#L74)

___

### currentInternalValue

• `Optional` **currentInternalValue**: `any`

The current internal value, if any given

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[currentInternalValue](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentinternalvalue)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:102](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/index.tsx#L102)

___

### currentInvalidReason

• `Optional` **currentInvalidReason**: `string`

If current valid is false, then there might be a reason
attached to it, this invalid reason is locale specific;
if there's no currently invalid reason, this usually means
the item was forced into the invalid state by the passing
of a flag

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[currentInvalidReason](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentinvalidreason)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:98](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/index.tsx#L98)

___

### currentTextualValue

• **currentTextualValue**: `string`

A current textual value formatted as it should be, use this value
instead of any of the internal value or the current value

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:163](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L163)

___

### currentValid

• **currentValid**: `boolean`

Whether this current value is currently seen as valid, this is a finicky
value that does not correlate directly to the actual property
state; things such as being poked, or the user having forced
a value for this play a role as well

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[currentValid](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentvalid)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:90](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/index.tsx#L90)

___

### currentValue

• **currentValue**: `ValueType`

The current value

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[currentValue](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentvalue)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:83](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/index.tsx#L83)

___

### currentValueLang

• **currentValueLang**: `string`

When using a text type that has language information this specifies
what language is believed to be in use by the field

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:169](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L169)

___

### defaultCountry

• `Optional` **defaultCountry**: [`ICountryType`](imported_resources.ICountryType.md)

The country we are currently using, only avaliable if subtype is phone, country or language

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:187](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L187)

___

### defaultCurrency

• `Optional` **defaultCurrency**: [`ICurrencyType`](imported_resources.ICurrencyType.md)

The currency we are currently using, only avaliable if subtype is currency or type is currency

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:205](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L205)

___

### defaultLanguage

• `Optional` **defaultLanguage**: [`ILanguageType`](imported_resources.ILanguageType.md)

The language we are currently using, only avaliable if subtype is language

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:196](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L196)

___

### description

• `Optional` **description**: `string`

The description of the property, properties might or might not have descriptions
this is locale specific; the description might not be passed if specified by the UI

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[description](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#description)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:69](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/index.tsx#L69)

___

### disabled

• **disabled**: `boolean`

The disabled flag is passed often when the value is somehow
enforced, this means that the field cannot truly be editted
and attempts are futile to modify

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[disabled](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#disabled)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:113](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/index.tsx#L113)

___

### isNumericType

• **isNumericType**: `boolean`

Whether the type is a numeric type, INTEGER or FLOAT apply

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:158](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L158)

___

### label

• `Optional` **label**: `string`

label of the property, every property should have a label unless it's hidden
this is locale specific

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[label](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#label)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:59](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/index.tsx#L59)

___

### language

• **language**: `string`

The current language being used by the client overall in the app

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[language](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#language)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:138](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/index.tsx#L138)

___

### languageOverride

• `Optional` **languageOverride**: `string`

An optional language used mainly for the text type to override
own language properties that currently only text supports that

It may be possible for the editor to set its own text language
value if it has its own

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[languageOverride](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#languageoverride)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:147](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/index.tsx#L147)

___

### languagesAvailable

• `Optional` **languagesAvailable**: [`ILanguageType`](imported_resources.ILanguageType.md)[]

The languages we have available

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:200](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L200)

___

### placeholder

• `Optional` **placeholder**: `string`

The placeholder of the property, every property should have a placeholder unless it's hidden
this is locale specific

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[placeholder](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#placeholder)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:64](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/index.tsx#L64)

___

### propertyId

• **propertyId**: `string`

The property id in question

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[propertyId](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#propertyid)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:47](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/index.tsx#L47)

___

### rtl

• **rtl**: `boolean`

Whether it is in rtl mode for a rtl language

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[rtl](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#rtl)

#### Defined in

[client/internal/renderer.ts:15](https://github.com/onzag/itemize/blob/a24376ed/client/internal/renderer.ts#L15)

___

### subtype

• `Optional` **subtype**: `string`

These are the subtypes

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:153](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L153)

___

### type

• **type**: ``"string"`` \| ``"number"`` \| ``"integer"`` \| ``"currency"`` \| ``"unit"`` \| ``"password"`` \| ``"text"`` \| ``"year"``

These are the types that every field renderer is expected to support, the handler
makes it easier so implementing it shouldn't be too hard

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:149](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L149)

___

### uniqueId

• **uniqueId**: `string`

an unique id for this property
with the id and the version they are related to

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[uniqueId](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#uniqueid)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:53](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/index.tsx#L53)

___

### unit

• `Optional` **unit**: `string`

The current unit code, only available if type="unit"

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:234](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L234)

___

### unitI18n

• `Optional` **unitI18n**: `IUnitI18nType`

The unit i18n data
only available if type="unit"

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:268](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L268)

___

### unitImperialOptions

• `Optional` **unitImperialOptions**: `string`[]

The code for all the unit options for the imperial type, only available if type="unit"
use these options to build a list to change the unit

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:252](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L252)

___

### unitIsLockedToPrimaries

• `Optional` **unitIsLockedToPrimaries**: `boolean`

Specifies that you shouldn't really try to switch the unit to any other than
unitPrimary, and unitPrimaryImperial
only available if type="unit"

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:263](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L263)

___

### unitOptions

• `Optional` **unitOptions**: `string`[]

The code for all the unit options for the metric type, only available if type="unit"
use these options to build a list to change the unit

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:247](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L247)

___

### unitPrefersImperial

• `Optional` **unitPrefersImperial**: `boolean`

Specifies whether you should give priority to imperial over metric,
only available if type="unit"

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:257](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L257)

___

### unitPrimary

• `Optional` **unitPrimary**: `string`

The code for the primary metric unit, only available if type="unit"

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:238](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L238)

___

### unitPrimaryImperial

• `Optional` **unitPrimaryImperial**: `string`

The code for the primary imperial unit, only available if type="unit"

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:242](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L242)

## Methods

### enableUserSetErrors

▸ **enableUserSetErrors**(): `void`

Allows for the display of user set error statuses, normally you
will call this function when your field has been blurred so that
currentInvalidReason gets populated even if the field is not poked

#### Returns

`void`

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[enableUserSetErrors](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#enableuserseterrors)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:120](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/index.tsx#L120)

___

### onChange

▸ **onChange**(`value`, `internalValue`): `void`

Standard on change function, every renderer will recieve this function
to trigger a change, however sometimes handlers will pass their own
change function that is supposed to be used instead of this one so
caution is advised which one to use

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `ValueType` |
| `internalValue` | `any` |

#### Returns

`void`

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[onChange](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#onchange)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:128](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/index.tsx#L128)

___

### onChangeByTextualValue

▸ **onChangeByTextualValue**(`textualValue`): `void`

Use this function instead of the onChange function, just pass
the textual value that the user input, the handler will be in charge
of knowing what value to apply to the actual item definition

#### Parameters

| Name | Type |
| :------ | :------ |
| `textualValue` | `string` |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:176](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L176)

___

### onChangeCurrency

▸ `Optional` **onChangeCurrency**(`code`): `void`

Change the currency to another currecy, only available if type="currency"
pick the currency from the currencyAvailable, every currency in that list
should have a code, only available if type="currency"

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `string` |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:229](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L229)

___

### onChangeTextLanguage

▸ **onChangeTextLanguage**(`code`): `void`

Text types when rendered by the field have a language property that specify
the language that the field is using, use this to change such language

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `string` |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:182](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L182)

___

### onChangeUnit

▸ `Optional` **onChangeUnit**(`unit`): `void`

Change the unit code
only available if type="unit"

#### Parameters

| Name | Type |
| :------ | :------ |
| `unit` | `string` |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:279](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L279)

___

### onRestore

▸ **onRestore**(): `void`

Call in order to trigger restoration, ensure that canRestore is true
when doing this

#### Returns

`void`

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[onRestore](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#onrestore)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:133](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/index.tsx#L133)

___

### unitToNode

▸ `Optional` **unitToNode**(`unit`): `ReactNode`

Unit codes are not meant to be nice on the screen, this converts these unit
codes to a human readable unit node
only available if type="unit"

#### Parameters

| Name | Type |
| :------ | :------ |
| `unit` | `string` |

#### Returns

`ReactNode`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:274](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L274)
