import React from "react";
declare type logStatusType = "LOGGED_IN" | "LOGGED_OUT" | "LOGGING_IN";
declare type IfLogStatusCallback = (status: logStatusType) => React.ReactNode;
interface IIfLogStatusProps {
    status?: logStatusType;
    children: React.ReactNode | IfLogStatusCallback;
}
export declare function IfLogStatus(props: IIfLogStatusProps): JSX.Element;
export {};
