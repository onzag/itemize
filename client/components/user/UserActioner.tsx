/**
 * The user actioner provides functionality that allows to handle logins,
 * send email validation, reset passwor, and check the stateful status
 * of these actions
 * 
 * please refer to the Log actioners for login and signup functions
 * these are separated
 * 
 * @module
 */

import React, { useContext } from "react";
import { TokenContext } from "../../internal/providers/token-provider";
import { EndpointErrorType } from "../../../base/errors";
import { gqlQuery, buildGqlQuery } from "../../../gql-querier";
import { ItemContext, IItemContextType } from "../../providers/item";
import equals from "deep-equal";

/**
 * The user actioner arg information that allows
 * the actions that it includes
 */
export interface IUserActionerArg {
  /**
   * Sends the email validation, for the current logged in user
   */
  sendValidateEmail: () => Promise<{ error: EndpointErrorType }>,
  /**
   * Sends the email validation, for the current logged in user
   */
  sendValidateSMS: () => Promise<{ error: EndpointErrorType }>,
  /**
   * Validates the phone from the given random id
   */
  validatePhoneFromRandomId: (randomId: string) => Promise<{ error: EndpointErrorType }>,
  /**
   * Validates the email from the given random id
   */
  validateEmailFromRandomId: (randomId: string) => Promise<{ error: EndpointErrorType }>,
  /**
   * Sends a password reset, requires to be in an item definition context
   * of type user where the email property is available and filled, as it will
   * read from such context
   */
  sendResetPasswordEmail: () => Promise<{ error: EndpointErrorType }>,
  /**
   * Sends a password reset, requires to be in an item definition context
   * of type user where the email property is available and filled, as it will
   * read from such context
   */
  sendResetPasswordSMS: () => Promise<{ error: EndpointErrorType }>,
  /**
   * Resets the password of a given user, requires a token that is sent via
   * the email reset link, usually in the query string and you will be available to access it via the
   * location state reader
   * 
   * clean when successful will clean the unsafe fields, virtually the password
   */
  resetPasswordWithToken: (token: string, cleanWhenSuccessful?: boolean) => Promise<{ error: EndpointErrorType }>,
  /**
   * Resets the password of a given user, requires a a random id that is often sent
   * with a text message
   * 
   * clean when successful will clean the unsafe fields, virtually the password
   */
  resetPasswordWithEmailReceivedRandomId: (randomId: string, email: string, cleanWhenSuccessful?: boolean) => Promise<{ error: EndpointErrorType }>,
  /**
  * Resets the password of a given user, requires a a random id that is often sent
  * with a text message
  * 
  * clean when successful will clean the unsafe fields, virtually the password
  */
  resetPasswordWithSMSReceivedRandomId: (randomId: string, phone: string, cleanWhenSuccessful?: boolean) => Promise<{ error: EndpointErrorType }>,
  /**
   * stateful on progress, a boolean that specifies the last action being on progress, the actions that
   * can be executed in this actioner are stateful, which means they do not belong to any context
   * so many user actioners will not coincide on its state
   */
  statefulOnProgress: boolean,
  /**
   * stateful success, the logic is similar to the stateful on progress but to specify success of the last
   * action
   */
  statefulSuccess: boolean,
  /**
   * Allows to dismiss this stateful success
   */
  dismissStatefulSuccess: () => void,
  /**
   * stateful error, similar to stateful success, but when an error occured, this will be the same error
   * as the one returned by the function
   */
  statefulError: EndpointErrorType;
  /**
   * dismiss this stateful error
   */
  dismissStatefulError: () => void;
  /**
   * clean unsafe fields, basically only the password
   * add delay allows to add a small delay to this clean, which might be useful when you have
   * an animation and you don't want the clean to be intrusive
   */
  cleanUnsafeFields: (addDelay?: boolean) => void;
};

/**
 * The user actioner props
 */
interface IUserActionerProps {
  children: (actioner: IUserActionerArg) => React.ReactNode;
}

/**
 * The actual props that contain extra information
 * that are required in the logic
 */
