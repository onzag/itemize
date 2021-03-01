[](../README.md) / [Exports](../modules.md) / dev-environment

# Module: dev-environment

Contains the functionality for executing the development environment based on some config

## Table of contents

### Functions

- [start](dev_environment.md#start)
- [stop](dev_environment.md#stop)

## Functions

### start

▸ **start**(`version`: *string*): *Promise*<void\>

this function is triggered by the main.ts file and passes its argument
its configuration is there, check the main.ts file for modification on how
this function is triggered and what parameters it needs

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`version` | *string* | the version param    |

**Returns:** *Promise*<void\>

Defined in: [dev-environment/index.ts:24](https://github.com/onzag/itemize/blob/28218320/dev-environment/index.ts#L24)

___

### stop

▸ **stop**(`version`: *string*): *Promise*<void\>

This function is what is used to stop the development environment
check the main.ts file to see how this is called

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`version` | *string* | the version to stop for    |

**Returns:** *Promise*<void\>

Defined in: [dev-environment/index.ts:175](https://github.com/onzag/itemize/blob/28218320/dev-environment/index.ts#L175)
