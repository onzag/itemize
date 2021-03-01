[](../README.md) / [Exports](../modules.md) / client/components/outdated/AppIsBlockedFromUpdate

# Module: client/components/outdated/AppIsBlockedFromUpdate

Contains the component that checks if the app is blocked from update

## Table of contents

### Functions

- [AppIsBlockedFromUpdate](client_components_outdated_appisblockedfromupdate.md#appisblockedfromupdate)

## Functions

### AppIsBlockedFromUpdate

▸ **AppIsBlockedFromUpdate**(`props`: IAppIsBlockedFromUpdateProps): *Element*

Specifies if the app is blocked from update, this happens in the following scenario
User has opened 2 tabs, and one tab informs that there's a new version of the app the user then interacts and updates the app
when this app reloads it comes with its fresh new version with a new buildnumber, and as such, the initialization
will find out this mismatch and as such will attempt to clear up the old database with the old information as it might
not really be valid anymore, but an issue arises with that, that the second tab is opened with a worker that has hold
of that previous database that is attempted to be deleted

As such the App is blocked from update, while this sounds like a rare case, it happens more often than is
imagined as users really like to open many tabs

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`props` | IAppIsBlockedFromUpdateProps | the props   |

**Returns:** *Element*

a react component

Defined in: [client/components/outdated/AppIsBlockedFromUpdate.tsx:48](https://github.com/onzag/itemize/blob/55e63f2c/client/components/outdated/AppIsBlockedFromUpdate.tsx#L48)
