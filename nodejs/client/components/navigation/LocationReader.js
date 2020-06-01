"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const location_context_1 = require("../../internal/providers/location-context");
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
function LocationReader(props) {
    return (react_1.default.createElement(location_context_1.LocationStateContext.Consumer, null, (location) => {
        return react_1.default.createElement(ActualLocationReader, Object.assign({ pathname: location.pathname }, props));
    }));
}
exports.default = LocationReader;
