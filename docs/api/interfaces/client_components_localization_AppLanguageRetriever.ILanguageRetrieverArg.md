[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/localization/AppLanguageRetriever](../modules/client_components_localization_AppLanguageRetriever.md) / ILanguageRetrieverArg

# Interface: ILanguageRetrieverArg

[client/components/localization/AppLanguageRetriever](../modules/client_components_localization_AppLanguageRetriever.md).ILanguageRetrieverArg

## Hierarchy

- `IActualAppLanguageRetrieverProps`

  ↳ **`ILanguageRetrieverArg`**

## Table of contents

### Properties

- [availableLanguages](client_components_localization_AppLanguageRetriever.ILanguageRetrieverArg.md#availablelanguages)
- [changeLanguageTo](client_components_localization_AppLanguageRetriever.ILanguageRetrieverArg.md#changelanguageto)
- [currentLanguage](client_components_localization_AppLanguageRetriever.ILanguageRetrieverArg.md#currentlanguage)
- [dismissError](client_components_localization_AppLanguageRetriever.ILanguageRetrieverArg.md#dismisserror)
- [error](client_components_localization_AppLanguageRetriever.ILanguageRetrieverArg.md#error)
- [rtl](client_components_localization_AppLanguageRetriever.ILanguageRetrieverArg.md#rtl)

## Properties

### availableLanguages

• **availableLanguages**: `IFnAppLanguageRetrieverLanguageFormType`[]

#### Inherited from

IActualAppLanguageRetrieverProps.availableLanguages

#### Defined in

[client/components/localization/AppLanguageRetriever.tsx:21](https://github.com/onzag/itemize/blob/73e0c39e/client/components/localization/AppLanguageRetriever.tsx#L21)

___

### changeLanguageTo

• **changeLanguageTo**: [`ChangeLanguageToFn`](../modules/client_internal_providers_locale_provider.md#changelanguagetofn)

#### Inherited from

IActualAppLanguageRetrieverProps.changeLanguageTo

#### Defined in

[client/components/localization/AppLanguageRetriever.tsx:23](https://github.com/onzag/itemize/blob/73e0c39e/client/components/localization/AppLanguageRetriever.tsx#L23)

___

### currentLanguage

• **currentLanguage**: `IFnAppLanguageRetrieverLanguageFormType`

#### Inherited from

IActualAppLanguageRetrieverProps.currentLanguage

#### Defined in

[client/components/localization/AppLanguageRetriever.tsx:20](https://github.com/onzag/itemize/blob/73e0c39e/client/components/localization/AppLanguageRetriever.tsx#L20)

___

### dismissError

• `Optional` **dismissError**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[client/components/localization/AppLanguageRetriever.tsx:32](https://github.com/onzag/itemize/blob/73e0c39e/client/components/localization/AppLanguageRetriever.tsx#L32)

___

### error

• **error**: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)

#### Defined in

[client/components/localization/AppLanguageRetriever.tsx:31](https://github.com/onzag/itemize/blob/73e0c39e/client/components/localization/AppLanguageRetriever.tsx#L31)

___

### rtl

• **rtl**: `boolean`

#### Inherited from

IActualAppLanguageRetrieverProps.rtl

#### Defined in

[client/components/localization/AppLanguageRetriever.tsx:22](https://github.com/onzag/itemize/blob/73e0c39e/client/components/localization/AppLanguageRetriever.tsx#L22)
