import React from "react";
import Include, { IIncludeState, IncludeExclusionState } from "../../../../base/Root/Module/ItemDefinition/Include";
import { ILocaleContextType, LocaleContext } from "../../providers/locale-provider";
import { RendererContext } from "../../../providers/renderer";
import equals from "deep-equal";
import { IRendererProps } from "../../renderer";

interface IIncludeCalloutWarningProps {
  include: Include;
  state: IIncludeState;
  renderer?: React.ComponentType<IIncludeCalloutWarningRendererProps>
  rendererArgs?: object;
}

interface IActualIncludeCalloutWarningProps extends IIncludeCalloutWarningProps {
  locale: ILocaleContextType;
  renderer: React.ComponentType<IIncludeCalloutWarningRendererProps>;
  rendererArgs: object;
}

export interface IIncludeCalloutWarningRendererProps extends IRendererProps {
  warning: string;
  active: boolean;
}

class ActualIncludeCalloutWarning extends React.Component<IActualIncludeCalloutWarningProps> {
  public shouldComponentUpdate(nextProps: IActualIncludeCalloutWarningProps) {
    return nextProps.locale.language !== this.props.locale.language ||
      nextProps.locale.rtl !== this.props.locale.rtl ||
      nextProps.include !== this.props.include ||
      nextProps.renderer !== this.props.renderer ||
      !equals(nextProps.rendererArgs, this.props.rendererArgs) ||
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

export default function IncludeCalloutWarning(props: IIncludeCalloutWarningProps) {
  // Build the context and render sending the right props
  if (props.renderer) {
    return (     
      <LocaleContext.Consumer>
        {
          (locale) => <ActualIncludeCalloutWarning
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
              (locale) => <ActualIncludeCalloutWarning
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
