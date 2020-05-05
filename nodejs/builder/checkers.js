"use strict";
/**
 * Contains checker functions that check the structure of the itemize schema
 * regarding things and correlations that might have been missed by the
 * ajv schema checker (because not everything can be setup as a json schema)
 * eg. interactions, imports, etc...
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Root_1 = __importDefault(require("../base/Root"));
const Error_1 = __importDefault(require("./Error"));
const Traceback_1 = __importDefault(require("./Traceback"));
const constants_1 = require("../constants");
require("source-map-support/register");
const ItemDefinition_1 = __importDefault(require("../base/Root/Module/ItemDefinition"));
const PropertyDefinition_1 = __importStar(require("../base/Root/Module/ItemDefinition/PropertyDefinition"));
const search_interfaces_1 = require("../base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces");
const Module_1 = __importDefault(require("../base/Root/Module"));
/**
 * Checks a conditional rule set so that it is valid and contains valid
 * includes and rules
 * @param rawData the raw data of the conditional rule set
 * @param parentItemDefinition the parent item definition where the ruleset resides (if any,
 * it is null for prop extensions)
 * @param parentModule the parent module where the ruleset resides
 * @param traceback the traceback object
 */
function checkConditionalRuleSet(rawData, parentItemDefinition, parentModule, traceback) {
    // So first let's check if this conditional rule set is of
    // the include type that checks if includes are included
    const include = rawData.include;
    // if that is to be the case
    if (include &&
        // we use the static function to request for that
        // specific include that belongs to that item definition
        !ItemDefinition_1.default.getItemDefinitionRawFor(parentItemDefinition, parentModule, include)) {
        // throw an error if not found
        throw new Error_1.default("Conditional rule set item definition not available", traceback.newTraceToBit("include"));
    }
    // Let's check the property if this is one conditional rule
    // set of that type
    const rawDataAsProperty = rawData;
    // so if our property is a named property
    if (rawDataAsProperty.property && rawDataAsProperty.property !== "&this") {
        // then we try to find that property, including extensions
        const propDef = ItemDefinition_1.default.getPropertyDefinitionRawFor(parentItemDefinition, parentModule, rawDataAsProperty.property, true);
        // if there's not such a thing throw an error
        if (!propDef) {
            throw new Error_1.default("Conditional rule set property not available", traceback.newTraceToBit("property"));
        }
        // now we need to check that the value that is used in the condition
        // can actually be compared
        const valueToCheckAgainst = rawDataAsProperty.value;
        // so the value might be of a referred property as in, a property
        // as a value to be compared for a dynamic check
        if (valueToCheckAgainst &&
            valueToCheckAgainst.property) {
            // for that we would need to get the property definition in that item
            // definition
            const valueToCheckAgainstPropertyDefinition = ItemDefinition_1.default.getPropertyDefinitionRawFor(parentItemDefinition, parentModule, valueToCheckAgainst.property, true);
            // if we have none, then this is invalid
            if (!valueToCheckAgainstPropertyDefinition) {
                throw new Error_1.default("Conditional rule set value invalid, cannot find property, " +
                    valueToCheckAgainst.property, traceback.newTraceToBit("value").newTraceToBit("property"));
            }
            // due to the fact the checking can be very complex we cannot check the type
            // itself and give it a guarantee due to the existance of the valueAttribute
            // that can be used instead
        }
        else if (valueToCheckAgainst &&
            typeof valueToCheckAgainst.exactValue !== "undefined") {
            // so now we extract what that exact value is supposed to be
            let exactValue = valueToCheckAgainst.exactValue;
            // if we have a value attribute that we are supposed to use
            if (rawDataAsProperty.valueAttribute) {
                exactValue = exactValue[rawDataAsProperty.valueAttribute];
            }
            // let's check if this value is valid
            const invalidReason = PropertyDefinition_1.default.isValidValue(propDef, exactValue, true);
            // throw the error if it's invalid
            if (invalidReason) {
                throw new Error_1.default("Conditional rule set value invalid, reason " +
                    rawDataAsProperty.property + ": " + invalidReason, traceback.newTraceToBit("value").newTraceToBit("exactValue"));
            }
        }
    }
}
exports.checkConditionalRuleSet = checkConditionalRuleSet;
/**
 * Checks an item definition so that all its imports, name, and so on
 * do match the specification as it is required
 * @param rawRootData the root data
 * @param rawData the item definition data
 * @param parentModule the raw parent module
 * @param traceback the traceback object
 */
