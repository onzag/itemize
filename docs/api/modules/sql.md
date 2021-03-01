[](../README.md) / [Exports](../modules.md) / sql

# Module: sql

Basically just contains types and the function that specifies how the whole
database for the itemize project should be described

## Table of contents

### Interfaces

- [ISQLColumnDefinitionType](../interfaces/sql.isqlcolumndefinitiontype.md)
- [ISQLSchemaDefinitionType](../interfaces/sql.isqlschemadefinitiontype.md)
- [ISQLStreamComposedTableRowValue](../interfaces/sql.isqlstreamcomposedtablerowvalue.md)
- [ISQLTableDefinitionType](../interfaces/sql.isqltabledefinitiontype.md)
- [ISQLTableIndexType](../interfaces/sql.isqltableindextype.md)
- [ISQLTableRowValue](../interfaces/sql.isqltablerowvalue.md)

### Type aliases

- [ConsumeStreamsFnType](sql.md#consumestreamsfntype)

### Functions

- [getSQLTablesSchemaForRoot](sql.md#getsqltablesschemaforroot)

## Type aliases

### ConsumeStreamsFnType

Ƭ **ConsumeStreamsFnType**: (`propertyLocationId`: *string*) => *Promise*<void\>

#### Type declaration:

▸ (`propertyLocationId`: *string*): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`propertyLocationId` | *string* |

**Returns:** *Promise*<void\>

Defined in: [base/Root/sql.ts:111](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/sql.ts#L111)

## Functions

### getSQLTablesSchemaForRoot

▸ **getSQLTablesSchemaForRoot**(`root`: [*default*](../classes/root.default.md)): [*ISQLSchemaDefinitionType*](../interfaces/sql.isqlschemadefinitiontype.md)

Provides the whole schema that is necessary to populate
in order for all the items contained within this root
to function in the database

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`root` | [*default*](../classes/root.default.md) | The root in question   |

**Returns:** [*ISQLSchemaDefinitionType*](../interfaces/sql.isqlschemadefinitiontype.md)

a total database schema

Defined in: [base/Root/sql.ts:128](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/sql.ts#L128)
