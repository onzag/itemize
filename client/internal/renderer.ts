/**
 * Exists to contain basic renderer information about what every
 * renderer should have accessible
 * @packageDocumentation
 */

 /**
  * The basic renderer prop structure that
  * every renderer should have access to
  */
export interface IRendererProps {
  /**
   * Whether it is in rtl mode for a rtl language
   */
  rtl: boolean;
  /**
   * The renderer args
   */
  args: {
    [arg: string]: any;
  };
}