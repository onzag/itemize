import React from "react";
import { AppBar, Toolbar, IconButton, Button, createStyles, WithStyles, withStyles, Theme } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
// import { IfLogStatus } from "../../components/login";
import { I18nRead } from "../../components/localization";
import { TitleReader } from "../../components/util";

const navbarStyles = (theme: Theme) => createStyles({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "100%",
    display: "flex",
    flexDirection: "row-reverse",
  },
  languageButton: {
    marginLeft: "1rem",
    marginRight: "1rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
  },
  appBarSpacer: theme.mixins.toolbar,
  title: {
    whiteSpace: "nowrap",
    paddingLeft: "1rem",
    paddingRight: "1rem",
  },
});

interface INavbarProps extends WithStyles<typeof navbarStyles> {
  onLoginClick?: () => void;
}

const Navbar = withStyles(navbarStyles)((props: INavbarProps) => {
  return (
    <React.Fragment>
      <AppBar>
        <Toolbar>
          <I18nRead id="menu">
            {
              (value: string) => <IconButton edge="start" color="inherit" aria-label={value}>
                <MenuIcon/>
              </IconButton>
            }
          </I18nRead>
          <div className={props.classes.title}>
            <TitleReader/>
          </div>
          <div className={props.classes.container}>
            
          </div>
        </Toolbar>
      </AppBar>
      <div className={props.classes.appBarSpacer}/>
    </React.Fragment>
  );
});

export default Navbar;