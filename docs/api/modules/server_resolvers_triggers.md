[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/resolvers/triggers

# Module: server/resolvers/triggers

## Table of contents

### Enumerations

- [IOTriggerActions](../enums/server_resolvers_triggers.IOTriggerActions.md)
- [SearchTriggerActions](../enums/server_resolvers_triggers.SearchTriggerActions.md)

### Interfaces

- [IBaseTriggerRegistry](../interfaces/server_resolvers_triggers.IBaseTriggerRegistry.md)
- [IOConflictTriggerArgType](../interfaces/server_resolvers_triggers.IOConflictTriggerArgType.md)
- [IOTriggerArgType](../interfaces/server_resolvers_triggers.IOTriggerArgType.md)
- [ISearchTriggerArgType](../interfaces/server_resolvers_triggers.ISearchTriggerArgType.md)
- [ITriggerRegistry](../interfaces/server_resolvers_triggers.ITriggerRegistry.md)

### Type Aliases

- [IOConflictTriggerType](server_resolvers_triggers.md#ioconflicttriggertype)
- [IOTriggerType](server_resolvers_triggers.md#iotriggertype)
- [SearchTriggerType](server_resolvers_triggers.md#searchtriggertype)

### Functions

- [mergeTriggerRegistries](server_resolvers_triggers.md#mergetriggerregistries)

## Type Aliases

### IOConflictTriggerType

Ƭ **IOConflictTriggerType**: (`arg`: [`IOConflictTriggerArgType`](../interfaces/server_resolvers_triggers.IOConflictTriggerArgType.md)) => `void` \| `boolean` \| `Promise`\<`void` \| `boolean`\>

#### Type declaration

▸ (`arg`): `void` \| `boolean` \| `Promise`\<`void` \| `boolean`\>

return true to overwrite
false to throw the error

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`IOConflictTriggerArgType`](../interfaces/server_resolvers_triggers.IOConflictTriggerArgType.md) |

##### Returns

`void` \| `boolean` \| `Promise`\<`void` \| `boolean`\>

#### Defined in

[server/resolvers/triggers.ts:211](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/triggers.ts#L211)

___

### IOTriggerType

Ƭ **IOTriggerType**: (`arg`: [`IOTriggerArgType`](../interfaces/server_resolvers_triggers.IOTriggerArgType.md)) => [`IRQValue`](../interfaces/rq_querier.IRQValue.md) \| `Promise`\<[`IRQValue`](../interfaces/rq_querier.IRQValue.md)\> \| [`IRQArgs`](../interfaces/rq_querier.IRQArgs.md) \| `Promise`\<[`IRQArgs`](../interfaces/rq_querier.IRQArgs.md)\>

#### Type declaration

▸ (`arg`): [`IRQValue`](../interfaces/rq_querier.IRQValue.md) \| `Promise`\<[`IRQValue`](../interfaces/rq_querier.IRQValue.md)\> \| [`IRQArgs`](../interfaces/rq_querier.IRQArgs.md) \| `Promise`\<[`IRQArgs`](../interfaces/rq_querier.IRQArgs.md)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`IOTriggerArgType`](../interfaces/server_resolvers_triggers.IOTriggerArgType.md) |

##### Returns

[`IRQValue`](../interfaces/rq_querier.IRQValue.md) \| `Promise`\<[`IRQValue`](../interfaces/rq_querier.IRQValue.md)\> \| [`IRQArgs`](../interfaces/rq_querier.IRQArgs.md) \| `Promise`\<[`IRQArgs`](../interfaces/rq_querier.IRQArgs.md)\>

#### Defined in

[server/resolvers/triggers.ts:204](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/triggers.ts#L204)

___

### SearchTriggerType

Ƭ **SearchTriggerType**: (`arg`: [`ISearchTriggerArgType`](../interfaces/server_resolvers_triggers.ISearchTriggerArgType.md)) => `void` \| `Promise`\<`void`\>

#### Type declaration

▸ (`arg`): `void` \| `Promise`\<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISearchTriggerArgType`](../interfaces/server_resolvers_triggers.ISearchTriggerArgType.md) |

##### Returns

`void` \| `Promise`\<`void`\>

#### Defined in

[server/resolvers/triggers.ts:205](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/triggers.ts#L205)

## Functions

### mergeTriggerRegistries

▸ **mergeTriggerRegistries**(`...triggers`): [`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `...triggers` | [`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md)[] |

#### Returns

[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md)

#### Defined in

[server/resolvers/triggers.ts:315](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/triggers.ts#L315)
