import { IPropertyViewProps, EntryViewReadSet } from "./base";
import { IPropertyViewRendererProps } from "../../internal/components/PropertyView";

export default function View(props: IPropertyViewProps<IPropertyViewRendererProps>) {
  return EntryViewReadSet(props as any, "view");
}