[](../README.md) / [Exports](../modules.md) / gql

# Module: gql

This file contains the root level graphql functions to be used in order to
build all the root level resolvers and all the containing modules, this file
exists out of consideration but contains mostly types and the combination
of functions

## Table of contents

### Interfaces

- [IGQLFieldsDefinitionType](../interfaces/gql.igqlfieldsdefinitiontype.md)
- [IGQLQueryFieldsDefinitionType](../interfaces/gql.igqlqueryfieldsdefinitiontype.md)
- [IGQLSingleFieldDefinitionType](../interfaces/gql.igqlsinglefielddefinitiontype.md)
- [IGQLSingleQueryFieldDefinitionType](../interfaces/gql.igqlsinglequeryfielddefinitiontype.md)
- [IGraphQLIdefResolverArgs](../interfaces/gql.igraphqlidefresolverargs.md)
- [IGraphQLResolversType](../interfaces/gql.igraphqlresolverstype.md)

### Type aliases

- [FGraphQLIdefResolverType](gql.md#fgraphqlidefresolvertype)
- [FGraphQLModResolverType](gql.md#fgraphqlmodresolvertype)

### Functions

- [getGQLSchemaForRoot](gql.md#getgqlschemaforroot)

## Type aliases

### FGraphQLIdefResolverType

Ƭ **FGraphQLIdefResolverType**: (`resolverArgs`: [*IGraphQLIdefResolverArgs*](../interfaces/gql.igraphqlidefresolverargs.md), `itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md)) => *any*

This is how a item definition resolver is supposed to
be defined

#### Type declaration:

▸ (`resolverArgs`: [*IGraphQLIdefResolverArgs*](../interfaces/gql.igraphqlidefresolverargs.md), `itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md)): *any*

#### Parameters:

Name | Type |
:------ | :------ |
`resolverArgs` | [*IGraphQLIdefResolverArgs*](../interfaces/gql.igraphqlidefresolverargs.md) |
`itemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) |

**Returns:** *any*

Defined in: [base/Root/gql.ts:31](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/gql.ts#L31)

___

### FGraphQLModResolverType

Ƭ **FGraphQLModResolverType**: (`resolverArgs`: [*IGraphQLIdefResolverArgs*](../interfaces/gql.igraphqlidefresolverargs.md), `module`: [*default*](../classes/base_root_module.default.md)) => *any*

This is how a module resolver is supposed to be defined

#### Type declaration:

▸ (`resolverArgs`: [*IGraphQLIdefResolverArgs*](../interfaces/gql.igraphqlidefresolverargs.md), `module`: [*default*](../classes/base_root_module.default.md)): *any*

#### Parameters:

Name | Type |
:------ | :------ |
`resolverArgs` | [*IGraphQLIdefResolverArgs*](../interfaces/gql.igraphqlidefresolverargs.md) |
`module` | [*default*](../classes/base_root_module.default.md) |

**Returns:** *any*

Defined in: [base/Root/gql.ts:39](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/gql.ts#L39)

## Functions

### getGQLSchemaForRoot

▸ **getGQLSchemaForRoot**(`root`: [*default*](../classes/root.default.md), `customQueries`: [*IGQLQueryFieldsDefinitionType*](../interfaces/gql.igqlqueryfieldsdefinitiontype.md), `customMutations`: [*IGQLQueryFieldsDefinitionType*](../interfaces/gql.igqlqueryfieldsdefinitiontype.md), `resolvers?`: [*IGraphQLResolversType*](../interfaces/gql.igraphqlresolverstype.md)): GraphQLSchema

Retrieves the whole structure of the current loaded instance
of the schema into a valid graphql schema

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`root` | [*default*](../classes/root.default.md) | the Root of he schema   |
`customQueries` | [*IGQLQueryFieldsDefinitionType*](../interfaces/gql.igqlqueryfieldsdefinitiontype.md) | custom queries that are added to the root query   |
`customMutations` | [*IGQLQueryFieldsDefinitionType*](../interfaces/gql.igqlqueryfieldsdefinitiontype.md) | custom mutations that are added to the root mutation   |
`resolvers?` | [*IGraphQLResolversType*](../interfaces/gql.igraphqlresolverstype.md) | the resolvers   |

**Returns:** GraphQLSchema

a graphql schema with all the resolvers applied

Defined in: [base/Root/gql.ts:101](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/gql.ts#L101)
