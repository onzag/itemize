[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root/Module/ItemDefinition/PropertyDefinition/types](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md) / ISQLOrderByInfo

# Interface: ISQLOrderByInfo

[base/Root/Module/ItemDefinition/PropertyDefinition/types](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md).ISQLOrderByInfo

## Hierarchy

- [`ISQLArgInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md)

  ↳ **`ISQLOrderByInfo`**

## Table of contents

### Properties

- [appData](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOrderByInfo.md#appdata)
- [args](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOrderByInfo.md#args)
- [direction](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOrderByInfo.md#direction)
- [id](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOrderByInfo.md#id)
- [include](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOrderByInfo.md#include)
- [itemDefinition](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOrderByInfo.md#itemdefinition)
- [nulls](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOrderByInfo.md#nulls)
- [prefix](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOrderByInfo.md#prefix)
- [property](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOrderByInfo.md#property)
- [serverData](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOrderByInfo.md#serverdata)
- [wasIncludedInSearch](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOrderByInfo.md#wasincludedinsearch)
- [wasIncludedInStrSearch](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOrderByInfo.md#wasincludedinstrsearch)

## Properties

### appData

• **appData**: [`IAppDataType`](server.IAppDataType.md)

#### Inherited from

[ISQLArgInfo](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md).[appData](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md#appdata)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:82](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L82)

___

### args

• **args**: [`IGQLArgs`](gql_querier.IGQLArgs.md)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:184](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L184)

___

### direction

• **direction**: ``"asc"`` \| ``"desc"``

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:180](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L180)

___

### id

• **id**: `string`

#### Inherited from

[ISQLArgInfo](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md).[id](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md#id)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:68](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L68)

___

### include

• `Optional` **include**: [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md)

#### Inherited from

[ISQLArgInfo](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md).[include](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md#include)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:72](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L72)

___

### itemDefinition

• **itemDefinition**: [`default`](../classes/base_Root_Module_ItemDefinition.default.md)

#### Inherited from

[ISQLArgInfo](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md).[itemDefinition](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md#itemdefinition)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:71](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L71)

___

### nulls

• **nulls**: ``"first"`` \| ``"last"``

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:181](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L181)

___

### prefix

• **prefix**: `string`

#### Inherited from

[ISQLArgInfo](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md).[prefix](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md#prefix)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:69](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L69)

___

### property

• **property**: [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md)

#### Inherited from

[ISQLArgInfo](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md).[property](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md#property)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:70](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L70)

___

### serverData

• **serverData**: `any`

#### Inherited from

[ISQLArgInfo](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md).[serverData](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md#serverdata)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:81](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L81)

___

### wasIncludedInSearch

• **wasIncludedInSearch**: `boolean`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:182](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L182)

___

### wasIncludedInStrSearch

• **wasIncludedInStrSearch**: `boolean`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:183](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L183)
