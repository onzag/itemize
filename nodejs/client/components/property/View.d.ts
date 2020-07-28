/**
 * Contains the view component that pipes the data to the all mighty function
 * in base.tsx
 *
 * @packageDocumentation
 */
/// <reference types="react" />
import { IPropertyViewProps } from "./base";
import { IPropertyViewRendererProps } from "../../internal/components/PropertyView";
import { PropertyDefinitionSupportedBooleanType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/boolean";
/**
 * Creates an view for a given property id
 *
 * The viewer can be used with meta properties, such as created_at edited_at, etc...
 *
 * @param props the props for the view
 * @returns a react component
 */
export default function View(props: IPropertyViewProps<IPropertyViewRendererProps<PropertyDefinitionSupportedBooleanType>>): JSX.Element;
