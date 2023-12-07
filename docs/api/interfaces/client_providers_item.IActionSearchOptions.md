[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/providers/item](../modules/client_providers_item.md) / IActionSearchOptions

# Interface: IActionSearchOptions

[client/providers/item](../modules/client_providers_item.md).IActionSearchOptions

The options for searching

## Hierarchy

- [`IActionCleanOptions`](client_providers_item.IActionCleanOptions.md)

  ↳ **`IActionSearchOptions`**

## Table of contents

### Properties

- [cacheDoNotFallbackToPolyfill](client_providers_item.IActionSearchOptions.md#cachedonotfallbacktopolyfill)
- [cacheDoNotFallbackToSimpleSearch](client_providers_item.IActionSearchOptions.md#cachedonotfallbacktosimplesearch)
- [cacheMetadata](client_providers_item.IActionSearchOptions.md#cachemetadata)
- [cacheMetadataMismatchAction](client_providers_item.IActionSearchOptions.md#cachemetadatamismatchaction)
- [cacheNoLimitOffset](client_providers_item.IActionSearchOptions.md#cachenolimitoffset)
- [cachePolicy](client_providers_item.IActionSearchOptions.md#cachepolicy)
- [cleanSearchResultsOnAny](client_providers_item.IActionSearchOptions.md#cleansearchresultsonany)
- [cleanSearchResultsOnFailure](client_providers_item.IActionSearchOptions.md#cleansearchresultsonfailure)
- [cleanSearchResultsOnSuccess](client_providers_item.IActionSearchOptions.md#cleansearchresultsonsuccess)
- [cleanStateOnAny](client_providers_item.IActionSearchOptions.md#cleanstateonany)
- [cleanStateOnFailure](client_providers_item.IActionSearchOptions.md#cleanstateonfailure)
- [cleanStateOnSuccess](client_providers_item.IActionSearchOptions.md#cleanstateonsuccess)
- [clientDisabled](client_providers_item.IActionSearchOptions.md#clientdisabled)
- [createdBy](client_providers_item.IActionSearchOptions.md#createdby)
- [createdByFilter](client_providers_item.IActionSearchOptions.md#createdbyfilter)
- [createdByFilterOut](client_providers_item.IActionSearchOptions.md#createdbyfilterout)
- [enableNulls](client_providers_item.IActionSearchOptions.md#enablenulls)
- [idsFilter](client_providers_item.IActionSearchOptions.md#idsfilter)
- [idsFilterOut](client_providers_item.IActionSearchOptions.md#idsfilterout)
- [includesToRestoreOnAny](client_providers_item.IActionSearchOptions.md#includestorestoreonany)
- [includesToRestoreOnFailure](client_providers_item.IActionSearchOptions.md#includestorestoreonfailure)
- [includesToRestoreOnSuccess](client_providers_item.IActionSearchOptions.md#includestorestoreonsuccess)
- [limit](client_providers_item.IActionSearchOptions.md#limit)
- [listenPolicy](client_providers_item.IActionSearchOptions.md#listenpolicy)
- [listenPolicySlowPolling](client_providers_item.IActionSearchOptions.md#listenpolicyslowpolling)
- [markForDestructionOnLogout](client_providers_item.IActionSearchOptions.md#markfordestructiononlogout)
- [markForDestructionOnUnmount](client_providers_item.IActionSearchOptions.md#markfordestructiononunmount)
- [offset](client_providers_item.IActionSearchOptions.md#offset)
- [orderBy](client_providers_item.IActionSearchOptions.md#orderby)
- [parentIdsFilter](client_providers_item.IActionSearchOptions.md#parentidsfilter)
- [parentIdsFilterOut](client_providers_item.IActionSearchOptions.md#parentidsfilterout)
- [parentTypeFilter](client_providers_item.IActionSearchOptions.md#parenttypefilter)
- [parentTypeFilterOut](client_providers_item.IActionSearchOptions.md#parenttypefilterout)
- [parentedBy](client_providers_item.IActionSearchOptions.md#parentedby)
- [pileSearch](client_providers_item.IActionSearchOptions.md#pilesearch)
- [policiesToCleanOnAny](client_providers_item.IActionSearchOptions.md#policiestocleanonany)
- [policiesToCleanOnFailure](client_providers_item.IActionSearchOptions.md#policiestocleanonfailure)
- [policiesToCleanOnSuccess](client_providers_item.IActionSearchOptions.md#policiestocleanonsuccess)
- [progresser](client_providers_item.IActionSearchOptions.md#progresser)
- [propertiesToRestoreOnAny](client_providers_item.IActionSearchOptions.md#propertiestorestoreonany)
- [propertiesToRestoreOnFailure](client_providers_item.IActionSearchOptions.md#propertiestorestoreonfailure)
- [propertiesToRestoreOnSuccess](client_providers_item.IActionSearchOptions.md#propertiestorestoreonsuccess)
- [requestedIncludes](client_providers_item.IActionSearchOptions.md#requestedincludes)
- [requestedProperties](client_providers_item.IActionSearchOptions.md#requestedproperties)
- [restoreStateOnAny](client_providers_item.IActionSearchOptions.md#restorestateonany)
- [restoreStateOnFailure](client_providers_item.IActionSearchOptions.md#restorestateonfailure)
- [restoreStateOnSuccess](client_providers_item.IActionSearchOptions.md#restorestateonsuccess)
- [searchByIncludes](client_providers_item.IActionSearchOptions.md#searchbyincludes)
- [searchByProperties](client_providers_item.IActionSearchOptions.md#searchbyproperties)
- [since](client_providers_item.IActionSearchOptions.md#since)
- [ssrEnabled](client_providers_item.IActionSearchOptions.md#ssrenabled)
- [ssrNoLimitOffset](client_providers_item.IActionSearchOptions.md#ssrnolimitoffset)
- [ssrRequestedIncludes](client_providers_item.IActionSearchOptions.md#ssrrequestedincludes)
- [ssrRequestedProperties](client_providers_item.IActionSearchOptions.md#ssrrequestedproperties)
- [storeResultsInNavigation](client_providers_item.IActionSearchOptions.md#storeresultsinnavigation)
- [trackedProperty](client_providers_item.IActionSearchOptions.md#trackedproperty)
- [traditional](client_providers_item.IActionSearchOptions.md#traditional)
- [types](client_providers_item.IActionSearchOptions.md#types)
- [unpokeAfterAny](client_providers_item.IActionSearchOptions.md#unpokeafterany)
- [unpokeAfterFailure](client_providers_item.IActionSearchOptions.md#unpokeafterfailure)
- [unpokeAfterSuccess](client_providers_item.IActionSearchOptions.md#unpokeaftersuccess)
- [until](client_providers_item.IActionSearchOptions.md#until)
- [useSearchEngine](client_providers_item.IActionSearchOptions.md#usesearchengine)
- [versionFilter](client_providers_item.IActionSearchOptions.md#versionfilter)
- [versionFilterOut](client_providers_item.IActionSearchOptions.md#versionfilterout)
- [waitAndMerge](client_providers_item.IActionSearchOptions.md#waitandmerge)

## Properties

### cacheDoNotFallbackToPolyfill

• `Optional` **cacheDoNotFallbackToPolyfill**: `boolean`

Will not fallback to polyfill to store search results if the cache worker fails midway or is
otherwise not available, by default search will do all in its power to succesfully cache
even if that means using volatile memory

#### Defined in

[client/providers/item.tsx:856](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L856)

___

### cacheDoNotFallbackToSimpleSearch

• `Optional` **cacheDoNotFallbackToSimpleSearch**: `boolean`

refuse to fallback to a standard search if no cache worker support or if cache fails for some reason
not recommended to use this anywhere unless for syncing

you may want to enable cacheDoNotUsePolyfill as well as searches are allowed to use polyfills
by default

#### Defined in

[client/providers/item.tsx:838](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L838)

___

### cacheMetadata

• `Optional` **cacheMetadata**: `any`

This metadata will be cached alongside the cached value and whenever the value is retrieved from the cache the metadata
is compared against the value here, looking for a potential mismatch, use this for example in the case of permission changes
in soft read rules; some values may be hidden under softReadRoleAccess where they do not trigger an error but are
simply hidden, if the permissions change for some reason (eg user changes role) a new value will not be retrieved simply because
it doesn't know this for example

{
  userRoleWhenRetrieved: userData.role,
}

will be enough to trigger a cacheMetadataMismatchAction when the role changes in order to attempt to invalidate the cache
due to this and the soft rules

#### Defined in

[client/providers/item.tsx:877](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L877)

___

### cacheMetadataMismatchAction

• `Optional` **cacheMetadataMismatchAction**: [`ISearchCacheMetadataMismatchAction`](client_internal_gql_client_util.ISearchCacheMetadataMismatchAction.md) \| [`SearchCacheMetadataMismatchActionFn`](../modules/client_internal_gql_client_util.md#searchcachemetadatamismatchactionfn)

This function or value is used to perform an action when a metadata mismatch has been detected, and this will
perform further invalidation, even invalidation based on singular attributes

#### Defined in

[client/providers/item.tsx:882](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L882)

___

### cacheNoLimitOffset

• `Optional` **cacheNoLimitOffset**: `boolean`

if set searches that have been executed with the cache worker will not have a limit nor offset
applied to them, recommended to use if you want to download everything related to a specific user
but it may take forever due to batching, specially if the user has a lot of data

#### Defined in

[client/providers/item.tsx:844](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L844)

___

### cachePolicy

• `Optional` **cachePolicy**: ``"by-owner"`` \| ``"by-parent"`` \| ``"by-owner-and-parent"`` \| ``"by-property"`` \| ``"none"``

The cache policy to perform the search, using a cache policy will disable
any possibility of SSR since it can't be performed in the server side

none                 default, does not use a search cache
by-owner             will cause to download everything with the given createdBy attribute, and it will be stored in the local database
by-parent            will use the parent rather than the owner
by-owner-and-parent  will use both the owner and the parent and download everything related to this
by-property          will use a trackable property in order to cache, note that the property needs to be tracked
                     trackedProperty needs to be specified in this case

#### Defined in

[client/providers/item.tsx:830](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L830)

___

### cleanSearchResultsOnAny

• `Optional` **cleanSearchResultsOnAny**: `boolean`

cleans the search results when the action is completed

The search results were retrieved using automatic search or the search actioner, this allows to clean them
once the action is completed

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[cleanSearchResultsOnAny](client_providers_item.IActionCleanOptions.md#cleansearchresultsonany)

#### Defined in

[client/providers/item.tsx:323](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L323)

___

### cleanSearchResultsOnFailure

• `Optional` **cleanSearchResultsOnFailure**: `boolean`

cleans the search results when the action is completed and it FAILED

The search results were retrieved using automatic search or the search actioner, this allows to clean them
once the action is completed

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[cleanSearchResultsOnFailure](client_providers_item.IActionCleanOptions.md#cleansearchresultsonfailure)

#### Defined in

[client/providers/item.tsx:330](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L330)

___

### cleanSearchResultsOnSuccess

• `Optional` **cleanSearchResultsOnSuccess**: `boolean`

cleans the search results when the action is completed and it SUCCEEDS

The search results were retrieved using automatic search or the search actioner, this allows to clean them
once the action is completed

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[cleanSearchResultsOnSuccess](client_providers_item.IActionCleanOptions.md#cleansearchresultsonsuccess)

#### Defined in

[client/providers/item.tsx:316](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L316)

___

### cleanStateOnAny

• `Optional` **cleanStateOnAny**: `boolean`

Cleans the state back to all nulls, and destroys the current
applied value from the server, it wipes the data and clear memory

Warning, clean state might not clean anything
if the cleaning is blocked from happening by other providers that are using the same data; this is because
cleaning state releases all the memory and its applied value and it's basically used as such; to discard a value
but it's not possible to release the state for an applied value if other item provider is accessing such
state at the same time, always use propertiesToRestoreOn* when it's simply about restoring the value
back to empty or what they used to be as it may otherwise do nothing, cleaning IS NOT RELIABLE

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[cleanStateOnAny](client_providers_item.IActionCleanOptions.md#cleanstateonany)

#### Defined in

[client/providers/item.tsx:381](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L381)

___

### cleanStateOnFailure

• `Optional` **cleanStateOnFailure**: `boolean`

Cleans the state back to all nulls on failure, and destroys the current
applied value from the server, it wipes the data and clear memory

Warning, clean state on failure might not clean anything
if the cleaning is blocked from happening by other providers that are using the same data; this is because
cleaning state releases all the memory and its applied value and it's basically used as such; to discard a value
but it's not possible to release the state for an applied value if other item provider is accessing such
state at the same time, always use propertiesToRestoreOn* when it's simply about restoring the value
back to empty or what they used to be as it may otherwise do nothing, cleaning IS NOT RELIABLE

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[cleanStateOnFailure](client_providers_item.IActionCleanOptions.md#cleanstateonfailure)

#### Defined in

[client/providers/item.tsx:369](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L369)

___

### cleanStateOnSuccess

• `Optional` **cleanStateOnSuccess**: `boolean`

Cleans the state back to all nulls on success, and destroys the current
applied value from the server, it wipes the data and clear memory

Warning, clean state on success might not clean anything
if the cleaning is blocked from happening by other providers that are using the same data; this is because
cleaning state releases all the memory and its applied value and it's basically used as such; to discard a value
but it's not possible to release the state for an applied value if other item provider is accessing such
state at the same time, always use propertiesToRestoreOn* when it's simply about restoring the value
back to empty or what they used to be as it may otherwise do nothing, cleaning IS NOT RELIABLE

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[cleanStateOnSuccess](client_providers_item.IActionCleanOptions.md#cleanstateonsuccess)

#### Defined in

[client/providers/item.tsx:357](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L357)

___

### clientDisabled

• `Optional` **clientDisabled**: `boolean`

Disables the search in the client side

There are many reasons you may want to do this.
1. Just to disable a search, if that isn't ssrEnabled is equivalent to it being disabled altogether
2. To make a search only be executed in the server side and never in the client side with ssrEnabled true, this will
still retain consistency during render

#### Defined in

[client/providers/item.tsx:651](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L651)

___

### createdBy

• `Optional` **createdBy**: `string`

By whom it was created, this allows to limit the results that are by a specific
creator, this is very useful for example to ensure security policies are met
as the server may refuse to serve some information unless the creator is provided

Note that every search mode item definition has a created_by property
this however takes priority and will override that

#### Defined in

[client/providers/item.tsx:766](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L766)

___

### createdByFilter

• `Optional` **createdByFilter**: `string`[]

Denies items of a given creator (blacklist)

this acts like a filter after a search is done and does not replace
specifying the creator by createdBy as createdBy
has considerations with permissions

#### Defined in

[client/providers/item.tsx:1009](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1009)

___

### createdByFilterOut

• `Optional` **createdByFilterOut**: `string`[]

Only allows items of a given creator

this acts like a filter after a search is done and does not replace
specifying the creator by createdBy as createdBy
has considerations with permissions

#### Defined in

[client/providers/item.tsx:1000](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1000)

___

### enableNulls

• `Optional` **enableNulls**: `boolean`

By default when searching if a field is valued as null
then it will not be searched by it, the search action will delete
all null attributes, however if this flag is enabled these nulls will
be sent as search parameters, this means that only nulls will match

for example if searching an username the value "a" will search for all
users that contain an a, when the field is empty this is null, the default
behaviour is to send nothing, this means no filtering by username, however
with this flag a null value will be sent, which means only users that match
null itself will match, or a lack of username

#### Defined in

[client/providers/item.tsx:948](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L948)

___

### idsFilter

• `Optional` **idsFilter**: `string`[]

Only allow items of a specific ids

#### Defined in

[client/providers/item.tsx:986](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L986)

___

### idsFilterOut

• `Optional` **idsFilterOut**: `string`[]

Blacklist ids

#### Defined in

[client/providers/item.tsx:991](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L991)

___

### includesToRestoreOnAny

• `Optional` **includesToRestoreOnAny**: `string`[]

Restores the value of an include and all its sinking properties back to its applied value after the action is completed
as in the value that was retrieved from the server (or null if no value is loaded)

This is useful to keep unmodified states during adding, editing or even deleted
the value that is restored is the last value loaded, and since the action occurs
after the action is performed it will apply to that value

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[includesToRestoreOnAny](client_providers_item.IActionCleanOptions.md#includestorestoreonany)

#### Defined in

[client/providers/item.tsx:273](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L273)

___

### includesToRestoreOnFailure

• `Optional` **includesToRestoreOnFailure**: `string`[]

Restores the value of an include and all its sinking properties back to its applied value after the action is completed and FAILED
as in the value that was retrieved from the server (or null if no value is loaded)

This is useful to keep unmodified states during adding, editing or even deleted
the value that is restored is the last value loaded, and since the action occurs
after the action is performed it will apply to that value

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[includesToRestoreOnFailure](client_providers_item.IActionCleanOptions.md#includestorestoreonfailure)

#### Defined in

[client/providers/item.tsx:282](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L282)

___

### includesToRestoreOnSuccess

• `Optional` **includesToRestoreOnSuccess**: `string`[]

Restores the value of an include and all its sinking properties back to its applied value after the action is completed and SUCCEEDS
as in the value that was retrieved from the server (or null if no value is loaded)

This is useful to keep unmodified states during adding, editing or even deleted
the value that is restored is the last value loaded, and since the action occurs
after the action is performed it will apply to that value

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[includesToRestoreOnSuccess](client_providers_item.IActionCleanOptions.md#includestorestoreonsuccess)

#### Defined in

[client/providers/item.tsx:264](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L264)

___

### limit

• **limit**: `number`

The limit for the search in the database level, there's security attached to this
regarding the maximum records you may get, normally this number is smaller for traditional
search

#### Defined in

[client/providers/item.tsx:927](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L927)

___

### listenPolicy

• `Optional` **listenPolicy**: ``"by-owner"`` \| ``"by-parent"`` \| ``"by-owner-and-parent"`` \| ``"by-property"`` \| ``"none"``

The listening policy will keep the values up to date based on the criteria given
when used in conjunction with cache policy the values should match

none
by-owner             will listen based on the owner of the item
by-parent            will listen based on the parent node
by-owner-and-parent  will listen based on both the owner and the parent
by-property          will use the tracked property to listen realtime values

A listen policy is recommended to use with a cache policy (otherwise the value in the db will be static)
but not recommended to use without as it will perform a brand new search every time

#### Defined in

[client/providers/item.tsx:896](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L896)

___

### listenPolicySlowPolling

• `Optional` **listenPolicySlowPolling**: `boolean`

uses slow polling rather than realtime listening
this is not recommended to use, values update each minute more or less

#### Defined in

[client/providers/item.tsx:901](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L901)

___

### markForDestructionOnLogout

• `Optional` **markForDestructionOnLogout**: `boolean`

Creates a destruction marker so that the value is destroyed during logout
once the user logouts the database is wiped from this search given its criteria
it should therefore have a cache policy

#### Defined in

[client/providers/item.tsx:907](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L907)

___

### markForDestructionOnUnmount

• `Optional` **markForDestructionOnUnmount**: `boolean`

The destruction marker is executed once this component unmounts which will destroy
the search elements

#### Defined in

[client/providers/item.tsx:912](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L912)

___

### offset

• **offset**: `number`

The offset to use during this search

#### Defined in

[client/providers/item.tsx:931](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L931)

___

### orderBy

• `Optional` **orderBy**: [`IOrderByRuleType`](constants.IOrderByRuleType.md)

Order by rule to be used by the database

By default they will be sorted by creation date (recommended)

{
  order: {
    priority: 0, // smaller numbers are higher priority
    direction: "asc",
    nulls: "last",
  },
  name: {
    priority: 1,
    direction: "asc",
    nulls: "first",
  },
}

in this case the property "order" which may be a number will be used first
to sort, and later the property for the username will be used for sorting

#### Defined in

[client/providers/item.tsx:757](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L757)

___

### parentIdsFilter

• `Optional` **parentIdsFilter**: `string`[]

Only allows items of a given parent id

this acts like a filter after a search is done and does not replace
specifying the parent by parentedBy
has considerations with permissions

#### Defined in

[client/providers/item.tsx:1036](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1036)

___

### parentIdsFilterOut

• `Optional` **parentIdsFilterOut**: `string`[]

Denies items of a given parent id (blacklist)

this acts like a filter after a search is done and does not replace
specifying the parent by parentedBy
has considerations with permissions

#### Defined in

[client/providers/item.tsx:1045](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1045)

___

### parentTypeFilter

• `Optional` **parentTypeFilter**: `string`[]

Only allows items of a given parent type

this acts like a filter after a search is done and does not replace
specifying the parent by parentedBy
has considerations with permissions

#### Defined in

[client/providers/item.tsx:1018](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1018)

___

### parentTypeFilterOut

• `Optional` **parentTypeFilterOut**: `string`[]

Denies items of a given parent type (blacklist)

this acts like a filter after a search is done and does not replace
specifying the parent by parentedBy
has considerations with permissions

#### Defined in

[client/providers/item.tsx:1027](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1027)

___

### parentedBy

• `Optional` **parentedBy**: `Object`

The parent of the item (another item) this is important to specify in some
security scenarios as a given user may only have contextual access to specific
items given a parent

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id?` | `string` | Parented by a specific element with an specific id otherwise it is used for simple filtering will not work to use with a cache policy as the id needs to be specified |
| `item` | `string` | The qualified path of the item or a path for example users/user or MOD_users__IDEF_user |
| `version?` | `string` | The version for the given id that is wanted |

#### Defined in

[client/providers/item.tsx:789](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L789)

___

### pileSearch

• `Optional` **pileSearch**: `boolean` \| `ActionSearchOptionCb`

Pile search allows to pile search queries one on top of another and resolve conflicts that could be caused
by searching while searching, passing a boolean puts things in a queue where the last search is executed

#### Defined in

[client/providers/item.tsx:1051](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1051)

___

### policiesToCleanOnAny

• `Optional` **policiesToCleanOnAny**: [`PolicyPathType`](../modules/client_providers_item.md#policypathtype)[]

Cleans the value of a policy back to null

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[policiesToCleanOnAny](client_providers_item.IActionCleanOptions.md#policiestocleanonany)

#### Defined in

[client/providers/item.tsx:224](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L224)

___

### policiesToCleanOnFailure

• `Optional` **policiesToCleanOnFailure**: [`PolicyPathType`](../modules/client_providers_item.md#policypathtype)[]

Cleans the value of a policy back to null

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[policiesToCleanOnFailure](client_providers_item.IActionCleanOptions.md#policiestocleanonfailure)

#### Defined in

[client/providers/item.tsx:228](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L228)

___

### policiesToCleanOnSuccess

• `Optional` **policiesToCleanOnSuccess**: [`PolicyPathType`](../modules/client_providers_item.md#policypathtype)[]

Cleans the value of a policy back to null

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[policiesToCleanOnSuccess](client_providers_item.IActionCleanOptions.md#policiestocleanonsuccess)

#### Defined in

[client/providers/item.tsx:220](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L220)

___

### progresser

• `Optional` **progresser**: [`ProgresserFn`](../modules/gql_querier.md#progresserfn)

Uses a progresses to check the process of the search by a percentage

#### Defined in

[client/providers/item.tsx:961](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L961)

___

### propertiesToRestoreOnAny

• `Optional` **propertiesToRestoreOnAny**: `string`[]

Restores the value of a property back to its applied value after the action is completed
as in the value that was retrieved from the server (or null if no value is loaded)

This is useful to keep unmodified states during adding, editing or even deleted
the value that is restored is the last value loaded, and since the action occurs
after the action is performed it will apply to that value

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[propertiesToRestoreOnAny](client_providers_item.IActionCleanOptions.md#propertiestorestoreonany)

#### Defined in

[client/providers/item.tsx:246](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L246)

___

### propertiesToRestoreOnFailure

• `Optional` **propertiesToRestoreOnFailure**: `string`[]

Restores the value of a property back to its applied value after the action is completed and FAILED
as in the value that was retrieved from the server (or null if no value is loaded)

This is useful to keep unmodified states during adding, editing or even deleted
the value that is restored is the last value loaded, and since the action occurs
after the action is performed it will apply to that value

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[propertiesToRestoreOnFailure](client_providers_item.IActionCleanOptions.md#propertiestorestoreonfailure)

#### Defined in

[client/providers/item.tsx:255](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L255)

___

### propertiesToRestoreOnSuccess

• `Optional` **propertiesToRestoreOnSuccess**: `string`[]

Restores the value of a property back to its applied value after the action is completed and SUCCEEDS
as in the value that was retrieved from the server (or null if no value is loaded)

This is useful to keep unmodified states during adding, editing or even deleted
the value that is restored is the last value loaded, and since the action occurs
after the action is performed it will apply to that value

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[propertiesToRestoreOnSuccess](client_providers_item.IActionCleanOptions.md#propertiestorestoreonsuccess)

#### Defined in

[client/providers/item.tsx:237](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L237)

___

### requestedIncludes

• `Optional` **requestedIncludes**: `Object`

The requested includes and the sinking properties related to these includes

#### Index signature

▪ [include: `string`]: `string`[]

#### Defined in

[client/providers/item.tsx:672](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L672)

___

### requestedProperties

• **requestedProperties**: `string`[]

The properties to request from the search that will apply to
each element in the search, these properties will be requested

for example if you have users and you want to search and retrieve the username
but you also need the profile_picture, you will put username and profile_picture here

#### Defined in

[client/providers/item.tsx:659](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L659)

___

### restoreStateOnAny

• `Optional` **restoreStateOnAny**: `boolean`

Restores the state on success back to its applied value (all the properties and all the states) once the
given action completes

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[restoreStateOnAny](client_providers_item.IActionCleanOptions.md#restorestateonany)

#### Defined in

[client/providers/item.tsx:340](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L340)

___

### restoreStateOnFailure

• `Optional` **restoreStateOnFailure**: `boolean`

Restores the state on success back to its applied value (all the properties and all the states) once the
given action, completes and FAILED

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[restoreStateOnFailure](client_providers_item.IActionCleanOptions.md#restorestateonfailure)

#### Defined in

[client/providers/item.tsx:345](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L345)

___

### restoreStateOnSuccess

• `Optional` **restoreStateOnSuccess**: `boolean`

Restores the state on success back to its applied value (all the properties and all the states) once the
given action, completes and SUCCEEDS

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[restoreStateOnSuccess](client_providers_item.IActionCleanOptions.md#restorestateonsuccess)

#### Defined in

[client/providers/item.tsx:335](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L335)

___

### searchByIncludes

• `Optional` **searchByIncludes**: `Object`

The includes to be used to search with

#### Index signature

▪ [include: `string`]: `string`[]

#### Defined in

[client/providers/item.tsx:735](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L735)

___

### searchByProperties

• **searchByProperties**: (`string` \| [`IPropertyCoreProps`](client_components_property_base.IPropertyCoreProps.md))[]

The properties to be used to search with, properties to be used in search in the
search mode item (or module) must be searchable and used for search (or search only)

This represents an array of strings, normally you may use the standard property id
in here and that will include the default search counterparts ids, however you may be more specific

For example, a string type has SEARCH counterpart and IN counterpart, by default the search counterpart
will be used, however you may be more interested in using the IN counterpart for a list

In that sense

["username"]

Is equivalent to

[
  {
    id: "username",
    searchVariant: "search",
  }
]

And

[
  {
    id: "username",
    searchVariant: "in",
  }
]

Will allow to use in type taglist search using that counterpart

type         default variants [optional variants]
=============================
boolean      exact
currency     from, to (disableRangedSearch=false) exact (disableRangedSearch=true)
date         from, to (disableRangedSearch=false) exact (disableRangedSearch=true)
datetime     from, to (disableRangedSearch=false) exact (disableRangedSearch=true)
file
files
integer      from, to (disableRangedSearch=false) exact (disableRangedSearch=true)
location     location, radius
number       from, to (disableRangedSearch=false) exact (disableRangedSearch=true)
password
payment      from, to, payment-status, payment-type (disableRangedSearch=false) exact, payment-status, payment-type (disableRangedSearch=true)
string       search, [in]
taglist      search
text         search
time         from, to (disableRangedSearch=false) exact (disableRangedSearch=true)
unit         from, to (disableRangedSearch=false) exact (disableRangedSearch=true)
year         from, to (disableRangedSearch=false) exact (disableRangedSearch=true)

#### Defined in

[client/providers/item.tsx:731](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L731)

___

### since

• `Optional` **since**: `string`

The since attribute, will only retrieve items limited to that date
use the createDateTimeValue format in order to specify this value

note that this option takes priority
over the since property that exists within the search mode

#### Defined in

[client/providers/item.tsx:774](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L774)

___

### ssrEnabled

• `Optional` **ssrEnabled**: `boolean`

Use this to enable SSR search
SSR search is pretty heavy this is necessary for
USSD apps to work or for extreme SEO optimization
but it increases the payload retrieved by quite the amount

Cannot use cache policy
Only allowed in traditional search
It will not work otherwise

#### Defined in

[client/providers/item.tsx:817](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L817)

___

### ssrNoLimitOffset

• `Optional` **ssrNoLimitOffset**: `boolean`

When resolving SSR based searches they can be done without the use of a limit offset
this property is secure because it is resolved in the server side only so if the search
is marked like this it cannot be requested via the client

#### Defined in

[client/providers/item.tsx:850](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L850)

___

### ssrRequestedIncludes

• `Optional` **ssrRequestedIncludes**: `Object`

Similar to ssrRequestedProperties but for includes

#### Index signature

▪ [include: `string`]: `string`[]

#### Defined in

[client/providers/item.tsx:676](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L676)

___

### ssrRequestedProperties

• `Optional` **ssrRequestedProperties**: `string`[]

Use for server side optimization to avoid large payloads when doing SSR specific
renders, since the search is built and then stored as its state the mismatch
of signature is irrelevant

searches done using ssrRequestedProperties will unavoidably get re-requested
by the client side once it is mounted, similar to the case of cache policies

#### Defined in

[client/providers/item.tsx:668](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L668)

___

### storeResultsInNavigation

• `Optional` **storeResultsInNavigation**: `string`

will store the search results in the navigation and location and they
can later be loaded with loadSearchResultsFromNavigation

#### Defined in

[client/providers/item.tsx:953](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L953)

___

### trackedProperty

• `Optional` **trackedProperty**: `string`

The tracked property, all tracked properties must be of type exact-value-tracked or exact-identifier-tracked
exact-value-tracked is an arbitrary string value, where an exact-identifier-tracked is used for ids such as user ids
or such where special characters are not allowed

#### Defined in

[client/providers/item.tsx:862](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L862)

___

### traditional

• `Optional` **traditional**: `boolean`

Normally searches will download a list of records and use these records to retrieve the next
values, so even if the database changes, the value is kept as it was during that one search,
however if the list is small this is rather ineffective, a traditional search will simply download
all the data in a single request without doing lists of records

traditional is better for single page views, but worse for paginations

#### Defined in

[client/providers/item.tsx:921](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L921)

___

### types

• `Optional` **types**: `string`[]

Types to search as, only truly usable on module based search

#### Defined in

[client/providers/item.tsx:935](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L935)

___

### unpokeAfterAny

• `Optional` **unpokeAfterAny**: `boolean`

After the action is completed all the properties and includes will be unpoked

When a property is considered poked its error state shows, as it's usually hidden until the user has "poked it"
for example in the case of a password when the password is empty the property is invalid, but it only shows
that error after the user has interacted with it, hence the combination of restoring and unpoking, will clear a field
and make it not show an error

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[unpokeAfterAny](client_providers_item.IActionCleanOptions.md#unpokeafterany)

#### Defined in

[client/providers/item.tsx:300](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L300)

___

### unpokeAfterFailure

• `Optional` **unpokeAfterFailure**: `boolean`

After the action is completed and it FAILED all the properties and includes will be unpoked

When a property is considered poked its error state shows, as it's usually hidden until the user has "poked it"
for example in the case of a password when the password is empty the property is invalid, but it only shows
that error after the user has interacted with it, hence the combination of restoring and unpoking, will clear a field
and make it not show an error

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[unpokeAfterFailure](client_providers_item.IActionCleanOptions.md#unpokeafterfailure)

#### Defined in

[client/providers/item.tsx:309](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L309)

___

### unpokeAfterSuccess

• `Optional` **unpokeAfterSuccess**: `boolean`

After the action is completed and it SUCCEEDS all the properties and includes will be unpoked

When a property is considered poked its error state shows, as it's usually hidden until the user has "poked it"
for example in the case of a password when the password is empty the property is invalid, but it only shows
that error after the user has interacted with it, hence the combination of restoring and unpoking, will clear a field
and make it not show an error

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[unpokeAfterSuccess](client_providers_item.IActionCleanOptions.md#unpokeaftersuccess)

#### Defined in

[client/providers/item.tsx:291](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L291)

___

### until

• `Optional` **until**: `string`

Similar to since but to limit until when the results are received
use the function createDateTimeValue to specify this value

note that this option takes priority
over the since property that exists within the search mode

#### Defined in

[client/providers/item.tsx:782](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L782)

___

### useSearchEngine

• `Optional` **useSearchEngine**: `string` \| `boolean`

Uses the search engine instead of the standard database level query, provides some limitations
such as that it cannot anymore have offset that are non-zero so traditional pagination
is not feasible

if given a string value it represents the language that it is used, boolean uses all languages

The item must be search engine enabled or otherwise this will cause an error

#### Defined in

[client/providers/item.tsx:971](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L971)

___

### versionFilter

• `Optional` **versionFilter**: `string`

Only allow items of a specific version

#### Defined in

[client/providers/item.tsx:976](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L976)

___

### versionFilterOut

• `Optional` **versionFilterOut**: `string`

Blacklist a specific version

#### Defined in

[client/providers/item.tsx:981](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L981)

___

### waitAndMerge

• `Optional` **waitAndMerge**: `boolean`

uses wait and merge to merge with other searches

#### Defined in

[client/providers/item.tsx:957](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L957)
