[](../README.md) / [Exports](../modules.md) / base/Root/gql

# Module: base/Root/gql

This file contains the root level graphql functions to be used in order to
build all the root level resolvers and all the containing modules, this file
exists out of consideration but contains mostly types and the combination
of functions

## Table of contents

### Interfaces

- [IGQLFieldsDefinitionType](../interfaces/base_root_gql.igqlfieldsdefinitiontype.md)
- [IGQLQueryFieldsDefinitionType](../interfaces/base_root_gql.igqlqueryfieldsdefinitiontype.md)
- [IGQLSingleFieldDefinitionType](../interfaces/base_root_gql.igqlsinglefielddefinitiontype.md)
- [IGQLSingleQueryFieldDefinitionType](../interfaces/base_root_gql.igqlsinglequeryfielddefinitiontype.md)
- [IGraphQLIdefResolverArgs](../interfaces/base_root_gql.igraphqlidefresolverargs.md)
- [IGraphQLResolversType](../interfaces/base_root_gql.igraphqlresolverstype.md)

### Type aliases

- [FGraphQLIdefResolverType](base_root_gql.md#fgraphqlidefresolvertype)
- [FGraphQLModResolverType](base_root_gql.md#fgraphqlmodresolvertype)

### Functions

- [getGQLSchemaForRoot](base_root_gql.md#getgqlschemaforroot)

## Type aliases

### FGraphQLIdefResolverType

Ƭ **FGraphQLIdefResolverType**: (`resolverArgs`: [*IGraphQLIdefResolverArgs*](../interfaces/base_root_gql.igraphqlidefresolverargs.md), `itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md)) => *any*

This is how a item definition resolver is supposed to
be defined

#### Type declaration:

▸ (`resolverArgs`: [*IGraphQLIdefResolverArgs*](../interfaces/base_root_gql.igraphqlidefresolverargs.md), `itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md)): *any*

#### Parameters:

Name | Type |
:------ | :------ |
`resolverArgs` | [*IGraphQLIdefResolverArgs*](../interfaces/base_root_gql.igraphqlidefresolverargs.md) |
`itemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) |

**Returns:** *any*

Defined in: [base/Root/gql.ts:31](https://github.com/onzag/itemize/blob/28218320/base/Root/gql.ts#L31)

___

### FGraphQLModResolverType

Ƭ **FGraphQLModResolverType**: (`resolverArgs`: [*IGraphQLIdefResolverArgs*](../interfaces/base_root_gql.igraphqlidefresolverargs.md), `module`: [*default*](../classes/base_root_module.default.md)) => *any*

This is how a module resolver is supposed to be defined

#### Type declaration:

▸ (`resolverArgs`: [*IGraphQLIdefResolverArgs*](../interfaces/base_root_gql.igraphqlidefresolverargs.md), `module`: [*default*](../classes/base_root_module.default.md)): *any*

#### Parameters:

Name | Type |
:------ | :------ |
`resolverArgs` | [*IGraphQLIdefResolverArgs*](../interfaces/base_root_gql.igraphqlidefresolverargs.md) |
`module` | [*default*](../classes/base_root_module.default.md) |

**Returns:** *any*

Defined in: [base/Root/gql.ts:39](https://github.com/onzag/itemize/blob/28218320/base/Root/gql.ts#L39)

## Functions

### getGQLSchemaForRoot

▸ **getGQLSchemaForRoot**(`root`: [*default*](../classes/base_root.default.md), `customQueries`: [*IGQLQueryFieldsDefinitionType*](../interfaces/base_root_gql.igqlqueryfieldsdefinitiontype.md), `customMutations`: [*IGQLQueryFieldsDefinitionType*](../interfaces/base_root_gql.igqlqueryfieldsdefinitiontype.md), `resolvers?`: [*IGraphQLResolversType*](../interfaces/base_root_gql.igraphqlresolverstype.md)): GraphQLSchema

Retrieves the whole structure of the current loaded instance
of the schema into a valid graphql schema

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`root` | [*default*](../classes/base_root.default.md) | the Root of he schema   |
`customQueries` | [*IGQLQueryFieldsDefinitionType*](../interfaces/base_root_gql.igqlqueryfieldsdefinitiontype.md) | custom queries that are added to the root query   |
`customMutations` | [*IGQLQueryFieldsDefinitionType*](../interfaces/base_root_gql.igqlqueryfieldsdefinitiontype.md) | custom mutations that are added to the root mutation   |
`resolvers?` | [*IGraphQLResolversType*](../interfaces/base_root_gql.igraphqlresolverstype.md) | the resolvers   |

**Returns:** GraphQLSchema

a graphql schema with all the resolvers applied

Defined in: [base/Root/gql.ts:101](https://github.com/onzag/itemize/blob/28218320/base/Root/gql.ts#L101)
