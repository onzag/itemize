[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/components/PropertyEntry/PropertyEntryPayment](../modules/client_internal_components_PropertyEntry_PropertyEntryPayment.md) / IPropertyEntryPaymentRendererProps

# Interface: IPropertyEntryPaymentRendererProps

[client/internal/components/PropertyEntry/PropertyEntryPayment](../modules/client_internal_components_PropertyEntry_PropertyEntryPayment.md).IPropertyEntryPaymentRendererProps

Props that every boolean renderer is going to get

## Hierarchy

- [`IPropertyEntryRendererProps`](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md)\<[`IPropertyDefinitionSupportedPaymentType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_payment.IPropertyDefinitionSupportedPaymentType.md)\>

  ↳ **`IPropertyEntryPaymentRendererProps`**

## Table of contents

### Properties

- [allowedStatuses](client_internal_components_PropertyEntry_PropertyEntryPayment.IPropertyEntryPaymentRendererProps.md#allowedstatuses)
- [allowedTypes](client_internal_components_PropertyEntry_PropertyEntryPayment.IPropertyEntryPaymentRendererProps.md#allowedtypes)
- [args](client_internal_components_PropertyEntry_PropertyEntryPayment.IPropertyEntryPaymentRendererProps.md#args)
- [autoFocus](client_internal_components_PropertyEntry_PropertyEntryPayment.IPropertyEntryPaymentRendererProps.md#autofocus)
- [canRestore](client_internal_components_PropertyEntry_PropertyEntryPayment.IPropertyEntryPaymentRendererProps.md#canrestore)
- [currency](client_internal_components_PropertyEntry_PropertyEntryPayment.IPropertyEntryPaymentRendererProps.md#currency)
- [currencyAvailable](client_internal_components_PropertyEntry_PropertyEntryPayment.IPropertyEntryPaymentRendererProps.md#currencyavailable)
- [currencyFormat](client_internal_components_PropertyEntry_PropertyEntryPayment.IPropertyEntryPaymentRendererProps.md#currencyformat)
- [currencyI18n](client_internal_components_PropertyEntry_PropertyEntryPayment.IPropertyEntryPaymentRendererProps.md#currencyi18n)
- [currentAppliedValue](client_internal_components_PropertyEntry_PropertyEntryPayment.IPropertyEntryPaymentRendererProps.md#currentappliedvalue)
- [currentInternalValue](client_internal_components_PropertyEntry_PropertyEntryPayment.IPropertyEntryPaymentRendererProps.md#currentinternalvalue)
- [currentInvalidReason](client_internal_components_PropertyEntry_PropertyEntryPayment.IPropertyEntryPaymentRendererProps.md#currentinvalidreason)
- [currentTextualValueOfAmount](client_internal_components_PropertyEntry_PropertyEntryPayment.IPropertyEntryPaymentRendererProps.md#currenttextualvalueofamount)
- [currentValid](client_internal_components_PropertyEntry_PropertyEntryPayment.IPropertyEntryPaymentRendererProps.md#currentvalid)
- [currentValue](client_internal_components_PropertyEntry_PropertyEntryPayment.IPropertyEntryPaymentRendererProps.md#currentvalue)
- [description](client_internal_components_PropertyEntry_PropertyEntryPayment.IPropertyEntryPaymentRendererProps.md#description)
- [disabled](client_internal_components_PropertyEntry_PropertyEntryPayment.IPropertyEntryPaymentRendererProps.md#disabled)
- [enableUserSetErrors](client_internal_components_PropertyEntry_PropertyEntryPayment.IPropertyEntryPaymentRendererProps.md#enableuserseterrors)
- [i18nPayment](client_internal_components_PropertyEntry_PropertyEntryPayment.IPropertyEntryPaymentRendererProps.md#i18npayment)
- [isAllowedToToggleNullStatus](client_internal_components_PropertyEntry_PropertyEntryPayment.IPropertyEntryPaymentRendererProps.md#isallowedtotogglenullstatus)
- [label](client_internal_components_PropertyEntry_PropertyEntryPayment.IPropertyEntryPaymentRendererProps.md#label)
- [language](client_internal_components_PropertyEntry_PropertyEntryPayment.IPropertyEntryPaymentRendererProps.md#language)
- [languageOverride](client_internal_components_PropertyEntry_PropertyEntryPayment.IPropertyEntryPaymentRendererProps.md#languageoverride)
- [onAmountChange](client_internal_components_PropertyEntry_PropertyEntryPayment.IPropertyEntryPaymentRendererProps.md#onamountchange)
- [onAmountChangeByTextualValue](client_internal_components_PropertyEntry_PropertyEntryPayment.IPropertyEntryPaymentRendererProps.md#onamountchangebytextualvalue)
- [onChange](client_internal_components_PropertyEntry_PropertyEntryPayment.IPropertyEntryPaymentRendererProps.md#onchange)
- [onCurrencyChange](client_internal_components_PropertyEntry_PropertyEntryPayment.IPropertyEntryPaymentRendererProps.md#oncurrencychange)
- [onMetadataChange](client_internal_components_PropertyEntry_PropertyEntryPayment.IPropertyEntryPaymentRendererProps.md#onmetadatachange)
- [onRestore](client_internal_components_PropertyEntry_PropertyEntryPayment.IPropertyEntryPaymentRendererProps.md#onrestore)
- [onStatusChange](client_internal_components_PropertyEntry_PropertyEntryPayment.IPropertyEntryPaymentRendererProps.md#onstatuschange)
- [onToggleNullStatus](client_internal_components_PropertyEntry_PropertyEntryPayment.IPropertyEntryPaymentRendererProps.md#ontogglenullstatus)
- [onTypeChange](client_internal_components_PropertyEntry_PropertyEntryPayment.IPropertyEntryPaymentRendererProps.md#ontypechange)
- [placeholder](client_internal_components_PropertyEntry_PropertyEntryPayment.IPropertyEntryPaymentRendererProps.md#placeholder)
- [propertyId](client_internal_components_PropertyEntry_PropertyEntryPayment.IPropertyEntryPaymentRendererProps.md#propertyid)
- [rtl](client_internal_components_PropertyEntry_PropertyEntryPayment.IPropertyEntryPaymentRendererProps.md#rtl)
- [uniqueId](client_internal_components_PropertyEntry_PropertyEntryPayment.IPropertyEntryPaymentRendererProps.md#uniqueid)

## Properties

### allowedStatuses

• **allowedStatuses**: `IPaymentAllowedStatus`[]

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryPayment.tsx:71](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryPayment.tsx#L71)

___

### allowedTypes

• **allowedTypes**: `IPaymentAllowedType`[]

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryPayment.tsx:72](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryPayment.tsx#L72)

___

### args

• **args**: `Object`

The renderer args

#### Index signature

▪ [arg: `string`]: `any`

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[args](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#args)

#### Defined in

[client/internal/renderer.ts:19](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/renderer.ts#L19)

___

### autoFocus

• **autoFocus**: `boolean`

Whether the entry should autofocus

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[autoFocus](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#autofocus)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:107](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/index.tsx#L107)

___

### canRestore

• **canRestore**: `boolean`

A boolean, normally true if our current applied value differs from our
current value, this check is exceptional as it uses the local equal function

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[canRestore](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#canrestore)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:79](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/index.tsx#L79)

___

### currency

• **currency**: [`ICurrencyType`](imported_resources.ICurrencyType.md)

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryPayment.tsx:60](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryPayment.tsx#L60)

___

### currencyAvailable

• **currencyAvailable**: [`ICurrencyType`](imported_resources.ICurrencyType.md)[]

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryPayment.tsx:62](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryPayment.tsx#L62)

___

### currencyFormat

• **currencyFormat**: ``"$N"`` \| ``"N$"``

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryPayment.tsx:61](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryPayment.tsx#L61)

___

### currencyI18n

• **currencyI18n**: `ICurrencyI18nType`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryPayment.tsx:63](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryPayment.tsx#L63)

___

### currentAppliedValue

• **currentAppliedValue**: [`IPropertyDefinitionSupportedPaymentType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_payment.IPropertyDefinitionSupportedPaymentType.md)

