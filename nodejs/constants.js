"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
// DATA ATTRIBUTES
/**
 * Defines the max supported integer, it should match up the database
 */
exports.MAX_SUPPORTED_INTEGER = 2147483647;
/**
 * Defines the min supported integer, it should match up the database too
 */
exports.MIN_SUPPORTED_INTEGER = -exports.MAX_SUPPORTED_INTEGER;
/**
 * Defines how many decimal points are supported, for the sake of usability
 * the number is set to a precision of 6
 */
exports.MAX_DECIMAL_COUNT = 6;
/**
 * Defines how big can decimal numbers get
 */
exports.MAX_SUPPORTED_REAL = 999999999;
/**
 * Defines how small can decimal numbers get
 */
exports.MIN_SUPPORTED_REAL = -999999999;
/**
 * Years max
 */
exports.MAX_SUPPORTED_YEAR = 3000;
/**
 * Years min
 */
exports.MIN_SUPPORTED_YEAR = 0;
/**
 * Defines how many characters a string might have
 */
exports.MAX_STRING_LENGTH = 10000;
/**
 * Defines how many characters (yes characters) a text might have max
 * please define maxLenght in the property itself for specific checking
 * this check is expensive so checking twice is not good
 */
exports.MAX_RAW_TEXT_LENGTH = 100000;
/**
 * The max file size (for either images and binary files)
 */
exports.MAX_FILE_SIZE = 5000000; // equivalent to 5MB
/**
 * how many files can be used in one item field at once
 */
exports.MAX_FILE_BATCH_COUNT = 25;
/**
 * how many files can there be total
 * in a single request, this is more of a security concern
 */
exports.MAX_FILE_TOTAL_BATCH_COUNT = exports.MAX_FILE_BATCH_COUNT * 10;
/**
 * Another just a security concern, this
 * is the size of the graphql query, 1MB should be way more than enough for a graphql query
 */
exports.MAX_FIELD_SIZE = 1000000; // equivalent to 1MB
/**
 * how many search results can be retrieved at once these are
 * used for the actual search results
 */
exports.MAX_TRADITIONAL_SEARCH_RESULTS_FALLBACK = 50;
/**
 * how many search results can be retrieved at once these are
 * used for the actual search results
 */
exports.MAX_MATCHED_SEARCH_RESULTS_FALLBACK = 500;
/**
 * Supported image types
 */
exports.FILE_SUPPORTED_IMAGE_TYPES = [
    "image/png",
    "image/jpeg",
    "image/svg+xml",
    "image/png",
    "image/webp",
];
/**
 * The properties for i18n a module should have
 */
exports.MODULE_AND_ITEM_DEF_I18N = [
    "name",
];
/**
 * The properties for i18n a searchable module and item definition should have
 */
exports.MODULE_AND_ITEM_DEF_I18N_SEARCHABLE = [
    "fts_search_field_label",
    "fts_search_field_placeholder",
    "fts_search_keywords",
];
/**
 * The custom key as it is stored in the built file, the custom key
 * is always custom in the properties
 */
exports.MODULE_AND_ITEM_DEF_CUSTOM_I18N_KEY = "custom";
/**
 * The properties for i18n an item that can be excluded should have
 */
exports.ITEM_CAN_BE_EXCLUDED_I18N = [
    "exclusion_selector_label",
    "exclusion_ternary_selector_label",
    "excluded_label",
    "included_label",
    "any_label",
];
/**
 * The item optional data
 */
exports.ITEM_OPTIONAL_I18N = [
    "name",
];
/**
 * The properties for i18n a callout excluded item should have
 */
exports.ITEM_CALLOUT_EXCLUDED_I18N = [
    "callout_excluded_label",
];
/**
 * Where the destruction markers are located
 */
exports.DESTRUCTION_MARKERS_LOCATION = "DESTRUCTION_MARKERS";
/**
 * Where destruction markers get memory cached
 */
