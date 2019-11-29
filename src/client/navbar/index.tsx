import React from "react";
import { AppBar, Toolbar, IconButton, Icon, Button, Avatar } from "@material-ui/core";
import { IfLogStatus, Reader, AppLanguageRetriever, AppCountryRetriever, AppCurrencyRetriever } from "../../../itemize/client/app/elements";

export default function Navbar() {
  return (
    <AppBar>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Icon>menu</Icon>
        </IconButton>
        <IfLogStatus>
          {(status) => {
            if (status === "LOGGED_OUT") {
              return <Button color="inherit">Login</Button>;
            } else if (status === "LOGGED_IN") {
              return (
                <Reader id="username">
                  {
                    (value) => (
                      <Avatar variant="rounded">{value ? value[0] : ""}</Avatar>
                    )
                  }
                </Reader>
              );
            }
          }}
        </IfLogStatus>
        <AppLanguageRetriever>{
          (lang) => {
            return <span>{lang.currentLanguage.name}</span>;
          }
        }</AppLanguageRetriever>
        <AppCountryRetriever>{
          (country) => {
            return <span>{country.currentCountry.emoji}</span>;
          }
        }</AppCountryRetriever>
        <AppCurrencyRetriever>{
          (currency) => {
            return <span>{currency.currentCurrency.name}</span>;
          }
        }</AppCurrencyRetriever>
      </Toolbar>
    </AppBar>
  );
}
