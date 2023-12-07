[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/providers/item](../modules/client_providers_item.md) / IActionDeleteOptions

# Interface: IActionDeleteOptions

[client/providers/item](../modules/client_providers_item.md).IActionDeleteOptions

Options for deleting

## Hierarchy

- [`IActionCleanOptions`](client_providers_item.IActionCleanOptions.md)

  ↳ **`IActionDeleteOptions`**

## Table of contents

### Properties

- [cleanSearchResultsOnAny](client_providers_item.IActionDeleteOptions.md#cleansearchresultsonany)
- [cleanSearchResultsOnFailure](client_providers_item.IActionDeleteOptions.md#cleansearchresultsonfailure)
- [cleanSearchResultsOnSuccess](client_providers_item.IActionDeleteOptions.md#cleansearchresultsonsuccess)
- [cleanStateOnAny](client_providers_item.IActionDeleteOptions.md#cleanstateonany)
- [cleanStateOnFailure](client_providers_item.IActionDeleteOptions.md#cleanstateonfailure)
- [cleanStateOnSuccess](client_providers_item.IActionDeleteOptions.md#cleanstateonsuccess)
- [deleteForId](client_providers_item.IActionDeleteOptions.md#deleteforid)
- [deleteForVersion](client_providers_item.IActionDeleteOptions.md#deleteforversion)
- [includesToRestoreOnAny](client_providers_item.IActionDeleteOptions.md#includestorestoreonany)
- [includesToRestoreOnFailure](client_providers_item.IActionDeleteOptions.md#includestorestoreonfailure)
- [includesToRestoreOnSuccess](client_providers_item.IActionDeleteOptions.md#includestorestoreonsuccess)
- [policies](client_providers_item.IActionDeleteOptions.md#policies)
- [policiesToCleanOnAny](client_providers_item.IActionDeleteOptions.md#policiestocleanonany)
- [policiesToCleanOnFailure](client_providers_item.IActionDeleteOptions.md#policiestocleanonfailure)
- [policiesToCleanOnSuccess](client_providers_item.IActionDeleteOptions.md#policiestocleanonsuccess)
- [progresser](client_providers_item.IActionDeleteOptions.md#progresser)
- [propertiesToRestoreOnAny](client_providers_item.IActionDeleteOptions.md#propertiestorestoreonany)
- [propertiesToRestoreOnFailure](client_providers_item.IActionDeleteOptions.md#propertiestorestoreonfailure)
- [propertiesToRestoreOnSuccess](client_providers_item.IActionDeleteOptions.md#propertiestorestoreonsuccess)
- [restoreStateOnAny](client_providers_item.IActionDeleteOptions.md#restorestateonany)
- [restoreStateOnFailure](client_providers_item.IActionDeleteOptions.md#restorestateonfailure)
- [restoreStateOnSuccess](client_providers_item.IActionDeleteOptions.md#restorestateonsuccess)
- [unpokeAfterAny](client_providers_item.IActionDeleteOptions.md#unpokeafterany)
- [unpokeAfterFailure](client_providers_item.IActionDeleteOptions.md#unpokeafterfailure)
- [unpokeAfterSuccess](client_providers_item.IActionDeleteOptions.md#unpokeaftersuccess)

### Methods

- [beforeDelete](client_providers_item.IActionDeleteOptions.md#beforedelete)

## Properties

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

### deleteForId

• `Optional` **deleteForId**: `string`

Id to delete for instead of the current one, allows for deleting another item from another slot

#### Defined in

[client/providers/item.tsx:611](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L611)

___

### deleteForVersion

• `Optional` **deleteForVersion**: `string`

Version to delete for instead of the current one

#### Defined in

[client/providers/item.tsx:615](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L615)

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

### policies

• `Optional` **policies**: [`PolicyPathType`](../modules/client_providers_item.md#policypathtype)[]

Delete policies to include

#### Defined in

[client/providers/item.tsx:619](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L619)

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

Similar to submit this allows to use a progressing as a percentage
in deletes this is mostly useless since it's basically instant

#### Defined in

[client/providers/item.tsx:631](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L631)

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

## Methods

### beforeDelete

▸ `Optional` **beforeDelete**(): `boolean` \| `Promise`<`boolean`\>

A function that executes before the delete gets done, this allows to prevent
or not the deleting action

#### Returns

`boolean` \| `Promise`<`boolean`\>

a boolean or a promise with a boolean on whether one should proceed

#### Defined in

[client/providers/item.tsx:626](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L626)
