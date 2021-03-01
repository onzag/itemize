[](../README.md) / [Exports](../modules.md) / [client/internal/components/PropertySetter](../modules/client_internal_components_propertysetter.md) / IPropertySetterBaseProps

# Interface: IPropertySetterBaseProps

[client/internal/components/PropertySetter](../modules/client_internal_components_propertysetter.md).IPropertySetterBaseProps

Base props for the property setter, check base.tsx to check
how these properties are given

## Table of contents

### Properties

- [forId](client_internal_components_propertysetter.ipropertysetterbaseprops.md#forid)
- [forVersion](client_internal_components_propertysetter.ipropertysetterbaseprops.md#forversion)
- [onClearEnforcement](client_internal_components_propertysetter.ipropertysetterbaseprops.md#onclearenforcement)
- [onEnforce](client_internal_components_propertysetter.ipropertysetterbaseprops.md#onenforce)
- [property](client_internal_components_propertysetter.ipropertysetterbaseprops.md#property)
- [value](client_internal_components_propertysetter.ipropertysetterbaseprops.md#value)

## Properties

### forId

• **forId**: *string*

The slot id that is to be used, or null
retrieved from the item-definition.tsx context

Defined in: [client/internal/components/PropertySetter/index.tsx:25](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertySetter/index.tsx#L25)

___

### forVersion

• `Optional` **forVersion**: *string*

The slot version that is to be used, or null
retrieved from the item-definition.tsx context

Defined in: [client/internal/components/PropertySetter/index.tsx:30](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertySetter/index.tsx#L30)

___

### onClearEnforcement

• **onClearEnforcement**: (`property`: [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md), `forId`: *string*, `forVersion`: *string*) => *void*

The clear enforcement function
retrieved from the item-definition.tsx context

#### Type declaration:

▸ (`property`: [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md), `forId`: *string*, `forVersion`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`property` | [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md) |
`forId` | *string* |
`forVersion` | *string* |

**Returns:** *void*

Defined in: [client/internal/components/PropertySetter/index.tsx:45](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertySetter/index.tsx#L45)

Defined in: [client/internal/components/PropertySetter/index.tsx:45](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertySetter/index.tsx#L45)

___

### onEnforce

• **onEnforce**: (`property`: [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md), `value`: [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype), `forId`: *string*, `forVersion`: *string*) => *void*

The enforcement function
retrieved from the item-definition.tsx context

#### Type declaration:

▸ (`property`: [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md), `value`: [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype), `forId`: *string*, `forVersion`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`property` | [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md) |
`value` | [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype) |
`forId` | *string* |
`forVersion` | *string* |

**Returns:** *void*

Defined in: [client/internal/components/PropertySetter/index.tsx:40](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertySetter/index.tsx#L40)

Defined in: [client/internal/components/PropertySetter/index.tsx:40](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertySetter/index.tsx#L40)

___

### property

• **property**: [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md)

The property that is to be set
retrieved from the item-definition.tsx context

Defined in: [client/internal/components/PropertySetter/index.tsx:20](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertySetter/index.tsx#L20)

___

### value

• **value**: [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype)

The value that is to be set
Provided by the user

Defined in: [client/internal/components/PropertySetter/index.tsx:35](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertySetter/index.tsx#L35)
