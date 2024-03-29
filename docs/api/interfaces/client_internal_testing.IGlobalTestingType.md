[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/testing](../modules/client_internal_testing.md) / IGlobalTestingType

# Interface: IGlobalTestingType

[client/internal/testing](../modules/client_internal_testing.md).IGlobalTestingType

## Table of contents

### Properties

- [mountedItems](client_internal_testing.IGlobalTestingType.md#mounteditems)
- [mountedModules](client_internal_testing.IGlobalTestingType.md#mountedmodules)
- [socket](client_internal_testing.IGlobalTestingType.md#socket)

## Properties

### mountedItems

• **mountedItems**: [`IMountedItem`](client_internal_testing.IMountedItem.md)[]

#### Defined in

[client/internal/testing.ts:115](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/testing.ts#L115)

___

### mountedModules

• **mountedModules**: [`IMountedModule`](client_internal_testing.IMountedModule.md)[]

#### Defined in

[client/internal/testing.ts:116](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/testing.ts#L116)

___

### socket

• **socket**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `changedFeedbackEvents` | [`IChangedFeedbackEventWithTime`](client_internal_testing.IChangedFeedbackEventWithTime.md)[] |
| `errors` | [`IErrorEventWithTime`](client_internal_testing.IErrorEventWithTime.md)[] |
| `feedbackRequests` | [`IFeedbackRequestWithTime`](client_internal_testing.IFeedbackRequestWithTime.md)[] |
| `identifiedEvents` | [`IIdentifiedEventWithTime`](client_internal_testing.IIdentifiedEventWithTime.md)[] |
| `identifyRequests` | [`IIdentifyRequestWithTime`](client_internal_testing.IIdentifyRequestWithTime.md)[] |
| `ownedSearchFeedbackRequests` | [`IOwnedSearchFeedbackRequestWithTime`](client_internal_testing.IOwnedSearchFeedbackRequestWithTime.md)[] |
| `ownedSearchRecordsAddedEvents` | [`IOwnedSearchRecordsAddedEventWithTime`](client_internal_testing.IOwnedSearchRecordsAddedEventWithTime.md)[] |
| `ownedSearchRegisterRequests` | [`IOwnedSearchRegisterRequestWithTime`](client_internal_testing.IOwnedSearchRegisterRequestWithTime.md)[] |
| `ownedSearchUnregisterRequests` | [`IOwnedSearchUnregisterRequestWithTime`](client_internal_testing.IOwnedSearchUnregisterRequestWithTime.md)[] |
| `parentedSearchFeebackRequests` | [`IParentedSearchFeedbackRequestWithTime`](client_internal_testing.IParentedSearchFeedbackRequestWithTime.md)[] |
| `parentedSearchRecordsAddedEvents` | [`IParentedSearchRecordsAddedEventWithTime`](client_internal_testing.IParentedSearchRecordsAddedEventWithTime.md)[] |
| `parentedSearchRegisterRequests` | [`IParentedSearchRegisterRequestWithTime`](client_internal_testing.IParentedSearchRegisterRequestWithTime.md)[] |
| `parentedSearchUnregisterRequests` | [`IParentedSearchUnregisterRequestWithTime`](client_internal_testing.IParentedSearchUnregisterRequestWithTime.md)[] |
| `registerRequests` | [`IRegisterRequestWithTime`](client_internal_testing.IRegisterRequestWithTime.md)[] |
| `unregisterRequests` | [`IUnregisterRequestWithTime`](client_internal_testing.IUnregisterRequestWithTime.md)[] |

#### Defined in

[client/internal/testing.ts:117](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/testing.ts#L117)
