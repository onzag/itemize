[](../README.md) / [Exports](../modules.md) / [setup/read](../modules/setup_read.md) / IConfigRequestExtractPoint

# Interface: IConfigRequestExtractPoint

[setup/read](../modules/setup_read.md).IConfigRequestExtractPoint

The form that allows to define how we are requesting an entire configuration

## Table of contents

### Properties

- [cantRerun](setup_read.iconfigrequestextractpoint.md#cantrerun)
- [defaultValue](setup_read.iconfigrequestextractpoint.md#defaultvalue)
- [extractData](setup_read.iconfigrequestextractpoint.md#extractdata)
- [hidden](setup_read.iconfigrequestextractpoint.md#hidden)
- [message](setup_read.iconfigrequestextractpoint.md#message)
- [nullifyFalseValues](setup_read.iconfigrequestextractpoint.md#nullifyfalsevalues)
- [preferUnfilled](setup_read.iconfigrequestextractpoint.md#preferunfilled)
- [type](setup_read.iconfigrequestextractpoint.md#type)
- [validate](setup_read.iconfigrequestextractpoint.md#validate)
- [variableName](setup_read.iconfigrequestextractpoint.md#variablename)

## Properties

### cantRerun

• `Optional` **cantRerun**: *boolean*

Prevents modification of already existant values

Defined in: [setup/read.ts:261](https://github.com/onzag/itemize/blob/3efa2a4a/setup/read.ts#L261)

___

### defaultValue

• `Optional` **defaultValue**: *any*

The default value only supported for
standard types and not config or multiconfig

Defined in: [setup/read.ts:235](https://github.com/onzag/itemize/blob/3efa2a4a/setup/read.ts#L235)

___

### extractData

• `Optional` **extractData**: [*IConfigRequestExtractPoint*](setup_read.iconfigrequestextractpoint.md)[]

The data we are extracting for, note that it's an array
as it defines how we extract this data, it defines all the variables
we are defining in this config or multiconfig,
this will not be used in standard field request types as it defines nothing

Defined in: [setup/read.ts:221](https://github.com/onzag/itemize/blob/3efa2a4a/setup/read.ts#L221)

___

### hidden

• `Optional` **hidden**: *boolean*

Whether the value is hidden, only supported
for standard types

Defined in: [setup/read.ts:240](https://github.com/onzag/itemize/blob/3efa2a4a/setup/read.ts#L240)

___

### message

• **message**: *string*

The message we should display for it

Defined in: [setup/read.ts:230](https://github.com/onzag/itemize/blob/3efa2a4a/setup/read.ts#L230)

___

### nullifyFalseValues

• `Optional` **nullifyFalseValues**: *boolean*

Whether to nullify false values, only used
for standard fields

Defined in: [setup/read.ts:252](https://github.com/onzag/itemize/blob/3efa2a4a/setup/read.ts#L252)

___

### preferUnfilled

• `Optional` **preferUnfilled**: *boolean*

prefers to keep a configuration and multi
configuration request into an unfilled state

Defined in: [setup/read.ts:257](https://github.com/onzag/itemize/blob/3efa2a4a/setup/read.ts#L257)

___

### type

• `Optional` **type**: *string* \| *boolean* \| *integer* \| *config* \| *strarray* \| *strobject* \| *multiconfig*

What we are reading, it can be a simple type, a configuration, on a object
of configuration, or a multiconfig, basically has keys for many configuration
if no type specified, it will consider it a string

Defined in: [setup/read.ts:214](https://github.com/onzag/itemize/blob/3efa2a4a/setup/read.ts#L214)

___

### validate

• `Optional` **validate**: (`value`: *any*, `config`: *any*) => *boolean*

A validate function where value is the value
and config is the current config being built under
this where the variable is stored
This is only used for standard values and not config or multiconfig

#### Type declaration:

▸ (`value`: *any*, `config`: *any*): *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | *any* |
`config` | *any* |

**Returns:** *boolean*

Defined in: [setup/read.ts:247](https://github.com/onzag/itemize/blob/3efa2a4a/setup/read.ts#L247)

Defined in: [setup/read.ts:247](https://github.com/onzag/itemize/blob/3efa2a4a/setup/read.ts#L247)

___

### variableName

• **variableName**: *string*

The variable name we are defining for this, since this represents a single
variable in a json structure

Defined in: [setup/read.ts:226](https://github.com/onzag/itemize/blob/3efa2a4a/setup/read.ts#L226)
