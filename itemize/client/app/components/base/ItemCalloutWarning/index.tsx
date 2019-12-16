import React from "react";
import { LocaleContext, ILocaleContextType } from "../../..";
import { ThemeProvider, withStyles, WithStyles } from "@material-ui/styles";
import { style, STANDARD_THEME, IItemCalloutWarningThemeType } from "./styles";
import Item, { IItemState, ItemExclusionState } from "../../../../../base/Root/Module/ItemDefinition/Item";
import { Icon } from "@material-ui/core";

export interface IItemCalloutWarningBaseProps {
  item: Item;
  state: IItemState;
  theme?: Partial<IItemCalloutWarningThemeType>;
}

export interface IItemCalloutWarningProps extends IItemCalloutWarningBaseProps, WithStyles<typeof style> {
  locale: ILocaleContextType;
}

const ItemCalloutWarningWithStyles = withStyles(style)((props: IItemCalloutWarningProps) => {
  let calloutExcludedWarning: string = null;
  if (
    props.item.isExclusionCallout() &&
    props.state.stateExclusion === ItemExclusionState.EXCLUDED
  ) {
    calloutExcludedWarning = props.item.getI18nDataFor(props.locale.language).callout_excluded_label;
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

export default function ItemCalloutWarning(props: IItemCalloutWarningBaseProps) {
  let appliedTheme: IItemCalloutWarningThemeType = STANDARD_THEME;
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
            <ItemCalloutWarningWithStyles
              {...props}
              locale={locale}
            />
          </ThemeProvider>
      }
    </LocaleContext.Consumer>
  );
}
