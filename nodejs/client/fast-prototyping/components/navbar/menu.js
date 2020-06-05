"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ImportantDevices_1 = __importDefault(require("@material-ui/icons/ImportantDevices"));
const Link_1 = __importDefault(require("../../../components/navigation/Link"));
const core_1 = require("@material-ui/core");
const module_1 = require("../../../providers/module");
const AppLanguageRetriever_1 = __importDefault(require("../../../components/localization/AppLanguageRetriever"));
const UserDataRetriever_1 = __importDefault(require("../../../components/user/UserDataRetriever"));
const I18nRead_1 = __importDefault(require("../../../components/localization/I18nRead"));
const LocationReader_1 = __importDefault(require("../../../components/navigation/LocationReader"));
const LibraryBooks_1 = __importDefault(require("@material-ui/icons/LibraryBooks"));
const Home_1 = __importDefault(require("@material-ui/icons/Home"));
const item_definition_1 = require("../../../providers/item-definition");
const menuStyles = core_1.createStyles({
    list: {
        width: "250px",
    },
    listLink: {
        textDecoration: "none",
        color: "inherit",
    },
});
exports.Menu = core_1.withStyles(menuStyles)((props) => {
    return (react_1.default.createElement(AppLanguageRetriever_1.default, null, (retriever) => (react_1.default.createElement(core_1.SwipeableDrawer, { anchor: retriever.rtl ? "right" : "left", open: props.isOpen, onClose: props.onClose, onOpen: props.onOpen, disableDiscovery: true },
        react_1.default.createElement("div", { className: props.classes.list, role: "presentation", onClick: props.onClose, onKeyDown: props.onClose },
            react_1.default.createElement(UserDataRetriever_1.default, null, (userData) => {
                if (userData.role === "ADMIN") {
                    return (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement(core_1.List, null,
                            react_1.default.createElement(Link_1.default, { to: "/cms", className: props.classes.listLink, propagateClicks: true },
                                react_1.default.createElement(LocationReader_1.default, null, (arg) => (react_1.default.createElement(core_1.ListItem, { button: true, selected: arg.pathname === "/cms" },
                                    react_1.default.createElement(core_1.ListItemIcon, null,
                                        react_1.default.createElement(ImportantDevices_1.default, null)),
                                    react_1.default.createElement(module_1.ModuleProvider, { module: "cms" },
                                        react_1.default.createElement(core_1.ListItemText, null,
                                            react_1.default.createElement(I18nRead_1.default, { id: "name", capitalize: true })))))))),
                        react_1.default.createElement(core_1.Divider, null)));
                }
            }),
            react_1.default.createElement(core_1.List, null,
                react_1.default.createElement(Link_1.default, { to: "/", className: props.classes.listLink, propagateClicks: true },
                    react_1.default.createElement(LocationReader_1.default, null, (arg) => (react_1.default.createElement(core_1.ListItem, { button: true, selected: arg.pathname === "/" },
                        react_1.default.createElement(core_1.ListItemIcon, null,
                            react_1.default.createElement(Home_1.default, null)),
                        react_1.default.createElement(core_1.ListItemText, null,
                            react_1.default.createElement(I18nRead_1.default, { id: "home", capitalize: true })))))),
                react_1.default.createElement(Link_1.default, { to: "/news", className: props.classes.listLink, propagateClicks: true },
                    react_1.default.createElement(LocationReader_1.default, null, (arg) => (react_1.default.createElement(core_1.ListItem, { button: true, selected: arg.pathname === "/news" },
                        react_1.default.createElement(core_1.ListItemIcon, null,
                            react_1.default.createElement(LibraryBooks_1.default, null)),
                        react_1.default.createElement(core_1.ListItemText, null,
                            react_1.default.createElement(module_1.ModuleProvider, { module: "cms" },
                                react_1.default.createElement(item_definition_1.NoStateItemDefinitionProvider, { itemDefinition: "article" },
                                    react_1.default.createElement(I18nRead_1.default, { id: "news", capitalize: true }))))))))))))));
});
