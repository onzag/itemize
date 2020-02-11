"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const internal_providers_1 = require("../internal/app/internal-providers");
const item_definition_1 = require("../providers/item-definition");
// TODO add analytics
class ActualLogActioner extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.signup = this.signup.bind(this);
        this.dismissError = this.dismissError.bind(this);
        this.cleanFields = this.cleanFields.bind(this);
    }
    shouldComponentUpdate(nextProps) {
        return nextProps.children !== this.props.children ||
            nextProps.tokenContextValue.isLoggingIn !== this.props.tokenContextValue.isLoggingIn ||
            nextProps.tokenContextValue.error !== this.props.tokenContextValue.error ||
            nextProps.itemDefinitionContextualValue.submitError !== this.props.itemDefinitionContextualValue.submitError ||
            nextProps.itemDefinitionContextualValue.submitting !== this.props.itemDefinitionContextualValue.submitting;
    }
    cleanFields() {
        const passwordPdef = this.props.itemDefinitionContextualValue.idef.getPropertyDefinitionFor("password", false);
        passwordPdef.cleanValueFor(null, null);
        this.props.itemDefinitionContextualValue.idef.triggerListeners("change", null, null);
    }
    async login() {
        const username = this.props.itemDefinitionContextualValue.state.properties
            .find((pv) => pv.propertyId === "username");
        const password = this.props.itemDefinitionContextualValue.state.properties
            .find((pv) => pv.propertyId === "password");
        if (!username) {
            throw new Error("The LogActioner ItemDefinitionProvider context does not contain an username property");
        }
        else if (!password) {
            throw new Error("The LogActioner ItemDefinitionProvider context does not contain an password property");
        }
        const usernameValue = username.value;
        const passwordValue = password.value;
        await this.props.tokenContextValue.login(usernameValue, passwordValue, null);
        // we do it but on a delay in order to avoid flickering for example
        // in dialogs that are going to close
        setTimeout(this.cleanFields, 300);
    }
    logout() {
        this.props.tokenContextValue.logout();
    }
    async signup() {
        const result = await this.props.itemDefinitionContextualValue.submit();
        if (!result.error) {
            await this.login();
        }
    }
    dismissError() {
        this.props.tokenContextValue.dismissError();
        this.props.itemDefinitionContextualValue.dismissSubmitError();
    }
    render() {
        let login;
        let logout;
        let signup;
        const dismissError = this.dismissError;
        if (!this.props.tokenContextValue.isLoggingIn && !this.props.itemDefinitionContextualValue.submitting) {
            login = this.login;
            logout = this.logout;
            signup = this.signup;
        }
        else {
            login = () => null;
            logout = () => null;
            signup = () => null;
        }
        const output = this.props.children({
            login,
            signup,
            logout,
            error: this.props.tokenContextValue.error || this.props.itemDefinitionContextualValue.submitError,
            dismissError,
        });
        return output;
    }
}
function LogActioner(props) {
    return (<internal_providers_1.TokenContext.Consumer>
      {(tokenContextValue) => {
        return (<item_definition_1.ItemDefinitionContext.Consumer>
              {(itemDefinitionContextualValue) => {
            if (!itemDefinitionContextualValue) {
                throw new Error("The LogActioner must be in a ItemDefinitionProvider context");
            }
            return (<ActualLogActioner {...props} tokenContextValue={tokenContextValue} itemDefinitionContextualValue={itemDefinitionContextualValue}/>);
        }}
            </item_definition_1.ItemDefinitionContext.Consumer>);
    }}
    </internal_providers_1.TokenContext.Consumer>);
}
exports.LogActioner = LogActioner;
// tslint:disable-next-line: max-classes-per-file
class ActualIfLogStatus extends react_1.default.PureComponent {
    render() {
        const logStatus = this.props.isLoggedIn ? "LOGGED_IN" : (this.props.isLoggingIn ? "LOGGING_IN" : "LOGGED_OUT");
        const shouldRender = !this.props.status || (this.props.status === logStatus);
        if (!shouldRender) {
            return null;
        }
        else if (typeof this.props.children === "function") {
            return this.props.children(logStatus) || null;
        }
        else {
            return this.props.children || null;
        }
    }
}
function IfLogStatus(props) {
    return (<internal_providers_1.TokenContext.Consumer>
      {(value) => {
        return <ActualIfLogStatus {...props} isLoggedIn={!!value.token} isLoggingIn={value.isLoggingIn}/>;
    }}
    </internal_providers_1.TokenContext.Consumer>);
}
exports.IfLogStatus = IfLogStatus;
