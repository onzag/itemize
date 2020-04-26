/**
 * This file contains a json schema for the unprocessed form
 * of the root leaf
 *
 * @packageDocumentation
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
  },
  additionalProperties: false,
  required: ["type", "i18n"],
};
