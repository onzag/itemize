/// <reference types="react" />
import { LinkProps } from "react-router-dom";
interface ICustomLinkProps extends LinkProps {
    to: string;
    as?: "div" | "span" | "a" | "p";
}
/**
 * Same as the router link but actually takes
 * care of the current language set and uses such
 * language if the location is absolute
 * @param props the LinkProps
 */
export default function Link(props: ICustomLinkProps): JSX.Element;
export {};
