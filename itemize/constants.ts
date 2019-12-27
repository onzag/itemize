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

// DATA ATTRIBUTES

// Defines the max supported integer, it should match up the database
export const MAX_SUPPORTED_INTEGER = 2147483647;
// Defines the min supported integer, it should match up the database too
export const MIN_SUPPORTED_INTEGER = -MAX_SUPPORTED_INTEGER;
// Defines how many decimal points are supported, for the sake of usability
// the number is set to a precision of 6
export const MAX_DECIMAL_COUNT = 6;
// Defines how big can decimal numbers get
export const MAX_SUPPORTED_REAL = 999999999;
// Defines how small can decimal numbers get
export const MIN_SUPPORTED_REAL = -999999999;
// Years max
export const MAX_SUPPORTED_YEAR = 3000;
// Years min
export const MIN_SUPPORTED_YEAR = 0;
// Defines how many characters a string might have
export const MAX_STRING_LENGTH = 10000;
// Defines how many characters (yes characters) a text might have max
// please define maxLenght in the property itself for specific checking
// this check is expensive so checking twice is not good
export const MAX_RAW_TEXT_LENGTH = 100000;
// The max file size (for either images and binary files)
export const MAX_FILE_SIZE = 5000000; // equivalent to 5MB
export const MAX_FILE_BATCH_COUNT = 25; // how many files can be used in one item at once
export const MAX_TOTAL_STORED_FILES = MAX_FILE_SIZE * 100; // how many bytes the user can store
export const FILE_SUPPORTED_IMAGE_TYPES = [
  "image/png",
  "image/gif",
  "image/jpeg",
  "image/svg+xml",
  "image/png",
];

// The properties for i18n a module should have
export const MODULE_AND_ITEM_DEF_I18N = [
  "name",
  "fts_search_field_label",
  "fts_search_field_placeholder",
];
export const MODULE_AND_ITEM_DEF_CUSTOM_I18N_KEY = "custom";

// The properties for i18n an item that can be excluded should have
export const ITEM_CAN_BE_EXCLUDED_I18N = [
  "exclusion_selector_label",
  "exclusion_ternary_selector_label",
  "excluded_label",
  "included_label",
  "any_label",
];

// The item optional data
export const ITEM_OPTIONAL_I18N = [
  "name",
];

// The properties for i18n a callout excluded item should have
export const ITEM_CALLOUT_EXCLUDED_I18N = [
  "callout_excluded_label",
];

// This is for small use anywhere language data
export const LOCALE_I18N = [
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
  "format_italic" ,
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

  // for item definition too
  "callout_exclude_warning",

  // for showing the dialog message when selecting units
  "unit_dialog_title",
  "unit_dialog_others",
  "unit_dialog_metric",
  "unit_dialog_imperial",

  // basic base errors
  "error.INVALID_CREDENTIALS",
  "error.BLOCKED",
  "error.CANT_CONNECT",
  "error.INVALID_DATA_SUBMIT_REFUSED",
  "error.INTERNAL_SERVER_ERROR",
  "error.UNSPECIFIED",
  "error.MUST_BE_LOGGED_IN",
  "error.FORBIDDEN",
  "error.USER_BLOCKED",
  "error.USER_REMOVED",
  "error.NOT_FOUND",
];

// ATTRIBUTES FOR i18N PROPERTIES
export const CLASSIC_BASE_I18N = [
  "label",
  "placeholder",
];
export const CLASSIC_SEARCH_BASE_I18N = [
  "search.label",
  "search.placeholder",
];
export const REDUCED_BASE_I18N = [
  "label",
];
export const REDUCED_SEARCH_BASE_I18N = [
  "search.label",
];
export const CLASSIC_OPTIONAL_I18N = [
  "description",
];
export const CLASSIC_SEARCH_OPTIONAL_I18N = [
  "search.description",
];
export const CLASSIC_SEARCH_RANGED_I18N = [
  "search.range.from.label",
  "search.range.to.label",
  "search.range.from.placeholder",
  "search.range.to.placeholder",
];
export const CLASSIC_SEARCH_RANGED_OPTIONAL_I18N = [
  "search.range.from.description",
  "search.range.to.description",
];
export const LOCATION_SEARCH_I18N = [
  "search.label",
  "search.placeholder",
  "search.radius.label",
  "search.radius.placeholder",
];

