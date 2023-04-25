[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/fast-prototyping/renderers/PropertyView/PropertyViewText](../modules/client_fast_prototyping_renderers_PropertyView_PropertyViewText.md) / PropertyViewRichTextViewer

# Class: PropertyViewRichTextViewer

[client/fast-prototyping/renderers/PropertyView/PropertyViewText](../modules/client_fast_prototyping_renderers_PropertyView_PropertyViewText.md).PropertyViewRichTextViewer

The rich text viewer used to view only types of text/html

## Hierarchy

- `Component`<`IPropertyViewRichTextViewerProps`, `IPropertyViewRichTextViewerState`\>

  ↳ **`PropertyViewRichTextViewer`**

## Table of contents

### Constructors

- [constructor](client_fast_prototyping_renderers_PropertyView_PropertyViewText.PropertyViewRichTextViewer.md#constructor)

### Properties

- [cheapdiv](client_fast_prototyping_renderers_PropertyView_PropertyViewText.PropertyViewRichTextViewer.md#cheapdiv)
- [context](client_fast_prototyping_renderers_PropertyView_PropertyViewText.PropertyViewRichTextViewer.md#context)
- [divref](client_fast_prototyping_renderers_PropertyView_PropertyViewText.PropertyViewRichTextViewer.md#divref)
- [props](client_fast_prototyping_renderers_PropertyView_PropertyViewText.PropertyViewRichTextViewer.md#props)
- [refs](client_fast_prototyping_renderers_PropertyView_PropertyViewText.PropertyViewRichTextViewer.md#refs)
- [state](client_fast_prototyping_renderers_PropertyView_PropertyViewText.PropertyViewRichTextViewer.md#state)
- [contextType](client_fast_prototyping_renderers_PropertyView_PropertyViewText.PropertyViewRichTextViewer.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_fast_prototyping_renderers_PropertyView_PropertyViewText.PropertyViewRichTextViewer.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_fast_prototyping_renderers_PropertyView_PropertyViewText.PropertyViewRichTextViewer.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_fast_prototyping_renderers_PropertyView_PropertyViewText.PropertyViewRichTextViewer.md#unsafe_componentwillupdate)
- [attachEvents](client_fast_prototyping_renderers_PropertyView_PropertyViewText.PropertyViewRichTextViewer.md#attachevents)
- [componentDidCatch](client_fast_prototyping_renderers_PropertyView_PropertyViewText.PropertyViewRichTextViewer.md#componentdidcatch)
- [componentDidMount](client_fast_prototyping_renderers_PropertyView_PropertyViewText.PropertyViewRichTextViewer.md#componentdidmount)
- [componentDidUpdate](client_fast_prototyping_renderers_PropertyView_PropertyViewText.PropertyViewRichTextViewer.md#componentdidupdate)
- [componentWillMount](client_fast_prototyping_renderers_PropertyView_PropertyViewText.PropertyViewRichTextViewer.md#componentwillmount)
- [componentWillReceiveProps](client_fast_prototyping_renderers_PropertyView_PropertyViewText.PropertyViewRichTextViewer.md#componentwillreceiveprops)
- [componentWillUnmount](client_fast_prototyping_renderers_PropertyView_PropertyViewText.PropertyViewRichTextViewer.md#componentwillunmount)
- [componentWillUpdate](client_fast_prototyping_renderers_PropertyView_PropertyViewText.PropertyViewRichTextViewer.md#componentwillupdate)
- [forceUpdate](client_fast_prototyping_renderers_PropertyView_PropertyViewText.PropertyViewRichTextViewer.md#forceupdate)
- [getHTML](client_fast_prototyping_renderers_PropertyView_PropertyViewText.PropertyViewRichTextViewer.md#gethtml)
- [getSnapshotBeforeUpdate](client_fast_prototyping_renderers_PropertyView_PropertyViewText.PropertyViewRichTextViewer.md#getsnapshotbeforeupdate)
- [prepareLazyLoader](client_fast_prototyping_renderers_PropertyView_PropertyViewText.PropertyViewRichTextViewer.md#preparelazyloader)
- [render](client_fast_prototyping_renderers_PropertyView_PropertyViewText.PropertyViewRichTextViewer.md#render)
- [setState](client_fast_prototyping_renderers_PropertyView_PropertyViewText.PropertyViewRichTextViewer.md#setstate)
- [shouldComponentUpdate](client_fast_prototyping_renderers_PropertyView_PropertyViewText.PropertyViewRichTextViewer.md#shouldcomponentupdate)
- [updateHTML](client_fast_prototyping_renderers_PropertyView_PropertyViewText.PropertyViewRichTextViewer.md#updatehtml)

## Constructors

### constructor

• **new PropertyViewRichTextViewer**(`props`)

The builder for the rich text viewer in text/html

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `IPropertyViewRichTextViewerProps` | the props |

#### Overrides

React.Component&lt;IPropertyViewRichTextViewerProps, IPropertyViewRichTextViewerState\&gt;.constructor

#### Defined in

[client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx:199](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx#L199)

## Properties

### cheapdiv

• `Private` **cheapdiv**: `HTMLDivElement`

A cheap div we use for transformations

#### Defined in

[client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx:193](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx#L193)

___

### context

• **context**: `any`

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

#### Inherited from

React.Component.context

#### Defined in

node_modules/@types/react/index.d.ts:479

___

### divref

• `Private` **divref**: `RefObject`<`HTMLDivElement`\>

The reference for our div

#### Defined in

[client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx:189](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx#L189)

___

### props

• `Readonly` **props**: `Readonly`<`IPropertyViewRichTextViewerProps`\> & `Readonly`<{ `children?`: `ReactNode`  }\>

#### Inherited from

React.Component.props

#### Defined in

node_modules/@types/react/index.d.ts:504

___

### refs

• **refs**: `Object`

**`deprecated`**
https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs

#### Index signature

▪ [key: `string`]: `ReactInstance`

#### Inherited from

React.Component.refs

#### Defined in

node_modules/@types/react/index.d.ts:510

___

### state

• **state**: `Readonly`<`IPropertyViewRichTextViewerState`\>

#### Inherited from

React.Component.state

#### Defined in

node_modules/@types/react/index.d.ts:505

___

### contextType

▪ `Static` `Optional` **contextType**: `Context`<`any`\>

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

#### Inherited from

React.Component.contextType

#### Defined in

node_modules/@types/react/index.d.ts:461

## Methods

### UNSAFE\_componentWillMount

▸ `Optional` **UNSAFE_componentWillMount**(): `void`

Called immediately before mounting occurs, and before `Component#render`.
Avoid introducing any side-effects or subscriptions in this method.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use componentDidMount or the constructor instead

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Returns

`void`

#### Inherited from

React.Component.UNSAFE\_componentWillMount

#### Defined in

node_modules/@types/react/index.d.ts:717

___

### UNSAFE\_componentWillReceiveProps

▸ `Optional` **UNSAFE_componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

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

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<`IPropertyViewRichTextViewerProps`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.UNSAFE\_componentWillReceiveProps

#### Defined in

node_modules/@types/react/index.d.ts:749

___

### UNSAFE\_componentWillUpdate

▸ `Optional` **UNSAFE_componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use getSnapshotBeforeUpdate instead

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<`IPropertyViewRichTextViewerProps`\> |
| `nextState` | `Readonly`<`IPropertyViewRichTextViewerState`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.UNSAFE\_componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:777

___

### attachEvents

▸ **attachEvents**(): `void`

Attach the events that are required for lazyloading

#### Returns

`void`

#### Defined in

[client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx:286](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx#L286)

___

### componentDidCatch

▸ `Optional` **componentDidCatch**(`error`, `errorInfo`): `void`

Catches exceptions generated in descendant components. Unhandled exceptions will cause
the entire component tree to unmount.

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `Error` |
| `errorInfo` | `ErrorInfo` |

#### Returns

`void`

#### Inherited from

React.Component.componentDidCatch

#### Defined in

node_modules/@types/react/index.d.ts:646

___

### componentDidMount

▸ **componentDidMount**(): `void`

#### Returns

`void`

#### Overrides

React.Component.componentDidMount

#### Defined in

[client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx:354](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx#L354)

___

### componentDidUpdate

▸ **componentDidUpdate**(): `void`

#### Returns

`void`

#### Overrides

React.Component.componentDidUpdate

#### Defined in

[client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx:361](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx#L361)

___

### componentWillMount

▸ `Optional` **componentWillMount**(): `void`

Called immediately before mounting occurs, and before `Component#render`.
Avoid introducing any side-effects or subscriptions in this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use componentDidMount or the constructor instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Returns

`void`

#### Inherited from

React.Component.componentWillMount

#### Defined in

node_modules/@types/react/index.d.ts:703

___

### componentWillReceiveProps

▸ `Optional` **componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling `Component#setState` generally does not trigger this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use static getDerivedStateFromProps instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<`IPropertyViewRichTextViewerProps`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.componentWillReceiveProps

#### Defined in

node_modules/@types/react/index.d.ts:732

___

### componentWillUnmount

▸ `Optional` **componentWillUnmount**(): `void`

Called immediately before a component is destroyed. Perform any necessary cleanup in this method, such as
cancelled network requests, or cleaning up any DOM elements created in `componentDidMount`.

#### Returns

`void`

#### Inherited from

React.Component.componentWillUnmount

#### Defined in

node_modules/@types/react/index.d.ts:641

___

### componentWillUpdate

▸ `Optional` **componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use getSnapshotBeforeUpdate instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<`IPropertyViewRichTextViewerProps`\> |
| `nextState` | `Readonly`<`IPropertyViewRichTextViewerState`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:762

___

### forceUpdate

▸ **forceUpdate**(`callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

React.Component.forceUpdate

#### Defined in

node_modules/@types/react/index.d.ts:496

___

### getHTML

▸ **getHTML**(`html`): `string`

For a given html it will provide the brand new html
that is going to be rendered instead for the inner html

#### Parameters

| Name | Type |
| :------ | :------ |
| `html` | `string` |

#### Returns

`string`

#### Defined in

[client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx:215](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx#L215)

___

### getSnapshotBeforeUpdate

▸ `Optional` **getSnapshotBeforeUpdate**(`prevProps`, `prevState`): `any`

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `Readonly`<`IPropertyViewRichTextViewerProps`\> |
| `prevState` | `Readonly`<`IPropertyViewRichTextViewerState`\> |

#### Returns

`any`

#### Inherited from

React.Component.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:682

___

### prepareLazyLoader

▸ **prepareLazyLoader**(): `void`

Prepares the lazy loader, runs on mounting or changing

#### Returns

`void`

#### Defined in

[client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx:257](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx#L257)

___

### render

▸ **render**(): `Element`

#### Returns

`Element`

#### Overrides

React.Component.render

#### Defined in

[client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx:376](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx#L376)

___

### setState

▸ **setState**<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends ``"html"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `IPropertyViewRichTextViewerState` \| (`prevState`: `Readonly`<`IPropertyViewRichTextViewerState`\>, `props`: `Readonly`<`IPropertyViewRichTextViewerProps`\>) => `IPropertyViewRichTextViewerState` \| `Pick`<`IPropertyViewRichTextViewerState`, `K`\> \| `Pick`<`IPropertyViewRichTextViewerState`, `K`\> |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

React.Component.setState

#### Defined in

node_modules/@types/react/index.d.ts:491

___

### shouldComponentUpdate

▸ **shouldComponentUpdate**(`nextProps`, `nextState`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `IPropertyViewRichTextViewerProps` |
| `nextState` | `IPropertyViewRichTextViewerState` |

#### Returns

`boolean`

#### Overrides

React.Component.shouldComponentUpdate

#### Defined in

[client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx:367](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx#L367)

___

### updateHTML

▸ **updateHTML**(`html`): `void`

updates the html

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `html` | `string` | the html to update for |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx:277](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/renderers/PropertyView/PropertyViewText.tsx#L277)
