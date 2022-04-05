[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/remote-protocol

# Module: base/remote-protocol

Contains a protocol to be used with remote realtime communication in order
to supply realtime updates between the server and the client

This is just a bunch of types that specifies a protocol this is the protocol
that is implemented by the remote listener

## Table of contents

### Interfaces

- [IBuildNumberEvent](../interfaces/base_remote_protocol.IBuildNumberEvent.md)
- [IChangedFeedbackEvent](../interfaces/base_remote_protocol.IChangedFeedbackEvent.md)
- [IErrorEvent](../interfaces/base_remote_protocol.IErrorEvent.md)
- [IFeedbackRequest](../interfaces/base_remote_protocol.IFeedbackRequest.md)
- [IIdentifyRequest](../interfaces/base_remote_protocol.IIdentifyRequest.md)
- [IOwnedParentedSearchFeedbackRequest](../interfaces/base_remote_protocol.IOwnedParentedSearchFeedbackRequest.md)
- [IOwnedParentedSearchRecordsEvent](../interfaces/base_remote_protocol.IOwnedParentedSearchRecordsEvent.md)
- [IOwnedParentedSearchRegisterRequest](../interfaces/base_remote_protocol.IOwnedParentedSearchRegisterRequest.md)
- [IOwnedParentedSearchUnregisterRequest](../interfaces/base_remote_protocol.IOwnedParentedSearchUnregisterRequest.md)
- [IOwnedSearchFeedbackRequest](../interfaces/base_remote_protocol.IOwnedSearchFeedbackRequest.md)
- [IOwnedSearchRecordsEvent](../interfaces/base_remote_protocol.IOwnedSearchRecordsEvent.md)
- [IOwnedSearchRegisterRequest](../interfaces/base_remote_protocol.IOwnedSearchRegisterRequest.md)
- [IOwnedSearchUnregisterRequest](../interfaces/base_remote_protocol.IOwnedSearchUnregisterRequest.md)
- [IParentedSearchFeedbackRequest](../interfaces/base_remote_protocol.IParentedSearchFeedbackRequest.md)
- [IParentedSearchRecordsEvent](../interfaces/base_remote_protocol.IParentedSearchRecordsEvent.md)
- [IParentedSearchRegisterRequest](../interfaces/base_remote_protocol.IParentedSearchRegisterRequest.md)
- [IParentedSearchUnregisterRequest](../interfaces/base_remote_protocol.IParentedSearchUnregisterRequest.md)
- [IRedisEvent](../interfaces/base_remote_protocol.IRedisEvent.md)
- [IRegisterRequest](../interfaces/base_remote_protocol.IRegisterRequest.md)
- [IUnregisterRequest](../interfaces/base_remote_protocol.IUnregisterRequest.md)

### Variables

- [BUILDNUMBER\_EVENT](base_remote_protocol.md#buildnumber_event)
- [CHANGED\_FEEEDBACK\_EVENT](base_remote_protocol.md#changed_feeedback_event)
- [CURRENCY\_FACTORS\_UPDATED\_EVENT](base_remote_protocol.md#currency_factors_updated_event)
- [ERROR\_EVENT](base_remote_protocol.md#error_event)
- [FEEDBACK\_REQUEST](base_remote_protocol.md#feedback_request)
- [FeedbackRequestSchema](base_remote_protocol.md#feedbackrequestschema)
- [IDENTIFIED\_EVENT](base_remote_protocol.md#identified_event)
- [IDENTIFY\_REQUEST](base_remote_protocol.md#identify_request)
- [IdentifyRequestSchema](base_remote_protocol.md#identifyrequestschema)
- [KICKED\_EVENT](base_remote_protocol.md#kicked_event)
- [OWNED\_PARENTED\_SEARCH\_FEEDBACK\_REQUEST](base_remote_protocol.md#owned_parented_search_feedback_request)
- [OWNED\_PARENTED\_SEARCH\_RECORDS\_EVENT](base_remote_protocol.md#owned_parented_search_records_event)
- [OWNED\_PARENTED\_SEARCH\_REGISTER\_REQUEST](base_remote_protocol.md#owned_parented_search_register_request)
- [OWNED\_PARENTED\_SEARCH\_UNREGISTER\_REQUEST](base_remote_protocol.md#owned_parented_search_unregister_request)
- [OWNED\_SEARCH\_FEEDBACK\_REQUEST](base_remote_protocol.md#owned_search_feedback_request)
- [OWNED\_SEARCH\_RECORDS\_EVENT](base_remote_protocol.md#owned_search_records_event)
- [OWNED\_SEARCH\_REGISTER\_REQUEST](base_remote_protocol.md#owned_search_register_request)
- [OWNED\_SEARCH\_UNREGISTER\_REQUEST](base_remote_protocol.md#owned_search_unregister_request)
- [OwnedParentedSearchFeedbackRequestSchema](base_remote_protocol.md#ownedparentedsearchfeedbackrequestschema)
- [OwnedParentedSearchRegisterRequestSchema](base_remote_protocol.md#ownedparentedsearchregisterrequestschema)
- [OwnedParentedSearchUnregisterRequestSchema](base_remote_protocol.md#ownedparentedsearchunregisterrequestschema)
- [OwnedSearchFeedbackRequestSchema](base_remote_protocol.md#ownedsearchfeedbackrequestschema)
- [OwnedSearchRegisterRequestSchema](base_remote_protocol.md#ownedsearchregisterrequestschema)
- [OwnedSearchUnregisterRequestSchema](base_remote_protocol.md#ownedsearchunregisterrequestschema)
- [PARENTED\_SEARCH\_FEEDBACK\_REQUEST](base_remote_protocol.md#parented_search_feedback_request)
- [PARENTED\_SEARCH\_RECORDS\_EVENT](base_remote_protocol.md#parented_search_records_event)
- [PARENTED\_SEARCH\_REGISTER\_REQUEST](base_remote_protocol.md#parented_search_register_request)
- [PARENTED\_SEARCH\_UNREGISTER\_REQUEST](base_remote_protocol.md#parented_search_unregister_request)
- [ParentedSearchFeedbackRequestSchema](base_remote_protocol.md#parentedsearchfeedbackrequestschema)
- [ParentedSearchRegisterRequestSchema](base_remote_protocol.md#parentedsearchregisterrequestschema)
- [ParentedSearchUnregisterRequestSchema](base_remote_protocol.md#parentedsearchunregisterrequestschema)
- [REGISTER\_REQUEST](base_remote_protocol.md#register_request)
- [RegisterRequestSchema](base_remote_protocol.md#registerrequestschema)
- [UNREGISTER\_REQUEST](base_remote_protocol.md#unregister_request)
- [UnregisterRequestSchema](base_remote_protocol.md#unregisterrequestschema)

### Functions

- [generateBasicMergedIndexIdentifier](base_remote_protocol.md#generatebasicmergedindexidentifier)
- [generateOwnedParentedSearchMergedIndexIdentifier](base_remote_protocol.md#generateownedparentedsearchmergedindexidentifier)
- [generateOwnedSearchMergedIndexIdentifier](base_remote_protocol.md#generateownedsearchmergedindexidentifier)
- [generateParentedSearchMergedIndexIdentifier](base_remote_protocol.md#generateparentedsearchmergedindexidentifier)

## Variables

### BUILDNUMBER\_EVENT

• **BUILDNUMBER\_EVENT**: ``"buildnumber"``

The build number event is an event streamed from the
server to the client once this client has connected

#### Defined in

[base/remote-protocol.ts:19](https://github.com/onzag/itemize/blob/f2f29986/base/remote-protocol.ts#L19)

___

### CHANGED\_FEEEDBACK\_EVENT

• **CHANGED\_FEEEDBACK\_EVENT**: ``"changed"``

Event that comes from the server when something has
changed or as an answer from a feedback request

#### Defined in

[base/remote-protocol.ts:67](https://github.com/onzag/itemize/blob/f2f29986/base/remote-protocol.ts#L67)

___

### CURRENCY\_FACTORS\_UPDATED\_EVENT

• **CURRENCY\_FACTORS\_UPDATED\_EVENT**: ``"currency-factors-updated"``

This event occurs when the currency factors have been changed and it streams to
every socket that just happens to be connected, not just identified but just
connected into it, while the data could be attached, we really want to perform
the request to the server in order to ensure that it is cached

#### Defined in

[base/remote-protocol.ts:34](https://github.com/onzag/itemize/blob/f2f29986/base/remote-protocol.ts#L34)

___

### ERROR\_EVENT

• **ERROR\_EVENT**: ``"listener-error"``

This is streamed to the client once the server hits an error
that was somehow caused by the client, there's no much use
for an error event other than notice invalid requests

#### Defined in

[base/remote-protocol.ts:41](https://github.com/onzag/itemize/blob/f2f29986/base/remote-protocol.ts#L41)

___

### FEEDBACK\_REQUEST

• **FEEDBACK\_REQUEST**: ``"feedback"``

a request that is sent to the server in order to
request feedback for a single item definition

#### Defined in

[base/remote-protocol.ts:272](https://github.com/onzag/itemize/blob/f2f29986/base/remote-protocol.ts#L272)

___

### FeedbackRequestSchema

• **FeedbackRequestSchema**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `properties` | `Object` |
| `properties.id` | `Object` |
| `properties.id.type` | `string` |
| `properties.itemDefinition` | `Object` |
| `properties.itemDefinition.type` | `string` |
| `properties.version` | `Object` |
| `properties.version.type` | `string`[] |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[base/remote-protocol.ts:283](https://github.com/onzag/itemize/blob/f2f29986/base/remote-protocol.ts#L283)

___

### IDENTIFIED\_EVENT

• **IDENTIFIED\_EVENT**: ``"identified"``

Identified event comes once the user has been identified properly

#### Defined in

[base/remote-protocol.ts:54](https://github.com/onzag/itemize/blob/f2f29986/base/remote-protocol.ts#L54)

___

### IDENTIFY\_REQUEST

• **IDENTIFY\_REQUEST**: ``"identify"``

The identify request comes when a socket first connects and identifies
itself (this must be the first request, or otherwise other requests will
be ignored)

#### Defined in

[base/remote-protocol.ts:173](https://github.com/onzag/itemize/blob/f2f29986/base/remote-protocol.ts#L173)

___

### IdentifyRequestSchema

• **IdentifyRequestSchema**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `properties` | `Object` |
| `properties.token` | `Object` |
| `properties.token.type` | `string`[] |
| `properties.uuid` | `Object` |
| `properties.uuid.type` | `string` |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[base/remote-protocol.ts:182](https://github.com/onzag/itemize/blob/f2f29986/base/remote-protocol.ts#L182)

___

### KICKED\_EVENT

• **KICKED\_EVENT**: ``"kicked"``

Event that occurs when the user has been kicked, when log out
from all devices has been triggered, users are kicked out and forcefully
logged out, this even also occurs on an invalid identified event

#### Defined in

[base/remote-protocol.ts:61](https://github.com/onzag/itemize/blob/f2f29986/base/remote-protocol.ts#L61)

___

### OWNED\_PARENTED\_SEARCH\_FEEDBACK\_REQUEST

• **OWNED\_PARENTED\_SEARCH\_FEEDBACK\_REQUEST**: ``"owned-parented-search-feedback"``

The feedback version of [PARENTED_SEARCH_REGISTER_REQUEST](base_remote_protocol.md#parented_search_register_request)

#### Defined in

[base/remote-protocol.ts:624](https://github.com/onzag/itemize/blob/f2f29986/base/remote-protocol.ts#L624)

___

### OWNED\_PARENTED\_SEARCH\_RECORDS\_EVENT

• **OWNED\_PARENTED\_SEARCH\_RECORDS\_EVENT**: ``"owned-parented-search-records"``

When they are owned parented items the parent type and id, that has been cached
using those

#### Defined in

[base/remote-protocol.ts:158](https://github.com/onzag/itemize/blob/f2f29986/base/remote-protocol.ts#L158)

___

### OWNED\_PARENTED\_SEARCH\_REGISTER\_REQUEST

• **OWNED\_PARENTED\_SEARCH\_REGISTER\_REQUEST**: ``"owned-parented-search-register"``

this is necessary for parented searches in order to run parented by
cached searches and then request for updates

#### Defined in

[base/remote-protocol.ts:353](https://github.com/onzag/itemize/blob/f2f29986/base/remote-protocol.ts#L353)

___

### OWNED\_PARENTED\_SEARCH\_UNREGISTER\_REQUEST

• **OWNED\_PARENTED\_SEARCH\_UNREGISTER\_REQUEST**: ``"owned-parented-search-unregister"``

The unregister version of [OWNED_PARENTED_SEARCH_REGISTER_REQUEST](base_remote_protocol.md#owned_parented_search_register_request)

#### Defined in

[base/remote-protocol.ts:496](https://github.com/onzag/itemize/blob/f2f29986/base/remote-protocol.ts#L496)

___

### OWNED\_SEARCH\_FEEDBACK\_REQUEST

• **OWNED\_SEARCH\_FEEDBACK\_REQUEST**: ``"owned-search-feedback"``

The feedback version of [PARENTED_SEARCH_REGISTER_REQUEST](base_remote_protocol.md#parented_search_register_request)

#### Defined in

[base/remote-protocol.ts:553](https://github.com/onzag/itemize/blob/f2f29986/base/remote-protocol.ts#L553)

___

### OWNED\_SEARCH\_RECORDS\_EVENT

• **OWNED\_SEARCH\_RECORDS\_EVENT**: ``"owned-search-records"``

When they are owned items, as a search has been cached using a creator
as a base

#### Defined in

[base/remote-protocol.ts:130](https://github.com/onzag/itemize/blob/f2f29986/base/remote-protocol.ts#L130)

___

### OWNED\_SEARCH\_REGISTER\_REQUEST

• **OWNED\_SEARCH\_REGISTER\_REQUEST**: ``"owned-search-register"``

this is necessary for owned searches in order to run created by
cached searches and then request for updates

#### Defined in

[base/remote-protocol.ts:318](https://github.com/onzag/itemize/blob/f2f29986/base/remote-protocol.ts#L318)

___

### OWNED\_SEARCH\_UNREGISTER\_REQUEST

• **OWNED\_SEARCH\_UNREGISTER\_REQUEST**: ``"owned-search-unregister"``

The unregister version of [OWNED_SEARCH_REGISTER_REQUEST](base_remote_protocol.md#owned_search_register_request)

#### Defined in

[base/remote-protocol.ts:434](https://github.com/onzag/itemize/blob/f2f29986/base/remote-protocol.ts#L434)

___

### OwnedParentedSearchFeedbackRequestSchema

• **OwnedParentedSearchFeedbackRequestSchema**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `properties` | `Object` |
| `properties.createdBy` | `Object` |
| `properties.createdBy.type` | `string` |
| `properties.lastModified` | `Object` |
| `properties.lastModified.type` | `string`[] |
| `properties.parentId` | `Object` |
| `properties.parentId.type` | `string` |
| `properties.parentType` | `Object` |
| `properties.parentType.type` | `string` |
| `properties.parentVersion` | `Object` |
| `properties.parentVersion.type` | `string`[] |
| `properties.qualifiedPathName` | `Object` |
| `properties.qualifiedPathName.type` | `string` |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[base/remote-protocol.ts:631](https://github.com/onzag/itemize/blob/f2f29986/base/remote-protocol.ts#L631)

___

### OwnedParentedSearchRegisterRequestSchema

• **OwnedParentedSearchRegisterRequestSchema**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `properties` | `Object` |
| `properties.createdBy` | `Object` |
| `properties.createdBy.type` | `string` |
| `properties.parentId` | `Object` |
| `properties.parentId.type` | `string` |
| `properties.parentType` | `Object` |
| `properties.parentType.type` | `string` |
| `properties.parentVersion` | `Object` |
| `properties.parentVersion.type` | `string`[] |
| `properties.qualifiedPathName` | `Object` |
| `properties.qualifiedPathName.type` | `string` |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[base/remote-protocol.ts:394](https://github.com/onzag/itemize/blob/f2f29986/base/remote-protocol.ts#L394)

___

### OwnedParentedSearchUnregisterRequestSchema

• **OwnedParentedSearchUnregisterRequestSchema**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `properties` | `Object` |
| `properties.createdBy` | `Object` |
| `properties.createdBy.type` | `string` |
| `properties.parentId` | `Object` |
| `properties.parentId.type` | `string` |
| `properties.parentType` | `Object` |
| `properties.parentType.type` | `string` |
| `properties.parentVersion` | `Object` |
| `properties.parentVersion.type` | `string`[] |
| `properties.qualifiedPathName` | `Object` |
| `properties.qualifiedPathName.type` | `string` |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[base/remote-protocol.ts:503](https://github.com/onzag/itemize/blob/f2f29986/base/remote-protocol.ts#L503)

___

### OwnedSearchFeedbackRequestSchema

• **OwnedSearchFeedbackRequestSchema**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `properties` | `Object` |
| `properties.createdBy` | `Object` |
| `properties.createdBy.type` | `string` |
| `properties.lastModified` | `Object` |
| `properties.lastModified.type` | `string`[] |
| `properties.qualifiedPathName` | `Object` |
| `properties.qualifiedPathName.type` | `string` |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[base/remote-protocol.ts:561](https://github.com/onzag/itemize/blob/f2f29986/base/remote-protocol.ts#L561)

___

### OwnedSearchRegisterRequestSchema

• **OwnedSearchRegisterRequestSchema**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `properties` | `Object` |
| `properties.createdBy` | `Object` |
| `properties.createdBy.type` | `string` |
| `properties.qualifiedPathName` | `Object` |
| `properties.qualifiedPathName.type` | `string` |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[base/remote-protocol.ts:327](https://github.com/onzag/itemize/blob/f2f29986/base/remote-protocol.ts#L327)

___

### OwnedSearchUnregisterRequestSchema

• **OwnedSearchUnregisterRequestSchema**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `properties` | `Object` |
| `properties.createdBy` | `Object` |
| `properties.createdBy.type` | `string` |
| `properties.qualifiedPathName` | `Object` |
| `properties.qualifiedPathName.type` | `string` |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[base/remote-protocol.ts:441](https://github.com/onzag/itemize/blob/f2f29986/base/remote-protocol.ts#L441)

___

### PARENTED\_SEARCH\_FEEDBACK\_REQUEST

• **PARENTED\_SEARCH\_FEEDBACK\_REQUEST**: ``"parented-search-feedback"``

The feedback version of [PARENTED_SEARCH_REGISTER_REQUEST](base_remote_protocol.md#parented_search_register_request)

#### Defined in

[base/remote-protocol.ts:584](https://github.com/onzag/itemize/blob/f2f29986/base/remote-protocol.ts#L584)

___

### PARENTED\_SEARCH\_RECORDS\_EVENT

• **PARENTED\_SEARCH\_RECORDS\_EVENT**: ``"parented-search-records"``

When they are parented items the parent type and id, that has been cached
using those

#### Defined in

[base/remote-protocol.ts:143](https://github.com/onzag/itemize/blob/f2f29986/base/remote-protocol.ts#L143)

___

### PARENTED\_SEARCH\_REGISTER\_REQUEST

• **PARENTED\_SEARCH\_REGISTER\_REQUEST**: ``"parented-search-register"``

this is necessary for parented searches in order to run parented by
cached searches and then request for updates

#### Defined in

[base/remote-protocol.ts:347](https://github.com/onzag/itemize/blob/f2f29986/base/remote-protocol.ts#L347)

___

### PARENTED\_SEARCH\_UNREGISTER\_REQUEST

• **PARENTED\_SEARCH\_UNREGISTER\_REQUEST**: ``"parented-search-unregister"``

The unregister version of [PARENTED_SEARCH_REGISTER_REQUEST](base_remote_protocol.md#parented_search_register_request)

#### Defined in

[base/remote-protocol.ts:460](https://github.com/onzag/itemize/blob/f2f29986/base/remote-protocol.ts#L460)

___

### ParentedSearchFeedbackRequestSchema

• **ParentedSearchFeedbackRequestSchema**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `properties` | `Object` |
| `properties.lastModified` | `Object` |
| `properties.lastModified.type` | `string`[] |
| `properties.parentId` | `Object` |
| `properties.parentId.type` | `string` |
| `properties.parentType` | `Object` |
| `properties.parentType.type` | `string` |
| `properties.parentVersion` | `Object` |
| `properties.parentVersion.type` | `string`[] |
| `properties.qualifiedPathName` | `Object` |
| `properties.qualifiedPathName.type` | `string` |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[base/remote-protocol.ts:593](https://github.com/onzag/itemize/blob/f2f29986/base/remote-protocol.ts#L593)

___

### ParentedSearchRegisterRequestSchema

• **ParentedSearchRegisterRequestSchema**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `properties` | `Object` |
| `properties.parentId` | `Object` |
| `properties.parentId.type` | `string` |
| `properties.parentType` | `Object` |
| `properties.parentType.type` | `string` |
| `properties.parentVersion` | `Object` |
| `properties.parentVersion.type` | `string`[] |
| `properties.qualifiedPathName` | `Object` |
| `properties.qualifiedPathName.type` | `string` |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[base/remote-protocol.ts:364](https://github.com/onzag/itemize/blob/f2f29986/base/remote-protocol.ts#L364)

___

### ParentedSearchUnregisterRequestSchema

• **ParentedSearchUnregisterRequestSchema**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `properties` | `Object` |
| `properties.parentId` | `Object` |
| `properties.parentId.type` | `string` |
| `properties.parentType` | `Object` |
| `properties.parentType.type` | `string` |
| `properties.parentVersion` | `Object` |
| `properties.parentVersion.type` | `string`[] |
| `properties.qualifiedPathName` | `Object` |
| `properties.qualifiedPathName.type` | `string` |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[base/remote-protocol.ts:469](https://github.com/onzag/itemize/blob/f2f29986/base/remote-protocol.ts#L469)

___

### REGISTER\_REQUEST

• **REGISTER\_REQUEST**: ``"register"``

The request that is sent to the server in order to register
a single item definition for updates and changes

#### Defined in

[base/remote-protocol.ts:202](https://github.com/onzag/itemize/blob/f2f29986/base/remote-protocol.ts#L202)

___

### RegisterRequestSchema

• **RegisterRequestSchema**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `properties` | `Object` |
| `properties.id` | `Object` |
| `properties.id.type` | `string` |
| `properties.itemDefinition` | `Object` |
| `properties.itemDefinition.type` | `string` |
| `properties.version` | `Object` |
| `properties.version.type` | `string`[] |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[base/remote-protocol.ts:214](https://github.com/onzag/itemize/blob/f2f29986/base/remote-protocol.ts#L214)

___

### UNREGISTER\_REQUEST

• **UNREGISTER\_REQUEST**: ``"unregister"``

Request to unregister and stop getting notifications from
a single item definition

#### Defined in

[base/remote-protocol.ts:238](https://github.com/onzag/itemize/blob/f2f29986/base/remote-protocol.ts#L238)

___

### UnregisterRequestSchema

• **UnregisterRequestSchema**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `properties` | `Object` |
| `properties.id` | `Object` |
| `properties.id.type` | `string` |
| `properties.itemDefinition` | `Object` |
| `properties.itemDefinition.type` | `string` |
| `properties.version` | `Object` |
| `properties.version.type` | `string`[] |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[base/remote-protocol.ts:248](https://github.com/onzag/itemize/blob/f2f29986/base/remote-protocol.ts#L248)

## Functions

### generateBasicMergedIndexIdentifier

▸ **generateBasicMergedIndexIdentifier**(`idefOrMod`, `id`, `version`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `idefOrMod` | `string` |
| `id` | `string` |
| `version` | `string` |

#### Returns

`string`

#### Defined in

[base/remote-protocol.ts:674](https://github.com/onzag/itemize/blob/f2f29986/base/remote-protocol.ts#L674)

___

### generateOwnedParentedSearchMergedIndexIdentifier

▸ **generateOwnedParentedSearchMergedIndexIdentifier**(`idefOrModSearchIsAgainst`, `createdBy`, `parentType`, `parentId`, `parentVersion`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `idefOrModSearchIsAgainst` | `string` |
| `createdBy` | `string` |
| `parentType` | `string` |
| `parentId` | `string` |
| `parentVersion` | `string` |

#### Returns

`string`

#### Defined in

[base/remote-protocol.ts:698](https://github.com/onzag/itemize/blob/f2f29986/base/remote-protocol.ts#L698)

___

### generateOwnedSearchMergedIndexIdentifier

▸ **generateOwnedSearchMergedIndexIdentifier**(`idefOrModSearchIsAgainst`, `createdBy`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `idefOrModSearchIsAgainst` | `string` |
| `createdBy` | `string` |

#### Returns

`string`

#### Defined in

[base/remote-protocol.ts:682](https://github.com/onzag/itemize/blob/f2f29986/base/remote-protocol.ts#L682)

___

### generateParentedSearchMergedIndexIdentifier

▸ **generateParentedSearchMergedIndexIdentifier**(`idefOrModSearchIsAgainst`, `parentType`, `parentId`, `parentVersion`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `idefOrModSearchIsAgainst` | `string` |
| `parentType` | `string` |
| `parentId` | `string` |
| `parentVersion` | `string` |

#### Returns

`string`

#### Defined in

[base/remote-protocol.ts:689](https://github.com/onzag/itemize/blob/f2f29986/base/remote-protocol.ts#L689)
