[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/providers/locale-provider](../modules/client_internal_providers_locale_provider.md) / ILocaleContextType

# Interface: ILocaleContextType

[client/internal/providers/locale-provider](../modules/client_internal_providers_locale_provider.md).ILocaleContextType

This is the locale type, which contains the locale
information for using in the application

## Table of contents

### Properties

- [country](client_internal_providers_locale_provider.ILocaleContextType.md#country)
- [currency](client_internal_providers_locale_provider.ILocaleContextType.md#currency)
- [currencyFactors](client_internal_providers_locale_provider.ILocaleContextType.md#currencyfactors)
- [i18n](client_internal_providers_locale_provider.ILocaleContextType.md#i18n)
- [langLocales](client_internal_providers_locale_provider.ILocaleContextType.md#langlocales)
- [language](client_internal_providers_locale_provider.ILocaleContextType.md#language)
- [rtl](client_internal_providers_locale_provider.ILocaleContextType.md#rtl)
- [updating](client_internal_providers_locale_provider.ILocaleContextType.md#updating)

### Methods

- [changeCountryTo](client_internal_providers_locale_provider.ILocaleContextType.md#changecountryto)
- [changeCurrencyTo](client_internal_providers_locale_provider.ILocaleContextType.md#changecurrencyto)
- [changeLanguageTo](client_internal_providers_locale_provider.ILocaleContextType.md#changelanguageto)

## Properties

### country

• **country**: `string`

The current country code

#### Defined in

[client/internal/providers/locale-provider.tsx:57](https://github.com/onzag/itemize/blob/f2f29986/client/internal/providers/locale-provider.tsx#L57)

___

### currency

• **currency**: `string`

The current currency code

#### Defined in

[client/internal/providers/locale-provider.tsx:47](https://github.com/onzag/itemize/blob/f2f29986/client/internal/providers/locale-provider.tsx#L47)

___

### currencyFactors

• **currencyFactors**: `Object`

The current currency factors

#### Index signature

▪ [code: `string`]: `number`

#### Defined in

[client/internal/providers/locale-provider.tsx:51](https://github.com/onzag/itemize/blob/f2f29986/client/internal/providers/locale-provider.tsx#L51)

___

### i18n

• **i18n**: [`Ii18NType`](base_Root.Ii18NType.md)

The root i18n data

#### Defined in

[client/internal/providers/locale-provider.tsx:70](https://github.com/onzag/itemize/blob/f2f29986/client/internal/providers/locale-provider.tsx#L70)

___

### langLocales

• **langLocales**: [`ILangLocalesType`](base_Root.ILangLocalesType.md)

The language locales available, and their given direction

#### Defined in

[client/internal/providers/locale-provider.tsx:66](https://github.com/onzag/itemize/blob/f2f29986/client/internal/providers/locale-provider.tsx#L66)

___

### language

• **language**: `string`

The current language code

#### Defined in

[client/internal/providers/locale-provider.tsx:39](https://github.com/onzag/itemize/blob/f2f29986/client/internal/providers/locale-provider.tsx#L39)

___

### rtl

• **rtl**: `boolean`

Whether this current language is rtl

#### Defined in

[client/internal/providers/locale-provider.tsx:43](https://github.com/onzag/itemize/blob/f2f29986/client/internal/providers/locale-provider.tsx#L43)

___

### updating

• **updating**: `boolean`

Whether this is currently updating, on practise only happens
with updating the language as it has to be refetched

#### Defined in

[client/internal/providers/locale-provider.tsx:62](https://github.com/onzag/itemize/blob/f2f29986/client/internal/providers/locale-provider.tsx#L62)

## Methods

### changeCountryTo

▸ **changeCountryTo**(`code`, `avoidChangingLanguageAndCurrency?`, `avoidUpdatingUser?`): `Promise`<`void`\>

To change the country to a new code

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `string` | a code which represents a valid supported country from the country list |
| `avoidChangingLanguageAndCurrency?` | `boolean` | - |
| `avoidUpdatingUser?` | `boolean` | avoid updating the user (if logged in) |

#### Returns

`Promise`<`void`\>

a void promise, this is basically for the same reason of changeLanguageTo

#### Defined in

[client/internal/providers/locale-provider.tsx:35](https://github.com/onzag/itemize/blob/f2f29986/client/internal/providers/locale-provider.tsx#L35)

___

### changeCurrencyTo

▸ **changeCurrencyTo**(`code`, `avoidUpdatingUser?`): `void`

To change the currency to a new code

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `string` | a code which represents a valid supported currency from the currency list |
| `avoidUpdatingUser?` | `boolean` | avoid updating the user (if logged in) |

#### Returns

`void`

#### Defined in

[client/internal/providers/locale-provider.tsx:28](https://github.com/onzag/itemize/blob/f2f29986/client/internal/providers/locale-provider.tsx#L28)

___

### changeLanguageTo

▸ **changeLanguageTo**(`code`, `avoidUpdatingUser?`): `Promise`<`void`\>

to change the lanaguage to a new code

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `string` | the new language code |
| `avoidUpdatingUser?` | `boolean` | avoid updating the user (if logged in) |

#### Returns

`Promise`<`void`\>

a void promise, this promise is fullfilled once the language
has been changed successfully and as such the app has updated

#### Defined in

[client/internal/providers/locale-provider.tsx:22](https://github.com/onzag/itemize/blob/f2f29986/client/internal/providers/locale-provider.tsx#L22)
