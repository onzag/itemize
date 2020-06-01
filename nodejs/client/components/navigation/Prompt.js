"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const _1 = require(".");
const react_router_dom_1 = require("react-router-dom");
class Prompt extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpened: false,
            dialogOpenedFor: null,
            confirming: false,
            confirmationError: null,
        };
        this.onBeforeUnload = this.onBeforeUnload.bind(this);
        this.cancelDialog = this.cancelDialog.bind(this);
        this.discardDialog = this.discardDialog.bind(this);
        this.confirmDialog = this.confirmDialog.bind(this);
        this.handleRouterPromptNavigationStep = this.handleRouterPromptNavigationStep.bind(this);
        this.confirmationCallbackErrorClean = this.confirmationCallbackErrorClean.bind(this);
    }
    handleRouterPromptNavigationStep(location) {
        if (!this.state.dialogOpened) {
            this.setState({
                dialogOpened: true,
                dialogOpenedFor: location,
            });
            return false;
        }
        return true;
    }
    confirmationCallbackErrorClean() {
        this.props.confirmationCallbackCleanup();
        this.setState({
            confirmationError: null,
        });
    }
    cancelDialog() {
        if (location.pathname !== this.originalLocation) {
            _1.redirectTo(this.originalLocation);
        }
        this.setState({
            dialogOpened: false,
            dialogOpenedFor: null,
        });
    }
    discardDialog() {
        if (location.pathname !== this.state.dialogOpenedFor.pathname) {
            _1.redirectTo(this.state.dialogOpenedFor.pathname);
        }
        else {
            _1.redirectTo(this.state.dialogOpenedFor.pathname, null, true);
        }
    }
    async confirmDialog() {
        this.confirmationCallbackErrorClean();
        if (this.props.confirmationCallback) {
            this.setState({
                confirming: true,
            });
            const error = await this.props.confirmationCallback();
            if (error) {
                this.setState({
                    confirming: false,
                    confirmationError: error,
                });
                return;
            }
        }
        this.discardDialog();
    }
    onBeforeUnload(e) {
        if (this.props.when) {
            e.returnValue = this.props.beforeUnloadMessage;
        }
    }
    componentDidMount() {
        this.originalLocation = location.pathname;
        window.addEventListener("beforeunload", this.onBeforeUnload);
    }
    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.onBeforeUnload);
    }
    render() {
        const Dialog = this.props.Dialog;
        return react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(react_router_dom_1.Prompt, { when: this.props.when, message: this.handleRouterPromptNavigationStep }),
            react_1.default.createElement(Dialog, { open: this.state.dialogOpened, onCancel: this.cancelDialog, onConfirm: this.confirmDialog, onDiscard: this.discardDialog, args: this.props.dialogArgs, confirming: this.state.confirming, confirmationCallbackError: this.state.confirmationError, confirmationCallbackErrorClean: this.confirmationCallbackErrorClean }));
    }
}
exports.default = Prompt;