function checkItemDefinition(rawRootData, rawData, parentModule, traceback) {
    // so we setup the traceback to the location of the item definition file
    const actualTraceback = traceback.newTraceToLocation(rawData.location);
    // and setup the pointers for that
    actualTraceback.setupPointers(rawData.pointers, rawData.raw);
    // the schema specifies this character is valid but we really don't
    // want names starting wiht that
    if (rawData.name.startsWith("_")) {
        // so we throw an error if so
        throw new Error_1.default("Definition name '" + rawData.name +
            "' starts with underscore, and that's invalid", actualTraceback.newTraceToBit("name"));
    }
    // these two properties are not allowed between each other
    // you cannot create in behalf and make it be owned by the object id
    // at the same time
    if (rawData.createInBehalfRoleAccess && rawData.ownerIsObjectId) {
        throw new Error_1.default("Cannot be able to create in behalf and have its owner be the object id", actualTraceback.newTraceToBit("ownerIsObjectId"));
    }
    // Also these two must be specified together
    if (rawData.mustBeParented && !rawData.canBeParentedBy) {
        throw new Error_1.default("Setting mustBeParented without canBeParentedBy specifications", actualTraceback.newTraceToBit("mustBeParented"));
    }
    // if it can be parented
    if (rawData.canBeParentedBy) {
        if (!rawData.parentingRoleAccess) {
            throw new Error_1.default("Setting canBeParentedBy without parentingRoleAccess specifications", actualTraceback.newTraceToBit("canBeParentedBy"));
        }
        // we need to check that all the paths are valid
        rawData.canBeParentedBy.forEach((parentingRule, index) => {
            // we get the module path and try to find the module
            const parentingRuleModulePath = parentingRule.module.split("/");
            const parentingModule = Root_1.default.getModuleRawFor(rawRootData, parentingRuleModulePath);
            // if we don't find it we throw an error
            if (!parentingModule) {
                throw new Error_1.default("Cannot find module for parenting module rule in root", actualTraceback.newTraceToBit("canBeParentedBy").newTraceToBit(index).newTraceToBit("module"));
            }
            // now we try to find the item definition if we have specified one
            if (parentingRule.itemDefinition) {
                // and we extract it if possible
                const itemDefinitionPath = parentingRule.itemDefinition.split("/");
                const parentingItemDefinition = Module_1.default.getItemDefinitionRawFor(parentingModule, itemDefinitionPath);
                // if we have no result it's an error
                if (!parentingItemDefinition) {
                    throw new Error_1.default("Cannot find module for parenting item definition in module", actualTraceback.newTraceToBit("canBeParentedBy").newTraceToBit(index).newTraceToBit("itemDefinition"));
                }
            }
        });
    }
    // if we have a parenting role access we must have a can be parented by rule
    if (rawData.parentingRoleAccess && !rawData.canBeParentedBy) {
        throw new Error_1.default("Setting parentingRoleAccess without canBeParentedBy rules", actualTraceback.newTraceToBit("parentingRoleAccess"));
    }
    // check the custom consistency so that all custom keys are available
    // in all languages, note how we move the traceback location
    checkI18nCustomConsistency(rawData.i18nData, actualTraceback.newTraceToLocation(rawData.i18nDataLocation));
    // if we have policies we need to check them all
    // this is a bit of a tricky process because policies can
    // get complex fast
    if (rawData.policies) {
        // we enter a loop
        Object.keys(rawData.policies).forEach((policyType) => {
            // the policy types are the edit, delete, create, read, parent
            Object.keys(rawData.policies[policyType]).forEach((policyName) => {
                // policy names just as the item definition name aren't alowed to be like this
                if (policyName.startsWith("_")) {
                    throw new Error_1.default("Policy rule '" + policyName +
                        "' starts with underscore, and that's invalid", actualTraceback.newTraceToBit("policies").newTraceToBit(policyType).newTraceToBit(policyName));
                }
                // so we extract the policy value and start checking
                const policyValue = rawData.policies[policyType][policyName];
                // Policies do not allow for the owner metarole, and the reason for this is that
                // it is actually hard to check and enforce, currently it is not checked
                // an owner metarole is simply ignored, rules that only apply to owners are odd
                // to start with, why would an owner be subjected to a more complex policy
                if (policyValue.roles.includes(constants_1.OWNER_METAROLE)) {
                    throw new Error_1.default("Policy rule '" + policyName +
                        "' includes a &OWNER role, and this is not allowed", actualTraceback
                        .newTraceToBit("policies")
                        .newTraceToBit(policyType)
                        .newTraceToBit(policyName)
                        .newTraceToBit("roles"));
                }
                // let's get the module and item definition, parent policy uses this
                let moduleForPolicy = parentModule;
                let itemDefinitionForPolicy = rawData;
                // if we have one, we must check that these paths are right
                if (policyValue.module) {
                    // using the root we can call the static function
                    moduleForPolicy = Root_1.default.getModuleRawFor(rawRootData, policyValue.module.split("/"));
                    itemDefinitionForPolicy = null;
                    if (!moduleForPolicy) {
                        throw new Error_1.default("Policy rule '" + policyName +
                            "' contains an invalid module that cannot be found '" + policyValue.module + "'", actualTraceback
                            .newTraceToBit("policies")
                            .newTraceToBit(policyType)
                            .newTraceToBit(policyName)
                            .newTraceToBit("module"));
                    }
                    // the same for the item definition
                    if (policyValue.itemDefinition) {
                        itemDefinitionForPolicy = Module_1.default.getItemDefinitionRawFor(moduleForPolicy, policyValue.itemDefinition.split("/"));
                        if (!itemDefinitionForPolicy) {
                            throw new Error_1.default("Policy rule '" + policyName +
                                "' contains an invalid item definition that cannot be found '" + policyValue.itemDefinition + "'", actualTraceback
                                .newTraceToBit("policies")
                                .newTraceToBit(policyType)
                                .newTraceToBit(policyName)
                                .newTraceToBit("itemDefinition"));
                        }
                    }
                }
                else if (policyValue.itemDefinition) {
                    // otherwise if we have an item definition but no module
                    // specified this is bad input
                    throw new Error_1.default("Policy rule '" + policyName +
                        "' contains an item definition but does not specify the module", actualTraceback
                        .newTraceToBit("policies")
                        .newTraceToBit(policyType)
                        .newTraceToBit(policyName)
                        .newTraceToBit("itemDefinition"));
                }
                // now we need to go for all the properties of the policy
                policyValue.properties.forEach((propertyId, index) => {
                    // we need to check that each one of them does exists
                    // in the module and item definition we are using, if any
                    // otherwise it's a prop extension
                    let propertyRaw;
                    if (itemDefinitionForPolicy) {
                        propertyRaw = ItemDefinition_1.default.getPropertyDefinitionRawFor(itemDefinitionForPolicy, moduleForPolicy, propertyId, true);
                    }
                    else {
                        propertyRaw = Module_1.default.getPropExtensionRawFor(moduleForPolicy, propertyId);
                    }
                    // if we have no property
                    if (propertyRaw === null) {
                        // we throw the error for the missing property
                        throw new Error_1.default("Policy rule '" + policyName +
                            "' contains an invalid property that cannot be found '" + propertyId +
                            "' in '" + itemDefinitionForPolicy.name + "'", actualTraceback
                            .newTraceToBit("policies")
                            .newTraceToBit(policyType)
                            .newTraceToBit(policyName)
                            .newTraceToBit("properties")
                            .newTraceToBit(index));
                    }
                });
                // Now we got to check applying properties, applying properties exist with create, edit
                // and read rules, but not parenting nor delete, however policies are generic so we
                // run a generic check, only the schema checks specifics
                if (policyValue.applyingProperties) {
                    // now we check the applying properties
                    policyValue.applyingProperties.forEach((propertyId, index) => {
                        // that all of them do exist, using the same method as before
                        let propertyRaw;
                        if (itemDefinitionForPolicy) {
                            propertyRaw = ItemDefinition_1.default.getPropertyDefinitionRawFor(itemDefinitionForPolicy, moduleForPolicy, propertyId, true);
                        }
                        else {
                            propertyRaw = Module_1.default.getPropExtensionRawFor(moduleForPolicy, propertyId);
                        }
                        // and if we don't find the property we throw the error
                        if (propertyRaw === null) {
                            throw new Error_1.default("Policy rule '" + policyName +
                                "' contains an invalid property that cannot be found '" + propertyId +
                                "' in '" + itemDefinitionForPolicy.name + "'", actualTraceback
                                .newTraceToBit("policies")
                                .newTraceToBit(policyType)
                                .newTraceToBit(policyName)
                                .newTraceToBit("applyingProperties")
                                .newTraceToBit(index));
                        }
                    });
                }
                // Same as applyng properties, in the same fashion, but for includes
                if (policyValue.applyingIncludes) {
                    // so we loop over them
                    policyValue.applyingIncludes.forEach((includeId, index) => {
                        // and try to extract it from the item definition
                        let includeRaw;
                        // this should be the case because the schema should prevent
                        // module only policies to exist to start with that have applyingIncludes
                        // as module and item definition descriptions only exist within
                        // parenting policies
                        if (itemDefinitionForPolicy) {
                            includeRaw = itemDefinitionForPolicy.includes &&
                                itemDefinitionForPolicy.includes.find((i) => i.id === includeId);
                        }
                        else {
                            throw new Error_1.default("Policy rule '" + policyName +
                                "' has set itself as an external module-only rule" +
                                " but it requests for applying includes '" + includeId + "'", actualTraceback
                                .newTraceToBit("policies")
                                .newTraceToBit(policyType)
                                .newTraceToBit(policyName)
                                .newTraceToBit("applyingIncludes")
                                .newTraceToBit(index));
                        }
                        // so anyway if we don't find the include
                        if (!includeRaw) {
                            // we throw the error
                            throw new Error_1.default("Policy rule '" + policyName +
                                "' contains an invalid item id that cannot be found '" + includeId + "'", actualTraceback
                                .newTraceToBit("policies")
                                .newTraceToBit(policyType)
                                .newTraceToBit(policyName)
                                .newTraceToBit("applyingIncludes")
                                .newTraceToBit(index));
                        }
                    });
                }
            });
        });
    }
    // now we are done with policies and go onto check child definitions
    // that are item definitions that are children of this
    if (rawData.childDefinitions) {
        rawData
            .childDefinitions.forEach((cd) => checkItemDefinition(rawRootData, cd, parentModule, actualTraceback));
    }
    // and also includes, if they exist
    if (rawData.includes) {
        const idPool = [];
        rawData.includes.forEach((itm, index) => checkInclude(itm, rawData, parentModule, idPool, actualTraceback.newTraceToBit("includes").newTraceToBit(index)));
    }
    // and then properties
    if (rawData.properties) {
        rawData.properties
            .forEach((p, index) => checkPropertyDefinition(p, rawData, parentModule, actualTraceback.newTraceToBit("properties").newTraceToBit(index)));
    }
}
exports.checkItemDefinition = checkItemDefinition;
/**
 * Checks an include that exist within the item definition, include represents
 * inclusion of properties as an sub item within another item, it's like prop
 * extensions but in reverse
 * @param rawData the raw data of the include
 * @param parentItemDefinition the parent item definition that contains the include
 * @param parentModule the parent module that contains the item definition
 * @param idPool the id pool is a referred array that checks that there are no
 * duplicate includes with the same id
 * @param traceback the traceback already pointing to this include
 */
