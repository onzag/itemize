/**
 * This file represents the schema for the compilation of the the conditional
 * rule sets in the JSON schema form
 *
 * related files are index.ts and checkers.ts
 *
 * @packageDocumentation
 */
declare const _default: {
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
/**
 * The schema
 */
export default _default;
