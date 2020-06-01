import React from "react";
import { EndpointErrorType } from "../../../base/errors";
export interface IUserActionerArg {
    sendValidateEmail: () => Promise<{
        error: EndpointErrorType;
    }>;
    sendResetPassword: (cleanWhenSuccesful?: boolean) => Promise<{
        error: EndpointErrorType;
    }>;
    resetPassword: (token: string, cleanWhenSuccesful?: boolean) => Promise<{
        error: EndpointErrorType;
    }>;
    statefulOnProgress: boolean;
    statefulSuccess: boolean;
    dismissStatefulSuccess: () => void;
    statefulError: EndpointErrorType;
    dismissStatefulError: () => void;
    cleanUnsafeFields: (addDelay?: boolean) => void;
}
interface IUserActionerProps {
    children: (actioner: IUserActionerArg) => React.ReactNode;
}
export default function UserActioner(props: IUserActionerProps): JSX.Element;
export {};
