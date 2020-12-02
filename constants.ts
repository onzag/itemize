/**
 * Contains a bunch of constants that are used through the itemize app
 * while they can be changed it's not truly recommended, this is mainly for
 * internal usage and to keep configuration and have an idea
 * 
 * @packageDocumentation
 */

import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
  GraphQLEnumType,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
} from "graphql";
import { IGQLFieldsDefinitionType } from "./base/Root/gql";
import { ISQLTableDefinitionType } from "./base/Root/sql";
import path from "path";

export interface IItemizeConstantsConfig {
  /**
   * The maximum supported year
   */
  MAX_SUPPORTED_YEAR?: number;
  /**
   * Defines how many characters a string type might have
   */
  MAX_STRING_LENGTH?: number;
  /**
  * Defines how many characters (yes characters) a text type might have max
  * please define maxLenght in the property itself for specific checking
  * this check is expensive so checking twice is not good
  */
  MAX_RAW_TEXT_LENGTH?: number;
  /**
   * The MAX file size of each given independent file, remember to ensure that
   * your nginx config is in line with this number, this should be a byte number
   */
  MAX_FILE_SIZE?: number;
  /**
   * Each files property can have a number of files, this number specifies the
   * top amount of files in a property
   */
  MAX_FILES_PER_PROPERTY?: number;
  /**
   * The total amount of files that exist in a single request, this is the total
   * sum of files; this number is used for a max theorethical, as in it combines
   * the max file size and this number to specify a size limit
   */
  MAX_FILES_PER_REQUEST?: number;
  /**
   * The maximum size of a given graphql query in bytes
   */
  MAX_FIELD_SIZE?: number;
  /**
   * The maximum amount of search results that a module and its item
   * children can retrieve at once in a given search query
   * this also affects the get list command
   */
  MAX_SEARCH_RESULTS_DEFAULT?: number;
  /**
   * The maximum amount of search records that a module and its item
   * children can retrieve at once in a given search query
   */
  MAX_SEARCH_RECORDS_DEFAULT?: number;
  /**
   * The maximum number of characters the search field can
   * have that is build for the search mode
   */
  MAX_SEARCH_FIELD_LENGTH?: number;
  /**
   * The supported mime types for images
   */
  FILE_SUPPORTED_IMAGE_TYPES?: string[];
  /**
   * The minimum update time for the server data to be changed
   * basically runs mantenience functions, mainly it's about
   * updating the currency information
   * 
   * this is a millisecond amount
   */
  SERVER_DATA_MIN_UPDATE_TIME?: number;
  /**
   * The time it takes for sitemaps to be refreshed
   * 
   * this is a millisecond amount
   */
  SERVER_MAPPING_TIME?: number;
  /**
   * The maximum amount of remote listeners a socket can
   * have at once before the server denies adding more
   * these are used for realtime updates
   */
  MAX_REMOTE_LISTENERS_PER_SOCKET?: number;
  /**
   * Usernames that are not allowed to be taken
   * by users, defaults to admin and unsubscribe
   * it will prevent new users to creating accounts
   * with those names via the standard signup method
   * note that unsubscribe will remain being a protected
   * username no matter what, even if you fail
   * to specify it
   */
  PROTECTED_USERNAMES?: string[];
}

// in the client side it gets injected via webpack in the server side
// it has to be required
declare var ITEMIZE_CONSTANTS_CONFIG: IItemizeConstantsConfig;
let R_ITEMIZE_CONSTANTS_CONFIG: IItemizeConstantsConfig = typeof ITEMIZE_CONSTANTS_CONFIG !== "undefined" ?
  ITEMIZE_CONSTANTS_CONFIG : null;
if (!R_ITEMIZE_CONSTANTS_CONFIG) {
  try {
    const itemizeConfig = require(path.join(path.resolve("."), "itemize.config"));
    R_ITEMIZE_CONSTANTS_CONFIG = itemizeConfig.constants;
  } catch {
    R_ITEMIZE_CONSTANTS_CONFIG = {};
  }
}

// DATA ATTRIBUTES

/**
 * Defines the max supported integer, it should match up the database
 */
export const MAX_SUPPORTED_INTEGER = 2147483647;
/**
 * Defines the min supported integer, it should match up the database too
 */
export const MIN_SUPPORTED_INTEGER = -MAX_SUPPORTED_INTEGER;
/**
 * Defines how many decimal points are supported, for the sake of usability
 * the number is set to a precision of 6
 */
