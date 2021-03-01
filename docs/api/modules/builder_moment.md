[](../README.md) / [Exports](../modules.md) / builder/moment

# Module: builder/moment

This file copies the necessary moment files that are used for data displaying
in all the different languages that are meant to be supported

## Table of contents

### Functions

- [copyMomentFiles](builder_moment.md#copymomentfiles)

## Functions

### copyMomentFiles

▸ **copyMomentFiles**(`rawConfig`: [*IBuilderBasicConfigType*](../interfaces/builder_config.ibuilderbasicconfigtype.md)): *Promise*<void\>

Copies the compiled moment files that exist within the node_modules
for async usage as they are deemed necessary on the fly

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rawConfig` | [*IBuilderBasicConfigType*](../interfaces/builder_config.ibuilderbasicconfigtype.md) | the raw configuration   |

**Returns:** *Promise*<void\>

a void promise

Defined in: [builder/moment.ts:20](https://github.com/onzag/itemize/blob/3efa2a4a/builder/moment.ts#L20)
