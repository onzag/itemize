[](../README.md) / [Exports](../modules.md) / client/providers/renderer

# Module: client/providers/renderer

Specifies how renderers are to be provided down the app in order
to render the app

## Table of contents

### Interfaces

- [IRendererContext](../interfaces/client_providers_renderer.irenderercontext.md)

### Variables

- [RendererContext](client_providers_renderer.md#renderercontext)

### Functions

- [default](client_providers_renderer.md#default)

## Variables

### RendererContext

• `Const` **RendererContext**: *Context*<[*IRendererContext*](../interfaces/client_providers_renderer.irenderercontext.md)\>

This is the renderer context that contains the renderer context
value, by default is null, it must be provided or itemize
will crash any time when rendering

Defined in: [client/providers/renderer.tsx:162](https://github.com/onzag/itemize/blob/3efa2a4a/client/providers/renderer.tsx#L162)

## Functions

### default

▸ **default**(`props`: IRendererProviderProps): *Element*

Allows to create a rendering context for usage with the view, there's a renderer
provider at the root of the itemize app and that's the preferred way to pass a renderer
however it is totally possible to define a different renderer context under the app
even when it's recommended to rather use the renderer property from the Entry, and View

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`props` | IRendererProviderProps | the provider props   |

**Returns:** *Element*

a react element

Defined in: [client/providers/renderer.tsx:180](https://github.com/onzag/itemize/blob/3efa2a4a/client/providers/renderer.tsx#L180)
