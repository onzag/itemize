"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
function LocationRetriever(props) {
    const location = react_router_dom_1.useLocation();
    return props.children(location);
}
exports.default = LocationRetriever;
