[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/resolvers/actions/add

# Module: server/resolvers/actions/add

This file contains the action for adding for every item definition that
is added

## Table of contents

### Functions

- [addItemDefinition](server_resolvers_actions_add.md#additemdefinition)
- [addItemDefinitionFnRQ](server_resolvers_actions_add.md#additemdefinitionfnrq)

## Functions

### addItemDefinition

▸ **addItemDefinition**(`appData`, `resolverItemDefinition`, `resolverArgs`): `Promise`\<\{ `DATA`: [`IRQValue`](../interfaces/rq_querier.IRQValue.md) = value }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |
| `resolverItemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) |
| `resolverArgs` | [`IRQResolverArgs`](../interfaces/base_Root_rq.IRQResolverArgs.md) |

#### Returns

`Promise`\<\{ `DATA`: [`IRQValue`](../interfaces/rq_querier.IRQValue.md) = value }\>

#### Defined in

[server/resolvers/actions/add.ts:49](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/actions/add.ts#L49)

___

### addItemDefinitionFnRQ

▸ **addItemDefinitionFnRQ**(`appData`): [`FRQIdefResolverType`](base_Root_rq.md#frqidefresolvertype)

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |

#### Returns

[`FRQIdefResolverType`](base_Root_rq.md#frqidefresolvertype)

#### Defined in

[server/resolvers/actions/add.ts:728](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/actions/add.ts#L728)
