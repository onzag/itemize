import { GraphQLNonNull, GraphQLList, GraphQLObjectType, GraphQLInputObjectType } from "graphql";
import { IGQLFieldsDefinitionType } from "./base/Root/gql";
import { ISQLTableDefinitionType } from "./base/Root/sql";
/**
 * Defines the max supported integer, it should match up the database
 */
export declare const MAX_SUPPORTED_INTEGER = 2147483647;
/**
 * Defines the min supported integer, it should match up the database too
 */
export declare const MIN_SUPPORTED_INTEGER: number;
/**
 * Defines how many decimal points are supported, for the sake of usability
 * the number is set to a precision of 6
 */
export declare const MAX_DECIMAL_COUNT = 6;
/**
 * Defines how big can decimal numbers get
 */
export declare const MAX_SUPPORTED_REAL = 999999999;
/**
 * Defines how small can decimal numbers get
 */
export declare const MIN_SUPPORTED_REAL = -999999999;
/**
 * Years max
 */
export declare const MAX_SUPPORTED_YEAR = 3000;
/**
 * Years min
 */
export declare const MIN_SUPPORTED_YEAR = 0;
/**
 * Defines how many characters a string might have
 */
export declare const MAX_STRING_LENGTH = 10000;
/**
 * Defines how many characters (yes characters) a text might have max
 * please define maxLenght in the property itself for specific checking
 * this check is expensive so checking twice is not good
 */
export declare const MAX_RAW_TEXT_LENGTH = 100000;
/**
 * The max file size (for either images and binary files)
 */
export declare const MAX_FILE_SIZE = 5000000;
/**
 * how many files can be used in one item field at once
 */
export declare const MAX_FILE_BATCH_COUNT = 25;
/**
 * how many files can there be total
 * in a single request, this is more of a security concern
 */
export declare const MAX_FILE_TOTAL_BATCH_COUNT: number;
/**
 * Another just a security concern, this
 * is the size of the graphql query, 1MB should be way more than enough for a graphql query
 */
export declare const MAX_FIELD_SIZE = 1000000;
/**
 * how many search results can be retrieved at once
 */
export declare const MAX_SEARCH_RESULTS_AT_ONCE_LIMIT = 50;
/**
 * Supported image types
 */
export declare const FILE_SUPPORTED_IMAGE_TYPES: string[];
/**
 * The properties for i18n a module should have
 */
export declare const MODULE_AND_ITEM_DEF_I18N: string[];
/**
 * The custom key as it is stored in the built file, the custom key
 * is always custom in the properties
 */
export declare const MODULE_AND_ITEM_DEF_CUSTOM_I18N_KEY = "custom";
/**
 * The properties for i18n an item that can be excluded should have
 */
export declare const ITEM_CAN_BE_EXCLUDED_I18N: string[];
/**
 * The item optional data
 */
export declare const ITEM_OPTIONAL_I18N: string[];
/**
 * The properties for i18n a callout excluded item should have
 */
export declare const ITEM_CALLOUT_EXCLUDED_I18N: string[];
/**
 * Graphql endpoint errors codes that can be thrown
 */
export declare const ENDPOINT_ERRORS: {
    UNSPECIFIED: string;
    INVALID_PROPERTY: string;
    INVALID_POLICY: string;
    INVALID_INCLUDE: string;
    INVALID_CREDENTIALS: string;
    BLOCKED: string;
    CANT_CONNECT: string;
    INVALID_DATA_SUBMIT_REFUSED: string;
    INTERNAL_SERVER_ERROR: string;
    NOTHING_TO_UPDATE: string;
    MUST_BE_LOGGED_IN: string;
    FORBIDDEN: string;
    USER_BLOCKED: string;
    USER_REMOVED: string;
    NOT_FOUND: string;
};
/**
 * This is for small use anywhere language data
 */
export declare const LOCALE_I18N: string[];
/**
 * Root required i18n properties
 */
