import ConditionalRuleSetSchema from "../ConditionalRuleSet/schema";
import PropertiesValueMappingDefinitionSchema from "../PropertiesValueMappingDefiniton/schema";

export default {
  $id: "Include",
  type: "object",
  properties: {
    id: {
      type: "string",
      pattern: "^[a-z_]+$",
    },
    name: {
      type: "string",
      pattern: "^[a-z_]+$",
    },
    enforcedProperties: {
      $ref: "PropertiesValueMappingDefiniton",
    },
    predefinedProperties: {
      $ref: "PropertiesValueMappingDefiniton",
    },
    excludedIf: {
      $ref: "ConditionalRuleSet",
    },
    canUserExclude: {
      type: "boolean",
    },
    canUserExcludeIf: {
      $ref: "ConditionalRuleSet",
    },
    defaultExcluded: {
      type: "boolean",
    },
    defaultExcludedIf: {
      $ref: "ConditionalRuleSet",
    },
    ternaryExclusionState: {
      type: "boolean",
    },
    exclusionIsCallout: {
      type: "boolean",
    },
    sinkIn: {
      type: "array",
      items: {
        type: "string",
      },
    },
    disableSearch: {
      type: "boolean",
    },
  },
  definitions: {
    PropertiesValueMappingDefiniton: PropertiesValueMappingDefinitionSchema,
    ConditionalRuleSet: ConditionalRuleSetSchema,
  },
  required: ["id", "name"],
  additionalProperties: false,
};
