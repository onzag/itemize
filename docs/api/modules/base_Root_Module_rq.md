[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/rq

# Module: base/Root/Module/rq

Contains all the RQ functions that are used and generated for and within
the module, refer to this file for the RQ generation side of things

## Table of contents

### Functions

- [getRQDefinitionForModule](base_Root_Module_rq.md#getrqdefinitionformodule)
- [getRQSchemaForModule](base_Root_Module_rq.md#getrqschemaformodule)

## Functions

### getRQDefinitionForModule

▸ **getRQDefinitionForModule**(`mod`, `options`): [`RQField`](../interfaces/base_Root_rq.RQField.md)

Provides the fields definition for the module itself, and for all
items inside the module which extend these fields, modules by default
contain called base properties, which every element has

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mod` | [`default`](../classes/base_Root_Module.default.md) | the module in question |
| `options` | `Object` | - |
| `options.excludeBase` | `boolean` | whether to exclude the base properties, like created_at, etc.. |
| `options.onlyTextFilters` | `boolean` | - |
| `options.optionalForm` | `boolean` | makes all the parameters optional, that is nullable |
| `options.retrievalMode` | `boolean` | whether it is in retrieval mode |

#### Returns

[`RQField`](../interfaces/base_Root_rq.RQField.md)

all the fields definition for the module

#### Defined in

[base/Root/Module/rq.ts:39](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/rq.ts#L39)

___

### getRQSchemaForModule

▸ **getRQSchemaForModule**(`mod`, `resolvers?`): [`RQRootSchema`](../interfaces/base_Root_rq.RQRootSchema.md)

Provides the fields definition for the module itself, and for all
items inside the module which extend these fields, modules by default
contain called base properties, which every element has

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mod` | [`default`](../classes/base_Root_Module.default.md) | the module in question |
| `resolvers?` | [`IRQResolversType`](../interfaces/base_Root_rq.IRQResolversType.md) | - |

#### Returns

[`RQRootSchema`](../interfaces/base_Root_rq.RQRootSchema.md)

all the fields definition for the module

#### Defined in

[base/Root/Module/rq.ts:111](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/rq.ts#L111)