function checkInclude(rawData, parentItemDefinition, parentModule, idPool, traceback) {
    // if we have an include in the id pool already with the same id
    if (idPool.includes(rawData.id)) {
        // then this is a checkup error as it is repeated
        throw new Error_1.default("Duplicate id in the same item definition", traceback.newTraceToBit("id"));
    }
    // now we add ourselves to the id pool
    idPool.push(rawData.id);
    // check whether the item definition exists for this item
    // it must exist to be an item, this also checks for
    // imported modules
    const referredItemDefinitionRaw = ItemDefinition_1.default.getItemDefinitionRawFor(parentItemDefinition, parentModule, rawData.definition);
    if (!referredItemDefinitionRaw) {
        throw new Error_1.default("Missing item definition", traceback.newTraceToBit("definition"));
    }
    // get all the predefined properties or an empty array
    const predefinedPropertiesKeys = rawData.predefinedProperties ?
        Object.keys(rawData.predefinedProperties) : [];
    // The same for the enforced
    const enforcedPropertiesKeys = rawData.enforcedProperties ?
        Object.keys(rawData.enforcedProperties) : [];
    // we don't need to check whether this properties exist in
    // the item definition because PropertiesValueMappingDefiniton does that
    // see if there are shared between both arrays
    const sharedProperties = predefinedPropertiesKeys
        .filter((value) => -1 !== enforcedPropertiesKeys.indexOf(value));
    // predefined properties and enforced properties must not be shared
    // for the simple reason that enforced properties are set in stone
    if (sharedProperties.length) {
        throw new Error_1.default("predefined and enforced properties collision on " +
            sharedProperties.join(","), traceback);
    }
    // Now we check again this time against the sinkIn properties
    const sharedProperties2 = (rawData.sinkIn || [])
        .filter((value) => -1 !== enforcedPropertiesKeys.indexOf(value));
    // equally there might not be a collision here, enforced properties
    // need not to sink in
    if (sharedProperties2.length) {
        throw new Error_1.default("sink in properties and enforced properties collision on " +
            sharedProperties2.join(","), traceback);
    }
    // Now we check whether this properties exist for sinkin
    if (rawData.sinkIn) {
        rawData.sinkIn.forEach((propertyToSinkIn, index) => {
            // when sinking in properties that are not part of the
            // element itself (extended) are not valid
            if (!ItemDefinition_1.default
                .getPropertyDefinitionRawFor(referredItemDefinitionRaw, parentModule, propertyToSinkIn, false)) {
                throw new Error_1.default("Missing property in item definition", traceback.newTraceToBit("sinkIn").newTraceToBit(index));
            }
        });
    }
    // enforced and predefined properties aren't check here they are check
    // on the value mapper
    ["enforcedProperties", "predefinedProperties"].forEach((p) => {
        if (rawData[p]) {
            checkPropertiesValueMappingDefiniton(rawData[p], parentItemDefinition, referredItemDefinitionRaw, parentModule, traceback.newTraceToBit(p));
        }
    });
    // Check Conflicting defaultExcluded and defaultExcludedIf
    if (typeof rawData.defaultExcluded !== "undefined" &&
        typeof rawData.defaultExcludedIf !== "undefined") {
        throw new Error_1.default("Conflicting properties defaultExcluded and defaultExcludedIf", traceback);
    }
    else if (rawData.defaultExcludedIf) {
        checkConditionalRuleSet(rawData.defaultExcludedIf, parentItemDefinition, parentModule, traceback.newTraceToBit("defaultExcludedIf"));
    }
    // also Conflicting canUserExclude and canUserExcludeIf
    if (typeof rawData.canUserExclude !== "undefined" &&
        typeof rawData.canUserExcludeIf !== "undefined") {
        throw new Error_1.default("Conflicting properties canUserExclude and canUserExcludeIf", traceback);
    }
    else if (rawData.canUserExcludeIf) {
        checkConditionalRuleSet(rawData.canUserExcludeIf, parentItemDefinition, parentModule, traceback.newTraceToBit("canUserExcludeIf"));
    }
    // Check the exclusion rule
    if (rawData.excludedIf) {
        checkConditionalRuleSet(rawData.excludedIf, parentItemDefinition, parentModule, traceback.newTraceToBit("excludedIf"));
    }
}
exports.checkInclude = checkInclude;
/**
 * Checks the properties value mapping definition that is in use
 * by predefined and enforced properties
 * @param rawData the raw data of that value mapping
 * @param parentItemDefinition the parent item definition
 * @param referredItemDefinition the referred item definition it refers to as this
 * is used within includes
 * @param parentModule the parent module of both item definitions
 * @param traceback the traceback already pointing to this mapping
 */
