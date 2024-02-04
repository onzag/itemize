[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/components/PropertyView/PropertyViewCurrency](../modules/client_internal_components_PropertyView_PropertyViewCurrency.md) / IPropertyViewCurrencyRendererProps

# Interface: IPropertyViewCurrencyRendererProps

[client/internal/components/PropertyView/PropertyViewCurrency](../modules/client_internal_components_PropertyView_PropertyViewCurrency.md).IPropertyViewCurrencyRendererProps

The property view currency renderer props

## Hierarchy

- [`IPropertyViewRendererProps`](client_internal_components_PropertyView.IPropertyViewRendererProps.md)\<[`IPropertyDefinitionSupportedCurrencyType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_currency.IPropertyDefinitionSupportedCurrencyType.md)\>

  ↳ **`IPropertyViewCurrencyRendererProps`**

## Table of contents

### Properties

- [args](client_internal_components_PropertyView_PropertyViewCurrency.IPropertyViewCurrencyRendererProps.md#args)
- [convertedCurrency](client_internal_components_PropertyView_PropertyViewCurrency.IPropertyViewCurrencyRendererProps.md#convertedcurrency)
- [convertedStrValue](client_internal_components_PropertyView_PropertyViewCurrency.IPropertyViewCurrencyRendererProps.md#convertedstrvalue)
- [convertedValue](client_internal_components_PropertyView_PropertyViewCurrency.IPropertyViewCurrencyRendererProps.md#convertedvalue)
- [currentValue](client_internal_components_PropertyView_PropertyViewCurrency.IPropertyViewCurrencyRendererProps.md#currentvalue)
- [format](client_internal_components_PropertyView_PropertyViewCurrency.IPropertyViewCurrencyRendererProps.md#format)
- [originalCurrency](client_internal_components_PropertyView_PropertyViewCurrency.IPropertyViewCurrencyRendererProps.md#originalcurrency)
- [originalStrValue](client_internal_components_PropertyView_PropertyViewCurrency.IPropertyViewCurrencyRendererProps.md#originalstrvalue)
- [originalValue](client_internal_components_PropertyView_PropertyViewCurrency.IPropertyViewCurrencyRendererProps.md#originalvalue)
- [rtl](client_internal_components_PropertyView_PropertyViewCurrency.IPropertyViewCurrencyRendererProps.md#rtl)

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

[client/internal/components/PropertyView/PropertyViewCurrency.tsx:55](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/PropertyViewCurrency.tsx#L55)

___

### convertedStrValue

• **convertedStrValue**: `string`

Same as the converted value, but formatted in order
to match the user's locale

#### Defined in

[client/internal/components/PropertyView/PropertyViewCurrency.tsx:48](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/PropertyViewCurrency.tsx#L48)

___

### convertedValue

• **convertedValue**: `number`

If the original currency was not the user's selected
currency, this value is the result of that conversion,
otherwise null

#### Defined in

[client/internal/components/PropertyView/PropertyViewCurrency.tsx:43](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/PropertyViewCurrency.tsx#L43)

___

### currentValue

• **currentValue**: [`IPropertyDefinitionSupportedCurrencyType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_currency.IPropertyDefinitionSupportedCurrencyType.md)

The current value to be displayed

#### Inherited from

[IPropertyViewRendererProps](client_internal_components_PropertyView.IPropertyViewRendererProps.md).[currentValue](client_internal_components_PropertyView.IPropertyViewRendererProps.md#currentvalue)

#### Defined in

[client/internal/components/PropertyView/index.tsx:44](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/index.tsx#L44)

___

### format

• **format**: ``"$N"`` \| ``"N$"``

The format which is used for the currency given the user's language
$N means symbol first, number last N$ means the opposite

#### Defined in

[client/internal/components/PropertyView/PropertyViewCurrency.tsx:20](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/PropertyViewCurrency.tsx#L20)

___

### originalCurrency

• **originalCurrency**: [`ICurrencyType`](imported_resources.ICurrencyType.md)

The original currency the currency type is
specified in, might be null if the currency
is null

#### Defined in

[client/internal/components/PropertyView/PropertyViewCurrency.tsx:37](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/PropertyViewCurrency.tsx#L37)

___

### originalStrValue

• **originalStrValue**: `string`

The original value as a string, formatted
to match the user's locale, might be null
if the currency value itself is null

#### Defined in

[client/internal/components/PropertyView/PropertyViewCurrency.tsx:31](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/PropertyViewCurrency.tsx#L31)

___

### originalValue

• **originalValue**: `number`

The original value, as a number, might be null
if the value itself is null

#### Defined in

[client/internal/components/PropertyView/PropertyViewCurrency.tsx:25](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/PropertyViewCurrency.tsx#L25)

___

### rtl

• **rtl**: `boolean`

Whether it is in rtl mode for a rtl language

#### Inherited from

[IPropertyViewRendererProps](client_internal_components_PropertyView.IPropertyViewRendererProps.md).[rtl](client_internal_components_PropertyView.IPropertyViewRendererProps.md#rtl)

#### Defined in

[client/internal/renderer.ts:15](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/renderer.ts#L15)
