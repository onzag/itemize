"use strict";
/**
 * Does the very simple job of retrieving the root
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const appdata_provider_1 = require("../../internal/providers/appdata-provider");
/**
 * Provides the root of the itemize app, for advanced usage
 *
 * @param props the root retriver props
 * @returns a react element
 */
function RootRetriever(props) {
    return (react_1.default.createElement(appdata_provider_1.DataContext.Consumer, null, (value) => {
        return props.children({
            root: value.value,
        });
    }));
}
exports.default = RootRetriever;
