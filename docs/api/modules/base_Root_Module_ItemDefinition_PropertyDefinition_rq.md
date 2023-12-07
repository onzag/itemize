[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/rq

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/rq

This file contains all the graphql related helper functions that are used in order to
retrieve and set the values of properties, it doesn't contain the conversion functions
sql.ts does

## Table of contents

### Functions

- [getRQDefinitionForProperty](base_Root_Module_ItemDefinition_PropertyDefinition_rq.md#getrqdefinitionforproperty)

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

#### Returns

`Object`

the partial graphql fields definition for the property

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/rq.ts:22](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/rq.ts#L22)
