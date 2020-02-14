/**
 * This file contains the schema of the unprocessed form of the module
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
        readRoleAccess: {
            type: string;
            items: {
                type: string;
            };
        };
        searchable: {
            type: string;
        };
    };
    required: string[];
};
/**
 * this is the standard form of the module as it is unprocessed
 * in the file itself
 */
export default _default;
