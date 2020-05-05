import { IPropertyReadProps, EntryViewReadSet } from "./base";

export default function Reader(props: IPropertyReadProps) {
  return EntryViewReadSet(props as any, "read");
}