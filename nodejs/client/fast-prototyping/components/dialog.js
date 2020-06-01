"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const core_1 = require("@material-ui/core");
const Close_1 = __importDefault(require("@material-ui/icons/Close"));
const I18nRead_1 = __importDefault(require("../../components/localization/I18nRead"));
const dialogStyles = core_1.createStyles({
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
exports.Dialog = core_1.withStyles(dialogStyles)((props) => {
    return (react_1.default.createElement(core_1.Dialog, { classes: {
            paper: props.classes.paper,
        }, open: props.open, onClose: props.onClose, fullScreen: props.fullScreen, scroll: "paper" },
        react_1.default.createElement(core_1.AppBar, { className: props.classes.appbar },
            react_1.default.createElement(core_1.Toolbar, null,
                react_1.default.createElement(I18nRead_1.default, { id: "close" }, (i18nClose) => (react_1.default.createElement(core_1.IconButton, { color: "inherit", onClick: props.onClose, "aria-label": i18nClose },
                    react_1.default.createElement(Close_1.default, null)))),
                react_1.default.createElement(core_1.Typography, { variant: "h6", color: "inherit", className: props.classes.title }, props.title))),
        props.children ? react_1.default.createElement(core_1.DialogContent, { className: props.classes.content }, props.children) : null,
        props.buttons ? react_1.default.createElement(core_1.DialogActions, { className: props.classes.actions }, props.buttons) : null));
});
const DialogResponsive = core_1.withMobileDialog({
    breakpoint: "xs",
})(exports.Dialog);
exports.DialogResponsive = DialogResponsive;
