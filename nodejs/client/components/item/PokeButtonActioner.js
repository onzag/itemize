"use strict";
/**
 * Contains logic for the implementation of a button that pokes elements once pressed, it's built
 * on top of the poke actioner
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PokeActioner_1 = __importDefault(require("./PokeActioner"));
const react_1 = __importDefault(require("react"));
const deep_equal_1 = __importDefault(require("deep-equal"));
/**
 * The poke button actioner allows to create a button that contains poke logic
 * this is very useful for creating some form of wizard or dialog that needs
 * valid data filled
 *
 * @param props the props
 * @returns a react node
 */
function PokeButtonActioner(props) {
    // for that we need the poke actioner
    return (react_1.default.createElement(PokeActioner_1.default, { elementsToPoke: props.elementsToPoke }, (arg) => {
        // now we need to check if anything is invalid
        const isInvalid = arg.hasInvalidToPokeInclude || arg.hasInvalidToPokePolicy || arg.hasInvalidToPokeProperty;
        // and with that we update the action
        const onAction = () => {
            // so as you can see if it's invalid and our poked elements are
            // not what we are expected to poke, as in, it might be unpoked
            // and our poke actioner hasn't kicked in
            if (isInvalid && !deep_equal_1.default(props.elementsToPoke, arg.pokedElements)) {
                // we run the poke function
                arg.poke(props.elementsToPoke);
                // call on poke
                props.onPoke && props.onPoke();
                // call on fail as it's indeed invalid
                props.onFail && props.onFail();
                return;
            }
            else if (isInvalid) {
                // otherwise if it's just invalid and we already are poked
                // we just call on fail
                props.onFail && props.onFail();
                return;
            }
            // this line is now for success only
            // if we are suppossed to unpoke after success, we do it
            if (props.unpokeOnSuccess) {
                arg.clean({
                    unpokeAfterAny: true,
                }, "success");
            }
            // call the on success function
            props.onSuccess();
        };
        // return the actioner
        return props.children({ onAction });
    }));
}
exports.default = PokeButtonActioner;
