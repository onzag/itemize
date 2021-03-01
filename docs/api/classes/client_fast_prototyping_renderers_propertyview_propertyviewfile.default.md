[](../README.md) / [Exports](../modules.md) / [client/fast-prototyping/renderers/PropertyView/PropertyViewFile](../modules/client_fast_prototyping_renderers_propertyview_propertyviewfile.md) / default

# Class: default

[client/fast-prototyping/renderers/PropertyView/PropertyViewFile](../modules/client_fast_prototyping_renderers_propertyview_propertyviewfile.md).default

The property view file renderer will show a file, and if it's an image
it will show as an image with all lazyloading and all

supported args:
- NullComponent: a react component to use rather than the default if the value is null
- nullComponentArgs: an object to pass as props to the null component
- imageClassName: the image class name for the img tag when an image is available
- imageSizes: the image sizes for the sizes attribute for the image, default 70vw
- lazyLoad: whether to use lazyloading for images alone

## Hierarchy

* *Component*<[*IPropertyViewFileRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md), IPropertyViewFileRendererState\>

  ↳ **default**

## Table of contents

### Constructors

- [constructor](client_fast_prototyping_renderers_propertyview_propertyviewfile.default.md#constructor)

### Properties

- [context](client_fast_prototyping_renderers_propertyview_propertyviewfile.default.md#context)
- [io](client_fast_prototyping_renderers_propertyview_propertyviewfile.default.md#io)
- [isScrollEventAttached](client_fast_prototyping_renderers_propertyview_propertyviewfile.default.md#isscrolleventattached)
- [props](client_fast_prototyping_renderers_propertyview_propertyviewfile.default.md#props)
- [refImg](client_fast_prototyping_renderers_propertyview_propertyviewfile.default.md#refimg)
- [refs](client_fast_prototyping_renderers_propertyview_propertyviewfile.default.md#refs)
- [state](client_fast_prototyping_renderers_propertyview_propertyviewfile.default.md#state)
- [contextType](client_fast_prototyping_renderers_propertyview_propertyviewfile.default.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_fast_prototyping_renderers_propertyview_propertyviewfile.default.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_fast_prototyping_renderers_propertyview_propertyviewfile.default.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_fast_prototyping_renderers_propertyview_propertyviewfile.default.md#unsafe_componentwillupdate)
- [attachScrollEvent](client_fast_prototyping_renderers_propertyview_propertyviewfile.default.md#attachscrollevent)
- [checkWhetherInViewOldSchool](client_fast_prototyping_renderers_propertyview_propertyviewfile.default.md#checkwhetherinviewoldschool)
- [componentDidCatch](client_fast_prototyping_renderers_propertyview_propertyviewfile.default.md#componentdidcatch)
- [componentDidMount](client_fast_prototyping_renderers_propertyview_propertyviewfile.default.md#componentdidmount)
- [componentDidUpdate](client_fast_prototyping_renderers_propertyview_propertyviewfile.default.md#componentdidupdate)
- [componentWillMount](client_fast_prototyping_renderers_propertyview_propertyviewfile.default.md#componentwillmount)
- [componentWillReceiveProps](client_fast_prototyping_renderers_propertyview_propertyviewfile.default.md#componentwillreceiveprops)
- [componentWillUnmount](client_fast_prototyping_renderers_propertyview_propertyviewfile.default.md#componentwillunmount)
- [componentWillUpdate](client_fast_prototyping_renderers_propertyview_propertyviewfile.default.md#componentwillupdate)
- [forceUpdate](client_fast_prototyping_renderers_propertyview_propertyviewfile.default.md#forceupdate)
- [getSnapshotBeforeUpdate](client_fast_prototyping_renderers_propertyview_propertyviewfile.default.md#getsnapshotbeforeupdate)
- [removeIntersectionObserver](client_fast_prototyping_renderers_propertyview_propertyviewfile.default.md#removeintersectionobserver)
- [removeScrollEvent](client_fast_prototyping_renderers_propertyview_propertyviewfile.default.md#removescrollevent)
- [render](client_fast_prototyping_renderers_propertyview_propertyviewfile.default.md#render)
- [setState](client_fast_prototyping_renderers_propertyview_propertyviewfile.default.md#setstate)
- [setupIntersectionObserver](client_fast_prototyping_renderers_propertyview_propertyviewfile.default.md#setupintersectionobserver)
- [shouldComponentUpdate](client_fast_prototyping_renderers_propertyview_propertyviewfile.default.md#shouldcomponentupdate)

## Constructors

### constructor

\+ **new default**(`props`: [*IPropertyViewFileRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md)): [*default*](client_fast_prototyping_renderers_propertyview_propertyviewfile.default.md)

Builds the renderer

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`props` | [*IPropertyViewFileRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md) | the handler passed props    |

**Returns:** [*default*](client_fast_prototyping_renderers_propertyview_propertyviewfile.default.md)

Defined in: [client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx:47](https://github.com/onzag/itemize/blob/5fcde7cf/client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx#L47)

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

### io

• `Private` **io**: IntersectionObserver

Intersection observer to see when the element pops into view, if necessary

Defined in: [client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx:47](https://github.com/onzag/itemize/blob/5fcde7cf/client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx#L47)

___

### isScrollEventAttached

• `Private` **isScrollEventAttached**: *boolean*= false

whether the scroll event is actually attached

Defined in: [client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx:39](https://github.com/onzag/itemize/blob/5fcde7cf/client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx#L39)

___

### props

• `Readonly` **props**: *Readonly*<[*IPropertyViewFileRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md)\> & *Readonly*<{ `children?`: ReactNode  }\>

Defined in: node_modules/@types/react/index.d.ts:501

___

### refImg

• `Private` **refImg**: *RefObject*<HTMLImageElement\>

The image reference

Defined in: [client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx:43](https://github.com/onzag/itemize/blob/5fcde7cf/client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx#L43)

___

### refs

• **refs**: *object*

**`deprecated`** 
https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs

#### Type declaration:

Defined in: node_modules/@types/react/index.d.ts:507

___

### state

• **state**: *Readonly*<IPropertyViewFileRendererState\>

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

▸ `Optional`**UNSAFE_componentWillReceiveProps**(`nextProps`: *Readonly*<[*IPropertyViewFileRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md)\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<[*IPropertyViewFileRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md)\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:744

___

### UNSAFE\_componentWillUpdate

▸ `Optional`**UNSAFE_componentWillUpdate**(`nextProps`: *Readonly*<[*IPropertyViewFileRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md)\>, `nextState`: *Readonly*<IPropertyViewFileRendererState\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<[*IPropertyViewFileRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md)\> |
`nextState` | *Readonly*<IPropertyViewFileRendererState\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:772

___

### attachScrollEvent

▸ **attachScrollEvent**(): *void*

Attach the scroll event, only necessary for traditional
lazyloading

**Returns:** *void*

Defined in: [client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx:70](https://github.com/onzag/itemize/blob/5fcde7cf/client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx#L70)

___

### checkWhetherInViewOldSchool

▸ **checkWhetherInViewOldSchool**(): *void*

Old school way to check if an element is in view

**Returns:** *void*

Defined in: [client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx:92](https://github.com/onzag/itemize/blob/5fcde7cf/client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx#L92)

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

Now when the element mounts

**Returns:** *void*

Defined in: [client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx:150](https://github.com/onzag/itemize/blob/5fcde7cf/client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx#L150)

___

### componentDidUpdate

▸ **componentDidUpdate**(`prevProps`: [*IPropertyViewFileRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | [*IPropertyViewFileRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md) |

**Returns:** *void*

Defined in: [client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx:169](https://github.com/onzag/itemize/blob/5fcde7cf/client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx#L169)

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

▸ `Optional`**componentWillReceiveProps**(`nextProps`: *Readonly*<[*IPropertyViewFileRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md)\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<[*IPropertyViewFileRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md)\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:727

___

### componentWillUnmount

▸ **componentWillUnmount**(): *void*

**Returns:** *void*

Defined in: [client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx:179](https://github.com/onzag/itemize/blob/5fcde7cf/client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx#L179)

___

### componentWillUpdate

▸ `Optional`**componentWillUpdate**(`nextProps`: *Readonly*<[*IPropertyViewFileRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md)\>, `nextState`: *Readonly*<IPropertyViewFileRendererState\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<[*IPropertyViewFileRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md)\> |
`nextState` | *Readonly*<IPropertyViewFileRendererState\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:757

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

▸ `Optional`**getSnapshotBeforeUpdate**(`prevProps`: *Readonly*<[*IPropertyViewFileRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md)\>, `prevState`: *Readonly*<IPropertyViewFileRendererState\>): *any*

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | *Readonly*<[*IPropertyViewFileRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md)\> |
`prevState` | *Readonly*<IPropertyViewFileRendererState\> |

**Returns:** *any*

Defined in: node_modules/@types/react/index.d.ts:677

___

### removeIntersectionObserver

▸ **removeIntersectionObserver**(): *void*

Remove the intersection observer if it exist
it might have never been triggered

**Returns:** *void*

Defined in: [client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx:141](https://github.com/onzag/itemize/blob/5fcde7cf/client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx#L141)

___

### removeScrollEvent

▸ **removeScrollEvent**(): *void*

Removes the attached scroll event for lazyloading

**Returns:** *void*

Defined in: [client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx:82](https://github.com/onzag/itemize/blob/5fcde7cf/client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx#L82)

___

### render

▸ **render**(): *Element*

**Returns:** *Element*

Defined in: [client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx:183](https://github.com/onzag/itemize/blob/5fcde7cf/client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx#L183)

___

### setState

▸ **setState**<K\>(`state`: IPropertyViewFileRendererState \| (`prevState`: *Readonly*<IPropertyViewFileRendererState\>, `props`: *Readonly*<[*IPropertyViewFileRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md)\>) => IPropertyViewFileRendererState \| *Pick*<IPropertyViewFileRendererState, K\> \| *Pick*<IPropertyViewFileRendererState, K\>, `callback?`: () => *void*): *void*

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | *loaded* |

#### Parameters:

Name | Type |
:------ | :------ |
`state` | IPropertyViewFileRendererState \| (`prevState`: *Readonly*<IPropertyViewFileRendererState\>, `props`: *Readonly*<[*IPropertyViewFileRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md)\>) => IPropertyViewFileRendererState \| *Pick*<IPropertyViewFileRendererState, K\> \| *Pick*<IPropertyViewFileRendererState, K\> |
`callback?` | () => *void* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:488

___

### setupIntersectionObserver

▸ **setupIntersectionObserver**(): *void*

Intersection observer way to check if the image is in view

**Returns:** *void*

Defined in: [client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx:113](https://github.com/onzag/itemize/blob/5fcde7cf/client/fast-prototyping/renderers/PropertyView/PropertyViewFile.tsx#L113)

___

### shouldComponentUpdate

▸ `Optional`**shouldComponentUpdate**(`nextProps`: *Readonly*<[*IPropertyViewFileRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md)\>, `nextState`: *Readonly*<IPropertyViewFileRendererState\>, `nextContext`: *any*): *boolean*

Called to determine whether the change in props and state should trigger a re-render.

`Component` always returns true.
`PureComponent` implements a shallow comparison on props and state and returns true if any
props or states have changed.

If false is returned, `Component#render`, `componentWillUpdate`
and `componentDidUpdate` will not be called.

#### Parameters:

Name | Type |
:------ | :------ |
`nextProps` | *Readonly*<[*IPropertyViewFileRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md)\> |
`nextState` | *Readonly*<IPropertyViewFileRendererState\> |
`nextContext` | *any* |

**Returns:** *boolean*

Defined in: node_modules/@types/react/index.d.ts:631
