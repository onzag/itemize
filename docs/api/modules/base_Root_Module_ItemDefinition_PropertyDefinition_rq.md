[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/rq

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/rq

This file contains all the rq related helper functions that are used in order to
retrieve and set the values of properties, it doesn't contain the conversion functions
sql.ts does

## Table of contents

### Functions

- [getRQDefinitionForProperty](base_Root_Module_ItemDefinition_PropertyDefinition_rq.md#getrqdefinitionforproperty)
- [validateRQShape](base_Root_Module_ItemDefinition_PropertyDefinition_rq.md#validaterqshape)

## Functions

### getRQDefinitionForProperty

▸ **getRQDefinitionForProperty**(`propertyDefinition`, `options`): `Object`

Provides all the schema bit that is necessary to include or query
this property alone, that is a schema bit

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `propertyDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) | the property definition in question |
| `options` | `Object` | - |
| `options.optionalForm` | `boolean` | makes all the properties optional, nullable |
| `options.prefix` | `string` | a prefix to prefix the fields by, usually the include prefix if exists |
| `options.retrievalMode` | `boolean` | - |

#### Returns

`Object`

the partial rq fields definition for the property

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/rq.ts:89](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertyDefinition/rq.ts#L89)

___

### validateRQShape

▸ **validateRQShape**(`schema`, `value`, `options?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | [`RQField`](../interfaces/base_Root_rq.RQField.md) |
| `value` | `any` |
| `options` | `Object` |
| `options.ignoreArray?` | `boolean` |

#### Returns

`boolean`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/rq.ts:13](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertyDefinition/rq.ts#L13)
