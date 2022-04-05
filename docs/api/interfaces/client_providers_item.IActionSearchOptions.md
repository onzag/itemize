[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/providers/item](../modules/client_providers_item.md) / IActionSearchOptions

# Interface: IActionSearchOptions

[client/providers/item](../modules/client_providers_item.md).IActionSearchOptions

The options for searching

## Hierarchy

- [`IActionCleanOptions`](client_providers_item.IActionCleanOptions.md)

  ↳ **`IActionSearchOptions`**

## Table of contents

### Properties

- [cacheMetadata](client_providers_item.IActionSearchOptions.md#cachemetadata)
- [cacheMetadataMismatchAction](client_providers_item.IActionSearchOptions.md#cachemetadatamismatchaction)
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
- [storeResultsInNavigation](client_providers_item.IActionSearchOptions.md#storeresultsinnavigation)
- [traditional](client_providers_item.IActionSearchOptions.md#traditional)
- [types](client_providers_item.IActionSearchOptions.md#types)
- [unpokeAfterAny](client_providers_item.IActionSearchOptions.md#unpokeafterany)
- [unpokeAfterFailure](client_providers_item.IActionSearchOptions.md#unpokeafterfailure)
- [unpokeAfterSuccess](client_providers_item.IActionSearchOptions.md#unpokeaftersuccess)
- [waitAndMerge](client_providers_item.IActionSearchOptions.md#waitandmerge)

## Properties

### cacheMetadata

• `Optional` **cacheMetadata**: `any`

#### Defined in

[client/providers/item.tsx:399](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L399)

___

### cacheMetadataMismatchAction

• `Optional` **cacheMetadataMismatchAction**: [`ISearchCacheMetadataMismatchAction`](client_internal_gql_client_util.ISearchCacheMetadataMismatchAction.md)

#### Defined in

[client/providers/item.tsx:400](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L400)

___

### cachePolicy

• `Optional` **cachePolicy**: ``"none"`` \| ``"by-owner"`` \| ``"by-parent"`` \| ``"by-owner-and-parent"``

#### Defined in

[client/providers/item.tsx:398](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L398)

___

### cleanSearchResultsOnAny

• `Optional` **cleanSearchResultsOnAny**: `boolean`

cleans the search results

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[cleanSearchResultsOnAny](client_providers_item.IActionCleanOptions.md#cleansearchresultsonany)

#### Defined in

[client/providers/item.tsx:251](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L251)

___

### cleanSearchResultsOnFailure

• `Optional` **cleanSearchResultsOnFailure**: `boolean`

cleans the search results

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[cleanSearchResultsOnFailure](client_providers_item.IActionCleanOptions.md#cleansearchresultsonfailure)

#### Defined in

[client/providers/item.tsx:255](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L255)

___

### cleanSearchResultsOnSuccess

• `Optional` **cleanSearchResultsOnSuccess**: `boolean`

cleans the search results

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[cleanSearchResultsOnSuccess](client_providers_item.IActionCleanOptions.md#cleansearchresultsonsuccess)

#### Defined in

[client/providers/item.tsx:247](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L247)

___

### cleanStateOnAny

• `Optional` **cleanStateOnAny**: `boolean`

Warning, clean state on success might not clean anything
if the cleaning is blocked from happening, this is because
other item provider is expecting to use the same value
always use propertiesToRestoreOn* in order to strip critical
data (eg. passwords) clean state is used for a memory relief
and itemize might decide that it's better not to provide it

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[cleanStateOnAny](client_providers_item.IActionCleanOptions.md#cleanstateonany)

#### Defined in

[client/providers/item.tsx:297](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L297)

___

### cleanStateOnFailure

• `Optional` **cleanStateOnFailure**: `boolean`

Warning, clean state on success might not clean anything
if the cleaning is blocked from happening, this is because
other item provider is expecting to use the same value
always use propertiesToRestoreOn* in order to strip critical
data (eg. passwords) clean state is used for a memory relief
and itemize might decide that it's better not to provide it

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[cleanStateOnFailure](client_providers_item.IActionCleanOptions.md#cleanstateonfailure)

#### Defined in

[client/providers/item.tsx:288](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L288)

___

### cleanStateOnSuccess

• `Optional` **cleanStateOnSuccess**: `boolean`

Warning, clean state on success might not clean anything
if the cleaning is blocked from happening, this is because
other item provider is expecting to use the same value
always use propertiesToRestoreOn* in order to strip critical
data (eg. passwords) clean state is used for a memory relief
and itemize might decide that it's better not to provide it

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[cleanStateOnSuccess](client_providers_item.IActionCleanOptions.md#cleanstateonsuccess)

#### Defined in

[client/providers/item.tsx:279](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L279)

___

### createdBy

• `Optional` **createdBy**: `string`

By whom it was created, note that this option takes priority
over the created_by property that exists within the search mode

#### Defined in

[client/providers/item.tsx:387](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L387)

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

[client/providers/item.tsx:422](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L422)

___

### includesToRestoreOnAny

• `Optional` **includesToRestoreOnAny**: `string`[]

Restores the value of an include back to its applied value
or null if it doesn't have such

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[includesToRestoreOnAny](client_providers_item.IActionCleanOptions.md#includestorestoreonany)

#### Defined in

[client/providers/item.tsx:226](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L226)

___

### includesToRestoreOnFailure

• `Optional` **includesToRestoreOnFailure**: `string`[]

Restores the value of an include back to its applied value
or null if it doesn't have such

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[includesToRestoreOnFailure](client_providers_item.IActionCleanOptions.md#includestorestoreonfailure)

#### Defined in

[client/providers/item.tsx:231](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L231)

___

### includesToRestoreOnSuccess

• `Optional` **includesToRestoreOnSuccess**: `string`[]

Restores the value of an include back to its applied value
or null if it doesn't have such

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[includesToRestoreOnSuccess](client_providers_item.IActionCleanOptions.md#includestorestoreonsuccess)

#### Defined in

[client/providers/item.tsx:221](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L221)

___

### limit

• **limit**: `number`

#### Defined in

[client/providers/item.tsx:404](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L404)

___

### listenPolicy

• `Optional` **listenPolicy**: ``"none"`` \| ``"by-owner"`` \| ``"by-parent"`` \| ``"by-owner-and-parent"``

#### Defined in

[client/providers/item.tsx:401](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L401)

___

### markForDestructionOnLogout

• `Optional` **markForDestructionOnLogout**: `boolean`

#### Defined in

[client/providers/item.tsx:402](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L402)

___

### offset

• **offset**: `number`

#### Defined in

[client/providers/item.tsx:405](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L405)

___

### orderBy

• `Optional` **orderBy**: [`IOrderByRuleType`](constants.IOrderByRuleType.md)

#### Defined in

[client/providers/item.tsx:382](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L382)

___

### parentedBy

• `Optional` **parentedBy**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `item` | `string` |
| `version?` | `string` |

#### Defined in

[client/providers/item.tsx:393](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L393)

___

### pileSearch

• `Optional` **pileSearch**: `boolean`

#### Defined in

[client/providers/item.tsx:427](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L427)

___

### policiesToCleanOnAny

• `Optional` **policiesToCleanOnAny**: [`PolicyPathType`](../modules/client_providers_item.md#policypathtype)[]

Cleans the value of a policy back to null

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[policiesToCleanOnAny](client_providers_item.IActionCleanOptions.md#policiestocleanonany)

#### Defined in

[client/providers/item.tsx:197](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L197)

___

### policiesToCleanOnFailure

• `Optional` **policiesToCleanOnFailure**: [`PolicyPathType`](../modules/client_providers_item.md#policypathtype)[]

Cleans the value of a policy back to null

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[policiesToCleanOnFailure](client_providers_item.IActionCleanOptions.md#policiestocleanonfailure)

#### Defined in

[client/providers/item.tsx:201](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L201)

___

### policiesToCleanOnSuccess

• `Optional` **policiesToCleanOnSuccess**: [`PolicyPathType`](../modules/client_providers_item.md#policypathtype)[]

Cleans the value of a policy back to null

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[policiesToCleanOnSuccess](client_providers_item.IActionCleanOptions.md#policiestocleanonsuccess)

#### Defined in

[client/providers/item.tsx:193](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L193)

___

### progresser

• `Optional` **progresser**: [`ProgresserFn`](../modules/gql_querier.md#progresserfn)

#### Defined in

[client/providers/item.tsx:425](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L425)

___

### propertiesToRestoreOnAny

• `Optional` **propertiesToRestoreOnAny**: `string`[]

Restores the value of a property back to its applied value
or null if it doesn't have such

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[propertiesToRestoreOnAny](client_providers_item.IActionCleanOptions.md#propertiestorestoreonany)

#### Defined in

[client/providers/item.tsx:211](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L211)

___

### propertiesToRestoreOnFailure

• `Optional` **propertiesToRestoreOnFailure**: `string`[]

Restores the value of a property back to its applied value
or null if it doesn't have such

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[propertiesToRestoreOnFailure](client_providers_item.IActionCleanOptions.md#propertiestorestoreonfailure)

#### Defined in

[client/providers/item.tsx:216](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L216)

___

### propertiesToRestoreOnSuccess

• `Optional` **propertiesToRestoreOnSuccess**: `string`[]

Restores the value of a property back to its applied value
or null if it doesn't have such

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[propertiesToRestoreOnSuccess](client_providers_item.IActionCleanOptions.md#propertiestorestoreonsuccess)

#### Defined in

[client/providers/item.tsx:206](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L206)

___

### requestedIncludes

• `Optional` **requestedIncludes**: `Object`

The requested includes (EXPERIMENTAL)

#### Index signature

▪ [include: `string`]: `string`[]

#### Defined in

[client/providers/item.tsx:374](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L374)

___

### requestedProperties

• **requestedProperties**: `string`[]

The properties to be used to request, these have to be part
of your schema

#### Defined in

[client/providers/item.tsx:370](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L370)

___

### restoreStateOnAny

• `Optional` **restoreStateOnAny**: `boolean`

Restores the state on success back to its applied value
this will be a clean if no applied value exists

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[restoreStateOnAny](client_providers_item.IActionCleanOptions.md#restorestateonany)

#### Defined in

[client/providers/item.tsx:265](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L265)

___

### restoreStateOnFailure

• `Optional` **restoreStateOnFailure**: `boolean`

Restores the state on success back to its applied value
this will be a clean if no applied value exists

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[restoreStateOnFailure](client_providers_item.IActionCleanOptions.md#restorestateonfailure)

#### Defined in

[client/providers/item.tsx:270](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L270)

___

### restoreStateOnSuccess

• `Optional` **restoreStateOnSuccess**: `boolean`

Restores the state on success back to its applied value
this will be a clean if no applied value exists

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[restoreStateOnSuccess](client_providers_item.IActionCleanOptions.md#restorestateonsuccess)

#### Defined in

[client/providers/item.tsx:260](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L260)

___

### searchByIncludes

• `Optional` **searchByIncludes**: `Object`

#### Index signature

▪ [include: `string`]: `string`[]

#### Defined in

[client/providers/item.tsx:381](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L381)

___

### searchByProperties

• **searchByProperties**: (`string` \| [`IPropertyCoreProps`](client_components_property_base.IPropertyCoreProps.md))[]

The properties to be used to search with
you have access to three other special properties
that only exist within search mode "search", "created_by" and "since"

#### Defined in

[client/providers/item.tsx:380](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L380)

___

### since

• `Optional` **since**: `string`

The since attribute, note that this option takes priority
over the since property that exists within the search mode

#### Defined in

[client/providers/item.tsx:392](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L392)

___

### storeResultsInNavigation

• `Optional` **storeResultsInNavigation**: `string`

#### Defined in

[client/providers/item.tsx:423](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L423)

___

### traditional

• `Optional` **traditional**: `boolean`

#### Defined in

[client/providers/item.tsx:403](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L403)

___

### types

• `Optional` **types**: `string`[]

Types to search as, only truly usable on module based search

#### Defined in

[client/providers/item.tsx:409](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L409)

___

### unpokeAfterAny

• `Optional` **unpokeAfterAny**: `boolean`

Makes all properties unpoked (invalid won't show)

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[unpokeAfterAny](client_providers_item.IActionCleanOptions.md#unpokeafterany)

#### Defined in

[client/providers/item.tsx:239](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L239)

___

### unpokeAfterFailure

• `Optional` **unpokeAfterFailure**: `boolean`

Makes all properties unpoked (invalid won't show)

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[unpokeAfterFailure](client_providers_item.IActionCleanOptions.md#unpokeafterfailure)

#### Defined in

[client/providers/item.tsx:243](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L243)

___

### unpokeAfterSuccess

• `Optional` **unpokeAfterSuccess**: `boolean`

Makes all properties unpoked (invalid won't show)

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[unpokeAfterSuccess](client_providers_item.IActionCleanOptions.md#unpokeaftersuccess)

#### Defined in

[client/providers/item.tsx:235](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L235)

___

### waitAndMerge

• `Optional` **waitAndMerge**: `boolean`

#### Defined in

[client/providers/item.tsx:424](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L424)
