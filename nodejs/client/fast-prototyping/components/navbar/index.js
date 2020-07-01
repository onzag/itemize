"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const mui_core_1 = require("../../mui-core");
const module_1 = require("../../../providers/module");
const item_definition_1 = require("../../../providers/item-definition");
const outdated_text_1 = require("./outdated-text");
const buttons_1 = require("./buttons");
const external_dialogs_1 = require("./external-dialogs");
const blocking_backdrop_1 = require("./blocking-backdrop");
const outdated_dialog_1 = require("./outdated-dialog");
const menu_1 = require("./menu");
const I18nRead_1 = __importDefault(require("../../../components/localization/I18nRead"));
const TitleReader_1 = __importDefault(require("../../../components/util/TitleReader"));
const UserDataRetriever_1 = __importDefault(require("../../../components/user/UserDataRetriever"));
const navbarStyles = (theme) => mui_core_1.createStyles({
    container: {
        flexBasis: "100%",
        display: "flex",
        flexDirection: "row-reverse",
    },
    appBarSpacer: theme.mixins.toolbar,
    title: {
        whiteSpace: "nowrap",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        overflow: "hidden",
        flexBasis: "100%",
        [theme.breakpoints.down(400)]: {
            display: "none",
        }
    },
    titleTypography: {
        textOverflow: "ellipsis",
        overflow: "hidden",
    },
    titleMargin: {
        paddingRight: "12px",
        display: "inline-block",
    }
});
const defaultMenuAdminEntries = [
    {
        path: "/cms",
        icon: react_1.default.createElement(mui_core_1.ImportantDevicesIcon, null),
        module: "cms",
        i18nProps: {
            id: "name",
            capitalize: true,
        },
    },
];
const defaultMenuEntries = [
    {
        path: "/",
        icon: react_1.default.createElement(mui_core_1.HomeIcon, null),
        i18nProps: {
            id: "home",
            capitalize: true,
        },
    },
    {
        path: "/news",
        icon: react_1.default.createElement(mui_core_1.LibraryBooksIcon, null),
        module: "cms",
        idef: "article",
        i18nProps: {
            id: "home",
            capitalize: true,
        },
    },
];
exports.Navbar = mui_core_1.withStyles(navbarStyles)((props) => {
    const [isOutdatedDialogAllowedToBeOpen, setIsOutdatedDialogAllowedToBeOpen] = react_1.useState(true);
    const [isMenuOpen, setMenuOpen] = react_1.useState(false);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(mui_core_1.AppBar, null,
            react_1.default.createElement(mui_core_1.Toolbar, null,
                react_1.default.createElement(I18nRead_1.default, { id: "menu" }, (value) => (react_1.default.createElement(mui_core_1.IconButton, { edge: "start", color: "inherit", "aria-label": value, onClick: setMenuOpen.bind(this, true) },
                    react_1.default.createElement(mui_core_1.MenuIcon, null)))),
                react_1.default.createElement("div", { className: props.classes.title },
                    react_1.default.createElement(mui_core_1.Typography, { variant: "body1", className: props.classes.titleTypography },
                        react_1.default.createElement("span", { className: props.classes.titleMargin },
                            react_1.default.createElement(TitleReader_1.default, null)),
                        react_1.default.createElement(outdated_text_1.OutdatedText, { onClick: setIsOutdatedDialogAllowedToBeOpen.bind(this, true) }))),
                react_1.default.createElement("div", { className: props.classes.container },
                    react_1.default.createElement(UserDataRetriever_1.default, null, (user) => react_1.default.createElement(module_1.ModuleProvider, { module: "users" },
                        react_1.default.createElement(item_definition_1.ItemDefinitionProvider, { itemDefinition: "user", forId: user.id, disableExternalChecks: true, assumeOwnership: true, properties: [
                                "username",
                                "app_country",
                                "email",
                                "e_validated",
                                "profile_picture",
                                "address",
                                "role",
                            ], longTermCaching: true, markForDestructionOnLogout: true },
                            react_1.default.createElement(buttons_1.Buttons, { excludeLanguagePicker: props.excludeLanguagePicker, LoginDialog: props.LoginDialog, SignupDialog: props.SignupDialog, RecoverDialog: props.RecoverDialog }),
                            react_1.default.createElement(external_dialogs_1.ExternalDialogs, null))))))),
        react_1.default.createElement("div", { className: props.classes.appBarSpacer }),
        react_1.default.createElement(blocking_backdrop_1.BlockingBackdrop, { exclude: props.excludeBlockingBackdrop }),
        react_1.default.createElement(outdated_dialog_1.OutdatedDialog, { isOpenIfOutdated: isOutdatedDialogAllowedToBeOpen, onClose: setIsOutdatedDialogAllowedToBeOpen.bind(this, false) }),
        react_1.default.createElement(menu_1.Menu, { isOpen: isMenuOpen, onClose: setMenuOpen.bind(this, false), onOpen: setMenuOpen.bind(this, true), adminEntries: props.menuAdminEntries || defaultMenuAdminEntries, entries: props.menuEntries || defaultMenuEntries })));
});
