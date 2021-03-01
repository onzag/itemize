[](../README.md) / [Exports](../modules.md) / setup/exec

# Module: setup/exec

Utility to execute commands in sh, even in sudo mode

## Table of contents

### Functions

- [execAsync](setup_exec.md#execasync)
- [execSudo](setup_exec.md#execsudo)

## Functions

### execAsync

▸ **execAsync**(`code`: *string*): *Promise*<void\>

Simply does an exec

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`code` | *string* | the code we execute   |

**Returns:** *Promise*<void\>

a void promise

Defined in: [setup/exec.ts:14](https://github.com/onzag/itemize/blob/0e9b128c/setup/exec.ts#L14)

___

### execSudo

▸ **execSudo**(`code`: *string*, `name`: *string*, `icns?`: *string*): *Promise*<void\>

Does the same as execAsync but with sudo provileges

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`code` | *string* | the code to execute   |
`name` | *string* | the name we are giving this application   |
`icns?` | *string* |  |

**Returns:** *Promise*<void\>

a void promise

Defined in: [setup/exec.ts:54](https://github.com/onzag/itemize/blob/0e9b128c/setup/exec.ts#L54)
