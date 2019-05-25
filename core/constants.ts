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

export const MODULE_I18N = [
  "name",
  "searchFormTitle",
];

export const ITEM_DEFINITION_I18N = [
  "name",
  "searchFormTitle",
  "createFormTitle",
  "editFormTitle",
];

export const ITEM_CAN_BE_EXCLUDED_I18N = [
  "exclusionSelectorLabel",
  "exclusionTernarySelectorLabel",
  "excludedLabel",
  "includedLabel",
  "anyLabel",
];

export const ITEM_OPTIONAL_I18N = [
  "name",
];

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
  "search.distance.label",
  "search.distance.placeholder",
];

// INVALID RESERVED PROPERTY NAMES
export const RESERVED_BASE_PROPERTIES = {
  id: "ID!",
  created_at: "String!",
  created_by: "ID!",
  edited_at: "String",
  reviewed_at: "String",
  reviewed_by: "ID",
  parent_id: "ID",
  item_id: "String",
};
export const RESERVED_BASE_PROPERTIES_SQL = {
  id: {
    type: "serial",
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
  reviewed_at: {
    type: "datetime",
  },
  reviewed_by: {
    type: "integer",
  },
  parent_id: {
    type: "integer",
  },
  item_id: {
    type: "text",
  },
};
export const RESERVED_SEARCH_PROPERTIES = {
  token: "String",
  first_result: "Int!",
  limit: "Int!",
};
export const RESERVED_GETTER_PROPERTIES = {
  token: "String",
  id: "Int!",
};

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
