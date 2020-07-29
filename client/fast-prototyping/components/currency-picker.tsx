/**
 * Contains the currency picker fast prototyping element which allows the user
 * to select a currency
 * 
 * @packageDocumentation
 */

import React from "react";
import { capitalize } from "../../components/localization";
import { Button, Menu, MenuItem } from "../mui-core";
import AppCurrencyRetriever from "../../components/localization/AppCurrencyRetriever";

/**
 * The currency picker props
 */
interface ICurrencyPickerProps {
  /**
   * The class name for the currency picker
   */
  className?: string;
  /**
   * Whether to use the code and only the code rather the normal
   * combination of the code and the symbol
   */
  useCode?: boolean;
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
  public handleCurrencyChange(changeCurrencyToFn: (code: string) => void, code: string) {
    this.setState({
      anchorEl: null,
    });
    changeCurrencyToFn(code);
  }
  public render() {
    return (
      <AppCurrencyRetriever>
        {(currencyData) => {
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
                selected={ac.code === currencyData.currentCurrency.code}
                onClick={this.handleCurrencyChange.bind(this, currencyData.changeCurrencyTo, ac.code)}
              >
                <b>{(ac.symbol || ac.code) + " (" + ac.code + ")"}</b>&nbsp;-&nbsp;{capitalize(ac.name)}
              </MenuItem>
            ))}
          </Menu> : null;
          return (
            <React.Fragment>
              <Button
                classes={{ root: this.props.className }}
                color="inherit"
                startIcon={<b>{currencyData.currentCurrency.symbol}</b>}
                onClick={this.handleButtonSelectClick}
              >
                {this.props.useCode ? currencyData.currentCurrency.code : currencyData.currentCurrency.name}
                {this.props.useCode ? "" : " " + currencyData.currentCurrency.code}
              </Button>
              {menu}
            </React.Fragment>
          );
        }}
      </AppCurrencyRetriever>
    );
  }
}