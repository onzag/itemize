[](../README.md) / [Exports](../modules.md) / [base/Root/sql](../modules/base_root_sql.md) / ISQLTableIndexType

# Interface: ISQLTableIndexType

[base/Root/sql](../modules/base_root_sql.md).ISQLTableIndexType

## Table of contents

### Properties

- [id](base_root_sql.isqltableindextype.md#id)
- [level](base_root_sql.isqltableindextype.md#level)
- [type](base_root_sql.isqltableindextype.md#type)

## Properties

### id

• **id**: *string*

The id of the index in order to perform double table indexes

Defined in: [base/Root/sql.ts:16](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/sql.ts#L16)

___

### level

• **level**: *number*

The index level a numeric value to sort it as, the level
makes the order of columns in the key which might have
performance effects

Defined in: [base/Root/sql.ts:26](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/sql.ts#L26)

___

### type

• **type**: *string*

The type of the index, unique, gin, btree...

Defined in: [base/Root/sql.ts:20](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/sql.ts#L20)
