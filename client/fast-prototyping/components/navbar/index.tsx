/**
 * The navbar for the fast prototyping usage and what it comes by default
 * 
 * @packageDocumentation
 */

import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, createStyles, WithStyles, withStyles, Theme, Typography, MenuIcon,
  ImportantDevicesIcon, LibraryBooksIcon, HomeIcon } from "../../mui-core";
import { ModuleProvider } from "../../../providers/module";
import { ItemDefinitionProvider } from "../../../providers/item-definition";
import { OutdatedText } from "./outdated-text";
import { Buttons } from "./buttons";
import { ExternalDialogs } from "./external-dialogs";
import { BlockingBackdrop } from "./blocking-backdrop";
import { OutdatedDialog } from "./outdated-dialog";
import { Menu, MenuEntry } from "./menu";
import I18nRead from "../../../components/localization/I18nRead";
import TitleReader from "../../../components/util/TitleReader";
import UserDataRetriever from "../../../components/user/UserDataRetriever";

/**
 * the navbar styles generator
 * @param theme the mui theme
 * @returns a bunch of styles
 */
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

/**
 * The navbar props that allow to build a a navbar based on the folowing logic
 */
interface INavbarProps extends WithStyles<typeof navbarStyles> {
  /**
   * Optional, default is false, exclude the language picker so the language cannot be chosen and instead it goes
   * with whatever default is loaded, a language picker might be added somewhere else
   */
  excludeLanguagePicker?: boolean;
  /**
   * Exclude the blocking backdrop which shows when the app is blocked from an update, you can add a different sort of
   * message somewhere else if you exclude it
   */
  excludeBlockingBackdrop?: boolean;
  /**
   * The Login dialog component, required, after all that's what all this navbar is for, check login-dialog.tsx for a default
   */
  LoginDialog: React.ComponentType<{open: boolean, onClose: () => void, onSignupRequest: () => void, onRecoverRequest: () => void}>,
  /**
   * The Signup dialog component, required, after all that's what all this navbar is for, check signup-dialog.tsx dialog for a default
   */
  SignupDialog: React.ComponentType<{open: boolean, onClose: () => void, onLoginRequest: () => void}>,
  /**
   * The Recover dialog component, required, after all that's what all this navbar is for, check recover-dialog.tsx for a default
   */
  RecoverDialog: React.ComponentType<{open: boolean, onClose: () => void, onLoginRequest: () => void}>,
  /**
   * the menu admin entries that appear on top by a divider,
   * it uses the MenuEntry form array for it, by default it includes only the CMS for ADMIN role
   * if you have removed the CMS then you need to remove this or this would cause an error
   */
  menuAdminEntries?: MenuEntry[];
  /**
   * the menu entries themselves, basic and available for all roles specified in the role list or not
   * fully modifiable, by default will contain the home, and news, more to come
   */
  menuEntries?: MenuEntry[];
}

/**
 * The default admin entries
 */
const defaultMenuAdminEntries: MenuEntry[] = [
  {
    path: "/cms",
    icon: <ImportantDevicesIcon/>,
    module: "cms",
    role: "ADMIN",
    i18nProps: {
      id: "name",
      capitalize: true,
    },
  },
]

/**
 * The default menu entries
 */
const defaultMenuEntries: MenuEntry[] = [
  {
    path: "/",
    icon: <HomeIcon />,
    i18nProps: {
      id: "home",
      capitalize: true,
    },
  },
  {
    path: "/news",
    icon: <LibraryBooksIcon />,
    module: "cms",
    idef: "article",
    i18nProps: {
      id: "news",
      capitalize: true,
    },
  },
]

/**
 * The navbar fast prototyping component, contains more than just a navbar, it has extra
 * functionality into it, such as outdated information, a blocking backdrop, etc...
 * might be disabled by request
 * 
 * @param props the navbar props
 * @returns a react component
 */
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
      <Menu
        isOpen={isMenuOpen}
        onClose={setMenuOpen.bind(this, false)}
        onOpen={setMenuOpen.bind(this, true)}
        adminEntries={props.menuAdminEntries || defaultMenuAdminEntries}
        entries={props.menuEntries || defaultMenuEntries}
      />
    </>
  );
});
