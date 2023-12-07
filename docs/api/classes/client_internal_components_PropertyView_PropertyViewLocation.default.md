[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/components/PropertyView/PropertyViewLocation](../modules/client_internal_components_PropertyView_PropertyViewLocation.md) / default

# Class: default

[client/internal/components/PropertyView/PropertyViewLocation](../modules/client_internal_components_PropertyView_PropertyViewLocation.md).default

The property view location handler class

## Hierarchy

- `Component`<[`IPropertyViewHandlerProps`](../interfaces/client_internal_components_PropertyView.IPropertyViewHandlerProps.md)<[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md), [`IPropertyViewLocationRendererProps`](../interfaces/client_internal_components_PropertyView_PropertyViewLocation.IPropertyViewLocationRendererProps.md)\>, `IPropertyViewLocationRendererState`\>

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](client_internal_components_PropertyView_PropertyViewLocation.default.md#constructor)

### Properties

- [context](client_internal_components_PropertyView_PropertyViewLocation.default.md#context)
- [props](client_internal_components_PropertyView_PropertyViewLocation.default.md#props)
- [refs](client_internal_components_PropertyView_PropertyViewLocation.default.md#refs)
- [state](client_internal_components_PropertyView_PropertyViewLocation.default.md#state)
- [contextType](client_internal_components_PropertyView_PropertyViewLocation.default.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_internal_components_PropertyView_PropertyViewLocation.default.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_internal_components_PropertyView_PropertyViewLocation.default.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_internal_components_PropertyView_PropertyViewLocation.default.md#unsafe_componentwillupdate)
- [componentDidCatch](client_internal_components_PropertyView_PropertyViewLocation.default.md#componentdidcatch)
- [componentDidMount](client_internal_components_PropertyView_PropertyViewLocation.default.md#componentdidmount)
- [componentDidUpdate](client_internal_components_PropertyView_PropertyViewLocation.default.md#componentdidupdate)
- [componentWillMount](client_internal_components_PropertyView_PropertyViewLocation.default.md#componentwillmount)
- [componentWillReceiveProps](client_internal_components_PropertyView_PropertyViewLocation.default.md#componentwillreceiveprops)
- [componentWillUnmount](client_internal_components_PropertyView_PropertyViewLocation.default.md#componentwillunmount)
- [componentWillUpdate](client_internal_components_PropertyView_PropertyViewLocation.default.md#componentwillupdate)
- [forceUpdate](client_internal_components_PropertyView_PropertyViewLocation.default.md#forceupdate)
- [getSnapshotBeforeUpdate](client_internal_components_PropertyView_PropertyViewLocation.default.md#getsnapshotbeforeupdate)
- [onResetViewportCenter](client_internal_components_PropertyView_PropertyViewLocation.default.md#onresetviewportcenter)
- [onViewportChange](client_internal_components_PropertyView_PropertyViewLocation.default.md#onviewportchange)
- [render](client_internal_components_PropertyView_PropertyViewLocation.default.md#render)
- [setState](client_internal_components_PropertyView_PropertyViewLocation.default.md#setstate)
- [shouldComponentUpdate](client_internal_components_PropertyView_PropertyViewLocation.default.md#shouldcomponentupdate)

## Constructors

### constructor

• **new default**(`props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`IPropertyViewHandlerProps`](../interfaces/client_internal_components_PropertyView.IPropertyViewHandlerProps.md)<[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md), [`IPropertyViewLocationRendererProps`](../interfaces/client_internal_components_PropertyView_PropertyViewLocation.IPropertyViewLocationRendererProps.md)\> |

#### Overrides

React.Component&lt;
  IPropertyViewHandlerProps&lt;IPropertyDefinitionSupportedLocationType, IPropertyViewLocationRendererProps\&gt;,
  IPropertyViewLocationRendererState
\&gt;.constructor

#### Defined in

[client/internal/components/PropertyView/PropertyViewLocation.tsx:72](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyView/PropertyViewLocation.tsx#L72)

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

### props

• `Readonly` **props**: `Readonly`<[`IPropertyViewHandlerProps`](../interfaces/client_internal_components_PropertyView.IPropertyViewHandlerProps.md)<[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md), [`IPropertyViewLocationRendererProps`](../interfaces/client_internal_components_PropertyView_PropertyViewLocation.IPropertyViewLocationRendererProps.md)\>\> & `Readonly`<{ `children?`: `ReactNode`  }\>

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

• **state**: `Readonly`<`IPropertyViewLocationRendererState`\>

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
| `nextProps` | `Readonly`<[`IPropertyViewHandlerProps`](../interfaces/client_internal_components_PropertyView.IPropertyViewHandlerProps.md)<[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md), [`IPropertyViewLocationRendererProps`](../interfaces/client_internal_components_PropertyView_PropertyViewLocation.IPropertyViewLocationRendererProps.md)\>\> |
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
| `nextProps` | `Readonly`<[`IPropertyViewHandlerProps`](../interfaces/client_internal_components_PropertyView.IPropertyViewHandlerProps.md)<[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md), [`IPropertyViewLocationRendererProps`](../interfaces/client_internal_components_PropertyView_PropertyViewLocation.IPropertyViewLocationRendererProps.md)\>\> |
| `nextState` | `Readonly`<`IPropertyViewLocationRendererState`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.UNSAFE\_componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:777

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

▸ `Optional` **componentDidMount**(): `void`

Called immediately after a component is mounted. Setting state here will trigger re-rendering.

#### Returns

`void`

#### Inherited from

React.Component.componentDidMount

#### Defined in

node_modules/@types/react/index.d.ts:625

___

### componentDidUpdate

▸ **componentDidUpdate**(`prevProps`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | [`IPropertyViewHandlerProps`](../interfaces/client_internal_components_PropertyView.IPropertyViewHandlerProps.md)<[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md), [`IPropertyViewLocationRendererProps`](../interfaces/client_internal_components_PropertyView_PropertyViewLocation.IPropertyViewLocationRendererProps.md)\> |

#### Returns

`void`

#### Overrides

React.Component.componentDidUpdate

#### Defined in

[client/internal/components/PropertyView/PropertyViewLocation.tsx:94](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyView/PropertyViewLocation.tsx#L94)

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
| `nextProps` | `Readonly`<[`IPropertyViewHandlerProps`](../interfaces/client_internal_components_PropertyView.IPropertyViewHandlerProps.md)<[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md), [`IPropertyViewLocationRendererProps`](../interfaces/client_internal_components_PropertyView_PropertyViewLocation.IPropertyViewLocationRendererProps.md)\>\> |
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
| `nextProps` | `Readonly`<[`IPropertyViewHandlerProps`](../interfaces/client_internal_components_PropertyView.IPropertyViewHandlerProps.md)<[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md), [`IPropertyViewLocationRendererProps`](../interfaces/client_internal_components_PropertyView_PropertyViewLocation.IPropertyViewLocationRendererProps.md)\>\> |
| `nextState` | `Readonly`<`IPropertyViewLocationRendererState`\> |
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
| `prevProps` | `Readonly`<[`IPropertyViewHandlerProps`](../interfaces/client_internal_components_PropertyView.IPropertyViewHandlerProps.md)<[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md), [`IPropertyViewLocationRendererProps`](../interfaces/client_internal_components_PropertyView_PropertyViewLocation.IPropertyViewLocationRendererProps.md)\>\> |
| `prevState` | `Readonly`<`IPropertyViewLocationRendererState`\> |

#### Returns

`any`

#### Inherited from

React.Component.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:682

___

### onResetViewportCenter

▸ **onResetViewportCenter**(): `void`

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyView/PropertyViewLocation.tsx:129](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyView/PropertyViewLocation.tsx#L129)

___

### onViewportChange

▸ **onViewportChange**(`viewport`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `viewport` | [`IViewport`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryLocation.IViewport.md) |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyView/PropertyViewLocation.tsx:124](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyView/PropertyViewLocation.tsx#L124)

___

### render

▸ **render**(): `Element`

#### Returns

`Element`

#### Overrides

React.Component.render

#### Defined in

[client/internal/components/PropertyView/PropertyViewLocation.tsx:163](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyView/PropertyViewLocation.tsx#L163)

___

### setState

▸ **setState**<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends ``"viewport"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `IPropertyViewLocationRendererState` \| (`prevState`: `Readonly`<`IPropertyViewLocationRendererState`\>, `props`: `Readonly`<[`IPropertyViewHandlerProps`](../interfaces/client_internal_components_PropertyView.IPropertyViewHandlerProps.md)<[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md), [`IPropertyViewLocationRendererProps`](../interfaces/client_internal_components_PropertyView_PropertyViewLocation.IPropertyViewLocationRendererProps.md)\>\>) => `IPropertyViewLocationRendererState` \| `Pick`<`IPropertyViewLocationRendererState`, `K`\> \| `Pick`<`IPropertyViewLocationRendererState`, `K`\> |
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
| `nextProps` | [`IPropertyViewHandlerProps`](../interfaces/client_internal_components_PropertyView.IPropertyViewHandlerProps.md)<[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md), [`IPropertyViewLocationRendererProps`](../interfaces/client_internal_components_PropertyView_PropertyViewLocation.IPropertyViewLocationRendererProps.md)\> |
| `nextState` | `IPropertyViewLocationRendererState` |

#### Returns

`boolean`

#### Overrides

React.Component.shouldComponentUpdate

#### Defined in

[client/internal/components/PropertyView/PropertyViewLocation.tsx:148](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyView/PropertyViewLocation.tsx#L148)
