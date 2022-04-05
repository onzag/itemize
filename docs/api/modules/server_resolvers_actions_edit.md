[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/resolvers/actions/edit

# Module: server/resolvers/actions/edit

## Table of contents

### Functions

- [editItemDefinition](server_resolvers_actions_edit.md#edititemdefinition)
- [editItemDefinitionFn](server_resolvers_actions_edit.md#edititemdefinitionfn)

## Functions

### editItemDefinition

▸ **editItemDefinition**(`appData`, `resolverArgs`, `resolverItemDefinition`): `Promise`<{ `DATA`: [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md) = gqlValue }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |
| `resolverArgs` | [`IGraphQLIdefResolverArgs`](../interfaces/base_Root_gql.IGraphQLIdefResolverArgs.md) |
| `resolverItemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) |

#### Returns

`Promise`<{ `DATA`: [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md) = gqlValue }\>

#### Defined in

[server/resolvers/actions/edit.ts:41](https://github.com/onzag/itemize/blob/5c2808d3/server/resolvers/actions/edit.ts#L41)

___

### editItemDefinitionFn

▸ **editItemDefinitionFn**(`appData`): [`FGraphQLIdefResolverType`](base_Root_gql.md#fgraphqlidefresolvertype)

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |

#### Returns

[`FGraphQLIdefResolverType`](base_Root_gql.md#fgraphqlidefresolvertype)

#### Defined in

[server/resolvers/actions/edit.ts:558](https://github.com/onzag/itemize/blob/5c2808d3/server/resolvers/actions/edit.ts#L558)