interface IActualUserActionerProps extends IUserActionerProps {
  token: string;
  userContext: IItemContextType;
}

/**
 * The state that represents the stateful fields as they are described in the
 * actioner
 */
interface IActualUserActionerState {
  error: EndpointErrorType;
  successful: boolean;
  onProgress: boolean;
}

/**
 * This is the actual user actioner class
 */
class ActualUserActioner extends React.Component<IActualUserActionerProps, IActualUserActionerState> {
  constructor(props: IActualUserActionerProps) {
    super(props);

    // the initial state is setup
    this.state = {
      error: null,
      successful: false,
      onProgress: false,
    };

    this.sendValidate = this.sendValidate.bind(this);
    this.sendResetPassword = this.sendResetPassword.bind(this);
    this.dismissStatefulSuccess = this.dismissStatefulSuccess.bind(this);
    this.dismissStatefulError = this.dismissStatefulError.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.validateFromRandomId = this.validateFromRandomId.bind(this);
    this.cleanUnsafeFields = this.cleanUnsafeFields.bind(this);

    this.sendResetPasswordEmail = this.sendResetPasswordEmail.bind(this);
    this.sendResetPasswordSMS = this.sendResetPasswordSMS.bind(this);
    this.sendValidateEmail = this.sendValidateEmail.bind(this);
    this.sendValidateSMS = this.sendValidateSMS.bind(this);
    this.resetPasswordWithSMSReceivedRandomId = this.resetPasswordWithSMSReceivedRandomId.bind(this);
    this.resetPasswordWithEmailReceivedRandomId = this.resetPasswordWithEmailReceivedRandomId.bind(this);
    this.resetPasswordWithToken = this.resetPasswordWithToken.bind(this);
    this.validateEmailFromRandomId = this.validateEmailFromRandomId.bind(this);
    this.validatePhoneFromRandomId = this.validatePhoneFromRandomId.bind(this);
  }
  public shouldComponentUpdate(nextProps: IActualUserActionerProps, nextState: IActualUserActionerState) {
    // we only truly update a render on changes of the children or the state itself
    // otherwise updates are virtually uncessary
    return nextProps.children !== this.props.children ||
      !equals(this.state, nextState, { strict: true });
  }

  /**
   * Cleans the unsafe password field
   * @param addDelay whether to add delay to perform this action, a 300ms delay is added
   * which can be useful for when you don't want an obstrusive flicker
   */
  public cleanUnsafeFields(addDelay?: boolean) {
    // if we add delay
    if (addDelay) {
      // we recall this function 300ms later
      setTimeout(this.cleanUnsafeFields, 300);
      return;
    }
    // get the password property
    const passwordPdef =
      this.props.userContext.idef.getPropertyDefinitionFor("password", false);
    // clean it
    passwordPdef.cleanValueFor(this.props.userContext.forId, this.props.userContext.forVersion);
    // and trigger the change listener
    this.props.userContext.idef.triggerListeners("change", this.props.userContext.forId, this.props.userContext.forVersion);
  }

  /**
   * Sends the validate email, requires to be logged in
   * as it will use the token
   */
  async sendValidate(type: "email" | "phone") {
    // if we are on progress do nothing
    if (this.state.onProgress) {
      return;
    }

    // now we are on progress
    this.setState({
      onProgress: true,
    });

    // we build our graphql query
    const data = await gqlQuery(
      buildGqlQuery(
        {
          name: "send_validate",
          args: {
            // with the token
            token: this.props.token,
            type,
          },
          fields: {
            status: {},
          },
        },
      ),
    );

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
    } else {
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
  async sendResetPassword(type: "email" | "phone") {
    // if we are on progress we avoid
    if (this.state.onProgress) {
      return;
    }

    // now we are on progress
    this.setState({
      onProgress: true,
    });

    // let's try to get the email from the context itself
    const propertyState = this.props.userContext.state.properties.find((p) => p.propertyId === type);
    const propertyValue = propertyState ? propertyState.value as string : null;

    // execute the send reset password query
    const data = await gqlQuery(
      buildGqlQuery(
        {
          name: "send_reset_password",
          args: {
            [type]: propertyValue,
          },
          fields: {
            status: {},
          },
        },
      ),
    );

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
    } else {
      // otherwise we are successful
      this.setState({
        error: null,
        successful: true,
        onProgress: false,
      });
    }

    return { error };
  }