function checkPropertiesValueMappingDefiniton(rawData, parentItemDefinition, referredItemDefinition, parentModule, traceback) {
    // We need to loop over the properties that were given
    const propertyList = Object.keys(rawData);
    let propertyIdOfTheReferredItem;
    for (propertyIdOfTheReferredItem of propertyList) {
        // get the value for them
        const propertyValueAppliedToTheReferred = rawData[propertyIdOfTheReferredItem];
        // and lets check that they actually have such properties
        // the same way value mapper setters are not allowed
        // to set the values of the extended properties
        // they only exist within item definitions
        // and set item properties
        const propertyDefinitionOfTheReferredItem = ItemDefinition_1.default.getPropertyDefinitionRawFor(referredItemDefinition, parentModule, propertyIdOfTheReferredItem, false);
        if (!propertyDefinitionOfTheReferredItem) {
            throw new Error_1.default(`Property '${propertyIdOfTheReferredItem}' not available` +
                ` in referred '${referredItemDefinition.name}'`, traceback.newTraceToBit(propertyIdOfTheReferredItem));
        }
        const referredPropertyAsValueApplied = propertyValueAppliedToTheReferred;
        // we must ensure it's not a referred property to do the check
        if (!referredPropertyAsValueApplied.property) {
            // And check whether the value is even valid
            const invalidReason = PropertyDefinition_1.default.isValidValue(propertyDefinitionOfTheReferredItem, propertyValueAppliedToTheReferred.exactValue, true);
            if (invalidReason) {
                throw new Error_1.default(`Property value for '${propertyIdOfTheReferredItem}' is invalid` +
                    ` for referred '${referredItemDefinition.name}' : ${invalidReason}`, traceback.newTraceToBit(propertyIdOfTheReferredItem).newTraceToBit("exactValue"));
            }
        }
        else if (referredPropertyAsValueApplied.property !== "&this") {
            // let's get the referred definition this property is about
            // this one is allowed to access the prop extensions
            // as to set a value it is allowed to use the prop extension
            // as a value
            const propertyAsValueDefinition = ItemDefinition_1.default.getPropertyDefinitionRawFor(parentItemDefinition, parentModule, referredPropertyAsValueApplied.property, true);
            // if we don't get any throw an error
            if (!propertyAsValueDefinition) {
                throw new Error_1.default(`Unavailable referred property` +
                    ` '${referredPropertyAsValueApplied.property}'` +
                    ` in '${parentItemDefinition.name}'`, traceback.newTraceToBit(propertyIdOfTheReferredItem)
                    .newTraceToBit("property"));
            }
            // If the types don't match throw an error
            if (propertyAsValueDefinition.type !==
                propertyDefinitionOfTheReferredItem.type) {
                throw new Error_1.default(`Referred property '${referredPropertyAsValueApplied.property}' in ` +
                    ` '${parentItemDefinition.name}' does not match with ` +
                    ` '${referredItemDefinition.name}' property` +
                    ` '${propertyIdOfTheReferredItem}' the first is` +
                    ` '${propertyAsValueDefinition.type}' and the second` +
                    ` '${propertyDefinitionOfTheReferredItem.type}'`, traceback.newTraceToBit(propertyIdOfTheReferredItem)
                    .newTraceToBit("property"));
            }
        }
    }
}
exports.checkPropertiesValueMappingDefiniton = checkPropertiesValueMappingDefiniton;
/**
 * Checks a property definition to ensure consistency
 * @param rawData the raw data of the property
 * @param parentItemDefinition the parent item definition where the property is contained
 * if any, as it could be a prop extension
 * @param parentModule the parent module
 * @param traceback the traceback already pointing to this property
 */
