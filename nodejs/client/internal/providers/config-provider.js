"use strict";
/**
 * Provides the configuration files down the line
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigProvider = exports.ConfigContext = void 0;
const react_1 = __importDefault(require("react"));
/**
 * The context that provides the configuration
 */
exports.ConfigContext = react_1.default.createContext(null);
/**
 * The config provider allows to create a config context
 * should be placed even on top of the app itself
 * as the config is static
 * @param props the config props
 */
function ConfigProvider(props) {
    return react_1.default.createElement(exports.ConfigContext.Provider, { value: props.value }, props.children);
}
exports.ConfigProvider = ConfigProvider;
