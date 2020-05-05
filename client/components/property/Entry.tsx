import { EntryViewReadSet, IPropertyEntryProps } from "./base";
import { IPropertyEntryRendererProps } from "../../internal/components/PropertyEntry";
import { PropertyDefinitionSupportedType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";

export default function Entry(props: IPropertyEntryProps<IPropertyEntryRendererProps<PropertyDefinitionSupportedType>>) {
  return EntryViewReadSet(props as any, "entry");
}