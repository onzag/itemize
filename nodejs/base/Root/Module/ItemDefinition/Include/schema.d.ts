/**
 * This file contains the schema that is used to validate includes within the
 * item definition using the JSON Schema specification in the compile process
 *
 * related files index.ts and checkers.ts
 *
 * @packageDocumentation
 */
declare const _default: {
    $id: string;
    type: string;
    properties: {
        id: {
            type: string;
            pattern: string;
        };
        definition: {
            type: string;
            pattern: string;
        };
        enforcedProperties: {
            $ref: string;
        };
        predefinedProperties: {
            $ref: string;
        };
        excludedIf: {
            $ref: string;
        };
        canUserExclude: {
            type: string;
        };
        canUserExcludeIf: {
            $ref: string;
        };
        defaultExcluded: {
            type: string;
        };
        defaultExcludedIf: {
            $ref: string;
        };
        ternaryExclusionState: {
            type: string;
        };
        exclusionIsCallout: {
            type: string;
        };
        sinkIn: {
            type: string;
            items: {
                type: string;
            };
        };
        disableSearch: {
            type: string;
        };
    };
    definitions: {
        PropertiesValueMappingDefiniton: {
            $id: string;
            type: string;
            patternProperties: {
                "^[a-z_]+$": {
                    type: string;
                    oneOf: ({
                        properties: {
                            property: {
                                type: string;
                                pattern: string;
                            };
                            exactValue?: undefined;
                        };
                        required: string[];
                        additionalProperties: boolean;
                    } | {
                        properties: {
                            exactValue: {};
                            property?: undefined;
                        };
                        required: string[];
                        additionalProperties: boolean;
                    })[];
                };
            };
            additionalProperties: boolean;
            minProperties: number;
        };
        ConditionalRuleSet: {
            $id: string;
            type: string;
            oneOf: ({
                properties: {
                    property: {
                        type: string;
                        pattern: string;
                    };
                    attribute: {
                        type: string;
                    };
                    comparator: {
                        type: string;
                        enum: string[];
                    };
                    method: {
                        type: string;
                        enum: string[];
                    };
                    value: {
                        type: string;
                        oneOf: ({
                            properties: {
                                property: {
                                    type: string;
                                    pattern: string;
                                };
                                exactValue?: undefined;
                            };
                            required: string[];
                            additionalProperties: boolean;
                        } | {
                            properties: {
                                exactValue: {};
                                property?: undefined;
                            };
                            required: string[];
                            additionalProperties: boolean;
                        })[];
                    };
                    valueAttribute: {
                        type: string;
                    };
                    gate: {
                        type: string;
                        enum: string[];
                    };
                    condition: {
                        $ref: string;
                    };
                    component?: undefined;
                    isIncluded?: undefined;
                };
                required: string[];
                dependencies: {
                    gate: string[];
                    condition: string[];
                };
                additionalProperties: boolean;
            } | {
                properties: {
                    component: {
                        type: string;
                    };
                    isIncluded: {
                        type: string;
                    };
                    gate: {
                        type: string;
                        enum: string[];
                    };
                    condition: {
                        $ref: string;
                    };
                    property?: undefined;
                    attribute?: undefined;
                    comparator?: undefined;
                    method?: undefined;
                    value?: undefined;
                    valueAttribute?: undefined;
                };
                required: string[];
                dependencies: {
                    gate: string[];
                    condition: string[];
                };
                additionalProperties: boolean;
            })[];
        };
    };
    required: string[];
    additionalProperties: boolean;
};
/**
 * The default schema for an Include
 */
export default _default;