// properties that are externalized from the property reserved list
// outside of data
export const EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES = [
  "id",
  "type",
  "module_path",
  "idef_path",
  "blocked_at",
  "blocked_by",
  "blocked_until",
  "blocked_reason",
  "last_modified",
];
export const STANDARD_ACCESSIBLE_RESERVED_BASE_PROPERTIES = [
  "created_at",
  "created_by",
  "edited_at",
  "edited_by",
  "reviewed_at",
  "reviewed_by",
];
// INVALID RESERVED PROPERTY NAMES
export const RESERVED_BASE_PROPERTIES: IGQLFieldsDefinitionType = {
  id: {
    type: GraphQLNonNull(GraphQLInt),
    description: "The id of the object",
  },
  type: {
    type: GraphQLNonNull(GraphQLString),
    description: "The type (qualified name) of the object",
  },
  module_path: {
    type: GraphQLNonNull(GraphQLString),
    description: "The path of the module from root",
  },
  idef_path: {
    type: GraphQLNonNull(GraphQLString),
    description: "The path of the item definition from the module",
  },
  created_at: {
    type: GraphQLNonNull(GraphQLString),
    description: "When the item was created",
  },
  created_by: {
    type: GraphQLNonNull(GraphQLInt),
    description: "The id of the user who created this item",
  },
  edited_at: {
    type: GraphQLString,
    description: "Whenever the item was modified, otherwise null",
  },
  edited_by: {
    type: GraphQLString,
    description: "Whoever modified this item, otherwise null",
  },
  reviewed_at: {
    type: GraphQLString,
    description: "When a moderator or admin reviewed this object",
  },
  reviewed_by: {
    type: GraphQLInt,
    description: "The user id who reviewed it",
  },
  last_modified: {
    type: GraphQLNonNull(GraphQLString),
    description: "An internal variable that represents when the whole object, as a whole " +
    " was last modified, by any factor, edited_at servers a UI purpose when things were " +
    " modified by normal means whereas last_modified is a global factor, it could be the " +
    " server that did the change, or a side effect, edited_at can be used in the UI " +
    " last modified is for usage which checking if objects updated",
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
    type: GraphQLList(GraphQLInt),
    description: "Users who flagged this item",
  },
  flagged_reasons: {
    type: GraphQLList(GraphQLString),
    description: "Users who flagged this item, reason",
  },
};
// The same but in SQL
export const RESERVED_BASE_PROPERTIES_SQL: ISQLTableDefinitionType = {
  id: {
    type: "serial",
  },
  type: {
    type: "string",
    notNull: true,
  },
  module_path: {
    type: "string",
    notNull: true,
  },
  idef_path: {
    type: "string",
    notNull: true,
  },
  created_at: {
    type: "datetime",
    notNull: true,
  },
  created_by: {
    type: "integer",
    notNull: true,
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
};
export const MAX_SQL_LIMIT = 25;
export const CONNECTOR_SQL_COLUMN_FK_NAME = "MODULE_ID";
export const PREFIX_BUILD = (s: string) => s + "_";
export const SUFFIX_BUILD = (s: string) => "_" + s;
export const PREFIXED_CONCAT = (...args: string[]) => args.join("__");
export const ITEM_PREFIX = PREFIX_BUILD("ITEM");
export const MODULE_PREFIX = PREFIX_BUILD("MOD");
export const SEARCH_MODE_MODULE_PREFIX = PREFIX_BUILD("SEARCH_MODE");
export const ITEM_DEFINITION_PREFIX = PREFIX_BUILD("IDEF");
export const EXCLUSION_STATE_SUFFIX = SUFFIX_BUILD("EXCLUSION_STATE");
export const PREFIX_SEARCH = PREFIX_BUILD("SEARCH");
export const PREFIX_GET = PREFIX_BUILD("GET");
export const PREFIX_GET_LIST = PREFIX_BUILD("GET_LIST");
export const PREFIX_ADD = PREFIX_BUILD("ADD");
export const PREFIX_EDIT = PREFIX_BUILD("EDIT");
export const PREFIX_DELETE = PREFIX_BUILD("DELETE");
export const INVALID_POLICY_ERROR = "INVALID_POLICY";
export const POLICY_PREFIXES = {
  edit: PREFIX_BUILD("POLICY_EDIT"),
  delete: PREFIX_BUILD("POLICY_DELETE"),
};
export const POLICY_REQUIRED_I18N = [
  "label", "placeholder", "fail",
];
export const POLICY_OPTIONAL_I18N = [
  "description",
];
export const ORDER_BY_OPTIONS = {
  DEFAULT: "DEFAULT",
  RELEVANCY: "RELEVANCY",
  DATE: "DATE",
};
export const DATETIME_FORMAT = "YYYY-MM-DDTHH:mm:ss\\Z";
export const TIME_FORMAT = "HH:mm:ss";
export const DATE_FORMAT = "YYYY-MM-DD";

const ID_ELEMENT_FIELDS = {
  id: {
    type: GraphQLNonNull(GraphQLInt),
  },
  type: {
    type: GraphQLNonNull(GraphQLString),
  },
  module_path: {
    type: GraphQLNonNull(GraphQLString),
  },
  idef_path: {
    type: GraphQLNonNull(GraphQLString),
  },
};
export const ID_ELEMENT_GQL = new GraphQLObjectType({
  name: "ID_ELEMENT",
  fields: ID_ELEMENT_FIELDS,
});

export const ID_ELEMENT_INPUT_GQL = new GraphQLInputObjectType({
  name: "ID_ELEMENT_INPUT",
  fields: ID_ELEMENT_FIELDS,
});

export const ID_CONTAINER_GQL = new GraphQLObjectType({
  name: "ID_CONTAINER",
  fields: {
    ids: {
      type: GraphQLList(GraphQLNonNull(ID_ELEMENT_GQL)),
    },
  },
});

const searchOptionsOrderByOptions = {};
Object.keys(ORDER_BY_OPTIONS).forEach((key) => {
  searchOptionsOrderByOptions[key] = {
    value: key,
  };
});
const BASE_QUERY_PROPERTIES = {
  token: {
    type: GraphQLString,
    description: "the access token provided by the app",
  },
  language: {
    type: GraphQLNonNull(GraphQLString),
    description: "A supported language (dictionary wise) 2 digit code, it is used for FTS purposes and text analysis",
  },
};
export const RESERVED_SEARCH_PROPERTIES = {
  ...BASE_QUERY_PROPERTIES,
  order_by: {
    type: GraphQLNonNull(new GraphQLEnumType({
      name: "RESERVED_SEARCH_PROPERTY_ENUM_ORDER_BY",
      values: searchOptionsOrderByOptions,
    })),
    description: "An order type",
  },
  search: {
    type: GraphQLString,
    description: "A search string",
  },
};
export const RESERVED_MODULE_SEARCH_PROPERTIES = {
  ...RESERVED_SEARCH_PROPERTIES,
  types: {
    type: GraphQLList(GraphQLNonNull(GraphQLString)),
    description: "A list of types (qualified names) to filter by",
  },
};
export const RESERVED_GETTER_PROPERTIES = {
  ...BASE_QUERY_PROPERTIES,
  id: {
    type: GraphQLNonNull(GraphQLInt),
    description: "the id for that item",
  },
};
export const RESERVED_CHANGE_PROPERTIES = {
  ...RESERVED_GETTER_PROPERTIES,
  listener_uuid: {
    type: GraphQLNonNull(GraphQLString),
    description: "An uuid to identify this action",
  },
};
export const RESERVED_GETTER_LIST_PROPERTIES = {
  ...BASE_QUERY_PROPERTIES,
  ids: {
    type: GraphQLNonNull(GraphQLList(ID_ELEMENT_INPUT_GQL)),
    description: "the ids list for that item",
  },
};
export const RESERVED_ADD_PROPERTIES = {
  ...BASE_QUERY_PROPERTIES,
};
export const USER_ROLES = {
  ADMIN: "ADMIN",
  MODERATOR: "MODERATOR",
  USER: "USER",
};
export const SELF_METAROLE = "SELF";
export const ANYONE_METAROLE = "ANYONE";
export const ANYONE_LOGGED_METAROLE = "ANYONE_LOGGED";
export const GUEST_METAROLE = "GUEST";
export const MODERATION_FIELDS = [
  "flagged_by",
  "flagged_reasons",
];
export const ROLES_THAT_HAVE_ACCESS_TO_MODERATION_FIELDS = [
  USER_ROLES.ADMIN,
  USER_ROLES.MODERATOR,
];

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

export const UNSPECIFIED_OWNER = -1;
export const OWNER_ID_AS_OBJECT_ID = -2;
