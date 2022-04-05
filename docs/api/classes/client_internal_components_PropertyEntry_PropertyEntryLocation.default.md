[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/components/PropertyEntry/PropertyEntryLocation](../modules/client_internal_components_PropertyEntry_PropertyEntryLocation.md) / default

# Class: default

[client/internal/components/PropertyEntry/PropertyEntryLocation](../modules/client_internal_components_PropertyEntry_PropertyEntryLocation.md).default

The property entry location class

## Hierarchy

- `Component`<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)<[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md), [`IPropertyEntryLocationRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md)\>, `IPropertyEntryLocationState`\>

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#constructor)

### Properties

- [autocompleteTakingPlace](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#autocompletetakingplace)
- [context](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#context)
- [delaySuggestionFetch](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#delaysuggestionfetch)
- [geocodeTakingPlace](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#geocodetakingplace)
- [lastSearchValue](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#lastsearchvalue)
- [lastSearchValueQ](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#lastsearchvalueq)
- [lastSuggestionsValue](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#lastsuggestionsvalue)
- [lastSuggestionsValueQ](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#lastsuggestionsvalueq)
- [props](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#props)
- [refs](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#refs)
- [searchTakingPlace](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#searchtakingplace)
- [state](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#state)
- [contextType](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#unsafe_componentwillupdate)
- [clearSearchResults](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#clearsearchresults)
- [clearSuggestions](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#clearsuggestions)
- [componentDidCatch](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#componentdidcatch)
- [componentDidMount](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#componentdidmount)
- [componentDidUpdate](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#componentdidupdate)
- [componentWillMount](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#componentwillmount)
- [componentWillReceiveProps](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#componentwillreceiveprops)
- [componentWillUnmount](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#componentwillunmount)
- [componentWillUpdate](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#componentwillupdate)
- [enableUserSetErrors](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#enableuserseterrors)
- [forceUpdate](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#forceupdate)
- [geocode](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#geocode)
- [getSnapshotBeforeUpdate](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#getsnapshotbeforeupdate)
- [onChangeBySearchResult](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#onchangebysearchresult)
- [onChangeBySuggestion](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#onchangebysuggestion)
- [onManualPick](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#onmanualpick)
- [onRestoreHijacked](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#onrestorehijacked)
- [onSearch](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#onsearch)
- [onSearchQueryChange](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#onsearchquerychange)
- [onSearchQueryChangeActual](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#onsearchquerychangeactual)
- [onViewportChange](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#onviewportchange)
- [render](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#render)
- [setState](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#setstate)
- [shouldComponentUpdate](client_internal_components_PropertyEntry_PropertyEntryLocation.default.md#shouldcomponentupdate)

## Constructors

### constructor

• **new default**(`props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)<[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md), [`IPropertyEntryLocationRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md)\> |

#### Overrides

React.Component&lt;
    IPropertyEntryHandlerProps&lt;IPropertyDefinitionSupportedLocationType, IPropertyEntryLocationRendererProps\&gt;,
    IPropertyEntryLocationState
  \&gt;.constructor

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:243](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L243)

## Properties

### autocompleteTakingPlace

• `Private` **autocompleteTakingPlace**: `number`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:230](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L230)

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

### delaySuggestionFetch

• `Private` **delaySuggestionFetch**: `Timeout`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:234](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L234)

___

### geocodeTakingPlace

• `Private` **geocodeTakingPlace**: `number`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:231](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L231)

___

### lastSearchValue

• `Private` **lastSearchValue**: [`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md)[]

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:240](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L240)

___

### lastSearchValueQ

• `Private` **lastSearchValueQ**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:241](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L241)

___

### lastSuggestionsValue

• `Private` **lastSuggestionsValue**: [`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md)[]

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:236](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L236)

___

### lastSuggestionsValueQ

• `Private` **lastSuggestionsValueQ**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:238](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L238)

___

### props

• `Readonly` **props**: `Readonly`<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)<[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md), [`IPropertyEntryLocationRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md)\>\> & `Readonly`<{ `children?`: `ReactNode`  }\>

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

### searchTakingPlace

• `Private` **searchTakingPlace**: `number`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:229](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L229)

___

### state

