[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root/Module/ItemDefinition/PropertyDefinition/types](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md) / ISQLInInfo

# Interface: ISQLInInfo

[base/Root/Module/ItemDefinition/PropertyDefinition/types](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md).ISQLInInfo

## Hierarchy

- [`ISQLArgInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md)

  ↳ **`ISQLInInfo`**

## Table of contents

### Properties

- [appData](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLInInfo.md#appdata)
- [dictionary](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLInInfo.md#dictionary)
- [id](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLInInfo.md#id)
- [include](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLInInfo.md#include)
- [itemDefinition](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLInInfo.md#itemdefinition)
- [language](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLInInfo.md#language)
- [prefix](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLInInfo.md#prefix)
- [property](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLInInfo.md#property)
- [serverData](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLInInfo.md#serverdata)
- [value](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLInInfo.md#value)

## Properties

### appData

• **appData**: [`IAppDataType`](server.IAppDataType.md)

#### Inherited from

[ISQLArgInfo](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md).[appData](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md#appdata)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:81](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L81)

___

### dictionary

• **dictionary**: `string` \| [`ISQLTableRowValue`](base_Root_sql.ISQLTableRowValue.md)

When the dictionary and the language are passed
as a sql table row value they will
find a property that is used for the language
in it, this is more useful when it's used
in conjuction with copying as it needs to inherit
the specific language that was used in that row

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:95](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L95)

___

### id

• **id**: `string`

#### Inherited from

[ISQLArgInfo](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md).[id](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md#id)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:67](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L67)

___

### include

• `Optional` **include**: [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md)

#### Inherited from

[ISQLArgInfo](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md).[include](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md#include)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:71](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L71)

___

### itemDefinition

• **itemDefinition**: [`default`](../classes/base_Root_Module_ItemDefinition.default.md)

#### Inherited from

[ISQLArgInfo](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md).[itemDefinition](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md#itemdefinition)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:70](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L70)

___

### language

• **language**: `string` \| [`ISQLTableRowValue`](base_Root_sql.ISQLTableRowValue.md)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:96](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L96)

___

### prefix

• **prefix**: `string`

#### Inherited from

[ISQLArgInfo](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md).[prefix](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md#prefix)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:68](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L68)

___

### property

• **property**: [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md)

#### Inherited from

[ISQLArgInfo](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md).[property](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md#property)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:69](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L69)

___

### serverData

• **serverData**: `any`

#### Inherited from

[ISQLArgInfo](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md).[serverData](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md#serverdata)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:80](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L80)

___

### value

• **value**: [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:85](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L85)
