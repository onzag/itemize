[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/sql/payment

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/sql/payment

Contains the sql and server side specific functions for the payment type

## Table of contents

### Functions

- [paymentSQL](base_Root_Module_ItemDefinition_PropertyDefinition_sql_payment.md#paymentsql)
- [paymentSQLBtreeIndexable](base_Root_Module_ItemDefinition_PropertyDefinition_sql_payment.md#paymentsqlbtreeindexable)
- [paymentSQLEqual](base_Root_Module_ItemDefinition_PropertyDefinition_sql_payment.md#paymentsqlequal)
- [paymentSQLHiddenMetadataRow](base_Root_Module_ItemDefinition_PropertyDefinition_sql_payment.md#paymentsqlhiddenmetadatarow)
- [paymentSQLIn](base_Root_Module_ItemDefinition_PropertyDefinition_sql_payment.md#paymentsqlin)
- [paymentSQLOut](base_Root_Module_ItemDefinition_PropertyDefinition_sql_payment.md#paymentsqlout)
- [paymentSQLPreSideEffect](base_Root_Module_ItemDefinition_PropertyDefinition_sql_payment.md#paymentsqlpresideeffect)
- [paymentSQLSSCacheEqual](base_Root_Module_ItemDefinition_PropertyDefinition_sql_payment.md#paymentsqlsscacheequal)
- [paymentSQLSearch](base_Root_Module_ItemDefinition_PropertyDefinition_sql_payment.md#paymentsqlsearch)
- [paymentSQLSelect](base_Root_Module_ItemDefinition_PropertyDefinition_sql_payment.md#paymentsqlselect)
- [paymentSQLSideEffect](base_Root_Module_ItemDefinition_PropertyDefinition_sql_payment.md#paymentsqlsideeffect)

## Functions

### paymentSQL

▸ **paymentSQL**(`arg`): `Object`

the sql function that setups the fields for the payment element

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLArgInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md) | the sql argumnent |

#### Returns

`Object`

a partial row definition

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/payment.ts:29](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/sql/payment.ts#L29)

___

### paymentSQLBtreeIndexable

▸ **paymentSQLBtreeIndexable**(`arg`): `string`[]

The btree indexable used in searches

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLBtreeIndexableInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLBtreeIndexableInfo.md) | the arg for the btree indexable options |

#### Returns

`string`[]

the columns to index

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/payment.ts:187](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/sql/payment.ts#L187)

___

### paymentSQLEqual

▸ **paymentSQLEqual**(`arg`): `void`

How to consider equality with a value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLEqualInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLEqualInfo.md) | the argument to check equality against |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/payment.ts:196](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/sql/payment.ts#L196)

___

### paymentSQLHiddenMetadataRow

▸ **paymentSQLHiddenMetadataRow**(`prefix`, `id`): `string`

The selection for the payment hidden metadata, only truly used
by the provider

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` |  |
| `id` | `string` | property id |

#### Returns

`string`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/payment.ts:62](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/sql/payment.ts#L62)

___

### paymentSQLIn

▸ **paymentSQLIn**(`arg`): `Object`

The sql in function for the payment

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLInInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLInInfo.md) | the sql in info argument |

#### Returns

`Object`

a partial row

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/payment.ts:71](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/sql/payment.ts#L71)

___

### paymentSQLOut

▸ **paymentSQLOut**(`arg`): [`IPropertyDefinitionSupportedPaymentType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_payment.IPropertyDefinitionSupportedPaymentType.md)

The sql out function

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLOutInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOutInfo.md) | the argument out info |

#### Returns

[`IPropertyDefinitionSupportedPaymentType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_payment.IPropertyDefinitionSupportedPaymentType.md)

a property definition supported payment type (or null)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/payment.ts:101](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/sql/payment.ts#L101)

___

### paymentSQLPreSideEffect

▸ **paymentSQLPreSideEffect**(`arg`): ``"Setting up read only metadata is not allowed"`` \| ``"Modifying read only metadata is not allowed"``

Provides a side effect that triggers once a payment status changes, it's created, destroyed
or comes into existance, this is the standard type server side effect that occurs when
graphql does things to it, and this will trigger what is necessary to  it

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLSideEffectType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSideEffectType.md)<[`IPropertyDefinitionSupportedPaymentType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_payment.IPropertyDefinitionSupportedPaymentType.md)\> |

#### Returns

``"Setting up read only metadata is not allowed"`` \| ``"Modifying read only metadata is not allowed"``

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/payment.ts:313](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/sql/payment.ts#L313)

___

### paymentSQLSSCacheEqual

▸ **paymentSQLSSCacheEqual**(`arg`): `boolean`

How to check equality with a value using the cache

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLSSCacheEqualInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSSCacheEqualInfo.md) | the argument to check against |

#### Returns

`boolean`

a boolean

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/payment.ts:211](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/sql/payment.ts#L211)

___

### paymentSQLSearch

▸ **paymentSQLSearch**(`arg`): `boolean`

Searching for payment values

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLSearchInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSearchInfo.md) | the argument search info |

#### Returns

`boolean`

a boolean on whether it's searched by it or not

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/payment.ts:127](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/sql/payment.ts#L127)

___

### paymentSQLSelect

▸ **paymentSQLSelect**(`arg`): `string`[]

The selection for the payment in searches

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLArgInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md) |

#### Returns

`string`[]

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/payment.ts:45](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/sql/payment.ts#L45)

___

### paymentSQLSideEffect

▸ **paymentSQLSideEffect**(`arg`): `void`

Provides a side effect that triggers once a payment status changes, it's created, destroyed
or comes into existance, this is the standard type server side effect that occurs when
graphql does things to it, and this will trigger what is necessary to  it

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLSideEffectType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSideEffectType.md)<[`IPropertyDefinitionSupportedPaymentType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_payment.IPropertyDefinitionSupportedPaymentType.md)\> |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/payment.ts:224](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/sql/payment.ts#L224)
