[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/localization/I18nReadError](../modules/client_components_localization_I18nReadError.md) / II18nReadErrorProps

# Interface: II18nReadErrorProps

[client/components/localization/I18nReadError](../modules/client_components_localization_I18nReadError.md).II18nReadErrorProps

the error props that the error displayer needs to take

## Hierarchy

- [`II18nReadErrorOptions`](client_components_localization_I18nReadError.II18nReadErrorOptions.md)

  ↳ **`II18nReadErrorProps`**

## Table of contents

### Properties

- [capitalize](client_components_localization_I18nReadError.II18nReadErrorProps.md#capitalize)
- [children](client_components_localization_I18nReadError.II18nReadErrorProps.md#children)
- [error](client_components_localization_I18nReadError.II18nReadErrorProps.md#error)

## Properties

### capitalize

• `Optional` **capitalize**: `boolean`

Whether the error message should be capitalized

#### Inherited from

[II18nReadErrorOptions](client_components_localization_I18nReadError.II18nReadErrorOptions.md).[capitalize](client_components_localization_I18nReadError.II18nReadErrorOptions.md#capitalize)

#### Defined in

[client/components/localization/I18nReadError.tsx:36](https://github.com/onzag/itemize/blob/59702dd5/client/components/localization/I18nReadError.tsx#L36)

___

### children

• `Optional` **children**: (`value`: `string`) => `ReactNode`

#### Type declaration

▸ (`value`): `ReactNode`

the children that passes the value to the consumer

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

##### Returns

`ReactNode`

#### Defined in

[client/components/localization/I18nReadError.tsx:47](https://github.com/onzag/itemize/blob/59702dd5/client/components/localization/I18nReadError.tsx#L47)

___

### error

• **error**: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)

The error on itself, most itemize errors are of this type
so they can be displayed by passing it here

#### Inherited from

[II18nReadErrorOptions](client_components_localization_I18nReadError.II18nReadErrorOptions.md).[error](client_components_localization_I18nReadError.II18nReadErrorOptions.md#error)

#### Defined in

[client/components/localization/I18nReadError.tsx:32](https://github.com/onzag/itemize/blob/59702dd5/client/components/localization/I18nReadError.tsx#L32)
