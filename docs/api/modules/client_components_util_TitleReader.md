[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/components/util/TitleReader

# Module: client/components/util/TitleReader

Nice utility function that allows to read the title of the application
that is currently being used in the document title itself

## Table of contents

### Classes

- [ActualTitleReader](../classes/client_components_util_TitleReader.ActualTitleReader.md)

### Functions

- [default](client_components_util_TitleReader.md#default)

## Functions

### default

▸ **default**(): `Element`

Will read the title from the document itself and keep itself
by listening to changes on this title (when they are set by the setter)
mantains sync with the title property

#### Returns

`Element`

#### Defined in

[client/components/util/TitleReader.tsx:59](https://github.com/onzag/itemize/blob/73e0c39e/client/components/util/TitleReader.tsx#L59)
