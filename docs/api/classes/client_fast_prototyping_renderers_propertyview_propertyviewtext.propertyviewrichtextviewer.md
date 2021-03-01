[](../README.md) / [Exports](../modules.md) / [client/fast-prototyping/renderers/PropertyView/PropertyViewText](../modules/client_fast_prototyping_renderers_propertyview_propertyviewtext.md) / PropertyViewRichTextViewer

# Class: PropertyViewRichTextViewer

[client/fast-prototyping/renderers/PropertyView/PropertyViewText](../modules/client_fast_prototyping_renderers_propertyview_propertyviewtext.md).PropertyViewRichTextViewer

The rich text viewer used to view only types of text/html

## Hierarchy

* *Component*<IPropertyViewRichTextViewerProps, IPropertyViewRichTextViewerState\>

  ↳ **PropertyViewRichTextViewer**

## Table of contents

### Constructors

- [constructor](client_fast_prototyping_renderers_propertyview_propertyviewtext.propertyviewrichtextviewer.md#constructor)

### Properties

- [cheapdiv](client_fast_prototyping_renderers_propertyview_propertyviewtext.propertyviewrichtextviewer.md#cheapdiv)
- [context](client_fast_prototyping_renderers_propertyview_propertyviewtext.propertyviewrichtextviewer.md#context)
- [divref](client_fast_prototyping_renderers_propertyview_propertyviewtext.propertyviewrichtextviewer.md#divref)
- [props](client_fast_prototyping_renderers_propertyview_propertyviewtext.propertyviewrichtextviewer.md#props)
- [refs](client_fast_prototyping_renderers_propertyview_propertyviewtext.propertyviewrichtextviewer.md#refs)
- [state](client_fast_prototyping_renderers_propertyview_propertyviewtext.propertyviewrichtextviewer.md#state)
- [contextType](client_fast_prototyping_renderers_propertyview_propertyviewtext.propertyviewrichtextviewer.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_fast_prototyping_renderers_propertyview_propertyviewtext.propertyviewrichtextviewer.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_fast_prototyping_renderers_propertyview_propertyviewtext.propertyviewrichtextviewer.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_fast_prototyping_renderers_propertyview_propertyviewtext.propertyviewrichtextviewer.md#unsafe_componentwillupdate)
- [attachEvents](client_fast_prototyping_renderers_propertyview_propertyviewtext.propertyviewrichtextviewer.md#attachevents)
- [componentDidCatch](client_fast_prototyping_renderers_propertyview_propertyviewtext.propertyviewrichtextviewer.md#componentdidcatch)
- [componentDidMount](client_fast_prototyping_renderers_propertyview_propertyviewtext.propertyviewrichtextviewer.md#componentdidmount)
- [componentDidUpdate](client_fast_prototyping_renderers_propertyview_propertyviewtext.propertyviewrichtextviewer.md#componentdidupdate)
- [componentWillMount](client_fast_prototyping_renderers_propertyview_propertyviewtext.propertyviewrichtextviewer.md#componentwillmount)
- [componentWillReceiveProps](client_fast_prototyping_renderers_propertyview_propertyviewtext.propertyviewrichtextviewer.md#componentwillreceiveprops)
- [componentWillUnmount](client_fast_prototyping_renderers_propertyview_propertyviewtext.propertyviewrichtextviewer.md#componentwillunmount)
- [componentWillUpdate](client_fast_prototyping_renderers_propertyview_propertyviewtext.propertyviewrichtextviewer.md#componentwillupdate)
- [forceUpdate](client_fast_prototyping_renderers_propertyview_propertyviewtext.propertyviewrichtextviewer.md#forceupdate)
- [getHTML](client_fast_prototyping_renderers_propertyview_propertyviewtext.propertyviewrichtextviewer.md#gethtml)
- [getSnapshotBeforeUpdate](client_fast_prototyping_renderers_propertyview_propertyviewtext.propertyviewrichtextviewer.md#getsnapshotbeforeupdate)
- [prepareLazyLoader](client_fast_prototyping_renderers_propertyview_propertyviewtext.propertyviewrichtextviewer.md#preparelazyloader)
- [render](client_fast_prototyping_renderers_propertyview_propertyviewtext.propertyviewrichtextviewer.md#render)
- [setState](client_fast_prototyping_renderers_propertyview_propertyviewtext.propertyviewrichtextviewer.md#setstate)
- [shouldComponentUpdate](client_fast_prototyping_renderers_propertyview_propertyviewtext.propertyviewrichtextviewer.md#shouldcomponentupdate)
- [updateHTML](client_fast_prototyping_renderers_propertyview_propertyviewtext.propertyviewrichtextviewer.md#updatehtml)

## Constructors

### constructor

\+ **new PropertyViewRichTextViewer**(`props`: IPropertyViewRichTextViewerProps): [*PropertyViewRichTextViewer*](client_fast_prototyping_renderers_propertyview_propertyviewtext.propertyviewrichtextviewer.md)

The builder for the rich text viewer in text/html

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`props` | IPropertyViewRichTextViewerProps | the props    |

**Returns:** [*PropertyViewRichTextViewer*](client_fast_prototyping_renderers_propertyview_propertyviewtext.propertyviewrichtextviewer.md)

Defined in: [client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx:172](https://github.com/onzag/itemize/blob/5fcde7cf/client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx#L172)

## Properties

### cheapdiv

• `Private` **cheapdiv**: HTMLDivElement

A cheap div we use for transformations

Defined in: [client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx:172](https://github.com/onzag/itemize/blob/5fcde7cf/client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx#L172)

___

### context

• **context**: *any*

If using the new style context, re-declare this in your class to be the
`React.ContextType` of your `static contextType`.
Should be used with type annotation or static contextType.

```ts
static contextType = MyContext
// For TS pre-3.7:
context!: React.ContextType<typeof MyContext>
// For TS 3.7 and above:
declare context: React.ContextType<typeof MyContext>
```

**`see`** https://reactjs.org/docs/context.html

Defined in: node_modules/@types/react/index.d.ts:476

___

### divref

• `Private` **divref**: *RefObject*<HTMLDivElement\>

The reference for our div

Defined in: [client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx:168](https://github.com/onzag/itemize/blob/5fcde7cf/client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx#L168)

___

### props

• `Readonly` **props**: *Readonly*<IPropertyViewRichTextViewerProps\> & *Readonly*<{ `children?`: ReactNode  }\>

Defined in: node_modules/@types/react/index.d.ts:501

___

### refs

• **refs**: *object*

**`deprecated`** 
https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs

#### Type declaration:

Defined in: node_modules/@types/react/index.d.ts:507

___

### state

• **state**: *Readonly*<IPropertyViewRichTextViewerState\>

Defined in: node_modules/@types/react/index.d.ts:502

___

### contextType

▪ `Optional` `Static` **contextType**: *Context*<any\>

If set, `this.context` will be set at runtime to the current value of the given Context.

Usage:

```ts
type MyContext = number
const Ctx = React.createContext<MyContext>(0)

class Foo extends React.Component {
  static contextType = Ctx
  context!: React.ContextType<typeof Ctx>
  render () {
    return <>My context's value: {this.context}</>;
  }
}
```

**`see`** https://reactjs.org/docs/context.html#classcontexttype

Defined in: node_modules/@types/react/index.d.ts:458

## Methods

### UNSAFE\_componentWillMount

▸ `Optional`**UNSAFE_componentWillMount**(): *void*

Called immediately before mounting occurs, and before `Component#render`.
Avoid introducing any side-effects or subscriptions in this method.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use componentDidMount or the constructor instead

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:712

___

### UNSAFE\_componentWillReceiveProps

▸ `Optional`**UNSAFE_componentWillReceiveProps**(`nextProps`: *Readonly*<IPropertyViewRichTextViewerProps\>, `nextContext`: *any*): *void*

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling `Component#setState` generally does not trigger this method.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use static getDerivedStateFromProps instead

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters:

Name | Type |
:------ | :------ |
`nextProps` | *Readonly*<IPropertyViewRichTextViewerProps\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:744

___

### UNSAFE\_componentWillUpdate

▸ `Optional`**UNSAFE_componentWillUpdate**(`nextProps`: *Readonly*<IPropertyViewRichTextViewerProps\>, `nextState`: *Readonly*<IPropertyViewRichTextViewerState\>, `nextContext`: *any*): *void*

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use getSnapshotBeforeUpdate instead

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters:

Name | Type |
:------ | :------ |
`nextProps` | *Readonly*<IPropertyViewRichTextViewerProps\> |
`nextState` | *Readonly*<IPropertyViewRichTextViewerState\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:772

___

### attachEvents

▸ **attachEvents**(): *void*

Attach the events that are required for lazyloading

**Returns:** *void*

Defined in: [client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx:265](https://github.com/onzag/itemize/blob/5fcde7cf/client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx#L265)

___

### componentDidCatch

▸ `Optional`**componentDidCatch**(`error`: Error, `errorInfo`: ErrorInfo): *void*

Catches exceptions generated in descendant components. Unhandled exceptions will cause
the entire component tree to unmount.

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error |
`errorInfo` | ErrorInfo |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:641

___

### componentDidMount

▸ **componentDidMount**(): *void*

**Returns:** *void*

Defined in: [client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx:299](https://github.com/onzag/itemize/blob/5fcde7cf/client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx#L299)

___

### componentDidUpdate

▸ **componentDidUpdate**(): *void*

**Returns:** *void*

Defined in: [client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx:306](https://github.com/onzag/itemize/blob/5fcde7cf/client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx#L306)

___

### componentWillMount

▸ `Optional`**componentWillMount**(): *void*

Called immediately before mounting occurs, and before `Component#render`.
Avoid introducing any side-effects or subscriptions in this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use componentDidMount or the constructor instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:698

___

### componentWillReceiveProps

▸ `Optional`**componentWillReceiveProps**(`nextProps`: *Readonly*<IPropertyViewRichTextViewerProps\>, `nextContext`: *any*): *void*

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling `Component#setState` generally does not trigger this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use static getDerivedStateFromProps instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters:

Name | Type |
:------ | :------ |
`nextProps` | *Readonly*<IPropertyViewRichTextViewerProps\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:727

___

### componentWillUnmount

▸ `Optional`**componentWillUnmount**(): *void*

Called immediately before a component is destroyed. Perform any necessary cleanup in this method, such as
cancelled network requests, or cleaning up any DOM elements created in `componentDidMount`.

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:636

___

### componentWillUpdate

▸ `Optional`**componentWillUpdate**(`nextProps`: *Readonly*<IPropertyViewRichTextViewerProps\>, `nextState`: *Readonly*<IPropertyViewRichTextViewerState\>, `nextContext`: *any*): *void*

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use getSnapshotBeforeUpdate instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters:

Name | Type |
:------ | :------ |
`nextProps` | *Readonly*<IPropertyViewRichTextViewerProps\> |
`nextState` | *Readonly*<IPropertyViewRichTextViewerState\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:757

___

### forceUpdate

▸ **forceUpdate**(`callback?`: () => *void*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`callback?` | () => *void* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:493

___

### getHTML

▸ **getHTML**(`html`: *string*): *string*

For a given html it will provide the brand new html
that is going to be rendered instead for the inner html

#### Parameters:

Name | Type |
:------ | :------ |
`html` | *string* |

**Returns:** *string*

Defined in: [client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx:194](https://github.com/onzag/itemize/blob/5fcde7cf/client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx#L194)

___

### getSnapshotBeforeUpdate

▸ `Optional`**getSnapshotBeforeUpdate**(`prevProps`: *Readonly*<IPropertyViewRichTextViewerProps\>, `prevState`: *Readonly*<IPropertyViewRichTextViewerState\>): *any*

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | *Readonly*<IPropertyViewRichTextViewerProps\> |
`prevState` | *Readonly*<IPropertyViewRichTextViewerState\> |

**Returns:** *any*

Defined in: node_modules/@types/react/index.d.ts:677

___

### prepareLazyLoader

▸ **prepareLazyLoader**(): *void*

Prepares the lazy loader, runs on mounting or changing

**Returns:** *void*

Defined in: [client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx:236](https://github.com/onzag/itemize/blob/5fcde7cf/client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx#L236)

___

### render

▸ **render**(): *Element*

**Returns:** *Element*

Defined in: [client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx:321](https://github.com/onzag/itemize/blob/5fcde7cf/client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx#L321)

___

### setState

▸ **setState**<K\>(`state`: IPropertyViewRichTextViewerState \| (`prevState`: *Readonly*<IPropertyViewRichTextViewerState\>, `props`: *Readonly*<IPropertyViewRichTextViewerProps\>) => IPropertyViewRichTextViewerState \| *Pick*<IPropertyViewRichTextViewerState, K\> \| *Pick*<IPropertyViewRichTextViewerState, K\>, `callback?`: () => *void*): *void*

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | *html* |

#### Parameters:

Name | Type |
:------ | :------ |
`state` | IPropertyViewRichTextViewerState \| (`prevState`: *Readonly*<IPropertyViewRichTextViewerState\>, `props`: *Readonly*<IPropertyViewRichTextViewerProps\>) => IPropertyViewRichTextViewerState \| *Pick*<IPropertyViewRichTextViewerState, K\> \| *Pick*<IPropertyViewRichTextViewerState, K\> |
`callback?` | () => *void* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:488

___

### shouldComponentUpdate

▸ **shouldComponentUpdate**(`nextProps`: IPropertyViewRichTextViewerProps, `nextState`: IPropertyViewRichTextViewerState): *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`nextProps` | IPropertyViewRichTextViewerProps |
`nextState` | IPropertyViewRichTextViewerState |

**Returns:** *boolean*

Defined in: [client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx:312](https://github.com/onzag/itemize/blob/5fcde7cf/client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx#L312)

___

### updateHTML

▸ **updateHTML**(`html`: *string*): *void*

updates the html

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`html` | *string* | the html to update for    |

**Returns:** *void*

Defined in: [client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx:256](https://github.com/onzag/itemize/blob/5fcde7cf/client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx#L256)
