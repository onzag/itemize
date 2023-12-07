[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/resolvers/actions/edit

# Module: server/resolvers/actions/edit

## Table of contents

### Functions

- [editItemDefinition](server_resolvers_actions_edit.md#edititemdefinition)
- [editItemDefinitionFn](server_resolvers_actions_edit.md#edititemdefinitionfn)
- [editItemDefinitionFnRQ](server_resolvers_actions_edit.md#edititemdefinitionfnrq)

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

[server/resolvers/actions/edit.ts:39](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/actions/edit.ts#L39)

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

[server/resolvers/actions/edit.ts:679](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/actions/edit.ts#L679)

___

### editItemDefinitionFnRQ

▸ **editItemDefinitionFnRQ**(`appData`): [`FRQIdefResolverType`](base_Root_rq.md#frqidefresolvertype)

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |

#### Returns

[`FRQIdefResolverType`](base_Root_rq.md#frqidefresolvertype)

#### Defined in

[server/resolvers/actions/edit.ts:683](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/actions/edit.ts#L683)
