"use strict";
/**
 * Contains the poke actioner class that allows to interact with poked elements,
 * poked elements by are meant display errors and their actual status, as
 * "they have been poked by the user" in some way or form
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const item_1 = require("../../providers/item");
const deep_equal_1 = __importDefault(require("deep-equal"));
/**
 * Basically uses a should component update to prevent
 * the function to running with the same argument value
 */
class OptimizerPokeActioner extends react_1.default.Component {
    shouldComponentUpdate(nextProps) {
        return this.props.children !== nextProps.children ||
            this.props.poke !== nextProps.poke ||
            this.props.clean !== nextProps.clean ||
            this.props.unpoke !== nextProps.unpoke ||
            this.props.hasInvalidToPokeInclude !== nextProps.hasInvalidToPokeInclude ||
            this.props.hasInvalidToPokePolicy !== nextProps.hasInvalidToPokePolicy ||
            this.props.hasInvalidToPokeProperty !== nextProps.hasInvalidToPokeProperty ||
            !deep_equal_1.default(this.props.pokedElements, nextProps.pokedElements) ||
            !deep_equal_1.default(this.props.elementsToPoke, nextProps.elementsToPoke);
    }
    render() {
        return this.props.children({
            hasInvalidToPokeProperty: this.props.hasInvalidToPokeProperty,
            hasInvalidToPokeInclude: this.props.hasInvalidToPokeInclude,
            hasInvalidToPokePolicy: this.props.hasInvalidToPokePolicy,
            pokedElements: this.props.pokedElements,
            elementsToPoke: this.props.elementsToPoke,
            unpoke: this.props.unpoke,
            pokeElementsToPoke: this.props.poke.bind(null, this.props.elementsToPoke),
            poke: this.props.poke,
            clean: this.props.clean,
        });
    }
}
/**
 * This class contains the actual logic for the poke actioner
 */
class ActualPokeActioner extends react_1.default.Component {
    shouldComponentUpdate(nextProps) {
        // it only updates when these changes, as all the other information is virtually unecessary
        return nextProps.children !== this.props.children ||
            !deep_equal_1.default(nextProps.itemContext.pokedElements, this.props.itemContext.pokedElements) ||
            !deep_equal_1.default(nextProps.itemContext.state, this.props.itemContext.state);
    }
    render() {
        // first we check all the properties from the elements to poke
        const hasInvalidToPokeProperty = this.props.elementsToPoke.properties.some((pId) => {
            // try to find the state
            const propertyState = this.props.itemContext.state.properties.find(pstate => pstate.propertyId === pId);
            if (!propertyState) {
                return false;
            }
            // and see if we have an invalid reason
            return propertyState.invalidReason;
        });
        // we do the same with includes
        const hasInvalidToPokeInclude = this.props.elementsToPoke.includes.some((iId) => {
            if (!this.props.itemContext.state.includes) {
                return false;
            }
            const includeState = this.props.itemContext.state.includes.find((istate) => istate.includeId === iId);
            if (!includeState) {
                return false;
            }
            return includeState.itemState.properties.some((pstate) => pstate.invalidReason);
        });
        // as well as policies
        const hasInvalidToPokePolicy = this.props.elementsToPoke.policies.some((ppath) => {
            const policyTypeSpace = this.props.itemContext.state.policies[ppath[0]];
            if (!policyTypeSpace) {
                return false;
            }
            const policyState = policyTypeSpace[ppath[1]];
            if (!policyState || !policyState.length) {
                return false;
            }
            return policyState.some((pstate) => pstate.invalidReason);
        });
        // and we return that to the optimizer
        return (react_1.default.createElement(OptimizerPokeActioner, { children: this.props.children, hasInvalidToPokeInclude: hasInvalidToPokeInclude, hasInvalidToPokeProperty: hasInvalidToPokeProperty, hasInvalidToPokePolicy: hasInvalidToPokePolicy, pokedElements: this.props.itemContext.pokedElements, elementsToPoke: this.props.elementsToPoke, unpoke: this.props.itemContext.unpoke, poke: this.props.itemContext.poke, clean: this.props.itemContext.clean }));
    }
}
/**
 * This actioner allows for conditional poking and realizing the state
 * of the elements that are expected to be poked in order to build
 * logic upon them
 *
 * @param props the poke actioner props
 * @returns a react node
 */
function PokeActioner(props) {
    return (react_1.default.createElement(item_1.ItemContext.Consumer, null, (itemContext) => (react_1.default.createElement(ActualPokeActioner, Object.assign({}, props, { itemContext: itemContext })))));
}
exports.default = PokeActioner;