exports.MEMCACHED_DESTRUCTION_MARKERS_LOCATION = "MEMCACHED_" + exports.DESTRUCTION_MARKERS_LOCATION;
/**
 * Store a last rich text change size global to use to save memory for lenght calculation
 */
exports.LAST_RICH_TEXT_CHANGE_LENGTH = "LAST_RICH_TEXT_CHANGE_LENGTH";
/**
 * Graphql endpoint errors codes that can be thrown
 */
exports.ENDPOINT_ERRORS = {
    UNSPECIFIED: "UNSPECIFIED",
    INVALID_PROPERTY: "INVALID_PROPERTY",
    INVALID_POLICY: "INVALID_POLICY",
    INVALID_INCLUDE: "INVALID_INCLUDE",
    INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
    BLOCKED: "BLOCKED",
    CANT_CONNECT: "CANT_CONNECT",
    INVALID_DATA_SUBMIT_REFUSED: "INVALID_DATA_SUBMIT_REFUSED",
    INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
    NOTHING_TO_UPDATE: "NOTHING_TO_UPDATE",
    MUST_BE_LOGGED_IN: "MUST_BE_LOGGED_IN",
    FORBIDDEN: "FORBIDDEN",
    USER_BLOCKED: "USER_BLOCKED",
    USER_REMOVED: "USER_REMOVED",
    USER_EMAIL_TAKEN: "USER_EMAIL_TAKEN",
    NOT_FOUND: "NOT_FOUND",
};
/**
 * This is for small use anywhere language data
 */
exports.LOCALE_I18N = [
    // language name
    "name",
    // decimal separator that is used, comma or dot
    "number_decimal_separator",
    // word separator, comma, usually
    "word_separator",
    // N$ or $N depending if currency symbol goes before or after
    "currency_format",
    // For quilljs editor
    "format_bold",
    "format_italic",
    "format_underline",
    "format_title",
    "format_quote",
    "format_list_numbered",
    "format_list_bulleted",
    "format_add_image",
    "format_add_file",
    "format_add_video",
    // for filling the booleans and other things
    "yes",
    "no",
    "unspecified",
    "any",
    // for the datetime and other things
    "cancel",
    "ok",
    // for mostly the aria label of closing dialogs
    "close",
    // some extras for fast prototyping
    "menu",
    "reload",
    // for file uploader
    "file_uploader_placeholder_active",
    "image_uploader_placeholder_active",
    "file_uploader_placeholder_active_single",
    "image_uploader_placeholder_active_single",
    "file_uploader_invalid_type",
    "image_uploader_invalid_type",
    "file_uploader_file_too_big",
    "image_uploader_file_too_big",
    "file_uploader_byte_limit_exceed",
    "file_uploader_select_file",
    "image_uploader_select_file",
    "file_uploader_delete_file",
    "image_uploader_delete_file",
    // for video
    "video_loader_title",
    "video_loader_label",
    "video_loader_placeholder",
    "video_loader_invalid",
    "video_loader_submit",
    // for search utilites
    "no_results",
    "result_out_of",
    // for item definition too
    "callout_exclude_warning",
    // for showing the dialog message when selecting units
    "unit_dialog_title",
    "unit_dialog_others",
    "unit_dialog_metric",
    "unit_dialog_imperial",
    // when the app cannot be updated
    "blocked_update",
    "needs_update_navigation",
    "needs_update_title",
    "needs_update_action",
    "needs_update_content",
    // errors
    "generic_error",
    "generic_warning",
    "generic_info",
    // unsaved changes
    "unsaved_changes",
    "save",
    "discard",
].concat(
// we add all the endpoint errors
Object.keys(exports.ENDPOINT_ERRORS).map(((ee) => `error.${ee}`)));
/**
 * Root required i18n properties
 */
exports.ROOT_REQUIRED_LOCALE_I18N = [
    "app_name",
    "app_short_name",
    "app_description",
];
/**
 * Standard i18n fields required for properties
 */
exports.CLASSIC_BASE_I18N = [
    "label",
    "placeholder",
];
/**
 * Standard i18n fields required for properties when
 * they are searchable
 */
