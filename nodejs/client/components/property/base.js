"use strict";
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
const react_1 = __importDefault(require("react"));
const item_definition_1 = require("../../providers/item-definition");
const search_interfaces_1 = require("../../../base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces");
const constants_1 = require("../../../constants");
const PropertyView_1 = __importStar(require("../../internal/components/PropertyView"));
const PropertyEntry_1 = __importDefault(require("../../internal/components/PropertyEntry"));
const PropertySetter_1 = __importDefault(require("../../internal/components/PropertySetter"));
const include_1 = require("../../providers/include");
const util_1 = require("../../../util");
const config_provider_1 = require("../../internal/providers/config-provider");
function EntryViewReadSet(props, type) {
    return (react_1.default.createElement(config_provider_1.ConfigContext.Consumer, null, (config) => (react_1.default.createElement(item_definition_1.ItemDefinitionContext.Consumer, null, (itemDefinitionContextualValue) => (react_1.default.createElement(include_1.IncludeContext.Consumer, null, (includeContextualValue) => {
        if (!itemDefinitionContextualValue) {
            throw new Error("The Entry/View/Read/Set must be in a ItemDefinitionProvider context");
        }
        let actualId = props.id;
        if (props.searchVariant) {
            actualId =
                search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes[props.searchVariant.toUpperCase()] + props.id;
        }
        const isMetaProperty = !!constants_1.RESERVED_BASE_PROPERTIES[actualId];
        const property = !isMetaProperty ? (includeContextualValue ?
            includeContextualValue.include.getSinkingPropertyFor(actualId) :
            ((props.policyType && props.policyName) ?
                itemDefinitionContextualValue.idef
                    .getPropertyDefinitionForPolicy(props.policyType, props.policyName, actualId) :
                itemDefinitionContextualValue.idef
                    .getPropertyDefinitionFor(actualId, true))) : null;
        let propertyState = null;
        if (!isMetaProperty) {
            if (includeContextualValue) {
                // this might be null if the state is excluded, which makes the property state
                // be null and unknown
                if (includeContextualValue.state.itemDefinitionState) {
                    propertyState = includeContextualValue.state.itemDefinitionState.properties
                        .find((p) => p.propertyId === actualId);
                }
            }
            else if (props.policyType && props.policyName) {
                propertyState = itemDefinitionContextualValue.state
                    .policies[props.policyType][props.policyName]
                    .find((p) => p.propertyId === actualId);
            }
            else {
                propertyState =
                    itemDefinitionContextualValue.state.properties.find((p) => p.propertyId === actualId);
            }
        }
        const containerId = (itemDefinitionContextualValue.state.gqlOriginalFlattenedValue &&
            itemDefinitionContextualValue.state.gqlOriginalFlattenedValue.container_id) || null;
        if (type === "read") {
            if (propertyState) {
                const propertyDescription = property.getPropertyDefinitionDescription();
                if (propertyDescription.gqlAddFileToFields) {
                    if (!propertyDescription.gqlList) {
                        return props.children(util_1.fileURLAbsoluter(config.containersHostnamePrefixes, propertyState.value, itemDefinitionContextualValue.idef, itemDefinitionContextualValue.forId, itemDefinitionContextualValue.forVersion, containerId, includeContextualValue && includeContextualValue.include, property), propertyState);
                    }
                    else {
                        return props.children(util_1.fileArrayURLAbsoluter(config.containersHostnamePrefixes, propertyState.value, itemDefinitionContextualValue.idef, itemDefinitionContextualValue.forId, itemDefinitionContextualValue.forVersion, containerId, includeContextualValue && includeContextualValue.include, property), propertyState);
                    }
                }
                return props.children(propertyState.value, propertyState);
            }
            if (isMetaProperty) {
                let gqlValue = itemDefinitionContextualValue.state.gqlOriginalFlattenedValue &&
                    itemDefinitionContextualValue.state.gqlOriginalFlattenedValue[actualId];
                if (typeof gqlValue === "undefined") {
                    gqlValue = null;
                }
                return props.children(gqlValue, null);
            }
            console.warn("Attempted to read property without state", property.getId());
            // Property has no state, and no internal value, it must be somehow hidden
            return null;
        }
        else if (type === "view") {
            if (propertyState) {
                return (react_1.default.createElement(PropertyView_1.default, { include: includeContextualValue && includeContextualValue.include, property: property, state: propertyState, capitalize: props.capitalize, renderer: props.renderer, containerId: containerId, rendererArgs: props.rendererArgs, forId: itemDefinitionContextualValue.forId, forVersion: itemDefinitionContextualValue.forVersion, itemDefinition: itemDefinitionContextualValue.idef }));
            }
            if (isMetaProperty) {
                let gqlValue = itemDefinitionContextualValue.state.gqlOriginalFlattenedValue &&
                    itemDefinitionContextualValue.state.gqlOriginalFlattenedValue[actualId];
                if (typeof gqlValue === "undefined") {
                    gqlValue = null;
                }
                if (typeof gqlValue === "number") {
                    return react_1.default.createElement(PropertyView_1.RawBasePropertyView, { value: gqlValue.toString(), renderer: props.renderer, rendererArgs: props.rendererArgs });
                }
                else {
                    return react_1.default.createElement(PropertyView_1.RawBasePropertyView, { value: gqlValue, renderer: props.renderer, rendererArgs: props.rendererArgs });
                }
            }
            return null;
        }
        else if (type === "entry") {
            // property has no state it must be hidden
            // or somehow not accessible eg. it has been optimized for
            if (!propertyState) {
                return null;
            }
            const onChange = (newValue, internalValue) => {
                if (props.onChange) {
                    props.onChange(newValue);
                }
                itemDefinitionContextualValue.onPropertyChange(property, newValue, internalValue);
            };
            const onRestore = () => {
                itemDefinitionContextualValue.onPropertyRestore(property);
            };
            let isPoked = false;
            if (props.policyType) {
                isPoked = !!itemDefinitionContextualValue.pokedElements.policies.find(pElement => pElement[0] === props.policyType &&
                    pElement[1] === props.policyName &&
                    pElement[2] === property.getId());
            }
            else if (includeContextualValue) {
                isPoked = !!itemDefinitionContextualValue.pokedElements.includes.find((iId) => {
                    return iId === includeContextualValue.include.getId();
                });
            }
            else {
                isPoked = !!itemDefinitionContextualValue.pokedElements.properties.find((pId) => {
                    return pId === property.getId();
                });
            }
            return (react_1.default.createElement(PropertyEntry_1.default, { itemDefinition: itemDefinitionContextualValue.idef, injectSubmitBlockPromise: itemDefinitionContextualValue.injectSubmitBlockPromise, include: (includeContextualValue && includeContextualValue.include) || null, property: property, state: propertyState, onChange: onChange, onRestore: onRestore, forceInvalid: props.showAsInvalid, containerId: containerId, icon: props.icon, forId: itemDefinitionContextualValue.forId, forVersion: itemDefinitionContextualValue.forVersion, poked: isPoked, renderer: props.renderer, rendererArgs: props.rendererArgs, hideDescription: props.hideDescription, altDescription: props.altDescription, altLabel: props.altLabel, altPlaceholder: props.altPlaceholder, ignoreErrors: props.ignoreErrors, autoFocus: props.autoFocus }));
        }
        else {
            // property has no state it must be hidden
            if (!propertyState) {
                return null;
            }
            return (react_1.default.createElement(PropertySetter_1.default, { property: property, onEnforce: itemDefinitionContextualValue.onPropertyEnforce.bind(null, property), onClearEnforcement: itemDefinitionContextualValue.onPropertyClearEnforce.bind(null, property), forId: itemDefinitionContextualValue.forId, forVersion: itemDefinitionContextualValue.forVersion, value: props.value }));
        }
    }))))));
}
exports.EntryViewReadSet = EntryViewReadSet;
