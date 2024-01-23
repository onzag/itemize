import React from "react";
import { DefaultSlateWrapper, IDefaultSlateWrapperProps } from "@onzag/itemize-text-engine/editor/slate/wrapper";

export interface IMaterialUISlateWrapperProps extends IDefaultSlateWrapperProps {
  /**
   * The wrapper variant
   */
  variant?: "filled" | "outlined";

  /**
   * For generating an alt badge reactioner
   */
  reactionerPriority?: number;

  /**
   * key to use with the reactioner
   */
  reactionerKey?: string;
  /**
   * Whether the reactioner is disabled
   */
  reactionerDisabled?: boolean;
  /**
   * Whether the reactioner is to be used in flow
   */
  reactionerUseInFlow?: boolean;
}

export function MaterialUISlateWrapper(props: IMaterialUISlateWrapperProps) {
  return (
    <DefaultSlateWrapper
      {...props}
    />
  )
}