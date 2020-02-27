import React from "react";
import { LocaleContext, ILocaleContextType } from "../../internal/app";
import { ThemeProvider, withStyles, WithStyles } from "@material-ui/styles";
import { style, STANDARD_THEME, IIncludeExclusionSwitchThemeType } from "./styles";
import Include, { IIncludeState, IncludeExclusionState } from "../../../base/Root/Module/ItemDefinition/Include";
import TernaryExclusionSwitch from "./TernaryExclusionSwitch";
import StandardExclusionSwitch from "./StandardExclusionSwitch";

export interface IIncludeExclusionSwitchBaseProps {
  include: Include;
  state: IIncludeState;
  onChange: (newExclusionState: IncludeExclusionState) => void;
  forId: number;
  forVersion: string;
  theme?: Partial<IIncludeExclusionSwitchThemeType>;
}

export interface IIncludeExclusionSwitchProps extends IIncludeExclusionSwitchBaseProps, WithStyles<typeof style> {
  locale: ILocaleContextType;
}

const IncludeExclusionSwitchWithStyles = withStyles(style)((props: IIncludeExclusionSwitchProps) => {
  return (
    <div className={props.classes.container}>
      {
        props.include.canExclusionBeSet(props.forId, props.forVersion) ?
        (props.include.isExclusionTernary() ?
          <TernaryExclusionSwitch {...props}/> :
          <StandardExclusionSwitch {...props}/>
        ) :
        null
      }
    </div>
  );
});

export default function IncludeExclusionSwitch(props: IIncludeExclusionSwitchBaseProps) {
  let appliedTheme: IIncludeExclusionSwitchThemeType = STANDARD_THEME;
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
            <IncludeExclusionSwitchWithStyles
              {...props}
              locale={locale}
            />
          </ThemeProvider>
      }
    </LocaleContext.Consumer>
  );
}
