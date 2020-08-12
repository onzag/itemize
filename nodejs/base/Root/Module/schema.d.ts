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
        searchRoleAccess: {
            type: string;
            items: {
                type: string;
            };
        };
        modRoleAccess: {
            type: string;
            items: {
                type: string;
            };
        };
        flagRoleAccess: {
            type: string;
            items: {
                type: string;
            };
        };
        searchable: {
            type: string;
        };
        maxSearchResults: {
            type: string;
        };
        maxSearchRecords: {
            type: string;
        };
        requestLimiters: {
            type: string;
            properties: {
                condition: {
                    type: string;
                    enum: string[];
                };
                since: {
                    type: string;
                };
                createdBy: {
                    type: string;
                };
                parenting: {
                    type: string;
                };
                custom: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
            };
            additionalProperties: boolean;
            required: string[];
        };
    };
    additionalProperties: boolean;
    required: string[];
};
/**
 * this is the standard form of the module as it is unprocessed
 * in the file itself
 */
export default _default;
