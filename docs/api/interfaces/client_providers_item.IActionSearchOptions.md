[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/providers/item](../modules/client_providers_item.md) / IActionSearchOptions

# Interface: IActionSearchOptions

[client/providers/item](../modules/client_providers_item.md).IActionSearchOptions

The options for searching

## Hierarchy

- [`IActionCleanOptions`](client_providers_item.IActionCleanOptions.md)

  ↳ **`IActionSearchOptions`**

## Table of contents

### Properties

- [cacheDoNotFallback](client_providers_item.IActionSearchOptions.md#cachedonotfallback)
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
- [createdBy](client_providers_item.IActionSearchOptions.md#createdby)
- [enableNulls](client_providers_item.IActionSearchOptions.md#enablenulls)
- [includesToRestoreOnAny](client_providers_item.IActionSearchOptions.md#includestorestoreonany)
- [includesToRestoreOnFailure](client_providers_item.IActionSearchOptions.md#includestorestoreonfailure)
- [includesToRestoreOnSuccess](client_providers_item.IActionSearchOptions.md#includestorestoreonsuccess)
- [limit](client_providers_item.IActionSearchOptions.md#limit)
- [listenPolicy](client_providers_item.IActionSearchOptions.md#listenpolicy)
- [markForDestructionOnLogout](client_providers_item.IActionSearchOptions.md#markfordestructiononlogout)
- [offset](client_providers_item.IActionSearchOptions.md#offset)
- [orderBy](client_providers_item.IActionSearchOptions.md#orderby)
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
- [storeResultsInNavigation](client_providers_item.IActionSearchOptions.md#storeresultsinnavigation)
- [trackedProperty](client_providers_item.IActionSearchOptions.md#trackedproperty)
- [traditional](client_providers_item.IActionSearchOptions.md#traditional)
- [types](client_providers_item.IActionSearchOptions.md#types)
- [unpokeAfterAny](client_providers_item.IActionSearchOptions.md#unpokeafterany)
- [unpokeAfterFailure](client_providers_item.IActionSearchOptions.md#unpokeafterfailure)
- [unpokeAfterSuccess](client_providers_item.IActionSearchOptions.md#unpokeaftersuccess)
- [until](client_providers_item.IActionSearchOptions.md#until)
- [useSearchEngine](client_providers_item.IActionSearchOptions.md#usesearchengine)
- [waitAndMerge](client_providers_item.IActionSearchOptions.md#waitandmerge)

## Properties

### cacheDoNotFallback

• `Optional` **cacheDoNotFallback**: `boolean`

refuse to fallback if no cache worker support or if cache fails for some reason
not recommended to use this anywhere unless for syncing

#### Defined in

[client/providers/item.tsx:749](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L749)

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

[client/providers/item.tsx:776](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L776)

___

### cacheMetadataMismatchAction

• `Optional` **cacheMetadataMismatchAction**: [`ISearchCacheMetadataMismatchAction`](client_internal_gql_client_util.ISearchCacheMetadataMismatchAction.md) \| [`SearchCacheMetadataMismatchActionFn`](../modules/client_internal_gql_client_util.md#searchcachemetadatamismatchactionfn)

This function or value is used to perform an action when a metadata mismatch has been detected, and this will
perform further invalidation, even invalidation based on singular attributes

#### Defined in

[client/providers/item.tsx:781](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L781)

___

### cacheNoLimitOffset

• `Optional` **cacheNoLimitOffset**: `boolean`

if set searches that have been executed with the cache worker will not have a limit nor offset
applied to them, recommended to use if you want to download everything related to a specific user
but it may take forever due to batching, specially if the user has a lot of data

#### Defined in

[client/providers/item.tsx:755](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L755)

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

[client/providers/item.tsx:744](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L744)

___

### cleanSearchResultsOnAny

• `Optional` **cleanSearchResultsOnAny**: `boolean`

cleans the search results when the action is completed

The search results were retrieved using automatic search or the search actioner, this allows to clean them
once the action is completed

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[cleanSearchResultsOnAny](client_providers_item.IActionCleanOptions.md#cleansearchresultsonany)

#### Defined in

[client/providers/item.tsx:291](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L291)

___

### cleanSearchResultsOnFailure

• `Optional` **cleanSearchResultsOnFailure**: `boolean`

cleans the search results when the action is completed and it FAILED

The search results were retrieved using automatic search or the search actioner, this allows to clean them
once the action is completed

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[cleanSearchResultsOnFailure](client_providers_item.IActionCleanOptions.md#cleansearchresultsonfailure)

#### Defined in

[client/providers/item.tsx:298](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L298)

___

### cleanSearchResultsOnSuccess

• `Optional` **cleanSearchResultsOnSuccess**: `boolean`

cleans the search results when the action is completed and it SUCCEEDS

The search results were retrieved using automatic search or the search actioner, this allows to clean them
once the action is completed

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[cleanSearchResultsOnSuccess](client_providers_item.IActionCleanOptions.md#cleansearchresultsonsuccess)

#### Defined in

[client/providers/item.tsx:284](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L284)

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

[client/providers/item.tsx:349](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L349)

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

[client/providers/item.tsx:337](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L337)

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

[client/providers/item.tsx:325](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L325)

___

### createdBy

• `Optional` **createdBy**: `string`

By whom it was created, this allows to limit the results that are by a specific
creator, this is very useful for example to ensure security policies are met
as the server may refuse to serve some information unless the creator is provided

Note that every search mode item definition has a created_by property
this however takes priority and will override that

#### Defined in

[client/providers/item.tsx:680](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L680)

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

[client/providers/item.tsx:837](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L837)

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

[client/providers/item.tsx:241](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L241)

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

[client/providers/item.tsx:250](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L250)

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

[client/providers/item.tsx:232](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L232)

___

### limit

• **limit**: `number`

The limit for the search in the database level, there's security attached to this
regarding the maximum records you may get, normally this number is smaller for traditional
search

#### Defined in

[client/providers/item.tsx:816](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L816)

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

[client/providers/item.tsx:795](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L795)

___

### markForDestructionOnLogout

• `Optional` **markForDestructionOnLogout**: `boolean`

Creates a destruction marker so that the value is destroyed during logout
once the user logouts the database is wiped from this search given its criteria
it should therefore have a cache policy

#### Defined in

[client/providers/item.tsx:801](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L801)

___

### offset

• **offset**: `number`

The offset to use during this search

#### Defined in

[client/providers/item.tsx:820](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L820)

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

[client/providers/item.tsx:671](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L671)

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

[client/providers/item.tsx:703](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L703)

___

### pileSearch

• `Optional` **pileSearch**: `boolean`

TODO implement pile search

#### Defined in

[client/providers/item.tsx:865](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L865)

___

### policiesToCleanOnAny

• `Optional` **policiesToCleanOnAny**: [`PolicyPathType`](../modules/client_providers_item.md#policypathtype)[]

Cleans the value of a policy back to null

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[policiesToCleanOnAny](client_providers_item.IActionCleanOptions.md#policiestocleanonany)

#### Defined in

[client/providers/item.tsx:192](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L192)

___

### policiesToCleanOnFailure

• `Optional` **policiesToCleanOnFailure**: [`PolicyPathType`](../modules/client_providers_item.md#policypathtype)[]

Cleans the value of a policy back to null

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[policiesToCleanOnFailure](client_providers_item.IActionCleanOptions.md#policiestocleanonfailure)

#### Defined in

[client/providers/item.tsx:196](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L196)

___

### policiesToCleanOnSuccess

• `Optional` **policiesToCleanOnSuccess**: [`PolicyPathType`](../modules/client_providers_item.md#policypathtype)[]

Cleans the value of a policy back to null

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[policiesToCleanOnSuccess](client_providers_item.IActionCleanOptions.md#policiestocleanonsuccess)

#### Defined in

[client/providers/item.tsx:188](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L188)

___

### progresser

• `Optional` **progresser**: [`ProgresserFn`](../modules/gql_querier.md#progresserfn)

Uses a progresses to check the process of the search by a percentage

#### Defined in

[client/providers/item.tsx:850](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L850)

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

[client/providers/item.tsx:214](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L214)

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

[client/providers/item.tsx:223](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L223)

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

[client/providers/item.tsx:205](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L205)

___

### requestedIncludes

• `Optional` **requestedIncludes**: `Object`

The requested includes and the sinking properties related to these includes

#### Index signature

▪ [include: `string`]: `string`[]

#### Defined in

[client/providers/item.tsx:590](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L590)

___

### requestedProperties

• **requestedProperties**: `string`[]

The properties to request from the search that will apply to
each element in the search, these properties will be requested

for example if you have users and you want to search and retrieve the username
but you also need the profile_picture, you will put username and profile_picture here

#### Defined in

[client/providers/item.tsx:586](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L586)

___

### restoreStateOnAny

• `Optional` **restoreStateOnAny**: `boolean`

Restores the state on success back to its applied value (all the properties and all the states) once the
given action completes

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[restoreStateOnAny](client_providers_item.IActionCleanOptions.md#restorestateonany)

#### Defined in

[client/providers/item.tsx:308](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L308)

___

### restoreStateOnFailure

• `Optional` **restoreStateOnFailure**: `boolean`

Restores the state on success back to its applied value (all the properties and all the states) once the
given action, completes and FAILED

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[restoreStateOnFailure](client_providers_item.IActionCleanOptions.md#restorestateonfailure)

#### Defined in

[client/providers/item.tsx:313](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L313)

___

### restoreStateOnSuccess

• `Optional` **restoreStateOnSuccess**: `boolean`

Restores the state on success back to its applied value (all the properties and all the states) once the
given action, completes and SUCCEEDS

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[restoreStateOnSuccess](client_providers_item.IActionCleanOptions.md#restorestateonsuccess)

#### Defined in

[client/providers/item.tsx:303](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L303)

___

### searchByIncludes

• `Optional` **searchByIncludes**: `Object`

The includes to be used to search with

#### Index signature

▪ [include: `string`]: `string`[]

#### Defined in

[client/providers/item.tsx:649](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L649)

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

[client/providers/item.tsx:645](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L645)

___

### since

• `Optional` **since**: `string`

The since attribute, will only retrieve items limited to that date
use the createDateTimeValue format in order to specify this value

note that this option takes priority
over the since property that exists within the search mode

#### Defined in

[client/providers/item.tsx:688](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L688)

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

[client/providers/item.tsx:731](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L731)

___

### storeResultsInNavigation

• `Optional` **storeResultsInNavigation**: `string`

will store the search results in the navigation and location and they
can later be loaded with loadSearchResultsFromNavigation

#### Defined in

[client/providers/item.tsx:842](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L842)

___

### trackedProperty

• `Optional` **trackedProperty**: `string`

The tracked property, all tracked properties must be of type exact-value-tracked or exact-identifier-tracked
exact-value-tracked is an arbitrary string value, where an exact-identifier-tracked is used for ids such as user ids
or such where special characters are not allowed

#### Defined in

[client/providers/item.tsx:761](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L761)

___

### traditional

• `Optional` **traditional**: `boolean`

Normally searches will download a list of records and use these records to retrieve the next
values, so even if the database changes, the value is kept as it was during that one search,
however if the list is small this is rather ineffective, a traditional search will simply download
all the data in a single request without doing lists of records

traditional is better for single page views, but worse for paginations

#### Defined in

[client/providers/item.tsx:810](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L810)

___

### types

• `Optional` **types**: `string`[]

Types to search as, only truly usable on module based search

#### Defined in

[client/providers/item.tsx:824](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L824)

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

[client/providers/item.tsx:268](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L268)

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

[client/providers/item.tsx:277](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L277)

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

[client/providers/item.tsx:259](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L259)

___

### until

• `Optional` **until**: `string`

Similar to since but to limit until when the results are received
use the function createDateTimeValue to specify this value

note that this option takes priority
over the since property that exists within the search mode

#### Defined in

[client/providers/item.tsx:696](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L696)

___

### useSearchEngine

• `Optional` **useSearchEngine**: `string` \| `boolean`

Uses the search engine instead of the standard database level query, provides some limitations
such as that it cannot anymore have offset that are non-zero so traditional pagination
is not feasible

if given a string value it represents the language that it is used, boolean uses all languages

The item must be search engine enabled or otherwise this will cause an error

#### Defined in

[client/providers/item.tsx:860](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L860)

___

### waitAndMerge

• `Optional` **waitAndMerge**: `boolean`

uses wait and merge to merge with other searches

#### Defined in

[client/providers/item.tsx:846](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L846)
