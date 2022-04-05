[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/localization/I18nReadError](../modules/client_components_localization_I18nReadError.md) / II18nReadErrorProps

# Interface: II18nReadErrorProps

[client/components/localization/I18nReadError](../modules/client_components_localization_I18nReadError.md).II18nReadErrorProps

the error props that the error displayer needs to take

## Table of contents

### Properties

- [capitalize](client_components_localization_I18nReadError.II18nReadErrorProps.md#capitalize)
- [error](client_components_localization_I18nReadError.II18nReadErrorProps.md#error)

### Methods

- [children](client_components_localization_I18nReadError.II18nReadErrorProps.md#children)

## Properties

### capitalize

• `Optional` **capitalize**: `boolean`

Whether the error message should be capitalized

#### Defined in

[client/components/localization/I18nReadError.tsx:36](https://github.com/onzag/itemize/blob/f2f29986/client/components/localization/I18nReadError.tsx#L36)

___

### error

• **error**: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)

The error on itself, most itemize errors are of this type
so they can be displayed by passing it here

#### Defined in

[client/components/localization/I18nReadError.tsx:32](https://github.com/onzag/itemize/blob/f2f29986/client/components/localization/I18nReadError.tsx#L32)

## Methods

### children

▸ `Optional` **children**(`value`): `ReactNode`

the children that passes the value to the consumer

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`ReactNode`

#### Defined in

[client/components/localization/I18nReadError.tsx:40](https://github.com/onzag/itemize/blob/f2f29986/client/components/localization/I18nReadError.tsx#L40)
