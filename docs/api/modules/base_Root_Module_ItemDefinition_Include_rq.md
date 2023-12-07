[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/Include/rq

# Module: base/Root/Module/ItemDefinition/Include/rq

This file contains the graphql utility functions for managing
Includes that exist within item definitions, it doesn't contain
the conversion function sql.ts does

## Table of contents

### Functions

- [getRQDefinitionForInclude](base_Root_Module_ItemDefinition_Include_rq.md#getrqdefinitionforinclude)

## Functions

### getRQDefinitionForInclude

▸ **getRQDefinitionForInclude**(`include`, `options`): `Object`

Provides the graphql definition that will be required to store
this include bit

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) | the include |
| `options` | `Object` | - |
| `options.optionalForm` | `boolean` | makes all the field of the include optional so they can be decided |

#### Returns

`Object`

a list of field definitions that represent the include in graphql form
for use within the graphql description

#### Defined in

[base/Root/Module/ItemDefinition/Include/rq.ts:24](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/Include/rq.ts#L24)
