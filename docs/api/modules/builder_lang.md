[](../README.md) / [Exports](../modules.md) / builder/lang

# Module: builder/lang

This file contains the language utilities that build the primary language
information for the main language file that belongs to the root as well
as for the lang.json file

## Table of contents

### Functions

- [buildLang](builder_lang.md#buildlang)
- [clearLang](builder_lang.md#clearlang)

## Functions

### buildLang

▸ **buildLang**(`rawDataConfig`: [*IBuilderBasicConfigType*](../interfaces/builder_config.ibuilderbasicconfigtype.md), `actualRootLocation`: *string*, `i18nBaseFileLocation`: *string*, `traceback`: [*default*](../classes/builder_traceback.default.md)): *Promise*<[*Ii18NType*](../interfaces/base_root.ii18ntype.md)\>

Build the core language data that holds information
about the language itself and other localizables

**`retuns`** a promise for locale language data

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rawDataConfig` | [*IBuilderBasicConfigType*](../interfaces/builder_config.ibuilderbasicconfigtype.md) | - |
`actualRootLocation` | *string* | the root location that sets these languages   |
`i18nBaseFileLocation` | *string* | - |
`traceback` | [*default*](../classes/builder_traceback.default.md) | the traceback in the location   |

**Returns:** *Promise*<[*Ii18NType*](../interfaces/base_root.ii18ntype.md)\>

Defined in: [builder/lang.ts:73](https://github.com/onzag/itemize/blob/11a98dec/builder/lang.ts#L73)

___

### clearLang

▸ **clearLang**(`rawData`: [*Ii18NType*](../interfaces/base_root.ii18ntype.md), `rawDataConfig`: [*IBuilderBasicConfigType*](../interfaces/builder_config.ibuilderbasicconfigtype.md)): [*ILangLocalesType*](../interfaces/base_root.ilanglocalestype.md)

Clears language data in such a way that it leaves only the name
and the supported locales

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rawData` | [*Ii18NType*](../interfaces/base_root.ii18ntype.md) | the raw locale language data   |
`rawDataConfig` | [*IBuilderBasicConfigType*](../interfaces/builder_config.ibuilderbasicconfigtype.md) | the raw data config   |

**Returns:** [*ILangLocalesType*](../interfaces/base_root.ilanglocalestype.md)

the new locale language data with only names

Defined in: [builder/lang.ts:211](https://github.com/onzag/itemize/blob/11a98dec/builder/lang.ts#L211)
