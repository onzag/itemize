import React from "react";
import { AppBar, Toolbar, IconButton, Button, createStyles, WithStyles, withStyles, Theme } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { I18nRead } from "../../components/localization";
import { TitleReader } from "../../components/util";
import { UserDataRetriever } from "../../components/user";
import { ModuleProvider } from "../../providers/module";
import { ItemDefinitionProvider } from "../../providers/item-definition";
import { IfLogStatus } from "../../components/login";
import { LanguagePicker } from "./language-picker";
import { LocationStateReader } from "../../components/navigaton";
import { Avatar } from "./avatar";

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
  excludeLanguagePicker?: boolean;
  LoginDialog: React.ComponentType<{open: boolean, onClose: () => void, onSignupRequest: () => void}>,
  SignupDialog: React.ComponentType<{open: boolean, onClose: () => void, onLoginRequest: () => void}>,
}

const Navbar = withStyles(navbarStyles)((props: INavbarProps) => {
  return (
    <React.Fragment>
      <AppBar>
        <Toolbar>
          <I18nRead id="menu">
            {
              (value: string) => <IconButton edge="start" color="inherit" aria-label={value}>
                <MenuIcon />
              </IconButton>
            }
          </I18nRead>
          <div className={props.classes.title}>
            <TitleReader />
          </div>
          <div className={props.classes.container}>
            <UserDataRetriever>
              {(user) => <ModuleProvider module="users">
                <ItemDefinitionProvider
                  itemDefinition="user"
                  forId={user.id}
                  disableExternalChecks={true}
                  assumeOwnership={true}
                  optimize={{
                    onlyIncludeIncludes: [],
                    onlyIncludeProperties: ["username", "app_country"],
                    excludePolicies: true,
                  }}
                >
                  <LocationStateReader defaultState={{signupDialogOpen: false, loginDialogOpen: false}}>
                    {(location, setLocationState) => {
                      const openLoginDialog = () => setLocationState({
                        loginDialogOpen: true,
                        signupDialogOpen: false,
                      }, location.state.signupDialogOpen);
                      const closeLoginDialog = () => setLocationState({
                        loginDialogOpen: false,
                      }, true);
                      const openSignupDialog = () => setLocationState({
                        signupDialogOpen: true,
                        loginDialogOpen: false,
                      }, location.state.loginDialogOpen);
                      const closeSignupDialog = () => setLocationState({
                        signupDialogOpen: false,
                      }, true);
                      const LoginDialog = props.LoginDialog;
                      const SignupDialog = props.SignupDialog;
                      return (
                        <IfLogStatus>
                          {(status) => {
                            if (status === "LOGGED_OUT" || status === "LOGGING_IN") {
                              return <React.Fragment>
                                <Button color="inherit" variant="outlined" onClick={openLoginDialog}>
                                  <I18nRead id="login" />
                                </Button>
                                {
                                  !props.excludeLanguagePicker ?
                                  <LanguagePicker className={props.classes.languageButton} /> :
                                  null
                                }
                                <LoginDialog
                                  open={location.state.loginDialogOpen}
                                  onClose={closeLoginDialog}
                                  onSignupRequest={openSignupDialog}
                                />
                                <SignupDialog
                                  open={location.state.signupDialogOpen}
                                  onClose={closeSignupDialog}
                                  onLoginRequest={openLoginDialog}
                                />
                              </React.Fragment>;
                            } else if (status === "LOGGED_IN") {
                              return <Avatar />;
                            }
                          }}
                        </IfLogStatus>
                      );
                    }}
                  </LocationStateReader>
                  
                </ItemDefinitionProvider>
              </ModuleProvider>}
            </UserDataRetriever>
          </div>
        </Toolbar>
      </AppBar>
      <div className={props.classes.appBarSpacer} />
    </React.Fragment>
  );
});

export default Navbar;