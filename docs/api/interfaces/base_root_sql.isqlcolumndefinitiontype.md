[](../README.md) / [Exports](../modules.md) / [base/Root/sql](../modules/base_root_sql.md) / ISQLColumnDefinitionType

# Interface: ISQLColumnDefinitionType

[base/Root/sql](../modules/base_root_sql.md).ISQLColumnDefinitionType

How a column is to be defined in sql, this is the SQL schema

## Table of contents

### Properties

- [defaultTo](base_root_sql.isqlcolumndefinitiontype.md#defaultto)
- [ext](base_root_sql.isqlcolumndefinitiontype.md#ext)
- [foreignKey](base_root_sql.isqlcolumndefinitiontype.md#foreignkey)
- [index](base_root_sql.isqlcolumndefinitiontype.md#index)
- [notNull](base_root_sql.isqlcolumndefinitiontype.md#notnull)
- [type](base_root_sql.isqlcolumndefinitiontype.md#type)

## Properties

### defaultTo

• `Optional` **defaultTo**: *any*

A value to make it be default to for this column

Defined in: [base/Root/sql.ts:45](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/sql.ts#L45)

___

### ext

• `Optional` **ext**: *string*

An optional extension that is required for this
type in order to function properly

Defined in: [base/Root/sql.ts:84](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/sql.ts#L84)

___

### foreignKey

• `Optional` **foreignKey**: *object*

A foreign key

#### Type declaration:

Name | Type | Description |
:------ | :------ | :------ |
`column` | *string* | The other column it relates to (this column specifically)   |
`deleteAction` | *string* | The action to take once the relationship is dropped   |
`id` | *string* | The id of the foreign key relationship being created so it can relate to others of the same table   |
`level` | *number* | The level and ordering of the foreign key   |
`table` | *string* | The other table it relates to (this column specifically)   |
`updateAction` | *string* | The action to take once the relationship is updated   |

Defined in: [base/Root/sql.ts:49](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/sql.ts#L49)

___

### index

• `Optional` **index**: [*ISQLTableIndexType*](base_root_sql.isqltableindextype.md)

An index definition

Defined in: [base/Root/sql.ts:79](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/sql.ts#L79)

___

### notNull

• `Optional` **notNull**: *boolean*

Whether it is not null, it is recommended not to use
this very often

Defined in: [base/Root/sql.ts:41](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/sql.ts#L41)

___

### type

• **type**: *string*

Postgresql type

Defined in: [base/Root/sql.ts:36](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/sql.ts#L36)
