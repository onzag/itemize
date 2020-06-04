"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
// the component is pure to deny useless updates that way pathname is checked as location
// might change without changing the pathname
class ActualLocationReader extends react_1.default.PureComponent {
    render() {
        const pathnameWithoutLang = this.props.pathname.split("/");
        pathnameWithoutLang.shift();
        const lang = pathnameWithoutLang.shift() || null;
        let pathNameWithoutLangFinal = "/" + (pathnameWithoutLang[0] || "");
        return this.props.children({
            pathname: pathNameWithoutLangFinal,
            absPathname: this.props.pathname,
            urlLang: lang,
        });
    }
}
function SecondaryLocationReader(props) {
    return (react_1.default.createElement(ActualLocationReader, Object.assign({ pathname: props.location.pathname }, props)));
}
// buggy typescript forces me to do it this way
exports.default = react_router_dom_1.withRouter(SecondaryLocationReader);
