/**
 * Contains the reader component that pipes the data to the all mighty function
 * in base.tsx
 * 
 * @packageDocumentation
 */

import { IPropertyReadProps, EntryViewReadSet } from "./base";

/**
 * Creates an reader for a given property id
 * 
 * The reader can be used with meta properties, such as created_at edited_at, etc...
 * 
 * @param props the props for the reader
 * @returns a react component
 */
export default function Reader(props: IPropertyReadProps) {
  return EntryViewReadSet(props as any, "read");
}