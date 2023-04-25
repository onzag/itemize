[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/components/localization/AppCountryRetriever

# Module: client/components/localization/AppCountryRetriever

Simply provides the current country of the application context

## Table of contents

### Interfaces

- [ICountryRetrieverArg](../interfaces/client_components_localization_AppCountryRetriever.ICountryRetrieverArg.md)

### Functions

- [default](client_components_localization_AppCountryRetriever.md#default)
- [useAppCountryRetriever](client_components_localization_AppCountryRetriever.md#useappcountryretriever)

## Functions

### default

▸ **default**(`props`): `Element`

provides the current country and allows to change them

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `Object` | the country retriever props |
| `props.children` | `FnAppCountryRetrieverType` | - |

#### Returns

`Element`

a react node

#### Defined in

[client/components/localization/AppCountryRetriever.tsx:59](https://github.com/onzag/itemize/blob/f2db74a5/client/components/localization/AppCountryRetriever.tsx#L59)

___

### useAppCountryRetriever

▸ **useAppCountryRetriever**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `availableCountries` | [`ICountryType`](../interfaces/imported_resources.ICountryType.md)[] |
| `changeCountryTo` | () => `any` \| [`ChangeCountryToFn`](client_internal_providers_locale_provider.md#changecountrytofn) |
| `currentCountry` | [`ICountryType`](../interfaces/imported_resources.ICountryType.md) |

#### Defined in

[client/components/localization/AppCountryRetriever.tsx:95](https://github.com/onzag/itemize/blob/f2db74a5/client/components/localization/AppCountryRetriever.tsx#L95)
