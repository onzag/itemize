[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/fast-prototyping/renderers/PropertyView/PropertyViewText

# Module: client/fast-prototyping/renderers/PropertyView/PropertyViewText

Contains the property view text renderer, another large
thing used for text/plain or text/html text, but not unsubtyped
text

## Table of contents

### Classes

- [PropertyViewRichTextViewer](../classes/client_fast_prototyping_renderers_PropertyView_PropertyViewText.PropertyViewRichTextViewer.md)
- [TemplatedPropertyViewRichTextRenderer](../classes/client_fast_prototyping_renderers_PropertyView_PropertyViewText.TemplatedPropertyViewRichTextRenderer.md)

### Functions

- [default](client_fast_prototyping_renderers_PropertyView_PropertyViewText.md#default)

## Functions

### default

▸ **default**(`props`): `any`

The property view text renderer

supported args:
- NullComponent: a react component to use rather than the default if the value is null
- nullComponentArgs: an object to pass as props to the null component
- nullNode: a react node to render instead of the default when the value is null

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertyViewTextRendererProps`](../interfaces/client_internal_components_PropertyView_PropertyViewText.IPropertyViewTextRendererProps.md) | the props passed by the handler |

#### Returns

`any`

a react element

#### Defined in

[client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx:445](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx#L445)
