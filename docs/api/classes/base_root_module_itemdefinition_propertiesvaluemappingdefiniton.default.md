[](../README.md) / [Exports](../modules.md) / [base/Root/Module/ItemDefinition/PropertiesValueMappingDefiniton](../modules/base_root_module_itemdefinition_propertiesvaluemappingdefiniton.md) / default

# Class: default

[base/Root/Module/ItemDefinition/PropertiesValueMappingDefiniton](../modules/base_root_module_itemdefinition_propertiesvaluemappingdefiniton.md).default

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

- [constructor](base_root_module_itemdefinition_propertiesvaluemappingdefiniton.default.md#constructor)

### Properties

- [parentItemDefinition](base_root_module_itemdefinition_propertiesvaluemappingdefiniton.default.md#parentitemdefinition)
- [rawData](base_root_module_itemdefinition_propertiesvaluemappingdefiniton.default.md#rawdata)
- [referredItemDefinition](base_root_module_itemdefinition_propertiesvaluemappingdefiniton.default.md#referreditemdefinition)

### Methods

- [getPropertyMap](base_root_module_itemdefinition_propertiesvaluemappingdefiniton.default.md#getpropertymap)
- [getPropertyValue](base_root_module_itemdefinition_propertiesvaluemappingdefiniton.default.md#getpropertyvalue)
- [hasPropertyValue](base_root_module_itemdefinition_propertiesvaluemappingdefiniton.default.md#haspropertyvalue)

## Constructors

### constructor

\+ **new default**(`rawJSON`: [*IPropertiesValueMappingDefinitonRawJSONDataType*](../interfaces/base_root_module_itemdefinition_propertiesvaluemappingdefiniton.ipropertiesvaluemappingdefinitonrawjsondatatype.md), `parentItemDefinition`: [*default*](base_root_module_itemdefinition.default.md), `referredItemDefinition`: [*default*](base_root_module_itemdefinition.default.md)): [*default*](base_root_module_itemdefinition_propertiesvaluemappingdefiniton.default.md)

Contructor for the class

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rawJSON` | [*IPropertiesValueMappingDefinitonRawJSONDataType*](../interfaces/base_root_module_itemdefinition_propertiesvaluemappingdefiniton.ipropertiesvaluemappingdefinitonrawjsondatatype.md) | the raw data as JSON   |
`parentItemDefinition` | [*default*](base_root_module_itemdefinition.default.md) | the item definition that this node is located, its root; for the example above that would be the vehicle item definition   |
`referredItemDefinition` | [*default*](base_root_module_itemdefinition.default.md) | the item definition that these properties are attempted to be set against, for the example above that would be the wheelset item definition    |

**Returns:** [*default*](base_root_module_itemdefinition_propertiesvaluemappingdefiniton.default.md)

Defined in: [base/Root/Module/ItemDefinition/PropertiesValueMappingDefiniton/index.ts:53](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertiesValueMappingDefiniton/index.ts#L53)

## Properties

### parentItemDefinition

• **parentItemDefinition**: [*default*](base_root_module_itemdefinition.default.md)

Defined in: [base/Root/Module/ItemDefinition/PropertiesValueMappingDefiniton/index.ts:53](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertiesValueMappingDefiniton/index.ts#L53)

___

### rawData

• **rawData**: [*IPropertiesValueMappingDefinitonRawJSONDataType*](../interfaces/base_root_module_itemdefinition_propertiesvaluemappingdefiniton.ipropertiesvaluemappingdefinitonrawjsondatatype.md)

Defined in: [base/Root/Module/ItemDefinition/PropertiesValueMappingDefiniton/index.ts:51](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertiesValueMappingDefiniton/index.ts#L51)

___

### referredItemDefinition

• **referredItemDefinition**: [*default*](base_root_module_itemdefinition.default.md)

Defined in: [base/Root/Module/ItemDefinition/PropertiesValueMappingDefiniton/index.ts:52](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertiesValueMappingDefiniton/index.ts#L52)

## Methods

### getPropertyMap

▸ **getPropertyMap**(): { `id`: *string* ; `value`: *string* \| *number* \| *boolean* \| [*default*](base_root_module_itemdefinition_propertydefinition.default.md) \| [*IPropertyDefinitionSupportedCurrencyType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_currency.ipropertydefinitionsupportedcurrencytype.md) \| [*IPropertyDefinitionSupportedUnitType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_unit.ipropertydefinitionsupportedunittype.md) \| [*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md) \| [*IGQLFile*](../interfaces/gql_querier.igqlfile.md) \| [*PropertyDefinitionSupportedFilesType*](../modules/base_root_module_itemdefinition_propertydefinition_types_files.md#propertydefinitionsupportedfilestype)  }[]

Gives a property map in the form id and value for properties

**Returns:** { `id`: *string* ; `value`: *string* \| *number* \| *boolean* \| [*default*](base_root_module_itemdefinition_propertydefinition.default.md) \| [*IPropertyDefinitionSupportedCurrencyType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_currency.ipropertydefinitionsupportedcurrencytype.md) \| [*IPropertyDefinitionSupportedUnitType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_unit.ipropertydefinitionsupportedunittype.md) \| [*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md) \| [*IGQLFile*](../interfaces/gql_querier.igqlfile.md) \| [*PropertyDefinitionSupportedFilesType*](../modules/base_root_module_itemdefinition_propertydefinition_types_files.md#propertydefinitionsupportedfilestype)  }[]

the property map with property values

Defined in: [base/Root/Module/ItemDefinition/PropertiesValueMappingDefiniton/index.ts:79](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertiesValueMappingDefiniton/index.ts#L79)

___

### getPropertyValue

▸ **getPropertyValue**(`key`: *string*): *string* \| *number* \| *boolean* \| [*default*](base_root_module_itemdefinition_propertydefinition.default.md) \| [*IPropertyDefinitionSupportedCurrencyType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_currency.ipropertydefinitionsupportedcurrencytype.md) \| [*IPropertyDefinitionSupportedUnitType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_unit.ipropertydefinitionsupportedunittype.md) \| [*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md) \| [*IGQLFile*](../interfaces/gql_querier.igqlfile.md) \| [*PropertyDefinitionSupportedFilesType*](../modules/base_root_module_itemdefinition_propertydefinition_types_files.md#propertydefinitionsupportedfilestype)

Retrieves a property value for a given property id

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`key` | *string* | the property id   |

**Returns:** *string* \| *number* \| *boolean* \| [*default*](base_root_module_itemdefinition_propertydefinition.default.md) \| [*IPropertyDefinitionSupportedCurrencyType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_currency.ipropertydefinitionsupportedcurrencytype.md) \| [*IPropertyDefinitionSupportedUnitType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_unit.ipropertydefinitionsupportedunittype.md) \| [*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md) \| [*IGQLFile*](../interfaces/gql_querier.igqlfile.md) \| [*PropertyDefinitionSupportedFilesType*](../modules/base_root_module_itemdefinition_propertydefinition_types_files.md#propertydefinitionsupportedfilestype)

either a peroperty supported value or a property
definition itself for referred properties

Defined in: [base/Root/Module/ItemDefinition/PropertiesValueMappingDefiniton/index.ts:108](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertiesValueMappingDefiniton/index.ts#L108)

___

### hasPropertyValue

▸ **hasPropertyValue**(`key`: *string*): *boolean*

Checks whether it contains a property value for a
specific property id

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`key` | *string* | the property id   |

**Returns:** *boolean*

a boolean on whether it has such a property value

Defined in: [base/Root/Module/ItemDefinition/PropertiesValueMappingDefiniton/index.ts:97](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertiesValueMappingDefiniton/index.ts#L97)
