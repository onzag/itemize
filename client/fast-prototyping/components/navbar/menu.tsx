import React from "react";
import Link from "../../../components/navigation/Link";
import { SwipeableDrawer, List, Divider, ListItem, ListItemIcon,
  ListItemText, createStyles, WithStyles, withStyles,
  LibraryBooksIcon, HomeIcon, ImportantDevicesIcon } from "../../mui-core";
import { ModuleProvider } from "../../../providers/module";
import AppLanguageRetriever from "../../../components/localization/AppLanguageRetriever";
import UserDataRetriever from "../../../components/user/UserDataRetriever";
import I18nRead from "../../../components/localization/I18nRead";
import LocationReader from "../../../components/navigation/LocationReader";
import { NoStateItemDefinitionProvider } from "../../../providers/item-definition";

interface MenuProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const menuStyles = createStyles({
  list: {
    width: "250px",
  },
  listLink: {
    textDecoration: "none",
    color: "inherit",
  },
});

interface MenuPropsWithStyles extends WithStyles<typeof menuStyles>, MenuProps {
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
            <UserDataRetriever>
              {(userData) => {
                if (userData.role === "ADMIN") {
                  return (
                    <>
                      <List>
                        <Link to="/cms" className={props.classes.listLink} propagateClicks={true}>
                          <LocationReader>
                            {(arg) => (
                              <ListItem button={true} selected={arg.pathname === "/cms"}>
                                <ListItemIcon>
                                  <ImportantDevicesIcon />
                                </ListItemIcon>
                                <ModuleProvider module="cms">
                                  <ListItemText>
                                    <I18nRead id="name" capitalize={true} />
                                  </ListItemText>
                                </ModuleProvider>
                              </ListItem>
                            )}
                          </LocationReader>
                        </Link>
                      </List>
                      <Divider />
                    </>
                  )
                }
              }}
            </UserDataRetriever>
            <List>
              <Link to="/" className={props.classes.listLink} propagateClicks={true}>
                <LocationReader>
                  {(arg) => (
                    <ListItem button={true} selected={arg.pathname === "/"}>
                      <ListItemIcon>
                        <HomeIcon />
                      </ListItemIcon>
                      <ListItemText>
                        <I18nRead id="home" capitalize={true} />
                      </ListItemText>
                    </ListItem>
                  )}
                </LocationReader>
              </Link>
              <Link to="/news" className={props.classes.listLink} propagateClicks={true}>
                <LocationReader>
                  {(arg) => (
                    <ListItem button={true} selected={arg.pathname === "/news"}>
                      <ListItemIcon>
                        <LibraryBooksIcon />
                      </ListItemIcon>
                      <ListItemText>
                        <ModuleProvider module="cms">
                          <NoStateItemDefinitionProvider itemDefinition="article">
                            <I18nRead id="news" capitalize={true} />
                          </NoStateItemDefinitionProvider>
                        </ModuleProvider>
                      </ListItemText>
                    </ListItem>
                  )}
                </LocationReader>
              </Link>
            </List>
          </div>
        </SwipeableDrawer>
      )}
    </AppLanguageRetriever>
  )
});