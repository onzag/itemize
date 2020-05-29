import React from "react";
import { capitalize } from "../../components/localization";
import { Button, Menu, MenuItem } from "@material-ui/core";
import AppCountryRetriever from "../../components/localization/AppCountryRetriever";

interface ICountryPickerProps {
  className?: string;
  useCode?: boolean;
}

interface ICountryPickerState {
  anchorEl: HTMLElement;
}

export class CountryPicker extends React.Component<ICountryPickerProps, ICountryPickerState> {
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