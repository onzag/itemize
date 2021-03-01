[](../README.md) / [Exports](../modules.md) / constants

# Module: constants

Contains a bunch of constants that are used through the itemize app
while they can be changed it's not truly recommended, this is mainly for
internal usage and to keep configuration and have an idea

## Table of contents

### Interfaces

- [IItemizeConstantsConfig](../interfaces/constants.iitemizeconstantsconfig.md)
- [IOrderByRuleType](../interfaces/constants.iorderbyruletype.md)

### Type aliases

- [SearchVariants](constants.md#searchvariants)

### Variables

- [ANYONE\_LOGGED\_METAROLE](constants.md#anyone_logged_metarole)
- [ANYONE\_METAROLE](constants.md#anyone_metarole)
- [CACHED\_CURRENCY\_RESPONSE](constants.md#cached_currency_response)
- [CLASSIC\_BASE\_I18N](constants.md#classic_base_i18n)
- [CLASSIC\_OPTIONAL\_I18N](constants.md#classic_optional_i18n)
- [CLASSIC\_SEARCH\_BASE\_I18N](constants.md#classic_search_base_i18n)
- [CLASSIC\_SEARCH\_OPTIONAL\_I18N](constants.md#classic_search_optional_i18n)
- [CLASSIC\_SEARCH\_RANGED\_I18N](constants.md#classic_search_ranged_i18n)
- [CLASSIC\_SEARCH\_RANGED\_OPTIONAL\_I18N](constants.md#classic_search_ranged_optional_i18n)
- [COMBINED\_INDEX](constants.md#combined_index)
- [CONNECTOR\_SQL\_COLUMN\_ID\_FK\_NAME](constants.md#connector_sql_column_id_fk_name)
- [CONNECTOR\_SQL\_COLUMN\_VERSION\_FK\_NAME](constants.md#connector_sql_column_version_fk_name)
- [CREATED\_AT\_INDEX](constants.md#created_at_index)
- [CREATED\_BY\_INDEX](constants.md#created_by_index)
- [CURRENCY\_FACTORS\_IDENTIFIER](constants.md#currency_factors_identifier)
- [DATETIME\_FORMAT](constants.md#datetime_format)
- [DATE\_FORMAT](constants.md#date_format)
- [DELETED\_REGISTRY\_IDENTIFIER](constants.md#deleted_registry_identifier)
- [DESTRUCTION\_MARKERS\_LOCATION](constants.md#destruction_markers_location)
- [ENDPOINT\_ERRORS](constants.md#endpoint_errors)
- [EXCLUSION\_STATE\_SUFFIX](constants.md#exclusion_state_suffix)
- [EXTERNALLY\_ACCESSIBLE\_RESERVED\_BASE\_PROPERTIES](constants.md#externally_accessible_reserved_base_properties)
- [FILE\_SUPPORTED\_IMAGE\_TYPES](constants.md#file_supported_image_types)
- [GUEST\_METAROLE](constants.md#guest_metarole)
- [INCLUDE\_PREFIX](constants.md#include_prefix)
- [ITEM\_CALLOUT\_EXCLUDED\_I18N](constants.md#item_callout_excluded_i18n)
- [ITEM\_CAN\_BE\_EXCLUDED\_I18N](constants.md#item_can_be_excluded_i18n)
- [ITEM\_DEFINITION\_PREFIX](constants.md#item_definition_prefix)
- [ITEM\_OPTIONAL\_I18N](constants.md#item_optional_i18n)
- [LAST\_RICH\_TEXT\_CHANGE\_LENGTH](constants.md#last_rich_text_change_length)
- [LOCALE\_I18N](constants.md#locale_i18n)
- [LOCATION\_SEARCH\_I18N](constants.md#location_search_i18n)
- [MAX\_ALL\_COMBINED\_FILES\_SIZE](constants.md#max_all_combined_files_size)
- [MAX\_DECIMAL\_COUNT](constants.md#max_decimal_count)
- [MAX\_FIELD\_SIZE](constants.md#max_field_size)
- [MAX\_FILES\_PER\_PROPERTY](constants.md#max_files_per_property)
- [MAX\_FILE\_SIZE](constants.md#max_file_size)
- [MAX\_RAW\_TEXT\_LENGTH](constants.md#max_raw_text_length)
- [MAX\_REMOTE\_LISTENERS\_PER\_SOCKET](constants.md#max_remote_listeners_per_socket)
- [MAX\_SEARCH\_FIELD\_LENGTH](constants.md#max_search_field_length)
- [MAX\_SEARCH\_RECORDS\_DEFAULT](constants.md#max_search_records_default)
- [MAX\_SEARCH\_RESULTS\_DEFAULT](constants.md#max_search_results_default)
- [MAX\_STRING\_LENGTH](constants.md#max_string_length)
- [MAX\_SUPPORTED\_INTEGER](constants.md#max_supported_integer)
- [MAX\_SUPPORTED\_REAL](constants.md#max_supported_real)
- [MAX\_SUPPORTED\_YEAR](constants.md#max_supported_year)
- [MEMCACHED\_DESTRUCTION\_MARKERS\_LOCATION](constants.md#memcached_destruction_markers_location)
- [MEMCACHED\_SEARCH\_DESTRUCTION\_MARKERS\_LOCATION](constants.md#memcached_search_destruction_markers_location)
- [MIN\_SUPPORTED\_INTEGER](constants.md#min_supported_integer)
- [MIN\_SUPPORTED\_REAL](constants.md#min_supported_real)
- [MIN\_SUPPORTED\_YEAR](constants.md#min_supported_year)
- [MODERATION\_FIELDS](constants.md#moderation_fields)
- [MODULE\_AND\_ITEM\_DEF\_CUSTOM\_I18N\_KEY](constants.md#module_and_item_def_custom_i18n_key)
- [MODULE\_AND\_ITEM\_DEF\_I18N](constants.md#module_and_item_def_i18n)
- [MODULE\_AND\_ITEM\_DEF\_I18N\_SEARCHABLE](constants.md#module_and_item_def_i18n_searchable)
- [MODULE\_PREFIX](constants.md#module_prefix)
- [ORDERBY\_NULLS\_PRIORITY](constants.md#orderby_nulls_priority)
- [ORDERBY\_RULE](constants.md#orderby_rule)
- [ORDERBY\_RULE\_DIRECTION](constants.md#orderby_rule_direction)
- [OWNER\_METAROLE](constants.md#owner_metarole)
- [PARENT\_INDEX](constants.md#parent_index)
- [POLICY\_OPTIONAL\_I18N](constants.md#policy_optional_i18n)
- [POLICY\_PREFIXES](constants.md#policy_prefixes)
- [POLICY\_REQUIRED\_I18N](constants.md#policy_required_i18n)
- [PREFIX\_ADD](constants.md#prefix_add)
- [PREFIX\_DELETE](constants.md#prefix_delete)
- [PREFIX\_EDIT](constants.md#prefix_edit)
- [PREFIX\_GET](constants.md#prefix_get)
- [PREFIX\_GET\_LIST](constants.md#prefix_get_list)
- [PREFIX\_SEARCH](constants.md#prefix_search)
- [PREFIX\_TRADITIONAL\_SEARCH](constants.md#prefix_traditional_search)
- [PROTECTED\_RESOURCES](constants.md#protected_resources)
- [PROTECTED\_USERNAMES](constants.md#protected_usernames)
- [REDUCED\_BASE\_I18N](constants.md#reduced_base_i18n)
- [REDUCED\_SEARCH\_BASE\_I18N](constants.md#reduced_search_base_i18n)
- [REGISTRY\_IDENTIFIER](constants.md#registry_identifier)
- [RESERVED\_ADD\_PROPERTIES](constants.md#reserved_add_properties)
- [RESERVED\_BASE\_PROPERTIES](constants.md#reserved_base_properties)
- [RESERVED\_CHANGE\_PROPERTIES](constants.md#reserved_change_properties)
- [RESERVED\_GETTER\_LIST\_PROPERTIES](constants.md#reserved_getter_list_properties)
- [RESERVED\_GETTER\_PROPERTIES](constants.md#reserved_getter_properties)
- [ROOT\_REQUIRED\_LOCALE\_I18N](constants.md#root_required_locale_i18n)
- [SEARCH\_DESTRUCTION\_MARKERS\_LOCATION](constants.md#search_destruction_markers_location)
- [SEARCH\_MODE\_MODULE\_PREFIX](constants.md#search_mode_module_prefix)
- [SEARCH\_RECORDS\_CONTAINER\_GQL](constants.md#search_records_container_gql)
- [SEARCH\_RECORD\_GQL](constants.md#search_record_gql)
- [SEARCH\_RECORD\_INPUT\_GQL](constants.md#search_record_input_gql)
- [SERVER\_DATA\_IDENTIFIER](constants.md#server_data_identifier)
- [SERVER\_DATA\_MIN\_UPDATE\_TIME](constants.md#server_data_min_update_time)
- [SERVER\_MAPPING\_TIME](constants.md#server_mapping_time)
- [SERVER\_USER\_KICK\_IDENTIFIER](constants.md#server_user_kick_identifier)
- [SQL\_CONSTRAINT\_PREFIX](constants.md#sql_constraint_prefix)
- [STANDARD\_ACCESSIBLE\_RESERVED\_BASE\_PROPERTIES](constants.md#standard_accessible_reserved_base_properties)
- [TIME\_FORMAT](constants.md#time_format)
- [UNIT\_SUBTYPES](constants.md#unit_subtypes)
- [UNSPECIFIED\_OWNER](constants.md#unspecified_owner)
- [USER\_EXTRA\_CUSTOM\_I18N](constants.md#user_extra_custom_i18n)

### Functions

- [PREFIXED\_CONCAT](constants.md#prefixed_concat)
- [PREFIX\_BUILD](constants.md#prefix_build)
- [RESERVED\_BASE\_PROPERTIES\_SQL](constants.md#reserved_base_properties_sql)
- [RESERVED\_IDEF\_SEARCH\_PROPERTIES](constants.md#reserved_idef_search_properties)
- [RESERVED\_MODULE\_SEARCH\_PROPERTIES](constants.md#reserved_module_search_properties)
- [SUFFIX\_BUILD](constants.md#suffix_build)

## Type aliases

### SearchVariants

Ƭ **SearchVariants**: *exact* \| *from* \| *to* \| *location* \| *radius* \| *search*

Defined in: [constants.ts:1094](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L1094)

## Variables

### ANYONE\_LOGGED\_METAROLE

• `Const` **ANYONE\_LOGGED\_METAROLE**: *&ANYONE_LOGGED*= "&ANYONE\_LOGGED"

Role that means anyone logged in

Defined in: [constants.ts:1312](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L1312)

___

### ANYONE\_METAROLE

• `Const` **ANYONE\_METAROLE**: *&ANYONE*= "&ANYONE"

Role that means, well, anyone

Defined in: [constants.ts:1308](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L1308)

___

### CACHED\_CURRENCY\_RESPONSE

• `Const` **CACHED\_CURRENCY\_RESPONSE**: *CACHED_CURRENCY_RESPONSE*= "CACHED\_CURRENCY\_RESPONSE"

An identifier for caching the currency api response
for currency conversion in redis

Defined in: [constants.ts:1398](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L1398)

___

### CLASSIC\_BASE\_I18N

• `Const` **CLASSIC\_BASE\_I18N**: *string*[]

Standard i18n fields required for properties

Defined in: [constants.ts:536](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L536)

___

### CLASSIC\_OPTIONAL\_I18N

• `Const` **CLASSIC\_OPTIONAL\_I18N**: *string*[]

Optional i18n fields in properties

Defined in: [constants.ts:564](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L564)

___

### CLASSIC\_SEARCH\_BASE\_I18N

• `Const` **CLASSIC\_SEARCH\_BASE\_I18N**: *string*[]

Standard i18n fields required for properties when
they are searchable

Defined in: [constants.ts:544](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L544)

___

### CLASSIC\_SEARCH\_OPTIONAL\_I18N

• `Const` **CLASSIC\_SEARCH\_OPTIONAL\_I18N**: *string*[]

Optional i18n fields in properties when they are
searchable

Defined in: [constants.ts:571](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L571)

___

### CLASSIC\_SEARCH\_RANGED\_I18N

• `Const` **CLASSIC\_SEARCH\_RANGED\_I18N**: *string*[]

Extended required i18n fields required in properties
when they use a ranged search

Defined in: [constants.ts:578](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L578)

___

### CLASSIC\_SEARCH\_RANGED\_OPTIONAL\_I18N

• `Const` **CLASSIC\_SEARCH\_RANGED\_OPTIONAL\_I18N**: *string*[]

Extended optional i18n fields required in properties
when they use a ranged search

Defined in: [constants.ts:588](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L588)

___

### COMBINED\_INDEX

• `Const` **COMBINED\_INDEX**: *COMBINED_INDEX*= "COMBINED\_INDEX"

Defined in: [constants.ts:731](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L731)

___

### CONNECTOR\_SQL\_COLUMN\_ID\_FK\_NAME

• `Const` **CONNECTOR\_SQL\_COLUMN\_ID\_FK\_NAME**: *MODULE_ID*= "MODULE\_ID"

The column name of the foreign key that connects the module table
with the item definition table

Defined in: [constants.ts:867](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L867)

___

### CONNECTOR\_SQL\_COLUMN\_VERSION\_FK\_NAME

• `Const` **CONNECTOR\_SQL\_COLUMN\_VERSION\_FK\_NAME**: *MODULE_VERSION*= "MODULE\_VERSION"

The column name of the foreign key that connects the module table
with the item definition table

Defined in: [constants.ts:872](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L872)

___

### CREATED\_AT\_INDEX

• `Const` **CREATED\_AT\_INDEX**: *CREATED_AT_INDEX*= "CREATED\_AT\_INDEX"

Defined in: [constants.ts:728](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L728)

___

### CREATED\_BY\_INDEX

• `Const` **CREATED\_BY\_INDEX**: *CREATED_BY_INDEX*= "CREATED\_BY\_INDEX"

Defined in: [constants.ts:729](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L729)

___

### CURRENCY\_FACTORS\_IDENTIFIER

• `Const` **CURRENCY\_FACTORS\_IDENTIFIER**: *CURRENCY_FACTORS*= "CURRENCY\_FACTORS"

An identifier for the currency factors and the currency
factor information

Defined in: [constants.ts:1382](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L1382)

___

### DATETIME\_FORMAT

• `Const` **DATETIME\_FORMAT**: *YYYY-MM-DD HH:mm:ss.SSSZ*= "YYYY-MM-DD HH:mm:ss.SSSZ"

The format that dates are expected to have in order to be exchanged
these represent the SQL form, does not support nano date

Defined in: [constants.ts:969](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L969)

___

### DATE\_FORMAT

• `Const` **DATE\_FORMAT**: *YYYY-MM-DD*= "YYYY-MM-DD"

The format date has in order to be exchanged, this is
the SQL form

Defined in: [constants.ts:979](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L979)

___

### DELETED\_REGISTRY\_IDENTIFIER

• `Const` **DELETED\_REGISTRY\_IDENTIFIER**: *DELETED_REGISTRY*= "DELETED\_REGISTRY"

An identifier for the deleted table information stuff

Defined in: [constants.ts:1387](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L1387)

___

### DESTRUCTION\_MARKERS\_LOCATION

• `Const` **DESTRUCTION\_MARKERS\_LOCATION**: *DESTRUCTION_MARKERS*= "DESTRUCTION\_MARKERS"

Where the destruction markers are located

Defined in: [constants.ts:284](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L284)

___

### ENDPOINT\_ERRORS

• `Const` **ENDPOINT\_ERRORS**: *object*

Graphql endpoint errors codes that can be thrown

#### Type declaration:

Name | Type |
:------ | :------ |
`BLOCKED` | *string* |
`CANT_CONNECT` | *string* |
`FORBIDDEN` | *string* |
`INTERNAL_SERVER_ERROR` | *string* |
`INVALID_CREDENTIALS` | *string* |
`INVALID_DATA_SUBMIT_REFUSED` | *string* |
`INVALID_INCLUDE` | *string* |
`INVALID_POLICY` | *string* |
`INVALID_PROPERTY` | *string* |
`MUST_BE_LOGGED_IN` | *string* |
`NOTHING_TO_UPDATE` | *string* |
`NOT_FOUND` | *string* |
`UNSPECIFIED` | *string* |
`USER_BLOCKED` | *string* |
`USER_EMAIL_TAKEN` | *string* |
`USER_REMOVED` | *string* |

Defined in: [constants.ts:309](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L309)

___

### EXCLUSION\_STATE\_SUFFIX

• `Const` **EXCLUSION\_STATE\_SUFFIX**: *string*

The suffix added to refer to the exclusion state of an include in SQL or graphql

Defined in: [constants.ts:911](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L911)

___

### EXTERNALLY\_ACCESSIBLE\_RESERVED\_BASE\_PROPERTIES

• `Const` **EXTERNALLY\_ACCESSIBLE\_RESERVED\_BASE\_PROPERTIES**: *string*[]

Graphql values come in a DATA form, because they can be blocked
however some attributes are meant to leak and be externally accessible
these atrributes can only be accessed outside of it

Defined in: [constants.ts:608](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L608)

___

### FILE\_SUPPORTED\_IMAGE\_TYPES

• `Const` **FILE\_SUPPORTED\_IMAGE\_TYPES**: *string*[]

Supported image types

Defined in: [constants.ts:227](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L227)

___

### GUEST\_METAROLE

• `Const` **GUEST\_METAROLE**: *&GUEST*= "&GUEST"

Role that means any guest

Defined in: [constants.ts:1316](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L1316)

___

### INCLUDE\_PREFIX

• `Const` **INCLUDE\_PREFIX**: *string*

Every include when used within the database or graphql is prefixed with

Defined in: [constants.ts:895](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L895)

___

### ITEM\_CALLOUT\_EXCLUDED\_I18N

• `Const` **ITEM\_CALLOUT\_EXCLUDED\_I18N**: *string*[]

The properties for i18n a callout excluded item should have

Defined in: [constants.ts:277](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L277)

___

### ITEM\_CAN\_BE\_EXCLUDED\_I18N

• `Const` **ITEM\_CAN\_BE\_EXCLUDED\_I18N**: *string*[]

The properties for i18n an item that can be excluded should have

Defined in: [constants.ts:259](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L259)

___

### ITEM\_DEFINITION\_PREFIX

• `Const` **ITEM\_DEFINITION\_PREFIX**: *string*

Every item definition when used within the database, graphql or its qualified name is prefixed with

Defined in: [constants.ts:907](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L907)

___

### ITEM\_OPTIONAL\_I18N

• `Const` **ITEM\_OPTIONAL\_I18N**: *string*[]

The item optional data

Defined in: [constants.ts:270](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L270)

___

### LAST\_RICH\_TEXT\_CHANGE\_LENGTH

• `Const` **LAST\_RICH\_TEXT\_CHANGE\_LENGTH**: *LAST_RICH_TEXT_CHANGE_LENGTH*= "LAST\_RICH\_TEXT\_CHANGE\_LENGTH"

Store a last rich text change size global to use to save memory for lenght calculation

Defined in: [constants.ts:304](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L304)

___

### LOCALE\_I18N

• `Const` **LOCALE\_I18N**: *string*[]

This is for small use anywhere language data

Defined in: [constants.ts:347](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L347)

___

### LOCATION\_SEARCH\_I18N

• `Const` **LOCATION\_SEARCH\_I18N**: *string*[]

Extended i18n fields required in properties
when they use a location search

Defined in: [constants.ts:596](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L596)

___

### MAX\_ALL\_COMBINED\_FILES\_SIZE

• `Const` **MAX\_ALL\_COMBINED\_FILES\_SIZE**: *number*

how many files can there be total
in a single request, this is more of a security concern

Defined in: [constants.ts:176](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L176)

___

### MAX\_DECIMAL\_COUNT

• `Const` **MAX\_DECIMAL\_COUNT**: *6*= 6

Defines how many decimal points are supported, for the sake of usability
the number is set to a precision of 6

Defined in: [constants.ts:137](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L137)

___

### MAX\_FIELD\_SIZE

• `Const` **MAX\_FIELD\_SIZE**: *number*

Another just a security concern, this
is the size of the graphql query, 1MB should be way more than enough for a graphql query

Defined in: [constants.ts:184](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L184)

___

### MAX\_FILES\_PER\_PROPERTY

• `Const` **MAX\_FILES\_PER\_PROPERTY**: *number*

how many files can be used in one item field at once

Defined in: [constants.ts:171](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L171)

___

### MAX\_FILE\_SIZE

• `Const` **MAX\_FILE\_SIZE**: *number*

The max file size (for either images and binary files)

Defined in: [constants.ts:167](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L167)

___

### MAX\_RAW\_TEXT\_LENGTH

• `Const` **MAX\_RAW\_TEXT\_LENGTH**: *number*

Defines how many characters (yes characters) a text might have max
please define maxLenght in the property itself for specific checking
this check is expensive so checking twice is not good

Defined in: [constants.ts:163](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L163)

___

### MAX\_REMOTE\_LISTENERS\_PER\_SOCKET

• `Const` **MAX\_REMOTE\_LISTENERS\_PER\_SOCKET**: *number*

The maximum amount of remote listeners a socket supports

Defined in: [constants.ts:214](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L214)

___

### MAX\_SEARCH\_FIELD\_LENGTH

• `Const` **MAX\_SEARCH\_FIELD\_LENGTH**: *number*

Size in characters of the search field

Defined in: [constants.ts:198](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L198)

___

### MAX\_SEARCH\_RECORDS\_DEFAULT

• `Const` **MAX\_SEARCH\_RECORDS\_DEFAULT**: *number*

how many search results can be retrieved at once these are
used for the actual search results

Defined in: [constants.ts:194](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L194)

___

### MAX\_SEARCH\_RESULTS\_DEFAULT

• `Const` **MAX\_SEARCH\_RESULTS\_DEFAULT**: *number*

how many search results can be retrieved at once these are
used for the actual search results

Defined in: [constants.ts:189](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L189)

___

### MAX\_STRING\_LENGTH

• `Const` **MAX\_STRING\_LENGTH**: *number*

Defines how many characters a string might have

Defined in: [constants.ts:157](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L157)

___

### MAX\_SUPPORTED\_INTEGER

• `Const` **MAX\_SUPPORTED\_INTEGER**: *2147483647*= 2147483647

Defines the max supported integer, it should match up the database

Defined in: [constants.ts:128](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L128)

___

### MAX\_SUPPORTED\_REAL

• `Const` **MAX\_SUPPORTED\_REAL**: *999999999*= 999999999

Defines how big can decimal numbers get

Defined in: [constants.ts:141](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L141)

___

### MAX\_SUPPORTED\_YEAR

• `Const` **MAX\_SUPPORTED\_YEAR**: *number*

Years max

Defined in: [constants.ts:149](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L149)

___

### MEMCACHED\_DESTRUCTION\_MARKERS\_LOCATION

• `Const` **MEMCACHED\_DESTRUCTION\_MARKERS\_LOCATION**: *string*

Where destruction markers get memory cached

Defined in: [constants.ts:294](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L294)

___

### MEMCACHED\_SEARCH\_DESTRUCTION\_MARKERS\_LOCATION

• `Const` **MEMCACHED\_SEARCH\_DESTRUCTION\_MARKERS\_LOCATION**: *string*

Where destruction markers get memory cached

Defined in: [constants.ts:299](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L299)

___

### MIN\_SUPPORTED\_INTEGER

• `Const` **MIN\_SUPPORTED\_INTEGER**: *number*= -MAX\_SUPPORTED\_INTEGER

Defines the min supported integer, it should match up the database too

Defined in: [constants.ts:132](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L132)

___

### MIN\_SUPPORTED\_REAL

• `Const` **MIN\_SUPPORTED\_REAL**: *-999999999*= -999999999

Defines how small can decimal numbers get

Defined in: [constants.ts:145](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L145)

___

### MIN\_SUPPORTED\_YEAR

• `Const` **MIN\_SUPPORTED\_YEAR**: *0*= 0

Years min

Defined in: [constants.ts:153](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L153)

___

### MODERATION\_FIELDS

• `Const` **MODERATION\_FIELDS**: *string*[]

Moderation fields for flagging

Defined in: [constants.ts:1320](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L1320)

___

### MODULE\_AND\_ITEM\_DEF\_CUSTOM\_I18N\_KEY

• `Const` **MODULE\_AND\_ITEM\_DEF\_CUSTOM\_I18N\_KEY**: *custom*= "custom"

The custom key as it is stored in the built file, the custom key
is always custom in the properties

Defined in: [constants.ts:254](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L254)

___

### MODULE\_AND\_ITEM\_DEF\_I18N

• `Const` **MODULE\_AND\_ITEM\_DEF\_I18N**: *string*[]

The properties for i18n a module should have

Defined in: [constants.ts:238](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L238)

___

### MODULE\_AND\_ITEM\_DEF\_I18N\_SEARCHABLE

• `Const` **MODULE\_AND\_ITEM\_DEF\_I18N\_SEARCHABLE**: *string*[]

The properties for i18n a searchable module and item definition should have

Defined in: [constants.ts:244](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L244)

___

### MODULE\_PREFIX

• `Const` **MODULE\_PREFIX**: *string*

Every module when used within the database, graphql or its qualified name is prefixed with

Defined in: [constants.ts:899](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L899)

___

### ORDERBY\_NULLS\_PRIORITY

• `Const` **ORDERBY\_NULLS\_PRIORITY**: *GraphQLEnumType*

And this is for the order by rule enum nulls

Defined in: [constants.ts:1073](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L1073)

___

### ORDERBY\_RULE

• `Const` **ORDERBY\_RULE**: *GraphQLInputObjectType*

Defined in: [constants.ts:1078](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L1078)

___

### ORDERBY\_RULE\_DIRECTION

• `Const` **ORDERBY\_RULE\_DIRECTION**: *GraphQLEnumType*

And this is for the order by rule enum

Defined in: [constants.ts:1065](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L1065)

___

### OWNER\_METAROLE

• `Const` **OWNER\_METAROLE**: *&OWNER*= "&OWNER"

Role that means the owner of this item

Defined in: [constants.ts:1304](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L1304)

___

### PARENT\_INDEX

• `Const` **PARENT\_INDEX**: *PARENT_INDEX*= "PARENT\_INDEX"

Defined in: [constants.ts:730](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L730)

___

### POLICY\_OPTIONAL\_I18N

• `Const` **POLICY\_OPTIONAL\_I18N**: *string*[]

Policies can also recieve an optional description

Defined in: [constants.ts:961](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L961)

___

### POLICY\_PREFIXES

• `Const` **POLICY\_PREFIXES**: *object*

The policy prefixes for all the policies that are available within itemize
in order to create complex rules

#### Type declaration:

Name | Type |
:------ | :------ |
`delete` | *string* |
`edit` | *string* |
`parent` | *string* |
`read` | *string* |

Defined in: [constants.ts:944](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L944)

___

### POLICY\_REQUIRED\_I18N

• `Const` **POLICY\_REQUIRED\_I18N**: *string*[]

The required i18n fields to require for a policy
policies get a title that should be human readable in
the given language, and a fail error message for when they fail

Defined in: [constants.ts:955](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L955)

___

### PREFIX\_ADD

• `Const` **PREFIX\_ADD**: *string*

The prefix used in the graphql endpoint for adding item definitions

Defined in: [constants.ts:931](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L931)

___

### PREFIX\_DELETE

• `Const` **PREFIX\_DELETE**: *string*

The prefix used in the graphql endpoint for deleting item definitions

Defined in: [constants.ts:939](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L939)

___

### PREFIX\_EDIT

• `Const` **PREFIX\_EDIT**: *string*

The prefix used in the graphql endpoint for editing item definitions

Defined in: [constants.ts:935](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L935)

___

### PREFIX\_GET

• `Const` **PREFIX\_GET**: *string*

The prefix used in the graphql endpoint for getting item definitions

Defined in: [constants.ts:923](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L923)

___

### PREFIX\_GET\_LIST

• `Const` **PREFIX\_GET\_LIST**: *string*

The prefix used in the graphql endpoint for getting lists of item definitions and modules

Defined in: [constants.ts:927](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L927)

___

### PREFIX\_SEARCH

• `Const` **PREFIX\_SEARCH**: *string*

The prefix used in the graphql endpoint for searches of modules and item definitions

Defined in: [constants.ts:915](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L915)

___

### PREFIX\_TRADITIONAL\_SEARCH

• `Const` **PREFIX\_TRADITIONAL\_SEARCH**: *string*

The prefix used in the graphql endpoint for searches of modules and item definitions in traditional mode

Defined in: [constants.ts:919](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L919)

___

### PROTECTED\_RESOURCES

• `Const` **PROTECTED\_RESOURCES**: *string*[]

Resources that are protected from fetching without specifying the devkey

Defined in: [constants.ts:1363](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L1363)

___

### PROTECTED\_USERNAMES

• `Const` **PROTECTED\_USERNAMES**: *string*[]

The protected usernames that cannot be taken by the users

Defined in: [constants.ts:219](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L219)

___

### REDUCED\_BASE\_I18N

• `Const` **REDUCED\_BASE\_I18N**: *string*[]

Reduced i18n required for properties

Defined in: [constants.ts:551](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L551)

___

### REDUCED\_SEARCH\_BASE\_I18N

• `Const` **REDUCED\_SEARCH\_BASE\_I18N**: *string*[]

Reduced i18n required for properties when
they are searchable

Defined in: [constants.ts:558](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L558)

___

### REGISTRY\_IDENTIFIER

• `Const` **REGISTRY\_IDENTIFIER**: *REGISTRY*= "REGISTRY"

An identifier for the internal global registry

Defined in: [constants.ts:1392](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L1392)

___

### RESERVED\_ADD\_PROPERTIES

• `Const` **RESERVED\_ADD\_PROPERTIES**: *object*

Properties required in order to add something

#### Type declaration:

Name | Type |
:------ | :------ |
`container_id` | *object* |
`container_id.description` | *string* |
`container_id.type` | *GraphQLNonNull*<GraphQLNullableType\> |
`for_id` | *object* |
`for_id.description` | *string* |
`for_id.type` | *GraphQLScalarType* |
`in_behalf_of` | *object* |
`in_behalf_of.description` | *string* |
`in_behalf_of.type` | *GraphQLScalarType* |
`language` | *object* |
`language.description` | *string* |
`language.type` | *GraphQLNonNull*<GraphQLNullableType\> |
`listener_uuid` | *object* |
`listener_uuid.description` | *string* |
`listener_uuid.type` | *GraphQLScalarType* |
`parent_id` | *object* |
`parent_id.description` | *string* |
`parent_id.type` | *GraphQLScalarType* |
`parent_type` | *object* |
`parent_type.description` | *string* |
`parent_type.type` | *GraphQLScalarType* |
`parent_version` | *object* |
`parent_version.description` | *string* |
`parent_version.type` | *GraphQLScalarType* |
`token` | *object* |
`token.description` | *string* |
`token.type` | *GraphQLScalarType* |
`version` | *object* |
`version.description` | *string* |
`version.type` | *GraphQLScalarType* |

Defined in: [constants.ts:1263](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L1263)

___

### RESERVED\_BASE\_PROPERTIES

• `Const` **RESERVED\_BASE\_PROPERTIES**: [*IGQLFieldsDefinitionType*](../interfaces/base_root_gql.igqlfieldsdefinitiontype.md)

The reserved base properties that are exists within every graphql query
and should mirror the database

Defined in: [constants.ts:638](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L638)

___

### RESERVED\_CHANGE\_PROPERTIES

• `Const` **RESERVED\_CHANGE\_PROPERTIES**: *object*

Properties required in order to change something
either edit or delete

#### Type declaration:

Name | Type |
:------ | :------ |
`id` | *object* |
`id.description` | *string* |
`id.type` | *GraphQLNonNull*<GraphQLNullableType\> |
`language` | *object* |
`language.description` | *string* |
`language.type` | *GraphQLNonNull*<GraphQLNullableType\> |
`listener_uuid` | *object* |
`listener_uuid.description` | *string* |
`listener_uuid.type` | *GraphQLScalarType* |
`token` | *object* |
`token.description` | *string* |
`token.type` | *GraphQLScalarType* |
`version` | *object* |
`version.description` | *string* |
`version.type` | *GraphQLScalarType* |

Defined in: [constants.ts:1237](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L1237)

___

### RESERVED\_GETTER\_LIST\_PROPERTIES

• `Const` **RESERVED\_GETTER\_LIST\_PROPERTIES**: *object*

Properties required in order to get a list

#### Type declaration:

Name | Type |
:------ | :------ |
`created_by` | *object* |
`created_by.description` | *string* |
`created_by.type` | *GraphQLScalarType* |
`language` | *object* |
`language.description` | *string* |
`language.type` | *GraphQLNonNull*<GraphQLNullableType\> |
`records` | *object* |
`records.description` | *string* |
`records.type` | *GraphQLNonNull*<GraphQLNullableType\> |
`token` | *object* |
`token.description` | *string* |
`token.type` | *GraphQLScalarType* |

Defined in: [constants.ts:1248](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L1248)

___

### RESERVED\_GETTER\_PROPERTIES

• `Const` **RESERVED\_GETTER\_PROPERTIES**: *object*

Properties required in order to get

#### Type declaration:

Name | Type |
:------ | :------ |
`id` | *object* |
`id.description` | *string* |
`id.type` | *GraphQLNonNull*<GraphQLNullableType\> |
`language` | *object* |
`language.description` | *string* |
`language.type` | *GraphQLNonNull*<GraphQLNullableType\> |
`token` | *object* |
`token.description` | *string* |
`token.type` | *GraphQLScalarType* |
`version` | *object* |
`version.description` | *string* |
`version.type` | *GraphQLScalarType* |

Defined in: [constants.ts:1221](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L1221)

___

### ROOT\_REQUIRED\_LOCALE\_I18N

• `Const` **ROOT\_REQUIRED\_LOCALE\_I18N**: *string*[]

Root required i18n properties

Defined in: [constants.ts:527](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L527)

___

### SEARCH\_DESTRUCTION\_MARKERS\_LOCATION

• `Const` **SEARCH\_DESTRUCTION\_MARKERS\_LOCATION**: *SEARCH_DESTRUCTION_MARKERS*= "SEARCH\_DESTRUCTION\_MARKERS"

Where the destruction markers are located

Defined in: [constants.ts:289](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L289)

___

### SEARCH\_MODE\_MODULE\_PREFIX

• `Const` **SEARCH\_MODE\_MODULE\_PREFIX**: *string*

The search mode module is prefixed with

Defined in: [constants.ts:903](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L903)

___

### SEARCH\_RECORDS\_CONTAINER\_GQL

• `Const` **SEARCH\_RECORDS\_CONTAINER\_GQL**: *GraphQLObjectType*<any, any, { [key: string]: *any*;  }\>

The id container contains the way that search results are returned
with the records and the last record of the given records

Defined in: [constants.ts:1019](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L1019)

___

### SEARCH\_RECORD\_GQL

• `Const` **SEARCH\_RECORD\_GQL**: *GraphQLObjectType*<any, any, { [key: string]: *any*;  }\>

The ID element in graphql form

Defined in: [constants.ts:1003](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L1003)

___

### SEARCH\_RECORD\_INPUT\_GQL

• `Const` **SEARCH\_RECORD\_INPUT\_GQL**: *GraphQLInputObjectType*

The ID element as input form

Defined in: [constants.ts:1010](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L1010)

___

### SERVER\_DATA\_IDENTIFIER

• `Const` **SERVER\_DATA\_IDENTIFIER**: *SERVER_DATA*= "SERVER\_DATA"

An identifier for the server data

Defined in: [constants.ts:1370](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L1370)

___

### SERVER\_DATA\_MIN\_UPDATE\_TIME

• `Const` **SERVER\_DATA\_MIN\_UPDATE\_TIME**: *number*

The minimum update time for the server data to be changed
basically runs mantenience functions, mainly it's about
updating the currency information

Defined in: [constants.ts:204](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L204)

___

### SERVER\_MAPPING\_TIME

• `Const` **SERVER\_MAPPING\_TIME**: *number*

The time it takes for sitemaps to be refreshed

Defined in: [constants.ts:209](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L209)

___

### SERVER\_USER\_KICK\_IDENTIFIER

• `Const` **SERVER\_USER\_KICK\_IDENTIFIER**: *SERVER_KICK*= "SERVER\_KICK"

An identifier from when the server kicks an user from the
login (aka sudden remote logout)

Defined in: [constants.ts:1376](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L1376)

___

### SQL\_CONSTRAINT\_PREFIX

• `Const` **SQL\_CONSTRAINT\_PREFIX**: *string*

Used for creation of sql contraints

Defined in: [constants.ts:891](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L891)

___

### STANDARD\_ACCESSIBLE\_RESERVED\_BASE\_PROPERTIES

• `Const` **STANDARD\_ACCESSIBLE\_RESERVED\_BASE\_PROPERTIES**: *string*[]

These attributes are however protected, they exist only within
the DATA field

Defined in: [constants.ts:623](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L623)

___

### TIME\_FORMAT

• `Const` **TIME\_FORMAT**: *HH:mm:ss*= "HH:mm:ss"

The format that time is expected to have in order to be exchanged
this is the SQL form

Defined in: [constants.ts:974](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L974)

___

### UNIT\_SUBTYPES

• `Const` **UNIT\_SUBTYPES**: *string*[]

Units that are allowed within the itemize application these
are for the unit subtype

Defined in: [constants.ts:1329](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L1329)

___

### UNSPECIFIED\_OWNER

• `Const` **UNSPECIFIED\_OWNER**: *UNSPECIFIED*= "UNSPECIFIED"

When an owner is not specified, this is the value it holds
null is the user value of &GUEST hence it should not hold
the same value

Defined in: [constants.ts:1358](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L1358)

___

### USER\_EXTRA\_CUSTOM\_I18N

• `Const` **USER\_EXTRA\_CUSTOM\_I18N**: *string*[]

Extra i18n properties that are used for the generation
of the validation email and the recovery email

Defined in: [constants.ts:332](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L332)

## Functions

### PREFIXED\_CONCAT

▸ `Const`**PREFIXED_CONCAT**(...`args`: *string*[]): *string*

an utility to concat prefixes

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`...args` | *string*[] | the string list to concat    |

**Returns:** *string*

Defined in: [constants.ts:887](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L887)

___

### PREFIX\_BUILD

▸ `Const`**PREFIX_BUILD**(`s`: *string*): *string*

an utility to build prefixes

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`s` | *string* | the string to turn into a prefix    |

**Returns:** *string*

Defined in: [constants.ts:877](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L877)

___

### RESERVED\_BASE\_PROPERTIES\_SQL

▸ `Const`**RESERVED_BASE_PROPERTIES_SQL**(`combinedIndexes`: *string*[], `addedIndexes`: *string*[]): [*ISQLTableDefinitionType*](../interfaces/base_root_sql.isqltabledefinitiontype.md)

The reserved base properties but in SQL form

#### Parameters:

Name | Type |
:------ | :------ |
`combinedIndexes` | *string*[] |
`addedIndexes` | *string*[] |

**Returns:** [*ISQLTableDefinitionType*](../interfaces/base_root_sql.isqltabledefinitiontype.md)

Defined in: [constants.ts:736](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L736)

___

### RESERVED\_IDEF\_SEARCH\_PROPERTIES

▸ `Const`**RESERVED_IDEF_SEARCH_PROPERTIES**(`orderByRule`: *any*): *object*

The reserved search properties represent how searches are done
and these are included in every search

#### Parameters:

Name | Type |
:------ | :------ |
`orderByRule` | *any* |

**Returns:** *object*

Name | Type |
:------ | :------ |
`created_by` | *object* |
`created_by.description` | *string* |
`created_by.type` | *GraphQLScalarType* |
`language` | *object* |
`language.description` | *string* |
`language.type` | *GraphQLNonNull*<GraphQLNullableType\> |
`limit` | *object* |
`limit.description` | *string* |
`limit.type` | *GraphQLNonNull*<GraphQLNullableType\> |
`offset` | *object* |
`offset.description` | *string* |
`offset.type` | *GraphQLNonNull*<GraphQLNullableType\> |
`order_by` | *object* |
`order_by.description` | *string* |
`order_by.type` | *GraphQLNonNull*<GraphQLNullableType\> |
`parent_id` | *object* |
`parent_id.description` | *string* |
`parent_id.type` | *GraphQLScalarType* |
`parent_type` | *object* |
`parent_type.description` | *string* |
`parent_type.type` | *GraphQLScalarType* |
`parent_version` | *object* |
`parent_version.description` | *string* |
`parent_version.type` | *GraphQLScalarType* |
`search` | *object* |
`search.description` | *string* |
`search.type` | *GraphQLScalarType* |
`since` | *object* |
`since.description` | *string* |
`since.type` | *GraphQLScalarType* |
`token` | *object* |
`token.description` | *string* |
`token.type` | *GraphQLScalarType* |
`version_filter` | *object* |
`version_filter.description` | *string* |
`version_filter.type` | *GraphQLScalarType* |

Defined in: [constants.ts:1123](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L1123)

___

### RESERVED\_MODULE\_SEARCH\_PROPERTIES

▸ `Const`**RESERVED_MODULE_SEARCH_PROPERTIES**(`orderByRule`: *any*): *object*

These apply when doing module searches

#### Parameters:

Name | Type |
:------ | :------ |
`orderByRule` | *any* |

**Returns:** *object*

Name | Type |
:------ | :------ |
`created_by` | *object* |
`created_by.description` | *string* |
`created_by.type` | *GraphQLScalarType* |
`limit` | *object* |
`limit.description` | *string* |
`limit.type` | *GraphQLNonNull*<GraphQLNullableType\> |
`offset` | *object* |
`offset.description` | *string* |
`offset.type` | *GraphQLNonNull*<GraphQLNullableType\> |
`order_by` | *object* |
`order_by.description` | *string* |
`order_by.type` | *GraphQLNonNull*<GraphQLNullableType\> |
`parent_id` | *object* |
`parent_id.description` | *string* |
`parent_id.type` | *GraphQLScalarType* |
`parent_type` | *object* |
`parent_type.description` | *string* |
`parent_type.type` | *GraphQLScalarType* |
`parent_version` | *object* |
`parent_version.description` | *string* |
`parent_version.type` | *GraphQLScalarType* |
`search` | *object* |
`search.description` | *string* |
`search.type` | *GraphQLScalarType* |
`since` | *object* |
`since.description` | *string* |
`since.type` | *GraphQLScalarType* |
`types` | *object* |
`types.description` | *string* |
`types.type` | *GraphQLList*<GraphQLType\> |
`version_filter` | *object* |
`version_filter.description` | *string* |
`version_filter.type` | *GraphQLScalarType* |

Defined in: [constants.ts:1170](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L1170)

___

### SUFFIX\_BUILD

▸ `Const`**SUFFIX_BUILD**(`s`: *string*): *string*

an utility to build suffixes

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`s` | *string* | the string to turn into a suffix    |

**Returns:** *string*

Defined in: [constants.ts:882](https://github.com/onzag/itemize/blob/3efa2a4a/constants.ts#L882)
