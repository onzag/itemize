[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/components/property/base

# Module: client/components/property/base

Contains the base function that handles read, view, and entry all of them
in a single function single the logic that handles this under the hood is remarkably similar

## Table of contents

### Interfaces

- [IPropertyBaseProps](../interfaces/client_components_property_base.IPropertyBaseProps.md)
- [IPropertyBaseWithRendererProps](../interfaces/client_components_property_base.IPropertyBaseWithRendererProps.md)
- [IPropertyCoreProps](../interfaces/client_components_property_base.IPropertyCoreProps.md)
- [IPropertyEntryProps](../interfaces/client_components_property_base.IPropertyEntryProps.md)
- [IPropertyReadProps](../interfaces/client_components_property_base.IPropertyReadProps.md)
- [IPropertySetterProps](../interfaces/client_components_property_base.IPropertySetterProps.md)
- [IPropertyViewProps](../interfaces/client_components_property_base.IPropertyViewProps.md)

### Functions

- [EntryViewReadSet](client_components_property_base.md#entryviewreadset)

## Functions

### EntryViewReadSet

▸ **EntryViewReadSet**(`props`, `type`): `Element`

This is a legit function that takes all the props in order to pipe them
to the proper handler

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `IPropertyEntryViewReadSetProps`<`any`\> | the props that are passed |
| `type` | ``"entry"`` \| ``"view"`` \| ``"read"`` \| ``"set"`` | the type, entry, view, read, or set |

#### Returns

`Element`

a react component

#### Defined in

[client/components/property/base.tsx:203](https://github.com/onzag/itemize/blob/5c2808d3/client/components/property/base.tsx#L203)
