[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/resolvers/triggers

# Module: server/resolvers/triggers

## Table of contents

### Enumerations

- [IOTriggerActions](../enums/server_resolvers_triggers.IOTriggerActions.md)

### Interfaces

- [IBaseTriggerRegistry](../interfaces/server_resolvers_triggers.IBaseTriggerRegistry.md)
- [IOTriggerArgType](../interfaces/server_resolvers_triggers.IOTriggerArgType.md)
- [ISearchTriggerArgType](../interfaces/server_resolvers_triggers.ISearchTriggerArgType.md)
- [ITriggerRegistry](../interfaces/server_resolvers_triggers.ITriggerRegistry.md)

### Type aliases

- [IOTriggerType](server_resolvers_triggers.md#iotriggertype)
- [SearchTriggerType](server_resolvers_triggers.md#searchtriggertype)

### Functions

- [mergeTriggerRegistries](server_resolvers_triggers.md#mergetriggerregistries)

## Type aliases

### IOTriggerType

Ƭ **IOTriggerType**: (`arg`: [`IOTriggerArgType`](../interfaces/server_resolvers_triggers.IOTriggerArgType.md)) => [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md) \| `Promise`<[`IGQLValue`](../interfaces/gql_querier.IGQLValue.md)\> \| [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) \| `Promise`<[`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md)\>

#### Type declaration

▸ (`arg`): [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md) \| `Promise`<[`IGQLValue`](../interfaces/gql_querier.IGQLValue.md)\> \| [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) \| `Promise`<[`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`IOTriggerArgType`](../interfaces/server_resolvers_triggers.IOTriggerArgType.md) |

##### Returns

[`IGQLValue`](../interfaces/gql_querier.IGQLValue.md) \| `Promise`<[`IGQLValue`](../interfaces/gql_querier.IGQLValue.md)\> \| [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) \| `Promise`<[`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md)\>

#### Defined in

[server/resolvers/triggers.ts:165](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/triggers.ts#L165)

___

### SearchTriggerType

Ƭ **SearchTriggerType**: (`arg`: [`ISearchTriggerArgType`](../interfaces/server_resolvers_triggers.ISearchTriggerArgType.md)) => `void` \| `Promise`<`void`\>

#### Type declaration

▸ (`arg`): `void` \| `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISearchTriggerArgType`](../interfaces/server_resolvers_triggers.ISearchTriggerArgType.md) |

##### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[server/resolvers/triggers.ts:166](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/triggers.ts#L166)

## Functions

### mergeTriggerRegistries

▸ **mergeTriggerRegistries**(...`triggers`): [`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `...triggers` | [`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md)[] |

#### Returns

[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md)

#### Defined in

[server/resolvers/triggers.ts:247](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/triggers.ts#L247)
