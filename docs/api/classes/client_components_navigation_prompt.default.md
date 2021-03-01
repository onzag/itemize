[](../README.md) / [Exports](../modules.md) / [client/components/navigation/Prompt](../modules/client_components_navigation_prompt.md) / default

# Class: default

[client/components/navigation/Prompt](../modules/client_components_navigation_prompt.md).default

## Hierarchy

* *PureComponent*<PromptProps, PromptState\>

  ↳ **default**

## Table of contents

### Constructors

- [constructor](client_components_navigation_prompt.default.md#constructor)

### Properties

- [context](client_components_navigation_prompt.default.md#context)
- [originalLocation](client_components_navigation_prompt.default.md#originallocation)
- [props](client_components_navigation_prompt.default.md#props)
- [refs](client_components_navigation_prompt.default.md#refs)
- [state](client_components_navigation_prompt.default.md#state)
- [contextType](client_components_navigation_prompt.default.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_components_navigation_prompt.default.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_components_navigation_prompt.default.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_components_navigation_prompt.default.md#unsafe_componentwillupdate)
- [cancelDialog](client_components_navigation_prompt.default.md#canceldialog)
- [componentDidCatch](client_components_navigation_prompt.default.md#componentdidcatch)
- [componentDidMount](client_components_navigation_prompt.default.md#componentdidmount)
- [componentDidUpdate](client_components_navigation_prompt.default.md#componentdidupdate)
- [componentWillMount](client_components_navigation_prompt.default.md#componentwillmount)
- [componentWillReceiveProps](client_components_navigation_prompt.default.md#componentwillreceiveprops)
- [componentWillUnmount](client_components_navigation_prompt.default.md#componentwillunmount)
- [componentWillUpdate](client_components_navigation_prompt.default.md#componentwillupdate)
- [confirmDialog](client_components_navigation_prompt.default.md#confirmdialog)
- [discardDialog](client_components_navigation_prompt.default.md#discarddialog)
- [forceUpdate](client_components_navigation_prompt.default.md#forceupdate)
- [getSnapshotBeforeUpdate](client_components_navigation_prompt.default.md#getsnapshotbeforeupdate)
- [handleRouterPromptNavigationStep](client_components_navigation_prompt.default.md#handlerouterpromptnavigationstep)
- [onBeforeUnload](client_components_navigation_prompt.default.md#onbeforeunload)
- [render](client_components_navigation_prompt.default.md#render)
- [setState](client_components_navigation_prompt.default.md#setstate)
- [shouldComponentUpdate](client_components_navigation_prompt.default.md#shouldcomponentupdate)

## Constructors

### constructor

\+ **new default**(`props`: PromptProps): [*default*](client_components_navigation_prompt.default.md)

#### Parameters:

Name | Type |
:------ | :------ |
`props` | PromptProps |

**Returns:** [*default*](client_components_navigation_prompt.default.md)

Defined in: [client/components/navigation/Prompt.tsx:114](https://github.com/onzag/itemize/blob/0e9b128c/client/components/navigation/Prompt.tsx#L114)

## Properties

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

### originalLocation

• `Private` **originalLocation**: *string*

The original location the prompt was mounted for

Defined in: [client/components/navigation/Prompt.tsx:114](https://github.com/onzag/itemize/blob/0e9b128c/client/components/navigation/Prompt.tsx#L114)

___

### props

• `Readonly` **props**: *Readonly*<PromptProps\> & *Readonly*<{ `children?`: ReactNode  }\>

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

• **state**: *Readonly*<PromptState\>

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

▸ `Optional`**UNSAFE_componentWillReceiveProps**(`nextProps`: *Readonly*<PromptProps\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<PromptProps\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:744

___

### UNSAFE\_componentWillUpdate

▸ `Optional`**UNSAFE_componentWillUpdate**(`nextProps`: *Readonly*<PromptProps\>, `nextState`: *Readonly*<PromptState\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<PromptProps\> |
`nextState` | *Readonly*<PromptState\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:772

___

### cancelDialog

▸ **cancelDialog**(): *void*

Triggers when the dialog is open and it is cancelled, which means that we should
just stay where we are and avoid to go where we were going

**Returns:** *void*

Defined in: [client/components/navigation/Prompt.tsx:157](https://github.com/onzag/itemize/blob/0e9b128c/client/components/navigation/Prompt.tsx#L157)

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

As we mount

**Returns:** *void*

Defined in: [client/components/navigation/Prompt.tsx:232](https://github.com/onzag/itemize/blob/0e9b128c/client/components/navigation/Prompt.tsx#L232)

___

### componentDidUpdate

▸ `Optional`**componentDidUpdate**(`prevProps`: *Readonly*<PromptProps\>, `prevState`: *Readonly*<PromptState\>, `snapshot?`: *any*): *void*

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | *Readonly*<PromptProps\> |
`prevState` | *Readonly*<PromptState\> |
`snapshot?` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:683

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

▸ `Optional`**componentWillReceiveProps**(`nextProps`: *Readonly*<PromptProps\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<PromptProps\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:727

___

### componentWillUnmount

▸ **componentWillUnmount**(): *void*

As we unmount

**Returns:** *void*

Defined in: [client/components/navigation/Prompt.tsx:242](https://github.com/onzag/itemize/blob/0e9b128c/client/components/navigation/Prompt.tsx#L242)

___

### componentWillUpdate

▸ `Optional`**componentWillUpdate**(`nextProps`: *Readonly*<PromptProps\>, `nextState`: *Readonly*<PromptState\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<PromptProps\> |
`nextState` | *Readonly*<PromptState\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:757

___

### confirmDialog

▸ **confirmDialog**(): *Promise*<void\>

Confirm the dialog, aka confirm the changes and proceed

**Returns:** *Promise*<void\>

Defined in: [client/components/navigation/Prompt.tsx:197](https://github.com/onzag/itemize/blob/0e9b128c/client/components/navigation/Prompt.tsx#L197)

___

### discardDialog

▸ **discardDialog**(): *void*

Discard the dialog, aka ignore it, and proceed to where we were going

**Returns:** *void*

Defined in: [client/components/navigation/Prompt.tsx:178](https://github.com/onzag/itemize/blob/0e9b128c/client/components/navigation/Prompt.tsx#L178)

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

### getSnapshotBeforeUpdate

▸ `Optional`**getSnapshotBeforeUpdate**(`prevProps`: *Readonly*<PromptProps\>, `prevState`: *Readonly*<PromptState\>): *any*

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | *Readonly*<PromptProps\> |
`prevState` | *Readonly*<PromptState\> |

**Returns:** *any*

Defined in: node_modules/@types/react/index.d.ts:677

___

### handleRouterPromptNavigationStep

▸ **handleRouterPromptNavigationStep**(`location`: *Location*<{}\>): *boolean*

Triggers from the react router as the message prop
but returns a boolean, returning false prevents the navigation

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`location` | *Location*<{}\> | the location   |

**Returns:** *boolean*

a boolean

Defined in: [client/components/navigation/Prompt.tsx:138](https://github.com/onzag/itemize/blob/0e9b128c/client/components/navigation/Prompt.tsx#L138)

___

### onBeforeUnload

▸ **onBeforeUnload**(`e`: BeforeUnloadEvent): *void*

triggers on an actual before unload event
as the user tries to close the window without
saving changes

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`e` | BeforeUnloadEvent | the before unload event    |

**Returns:** *void*

Defined in: [client/components/navigation/Prompt.tsx:221](https://github.com/onzag/itemize/blob/0e9b128c/client/components/navigation/Prompt.tsx#L221)

___

### render

▸ **render**(): *Element*

Renders the component

**Returns:** *Element*

Defined in: [client/components/navigation/Prompt.tsx:250](https://github.com/onzag/itemize/blob/0e9b128c/client/components/navigation/Prompt.tsx#L250)

___

### setState

▸ **setState**<K\>(`state`: PromptState \| (`prevState`: *Readonly*<PromptState\>, `props`: *Readonly*<PromptProps\>) => PromptState \| *Pick*<PromptState, K\> \| *Pick*<PromptState, K\>, `callback?`: () => *void*): *void*

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | *dialogOpened* \| *dialogOpenedFor* |

#### Parameters:

Name | Type |
:------ | :------ |
`state` | PromptState \| (`prevState`: *Readonly*<PromptState\>, `props`: *Readonly*<PromptProps\>) => PromptState \| *Pick*<PromptState, K\> \| *Pick*<PromptState, K\> |
`callback?` | () => *void* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:488

___

### shouldComponentUpdate

▸ `Optional`**shouldComponentUpdate**(`nextProps`: *Readonly*<PromptProps\>, `nextState`: *Readonly*<PromptState\>, `nextContext`: *any*): *boolean*

Called to determine whether the change in props and state should trigger a re-render.

`Component` always returns true.
`PureComponent` implements a shallow comparison on props and state and returns true if any
props or states have changed.

If false is returned, `Component#render`, `componentWillUpdate`
and `componentDidUpdate` will not be called.

#### Parameters:

Name | Type |
:------ | :------ |
`nextProps` | *Readonly*<PromptProps\> |
`nextState` | *Readonly*<PromptState\> |
`nextContext` | *any* |

**Returns:** *boolean*

Defined in: node_modules/@types/react/index.d.ts:631
