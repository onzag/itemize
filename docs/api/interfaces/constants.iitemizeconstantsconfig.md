[](../README.md) / [Exports](../modules.md) / [constants](../modules/constants.md) / IItemizeConstantsConfig

# Interface: IItemizeConstantsConfig

[constants](../modules/constants.md).IItemizeConstantsConfig

## Table of contents

### Properties

- [FILE\_SUPPORTED\_IMAGE\_TYPES](constants.iitemizeconstantsconfig.md#file_supported_image_types)
- [MAX\_FIELD\_SIZE](constants.iitemizeconstantsconfig.md#max_field_size)
- [MAX\_FILES\_PER\_PROPERTY](constants.iitemizeconstantsconfig.md#max_files_per_property)
- [MAX\_FILES\_PER\_REQUEST](constants.iitemizeconstantsconfig.md#max_files_per_request)
- [MAX\_FILE\_SIZE](constants.iitemizeconstantsconfig.md#max_file_size)
- [MAX\_RAW\_TEXT\_LENGTH](constants.iitemizeconstantsconfig.md#max_raw_text_length)
- [MAX\_REMOTE\_LISTENERS\_PER\_SOCKET](constants.iitemizeconstantsconfig.md#max_remote_listeners_per_socket)
- [MAX\_SEARCH\_FIELD\_LENGTH](constants.iitemizeconstantsconfig.md#max_search_field_length)
- [MAX\_SEARCH\_RECORDS\_DEFAULT](constants.iitemizeconstantsconfig.md#max_search_records_default)
- [MAX\_SEARCH\_RESULTS\_DEFAULT](constants.iitemizeconstantsconfig.md#max_search_results_default)
- [MAX\_STRING\_LENGTH](constants.iitemizeconstantsconfig.md#max_string_length)
- [MAX\_SUPPORTED\_YEAR](constants.iitemizeconstantsconfig.md#max_supported_year)
- [PROTECTED\_USERNAMES](constants.iitemizeconstantsconfig.md#protected_usernames)
- [SERVER\_DATA\_MIN\_UPDATE\_TIME](constants.iitemizeconstantsconfig.md#server_data_min_update_time)
- [SERVER\_MAPPING\_TIME](constants.iitemizeconstantsconfig.md#server_mapping_time)

## Properties

### FILE\_SUPPORTED\_IMAGE\_TYPES

• `Optional` **FILE\_SUPPORTED\_IMAGE\_TYPES**: *string*[]

The supported mime types for images

Defined in: [constants.ts:76](https://github.com/onzag/itemize/blob/28218320/constants.ts#L76)

___

### MAX\_FIELD\_SIZE

• `Optional` **MAX\_FIELD\_SIZE**: *number*

The maximum size of a given graphql query in bytes

Defined in: [constants.ts:56](https://github.com/onzag/itemize/blob/28218320/constants.ts#L56)

___

### MAX\_FILES\_PER\_PROPERTY

• `Optional` **MAX\_FILES\_PER\_PROPERTY**: *number*

Each files property can have a number of files, this number specifies the
top amount of files in a property

Defined in: [constants.ts:46](https://github.com/onzag/itemize/blob/28218320/constants.ts#L46)

___

### MAX\_FILES\_PER\_REQUEST

• `Optional` **MAX\_FILES\_PER\_REQUEST**: *number*

The total amount of files that exist in a single request, this is the total
sum of files; this number is used for a max theorethical, as in it combines
the max file size and this number to specify a size limit

Defined in: [constants.ts:52](https://github.com/onzag/itemize/blob/28218320/constants.ts#L52)

___

### MAX\_FILE\_SIZE

• `Optional` **MAX\_FILE\_SIZE**: *number*

The MAX file size of each given independent file, remember to ensure that
your nginx config is in line with this number, this should be a byte number

Defined in: [constants.ts:41](https://github.com/onzag/itemize/blob/28218320/constants.ts#L41)

___

### MAX\_RAW\_TEXT\_LENGTH

• `Optional` **MAX\_RAW\_TEXT\_LENGTH**: *number*

Defines how many characters (yes characters) a text type might have max
please define maxLenght in the property itself for specific checking
this check is expensive so checking twice is not good

Defined in: [constants.ts:36](https://github.com/onzag/itemize/blob/28218320/constants.ts#L36)

___

### MAX\_REMOTE\_LISTENERS\_PER\_SOCKET

• `Optional` **MAX\_REMOTE\_LISTENERS\_PER\_SOCKET**: *number*

The maximum amount of remote listeners a socket can
have at once before the server denies adding more
these are used for realtime updates

Defined in: [constants.ts:96](https://github.com/onzag/itemize/blob/28218320/constants.ts#L96)

___

### MAX\_SEARCH\_FIELD\_LENGTH

• `Optional` **MAX\_SEARCH\_FIELD\_LENGTH**: *number*

The maximum number of characters the search field can
have that is build for the search mode

Defined in: [constants.ts:72](https://github.com/onzag/itemize/blob/28218320/constants.ts#L72)

___

### MAX\_SEARCH\_RECORDS\_DEFAULT

• `Optional` **MAX\_SEARCH\_RECORDS\_DEFAULT**: *number*

The maximum amount of search records that a module and its item
children can retrieve at once in a given search query

Defined in: [constants.ts:67](https://github.com/onzag/itemize/blob/28218320/constants.ts#L67)

___

### MAX\_SEARCH\_RESULTS\_DEFAULT

• `Optional` **MAX\_SEARCH\_RESULTS\_DEFAULT**: *number*

The maximum amount of search results that a module and its item
children can retrieve at once in a given search query
this also affects the get list command

Defined in: [constants.ts:62](https://github.com/onzag/itemize/blob/28218320/constants.ts#L62)

___

### MAX\_STRING\_LENGTH

• `Optional` **MAX\_STRING\_LENGTH**: *number*

Defines how many characters a string type might have

Defined in: [constants.ts:30](https://github.com/onzag/itemize/blob/28218320/constants.ts#L30)

___

### MAX\_SUPPORTED\_YEAR

• `Optional` **MAX\_SUPPORTED\_YEAR**: *number*

The maximum supported year

Defined in: [constants.ts:26](https://github.com/onzag/itemize/blob/28218320/constants.ts#L26)

___

### PROTECTED\_USERNAMES

• `Optional` **PROTECTED\_USERNAMES**: *string*[]

Usernames that are not allowed to be taken
by users, defaults to admin and unsubscribe
it will prevent new users to creating accounts
with those names via the standard signup method
note that unsubscribe will remain being a protected
username no matter what, even if you fail
to specify it

Defined in: [constants.ts:106](https://github.com/onzag/itemize/blob/28218320/constants.ts#L106)

___

### SERVER\_DATA\_MIN\_UPDATE\_TIME

• `Optional` **SERVER\_DATA\_MIN\_UPDATE\_TIME**: *number*

The minimum update time for the server data to be changed
basically runs mantenience functions, mainly it's about
updating the currency information

this is a millisecond amount

Defined in: [constants.ts:84](https://github.com/onzag/itemize/blob/28218320/constants.ts#L84)

___

### SERVER\_MAPPING\_TIME

• `Optional` **SERVER\_MAPPING\_TIME**: *number*

The time it takes for sitemaps to be refreshed

this is a millisecond amount

Defined in: [constants.ts:90](https://github.com/onzag/itemize/blob/28218320/constants.ts#L90)
