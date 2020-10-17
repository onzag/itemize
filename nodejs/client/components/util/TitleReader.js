"use strict";
/**
 * Nice utility function that allows to read the title of the application
 * that is currently being used in the document title itself
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActualTitleReader = void 0;
const react_1 = __importDefault(require("react"));
const TitleSetter_1 = require("./TitleSetter");
const ssr_provider_1 = require("../../internal/providers/ssr-provider");
class ActualTitleReader extends react_1.default.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        // we add these global listener to it that do a force update
        TitleSetter_1.ActualTitleSetter.changedListeners.set(this, this.forceUpdate.bind(this));
    }
    componentWillUnmount() {
        // then we delete this
        TitleSetter_1.ActualTitleSetter.changedListeners.delete(this);
    }
    render() {
        // for ssr reasons we need to do this
        if (typeof document === "undefined") {
            // the server would hit here and not have any issues
            // in SSR mode, in the server side there should always
            // be a ssr title set
            return this.props.ssrTitle;
        }
        // gives priority to the document title on the force update
        return document.title;
    }
}
exports.ActualTitleReader = ActualTitleReader;
/**
 * Will read the title from the document itself and keep itself
 * by listening to changes on this title (when they are set by the setter)
 * mantains sync with the title property
 */
function TitleReader() {
    return (react_1.default.createElement(ssr_provider_1.SSRContext.Consumer, null, (value) => (react_1.default.createElement(ActualTitleReader, { ssrTitle: value && value.title }))));
}
exports.default = TitleReader;
