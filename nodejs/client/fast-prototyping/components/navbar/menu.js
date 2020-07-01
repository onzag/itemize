"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Link_1 = __importDefault(require("../../../components/navigation/Link"));
const mui_core_1 = require("../../mui-core");
const module_1 = require("../../../providers/module");
const AppLanguageRetriever_1 = __importDefault(require("../../../components/localization/AppLanguageRetriever"));
const UserDataRetriever_1 = __importDefault(require("../../../components/user/UserDataRetriever"));
const I18nRead_1 = __importDefault(require("../../../components/localization/I18nRead"));
const LocationReader_1 = __importDefault(require("../../../components/navigation/LocationReader"));
const item_definition_1 = require("../../../providers/item-definition");
const menuStyles = mui_core_1.createStyles({
    list: {
        width: "250px",
    },
    listLink: {
        textDecoration: "none",
        color: "inherit",
    },
});
function buildEntryFromList(entries, className) {
    return entries.map((entry) => {
        let i18nNodeInfo = null;
        if (entry.idef && entry.module) {
            i18nNodeInfo =
                (react_1.default.createElement(module_1.ModuleProvider, { module: entry.module },
                    react_1.default.createElement(item_definition_1.NoStateItemDefinitionProvider, { itemDefinition: entry.idef },
                        react_1.default.createElement(I18nRead_1.default, Object.assign({}, entry.i18nProps)))));
        }
        else if (entry.module) {
            i18nNodeInfo =
                (react_1.default.createElement(module_1.ModuleProvider, { module: entry.module },
                    react_1.default.createElement(I18nRead_1.default, Object.assign({}, entry.i18nProps))));
        }
        else {
            i18nNodeInfo = react_1.default.createElement(I18nRead_1.default, Object.assign({}, entry.i18nProps));
        }
        return (react_1.default.createElement(Link_1.default, { to: entry.path, className: className, propagateClicks: true, key: entry.path },
            react_1.default.createElement(LocationReader_1.default, null, (arg) => (react_1.default.createElement(mui_core_1.ListItem, { button: true, selected: arg.pathname === entry.path },
                react_1.default.createElement(mui_core_1.ListItemIcon, null, entry.icon),
                react_1.default.createElement(mui_core_1.ListItemText, null, i18nNodeInfo))))));
    });
}
exports.Menu = mui_core_1.withStyles(menuStyles)((props) => {
    return (react_1.default.createElement(AppLanguageRetriever_1.default, null, (retriever) => (react_1.default.createElement(mui_core_1.SwipeableDrawer, { anchor: retriever.rtl ? "right" : "left", open: props.isOpen, onClose: props.onClose, onOpen: props.onOpen, disableDiscovery: true },
        react_1.default.createElement("div", { className: props.classes.list, role: "presentation", onClick: props.onClose, onKeyDown: props.onClose },
            props.adminEntries.length ? (react_1.default.createElement(UserDataRetriever_1.default, null, (userData) => {
                if (userData.role === "ADMIN") {
                    return (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement(mui_core_1.List, null, buildEntryFromList(props.adminEntries, props.classes.listLink)),
                        react_1.default.createElement(mui_core_1.Divider, null)));
                }
            })) : null,
            react_1.default.createElement(mui_core_1.List, null, buildEntryFromList(props.entries, props.classes.listLink)))))));
});
