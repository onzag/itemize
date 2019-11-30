import React from "react";
import { AppLanguageRetriever } from "../../../itemize/client/app/elements";
import { Button, Icon, Menu, MenuItem } from "@material-ui/core";

interface ILanguagePickerProps {
  className?: string;
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
        {(languageData) => (
          <React.Fragment>
            <Button
              classes={{ root: this.props.className }}
              color="inherit"
              startIcon={<Icon>translate</Icon>}
              onClick={this.handleButtonSelectClick}
            >
              {languageData.currentLanguage.name}
            </Button>
            <Menu
              anchorEl={this.state.anchorEl}
              keepMounted={true}
              open={!!this.state.anchorEl}
              onClose={this.handleMenuClose}
            >
              {languageData.availableLanguages.map((al) => (
                <MenuItem
                  key={al.code}
                  selected={al.code === languageData.currentLanguage.code}
                  onClick={this.handleLanguageChange.bind(this, languageData.changeLanguageTo, al.code)}
                >
                  {al.name}
                </MenuItem>
              ))}
            </Menu>
          </React.Fragment>
        )}
      </AppLanguageRetriever>
    );
  }
}
