// DATA ATTRIBUTES

// Defines the max supported integer, it should match up the database
export const MAX_SUPPORTED_INTEGER = 2147483647;
// Defines the min supported integer, it should match up the database too
export const MIN_SUPPORTED_INTEGER = -MAX_SUPPORTED_INTEGER;
// Defines how many decimal points are supported, for the sake of usability
// the number is set to a precision of 6
export const MAX_DECIMAL_COUNT = 6;
export const MAX_CURRENCY_DECIMAL_COUNT = 2;
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
// How many characters (including HTML special characters) text might have
export const MAX_TEXT_LENGTH = MAX_STRING_LENGTH;
// The max file size (for either images and binary files)
export const MAX_FILE_SIZE = 5242880; // equivalent to 5MB

// ATTRIBUTES FOR i18N
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
export const CLASSIC_OPTIONAL_I18N = [
  "hint",
];
export const CLASSIC_SEARCH_OPTIONAL_I18N = [
  "search.hint",
];
export const CLASSIC_RANGED_I18N = [
  "range.label",
  "range.from.placeholder",
  "range.to.placeholder",
];
export const CLASSIC_RANGED_OPTIONAL_I18N = [
  "range.hint.from",
  "range.hint.to",
];
export const CLASSIC_DISTANCE_I18N = [
  "distance.label",
];
