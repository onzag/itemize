[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/resolvers/actions/delete

# Module: server/resolvers/actions/delete

## Table of contents

### Functions

- [deleteItemDefinition](server_resolvers_actions_delete.md#deleteitemdefinition)
- [deleteItemDefinitionFn](server_resolvers_actions_delete.md#deleteitemdefinitionfn)
- [deleteItemDefinitionFnRQ](server_resolvers_actions_delete.md#deleteitemdefinitionfnrq)

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

[server/resolvers/actions/delete.ts:30](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/actions/delete.ts#L30)

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

[server/resolvers/actions/delete.ts:413](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/actions/delete.ts#L413)

___

### deleteItemDefinitionFnRQ

▸ **deleteItemDefinitionFnRQ**(`appData`): [`FRQIdefResolverType`](base_Root_rq.md#frqidefresolvertype)

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |

#### Returns

[`FRQIdefResolverType`](base_Root_rq.md#frqidefresolvertype)

#### Defined in

[server/resolvers/actions/delete.ts:417](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/actions/delete.ts#L417)
