[](../README.md) / [Exports](../modules.md) / [client/providers/item](../modules/client_providers_item.md) / IActionSearchOptions

# Interface: IActionSearchOptions

[client/providers/item](../modules/client_providers_item.md).IActionSearchOptions

The options for searching

## Hierarchy

* [*IActionCleanOptions*](client_providers_item.iactioncleanoptions.md)

  ↳ **IActionSearchOptions**

## Table of contents

### Properties

- [cachePolicy](client_providers_item.iactionsearchoptions.md#cachepolicy)
- [cleanSearchResultsOnAny](client_providers_item.iactionsearchoptions.md#cleansearchresultsonany)
- [cleanSearchResultsOnFailure](client_providers_item.iactionsearchoptions.md#cleansearchresultsonfailure)
- [cleanSearchResultsOnSuccess](client_providers_item.iactionsearchoptions.md#cleansearchresultsonsuccess)
- [cleanStateOnAny](client_providers_item.iactionsearchoptions.md#cleanstateonany)
- [cleanStateOnFailure](client_providers_item.iactionsearchoptions.md#cleanstateonfailure)
- [cleanStateOnSuccess](client_providers_item.iactionsearchoptions.md#cleanstateonsuccess)
- [createdBy](client_providers_item.iactionsearchoptions.md#createdby)
- [includesToRestoreOnAny](client_providers_item.iactionsearchoptions.md#includestorestoreonany)
- [includesToRestoreOnFailure](client_providers_item.iactionsearchoptions.md#includestorestoreonfailure)
- [includesToRestoreOnSuccess](client_providers_item.iactionsearchoptions.md#includestorestoreonsuccess)
- [limit](client_providers_item.iactionsearchoptions.md#limit)
- [listenPolicy](client_providers_item.iactionsearchoptions.md#listenpolicy)
- [markForDestructionOnLogout](client_providers_item.iactionsearchoptions.md#markfordestructiononlogout)
- [offset](client_providers_item.iactionsearchoptions.md#offset)
- [orderBy](client_providers_item.iactionsearchoptions.md#orderby)
- [parentedBy](client_providers_item.iactionsearchoptions.md#parentedby)
- [policiesToCleanOnAny](client_providers_item.iactionsearchoptions.md#policiestocleanonany)
- [policiesToCleanOnFailure](client_providers_item.iactionsearchoptions.md#policiestocleanonfailure)
- [policiesToCleanOnSuccess](client_providers_item.iactionsearchoptions.md#policiestocleanonsuccess)
- [propertiesToRestoreOnAny](client_providers_item.iactionsearchoptions.md#propertiestorestoreonany)
- [propertiesToRestoreOnFailure](client_providers_item.iactionsearchoptions.md#propertiestorestoreonfailure)
- [propertiesToRestoreOnSuccess](client_providers_item.iactionsearchoptions.md#propertiestorestoreonsuccess)
- [requestedIncludes](client_providers_item.iactionsearchoptions.md#requestedincludes)
- [requestedProperties](client_providers_item.iactionsearchoptions.md#requestedproperties)
- [restoreStateOnAny](client_providers_item.iactionsearchoptions.md#restorestateonany)
- [restoreStateOnFailure](client_providers_item.iactionsearchoptions.md#restorestateonfailure)
- [restoreStateOnSuccess](client_providers_item.iactionsearchoptions.md#restorestateonsuccess)
- [searchByIncludes](client_providers_item.iactionsearchoptions.md#searchbyincludes)
- [searchByProperties](client_providers_item.iactionsearchoptions.md#searchbyproperties)
- [since](client_providers_item.iactionsearchoptions.md#since)
- [storeResultsInNavigation](client_providers_item.iactionsearchoptions.md#storeresultsinnavigation)
- [traditional](client_providers_item.iactionsearchoptions.md#traditional)
- [unpokeAfterAny](client_providers_item.iactionsearchoptions.md#unpokeafterany)
- [unpokeAfterFailure](client_providers_item.iactionsearchoptions.md#unpokeafterfailure)
- [unpokeAfterSuccess](client_providers_item.iactionsearchoptions.md#unpokeaftersuccess)
- [waitAndMerge](client_providers_item.iactionsearchoptions.md#waitandmerge)

## Properties

### cachePolicy

• `Optional` **cachePolicy**: *none* \| *by-parent* \| *by-owner*

Defined in: [client/providers/item.tsx:322](https://github.com/onzag/itemize/blob/28218320/client/providers/item.tsx#L322)

___

### cleanSearchResultsOnAny

• `Optional` **cleanSearchResultsOnAny**: *boolean*

cleans the search results

Inherited from: [IActionCleanOptions](client_providers_item.iactioncleanoptions.md).[cleanSearchResultsOnAny](client_providers_item.iactioncleanoptions.md#cleansearchresultsonany)

Defined in: [client/providers/item.tsx:208](https://github.com/onzag/itemize/blob/28218320/client/providers/item.tsx#L208)

___

### cleanSearchResultsOnFailure

• `Optional` **cleanSearchResultsOnFailure**: *boolean*

cleans the search results

Inherited from: [IActionCleanOptions](client_providers_item.iactioncleanoptions.md).[cleanSearchResultsOnFailure](client_providers_item.iactioncleanoptions.md#cleansearchresultsonfailure)

Defined in: [client/providers/item.tsx:212](https://github.com/onzag/itemize/blob/28218320/client/providers/item.tsx#L212)

___

### cleanSearchResultsOnSuccess

• `Optional` **cleanSearchResultsOnSuccess**: *boolean*

cleans the search results

Inherited from: [IActionCleanOptions](client_providers_item.iactioncleanoptions.md).[cleanSearchResultsOnSuccess](client_providers_item.iactioncleanoptions.md#cleansearchresultsonsuccess)

Defined in: [client/providers/item.tsx:204](https://github.com/onzag/itemize/blob/28218320/client/providers/item.tsx#L204)

___

### cleanStateOnAny

• `Optional` **cleanStateOnAny**: *boolean*

Warning, clean state on success might not clean anything
if the cleaning is blocked from happening, this is because
other item provider is expecting to use the same value
always use propertiesToRestoreOn* in order to strip critical
data (eg. passwords) clean state is used for a memory relief
and itemize might decide that it's better not to provide it

Inherited from: [IActionCleanOptions](client_providers_item.iactioncleanoptions.md).[cleanStateOnAny](client_providers_item.iactioncleanoptions.md#cleanstateonany)

Defined in: [client/providers/item.tsx:254](https://github.com/onzag/itemize/blob/28218320/client/providers/item.tsx#L254)

___

### cleanStateOnFailure

• `Optional` **cleanStateOnFailure**: *boolean*

Warning, clean state on success might not clean anything
if the cleaning is blocked from happening, this is because
other item provider is expecting to use the same value
always use propertiesToRestoreOn* in order to strip critical
data (eg. passwords) clean state is used for a memory relief
and itemize might decide that it's better not to provide it

Inherited from: [IActionCleanOptions](client_providers_item.iactioncleanoptions.md).[cleanStateOnFailure](client_providers_item.iactioncleanoptions.md#cleanstateonfailure)

Defined in: [client/providers/item.tsx:245](https://github.com/onzag/itemize/blob/28218320/client/providers/item.tsx#L245)

___

### cleanStateOnSuccess

• `Optional` **cleanStateOnSuccess**: *boolean*

Warning, clean state on success might not clean anything
if the cleaning is blocked from happening, this is because
other item provider is expecting to use the same value
always use propertiesToRestoreOn* in order to strip critical
data (eg. passwords) clean state is used for a memory relief
and itemize might decide that it's better not to provide it

Inherited from: [IActionCleanOptions](client_providers_item.iactioncleanoptions.md).[cleanStateOnSuccess](client_providers_item.iactioncleanoptions.md#cleanstateonsuccess)

Defined in: [client/providers/item.tsx:236](https://github.com/onzag/itemize/blob/28218320/client/providers/item.tsx#L236)

___

### createdBy

• `Optional` **createdBy**: *string*

By whom it was created, note that this option takes priority
over the created_by property that exists within the search mode

Defined in: [client/providers/item.tsx:311](https://github.com/onzag/itemize/blob/28218320/client/providers/item.tsx#L311)

___

### includesToRestoreOnAny

• `Optional` **includesToRestoreOnAny**: *string*[]

Restores the value of an include back to its applied value
or null if it doesn't have such

Inherited from: [IActionCleanOptions](client_providers_item.iactioncleanoptions.md).[includesToRestoreOnAny](client_providers_item.iactioncleanoptions.md#includestorestoreonany)

Defined in: [client/providers/item.tsx:183](https://github.com/onzag/itemize/blob/28218320/client/providers/item.tsx#L183)

___

### includesToRestoreOnFailure

• `Optional` **includesToRestoreOnFailure**: *string*[]

Restores the value of an include back to its applied value
or null if it doesn't have such

Inherited from: [IActionCleanOptions](client_providers_item.iactioncleanoptions.md).[includesToRestoreOnFailure](client_providers_item.iactioncleanoptions.md#includestorestoreonfailure)

Defined in: [client/providers/item.tsx:188](https://github.com/onzag/itemize/blob/28218320/client/providers/item.tsx#L188)

___

### includesToRestoreOnSuccess

• `Optional` **includesToRestoreOnSuccess**: *string*[]

Restores the value of an include back to its applied value
or null if it doesn't have such

Inherited from: [IActionCleanOptions](client_providers_item.iactioncleanoptions.md).[includesToRestoreOnSuccess](client_providers_item.iactioncleanoptions.md#includestorestoreonsuccess)

Defined in: [client/providers/item.tsx:178](https://github.com/onzag/itemize/blob/28218320/client/providers/item.tsx#L178)

___

### limit

• **limit**: *number*

Defined in: [client/providers/item.tsx:326](https://github.com/onzag/itemize/blob/28218320/client/providers/item.tsx#L326)

___

### listenPolicy

• `Optional` **listenPolicy**: *none* \| *by-parent* \| *by-owner*

Defined in: [client/providers/item.tsx:323](https://github.com/onzag/itemize/blob/28218320/client/providers/item.tsx#L323)

___

### markForDestructionOnLogout

• `Optional` **markForDestructionOnLogout**: *boolean*

Defined in: [client/providers/item.tsx:324](https://github.com/onzag/itemize/blob/28218320/client/providers/item.tsx#L324)

___

### offset

• **offset**: *number*

Defined in: [client/providers/item.tsx:327](https://github.com/onzag/itemize/blob/28218320/client/providers/item.tsx#L327)

___

### orderBy

• `Optional` **orderBy**: [*IOrderByRuleType*](constants.iorderbyruletype.md)

Defined in: [client/providers/item.tsx:306](https://github.com/onzag/itemize/blob/28218320/client/providers/item.tsx#L306)

___

### parentedBy

• `Optional` **parentedBy**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`id` | *string* |
`item` | *string* |
`version`? | *string* |

Defined in: [client/providers/item.tsx:317](https://github.com/onzag/itemize/blob/28218320/client/providers/item.tsx#L317)

___

### policiesToCleanOnAny

• `Optional` **policiesToCleanOnAny**: [*PolicyPathType*](../modules/client_providers_item.md#policypathtype)[]

Cleans the value of a policy back to null

Inherited from: [IActionCleanOptions](client_providers_item.iactioncleanoptions.md).[policiesToCleanOnAny](client_providers_item.iactioncleanoptions.md#policiestocleanonany)

Defined in: [client/providers/item.tsx:154](https://github.com/onzag/itemize/blob/28218320/client/providers/item.tsx#L154)

___

### policiesToCleanOnFailure

• `Optional` **policiesToCleanOnFailure**: [*PolicyPathType*](../modules/client_providers_item.md#policypathtype)[]

Cleans the value of a policy back to null

Inherited from: [IActionCleanOptions](client_providers_item.iactioncleanoptions.md).[policiesToCleanOnFailure](client_providers_item.iactioncleanoptions.md#policiestocleanonfailure)

Defined in: [client/providers/item.tsx:158](https://github.com/onzag/itemize/blob/28218320/client/providers/item.tsx#L158)

___

### policiesToCleanOnSuccess

• `Optional` **policiesToCleanOnSuccess**: [*PolicyPathType*](../modules/client_providers_item.md#policypathtype)[]

Cleans the value of a policy back to null

Inherited from: [IActionCleanOptions](client_providers_item.iactioncleanoptions.md).[policiesToCleanOnSuccess](client_providers_item.iactioncleanoptions.md#policiestocleanonsuccess)

Defined in: [client/providers/item.tsx:150](https://github.com/onzag/itemize/blob/28218320/client/providers/item.tsx#L150)

___

### propertiesToRestoreOnAny

• `Optional` **propertiesToRestoreOnAny**: *string*[]

Restores the value of a property back to its applied value
or null if it doesn't have such

Inherited from: [IActionCleanOptions](client_providers_item.iactioncleanoptions.md).[propertiesToRestoreOnAny](client_providers_item.iactioncleanoptions.md#propertiestorestoreonany)

Defined in: [client/providers/item.tsx:168](https://github.com/onzag/itemize/blob/28218320/client/providers/item.tsx#L168)

___

### propertiesToRestoreOnFailure

• `Optional` **propertiesToRestoreOnFailure**: *string*[]

Restores the value of a property back to its applied value
or null if it doesn't have such

Inherited from: [IActionCleanOptions](client_providers_item.iactioncleanoptions.md).[propertiesToRestoreOnFailure](client_providers_item.iactioncleanoptions.md#propertiestorestoreonfailure)

Defined in: [client/providers/item.tsx:173](https://github.com/onzag/itemize/blob/28218320/client/providers/item.tsx#L173)

___

### propertiesToRestoreOnSuccess

• `Optional` **propertiesToRestoreOnSuccess**: *string*[]

Restores the value of a property back to its applied value
or null if it doesn't have such

Inherited from: [IActionCleanOptions](client_providers_item.iactioncleanoptions.md).[propertiesToRestoreOnSuccess](client_providers_item.iactioncleanoptions.md#propertiestorestoreonsuccess)

Defined in: [client/providers/item.tsx:163](https://github.com/onzag/itemize/blob/28218320/client/providers/item.tsx#L163)

___

### requestedIncludes

• `Optional` **requestedIncludes**: *object*

The requested includes (EXPERIMENTAL)

#### Type declaration:

Defined in: [client/providers/item.tsx:298](https://github.com/onzag/itemize/blob/28218320/client/providers/item.tsx#L298)

___

### requestedProperties

• **requestedProperties**: *string*[]

The properties to be used to request, these have to be part
of your schema

Defined in: [client/providers/item.tsx:294](https://github.com/onzag/itemize/blob/28218320/client/providers/item.tsx#L294)

___

### restoreStateOnAny

• `Optional` **restoreStateOnAny**: *boolean*

Restores the state on success back to its applied value
this will be a clean if no applied value exists

Inherited from: [IActionCleanOptions](client_providers_item.iactioncleanoptions.md).[restoreStateOnAny](client_providers_item.iactioncleanoptions.md#restorestateonany)

Defined in: [client/providers/item.tsx:222](https://github.com/onzag/itemize/blob/28218320/client/providers/item.tsx#L222)

___

### restoreStateOnFailure

• `Optional` **restoreStateOnFailure**: *boolean*

Restores the state on success back to its applied value
this will be a clean if no applied value exists

Inherited from: [IActionCleanOptions](client_providers_item.iactioncleanoptions.md).[restoreStateOnFailure](client_providers_item.iactioncleanoptions.md#restorestateonfailure)

Defined in: [client/providers/item.tsx:227](https://github.com/onzag/itemize/blob/28218320/client/providers/item.tsx#L227)

___

### restoreStateOnSuccess

• `Optional` **restoreStateOnSuccess**: *boolean*

Restores the state on success back to its applied value
this will be a clean if no applied value exists

Inherited from: [IActionCleanOptions](client_providers_item.iactioncleanoptions.md).[restoreStateOnSuccess](client_providers_item.iactioncleanoptions.md#restorestateonsuccess)

Defined in: [client/providers/item.tsx:217](https://github.com/onzag/itemize/blob/28218320/client/providers/item.tsx#L217)

___

### searchByIncludes

• `Optional` **searchByIncludes**: *object*

#### Type declaration:

Defined in: [client/providers/item.tsx:305](https://github.com/onzag/itemize/blob/28218320/client/providers/item.tsx#L305)

___

### searchByProperties

• **searchByProperties**: *string*[]

The properties to be used to search with
you have access to three other special properties
that only exist within search mode "search", "created_by" and "since"

Defined in: [client/providers/item.tsx:304](https://github.com/onzag/itemize/blob/28218320/client/providers/item.tsx#L304)

___

### since

• `Optional` **since**: *string*

The since attribute, note that this option takes priority
over the since property that exists within the search mode

Defined in: [client/providers/item.tsx:316](https://github.com/onzag/itemize/blob/28218320/client/providers/item.tsx#L316)

___

### storeResultsInNavigation

• `Optional` **storeResultsInNavigation**: *string*

Defined in: [client/providers/item.tsx:328](https://github.com/onzag/itemize/blob/28218320/client/providers/item.tsx#L328)

___

### traditional

• `Optional` **traditional**: *boolean*

Defined in: [client/providers/item.tsx:325](https://github.com/onzag/itemize/blob/28218320/client/providers/item.tsx#L325)

___

### unpokeAfterAny

• `Optional` **unpokeAfterAny**: *boolean*

Makes all properties unpoked (invalid won't show)

Inherited from: [IActionCleanOptions](client_providers_item.iactioncleanoptions.md).[unpokeAfterAny](client_providers_item.iactioncleanoptions.md#unpokeafterany)

Defined in: [client/providers/item.tsx:196](https://github.com/onzag/itemize/blob/28218320/client/providers/item.tsx#L196)

___

### unpokeAfterFailure

• `Optional` **unpokeAfterFailure**: *boolean*

Makes all properties unpoked (invalid won't show)

Inherited from: [IActionCleanOptions](client_providers_item.iactioncleanoptions.md).[unpokeAfterFailure](client_providers_item.iactioncleanoptions.md#unpokeafterfailure)

Defined in: [client/providers/item.tsx:200](https://github.com/onzag/itemize/blob/28218320/client/providers/item.tsx#L200)

___

### unpokeAfterSuccess

• `Optional` **unpokeAfterSuccess**: *boolean*

Makes all properties unpoked (invalid won't show)

Inherited from: [IActionCleanOptions](client_providers_item.iactioncleanoptions.md).[unpokeAfterSuccess](client_providers_item.iactioncleanoptions.md#unpokeaftersuccess)

Defined in: [client/providers/item.tsx:192](https://github.com/onzag/itemize/blob/28218320/client/providers/item.tsx#L192)

___

### waitAndMerge

• `Optional` **waitAndMerge**: *boolean*

Defined in: [client/providers/item.tsx:329](https://github.com/onzag/itemize/blob/28218320/client/providers/item.tsx#L329)
