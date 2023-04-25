[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root/Module/ItemDefinition/PropertyDefinition/types](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md) / ISQLSideEffectType

# Interface: ISQLSideEffectType<T\>

[base/Root/Module/ItemDefinition/PropertyDefinition/types](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md).ISQLSideEffectType

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`IArgInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.IArgInfo.md)

  ↳ **`ISQLSideEffectType`**

## Table of contents

### Properties

- [appData](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSideEffectType.md#appdata)
- [id](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSideEffectType.md#id)
- [include](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSideEffectType.md#include)
- [itemDefinition](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSideEffectType.md#itemdefinition)
- [newRowValue](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSideEffectType.md#newrowvalue)
- [newValue](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSideEffectType.md#newvalue)
- [originalRowValue](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSideEffectType.md#originalrowvalue)
- [originalValue](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSideEffectType.md#originalvalue)
- [prefix](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSideEffectType.md#prefix)
- [property](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSideEffectType.md#property)
- [rowId](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSideEffectType.md#rowid)
- [rowVersion](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSideEffectType.md#rowversion)

## Properties

### appData

• **appData**: [`IAppDataType`](server.IAppDataType.md)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:211](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L211)

___

### id

• **id**: `string`

#### Inherited from

[IArgInfo](base_Root_Module_ItemDefinition_PropertyDefinition_types.IArgInfo.md).[id](base_Root_Module_ItemDefinition_PropertyDefinition_types.IArgInfo.md#id)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:67](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L67)

___

### include

• `Optional` **include**: [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md)

#### Inherited from

[IArgInfo](base_Root_Module_ItemDefinition_PropertyDefinition_types.IArgInfo.md).[include](base_Root_Module_ItemDefinition_PropertyDefinition_types.IArgInfo.md#include)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:71](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L71)

___

### itemDefinition

• **itemDefinition**: [`default`](../classes/base_Root_Module_ItemDefinition.default.md)

#### Inherited from

[IArgInfo](base_Root_Module_ItemDefinition_PropertyDefinition_types.IArgInfo.md).[itemDefinition](base_Root_Module_ItemDefinition_PropertyDefinition_types.IArgInfo.md#itemdefinition)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:70](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L70)

___

### newRowValue

• **newRowValue**: [`ISQLTableRowValue`](base_Root_sql.ISQLTableRowValue.md)

This field is unknown on a pre-side effect event

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:219](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L219)

___

### newValue

• **newValue**: `T`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:213](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L213)

___

### originalRowValue

• **originalRowValue**: [`ISQLTableRowValue`](base_Root_sql.ISQLTableRowValue.md)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:220](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L220)

___

### originalValue

• **originalValue**: `T`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:212](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L212)

___

### prefix

• **prefix**: `string`

#### Inherited from

[IArgInfo](base_Root_Module_ItemDefinition_PropertyDefinition_types.IArgInfo.md).[prefix](base_Root_Module_ItemDefinition_PropertyDefinition_types.IArgInfo.md#prefix)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:68](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L68)

___

### property

• **property**: [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md)

#### Inherited from

[IArgInfo](base_Root_Module_ItemDefinition_PropertyDefinition_types.IArgInfo.md).[property](base_Root_Module_ItemDefinition_PropertyDefinition_types.IArgInfo.md#property)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:69](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L69)

___

### rowId

• **rowId**: `string`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:214](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L214)

___

### rowVersion

• **rowVersion**: `string`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:215](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L215)
