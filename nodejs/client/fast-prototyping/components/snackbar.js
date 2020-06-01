"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const core_1 = require("@material-ui/core");
const Close_1 = __importDefault(require("@material-ui/icons/Close"));
const uuid_1 = __importDefault(require("uuid"));
const I18nRead_1 = __importDefault(require("../../components/localization/I18nRead"));
const I18nReadError_1 = __importDefault(require("../../components/localization/I18nReadError"));
const snackbarStyles = (theme) => core_1.createStyles({
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
class ActualSnackbar extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.id = "id-" + uuid_1.default.v1();
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
        return (react_1.default.createElement(core_1.Snackbar, { anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
            }, open: this.props.open, autoHideDuration: autoHideDuration, onClose: this.props.onClose, ContentProps: {
                "aria-describedby": this.id,
                classes: {
                    root: this.props.classes[this.props.severity],
                }
            }, message: react_1.default.createElement("span", { id: this.id }, message), action: react_1.default.createElement(I18nRead_1.default, { id: "close" }, (i18nClose) => (react_1.default.createElement(core_1.IconButton, { "aria-label": i18nClose, color: "inherit", onClick: this.props.onClose },
                react_1.default.createElement(Close_1.default, null)))) }));
    }
}
exports.default = core_1.withStyles(snackbarStyles)(ActualSnackbar);
