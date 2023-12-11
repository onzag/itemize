[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/components/PropertyEntry/PropertyEntryLocation](../modules/client_internal_components_PropertyEntry_PropertyEntryLocation.md) / IPropertyEntryLocationRendererProps

# Interface: IPropertyEntryLocationRendererProps

[client/internal/components/PropertyEntry/PropertyEntryLocation](../modules/client_internal_components_PropertyEntry_PropertyEntryLocation.md).IPropertyEntryLocationRendererProps

The location renderer props, just like other special renderers do not use the onChange raw function, as the functionality
is too complex for it and this handler will handle internal states for you

## Hierarchy

- [`IPropertyEntryRendererProps`](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md)\<[`IPropertyDefinitionSupportedLocationType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md)\>

  ↳ **`IPropertyEntryLocationRendererProps`**

## Table of contents

### Properties

- [activeSearchResults](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md#activesearchresults)
- [args](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md#args)
- [autoFocus](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md#autofocus)
- [canRestore](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md#canrestore)
- [clearSearchResults](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md#clearsearchresults)
- [clearSuggestions](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md#clearsuggestions)
- [currentAppliedValue](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md#currentappliedvalue)
- [currentInternalValue](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md#currentinternalvalue)
- [currentInvalidReason](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md#currentinvalidreason)
- [currentValid](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md#currentvalid)
- [currentValue](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md#currentvalue)
- [description](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md#description)
- [disabled](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md#disabled)
- [enableUserSetErrors](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md#enableuserseterrors)
- [label](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md#label)
- [language](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md#language)
- [languageOverride](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md#languageoverride)
- [nextSearchResult](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md#nextsearchresult)
- [nextSearchResultCircular](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md#nextsearchresultcircular)
- [noResultsLabel](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md#noresultslabel)
- [onChange](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md#onchange)
- [onChangeBySearchResult](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md#onchangebysearchresult)
- [onChangeBySuggestion](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md#onchangebysuggestion)
- [onManualPick](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md#onmanualpick)
- [onRestore](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md#onrestore)
- [onSearch](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md#onsearch)
- [onSearchQueryChange](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md#onsearchquerychange)
- [onViewportChange](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md#onviewportchange)
- [placeholder](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md#placeholder)
- [prevSearchResult](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md#prevsearchresult)
- [prevSearchResultCircular](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md#prevsearchresultcircular)
- [propertyId](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md#propertyid)
- [resultLabel](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md#resultlabel)
- [resultOutOfLabel](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md#resultoutoflabel)
- [rtl](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md#rtl)
- [searchQuery](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md#searchquery)
- [searchSuggestions](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md#searchsuggestions)
- [uniqueId](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md#uniqueid)
- [viewport](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md#viewport)

## Properties

### activeSearchResults

• **activeSearchResults**: [`IPropertyDefinitionSupportedLocationType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md)[]

The current active search results, an array, but if a search
is not taking place, the value is null

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:171](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L171)

___

### args

• **args**: `Object`

The renderer args

#### Index signature

