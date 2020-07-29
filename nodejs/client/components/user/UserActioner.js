"use strict";
/**
 * The user actioner provides functionality that allows to handle logins,
 * send email validation, reset passwor, and check the stateful status
 * of these actions
 *
 * please refer to the Log actioners for login and signup functions
 * these are separated
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const token_provider_1 = require("../../internal/providers/token-provider");
const gql_querier_1 = require("../../../gql-querier");
const item_definition_1 = require("../../providers/item-definition");
const deep_equal_1 = __importDefault(require("deep-equal"));
;
/**
 * This is the actual user actioner class
 */
class ActualUserActioner extends react_1.default.Component {
    constructor(props) {
        super(props);
        // the initial state is setup
        this.state = {
            error: null,
            successful: false,
            onProgress: false,
        };
        this.sendValidateEmail = this.sendValidateEmail.bind(this);
        this.sendResetPassword = this.sendResetPassword.bind(this);
        this.dismissStatefulSuccess = this.dismissStatefulSuccess.bind(this);
        this.dismissStatefulError = this.dismissStatefulError.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
        this.cleanUnsafeFields = this.cleanUnsafeFields.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState) {
        // we only truly update a render on changes of the children or the state itself
        // otherwise updates are virtually uncessary
        return nextProps.children !== this.props.children ||
            !deep_equal_1.default(this.state, nextState);
    }
    /**
     * Cleans the unsafe password field
     * @param addDelay whether to add delay to perform this action, a 300ms delay is added
     * which can be useful for when you don't want an obstrusive flicker
     */
    cleanUnsafeFields(addDelay) {
        // if we add delay
        if (addDelay) {
            // we recall this function 300ms later
            setTimeout(this.cleanUnsafeFields, 300);
            return;
        }
        // get the password property
        const passwordPdef = this.props.userContext.idef.getPropertyDefinitionFor("password", false);
        // clean it
        passwordPdef.cleanValueFor(this.props.userContext.forId, this.props.userContext.forVersion);
        // and trigger the change listener
        this.props.userContext.idef.triggerListeners("change", this.props.userContext.forId, this.props.userContext.forVersion);
    }
    /**
     * Sends the validate email, requires to be logged in
     * as it will use the token
     */
    async sendValidateEmail() {
        // if we are on progress do nothing
        if (this.state.onProgress) {
            return;
        }
        // now we are on progress
        this.setState({
            onProgress: true,
        });
        // we build our graphql query
        const data = await gql_querier_1.gqlQuery(gql_querier_1.buildGqlQuery({
            name: "send_validate_email",
            args: {
                // with the token
                token: this.props.token,
            },
            fields: {
                status: {},
            },
        }));
        // and now we try to see if we have an error
        const error = data.errors ? data.errors[0].extensions : null;
        // if we have an error
        if (error) {
            // then we set such error, we are not anymore
            // on progress nor we are successful
            this.setState({
                error,
                onProgress: false,
                successful: false,
            });
        }
        else {
            // otherwise no error, we are successful, and of course
            // not in progress
            this.setState({
                error: null,
                successful: true,
                onProgress: false,
            });
        }
        // return the error
        return { error };
    }
    /**
     * sends the reset password, requires to be in an item definition context for an user
     * with the property of email filled
     */
    async sendResetPassword() {
        // if we are on progress we avoid
        if (this.state.onProgress) {
            return;
        }
        // now we are on progress
        this.setState({
            onProgress: true,
        });
        // let's try to get the email from the context itself
        const emailPropertyState = this.props.userContext.state.properties.find((p) => p.propertyId === "email");
        const emailPropertyValue = emailPropertyState ? emailPropertyState.value : null;
        // execute the send reset password query
        const data = await gql_querier_1.gqlQuery(gql_querier_1.buildGqlQuery({
            name: "send_reset_password",
            args: {
                email: emailPropertyValue,
            },
            fields: {
                status: {},
            },
        }));
        // let's get a possible error
        const error = data.errors ? data.errors[0].extensions : null;
        // if we have an error
        if (error) {
            // we pass it to the state
            this.setState({
                error,
                onProgress: false,
                successful: false,
            });
        }
        else {
            // otherwise we are successful
            this.setState({
                error: null,
                successful: true,
                onProgress: false,
            });
        }
        return { error };
    }
    /**
     * Given the token provided via email by the reset password, this is able to actually
     * update the password of an user so that such can login
     * @param token the token that the user recieved, likely to fetch via the location state reader
     * in the query string itself
     * @param cleanWhenSuccessful whether to clean the unsafe fields, aka, password when successful
     * default is true
     */
    async resetPassword(token, cleanWhenSuccessful = true) {
        // if we are on progress we return
        if (this.state.onProgress) {
            return;
        }
        // now we are on progress
        this.setState({
            onProgress: true,
        });
        // read the new password
        const passwordPropertyState = this.props.userContext.state.properties.find((p) => p.propertyId === "password");
        const passwordPropertyValue = passwordPropertyState ? passwordPropertyState.value : null;
        // do the reset password call, also passing our token
        const data = await gql_querier_1.gqlQuery(gql_querier_1.buildGqlQuery({
            name: "reset_password",
            args: {
                token,
                new_password: passwordPropertyValue,
            },
            fields: {
                status: {},
            },
        }));
        // same as before we handle the error this way
        const error = data.errors ? data.errors[0].extensions : null;
        if (error) {
            this.setState({
                error,
                onProgress: false,
                successful: false,
            });
        }
        else {
            this.setState({
                error: null,
                successful: true,
                onProgress: false,
            });
        }
        if (cleanWhenSuccessful) {
            this.cleanUnsafeFields(true);
        }
        return { error };
    }
    /**
     * dismiss the stateful success state
     */
    dismissStatefulSuccess() {
        this.setState({
            successful: false,
        });
    }
    /**
     * dismiss the stateful error
     */
    dismissStatefulError() {
        this.setState({
            error: null,
        });
    }
    /**
     * The rather straightforward render function
     */
    render() {
        return this.props.children({
            sendValidateEmail: this.sendValidateEmail,
            sendResetPassword: this.sendResetPassword,
            resetPassword: this.resetPassword,
            dismissStatefulSuccess: this.dismissStatefulSuccess,
            dismissStatefulError: this.dismissStatefulError,
            statefulError: this.state.error,
            statefulSuccess: this.state.successful,
            statefulOnProgress: this.state.onProgress,
            cleanUnsafeFields: this.cleanUnsafeFields,
        });
    }
}
/**
 * The user actioner allows to do user related tasks, such as
 * send a validate email, sends a reset password and reset the password
 *
 * please refer to the log actioner functions for login and signup functionality
 * these modify users in place but do not perform login and signup operations
 *
 * @param props the props of the user actioner
 * @returns a react element
 */
function UserActioner(props) {
    // we need the token context to get the currently logge user token
    return (react_1.default.createElement(token_provider_1.TokenContext.Consumer, null, (tokenContext) => (react_1.default.createElement(item_definition_1.ItemDefinitionContext.Consumer, null, 
    // as well as an item definition context to read our password and email fields
    (itemDefinitionContext) => {
        return react_1.default.createElement(ActualUserActioner, Object.assign({}, props, { token: tokenContext.token, userContext: itemDefinitionContext }));
    }))));
}
exports.default = UserActioner;
