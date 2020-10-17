"use strict";
/**
 * The description setter allows to set the description of the application
 * this setter only has effect server side
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const RootRetriever_1 = __importDefault(require("../root/RootRetriever"));
/**
 * This setter only has an effect server side and client side it effectively returns null
 * and does nothing, this setter is useful for SSR
 */
class DescriptionSetter extends react_1.default.Component {
    render() {
        if (typeof document === "undefined") {
            return (react_1.default.createElement(RootRetriever_1.default, null, (arg) => {
                if (this.props.type === "og" || !this.props.type || this.props.type === "both") {
                    arg.root.setStateKey("ogDescription", this.props.children);
                }
                if (this.props.type === "meta" || !this.props.type || this.props.type === "both") {
                    arg.root.setStateKey("description", this.props.children);
                }
                return null;
            }));
        }
        else {
            return null;
        }
    }
}
exports.default = DescriptionSetter;
