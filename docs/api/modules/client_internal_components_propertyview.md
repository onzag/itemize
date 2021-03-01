[](../README.md) / [Exports](../modules.md) / client/internal/components/PropertyView

# Module: client/internal/components/PropertyView

Contains the property view main handler that handles all
the property view variants and setups the renderers

## Table of contents

### Interfaces

- [IPropertyViewHandlerProps](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)
- [IPropertyViewMainHandlerProps](../interfaces/client_internal_components_propertyview.ipropertyviewmainhandlerprops.md)
- [IPropertyViewRendererProps](../interfaces/client_internal_components_propertyview.ipropertyviewrendererprops.md)

### Functions

- [RawBasePropertyView](client_internal_components_propertyview.md#rawbasepropertyview)
- [default](client_internal_components_propertyview.md#default)

## Functions

### RawBasePropertyView

▸ **RawBasePropertyView**(`props`: { `renderer?`: *React.ComponentType*<[*IRendererProps*](../interfaces/client_internal_renderer.irendererprops.md)\> ; `rendererArgs?`: *object* ; `value`: *string*  }): *Element*

A raw property view that uses the simple view
by default in order to build a view for a raw property, raw properties
such as created_at edited_at type and so on, which do not have entries
nor property definitions

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`props` | *object* | the props   |
`props.renderer?` | *React.ComponentType*<[*IRendererProps*](../interfaces/client_internal_renderer.irendererprops.md)\> | - |
`props.rendererArgs?` | *object* | - |
`props.value` | *string* | - |

**Returns:** *Element*

areact element

Defined in: [client/internal/components/PropertyView/index.tsx:353](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyView/index.tsx#L353)

___

### default

▸ **default**(`props`: [*IPropertyViewMainHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewmainhandlerprops.md)<[*IPropertyViewRendererProps*](../interfaces/client_internal_components_propertyview.ipropertyviewrendererprops.md)<[*PropertyDefinitionSupportedType*](base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype)\>\>): *Element*

#### Parameters:

Name | Type |
:------ | :------ |
`props` | [*IPropertyViewMainHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewmainhandlerprops.md)<[*IPropertyViewRendererProps*](../interfaces/client_internal_components_propertyview.ipropertyviewrendererprops.md)<[*PropertyDefinitionSupportedType*](base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype)\>\> |

**Returns:** *Element*

Defined in: [client/internal/components/PropertyView/index.tsx:411](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyView/index.tsx#L411)
