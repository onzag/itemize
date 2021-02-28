[](../README.md) / [Exports](../modules.md) / server/resolvers/actions/add

# Module: server/resolvers/actions/add

This file contains the action for adding for every item definition that
is added

## Table of contents

### Functions

- [addItemDefinition](server_resolvers_actions_add.md#additemdefinition)
- [addItemDefinitionFn](server_resolvers_actions_add.md#additemdefinitionfn)

## Functions

### addItemDefinition

▸ **addItemDefinition**(`appData`: [*IAppDataType*](../interfaces/server.iappdatatype.md), `resolverArgs`: [*IGraphQLIdefResolverArgs*](../interfaces/base_root_gql.igraphqlidefresolverargs.md), `resolverItemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md)): *Promise*<{ `DATA`: [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md)  }\>

#### Parameters:

Name | Type |
:------ | :------ |
`appData` | [*IAppDataType*](../interfaces/server.iappdatatype.md) |
`resolverArgs` | [*IGraphQLIdefResolverArgs*](../interfaces/base_root_gql.igraphqlidefresolverargs.md) |
`resolverItemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) |

**Returns:** *Promise*<{ `DATA`: [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md)  }\>

Defined in: [server/resolvers/actions/add.ts:48](https://github.com/onzag/itemize/blob/11a98dec/server/resolvers/actions/add.ts#L48)

___

### addItemDefinitionFn

▸ **addItemDefinitionFn**(`appData`: [*IAppDataType*](../interfaces/server.iappdatatype.md)): [*FGraphQLIdefResolverType*](base_root_gql.md#fgraphqlidefresolvertype)

#### Parameters:

Name | Type |
:------ | :------ |
`appData` | [*IAppDataType*](../interfaces/server.iappdatatype.md) |

**Returns:** [*FGraphQLIdefResolverType*](base_root_gql.md#fgraphqlidefresolvertype)

Defined in: [server/resolvers/actions/add.ts:548](https://github.com/onzag/itemize/blob/11a98dec/server/resolvers/actions/add.ts#L548)