function checkPropertyDefinition(rawData, parentItemDefinition, parentModule, traceback) {
    // These properties are not valid, they are reserved
    if (Object.keys(constants_1.RESERVED_BASE_PROPERTIES).includes(rawData.id) ||
        Object.keys(constants_1.RESERVED_SEARCH_PROPERTIES).includes(rawData.id) ||
        Object.keys(constants_1.RESERVED_GETTER_PROPERTIES).includes(rawData.id) ||
        Object.keys(constants_1.RESERVED_CHANGE_PROPERTIES).includes(rawData.id)) {
        throw new Error_1.default("Property '" + rawData.id + "' is reserved", traceback.newTraceToBit("id"));
    }
    // Let's get the property standard
    const propertyDefintionTypeStandard = PropertyDefinition_1.default
        .supportedTypesStandard[rawData.type];
    // if we have subtype let's check the subtype is valid
    if (rawData.subtype &&
        !(propertyDefintionTypeStandard.supportedSubtypes || []).includes(rawData.subtype)) {
        throw new Error_1.default("Type '" + rawData.type + "' does not support this subtype", traceback.newTraceToBit("subtype"));
    }
    // we set this constant on whether the type itself is searchable
    const propertyIsSearchable = propertyDefintionTypeStandard.searchable;
    const itemSupportsExactAndRange = propertyDefintionTypeStandard.searchInterface ===
        search_interfaces_1.PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE;
    // if we have a search level but the item is not searchable throw an error
    if (typeof rawData.searchable !== "undefined" && !propertyIsSearchable) {
        throw new Error_1.default("Type '" + rawData.type + "' does not support searchable flag " +
            "as it cannot be searched", traceback.newTraceToBit("searchable"));
        // if we don't support exact an range but somehow ranged was disabled throw an error
    }
    else if (!itemSupportsExactAndRange && rawData.disableRangedSearch) {
        throw new Error_1.default("Type '" + rawData.type + "' does not support disableRangedSearch " +
            "as it does not support ranged search", traceback.newTraceToBit("disableRangedSearch"));
        // also when it is not searchable
    }
    else if (rawData.disableRangedSearch && !propertyIsSearchable) {
        throw new Error_1.default("Type '" + rawData.type + "' does not support disableRangedSearch " +
            "as it cannot be searched", traceback.newTraceToBit("disableRangedSearch"));
        // this is contradictory
    }
    else if (typeof rawData.searchable !== "undefined" && !rawData.searchable && rawData.disableRangedSearch) {
        throw new Error_1.default("Type '" + rawData.type + "' cannot disable ranged search if search is disabled", traceback.newTraceToBit("disableRangedSearch"));
    }
    // checks min, max, max decimal count, max length and min length
    if (!propertyDefintionTypeStandard.allowsMinMaxDefined &&
        typeof rawData.min !== "undefined") {
        throw new Error_1.default("Cannot set a min value", traceback.newTraceToBit("min"));
    }
    else if (!propertyDefintionTypeStandard.allowsMinMaxDefined &&
        typeof rawData.max !== "undefined") {
        throw new Error_1.default("Cannot set a max value", traceback.newTraceToBit("max"));
    }
    else if (!propertyDefintionTypeStandard.allowsMaxDecimalCountDefined &&
        typeof rawData.maxDecimalCount !== "undefined") {
        throw new Error_1.default("Cannot set a maxDecimalCount ", traceback.newTraceToBit("maxDecimalCount"));
    }
    else if (!propertyDefintionTypeStandard.allowsMinMaxLengthDefined &&
        typeof rawData.minLength !== "undefined") {
        throw new Error_1.default("Cannot set a minLength value", traceback.newTraceToBit("minLength"));
    }
    else if (!propertyDefintionTypeStandard.allowsMinMaxLengthDefined &&
        typeof rawData.maxLength !== "undefined") {
        throw new Error_1.default("Cannot set a maxLength value", traceback.newTraceToBit("maxLength"));
    }
    if (typeof rawData.coerceNullsIntoDefault !== "undefined" &&
        !rawData.nullable) {
        throw new Error_1.default("Cannot set coerce nulls into default if property is not nullable", traceback.newTraceToBit("coerceNullsIntoDefault"));
    }
    else if (typeof rawData.coerceNullsIntoDefault !== "undefined" &&
        typeof rawData.default === "undefined") {
        throw new Error_1.default("Cannot set coerce nulls into default if property has no basic default value", traceback.newTraceToBit("coerceNullsIntoDefault"));
    }
    else if (typeof rawData.coerceNullsIntoDefault !== "undefined" &&
        rawData.default === null) {
        throw new Error_1.default("Cannot set coerce nulls into default if default value is also null", traceback.newTraceToBit("coerceNullsIntoDefault"));
    }
    // check invalid custom errors
    if (rawData.invalidIf) {
        const possiblyBrokenErrorIndex = rawData.invalidIf.findIndex((ii) => PropertyDefinition_1.PropertyInvalidReason[ii.error]);
        if (possiblyBrokenErrorIndex !== -1) {
            throw new Error_1.default(`cannot use invalidIf using a builtin error as name '${rawData.invalidIf[possiblyBrokenErrorIndex].error}'`, traceback.newTraceToBit("invalidIf").newTraceToBit(possiblyBrokenErrorIndex).newTraceToBit("error"));
        }
    }
    // check special properties are set
    if (propertyDefintionTypeStandard.specialProperties) {
        propertyDefintionTypeStandard.specialProperties.forEach((property) => {
            if (property.required && !rawData.specialProperties) {
                throw new Error_1.default(`type '${rawData.type}' requires specialProperties field for '${property.name}'`, traceback);
            }
            else if (property.required && !rawData.specialProperties[property.name]) {
                throw new Error_1.default(`type '${rawData.type}' requires special property '${property.name}'`, traceback.newTraceToBit("specialProperties"));
            }
            else if (rawData.specialProperties && rawData.specialProperties[property.name] &&
                typeof rawData.specialProperties[property.name] !== property.type) {
                throw new Error_1.default(`Invalid type for '${rawData.type}' special property '${property.name}' must be '${property.type}'`, traceback.newTraceToBit("specialProperties").newTraceToBit(property.name));
            }
        });
    }
    // lets check that all the ones in values are valid
    if (rawData.values) {
        const valuesTraceback = traceback.newTraceToBit("values");
        rawData.values.forEach((value, index) => {
            const invalidreason = PropertyDefinition_1.default.isValidValue(rawData, value, false);
            if (invalidreason) {
                throw new Error_1.default("Invalid value for item: " + invalidreason, valuesTraceback.newTraceToBit(index));
            }
        });
    }
    // Let's check whether the default value is valid too
    if (rawData.default) {
        const invalidReason = PropertyDefinition_1.default.isValidValue(rawData, rawData.default, true);
        if (invalidReason) {
            throw new Error_1.default("Invalid type for default: " + invalidReason, traceback.newTraceToBit("default"));
        }
    }
    // And the default if values are valid
    if (rawData.defaultIf) {
        const defaultIfTraceback = traceback.newTraceToBit("defaultIf");
        rawData.defaultIf.forEach((rule, index) => {
            checkConditionalRuleSet(rule.if, parentItemDefinition, parentModule, defaultIfTraceback.newTraceToBit(index).newTraceToBit("if"));
            const invalidReason = PropertyDefinition_1.default.isValidValue(rawData, rule.value, true);
            if (invalidReason) {
                throw new Error_1.default("Invalid value for default if definition: " + invalidReason, defaultIfTraceback.newTraceToBit(index).newTraceToBit("value"));
            }
        });
    }
    if (rawData.enforcedValue) {
        const invalidReason = PropertyDefinition_1.default.isValidValue(rawData, rawData.enforcedValue, true);
        if (invalidReason) {
            throw new Error_1.default("Invalid value for enforced value definition: " + invalidReason, traceback.newTraceToBit("enforcedValue"));
        }
    }
    // enforced values is what happens when a property meets a condition
    // and is enforced into a value
    if (rawData.enforcedValues) {
        // so we need to check and first we build a traceback
        const enforcedValuesTraceback = traceback.newTraceToBit("enforcedValues");
        // they are conditional rule sets
        rawData.enforcedValues.forEach((ev, index) => {
            // so we check them as so
            checkConditionalRuleSet(ev.if, parentItemDefinition, parentModule, enforcedValuesTraceback.newTraceToBit(index).newTraceToBit("if"));
            // and we also check the value
            const invalidReason = PropertyDefinition_1.default.isValidValue(rawData, ev.value, true);
            // ensure that it's a valid value
            if (invalidReason) {
                throw new Error_1.default("Invalid type for enforcedValues enforced value: " + invalidReason, enforcedValuesTraceback.newTraceToBit(index).newTraceToBit("value"));
            }
        });
    }
    // check the conditional rule set for the hiddenIf rule
    if (rawData.hiddenIf) {
        checkConditionalRuleSet(rawData.hiddenIf, parentItemDefinition, parentModule, traceback.newTraceToBit("hiddenIf"));
    }
}
exports.checkPropertyDefinition = checkPropertyDefinition;
/**
 * Checks the i18n data consistency of custom keys
 * so that they are present in all languages
 * @param rawData the raw i18n data
 * @param traceback the traceback already pointing to this file
 * the i18n data comes from a .properties file which cannot be pointed
 */
