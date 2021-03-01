[](../README.md) / [Exports](../modules.md) / getdeployable

# Module: getdeployable

Contains the builder that builds the database based on the schema
that is generated during the compiltation process

## Table of contents

### Functions

- [default](getdeployable.md#default)

## Functions

### default

▸ **default**(`version`: *string*, `buildID`: *string*, `services`: *string*): *Promise*<void\>

Runs the build process, check the main.ts file to see how this is done

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`version` | *string* | the version, development or production   |
`buildID` | *string* | the build id, usually the same as the instance group   |
`services` | *string* | the services that we are allowing, comma separated; or full, standard, and slim    |

**Returns:** *Promise*<void\>

Defined in: [getdeployable/index.ts:38](https://github.com/onzag/itemize/blob/28218320/getdeployable/index.ts#L38)
