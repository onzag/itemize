[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/components/PropertyEntry/PropertyEntryReference](../modules/client_internal_components_PropertyEntry_PropertyEntryReference.md) / default

# Class: default

[client/internal/components/PropertyEntry/PropertyEntryReference](../modules/client_internal_components_PropertyEntry_PropertyEntryReference.md).default

## Hierarchy

- `Component`<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)<`string`, [`IPropertyEntryReferenceRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryReference.IPropertyEntryReferenceRendererProps.md)\>, `IPropertyEntryReferenceState`\>

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#constructor)

### Properties

- [context](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#context)
- [currentlyFindingValueFor](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#currentlyfindingvaluefor)
- [isUnmounted](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#isunmounted)
- [lastCachedSearch](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#lastcachedsearch)
- [lastCachedSearchPreventedIds](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#lastcachedsearchpreventedids)
- [lastCachedSearchPreventedProperties](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#lastcachedsearchpreventedproperties)
- [lastCachedSearchPreventedPropertiesIds](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#lastcachedsearchpreventedpropertiesids)
- [lastSearchArgumentLimit](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#lastsearchargumentlimit)
- [lastSearchArgumentLoadAll](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#lastsearchargumentloadall)
- [lastSearchArgumentPreventEqualityWithProperties](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#lastsearchargumentpreventequalitywithproperties)
- [lastSearchArgumentPreventIds](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#lastsearchargumentpreventids)
- [lastSearchId](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#lastsearchid)
- [props](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#props)
- [refs](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#refs)
- [searchTimeout](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#searchtimeout)
- [ssrServerOnlyValue](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#ssrserveronlyvalue)
- [state](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#state)
- [contextType](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#unsafe_componentwillupdate)
- [addListeners](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#addlisteners)
- [addPreventEqualityWithPropertiesListener](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#addpreventequalitywithpropertieslistener)
- [beforeSSRRender](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#beforessrrender)
- [changeListener](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#changelistener)
- [componentDidCatch](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#componentdidcatch)
- [componentDidMount](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#componentdidmount)
- [componentDidUpdate](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#componentdidupdate)
- [componentWillMount](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#componentwillmount)
- [componentWillReceiveProps](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#componentwillreceiveprops)
- [componentWillUnmount](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#componentwillunmount)
- [componentWillUpdate](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#componentwillupdate)
- [dismissFindError](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#dismissfinderror)
- [dismissSearchError](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#dismisssearcherror)
- [enableUserSetErrors](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#enableuserseterrors)
- [findCurrentStrValue](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#findcurrentstrvalue)
- [forceUpdate](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#forceupdate)
- [getSSRFoundValue](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#getssrfoundvalue)
- [getSnapshotBeforeUpdate](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#getsnapshotbeforeupdate)
- [getSpecialData](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#getspecialdata)
- [loadAllPossibleValues](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#loadallpossiblevalues)
- [onCancel](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#oncancel)
- [onChangeSearch](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#onchangesearch)
- [onSelect](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#onselect)
- [refilter](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#refilter)
- [refilterPossibleValues](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#refilterpossiblevalues)
- [removeListeners](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#removelisteners)
- [removePreventEqualityWithPropertiesListener](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#removepreventequalitywithpropertieslistener)
- [render](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#render)
- [search](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#search)
- [setState](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#setstate)
- [shouldComponentUpdate](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#shouldcomponentupdate)
- [toggleListener](client_internal_components_PropertyEntry_PropertyEntryReference.default.md#togglelistener)

## Constructors

### constructor

• **new default**(`props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)<`string`, [`IPropertyEntryReferenceRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryReference.IPropertyEntryReferenceRendererProps.md)\> |

#### Overrides

React.Component&lt;IPropertyEntryHandlerProps&lt;string, IPropertyEntryReferenceRendererProps\&gt;, IPropertyEntryReferenceState\&gt;.constructor

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryReference.tsx:72](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L72)

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

[client/internal/components/PropertyEntry/PropertyEntryReference.tsx:55](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L55)

___

### isUnmounted

• `Private` **isUnmounted**: `boolean` = `false`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryReference.tsx:70](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L70)

___

### lastCachedSearch

• `Private` **lastCachedSearch**: [`IPropertyEntryReferenceOption`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryReference.IPropertyEntryReferenceOption.md)[]

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryReference.tsx:63](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L63)

___

### lastCachedSearchPreventedIds

• `Private` **lastCachedSearchPreventedIds**: `string`[]

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryReference.tsx:66](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L66)

___

### lastCachedSearchPreventedProperties

• `Private` **lastCachedSearchPreventedProperties**: [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)[]

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryReference.tsx:64](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L64)

___

### lastCachedSearchPreventedPropertiesIds

• `Private` **lastCachedSearchPreventedPropertiesIds**: `string`[]

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryReference.tsx:65](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L65)

___

### lastSearchArgumentLimit

• `Private` **lastSearchArgumentLimit**: `number`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryReference.tsx:59](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L59)

___

### lastSearchArgumentLoadAll

• `Private` **lastSearchArgumentLoadAll**: `boolean`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryReference.tsx:58](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L58)

___

### lastSearchArgumentPreventEqualityWithProperties

• `Private` **lastSearchArgumentPreventEqualityWithProperties**: `string`[]

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryReference.tsx:61](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L61)

___

### lastSearchArgumentPreventIds

• `Private` **lastSearchArgumentPreventIds**: `string`[]

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryReference.tsx:60](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L60)

___

### lastSearchId

• `Private` **lastSearchId**: `number`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryReference.tsx:56](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L56)

___

### props

• `Readonly` **props**: `Readonly`<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)<`string`, [`IPropertyEntryReferenceRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryReference.IPropertyEntryReferenceRendererProps.md)\>\> & `Readonly`<{ `children?`: `ReactNode`  }\>

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

