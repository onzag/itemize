import React from "react";
import { createStyles, WithStyles, withStyles, Theme } from "@material-ui/core";
import I18nRead from "../../../components/localization/I18nRead";
import CopyrightIcon from '@material-ui/icons/Copyright';
import Link from "../../../components/navigation/Link";
import { LanguagePicker } from "../language-picker";
import { CurrencyPicker } from "../currency-picker";
import { CountryPicker } from "../country-picker";

const footerStyles = (theme: Theme) => createStyles({
  container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "3rem",
    backgroundColor: theme.palette.grey[900],
    flexDirection: "row",
    flexWrap: "wrap",
    padding: "0.5rem 0",
    [theme.breakpoints.down("sm")]: {
      padding: "1rem 0",
    }
  },
  dataSet: {
    lineHeight: 0,
    height: "2.5rem",
    flex: "1 1 0",
    padding: "0.2rem 1rem",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      flex: "1 0 100%",
      padding: "0.5rem 0",
    },
    "&:first-child": {
      flex: "2 1 0",
    },
    "&:not(:last-child)": {
      [theme.breakpoints.up("md")]: {
        borderRight: "solid 1px #aaa",
      }
    }
  },
  link: {
    color: "inherit",
    textDecoration: "none",
  },
});

export const Footer = withStyles(footerStyles)((props: WithStyles<typeof footerStyles>) => {
  const year = (new Date()).getUTCFullYear();
  return <div className={props.classes.container}>
    <div className={props.classes.dataSet}>
      <CopyrightIcon/>
      &nbsp;
      {year}
      &nbsp;
      <I18nRead id="app_name" capitalize={true}/>
      &nbsp;
      &nbsp;
      <LanguagePicker useCode={true}/>
      <CountryPicker useCode={true}/>
      <CurrencyPicker useCode={true}/>
    </div>
    <div className={props.classes.dataSet}>
      <Link to="/contact" className={props.classes.link}>
        <I18nRead id="contact" capitalize={true}/>
      </Link>
    </div>
    <div className={props.classes.dataSet}>
      <Link to="/terms-and-conditions" className={props.classes.link}>
        <I18nRead id="terms_and_conditions" capitalize={true}/>
      </Link>
    </div>
    <div className={props.classes.dataSet}>
      <Link to="/privacy-policy" className={props.classes.link}>
        <I18nRead id="privacy_policy" capitalize={true}/>
      </Link>
    </div>
  </div>
});