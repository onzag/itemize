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
import React from "react";
import { EndpointErrorType } from "../../../base/errors";
/**
 * The user actioner arg information that allows
 * the actions that it includes
 */
export interface IUserActionerArg {
    /**
     * Sends the email validation, for the current logged in user
     */
    sendValidateEmail: () => Promise<{
        error: EndpointErrorType;
    }>;
    /**
     * Sends a password reset, requires to be in an item definition context
     * of type user where the email property is available and filled, as it will
     * read from such context
     */
    sendResetPassword: () => Promise<{
        error: EndpointErrorType;
    }>;
    /**
     * Resets the password of a given user, requires a token that is sent via
     * the email reset link, usually in the query string and you will be available to access it via the
     * location state reader
     *
     * clean when successful will clean the unsafe fields, virtually the password
     */
    resetPassword: (token: string, cleanWhenSuccessful?: boolean) => Promise<{
        error: EndpointErrorType;
    }>;
    /**
     * stateful on progress, a boolean that specifies the last action being on progress, the actions that
     * can be executed in this actioner are stateful, which means they do not belong to any context
     * so many user actioners will not coincide on its state
     */
    statefulOnProgress: boolean;
    /**
     * stateful success, the logic is similar to the stateful on progress but to specify success of the last
     * action
     */
    statefulSuccess: boolean;
    /**
     * Allows to dismiss this stateful success
     */
    dismissStatefulSuccess: () => void;
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
}
/**
 * The user actioner props
 */
interface IUserActionerProps {
    children: (actioner: IUserActionerArg) => React.ReactNode;
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
export default function UserActioner(props: IUserActionerProps): JSX.Element;
export {};
