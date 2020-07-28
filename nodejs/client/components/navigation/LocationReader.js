"use strict";
/**
 * Allows to read the current location so that conditional rendering can be performed
 * performs a job remarkably similar to the <Route> component and Route should be
 * preferred over this file unless you need to access either the pathname or absolute pathname
 * as strings
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
/**
 * the component is pure to deny useless updates that way pathname is checked as location
 * might change without changing the pathname
 */
class ActualLocationReader extends react_1.default.PureComponent {
    render() {
        // so we split the pathname
        const pathnameWithoutLang = this.props.pathname.split("/");
        // and shift it to remove the starting "" empty string
        pathnameWithoutLang.shift();
        // and now we can get the language
        const lang = pathnameWithoutLang.shift() || null;
        // and now this is the final pathname without lang
        const pathNameWithoutLangFinal = "/" + pathnameWithoutLang.join("/");
        // and as such we call the children with the arg data
        return this.props.children({
            pathname: pathNameWithoutLangFinal,
            absPathname: this.props.pathname,
            urlLang: lang,
        });
    }
}
/**
 * The secondary class
 * @param props the props
 * @returns a react component
 */
function SecondaryLocationReader(props) {
    return (react_1.default.createElement(ActualLocationReader, Object.assign({ pathname: props.location.pathname }, props)));
}
// buggy typescript forces me to do it this way
exports.default = react_router_dom_1.withRouter(SecondaryLocationReader);
