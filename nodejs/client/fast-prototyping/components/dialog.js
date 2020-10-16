"use strict";
/**
 * Contains a generic dialog component based on MUI that is meant to be extended
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mui_core_1 = require("../mui-core");
const I18nRead_1 = __importDefault(require("../../components/localization/I18nRead"));
/**
 * The standard dialog styles
 */
const dialogStyles = mui_core_1.createStyles({
    paper: {},
    appbar: {
        position: "relative",
    },
    title: {
        flex: 1,
        paddingLeft: "1rem",
        paddingRight: "1rem",
    },
    content: {
        paddingTop: "1.5rem",
        paddingBottom: "1.5rem",
        minWidth: "400px",
    },
    actions: {
        display: "flex",
        borderTop: "solid 1px #ccc",
        paddingTop: "10px",
    },
});
/**
 * The dialog itself, non-responsive and rather generic
 */
const Dialog = mui_core_1.withStyles(dialogStyles)((props) => {
    return (react_1.default.createElement(mui_core_1.Dialog, { classes: {
            paper: props.classes.paper,
        }, open: props.open, onClose: props.onClose, fullScreen: props.fullScreen, scroll: "paper" },
        react_1.default.createElement(mui_core_1.AppBar, { className: props.classes.appbar },
            react_1.default.createElement(mui_core_1.Toolbar, null,
                react_1.default.createElement(I18nRead_1.default, { id: "close" }, (i18nClose) => (react_1.default.createElement(mui_core_1.IconButton, { color: "inherit", onClick: props.onClose, "aria-label": i18nClose },
                    react_1.default.createElement(mui_core_1.CloseIcon, null)))),
                react_1.default.createElement(mui_core_1.Typography, { variant: "h6", color: "inherit", className: props.classes.title }, props.title))),
        props.children ? react_1.default.createElement(mui_core_1.DialogContent, { className: props.classes.content }, props.children) : null,
        props.buttons ? react_1.default.createElement(mui_core_1.DialogActions, { className: props.classes.actions }, props.buttons) : null));
});
exports.Dialog = Dialog;
/**
 * This is a responsive version of the dialog
 * it's able to go in fullscreen mode automatically
 * takes all the other props
 */
const DialogResponsive = mui_core_1.withMobileDialog({
    breakpoint: "xs",
})(Dialog);
exports.DialogResponsive = DialogResponsive;
