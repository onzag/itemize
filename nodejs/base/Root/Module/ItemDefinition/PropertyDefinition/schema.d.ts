/**
 * Contains the schema for the property definition as it should
 * be defined in the json form
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
        i18nData: {
            type: string;
        };
        type: {
            type: string;
        };
        subtype: {
            type: string;
        };
        unique: {
            type: string;
        };
        nonCaseSensitiveUnique: {
            type: string;
        };
        min: {
            type: string;
        };
        max: {
            type: string;
        };
        maxLength: {
            type: string;
            minimum: number;
        };
        minLength: {
            type: string;
            minimum: number;
        };
        maxDecimalCount: {
            type: string;
            minimum: number;
        };
        values: {
            type: string;
            items: {};
        };
        nullable: {
            type: string;
        };
        htmlAutocomplete: {
            type: string;
        };
        default: {};
        defaultIf: {
            type: string;
            items: {
                type: string;
                properties: {
                    if: {
                        $ref: string;
                    };
                    value: {};
                };
                additionalProperties: boolean;
                required: string[];
            };
            minItems: number;
        };
        invalidIf: {
            type: string;
            items: {
                type: string;
                properties: {
                    if: {
                        $ref: string;
                    };
                    error: {
                        type: string;
                        pattern: string;
                    };
                };
                additionalProperties: boolean;
                required: string[];
            };
            minItems: number;
        };
        enforcedValues: {
            type: string;
            items: {
                type: string;
                properties: {
                    if: {
                        $ref: string;
                    };
                    value: {};
                };
                additionalProperties: boolean;
                required: string[];
            };
            minItems: number;
        };
        nullIfHidden: {
            type: string;
        };
        hiddenIfEnforced: {
            type: string;
        };
        enforcedValue: {};
        hidden: {
            type: string;
        };
        hiddenIf: {
            $ref: string;
        };
        searchable: {
            type: string;
        };
        disableRangedSearch: {
            type: string;
        };
        disableRetrieval: {
            type: string;
        };
        specialProperties: {
            type: string;
            properties: {};
            additionalProperties: boolean;
        };
        readRoleAccess: {
            type: string;
            items: {
                type: string;
            };
        };
        createRoleAccess: {
            type: string;
            items: {
                type: string;
            };
        };
        editRoleAccess: {
            type: string;
            items: {
                type: string;
            };
        };
        coerceNullsIntoDefault: {
            type: string;
        };
    };
    additionalProperties: boolean;
    definitions: {
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
};
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
export default _default;