• **state**: `Readonly`<`IPropertyEntryLocationState`\>

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
| `nextProps` | `Readonly`<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)<[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md), [`IPropertyEntryLocationRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md)\>\> |
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
| `nextProps` | `Readonly`<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)<[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md), [`IPropertyEntryLocationRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md)\>\> |
| `nextState` | `Readonly`<`IPropertyEntryLocationState`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.UNSAFE\_componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:777

___

### clearSearchResults

▸ **clearSearchResults**(): `void`

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:627](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L627)

___

### clearSuggestions

▸ **clearSuggestions**(): `void`

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:634](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L634)

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
| `prevProps` | [`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)<[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md), [`IPropertyEntryLocationRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md)\> |

#### Returns

`void`

#### Overrides

React.Component.componentDidUpdate

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:305](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L305)

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
| `nextProps` | `Readonly`<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)<[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md), [`IPropertyEntryLocationRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md)\>\> |
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
| `nextProps` | `Readonly`<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)<[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md), [`IPropertyEntryLocationRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md)\>\> |
| `nextState` | `Readonly`<`IPropertyEntryLocationState`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:762

___

### enableUserSetErrors

▸ **enableUserSetErrors**(): `void`

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:299](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L299)

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

### geocode

▸ **geocode**(`value`): `Promise`<`void`\>

run the geocode for incomplete values

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:644](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L644)

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
| `prevProps` | `Readonly`<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)<[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md), [`IPropertyEntryLocationRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md)\>\> |
| `prevState` | `Readonly`<`IPropertyEntryLocationState`\> |

#### Returns

`any`

#### Inherited from

React.Component.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:682

___

### onChangeBySearchResult

▸ **onChangeBySearchResult**(`searchResult`, `mantainViewport?`): `void`

Fed to the renderer to change by search result

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchResult` | [`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md) | the search result in question |
| `mantainViewport?` | `boolean` | whether to mantain the viewport |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:590](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L590)

___

### onChangeBySuggestion

▸ **onChangeBySuggestion**(`suggestion`, `mantainViewport?`): `void`

Fed to the renderer to change by suggestion

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `suggestion` | [`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md) | the suggestion we are using |
| `mantainViewport?` | `boolean` | whether to mantain the viewport |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:467](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L467)

___

### onManualPick

▸ **onManualPick**(`value`, `mantainViewport?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md) |
| `mantainViewport?` | `boolean` |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:670](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L670)

___

### onRestoreHijacked

▸ **onRestoreHijacked**(): `void`

Hijacking the on restore function

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:342](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L342)

___

### onSearch

▸ **onSearch**(`mantainViewport?`): `Promise`<[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md)[]\>

Fed to the renderer in order to run a search

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mantainViewport?` | `boolean` | whether to mantain the viewport |

#### Returns

`Promise`<[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md)[]\>

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:481](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L481)

___

### onSearchQueryChange

▸ **onSearchQueryChange**(`searchQuery`, `dontAutoloadSuggestions?`): `void`

Triggers when the search query changes, this is the literal
function that is fed to the renderer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchQuery` | `string` | the search query the renderer gives |
| `dontAutoloadSuggestions?` | `boolean` | and whether we should not autoload suggestions |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:409](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L409)

___

### onSearchQueryChangeActual

▸ **onSearchQueryChangeActual**(`searchQuery`, `updateIdentifier`): `Promise`<`void`\>

Actuall what triggers

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchQuery` | `string` | the search query we are using |
| `updateIdentifier` | `number` | the identifier of this, to ensure that if two changes happened at once, only the last one wil trigger |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:363](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L363)

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

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:349](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L349)

___

### render

▸ **render**(): `Element`

#### Returns

`Element`

#### Overrides

React.Component.render

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:718](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L718)

___

### setState

▸ **setState**<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `IPropertyEntryLocationState` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `IPropertyEntryLocationState` \| (`prevState`: `Readonly`<`IPropertyEntryLocationState`\>, `props`: `Readonly`<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)<[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md), [`IPropertyEntryLocationRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md)\>\>) => `IPropertyEntryLocationState` \| `Pick`<`IPropertyEntryLocationState`, `K`\> \| `Pick`<`IPropertyEntryLocationState`, `K`\> |
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
| `nextProps` | [`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)<[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md), [`IPropertyEntryLocationRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md)\> |
| `nextState` | `IPropertyEntryLocationState` |

#### Returns

`boolean`

#### Overrides

React.Component.shouldComponentUpdate

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:277](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L277)
