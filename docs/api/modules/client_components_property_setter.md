[](../README.md) / [Exports](../modules.md) / client/components/property/Setter

# Module: client/components/property/Setter

Contains the setter component that pipes the data to the all mighty function
in base.tsx

## Table of contents

### Functions

- [default](client_components_property_setter.md#default)

## Functions

### default

▸ **default**(`props`: [*IPropertySetterProps*](../interfaces/client_components_property_base.ipropertysetterprops.md)): *Element*

Allows to set the value for a property using components, this property
will then be marked as super enforced into this value and cannot really
be modified until the setter is unmounted

Note that for usage with automatic search, you should use the setter functionality
provided within the item definition provider search function as automatic search triggers before
the elements inside it mount, making this setter not execute but after automatic search is executed

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`props` | [*IPropertySetterProps*](../interfaces/client_components_property_base.ipropertysetterprops.md) | the props for the entry   |

**Returns:** *Element*

a react component

Defined in: [client/components/property/Setter.tsx:22](https://github.com/onzag/itemize/blob/28218320/client/components/property/Setter.tsx#L22)
