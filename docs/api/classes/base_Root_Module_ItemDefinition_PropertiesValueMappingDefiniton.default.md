[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root/Module/ItemDefinition/PropertiesValueMappingDefiniton](../modules/base_Root_Module_ItemDefinition_PropertiesValueMappingDefiniton.md) / default

# Class: default

[base/Root/Module/ItemDefinition/PropertiesValueMappingDefiniton](../modules/base_Root_Module_ItemDefinition_PropertiesValueMappingDefiniton.md).default

This class provides the utility for the properties that
are set to a specific item, for example let's say there's
an item named Vehicle, which can have a property for it
being type "car", "motorbike, or "moped"; such vehicle has
a wheelset, and this wheelset has properties of its own

{
  "definition": "wheelset",
  "enforcedProperties" : {
    "amount": {
      "exactValue": 4
    },
    "type": {
      "exactValue": "car"
    },
  },
},

represents a list of properties for an specific item named
wheelset, this is a PropertiesValueMappingDefiniton

## Table of contents

### Constructors

- [constructor](base_Root_Module_ItemDefinition_PropertiesValueMappingDefiniton.default.md#constructor)

### Properties

- [parentItemDefinition](base_Root_Module_ItemDefinition_PropertiesValueMappingDefiniton.default.md#parentitemdefinition)
- [rawData](base_Root_Module_ItemDefinition_PropertiesValueMappingDefiniton.default.md#rawdata)
- [referredItemDefinition](base_Root_Module_ItemDefinition_PropertiesValueMappingDefiniton.default.md#referreditemdefinition)

### Methods

- [getPropertyMap](base_Root_Module_ItemDefinition_PropertiesValueMappingDefiniton.default.md#getpropertymap)
- [getPropertyValue](base_Root_Module_ItemDefinition_PropertiesValueMappingDefiniton.default.md#getpropertyvalue)
- [hasPropertyValue](base_Root_Module_ItemDefinition_PropertiesValueMappingDefiniton.default.md#haspropertyvalue)

## Constructors

### constructor

• **new default**(`rawJSON`, `parentItemDefinition`, `referredItemDefinition`): [`default`](base_Root_Module_ItemDefinition_PropertiesValueMappingDefiniton.default.md)

Contructor for the class

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rawJSON` | [`IPropertiesValueMappingDefinitonRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition_PropertiesValueMappingDefiniton.IPropertiesValueMappingDefinitonRawJSONDataType.md) | the raw data as JSON |
| `parentItemDefinition` | [`default`](base_Root_Module_ItemDefinition.default.md) | the item definition that this node is located, its root; for the example above that would be the vehicle item definition |
| `referredItemDefinition` | [`default`](base_Root_Module_ItemDefinition.default.md) | the item definition that these properties are attempted to be set against, for the example above that would be the wheelset item definition |

#### Returns

[`default`](base_Root_Module_ItemDefinition_PropertiesValueMappingDefiniton.default.md)

#### Defined in

[base/Root/Module/ItemDefinition/PropertiesValueMappingDefiniton/index.ts:65](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertiesValueMappingDefiniton/index.ts#L65)

## Properties

### parentItemDefinition

• **parentItemDefinition**: [`default`](base_Root_Module_ItemDefinition.default.md)

#### Defined in

[base/Root/Module/ItemDefinition/PropertiesValueMappingDefiniton/index.ts:53](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertiesValueMappingDefiniton/index.ts#L53)

___

### rawData

• **rawData**: [`IPropertiesValueMappingDefinitonRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition_PropertiesValueMappingDefiniton.IPropertiesValueMappingDefinitonRawJSONDataType.md)

#### Defined in

[base/Root/Module/ItemDefinition/PropertiesValueMappingDefiniton/index.ts:51](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertiesValueMappingDefiniton/index.ts#L51)

___

### referredItemDefinition

• **referredItemDefinition**: [`default`](base_Root_Module_ItemDefinition.default.md)

#### Defined in

[base/Root/Module/ItemDefinition/PropertiesValueMappingDefiniton/index.ts:52](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertiesValueMappingDefiniton/index.ts#L52)

## Methods

### getPropertyMap

▸ **getPropertyMap**(): \{ `id`: `string` ; `value`: [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype) \| [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)  }[]

Gives a property map in the form id and value for properties

#### Returns

\{ `id`: `string` ; `value`: [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype) \| [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)  }[]

the property map with property values

#### Defined in

[base/Root/Module/ItemDefinition/PropertiesValueMappingDefiniton/index.ts:79](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertiesValueMappingDefiniton/index.ts#L79)

___

### getPropertyValue

▸ **getPropertyValue**(`key`): [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype) \| [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)

Retrieves a property value for a given property id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | the property id |

#### Returns

[`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype) \| [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)

either a peroperty supported value or a property
definition itself for referred properties

#### Defined in

[base/Root/Module/ItemDefinition/PropertiesValueMappingDefiniton/index.ts:108](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertiesValueMappingDefiniton/index.ts#L108)

___

### hasPropertyValue

▸ **hasPropertyValue**(`key`): `boolean`

Checks whether it contains a property value for a
specific property id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | the property id |

#### Returns

`boolean`

a boolean on whether it has such a property value

#### Defined in

[base/Root/Module/ItemDefinition/PropertiesValueMappingDefiniton/index.ts:97](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertiesValueMappingDefiniton/index.ts#L97)
