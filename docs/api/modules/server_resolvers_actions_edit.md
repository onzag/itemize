[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/resolvers/actions/edit

# Module: server/resolvers/actions/edit

## Table of contents

### Functions

- [editItemDefinition](server_resolvers_actions_edit.md#edititemdefinition)
- [editItemDefinitionFnRQ](server_resolvers_actions_edit.md#edititemdefinitionfnrq)

## Functions

### editItemDefinition

▸ **editItemDefinition**(`appData`, `resolverItemDefinition`, `resolverArgs`): `Promise`\<\{ `DATA`: [`IRQValue`](../interfaces/rq_querier.IRQValue.md) = value }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |
| `resolverItemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) |
| `resolverArgs` | [`IRQResolverArgs`](../interfaces/base_Root_rq.IRQResolverArgs.md) |

#### Returns

`Promise`\<\{ `DATA`: [`IRQValue`](../interfaces/rq_querier.IRQValue.md) = value }\>

#### Defined in

[server/resolvers/actions/edit.ts:39](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/actions/edit.ts#L39)

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

[server/resolvers/actions/edit.ts:676](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/actions/edit.ts#L676)
