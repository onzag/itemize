import React from "react";
import { capitalize } from "../../components/localization";
import { Button, Menu, MenuItem } from "@material-ui/core";
import TranslateIcon from "@material-ui/icons/Translate";
import AppLanguageRetriever from "../../components/localization/AppLanguageRetriever";

interface ILanguagePickerProps {
  className?: string;
  useCode?: boolean;
  shrinkingDisplay?: boolean;
  shrinkingDisplayStandardClassName?: string;
  shrinkingDisplayShrunkClassName?: string;
}

interface ILanguagePickerState {
  anchorEl: HTMLElement;
}

export class LanguagePicker extends React.Component<ILanguagePickerProps, ILanguagePickerState> {
  constructor(props: ILanguagePickerProps) {
    super(props);

    this.state = {
      anchorEl: null,
    };

    this.handleButtonSelectClick = this.handleButtonSelectClick.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
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
  public handleLanguageChange(changeLanguageToFn: (code: string) => void, code: string) {
    this.setState({
      anchorEl: null,
    });
    changeLanguageToFn(code);
  }
  public render() {
    return (
      <AppLanguageRetriever>
        {(languageData) => {
          const menu = this.state.anchorEl ? <Menu
            anchorEl={this.state.anchorEl}
            keepMounted={false}
            open={!!this.state.anchorEl}
            onClose={this.handleMenuClose}
          >
            {languageData.availableLanguages.map((al) => (
              <MenuItem
                key={al.code}
                selected={al.code === languageData.currentLanguage.code}
                onClick={this.handleLanguageChange.bind(this, languageData.changeLanguageTo, al.code)}
              >
                {capitalize(al.name)}
              </MenuItem>
            ))}
          </Menu> : null;
          return (
            <React.Fragment>
              <Button
                classes={{ root: this.props.className }}
                color="inherit"
                startIcon={<TranslateIcon />}
                onClick={this.handleButtonSelectClick}
              >
                {
                  !this.props.shrinkingDisplay ?
                    (this.props.useCode ? languageData.currentLanguage.code : languageData.currentLanguage.name) :
                    <React.Fragment>
                      <span className={this.props.shrinkingDisplayStandardClassName}>{languageData.currentLanguage.name}</span>
                      <span className={this.props.shrinkingDisplayShrunkClassName}>{languageData.currentLanguage.code}</span>
                    </React.Fragment>
                }
              </Button>
              {menu}
            </React.Fragment>
          );
        }}
      </AppLanguageRetriever>
    );
  }
}