export declare const ROOT_REQUIRED_LOCALE_I18N: string[];
/**
 * Standard i18n fields required for properties
 */
export declare const CLASSIC_BASE_I18N: string[];
/**
 * Standard i18n fields required for properties when
 * they are searchable
 */
export declare const CLASSIC_SEARCH_BASE_I18N: string[];
/**
 * Reduced i18n required for properties
 */
export declare const REDUCED_BASE_I18N: string[];
/**
 * Reduced i18n required for properties when
 * they are searchable
 */
export declare const REDUCED_SEARCH_BASE_I18N: string[];
/**
 * Optional i18n fields in properties
 */
export declare const CLASSIC_OPTIONAL_I18N: string[];
/**
 * Optional i18n fields in properties when they are
 * searchable
 */
export declare const CLASSIC_SEARCH_OPTIONAL_I18N: string[];
/**
 * Extended required i18n fields required in properties
 * when they use a ranged search
 */
export declare const CLASSIC_SEARCH_RANGED_I18N: string[];
/**
 * Extended optional i18n fields required in properties
 * when they use a ranged search
 */
export declare const CLASSIC_SEARCH_RANGED_OPTIONAL_I18N: string[];
/**
 * Extended i18n fields required in properties
 * when they use a location search
 */
export declare const LOCATION_SEARCH_I18N: string[];
/**
 * Graphql values come in a DATA form, because they can be blocked
 * however some attributes are meant to leak and be externally accessible
 * these atrributes can only be accessed outside of it
 */
export declare const EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES: string[];
/**
 * These attributes are however protected, they exist only within
 * the DATA field
 */
export declare const STANDARD_ACCESSIBLE_RESERVED_BASE_PROPERTIES: string[];
/**
 * The reserved base properties that are exists within every graphql query
 * and should mirror the database
 */
export declare const RESERVED_BASE_PROPERTIES: IGQLFieldsDefinitionType;
/**
 * The reserved base properties but in SQL form
 */
export declare const RESERVED_BASE_PROPERTIES_SQL: ISQLTableDefinitionType;
/**
 * The column name of the foreign key that connects the module table
 * with the item definition table
 */
export declare const CONNECTOR_SQL_COLUMN_ID_FK_NAME = "MODULE_ID";
/**
 * The column name of the foreign key that connects the module table
 * with the item definition table
 */
export declare const CONNECTOR_SQL_COLUMN_VERSION_FK_NAME = "MODULE_VERSION";
/**
 * an utility to build prefixes
 * @param s the string to turn into a prefix
 */
export declare const PREFIX_BUILD: (s: string) => string;
/**
 * an utility to build suffixes
 * @param s the string to turn into a suffix
 */
export declare const SUFFIX_BUILD: (s: string) => string;
/**
 * an utility to concat prefixes
 * @param args the string list to concat
 */
export declare const PREFIXED_CONCAT: (...args: string[]) => string;
/**
 * Used for creation of sql contraints
 */
export declare const SQL_CONSTRAINT_PREFIX: string;
/**
 * Every include when used within the database or graphql is prefixed with
 */
export declare const INCLUDE_PREFIX: string;
/**
 * Every module when used within the database, graphql or its qualified name is prefixed with
 */
export declare const MODULE_PREFIX: string;
/**
 * The search mode module is prefixed with
 */
export declare const SEARCH_MODE_MODULE_PREFIX: string;
/**
 * Every item definition when used within the database, graphql or its qualified name is prefixed with
 */
export declare const ITEM_DEFINITION_PREFIX: string;
/**
 * The suffix added to refer to the exclusion state of an include in SQL or graphql
 */
export declare const EXCLUSION_STATE_SUFFIX: string;
/**
 * The prefix used in the graphql endpoint for searches of modules and item definitions
 */
export declare const PREFIX_SEARCH: string;
/**
 * The prefix used in the graphql endpoint for getting item definitions
 */
export declare const PREFIX_GET: string;
/**
 * The prefix used in the graphql endpoint for getting lists of item definitions and modules
 */
