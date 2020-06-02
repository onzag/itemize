"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TitleSetter_1 = __importDefault(require("./TitleSetter"));
const ssr_provider_1 = require("../../internal/providers/ssr-provider");
class ActualTitleReader extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.hasRenderedInitial = false;
    }
    componentDidMount() {
        TitleSetter_1.default.changedListeners.set(this, this.forceUpdate.bind(this));
    }
    componentWillUnmount() {
        TitleSetter_1.default.changedListeners.delete(this);
    }
    render() {
        if (!this.hasRenderedInitial && this.props.ssrTitle) {
            return this.props.ssrTitle;
        }
        this.hasRenderedInitial = true;
        return document.title;
    }
}
exports.ActualTitleReader = ActualTitleReader;
function TitleReader() {
    return (react_1.default.createElement(ssr_provider_1.SSRContext.Consumer, null, (value) => (react_1.default.createElement(ActualTitleReader, { ssrTitle: value && value.title }))));
}
exports.default = TitleReader;
