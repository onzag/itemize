[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/localization/I18nReadError](../modules/client_components_localization_I18nReadError.md) / II18nReadErrorOptions

# Interface: II18nReadErrorOptions

[client/components/localization/I18nReadError](../modules/client_components_localization_I18nReadError.md).II18nReadErrorOptions

the error props that the error displayer needs to take

## Hierarchy

- **`II18nReadErrorOptions`**

  ↳ [`II18nReadErrorProps`](client_components_localization_I18nReadError.II18nReadErrorProps.md)

## Table of contents

### Properties

- [capitalize](client_components_localization_I18nReadError.II18nReadErrorOptions.md#capitalize)
- [error](client_components_localization_I18nReadError.II18nReadErrorOptions.md#error)

## Properties

### capitalize

• `Optional` **capitalize**: `boolean`

Whether the error message should be capitalized

#### Defined in

[client/components/localization/I18nReadError.tsx:36](https://github.com/onzag/itemize/blob/59702dd5/client/components/localization/I18nReadError.tsx#L36)

___

### error

• **error**: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)

The error on itself, most itemize errors are of this type
so they can be displayed by passing it here

#### Defined in

[client/components/localization/I18nReadError.tsx:32](https://github.com/onzag/itemize/blob/59702dd5/client/components/localization/I18nReadError.tsx#L32)
