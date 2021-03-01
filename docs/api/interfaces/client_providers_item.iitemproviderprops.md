[](../README.md) / [Exports](../modules.md) / [client/providers/item](../modules/client_providers_item.md) / IItemProviderProps

# Interface: IItemProviderProps

[client/providers/item](../modules/client_providers_item.md).IItemProviderProps

## Table of contents

### Properties

- [automaticSearch](client_providers_item.iitemproviderprops.md#automaticsearch)
- [automaticSearchForce](client_providers_item.iitemproviderprops.md#automaticsearchforce)
- [automaticSearchInstant](client_providers_item.iitemproviderprops.md#automaticsearchinstant)
- [automaticSearchIsOnlyInitial](client_providers_item.iitemproviderprops.md#automaticsearchisonlyinitial)
- [avoidLoading](client_providers_item.iitemproviderprops.md#avoidloading)
- [children](client_providers_item.iitemproviderprops.md#children)
- [cleanOnDismount](client_providers_item.iitemproviderprops.md#cleanondismount)
- [disableExternalChecks](client_providers_item.iitemproviderprops.md#disableexternalchecks)
- [forId](client_providers_item.iitemproviderprops.md#forid)
- [forVersion](client_providers_item.iitemproviderprops.md#forversion)
- [includePolicies](client_providers_item.iitemproviderprops.md#includepolicies)
- [includes](client_providers_item.iitemproviderprops.md#includes)
- [injectParentContext](client_providers_item.iitemproviderprops.md#injectparentcontext)
- [itemDefinition](client_providers_item.iitemproviderprops.md#itemdefinition)
- [loadModerationFields](client_providers_item.iitemproviderprops.md#loadmoderationfields)
- [loadSearchFromNavigation](client_providers_item.iitemproviderprops.md#loadsearchfromnavigation)
- [loadUnversionedFallback](client_providers_item.iitemproviderprops.md#loadunversionedfallback)
- [longTermCaching](client_providers_item.iitemproviderprops.md#longtermcaching)
- [markForDestructionOnLogout](client_providers_item.iitemproviderprops.md#markfordestructiononlogout)
- [mountId](client_providers_item.iitemproviderprops.md#mountid)
- [onDelete](client_providers_item.iitemproviderprops.md#ondelete)
- [onLoad](client_providers_item.iitemproviderprops.md#onload)
- [onSearch](client_providers_item.iitemproviderprops.md#onsearch)
- [onStateChange](client_providers_item.iitemproviderprops.md#onstatechange)
- [onSubmit](client_providers_item.iitemproviderprops.md#onsubmit)
- [prefills](client_providers_item.iitemproviderprops.md#prefills)
- [properties](client_providers_item.iitemproviderprops.md#properties)
- [searchCounterpart](client_providers_item.iitemproviderprops.md#searchcounterpart)
- [setters](client_providers_item.iitemproviderprops.md#setters)
- [static](client_providers_item.iitemproviderprops.md#static)
- [waitAndMerge](client_providers_item.iitemproviderprops.md#waitandmerge)

## Properties

### automaticSearch

• `Optional` **automaticSearch**: [*IActionSearchOptions*](client_providers_item.iactionsearchoptions.md)

automatic search triggers an automatic search when the item mounts
or it detects a change in the properties, this basically triggers
the .search function with these arguments whenever it is detected
it should do so

Defined in: [client/providers/item.tsx:561](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L561)

___

### automaticSearchForce

• `Optional` **automaticSearchForce**: *boolean*

Forces the automatic search to happen even if the search already holds
a state

Defined in: [client/providers/item.tsx:566](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L566)

___

### automaticSearchInstant

• `Optional` **automaticSearchInstant**: *boolean*

Make the automatic search refresh immediately
not compatible with automaticSearchIsOnlyInitial
usually the automatic search will stack refreshes for 300ms
in order to allow keystrokes to stack and not update per keystroke
on your entry field but sometimes you would
rather get instant results, as eg. your filters are selects
rather than entries with text

Defined in: [client/providers/item.tsx:580](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L580)

___

### automaticSearchIsOnlyInitial

• `Optional` **automaticSearchIsOnlyInitial**: *boolean*

Makes automatic search happen only on mount

Defined in: [client/providers/item.tsx:570](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L570)

___

### avoidLoading

• `Optional` **avoidLoading**: *boolean*

avoids running loadValue

Defined in: [client/providers/item.tsx:636](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L636)

___

### children

• `Optional` **children**: ReactNode

children that will be feed into the context

Defined in: [client/providers/item.tsx:507](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L507)

___

### cleanOnDismount

• `Optional` **cleanOnDismount**: *boolean* \| [*IActionCleanOptions*](client_providers_item.iactioncleanoptions.md)

cleans or restores the value from the memory once the object dismounts
or the mount id changes; always remember to set a mountId property
for using this in order to be able to difference item definition
loaders between themselves

Defined in: [client/providers/item.tsx:616](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L616)

___

### disableExternalChecks

• `Optional` **disableExternalChecks**: *boolean*

some fields, eg. autocompleted ones and unique ones have rest
endpoints for them that will run checks, you might want to disable
these checks in two circumstances, 1. for efficiency if you don't need them
2. for an UX reason, for example during login, if the field is constantly checking
that the external check is unique, for an username, then you will have an annoying
error popping on, saying that the username is taken, but you are logging in so that
external check is unecessary; note that disabling external checks has no effect
if the item definition has no externally checked properties

Defined in: [client/providers/item.tsx:554](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L554)

___

### forId

• `Optional` **forId**: *string*

the id, specifying an id makes a huge difference

Defined in: [client/providers/item.tsx:524](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L524)

___

### forVersion

• `Optional` **forVersion**: *string*

the version

Defined in: [client/providers/item.tsx:528](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L528)

___

### includePolicies

• `Optional` **includePolicies**: *boolean*

excludes the policies from being part of the state

Defined in: [client/providers/item.tsx:609](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L609)

___

### includes

• `Optional` **includes**: *object*

only includes the items specified in the list in the state

#### Type declaration:

Defined in: [client/providers/item.tsx:605](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L605)

___

### injectParentContext

• `Optional` **injectParentContext**: *boolean*

allows insertion of the parent context within the children

Defined in: [client/providers/item.tsx:645](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L645)

___

### itemDefinition

• `Optional` **itemDefinition**: *string* \| [*default*](../classes/base_root_module_itemdefinition.default.md)

the item definition slash/separated/path
if you don't specify this, the context will be
based on the prop extensions emulated item definition

Defined in: [client/providers/item.tsx:520](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L520)

___

### loadModerationFields

• `Optional` **loadModerationFields**: *boolean*

Allows to load the moderation fields

Defined in: [client/providers/item.tsx:538](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L538)

___

### loadSearchFromNavigation

• `Optional` **loadSearchFromNavigation**: *string*

Load searches from the popstate event, use with the option for
storeResultsInNavigation and the same identifier

Defined in: [client/providers/item.tsx:585](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L585)

___

### loadUnversionedFallback

• `Optional` **loadUnversionedFallback**: *boolean*

Loads the unversioned version if the version
given is not found since every value must have
an unversioned primary form

Defined in: [client/providers/item.tsx:534](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L534)

___

### longTermCaching

• `Optional` **longTermCaching**: *boolean*

uses long term caching with the worker cache strategy

Defined in: [client/providers/item.tsx:628](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L628)

___

### markForDestructionOnLogout

• `Optional` **markForDestructionOnLogout**: *boolean*

marks the item for destruction as the user logs out

Defined in: [client/providers/item.tsx:632](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L632)

___

### mountId

• `Optional` **mountId**: *string*

mounting id, adding a mounting id ensures
that the on dismount functions are called
if this changes, otherwise they will only be called
on the literal componentWillUnmount alone

Defined in: [client/providers/item.tsx:514](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L514)

___

### onDelete

• `Optional` **onDelete**: (`data`: [*IBasicActionResponse*](client_providers_item.ibasicactionresponse.md)) => *void*

Callback triggers on delete

#### Type declaration:

▸ (`data`: [*IBasicActionResponse*](client_providers_item.ibasicactionresponse.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`data` | [*IBasicActionResponse*](client_providers_item.ibasicactionresponse.md) |

**Returns:** *void*

Defined in: [client/providers/item.tsx:661](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L661)

Defined in: [client/providers/item.tsx:661](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L661)

___

### onLoad

• `Optional` **onLoad**: (`data`: [*IActionResponseWithValue*](client_providers_item.iactionresponsewithvalue.md)) => *void*

Callback triggers on load

#### Type declaration:

▸ (`data`: [*IActionResponseWithValue*](client_providers_item.iactionresponsewithvalue.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`data` | [*IActionResponseWithValue*](client_providers_item.iactionresponsewithvalue.md) |

**Returns:** *void*

Defined in: [client/providers/item.tsx:657](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L657)

Defined in: [client/providers/item.tsx:657](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L657)

___

### onSearch

• `Optional` **onSearch**: (`data`: [*IActionResponseWithSearchResults*](client_providers_item.iactionresponsewithsearchresults.md)) => *void*

callback triggers on search with the response

#### Type declaration:

▸ (`data`: [*IActionResponseWithSearchResults*](client_providers_item.iactionresponsewithsearchresults.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`data` | [*IActionResponseWithSearchResults*](client_providers_item.iactionresponsewithsearchresults.md) |

**Returns:** *void*

Defined in: [client/providers/item.tsx:649](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L649)

Defined in: [client/providers/item.tsx:649](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L649)

___

### onStateChange

• `Optional` **onStateChange**: (`state`: [*IItemStateType*](base_root_module_itemdefinition.iitemstatetype.md)) => *void*

On state change, triggers when the item definition internal
state changes for whatever reason use with care as
it makes the execution slower

#### Type declaration:

▸ (`state`: [*IItemStateType*](base_root_module_itemdefinition.iitemstatetype.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`state` | [*IItemStateType*](base_root_module_itemdefinition.iitemstatetype.md) |

**Returns:** *void*

Defined in: [client/providers/item.tsx:667](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L667)

Defined in: [client/providers/item.tsx:667](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L667)

___

### onSubmit

• `Optional` **onSubmit**: (`data`: [*IActionResponseWithId*](client_providers_item.iactionresponsewithid.md)) => *void*

Callback triggers on submit

#### Type declaration:

▸ (`data`: [*IActionResponseWithId*](client_providers_item.iactionresponsewithid.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`data` | [*IActionResponseWithId*](client_providers_item.iactionresponsewithid.md) |

**Returns:** *void*

Defined in: [client/providers/item.tsx:653](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L653)

Defined in: [client/providers/item.tsx:653](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L653)

___

### prefills

• `Optional` **prefills**: [*IPropertySetterProps*](client_components_property_base.ipropertysetterprops.md)[]

Similar to setters but the values are just prefilled and as such are not
readonly, prefills only get executed during the initial mount
of the component

Defined in: [client/providers/item.tsx:596](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L596)

___

### properties

• `Optional` **properties**: *string*[]

only downloads and includes the properties specified in the list
in the state

Defined in: [client/providers/item.tsx:601](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L601)

___

### searchCounterpart

• `Optional` **searchCounterpart**: *boolean*

whether this is about the search counterpart for using
with searches, this opens a whole can of worms

Defined in: [client/providers/item.tsx:543](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L543)

___

### setters

• `Optional` **setters**: [*IPropertySetterProps*](client_components_property_base.ipropertysetterprops.md)[]

Setters for setting values for the properties within the item definition
itself, useful not to depend on mounting at time

Defined in: [client/providers/item.tsx:590](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L590)

___

### static

• `Optional` **static**: *TOTAL* \| *NO_LISTENING*

static components do not update
A no listening static item definition will not update on
remote changes
a total static component does not even ask for feedback
it displays what it initially gets, wherever it comes from

Defined in: [client/providers/item.tsx:624](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L624)

___

### waitAndMerge

• `Optional` **waitAndMerge**: *boolean*

loads using the slow method but it can be more efficient
as it will load values with a timeout

Defined in: [client/providers/item.tsx:641](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L641)
