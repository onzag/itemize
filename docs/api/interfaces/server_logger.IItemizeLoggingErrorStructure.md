[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/logger](../modules/server_logger.md) / IItemizeLoggingErrorStructure

# Interface: IItemizeLoggingErrorStructure<T\>

[server/logger](../modules/server_logger.md).IItemizeLoggingErrorStructure

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`IItemizeLoggingStructure`](server_logger.IItemizeLoggingStructure.md)<`T`\>

  ↳ **`IItemizeLoggingErrorStructure`**

## Table of contents

### Properties

- [className](server_logger.IItemizeLoggingErrorStructure.md#classname)
- [data](server_logger.IItemizeLoggingErrorStructure.md#data)
- [endpoint](server_logger.IItemizeLoggingErrorStructure.md#endpoint)
- [err](server_logger.IItemizeLoggingErrorStructure.md#err)
- [functionName](server_logger.IItemizeLoggingErrorStructure.md#functionname)
- [message](server_logger.IItemizeLoggingErrorStructure.md#message)
- [methodName](server_logger.IItemizeLoggingErrorStructure.md#methodname)
- [orphan](server_logger.IItemizeLoggingErrorStructure.md#orphan)
- [serious](server_logger.IItemizeLoggingErrorStructure.md#serious)

## Properties

### className

• `Optional` **className**: `string`

#### Inherited from

[IItemizeLoggingStructure](server_logger.IItemizeLoggingStructure.md).[className](server_logger.IItemizeLoggingStructure.md#classname)

#### Defined in

[server/logger.ts:28](https://github.com/onzag/itemize/blob/a24376ed/server/logger.ts#L28)

___

### data

• `Optional` **data**: `T`

#### Inherited from

[IItemizeLoggingStructure](server_logger.IItemizeLoggingStructure.md).[data](server_logger.IItemizeLoggingStructure.md#data)

#### Defined in

[server/logger.ts:32](https://github.com/onzag/itemize/blob/a24376ed/server/logger.ts#L32)

___

### endpoint

• `Optional` **endpoint**: `string`

#### Inherited from

[IItemizeLoggingStructure](server_logger.IItemizeLoggingStructure.md).[endpoint](server_logger.IItemizeLoggingStructure.md#endpoint)

#### Defined in

[server/logger.ts:31](https://github.com/onzag/itemize/blob/a24376ed/server/logger.ts#L31)

___

### err

• `Optional` **err**: `Error`

#### Defined in

[server/logger.ts:37](https://github.com/onzag/itemize/blob/a24376ed/server/logger.ts#L37)

___

### functionName

• `Optional` **functionName**: `string`

#### Inherited from

[IItemizeLoggingStructure](server_logger.IItemizeLoggingStructure.md).[functionName](server_logger.IItemizeLoggingStructure.md#functionname)

#### Defined in

[server/logger.ts:30](https://github.com/onzag/itemize/blob/a24376ed/server/logger.ts#L30)

___

### message

• **message**: `string`

#### Inherited from

[IItemizeLoggingStructure](server_logger.IItemizeLoggingStructure.md).[message](server_logger.IItemizeLoggingStructure.md#message)

#### Defined in

[server/logger.ts:26](https://github.com/onzag/itemize/blob/a24376ed/server/logger.ts#L26)

___

### methodName

• `Optional` **methodName**: `string`

#### Inherited from

[IItemizeLoggingStructure](server_logger.IItemizeLoggingStructure.md).[methodName](server_logger.IItemizeLoggingStructure.md#methodname)

#### Defined in

[server/logger.ts:29](https://github.com/onzag/itemize/blob/a24376ed/server/logger.ts#L29)

___

### orphan

• `Optional` **orphan**: `boolean`

#### Defined in

[server/logger.ts:38](https://github.com/onzag/itemize/blob/a24376ed/server/logger.ts#L38)

___

### serious

• `Optional` **serious**: `boolean`

#### Defined in

[server/logger.ts:36](https://github.com/onzag/itemize/blob/a24376ed/server/logger.ts#L36)
