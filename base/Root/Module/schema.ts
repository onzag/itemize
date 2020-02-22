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
    children: {
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
    modRoleAccess: {
      type: "array",
      items: {
        type: "string",
      },
    },
    flagRoleAccess: {
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
