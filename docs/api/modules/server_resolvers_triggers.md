[](../README.md) / [Exports](../modules.md) / server/resolvers/triggers

# Module: server/resolvers/triggers

## Table of contents

### Enumerations

- [IOTriggerActions](../enums/server_resolvers_triggers.iotriggeractions.md)

### Interfaces

- [IBaseTriggerRegistry](../interfaces/server_resolvers_triggers.ibasetriggerregistry.md)
- [IOTriggerArgType](../interfaces/server_resolvers_triggers.iotriggerargtype.md)
- [ISearchTriggerArgType](../interfaces/server_resolvers_triggers.isearchtriggerargtype.md)
- [ITriggerRegistry](../interfaces/server_resolvers_triggers.itriggerregistry.md)

### Type aliases

- [IOTriggerType](server_resolvers_triggers.md#iotriggertype)
- [SearchTriggerType](server_resolvers_triggers.md#searchtriggertype)

### Functions

- [mergeTriggerRegistries](server_resolvers_triggers.md#mergetriggerregistries)

## Type aliases

### IOTriggerType

Ƭ **IOTriggerType**: (`arg`: [*IOTriggerArgType*](../interfaces/server_resolvers_triggers.iotriggerargtype.md)) => [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md) \| *Promise*<[*IGQLValue*](../interfaces/gql_querier.igqlvalue.md)\>

#### Type declaration:

▸ (`arg`: [*IOTriggerArgType*](../interfaces/server_resolvers_triggers.iotriggerargtype.md)): [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md) \| *Promise*<[*IGQLValue*](../interfaces/gql_querier.igqlvalue.md)\>

#### Parameters:

Name | Type |
:------ | :------ |
`arg` | [*IOTriggerArgType*](../interfaces/server_resolvers_triggers.iotriggerargtype.md) |

**Returns:** [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md) \| *Promise*<[*IGQLValue*](../interfaces/gql_querier.igqlvalue.md)\>

Defined in: [server/resolvers/triggers.ts:90](https://github.com/onzag/itemize/blob/11a98dec/server/resolvers/triggers.ts#L90)

___

### SearchTriggerType

Ƭ **SearchTriggerType**: (`arg`: [*ISearchTriggerArgType*](../interfaces/server_resolvers_triggers.isearchtriggerargtype.md)) => *void* \| *Promise*<void\>

#### Type declaration:

▸ (`arg`: [*ISearchTriggerArgType*](../interfaces/server_resolvers_triggers.isearchtriggerargtype.md)): *void* \| *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`arg` | [*ISearchTriggerArgType*](../interfaces/server_resolvers_triggers.isearchtriggerargtype.md) |

**Returns:** *void* \| *Promise*<void\>

Defined in: [server/resolvers/triggers.ts:91](https://github.com/onzag/itemize/blob/11a98dec/server/resolvers/triggers.ts#L91)

## Functions

### mergeTriggerRegistries

▸ **mergeTriggerRegistries**(...`triggers`: [*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md)[]): [*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md)

#### Parameters:

Name | Type |
:------ | :------ |
`...triggers` | [*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md)[] |

**Returns:** [*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md)

Defined in: [server/resolvers/triggers.ts:166](https://github.com/onzag/itemize/blob/11a98dec/server/resolvers/triggers.ts#L166)
