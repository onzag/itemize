import React from "react";
interface IUserDataRetrieverProps {
    children: (arg: {
        id: number;
        role: string;
    }) => React.ReactNode;
}
export default function UserDataRetriever(props: IUserDataRetrieverProps): JSX.Element;
export {};
