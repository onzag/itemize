import { createStyles } from "@material-ui/styles";

export interface IItemExclusionSwitchThemeType {
  containerWidth: string | number;
}

export const STANDARD_THEME: IItemExclusionSwitchThemeType = {
  containerWidth: "100%",
};

export const style = (theme: IItemExclusionSwitchThemeType) => createStyles({
  container: {
    width: theme.containerWidth,
  },
  calloutExclusionWarning: {
    width: "100%",
  },
  calloutExclusionWarningIcon: {

  },
  switchContainer: {
    width: "100%",
  },
  switchFormControl: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  switchLabel: {

  },
  switchLabelSingleLine: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