exports.CLASSIC_SEARCH_BASE_I18N = [
    "search.label",
    "search.placeholder",
];
/**
 * Reduced i18n required for properties
 */
exports.REDUCED_BASE_I18N = [
    "label",
];
/**
 * Reduced i18n required for properties when
 * they are searchable
 */
exports.REDUCED_SEARCH_BASE_I18N = [
    "search.label",
];
/**
 * Optional i18n fields in properties
 */
exports.CLASSIC_OPTIONAL_I18N = [
    "description",
];
/**
 * Optional i18n fields in properties when they are
 * searchable
 */
exports.CLASSIC_SEARCH_OPTIONAL_I18N = [
    "search.description",
];
/**
 * Extended required i18n fields required in properties
 * when they use a ranged search
 */
exports.CLASSIC_SEARCH_RANGED_I18N = [
    "search.range.from.label",
    "search.range.to.label",
    "search.range.from.placeholder",
    "search.range.to.placeholder",
];
/**
 * Extended optional i18n fields required in properties
 * when they use a ranged search
 */
exports.CLASSIC_SEARCH_RANGED_OPTIONAL_I18N = [
    "search.range.from.description",
    "search.range.to.description",
];
/**
 * Extended i18n fields required in properties
 * when they use a location search
 */
exports.LOCATION_SEARCH_I18N = [
    "search.label",
    "search.placeholder",
    "search.radius.label",
    "search.radius.placeholder",
];
/**
 * Graphql values come in a DATA form, because they can be blocked
 * however some attributes are meant to leak and be externally accessible
 * these atrributes can only be accessed outside of it
 */
exports.EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES = [
    "id",
    "version",
    "type",
    "container_id",
    "blocked_at",
    "blocked_by",
    "blocked_until",
    "blocked_reason",
    "last_modified",
];
/**
 * These attributes are however protected, they exist only within
 * the DATA field
 */
exports.STANDARD_ACCESSIBLE_RESERVED_BASE_PROPERTIES = [
    "created_at",
    "created_by",
    "edited_at",
    "edited_by",
    "reviewed_at",
    "reviewed_by",
];
/**
 * The reserved base properties that are exists within every graphql query
 * and should mirror the database
 */