export declare const PREFIX_GET_LIST: string;
/**
 * The prefix used in the graphql endpoint for adding item definitions
 */
export declare const PREFIX_ADD: string;
/**
 * The prefix used in the graphql endpoint for editing item definitions
 */
export declare const PREFIX_EDIT: string;
/**
 * The prefix used in the graphql endpoint for deleting item definitions
 */
export declare const PREFIX_DELETE: string;
/**
 * The policy prefixes for all the policies that are available within itemize
 * in order to create complex rules
 */
export declare const POLICY_PREFIXES: {
    read: string;
    edit: string;
    delete: string;
    parent: string;
};
/**
 * The required i18n fields to require for a policy
 * policies get a title that should be human readable in
 * the given language, and a fail error message for when they fail
 */
export declare const POLICY_REQUIRED_I18N: string[];
/**
 * Policies can also recieve an optional description
 */
export declare const POLICY_OPTIONAL_I18N: string[];
/**
 * These represent the ways that ordering can be
 * executed within itemize, used to order by
 * in the server side and client side cached values
 */
export declare const ORDER_BY_OPTIONS: {
    DEFAULT: string;
    RELEVANCY: string;
    DATE: string;
};
/**
 * The format that dates are expected to have in order to be exchanged
 * these represent the SQL form
 */
export declare const DATETIME_FORMAT = "YYYY-MM-DD HH:mm:ss.SSSZ";
/**
 * The format that time is expected to have in order to be exchanged
 * this is the SQL form
 */
export declare const TIME_FORMAT = "HH:mm:ss";
/**
 * The format date has in order to be exchanged, this is
 * the SQL form
 */
export declare const DATE_FORMAT = "YYYY-MM-DD";
/**
 * The ID element in graphql form
 */
export declare const ID_ELEMENT_GQL: GraphQLObjectType<any, any, {
    [key: string]: any;
}>;
/**
 * The ID element as input form
 */
export declare const ID_ELEMENT_INPUT_GQL: GraphQLInputObjectType;
/**
 * The id container contains the way that search results are returned
 * with the ids and the last record of the given ids
 */
export declare const ID_CONTAINER_GQL: GraphQLObjectType<any, any, {
    [key: string]: any;
}>;
/**
 * The reserved search properties represent how searches are done
 * and these are included in every search
 */
export declare const RESERVED_SEARCH_PROPERTIES: {
    order_by: {
        type: GraphQLNonNull<import("graphql").GraphQLNullableType>;
        description: string;
    };
    created_by: {
        type: import("graphql").GraphQLScalarType;
        description: string;
    };
    parent_id: {
        type: import("graphql").GraphQLScalarType;
        description: string;
    };
    parent_version: {
        type: import("graphql").GraphQLScalarType;
        description: string;
    };
    parent_type: {
        type: import("graphql").GraphQLScalarType;
        description: string;
    };
    version_filter: {
        type: import("graphql").GraphQLScalarType;
        description: string;
    };
    search: {
        type: import("graphql").GraphQLScalarType;
        description: string;
    };
    token: {
        type: import("graphql").GraphQLScalarType;
        description: string;
    };
    language: {
        type: GraphQLNonNull<import("graphql").GraphQLNullableType>;
        description: string;
    };
};
/**
 * These apply when doing module searches
 */
export declare const RESERVED_MODULE_SEARCH_PROPERTIES: {
    types: {
        type: GraphQLList<import("graphql").GraphQLType>;
        description: string;
    };
    order_by: {
        type: GraphQLNonNull<import("graphql").GraphQLNullableType>;
        description: string;
    };
    created_by: {
        type: import("graphql").GraphQLScalarType;
        description: string;
    };
    parent_id: {
        type: import("graphql").GraphQLScalarType;
        description: string;
    };
    parent_version: {
        type: import("graphql").GraphQLScalarType;
        description: string;
    };
    parent_type: {
        type: import("graphql").GraphQLScalarType;
        description: string;
    };
    version_filter: {
        type: import("graphql").GraphQLScalarType;
        description: string;
    };
    search: {
        type: import("graphql").GraphQLScalarType;
        description: string;
    };
    token: {
        type: import("graphql").GraphQLScalarType;
        description: string;
    };
    language: {
        type: GraphQLNonNull<import("graphql").GraphQLNullableType>;
        description: string;
    };
};
/**
 * Properties required in order to get
 */
