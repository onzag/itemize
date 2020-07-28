"use strict";
/**
 * A navigation prompt that prompts if a condition evaluates to true
 *
 * @packageDocumentation
 */
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
        // set the initial state
        this.state = {
            dialogOpened: false,
            dialogOpenedFor: null,
        };
        this.onBeforeUnload = this.onBeforeUnload.bind(this);
        this.cancelDialog = this.cancelDialog.bind(this);
        this.discardDialog = this.discardDialog.bind(this);
        this.confirmDialog = this.confirmDialog.bind(this);
        this.handleRouterPromptNavigationStep = this.handleRouterPromptNavigationStep.bind(this);
    }
    /**
     * Triggers from the react router as the message prop
     * but returns a boolean, returning false prevents the navigation
     * @param location the location
     * @returns a boolean
     */
    handleRouterPromptNavigationStep(location) {
        // if the dialog is not opened already
        if (!this.state.dialogOpened) {
            // open it
            this.setState({
                dialogOpened: true,
                dialogOpenedFor: location,
            });
            // and block the navigation
            return false;
        }
        // don't block the navigation, proceed
        return true;
    }
    /**
     * Triggers when the dialog is open and it is cancelled, which means that we should
     * just stay where we are and avoid to go where we were going
     */
    cancelDialog() {
        // so one of the things that can happen is that during the prompt event
        // the current location could have been lost, so we need to do a redirect back
        // to where we are, this happens only truly during going back (doesn't seem to happen)
        // while going forward and as such we run a push to our original location
        // this seems to be a problem with history api itself, a limitation
        if (location.pathname + location.search + location.hash !== this.originalLocation) {
            _1.redirectTo(this.originalLocation);
        }
        // close the dialog, it might not really be mounted anymore after we do
        // but whatever
        this.setState({
            dialogOpened: false,
            dialogOpenedFor: null,
        });
    }
    /**
     * Discard the dialog, aka ignore it, and proceed to where we were going
     */
    discardDialog() {
        // so now we check, same thing as before, for some reason in some circumstances
        // we might already be in the location where we were going, even if the router hasn't realized
        // it and as such we check
        if (location.pathname + location.search + location.hash !==
            this.state.dialogOpenedFor.pathname + this.state.dialogOpenedFor.search + this.state.dialogOpenedFor.hash) {
            // if there's a mismatch, we push our new location
            _1.redirectTo(this.state.dialogOpenedFor.pathname + this.state.dialogOpenedFor.search + this.state.dialogOpenedFor.hash);
        }
        else {
            // otherwise if we are in the same location we replace
            _1.redirectTo(this.state.dialogOpenedFor.pathname + this.state.dialogOpenedFor.search + this.state.dialogOpenedFor.hash, null, true);
        }
    }
    /**
     * Confirm the dialog, aka confirm the changes and proceed
     */
    async confirmDialog() {
        // first we clean the error
        this.props.confirmationCallbackCleanError && this.props.confirmationCallbackCleanError();
        // and now we call the callback if we have one
        if (this.props.confirmationCallback) {
            // if we have an error
            const error = await this.props.confirmationCallback();
            if (error) {
                // we stop
                return;
            }
        }
        // if everything succeed we discard
        this.discardDialog();
    }
    /**
     * triggers on an actual before unload event
     * as the user tries to close the window without
     * saving changes
     * @param e the before unload event
     */
    onBeforeUnload(e) {
        if (this.props.when) {
            // we use the before unload value here even
            // if it won't be displayed in most browsers
            e.returnValue = this.props.beforeUnloadMessage;
        }
    }
    /**
     * As we mount
     */
    componentDidMount() {
        // we store our original location
        this.originalLocation = location.pathname + location.search + location.hash;
        // add the before unload listener
        window.addEventListener("beforeunload", this.onBeforeUnload);
    }
    /**
     * As we unmount
     */
    componentWillUnmount() {
        // remove the unload listener
        window.removeEventListener("beforeunload", this.onBeforeUnload);
    }
    /**
     * Renders the component
     */
    render() {
        const Dialog = this.props.Dialog;
        return react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(react_router_dom_1.Prompt, { when: this.props.when, message: this.handleRouterPromptNavigationStep }),
            react_1.default.createElement(Dialog, { open: this.state.dialogOpened, onCancel: this.cancelDialog, onConfirm: this.confirmDialog, onDiscard: this.discardDialog, args: this.props.dialogArgs, confirming: this.props.confirmationCallbackConfirming || false, confirmationCallbackError: this.props.confirmationCallbackError || null, confirmationCallbackErrorClean: this.props.confirmationCallbackCleanError || (() => null) }));
    }
}
exports.default = Prompt;
