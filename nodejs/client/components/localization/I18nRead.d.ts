/**
 * Provides the read functionality to read language content in the
 * item definition, module, or even the root context
 *
 * @packageDocumentation
 */
import React from "react";
import { ILocaleContextType } from "../../internal/app";
import Module from "../../../base/Root/Module";
import ItemDefinition from "../../../base/Root/Module/ItemDefinition";
import Include from "../../../base/Root/Module/ItemDefinition/Include";
/**
 * The read props which takes the following data
 */
export interface II18nReadProps {
    /**
     * The id to read, very context dependent
     *
     * if propertyId is specified it will use the "properties" context for that property first
     * if policy type and policy name specified it will use the context for such as well
     * if nothing found (or no propertyId or policy) it will go into the next context
     *
     * if in an include context it will read from the include context itself for its standard
     * localized properties, if nothing found it will go into the next context
     *
     * if in an item definition context (normal, extended, or search mode) it will read the item definition
     * from the base context, note that custom, properties do not need to be "custom.myid" they can
     * just be "myid" if nothing found (or no context) it will go to the next context
     *
     * if in a module context it will rea from the module base context, same rule applies for custom
     * as item definition, if nothing found (or no module context) it will go to the next context
     *
     * the root context is the last, and reads from the base root properties or the main i18n data properties
     * if nothing found in this last context, an error is thrown
     */
    id: string;
    /**
     * A property id to use as context
     */
    propertyId?: string;
    /**
     * A policy type to use as context, must go along policy name
     */
    policyType?: string;
    /**
     * A policy name to use as context, must go along policy type
     */
    policyName?: string;
    /**
     * Arbitrary parameters to replace dynamic i18n strings
     * these can be plain string, for simple replacement or literal react
     * objects, using react objects will produce a react node as output
     * rather than a string
     */
    args?: any[];
    /**
     * Dangerous!... whether the content represents html instead of a plain string
     * does not mix well with args if the output generated is a react node that
     * does not serialize
     */
    html?: boolean;
    /**
     * The wrapping tag for using in the html mode, by default is a div
     */
    htmlWrappingTag?: string;
    /**
     * The actually value is passed in this function, if required
     * otherwise it's just rendered
     */
    children?: (value: React.ReactNode) => React.ReactNode;
    /**
     * Whether to capitalize the output
     */
    capitalize?: boolean;
}
/**
 * For a pure component optimized class so that
 * there are no useless re-renders when the state changes
 */
interface I18nReadInternalOptimizedProps extends II18nReadProps {
    localeContext: ILocaleContextType;
    mod: Module;
    idef: ItemDefinition;
    include: Include;
}
/**
 * The optimizer class just pipes to the internal
 */
export declare class I18nReadInternalOptimized extends React.PureComponent<I18nReadInternalOptimizedProps> {
    render(): React.ReactNode;
}
/**
 * Allows to read localized properties from the properties
 * file as they are available in the current context
 *
 * @param props the props
 * @returns a react node
 */
export default function I18nRead(props: II18nReadProps): JSX.Element;
export {};
