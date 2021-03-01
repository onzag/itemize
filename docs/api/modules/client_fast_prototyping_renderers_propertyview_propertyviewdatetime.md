[](../README.md) / [Exports](../modules.md) / client/fast-prototyping/renderers/PropertyView/PropertyViewDateTime

# Module: client/fast-prototyping/renderers/PropertyView/PropertyViewDateTime

Contains the property view datetime renderer

## Table of contents

### Functions

- [default](client_fast_prototyping_renderers_propertyview_propertyviewdatetime.md#default)

## Functions

### default

▸ **default**(`props`: [*IPropertyViewDateTimeRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewdatetime.ipropertyviewdatetimerendererprops.md)): *Element*

The fast prototyping property view date time renderer, basically uses moment to format
for the given date format

supported args:
- NullComponent: a react component to render instead of the default when the value is null
- nullComponentArgs: an object to pass as props to the null component
- dateFormat: a momentjs date string format to use instead of the default (keep localization in mind)

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`props` | [*IPropertyViewDateTimeRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewdatetime.ipropertyviewdatetimerendererprops.md) | the property view date time renderer props given by the handler   |

**Returns:** *Element*

a react element

Defined in: [client/fast-prototyping/renderers/PropertyView/PropertyViewDateTime.tsx:22](https://github.com/onzag/itemize/blob/0e9b128c/client/fast-prototyping/renderers/PropertyView/PropertyViewDateTime.tsx#L22)
