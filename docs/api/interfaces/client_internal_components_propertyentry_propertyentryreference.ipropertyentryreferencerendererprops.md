[](../README.md) / [Exports](../modules.md) / [client/internal/components/PropertyEntry/PropertyEntryReference](../modules/client_internal_components_propertyentry_propertyentryreference.md) / IPropertyEntryReferenceRendererProps

# Interface: IPropertyEntryReferenceRendererProps

[client/internal/components/PropertyEntry/PropertyEntryReference](../modules/client_internal_components_propertyentry_propertyentryreference.md).IPropertyEntryReferenceRendererProps

## Hierarchy

* [*IPropertyEntryRendererProps*](client_internal_components_propertyentry.ipropertyentryrendererprops.md)<string\>

  ↳ **IPropertyEntryReferenceRendererProps**

## Table of contents

### Properties

- [args](client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md#args)
- [autoFocus](client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md#autofocus)
- [canRestore](client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md#canrestore)
- [currentAppliedValue](client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md#currentappliedvalue)
- [currentFindError](client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md#currentfinderror)
- [currentInternalValue](client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md#currentinternalvalue)
- [currentInvalidReason](client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md#currentinvalidreason)
- [currentOptions](client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md#currentoptions)
- [currentSearchError](client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md#currentsearcherror)
- [currentTextualValue](client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md#currenttextualvalue)
- [currentValid](client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md#currentvalid)
- [currentValue](client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md#currentvalue)
- [currentValueIsFullfilled](client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md#currentvalueisfullfilled)
- [description](client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md#description)
- [disabled](client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md#disabled)
- [dismissFindError](client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md#dismissfinderror)
- [dismissSearchError](client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md#dismisssearcherror)
- [enableUserSetErrors](client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md#enableuserseterrors)
- [i18nUnspecified](client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md#i18nunspecified)
- [icon](client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md#icon)
- [isNullable](client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md#isnullable)
- [label](client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md#label)
- [loadAllPossibleValues](client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md#loadallpossiblevalues)
- [onCancel](client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md#oncancel)
- [onChange](client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md#onchange)
- [onChangeSearch](client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md#onchangesearch)
- [onRestore](client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md#onrestore)
- [onSelect](client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md#onselect)
- [placeholder](client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md#placeholder)
- [propertyId](client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md#propertyid)
- [refilterPossibleValues](client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md#refilterpossiblevalues)
- [rtl](client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md#rtl)

## Properties

### args

• **args**: *object*

The renderer args

#### Type declaration:

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[args](client_internal_components_propertyentry.ipropertyentryrendererprops.md#args)

Defined in: [client/internal/renderer.ts:19](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/renderer.ts#L19)

___

### autoFocus

• **autoFocus**: *boolean*

Whether the entry should autofocus

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[autoFocus](client_internal_components_propertyentry.ipropertyentryrendererprops.md#autofocus)

Defined in: [client/internal/components/PropertyEntry/index.tsx:103](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L103)

___

### canRestore

• **canRestore**: *boolean*

A boolean, normally true if our current applied value differs from our
current value, this check is exceptional as it uses the local equal function

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[canRestore](client_internal_components_propertyentry.ipropertyentryrendererprops.md#canrestore)

Defined in: [client/internal/components/PropertyEntry/index.tsx:75](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L75)

___

### currentAppliedValue

• **currentAppliedValue**: *string*

The currently applied value that is in sync with the server side

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[currentAppliedValue](client_internal_components_propertyentry.ipropertyentryrendererprops.md#currentappliedvalue)

Defined in: [client/internal/components/PropertyEntry/index.tsx:70](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L70)

___

### currentFindError

• **currentFindError**: [*EndpointErrorType*](../modules/base_errors.md#endpointerrortype)

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:27](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L27)

___

### currentInternalValue

• `Optional` **currentInternalValue**: *any*

The current internal value, if any given

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[currentInternalValue](client_internal_components_propertyentry.ipropertyentryrendererprops.md#currentinternalvalue)

Defined in: [client/internal/components/PropertyEntry/index.tsx:98](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L98)

___

### currentInvalidReason

• `Optional` **currentInvalidReason**: *string*

If current valid is false, then there might be a reason
attached to it, this invalid reason is locale specific;
if there's no currently invalid reason, this usually means
the item was forced into the invalid state by the passing
of a flag

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[currentInvalidReason](client_internal_components_propertyentry.ipropertyentryrendererprops.md#currentinvalidreason)

Defined in: [client/internal/components/PropertyEntry/index.tsx:94](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L94)

___

### currentOptions

• **currentOptions**: [*IPropertyEntryReferenceOption*](client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferenceoption.md)[]

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:26](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L26)

___

### currentSearchError

• **currentSearchError**: [*EndpointErrorType*](../modules/base_errors.md#endpointerrortype)

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:28](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L28)

___

### currentTextualValue

• **currentTextualValue**: *string*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:24](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L24)

___

### currentValid

• **currentValid**: *boolean*

Whether this current value is currently seen as valid, this is a finicky
value that does not correlate directly to the actual property
state; things such as being poked, or the user having forced
a value for this play a role as well

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[currentValid](client_internal_components_propertyentry.ipropertyentryrendererprops.md#currentvalid)

Defined in: [client/internal/components/PropertyEntry/index.tsx:86](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L86)

___

### currentValue

• **currentValue**: *string*

The current value

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[currentValue](client_internal_components_propertyentry.ipropertyentryrendererprops.md#currentvalue)

Defined in: [client/internal/components/PropertyEntry/index.tsx:79](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L79)

___

### currentValueIsFullfilled

• **currentValueIsFullfilled**: *boolean*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:25](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L25)

___

### description

• `Optional` **description**: *string*

The description of the property, properties might or might not have descriptions
this is locale specific; the description might not be passed if specified by the UI

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[description](client_internal_components_propertyentry.ipropertyentryrendererprops.md#description)

Defined in: [client/internal/components/PropertyEntry/index.tsx:61](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L61)

___

### disabled

• **disabled**: *boolean*

The disabled flag is passed often when the value is somehow
enforced, this means that the field cannot truly be editted
and attempts are futile to modify

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[disabled](client_internal_components_propertyentry.ipropertyentryrendererprops.md#disabled)

Defined in: [client/internal/components/PropertyEntry/index.tsx:109](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L109)

___

### dismissFindError

• **dismissFindError**: () => *void*

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:36](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L36)

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:36](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L36)

___

### dismissSearchError

• **dismissSearchError**: () => *void*

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:35](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L35)

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:35](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L35)

___

### enableUserSetErrors

• **enableUserSetErrors**: () => *void*

Allows for the display of user set error statuses, normally you
will call this function when your frield has been blurred so that
currentInvalidReason gets populated even if the field is not poked

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/index.tsx:116](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L116)

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[enableUserSetErrors](client_internal_components_propertyentry.ipropertyentryrendererprops.md#enableuserseterrors)

Defined in: [client/internal/components/PropertyEntry/index.tsx:116](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L116)

___

### i18nUnspecified

• **i18nUnspecified**: *string*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:22](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L22)

___

### icon

• `Optional` **icon**: ReactNode

Icon are an UI defined property for an icon to use during the view, handle as you wish

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[icon](client_internal_components_propertyentry.ipropertyentryrendererprops.md#icon)

Defined in: [client/internal/components/PropertyEntry/index.tsx:65](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L65)

___

### isNullable

• **isNullable**: *boolean*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:21](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L21)

___

### label

• `Optional` **label**: *string*

label of the property, every property should have a label unless it's hidden
this is locale specific

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[label](client_internal_components_propertyentry.ipropertyentryrendererprops.md#label)

Defined in: [client/internal/components/PropertyEntry/index.tsx:51](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L51)

___

### loadAllPossibleValues

• **loadAllPossibleValues**: (`limit`: *number*, `preventIds?`: *string*[], `preventEqualityWithProperties?`: *string*[]) => *void*

#### Type declaration:

▸ (`limit`: *number*, `preventIds?`: *string*[], `preventEqualityWithProperties?`: *string*[]): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`limit` | *number* |
`preventIds?` | *string*[] |
`preventEqualityWithProperties?` | *string*[] |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:31](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L31)

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:31](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L31)

___

### onCancel

• **onCancel**: () => *void*

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:34](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L34)

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:34](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L34)

___

### onChange

• **onChange**: (`value`: *string*, `internalValue`: *any*) => *void*

Standard on change function, every renderer will recieve this function
to trigger a change, however sometimes handlers will pass their own
change function that is supposed to be used instead of this one so
caution is advised which one to use

#### Type declaration:

▸ (`value`: *string*, `internalValue`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | *string* |
`internalValue` | *any* |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/index.tsx:124](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L124)

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[onChange](client_internal_components_propertyentry.ipropertyentryrendererprops.md#onchange)

Defined in: [client/internal/components/PropertyEntry/index.tsx:124](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L124)

___

### onChangeSearch

• **onChangeSearch**: (`str`: *string*, `preventIds?`: *string*[], `preventEqualityWithProperties?`: *string*[]) => *void*

#### Type declaration:

▸ (`str`: *string*, `preventIds?`: *string*[], `preventEqualityWithProperties?`: *string*[]): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`str` | *string* |
`preventIds?` | *string*[] |
`preventEqualityWithProperties?` | *string*[] |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:30](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L30)

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:30](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L30)

___

### onRestore

• **onRestore**: () => *void*

Call in order to trigger restoration, ensure that canRestore is true
when doing this

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/index.tsx:129](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L129)

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[onRestore](client_internal_components_propertyentry.ipropertyentryrendererprops.md#onrestore)

Defined in: [client/internal/components/PropertyEntry/index.tsx:129](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L129)

___

### onSelect

• **onSelect**: (`option`: [*IPropertyEntryReferenceOption*](client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferenceoption.md)) => *void*

#### Type declaration:

▸ (`option`: [*IPropertyEntryReferenceOption*](client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferenceoption.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`option` | [*IPropertyEntryReferenceOption*](client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferenceoption.md) |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:33](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L33)

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:33](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L33)

___

### placeholder

• `Optional` **placeholder**: *string*

The placeholder of the property, every property should have a placeholder unless it's hidden
this is locale specific

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[placeholder](client_internal_components_propertyentry.ipropertyentryrendererprops.md#placeholder)

Defined in: [client/internal/components/PropertyEntry/index.tsx:56](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L56)

___

### propertyId

• **propertyId**: *string*

The property id in question

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[propertyId](client_internal_components_propertyentry.ipropertyentryrendererprops.md#propertyid)

Defined in: [client/internal/components/PropertyEntry/index.tsx:45](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/index.tsx#L45)

___

### refilterPossibleValues

• **refilterPossibleValues**: (`preventIds?`: *string*[], `preventEqualityWithProperties?`: *string*[]) => *void*

#### Type declaration:

▸ (`preventIds?`: *string*[], `preventEqualityWithProperties?`: *string*[]): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`preventIds?` | *string*[] |
`preventEqualityWithProperties?` | *string*[] |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:32](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L32)

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:32](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L32)

___

### rtl

• **rtl**: *boolean*

Whether it is in rtl mode for a rtl language

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[rtl](client_internal_components_propertyentry.ipropertyentryrendererprops.md#rtl)

Defined in: [client/internal/renderer.ts:15](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/renderer.ts#L15)
