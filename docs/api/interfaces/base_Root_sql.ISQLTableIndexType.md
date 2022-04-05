[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root/sql](../modules/base_Root_sql.md) / ISQLTableIndexType

# Interface: ISQLTableIndexType

[base/Root/sql](../modules/base_Root_sql.md).ISQLTableIndexType

## Table of contents

### Properties

- [id](base_Root_sql.ISQLTableIndexType.md#id)
- [level](base_Root_sql.ISQLTableIndexType.md#level)
- [type](base_Root_sql.ISQLTableIndexType.md#type)

## Properties

### id

• **id**: `string`

The id of the index in order to perform double table indexes

#### Defined in

[base/Root/sql.ts:16](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/sql.ts#L16)

___

### level

• **level**: `number`

The index level a numeric value to sort it as, the level
makes the order of columns in the key which might have
performance effects

#### Defined in

[base/Root/sql.ts:26](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/sql.ts#L26)

___

### type

• **type**: `string`

The type of the index, unique, gin, btree...

#### Defined in

[base/Root/sql.ts:20](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/sql.ts#L20)
