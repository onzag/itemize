[](../README.md) / [Exports](../modules.md) / [client/internal/components/PropertyEntry/PropertyEntryLocation](../modules/client_internal_components_propertyentry_propertyentrylocation.md) / IPropertyEntryLocationRendererProps

# Interface: IPropertyEntryLocationRendererProps

[client/internal/components/PropertyEntry/PropertyEntryLocation](../modules/client_internal_components_propertyentry_propertyentrylocation.md).IPropertyEntryLocationRendererProps

The location renderer props, just like other special renderers do not use the onChange raw function, as the functionality
is too complex for it and this handler will handle internal states for you

## Hierarchy

* [*IPropertyEntryRendererProps*](client_internal_components_propertyentry.ipropertyentryrendererprops.md)<[*IPropertyDefinitionSupportedLocationType*](base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md)\>

  ↳ **IPropertyEntryLocationRendererProps**

## Table of contents

### Properties

- [activeSearchResults](client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md#activesearchresults)
- [args](client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md#args)
- [autoFocus](client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md#autofocus)
- [canRestore](client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md#canrestore)
- [clearSearchResults](client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md#clearsearchresults)
- [clearSuggestions](client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md#clearsuggestions)
- [currentAppliedValue](client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md#currentappliedvalue)
- [currentInternalValue](client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md#currentinternalvalue)
- [currentInvalidReason](client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md#currentinvalidreason)
- [currentValid](client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md#currentvalid)
- [currentValue](client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md#currentvalue)
- [description](client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md#description)
- [disabled](client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md#disabled)
- [enableUserSetErrors](client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md#enableuserseterrors)
- [icon](client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md#icon)
- [label](client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md#label)
- [nextSearchResult](client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md#nextsearchresult)
- [nextSearchResultCircular](client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md#nextsearchresultcircular)
- [noResultsLabel](client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md#noresultslabel)
- [onChange](client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md#onchange)
- [onChangeBySearchResult](client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md#onchangebysearchresult)
- [onChangeBySuggestion](client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md#onchangebysuggestion)
- [onManualPick](client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md#onmanualpick)
- [onRestore](client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md#onrestore)
- [onSearch](client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md#onsearch)
- [onSearchQueryChange](client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md#onsearchquerychange)
- [onViewportChange](client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md#onviewportchange)
- [placeholder](client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md#placeholder)
- [prevSearchResult](client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md#prevsearchresult)
- [prevSearchResultCircular](client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md#prevsearchresultcircular)
- [propertyId](client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md#propertyid)
- [resultOutOfLabel](client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md#resultoutoflabel)
- [rtl](client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md#rtl)
- [searchQuery](client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md#searchquery)
- [searchSuggestions](client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md#searchsuggestions)
- [viewport](client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md#viewport)

## Properties

### activeSearchResults

• **activeSearchResults**: [*IPropertyDefinitionSupportedLocationType*](base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md)[]

The current active search results, an array, but if a search
is not taking place, the value is null

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:166](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L166)

___

### args

• **args**: *object*

The renderer args

#### Type declaration:

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[args](client_internal_components_propertyentry.ipropertyentryrendererprops.md#args)

Defined in: [client/internal/renderer.ts:19](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/renderer.ts#L19)

___

### autoFocus

• **autoFocus**: *boolean*

Whether the entry should autofocus

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[autoFocus](client_internal_components_propertyentry.ipropertyentryrendererprops.md#autofocus)

Defined in: [client/internal/components/PropertyEntry/index.tsx:103](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/index.tsx#L103)

___

### canRestore

• **canRestore**: *boolean*

A boolean, normally true if our current applied value differs from our
current value, this check is exceptional as it uses the local equal function

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[canRestore](client_internal_components_propertyentry.ipropertyentryrendererprops.md#canrestore)

Defined in: [client/internal/components/PropertyEntry/index.tsx:75](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/index.tsx#L75)

___

### clearSearchResults

• **clearSearchResults**: () => *void*

Clear all the suggestions

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:120](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L120)

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:120](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L120)

___

### clearSuggestions

• **clearSuggestions**: () => *void*

Clear all the suggestions

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:115](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L115)

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:115](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L115)

___

### currentAppliedValue

• **currentAppliedValue**: [*IPropertyDefinitionSupportedLocationType*](base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md)

The currently applied value that is in sync with the server side

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[currentAppliedValue](client_internal_components_propertyentry.ipropertyentryrendererprops.md#currentappliedvalue)

Defined in: [client/internal/components/PropertyEntry/index.tsx:70](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/index.tsx#L70)

___

### currentInternalValue

• `Optional` **currentInternalValue**: *any*

The current internal value, if any given

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[currentInternalValue](client_internal_components_propertyentry.ipropertyentryrendererprops.md#currentinternalvalue)

Defined in: [client/internal/components/PropertyEntry/index.tsx:98](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/index.tsx#L98)

___

### currentInvalidReason

• `Optional` **currentInvalidReason**: *string*

If current valid is false, then there might be a reason
attached to it, this invalid reason is locale specific;
if there's no currently invalid reason, this usually means
the item was forced into the invalid state by the passing
of a flag

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[currentInvalidReason](client_internal_components_propertyentry.ipropertyentryrendererprops.md#currentinvalidreason)

Defined in: [client/internal/components/PropertyEntry/index.tsx:94](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/index.tsx#L94)

___

### currentValid

• **currentValid**: *boolean*

Whether this current value is currently seen as valid, this is a finicky
value that does not correlate directly to the actual property
state; things such as being poked, or the user having forced
a value for this play a role as well

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[currentValid](client_internal_components_propertyentry.ipropertyentryrendererprops.md#currentvalid)

Defined in: [client/internal/components/PropertyEntry/index.tsx:86](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/index.tsx#L86)

___

### currentValue

• **currentValue**: [*IPropertyDefinitionSupportedLocationType*](base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md)

The current value

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[currentValue](client_internal_components_propertyentry.ipropertyentryrendererprops.md#currentvalue)

Defined in: [client/internal/components/PropertyEntry/index.tsx:79](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/index.tsx#L79)

___

### description

• `Optional` **description**: *string*

The description of the property, properties might or might not have descriptions
this is locale specific; the description might not be passed if specified by the UI

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[description](client_internal_components_propertyentry.ipropertyentryrendererprops.md#description)

Defined in: [client/internal/components/PropertyEntry/index.tsx:61](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/index.tsx#L61)

___

### disabled

• **disabled**: *boolean*

The disabled flag is passed often when the value is somehow
enforced, this means that the field cannot truly be editted
and attempts are futile to modify

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[disabled](client_internal_components_propertyentry.ipropertyentryrendererprops.md#disabled)

Defined in: [client/internal/components/PropertyEntry/index.tsx:109](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/index.tsx#L109)

___

### enableUserSetErrors

• **enableUserSetErrors**: () => *void*

Allows for the display of user set error statuses, normally you
will call this function when your frield has been blurred so that
currentInvalidReason gets populated even if the field is not poked

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/index.tsx:116](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/index.tsx#L116)

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[enableUserSetErrors](client_internal_components_propertyentry.ipropertyentryrendererprops.md#enableuserseterrors)

Defined in: [client/internal/components/PropertyEntry/index.tsx:116](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/index.tsx#L116)

___

### icon

• `Optional` **icon**: ReactNode

Icon are an UI defined property for an icon to use during the view, handle as you wish

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[icon](client_internal_components_propertyentry.ipropertyentryrendererprops.md#icon)

Defined in: [client/internal/components/PropertyEntry/index.tsx:65](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/index.tsx#L65)

___

### label

• `Optional` **label**: *string*

label of the property, every property should have a label unless it's hidden
this is locale specific

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[label](client_internal_components_propertyentry.ipropertyentryrendererprops.md#label)

Defined in: [client/internal/components/PropertyEntry/index.tsx:51](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/index.tsx#L51)

___

### nextSearchResult

• **nextSearchResult**: [*IPropertyDefinitionSupportedLocationType*](base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md)

The next search result from the active search result list,
null if no next

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:171](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L171)

___

### nextSearchResultCircular

• **nextSearchResultCircular**: [*IPropertyDefinitionSupportedLocationType*](base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md)

The next search result, but circular, aka, it will
loop back to the first one; null if search results is empty

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:176](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L176)

___

### noResultsLabel

• **noResultsLabel**: *string*

A label to show when the search yielded no results

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:147](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L147)

___

### onChange

• **onChange**: (`value`: [*IPropertyDefinitionSupportedLocationType*](base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md), `internalValue`: *any*) => *void*

Standard on change function, every renderer will recieve this function
to trigger a change, however sometimes handlers will pass their own
change function that is supposed to be used instead of this one so
caution is advised which one to use

#### Type declaration:

▸ (`value`: [*IPropertyDefinitionSupportedLocationType*](base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md), `internalValue`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | [*IPropertyDefinitionSupportedLocationType*](base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md) |
`internalValue` | *any* |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/index.tsx:124](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/index.tsx#L124)

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[onChange](client_internal_components_propertyentry.ipropertyentryrendererprops.md#onchange)

Defined in: [client/internal/components/PropertyEntry/index.tsx:124](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/index.tsx#L124)

___

### onChangeBySearchResult

• **onChangeBySearchResult**: (`searchResult`: [*IPropertyDefinitionSupportedLocationType*](base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md), `mantainViewport?`: *boolean*) => *void*

Picks a search result and assigns it as the current value

**`param`** the search result to use

**`param`** by default choosing a search result will move
the viewport to that search location, by passing this as true
you will prevent that

#### Type declaration:

▸ (`searchResult`: [*IPropertyDefinitionSupportedLocationType*](base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md), `mantainViewport?`: *boolean*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`searchResult` | [*IPropertyDefinitionSupportedLocationType*](base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md) |
`mantainViewport?` | *boolean* |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:92](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L92)

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:92](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L92)

___

### onChangeBySuggestion

• **onChangeBySuggestion**: (`searchSuggestion`: [*IPropertyDefinitionSupportedLocationType*](base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md), `mantainViewport?`: *boolean*) => *void*

Picks a suggestion and assigns it as the current value, choosing
a suggestion is similar from a search result, so do not mix them
up; if a search result is beng used, use the search change function
as that will update the list of search results and marked locations

**`param`** the search suggestion

**`param`** by default choosing a suggestion will move
the viewport to that search location, by passing this as true
you will prevent that

#### Type declaration:

▸ (`searchSuggestion`: [*IPropertyDefinitionSupportedLocationType*](base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md), `mantainViewport?`: *boolean*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`searchSuggestion` | [*IPropertyDefinitionSupportedLocationType*](base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md) |
`mantainViewport?` | *boolean* |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:107](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L107)

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:107](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L107)

___

### onManualPick

• **onManualPick**: (`value`: [*IPropertyDefinitionSupportedLocationType*](base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md), `mantainViewport?`: *boolean*) => *void*

Manually choose a value, this function is rather special
on the mechanism that it uses, given that it will try to autocomplete
incomplete picks

**`param`** the value of that we want to manually pick

**`param`** an id that we are manually picking for, this is an uuid
if you don't pass an id, it will request a geocode in order to get an id
pass null to request a geocode

**`param`** the standard text form we are picking for, you should
always pass a value for it

**`param`** an alternative (not specified by the user) value, if you
don't specify one, pass null to it to request a geocode

**`param`** the longitude, required

**`param`** the latitude, required

**`param`** by default doing a manual pick will fly to that
location, pass true to this to prevent that

#### Type declaration:

▸ (`value`: [*IPropertyDefinitionSupportedLocationType*](base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md), `mantainViewport?`: *boolean*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | [*IPropertyDefinitionSupportedLocationType*](base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md) |
`mantainViewport?` | *boolean* |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:139](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L139)

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:139](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L139)

___

### onRestore

• **onRestore**: () => *void*

Call in order to trigger restoration, ensure that canRestore is true
when doing this

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/index.tsx:129](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/index.tsx#L129)

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[onRestore](client_internal_components_propertyentry.ipropertyentryrendererprops.md#onrestore)

Defined in: [client/internal/components/PropertyEntry/index.tsx:129](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/index.tsx#L129)

___

### onSearch

• **onSearch**: (`mantainViewport?`: *boolean*) => *Promise*<[*IPropertyDefinitionSupportedLocationType*](base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md)[]\>

Trigger when the search button or the sorts is pressed
search will use the search query but will perform a deep search instead
suggestions are not the same as search results

**`param`** by default the search will move the viewport
to the first search result, with mantainViewport the viewport won't move

**`returns`** a promise with the results

#### Type declaration:

▸ (`mantainViewport?`: *boolean*): *Promise*<[*IPropertyDefinitionSupportedLocationType*](base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md)[]\>

#### Parameters:

Name | Type |
:------ | :------ |
`mantainViewport?` | *boolean* |

**Returns:** *Promise*<[*IPropertyDefinitionSupportedLocationType*](base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md)[]\>

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:81](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L81)

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:81](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L81)

___

### onSearchQueryChange

• **onSearchQueryChange**: (`searchQuery`: *string*, `dontAutoloadSuggestions?`: *boolean*) => *void*

Trigger when the search query changes

**`param`** the search query that is specified

**`param`** avoid automatically loading suggestions
for this change, if your implementation has an specific time when to load
suggestions, call this function again with false for this value then

#### Type declaration:

▸ (`searchQuery`: *string*, `dontAutoloadSuggestions?`: *boolean*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`searchQuery` | *string* |
`dontAutoloadSuggestions?` | *boolean* |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:68](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L68)

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:68](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L68)

___

### onViewportChange

• **onViewportChange**: (`viewport`: [*IViewport*](client_internal_components_propertyentry_propertyentrylocation.iviewport.md)) => *void*

Trigger when the viewport changes, so a new viewport is provided

#### Type declaration:

▸ (`viewport`: [*IViewport*](client_internal_components_propertyentry_propertyentrylocation.iviewport.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`viewport` | [*IViewport*](client_internal_components_propertyentry_propertyentrylocation.iviewport.md) |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:59](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L59)

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:59](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L59)

___

### placeholder

• `Optional` **placeholder**: *string*

The placeholder of the property, every property should have a placeholder unless it's hidden
this is locale specific

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[placeholder](client_internal_components_propertyentry.ipropertyentryrendererprops.md#placeholder)

Defined in: [client/internal/components/PropertyEntry/index.tsx:56](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/index.tsx#L56)

___

### prevSearchResult

• **prevSearchResult**: [*IPropertyDefinitionSupportedLocationType*](base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md)

The next search result from the active search result list,
null if no prev

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:181](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L181)

___

### prevSearchResultCircular

• **prevSearchResultCircular**: [*IPropertyDefinitionSupportedLocationType*](base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md)

The prev search result, but circular, aka, it will
loop back to the first one; null if search results is empty

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:186](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L186)

___

### propertyId

• **propertyId**: *string*

The property id in question

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[propertyId](client_internal_components_propertyentry.ipropertyentryrendererprops.md#propertyid)

Defined in: [client/internal/components/PropertyEntry/index.tsx:45](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/index.tsx#L45)

___

### resultOutOfLabel

• **resultOutOfLabel**: *string*

The current localized lable of the current result, will
say something like, "result 1 out of 29"; in the user's language

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:152](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L152)

___

### rtl

• **rtl**: *boolean*

Whether it is in rtl mode for a rtl language

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[rtl](client_internal_components_propertyentry.ipropertyentryrendererprops.md#rtl)

Defined in: [client/internal/renderer.ts:15](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/renderer.ts#L15)

___

### searchQuery

• **searchQuery**: *string*

The search query we are searching or suggesting for, and/or
what is currently visible, use this as the value for your
field, ignore currentValue

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:192](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L192)

___

### searchSuggestions

• **searchSuggestions**: [*IPropertyDefinitionSupportedLocationType*](base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md)[]

The current search suggestions, an array and always an array

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:161](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L161)

___

### viewport

• **viewport**: [*IViewport*](client_internal_components_propertyentry_propertyentrylocation.iviewport.md)

The current viewport

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:157](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L157)
