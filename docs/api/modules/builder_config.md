[](../README.md) / [Exports](../modules.md) / builder/config

# Module: builder/config

Doesn't do much other than save and store the config file for
dist purposes

## Table of contents

### Interfaces

- [IBuilderBasicConfigType](../interfaces/builder_config.ibuilderbasicconfigtype.md)

### Functions

- [extractConfigAndBuildNumber](builder_config.md#extractconfigandbuildnumber)
- [extractOneConfig](builder_config.md#extractoneconfig)

## Functions

### extractConfigAndBuildNumber

▸ **extractConfigAndBuildNumber**(): *Promise*<[*IBuilderBasicConfigType*](../interfaces/builder_config.ibuilderbasicconfigtype.md)\>

Extracts the configuration from the files where it should be located
and does data checks on the json files

**Returns:** *Promise*<[*IBuilderBasicConfigType*](../interfaces/builder_config.ibuilderbasicconfigtype.md)\>

Defined in: [builder/config.ts:77](https://github.com/onzag/itemize/blob/11a98dec/builder/config.ts#L77)

___

### extractOneConfig

▸ **extractOneConfig**<T\>(`validator`: Ajv.ValidateFunction, `mainName`: *string*, `version`: *string*, `isSensitive`: *boolean*, `cb?`: (`data`: T, `tb`: [*default*](../classes/builder_traceback.default.md)) => *void*): *Promise*<T\>

#### Type parameters:

Name |
:------ |
`T` |

#### Parameters:

Name | Type |
:------ | :------ |
`validator` | Ajv.ValidateFunction |
`mainName` | *string* |
`version` | *string* |
`isSensitive` | *boolean* |
`cb?` | (`data`: T, `tb`: [*default*](../classes/builder_traceback.default.md)) => *void* |

**Returns:** *Promise*<T\>

Defined in: [builder/config.ts:27](https://github.com/onzag/itemize/blob/11a98dec/builder/config.ts#L27)
