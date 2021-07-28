/**
 * This is the include callout warning handler that handles how the include callout warning
 * is supposed to be shown
 * @module
 */

import React from "react";
import Include, { IIncludeState, IncludeExclusionState } from "../../../../base/Root/Module/ItemDefinition/Include";
import { ILocaleContextType, LocaleContext } from "../../providers/locale-provider";
import { RendererContext } from "../../../providers/renderer";
import equals from "deep-equal";
import { IRendererProps } from "../../renderer";

/**
 * The include callout warning handler props that will generate
 * a handler in order to make it up for the include callout
 * warning
 */
interface IIncludeCalloutWarningHandlerProps {
  /**
   * The include in question
   */
  include: Include;
  /**
   * The state of the include
   */
  state: IIncludeState;
  /**
   * The renderer to use rather than the default
   */
  renderer?: React.ComponentType<IIncludeCalloutWarningRendererProps>;
  /**
   * the renderer args to use
   */
  rendererArgs?: object;
}

/**
 * The actual properties with some context information
 */
interface IActualIncludeCalloutWarningHandlerProps extends IIncludeCalloutWarningHandlerProps {
  /**
   * The locale context
   */
  locale: ILocaleContextType;
  /**
   * The renderer is now non-optional
   */
  renderer: React.ComponentType<IIncludeCalloutWarningRendererProps>;
  /**
   * The renderer args is non-optional as well
   */
  rendererArgs: object;
}

export interface IIncludeCalloutWarningRendererProps extends IRendererProps {
  warning: string;
  active: boolean;
}

class ActualIncludeCalloutHandlerWarning extends React.Component<IActualIncludeCalloutWarningHandlerProps> {
  public shouldComponentUpdate(nextProps: IActualIncludeCalloutWarningHandlerProps) {
    return nextProps.locale.language !== this.props.locale.language ||
      nextProps.locale.rtl !== this.props.locale.rtl ||
      nextProps.include !== this.props.include ||
      nextProps.renderer !== this.props.renderer ||
      !equals(nextProps.rendererArgs, this.props.rendererArgs, { strict: true }) ||
      nextProps.state.exclusionState !== this.props.state.exclusionState;
  }
  public render() {
    let warning: string = this.props.include.getI18nDataFor(this.props.locale.language).callout_excluded_label;
    let active = this.props.include.isExclusionCallout() &&
      this.props.state.exclusionState === IncludeExclusionState.EXCLUDED;

    const RendererElement = this.props.renderer;
    const rendererProps = {
      warning,
      active,
      args: this.props.rendererArgs,
      rtl: this.props.locale.rtl,
    };
    return <RendererElement {...rendererProps}/>
  }
}

export default function IncludeCalloutWarning(props: IIncludeCalloutWarningHandlerProps) {
  // Build the context and render sending the right props
  if (props.renderer) {
    return (     
      <LocaleContext.Consumer>
        {
          (locale) => <ActualIncludeCalloutHandlerWarning
            {...props} locale={locale}
            renderer={props.renderer}
            rendererArgs={props.rendererArgs || {}}
          />
        }
      </LocaleContext.Consumer>
    );
  }
  return (
    <RendererContext.Consumer>
      {
        (renderers) =>
          <LocaleContext.Consumer>
            {
              (locale) => <ActualIncludeCalloutHandlerWarning
                {...props}
                locale={locale}
                renderer={renderers.IncludeCalloutWarning}
                rendererArgs={props.rendererArgs || {}}
              />
            }
          </LocaleContext.Consumer>
      }
    </RendererContext.Consumer>
  );
}
