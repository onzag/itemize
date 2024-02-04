[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/components/localization/I18nRead

# Module: client/components/localization/I18nRead

Provides the read functionality to read language content in the
item definition, module, or even the root context

## Table of contents

### Classes

- [I18nReadInternalOptimized](../classes/client_components_localization_I18nRead.I18nReadInternalOptimized.md)

### Interfaces

- [I18nReadOptions](../interfaces/client_components_localization_I18nRead.I18nReadOptions.md)
- [II18nReadProps](../interfaces/client_components_localization_I18nRead.II18nReadProps.md)

### Functions

- [default](client_components_localization_I18nRead.md#default)
- [useI18nRead](client_components_localization_I18nRead.md#usei18nread)

## Functions

### default

▸ **default**(`props`): `Element`

Allows to read localized properties from the properties
file as they are available in the current context

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`II18nReadProps`](../interfaces/client_components_localization_I18nRead.II18nReadProps.md) | the props |

#### Returns

`Element`

a react node

#### Defined in

[client/components/localization/I18nRead.tsx:390](https://github.com/onzag/itemize/blob/73e0c39e/client/components/localization/I18nRead.tsx#L390)

___

### useI18nRead

▸ **useI18nRead**(`options`): `React.ReactNode`

The i18n read as a react hook

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`I18nReadOptions`](../interfaces/client_components_localization_I18nRead.I18nReadOptions.md) |

#### Returns

`React.ReactNode`

#### Defined in

[client/components/localization/I18nRead.tsx:467](https://github.com/onzag/itemize/blob/73e0c39e/client/components/localization/I18nRead.tsx#L467)