The currently applied value that is in sync with the server side

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[currentAppliedValue](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentappliedvalue)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:74](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/index.tsx#L74)

___

### currentInternalValue

• `Optional` **currentInternalValue**: `any`

The current internal value, if any given

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[currentInternalValue](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentinternalvalue)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:102](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/index.tsx#L102)

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

[client/internal/components/PropertyEntry/index.tsx:98](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/index.tsx#L98)

___

### currentTextualValueOfAmount

• **currentTextualValueOfAmount**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryPayment.tsx:59](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryPayment.tsx#L59)

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

[client/internal/components/PropertyEntry/index.tsx:90](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/index.tsx#L90)

___

### currentValue

• **currentValue**: [`IPropertyDefinitionSupportedPaymentType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_payment.IPropertyDefinitionSupportedPaymentType.md)

The current value

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[currentValue](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentvalue)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:83](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/index.tsx#L83)

___

### description

• `Optional` **description**: `string`

The description of the property, properties might or might not have descriptions
this is locale specific; the description might not be passed if specified by the UI

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[description](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#description)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:69](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/index.tsx#L69)

___

### disabled

• **disabled**: `boolean`

The disabled flag is passed often when the value is somehow
enforced, this means that the field cannot truly be editted
and attempts are futile to modify

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[disabled](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#disabled)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:113](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/index.tsx#L113)

___

### enableUserSetErrors

• **enableUserSetErrors**: () => `void`

#### Type declaration

▸ (): `void`

Allows for the display of user set error statuses, normally you
will call this function when your field has been blurred so that
currentInvalidReason gets populated even if the field is not poked

##### Returns

`void`

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[enableUserSetErrors](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#enableuserseterrors)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:120](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/index.tsx#L120)

___

### i18nPayment

• **i18nPayment**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `active` | `string` |
| `amount` | `string` |
| `create` | `string` |
| `currency` | `string` |
| `destroy` | `string` |
| `disputed` | `string` |
| `inactive` | `string` |
| `invoice` | `string` |
| `metadata` | `string` |
| `paid` | `string` |
| `pending` | `string` |
| `refund` | `string` |
| `reversed` | `string` |
| `status` | `string` |
| `subscriptionDaily` | `string` |
| `subscriptionMonthly` | `string` |
| `subscriptionYearly` | `string` |
| `type` | `string` |

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryPayment.tsx:39](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryPayment.tsx#L39)

___

### isAllowedToToggleNullStatus

• **isAllowedToToggleNullStatus**: `boolean`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryPayment.tsx:73](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryPayment.tsx#L73)

___

### label

• `Optional` **label**: `string`

label of the property, every property should have a label unless it's hidden
this is locale specific

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[label](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#label)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:59](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/index.tsx#L59)

___

### language

• **language**: `string`

The current language being used by the client overall in the app

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[language](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#language)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:138](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/index.tsx#L138)

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

[client/internal/components/PropertyEntry/index.tsx:147](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/index.tsx#L147)

___

### onAmountChange

• **onAmountChange**: (`newAmount`: `number`) => `void`

#### Type declaration

▸ (`newAmount`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `newAmount` | `number` |

##### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryPayment.tsx:67](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryPayment.tsx#L67)

___

### onAmountChangeByTextualValue

• **onAmountChangeByTextualValue**: (`newAmount`: `string`) => `void`

#### Type declaration

▸ (`newAmount`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `newAmount` | `string` |

##### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryPayment.tsx:64](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryPayment.tsx#L64)

___

### onChange

• **onChange**: (`value`: [`IPropertyDefinitionSupportedPaymentType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_payment.IPropertyDefinitionSupportedPaymentType.md), `internalValue`: `any`) => `void`

#### Type declaration

▸ (`value`, `internalValue`): `void`

Standard on change function, every renderer will recieve this function
to trigger a change, however sometimes handlers will pass their own
change function that is supposed to be used instead of this one so
caution is advised which one to use

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`IPropertyDefinitionSupportedPaymentType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_payment.IPropertyDefinitionSupportedPaymentType.md) |
| `internalValue` | `any` |

##### Returns

`void`

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[onChange](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#onchange)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:128](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/index.tsx#L128)

___

### onCurrencyChange

• **onCurrencyChange**: (`newCurrency`: `string`) => `void`

#### Type declaration

▸ (`newCurrency`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `newCurrency` | `string` |

##### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryPayment.tsx:68](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryPayment.tsx#L68)

___

### onMetadataChange

• **onMetadataChange**: (`newMetadata`: `string`) => `void`

#### Type declaration

▸ (`newMetadata`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `newMetadata` | `string` |

##### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryPayment.tsx:69](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryPayment.tsx#L69)

___

### onRestore

• **onRestore**: () => `void`

#### Type declaration

▸ (): `void`

Call in order to trigger restoration, ensure that canRestore is true
when doing this

##### Returns

`void`

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[onRestore](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#onrestore)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:133](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/index.tsx#L133)

___

### onStatusChange

• **onStatusChange**: (`newStatus`: `string`) => `void`

#### Type declaration

▸ (`newStatus`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `newStatus` | `string` |

##### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryPayment.tsx:66](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryPayment.tsx#L66)

___

### onToggleNullStatus

• **onToggleNullStatus**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryPayment.tsx:65](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryPayment.tsx#L65)

___

### onTypeChange

• **onTypeChange**: (`newType`: `string`) => `void`

#### Type declaration

▸ (`newType`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `newType` | `string` |

##### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryPayment.tsx:70](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryPayment.tsx#L70)

___

### placeholder

• `Optional` **placeholder**: `string`

The placeholder of the property, every property should have a placeholder unless it's hidden
this is locale specific

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[placeholder](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#placeholder)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:64](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/index.tsx#L64)

___

### propertyId

• **propertyId**: `string`

The property id in question

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[propertyId](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#propertyid)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:47](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/index.tsx#L47)

___

### rtl

• **rtl**: `boolean`

Whether it is in rtl mode for a rtl language

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[rtl](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#rtl)

#### Defined in

[client/internal/renderer.ts:15](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/renderer.ts#L15)

___

### uniqueId

• **uniqueId**: `string`

an unique id for this property
with the id and the version they are related to

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[uniqueId](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#uniqueid)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:53](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/index.tsx#L53)
