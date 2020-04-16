import React from "react";
import { TokenContext } from "../internal/app/internal-providers";
import { EndpointErrorType } from "../../base/errors";
import { gqlQuery, buildGqlQuery } from "../../gql-querier";

interface IUserDataRetrieverProps {
  children: (arg: {
    id: number;
    role: string;
  }) => React.ReactNode;
}
export function UserDataRetriever(props: IUserDataRetrieverProps) {
  return (
    <TokenContext.Consumer>
      {
        (value) => {
          return props.children({
            id: value.id,
            role: value.role,
          });
        }
      }
    </TokenContext.Consumer>
  );
}

interface IUserActionerProps {
  children: (actioner: {
    sendValidateEmail: () => Promise<void>,
    statefulSendingValidateEmail: boolean,
    statefulSendValidateEmailSuccessful: boolean,
    dismissStatefulSendValidateEmailSuccessful: () => void,
    statefulError: EndpointErrorType;
    dismissStatefulError: () => void;
  }) => React.ReactNode;
}

interface IActualUserActionerProps extends IUserActionerProps {
  token: string;
}

interface IActualUserActionerState {
  error: EndpointErrorType;
  sendValidateEmailSuccessful: boolean;
  sendingValidateEmail: boolean;
}

class ActualUserActioner extends React.PureComponent<IActualUserActionerProps, IActualUserActionerState> {
  constructor(props: IActualUserActionerProps) {
    super(props);

    this.state = {
      error: null,
      sendValidateEmailSuccessful: false,
      sendingValidateEmail: false,
    };

    this.sendValidateEmail = this.sendValidateEmail.bind(this);
    this.dismissSendValidateEmailSuccessful = this.dismissSendValidateEmailSuccessful.bind(this);
    this.dismissError = this.dismissError.bind(this);
  }
  async sendValidateEmail() {
    if (this.state.sendingValidateEmail) {
      return;
    }

    this.setState({
      sendingValidateEmail: true,
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
        sendingValidateEmail: false,
      });
    } else {
      this.setState({
        sendValidateEmailSuccessful: true,
        sendingValidateEmail: false,
      });
    }
  }
  public dismissSendValidateEmailSuccessful() {
    this.setState({
      sendValidateEmailSuccessful: false,
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
      dismissStatefulSendValidateEmailSuccessful: this.dismissSendValidateEmailSuccessful,
      dismissStatefulError: this.dismissError,
      statefulError: this.state.error,
      statefulSendValidateEmailSuccessful: this.state.sendValidateEmailSuccessful,
      statefulSendingValidateEmail: this.state.sendingValidateEmail,
    });
  }
}

export function UserActioner(props: IUserActionerProps) {
  return (
    <TokenContext.Consumer>
      {
        (value) => {
          return <ActualUserActioner {...props} token={value.token}/>
        }
      }
    </TokenContext.Consumer>
  );
}