[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/logger

# Module: server/logger

## Table of contents

### Interfaces

- [IItemizeFinalLoggingObject](../interfaces/server_logger.IItemizeFinalLoggingObject.md)
- [IItemizeLoggingErrorStructure](../interfaces/server_logger.IItemizeLoggingErrorStructure.md)
- [IItemizeLoggingStructure](../interfaces/server_logger.IItemizeLoggingStructure.md)

### Type Aliases

- [ILoggerType](server_logger.md#iloggertype)

### Variables

- [logger](server_logger.md#logger)

### Functions

- [extendLoggerWith](server_logger.md#extendloggerwith)

## Type Aliases

### ILoggerType

Ƭ **ILoggerType**: typeof [`logger`](server_logger.md#logger)

#### Defined in

[server/logger.ts:121](https://github.com/onzag/itemize/blob/73e0c39e/server/logger.ts#L121)

## Variables

### logger

• `Const` **logger**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `debug` | (`arg`: [`IItemizeLoggingStructure`](../interfaces/server_logger.IItemizeLoggingStructure.md)\<`any`\>) => `void` |
| `error` | (`arg`: [`IItemizeLoggingErrorStructure`](../interfaces/server_logger.IItemizeLoggingErrorStructure.md)\<`any`\>) => `void` |
| `info` | (`arg`: [`IItemizeLoggingStructure`](../interfaces/server_logger.IItemizeLoggingStructure.md)\<`any`\>) => `void` |

#### Defined in

[server/logger.ts:115](https://github.com/onzag/itemize/blob/73e0c39e/server/logger.ts#L115)

## Functions

### extendLoggerWith

▸ **extendLoggerWith**(`p`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `p` | [`default`](../classes/server_services_base_LoggingProvider.default.md)\<`any`\> |

#### Returns

`void`

#### Defined in

[server/logger.ts:148](https://github.com/onzag/itemize/blob/73e0c39e/server/logger.ts#L148)
