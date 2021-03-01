[](../README.md) / [Exports](../modules.md) / [client/internal/providers/locale-provider](../modules/client_internal_providers_locale_provider.md) / ILocaleContextType

# Interface: ILocaleContextType

[client/internal/providers/locale-provider](../modules/client_internal_providers_locale_provider.md).ILocaleContextType

This is the locale type, which contains the locale
information for using in the application

## Table of contents

### Properties

- [changeCountryTo](client_internal_providers_locale_provider.ilocalecontexttype.md#changecountryto)
- [changeCurrencyTo](client_internal_providers_locale_provider.ilocalecontexttype.md#changecurrencyto)
- [changeLanguageTo](client_internal_providers_locale_provider.ilocalecontexttype.md#changelanguageto)
- [country](client_internal_providers_locale_provider.ilocalecontexttype.md#country)
- [currency](client_internal_providers_locale_provider.ilocalecontexttype.md#currency)
- [currencyFactors](client_internal_providers_locale_provider.ilocalecontexttype.md#currencyfactors)
- [i18n](client_internal_providers_locale_provider.ilocalecontexttype.md#i18n)
- [langLocales](client_internal_providers_locale_provider.ilocalecontexttype.md#langlocales)
- [language](client_internal_providers_locale_provider.ilocalecontexttype.md#language)
- [rtl](client_internal_providers_locale_provider.ilocalecontexttype.md#rtl)
- [updating](client_internal_providers_locale_provider.ilocalecontexttype.md#updating)

## Properties

### changeCountryTo

• **changeCountryTo**: (`code`: *string*, `avoidChangingLanguageAndCurrency?`: *boolean*, `avoidUpdatingUser?`: *boolean*) => *Promise*<void\>

To change the country to a new code

**`param`** a code which represents a valid supported country from the country list

**`param`** avoid updating the user (if logged in)

**`returns`** a void promise, this is basically for the same reason of changeLanguageTo

#### Type declaration:

▸ (`code`: *string*, `avoidChangingLanguageAndCurrency?`: *boolean*, `avoidUpdatingUser?`: *boolean*): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`code` | *string* |
`avoidChangingLanguageAndCurrency?` | *boolean* |
`avoidUpdatingUser?` | *boolean* |

**Returns:** *Promise*<void\>

Defined in: [client/internal/providers/locale-provider.tsx:35](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/providers/locale-provider.tsx#L35)

Defined in: [client/internal/providers/locale-provider.tsx:35](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/providers/locale-provider.tsx#L35)

___

### changeCurrencyTo

• **changeCurrencyTo**: (`code`: *string*, `avoidUpdatingUser?`: *boolean*) => *void*

To change the currency to a new code

**`param`** a code which represents a valid supported currency from the currency list

**`param`** avoid updating the user (if logged in)

#### Type declaration:

▸ (`code`: *string*, `avoidUpdatingUser?`: *boolean*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`code` | *string* |
`avoidUpdatingUser?` | *boolean* |

**Returns:** *void*

Defined in: [client/internal/providers/locale-provider.tsx:28](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/providers/locale-provider.tsx#L28)

Defined in: [client/internal/providers/locale-provider.tsx:28](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/providers/locale-provider.tsx#L28)

___

### changeLanguageTo

• **changeLanguageTo**: (`code`: *string*, `avoidUpdatingUser?`: *boolean*) => *Promise*<void\>

to change the lanaguage to a new code

**`param`** the new language code

**`param`** avoid updating the user (if logged in)

**`returns`** a void promise, this promise is fullfilled once the language
has been changed successfully and as such the app has updated

#### Type declaration:

▸ (`code`: *string*, `avoidUpdatingUser?`: *boolean*): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`code` | *string* |
`avoidUpdatingUser?` | *boolean* |

**Returns:** *Promise*<void\>

Defined in: [client/internal/providers/locale-provider.tsx:22](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/providers/locale-provider.tsx#L22)

Defined in: [client/internal/providers/locale-provider.tsx:22](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/providers/locale-provider.tsx#L22)

___

### country

• **country**: *string*

The current country code

Defined in: [client/internal/providers/locale-provider.tsx:57](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/providers/locale-provider.tsx#L57)

___

### currency

• **currency**: *string*

The current currency code

Defined in: [client/internal/providers/locale-provider.tsx:47](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/providers/locale-provider.tsx#L47)

___

### currencyFactors

• **currencyFactors**: *object*

The current currency factors

#### Type declaration:

Defined in: [client/internal/providers/locale-provider.tsx:51](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/providers/locale-provider.tsx#L51)

___

### i18n

• **i18n**: [*Ii18NType*](base_root.ii18ntype.md)

The root i18n data

Defined in: [client/internal/providers/locale-provider.tsx:70](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/providers/locale-provider.tsx#L70)

___

### langLocales

• **langLocales**: [*ILangLocalesType*](base_root.ilanglocalestype.md)

The language locales available, and their given direction

Defined in: [client/internal/providers/locale-provider.tsx:66](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/providers/locale-provider.tsx#L66)

___

### language

• **language**: *string*

The current language code

Defined in: [client/internal/providers/locale-provider.tsx:39](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/providers/locale-provider.tsx#L39)

___

### rtl

• **rtl**: *boolean*

Whether this current language is rtl

Defined in: [client/internal/providers/locale-provider.tsx:43](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/providers/locale-provider.tsx#L43)

___

### updating

• **updating**: *boolean*

Whether this is currently updating, on practise only happens
with updating the language as it has to be refetched

Defined in: [client/internal/providers/locale-provider.tsx:62](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/providers/locale-provider.tsx#L62)
