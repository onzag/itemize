[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference](../modules/client_fast_prototyping_renderers_PropertyEntry_PropertyEntryReference.md) / default

# Class: default

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference](../modules/client_fast_prototyping_renderers_PropertyEntry_PropertyEntryReference.md).default

The renderer for the reference type, which basically allows to select an integer
for a given reference that represents an item definition somewhere else, the reference
type is very powerful and can do tasks of autocomplete and linking

Supported args:

- descriptionAsAlert: displays the description if exists as alert rather than the standard
- onEnter: A function that triggers when the enter key is pressed

## Hierarchy

- `Component`<[`IPropertyEntryReferenceRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryReference.IPropertyEntryReferenceRendererProps.md)\>

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryReference.default.md#constructor)

### Properties

- [context](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryReference.default.md#context)
- [inputRef](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryReference.default.md#inputref)
- [props](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryReference.default.md#props)
- [refs](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryReference.default.md#refs)
- [state](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryReference.default.md#state)
- [contextType](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryReference.default.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryReference.default.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryReference.default.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryReference.default.md#unsafe_componentwillupdate)
- [catchToggleMouseDownEvent](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryReference.default.md#catchtogglemousedownevent)
- [componentDidCatch](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryReference.default.md#componentdidcatch)
- [componentDidMount](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryReference.default.md#componentdidmount)
- [componentDidUpdate](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryReference.default.md#componentdidupdate)
- [componentWillMount](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryReference.default.md#componentwillmount)
- [componentWillReceiveProps](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryReference.default.md#componentwillreceiveprops)
- [componentWillUnmount](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryReference.default.md#componentwillunmount)
- [componentWillUpdate](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryReference.default.md#componentwillupdate)
- [forceUpdate](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryReference.default.md#forceupdate)
- [getSnapshotBeforeUpdate](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryReference.default.md#getsnapshotbeforeupdate)
- [getSuggestionValue](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryReference.default.md#getsuggestionvalue)
- [onChange](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryReference.default.md#onchange)
- [onChangeByHTMLEvent](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryReference.default.md#onchangebyhtmlevent)
- [onChangeBySelect](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryReference.default.md#onchangebyselect)
- [onKeyDown](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryReference.default.md#onkeydown)
- [onSuggestionsFetchRequested](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryReference.default.md#onsuggestionsfetchrequested)
- [render](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryReference.default.md#render)
- [renderAsAutosuggest](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryReference.default.md#renderasautosuggest)
- [renderAsSelectField](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryReference.default.md#renderasselectfield)
- [renderAutosuggestContainer](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryReference.default.md#renderautosuggestcontainer)
- [renderAutosuggestSuggestion](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryReference.default.md#renderautosuggestsuggestion)
- [renderBasicTextField](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryReference.default.md#renderbasictextfield)
- [setState](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryReference.default.md#setstate)
- [shouldComponentUpdate](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryReference.default.md#shouldcomponentupdate)

## Constructors

### constructor

• **new default**(`props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`IPropertyEntryReferenceRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryReference.IPropertyEntryReferenceRendererProps.md) |

#### Overrides

React.Component&lt;IPropertyEntryReferenceRendererProps\&gt;.constructor

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference.tsx:211](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference.tsx#L211)

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

### inputRef

• `Private` **inputRef**: `HTMLInputElement`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference.tsx:209](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference.tsx#L209)

___

### props

• `Readonly` **props**: `Readonly`<[`IPropertyEntryReferenceRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryReference.IPropertyEntryReferenceRendererProps.md)\> & `Readonly`<{ `children?`: `ReactNode`  }\>

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

• **state**: `Readonly`<{}\>

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
| `nextProps` | `Readonly`<[`IPropertyEntryReferenceRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryReference.IPropertyEntryReferenceRendererProps.md)\> |
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
| `nextProps` | `Readonly`<[`IPropertyEntryReferenceRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryReference.IPropertyEntryReferenceRendererProps.md)\> |
| `nextState` | `Readonly`<{}\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.UNSAFE\_componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:777

___

### catchToggleMouseDownEvent

▸ **catchToggleMouseDownEvent**(`e`): `void`

caches the mouse down event to prevent it from doing
anything

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e` | `MouseEvent`<`Element`, `MouseEvent`\> | the mouse event |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference.tsx:257](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference.tsx#L257)

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

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference.tsx:226](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference.tsx#L226)

___

### componentDidUpdate

▸ **componentDidUpdate**(`prevProps`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | [`IPropertyEntryReferenceRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryReference.IPropertyEntryReferenceRendererProps.md) |

#### Returns

`void`

#### Overrides

