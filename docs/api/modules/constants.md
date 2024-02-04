[@onzag/itemize](../README.md) / [Modules](../modules.md) / constants

# Module: constants

Contains a bunch of constants that are used through the itemize app
while they can be changed it's not truly recommended, this is mainly for
internal usage and to keep configuration and have an idea

## Table of contents

### Interfaces

- [IItemizeConstantsConfig](../interfaces/constants.IItemizeConstantsConfig.md)
- [IOrderByRuleType](../interfaces/constants.IOrderByRuleType.md)

### Type Aliases

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
- [MEMCACHED\_UNMOUNT\_DESTRUCTION\_MARKERS\_LOCATION](constants.md#memcached_unmount_destruction_markers_location)
- [MEMCACHED\_UNMOUNT\_SEARCH\_DESTRUCTION\_MARKERS\_LOCATION](constants.md#memcached_unmount_search_destruction_markers_location)
- [MIN\_SUPPORTED\_INTEGER](constants.md#min_supported_integer)
- [MIN\_SUPPORTED\_REAL](constants.md#min_supported_real)
- [MIN\_SUPPORTED\_YEAR](constants.md#min_supported_year)
- [MODULE\_AND\_ITEM\_DEF\_CUSTOM\_I18N\_KEY](constants.md#module_and_item_def_custom_i18n_key)
- [MODULE\_AND\_ITEM\_DEF\_I18N](constants.md#module_and_item_def_i18n)
- [MODULE\_AND\_ITEM\_DEF\_I18N\_SEARCHABLE](constants.md#module_and_item_def_i18n_searchable)
- [MODULE\_PREFIX](constants.md#module_prefix)
- [ORDERBY\_NULLS\_PRIORITY\_RQ](constants.md#orderby_nulls_priority_rq)
- [ORDERBY\_RULE\_DIRECTION\_RQ](constants.md#orderby_rule_direction_rq)
- [ORDERBY\_RULE\_RQ](constants.md#orderby_rule_rq)
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
- [RESERVED\_ADD\_PROPERTIES\_RQ](constants.md#reserved_add_properties_rq)
- [RESERVED\_BASE\_PROPERTIES\_ELASTIC](constants.md#reserved_base_properties_elastic)
- [RESERVED\_BASE\_PROPERTIES\_RQ](constants.md#reserved_base_properties_rq)
- [RESERVED\_CHANGE\_PROPERTIES\_RQ](constants.md#reserved_change_properties_rq)
- [RESERVED\_GETTER\_LIST\_PROPERTIES\_RQ](constants.md#reserved_getter_list_properties_rq)
- [RESERVED\_GETTER\_PROPERTIES\_RQ](constants.md#reserved_getter_properties_rq)
- [ROOT\_REQUIRED\_LOCALE\_I18N](constants.md#root_required_locale_i18n)
- [SEARCHENGINE\_MAX\_HIGHLIGHT\_FRAMENT\_SIZE](constants.md#searchengine_max_highlight_frament_size)
- [SEARCH\_DESTRUCTION\_MARKERS\_LOCATION](constants.md#search_destruction_markers_location)
- [SEARCH\_MODE\_MODULE\_PREFIX](constants.md#search_mode_module_prefix)
- [SEARCH\_RECORDS\_CONTAINER\_RQ](constants.md#search_records_container_rq)
- [SEARCH\_RECORD\_RQ](constants.md#search_record_rq)
- [SEARCH\_RECORD\_RQ\_ARG](constants.md#search_record_rq_arg)
- [SECONDARY\_JWT\_KEY](constants.md#secondary_jwt_key)
- [SERVER\_BLOCK\_UNTIL\_REFRESH\_TIME](constants.md#server_block_until_refresh_time)
- [SERVER\_DATA\_IDENTIFIER](constants.md#server_data_identifier)
- [SERVER\_DATA\_MIN\_UPDATE\_TIME](constants.md#server_data_min_update_time)
- [SERVER\_ELASTIC\_CONSISTENCY\_CHECK\_TIME](constants.md#server_elastic_consistency_check_time)
- [SERVER\_ELASTIC\_PING\_INTERVAL\_TIME](constants.md#server_elastic_ping_interval_time)
- [SERVER\_USER\_KICK\_IDENTIFIER](constants.md#server_user_kick_identifier)
- [SQL\_CONSTRAINT\_PREFIX](constants.md#sql_constraint_prefix)
- [STANDARD\_ACCESSIBLE\_RESERVED\_BASE\_PROPERTIES](constants.md#standard_accessible_reserved_base_properties)
- [TIME\_FORMAT](constants.md#time_format)
- [TRACKERS\_INDEX](constants.md#trackers_index)
- [TRACKERS\_REGISTRY\_IDENTIFIER](constants.md#trackers_registry_identifier)
- [UNIT\_SUBTYPES](constants.md#unit_subtypes)
- [UNMOUNT\_DESTRUCTION\_MARKERS\_LOCATION](constants.md#unmount_destruction_markers_location)
- [UNMOUNT\_SEARCH\_DESTRUCTION\_MARKERS\_LOCATION](constants.md#unmount_search_destruction_markers_location)
- [UNSPECIFIED\_OWNER](constants.md#unspecified_owner)
- [USER\_EXTRA\_CUSTOM\_I18N](constants.md#user_extra_custom_i18n)

### Functions

- [PREFIXED\_CONCAT](constants.md#prefixed_concat)
- [PREFIX\_BUILD](constants.md#prefix_build)
- [RESERVED\_BASE\_PROPERTIES\_SQL](constants.md#reserved_base_properties_sql)
- [RESERVED\_IDEF\_SEARCH\_PROPERTIES\_RQ](constants.md#reserved_idef_search_properties_rq)
- [RESERVED\_MODULE\_SEARCH\_PROPERTIES\_RQ](constants.md#reserved_module_search_properties_rq)
- [SUFFIX\_BUILD](constants.md#suffix_build)

## Type Aliases

### SearchVariants

Ƭ **SearchVariants**: ``"exact"`` \| ``"from"`` \| ``"to"`` \| ``"location"`` \| ``"radius"`` \| ``"search"`` \| ``"in"`` \| ``"payment-status"`` \| ``"payment-type"``

#### Defined in

[constants.ts:1268](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1268)

## Variables

### ANYONE\_LOGGED\_METAROLE

• `Const` **ANYONE\_LOGGED\_METAROLE**: ``"&ANYONE_LOGGED"``

Role that means anyone logged in

#### Defined in

[constants.ts:1571](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1571)

___

### ANYONE\_METAROLE

• `Const` **ANYONE\_METAROLE**: ``"&ANYONE"``

Role that means, well, anyone

#### Defined in

[constants.ts:1567](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1567)

___

### CACHED\_CURRENCY\_RESPONSE

• `Const` **CACHED\_CURRENCY\_RESPONSE**: ``"CACHED_CURRENCY_RESPONSE"``

An identifier for caching the currency api response
for currency conversion in redis

#### Defined in

[constants.ts:1671](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1671)

___

### CACHED\_SELECTS\_LOCATION\_GLOBAL

• `Const` **CACHED\_SELECTS\_LOCATION\_GLOBAL**: ``"CACHED_SELECTS"``

Location for cached selects in the global

#### Defined in

[constants.ts:1686](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1686)

___

### CLASSIC\_BASE\_I18N

• `Const` **CLASSIC\_BASE\_I18N**: `string`[]

Standard i18n fields required for properties

#### Defined in

[constants.ts:631](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L631)

___

### CLASSIC\_OPTIONAL\_I18N

• `Const` **CLASSIC\_OPTIONAL\_I18N**: `string`[]

Optional i18n fields in properties

#### Defined in

[constants.ts:659](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L659)

___

### CLASSIC\_SEARCH\_BASE\_I18N

• `Const` **CLASSIC\_SEARCH\_BASE\_I18N**: `string`[]

Standard i18n fields required for properties when
they are searchable

#### Defined in

[constants.ts:639](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L639)

___

### CLASSIC\_SEARCH\_OPTIONAL\_I18N

• `Const` **CLASSIC\_SEARCH\_OPTIONAL\_I18N**: `string`[]

Optional i18n fields in properties when they are
searchable

#### Defined in

[constants.ts:666](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L666)

___

### CLASSIC\_SEARCH\_RANGED\_I18N

• `Const` **CLASSIC\_SEARCH\_RANGED\_I18N**: `string`[]

Extended required i18n fields required in properties
when they use a ranged search

#### Defined in

[constants.ts:673](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L673)

___

### CLASSIC\_SEARCH\_RANGED\_OPTIONAL\_I18N

• `Const` **CLASSIC\_SEARCH\_RANGED\_OPTIONAL\_I18N**: `string`[]

Extended optional i18n fields required in properties
when they use a ranged search

#### Defined in

[constants.ts:683](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L683)

___

### COMBINED\_INDEX

• `Const` **COMBINED\_INDEX**: ``"COMBINED_INDEX"``

#### Defined in

[constants.ts:844](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L844)

___

### CONNECTOR\_SQL\_COLUMN\_ID\_FK\_NAME

• `Const` **CONNECTOR\_SQL\_COLUMN\_ID\_FK\_NAME**: ``"MODULE_ID"``

The column name of the foreign key that connects the module table
with the item definition table

#### Defined in

[constants.ts:1049](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1049)

___

### CONNECTOR\_SQL\_COLUMN\_VERSION\_FK\_NAME

• `Const` **CONNECTOR\_SQL\_COLUMN\_VERSION\_FK\_NAME**: ``"MODULE_VERSION"``

The column name of the foreign key that connects the module table
with the item definition table

#### Defined in

[constants.ts:1054](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1054)

___

### CREATED\_AT\_INDEX

• `Const` **CREATED\_AT\_INDEX**: ``"CREATED_AT_INDEX"``

#### Defined in

[constants.ts:841](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L841)

___

### CREATED\_BY\_INDEX

• `Const` **CREATED\_BY\_INDEX**: ``"CREATED_BY_INDEX"``

#### Defined in

[constants.ts:842](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L842)

___

### CURRENCY\_FACTORS\_IDENTIFIER

• `Const` **CURRENCY\_FACTORS\_IDENTIFIER**: ``"CURRENCY_FACTORS"``

An identifier for the currency factors and the currency
factor information

#### Defined in

[constants.ts:1645](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1645)

___

### DATETIME\_FORMAT

• `Const` **DATETIME\_FORMAT**: ``"YYYY-MM-DD HH:mm:ss.SSSZ"``

The format that dates are expected to have in order to be exchanged
these represent the SQL form, does not support nano date

#### Defined in

[constants.ts:734](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L734)

___

### DATETIME\_FORMAT\_ELASTIC\_NANO

• `Const` **DATETIME\_FORMAT\_ELASTIC\_NANO**: ``"yyyy-MM-dd HH:mm:ss.SSSSSSZZZZZ"``

The format with the nano information included, used mainly for elastic
parsing

#### Defined in

[constants.ts:739](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L739)

___

### DATE\_FORMAT

• `Const` **DATE\_FORMAT**: ``"YYYY-MM-DD"``

The format date has in order to be exchanged, this is
the SQL form

#### Defined in

[constants.ts:749](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L749)

___

### DELETED\_REGISTRY\_IDENTIFIER

• `Const` **DELETED\_REGISTRY\_IDENTIFIER**: ``"DELETED_REGISTRY"``

An identifier for the deleted table information stuff

#### Defined in

[constants.ts:1650](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1650)

___

### DESTRUCTION\_MARKERS\_LOCATION

• `Const` **DESTRUCTION\_MARKERS\_LOCATION**: ``"DESTRUCTION_MARKERS"``

Where the destruction markers are located

#### Defined in

[constants.ts:317](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L317)

___

### ENDPOINT\_ERRORS

• `Const` **ENDPOINT\_ERRORS**: `Object`

Rq endpoint errors codes that can be thrown

#### Type declaration

| Name | Type |
| :------ | :------ |
| `BLOCKED` | `string` |
| `CANT_CONNECT` | `string` |
| `CONFLICT` | `string` |
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

[constants.ts:362](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L362)

___

### EXCLUSION\_STATE\_SUFFIX

• `Const` **EXCLUSION\_STATE\_SUFFIX**: `string`

The suffix added to refer to the exclusion state of an include in SQL or rq

#### Defined in

[constants.ts:1093](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1093)

___

### EXTERNALLY\_ACCESSIBLE\_RESERVED\_BASE\_PROPERTIES

• `Const` **EXTERNALLY\_ACCESSIBLE\_RESERVED\_BASE\_PROPERTIES**: `string`[]

Rq values come in a DATA form, because they can be blocked
however some attributes are meant to leak and be externally accessible
these atrributes can only be accessed outside of it

#### Defined in

[constants.ts:703](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L703)

___

### FILE\_SUPPORTED\_IMAGE\_TYPES

• `Const` **FILE\_SUPPORTED\_IMAGE\_TYPES**: `string`[]

Supported image types

#### Defined in

[constants.ts:260](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L260)

___

### GUEST\_METAROLE

• `Const` **GUEST\_METAROLE**: ``"&GUEST"``

Role that means any guest

#### Defined in

[constants.ts:1575](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1575)

___

### INCLUDE\_PREFIX

• `Const` **INCLUDE\_PREFIX**: `string`

Every include when used within the database or rq is prefixed with

#### Defined in

[constants.ts:1077](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1077)

___

### ITEM\_CALLOUT\_EXCLUDED\_I18N

• `Const` **ITEM\_CALLOUT\_EXCLUDED\_I18N**: `string`[]

The properties for i18n a callout excluded item should have

#### Defined in

[constants.ts:310](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L310)

___

### ITEM\_CAN\_BE\_EXCLUDED\_I18N

• `Const` **ITEM\_CAN\_BE\_EXCLUDED\_I18N**: `string`[]

The properties for i18n an item that can be excluded should have

#### Defined in

[constants.ts:292](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L292)

___

### ITEM\_DEFINITION\_PREFIX

• `Const` **ITEM\_DEFINITION\_PREFIX**: `string`

Every item definition when used within the database, rq or its qualified name is prefixed with

#### Defined in

[constants.ts:1089](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1089)

___

### ITEM\_OPTIONAL\_I18N

• `Const` **ITEM\_OPTIONAL\_I18N**: `string`[]

The item optional data

#### Defined in

[constants.ts:303](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L303)

___

### JWT\_KEY

• `Const` **JWT\_KEY**: ``"JWT_KEY"``

Key for the registry where the jwt key is stored

#### Defined in

[constants.ts:1676](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1676)

___

### LAST\_RICH\_TEXT\_CHANGE\_LENGTH

• `Const` **LAST\_RICH\_TEXT\_CHANGE\_LENGTH**: ``"LAST_RICH_TEXT_CHANGE_LENGTH"``

Store a last rich text change size global to use to save memory for lenght calculation

#### Defined in

[constants.ts:357](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L357)

___

### LOCALE\_I18N

• `Const` **LOCALE\_I18N**: `string`[]

This is for small use anywhere language data

#### Defined in

[constants.ts:402](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L402)

___

### LOCATION\_SEARCH\_I18N

• `Const` **LOCATION\_SEARCH\_I18N**: `string`[]

Extended i18n fields required in properties
when they use a location search

#### Defined in

[constants.ts:691](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L691)

___

### LOGS\_IDENTIFIER

• `Const` **LOGS\_IDENTIFIER**: ``"LOGS"``

Used for logging, usually as a temporary solution

#### Defined in

[constants.ts:1665](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1665)

___

### MAX\_DECIMAL\_COUNT

• `Const` **MAX\_DECIMAL\_COUNT**: ``6``

Defines how many decimal points are supported, for the sake of usability
the number is set to a precision of 6

#### Defined in

[constants.ts:148](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L148)

___

### MAX\_FIELD\_SIZE

• `Const` **MAX\_FIELD\_SIZE**: `number`

Another just a security concern, this
is the size of the rq query, 1MB should be way more than enough for a rq query

#### Defined in

[constants.ts:195](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L195)

___

### MAX\_FILES\_PER\_PROPERTY

• `Const` **MAX\_FILES\_PER\_PROPERTY**: `number`

how many files can be used in one item field at once

#### Defined in

[constants.ts:182](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L182)

___

### MAX\_FILES\_PER\_REQUEST

• `Const` **MAX\_FILES\_PER\_REQUEST**: `number`

how many files can there be total
in a single request, this is more of a security concern

#### Defined in

[constants.ts:187](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L187)

___

### MAX\_FILE\_SIZE

• `Const` **MAX\_FILE\_SIZE**: `number`

The max file size (for either images and binary files)

#### Defined in

[constants.ts:178](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L178)

___

### MAX\_RAW\_TEXT\_LENGTH

• `Const` **MAX\_RAW\_TEXT\_LENGTH**: `number`

Defines how many characters (yes characters) a text might have max
please define maxLenght in the property itself for specific checking
this check is expensive so checking twice is not good

#### Defined in

[constants.ts:174](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L174)

___

### MAX\_REMOTE\_LISTENERS\_PER\_SOCKET

• `Const` **MAX\_REMOTE\_LISTENERS\_PER\_SOCKET**: `number`

The maximum amount of remote listeners a socket supports

#### Defined in

[constants.ts:236](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L236)

___

### MAX\_SEARCH\_FIELD\_LENGTH

• `Const` **MAX\_SEARCH\_FIELD\_LENGTH**: `number`

Size in characters of the search field

#### Defined in

[constants.ts:209](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L209)

___

### MAX\_SEARCH\_RECORDS\_DEFAULT

• `Const` **MAX\_SEARCH\_RECORDS\_DEFAULT**: `number`

how many search results can be retrieved at once these are
used for the actual search results

#### Defined in

[constants.ts:205](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L205)

___

### MAX\_SEARCH\_RESULTS\_DEFAULT

• `Const` **MAX\_SEARCH\_RESULTS\_DEFAULT**: `number`

how many search results can be retrieved at once these are
used for the actual search results

#### Defined in

[constants.ts:200](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L200)

___

### MAX\_STRING\_LENGTH

• `Const` **MAX\_STRING\_LENGTH**: `number`

Defines how many characters a string might have

#### Defined in

[constants.ts:168](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L168)

___

### MAX\_SUPPORTED\_INTEGER

• `Const` **MAX\_SUPPORTED\_INTEGER**: ``2147483647``

Defines the max supported integer, it should match up the database

#### Defined in

[constants.ts:139](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L139)

___

### MAX\_SUPPORTED\_REAL

• `Const` **MAX\_SUPPORTED\_REAL**: ``999999999``

Defines how big can decimal numbers get

#### Defined in

[constants.ts:152](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L152)

___

### MAX\_SUPPORTED\_YEAR

• `Const` **MAX\_SUPPORTED\_YEAR**: `number`

Years max

#### Defined in

[constants.ts:160](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L160)

___

### MEMCACHED\_DESTRUCTION\_MARKERS\_LOCATION

• `Const` **MEMCACHED\_DESTRUCTION\_MARKERS\_LOCATION**: `string`

Where destruction markers get memory cached

#### Defined in

[constants.ts:337](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L337)

___

### MEMCACHED\_SEARCH\_DESTRUCTION\_MARKERS\_LOCATION

• `Const` **MEMCACHED\_SEARCH\_DESTRUCTION\_MARKERS\_LOCATION**: `string`

Where destruction markers get memory cached

#### Defined in

[constants.ts:347](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L347)

___

### MEMCACHED\_UNMOUNT\_DESTRUCTION\_MARKERS\_LOCATION

• `Const` **MEMCACHED\_UNMOUNT\_DESTRUCTION\_MARKERS\_LOCATION**: `string`

Where destruction markers get memory cached

#### Defined in

[constants.ts:342](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L342)

___

### MEMCACHED\_UNMOUNT\_SEARCH\_DESTRUCTION\_MARKERS\_LOCATION

• `Const` **MEMCACHED\_UNMOUNT\_SEARCH\_DESTRUCTION\_MARKERS\_LOCATION**: `string`

Where the destruction markers are located

#### Defined in

[constants.ts:352](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L352)

___

### MIN\_SUPPORTED\_INTEGER

• `Const` **MIN\_SUPPORTED\_INTEGER**: `number` = `-MAX_SUPPORTED_INTEGER`

Defines the min supported integer, it should match up the database too

#### Defined in

[constants.ts:143](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L143)

___

### MIN\_SUPPORTED\_REAL

• `Const` **MIN\_SUPPORTED\_REAL**: ``-999999999``

Defines how small can decimal numbers get

#### Defined in

[constants.ts:156](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L156)

___

### MIN\_SUPPORTED\_YEAR

• `Const` **MIN\_SUPPORTED\_YEAR**: ``0``

Years min

#### Defined in

[constants.ts:164](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L164)

___

### MODULE\_AND\_ITEM\_DEF\_CUSTOM\_I18N\_KEY

• `Const` **MODULE\_AND\_ITEM\_DEF\_CUSTOM\_I18N\_KEY**: ``"custom"``

The custom key as it is stored in the built file, the custom key
is always custom in the properties

#### Defined in

[constants.ts:287](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L287)

___

### MODULE\_AND\_ITEM\_DEF\_I18N

• `Const` **MODULE\_AND\_ITEM\_DEF\_I18N**: `string`[]

The properties for i18n a module should have

#### Defined in

[constants.ts:271](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L271)

___

### MODULE\_AND\_ITEM\_DEF\_I18N\_SEARCHABLE

• `Const` **MODULE\_AND\_ITEM\_DEF\_I18N\_SEARCHABLE**: `string`[]

The properties for i18n a searchable module and item definition should have

#### Defined in

[constants.ts:277](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L277)

___

### MODULE\_PREFIX

• `Const` **MODULE\_PREFIX**: `string`

Every module when used within the database, rq or its qualified name is prefixed with

#### Defined in

[constants.ts:1081](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1081)

___

### ORDERBY\_NULLS\_PRIORITY\_RQ

• `Const` **ORDERBY\_NULLS\_PRIORITY\_RQ**: [`RQArg`](../interfaces/base_Root_rq.RQArg.md)

And this is for the order by rule enum nulls

#### Defined in

[constants.ts:1244](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1244)

___

### ORDERBY\_RULE\_DIRECTION\_RQ

• `Const` **ORDERBY\_RULE\_DIRECTION\_RQ**: [`RQArg`](../interfaces/base_Root_rq.RQArg.md)

And this is for the order by rule enum

#### Defined in

[constants.ts:1236](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1236)

___

### ORDERBY\_RULE\_RQ

• `Const` **ORDERBY\_RULE\_RQ**: [`RQArg`](../interfaces/base_Root_rq.RQArg.md)

#### Defined in

[constants.ts:1249](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1249)

___

### OWNER\_METAROLE

• `Const` **OWNER\_METAROLE**: ``"&OWNER"``

Role that means the owner of this item

#### Defined in

[constants.ts:1563](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1563)

___

### PARENT\_INDEX

• `Const` **PARENT\_INDEX**: ``"PARENT_INDEX"``

#### Defined in

[constants.ts:843](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L843)

___

### PING\_DATA\_IDENTIFIER

• `Const` **PING\_DATA\_IDENTIFIER**: ``"ping_data"``

An identifier for the ping information

#### Defined in

[constants.ts:1632](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1632)

___

### PING\_STATUS\_IDENTIFIER

• `Const` **PING\_STATUS\_IDENTIFIER**: ``"ping_status"``

#### Defined in

[constants.ts:1633](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1633)

___

### POLICY\_OPTIONAL\_I18N

• `Const` **POLICY\_OPTIONAL\_I18N**: `string`[]

Policies can also recieve an optional description

#### Defined in

[constants.ts:1143](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1143)

___

### POLICY\_PREFIXES

• `Const` **POLICY\_PREFIXES**: `Object`

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

[constants.ts:1126](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1126)

___

### POLICY\_REQUIRED\_I18N

• `Const` **POLICY\_REQUIRED\_I18N**: `string`[]

The required i18n fields to require for a policy
policies get a title that should be human readable in
the given language, and a fail error message for when they fail

#### Defined in

[constants.ts:1137](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1137)

___

### PREFIX\_ADD

• `Const` **PREFIX\_ADD**: `string`

The prefix used in the rq endpoint for adding item definitions

#### Defined in

[constants.ts:1113](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1113)

___

### PREFIX\_DELETE

• `Const` **PREFIX\_DELETE**: `string`

The prefix used in the rq endpoint for deleting item definitions

#### Defined in

[constants.ts:1121](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1121)

___

### PREFIX\_EDIT

• `Const` **PREFIX\_EDIT**: `string`

The prefix used in the rq endpoint for editing item definitions

#### Defined in

[constants.ts:1117](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1117)

___

### PREFIX\_GET

• `Const` **PREFIX\_GET**: `string`

The prefix used in the rq endpoint for getting item definitions

#### Defined in

[constants.ts:1105](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1105)

___

### PREFIX\_GET\_LIST

• `Const` **PREFIX\_GET\_LIST**: `string`

The prefix used in the rq endpoint for getting lists of item definitions and modules

#### Defined in

[constants.ts:1109](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1109)

___

### PREFIX\_SEARCH

• `Const` **PREFIX\_SEARCH**: `string`

The prefix used in the rq endpoint for searches of modules and item definitions

#### Defined in

[constants.ts:1097](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1097)

___

### PREFIX\_TRADITIONAL\_SEARCH

• `Const` **PREFIX\_TRADITIONAL\_SEARCH**: `string`

The prefix used in the rq endpoint for searches of modules and item definitions in traditional mode

#### Defined in

[constants.ts:1101](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1101)

___

### PROTECTED\_RESOURCES

• `Const` **PROTECTED\_RESOURCES**: `string`[]

Resources that are protected from fetching without specifying the devkey

#### Defined in

[constants.ts:1615](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1615)

___

### PROTECTED\_USERNAMES

• `Const` **PROTECTED\_USERNAMES**: `string`[]

The protected usernames that cannot be taken by the users

#### Defined in

[constants.ts:241](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L241)

___

### REDUCED\_BASE\_I18N

• `Const` **REDUCED\_BASE\_I18N**: `string`[]

Reduced i18n required for properties

#### Defined in

[constants.ts:646](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L646)

___

### REDUCED\_SEARCH\_BASE\_I18N

• `Const` **REDUCED\_SEARCH\_BASE\_I18N**: `string`[]

Reduced i18n required for properties when
they are searchable

#### Defined in

[constants.ts:653](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L653)

___

### REGISTRY\_IDENTIFIER

• `Const` **REGISTRY\_IDENTIFIER**: ``"REGISTRY"``

An identifier for the internal global registry

#### Defined in

[constants.ts:1660](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1660)

___

### REPROCESSED\_RESOURCES

• `Const` **REPROCESSED\_RESOURCES**: `string`[]

#### Defined in

[constants.ts:1619](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1619)

___

### RESERVED\_ADD\_PROPERTIES\_RQ

• `Const` **RESERVED\_ADD\_PROPERTIES\_RQ**: `Object`

Properties required in order to add something

#### Index signature

▪ [id: `string`]: [`RQArg`](../interfaces/base_Root_rq.RQArg.md)

#### Defined in

[constants.ts:1515](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1515)

___

### RESERVED\_BASE\_PROPERTIES\_ELASTIC

• `Const` **RESERVED\_BASE\_PROPERTIES\_ELASTIC**: [`IElasticIndexDefinitionType`](../interfaces/base_Root_sql.IElasticIndexDefinitionType.md)

#### Defined in

[constants.ts:971](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L971)

___

### RESERVED\_BASE\_PROPERTIES\_RQ

• `Const` **RESERVED\_BASE\_PROPERTIES\_RQ**: `Object`

The reserved base properties that are exists within every rq query
and should mirror the database

#### Index signature

▪ [id: `string`]: [`RQArg`](../interfaces/base_Root_rq.RQArg.md)

#### Defined in

[constants.ts:755](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L755)

___

### RESERVED\_CHANGE\_PROPERTIES\_RQ

• `Const` **RESERVED\_CHANGE\_PROPERTIES\_RQ**: `Object`

Properties required in order to change something
either edit or delete

#### Index signature

▪ [id: `string`]: [`RQArg`](../interfaces/base_Root_rq.RQArg.md)

#### Defined in

[constants.ts:1436](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1436)

___

### RESERVED\_GETTER\_LIST\_PROPERTIES\_RQ

• `Const` **RESERVED\_GETTER\_LIST\_PROPERTIES\_RQ**: `Object`

Properties required in order to get a list

#### Index signature

▪ [id: `string`]: [`RQArg`](../interfaces/base_Root_rq.RQArg.md)

#### Defined in

[constants.ts:1480](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1480)

___

### RESERVED\_GETTER\_PROPERTIES\_RQ

• `Const` **RESERVED\_GETTER\_PROPERTIES\_RQ**: `Object`

Properties required in order to get

#### Index signature

▪ [id: `string`]: [`RQArg`](../interfaces/base_Root_rq.RQArg.md)

#### Defined in

[constants.ts:1419](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1419)

___

### ROOT\_REQUIRED\_LOCALE\_I18N

• `Const` **ROOT\_REQUIRED\_LOCALE\_I18N**: `string`[]

Root required i18n properties

#### Defined in

[constants.ts:622](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L622)

___

### SEARCHENGINE\_MAX\_HIGHLIGHT\_FRAMENT\_SIZE

• `Const` **SEARCHENGINE\_MAX\_HIGHLIGHT\_FRAMENT\_SIZE**: `number`

Specifies the maximum size for the searchengine_full_highlights value

#### Defined in

[constants.ts:1691](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1691)

___

### SEARCH\_DESTRUCTION\_MARKERS\_LOCATION

• `Const` **SEARCH\_DESTRUCTION\_MARKERS\_LOCATION**: ``"SEARCH_DESTRUCTION_MARKERS"``

Where the destruction markers are located

#### Defined in

[constants.ts:327](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L327)

___

### SEARCH\_MODE\_MODULE\_PREFIX

• `Const` **SEARCH\_MODE\_MODULE\_PREFIX**: `string`

The search mode module is prefixed with

#### Defined in

[constants.ts:1085](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1085)

___

### SEARCH\_RECORDS\_CONTAINER\_RQ

• `Const` **SEARCH\_RECORDS\_CONTAINER\_RQ**: [`RQField`](../interfaces/base_Root_rq.RQField.md)

The id container contains the way that search results are returned
with the records and the last record of the given records

#### Defined in

[constants.ts:1179](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1179)

___

### SEARCH\_RECORD\_RQ

• `Const` **SEARCH\_RECORD\_RQ**: [`RQField`](../interfaces/base_Root_rq.RQField.md)

#### Defined in

[constants.ts:1147](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1147)

___

### SEARCH\_RECORD\_RQ\_ARG

• `Const` **SEARCH\_RECORD\_RQ\_ARG**: [`RQArg`](../interfaces/base_Root_rq.RQArg.md)

#### Defined in

[constants.ts:1169](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1169)

___

### SECONDARY\_JWT\_KEY

• `Const` **SECONDARY\_JWT\_KEY**: ``"SECONDARY_JWT_KEY"``

Key for the registry where the secondary jwt key is stored

#### Defined in

[constants.ts:1681](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1681)

___

### SERVER\_BLOCK\_UNTIL\_REFRESH\_TIME

• `Const` **SERVER\_BLOCK\_UNTIL\_REFRESH\_TIME**: `number`

The time it takes for blocks to be refreshed, the blocks represent the blocked_at and blocked_until functionality
that automatically gets removed

#### Defined in

[constants.ts:221](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L221)

___

### SERVER\_DATA\_IDENTIFIER

• `Const` **SERVER\_DATA\_IDENTIFIER**: ``"SERVER_DATA"``

An identifier for the server data

#### Defined in

[constants.ts:1627](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1627)

___

### SERVER\_DATA\_MIN\_UPDATE\_TIME

• `Const` **SERVER\_DATA\_MIN\_UPDATE\_TIME**: `number`

The minimum update time for the server data to be changed
basically runs mantenience functions, mainly it's about
updating the currency information

#### Defined in

[constants.ts:215](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L215)

___

### SERVER\_ELASTIC\_CONSISTENCY\_CHECK\_TIME

• `Const` **SERVER\_ELASTIC\_CONSISTENCY\_CHECK\_TIME**: `number`

The time it takes to run a cleanup process into the elastic instance

#### Defined in

[constants.ts:226](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L226)

___

### SERVER\_ELASTIC\_PING\_INTERVAL\_TIME

• `Const` **SERVER\_ELASTIC\_PING\_INTERVAL\_TIME**: `number`

The time to inform ping information

#### Defined in

[constants.ts:231](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L231)

___

### SERVER\_USER\_KICK\_IDENTIFIER

• `Const` **SERVER\_USER\_KICK\_IDENTIFIER**: ``"SERVER_KICK"``

An identifier from when the server kicks an user from the
login (aka sudden remote logout)

#### Defined in

[constants.ts:1639](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1639)

___

### SQL\_CONSTRAINT\_PREFIX

• `Const` **SQL\_CONSTRAINT\_PREFIX**: `string`

Used for creation of sql contraints

#### Defined in

[constants.ts:1073](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1073)

___

### STANDARD\_ACCESSIBLE\_RESERVED\_BASE\_PROPERTIES

• `Const` **STANDARD\_ACCESSIBLE\_RESERVED\_BASE\_PROPERTIES**: `string`[]

These attributes are however protected, they exist only within
the DATA field

#### Defined in

[constants.ts:718](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L718)

___

### TIME\_FORMAT

• `Const` **TIME\_FORMAT**: ``"HH:mm:ss"``

The format that time is expected to have in order to be exchanged
this is the SQL form

#### Defined in

[constants.ts:744](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L744)

___

### TRACKERS\_INDEX

• `Const` **TRACKERS\_INDEX**: ``"TRACKERS_INDEX"``

#### Defined in

[constants.ts:845](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L845)

___

### TRACKERS\_REGISTRY\_IDENTIFIER

• `Const` **TRACKERS\_REGISTRY\_IDENTIFIER**: ``"TRACKERS_REGISTRY"``

An identifier for the trackers table information stuff

#### Defined in

[constants.ts:1655](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1655)

___

### UNIT\_SUBTYPES

• `Const` **UNIT\_SUBTYPES**: `string`[]

Units that are allowed within the itemize application these
are for the unit subtype

#### Defined in

[constants.ts:1581](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1581)

___

### UNMOUNT\_DESTRUCTION\_MARKERS\_LOCATION

• `Const` **UNMOUNT\_DESTRUCTION\_MARKERS\_LOCATION**: ``"UNMOUNT_DESTRUCTION_MARKERS"``

Where the destruction markers are located

#### Defined in

[constants.ts:322](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L322)

___

### UNMOUNT\_SEARCH\_DESTRUCTION\_MARKERS\_LOCATION

• `Const` **UNMOUNT\_SEARCH\_DESTRUCTION\_MARKERS\_LOCATION**: ``"UNMOUNT_SEARCH_DESTRUCTION_MARKERS"``

Where the destruction markers are located

#### Defined in

[constants.ts:332](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L332)

___

### UNSPECIFIED\_OWNER

• `Const` **UNSPECIFIED\_OWNER**: ``"UNSPECIFIED"``

When an owner is not specified, this is the value it holds
null is the user value of &GUEST hence it should not hold
the same value

#### Defined in

[constants.ts:1610](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1610)

___

### USER\_EXTRA\_CUSTOM\_I18N

• `Const` **USER\_EXTRA\_CUSTOM\_I18N**: `string`[]

Extra i18n properties that are used for the generation
of the validation email and the recovery email

#### Defined in

[constants.ts:388](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L388)

## Functions

### PREFIXED\_CONCAT

▸ **PREFIXED_CONCAT**(`...args`): `string`

an utility to concat prefixes

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...args` | `string`[] | the string list to concat |

#### Returns

`string`

#### Defined in

[constants.ts:1069](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1069)

___

### PREFIX\_BUILD

▸ **PREFIX_BUILD**(`s`): `string`

an utility to build prefixes

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `s` | `string` | the string to turn into a prefix |

#### Returns

`string`

#### Defined in

[constants.ts:1059](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1059)

___

### RESERVED\_BASE\_PROPERTIES\_SQL

▸ **RESERVED_BASE_PROPERTIES_SQL**(`combinedIndexes`, `addedIndexes`): [`ISQLTableDefinitionType`](../interfaces/base_Root_sql.ISQLTableDefinitionType.md)

The reserved base properties but in SQL form

#### Parameters

| Name | Type |
| :------ | :------ |
| `combinedIndexes` | `string`[] |
| `addedIndexes` | `string`[] |

#### Returns

[`ISQLTableDefinitionType`](../interfaces/base_Root_sql.ISQLTableDefinitionType.md)

#### Defined in

[constants.ts:850](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L850)

___

### RESERVED\_IDEF\_SEARCH\_PROPERTIES\_RQ

▸ **RESERVED_IDEF_SEARCH_PROPERTIES_RQ**(`orderByRule`): `Object`

The reserved search properties represent how searches are done
and these are included in every search

#### Parameters

| Name | Type |
| :------ | :------ |
| `orderByRule` | [`RQArg`](../interfaces/base_Root_rq.RQArg.md) |

#### Returns

`Object`

#### Defined in

[constants.ts:1298](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1298)

___

### RESERVED\_MODULE\_SEARCH\_PROPERTIES\_RQ

▸ **RESERVED_MODULE_SEARCH_PROPERTIES_RQ**(`orderByRule`): `Object`

These apply when doing module searches

#### Parameters

| Name | Type |
| :------ | :------ |
| `orderByRule` | [`RQArg`](../interfaces/base_Root_rq.RQArg.md) |

#### Returns

`Object`

#### Defined in

[constants.ts:1407](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1407)

___

### SUFFIX\_BUILD

▸ **SUFFIX_BUILD**(`s`): `string`

an utility to build suffixes

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `s` | `string` | the string to turn into a suffix |

#### Returns

`string`

#### Defined in

[constants.ts:1064](https://github.com/onzag/itemize/blob/73e0c39e/constants.ts#L1064)
