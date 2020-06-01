"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
exports.ConfigContext = react_1.default.createContext(null);
function ConfigProvider(props) {
    return react_1.default.createElement(exports.ConfigContext.Provider, { value: props.value }, props.children);
}
exports.ConfigProvider = ConfigProvider;
