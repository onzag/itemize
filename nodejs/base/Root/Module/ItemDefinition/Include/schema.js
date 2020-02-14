"use strict";
/**
 * This file contains the schema that is used to validate includes within the
 * item definition using the JSON Schema specification in the compile process
 *
 * related files index.ts and checkers.ts
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("../ConditionalRuleSet/schema"));
const schema_2 = __importDefault(require("../PropertiesValueMappingDefiniton/schema"));
/**
 * The default schema for an Include
 */
exports.default = {
    $id: "Include",
    type: "object",
    properties: {
        id: {
            type: "string",
            pattern: "^[a-z_]+$",
        },
        definition: {
            type: "string",
            pattern: "^[a-z_/]+$",
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
        PropertiesValueMappingDefiniton: schema_2.default,
        ConditionalRuleSet: schema_1.default,
    },
    required: ["id", "name"],
    additionalProperties: false,
};
