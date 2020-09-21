"use strict";
/**
 * Utilities for loading item definitions
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mui_core_1 = require("../mui-core");
const ItemDefinitionLoader_1 = __importDefault(require("../../components/item-definition/ItemDefinitionLoader"));
const util_1 = require("../../components/util");
const I18nRead_1 = __importDefault(require("../../components/localization/I18nRead"));
const I18nReadError_1 = __importDefault(require("../../components/localization/I18nReadError"));
/**
 * The item definition loader styles
 */
const itemDefinitionLoaderStyles = mui_core_1.createStyles({
    container: {
        position: "relative",
    },
    flexingContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    circularProgress: {
        width: "40px",
        height: "40px",
        position: "absolute",
        left: "50%",
        marginLeft: "-20px",
        top: "50%",
        marginTop: "-20px",
    },
    fullWidthContainer: {
        width: "100%",
    }
});
/**
 * The item definition loader allows to handle cases of not found, blocked or errors in a nice way
 * @param props the loader props
 * @returns a react component
 */
exports.ItemDefinitionLoader = mui_core_1.withStyles(itemDefinitionLoaderStyles)((props) => {
    return (react_1.default.createElement(ItemDefinitionLoader_1.default, null, (arg) => {
        const notFound = arg.notFound;
        const blocked = arg.blocked;
        const hasBlockedAccess = arg.hasBlockedAccess;
        const error = arg.error;
        if (notFound ||
            (blocked && !hasBlockedAccess) ||
            error) {
            let errorComponent = null;
            let imageComponent = null;
            if (notFound) {
                errorComponent = react_1.default.createElement(I18nRead_1.default, { id: props.notFoundMessageI18nId || "error.NOT_FOUND", capitalize: true });
                if (props.notFoundImage) {
                    imageComponent = react_1.default.createElement("img", { src: props.notFoundImage });
                }
            }
            else if (blocked) {
                errorComponent = react_1.default.createElement(I18nRead_1.default, { id: props.blockedMessageI18nId || "error.BLOCKED", capitalize: true });
                if (props.blockedImage) {
                    imageComponent = react_1.default.createElement("img", { src: props.blockedImage });
                }
            }
            else if (error) {
                errorComponent = react_1.default.createElement(I18nReadError_1.default, { error: arg.error, capitalize: true });
                if (props.errorImage) {
                    imageComponent = react_1.default.createElement("img", { src: props.errorImage });
                }
            }
            return (react_1.default.createElement("div", { className: props.classes.flexingContainer },
                react_1.default.createElement(mui_core_1.Typography, null, errorComponent),
                imageComponent,
                react_1.default.createElement(I18nRead_1.default, { id: "reload" }, (i18nReload) => (react_1.default.createElement(mui_core_1.IconButton, { color: "inherit", onClick: arg.reload, "aria-label": i18nReload },
                    react_1.default.createElement(mui_core_1.RefreshIcon, null))))));
        }
        return react_1.default.createElement("div", { className: `${props.classes.container} ${props.fullWidth ? props.classes.fullWidthContainer : ""}` },
            arg.loading ?
                react_1.default.createElement(util_1.DelayDisplay, { duration: props.msWaitedToShowLoadingAnimation || 700 },
                    react_1.default.createElement(mui_core_1.CircularProgress, { className: props.classes.circularProgress })) :
                null,
            props.children);
    }));
});