export declare const RESERVED_GETTER_PROPERTIES: {
    id: {
        type: GraphQLNonNull<import("graphql").GraphQLNullableType>;
        description: string;
    };
    version: {
        type: import("graphql").GraphQLScalarType;
        description: string;
    };
    token: {
        type: import("graphql").GraphQLScalarType;
        description: string;
    };
    language: {
        type: GraphQLNonNull<import("graphql").GraphQLNullableType>;
        description: string;
    };
};
/**
 * Properties required in order to change something
 * either edit or delete
 */
export declare const RESERVED_CHANGE_PROPERTIES: {
    listener_uuid: {
        type: import("graphql").GraphQLScalarType;
        description: string;
    };
    id: {
        type: GraphQLNonNull<import("graphql").GraphQLNullableType>;
        description: string;
    };
    version: {
        type: import("graphql").GraphQLScalarType;
        description: string;
    };
    token: {
        type: import("graphql").GraphQLScalarType;
        description: string;
    };
    language: {
        type: GraphQLNonNull<import("graphql").GraphQLNullableType>;
        description: string;
    };
};
/**
 * Properties required in order to get a list
 */
export declare const RESERVED_GETTER_LIST_PROPERTIES: {
    ids: {
        type: GraphQLNonNull<import("graphql").GraphQLNullableType>;
        description: string;
    };
    created_by: {
        type: import("graphql").GraphQLScalarType;
        description: string;
    };
    token: {
        type: import("graphql").GraphQLScalarType;
        description: string;
    };
    language: {
        type: GraphQLNonNull<import("graphql").GraphQLNullableType>;
        description: string;
    };
};
/**
 * Properties required in order to add something
 */
export declare const RESERVED_ADD_PROPERTIES: {
    in_behalf_of: {
        type: import("graphql").GraphQLScalarType;
        description: string;
    };
    parent_id: {
        type: import("graphql").GraphQLScalarType;
        description: string;
    };
    parent_version: {
        type: import("graphql").GraphQLScalarType;
        description: string;
    };
    parent_type: {
        type: import("graphql").GraphQLScalarType;
        description: string;
    };
    for_id: {
        type: import("graphql").GraphQLScalarType;
        description: string;
    };
    version: {
        type: import("graphql").GraphQLScalarType;
        description: string;
    };
    token: {
        type: import("graphql").GraphQLScalarType;
        description: string;
    };
    language: {
        type: GraphQLNonNull<import("graphql").GraphQLNullableType>;
        description: string;
    };
};
/**
 * Role that means the owner of this item
 */
export declare const OWNER_METAROLE = "&OWNER";
/**
 * Role that means, well, anyone
 */
export declare const ANYONE_METAROLE = "&ANYONE";
/**
 * Role that means anyone logged in
 */
export declare const ANYONE_LOGGED_METAROLE = "&ANYONE_LOGGED";
/**
 * Role that means any guest
 */
export declare const GUEST_METAROLE = "&GUEST";
/**
 * Moderation fields for flagging
 */
export declare const MODERATION_FIELDS: string[];
/**
 * Units that are allowed within the itemize application these
 * are for the unit subtype
 */
export declare const UNIT_SUBTYPES: string[];
/**
 * When an owner is not specified, this is the value it holds
 * null is the user value of &GUEST hence it should not hold
 * the same value
 */
export declare const UNSPECIFIED_OWNER = -1;
/**
 * Resources that are protected from fetching without specifying the devkey
 */
export declare const PROTECTED_RESOURCES: string[];