### searchTimeout

• `Private` **searchTimeout**: `Timeout`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryReference.tsx:54](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L54)

___

### ssrServerOnlyValue

• `Private` **ssrServerOnlyValue**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryReference.tsx:68](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L68)

___

### state

• **state**: `Readonly`<`IPropertyEntryReferenceState`\>

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
| `nextProps` | `Readonly`<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)<`string`, [`IPropertyEntryReferenceRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryReference.IPropertyEntryReferenceRendererProps.md)\>\> |
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
| `nextProps` | `Readonly`<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)<`string`, [`IPropertyEntryReferenceRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryReference.IPropertyEntryReferenceRendererProps.md)\>\> |
| `nextState` | `Readonly`<`IPropertyEntryReferenceState`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.UNSAFE\_componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:777

___

### addListeners

▸ **addListeners**(`props?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)<`string`, [`IPropertyEntryReferenceRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryReference.IPropertyEntryReferenceRendererProps.md)\> |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryReference.tsx:188](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L188)

___

### addPreventEqualityWithPropertiesListener

▸ **addPreventEqualityWithPropertiesListener**(`properties`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `properties` | [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)[] |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryReference.tsx:176](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L176)

___

### beforeSSRRender

▸ **beforeSSRRender**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryReference.tsx:416](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L416)

___

### changeListener

▸ **changeListener**(`id`, `version`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version` | `string` |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryReference.tsx:105](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L105)

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

[client/internal/components/PropertyEntry/PropertyEntryReference.tsx:121](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L121)

___

### componentDidUpdate

▸ **componentDidUpdate**(`prevProps`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | [`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)<`string`, [`IPropertyEntryReferenceRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryReference.IPropertyEntryReferenceRendererProps.md)\> |

#### Returns

`void`

#### Overrides

React.Component.componentDidUpdate

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryReference.tsx:661](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L661)

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
| `nextProps` | `Readonly`<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)<`string`, [`IPropertyEntryReferenceRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryReference.IPropertyEntryReferenceRendererProps.md)\>\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.componentWillReceiveProps

#### Defined in

node_modules/@types/react/index.d.ts:732

___

### componentWillUnmount

▸ **componentWillUnmount**(): `void`

#### Returns

`void`

#### Overrides

