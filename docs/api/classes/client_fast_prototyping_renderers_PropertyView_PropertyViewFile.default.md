[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/fast-prototyping/renderers/PropertyView/PropertyViewFile](../modules/client_fast_prototyping_renderers_PropertyView_PropertyViewFile.md) / default

# Class: default

[client/fast-prototyping/renderers/PropertyView/PropertyViewFile](../modules/client_fast_prototyping_renderers_PropertyView_PropertyViewFile.md).default

The property view file renderer will show a file, and if it's an image
it will show as an image with all lazyloading and all

supported args:
- NullComponent: a react component to use rather than the default if the value is null
- nullComponentArgs: an object to pass as props to the null component
- nullNode: a react node to render instead of the default when the value is null
- imageClassName: the image class name for the img tag when an image is available
- imageSx: the image sx for the img tag
- imageSizes: the image sizes for the sizes attribute for the image, default 70vw
- lazyLoad: whether to use lazyloading for images alone

## Hierarchy

- `Component`\<[`IPropertyViewFileRendererProps`](../interfaces/client_internal_components_PropertyView_PropertyViewFile.IPropertyViewFileRendererProps.md), `IPropertyViewFileRendererState`\>

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](client_fast_prototyping_renderers_PropertyView_PropertyViewFile.default.md#constructor)

### Properties

- [context](client_fast_prototyping_renderers_PropertyView_PropertyViewFile.default.md#context)
- [io](client_fast_prototyping_renderers_PropertyView_PropertyViewFile.default.md#io)
- [isScrollEventAttached](client_fast_prototyping_renderers_PropertyView_PropertyViewFile.default.md#isscrolleventattached)
- [props](client_fast_prototyping_renderers_PropertyView_PropertyViewFile.default.md#props)
- [refImg](client_fast_prototyping_renderers_PropertyView_PropertyViewFile.default.md#refimg)
- [refs](client_fast_prototyping_renderers_PropertyView_PropertyViewFile.default.md#refs)
- [state](client_fast_prototyping_renderers_PropertyView_PropertyViewFile.default.md#state)
- [contextType](client_fast_prototyping_renderers_PropertyView_PropertyViewFile.default.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_fast_prototyping_renderers_PropertyView_PropertyViewFile.default.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_fast_prototyping_renderers_PropertyView_PropertyViewFile.default.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_fast_prototyping_renderers_PropertyView_PropertyViewFile.default.md#unsafe_componentwillupdate)
- [attachScrollEvent](client_fast_prototyping_renderers_PropertyView_PropertyViewFile.default.md#attachscrollevent)
- [checkWhetherInViewOldSchool](client_fast_prototyping_renderers_PropertyView_PropertyViewFile.default.md#checkwhetherinviewoldschool)
- [componentDidCatch](client_fast_prototyping_renderers_PropertyView_PropertyViewFile.default.md#componentdidcatch)
- [componentDidMount](client_fast_prototyping_renderers_PropertyView_PropertyViewFile.default.md#componentdidmount)
- [componentDidUpdate](client_fast_prototyping_renderers_PropertyView_PropertyViewFile.default.md#componentdidupdate)
- [componentWillMount](client_fast_prototyping_renderers_PropertyView_PropertyViewFile.default.md#componentwillmount)
- [componentWillReceiveProps](client_fast_prototyping_renderers_PropertyView_PropertyViewFile.default.md#componentwillreceiveprops)
- [componentWillUnmount](client_fast_prototyping_renderers_PropertyView_PropertyViewFile.default.md#componentwillunmount)
- [componentWillUpdate](client_fast_prototyping_renderers_PropertyView_PropertyViewFile.default.md#componentwillupdate)
- [forceUpdate](client_fast_prototyping_renderers_PropertyView_PropertyViewFile.default.md#forceupdate)
- [getSnapshotBeforeUpdate](client_fast_prototyping_renderers_PropertyView_PropertyViewFile.default.md#getsnapshotbeforeupdate)
- [removeIntersectionObserver](client_fast_prototyping_renderers_PropertyView_PropertyViewFile.default.md#removeintersectionobserver)
- [removeScrollEvent](client_fast_prototyping_renderers_PropertyView_PropertyViewFile.default.md#removescrollevent)
- [render](client_fast_prototyping_renderers_PropertyView_PropertyViewFile.default.md#render)
- [setState](client_fast_prototyping_renderers_PropertyView_PropertyViewFile.default.md#setstate)
- [setupIntersectionObserver](client_fast_prototyping_renderers_PropertyView_PropertyViewFile.default.md#setupintersectionobserver)
- [shouldComponentUpdate](client_fast_prototyping_renderers_PropertyView_PropertyViewFile.default.md#shouldcomponentupdate)

## Constructors

### constructor

• **new default**(`props`): [`default`](client_fast_prototyping_renderers_PropertyView_PropertyViewFile.default.md)

Builds the renderer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertyViewFileRendererProps`](../interfaces/client_internal_components_PropertyView_PropertyViewFile.IPropertyViewFileRendererProps.md) | the handler passed props |

#### Returns

[`default`](client_fast_prototyping_renderers_PropertyView_PropertyViewFile.default.md)

#### Overrides

React.Component\&lt;IPropertyViewFileRendererProps, IPropertyViewFileRendererState\&gt;.constructor

#### Defined in

[client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx:56](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx#L56)

## Properties

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

**`See`**

https://react.dev/reference/react/Component#context

#### Inherited from

React.Component.context

#### Defined in

node_modules/@types/react/index.d.ts:473

___

### io

• `Private` **io**: `IntersectionObserver`

Intersection observer to see when the element pops into view, if necessary

#### Defined in

[client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx:50](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx#L50)

___

### isScrollEventAttached

• `Private` **isScrollEventAttached**: `boolean` = `false`

whether the scroll event is actually attached

#### Defined in

[client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx:42](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx#L42)

___

### props

• `Readonly` **props**: `Readonly`\<[`IPropertyViewFileRendererProps`](../interfaces/client_internal_components_PropertyView_PropertyViewFile.IPropertyViewFileRendererProps.md)\> & `Readonly`\<\{ `children?`: `ReactNode`  }\>

#### Inherited from

React.Component.props

#### Defined in

node_modules/@types/react/index.d.ts:498

___

### refImg

• `Private` **refImg**: `RefObject`\<`HTMLImageElement`\>

The image reference

#### Defined in

[client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx:46](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx#L46)

___

### refs

• **refs**: `Object`

**`Deprecated`**

https://legacy.reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs

#### Index signature

▪ [key: `string`]: `ReactInstance`

#### Inherited from

React.Component.refs

#### Defined in

node_modules/@types/react/index.d.ts:504

___

### state

• **state**: `Readonly`\<`IPropertyViewFileRendererState`\>

#### Inherited from

React.Component.state

#### Defined in

node_modules/@types/react/index.d.ts:499

___

### contextType

▪ `Static` `Optional` **contextType**: `Context`\<`any`\>

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

**`See`**

https://react.dev/reference/react/Component#static-contexttype

#### Inherited from

React.Component.contextType

#### Defined in

node_modules/@types/react/index.d.ts:455

## Methods

### UNSAFE\_componentWillMount

▸ **UNSAFE_componentWillMount**(): `void`

Called immediately before mounting occurs, and before `Component#render`.
Avoid introducing any side-effects or subscriptions in this method.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

#### Returns

`void`

**`Deprecated`**

16.3, use componentDidMount or the constructor instead

**`See`**

 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state
 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Inherited from

React.Component.UNSAFE\_componentWillMount

#### Defined in

node_modules/@types/react/index.d.ts:711

___

### UNSAFE\_componentWillReceiveProps

▸ **UNSAFE_componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling `Component#setState` generally does not trigger this method.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`\<[`IPropertyViewFileRendererProps`](../interfaces/client_internal_components_PropertyView_PropertyViewFile.IPropertyViewFileRendererProps.md)\> |
| `nextContext` | `any` |

#### Returns

`void`

**`Deprecated`**

16.3, use static getDerivedStateFromProps instead

**`See`**

 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props
 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Inherited from

React.Component.UNSAFE\_componentWillReceiveProps

#### Defined in

node_modules/@types/react/index.d.ts:743

___

### UNSAFE\_componentWillUpdate

▸ **UNSAFE_componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`\<[`IPropertyViewFileRendererProps`](../interfaces/client_internal_components_PropertyView_PropertyViewFile.IPropertyViewFileRendererProps.md)\> |
| `nextState` | `Readonly`\<`IPropertyViewFileRendererState`\> |
| `nextContext` | `any` |

#### Returns

`void`

**`Deprecated`**

16.3, use getSnapshotBeforeUpdate instead

**`See`**

 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update
 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Inherited from

React.Component.UNSAFE\_componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:771

___

### attachScrollEvent

▸ **attachScrollEvent**(): `void`

Attach the scroll event, only necessary for traditional
lazyloading

#### Returns

`void`

#### Defined in

[client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx:73](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx#L73)

___

### checkWhetherInViewOldSchool

▸ **checkWhetherInViewOldSchool**(): `void`

Old school way to check if an element is in view

#### Returns

`void`

#### Defined in

[client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx:95](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx#L95)

___

### componentDidCatch

▸ **componentDidCatch**(`error`, `errorInfo`): `void`

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

node_modules/@types/react/index.d.ts:640

___

### componentDidMount

▸ **componentDidMount**(): `void`

Now when the element mounts

#### Returns

`void`

#### Overrides

React.Component.componentDidMount

#### Defined in

[client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx:153](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx#L153)

___

### componentDidUpdate

▸ **componentDidUpdate**(`prevProps`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | [`IPropertyViewFileRendererProps`](../interfaces/client_internal_components_PropertyView_PropertyViewFile.IPropertyViewFileRendererProps.md) |

#### Returns

`void`

#### Overrides

React.Component.componentDidUpdate

#### Defined in

[client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx:172](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx#L172)

___

### componentWillMount

▸ **componentWillMount**(): `void`

Called immediately before mounting occurs, and before `Component#render`.
Avoid introducing any side-effects or subscriptions in this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

#### Returns

`void`

**`Deprecated`**

16.3, use componentDidMount or the constructor instead; will stop working in React 17

**`See`**

 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state
 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Inherited from

React.Component.componentWillMount

#### Defined in

node_modules/@types/react/index.d.ts:697

___

### componentWillReceiveProps

▸ **componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling `Component#setState` generally does not trigger this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`\<[`IPropertyViewFileRendererProps`](../interfaces/client_internal_components_PropertyView_PropertyViewFile.IPropertyViewFileRendererProps.md)\> |
| `nextContext` | `any` |

#### Returns

`void`

**`Deprecated`**

16.3, use static getDerivedStateFromProps instead; will stop working in React 17

**`See`**

 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props
 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Inherited from

React.Component.componentWillReceiveProps

#### Defined in

node_modules/@types/react/index.d.ts:726

___

### componentWillUnmount

▸ **componentWillUnmount**(): `void`

#### Returns

`void`

#### Overrides

React.Component.componentWillUnmount

#### Defined in

[client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx:182](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx#L182)

___

### componentWillUpdate

▸ **componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`\<[`IPropertyViewFileRendererProps`](../interfaces/client_internal_components_PropertyView_PropertyViewFile.IPropertyViewFileRendererProps.md)\> |
| `nextState` | `Readonly`\<`IPropertyViewFileRendererState`\> |
| `nextContext` | `any` |

#### Returns

`void`

**`Deprecated`**

16.3, use getSnapshotBeforeUpdate instead; will stop working in React 17

**`See`**

 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update
 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Inherited from

React.Component.componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:756

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

node_modules/@types/react/index.d.ts:490

___

### getSnapshotBeforeUpdate

▸ **getSnapshotBeforeUpdate**(`prevProps`, `prevState`): `any`

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `Readonly`\<[`IPropertyViewFileRendererProps`](../interfaces/client_internal_components_PropertyView_PropertyViewFile.IPropertyViewFileRendererProps.md)\> |
| `prevState` | `Readonly`\<`IPropertyViewFileRendererState`\> |

#### Returns

`any`

#### Inherited from

React.Component.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:676

___

### removeIntersectionObserver

▸ **removeIntersectionObserver**(): `void`

Remove the intersection observer if it exist
it might have never been triggered

#### Returns

`void`

#### Defined in

[client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx:144](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx#L144)

___

### removeScrollEvent

▸ **removeScrollEvent**(): `void`

Removes the attached scroll event for lazyloading

#### Returns

`void`

#### Defined in

[client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx:85](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx#L85)

___

### render

▸ **render**(): `any`

#### Returns

`any`

#### Overrides

React.Component.render

#### Defined in

[client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx:186](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx#L186)

___

### setState

▸ **setState**\<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends ``"loaded"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `IPropertyViewFileRendererState` \| (`prevState`: `Readonly`\<`IPropertyViewFileRendererState`\>, `props`: `Readonly`\<[`IPropertyViewFileRendererProps`](../interfaces/client_internal_components_PropertyView_PropertyViewFile.IPropertyViewFileRendererProps.md)\>) => `IPropertyViewFileRendererState` \| `Pick`\<`IPropertyViewFileRendererState`, `K`\> \| `Pick`\<`IPropertyViewFileRendererState`, `K`\> |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

React.Component.setState

#### Defined in

node_modules/@types/react/index.d.ts:485

___

### setupIntersectionObserver

▸ **setupIntersectionObserver**(): `void`

Intersection observer way to check if the image is in view

#### Returns

`void`

#### Defined in

[client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx:116](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx#L116)

___

### shouldComponentUpdate

▸ **shouldComponentUpdate**(`nextProps`, `nextState`, `nextContext`): `boolean`

Called to determine whether the change in props and state should trigger a re-render.

`Component` always returns true.
`PureComponent` implements a shallow comparison on props and state and returns true if any
props or states have changed.

If false is returned, `Component#render`, `componentWillUpdate`
and `componentDidUpdate` will not be called.

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`\<[`IPropertyViewFileRendererProps`](../interfaces/client_internal_components_PropertyView_PropertyViewFile.IPropertyViewFileRendererProps.md)\> |
| `nextState` | `Readonly`\<`IPropertyViewFileRendererState`\> |
| `nextContext` | `any` |

#### Returns

`boolean`

#### Inherited from

React.Component.shouldComponentUpdate

#### Defined in

node_modules/@types/react/index.d.ts:630
