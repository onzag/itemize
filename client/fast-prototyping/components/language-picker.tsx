/**
 * The language picker component allows the user to choose a language and update the app
 *
 * @module
 */

import React from "react";
import { capitalize } from "../../components/localization";
import AppLanguageRetriever from "../../components/localization/AppLanguageRetriever";
import { ChangeLanguageToFn, LocaleContext } from "../../internal/providers/locale-provider";
import { arrLanguages } from "../../../imported-resources";
import TranslateIcon from "@mui/icons-material/Translate";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Snackbar from "./snackbar";

/**
 * The props of the language picker, a bit different from other pickers
 */
interface ILanguagePickerProps {
  /**
   * an alternative end icon
   */
  endIcon?: React.ReactNode;
  /**
   * an alternative start icon
   */
  startIcon?: React.ReactNode;
  /**
   * The class name
   */
  className?: string;
  /**
   * Whether to use the code, rather than the name that it was given to them
   */
  useCode?: boolean;
  /**
   * Whether null is a valid value
   */
  allowUnspecified?: boolean;
  /**
   * A label to give to the unspecified value, rather than the default
   * which is the i18n standard unspecified value
   */
  unspecifiedLabel?: string;
  /**
   * handle the language change yourself rather than the default
   * which changes the application language, this allows
   * you to control custom properties using Setters
   */
  handleLanguageChange?: (code: string, appChangeLanguageTo: ChangeLanguageToFn) => void;
  /**
   * handle the current code yourself rather than using the application's
   * default
   */
  currentCode?: string;
  /**
   * Use all the codes rather than only the available
   */
  allLanguages?: boolean;
  /**
   * whether to use a display that is able to shrink, one contains the
   * standard native name, and the other contains only the language code
   */
  shrinkingDisplay?: boolean;
  /**
   * This is the class name that contains the standard language native
   * name, it should be invisible when the shrunk is visible
   */
  shrinkingDisplayStandardClassName?: string;
  /**
   * This is the class name that contains the shrunk code only name,
   * it should be visible when the standard is visible
   */
  shrinkingDisplayShrunkClassName?: string;
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
 * The language picker state
 */
interface ILanguagePickerState {
  anchorEl: HTMLElement;
}

/**
 * Allows the user to choose a language from the language list
 * 
 * Because there aren't usually many languages this picker tends to be rather lightweight however
 * it still remains unmounted by default
 */
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
  public handleLanguageChange(changeLanguageToFn: ChangeLanguageToFn, code: string) {
    this.setState({
      anchorEl: null,
    });

    if (this.props.handleLanguageChange) {
      this.props.handleLanguageChange(code, changeLanguageToFn);
    } else {
      changeLanguageToFn(code);
    }
  }
  public render() {
    if (this.props.allowUnspecified && !this.props.handleLanguageChange) {
      throw new Error(
        "LanguagePicker allowUnspecified is set to true " +
        "but no manual handleLanguageChange function was specified",
      );
    }

    if (this.props.allowUnspecified && !this.props.unspecifiedLabel) {
      return (
        <LocaleContext.Consumer>
          {(localeContext) => (
            <LanguagePicker {...this.props} unspecifiedLabel={localeContext.i18n[localeContext.language].unspecified} />
          )}
        </LocaleContext.Consumer>
      );
    }

    return (
      <AppLanguageRetriever>
        {(languageData) => {
          let currentLanguage = languageData.currentLanguage;
          if (typeof this.props.currentCode !== "undefined") {
            if (this.props.allLanguages) {
              const currAllLanguage = arrLanguages.find((l) => l.code === this.props.currentCode) || null;
              if (currAllLanguage) {
                currentLanguage = {
                  code: currAllLanguage.code,
                  name: currAllLanguage.native,
                };
              }
            } else {
              currentLanguage = languageData.availableLanguages.find((l) => l.code === this.props.currentCode) || null;
            }
          }
          if (!currentLanguage) {
            currentLanguage = {
              code: null,
              name: this.props.currentCode || this.props.unspecifiedLabel,
            }
          }

          const menu = this.state.anchorEl ? <Menu
            anchorEl={this.state.anchorEl}
            keepMounted={false}
            open={!!this.state.anchorEl}
            onClose={this.handleMenuClose}
          >
            {
              this.props.allowUnspecified ?
                <MenuItem
                  selected={currentLanguage.code === null}
                  onClick={this.handleLanguageChange.bind(this, languageData.changeLanguageTo, null)}
                >
                  {capitalize(this.props.unspecifiedLabel)}
                </MenuItem>
                : null
            }
            {(this.props.allLanguages ? arrLanguages : languageData.availableLanguages).map((al) => {
              const usedName = (al as any).native || al.name;
              return (
                <MenuItem
                  key={al.code}
                  selected={al.code === currentLanguage.code}
                  onClick={this.handleLanguageChange.bind(this, languageData.changeLanguageTo, al.code)}
                >
                  {capitalize(usedName)}
                </MenuItem>
              );
            })}
          </Menu> : null;
          return (
            <React.Fragment>
              <Button
                classes={{ root: this.props.className }}
                color="inherit"
                startIcon={typeof this.props.startIcon !== "undefined" ? this.props.startIcon : <TranslateIcon />}
                endIcon={this.props.endIcon}
                onClick={this.handleButtonSelectClick}
                aria-label={typeof this.props.label !== "undefined" ? this.props.label : currentLanguage.name}
                aria-description={this.props.description}
                aria-labelledby={this.props.labelledBy}
                aria-describedby={this.props.describedBy}
              >
                {
                  !this.props.shrinkingDisplay ?
                    (this.props.useCode && currentLanguage.code ? currentLanguage.code : currentLanguage.name) :
                    <React.Fragment>
                      <span className={this.props.shrinkingDisplayStandardClassName}>{currentLanguage.name}</span>
                      <span className={this.props.shrinkingDisplayShrunkClassName}>{currentLanguage.code}</span>
                    </React.Fragment>
                }
              </Button>
              {menu}
              <Snackbar
                open={!!languageData.error}
                i18nDisplay={languageData.error}
                id="language-picker-error"
                onClose={languageData.dismissError}
                severity="error"
              />
            </React.Fragment>
          );
        }}
      </AppLanguageRetriever>
    );
  }
}
