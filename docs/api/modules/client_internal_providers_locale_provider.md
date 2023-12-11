[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/internal/providers/locale-provider

# Module: client/internal/providers/locale-provider

Contains the locale provider that provides locale information

## Table of contents

### Classes

- [LocaleProvider](../classes/client_internal_providers_locale_provider.LocaleProvider.md)

### Interfaces

- [ILocaleContextType](../interfaces/client_internal_providers_locale_provider.ILocaleContextType.md)

### Type Aliases

- [ChangeCountryToFn](client_internal_providers_locale_provider.md#changecountrytofn)
- [ChangeCurrencyToFn](client_internal_providers_locale_provider.md#changecurrencytofn)
- [ChangeLanguageToFn](client_internal_providers_locale_provider.md#changelanguagetofn)

### Variables

- [LocaleContext](client_internal_providers_locale_provider.md#localecontext)

## Type Aliases

### ChangeCountryToFn

Ƭ **ChangeCountryToFn**: (`code`: `string`, `avoidUpdatingCountry?`: `boolean`, `avoidChangingLanguageAndCurrency?`: `boolean`, `avoidUpdatingUser?`: `boolean`, `onPotentialChangesFoundFor?`: (`languageCode`: `string`, `currencyCode`: `string`) => `void`) => `Promise`\<[`EndpointErrorType`](base_errors.md#endpointerrortype)\>

#### Type declaration

▸ (`code`, `avoidUpdatingCountry?`, `avoidChangingLanguageAndCurrency?`, `avoidUpdatingUser?`, `onPotentialChangesFoundFor?`): `Promise`\<[`EndpointErrorType`](base_errors.md#endpointerrortype)\>

To change the country to a new code

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `string` | a code which represents a valid supported country from the country list |
| `avoidUpdatingCountry?` | `boolean` | avoids updating the country itself, use this if you are only wanting to know the predicted outcome of the language and currency |
| `avoidChangingLanguageAndCurrency?` | `boolean` | avoids triggering an automatic change to the language and currency based on the country |
| `avoidUpdatingUser?` | `boolean` | avoid updating the user (if logged in) |
| `onPotentialChangesFoundFor?` | (`languageCode`: `string`, `currencyCode`: `string`) => `void` | provides information regarding the country that was changed regarding potential changes does not trigger if not found |

##### Returns

`Promise`\<[`EndpointErrorType`](base_errors.md#endpointerrortype)\>

a void promise, this is basically for the same reason of changeLanguageTo

#### Defined in

[client/internal/providers/locale-provider.tsx:39](https://github.com/onzag/itemize/blob/59702dd5/client/internal/providers/locale-provider.tsx#L39)

___

### ChangeCurrencyToFn

Ƭ **ChangeCurrencyToFn**: (`code`: `string`, `avoidUpdatingUser?`: `boolean`) => `Promise`\<[`EndpointErrorType`](base_errors.md#endpointerrortype)\>

#### Type declaration

▸ (`code`, `avoidUpdatingUser?`): `Promise`\<[`EndpointErrorType`](base_errors.md#endpointerrortype)\>

To change the currency to a new code

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `string` | a code which represents a valid supported currency from the currency list |
| `avoidUpdatingUser?` | `boolean` | avoid updating the user (if logged in) |

##### Returns

`Promise`\<[`EndpointErrorType`](base_errors.md#endpointerrortype)\>

#### Defined in

[client/internal/providers/locale-provider.tsx:25](https://github.com/onzag/itemize/blob/59702dd5/client/internal/providers/locale-provider.tsx#L25)

___

### ChangeLanguageToFn

Ƭ **ChangeLanguageToFn**: (`code`: `string`, `avoidUpdatingUser?`: `boolean`) => `Promise`\<[`EndpointErrorType`](base_errors.md#endpointerrortype)\>

#### Type declaration

▸ (`code`, `avoidUpdatingUser?`): `Promise`\<[`EndpointErrorType`](base_errors.md#endpointerrortype)\>

to change the lanaguage to a new code

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `string` | the new language code |
| `avoidUpdatingUser?` | `boolean` | avoid updating the user (if logged in) |

##### Returns

`Promise`\<[`EndpointErrorType`](base_errors.md#endpointerrortype)\>

a void promise, this promise is fullfilled once the language
has been changed successfully and as such the app has updated

#### Defined in

[client/internal/providers/locale-provider.tsx:18](https://github.com/onzag/itemize/blob/59702dd5/client/internal/providers/locale-provider.tsx#L18)

## Variables

### LocaleContext

• `Const` **LocaleContext**: `Context`\<[`ILocaleContextType`](../interfaces/client_internal_providers_locale_provider.ILocaleContextType.md)\>

The locale context provides the locale information down all the way
to any component that demands it

#### Defined in

[client/internal/providers/locale-provider.tsx:96](https://github.com/onzag/itemize/blob/59702dd5/client/internal/providers/locale-provider.tsx#L96)
