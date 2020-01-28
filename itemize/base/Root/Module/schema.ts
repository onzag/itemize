/**
 * This file contains the schema of the unprocessed form of the module
 *
 * @packageDocumentation
 */

/**
 * this is the standard form of the module as it is unprocessed
 * in the file itself
 */
export default {
  type: "object",
  properties: {
    type: {
      const: "module",
    },
    includes: {
      type: "array",
      items: {
        type: "string",
      },
      minItems: 1,
    },
    readRoleAccess: {
      type: "array",
      items: {
        type: "string",
      },
    },
    searchable: {
      type: "boolean",
    },
  },
  required: ["type"],
};
