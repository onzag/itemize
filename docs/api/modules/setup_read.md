[](../README.md) / [Exports](../modules.md) / setup/read

# Module: setup/read

Constains function to read information from the console in order to be used
during the setup process

## Table of contents

### Interfaces

- [IConfigRequestExtractPoint](../interfaces/setup_read.iconfigrequestextractpoint.md)

### Functions

- [configRequest](setup_read.md#configrequest)
- [confirm](setup_read.md#confirm)
- [fieldRequest](setup_read.md#fieldrequest)
- [request](setup_read.md#request)
- [yesno](setup_read.md#yesno)

## Functions

### configRequest

▸ **configRequest**<T\>(`srcConfig`: T, `message`: *string*, `extractData`: [*IConfigRequestExtractPoint*](../interfaces/setup_read.iconfigrequestextractpoint.md)[], `variableNamePrefix?`: *string*): *Promise*<T\>

Performs a config request for entry an entire config

#### Type parameters:

Name |
:------ |
`T` |

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`srcConfig` | T | - | the source configuration   |
`message` | *string* | - | the message to show   |
`extractData` | [*IConfigRequestExtractPoint*](../interfaces/setup_read.iconfigrequestextractpoint.md)[] | - | the ata to extract   |
`variableNamePrefix` | *string* | "" | a prefix to prefix all variable names    |

**Returns:** *Promise*<T\>

Defined in: [setup/read.ts:271](https://github.com/onzag/itemize/blob/0e9b128c/setup/read.ts#L271)

___

### confirm

▸ **confirm**(`question`: *string*): *Promise*<boolean\>

Ask for confirmation given a message

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`question` | *string* | the question to ask   |

**Returns:** *Promise*<boolean\>

a promise for a boolean

Defined in: [setup/read.ts:403](https://github.com/onzag/itemize/blob/0e9b128c/setup/read.ts#L403)

___

### fieldRequest

▸ **fieldRequest**<T\>(`type`: FieldRequestType, `message`: *string*, `variableName`: *string*, `basedOnValue`: T, `defaultValue`: T, `hidden?`: *boolean*, `validate?`: (`value`: T) => *boolean*, `nullifyFalseValues?`: *boolean*): *Promise*<T\>

This function allows us to request one of the field types

#### Type parameters:

Name |
:------ |
`T` |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`type` | FieldRequestType | the type we are requesting   |
`message` | *string* | the message we want to show   |
`variableName` | *string* | the variable name we are setting   |
`basedOnValue` | T | basically a previously assigned value we want to modify for this   |
`defaultValue` | T | the default value for this   |
`hidden?` | *boolean* | whether we shouldn't display the characters for it to avoid logs   |
`validate?` | (`value`: T) => *boolean* | a function to validate the value   |
`nullifyFalseValues?` | *boolean* | whether we should make values that don't pass the if (value) check, null, basically empty string and 0   |

**Returns:** *Promise*<T\>

the value it was read

Defined in: [setup/read.ts:65](https://github.com/onzag/itemize/blob/0e9b128c/setup/read.ts#L65)

___

### request

▸ **request**(`options`: read.Options): *Promise*<{ `isDefault`: *boolean* ; `result`: *string*  }\>

requests a single value

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`options` | read.Options | the read options    |

**Returns:** *Promise*<{ `isDefault`: *boolean* ; `result`: *string*  }\>

Defined in: [setup/read.ts:26](https://github.com/onzag/itemize/blob/0e9b128c/setup/read.ts#L26)

___

### yesno

▸ **yesno**(`question`: *string*): *any*

Simple function to ask for a question

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`question` | *string* | the question to ask   |

**Returns:** *any*

a boolean on the answer

Defined in: [setup/read.ts:18](https://github.com/onzag/itemize/blob/0e9b128c/setup/read.ts#L18)
