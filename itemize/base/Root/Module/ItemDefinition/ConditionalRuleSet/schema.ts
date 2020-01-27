/**
 * This file represents the schema for the compilation of the the conditional
 * rule sets in the JSON schema form
 *
 * related files are index.ts and checkers.ts
 *
 * @packageDocumentation
 */

/**
 * The comparators we support
 */
const comparators = ["equals", "not-equal", "greater-than", "less-than",
  "greater-or-equal-than", "less-or-equal-than"];
/**
 * The gates
 */
const gates = ["and", "or", "xor"];
/**
 * The methods
 */
const methods = ["default", "string", "datetime"];

/**
 * The schema
 */
export default {
  $id: "ConditionalRuleSet",
  type: "object",
  // We have two schemas in reality, one for the
  // property based rule set and another one for the
  // component based one
  oneOf: [
    // this is the property based one
    {
      properties: {
        // property
        property: {
          type: "string",
          pattern: "^[a-z_]+$|^&this$",
        },
        // attribute
        attribute: {type: "string"},
        // comparator
        comparator: {
          type: "string",
          enum: comparators,
        },
        method: {
          type: "string",
          enum: methods,
        },
        value: {
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
        },
        // value attribute
        valueAttribute: {type: "string"},
        // gate
        gate: {
          type: "string",
          enum: gates,
        },
        // condition (any allowed conditions are not checked)
        // even when it'd be possible to do it as a recursive
        // reference with the json schema 7.0 definition for #
        // because we can get more comprehensive errors when
        // the condition is instanciated later
        condition: {
          $ref: "ConditionalRuleSet",
        },
      },
      required: ["property", "comparator", "value"],

      // They codepend on each other
      dependencies: {
        gate: ["condition"],
        condition: ["gate"],
      },

      additionalProperties: false,
    },
    {
      properties: {
        component: {type: "string"},
        isIncluded: {type: "boolean"},
        gate: {
          type: "string",
          enum: gates,
        },
        condition: {
          $ref: "ConditionalRuleSet",
        },
      },
      required: ["component", "isIncluded"],
      dependencies: {
        gate: ["condition"],
        condition: ["gate"],
      },

      additionalProperties: false,
    },
  ],
};
