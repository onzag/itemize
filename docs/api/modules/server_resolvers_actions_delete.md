[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/resolvers/actions/delete

# Module: server/resolvers/actions/delete

## Table of contents

### Functions

- [deleteItemDefinition](server_resolvers_actions_delete.md#deleteitemdefinition)
- [deleteItemDefinitionFn](server_resolvers_actions_delete.md#deleteitemdefinitionfn)

## Functions

### deleteItemDefinition

▸ **deleteItemDefinition**(`appData`, `resolverArgs`, `itemDefinition`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |
| `resolverArgs` | [`IGraphQLIdefResolverArgs`](../interfaces/base_Root_gql.IGraphQLIdefResolverArgs.md) |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

[server/resolvers/actions/delete.ts:29](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/actions/delete.ts#L29)

___

### deleteItemDefinitionFn

▸ **deleteItemDefinitionFn**(`appData`): [`FGraphQLIdefResolverType`](base_Root_gql.md#fgraphqlidefresolvertype)

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |

#### Returns

[`FGraphQLIdefResolverType`](base_Root_gql.md#fgraphqlidefresolvertype)

#### Defined in

[server/resolvers/actions/delete.ts:359](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/actions/delete.ts#L359)
