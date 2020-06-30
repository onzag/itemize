import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, createStyles, WithStyles, withStyles, Theme, Typography, MenuIcon } from "../../mui-core";
import { ModuleProvider } from "../../../providers/module";
import { ItemDefinitionProvider } from "../../../providers/item-definition";
import { OutdatedText } from "./outdated-text";
import { Buttons } from "./buttons";
import { ExternalDialogs } from "./external-dialogs";
import { BlockingBackdrop } from "./blocking-backdrop";
import { OutdatedDialog } from "./outdated-dialog";
import { Menu } from "./menu";
import I18nRead from "../../../components/localization/I18nRead";
import TitleReader from "../../../components/util/TitleReader";
import UserDataRetriever from "../../../components/user/UserDataRetriever";

const navbarStyles = (theme: Theme) => createStyles({
  container: {
    flexBasis: "100%",
    display: "flex",
    flexDirection: "row-reverse",
  },
  appBarSpacer: theme.mixins.toolbar,
  title: {
    whiteSpace: "nowrap",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    overflow: "hidden",
    flexBasis: "100%",
    [theme.breakpoints.down(400)]: {
      display: "none",
    }
  },
  titleTypography: {
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  titleMargin: {
    paddingRight: "12px",
    display: "inline-block",
  }
});

interface INavbarProps extends WithStyles<typeof navbarStyles> {
  excludeLanguagePicker?: boolean;
  excludeBlockingBackdrop?: boolean;
  LoginDialog: React.ComponentType<{open: boolean, onClose: () => void, onSignupRequest: () => void, onRecoverRequest: () => void}>,
  SignupDialog: React.ComponentType<{open: boolean, onClose: () => void, onLoginRequest: () => void}>,
  RecoverDialog: React.ComponentType<{open: boolean, onClose: () => void, onLoginRequest: () => void}>,
}

export const Navbar = withStyles(navbarStyles)((props: INavbarProps) => {
  const [isOutdatedDialogAllowedToBeOpen, setIsOutdatedDialogAllowedToBeOpen] = useState(true);
  const [isMenuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <AppBar>
        <Toolbar>
          <I18nRead id="menu">
            {
              (value: string) => (
                <IconButton edge="start" color="inherit" aria-label={value} onClick={setMenuOpen.bind(this, true)}>
                  <MenuIcon />
                </IconButton>
              )
            }
          </I18nRead>
          <div className={props.classes.title}>
            <Typography variant="body1" className={props.classes.titleTypography}>
              <span className={props.classes.titleMargin}>
                <TitleReader />
              </span>
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
                    "address",
                    "role",
                  ]}
                  longTermCaching={true}
                  markForDestructionOnLogout={true}
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
      <Menu isOpen={isMenuOpen} onClose={setMenuOpen.bind(this, false)} onOpen={setMenuOpen.bind(this, true)}/>
    </>
  );
});
