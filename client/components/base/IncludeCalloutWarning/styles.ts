import { createStyles } from "@material-ui/styles";

export interface IIncludeCalloutWarningThemeType {
  containerWidth: string | number;
}

export const STANDARD_THEME: IIncludeCalloutWarningThemeType = {
  containerWidth: "100%",
};

export const style = (theme: IIncludeCalloutWarningThemeType) => createStyles({
  container: {
    width: theme.containerWidth,
  },
  icon: {

  },
  warning: {

  },
});