exports.RESERVED_BASE_PROPERTIES = {
    id: {
        type: graphql_1.GraphQLNonNull && graphql_1.GraphQLNonNull(graphql_1.GraphQLInt),
        description: "The id of the item",
    },
    version: {
        type: graphql_1.GraphQLString,
        description: "An optional version of the item, the item must have versioning enabled",
    },
    type: {
        type: graphql_1.GraphQLNonNull && graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
        description: "The type (qualified name) of the item",
    },
    parent_id: {
        type: graphql_1.GraphQLInt,
        description: "If exists, a parent id of this item",
    },
    parent_version: {
        type: graphql_1.GraphQLString,
        description: "If exists, the parent version of this item",
    },
    parent_type: {
        type: graphql_1.GraphQLString,
        description: "If exists, a parent type of this item",
    },
    container_id: {
        type: graphql_1.GraphQLNonNull && graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
        description: "The storage location id where data is stored",
    },
    created_at: {
        type: graphql_1.GraphQLNonNull && graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
        description: "When the item was created",
    },
    created_by: {
        type: graphql_1.GraphQLNonNull && graphql_1.GraphQLNonNull(graphql_1.GraphQLInt),
        description: "The id of the user who created this item",
    },
    edited_at: {
        type: graphql_1.GraphQLString,
        description: "Whenever the item was modified, otherwise null",
    },
    edited_by: {
        type: graphql_1.GraphQLInt,
        description: "Whoever modified this item, otherwise null",
    },
    reviewed_at: {
        type: graphql_1.GraphQLString,
        description: "When a moderator or admin reviewed this item",
    },
    reviewed_by: {
        type: graphql_1.GraphQLInt,
        description: "The user id who reviewed it",
    },
    last_modified: {
        type: graphql_1.GraphQLNonNull && graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
        description: "An internal variable that represents when the whole item, as a whole " +
            " was last modified, by any factor, edited_at servers a UI purpose when things were " +
            " modified by normal means whereas last_modified is a global factor, it could be the " +
            " server that did the change, or a side effect, edited_at can be used in the UI " +
            " last modified is for usage which checking if items updated",
    },
    blocked_at: {
        type: graphql_1.GraphQLString,
        description: "When the item was blocked, blocked items are not searchable or retrievable by normal means; " +
            "if you as an user own this item, you will only see it blocked, unlike deleted items, blocked items remain " +
            "in the database until they are manually removed by an admin or moderator, none can access the data of this " +
            "item, the API will null all the fields, with the exception of blocked_at, blocked_by, blocked_until and blocked_reason",
    },
    blocked_until: {
        type: graphql_1.GraphQLString,
        description: "Basically makes the block be temporary and will be automatically lifted by the database",
    },
    blocked_by: {
        type: graphql_1.GraphQLInt,
        description: "By whom it was blocked",
    },
    blocked_reason: {
        type: graphql_1.GraphQLString,
        description: "A written text of why it was blocked",
    },
    flagged_by: {
        type: graphql_1.GraphQLList && graphql_1.GraphQLList(graphql_1.GraphQLInt),
        description: "Users who flagged this item",
    },
    flagged_reasons: {
        type: graphql_1.GraphQLList && graphql_1.GraphQLList(graphql_1.GraphQLString),
        description: "Users who flagged this item, reason",
    },
};
exports.CREATED_AT_INDEX = "CREATED_AT_INDEX";
exports.CREATED_BY_INDEX = "CREATED_BY_INDEX";
exports.PARENT_INDEX = "PARENT_INDEX";
exports.COMBINED_INDEX = "COMBINED_INDEX";
/**
 * The reserved base properties but in SQL form
 */
exports.RESERVED_BASE_PROPERTIES_SQL = (combinedIndexes, addedIndexes) => ({
    id: {
        type: "serial",
        notNull: true,
        index: {
            id: "PRIMARY_KEY",
            type: "primary",
            level: 0,
        },
    },
    version: {
        type: "string",
        notNull: true,
        // make it default to the invalid version value empty string
        // this means null only for versions, this trick is done because
        // it makes sense for the client, at the cost of the server logic
        defaultTo: "",
        index: {
            id: "PRIMARY_KEY",
            type: "primary",
            level: 1,
        },
    },
    type: {
        type: "string",
        notNull: true,
    },
    parent_id: {
        type: "integer",
        index: (combinedIndexes.includes("parent_id") || addedIndexes.includes("parent_id")) ? {
            id: combinedIndexes.includes("parent_id") ? exports.COMBINED_INDEX : exports.PARENT_INDEX,
            type: "btree",
            level: combinedIndexes.includes("parent_id") ? combinedIndexes.indexOf("parent_id") : 0,
        } : null,
    },
    parent_version: {
        type: "string",
        index: (combinedIndexes.includes("parent_version") || addedIndexes.includes("parent_version")) ? {
            id: combinedIndexes.includes("parent_version") ? exports.COMBINED_INDEX : exports.PARENT_INDEX,
            type: "btree",
            level: combinedIndexes.includes("parent_version") ? combinedIndexes.indexOf("parent_version") : 1,
        } : null,
    },
    parent_type: {
        type: "string",
        index: (combinedIndexes.includes("parent_type") || addedIndexes.includes("parent_type")) ? {
            id: combinedIndexes.includes("parent_type") ? exports.COMBINED_INDEX : exports.PARENT_INDEX,
            type: "btree",
            level: combinedIndexes.includes("parent_type") ? combinedIndexes.indexOf("parent_type") : 2,
        } : null,
    },
    container_id: {
        type: "string",
        notNull: true,
    },
    created_at: {
        type: "datetime",
        notNull: true,
        index: (combinedIndexes.includes("created_at") || addedIndexes.includes("created_at")) ? {
            id: combinedIndexes.includes("created_at") ? exports.COMBINED_INDEX : exports.CREATED_AT_INDEX,
            type: "btree",
            level: combinedIndexes.includes("created_at") ? combinedIndexes.indexOf("created_at") : 0,
        } : null,
    },
    created_by: {
        type: "integer",
        notNull: true,
        index: (combinedIndexes.includes("created_by") || addedIndexes.includes("created_by")) ? {
            id: combinedIndexes.includes("created_by") ? exports.COMBINED_INDEX : exports.CREATED_BY_INDEX,
            type: "btree",
            level: combinedIndexes.includes("created_by") ? combinedIndexes.indexOf("created_by") : 0,
        } : null,
    },
    edited_at: {
        type: "datetime",
    },
    edited_by: {
        type: "integer",
    },
    reviewed_at: {
        type: "datetime",
    },
    reviewed_by: {
        type: "integer",
    },
    last_modified: {
        type: "datetime",
    },
    blocked_at: {
        type: "datetime",
    },
    blocked_until: {
        type: "datetime",
    },
    blocked_by: {
        type: "integer",
    },
    blocked_reason: {
        type: "text",
    },
    flagged_by: {
        type: "int[]",
    },
    flagged_reasons: {
        type: "text[]",
    },
});
/**
 * The column name of the foreign key that connects the module table
 * with the item definition table
 */
