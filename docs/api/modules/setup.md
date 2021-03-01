[](../README.md) / [Exports](../modules.md) / setup

# Module: setup

This file is in charge of running all the steps for the setup of an itemize app

## Table of contents

### Interfaces

- [ISetupConfigType](../interfaces/setup.isetupconfigtype.md)

### Functions

- [default](setup.md#default)
- [ensureConfigDirectory](setup.md#ensureconfigdirectory)
- [readConfigFile](setup.md#readconfigfile)
- [writeConfigFile](setup.md#writeconfigfile)

## Functions

### default

▸ **default**(...`onlyNames`: *string*[]): *Promise*<void\>

Runs the setup, check out the main.ts function to see
how this is meant to be called

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`...onlyNames` | *string*[] | the names that are supposed to be called    |

**Returns:** *Promise*<void\>

Defined in: [setup/index.ts:102](https://github.com/onzag/itemize/blob/28218320/setup/index.ts#L102)

___

### ensureConfigDirectory

▸ **ensureConfigDirectory**(): *Promise*<void\>

Ensures that the configuration directory exists

**Returns:** *Promise*<void\>

Defined in: [setup/index.ts:146](https://github.com/onzag/itemize/blob/28218320/setup/index.ts#L146)

___

### readConfigFile

▸ **readConfigFile**(`fileName`: *string*): *Promise*<any\>

Reads a config file

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`fileName` | *string* | the filename we are reading   |

**Returns:** *Promise*<any\>

the parsed content, or otherwise null if it doesn't exist

Defined in: [setup/index.ts:179](https://github.com/onzag/itemize/blob/28218320/setup/index.ts#L179)

___

### writeConfigFile

▸ **writeConfigFile**(`fileName`: *string*, `data`: *any*, `original`: *any*): *Promise*<void\>

writes a configuration file only if it differs from what is currently written
according to the last arg

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`fileName` | *string* | the filename we are writting   |
`data` | *any* | the data we are writting   |
`original` | *any* | the original data, to check it against for differences    |

**Returns:** *Promise*<void\>

Defined in: [setup/index.ts:205](https://github.com/onzag/itemize/blob/28218320/setup/index.ts#L205)
