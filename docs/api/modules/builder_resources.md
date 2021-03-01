[](../README.md) / [Exports](../modules.md) / builder/resources

# Module: builder/resources

Builds and requests the necessary resources either the required
ones as well as whatever else the programmer adds and it even optimizes
these by running some optimizers

## Table of contents

### Functions

- [buildResources](builder_resources.md#buildresources)

## Functions

### buildResources

▸ **buildResources**(`rawConfig`: [*IBuilderBasicConfigType*](../interfaces/builder_config.ibuilderbasicconfigtype.md)): *Promise*<void\>

Builds all the resources in the resources directory and optimizes if
possible

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rawConfig` | [*IBuilderBasicConfigType*](../interfaces/builder_config.ibuilderbasicconfigtype.md) | the raw config   |

**Returns:** *Promise*<void\>

a void promise

Defined in: [builder/resources.ts:191](https://github.com/onzag/itemize/blob/28218320/builder/resources.ts#L191)
