import React from "react";
import { EndpointErrorType } from "../../../base/errors";
import { IActionResponseWithId, IActionSubmitOptions, IActionCleanOptions } from "../../providers/item-definition";
export interface ISubmitActionerInfoArgType {
    submitError: EndpointErrorType;
    dismissError: () => void;
    dismissSubmitted: () => void;
    submitting: boolean;
    submitted: boolean;
    submit: (options: IActionSubmitOptions) => Promise<IActionResponseWithId>;
    clean: (options: IActionCleanOptions, state: "success" | "fail", avoidTriggeringUpdate?: boolean) => void;
}
interface ISubmitActionerProps {
    children: (arg: ISubmitActionerInfoArgType) => React.ReactNode;
}
export default function SubmitActioner(props: ISubmitActionerProps): JSX.Element;
export {};
