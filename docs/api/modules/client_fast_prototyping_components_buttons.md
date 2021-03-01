[](../README.md) / [Exports](../modules.md) / client/fast-prototyping/components/buttons

# Module: client/fast-prototyping/components/buttons

Contains the submit, search and delete button for fast prototyping
usage

## Table of contents

### Functions

- [DeleteButton](client_fast_prototyping_components_buttons.md#deletebutton)
- [SearchButton](client_fast_prototyping_components_buttons.md#searchbutton)
- [SubmitButton](client_fast_prototyping_components_buttons.md#submitbutton)

## Functions

### DeleteButton

▸ **DeleteButton**(`props`: IDeleteButtonProps): *Element*

#### Parameters:

Name | Type |
:------ | :------ |
`props` | IDeleteButtonProps |

**Returns:** *Element*

Defined in: [client/fast-prototyping/components/buttons.tsx:261](https://github.com/onzag/itemize/blob/0569bdf2/client/fast-prototyping/components/buttons.tsx#L261)

___

### SearchButton

▸ **SearchButton**(`props`: ISearchButtonProps): *Element*

Allows to create a fast prototyping button that will trigger a search
once clicked, uses the search actioner and must be in an item definition context
in search mode

If you need to access the error please use the snackbar.tsx component
in addition of another search actioner to fetch the error itself

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`props` | ISearchButtonProps | the search button props   |

**Returns:** *Element*

a react component

Defined in: [client/fast-prototyping/components/buttons.tsx:195](https://github.com/onzag/itemize/blob/0569bdf2/client/fast-prototyping/components/buttons.tsx#L195)

___

### SubmitButton

▸ **SubmitButton**(`props`: ISubmitButtonProps): *Element*

Provides a very useful submit button that extends via the submit
actioner and it's fully functional; needs to be in an item
definition context

If you need to access the error please use the snackbar.tsx component
in addition of another submit actioner to fetch the error itself

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`props` | ISubmitButtonProps | the submit button props   |

**Returns:** *Element*

a react component

Defined in: [client/fast-prototyping/components/buttons.tsx:107](https://github.com/onzag/itemize/blob/0569bdf2/client/fast-prototyping/components/buttons.tsx#L107)
