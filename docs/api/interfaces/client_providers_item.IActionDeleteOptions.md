[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/providers/item](../modules/client_providers_item.md) / IActionDeleteOptions

# Interface: IActionDeleteOptions

[client/providers/item](../modules/client_providers_item.md).IActionDeleteOptions

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

cleans the search results

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[cleanSearchResultsOnAny](client_providers_item.IActionCleanOptions.md#cleansearchresultsonany)

#### Defined in

[client/providers/item.tsx:251](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L251)

___

### cleanSearchResultsOnFailure

• `Optional` **cleanSearchResultsOnFailure**: `boolean`

cleans the search results

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[cleanSearchResultsOnFailure](client_providers_item.IActionCleanOptions.md#cleansearchresultsonfailure)

#### Defined in

[client/providers/item.tsx:255](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L255)

___

### cleanSearchResultsOnSuccess

• `Optional` **cleanSearchResultsOnSuccess**: `boolean`

cleans the search results

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[cleanSearchResultsOnSuccess](client_providers_item.IActionCleanOptions.md#cleansearchresultsonsuccess)

#### Defined in

[client/providers/item.tsx:247](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L247)

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

[client/providers/item.tsx:297](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L297)

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

[client/providers/item.tsx:288](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L288)

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

[client/providers/item.tsx:279](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L279)

___

### deleteForId

• `Optional` **deleteForId**: `string`

#### Defined in

[client/providers/item.tsx:353](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L353)

___

### deleteForVersion

• `Optional` **deleteForVersion**: `string`

#### Defined in

[client/providers/item.tsx:354](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L354)

___

### includesToRestoreOnAny

• `Optional` **includesToRestoreOnAny**: `string`[]

Restores the value of an include back to its applied value
or null if it doesn't have such

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[includesToRestoreOnAny](client_providers_item.IActionCleanOptions.md#includestorestoreonany)

#### Defined in

[client/providers/item.tsx:226](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L226)

___

### includesToRestoreOnFailure

• `Optional` **includesToRestoreOnFailure**: `string`[]

Restores the value of an include back to its applied value
or null if it doesn't have such

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[includesToRestoreOnFailure](client_providers_item.IActionCleanOptions.md#includestorestoreonfailure)

#### Defined in

[client/providers/item.tsx:231](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L231)

___

### includesToRestoreOnSuccess

• `Optional` **includesToRestoreOnSuccess**: `string`[]

Restores the value of an include back to its applied value
or null if it doesn't have such

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[includesToRestoreOnSuccess](client_providers_item.IActionCleanOptions.md#includestorestoreonsuccess)

#### Defined in

[client/providers/item.tsx:221](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L221)

___

### policies

• `Optional` **policies**: [`PolicyPathType`](../modules/client_providers_item.md#policypathtype)[]

#### Defined in

[client/providers/item.tsx:355](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L355)

___

### policiesToCleanOnAny

• `Optional` **policiesToCleanOnAny**: [`PolicyPathType`](../modules/client_providers_item.md#policypathtype)[]

Cleans the value of a policy back to null

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[policiesToCleanOnAny](client_providers_item.IActionCleanOptions.md#policiestocleanonany)

#### Defined in

[client/providers/item.tsx:197](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L197)

___

### policiesToCleanOnFailure

• `Optional` **policiesToCleanOnFailure**: [`PolicyPathType`](../modules/client_providers_item.md#policypathtype)[]

Cleans the value of a policy back to null

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[policiesToCleanOnFailure](client_providers_item.IActionCleanOptions.md#policiestocleanonfailure)

#### Defined in

[client/providers/item.tsx:201](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L201)

___

### policiesToCleanOnSuccess

• `Optional` **policiesToCleanOnSuccess**: [`PolicyPathType`](../modules/client_providers_item.md#policypathtype)[]

Cleans the value of a policy back to null

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[policiesToCleanOnSuccess](client_providers_item.IActionCleanOptions.md#policiestocleanonsuccess)

#### Defined in

[client/providers/item.tsx:193](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L193)

___

### progresser

• `Optional` **progresser**: [`ProgresserFn`](../modules/gql_querier.md#progresserfn)

#### Defined in

[client/providers/item.tsx:357](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L357)

___

### propertiesToRestoreOnAny

• `Optional` **propertiesToRestoreOnAny**: `string`[]

Restores the value of a property back to its applied value
or null if it doesn't have such

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[propertiesToRestoreOnAny](client_providers_item.IActionCleanOptions.md#propertiestorestoreonany)

#### Defined in

[client/providers/item.tsx:211](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L211)

___

### propertiesToRestoreOnFailure

• `Optional` **propertiesToRestoreOnFailure**: `string`[]

Restores the value of a property back to its applied value
or null if it doesn't have such

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[propertiesToRestoreOnFailure](client_providers_item.IActionCleanOptions.md#propertiestorestoreonfailure)

#### Defined in

[client/providers/item.tsx:216](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L216)

___

### propertiesToRestoreOnSuccess

• `Optional` **propertiesToRestoreOnSuccess**: `string`[]

Restores the value of a property back to its applied value
or null if it doesn't have such

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[propertiesToRestoreOnSuccess](client_providers_item.IActionCleanOptions.md#propertiestorestoreonsuccess)

#### Defined in

[client/providers/item.tsx:206](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L206)

___

### restoreStateOnAny

• `Optional` **restoreStateOnAny**: `boolean`

Restores the state on success back to its applied value
this will be a clean if no applied value exists

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[restoreStateOnAny](client_providers_item.IActionCleanOptions.md#restorestateonany)

#### Defined in

[client/providers/item.tsx:265](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L265)

___

### restoreStateOnFailure

• `Optional` **restoreStateOnFailure**: `boolean`

Restores the state on success back to its applied value
this will be a clean if no applied value exists

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[restoreStateOnFailure](client_providers_item.IActionCleanOptions.md#restorestateonfailure)

#### Defined in

[client/providers/item.tsx:270](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L270)

___

### restoreStateOnSuccess

• `Optional` **restoreStateOnSuccess**: `boolean`

Restores the state on success back to its applied value
this will be a clean if no applied value exists

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[restoreStateOnSuccess](client_providers_item.IActionCleanOptions.md#restorestateonsuccess)

#### Defined in

[client/providers/item.tsx:260](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L260)

___

### unpokeAfterAny

• `Optional` **unpokeAfterAny**: `boolean`

Makes all properties unpoked (invalid won't show)

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[unpokeAfterAny](client_providers_item.IActionCleanOptions.md#unpokeafterany)

#### Defined in

[client/providers/item.tsx:239](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L239)

___

### unpokeAfterFailure

• `Optional` **unpokeAfterFailure**: `boolean`

Makes all properties unpoked (invalid won't show)

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[unpokeAfterFailure](client_providers_item.IActionCleanOptions.md#unpokeafterfailure)

#### Defined in

[client/providers/item.tsx:243](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L243)

___

### unpokeAfterSuccess

• `Optional` **unpokeAfterSuccess**: `boolean`

Makes all properties unpoked (invalid won't show)

#### Inherited from

[IActionCleanOptions](client_providers_item.IActionCleanOptions.md).[unpokeAfterSuccess](client_providers_item.IActionCleanOptions.md#unpokeaftersuccess)

#### Defined in

[client/providers/item.tsx:235](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L235)

## Methods

### beforeDelete

▸ `Optional` **beforeDelete**(): `boolean` \| `Promise`<`boolean`\>

#### Returns

`boolean` \| `Promise`<`boolean`\>

#### Defined in

[client/providers/item.tsx:356](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L356)
