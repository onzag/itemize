[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/sql

# Module: base/Root/sql

Basically just contains types and the function that specifies how the whole
database for the itemize project should be described

## Table of contents

### Interfaces

- [ISQLColumnDefinitionType](../interfaces/base_Root_sql.ISQLColumnDefinitionType.md)
- [ISQLSchemaDefinitionType](../interfaces/base_Root_sql.ISQLSchemaDefinitionType.md)
- [ISQLStreamComposedTableRowValue](../interfaces/base_Root_sql.ISQLStreamComposedTableRowValue.md)
- [ISQLTableDefinitionType](../interfaces/base_Root_sql.ISQLTableDefinitionType.md)
- [ISQLTableIndexType](../interfaces/base_Root_sql.ISQLTableIndexType.md)
- [ISQLTableRowValue](../interfaces/base_Root_sql.ISQLTableRowValue.md)

### Type aliases

- [ConsumeStreamsFnType](base_Root_sql.md#consumestreamsfntype)

### Functions

- [getSQLTablesSchemaForRoot](base_Root_sql.md#getsqltablesschemaforroot)

## Type aliases

### ConsumeStreamsFnType

Ƭ **ConsumeStreamsFnType**: (`propertyLocationId`: `string`) => `Promise`<`void`\>

#### Type declaration

▸ (`propertyLocationId`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `propertyLocationId` | `string` |

##### Returns

`Promise`<`void`\>

#### Defined in

[base/Root/sql.ts:111](https://github.com/onzag/itemize/blob/f2f29986/base/Root/sql.ts#L111)

## Functions

### getSQLTablesSchemaForRoot

▸ **getSQLTablesSchemaForRoot**(`root`): [`ISQLSchemaDefinitionType`](../interfaces/base_Root_sql.ISQLSchemaDefinitionType.md)

Provides the whole schema that is necessary to populate
in order for all the items contained within this root
to function in the database

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `root` | [`default`](../classes/base_Root.default.md) | The root in question |

#### Returns

[`ISQLSchemaDefinitionType`](../interfaces/base_Root_sql.ISQLSchemaDefinitionType.md)

a total database schema

#### Defined in

[base/Root/sql.ts:128](https://github.com/onzag/itemize/blob/f2f29986/base/Root/sql.ts#L128)
