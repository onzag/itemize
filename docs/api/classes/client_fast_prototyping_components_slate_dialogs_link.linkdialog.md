[](../README.md) / [Exports](../modules.md) / [client/fast-prototyping/components/slate/dialogs/link](../modules/client_fast_prototyping_components_slate_dialogs_link.md) / LinkDialog

# Class: LinkDialog

[client/fast-prototyping/components/slate/dialogs/link](../modules/client_fast_prototyping_components_slate_dialogs_link.md).LinkDialog

This dialog allows us to choose a link value, as an url, external url or
even templated values

## Hierarchy

* *PureComponent*<ILinkDialogProps, ILinkDialogState\>

  ↳ **LinkDialog**

## Table of contents

### Constructors

- [constructor](client_fast_prototyping_components_slate_dialogs_link.linkdialog.md#constructor)

### Properties

- [context](client_fast_prototyping_components_slate_dialogs_link.linkdialog.md#context)
- [props](client_fast_prototyping_components_slate_dialogs_link.linkdialog.md#props)
- [refs](client_fast_prototyping_components_slate_dialogs_link.linkdialog.md#refs)
- [state](client_fast_prototyping_components_slate_dialogs_link.linkdialog.md#state)
- [textFieldLinkRef](client_fast_prototyping_components_slate_dialogs_link.linkdialog.md#textfieldlinkref)
- [contextType](client_fast_prototyping_components_slate_dialogs_link.linkdialog.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_fast_prototyping_components_slate_dialogs_link.linkdialog.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_fast_prototyping_components_slate_dialogs_link.linkdialog.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_fast_prototyping_components_slate_dialogs_link.linkdialog.md#unsafe_componentwillupdate)
- [acceptLink](client_fast_prototyping_components_slate_dialogs_link.linkdialog.md#acceptlink)
- [closeDialog](client_fast_prototyping_components_slate_dialogs_link.linkdialog.md#closedialog)
- [componentDidCatch](client_fast_prototyping_components_slate_dialogs_link.linkdialog.md#componentdidcatch)
- [componentDidMount](client_fast_prototyping_components_slate_dialogs_link.linkdialog.md#componentdidmount)
- [componentDidUpdate](client_fast_prototyping_components_slate_dialogs_link.linkdialog.md#componentdidupdate)
- [componentWillMount](client_fast_prototyping_components_slate_dialogs_link.linkdialog.md#componentwillmount)
- [componentWillReceiveProps](client_fast_prototyping_components_slate_dialogs_link.linkdialog.md#componentwillreceiveprops)
- [componentWillUnmount](client_fast_prototyping_components_slate_dialogs_link.linkdialog.md#componentwillunmount)
- [componentWillUpdate](client_fast_prototyping_components_slate_dialogs_link.linkdialog.md#componentwillupdate)
- [focusLinkTextField](client_fast_prototyping_components_slate_dialogs_link.linkdialog.md#focuslinktextfield)
- [forceUpdate](client_fast_prototyping_components_slate_dialogs_link.linkdialog.md#forceupdate)
- [getSnapshotBeforeUpdate](client_fast_prototyping_components_slate_dialogs_link.linkdialog.md#getsnapshotbeforeupdate)
- [onOpeningDialog](client_fast_prototyping_components_slate_dialogs_link.linkdialog.md#onopeningdialog)
- [render](client_fast_prototyping_components_slate_dialogs_link.linkdialog.md#render)
- [setState](client_fast_prototyping_components_slate_dialogs_link.linkdialog.md#setstate)
- [shouldComponentUpdate](client_fast_prototyping_components_slate_dialogs_link.linkdialog.md#shouldcomponentupdate)
- [updateLinkTValue](client_fast_prototyping_components_slate_dialogs_link.linkdialog.md#updatelinktvalue)
- [updateLinkURL](client_fast_prototyping_components_slate_dialogs_link.linkdialog.md#updatelinkurl)

## Constructors

### constructor

\+ **new LinkDialog**(`props`: ILinkDialogProps): [*LinkDialog*](client_fast_prototyping_components_slate_dialogs_link.linkdialog.md)

Constructs a new link dialog

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`props` | ILinkDialogProps | the props specific to this dialog    |

**Returns:** [*LinkDialog*](client_fast_prototyping_components_slate_dialogs_link.linkdialog.md)

Defined in: [client/fast-prototyping/components/slate/dialogs/link.tsx:152](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/dialogs/link.tsx#L152)

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

### props

• `Readonly` **props**: *Readonly*<ILinkDialogProps\> & *Readonly*<{ `children?`: ReactNode  }\>

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

• **state**: *Readonly*<ILinkDialogState\>

Defined in: node_modules/@types/react/index.d.ts:502

___

### textFieldLinkRef

• `Private` **textFieldLinkRef**: *RefObject*<HTMLDivElement\>

We grab a ref for the text field in order to focus

Defined in: [client/fast-prototyping/components/slate/dialogs/link.tsx:152](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/dialogs/link.tsx#L152)

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

▸ `Optional`**UNSAFE_componentWillReceiveProps**(`nextProps`: *Readonly*<ILinkDialogProps\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<ILinkDialogProps\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:744

___

### UNSAFE\_componentWillUpdate

▸ `Optional`**UNSAFE_componentWillUpdate**(`nextProps`: *Readonly*<ILinkDialogProps\>, `nextState`: *Readonly*<ILinkDialogState\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<ILinkDialogProps\> |
`nextState` | *Readonly*<ILinkDialogState\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:772

___

### acceptLink

▸ **acceptLink**(): *void*

When we have written the values and clicked the button
to accept the link we have given

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/dialogs/link.tsx:272](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/dialogs/link.tsx#L272)

___

### closeDialog

▸ **closeDialog**(): *void*

Triggers when the dialog is meant
to be closed

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/dialogs/link.tsx:312](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/dialogs/link.tsx#L312)

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

▸ `Optional`**componentDidMount**(): *void*

Called immediately after a component is mounted. Setting state here will trigger re-rendering.

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:620

___

### componentDidUpdate

▸ `Optional`**componentDidUpdate**(`prevProps`: *Readonly*<ILinkDialogProps\>, `prevState`: *Readonly*<ILinkDialogState\>, `snapshot?`: *any*): *void*

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | *Readonly*<ILinkDialogProps\> |
`prevState` | *Readonly*<ILinkDialogState\> |
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

▸ `Optional`**componentWillReceiveProps**(`nextProps`: *Readonly*<ILinkDialogProps\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<ILinkDialogProps\> |
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

▸ `Optional`**componentWillUpdate**(`nextProps`: *Readonly*<ILinkDialogProps\>, `nextState`: *Readonly*<ILinkDialogState\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<ILinkDialogProps\> |
`nextState` | *Readonly*<ILinkDialogState\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:757

___

### focusLinkTextField

▸ **focusLinkTextField**(): *void*

Ran at the start when the dialog opens in order
to focus the text field

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/dialogs/link.tsx:182](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/dialogs/link.tsx#L182)

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

▸ `Optional`**getSnapshotBeforeUpdate**(`prevProps`: *Readonly*<ILinkDialogProps\>, `prevState`: *Readonly*<ILinkDialogState\>): *any*

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | *Readonly*<ILinkDialogProps\> |
`prevState` | *Readonly*<ILinkDialogState\> |

**Returns:** *any*

Defined in: node_modules/@types/react/index.d.ts:677

___

### onOpeningDialog

▸ **onOpeningDialog**(): *void*

Triggers when the dialog is opening

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/dialogs/link.tsx:189](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/dialogs/link.tsx#L189)

___

### render

▸ **render**(): *Element*

Render function

**Returns:** *Element*

Defined in: [client/fast-prototyping/components/slate/dialogs/link.tsx:332](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/dialogs/link.tsx#L332)

___

### setState

▸ **setState**<K\>(`state`: ILinkDialogState \| (`prevState`: *Readonly*<ILinkDialogState\>, `props`: *Readonly*<ILinkDialogProps\>) => ILinkDialogState \| *Pick*<ILinkDialogState, K\> \| *Pick*<ILinkDialogState, K\>, `callback?`: () => *void*): *void*

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | *linkURL* \| *linkTValue* \| *linkInvalid* \| *linkTemplateOptions* |

#### Parameters:

Name | Type |
:------ | :------ |
`state` | ILinkDialogState \| (`prevState`: *Readonly*<ILinkDialogState\>, `props`: *Readonly*<ILinkDialogProps\>) => ILinkDialogState \| *Pick*<ILinkDialogState, K\> \| *Pick*<ILinkDialogState, K\> |
`callback?` | () => *void* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:488

___

### shouldComponentUpdate

▸ `Optional`**shouldComponentUpdate**(`nextProps`: *Readonly*<ILinkDialogProps\>, `nextState`: *Readonly*<ILinkDialogState\>, `nextContext`: *any*): *boolean*

Called to determine whether the change in props and state should trigger a re-render.

`Component` always returns true.
`PureComponent` implements a shallow comparison on props and state and returns true if any
props or states have changed.

If false is returned, `Component#render`, `componentWillUpdate`
and `componentDidUpdate` will not be called.

#### Parameters:

Name | Type |
:------ | :------ |
`nextProps` | *Readonly*<ILinkDialogProps\> |
`nextState` | *Readonly*<ILinkDialogState\> |
`nextContext` | *any* |

**Returns:** *boolean*

Defined in: node_modules/@types/react/index.d.ts:631

___

### updateLinkTValue

▸ **updateLinkTValue**(`e`: *ChangeEvent*<HTMLInputElement\>): *void*

Triggers on the select field in order to update the templated
value in the state

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`e` | *ChangeEvent*<HTMLInputElement\> | the event from the input    |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/dialogs/link.tsx:302](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/dialogs/link.tsx#L302)

___

### updateLinkURL

▸ **updateLinkURL**(`e`: *ChangeEvent*<HTMLInputElement\>): *void*

Triggers on each keystroke to update the link url itself

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`e` | *ChangeEvent*<HTMLInputElement\> | the event from the input    |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/dialogs/link.tsx:291](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/dialogs/link.tsx#L291)