React.Component.componentWillUnmount

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryReference.tsx:137](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L137)

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
| `nextProps` | `Readonly`<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)<`string`, [`IPropertyEntryReferenceRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryReference.IPropertyEntryReferenceRendererProps.md)\>\> |
| `nextState` | `Readonly`<`IPropertyEntryReferenceState`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:762

___

### dismissFindError

▸ **dismissFindError**(): `void`

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryReference.tsx:655](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L655)

___

### dismissSearchError

▸ **dismissSearchError**(): `void`

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryReference.tsx:649](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L649)

___

### enableUserSetErrors

▸ **enableUserSetErrors**(): `void`

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryReference.tsx:99](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L99)

___

### findCurrentStrValue

▸ **findCurrentStrValue**(`forId`, `forVersion`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `forId` | `string` |
| `forVersion` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryReference.tsx:465](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L465)

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

#### Parameters

| Name | Type |
| :------ | :------ |
| `forId` | `string` |
| `forVersion` | `string` |

#### Returns

`string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryReference.tsx:439](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L439)

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
| `prevProps` | `Readonly`<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)<`string`, [`IPropertyEntryReferenceRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryReference.IPropertyEntryReferenceRendererProps.md)\>\> |
| `prevState` | `Readonly`<`IPropertyEntryReferenceState`\> |

#### Returns

`any`

#### Inherited from

React.Component.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:682

___

### getSpecialData

▸ **getSpecialData**(): [[`default`](base_Root_Module_ItemDefinition.default.md), [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md), [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)]

#### Returns

[[`default`](base_Root_Module_ItemDefinition.default.md), [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md), [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)]

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryReference.tsx:380](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L380)

___

### loadAllPossibleValues

▸ **loadAllPossibleValues**(`limit`, `preventIds?`, `preventEqualityWithProperties?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `limit` | `number` |
| `preventIds?` | `string`[] |
| `preventEqualityWithProperties?` | `string`[] |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryReference.tsx:542](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L542)

___

### onCancel

▸ **onCancel**(): `void`

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryReference.tsx:634](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L634)

___

### onChangeSearch

▸ **onChangeSearch**(`str`, `preventIds?`, `preventEqualityWithProperties?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |
| `preventIds?` | `string`[] |
| `preventEqualityWithProperties?` | `string`[] |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryReference.tsx:610](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L610)

___

### onSelect

▸ **onSelect**(`option`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `option` | [`IPropertyEntryReferenceOption`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryReference.IPropertyEntryReferenceOption.md) |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryReference.tsx:630](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L630)

___

### refilter

▸ **refilter**(`id`, `version`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version` | `string` |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryReference.tsx:546](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L546)

___

### refilterPossibleValues

▸ **refilterPossibleValues**(`preventIds?`, `preventEqualityWithProperties?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `preventIds?` | `string`[] |
| `preventEqualityWithProperties?` | `string`[] |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryReference.tsx:553](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L553)

___

### removeListeners

▸ **removeListeners**(`props?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)<`string`, [`IPropertyEntryReferenceRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryReference.IPropertyEntryReferenceRendererProps.md)\> |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryReference.tsx:192](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L192)

___

### removePreventEqualityWithPropertiesListener

▸ **removePreventEqualityWithPropertiesListener**(`properties`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `properties` | [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)[] |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryReference.tsx:182](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L182)

___

### render

▸ **render**(): `Element`

#### Returns

`Element`

#### Overrides

React.Component.render

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryReference.tsx:718](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L718)

___

### search

▸ **search**(`loadAll?`, `limit?`, `preventIds?`, `preventEqualityWithProperties?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `loadAll?` | `boolean` |
| `limit?` | `number` |
| `preventIds?` | `string`[] |
| `preventEqualityWithProperties?` | `string`[] |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryReference.tsx:196](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L196)

___

### setState

▸ **setState**<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `IPropertyEntryReferenceState` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `IPropertyEntryReferenceState` \| (`prevState`: `Readonly`<`IPropertyEntryReferenceState`\>, `props`: `Readonly`<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)<`string`, [`IPropertyEntryReferenceRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryReference.IPropertyEntryReferenceRendererProps.md)\>\>) => `IPropertyEntryReferenceState` \| `Pick`<`IPropertyEntryReferenceState`, `K`\> \| `Pick`<`IPropertyEntryReferenceState`, `K`\> |
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
| `nextProps` | [`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)<`string`, [`IPropertyEntryReferenceRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryReference.IPropertyEntryReferenceRendererProps.md)\> |
| `nextState` | `IPropertyEntryReferenceState` |

#### Returns

`boolean`

#### Overrides

React.Component.shouldComponentUpdate

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryReference.tsx:695](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L695)

___

### toggleListener

▸ **toggleListener**(`props?`, `fn`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)<`string`, [`IPropertyEntryReferenceRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryReference.IPropertyEntryReferenceRendererProps.md)\> |
| `fn` | `string` |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryReference.tsx:145](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L145)
