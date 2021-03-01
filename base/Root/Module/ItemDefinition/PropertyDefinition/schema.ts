/**
 * Contains the schema for the property definition as it should
 * be defined in the json form
 *
 * @module
 */

import ConditionalRuleSetSchema from "../ConditionalRuleSet/schema";

/**
 * This represents the special property value
 * for use with property set
 */
export const SpecialPropertyValueSetSchema = {
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
    type:  {
      type: "string",
    },
    subtype: {
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
    htmlAutocomplete: {
      type: "string",
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
        required: ["error", "if"],
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
    nullIfHidden: {
      type: "boolean",
    },
    hiddenIfEnforced: {
      type: "boolean",
    },
    enforcedValue: {},
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
    disableRangedSearch: {
      type: "boolean",
    },
    disableRetrieval: {
      type: "boolean",
    },
    specialProperties: {
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
    coerceNullsIntoDefault: {
      type: "boolean",
    },
    searchOnlyProperty: {
      type: "boolean",
    },
  },
  additionalProperties: false,
  definitions: {
    ConditionalRuleSet: ConditionalRuleSetSchema,
  },
  required: ["id", "type"],
};
