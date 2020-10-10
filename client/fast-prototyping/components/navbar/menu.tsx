/**
 * Constains the menu that is opened by the burguer icon in the navbar
 * 
 * @packageDocumentation
 */

import React from "react";
import Link from "../../../components/navigation/Link";
import {
  SwipeableDrawer, List, Divider, ListItem, ListItemIcon,
  ListItemText, createStyles, WithStyles, withStyles
} from "../../mui-core";
import { ModuleProvider } from "../../../providers/module";
import AppLanguageRetriever from "../../../components/localization/AppLanguageRetriever";
import UserDataRetriever from "../../../components/user/UserDataRetriever";
import I18nRead, { II18nReadProps } from "../../../components/localization/I18nRead";
import LocationReader from "../../../components/navigation/LocationReader";
import { NoStateItemDefinitionProvider } from "../../../providers/item";

/**
 * The menu styles
 */
const menuStyles = createStyles({
  list: {
    width: "250px",
  },
  listLink: {
    textDecoration: "none",
    color: "inherit",
  },
});

/**
 * The menu entry itself that specifies
 * how a menu is to be built
 */
export interface IMenuEntry {
  /**
   * The path it will take to, aka, the navigation
   * location
   */
  path: string;
  /**
   * The icon to use
   */
  icon: React.ReactNode,
  /**
   * The module to load in the module provider (optional)
   */
  module?: string,
  /**
   * The item definition to load in the item definition provider (optional)
   * will need the module specified if this one specified
   */
  idef?: string,
  /**
   * The arguments to pass to the i18nRead element in order to display some text
   */
  i18nProps: II18nReadProps,
  /**
   * The role that has access to this
   */
  role?: string,
  /**
   * Many roles, a list of roles, role (Single) has priority over this
   */
  roles?: string[],
}

/**
 * The menu properties with the styles attached
 */
interface MenuPropsWithStyles extends WithStyles<typeof menuStyles> {
  /**
   * Whether the menu is open
   */
  isOpen: boolean;
  /**
   * A callback for when it has opened
   */
  onOpen: () => void;
  /**
   * A callback for when it closes
   */
  onClose: () => void;
  /**
   * The admin entries that appear on top
   */
  adminEntries: IMenuEntry[];
  /**
   * The standard entries
   */
  entries: IMenuEntry[];
}

/**
 * Given entries, will build an entry list so that it is displayed in the menu
 * list
 * @param entries the entries to use
 * @param className the class name that will pop in the link container
 * @param role the role that the current user is logged as
 */
function buildEntryFromList(entries: IMenuEntry[], className: string, role: string) {
  // so we start looping
  return entries.map((entry) => {
    // first we check if the role is there and if it doesn't match
    // do the same with the many roles
    if (entry.role && role !== entry.role) {
      return null;
    } else if (entry.roles && !entry.roles.includes(role)) {
      return null;
    }

    // now we need to see how we are going to approach this, this
    // will be the display text
    let i18nNodeInfo: React.ReactNode = null;

    // with both idef and module specified
    if (entry.idef && entry.module) {
      // it's done like this, with a no state as we don't need the state
      i18nNodeInfo =
        (
          <ModuleProvider module={entry.module}>
            <NoStateItemDefinitionProvider itemDefinition={entry.idef}>
              <I18nRead {...entry.i18nProps} />
            </NoStateItemDefinitionProvider>
          </ModuleProvider>
        );

    // with only the module itself
    } else if (entry.module) {
      // we use only the module context
      i18nNodeInfo =
        (
          <ModuleProvider module={entry.module}>
            <I18nRead {...entry.i18nProps} />
          </ModuleProvider>
        );
    } else {
      // otherwise it's just plain like this
      i18nNodeInfo = <I18nRead {...entry.i18nProps} />;
    }

    // now we can return this
    return (
      <Link to={entry.path} className={className} propagateClicks={true} key={entry.path}>
        <LocationReader>
          {(arg) => (
            <ListItem button={true} selected={arg.pathname === entry.path}>
              <ListItemIcon>
                {entry.icon}
              </ListItemIcon>
              <ListItemText>
                {i18nNodeInfo}
              </ListItemText>
            </ListItem>
          )}
        </LocationReader>
      </Link>
    );
  })
}

/**
 * Provides a menu for the navbar
 * @param props the menu props
 * @returns a react element
 */
export const Menu = withStyles(menuStyles)((props: MenuPropsWithStyles) => {
  // so we render in here, first we need our language retriever to do the rtl thing
  return (
    <AppLanguageRetriever>
      {(retriever) => (
        <SwipeableDrawer
          anchor={retriever.rtl ? "right" : "left"}
          open={props.isOpen}
          onClose={props.onClose}
          onOpen={props.onOpen}
          disableDiscovery={true}
        >
          <div
            className={props.classes.list}
            role="presentation"
            onClick={props.onClose}
            onKeyDown={props.onClose}
          >
            <UserDataRetriever>
              {(userData) => (
                <>
                  {
                    props.adminEntries.length ?
                      <>
                        <List>
                          {buildEntryFromList(props.adminEntries, props.classes.listLink, userData.role)}
                        </List>
                        <Divider />
                      </> :
                      null
                  }
                  <List>
                    {buildEntryFromList(props.entries, props.classes.listLink, userData.role)}
                  </List>
                </>
              )}
            </UserDataRetriever>

          </div>
        </SwipeableDrawer>
      )}
    </AppLanguageRetriever>
  )
});