/**
 * Constains the redirect component which basically does a 302 redirect
 * but on the client side and as part of the DOM (kinda)
 *
 * @packageDocumentation
 */
/// <reference types="react" />
import { RedirectProps } from "react-router-dom";
/**
 * The redirect component, localized in order to take advantage
 * of the itemize app context
 * @param props the props
 * @returns a react component
 */
export default function Redirect(props: RedirectProps): JSX.Element;
