"use strict";
/**
 * Constains the menu that is opened by the burguer icon in the navbar
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
const react_1 = __importDefault(require("react"));
const Link_1 = __importDefault(require("../../../components/navigation/Link"));
const mui_core_1 = require("../../mui-core");
const module_1 = require("../../../providers/module");
const AppLanguageRetriever_1 = __importDefault(require("../../../components/localization/AppLanguageRetriever"));
const UserDataRetriever_1 = __importDefault(require("../../../components/user/UserDataRetriever"));
const I18nRead_1 = __importDefault(require("../../../components/localization/I18nRead"));
const LocationReader_1 = __importDefault(require("../../../components/navigation/LocationReader"));
const item_1 = require("../../../providers/item");
/**
 * The menu styles
 */
const menuStyles = mui_core_1.createStyles({
    list: {
        width: "250px",
    },
    listLink: {
        textDecoration: "none",
        color: "inherit",
    },
});
/**
 * Given entries, will build an entry list so that it is displayed in the menu
 * list
 * @param entries the entries to use
 * @param className the class name that will pop in the link container
 * @param role the role that the current user is logged as
 */
function buildEntryFromList(entries, className, role) {
    // so we start looping
    return entries.map((entry) => {
        // first we check if the role is there and if it doesn't match
        // do the same with the many roles
        if (entry.role && role !== entry.role) {
            return null;
        }
        else if (entry.roles && !entry.roles.includes(role)) {
            return null;
        }
        // now we need to see how we are going to approach this, this
        // will be the display text
        let i18nNodeInfo = null;
        // with both idef and module specified
        if (entry.idef && entry.module) {
            // it's done like this, with a no state as we don't need the state
            i18nNodeInfo =
                (react_1.default.createElement(module_1.ModuleProvider, { module: entry.module },
                    react_1.default.createElement(item_1.NoStateItemDefinitionProvider, { itemDefinition: entry.idef },
                        react_1.default.createElement(I18nRead_1.default, Object.assign({}, entry.i18nProps)))));
            // with only the module itself
        }
        else if (entry.module) {
            // we use only the module context
            i18nNodeInfo =
                (react_1.default.createElement(module_1.ModuleProvider, { module: entry.module },
                    react_1.default.createElement(I18nRead_1.default, Object.assign({}, entry.i18nProps))));
        }
        else {
            // otherwise it's just plain like this
            i18nNodeInfo = react_1.default.createElement(I18nRead_1.default, Object.assign({}, entry.i18nProps));
        }
        // now we can return this
        return (react_1.default.createElement(Link_1.default, { to: entry.path, className: className, propagateClicks: true, key: entry.path },
            react_1.default.createElement(LocationReader_1.default, null, (arg) => (react_1.default.createElement(mui_core_1.ListItem, { button: true, selected: arg.pathname === entry.path },
                react_1.default.createElement(mui_core_1.ListItemIcon, null, entry.icon),
                react_1.default.createElement(mui_core_1.ListItemText, null, i18nNodeInfo))))));
    });
}
/**
 * Provides a menu for the navbar
 * @param props the menu props
 * @returns a react element
 */
exports.Menu = mui_core_1.withStyles(menuStyles)((props) => {
    // so we render in here, first we need our language retriever to do the rtl thing
    return (react_1.default.createElement(AppLanguageRetriever_1.default, null, (retriever) => (react_1.default.createElement(mui_core_1.SwipeableDrawer, { anchor: retriever.rtl ? "right" : "left", open: props.isOpen, onClose: props.onClose, onOpen: props.onOpen, disableDiscovery: true },
        react_1.default.createElement("div", { className: props.classes.list, role: "presentation", onClick: props.onClose, onKeyDown: props.onClose },
            react_1.default.createElement(UserDataRetriever_1.default, null, (userData) => (react_1.default.createElement(react_1.default.Fragment, null,
                props.adminEntries.length ?
                    react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement(mui_core_1.List, null, buildEntryFromList(props.adminEntries, props.classes.listLink, userData.role)),
                        react_1.default.createElement(mui_core_1.Divider, null)) :
                    null,
                react_1.default.createElement(mui_core_1.List, null, buildEntryFromList(props.entries, props.classes.listLink, userData.role))))))))));
});
