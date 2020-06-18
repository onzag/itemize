"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const item_definition_1 = require("../../providers/item-definition");
const deep_equal_1 = __importDefault(require("deep-equal"));
class ActualPokeActioner extends react_1.default.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.children !== this.props.children ||
            !deep_equal_1.default(nextProps.itemDefinitionContext.pokedElements, this.props.itemDefinitionContext.pokedElements) ||
            !deep_equal_1.default(nextProps.itemDefinitionContext.state, this.props.itemDefinitionContext.state);
    }
    render() {
        const hasInvalidToPokeProperty = this.props.elementsToPoke.properties.some((pId) => {
            const propertyState = this.props.itemDefinitionContext.state.properties.find(pstate => pstate.propertyId === pId);
            if (!propertyState) {
                return false;
            }
            return propertyState.invalidReason;
        });
        const hasInvalidToPokeInclude = this.props.elementsToPoke.includes.some((iId) => {
            if (!this.props.itemDefinitionContext.state.includes) {
                return false;
            }
            const includeState = this.props.itemDefinitionContext.state.includes.find((istate) => istate.includeId === iId);
            if (!includeState) {
                return false;
            }
            return includeState.itemDefinitionState.properties.some((pstate) => pstate.invalidReason);
        });
        const hasInvalidToPokePolicy = this.props.elementsToPoke.policies.some((ppath) => {
            const policyTypeSpace = this.props.itemDefinitionContext.state.policies[ppath[0]];
            if (!policyTypeSpace) {
                return false;
            }
            const policyState = policyTypeSpace[ppath[1]];
            if (!policyState || !policyState.length) {
                return false;
            }
            return policyState.some((pstate) => pstate.invalidReason);
        });
        return this.props.children({
            hasInvalidToPokeProperty,
            hasInvalidToPokeInclude,
            hasInvalidToPokePolicy,
            pokedElements: this.props.itemDefinitionContext.pokedElements,
            elementsToPoke: this.props.elementsToPoke,
            unpoke: this.props.itemDefinitionContext.unpoke,
            pokeElementsToPoke: this.props.itemDefinitionContext.poke.bind(null, this.props.elementsToPoke),
            poke: this.props.itemDefinitionContext.poke,
            clean: this.props.itemDefinitionContext.clean,
        });
    }
}
function PokeActioner(props) {
    return (react_1.default.createElement(item_definition_1.ItemDefinitionContext.Consumer, null, (itemDefinitionContext) => (react_1.default.createElement(ActualPokeActioner, Object.assign({}, props, { itemDefinitionContext: itemDefinitionContext })))));
}
exports.default = PokeActioner;
