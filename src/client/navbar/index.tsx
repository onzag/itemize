import React from "react";
import { AppBar, Toolbar, IconButton, Icon, Button, createStyles, WithStyles, withStyles } from "@material-ui/core";
import { IfLogStatus, I18nRead } from "../../../itemize/client/app/elements";
import { Avatar } from "../user/avatar";

const navbarStyles = createStyles({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "100%",
    display: "flex",
    flexDirection: "row-reverse",
  },
});

interface INavbarProps extends WithStyles<typeof navbarStyles> {
}

export const Navbar = withStyles(navbarStyles)((props: INavbarProps) => {
  return (
    <AppBar>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Icon>menu</Icon>
        </IconButton>
        <div className={props.classes.container}>
          <IfLogStatus>
            {(status) => {
              if (status === "LOGGED_OUT") {
                return <Button color="inherit">
                  <I18nRead id="login"/>
                </Button>;
              } else if (status === "LOGGED_IN") {
                return <Avatar/>;
              }
            }}
          </IfLogStatus>
        </div>
      </Toolbar>
    </AppBar>
  );
});
