import React from "react";
import { LocaleContext, ILocaleContextType } from "../../..";
import { ThemeProvider, withStyles, WithStyles } from "@material-ui/styles";
import { style, STANDARD_THEME, IItemExclusionSwitchThemeType } from "./styles";
import Item, { IItemState, ItemExclusionState } from "../../../../../base/Root/Module/ItemDefinition/Item";
import TernaryExclusionSwitch from "./TernaryExclusionSwitch";
import StandardExclusionSwitch from "./StandardExclusionSwitch";

export interface IItemExclusionSwitchBaseProps {
  item: Item;
  state: IItemState;
  onChange: (newExclusionState: ItemExclusionState) => void;
  forId: number;
  theme?: Partial<IItemExclusionSwitchThemeType>;
}

export interface IItemExclusionSwitchProps extends IItemExclusionSwitchBaseProps, WithStyles<typeof style> {
  locale: ILocaleContextType;
}

const ItemExclusionSwitchWithStyles = withStyles(style)((props: IItemExclusionSwitchProps) => {
  return (
    <div className={props.classes.container}>
      {
        props.item.canExclusionBeSet(props.forId) ?
        (props.item.isExclusionTernary() ?
          <TernaryExclusionSwitch {...props}/> :
          <StandardExclusionSwitch {...props}/>
        ) :
        null
      }
    </div>
  );
});

export default function ItemExclusionSwitch(props: IItemExclusionSwitchBaseProps) {
  let appliedTheme: IItemExclusionSwitchThemeType = STANDARD_THEME;
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
            <ItemExclusionSwitchWithStyles
              {...props}
              locale={locale}
            />
          </ThemeProvider>
      }
    </LocaleContext.Consumer>
  );
}
