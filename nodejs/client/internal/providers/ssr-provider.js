"use strict";
/**
 * The ssr provider file
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
/**
 * The ssr context passes the context value all the way to all the components
 */
exports.SSRContext = react_1.default.createContext(null);
/**
 * The SSR provider is a static provider that generates a context that is used
 * primarily for the initial render to access information, mainly about the user
 * for the setup of the token provider, the title and resources, since currency
 * factors become the initial currency factors and the queries become applied
 * values during initialization
 *
 * This should sit on top of the itemize app
 *
 * @param props the provider props
 */
function SSRProvider(props) {
    return react_1.default.createElement(exports.SSRContext.Provider, { value: props.value }, props.children);
}
exports.SSRProvider = SSRProvider;
