[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation](../modules/client_fast_prototyping_renderers_PropertyEntry_PropertyEntryLocation.md) / default

# Class: default

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation](../modules/client_fast_prototyping_renderers_PropertyEntry_PropertyEntryLocation.md).default

The actual property entry location renderer

## Hierarchy

- `Component`\<[`IPropertyEntryLocationRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md), `IPropertyEntryLocationRendererState`\>

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryLocation.default.md#constructor)

### Properties

- [cmapRef](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryLocation.default.md#cmapref)
- [context](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryLocation.default.md#context)
- [inputRef](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryLocation.default.md#inputref)
- [preventNextSearchQueryChange](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryLocation.default.md#preventnextsearchquerychange)
- [props](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryLocation.default.md#props)
- [refs](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryLocation.default.md#refs)
- [state](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryLocation.default.md#state)
- [contextType](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryLocation.default.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryLocation.default.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryLocation.default.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryLocation.default.md#unsafe_componentwillupdate)
- [componentDidCatch](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryLocation.default.md#componentdidcatch)
- [componentDidMount](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryLocation.default.md#componentdidmount)
- [componentDidUpdate](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryLocation.default.md#componentdidupdate)
- [componentWillMount](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryLocation.default.md#componentwillmount)
- [componentWillReceiveProps](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryLocation.default.md#componentwillreceiveprops)
- [componentWillUnmount](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryLocation.default.md#componentwillunmount)
- [componentWillUpdate](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryLocation.default.md#componentwillupdate)
- [forceUpdate](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryLocation.default.md#forceupdate)
- [getSnapshotBeforeUpdate](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryLocation.default.md#getsnapshotbeforeupdate)
- [getSuggestionValue](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryLocation.default.md#getsuggestionvalue)
- [onChangeBySuggestion](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryLocation.default.md#onchangebysuggestion)
- [onKeyPress](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryLocation.default.md#onkeypress)
- [onSearchQueryChange](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryLocation.default.md#onsearchquerychange)
- [onSuggestionsFetchRequested](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryLocation.default.md#onsuggestionsfetchrequested)
- [render](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryLocation.default.md#render)
- [renderAutosuggestContainer](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryLocation.default.md#renderautosuggestcontainer)
- [renderAutosuggestSuggestion](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryLocation.default.md#renderautosuggestsuggestion)
- [renderBody](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryLocation.default.md#renderbody)
- [setLocationManually](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryLocation.default.md#setlocationmanually)
- [setState](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryLocation.default.md#setstate)
- [shouldComponentUpdate](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryLocation.default.md#shouldcomponentupdate)

## Constructors

### constructor

• **new default**(`props`): [`default`](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryLocation.default.md)

The contructor for the location entry renderer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertyEntryLocationRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md) | the props |

#### Returns

[`default`](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryLocation.default.md)

#### Overrides

React.Component\&lt;IPropertyEntryLocationRendererProps, IPropertyEntryLocationRendererState\&gt;.constructor

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation.tsx:311](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation.tsx#L311)

## Properties

### cmapRef

• `Private` **cmapRef**: `RefObject`\<`any`\>

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation.tsx:305](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation.tsx#L305)

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

**`See`**

https://react.dev/reference/react/Component#context

#### Inherited from

React.Component.context

#### Defined in

node_modules/@types/react/index.d.ts:473

___

### inputRef

• `Private` **inputRef**: `HTMLInputElement`

The input ref for the location

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation.tsx:297](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation.tsx#L297)

___

### preventNextSearchQueryChange

• `Private` **preventNextSearchQueryChange**: `boolean` = `false`

a boolean to prevent a search query change, this is because
the way react autosuggest works that will trigger a change event
at the same time one suggestion is clicked

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation.tsx:303](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation.tsx#L303)

___

### props

• `Readonly` **props**: `Readonly`\<[`IPropertyEntryLocationRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md)\> & `Readonly`\<\{ `children?`: `ReactNode`  }\>

#### Inherited from

React.Component.props

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

React.Component.refs

#### Defined in

node_modules/@types/react/index.d.ts:504

___

### state

• **state**: `Readonly`\<`IPropertyEntryLocationRendererState`\>

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
| `nextProps` | `Readonly`\<[`IPropertyEntryLocationRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md)\> |
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
| `nextProps` | `Readonly`\<[`IPropertyEntryLocationRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md)\> |
| `nextState` | `Readonly`\<`IPropertyEntryLocationRendererState`\> |
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

#### Returns

`void`

#### Overrides

