[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/navigation/Prompt](../modules/client_components_navigation_Prompt.md) / default

# Class: default

[client/components/navigation/Prompt](../modules/client_components_navigation_Prompt.md).default

## Hierarchy

- `PureComponent`<`PromptProps`, `PromptState`\>

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](client_components_navigation_Prompt.default.md#constructor)

### Properties

- [context](client_components_navigation_Prompt.default.md#context)
- [originalLocation](client_components_navigation_Prompt.default.md#originallocation)
- [props](client_components_navigation_Prompt.default.md#props)
- [refs](client_components_navigation_Prompt.default.md#refs)
- [state](client_components_navigation_Prompt.default.md#state)
- [contextType](client_components_navigation_Prompt.default.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_components_navigation_Prompt.default.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_components_navigation_Prompt.default.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_components_navigation_Prompt.default.md#unsafe_componentwillupdate)
- [cancelDialog](client_components_navigation_Prompt.default.md#canceldialog)
- [componentDidCatch](client_components_navigation_Prompt.default.md#componentdidcatch)
- [componentDidMount](client_components_navigation_Prompt.default.md#componentdidmount)
- [componentDidUpdate](client_components_navigation_Prompt.default.md#componentdidupdate)
- [componentWillMount](client_components_navigation_Prompt.default.md#componentwillmount)
- [componentWillReceiveProps](client_components_navigation_Prompt.default.md#componentwillreceiveprops)
- [componentWillUnmount](client_components_navigation_Prompt.default.md#componentwillunmount)
- [componentWillUpdate](client_components_navigation_Prompt.default.md#componentwillupdate)
- [confirmDialog](client_components_navigation_Prompt.default.md#confirmdialog)
- [discardDialog](client_components_navigation_Prompt.default.md#discarddialog)
- [forceUpdate](client_components_navigation_Prompt.default.md#forceupdate)
- [getSnapshotBeforeUpdate](client_components_navigation_Prompt.default.md#getsnapshotbeforeupdate)
- [handleRouterPromptNavigationStep](client_components_navigation_Prompt.default.md#handlerouterpromptnavigationstep)
- [onBeforeUnload](client_components_navigation_Prompt.default.md#onbeforeunload)
- [render](client_components_navigation_Prompt.default.md#render)
- [setState](client_components_navigation_Prompt.default.md#setstate)
- [shouldComponentUpdate](client_components_navigation_Prompt.default.md#shouldcomponentupdate)

## Constructors

### constructor

• **new default**(`props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `PromptProps` |

#### Overrides

React.PureComponent&lt;PromptProps, PromptState\&gt;.constructor

#### Defined in

[client/components/navigation/Prompt.tsx:143](https://github.com/onzag/itemize/blob/a24376ed/client/components/navigation/Prompt.tsx#L143)

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

React.PureComponent.context

#### Defined in

node_modules/@types/react/index.d.ts:479

___

### originalLocation

• `Private` **originalLocation**: `string`

The original location the prompt was mounted for

#### Defined in

[client/components/navigation/Prompt.tsx:141](https://github.com/onzag/itemize/blob/a24376ed/client/components/navigation/Prompt.tsx#L141)

___

### props

• `Readonly` **props**: `Readonly`<`PromptProps`\> & `Readonly`<{ `children?`: `ReactNode`  }\>

#### Inherited from

React.PureComponent.props

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

React.PureComponent.refs

#### Defined in

node_modules/@types/react/index.d.ts:510

___

### state

• **state**: `Readonly`<`PromptState`\>

#### Inherited from

React.PureComponent.state

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

React.PureComponent.contextType

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

React.PureComponent.UNSAFE\_componentWillMount

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
| `nextProps` | `Readonly`<`PromptProps`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.PureComponent.UNSAFE\_componentWillReceiveProps

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
| `nextProps` | `Readonly`<`PromptProps`\> |
| `nextState` | `Readonly`<`PromptState`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.PureComponent.UNSAFE\_componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:777

___

### cancelDialog

▸ **cancelDialog**(): `void`

Triggers when the dialog is open and it is cancelled, which means that we should
just stay where we are and avoid to go where we were going

#### Returns

`void`

#### Defined in

[client/components/navigation/Prompt.tsx:207](https://github.com/onzag/itemize/blob/a24376ed/client/components/navigation/Prompt.tsx#L207)

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

React.PureComponent.componentDidCatch

#### Defined in

node_modules/@types/react/index.d.ts:646

___

### componentDidMount

▸ **componentDidMount**(): `void`

As we mount

#### Returns

`void`

#### Overrides

React.PureComponent.componentDidMount

#### Defined in

[client/components/navigation/Prompt.tsx:282](https://github.com/onzag/itemize/blob/a24376ed/client/components/navigation/Prompt.tsx#L282)

___

### componentDidUpdate

▸ `Optional` **componentDidUpdate**(`prevProps`, `prevState`, `snapshot?`): `void`

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `Readonly`<`PromptProps`\> |
| `prevState` | `Readonly`<`PromptState`\> |
| `snapshot?` | `any` |

#### Returns

`void`

#### Inherited from

React.PureComponent.componentDidUpdate

#### Defined in

node_modules/@types/react/index.d.ts:688

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

React.PureComponent.componentWillMount

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
| `nextProps` | `Readonly`<`PromptProps`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.PureComponent.componentWillReceiveProps

#### Defined in

node_modules/@types/react/index.d.ts:732

___

### componentWillUnmount

▸ **componentWillUnmount**(): `void`

As we unmount

#### Returns

`void`

#### Overrides

React.PureComponent.componentWillUnmount

#### Defined in

[client/components/navigation/Prompt.tsx:292](https://github.com/onzag/itemize/blob/a24376ed/client/components/navigation/Prompt.tsx#L292)

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
| `nextProps` | `Readonly`<`PromptProps`\> |
| `nextState` | `Readonly`<`PromptState`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.PureComponent.componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:762

___

### confirmDialog

▸ **confirmDialog**(): `Promise`<`void`\>

Confirm the dialog, aka confirm the changes and proceed

#### Returns

`Promise`<`void`\>

#### Defined in

[client/components/navigation/Prompt.tsx:247](https://github.com/onzag/itemize/blob/a24376ed/client/components/navigation/Prompt.tsx#L247)

___

### discardDialog

▸ **discardDialog**(): `void`

Discard the dialog, aka ignore it, and proceed to where we were going

#### Returns

`void`

#### Defined in

[client/components/navigation/Prompt.tsx:228](https://github.com/onzag/itemize/blob/a24376ed/client/components/navigation/Prompt.tsx#L228)

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
| `prevProps` | `Readonly`<`PromptProps`\> |
| `prevState` | `Readonly`<`PromptState`\> |

#### Returns

`any`

#### Inherited from

React.PureComponent.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:682

___

### handleRouterPromptNavigationStep

▸ **handleRouterPromptNavigationStep**(`location`): `boolean`

Triggers from the react router as the message prop
but returns a boolean, returning false prevents the navigation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `location` | `Location`<`unknown`\> | the location |

#### Returns

`boolean`

a boolean

#### Defined in

[client/components/navigation/Prompt.tsx:165](https://github.com/onzag/itemize/blob/a24376ed/client/components/navigation/Prompt.tsx#L165)

___

### onBeforeUnload

▸ **onBeforeUnload**(`e`): `void`

triggers on an actual before unload event
as the user tries to close the window without
saving changes

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e` | `BeforeUnloadEvent` | the before unload event |

#### Returns

`void`

#### Defined in

[client/components/navigation/Prompt.tsx:271](https://github.com/onzag/itemize/blob/a24376ed/client/components/navigation/Prompt.tsx#L271)

___

### render

▸ **render**(): `Element`

Renders the component

#### Returns

`Element`

#### Overrides

React.PureComponent.render

#### Defined in

[client/components/navigation/Prompt.tsx:300](https://github.com/onzag/itemize/blob/a24376ed/client/components/navigation/Prompt.tsx#L300)

___

### setState

▸ **setState**<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `PromptState` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `PromptState` \| (`prevState`: `Readonly`<`PromptState`\>, `props`: `Readonly`<`PromptProps`\>) => `PromptState` \| `Pick`<`PromptState`, `K`\> \| `Pick`<`PromptState`, `K`\> |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

React.PureComponent.setState

#### Defined in

node_modules/@types/react/index.d.ts:491

___

### shouldComponentUpdate

▸ `Optional` **shouldComponentUpdate**(`nextProps`, `nextState`, `nextContext`): `boolean`

Called to determine whether the change in props and state should trigger a re-render.

`Component` always returns true.
`PureComponent` implements a shallow comparison on props and state and returns true if any
props or states have changed.

If false is returned, `Component#render`, `componentWillUpdate`
and `componentDidUpdate` will not be called.

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<`PromptProps`\> |
| `nextState` | `Readonly`<`PromptState`\> |
| `nextContext` | `any` |

#### Returns

`boolean`

#### Inherited from

React.PureComponent.shouldComponentUpdate

#### Defined in

node_modules/@types/react/index.d.ts:636
