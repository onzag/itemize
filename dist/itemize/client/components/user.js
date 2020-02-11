"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const internal_providers_1 = require("../internal/app/internal-providers");
function UserIdRetriever(props) {
    return (<internal_providers_1.TokenContext.Consumer>
      {(value) => {
        return props.children(value.id);
    }}
    </internal_providers_1.TokenContext.Consumer>);
}
exports.UserIdRetriever = UserIdRetriever;
