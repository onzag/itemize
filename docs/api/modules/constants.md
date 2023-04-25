[@onzag/itemize](../README.md) / [Modules](../modules.md) / constants

# Module: constants

Contains a bunch of constants that are used through the itemize app
while they can be changed it's not truly recommended, this is mainly for
internal usage and to keep configuration and have an idea

## Table of contents

### Interfaces

- [IItemizeConstantsConfig](../interfaces/constants.IItemizeConstantsConfig.md)
- [IOrderByRuleType](../interfaces/constants.IOrderByRuleType.md)

### Type aliases

- [SearchVariants](constants.md#searchvariants)

### Variables

- [ANYONE\_LOGGED\_METAROLE](constants.md#anyone_logged_metarole)
- [ANYONE\_METAROLE](constants.md#anyone_metarole)
- [CACHED\_CURRENCY\_RESPONSE](constants.md#cached_currency_response)
- [CACHED\_SELECTS\_LOCATION\_GLOBAL](constants.md#cached_selects_location_global)
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
- [DATETIME\_FORMAT\_ELASTIC\_NANO](constants.md#datetime_format_elastic_nano)
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
- [JWT\_KEY](constants.md#jwt_key)
- [LAST\_RICH\_TEXT\_CHANGE\_LENGTH](constants.md#last_rich_text_change_length)
- [LOCALE\_I18N](constants.md#locale_i18n)
- [LOCATION\_SEARCH\_I18N](constants.md#location_search_i18n)
- [LOGS\_IDENTIFIER](constants.md#logs_identifier)
- [MAX\_DECIMAL\_COUNT](constants.md#max_decimal_count)
- [MAX\_FIELD\_SIZE](constants.md#max_field_size)
- [MAX\_FILES\_PER\_PROPERTY](constants.md#max_files_per_property)
- [MAX\_FILES\_PER\_REQUEST](constants.md#max_files_per_request)
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
- [MODULE\_AND\_ITEM\_DEF\_CUSTOM\_I18N\_KEY](constants.md#module_and_item_def_custom_i18n_key)
- [MODULE\_AND\_ITEM\_DEF\_I18N](constants.md#module_and_item_def_i18n)
- [MODULE\_AND\_ITEM\_DEF\_I18N\_SEARCHABLE](constants.md#module_and_item_def_i18n_searchable)
- [MODULE\_PREFIX](constants.md#module_prefix)
- [ORDERBY\_NULLS\_PRIORITY](constants.md#orderby_nulls_priority)
- [ORDERBY\_RULE](constants.md#orderby_rule)
- [ORDERBY\_RULE\_DIRECTION](constants.md#orderby_rule_direction)
- [OWNER\_METAROLE](constants.md#owner_metarole)
- [PARENT\_INDEX](constants.md#parent_index)
- [PING\_DATA\_IDENTIFIER](constants.md#ping_data_identifier)
- [PING\_STATUS\_IDENTIFIER](constants.md#ping_status_identifier)
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
- [REPROCESSED\_RESOURCES](constants.md#reprocessed_resources)
- [RESERVED\_ADD\_PROPERTIES](constants.md#reserved_add_properties)
- [RESERVED\_BASE\_PROPERTIES](constants.md#reserved_base_properties)
- [RESERVED\_BASE\_PROPERTIES\_ELASTIC](constants.md#reserved_base_properties_elastic)
- [RESERVED\_CHANGE\_PROPERTIES](constants.md#reserved_change_properties)
- [RESERVED\_GETTER\_LIST\_PROPERTIES](constants.md#reserved_getter_list_properties)
- [RESERVED\_GETTER\_PROPERTIES](constants.md#reserved_getter_properties)
- [ROOT\_REQUIRED\_LOCALE\_I18N](constants.md#root_required_locale_i18n)
- [SEARCH\_DESTRUCTION\_MARKERS\_LOCATION](constants.md#search_destruction_markers_location)
- [SEARCH\_MODE\_MODULE\_PREFIX](constants.md#search_mode_module_prefix)
- [SEARCH\_RECORDS\_CONTAINER\_GQL](constants.md#search_records_container_gql)
- [SEARCH\_RECORD\_GQL](constants.md#search_record_gql)
- [SEARCH\_RECORD\_INPUT\_GQL](constants.md#search_record_input_gql)
- [SECONDARY\_JWT\_KEY](constants.md#secondary_jwt_key)
- [SERVER\_BLOCK\_UNTIL\_REFRESH\_TIME](constants.md#server_block_until_refresh_time)
- [SERVER\_DATA\_IDENTIFIER](constants.md#server_data_identifier)
- [SERVER\_DATA\_MIN\_UPDATE\_TIME](constants.md#server_data_min_update_time)
- [SERVER\_ELASTIC\_CONSISTENCY\_CHECK\_TIME](constants.md#server_elastic_consistency_check_time)
- [SERVER\_ELASTIC\_PING\_INTERVAL\_TIME](constants.md#server_elastic_ping_interval_time)
- [SERVER\_MAPPING\_TIME](constants.md#server_mapping_time)
- [SERVER\_USER\_KICK\_IDENTIFIER](constants.md#server_user_kick_identifier)
- [SQL\_CONSTRAINT\_PREFIX](constants.md#sql_constraint_prefix)
- [STANDARD\_ACCESSIBLE\_RESERVED\_BASE\_PROPERTIES](constants.md#standard_accessible_reserved_base_properties)
- [TIME\_FORMAT](constants.md#time_format)
- [TRACKERS\_INDEX](constants.md#trackers_index)
- [TRACKERS\_REGISTRY\_IDENTIFIER](constants.md#trackers_registry_identifier)
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

Ƭ **SearchVariants**: ``"exact"`` \| ``"from"`` \| ``"to"`` \| ``"location"`` \| ``"radius"`` \| ``"search"`` \| ``"in"`` \| ``"payment-status"`` \| ``"payment-type"``

#### Defined in

[constants.ts:1246](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1246)

## Variables

### ANYONE\_LOGGED\_METAROLE

• **ANYONE\_LOGGED\_METAROLE**: ``"&ANYONE_LOGGED"``

Role that means anyone logged in

#### Defined in

[constants.ts:1470](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1470)

___

### ANYONE\_METAROLE

• **ANYONE\_METAROLE**: ``"&ANYONE"``

Role that means, well, anyone

#### Defined in

[constants.ts:1466](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1466)

___

### CACHED\_CURRENCY\_RESPONSE

• **CACHED\_CURRENCY\_RESPONSE**: ``"CACHED_CURRENCY_RESPONSE"``

An identifier for caching the currency api response
for currency conversion in redis

#### Defined in

[constants.ts:1570](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1570)

___

### CACHED\_SELECTS\_LOCATION\_GLOBAL

• **CACHED\_SELECTS\_LOCATION\_GLOBAL**: ``"CACHED_SELECTS"``

Location for cached selects in the global

#### Defined in

[constants.ts:1585](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1585)

___

### CLASSIC\_BASE\_I18N

• **CLASSIC\_BASE\_I18N**: `string`[]

Standard i18n fields required for properties

#### Defined in

[constants.ts:615](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L615)

___

### CLASSIC\_OPTIONAL\_I18N

• **CLASSIC\_OPTIONAL\_I18N**: `string`[]

Optional i18n fields in properties

#### Defined in

[constants.ts:643](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L643)

___

### CLASSIC\_SEARCH\_BASE\_I18N

• **CLASSIC\_SEARCH\_BASE\_I18N**: `string`[]

Standard i18n fields required for properties when
they are searchable

#### Defined in

[constants.ts:623](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L623)

___

### CLASSIC\_SEARCH\_OPTIONAL\_I18N

• **CLASSIC\_SEARCH\_OPTIONAL\_I18N**: `string`[]

Optional i18n fields in properties when they are
searchable

#### Defined in

[constants.ts:650](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L650)

___

### CLASSIC\_SEARCH\_RANGED\_I18N

• **CLASSIC\_SEARCH\_RANGED\_I18N**: `string`[]

Extended required i18n fields required in properties
when they use a ranged search

#### Defined in

[constants.ts:657](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L657)

___

### CLASSIC\_SEARCH\_RANGED\_OPTIONAL\_I18N

• **CLASSIC\_SEARCH\_RANGED\_OPTIONAL\_I18N**: `string`[]

Extended optional i18n fields required in properties
when they use a ranged search

#### Defined in

[constants.ts:667](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L667)

___

### COMBINED\_INDEX

• **COMBINED\_INDEX**: ``"COMBINED_INDEX"``

#### Defined in

[constants.ts:824](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L824)

___

### CONNECTOR\_SQL\_COLUMN\_ID\_FK\_NAME

• **CONNECTOR\_SQL\_COLUMN\_ID\_FK\_NAME**: ``"MODULE_ID"``

The column name of the foreign key that connects the module table
with the item definition table

#### Defined in

[constants.ts:1029](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1029)

___

### CONNECTOR\_SQL\_COLUMN\_VERSION\_FK\_NAME

• **CONNECTOR\_SQL\_COLUMN\_VERSION\_FK\_NAME**: ``"MODULE_VERSION"``

The column name of the foreign key that connects the module table
with the item definition table

#### Defined in

[constants.ts:1034](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1034)

___

### CREATED\_AT\_INDEX

• **CREATED\_AT\_INDEX**: ``"CREATED_AT_INDEX"``

#### Defined in

[constants.ts:821](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L821)

___

### CREATED\_BY\_INDEX

• **CREATED\_BY\_INDEX**: ``"CREATED_BY_INDEX"``

#### Defined in

[constants.ts:822](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L822)

___

### CURRENCY\_FACTORS\_IDENTIFIER

• **CURRENCY\_FACTORS\_IDENTIFIER**: ``"CURRENCY_FACTORS"``

An identifier for the currency factors and the currency
factor information

#### Defined in

[constants.ts:1544](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1544)

___

### DATETIME\_FORMAT

• **DATETIME\_FORMAT**: ``"YYYY-MM-DD HH:mm:ss.SSSZ"``

The format that dates are expected to have in order to be exchanged
these represent the SQL form, does not support nano date

#### Defined in

[constants.ts:718](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L718)

___

### DATETIME\_FORMAT\_ELASTIC\_NANO

• **DATETIME\_FORMAT\_ELASTIC\_NANO**: ``"yyyy-MM-dd HH:mm:ss.SSSSSSZZZZZ"``

The format with the nano information included, used mainly for elastic
parsing

#### Defined in

[constants.ts:723](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L723)

___

### DATE\_FORMAT

• **DATE\_FORMAT**: ``"YYYY-MM-DD"``

The format date has in order to be exchanged, this is
the SQL form

#### Defined in

[constants.ts:733](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L733)

___

### DELETED\_REGISTRY\_IDENTIFIER

• **DELETED\_REGISTRY\_IDENTIFIER**: ``"DELETED_REGISTRY"``

An identifier for the deleted table information stuff

#### Defined in

[constants.ts:1549](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1549)

___

### DESTRUCTION\_MARKERS\_LOCATION

• **DESTRUCTION\_MARKERS\_LOCATION**: ``"DESTRUCTION_MARKERS"``

Where the destruction markers are located

#### Defined in

[constants.ts:322](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L322)

___

### ENDPOINT\_ERRORS

• **ENDPOINT\_ERRORS**: `Object`

Graphql endpoint errors codes that can be thrown

#### Type declaration

| Name | Type |
| :------ | :------ |
| `BLOCKED` | `string` |
| `CANT_CONNECT` | `string` |
| `FORBIDDEN` | `string` |
| `INTERNAL_SERVER_ERROR` | `string` |
| `INVALID_CREDENTIALS` | `string` |
| `INVALID_DATA_SUBMIT_REFUSED` | `string` |
| `INVALID_INCLUDE` | `string` |
| `INVALID_POLICY` | `string` |
| `INVALID_PROPERTY` | `string` |
| `MUST_BE_LOGGED_IN` | `string` |
| `NOTHING_TO_UPDATE` | `string` |
| `NOT_FOUND` | `string` |
| `TOKEN_EXPIRED` | `string` |
| `UNSPECIFIED` | `string` |
| `USER_BLOCKED` | `string` |
| `USER_EMAIL_TAKEN` | `string` |
| `USER_PHONE_TAKEN` | `string` |
| `USER_REMOVED` | `string` |

#### Defined in

[constants.ts:347](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L347)

___

### EXCLUSION\_STATE\_SUFFIX

• **EXCLUSION\_STATE\_SUFFIX**: `string`

The suffix added to refer to the exclusion state of an include in SQL or graphql

#### Defined in

[constants.ts:1073](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1073)

___

### EXTERNALLY\_ACCESSIBLE\_RESERVED\_BASE\_PROPERTIES

• **EXTERNALLY\_ACCESSIBLE\_RESERVED\_BASE\_PROPERTIES**: `string`[]

Graphql values come in a DATA form, because they can be blocked
however some attributes are meant to leak and be externally accessible
these atrributes can only be accessed outside of it

#### Defined in

[constants.ts:687](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L687)

___

### FILE\_SUPPORTED\_IMAGE\_TYPES

• **FILE\_SUPPORTED\_IMAGE\_TYPES**: `string`[]

Supported image types

#### Defined in

[constants.ts:265](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L265)

___

### GUEST\_METAROLE

• **GUEST\_METAROLE**: ``"&GUEST"``

Role that means any guest

#### Defined in

[constants.ts:1474](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1474)

___

### INCLUDE\_PREFIX

• **INCLUDE\_PREFIX**: `string`

Every include when used within the database or graphql is prefixed with

#### Defined in

[constants.ts:1057](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1057)

___

### ITEM\_CALLOUT\_EXCLUDED\_I18N

• **ITEM\_CALLOUT\_EXCLUDED\_I18N**: `string`[]

The properties for i18n a callout excluded item should have

#### Defined in

[constants.ts:315](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L315)

___

### ITEM\_CAN\_BE\_EXCLUDED\_I18N

• **ITEM\_CAN\_BE\_EXCLUDED\_I18N**: `string`[]

The properties for i18n an item that can be excluded should have

#### Defined in

[constants.ts:297](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L297)

___

### ITEM\_DEFINITION\_PREFIX

• **ITEM\_DEFINITION\_PREFIX**: `string`

Every item definition when used within the database, graphql or its qualified name is prefixed with

#### Defined in

[constants.ts:1069](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1069)

___

### ITEM\_OPTIONAL\_I18N

• **ITEM\_OPTIONAL\_I18N**: `string`[]

The item optional data

#### Defined in

[constants.ts:308](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L308)

___

### JWT\_KEY

• **JWT\_KEY**: ``"JWT_KEY"``

Key for the registry where the jwt key is stored

#### Defined in

[constants.ts:1575](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1575)

___

### LAST\_RICH\_TEXT\_CHANGE\_LENGTH

• **LAST\_RICH\_TEXT\_CHANGE\_LENGTH**: ``"LAST_RICH_TEXT_CHANGE_LENGTH"``

Store a last rich text change size global to use to save memory for lenght calculation

#### Defined in

[constants.ts:342](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L342)

___

### LOCALE\_I18N

• **LOCALE\_I18N**: `string`[]

This is for small use anywhere language data

#### Defined in

[constants.ts:386](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L386)

___

### LOCATION\_SEARCH\_I18N

• **LOCATION\_SEARCH\_I18N**: `string`[]

Extended i18n fields required in properties
when they use a location search

#### Defined in

[constants.ts:675](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L675)

___

### LOGS\_IDENTIFIER

• **LOGS\_IDENTIFIER**: ``"LOGS"``

Used for logging, usually as a temporary solution

#### Defined in

[constants.ts:1564](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1564)

___

### MAX\_DECIMAL\_COUNT

• **MAX\_DECIMAL\_COUNT**: ``6``

Defines how many decimal points are supported, for the sake of usability
the number is set to a precision of 6

#### Defined in

[constants.ts:159](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L159)

___

### MAX\_FIELD\_SIZE

• **MAX\_FIELD\_SIZE**: `number`

Another just a security concern, this
is the size of the graphql query, 1MB should be way more than enough for a graphql query

#### Defined in

[constants.ts:206](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L206)

___

### MAX\_FILES\_PER\_PROPERTY

• **MAX\_FILES\_PER\_PROPERTY**: `number`

how many files can be used in one item field at once

#### Defined in

[constants.ts:193](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L193)

___

### MAX\_FILES\_PER\_REQUEST

• **MAX\_FILES\_PER\_REQUEST**: `number`

how many files can there be total
in a single request, this is more of a security concern

#### Defined in

[constants.ts:198](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L198)

___

### MAX\_FILE\_SIZE

• **MAX\_FILE\_SIZE**: `number`

The max file size (for either images and binary files)

#### Defined in

[constants.ts:189](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L189)

___

### MAX\_RAW\_TEXT\_LENGTH

• **MAX\_RAW\_TEXT\_LENGTH**: `number`

Defines how many characters (yes characters) a text might have max
please define maxLenght in the property itself for specific checking
this check is expensive so checking twice is not good

#### Defined in

[constants.ts:185](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L185)

___

### MAX\_REMOTE\_LISTENERS\_PER\_SOCKET

• **MAX\_REMOTE\_LISTENERS\_PER\_SOCKET**: `number`

The maximum amount of remote listeners a socket supports

#### Defined in

[constants.ts:252](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L252)

___

### MAX\_SEARCH\_FIELD\_LENGTH

• **MAX\_SEARCH\_FIELD\_LENGTH**: `number`

Size in characters of the search field

#### Defined in

[constants.ts:220](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L220)

___

### MAX\_SEARCH\_RECORDS\_DEFAULT

• **MAX\_SEARCH\_RECORDS\_DEFAULT**: `number`

how many search results can be retrieved at once these are
used for the actual search results

#### Defined in

[constants.ts:216](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L216)

___

### MAX\_SEARCH\_RESULTS\_DEFAULT

• **MAX\_SEARCH\_RESULTS\_DEFAULT**: `number`

how many search results can be retrieved at once these are
used for the actual search results

#### Defined in

[constants.ts:211](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L211)

___

### MAX\_STRING\_LENGTH

• **MAX\_STRING\_LENGTH**: `number`

Defines how many characters a string might have

#### Defined in

[constants.ts:179](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L179)

___

### MAX\_SUPPORTED\_INTEGER

• **MAX\_SUPPORTED\_INTEGER**: ``2147483647``

Defines the max supported integer, it should match up the database

#### Defined in

[constants.ts:150](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L150)

___

### MAX\_SUPPORTED\_REAL

• **MAX\_SUPPORTED\_REAL**: ``999999999``

Defines how big can decimal numbers get

#### Defined in

[constants.ts:163](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L163)

___

### MAX\_SUPPORTED\_YEAR

• **MAX\_SUPPORTED\_YEAR**: `number`

Years max

#### Defined in

[constants.ts:171](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L171)

___

### MEMCACHED\_DESTRUCTION\_MARKERS\_LOCATION

• **MEMCACHED\_DESTRUCTION\_MARKERS\_LOCATION**: `string`

Where destruction markers get memory cached

#### Defined in

[constants.ts:332](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L332)

___

### MEMCACHED\_SEARCH\_DESTRUCTION\_MARKERS\_LOCATION

• **MEMCACHED\_SEARCH\_DESTRUCTION\_MARKERS\_LOCATION**: `string`

Where destruction markers get memory cached

#### Defined in

[constants.ts:337](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L337)

___

### MIN\_SUPPORTED\_INTEGER

• **MIN\_SUPPORTED\_INTEGER**: `number` = `-MAX_SUPPORTED_INTEGER`

Defines the min supported integer, it should match up the database too

#### Defined in

[constants.ts:154](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L154)

___

### MIN\_SUPPORTED\_REAL

• **MIN\_SUPPORTED\_REAL**: ``-999999999``

Defines how small can decimal numbers get

#### Defined in

[constants.ts:167](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L167)

___

### MIN\_SUPPORTED\_YEAR

• **MIN\_SUPPORTED\_YEAR**: ``0``

Years min

#### Defined in

[constants.ts:175](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L175)

___

### MODULE\_AND\_ITEM\_DEF\_CUSTOM\_I18N\_KEY

• **MODULE\_AND\_ITEM\_DEF\_CUSTOM\_I18N\_KEY**: ``"custom"``

The custom key as it is stored in the built file, the custom key
is always custom in the properties

#### Defined in

[constants.ts:292](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L292)

___

### MODULE\_AND\_ITEM\_DEF\_I18N

• **MODULE\_AND\_ITEM\_DEF\_I18N**: `string`[]

The properties for i18n a module should have

#### Defined in

[constants.ts:276](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L276)

___

### MODULE\_AND\_ITEM\_DEF\_I18N\_SEARCHABLE

• **MODULE\_AND\_ITEM\_DEF\_I18N\_SEARCHABLE**: `string`[]

The properties for i18n a searchable module and item definition should have

#### Defined in

[constants.ts:282](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L282)

___

### MODULE\_PREFIX

• **MODULE\_PREFIX**: `string`

Every module when used within the database, graphql or its qualified name is prefixed with

#### Defined in

[constants.ts:1061](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1061)

___

### ORDERBY\_NULLS\_PRIORITY

• **ORDERBY\_NULLS\_PRIORITY**: `GraphQLEnumType`

And this is for the order by rule enum nulls

#### Defined in

[constants.ts:1225](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1225)

___

### ORDERBY\_RULE

• **ORDERBY\_RULE**: `GraphQLInputObjectType`

#### Defined in

[constants.ts:1230](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1230)

___

### ORDERBY\_RULE\_DIRECTION

• **ORDERBY\_RULE\_DIRECTION**: `GraphQLEnumType`

And this is for the order by rule enum

#### Defined in

[constants.ts:1217](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1217)

___

### OWNER\_METAROLE

• **OWNER\_METAROLE**: ``"&OWNER"``

Role that means the owner of this item

#### Defined in

[constants.ts:1462](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1462)

___

### PARENT\_INDEX

• **PARENT\_INDEX**: ``"PARENT_INDEX"``

#### Defined in

[constants.ts:823](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L823)

___

### PING\_DATA\_IDENTIFIER

• **PING\_DATA\_IDENTIFIER**: ``"ping_data"``

An identifier for the ping information

#### Defined in

[constants.ts:1531](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1531)

___

### PING\_STATUS\_IDENTIFIER

• **PING\_STATUS\_IDENTIFIER**: ``"ping_status"``

#### Defined in

[constants.ts:1532](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1532)

___

### POLICY\_OPTIONAL\_I18N

• **POLICY\_OPTIONAL\_I18N**: `string`[]

Policies can also recieve an optional description

#### Defined in

[constants.ts:1123](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1123)

___

### POLICY\_PREFIXES

• **POLICY\_PREFIXES**: `Object`

The policy prefixes for all the policies that are available within itemize
in order to create complex rules

#### Type declaration

| Name | Type |
| :------ | :------ |
| `delete` | `string` |
| `edit` | `string` |
| `parent` | `string` |
| `read` | `string` |

#### Defined in

[constants.ts:1106](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1106)

___

### POLICY\_REQUIRED\_I18N

• **POLICY\_REQUIRED\_I18N**: `string`[]

The required i18n fields to require for a policy
policies get a title that should be human readable in
the given language, and a fail error message for when they fail

#### Defined in

[constants.ts:1117](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1117)

___

### PREFIX\_ADD

• **PREFIX\_ADD**: `string`

The prefix used in the graphql endpoint for adding item definitions

#### Defined in

[constants.ts:1093](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1093)

___

### PREFIX\_DELETE

• **PREFIX\_DELETE**: `string`

The prefix used in the graphql endpoint for deleting item definitions

#### Defined in

[constants.ts:1101](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1101)

___

### PREFIX\_EDIT

• **PREFIX\_EDIT**: `string`

The prefix used in the graphql endpoint for editing item definitions

#### Defined in

[constants.ts:1097](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1097)

___

### PREFIX\_GET

• **PREFIX\_GET**: `string`

The prefix used in the graphql endpoint for getting item definitions

#### Defined in

[constants.ts:1085](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1085)

___

### PREFIX\_GET\_LIST

• **PREFIX\_GET\_LIST**: `string`

The prefix used in the graphql endpoint for getting lists of item definitions and modules

#### Defined in

[constants.ts:1089](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1089)

___

### PREFIX\_SEARCH

• **PREFIX\_SEARCH**: `string`

The prefix used in the graphql endpoint for searches of modules and item definitions

#### Defined in

[constants.ts:1077](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1077)

___

### PREFIX\_TRADITIONAL\_SEARCH

• **PREFIX\_TRADITIONAL\_SEARCH**: `string`

The prefix used in the graphql endpoint for searches of modules and item definitions in traditional mode

#### Defined in

[constants.ts:1081](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1081)

___

### PROTECTED\_RESOURCES

• **PROTECTED\_RESOURCES**: `string`[]

Resources that are protected from fetching without specifying the devkey

#### Defined in

[constants.ts:1514](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1514)

___

### PROTECTED\_USERNAMES

• **PROTECTED\_USERNAMES**: `string`[]

The protected usernames that cannot be taken by the users

#### Defined in

[constants.ts:257](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L257)

___

### REDUCED\_BASE\_I18N

• **REDUCED\_BASE\_I18N**: `string`[]

Reduced i18n required for properties

#### Defined in

[constants.ts:630](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L630)

___

### REDUCED\_SEARCH\_BASE\_I18N

• **REDUCED\_SEARCH\_BASE\_I18N**: `string`[]

Reduced i18n required for properties when
they are searchable

#### Defined in

[constants.ts:637](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L637)

___

### REGISTRY\_IDENTIFIER

• **REGISTRY\_IDENTIFIER**: ``"REGISTRY"``

An identifier for the internal global registry

#### Defined in

[constants.ts:1559](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1559)

___

### REPROCESSED\_RESOURCES

• **REPROCESSED\_RESOURCES**: `string`[]

#### Defined in

[constants.ts:1518](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1518)

___

### RESERVED\_ADD\_PROPERTIES

• **RESERVED\_ADD\_PROPERTIES**: `Object`

Properties required in order to add something

#### Type declaration

| Name | Type |
| :------ | :------ |
| `container_id` | `Object` |
| `container_id.description` | `string` |
| `container_id.type` | `GraphQLNonNull`<`GraphQLNullableType`\> |
| `for_id` | `Object` |
| `for_id.description` | `string` |
| `for_id.type` | `GraphQLScalarType` |
| `in_behalf_of` | `Object` |
| `in_behalf_of.description` | `string` |
| `in_behalf_of.type` | `GraphQLScalarType` |
| `language` | `Object` |
| `language.description` | `string` |
| `language.type` | `GraphQLNonNull`<`GraphQLNullableType`\> |
| `listener_uuid` | `Object` |
| `listener_uuid.description` | `string` |
| `listener_uuid.type` | `GraphQLScalarType` |
| `parent_id` | `Object` |
| `parent_id.description` | `string` |
| `parent_id.type` | `GraphQLScalarType` |
| `parent_type` | `Object` |
| `parent_type.description` | `string` |
| `parent_type.type` | `GraphQLScalarType` |
| `parent_version` | `Object` |
| `parent_version.description` | `string` |
| `parent_version.type` | `GraphQLScalarType` |
| `token` | `Object` |
| `token.description` | `string` |
| `token.type` | `GraphQLScalarType` |
| `version` | `Object` |
| `version.description` | `string` |
| `version.type` | `GraphQLScalarType` |

#### Defined in

[constants.ts:1421](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1421)

___

### RESERVED\_BASE\_PROPERTIES

• **RESERVED\_BASE\_PROPERTIES**: [`IGQLFieldsDefinitionType`](../interfaces/base_Root_gql.IGQLFieldsDefinitionType.md)

The reserved base properties that are exists within every graphql query
and should mirror the database

#### Defined in

[constants.ts:739](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L739)

___

### RESERVED\_BASE\_PROPERTIES\_ELASTIC

• **RESERVED\_BASE\_PROPERTIES\_ELASTIC**: [`IElasticIndexDefinitionType`](../interfaces/base_Root_sql.IElasticIndexDefinitionType.md)

#### Defined in

[constants.ts:951](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L951)

___

### RESERVED\_CHANGE\_PROPERTIES

• **RESERVED\_CHANGE\_PROPERTIES**: `Object`

Properties required in order to change something
either edit or delete

#### Type declaration

| Name | Type |
| :------ | :------ |
| `blocked` | `Object` |
| `blocked.description` | `string` |
| `blocked.type` | `GraphQLScalarType` |
| `blocked_reason` | `Object` |
| `blocked_reason.description` | `string` |
| `blocked_reason.type` | `GraphQLScalarType` |
| `blocked_until` | `Object` |
| `blocked_until.description` | `string` |
| `blocked_until.type` | `GraphQLScalarType` |
| `id` | `Object` |
| `id.description` | `string` |
| `id.type` | `GraphQLNonNull`<`GraphQLNullableType`\> |
| `language` | `Object` |
| `language.description` | `string` |
| `language.type` | `GraphQLNonNull`<`GraphQLNullableType`\> |
| `listener_uuid` | `Object` |
| `listener_uuid.description` | `string` |
| `listener_uuid.type` | `GraphQLScalarType` |
| `parent_id` | `Object` |
| `parent_id.description` | `string` |
| `parent_id.type` | `GraphQLScalarType` |
| `parent_type` | `Object` |
| `parent_type.description` | `string` |
| `parent_type.type` | `GraphQLScalarType` |
| `parent_version` | `Object` |
| `parent_version.description` | `string` |
| `parent_version.type` | `GraphQLScalarType` |
| `token` | `Object` |
| `token.description` | `string` |
| `token.type` | `GraphQLScalarType` |
| `version` | `Object` |
| `version.description` | `string` |
| `version.type` | `GraphQLScalarType` |

#### Defined in

[constants.ts:1358](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1358)

___

### RESERVED\_GETTER\_LIST\_PROPERTIES

• **RESERVED\_GETTER\_LIST\_PROPERTIES**: `Object`

Properties required in order to get a list

#### Type declaration

| Name | Type |
| :------ | :------ |
| `created_by` | `Object` |
| `created_by.description` | `string` |
| `created_by.type` | `GraphQLScalarType` |
| `language` | `Object` |
| `language.description` | `string` |
| `language.type` | `GraphQLNonNull`<`GraphQLNullableType`\> |
| `records` | `Object` |
| `records.description` | `string` |
| `records.type` | `GraphQLNonNull`<`GraphQLNullableType`\> |
| `search` | `Object` |
| `search.description` | `string` |
| `search.type` | `GraphQLScalarType` |
| `searchengine` | `Object` |
| `searchengine.description` | `string` |
| `searchengine.type` | `GraphQLScalarType` |
| `searchengine_language` | `Object` |
| `searchengine_language.description` | `string` |
| `searchengine_language.type` | `GraphQLScalarType` |
| `token` | `Object` |
| `token.description` | `string` |
| `token.type` | `GraphQLScalarType` |

#### Defined in

[constants.ts:1393](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1393)

___

### RESERVED\_GETTER\_PROPERTIES

• **RESERVED\_GETTER\_PROPERTIES**: `Object`

Properties required in order to get

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `Object` |
| `id.description` | `string` |
| `id.type` | `GraphQLNonNull`<`GraphQLNullableType`\> |
| `language` | `Object` |
| `language.description` | `string` |
| `language.type` | `GraphQLNonNull`<`GraphQLNullableType`\> |
| `token` | `Object` |
| `token.description` | `string` |
| `token.type` | `GraphQLScalarType` |
| `version` | `Object` |
| `version.description` | `string` |
| `version.type` | `GraphQLScalarType` |

#### Defined in

[constants.ts:1342](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1342)

___

### ROOT\_REQUIRED\_LOCALE\_I18N

• **ROOT\_REQUIRED\_LOCALE\_I18N**: `string`[]

Root required i18n properties

#### Defined in

[constants.ts:606](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L606)

___

### SEARCH\_DESTRUCTION\_MARKERS\_LOCATION

• **SEARCH\_DESTRUCTION\_MARKERS\_LOCATION**: ``"SEARCH_DESTRUCTION_MARKERS"``

Where the destruction markers are located

#### Defined in

[constants.ts:327](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L327)

___

### SEARCH\_MODE\_MODULE\_PREFIX

• **SEARCH\_MODE\_MODULE\_PREFIX**: `string`

The search mode module is prefixed with

#### Defined in

[constants.ts:1065](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1065)

___

### SEARCH\_RECORDS\_CONTAINER\_GQL

• **SEARCH\_RECORDS\_CONTAINER\_GQL**: `GraphQLObjectType`<`any`, `any`, { [key: string]: `any`;  }\>

The id container contains the way that search results are returned
with the records and the last record of the given records

#### Defined in

[constants.ts:1165](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1165)

___

### SEARCH\_RECORD\_GQL

• **SEARCH\_RECORD\_GQL**: `GraphQLObjectType`<`any`, `any`, { [key: string]: `any`;  }\>

The ID element in graphql form

#### Defined in

[constants.ts:1149](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1149)

___

### SEARCH\_RECORD\_INPUT\_GQL

• **SEARCH\_RECORD\_INPUT\_GQL**: `GraphQLInputObjectType`

The ID element as input form

#### Defined in

[constants.ts:1156](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1156)

___

### SECONDARY\_JWT\_KEY

• **SECONDARY\_JWT\_KEY**: ``"SECONDARY_JWT_KEY"``

Key for the registry where the secondary jwt key is stored

#### Defined in

[constants.ts:1580](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1580)

___

### SERVER\_BLOCK\_UNTIL\_REFRESH\_TIME

• **SERVER\_BLOCK\_UNTIL\_REFRESH\_TIME**: `number`

The time it takes for blocks to be refreshed, the blocks represent the blocked_at and blocked_until functionality
that automatically gets removed

#### Defined in

[constants.ts:237](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L237)

___

### SERVER\_DATA\_IDENTIFIER

• **SERVER\_DATA\_IDENTIFIER**: ``"SERVER_DATA"``

An identifier for the server data

#### Defined in

[constants.ts:1526](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1526)

___

### SERVER\_DATA\_MIN\_UPDATE\_TIME

• **SERVER\_DATA\_MIN\_UPDATE\_TIME**: `number`

The minimum update time for the server data to be changed
basically runs mantenience functions, mainly it's about
updating the currency information

#### Defined in

[constants.ts:226](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L226)

___

### SERVER\_ELASTIC\_CONSISTENCY\_CHECK\_TIME

• **SERVER\_ELASTIC\_CONSISTENCY\_CHECK\_TIME**: `number`

The time it takes to run a cleanup process into the elastic instance

#### Defined in

[constants.ts:242](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L242)

___

### SERVER\_ELASTIC\_PING\_INTERVAL\_TIME

• **SERVER\_ELASTIC\_PING\_INTERVAL\_TIME**: `number`

The time to inform ping information

#### Defined in

[constants.ts:247](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L247)

___

### SERVER\_MAPPING\_TIME

• **SERVER\_MAPPING\_TIME**: `number`

The time it takes for sitemaps to be refreshed

#### Defined in

[constants.ts:231](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L231)

___

### SERVER\_USER\_KICK\_IDENTIFIER

• **SERVER\_USER\_KICK\_IDENTIFIER**: ``"SERVER_KICK"``

An identifier from when the server kicks an user from the
login (aka sudden remote logout)

#### Defined in

[constants.ts:1538](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1538)

___

### SQL\_CONSTRAINT\_PREFIX

• **SQL\_CONSTRAINT\_PREFIX**: `string`

Used for creation of sql contraints

#### Defined in

[constants.ts:1053](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1053)

___

### STANDARD\_ACCESSIBLE\_RESERVED\_BASE\_PROPERTIES

• **STANDARD\_ACCESSIBLE\_RESERVED\_BASE\_PROPERTIES**: `string`[]

These attributes are however protected, they exist only within
the DATA field

#### Defined in

[constants.ts:702](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L702)

___

### TIME\_FORMAT

• **TIME\_FORMAT**: ``"HH:mm:ss"``

The format that time is expected to have in order to be exchanged
this is the SQL form

#### Defined in

[constants.ts:728](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L728)

___

### TRACKERS\_INDEX

• **TRACKERS\_INDEX**: ``"TRACKERS_INDEX"``

#### Defined in

[constants.ts:825](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L825)

___

### TRACKERS\_REGISTRY\_IDENTIFIER

• **TRACKERS\_REGISTRY\_IDENTIFIER**: ``"TRACKERS_REGISTRY"``

An identifier for the trackers table information stuff

#### Defined in

[constants.ts:1554](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1554)

___

### UNIT\_SUBTYPES

• **UNIT\_SUBTYPES**: `string`[]

Units that are allowed within the itemize application these
are for the unit subtype

#### Defined in

[constants.ts:1480](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1480)

___

### UNSPECIFIED\_OWNER

• **UNSPECIFIED\_OWNER**: ``"UNSPECIFIED"``

When an owner is not specified, this is the value it holds
null is the user value of &GUEST hence it should not hold
the same value

#### Defined in

[constants.ts:1509](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1509)

___

### USER\_EXTRA\_CUSTOM\_I18N

• **USER\_EXTRA\_CUSTOM\_I18N**: `string`[]

Extra i18n properties that are used for the generation
of the validation email and the recovery email

#### Defined in

[constants.ts:372](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L372)

## Functions

### PREFIXED\_CONCAT

▸ `Const` **PREFIXED_CONCAT**(...`args`): `string`

an utility to concat prefixes

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...args` | `string`[] | the string list to concat |

#### Returns

`string`

#### Defined in

[constants.ts:1049](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1049)

___

### PREFIX\_BUILD

▸ `Const` **PREFIX_BUILD**(`s`): `string`

an utility to build prefixes

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `s` | `string` | the string to turn into a prefix |

#### Returns

`string`

#### Defined in

[constants.ts:1039](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1039)

___

### RESERVED\_BASE\_PROPERTIES\_SQL

▸ `Const` **RESERVED_BASE_PROPERTIES_SQL**(`combinedIndexes`, `addedIndexes`): [`ISQLTableDefinitionType`](../interfaces/base_Root_sql.ISQLTableDefinitionType.md)

The reserved base properties but in SQL form

#### Parameters

| Name | Type |
| :------ | :------ |
| `combinedIndexes` | `string`[] |
| `addedIndexes` | `string`[] |

#### Returns

[`ISQLTableDefinitionType`](../interfaces/base_Root_sql.ISQLTableDefinitionType.md)

#### Defined in

[constants.ts:830](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L830)

___

### RESERVED\_IDEF\_SEARCH\_PROPERTIES

▸ `Const` **RESERVED_IDEF_SEARCH_PROPERTIES**(`orderByRule`): `Object`

The reserved search properties represent how searches are done
and these are included in every search

#### Parameters

| Name | Type |
| :------ | :------ |
| `orderByRule` | `any` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `created_by` | `Object` |
| `created_by.description` | `string` |
| `created_by.type` | `GraphQLScalarType` |
| `language` | `Object` |
| `language.description` | `string` |
| `language.type` | `GraphQLNonNull`<`GraphQLNullableType`\> |
| `limit` | `Object` |
| `limit.description` | `string` |
| `limit.type` | `GraphQLNonNull`<`GraphQLNullableType`\> |
| `offset` | `Object` |
| `offset.description` | `string` |
| `offset.type` | `GraphQLNonNull`<`GraphQLNullableType`\> |
| `order_by` | `Object` |
| `order_by.description` | `string` |
| `order_by.type` | `GraphQLNonNull`<`GraphQLNullableType`\> |
| `parent_id` | `Object` |
| `parent_id.description` | `string` |
| `parent_id.type` | `GraphQLScalarType` |
| `parent_type` | `Object` |
| `parent_type.description` | `string` |
| `parent_type.type` | `GraphQLScalarType` |
| `parent_version` | `Object` |
| `parent_version.description` | `string` |
| `parent_version.type` | `GraphQLScalarType` |
| `search` | `Object` |
| `search.description` | `string` |
| `search.type` | `GraphQLScalarType` |
| `searchengine` | `Object` |
| `searchengine.description` | `string` |
| `searchengine.type` | `GraphQLScalarType` |
| `searchengine_language` | `Object` |
| `searchengine_language.description` | `string` |
| `searchengine_language.type` | `GraphQLScalarType` |
| `since` | `Object` |
| `since.description` | `string` |
| `since.type` | `GraphQLScalarType` |
| `token` | `Object` |
| `token.description` | `string` |
| `token.type` | `GraphQLScalarType` |
| `version_filter` | `Object` |
| `version_filter.description` | `string` |
| `version_filter.type` | `GraphQLScalarType` |

#### Defined in

[constants.ts:1275](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1275)

___

### RESERVED\_MODULE\_SEARCH\_PROPERTIES

▸ `Const` **RESERVED_MODULE_SEARCH_PROPERTIES**(`orderByRule`): `Object`

These apply when doing module searches

#### Parameters

| Name | Type |
| :------ | :------ |
| `orderByRule` | `any` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `created_by` | `Object` |
| `created_by.description` | `string` |
| `created_by.type` | `GraphQLScalarType` |
| `language` | `Object` |
| `language.description` | `string` |
| `language.type` | `GraphQLNonNull`<`GraphQLNullableType`\> |
| `limit` | `Object` |
| `limit.description` | `string` |
| `limit.type` | `GraphQLNonNull`<`GraphQLNullableType`\> |
| `offset` | `Object` |
| `offset.description` | `string` |
| `offset.type` | `GraphQLNonNull`<`GraphQLNullableType`\> |
| `order_by` | `Object` |
| `order_by.description` | `string` |
| `order_by.type` | `GraphQLNonNull`<`GraphQLNullableType`\> |
| `parent_id` | `Object` |
| `parent_id.description` | `string` |
| `parent_id.type` | `GraphQLScalarType` |
| `parent_type` | `Object` |
| `parent_type.description` | `string` |
| `parent_type.type` | `GraphQLScalarType` |
| `parent_version` | `Object` |
| `parent_version.description` | `string` |
| `parent_version.type` | `GraphQLScalarType` |
| `search` | `Object` |
| `search.description` | `string` |
| `search.type` | `GraphQLScalarType` |
| `searchengine` | `Object` |
| `searchengine.description` | `string` |
| `searchengine.type` | `GraphQLScalarType` |
| `searchengine_language` | `Object` |
| `searchengine_language.description` | `string` |
| `searchengine_language.type` | `GraphQLScalarType` |
| `since` | `Object` |
| `since.description` | `string` |
| `since.type` | `GraphQLScalarType` |
| `token` | `Object` |
| `token.description` | `string` |
| `token.type` | `GraphQLScalarType` |
| `types` | `Object` |
| `types.description` | `string` |
| `types.type` | `GraphQLList`<`GraphQLType`\> |
| `version_filter` | `Object` |
| `version_filter.description` | `string` |
| `version_filter.type` | `GraphQLScalarType` |

#### Defined in

[constants.ts:1331](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1331)

___

### SUFFIX\_BUILD

▸ `Const` **SUFFIX_BUILD**(`s`): `string`

an utility to build suffixes

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `s` | `string` | the string to turn into a suffix |

#### Returns

`string`

#### Defined in

[constants.ts:1044](https://github.com/onzag/itemize/blob/f2db74a5/constants.ts#L1044)
