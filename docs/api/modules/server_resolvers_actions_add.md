[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/resolvers/actions/add

# Module: server/resolvers/actions/add

This file contains the action for adding for every item definition that
is added

## Table of contents

### Functions

- [addItemDefinition](server_resolvers_actions_add.md#additemdefinition)
- [addItemDefinitionFn](server_resolvers_actions_add.md#additemdefinitionfn)

## Functions

### addItemDefinition

▸ **addItemDefinition**(`appData`, `resolverArgs`, `resolverItemDefinition`): `Promise`<{ `DATA`: [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md) = gqlValue }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |
| `resolverArgs` | [`IGraphQLIdefResolverArgs`](../interfaces/base_Root_gql.IGraphQLIdefResolverArgs.md) |
| `resolverItemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) |

#### Returns

`Promise`<{ `DATA`: [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md) = gqlValue }\>

#### Defined in

[server/resolvers/actions/add.ts:49](https://github.com/onzag/itemize/blob/f2f29986/server/resolvers/actions/add.ts#L49)

___

### addItemDefinitionFn

▸ **addItemDefinitionFn**(`appData`): [`FGraphQLIdefResolverType`](base_Root_gql.md#fgraphqlidefresolvertype)

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |

#### Returns

[`FGraphQLIdefResolverType`](base_Root_gql.md#fgraphqlidefresolvertype)

#### Defined in

[server/resolvers/actions/add.ts:635](https://github.com/onzag/itemize/blob/f2f29986/server/resolvers/actions/add.ts#L635)
