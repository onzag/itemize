"use strict";
/**
 * This file contents functionality that is used as a component in order to perform
 * login and logout actions, they must be placed inside the provider of an item definition
 * of type user
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogActioner = void 0;
const react_1 = __importDefault(require("react"));
const token_provider_1 = require("../../internal/providers/token-provider");
const item_1 = require("../../providers/item");
const constants_1 = require("../../../constants");
/**
 * The actual log actioner itself
 */
class ActualLogActioner extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.logoutAll = this.logoutAll.bind(this);
        this.signup = this.signup.bind(this);
        this.dismissError = this.dismissError.bind(this);
        this.cleanUnsafeFields = this.cleanUnsafeFields.bind(this);
    }
    shouldComponentUpdate(nextProps) {
        return nextProps.children !== this.props.children ||
            nextProps.tokenContextValue.isLoggingIn !== this.props.tokenContextValue.isLoggingIn ||
            nextProps.tokenContextValue.error !== this.props.tokenContextValue.error ||
            nextProps.itemContextualValue.submitError !== this.props.itemContextualValue.submitError ||
            nextProps.itemContextualValue.submitting !== this.props.itemContextualValue.submitting;
    }
    cleanUnsafeFields(addDelay) {
        // so if we add delay we just call this same function 300ms later
        if (addDelay) {
            setTimeout(this.cleanUnsafeFields, 300);
            return;
        }
        // so now we need to get the password property
        const passwordPdef = this.props.itemContextualValue.idef.getPropertyDefinitionFor("password", false);
        // and clean its value
        passwordPdef.cleanValueFor(this.props.itemContextualValue.forId, this.props.itemContextualValue.forVersion);
        // and then we trigger the change listeners in the context we are
        this.props.itemContextualValue.idef.triggerListeners("change", this.props.itemContextualValue.forId, this.props.itemContextualValue.forVersion);
    }
    /**
     * Performs the login
     * @param cleanWhenSuccessful whether to clean the unsafe fields (aka password) when succesful, default is true
     * @returns a promise with the user id, user role, or an error
     */
    async login(cleanWhenSuccessful = true) {
        // so we read from the property, the state values
        const username = this.props.itemContextualValue.state.properties
            .find((pv) => pv.propertyId === "username");
        const password = this.props.itemContextualValue.state.properties
            .find((pv) => pv.propertyId === "password");
        // if we don't have any of these
        if (!username) {
            throw new Error("The LogActioner ItemProvider context state does not contain an username property");
        }
        else if (!password) {
            throw new Error("The LogActioner ItemProvider context state does not contain an password property");
        }
        // now we need such actual values
        const usernameValue = username.value;
        const passwordValue = password.value;
        // and we use the context for the token in order to perform the login
        const userData = await this.props.tokenContextValue.login(usernameValue, passwordValue, null);
        // if we get a sucesful login
        if (cleanWhenSuccessful && userData && !userData.error) {
            // we do it but on a delay in order to avoid flickering for example
            // in dialogs that are going to close
            this.cleanUnsafeFields(true);
        }
        return userData;
    }
    /**
     * Performs the logoug
     */
    logout() {
        // basically just pipe there
        this.props.tokenContextValue.logout();
    }
    /**
     * Logouts from all devices
     */
    async logoutAll() {
        // NOTE there's a possibility for the random number to be the same, even when this one is small
        // and an edge case and is very unlikely to fail, in case this is not enough, we can very likely use
        // a trigger in the server side for users in order to patch the edge case, but this might as well not
        // be necessary at all
        // we create a new session id
        const newSessionId = Math.floor(Math.random() * Math.floor(constants_1.MAX_SUPPORTED_INTEGER));
        // we need to retrieve the session id property in order to botch a change event
        // as if it was the UI
        const sessionIdProperty = this.props.itemContextualValue.idef.getPropertyDefinitionFor("session_id", false);
        // now we trigger the change
        this.props.itemContextualValue.onPropertyChange(sessionIdProperty, newSessionId, null);
        // and we submit now
        const result = await this.props.itemContextualValue.submit({
            properties: ["session_id"],
        });
        // if we don't get an error we call logout
        if (!result.error) {
            this.props.tokenContextValue.logout();
        }
    }
    /**
     * Performs the signup
     * @param cleanWhenSuccessful whether to clean the unsafe fields (aka password) when succesful, default is true
     * @returns a promise with the user id, user role, or an error
     */
    async signup(cleanWhenSuccessful = true) {
        // we nee to check that there's no forId user
        if (this.props.itemContextualValue.forId) {
            throw new Error("Attempted to signup an user by overriding user for id " + this.props.itemContextualValue.forId);
        }
        // basically we trigger the submit from the contextual value so that the idef
        // performs the CREATE action
        const result = await this.props.itemContextualValue.submit({
            properties: ["username", "password", "app_language", "app_country", "app_currency"],
        });
        // now if there's no error
        if (!result.error) {
            // we call the login and return that
            return await this.login(cleanWhenSuccessful);
        }
        // otherwise we return such error
        return {
            id: null,
            role: null,
            error: result.error,
        };
    }
    /**
     * Dismisses the last error
     */
    dismissError() {
        this.props.tokenContextValue.dismissError();
        this.props.itemContextualValue.dismissSubmitError();
    }
    /**
     * Classic render
     */
    render() {
        let login;
        let logout;
        let signup;
        let logoutAll;
        const dismissError = this.dismissError;
        if (!this.props.tokenContextValue.isLoggingIn && !this.props.itemContextualValue.submitting) {
            login = this.login;
            logout = this.logout;
            signup = this.signup;
            logoutAll = this.logoutAll;
        }
        else {
            login = () => null;
            logout = () => null;
            signup = () => null;
            logoutAll = () => null;
        }
        const output = this.props.children({
            login,
            signup,
            logout,
            logoutAll,
            error: this.props.tokenContextValue.error || this.props.itemContextualValue.submitError,
            dismissError,
            cleanUnsafeFields: this.cleanUnsafeFields,
            isLoggingIn: this.props.tokenContextValue.isLoggingIn || this.props.itemContextualValue.submitting,
        });
        return output;
    }
}
/**
 * The log actioner class allows for actions regarding login/signup
 * and retrieval of the login state in order to implement
 * such functionality in react components
 * @param props the log actioner props
 * @returns a react component
 */
function LogActioner(props) {
    return (react_1.default.createElement(token_provider_1.TokenContext.Consumer, null, (tokenContextValue) => {
        return (react_1.default.createElement(item_1.ItemContext.Consumer, null, (itemContextualValue) => {
            if (!itemContextualValue) {
                throw new Error("The LogActioner must be in a ItemProvider context");
            }
            return (react_1.default.createElement(ActualLogActioner, Object.assign({}, props, { tokenContextValue: tokenContextValue, itemContextualValue: itemContextualValue })));
        }));
    }));
}
exports.LogActioner = LogActioner;
