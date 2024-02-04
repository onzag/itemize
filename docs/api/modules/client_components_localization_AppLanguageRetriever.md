[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/components/localization/AppLanguageRetriever

# Module: client/components/localization/AppLanguageRetriever

Simply provides the current language

## Table of contents

### Interfaces

- [ILanguageRetrieverArg](../interfaces/client_components_localization_AppLanguageRetriever.ILanguageRetrieverArg.md)

### Functions

- [default](client_components_localization_AppLanguageRetriever.md#default)
- [useAppLanguageRetriever](client_components_localization_AppLanguageRetriever.md#useapplanguageretriever)

## Functions

### default

▸ **default**(`props`): `Element`

Allows to read the current language as well as to change it from
the list of available languages that it can change, it also provides
the rtl property for right to left languages

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `Object` | the props |
| `props.children` | `FnAppLanguageRetrieverType` | - |

#### Returns

`Element`

a react node

#### Defined in

[client/components/localization/AppLanguageRetriever.tsx:70](https://github.com/onzag/itemize/blob/73e0c39e/client/components/localization/AppLanguageRetriever.tsx#L70)

___

### useAppLanguageRetriever

▸ **useAppLanguageRetriever**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `availableLanguages` | `IFnAppLanguageRetrieverLanguageFormType`[] |
| `changeLanguageTo` | [`ChangeLanguageToFn`](client_internal_providers_locale_provider.md#changelanguagetofn) \| () => `any` |
| `currentLanguage` | `IFnAppLanguageRetrieverLanguageFormType` |
| `rtl` | `boolean` |

#### Defined in

[client/components/localization/AppLanguageRetriever.tsx:108](https://github.com/onzag/itemize/blob/73e0c39e/client/components/localization/AppLanguageRetriever.tsx#L108)
