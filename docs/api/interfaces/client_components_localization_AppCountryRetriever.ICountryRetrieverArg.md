[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/localization/AppCountryRetriever](../modules/client_components_localization_AppCountryRetriever.md) / ICountryRetrieverArg

# Interface: ICountryRetrieverArg

[client/components/localization/AppCountryRetriever](../modules/client_components_localization_AppCountryRetriever.md).ICountryRetrieverArg

## Hierarchy

- `IActualAppCountryRetrieverProps`

  ↳ **`ICountryRetrieverArg`**

## Table of contents

### Properties

- [availableCountries](client_components_localization_AppCountryRetriever.ICountryRetrieverArg.md#availablecountries)
- [changeCountryTo](client_components_localization_AppCountryRetriever.ICountryRetrieverArg.md#changecountryto)
- [currentCountry](client_components_localization_AppCountryRetriever.ICountryRetrieverArg.md#currentcountry)
- [error](client_components_localization_AppCountryRetriever.ICountryRetrieverArg.md#error)

### Methods

- [dismissError](client_components_localization_AppCountryRetriever.ICountryRetrieverArg.md#dismisserror)

## Properties

### availableCountries

• **availableCountries**: [`ICountryType`](imported_resources.ICountryType.md)[]

#### Inherited from

IActualAppCountryRetrieverProps.availableCountries

#### Defined in

[client/components/localization/AppCountryRetriever.tsx:14](https://github.com/onzag/itemize/blob/a24376ed/client/components/localization/AppCountryRetriever.tsx#L14)

___

### changeCountryTo

• **changeCountryTo**: [`ChangeCountryToFn`](../modules/client_internal_providers_locale_provider.md#changecountrytofn)

#### Inherited from

IActualAppCountryRetrieverProps.changeCountryTo

#### Defined in

[client/components/localization/AppCountryRetriever.tsx:15](https://github.com/onzag/itemize/blob/a24376ed/client/components/localization/AppCountryRetriever.tsx#L15)

___

### currentCountry

• **currentCountry**: [`ICountryType`](imported_resources.ICountryType.md)

#### Inherited from

IActualAppCountryRetrieverProps.currentCountry

#### Defined in

[client/components/localization/AppCountryRetriever.tsx:13](https://github.com/onzag/itemize/blob/a24376ed/client/components/localization/AppCountryRetriever.tsx#L13)

___

### error

• **error**: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)

#### Defined in

[client/components/localization/AppCountryRetriever.tsx:23](https://github.com/onzag/itemize/blob/a24376ed/client/components/localization/AppCountryRetriever.tsx#L23)

## Methods

### dismissError

▸ `Optional` **dismissError**(): `void`

#### Returns

`void`

#### Defined in

[client/components/localization/AppCountryRetriever.tsx:24](https://github.com/onzag/itemize/blob/a24376ed/client/components/localization/AppCountryRetriever.tsx#L24)
