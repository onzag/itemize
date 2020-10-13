"use strict";
/**
 * Specifies how renderers are to be provided down the app in order
 * to render the app
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
/**
 * This is the renderer context that contains the renderer context
 * value, by default is null, it must be provided or itemize
 * will crash any time when rendering
 */
exports.RendererContext = react_1.default.createContext(null);
/**
 * Allows to create a rendering context for usage with the view, there's a renderer
 * provider at the root of the itemize app and that's the preferred way to pass a renderer
 * however it is totally possible to define a different renderer context under the app
 * even when it's recommended to rather use the renderer property from the Entry, and View
 *
 * @param props the provider props
 * @returns a react element
 */
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
