[](../README.md) / [Exports](../modules.md) / [client/providers/item](../modules/client_providers_item.md) / IActionDeleteOptions

# Interface: IActionDeleteOptions

[client/providers/item](../modules/client_providers_item.md).IActionDeleteOptions

## Hierarchy

* [*IActionCleanOptions*](client_providers_item.iactioncleanoptions.md)

  ↳ **IActionDeleteOptions**

## Table of contents

### Properties

- [beforeDelete](client_providers_item.iactiondeleteoptions.md#beforedelete)
- [cleanSearchResultsOnAny](client_providers_item.iactiondeleteoptions.md#cleansearchresultsonany)
- [cleanSearchResultsOnFailure](client_providers_item.iactiondeleteoptions.md#cleansearchresultsonfailure)
- [cleanSearchResultsOnSuccess](client_providers_item.iactiondeleteoptions.md#cleansearchresultsonsuccess)
- [cleanStateOnAny](client_providers_item.iactiondeleteoptions.md#cleanstateonany)
- [cleanStateOnFailure](client_providers_item.iactiondeleteoptions.md#cleanstateonfailure)
- [cleanStateOnSuccess](client_providers_item.iactiondeleteoptions.md#cleanstateonsuccess)
- [includesToRestoreOnAny](client_providers_item.iactiondeleteoptions.md#includestorestoreonany)
- [includesToRestoreOnFailure](client_providers_item.iactiondeleteoptions.md#includestorestoreonfailure)
- [includesToRestoreOnSuccess](client_providers_item.iactiondeleteoptions.md#includestorestoreonsuccess)
- [policies](client_providers_item.iactiondeleteoptions.md#policies)
- [policiesToCleanOnAny](client_providers_item.iactiondeleteoptions.md#policiestocleanonany)
- [policiesToCleanOnFailure](client_providers_item.iactiondeleteoptions.md#policiestocleanonfailure)
- [policiesToCleanOnSuccess](client_providers_item.iactiondeleteoptions.md#policiestocleanonsuccess)
- [propertiesToRestoreOnAny](client_providers_item.iactiondeleteoptions.md#propertiestorestoreonany)
- [propertiesToRestoreOnFailure](client_providers_item.iactiondeleteoptions.md#propertiestorestoreonfailure)
- [propertiesToRestoreOnSuccess](client_providers_item.iactiondeleteoptions.md#propertiestorestoreonsuccess)
- [restoreStateOnAny](client_providers_item.iactiondeleteoptions.md#restorestateonany)
- [restoreStateOnFailure](client_providers_item.iactiondeleteoptions.md#restorestateonfailure)
- [restoreStateOnSuccess](client_providers_item.iactiondeleteoptions.md#restorestateonsuccess)
- [unpokeAfterAny](client_providers_item.iactiondeleteoptions.md#unpokeafterany)
- [unpokeAfterFailure](client_providers_item.iactiondeleteoptions.md#unpokeafterfailure)
- [unpokeAfterSuccess](client_providers_item.iactiondeleteoptions.md#unpokeaftersuccess)

## Properties

### beforeDelete

• `Optional` **beforeDelete**: () => *boolean* \| *Promise*<boolean\>

#### Type declaration:

▸ (): *boolean* \| *Promise*<boolean\>

**Returns:** *boolean* \| *Promise*<boolean\>

Defined in: [client/providers/item.tsx:283](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L283)

Defined in: [client/providers/item.tsx:283](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L283)

___

### cleanSearchResultsOnAny

• `Optional` **cleanSearchResultsOnAny**: *boolean*

cleans the search results

Inherited from: [IActionCleanOptions](client_providers_item.iactioncleanoptions.md).[cleanSearchResultsOnAny](client_providers_item.iactioncleanoptions.md#cleansearchresultsonany)

Defined in: [client/providers/item.tsx:208](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L208)

___

### cleanSearchResultsOnFailure

• `Optional` **cleanSearchResultsOnFailure**: *boolean*

cleans the search results

Inherited from: [IActionCleanOptions](client_providers_item.iactioncleanoptions.md).[cleanSearchResultsOnFailure](client_providers_item.iactioncleanoptions.md#cleansearchresultsonfailure)

Defined in: [client/providers/item.tsx:212](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L212)

___

### cleanSearchResultsOnSuccess

• `Optional` **cleanSearchResultsOnSuccess**: *boolean*

cleans the search results

Inherited from: [IActionCleanOptions](client_providers_item.iactioncleanoptions.md).[cleanSearchResultsOnSuccess](client_providers_item.iactioncleanoptions.md#cleansearchresultsonsuccess)

Defined in: [client/providers/item.tsx:204](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L204)

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

Defined in: [client/providers/item.tsx:254](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L254)

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

Defined in: [client/providers/item.tsx:245](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L245)

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

Defined in: [client/providers/item.tsx:236](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L236)

___

### includesToRestoreOnAny

• `Optional` **includesToRestoreOnAny**: *string*[]

Restores the value of an include back to its applied value
or null if it doesn't have such

Inherited from: [IActionCleanOptions](client_providers_item.iactioncleanoptions.md).[includesToRestoreOnAny](client_providers_item.iactioncleanoptions.md#includestorestoreonany)

Defined in: [client/providers/item.tsx:183](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L183)

___

### includesToRestoreOnFailure

• `Optional` **includesToRestoreOnFailure**: *string*[]

Restores the value of an include back to its applied value
or null if it doesn't have such

Inherited from: [IActionCleanOptions](client_providers_item.iactioncleanoptions.md).[includesToRestoreOnFailure](client_providers_item.iactioncleanoptions.md#includestorestoreonfailure)

Defined in: [client/providers/item.tsx:188](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L188)

___

### includesToRestoreOnSuccess

• `Optional` **includesToRestoreOnSuccess**: *string*[]

Restores the value of an include back to its applied value
or null if it doesn't have such

Inherited from: [IActionCleanOptions](client_providers_item.iactioncleanoptions.md).[includesToRestoreOnSuccess](client_providers_item.iactioncleanoptions.md#includestorestoreonsuccess)

Defined in: [client/providers/item.tsx:178](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L178)

___

### policies

• `Optional` **policies**: [*PolicyPathType*](../modules/client_providers_item.md#policypathtype)[]

Defined in: [client/providers/item.tsx:282](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L282)

___

### policiesToCleanOnAny

• `Optional` **policiesToCleanOnAny**: [*PolicyPathType*](../modules/client_providers_item.md#policypathtype)[]

Cleans the value of a policy back to null

Inherited from: [IActionCleanOptions](client_providers_item.iactioncleanoptions.md).[policiesToCleanOnAny](client_providers_item.iactioncleanoptions.md#policiestocleanonany)

Defined in: [client/providers/item.tsx:154](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L154)

___

### policiesToCleanOnFailure

• `Optional` **policiesToCleanOnFailure**: [*PolicyPathType*](../modules/client_providers_item.md#policypathtype)[]

Cleans the value of a policy back to null

Inherited from: [IActionCleanOptions](client_providers_item.iactioncleanoptions.md).[policiesToCleanOnFailure](client_providers_item.iactioncleanoptions.md#policiestocleanonfailure)

Defined in: [client/providers/item.tsx:158](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L158)

___

### policiesToCleanOnSuccess

• `Optional` **policiesToCleanOnSuccess**: [*PolicyPathType*](../modules/client_providers_item.md#policypathtype)[]

Cleans the value of a policy back to null

Inherited from: [IActionCleanOptions](client_providers_item.iactioncleanoptions.md).[policiesToCleanOnSuccess](client_providers_item.iactioncleanoptions.md#policiestocleanonsuccess)

Defined in: [client/providers/item.tsx:150](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L150)

___

### propertiesToRestoreOnAny

• `Optional` **propertiesToRestoreOnAny**: *string*[]

Restores the value of a property back to its applied value
or null if it doesn't have such

Inherited from: [IActionCleanOptions](client_providers_item.iactioncleanoptions.md).[propertiesToRestoreOnAny](client_providers_item.iactioncleanoptions.md#propertiestorestoreonany)

Defined in: [client/providers/item.tsx:168](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L168)

___

### propertiesToRestoreOnFailure

• `Optional` **propertiesToRestoreOnFailure**: *string*[]

Restores the value of a property back to its applied value
or null if it doesn't have such

Inherited from: [IActionCleanOptions](client_providers_item.iactioncleanoptions.md).[propertiesToRestoreOnFailure](client_providers_item.iactioncleanoptions.md#propertiestorestoreonfailure)

Defined in: [client/providers/item.tsx:173](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L173)

___

### propertiesToRestoreOnSuccess

• `Optional` **propertiesToRestoreOnSuccess**: *string*[]

Restores the value of a property back to its applied value
or null if it doesn't have such

Inherited from: [IActionCleanOptions](client_providers_item.iactioncleanoptions.md).[propertiesToRestoreOnSuccess](client_providers_item.iactioncleanoptions.md#propertiestorestoreonsuccess)

Defined in: [client/providers/item.tsx:163](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L163)

___

### restoreStateOnAny

• `Optional` **restoreStateOnAny**: *boolean*

Restores the state on success back to its applied value
this will be a clean if no applied value exists

Inherited from: [IActionCleanOptions](client_providers_item.iactioncleanoptions.md).[restoreStateOnAny](client_providers_item.iactioncleanoptions.md#restorestateonany)

Defined in: [client/providers/item.tsx:222](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L222)

___

### restoreStateOnFailure

• `Optional` **restoreStateOnFailure**: *boolean*

Restores the state on success back to its applied value
this will be a clean if no applied value exists

Inherited from: [IActionCleanOptions](client_providers_item.iactioncleanoptions.md).[restoreStateOnFailure](client_providers_item.iactioncleanoptions.md#restorestateonfailure)

Defined in: [client/providers/item.tsx:227](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L227)

___

### restoreStateOnSuccess

• `Optional` **restoreStateOnSuccess**: *boolean*

Restores the state on success back to its applied value
this will be a clean if no applied value exists

Inherited from: [IActionCleanOptions](client_providers_item.iactioncleanoptions.md).[restoreStateOnSuccess](client_providers_item.iactioncleanoptions.md#restorestateonsuccess)

Defined in: [client/providers/item.tsx:217](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L217)

___

### unpokeAfterAny

• `Optional` **unpokeAfterAny**: *boolean*

Makes all properties unpoked (invalid won't show)

Inherited from: [IActionCleanOptions](client_providers_item.iactioncleanoptions.md).[unpokeAfterAny](client_providers_item.iactioncleanoptions.md#unpokeafterany)

Defined in: [client/providers/item.tsx:196](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L196)

___

### unpokeAfterFailure

• `Optional` **unpokeAfterFailure**: *boolean*

Makes all properties unpoked (invalid won't show)

Inherited from: [IActionCleanOptions](client_providers_item.iactioncleanoptions.md).[unpokeAfterFailure](client_providers_item.iactioncleanoptions.md#unpokeafterfailure)

Defined in: [client/providers/item.tsx:200](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L200)

___

### unpokeAfterSuccess

• `Optional` **unpokeAfterSuccess**: *boolean*

Makes all properties unpoked (invalid won't show)

Inherited from: [IActionCleanOptions](client_providers_item.iactioncleanoptions.md).[unpokeAfterSuccess](client_providers_item.iactioncleanoptions.md#unpokeaftersuccess)

Defined in: [client/providers/item.tsx:192](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L192)
