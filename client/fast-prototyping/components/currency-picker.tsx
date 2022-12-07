/**
 * Contains the currency picker fast prototyping element which allows the user
 * to select a currency
 * 
 * @module
 */

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ChangeCurrencyToFn } from "../../../client/internal/providers/locale-provider";
import React from "react";
import { capitalize } from "../../components/localization";
import AppCurrencyRetriever from "../../components/localization/AppCurrencyRetriever";
import Snackbar from "./snackbar";

/**
 * The currency picker props
 */
interface ICurrencyPickerProps {
  /**
   * an alternative end icon
   */
   endIcon?: React.ReactNode;
  /**
   * The class name for the currency picker
   */
  className?: string;
  /**
   * Whether to use the code and only the code rather the normal
   * combination of the code and the symbol
   */
  useCode?: boolean;
  /**
   * handle the currency change yourself rather than the default
   * which changes the application currency, this allows
   * you to control custom properties using Setters
   */
  handleCurrencyChange?: (code: string, appChangeCurrencyTo: ChangeCurrencyToFn) => void;
  /**
   * handle the current code yourself rather than using the application's
   * default
   */
  currentCode?: string;
  /**
   * used for aria reasons
   */
  labelledBy?: string;
  /**
   * used for aria reasons
   */
  describedBy?: string;
  /**
   * used for aria reasons
   */
  label?: string;
  /**
   * used for aria reasons
   */
  description?: string;
}

/**
 * The currency picker state
 */
interface ICurrencyPickerState {
  anchorEl: HTMLElement;
}

/**
 * Contains the currency picker fast prototyping element which allows the user
 * to select a currency
 * 
 * Similarly to the country picker the currency picker can be rather heavy
 */
export class CurrencyPicker extends React.Component<ICurrencyPickerProps, ICurrencyPickerState> {
  constructor(props: ICurrencyPickerProps) {
    super(props);

    this.state = {
      anchorEl: null,
    };

    this.handleButtonSelectClick = this.handleButtonSelectClick.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
  }
  public handleButtonSelectClick(e: React.MouseEvent<HTMLButtonElement>) {
    this.setState({
      anchorEl: e.currentTarget,
    });
  }
  public handleMenuClose() {
    this.setState({
      anchorEl: null,
    });
  }
  public handleCurrencyChange(changeCurrencyToFn: ChangeCurrencyToFn, code: string) {
    this.setState({
      anchorEl: null,
    });
    if (this.props.handleCurrencyChange) {
      this.props.handleCurrencyChange(code, changeCurrencyToFn);
    } else {
      changeCurrencyToFn(code);
    }
  }
  public render() {
    return (
      <AppCurrencyRetriever>
        {(currencyData) => {
          let currentCurrency = currencyData.currentCurrency;
          if (this.props.currentCode) {
            currentCurrency = currencyData.availableCurrencies.find((c) => c.code === this.props.currentCode);
          }

          const menu = this.state.anchorEl ? <Menu
            anchorEl={this.state.anchorEl}
            // same optimization here
            keepMounted={false}
            open={!!this.state.anchorEl}
            onClose={this.handleMenuClose}
          >
            {currencyData.availableCurrencies.map((ac) => (
              <MenuItem
                key={ac.code}
                selected={currentCurrency ? ac.code === currentCurrency.code : false}
                onClick={this.handleCurrencyChange.bind(this, currencyData.changeCurrencyTo, ac.code)}
              >
                <b>{(ac.symbol || ac.code) + " (" + ac.code + ")"}</b>&nbsp;-&nbsp;{capitalize(ac.name)}
              </MenuItem>
            ))}
          </Menu> : null;

          const code = (currentCurrency ? currentCurrency.name : (this.props.currentCode || "???"));
          const name = (currentCurrency ? currentCurrency.code : (this.props.currentCode || "???"));

          return (
            <React.Fragment>
              <Button
                classes={{ root: this.props.className }}
                color="inherit"
                startIcon={<b>{currentCurrency ? currentCurrency.symbol : "?"}</b>}
                endIcon={this.props.endIcon}
                onClick={this.handleButtonSelectClick}
                aria-label={typeof this.props.label !== "undefined" ? this.props.label : name}
                aria-description={this.props.description}
                aria-labelledby={this.props.labelledBy}
                aria-describedby={this.props.describedBy}
              >
                {
                  (this.props.useCode ? code : name) +
                  (this.props.useCode ? "" : " " + code)
                }
              </Button>
              {menu}
              <Snackbar
                open={!!currencyData.error}
                i18nDisplay={currencyData.error}
                id="currency-picker-error"
                onClose={currencyData.dismissError}
                severity="error"
              />
            </React.Fragment>
          );
        }}
      </AppCurrencyRetriever>
    );
  }
}