exports.CONNECTOR_SQL_COLUMN_ID_FK_NAME = "MODULE_ID";
/**
 * The column name of the foreign key that connects the module table
 * with the item definition table
 */
exports.CONNECTOR_SQL_COLUMN_VERSION_FK_NAME = "MODULE_VERSION";
/**
 * an utility to build prefixes
 * @param s the string to turn into a prefix
 */
exports.PREFIX_BUILD = (s) => s + "_";
/**
 * an utility to build suffixes
 * @param s the string to turn into a suffix
 */
exports.SUFFIX_BUILD = (s) => "_" + s;
/**
 * an utility to concat prefixes
 * @param args the string list to concat
 */
exports.PREFIXED_CONCAT = (...args) => args.join("__");
/**
 * Used for creation of sql contraints
 */
exports.SQL_CONSTRAINT_PREFIX = exports.PREFIX_BUILD("CONSTRAINT");
/**
 * Every include when used within the database or graphql is prefixed with
 */
exports.INCLUDE_PREFIX = exports.PREFIX_BUILD("INCLUDE");
/**
 * Every module when used within the database, graphql or its qualified name is prefixed with
 */
exports.MODULE_PREFIX = exports.PREFIX_BUILD("MOD");
/**
 * The search mode module is prefixed with
 */
exports.SEARCH_MODE_MODULE_PREFIX = exports.PREFIX_BUILD("SEARCH_MODE");
/**
 * Every item definition when used within the database, graphql or its qualified name is prefixed with
 */
exports.ITEM_DEFINITION_PREFIX = exports.PREFIX_BUILD("IDEF");
/**
 * The suffix added to refer to the exclusion state of an include in SQL or graphql
 */
exports.EXCLUSION_STATE_SUFFIX = exports.SUFFIX_BUILD("EXCLUSION_STATE");
/**
 * The prefix used in the graphql endpoint for searches of modules and item definitions
 */
exports.PREFIX_SEARCH = exports.PREFIX_BUILD("SEARCH");
/**
 * The prefix used in the graphql endpoint for searches of modules and item definitions in traditional mode
 */
exports.PREFIX_TRADITIONAL_SEARCH = exports.PREFIX_BUILD("TSEARCH");
/**
 * The prefix used in the graphql endpoint for getting item definitions
 */
exports.PREFIX_GET = exports.PREFIX_BUILD("GET");
/**
 * The prefix used in the graphql endpoint for getting lists of item definitions and modules
 */
exports.PREFIX_GET_LIST = exports.PREFIX_BUILD("GET_LIST");
/**
 * The prefix used in the graphql endpoint for adding item definitions
 */
