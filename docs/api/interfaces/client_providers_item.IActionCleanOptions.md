[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/providers/item](../modules/client_providers_item.md) / IActionCleanOptions

# Interface: IActionCleanOptions

[client/providers/item](../modules/client_providers_item.md).IActionCleanOptions

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

cleans the search results

#### Defined in

[client/providers/item.tsx:251](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L251)

___

### cleanSearchResultsOnFailure

• `Optional` **cleanSearchResultsOnFailure**: `boolean`

cleans the search results

#### Defined in

[client/providers/item.tsx:255](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L255)

___

### cleanSearchResultsOnSuccess

• `Optional` **cleanSearchResultsOnSuccess**: `boolean`

cleans the search results

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

#### Defined in

[client/providers/item.tsx:279](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L279)

___

### includesToRestoreOnAny

• `Optional` **includesToRestoreOnAny**: `string`[]

Restores the value of an include back to its applied value
or null if it doesn't have such

#### Defined in

[client/providers/item.tsx:226](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L226)

___

### includesToRestoreOnFailure

• `Optional` **includesToRestoreOnFailure**: `string`[]

Restores the value of an include back to its applied value
or null if it doesn't have such

#### Defined in

[client/providers/item.tsx:231](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L231)

___

### includesToRestoreOnSuccess

• `Optional` **includesToRestoreOnSuccess**: `string`[]

Restores the value of an include back to its applied value
or null if it doesn't have such

#### Defined in

[client/providers/item.tsx:221](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L221)

___

### policiesToCleanOnAny

• `Optional` **policiesToCleanOnAny**: [`PolicyPathType`](../modules/client_providers_item.md#policypathtype)[]

Cleans the value of a policy back to null

#### Defined in

[client/providers/item.tsx:197](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L197)

___

### policiesToCleanOnFailure

• `Optional` **policiesToCleanOnFailure**: [`PolicyPathType`](../modules/client_providers_item.md#policypathtype)[]

Cleans the value of a policy back to null

#### Defined in

[client/providers/item.tsx:201](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L201)

___

### policiesToCleanOnSuccess

• `Optional` **policiesToCleanOnSuccess**: [`PolicyPathType`](../modules/client_providers_item.md#policypathtype)[]

Cleans the value of a policy back to null

#### Defined in

[client/providers/item.tsx:193](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L193)

___

### propertiesToRestoreOnAny

• `Optional` **propertiesToRestoreOnAny**: `string`[]

Restores the value of a property back to its applied value
or null if it doesn't have such

#### Defined in

[client/providers/item.tsx:211](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L211)

___

### propertiesToRestoreOnFailure

• `Optional` **propertiesToRestoreOnFailure**: `string`[]

Restores the value of a property back to its applied value
or null if it doesn't have such

#### Defined in

[client/providers/item.tsx:216](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L216)

___

### propertiesToRestoreOnSuccess

• `Optional` **propertiesToRestoreOnSuccess**: `string`[]

Restores the value of a property back to its applied value
or null if it doesn't have such

#### Defined in

[client/providers/item.tsx:206](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L206)

___

### restoreStateOnAny

• `Optional` **restoreStateOnAny**: `boolean`

Restores the state on success back to its applied value
this will be a clean if no applied value exists

#### Defined in

[client/providers/item.tsx:265](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L265)

___

### restoreStateOnFailure

• `Optional` **restoreStateOnFailure**: `boolean`

Restores the state on success back to its applied value
this will be a clean if no applied value exists

#### Defined in

[client/providers/item.tsx:270](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L270)

___

### restoreStateOnSuccess

• `Optional` **restoreStateOnSuccess**: `boolean`

Restores the state on success back to its applied value
this will be a clean if no applied value exists

#### Defined in

[client/providers/item.tsx:260](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L260)

___

### unpokeAfterAny

• `Optional` **unpokeAfterAny**: `boolean`

Makes all properties unpoked (invalid won't show)

#### Defined in

[client/providers/item.tsx:239](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L239)

___

### unpokeAfterFailure

• `Optional` **unpokeAfterFailure**: `boolean`

Makes all properties unpoked (invalid won't show)

#### Defined in

[client/providers/item.tsx:243](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L243)

___

### unpokeAfterSuccess

• `Optional` **unpokeAfterSuccess**: `boolean`

Makes all properties unpoked (invalid won't show)

#### Defined in

[client/providers/item.tsx:235](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L235)
