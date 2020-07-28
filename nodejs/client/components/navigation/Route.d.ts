/**
 * Provides the route which is able to create routes that will work
 * under any language
 *
 * @packageDocumentation
 */
/// <reference types="react" />
import { RouteProps } from "react-router-dom";
/**
 * Same as the router from react router but takes care of the language
 * and considers the root to be the language source
 * @param props the RouterProps
 */
export default function Route(props: RouteProps): JSX.Element;
