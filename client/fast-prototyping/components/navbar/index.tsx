/**
 * The navbar for the fast prototyping usage and what it comes by default
 * 
 * @module
 */

import React, { useState } from "react";
import { styled, Theme } from "@mui/material/styles";
import { ModuleProvider } from "../../../providers/module";
import { ItemProvider } from "../../../providers/item";
import { OutdatedText } from "./outdated-text";
import { Buttons } from "./buttons";
import { ExternalDialogs } from "./external-dialogs";
import { BlockingBackdrop } from "./blocking-backdrop";
import { OutdatedDialog } from "./outdated-dialog";
import { Menu, IMenuEntry } from "./menu";
import I18nRead from "../../../components/localization/I18nRead";
import TitleReader from "../../../components/util/TitleReader";
import UserDataRetriever from "../../../components/user/UserDataRetriever";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import OfflineStatusRetriever from "../../../components/offline/OfflineStatusRetriever";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import { AltBadgeReactioner } from "../alt-badge-reactioner";

/**
 * the navbar styles generator
 * @param theme the mui theme
 * @returns a bunch of styles
 */
const navbarStyles = {
  container: {
    flexBasis: "100%",
    display: "flex",
    flexDirection: "row-reverse",
  },
  appBarSpacer: (theme: Theme) => {
    // bug in toolbar mixin https://github.com/mui/material-ui/issues/31358
    return (
      {
        minHeight: 54,
        [`${theme.breakpoints.up(0)} and (orientation: landscape)`]: {
          minHeight: 48,
        },
        [`${theme.breakpoints.up(600)} and (orientation: landscape)`]: {
          minHeight: 64,
        },
        [theme.breakpoints.up(600)]: {
          minHeight: 64,
        },
      }
    )
  },
  appBarOffline: {
    backgroundColor: "#78909c",
    transition: "background-color 2s",
  },
  appBarDefault: {
    transition: "background-color 2s",
  },
  title: (theme: Theme) => ({
    whiteSpace: "nowrap" as "nowrap",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    overflow: "hidden",
    flexBasis: "100%",
    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      display: "none",
    }
  }),
  titleTypography: {
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  titleMargin: {
    paddingRight: "12px",
    display: "inline-block",
  },
  offlineIcon: {
    marginLeft: "1rem",
    marginRight: "-0.5rem",
    fontSize: "1rem",
    opacity: "0.75",
  },
};

/**
 * The navbar props that allow to build a a navbar based on the folowing logic
 */
interface INavbarProps {
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
  LoginDialog: React.ComponentType<{ open: boolean, onClose: () => void, onSignupRequest: () => void, onRecoverRequest: () => void }>,
  /**
   * The Signup dialog component, required, after all that's what all this navbar is for, check signup-dialog.tsx dialog for a default
   * if not given a signup dialog then no signup will be available
   */
  SignupDialog?: React.ComponentType<{ open: boolean, onClose: () => void, onLoginRequest: () => void }>,
  /**
   * The Recover dialog component, required, after all that's what all this navbar is for, check recover-dialog.tsx for a default
   */
  RecoverDialog: React.ComponentType<{ open: boolean, onClose: () => void, onLoginRequest: () => void }>,
  /**
   * the menu admin entries that appear on top by a divider,
   * it uses the MenuEntry form array for it, by default it includes only the CMS for ADMIN role
   * if you have removed the CMS then you need to remove this or this would cause an error
   */
  menuAdminEntries: IMenuEntry[];
  /**
   * the menu entries themselves, basic and available for all roles specified in the role list or not
   * fully modifiable, by default will contain the home, and news, more to come
   */
  menuEntries: IMenuEntry[];
  /**
   * Extra properties in context, username, app_country, email, e_validated
   */
  avatarContextProperties: string[];
  /**
   * Component for avatar
   */
  AvatarComponent: React.ComponentType<any>;
  /**
   * avatar props
   */
  avatarProps: any;
  /**
   * An extra node to setup in the app bar
   */
  toolbarExtraNode?: React.ReactNode;
}

/**
 * The navbar fast prototyping component, contains more than just a navbar, it has extra
 * functionality into it, such as outdated information, a blocking backdrop, etc...
 * might be disabled by request
 * 
 * @param props the navbar props
 * @returns a react component
 */
export function Navbar(props: INavbarProps) {
  const [isOutdatedDialogAllowedToBeOpen, setIsOutdatedDialogAllowedToBeOpen] = useState(true);
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <UserDataRetriever>
      {(user) => <ModuleProvider module="users">
        <ItemProvider
          itemDefinition="user"
          forId={user.id}
          disableExternalChecks={true}
          properties={props.avatarContextProperties}
          longTermCaching={true}
          markForDestructionOnLogout={true}
        >
          <OfflineStatusRetriever>
            {(offline) => (
              <AppBar sx={offline ? navbarStyles.appBarOffline : navbarStyles.appBarDefault}>
                <Toolbar>
                  <I18nRead id="menu">
                    {
                      (value: string) => (
                        <AltBadgeReactioner
                          reactionKey="m"
                          component="span"
                          selector="button"
                        >
                          <IconButton
                            edge="start"
                            color="inherit"
                            aria-label={value}
                            onClick={setMenuOpen.bind(this, true)}
                            size="large">
                            <MenuIcon />
                          </IconButton>
                        </AltBadgeReactioner>
                      )
                    }
                  </I18nRead>
                  {offline ? <WifiOffIcon sx={navbarStyles.offlineIcon} /> : null}
                  <Box sx={navbarStyles.title}>
                    <Typography variant="body1" sx={navbarStyles.titleTypography}>
                      <Box component="span" sx={navbarStyles.titleMargin}>
                        <TitleReader />
                      </Box>
                      <OutdatedText onClick={setIsOutdatedDialogAllowedToBeOpen.bind(this, true)} />
                    </Typography>
                  </Box>
                  <Box sx={navbarStyles.container}>
                    <Buttons
                      excludeLanguagePicker={props.excludeLanguagePicker}
                      LoginDialog={props.LoginDialog}
                      SignupDialog={props.SignupDialog}
                      RecoverDialog={props.RecoverDialog}
                      AvatarComponent={props.AvatarComponent}
                      avatarProps={props.avatarProps}
                    />
                    <ExternalDialogs />
                  </Box>
                  {props.toolbarExtraNode}
                </Toolbar>
              </AppBar>
            )}
          </OfflineStatusRetriever>
          <Box sx={navbarStyles.appBarSpacer} />
          <BlockingBackdrop exclude={props.excludeBlockingBackdrop} />
          <OutdatedDialog
            isOpenIfOutdated={isOutdatedDialogAllowedToBeOpen}
            onClose={setIsOutdatedDialogAllowedToBeOpen.bind(this, false)}
          />
          <Menu
            isOpen={isMenuOpen}
            onClose={setMenuOpen.bind(this, false)}
            onOpen={setMenuOpen.bind(this, true)}
            adminEntries={props.menuAdminEntries}
            entries={props.menuEntries}
          />
        </ItemProvider>
      </ModuleProvider>}
    </UserDataRetriever>
  );
};
