/**
 * This file represents the schema that is used against the autocomplete
 * json files during the build process so as to ensure that the file
 * is correct in shape and form
 *
 * Making changes to this file might cause breaking changes as old results
 * won't compile, checkers.ts and index.ts are correlated
 *
 * @packageDocumentation
 */
declare const _default: {
    type: string;
    definitions: {
        SingleFilterSchema: {
            $id: string;
            type: string;
            patternProperties: {
                "^[A-Za-z_]+$": {};
            };
            additionalProperties: boolean;
        };
        ValueSchema: {
            $id: string;
            type: string;
            properties: {
                type: {
                    const: string;
                };
                value: {
                    type: string;
                };
                i18n: {
                    type: string;
                    patternProperties: {
                        "^[A-Za-z-]+$": {
                            type: string;
                        };
                    };
                };
                filter: {
                    $ref: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        FilterSchema: {
            $id: string;
            type: string;
            properties: {
                type: {
                    const: string;
                };
                values: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                filters: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                filter: {
                    $ref: string;
                };
            };
            additionalProperties: boolean;
            required: string[];
        };
    };
    properties: {
        type: {
            const: string;
        };
        values: {
            type: string;
            items: {
                $ref: string;
            };
        };
        filters: {
            type: string;
            items: {
                $ref: string;
            };
        };
    };
    additionalProperties: boolean;
    required: string[];
};
/**
 * this is the parent autocomplete object
 */
export default _default;
