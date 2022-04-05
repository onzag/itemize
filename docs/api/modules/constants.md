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
- [SERVER\_BLOCK\_UNTIL\_REFRESH\_TIME](constants.md#server_block_until_refresh_time)
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

Ƭ **SearchVariants**: ``"exact"`` \| ``"from"`` \| ``"to"`` \| ``"location"`` \| ``"radius"`` \| ``"search"`` \| ``"in"`` \| ``"payment-status"`` \| ``"payment-type"``

#### Defined in

[constants.ts:1115](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L1115)

## Variables

### ANYONE\_LOGGED\_METAROLE

• **ANYONE\_LOGGED\_METAROLE**: ``"&ANYONE_LOGGED"``

Role that means anyone logged in

#### Defined in

[constants.ts:1317](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L1317)

___

### ANYONE\_METAROLE

• **ANYONE\_METAROLE**: ``"&ANYONE"``

Role that means, well, anyone

#### Defined in

[constants.ts:1313](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L1313)

___

### CACHED\_CURRENCY\_RESPONSE

• **CACHED\_CURRENCY\_RESPONSE**: ``"CACHED_CURRENCY_RESPONSE"``

An identifier for caching the currency api response
for currency conversion in redis

#### Defined in

[constants.ts:1396](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L1396)

___

### CLASSIC\_BASE\_I18N

• **CLASSIC\_BASE\_I18N**: `string`[]

Standard i18n fields required for properties

#### Defined in

[constants.ts:571](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L571)

___

### CLASSIC\_OPTIONAL\_I18N

• **CLASSIC\_OPTIONAL\_I18N**: `string`[]

Optional i18n fields in properties

#### Defined in

[constants.ts:599](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L599)

___

### CLASSIC\_SEARCH\_BASE\_I18N

• **CLASSIC\_SEARCH\_BASE\_I18N**: `string`[]

Standard i18n fields required for properties when
they are searchable

#### Defined in

[constants.ts:579](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L579)

___

### CLASSIC\_SEARCH\_OPTIONAL\_I18N

• **CLASSIC\_SEARCH\_OPTIONAL\_I18N**: `string`[]

Optional i18n fields in properties when they are
searchable

#### Defined in

[constants.ts:606](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L606)

___

### CLASSIC\_SEARCH\_RANGED\_I18N

• **CLASSIC\_SEARCH\_RANGED\_I18N**: `string`[]

Extended required i18n fields required in properties
when they use a ranged search

#### Defined in

[constants.ts:613](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L613)

___

### CLASSIC\_SEARCH\_RANGED\_OPTIONAL\_I18N

• **CLASSIC\_SEARCH\_RANGED\_OPTIONAL\_I18N**: `string`[]

Extended optional i18n fields required in properties
when they use a ranged search

#### Defined in

[constants.ts:623](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L623)

___

### COMBINED\_INDEX

• **COMBINED\_INDEX**: ``"COMBINED_INDEX"``

#### Defined in

[constants.ts:758](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L758)

___

### CONNECTOR\_SQL\_COLUMN\_ID\_FK\_NAME

• **CONNECTOR\_SQL\_COLUMN\_ID\_FK\_NAME**: ``"MODULE_ID"``

The column name of the foreign key that connects the module table
with the item definition table

#### Defined in

[constants.ts:888](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L888)

___

### CONNECTOR\_SQL\_COLUMN\_VERSION\_FK\_NAME

• **CONNECTOR\_SQL\_COLUMN\_VERSION\_FK\_NAME**: ``"MODULE_VERSION"``

The column name of the foreign key that connects the module table
with the item definition table

#### Defined in

[constants.ts:893](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L893)

___

### CREATED\_AT\_INDEX

• **CREATED\_AT\_INDEX**: ``"CREATED_AT_INDEX"``

#### Defined in

[constants.ts:755](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L755)

___

### CREATED\_BY\_INDEX

• **CREATED\_BY\_INDEX**: ``"CREATED_BY_INDEX"``

#### Defined in

[constants.ts:756](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L756)

___

### CURRENCY\_FACTORS\_IDENTIFIER

• **CURRENCY\_FACTORS\_IDENTIFIER**: ``"CURRENCY_FACTORS"``

An identifier for the currency factors and the currency
factor information

#### Defined in

[constants.ts:1380](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L1380)

___

### DATETIME\_FORMAT

• **DATETIME\_FORMAT**: ``"YYYY-MM-DD HH:mm:ss.SSSZ"``

The format that dates are expected to have in order to be exchanged
these represent the SQL form, does not support nano date

#### Defined in

[constants.ts:990](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L990)

___

### DATE\_FORMAT

• **DATE\_FORMAT**: ``"YYYY-MM-DD"``

The format date has in order to be exchanged, this is
the SQL form

#### Defined in

[constants.ts:1000](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L1000)

___

### DELETED\_REGISTRY\_IDENTIFIER

• **DELETED\_REGISTRY\_IDENTIFIER**: ``"DELETED_REGISTRY"``

An identifier for the deleted table information stuff

#### Defined in

[constants.ts:1385](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L1385)

___

### DESTRUCTION\_MARKERS\_LOCATION

• **DESTRUCTION\_MARKERS\_LOCATION**: ``"DESTRUCTION_MARKERS"``

Where the destruction markers are located

#### Defined in

[constants.ts:297](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L297)

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

[constants.ts:322](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L322)

___

### EXCLUSION\_STATE\_SUFFIX

• **EXCLUSION\_STATE\_SUFFIX**: `string`

The suffix added to refer to the exclusion state of an include in SQL or graphql

#### Defined in

[constants.ts:932](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L932)

___

### EXTERNALLY\_ACCESSIBLE\_RESERVED\_BASE\_PROPERTIES

• **EXTERNALLY\_ACCESSIBLE\_RESERVED\_BASE\_PROPERTIES**: `string`[]

Graphql values come in a DATA form, because they can be blocked
however some attributes are meant to leak and be externally accessible
these atrributes can only be accessed outside of it

#### Defined in

[constants.ts:643](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L643)

___

### FILE\_SUPPORTED\_IMAGE\_TYPES

• **FILE\_SUPPORTED\_IMAGE\_TYPES**: `string`[]

Supported image types

#### Defined in

[constants.ts:240](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L240)

___

### GUEST\_METAROLE

• **GUEST\_METAROLE**: ``"&GUEST"``

Role that means any guest

#### Defined in

[constants.ts:1321](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L1321)

___

### INCLUDE\_PREFIX

• **INCLUDE\_PREFIX**: `string`

Every include when used within the database or graphql is prefixed with

#### Defined in

[constants.ts:916](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L916)

___

### ITEM\_CALLOUT\_EXCLUDED\_I18N

• **ITEM\_CALLOUT\_EXCLUDED\_I18N**: `string`[]

The properties for i18n a callout excluded item should have

#### Defined in

[constants.ts:290](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L290)

___

### ITEM\_CAN\_BE\_EXCLUDED\_I18N

• **ITEM\_CAN\_BE\_EXCLUDED\_I18N**: `string`[]

The properties for i18n an item that can be excluded should have

#### Defined in

[constants.ts:272](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L272)

___

### ITEM\_DEFINITION\_PREFIX

• **ITEM\_DEFINITION\_PREFIX**: `string`

Every item definition when used within the database, graphql or its qualified name is prefixed with

#### Defined in

[constants.ts:928](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L928)

___

### ITEM\_OPTIONAL\_I18N

• **ITEM\_OPTIONAL\_I18N**: `string`[]

The item optional data

#### Defined in

[constants.ts:283](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L283)

___

### LAST\_RICH\_TEXT\_CHANGE\_LENGTH

• **LAST\_RICH\_TEXT\_CHANGE\_LENGTH**: ``"LAST_RICH_TEXT_CHANGE_LENGTH"``

Store a last rich text change size global to use to save memory for lenght calculation

#### Defined in

[constants.ts:317](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L317)

___

### LOCALE\_I18N

• **LOCALE\_I18N**: `string`[]

This is for small use anywhere language data

#### Defined in

[constants.ts:361](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L361)

___

### LOCATION\_SEARCH\_I18N

• **LOCATION\_SEARCH\_I18N**: `string`[]

Extended i18n fields required in properties
when they use a location search

#### Defined in

[constants.ts:631](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L631)

___

### MAX\_DECIMAL\_COUNT

• **MAX\_DECIMAL\_COUNT**: ``6``

Defines how many decimal points are supported, for the sake of usability
the number is set to a precision of 6

#### Defined in

[constants.ts:145](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L145)

___

### MAX\_FIELD\_SIZE

• **MAX\_FIELD\_SIZE**: `number`

Another just a security concern, this
is the size of the graphql query, 1MB should be way more than enough for a graphql query

#### Defined in

[constants.ts:192](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L192)

___

### MAX\_FILES\_PER\_PROPERTY

• **MAX\_FILES\_PER\_PROPERTY**: `number`

how many files can be used in one item field at once

#### Defined in

[constants.ts:179](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L179)

___

### MAX\_FILES\_PER\_REQUEST

• **MAX\_FILES\_PER\_REQUEST**: `number`

how many files can there be total
in a single request, this is more of a security concern

#### Defined in

[constants.ts:184](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L184)

___

### MAX\_FILE\_SIZE

• **MAX\_FILE\_SIZE**: `number`

The max file size (for either images and binary files)

#### Defined in

[constants.ts:175](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L175)

___

### MAX\_RAW\_TEXT\_LENGTH

• **MAX\_RAW\_TEXT\_LENGTH**: `number`

Defines how many characters (yes characters) a text might have max
please define maxLenght in the property itself for specific checking
this check is expensive so checking twice is not good

#### Defined in

[constants.ts:171](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L171)

___

### MAX\_REMOTE\_LISTENERS\_PER\_SOCKET

• **MAX\_REMOTE\_LISTENERS\_PER\_SOCKET**: `number`

The maximum amount of remote listeners a socket supports

#### Defined in

[constants.ts:227](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L227)

___

### MAX\_SEARCH\_FIELD\_LENGTH

• **MAX\_SEARCH\_FIELD\_LENGTH**: `number`

Size in characters of the search field

#### Defined in

[constants.ts:206](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L206)

___

### MAX\_SEARCH\_RECORDS\_DEFAULT

• **MAX\_SEARCH\_RECORDS\_DEFAULT**: `number`

how many search results can be retrieved at once these are
used for the actual search results

#### Defined in

[constants.ts:202](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L202)

___

### MAX\_SEARCH\_RESULTS\_DEFAULT

• **MAX\_SEARCH\_RESULTS\_DEFAULT**: `number`

how many search results can be retrieved at once these are
used for the actual search results

#### Defined in

[constants.ts:197](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L197)

___

### MAX\_STRING\_LENGTH

• **MAX\_STRING\_LENGTH**: `number`

Defines how many characters a string might have

#### Defined in

[constants.ts:165](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L165)

___

### MAX\_SUPPORTED\_INTEGER

• **MAX\_SUPPORTED\_INTEGER**: ``2147483647``

Defines the max supported integer, it should match up the database

#### Defined in

[constants.ts:136](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L136)

___

### MAX\_SUPPORTED\_REAL

• **MAX\_SUPPORTED\_REAL**: ``999999999``

Defines how big can decimal numbers get

#### Defined in

[constants.ts:149](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L149)

___

### MAX\_SUPPORTED\_YEAR

• **MAX\_SUPPORTED\_YEAR**: `number`

Years max

#### Defined in

[constants.ts:157](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L157)

___

### MEMCACHED\_DESTRUCTION\_MARKERS\_LOCATION

• **MEMCACHED\_DESTRUCTION\_MARKERS\_LOCATION**: `string`

Where destruction markers get memory cached

#### Defined in

[constants.ts:307](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L307)

___

### MEMCACHED\_SEARCH\_DESTRUCTION\_MARKERS\_LOCATION

• **MEMCACHED\_SEARCH\_DESTRUCTION\_MARKERS\_LOCATION**: `string`

Where destruction markers get memory cached

#### Defined in

[constants.ts:312](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L312)

___

### MIN\_SUPPORTED\_INTEGER

• **MIN\_SUPPORTED\_INTEGER**: `number` = `-MAX_SUPPORTED_INTEGER`

Defines the min supported integer, it should match up the database too

#### Defined in

[constants.ts:140](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L140)

___

### MIN\_SUPPORTED\_REAL

• **MIN\_SUPPORTED\_REAL**: ``-999999999``

Defines how small can decimal numbers get

#### Defined in

[constants.ts:153](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L153)

___

### MIN\_SUPPORTED\_YEAR

• **MIN\_SUPPORTED\_YEAR**: ``0``

Years min

#### Defined in

[constants.ts:161](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L161)

___

### MODULE\_AND\_ITEM\_DEF\_CUSTOM\_I18N\_KEY

• **MODULE\_AND\_ITEM\_DEF\_CUSTOM\_I18N\_KEY**: ``"custom"``

The custom key as it is stored in the built file, the custom key
is always custom in the properties

#### Defined in

[constants.ts:267](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L267)

___

### MODULE\_AND\_ITEM\_DEF\_I18N

• **MODULE\_AND\_ITEM\_DEF\_I18N**: `string`[]

The properties for i18n a module should have

#### Defined in

[constants.ts:251](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L251)

___

### MODULE\_AND\_ITEM\_DEF\_I18N\_SEARCHABLE

• **MODULE\_AND\_ITEM\_DEF\_I18N\_SEARCHABLE**: `string`[]

The properties for i18n a searchable module and item definition should have

#### Defined in

[constants.ts:257](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L257)

___

### MODULE\_PREFIX

• **MODULE\_PREFIX**: `string`

Every module when used within the database, graphql or its qualified name is prefixed with

#### Defined in

[constants.ts:920](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L920)

___

### ORDERBY\_NULLS\_PRIORITY

• **ORDERBY\_NULLS\_PRIORITY**: `GraphQLEnumType`

And this is for the order by rule enum nulls

#### Defined in

[constants.ts:1094](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L1094)

___

### ORDERBY\_RULE

• **ORDERBY\_RULE**: `GraphQLInputObjectType`

#### Defined in

[constants.ts:1099](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L1099)

___

### ORDERBY\_RULE\_DIRECTION

• **ORDERBY\_RULE\_DIRECTION**: `GraphQLEnumType`

And this is for the order by rule enum

#### Defined in

[constants.ts:1086](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L1086)

___

### OWNER\_METAROLE

• **OWNER\_METAROLE**: ``"&OWNER"``

Role that means the owner of this item

#### Defined in

[constants.ts:1309](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L1309)

___

### PARENT\_INDEX

• **PARENT\_INDEX**: ``"PARENT_INDEX"``

#### Defined in

[constants.ts:757](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L757)

___

### POLICY\_OPTIONAL\_I18N

• **POLICY\_OPTIONAL\_I18N**: `string`[]

Policies can also recieve an optional description

#### Defined in

[constants.ts:982](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L982)

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

[constants.ts:965](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L965)

___

### POLICY\_REQUIRED\_I18N

• **POLICY\_REQUIRED\_I18N**: `string`[]

The required i18n fields to require for a policy
policies get a title that should be human readable in
the given language, and a fail error message for when they fail

#### Defined in

[constants.ts:976](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L976)

___

### PREFIX\_ADD

• **PREFIX\_ADD**: `string`

The prefix used in the graphql endpoint for adding item definitions

#### Defined in

[constants.ts:952](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L952)

___

### PREFIX\_DELETE

• **PREFIX\_DELETE**: `string`

The prefix used in the graphql endpoint for deleting item definitions

#### Defined in

[constants.ts:960](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L960)

___

### PREFIX\_EDIT

• **PREFIX\_EDIT**: `string`

The prefix used in the graphql endpoint for editing item definitions

#### Defined in

[constants.ts:956](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L956)

___

### PREFIX\_GET

• **PREFIX\_GET**: `string`

The prefix used in the graphql endpoint for getting item definitions

#### Defined in

[constants.ts:944](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L944)

___

### PREFIX\_GET\_LIST

• **PREFIX\_GET\_LIST**: `string`

The prefix used in the graphql endpoint for getting lists of item definitions and modules

#### Defined in

[constants.ts:948](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L948)

___

### PREFIX\_SEARCH

• **PREFIX\_SEARCH**: `string`

The prefix used in the graphql endpoint for searches of modules and item definitions

#### Defined in

[constants.ts:936](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L936)

___

### PREFIX\_TRADITIONAL\_SEARCH

• **PREFIX\_TRADITIONAL\_SEARCH**: `string`

The prefix used in the graphql endpoint for searches of modules and item definitions in traditional mode

#### Defined in

[constants.ts:940](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L940)

___

### PROTECTED\_RESOURCES

• **PROTECTED\_RESOURCES**: `string`[]

Resources that are protected from fetching without specifying the devkey

#### Defined in

[constants.ts:1361](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L1361)

___

### PROTECTED\_USERNAMES

• **PROTECTED\_USERNAMES**: `string`[]

The protected usernames that cannot be taken by the users

#### Defined in

[constants.ts:232](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L232)

___

### REDUCED\_BASE\_I18N

• **REDUCED\_BASE\_I18N**: `string`[]

Reduced i18n required for properties

#### Defined in

[constants.ts:586](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L586)

___

### REDUCED\_SEARCH\_BASE\_I18N

• **REDUCED\_SEARCH\_BASE\_I18N**: `string`[]

Reduced i18n required for properties when
they are searchable

#### Defined in

[constants.ts:593](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L593)

___

### REGISTRY\_IDENTIFIER

• **REGISTRY\_IDENTIFIER**: ``"REGISTRY"``

An identifier for the internal global registry

#### Defined in

[constants.ts:1390](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L1390)

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

[constants.ts:1268](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L1268)

___

### RESERVED\_BASE\_PROPERTIES

• **RESERVED\_BASE\_PROPERTIES**: [`IGQLFieldsDefinitionType`](../interfaces/base_Root_gql.IGQLFieldsDefinitionType.md)

The reserved base properties that are exists within every graphql query
and should mirror the database

#### Defined in

[constants.ts:673](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L673)

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

[constants.ts:1218](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L1218)

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
| `token` | `Object` |
| `token.description` | `string` |
| `token.type` | `GraphQLScalarType` |

#### Defined in

[constants.ts:1253](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L1253)

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

[constants.ts:1202](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L1202)

___

### ROOT\_REQUIRED\_LOCALE\_I18N

• **ROOT\_REQUIRED\_LOCALE\_I18N**: `string`[]

Root required i18n properties

#### Defined in

[constants.ts:562](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L562)

___

### SEARCH\_DESTRUCTION\_MARKERS\_LOCATION

• **SEARCH\_DESTRUCTION\_MARKERS\_LOCATION**: ``"SEARCH_DESTRUCTION_MARKERS"``

Where the destruction markers are located

#### Defined in

[constants.ts:302](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L302)

___

### SEARCH\_MODE\_MODULE\_PREFIX

• **SEARCH\_MODE\_MODULE\_PREFIX**: `string`

The search mode module is prefixed with

#### Defined in

[constants.ts:924](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L924)

___

### SEARCH\_RECORDS\_CONTAINER\_GQL

• **SEARCH\_RECORDS\_CONTAINER\_GQL**: `GraphQLObjectType`<`any`, `any`, { [key: string]: `any`;  }\>

The id container contains the way that search results are returned
with the records and the last record of the given records

#### Defined in

[constants.ts:1040](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L1040)

___

### SEARCH\_RECORD\_GQL

• **SEARCH\_RECORD\_GQL**: `GraphQLObjectType`<`any`, `any`, { [key: string]: `any`;  }\>

The ID element in graphql form

#### Defined in

[constants.ts:1024](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L1024)

___

### SEARCH\_RECORD\_INPUT\_GQL

• **SEARCH\_RECORD\_INPUT\_GQL**: `GraphQLInputObjectType`

The ID element as input form

#### Defined in

[constants.ts:1031](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L1031)

___

### SERVER\_BLOCK\_UNTIL\_REFRESH\_TIME

• **SERVER\_BLOCK\_UNTIL\_REFRESH\_TIME**: `number`

The time it takes for blocks to be refreshed

#### Defined in

[constants.ts:222](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L222)

___

### SERVER\_DATA\_IDENTIFIER

• **SERVER\_DATA\_IDENTIFIER**: ``"SERVER_DATA"``

An identifier for the server data

#### Defined in

[constants.ts:1368](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L1368)

___

### SERVER\_DATA\_MIN\_UPDATE\_TIME

• **SERVER\_DATA\_MIN\_UPDATE\_TIME**: `number`

The minimum update time for the server data to be changed
basically runs mantenience functions, mainly it's about
updating the currency information

#### Defined in

[constants.ts:212](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L212)

___

### SERVER\_MAPPING\_TIME

• **SERVER\_MAPPING\_TIME**: `number`

The time it takes for sitemaps to be refreshed

#### Defined in

[constants.ts:217](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L217)

___

### SERVER\_USER\_KICK\_IDENTIFIER

• **SERVER\_USER\_KICK\_IDENTIFIER**: ``"SERVER_KICK"``

An identifier from when the server kicks an user from the
login (aka sudden remote logout)

#### Defined in

[constants.ts:1374](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L1374)

___

### SQL\_CONSTRAINT\_PREFIX

• **SQL\_CONSTRAINT\_PREFIX**: `string`

Used for creation of sql contraints

#### Defined in

[constants.ts:912](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L912)

___

### STANDARD\_ACCESSIBLE\_RESERVED\_BASE\_PROPERTIES

• **STANDARD\_ACCESSIBLE\_RESERVED\_BASE\_PROPERTIES**: `string`[]

These attributes are however protected, they exist only within
the DATA field

#### Defined in

[constants.ts:658](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L658)

___

### TIME\_FORMAT

• **TIME\_FORMAT**: ``"HH:mm:ss"``

The format that time is expected to have in order to be exchanged
this is the SQL form

#### Defined in

[constants.ts:995](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L995)

___

### UNIT\_SUBTYPES

• **UNIT\_SUBTYPES**: `string`[]

Units that are allowed within the itemize application these
are for the unit subtype

#### Defined in

[constants.ts:1327](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L1327)

___

### UNSPECIFIED\_OWNER

• **UNSPECIFIED\_OWNER**: ``"UNSPECIFIED"``

When an owner is not specified, this is the value it holds
null is the user value of &GUEST hence it should not hold
the same value

#### Defined in

[constants.ts:1356](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L1356)

___

### USER\_EXTRA\_CUSTOM\_I18N

• **USER\_EXTRA\_CUSTOM\_I18N**: `string`[]

Extra i18n properties that are used for the generation
of the validation email and the recovery email

#### Defined in

[constants.ts:347](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L347)

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

[constants.ts:908](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L908)

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

[constants.ts:898](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L898)

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

[constants.ts:763](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L763)

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

[constants.ts:1144](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L1144)

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

[constants.ts:1191](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L1191)

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

[constants.ts:903](https://github.com/onzag/itemize/blob/5c2808d3/constants.ts#L903)
