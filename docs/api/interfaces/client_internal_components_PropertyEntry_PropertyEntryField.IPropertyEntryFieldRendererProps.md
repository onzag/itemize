[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/components/PropertyEntry/PropertyEntryField](../modules/client_internal_components_PropertyEntry_PropertyEntryField.md) / IPropertyEntryFieldRendererProps

# Interface: IPropertyEntryFieldRendererProps

[client/internal/components/PropertyEntry/PropertyEntryField](../modules/client_internal_components_PropertyEntry_PropertyEntryField.md).IPropertyEntryFieldRendererProps

The property field renderers that every field will get

## Hierarchy

- [`IPropertyEntryRendererProps`](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md)<`string` \| `number` \| [`IPropertyDefinitionSupportedCurrencyType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_currency.IPropertyDefinitionSupportedCurrencyType.md) \| [`IPropertyDefinitionSupportedUnitType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_unit.IPropertyDefinitionSupportedUnitType.md)\>

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
- [defaultCountry](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#defaultcountry)
- [defaultCurrency](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#defaultcurrency)
- [defaultLanguage](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#defaultlanguage)
- [description](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#description)
- [disabled](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#disabled)
- [htmlAutocomplete](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#htmlautocomplete)
- [icon](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#icon)
- [isNumericType](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#isnumerictype)
- [label](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#label)
- [languagesAvailable](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#languagesavailable)
- [placeholder](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#placeholder)
- [propertyId](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#propertyid)
- [rtl](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#rtl)
- [subtype](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#subtype)
- [type](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md#type)
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

[client/internal/renderer.ts:19](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/renderer.ts#L19)

___

### autoFocus

• **autoFocus**: `boolean`

Whether the entry should autofocus

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[autoFocus](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#autofocus)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:105](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L105)

___

### canRestore

• **canRestore**: `boolean`

A boolean, normally true if our current applied value differs from our
current value, this check is exceptional as it uses the local equal function

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[canRestore](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#canrestore)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:77](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L77)

___

### countriesAvailable

• `Optional` **countriesAvailable**: [`ICountryType`](imported_resources.ICountryType.md)[]

The countries we have available, only avaliable if subtype is phone, country or language

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:145](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L145)

___

### currency

• `Optional` **currency**: [`ICurrencyType`](imported_resources.ICurrencyType.md)

So the curency we are currently using, only available if type="currency"

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:163](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L163)

___

### currencyAvailable

• `Optional` **currencyAvailable**: [`ICurrencyType`](imported_resources.ICurrencyType.md)[]

All the currency types that are available, so you can allow for chosing
an alternative currency, only available if type="currency" or subtype is currency

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:173](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L173)

___

### currencyFormat

• `Optional` **currencyFormat**: ``"$N"`` \| ``"N$"``

So the curency format, it's a localization specific question, and specifies
whether the currency symbol goes first or last, only available if type="currency"

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:168](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L168)

___

### currencyI18n

• `Optional` **currencyI18n**: `ICurrencyI18nType`

The currency i18n data, only available if type="currency"

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:177](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L177)

___

### currentAppliedValue

• **currentAppliedValue**: `string` \| `number` \| [`IPropertyDefinitionSupportedCurrencyType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_currency.IPropertyDefinitionSupportedCurrencyType.md) \| [`IPropertyDefinitionSupportedUnitType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_unit.IPropertyDefinitionSupportedUnitType.md)

The currently applied value that is in sync with the server side

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[currentAppliedValue](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentappliedvalue)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:72](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L72)

___

### currentInternalValue

• `Optional` **currentInternalValue**: `any`

The current internal value, if any given

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[currentInternalValue](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentinternalvalue)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:100](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L100)

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

[client/internal/components/PropertyEntry/index.tsx:96](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L96)

___

### currentTextualValue

• **currentTextualValue**: `string`

A current textual value formatted as it should be, use this value
instead of any of the internal value or the current value

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:130](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L130)

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

[client/internal/components/PropertyEntry/index.tsx:88](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L88)

___

### currentValue

• **currentValue**: `string` \| `number` \| [`IPropertyDefinitionSupportedCurrencyType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_currency.IPropertyDefinitionSupportedCurrencyType.md) \| [`IPropertyDefinitionSupportedUnitType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_unit.IPropertyDefinitionSupportedUnitType.md)

The current value

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[currentValue](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentvalue)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:81](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L81)

___

### defaultCountry

• `Optional` **defaultCountry**: [`ICountryType`](imported_resources.ICountryType.md)

The country we are currently using, only avaliable if subtype is phone, country or language

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:141](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L141)

___

### defaultCurrency

• `Optional` **defaultCurrency**: [`ICurrencyType`](imported_resources.ICurrencyType.md)

The currency we are currently using, only avaliable if subtype is currency or type is currency

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:159](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L159)

___

### defaultLanguage

• `Optional` **defaultLanguage**: [`ILanguageType`](imported_resources.ILanguageType.md)

The language we are currently using, only avaliable if subtype is language

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:150](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L150)

___

### description

• `Optional` **description**: `string`

The description of the property, properties might or might not have descriptions
this is locale specific; the description might not be passed if specified by the UI

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[description](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#description)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:63](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L63)

___

### disabled

• **disabled**: `boolean`

The disabled flag is passed often when the value is somehow
enforced, this means that the field cannot truly be editted
and attempts are futile to modify

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[disabled](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#disabled)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:111](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L111)

___

### htmlAutocomplete

• `Optional` **htmlAutocomplete**: `string`

The html autocomplete value is a property that comes in the schema to define how it is
to be html autocompleted

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:120](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L120)

___

### icon

• `Optional` **icon**: `ReactNode`

Icon are an UI defined property for an icon to use during the view, handle as you wish

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[icon](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#icon)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:67](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L67)

___

### isNumericType

• **isNumericType**: `boolean`

Whether the type is a numeric type, INTEGER or FLOAT apply

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:125](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L125)

___

### label

• `Optional` **label**: `string`

label of the property, every property should have a label unless it's hidden
this is locale specific

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[label](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#label)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:53](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L53)

___

### languagesAvailable

• `Optional` **languagesAvailable**: [`ILanguageType`](imported_resources.ILanguageType.md)[]

The languages we have available

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:154](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L154)

___

### placeholder

• `Optional` **placeholder**: `string`

The placeholder of the property, every property should have a placeholder unless it's hidden
this is locale specific

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[placeholder](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#placeholder)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:58](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L58)

___

### propertyId

• **propertyId**: `string`

The property id in question

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[propertyId](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#propertyid)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:47](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L47)

___

### rtl

• **rtl**: `boolean`

Whether it is in rtl mode for a rtl language

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[rtl](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#rtl)

#### Defined in

[client/internal/renderer.ts:15](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/renderer.ts#L15)

___

### subtype

• `Optional` **subtype**: `string`

These are the subtypes

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:115](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L115)

___

### type

• **type**: ``"string"`` \| ``"number"`` \| ``"integer"`` \| ``"currency"`` \| ``"unit"`` \| ``"password"`` \| ``"text"`` \| ``"year"``

These are the types that every field renderer is expected to support, the handler
makes it easier so implementing it shouldn't be too hard

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:111](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L111)

___

### unit

• `Optional` **unit**: `string`

The current unit code, only available if type="unit"

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:188](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L188)

___

### unitI18n

• `Optional` **unitI18n**: `IUnitI18nType`

The unit i18n data
only available if type="unit"

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:222](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L222)

___

### unitImperialOptions

• `Optional` **unitImperialOptions**: `string`[]

The code for all the unit options for the imperial type, only available if type="unit"
use these options to build a list to change the unit

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:206](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L206)

___

### unitIsLockedToPrimaries

• `Optional` **unitIsLockedToPrimaries**: `boolean`

Specifies that you shouldn't really try to switch the unit to any other than
unitPrimary, and unitPrimaryImperial
only available if type="unit"

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:217](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L217)

___

### unitOptions

• `Optional` **unitOptions**: `string`[]

The code for all the unit options for the metric type, only available if type="unit"
use these options to build a list to change the unit

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:201](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L201)

___

### unitPrefersImperial

• `Optional` **unitPrefersImperial**: `boolean`

Specifies whether you should give priority to imperial over metric,
only available if type="unit"

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:211](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L211)

___

### unitPrimary

• `Optional` **unitPrimary**: `string`

The code for the primary metric unit, only available if type="unit"

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:192](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L192)

___

### unitPrimaryImperial

• `Optional` **unitPrimaryImperial**: `string`

The code for the primary imperial unit, only available if type="unit"

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:196](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L196)

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

[client/internal/components/PropertyEntry/index.tsx:118](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L118)

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

[client/internal/components/PropertyEntry/index.tsx:126](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L126)

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

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:136](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L136)

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

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:183](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L183)

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

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:233](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L233)

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

[client/internal/components/PropertyEntry/index.tsx:131](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L131)

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

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:228](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L228)
