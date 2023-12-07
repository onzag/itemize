[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/rq

# Module: base/Root/rq

This file contains the root level RQ functions to be used in order to
build all the root level resolvers and all the containing modules, this file
exists out of consideration but contains mostly types and the combination
of functions

## Table of contents

### Interfaces

- [IRQIdefResolverArgs](../interfaces/base_Root_rq.IRQIdefResolverArgs.md)
- [IRQResolversType](../interfaces/base_Root_rq.IRQResolversType.md)
- [RQArg](../interfaces/base_Root_rq.RQArg.md)
- [RQField](../interfaces/base_Root_rq.RQField.md)
- [RQQuery](../interfaces/base_Root_rq.RQQuery.md)
- [RQRootSchema](../interfaces/base_Root_rq.RQRootSchema.md)

### Type aliases

- [FRQIdefResolverType](base_Root_rq.md#frqidefresolvertype)
- [FRQModResolverType](base_Root_rq.md#frqmodresolvertype)

### Functions

- [getRQSchemaForRoot](base_Root_rq.md#getrqschemaforroot)
- [rqFieldsToRqArgs](base_Root_rq.md#rqfieldstorqargs)

## Type aliases

### FRQIdefResolverType

Ƭ **FRQIdefResolverType**: (`resolverArgs`: [`IRQIdefResolverArgs`](../interfaces/base_Root_rq.IRQIdefResolverArgs.md), `itemDefinition`: [`default`](../classes/base_Root_Module_ItemDefinition.default.md)) => `any`

#### Type declaration

▸ (`resolverArgs`, `itemDefinition`): `any`

This is how a item definition resolver is supposed to
be defined

##### Parameters

| Name | Type |
| :------ | :------ |
| `resolverArgs` | [`IRQIdefResolverArgs`](../interfaces/base_Root_rq.IRQIdefResolverArgs.md) |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) |

##### Returns

`any`

#### Defined in

[base/Root/rq.ts:96](https://github.com/onzag/itemize/blob/a24376ed/base/Root/rq.ts#L96)

___

### FRQModResolverType

Ƭ **FRQModResolverType**: (`resolverArgs`: [`IRQIdefResolverArgs`](../interfaces/base_Root_rq.IRQIdefResolverArgs.md), `module`: [`default`](../classes/base_Root_Module.default.md)) => `any`

#### Type declaration

▸ (`resolverArgs`, `module`): `any`

This is how a module resolver is supposed to be defined

##### Parameters

| Name | Type |
| :------ | :------ |
| `resolverArgs` | [`IRQIdefResolverArgs`](../interfaces/base_Root_rq.IRQIdefResolverArgs.md) |
| `module` | [`default`](../classes/base_Root_Module.default.md) |

##### Returns

`any`

#### Defined in

[base/Root/rq.ts:104](https://github.com/onzag/itemize/blob/a24376ed/base/Root/rq.ts#L104)

## Functions

### getRQSchemaForRoot

▸ **getRQSchemaForRoot**(`root`, `resolvers?`): [`RQRootSchema`](../interfaces/base_Root_rq.RQRootSchema.md)

Retrieves the whole structure of the current loaded instance
of the schema into a valid RQ schema

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `root` | [`default`](../classes/base_Root.default.md) | the Root of he schema |
| `resolvers?` | [`IRQResolversType`](../interfaces/base_Root_rq.IRQResolversType.md) | the resolvers |

#### Returns

[`RQRootSchema`](../interfaces/base_Root_rq.RQRootSchema.md)

a RQ schema with all the resolvers applied

#### Defined in

[base/Root/rq.ts:132](https://github.com/onzag/itemize/blob/a24376ed/base/Root/rq.ts#L132)

___

### rqFieldsToRqArgs

▸ **rqFieldsToRqArgs**(`field`): [`RQArg`](../interfaces/base_Root_rq.RQArg.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `field` | [`RQField`](../interfaces/base_Root_rq.RQField.md) |

#### Returns

[`RQArg`](../interfaces/base_Root_rq.RQArg.md)

#### Defined in

[base/Root/rq.ts:155](https://github.com/onzag/itemize/blob/a24376ed/base/Root/rq.ts#L155)
