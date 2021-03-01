[](../README.md) / [Exports](../modules.md) / base/Root/sql

# Module: base/Root/sql

Basically just contains types and the function that specifies how the whole
database for the itemize project should be described

## Table of contents

### Interfaces

- [ISQLColumnDefinitionType](../interfaces/base_root_sql.isqlcolumndefinitiontype.md)
- [ISQLSchemaDefinitionType](../interfaces/base_root_sql.isqlschemadefinitiontype.md)
- [ISQLStreamComposedTableRowValue](../interfaces/base_root_sql.isqlstreamcomposedtablerowvalue.md)
- [ISQLTableDefinitionType](../interfaces/base_root_sql.isqltabledefinitiontype.md)
- [ISQLTableIndexType](../interfaces/base_root_sql.isqltableindextype.md)
- [ISQLTableRowValue](../interfaces/base_root_sql.isqltablerowvalue.md)

### Type aliases

- [ConsumeStreamsFnType](base_root_sql.md#consumestreamsfntype)

### Functions

- [getSQLTablesSchemaForRoot](base_root_sql.md#getsqltablesschemaforroot)

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

Defined in: [base/Root/sql.ts:111](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/sql.ts#L111)

## Functions

### getSQLTablesSchemaForRoot

▸ **getSQLTablesSchemaForRoot**(`root`: [*default*](../classes/base_root.default.md)): [*ISQLSchemaDefinitionType*](../interfaces/base_root_sql.isqlschemadefinitiontype.md)

Provides the whole schema that is necessary to populate
in order for all the items contained within this root
to function in the database

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`root` | [*default*](../classes/base_root.default.md) | The root in question   |

**Returns:** [*ISQLSchemaDefinitionType*](../interfaces/base_root_sql.isqlschemadefinitiontype.md)

a total database schema

Defined in: [base/Root/sql.ts:128](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/sql.ts#L128)
