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
const item_definition_1 = require("../providers/item-definition");
const search_interfaces_1 = require("../../base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces");
const constants_1 = require("../../constants");
const PropertyView_1 = __importStar(require("./base/PropertyView"));
const PropertyEntry_1 = __importDefault(require("./base/PropertyEntry"));
const PropertySetter_1 = __importDefault(require("./base/PropertySetter"));
const include_1 = require("../providers/include");
// TODO optimize
function EntryViewReadSet(props, type) {
    return (<item_definition_1.ItemDefinitionContext.Consumer>
      {(itemDefinitionContextualValue) => (<include_1.IncludeContext.Consumer>
            {(includeContextualValue) => {
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
        if (type === "read") {
            if (propertyState) {
                return props.children(propertyState.value);
            }
            if (isMetaProperty) {
                let gqlValue = itemDefinitionContextualValue.state.gqlOriginalFlattenedValue &&
                    itemDefinitionContextualValue.state.gqlOriginalFlattenedValue[actualId];
                if (typeof gqlValue === "undefined") {
                    gqlValue = null;
                }
                return props.children(gqlValue);
            }
            // Property has no state, and no internal value, it must be somehow hidden
            return null;
        }
        else if (type === "view") {
            if (propertyState) {
                return (<PropertyView_1.default property={property} state={propertyState}/>);
            }
            if (isMetaProperty) {
                let gqlValue = itemDefinitionContextualValue.state.gqlOriginalFlattenedValue &&
                    itemDefinitionContextualValue.state.gqlOriginalFlattenedValue[actualId];
                if (typeof gqlValue === "undefined") {
                    gqlValue = null;
                }
                if (typeof gqlValue === "number") {
                    return <PropertyView_1.RawBasePropertyView value={gqlValue.toString()}/>;
                }
                else {
                    return <PropertyView_1.RawBasePropertyView value={gqlValue}/>;
                }
            }
            return null;
        }
        else if (type === "entry") {
            // property has no state it must be hidden
            if (!propertyState) {
                return null;
            }
            const onChange = (newValue, internalValue) => {
                if (props.onChange) {
                    props.onChange(property, newValue, internalValue);
                }
                itemDefinitionContextualValue.onPropertyChange(property, newValue, internalValue);
            };
            let isPoked = false;
            if (props.policyType) {
                isPoked = itemDefinitionContextualValue.pokePoliciesType === props.policyType;
            }
            else {
                isPoked = !!itemDefinitionContextualValue.pokedElements.find((p) => {
                    if (includeContextualValue) {
                        return p.includeId === includeContextualValue.include.getId() &&
                            p.propertyId === property.getId();
                    }
                    return p.propertyId === property.getId();
                });
            }
            return (<PropertyEntry_1.default property={property} state={propertyState} onChange={onChange} forceInvalid={props.showAsInvalid} icon={props.icon} forId={itemDefinitionContextualValue.forId} forVersion={itemDefinitionContextualValue.forVersion} poked={isPoked}/>);
        }
        else {
            // property has no state it must be hidden
            if (!propertyState) {
                return null;
            }
            return (<PropertySetter_1.default property={property} onEnforce={itemDefinitionContextualValue.onPropertyEnforce.bind(null, property)} onClearEnforcement={itemDefinitionContextualValue.onPropertyClearEnforce.bind(null, property)} forId={itemDefinitionContextualValue.forId} forVersion={itemDefinitionContextualValue.forVersion} value={props.value}/>);
        }
    }}
          </include_1.IncludeContext.Consumer>)}
    </item_definition_1.ItemDefinitionContext.Consumer>);
}
function Entry(props) {
    return EntryViewReadSet(props, "entry");
}
exports.Entry = Entry;
function View(props) {
    return EntryViewReadSet(props, "view");
}
exports.View = View;
function Reader(props) {
    return EntryViewReadSet(props, "read");
}
exports.Reader = Reader;
function Setter(props) {
    return EntryViewReadSet(props, "set");
}
exports.Setter = Setter;
