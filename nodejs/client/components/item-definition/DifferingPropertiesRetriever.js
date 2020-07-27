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
const item_definition_1 = require("../../providers/item-definition");
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
    return (react_1.default.createElement(item_definition_1.ItemDefinitionContext.Consumer, null, (itemDefinitionContext) => {
        const finalProperties = props.mainProperties.filter((mainProperty) => {
            const propertyData = itemDefinitionContext.state.properties.find(p => p.propertyId === mainProperty);
            if (!propertyData) {
                return false;
            }
            const property = itemDefinitionContext.idef.getPropertyDefinitionFor(mainProperty, true);
            return !itemDefinitionContext.idef.getPropertyDefinitionFor(mainProperty, true).getPropertyDefinitionDescription().localEqual({
                itemDefinition: itemDefinitionContext.idef,
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
