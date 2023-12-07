[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/rq

# Module: base/Root/Module/ItemDefinition/rq

This file contains all the graphql functions that need to be used to request
and process an item definition, from the definition to how it must be queried

## Table of contents

### Functions

- [getRQDefinitionForItemDefinition](base_Root_Module_ItemDefinition_rq.md#getrqdefinitionforitemdefinition)
- [getRQDefinitionForItemDefinitionPolicies](base_Root_Module_ItemDefinition_rq.md#getrqdefinitionforitemdefinitionpolicies)
- [getRQSchemaForItemDefinition](base_Root_Module_ItemDefinition_rq.md#getrqschemaforitemdefinition)

## Functions

### getRQDefinitionForItemDefinition

▸ **getRQDefinitionForItemDefinition**(`itemDefinition`, `options`): [`RQField`](../interfaces/base_Root_rq.RQField.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) |
| `options` | `Object` |
| `options.excludeBase` | `boolean` |
| `options.includePolicy` | `string` \| `string`[] |
| `options.onlyTextFilters` | `boolean` |
| `options.optionalForm` | `boolean` |
| `options.retrievalMode` | `boolean` |

#### Returns

[`RQField`](../interfaces/base_Root_rq.RQField.md)

#### Defined in

[base/Root/Module/ItemDefinition/rq.ts:35](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/rq.ts#L35)

___

### getRQDefinitionForItemDefinitionPolicies

▸ **getRQDefinitionForItemDefinitionPolicies**(`idef`, `options`): [`RQField`](../interfaces/base_Root_rq.RQField.md)

Provides the fields that are required to include policy data for property
definitions

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `idef` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | - |
| `options` | `Object` | - |
| `options.policy` | `string` | the policy type that should be included, eg "edit", "delete", "read" and "parent" |

#### Returns

[`RQField`](../interfaces/base_Root_rq.RQField.md)

a partial graphql fields definition that only contains the policies

#### Defined in

[base/Root/Module/ItemDefinition/rq.ts:137](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/rq.ts#L137)

___

### getRQSchemaForItemDefinition

▸ **getRQSchemaForItemDefinition**(`idef`, `resolvers?`): [`RQRootSchema`](../interfaces/base_Root_rq.RQRootSchema.md)

Provides the fields definition for the module itself, and for all
items inside the module which extend these fields, modules by default
contain called base properties, which every element has

#### Parameters

| Name | Type |
| :------ | :------ |
| `idef` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) |
| `resolvers?` | [`IRQResolversType`](../interfaces/base_Root_rq.IRQResolversType.md) |

#### Returns

[`RQRootSchema`](../interfaces/base_Root_rq.RQRootSchema.md)

all the fields definition for the module

#### Defined in

[base/Root/Module/ItemDefinition/rq.ts:176](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/rq.ts#L176)
