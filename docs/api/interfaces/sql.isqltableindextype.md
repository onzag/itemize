[](../README.md) / [Exports](../modules.md) / [sql](../modules/sql.md) / ISQLTableIndexType

# Interface: ISQLTableIndexType

[sql](../modules/sql.md).ISQLTableIndexType

## Table of contents

### Properties

- [id](sql.isqltableindextype.md#id)
- [level](sql.isqltableindextype.md#level)
- [type](sql.isqltableindextype.md#type)

## Properties

### id

• **id**: *string*

The id of the index in order to perform double table indexes

Defined in: [base/Root/sql.ts:16](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/sql.ts#L16)

___

### level

• **level**: *number*

The index level a numeric value to sort it as, the level
makes the order of columns in the key which might have
performance effects

Defined in: [base/Root/sql.ts:26](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/sql.ts#L26)

___

### type

• **type**: *string*

The type of the index, unique, gin, btree...

Defined in: [base/Root/sql.ts:20](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/sql.ts#L20)
