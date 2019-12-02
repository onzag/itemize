import React from "react";
import { AppBar, Toolbar, IconButton, Icon, Button, createStyles, WithStyles, withStyles, Theme } from "@material-ui/core";
import { IfLogStatus, I18nRead } from "../../../itemize/client/app/elements";
import { Avatar } from "../general/avatar";
import { LanguagePicker } from "../general/language-picker";
import { ModuleProvider, ItemDefinitionProvider } from "../../../itemize/client/app/providers";

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
});

interface INavbarProps extends WithStyles<typeof navbarStyles> {
  loggedUserId: number;
  onLoginClick: () => void;
}

export const Navbar = withStyles(navbarStyles)((props: INavbarProps) => {
  return (
    <React.Fragment>
      <AppBar>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label={"TODO translataion menu"}>
            <Icon>menu</Icon>
          </IconButton>
          <div className={props.classes.container}>
            <ModuleProvider module="users">
              <ItemDefinitionProvider itemDefinition="user" forId={props.loggedUserId} disableExternalChecks={true}>
                <IfLogStatus>
                  {(status) => {
                    if (status === "LOGGED_OUT") {
                      return <React.Fragment>
                        <Button color="inherit" variant="outlined" onClick={props.onLoginClick}>
                          <I18nRead id="login"/>
                        </Button>
                        <LanguagePicker className={props.classes.languageButton}/>
                      </React.Fragment>;
                    } else if (status === "LOGGED_IN") {
                      return <Avatar/>;
                    }
                  }}
                </IfLogStatus>
              </ItemDefinitionProvider>
            </ModuleProvider>
          </div>
        </Toolbar>
      </AppBar>
      <div className={props.classes.appBarSpacer}/>
    </React.Fragment>
  );
});
