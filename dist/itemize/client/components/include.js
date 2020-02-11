"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const item_definition_1 = require("../providers/item-definition");
const IncludeExclusionSwitch_1 = __importDefault(require("./base/IncludeExclusionSwitch"));
const IncludeCalloutWarning_1 = __importDefault(require("./base/IncludeCalloutWarning"));
const include_1 = require("../providers/include");
function ExclusionSwitch(props) {
    return (<item_definition_1.ItemDefinitionContext.Consumer>
      {(itemDefinitionContextualValue) => (<include_1.IncludeContext.Consumer>
            {(includeContextualValue) => {
        if (!includeContextualValue) {
            throw new Error("The ExclusionSwitch must be in an Include context");
        }
        const onChange = (newExclusionState) => {
            if (props.onChange) {
                props.onChange(includeContextualValue.include, newExclusionState);
            }
            itemDefinitionContextualValue.onIncludeSetExclusionState(includeContextualValue.include, newExclusionState);
        };
        return (<IncludeExclusionSwitch_1.default include={includeContextualValue.include} state={includeContextualValue.state} onChange={onChange} forId={itemDefinitionContextualValue.forId} forVersion={itemDefinitionContextualValue.forVersion}/>);
    }}
          </include_1.IncludeContext.Consumer>)}
    </item_definition_1.ItemDefinitionContext.Consumer>);
}
exports.ExclusionSwitch = ExclusionSwitch;
function CalloutWarning() {
    return (<include_1.IncludeContext.Consumer>
      {(includeContextualValue) => {
        if (!includeContextualValue) {
            throw new Error("The CalloutWarning must be in an Include context");
        }
        return (<IncludeCalloutWarning_1.default include={includeContextualValue.include} state={includeContextualValue.state}/>);
    }}
    </include_1.IncludeContext.Consumer>);
}
exports.CalloutWarning = CalloutWarning;
