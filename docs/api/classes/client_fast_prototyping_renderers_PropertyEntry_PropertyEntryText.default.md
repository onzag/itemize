[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/fast-prototyping/renderers/PropertyEntry/PropertyEntryText](../modules/client_fast_prototyping_renderers_PropertyEntry_PropertyEntryText.md) / default

# Class: default

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryText](../modules/client_fast_prototyping_renderers_PropertyEntry_PropertyEntryText.md).default

The class that does the magic

## Hierarchy

- `PureComponent`\<[`IPropertyEntryTextRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md), `IPropertyEntryTextRendererState`\>

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryText.default.md#constructor)

### Properties

- [context](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryText.default.md#context)
- [currentElementWrappers](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryText.default.md#currentelementwrappers)
- [currentElementWrappersArgs](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryText.default.md#currentelementwrappersargs)
- [currentElementWrappersArgsSrc](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryText.default.md#currentelementwrappersargssrc)
- [currentElementWrappersSrc](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryText.default.md#currentelementwrapperssrc)
- [currentFeatures](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryText.default.md#currentfeatures)
- [currentFeaturesSrc](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryText.default.md#currentfeaturessrc)
- [props](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryText.default.md#props)
- [refs](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryText.default.md#refs)
- [state](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryText.default.md#state)
- [contextType](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryText.default.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryText.default.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryText.default.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryText.default.md#unsafe_componentwillupdate)
- [componentDidCatch](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryText.default.md#componentdidcatch)
- [componentDidMount](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryText.default.md#componentdidmount)
- [componentDidUpdate](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryText.default.md#componentdidupdate)
- [componentWillMount](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryText.default.md#componentwillmount)
- [componentWillReceiveProps](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryText.default.md#componentwillreceiveprops)
- [componentWillUnmount](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryText.default.md#componentwillunmount)
- [componentWillUpdate](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryText.default.md#componentwillupdate)
- [forceUpdate](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryText.default.md#forceupdate)
- [getSnapshotBeforeUpdate](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryText.default.md#getsnapshotbeforeupdate)
- [onBlur](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryText.default.md#onblur)
- [onChange](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryText.default.md#onchange)
- [onFocus](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryText.default.md#onfocus)
- [render](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryText.default.md#render)
- [setState](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryText.default.md#setstate)
- [shouldComponentUpdate](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryText.default.md#shouldcomponentupdate)

## Constructors

### constructor

• **new default**(`props`): [`default`](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryText.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`IPropertyEntryTextRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md) |

#### Returns

[`default`](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryText.default.md)

#### Overrides

