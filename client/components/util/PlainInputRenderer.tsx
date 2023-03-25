import React, { useCallback } from "react";
import { IPropertyEntryFieldRendererProps } from "../../internal/components/PropertyEntry/PropertyEntryField";

/**
 * The plain input renderer provides a simple plain input for the text and string type
 * its purpose is for it to be styled
 * 
 * Element specifies the element to be used
 * elementProps passes properties to this element
 * 
 * @param props 
 * @returns 
 */
export default function PlainInputRenderer(props: IPropertyEntryFieldRendererProps) {
  const Element = props.args.Element || "input";
  const elementArgs = props.args.elementProps || { type: "text" };
  elementArgs.onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChangeByTextualValue(e.target.value);
  }, [props.onChangeByTextualValue]);
  elementArgs.value = props.currentTextualValue;

  return (
    <Element {...elementArgs} />
  );
}