function checkI18nCustomConsistency(rawData, traceback) {
    // so we first analyze all the keys in order to extract all
    // the custom keys
    const analysis = Object.keys(rawData).map((localeKey) => {
        // for that for every locale we extract the custom fields
        const customData = rawData[localeKey].custom;
        // if there are no custom fields, then the keys is an empty array
        if (!customData) {
            return {
                keys: [],
                localeKey,
            };
        }
        // otherwise it is whatever keys were set by the object
        return {
            keys: Object.keys(customData),
            localeKey,
        };
    });
    // now we need to loop to ensure all keys are equal within languages
    analysis.forEach((analysisData) => {
        // so we loop twice to cross check
        analysis.forEach((analysisDataCompared) => {
            // and now we check that we are not cross checking the same locale
            if (analysisData.localeKey !== analysisDataCompared.localeKey) {
                // and as so we check for every key in the locale one by one, we could
                // use equals but then our error wouldn't be that accurate
                analysisData.keys.forEach((customKeyInLocale) => {
                    // if one key is missing in the second language
                    if (!analysisDataCompared.keys.includes(customKeyInLocale)) {
                        // throw the error that is the case
                        throw new Error_1.default("Custom i18n in locale " + analysisData.localeKey + " includes custom key '" +
                            customKeyInLocale + "' which is not present in locale " + analysisDataCompared.localeKey, traceback);
                    }
                });
            }
        });
    });
}
exports.checkI18nCustomConsistency = checkI18nCustomConsistency;
/**
 * Checks a module for consistency as well as all its prop extensions
 * @param rawRootData the root data where this module is located
 * @param rawData the raw data of the module itself
 * @param traceback the traceback object
 */
