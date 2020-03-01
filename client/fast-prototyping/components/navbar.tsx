import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Button, createStyles, WithStyles, withStyles, Theme, Typography, Badge } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { I18nRead, I18nReadMany } from "../../components/localization";
import { TitleReader } from "../../components/util";
import { UserDataRetriever } from "../../components/user";
import { ModuleProvider } from "../../providers/module";
import { ItemDefinitionProvider } from "../../providers/item-definition";
import { IfLogStatus } from "../../components/login";
import { LanguagePicker } from "./language-picker";
import { LocationStateReader } from "../../components/navigaton";
import { Avatar } from "./avatar";
import { AppIsBlockedFromUpdate, AppIsOutdatedChecker } from "../../components/outdated";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { DialogResponsive } from "./dialog";
import UpdateIcon from "@material-ui/icons/Update"; 

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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    flexDirection: "column",
    padding: "2rem",
  },
  backdropTextContainer: {
    fontSize: "0.95rem",
    textAlign: "center",
    paddingBottom: "2rem",
  },
  title: {
    whiteSpace: "nowrap",
    paddingLeft: "1rem",
    paddingRight: "1rem",
  },
  needsUpdateContent: {
    padding: "1rem 0.5rem",
  },
});

interface INavbarProps extends WithStyles<typeof navbarStyles> {
  excludeLanguagePicker?: boolean;
  excludeBlockingBackdrop?: boolean;
  LoginDialog: React.ComponentType<{open: boolean, onClose: () => void, onSignupRequest: () => void}>,
  SignupDialog: React.ComponentType<{open: boolean, onClose: () => void, onLoginRequest: () => void}>,
}

function reloadApp() {
  location.reload();
}

const Navbar = withStyles(navbarStyles)((props: INavbarProps) => {
  const [isOutdatedDialogAllowedToBeOpen, setIsOutdatedDialogAllowedToBeOpen] = useState(true);
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
            <Typography variant="body1">
              <TitleReader />
              &nbsp;
              &nbsp;
              <AppIsOutdatedChecker>
                {(isOutdated) => {
                  if (isOutdated) {
                    return (
                      <I18nRead id="needs_update_navigation">
                        {(i18nNeedsUpdate) => (
                          <Badge
                            badgeContent={1}
                            color="secondary"
                          >
                            <Button
                              variant="outlined"
                              color="inherit"
                              aria-label={i18nNeedsUpdate as string}
                              startIcon={<UpdateIcon />}
                              onClick={setIsOutdatedDialogAllowedToBeOpen.bind(this, true)}
                            >
                              {i18nNeedsUpdate} 
                            </Button>
                          </Badge>
                        )}
                      </I18nRead>
                    );
                  }
                  return null;
                }}
              </AppIsOutdatedChecker>
            </Typography>
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
                    onlyIncludeProperties: [
                      "username",
                      "app_country",
                      "email",
                      "e_validated",
                      "profile_picture",
                    ],
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
                              return <Avatar showWarnings={true}/>;
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
      {
        !props.excludeBlockingBackdrop ?
        (
          <AppIsBlockedFromUpdate>
            {(isBlocked) => {
              return (
                <Backdrop className={props.classes.backdrop} open={isBlocked}>
                  <div className={props.classes.backdropTextContainer}>
                    <I18nRead id="blocked_update"/>
                  </div>
                  <CircularProgress color="inherit" />
                </Backdrop>
              )
            }}
          </AppIsBlockedFromUpdate>
        ) : null
      }
      {
        <AppIsOutdatedChecker>
          {(isOutdated) => {
            if (isOutdated) {
              return (
                <I18nReadMany
                  data={[
                    {
                      id: "needs_update_title",
                      capitalize: true,
                    },
                    {
                      id: "needs_update_content",
                    },
                    {
                      id: "needs_update_action",
                    },
                  ]}
                >
                  {(needsUpdateTitle, needsUpdateContent, needsUpdateAction) => {
                    return (
                      <DialogResponsive
                        title={needsUpdateTitle as string}
                        open={isOutdatedDialogAllowedToBeOpen}
                        onClose={setIsOutdatedDialogAllowedToBeOpen.bind(this, false)}
                        buttons={
                          <Button
                            color="primary"
                            aria-label={needsUpdateAction as string}
                            startIcon={<UpdateIcon />}
                            onClick={reloadApp}
                          >
                            {needsUpdateAction as string}
                          </Button>
                        }
                      >
                        <Typography variant="body1" className={props.classes.needsUpdateContent}>
                          {needsUpdateContent}
                        </Typography>
                      </DialogResponsive>
                    );
                  }}
                </I18nReadMany>
              );
            }
            return null;
          }}
        </AppIsOutdatedChecker>
      }
    </React.Fragment>
  );
});

export default Navbar;