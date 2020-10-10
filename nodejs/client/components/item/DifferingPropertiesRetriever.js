"use strict";
/**
 * Contains the differing properties retriever class
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const deep_equal_1 = __importDefault(require("deep-equal"));
const item_1 = require("../../providers/item");
/**
 * Basically only allows a rerender of the children if the different properties do in fact differ
 */
class OptimizerDifferingPropertiesRetriever extends react_1.default.Component {
    shouldComponentUpdate(nextProps) {
        // basically we only update when the final properties or the children function differ
        return nextProps.children !== this.props.children ||
            !deep_equal_1.default(nextProps.finalProperties, this.props.finalProperties);
    }
    render() {
        return this.props.children(this.props.finalProperties);
    }
}
/**
 * The differing properties retriever element which provides the properties
 * ids that differ from their applied value
 * @param props the react props
 * @returns a react node
 */
function DifferingPropertiesRetriever(props) {
    // first we need the item definition context
    return (react_1.default.createElement(item_1.ItemContext.Consumer, null, (itemContext) => {
        const finalProperties = props.mainProperties.filter((mainProperty) => {
            const propertyData = itemContext.state.properties.find(p => p.propertyId === mainProperty);
            if (!propertyData) {
                return false;
            }
            const property = itemContext.idef.getPropertyDefinitionFor(mainProperty, true);
            return !itemContext.idef.getPropertyDefinitionFor(mainProperty, true).getPropertyDefinitionDescription().localEqual({
                itemDefinition: itemContext.idef,
                include: null,
                property,
                id: property.getId(),
                prefix: "",
                a: propertyData.stateAppliedValue,
                b: propertyData.value,
            });
        });
        return (react_1.default.createElement(OptimizerDifferingPropertiesRetriever, { finalProperties: finalProperties, children: props.children }));
    }));
}
exports.default = DifferingPropertiesRetriever;
