[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/app](../modules/client_internal_app.md) / default

# Class: default

[client/internal/app](../modules/client_internal_app.md).default

This is the itemize app, and it contains all the application
logic inside, it sits inside the appWrapper, if specified, as well
as some general providers, that are set by the initialize function
such as the router

## Hierarchy

- `Component`<`IAppProps`, `IAppState`\>

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](client_internal_app.default.md#constructor)

### Properties

- [context](client_internal_app.default.md#context)
- [props](client_internal_app.default.md#props)
- [refs](client_internal_app.default.md#refs)
- [remoteListener](client_internal_app.default.md#remotelistener)
- [state](client_internal_app.default.md#state)
- [tokenState](client_internal_app.default.md#tokenstate)
- [contextType](client_internal_app.default.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_internal_app.default.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_internal_app.default.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_internal_app.default.md#unsafe_componentwillupdate)
- [changeCountryTo](client_internal_app.default.md#changecountryto)
- [changeCurrencyTo](client_internal_app.default.md#changecurrencyto)
- [changeLanguageTo](client_internal_app.default.md#changelanguageto)
- [componentDidCatch](client_internal_app.default.md#componentdidcatch)
- [componentDidMount](client_internal_app.default.md#componentdidmount)
- [componentDidUpdate](client_internal_app.default.md#componentdidupdate)
- [componentWillMount](client_internal_app.default.md#componentwillmount)
- [componentWillReceiveProps](client_internal_app.default.md#componentwillreceiveprops)
- [componentWillUnmount](client_internal_app.default.md#componentwillunmount)
- [componentWillUpdate](client_internal_app.default.md#componentwillupdate)
- [confirmUrlLanguage](client_internal_app.default.md#confirmurllanguage)
- [finallySetLocaleDataFor](client_internal_app.default.md#finallysetlocaledatafor)
- [forceUpdate](client_internal_app.default.md#forceupdate)
- [getSnapshotBeforeUpdate](client_internal_app.default.md#getsnapshotbeforeupdate)
- [hasLocaleDataFor](client_internal_app.default.md#haslocaledatafor)
- [render](client_internal_app.default.md#render)
- [setBlockedCallbackState](client_internal_app.default.md#setblockedcallbackstate)
- [setState](client_internal_app.default.md#setstate)
- [setTokenState](client_internal_app.default.md#settokenstate)
- [shouldComponentUpdate](client_internal_app.default.md#shouldcomponentupdate)
- [updateCurrencyFactorsIfNecessary](client_internal_app.default.md#updatecurrencyfactorsifnecessary)
- [updateUserProperty](client_internal_app.default.md#updateuserproperty)

## Constructors

### constructor

• **new default**(`props`)

The itemize app constructor

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `IAppProps` | props for the app |

#### Overrides

React.Component&lt;IAppProps, IAppState\&gt;.constructor

#### Defined in

[client/internal/app/index.tsx:155](https://github.com/onzag/itemize/blob/a24376ed/client/internal/app/index.tsx#L155)

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

• `Readonly` **props**: `Readonly`<`IAppProps`\> & `Readonly`<{ `children?`: `ReactNode`  }\>

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

### remoteListener

• `Private` **remoteListener**: [`RemoteListener`](client_internal_app_remote_listener.RemoteListener.md) = `null`

the remote listener object that listens for the remote changes
and does the registration of itemize items that are loaded in order for listen to changes
as well as buildnumbers, currency factors changed info, etc...

#### Defined in

[client/internal/app/index.tsx:149](https://github.com/onzag/itemize/blob/a24376ed/client/internal/app/index.tsx#L149)

___

### state

• **state**: `Readonly`<`IAppState`\>

#### Inherited from

React.Component.state

#### Defined in

node_modules/@types/react/index.d.ts:505

___

### tokenState

• `Private` **tokenState**: [`IActualTokenProviderState`](../interfaces/client_internal_providers_token_provider.IActualTokenProviderState.md) = `null`

This is the token state that is actually given by the token provider that sits inside
the application itself, the reason why this app itself needs it, it's because the remote listener
as well as the update functions need token provider

#### Defined in

[client/internal/app/index.tsx:143](https://github.com/onzag/itemize/blob/a24376ed/client/internal/app/index.tsx#L143)

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
| `nextProps` | `Readonly`<`IAppProps`\> |
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
| `nextProps` | `Readonly`<`IAppProps`\> |
| `nextState` | `Readonly`<`IAppState`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.UNSAFE\_componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:777

___

### changeCountryTo

▸ **changeCountryTo**(`code`, `avoidUpdatingCountry?`, `avoidChangingLanguageAndCurrency?`, `avoidUpdatingUser?`, `onPotentialChangesFoundFor?`): `Promise`<[`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)\>

changes the country given a specific country code
changing the country will trigger an automatic change
of currency and language

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `string` | the two letter uppercase code for the country |
| `avoidUpdatingCountry?` | `boolean` | - |
| `avoidChangingLanguageAndCurrency?` | `boolean` | avoids changing the language and the currency |
| `avoidUpdatingUser?` | `boolean` | avoids updating the user |
| `onPotentialChangesFoundFor?` | (`languageCode`: `string`, `currencyCode`: `string`) => `void` | - |

#### Returns

`Promise`<[`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)\>

#### Defined in

[client/internal/app/index.tsx:471](https://github.com/onzag/itemize/blob/a24376ed/client/internal/app/index.tsx#L471)

___

### changeCurrencyTo

▸ **changeCurrencyTo**(`code`, `avoidUpdatingUser?`): `Promise`<[`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)\>

Changes the currency to a given currency code
given its 3 letter uppercase code

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `string` | the three letter uppercase code of the currency |
| `avoidUpdatingUser?` | `boolean` | whether to avoid updating the user |

#### Returns

`Promise`<[`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)\>

#### Defined in

[client/internal/app/index.tsx:589](https://github.com/onzag/itemize/blob/a24376ed/client/internal/app/index.tsx#L589)

___

### changeLanguageTo

▸ **changeLanguageTo**(`locale`, `avoidUpdatingUser?`): `Promise`<[`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)\>

Changes the language for the one specified by that locale

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `locale` | `string` | the two letter or language-region code for the locale |
| `avoidUpdatingUser?` | `boolean` | whether to avoid updating the user |

#### Returns

`Promise`<[`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)\>

#### Defined in

[client/internal/app/index.tsx:390](https://github.com/onzag/itemize/blob/a24376ed/client/internal/app/index.tsx#L390)

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

[client/internal/app/index.tsx:579](https://github.com/onzag/itemize/blob/a24376ed/client/internal/app/index.tsx#L579)

___

### componentDidUpdate

▸ `Optional` **componentDidUpdate**(`prevProps`, `prevState`, `snapshot?`): `void`

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `Readonly`<`IAppProps`\> |
| `prevState` | `Readonly`<`IAppState`\> |
| `snapshot?` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.componentDidUpdate

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
| `nextProps` | `Readonly`<`IAppProps`\> |
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
| `nextProps` | `Readonly`<`IAppProps`\> |
| `nextState` | `Readonly`<`IAppState`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:762

___

### confirmUrlLanguage

▸ **confirmUrlLanguage**(): `void`

#### Returns

`void`

#### Defined in

[client/internal/app/index.tsx:566](https://github.com/onzag/itemize/blob/a24376ed/client/internal/app/index.tsx#L566)

___

### finallySetLocaleDataFor

▸ **finallySetLocaleDataFor**(`locale`, `avoidUpdatingUser`): `Promise`<[`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)\>

Performs the final steps to set the locale data for a given application
after all the respective locale infomation required has been loaded, this
includes changing the url

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `locale` | `string` | the locale we are updating for |
| `avoidUpdatingUser` | `boolean` | whether to avoid updating the user server information |

#### Returns

`Promise`<[`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)\>

#### Defined in

[client/internal/app/index.tsx:340](https://github.com/onzag/itemize/blob/a24376ed/client/internal/app/index.tsx#L340)

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
| `prevProps` | `Readonly`<`IAppProps`\> |
| `prevState` | `Readonly`<`IAppState`\> |

#### Returns

`any`

#### Inherited from

React.Component.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:682

___

### hasLocaleDataFor

▸ **hasLocaleDataFor**(`locale`): `boolean`

Checks whether there is a locale data for a given language

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `locale` | `string` | the two letter or language-region code for the locale |

#### Returns

`boolean`

#### Defined in

[client/internal/app/index.tsx:329](https://github.com/onzag/itemize/blob/a24376ed/client/internal/app/index.tsx#L329)

___

### render

▸ **render**(): `Element`

The render function

#### Returns

`Element`

#### Overrides

React.Component.render

#### Defined in

[client/internal/app/index.tsx:628](https://github.com/onzag/itemize/blob/a24376ed/client/internal/app/index.tsx#L628)

___

### setBlockedCallbackState

▸ **setBlockedCallbackState**(`state`): `void`

Sets the state for the blocked callback, this function is proxied using comlink
to the worker that actually calls this function and specifies if the state
of the app is blocked from update as it can't access indexeddb

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `state` | `boolean` | the state that it should set to |

#### Returns

`void`

#### Defined in

[client/internal/app/index.tsx:233](https://github.com/onzag/itemize/blob/a24376ed/client/internal/app/index.tsx#L233)

___

### setState

▸ **setState**<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `IAppState` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `IAppState` \| (`prevState`: `Readonly`<`IAppState`\>, `props`: `Readonly`<`IAppProps`\>) => `IAppState` \| `Pick`<`IAppState`, `K`\> \| `Pick`<`IAppState`, `K`\> |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

React.Component.setState

#### Defined in

node_modules/@types/react/index.d.ts:491

___

### setTokenState

▸ **setTokenState**(`state`, `logout`): `void`

This function is triggered by the TokenProvider as a callback and triggers once
it has a state ready, the state is its own internal state, but since access of the token
provider state is needed here, it's streamed here once it's ready, as well as on any change

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `state` | [`IActualTokenProviderState`](../interfaces/client_internal_providers_token_provider.IActualTokenProviderState.md) | the new state |
| `logout` | () => `void` | the logout function |

#### Returns

`void`

#### Defined in

[client/internal/app/index.tsx:248](https://github.com/onzag/itemize/blob/a24376ed/client/internal/app/index.tsx#L248)

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
| `nextProps` | `Readonly`<`IAppProps`\> |
| `nextState` | `Readonly`<`IAppState`\> |
| `nextContext` | `any` |

#### Returns

`boolean`

#### Inherited from

React.Component.shouldComponentUpdate

#### Defined in

node_modules/@types/react/index.d.ts:636

___

### updateCurrencyFactorsIfNecessary

▸ **updateCurrencyFactorsIfNecessary**(): `Promise`<`void`\>

function that updates the currency factors if it finds it necessary, now according to the remote
listener specification, the currency factors are rechecked after a disconnect event, so we might not
be sure if such upate is necessary, and since it has rendering consequences we only update if necessary
also when the event triggers for a currency factors change in the remote listener, it might not be a
true change as maybe the prices hasn't changed, unlikely but possible

Currency factors is also service worked so it should work offline

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/app/index.tsx:210](https://github.com/onzag/itemize/blob/a24376ed/client/internal/app/index.tsx#L210)

___

### updateUserProperty

▸ **updateUserProperty**(`propertyId`, `value`): `Promise`<[`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)\>

updates an user property from the property list of user properties
and it performs a graphql request to do such

in practique this is used to update app_language, app_currency and app_country

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `propertyId` | `string` | the property id we are updating |
| `value` | `string` | the value |

#### Returns

`Promise`<[`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)\>

#### Defined in

[client/internal/app/index.tsx:269](https://github.com/onzag/itemize/blob/a24376ed/client/internal/app/index.tsx#L269)