export const MAX_DECIMAL_COUNT = 6;
/**
 * Defines how big can decimal numbers get
 */
export const MAX_SUPPORTED_REAL = 999999999;
/**
 * Defines how small can decimal numbers get
 */
export const MIN_SUPPORTED_REAL = -999999999;
/**
 * Years max
 */
export const MAX_SUPPORTED_YEAR = R_ITEMIZE_CONSTANTS_CONFIG.MAX_SUPPORTED_YEAR || 3000;
/**
 * Years min
 */
export const MIN_SUPPORTED_YEAR = 0;
/**
 * Defines how many characters a string might have
 */
export const MAX_STRING_LENGTH = R_ITEMIZE_CONSTANTS_CONFIG.MAX_STRING_LENGTH || 10000;
/**
 * Defines how many characters (yes characters) a text might have max
 * please define maxLenght in the property itself for specific checking
 * this check is expensive so checking twice is not good
 */
export const MAX_RAW_TEXT_LENGTH = R_ITEMIZE_CONSTANTS_CONFIG.MAX_RAW_TEXT_LENGTH || 100000;
/**
 * The max file size (for either images and binary files)
 */
export const MAX_FILE_SIZE = R_ITEMIZE_CONSTANTS_CONFIG.MAX_FILE_SIZE || 5000000; // equivalent to 5MB
/**
 * how many files can be used in one item field at once
 */
export const MAX_FILES_PER_PROPERTY = R_ITEMIZE_CONSTANTS_CONFIG.MAX_FILES_PER_PROPERTY || 25;
/**
 * how many files can there be total
 * in a single request, this is more of a security concern
 */
export const MAX_ALL_COMBINED_FILES_SIZE =
  R_ITEMIZE_CONSTANTS_CONFIG.MAX_FILES_PER_REQUEST ?
  R_ITEMIZE_CONSTANTS_CONFIG.MAX_FILES_PER_REQUEST * MAX_FILE_SIZE :
  MAX_FILES_PER_PROPERTY * 10;
/**
 * Another just a security concern, this
 * is the size of the graphql query, 1MB should be way more than enough for a graphql query
 */
export const MAX_FIELD_SIZE = R_ITEMIZE_CONSTANTS_CONFIG.MAX_FIELD_SIZE || 1000000; // equivalent to 1MB
/**
 * how many search results can be retrieved at once these are
 * used for the actual search results
 */
export const MAX_SEARCH_RESULTS_DEFAULT = R_ITEMIZE_CONSTANTS_CONFIG.MAX_SEARCH_RECORDS_DEFAULT || 50;
/**
 * how many search results can be retrieved at once these are
 * used for the actual search results
 */
export const MAX_SEARCH_RECORDS_DEFAULT = R_ITEMIZE_CONSTANTS_CONFIG.MAX_SEARCH_RECORDS_DEFAULT || 500;
/**
 * Size in characters of the search field
 */
export const MAX_SEARCH_FIELD_LENGTH = R_ITEMIZE_CONSTANTS_CONFIG.MAX_SEARCH_FIELD_LENGTH || 1024;
/**
 * The minimum update time for the server data to be changed
 * basically runs mantenience functions, mainly it's about
 * updating the currency information
 */
export const SERVER_DATA_MIN_UPDATE_TIME = R_ITEMIZE_CONSTANTS_CONFIG.SERVER_DATA_MIN_UPDATE_TIME || 259200000; // 3 days

/**
 * The time it takes for sitemaps to be refreshed
 */
export const SERVER_MAPPING_TIME = R_ITEMIZE_CONSTANTS_CONFIG.SERVER_MAPPING_TIME || 86400000; // 1 day, to sitemap the site

/**
 * The maximum amount of remote listeners a socket supports
 */
export const MAX_REMOTE_LISTENERS_PER_SOCKET = R_ITEMIZE_CONSTANTS_CONFIG.MAX_REMOTE_LISTENERS_PER_SOCKET || 100;

/**
 * The protected usernames that cannot be taken by the users
 */
export const PROTECTED_USERNAMES = R_ITEMIZE_CONSTANTS_CONFIG.PROTECTED_USERNAMES ?
  R_ITEMIZE_CONSTANTS_CONFIG.PROTECTED_USERNAMES.concat(["unsubscribe"]) :
  ["admin", "unsubscribe", "postmaster"];


/**
 * Supported image types
 */
