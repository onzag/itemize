[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/providers/item](../modules/client_providers_item.md) / IActionCleanOptions

# Interface: IActionCleanOptions

[client/providers/item](../modules/client_providers_item.md).IActionCleanOptions

The clean options offered during execution

## Hierarchy

- **`IActionCleanOptions`**

  ↳ [`IActionSubmitOptions`](client_providers_item.IActionSubmitOptions.md)

  ↳ [`IActionDeleteOptions`](client_providers_item.IActionDeleteOptions.md)

  ↳ [`IActionSearchOptions`](client_providers_item.IActionSearchOptions.md)

## Table of contents

### Properties

- [cleanSearchResultsOnAny](client_providers_item.IActionCleanOptions.md#cleansearchresultsonany)
- [cleanSearchResultsOnFailure](client_providers_item.IActionCleanOptions.md#cleansearchresultsonfailure)
- [cleanSearchResultsOnSuccess](client_providers_item.IActionCleanOptions.md#cleansearchresultsonsuccess)
- [cleanStateOnAny](client_providers_item.IActionCleanOptions.md#cleanstateonany)
- [cleanStateOnFailure](client_providers_item.IActionCleanOptions.md#cleanstateonfailure)
- [cleanStateOnSuccess](client_providers_item.IActionCleanOptions.md#cleanstateonsuccess)
- [includesToRestoreOnAny](client_providers_item.IActionCleanOptions.md#includestorestoreonany)
- [includesToRestoreOnFailure](client_providers_item.IActionCleanOptions.md#includestorestoreonfailure)
- [includesToRestoreOnSuccess](client_providers_item.IActionCleanOptions.md#includestorestoreonsuccess)
- [policiesToCleanOnAny](client_providers_item.IActionCleanOptions.md#policiestocleanonany)
- [policiesToCleanOnFailure](client_providers_item.IActionCleanOptions.md#policiestocleanonfailure)
- [policiesToCleanOnSuccess](client_providers_item.IActionCleanOptions.md#policiestocleanonsuccess)
- [propertiesToRestoreOnAny](client_providers_item.IActionCleanOptions.md#propertiestorestoreonany)
- [propertiesToRestoreOnFailure](client_providers_item.IActionCleanOptions.md#propertiestorestoreonfailure)
- [propertiesToRestoreOnSuccess](client_providers_item.IActionCleanOptions.md#propertiestorestoreonsuccess)
- [restoreStateOnAny](client_providers_item.IActionCleanOptions.md#restorestateonany)
- [restoreStateOnFailure](client_providers_item.IActionCleanOptions.md#restorestateonfailure)
- [restoreStateOnSuccess](client_providers_item.IActionCleanOptions.md#restorestateonsuccess)
- [unpokeAfterAny](client_providers_item.IActionCleanOptions.md#unpokeafterany)
- [unpokeAfterFailure](client_providers_item.IActionCleanOptions.md#unpokeafterfailure)
- [unpokeAfterSuccess](client_providers_item.IActionCleanOptions.md#unpokeaftersuccess)

## Properties

### cleanSearchResultsOnAny

• `Optional` **cleanSearchResultsOnAny**: `boolean`

cleans the search results when the action is completed

The search results were retrieved using automatic search or the search actioner, this allows to clean them
once the action is completed

#### Defined in

[client/providers/item.tsx:323](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L323)

___

### cleanSearchResultsOnFailure

• `Optional` **cleanSearchResultsOnFailure**: `boolean`

cleans the search results when the action is completed and it FAILED

The search results were retrieved using automatic search or the search actioner, this allows to clean them
once the action is completed

#### Defined in

[client/providers/item.tsx:330](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L330)

___

### cleanSearchResultsOnSuccess

• `Optional` **cleanSearchResultsOnSuccess**: `boolean`

cleans the search results when the action is completed and it SUCCEEDS

The search results were retrieved using automatic search or the search actioner, this allows to clean them
once the action is completed

#### Defined in

[client/providers/item.tsx:316](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L316)

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

#### Defined in

[client/providers/item.tsx:381](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L381)

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

#### Defined in

[client/providers/item.tsx:369](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L369)

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

#### Defined in

[client/providers/item.tsx:357](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L357)

___

### includesToRestoreOnAny

• `Optional` **includesToRestoreOnAny**: `string`[]

Restores the value of an include and all its sinking properties back to its applied value after the action is completed
as in the value that was retrieved from the server (or null if no value is loaded)

This is useful to keep unmodified states during adding, editing or even deleted
the value that is restored is the last value loaded, and since the action occurs
after the action is performed it will apply to that value

#### Defined in

[client/providers/item.tsx:273](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L273)

___

### includesToRestoreOnFailure

• `Optional` **includesToRestoreOnFailure**: `string`[]

Restores the value of an include and all its sinking properties back to its applied value after the action is completed and FAILED
as in the value that was retrieved from the server (or null if no value is loaded)

This is useful to keep unmodified states during adding, editing or even deleted
the value that is restored is the last value loaded, and since the action occurs
after the action is performed it will apply to that value

#### Defined in

[client/providers/item.tsx:282](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L282)

___

### includesToRestoreOnSuccess

• `Optional` **includesToRestoreOnSuccess**: `string`[]

Restores the value of an include and all its sinking properties back to its applied value after the action is completed and SUCCEEDS
as in the value that was retrieved from the server (or null if no value is loaded)

This is useful to keep unmodified states during adding, editing or even deleted
the value that is restored is the last value loaded, and since the action occurs
after the action is performed it will apply to that value

#### Defined in

[client/providers/item.tsx:264](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L264)

___

### policiesToCleanOnAny

• `Optional` **policiesToCleanOnAny**: [`PolicyPathType`](../modules/client_providers_item.md#policypathtype)[]

Cleans the value of a policy back to null

#### Defined in

[client/providers/item.tsx:224](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L224)

___

### policiesToCleanOnFailure

• `Optional` **policiesToCleanOnFailure**: [`PolicyPathType`](../modules/client_providers_item.md#policypathtype)[]

Cleans the value of a policy back to null

#### Defined in

[client/providers/item.tsx:228](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L228)

___

### policiesToCleanOnSuccess

• `Optional` **policiesToCleanOnSuccess**: [`PolicyPathType`](../modules/client_providers_item.md#policypathtype)[]

Cleans the value of a policy back to null

#### Defined in

[client/providers/item.tsx:220](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L220)

___

### propertiesToRestoreOnAny

• `Optional` **propertiesToRestoreOnAny**: `string`[]

Restores the value of a property back to its applied value after the action is completed
as in the value that was retrieved from the server (or null if no value is loaded)

This is useful to keep unmodified states during adding, editing or even deleted
the value that is restored is the last value loaded, and since the action occurs
after the action is performed it will apply to that value

#### Defined in

[client/providers/item.tsx:246](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L246)

___

### propertiesToRestoreOnFailure

• `Optional` **propertiesToRestoreOnFailure**: `string`[]

Restores the value of a property back to its applied value after the action is completed and FAILED
as in the value that was retrieved from the server (or null if no value is loaded)

This is useful to keep unmodified states during adding, editing or even deleted
the value that is restored is the last value loaded, and since the action occurs
after the action is performed it will apply to that value

#### Defined in

[client/providers/item.tsx:255](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L255)

___

### propertiesToRestoreOnSuccess

• `Optional` **propertiesToRestoreOnSuccess**: `string`[]

Restores the value of a property back to its applied value after the action is completed and SUCCEEDS
as in the value that was retrieved from the server (or null if no value is loaded)

This is useful to keep unmodified states during adding, editing or even deleted
the value that is restored is the last value loaded, and since the action occurs
after the action is performed it will apply to that value

#### Defined in

[client/providers/item.tsx:237](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L237)

___

### restoreStateOnAny

• `Optional` **restoreStateOnAny**: `boolean`

Restores the state on success back to its applied value (all the properties and all the states) once the
given action completes

#### Defined in

[client/providers/item.tsx:340](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L340)

___

### restoreStateOnFailure

• `Optional` **restoreStateOnFailure**: `boolean`

Restores the state on success back to its applied value (all the properties and all the states) once the
given action, completes and FAILED

#### Defined in

[client/providers/item.tsx:345](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L345)

___

### restoreStateOnSuccess

• `Optional` **restoreStateOnSuccess**: `boolean`

Restores the state on success back to its applied value (all the properties and all the states) once the
given action, completes and SUCCEEDS

#### Defined in

[client/providers/item.tsx:335](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L335)

___

### unpokeAfterAny

• `Optional` **unpokeAfterAny**: `boolean`

After the action is completed all the properties and includes will be unpoked

When a property is considered poked its error state shows, as it's usually hidden until the user has "poked it"
for example in the case of a password when the password is empty the property is invalid, but it only shows
that error after the user has interacted with it, hence the combination of restoring and unpoking, will clear a field
and make it not show an error

#### Defined in

[client/providers/item.tsx:300](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L300)

___

### unpokeAfterFailure

• `Optional` **unpokeAfterFailure**: `boolean`

After the action is completed and it FAILED all the properties and includes will be unpoked

When a property is considered poked its error state shows, as it's usually hidden until the user has "poked it"
for example in the case of a password when the password is empty the property is invalid, but it only shows
that error after the user has interacted with it, hence the combination of restoring and unpoking, will clear a field
and make it not show an error

#### Defined in

[client/providers/item.tsx:309](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L309)

___

### unpokeAfterSuccess

• `Optional` **unpokeAfterSuccess**: `boolean`

After the action is completed and it SUCCEEDS all the properties and includes will be unpoked

When a property is considered poked its error state shows, as it's usually hidden until the user has "poked it"
for example in the case of a password when the password is empty the property is invalid, but it only shows
that error after the user has interacted with it, hence the combination of restoring and unpoking, will clear a field
and make it not show an error

#### Defined in

[client/providers/item.tsx:291](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L291)
