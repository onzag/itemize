/**
 * Provides the Link class which allows for linking in the
 * application and doing redirects
 *
 * @packageDocumentation
 */
/// <reference types="react" />
import { LinkProps } from "react-router-dom";
/**
 * We take the link props from the react router dom and extend them to add
 * these
 */
interface ICustomLinkProps extends LinkProps {
    /**
     * to where we are redirecting to, only a string allowed now
     */
    to: string;
    /**
     * rather than using a "a" link component, use something else
     */
    as?: "div" | "span" | "a" | "p";
    /**
     * Whether to prevent propagation
     */
    propagateClicks?: boolean;
}
/**
 * Same as the router link but actually takes
 * care of the current language set and uses such
 * language if the location is absolute
 * @param props the LinkProps
 */
export default function Link(props: ICustomLinkProps): JSX.Element;
export {};
