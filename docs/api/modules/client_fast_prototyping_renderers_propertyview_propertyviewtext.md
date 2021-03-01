[](../README.md) / [Exports](../modules.md) / client/fast-prototyping/renderers/PropertyView/PropertyViewText

# Module: client/fast-prototyping/renderers/PropertyView/PropertyViewText

Contains the property view text renderer, another large
thing used for text/plain or text/html text, but not unsubtyped
text

## Table of contents

### Classes

- [PropertyViewRichTextViewer](../classes/client_fast_prototyping_renderers_propertyview_propertyviewtext.propertyviewrichtextviewer.md)
- [TemplatedPropertyViewRichTextRenderer](../classes/client_fast_prototyping_renderers_propertyview_propertyviewtext.templatedpropertyviewrichtextrenderer.md)

### Functions

- [default](client_fast_prototyping_renderers_propertyview_propertyviewtext.md#default)

## Functions

### default

▸ **default**(`props`: [*IPropertyViewTextRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewtext.ipropertyviewtextrendererprops.md)): *Element*

The property view text renderer

supported args:
- NullComponent: a react component to use rather than the default if the value is null
- nullComponentArgs: an object to pass as props to the null component

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`props` | [*IPropertyViewTextRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewtext.ipropertyviewtextrendererprops.md) | the props passed by the handler   |

**Returns:** *Element*

a react element

Defined in: [client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx:367](https://github.com/onzag/itemize/blob/55e63f2c/client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx#L367)