function checkModule(rawRootData, rawData, traceback) {
    // so first we make it point to our own file where this module
    // is located
    const actualTraceback = traceback.newTraceToLocation(rawData.location);
    // setup the pointers
    actualTraceback.setupPointers(rawData.pointers, rawData.raw);
    // and now we check that the name is valid and doesn't start with _
    if (rawData.name.startsWith("_")) {
        throw new Error_1.default("Module name '" + rawData.name + "' starts with underscore, and that's invalid", actualTraceback.newTraceToBit("name"));
    }
    // check the i18n consistency so that custom keys are valid
    checkI18nCustomConsistency(rawData.i18nData, traceback.newTraceToLocation(rawData.i18nDataLocation));
    if (rawData.modRoleAccess &&
        (rawData.modRoleAccess.includes(constants_1.ANYONE_METAROLE) ||
            rawData.modRoleAccess.includes(constants_1.GUEST_METAROLE))) {
        throw new Error_1.default("Allowing the roles for anyone or guests to moderate is not allowed, as this can create a security flaw", actualTraceback.newTraceToBit("modRoleAccess"));
    }
    if (rawData.flagRoleAccess &&
        (rawData.flagRoleAccess.includes(constants_1.ANYONE_METAROLE) ||
            rawData.flagRoleAccess.includes(constants_1.GUEST_METAROLE))) {
        throw new Error_1.default("Allowing the roles for anyone or guests to flag is not allowed, as this can create a security flaw", actualTraceback.newTraceToBit("flagRoleAccess"));
    }
    // and we got to check the prop extensions if we have some
    if (rawData.propExtensions) {
        // and now the prop extension traceback
        const propExtTraceback = actualTraceback
            .newTraceToLocation(rawData.propExtLocation);
        // setup the pointers
        propExtTraceback.setupPointers(rawData.propExtPointers, rawData.propExtRaw);
        // loop per property
        rawData.propExtensions.forEach((propDef, index) => {
            // the specific traceback
            const specificPropExtTraceback = propExtTraceback.newTraceToBit(index);
            // let's create a pseudo item that acts as the module holder
            // this will allow for checking that only matches the prop extensions
            // say if they have conditionals and whatnot, the pseudo location
            // is good for checking
            checkPropertyDefinition(propDef, {
                type: "item",
                name: rawData.name,
                location: rawData.location.replace(".json", ".propext.json"),
                i18nData: {},
                properties: [],
            }, rawData, specificPropExtTraceback);
        });
    }
    // if we have children
    if (rawData.children) {
        // we need to check them as well
        rawData.children.forEach((moduleOrItemDef) => {
            // but it depends on what they are, say they are a module
            if (moduleOrItemDef.type === "module") {
                // we send them to the checking module function
                checkModule(rawRootData, moduleOrItemDef, actualTraceback);
            }
            else {
                // otherwise it must be an item definition
                checkItemDefinition(rawRootData, moduleOrItemDef, rawData, actualTraceback);
            }
        });
    }
}
exports.checkModule = checkModule;
/**
 * Checks the entire root of the itemize schema
 * @param rawData the root
 */
function checkRoot(rawData) {
    // we build the traceback and setup the pointers
    const traceback = new Traceback_1.default(rawData.location);
    traceback.setupPointers(rawData.pointers, rawData.raw);
    // and go per children
    if (rawData.children) {
        rawData.children.forEach((mod, index) => {
            // all children in the root are modules
            checkModule(rawData, mod, traceback.newTraceToBit("children").newTraceToBit(index));
        });
    }
}
exports.checkRoot = checkRoot;
