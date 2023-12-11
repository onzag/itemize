[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/local-sql

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/local-sql

This file contains fake local sql functions that run as if they were sql
functions but in the javascript context

They exist for use within the redis cache
within the server and client side respectively

## Table of contents

### Functions

- [standardLocalEqual](base_Root_Module_ItemDefinition_PropertyDefinition_local_sql.md#standardlocalequal)
- [standardSQLSSCacheEqualFn](base_Root_Module_ItemDefinition_PropertyDefinition_local_sql.md#standardsqlsscacheequalfn)

## Functions

### standardLocalEqual

▸ **standardLocalEqual**(`arg`): `boolean`

Standard local equal for comparing values locally in the client side
by default it just compares

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ILocalEqualInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ILocalEqualInfo.md)\<[`PropertyDefinitionSupportedType`](base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)\> | the local information |

#### Returns

`boolean`

a boolean on whether it equals or not

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/local-sql.ts:32](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/local-sql.ts#L32)

___

### standardSQLSSCacheEqualFn

▸ **standardSQLSSCacheEqualFn**(`arg`): `boolean`

This function represents the standard way an equality check
is performed locally in the cache when equality between properties is requests
this local equal is ran against SQL cached properties, that is redis cache
it is used for check for policies

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLSSCacheEqualInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSSCacheEqualInfo.md) | the sql ss cache equal info |

#### Returns

`boolean`

a boolean on whether it equals

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/local-sql.ts:22](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/local-sql.ts#L22)
