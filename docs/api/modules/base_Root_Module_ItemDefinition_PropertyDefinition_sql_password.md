[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/sql/password

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/sql/password

This file contains the password server side sql functionality

## Table of contents

### Functions

- [passwordSQLEqual](base_Root_Module_ItemDefinition_PropertyDefinition_sql_password.md#passwordsqlequal)
- [passwordSQLIn](base_Root_Module_ItemDefinition_PropertyDefinition_sql_password.md#passwordsqlin)
- [passwordSQLSSEqual](base_Root_Module_ItemDefinition_PropertyDefinition_sql_password.md#passwordsqlssequal)
- [passwordSQLSearch](base_Root_Module_ItemDefinition_PropertyDefinition_sql_password.md#passwordsqlsearch)

## Functions

### passwordSQLEqual

▸ **passwordSQLEqual**(`arg`): `void`

Provides the equality function as run in the database

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLEqualInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLEqualInfo.md) | the sql equal arg info |

#### Returns

`void`

a raw value

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/password.ts:31](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/sql/password.ts#L31)

___

### passwordSQLIn

▸ **passwordSQLIn**(`arg`): `Object`

Specifies how to SQL in the password

**`eturns`** a partial row

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLInInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLInInfo.md) | the sql in info arg |

#### Returns

`Object`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/password.ts:15](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/sql/password.ts#L15)

___

### passwordSQLSSEqual

▸ **passwordSQLSSEqual**(`arg`): `boolean`

Provides the equality function as run in a cached row

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLSSCacheEqualInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSSCacheEqualInfo.md) | the sql ss cache equal arg info |

#### Returns

`boolean`

a boolean

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/password.ts:45](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/sql/password.ts#L45)

___

### passwordSQLSearch

▸ **passwordSQLSearch**(): `any`

Provides the password sql search functionality

#### Returns

`any`

nothing, it just throws an error

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/password.ts:69](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/sql/password.ts#L69)
