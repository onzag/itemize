[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root/sql](../modules/base_Root_sql.md) / ISQLColumnDefinitionType

# Interface: ISQLColumnDefinitionType

[base/Root/sql](../modules/base_Root_sql.md).ISQLColumnDefinitionType

How a column is to be defined in sql, this is the SQL schema

## Table of contents

### Properties

- [defaultTo](base_Root_sql.ISQLColumnDefinitionType.md#defaultto)
- [ext](base_Root_sql.ISQLColumnDefinitionType.md#ext)
- [foreignKey](base_Root_sql.ISQLColumnDefinitionType.md#foreignkey)
- [index](base_Root_sql.ISQLColumnDefinitionType.md#index)
- [notNull](base_Root_sql.ISQLColumnDefinitionType.md#notnull)
- [type](base_Root_sql.ISQLColumnDefinitionType.md#type)

## Properties

### defaultTo

• `Optional` **defaultTo**: `any`

A value to make it be default to for this column

#### Defined in

[base/Root/sql.ts:49](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/sql.ts#L49)

___

### ext

• `Optional` **ext**: `string`

An optional extension that is required for this
type in order to function properly

#### Defined in

[base/Root/sql.ts:88](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/sql.ts#L88)

___

### foreignKey

• `Optional` **foreignKey**: `Object`

A foreign key

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `column` | `string` | The other column it relates to (this column specifically) |
| `deleteAction` | `string` | The action to take once the relationship is dropped |
| `id` | `string` | The id of the foreign key relationship being created so it can relate to others of the same table |
| `level` | `number` | The level and ordering of the foreign key |
| `table` | `string` | The other table it relates to (this column specifically) |
| `updateAction` | `string` | The action to take once the relationship is updated |

#### Defined in

[base/Root/sql.ts:53](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/sql.ts#L53)

___

### index

• `Optional` **index**: [`ISQLTableIndexType`](base_Root_sql.ISQLTableIndexType.md)

An index definition

#### Defined in

[base/Root/sql.ts:83](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/sql.ts#L83)

___

### notNull

• `Optional` **notNull**: `boolean`

Whether it is not null, it is recommended not to use
this very often

#### Defined in

[base/Root/sql.ts:45](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/sql.ts#L45)

___

### type

• **type**: `string`

Postgresql type

#### Defined in

[base/Root/sql.ts:40](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/sql.ts#L40)
