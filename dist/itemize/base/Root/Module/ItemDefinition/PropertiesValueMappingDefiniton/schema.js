"use strict";
/**
 * This file represents the schema that is used to validate against in order
 * to use property value mapping definitions using the JSON schema spec in
 * the compilation step
 *
 * related files index.ts and checkers.ts
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The default property value mapping definition schema
 */
exports.default = {
    $id: "PropertiesValueMappingDefiniton",
    type: "object",
    patternProperties: {
        "^[a-z_]+$": {
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
    },
    additionalProperties: false,
    minProperties: 1,
};