React.Component.componentDidUpdate

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference.tsx:240](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference.tsx#L240)

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
| `nextProps` | `Readonly`<[`IPropertyEntryReferenceRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryReference.IPropertyEntryReferenceRendererProps.md)\> |
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
| `nextProps` | `Readonly`<[`IPropertyEntryReferenceRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryReference.IPropertyEntryReferenceRendererProps.md)\> |
| `nextState` | `Readonly`<{}\> |
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
| `prevProps` | `Readonly`<[`IPropertyEntryReferenceRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryReference.IPropertyEntryReferenceRendererProps.md)\> |
| `prevState` | `Readonly`<{}\> |

#### Returns

`any`

#### Inherited from

React.Component.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:682

___

### getSuggestionValue

▸ **getSuggestionValue**(`suggestion`): `string`

Provides the suggestion value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `suggestion` | [`IPropertyEntryReferenceOption`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryReference.IPropertyEntryReferenceOption.md) | the suggestion itself |

#### Returns

`string`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference.tsx:527](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference.tsx#L527)

___

### onChange

▸ **onChange**(`e`, `autosuggestOverride?`): `void`

the change event that triggers in the autosuggest mode
or by default, if not autosuggest override given

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e` | `ChangeEvent`<`HTMLInputElement`\> | the event |
| `autosuggestOverride?` | `ChangeEvent` | autosuggest override |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference.tsx:294](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference.tsx#L294)

___

### onChangeByHTMLEvent

▸ **onChangeByHTMLEvent**(`e`): `void`

The change event but by the raw text field

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e` | `ChangeEvent`<`HTMLInputElement`\> | the change event |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference.tsx:265](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference.tsx#L265)

___

### onChangeBySelect

▸ **onChangeBySelect**(`value`): `void`

Change used with the select element

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | the value it's given we ignore the internal value which is always null for that renderer |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference.tsx:277](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference.tsx#L277)

___

### onKeyDown

▸ **onKeyDown**(`e`): `void`

The event on key down for the text field

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e` | `KeyboardEvent`<`HTMLInputElement`\> | the event itself |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference.tsx:321](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference.tsx#L321)

___

### onSuggestionsFetchRequested

▸ **onSuggestionsFetchRequested**(`arg`): `void`

When the suggestion fetch is triggered

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | `Object` | the arg |
| `arg.reason` | `string` | - |
| `arg.value` | `string` | - |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference.tsx:539](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference.tsx#L539)

___

### render

▸ **render**(): `Element`

#### Returns

`Element`

#### Overrides

React.Component.render

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference.tsx:545](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference.tsx#L545)

___

### renderAsAutosuggest

▸ **renderAsAutosuggest**(): `Element`

render function

#### Returns

`Element`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference.tsx:604](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference.tsx#L604)

___

### renderAsSelectField

▸ **renderAsSelectField**(): `Element`

#### Returns

`Element`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference.tsx:553](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference.tsx#L553)

___

### renderAutosuggestContainer

▸ **renderAutosuggestContainer**(`options`): `Element`

renders the autosuggest container for the reference

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `RenderSuggestionsContainerParams` | the autosuggest options |

#### Returns

`Element`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference.tsx:469](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference.tsx#L469)

___

### renderAutosuggestSuggestion

▸ **renderAutosuggestSuggestion**(`suggestion`, `params`): `Element`

Render the autosuggest suggestion for the reference

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `suggestion` | [`IPropertyEntryReferenceOption`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryReference.IPropertyEntryReferenceOption.md) | the suggestion itself |
| `params` | `RenderSuggestionParams` | the params to use |

#### Returns

`Element`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference.tsx:489](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference.tsx#L489)

___

### renderBasicTextField

▸ **renderBasicTextField**(`textFieldProps?`): `Element`

Render the basic text field for the reference

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `textFieldProps?` | `any` | the text field props |

#### Returns

`Element`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference.tsx:331](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference.tsx#L331)

___

### setState

▸ **setState**<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `never` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | {} \| (`prevState`: `Readonly`<{}\>, `props`: `Readonly`<[`IPropertyEntryReferenceRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryReference.IPropertyEntryReferenceRendererProps.md)\>) => {} \| `Pick`<{}, `K`\> \| `Pick`<{}, `K`\> |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

React.Component.setState

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
| `nextProps` | `Readonly`<[`IPropertyEntryReferenceRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryReference.IPropertyEntryReferenceRendererProps.md)\> |
| `nextState` | `Readonly`<{}\> |
| `nextContext` | `any` |

#### Returns

`boolean`

#### Inherited from

React.Component.shouldComponentUpdate

#### Defined in

node_modules/@types/react/index.d.ts:636
