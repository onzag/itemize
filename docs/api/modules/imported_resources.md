[@onzag/itemize](../README.md) / [Modules](../modules.md) / imported-resources

# Module: imported-resources

Countries list origin:
https://raw.githubusercontent.com/annexare/Countries/master/dist/countries.emoji.json
Countries long and lat
https://developers.google.com/public-data/docs/canonical/countries_csv
Currencies list base
https://gist.github.com/Fluidbyte/2973986
Comprehensive currency list names in many languages, downloaded original csv and converted to json
http://www.mapanet.eu/en/resources/Currencies.asp
Languages list Origin
https://gist.githubusercontent.com/piraveen/fafd0d984b2236e809d03a0e306c8a4d/raw/4258894f85de7752b78537a4aa66e027090c27ad/languages.json

## Table of contents

### Interfaces

- [ICountryDataType](../interfaces/imported_resources.ICountryDataType.md)
- [ICountryType](../interfaces/imported_resources.ICountryType.md)
- [ICurrencyDataType](../interfaces/imported_resources.ICurrencyDataType.md)
- [ICurrencyType](../interfaces/imported_resources.ICurrencyType.md)
- [ILanguageDataType](../interfaces/imported_resources.ILanguageDataType.md)
- [ILanguageType](../interfaces/imported_resources.ILanguageType.md)

### Variables

- [arrCountries](imported_resources.md#arrcountries)
- [arrCurrencies](imported_resources.md#arrcurrencies)
- [arrLanguages](imported_resources.md#arrlanguages)
- [countries](imported_resources.md#countries)
- [currencies](imported_resources.md#currencies)
- [languages](imported_resources.md#languages)

### Functions

- [isRTL](imported_resources.md#isrtl)

## Variables

### arrCountries

• `Const` **arrCountries**: [`ICountryType`](../interfaces/imported_resources.ICountryType.md)[]

#### Defined in

[imported-resources/index.ts:70](https://github.com/onzag/itemize/blob/59702dd5/imported-resources/index.ts#L70)

___

### arrCurrencies

• `Const` **arrCurrencies**: [`ICurrencyType`](../interfaces/imported_resources.ICurrencyType.md)[]

#### Defined in

[imported-resources/index.ts:79](https://github.com/onzag/itemize/blob/59702dd5/imported-resources/index.ts#L79)

___

### arrLanguages

• `Const` **arrLanguages**: [`ILanguageType`](../interfaces/imported_resources.ILanguageType.md)[]

#### Defined in

[imported-resources/index.ts:88](https://github.com/onzag/itemize/blob/59702dd5/imported-resources/index.ts#L88)

___

### countries

• `Const` **countries**: [`ICountryDataType`](../interfaces/imported_resources.ICountryDataType.md)

#### Defined in

[imported-resources/index.ts:67](https://github.com/onzag/itemize/blob/59702dd5/imported-resources/index.ts#L67)

___

### currencies

• `Const` **currencies**: [`ICurrencyDataType`](../interfaces/imported_resources.ICurrencyDataType.md)

#### Defined in

[imported-resources/index.ts:68](https://github.com/onzag/itemize/blob/59702dd5/imported-resources/index.ts#L68)

___

### languages

• `Const` **languages**: [`ILanguageDataType`](../interfaces/imported_resources.ILanguageDataType.md)

#### Defined in

[imported-resources/index.ts:69](https://github.com/onzag/itemize/blob/59702dd5/imported-resources/index.ts#L69)

## Functions

### isRTL

▸ **isRTL**(`language`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | `string` |

#### Returns

`boolean`

#### Defined in

[imported-resources/index.ts:98](https://github.com/onzag/itemize/blob/59702dd5/imported-resources/index.ts#L98)
