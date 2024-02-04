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
- [IPropertySearchFeedbackRequest](../interfaces/base_remote_protocol.IPropertySearchFeedbackRequest.md)
- [IPropertySearchRecordsEvent](../interfaces/base_remote_protocol.IPropertySearchRecordsEvent.md)
- [IPropertySearchRegisterRequest](../interfaces/base_remote_protocol.IPropertySearchRegisterRequest.md)
- [IPropertySearchUnregisterRequest](../interfaces/base_remote_protocol.IPropertySearchUnregisterRequest.md)
- [IRedisEvent](../interfaces/base_remote_protocol.IRedisEvent.md)
- [IRegisterRequest](../interfaces/base_remote_protocol.IRegisterRequest.md)
- [IUnregisterRequest](../interfaces/base_remote_protocol.IUnregisterRequest.md)

### Variables

- [BUILDNUMBER\_EVENT](base_remote_protocol.md#buildnumber_event)
- [CHANGED\_FEEDBACK\_EVENT](base_remote_protocol.md#changed_feedback_event)
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
- [PROPERTY\_SEARCH\_FEEDBACK\_REQUEST](base_remote_protocol.md#property_search_feedback_request)
- [PROPERTY\_SEARCH\_RECORDS\_EVENT](base_remote_protocol.md#property_search_records_event)
- [PROPERTY\_SEARCH\_REGISTER\_REQUEST](base_remote_protocol.md#property_search_register_request)
- [PROPERTY\_SEARCH\_UNREGISTER\_REQUEST](base_remote_protocol.md#property_search_unregister_request)
- [ParentedSearchFeedbackRequestSchema](base_remote_protocol.md#parentedsearchfeedbackrequestschema)
- [ParentedSearchRegisterRequestSchema](base_remote_protocol.md#parentedsearchregisterrequestschema)
- [ParentedSearchUnregisterRequestSchema](base_remote_protocol.md#parentedsearchunregisterrequestschema)
- [PropertySearchFeedbackRequestSchema](base_remote_protocol.md#propertysearchfeedbackrequestschema)
- [PropertySearchRegisterRequestSchema](base_remote_protocol.md#propertysearchregisterrequestschema)
- [PropertySearchUnregisterRequestSchema](base_remote_protocol.md#propertysearchunregisterrequestschema)
- [REGISTER\_REQUEST](base_remote_protocol.md#register_request)
- [RegisterRequestSchema](base_remote_protocol.md#registerrequestschema)
- [UNREGISTER\_REQUEST](base_remote_protocol.md#unregister_request)
- [UnregisterRequestSchema](base_remote_protocol.md#unregisterrequestschema)

### Functions

- [generateBasicMergedIndexIdentifier](base_remote_protocol.md#generatebasicmergedindexidentifier)
- [generateOwnedParentedSearchMergedIndexIdentifier](base_remote_protocol.md#generateownedparentedsearchmergedindexidentifier)
- [generateOwnedSearchMergedIndexIdentifier](base_remote_protocol.md#generateownedsearchmergedindexidentifier)
- [generateParentedSearchMergedIndexIdentifier](base_remote_protocol.md#generateparentedsearchmergedindexidentifier)
- [generatePropertySearchMergedIndexIdentifier](base_remote_protocol.md#generatepropertysearchmergedindexidentifier)

## Variables

### BUILDNUMBER\_EVENT

• `Const` **BUILDNUMBER\_EVENT**: ``"buildnumber"``

The build number event is an event streamed from the
server to the client once this client has connected

#### Defined in

[base/remote-protocol.ts:19](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L19)

___

### CHANGED\_FEEDBACK\_EVENT

• `Const` **CHANGED\_FEEDBACK\_EVENT**: ``"changed"``

Event that comes from the server when something has
changed or as an answer from a feedback request

#### Defined in

[base/remote-protocol.ts:67](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L67)

___

### CURRENCY\_FACTORS\_UPDATED\_EVENT

• `Const` **CURRENCY\_FACTORS\_UPDATED\_EVENT**: ``"currency-factors-updated"``

This event occurs when the currency factors have been changed and it streams to
every socket that just happens to be connected, not just identified but just
connected into it, while the data could be attached, we really want to perform
the request to the server in order to ensure that it is cached

#### Defined in

[base/remote-protocol.ts:34](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L34)

___

### ERROR\_EVENT

• `Const` **ERROR\_EVENT**: ``"listener-error"``

This is streamed to the client once the server hits an error
that was somehow caused by the client, there's no much use
for an error event other than notice invalid requests

#### Defined in

[base/remote-protocol.ts:41](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L41)

___

### FEEDBACK\_REQUEST

• `Const` **FEEDBACK\_REQUEST**: ``"feedback"``

a request that is sent to the server in order to
request feedback for a single item definition

#### Defined in

[base/remote-protocol.ts:288](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L288)

___

### FeedbackRequestSchema

• `Const` **FeedbackRequestSchema**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `properties` | \{ `id`: \{ `type`: `string` = "string" } ; `itemDefinition`: \{ `type`: `string` = "string" } ; `version`: \{ `type`: `string`[]  }  } |
| `properties.id` | \{ `type`: `string` = "string" } |
| `properties.id.type` | `string` |
| `properties.itemDefinition` | \{ `type`: `string` = "string" } |
| `properties.itemDefinition.type` | `string` |
| `properties.version` | \{ `type`: `string`[]  } |
| `properties.version.type` | `string`[] |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[base/remote-protocol.ts:299](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L299)

___

### IDENTIFIED\_EVENT

• `Const` **IDENTIFIED\_EVENT**: ``"identified"``

Identified event comes once the user has been identified properly

#### Defined in

[base/remote-protocol.ts:54](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L54)

___

### IDENTIFY\_REQUEST

• `Const` **IDENTIFY\_REQUEST**: ``"identify"``

The identify request comes when a socket first connects and identifies
itself (this must be the first request, or otherwise other requests will
be ignored)

#### Defined in

[base/remote-protocol.ts:189](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L189)

___

### IdentifyRequestSchema

• `Const` **IdentifyRequestSchema**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `properties` | \{ `token`: \{ `type`: `string`[]  } ; `uuid`: \{ `type`: `string` = "string" }  } |
| `properties.token` | \{ `type`: `string`[]  } |
| `properties.token.type` | `string`[] |
| `properties.uuid` | \{ `type`: `string` = "string" } |
| `properties.uuid.type` | `string` |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[base/remote-protocol.ts:198](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L198)

___

### KICKED\_EVENT

• `Const` **KICKED\_EVENT**: ``"kicked"``

Event that occurs when the user has been kicked, when log out
from all devices has been triggered, users are kicked out and forcefully
logged out, this even also occurs on an invalid identified event

#### Defined in

[base/remote-protocol.ts:61](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L61)

___

### OWNED\_PARENTED\_SEARCH\_FEEDBACK\_REQUEST

• `Const` **OWNED\_PARENTED\_SEARCH\_FEEDBACK\_REQUEST**: ``"owned-parented-search-feedback"``

The feedback version of [[PARENTED_SEARCH_REGISTER_REQUEST]]

#### Defined in

[base/remote-protocol.ts:741](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L741)

___

### OWNED\_PARENTED\_SEARCH\_RECORDS\_EVENT

• `Const` **OWNED\_PARENTED\_SEARCH\_RECORDS\_EVENT**: ``"owned-parented-search-records"``

When they are owned parented items the parent type and id, that has been cached
using those

#### Defined in

[base/remote-protocol.ts:160](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L160)

___

### OWNED\_PARENTED\_SEARCH\_REGISTER\_REQUEST

• `Const` **OWNED\_PARENTED\_SEARCH\_REGISTER\_REQUEST**: ``"owned-parented-search-register"``

this is necessary for parented searches in order to run parented by
cached searches and then request for updates

#### Defined in

[base/remote-protocol.ts:369](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L369)

___

### OWNED\_PARENTED\_SEARCH\_UNREGISTER\_REQUEST

• `Const` **OWNED\_PARENTED\_SEARCH\_UNREGISTER\_REQUEST**: ``"owned-parented-search-unregister"``

The unregister version of [[OWNED_PARENTED_SEARCH_REGISTER_REQUEST]]

#### Defined in

[base/remote-protocol.ts:577](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L577)

___

### OWNED\_SEARCH\_FEEDBACK\_REQUEST

• `Const` **OWNED\_SEARCH\_FEEDBACK\_REQUEST**: ``"owned-search-feedback"``

The feedback version of [[PARENTED_SEARCH_REGISTER_REQUEST]]

#### Defined in

[base/remote-protocol.ts:634](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L634)

___

### OWNED\_SEARCH\_RECORDS\_EVENT

• `Const` **OWNED\_SEARCH\_RECORDS\_EVENT**: ``"owned-search-records"``

When they are owned items, as a search has been cached using a creator
as a base

#### Defined in

[base/remote-protocol.ts:132](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L132)

___

### OWNED\_SEARCH\_REGISTER\_REQUEST

• `Const` **OWNED\_SEARCH\_REGISTER\_REQUEST**: ``"owned-search-register"``

this is necessary for owned searches in order to run created by
cached searches and then request for updates

#### Defined in

[base/remote-protocol.ts:334](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L334)

___

### OWNED\_SEARCH\_UNREGISTER\_REQUEST

• `Const` **OWNED\_SEARCH\_UNREGISTER\_REQUEST**: ``"owned-search-unregister"``

The unregister version of [[OWNED_SEARCH_REGISTER_REQUEST]]

#### Defined in

[base/remote-protocol.ts:484](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L484)

___

### OwnedParentedSearchFeedbackRequestSchema

• `Const` **OwnedParentedSearchFeedbackRequestSchema**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `properties` | \{ `createdBy`: \{ `type`: `string` = "string" } ; `lastModified`: \{ `type`: `string`[]  } ; `parentId`: \{ `type`: `string` = "string" } ; `parentType`: \{ `type`: `string` = "string" } ; `parentVersion`: \{ `type`: `string`[]  } ; `qualifiedPathName`: \{ `type`: `string` = "string" }  } |
| `properties.createdBy` | \{ `type`: `string` = "string" } |
| `properties.createdBy.type` | `string` |
| `properties.lastModified` | \{ `type`: `string`[]  } |
| `properties.lastModified.type` | `string`[] |
| `properties.parentId` | \{ `type`: `string` = "string" } |
| `properties.parentId.type` | `string` |
| `properties.parentType` | \{ `type`: `string` = "string" } |
| `properties.parentType.type` | `string` |
| `properties.parentVersion` | \{ `type`: `string`[]  } |
| `properties.parentVersion.type` | `string`[] |
| `properties.qualifiedPathName` | \{ `type`: `string` = "string" } |
| `properties.qualifiedPathName.type` | `string` |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[base/remote-protocol.ts:748](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L748)

___

### OwnedParentedSearchRegisterRequestSchema

• `Const` **OwnedParentedSearchRegisterRequestSchema**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `properties` | \{ `createdBy`: \{ `type`: `string` = "string" } ; `parentId`: \{ `type`: `string` = "string" } ; `parentType`: \{ `type`: `string` = "string" } ; `parentVersion`: \{ `type`: `string`[]  } ; `qualifiedPathName`: \{ `type`: `string` = "string" }  } |
| `properties.createdBy` | \{ `type`: `string` = "string" } |
| `properties.createdBy.type` | `string` |
| `properties.parentId` | \{ `type`: `string` = "string" } |
| `properties.parentId.type` | `string` |
| `properties.parentType` | \{ `type`: `string` = "string" } |
| `properties.parentType.type` | `string` |
| `properties.parentVersion` | \{ `type`: `string`[]  } |
| `properties.parentVersion.type` | `string`[] |
| `properties.qualifiedPathName` | \{ `type`: `string` = "string" } |
| `properties.qualifiedPathName.type` | `string` |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[base/remote-protocol.ts:410](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L410)

___

### OwnedParentedSearchUnregisterRequestSchema

• `Const` **OwnedParentedSearchUnregisterRequestSchema**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `properties` | \{ `createdBy`: \{ `type`: `string` = "string" } ; `parentId`: \{ `type`: `string` = "string" } ; `parentType`: \{ `type`: `string` = "string" } ; `parentVersion`: \{ `type`: `string`[]  } ; `qualifiedPathName`: \{ `type`: `string` = "string" }  } |
| `properties.createdBy` | \{ `type`: `string` = "string" } |
| `properties.createdBy.type` | `string` |
| `properties.parentId` | \{ `type`: `string` = "string" } |
| `properties.parentId.type` | `string` |
| `properties.parentType` | \{ `type`: `string` = "string" } |
| `properties.parentType.type` | `string` |
| `properties.parentVersion` | \{ `type`: `string`[]  } |
| `properties.parentVersion.type` | `string`[] |
| `properties.qualifiedPathName` | \{ `type`: `string` = "string" } |
| `properties.qualifiedPathName.type` | `string` |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[base/remote-protocol.ts:584](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L584)

___

### OwnedSearchFeedbackRequestSchema

• `Const` **OwnedSearchFeedbackRequestSchema**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `properties` | \{ `createdBy`: \{ `type`: `string` = "string" } ; `lastModified`: \{ `type`: `string`[]  } ; `qualifiedPathName`: \{ `type`: `string` = "string" }  } |
| `properties.createdBy` | \{ `type`: `string` = "string" } |
| `properties.createdBy.type` | `string` |
| `properties.lastModified` | \{ `type`: `string`[]  } |
| `properties.lastModified.type` | `string`[] |
| `properties.qualifiedPathName` | \{ `type`: `string` = "string" } |
| `properties.qualifiedPathName.type` | `string` |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[base/remote-protocol.ts:642](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L642)

___

### OwnedSearchRegisterRequestSchema

• `Const` **OwnedSearchRegisterRequestSchema**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `properties` | \{ `createdBy`: \{ `type`: `string` = "string" } ; `qualifiedPathName`: \{ `type`: `string` = "string" }  } |
| `properties.createdBy` | \{ `type`: `string` = "string" } |
| `properties.createdBy.type` | `string` |
| `properties.qualifiedPathName` | \{ `type`: `string` = "string" } |
| `properties.qualifiedPathName.type` | `string` |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[base/remote-protocol.ts:343](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L343)

___

### OwnedSearchUnregisterRequestSchema

• `Const` **OwnedSearchUnregisterRequestSchema**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `properties` | \{ `createdBy`: \{ `type`: `string` = "string" } ; `qualifiedPathName`: \{ `type`: `string` = "string" }  } |
| `properties.createdBy` | \{ `type`: `string` = "string" } |
| `properties.createdBy.type` | `string` |
| `properties.qualifiedPathName` | \{ `type`: `string` = "string" } |
| `properties.qualifiedPathName.type` | `string` |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[base/remote-protocol.ts:491](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L491)

___

### PARENTED\_SEARCH\_FEEDBACK\_REQUEST

• `Const` **PARENTED\_SEARCH\_FEEDBACK\_REQUEST**: ``"parented-search-feedback"``

The feedback version of [[PARENTED_SEARCH_REGISTER_REQUEST]]

#### Defined in

[base/remote-protocol.ts:701](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L701)

___

### PARENTED\_SEARCH\_RECORDS\_EVENT

• `Const` **PARENTED\_SEARCH\_RECORDS\_EVENT**: ``"parented-search-records"``

When they are parented items the parent type and id, that has been cached
using those

#### Defined in

[base/remote-protocol.ts:145](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L145)

___

### PARENTED\_SEARCH\_REGISTER\_REQUEST

• `Const` **PARENTED\_SEARCH\_REGISTER\_REQUEST**: ``"parented-search-register"``

this is necessary for parented searches in order to run parented by
cached searches and then request for updates

#### Defined in

[base/remote-protocol.ts:363](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L363)

___

### PARENTED\_SEARCH\_UNREGISTER\_REQUEST

• `Const` **PARENTED\_SEARCH\_UNREGISTER\_REQUEST**: ``"parented-search-unregister"``

The unregister version of [[PARENTED_SEARCH_REGISTER_REQUEST]]

#### Defined in

[base/remote-protocol.ts:541](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L541)

___

### PROPERTY\_SEARCH\_FEEDBACK\_REQUEST

• `Const` **PROPERTY\_SEARCH\_FEEDBACK\_REQUEST**: ``"property-search-feedback"``

The feedback version of [[PARENTED_SEARCH_REGISTER_REQUEST]]

#### Defined in

[base/remote-protocol.ts:665](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L665)

___

### PROPERTY\_SEARCH\_RECORDS\_EVENT

• `Const` **PROPERTY\_SEARCH\_RECORDS\_EVENT**: ``"property-search-records"``

When the records are related to the value of a property

#### Defined in

[base/remote-protocol.ts:171](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L171)

___

### PROPERTY\_SEARCH\_REGISTER\_REQUEST

• `Const` **PROPERTY\_SEARCH\_REGISTER\_REQUEST**: ``"property-search-register"``

this is necessary for property searches in order to run created by
cached searches and then request for updates

#### Defined in

[base/remote-protocol.ts:442](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L442)

___

### PROPERTY\_SEARCH\_UNREGISTER\_REQUEST

• `Const` **PROPERTY\_SEARCH\_UNREGISTER\_REQUEST**: ``"property-search-unregister"``

The unregister version of [[PROPERTY_SEARCH_REGISTER_REQUEST]]

#### Defined in

[base/remote-protocol.ts:510](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L510)

___

### ParentedSearchFeedbackRequestSchema

• `Const` **ParentedSearchFeedbackRequestSchema**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `properties` | \{ `lastModified`: \{ `type`: `string`[]  } ; `parentId`: \{ `type`: `string` = "string" } ; `parentType`: \{ `type`: `string` = "string" } ; `parentVersion`: \{ `type`: `string`[]  } ; `qualifiedPathName`: \{ `type`: `string` = "string" }  } |
| `properties.lastModified` | \{ `type`: `string`[]  } |
| `properties.lastModified.type` | `string`[] |
| `properties.parentId` | \{ `type`: `string` = "string" } |
| `properties.parentId.type` | `string` |
| `properties.parentType` | \{ `type`: `string` = "string" } |
| `properties.parentType.type` | `string` |
| `properties.parentVersion` | \{ `type`: `string`[]  } |
| `properties.parentVersion.type` | `string`[] |
| `properties.qualifiedPathName` | \{ `type`: `string` = "string" } |
| `properties.qualifiedPathName.type` | `string` |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[base/remote-protocol.ts:710](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L710)

___

### ParentedSearchRegisterRequestSchema

• `Const` **ParentedSearchRegisterRequestSchema**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `properties` | \{ `parentId`: \{ `type`: `string` = "string" } ; `parentType`: \{ `type`: `string` = "string" } ; `parentVersion`: \{ `type`: `string`[]  } ; `qualifiedPathName`: \{ `type`: `string` = "string" }  } |
| `properties.parentId` | \{ `type`: `string` = "string" } |
| `properties.parentId.type` | `string` |
| `properties.parentType` | \{ `type`: `string` = "string" } |
| `properties.parentType.type` | `string` |
| `properties.parentVersion` | \{ `type`: `string`[]  } |
| `properties.parentVersion.type` | `string`[] |
| `properties.qualifiedPathName` | \{ `type`: `string` = "string" } |
| `properties.qualifiedPathName.type` | `string` |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[base/remote-protocol.ts:380](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L380)

___

### ParentedSearchUnregisterRequestSchema

• `Const` **ParentedSearchUnregisterRequestSchema**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `properties` | \{ `parentId`: \{ `type`: `string` = "string" } ; `parentType`: \{ `type`: `string` = "string" } ; `parentVersion`: \{ `type`: `string`[]  } ; `qualifiedPathName`: \{ `type`: `string` = "string" }  } |
| `properties.parentId` | \{ `type`: `string` = "string" } |
| `properties.parentId.type` | `string` |
| `properties.parentType` | \{ `type`: `string` = "string" } |
| `properties.parentType.type` | `string` |
| `properties.parentVersion` | \{ `type`: `string`[]  } |
| `properties.parentVersion.type` | `string`[] |
| `properties.qualifiedPathName` | \{ `type`: `string` = "string" } |
| `properties.qualifiedPathName.type` | `string` |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[base/remote-protocol.ts:550](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L550)

___

### PropertySearchFeedbackRequestSchema

• `Const` **PropertySearchFeedbackRequestSchema**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `properties` | \{ `lastModified`: \{ `type`: `string`[]  } ; `propertyId`: \{ `type`: `string` = "string" } ; `propertyValue`: \{ `type`: `string` = "string" } ; `qualifiedPathName`: \{ `type`: `string` = "string" }  } |
| `properties.lastModified` | \{ `type`: `string`[]  } |
| `properties.lastModified.type` | `string`[] |
| `properties.propertyId` | \{ `type`: `string` = "string" } |
| `properties.propertyId.type` | `string` |
| `properties.propertyValue` | \{ `type`: `string` = "string" } |
| `properties.propertyValue.type` | `string` |
| `properties.qualifiedPathName` | \{ `type`: `string` = "string" } |
| `properties.qualifiedPathName.type` | `string` |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[base/remote-protocol.ts:674](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L674)

___

### PropertySearchRegisterRequestSchema

• `Const` **PropertySearchRegisterRequestSchema**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `properties` | \{ `propertyId`: \{ `type`: `string` = "string" } ; `propertyValue`: \{ `type`: `string` = "string" } ; `qualifiedPathName`: \{ `type`: `string` = "string" }  } |
| `properties.propertyId` | \{ `type`: `string` = "string" } |
| `properties.propertyId.type` | `string` |
| `properties.propertyValue` | \{ `type`: `string` = "string" } |
| `properties.propertyValue.type` | `string` |
| `properties.qualifiedPathName` | \{ `type`: `string` = "string" } |
| `properties.qualifiedPathName.type` | `string` |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[base/remote-protocol.ts:452](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L452)

___

### PropertySearchUnregisterRequestSchema

• `Const` **PropertySearchUnregisterRequestSchema**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `properties` | \{ `propertyId`: \{ `type`: `string` = "string" } ; `propertyValue`: \{ `type`: `string` = "string" } ; `qualifiedPathName`: \{ `type`: `string` = "string" }  } |
| `properties.propertyId` | \{ `type`: `string` = "string" } |
| `properties.propertyId.type` | `string` |
| `properties.propertyValue` | \{ `type`: `string` = "string" } |
| `properties.propertyValue.type` | `string` |
| `properties.qualifiedPathName` | \{ `type`: `string` = "string" } |
| `properties.qualifiedPathName.type` | `string` |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[base/remote-protocol.ts:518](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L518)

___

### REGISTER\_REQUEST

• `Const` **REGISTER\_REQUEST**: ``"register"``

The request that is sent to the server in order to register
a single item definition for updates and changes

#### Defined in

[base/remote-protocol.ts:218](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L218)

___

### RegisterRequestSchema

• `Const` **RegisterRequestSchema**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `properties` | \{ `id`: \{ `type`: `string` = "string" } ; `itemDefinition`: \{ `type`: `string` = "string" } ; `version`: \{ `type`: `string`[]  }  } |
| `properties.id` | \{ `type`: `string` = "string" } |
| `properties.id.type` | `string` |
| `properties.itemDefinition` | \{ `type`: `string` = "string" } |
| `properties.itemDefinition.type` | `string` |
| `properties.version` | \{ `type`: `string`[]  } |
| `properties.version.type` | `string`[] |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[base/remote-protocol.ts:230](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L230)

___

### UNREGISTER\_REQUEST

• `Const` **UNREGISTER\_REQUEST**: ``"unregister"``

Request to unregister and stop getting notifications from
a single item definition

#### Defined in

[base/remote-protocol.ts:254](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L254)

___

### UnregisterRequestSchema

• `Const` **UnregisterRequestSchema**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `properties` | \{ `id`: \{ `type`: `string` = "string" } ; `itemDefinition`: \{ `type`: `string` = "string" } ; `version`: \{ `type`: `string`[]  }  } |
| `properties.id` | \{ `type`: `string` = "string" } |
| `properties.id.type` | `string` |
| `properties.itemDefinition` | \{ `type`: `string` = "string" } |
| `properties.itemDefinition.type` | `string` |
| `properties.version` | \{ `type`: `string`[]  } |
| `properties.version.type` | `string`[] |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[base/remote-protocol.ts:264](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L264)

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

[base/remote-protocol.ts:791](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L791)

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

[base/remote-protocol.ts:823](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L823)

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

[base/remote-protocol.ts:799](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L799)

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

[base/remote-protocol.ts:814](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L814)

___

### generatePropertySearchMergedIndexIdentifier

▸ **generatePropertySearchMergedIndexIdentifier**(`idefOrModSearchIsAgainst`, `propertyId`, `propertyValue`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `idefOrModSearchIsAgainst` | `string` |
| `propertyId` | `string` |
| `propertyValue` | `string` |

#### Returns

`string`

#### Defined in

[base/remote-protocol.ts:806](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L806)
