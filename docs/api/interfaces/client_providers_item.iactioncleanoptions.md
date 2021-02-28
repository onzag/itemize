[](../README.md) / [Exports](../modules.md) / [client/providers/item](../modules/client_providers_item.md) / IActionCleanOptions

# Interface: IActionCleanOptions

[client/providers/item](../modules/client_providers_item.md).IActionCleanOptions

## Hierarchy

* **IActionCleanOptions**

  ↳ [*IActionSubmitOptions*](client_providers_item.iactionsubmitoptions.md)

  ↳ [*IActionDeleteOptions*](client_providers_item.iactiondeleteoptions.md)

  ↳ [*IActionSearchOptions*](client_providers_item.iactionsearchoptions.md)

## Table of contents

### Properties

- [cleanSearchResultsOnAny](client_providers_item.iactioncleanoptions.md#cleansearchresultsonany)
- [cleanSearchResultsOnFailure](client_providers_item.iactioncleanoptions.md#cleansearchresultsonfailure)
- [cleanSearchResultsOnSuccess](client_providers_item.iactioncleanoptions.md#cleansearchresultsonsuccess)
- [cleanStateOnAny](client_providers_item.iactioncleanoptions.md#cleanstateonany)
- [cleanStateOnFailure](client_providers_item.iactioncleanoptions.md#cleanstateonfailure)
- [cleanStateOnSuccess](client_providers_item.iactioncleanoptions.md#cleanstateonsuccess)
- [includesToRestoreOnAny](client_providers_item.iactioncleanoptions.md#includestorestoreonany)
- [includesToRestoreOnFailure](client_providers_item.iactioncleanoptions.md#includestorestoreonfailure)
- [includesToRestoreOnSuccess](client_providers_item.iactioncleanoptions.md#includestorestoreonsuccess)
- [policiesToCleanOnAny](client_providers_item.iactioncleanoptions.md#policiestocleanonany)
- [policiesToCleanOnFailure](client_providers_item.iactioncleanoptions.md#policiestocleanonfailure)
- [policiesToCleanOnSuccess](client_providers_item.iactioncleanoptions.md#policiestocleanonsuccess)
- [propertiesToRestoreOnAny](client_providers_item.iactioncleanoptions.md#propertiestorestoreonany)
- [propertiesToRestoreOnFailure](client_providers_item.iactioncleanoptions.md#propertiestorestoreonfailure)
- [propertiesToRestoreOnSuccess](client_providers_item.iactioncleanoptions.md#propertiestorestoreonsuccess)
- [restoreStateOnAny](client_providers_item.iactioncleanoptions.md#restorestateonany)
- [restoreStateOnFailure](client_providers_item.iactioncleanoptions.md#restorestateonfailure)
- [restoreStateOnSuccess](client_providers_item.iactioncleanoptions.md#restorestateonsuccess)
- [unpokeAfterAny](client_providers_item.iactioncleanoptions.md#unpokeafterany)
- [unpokeAfterFailure](client_providers_item.iactioncleanoptions.md#unpokeafterfailure)
- [unpokeAfterSuccess](client_providers_item.iactioncleanoptions.md#unpokeaftersuccess)

## Properties

### cleanSearchResultsOnAny

• `Optional` **cleanSearchResultsOnAny**: *boolean*

cleans the search results

Defined in: [client/providers/item.tsx:208](https://github.com/onzag/itemize/blob/11a98dec/client/providers/item.tsx#L208)

___

### cleanSearchResultsOnFailure

• `Optional` **cleanSearchResultsOnFailure**: *boolean*

cleans the search results

Defined in: [client/providers/item.tsx:212](https://github.com/onzag/itemize/blob/11a98dec/client/providers/item.tsx#L212)

___

### cleanSearchResultsOnSuccess

• `Optional` **cleanSearchResultsOnSuccess**: *boolean*

cleans the search results

Defined in: [client/providers/item.tsx:204](https://github.com/onzag/itemize/blob/11a98dec/client/providers/item.tsx#L204)

___

### cleanStateOnAny

• `Optional` **cleanStateOnAny**: *boolean*

Warning, clean state on success might not clean anything
if the cleaning is blocked from happening, this is because
other item provider is expecting to use the same value
always use propertiesToRestoreOn* in order to strip critical
data (eg. passwords) clean state is used for a memory relief
and itemize might decide that it's better not to provide it

Defined in: [client/providers/item.tsx:254](https://github.com/onzag/itemize/blob/11a98dec/client/providers/item.tsx#L254)

___

### cleanStateOnFailure

• `Optional` **cleanStateOnFailure**: *boolean*

Warning, clean state on success might not clean anything
if the cleaning is blocked from happening, this is because
other item provider is expecting to use the same value
always use propertiesToRestoreOn* in order to strip critical
data (eg. passwords) clean state is used for a memory relief
and itemize might decide that it's better not to provide it

Defined in: [client/providers/item.tsx:245](https://github.com/onzag/itemize/blob/11a98dec/client/providers/item.tsx#L245)

___

### cleanStateOnSuccess

• `Optional` **cleanStateOnSuccess**: *boolean*

Warning, clean state on success might not clean anything
if the cleaning is blocked from happening, this is because
other item provider is expecting to use the same value
always use propertiesToRestoreOn* in order to strip critical
data (eg. passwords) clean state is used for a memory relief
and itemize might decide that it's better not to provide it

Defined in: [client/providers/item.tsx:236](https://github.com/onzag/itemize/blob/11a98dec/client/providers/item.tsx#L236)

___

### includesToRestoreOnAny

• `Optional` **includesToRestoreOnAny**: *string*[]

Restores the value of an include back to its applied value
or null if it doesn't have such

Defined in: [client/providers/item.tsx:183](https://github.com/onzag/itemize/blob/11a98dec/client/providers/item.tsx#L183)

___

### includesToRestoreOnFailure

• `Optional` **includesToRestoreOnFailure**: *string*[]

Restores the value of an include back to its applied value
or null if it doesn't have such

Defined in: [client/providers/item.tsx:188](https://github.com/onzag/itemize/blob/11a98dec/client/providers/item.tsx#L188)

___

### includesToRestoreOnSuccess

• `Optional` **includesToRestoreOnSuccess**: *string*[]

Restores the value of an include back to its applied value
or null if it doesn't have such

Defined in: [client/providers/item.tsx:178](https://github.com/onzag/itemize/blob/11a98dec/client/providers/item.tsx#L178)

___

### policiesToCleanOnAny

• `Optional` **policiesToCleanOnAny**: [*PolicyPathType*](../modules/client_providers_item.md#policypathtype)[]

Cleans the value of a policy back to null

Defined in: [client/providers/item.tsx:154](https://github.com/onzag/itemize/blob/11a98dec/client/providers/item.tsx#L154)

___

### policiesToCleanOnFailure

• `Optional` **policiesToCleanOnFailure**: [*PolicyPathType*](../modules/client_providers_item.md#policypathtype)[]

Cleans the value of a policy back to null

Defined in: [client/providers/item.tsx:158](https://github.com/onzag/itemize/blob/11a98dec/client/providers/item.tsx#L158)

___

### policiesToCleanOnSuccess

• `Optional` **policiesToCleanOnSuccess**: [*PolicyPathType*](../modules/client_providers_item.md#policypathtype)[]

Cleans the value of a policy back to null

Defined in: [client/providers/item.tsx:150](https://github.com/onzag/itemize/blob/11a98dec/client/providers/item.tsx#L150)

___

### propertiesToRestoreOnAny

• `Optional` **propertiesToRestoreOnAny**: *string*[]

Restores the value of a property back to its applied value
or null if it doesn't have such

Defined in: [client/providers/item.tsx:168](https://github.com/onzag/itemize/blob/11a98dec/client/providers/item.tsx#L168)

___

### propertiesToRestoreOnFailure

• `Optional` **propertiesToRestoreOnFailure**: *string*[]

Restores the value of a property back to its applied value
or null if it doesn't have such

Defined in: [client/providers/item.tsx:173](https://github.com/onzag/itemize/blob/11a98dec/client/providers/item.tsx#L173)

___

### propertiesToRestoreOnSuccess

• `Optional` **propertiesToRestoreOnSuccess**: *string*[]

Restores the value of a property back to its applied value
or null if it doesn't have such

Defined in: [client/providers/item.tsx:163](https://github.com/onzag/itemize/blob/11a98dec/client/providers/item.tsx#L163)

___

### restoreStateOnAny

• `Optional` **restoreStateOnAny**: *boolean*

Restores the state on success back to its applied value
this will be a clean if no applied value exists

Defined in: [client/providers/item.tsx:222](https://github.com/onzag/itemize/blob/11a98dec/client/providers/item.tsx#L222)

___

### restoreStateOnFailure

• `Optional` **restoreStateOnFailure**: *boolean*

Restores the state on success back to its applied value
this will be a clean if no applied value exists

Defined in: [client/providers/item.tsx:227](https://github.com/onzag/itemize/blob/11a98dec/client/providers/item.tsx#L227)

___

### restoreStateOnSuccess

• `Optional` **restoreStateOnSuccess**: *boolean*

Restores the state on success back to its applied value
this will be a clean if no applied value exists

Defined in: [client/providers/item.tsx:217](https://github.com/onzag/itemize/blob/11a98dec/client/providers/item.tsx#L217)

___

### unpokeAfterAny

• `Optional` **unpokeAfterAny**: *boolean*

Makes all properties unpoked (invalid won't show)

Defined in: [client/providers/item.tsx:196](https://github.com/onzag/itemize/blob/11a98dec/client/providers/item.tsx#L196)

___

### unpokeAfterFailure

• `Optional` **unpokeAfterFailure**: *boolean*

Makes all properties unpoked (invalid won't show)

Defined in: [client/providers/item.tsx:200](https://github.com/onzag/itemize/blob/11a98dec/client/providers/item.tsx#L200)

___

### unpokeAfterSuccess

• `Optional` **unpokeAfterSuccess**: *boolean*

Makes all properties unpoked (invalid won't show)

Defined in: [client/providers/item.tsx:192](https://github.com/onzag/itemize/blob/11a98dec/client/providers/item.tsx#L192)
