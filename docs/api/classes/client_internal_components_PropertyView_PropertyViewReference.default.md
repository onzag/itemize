[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/components/PropertyView/PropertyViewReference](../modules/client_internal_components_PropertyView_PropertyViewReference.md) / default

# Class: default

[client/internal/components/PropertyView/PropertyViewReference](../modules/client_internal_components_PropertyView_PropertyViewReference.md).default

The property view reference handler, note how unlike most
other handlers this handler uses the property view simple renderer
in order to render its value

## Hierarchy

- `Component`<[`IPropertyViewHandlerProps`](../interfaces/client_internal_components_PropertyView.IPropertyViewHandlerProps.md)<[`IPropertyViewSimpleRendererProps`](../interfaces/client_internal_components_PropertyView_PropertyViewSimple.IPropertyViewSimpleRendererProps.md)\>, `IPropertyViewReferenceState`\>

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](client_internal_components_PropertyView_PropertyViewReference.default.md#constructor)

### Properties

- [context](client_internal_components_PropertyView_PropertyViewReference.default.md#context)
- [currentlyFindingValueFor](client_internal_components_PropertyView_PropertyViewReference.default.md#currentlyfindingvaluefor)
- [props](client_internal_components_PropertyView_PropertyViewReference.default.md#props)
- [refs](client_internal_components_PropertyView_PropertyViewReference.default.md#refs)
- [ssrServerOnlyValue](client_internal_components_PropertyView_PropertyViewReference.default.md#ssrserveronlyvalue)
- [state](client_internal_components_PropertyView_PropertyViewReference.default.md#state)
- [contextType](client_internal_components_PropertyView_PropertyViewReference.default.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_internal_components_PropertyView_PropertyViewReference.default.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_internal_components_PropertyView_PropertyViewReference.default.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_internal_components_PropertyView_PropertyViewReference.default.md#unsafe_componentwillupdate)
- [beforeSSRRender](client_internal_components_PropertyView_PropertyViewReference.default.md#beforessrrender)
- [componentDidCatch](client_internal_components_PropertyView_PropertyViewReference.default.md#componentdidcatch)
- [componentDidMount](client_internal_components_PropertyView_PropertyViewReference.default.md#componentdidmount)
- [componentDidUpdate](client_internal_components_PropertyView_PropertyViewReference.default.md#componentdidupdate)
- [componentWillMount](client_internal_components_PropertyView_PropertyViewReference.default.md#componentwillmount)
- [componentWillReceiveProps](client_internal_components_PropertyView_PropertyViewReference.default.md#componentwillreceiveprops)
- [componentWillUnmount](client_internal_components_PropertyView_PropertyViewReference.default.md#componentwillunmount)
- [componentWillUpdate](client_internal_components_PropertyView_PropertyViewReference.default.md#componentwillupdate)
- [findCurrentStrValue](client_internal_components_PropertyView_PropertyViewReference.default.md#findcurrentstrvalue)
- [forceUpdate](client_internal_components_PropertyView_PropertyViewReference.default.md#forceupdate)
- [getSSRFoundValue](client_internal_components_PropertyView_PropertyViewReference.default.md#getssrfoundvalue)
- [getSnapshotBeforeUpdate](client_internal_components_PropertyView_PropertyViewReference.default.md#getsnapshotbeforeupdate)
- [getSpecialData](client_internal_components_PropertyView_PropertyViewReference.default.md#getspecialdata)
- [render](client_internal_components_PropertyView_PropertyViewReference.default.md#render)
- [setState](client_internal_components_PropertyView_PropertyViewReference.default.md#setstate)
- [shouldComponentUpdate](client_internal_components_PropertyView_PropertyViewReference.default.md#shouldcomponentupdate)

## Constructors

### constructor

• **new default**(`props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`IPropertyViewHandlerProps`](../interfaces/client_internal_components_PropertyView.IPropertyViewHandlerProps.md)<[`IPropertyViewSimpleRendererProps`](../interfaces/client_internal_components_PropertyView_PropertyViewSimple.IPropertyViewSimpleRendererProps.md)\> |

#### Overrides

React.Component&lt;IPropertyViewHandlerProps&lt;IPropertyViewSimpleRendererProps\&gt;, IPropertyViewReferenceState\&gt;.constructor

#### Defined in

[client/internal/components/PropertyView/PropertyViewReference.tsx:49](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyView/PropertyViewReference.tsx#L49)

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

**`see`** https://reactjs.org/docs/context.html

#### Inherited from

React.Component.context

#### Defined in

node_modules/@types/react/index.d.ts:479

___

### currentlyFindingValueFor

• `Private` **currentlyFindingValueFor**: [`string`, `string`]

#### Defined in

[client/internal/components/PropertyView/PropertyViewReference.tsx:46](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyView/PropertyViewReference.tsx#L46)

___

### props

• `Readonly` **props**: `Readonly`<[`IPropertyViewHandlerProps`](../interfaces/client_internal_components_PropertyView.IPropertyViewHandlerProps.md)<[`IPropertyViewSimpleRendererProps`](../interfaces/client_internal_components_PropertyView_PropertyViewSimple.IPropertyViewSimpleRendererProps.md)\>\> & `Readonly`<{ `children?`: `ReactNode`  }\>

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

### ssrServerOnlyValue

• `Private` **ssrServerOnlyValue**: `string`

#### Defined in

[client/internal/components/PropertyView/PropertyViewReference.tsx:47](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyView/PropertyViewReference.tsx#L47)

___

### state

• **state**: `Readonly`<`IPropertyViewReferenceState`\>

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
| `nextProps` | `Readonly`<[`IPropertyViewHandlerProps`](../interfaces/client_internal_components_PropertyView.IPropertyViewHandlerProps.md)<[`IPropertyViewSimpleRendererProps`](../interfaces/client_internal_components_PropertyView_PropertyViewSimple.IPropertyViewSimpleRendererProps.md)\>\> |
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
| `nextProps` | `Readonly`<[`IPropertyViewHandlerProps`](../interfaces/client_internal_components_PropertyView.IPropertyViewHandlerProps.md)<[`IPropertyViewSimpleRendererProps`](../interfaces/client_internal_components_PropertyView_PropertyViewSimple.IPropertyViewSimpleRendererProps.md)\>\> |
| `nextState` | `Readonly`<`IPropertyViewReferenceState`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.UNSAFE\_componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:777

___

### beforeSSRRender

▸ **beforeSSRRender**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/components/PropertyView/PropertyViewReference.tsx:167](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyView/PropertyViewReference.tsx#L167)

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

[client/internal/components/PropertyView/PropertyViewReference.tsx:65](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyView/PropertyViewReference.tsx#L65)

___

### componentDidUpdate

▸ **componentDidUpdate**(`prevProps`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | [`IPropertyViewHandlerProps`](../interfaces/client_internal_components_PropertyView.IPropertyViewHandlerProps.md)<[`IPropertyViewSimpleRendererProps`](../interfaces/client_internal_components_PropertyView_PropertyViewSimple.IPropertyViewSimpleRendererProps.md)\> |

#### Returns

`void`

#### Overrides

React.Component.componentDidUpdate

#### Defined in

[client/internal/components/PropertyView/PropertyViewReference.tsx:278](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyView/PropertyViewReference.tsx#L278)

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
| `nextProps` | `Readonly`<[`IPropertyViewHandlerProps`](../interfaces/client_internal_components_PropertyView.IPropertyViewHandlerProps.md)<[`IPropertyViewSimpleRendererProps`](../interfaces/client_internal_components_PropertyView_PropertyViewSimple.IPropertyViewSimpleRendererProps.md)\>\> |
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
| `nextProps` | `Readonly`<[`IPropertyViewHandlerProps`](../interfaces/client_internal_components_PropertyView.IPropertyViewHandlerProps.md)<[`IPropertyViewSimpleRendererProps`](../interfaces/client_internal_components_PropertyView_PropertyViewSimple.IPropertyViewSimpleRendererProps.md)\>\> |
| `nextState` | `Readonly`<`IPropertyViewReferenceState`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:762

___

### findCurrentStrValue

▸ **findCurrentStrValue**(`forId`, `forVersion`): `Promise`<`void`\>

Finds the current string value for the given id and version

#### Parameters

| Name | Type |
| :------ | :------ |
| `forId` | `string` |
| `forVersion` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/components/PropertyView/PropertyViewReference.tsx:195](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyView/PropertyViewReference.tsx#L195)

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

### getSSRFoundValue

▸ **getSSRFoundValue**(`forId`, `forVersion`): `string`

Provides the SSR found value if any found and if SSR active

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `forId` | `string` | for the given id |
| `forVersion` | `string` | for the given version |

#### Returns

`string`

a string value or null if nothing found

#### Defined in

[client/internal/components/PropertyView/PropertyViewReference.tsx:133](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyView/PropertyViewReference.tsx#L133)

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
| `prevProps` | `Readonly`<[`IPropertyViewHandlerProps`](../interfaces/client_internal_components_PropertyView.IPropertyViewHandlerProps.md)<[`IPropertyViewSimpleRendererProps`](../interfaces/client_internal_components_PropertyView_PropertyViewSimple.IPropertyViewSimpleRendererProps.md)\>\> |
| `prevState` | `Readonly`<`IPropertyViewReferenceState`\> |

#### Returns

`any`

#### Inherited from

React.Component.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:682

___

### getSpecialData

▸ **getSpecialData**(): [[`default`](base_Root_Module_ItemDefinition.default.md), [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)]

Provides the special data for the reference

#### Returns

[[`default`](base_Root_Module_ItemDefinition.default.md), [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)]

an array where 0 is the item definition that is target, 1 is the property definition
we are using for display

#### Defined in

[client/internal/components/PropertyView/PropertyViewReference.tsx:98](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyView/PropertyViewReference.tsx#L98)

___

### render

▸ **render**(): `Element`

#### Returns

`Element`

#### Overrides

React.Component.render

#### Defined in

[client/internal/components/PropertyView/PropertyViewReference.tsx:337](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyView/PropertyViewReference.tsx#L337)

___

### setState

▸ **setState**<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `IPropertyViewReferenceState` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `IPropertyViewReferenceState` \| (`prevState`: `Readonly`<`IPropertyViewReferenceState`\>, `props`: `Readonly`<[`IPropertyViewHandlerProps`](../interfaces/client_internal_components_PropertyView.IPropertyViewHandlerProps.md)<[`IPropertyViewSimpleRendererProps`](../interfaces/client_internal_components_PropertyView_PropertyViewSimple.IPropertyViewSimpleRendererProps.md)\>\>) => `IPropertyViewReferenceState` \| `Pick`<`IPropertyViewReferenceState`, `K`\> \| `Pick`<`IPropertyViewReferenceState`, `K`\> |
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
| `nextProps` | [`IPropertyViewHandlerProps`](../interfaces/client_internal_components_PropertyView.IPropertyViewHandlerProps.md)<[`IPropertyViewSimpleRendererProps`](../interfaces/client_internal_components_PropertyView_PropertyViewSimple.IPropertyViewSimpleRendererProps.md)\> |
| `nextState` | `IPropertyViewReferenceState` |

#### Returns

`boolean`

#### Overrides

React.Component.shouldComponentUpdate

#### Defined in

[client/internal/components/PropertyView/PropertyViewReference.tsx:319](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyView/PropertyViewReference.tsx#L319)
