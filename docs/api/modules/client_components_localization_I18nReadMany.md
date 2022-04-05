[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/components/localization/I18nReadMany

# Module: client/components/localization/I18nReadMany

Allows to read many errors and standard information at the same time (parallel)
in an efficient way

## Table of contents

### Functions

- [default](client_components_localization_I18nReadMany.md#default)
- [i18nReadManyInternal](client_components_localization_I18nReadMany.md#i18nreadmanyinternal)

## Functions

### default

▸ **default**(`props`): `any`

The read many component which allows to read many i18n data at once

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `Ii18nReadManyProps` | the props |

#### Returns

`any`

a react node, it is marked as any because typescript gets buggy
when such a function returns a react node

#### Defined in

[client/components/localization/I18nReadMany.tsx:91](https://github.com/onzag/itemize/blob/5c2808d3/client/components/localization/I18nReadMany.tsx#L91)

___

### i18nReadManyInternal

▸ **i18nReadManyInternal**(`localeContext`, `dataContext`, `moduleContextualValue`, `itemContextualValue`, `includeContext`, `props`): `ReactNode`

The internal read many functionality, somewhat less refined
than the previous because this one doesn't need an optimizer
on itself

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `localeContext` | [`ILocaleContextType`](../interfaces/client_internal_providers_locale_provider.ILocaleContextType.md) | the locale context (always available) |
| `dataContext` | [`IDataContextType`](../interfaces/client_internal_providers_appdata_provider.IDataContextType.md) | data context for root data app access (available for errors) |
| `moduleContextualValue` | [`IModuleContextType`](../interfaces/client_providers_module.IModuleContextType.md) | module context (avaiable for standard display if exists) |
| `itemContextualValue` | [`IItemContextType`](../interfaces/client_providers_item.IItemContextType.md) | item definition context (avaiable for standard display if exists) |
| `includeContext` | [`IIncludeContext`](../interfaces/client_providers_include.IIncludeContext.md) | include context (avaiable for standard display if exists) |
| `props` | `Ii18nReadManyProps` | the actual read many props |

#### Returns

`ReactNode`

#### Defined in

[client/components/localization/I18nReadMany.tsx:47](https://github.com/onzag/itemize/blob/5c2808d3/client/components/localization/I18nReadMany.tsx#L47)
