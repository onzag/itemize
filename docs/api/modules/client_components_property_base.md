[](../README.md) / [Exports](../modules.md) / client/components/property/base

# Module: client/components/property/base

Contains the base function that handles read, view, and entry all of them
in a single function single the logic that handles this under the hood is remarkably similar

## Table of contents

### Interfaces

- [IPropertyBaseProps](../interfaces/client_components_property_base.ipropertybaseprops.md)
- [IPropertyBaseWithRendererProps](../interfaces/client_components_property_base.ipropertybasewithrendererprops.md)
- [IPropertyEntryProps](../interfaces/client_components_property_base.ipropertyentryprops.md)
- [IPropertyReadProps](../interfaces/client_components_property_base.ipropertyreadprops.md)
- [IPropertySetterProps](../interfaces/client_components_property_base.ipropertysetterprops.md)
- [IPropertyViewProps](../interfaces/client_components_property_base.ipropertyviewprops.md)

### Functions

- [EntryViewReadSet](client_components_property_base.md#entryviewreadset)

## Functions

### EntryViewReadSet

▸ **EntryViewReadSet**(`props`: *IPropertyEntryViewReadSetProps*<any\>, `type`: *entry* \| *view* \| *read* \| *set*): *Element*

This is a legit function that takes all the props in order to pipe them
to the proper handler

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`props` | *IPropertyEntryViewReadSetProps*<any\> | the props that are passed   |
`type` | *entry* \| *view* \| *read* \| *set* | the type, entry, view, read, or set   |

**Returns:** *Element*

a react component

Defined in: [client/components/property/base.tsx:184](https://github.com/onzag/itemize/blob/28218320/client/components/property/base.tsx#L184)
