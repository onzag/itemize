/**
 * Contains a country picker that allows the user to fully select their own country
 * 
 * @packageDocumentation
 */

import React from "react";
import { capitalize } from "../../components/localization";
import { Button, Menu, MenuItem } from "../mui-core";
import AppCountryRetriever from "../../components/localization/AppCountryRetriever";

/**
 * The props of the countrypicker
 */
interface ICountryPickerProps {
  /**
   * A classname to wrap it on
   */
  className?: string;
  /**
   * Whether to use the country code rather than the native name
   */
  useCode?: boolean;
}

/**
 * The state of the countrypicker
 */
interface ICountryPickerState {
  anchorEl: HTMLElement;
}

/**
 * Contains a country picker that allows the user to fully select their own country
 * 
 * Picking a country will affect language and currency
 * 
 * This country picker is heavy stuff, despite it being a rather simple component
 * it has to render so many countries it can make the app slow
 * 
 * For that reason it will not keep itself mounted as the generated tree can be rather large
 */
export class CountryPicker extends React.PureComponent<ICountryPickerProps, ICountryPickerState> {
  constructor(props: ICountryPickerProps) {
    super(props);

    this.state = {
      anchorEl: null,
    };

    this.handleButtonSelectClick = this.handleButtonSelectClick.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
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
  public handleCountryChange(changeCountryToFn: (code: string) => void, code: string) {
    this.setState({
      anchorEl: null,
    });
    changeCountryToFn(code);
  }
  public render() {
    return (
      <AppCountryRetriever>
        {(countryData) => {
          const menu = this.state.anchorEl ? <Menu
            anchorEl={this.state.anchorEl}
            // this is important to keep it false in orer to ensure the app isn't sluggish
            keepMounted={false}
            open={!!this.state.anchorEl}
            onClose={this.handleMenuClose}
          >
            {countryData.availableCountries.map((ac) => (
              <MenuItem
                key={ac.code}
                selected={ac.code === countryData.currentCountry.code}
                onClick={this.handleCountryChange.bind(this, countryData.changeCountryTo, ac.code)}
              >
                {ac.emoji} {capitalize(ac.native)}
              </MenuItem>
            ))}
          </Menu> : null;
          return (
            <React.Fragment>
              <Button
                classes={{ root: this.props.className }}
                color="inherit"
                startIcon={countryData.currentCountry.emoji}
                onClick={this.handleButtonSelectClick}
              >
                {this.props.useCode ? countryData.currentCountry.code : countryData.currentCountry.native}
              </Button>
              {menu}
            </React.Fragment>
          );
        }}
      </AppCountryRetriever>
    );
  }
}