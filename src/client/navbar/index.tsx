import React from "react";
import { AppBar, Toolbar, IconButton, Icon, Button, createStyles, WithStyles, withStyles, Theme } from "@material-ui/core";
import { IfLogStatus } from "../../../itemize/client/components/login";
import { I18nRead } from "../../../itemize/client/components/localization";
import { Avatar } from "../general/avatar";
import { LanguagePicker } from "../general/language-picker";
import { ItemDefinitionProvider } from "../../../itemize/client/providers/item-definition";
import { ModuleProvider } from "../../../itemize/client/providers/module";
import { TitleReader } from "../../../itemize/client/components/util";

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
          <div className={props.classes.title}>
            <TitleReader/>
          </div>
          <div className={props.classes.container}>
            <ModuleProvider module="users">
              <ItemDefinitionProvider
                itemDefinition="user"
                forId={props.loggedUserId}
                disableExternalChecks={true}
                assumeOwnership={true}
                optimize={{
                  onlyIncludeIncludes: [],
                  onlyIncludeProperties: ["username", "app_country"],
                  excludePolicies: true,
                }}
              >
                <IfLogStatus>
                  {(status) => {
                    if (status === "LOGGED_OUT" || status === "LOGGING_IN") {
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
