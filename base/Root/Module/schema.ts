/**
 * This file contains the schema of the unprocessed form of the module
 *
 * @module
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
    searchRoleAccess: {
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
    searchable: {
      type: "boolean",
    },
    searchEngineEnabled: {
      type: "boolean",
    },
    maxSearchResults: {
      type: "number",
    },
    maxSearchRecords: {
      type: "number",
    },
    requestLimiters: {
      type: "object",
      properties: {
        condition: {
          type: "string",
          enum: ["AND", "OR"],
        },
        since: {
          type: "boolean",
        },
        createdBy: {
          type: "boolean",
        },
        parenting: {
          type: "boolean",
        },
        custom: {
          type: "array",
          items: {
            type: "string",
          }
        }
      },
      additionalProperties: false,
      required: ["condition"],
    },
    // used for schema purposes and documentation only
    // and removed during build
    description: {
      type: "string",
    },
  },
  additionalProperties: false,
  required: ["type"],
};
