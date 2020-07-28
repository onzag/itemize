/**
 * Contains the entry component that pipes the data to the all mighty function
 * in base.tsx
 *
 * @packageDocumentation
 */
/// <reference types="react" />
import { IPropertyEntryProps } from "./base";
import { IPropertyEntryRendererProps } from "../../internal/components/PropertyEntry";
import { PropertyDefinitionSupportedType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
/**
 * Creates an entry for a given property id
 * @param props the props for the entry
 * @returns a react component
 */
export default function Entry(props: IPropertyEntryProps<IPropertyEntryRendererProps<PropertyDefinitionSupportedType>>): JSX.Element;