React.PureComponent\&lt;IPropertyEntryTextRendererProps, IPropertyEntryTextRendererState\&gt;.constructor

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryText.tsx:143](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryText.tsx#L143)

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

React.PureComponent.context

#### Defined in

node_modules/@types/react/index.d.ts:473

___

### currentElementWrappers

• `Private` **currentElementWrappers**: `ISlateEditorElementWrappers` = `null`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryText.tsx:134](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryText.tsx#L134)

___

### currentElementWrappersArgs

• `Private` **currentElementWrappersArgs**: `any` = `null`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryText.tsx:137](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryText.tsx#L137)

___

### currentElementWrappersArgsSrc

• `Private` **currentElementWrappersArgsSrc**: `any` = `null`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryText.tsx:138](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryText.tsx#L138)

___

### currentElementWrappersSrc

• `Private` **currentElementWrappersSrc**: `any` = `null`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryText.tsx:135](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryText.tsx#L135)

___

### currentFeatures

• `Private` **currentFeatures**: `IFeatureSupportOptions` = `null`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryText.tsx:140](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryText.tsx#L140)

___

### currentFeaturesSrc

• `Private` **currentFeaturesSrc**: `IFeatureSupportOptions` = `null`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryText.tsx:141](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryText.tsx#L141)

___

### props

• `Readonly` **props**: `Readonly`\<[`IPropertyEntryTextRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md)\> & `Readonly`\<\{ `children?`: `ReactNode`  }\>

#### Inherited from

React.PureComponent.props

#### Defined in

node_modules/@types/react/index.d.ts:498

___

### refs

• **refs**: `Object`

**`Deprecated`**

https://legacy.reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs

#### Index signature

▪ [key: `string`]: `ReactInstance`

#### Inherited from

React.PureComponent.refs

#### Defined in

node_modules/@types/react/index.d.ts:504

___

### state

• **state**: `Readonly`\<`IPropertyEntryTextRendererState`\>

#### Inherited from

React.PureComponent.state

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

React.PureComponent.contextType

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

React.PureComponent.UNSAFE\_componentWillMount

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
| `nextProps` | `Readonly`\<[`IPropertyEntryTextRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md)\> |
| `nextContext` | `any` |

#### Returns

`void`

**`Deprecated`**

16.3, use static getDerivedStateFromProps instead

**`See`**

 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props
 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Inherited from

React.PureComponent.UNSAFE\_componentWillReceiveProps

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
| `nextProps` | `Readonly`\<[`IPropertyEntryTextRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md)\> |
| `nextState` | `Readonly`\<`IPropertyEntryTextRendererState`\> |
| `nextContext` | `any` |

#### Returns

`void`

**`Deprecated`**

16.3, use getSnapshotBeforeUpdate instead

**`See`**

 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update
 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Inherited from

React.PureComponent.UNSAFE\_componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:771

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

React.PureComponent.componentDidCatch

#### Defined in

node_modules/@types/react/index.d.ts:640

___

### componentDidMount

▸ **componentDidMount**(): `void`

Called immediately after a component is mounted. Setting state here will trigger re-rendering.

#### Returns

`void`

#### Inherited from

React.PureComponent.componentDidMount

#### Defined in

node_modules/@types/react/index.d.ts:619

___

### componentDidUpdate

▸ **componentDidUpdate**(`prevProps`, `prevState`, `snapshot?`): `void`

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `Readonly`\<[`IPropertyEntryTextRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md)\> |
| `prevState` | `Readonly`\<`IPropertyEntryTextRendererState`\> |
| `snapshot?` | `any` |

#### Returns

`void`

#### Inherited from

React.PureComponent.componentDidUpdate

#### Defined in

node_modules/@types/react/index.d.ts:682

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

React.PureComponent.componentWillMount

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
| `nextProps` | `Readonly`\<[`IPropertyEntryTextRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md)\> |
| `nextContext` | `any` |

#### Returns

`void`

**`Deprecated`**

16.3, use static getDerivedStateFromProps instead; will stop working in React 17

**`See`**

 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props
 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Inherited from

React.PureComponent.componentWillReceiveProps

#### Defined in

node_modules/@types/react/index.d.ts:726

___

### componentWillUnmount

▸ **componentWillUnmount**(): `void`

Called immediately before a component is destroyed. Perform any necessary cleanup in this method, such as
cancelled network requests, or cleaning up any DOM elements created in `componentDidMount`.

#### Returns

`void`

#### Inherited from

React.PureComponent.componentWillUnmount

#### Defined in

node_modules/@types/react/index.d.ts:635

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
| `nextProps` | `Readonly`\<[`IPropertyEntryTextRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md)\> |
| `nextState` | `Readonly`\<`IPropertyEntryTextRendererState`\> |
| `nextContext` | `any` |

#### Returns

`void`

**`Deprecated`**

16.3, use getSnapshotBeforeUpdate instead; will stop working in React 17

**`See`**

 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update
 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Inherited from

React.PureComponent.componentWillUpdate

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

React.PureComponent.forceUpdate

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
| `prevProps` | `Readonly`\<[`IPropertyEntryTextRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md)\> |
| `prevState` | `Readonly`\<`IPropertyEntryTextRendererState`\> |

#### Returns

`any`

#### Inherited from

React.PureComponent.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:676

___

### onBlur

▸ **onBlur**(): `void`

#### Returns

`void`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryText.tsx:160](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryText.tsx#L160)

___

### onChange

▸ **onChange**(`value`, `internalValue`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |
| `internalValue` | `any` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryText.tsx:166](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryText.tsx#L166)

___

### onFocus

▸ **onFocus**(): `void`

#### Returns

`void`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryText.tsx:155](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryText.tsx#L155)

___

### render

▸ **render**(): `Element`

#### Returns

`Element`

#### Overrides

React.PureComponent.render

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryText.tsx:177](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryText.tsx#L177)

___

### setState

▸ **setState**\<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends ``"focused"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `IPropertyEntryTextRendererState` \| (`prevState`: `Readonly`\<`IPropertyEntryTextRendererState`\>, `props`: `Readonly`\<[`IPropertyEntryTextRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md)\>) => `IPropertyEntryTextRendererState` \| `Pick`\<`IPropertyEntryTextRendererState`, `K`\> \| `Pick`\<`IPropertyEntryTextRendererState`, `K`\> |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

React.PureComponent.setState

#### Defined in

node_modules/@types/react/index.d.ts:485

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
| `nextProps` | `Readonly`\<[`IPropertyEntryTextRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md)\> |
| `nextState` | `Readonly`\<`IPropertyEntryTextRendererState`\> |
| `nextContext` | `any` |

#### Returns

`boolean`

#### Inherited from

React.PureComponent.shouldComponentUpdate

#### Defined in

node_modules/@types/react/index.d.ts:630