exports.PREFIX_ADD = exports.PREFIX_BUILD("ADD");
/**
 * The prefix used in the graphql endpoint for editing item definitions
 */
exports.PREFIX_EDIT = exports.PREFIX_BUILD("EDIT");
/**
 * The prefix used in the graphql endpoint for deleting item definitions
 */
exports.PREFIX_DELETE = exports.PREFIX_BUILD("DELETE");
/**
 * The policy prefixes for all the policies that are available within itemize
 * in order to create complex rules
 */
exports.POLICY_PREFIXES = {
    read: exports.PREFIX_BUILD("POLICY_READ"),
    edit: exports.PREFIX_BUILD("POLICY_EDIT"),
    delete: exports.PREFIX_BUILD("POLICY_DELETE"),
    parent: exports.PREFIX_BUILD("POLICY_PARENT"),
};
/**
 * The required i18n fields to require for a policy
 * policies get a title that should be human readable in
 * the given language, and a fail error message for when they fail
 */
exports.POLICY_REQUIRED_I18N = [
    "title", "fail",
];
/**
 * Policies can also recieve an optional description
 */
exports.POLICY_OPTIONAL_I18N = [
    "description",
];
/**
 * These represent the ways that ordering can be
 * executed within itemize, used to order by
 * in the server side and client side cached values
 */
exports.ORDER_BY_OPTIONS = {
    DEFAULT: "DEFAULT",
    RELEVANCY: "RELEVANCY",
    DATE: "DATE",
};
/**
 * The format that dates are expected to have in order to be exchanged
 * these represent the SQL form
 */
exports.DATETIME_FORMAT = "YYYY-MM-DD HH:mm:ss.SSSZ";
/**
 * The format that time is expected to have in order to be exchanged
 * this is the SQL form
 */
exports.TIME_FORMAT = "HH:mm:ss";
/**
 * The format date has in order to be exchanged, this is
 * the SQL form
 */
exports.DATE_FORMAT = "YYYY-MM-DD";
/**
 * The ID element fields are the id and type unique identifiers
 * that make the client able to run requests for a given item id
 * @ignore
 */
const SEARCH_MATCH_FIELDS = {
    id: {
        type: graphql_1.GraphQLNonNull && graphql_1.GraphQLNonNull(graphql_1.GraphQLInt),
    },
    type: {
        type: graphql_1.GraphQLNonNull && graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
    },
    version: {
        type: graphql_1.GraphQLString,
    },
    created_at: {
        type: graphql_1.GraphQLNonNull && graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
    },
};
/**
 * The ID element in graphql form
 */
exports.SEARCH_MATCH_GQL = graphql_1.GraphQLObjectType && new graphql_1.GraphQLObjectType({
    name: "SEARCH_MATCH",
    fields: SEARCH_MATCH_FIELDS,
});
/**
 * The ID element as input form
 */
exports.SEARCH_MATCH_INPUT_GQL = graphql_1.GraphQLInputObjectType && new graphql_1.GraphQLInputObjectType({
    name: "SEARCH_MATCH_INPUT",
    fields: SEARCH_MATCH_FIELDS,
});
/**
 * The id container contains the way that search results are returned
 * with the records and the last record of the given records
 */
exports.SEARCH_RESULTS_CONTAINER_GQL = graphql_1.GraphQLObjectType && new graphql_1.GraphQLObjectType({
    name: "SEARCH_RESULTS_CONTAINER",
    fields: {
        records: {
            type: graphql_1.GraphQLList && graphql_1.GraphQLList(graphql_1.GraphQLNonNull(exports.SEARCH_MATCH_GQL)),
        },
        last_record: {
            type: exports.SEARCH_MATCH_GQL,
        },
        count: {
            type: graphql_1.GraphQLNonNull(graphql_1.GraphQLInt),
        },
        limit: {
            type: graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)
        },
        offset: {
            type: graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)
        },
    },
});
/**
 * Converting the search options to an enum type
 * @ignore
 */
