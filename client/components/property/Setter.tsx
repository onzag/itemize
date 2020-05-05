import { IPropertySetterProps, EntryViewReadSet } from "./base";

export default function Setter(props: IPropertySetterProps) {
  return EntryViewReadSet(props as any, "set");
}