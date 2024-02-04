[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/components/PropertyView/PropertyViewPayment](../modules/client_internal_components_PropertyView_PropertyViewPayment.md) / IPropertyViewPaymentRendererProps

# Interface: IPropertyViewPaymentRendererProps

[client/internal/components/PropertyView/PropertyViewPayment](../modules/client_internal_components_PropertyView_PropertyViewPayment.md).IPropertyViewPaymentRendererProps

Props that every boolean renderer is going to get

## Hierarchy

- [`IPropertyViewRendererProps`](client_internal_components_PropertyView.IPropertyViewRendererProps.md)\<[`IPropertyDefinitionSupportedPaymentType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_payment.IPropertyDefinitionSupportedPaymentType.md)\>

  ↳ **`IPropertyViewPaymentRendererProps`**

## Table of contents

### Properties

- [args](client_internal_components_PropertyView_PropertyViewPayment.IPropertyViewPaymentRendererProps.md#args)
- [convertedCurrency](client_internal_components_PropertyView_PropertyViewPayment.IPropertyViewPaymentRendererProps.md#convertedcurrency)
- [convertedStrValue](client_internal_components_PropertyView_PropertyViewPayment.IPropertyViewPaymentRendererProps.md#convertedstrvalue)
- [convertedValue](client_internal_components_PropertyView_PropertyViewPayment.IPropertyViewPaymentRendererProps.md#convertedvalue)
- [currencyFormat](client_internal_components_PropertyView_PropertyViewPayment.IPropertyViewPaymentRendererProps.md#currencyformat)
- [currentStatusStrValue](client_internal_components_PropertyView_PropertyViewPayment.IPropertyViewPaymentRendererProps.md#currentstatusstrvalue)
- [currentTypeStrValue](client_internal_components_PropertyView_PropertyViewPayment.IPropertyViewPaymentRendererProps.md#currenttypestrvalue)
- [currentValue](client_internal_components_PropertyView_PropertyViewPayment.IPropertyViewPaymentRendererProps.md#currentvalue)
- [originalCurrency](client_internal_components_PropertyView_PropertyViewPayment.IPropertyViewPaymentRendererProps.md#originalcurrency)
- [originalStrValue](client_internal_components_PropertyView_PropertyViewPayment.IPropertyViewPaymentRendererProps.md#originalstrvalue)
- [originalValue](client_internal_components_PropertyView_PropertyViewPayment.IPropertyViewPaymentRendererProps.md#originalvalue)
- [rtl](client_internal_components_PropertyView_PropertyViewPayment.IPropertyViewPaymentRendererProps.md#rtl)

## Properties

### args

• **args**: `Object`

The renderer args

#### Index signature

▪ [arg: `string`]: `any`

#### Inherited from

[IPropertyViewRendererProps](client_internal_components_PropertyView.IPropertyViewRendererProps.md).[args](client_internal_components_PropertyView.IPropertyViewRendererProps.md#args)

#### Defined in

[client/internal/renderer.ts:19](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/renderer.ts#L19)

___

### convertedCurrency

• **convertedCurrency**: [`ICurrencyType`](imported_resources.ICurrencyType.md)

If the original curency was not the user's selected
currency, this value represents the user's currency
that it was converted to; it's basically the same as
the current's user currency

#### Defined in

[client/internal/components/PropertyView/PropertyViewPayment.tsx:59](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/PropertyViewPayment.tsx#L59)

___

### convertedStrValue

• **convertedStrValue**: `string`

Same as the converted value, but formatted in order
to match the user's locale

#### Defined in

[client/internal/components/PropertyView/PropertyViewPayment.tsx:52](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/PropertyViewPayment.tsx#L52)

___

### convertedValue

• **convertedValue**: `number`

If the original currency was not the user's selected
currency, this value is the result of that conversion,
otherwise null

#### Defined in

[client/internal/components/PropertyView/PropertyViewPayment.tsx:47](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/PropertyViewPayment.tsx#L47)

___

### currencyFormat

• **currencyFormat**: ``"$N"`` \| ``"N$"``

#### Defined in

[client/internal/components/PropertyView/PropertyViewPayment.tsx:24](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/PropertyViewPayment.tsx#L24)

___

### currentStatusStrValue

• **currentStatusStrValue**: `string`

The current status of the payment as expected to be visualized for the user

#### Defined in

[client/internal/components/PropertyView/PropertyViewPayment.tsx:23](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/PropertyViewPayment.tsx#L23)

___

### currentTypeStrValue

• **currentTypeStrValue**: `string`

The current type of the payment as expected to be visualized for the user

#### Defined in

[client/internal/components/PropertyView/PropertyViewPayment.tsx:19](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/PropertyViewPayment.tsx#L19)

___

### currentValue

• **currentValue**: [`IPropertyDefinitionSupportedPaymentType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_payment.IPropertyDefinitionSupportedPaymentType.md)

The current value to be displayed

#### Inherited from

[IPropertyViewRendererProps](client_internal_components_PropertyView.IPropertyViewRendererProps.md).[currentValue](client_internal_components_PropertyView.IPropertyViewRendererProps.md#currentvalue)

#### Defined in

[client/internal/components/PropertyView/index.tsx:44](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/index.tsx#L44)

___

### originalCurrency

• **originalCurrency**: [`ICurrencyType`](imported_resources.ICurrencyType.md)

The original currency the currency type is
specified in, might be null if the currency
is null

#### Defined in

[client/internal/components/PropertyView/PropertyViewPayment.tsx:41](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/PropertyViewPayment.tsx#L41)

___

### originalStrValue

• **originalStrValue**: `string`

The original value as a string, formatted
to match the user's locale, might be null
if the currency value itself is null

#### Defined in

[client/internal/components/PropertyView/PropertyViewPayment.tsx:35](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/PropertyViewPayment.tsx#L35)

___

### originalValue

• **originalValue**: `number`

The original value, as a number, might be null
if the value itself is null

#### Defined in

[client/internal/components/PropertyView/PropertyViewPayment.tsx:29](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/PropertyViewPayment.tsx#L29)

___

### rtl

• **rtl**: `boolean`

Whether it is in rtl mode for a rtl language

#### Inherited from

[IPropertyViewRendererProps](client_internal_components_PropertyView.IPropertyViewRendererProps.md).[rtl](client_internal_components_PropertyView.IPropertyViewRendererProps.md#rtl)

#### Defined in

[client/internal/renderer.ts:15](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/renderer.ts#L15)