export const FILE_SUPPORTED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/svg+xml",
  "image/png",
  "image/webp",
];

/**
 * The properties for i18n a module should have
 */
export const MODULE_AND_ITEM_DEF_I18N = [
  "name",
];
/**
 * The properties for i18n a searchable module and item definition should have
 */
export const MODULE_AND_ITEM_DEF_I18N_SEARCHABLE = [
  "search_field_label",
  "search_field_placeholder",
  "search_keywords",
  "search_value_too_large",
]
/**
 * The custom key as it is stored in the built file, the custom key
 * is always custom in the properties
 */
export const MODULE_AND_ITEM_DEF_CUSTOM_I18N_KEY = "custom";

/**
 * The properties for i18n an item that can be excluded should have
 */
export const ITEM_CAN_BE_EXCLUDED_I18N = [
  "exclusion_selector_label",
  "exclusion_ternary_selector_label",
  "excluded_label",
  "included_label",
  "any_label",
];

/**
 * The item optional data
 */
export const ITEM_OPTIONAL_I18N = [
  "name",
];

/**
 * The properties for i18n a callout excluded item should have
 */
export const ITEM_CALLOUT_EXCLUDED_I18N = [
  "callout_excluded_label",
];

/**
 * Where the destruction markers are located
 */
export const DESTRUCTION_MARKERS_LOCATION = "DESTRUCTION_MARKERS";

/**
 * Where destruction markers get memory cached
 */
export const MEMCACHED_DESTRUCTION_MARKERS_LOCATION = "MEMCACHED_" + DESTRUCTION_MARKERS_LOCATION;

/**
 * Store a last rich text change size global to use to save memory for lenght calculation
 */
export const LAST_RICH_TEXT_CHANGE_LENGTH = "LAST_RICH_TEXT_CHANGE_LENGTH";

/**
 * Graphql endpoint errors codes that can be thrown
 */
