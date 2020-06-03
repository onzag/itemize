"use strict";
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
const core_1 = require("@material-ui/core");
const navigation_1 = require("../../../components/navigation");
const item_definition_1 = require("../../../providers/item-definition");
function handleNavbarChangeEvent(e, value) {
    if (value === "info") {
        navigation_1.localizedRedirectTo("/cms");
        return;
    }
    navigation_1.localizedRedirectTo("/cms/" + value);
}
function CMSNavBar(props) {
    const current = props.location.pathname.split("/")[3] || "info";
    return (react_1.default.createElement(core_1.AppBar, { position: "static", variant: "outlined", color: "default" },
        react_1.default.createElement(core_1.Tabs, { value: current, onChange: handleNavbarChangeEvent, centered: true },
            react_1.default.createElement(core_1.Tab, { label: react_1.default.createElement(I18nRead_1.default, { id: "info" }), value: "info" }),
            ["fragment", "article"].map((itemDefinition) => {
                return (react_1.default.createElement(core_1.Tab, { key: itemDefinition, label: react_1.default.createElement(item_definition_1.NoStateItemDefinitionProvider, { itemDefinition: itemDefinition },
                        react_1.default.createElement(I18nRead_1.default, { id: "name" })), value: itemDefinition }));
            }))));
}
function CMS() {
    return (react_1.default.createElement(module_1.ModuleProvider, { module: "cms" },
        react_1.default.createElement(I18nRead_1.default, { id: "name", capitalize: true }, (i18nCMS) => {
            return (react_1.default.createElement(TitleSetter_1.default, null, i18nCMS));
        }),
        react_1.default.createElement(Route_1.default, { path: "/cms", component: CMSNavBar }),
        react_1.default.createElement(Route_1.default, { path: "/cms", exact: true, component: info_1.Info }),
        react_1.default.createElement(Route_1.default, { path: "/cms/fragment", component: fragment_1.Fragment }),
        react_1.default.createElement(Route_1.default, { path: "/cms/article", component: article_1.Article })));
}
exports.CMS = CMS;
;
