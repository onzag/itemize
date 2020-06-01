"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const item_definition_1 = require("../../providers/item-definition");
function DifferingPropertiesRetriever(props) {
    return (react_1.default.createElement(item_definition_1.ItemDefinitionContext.Consumer, null, (itemDefinitionContext) => {
        const finalProperties = props.mainProperties.filter((mainProperty) => {
            const propertyData = itemDefinitionContext.state.properties.find(p => p.propertyId === mainProperty);
            if (!propertyData) {
                return false;
            }
            return !itemDefinitionContext.idef.getPropertyDefinitionFor(mainProperty, true).getPropertyDefinitionDescription().localEqual(propertyData.stateAppliedValue, propertyData.value);
        });
        return props.children(finalProperties);
    }));
}
exports.default = DifferingPropertiesRetriever;
