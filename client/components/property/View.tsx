/**
 * Contains the view component that pipes the data to the all mighty function
 * in base.tsx
 * 
 * @module
 */

import { IPropertyViewProps, EntryViewReadSet } from "./base";
import { IPropertyViewRendererProps } from "../../internal/components/PropertyView";
import { PropertyDefinitionSupportedType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";

/**
 * Creates an view for a given property id
 * 
 * The viewer can be used with meta properties, such as created_at edited_at, etc...
 * 
 * @param props the props for the view
 * @returns a react component
 */
export default function View(props: IPropertyViewProps<IPropertyViewRendererProps<PropertyDefinitionSupportedType>>) {
  return EntryViewReadSet(props as any, "view");
}