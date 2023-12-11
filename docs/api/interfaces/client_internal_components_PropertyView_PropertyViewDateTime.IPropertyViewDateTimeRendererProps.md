[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/components/PropertyView/PropertyViewDateTime](../modules/client_internal_components_PropertyView_PropertyViewDateTime.md) / IPropertyViewDateTimeRendererProps

# Interface: IPropertyViewDateTimeRendererProps

[client/internal/components/PropertyView/PropertyViewDateTime](../modules/client_internal_components_PropertyView_PropertyViewDateTime.md).IPropertyViewDateTimeRendererProps

The property view date renderer

## Hierarchy

- [`IPropertyViewRendererProps`](client_internal_components_PropertyView.IPropertyViewRendererProps.md)\<`string`\>

  ↳ **`IPropertyViewDateTimeRendererProps`**

## Table of contents

### Properties

- [args](client_internal_components_PropertyView_PropertyViewDateTime.IPropertyViewDateTimeRendererProps.md#args)
- [currentValue](client_internal_components_PropertyView_PropertyViewDateTime.IPropertyViewDateTimeRendererProps.md#currentvalue)
- [dbFormat](client_internal_components_PropertyView_PropertyViewDateTime.IPropertyViewDateTimeRendererProps.md#dbformat)
- [defaultFormat](client_internal_components_PropertyView_PropertyViewDateTime.IPropertyViewDateTimeRendererProps.md#defaultformat)
- [defaultFormattedValue](client_internal_components_PropertyView_PropertyViewDateTime.IPropertyViewDateTimeRendererProps.md#defaultformattedvalue)
- [momentValue](client_internal_components_PropertyView_PropertyViewDateTime.IPropertyViewDateTimeRendererProps.md#momentvalue)
- [rtl](client_internal_components_PropertyView_PropertyViewDateTime.IPropertyViewDateTimeRendererProps.md#rtl)

## Properties

### args

• **args**: `Object`

The renderer args

#### Index signature

▪ [arg: `string`]: `any`

#### Inherited from

[IPropertyViewRendererProps](client_internal_components_PropertyView.IPropertyViewRendererProps.md).[args](client_internal_components_PropertyView.IPropertyViewRendererProps.md#args)

#### Defined in

[client/internal/renderer.ts:19](https://github.com/onzag/itemize/blob/59702dd5/client/internal/renderer.ts#L19)

___

### currentValue

• **currentValue**: `string`

The current value to be displayed

#### Inherited from

[IPropertyViewRendererProps](client_internal_components_PropertyView.IPropertyViewRendererProps.md).[currentValue](client_internal_components_PropertyView.IPropertyViewRendererProps.md#currentvalue)

#### Defined in

[client/internal/components/PropertyView/index.tsx:44](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyView/index.tsx#L44)

___

### dbFormat

• **dbFormat**: `string`

database format used for parsing

#### Defined in

[client/internal/components/PropertyView/PropertyViewDateTime.tsx:25](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyView/PropertyViewDateTime.tsx#L25)

___

### defaultFormat

• **defaultFormat**: `string`

default format used for displaying according to moment
in the user's language

#### Defined in

[client/internal/components/PropertyView/PropertyViewDateTime.tsx:30](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyView/PropertyViewDateTime.tsx#L30)

___

### defaultFormattedValue

• **defaultFormattedValue**: `string`

The value already formatted in such form
using moment

#### Defined in

[client/internal/components/PropertyView/PropertyViewDateTime.tsx:35](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyView/PropertyViewDateTime.tsx#L35)

___

### momentValue

• **momentValue**: `Moment`

Current value as moment type

#### Defined in

[client/internal/components/PropertyView/PropertyViewDateTime.tsx:21](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyView/PropertyViewDateTime.tsx#L21)

___

### rtl

• **rtl**: `boolean`

Whether it is in rtl mode for a rtl language

#### Inherited from

[IPropertyViewRendererProps](client_internal_components_PropertyView.IPropertyViewRendererProps.md).[rtl](client_internal_components_PropertyView.IPropertyViewRendererProps.md#rtl)

#### Defined in

[client/internal/renderer.ts:15](https://github.com/onzag/itemize/blob/59702dd5/client/internal/renderer.ts#L15)
