[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/components/localization/AppCurrencyRetriever

# Module: client/components/localization/AppCurrencyRetriever

Simply provides the current currency

## Table of contents

### Interfaces

- [ICurrencyRetrieverArg](../interfaces/client_components_localization_AppCurrencyRetriever.ICurrencyRetrieverArg.md)

### Functions

- [default](client_components_localization_AppCurrencyRetriever.md#default)
- [useAppCurrencyRetriever](client_components_localization_AppCurrencyRetriever.md#useappcurrencyretriever)

## Functions

### default

▸ **default**(`props`): `Element`

Provides the current currency in the application context and allows
it to be changed by a new one from the available list it also provides

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `Object` | the props |
| `props.children` | `FnAppCurrencyRetrieverType` | - |

#### Returns

`Element`

a react node

#### Defined in

[client/components/localization/AppCurrencyRetriever.tsx:60](https://github.com/onzag/itemize/blob/a24376ed/client/components/localization/AppCurrencyRetriever.tsx#L60)

___

### useAppCurrencyRetriever

▸ **useAppCurrencyRetriever**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `availableCurrencies` | [`ICurrencyType`](../interfaces/imported_resources.ICurrencyType.md)[] |
| `changeCurrencyTo` | () => `any` \| [`ChangeCurrencyToFn`](client_internal_providers_locale_provider.md#changecurrencytofn) |
| `currentCurrency` | [`ICurrencyType`](../interfaces/imported_resources.ICurrencyType.md) |

#### Defined in

[client/components/localization/AppCurrencyRetriever.tsx:83](https://github.com/onzag/itemize/blob/a24376ed/client/components/localization/AppCurrencyRetriever.tsx#L83)
