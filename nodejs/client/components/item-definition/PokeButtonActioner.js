"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PokeActioner_1 = __importDefault(require("./PokeActioner"));
const react_1 = __importDefault(require("react"));
const deep_equal_1 = __importDefault(require("deep-equal"));
function PokeButtonActioner(props) {
    return (react_1.default.createElement(PokeActioner_1.default, { elementsToPoke: props.elementsToPoke }, (arg) => {
        const isInvalid = arg.hasInvalidToPokeInclude || arg.hasInvalidToPokePolicy || arg.hasInvalidToPokeProperty;
        const onAction = () => {
            if (isInvalid && !deep_equal_1.default(props.elementsToPoke, arg.pokedElements)) {
                arg.poke(props.elementsToPoke);
                props.onPoke && props.onPoke();
                props.onFail && props.onFail();
                return;
            }
            else if (isInvalid) {
                props.onFail && props.onFail();
                return;
            }
            if (props.unpokeOnSuccess) {
                arg.clean({
                    unpokeAfterAny: true,
                }, "success");
            }
            props.onSuccess();
        };
        return props.children({ onAction });
    }));
}
exports.default = PokeButtonActioner;
