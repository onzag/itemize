"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const token_provider_1 = require("../../internal/providers/token-provider");
function UserDataRetriever(props) {
    return (react_1.default.createElement(token_provider_1.TokenContext.Consumer, null, (value) => {
        return props.children({
            id: value.id,
            role: value.role,
        });
    }));
}
exports.default = UserDataRetriever;
