[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/providers/item](../modules/client_providers_item.md) / IActionSubmitOptions

# Interface: IActionSubmitOptions

[client/providers/item](../modules/client_providers_item.md).IActionSubmitOptions

The options for submitting, ediitng, adding, etc...

## Hierarchy

- [`IActionCleanOptions`](client_providers_item.IActionCleanOptions.md)

  ↳ **`IActionSubmitOptions`**

## Table of contents

### Properties

- [action](client_providers_item.IActionSubmitOptions.md#action)
- [blockReason](client_providers_item.IActionSubmitOptions.md#blockreason)
- [blockStatus](client_providers_item.IActionSubmitOptions.md#blockstatus)
- [blockUntil](client_providers_item.IActionSubmitOptions.md#blockuntil)
- [cleanSearchResultsOnAny](client_providers_item.IActionSubmitOptions.md#cleansearchresultsonany)
- [cleanSearchResultsOnFailure](client_providers_item.IActionSubmitOptions.md#cleansearchresultsonfailure)
- [cleanSearchResultsOnSuccess](client_providers_item.IActionSubmitOptions.md#cleansearchresultsonsuccess)
- [cleanStateOnAny](client_providers_item.IActionSubmitOptions.md#cleanstateonany)
- [cleanStateOnFailure](client_providers_item.IActionSubmitOptions.md#cleanstateonfailure)
- [cleanStateOnSuccess](client_providers_item.IActionSubmitOptions.md#cleanstateonsuccess)
- [clearStoredStateIfConnected](client_providers_item.IActionSubmitOptions.md#clearstoredstateifconnected)
- [differingOnly](client_providers_item.IActionSubmitOptions.md#differingonly)
- [inBehalfOf](client_providers_item.IActionSubmitOptions.md#inbehalfof)
- [includeOverrides](client_providers_item.IActionSubmitOptions.md#includeoverrides)
- [includes](client_providers_item.IActionSubmitOptions.md#includes)
- [includesToRestoreOnAny](client_providers_item.IActionSubmitOptions.md#includestorestoreonany)
- [includesToRestoreOnFailure](client_providers_item.IActionSubmitOptions.md#includestorestoreonfailure)
- [includesToRestoreOnSuccess](client_providers_item.IActionSubmitOptions.md#includestorestoreonsuccess)
- [languageOverride](client_providers_item.IActionSubmitOptions.md#languageoverride)
- [parentedBy](client_providers_item.IActionSubmitOptions.md#parentedby)
- [parentedByAddOnly](client_providers_item.IActionSubmitOptions.md#parentedbyaddonly)
- [pileSubmit](client_providers_item.IActionSubmitOptions.md#pilesubmit)
- [policies](client_providers_item.IActionSubmitOptions.md#policies)
- [policiesToCleanOnAny](client_providers_item.IActionSubmitOptions.md#policiestocleanonany)
- [policiesToCleanOnFailure](client_providers_item.IActionSubmitOptions.md#policiestocleanonfailure)
- [policiesToCleanOnSuccess](client_providers_item.IActionSubmitOptions.md#policiestocleanonsuccess)
- [preventNothingToUpdateError](client_providers_item.IActionSubmitOptions.md#preventnothingtoupdateerror)
- [progresser](client_providers_item.IActionSubmitOptions.md#progresser)
- [properties](client_providers_item.IActionSubmitOptions.md#properties)
- [propertiesToRestoreOnAny](client_providers_item.IActionSubmitOptions.md#propertiestorestoreonany)
- [propertiesToRestoreOnFailure](client_providers_item.IActionSubmitOptions.md#propertiestorestoreonfailure)
- [propertiesToRestoreOnSuccess](client_providers_item.IActionSubmitOptions.md#propertiestorestoreonsuccess)
- [propertyOverrides](client_providers_item.IActionSubmitOptions.md#propertyoverrides)
- [restoreStateOnAny](client_providers_item.IActionSubmitOptions.md#restorestateonany)
- [restoreStateOnFailure](client_providers_item.IActionSubmitOptions.md#restorestateonfailure)
- [restoreStateOnSuccess](client_providers_item.IActionSubmitOptions.md#restorestateonsuccess)
- [stateOverride](client_providers_item.IActionSubmitOptions.md#stateoverride)
- [storeStateIfCantConnect](client_providers_item.IActionSubmitOptions.md#storestateifcantconnect)
- [submitForId](client_providers_item.IActionSubmitOptions.md#submitforid)
- [submitForItem](client_providers_item.IActionSubmitOptions.md#submitforitem)
- [submitForVersion](client_providers_item.IActionSubmitOptions.md#submitforversion)
- [unpokeAfterAny](client_providers_item.IActionSubmitOptions.md#unpokeafterany)
- [unpokeAfterFailure](client_providers_item.IActionSubmitOptions.md#unpokeafterfailure)
- [unpokeAfterSuccess](client_providers_item.IActionSubmitOptions.md#unpokeaftersuccess)
- [waitAndMerge](client_providers_item.IActionSubmitOptions.md#waitandmerge)

### Methods

- [beforeSubmit](client_providers_item.IActionSubmitOptions.md#beforesubmit)

## Properties

### action

• `Optional` **action**: ``"add"`` \| ``"edit"``

The action to do, normally it's inferred, if the item is not found then the action will be add
if the item exists and holds an applied value it will be editing, use this to make it determined

#### Defined in

[client/providers/item.tsx:414](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L414)

___

### blockReason

• `Optional` **blockReason**: `string`

The reason for a blocking, this reason can be accessed by owners of the item

#### Defined in

[client/providers/item.tsx:428](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L428)

___

### blockStatus

• `Optional` **blockStatus**: `boolean`

Sets a block status for use of admistrators and moderators to block the access of this data to other
users, setting it to true makes it blocked, the user must have blocking rights

#### Defined in

[client/providers/item.tsx:419](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L419)

___

### blockUntil

• `Optional` **blockUntil**: `string`

Applies a timer to the block status, this should be a date in the corrent date format, it should be created
using the createDateTimeValue function to get the correct format

#### Defined in

[client/providers/item.tsx:424](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L424)

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

### clearStoredStateIfConnected

• `Optional` **clearStoredStateIfConnected**: `boolean`

After a draft has been used, it's likely that you don't need this value anymore as it reflects what the server side holds, so
storeStateIfCantConnect option and clearStoredStateIfConnected tend to be used in conjunction

This allows to clear the state from the local database and free the space

#### Defined in

[client/providers/item.tsx:537](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L537)

___

### differingOnly

• `Optional` **differingOnly**: `boolean`

From the given list of properties and includes given, only submit whatever is determined
to be different from the current applied value

#### Defined in

[client/providers/item.tsx:366](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L366)

___

### inBehalfOf

• `Optional` **inBehalfOf**: `string`

An user id to execute this action in behalf of, user should have the rights to execute
actions in behalf of someone else, when this occurs, the owner will be the user id that is
given here, and not the person that executes the action

#### Defined in

[client/providers/item.tsx:452](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L452)

___

### includeOverrides

• `Optional` **includeOverrides**: [`IIncludeOverride`](client_internal_gql_client_util.IIncludeOverride.md)[]

Override includes at submit time, specify a new value for the property, this is a good and preferrable alternative
for using setters, since setters effect every item provider as they are globally installed but overrides simply override
the request

#### Defined in

[client/providers/item.tsx:474](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L474)

___

### includes

• `Optional` **includes**: `Object`

The list of includes and their properties that are to be submitted

#### Index signature

▪ [include: `string`]: `string`[]

#### Defined in

[client/providers/item.tsx:370](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L370)

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

### languageOverride

• `Optional` **languageOverride**: `string`

Override the language that the submit occurs, the language mechanism of itemize is very complex, but this refer
to the text type; normally the user submits all their information with the language that their application is set at,
this will override that

However the language that a given text field has does not just depend on this, every text field has a language attribute,
but by default it will be given a null value at the start and then it will be set later once the value is applied according
to the server criteria (and the server criteria is to use the same language as the user is set)

#### Defined in

[client/providers/item.tsx:484](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L484)

___

### parentedBy

• `Optional` **parentedBy**: `Object`

A parent to apply to the action, when adding this will cause the parent to be set
when editing this will cause a reparent where the node is moved between parents

Check parentedByAddOnly when the submit is used in conjuction with both add/editing
because reparenting may be not desired

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The id of the parent, it should be defined |
| `item` | `string` | The item that will become the parent, use the path or qualified path name for example "users/user" or "MOD_users__IDEF_user" are both valid |
| `version?` | `string` | the version of the parent |

#### Defined in

[client/providers/item.tsx:387](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L387)

___

### parentedByAddOnly

• `Optional` **parentedByAddOnly**: `boolean`

Prevents a reparent, as it will only allow the add action (whether inferred or determined) this means
that parenting is only executed during the adding

A reparent exists whenever the parent is specified (even if it's the same parent) so this option is useful
to prevent errors of repareting to the same parent (which the server will complain about)

#### Defined in

[client/providers/item.tsx:409](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L409)

___

### pileSubmit

• `Optional` **pileSubmit**: `boolean` \| `ActionSubmitOptionCb`

if submitting already this will prevent throwing an error and instead
will wait until the submit time is free

Pass a function to return a partial for patching the submit action
in case you want that behaviour

This is useful for example when making a timed submit that will submit each time
the user makes an input and will save to the server, say whenever the user fills a full text field
there will be a delay of 600ms and it will submit, in this situation the user pastes and image, waits; and starts
saving and the user begins typing while it is still saving the last submit, then stops, but the image is so large
that it takes more than the grace time and a new submit is triggered before the last one has finished; in this case pile submit
should be set to true so that no two submits can happen at once, causing an error of simultaneous submits.

Instead this function will ensure to wait so that submits are "piled" and only the last one of the last batch is executed

#### Defined in

[client/providers/item.tsx:510](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L510)

___

### policies

• `Optional` **policies**: [`PolicyPathType`](../modules/client_providers_item.md#policypathtype)[]

The list of policies to submit

#### Defined in

[client/providers/item.tsx:374](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L374)

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

### preventNothingToUpdateError

• `Optional` **preventNothingToUpdateError**: `boolean`

Normally when editing if you are submitting nothing or there is nothing that has changed (which is an error from the server's concern)
the client will realize this and refuse to submit, triggering an error, use this so that while the client refuses to submit anyway you
do not get an error but instead get emulated success

#### Defined in

[client/providers/item.tsx:517](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L517)

___

### progresser

• `Optional` **progresser**: [`ProgresserFn`](../modules/gql_querier.md#progresserfn)

Informs about the progress of the submit as a percentage

#### Defined in

[client/providers/item.tsx:493](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L493)

___

### properties

• **properties**: `string`[]

Specifies the list of properties that are going to be sumbitted to the server

#### Defined in

[client/providers/item.tsx:361](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L361)

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

### propertyOverrides

• `Optional` **propertyOverrides**: [`IPropertyOverride`](client_internal_gql_client_util.IPropertyOverride.md)[]

Override properties at submit time, specify a new value for the property, this is a good and preferrable alternative
for using setters, since setters effect every item provider as they are globally installed but overrides simply override
the request

#### Defined in

[client/providers/item.tsx:467](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L467)

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

### stateOverride

• `Optional` **stateOverride**: [`IItemStateType`](base_Root_Module_ItemDefinition.IItemStateType.md) \| `Blob`

A state override to submit, every item in itemize has a state that represents binary data as the item
state is a transferrable blob, you can use the functions `downloadState` and `downloadStateAt` that the item
provider has, or otherwise using the item loader in order to retrieve this blob, the blob is superior because
the state is fully included, otherwise you can retrieve the state from `onStateChange` and other functions that provide
a state that is used internally, these also work, but it does not hold binary data within it such as images or files

#### Defined in

[client/providers/item.tsx:460](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L460)

___

### storeStateIfCantConnect

• `Optional` **storeStateIfCantConnect**: `boolean`

Useful to create drafts that exist only in the client side, when submitting either adding or editing the connection may not be available
causing a CANT_CONNECT error where internet is not available, in this case the client will try to save the current state in the
indexedDB so that it remains as a draft, you will realize storedState is set to true in the response along the CANT_CONNECT error
also onStateStored will trigger, if this fails storedState will be false and onStateStoreFailed will trigger

Check loadStoredState for retrieving this state from the item's provider when loading a value

The option clearStoredStateIfConnected tends to be used in conjunction with this one

#### Defined in

[client/providers/item.tsx:529](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L529)

___

### submitForId

• `Optional` **submitForId**: `string`

Submit for an specific id, instead of the id in question that the item represents
this is useful for example, for copying data between items, by submitting to a different
id a copy would be generated

Using `null` as the value here is also useful as this will generate a brand new item for
the same data, copying to a new slot, if the id is supposed to be specific

#### Defined in

[client/providers/item.tsx:437](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L437)

___

### submitForItem

• `Optional` **submitForItem**: `string`

Advanced, allows to submit for an alternate item rather than the current
one, use the path format or the qualified path format for this

#### Defined in

[client/providers/item.tsx:446](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L446)

___

### submitForVersion

• `Optional` **submitForVersion**: `string`

Same as submitForId but instead specifies the version

#### Defined in

[client/providers/item.tsx:441](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L441)

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

### waitAndMerge

• `Optional` **waitAndMerge**: `boolean`

Wait and merge is used so that many requests that happen simultaneously are bundled
this is not very useful for submit requests where they should be more "instant", but exists here nonetheless

#### Defined in

[client/providers/item.tsx:489](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L489)

## Methods

### beforeSubmit

▸ `Optional` **beforeSubmit**(): `boolean` \| `Promise`<`boolean`\>

a function to run before sumbit that you may use to cancel the execution

#### Returns

`boolean` \| `Promise`<`boolean`\>

a boolean that represents whether the action should continue or not

#### Defined in

[client/providers/item.tsx:379](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L379)
