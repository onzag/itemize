[](../README.md) / [Exports](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition

# Module: base/Root/Module/ItemDefinition/PropertyDefinition

This file contains the property definition that defines all the interactions
that occur within a property of an item

## Table of contents

### Enumerations

- [PropertyInvalidReason](../enums/base_root_module_itemdefinition_propertydefinition.propertyinvalidreason.md)

### Classes

- [default](../classes/base_root_module_itemdefinition_propertydefinition.default.md)

### Interfaces

- [IPropertyDefinitionExactPropertyValue](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionexactpropertyvalue.md)
- [IPropertyDefinitionInvalidRuleDataType](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitioninvalidruledatatype.md)
- [IPropertyDefinitionRawJSONDataType](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md)
- [IPropertyDefinitionRawJSONInvalidRuleDataType](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsoninvalidruledatatype.md)
- [IPropertyDefinitionRawJSONRuleDataType](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsonruledatatype.md)
- [IPropertyDefinitionReferredPropertyValue](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionreferredpropertyvalue.md)
- [IPropertyDefinitionRuleDataType](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionruledatatype.md)
- [IPropertyDefinitionState](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionstate.md)

### Type aliases

- [PropertyDefinitionCheckerFunctionType](base_root_module_itemdefinition_propertydefinition.md#propertydefinitioncheckerfunctiontype)
- [PropertyDefinitionValueType](base_root_module_itemdefinition_propertydefinition.md#propertydefinitionvaluetype)

## Type aliases

### PropertyDefinitionCheckerFunctionType

Ƭ **PropertyDefinitionCheckerFunctionType**: (`itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md), `include`: [*default*](../classes/base_root_module_itemdefinition_include.default.md), `property`: [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md), `value`: [*PropertyDefinitionSupportedType*](base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype), `id`: *string*, `version`: *string*) => *Promise*<boolean\>

Represents the external checkers that are used to
check index values

#### Type declaration:

▸ (`itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md), `include`: [*default*](../classes/base_root_module_itemdefinition_include.default.md), `property`: [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md), `value`: [*PropertyDefinitionSupportedType*](base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype), `id`: *string*, `version`: *string*): *Promise*<boolean\>

#### Parameters:

Name | Type |
:------ | :------ |
`itemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) |
`include` | [*default*](../classes/base_root_module_itemdefinition_include.default.md) |
`property` | [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md) |
`value` | [*PropertyDefinitionSupportedType*](base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype) |
`id` | *string* |
`version` | *string* |

**Returns:** *Promise*<boolean\>

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:382](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L382)

___

### PropertyDefinitionValueType

Ƭ **PropertyDefinitionValueType**: [*IPropertyDefinitionExactPropertyValue*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionexactpropertyvalue.md) \| [*IPropertyDefinitionReferredPropertyValue*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionreferredpropertyvalue.md)

And this is combined

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:374](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L374)
