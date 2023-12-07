[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/resolvers/triggers](../modules/server_resolvers_triggers.md) / IOConflictTriggerArgType

# Interface: IOConflictTriggerArgType

[server/resolvers/triggers](../modules/server_resolvers_triggers.md).IOConflictTriggerArgType

## Table of contents

### Properties

- [error](server_resolvers_triggers.IOConflictTriggerArgType.md#error)
- [row](server_resolvers_triggers.IOConflictTriggerArgType.md#row)

## Properties

### error

• **error**: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)

Feel free to modify the error this is a modifiable event the prupose
of the trigger is to add data into this error before is sent

#### Defined in

[server/resolvers/triggers.ts:196](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/triggers.ts#L196)

___

### row

• **row**: [`ISQLTableRowValue`](base_Root_sql.ISQLTableRowValue.md)

The row, may be available if it was checked against, some errors
have no row data

#### Defined in

[server/resolvers/triggers.ts:201](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/triggers.ts#L201)
