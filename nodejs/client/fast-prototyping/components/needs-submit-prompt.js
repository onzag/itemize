"use strict";
/**
 * Utilizes the needs submit prompt in order to prompt the user
 * about missing changes
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NeedsSubmitPrompt = void 0;
const react_1 = __importDefault(require("react"));
const NeedsSubmitPrompt_1 = __importDefault(require("../../components/navigation/NeedsSubmitPrompt"));
const dialog_1 = require("./dialog");
const mui_core_1 = require("../mui-core");
const util_1 = require("./util");
const I18nReadError_1 = __importDefault(require("../../components/localization/I18nReadError"));
const I18nReadMany_1 = __importDefault(require("../../components/localization/I18nReadMany"));
const needsSubmitDialogStyle = (theme) => mui_core_1.createStyles({
    content: {
        padding: "1rem 0.5rem",
    },
    error: {
        marginTop: "1rem",
        color: theme.palette.error.dark,
    }
});
class ActualNeedsSubmitDialog extends react_1.default.PureComponent {
    render() {
        return react_1.default.createElement(dialog_1.Dialog, { title: this.props.args.title, open: this.props.open, onClose: this.props.onCancel, buttons: react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(mui_core_1.Button, { color: "secondary", "aria-label": this.props.args.discard, startIcon: react_1.default.createElement(mui_core_1.CloseIcon, null), onClick: this.props.onDiscard }, this.props.args.discard),
                react_1.default.createElement(util_1.ProgressingElement, { isProgressing: this.props.confirming },
                    react_1.default.createElement(mui_core_1.Button, { color: "primary", "aria-label": this.props.args.confirm, startIcon: react_1.default.createElement(mui_core_1.DoneIcon, null), onClick: this.props.onConfirm }, this.props.args.confirm))) },
            react_1.default.createElement(mui_core_1.Typography, { variant: "body1", className: this.props.classes.content }, this.props.args.message),
            this.props.confirmationCallbackError ?
                react_1.default.createElement(mui_core_1.Typography, { variant: "body2", className: this.props.classes.error },
                    react_1.default.createElement(I18nReadError_1.default, { error: this.props.confirmationCallbackError, capitalize: true })) :
                null);
    }
}
const NeedsSubmitDialog = mui_core_1.withStyles(needsSubmitDialogStyle)(ActualNeedsSubmitDialog);
/**
 * The nees submit prompt will show a prompt (aka dialog) for when the user
 * attempts to leave the page, but hasn't submitted changes
 */
class NeedsSubmitPrompt extends react_1.default.PureComponent {
    render() {
        return (react_1.default.createElement(I18nReadMany_1.default, { data: [
                {
                    id: this.props.i18nMessage || "unsaved_changes",
                    capitalize: true,
                },
                {
                    id: this.props.i18nTitle || "generic_warning",
                    capitalize: true,
                },
                {
                    id: this.props.i18nConfirm || "save",
                    capitalize: true,
                },
                {
                    id: this.props.i18nDiscard || "discard",
                    capitalize: true
                }
            ] }, (message, title, confirm, discard) => (react_1.default.createElement(NeedsSubmitPrompt_1.default, { properties: this.props.properties, includes: this.props.includes, confirmationSubmitOptions: this.props.confirmationSubmitOptions, beforeUnloadMessage: message, dialogArgs: {
                message,
                title,
                confirm,
                discard,
            }, Dialog: NeedsSubmitDialog }))));
    }
}
exports.NeedsSubmitPrompt = NeedsSubmitPrompt;
