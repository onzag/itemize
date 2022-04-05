[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/internal/components/PropertyView

# Module: client/internal/components/PropertyView

Contains the property view main handler that handles all
the property view variants and setups the renderers

## Table of contents

### Interfaces

- [IPropertyViewHandlerProps](../interfaces/client_internal_components_PropertyView.IPropertyViewHandlerProps.md)
- [IPropertyViewMainHandlerProps](../interfaces/client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md)
- [IPropertyViewRendererProps](../interfaces/client_internal_components_PropertyView.IPropertyViewRendererProps.md)

### Functions

- [RawBasePropertyView](client_internal_components_PropertyView.md#rawbasepropertyview)
- [default](client_internal_components_PropertyView.md#default)

## Functions

### RawBasePropertyView

▸ **RawBasePropertyView**(`props`): `Element`

A raw property view that uses the simple view
by default in order to build a view for a raw property, raw properties
such as created_at edited_at type and so on, which do not have entries
nor property definitions

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `Object` | the props |
| `props.renderer?` | `ComponentType`<[`IRendererProps`](../interfaces/client_internal_renderer.IRendererProps.md)\> | - |
| `props.rendererArgs?` | `object` | - |
| `props.value` | `string` | - |

#### Returns

`Element`

areact element

#### Defined in

[client/internal/components/PropertyView/index.tsx:358](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyView/index.tsx#L358)

___

### default

▸ **default**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`IPropertyViewMainHandlerProps`](../interfaces/client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md)<[`IPropertyViewRendererProps`](../interfaces/client_internal_components_PropertyView.IPropertyViewRendererProps.md)<[`PropertyDefinitionSupportedType`](base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)\>\> |

#### Returns

`Element`

#### Defined in

[client/internal/components/PropertyView/index.tsx:416](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyView/index.tsx#L416)
