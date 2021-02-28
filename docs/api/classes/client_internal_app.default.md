[](../README.md) / [Exports](../modules.md) / [client/internal/app](../modules/client_internal_app.md) / default

# Class: default

[client/internal/app](../modules/client_internal_app.md).default

This is the itemize app, and it contains all the application
logic inside, it sits inside the appWrapper, if specified, as well
as some general providers, that are set by the initialize function
such as the router

## Hierarchy

* *Component*<IAppProps, IAppState\>

  ↳ **default**

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
- [finallySetLocaleDataFor](client_internal_app.default.md#finallysetlocaledatafor)
- [forceUpdate](client_internal_app.default.md#forceupdate)
- [getSnapshotBeforeUpdate](client_internal_app.default.md#getsnapshotbeforeupdate)
- [hasLocaleDataFor](client_internal_app.default.md#haslocaledatafor)
- [render](client_internal_app.default.md#render)
- [renderAppWithLocaleContext](client_internal_app.default.md#renderappwithlocalecontext)
- [setBlockedCallbackState](client_internal_app.default.md#setblockedcallbackstate)
- [setState](client_internal_app.default.md#setstate)
- [setTokenState](client_internal_app.default.md#settokenstate)
- [shouldComponentUpdate](client_internal_app.default.md#shouldcomponentupdate)
- [updateCurrencyFactorsIfNecessary](client_internal_app.default.md#updatecurrencyfactorsifnecessary)
- [updateUserProperty](client_internal_app.default.md#updateuserproperty)

## Constructors

### constructor

\+ **new default**(`props`: IAppProps): [*default*](client_internal_app.default.md)

The itemize app constructor

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`props` | IAppProps | props for the app    |

**Returns:** [*default*](client_internal_app.default.md)

Defined in: [client/internal/app/index.tsx:144](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/index.tsx#L144)

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

• `Readonly` **props**: *Readonly*<IAppProps\> & *Readonly*<{ `children?`: ReactNode  }\>

Defined in: node_modules/@types/react/index.d.ts:501

___

### refs

• **refs**: *object*

**`deprecated`** 
https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs

#### Type declaration:

Defined in: node_modules/@types/react/index.d.ts:507

___

### remoteListener

• `Private` **remoteListener**: [*RemoteListener*](client_internal_app_remote_listener.remotelistener.md)= null

the remote listener object that listens for the remote changes
and does the registration of itemize items that are loaded in order for listen to changes
as well as buildnumbers, currency factors changed info, etc...

Defined in: [client/internal/app/index.tsx:144](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/index.tsx#L144)

___

### state

• **state**: *Readonly*<IAppState\>

Defined in: node_modules/@types/react/index.d.ts:502

___

### tokenState

• `Private` **tokenState**: [*IActualTokenProviderState*](../interfaces/client_internal_providers_token_provider.iactualtokenproviderstate.md)= null

This is the token state that is actually given by the token provider that sits inside
the application itself, the reason why this app itself needs it, it's because the remote listener
as well as the update functions need token provider

Defined in: [client/internal/app/index.tsx:138](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/index.tsx#L138)

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

▸ `Optional`**UNSAFE_componentWillReceiveProps**(`nextProps`: *Readonly*<IAppProps\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<IAppProps\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:744

___

### UNSAFE\_componentWillUpdate

▸ `Optional`**UNSAFE_componentWillUpdate**(`nextProps`: *Readonly*<IAppProps\>, `nextState`: *Readonly*<IAppState\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<IAppProps\> |
`nextState` | *Readonly*<IAppState\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:772

___

### changeCountryTo

▸ **changeCountryTo**(`code`: *string*, `avoidChangingLanguageAndCurrency?`: *boolean*, `avoidUpdatingUser?`: *boolean*): *Promise*<void\>

changes the country given a specific country code
changing the country will trigger an automatic change
of currency and language

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`code` | *string* | the two letter uppercase code for the country   |
`avoidChangingLanguageAndCurrency?` | *boolean* | avoids changing the language and the currency   |
`avoidUpdatingUser?` | *boolean* | avoids updating the user    |

**Returns:** *Promise*<void\>

Defined in: [client/internal/app/index.tsx:445](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/index.tsx#L445)

___

### changeCurrencyTo

▸ **changeCurrencyTo**(`code`: *string*, `avoidUpdatingUser?`: *boolean*): *void*

Changes the currency to a given currency code
given its 3 letter uppercase code

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`code` | *string* | the three letter uppercase code of the currency   |
`avoidUpdatingUser?` | *boolean* | whether to avoid updating the user    |

**Returns:** *void*

Defined in: [client/internal/app/index.tsx:515](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/index.tsx#L515)

___

### changeLanguageTo

▸ **changeLanguageTo**(`locale`: *string*, `avoidUpdatingUser?`: *boolean*): *Promise*<void\>

Changes the language for the one specified by that locale

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`locale` | *string* | the two letter or language-region code for the locale   |
`avoidUpdatingUser?` | *boolean* | whether to avoid updating the user    |

**Returns:** *Promise*<void\>

Defined in: [client/internal/app/index.tsx:364](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/index.tsx#L364)

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

▸ `Optional`**componentDidUpdate**(`prevProps`: *Readonly*<IAppProps\>, `prevState`: *Readonly*<IAppState\>, `snapshot?`: *any*): *void*

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | *Readonly*<IAppProps\> |
`prevState` | *Readonly*<IAppState\> |
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

▸ `Optional`**componentWillReceiveProps**(`nextProps`: *Readonly*<IAppProps\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<IAppProps\> |
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

▸ `Optional`**componentWillUpdate**(`nextProps`: *Readonly*<IAppProps\>, `nextState`: *Readonly*<IAppState\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<IAppProps\> |
`nextState` | *Readonly*<IAppState\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:757

___

### finallySetLocaleDataFor

▸ **finallySetLocaleDataFor**(`locale`: *string*, `avoidUpdatingUser`: *boolean*): *void*

Performs the final steps to set the locale data for a given application
after all the respective locale infomation required has been loaded, this
includes changing the url

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`locale` | *string* | the locale we are updating for   |
`avoidUpdatingUser` | *boolean* | whether to avoid updating the user server information    |

**Returns:** *void*

Defined in: [client/internal/app/index.tsx:327](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/index.tsx#L327)

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

▸ `Optional`**getSnapshotBeforeUpdate**(`prevProps`: *Readonly*<IAppProps\>, `prevState`: *Readonly*<IAppState\>): *any*

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | *Readonly*<IAppProps\> |
`prevState` | *Readonly*<IAppState\> |

**Returns:** *any*

Defined in: node_modules/@types/react/index.d.ts:677

___

### hasLocaleDataFor

▸ **hasLocaleDataFor**(`locale`: *string*): *boolean*

Checks whether there is a locale data for a given language

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`locale` | *string* | the two letter or language-region code for the locale    |

**Returns:** *boolean*

Defined in: [client/internal/app/index.tsx:316](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/index.tsx#L316)

___

### render

▸ **render**(): *Element*

The render function

**Returns:** *Element*

Defined in: [client/internal/app/index.tsx:610](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/index.tsx#L610)

___

### renderAppWithLocaleContext

▸ **renderAppWithLocaleContext**(`routerProps`: *any*): *Element*

Renders the application with the locale context data

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`routerProps` | *any* | the url match from the router, contains the url language   |

**Returns:** *Element*

the application in the right locale context

Defined in: [client/internal/app/index.tsx:551](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/index.tsx#L551)

___

### setBlockedCallbackState

▸ **setBlockedCallbackState**(`state`: *boolean*): *void*

Sets the state for the blocked callback, this function is proxied using comlink
to the worker that actually calls this function and specifies if the state
of the app is blocked from update as it can't access indexeddb

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`state` | *boolean* | the state that it should set to    |

**Returns:** *void*

Defined in: [client/internal/app/index.tsx:224](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/index.tsx#L224)

___

### setState

▸ **setState**<K\>(`state`: IAppState \| (`prevState`: *Readonly*<IAppState\>, `props`: *Readonly*<IAppProps\>) => IAppState \| *Pick*<IAppState, K\> \| *Pick*<IAppState, K\>, `callback?`: () => *void*): *void*

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | *specifiedCountry* \| *specifiedCurrency* \| *specifiedCurrencyFactors* \| *localeIsUpdating* \| *localeIsUpdatingFrom* \| *updateIsBlocked* |

#### Parameters:

Name | Type |
:------ | :------ |
`state` | IAppState \| (`prevState`: *Readonly*<IAppState\>, `props`: *Readonly*<IAppProps\>) => IAppState \| *Pick*<IAppState, K\> \| *Pick*<IAppState, K\> |
`callback?` | () => *void* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:488

___

### setTokenState

▸ **setTokenState**(`state`: [*IActualTokenProviderState*](../interfaces/client_internal_providers_token_provider.iactualtokenproviderstate.md), `logout`: () => *void*): *void*

This function is triggered by the TokenProvider as a callback and triggers once
it has a state ready, the state is its own internal state, but since access of the token
provider state is needed here, it's streamed here once it's ready, as well as on any change

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`state` | [*IActualTokenProviderState*](../interfaces/client_internal_providers_token_provider.iactualtokenproviderstate.md) | the new state   |
`logout` | () => *void* | the logout function    |

**Returns:** *void*

Defined in: [client/internal/app/index.tsx:239](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/index.tsx#L239)

___

### shouldComponentUpdate

▸ `Optional`**shouldComponentUpdate**(`nextProps`: *Readonly*<IAppProps\>, `nextState`: *Readonly*<IAppState\>, `nextContext`: *any*): *boolean*

Called to determine whether the change in props and state should trigger a re-render.

`Component` always returns true.
`PureComponent` implements a shallow comparison on props and state and returns true if any
props or states have changed.

If false is returned, `Component#render`, `componentWillUpdate`
and `componentDidUpdate` will not be called.

#### Parameters:

Name | Type |
:------ | :------ |
`nextProps` | *Readonly*<IAppProps\> |
`nextState` | *Readonly*<IAppState\> |
`nextContext` | *any* |

**Returns:** *boolean*

Defined in: node_modules/@types/react/index.d.ts:631

___

### updateCurrencyFactorsIfNecessary

▸ **updateCurrencyFactorsIfNecessary**(): *Promise*<void\>

function that updates the currency factors if it finds it necessary, now according to the remote
listener specification, the currency factors are rechecked after a disconnect event, so we might not
be sure if such upate is necessary, and since it has rendering consequences we only update if necessary
also when the event triggers for a currency factors change in the remote listener, it might not be a
true change as maybe the prices hasn't changed, unlikely but possible

Currency factors is also service worked so it should work offline

**Returns:** *Promise*<void\>

Defined in: [client/internal/app/index.tsx:201](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/index.tsx#L201)

___

### updateUserProperty

▸ **updateUserProperty**(`propertyId`: *string*, `value`: *string*): *Promise*<void\>

updates an user property from the property list of user properties
and it performs a graphql request to do such

in practique this is used to update app_language, app_currency and app_country

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`propertyId` | *string* | the property id we are updating   |
`value` | *string* | the value    |

**Returns:** *Promise*<void\>

Defined in: [client/internal/app/index.tsx:260](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/index.tsx#L260)
