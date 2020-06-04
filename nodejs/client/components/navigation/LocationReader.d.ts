import React from "react";
interface ILocationReaderArg {
    pathname: string;
    absPathname: string;
    urlLang: string;
}
interface ILocationReaderProps {
    children: (arg: ILocationReaderArg) => React.ReactNode;
}
declare const _default: React.ComponentType<ILocationReaderProps>;
export default _default;
