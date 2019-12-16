import { createStyles } from "@material-ui/styles";

export interface IPropertyViewThemeType {
  containerWidth: string | number;
}

export const STANDARD_THEME: IPropertyViewThemeType = {
  containerWidth: "100%",
};

export const style = (theme: IPropertyViewThemeType) => createStyles({
  container: {
    width: theme.containerWidth,
  },
});
