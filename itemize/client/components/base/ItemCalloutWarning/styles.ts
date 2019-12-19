import { createStyles } from "@material-ui/styles";

export interface IItemCalloutWarningThemeType {
  containerWidth: string | number;
}

export const STANDARD_THEME: IItemCalloutWarningThemeType = {
  containerWidth: "100%",
};

export const style = (theme: IItemCalloutWarningThemeType) => createStyles({
  container: {
    width: theme.containerWidth,
  },
  icon: {

  },
  warning: {

  },
});
