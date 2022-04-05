[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/gql

# Module: base/Root/gql

This file contains the root level graphql functions to be used in order to
build all the root level resolvers and all the containing modules, this file
exists out of consideration but contains mostly types and the combination
of functions

## Table of contents

### Interfaces

- [IGQLFieldsDefinitionType](../interfaces/base_Root_gql.IGQLFieldsDefinitionType.md)
- [IGQLQueryFieldsDefinitionType](../interfaces/base_Root_gql.IGQLQueryFieldsDefinitionType.md)
- [IGQLSingleFieldDefinitionType](../interfaces/base_Root_gql.IGQLSingleFieldDefinitionType.md)
- [IGQLSingleQueryFieldDefinitionType](../interfaces/base_Root_gql.IGQLSingleQueryFieldDefinitionType.md)
- [IGraphQLIdefResolverArgs](../interfaces/base_Root_gql.IGraphQLIdefResolverArgs.md)
- [IGraphQLResolversType](../interfaces/base_Root_gql.IGraphQLResolversType.md)

### Type aliases

- [FGraphQLIdefResolverType](base_Root_gql.md#fgraphqlidefresolvertype)
- [FGraphQLModResolverType](base_Root_gql.md#fgraphqlmodresolvertype)

### Functions

- [getGQLSchemaForRoot](base_Root_gql.md#getgqlschemaforroot)

## Type aliases

### FGraphQLIdefResolverType

Ƭ **FGraphQLIdefResolverType**: (`resolverArgs`: [`IGraphQLIdefResolverArgs`](../interfaces/base_Root_gql.IGraphQLIdefResolverArgs.md), `itemDefinition`: [`default`](../classes/base_Root_Module_ItemDefinition.default.md)) => `any`

#### Type declaration

▸ (`resolverArgs`, `itemDefinition`): `any`

This is how a item definition resolver is supposed to
be defined

##### Parameters

| Name | Type |
| :------ | :------ |
| `resolverArgs` | [`IGraphQLIdefResolverArgs`](../interfaces/base_Root_gql.IGraphQLIdefResolverArgs.md) |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) |

##### Returns

`any`

#### Defined in

[base/Root/gql.ts:31](https://github.com/onzag/itemize/blob/f2f29986/base/Root/gql.ts#L31)

___

### FGraphQLModResolverType

Ƭ **FGraphQLModResolverType**: (`resolverArgs`: [`IGraphQLIdefResolverArgs`](../interfaces/base_Root_gql.IGraphQLIdefResolverArgs.md), `module`: [`default`](../classes/base_Root_Module.default.md)) => `any`

#### Type declaration

▸ (`resolverArgs`, `module`): `any`

This is how a module resolver is supposed to be defined

##### Parameters

| Name | Type |
| :------ | :------ |
| `resolverArgs` | [`IGraphQLIdefResolverArgs`](../interfaces/base_Root_gql.IGraphQLIdefResolverArgs.md) |
| `module` | [`default`](../classes/base_Root_Module.default.md) |

##### Returns

`any`

#### Defined in

[base/Root/gql.ts:39](https://github.com/onzag/itemize/blob/f2f29986/base/Root/gql.ts#L39)

## Functions

### getGQLSchemaForRoot

▸ **getGQLSchemaForRoot**(`root`, `customQueries`, `customMutations`, `resolvers?`): `GraphQLSchema`

Retrieves the whole structure of the current loaded instance
of the schema into a valid graphql schema

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `root` | [`default`](../classes/base_Root.default.md) | the Root of he schema |
| `customQueries` | [`IGQLQueryFieldsDefinitionType`](../interfaces/base_Root_gql.IGQLQueryFieldsDefinitionType.md) | custom queries that are added to the root query |
| `customMutations` | [`IGQLQueryFieldsDefinitionType`](../interfaces/base_Root_gql.IGQLQueryFieldsDefinitionType.md) | custom mutations that are added to the root mutation |
| `resolvers?` | [`IGraphQLResolversType`](../interfaces/base_Root_gql.IGraphQLResolversType.md) | the resolvers |

#### Returns

`GraphQLSchema`

a graphql schema with all the resolvers applied

#### Defined in

[base/Root/gql.ts:101](https://github.com/onzag/itemize/blob/f2f29986/base/Root/gql.ts#L101)
