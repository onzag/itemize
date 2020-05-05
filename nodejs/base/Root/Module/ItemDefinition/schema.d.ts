/**
 * This file contains the schema that defines how item definitions should look like
 * in the schema form
 *
 * @packageDocumentation
 */
declare const _default: {
    $id: string;
    type: string;
    properties: {
        type: {
            const: string;
        };
        includes: {
            type: string;
            items: {
                $ref: string;
            };
        };
        properties: {
            type: string;
            items: {
                $ref: string;
            };
        };
        imports: {
            type: string;
            items: {
                type: string;
            };
            minItems: number;
            additionalItems: boolean;
        };
        children: {
            type: string;
            items: {
                $ref: string;
            };
            minItems: number;
        };
        searchable: {
            type: string;
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
        deleteRoleAccess: {
            type: string;
            items: {
                type: string;
            };
        };
        policies: {
            type: string;
            properties: {
                edit: {
                    type: string;
                    patternProperties: {
                        "^[A-Z_]+$": {
                            type: string;
                            properties: {
                                roles: {
                                    type: string;
                                    items: {
                                        type: string;
                                    };
                                    minItems: number;
                                };
                                properties: {
                                    type: string;
                                    items: {
                                        type: string;
                                    };
                                    minItems: number;
                                };
                                applyingProperties: {
                                    type: string;
                                    items: {
                                        type: string;
                                    };
                                    minItems: number;
                                };
                                applyingPropertyOnlyAppliesWhenCurrentIsNonNull: {
                                    type: string;
                                };
                                applyingIncludes: {
                                    type: string;
                                    items: {
                                        type: string;
                                    };
                                    minItems: number;
                                };
                            };
                            required: string[];
                        };
                    };
                    additionalProperties: boolean;
                };
                delete: {
                    type: string;
                    patternProperties: {
                        "^[A-Z_]+$": {
                            type: string;
                            properties: {
                                roles: {
                                    type: string;
                                    items: {
                                        type: string;
                                    };
                                    minItems: number;
                                };
                                properties: {
                                    type: string;
                                    items: {
                                        type: string;
                                    };
                                    minItems: number;
                                };
                            };
                            required: string[];
                        };
                    };
                    additionalProperties: boolean;
                };
                read: {
                    type: string;
                    patternProperties: {
                        "^[A-Z_]+$": {
                            type: string;
                            properties: {
                                roles: {
                                    type: string;
                                    items: {
                                        type: string;
                                    };
                                    minItems: number;
                                };
                                properties: {
                                    type: string;
                                    items: {
                                        type: string;
                                    };
                                    minItems: number;
                                };
                                applyingProperties: {
                                    type: string;
                                    items: {
                                        type: string;
                                    };
                                    minItems: number;
                                };
                                applyingPropertyOnlyAppliesWhenCurrentIsNonNull: {
                                    type: string;
                                };
                                applyingIncludes: {
                                    type: string;
                                    items: {
                                        type: string;
                                    };
                                    minItems: number;
                                };
                            };
                            required: string[];
                        };
                    };
                    additionalProperties: boolean;
                };
                parent: {
                    type: string;
                    patternProperties: {
                        "^[A-Z_]+$": {
                            type: string;
                            properties: {
                                roles: {
                                    type: string;
                                    items: {
                                        type: string;
                                    };
                                    minItems: number;
                                };
                                properties: {
                                    type: string;
                                    items: {
                                        type: string;
                                    };
                                    minItems: number;
                                };
                                module: {
                                    type: string;
                                };
                                itemDefinition: {
                                    type: string;
                                };
                            };
                            required: string[];
                        };
                    };
                    additionalProperties: boolean;
                };
            };
        };
        ownerIsObjectId: {
            type: string;
        };
        canCreateInBehalfBy: {
            type: string;
            items: {
                type: string;
            };
        };
        canBeParentedBy: {
            type: string;
            itemDefinition: {
                type: string;
                properties: {
                    module: {
                        type: string;
                    };
                    definition: {
                        type: string;
                    };
                };
                required: string[];
                additionalProperties: boolean;
            };
            minItems: number;
        };
        mustBeParented: {
            type: string;
        };
        parentingRoleAccess: {
            type: string;
            items: {
                type: string;
            };
        };
        enableVersioning: {
            type: string;
        };
        versionIsLanguageAndCountry: {
            type: string;
        };
        versionIsLanguage: {
            type: string;
        };
        versionIsCountry: {
            type: string;
        };
        versionIsOptional: {
            type: string;
        };
    };
    definitions: {
        PropertyDefinition: {
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
                            /**
                             * The policy schema, used for parenting
                             */
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
        Include: {
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
    dependencies: {
        versionIsLanguageAndCountry: string[];
        versionIsLanguage: string[];
        versionIsCountry: string[];
        versionIsOptional: string[];
    };
    additionalProperties: boolean;
};
/**
 * The main item definition schema object
 */
export default _default;
