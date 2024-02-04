[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/providers/locale-provider](../modules/client_internal_providers_locale_provider.md) / ILocaleContextType

# Interface: ILocaleContextType

[client/internal/providers/locale-provider](../modules/client_internal_providers_locale_provider.md).ILocaleContextType

This is the locale type, which contains the locale
information for using in the application

## Table of contents

### Properties

- [changeCountryTo](client_internal_providers_locale_provider.ILocaleContextType.md#changecountryto)
- [changeCurrencyTo](client_internal_providers_locale_provider.ILocaleContextType.md#changecurrencyto)
- [changeLanguageTo](client_internal_providers_locale_provider.ILocaleContextType.md#changelanguageto)
- [country](client_internal_providers_locale_provider.ILocaleContextType.md#country)
- [currency](client_internal_providers_locale_provider.ILocaleContextType.md#currency)
- [currencyFactors](client_internal_providers_locale_provider.ILocaleContextType.md#currencyfactors)
- [i18n](client_internal_providers_locale_provider.ILocaleContextType.md#i18n)
- [langLocales](client_internal_providers_locale_provider.ILocaleContextType.md#langlocales)
- [language](client_internal_providers_locale_provider.ILocaleContextType.md#language)
- [rtl](client_internal_providers_locale_provider.ILocaleContextType.md#rtl)
- [updating](client_internal_providers_locale_provider.ILocaleContextType.md#updating)

## Properties

### changeCountryTo

• **changeCountryTo**: [`ChangeCountryToFn`](../modules/client_internal_providers_locale_provider.md#changecountrytofn)

#### Defined in

[client/internal/providers/locale-provider.tsx:54](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/providers/locale-provider.tsx#L54)

___

### changeCurrencyTo

• **changeCurrencyTo**: [`ChangeCurrencyToFn`](../modules/client_internal_providers_locale_provider.md#changecurrencytofn)

#### Defined in

[client/internal/providers/locale-provider.tsx:53](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/providers/locale-provider.tsx#L53)

___

### changeLanguageTo

• **changeLanguageTo**: [`ChangeLanguageToFn`](../modules/client_internal_providers_locale_provider.md#changelanguagetofn)

#### Defined in

[client/internal/providers/locale-provider.tsx:52](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/providers/locale-provider.tsx#L52)

___

### country

• **country**: `string`

The current country code

#### Defined in

[client/internal/providers/locale-provider.tsx:76](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/providers/locale-provider.tsx#L76)

___

### currency

• **currency**: `string`

The current currency code

#### Defined in

[client/internal/providers/locale-provider.tsx:66](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/providers/locale-provider.tsx#L66)

___

### currencyFactors

• **currencyFactors**: `Object`

The current currency factors

#### Index signature

▪ [code: `string`]: `number`

#### Defined in

[client/internal/providers/locale-provider.tsx:70](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/providers/locale-provider.tsx#L70)

___

### i18n

• **i18n**: [`Ii18NType`](base_Root.Ii18NType.md)

The root i18n data

#### Defined in

[client/internal/providers/locale-provider.tsx:89](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/providers/locale-provider.tsx#L89)

___

### langLocales

• **langLocales**: [`ILangLocalesType`](base_Root.ILangLocalesType.md)

The language locales available, and their given direction

#### Defined in

[client/internal/providers/locale-provider.tsx:85](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/providers/locale-provider.tsx#L85)

___

### language

• **language**: `string`

The current language code

#### Defined in

[client/internal/providers/locale-provider.tsx:58](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/providers/locale-provider.tsx#L58)

___

### rtl

• **rtl**: `boolean`

Whether this current language is rtl

#### Defined in

[client/internal/providers/locale-provider.tsx:62](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/providers/locale-provider.tsx#L62)

___

### updating

• **updating**: `boolean`

Whether this is currently updating, on practise only happens
with updating the language as it has to be refetched

#### Defined in

[client/internal/providers/locale-provider.tsx:81](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/providers/locale-provider.tsx#L81)
