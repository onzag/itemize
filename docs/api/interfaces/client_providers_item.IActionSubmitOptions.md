[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/providers/item](../modules/client_providers_item.md) / IActionSubmitOptions

# Interface: IActionSubmitOptions

[client/providers/item](../modules/client_providers_item.md).IActionSubmitOptions

The options for submitting,
aka edit, aka add

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
- [progresser](client_providers_item.IActionSubmitOptions.md#progresser)
- [properties](client_providers_item.IActionSubmitOptions.md#properties)
- [propertiesToRestoreOnAny](client_providers_item.IActionSubmitOptions.md#propertiestorestoreonany)
- [propertiesToRestoreOnFailure](client_providers_item.IActionSubmitOptions.md#propertiestorestoreonfailure)
- [propertiesToRestoreOnSuccess](client_providers_item.IActionSubmitOptions.md#propertiestorestoreonsuccess)
- [propertyOverrides](client_providers_item.IActionSubmitOptions.md#propertyoverrides)
- [restoreStateOnAny](client_providers_item.IActionSubmitOptions.md#restorestateonany)
- [restoreStateOnFailure](client_providers_item.IActionSubmitOptions.md#restorestateonfailure)
- [restoreStateOnSuccess](client_providers_item.IActionSubmitOptions.md#restorestateonsuccess)
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

#### Defined in

[client/providers/item.tsx:323](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L323)

___

### blockReason

• `Optional` **blockReason**: `string`

#### Defined in

[client/providers/item.tsx:326](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L326)

___

### blockStatus

• `Optional` **blockStatus**: `boolean`

#### Defined in

[client/providers/item.tsx:324](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L324)

___

### blockUntil

• `Optional` **blockUntil**: `string`

#### Defined in

[client/providers/item.tsx:325](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L325)

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

### clearStoredStateIfConnected

• `Optional` **clearStoredStateIfConnected**: `boolean`

#### Defined in

[client/providers/item.tsx:349](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L349)

___

### differingOnly

• `Optional` **differingOnly**: `boolean`

#### Defined in

[client/providers/item.tsx:308](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L308)

___

### inBehalfOf

• `Optional` **inBehalfOf**: `string`

#### Defined in

[client/providers/item.tsx:334](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L334)

___

### includeOverrides

• `Optional` **includeOverrides**: [`IIncludeOverride`](client_internal_gql_client_util.IIncludeOverride.md)[]

#### Defined in

[client/providers/item.tsx:336](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L336)

___

### includes

• `Optional` **includes**: `Object`

#### Index signature

▪ [include: `string`]: `string`[]

#### Defined in

[client/providers/item.tsx:309](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L309)

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

### languageOverride

• `Optional` **languageOverride**: `string`

#### Defined in

[client/providers/item.tsx:337](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L337)

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

[client/providers/item.tsx:312](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L312)

___

### parentedByAddOnly

• `Optional` **parentedByAddOnly**: `boolean`

Prevents a reparent from being triggered by triggering
parented by only if it's determined that the action to use
will be of add type

#### Defined in

[client/providers/item.tsx:322](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L322)

___

### pileSubmit

• `Optional` **pileSubmit**: `boolean` \| `ActionSubmitOptionCb`

if submitting already this will prevent throwing an error and instead
will wait until the submit time is free

pass a function to return a partial for patching the submit action
in case you want that behaviour

#### Defined in

[client/providers/item.tsx:347](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L347)

___

### policies

• `Optional` **policies**: [`PolicyPathType`](../modules/client_providers_item.md#policypathtype)[]

#### Defined in

[client/providers/item.tsx:310](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L310)

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

[client/providers/item.tsx:339](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L339)

___

### properties

• **properties**: `string`[]

#### Defined in

[client/providers/item.tsx:307](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L307)

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

### propertyOverrides

• `Optional` **propertyOverrides**: [`IPropertyOverride`](client_internal_gql_client_util.IPropertyOverride.md)[]

#### Defined in

[client/providers/item.tsx:335](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L335)

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

### storeStateIfCantConnect

• `Optional` **storeStateIfCantConnect**: `boolean`

#### Defined in

[client/providers/item.tsx:348](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L348)

___

### submitForId

• `Optional` **submitForId**: `string`

#### Defined in

[client/providers/item.tsx:327](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L327)

___

### submitForItem

• `Optional` **submitForItem**: `string`

Advanced, allows to submit for an alternate item rather than the current
one

#### Defined in

[client/providers/item.tsx:333](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L333)

___

### submitForVersion

• `Optional` **submitForVersion**: `string`

#### Defined in

[client/providers/item.tsx:328](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L328)

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

[client/providers/item.tsx:338](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L338)

## Methods

### beforeSubmit

▸ `Optional` **beforeSubmit**(): `boolean` \| `Promise`<`boolean`\>

#### Returns

`boolean` \| `Promise`<`boolean`\>

#### Defined in

[client/providers/item.tsx:311](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L311)
