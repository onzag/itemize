"use strict";
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
class ActualUserActioner extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            successful: false,
            onProgress: false,
        };
        this.sendValidateEmail = this.sendValidateEmail.bind(this);
        this.sendResetPassword = this.sendResetPassword.bind(this);
        this.dismissStatefulSuccess = this.dismissStatefulSuccess.bind(this);
        this.dismissError = this.dismissError.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
        this.cleanUnsafeFields = this.cleanUnsafeFields.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.children !== this.props.children ||
            !deep_equal_1.default(this.state, nextState);
    }
    cleanUnsafeFields(addDelay) {
        if (addDelay) {
            setTimeout(this.cleanUnsafeFields, 300);
            return;
        }
        const passwordPdef = this.props.userContext.idef.getPropertyDefinitionFor("password", false);
        passwordPdef.cleanValueFor(this.props.userContext.forId, this.props.userContext.forVersion);
        this.props.userContext.idef.triggerListeners("change", this.props.userContext.forId, this.props.userContext.forVersion);
    }
    async sendValidateEmail() {
        if (this.state.onProgress) {
            return;
        }
        this.setState({
            onProgress: true,
        });
        const data = await gql_querier_1.gqlQuery(gql_querier_1.buildGqlQuery({
            name: "send_validate_email",
            args: {
                token: this.props.token,
            },
            fields: {
                status: {},
            },
        }));
        const error = data.errors ? data.errors[0].extensions : null;
        if (error) {
            this.setState({
                error,
                onProgress: false,
            });
        }
        else {
            this.setState({
                successful: true,
                onProgress: false,
            });
        }
        return { error };
    }
    async sendResetPassword(cleanWhenSuccesful = true) {
        if (this.state.onProgress) {
            return;
        }
        this.setState({
            onProgress: true,
        });
        const emailPropertyState = this.props.userContext.state.properties.find((p) => p.propertyId === "email");
        const emailPropertyValue = emailPropertyState ? emailPropertyState.value : null;
        const data = await gql_querier_1.gqlQuery(gql_querier_1.buildGqlQuery({
            name: "send_reset_password",
            args: {
                email: emailPropertyValue,
            },
            fields: {
                status: {},
            },
        }));
        const error = data.errors ? data.errors[0].extensions : null;
        if (error) {
            this.setState({
                error,
                onProgress: false,
            });
        }
        else {
            this.setState({
                successful: true,
                onProgress: false,
            });
        }
        if (cleanWhenSuccesful) {
            this.cleanUnsafeFields(true);
        }
        return { error };
    }
    async resetPassword(token, cleanWhenSuccesful = true) {
        if (this.state.onProgress) {
            return;
        }
        this.setState({
            onProgress: true,
        });
        const passwordPropertyState = this.props.userContext.state.properties.find((p) => p.propertyId === "password");
        const passwordPropertyValue = passwordPropertyState ? passwordPropertyState.value : null;
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
        const error = data.errors ? data.errors[0].extensions : null;
        if (error) {
            this.setState({
                error,
                onProgress: false,
            });
        }
        else {
            this.setState({
                successful: true,
                onProgress: false,
            });
        }
        if (cleanWhenSuccesful) {
            this.cleanUnsafeFields(true);
        }
        return { error };
    }
    dismissStatefulSuccess() {
        this.setState({
            successful: false,
        });
    }
    dismissError() {
        this.setState({
            error: null,
        });
    }
    render() {
        return this.props.children({
            sendValidateEmail: this.sendValidateEmail,
            sendResetPassword: this.sendResetPassword,
            resetPassword: this.resetPassword,
            dismissStatefulSuccess: this.dismissStatefulSuccess,
            dismissStatefulError: this.dismissError,
            statefulError: this.state.error,
            statefulSuccess: this.state.successful,
            statefulOnProgress: this.state.onProgress,
            cleanUnsafeFields: this.cleanUnsafeFields,
        });
    }
}
function UserActioner(props) {
    return (react_1.default.createElement(token_provider_1.TokenContext.Consumer, null, (tokenContext) => (react_1.default.createElement(item_definition_1.ItemDefinitionContext.Consumer, null, (itemDefinitionContext) => {
        return react_1.default.createElement(ActualUserActioner, Object.assign({}, props, { token: tokenContext.token, userContext: itemDefinitionContext }));
    }))));
}
exports.default = UserActioner;
