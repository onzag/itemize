[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/rq

# Module: base/Root/rq

This file contains the root level RQ functions to be used in order to
build all the root level resolvers and all the containing modules, this file
exists out of consideration but contains mostly types and the combination
of functions

## Table of contents

### Interfaces

- [IRQResolverArgs](../interfaces/base_Root_rq.IRQResolverArgs.md)
- [IRQResolversType](../interfaces/base_Root_rq.IRQResolversType.md)
- [RQArg](../interfaces/base_Root_rq.RQArg.md)
- [RQField](../interfaces/base_Root_rq.RQField.md)
- [RQQuery](../interfaces/base_Root_rq.RQQuery.md)
- [RQRootSchema](../interfaces/base_Root_rq.RQRootSchema.md)

### Type Aliases

- [FQGenericResolverType](base_Root_rq.md#fqgenericresolvertype)
- [FRQIdefResolverType](base_Root_rq.md#frqidefresolvertype)
- [FRQModResolverType](base_Root_rq.md#frqmodresolvertype)

### Functions

- [getRQSchemaForRoot](base_Root_rq.md#getrqschemaforroot)
- [rqFieldsToRqArgs](base_Root_rq.md#rqfieldstorqargs)

## Type Aliases

### FQGenericResolverType

Ƭ **FQGenericResolverType**: (`resolverArgs`: [`IRQResolverArgs`](../interfaces/base_Root_rq.IRQResolverArgs.md)) => `Promise`\<[`IRQValue`](../interfaces/rq_querier.IRQValue.md)\>

#### Type declaration

▸ (`resolverArgs`): `Promise`\<[`IRQValue`](../interfaces/rq_querier.IRQValue.md)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `resolverArgs` | [`IRQResolverArgs`](../interfaces/base_Root_rq.IRQResolverArgs.md) |

##### Returns

`Promise`\<[`IRQValue`](../interfaces/rq_querier.IRQValue.md)\>

#### Defined in

[base/Root/rq.ts:76](https://github.com/onzag/itemize/blob/59702dd5/base/Root/rq.ts#L76)

___

### FRQIdefResolverType

Ƭ **FRQIdefResolverType**: (`itemDefinition`: [`default`](../classes/base_Root_Module_ItemDefinition.default.md), `resolverArgs`: [`IRQResolverArgs`](../interfaces/base_Root_rq.IRQResolverArgs.md)) => `Promise`\<[`IRQValue`](../interfaces/rq_querier.IRQValue.md)\>

#### Type declaration

▸ (`itemDefinition`, `resolverArgs`): `Promise`\<[`IRQValue`](../interfaces/rq_querier.IRQValue.md)\>

This is how a item definition resolver is supposed to
be defined

##### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) |
| `resolverArgs` | [`IRQResolverArgs`](../interfaces/base_Root_rq.IRQResolverArgs.md) |

##### Returns

`Promise`\<[`IRQValue`](../interfaces/rq_querier.IRQValue.md)\>

#### Defined in

[base/Root/rq.ts:84](https://github.com/onzag/itemize/blob/59702dd5/base/Root/rq.ts#L84)

___

### FRQModResolverType

Ƭ **FRQModResolverType**: (`module`: [`default`](../classes/base_Root_Module.default.md), `resolverArgs`: [`IRQResolverArgs`](../interfaces/base_Root_rq.IRQResolverArgs.md)) => `Promise`\<[`IRQValue`](../interfaces/rq_querier.IRQValue.md)\>

#### Type declaration

▸ (`module`, `resolverArgs`): `Promise`\<[`IRQValue`](../interfaces/rq_querier.IRQValue.md)\>

This is how a module resolver is supposed to be defined

##### Parameters

| Name | Type |
| :------ | :------ |
| `module` | [`default`](../classes/base_Root_Module.default.md) |
| `resolverArgs` | [`IRQResolverArgs`](../interfaces/base_Root_rq.IRQResolverArgs.md) |

##### Returns

`Promise`\<[`IRQValue`](../interfaces/rq_querier.IRQValue.md)\>

#### Defined in

[base/Root/rq.ts:92](https://github.com/onzag/itemize/blob/59702dd5/base/Root/rq.ts#L92)

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

[base/Root/rq.ts:120](https://github.com/onzag/itemize/blob/59702dd5/base/Root/rq.ts#L120)

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

[base/Root/rq.ts:143](https://github.com/onzag/itemize/blob/59702dd5/base/Root/rq.ts#L143)
