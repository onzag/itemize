"use strict";
/**
 * The cms page that contains subroutes into it for sections, for fast
 * prototyping, allows to create fragments as well as articles, meant only
 * for admins
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const module_1 = require("../../../providers/module");
const I18nRead_1 = __importDefault(require("../../../components/localization/I18nRead"));
const TitleSetter_1 = __importDefault(require("../../../components/util/TitleSetter"));
const Route_1 = __importDefault(require("../../../components/navigation/Route"));
const fragment_1 = require("./fragment");
const article_1 = require("./article");
const info_1 = require("./info");
const mui_core_1 = require("../../mui-core");
const navigation_1 = require("../../../components/navigation");
const item_definition_1 = require("../../../providers/item-definition");
/**
 * Used in the tabs for change using the tabs
 * @param e the change event (unused)
 * @param value the value it changed to
 */
function handleNavbarChangeEvent(e, value) {
    if (value === "info") {
        navigation_1.localizedRedirectTo("/cms");
        return;
    }
    navigation_1.localizedRedirectTo("/cms/" + value);
}
/**
 * The cms navigation bar component
 * @param props the props passed by the cms component
 * @returns a react element
 */
function CMSNavBar(props) {
    const current = props.location.pathname.split("/")[3] || "info";
    let available = [];
    if (!props.noFragment) {
        available.push("fragment");
    }
    if (!props.noArticle) {
        available.push("article");
    }
    return (react_1.default.createElement(mui_core_1.AppBar, { position: "static", variant: "outlined", color: "default" },
        react_1.default.createElement(mui_core_1.Tabs, { value: current, onChange: handleNavbarChangeEvent, centered: true },
            react_1.default.createElement(mui_core_1.Tab, { label: react_1.default.createElement(I18nRead_1.default, { id: "info" }), value: "info" }),
            available.map((itemDefinition) => {
                return (react_1.default.createElement(mui_core_1.Tab, { key: itemDefinition, label: react_1.default.createElement(item_definition_1.NoStateItemDefinitionProvider, { itemDefinition: itemDefinition },
                        react_1.default.createElement(I18nRead_1.default, { id: "name" })), value: itemDefinition }));
            }))));
}
/**
 * A fast prototyping page which represents the cms for the cms module
 * that allows to modify and create cms elements
 *
 * @param props the props for the cms
 * @returns a react element
 */
function CMS(props) {
    return (react_1.default.createElement(module_1.ModuleProvider, { module: "cms" },
        react_1.default.createElement(I18nRead_1.default, { id: "name", capitalize: true }, (i18nCMS) => {
            return (react_1.default.createElement(TitleSetter_1.default, null, i18nCMS));
        }),
        react_1.default.createElement(Route_1.default, { path: "/cms", component: (routeProps) => {
                return react_1.default.createElement(CMSNavBar, Object.assign({}, props, routeProps));
            } }),
        react_1.default.createElement(Route_1.default, { path: "/cms", exact: true, component: info_1.Info }),
        props.noFragment ? null : react_1.default.createElement(Route_1.default, { path: "/cms/fragment", component: fragment_1.Fragment }),
        props.noArticle ? null : react_1.default.createElement(Route_1.default, { path: "/cms/article", component: article_1.Article })));
}
exports.CMS = CMS;
;
/**
 * Allows to set the props of the cms to use within a route so that props
 * can be injected
 * @param props the props to inject
 * @returns a react component that is not instantiated
 */
function cmsWithProps(props) {
    return () => {
        react_1.default.createElement(CMS, Object.assign({}, props));
    };
}
exports.cmsWithProps = cmsWithProps;
