/**
 * This file represents the schema that is used against the autocomplete
 * json files during the build process so as to ensure that the file
 * is correct in shape and form
 *
 * Making changes to this file might cause breaking changes as old results
 * won't compile, checkers.ts and index.ts are correlated
 *
 * @packageDocumentation
 */

 /**
  * this is the single filter schema
  * and it represents a single filter
  * that is applied to based on autocomplete properties
  */
const singleFilterSchema = {
  $id: "SingleFilterSchema",
  type: "object",
  patternProperties: {
    "^[A-Za-z_]+$": {},
  },
  additionalProperties: false,
};

/**
 * example
 * {
 *    type: "value",
 *    i18n?: {
 *      en: "value translated",
 *      es: "value translated",
 *    },
 *    filter?: {
 *      random: "value",
 *    }
 * }
 */
const valueSchema = {
  $id: "ValueSchema",
  type: "object",
  properties: {
    type: {
      const: "value",
    },
    value: {
      type: "string",
    },
    i18n: {
      type: "object",
      patternProperties: {
        "^[A-Za-z-]+$": {
          type: "string",
        },
      },
    },
    filter: {
      $ref: "SingleFilterSchema",
    },
  },
  required: ["type", "value"],
  additionalProperties: false,
};

/**
 * this represents a whole filter group to filter
 * autocomplete values
 * {
 *   type: "filter",
 *   values?: bunch of values here...
 *   filters?: other filters groups of this same type...
 *   filter: {
 *     random: "value"
 *   }
 * }
 */
const filterSchema = {
  $id: "FilterSchema",
  type: "object",
  properties: {
    type: {
      const: "filter",
    },
    values: {
      type: "array",
      items: {
        $ref: "ValueSchema",
      },
    },
    filters: {
      type: "array",
      items: {
        $ref: "FilterSchema",
      },
    },
    filter: {
      $ref: "SingleFilterSchema",
    },
  },
  additionalProperties: false,
  required: ["type", "filter"],
};

/**
 * this is the parent autocomplete object
 */
export default {
  type: "object",
  definitions: {
    SingleFilterSchema: singleFilterSchema,
    ValueSchema: valueSchema,
    FilterSchema: filterSchema,
  },
  properties: {
    type: {
      const: "autocomplete",
    },
    values: {
      type: "array",
      items: {
        $ref: "ValueSchema",
      },
    },
    filters: {
      type: "array",
      items: {
        $ref: "FilterSchema",
      },
    },
  },
  additionalProperties: false,
  required: ["type"],
};
