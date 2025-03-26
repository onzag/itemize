/**
 * This file contains the schema that defines how item definitions should look like
 * in the schema form
 *
 * @module
 */

import PropertyDefinitionSchema from "./PropertyDefinition/schema";
import ItemSchema from "./Include/schema";
import PropertiesValueMappingDefinitionSchema from "./PropertiesValueMappingDefiniton/schema";
import ConditionalRuleSetSchema from "./ConditionalRuleSet/schema";

/**
 * The standard policy schema that defines how policies should look like
 * in the item definition
 */
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
        applyingPropertyOnlyAppliesWhenCurrentIsNonNull: {
          type: "boolean",
        },
        applyingIncludes: {
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

/**
 * The policy schema, used for parenting
 */
const policySchemaForParent = {
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
        },
        properties: {
          type: "array",
          items: {
            type: "string",
          },
          minItems: 1,
        },
        parentModule: {
          type: "string",
        },
        parentItem: {
          type: "string",
        },
        checkOnParent: {
          type: "boolean",
        },
      },
      required: ["roles", "properties", "checkOnParent"],
    },
  },
  additionalProperties: false,
};

/**
 * The policy schema used for deleting, as it has no applying properties
 * because all apply
 */
const policySchemaNoApplying = {
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
        },
        properties: {
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

/**
 * The reference shema of item definitions
 * used to refer to other item definitions
 * whatever module they come from
 */
const itemReferenceSchema = {
  type: "object",
  properties: {
    module: {
      type: "string",
    },
    item: {
      type: "string",
    },
  },
  required: ["module"],
  additionalProperties: false,
};

/**
 * The main item definition schema object
 */
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
        $ref: "Include",
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
    children: {
      type: "array",
      items: {
        $ref: "Include",
      },
      minItems: 1,
    },
    searchable: {
      type: "boolean",
    },
    searchEngineEnabled: {
      type: "boolean",
    },
    searchEngineFallbackLang: {
      type: "string",
    },
    searchEngineLangUseVersion: {
      type: "boolean",
    },
    searchEngineMainLangProperty: {
      type: "string",
    },
    searchEngineMainLangBasedOnProperty: {
      type: "string",
    },
    searchRoleAccess: {
      type: "array",
      items: {
        type: "string",
      },
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
        delete: policySchemaNoApplying,
        read: policySchema,
        parent: policySchemaForParent,
      },
    },
    ownerIsObjectId: {
      type: "boolean",
    },
    ownerReadRoleAccess: {
      type: "array",
      items: {
        type: "string",
      },
    },
    customIdRoleAccess: {
      type: "array",
      items: {
        type: "string",
      },
    },
    canCreateInBehalf: {
      type: "boolean",
    },
    createInBehalfRoleAccess: {
      type: "array",
      items: {
        type: "string",
      },
    },
    canCreateInBehalfTargetRoles: {
      type: "array",
      items: {
        type: "string",
      },
    },
    maxOwnedCountSameType: {
      type: "number",
    },
    maxOwnedCountAnyType: {
      type: "number",
    },
    owningRule: {
      type: "string",
      enum: ["ONCE", "ONCE_PER_PARENT", "MANY"]
    },
    canBeParentedBy: {
      type: "array",
      items: itemReferenceSchema,
      minItems: 1,
    },
    parentMaxChildCountSameType: {
      type: "number",
    },
    parentMaxChildCountAnyType: {
      type: "number",
    },
    mustBeParented: {
      type: "boolean",
    },
    canBeReparented: {
      type: "boolean",
    },
    canBeParentedRule: {
      type: "string",
      enum: ["ONCE", "ONCE_PER_OWNER", "MANY"],
    },
    parentingRoleAccess: {
      type: "object",
      additionalProperties: {
        type: "array",
        items: {
          type: "string",
        },
      },
    },
    enableVersioning: {
      type: "boolean",
    },
    versioningRoleAccess: {
      type: "array",
      items: {
        type: "string",
      },
    },
    versionIsLanguageAndCountry: {
      type: "boolean",
    },
    versionIsLanguageAndRegion: {
      type: "boolean",
    },
    versionIsLanguage: {
      type: "boolean",
    },
    versionIsCountry: {
      type: "boolean",
    },
    searchLimiters: {
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
        properties: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: {
                type: "string",
              },
              values: {
                type: "array",
                items: {},
              },
            },
            required: [
              "id",
            ],
          },
        },
        ignoreRoleAccess: {
          type: "array",
          items: {
            type: "string",
          },
        }
      },
      additionalProperties: false,
      required: ["condition"],
    },
    // searchCaches: {
    //   type: "object",
    //   properties: {
    //     policies: {
    //       type: "array",
    //       items: {
    //         type: "string",
    //         enum: ["by-owner", "by-parent", "by-parent-and-owner", "by-property"]
    //       }
    //     },
    //     trackedProperties: {
    //       type: "array",
    //       items: {
    //         type: "string"
    //       }
    //     }
    //   },
    //   additionalProperties: false,
    //   required: ["policies"],
    // },
    // used for schema purposes and documentation only
    // and removed during build
    description: {
      type: "string",
    },
  },
  definitions: {
    PropertyDefinition: PropertyDefinitionSchema,
    Include: ItemSchema,
    PropertiesValueMappingDefiniton: PropertiesValueMappingDefinitionSchema,
    ConditionalRuleSet: ConditionalRuleSetSchema,
  },
  required: ["type"],
  dependencies: {
    createInBehalfRoleAccess: ["canCreateInBehalf"],
    canCreateInBehalfTargetRoles: ["canCreateInBehalf"],
    versioningRoleAccess: ["enableVersioning"],
    versionIsLanguageAndCountry: ["enableVersioning"],
    versionIsLanguageAndRegion: ["enableVersioning"],
    versionIsLanguage: ["enableVersioning"],
    versionIsCountry: ["enableVersioning"],
  },
  additionalProperties: false,
};
