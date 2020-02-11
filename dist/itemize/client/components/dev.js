"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const item_definition_1 = require("../providers/item-definition");
function StatsForNerds(props) {
    return (<item_definition_1.ItemDefinitionContext.Consumer>
      {(itemDefinitionContextualValue) => {
        const valueToStringify = {
            ...itemDefinitionContextualValue.state,
            properties: itemDefinitionContextualValue.state.properties
                .filter((p) => !props.propertyIds || props.propertyIds.includes(p.propertyId))
                .map((propertyValue) => {
                let propertyValueToStringify = { ...propertyValue };
                // a small hack due to internal values being too long
                if (propertyValueToStringify.internalValue !== null &&
                    typeof propertyValueToStringify.internalValue !== "string") {
                    propertyValueToStringify = { ...propertyValueToStringify, internalValue: "[TOO BIG TO DISPLAY]" };
                }
                return propertyValueToStringify;
            }),
        };
        return <code>{JSON.stringify(valueToStringify, null, 2)}</code>;
    }}
    </item_definition_1.ItemDefinitionContext.Consumer>);
}
exports.StatsForNerds = StatsForNerds;
