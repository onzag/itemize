[](../README.md) / [Exports](../modules.md) / builder/evaler

# Module: builder/evaler

## Table of contents

### Functions

- [evalRawJSON](builder_evaler.md#evalrawjson)

## Functions

### evalRawJSON

▸ **evalRawJSON**<T\>(`config`: [*IBuilderBasicConfigType*](../interfaces/builder_config.ibuilderbasicconfigtype.md), `rawJSON`: T): T

Evaluates javascript using new Function, it's okay this is a building
process that developers execute, it is not meant for clients and it only executes
once in json fields that exist within the schema that use the $CONFIG: syntax
what comes after that is javascript and will replace itself with the return of that

#### Type parameters:

Name |
:------ |
`T` |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`config` | [*IBuilderBasicConfigType*](../interfaces/builder_config.ibuilderbasicconfigtype.md) | the configuration   |
`rawJSON` | T | the raw json of whatever it is to be evaled   |

**Returns:** T

that same json with evaled fields replaced

Defined in: [builder/evaler.ts:20](https://github.com/onzag/itemize/blob/28218320/builder/evaler.ts#L20)
