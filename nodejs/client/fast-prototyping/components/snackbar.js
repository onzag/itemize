"use strict";
/**
 * Contains the snackbar component to display success and error messages
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
const I18nReadError_1 = __importDefault(require("../../components/localization/I18nReadError"));
/**
 * the snackbar styles
 * @param theme the mui theme
 */
const snackbarStyles = (theme) => mui_core_1.createStyles({
    success: {
        backgroundColor: theme.palette.success.main,
        color: theme.palette.success.contrastText,
        fontWeight: 900,
    },
    info: {
        backgroundColor: theme.palette.info.main,
        color: theme.palette.info.contrastText,
        fontWeight: 900,
    },
    error: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.error.contrastText,
        fontWeight: 900,
    },
    warning: {
        backgroundColor: theme.palette.warning.main,
        color: theme.palette.warning.contrastText,
        fontWeight: 900,
    },
});
/**
 * The actual snackbar class
 */
class ActualSnackbar extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        let message;
        const autoHideDuration = this.props.severity === "success" ? 3000 : null;
        if (typeof this.props.i18nDisplay === "string") {
            message = react_1.default.createElement(I18nRead_1.default, { id: this.props.i18nDisplay, capitalize: true });
        }
        else if (this.props.i18nDisplay) {
            message = react_1.default.createElement(I18nReadError_1.default, { error: this.props.i18nDisplay, capitalize: true });
        }
        return (react_1.default.createElement(mui_core_1.Snackbar, { anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
            }, open: this.props.open, autoHideDuration: autoHideDuration, onClose: this.props.onClose, ContentProps: {
                "aria-describedby": this.props.id,
                classes: {
                    root: this.props.classes[this.props.severity],
                }
            }, message: react_1.default.createElement("span", { id: this.props.id }, message), action: react_1.default.createElement(I18nRead_1.default, { id: "close" }, (i18nClose) => (react_1.default.createElement(mui_core_1.IconButton, { "aria-label": i18nClose, color: "inherit", onClick: this.props.onClose },
                react_1.default.createElement(mui_core_1.CloseIcon, null)))) }));
    }
}
exports.default = mui_core_1.withStyles(snackbarStyles)(ActualSnackbar);
