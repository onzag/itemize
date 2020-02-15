import React from "react";
import { ThemeProvider, withStyles, WithStyles } from "@material-ui/styles";
import { style, STANDARD_THEME, IIncludeCalloutWarningThemeType } from "./styles";
import Include, { IIncludeState, IncludeExclusionState } from "../../../base/Root/Module/ItemDefinition/Include";
import { Icon } from "@material-ui/core";
import { ILocaleContextType, LocaleContext } from "../../internal/app";

export interface IIncludeCalloutWarningBaseProps {
  include: Include;
  state: IIncludeState;
  theme?: Partial<IIncludeCalloutWarningThemeType>;
}

export interface IIncludeCalloutWarningProps extends IIncludeCalloutWarningBaseProps, WithStyles<typeof style> {
  locale: ILocaleContextType;
}

const IncludeCalloutWarningWithStyles = withStyles(style)((props: IIncludeCalloutWarningProps) => {
  let calloutExcludedWarning: string = null;
  if (
    props.include.isExclusionCallout() &&
    props.state.exclusionState === IncludeExclusionState.EXCLUDED
  ) {
    calloutExcludedWarning = props.include.getI18nDataFor(props.locale.language).callout_excluded_label;
  }
  return (
    <div className={props.classes.container}>
      {calloutExcludedWarning ? <div className={props.classes.warning}>
        <Icon className={props.classes.icon}>warning</Icon>
        {calloutExcludedWarning}
      </div> : null}
    </div>
  );
});

export default function IncludeCalloutWarning(props: IIncludeCalloutWarningBaseProps) {
  let appliedTheme: IIncludeCalloutWarningThemeType = STANDARD_THEME;
  if (props.theme) {
    appliedTheme = {
      ...STANDARD_THEME,
      ...props.theme,
    };
  }

  // Build the context and render sending the right props
  return (
    <LocaleContext.Consumer>
      {
        (locale) =>
          <ThemeProvider theme={appliedTheme}>
            <IncludeCalloutWarningWithStyles
              {...props}
              locale={locale}
            />
          </ThemeProvider>
      }
    </LocaleContext.Consumer>
  );
}
