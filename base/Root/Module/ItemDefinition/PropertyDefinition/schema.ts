/**
 * Contains the schema for the property definition as it should
 * be defined in the json form
 *
 * @module
 */

import ConditionalRuleSetSchema from "../ConditionalRuleSet/schema";

/**
 * This represents the config property value
 * for use with property set
 */
export const ConfigValueSetSchema = {
  type: "object",
  additionalProperties: {
    type: "object",
    oneOf: [
      {
        properties: {
          property: {
            type: "string",
            pattern: "^[a-z_]+$",
          },
        },
        required: ["property"],
        additionalProperties: false,
      },
      {
        properties: {
          exactValue: {},
        },
        required: ["exactValue"],
        additionalProperties: false,
      },
    ],
  }
}

/**
 * The schema for the definition
 * ```
 * {
 *   "amount": 4,
 *   "type": "car"
 * }
 * ```
 * properties can be any string
 * the values must be boolean string or number
 * we should have at least one
 */
export default {
  $id: "PropertyDefinition",
  type: "object",
  properties: {
    id: {
      type: "string",
      pattern: "^[a-z_]+$",
    },
    i18nData: {
      type: "object",
    },
    type: {
      type: "string",
    },
    subtype: {
      type: "string",
    },
    unique: {
      type: "boolean",
    },
    nonCaseSensitiveUnique: {
      type: "boolean",
    },
    min: {
      type: "number",
    },
    max: {
      type: "number",
    },
    maxLength: {
      type: "number",
      minimum: 0,
    },
    minLength: {
      type: "number",
      minimum: 0,
    },
    maxDecimalCount: {
      type: "number",
      minimum: 0,
    },
    pattern: {
      type: "string",
    },
    values: {
      type: "array",
      items: {
        type: ["number", "string"],
      },
    },
    nullable: {
      type: "boolean",
    },
    default: {},
    searchDefault: {},
    defaultIf: {
      type: "array",
      items: {
        type: "object",
        properties: {
          if: {
            $ref: "ConditionalRuleSet",
          },
          value: {},
        },
        additionalProperties: false,
        required: ["value", "if"],
      },
    },
    searchDefaultIf: {
      type: "array",
      items: {
        type: "object",
        properties: {
          if: {
            $ref: "ConditionalRuleSet",
          },
          value: {},
        },
        additionalProperties: false,
        required: ["value", "if"],
      },
    },
    invalidIf: {
      type: "array",
      items: {
        type: "object",
        properties: {
          if: {
            $ref: "ConditionalRuleSet",
          },
          error: {
            type: "string",
            pattern: "^[A-Z_]+$",
          },
        },
        additionalProperties: false,
        required: ["error"],
      },
    },
    searchInvalidIf: {
      type: "array",
      items: {
        type: "object",
        properties: {
          if: {
            $ref: "ConditionalRuleSet",
          },
          error: {
            type: "string",
            pattern: "^[A-Z_]+$",
          },
        },
        additionalProperties: false,
        required: ["error", "if"],
      },
    },
    enforcedValues: {
      type: "array",
      items: {
        type: "object",
        properties: {
          if: {
            $ref: "ConditionalRuleSet",
          },
          value: {},
        },
        additionalProperties: false,
        required: ["value", "if"],
      },
    },
    searchEnforcedValues: {
      type: "array",
      items: {
        type: "object",
        properties: {
          if: {
            $ref: "ConditionalRuleSet",
          },
          value: {},
        },
        additionalProperties: false,
        required: ["value", "if"],
      },
    },
    nullIfHidden: {
      type: "boolean",
    },
    hiddenIfEnforced: {
      type: "boolean",
    },
    enforcedValue: {},
    searchEnforcedValue: {},
    hidden: {
      type: "boolean",
    },
    searchHidden: {
      type: "boolean",
    },
    hiddenIf: {
      $ref: "ConditionalRuleSet",
    },
    searchHiddenIf: {
      $ref: "ConditionalRuleSet",
    },
    searchable: {
      type: "boolean",
    },
    searchEngineBoost: {
      type: "number",
    },
    disableRangedSearch: {
      type: "boolean",
    },
    disableRetrieval: {
      type: "boolean",
    },
    config: {
      type: "object",
      properties: {},
      additionalProperties: true,
    },
    readRoleAccess: {
      type: "array",
      items: {
        type: "string",
      },
    },
    softReadRoleAccess: {
      type: "array",
      items: {
        type: "string",
      },
    },
    createRoleAccess: {
      type: "array",
      items: {
        type: "string",
      },
    },
    editRoleAccess: {
      type: "array",
      items: {
        type: "string",
      },
    },
    coerceNullsIntoDefaultAfterSubmit: {
      type: "boolean",
    },
    searchOnlyProperty: {
      type: "boolean",
    },

    // used for schema purposes and documentation only
    // and removed during build
    description: {
      type: "string",
    },
  },
  additionalProperties: false,
  definitions: {
    ConditionalRuleSet: ConditionalRuleSetSchema,
  },
  required: ["id", "type"],
};
