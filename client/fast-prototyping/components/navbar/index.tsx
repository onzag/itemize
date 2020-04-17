import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, createStyles, WithStyles, withStyles, Theme, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { I18nRead } from "../../../components/localization";
import { TitleReader } from "../../../components/util";
import { UserDataRetriever } from "../../../components/user";
import { ModuleProvider } from "../../../providers/module";
import { ItemDefinitionProvider } from "../../../providers/item-definition";
import { OutdatedText } from "./outdated-text";
import { Buttons } from "./buttons";
import { ExternalDialogs } from "./external-dialogs";
import { BlockingBackdrop } from "./blocking-backdrop";
import { OutdatedDialog } from "./outdated-dialog";

const navbarStyles = (theme: Theme) => createStyles({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "100%",
    display: "flex",
    flexDirection: "row-reverse",
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
  excludeBlockingBackdrop?: boolean;
  LoginDialog: React.ComponentType<{open: boolean, onClose: () => void, onSignupRequest: () => void, onRecoverRequest: () => void}>,
  SignupDialog: React.ComponentType<{open: boolean, onClose: () => void, onLoginRequest: () => void}>,
  RecoverDialog: React.ComponentType<{open: boolean, onClose: () => void, onLoginRequest: () => void}>,
}

const Navbar = withStyles(navbarStyles)((props: INavbarProps) => {
  const [isOutdatedDialogAllowedToBeOpen, setIsOutdatedDialogAllowedToBeOpen] = useState(true);
  return (
    <React.Fragment>
      <AppBar>
        <Toolbar>
          <I18nRead id="menu">
            {
              (value: string) => (
                <IconButton edge="start" color="inherit" aria-label={value}>
                  <MenuIcon />
                </IconButton>
              )
            }
          </I18nRead>
          <div className={props.classes.title}>
            <Typography variant="body1">
              <TitleReader />
              &nbsp;
              &nbsp;
              <OutdatedText onClick={setIsOutdatedDialogAllowedToBeOpen.bind(this, true)}/>
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
                  properties={[
                    "username",
                    "app_country",
                    "email",
                    "e_validated",
                    "profile_picture",
                  ]}
                >
                  <Buttons
                    excludeLanguagePicker={props.excludeLanguagePicker}
                    LoginDialog={props.LoginDialog}
                    SignupDialog={props.SignupDialog}
                    RecoverDialog={props.RecoverDialog}
                  />
                  <ExternalDialogs/>
                </ItemDefinitionProvider>
              </ModuleProvider>}
            </UserDataRetriever>
          </div>
        </Toolbar>
      </AppBar>
      <div className={props.classes.appBarSpacer} />
      <BlockingBackdrop exclude={props.excludeBlockingBackdrop}/>
      <OutdatedDialog
        isOpenIfOutdated={isOutdatedDialogAllowedToBeOpen}
        onClose={setIsOutdatedDialogAllowedToBeOpen.bind(this, false)}
      />
    </React.Fragment>
  );
});

export default Navbar;