▪ [arg: `string`]: `any`

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[args](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#args)

#### Defined in

[client/internal/renderer.ts:19](https://github.com/onzag/itemize/blob/59702dd5/client/internal/renderer.ts#L19)

___

### autoFocus

• **autoFocus**: `boolean`

Whether the entry should autofocus

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[autoFocus](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#autofocus)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:107](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/index.tsx#L107)

___

### canRestore

• **canRestore**: `boolean`

A boolean, normally true if our current applied value differs from our
current value, this check is exceptional as it uses the local equal function

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[canRestore](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#canrestore)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:79](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/index.tsx#L79)

___

### clearSearchResults

• **clearSearchResults**: () => `void`

#### Type declaration

▸ (): `void`

Clear all the suggestions

##### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:121](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L121)

___

### clearSuggestions

• **clearSuggestions**: () => `void`

#### Type declaration

▸ (): `void`

Clear all the suggestions

##### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:116](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L116)

___

### currentAppliedValue

• **currentAppliedValue**: [`IPropertyDefinitionSupportedLocationType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md)

The currently applied value that is in sync with the server side

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[currentAppliedValue](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentappliedvalue)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:74](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/index.tsx#L74)

___

### currentInternalValue

• `Optional` **currentInternalValue**: `any`

The current internal value, if any given

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[currentInternalValue](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentinternalvalue)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:102](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/index.tsx#L102)

___

### currentInvalidReason

• `Optional` **currentInvalidReason**: `string`

If current valid is false, then there might be a reason
attached to it, this invalid reason is locale specific;
if there's no currently invalid reason, this usually means
the item was forced into the invalid state by the passing
of a flag

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[currentInvalidReason](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentinvalidreason)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:98](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/index.tsx#L98)

___

### currentValid

• **currentValid**: `boolean`

Whether this current value is currently seen as valid, this is a finicky
value that does not correlate directly to the actual property
state; things such as being poked, or the user having forced
a value for this play a role as well

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[currentValid](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentvalid)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:90](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/index.tsx#L90)

___

### currentValue

• **currentValue**: [`IPropertyDefinitionSupportedLocationType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md)

The current value

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[currentValue](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentvalue)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:83](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/index.tsx#L83)

___

### description

• `Optional` **description**: `string`

The description of the property, properties might or might not have descriptions
this is locale specific; the description might not be passed if specified by the UI

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[description](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#description)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:69](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/index.tsx#L69)

___

### disabled

• **disabled**: `boolean`

The disabled flag is passed often when the value is somehow
enforced, this means that the field cannot truly be editted
and attempts are futile to modify

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[disabled](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#disabled)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:113](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/index.tsx#L113)

___

### enableUserSetErrors

• **enableUserSetErrors**: () => `void`

#### Type declaration

▸ (): `void`

Allows for the display of user set error statuses, normally you
will call this function when your field has been blurred so that
currentInvalidReason gets populated even if the field is not poked

##### Returns

`void`

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[enableUserSetErrors](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#enableuserseterrors)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:120](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/index.tsx#L120)

___

### label

• `Optional` **label**: `string`

label of the property, every property should have a label unless it's hidden
this is locale specific

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[label](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#label)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:59](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/index.tsx#L59)

___

### language

• **language**: `string`

The current language being used by the client overall in the app

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[language](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#language)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:138](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/index.tsx#L138)

___

### languageOverride

• `Optional` **languageOverride**: `string`

An optional language used mainly for the text type to override
own language properties that currently only text supports that

It may be possible for the editor to set its own text language
value if it has its own

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[languageOverride](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#languageoverride)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:147](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/index.tsx#L147)

___

### nextSearchResult

• **nextSearchResult**: [`IPropertyDefinitionSupportedLocationType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md)

The next search result from the active search result list,
null if no next

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:176](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L176)

___

### nextSearchResultCircular

• **nextSearchResultCircular**: [`IPropertyDefinitionSupportedLocationType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md)

The next search result, but circular, aka, it will
loop back to the first one; null if search results is empty

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:181](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L181)

___

### noResultsLabel

• **noResultsLabel**: `string`

A label to show when the search yielded no results

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:148](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L148)

___

### onChange

• **onChange**: (`value`: [`IPropertyDefinitionSupportedLocationType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md), `internalValue`: `any`) => `void`

#### Type declaration

▸ (`value`, `internalValue`): `void`

Standard on change function, every renderer will recieve this function
to trigger a change, however sometimes handlers will pass their own
change function that is supposed to be used instead of this one so
caution is advised which one to use

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`IPropertyDefinitionSupportedLocationType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md) |
| `internalValue` | `any` |

##### Returns

`void`

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[onChange](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#onchange)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:128](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/index.tsx#L128)

___

### onChangeBySearchResult

• **onChangeBySearchResult**: (`searchResult`: [`IPropertyDefinitionSupportedLocationType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md), `mantainViewport?`: `boolean`) => `void`

#### Type declaration

▸ (`searchResult`, `mantainViewport?`): `void`

Picks a search result and assigns it as the current value

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchResult` | [`IPropertyDefinitionSupportedLocationType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md) | the search result to use |
| `mantainViewport?` | `boolean` | by default choosing a search result will move the viewport to that search location, by passing this as true you will prevent that |

##### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:93](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L93)

___

### onChangeBySuggestion

• **onChangeBySuggestion**: (`searchSuggestion`: [`IPropertyDefinitionSupportedLocationType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md), `mantainViewport?`: `boolean`) => `void`

#### Type declaration

▸ (`searchSuggestion`, `mantainViewport?`): `void`

Picks a suggestion and assigns it as the current value, choosing
a suggestion is similar from a search result, so do not mix them
up; if a search result is beng used, use the search change function
as that will update the list of search results and marked locations

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchSuggestion` | [`IPropertyDefinitionSupportedLocationType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md) | the search suggestion |
| `mantainViewport?` | `boolean` | by default choosing a suggestion will move the viewport to that search location, by passing this as true you will prevent that |

##### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:108](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L108)

___

### onManualPick

• **onManualPick**: (`value`: [`IPropertyDefinitionSupportedLocationType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md), `mantainViewport?`: `boolean`) => `void`

#### Type declaration

▸ (`value`, `mantainViewport?`): `void`

Manually choose a value, this function is rather special
on the mechanism that it uses, given that it will try to autocomplete
incomplete picks

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`IPropertyDefinitionSupportedLocationType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md) | the value of that we want to manually pick |
| `mantainViewport?` | `boolean` | by default doing a manual pick will fly to that location, pass true to this to prevent that |

##### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:140](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L140)

___

### onRestore

• **onRestore**: () => `void`

#### Type declaration

▸ (): `void`

Call in order to trigger restoration, ensure that canRestore is true
when doing this

##### Returns

`void`

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[onRestore](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#onrestore)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:133](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/index.tsx#L133)

___

### onSearch

• **onSearch**: (`mantainViewport?`: `boolean`) => `Promise`\<[`IPropertyDefinitionSupportedLocationType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md)[]\>

#### Type declaration

▸ (`mantainViewport?`): `Promise`\<[`IPropertyDefinitionSupportedLocationType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md)[]\>

Trigger when the search button or the sorts is pressed
search will use the search query but will perform a deep search instead
suggestions are not the same as search results

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mantainViewport?` | `boolean` | by default the search will move the viewport to the first search result, with mantainViewport the viewport won't move |

##### Returns

`Promise`\<[`IPropertyDefinitionSupportedLocationType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md)[]\>

a promise with the results

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:82](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L82)

___

### onSearchQueryChange

• **onSearchQueryChange**: (`searchQuery`: `string`, `dontAutoloadSuggestions?`: `boolean`) => `void`

#### Type declaration

▸ (`searchQuery`, `dontAutoloadSuggestions?`): `void`

Trigger when the search query changes

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchQuery` | `string` | the search query that is specified |
| `dontAutoloadSuggestions?` | `boolean` | avoid automatically loading suggestions for this change, if your implementation has an specific time when to load suggestions, call this function again with false for this value then |

##### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:69](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L69)

___

### onViewportChange

• **onViewportChange**: (`viewport`: [`IViewport`](client_internal_components_PropertyEntry_PropertyEntryLocation.IViewport.md)) => `void`

#### Type declaration

▸ (`viewport`): `void`

Trigger when the viewport changes, so a new viewport is provided

##### Parameters

| Name | Type |
| :------ | :------ |
| `viewport` | [`IViewport`](client_internal_components_PropertyEntry_PropertyEntryLocation.IViewport.md) |

##### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:60](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L60)

___

### placeholder

• `Optional` **placeholder**: `string`

The placeholder of the property, every property should have a placeholder unless it's hidden
this is locale specific

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[placeholder](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#placeholder)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:64](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/index.tsx#L64)

___

### prevSearchResult

• **prevSearchResult**: [`IPropertyDefinitionSupportedLocationType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md)

The next search result from the active search result list,
null if no prev

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:186](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L186)

___

### prevSearchResultCircular

• **prevSearchResultCircular**: [`IPropertyDefinitionSupportedLocationType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md)

The prev search result, but circular, aka, it will
loop back to the first one; null if search results is empty

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:191](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L191)

___

### propertyId

• **propertyId**: `string`

The property id in question

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[propertyId](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#propertyid)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:47](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/index.tsx#L47)

___

### resultLabel

• **resultLabel**: `string`

The current localized label for the total amount of results

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:157](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L157)

___

### resultOutOfLabel

• **resultOutOfLabel**: `string`

The current localized lable of the current result, will
say something like, "result 1 out of 29"; in the user's language

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:153](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L153)

___

### rtl

• **rtl**: `boolean`

Whether it is in rtl mode for a rtl language

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[rtl](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#rtl)

#### Defined in

[client/internal/renderer.ts:15](https://github.com/onzag/itemize/blob/59702dd5/client/internal/renderer.ts#L15)

___

### searchQuery

• **searchQuery**: `string`

The search query we are searching or suggesting for, and/or
what is currently visible, use this as the value for your
field, ignore currentValue

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:197](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L197)

___

### searchSuggestions

• **searchSuggestions**: [`IPropertyDefinitionSupportedLocationType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md)[]

The current search suggestions, an array and always an array

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:166](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L166)

___

### uniqueId

• **uniqueId**: `string`

an unique id for this property
with the id and the version they are related to

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[uniqueId](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#uniqueid)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:53](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/index.tsx#L53)

___

### viewport

• **viewport**: [`IViewport`](client_internal_components_PropertyEntry_PropertyEntryLocation.IViewport.md)

The current viewport

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:162](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L162)
