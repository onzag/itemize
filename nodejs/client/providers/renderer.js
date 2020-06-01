"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
exports.RendererContext = react_1.default.createContext(null);
function RendererProvider(props) {
    return react_1.default.createElement(exports.RendererContext.Consumer, null, (value) => {
        const newProviderValue = { ...value };
        Object.keys(props).forEach((key) => {
            if (key === "children") {
                return;
            }
            newProviderValue[key] = props[key];
        });
        return react_1.default.createElement(exports.RendererContext.Provider, { value: newProviderValue }, props.children);
    });
}
exports.default = RendererProvider;
