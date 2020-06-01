import React from "react";
interface ILocationReaderArg {
    pathname: string;
    absPathname: string;
    urlLang: string;
}
interface ILocationReaderProps {
    children: (arg: ILocationReaderArg) => React.ReactNode;
}
export default function LocationReader(props: ILocationReaderProps): JSX.Element;
export {};