  async validateFromRandomId(type: "phone" | "email", randomId: string) {
    // if we are on progress we return
    if (this.state.onProgress) {
      return;
    }

    // now we are on progress
    this.setState({
      onProgress: true,
    });

    // execute the send reset password query
    const data = await gqlQuery(
      buildGqlQuery(
        {
          name: "validate",
          args: {
            user_id: this.props.userContext.forId,
            random_id: randomId,
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
        successful: false,
      });
    } else {
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
  async resetPassword(type: "token" | "random_id", method: "phone" | "email", methodValue: string, tokenOrRandomId: string, cleanWhenSuccessful: boolean = true) {
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
    const passwordPropertyValue = passwordPropertyState ? passwordPropertyState.value as string : null;

    const args = {
      [type]: tokenOrRandomId,
      new_password: passwordPropertyValue,
    }

    if (method) {
      args[method] = methodValue;
    }

    // do the reset password call, also passing our token
    const data = await gqlQuery(
      buildGqlQuery(
        {
          name: "reset_password",
          args,
          fields: {
            status: {},
          },
        },
      ),
    );

    // same as before we handle the error this way
    const error = data.errors ? data.errors[0].extensions : null;

    if (error) {
      this.setState({
        error,
        onProgress: false,
        successful: false,
      });
    } else {
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
  public dismissStatefulSuccess() {
    this.setState({
      successful: false,
    });
  }
  /**
   * dismiss the stateful error
   */
  public dismissStatefulError() {
    this.setState({
      error: null,
    });
  }

  public sendResetPasswordEmail() {
    return this.sendResetPassword("email");
  }

  public sendResetPasswordSMS() {
    return this.sendResetPassword("phone");
  }

  public sendValidateEmail() {
    return this.sendValidate("email");
  }

  public sendValidateSMS() {
    return this.sendValidate("phone");
  }

  public resetPasswordWithSMSReceivedRandomId(randomId: string, phone: string, cleanWhenSuccessful?: boolean) {
    return this.resetPassword("random_id", "phone", phone, randomId, cleanWhenSuccessful);
  }

  public resetPasswordWithEmailReceivedRandomId(randomId: string, email: string, cleanWhenSuccessful?: boolean) {
    return this.resetPassword("random_id", "email", email, randomId, cleanWhenSuccessful);
  }

  public resetPasswordWithToken(token: string, cleanWhenSuccessful?: boolean) {
    return this.resetPassword("token", null, null, token, cleanWhenSuccessful);
  }

  public validateEmailFromRandomId(randomId: string) {
    return this.validateFromRandomId("email", randomId);
  }

  public validatePhoneFromRandomId(randomId: string) {
    return this.validateFromRandomId("phone", randomId);
  }

  /**
   * The rather straightforward render function
   */
  render() {
    return this.props.children({
      sendResetPasswordEmail: this.sendResetPasswordEmail,
      sendResetPasswordSMS: this.sendResetPasswordSMS,
      sendValidateEmail: this.sendValidateEmail,
      sendValidateSMS: this.sendValidateSMS,
      validateEmailFromRandomId: this.validateEmailFromRandomId,
      validatePhoneFromRandomId: this.validatePhoneFromRandomId,
      resetPasswordWithSMSReceivedRandomId: this.resetPasswordWithSMSReceivedRandomId,
      resetPasswordWithEmailReceivedRandomId: this.resetPasswordWithEmailReceivedRandomId,
      resetPasswordWithToken: this.resetPasswordWithToken,
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
export default function UserActioner(props: IUserActionerProps) {
  const tokenContext = useContext(TokenContext);
  const itemContext = useContext(ItemContext);

  // we need the token context to get the currently logge user token
  return <ActualUserActioner {...props} token={tokenContext.token} userContext={itemContext} />;
}
