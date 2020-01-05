import PropertyDefinitionSchema from "./PropertyDefinition/schema";
import ItemSchema from "./Item/schema";
import PropertiesValueMappingDefinitionSchema from "./PropertiesValueMappingDefiniton/schema";
import ConditionalRuleSetSchema from "./ConditionalRuleSet/schema";

const policySchema = {
  type: "object",
  patternProperties: {
    "^[A-Z_]+$": {
      type: "object",
      properties: {
        roles: {
          type: "array",
          items: {
            type: "string",
          },
          minItems: 1,
        },
        properties: {
          type: "array",
          items: {
            type: "string",
          },
          minItems: 1,
        },
        applyingProperties: {
          type: "array",
          items: {
            type: "string",
          },
          minItems: 1,
        },
        applyingItems: {
          type: "array",
          items: {
            type: "string",
          },
          minItems: 1,
        },
      },
      required: ["roles", "properties"],
    },
  },
  additionalProperties: false,
};

const itemDefinitionReferenceSchema = {
  type: "object",
  properties: {
    module: {
      type: "string",
    },
    definition: {
      type: "string",
    },
  },
  required: ["module"],
  additionalProperties: false,
};

export default {
  $id: "ItemDefinition",
  type: "object",
  properties: {
    type: {
      const: "item",
    },
    includes: {
      type: "array",
      items: {
        $ref: "Item",
      },
    },
    properties: {
      type: "array",
      items: {
        $ref: "PropertyDefinition",
      },
    },
    imports: {
      type: "array",
      items: {
        type: "string",
      },
      minItems: 1,
      additionalItems: false,
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
    deleteRoleAccess: {
      type: "array",
      items: {
        type: "string",
      },
    },
    policies: {
      type: "object",
      properties: {
        edit: policySchema,
        delete: policySchema,
      },
    },
    ownerIsObjectId: {
      type: "boolean",
    },
    canCreateInBehalfBy: {
      type: "array",
      items: {
        type: "string",
      },
    },
    canBeParentedBy: {
      type: "array",
      itemDefinition: itemDefinitionReferenceSchema,
      minItems: 1,
    },
    parentingRoleAccess: {
      type: "array",
      items: {
        type: "string",
      },
    },
  },
  definitions: {
    PropertyDefinition: PropertyDefinitionSchema,
    Item: ItemSchema,
    PropertiesValueMappingDefiniton: PropertiesValueMappingDefinitionSchema,
    ConditionalRuleSet: ConditionalRuleSetSchema,
  },
  required: ["type"],
  additionalProperties: false,
};
