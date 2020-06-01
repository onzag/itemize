import React from "react";
import { TokenContext } from "../../internal/providers/token-provider";
import { EndpointErrorType } from "../../../base/errors";
import { gqlQuery, buildGqlQuery } from "../../../gql-querier";
import { ItemDefinitionContext, IItemDefinitionContextType } from "../../providers/item-definition";
import equals from "deep-equal";

export interface IUserActionerArg {
  sendValidateEmail: () => Promise<{error: EndpointErrorType}>,
  sendResetPassword: (cleanWhenSuccesful?: boolean) => Promise<{error: EndpointErrorType}>,
  resetPassword: (token: string, cleanWhenSuccesful?: boolean) => Promise<{error: EndpointErrorType}>,
  statefulOnProgress: boolean,
  statefulSuccess: boolean,
  dismissStatefulSuccess: () => void,
  statefulError: EndpointErrorType;
  dismissStatefulError: () => void;
  cleanUnsafeFields: (addDelay?: boolean) => void;
};

interface IUserActionerProps {
  children: (actioner: IUserActionerArg) => React.ReactNode;
}

interface IActualUserActionerProps extends IUserActionerProps {
  token: string;
  userContext: IItemDefinitionContextType;
}

interface IActualUserActionerState {
  error: EndpointErrorType;
  successful: boolean;
  onProgress: boolean;
}

class ActualUserActioner extends React.Component<IActualUserActionerProps, IActualUserActionerState> {
  constructor(props: IActualUserActionerProps) {
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
  public shouldComponentUpdate(nextProps: IActualUserActionerProps, nextState: IActualUserActionerState) {
    return nextProps.children !== this.props.children ||
      !equals(this.state, nextState);
  }
  public cleanUnsafeFields(addDelay?: boolean) {
    if (addDelay) {
      setTimeout(this.cleanUnsafeFields, 300);
      return;
    }
    const passwordPdef =
      this.props.userContext.idef.getPropertyDefinitionFor("password", false);
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

    const data = await gqlQuery(
      buildGqlQuery(
        {
          name: "send_validate_email",
          args: {
            token: this.props.token,
          },
          fields: {
            status: {},
          },
        },
      ),
    );

    const error = data.errors ? data.errors[0].extensions : null;

    if (error) {
      this.setState({
        error,
        onProgress: false,
      });
    } else {
      this.setState({
        successful: true,
        onProgress: false,
      });
    }

    return { error };
  }
  async sendResetPassword(cleanWhenSuccesful: boolean = true) {
    if (this.state.onProgress) {
      return;
    }

    this.setState({
      onProgress: true,
    });

    const emailPropertyState = this.props.userContext.state.properties.find((p) => p.propertyId === "email");
    const emailPropertyValue = emailPropertyState ? emailPropertyState.value as string : null;

    const data = await gqlQuery(
      buildGqlQuery(
        {
          name: "send_reset_password",
          args: {
            email: emailPropertyValue,
          },
          fields: {
            status: {},
          },
        },
      ),
    );

    const error = data.errors ? data.errors[0].extensions : null;

    if (error) {
      this.setState({
        error,
        onProgress: false,
      });
    } else {
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
  async resetPassword(token: string, cleanWhenSuccesful: boolean = true) {
    if (this.state.onProgress) {
      return;
    }

    this.setState({
      onProgress: true,
    });

    const passwordPropertyState = this.props.userContext.state.properties.find((p) => p.propertyId === "password");
    const passwordPropertyValue = passwordPropertyState ? passwordPropertyState.value as string : null;

    const data = await gqlQuery(
      buildGqlQuery(
        {
          name: "reset_password",
          args: {
            token,
            new_password: passwordPropertyValue,
          },
          fields: {
            status: {},
          },
        },
      ),
    );

    const error = data.errors ? data.errors[0].extensions : null;

    if (error) {
      this.setState({
        error,
        onProgress: false,
      });
    } else {
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
  public dismissStatefulSuccess() {
    this.setState({
      successful: false,
    });
  }
  public dismissError() {
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

export default function UserActioner(props: IUserActionerProps) {
  return (
    <TokenContext.Consumer>
      {
        (tokenContext) => (
          <ItemDefinitionContext.Consumer>
            {(itemDefinitionContext) => {
              return <ActualUserActioner {...props} token={tokenContext.token} userContext={itemDefinitionContext}/>
            }}
          </ItemDefinitionContext.Consumer>
        )
      }
    </TokenContext.Consumer>
  );
}