"use strict";
/**
 * Contains the base function that handles read, view, and entry all of them
 * in a single function single the logic that handles this under the hood is remarkably similar
 *
 * @packageDocumentation
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntryViewReadSet = void 0;
const react_1 = __importDefault(require("react"));
const item_1 = require("../../providers/item");
const search_interfaces_1 = require("../../../base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces");
const constants_1 = require("../../../constants");
const PropertyView_1 = __importStar(require("../../internal/components/PropertyView"));
const PropertyEntry_1 = __importDefault(require("../../internal/components/PropertyEntry"));
const PropertySetter_1 = __importDefault(require("../../internal/components/PropertySetter"));
const include_1 = require("../../providers/include");
const util_1 = require("../../../util");
const config_provider_1 = require("../../internal/providers/config-provider");
const deep_equal_1 = __importDefault(require("deep-equal"));
/**
 * This is a legit function that takes all the props in order to pipe them
 * to the proper handler
 * @param props the props that are passed
 * @param type the type, entry, view, read, or set
 * @returns a react component
 */
function EntryViewReadSet(props, type) {
    // so we return
    return (react_1.default.createElement(config_provider_1.ConfigContext.Consumer, null, (config) => (react_1.default.createElement(item_1.ItemContext.Consumer, null, (itemContextualValue) => (react_1.default.createElement(include_1.IncludeContext.Consumer, null, (includeContextualValue) => {
        // so we need to be in an item definition contextual value
        // because otherwise we just can't get the property we need
        if (!itemContextualValue) {
            throw new Error("The Entry/View/Read/Set must be in a ItemProvider context");
        }
        // now we need the actual id, because search variants
        // cause another id
        let actualId = props.id;
        if (props.searchVariant) {
            // for that we just get the prefix and add it
            actualId =
                search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes[props.searchVariant.toUpperCase()] + props.id;
        }
        // now we need to check if this is a meta property such a created_at, edited_at, etc...
        const isMetaProperty = !!constants_1.RESERVED_BASE_PROPERTIES[actualId];
        // and once we know that we can get the value, basically we
        // don't have a property definition if is a meta property, and we need to extract
        // it from the include if it's available
        const property = !isMetaProperty ? (includeContextualValue ?
            includeContextualValue.include.getSinkingPropertyFor(actualId) :
            ((props.policyType && props.policyName) ?
                itemContextualValue.idef
                    .getPropertyDefinitionForPolicy(props.policyType, props.policyName, actualId) :
                itemContextualValue.idef
                    .getPropertyDefinitionFor(actualId, true))) : null;
        // now we need to get the property state
        let propertyState = null;
        // if it's not a meta property we can access it
        if (!isMetaProperty) {
            // if we are into an include
            if (includeContextualValue) {
                // this might be null if the state is excluded, which makes the property state
                // be null and unknown
                if (includeContextualValue.state.itemState) {
                    propertyState = includeContextualValue.state.itemState.properties
                        .find((p) => p.propertyId === actualId);
                }
            }
            else if (props.policyType && props.policyName) {
                // otherwise if we refer to a policy
                propertyState = itemContextualValue.state
                    .policies[props.policyType][props.policyName]
                    .find((p) => p.propertyId === actualId);
            }
            else {
                // otherwise
                propertyState =
                    itemContextualValue.state.properties.find((p) => p.propertyId === actualId);
            }
        }
        // now we need to get the container id, the container id refers to where the data was stored
        // in the server side information container, we might have one already
        const containerId = (itemContextualValue.state.gqlOriginalFlattenedValue &&
            itemContextualValue.state.gqlOriginalFlattenedValue.container_id) || null;
        // so now we can start in conditional rendering
        if (type === "read") {
            // so if we have a property state (which will not exist in meta properties)
            if (propertyState) {
                // we get the property description
                const propertyDescription = property.getPropertyDefinitionDescription();
                // to check if we are talking about file, or files
                if (propertyDescription.gqlAddFileToFields) {
                    // and if that is the case, now we need to check if it's a
                    // list or a single value
                    const domain = process.env.NODE_ENV === "production" ? config.productionHostname : config.developmentHostname;
                    // and as such we absolute the files so that their urls
                    // are indeed proper, being a read operation, there's no risk on it
                    if (!propertyDescription.gqlList) {
                        return props.children(util_1.fileURLAbsoluter(domain, config.containersHostnamePrefixes, props.useAppliedValue ? propertyState.stateAppliedValue : propertyState.value, itemContextualValue.idef, itemContextualValue.forId, itemContextualValue.forVersion, containerId, includeContextualValue && includeContextualValue.include, property, !!props.cacheFiles), propertyState);
                    }
                    else {
                        return props.children(util_1.fileArrayURLAbsoluter(domain, config.containersHostnamePrefixes, props.useAppliedValue ? propertyState.stateAppliedValue : propertyState.value, itemContextualValue.idef, itemContextualValue.forId, itemContextualValue.forVersion, containerId, includeContextualValue && includeContextualValue.include, property, !!props.cacheFiles), propertyState);
                    }
                }
                // otherwise we just call the function as it is
                return props.children(props.useAppliedValue ? propertyState.stateAppliedValue : propertyState.value, propertyState);
            }
            // if we are talking a meta property
            if (isMetaProperty) {
                // the grapqhl value we get
                let gqlValue = itemContextualValue.state.gqlOriginalFlattenedValue &&
                    itemContextualValue.state.gqlOriginalFlattenedValue[actualId];
                // if it's undefined we give null
                if (typeof gqlValue === "undefined") {
                    gqlValue = null;
                }
                // and then call the children
                return props.children(gqlValue, null);
            }
            // Property has no state, and no internal value, it must be somehow hidden
            return null;
            // we go now for views
        }
        else if (type === "view") {
            // now in the case of these, we have special considerations
            if (propertyState) {
                // if we have a state it's simple, and we pass these values into it
                return (react_1.default.createElement(PropertyView_1.default, { include: includeContextualValue && includeContextualValue.include, property: property, state: propertyState, capitalize: props.capitalize, renderer: props.renderer, containerId: containerId, rendererArgs: props.rendererArgs, forId: itemContextualValue.forId, forVersion: itemContextualValue.forVersion, itemDefinition: itemContextualValue.idef, useAppliedValue: props.useAppliedValue, cacheFiles: props.cacheFiles }));
            }
            // if we have a meta property nevertheless
            if (isMetaProperty) {
                // we need to read its value
                let gqlValue = itemContextualValue.state.gqlOriginalFlattenedValue &&
                    itemContextualValue.state.gqlOriginalFlattenedValue[actualId];
                if (typeof gqlValue === "undefined") {
                    gqlValue = null;
                }
                // and then pass it to the raw base property view, which will
                // use the appropiate rendered for this
                if (typeof gqlValue === "number") {
                    return react_1.default.createElement(PropertyView_1.RawBasePropertyView, { value: gqlValue.toString(), renderer: props.renderer, rendererArgs: props.rendererArgs });
                }
                else {
                    return react_1.default.createElement(PropertyView_1.RawBasePropertyView, { value: gqlValue, renderer: props.renderer, rendererArgs: props.rendererArgs });
                }
            }
            // otherwise there's nothing to display, the property
            // has no state, it must somehow be hidden or unavailable
            return null;
            // now for entries
        }
        else if (type === "entry") {
            // property has no state it must be hidden
            // or somehow not accessible eg. it has been optimized for
            if (!propertyState) {
                return null;
            }
            // this is the proper onchange function
            const onChange = (newValue, internalValue) => {
                let valueBeforeUpdate;
                if (props.onEntryDrivenChange) {
                    valueBeforeUpdate =
                        property.getCurrentValue(itemContextualValue.forId, itemContextualValue.forVersion);
                }
                itemContextualValue.onPropertyChange(property, newValue, internalValue);
                if (props.onEntryDrivenChange && !deep_equal_1.default(valueBeforeUpdate, newValue)) {
                    props.onEntryDrivenChange(newValue);
                }
            };
            // and the on restore function
            const onRestore = () => {
                let valueBeforeUpdate;
                if (props.onEntryDrivenChange) {
                    valueBeforeUpdate =
                        property.getCurrentValue(itemContextualValue.forId, itemContextualValue.forVersion);
                }
                itemContextualValue.onPropertyRestore(property);
                if (props.onEntryDrivenChange) {
                    const value = property.getCurrentValue(itemContextualValue.forId, itemContextualValue.forVersion);
                    if (!deep_equal_1.default(valueBeforeUpdate, value)) {
                        props.onEntryDrivenChange(value);
                    }
                }
            };
            // and now for whether it's poked, by default it's false
            let isPoked = false;
            // now we search for it, so for a policy we search in the pokedElements
            // to see if it's there
            if (props.policyType) {
                isPoked = !!itemContextualValue.pokedElements.policies.find(pElement => pElement[0] === props.policyType &&
                    pElement[1] === props.policyName &&
                    pElement[2] === property.getId());
            }
            else if (includeContextualValue) {
                // for the includes we do something similar as well
                isPoked = !!itemContextualValue.pokedElements.includes.find((iId) => {
                    return iId === includeContextualValue.include.getId();
                });
            }
            else {
                // and for a specific property
                isPoked = !!itemContextualValue.pokedElements.properties.find((pId) => {
                    return pId === property.getId();
                });
            }
            // and then we can return the property entry in all its glory
            return (react_1.default.createElement(PropertyEntry_1.default, { itemDefinition: itemContextualValue.idef, injectSubmitBlockPromise: itemContextualValue.injectSubmitBlockPromise, include: (includeContextualValue && includeContextualValue.include) || null, property: property, state: propertyState, onChange: onChange, onRestore: onRestore, forceInvalid: props.showAsInvalid, containerId: containerId, icon: props.icon, forId: itemContextualValue.forId, forVersion: itemContextualValue.forVersion, poked: isPoked, renderer: props.renderer, rendererArgs: props.rendererArgs, hideDescription: props.hideDescription, altDescription: props.altDescription, altLabel: props.altLabel, altPlaceholder: props.altPlaceholder, ignoreErrors: props.ignoreErrors, autoFocus: props.autoFocus, prefillWith: props.prefillWith, referenceFilteringSet: props.referenceFilteringSet, cacheFiles: props.cacheFiles }));
        }
        else {
            // property has no state it must be hidden
            if (!propertyState) {
                return null;
            }
            // so we return the propery setter
            return (react_1.default.createElement(PropertySetter_1.default, { property: property, onEnforce: itemContextualValue.onPropertyEnforce, onClearEnforcement: itemContextualValue.onPropertyClearEnforce, forId: itemContextualValue.forId, forVersion: itemContextualValue.forVersion, value: props.value }));
        }
    }))))));
}
exports.EntryViewReadSet = EntryViewReadSet;
