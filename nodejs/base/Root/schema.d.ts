/**
 * This file contains a json schema for the unprocessed form
 * of the root leaf
 *
 * @packageDocumentation
 */
declare const _default: {
    type: string;
    properties: {
        type: {
            const: string;
        };
        children: {
            type: string;
            items: {
                type: string;
            };
            minItems: number;
        };
        i18n: {
            type: string;
        };
    };
    additionalProperties: boolean;
    required: string[];
};
/**
 * The root schema unprocessed and unbuilt
 */
export default _default;
