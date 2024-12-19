/**
 * Contains the entry component that pipes the data to the all mighty function
 * in base.tsx
 * 
 * @module
 */

import { EntryViewReadSet, IPropertyEntryProps } from "./base";
import { IPropertyEntryRendererProps } from "../../internal/components/PropertyEntry";
import type { PropertyDefinitionSupportedType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import type { SearchVariants } from "../../../constants";

/**
 * Creates an entry for a given property id
 * @param props the props for the entry
 * @returns a react component
 */
export default function Entry(props: IPropertyEntryProps<IPropertyEntryRendererProps<PropertyDefinitionSupportedType>, string, SearchVariants>) {
  return EntryViewReadSet(props as any, "entry");
}