const searchOptionsOrderByOptions = {};
Object.keys(exports.ORDER_BY_OPTIONS).forEach((key) => {
    searchOptionsOrderByOptions[key] = {
        value: key,
    };
});
/**
 * These are the base query properties that are
 * used in a search and get list query
 */
const BASE_QUERY_PROPERTIES = {
    token: {
        type: graphql_1.GraphQLString,
        description: "the access token provided by the app",
    },
    language: {
        type: graphql_1.GraphQLNonNull && graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
        description: "A supported language (dictionary wise) 2 digit code, it is used for FTS purposes and text analysis",
    },
};
/**
 * And this is for the order by rule enum
 */
const ORDERBY_RULE = graphql_1.GraphQLEnumType && new graphql_1.GraphQLEnumType({
    name: "RESERVED_SEARCH_PROPERTY_ENUM_ORDER_BY",
    values: searchOptionsOrderByOptions,
});
/**
 * The reserved search properties represent how searches are done
 * and these are included in every search
 */
exports.RESERVED_SEARCH_PROPERTIES = {
    ...BASE_QUERY_PROPERTIES,
    order_by: {
        type: graphql_1.GraphQLNonNull && graphql_1.GraphQLNonNull(ORDERBY_RULE),
        description: "An order type",
    },
    created_by: {
        type: graphql_1.GraphQLInt,
        description: "An specified owner to filter by (this affects permissions)",
    },
    parent_id: {
        type: graphql_1.GraphQLInt,
        description: "a parent id for the item (must be specified with parent_type)",
    },
    parent_version: {
        type: graphql_1.GraphQLString,
        description: "a parent version for the item (must be specified with parent_type)",
    },
    parent_type: {
        type: graphql_1.GraphQLString,
        description: "a parent item definition qualified path (must be specified with parent_id)",
    },
    // TODO
    version_filter: {
        type: graphql_1.GraphQLString,
        description: "Allow only items that are of this version",
    },
    search: {
        type: graphql_1.GraphQLString,
        description: "A search string",
    },
};
/**
 * These apply when doing module searches
 */
exports.RESERVED_MODULE_SEARCH_PROPERTIES = {
    ...exports.RESERVED_SEARCH_PROPERTIES,
    types: {
        type: graphql_1.GraphQLList && graphql_1.GraphQLList(graphql_1.GraphQLNonNull(graphql_1.GraphQLString)),
        description: "A list of types (qualified names) to filter by",
    },
    order_by: {
        type: graphql_1.GraphQLNonNull && graphql_1.GraphQLNonNull(ORDERBY_RULE),
        description: "An order type",
    },
    created_by: {
        type: graphql_1.GraphQLInt,
        description: "An specified owner to filter by (this affects permissions)",
    },
    parent_id: {
        type: graphql_1.GraphQLInt,
        description: "a parent id for the item (must be specified with parent_type)",
    },
    parent_version: {
        type: graphql_1.GraphQLString,
        description: "a parent version for the item (must be specified with parent_type)",
    },
    parent_type: {
        type: graphql_1.GraphQLString,
        description: "a parent item definition qualified path (must be specified with parent_id)",
    },
    // TODO
    version_filter: {
        type: graphql_1.GraphQLString,
        description: "Allow only items that are of this version",
    },
    search: {
        type: graphql_1.GraphQLString,
        description: "A search string",
    },
};
/**
 * Properties required in order to get
 */
exports.RESERVED_GETTER_PROPERTIES = {
    ...BASE_QUERY_PROPERTIES,
    id: {
        type: graphql_1.GraphQLNonNull && graphql_1.GraphQLNonNull(graphql_1.GraphQLInt),
        description: "the id for that item",
    },
    // TODO implement in get resolver
    version: {
        type: graphql_1.GraphQLString,
        description: "a version for this item",
    },
};
/**
 * Properties required in order to change something
 * either edit or delete
 */
