[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/providers/appdata-provider](../modules/client_internal_providers_appdata_provider.md) / IDataContextType

# Interface: IDataContextType

[client/internal/providers/appdata-provider](../modules/client_internal_providers_appdata_provider.md).IDataContextType

This is the data we currently work with
as how the application is defined to be by the
JSON Itemize definition

## Table of contents

### Properties

- [remoteListener](client_internal_providers_appdata_provider.IDataContextType.md#remotelistener)
- [updateIsBlocked](client_internal_providers_appdata_provider.IDataContextType.md#updateisblocked)
- [value](client_internal_providers_appdata_provider.IDataContextType.md#value)

## Properties

### remoteListener

• **remoteListener**: [`RemoteListener`](../classes/client_internal_app_remote_listener.RemoteListener.md)

The remote listener

#### Defined in

[client/internal/providers/appdata-provider.tsx:22](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/providers/appdata-provider.tsx#L22)

___

### updateIsBlocked

• **updateIsBlocked**: `boolean`

whether the app is blocked from an update, happens
when an update is triggered but another older version
is still running

#### Defined in

[client/internal/providers/appdata-provider.tsx:28](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/providers/appdata-provider.tsx#L28)

___

### value

• **value**: [`default`](../classes/base_Root.default.md)

The root itself

#### Defined in

[client/internal/providers/appdata-provider.tsx:18](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/providers/appdata-provider.tsx#L18)
