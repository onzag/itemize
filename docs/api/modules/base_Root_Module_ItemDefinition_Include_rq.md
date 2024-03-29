[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/Include/rq

# Module: base/Root/Module/ItemDefinition/Include/rq

This file contains the rq utility functions for managing
Includes that exist within item definitions, it doesn't contain
the conversion function sql.ts does

## Table of contents

### Functions

- [getRQDefinitionForInclude](base_Root_Module_ItemDefinition_Include_rq.md#getrqdefinitionforinclude)

## Functions

### getRQDefinitionForInclude

▸ **getRQDefinitionForInclude**(`include`, `options`): `Object`

Provides the rq definition that will be required to store
this include bit

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) | the include |
| `options` | `Object` | - |
| `options.optionalForm` | `boolean` | makes all the field of the include optional so they can be decided |
| `options.retrievalMode` | `boolean` | - |

#### Returns

`Object`

a list of field definitions that represent the include in rq form
for use within the rq description

#### Defined in

[base/Root/Module/ItemDefinition/Include/rq.ts:24](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/Include/rq.ts#L24)
