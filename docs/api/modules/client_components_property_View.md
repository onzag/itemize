[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/components/property/View

# Module: client/components/property/View

Contains the view component that pipes the data to the all mighty function
in base.tsx

## Table of contents

### Functions

- [default](client_components_property_View.md#default)

## Functions

### default

▸ **default**(`props`): `any`

Creates an view for a given property id

The viewer can be used with meta properties, such as created_at edited_at, etc...

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertyViewProps`](../interfaces/client_components_property_base.IPropertyViewProps.md)<[`IPropertyViewRendererProps`](../interfaces/client_internal_components_PropertyView.IPropertyViewRendererProps.md)<[`PropertyDefinitionSupportedType`](base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)\>\> | the props for the view |

#### Returns

`any`

a react component

#### Defined in

[client/components/property/View.tsx:20](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/View.tsx#L20)