export const ENDPOINT_ERRORS = {
  UNSPECIFIED: "UNSPECIFIED",
  INVALID_PROPERTY: "INVALID_PROPERTY", // should include a pcode
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
export const LOCALE_I18N = [
  // language name
  "name",
  // decimal separator that is used, comma or dot
  "number_decimal_separator",
  // word separator, comma, usually
  "word_separator",
  // N$ or $N depending if currency symbol goes before or after
  "currency_format",

  // For the given text editor
  "format_bold",
  "format_italic",
  "format_underline",
  "format_title",
  "format_quote",
  "format_link",
  "format_list_numbered",
  "format_list_bulleted",
  "format_add_image",
  "format_add_file",
  "format_add_video",
  "format_add_container",
  "format_add_custom",
  "format_set_style",
  "format_set_hover_style",
  "format_set_active_style",
  "format_set_class",
  "format_set_event_handlers",
  "format_set_context",
  "format_make_loop",
  "format_set_ui_handler",
  "format_set_ui_handler_arg",
  "format_set_ui_handler_arg_name",
  "format_set_ui_handler_arg_value",
  "format_more",


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
  "home",

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

  // for links
  "link_setter_title",
  "link_setter_label",
  "link_setter_placeholder",
  "link_setter_placeholder_local_only",
  "link_setter_templated",
  "link_setter_templated_label",
  "link_setter_templated_placeholder",
  "link_setter_templated_unspecified",
  "link_setter_invalid",
  "link_setter_submit",

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

  // for showing the currency selection dialog when selecting a currency
  "currency_dialog_title",

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
  Object.keys(ENDPOINT_ERRORS).map(((ee) => `error.${ee}`)),
);

/**
 * Root required i18n properties
 */
export const ROOT_REQUIRED_LOCALE_I18N = [
  "app_name",
  "app_short_name",
  "app_description",
];

/**
 * Standard i18n fields required for properties
 */
export const CLASSIC_BASE_I18N = [
  "label",
  "placeholder",
];
/**
 * Standard i18n fields required for properties when
 * they are searchable
 */
export const CLASSIC_SEARCH_BASE_I18N = [
  "search.label",
  "search.placeholder",
];
/**
 * Reduced i18n required for properties
 */
export const REDUCED_BASE_I18N = [
  "label",
];
/**
 * Reduced i18n required for properties when
 * they are searchable
 */
export const REDUCED_SEARCH_BASE_I18N = [
  "search.label",
];
/**
 * Optional i18n fields in properties
 */
export const CLASSIC_OPTIONAL_I18N = [
  "description",
];
/**
 * Optional i18n fields in properties when they are
 * searchable
 */
export const CLASSIC_SEARCH_OPTIONAL_I18N = [
  "search.description",
];
/**
 * Extended required i18n fields required in properties
 * when they use a ranged search
 */
export const CLASSIC_SEARCH_RANGED_I18N = [
  "search.range.from.label",
  "search.range.to.label",
  "search.range.from.placeholder",
  "search.range.to.placeholder",
];
/**
 * Extended optional i18n fields required in properties
 * when they use a ranged search
 */
export const CLASSIC_SEARCH_RANGED_OPTIONAL_I18N = [
  "search.range.from.description",
  "search.range.to.description",
];
/**
 * Extended i18n fields required in properties
 * when they use a location search
 */
export const LOCATION_SEARCH_I18N = [
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
export const EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES = [
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
export const STANDARD_ACCESSIBLE_RESERVED_BASE_PROPERTIES = [
  "created_at",
  "created_by",
  "edited_at",
  "edited_by",
  "reviewed_at",
  "reviewed_by",
  "parent_id",
  "parent_version",
  "parent_type",
];
/**
 * The reserved base properties that are exists within every graphql query
 * and should mirror the database
 */
export const RESERVED_BASE_PROPERTIES: IGQLFieldsDefinitionType = {
  id: {
    type: GraphQLNonNull && GraphQLNonNull(GraphQLInt),
    description: "The id of the item",
  },
  version: {
    type: GraphQLString,
    description: "An optional version of the item, the item must have versioning enabled",
  },
  type: {
    type: GraphQLNonNull && GraphQLNonNull(GraphQLString),
    description: "The type (qualified name) of the item",
  },
  parent_id: {
    type: GraphQLInt,
    description: "If exists, a parent id of this item",
  },
  parent_version: {
    type: GraphQLString,
    description: "If exists, the parent version of this item",
  },
  parent_type: {
    type: GraphQLString,
    description: "If exists, a parent type of this item",
  },
  container_id: {
    type: GraphQLNonNull && GraphQLNonNull(GraphQLString),
    description: "The storage location id where data is stored",
  },
  created_at: {
    type: GraphQLNonNull && GraphQLNonNull(GraphQLString),
    description: "When the item was created",
  },
  created_by: {
    type: GraphQLNonNull && GraphQLNonNull(GraphQLInt),
    description: "The id of the user who created this item",
  },
  edited_at: {
    type: GraphQLString,
    description: "Whenever the item was modified, otherwise null",
  },
  edited_by: {
    type: GraphQLInt,
    description: "Whoever modified this item, otherwise null",
  },
  reviewed_at: {
    type: GraphQLString,
    description: "When a moderator or admin reviewed this item",
  },
  reviewed_by: {
    type: GraphQLInt,
    description: "The user id who reviewed it",
  },
  last_modified: {
    type: GraphQLNonNull && GraphQLNonNull(GraphQLString),
    description: "An internal variable that represents when the whole item, as a whole " +
      " was last modified, by any factor, edited_at servers a UI purpose when things were " +
      " modified by normal means whereas last_modified is a global factor, it could be the " +
      " server that did the change, or a side effect, edited_at can be used in the UI " +
      " last modified is for usage which checking if items updated",
  },
  blocked_at: {
    type: GraphQLString,
    description: "When the item was blocked, blocked items are not searchable or retrievable by normal means; " +
      "if you as an user own this item, you will only see it blocked, unlike deleted items, blocked items remain " +
      "in the database until they are manually removed by an admin or moderator, none can access the data of this " +
      "item, the API will null all the fields, with the exception of blocked_at, blocked_by, blocked_until and blocked_reason",
  },
  blocked_until: {
    type: GraphQLString,
    description: "Basically makes the block be temporary and will be automatically lifted by the database",
  },
  blocked_by: {
    type: GraphQLInt,
    description: "By whom it was blocked",
  },
  blocked_reason: {
    type: GraphQLString,
    description: "A written text of why it was blocked",
  },
  flagged_by: {
    type: GraphQLList && GraphQLList(GraphQLInt),
    description: "Users who flagged this item",
  },
  flagged_reasons: {
    type: GraphQLList && GraphQLList(GraphQLString),
    description: "Users who flagged this item, reason",
  },
};

export const CREATED_AT_INDEX = "CREATED_AT_INDEX";
export const CREATED_BY_INDEX = "CREATED_BY_INDEX";
export const PARENT_INDEX = "PARENT_INDEX";
export const COMBINED_INDEX = "COMBINED_INDEX";

/**
 * The reserved base properties but in SQL form
 */
export const RESERVED_BASE_PROPERTIES_SQL: (combinedIndexes: string[], addedIndexes: string[]) => ISQLTableDefinitionType = (
  combinedIndexes: string[],
  addedIndexes: string[],
) => ({
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
    index: combinedIndexes.includes("parent_id") ? {
      id: COMBINED_INDEX,
      type: "btree",
      level: combinedIndexes.indexOf("parent_id"),
    } : {
        id: PARENT_INDEX,
        type: "btree",
        level: 0,
      },
  },
  parent_version: {
    type: "string",
    index: combinedIndexes.includes("parent_version") ? {
      id: COMBINED_INDEX,
      type: "btree",
      level: combinedIndexes.indexOf("parent_version"),
    } : {
        id: PARENT_INDEX,
        type: "btree",
        level: 1,
      },
  },
  parent_type: {
    type: "string",
    index: combinedIndexes.includes("parent_type") ? {
      id: COMBINED_INDEX,
      type: "btree",
      level: combinedIndexes.indexOf("parent_type"),
    } : {
        id: PARENT_INDEX,
        type: "btree",
        level: 2,
      },
  },
  container_id: {
    type: "string",
    notNull: true,
  },
  created_at: {
    type: "datetime",
    notNull: true,
    index: (combinedIndexes.includes("created_at") || addedIndexes.includes("created_at")) ? {
      id: combinedIndexes.includes("created_at") ? COMBINED_INDEX : CREATED_AT_INDEX,
      type: "btree",
      level: combinedIndexes.includes("created_at") ? combinedIndexes.indexOf("created_at") : 0,
    } : null,
  },
  created_by: {
    type: "integer",
    notNull: true,
    index: combinedIndexes.includes("created_by") ? {
      id: COMBINED_INDEX,
      type: "btree",
      level: combinedIndexes.indexOf("created_by"),
    } : {
        id: CREATED_BY_INDEX,
        type: "btree",
        level: 0,
      },
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
export const CONNECTOR_SQL_COLUMN_ID_FK_NAME = "MODULE_ID";
/**
 * The column name of the foreign key that connects the module table
 * with the item definition table
 */
export const CONNECTOR_SQL_COLUMN_VERSION_FK_NAME = "MODULE_VERSION";
/**
 * an utility to build prefixes
 * @param s the string to turn into a prefix
 */
export const PREFIX_BUILD = (s: string) => s + "_";
/**
 * an utility to build suffixes
 * @param s the string to turn into a suffix
 */
export const SUFFIX_BUILD = (s: string) => "_" + s;
/**
 * an utility to concat prefixes
 * @param args the string list to concat
 */
export const PREFIXED_CONCAT = (...args: string[]) => args.join("__");
/**
 * Used for creation of sql contraints
 */
export const SQL_CONSTRAINT_PREFIX = PREFIX_BUILD("CONSTRAINT");
/**
 * Every include when used within the database or graphql is prefixed with
 */
export const INCLUDE_PREFIX = PREFIX_BUILD("INCLUDE");
/**
 * Every module when used within the database, graphql or its qualified name is prefixed with
 */
export const MODULE_PREFIX = PREFIX_BUILD("MOD");
/**
 * The search mode module is prefixed with
 */
export const SEARCH_MODE_MODULE_PREFIX = PREFIX_BUILD("SEARCH_MODE");
/**
 * Every item definition when used within the database, graphql or its qualified name is prefixed with
 */
export const ITEM_DEFINITION_PREFIX = PREFIX_BUILD("IDEF");
/**
 * The suffix added to refer to the exclusion state of an include in SQL or graphql
 */
export const EXCLUSION_STATE_SUFFIX = SUFFIX_BUILD("EXCLUSION_STATE");
/**
 * The prefix used in the graphql endpoint for searches of modules and item definitions
 */
export const PREFIX_SEARCH = PREFIX_BUILD("SEARCH");
/**
 * The prefix used in the graphql endpoint for searches of modules and item definitions in traditional mode
 */
export const PREFIX_TRADITIONAL_SEARCH = PREFIX_BUILD("TSEARCH");
/**
 * The prefix used in the graphql endpoint for getting item definitions
 */
export const PREFIX_GET = PREFIX_BUILD("GET");
/**
 * The prefix used in the graphql endpoint for getting lists of item definitions and modules
 */
export const PREFIX_GET_LIST = PREFIX_BUILD("GET_LIST");
/**
 * The prefix used in the graphql endpoint for adding item definitions
 */
export const PREFIX_ADD = PREFIX_BUILD("ADD");
/**
 * The prefix used in the graphql endpoint for editing item definitions
 */
export const PREFIX_EDIT = PREFIX_BUILD("EDIT");
/**
 * The prefix used in the graphql endpoint for deleting item definitions
 */
export const PREFIX_DELETE = PREFIX_BUILD("DELETE");
/**
 * The policy prefixes for all the policies that are available within itemize
 * in order to create complex rules
 */
export const POLICY_PREFIXES = {
  read: PREFIX_BUILD("POLICY_READ"),
  edit: PREFIX_BUILD("POLICY_EDIT"),
  delete: PREFIX_BUILD("POLICY_DELETE"),
  parent: PREFIX_BUILD("POLICY_PARENT"),
};
/**
 * The required i18n fields to require for a policy
 * policies get a title that should be human readable in
 * the given language, and a fail error message for when they fail
 */
export const POLICY_REQUIRED_I18N = [
  "title", "fail",
];
/**
 * Policies can also recieve an optional description
 */
export const POLICY_OPTIONAL_I18N = [
  "description",
];

/**
 * The format that dates are expected to have in order to be exchanged
 * these represent the SQL form, does not support nano date
 */
export const DATETIME_FORMAT = "YYYY-MM-DD HH:mm:ss.SSSZ";
/**
 * The format that time is expected to have in order to be exchanged
 * this is the SQL form
 */
export const TIME_FORMAT = "HH:mm:ss";
/**
 * The format date has in order to be exchanged, this is
 * the SQL form
 */
export const DATE_FORMAT = "YYYY-MM-DD";

/**
 * The ID element fields are the id and type unique identifiers
 * that make the client able to run requests for a given item id
 * @ignore
 */
const SEARCH_RECORD_FIELDS = {
  id: {
    type: GraphQLNonNull && GraphQLNonNull(GraphQLInt),
  },
  type: {
    type: GraphQLNonNull && GraphQLNonNull(GraphQLString),
  },
  version: {
    type: GraphQLString,
  },
  last_modified: {
    type: GraphQLNonNull && GraphQLNonNull(GraphQLString),
  },
};
/**
 * The ID element in graphql form
 */
export const SEARCH_RECORD_GQL = GraphQLObjectType && new GraphQLObjectType({
  name: "SEARCH_RECORD",
  fields: SEARCH_RECORD_FIELDS,
});
/**
 * The ID element as input form
 */
export const SEARCH_RECORD_INPUT_GQL = GraphQLInputObjectType && new GraphQLInputObjectType({
  name: "SEARCH_RECORD_INPUT",
  fields: SEARCH_RECORD_FIELDS,
});

/**
 * The id container contains the way that search results are returned
 * with the records and the last record of the given records
 */
export const SEARCH_RECORDS_CONTAINER_GQL = GraphQLObjectType && new GraphQLObjectType({
  name: "SEARCH_RECORDS_CONTAINER",
  fields: {
    records: {
      type: GraphQLList && GraphQLList(GraphQLNonNull(SEARCH_RECORD_GQL)),
    },
    last_modified: {
      type: GraphQLString,
    },
    count: {
      type: GraphQLNonNull(GraphQLInt),
    },
    limit: {
      type: GraphQLNonNull(GraphQLInt)
    },
    offset: {
      type: GraphQLNonNull(GraphQLInt)
    },
  },
});

/**
 * Converting the search options to an enum type
 * @ignore
 */
const searchOptionsOrderByOptions = {};
["ASC", "DESC"].forEach((key) => {
  searchOptionsOrderByOptions[key] = {
    value: key.toLowerCase(),
  };
});

/**
 * Converting the search null to an enum type
 * @ignore
 */
const searchOptionsNullOrderOptions = {};
["FIRST", "LAST"].forEach((key) => {
  searchOptionsNullOrderOptions[key] = {
    value: key.toLowerCase(),
  };
});

/**
 * And this is for the order by rule enum
 */
export const ORDERBY_RULE_DIRECTION = GraphQLEnumType && new GraphQLEnumType({
  name: "RESERVED_SEARCH_PROPERTY_ENUM_ORDER_BY",
  values: searchOptionsOrderByOptions,
});

/**
 * And this is for the order by rule enum nulls
 */
export const ORDERBY_NULLS_PRIORITY = GraphQLEnumType && new GraphQLEnumType({
  name: "RESERVED_SEARCH_PROPERTY_NULLS",
  values: searchOptionsNullOrderOptions,
});

export const ORDERBY_RULE = GraphQLInputObjectType && new GraphQLInputObjectType({
  name: "RESERVED_ORDERBY_RULE",
  fields: {
    direction: {
      type: GraphQLNonNull(ORDERBY_RULE_DIRECTION),
    },
    priority: {
      type: GraphQLNonNull(GraphQLInt),
    },
    nulls: {
      type: GraphQLNonNull(ORDERBY_NULLS_PRIORITY),
    },
  },
  description: "Order by the property, which might be an extension, in any direction",
});

export type SearchVariants = "exact" | "from" | "to" | "location" | "radius" | "search";

export interface IOrderByRuleType {
  [property: string]: {
    direction: "asc" | "desc",
    priority: number,
    nulls: "first" | "last",
  },
}

/**
 * These are the base query properties that are
 * used in a search and get list query
 */
const BASE_QUERY_PROPERTIES = {
  token: {
    type: GraphQLString,
    description: "the access token provided by the app",
  },
  language: {
    type: GraphQLNonNull && GraphQLNonNull(GraphQLString),
    description: "A supported language (dictionary wise) 2 digit code, it is used for FTS purposes and text analysis",
  },
};

/**
 * The reserved search properties represent how searches are done
 * and these are included in every search
 */
export const RESERVED_IDEF_SEARCH_PROPERTIES = (orderByRule: any) => ({
  ...BASE_QUERY_PROPERTIES,
  limit: {
    type: GraphQLNonNull && GraphQLNonNull(GraphQLInt),
    description: "The SQL limit to use in order to page the amount of results",
  },
  offset: {
    type: GraphQLNonNull && GraphQLNonNull(GraphQLInt),
    description: "The SQL offset to use in order to page the amount of results",
  },
  order_by: {
    type: GraphQLNonNull && orderByRule && GraphQLNonNull(orderByRule),
    description: "An order type",
  },
  since: {
    type: GraphQLString,
    description: "Basically a limiter that causes the values to only be returned since that date, the date must be an ISO type",
  },
  created_by: {
    type: GraphQLInt,
    description: "An specified owner to filter by (this affects permissions)",
  },
  parent_id: {
    type: GraphQLInt,
    description: "a parent id for the item (must be specified with parent_type)",
  },
  parent_version: {
    type: GraphQLString,
    description: "a parent version for the item (must be specified with parent_type)",
  },
  parent_type: {
    type: GraphQLString,
    description: "a parent item definition qualified path (must be specified with parent_id)",
  },
  version_filter: {
    type: GraphQLString,
    description: "Allow only items that are of this version",
  },
  search: {
    type: GraphQLString,
    description: "A search string, searches within the prop extensions and the prop extensions only",
  },
});

/**
 * These apply when doing module searches
 */
export const RESERVED_MODULE_SEARCH_PROPERTIES = (orderByRule: any) => ({
  ...RESERVED_IDEF_SEARCH_PROPERTIES,
  limit: {
    type: GraphQLNonNull && GraphQLNonNull(GraphQLInt),
    description: "The SQL limit to use in order to page the amount of results",
  },
  offset: {
    type: GraphQLNonNull && GraphQLNonNull(GraphQLInt),
    description: "The SQL offset to use in order to page the amount of results",
  },
  types: {
    type: GraphQLList && GraphQLList(GraphQLNonNull(GraphQLString)),
    description: "A list of types (qualified names) to filter by",
  },
  since: {
    type: GraphQLString,
    description: "Basically a limiter that causes the values to only be returned since that date, the date must be an ISO type",
  },
  order_by: {
    type: GraphQLNonNull && orderByRule && GraphQLNonNull(orderByRule),
    description: "An order type",
  },
  created_by: {
    type: GraphQLInt,
    description: "An specified owner to filter by (this affects permissions)",
  },
  parent_id: {
    type: GraphQLInt,
    description: "a parent id for the item (must be specified with parent_type)",
  },
  parent_version: {
    type: GraphQLString,
    description: "a parent version for the item (must be specified with parent_type)",
  },
  parent_type: {
    type: GraphQLString,
    description: "a parent item definition qualified path (must be specified with parent_id)",
  },
  version_filter: {
    type: GraphQLString,
    description: "Allow only items that are of this version",
  },
  search: {
    type: GraphQLString,
    description: "A search string",
  },
});

/**
 * Properties required in order to get
 */
export const RESERVED_GETTER_PROPERTIES = {
  ...BASE_QUERY_PROPERTIES,
  id: {
    type: GraphQLNonNull && GraphQLNonNull(GraphQLInt),
    description: "the id for that item",
  },
  version: {
    type: GraphQLString,
    description: "a version for this item",
  },
};

/**
 * Properties required in order to change something
 * either edit or delete
 */
export const RESERVED_CHANGE_PROPERTIES = {
  ...RESERVED_GETTER_PROPERTIES,
  listener_uuid: {
    type: GraphQLString,
    description: "An uuid to identify the creator of this action",
  },
};

/**
 * Properties required in order to get a list
 */
export const RESERVED_GETTER_LIST_PROPERTIES = {
  ...BASE_QUERY_PROPERTIES,
  records: {
    type: GraphQLNonNull && GraphQLNonNull(GraphQLList(SEARCH_RECORD_INPUT_GQL)),
    description: "the records to fetch for that item",
  },
  created_by: {
    type: GraphQLInt,
    description: "An specified owner to filter by (this affects permissions)",
  },
};

/**
 * Properties required in order to add something
 */
export const RESERVED_ADD_PROPERTIES = {
  ...BASE_QUERY_PROPERTIES,
  listener_uuid: {
    type: GraphQLString,
    description: "An uuid to identify the creator of this action",
  },
  in_behalf_of: {
    type: GraphQLInt,
    description: "an user id that will be the true owner",
  },
  parent_id: {
    type: GraphQLInt,
    description: "a parent id that will namespace this item (must be specified with parent_module and idef)",
  },
  parent_version: {
    type: GraphQLString,
    description: "a parent version that will namespace this item (must be specified with parent_module and idef)",
  },
  parent_type: {
    type: GraphQLString,
    description: "a parent item definition qualified path (must be specified with parent_id)",
  },
  container_id: {
    type: GraphQLNonNull && GraphQLNonNull(GraphQLString),
    description: "the storage id where storage data is stored according to definitions",
  },
  for_id: {
    type: GraphQLInt,
    description: "If specified create this item for this given id, the id must already exist and be of the same type," +
      " this comes in handy for versioning as you need to specify an id to create different versions, please avoid collisions or" +
      " it will raise an error",
  },
  version: {
    type: GraphQLString,
    description: "An optional version set a for_id without specifying a version",
  },
};

/**
 * Role that means the owner of this item
 */
export const OWNER_METAROLE = "&OWNER";
/**
 * Role that means, well, anyone
 */
export const ANYONE_METAROLE = "&ANYONE";
/**
 * Role that means anyone logged in
 */
export const ANYONE_LOGGED_METAROLE = "&ANYONE_LOGGED";
/**
 * Role that means any guest
 */
export const GUEST_METAROLE = "&GUEST";
/**
 * Moderation fields for flagging
 */
export const MODERATION_FIELDS = [
  "flagged_by",
  "flagged_reasons",
];

/**
 * Units that are allowed within the itemize application these
 * are for the unit subtype
 */
export const UNIT_SUBTYPES = [
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
export const UNSPECIFIED_OWNER = -1;

/**
 * Resources that are protected from fetching without specifying the devkey
 */
export const PROTECTED_RESOURCES = [
  "/build.development.js",
]

/**
 * An identifier for the server data
 */
export const SERVER_DATA_IDENTIFIER = "SERVER_DATA";

/**
 * An identifier from when the server kicks an user from the
 * login (aka sudden remote logout)
 */
export const SERVER_USER_KICK_IDENTIFIER = "SERVER_KICK";

/**
 * An identifier for the currency factors and the currency
 * factor information
 */
export const CURRENCY_FACTORS_IDENTIFIER = "CURRENCY_FACTORS"

/**
 * An identifier for the deleted table information stuff
 */
export const DELETED_REGISTRY_IDENTIFIER = "DELETED_REGISTRY";

/**
 * An identifier for the internal global registry
 */
export const REGISTRY_IDENTIFIER = "REGISTRY";

/**
 * An identifier for caching the currency api response
 * for currency conversion in redis
 */
export const CACHED_CURRENCY_RESPONSE = "CACHED_CURRENCY_RESPONSE";
