import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLEnumType,
  GraphQLList,
  GraphQLBoolean,
  GraphQLObjectType,
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
export const MAX_FILE_BATCH_COUNT = 25; // how many files can be uploaded at once max
export const MAX_TOTAL_STORED_FILES = MAX_FILE_SIZE * 100; // how many bytes the user can store
export const FILE_SUPPORTED_IMAGE_TYPES = [
  "image/png",
  "image/gif",
  "image/jpeg",
  "image/svg+xml",
  "image/png",
];

// The properties for i18n a module should have
export const MODULE_I18N = [
  "name",
  "searchFormTitle",
  "ftsSearchFieldLabel",
  "ftsSearchFieldPlaceholder",
];

// The properties for i18n an item should have
export const ITEM_DEFINITION_I18N = [
  "name",
  "searchFormTitle",
  "createFormTitle",
  "editFormTitle",
  "ftsSearchFieldLabel",
  "ftsSearchFieldPlaceholder",
];

// The properties for i18n an item that can be excluded should have
export const ITEM_CAN_BE_EXCLUDED_I18N = [
  "exclusionSelectorLabel",
  "exclusionTernarySelectorLabel",
  "excludedLabel",
  "includedLabel",
  "anyLabel",
];

// The item optional data
export const ITEM_OPTIONAL_I18N = [
  "name",
];

// The properties for i18n a callout excluded item should have
export const ITEM_CALLOUT_EXCLUDED_I18N = [
  "calloutExcludedLabel",
];

// This is for small use anywhere language data
export const LOCALE_I18N = [
  "name",
  "number_decimal_separator",
  "word_separator",
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

  // for item definition element
  "extended_properties_wizard_label",
  "base_properties_wizard_label",
  "rare_properties_wizard_label",
  "moderate_properties_wizard_label",
  "wizard_next",
  "wizard_prev",
  "wizard_submit",
  "wizard_invalid_message",
  "rare_properties_label",
  "moderate_properties_label",

  // for item definition too
  "callout_exclude_warning",

  // for showing the dialog message when selecting units
  "unit_dialog_title",
  "unit_dialog_others",
  "unit_dialog_metric",
  "unit_dialog_imperial",
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
  "blocked_at",
  "blocked_by",
  "blocked_until",
  "blocked_reason",
  "mod_comments",
];
// INVALID RESERVED PROPERTY NAMES
export const RESERVED_BASE_PROPERTIES: IGQLFieldsDefinitionType = {
  id: {
    type: GraphQLNonNull(GraphQLID),
    description: "The id of the object",
  },
  type: {
    type: GraphQLNonNull(GraphQLString),
    description: "The type (qualified name) of the object",
  },
  created_at: {
    type: GraphQLNonNull(GraphQLString),
    description: "When the item was created",
  },
  created_by: {
    type: GraphQLNonNull(GraphQLID),
    description: "The id of the user who created this item",
  },
  language: {
    type: GraphQLNonNull(GraphQLString),
    description: "The language that was used when this item was created",
  },
  country: {
    type: GraphQLNonNull(GraphQLString),
    description: "The country that was used when this item was created",
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
    type: GraphQLID,
    description: "The user id who reviewed it",
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
    type: GraphQLID,
    description: "By whom it was blocked",
  },
  blocked_reason: {
    type: GraphQLString,
    description: "A written text of why it was blocked",
  },
  mod_comments: {
    type: GraphQLList(GraphQLString),
    description: "Moderation comments",
  },
  flagged_by: {
    type: GraphQLList(GraphQLID),
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
  created_at: {
    type: "datetime",
    notNull: true,
  },
  created_by: {
    type: "integer",
    notNull: true,
  },
  language: {
    type: "string",
    notNull: true,
  },
  country: {
    type: "string",
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
  mod_comments: {
    type: "text[]",
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
export const ITEM_DEFINITION_PREFIX = PREFIX_BUILD("IDEF");
export const EXCLUSION_STATE_SUFFIX = SUFFIX_BUILD("EXCLUSION_STATE");
export const PREFIX_SEARCH = PREFIX_BUILD("SEARCH");
export const PREFIX_GET = PREFIX_BUILD("GET");
export const PREFIX_GET_LIST = PREFIX_BUILD("GET_LIST");
export const PREFIX_ADD = PREFIX_BUILD("ADD");
export const PREFIX_EDIT = PREFIX_BUILD("EDIT");
export const PREFIX_DELETE = PREFIX_BUILD("DELETE");
export const POLICY_PREFIXES = {
  edit: PREFIX_BUILD("POLICY_EDIT"),
  delete: PREFIX_BUILD("POLICY_DELETE"),
};
export const ORDER_BY_OPTIONS = {
  DEFAULT: "DEFAULT",
  RELEVANCY: "RELEVANCY",
  DATE: "DATE",
};
export const DATETIME_FORMAT = "YYYY-MM-DDTHH:mm:ss\\Z";
export const TIME_FORMAT = "HH:mm:ss";
export const DATE_FORMAT = "YYYY-MM-DD";

export const ID_CONTAINER_GQL = new GraphQLObjectType({
  name: "ID_CONTAINER",
  fields: {
    ids: {
      type: GraphQLList(GraphQLNonNull(GraphQLID)),
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
    type: GraphQLNonNull(GraphQLString),
    description: "the access token provided by the app",
  },
  language: {
    type: GraphQLNonNull(GraphQLString),
    description: "A supported language (dictionary wise) 2 digit code",
  },
  country: {
    type: GraphQLNonNull(GraphQLString),
    description: "A country 2 digit code",
  },
};
export const RESERVED_SEARCH_PROPERTIES = {
  ...BASE_QUERY_PROPERTIES,
  filter_by_language: {
    type: GraphQLNonNull(GraphQLBoolean),
    description: "Whether to filter by language",
  },
  filter_by_country: {
    type: GraphQLNonNull(GraphQLBoolean),
    description: "Whether to filter by country",
  },
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
    type: GraphQLNonNull(GraphQLID),
    description: "the id for that item",
  },
};
export const RESERVED_GETTER_LIST_PROPERTIES = {
  ...BASE_QUERY_PROPERTIES,
  ids: {
    type: GraphQLNonNull(GraphQLID),
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
