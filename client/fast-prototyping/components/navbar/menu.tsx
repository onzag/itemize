import React from "react";
import Link from "../../../components/navigation/Link";
import { SwipeableDrawer, List, Divider, ListItem, ListItemIcon,
  ListItemText, createStyles, WithStyles, withStyles } from "../../mui-core";
import { ModuleProvider } from "../../../providers/module";
import AppLanguageRetriever from "../../../components/localization/AppLanguageRetriever";
import UserDataRetriever from "../../../components/user/UserDataRetriever";
import I18nRead, { II18nReadProps } from "../../../components/localization/I18nRead";
import LocationReader from "../../../components/navigation/LocationReader";
import { NoStateItemDefinitionProvider } from "../../../providers/item-definition";

const menuStyles = createStyles({
  list: {
    width: "250px",
  },
  listLink: {
    textDecoration: "none",
    color: "inherit",
  },
});

export interface MenuEntry {
  path: string;
  icon: React.ReactNode,
  module?: string,
  idef?: string,
  i18nProps: II18nReadProps,
}

interface MenuPropsWithStyles extends WithStyles<typeof menuStyles> {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  adminEntries: MenuEntry[];
  entries: MenuEntry[];
}

function buildEntryFromList(entries: MenuEntry[], className: string) {
  return entries.map((entry) => {
    let i18nNodeInfo: React.ReactNode = null;
    if (entry.idef && entry.module) {
      i18nNodeInfo = 
        (
          <ModuleProvider module={entry.module}>
            <NoStateItemDefinitionProvider itemDefinition={entry.idef}>
              <I18nRead {...entry.i18nProps} />
            </NoStateItemDefinitionProvider>
          </ModuleProvider>
        );
    } else if (entry.module) {
      i18nNodeInfo =
        (
          <ModuleProvider module={entry.module}>
            <I18nRead {...entry.i18nProps} />
          </ModuleProvider>
        );
    } else {
      i18nNodeInfo = <I18nRead {...entry.i18nProps} />;
    }
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

export const Menu = withStyles(menuStyles)((props: MenuPropsWithStyles) => {
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
            {props.adminEntries.length ? (
              <UserDataRetriever>
                {(userData) => {
                  if (userData.role === "ADMIN") {
                    return (
                      <>
                        <List>
                          {buildEntryFromList(props.adminEntries, props.classes.listLink)}
                        </List>
                        <Divider />
                      </>
                    )
                  }
                }}
              </UserDataRetriever>
            ) : null}
            <List>
              {buildEntryFromList(props.entries, props.classes.listLink)}
            </List>
          </div>
        </SwipeableDrawer>
      )}
    </AppLanguageRetriever>
  )
});