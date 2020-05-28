import { IPropertyViewProps, EntryViewReadSet } from "./base";
import { IPropertyViewRendererProps } from "../../internal/components/PropertyView";
import { PropertyDefinitionSupportedBooleanType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/boolean";

export default function View(props: IPropertyViewProps<IPropertyViewRendererProps<PropertyDefinitionSupportedBooleanType>>) {
  return EntryViewReadSet(props as any, "view");
}