exports.RESERVED_CHANGE_PROPERTIES = {
    // TODO implement the versioning in edit resolver
    ...exports.RESERVED_GETTER_PROPERTIES,
    listener_uuid: {
        type: graphql_1.GraphQLString,
        description: "An uuid to identify the creator of this action",
    },
};
/**
 * Properties required in order to get a list
 */
exports.RESERVED_GETTER_LIST_PROPERTIES = {
    ...BASE_QUERY_PROPERTIES,
    records: {
        // TODO implement the version in retrieving these lists
        type: graphql_1.GraphQLNonNull && graphql_1.GraphQLNonNull(graphql_1.GraphQLList(exports.SEARCH_MATCH_INPUT_GQL)),
        description: "the records to fetch for that item",
    },
    created_by: {
        type: graphql_1.GraphQLInt,
        description: "An specified owner to filter by (this affects permissions)",
    },
};
/**
 * Properties required in order to add something
 */
exports.RESERVED_ADD_PROPERTIES = {
    ...BASE_QUERY_PROPERTIES,
    listener_uuid: {
        type: graphql_1.GraphQLString,
        description: "An uuid to identify the creator of this action",
    },
    in_behalf_of: {
        type: graphql_1.GraphQLInt,
        description: "an user id that will be the true owner",
    },
    parent_id: {
        type: graphql_1.GraphQLInt,
        description: "a parent id that will namespace this item (must be specified with parent_module and idef)",
    },
    parent_version: {
        type: graphql_1.GraphQLString,
        description: "a parent version that will namespace this item (must be specified with parent_module and idef)",
    },
    parent_type: {
        type: graphql_1.GraphQLString,
        description: "a parent item definition qualified path (must be specified with parent_id)",
    },
    container_id: {
        type: graphql_1.GraphQLNonNull && graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
        description: "the storage id where storage data is stored according to definitions",
    },
    for_id: {
        type: graphql_1.GraphQLInt,
        description: "If specified create this item for this given id, the id must already exist and be of the same type," +
            " this comes in handy for versioning as you need to specify an id to create different versions, please avoid collisions or" +
            " it will raise an error",
    },
    version: {
        type: graphql_1.GraphQLString,
        description: "An optional version set a for_id without specifying a version",
    },
};
/**
 * Role that means the owner of this item
 */
exports.OWNER_METAROLE = "&OWNER";
/**
 * Role that means, well, anyone
 */
exports.ANYONE_METAROLE = "&ANYONE";
/**
 * Role that means anyone logged in
 */
exports.ANYONE_LOGGED_METAROLE = "&ANYONE_LOGGED";
/**
 * Role that means any guest
 */
exports.GUEST_METAROLE = "&GUEST";
/**
 * Moderation fields for flagging
 */
exports.MODERATION_FIELDS = [
    "flagged_by",
    "flagged_reasons",
];
/**
 * Units that are allowed within the itemize application these
 * are for the unit subtype
 */
exports.UNIT_SUBTYPES = [
    "length",
    "area",
    "mass",
    "volume",
    "volumeFlowRate",
    "temperature",
    "time",
    "frequency",
    "speed",
    "pace",
    "pressure",
    "digital",
    "illuminance",
    "partsPer",
    "voltage",
    "current",
    "apparentPower",
    "reactivePower",
    "energy",
    "reactiveEnergy",
    "angle",
];
/**
 * When an owner is not specified, this is the value it holds
 * null is the user value of &GUEST hence it should not hold
 * the same value
 */
exports.UNSPECIFIED_OWNER = -1;
/**
 * Resources that are protected from fetching without specifying the devkey
 */
exports.PROTECTED_RESOURCES = [
    "/build.development.js",
];
exports.SERVER_DATA_IDENTIFIER = "SERVER_DATA";
exports.CURRENCY_FACTORS_IDENTIFIER = "CURRENCY_FACTORS";
exports.WAIT_TIME_PER_BATCH = 300000;
exports.SERVER_DATA_MIN_UPDATE_TIME = 259200000;
