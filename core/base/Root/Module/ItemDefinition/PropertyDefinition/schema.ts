import ConditionalRuleSetSchema from "../ConditionalRuleSet/schema";

const searchLevels = ["always", "moderate", "rare", "hidden", "disabled"];
const rarityLevels = ["standard", "moderate", "rare"];

// The schema for the definition
// {
//   "amount": 4,
//   "type": "car"
// },
// properties can be any string
// the values must be boolean string or number
// we should have at least one
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
    subtype:  {
      type: "string",
    },
    rarity: {
      type: "string",
      enum: rarityLevels,
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
    values: {
      type: "array",
      items: {},
    },
    nullable: {
      type: "boolean",
    },
    autocomplete: {
      type: "string",
    },
    autocompleteSetFromProperty: {
      type: "array",
      items: {
        type: "string",
      },
    },
    autocompleteIsEnforced: {
      type: "boolean",
    },
    autocompleteSupportsPrefills: {
      type: "boolean",
    },
    autocompleteSupportsLocale: {
      type: "boolean",
    },
    htmlAutocomplete: {
      type: "string",
    },
    default: {},
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
      minItems: 1,
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
      minItems: 1,
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
      minItems: 1,
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
    hiddenIf: {
      $ref: "ConditionalRuleSet",
    },
    searchLevel: {
      type: "string",
      enum: searchLevels,
    },
    disableRangedSearch: {
      type: "boolean",
    },
    disableRetrieval: {
      type: "boolean",
    },
    icon: {
      type: "string",
    },
    richText: {
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
  },
  additionalProperties: false,
  definitions: {
    ConditionalRuleSet: ConditionalRuleSetSchema,
  },
  dependencies: {
    autocompleteSetFromProperty: ["autocomplete"],
    autocompleteIsEnforced: ["autocomplete"],
    autocompleteSupportsPrefills: ["autocomplete"],
    autocompleteSupportsLocale: ["autocomplete", "autocompleteIsEnforced"],
  },
  required: ["id", "type"],
};
