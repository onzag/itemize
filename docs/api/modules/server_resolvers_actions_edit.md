[](../README.md) / [Exports](../modules.md) / server/resolvers/actions/edit

# Module: server/resolvers/actions/edit

## Table of contents

### Functions

- [editItemDefinition](server_resolvers_actions_edit.md#edititemdefinition)
- [editItemDefinitionFn](server_resolvers_actions_edit.md#edititemdefinitionfn)

## Functions

### editItemDefinition

▸ **editItemDefinition**(`appData`: [*IAppDataType*](../interfaces/server.iappdatatype.md), `resolverArgs`: [*IGraphQLIdefResolverArgs*](../interfaces/base_root_gql.igraphqlidefresolverargs.md), `resolverItemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md)): *Promise*<{ `DATA`: [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md)  }\>

#### Parameters:

Name | Type |
:------ | :------ |
`appData` | [*IAppDataType*](../interfaces/server.iappdatatype.md) |
`resolverArgs` | [*IGraphQLIdefResolverArgs*](../interfaces/base_root_gql.igraphqlidefresolverargs.md) |
`resolverItemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) |

**Returns:** *Promise*<{ `DATA`: [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md)  }\>

Defined in: [server/resolvers/actions/edit.ts:40](https://github.com/onzag/itemize/blob/11a98dec/server/resolvers/actions/edit.ts#L40)

___

### editItemDefinitionFn

▸ **editItemDefinitionFn**(`appData`: [*IAppDataType*](../interfaces/server.iappdatatype.md)): [*FGraphQLIdefResolverType*](base_root_gql.md#fgraphqlidefresolvertype)

#### Parameters:

Name | Type |
:------ | :------ |
`appData` | [*IAppDataType*](../interfaces/server.iappdatatype.md) |

**Returns:** [*FGraphQLIdefResolverType*](base_root_gql.md#fgraphqlidefresolvertype)

Defined in: [server/resolvers/actions/edit.ts:450](https://github.com/onzag/itemize/blob/11a98dec/server/resolvers/actions/edit.ts#L450)
