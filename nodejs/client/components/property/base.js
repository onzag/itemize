"use strict";
/**
 * Contains the base function that handles read, view, and entry all of them
 * in a single function single the logic that handles this under the hood is remarkably similar
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
/**
 * This is a legit function that takes all the props in order to pipe them
 * to the proper handler
 * @param props the props that are passed
 * @param type the type, entry, view, read, or set
 * @returns a react component
 */
function EntryViewReadSet(props, type) {
    // so we return
    return (react_1.default.createElement(config_provider_1.ConfigContext.Consumer, null, (config) => (react_1.default.createElement(item_definition_1.ItemDefinitionContext.Consumer, null, (itemDefinitionContextualValue) => (react_1.default.createElement(include_1.IncludeContext.Consumer, null, (includeContextualValue) => {
        // so we need to be in an item definition contextual value
        // because otherwise we just can't get the property we need
        if (!itemDefinitionContextualValue) {
            throw new Error("The Entry/View/Read/Set must be in a ItemDefinitionProvider context");
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
                itemDefinitionContextualValue.idef
                    .getPropertyDefinitionForPolicy(props.policyType, props.policyName, actualId) :
                itemDefinitionContextualValue.idef
                    .getPropertyDefinitionFor(actualId, true))) : null;
        // now we need to get the property state
        let propertyState = null;
        // if it's not a meta property we can access it
        if (!isMetaProperty) {
            // if we are into an include
            if (includeContextualValue) {
                // this might be null if the state is excluded, which makes the property state
                // be null and unknown
                if (includeContextualValue.state.itemDefinitionState) {
                    propertyState = includeContextualValue.state.itemDefinitionState.properties
                        .find((p) => p.propertyId === actualId);
                }
            }
            else if (props.policyType && props.policyName) {
                // otherwise if we refer to a policy
                propertyState = itemDefinitionContextualValue.state
                    .policies[props.policyType][props.policyName]
                    .find((p) => p.propertyId === actualId);
            }
            else {
                // otherwise
                propertyState =
                    itemDefinitionContextualValue.state.properties.find((p) => p.propertyId === actualId);
            }
        }
        // now we need to get the container id, the container id refers to where the data was stored
        // in the server side information container, we might have one already
        const containerId = (itemDefinitionContextualValue.state.gqlOriginalFlattenedValue &&
            itemDefinitionContextualValue.state.gqlOriginalFlattenedValue.container_id) || null;
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
                    // and as such we absolute the files so that their urls
                    // are indeed proper, being a read operation, there's no risk on it
                    if (!propertyDescription.gqlList) {
                        return props.children(util_1.fileURLAbsoluter(config.containersHostnamePrefixes, props.useAppliedValue ? propertyState.stateAppliedValue : propertyState.value, itemDefinitionContextualValue.idef, itemDefinitionContextualValue.forId, itemDefinitionContextualValue.forVersion, containerId, includeContextualValue && includeContextualValue.include, property), propertyState);
                    }
                    else {
                        return props.children(util_1.fileArrayURLAbsoluter(config.containersHostnamePrefixes, props.useAppliedValue ? propertyState.stateAppliedValue : propertyState.value, itemDefinitionContextualValue.idef, itemDefinitionContextualValue.forId, itemDefinitionContextualValue.forVersion, containerId, includeContextualValue && includeContextualValue.include, property), propertyState);
                    }
                }
                // otherwise we just call the function as it is
                return props.children(propertyState.value, propertyState);
            }
            // if we are talking a meta property
            if (isMetaProperty) {
                // the grapqhl value we get
                let gqlValue = itemDefinitionContextualValue.state.gqlOriginalFlattenedValue &&
                    itemDefinitionContextualValue.state.gqlOriginalFlattenedValue[actualId];
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
                return (react_1.default.createElement(PropertyView_1.default, { include: includeContextualValue && includeContextualValue.include, property: property, state: propertyState, capitalize: props.capitalize, renderer: props.renderer, containerId: containerId, rendererArgs: props.rendererArgs, forId: itemDefinitionContextualValue.forId, forVersion: itemDefinitionContextualValue.forVersion, itemDefinition: itemDefinitionContextualValue.idef, useAppliedValue: props.useAppliedValue }));
            }
            // if we have a meta property nevertheless
            if (isMetaProperty) {
                // we need to read its value
                let gqlValue = itemDefinitionContextualValue.state.gqlOriginalFlattenedValue &&
                    itemDefinitionContextualValue.state.gqlOriginalFlattenedValue[actualId];
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
                if (props.onChange) {
                    props.onChange(newValue);
                }
                itemDefinitionContextualValue.onPropertyChange(property, newValue, internalValue);
            };
            // and the on restore function
            const onRestore = () => {
                itemDefinitionContextualValue.onPropertyRestore(property);
            };
            // and now for whether it's poked, by default it's false
            let isPoked = false;
            // now we search for it, so for a policy we search in the pokedElements
            // to see if it's there
            if (props.policyType) {
                isPoked = !!itemDefinitionContextualValue.pokedElements.policies.find(pElement => pElement[0] === props.policyType &&
                    pElement[1] === props.policyName &&
                    pElement[2] === property.getId());
            }
            else if (includeContextualValue) {
                // for the includes we do something similar as well
                isPoked = !!itemDefinitionContextualValue.pokedElements.includes.find((iId) => {
                    return iId === includeContextualValue.include.getId();
                });
            }
            else {
                // and for a specific property
                isPoked = !!itemDefinitionContextualValue.pokedElements.properties.find((pId) => {
                    return pId === property.getId();
                });
            }
            // and then we can return the property entry in all its glory
            return (react_1.default.createElement(PropertyEntry_1.default, { itemDefinition: itemDefinitionContextualValue.idef, injectSubmitBlockPromise: itemDefinitionContextualValue.injectSubmitBlockPromise, include: (includeContextualValue && includeContextualValue.include) || null, property: property, state: propertyState, onChange: onChange, onRestore: onRestore, forceInvalid: props.showAsInvalid, containerId: containerId, icon: props.icon, forId: itemDefinitionContextualValue.forId, forVersion: itemDefinitionContextualValue.forVersion, poked: isPoked, renderer: props.renderer, rendererArgs: props.rendererArgs, hideDescription: props.hideDescription, altDescription: props.altDescription, altLabel: props.altLabel, altPlaceholder: props.altPlaceholder, ignoreErrors: props.ignoreErrors, autoFocus: props.autoFocus, prefillWith: props.prefillWith }));
        }
        else {
            // property has no state it must be hidden
            if (!propertyState) {
                return null;
            }
            // so we return the propery setter
            return (react_1.default.createElement(PropertySetter_1.default, { property: property, onEnforce: itemDefinitionContextualValue.onPropertyEnforce.bind(null, property), onClearEnforcement: itemDefinitionContextualValue.onPropertyClearEnforce.bind(null, property), forId: itemDefinitionContextualValue.forId, forVersion: itemDefinitionContextualValue.forVersion, value: props.value }));
        }
    }))))));
}
exports.EntryViewReadSet = EntryViewReadSet;
