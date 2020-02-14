/**
 * This file represents the schema that is used to validate against in order
 * to use property value mapping definitions using the JSON schema spec in
 * the compilation step
 *
 * related files index.ts and checkers.ts
 *
 * @packageDocumentation
 */
declare const _default: {
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
/**
 * The default property value mapping definition schema
 */
export default _default;
