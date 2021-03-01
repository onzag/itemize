[](../README.md) / [Exports](../modules.md) / builder/manifest

# Module: builder/manifest

This file generates the manifest files based on the config and the root

## Table of contents

### Functions

- [buildManifest](builder_manifest.md#buildmanifest)

## Functions

### buildManifest

▸ **buildManifest**(`rawConfig`: [*IBuilderBasicConfigType*](../interfaces/builder_config.ibuilderbasicconfigtype.md), `rawRoot`: [*IRootRawJSONDataType*](../interfaces/root.irootrawjsondatatype.md)): *Promise*<void\>

Builds the different manifest files that are necessary

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rawConfig` | [*IBuilderBasicConfigType*](../interfaces/builder_config.ibuilderbasicconfigtype.md) | the raw configuration   |
`rawRoot` | [*IRootRawJSONDataType*](../interfaces/root.irootrawjsondatatype.md) | the root in raw form   |

**Returns:** *Promise*<void\>

a void promise

Defined in: [builder/manifest.ts:20](https://github.com/onzag/itemize/blob/0569bdf2/builder/manifest.ts#L20)
