"use strict";
/**
 * This file contains the schema that defines how item definitions should look like
 * in the schema form
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("./PropertyDefinition/schema"));
const schema_2 = __importDefault(require("./Include/schema"));
const schema_3 = __importDefault(require("./PropertiesValueMappingDefiniton/schema"));
const schema_4 = __importDefault(require("./ConditionalRuleSet/schema"));
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
const policySchemaWithModuleAndItemDefinition = {
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
                module: {
                    type: "string",
                },
                itemDefinition: {
                    type: "string",
                },
            },
            required: ["roles", "properties", "module"],
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
                    minItems: 1,
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
/**
 * The main item definition schema object
 */
exports.default = {
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
                parent: policySchemaWithModuleAndItemDefinition,
            },
        },
        ownerIsObjectId: {
            type: "boolean",
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
        canBeParentedBy: {
            type: "array",
            itemDefinition: itemDefinitionReferenceSchema,
            minItems: 1,
        },
        mustBeParented: {
            type: "boolean",
        },
        parentingRoleAccess: {
            type: "array",
            items: {
                type: "string",
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
        versionIsLanguage: {
            type: "boolean",
        },
        versionIsCountry: {
            type: "boolean",
        },
        requestLimiters: {
            type: "object",
            properties: {
                condition: {
                    type: "string",
                    enum: ["AND", "OR"],
                },
                custom: {
                    type: "array",
                    items: {
                        type: "string",
                    }
                }
            },
            additionalProperties: false,
            required: ["condition", "custom"],
        }
    },
    definitions: {
        PropertyDefinition: schema_1.default,
        Include: schema_2.default,
        PropertiesValueMappingDefiniton: schema_3.default,
        ConditionalRuleSet: schema_4.default,
    },
    required: ["type"],
    dependencies: {
        createInBehalfRoleAccess: ["canCreateInBehalf"],
        versioningRoleAccess: ["enableVersioning"],
        versionIsLanguageAndCountry: ["enableVersioning"],
        versionIsLanguage: ["enableVersioning"],
        versionIsCountry: ["enableVersioning"],
    },
    additionalProperties: false,
};
