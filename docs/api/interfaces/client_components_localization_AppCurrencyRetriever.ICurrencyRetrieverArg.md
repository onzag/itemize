[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/localization/AppCurrencyRetriever](../modules/client_components_localization_AppCurrencyRetriever.md) / ICurrencyRetrieverArg

# Interface: ICurrencyRetrieverArg

[client/components/localization/AppCurrencyRetriever](../modules/client_components_localization_AppCurrencyRetriever.md).ICurrencyRetrieverArg

## Hierarchy

- `IActualAppCurrencyRetrieverProps`

  ↳ **`ICurrencyRetrieverArg`**

## Table of contents

### Properties

- [availableCurrencies](client_components_localization_AppCurrencyRetriever.ICurrencyRetrieverArg.md#availablecurrencies)
- [changeCurrencyTo](client_components_localization_AppCurrencyRetriever.ICurrencyRetrieverArg.md#changecurrencyto)
- [currentCurrency](client_components_localization_AppCurrencyRetriever.ICurrencyRetrieverArg.md#currentcurrency)
- [dismissError](client_components_localization_AppCurrencyRetriever.ICurrencyRetrieverArg.md#dismisserror)
- [error](client_components_localization_AppCurrencyRetriever.ICurrencyRetrieverArg.md#error)

## Properties

### availableCurrencies

• **availableCurrencies**: [`ICurrencyType`](imported_resources.ICurrencyType.md)[]

#### Inherited from

IActualAppCurrencyRetrieverProps.availableCurrencies

#### Defined in

[client/components/localization/AppCurrencyRetriever.tsx:14](https://github.com/onzag/itemize/blob/73e0c39e/client/components/localization/AppCurrencyRetriever.tsx#L14)

___

### changeCurrencyTo

• **changeCurrencyTo**: [`ChangeCurrencyToFn`](../modules/client_internal_providers_locale_provider.md#changecurrencytofn)

#### Inherited from

IActualAppCurrencyRetrieverProps.changeCurrencyTo

#### Defined in

[client/components/localization/AppCurrencyRetriever.tsx:15](https://github.com/onzag/itemize/blob/73e0c39e/client/components/localization/AppCurrencyRetriever.tsx#L15)

___

### currentCurrency

• **currentCurrency**: [`ICurrencyType`](imported_resources.ICurrencyType.md)

#### Inherited from

IActualAppCurrencyRetrieverProps.currentCurrency

#### Defined in

[client/components/localization/AppCurrencyRetriever.tsx:13](https://github.com/onzag/itemize/blob/73e0c39e/client/components/localization/AppCurrencyRetriever.tsx#L13)

___

### dismissError

• `Optional` **dismissError**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[client/components/localization/AppCurrencyRetriever.tsx:24](https://github.com/onzag/itemize/blob/73e0c39e/client/components/localization/AppCurrencyRetriever.tsx#L24)

___

### error

• **error**: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)

#### Defined in

[client/components/localization/AppCurrencyRetriever.tsx:23](https://github.com/onzag/itemize/blob/73e0c39e/client/components/localization/AppCurrencyRetriever.tsx#L23)
