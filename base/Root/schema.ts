/**
 * This file contains a json schema for the unprocessed form
 * of the root, this root schema is meant to be used in order to check
 * root json files
 *
 * @module
 */

/**
 * The root schema unprocessed and unbuilt
 */
export default {
  type: "object",
  properties: {
    type: {
      const: "root",
    },
    children: {
      type: "array",
      items: {
        type: "string",
      },
      minItems: 1,
    },
    i18n: {
      type: "string",
    },
    registries: {
      type: "array",
      items: {
        type: "string",
        pattern: "^[A-Z_]+$",
      },
      minItems: 1,
    },
  },
  additionalProperties: false,
  required: ["type", "i18n"],
};