React.Component.componentDidMount

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation.tsx:329](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation.tsx#L329)

___

### componentDidUpdate

▸ **componentDidUpdate**(`prevProps`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `Readonly`\<[`IPropertyEntryLocationRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md)\> |

#### Returns

`void`

#### Overrides

React.Component.componentDidUpdate

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation.tsx:339](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation.tsx#L339)

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
| `nextProps` | `Readonly`\<[`IPropertyEntryLocationRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md)\> |
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

Called immediately before a component is destroyed. Perform any necessary cleanup in this method, such as
cancelled network requests, or cleaning up any DOM elements created in `componentDidMount`.

#### Returns

`void`

#### Inherited from

React.Component.componentWillUnmount

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
| `nextProps` | `Readonly`\<[`IPropertyEntryLocationRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md)\> |
| `nextState` | `Readonly`\<`IPropertyEntryLocationRendererState`\> |
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
| `prevProps` | `Readonly`\<[`IPropertyEntryLocationRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md)\> |
| `prevState` | `Readonly`\<`IPropertyEntryLocationRendererState`\> |

#### Returns

`any`

#### Inherited from

React.Component.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:676

___

### getSuggestionValue

▸ **getSuggestionValue**(`suggestion`): `string`

For a given suggestion gives the value that is supposed to assign to the
text field

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `suggestion` | [`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md) | the suggestion |

#### Returns

`string`

basically the title of the suggestion

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation.tsx:792](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation.tsx#L792)

___

### onChangeBySuggestion

▸ **onChangeBySuggestion**(`suggestion`): `void`

Triggers when we have clicked a suggestion

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `suggestion` | [`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md) | the suggestion we have clicked |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation.tsx:400](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation.tsx#L400)

___

### onKeyPress

▸ **onKeyPress**(`e`): `void`

Triggers on the keypress in the search field

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e` | `KeyboardEvent`\<`HTMLInputElement`\> | a keyboard event |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation.tsx:383](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation.tsx#L383)

___

### onSearchQueryChange

▸ **onSearchQueryChange**(`e`): `void`

Triggers when the search query itself changes
and not a suggestion is selected

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e` | `ChangeEvent`\<`HTMLInputElement`\> | the change event |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation.tsx:416](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation.tsx#L416)

___

### onSuggestionsFetchRequested

▸ **onSuggestionsFetchRequested**(`arg`): `void`

react autosuggest manually decides when it needs to load suggestions

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | `Object` | the value it wants to load |
| `arg.value` | `string` | - |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation.tsx:435](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation.tsx#L435)

___

### render

▸ **render**(): `Element`

The actual render function

#### Returns

`Element`

#### Overrides

React.Component.render

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation.tsx:864](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation.tsx#L864)

___

### renderAutosuggestContainer

▸ **renderAutosuggestContainer**(`options`): `Element`

Specifies how the container of the autosuggest component is to be rendered

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `RenderSuggestionsContainerParams` | the autosuggest options |

#### Returns

`Element`

a react element

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation.tsx:804](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation.tsx#L804)

___

### renderAutosuggestSuggestion

▸ **renderAutosuggestSuggestion**(`suggestion`, `params`): `Element`

Specifies how a single suggestion inside the autosuggest container
is supposed to be rendered

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `suggestion` | [`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md) | the suggestion to be renderer |
| `params` | `RenderSuggestionParams` | the autosuggest suggestion params |

#### Returns

`Element`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation.tsx:824](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation.tsx#L824)

___

### renderBody

▸ **renderBody**(`textFieldProps?`): `Element`

Renders the suggestion body

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `textFieldProps?` | `any` | the text field props given by react autosuggest |

#### Returns

`Element`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation.tsx:444](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation.tsx#L444)

___

### setLocationManually

▸ **setLocationManually**(`e`): `void`

Trigger the location manually on a click event to the map
itself

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e` | `any` | a LeafletMouseEvent |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation.tsx:364](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation.tsx#L364)

___

### setState

▸ **setState**\<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends ``"readyToMap"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `IPropertyEntryLocationRendererState` \| (`prevState`: `Readonly`\<`IPropertyEntryLocationRendererState`\>, `props`: `Readonly`\<[`IPropertyEntryLocationRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md)\>) => `IPropertyEntryLocationRendererState` \| `Pick`\<`IPropertyEntryLocationRendererState`, `K`\> \| `Pick`\<`IPropertyEntryLocationRendererState`, `K`\> |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

React.Component.setState

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
| `nextProps` | `Readonly`\<[`IPropertyEntryLocationRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md)\> |
| `nextState` | `Readonly`\<`IPropertyEntryLocationRendererState`\> |
| `nextContext` | `any` |

#### Returns

`boolean`

#### Inherited from

React.Component.shouldComponentUpdate

#### Defined in

node_modules/@types/react/index.d.ts:630
